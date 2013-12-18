// ***************************************************************************
// Copyright (c) 2013, JST/CREST DEOS project authors. All rights reserved.
// Redistribution and use in source and binary forms, with or without
// modification, are permitted provided that the following conditions are met:
//
// *  Redistributions of source code must retain the above copyright notice,
//    this list of conditions and the following disclaimer.
// *  Redistributions in binary form must reproduce the above copyright
//    notice, this list of conditions and the following disclaimer in the
//    documentation and/or other materials provided with the distribution.
//
// THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS
// "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED
// TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR
// PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER OR
// CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL,
// EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO,
// PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS;
// OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY,
// WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR
// OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF
// ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
// **************************************************************************

package org.GreenTeaScript;
import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.lang.reflect.Constructor;
import java.lang.reflect.InvocationTargetException;
import java.lang.reflect.Method;
import java.lang.reflect.Modifier;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.Stack;

import org.GreenTeaScript.DShell.DShellProcess;
import org.objectweb.asm.ClassWriter;
import org.objectweb.asm.Label;
import org.objectweb.asm.MethodVisitor;
import org.objectweb.asm.Type;
import org.objectweb.asm.tree.FieldNode;
import org.objectweb.asm.tree.MethodNode;

import parser.GtClassField;
import parser.GtFieldInfo;
import parser.GtFunc;
import parser.GtGenerator;
import parser.GtNameSpace;
import parser.GtParserContext;
import parser.GtStaticTable;
import parser.GtSyntaxTree;
import parser.GtType;
import parser.ast.GtAllocateNode;
import parser.ast.GtAndNode;
import parser.ast.GtApplyFunctionObjectNode;
import parser.ast.GtApplyOverridedMethodNode;
import parser.ast.GtApplySymbolNode;
import parser.ast.GtArrayLiteralNode;
import parser.ast.GtBinaryNode;
import parser.ast.GtBooleanNode;
import parser.ast.GtBreakNode;
import parser.ast.GtCastNode;
import parser.ast.GtCatchNode;
import parser.ast.GtCommandNode;
import parser.ast.GtConstPoolNode;
import parser.ast.GtConstructorNode;
import parser.ast.GtContinueNode;
import parser.ast.GtDoWhileNode;
import parser.ast.GtErrorNode;
import parser.ast.GtFloatNode;
import parser.ast.GtForEachNode;
import parser.ast.GtForNode;
import parser.ast.GtFunctionLiteralNode;
import parser.ast.GtGetIndexNode;
import parser.ast.GtGetLocalNode;
import parser.ast.GtGetterNode;
import parser.ast.GtIfNode;
import parser.ast.GtInstanceOfNode;
import parser.ast.GtIntNode;
import parser.ast.GtNewArrayNode;
import parser.ast.GtNode;
import parser.ast.GtNullNode;
import parser.ast.GtOrNode;
import parser.ast.GtReturnNode;
import parser.ast.GtSetIndexNode;
import parser.ast.GtSetLocalNode;
import parser.ast.GtSetterNode;
import parser.ast.GtStringNode;
import parser.ast.GtSwitchNode;
import parser.ast.GtThrowNode;
import parser.ast.GtTrinaryNode;
import parser.ast.GtTryNode;
import parser.ast.GtUnaryNode;
import parser.ast.GtVarDeclNode;
import parser.ast.GtWhileNode;

import static org.objectweb.asm.Opcodes.*;

// GreenTea Generator should be written in each language.

class JClassBuilder /*implements Opcodes */{
	final String SourceFile;
	final String ClassName;
	final String SuperClassName;
	final ArrayList<MethodNode> MethodList = new ArrayList<MethodNode>();
	final ArrayList<FieldNode> FieldList = new ArrayList<FieldNode>();
	final int ClassQualifer;

	JClassBuilder(int ClassQualifer, String SourceFile, String ClassName, String SuperClass) {
		this.ClassQualifer = ClassQualifer;
		this.SourceFile = SourceFile;
		this.ClassName = ClassName;
		this.SuperClassName = SuperClass;
	}
	
	void AddMethod(MethodNode m) {
		for(int i=0; i<MethodList.size(); i++) {
			MethodNode node = this.MethodList.get(i);
			if(node.name.equals(m.name) && node.desc.equals(m.desc)) {
				this.MethodList.set(i, m);
				return;
			}
		}
		this.MethodList.add(m);
	}

	void AddField(FieldNode m) {
		this.FieldList.add(m);
	}
	
	byte[] GenerateBytecode() {
		ClassWriter Visitor = new ClassWriter(ClassWriter.COMPUTE_FRAMES);
		Visitor.visit(V1_6, this.ClassQualifer, this.ClassName, null, this.SuperClassName, null);
		Visitor.visitSource(this.SourceFile, null);
		for(FieldNode f : this.FieldList) {
			f.accept(Visitor);
		}

		for(MethodNode m : this.MethodList) {
			m.accept(Visitor);
		}
		Visitor.visitEnd();
		return Visitor.toByteArray();
	}

	void OutputClassFile(String className, String dir) {
		byte[] ba = this.GenerateBytecode();
		File file = new File(dir, this.ClassName + ".class");
		try {
			FileOutputStream fos = new FileOutputStream(file);
			fos.write(ba);
			fos.close();
		}
		catch(IOException e) {
			LibGreenTea.VerboseException(e);
		} 
	}

}

class GreenTeaClassLoader extends ClassLoader {
	final GtParserContext Context;
	final HashMap<String,JClassBuilder> ByteCodeMap;
	final String GlobalStaticClassName;
	final String ContextFieldName;
	final String GontextDescripter;
	
	public GreenTeaClassLoader(GtParserContext Context) {
		this.Context = Context;
		this.ByteCodeMap = new HashMap<String,JClassBuilder>();
		
		this.GlobalStaticClassName = "Global$" + Context.ParserId;
		JClassBuilder GlobalClass = new JClassBuilder(ACC_PUBLIC|ACC_FINAL, null, this.GlobalStaticClassName, "java/lang/Object");
		FieldNode fn = new FieldNode(ACC_STATIC, "ParserContext", Type.getDescriptor(GtParserContext.class), null, null);
		this.ContextFieldName = fn.name;
		this.GontextDescripter = fn.desc;
		GlobalClass.AddField(fn);
		
		// static init
		MethodNode mn = new MethodNode(ACC_PUBLIC | ACC_STATIC, "<clinit>", "()V", null, null);
		JMethodBuilder MethodBuilder = new JMethodBuilder(Context.Generator, this, mn);
		MethodBuilder.LoadConst(Context);
		MethodBuilder.AsmVisitor.visitFieldInsn(PUTSTATIC, this.GlobalStaticClassName, this.ContextFieldName, this.GontextDescripter);
		MethodBuilder.AsmVisitor.visitInsn(RETURN);
		GlobalClass.AddMethod(mn);
		byte[] b = GlobalClass.GenerateBytecode();
		this.defineClass(this.GlobalStaticClassName, b, 0, b.length);
	}

	private void AddClassBuilder(JClassBuilder ClassBuilder) {
		this.ByteCodeMap.put(ClassBuilder.ClassName, ClassBuilder);
	}

	JClassBuilder NewBuilder(String SourceFile, String ClassName, String SuperClassName) {
		JClassBuilder cb = new JClassBuilder(ACC_PUBLIC, SourceFile, ClassName, SuperClassName);
		this.AddClassBuilder(cb);
		return cb;
	}
	
	JClassBuilder GenerateMethodHolderClass(String SourceFile, String FuncName, MethodNode AsmMethodNode) {
		JClassBuilder HolderClass = new JClassBuilder(ACC_PUBLIC|ACC_FINAL, SourceFile, JLib.GetHolderClassName(Context, FuncName), "java/lang/Object");
		this.AddClassBuilder(HolderClass);
		HolderClass.AddMethod(AsmMethodNode);
		return HolderClass;
	}
	
	@Override protected Class<?> findClass(String name) {
		JClassBuilder cb = this.ByteCodeMap.get(name);
		if(cb != null) {
			byte[] b = cb.GenerateBytecode();
			this.ByteCodeMap.remove(name);
			return this.defineClass(name, b, 0, b.length);
		}
		return null;
	}

}


class JLib {
	static HashMap<String, Type> TypeMap = new HashMap<String, Type>();
	static Method GetConstPool;
	static Method GetTypeById;
	static Method GetFuncById;
	static Method GetNameSpaceById;
	static Method DynamicGetter;
	static Method DynamicSetter;
	static Method BoxBooleanValue;
	static Method BoxIntValue;
	static Method BoxFloatValue;
	static Method UnboxBooleanValue;
	static Method UnboxIntValue;
	static Method UnboxFloatValue;
	static Method GreenCastOperator;
	static Method GreenInstanceOfOperator;
	static Method NewNewArray;
	static Method NewArray;
	static Method InvokeFunc;
	static Method InvokeOverridedFunc;
	static Method InvokeDynamicFunc;
	static Method InvokeDynamicMethod;
	
	static Method ExecCommandVoid;
	static Method ExecCommandBool;
	static Method ExecCommandString;
	static Method ExecCommandTask;
	
	static {
		TypeMap.put("void", Type.VOID_TYPE);
		TypeMap.put("boolean", Type.BOOLEAN_TYPE);
		TypeMap.put("int", Type.LONG_TYPE);
		TypeMap.put("float", Type.DOUBLE_TYPE);
		TypeMap.put("any", Type.getType(Object.class));
		TypeMap.put("String", Type.getType(String.class));
		TypeMap.put("Array", Type.getType(GreenTeaArray.class));
		TypeMap.put("Func", Type.getType(GtFunc.class));

		try {
			GetConstPool = GtStaticTable.class.getMethod("GetConstPool", int.class);
			GetTypeById = GtStaticTable.class.getMethod("GetTypeById", int.class);
			GetFuncById = GtStaticTable.class.getMethod("GetFuncById", int.class);
			DynamicGetter = LibGreenTea.class.getMethod("DynamicGetter", Object.class, String.class);
			DynamicSetter = LibGreenTea.class.getMethod("DynamicSetter", Object.class, String.class, Object.class);
			InvokeFunc = LibGreenTea.class.getMethod("InvokeFunc", GtFunc.class, Object[].class);
			InvokeOverridedFunc = LibGreenTea.class.getMethod("InvokeOverridedMethod", long.class, GtNameSpace.class, GtFunc.class, Object[].class);
			InvokeDynamicFunc = LibGreenTea.class.getMethod("InvokeDynamicFunc", long.class, GtType.class, GtNameSpace.class, String.class, Object[].class);
			InvokeDynamicMethod = LibGreenTea.class.getMethod("InvokeDynamicMethod", long.class, GtType.class, GtNameSpace.class, String.class, Object[].class);
			
			BoxBooleanValue = Boolean.class.getMethod("valueOf", boolean.class);
			BoxIntValue = Long.class.getMethod("valueOf", long.class);
			BoxFloatValue = Double.class.getMethod("valueOf", double.class);
			UnboxBooleanValue = Boolean.class.getMethod("booleanValue");
			UnboxIntValue = Long.class.getMethod("longValue");
			UnboxFloatValue = Double.class.getMethod("doubleValue");

			GreenCastOperator = LibGreenTea.class.getMethod("DynamicCast", GtType.class, Object.class);
			GreenInstanceOfOperator = LibGreenTea.class.getMethod("DynamicInstanceOf", Object.class, GtType.class);
			NewNewArray = LibGreenTea.class.getMethod("NewNewArray", GtType.class, Object[].class);
			NewArray = LibGreenTea.class.getMethod("NewArray", GtType.class, Object[].class);
			ExecCommandVoid = DShellProcess.class.getMethod("ExecCommandVoid", String[][].class);
			ExecCommandBool = DShellProcess.class.getMethod("ExecCommandBool", String[][].class);
			ExecCommandString = DShellProcess.class.getMethod("ExecCommandString", String[][].class);
			ExecCommandTask = DShellProcess.class.getMethod("ExecCommandTask", String[][].class);
		}
		catch(Exception e) {
			e.printStackTrace();
			LibGreenTea.Exit(1, "load error");
		}
	}
	
	public static String GetHolderClassName(GtParserContext Context, String FuncName) {
		return "FuncHolder" + FuncName + "$" + Context.ParserId;
	}
	
	static Type GetAsmType(GtType GreenType) {
		Type type = TypeMap.get(GreenType.ShortName);
		if(type != null) {
			return type;
		}
		if(GreenType.TypeBody != null && GreenType.TypeBody instanceof Class<?>) {
			return Type.getType((Class<?>) GreenType.TypeBody);
		}
		if(GreenType.IsTypeVariable()) {
			return Type.getType(Object.class);
		}
		if(GreenType.IsGenericType()) {
			return GetAsmType(GreenType.BaseType);
		}
		return Type.getType("L" + GreenType.GetNativeName() + ";");
	}

	static String GetMethodDescriptor(GtFunc Func) {
		Type ReturnType = GetAsmType(Func.GetReturnType());
		Type[] argTypes = new Type[Func.GetFuncParamSize()];
		for(int i = 0; i < argTypes.length; i++) {
			GtType ParamType = Func.GetFuncParamType(i);
			argTypes[i] = GetAsmType(ParamType);
		}
		return Type.getMethodDescriptor(ReturnType, argTypes);
	}
}

final class JLocalVarStack {
	public final String Name;
	public final Type   TypeInfo;
	public final int    Index;

	public JLocalVarStack(int Index, Type TypeInfo, String Name) {
		this.Index = Index;
		this.TypeInfo = TypeInfo;
		this.Name = Name;
	}
}

class JMethodBuilder {
	final GreenTeaClassLoader           LocalClassLoader;
	final MethodVisitor                 AsmVisitor;
	final GtGenerator                   Generator;
	ArrayList<JLocalVarStack>     LocalVals;
	int                           LocalSize;
	Stack<Label>                  BreakLabelStack;
	Stack<Label>                  ContinueLabelStack;
	int PreviousLine;

	public JMethodBuilder(GtGenerator Generator, GreenTeaClassLoader ClassLoader, MethodVisitor AsmVisitor) {
		this.Generator = Generator;
		this.LocalClassLoader = ClassLoader;
		this.AsmVisitor = AsmVisitor;
		this.LocalVals = new ArrayList<JLocalVarStack>();
		this.LocalSize = 0;
		this.BreakLabelStack = new Stack<Label>();
		this.ContinueLabelStack = new Stack<Label>();
		this.PreviousLine = 0;
	}

	void SetLineNumber(long FileLine) {
		if(FileLine != 0) {
			int Line = GtStaticTable.GetFileLineNumber(FileLine);
			if(Line != this.PreviousLine) {
				Label LineLabel = new Label();
				this.AsmVisitor.visitLineNumber(Line, LineLabel);
				this.PreviousLine = Line;
			}
		}
	}

	void SetLineNumber(GtNode Node) {
		this.SetLineNumber(Node.Token.FileLine);
	}
	
	void LoadLocal(JLocalVarStack local) {
		Type type = local.TypeInfo;
		this.AsmVisitor.visitVarInsn(type.getOpcode(ILOAD), local.Index);
	}

	void StoreLocal(JLocalVarStack local) {
		Type type = local.TypeInfo;
		this.AsmVisitor.visitVarInsn(type.getOpcode(ISTORE), local.Index);
	}

	public JLocalVarStack FindLocalVariable(String Name) {
		for(int i = 0; i < this.LocalVals.size(); i++) {
			JLocalVarStack l = this.LocalVals.get(i);
			if(l.Name.equals(Name)) {
				return l;
			}
		}
		return null;
	}

	public JLocalVarStack AddLocal(GtType GreenType, String Name) {
		Type LocalType =  JLib.GetAsmType(GreenType);
		JLocalVarStack local = new JLocalVarStack(this.LocalSize, LocalType, Name);
		this.LocalVals.add(local);
		this.LocalSize += LocalType.getSize();
		return local;
	}
	
	void LoadConst(Object Value) {
		if(Value instanceof Boolean || Value instanceof Long || Value instanceof Double || Value instanceof String) {
			this.AsmVisitor.visitLdcInsn(Value);
			return;
		}
		if(Value instanceof GtParserContext) {
			this.AsmVisitor.visitFieldInsn(GETSTATIC, this.LocalClassLoader.GlobalStaticClassName, this.LocalClassLoader.ContextFieldName, this.LocalClassLoader.GontextDescripter);
			return;
		}
		if(Value instanceof GtType) {
			int id = ((GtType)Value).TypeId;
			this.AsmVisitor.visitLdcInsn(id);
			this.InvokeMethodCall(GtType.class, JLib.GetTypeById);
			return;
		}
		else if(Value instanceof GtFunc) {
			int id = ((GtFunc)Value).FuncId;
			this.AsmVisitor.visitLdcInsn(id);
			this.InvokeMethodCall(GtFunc.class, JLib.GetFuncById);
			return;
		}
		int id = GtStaticTable.AddConstPool(Value);
		this.AsmVisitor.visitLdcInsn(id);
		this.InvokeMethodCall(Value.getClass(), JLib.GetConstPool);
	}

	void LoadNewArray(GtGenerator Visitor, int StartIdx, ArrayList<GtNode> NodeList) {
		this.AsmVisitor.visitLdcInsn(NodeList.size() - StartIdx);
		this.AsmVisitor.visitTypeInsn(ANEWARRAY, Type.getInternalName(Object.class));
		//System.err.println("** arraysize = " + (NodeList.size() - StartIdx));
		for(int i = StartIdx; i < NodeList.size(); i++) {
			this.AsmVisitor.visitInsn(DUP);
			this.AsmVisitor.visitLdcInsn(i);
			NodeList.get(i).Accept(Visitor);
//			System.out.println("i="+i+" type="+NodeList.get(i).Type);
			this.CheckCast(Object.class, NodeList.get(i).Type);
			this.AsmVisitor.visitInsn(AASTORE);
		}
	}
	
	void CheckCast(Class<?> RequiredType, Class<?> GivenType) {
		//System.err.println("casting .. giventype = " + GivenType + ", requested = " + RequiredType);
		if(RequiredType == void.class || RequiredType == GivenType ) {
			return;
		}
		if(RequiredType == long.class) {
			if(GivenType == Object.class) {
				this.AsmVisitor.visitTypeInsn(CHECKCAST, Type.getInternalName(Long.class));
				this.InvokeMethodCall(long.class, JLib.UnboxIntValue);
				return;
			}
		}
		if(RequiredType == double.class) {
			if(GivenType == Object.class) {
				this.AsmVisitor.visitTypeInsn(CHECKCAST, Type.getInternalName(Double.class));
				this.InvokeMethodCall(double.class, JLib.UnboxFloatValue);
				return;
			}
		}
		if(RequiredType == boolean.class) {
			if(GivenType == Object.class) {
				this.AsmVisitor.visitTypeInsn(CHECKCAST, Type.getInternalName(Long.class));
				this.InvokeMethodCall(boolean.class, JLib.UnboxBooleanValue);
				return;
			}
		}
		if(GivenType == long.class) {
			if(RequiredType == Object.class) {
				this.InvokeMethodCall(Long.class, JLib.BoxIntValue);
				return;
			}
		}
		if(GivenType == double.class) {
			if(RequiredType == Object.class) {
				this.InvokeMethodCall(Double.class, JLib.BoxFloatValue);
				return;
			}
		}
		if(GivenType == boolean.class) {
			if(RequiredType == Object.class) {
				this.InvokeMethodCall(Boolean.class, JLib.BoxBooleanValue);
				return;
			}
		}
		if(GivenType.isArray()) {
			return;//FIXME
		}
		if(GivenType.isPrimitive() && RequiredType.isPrimitive()) {
			return;//FIXME
		}
		//System.err.println("CHECKCAST (" + RequiredType + ") " + GivenType);
		this.AsmVisitor.visitTypeInsn(CHECKCAST, Type.getInternalName(RequiredType));
	}

	void CheckCast(Class<?> RequiredType, GtType GivenType) {
		if(GivenType != null) {
			this.CheckCast(RequiredType, GivenType.GetNativeType(false));
		}
//		else {
//			System.err.println("cannot check cast given = " + GivenType + " RequiredType="+RequiredType);
//		}
	}

	void CheckCast(GtType RequiredType, GtType GivenType) {
		this.CheckCast(RequiredType.GetNativeType(false), GivenType);
	}

	void Call(Constructor<?> method) {
		String owner = Type.getInternalName(method.getDeclaringClass());
		this.AsmVisitor.visitMethodInsn(INVOKESPECIAL, owner, "<init>", Type.getConstructorDescriptor(method));
	}

	void InvokeMethodCall(Method method) {
//		System.err.println("giventype = " + method);
		InvokeMethodCall(void.class, method);
	}

	void InvokeMethodCall(GtType RequiredType, Method method) {
		Class<?> RequiredNativeType = Object.class;
		if(RequiredType != null) {
			RequiredNativeType = RequiredType.GetNativeType(false);
		}
		InvokeMethodCall(RequiredNativeType, method);
	}

	void InvokeMethodCall(Class<?> RequiredType, Method method) {
		int inst;
		if(Modifier.isStatic(method.getModifiers())) {
			inst = INVOKESTATIC;
		}
		else if(Modifier.isInterface(method.getModifiers())) {
			inst = INVOKEINTERFACE;
		}
		else {
			inst = INVOKEVIRTUAL;
		}
		String owner = Type.getInternalName(method.getDeclaringClass());
		this.AsmVisitor.visitMethodInsn(inst, owner, method.getName(), Type.getMethodDescriptor(method));
		//System.err.println("\tRequiredType="+RequiredType+", " + method);
		this.CheckCast(RequiredType, method.getReturnType());
	}

	public void PopValue(boolean IsLong) {
		if(IsLong) {
			this.AsmVisitor.visitInsn(POP2);
		}
		else {
			this.AsmVisitor.visitInsn(POP);
		}
	}

	public void PushEvaluatedNode(GtType RequestedType, GtNode ParamNode) {
		//System.err.println("requested=" + RequestedType + ", given="+ParamNode.Type);
		ParamNode.Accept(this.Generator);
		this.CheckCast(RequestedType, ParamNode.Type);
	}
	
}

public class JavaByteCodeGenerator extends GtGenerator {
	GreenTeaClassLoader ClassGenerator;
	JMethodBuilder VisitingBuilder;
	ArrayList<GtType> StackFrame;

	public JavaByteCodeGenerator(String TargetCode, String OutputFile, int GeneratorFlag) {
		super("java", OutputFile, GeneratorFlag);
		this.StackFrame = new ArrayList<GtType>();
	}

	private void PushStack(GtType Type) {
		if(!Type.IsVoidType()) {
			StackFrame.add(Type);
		}
		//System.out.println(StackFrame.size());
	}

	private void PopStack() {
		assert(StackFrame.size() > 0);
		GtType LastType = StackFrame.remove(StackFrame.size() - 1);
		VisitingBuilder.PopValue(LastType.IsIntType());
		//System.out.println(StackFrame.size());
	}

	private void RemoveStack(int VariableSize) {
		assert(StackFrame.size() - VariableSize >= 0);
		for (int i = 0; i < VariableSize; i++) {
			StackFrame.remove(StackFrame.size() - 1);
		}
		//System.out.println(StackFrame.size());
	}

	public void VisitBlock(GtNode Node) {
		int CurrentStackIndex = this.StackFrame.size();
		/*local*/GtNode CurrentNode = Node;
		while(CurrentNode != null) {
			CurrentNode.Accept(this);
			CurrentNode = CurrentNode.NextNode;
		}
		while(CurrentStackIndex != this.StackFrame.size()) {
			this.PopStack();
		}
	}

	@Override public void InitContext(GtParserContext Context) {
		super.InitContext(Context);
		this.ClassGenerator = new GreenTeaClassLoader(Context);
	}

	@Override public void GenerateFunc(GtFunc Func, ArrayList<String> NameList, GtNode Body) {
		this.Context.ShowReportedErrors();
		String MethodName = Func.GetNativeFuncName();
		String MethodDesc = JLib.GetMethodDescriptor(Func);
		MethodNode AsmMethodNode = new MethodNode(ACC_PUBLIC | ACC_STATIC, MethodName, MethodDesc, null, null);
		JClassBuilder ClassHolder = this.ClassGenerator.GenerateMethodHolderClass(GtStaticTable.GetSourceFileName(Body.Token.FileLine), MethodName, AsmMethodNode);

		JMethodBuilder LocalBuilder = new JMethodBuilder(this, this.ClassGenerator, AsmMethodNode);
		JMethodBuilder PushedBuilder = this.VisitingBuilder;

		for(int i = 0; i < NameList.size(); i++) {
			String Name = NameList.get(i);
			LocalBuilder.AddLocal(Func.GetFuncParamType(i), Name);
		}
		this.VisitingBuilder = LocalBuilder;
		this.VisitBlock(Body);
		this.VisitingBuilder = PushedBuilder;
		if(Func.GetReturnType().IsVoidType()) {
			// JVM always needs return;
			LocalBuilder.AsmVisitor.visitInsn(RETURN);
		}
		try {
			if(LibGreenTea.DebugMode) {
				ClassHolder.OutputClassFile(ClassHolder.ClassName, ".");
			}
			Class<?> DefinedClass = this.ClassGenerator.loadClass(ClassHolder.ClassName);
			Method[] DefinedMethods = DefinedClass.getMethods();
			for(Method m : DefinedMethods) {
				if(m.getName().equals(Func.GetNativeFuncName())) {
					Func.SetNativeMethod(0, m);
					break;
				}
			}
		} catch(Exception e) {
			LibGreenTea.VerboseException(e);
		}
	}

	@Override public void OpenClassField(GtSyntaxTree ParsedTree, GtType ClassType, GtClassField ClassField) {
		String ClassName = ClassType.GetNativeName();
		String superClassName = ClassType.SuperType.GetNativeName();
		//System.err.println("class name = " + ClassName + " extends " + superClassName);
		JClassBuilder ClassBuilder = this.ClassGenerator.NewBuilder(GtStaticTable.GetSourceFileName(ParsedTree.KeyToken.FileLine), ClassName, superClassName);
		// generate field
		for(GtFieldInfo field : ClassField.FieldList) {
			if(field.FieldIndex >= ClassField.ThisClassIndex) {
				String fieldName = field.NativeName;
				Type fieldType = JLib.GetAsmType(field.Type);
				FieldNode node = new FieldNode(ACC_PUBLIC, fieldName, fieldType.getDescriptor(), null, null);
				ClassBuilder.AddField(node);
			}
		}
		// generate default constructor (for jvm)
		MethodNode constructor = new MethodNode(ACC_PUBLIC, "<init>", "(Lorg/GreenTeaScript/GtType;)V", null, null);
		constructor.visitVarInsn(ALOAD, 0);
		constructor.visitVarInsn(ALOAD, 1);
		constructor.visitMethodInsn(INVOKESPECIAL, superClassName, "<init>", "(Lorg/GreenTeaScript/GtType;)V");
		for(GtFieldInfo field : ClassField.FieldList) {
			if(field.FieldIndex >= ClassField.ThisClassIndex && field.InitValue != null) {
				String name = field.NativeName;
				String desc = JLib.GetAsmType(field.Type).getDescriptor();
				constructor.visitVarInsn(ALOAD, 0);
				constructor.visitLdcInsn(field.InitValue);
				constructor.visitFieldInsn(PUTFIELD, ClassName, name, desc);
			}
		}
		constructor.visitInsn(RETURN);
		ClassBuilder.AddMethod(constructor);
		try {
			ClassType.TypeBody = this.ClassGenerator.loadClass(ClassName);
			LibGreenTea.Assert(ClassType.TypeBody != null);
		}
		catch (Exception e) {
			LibGreenTea.VerboseException(e);
		}
	}

	//-----------------------------------------------------
	@Override public void VisitNullNode(GtNullNode Node) {
		this.VisitingBuilder.AsmVisitor.visitInsn(ACONST_NULL);
		this.PushStack(Node.Type);
	}

	@Override public void VisitBooleanNode(GtBooleanNode Node) {
		this.VisitingBuilder.AsmVisitor.visitLdcInsn(Node.Value);
		this.PushStack(Node.Type);
	}

	@Override public void VisitIntNode(GtIntNode Node) {
		this.VisitingBuilder.AsmVisitor.visitLdcInsn(Node.Value);
		this.PushStack(Node.Type);
	}

	@Override public void VisitFloatNode(GtFloatNode Node) {
		this.VisitingBuilder.AsmVisitor.visitLdcInsn(Node.Value);
		this.PushStack(Node.Type);
	}

	@Override public void VisitStringNode(GtStringNode Node) {
		this.VisitingBuilder.AsmVisitor.visitLdcInsn(Node.Value);
		this.PushStack(Node.Type);
	}

	//FIXME Need to Implement
//	@Override public void VisitRegexNode(GtRegexNode Node) {
//		this.VisitingBuilder.Append("");
//	}

	@Override public void VisitConstPoolNode(GtConstPoolNode Node) {
		Object constValue = Node.ConstValue;
		LibGreenTea.Assert(Node.ConstValue != null);
		this.VisitingBuilder.LoadConst(constValue);
		this.PushStack(Node.Type);
	}

	@Override public void VisitAllocateNode(GtAllocateNode Node) {
		Type type = JLib.GetAsmType(Node.Type);
		String owner = type.getInternalName();
		this.VisitingBuilder.AsmVisitor.visitTypeInsn(NEW, owner);
		this.VisitingBuilder.AsmVisitor.visitInsn(DUP);
		if(!Node.Type.IsNativeType()) {
			this.VisitingBuilder.LoadConst(Node.Type);
			this.VisitingBuilder.AsmVisitor.visitMethodInsn(INVOKESPECIAL, owner, "<init>", "(Lorg/GreenTeaScript/GtType;)V");
		} else {
			this.VisitingBuilder.AsmVisitor.visitMethodInsn(INVOKESPECIAL, owner, "<init>", "()V");
		}
		this.PushStack(Node.Type);
	}

	@Override public void VisitGetLocalNode(GtGetLocalNode Node) {
		JLocalVarStack local = this.VisitingBuilder.FindLocalVariable(Node.NativeName);
		this.VisitingBuilder.LoadLocal(local);
		this.PushStack(Node.Type);
	}

	@Override public void VisitSetLocalNode(GtSetLocalNode Node) {
		JLocalVarStack local = this.VisitingBuilder.FindLocalVariable(Node.NativeName);
		this.VisitingBuilder.PushEvaluatedNode(Node.ValueNode.Type, Node.ValueNode);
		this.VisitingBuilder.StoreLocal(local);
	}

	@Override public void VisitConstructorNode(GtConstructorNode Node) {
		if(Node.Type.TypeBody instanceof Class<?>) {
			// native class
			Class<?> klass = (Class<?>) Node.Type.TypeBody;
//			Type type = Type.getType(klass);
			this.VisitingBuilder.AsmVisitor.visitTypeInsn(NEW, Type.getInternalName(klass));
			this.VisitingBuilder.AsmVisitor.visitInsn(DUP);
			for(int i = 0; i<Node.ParamList.size(); i++) {
				GtNode ParamNode = Node.ParamList.get(i);
				this.VisitingBuilder.PushEvaluatedNode(Node.Func.GetFuncParamType(i), ParamNode);
//				ParamNode.Accept(this);
//				this.VisitingBuilder.CheckCast(Node.Func.GetFuncParamType(i), ParamNode.Type);
			}
			this.RemoveStack(Node.ParamList.size());
			this.VisitingBuilder.Call((Constructor<?>) Node.Func.FuncBody);
		} else {
			LibGreenTea.TODO("TypeBody is not Class<?>");
		}
		this.PushStack(Node.Type);
	}

	@Override public void VisitGetterNode(GtGetterNode Node) {
		String name = Node.ResolvedFunc.FuncName;
		Type fieldType = JLib.GetAsmType(Node.ResolvedFunc.GetReturnType());
		Type ownerType = JLib.GetAsmType(Node.ResolvedFunc.GetFuncParamType(0));
		Node.RecvNode.Accept(this);
		this.VisitingBuilder.AsmVisitor.visitFieldInsn(GETFIELD, ownerType.getInternalName(), name, fieldType.getDescriptor());
		this.RemoveStack(1);
		this.PushStack(Node.Type);
	}

	@Override public void VisitSetterNode(GtSetterNode Node) {
		String name = Node.NativeName;
		Type fieldType = JLib.GetAsmType(Node.ResolvedFunc.GetFuncParamType(1));
		Type ownerType = JLib.GetAsmType(Node.ResolvedFunc.GetFuncParamType(0));
		Node.RecvNode.Accept(this);
		this.VisitingBuilder.PushEvaluatedNode(Node.ResolvedFunc.GetFuncParamType(1), Node.ValueNode);
		this.VisitingBuilder.AsmVisitor.visitFieldInsn(PUTFIELD, ownerType.getInternalName(), name, fieldType.getDescriptor());
		this.RemoveStack(2);
	}

	@Override public void VisitApplySymbolNode(GtApplySymbolNode Node) {
		GtFunc Func = Node.ResolvedFunc;
		this.VisitingBuilder.SetLineNumber(Node);
		for(int i = 0; i < Node.ParamList.size(); i++) {
			GtNode ParamNode = Node.ParamList.get(i);
			this.VisitingBuilder.PushEvaluatedNode(Func.GetFuncParamType(i), ParamNode);
//			ParamNode.Accept(this);
//			this.VisitingBuilder.CheckCast(Func.GetFuncParamType(i), ParamNode.Type);
		}
		if(Func.FuncBody instanceof Method) {
			this.VisitingBuilder.InvokeMethodCall(Node.Type, (Method) Func.FuncBody);
		}
		else {
			String MethodName = Func.GetNativeFuncName(); 
			String Owner = JLib.GetHolderClassName(this.Context, MethodName);
			String MethodDescriptor = JLib.GetMethodDescriptor(Func);
			this.VisitingBuilder.AsmVisitor.visitMethodInsn(INVOKESTATIC, Owner, MethodName, MethodDescriptor);
		}
		this.RemoveStack(Node.ParamList.size());
		this.PushStack(Node.Type);
	}

	@Override public void VisitApplyFunctionObjectNode(GtApplyFunctionObjectNode Node) {
		Node.FuncNode.Accept(this);
		this.VisitingBuilder.LoadNewArray(this, 0, Node.ParamList);
		this.VisitingBuilder.InvokeMethodCall(Node.Type, JLib.InvokeFunc);
		this.RemoveStack(Node.ParamList.size());
		PushStack(Node.Type);
	}

	@Override public void VisitApplyOverridedMethodNode(GtApplyOverridedMethodNode Node) {
		this.VisitingBuilder.AsmVisitor.visitLdcInsn((long)Node.Token.FileLine);
		this.VisitingBuilder.LoadConst(Node.NameSpace);
		this.VisitingBuilder.LoadConst(Node.Func);
		this.VisitingBuilder.LoadNewArray(this, 0, Node.ParamList);
		this.VisitingBuilder.InvokeMethodCall(Node.Type, JLib.InvokeOverridedFunc);		
		this.RemoveStack(Node.ParamList.size());
		PushStack(Node.Type);
	}
	
//	@Override public void VisitApplyDynamicFuncNode(GtApplyDynamicFuncNode Node) {
//		this.VisitingBuilder.AsmVisitor.visitLdcInsn((long)Node.Token.FileLine);
//		this.VisitingBuilder.LoadConst(Node.Type);
//		this.VisitingBuilder.LoadConst(Node.NameSpace);
//		this.VisitingBuilder.LoadConst(Node.FuncName);		
//		this.VisitingBuilder.LoadNewArray(this, 0, Node.ParamList);
//		this.VisitingBuilder.InvokeMethodCall(Node.Type, JLib.InvokeDynamicFunc);				
//		this.VisitingBuilder.CheckReturn(Node.Type, GtStaticTable.AnyType);
//	}
//
//	@Override public void VisitApplyDynamicMethodNode(GtApplyDynamicMethodNode Node) {
//		this.VisitingBuilder.AsmVisitor.visitLdcInsn((long)Node.Token.FileLine);
//		this.VisitingBuilder.LoadConst(Node.Type);
//		this.VisitingBuilder.LoadConst(Node.NameSpace);
//		this.VisitingBuilder.LoadConst(Node.FuncName);		
//		this.VisitingBuilder.LoadNewArray(this, 0, Node.ParamList);
//		this.VisitingBuilder.InvokeMethodCall(Node.Type, JLib.InvokeDynamicMethod);				
//		this.VisitingBuilder.CheckReturn(Node.Type, GtStaticTable.AnyType);
//	}
	
	@Override public void VisitUnaryNode(GtUnaryNode Node) {
		LibGreenTea.Assert(Node.ResolvedFunc.FuncBody instanceof Method);
		this.VisitingBuilder.PushEvaluatedNode(Node.ResolvedFunc.GetFuncParamType(0), Node.RecvNode);
		this.VisitingBuilder.InvokeMethodCall(Node.Type, (Method)Node.ResolvedFunc.FuncBody);
		this.RemoveStack(1);
		PushStack(Node.Type);
	}

	@Override public void VisitBinaryNode(GtBinaryNode Node) {
		LibGreenTea.Assert(Node.ResolvedFunc.FuncBody instanceof Method);
		this.VisitingBuilder.PushEvaluatedNode(Node.ResolvedFunc.GetFuncParamType(0), Node.LeftNode);
		this.VisitingBuilder.PushEvaluatedNode(Node.ResolvedFunc.GetFuncParamType(1), Node.RightNode);
		this.VisitingBuilder.InvokeMethodCall(Node.Type, (Method)Node.ResolvedFunc.FuncBody);
		this.RemoveStack(2);
		PushStack(Node.Type);
	}

	@Override public void VisitGetIndexNode(GtGetIndexNode Node) {
		Node.RecvNode.Accept(this);
		this.VisitingBuilder.PushEvaluatedNode(Node.ResolvedFunc.GetFuncParamType(1), Node.IndexNode);
		this.VisitingBuilder.InvokeMethodCall(Node.Type, (Method) Node.ResolvedFunc.FuncBody);
		this.RemoveStack(2);
		PushStack(Node.Type);
	}

	@Override public void VisitSetIndexNode(GtSetIndexNode Node) {
		Node.RecvNode.Accept(this);
		this.VisitingBuilder.PushEvaluatedNode(Node.ResolvedFunc.GetFuncParamType(1), Node.IndexNode);
		this.VisitingBuilder.PushEvaluatedNode(Node.ResolvedFunc.GetFuncParamType(2), Node.ValueNode);
		this.VisitingBuilder.InvokeMethodCall(Node.Type, (Method) Node.ResolvedFunc.FuncBody);
		this.RemoveStack(3);
	}

	@Override public void VisitArrayLiteralNode(GtArrayLiteralNode Node) {
		this.VisitingBuilder.LoadConst(Node.Type);
		this.VisitingBuilder.LoadNewArray(this, 0, Node.NodeList);
		this.VisitingBuilder.InvokeMethodCall(Node.Type, JLib.NewNewArray);
		this.RemoveStack(Node.NodeList.size());
		PushStack(Node.Type);
		PushStack(Node.Type);
	}

	public void VisitNewArrayNode(GtNewArrayNode Node) {
		this.VisitingBuilder.LoadConst(Node.Type);
		this.VisitingBuilder.LoadNewArray(this, 0, Node.NodeList);
		this.VisitingBuilder.InvokeMethodCall(Node.Type, JLib.NewArray);
		this.RemoveStack(Node.NodeList.size());
		PushStack(Node.Type);
		PushStack(Node.Type);
	}

	@Override public void VisitAndNode(GtAndNode Node) {
		Label elseLabel = new Label();
		Label mergeLabel = new Label();
		this.VisitingBuilder.PushEvaluatedNode(GtStaticTable.BooleanType, Node.LeftNode);
		this.VisitingBuilder.AsmVisitor.visitJumpInsn(IFEQ, elseLabel);

		this.VisitingBuilder.PushEvaluatedNode(GtStaticTable.BooleanType, Node.RightNode);
		this.VisitingBuilder.AsmVisitor.visitJumpInsn(IFEQ, elseLabel);

		this.VisitingBuilder.AsmVisitor.visitLdcInsn(true);
		this.VisitingBuilder.AsmVisitor.visitJumpInsn(GOTO, mergeLabel);

		this.VisitingBuilder.AsmVisitor.visitLabel(elseLabel);
		this.VisitingBuilder.AsmVisitor.visitLdcInsn(false);
		this.VisitingBuilder.AsmVisitor.visitJumpInsn(GOTO, mergeLabel);

		this.VisitingBuilder.AsmVisitor.visitLabel(mergeLabel);
	}

	@Override public void VisitOrNode(GtOrNode Node) {
		Label thenLabel = new Label();
		Label mergeLabel = new Label();
		this.VisitingBuilder.PushEvaluatedNode(GtStaticTable.BooleanType, Node.LeftNode);
		this.VisitingBuilder.AsmVisitor.visitJumpInsn(IFNE, thenLabel);

		this.VisitingBuilder.PushEvaluatedNode(GtStaticTable.BooleanType, Node.RightNode);
		this.VisitingBuilder.AsmVisitor.visitJumpInsn(IFNE, thenLabel);

		this.VisitingBuilder.AsmVisitor.visitLdcInsn(false);
		this.VisitingBuilder.AsmVisitor.visitJumpInsn(GOTO, mergeLabel);

		this.VisitingBuilder.AsmVisitor.visitLabel(thenLabel);
		this.VisitingBuilder.AsmVisitor.visitLdcInsn(true);
		this.VisitingBuilder.AsmVisitor.visitJumpInsn(GOTO, mergeLabel);

		this.VisitingBuilder.AsmVisitor.visitLabel(mergeLabel);
	}

//	@Override public void VisitSelfAssignNode(GtSelfAssignNode Node) {
//		if(Node.LeftNode instanceof GtGetLocalNode) {
//			GtGetLocalNode Left = (GtGetLocalNode)Node.LeftNode;
//			JLocalVarStack local = this.VisitingBuilder.FindLocalVariable(Left.NativeName);
//			Node.LeftNode.Accept(this);
//			Node.RightNode.Accept(this);
//			this.VisitingBuilder.InvokeMethodCall((Method)Node.Func.FuncBody);
//			this.VisitingBuilder.StoreLocal(local);
//		}
//		else {
//			LibGreenTea.TODO("selfAssign");
//		}
//	}

	@Override public void VisitVarDeclNode(GtVarDeclNode Node) {
		JLocalVarStack local = this.VisitingBuilder.AddLocal(Node.Type, Node.NativeName);
		this.VisitingBuilder.PushEvaluatedNode(Node.DeclType, Node.InitNode);
		this.VisitingBuilder.StoreLocal(local);
		this.VisitBlock(Node.BlockNode);
		this.PopStack();
	}

	@Override public void VisitIfNode(GtIfNode Node) {
		Label ElseLabel = new Label();
		Label EndLabel = new Label();
		this.VisitingBuilder.PushEvaluatedNode(GtStaticTable.BooleanType, Node.CondNode);
		this.VisitingBuilder.AsmVisitor.visitJumpInsn(IFEQ, ElseLabel);
		this.RemoveStack(1);
		// Then
		this.VisitBlock(Node.ThenNode);
		this.VisitingBuilder.AsmVisitor.visitJumpInsn(GOTO, EndLabel);
		// Else
		this.VisitingBuilder.AsmVisitor.visitLabel(ElseLabel);
		if(Node.ElseNode != null) {
			this.VisitBlock(Node.ElseNode);
			this.VisitingBuilder.AsmVisitor.visitJumpInsn(GOTO, EndLabel);
		}
		// End
		this.VisitingBuilder.AsmVisitor.visitLabel(EndLabel);
	}

	@Override public void VisitTrinaryNode(GtTrinaryNode Node) {
		Label ElseLabel = new Label();
		Label EndLabel = new Label();
		this.VisitingBuilder.PushEvaluatedNode(GtStaticTable.BooleanType, Node.CondNode);
		this.VisitingBuilder.AsmVisitor.visitJumpInsn(IFEQ, ElseLabel);
		// Then
		this.VisitBlock(Node.ThenNode);
		this.VisitingBuilder.AsmVisitor.visitJumpInsn(GOTO, EndLabel);
		// Else
		this.VisitingBuilder.AsmVisitor.visitLabel(ElseLabel);
		this.VisitBlock(Node.ElseNode);
		this.VisitingBuilder.AsmVisitor.visitJumpInsn(GOTO, EndLabel);
		// End
		this.VisitingBuilder.AsmVisitor.visitLabel(EndLabel);
		this.PushStack(Node.Type);
	}

	@Override public void VisitSwitchNode(GtSwitchNode Node) {
		int cases = Node.CaseList.size() / 2;
		int[] keys = new int[cases];
		Label[] caseLabels = new Label[cases];
		Label defaultLabel = new Label();
		Label breakLabel = new Label();
		for(int i=0; i<cases; i++) {
			keys[i] = ((Number)((GtConstPoolNode)Node.CaseList.get(i*2)).ConstValue).intValue();
			caseLabels[i] = new Label();
		}
		Node.MatchNode.Accept(this);
		this.VisitingBuilder.AsmVisitor.visitInsn(L2I);
		this.VisitingBuilder.AsmVisitor.visitLookupSwitchInsn(defaultLabel, keys, caseLabels);
		for(int i=0; i<cases; i++) {
			this.VisitingBuilder.BreakLabelStack.push(breakLabel);
			this.VisitingBuilder.AsmVisitor.visitLabel(caseLabels[i]);
			this.VisitBlock(Node.CaseList.get(i*2+1));
			this.VisitingBuilder.BreakLabelStack.pop();
		}
		this.VisitingBuilder.AsmVisitor.visitLabel(defaultLabel);
		this.VisitBlock(Node.DefaultBlock);
		this.VisitingBuilder.AsmVisitor.visitLabel(breakLabel);
	}

	@Override public void VisitWhileNode(GtWhileNode Node) {
		Label continueLabel = new Label();
		Label breakLabel = new Label();
		this.VisitingBuilder.BreakLabelStack.push(breakLabel);
		this.VisitingBuilder.ContinueLabelStack.push(continueLabel);

		this.VisitingBuilder.AsmVisitor.visitLabel(continueLabel);
		this.VisitingBuilder.PushEvaluatedNode(GtStaticTable.BooleanType, Node.CondNode);
		this.VisitingBuilder.AsmVisitor.visitJumpInsn(IFEQ, breakLabel); // condition
		this.VisitBlock(Node.BodyNode);
		this.VisitingBuilder.AsmVisitor.visitJumpInsn(GOTO, continueLabel);
		this.VisitingBuilder.AsmVisitor.visitLabel(breakLabel);

		this.VisitingBuilder.BreakLabelStack.pop();
		this.VisitingBuilder.ContinueLabelStack.pop();
	}

	@Override public void VisitDoWhileNode(GtDoWhileNode Node) {
		Label headLabel = new Label();
		Label continueLabel = new Label();
		Label breakLabel = new Label();
		this.VisitingBuilder.BreakLabelStack.push(breakLabel);
		this.VisitingBuilder.ContinueLabelStack.push(continueLabel);

		this.VisitingBuilder.AsmVisitor.visitLabel(headLabel);
		this.VisitBlock(Node.BodyNode);
		this.VisitingBuilder.AsmVisitor.visitLabel(continueLabel);
		Node.CondNode.Accept(this);
		this.VisitingBuilder.AsmVisitor.visitJumpInsn(IFEQ, breakLabel); // condition
		this.VisitingBuilder.AsmVisitor.visitJumpInsn(GOTO, headLabel);
		this.VisitingBuilder.AsmVisitor.visitLabel(breakLabel);

		this.VisitingBuilder.BreakLabelStack.pop();
		this.VisitingBuilder.ContinueLabelStack.pop();
	}

	@Override public void VisitForNode(GtForNode Node) {
		Label headLabel = new Label();
		Label continueLabel = new Label();
		Label breakLabel = new Label();
		this.VisitingBuilder.BreakLabelStack.push(breakLabel);
		this.VisitingBuilder.ContinueLabelStack.push(continueLabel);

		this.VisitingBuilder.AsmVisitor.visitLabel(headLabel);
		Node.CondNode.Accept(this);
		this.VisitingBuilder.AsmVisitor.visitJumpInsn(IFEQ, breakLabel); // condition
		this.VisitBlock(Node.BodyNode);
		this.VisitingBuilder.AsmVisitor.visitLabel(continueLabel);
		Node.IterNode.Accept(this);
		this.VisitingBuilder.AsmVisitor.visitJumpInsn(GOTO, headLabel);
		this.VisitingBuilder.AsmVisitor.visitLabel(breakLabel);

		this.VisitingBuilder.BreakLabelStack.pop();
		this.VisitingBuilder.ContinueLabelStack.pop();
	}

	@Override public void VisitForEachNode(GtForEachNode Node) {
		LibGreenTea.TODO("ForEach");
	}

	@Override public void VisitReturnNode(GtReturnNode Node) {
		if(Node.ValueNode != null) {
			Node.ValueNode.Accept(this);
			Type type = JLib.GetAsmType(Node.ValueNode.Type);
			this.VisitingBuilder.AsmVisitor.visitInsn(type.getOpcode(IRETURN));
		}
		else {
			this.VisitingBuilder.AsmVisitor.visitInsn(RETURN);
		}
	}

	@Override public void VisitBreakNode(GtBreakNode Node) {
		Label l = this.VisitingBuilder.BreakLabelStack.peek();
		this.VisitingBuilder.AsmVisitor.visitJumpInsn(GOTO, l);
	}

	@Override public void VisitContinueNode(GtContinueNode Node) {
		Label l = this.VisitingBuilder.ContinueLabelStack.peek();
		this.VisitingBuilder.AsmVisitor.visitJumpInsn(GOTO, l);
	}

	@Override public void VisitTryNode(GtTryNode Node) {
		int catchSize = LibGreenTea.ListSize(Node.CatchList);
		MethodVisitor mv = this.VisitingBuilder.AsmVisitor;
		Label beginTryLabel = new Label();
		Label endTryLabel = new Label();
		Label finallyLabel = new Label();
		Label catchLabel[] = new Label[catchSize];

		// try block
		mv.visitLabel(beginTryLabel);
		this.VisitBlock(Node.TryNode);
		mv.visitLabel(endTryLabel);
		mv.visitJumpInsn(GOTO, finallyLabel);

		// prepare
		for(int i = 0; i < catchSize; i++) { //TODO: add exception class name
			catchLabel[i] = new Label();
			GtCatchNode Catch = (/*cast*/GtCatchNode) Node.CatchList.get(i);
			String throwType = JLib.GetAsmType(Catch.ExceptionType).getInternalName();
			mv.visitTryCatchBlock(beginTryLabel, endTryLabel, catchLabel[i], throwType);
		}

		// catch block
		for(int i = 0; i < catchSize; i++) { //TODO: add exception class name
			GtCatchNode Catch = (/*cast*/GtCatchNode) Node.CatchList.get(i);
			JLocalVarStack local = this.VisitingBuilder.AddLocal(Catch.ExceptionType, Catch.ExceptionName);
			mv.visitLabel(catchLabel[i]);
			this.VisitingBuilder.StoreLocal(local);
			this.VisitBlock(Catch.BodyNode);
			mv.visitJumpInsn(GOTO, finallyLabel);
			//FIXME: remove local
		}

		// finally block
		mv.visitLabel(finallyLabel);
		this.VisitBlock(Node.FinallyNode);
	}

	@Override public void VisitThrowNode(GtThrowNode Node) {
		// use wrapper
		//String name = Type.getInternalName(GtThrowableWrapper.class);
		//this.VisitingBuilder.MethodVisitor.visitTypeInsn(NEW, name);
		//this.VisitingBuilder.MethodVisitor.visitInsn(DUP);
		//Node.Expr.Accept(this);
		//this.box();
		//this.VisitingBuilder.typeStack.pop();
		//this.VisitingBuilder.MethodVisitor.visitMethodInsn(INVOKESPECIAL, name, "<init>", "(Ljava/lang/Object;)V");
		//this.VisitingBuilder.MethodVisitor.visitInsn(ATHROW);
	}

	@Override public void VisitInstanceOfNode(GtInstanceOfNode Node) {
		if(Node.TypeInfo.IsGenericType() || Node.TypeInfo.IsVirtualType()) {
			Node.ExprNode.Accept(this);
			this.VisitingBuilder.LoadConst(Node.TypeInfo);
			this.VisitingBuilder.InvokeMethodCall(boolean.class, JLib.GreenInstanceOfOperator);
		}
		else {
			Node.ExprNode.Accept(this);
			this.VisitingBuilder.CheckCast(Object.class, Node.ExprNode.Type);
			Class<?> NativeType = Node.TypeInfo.GetNativeType(true);
			this.VisitingBuilder.AsmVisitor.visitTypeInsn(INSTANCEOF, Type.getInternalName(NativeType));
		}
		this.PushStack(Node.Type);
	}

	@Override public void VisitCastNode(GtCastNode Node) {
		this.VisitingBuilder.LoadConst(Node.CastType);
		Node.Expr.Accept(this);
		this.VisitingBuilder.CheckCast(Object.class, Node.Expr.Type);
		this.VisitingBuilder.InvokeMethodCall(Node.CastType, JLib.GreenCastOperator);
		this.PushStack(Node.CastType);
	}

	@Override public void VisitFunctionLiteralNode(GtFunctionLiteralNode Node) {
		LibGreenTea.TODO("FunctionNode");
	}

	@Override public void VisitErrorNode(GtErrorNode Node) {
		String name = Type.getInternalName(SoftwareFaultException.class);
		this.VisitingBuilder.SetLineNumber(Node);
		this.VisitingBuilder.AsmVisitor.visitTypeInsn(NEW, name);
		this.VisitingBuilder.AsmVisitor.visitInsn(DUP);
		this.VisitingBuilder.LoadConst(Node.Token.GetErrorMessage());
		this.VisitingBuilder.AsmVisitor.visitMethodInsn(INVOKESPECIAL, name, "<init>", "(Ljava/lang/Object;)V");
		this.VisitingBuilder.AsmVisitor.visitInsn(ATHROW);
	}

	@Override public void VisitCommandNode(GtCommandNode Node) {
		ArrayList<ArrayList<GtNode>> Args = new ArrayList<ArrayList<GtNode>>();
		GtCommandNode node = Node;
		while(node != null) {
			Args.add(node.ArgumentList);
			node = (GtCommandNode) node.PipedNextNode;
		}
		// new String[][n]
		this.VisitingBuilder.AsmVisitor.visitLdcInsn(Args.size());
		this.VisitingBuilder.AsmVisitor.visitTypeInsn(ANEWARRAY, Type.getInternalName(String[].class));
		for(int i=0; i<Args.size(); i++) {
			// new String[m];
			ArrayList<GtNode> Arg = Args.get(i);
			this.VisitingBuilder.AsmVisitor.visitInsn(DUP);
			this.VisitingBuilder.AsmVisitor.visitLdcInsn(i);
			this.VisitingBuilder.AsmVisitor.visitLdcInsn(Arg.size());
			this.VisitingBuilder.AsmVisitor.visitTypeInsn(ANEWARRAY, Type.getInternalName(String.class));
			for(int j=0; j<Arg.size(); j++) {
				this.VisitingBuilder.AsmVisitor.visitInsn(DUP);
				this.VisitingBuilder.AsmVisitor.visitLdcInsn(j);
				Arg.get(j).Accept(this);
				this.VisitingBuilder.AsmVisitor.visitInsn(AASTORE);
			}
			this.VisitingBuilder.AsmVisitor.visitInsn(AASTORE);
		}
		if(Node.Type.IsBooleanType()) {
			this.VisitingBuilder.InvokeMethodCall(Node.Type, JLib.ExecCommandBool);
		}
		else if(Node.Type.IsStringType()) {
			this.VisitingBuilder.InvokeMethodCall(Node.Type, JLib.ExecCommandString);
		}
		else if(LibGreenTea.EqualsString(Node.Type.toString(), "Task")) {
			this.VisitingBuilder.InvokeMethodCall(Node.Type, JLib.ExecCommandTask);
		}
		else {
			this.VisitingBuilder.InvokeMethodCall(Node.Type, JLib.ExecCommandVoid);
		}
		this.PushStack(Node.Type);
	}

	@Override public void InvokeMainFunc(String MainFuncName) {
		try {
			Class<?> MainClass = Class.forName(JLib.GetHolderClassName(this.Context, MainFuncName), false, this.ClassGenerator);
			Method m = MainClass.getMethod(MainFuncName);
			if(m != null) {
				m.invoke(null);
			}
		} catch(ClassNotFoundException e) {
			LibGreenTea.VerboseException(e);
		} catch(InvocationTargetException e) {
			LibGreenTea.VerboseException(e);
		} catch(IllegalAccessException e) {
			LibGreenTea.VerboseException(e);
		} catch(NoSuchMethodException e) {
			LibGreenTea.VerboseException(e);
		}
	}
}
