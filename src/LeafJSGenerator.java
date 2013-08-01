// GreenTea Generator should be written in each language.

class NotSupportedCodeError extends Exception{
	
};

public class LeafJSGenerator extends GreenTeaGenerator {
	
	private boolean UseLetKeyword;


	private void push(String code){
		// TODO impl
	}
	private String pop(){
		// TODO impl
		return null;
	}

	public void VisitDefineNode(DefineNode Node)  { 
		if(Node.DefInfo instanceof GtMethod) {
			GtMethod Mtd = (GtMethod) Node.DefInfo;
			Mtd.DoCompilation();
			//this.push((String) Mtd.MethodInvoker.CompiledCode);
		} else {
			//throw new NotSupportedCodeError();
		}
	}

	
	public void VisitConst(ConstNode Node) {
		this.push(Node.ConstValue.toString());
		return;
	}

	
	public void VisitNew(NewNode Node) {
		for(int i = 0; i < Node.Params.size(); i++) {
			TypedNode Param = (TypedNode) Node.Params.get(i);
			Param.Evaluate(this);
		}
		this.push("new " + Node.Type.ShortClassName + "()");
		return;
	}

	
	public void VisitNull(NullNode Node) {
		this.push("null");
		return;
	}

	
	public void VisitLocal(LocalNode Node) {
		//this.AddLocalVarIfNotDefined(Node.Type, Node.Token.ParsedText);
		this.push(Node.Token.ParsedText);
	}

	
	public void VisitGetter(GetterNode Node) {
		//Node.BaseNode.Evaluate(this);
		this.push(this.pop() + "." + Node.Token.ParsedText);
	}

	
	public void VisitApply(ApplyNode Node) {
		String methodName = Node.Method.MethodName;
		for(int i = 0; i < Node.Params.size(); i++) {
			TypedNode Param = (TypedNode) Node.Params.get(i);
			Param.Evaluate(this);
		}
		String params = "(hoge, fuga)";//"//"(" + this.PopNReverseAndJoin(Node.Params.size() - 1, ", ") + ")";
		String thisNode = this.pop();
		if(thisNode.equals(GtConst.GlobalConstName)) {
			this.push(methodName + params);
		} else {
			this.push(thisNode + "." + methodName + params);
		}
	}

	
	public void VisitAnd(AndNode Node) {
		Node.LeftNode.Evaluate(this);
		Node.RightNode.Evaluate(this);
		String Right = this.pop();
		String Left = this.pop();
		this.push(Left + " && " + Right);
	}

	
	public void VisitOr(OrNode Node) {
		Node.LeftNode.Evaluate(this);
		Node.RightNode.Evaluate(this);

		String Right = this.pop();
		String Left = this.pop();
		this.push(Left + " || " + Right);
	}

	
	public void VisitAssign(AssignNode Node) {
		Node.LeftNode.Evaluate(this);
		Node.RightNode.Evaluate(this);
		String Right = this.pop();
		String Left = this.pop();
		this.push((this.UseLetKeyword ? "let " : "var ") + Left + " = " + Right);
	}

	
	public void VisitLet(LetNode Node) {
		Node.ValueNode.Evaluate(this);
		this.VisitBlock(Node.BlockNode);
		//this.AddLocalVarIfNotDefined(Node.Type, Node.VarToken.ParsedText);
		String Block = this.pop();
		String Right = this.pop();
		this.push(Node.VarToken.ParsedText + " = " + Right + Block);
	}

	// 
	// public void EnterBlock(BlockNode Node) {
	// this.PushProgramSize();
	// this.indentGenerator.indent(1);
	// }
	//
	// 
	// public boolean ExitBlock(BlockNode Node) {
	// IndentGenerator g = this.indentGenerator;
	// int Size = this.getProgramSize() - this.PopProgramSize();
	// this.push("{\n" + g.get()
	// + this.PopNReverseAndJoin(Size, ";\n" + g.get()) + ";\n"
	// + g.indentAndGet(-1) + "}");
	// }

	
	public void VisitIf(IfNode Node) {
		Node.CondExpr.Evaluate(this);
		this.VisitBlock(Node.ThenNode);
		this.VisitBlock(Node.ElseNode);

		String ElseBlock = this.pop();
		String ThenBlock = this.pop();
		String CondExpr = this.pop();
		String source = "if(" + CondExpr + ") " + ThenBlock;
		if(Node.ElseNode != null) {
			source = source + " else " + ElseBlock;
		}
		this.push(source);
	}

	
	public void VisitSwitch(SwitchNode Node) {
//		Node..CondExpr.Evaluate(this);
//		for(int i = 0; i < Node.Blocks.size(); i++) {
//			TypedNode Block = (TypedNode) Node.Blocks.get(i);
//			this.VisitList(Block);
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

	
	public void VisitLoop(LoopNode Node) {
		Node.CondExpr.Evaluate(this);
		Node.IterExpr.Evaluate(this);
		this.VisitBlock(Node.LoopBody);
		String LoopBody = this.pop();
		String IterExpr = this.pop();
		String CondExpr = this.pop();
		this.push("while(" + CondExpr + ") {" + LoopBody + IterExpr + "}");
		return;

	}

	
	public void VisitReturn(ReturnNode Node) {
		Node.Expr.Evaluate(this);
		String Expr = this.pop();
		this.push("return " + Expr);
		return;
	}

	
	public void VisitLabel(LabelNode Node) {
		String Label = Node.Label;
		if(Label.compareTo("continue") == 0) {
			this.push("");
		} else if(Label.compareTo("continue") == 0) {
			this.push("");
		} else {
			this.push(Label + ":");
		}
		return;
	}

	
	public void VisitJump(JumpNode Node) {
		String Label = Node.Label;
		if(Label.compareTo("continue") == 0) {
			this.push("continue;");
		} else if(Label.compareTo("continue") == 0) {
			this.push("break;");
		} else {
			this.push("goto " + Label);
		}
		return;
	}

	
	public void VisitTry(TryNode Node) {
		this.VisitBlock(Node.TryBlock);
//		for(int i = 0; i < Node.CatchBlock.size(); i++) {
//			TypedNode Block = (TypedNode) Node.CatchBlock.get(i);
//			TypedNode Exception = (TypedNode) Node.TargetException.get(i);
//			this.VisitBlock(Block);
//		}
		this.VisitBlock(Node.FinallyBlock);

		String FinallyBlock = this.pop();
		String CatchBlocks = "";//this.PopNReverseWithPrefix(Node.CatchBlock.size(), "catch() ");
		String TryBlock = this.pop();
		this.push("try " + TryBlock + "" + CatchBlocks + "finally " + FinallyBlock);
		return;
	}

	
	public void VisitThrow(ThrowNode Node) {
		Node.Expr.Evaluate(this);
		String Expr = this.pop();
		this.push("throw " + Expr);
		return;
	}

	
	public void VisitFunction(FunctionNode Node) {
		// TODO Auto-generated method stub
		return;
	}

	
	public void VisitError(ErrorNode Node) {
		String Expr = Node.toString();
		this.push("throw new Exception(" + Expr + ")");
		return;
	}


	// This must be extended in each language
	public Object Eval(TypedNode Node) {
		VisitBlock(Node);
		return null;
	}

}

