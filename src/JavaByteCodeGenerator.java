import java.util.ArrayList;
import java.util.Arrays;
import java.util.HashMap;
import java.util.Map;

import org.KonohaScript.KonohaMethod;
import org.KonohaScript.KonohaType;
import org.KonohaScript.CodeGen.JVM.JVMCodeGenerator;
import org.KonohaScript.CodeGen.JVM.KClassNode;
import org.KonohaScript.ObjectModel.KonohaObject;
import org.objectweb.asm.ClassVisitor;
import org.objectweb.asm.Label;
import org.objectweb.asm.Opcodes;
import org.objectweb.asm.Type;
import org.objectweb.asm.tree.MethodNode;

// GreenTea Generator should be written in each language.

class LabelStack {
	GtArray	LabelNames;
	GtArray	Labels;

	LabelStack() {
		this.LabelNames = new GtArray();
		this.Labels = new GtArray();
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
	JVMCodeGenerator Gen;

	public GtClassLoader(JVMCodeGenerator Gen) {
		this.Gen = Gen;
	}

	@Override
	protected Class<?> findClass(String name) {
		byte[] b = this.Gen.generateBytecode(name);
		return this.defineClass(name, b, 0, b.length);
	}
}

class JVMBuilder extends GreenTeaGenerator implements Opcodes {
	
	
	
	@Override 
	public void VisitDefineNode(DefineNode Node) { 
	}

	@Override 
	public void VisitConstNode(ConstNode Node) { 
	}

	@Override 
	public void VisitNewNode(NewNode Node) { 
	}

	@Override 
	public void VisitNullNode(NullNode Node) { 
	}

	@Override 
	public void VisitLocalNode(LocalNode Node) { 
	}

	@Override 
	public void VisitGetterNode(GetterNode Node) { 
	}

	@Override 
	public void VisitApplyNode(ApplyNode Node) { 
	}

	@Override 
	public void VisitBinaryNode(BinaryNode Node) { 
	}

	@Override 
	public void VisitAndNode(AndNode Node) { 
	}

	@Override 
	public void VisitOrNode(OrNode Node) { 
	}

	@Override 
	public void VisitAssignNode(AssignNode Node) { 
	}

	@Override 
	public void VisitLetNode(LetNode Node) { 
	}

	@Override 
	public void VisitIfNode(IfNode Node) { 
	}

	@Override 
	public void VisitSwitchNode(SwitchNode Node) { 
	}

	@Override 
	public void VisitLoopNode(LoopNode Node) { 
	}

	@Override 
	public void VisitReturnNode(ReturnNode Node) { 
	}

	@Override 
	public void VisitLabelNode(LabelNode Node) { 
	}

	@Override 
	public void VisitJumpNode(JumpNode Node) { 
	}

	@Override 
	public void VisitBreakNode(BreakNode Node) { 
	}
	
	@Override 
	public void VisitContinueNode(ContinueNode Node) { 
	}

	@Override 
	public void VisitTryNode(TryNode Node) { 
	}

	@Override 
	public void VisitThrowNode(ThrowNode Node) { 
	}

	@Override 
	public void VisitFunctionNode(FunctionNode Node) { 
	}

	@Override 
	public void VisitErrorNode(ErrorNode Node) { 
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

	public String GetJavaTypeDescriptor(GtType type) {
		String descriptor = this.typeDescriptorMap.get(type.ShortClassName);
		if(descriptor != null) {
			return descriptor;
		}
		if(type.HostedClassInfo != null) {
			return Type.getDescriptor(type.HostedClassInfo);
		} else {
			return "L" + type.ShortClassName + ";";//FIXME
		}
	}

	public String GetJavaMethodDescriptor(GtMethod method) {
		GtType returnType = method.GetReturnType(null);
		ArrayList<GtType> paramTypes = new ArrayList<GtType>(Arrays.asList(method.Param.Types));
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

public class JavaByteCodeGenerator {
	
}



