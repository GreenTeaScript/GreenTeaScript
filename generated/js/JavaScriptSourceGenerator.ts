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
// #STR0# AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED
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



class JavaScriptSourceGenerator extends SourceGenerator {

	 constructor(TargetCode: string, OutputFile: string, GeneratorFlag: number) {
		super(TargetCode, OutputFile, GeneratorFlag);
	}

	private UseLetKeyword: boolean;

	public  VisitBlockJS(Node: GtNode): void {
		var Code: string = "";
		Code += "{" + this.LineFeed;
		this.Indent();
		var CurrentNode: GtNode = Node;
		while(CurrentNode != null) {
			Code += this.GetIndentString() + this.VisitNode(CurrentNode) + ";" + this.LineFeed;
			CurrentNode = CurrentNode.NextNode;
		}
		this.UnIndent();
		Code += this.GetIndentString() + "}";
		this.PushSourceCode(Code);
	}

	public VisitBinaryNode(Node: BinaryNode): void {
		var FuncName: string = Node.Token.ParsedText;
		var Left: string = this.VisitNode(Node.LeftNode);
		var Right: string = this.VisitNode(Node.RightNode);
		var Source: string = "(" + SourceGenerator.GenerateApplyFunc2(Node.Func, FuncName, Left, Right) + ")";
		var operator: string = Node.Token.ParsedText;
		if(LibGreenTea.EqualsString(operator, "/") /*&& Node.Type == Context.IntType*/ ) {
			Source = "(" + Source + " | 0)";
		}
		this.PushSourceCode(Source);
	}

	public VisitLetNode(Node: LetNode): void {
		var VarName: string = Node.VariableName;
		var Source: string = (this.UseLetKeyword ? "let " : "var ") + " " + VarName;
		if(Node.InitNode != null) {
			Node.InitNode.Evaluate(this);
			Source += " = " + this.PopSourceCode();
		}
		Source +=  ";";
		this.VisitBlockJS(Node.BlockNode);
		this.PushSourceCode(Source + this.PopSourceCode());
	}

	public VisitIfNode(Node: IfNode): void {
		Node.CondExpr.Evaluate(this);
		this.VisitBlockJS(Node.ThenNode);
		var ThenBlock: string = this.PopSourceCode();
		var CondExpr: string = this.PopSourceCode();
		var Source: string = "if(" + CondExpr + ") " + ThenBlock;
		if(Node.ElseNode != null) {
			this.VisitBlockJS(Node.ElseNode);
			Source = Source + " else " + this.PopSourceCode();
		}
		this.PushSourceCode(Source);
	}

	public VisitWhileNode(Node: WhileNode): void {
		this.VisitBlockJS(Node.LoopBody);
		var LoopBody: string = this.PopSourceCode();
		var CondExpr: string = this.VisitNode(Node.CondExpr);
		this.PushSourceCode("while(" + CondExpr + ") {" + LoopBody + "}");
	}

	public VisitForNode(Node: ForNode): void {
		this.VisitBlockJS(Node.LoopBody);
		var LoopBody: string = this.PopSourceCode();
		var IterExpr: string = this.VisitNode(Node.IterExpr);
		var CondExpr: string = this.VisitNode(Node.CondExpr);
		this.PushSourceCode("for(;" + CondExpr + "; " + IterExpr + ") {" + LoopBody + "}");
	}

	public VisitDoWhileNode(Node: DoWhileNode): void {
		this.VisitBlockJS(Node.LoopBody);
		var LoopBody: string = this.PopSourceCode();
		var CondExpr: string = this.VisitNode(Node.CondExpr);
		this.PushSourceCode("do {" + LoopBody + "}while(" + CondExpr + ");");
	}

	public VisitTryNode(Node: TryNode): void {
		var Code: string = "try ";
		this.VisitBlockJS(Node.TryBlock);
		Code += this.PopSourceCode();
		var Val: LetNode = <LetNode> Node.CatchExpr;
		Code += " catch (" + Val.Type.toString() + " " + Val.VariableName + ") ";
		this.VisitBlockJS(Node.CatchBlock);
		Code += this.PopSourceCode();
		if(Node.FinallyBlock != null) {
			this.VisitBlockJS(Node.FinallyBlock);
			Code += " finally " + this.PopSourceCode();
		}
		this.PushSourceCode(Code);
	}

	public VisitThrowNode(Node: ThrowNode): void {
		Node.Expr.Evaluate(this);
		var Expr: string = this.PopSourceCode();
		this.PushSourceCode("throw " + Expr);
		return;
	}

	public VisitErrorNode(Node: ErrorNode): void {
		var Expr: string = Node.Token.ParsedText;
		this.PushSourceCode("(function() {throw new Error(\"" + Expr + "\") })()");
	}

	// This must be extended in each language
	public GenerateFunc(Func: GtFunc, NameList: Array<string>, Body: GtNode): void {
		var ArgCount: number = Func.Types.length - 1;
		var Code: string = "var " + Func.GetNativeFuncName() + " = (function(";
		var i: number = 0;
		while(i < ArgCount) {
			if(i > 0) {
				Code = Code + ", ";
			}
			Code = Code + NameList.get(i);
			i = i + 1;
		}
		Code = Code + ") ";
		this.VisitBlockJS(Body);
		Code += this.PopSourceCode() + ")";
		//this.PushSourceCode(Code);
		this.WriteLineCode(Code);
	}

	public Eval(Node: GtNode): Object {
		this.VisitBlock(Node);
		var ret: string = "";
//		while(this.GeneratedCodeStack.size() > 0) {
//			/*local*/String Line = this.PopSourceCode();
//			if(Line.length() > 0) {
//				ret =  Line + #STR43# + ret;
//			}
//		}
		ret = this.PopSourceCode();
		this.WriteLineCode(ret);
		return ret;
	}

}