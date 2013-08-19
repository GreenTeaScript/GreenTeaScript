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
		String Code = "{\n";
		this.Indent();
		/*local*/GtNode CurrentNode = Node;
		while(CurrentNode != null) {
			CurrentNode.Evaluate(this);
			Code += this.GetIndentString() + this.PopSourceCode() + ";\n";
			CurrentNode = CurrentNode.NextNode;
		}
		this.UnIndent();
		Code += this.GetIndentString() + "}";
		this.PushSourceCode(Code);
	}

	@Override public void VisitEmptyNode(GtNode Node) {
	}

	@Override public void VisitSuffixNode(SuffixNode Node) {
		String FuncName = Node.Token.ParsedText;

		if(FuncName.equals("++")) {
		}
		else if(FuncName.equals("--")) {
		}
		Node.Expr.Evaluate(this);
		this.PushSourceCode(this.PopSourceCode() + FuncName);
	}

	@Override public void VisitUnaryNode(UnaryNode Node) {
		String FuncName = Node.Token.ParsedText;
		if(FuncName.equals("+")) {
		}
		else if(FuncName.equals("-")) {
		}
		else if(FuncName.equals("~")) {
		}
		else if(FuncName.equals("!")) {
		}
		else if(FuncName.equals("++")) {
		}
		else if(FuncName.equals("--")) {
		}
		Node.Expr.Evaluate(this);
		this.PushSourceCode(FuncName + this.PopSourceCode());
	}

	@Override public void VisitIndexerNode(IndexerNode Node) {
		Node.IndexAt.Evaluate(this);
		Node.Expr.Evaluate(this);
		this.PushSourceCode(this.PopSourceCode() + "[" + this.PopSourceCode() + "]");
	}

	@Override public void VisitMessageNode(MessageNode Node) {
		// TODO Auto-generated method stub

	}

	@Override public void VisitWhileNode(WhileNode Node) {
		Node.CondExpr.Evaluate(this);
		String Program = "while(" + this.PopSourceCode() + ")";
		this.VisitBlockEachStatementWithIndent(Node.LoopBody);
		Program += this.PopSourceCode();
		this.PushSourceCode(Program);
	}

	@Override public void VisitDoWhileNode(DoWhileNode Node) {
		String Program = "do";
		this.VisitBlockEachStatementWithIndent(Node.LoopBody);
		Node.CondExpr.Evaluate(this);
		Program += " while(" + this.PopSourceCode() + ")";
		this.PushSourceCode(Program);
	}

	@Override public void VisitForNode(ForNode Node) {
		Node.IterExpr.Evaluate(this);
		Node.CondExpr.Evaluate(this);
		String Cond = this.PopSourceCode();
		String Iter = this.PopSourceCode();

		String Program = "for(; " + Cond  + "; " + Iter + ")";
		Node.LoopBody.Evaluate(this);
		Program += this.PopSourceCode();
		this.PushSourceCode(Program);
	}

	@Override public void VisitForEachNode(ForEachNode Node) {
		// TODO Auto-generated method stub

	}

	@Override public void VisitConstNode(ConstNode Node) {
		this.PushSourceCode(Node.ConstValue.toString());
	}

	@Override public void VisitNewNode(NewNode Node) {
		String Type = Node.Type.ShortClassName;
		this.PushSourceCode("new " + Type);
	}

	@Override public void VisitNullNode(NullNode Node) {
		this.PushSourceCode("NULL");
	}

	@Override public void VisitLocalNode(LocalNode Node) {
		this.PushSourceCode(Node.NativeName);
	}

	@Override public void VisitGetterNode(GetterNode Node) {
		Node.Expr.Evaluate(this);
		this.PushSourceCode(this.PopSourceCode() + "." + Node.Func.FuncName);
	}

	private String[] EvaluateParam(ArrayList<GtNode> Params) {
		int Size = Params.size();
		String[] Programs = new String[Size];
		for(int i = 0; i < Size; i++) {
			GtNode Node = Params.get(i);
			Node.Evaluate(this);
			Programs[Size - i - 1] = this.PopSourceCode();
		}
		return Programs;
	}

	@Override public void VisitApplyNode(ApplyNode Node) {
		/*local*/String Program = Node.Func.FuncName + "(";
		/*local*/String[] Params = this.EvaluateParam(Node.Params);
		for(int i = 0; i < Params.length; i++) {
			String P = Params[i];
			if(i != 0) {
				Program += ",";
			}
			Program += P;
		}
		Program += ")";
		this.PushSourceCode(Program);
	}

	@Override public void VisitBinaryNode(BinaryNode Node) {
		String FuncName = Node.Token.ParsedText;
		if(FuncName.equals("+")) {
		}
		else if(FuncName.equals("-")) {
		}
		else if(FuncName.equals("*")) {
		}
		else if(FuncName.equals("/")) {
		}
		else if(FuncName.equals("%")) {
		}
		else if(FuncName.equals("<<")) {
		}
		else if(FuncName.equals(">>")) {
		}
		else if(FuncName.equals("&")) {
		}
		else if(FuncName.equals("|")) {
		}
		else if(FuncName.equals("^")) {
		}
		else if(FuncName.equals("<=")) {
		}
		else if(FuncName.equals("<")) {
		}
		else if(FuncName.equals(">=")) {
		}
		else if(FuncName.equals(">")) {
		}
		else if(FuncName.equals("!=")) {
		}
		else if(FuncName.equals("==")) {
		}
		Node.RightNode.Evaluate(this);
		Node.LeftNode.Evaluate(this);
		/* FIXME TOO MANY PARENTHESIS */
		this.PushSourceCode("(" + this.PopSourceCode() + " " + FuncName + " " + this.PopSourceCode() + ")");
	}

	@Override public void VisitAndNode(AndNode Node) {
		Node.RightNode.Evaluate(this);
		Node.LeftNode.Evaluate(this);
		this.PushSourceCode(this.PopSourceCode() + " && " + this.PopSourceCode());
	}

	@Override public void VisitOrNode(OrNode Node) {
		Node.RightNode.Evaluate(this);
		Node.LeftNode.Evaluate(this);
		this.PushSourceCode(this.PopSourceCode() + " || " + this.PopSourceCode());
	}

	@Override public void VisitAssignNode(AssignNode Node) {
		Node.RightNode.Evaluate(this);
		Node.LeftNode.Evaluate(this);
		this.PushSourceCode(this.PopSourceCode() + " = " + this.PopSourceCode());
	}

	@Override public void VisitLetNode(LetNode Node) {
		/*local*/String Type = Node.DeclType.ShortClassName;
		/*local*/String VarName = Node.VariableName;
		/*local*/String Code = Type + " " + VarName;
		if(Node.InitNode != null) {
			Node.InitNode.Evaluate(this);
			Code += " = " + this.PopSourceCode();
		}
		Code +=  ";\n";
		Node.BlockNode.Evaluate(this);
		this.PushSourceCode(Code + this.PopSourceCode());
	}

	@Override public void VisitIfNode(IfNode Node) {
		Node.CondExpr.Evaluate(this);
		this.VisitBlockEachStatementWithIndent(Node.ThenNode);
		this.VisitBlockEachStatementWithIndent(Node.ElseNode);

		String ElseBlock = this.PopSourceCode();
		String ThenBlock = this.PopSourceCode();
		String CondExpr = this.PopSourceCode();
		String Code = "if(" + CondExpr + ") " + ThenBlock;
		if(Node.ElseNode != null) {
			Code += " else " + ElseBlock;
		}
		this.PushSourceCode(Code);

	}

	@Override public void VisitSwitchNode(SwitchNode Node) {
		// TODO Auto-generated method stub

	}

	@Override public void VisitReturnNode(ReturnNode Node) {
		String Code = "return";
		if(Node.Expr != null) {
			Node.Expr.Evaluate(this);
			Code += " " + this.PopSourceCode();
		}
		this.PushSourceCode(Code);
	}

	@Override public void VisitLabelNode(LabelNode Node) {
		String Label = Node.Label;
		this.PushSourceCode(Label + ":");
	}

	@Override public void VisitJumpNode(JumpNode Node) {
		String Label = Node.Label;
		this.PushSourceCode("goto " + Label);
	}

	@Override public void VisitBreakNode(BreakNode Node) {
		String Code = "break";
		String Label = Node.Label;
		if(Label != null) {
			Code += " " + Label;
		}
		this.PushSourceCode(Code);
	}

	@Override public void VisitContinueNode(ContinueNode Node) {
		String Code = "continue";
		String Label = Node.Label;
		if(Label != null) {
			Code += " " + Label;
		}
		this.PushSourceCode(Code);
	}

	@Override public void VisitTryNode(TryNode Node) {
		String Code = "try";
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
		Node.Expr.Evaluate(this);
		String Code = "throw " + this.PopSourceCode();
		this.PushSourceCode(Code);
	}

	@Override public void VisitFunctionNode(FunctionNode Node) {
		// TODO Auto-generated method stub

	}

	@Override public void VisitErrorNode(ErrorNode Node) {
		String Code = "throw RuntimeError(\"" + Node.Token.ParsedText + "\")";
		this.PushSourceCode(Code);
	}

	@Override public void GenerateFunc(GtFunc Func, ArrayList<String> ParamNameList, GtNode Body) {
		//FIXME
		String Program = "";
		String RetTy = Func.GetReturnType().ShortClassName;
		String ThisTy = Func.GetRecvType().ShortClassName;
		Program += RetTy + " " + ThisTy + "_" + Func.GetNativeFuncName() + "(";
		Program += ThisTy + " " + "this";
		for(int i = 0; i < ParamNameList.size(); i++) {
			String ParamTy = Func.GetFuncParamType(i).ShortClassName;
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