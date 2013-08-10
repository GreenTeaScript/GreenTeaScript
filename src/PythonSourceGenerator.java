//ifdef JAVA
import java.util.ArrayList;
//endif VAJA

//GreenTea Generator should be written in each language.

public class PythonSourceGenerator extends SourceGenerator {

	PythonSourceGenerator/*constructor*/() {
		super("PythonSource");
	}

	public void VisitBlockWithIndent(GtNode Node) {
		/*local*/String Code = "";
		this.Indent();
		/*local*/GtNode CurrentNode = Node;
		while(CurrentNode != null) {
			CurrentNode.Evaluate(this);
			Code += this.GetIndentString() + this.PopSourceCode() + "\n";
			CurrentNode = CurrentNode.NextNode;
		}
		this.UnIndent();
		Code += this.GetIndentString();
		this.PushSourceCode(Code);
	}
	
	public void VisitBlockWithoutIndent(GtNode Node) {
		/*local*/String Code = "";
		/*local*/GtNode CurrentNode = Node;
		while(CurrentNode != null) {
			CurrentNode.Evaluate(this);
			Code += this.GetIndentString() + this.PopSourceCode() + "\n";
			CurrentNode = CurrentNode.NextNode;
		}
		
		if(Code.length() > 0) {
			Code = Code.substring(0, Code.length() - 1);
		}
		this.PushSourceCode(Code);
	}

	@Override public void VisitEmptyNode(GtNode Node) {
	}

	@Override public void VisitIndexerNode(IndexerNode Node) {
		Node.Indexer.Evaluate(this);
		Node.Expr.Evaluate(this);
		this.PushSourceCode(this.PopSourceCode() + "[" + this.PopSourceCode() + "]");
	}

	@Override public void VisitMessageNode(MessageNode Node) {
	}

	@Override public void VisitWhileNode(WhileNode Node) {
//		Node.CondExpr.Evaluate(this);
//		/*local*/String Program = "while " + this.PopSourceCode() + " ;do";
//		this.VisitBlockWithIndent(Node.LoopBody);
//		Program += this.PopSourceCode() + "done";
//		this.PushSourceCode(Program);
	}

	@Override public void VisitDoWhileNode(DoWhileNode Node) {
		
	}

	@Override public void VisitForNode(ForNode Node) {
//		Node.IterExpr.Evaluate(this);
//		Node.CondExpr.Evaluate(this);
//		/*local*/String Cond = this.PopSourceCode();
//		/*local*/String Iter = this.PopSourceCode();
//		
//		/*local*/String Program = "for((; " + Cond  + "; " + Iter + " )) ;do";
//		this.VisitBlockWithIndent(Node.LoopBody);
//		Program += this.PopSourceCode() + "done";
//		this.PushSourceCode(Program);
	}

	@Override public void VisitForEachNode(ForEachNode Node) {
		Node.Variable.Evaluate(this);
		Node.IterExpr.Evaluate(this);
		/*local*/String Iter = this.PopSourceCode();
		/*local*/String Variable = this.PopSourceCode();
		
		/*local*/String Program = "for " + Variable + " in " + Iter + ":\n";
		this.VisitBlockWithIndent(Node.LoopBody);
		Program += this.PopSourceCode();
		this.PushSourceCode(Program);
	}

	@Override public void VisitConstNode(ConstNode Node) {
		/*local*/String value = this.StringfyConstValue(Node.ConstValue);
		this.PushSourceCode(value);
	}

	@Override public void VisitNewNode(NewNode Node) {
//		/*local*/String Type = Node.Type.ShortClassName;
//		this.PushSourceCode("new " + Type);
	}

	@Override public void VisitNullNode(NullNode Node) {
//		this.PushSourceCode("NULL");
	}

	@Override public void VisitLocalNode(LocalNode Node) {
		this.PushSourceCode(Node.LocalName);
	}

	@Override public void VisitGetterNode(GetterNode Node) {
		
	}

	private String[] EvaluateParam(ArrayList<GtNode> Params) {
		/*local*/int Size = Params.size();
		/*local*/String[] Programs = new String[Size];
		/*local*/int i = 0;
		while(i < Size) {
			/*local*/GtNode Node = Params.get(i);
			Node.Evaluate(this);
			Programs[Size - i - 1] = this.PopSourceCode();
			i = i + 1;
		}
		return Programs;
	}

	@Override public void VisitApplyNode(ApplyNode Node) {
		/*local*/String Program = Node.Method.MethodName + "(";
		/*local*/String[] Params = this.EvaluateParam(Node.Params);
		/*local*/int i = 0;
		while(i < Params.length) {
			/*local*/String P = Params[i];
			if(i != 0) {
				Program += ", ";
			}
			Program += P;
			i = i + 1;
		}
		this.PushSourceCode(Program + ")");
	}

	@Override public void VisitSuffixNode(SuffixNode Node) {
		/*local*/String MethodName = Node.Token.ParsedText;
		if(MethodName.equals("++")) {
		}
		else if(MethodName.equals("--")) {
		}
		else {
			LangDeps.DebugP(MethodName + " is not supported suffix operator!!");
		}
		Node.Expr.Evaluate(this);
		this.PushSourceCode(this.PopSourceCode() + MethodName);
	}

	@Override public void VisitUnaryNode(UnaryNode Node) {
		/*local*/String MethodName = Node.Token.ParsedText;
		if(MethodName.equals("+")) {
		}
		else if(MethodName.equals("-")) {
		}
		else if(MethodName.equals("~")) {
		}
		else if(MethodName.equals("!")) {
		}
		else if(MethodName.equals("++")) {
		}
		else if(MethodName.equals("--")) {
		}
		else {
			LangDeps.DebugP(MethodName + " is not supported unary operator!!");
		}
		Node.Expr.Evaluate(this);
		this.PushSourceCode(MethodName + this.PopSourceCode());
	}

	@Override public void VisitBinaryNode(BinaryNode Node) {
		/*local*/String MethodName = Node.Token.ParsedText;
		if(MethodName.equals("+")) {
		}
		else if(MethodName.equals("-")) {
		}
		else if(MethodName.equals("*")) {
		}
		else if(MethodName.equals("/")) {
		}
		else if(MethodName.equals("%")) {
		}
		else if(MethodName.equals("<<")) {
		}
		else if(MethodName.equals(">>")) {
		}
		else if(MethodName.equals("&")) {
		}
		else if(MethodName.equals("|")) {
		}
		else if(MethodName.equals("^")) {
		}
		else if(MethodName.equals("<=")) {
		}
		else if(MethodName.equals("<")) {
		}
		else if(MethodName.equals(">=")) {
		}
		else if(MethodName.equals(">")) {
		}
		else if(MethodName.equals("!=")) {
		}
		else if(MethodName.equals("==")) {
		}
		else {
			LangDeps.DebugP(MethodName + " is not supported binary operator!!");
		}
		Node.RightNode.Evaluate(this);
		Node.LeftNode.Evaluate(this);
		this.PushSourceCode(this.PopSourceCode() + " " + MethodName + " " + this.PopSourceCode());
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
//		Node.VarNode.Evaluate(this);
//		/*local*/String Code = this.PopSourceCode();
//		this.VisitBlockWithoutIndent(Node.BlockNode);
//
//		/*local*/String head = "";
//		if(this.inFunc) {
//			head = "local ";
//		}
//		this.PushSourceCode(head + Code + "\n" + this.PopSourceCode());
	}

	@Override public void VisitIfNode(IfNode Node) {
		Node.CondExpr.Evaluate(this);
		this.VisitBlockWithIndent(Node.ThenNode);
		this.VisitBlockWithIndent(Node.ElseNode);
		
		/*local*/String ElseBlock = this.PopSourceCode();
		/*local*/String ThenBlock = this.PopSourceCode();
		/*local*/String CondExpr = this.PopSourceCode();
		/*local*/String Code = "if " + CondExpr + ":\n" + ThenBlock;
		if(Node.ElseNode != null) {
			Code += "else:\n" + ElseBlock;
		}
		this.PushSourceCode(Code);
	}

	@Override public void VisitSwitchNode(SwitchNode Node) {
	}

	@Override public void VisitReturnNode(ReturnNode Node) {
		/*local*/String retValue = "";
		if(Node.Expr != null) {
			Node.Expr.Evaluate(this);
			retValue = this.PopSourceCode();
		}
		this.PushSourceCode("return " + retValue);
	}

	@Override public void VisitLabelNode(LabelNode Node) {
	}

	@Override public void VisitJumpNode(JumpNode Node) {
	}

	@Override public void VisitBreakNode(BreakNode Node) {
		/*local*/String Code = "break";
		this.PushSourceCode(Code);
	}

	@Override public void VisitContinueNode(ContinueNode Node) {
		/*local*/String Code = "continue";
		this.PushSourceCode(Code);
	}

	@Override public void VisitTryNode(TryNode Node) { //TODO: catch block
		/*local*/String Code = "try:\n";
		this.VisitBlockWithIndent(Node.TryBlock);
		Code += this.PopSourceCode();
		
//		if(Node.FinallyBlock != null) {
//			this.VisitEach(Node.FinallyBlock);
//			Code += " finally " + this.PopSourceCode();
//		}
		this.PushSourceCode(Code);
	}

	@Override public void VisitThrowNode(ThrowNode Node) {
		/*local*/String expr = "";
		if(Node.Expr != null) {
			Node.Expr.Evaluate(this);
			expr = this.PopSourceCode();
		}
		this.PushSourceCode("raise " + expr);
	}

	@Override public void VisitFunctionNode(FunctionNode Node) {
	}

	@Override public void VisitErrorNode(ErrorNode Node) {
		/*local*/String Code = "raise Error(\"" + Node.Token.ParsedText + "\")";
		this.PushSourceCode(Code);
	}

	@Override public void VisitCommandNode(CommandNode Node) {	// currently only support statement
//		/*local*/String Code = "";
//		/*local*/int count = 0;
//		/*local*/CommandNode CurrentNode = Node;
//		while(CurrentNode != null) {
//			if(count > 0) {
//				Code += " | ";
//			}
//			Code += this.CreateCommand(CurrentNode);
//			count++;
//			CurrentNode = (/*cast*/CommandNode) CurrentNode.PipedNextNode;
//		}
//		this.PushSourceCode(Code);
	}

//	private String CreateCommand(CommandNode CurrentNode) {
//		/*local*/String Code = "";
//		/*local*/int size = CurrentNode.Params.size();
//		/*local*/int i = 0;
//		while(i < size) {
//			CurrentNode.Params.get(i).Evaluate(this);
//			Code += this.PopSourceCode() + " ";
//			i = i + 1;
//		}
//		return Code;
//	}

	@Override public void DefineFunction(GtMethod Method, ArrayList<String> ParamNameList, GtNode Body) {
		/*local*/String Function = "def ";
		Function += Method.MethodName + "(";
		/*local*/int i = 0;
		/*local*/int size = ParamNameList.size();
		while(i < size) {
			if(i > 0) {
				Function += ", ";
			}
			Function += ParamNameList.get(i);
			i = i + 1;
		}
		this.VisitBlockWithIndent(Body);
		Function += "):\n" + this.PopSourceCode();
		this.WriteTranslatedCode(Function);
	}

	@Override public Object Eval(GtNode Node) {
		this.VisitBlockWithoutIndent(Node);
		/*local*/String Code = this.PopSourceCode();
		this.WriteTranslatedCode(Code);
		return Code;
	}

	@Override public void AddClass(GtType Type) {
	}

	@Override public void SetLanguageContext(GtContext Context) {
	}
}
