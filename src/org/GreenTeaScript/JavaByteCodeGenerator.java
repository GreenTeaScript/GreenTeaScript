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
import java.util.Map;
import java.util.Stack;

import org.GreenTeaScript.DShell.DShellProcess;
import org.GreenTeaScript.JVM.GtThrowableWrapper;
import org.GreenTeaScript.JVM.JVMConstPool;
import org.objectweb.asm.ClassVisitor;
import org.objectweb.asm.ClassWriter;
import org.objectweb.asm.Label;
import org.objectweb.asm.MethodVisitor;
import org.objectweb.asm.Opcodes;
import org.objectweb.asm.Type;
import org.objectweb.asm.tree.FieldNode;
import org.objectweb.asm.tree.MethodNode;

import static org.objectweb.asm.Opcodes.*;

// GreenTea Generator should be written in each language.

//class GtClassLoader extends ClassLoader {
//	JavaByteCodeGenerator Gen;
//
//	public GtClassLoader(JavaByteCodeGenerator Gen) {
//		this.Gen = Gen;
//	}
//
//	@Override protected Class<?> findClass(String name) {
//		byte[] b = this.Gen.GenerateBytecode(name);
//		return this.defineClass(name, b, 0, b.length);
//	}
//}

class JClassBuilder /*implements Opcodes */{
	final String ClassName;
	final String SuperClassName;
	final ArrayList<MethodNode> MethodList = new ArrayList<MethodNode>();
	final Map<String, FieldNode> FieldMap = new HashMap<String, FieldNode>();

	JClassBuilder(String name, String superClass) {
		this.ClassName = name;
		this.SuperClassName = superClass;
	}
	
	void AddMethodNode(MethodNode m) {
		for(int i=0; i<MethodList.size(); i++) {
			MethodNode node = this.MethodList.get(i);
			if(node.name.equals(m.name) && node.desc.equals(m.desc)) {
				this.MethodList.set(i, m);
				return;
			}
		}
		this.MethodList.add(m);
	}
	
	byte[] GenerateBytecode() {
		ClassWriter cv = new ClassWriter(ClassWriter.COMPUTE_FRAMES);
		cv.visit(V1_6, ACC_PUBLIC, this.ClassName, null, this.SuperClassName, null);
		for(FieldNode f : this.FieldMap.values()) {
			f.accept(cv);
		}
		for(MethodNode m : this.MethodList) {
			m.accept(cv);
		}
		cv.visitEnd();
		return cv.toByteArray();
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
		JClassBuilder GlobalClass = new JClassBuilder(this.GlobalStaticClassName, "java/lang/Object");
		FieldNode fn = new FieldNode(ACC_STATIC, "ParserContext", Type.getDescriptor(GtParserContext.class), null, null);
		this.ContextFieldName = fn.name;
		this.GontextDescripter = fn.desc;
		GlobalClass.FieldMap.put(fn.name, fn);
		
		// static init
		MethodNode mn = new MethodNode(ACC_PUBLIC | ACC_STATIC, "<clinit>", "()V", null, null);
		JMethodBuilder MethodBuilder = new JMethodBuilder(this, mn);
		MethodBuilder.LoadConst(Context);
		MethodBuilder.MethodVisitor.visitFieldInsn(PUTSTATIC, this.GlobalStaticClassName, this.ContextFieldName, this.GontextDescripter);
		MethodBuilder.MethodVisitor.visitInsn(RETURN);
		GlobalClass.AddMethodNode(mn);
		byte[] b = GlobalClass.GenerateBytecode();
		this.defineClass(this.GlobalStaticClassName, b, 0, b.length);
	}

	private void AddClassBuilder(JClassBuilder ClassBuilder) {
		this.ByteCodeMap.put(ClassBuilder.ClassName, ClassBuilder);
	}

	JClassBuilder NewBuilder(String ClassName, String SuperClassName) {
		JClassBuilder cb = new JClassBuilder(ClassName, SuperClassName);
		this.AddClassBuilder(cb);
		return cb;
	}
	
	JClassBuilder GenerateMethodHolderClass(String FuncName, MethodNode AsmMethodNode) {
		JClassBuilder HolderClass = new JClassBuilder(JLib.GetHolderClassName(Context, FuncName), "java/lang/Object");
		this.AddClassBuilder(HolderClass);
		HolderClass.AddMethodNode(AsmMethodNode);
		return HolderClass;
	}
	
	@Override protected Class<?> findClass(String name) {
		JClassBuilder cb = this.ByteCodeMap.get(name);
		if(cb != null) {
			byte[] b = cb.GenerateBytecode();
			this.ByteCodeMap.remove(name);
			return this.defineClass(name, b, 0, b.length);
		}
		System.err.println("findClass.. " + name);
		return null;
	}

}

final class JLocalVarStack {
	public String Name;
	public Type   TypeInfo;
	public int    Index;

	public JLocalVarStack(int Index, Type TypeInfo, String Name) {
		this.Index = Index;
		this.TypeInfo = TypeInfo;
		this.Name = Name;
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
	static Method NewArrayLiteral;
	static Method NewArray;
	static Method ExecCommandVoid;
	static Method ExecCommandBool;
	static Method ExecCommandString;
	
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
			GetConstPool = JVMConstPool.class.getMethod("getById", int.class);
			GetTypeById = GtParserContext.class.getMethod("GetTypeById", int.class);
			GetFuncById = GtParserContext.class.getMethod("GetFuncById", int.class);
			DynamicGetter = LibGreenTea.class.getMethod("DynamicGetter", GtType.class, Object.class, String.class);
			DynamicSetter = LibGreenTea.class.getMethod("DynamicSetter", GtType.class, Object.class, String.class, Object.class);
			BoxBooleanValue = Boolean.class.getMethod("valueOf", boolean.class);
			BoxIntValue = Long.class.getMethod("valueOf", long.class);
			BoxFloatValue = Double.class.getMethod("valueOf", double.class);
			UnboxBooleanValue = Boolean.class.getMethod("booleanValue");
			UnboxIntValue = Long.class.getMethod("longValue");
			UnboxFloatValue = Double.class.getMethod("doubleValue");

			GreenCastOperator = LibGreenTea.class.getMethod("DynamicCast", GtType.class, Object.class);
			GreenInstanceOfOperator = LibGreenTea.class.getMethod("DynamicInstanceOf", Object.class, GtType.class);
			NewArrayLiteral = LibGreenTea.class.getMethod("NewArrayLiteral", GtType.class, Object[].class);
			NewArray = LibGreenTea.class.getMethod("NewArray", GtType.class, Object[].class);
			ExecCommandVoid = DShellProcess.class.getMethod("ExecCommandVoid", String[][].class);
			ExecCommandBool = DShellProcess.class.getMethod("ExecCommandBool", String[][].class);
			ExecCommandString = DShellProcess.class.getMethod("ExecCommandString", String[][].class);

//			Class<?> runtime = GreenTeaRuntime.class;
//			map.put("getter", runtime.getMethod("getter", Object.class, String.class));
//			map.put("setter", runtime.getMethod("setter", Object.class, String.class, Object.class));
//			map.put("error_node", runtime.getMethod("error_node", String.class));
//			Class<?> lib = LibGreenTea.class;

		}
		catch(Exception e) {
			e.printStackTrace();
			LibGreenTea.Exit(1, "load error");
		}
	}
	
	public static String GetHolderClassName(GtParserContext Context, String FuncName) {
		return "H" + FuncName + "$" + Context.ParserId;
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

//	static Type ToAsmMethodType(GtFunc method) {
//		Type returnType = GetAsmType(method.GetReturnType());
//		Type[] argTypes = new Type[method.GetFuncParamSize()];
//		for(int i = 0; i < argTypes.length; i++) {
//			GtType ParamType = method.GetFuncParamType(i);
//			argTypes[i] = GetAsmType(ParamType);
//		}
//		return Type.getMethodType(returnType, argTypes);
//	}
//
//	public Class<?> ToClass(ClassLoader loader, Type type) throws ClassNotFoundException {
//		if(type.equals(Type.BOOLEAN_TYPE)) {
//			return boolean.class;
//		}
//		else if(type.equals(Type.LONG_TYPE)) {
//			return long.class;
//		}
//		else if(type.equals(Type.DOUBLE_TYPE)) {
//			return double.class;
//		}
//		else {
//			try {
//				return Class.forName(type.getClassName(), true, loader);
//			} catch (ClassNotFoundException e) {
//				return Class.forName(type.getClassName());
//			}
//		}
//	}

}

class JMethodBuilder {
	GreenTeaClassLoader           LocalClassLoader;
	MethodVisitor                 MethodVisitor;
	ArrayList<JLocalVarStack>           LocalVals;
	int                           LocalSize;
//	Stack<Type>                   typeStack;
	Stack<Label>                  BreakLabelStack;
	Stack<Label>                  ContinueLabelStack;

	public JMethodBuilder(GreenTeaClassLoader ClassLoader, MethodVisitor AsmMethodVisitor) {
		this.LocalClassLoader = ClassLoader;
		this.MethodVisitor = AsmMethodVisitor;
		this.LocalVals = new ArrayList<JLocalVarStack>();
		this.LocalSize = 0;
//		this.typeStack = new Stack<Type>();
		this.BreakLabelStack = new Stack<Label>();
		this.ContinueLabelStack = new Stack<Label>();
	}

	void LoadLocal(JLocalVarStack local) {
		Type type = local.TypeInfo;
//		this.typeStack.push(type);
		this.MethodVisitor.visitVarInsn(type.getOpcode(ILOAD), local.Index);
	}

	void StoreLocal(JLocalVarStack local) {
		Type type = local.TypeInfo;
//		this.typeStack.pop(); //TODO: check cast
		this.MethodVisitor.visitVarInsn(type.getOpcode(ISTORE), local.Index);
	}

	public JLocalVarStack FindLocalVariable(String Name) {
		for(int i = 0; i < this.LocalVals.size(); i++) {
			JLocalVarStack l = this.LocalVals.get(i);
			if(l.Name.compareTo(Name) == 0) {
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
		Type type = null;
		boolean unsupportType = false;
		if(Value instanceof Long) {
			type = Type.LONG_TYPE;
		}
		else if(Value instanceof Double) {
			type = Type.DOUBLE_TYPE;
		}
		else if(Value instanceof Boolean) {
			type = Type.BOOLEAN_TYPE;
		}
		else if(Value instanceof String) {
			type = Type.getType(Value.getClass());
		}
		else if(Value instanceof GtType) {
			int id = ((GtType)Value).TypeId;
			this.MethodVisitor.visitFieldInsn(GETSTATIC, this.LocalClassLoader.GlobalStaticClassName, this.LocalClassLoader.ContextFieldName, this.LocalClassLoader.GontextDescripter);
			this.MethodVisitor.visitLdcInsn(id);
			this.InvokeMethodCall(JLib.GetTypeById);
			return;
		}
		else if(Value instanceof GtFunc) {
			int id = ((GtFunc)Value).FuncId;
			this.MethodVisitor.visitFieldInsn(GETSTATIC, this.LocalClassLoader.GlobalStaticClassName, this.LocalClassLoader.ContextFieldName, this.LocalClassLoader.GontextDescripter);
			this.MethodVisitor.visitLdcInsn(id);
			this.InvokeMethodCall(JLib.GetFuncById);
			return;
		}
		else {
			unsupportType = true;
			type = Type.getType(Value.getClass());
		}
		if(unsupportType) {
			int id = JVMConstPool.add(Value);
			this.MethodVisitor.visitLdcInsn(id);
			this.InvokeMethodCall(JLib.GetConstPool);
			this.MethodVisitor.visitTypeInsn(CHECKCAST, Type.getInternalName(Value.getClass()));
		}
		else {
			this.MethodVisitor.visitLdcInsn(Value);
//			this.typeStack.push(type);
		}
	}

	void BoxIfUnboxed(GtType GivenType, GtType RequiredType) {
//		Type type = this.typeStack.peek();
		if(GivenType.IsUnboxType() && GivenType != RequiredType) {
			if(GivenType.IsBooleanType()) {
//				this.typeStack.pop();
				this.InvokeMethodCall(JLib.BoxBooleanValue);
			}
			else if(GivenType.IsIntType()) {
//				this.typeStack.pop();
				this.InvokeMethodCall(JLib.BoxIntValue);
			}
			else if(GivenType.IsFloatType()) {
//				this.typeStack.pop();
				this.InvokeMethodCall(JLib.BoxFloatValue);
			}
		}
	}

	void UnboxIfUnboxed(GtType GivenType, GtType RequiredType) {
		if(RequiredType.IsUnboxType() && GivenType != RequiredType) {
			if(RequiredType.IsBooleanType()) {
				this.MethodVisitor.visitTypeInsn(CHECKCAST, Type.getInternalName(Boolean.class));
				this.InvokeMethodCall(JLib.UnboxBooleanValue);
			}
			else if(RequiredType.IsIntType()) {
				this.MethodVisitor.visitTypeInsn(CHECKCAST, Type.getInternalName(Long.class));
				this.InvokeMethodCall(JLib.UnboxIntValue);
			}
			else if(RequiredType.IsFloatType()) {
				this.MethodVisitor.visitTypeInsn(CHECKCAST, Type.getInternalName(Double.class));
				this.InvokeMethodCall(JLib.UnboxFloatValue);
			}
		}
		else {
//			this.MethodVisitor.visitTypeInsn(CHECKCAST, type.getInternalName());
//			this.typeStack.push(type);
		}
	}

//	void box(GtType GivenType, GtType RequiredType) {
////		Type type = this.typeStack.peek();
//		Method m = this.methodMap.get("box" + type.getDescriptor().charAt(0));
//		if(m != null) {
//			this.typeStack.pop();
//			this.Call(m);
//		}
//	}

//	void unbox(Type type) {
//		Method m = this.methodMap.get("unbox" + type.getDescriptor().charAt(0));
//		if(m != null) {
//			this.MethodVisitor.visitTypeInsn(CHECKCAST, Type.getInternalName(m.getDeclaringClass()));
//			this.VisitingBuilder.Call(m);
//		} else {
//			this.VisitingBuilder.MethodVisitor.visitTypeInsn(CHECKCAST, type.getInternalName());
//			this.VisitingBuilder.typeStack.push(type);
//		}
//	}
	
	void Call(Constructor<?> method) {
		String owner = Type.getInternalName(method.getDeclaringClass());
		this.MethodVisitor.visitMethodInsn(INVOKESPECIAL, owner, "<init>", Type.getConstructorDescriptor(method));
	}

	void InvokeMethodCall(Method method) {
		this.InvokeMethodCall(null, method);
	}
	
	void InvokeMethodCall(GtType RequiredType, Method method) {
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
		this.MethodVisitor.visitMethodInsn(inst, owner, method.getName(), Type.getMethodDescriptor(method));
		if(RequiredType != null) {
			GtType GivenType = LibGreenTea.GetNativeType(RequiredType.Context, method.getReturnType());
			this.UnboxIfUnboxed(GivenType, RequiredType);
		}
//		this.typeStack.push(Type.getReturnType(method));
	}
	
	
}


public class JavaByteCodeGenerator extends GtGenerator {
	GreenTeaClassLoader ClassGenerator;
	JMethodBuilder VisitingBuilder;
//	private final Map<String, JClassBuilder> classMap = new HashMap<String, JClassBuilder>();
//	private final Map<String, Type> typeDescriptorMap = new HashMap<String, Type>();
//	private Map<String, Method> methodMap;

	public JavaByteCodeGenerator(String TargetCode, String OutputFile, int GeneratorFlag) {
		super("java", OutputFile, GeneratorFlag);
	}

	@Override public void InitContext(GtParserContext Context) {
		super.InitContext(Context);
		this.ClassGenerator = new GreenTeaClassLoader(Context);
//		this.methodMap = InitSystemMethods();
	}

//	public static HashMap<String, Method> InitSystemMethods() {
//		HashMap<String, Method> map = new HashMap<String, Method>();
//		try {
//			Class<?> runtime = GreenTeaRuntime.class;
//			map.put("getter", runtime.getMethod("getter", Object.class, String.class));
//			map.put("setter", runtime.getMethod("setter", Object.class, String.class, Object.class));
//			map.put("error_node", runtime.getMethod("error_node", String.class));
//			Class<?> lib = LibGreenTea.class;
//			map.put("cast", lib.getMethod("DynamicCast", GtType.class, Object.class));
//			map.put("instanceof", lib.getMethod("DynamicInstanceOf", Object.class, GtType.class));
//			map.put("NewArrayLiteral", lib.getMethod("NewArrayLiteral", GtType.class, Object[].class));
//			map.put("NewArray", lib.getMethod("NewArray", GtType.class, Object[].class));
//			Class<?> proc = DShellProcess.class;
//			map.put("ExecCommandVoid", proc.getMethod("ExecCommandVoid", String[][].class));
//			map.put("ExecCommandBool", proc.getMethod("ExecCommandBool", String[][].class));
//			map.put("ExecCommandString", proc.getMethod("ExecCommandString", String[][].class));
//			// pool
//			map.put("get_const", JVMConstPool.class.getMethod("getById", int.class));
//			map.put("get_type", GtParserContext.class.getMethod("GetTypeById", int.class));
//			map.put("get_func", GtParserContext.class.getMethod("GetFuncById", int.class));
//			// boxing
//			map.put("boxI", Integer.class.getMethod("valueOf", int.class));
//			map.put("boxJ", Long.class.getMethod("valueOf", long.class));
//			map.put("boxD", Double.class.getMethod("valueOf", double.class));
//			map.put("boxZ", Boolean.class.getMethod("valueOf", boolean.class));
//			// unboxing
//			map.put("unboxI", Integer.class.getMethod("intValue"));
//			map.put("unboxJ", Long.class.getMethod("longValue"));
//			map.put("unboxD", Double.class.getMethod("doubleValue"));
//			map.put("unboxZ", Boolean.class.getMethod("booleanValue"));
//		} catch(Exception e) {
//			e.printStackTrace();
//		}
//		return map;
//	}
	
	//-----------------------------------------------------



	//-----------------------------------------------------


	//-----------------------------------------------------

//	void OutputClassFile(String className, String dir) throws IOException {
//		byte[] ba = this.GenerateBytecode(className);
//		File file = new File(dir, className + ".class");
//		FileOutputStream fos = null;
//		try {
//			fos = new FileOutputStream(file);
//			fos.write(ba);
//		} finally {
//			if(fos != null) {
//				fos.close();
//			}
//		}
//	}

//	byte[] GenerateBytecode(String className) {
//		ClassWriter classWriter = new ClassWriter(ClassWriter.COMPUTE_FRAMES);
//		JClassBuilder CNode = this.classMap.get(className);
//		assert CNode != null;
//		CNode.accept(classWriter);
//		classWriter.visitEnd();
//		return classWriter.toByteArray();
//	}

	//-----------------------------------------------------

//	@Override public Object Eval(GtNode Node) {
//		int acc = ACC_PUBLIC | ACC_STATIC;
//		String methodName = "__eval";
//		String methodDesc = "()Ljava/lang/Object;";
//		MethodNode mn = new MethodNode(acc, methodName, methodDesc, null, null);
//		JClassBuilder c = DefaultHolderClass;
//		c.addMethodNode(mn);
//		this.classMap.put(c.ClassName, c);
//
//		this.Builder = new JMethodBuilder(mn);
//		this.VisitBlock(Node);
//
//		// boxing and return
//		if(this.Builder.typeStack.empty()) {
//			this.Builder.AsmMethodVisitor.visitInsn(ACONST_NULL);
//		}
//		else {
//			this.box();
//		}
//		this.Builder.AsmMethodVisitor.visitInsn(ARETURN);
//
//		if(LibGreenTea.DebugMode) {
//			try {
//				this.OutputClassFile(defaultClassName, ".");
//			} catch(IOException e) {
//				LibGreenTea.VerboseException(e);
//			}
//		}
//		//execute
//		try {
//			GtClassLoader loader = new GtClassLoader(this);
//			Class<?> klass = loader.loadClass(defaultClassName);
//			Object res = klass.getMethod(methodName).invoke(null);
//			return res;
//		} catch(ClassNotFoundException e) {
//			LibGreenTea.VerboseException(e);
//		} catch(InvocationTargetException e) {
//			LibGreenTea.VerboseException(e);
//		} catch(IllegalAccessException e) {
//			LibGreenTea.VerboseException(e);
//		} catch(NoSuchMethodException e) {
//			LibGreenTea.VerboseException(e);
//		}
//		return null;
//	}

	@Override public void GenerateFunc(GtFunc Func, ArrayList<String> NameList, GtNode Body) {
		String MethodName = Func.GetNativeFuncName();
		String MethodDesc = JLib.GetMethodDescriptor(Func);
		MethodNode AsmMethodNode = new MethodNode(ACC_PUBLIC | ACC_STATIC, MethodName, MethodDesc, null, null);
		JClassBuilder ClassHolder = this.ClassGenerator.GenerateMethodHolderClass(MethodName, AsmMethodNode);

		JMethodBuilder LocalBuilder = new JMethodBuilder(this.ClassGenerator, AsmMethodNode);
		for(int i = 0; i < NameList.size(); i++) {
			String Name = NameList.get(i);
			LocalBuilder.AddLocal(Func.GetFuncParamType(i), Name);
		}
		JMethodBuilder PushedBuilder = this.VisitingBuilder;
		this.VisitingBuilder = LocalBuilder;
		this.VisitBlock(Body);
		this.VisitingBuilder = PushedBuilder;
		if(Func.GetReturnType().IsVoidType()) {
			// JVM always needs return;
			LocalBuilder.MethodVisitor.visitInsn(RETURN);
		}
		// for debug purpose
//		if(LibGreenTea.DebugMode) {
//			try {
//				this.OutputClassFile(defaultClassName, ".");
//			} catch(IOException e) {
//				LibGreenTea.VerboseException(e);
//			}
//		}
		try {
			Class<?> DefinedClass = this.ClassGenerator.loadClass(ClassHolder.ClassName);
			Method[] DefinedMethods = DefinedClass.getMethods();
			for(Method m : DefinedMethods) {
				if(m.getName().equals(Func.GetNativeFuncName())) {
					Func.SetNativeMethod(0, m);
					break;
				}
			}
//			System.err.println("*** " + DefinedMethods.length);
//			LibGreenTea.Assert(DefinedMethods.length == 1);
//			Func.SetNativeMethod(0, DefinedMethods[0]);
		} catch(Exception e) {
			LibGreenTea.VerboseException(e);
		}
	}

	@Override public void OpenClassField(GtType ClassType, GtClassField ClassField) {
		String ClassName = ClassType.GetNativeName();
		String superClassName = ClassType.SuperType.GetNativeName();
		JClassBuilder ClassBuilder = this.ClassGenerator.NewBuilder(ClassName, superClassName);
		// generate field
		for(GtFieldInfo field : ClassField.FieldList) {
			if(field.FieldIndex >= ClassField.ThisClassIndex) {
				int access = ACC_PUBLIC;
				String fieldName = field.NativeName;
				Type fieldType = JLib.GetAsmType(field.Type);
				FieldNode node = new FieldNode(access, fieldName, fieldType.getDescriptor(), null, null);
				ClassBuilder.FieldMap.put(fieldName, node);
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
		ClassBuilder.AddMethodNode(constructor);
		try {
			ClassType.TypeBody = this.ClassGenerator.loadClass(ClassName);
		}
		catch (Exception e) {
			LibGreenTea.VerboseException(e);
		}
	}

	//-----------------------------------------------------

	@Override public void VisitConstNode(GtConstNode Node) {
		Object constValue = Node.ConstValue;
		LibGreenTea.Assert(Node.ConstValue != null);  // Added by kimio
		this.VisitingBuilder.LoadConst(constValue);
	}

	@Override public void VisitNewNode(GtNewNode Node) {
		Type type = JLib.GetAsmType(Node.Type);
		String owner = type.getInternalName();
		this.VisitingBuilder.MethodVisitor.visitTypeInsn(NEW, owner);
		this.VisitingBuilder.MethodVisitor.visitInsn(DUP);
		if(!Node.Type.IsNative()) {
			this.VisitingBuilder.LoadConst(Node.Type);
			this.VisitingBuilder.MethodVisitor.visitMethodInsn(INVOKESPECIAL, owner, "<init>", "(Lorg/GreenTeaScript/GtType;)V");
		} else {
			this.VisitingBuilder.MethodVisitor.visitMethodInsn(INVOKESPECIAL, owner, "<init>", "()V");
		}
//		this.VisitingBuilder.typeStack.push(type);
	}

	@Override public void VisitConstructorNode(GtConstructorNode Node) {
		if(Node.Type.TypeBody instanceof Class<?>) {
			// native class
			Class<?> klass = (Class<?>) Node.Type.TypeBody;
			Type type = Type.getType(klass);
			this.VisitingBuilder.MethodVisitor.visitTypeInsn(NEW, Type.getInternalName(klass));
			this.VisitingBuilder.MethodVisitor.visitInsn(DUP);
			for(int i=0; i<Node.ParamList.size(); i++) {
				Node.ParamList.get(i).Evaluate(this);
//				this.VisitingBuilder.typeStack.pop();
			}
			this.VisitingBuilder.Call((Constructor<?>) Node.Func.FuncBody);
//			this.VisitingBuilder.typeStack.push(type);
		} else {
//			int opcode = INVOKESTATIC;
//			String owner = this.defaultClassName;
//			String methodName = Func.GetNativeFuncName();
//			String methodDescriptor = this.ToAsmMethodType(Func).getDescriptor();
//			this.Builder.AsmMethodVisitor.visitMethodInsn(opcode, owner, methodName, methodDescriptor);
//			this.Builder.typeStack.push(type);
			LibGreenTea.TODO("TypeBody is not Class<?>");
		}
	}

	@Override public void VisitNullNode(GtNullNode Node) {
//		this.VisitingBuilder.typeStack.push(JLib.GetAsmType(Node.Type));
		this.VisitingBuilder.MethodVisitor.visitInsn(ACONST_NULL);
	}

	@Override public void VisitLocalNode(GtLocalNode Node) {
		JLocalVarStack local = this.VisitingBuilder.FindLocalVariable(Node.NativeName);
		this.VisitingBuilder.LoadLocal(local);
	}

	@Override public void VisitGetterNode(GtGetterNode Node) {
		String name = Node.Func.FuncName;
		Type fieldType = JLib.GetAsmType(Node.Func.GetReturnType());
		Type ownerType = JLib.GetAsmType(Node.Func.GetFuncParamType(0));
		Node.ExprNode.Evaluate(this);
		this.VisitingBuilder.MethodVisitor.visitFieldInsn(GETFIELD, ownerType.getInternalName(), name, fieldType.getDescriptor());
//		this.VisitingBuilder.typeStack.pop();
//		this.VisitingBuilder.typeStack.push(fieldType);
		//             Type ty = Lib.GetAsmType(Node.Type);
		//             this.Builder.AsmMethodVisitor.visitLdcInsn(name);
		//             this.Builder.Call(this.methodMap.get("getter"));
		//this.unbox(ty);
	}
	
	public void VisitSetterNode(GtSetterNode Node) {
		String name = Node.Func.FuncName;
		Type fieldType = JLib.GetAsmType(Node.Func.GetFuncParamType(1));
		Type ownerType = JLib.GetAsmType(Node.Func.GetFuncParamType(0));
		Node.LeftNode.Evaluate(this);
		Node.RightNode.Evaluate(this);
		this.VisitingBuilder.MethodVisitor.visitFieldInsn(PUTFIELD, ownerType.getInternalName(), name, fieldType.getDescriptor());
//		Node.LeftNode.Evaluate(this);
//		this.Builder.AsmMethodVisitor.visitLdcInsn(name);
//		Node.RightNode.Evaluate(this);
//		this.box();
//		this.Builder.Call(this.methodMap.get("setter"));
	}

//	public void VisitDySetterNode(GtDySetterNode SetterNode) {
//		this.VisitingBuilder.LoadConst(SetterNode.Type);
//		SetterNode.LeftNode.Evaluate(this);
//		this.VisitingBuilder.MethodVisitor.visitLdcInsn(SetterNode.FieldName);
//		SetterNode.RightNode.Evaluate(this);
//		if(SetterNode.RightNode.Type.IsUnboxType()) {
//			this.box();
//		}
//		this.VisitingBuilder.InvokeMethodCall(Lib.DynamicSetter);
//	}

	@Override public void VisitApplyNode(GtApplyNode Node) {
		GtFunc Func = Node.Func;
		for(int i = 1; i < Node.NodeList.size(); i++) {
			GtNode ParamNode = Node.NodeList.get(i);
			ParamNode.Evaluate(this);
			this.VisitingBuilder.BoxIfUnboxed(ParamNode.Type, Func.GetFuncParamType(i - 1));
//			this.VisitingBuilder.typeStack.pop();
		}
		Method m = null;
		if(Func.FuncBody instanceof Method) {
			m = (Method) Func.FuncBody;
		}
		if(m != null) {
			this.VisitingBuilder.InvokeMethodCall(Node.Type, m);
		}
		else {
			String MethodName = Func.GetNativeFuncName(); 
			String Owner = JLib.GetHolderClassName(Node.Type.Context, MethodName);
			String MethodDescriptor = JLib.GetMethodDescriptor(Func);
			this.VisitingBuilder.MethodVisitor.visitMethodInsn(INVOKESTATIC, Owner, MethodName, MethodDescriptor);
//			this.VisitingBuilder.typeStack.push(JLib.GetAsmType(Func.GetReturnType()));
			this.VisitingBuilder.UnboxIfUnboxed(Func.GetReturnType(), Node.Type);
		}
	}

	@Override public void VisitStaticApplyNode(GtStaticApplyNode ApplyNode) {
		GtFunc Func = ApplyNode.Func;
		for(int i = 0; i < ApplyNode.ParamList.size(); i++) {
			GtNode ParamNode = ApplyNode.ParamList.get(i);
			ParamNode.Evaluate(this);
			this.VisitingBuilder.BoxIfUnboxed(ParamNode.Type, Func.GetFuncParamType(i));
//			this.VisitingBuilder.typeStack.pop();
		}
		if(Func.FuncBody instanceof Method) {
			this.VisitingBuilder.InvokeMethodCall(ApplyNode.Type, (Method) Func.FuncBody);
		}
		else {
			String MethodName = Func.GetNativeFuncName(); 
			String Owner = JLib.GetHolderClassName(ApplyNode.Type.Context, MethodName);
			String MethodDescriptor = JLib.GetMethodDescriptor(Func);
			this.VisitingBuilder.MethodVisitor.visitMethodInsn(INVOKESTATIC, Owner, MethodName, MethodDescriptor);
//			this.VisitingBuilder.typeStack.push(JLib.GetAsmType(Func.GetReturnType()));
			this.VisitingBuilder.UnboxIfUnboxed(Func.GetReturnType(), ApplyNode.Type);
		}
	}

	@Override public void VisitBinaryNode(GtBinaryNode Node) {
		if(Node.Func.FuncBody instanceof Method) {
			Node.LeftNode.Evaluate(this);
//			this.VisitingBuilder.typeStack.pop();
			Node.RightNode.Evaluate(this);
//			this.VisitingBuilder.typeStack.pop();
			this.VisitingBuilder.InvokeMethodCall(Node.Type, (Method)Node.Func.FuncBody);
		}
		else {
			throw new RuntimeException("unsupport binary operator: " + Node.Func.FuncName);
		}
	}

	@Override public void VisitUnaryNode(GtUnaryNode Node) {
		if(Node.Func.FuncBody instanceof Method) {
			Node.Expr.Evaluate(this);
//			this.VisitingBuilder.typeStack.pop();
			this.VisitingBuilder.InvokeMethodCall(Node.Type, (Method)Node.Func.FuncBody);
		}
		else {
			throw new RuntimeException("unsupport unary operator: " + Node.Func.FuncName);
		}
	}

	@Override public void VisitIndexerNode(GtIndexerNode Node) {
		ArrayList<GtNode> NodeList = Node.NodeList;
		Node.Expr.Evaluate(this);
		for(int i=0; i<NodeList.size(); i++) {
			NodeList.get(i).Evaluate(this);
		}
		this.VisitingBuilder.InvokeMethodCall(Node.Type, (Method) Node.Func.FuncBody);
	}

	@Override public void VisitArrayNode(GtArrayNode Node) {
		ArrayList<GtNode> NodeList = Node.NodeList;
		this.VisitingBuilder.LoadConst(Node.Type);
		this.VisitingBuilder.MethodVisitor.visitLdcInsn(NodeList.size());
		this.VisitingBuilder.MethodVisitor.visitTypeInsn(ANEWARRAY, Type.getInternalName(Object.class));
		for(int i=0; i<NodeList.size(); i++) {
			this.VisitingBuilder.MethodVisitor.visitInsn(DUP);
			this.VisitingBuilder.MethodVisitor.visitLdcInsn(i);
			NodeList.get(i).Evaluate(this);
			this.VisitingBuilder.BoxIfUnboxed(NodeList.get(i).Type, Node.Type.TypeParams[0]);
//			this.VisitingBuilder.typeStack.pop();
			this.VisitingBuilder.MethodVisitor.visitInsn(AASTORE);
		}
		this.VisitingBuilder.InvokeMethodCall(Node.Type, JLib.NewArrayLiteral);
		//this.VisitingBuilder.MethodVisitor.visitTypeInsn(CHECKCAST, Type.getInternalName(GreenTeaArray.class));
	}

	public void VisitNewArrayNode(GtNewArrayNode Node) {
		this.VisitingBuilder.LoadConst(Node.Type);
		this.VisitingBuilder.MethodVisitor.visitLdcInsn(Node.NodeList.size());
		this.VisitingBuilder.MethodVisitor.visitTypeInsn(ANEWARRAY, Type.getInternalName(Object.class));
		for(int i=0; i<Node.NodeList.size(); i++) {
			this.VisitingBuilder.MethodVisitor.visitInsn(DUP);
			this.VisitingBuilder.MethodVisitor.visitLdcInsn(i);
			Node.NodeList.get(i).Evaluate(this);
			this.VisitingBuilder.BoxIfUnboxed(Node.NodeList.get(i).Type, this.Context.AnyType);
			this.VisitingBuilder.MethodVisitor.visitInsn(AASTORE);
//			this.VisitingBuilder.typeStack.pop();
		}
		this.VisitingBuilder.InvokeMethodCall(Node.Type, JLib.NewArray);
		//this.VisitingBuilder.MethodVisitor.visitTypeInsn(CHECKCAST, Type.getInternalName(GreenTeaArray.class));
		//this.VisitingBuilder.typeStack.push(Lib.GetAsmType(Node.Type));
	}

	@Override public void VisitAndNode(GtAndNode Node) {
		Label elseLabel = new Label();
		Label mergeLabel = new Label();
		Node.LeftNode.Evaluate(this);
//		this.VisitingBuilder.typeStack.pop();
		this.VisitingBuilder.MethodVisitor.visitJumpInsn(IFEQ, elseLabel);

		Node.RightNode.Evaluate(this);
//		this.VisitingBuilder.typeStack.pop();
		this.VisitingBuilder.MethodVisitor.visitJumpInsn(IFEQ, elseLabel);

		this.VisitingBuilder.MethodVisitor.visitLdcInsn(true);
		this.VisitingBuilder.MethodVisitor.visitJumpInsn(GOTO, mergeLabel);

		this.VisitingBuilder.MethodVisitor.visitLabel(elseLabel);
		this.VisitingBuilder.MethodVisitor.visitLdcInsn(false);
		this.VisitingBuilder.MethodVisitor.visitJumpInsn(GOTO, mergeLabel);

		this.VisitingBuilder.MethodVisitor.visitLabel(mergeLabel);
//		this.VisitingBuilder.typeStack.push(Type.BOOLEAN_TYPE);
	}

	@Override public void VisitOrNode(GtOrNode Node) {
		Label thenLabel = new Label();
		Label mergeLabel = new Label();
		Node.LeftNode.Evaluate(this);
//		this.VisitingBuilder.typeStack.pop();
		this.VisitingBuilder.MethodVisitor.visitJumpInsn(IFNE, thenLabel);

		Node.RightNode.Evaluate(this);
//		this.VisitingBuilder.typeStack.pop();
		this.VisitingBuilder.MethodVisitor.visitJumpInsn(IFNE, thenLabel);

		this.VisitingBuilder.MethodVisitor.visitLdcInsn(false);
		this.VisitingBuilder.MethodVisitor.visitJumpInsn(GOTO, mergeLabel);

		this.VisitingBuilder.MethodVisitor.visitLabel(thenLabel);
		this.VisitingBuilder.MethodVisitor.visitLdcInsn(true);
		this.VisitingBuilder.MethodVisitor.visitJumpInsn(GOTO, mergeLabel);

		this.VisitingBuilder.MethodVisitor.visitLabel(mergeLabel);
//		this.VisitingBuilder.typeStack.push(Type.BOOLEAN_TYPE);
	}

	@Override public void VisitAssignNode(GtAssignNode Node) {
		assert (Node.LeftNode instanceof GtLocalNode);
		GtLocalNode Left = (GtLocalNode) Node.LeftNode;
		JLocalVarStack local = this.VisitingBuilder.FindLocalVariable(Left.NativeName);
		Node.RightNode.Evaluate(this);
		this.VisitingBuilder.StoreLocal(local);
	}

	@Override public void VisitSelfAssignNode(GtSelfAssignNode Node) {
		if(Node.LeftNode instanceof GtLocalNode) {
			GtLocalNode Left = (GtLocalNode)Node.LeftNode;
			JLocalVarStack local = this.VisitingBuilder.FindLocalVariable(Left.NativeName);
			Node.LeftNode.Evaluate(this);
//			this.VisitingBuilder.typeStack.pop();
			Node.RightNode.Evaluate(this);
//			this.VisitingBuilder.typeStack.pop();
			this.VisitingBuilder.InvokeMethodCall((Method)Node.Func.FuncBody);
			this.VisitingBuilder.StoreLocal(local);
		}
		else {
			LibGreenTea.TODO("selfAssign");
		}
	}

	@Override public void VisitVarNode(GtVarNode Node) {
		JLocalVarStack local = this.VisitingBuilder.AddLocal(Node.Type, Node.NativeName);
		Node.InitNode.Evaluate(this);
		this.VisitingBuilder.StoreLocal(local);
		this.VisitBlock(Node.BlockNode);
	}

	@Override public void VisitIfNode(GtIfNode Node) {
		Label ElseLabel = new Label();
		Label EndLabel = new Label();
		Node.CondExpr.Evaluate(this);
//		this.VisitingBuilder.typeStack.pop(); //TODO: check cast
		this.VisitingBuilder.MethodVisitor.visitJumpInsn(IFEQ, ElseLabel);
		// Then
		this.VisitBlock(Node.ThenNode);
		this.VisitingBuilder.MethodVisitor.visitJumpInsn(GOTO, EndLabel);
		// Else
		this.VisitingBuilder.MethodVisitor.visitLabel(ElseLabel);
		if(Node.ElseNode != null) {
			this.VisitBlock(Node.ElseNode);
			this.VisitingBuilder.MethodVisitor.visitJumpInsn(GOTO, EndLabel);
		}
		// End
		this.VisitingBuilder.MethodVisitor.visitLabel(EndLabel);
	}

	@Override public void VisitTrinaryNode(GtTrinaryNode Node) {
		Label ElseLabel = new Label();
		Label EndLabel = new Label();
		Node.ConditionNode.Evaluate(this);
//		this.VisitingBuilder.typeStack.pop();
		this.VisitingBuilder.MethodVisitor.visitJumpInsn(IFEQ, ElseLabel);
		// Then
		this.VisitBlock(Node.ThenNode);
		this.VisitingBuilder.MethodVisitor.visitJumpInsn(GOTO, EndLabel);
		// Else
		this.VisitingBuilder.MethodVisitor.visitLabel(ElseLabel);
		this.VisitBlock(Node.ElseNode);
		this.VisitingBuilder.MethodVisitor.visitJumpInsn(GOTO, EndLabel);
		// End
		this.VisitingBuilder.MethodVisitor.visitLabel(EndLabel);
	}

	@Override public void VisitSwitchNode(GtSwitchNode Node) {
		int cases = Node.CaseList.size() / 2;
		int[] keys = new int[cases];
		Label[] caseLabels = new Label[cases];
		Label defaultLabel = new Label();
		Label breakLabel = new Label();
		for(int i=0; i<cases; i++) {
			keys[i] = ((Number)((GtConstNode)Node.CaseList.get(i*2)).ConstValue).intValue();
			caseLabels[i] = new Label();
		}
		Node.MatchNode.Evaluate(this);
		this.VisitingBuilder.MethodVisitor.visitInsn(L2I);
//		this.VisitingBuilder.typeStack.pop();
		this.VisitingBuilder.MethodVisitor.visitLookupSwitchInsn(defaultLabel, keys, caseLabels);
		for(int i=0; i<cases; i++) {
			this.VisitingBuilder.BreakLabelStack.push(breakLabel);
			this.VisitingBuilder.MethodVisitor.visitLabel(caseLabels[i]);
			this.VisitBlock(Node.CaseList.get(i*2+1));
			this.VisitingBuilder.BreakLabelStack.pop();
		}
		this.VisitingBuilder.MethodVisitor.visitLabel(defaultLabel);
		this.VisitBlock(Node.DefaultBlock);
		this.VisitingBuilder.MethodVisitor.visitLabel(breakLabel);
	}

	@Override public void VisitWhileNode(GtWhileNode Node) {
		Label continueLabel = new Label();
		Label breakLabel = new Label();
		this.VisitingBuilder.BreakLabelStack.push(breakLabel);
		this.VisitingBuilder.ContinueLabelStack.push(continueLabel);

		this.VisitingBuilder.MethodVisitor.visitLabel(continueLabel);
		Node.CondExpr.Evaluate(this);
//		this.VisitingBuilder.typeStack.pop();
		this.VisitingBuilder.MethodVisitor.visitJumpInsn(IFEQ, breakLabel); // condition
		this.VisitBlock(Node.LoopBody);
		this.VisitingBuilder.MethodVisitor.visitJumpInsn(GOTO, continueLabel);
		this.VisitingBuilder.MethodVisitor.visitLabel(breakLabel);

		this.VisitingBuilder.BreakLabelStack.pop();
		this.VisitingBuilder.ContinueLabelStack.pop();
	}

	@Override public void VisitDoWhileNode(GtDoWhileNode Node) {
		Label headLabel = new Label();
		Label continueLabel = new Label();
		Label breakLabel = new Label();
		this.VisitingBuilder.BreakLabelStack.push(breakLabel);
		this.VisitingBuilder.ContinueLabelStack.push(continueLabel);

		this.VisitingBuilder.MethodVisitor.visitLabel(headLabel);
		this.VisitBlock(Node.LoopBody);
		this.VisitingBuilder.MethodVisitor.visitLabel(continueLabel);
		Node.CondExpr.Evaluate(this);
//		this.VisitingBuilder.typeStack.pop();
		this.VisitingBuilder.MethodVisitor.visitJumpInsn(IFEQ, breakLabel); // condition
		this.VisitingBuilder.MethodVisitor.visitJumpInsn(GOTO, headLabel);
		this.VisitingBuilder.MethodVisitor.visitLabel(breakLabel);

		this.VisitingBuilder.BreakLabelStack.pop();
		this.VisitingBuilder.ContinueLabelStack.pop();
	}

	@Override public void VisitForNode(GtForNode Node) {
		Label headLabel = new Label();
		Label continueLabel = new Label();
		Label breakLabel = new Label();
		this.VisitingBuilder.BreakLabelStack.push(breakLabel);
		this.VisitingBuilder.ContinueLabelStack.push(continueLabel);

		this.VisitingBuilder.MethodVisitor.visitLabel(headLabel);
		Node.CondExpr.Evaluate(this);
//		this.VisitingBuilder.typeStack.pop();
		this.VisitingBuilder.MethodVisitor.visitJumpInsn(IFEQ, breakLabel); // condition
		this.VisitBlock(Node.LoopBody);
		this.VisitingBuilder.MethodVisitor.visitLabel(continueLabel);
		Node.IterExpr.Evaluate(this);
		//this.Builder.typeStack.pop();
		this.VisitingBuilder.MethodVisitor.visitJumpInsn(GOTO, headLabel);
		this.VisitingBuilder.MethodVisitor.visitLabel(breakLabel);

		this.VisitingBuilder.BreakLabelStack.pop();
		this.VisitingBuilder.ContinueLabelStack.pop();
	}

	@Override public void VisitForEachNode(GtForEachNode Node) {
		LibGreenTea.TODO("ForEach");
	}

	@Override public void VisitReturnNode(GtReturnNode Node) {
		if(Node.Expr != null) {
			Node.Expr.Evaluate(this);
//			Type type = this.VisitingBuilder.typeStack.pop();
			Type type = JLib.GetAsmType(Node.Expr.Type);
			this.VisitingBuilder.MethodVisitor.visitInsn(type.getOpcode(IRETURN));
		}
		else {
			this.VisitingBuilder.MethodVisitor.visitInsn(RETURN);
		}
	}

	@Override public void VisitBreakNode(GtBreakNode Node) {
		Label l = this.VisitingBuilder.BreakLabelStack.peek();
		this.VisitingBuilder.MethodVisitor.visitJumpInsn(GOTO, l);
	}

	@Override public void VisitContinueNode(GtContinueNode Node) {
		Label l = this.VisitingBuilder.ContinueLabelStack.peek();
		this.VisitingBuilder.MethodVisitor.visitJumpInsn(GOTO, l);
	}

	@Override public void VisitTryNode(GtTryNode Node) { //FIXME
		int catchSize = Node.CatchBlock != null ? 1 : 0;
		MethodVisitor mv = this.VisitingBuilder.MethodVisitor;
		Label beginTryLabel = new Label();
		Label endTryLabel = new Label();
		Label finallyLabel = new Label();
		Label catchLabel[] = new Label[catchSize];

		// try block
		mv.visitLabel(beginTryLabel);
		this.VisitBlock(Node.TryBlock);
		mv.visitLabel(endTryLabel);
		mv.visitJumpInsn(GOTO, finallyLabel);

		// prepare
		for(int i = 0; i < catchSize; i++) { //TODO: add exception class name
			catchLabel[i] = new Label();
			String throwType = JLib.GetAsmType(Node.CatchExpr.Type).getInternalName();
			mv.visitTryCatchBlock(beginTryLabel, endTryLabel, catchLabel[i], throwType);
		}

		// catch block
		for(int i = 0; i < catchSize; i++) { //TODO: add exception class name
			GtNode block = Node.CatchBlock;
			mv.visitLabel(catchLabel[i]);
			this.VisitBlock(block);
			mv.visitJumpInsn(GOTO, finallyLabel);
		}

		// finally block
		mv.visitLabel(finallyLabel);
		this.VisitBlock(Node.FinallyBlock);
	}

	@Override public void VisitThrowNode(GtThrowNode Node) {
		// use wrapper
		String name = Type.getInternalName(GtThrowableWrapper.class);
		this.VisitingBuilder.MethodVisitor.visitTypeInsn(NEW, name);
		this.VisitingBuilder.MethodVisitor.visitInsn(DUP);
		Node.Expr.Evaluate(this);
		//this.box();
//		this.VisitingBuilder.typeStack.pop();
		this.VisitingBuilder.MethodVisitor.visitMethodInsn(INVOKESPECIAL, name, "<init>", "(Ljava/lang/Object;)V");
		this.VisitingBuilder.MethodVisitor.visitInsn(ATHROW);
	}

	@Override public void VisitInstanceOfNode(GtInstanceOfNode Node) {
		Node.ExprNode.Evaluate(this);
		this.VisitingBuilder.BoxIfUnboxed(Node.ExprNode.Type, this.Context.AnyType);
		this.VisitingBuilder.LoadConst(Node.TypeInfo);
		this.VisitingBuilder.InvokeMethodCall(JLib.GreenInstanceOfOperator);
//		this.unbox(Type.BOOLEAN_TYPE);
//		this.VisitingBuilder.typeStack.push(Type.BOOLEAN_TYPE);
	}

	@Override public void VisitCastNode(GtCastNode Node) {
		this.VisitingBuilder.LoadConst(Node.CastType);
		Node.Expr.Evaluate(this);
		this.VisitingBuilder.BoxIfUnboxed(Node.Expr.Type, this.Context.AnyType);
		this.VisitingBuilder.InvokeMethodCall(Node.CastType, JLib.GreenCastOperator);
//		this.VisitingBuilder.typeStack.pop();
//		this.VisitingBuilder.typeStack.push(JLib.GetAsmType(Node.CastType));
	}

	@Override public void VisitFunctionNode(GtFunctionNode Node) {
		LibGreenTea.TODO("FunctionNode");
	}

	@Override public void VisitErrorNode(GtErrorNode Node) {
//		this.Builder.AsmMethodVisitor.visitLdcInsn("(ErrorNode)");
//		this.Builder.Call(this.methodMap.get("error_node"));
		LibGreenTea.Exit(1, "ErrorNode found in JavaByteCodeGenerator");
	}

	@Override public void VisitCommandNode(GtCommandNode Node) {
		ArrayList<ArrayList<GtNode>> Args = new ArrayList<ArrayList<GtNode>>();
		GtCommandNode node = Node;
		while(node != null) {
			Args.add(node.ArgumentList);
			node = (GtCommandNode) node.PipedNextNode;
		}
		// new String[][n]
		this.VisitingBuilder.MethodVisitor.visitLdcInsn(Args.size());
		this.VisitingBuilder.MethodVisitor.visitTypeInsn(ANEWARRAY, Type.getInternalName(String[].class));
		for(int i=0; i<Args.size(); i++) {
			// new String[m];
			ArrayList<GtNode> Arg = Args.get(i);
			this.VisitingBuilder.MethodVisitor.visitInsn(DUP);
			this.VisitingBuilder.MethodVisitor.visitLdcInsn(i);
			this.VisitingBuilder.MethodVisitor.visitLdcInsn(Arg.size());
			this.VisitingBuilder.MethodVisitor.visitTypeInsn(ANEWARRAY, Type.getInternalName(String.class));
			for(int j=0; j<Arg.size(); j++) {
				this.VisitingBuilder.MethodVisitor.visitInsn(DUP);
				this.VisitingBuilder.MethodVisitor.visitLdcInsn(j);
				Arg.get(j).Evaluate(this);
//				this.VisitingBuilder.typeStack.pop();
				this.VisitingBuilder.MethodVisitor.visitInsn(AASTORE);
			}
			this.VisitingBuilder.MethodVisitor.visitInsn(AASTORE);
		}
		if(Node.Type.IsBooleanType()) {
			this.VisitingBuilder.InvokeMethodCall(Node.Type, JLib.ExecCommandBool);
		}
		else if(Node.Type.IsStringType()) {
			this.VisitingBuilder.InvokeMethodCall(Node.Type, JLib.ExecCommandString);
		}
		else {
			this.VisitingBuilder.InvokeMethodCall(Node.Type, JLib.ExecCommandVoid);
		}
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
