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



//GreenTea Generator should be written in each language.

class BashSourceGenerator extends SourceGenerator {
	inFunc: boolean = false;
	inMainFunc: boolean = false;

	 constructor(TargetCode: string, OutputFile: string, GeneratorFlag: number) {
		super(TargetCode, OutputFile, GeneratorFlag);
		this.TrueLiteral  = "0";
		this.FalseLiteral = "1";
		this.NullLiteral = this.Quote("__NULL__");
		this.MemberAccessOperator = "__MEMBER__";
		this.LineComment = "##";
	}

	public InitContext(Context: GtContext): void {
		super.InitContext(Context);
		this.WriteLineHeader("#!/bin/bash");
		this.WriteLineCode(this.LineFeed + "source $GREENTEA_HOME/include/bash/GreenTeaPlus.sh" + this.LineFeed);
	}

	public GenerateFuncTemplate(ParamSize: number, Func: GtFunc): string {
		var BeginIdx: number = 1;
		var Template: string = "";
		var IsNative: boolean = false;
		if(Func == null) {
			Template = "$1";
			BeginIdx = 2;
		}
		else if(Func.Is(NativeFunc)) {
			Template = "$1" + this.MemberAccessOperator + Func.FuncName;
			BeginIdx = 2;
		}
		else if(Func.Is(NativeMacroFunc)) {
			Template = Func.GetNativeMacro();
			IsNative = true;
		}
		else {
			Template = Func.GetNativeFuncName();
		}
		var i: number = BeginIdx;
		if(IsNative == false) {
			while(i < ParamSize) {
				Template += " $" + i;
				i = i + 1;
			}
		}
		return Template;
	}

	private VisitBlockWithIndent(Node: GtNode, allowDummyBlock: boolean): string {
		return this.VisitBlockWithOption(Node, true, allowDummyBlock, false);
	}

	private VisitBlockWithSkipJump(Node: GtNode, allowDummyBlock: boolean): string {
		return this.VisitBlockWithOption(Node, true, allowDummyBlock, true);
	}

	private VisitBlockWithoutIndent(Node: GtNode, allowDummyBlock: boolean): string {
		return this.VisitBlockWithOption(Node, false, allowDummyBlock, false);
	}

	private VisitBlockWithOption(Node: GtNode, inBlock: boolean, allowDummyBlock: boolean, skipJump: boolean): string {
		var Code: string = "";
		if(inBlock) {
			this.Indent();
		}
		var CurrentNode: GtNode = Node;
		if(this.IsEmptyBlock(Node) && allowDummyBlock) {
			Code += this.GetIndentString() + "echo \"dummy block!!\" &> /dev/zero" + this.LineFeed;
		}
		while(!this.IsEmptyBlock(CurrentNode)) {
			var poppedCode: string = this.VisitNode(CurrentNode);
			if(skipJump && (CurrentNode instanceof BreakNode || CurrentNode instanceof ContinueNode)) {
				poppedCode = "echo \"skipcode: jump\" $> /dev/zero";
			}
			if(!LibGreenTea.EqualsString(poppedCode, "")) {
				Code += this.GetIndentString() + poppedCode + this.LineFeed;
			}
			CurrentNode = CurrentNode.NextNode;
		}
		if(inBlock) {
			this.UnIndent();
			Code += this.GetIndentString();
		}
		else {
			if(Code.length > 0) {
				Code = Code.substring(0, Code.length - 1);
			}
		}
		return Code;
	}

	private Quote(Value: string): string {
		return "\"" + Value  + "\"";
	}

	public CreateDoWhileNode(Type: GtType, ParsedTree: GtSyntaxTree, Cond: GtNode, Block: GtNode): GtNode {
		/*
		 * do { Block } while(Cond)
		 * => while(True) { Block; if(Cond) { break; } }
		 */
		var Break: GtNode = this.CreateBreakNode(Type, ParsedTree, null);
		var IfBlock: GtNode = this.CreateIfNode(Type, ParsedTree, Cond, Break, null);
		LinkNode(IfBlock, Block);
		var TrueNode: GtNode = this.CreateConstNode(ParsedTree.NameSpace.Context.BooleanType, ParsedTree, true);
		return this.CreateWhileNode(Type, ParsedTree, TrueNode, Block);
	}

	private ResolveCondition(Node: GtNode): string {
		var Cond: string = this.VisitNode(Node);
		if(LibGreenTea.EqualsString(Cond, "0")) {
			Cond = "((1 == 1))";
		}
		else if(LibGreenTea.EqualsString(Cond, "1")) {
			Cond = "((1 != 1))";
		}
		return Cond;
	}

	public VisitWhileNode(Node: WhileNode): void {
		var Program: string = "while " + this.ResolveCondition(Node.CondExpr) + " ;do" + this.LineFeed;
		Program += this.VisitBlockWithIndent(Node.LoopBody, true) + "done";
		this.PushSourceCode(Program);
	}

	public VisitForNode(Node: ForNode): void {
		var Cond: string = this.ResolveCondition(Node.CondExpr);
		var Iter: string = this.VisitNode(Node.IterExpr);
		var Program: string = "for((; " + Cond  + "; " + Iter + " )) ;do" + this.LineFeed;
		Program += this.VisitBlockWithIndent(Node.LoopBody, true) + "done";
		this.PushSourceCode(Program);
	}

	public VisitForEachNode(Node: ForEachNode): void {
		var Variable: string = this.VisitNode(Node.Variable);
		var Iter: string = this.VisitNode(Node.IterExpr);
		var Program: string = "for " + Variable + " in " + "${" + Iter + "[@]} ;do" + this.LineFeed;
		Program += this.VisitBlockWithIndent(Node.LoopBody, true) + "done";
		this.PushSourceCode(Program);
	}

	private MakeParamCode(ParamList: Array<GtNode>): string[] {
		var Size: number = LibGreenTea.ListSize(ParamList);
		var ParamCode: string[] = new Array<string>(Size - 1);
		var i: number = 1;
		while(i < Size) {
			ParamCode[i - 1] = this.ResolveValueType(ParamList.get(i), false);
			i = i + 1;
		}
		return ParamCode;
	}

	private CreateAssertFunc(Node: ApplyNode): string {
		var ParamNode: GtNode = Node.NodeList.get(1);
		return "assert " + this.Quote(this.ResolveCondition(ParamNode));
	}

	public VisitApplyNode(Node: ApplyNode): void {
		var ParamCode: string[] = this.MakeParamCode(Node.NodeList);
		if(Node.Func == null) {
			this.PushSourceCode(this.JoinCode(ParamCode[0] + " ", 0, ParamCode, "", " "));
		}
//		else if(Node.Func.Is(NativeFunc)) {
//			this.PushSourceCode(this.JoinCode(ParamCode[0] + "." + Node.Func.FuncName + " ", 0, ParamCode, ""));
//		}
		else if(Node.Func.Is(NativeMacroFunc)) {
			var NativeMacro: string = Node.Func.GetNativeMacro();
			if(LibGreenTea.EqualsString(NativeMacro, "assert $1")) {
				this.PushSourceCode(this.CreateAssertFunc(Node));
				return;
			}
			this.PushSourceCode(Node.Func.ApplyNativeMacro(0, ParamCode));
		}
		else {
			this.PushSourceCode(this.JoinCode(Node.Func.GetNativeFuncName() + " ", 0, ParamCode, "", " "));
		}
	}

	public VisitUnaryNode(Node: UnaryNode): void {
		var FuncName: string = Node.Token.ParsedText;
		var Func: GtFunc = Node.Func;
		var Expr: string = this.ResolveValueType(Node.Expr, false);	//TODO: support ++ --
		var Macro: string = null;
		if(Func != null) {
			FuncName = Func.GetNativeFuncName();
			if(IsFlag(Func.FuncFlag, NativeMacroFunc)) {
				Macro = Func.GetNativeMacro();
			}
		}
		if(Macro == null) {
			Macro = "((" + FuncName + " $1))";
		}
		this.PushSourceCode(Macro.replace("$1", Expr));
	}

	public VisitBinaryNode(Node: BinaryNode): void {
		var FuncName: string = Node.Token.ParsedText;
		var Func: GtFunc = Node.Func;
		var Left: string = this.ResolveValueType(Node.LeftNode, false);
		var Right: string = this.ResolveValueType(Node.RightNode, false);
		var Macro: string = null;
		if(Func != null) {
			FuncName = Func.GetNativeFuncName();
			if(IsFlag(Func.FuncFlag, NativeMacroFunc)) {
				Macro = Func.GetNativeMacro();
			}
		}
		if(Macro == null) {
			Macro = "(($1 " + FuncName + " $2))";
		}
		this.PushSourceCode(Macro.replace("$1", Left).replace("$2", Right));
	}

	private GetMemberIndex(ClassType: GtType, MemberName: string): string {
		return "$" + ClassType.ShortClassName + this.MemberAccessOperator + MemberName;
	}

	private IsNativeType(Type: GtType): boolean {
		if(Type != null && Type.IsNative()) {
			return true;
		}
		return false;
	}

	public VisitGetterNode(Node: GetterNode): void {
		this.PushSourceCode(this.VisitNode(Node.Expr) + "[" + this.GetMemberIndex(Node.Expr.Type, Node.Func.FuncName) + "]");
	}

	public VisitIndexerNode(Node: IndexerNode): void {
		this.PushSourceCode(this.VisitNode(Node.Expr) + "[" + this.ResolveValueType(Node.GetAt(0), false) + "]");
	}

	public VisitAndNode(Node: AndNode): void {
		this.PushSourceCode("(" + this.ResolveCondition(Node.LeftNode) + " && " + this.ResolveCondition(Node.RightNode) + ")");
	}

	public VisitOrNode(Node: OrNode): void {
		this.PushSourceCode("(" + this.ResolveCondition(Node.LeftNode) + " || " + this.ResolveCondition(Node.RightNode) + ")");
	}

	public VisitAssignNode(Node: AssignNode): void {
		this.PushSourceCode(this.VisitNode(Node.LeftNode) + "=" + this.ResolveValueType(Node.RightNode, true));
	}

	public VisitVarNode(Node: VarNode): void {
		var VarName: string = Node.NativeName;
		var Declare: string = "declare ";
		var Option: string = "";
		if(this.inFunc) {
			Declare = "local ";
		}
		if(this.IsNativeType(Node.DeclType)) {
			Option = "-a ";
		}
		
		var Code: string = Declare + Option + VarName + this.LineFeed;
		Code += this.GetIndentString() + VarName;
		if(Node.InitNode != null) {
			Code += "=" + this.ResolveValueType(Node.InitNode, true);
		} 
		Code +=  this.LineFeed;
		this.PushSourceCode(Code + this.VisitBlockWithoutIndent(Node.BlockNode, false));
	}

	public VisitTrinaryNode(Node: TrinaryNode): void {
		var CondExpr: string = this.ResolveCondition(Node.CondExpr);
		var Then: string = this.ResolveValueType(Node.ThenExpr, false);
		var Else: string = this.ResolveValueType(Node.ElseExpr, false);
		this.PushSourceCode("((" + CondExpr + " ? " + Then + " : " + Else + "))");
	}

	public VisitIfNode(Node: IfNode): void {
		var CondExpr: string = this.ResolveCondition(Node.CondExpr);
		var ThenBlock: string = this.VisitBlockWithIndent(Node.ThenNode, true);
		var Code: string = "if " + CondExpr + " ;then" + this.LineFeed + ThenBlock;
		if(!this.IsEmptyBlock(Node.ElseNode)) {
			Code += "else" + this.LineFeed + this.VisitBlockWithIndent(Node.ElseNode, false);
		}
		Code += "fi";
		this.PushSourceCode(Code);
	}

	public VisitSwitchNode(Node: SwitchNode): void {
		var Code: string = "case " + this.ResolveValueType(Node.MatchNode, false) + " in";
		var i: number = 0;
		while(i < Node.CaseList.size()) {
			var Case: GtNode  = Node.CaseList.get(i);
			var Block: GtNode = Node.CaseList.get(i+1);
			Code += this.LineFeed + this.GetIndentString() + this.VisitNode(Case) + ")" + this.LineFeed;
			Code += this.VisitBlockWithSkipJump(Block, true) + ";;";
			i = i + 2;
		}
		if(Node.DefaultBlock != null) {
			Code += this.LineFeed + this.GetIndentString() + "*)" + this.LineFeed;
			Code += this.VisitBlockWithSkipJump(Node.DefaultBlock, false) + ";;";
		}
		Code += this.LineFeed + this.GetIndentString() + "esac";
		this.PushSourceCode(Code);
	}

	public VisitReturnNode(Node: ReturnNode): void {
		if(!this.inFunc) {
			return;
		}
		
		if(Node.Expr != null) {
			var Ret: string = this.ResolveValueType(Node.Expr, false);
			if(Node.Type.equals(Node.Type.Context.BooleanType) || 
					(Node.Type.equals(Node.Type.Context.IntType) && this.inMainFunc)) {
				this.PushSourceCode("return " + Ret);
				return;
			}
			this.PushSourceCode("echo " + Ret + this.LineFeed + this.GetIndentString() + "return 0");
			return;
		}
		this.PushSourceCode("return 0");
	}

	public VisitTryNode(Node: TryNode): void {
		var TrueNode: GtNode = new ConstNode(Node.Type.Context.BooleanType, null, true);
		var Code: string = "trap ";
		var Try: string = this.VisitNode(new IfNode(null, null, TrueNode, Node.TryBlock, null));
		var Catch: string = this.VisitNode(new IfNode(null, null, TrueNode, Node.CatchBlock, null));
		Code += this.Quote(Catch) + " ERR" + this.LineFeed;
		Code += this.GetIndentString() + Try + this.LineFeed + this.GetIndentString() + "trap ERR";
		if(Node.FinallyBlock != null) {
			var Finally: string = this.VisitNode(new IfNode(null, null, TrueNode, Node.FinallyBlock, null));
			Code += this.LineFeed + this.GetIndentString() + Finally;
		}
		this.PushSourceCode(Code);
	}

	public VisitThrowNode(Node: ThrowNode): void {
		this.PushSourceCode("kill &> /dev/zero");
	}

	public VisitErrorNode(Node: ErrorNode): void {
		this.PushSourceCode("echo " + this.Quote(Node.Token.ParsedText) + " >&2");
	}

	public VisitCommandNode(Node: CommandNode): void {
		var Code: string = "";
		var Type: GtType = Node.Type;
		var CurrentNode: CommandNode = Node;
		while(CurrentNode != null) {
			Code += this.AppendCommand(CurrentNode);
			CurrentNode = <CommandNode> CurrentNode.PipedNextNode;
		}
		
		if(Type.equals(Type.Context.StringType)) {
			Code = "execCommadString " + this.Quote(Code);
		}
		else if(Type.equals(Type.Context.BooleanType)) {
			Code = "execCommadBool " + this.Quote(Code);
		}
		this.PushSourceCode(Code);
	}

	private AppendCommand(CurrentNode: CommandNode): string {
		var Code: string = "";
		var size: number = CurrentNode.Params.size();
		var i: number = 0;
		while(i < size) {
			Code += this.ResolveValueType(CurrentNode.Params.get(i), false) + " ";
			i = i + 1;
		}
		return Code;
	}

	private ResolveParamName(Func: GtFunc, ParamNameList: Array<string>, Body: GtNode): GtNode {
		return this.ConvertParamName(Func, ParamNameList, Body, 0);
	}

	private ConvertParamName(Func: GtFunc, ParamNameList: Array<string>, Body: GtNode, index: number): GtNode {
		if(ParamNameList == null || index == ParamNameList.size()) {
			return Body;
		}
		
		var ParamType: GtType = Func.GetFuncParamType(index);
		var oldVarNode: GtNode = new LocalNode(ParamType, null, "" + (index + 1));
		var Let: GtNode = new VarNode(null, null, ParamType, ParamNameList.get(index), oldVarNode, null);
		index += 1;
		Let.NextNode = this.ConvertParamName(Func, ParamNameList, Body, index);
		return Let;
	}

	private CheckConstFolding(TargetNode: GtNode): boolean {
		if(TargetNode instanceof ConstNode) {
			return true;
		}
		else if(TargetNode instanceof UnaryNode) {
			var Unary: UnaryNode = <UnaryNode> TargetNode;
			return this.CheckConstFolding(Unary.Expr);
		}
		else if(TargetNode instanceof BinaryNode) {
			var Binary: BinaryNode = <BinaryNode> TargetNode;
			if(this.CheckConstFolding(Binary.LeftNode) && this.CheckConstFolding(Binary.RightNode)) {
				return true;
			}
		}
		return false;
	}

	private ResolveValueType(TargetNode: GtNode, isAssign: boolean): string {
		var ResolvedValue: string;
		var Value: string = this.VisitNode(TargetNode);
		var Type: GtType = TargetNode.Type;
		
		// resolve constant folding
		if(this.CheckConstFolding(TargetNode)) {
			return Value;
		}
		
		// resolve boolean function
		if(Type != null && Type.equals(Type.Context.BooleanType)) {
			if(TargetNode instanceof ApplyNode || TargetNode instanceof UnaryNode || 
					TargetNode instanceof CommandNode || TargetNode instanceof BinaryNode) {
				return "$(valueOfBool " + this.Quote(Value) + ")";
			}
		}
		
		if(TargetNode instanceof ConstNode || TargetNode instanceof NullNode) {
			return Value;
		}
		else if(TargetNode instanceof IndexerNode || TargetNode instanceof GetterNode) {
			ResolvedValue = "${" + Value + "}";
		}
		else if(TargetNode instanceof ApplyNode || TargetNode instanceof CommandNode || TargetNode instanceof NewNode) {
			ResolvedValue = "$(" + Value + ")";
		}
		else if(TargetNode instanceof LocalNode && !this.IsNativeType(Type)) {
			var Local: LocalNode = <LocalNode> TargetNode;
			var Name: string = Local.NativeName;
			ResolvedValue = "${" + Value + "[@]}";
			if(Name.length == 1 && LibGreenTea.IsDigit(Name, 0)) {
				ResolvedValue = "$" + Value;
			}
		}
		else {
			ResolvedValue = "$" + Value;
		}
		
		// resolve assigned object
		if(isAssign) {
			if(!this.IsNativeType(Type)) {
				ResolvedValue = "(" + ResolvedValue + ")";
				return ResolvedValue;
			}
		}
		
		// resolve string and object value
		if(Type != null) {
			if(Type.equals(Type.Context.StringType) || !this.IsNativeType(Type)) {
				ResolvedValue = this.Quote(ResolvedValue);
			}
		}
		return ResolvedValue;
	}

	public GenerateFunc(Func: GtFunc, ParamNameList: Array<string>, Body: GtNode): void {
		this.FlushErrorReport();
		var Function: string = "";
		var FuncName: string = Func.GetNativeFuncName();
		this.inFunc = true;
		if(LibGreenTea.EqualsString(FuncName, "main")) {
			this.inMainFunc = true;
		}
		Function += FuncName + "() {" + this.LineFeed;
		var Block: string = this.VisitBlockWithIndent(this.ResolveParamName(Func, ParamNameList, Body), true);
		Function += Block + "}" + this.LineFeed;
		this.WriteLineCode(Function);
		this.inFunc = false;
		this.inMainFunc = false;
	}

	GetNewOperator(Type: GtType): string {
		return this.Quote("$(__NEW__" + Type.ShortClassName + ")");
	}

	public GenerateClassField(Type: GtType, ClassField: GtClassField): void {	//TODO: support super
		var Program: string = "__NEW__" + Type.ShortClassName + "() {" + this.LineFeed;
		this.WriteLineCode("#### define class " + Type.ShortClassName + " ####");
		this.Indent();
		Program += this.GetIndentString() + "local -a " + this.GetRecvName() + this.LineFeed;

		var i: number = 0;
		while(i < ClassField.FieldList.size()) {
			var FieldInfo: GtFieldInfo = ClassField.FieldList.get(i);
			var InitValue: string = this.StringifyConstValue(FieldInfo.InitValue);
			if(!FieldInfo.Type.IsNative()) {
				InitValue = "NULL";
			}
			this.WriteLineCode(Type.ShortClassName + this.MemberAccessOperator + FieldInfo.NativeName + "=" + i);
			
			Program += this.GetIndentString() + this.GetRecvName();
			Program += "[" + this.GetMemberIndex(Type, FieldInfo.NativeName) + "]=" + InitValue + this.LineFeed;
			i = i + 1;
		}
		Program += this.GetIndentString() + "echo ";
		Program += this.Quote("${" + this.GetRecvName() + "[@]}") + this.LineFeed;
		this.UnIndent();
		Program += "}";
		
		this.WriteLineCode("\n" + Program);
	}

	public Eval(Node: GtNode): Object {
		var Code: string = this.VisitBlockWithoutIndent(Node, false);
		if(!LibGreenTea.EqualsString(Code, "")) {
			this.WriteLineCode(Code);
		}
		return Code;
	}

	public InvokeMainFunc(MainFuncName: string): void {
		this.WriteLineCode(MainFuncName);
	}
}