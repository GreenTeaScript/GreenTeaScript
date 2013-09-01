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

class PythonSourceGenerator extends SourceGenerator {

	 constructor(TargetCode: string, OutputFile: string, GeneratorFlag: number) {
		super(TargetCode, OutputFile, GeneratorFlag);
		this.Tab = "    ";
		this.LogicalAndOperator = "and";
		this.LogicalOrOperator  = "or";
		this.TrueLiteral  = "True";
		this.FalseLiteral = "False";
		this.NullLiteral = "None";
		this.LineComment = "##";
	}

	GetNewOperator(Type: GtType): string {
		var TypeName: string = Type.ShortClassName;
		return TypeName + "()";
	}

	public VisitBlockWithIndent(Node: GtNode, inBlock: boolean): string {
		var Code: string = "";
		if(inBlock) {
			this.Indent();
		}
		var CurrentNode: GtNode = Node;
		while(CurrentNode != null) {
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

	// Visitor API
	public VisitWhileNode(Node: WhileNode): void {
		var Program: string = "while " + this.VisitNode(Node.CondExpr) + ":" + this.LineFeed;
		if(this.IsEmptyBlock(Node.LoopBody)) {
			Program += this.GetIndentString() + "pass";
		}
		else {
			Program += this.VisitBlockWithIndent(Node.LoopBody, true);
		}
		this.PushSourceCode(Program);
	}

	public VisitForNode(Node: ForNode): void {
		Node.LoopBody.MoveTailNode().NextNode = Node.IterExpr;
		var NewLoopBody: GtNode = Node.LoopBody;
		var NewNode: WhileNode = new WhileNode(Node.Type, Node.Token, Node.CondExpr, NewLoopBody);
		this.VisitWhileNode(NewNode);
	}

	public VisitForEachNode(Node: ForEachNode): void {
		var Iter: string = this.VisitNode(Node.IterExpr);
		var Variable: string = this.VisitNode(Node.Variable);
		var Program: string = "for " + Variable + " in " + Iter + ":" + this.LineFeed;
		Program += this.VisitBlockWithIndent(Node.LoopBody, true);
		this.PushSourceCode(Program);
	}

	public VisitSuffixNode(Node: SuffixNode): void {
		var FuncName: string = Node.Token.ParsedText;
		var Expr: string = this.VisitNode(Node.Expr);
		if(LibGreenTea.EqualsString(FuncName, "++")) {
			FuncName = " += 1";
		}
		else if(LibGreenTea.EqualsString(FuncName, "--")) {
			FuncName = " -= 1";
		}
		else {
			LibGreenTea.DebugP(FuncName + " is not supported suffix operator!!");
		}
		this.PushSourceCode("(" + SourceGenerator.GenerateApplyFunc1(null, FuncName, true, Expr) + ")");
	}

	public VisitVarNode(Node: VarNode): void {
		var Code: string = Node.NativeName;
		var InitValue: string = this.NullLiteral;
		if(Node.InitNode != null) {
			InitValue = this.VisitNode(Node.InitNode);
		}
		Code += " = " + InitValue + this.LineFeed;
		this.PushSourceCode(Code + this.VisitBlockWithIndent(Node.BlockNode, false));
	}

	public VisitTrinaryNode(Node: TrinaryNode): void {
		var CondExpr: string = this.VisitNode(Node.CondExpr);
		var Then: string = this.VisitNode(Node.ThenExpr);
		var Else: string = this.VisitNode(Node.ElseExpr);
		this.PushSourceCode(Then + " if " + CondExpr + " else " + Else);
	}

	public VisitIfNode(Node: IfNode): void {
		var CondExpr: string = this.VisitNode(Node.CondExpr);
		var ThenBlock: string = this.VisitBlockWithIndent(Node.ThenNode, true);
		var Code: string = "if " + CondExpr + ":" + this.LineFeed + ThenBlock;
		if(this.IsEmptyBlock(Node.ThenNode)) {
			Code += this.GetIndentString() + "pass" + this.LineFeed + this.GetIndentString();
		}

		if(!this.IsEmptyBlock(Node.ElseNode)) {
			var ElseBlock: string = this.VisitBlockWithIndent(Node.ElseNode, true);
			Code += "else:" + this.LineFeed + ElseBlock;
		}
		this.PushSourceCode(Code);
	}

	public VisitTryNode(Node: TryNode): void {
		var Code: string = "try:" + this.LineFeed;
		Code += this.VisitBlockWithIndent(Node.TryBlock, true);
		var Val: VarNode = <VarNode> Node.CatchExpr;
		Code += "except " + Val.Type.toString() + ", " + Val.NativeName + ":" + this.LineFeed;
		Code += this.VisitBlockWithIndent(Node.CatchBlock, true);
		if(Node.FinallyBlock != null) {
			var Finally: string = this.VisitBlockWithIndent(Node.FinallyBlock, true);
			Code += "finally:" + this.LineFeed + Finally;
		}
		this.PushSourceCode(Code);
	}

	public VisitThrowNode(Node: ThrowNode): void {
		var expr: string = "";
		if(Node.Expr != null) {
			expr = this.VisitNode(Node.Expr);
		}
		this.PushSourceCode("raise " + expr);
	}

	public VisitErrorNode(Node: ErrorNode): void {
		var Code: string = "raise SoftwareFault(\"" + Node.Token.ParsedText + "\")";
		this.PushSourceCode(Code);
	}

	public VisitCommandNode(Node: CommandNode): void {
		var Code: string = "";
		var CurrentNode: CommandNode = Node;
		while(CurrentNode != null) {
			Code += this.AppendCommand(CurrentNode);
			CurrentNode = <CommandNode> CurrentNode.PipedNextNode;
		}

		if(Node.Type.equals(Node.Type.Context.StringType)) {
			Code = "subprocess.check_output(\"" + Code + "\", shell=True)";
		}
		else if(Node.Type.equals(Node.Type.Context.BooleanType)) {
			Code = "(subprocess.call(\"" + Code + "\", shell=True) == 0)";
		}
		else {
			Code = "subprocess.call(\"" + Code + "\", shell=True)";
		}
		this.PushSourceCode(Code);
	}

	private AppendCommand(CurrentNode: CommandNode): string {
		var Code: string = "";
		var size: number = CurrentNode.Params.size();
		var i: number = 0;
		while(i < size) {
			Code += this.VisitNode(CurrentNode.Params.get(i)) + " ";
			i = i + 1;
		}
		return Code;
	}

	public GenerateFunc(Func: GtFunc, ParamNameList: Array<string>, Body: GtNode): void {
		this.FlushErrorReport();
		var Function: string = "def ";
		Function += Func.GetNativeFuncName() + "(";
		var i: number = 0;
		var size: number = ParamNameList.size();
		while(i < size) {
			if(i > 0) {
				Function += ", ";
			}
			Function += ParamNameList.get(i);
			i = i + 1;
		}
		var Block: string = this.VisitBlockWithIndent(Body, true);
		Function += "):" + this.LineFeed + Block + this.LineFeed;
		this.WriteLineCode(Function);
	}

	public GenerateClassField(Type: GtType, ClassField: GtClassField): void {
		this.FlushErrorReport();
		var Program: string = this.GetIndentString() + "class " + Type.ShortClassName;
//		if(Type.SuperType != null) {
//			Program += "(" + Type.SuperType.ShortClassName + ")";
//		}
		Program += ":" + this.LineFeed;
		this.Indent();

		Program += this.GetIndentString() + "def __init__(" + this.GetRecvName() + ")" + ":" + this.LineFeed;
		this.Indent();
		var i: number = 0;
		while(i < ClassField.FieldList.size()) {
			var FieldInfo: GtFieldInfo = ClassField.FieldList.get(i);
			var InitValue: string = this.StringifyConstValue(FieldInfo.InitValue);
			if(!FieldInfo.Type.IsNative()) {
				InitValue = "None";
			}
			Program += this.GetIndentString() + this.GetRecvName() + "." + FieldInfo.NativeName + " = " + InitValue + this.LineFeed;
			i = i + 1;
		}
		this.UnIndent();
		this.UnIndent();
		this.WriteLineCode(Program);
	}

	public Eval(Node: GtNode): Object {
		var Code: string = this.VisitBlockWithIndent(Node, false);
		if(!LibGreenTea.EqualsString(Code, "")) {
			this.WriteLineCode(Code);
		}
		return null;
	}

	public GetRecvName(): string {
		return "self";
	}

	public InvokeMainFunc(MainFuncName: string): void {
		this.WriteLineCode("if __name__ == '__main__':");
		this.WriteLineCode(this.Tab + MainFuncName + "()");
	}

}