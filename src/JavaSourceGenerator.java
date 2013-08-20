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

//ifdef  JAVA
import java.util.ArrayList;
//endif VAJA

//GreenTea Generator should be written in each language.

public class JavaSourceGenerator extends SourceGenerator {
	JavaSourceGenerator/*constructor*/(String TargetCode, String OutputFile, int GeneratorFlag) {
		super(TargetCode, OutputFile, GeneratorFlag);
	}

	public void VisitBlockEachStatementWithIndent(GtNode Node) {
		/*local*/String Code = "{" + this.LineFeed;
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

	@Override public void VisitWhileNode(WhileNode Node) {
		/*local*/String Program = "while(" + this.VisitNode(Node.CondExpr) + ")";
		this.VisitBlockEachStatementWithIndent(Node.LoopBody);
		Program += this.PopSourceCode();
		this.PushSourceCode(Program);
	}

	@Override public void VisitDoWhileNode(DoWhileNode Node) {
		/*local*/String Program = "do";
		this.VisitBlockEachStatementWithIndent(Node.LoopBody);
		Program += " while(" + this.VisitNode(Node.CondExpr) + ")";
		this.PushSourceCode(Program);
	}

	@Override public void VisitForNode(ForNode Node) {
		/*local*/String Cond = this.VisitNode(Node.CondExpr);
		/*local*/String Iter = this.VisitNode(Node.IterExpr);
		/*local*/String Program = "for(; " + Cond  + "; " + Iter + ")";
		Program += this.VisitNode(Node.LoopBody);
		this.PushSourceCode(Program);
	}

	@Override public void VisitLetNode(LetNode Node) {
		/*local*/String Type = Node.DeclType.ShortClassName;
		/*local*/String VarName = Node.VariableName;
		/*local*/String Code = Type + " " + VarName;
		if(Node.InitNode != null) {
			Code += " = " + this.VisitNode(Node.InitNode);
		}
		Code +=  ";" + this.LineFeed;
		this.VisitBlockEachStatementWithIndent(Node.BlockNode);
		this.PushSourceCode(Code + this.PopSourceCode());
	}

	@Override public void VisitIfNode(IfNode Node) {
		/*local*/String CondExpr = this.VisitNode(Node.CondExpr);
		this.VisitBlockEachStatementWithIndent(Node.ThenNode);
		/*local*/String ThenBlock = this.PopSourceCode();
		/*local*/String Code = "if(" + CondExpr + ") " + ThenBlock;
		if(Node.ElseNode != null) {
			this.VisitBlockEachStatementWithIndent(Node.ElseNode);
			Code += " else " + this.PopSourceCode();
		}
		this.PushSourceCode(Code);
	}

	@Override public void VisitTryNode(TryNode Node) {
		/*local*/String Code = "try";
		//this.VisitEach(Node.CatchBlock);
		this.VisitBlockEachStatementWithIndent(Node.TryBlock);
		Code += this.PopSourceCode();
		if(Node.FinallyBlock != null) {
			this.VisitBlockEachStatementWithIndent(Node.FinallyBlock);
			Code += " finally " + this.PopSourceCode();
		}
		this.PushSourceCode(Code);
	}

	@Override public void VisitThrowNode(ThrowNode Node) {
		/*local*/String Code = "throw " + this.VisitNode(Node.Expr);
		this.PushSourceCode(Code);
	}

	@Override public void VisitErrorNode(ErrorNode Node) {
		/*local*/String Code = "throw RuntimeError(\"" + Node.Token.ParsedText + "\")";
		this.PushSourceCode(Code);
	}

	@Override public void GenerateFunc(GtFunc Func, ArrayList<String> ParamNameList, GtNode Body) {
		//FIXME
		/*local*/String Program = "";
		/*local*/String RetTy = Func.GetReturnType().ShortClassName;
		/*local*/String ThisTy = Func.GetRecvType().ShortClassName;
		Program += RetTy + " " + ThisTy + "_" + Func.GetNativeFuncName() + "(";
		Program += ThisTy + " " + "this";
		for(/*local*/int i = 0; i < ParamNameList.size(); i++) {
			/*local*/String ParamTy = Func.GetFuncParamType(i).ShortClassName;
			Program += " ," + ParamTy + " " + ParamNameList.get(i);
		}

		Program += this.Eval(Body);
		this.WriteLineCode(Program);
	}

	@Override public Object Eval(GtNode Node) {
		//FIXME
		this.VisitBlockEachStatementWithIndent(Node);
		return this.PopSourceCode();
	}

}
