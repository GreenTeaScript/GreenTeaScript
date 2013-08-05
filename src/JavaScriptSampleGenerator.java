import java.util.ArrayList;

// GreenTea Generator should be written in each language.

public class JavaScriptSampleGenerator extends GreenTeaGenerator {

	JavaScriptSampleGenerator() {
		super("JavaScript");
	}

	private boolean UseLetKeyword;
	
	@Override
	public void DefineFunction(GtMethod Method, ArrayList<String> NameList, TypedNode Body) {
		/*local*/int ArgCount = Method.Types.length - 1;
		/*local*/String Code = "var " + Method.MethodName + "= (function(";
		for(/*local*/int i = 0; i < ArgCount; i++){
			Code = Code + (i > 0 ? ", " : "") + NameList.get(i);
		}
		Code += ")";
		Body.Evaluate(this);
		Code += " {" + this.PopCode() + "})";
		this.PushCode(Code);
	};

	@Override
	public void VisitConstNode(ConstNode Node) {
		this.PushCode(Node.ConstValue == null ? "null" : Node.ConstValue.toString());
		return;
	}
	
	@Override
	public void VisitUnaryNode(UnaryNode UnaryNode) {
		UnaryNode.Expr.Evaluate(this);
		this.PushCode(UnaryNode.Token.ParsedText + this.PopCode());
	};
	
	@Override
	public void VisitBinaryNode(BinaryNode Node) {
		Node.RightNode.Evaluate(this);
		Node.LeftNode.Evaluate(this);
		/*local*/String operator = Node.Token.ParsedText;
		if(operator.equals("/") /*&& Node.Type == Context.IntType*/ ){
			this.PushCode("((" + this.PopCode() + " " + operator + " " + this.PopCode() + ") | 0)");
		}else{
			this.PushCode("(" + this.PopCode() + " " + operator + " " + this.PopCode() + ")");
		}
	}

	@Override
	public void VisitNewNode(NewNode Node) {
		for(/*local*/int i = 0; i < Node.Params.size(); i++) {
			/*local*/TypedNode Param = Node.Params.get(i);
			Param.Evaluate(this);
		}
		this.PushCode("new " + Node.Type.ShortClassName + "()");
		return;
	}

	@Override
	public void VisitNullNode(NullNode Node) {
		this.PushCode("null");
		return;
	}

	@Override
	public void VisitLocalNode(LocalNode Node) {
		//this.AddLocalVarIfNotDefined(Node.Type, Node.Token.ParsedText);
		this.PushCode(Node.LocalName);
	}

	@Override
	public void VisitGetterNode(GetterNode Node) {
		//Node.BaseNode.Evaluate(this);
		this.PushCode(this.PopCode() + "." + Node.Token.ParsedText);
	}

	@Override
	public void VisitApplyNode(ApplyNode Node) {
		String methodName = Node.Method.MethodName;
		for(int i = 0; i < Node.Params.size(); i++) {
			TypedNode Param = Node.Params.get(i);
			Param.Evaluate(this);
		}
		String params = "(hoge, fuga)";//"//"(" + this.PopNReverseAndJoin(Node.Params.size() - 1, ", ") + ")";
		String thisNode = this.PopCode();
		if(thisNode.equals(GtConst.GlobalConstName)) {
			this.PushCode(methodName + params);
		} else {
			this.PushCode(thisNode + "." + methodName + params);
		}
	}

	@Override
	public void VisitAndNode(AndNode Node) {
		Node.LeftNode.Evaluate(this);
		Node.RightNode.Evaluate(this);
		String Right = this.PopCode();
		String Left = this.PopCode();
		this.PushCode(Left + " && " + Right);
	}

	@Override
	public void VisitOrNode(OrNode Node) {
		Node.LeftNode.Evaluate(this);
		Node.RightNode.Evaluate(this);
		String Right = this.PopCode();
		String Left = this.PopCode();
		this.PushCode(Left + " || " + Right);
	}

	@Override
	public void VisitAssignNode(AssignNode Node) {
		Node.LeftNode.Evaluate(this);
		Node.RightNode.Evaluate(this);
		String Right = this.PopCode();
		String Left = this.PopCode();
		this.PushCode((this.UseLetKeyword ? "let " : "var ") + Left + " = " + Right);
	}

	@Override
	public void VisitLetNode(LetNode Node) {
		//		Node.ValueNode.Evaluate(this);
		this.VisitBlock(Node.BlockNode);
		//this.AddLocalVarIfNotDefined(Node.Type, Node.VarToken.ParsedText);
		//		String Block = this.pop();
		//		String Right = this.pop();
		//		this.push(Node.VarToken.ParsedText + " = " + Right + Block);
	}

	@Override
	public void VisitIfNode(IfNode Node) {
		Node.CondExpr.Evaluate(this);
		this.VisitBlock(Node.ThenNode);
		this.VisitBlock(Node.ElseNode);

		String ElseBlock = this.PopCode();
		String ThenBlock = this.PopCode();
		String CondExpr = this.PopCode();
		String source = "if(" + CondExpr + ") " + ThenBlock;
		if(Node.ElseNode != null) {
			source = source + " else " + ElseBlock;
		}
		this.PushCode(source);
	}

	@Override
	public void VisitSwitchNode(SwitchNode Node) {
		//		Node..CondExpr.Evaluate(this);
		//		for(int i = 0; i < Node.Blocks.size(); i++) {
		//			TypedNode Block = (TypedNode) Node.Blocks.get(i);
		//			this.VisitListNode(Block);
		//		}
		//
		//		int Size = Node.Labels.size();
		//		String Exprs = "";
		//		for(int i = 0; i < Size; i = i + 1) {
		//			String Label = (String) Node.Labels.get(Size - i);
		//			String Block = this.pop();
		//			Exprs = "case " + Label + ":" + Block + Exprs;
		//		}
		//		String CondExpr = this.pop();
		//		this.push("switch (" + CondExpr + ") {" + Exprs + "}");
	}

	@Override
	public void VisitLoopNode(LoopNode Node) {
		Node.CondExpr.Evaluate(this);
		Node.IterExpr.Evaluate(this);
		this.VisitBlock(Node.LoopBody);
		String LoopBody = this.PopCode();
		String IterExpr = this.PopCode();
		String CondExpr = this.PopCode();
		this.PushCode("while(" + CondExpr + ") {" + LoopBody + IterExpr + "}");
		return;
	}

	@Override
	public void VisitReturnNode(ReturnNode Node) {
		if(Node.Expr != null){
			Node.Expr.Evaluate(this);
			this.PushCode("return " + this.PopCode());
		}else{
			this.PushCode("return");
		}
	}

	@Override
	public void VisitLabelNode(LabelNode Node) {
		String Label = Node.Label;
		if(Label.compareTo("continue") == 0) {
			this.PushCode("");
		} else if(Label.compareTo("continue") == 0) {
			this.PushCode("");
		} else {
			this.PushCode(Label + ":");
		}
		return;
	}
	
	@Override
	public void VisitBreakNode(BreakNode Node) {
		this.PushCode("break");
	};
	
	@Override
	public void VisitContinueNode(ContinueNode Node) {
		this.PushCode("continue");
	};

	@Override
	public void VisitJumpNode(JumpNode Node) {
		String Label = Node.Label;
		this.PushCode("goto " + Label);
		return;
	}

	@Override
	public void VisitTryNode(TryNode Node) {
		this.VisitBlock(Node.TryBlock);
		//		for(int i = 0; i < Node.CatchBlock.size(); i++) {
		//			TypedNode Block = (TypedNode) Node.CatchBlock.get(i);
		//			TypedNode Exception = (TypedNode) Node.TargetException.get(i);
		//			this.VisitBlock(Block);
		//		}
		this.VisitBlock(Node.FinallyBlock);

		String FinallyBlock = this.PopCode();
		String CatchBlocks = "";//this.PopNReverseWithPrefix(Node.CatchBlock.size(), "catch() ");
		String TryBlock = this.PopCode();
		this.PushCode("try " + TryBlock + "" + CatchBlocks + "finally " + FinallyBlock);
		return;
	}

	@Override
	public void VisitThrowNode(ThrowNode Node) {
		Node.Expr.Evaluate(this);
		String Expr = this.PopCode();
		this.PushCode("throw " + Expr);
		return;
	}

	@Override
	public void VisitFunctionNode(FunctionNode Node) {
		// TODO Auto-generated method stub
		return;
	}

	@Override
	public void VisitErrorNode(ErrorNode Node) {
		String Expr = Node.toString();
		this.PushCode("throw new Error(\"" + Expr + "\")");
		return;
	}

	// This must be extended in each language
	@Override 
	public Object Eval(TypedNode Node) {
		DebugP("<><><><><><> JavaScript start <><><><><><>");
		VisitBlock(Node);
		System.out.println(this.PopCode());
		return null;
	}

}

