package org.GreenTeaScript;

import java.util.ArrayList;
import java.util.HashMap;

class KonohaByteCodeWriter {
	///*field*/private ArrayList<String> HeaderCode;
	/*field*/private ArrayList<String> ConstCode;
	/*field*/private ArrayList<ArrayList<String>> ClassCodeList;
	/*field*/private ArrayList<String> VisittingClassField;
	/*field*/private ArrayList<ArrayList<String>> MethodCodeList;
	/*field*/private ArrayList<String> VisittingMethodParam;
	/*field*/private ArrayList<String> VisittingMethodBody;
	/*field*/private HashMap<Integer, Integer> LabelMap;

	/*public static final int OPCODE_NOP = 0;
	public static final int OPCODE_THCODE = 1;
	public static final int OPCODE_ENTER = 2;
	public static final int OPCODE_EXIT = 3;
	public static final int OPCODE_NSET = 4;
	public static final int OPCODE_NMOV = 5;
	public static final int OPCODE_NMOVx = 6;
	public static final int OPCODE_XNMOV = 7;
	public static final int OPCODE_NEW = 8;
	public static final int OPCODE_NUL = 9;
	public static final int OPCODE_BOX = 10;
	public static final int OPCODE_BBOX = 11;
	public static final int OPCODE_LOOKUP = 12;
	public static final int OPCODE_CALL = 13;
	public static final int OPCODE_RET = 14;
	public static final int OPCODE_NCALL = 15;
	public static final int OPCODE_JMP = 16;
	public static final int OPCODE_JMPF = 17;
	public static final int OPCODE_TRYJMP = 18;
	public static final int OPCODE_YIELD = 19;
	public static final int OPCODE_ERROR = 20;
	public static final int OPCODE_SAFEPOINT = 21;
	public static final int OPCODE_CHKSTACK = 22;*/
	private static final String ByteDelimiter = ",";
	private static final String CodeDelimiter = "\n";


	public KonohaByteCodeWriter/*constructor*/() {
		//this.HeaderCode = new ArrayList<String>();
		this.ConstCode = new ArrayList<String>();
		this.ClassCodeList = new ArrayList<ArrayList<String>>();
		this.MethodCodeList = new ArrayList<ArrayList<String>>();
		this.VisittingMethodParam = new ArrayList<String>();
		this.LabelMap = new HashMap<Integer, Integer>();
	}

	public void WriteNewConst(int TypeNumber, Object Constant) {
		if(Constant instanceof String) {
			/*local*/String ConstString = Constant.toString();
			this.ConstCode.add(TypeNumber + ByteDelimiter + ConstString.length() + ByteDelimiter + ConstString);			
		}
		else {
			this.ConstCode.add(TypeNumber + ByteDelimiter + Constant.toString());			
		}
	}

	public void CreateNewClassField() {
		this.VisittingClassField = new ArrayList<String>();
	}
	public void WriteClassField(int TypeSource, int TypeNum, String FieldName) {
		this.VisittingClassField.add(TypeSource + ByteDelimiter + TypeNum + ByteDelimiter + FieldName.length() + ByteDelimiter + FieldName);
	}
	public void SetNewClass(String ClassName) {
		/*local*/int ClassFieldSize = this.VisittingClassField.size();
		this.VisittingClassField.add(0, ClassName.length() + ByteDelimiter + ClassName + ByteDelimiter + ClassFieldSize);

		this.ClassCodeList.add(this.VisittingClassField);
		this.VisittingClassField = null;
	}

	public void CreateNewMethodBody() {
		this.VisittingMethodParam.clear();
		this.LabelMap.clear();
		this.VisittingMethodBody = new ArrayList<String>();
	}
	public void WriteMethodParam(int TypeSource, int TypeNum) {
		this.VisittingMethodParam.add(TypeSource + ByteDelimiter + TypeNum);
	}
	public void WriteOpCode(int OpCode, int Operand1, int Operand2, int Operand3) {
		this.VisittingMethodBody.add(OpCode + ByteDelimiter + Operand1 + ByteDelimiter + Operand2 + ByteDelimiter + Operand3);
	}
	public void WriteOpJumpCode(int OpCode, int LabelNum, int Operand2, int Operand3) {
		this.VisittingMethodBody.add(OpCode + ByteDelimiter + "L" + LabelNum + ByteDelimiter + Operand2 + ByteDelimiter + Operand3);
	}
	public void WriteNewLabel(int LabelNum) {
		this.LabelMap.put(LabelNum, this.VisittingMethodBody.size());
	}
	public void ResolveLabelOffset() {
		/*local*/int CodeSize = this.VisittingMethodBody.size();
		for(/*local*/int i = 0; i < CodeSize; ++i) {
			/*local*/String OpCode = this.VisittingMethodBody.get(i);
			/*local*/int OpLabelIndex = OpCode.indexOf("L");
			while(OpLabelIndex != -1) {
				/*local*/int EndIndex = OpCode.indexOf(ByteDelimiter, OpLabelIndex);
				/*local*/Integer LabelNum = Integer.valueOf(OpCode.substring(OpLabelIndex+1, EndIndex));
				/*local*/Integer LabelOffset = this.LabelMap.get(LabelNum);
				OpCode = OpCode.replace("L" + LabelNum, LabelOffset.toString());
				this.VisittingMethodBody.set(i, OpCode);
				OpLabelIndex = OpCode.indexOf("L");
			}
		}
	}
	public void SetNewMethod(int ReturnTypeSource, int ReturnTypeNum, String MethodName) {
		this.ResolveLabelOffset();
		/*local*/String MethodHeader = ReturnTypeSource + ByteDelimiter + ReturnTypeNum + ByteDelimiter + MethodName.length() + ByteDelimiter + MethodName;
		/*local*/int ParamSize = LibGreenTea.ListSize(this.VisittingMethodParam);
		MethodHeader += ByteDelimiter + ParamSize;
		for(/*local*/int i = 0; i < ParamSize; ++i) {
			MethodHeader += ByteDelimiter + this.VisittingMethodParam.get(i);
		}

		MethodHeader += ByteDelimiter + this.VisittingMethodBody.size();
		this.VisittingMethodBody.add(0, MethodHeader);

		this.MethodCodeList.add(this.VisittingMethodBody);
		this.VisittingMethodBody = null;
	}
	public void OutputByteCode(KonohaByteCodeGenerator Generator) {
		/*local*/String ByteCode = "";
		/*local*/int ConstSize = LibGreenTea.ListSize(this.ConstCode);
		ByteCode += ConstSize + CodeDelimiter;
		/*local*/int ClassSize = LibGreenTea.ListSize(this.ClassCodeList);
		ByteCode += ClassSize + CodeDelimiter;
		/*local*/int MethodSize = LibGreenTea.ListSize(this.MethodCodeList);
		ByteCode += MethodSize + CodeDelimiter;
		for(/*local*/int i = 0; i < ConstSize; ++i) {
			ByteCode += this.ConstCode.get(i) + CodeDelimiter;
		}
		for(/*local*/int i = 0; i < ClassSize; ++i) {
			/*local*/ArrayList<String> ClassCode = this.ClassCodeList.get(i);
			for(/*local*/int j = 0; j < ClassCode.size(); ++j) {
				ByteCode += ClassCode.get(j) + CodeDelimiter;
			}
		}
		for(/*local*/int i = 0; i < MethodSize; ++i) {
			/*local*/ArrayList<String> MethodCode = this.MethodCodeList.get(i);
			for(/*local*/int j = 0; j < MethodCode.size(); ++j) {
				ByteCode += MethodCode.get(j) + CodeDelimiter;
			}
		}
		Generator.HeaderBuilder.Append(ByteCode);
	}
}

public class KonohaByteCodeGenerator extends GtSourceGenerator {
	/*field*/private ArrayList<Object> ConstPool;
	///*field*/private HashMap<Object, GtType> ConstTypeMap;
	/*field*/private ArrayList<String> MethodPool;
	/*field*/private ArrayList<GtType> ClassPool;
	/*field*/private HashMap<GtType, ArrayList<GtFieldInfo>> ClassFieldMap;
	/*field*/private int RegisterNum;
	/*field*/private ArrayList<Integer> RegStack;
	/*field*/private int LabelNum;
	/*field*/private ArrayList<Integer> ContinueStack;
	/*field*/private ArrayList<Integer> BreakStack;
	/*field*/private HashMap<String, Integer> LocalVarMap;
	/*field*/private KonohaByteCodeWriter Writer;

	private static final int CallParameters = 5;
	private static final int ThisIndex = 0;
	private static final int MethodIndex = -1;
	private static final int ReturnIndex = -4;

	private static final int OPCODE_NOP = 0;
	private static final int OPCODE_THCODE = 1;
	private static final int OPCODE_ENTER = 2;
	private static final int OPCODE_EXIT = 3;
	private static final int OPCODE_NSET = 4;
	private static final int OPCODE_NMOV = 5;
	private static final int OPCODE_NMOVx = 6;
	private static final int OPCODE_XNMOV = 7;
	private static final int OPCODE_NEW = 8;
	private static final int OPCODE_NUL = 9;
	private static final int OPCODE_BOX = 10;
	private static final int OPCODE_BBOX = 11;
	private static final int OPCODE_LOOKUP = 12;
	private static final int OPCODE_CALL = 13;
	private static final int OPCODE_RET = 14;
	private static final int OPCODE_NCALL = 15;
	private static final int OPCODE_JMP = 16;
	private static final int OPCODE_JMPF = 17;
	private static final int OPCODE_TRYJMP = 18;
	private static final int OPCODE_YIELD = 19;
	private static final int OPCODE_ERROR = 20;
	private static final int OPCODE_SAFEPOINT = 21;
	private static final int OPCODE_CHKSTACK = 22;

	private static final int NSET_InternalMethod = 0;
	private static final int NSET_UserConstant = 1;
	private static final int NSET_UserMethod = 2;
	
	private static final int TypeSource_Default = 0;
	private static final int TypeSource_UserDefined = 1;

	public KonohaByteCodeGenerator/*constructor*/(String TargetCode, String OutputFile, int GeneratorFlag) {
		super(TargetCode, OutputFile, GeneratorFlag);
		this.ConstPool = new ArrayList<Object>();
		//this.ConstTypeMap = new HashMap<Object, GtType>();
		this.MethodPool = new ArrayList<String>();
		this.ClassPool = new ArrayList<GtType>();
		this.ClassFieldMap = new HashMap<GtType, ArrayList<GtFieldInfo>>();
		this.RegisterNum = 0;
		this.RegStack = new ArrayList<Integer>();
		this.LabelNum = 0;
		this.ContinueStack = new ArrayList<Integer>();
		this.BreakStack = new ArrayList<Integer>();
		this.LocalVarMap = new HashMap<String, Integer>();
		this.Writer = new KonohaByteCodeWriter();
	}

	private int GetDefaultTypeNumber(GtType Type) {
		if(Type.IsVoidType()) {
			return 0;
		}
		else if(Type.IsIntType()) {
			return 1;
		}
		else if(Type.IsFloatType()) {
			return 2;
		}
		else if(Type.IsBooleanType()) {
			return 3;
		}
		else if(Type.IsStringType()) {
			return 4;
		}
		/*else if(Type.IsArrayType()){
			return;
		}*/
		return -1;
	}
	private int GetInternalMethodNumber(String MethodName, GtType Type) {
		/*FIXME*/
		return 0;
	}
	@Override public void FlushBuffer() {
		this.Writer.OutputByteCode(this);
		super.FlushBuffer();
	}

	private void PushStack(ArrayList<Integer> Stack, int RegNum) {
		Stack.add(new Integer(RegNum));
	}
	private int PopStack(ArrayList<Integer> Stack) {
		/*local*/int Size = Stack.size();
		/*local*/Integer PopValue = Stack.remove(Size - 1);
		return PopValue.intValue();
	}
	private int PeekStack(ArrayList<Integer> Stack) {
		/*local*/int Size = Stack.size();
		return Stack.get(Size - 1);
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
		this.PushStack(this.RegStack, RegNum);
	}
	private int PopRegister() {
		return this.PopStack(this.RegStack);
	}

	private int NewLabel() {
		return this.LabelNum++;
	}
	private void PushLoopLabel(int ContinueLabel, int BreakLabel) {
		this.PushStack(this.ContinueStack, ContinueLabel);
		this.PushStack(this.BreakStack, BreakLabel);
	}
	private void PopLoopLabel() {
		this.PopStack(this.ContinueStack);
		this.PopStack(this.BreakStack);
	}
	private int PeekContinueLabel() {
		return this.PeekStack(this.ContinueStack);
	}
	private int PeekBreakLabel() {
		return this.PeekStack(this.BreakStack);
	}
	private int AddConstant(Object ConstValue, GtType Type) {
		/*local*/int Index = this.ConstPool.indexOf(ConstValue);
		if(Index == -1) {
			Index = this.ConstPool.size();
			this.ConstPool.add(ConstValue);
			this.Writer.WriteNewConst(this.GetDefaultTypeNumber(Type), ConstValue);
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
	private int GetFieldOffset(ArrayList<GtFieldInfo> FieldList, String FieldName) {
		/*local*/int FieldSize = FieldList.size();
		/*local*/int Offset = -1;
		for(/*local*/int i = 0; i < FieldSize; ++i) {
			if(FieldList.get(i).NativeName.equals(FieldName)) {
				Offset = i;
				break;
			}
		}
		return Offset;
	}

	@Override public void VisitEmptyNode(GtEmptyNode Node) {
		/*FIXME*/
	}

	@Override public void VisitNullNode(GtNullNode Node) {
		/*local*/int Reg = this.AllocRegister();
		this.Writer.WriteOpCode(OPCODE_NUL, Reg, 0, 0);
		this.PushRegister(Reg);
	}

	@Override public void VisitBooleanNode(GtBooleanNode Node) {
		/*local*/int Index = this.AddConstant(new Boolean(Node.Value), Node.Type);
		/*local*/int Reg = this.AllocRegister();
		this.Writer.WriteOpCode(OPCODE_NSET, Reg, NSET_UserConstant, Index);
		this.PushRegister(Reg);
	}

	@Override public void VisitIntNode(GtIntNode Node) {
		/*local*/int Index = this.AddConstant(new Long(Node.Value), Node.Type);
		/*local*/int Reg = this.AllocRegister();
		this.Writer.WriteOpCode(OPCODE_NSET, Reg, NSET_UserConstant, Index);
		this.PushRegister(Reg);
	}

	@Override public void VisitFloatNode(GtFloatNode Node) {
		/*local*/int Index = this.AddConstant(new Float(Node.Value), Node.Type);
		/*local*/int Reg = this.AllocRegister();
		this.Writer.WriteOpCode(OPCODE_NSET, Reg, NSET_UserConstant, Index);
		this.PushRegister(Reg);
	}

	@Override public void VisitStringNode(GtStringNode Node) {
		/*local*/int Index = this.AddConstant(Node.Value, Node.Type);
		/*local*/int Reg = this.AllocRegister();
		this.Writer.WriteOpCode(OPCODE_NSET, Reg, NSET_UserConstant, Index);
		this.PushRegister(Reg);
	}

	@Override public void VisitRegexNode(GtRegexNode Node) {
		/*local*/int Index = this.AddConstant(Node.Value, Node.Type);
		/*local*/int Reg = this.AllocRegister();
		this.Writer.WriteOpCode(OPCODE_NSET, Reg, NSET_UserConstant, Index);
		this.PushRegister(Reg);
	}

	@Override public void VisitConstPoolNode(GtConstPoolNode Node) {
		/*local*/int Index = this.AddConstant(Node.ConstValue, Node.Type);
		/*local*/int Reg = this.AllocRegister();
		this.Writer.WriteOpCode(OPCODE_NSET, Reg, NSET_UserConstant, Index);
		this.PushRegister(Reg);
	}

	@Override public void VisitArrayLiteralNode(GtArrayLiteralNode Node) {
		/*local*/int ArraySize = LibGreenTea.ListSize(Node.NodeList);
		/*local*/int TargetReg = this.ReserveRegister(ArraySize + CallParameters);
		/*local*/int CallReg = TargetReg - ReturnIndex + ThisIndex;
		for(/*local*/int i = 0; i < ArraySize; ++i) {
			Node.NodeList.get(i).Accept(this);
			this.Writer.WriteOpCode(OPCODE_NMOV, (CallReg+i+1), this.PopRegister(), 0);
		}
		this.Writer.WriteOpCode(OPCODE_NSET, (CallReg+MethodIndex), NSET_InternalMethod, this.GetInternalMethodNumber("SetArrayLiteral", Node.Type));
		this.Writer.WriteOpCode(OPCODE_CALL, CallReg, ArraySize, 0);
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
		this.Writer.WriteOpCode(OPCODE_NMOV, this.LocalVarMap.get(Node.NativeName), this.PopRegister(), 0);
	}

	@Override public void VisitGetCapturedNode(GtGetCapturedNode Node) {
		/*FIXME*/
	}

	@Override public void VisitSetCapturedNode(GtSetCapturedNode Node) {
		/*FIXME*/
	}

	@Override public void VisitGetterNode(GtGetterNode Node) {
		Node.RecvNode.Accept(this);
		/*local*/int TargetReg = this.AllocRegister();
		/*local*/ArrayList<GtFieldInfo> FieldList = this.ClassFieldMap.get(Node.RecvNode.Type);
		/*local*/int Offset = this.GetFieldOffset(FieldList, Node.NativeName);
		this.Writer.WriteOpCode(OPCODE_NMOVx, TargetReg, this.PopRegister(), Offset);
		this.PushRegister(TargetReg);
	}

	@Override public void VisitSetterNode(GtSetterNode Node) {
		Node.RecvNode.Accept(this);
		/*local*/int TargetReg = this.PopRegister();
		/*local*/ArrayList<GtFieldInfo> FieldList = this.ClassFieldMap.get(Node.RecvNode.Type);
		/*local*/int Offset = this.GetFieldOffset(FieldList, Node.NativeName);
		Node.ValueNode.Accept(this);
		this.Writer.WriteOpCode(OPCODE_XNMOV, TargetReg, Offset, this.PopRegister());
	}

	@Override public void VisitApplySymbolNode(GtApplySymbolNode Node) {
		/*local*/int ParamSize = LibGreenTea.ListSize(Node.ParamList);
		/*local*/int TargetReg = this.ReserveRegister(ParamSize + CallParameters);
		/*local*/int CallReg = TargetReg - ReturnIndex + ThisIndex;
		for(/*local*/int i = 0; i < ParamSize; ++i) {
			Node.ParamList.get(i).Accept(this);
			this.Writer.WriteOpCode(OPCODE_NMOV, (CallReg+i+1), this.PopRegister(), 0);
		}
		/*local*/int CallMethod = this.MethodPool.indexOf(Node.ResolvedFunc.GetNativeFuncName());
		this.Writer.WriteOpCode(OPCODE_NSET, (CallReg+MethodIndex), NSET_UserMethod, CallMethod);
		this.Writer.WriteOpCode(OPCODE_CALL, CallReg, ParamSize, 0);
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
			this.Writer.WriteOpCode(OPCODE_NMOV, (CallReg+i+1), this.PopRegister(), 0);
		}
		Node.FuncNode.Accept(this);
		this.Writer.WriteOpCode(OPCODE_NMOV, CallReg, this.PopRegister(), 0);
		this.Writer.WriteOpCode(OPCODE_LOOKUP, CallReg, 0, 0);
		this.Writer.WriteOpCode(OPCODE_CALL, CallReg, ParamSize, 0);
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
		this.Writer.WriteOpCode(OPCODE_NMOV, (CallReg+1), this.PopRegister(), 0);
		Node.IndexNode.Accept(this);
		this.Writer.WriteOpCode(OPCODE_NMOV, (CallReg+2), this.PopRegister(), 0);
		this.Writer.WriteOpCode(OPCODE_NSET, (CallReg+MethodIndex), NSET_InternalMethod, this.GetInternalMethodNumber("GetIndex", Node.Type));
		this.Writer.WriteOpCode(OPCODE_CALL, CallReg, 2/*ArgumentSize*/, 0);
		this.PushRegister(TargetReg);
		this.FreeRegister(TargetReg + 1);
	}

	@Override public void VisitSetIndexNode(GtSetIndexNode Node) {
		/*local*/int TargetReg = this.ReserveRegister(3/*ArgumentSize*/ + CallParameters);
		/*local*/int CallReg = TargetReg - ReturnIndex + ThisIndex;
		Node.RecvNode.Accept(this);
		///*local*/int ArrayVarReg = this.PopRegister();
		//this.Writer.WriteMethodBody(OPCODE_NMOV, (CallReg+1), ArrayVarReg);
		this.Writer.WriteOpCode(OPCODE_NMOV, (CallReg+1), this.PopRegister(), 0);
		Node.IndexNode.Accept(this);
		this.Writer.WriteOpCode(OPCODE_NMOV, (CallReg+2), this.PopRegister(), 0);
		Node.ValueNode.Accept(this);
		this.Writer.WriteOpCode(OPCODE_NMOV, (CallReg+3), this.PopRegister(), 0);
		this.Writer.WriteOpCode(OPCODE_NSET, (CallReg+MethodIndex), NSET_InternalMethod, this.GetInternalMethodNumber("SetIndex", Node.Type));
		this.Writer.WriteOpCode(OPCODE_CALL, CallReg, 3/*ArgumentSize*/, 0);
		//this.Writer.WriteMethodBody(OPCODE_NMOV, ArrayVarReg, TargetReg);
		this.FreeRegister(TargetReg);
	}

	@Override public void VisitSliceNode(GtSliceNode Node) {
		/*FIXME*/
	}

	@Override public void VisitAndNode(GtAndNode Node) {
		/*local*/int TargetReg = this.AllocRegister();
		/*local*/int EndLabel = this.NewLabel();
		Node.LeftNode.Accept(this);
		this.Writer.WriteOpCode(OPCODE_NMOV, TargetReg, this.PopRegister(), 0);
		this.Writer.WriteOpJumpCode(OPCODE_JMPF, EndLabel, TargetReg, 0);
		Node.RightNode.Accept(this);
		this.Writer.WriteOpCode(OPCODE_NMOV, TargetReg, this.PopRegister(), 0);
		this.Writer.WriteNewLabel(EndLabel);
		this.PushRegister(TargetReg);
	}

	@Override public void VisitOrNode(GtOrNode Node) {
		/*local*/int TargetReg = this.AllocRegister();
		/*local*/int RightLabel = this.NewLabel();
		/*local*/int EndLabel = this.NewLabel();
		Node.LeftNode.Accept(this);
		this.Writer.WriteOpCode(OPCODE_NMOV, TargetReg, this.PopRegister(), 0);
		this.Writer.WriteOpJumpCode(OPCODE_JMPF, RightLabel, TargetReg, 0);
		this.Writer.WriteOpJumpCode(OPCODE_JMP, EndLabel, 0, 0);
		this.Writer.WriteNewLabel(RightLabel);
		Node.RightNode.Accept(this);
		this.Writer.WriteOpCode(OPCODE_NMOV, TargetReg, this.PopRegister(), 0);
		this.Writer.WriteNewLabel(EndLabel);
		this.PushRegister(TargetReg);
	}

	@Override public void VisitUnaryNode(GtUnaryNode Node) {
		/*local*/int TargetReg = this.ReserveRegister(1/*ArgumentSize*/ + CallParameters);
		/*local*/int CallReg = TargetReg - ReturnIndex + ThisIndex;
		Node.RecvNode.Accept(this);
		this.Writer.WriteOpCode(OPCODE_NMOV, (CallReg+1), this.PopRegister(), 0);
		/*local*/String Op = Node.Token.ParsedText; //Node.NativeName
		this.Writer.WriteOpCode(OPCODE_NSET, (CallReg+MethodIndex), NSET_InternalMethod, this.GetInternalMethodNumber(Op, Node.Type));
		this.Writer.WriteOpCode(OPCODE_CALL, CallReg, 1/*ArgumentSize*/, 0);
		this.PushRegister(TargetReg);
		this.FreeRegister(TargetReg + 1);
	}

	@Override public void VisitPrefixInclNode(GtPrefixInclNode Node) {
		/*FIXME*/
		/*local*/int TargetReg = this.ReserveRegister(2/*ArgumentSize*/ + CallParameters);
		/*local*/int CallReg = TargetReg - ReturnIndex + ThisIndex;
		Node.RecvNode.Accept(this);
		this.Writer.WriteOpCode(OPCODE_NMOV, (CallReg+1), this.PopRegister(), 0);
		/*local*/int Index = this.AddConstant(new Long(1), GtStaticTable.IntType);
		this.Writer.WriteOpCode(OPCODE_NSET, (CallReg+2), NSET_UserConstant, Index);
		this.Writer.WriteOpCode(OPCODE_NSET, (CallReg+MethodIndex), NSET_InternalMethod, this.GetInternalMethodNumber("+", Node.Type));
		this.Writer.WriteOpCode(OPCODE_CALL, CallReg, 2/*ArgumentSize*/, 0);
		this.PushRegister(TargetReg);
		this.FreeRegister(TargetReg + 1);
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
		this.Writer.WriteOpCode(OPCODE_NMOV, (CallReg+1), this.PopRegister(), 0);
		Node.RightNode.Accept(this);
		this.Writer.WriteOpCode(OPCODE_NMOV, (CallReg+2), this.PopRegister(), 0);
		/*local*/String Op = Node.Token.ParsedText; //Node.NativeName
		this.Writer.WriteOpCode(OPCODE_NSET, (CallReg+MethodIndex), NSET_InternalMethod, this.GetInternalMethodNumber(Op, Node.Type));
		this.Writer.WriteOpCode(OPCODE_CALL, CallReg, 2/*ArgumentSize*/, 0);
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
			this.Writer.WriteOpCode(OPCODE_NMOV, (CallReg+i+1), this.PopRegister(), 0);
		}
		/*local*/int CallMethod = this.MethodPool.indexOf(Node.Func.GetNativeFuncName());
		this.Writer.WriteOpCode(OPCODE_NSET, (CallReg+MethodIndex), NSET_UserMethod, CallMethod);
		//this.Writer.WriteMethodBody("NEW  " + "REG" + CallReg, " CLASS" + this.ClassPool.indexOf(Node.Type));
		this.Writer.WriteOpCode(OPCODE_CALL, CallReg, ParamSize, 0);
		this.PushRegister(TargetReg);
		this.FreeRegister(TargetReg + 1);
	}

	@Override public void VisitAllocateNode(GtAllocateNode Node) {
		/*local*/int Reg = this.AllocRegister();
		this.Writer.WriteOpCode(OPCODE_NEW, Reg, TypeSource_UserDefined, this.ClassPool.indexOf(Node.Type));
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
		this.Writer.WriteOpCode(OPCODE_NMOV, this.LocalVarMap.get(Node.NativeName), this.PopRegister(), 0);
		this.VisitBlock(Node.BlockNode);
		this.LocalVarMap.remove(Node.NativeName);
	}

	@Override public void VisitUsingNode(GtUsingNode Node) {
		/*FIXME*/
	}

	@Override public void VisitIfNode(GtIfNode Node) {
		/*local*/int ElseLabel = this.NewLabel();
		/*local*/int EndLabel = this.NewLabel();
		Node.CondNode.Accept(this);
		this.Writer.WriteOpJumpCode(OPCODE_JMPF, ElseLabel, this.PopRegister(), 0);
		this.VisitBlock(Node.ThenNode);
		this.Writer.WriteOpJumpCode(OPCODE_JMP, EndLabel, 0, 0);
		this.Writer.WriteNewLabel(ElseLabel);
		this.VisitBlock(Node.ElseNode);
		this.Writer.WriteNewLabel(EndLabel);
	}

	@Override public void VisitWhileNode(GtWhileNode Node) {
		/*local*/int CondLabel = this.NewLabel();
		/*local*/int EndLabel = this.NewLabel();
		this.PushLoopLabel(CondLabel, EndLabel);
		this.Writer.WriteNewLabel(CondLabel);
		Node.CondNode.Accept(this);
		this.Writer.WriteOpJumpCode(OPCODE_JMPF, EndLabel, this.PopRegister(), 0);
		this.VisitBlock(Node.BodyNode);
		this.Writer.WriteOpJumpCode(OPCODE_JMP, CondLabel, 0, 0);
		this.Writer.WriteNewLabel(EndLabel);
		this.PopLoopLabel();
	}

	@Override public void VisitDoWhileNode(GtDoWhileNode Node) {
		/*local*/int BodyLabel = this.NewLabel();
		/*local*/int CondLabel = this.NewLabel();
		/*local*/int EndLabel = this.NewLabel();
		this.PushLoopLabel(CondLabel, EndLabel);
		this.Writer.WriteNewLabel(BodyLabel);
		this.VisitBlock(Node.BodyNode);
		this.Writer.WriteNewLabel(CondLabel);
		Node.CondNode.Accept(this);
		this.Writer.WriteOpJumpCode(OPCODE_JMPF, EndLabel, this.PopRegister(), 0);
		this.Writer.WriteOpJumpCode(OPCODE_JMP, BodyLabel, 0, 0);
		this.Writer.WriteNewLabel(EndLabel);
		this.PopLoopLabel();
	}

	@Override public void VisitForNode(GtForNode Node) {
		/*local*/int CondLabel = this.NewLabel();
		/*local*/int IterLabel = this.NewLabel();
		/*local*/int EndLabel = this.NewLabel();
		this.PushLoopLabel(IterLabel, EndLabel);
		this.Writer.WriteNewLabel(CondLabel);
		Node.CondNode.Accept(this);
		this.Writer.WriteOpJumpCode(OPCODE_JMPF, EndLabel, this.PopRegister(), 0);
		this.VisitBlock(Node.BodyNode);
		this.Writer.WriteNewLabel(IterLabel);
		this.VisitBlock(Node.IterNode);
		this.Writer.WriteOpJumpCode(OPCODE_JMP, CondLabel, 0, 0);
		this.Writer.WriteNewLabel(EndLabel);
		this.PopLoopLabel();
	}

	@Override public void VisitForEachNode(GtForEachNode Node) {
		/*FIXME*/
	}

	@Override public void VisitContinueNode(GtContinueNode Node) {
		this.Writer.WriteOpJumpCode(OPCODE_JMP, this.PeekContinueLabel(), 0, 0);
	}

	@Override public void VisitBreakNode(GtBreakNode Node) {
		this.Writer.WriteOpJumpCode(OPCODE_JMP, this.PeekBreakLabel(), 0, 0);
	}

	@Override public void VisitStatementNode(GtStatementNode Node) {
		/*FIXME*/
	}

	@Override public void VisitReturnNode(GtReturnNode Node) {
		if(Node.ValueNode != null) {
			Node.ValueNode.Accept(this);
			this.Writer.WriteOpCode(OPCODE_NMOV, ReturnIndex, this.PopRegister(), 0);
		}
		this.Writer.WriteOpCode(OPCODE_RET, 0, 0, 0);
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
		this.AddMethod(MethodName);
		this.RegisterNum = ThisIndex + 1;
		//this.LabelNum = 0;
		this.Writer.CreateNewMethodBody();
		/*local*/int ParamSize = LibGreenTea.ListSize(ParamNameList);
		///*local*/HashMap<String,Integer> PushedMap = (/*cast*/HashMap<String,Integer>)this.LocalVarMap.clone();
		for(/*local*/int i = 0; i < ParamSize; ++i) {
			/*local*/String ParamName = ParamNameList.get(i);
			this.LocalVarMap.put(ParamName, this.AllocRegister());
			/*local*/GtType ParamType = Func.Types[i+1];
			/*local*/int ParamTypeNum = this.GetDefaultTypeNumber(ParamType);
			if(ParamTypeNum != -1) {
				this.Writer.WriteMethodParam(TypeSource_Default, ParamTypeNum);
			}
			else {
				this.Writer.WriteMethodParam(TypeSource_UserDefined, this.ClassPool.indexOf(ParamType));
			}
		}
		this.VisitBlock(Body);
		/*local*/GtType ReturnType = Func.Types[0];
		/*local*/int ReturnTypeNum = this.GetDefaultTypeNumber(ReturnType);
		if(ReturnTypeNum != -1) {
			this.Writer.SetNewMethod(TypeSource_Default, ReturnTypeNum, MethodName);
		}
		else {
			this.Writer.SetNewMethod(TypeSource_UserDefined, this.ClassPool.indexOf(ReturnType), MethodName);
		}
		//this.LocalVarMap = PushedMap;
	}

	@Override public void OpenClassField(GtSyntaxTree ParsedTree, GtType Type, GtClassField ClassField) {
		this.ClassPool.add(Type);
		this.ClassFieldMap.put(Type, ClassField.FieldList);
		
		this.Writer.CreateNewClassField();
		/*local*/int FieldSize = ClassField.FieldList.size();
		for(/*local*/int i = 0; i < FieldSize; ++i) {
			/*local*/GtFieldInfo FieldInfo = ClassField.FieldList.get(i);
			/*local*/int DefaultTypeNum = this.GetDefaultTypeNumber(FieldInfo.Type);
			if(DefaultTypeNum != -1) {
				this.Writer.WriteClassField(TypeSource_Default, DefaultTypeNum, FieldInfo.NativeName);
			}
			else {
				this.Writer.WriteClassField(TypeSource_UserDefined, this.ClassPool.indexOf(Type), FieldInfo.NativeName);
			}
		}
		this.Writer.SetNewClass(Type.ShortName);
	}
	
	@Override public void InvokeMainFunc(String MainFuncName) {
		/*FIXME*/
	}
}
