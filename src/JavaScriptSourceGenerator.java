import java.util.ArrayList;

public class JavaScriptSourceGenerator extends GreenTeaGenerator {

	JavaScriptSourceGenerator() {
		super("JavaScript");
	}

	private boolean UseLetKeyword;

	@Override public void DefineFunction(GtMethod Method, ArrayList<String> NameList, TypedNode Body) {
		/*local*/int ArgCount = Method.Types.length - 1;
		/*local*/String Code = "var " + Method.MethodName + "= (function(";
		/*local*/int i = 0;
		while(i < ArgCount){
			if(i > 0){
				Code = Code + ", ";
			}
			Code = Code + NameList.get(i) + i;
			i = i + 1;
		}
		Code += ") ";
		this.VisitBlockJS(Body);
		Code += this.PopSourceCode() + ")";
		this.PushSourceCode(Code);
	};

	public  void VisitBlockJS(TypedNode Node) {
		this.Indent();
		/*local*/String highLevelIndent = this.GetIndentString();
		super.VisitBlock(Node);
		this.UnIndent();
		/*local*/int Size = Node.CountForrowingNode();
		/*local*/String Block = this.PopManyCodeWithModifier(Size, true, "\n" + highLevelIndent, ";", null);
		this.PushSourceCode("{" + Block + "\n" + this.GetIndentString() + "}");
	}

	@Override public void VisitConstNode(ConstNode Node) {
		this.PushSourceCode(Node.ConstValue == null ? "null" : Node.ConstValue.toString());
	}

	@Override public void VisitUnaryNode(UnaryNode UnaryNode) {
		UnaryNode.Expr.Evaluate(this);
		this.PushSourceCode(UnaryNode.Token.ParsedText + this.PopSourceCode());
	}

	@Override public void VisitBinaryNode(BinaryNode Node) {
		Node.RightNode.Evaluate(this);
		Node.LeftNode.Evaluate(this);
		/*local*/String operator = Node.Token.ParsedText;
		if(operator.equals("/") /*&& Node.Type == Context.IntType*/ ){
			this.PushSourceCode("((" + this.PopSourceCode() + " " + operator + " " + this.PopSourceCode() + ") | 0)");
		}else{
			this.PushSourceCode("(" + this.PopSourceCode() + " " + operator + " " + this.PopSourceCode() + ")");
		}
	}

	@Override public void VisitNewNode(NewNode Node) {
		/*local*/int i = 0;
		while(i < Node.Params.size()) {
			/*local*/TypedNode Param = Node.Params.get(i);
			Param.Evaluate(this);
			i = i + 1;
		}
		this.PushSourceCode("new " + Node.Type.ShortClassName + "()");
	}

	@Override public void VisitNullNode(NullNode Node) {
		this.PushSourceCode("null");
	}

	@Override public void VisitLocalNode(LocalNode Node) {
		this.PushSourceCode(Node.LocalName);
	}

	@Override public void VisitGetterNode(GetterNode Node) {
		Node.Expr.Evaluate(this);
		this.PushSourceCode(this.PopSourceCode() + "." + Node.Token.ParsedText);
	}

	@Override public void VisitIndexerNode(IndexerNode Node) {
		Node.Indexer.Evaluate(this);
		Node.Expr.Evaluate(this);
		this.PushSourceCode(this.PopSourceCode() + "." + Node.Token.ParsedText + "[" +this.PopSourceCode() + "]");
	}

	@Override public void VisitApplyNode(ApplyNode Node) {
		/*local*/String methodName = Node.Method.MethodName;
		/*local*/int ParamCount = Node.Params.size();
		/*local*/int i = 0;
		while(i < ParamCount) {
			Node.Params.get(i).Evaluate(this);
			i = i + 1;
		}
		/*local*/String params = "(" + this.PopManyCodeWithModifier(ParamCount, true, null, null, ", ") + ")";
		this.PushSourceCode(methodName + params);
	}

	@Override public void VisitAndNode(AndNode Node) {
		Node.LeftNode.Evaluate(this);
		Node.RightNode.Evaluate(this);
		/*local*/String Right = this.PopSourceCode();
		/*local*/String Left = this.PopSourceCode();
		this.PushSourceCode(Left + " && " + Right);
	}

	@Override public void VisitOrNode(OrNode Node) {
		Node.LeftNode.Evaluate(this);
		Node.RightNode.Evaluate(this);
		/*local*/String Right = this.PopSourceCode();
		/*local*/String Left = this.PopSourceCode();
		this.PushSourceCode(Left + " || " + Right);
	}

	@Override public void VisitAssignNode(AssignNode Node) {
		Node.LeftNode.Evaluate(this);
		Node.RightNode.Evaluate(this);
		/*local*/String Right = this.PopSourceCode();
		/*local*/String Left = this.PopSourceCode();
		this.PushSourceCode((this.UseLetKeyword ? "let " : "var ") + Left + " = " + Right);
	}

	@Override public void VisitLetNode(LetNode Node) {
		this.VisitBlockJS(Node.BlockNode);
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

	@Override public void VisitSwitchNode(SwitchNode Node) {
		// TODO Auto-generated method stub
	}

	@Override public void VisitWhileNode(WhileNode Node) {
		Node.CondExpr.Evaluate(this);
		this.VisitBlockJS(Node.LoopBody);
		/*local*/String LoopBody = this.PopSourceCode();
		/*local*/String CondExpr = this.PopSourceCode();
		this.PushSourceCode("while(" + CondExpr + ") {" + LoopBody + "}");
	}

	@Override public void VisitForNode(ForNode Node) {
		Node.CondExpr.Evaluate(this);
		Node.IterExpr.Evaluate(this);
		this.VisitBlockJS(Node.LoopBody);
		/*local*/String LoopBody = this.PopSourceCode();
		/*local*/String IterExpr = this.PopSourceCode();
		/*local*/String CondExpr = this.PopSourceCode();
		this.PushSourceCode("for(;" + CondExpr + "; " + IterExpr + ") {" + LoopBody + "}");
	}

	@Override public void VisitDoWhileNode(DoWhileNode Node) {
		Node.CondExpr.Evaluate(this);
		this.VisitBlockJS(Node.LoopBody);
		/*local*/String LoopBody = this.PopSourceCode();
		/*local*/String CondExpr = this.PopSourceCode();
		this.PushSourceCode("do {" + LoopBody + "}while(" + CondExpr + ");");
	}

	@Override public void VisitForEachNode(ForEachNode ForEachNode) {
		// TODO Auto-generated method stub
	}

	@Override public void VisitEmptyNode(TypedNode Node) {
		this.PushSourceCode("");
	}

	@Override public void VisitReturnNode(ReturnNode Node) {
		if(Node.Expr != null){
			Node.Expr.Evaluate(this);
			this.PushSourceCode("return " + this.PopSourceCode());
		}else{
			this.PushSourceCode("return");
		}
	}

	@Override public void VisitLabelNode(LabelNode Node) {
		/*local*/String Label = Node.Label;
		this.PushSourceCode(Label + ":");
		return;
	}

	@Override public void VisitBreakNode(BreakNode Node) {
		this.PushSourceCode("break");
	}

	@Override public void VisitContinueNode(ContinueNode Node) {
		this.PushSourceCode("continue");
	}

	@Override public void VisitJumpNode(JumpNode Node) {
		/*local*/String Label = Node.Label;
		this.PushSourceCode("goto " + Label);
		return;
	}

	@Override public void VisitTryNode(TryNode Node) {
		this.VisitBlockJS(Node.TryBlock);
//		/* FIXME: Do not use for statement */for(int i = 0; i < Node.CatchBlock.size(); i++) {
//			TypedNode Block = (TypedNode) Node.CatchBlock.get(i);
//			TypedNode Exception = (TypedNode) Node.TargetException.get(i);
//			this.VisitBlockJS(Block);
//		}
		this.VisitBlockJS(Node.FinallyBlock);

		/*local*/String FinallyBlock = this.PopSourceCode();
		/*local*/String CatchBlocks = "";//this.PopManyCodeWithModifier(Node.CatchBlock.CountForrowingNode(), true, "catch() ", null, null);
		/*local*/String TryBlock = this.PopSourceCode();
		this.PushSourceCode("try " + TryBlock /*+ CatchBlocks*/ + "finally " + FinallyBlock);
		return;
	}

	@Override public void VisitThrowNode(ThrowNode Node) {
		Node.Expr.Evaluate(this);
		/*local*/String Expr = this.PopSourceCode();
		this.PushSourceCode("throw " + Expr);
		return;
	}

	@Override public void VisitFunctionNode(FunctionNode Node) {
		// TODO Auto-generated method stub
		return;
	}

	@Override public void VisitErrorNode(ErrorNode Node) {
		/*local*/String Expr = Node.toString();
		this.PushSourceCode("throw new Error(\"" + Expr + "\")");
		return;
	}

	// This must be extended in each language
	@Override
	public Object Eval(TypedNode Node) {
		this.VisitBlock(Node);
		/*local*/String ret = "";
		while(this.GeneratedCodeStack.size() > 0){
			/*local*/String Line = this.PopSourceCode();
			if(Line.length() > 0){
				ret =  Line + ";\n" + ret;
			}
		}
		System.out.println(ret);
		return ret;
	}

}

