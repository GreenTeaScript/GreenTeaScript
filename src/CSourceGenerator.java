import java.util.ArrayList;

//GreenTea Generator should be written in each language.

public class CSourceGenerator extends GreenTeaGenerator {
	IndentGenerator Indent;
	CSourceGenerator() {
		super("CSource");
		this.Indent = new IndentGenerator();
	}

	public void VisitEach(TypedNode Node) {
		String Code = "{\n";
		this.Indent.AddIndent(1);
		/*local*/TypedNode CurrentNode = Node;
		while(CurrentNode != null) {
			CurrentNode.Evaluate(this);
			Code += this.Indent.Get() + this.PopCode() + ";\n";
			CurrentNode = CurrentNode.NextNode;
		}
		this.Indent.AddIndent(-1);
		Code += this.Indent.Get() + "}";
		this.PushCode(Code);
	}

	@Override
	public void VisitEmptyNode(TypedNode Node) {
	}

	@Override
	public void VisitSuffixNode(SuffixNode Node) {
		GtMethod Method = Node.Method;
		if(Method.MethodName.equals("++")) {
		} else if(Method.MethodName.equals("--")) {
		} else {
			throw new RuntimeException("NotSupportOperator");
		}
		Node.Expr.Evaluate(this);
		this.PushCode(this.PopCode() + Method.MethodName);
	}

	@Override
	public void VisitUnaryNode(UnaryNode Node) {
		GtMethod Method = Node.Method;
		if(Method.MethodName.equals("+")) {
		} else if(Method.MethodName.equals("-")) {
		} else if(Method.MethodName.equals("~")) {
		} else if(Method.MethodName.equals("!")) {
		} else if(Method.MethodName.equals("++")) {
		} else if(Method.MethodName.equals("--")) {
		} else {
			throw new RuntimeException("NotSupportOperator");
		}
		Node.Expr.Evaluate(this);
		this.PushCode(Method.MethodName + this.PopCode());
	}

	@Override
	public void VisitIndexerNode(IndexerNode Node) {
		Node.Indexer.Evaluate(this);
		Node.Expr.Evaluate(this);
		this.PushCode(this.PopCode() + "[" + this.PopCode() + "]");

	}

	@Override
	public void VisitMessageNode(MessageNode Node) {
		// TODO Auto-generated method stub

	}

	@Override
	public void VisitWhileNode(WhileNode Node) {
		Node.CondExpr.Evaluate(this);
		String Program = "while(" + this.PopCode() + ")";
		this.VisitEach(Node.LoopBody);
		Program += this.PopCode();
		Indent.AddIndent(-1);
		this.PushCode(Program);
	}

	@Override
	public void VisitDoWhileNode(DoWhileNode Node) {
		String Program = "do";
		this.VisitEach(Node.LoopBody);
		Node.CondExpr.Evaluate(this);
		Program += " while(" + this.PopCode() + ")";
		this.PushCode(Program);
	}

	@Override
	public void VisitForNode(ForNode Node) {
		Node.IterExpr.Evaluate(this);
		Node.CondExpr.Evaluate(this);
		Node.InitNode.Evaluate(this);
		String Init = this.PopCode();
		String Cond = this.PopCode();
		String Iter = this.PopCode();

		String Program = "for(" + Init + "; " + Cond  + "; " + Iter + ")";
		Node.LoopBody.Evaluate(this);
		Program += this.PopCode();
		this.PushCode(Program);
	}

	@Override
	public void VisitForEachNode(ForEachNode Node) {
		// TODO Auto-generated method stub

	}

	@Override
	public void VisitConstNode(ConstNode Node) {
		this.PushCode(Node.ConstValue.toString());
	}

	@Override
	public void VisitNewNode(NewNode Node) {
		String Type = Node.Type.ShortClassName;
		this.PushCode("new " + Type);

	}

	@Override
	public void VisitNullNode(NullNode Node) {
		this.PushCode("NULL");
	}

	@Override
	public void VisitLocalNode(LocalNode Node) {
		this.PushCode(Node.LocalName);
	}

	@Override
	public void VisitGetterNode(GetterNode Node) {
		Node.Expr.Evaluate(this);
		this.PushCode(this.PopCode() + "." + Node.Method.MethodName);
	}

	private String[] EvaluateParam(ArrayList<TypedNode> Params) {
		int Size = Params.size();
		String[] Programs = new String[Size];
		for(int i = 0; i < Size; i++) {
			TypedNode Node = Params.get(i);
			Node.Evaluate(this);
			Programs[Size - i - 1] = this.PopCode();
		}
		return Programs;
	}

	@Override
	public void VisitApplyNode(ApplyNode Node) {
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
		this.PushCode(Program);
	}

	@Override
	public void VisitBinaryNode(BinaryNode Node) {
		GtMethod Method = Node.Method;
		if(Method.MethodName.equals("+")) {
		} else if(Method.MethodName.equals("-")) {
		} else if(Method.MethodName.equals("*")) {
		} else if(Method.MethodName.equals("/")) {
		} else if(Method.MethodName.equals("%")) {
		} else if(Method.MethodName.equals("<<")) {
		} else if(Method.MethodName.equals(">>")) {
		} else if(Method.MethodName.equals("&")) {
		} else if(Method.MethodName.equals("|")) {
		} else if(Method.MethodName.equals("^")) {
		} else if(Method.MethodName.equals("<=")) {
		} else if(Method.MethodName.equals("<")) {
		} else if(Method.MethodName.equals(">=")) {
		} else if(Method.MethodName.equals(">")) {
		} else if(Method.MethodName.equals("!=")) {
		} else if(Method.MethodName.equals("==")) {
		} else {
			throw new RuntimeException("NotSupportOperator");
		}
		Node.RightNode.Evaluate(this);
		Node.LeftNode.Evaluate(this);
		this.PushCode(this.PopCode() + " " + Method.MethodName + " " + this.PopCode());
	}

	@Override
	public void VisitAndNode(AndNode Node) {
		Node.RightNode.Evaluate(this);
		Node.LeftNode.Evaluate(this);
		this.PushCode(this.PopCode() + " && " + this.PopCode());
	}

	@Override
	public void VisitOrNode(OrNode Node) {
		Node.RightNode.Evaluate(this);
		Node.LeftNode.Evaluate(this);
		this.PushCode(this.PopCode() + " || " + this.PopCode());
	}

	@Override
	public void VisitAssignNode(AssignNode Node) {
		Node.RightNode.Evaluate(this);
		Node.LeftNode.Evaluate(this);
		this.PushCode(this.PopCode() + " = " + this.PopCode());
	}

	@Override
	public void VisitLetNode(LetNode Node) {
		String Type = Node.DeclType.ShortClassName;
		Node.VarNode.Evaluate(this);
		String Code = Type + " " + this.PopCode();
		Node.BlockNode.Evaluate(this);
		this.PushCode(Code + this.PopCode());
	}

	@Override
	public void VisitIfNode(IfNode Node) {
		Node.CondExpr.Evaluate(this);
		this.VisitEach(Node.ThenNode);
		this.VisitEach(Node.ElseNode);

		String ElseBlock = this.PopCode();
		String ThenBlock = this.PopCode();
		String CondExpr = this.PopCode();
		String Code = "if(" + CondExpr + ") " + ThenBlock;
		if(Node.ElseNode != null) {
			Code += " else " + ElseBlock;
		}
		this.PushCode(Code);

	}

	@Override
	public void VisitSwitchNode(SwitchNode Node) {
		// TODO Auto-generated method stub

	}

	@Override
	public void VisitLoopNode(LoopNode Node) {
		// TODO Auto-generated method stub

	}

	@Override
	public void VisitReturnNode(ReturnNode Node) {
		String Code = "return";
		if(Node.Expr != null) {
			Node.Expr.Evaluate(this);
			Code += " " + this.PopCode();
		}
		this.PushCode(Code);
	}

	@Override
	public void VisitLabelNode(LabelNode Node) {
		String Label = Node.Label;
		this.PushCode(Label + ":");
	}

	@Override
	public void VisitJumpNode(JumpNode Node) {
		String Label = Node.Label;
		this.PushCode("goto " + Label);
	}

	@Override
	public void VisitBreakNode(BreakNode Node) {
		String Code = "break";
		String Label = Node.Label;
		if(Label != null) {
			Code += " " + Label;
		}
		this.PushCode(Code);
	}

	@Override
	public void VisitContinueNode(ContinueNode Node) {
		String Code = "continue";
		String Label = Node.Label;
		if(Label != null) {
			Code += " " + Label;
		}
		this.PushCode(Code);
	}

	@Override
	public void VisitTryNode(TryNode Node) {
		String Code = "try";
		//this.VisitEach(Node.CatchBlock);
		this.VisitEach(Node.TryBlock);

		Code += this.PopCode();
		if(Node.FinallyBlock != null) {
			this.VisitEach(Node.FinallyBlock);
			Code += " finally " + this.PopCode();
		}
		this.PushCode(Code);
	}

	@Override
	public void VisitThrowNode(ThrowNode Node) {
		Node.Expr.Evaluate(this);
		String Code = "throw " + this.PopCode();
		this.PushCode(Code);
	}

	@Override
	public void VisitFunctionNode(FunctionNode Node) {
		// TODO Auto-generated method stub

	}

	@Override
	public void VisitErrorNode(ErrorNode Node) {
		String Code = "throw Error(\"" + Node.Token.ParsedText + "\")";
		this.PushCode(Code);

	}

	@Override
	public void DefineFunction(GtMethod Method, ArrayList<String> ParamNameList, TypedNode Body) {
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

	@Override
	public Object Eval(TypedNode Node) {
		this.VisitEach(Node);
		return this.PopCode();
	}

	@Override
	public void AddClass(GtType Type) {
		// TODO Auto-generated method stub

	}

	@Override
	public void LoadContext(GtContext Context) {
		new JavaLayerDef().MakeDefinition(Context.DefaultNameSpace);
	}
}