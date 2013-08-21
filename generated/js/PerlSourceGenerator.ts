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

class PerlSourceGenerator extends SourceGenerator {
	 constructor(TargetCode: string, OutputFile: string, GeneratorFlag: number) {
		super("perl", OutputFile, GeneratorFlag);
		this.TrueLiteral  = "1";
		this.FalseLiteral = "0";
		this.NullLiteral = "NULL";
		this.MemberAccessOperator = "->";
	}

	public VisitBlockEachStatementWithIndent(Node: GtNode): void {
		var Code: string = "{" + this.LineFeed;
		this.Indent();
		var CurrentNode: GtNode = Node;
		while(CurrentNode != null) {
			CurrentNode.Evaluate(this);
			Code += this.GetIndentString() + this.PopSourceCode() + ";" + this.LineFeed;
			CurrentNode = CurrentNode.NextNode;
		}
		this.UnIndent();
		Code += this.GetIndentString() + "}";
		this.PushSourceCode(Code);
	}

	public VisitWhileNode(Node: WhileNode): void {
		Node.CondExpr.Evaluate(this);
		var Program: string = "while(" + this.PopSourceCode() + ")";
		this.VisitBlockEachStatementWithIndent(Node.LoopBody);
		Program += this.PopSourceCode();
		this.PushSourceCode(Program);
	}

	public VisitDoWhileNode(Node: DoWhileNode): void {
		var Program: string = "do";
		this.VisitBlockEachStatementWithIndent(Node.LoopBody);
		Node.CondExpr.Evaluate(this);
		Program += " while(" + this.PopSourceCode() + ")";
		this.PushSourceCode(Program);
	}

	public VisitForNode(Node: ForNode): void {
		Node.IterExpr.Evaluate(this);
		Node.CondExpr.Evaluate(this);
		var Cond: string = this.PopSourceCode();
		var Iter: string = this.PopSourceCode();

		var Program: string = "for(; " + Cond  + "; " + Iter + ")";
		Node.LoopBody.Evaluate(this);
		Program += this.PopSourceCode();
		this.PushSourceCode(Program);
	}

	public VisitLocalNode(Node: LocalNode): void {
		this.PushSourceCode("$" + Node.NativeName);
	}

	public VisitLetNode(Node: LetNode): void {
		var VarName: string = Node.VariableName;
		var Code: string = "my $" + VarName;
		if(Node.InitNode != null) {
			Code += " = " + this.VisitNode(Node.InitNode);
		}
		Code +=  ";" + this.LineFeed;
		Code += this.GetIndentString();
		this.VisitBlockEachStatementWithIndent(Node.BlockNode);
		this.PushSourceCode(Code + this.PopSourceCode());

	}

	public VisitIfNode(Node: IfNode): void {
		var CondExpr: string = this.VisitNode(Node.CondExpr);
		this.VisitBlockEachStatementWithIndent(Node.ThenNode);
		var ThenBlock: string = this.PopSourceCode();
		var Code: string = "if(" + CondExpr + ") " + ThenBlock;
		if(Node.ElseNode != null) {
			this.VisitBlockEachStatementWithIndent(Node.ElseNode);
			Code += " else " + this.PopSourceCode();
		}
		this.PushSourceCode(Code);
	}

	public VisitTryNode(Node: TryNode): void {
		var Code: string = "try";
		//this.VisitEach(Node.CatchBlock);
		this.VisitBlockEachStatementWithIndent(Node.TryBlock);

		Code += this.PopSourceCode();
		if(Node.FinallyBlock != null) {
			this.VisitBlockEachStatementWithIndent(Node.FinallyBlock);
			Code += " finally " + this.PopSourceCode();
		}
		this.PushSourceCode(Code);
	}

	public VisitThrowNode(Node: ThrowNode): void {
		Node.Expr.Evaluate(this);
		var Code: string = "throw " + this.PopSourceCode();
		this.PushSourceCode(Code);
	}

	public VisitErrorNode(Node: ErrorNode): void {
		var Code: string = "throw Error(\"" + Node.Token.ParsedText + "\")";
		this.PushSourceCode(Code);
	}

	public VisitCommandNode(Node: CommandNode): void {
		var Code: string = "system(\"";
		var i: number = 0;
		while(i < Node.Params.size()) {
			var Param: GtNode = Node.Params.get(i);
			if(i != 0) {
				Code += " ";
			}
			Param.Evaluate(this);
			Code += this.PopSourceCode();
			i = i + 1;
		}
		Code += "\")";
		this.PushSourceCode(Code);
	}

	public GenerateFunc(Func: GtFunc, ParamNameList: Array<string>, Body: GtNode): void {
		var Program: string = "";
		var RetTy: string = Func.GetReturnType().ShortClassName;
		var FuncName: string = Func.GetNativeFuncName();
		var Signature: string = "# ";
		var Arguments: string = "";
		Signature += RetTy + " " + FuncName + "(";
		this.Indent();
		var i: number = 0;
		while(i < ParamNameList.size()) {
			var ParamTy: string = Func.GetFuncParamType(i).ShortClassName;
			Signature += " ," + ParamTy + " " + ParamNameList.get(i);
			Arguments += this.GetIndentString() + "my $" + ParamNameList.get(i) + " = $_[" + i + "];" + this.LineFeed;
			i = i + 1;
		}
		this.UnIndent();
		Program += Signature + ");" + this.LineFeed + this.GetIndentString() + "sub " + FuncName + "{" + this.LineFeed;
		this.Indent();
		Program += Arguments + this.GetIndentString();
		this.VisitBlockEachStatementWithIndent(Body);
		Program += this.PopSourceCode();
		this.UnIndent();
		Program += this.LineFeed + this.GetIndentString() + "}";
		this.WriteLineCode(Program);
	}

	public Eval(SingleNode: GtNode): Object {
		SingleNode.Evaluate(this);
		return this.PopSourceCode();
	}

	public StartCompilationUnit(): void {
		this.WriteLineCode("use strict;");
		this.WriteLineCode("use warnings;");
	}

	public InvokeMainFunc(MainFuncName: string): void {
		this.WriteLineCode(MainFuncName);
	}
}