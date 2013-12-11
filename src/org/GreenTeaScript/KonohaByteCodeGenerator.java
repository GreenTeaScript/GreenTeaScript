package org.GreenTeaScript;

import java.util.ArrayList;
import java.util.HashMap;

public class KonohaByteCodeGenerator extends GtSourceGenerator {
	/*field*/private ArrayList<Object> ConstPool;
	/*field*/private ArrayList<String> MethodPool;
	/*field*/private ArrayList<GtType> ClassPool;
	/*field*/private HashMap<GtType, ArrayList<GtFieldInfo>> ClassFieldMap;
	/*field*/private int RegisterNum;
	/*field*/private ArrayList<Integer> RegStack;
	/*field*/private HashMap<String, Integer> LocalVarMap;

	private static final int CallParameters = 5;
	private static final int ThisIndex = 0;
	private static final int MethodIndex = -1;
	private static final int ReturnIndex = -4;

	public KonohaByteCodeGenerator(String TargetCode, String OutputFile, int GeneratorFlag) {
		super(TargetCode, OutputFile, GeneratorFlag);
		this.ConstPool = new ArrayList<Object>();
		this.MethodPool = new ArrayList<String>();
		this.ClassPool = new ArrayList<GtType>();
		this.ClassFieldMap = new HashMap<GtType, ArrayList<GtFieldInfo>>();
		this.RegisterNum = 0;
		this.RegStack = new ArrayList<Integer>();
		this.LocalVarMap = new HashMap<String, Integer>();
	}

	private void SetSignature() {
		/*local*/int ConstPoolSize = this.ConstPool.size();
		this.HeaderBuilder.Append("CONSTPOOLSIZE = " + ConstPoolSize + "\n");
		this.HeaderBuilder.Append("METHODPOOLSIZE = " + this.MethodPool.size() + "\n");
		/*local*/int ClassPoolSize = this.ClassPool.size();
		this.HeaderBuilder.Append("CLASSPOOLSIZE = " + ClassPoolSize + "\n");
		for(/*local*/int i = 0; i < ConstPoolSize; ++i) {
			/*local*/Object ConstValue = this.ConstPool.get(i);
			//Builder.Append("CONST" + i + " = " + ConstValue.toString() + "(" + ConstValue.getClass().getName() + ")" + "\n");
			this.HeaderBuilder.Append("CONST" + i + " = " + this.EscapeString(ConstValue) + "\n");
		}
		for(/*local*/int i = 0; i < ClassPoolSize; ++i) {
			/*local*/GtType Class = this.ClassPool.get(i);
			this.HeaderBuilder.Append("CLASS" + i + "(" + Class.ShortName + ")");
			this.HeaderBuilder.Append(" :\n");
			this.HeaderBuilder.Indent();
			/*local*/ArrayList<GtFieldInfo> FieldList = this.ClassFieldMap.get(Class);
			/*local*/int FieldSize = FieldList.size();
			for(/*local*/int j = 0; j < FieldSize; ++j) {
				/*local*/GtFieldInfo ClassField = FieldList.get(j);
				this.HeaderBuilder.IndentAndAppend("FIELD" + j + ": " + ClassField.NativeName + "(" + ClassField.Type.ShortName + ")" + "\n");
			}
			this.HeaderBuilder.UnIndent();
			//this.HeaderBuilder.Append("CONST" + i + " = " + this.EscapeString(ConstValue) + "\n");
		}
	}
	private String EscapeString(Object Constant) {
		if(!(Constant instanceof String)) return Constant.toString();
		String ConstStr = (/*cast*/String) Constant;
		return "(" + ConstStr.length() + ") " + ConstStr;
	}

	@Override public void FlushBuffer() {
		this.SetSignature();
		super.FlushBuffer();
	}

	private int AllocRegister() {
		/*FIXME*/
		return this.RegisterNum++;
	}
	private int ReserveRegister(int Size) {
		/*FIXME*/
		/*local*/int HeadRegister = this.RegisterNum;
		this.RegisterNum += Size;
		return HeadRegister;
	}
	private void FreeRegister(int TargetReg) {
		/*FIXME*/
		this.RegisterNum = TargetReg;
	}
	private void PushRegister(int RegNum) {
		this.RegStack.add(new Integer(RegNum));
	}
	private int PopRegister() {
		/*local*/int Size = this.RegStack.size();
		/*local*/Integer RegNum = this.RegStack.remove(Size - 1);
		return RegNum.intValue();
	}

	private int AddConstant(Object ConstValue) {
		/*local*/int Index = this.ConstPool.indexOf(ConstValue);
		if(Index == -1) {
			Index = this.ConstPool.size();
			this.ConstPool.add(ConstValue);
		}
		return Index;
	}
	private int AddMethod(String MethodName) {
		/*local*/int Index = this.MethodPool.indexOf(MethodName);
		if(Index == -1) {
			Index = this.MethodPool.size();
			this.MethodPool.add(MethodName);
		}
		return Index;
	}


	@Override public void VisitEmptyNode(GtEmptyNode Node) {
		/*FIXME*/
	}

	@Override public void VisitNullNode(GtNullNode Node) {
		/*local*/int Reg = this.AllocRegister();
		this.PushRegister(Reg);
	}

	@Override public void VisitBooleanNode(GtBooleanNode Node) {
		/*local*/int Index = this.AddConstant(new Boolean(Node.Value));
		/*local*/int Reg = this.AllocRegister();
		this.VisitingBuilder.Append("NSET " + "REG" + Reg + ", " + "CONST" + Index + "\n");
		this.PushRegister(Reg);
	}

	@Override public void VisitIntNode(GtIntNode Node) {
		/*local*/int Index = this.AddConstant(new Long(Node.Value));
		/*local*/int Reg = this.AllocRegister();
		this.VisitingBuilder.Append("NSET " + "REG" + Reg + ", " + "CONST" + Index + "\n");
		this.PushRegister(Reg);
	}

	@Override public void VisitFloatNode(GtFloatNode Node) {
		/*local*/int Index = this.AddConstant(new Float(Node.Value));
		/*local*/int Reg = this.AllocRegister();
		this.VisitingBuilder.Append("NSET " + "REG" + Reg + ", " + "CONST" + Index + "\n");
		this.PushRegister(Reg);
	}

	@Override public void VisitStringNode(GtStringNode Node) {
		/*local*/int Index = this.AddConstant(Node.Value);
		/*local*/int Reg = this.AllocRegister();
		this.VisitingBuilder.Append("NSET " + "REG" + Reg + ", " + "CONST" + Index + "\n");
		this.PushRegister(Reg);
	}

	@Override public void VisitRegexNode(GtRegexNode Node) {
		/*local*/int Index = this.AddConstant(Node.Value);
		/*local*/int Reg = this.AllocRegister();
		this.VisitingBuilder.Append("NSET " + "REG" + Reg + ", " + "CONST" + Index + "\n");
		this.PushRegister(Reg);
	}

	@Override public void VisitConstPoolNode(GtConstPoolNode Node) {
		/*local*/int Index = this.AddConstant(Node.ConstValue);
		/*local*/int Reg = this.AllocRegister();
		this.VisitingBuilder.Append("NSET " + "REG" + Reg + ", " + "CONST" + Index + "\n");
		this.PushRegister(Reg);
	}

	@Override public void VisitArrayLiteralNode(GtArrayLiteralNode Node) {
		/*local*/int ArraySize = LibGreenTea.ListSize(Node.NodeList);
		/*local*/int TargetReg = this.ReserveRegister(ArraySize + CallParameters);
		/*local*/int CallReg = TargetReg - ReturnIndex + ThisIndex;
		for(/*local*/int i = 0; i < ArraySize; ++i) {
			Node.NodeList.get(i).Accept(this);
			this.VisitingBuilder.Append("NMOV " + "REG" + (CallReg+i+1) + ", REG" + this.PopRegister() + "\n");
		}
		this.VisitingBuilder.Append("NSET " + "REG" + (CallReg+MethodIndex) + ", METHOD\"SetArrayLiteral\"\n");
		this.VisitingBuilder.Append("CALL " + "REG" + CallReg + ", " + ArraySize + "\n");
		this.PushRegister(TargetReg);
		this.FreeRegister(TargetReg + 1);
	}

	@Override public void VisitMapLiteralNode(GtMapLiteralNode Node) {
		/*FIXME*/
	}

	@Override public void VisitParamNode(GtParamNode Node) {
		/*FIXME*/
	}

	@Override public void VisitFunctionLiteralNode(GtFunctionLiteralNode Node) {
		/*FIXME*/
	}

	@Override public void VisitGetLocalNode(GtGetLocalNode Node) {
		this.PushRegister(this.LocalVarMap.get(Node.NativeName));
	}

	@Override public void VisitSetLocalNode(GtSetLocalNode Node) {
		Node.ValueNode.Accept(this);
		this.VisitingBuilder.Append("NMOV " + "REG" + this.LocalVarMap.get(Node.NativeName) + ", REG" + this.PopRegister() + "\n");
	}

	@Override public void VisitGetCapturedNode(GtGetCapturedNode Node) {
		/*FIXME*/
	}

	@Override public void VisitSetCapturedNode(GtSetCapturedNode Node) {
		/*FIXME*/
	}

	@Override public void VisitGetterNode(GtGetterNode Node) {
		/*FIXME*/
	}

	@Override public void VisitSetterNode(GtSetterNode Node) {
		Node.RecvNode.Accept(this);
		/*local*/int TargetReg = this.PopRegister();
		/*local*/ArrayList<GtFieldInfo> FieldList = this.ClassFieldMap.get(Node.RecvNode.Type);
		/*local*/int FieldSize = FieldList.size();
		/*local*/int Offset = -1;
		for(/*local*/int i = 0; i < FieldSize; ++i) {
			if(FieldList.get(i).NativeName.equals(Node.NativeName)) {
				Offset = i;
				break;
			}
		}
		Node.ValueNode.Accept(this);
		this.VisitingBuilder.Append("XNMOV " + "REG" + TargetReg + ", " + Offset + ", REG" + this.PopRegister() + "\n");
	}

	@Override public void VisitApplySymbolNode(GtApplySymbolNode Node) {
		/*local*/int ParamSize = LibGreenTea.ListSize(Node.ParamList);
		/*local*/int TargetReg = this.ReserveRegister(ParamSize + CallParameters);
		/*local*/int CallReg = TargetReg - ReturnIndex + ThisIndex;
		for(/*local*/int i = 0; i < ParamSize; ++i) {
			Node.ParamList.get(i).Accept(this);
			this.VisitingBuilder.Append("NMOV " + "REG" + (CallReg+i+1) + ", REG" + this.PopRegister() + "\n");
		}
		/*local*/int CallMethod = this.MethodPool.indexOf(Node.ResolvedFunc.GetNativeFuncName());
		this.VisitingBuilder.Append("NSET " + "REG" + (CallReg+MethodIndex) + ", METHOD" + CallMethod + "\n");
		this.VisitingBuilder.Append("CALL " + "REG" + CallReg + ", " + ParamSize + "\n");
		this.PushRegister(TargetReg);
		this.FreeRegister(TargetReg + 1);
	}

	@Override public void VisitApplyFunctionObjectNode(GtApplyFunctionObjectNode Node) {
		/*FIXME*/
		/*local*/int ParamSize = LibGreenTea.ListSize(Node.ParamList);
		/*local*/int TargetReg = this.ReserveRegister(ParamSize + CallParameters);
		/*local*/int CallReg = TargetReg - ReturnIndex + ThisIndex;
		for(/*local*/int i = 0; i < ParamSize; ++i) {
			Node.ParamList.get(i).Accept(this);
			this.VisitingBuilder.Append("NMOV " + "REG" + (CallReg+i+1) + ", REG" + this.PopRegister() + "\n");
		}
		Node.FuncNode.Accept(this);
		this.VisitingBuilder.Append("NMOV " + "REG" + CallReg + ", REG" + this.PopRegister() + "\n");
		this.VisitingBuilder.Append("LOOPUP " + "REG" + CallReg + "\n");
		this.VisitingBuilder.Append("CALL " + "REG" + CallReg + ", " + ParamSize + "\n");
		this.PushRegister(TargetReg);
		this.FreeRegister(TargetReg + 1);
	}

	@Override public void VisitApplyOverridedMethodNode(GtApplyOverridedMethodNode Node) {
		/*FIXME*/
	}

	@Override public void VisitGetIndexNode(GtGetIndexNode Node) {
		/*local*/int TargetReg = this.ReserveRegister(2/*ArgumentSize*/ + CallParameters);
		/*local*/int CallReg = TargetReg - ReturnIndex + ThisIndex;
		Node.RecvNode.Accept(this);
		this.VisitingBuilder.Append("NMOV " + "REG" + (CallReg+1) + ", REG" + this.PopRegister() + "\n");
		Node.IndexNode.Accept(this);
		this.VisitingBuilder.Append("NMOV " + "REG" + (CallReg+2) + ", REG" + this.PopRegister() + "\n");
		this.VisitingBuilder.Append("NSET " + "REG" + (CallReg+MethodIndex) + ", METHOD\"GetIndex\"\n");
		this.VisitingBuilder.Append("CALL " + "REG" + CallReg + ", " + 2/*ArgumentSize*/ + "\n");
		this.PushRegister(TargetReg);
		this.FreeRegister(TargetReg + 1);
	}

	@Override public void VisitSetIndexNode(GtSetIndexNode Node) {
		/*local*/int TargetReg = this.ReserveRegister(3/*ArgumentSize*/ + CallParameters);
		/*local*/int CallReg = TargetReg - ReturnIndex + ThisIndex;
		Node.RecvNode.Accept(this);
		///*local*/int ArrayVarReg = this.PopRegister();
		//this.VisitingBuilder.Append("NMOV " + "REG" + (CallReg+1) + ", REG" + ArrayVarReg + "\n");
		this.VisitingBuilder.Append("NMOV " + "REG" + (CallReg+1) + ", REG" + this.PopRegister() + "\n");
		Node.IndexNode.Accept(this);
		this.VisitingBuilder.Append("NMOV " + "REG" + (CallReg+2) + ", REG" + this.PopRegister() + "\n");
		Node.ValueNode.Accept(this);
		this.VisitingBuilder.Append("NMOV " + "REG" + (CallReg+3) + ", REG" + this.PopRegister() + "\n");
		this.VisitingBuilder.Append("NSET " + "REG" + (CallReg+MethodIndex) + ", METHOD\"SetIndex\"\n");
		this.VisitingBuilder.Append("CALL " + "REG" + CallReg + ", " + 3/*ArgumentSize*/ + "\n");
		//this.VisitingBuilder.Append("NMOV " + "REG" + ArrayVarReg + ", REG" + TargetReg + "\n");
		this.FreeRegister(TargetReg);
	}

	@Override public void VisitSliceNode(GtSliceNode Node) {
		/*FIXME*/
	}

	@Override public void VisitAndNode(GtAndNode Node) {
		/*FIXME*/
	}

	@Override public void VisitOrNode(GtOrNode Node) {
		/*FIXME*/
	}

	@Override public void VisitUnaryNode(GtUnaryNode Node) {
		/*local*/int TargetReg = this.ReserveRegister(1/*ArgumentSize*/ + CallParameters);
		/*local*/int CallReg = TargetReg - ReturnIndex + ThisIndex;
		Node.RecvNode.Accept(this);
		this.VisitingBuilder.Append("NMOV " + "REG" + (CallReg+1) + ", REG" + this.PopRegister() + "\n");
		/*local*/String Op = Node.Token.ParsedText; //Node.NativeName
		this.VisitingBuilder.Append("NSET " + "REG" + (CallReg+MethodIndex) + ", METHOD\"" + Op + "\"\n");
		this.VisitingBuilder.Append("CALL " + "REG" + CallReg + ", " + 1/*ArgumentSize*/ + "\n");
		this.PushRegister(TargetReg);
		this.FreeRegister(TargetReg + 1);
	}

	@Override public void VisitPrefixInclNode(GtPrefixInclNode Node) {
		/*FIXME*/
	}

	@Override public void VisitPrefixDeclNode(GtPrefixDeclNode Node) {
		/*FIXME*/
	}

	@Override public void VisitSuffixInclNode(GtSuffixInclNode Node) {
		/*FIXME*/
	}

	@Override public void VisitSuffixDeclNode(GtSuffixDeclNode Node) {
		/*FIXME*/
	}

	@Override public void VisitBinaryNode(GtBinaryNode Node) {
		/*local*/int TargetReg = this.ReserveRegister(2/*ArgumentSize*/ + CallParameters);
		/*local*/int CallReg = TargetReg - ReturnIndex + ThisIndex;
		Node.LeftNode.Accept(this);
		this.VisitingBuilder.Append("NMOV " + "REG" + (CallReg+1) + ", REG" + this.PopRegister() + "\n");
		Node.RightNode.Accept(this);
		this.VisitingBuilder.Append("NMOV " + "REG" + (CallReg+2) + ", REG" + this.PopRegister() + "\n");
		/*local*/String Op = Node.Token.ParsedText; //Node.NativeName
		this.VisitingBuilder.Append("NSET " + "REG" + (CallReg+MethodIndex) + ", METHOD\"" + Op + "\"\n");
		this.VisitingBuilder.Append("CALL " + "REG" + CallReg + ", " + 2/*ArgumentSize*/ + "\n");
		this.PushRegister(TargetReg);
		this.FreeRegister(TargetReg + 1);
	}

	@Override public void VisitTrinaryNode(GtTrinaryNode Node) {
		/*FIXME*/
	}

	@Override public void VisitConstructorNode(GtConstructorNode Node) {
		/*local*/int ParamSize = LibGreenTea.ListSize(Node.ParamList);
		/*local*/int TargetReg = this.ReserveRegister(ParamSize + CallParameters);
		/*local*/int CallReg = TargetReg - ReturnIndex + ThisIndex;
		for(/*local*/int i = 0; i < ParamSize; ++i) {
			Node.ParamList.get(i).Accept(this);
			this.VisitingBuilder.Append("NMOV " + "REG" + (CallReg+i+1) + ", REG" + this.PopRegister() + "\n");
		}
		/*local*/int CallMethod = this.MethodPool.indexOf(Node.Func.GetNativeFuncName());
		this.VisitingBuilder.Append("NSET " + "REG" + (CallReg+MethodIndex) + ", METHOD" + CallMethod + "\n");
		//this.VisitingBuilder.Append("NEW  " + "REG" + CallReg + ", CLASS" + this.ClassPool.indexOf(Node.Type) + "\n");
		this.VisitingBuilder.Append("CALL " + "REG" + CallReg + ", " + ParamSize + "\n");
		this.PushRegister(TargetReg);
		this.FreeRegister(TargetReg + 1);
	}

	@Override public void VisitAllocateNode(GtAllocateNode Node) {
		/*local*/int Reg = this.AllocRegister();
		this.VisitingBuilder.Append("NEW  " + "REG" + Reg + ", CLASS" + this.ClassPool.indexOf(Node.Type) + "\n");
		this.PushRegister(Reg);
	}

	@Override public void VisitNewArrayNode(GtNewArrayNode Node) {
		/*FIXME*/
	}

	@Override public void VisitInstanceOfNode(GtInstanceOfNode Node) {
		/*FIXME*/
	}

	@Override public void VisitCastNode(GtCastNode Node) {
		/*FIXME*/
	}

	@Override public void VisitVarDeclNode(GtVarDeclNode Node) {
		this.LocalVarMap.put(Node.NativeName, this.AllocRegister());
		Node.InitNode.Accept(this);
		this.VisitingBuilder.Append("NMOV " + "REG" + this.LocalVarMap.get(Node.NativeName) + ", REG" + this.PopRegister() + "\n");
		this.VisitBlock(Node.BlockNode);
		this.LocalVarMap.remove(Node.NativeName);
	}

	@Override public void VisitUsingNode(GtUsingNode Node) {
		/*FIXME*/
	}

	@Override public void VisitIfNode(GtIfNode Node) {
		/*FIXME*/
	}

	@Override public void VisitWhileNode(GtWhileNode Node) {
		/*FIXME*/
	}

	@Override public void VisitDoWhileNode(GtDoWhileNode Node) {
		/*FIXME*/
	}

	@Override public void VisitForNode(GtForNode Node) {
		/*FIXME*/
	}

	@Override public void VisitForEachNode(GtForEachNode Node) {
		/*FIXME*/
	}

	@Override public void VisitContinueNode(GtContinueNode Node) {
		/*FIXME*/
	}

	@Override public void VisitBreakNode(GtBreakNode Node) {
		/*FIXME*/
	}

	@Override public void VisitStatementNode(GtStatementNode Node) {
		/*FIXME*/
	}

	@Override public void VisitReturnNode(GtReturnNode Node) {
		Node.ValueNode.Accept(this);
		this.VisitingBuilder.Append("NMOV " + "REG" + ReturnIndex + ", REG" + this.PopRegister() + "\n");
		this.VisitingBuilder.Append("RET");
	}

	@Override public void VisitYieldNode(GtYieldNode Node) {
		/*FIXME*/
	}

	@Override public void VisitThrowNode(GtThrowNode Node) {
		/*FIXME*/
	}

	@Override public void VisitTryNode(GtTryNode Node) {
		/*FIXME*/
	}

	@Override public void VisitCatchNode(GtCatchNode Node) {
		/*FIXME*/
	}

	@Override public void VisitSwitchNode(GtSwitchNode Node) {
		/*FIXME*/
	}

	@Override public void VisitCaseNode(GtCaseNode Node) {
		/*FIXME*/
	}

	@Override public void VisitCommandNode(GtCommandNode Node) {
		/*FIXME*/
	}

	@Override public void VisitErrorNode(GtErrorNode Node) {
		/*FIXME*/
	}

	@Override public void GenerateFunc(GtFunc Func, ArrayList<String> ParamNameList, GtNode Body) {
		/*local*/String MethodName = Func.GetNativeFuncName();
		/*local*/int Index = this.AddMethod(MethodName);
		this.RegisterNum = ThisIndex + 1;
		this.VisitingBuilder = this.NewSourceBuilder();
		this.VisitingBuilder.Append("(METHOD" + Index + " " + MethodName);
		/*local*/int ParamSize = LibGreenTea.ListSize(ParamNameList);
		///*local*/HashMap<String,Integer> PushedMap = (/*cast*/HashMap<String,Integer>)this.LocalVarMap.clone();
		for(/*local*/int i = 0; i < ParamSize; ++i) {
			/*local*/String ParamName = ParamNameList.get(i);
			this.LocalVarMap.put(ParamName, this.AllocRegister());
			this.VisitingBuilder.Append(" " + ParamName + ":REG" + this.LocalVarMap.get(ParamName));
		}
		this.VisitingBuilder.Append("):\n");
		this.VisitBlock(Body);
		//this.LocalVarMap = PushedMap;
	}

	@Override public void OpenClassField(GtSyntaxTree ParsedTree, GtType Type, GtClassField ClassField) {
		this.ClassPool.add(Type);
		this.ClassFieldMap.put(Type, ClassField.FieldList);
	}
	
	@Override public void InvokeMainFunc(String MainFuncName) {
		/*FIXME*/
	}
}
