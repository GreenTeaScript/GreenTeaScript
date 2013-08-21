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

//ifdef JAVA
import java.util.ArrayList;
//endif VAJA

public class JavaScriptSourceGenerator extends SourceGenerator {

	JavaScriptSourceGenerator/*constructor*/(String TargetCode, String OutputFile, int GeneratorFlag) {
		super(TargetCode, OutputFile, GeneratorFlag);
	}

	private boolean UseLetKeyword;

	@Override public void GenerateFunc(GtFunc Func, ArrayList<String> NameList, GtNode Body) {
		/*local*/int ArgCount = Func.Types.length - 1;
		/*local*/String Code = "var " + Func.GetNativeFuncName() + " = (function(";
		/*local*/int i = 0;
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
		this.PushSourceCode(Code);
		this.WriteLineCode(Code);
	}

	public  void VisitBlockJS(GtNode Node) {
		/*local*/String Code = "";
		Code += "{" + this.LineFeed;
		this.Indent();
		/*local*/GtNode CurrentNode = Node;
		while(CurrentNode != null) {
			Code += this.GetIndentString() + this.VisitNode(CurrentNode) + ";" + this.LineFeed;
			CurrentNode = CurrentNode.NextNode;
		}
		this.UnIndent();
		Code += this.GetIndentString() + "}";
		this.PushSourceCode(Code);
	}

	@Override public void VisitBinaryNode(BinaryNode Node) {
		/*local*/String FuncName = Node.Token.ParsedText;
		/*local*/String Left = this.VisitNode(Node.LeftNode);
		/*local*/String Right = this.VisitNode(Node.RightNode);
		/*local*/String Source = "(" + SourceGenerator.GenerateApplyFunc2(Node.Func, FuncName, Left, Right) + ")";
		/*local*/String operator = Node.Token.ParsedText;
		if(LibGreenTea.EqualsString(operator, "/") /*&& Node.Type == Context.IntType*/ ) {
			Source = "(" + Source + " | 0)";
		}
		this.PushSourceCode(Source);
	}

	@Override public void VisitLetNode(LetNode Node) {
		/*local*/String VarName = Node.VariableName;
		/*local*/String Source = (this.UseLetKeyword ? "let " : "var ") + " " + VarName;
		if(Node.InitNode != null) {
			Node.InitNode.Evaluate(this);
			Source += " = " + this.PopSourceCode();
		}
		Source +=  ";";
		this.VisitBlockJS(Node.BlockNode);
		this.PushSourceCode(Source + this.PopSourceCode());
	}

	@Override public void VisitIfNode(IfNode Node) {
		Node.CondExpr.Evaluate(this);
		this.VisitBlockJS(Node.ThenNode);
		/*local*/String ThenBlock = this.PopSourceCode();
		/*local*/String CondExpr = this.PopSourceCode();
		/*local*/String Source = "if(" + CondExpr + ") " + ThenBlock;
		if(Node.ElseNode != null) {
			this.VisitBlockJS(Node.ElseNode);
			Source = Source + " else " + this.PopSourceCode();
		}
		this.PushSourceCode(Source);
	}

	@Override public void VisitWhileNode(WhileNode Node) {
		this.VisitBlockJS(Node.LoopBody);
		/*local*/String LoopBody = this.PopSourceCode();
		/*local*/String CondExpr = this.VisitNode(Node.CondExpr);
		this.PushSourceCode("while(" + CondExpr + ") {" + LoopBody + "}");
	}

	@Override public void VisitForNode(ForNode Node) {
		this.VisitBlockJS(Node.LoopBody);
		/*local*/String LoopBody = this.PopSourceCode();
		/*local*/String IterExpr = this.VisitNode(Node.IterExpr);
		/*local*/String CondExpr = this.VisitNode(Node.CondExpr);
		this.PushSourceCode("for(;" + CondExpr + "; " + IterExpr + ") {" + LoopBody + "}");
	}

	@Override public void VisitDoWhileNode(DoWhileNode Node) {
		this.VisitBlockJS(Node.LoopBody);
		/*local*/String LoopBody = this.PopSourceCode();
		/*local*/String CondExpr = this.VisitNode(Node.CondExpr);
		this.PushSourceCode("do {" + LoopBody + "}while(" + CondExpr + ");");
	}

	@Override public void VisitTryNode(TryNode Node) {
		/*local*/String Code = "try ";
		this.VisitBlockJS(Node.TryBlock);
		Code += this.PopSourceCode();
		/*local*/LetNode Val = (/*cast*/LetNode) Node.CatchExpr;
		Code += " catch (" + Val.Type.toString() + " " + Val.VariableName + ") ";
		this.VisitBlockJS(Node.CatchBlock);
		Code += this.PopSourceCode();
		if(Node.FinallyBlock != null) {
			this.VisitBlockJS(Node.FinallyBlock);
			Code += " finally " + this.PopSourceCode();
		}
		this.PushSourceCode(Code);
	}

	@Override public void VisitThrowNode(ThrowNode Node) {
		Node.Expr.Evaluate(this);
		/*local*/String Expr = this.PopSourceCode();
		this.PushSourceCode("throw " + Expr);
		return;
	}

	@Override public void VisitErrorNode(ErrorNode Node) {
		/*local*/String Expr = Node.Token.ParsedText;
		this.PushSourceCode("(function() {throw new Error(\"" + Expr + "\") })()");
	}

	// This must be extended in each language
	@Override public Object Eval(GtNode Node) {
		this.VisitBlock(Node);
		/*local*/String ret = "";
		while(this.GeneratedCodeStack.size() > 0) {
			/*local*/String Line = this.PopSourceCode();
			if(Line.length() > 0) {
				ret =  Line + ";\n" + ret;
			}
		}
		//this.WriteLineCode(ret);
		return ret;
	}

}