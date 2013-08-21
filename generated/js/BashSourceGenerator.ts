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
	cmdCounter: number = 0;

	 constructor(TargetCode: string, OutputFile: string, GeneratorFlag: number) {
		super(TargetCode, OutputFile, GeneratorFlag);
		this.TrueLiteral  = "0";
		this.FalseLiteral = "1";
		this.NullLiteral = "NULL";
	}

	public InitContext(Context: GtClassContext): void {
		super.InitContext(Context);
		this.WriteLineHeader("#!/bin/bash");
		this.WriteLineCode(this.LineFeed + "source $GREENTEA_HOME/include/bash/GreenTeaPlus.sh" + this.LineFeed);
		//this.WriteLineCode(this.LineFeed + "source ./GreenTeaPlus.sh" + this.LineFeed);
	}

	private IsEmptyNode(Node: GtNode): boolean {
		return (Node == null || Node instanceof EmptyNode);
	}

	public VisitBlockWithIndent(Node: GtNode, inBlock: boolean, allowDummyBlock: boolean): string {
		var Code: string = "";
		if(inBlock) {
			this.Indent();
		}
		var CurrentNode: GtNode = Node;
		if(this.IsEmptyNode(Node) && allowDummyBlock) {
			Code += this.GetIndentString() + "echo \"dummy block!!\" &> /dev/zero" + this.LineFeed;
		}
		while(!this.IsEmptyNode(CurrentNode)) {
			var poppedCode: string = this.VisitNode(CurrentNode);
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
		if(!Node.Type.equals(Node.Type.Context.BooleanType)) {
			LibGreenTea.DebugP("invalid condition type");
			return null;
		}
		
		if(Node instanceof ConstNode) {
			var Const: ConstNode = <ConstNode> Node;
			if(Const.ConstValue.equals(true)) {
				return "true";
			}
			return "false";
		}
		return this.VisitNode(Node);
	}

	public VisitWhileNode(Node: WhileNode): void {
		var Program: string = "while " + this.ResolveCondition(Node.CondExpr) + " ;do" + this.LineFeed;
		Program += this.VisitBlockWithIndent(Node.LoopBody, true, true) + "done";
		this.PushSourceCode(Program);
	}

	public VisitForNode(Node: ForNode): void {
		var Cond: string = this.ResolveCondition(Node.CondExpr);
		var Iter: string = this.VisitNode(Node.IterExpr);
		var Program: string = "for((; " + Cond  + "; " + Iter + " )) ;do" + this.LineFeed;
		Program += this.VisitBlockWithIndent(Node.LoopBody, true, true) + "done";
		this.PushSourceCode(Program);
	}

	public VisitForEachNode(Node: ForEachNode): void {
		var Variable: string = this.VisitNode(Node.Variable);
		var Iter: string = this.VisitNode(Node.IterExpr);
		var Program: string = "for " + Variable + " in " + "${" + Iter + "[@]} ;do" + this.LineFeed;
		Program += this.VisitBlockWithIndent(Node.LoopBody, true, true) + "done";
		this.PushSourceCode(Program);
	}

	private MakeParamCode(ParamList: Array<GtNode>): string[] {
		var Size: number = ListSize(ParamList);
		var ParamCode: string[] = new Array<string>(Size - 1);
		var i: number = 1;
		while(i < Size) {
			var Node: GtNode = ParamList.get(i);
			ParamCode[i - 1] = this.ResolveValueType(Node);
			i = i + 1;
		}
		return ParamCode;
	}

	private CreateAssertFunc(Node: ApplyNode): string {
		var ParamList: Array<GtNode> = Node.Params;
		var Size: number = ListSize(ParamList);
		var ParamCode: string[] = new Array<string>(Size - 1);
		var i: number = 1;
		while(i < Size) {
			var Param: string = this.VisitNode(ParamList.get(i));
			if(ParamList.get(i) instanceof ConstNode) {
				var Const: ConstNode = <ConstNode>ParamList.get(i);
				if(Const.Type.equals(Const.Type.Context.BooleanType)) {
					if(Const.ConstValue.equals(true)) {
						Param = "true";
					}
					else {
						Param = "false";
					}
				}
			}
			ParamCode[i - 1] = "\"" + Param + "\"";
			i = i + 1;
		}
		return this.JoinCode("assert ", 0, ParamCode, "", " ");
	}

	public VisitApplyNode(Node: ApplyNode): void {
		var ParamCode: string[] = this.MakeParamCode(Node.Params);
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

	public VisitBinaryNode(Node: BinaryNode): void {
		var FuncName: string = Node.Token.ParsedText;
		var Left: string = this.ResolveValueType(Node.LeftNode);
		var Right: string = this.ResolveValueType(Node.RightNode);
		this.PushSourceCode(SourceGenerator.GenerateApplyFunc2(Node.Func, FuncName, Left, Right));
		
//		if(Node.Type.equals(Node.Type.Context.Float)) {	// support float value
//			this.PushSourceCode("(echo \"scale=10; " + Left + " " + FuncName + " " + Right + "\" | bc)");
//			return;
//		}
	}

	public VisitAndNode(Node: AndNode): void {
		this.PushSourceCode("(" + this.ResolveCondition(Node.LeftNode) + " && " + this.ResolveCondition(Node.RightNode) + ")");
	}

	public VisitOrNode(Node: OrNode): void {
		this.PushSourceCode("(" + this.ResolveCondition(Node.LeftNode) + " || " + this.ResolveCondition(Node.RightNode) + ")");
	}

	public VisitAssignNode(Node: AssignNode): void {
		var Left: string = this.VisitNode(Node.LeftNode);
		var Right: string = this.ResolveValueType(Node.RightNode);
		var Head: string = "";
		if(Node.LeftNode instanceof GetterNode) {
			Head = "eval ";
		}
		this.PushSourceCode(Head + Left + "=" + Right);
	}

	public VisitLetNode(Node: LetNode): void {
		var VarName: string = Node.VariableName;
		var Code: string = "";
		var Head: string = "";
		if(this.inFunc) {
			Code += "local " + VarName + this.LineFeed + this.GetIndentString();
		}
		
		if(Node.InitNode != null && Node.InitNode instanceof GetterNode) {
			Head = "eval ";
		}
		Code += Head + VarName;
		if(Node.InitNode != null) {
			Code += "=" + this.ResolveValueType(Node.InitNode);
		} 
		Code +=  this.LineFeed;
		this.PushSourceCode(Code + this.VisitBlockWithIndent(Node.BlockNode, false, false));
	}

	public VisitIfNode(Node: IfNode): void {
		var CondExpr: string = this.ResolveCondition(Node.CondExpr);
		var ThenBlock: string = this.VisitBlockWithIndent(Node.ThenNode, true, true);
		var ElseBlock: string = this.VisitBlockWithIndent(Node.ElseNode, true, false);
		var Code: string = "if " + CondExpr + " ;then" + this.LineFeed + ThenBlock;
		if(!this.IsEmptyNode(Node.ElseNode)) {
			Code += "else" + this.LineFeed + ElseBlock;
		}
		Code += "fi";
		this.PushSourceCode(Code);
	}

	public VisitReturnNode(Node: ReturnNode): void {
		if(!this.inFunc) {
			return;
		}
		
		if(Node.Expr != null) {
			var Ret: string = this.ResolveValueType(Node.Expr);
			if(Node.Type.equals(Node.Type.Context.BooleanType) || 
					(Node.Type.equals(Node.Type.Context.IntType) && this.inMainFunc)) {
				this.PushSourceCode("return " + Ret + this.LineFeed);
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
		Code += "\"" + Catch + "\" ERR" + this.LineFeed;
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
//		/*local*/String Code = "throw Error(\"" + Node.Token.ParsedText + "\")";
//		this.PushSourceCode(Code);
	}

	public VisitCommandNode(Node: CommandNode): void {
		var Code: string = "";
		var count: number = 0;
		var CurrentNode: CommandNode = Node;
		while(CurrentNode != null) {
			if(count > 0) {
				Code += " | ";
			}
			Code += this.AppendCommand(CurrentNode);
			count += 1;
			CurrentNode = <CommandNode> CurrentNode.PipedNextNode;
		}
		this.PushSourceCode(this.CreateCommandFunc(Code, Node.Type));
	}

	private AppendCommand(CurrentNode: CommandNode): string {
		var Code: string = "";
		var size: number = CurrentNode.Params.size();
		var i: number = 0;
		while(i < size) {
			Code += this.ResolveValueType(CurrentNode.Params.get(i)) + " ";
			i = i + 1;
		}
		return Code;
	}

	private CreateCommandFunc(cmd: string, Type: GtType): string {
		var FuncName: string = "execCmd";
		var RunnableCmd: string = cmd;
		if(Type.equals(Type.Context.StringType)) {
			RunnableCmd = FuncName + this.cmdCounter + "() {" + this.LineFeed;
			RunnableCmd += this.GetIndentString() + "echo $(" + cmd + ")" + this.LineFeed;
			RunnableCmd += this.GetIndentString() + "return 0" + this.LineFeed + "}" + this.LineFeed;
			this.WriteLineCode(RunnableCmd);
			RunnableCmd = FuncName + this.cmdCounter;
			this.cmdCounter++;
		}
		else if(Type.equals(Type.Context.BooleanType)) {
			RunnableCmd = FuncName + this.cmdCounter + "() {" + this.LineFeed;
			RunnableCmd += this.GetIndentString() + cmd + " >&2" + this.LineFeed;
			RunnableCmd += this.GetIndentString() + "return $?" + this.LineFeed + "}" + this.LineFeed;
			this.WriteLineCode(RunnableCmd);
			RunnableCmd = FuncName + this.cmdCounter;
			this.cmdCounter++;
		}
		return RunnableCmd;
	}

	private ResolveParamName(ParamNameList: Array<string>, Body: GtNode): GtNode {
		return this.ConvertParamName(ParamNameList, Body, 0);
	}

	private ConvertParamName(ParamNameList: Array<string>, Body: GtNode, index: number): GtNode {
		if(ParamNameList == null || index == ParamNameList.size()) {
			return Body;
		}

		var oldVarNode: GtNode = new LocalNode(null, null, "" + (index + 1));
		var Let: GtNode = new LetNode(null, null, null, ParamNameList.get(index), oldVarNode, null);
		Let.NextNode = this.ConvertParamName(ParamNameList, Body, index + 1);
		return Let;
	}

	private ResolveValueType(TargetNode: GtNode): string {
		var ResolvedValue: string;
		var Value: string = this.VisitNode(TargetNode);
		var Head: string = "";
		var Tail: string = "";
		
		if(TargetNode.Type != null && TargetNode.Type.equals(TargetNode.Type.Context.BooleanType)) {
			if(TargetNode instanceof ApplyNode || TargetNode instanceof UnaryNode || 
					TargetNode instanceof CommandNode || TargetNode instanceof BinaryNode) {
				return "$(retBool \"" + Value + "\")";
			}
		}
		
		if(TargetNode instanceof ConstNode || TargetNode instanceof NullNode) {
			return Value;
		}
		else if(TargetNode instanceof IndexerNode || TargetNode instanceof GetterNode) {
			ResolvedValue = "${" + Value + "}";
		}
		else if(TargetNode instanceof ApplyNode || TargetNode instanceof CommandNode) {
			ResolvedValue = "$(" + Value + ")";
		}
		else {
			ResolvedValue = "$" + Value;
		}
		if(TargetNode.Type != null) {
			if(TargetNode.Type.equals(TargetNode.Type.Context.StringType)) {
				Head = "\"";
				Tail = "\"";
			}
		}
		return Head + ResolvedValue + Tail;
	}

	public GenerateFunc(Func: GtFunc, ParamNameList: Array<string>, Body: GtNode): void {
		var Function: string = "";
		var FuncName: string = Func.GetNativeFuncName();
		this.inFunc = true;
		if(LibGreenTea.EqualsString(FuncName, "main")) {
			this.inMainFunc = true;
		}
		Function += FuncName + "() {" + this.LineFeed;
		var Block: string = this.VisitBlockWithIndent(this.ResolveParamName(ParamNameList, Body), true, true);
		Function += Block + "}" + this.LineFeed;
		this.WriteLineCode(Function);
		this.inFunc = false;
		this.inMainFunc = false;
	}

	public Eval(Node: GtNode): Object {
		var Code: string = this.VisitBlockWithIndent(Node, false, false);
		if(!LibGreenTea.EqualsString(Code, "")) {
			this.WriteLineCode(Code);
		}
		return Code;
	}

	public InvokeMainFunc(MainFuncName: string): void {
		this.WriteLineCode(MainFuncName);
	}
}