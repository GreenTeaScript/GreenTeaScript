import java.util.ArrayList;

//GreenTea Generator should be written in each language.

public class JavaSourceGenerator extends SourceGenerator {
	JavaSourceGenerator() {
		super("Java");
	}

	public void VisitBlockEachStatementWithIndent(TypedNode Node) {
		String Code = "{\n";
		this.Indent();
		/*local*/TypedNode CurrentNode = Node;
		while(CurrentNode != null) {
			CurrentNode.Evaluate(this);
			Code += this.GetIndentString() + this.PopSourceCode() + ";\n";
			CurrentNode = CurrentNode.NextNode;
		}
		this.UnIndent();
		Code += this.GetIndentString() + "}";
		this.PushSourceCode(Code);
	}

	@Override public void VisitEmptyNode(TypedNode Node) {
	}

	@Override public void VisitSuffixNode(SuffixNode Node) {
		GtMethod Method = Node.Method;
		if(Method.MethodName.equals("++")) {
		}
		else if(Method.MethodName.equals("--")) {
		}
		else {
			throw new RuntimeException("NotSupportOperator");
		}
		Node.Expr.Evaluate(this);
		this.PushSourceCode(this.PopSourceCode() + Method.MethodName);
	}

	@Override public void VisitUnaryNode(UnaryNode Node) {
		GtMethod Method = Node.Method;
		if(Method.MethodName.equals("+")) {
		}
		else if(Method.MethodName.equals("-")) {
		}
		else if(Method.MethodName.equals("~")) {
		}
		else if(Method.MethodName.equals("!")) {
		}
		else if(Method.MethodName.equals("++")) {
		}
		else if(Method.MethodName.equals("--")) {
		}
		else {
			throw new RuntimeException("NotSupportOperator");
		}
		Node.Expr.Evaluate(this);
		this.PushSourceCode(Method.MethodName + this.PopSourceCode());
	}

	@Override public void VisitIndexerNode(IndexerNode Node) {
		Node.Indexer.Evaluate(this);
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
		this.PushSourceCode(Node.LocalName);
	}

	@Override public void VisitGetterNode(GetterNode Node) {
		Node.Expr.Evaluate(this);
		this.PushSourceCode(this.PopSourceCode() + "." + Node.Method.MethodName);
	}

	private String[] EvaluateParam(ArrayList<TypedNode> Params) {
		int Size = Params.size();
		String[] Programs = new String[Size];
		for(int i = 0; i < Size; i++) {
			TypedNode Node = Params.get(i);
			Node.Evaluate(this);
			Programs[Size - i - 1] = this.PopSourceCode();
		}
		return Programs;
	}

	@Override public void VisitApplyNode(ApplyNode Node) {
		/*local*/String Program = Node.Method.MethodName + "(";
		/*local*/String[] Params = EvaluateParam(Node.Params);
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
		GtMethod Method = Node.Method;
		if(Method.MethodName.equals("+")) {
		}
		else if(Method.MethodName.equals("-")) {
		}
		else if(Method.MethodName.equals("*")) {
		}
		else if(Method.MethodName.equals("/")) {
		}
		else if(Method.MethodName.equals("%")) {
		}
		else if(Method.MethodName.equals("<<")) {
		}
		else if(Method.MethodName.equals(">>")) {
		}
		else if(Method.MethodName.equals("&")) {
		}
		else if(Method.MethodName.equals("|")) {
		}
		else if(Method.MethodName.equals("^")) {
		}
		else if(Method.MethodName.equals("<=")) {
		}
		else if(Method.MethodName.equals("<")) {
		}
		else if(Method.MethodName.equals(">=")) {
		}
		else if(Method.MethodName.equals(">")) {
		}
		else if(Method.MethodName.equals("!=")) {
		}
		else if(Method.MethodName.equals("==")) {
		}
		else {
			throw new RuntimeException("NotSupportOperator");
		}
		Node.RightNode.Evaluate(this);
		Node.LeftNode.Evaluate(this);
		this.PushSourceCode(this.PopSourceCode() + " " + Method.MethodName + " " + this.PopSourceCode());
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
		String Type = Node.DeclType.ShortClassName;
		Node.VarNode.Evaluate(this);
		String Code = Type + " " + this.PopSourceCode();
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

	@Override public void VisitLoopNode(LoopNode Node) {
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

	@Override public void DefineFunction(GtMethod Method, ArrayList<String> ParamNameList, TypedNode Body) {
		//FIXME
		String Program = "";
		String RetTy = Method.GetReturnType().ShortClassName;
		String ThisTy = Method.GetRecvType().ShortClassName;
		Program += RetTy + " " + ThisTy + "_" + Method.MethodName + "(";
		Program += ThisTy + " " + "this";
		for(int i = 0; i < ParamNameList.size(); i++) {
			String ParamTy = Method.GetParamType(i).ShortClassName;
			Program += " ," + ParamTy + " " + ParamNameList.get(i);
		}

		Program += Eval(Body);
		DebugP(Program);
	}

	@Override public Object Eval(TypedNode Node) {
		//FIXME
		this.VisitBlockEachStatementWithIndent(Node);
		return this.PopSourceCode();
	}

	@Override public void AddClass(GtType Type) {
		//FIXME
		// TODO Auto-generated method stub

	}

	@Override public void SetLanguageContext(GtContext Context) {
		new JavaLayerDef().MakeDefinition(Context.DefaultNameSpace);
	}
}
