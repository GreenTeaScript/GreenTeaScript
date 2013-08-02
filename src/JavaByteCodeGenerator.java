import java.io.File;

import java.io.FileOutputStream;
import java.io.IOException;
import java.lang.reflect.InvocationTargetException;
import java.lang.reflect.Method;
import java.lang.reflect.Modifier;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Stack;

import org.objectweb.asm.ClassVisitor;
import org.objectweb.asm.ClassWriter;
import org.objectweb.asm.Label;
import org.objectweb.asm.MethodVisitor;
import org.objectweb.asm.Opcodes;
import org.objectweb.asm.Type;
import org.objectweb.asm.tree.MethodNode;

// GreenTea Generator should be written in each language.

class LabelStack {
	ArrayList<String>	LabelNames;
	ArrayList<Label>	Labels;

	LabelStack() {
		this.LabelNames = new ArrayList<String>();
		this.Labels = new ArrayList<Label>();
	}

	void AddLabel(String Name, Label Label) {
		this.LabelNames.add(Name);
		this.Labels.add(Label);
	}

	Label FindLabel(String Name) {
		for(int i = this.LabelNames.size() - 1; i >= 0; i--) {
			String LName = (String) this.LabelNames.get(i);
			if(LName.equals(Name)) {
				return (Label) this.Labels.get(i);
			}
		}
		return null;
	}

	void RemoveLabel(String Name) {
		for(int i = this.LabelNames.size() - 1; i >= 0; i--) {
			String LName = (String) this.LabelNames.get(i);
			if(LName.equals(Name)) {
				this.LabelNames.remove(i);
				this.Labels.remove(i);
			}
		}
	}
}

class GtClassNode implements Opcodes {
	final String					name;
	final Map<String, MethodNode>	methods	= new HashMap<String, MethodNode>();

	public GtClassNode(String name) {
		this.name = name;
	}

	public void accept(ClassVisitor cv) {
		cv.visit(V1_6, ACC_PUBLIC, this.name, null, "java/lang/Object", null);
		for(MethodNode m : this.methods.values()) {
			m.accept(cv);
		}
	}

	public MethodNode getMethodNode(String name) {
		return this.methods.get(name);
	}
}

class GtClassLoader extends ClassLoader {
	JavaByteCodeGenerator Gen;

	public GtClassLoader(JavaByteCodeGenerator Gen) {
		this.Gen = Gen;
	}

	@Override
	protected Class<?> findClass(String name) {
		byte[] b = this.Gen.generateBytecode(name);
		return this.defineClass(name, b, 0, b.length);
	}
}

class Local {
	public String		Name;
	public GtType	TypeInfo;
	public int			Index;

	public Local(int Index, GtType TypeInfo, String Name) {
		this.Index = Index;
		this.TypeInfo = TypeInfo;
		this.Name = Name;
	}
}

class MethodPath {
	TypedNode Run(GtNameSpace NameSpace, GtType ReturnType, TypedNode Block) {
		return null;
	}
}

class CheckReturnNodePath extends MethodPath {
	@Override
	TypedNode Run(GtNameSpace NameSpace, GtType ReturnType, TypedNode Block) {
		TypedNode TailNode = null;
		if(Block != null) {
			TailNode = Block.MoveTailNode();
			if(TailNode instanceof ReturnNode) {
				// Block has ReturnInst
				return Block;
			}
		}
		TypedNode ReturnNode = null;
		GtContext Context = NameSpace.GtContext;
		if(ReturnType.equals(Context.VoidType)) {
			ReturnNode = new ReturnNode(ReturnType, null, null);
		} else {
			ReturnNode = new ReturnNode(ReturnType, null, new NullNode(ReturnType, null));
		}
		if(Block == null) {
			return ReturnNode;
		}
		GtStatic.LinkNode(Block.MoveTailNode(), ReturnNode); 	//Block.Next(ReturnNode);
		
		return Block;
	}
}

class GtClass extends GtDef {
	public GtType	ClassInfo;

	//@HostLang
	public GtClass(GtType ClassInfo) {
		this.ClassInfo = ClassInfo;
	}

	@Override
	public void MakeDefinition(GtNameSpace NameSpace) {
	}
}

abstract class GtMethodInvoker {
	GtParam		Param;
	public Object	CompiledCode;

	public GtMethodInvoker(GtParam Param, Object CompiledCode) {
		this.Param = Param;
		this.CompiledCode = CompiledCode;

	}

	public Object Invoke(Object[] Args) {
		return null;
	}
}

class NativeMethodInvoker extends GtMethodInvoker {

	public NativeMethodInvoker(GtParam Param, Method MethodRef) {
		super(Param, MethodRef);
	}

	public Method GetMethodRef() {
		return (Method) this.CompiledCode;
	}

	boolean IsStaticInvocation() {
		return Modifier.isStatic(this.GetMethodRef().getModifiers());
	}

	@Override
	public Object Invoke(Object[] Args) {
		int ParamSize = this.Param != null ? this.Param.ParamSize : 0;
		try {
			Method MethodRef = this.GetMethodRef();
			if(this.IsStaticInvocation()) {
				switch (ParamSize) {
				case 0:
					return MethodRef.invoke(null, Args[0]);
				case 1:
					return MethodRef.invoke(null, Args[0], Args[1]);
				case 2:
					return MethodRef.invoke(null, Args[0], Args[0], Args[2]);
				case 3:
					return MethodRef.invoke(null, Args[0], Args[0], Args[2], Args[3]);
				case 4:
					return MethodRef.invoke(null, Args[0], Args[1], Args[2], Args[3], Args[4]);
				case 5:
					return MethodRef.invoke(null, Args[0], Args[1], Args[2], Args[3], Args[4], Args[5]);
				default:
					return MethodRef.invoke(null, Args); // FIXME
				}
			} else {
				switch (ParamSize) {
				case 0:
					return MethodRef.invoke(Args[0]);
				case 1:
					return MethodRef.invoke(Args[0], Args[1]);
				case 2:
					return MethodRef.invoke(Args[0], Args[0], Args[2]);
				case 3:
					return MethodRef.invoke(Args[0], Args[0], Args[2], Args[3]);
				case 4:
					return MethodRef.invoke(Args[0], Args[1], Args[2], Args[3], Args[4]);
				case 5:
					return MethodRef.invoke(Args[0], Args[1], Args[2], Args[3], Args[4], Args[5]);
				default:
					return MethodRef.invoke(Args[0], Args); // FIXME
				}
			}
		} catch (IllegalArgumentException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} catch (IllegalAccessException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} catch (InvocationTargetException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		return null;
	}
}

class JVMBuilder extends GreenTeaGenerator implements Opcodes {

	ArrayList<Local>                LocalVals;
	GtMethod                        MethodInfo;

	MethodVisitor                   methodVisitor;
	Stack<Type>                     typeStack;
	LabelStack                      LabelStack;
	GtNameSpace                     NameSpace;
	TypeResolver                    TypeResolver;

	public JVMBuilder(GtMethod method, MethodVisitor mv, TypeResolver TypeResolver, GtNameSpace NameSpace) {
		this.LocalVals = new ArrayList<Local>();
		this.MethodInfo = method;
		
		this.methodVisitor = mv;
		this.typeStack = new Stack<Type>();
		this.LabelStack = new LabelStack();
		this.TypeResolver = TypeResolver;
		this.NameSpace = NameSpace;
	}

	void LoadLocal(Local local) {
		GtType gtype = local.TypeInfo;
		Type type = this.TypeResolver.GetAsmType(gtype);
		this.typeStack.push(type);
		this.methodVisitor.visitVarInsn(type.getOpcode(ILOAD), local.Index);
	}

	void StoreLocal(Local local) {
		GtType gtype = local.TypeInfo;
		Type type = this.TypeResolver.GetAsmType(gtype);
		this.typeStack.pop(); //TODO: check cast
		this.methodVisitor.visitVarInsn(type.getOpcode(ISTORE), local.Index);
	}

	void LoadConst(Object o) {
		Type type;
		boolean unsupportType = false;
		if(o instanceof Integer) {
			type = Type.INT_TYPE;
		} else if(o instanceof Boolean) {
			type = Type.BOOLEAN_TYPE;
		} else if(o instanceof String) {
			type = this.TypeResolver.GetAsmType(o.getClass());
		} else {
			unsupportType = true;
			type = this.TypeResolver.GetAsmType(o.getClass());
		}
		this.typeStack.push(type);
		if(unsupportType) {
			int id = addConstValue(o);
			String owner = Type.getInternalName(this.getClass());
			String methodName = "getConstValue";
			String methodDesc = "(I)Ljava/lang/Object;";
			this.methodVisitor.visitLdcInsn(id);
			this.methodVisitor.visitMethodInsn(INVOKESTATIC, owner, methodName, methodDesc);
			this.methodVisitor.visitTypeInsn(CHECKCAST, Type.getInternalName(o.getClass()));
		} else {
			this.methodVisitor.visitLdcInsn(o);
		}
	}

	static List<Object> constValues = new ArrayList<Object>();
	static int addConstValue(Object o) {
		int id = constValues.indexOf(o);
		if(id != -1) {
			return id;
		} else {
			constValues.add(o);
			return constValues.size() - 1;
		}
	}

	public static Object getConstValue(int id) {
		return constValues.get(id);
	}

	void Call(int opcode, GtMethod Method) { //FIXME
//		if(Method.MethodInvoker instanceof NativeMethodInvoker) {
//			NativeMethodInvoker i = (NativeMethodInvoker) Method.MethodInvoker;
//			Method m = i.GetMethodRef();
//			String owner = this.TypeResolver.GetAsmType(m.getDeclaringClass()).getInternalName();
//			String methodName = m.getName();
//			String methodDescriptor = Type.getMethodDescriptor(m);
//			if(Modifier.isStatic(m.getModifiers())) {
//				opcode = INVOKESTATIC;
//			}
//			this.methodVisitor.visitMethodInsn(opcode, owner, methodName, methodDescriptor);
//			this.typeStack.push(this.TypeResolver.GetAsmType(m.getReturnType()));
//		} else {
//			//			Class<?> OwnerClass = Method.ClassInfo.HostedClassInfo;
//			//			if(OwnerClass == null) {
//			//				OwnerClass = Method.ClassInfo.DefaultNullValue.getClass();
//			//			}
//			//			String owner = OwnerClass.getName().replace(".", "/");
//			String owner = "global";//FIXME
//			String methodName = Method.MethodName;
//			String methodDescriptor = this.TypeResolver.GetJavaMethodDescriptor(Method);
//			this.methodVisitor.visitMethodInsn(opcode, owner, methodName, methodDescriptor);
//			this.typeStack.push(this.TypeResolver.GetAsmType(Method.GetReturnType(null)));
//		}
	}

	public Local FindLocalVariable(String Name) {
		for(int i = 0; i < this.LocalVals.size(); i++) {
			Local l = (Local) this.LocalVals.get(i);
			if(l.Name.compareTo(Name) == 0) {
				return l;
			}
		}
		return null;
	}

	public Local AddLocal(GtType Type, String Name) {
		Local local = new Local(this.LocalVals.size(), Type, Name);
		this.LocalVals.add(local);
		return local;
	}

	public TypedNode VerifyBlock(GtNameSpace NameSpace, boolean IsEval, GtType ReturnType, TypedNode Block) {
		if(IsEval) {
			return Block;
		}
		Block = new CheckReturnNodePath().Run(NameSpace, ReturnType, Block);
		return Block;
	}

	public void VisitList(TypedNode Node) {
//		boolean Ret = true;
//		while(Ret && Node != null) {
//			Ret &= Node.Evaluate(this);
//			Node = Node.NextNode;
//		}
//		return Ret;
		while(Node != null) {
			Node.Evaluate(this);
			Node = Node.NextNode;
		}
	}

	// FIXME: return value
	@Override 
	public void VisitDefineNode(DefineNode Node) { 
		if(Node.DefInfo instanceof GtClass) {
			GtClass c = (GtClass) Node.DefInfo;
			c.MakeDefinition(this.NameSpace);
		} else if(Node.DefInfo instanceof GtMethod) {
			GtMethod m = (GtMethod) Node.DefInfo;
			m.DoCompilation();
		}
	}

	@Override 
	public void VisitConstNode(ConstNode Node) { 
		Object constValue = Node.ConstValue;
		this.LoadConst(constValue);
	}

	@Override 
	public void VisitNewNode(NewNode Node) { 
		Type type = TypeResolver.GetAsmType(Node.Type);
		String owner = type.getInternalName();
		this.methodVisitor.visitTypeInsn(NEW, owner);
		this.methodVisitor.visitInsn(DUP);
		typeStack.push(type);
	}

	@Override 
	public void VisitNullNode(NullNode Node) { 
		GtType TypeInfo = Node.Type;
		if(TypeInfo.DefaultNullValue != null) {
			this.typeStack.push(this.TypeResolver.GetAsmType(TypeInfo.DefaultNullValue.getClass()));
			this.LoadConst(TypeInfo.DefaultNullValue);
		} else {
			// FIXME support primitive type (e.g. int)
			this.typeStack.push(this.TypeResolver.GetAsmType(Object.class));
			this.methodVisitor.visitInsn(ACONST_NULL);
		}
	}

	@Override 
	public void VisitLocalNode(LocalNode Node) { //FIXME
//		String FieldName = Node.FieldName;
//		Local local;
//		if((local = this.FindLocalVariable(FieldName)) == null) {
//			throw new RuntimeException("local variable not found:" + FieldName);
//		}
//		this.LoadLocal(local);
	}

	@Override 
	public void VisitGetterNode(GetterNode Node) { 
		Node.Expr.Evaluate(this);
	}

	boolean isPrimitiveType(Type type) {
		return !type.getDescriptor().startsWith("L");
	}

	void box() {
		Type type = this.typeStack.pop();
		if(type.equals(Type.INT_TYPE)) {
			this.methodVisitor.visitMethodInsn(INVOKESTATIC, "java/lang/Integer", "valueOf", "(I)Ljava/lang/Integer;");
			this.typeStack.push(Type.getType(Integer.class));
		} else if(type.equals(Type.DOUBLE_TYPE)) {
			this.methodVisitor.visitMethodInsn(INVOKESTATIC, "java/lang/Double", "valueOf", "(D)Ljava/lang/Double;");
			this.typeStack.push(Type.getType(Double.class));
		} else if(type.equals(Type.BOOLEAN_TYPE)) {
			this.methodVisitor.visitMethodInsn(INVOKESTATIC, "java/lang/Boolean", "valueOf", "(Z)Ljava/lang/Boolean;");
			this.typeStack.push(Type.getType(Boolean.class));
		} else if(type.equals(Type.VOID_TYPE)) {
			this.methodVisitor.visitInsn(ACONST_NULL);//FIXME: return void
			this.typeStack.push(Type.getType(Void.class));
		} else {
			this.typeStack.push(type);
		}
	}

	@Override 
	public void VisitApplyNode(ApplyNode Node) { 
		GtMethod Method = Node.Method;
		for(int i = 0; i < Node.Params.size(); i++) {
			TypedNode Param = (TypedNode) Node.Params.get(i);
			Param.Evaluate(this);
			Type requireType = this.TypeResolver.GetAsmType(Method.GetParamType(i));
			Type foundType = this.typeStack.peek();
			if(requireType.equals(Type.getType(Object.class)) && this.isPrimitiveType(foundType)) {
				// boxing
				this.box();
			} else {
				this.typeStack.pop();
			}
		}
		if(Method.MethodName.equals("New")) {
			Type type = this.TypeResolver.GetAsmType(Method.GetReturnType());
			String owner = type.getInternalName();
			String methodName = "<init>";
			String methodDesc = TypeResolver.GetJavaMethodDescriptor(Method);//"()V";//Node.Params;
			this.methodVisitor.visitMethodInsn(INVOKESPECIAL, owner, methodName, methodDesc);
			this.typeStack.push(type);
		} else {
			int opcode = INVOKEVIRTUAL;
			//if(Node.Method.Is(KonohaConst.StaticMethod)) {
			opcode = INVOKESTATIC;
			//}
			this.Call(opcode, Method);
		}
	}

	@Override 
	public void VisitBinaryNode(BinaryNode Node) { 
	}

	@Override 
	public void VisitAndNode(AndNode Node) { 
		Node.LeftNode.Evaluate(this);
		Node.RightNode.Evaluate(this);
	}

	@Override 
	public void VisitOrNode(OrNode Node) { 
		Node.LeftNode.Evaluate(this);
		Node.RightNode.Evaluate(this);
	}

	@Override 
	public void VisitAssignNode(AssignNode Node) { 
		Node.RightNode.Evaluate(this);
		if(Node.LeftNode instanceof GetterNode) {
			GetterNode Left = (GetterNode) Node.LeftNode;
			//Left.BaseNode.Evaluate(this);
			//Object Base = this.Pop();
			//assert (Base instanceof KonohaObject);
			//KonohaObject Obj = (KonohaObject) Base;
			//Obj.SetField(KonohaSymbol.GetSymbolId(Left.FieldName), Val);
			//this.push(Val);
		} else {
			assert (Node.LeftNode instanceof LocalNode);
			LocalNode Left = (LocalNode) Node.LeftNode;
			String Name = Left.Token.ParsedText;
			Local local = this.FindLocalVariable(Name);
			if(local == null) {
				throw new RuntimeException("local variable " + Name + " is not found in this context");
			}
			this.StoreLocal(local);
		}
	}

	@Override 
	public void VisitLetNode(LetNode Node) { 
//		Local local = this.AddLocal(Node.Type, Node.Token.ParsedText);
//		Node.ValueNode.Evaluate(this);
//		this.StoreLocal(local);
		this.VisitList(Node.BlockNode);
	}

	@Override 
	public void VisitIfNode(IfNode Node) { 
		Label ELSE = new Label();
		Label END = new Label();
		MethodVisitor mv = this.methodVisitor;
		Node.CondExpr.Evaluate(this);
		this.typeStack.pop(); //TODO: check cast
		mv.visitJumpInsn(IFEQ, ELSE);

		// Then
		if(Node.ThenNode != null) {
			Node.ThenNode.Evaluate(this);
		}
		mv.visitJumpInsn(GOTO, END);

		// Else
		mv.visitLabel(ELSE);
		if(Node.ElseNode != null) {
			Node.ElseNode.Evaluate(this);
			mv.visitJumpInsn(GOTO, END);
		}

		// End
		mv.visitLabel(END);
	}

	@Override 
	public void VisitSwitchNode(SwitchNode Node) { //FIXME
//		Node.CondExpr.Evaluate(this);
//		for(int i = 0; i < Node.Blocks.size(); i++) {
//			TypedNode Block = (TypedNode) Node.Blocks.get(i);
//			this.VisitList(Block);
//		}
	}

	@Override 
	public void VisitLoopNode(LoopNode Node) { 
		MethodVisitor mv = this.methodVisitor;
		Label HEAD = new Label();
		Label END = new Label();

		this.LabelStack.AddLabel("break", END);
		this.LabelStack.AddLabel("continue", HEAD);

		mv.visitLabel(HEAD);

		Node.CondExpr.Evaluate(this);
		this.typeStack.pop();
		mv.visitInsn(ICONST_1); // true
		mv.visitJumpInsn(IF_ICMPNE, END); // condition
		this.VisitList(Node.LoopBody);
		if(Node.IterExpr != null) {
			Node.IterExpr.Evaluate(this);
		}
		mv.visitJumpInsn(GOTO, HEAD);
		mv.visitLabel(END);
		this.LabelStack.RemoveLabel("break");
		this.LabelStack.RemoveLabel("continue");
	}

	@Override 
	public void VisitReturnNode(ReturnNode Node) { 
		if(Node.Expr != null) {
			Node.Expr.Evaluate(this);
			Type type = this.typeStack.pop();
			this.methodVisitor.visitInsn(type.getOpcode(IRETURN));
		} else {
			this.methodVisitor.visitInsn(RETURN);
		}
	}

	@Override 
	public void VisitLabelNode(LabelNode Node) { 
		String LabelName = Node.Label;
		Label Label = new Label();
		this.LabelStack.AddLabel(LabelName, Label);
	}

	@Override 
	public void VisitJumpNode(JumpNode Node) { 
		String LabelName = Node.Label;
		Label label = this.LabelStack.FindLabel(LabelName);
		if(label == null) {
			throw new RuntimeException("Cannot find " + LabelName + " label.");
		}
		this.methodVisitor.visitJumpInsn(GOTO, label);
	}

	@Override 
	public void VisitBreakNode(BreakNode Node) { 
	}

	@Override 
	public void VisitContinueNode(ContinueNode Node) { 
	}

	@Override 
	public void VisitTryNode(TryNode Node) { //FIXME
//		int catchSize = Node.CatchBlock.size();
//		MethodVisitor mv = this.methodVisitor;
//		Label beginTryLabel = new Label();
//		Label endTryLabel = new Label();
//		Label finallyLabel = new Label();
//		Label catchLabel[] = new Label[catchSize];
//
//		// prepare
//		for(int i = 0; i < catchSize; i++) { //TODO: add exception class name
//			catchLabel[i] = new Label();
//			mv.visitTryCatchBlock(beginTryLabel, endTryLabel, catchLabel[i], null);
//		}
//
//		// try block
//		mv.visitLabel(beginTryLabel);
//		this.VisitList(Node.TryBlock);
//		mv.visitLabel(endTryLabel);
//		mv.visitJumpInsn(GOTO, finallyLabel);
//
//		// catch block
//		for(int i = 0; i < catchSize; i++) { //TODO: add exception class name
//			TypedNode Block = (TypedNode) Node.CatchBlock.get(i);
//			TypedNode Exception = (TypedNode) Node.TargetException.get(i);
//			mv.visitLabel(catchLabel[i]);
//			this.VisitList(Block);
//			mv.visitJumpInsn(GOTO, finallyLabel);
//		}
//
//		// finally block
//		mv.visitLabel(finallyLabel);
//		this.VisitList(Node.FinallyBlock);
	}

	@Override 
	public void VisitThrowNode(ThrowNode Node) { 
		Node.Expr.Evaluate(this);
		this.typeStack.pop();
		this.methodVisitor.visitInsn(ATHROW);
	}

	@Override 
	public void VisitFunctionNode(FunctionNode Node) { 
	}

	@Override 
	public void VisitErrorNode(ErrorNode Node) { //FIXME
		String ps = Type.getDescriptor(System.err.getClass());
		this.methodVisitor.visitFieldInsn(GETSTATIC, "java/lang/System", "err", ps);
//		this.methodVisitor.visitLdcInsn(Node.ErrorMessage); // FIXME
		this.methodVisitor.visitMethodInsn(INVOKEVIRTUAL, "java/io/PrintStream", "println", "(Ljava/lang/String;)V");
	}

	public void VisitEnd() {
		//this.methodVisitor.visitInsn(RETURN);//FIXME
		this.methodVisitor.visitEnd();
	}

	public void visitBoxingAndReturn() {
		if(this.typeStack.empty()) {
			this.methodVisitor.visitInsn(ACONST_NULL);
		} else {
			this.box();
		}
		this.methodVisitor.visitInsn(ARETURN);
	}
}

class TypeResolver {
	private final Map<String, GtClassNode>	classMap			= new HashMap<String, GtClassNode>();
	private final Map<String, String>		typeDescriptorMap	= new HashMap<String, String>();

	// FIXME
	String globalType = Type.getType(GtObject.class).getDescriptor();

	public TypeResolver() {
		this.typeDescriptorMap.put("global", Type.getType(GtObject.class).getDescriptor());
		this.typeDescriptorMap.put("Void", Type.getType(void.class).getDescriptor());
		this.typeDescriptorMap.put("Boolean", Type.getType(boolean.class).getDescriptor());
		this.typeDescriptorMap.put("Integer", Type.getType(int.class).getDescriptor());
		this.typeDescriptorMap.put("Object", Type.getType(Object.class).getDescriptor());
		// TODO: other class
	}

	// FIXME
	public String GetJavaTypeDescriptor(GtType type) {
		String descriptor = this.typeDescriptorMap.get(type.ShortClassName);
		if(descriptor != null) {
			return descriptor;
		}
		if(type.LocalSpec != null) { //HostedClassInfo -> LocalSpec
			return Type.getDescriptor((Class) type.LocalSpec); //HostedClassInfo -> LocalSpec
		} else {
			return "L" + type.ShortClassName + ";";//FIXME
		}
	}

	public String GetJavaMethodDescriptor(GtMethod method) {
		GtType returnType = method.GetReturnType();
		ArrayList<GtType> paramTypes = method.Param.Types;
		paramTypes.remove(0);
		StringBuilder signature = new StringBuilder();
		signature.append("(");
		if(method.ClassInfo.ShortClassName.equals("global")) {
			signature.append(globalType);
		}
		for(int i = 0; i < paramTypes.size(); i++) {
			GtType ParamType = paramTypes.get(i);
			signature.append(this.GetJavaTypeDescriptor(ParamType));
		}
		signature.append(")");
		if(method.MethodName.equals("New")) {
			signature.append(Type.VOID_TYPE.getDescriptor());
		} else {
			signature.append(this.GetJavaTypeDescriptor(returnType));
		}
		return signature.toString();
	}

	public GtClassNode FindClassNode(String className) {
		return this.classMap.get(className);
	}

	public void StoreClassNode(GtClassNode cn) {
		this.classMap.put(cn.name, cn);
	}

	public Type GetAsmType(Class<?> klass) {
		return Type.getType(klass);
	}

	public Type GetAsmType(GtType type) {
		return Type.getType(GetJavaTypeDescriptor(type));
	}
}

public class JavaByteCodeGenerator extends GreenTeaGenerator implements Opcodes {
	private final TypeResolver	TypeResolver;

	public JavaByteCodeGenerator() {
		this.TypeResolver = new TypeResolver();
	}

	public void OutputClassFile(String className, String dir) throws IOException {
		byte[] ba = this.generateBytecode(className);
		File file = new File(dir, className + ".class");
		FileOutputStream fos = null;
		try {
			fos = new FileOutputStream(file);
			fos.write(ba);
		} finally {
			if(fos != null) {
				fos.close();
			}
		}
	}

	public byte[] generateBytecode(String className) {
		ClassWriter classWriter = new ClassWriter(ClassWriter.COMPUTE_FRAMES);
		GtClassNode CNode = this.TypeResolver.FindClassNode(className);
		CNode.accept(classWriter);
		classWriter.visitEnd();
		return classWriter.toByteArray();
	}

	// FIXME
	public GtMethodInvoker Compile(GtNameSpace NameSpace, TypedNode Block, GtMethod MethodInfo) {
		return this.Compile(NameSpace, Block, MethodInfo, null);
	}

	public GtMethodInvoker Compile(GtNameSpace NameSpace, TypedNode Block, GtMethod MethodInfo, ArrayList<Local> params) {
		int MethodAttr;
		String className;
		String methodName;
		String methodDescriptor;
		GtParam param;
		GtType ReturnType;
		boolean is_eval = false;
		if(MethodInfo != null && MethodInfo.MethodName.length() > 0) {
			className = MethodInfo.ClassInfo.ShortClassName;
			//className = "Script";
			methodName = MethodInfo.MethodName;
			methodDescriptor = this.TypeResolver.GetJavaMethodDescriptor(MethodInfo);
			MethodAttr = ACC_PUBLIC | ACC_STATIC;
			param = MethodInfo.Param;
			ReturnType = MethodInfo.GetReturnType();
		} else {
			GtType GlobalType = NameSpace.GetGlobalObject().Type;
			className = "global";
			methodName = "__eval";
			methodDescriptor = Type.getMethodDescriptor(Type.getType(Object.class), this.TypeResolver.GetAsmType(GlobalType));
			MethodAttr = ACC_PUBLIC | ACC_STATIC;
			is_eval = true;
			ArrayList<GtType> ParamDataList = new ArrayList<GtType>();//GtType[] ParamData = new GtType[2];
			ArrayList<String> ArgNameList = new ArrayList<String>();//String[] ArgNames = new String[1];
			ParamDataList.add(NameSpace.GtContext.ObjectType);
			ParamDataList.add(GlobalType);
			ArgNameList.add("this");
			param = new GtParam(ParamDataList, ArgNameList);
			params = new ArrayList<Local>();
			params.add(new Local(0, GlobalType, "this"));
			ReturnType = ParamDataList.get(0);
		}

		GtClassNode cn = this.TypeResolver.FindClassNode(className);
		if(cn == null) {
			cn = new GtClassNode(className);
			this.TypeResolver.StoreClassNode(cn);
		}

		for(MethodNode m : cn.methods.values()) {
			if(m.name.equals(methodName) && m.desc.equals(methodDescriptor)) {
				cn.methods.remove(m);
				break;
			}
		}
		MethodNode mn = new MethodNode(MethodAttr, methodName, methodDescriptor, null, null);
		mn.visitCode();

		JVMBuilder b = new JVMBuilder(MethodInfo, mn, this.TypeResolver, NameSpace);
		Block = b.VerifyBlock(NameSpace, is_eval, ReturnType, Block);

		if(params != null) {
			for(int i = 0; i < params.size(); i++) {
				Local local = (Local) params.get(i);
				b.AddLocal(local.TypeInfo, local.Name);
			}
		}
		if(Block != null) {
			b.VisitList(Block.MoveHeadNode());
		}
		if(is_eval) {
			b.visitBoxingAndReturn();
		}
		b.VisitEnd();
		cn.methods.put(methodName, mn);

		try {
			this.OutputClassFile("global", ".");
		}
		catch (Exception e) {
			e.printStackTrace();
		}

		Class<?> c = new GtClassLoader(this).findClass(className);
		Method[] MethodList = c.getMethods();
		for(int i = 0; i < MethodList.length; i++) {
			Method m = MethodList[i];
			if(m.getName().equals(methodName)) {
				GtMethodInvoker mtd = new NativeMethodInvoker(param, m);
				return mtd;
			}
		}
		return null;
	}
//
//	public Object EvalAtTopLevel(GtNameSpace NameSpace, TypedNode Node, GtObject GlobalObject) {
//		GtMethodInvoker Invoker = this.Compile(NameSpace, Node, null);
//		Object[] Args = new Object[1];
//		Args[0] = GlobalObject;
//		return Invoker.Invoke(Args);
//	}
//
	//FIXME
	public GtMethodInvoker Build(GtNameSpace NameSpace, TypedNode Node, GtMethod Method) {
		ArrayList<Local> Param = null;
		if(Method != null) {
			Param = new ArrayList<Local>();
			GtParam P = Method.Param;
			Param.add(new Local(0, Method.ClassInfo, "this"));
			for(int i = 0; i < P.ParamSize; i++) {
				GtType Type = P.Types.get(i + 1); //GtType Type = P.Types[i + 1];
				String Arg = P.Names.get(i);//String Arg = P.ArgNames[i];
				Local l = new Local(i + 1, Type, Arg);
				Param.add(l);
			}
		}
		return this.Compile(NameSpace, Node, Method, Param);
	}
	
	//FIXME
	@Override
	public Object Eval(TypedNode Node) {
		VisitBlock(Node);
		return null;
	}
}


// The code below was moved from GreenTeaScript.java
// Consider whether it is available?

//ifdef JAVA
class GtInt extends GtStatic {

	public void MakeDefinition(GtNameSpace ns) {
//		GtType BaseClass = ns.LookupHostLangType(Integer.class);
//		GtParam BinaryParam = GtParam.ParseOf(ns, "int int x");
//		GtParam UnaryParam = GtParam.ParseOf(ns, "int");
//
//		BaseClass.DefineMethod(ImmutableMethod | ConstMethod, "+", UnaryParam, this, "PlusInt");
//		BaseClass.DefineMethod(ImmutableMethod | ConstMethod, "+", BinaryParam, this, "IntAddInt");
//		BaseClass.DefineMethod(ImmutableMethod | ConstMethod, "-", UnaryParam, this, "MinusInt");
//		BaseClass.DefineMethod(ImmutableMethod | ConstMethod, "-", BinaryParam, this, "IntSubInt");
//		BaseClass.DefineMethod(ImmutableMethod | ConstMethod, "*", BinaryParam, this, "IntMulInt");
//		BaseClass.DefineMethod(ImmutableMethod | ConstMethod, "/", BinaryParam, this, "IntDivInt");
//		BaseClass.DefineMethod(ImmutableMethod | ConstMethod, "%", BinaryParam, this, "IntModInt");
//
//		GtParam RelationParam = GtParam.ParseOf(ns, "boolean int x");
//		BaseClass.DefineMethod(ImmutableMethod | ConstMethod, "<", RelationParam, this, "IntLtInt");
//		BaseClass.DefineMethod(ImmutableMethod | ConstMethod, "<=", RelationParam, this, "IntLeInt");
//		BaseClass.DefineMethod(ImmutableMethod | ConstMethod, ">", RelationParam, this, "IntGtInt");
//		BaseClass.DefineMethod(ImmutableMethod | ConstMethod, ">=", RelationParam, this, "IntGeInt");
//		BaseClass.DefineMethod(ImmutableMethod | ConstMethod, "==", RelationParam, this, "IntEqInt");
//		BaseClass.DefineMethod(ImmutableMethod | ConstMethod, "!=", RelationParam, this, "IntNeInt");
//
//		//		if(GtDebug.UseBuiltInTest) {
//		//			assert (BaseClass.LookupMethod("+", 0) != null);
//		//			assert (BaseClass.LookupMethod("+", 1) != null);
//		//			assert (BaseClass.LookupMethod("+", 2) == null);
//		//			GtMethod m = BaseClass.LookupMethod("+", 1);
//		//			Object[] p = new Object[2];
//		//			p[0] = new Integer(1);
//		//			p[1] = new Integer(2);
//		//			GtStatic.println("******* 1+2=" + m.Eval(p));
//		//		}
	}

	public static int PlusInt(int x) {
		return +x;
	}

	public static int IntAddInt(int x, int y) {
		return x + y;
	}

	public static int MinusInt(int x) {
		return -x;
	}

	public static int IntSubInt(int x, int y) {
		return x - y;
	}

	public static int IntMulInt(int x, int y) {
		return x * y;
	}

	public static int IntDivInt(int x, int y) {
		return x / y;
	}

	public static int IntModInt(int x, int y) {
		return x % y;
	}

	public static boolean IntLtInt(int x, int y) {
		return x < y;
	}

	public static boolean IntLeInt(int x, int y) {
		return x <= y;
	}

	public static boolean IntGtInt(int x, int y) {
		return x > y;
	}

	public static boolean IntGeInt(int x, int y) {
		return x >= y;
	}

	public static boolean IntEqInt(int x, int y) {
		return x == y;
	}

	public static boolean IntNeInt(int x, int y) {
		return x != y;
	}
}

class GtStringDef extends GtStatic {

	public void MakeDefinition(GtNameSpace ns) {
//		GtType BaseClass = ns.LookupHostLangType(String.class);
//		GtParam BinaryParam = GtParam.ParseOf(ns, "String String x");
//		BaseClass.DefineMethod(ImmutableMethod | ConstMethod, "+", BinaryParam, this, "StringAddString");
//
//		GtParam RelationParam = GtParam.ParseOf(ns, "boolean String x");
//		BaseClass.DefineMethod(ImmutableMethod | ConstMethod, "==", RelationParam, this, "StringEqString");
//		BaseClass.DefineMethod(ImmutableMethod | ConstMethod, "!=", RelationParam, this, "StringNeString");
//
//		GtParam indexOfParam = GtParam.ParseOf(ns, "int String x");
//		BaseClass.DefineMethod(ImmutableMethod | ConstMethod, "indexOf", indexOfParam, this, "StringIndexOf");
//
//		GtParam getSizeParam = GtParam.ParseOf(ns, "int");
//		BaseClass.DefineMethod(ImmutableMethod | ConstMethod, "getSize", getSizeParam, this, "StringGetSize");
	}

	public static String StringAddString(String x, String y) {
		return x + y;
	}

	public static boolean StringEqString(String x, String y) {
		return x.equals(y);
	}

	public static boolean StringNeString(String x, String y) {
		return !x.equals(y);
	}

	public static int StringIndexOf(String self, String str) {
		return self.indexOf(str);
	}

	public static int StringGetSize(String self) {
		return self.length();
	}
}

class GtSystemDef extends GtStatic {

	public void MakeDefinition(GtNameSpace NameSpace) {
//		GtType BaseClass = NameSpace.LookupHostLangType(GtSystemDef.class);
//		NameSpace.DefineSymbol("System", BaseClass);
//
//		GtParam param1 = GtParam.ParseOf(NameSpace, "void String x");
//		BaseClass.DefineMethod(StaticMethod, "p", param1, this, "p");
	}

	public static void p(String x) {
		GtStatic.println(x);
	}

}

//class ArrayList<?>Def extends GtStatic {
//
//	public void MakeDefinition(GtNameSpace ns) {
//      //FIXME int[] only
//      GtType BaseClass = ns.LookupHostLangType(int[].class);
//      GtParam GetterParam = GtParam.ParseOf(ns, "int int i");
//      BaseClass.DefineMethod(ImmutableMethod, "get", GetterParam, this, "ArrayGetter");
//      GtParam SetterParam = GtParam.ParseOf(ns, "void int i int v");
//      BaseClass.DefineMethod(0, "set", SetterParam, this, "ArraySetter");
//      GtParam GetSizeParam = GtParam.ParseOf(ns, "int");
//      BaseClass.DefineMethod(ImmutableMethod | ConstMethod, "getSize", GetSizeParam, this, "ArrayGetSize");
//  }
//
//  public static int ArrayGetter(int[] a, int i) {
//      return a[i];
//  }
//
//  public static void ArraySetter(int[] a, int i, int v) {
//      a[i] = v;
//  }
//
//  public static int ArrayGetSize(int[] a) {
//      return a.length;
//  }
//}
//endif VAJA

//public GtMethod FindMethod(String MethodName, int ParamSize) {
///*local*/int i = 0;
//while(i < this.ClassMethodList.size()) {
//	GtMethod Method = this.ClassMethodList.get(i);
//	if(Method.Match(MethodName, ParamSize)) {
//		return Method;
//	}
//	i += 1;
//}
//return null;
//}

public GtMethod LookupMethod(String MethodName, int ParamSize) {
/*local*/GtMethod Method = this.FindMethod(MethodName, ParamSize);
if(Method != null) {
	return Method;
}
if(this.SearchSuperMethodClass != null) {
	Method = this.SearchSuperMethodClass.LookupMethod(MethodName, ParamSize);
	if(Method != null) {
		return Method;
	}
}
//if(GtContext.Generator.CreateMethods(this.LocalSpec, MethodName)) {
//	return this.LookupMethod(MethodName, ParamSize);
//}
//ifdef JAVA
//if(this.LocalSpec instanceof Class) {
//	if(this.CreateMethods(MethodName) > 0) {
//		return this.FindMethod(MethodName, ParamSize);
//	}
//}
//endif JAVA
return null;
}
//
//public boolean DefineNewMethod(GtMethod NewMethod) {
///*local*/int i = 0;
//while(i < this.ClassMethodList.size()) {
//	/*local*/GtMethod DefinedMethod = (GtMethod) this.ClassMethodList.get(i);
//	if(NewMethod.Match(DefinedMethod)) {
//		return false;
//	}
//	i += 1;
//}
//this.AddMethod(NewMethod);
//return true;
//}
//
////ifdef JAVA
//
//public void DefineMethod(int MethodFlag, String MethodName, GtParam Param, Object Callee, String LocalName) {
//GtMethod Method = new GtMethod(MethodFlag, this, MethodName, Param, LangDeps.LookupMethod(Callee, LocalName));
//this.AddMethod(Method);
//}
//
//public GtType(GtContext GtContext, Class<?> ClassInfo) {
//this(GtContext, 0, ClassInfo.getSimpleName(), null);
//this.LocalSpec = ClassInfo;
//// this.ClassFlag = ClassFlag;
//Class<?> SuperClass = ClassInfo.getSuperclass();
//if(ClassInfo != Object.class && SuperClass != null) {
//	this.SuperClass = GtContext.LookupHostLangType(ClassInfo.getSuperclass());
//}
//}
//
//static GtMethod ConvertMethod(GtContext GtContext, Method Method) {
//GtType ThisType = GtContext.LookupHostLangType(Method.getClass());
//Class<?>[] ParamTypes = Method.getParameterTypes();
//GtType[] ParamData = new GtType[ParamTypes.length + 1];
//String[] ArgNames = new String[ParamTypes.length + 1];
//ParamData[0] = GtContext.LookupHostLangType(Method.getReturnType());
//for(int i = 0; i < ParamTypes.length; i++) {
//	ParamData[i + 1] = GtContext.LookupHostLangType(ParamTypes[i]);
//	ArgNames[i] = "arg" + i;
//}
//GtParam Param = new GtParam(ParamData.length, ParamData, ArgNames);
//GtMethod Mtd = new GtMethod(0, ThisType, Method.getName(), Param, Method);
//ThisType.AddMethod(Mtd);
//return Mtd;
//}
//
//int CreateMethods(String MethodName) {
//int Count = 0;
//Method[] Methods = ((Class<?>)this.LocalSpec).getMethods();
//for(int i = 0; i < Methods.length; i++) {
//	if(MethodName.equals(Methods[i].getName())) {
//		GtType.ConvertMethod(this.GtContext, Methods[i]);
//		Count = Count + 1;
//	}
//}
//return Count;
//}
//
//public boolean RegisterCompiledMethod(GtMethod NewMethod) {
//for(int i = 0; i < this.ClassMethodList.size(); i++) {
//	GtMethod DefinedMethod = (GtMethod) this.ClassMethodList.get(i);
//	if(NewMethod.Match(DefinedMethod)) {
//		this.ClassMethodList.set(i, NewMethod);
//		return true;
//	}
//}
//return false;
//}
////endif VAJA

