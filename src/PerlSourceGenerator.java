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

public class PerlSourceGenerator extends SourceGenerator {
	PerlSourceGenerator/*constructor*/(String TargetCode, String OutputFile, int GeneratorFlag) {
		super(TargetCode, OutputFile, GeneratorFlag);
	}

	public void VisitBlockEachStatementWithIndent(GtNode Node) {
		/*local*/String Code = "{\n";
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
		/*local*/String FuncName = Node.Token.ParsedText;
		if(FuncName.equals("++")) {
		}
		else if(FuncName.equals("--")) {
		}
		else {
			//throw new RuntimeException("NotSupportOperator");
		}
		Node.Expr.Evaluate(this);
		this.PushSourceCode(this.PopSourceCode() + FuncName);
	}

	@Override public void VisitUnaryNode(UnaryNode Node) {
		/*local*/String FuncName = Node.Token.ParsedText;
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
		else {
			//throw new RuntimeException("NotSupportOperator");
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
		/*local*/String Program = "while(" + this.PopSourceCode() + ")";
		this.VisitBlockEachStatementWithIndent(Node.LoopBody);
		Program += this.PopSourceCode();
		this.PushSourceCode(Program);
	}

	@Override public void VisitDoWhileNode(DoWhileNode Node) {
		/*local*/String Program = "do";
		this.VisitBlockEachStatementWithIndent(Node.LoopBody);
		Node.CondExpr.Evaluate(this);
		Program += " while(" + this.PopSourceCode() + ")";
		this.PushSourceCode(Program);
	}

	@Override public void VisitForNode(ForNode Node) {
		Node.IterExpr.Evaluate(this);
		Node.CondExpr.Evaluate(this);
		/*local*/String Cond = this.PopSourceCode();
		/*local*/String Iter = this.PopSourceCode();

		/*local*/String Program = "for(; " + Cond  + "; " + Iter + ")";
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
		/*local*/String Type = Node.Type.ShortClassName;
		this.PushSourceCode("new " + Type);

	}

	@Override public void VisitNullNode(NullNode Node) {
		this.PushSourceCode("NULL");
	}

	@Override public void VisitLocalNode(LocalNode Node) {
		this.PushSourceCode("$" + Node.LocalName);
	}

	@Override public void VisitGetterNode(GetterNode Node) {
		Node.Expr.Evaluate(this);
		this.PushSourceCode(this.PopSourceCode() + "->" + Node.Func.FuncName);
	}

	private String[] EvaluateParam(ArrayList<GtNode> Params) {
		/*local*/int Size = GtStatic.ListSize(Params);
		/*local*/String[] Programs = new String[Size];
		/*local*/int i = 0;
		while(i < Size) {
			GtNode Node = Params.get(i);
			Node.Evaluate(this);
			Programs[Size - i - 1] = this.PopSourceCode();
			i = i + 1;
		}
		return Programs;
	}

	@Override public void VisitApplyNode(ApplyNode Node) {
		/*local*/String Program = Node.Func.GetNativeFuncName() + "(";
		/*local*/String[] Params = this.EvaluateParam(Node.Params);
		/*local*/int i = 0;
		while(i < Params.length) {
			String P = Params[i];
			if(i != 0) {
				Program += ",";
			}
			Program += P;
			i = i + 1;
		}
		Program += ")";
		this.PushSourceCode(Program);
	}

	@Override public void VisitBinaryNode(BinaryNode Node) {
		/*local*/String FuncName = Node.Token.ParsedText;
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
			if(Node.Func.GetRecvType() == this.Context.StringType) {
				FuncName = "ne";
			}
		}
		else if(FuncName.equals("==")) {
			if(Node.Func.GetRecvType() == this.Context.StringType) {
				FuncName = "eq";
			}
		}
		else {
			//throw new RuntimeException("NotSupportOperator");
		}
		Node.RightNode.Evaluate(this);
		Node.LeftNode.Evaluate(this);
		this.PushSourceCode(this.PopSourceCode() + " " + FuncName + " " + this.PopSourceCode());
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
		///*local*/String Type = Node.DeclType.ShortClassName;
		/*local*/String VarName = Node.VariableName;
		/*local*/String Code = "my " + VarName;
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

		/*local*/String ElseBlock = this.PopSourceCode();
		/*local*/String ThenBlock = this.PopSourceCode();
		/*local*/String CondExpr = this.PopSourceCode();
		/*local*/String Code = "if(" + CondExpr + ") " + ThenBlock;
		if(Node.ElseNode != null) {
			Code += " else " + ElseBlock;
		}
		this.PushSourceCode(Code);

	}

	@Override public void VisitSwitchNode(SwitchNode Node) {
		// TODO Auto-generated method stub

	}

	@Override public void VisitReturnNode(ReturnNode Node) {
		/*local*/String Code = "return";
		if(Node.Expr != null) {
			Node.Expr.Evaluate(this);
			Code += " " + this.PopSourceCode();
		}
		this.PushSourceCode(Code);
	}

	@Override public void VisitBreakNode(BreakNode Node) {
		/*local*/String Code = "break";
		/*local*/String Label = Node.Label;
		if(Label != null) {
			Code += " " + Label;
		}
		this.PushSourceCode(Code);
	}

	@Override public void VisitContinueNode(ContinueNode Node) {
		/*local*/String Code = "continue";
		/*local*/String Label = Node.Label;
		if(Label != null) {
			Code += " " + Label;
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
		Node.Expr.Evaluate(this);
		String Code = "throw " + this.PopSourceCode();
		this.PushSourceCode(Code);
	}

	@Override public void VisitFunctionNode(FunctionNode Node) {
		// TODO Auto-generated method stub

	}

	@Override public void VisitErrorNode(ErrorNode Node) {
		String Code = "throw Error(\"" + Node.Token.ParsedText + "\")";
		this.PushSourceCode(Code);

	}

	@Override public void VisitCommandNode(CommandNode Node) {
		/*local*/String Code = "system(\"";
		/*local*/int i = 0;
		while(i < Node.Params.size()) {
			GtNode Param = Node.Params.get(i);
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

	@Override public void GenerateFunc(GtFunc Func, ArrayList<String> ParamNameList, GtNode Body) {
		/*local*/String Program = "";
		/*local*/String RetTy = Func.GetReturnType().ShortClassName;
		/*local*/String FuncName = Func.GetNativeFuncName();
		/*local*/String Signature = "# ";
		/*local*/String Arguments = "";
		Signature += RetTy + " " + FuncName + "(";
		this.Indent();
		/*local*/int i = 0;
		while(i < ParamNameList.size()) {
			String ParamTy = Func.GetFuncParamType(i).ShortClassName;
			Signature += " ," + ParamTy + " " + ParamNameList.get(i);
			Arguments += this.GetIndentString() + "my $" + ParamNameList.get(i) + " = $_[" + i + "];\n";
			i = i + 1;
		}
		this.UnIndent();
		Program += Signature + ");\n" + this.GetIndentString() + "sub " + FuncName + "{\n";
		this.Indent();
		Program += Arguments + this.GetIndentString();
		this.VisitBlockEachStatementWithIndent(Body);
		Program += this.PopSourceCode();
		this.UnIndent();
		Program += "\n" + this.GetIndentString() + "}";
		this.WriteLineCode(Program);
	}

	@Override public Object Eval(GtNode SingleNode) {
		SingleNode.Evaluate(this);
		return this.PopSourceCode();
	}

	@Override public void AddClass(GtType Type) {
		// TODO Auto-generated method stub

	}

	@Override public void InitContext(GtClassContext Context) {
		// TODO Auto-generated method stub

	}

}