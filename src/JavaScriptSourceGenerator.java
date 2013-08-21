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

	/*field*/private boolean UseLetKeyword;
	
	public  String VisitBlockJS(GtNode Node) {
		/*local*/String Code = "";
		/*local*/GtNode CurrentNode = Node;
		while(CurrentNode != null) {
			/*local*/String Statement = this.VisitNode(CurrentNode);
			if(Statement.trim().length() >0){
				Code += this.GetIndentString() + Statement + ";" + this.LineFeed;
			}
			CurrentNode = CurrentNode.NextNode;
		}
		return Code;
	}
	
	public  String VisitBlockJSWithIndent(GtNode Node) {
		/*local*/String Code = "";
		Code += "{" + this.LineFeed;
		this.Indent();
		Code += this.VisitBlockJS(Node);
		this.UnIndent();
		Code += this.GetIndentString() + "}";
		return Code;
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
		this.VisitBlockJSWithIndent(Node.BlockNode);
		this.PushSourceCode(Source + this.PopSourceCode());
	}

	@Override public void VisitIfNode(IfNode Node) {
		/*local*/String ThenBlock = this.VisitBlockJSWithIndent(Node.ThenNode);
		/*local*/String CondExpr = this.VisitNode(Node.CondExpr);
		/*local*/String Source = "if(" + CondExpr + ") " + ThenBlock;
		if(Node.ElseNode != null) {
			Source = Source + " else " + this.VisitBlockJSWithIndent(Node.ElseNode);
		}
		this.PushSourceCode(Source);
	}

	@Override public void VisitWhileNode(WhileNode Node) {
		/*local*/String LoopBody = this.VisitBlockJSWithIndent(Node.LoopBody);
		/*local*/String CondExpr = this.VisitNode(Node.CondExpr);
		this.PushSourceCode("while(" + CondExpr + ") {" + LoopBody + "}");
	}

	@Override public void VisitForNode(ForNode Node) {
		/*local*/String LoopBody = this.VisitBlockJSWithIndent(Node.LoopBody);
		/*local*/String IterExpr = this.VisitNode(Node.IterExpr);
		/*local*/String CondExpr = this.VisitNode(Node.CondExpr);
		this.PushSourceCode("for(;" + CondExpr + "; " + IterExpr + ") {" + LoopBody + "}");
	}

	@Override public void VisitDoWhileNode(DoWhileNode Node) {
		/*local*/String LoopBody = this.VisitBlockJSWithIndent(Node.LoopBody);
		/*local*/String CondExpr = this.VisitNode(Node.CondExpr);
		this.PushSourceCode("do {" + LoopBody + "}while(" + CondExpr + ");");
	}

	@Override public void VisitTryNode(TryNode Node) {
		/*local*/String Code = "try ";
		Code += this.VisitBlockJSWithIndent(Node.TryBlock);
		/*local*/LetNode Val = (/*cast*/LetNode) Node.CatchExpr;
		Code += " catch (" + Val.Type.toString() + " " + Val.VariableName + ") ";
		Code += this.VisitBlockJSWithIndent(Node.CatchBlock);
		if(Node.FinallyBlock != null) {
			Code += " finally " + this.VisitBlockJSWithIndent(Node.FinallyBlock);
		}
		this.PushSourceCode(Code);
	}

	@Override public void VisitThrowNode(ThrowNode Node) {
		/*local*/String Expr = this.VisitNode(Node.Expr);
		this.PushSourceCode("throw " + Expr);
	}

	@Override public void VisitErrorNode(ErrorNode Node) {
		/*local*/String Expr = Node.Token.ParsedText;
		this.PushSourceCode("(function() {throw new Error(\"" + Expr + "\") })()");
	}

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
		Code = Code + ") " + this.VisitBlockJSWithIndent(Body) + ");";
		this.WriteLineCode(Code);
	}

	@Override public Object Eval(GtNode Node) {
		/*local*/String ret = this.VisitBlockJS(Node);
		this.WriteLineCode(ret);
		return ret;
	}

	@Override public void InvokeMainFunc(String MainFuncName) {
		this.WriteLineCode(MainFuncName + "();");
	}
}