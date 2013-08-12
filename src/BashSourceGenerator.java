//ifdef JAVA
import java.util.ArrayList;
//endif VAJA

//GreenTea Generator should be written in each language.

public class BashSourceGenerator extends SourceGenerator {
	/*field*/boolean inFunc = false;

	BashSourceGenerator/*constructor*/() {
		super("BashSource");
		this.WriteTranslatedCode("#!/bin/bash\n");
	}

	public void VisitBlockWithIndent(GtNode Node, boolean inBlock) {
		/*local*/String Code = "";
		if(inBlock) {
			this.Indent();
		}
		/*local*/GtNode CurrentNode = Node;
		while(CurrentNode != null) {
			CurrentNode.Evaluate(this);
			/*local*/String poppedCode = this.PopSourceCode();
			if(!poppedCode.equals("")) {
				Code += this.GetIndentString() + poppedCode + "\n";
			}
			CurrentNode = CurrentNode.NextNode;
		}
		if(inBlock) {
			this.UnIndent();
			Code += this.GetIndentString();
		}
		else {
			if(Code.length() > 0) {
				Code = Code.substring(0, Code.length() - 1);
			}
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
		// not support
	}

	@Override public void VisitWhileNode(WhileNode Node) {
		Node.CondExpr.Evaluate(this);
		/*local*/String Program = "while " + this.PopSourceCode() + " ;do\n";
		this.VisitBlockWithIndent(Node.LoopBody, true);
		Program += this.PopSourceCode() + "done";
		this.PushSourceCode(Program);
	}

	@Override public void VisitDoWhileNode(DoWhileNode Node) {
		this.VisitBlockWithIndent(Node.LoopBody, true);
		/*local*/String LoopBody = this.PopSourceCode();
		/*local*/String Program = "if true ;then\n" + LoopBody + "fi\n";
		Node.CondExpr.Evaluate(this);
		Program += "while " + this.PopSourceCode() + " ;do\n";
		Program += LoopBody + "done";
		this.PushSourceCode(Program);
	}

	@Override public void VisitForNode(ForNode Node) {
		Node.IterExpr.Evaluate(this);
		Node.CondExpr.Evaluate(this);
		/*local*/String Cond = this.PopSourceCode();
		/*local*/String Iter = this.PopSourceCode();
		
		/*local*/String Program = "for((; " + Cond  + "; " + Iter + " )) ;do\n";
		this.VisitBlockWithIndent(Node.LoopBody, true);
		Program += this.PopSourceCode() + "done";
		this.PushSourceCode(Program);
	}

	@Override public void VisitForEachNode(ForEachNode Node) {
		Node.IterExpr.Evaluate(this);
		Node.Variable.Evaluate(this);
		/*local*/String Variable = this.PopSourceCode();
		/*local*/String Iter = this.PopSourceCode();
		
		/*local*/String Program = "for " + Variable + " in " + "${" + Iter + "[@]} ;do/n";
		this.VisitBlockWithIndent(Node.LoopBody, true);
		Program += this.PopSourceCode() + "done";
		this.PushSourceCode(Program);
	}

	@Override public void VisitConstNode(ConstNode Node) {
		/*local*/String value = this.StringfyConstValue(Node.ConstValue);

		if(Node.Type.equals(Node.Type.Context.BooleanType)) {
			if(value.equals("true")) {
				value = "0";
			}
			else if(value.equals("false")) {
				value = "1";
			}
		}
		this.PushSourceCode(value);
	}

	@Override public void VisitNewNode(NewNode Node) {
//		/*local*/String Type = Node.Type.ShortClassName;
//		this.PushSourceCode("new " + Type);
	}

	@Override public void VisitNullNode(NullNode Node) {
		this.PushSourceCode("NULL");
	}

	@Override public void VisitLocalNode(LocalNode Node) {
		this.PushSourceCode(Node.LocalName);
	}

	@Override public void VisitGetterNode(GetterNode Node) {
		// not support
	}

	private String[] EvaluateParam(ArrayList<GtNode> Params) {
		/*local*/int Size = Params.size();
		/*local*/String[] Programs = new String[Size];
		/*local*/int i = 0;
		while(i < Size) {
			/*local*/GtNode Node = Params.get(i);
			Node.Evaluate(this);
			Programs[Size - i - 1] = this.ResolveValueType(Node, this.PopSourceCode());
			i = i + 1;
		}
		return Programs;
	}

	@Override public void VisitApplyNode(ApplyNode Node) {
		/*local*/String Program = Node.Method.MethodName + " ";
		/*local*/String[] Params = this.EvaluateParam(Node.Params);
		/*local*/int i = 0;
		while(i < Params.length) {
			/*local*/String P = Params[i];
			if(i != 0) {
				Program += " ";
			}
			Program += P;
			i = i + 1;
		}
		this.PushSourceCode(Program);
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
		this.PushSourceCode("((" + this.PopSourceCode() + MethodName + "))");
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
		this.PushSourceCode("((" + MethodName + this.PopSourceCode() + "))");
	}

	@Override public void VisitBinaryNode(BinaryNode Node) {
		/*local*/String MethodName = Node.Token.ParsedText;
		if(Node.Type.equals(Node.Type.Context.StringType)) {
			Node.RightNode.Evaluate(this);
			Node.LeftNode.Evaluate(this);

			if(MethodName.equals("+")) {
				this.PushSourceCode(this.PopSourceCode() + this.PopSourceCode());
				return;
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
			/*local*/String left = this.ResolveValueType(Node.LeftNode, this.PopSourceCode());
			/*local*/String right = this.ResolveValueType(Node.RightNode, this.PopSourceCode());
			this.PushSourceCode("((" + this.PopSourceCode() + " " + left  + " " + right + "))");
			return;
		}

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
		/*local*/String left = this.ResolveValueType(Node.LeftNode, this.PopSourceCode());
		/*local*/String right = this.ResolveValueType(Node.RightNode, this.PopSourceCode());
		
//		if(Node.Type.equals(Node.Type.Context.Float)) {	// support float value
//			this.PushSourceCode("(echo \"scale=10; " + left + " " + MethodName + " " + right + "\" | bc)");
//			return;
//		}
		
		this.PushSourceCode("((" + left + " " + MethodName + " " + right + "))");
	}

	@Override public void VisitAndNode(AndNode Node) {
		Node.RightNode.Evaluate(this);
		Node.LeftNode.Evaluate(this);
		this.PushSourceCode("(" + this.PopSourceCode() + " && " + this.PopSourceCode() + ")");
	}

	@Override public void VisitOrNode(OrNode Node) {
		Node.RightNode.Evaluate(this);
		Node.LeftNode.Evaluate(this);
		this.PushSourceCode("(" + this.PopSourceCode() + " || " + this.PopSourceCode() + ")");
	}

	@Override public void VisitAssignNode(AssignNode Node) {
		Node.RightNode.Evaluate(this);
		Node.LeftNode.Evaluate(this);
		/*local*/String left = this.PopSourceCode();
		/*local*/String code = this.PopSourceCode();
		/*local*/String right = this.ResolveValueType(Node.RightNode, code);

		this.PushSourceCode(left + "=" + right);
	}

	@Override public void VisitLetNode(LetNode Node) {
		/*local*/String VarName = Node.VariableName;
		/*local*/String Code = "";
		if(this.inFunc) {
			Code += "local " + VarName + "\n" + this.GetIndentString();
		}
		Code += VarName;
		if(Node.InitNode != null) {
			Node.InitNode.Evaluate(this);
			Code += "=" + this.ResolveValueType(Node.InitNode, this.PopSourceCode());
		}
		Code +=  "\n";
		this.VisitBlockWithIndent(Node.BlockNode, false);
		this.PushSourceCode(Code + this.PopSourceCode());
	}

	@Override public void VisitIfNode(IfNode Node) {
		Node.CondExpr.Evaluate(this);
		this.VisitBlockWithIndent(Node.ThenNode, true);
		this.VisitBlockWithIndent(Node.ElseNode, true);
		
		/*local*/String ElseBlock = this.PopSourceCode();
		/*local*/String ThenBlock = this.PopSourceCode();
		/*local*/String CondExpr = this.PopSourceCode();
		/*local*/String Code = "if " + CondExpr + " ;then\n" + ThenBlock;
		if(Node.ElseNode != null) {
			Code += "else\n" + ElseBlock;
		}
		Code += "fi";
		this.PushSourceCode(Code);
	}

	@Override public void VisitSwitchNode(SwitchNode Node) {
	}

	@Override public void VisitReturnNode(ReturnNode Node) {
		if(this.inFunc && Node.Expr != null) {
			Node.Expr.Evaluate(this);
			/*local*/String expr = this.PopSourceCode();
			/*local*/String ret = this.ResolveValueType(Node.Expr, expr);
			this.PushSourceCode("echo " + ret + "\n" + this.GetIndentString() + "return 0");
		}
	}

	@Override public void VisitLabelNode(LabelNode Node) {
	}

	@Override public void VisitJumpNode(JumpNode Node) {
	}

	@Override public void VisitBreakNode(BreakNode Node) {
		/*local*/String Code = "break";	// not support label
		this.PushSourceCode(Code);
	}

	@Override public void VisitContinueNode(ContinueNode Node) {
		/*local*/String Code = "continue";	// not support label
		this.PushSourceCode(Code);
	}

	@Override public void VisitTryNode(TryNode Node) {
//		/*local*/String Code = "try";
//		//this.VisitEach(Node.CatchBlock);
//		this.VisitEach(Node.TryBlock);
//		Code += this.PopSourceCode();
//		if(Node.FinallyBlock != null) {
//			this.VisitEach(Node.FinallyBlock);
//			Code += " finally " + this.PopSourceCode();
//		}
//		this.PushSourceCode(Code);
	}

	@Override public void VisitThrowNode(ThrowNode Node) {
//		Node.Expr.Evaluate(this);
//		String Code = "throw " + this.PopSourceCode();
//		this.PushSourceCode(Code);
	}

	@Override public void VisitFunctionNode(FunctionNode Node) {
	}

	@Override public void VisitErrorNode(ErrorNode Node) {
//		/*local*/String Code = "throw Error(\"" + Node.Token.ParsedText + "\")";
//		this.PushSourceCode(Code);
	}

	@Override public void VisitCommandNode(CommandNode Node) {	// currently only support statement
		/*local*/String Code = "";
		/*local*/int count = 0;
		/*local*/CommandNode CurrentNode = Node;
		while(CurrentNode != null) {
			if(count > 0) {
				Code += " | ";
			}
			Code += this.CreateCommand(CurrentNode);
			count += 1;
			CurrentNode = (/*cast*/CommandNode) CurrentNode.PipedNextNode;
		}
		this.PushSourceCode(Code);
		
		//sample
//		function f() {
//			echo -e "$(pstree -p | grep firefox)" >&2
//			echo "ret sucess"
//		}
//
//		ret=$(f)
		
	}

	private String CreateCommand(CommandNode CurrentNode) {
		/*local*/String Code = "";
		/*local*/int size = CurrentNode.Params.size();
		/*local*/int i = 0;
		while(i < size) {
			CurrentNode.Params.get(i).Evaluate(this);
			Code += this.PopSourceCode() + " ";
			i = i + 1;
		}
		return Code;
	}

	private GtNode ResolveParamName(ArrayList<String> ParamNameList, GtNode Body) {
		return this.ConvertParamName(ParamNameList, Body, 0);
	}

	private GtNode ConvertParamName(ArrayList<String> ParamNameList, GtNode Body, int index) {
		if(index  == ParamNameList.size()) {
			return Body;
		}

		/*local*/GtNode oldVarNode = new LocalNode(null, null, "" +(index + 1));
		GtNode Let = new LetNode(null, null, null, ParamNameList.get(index), oldVarNode, null);
		Let.NextNode = this.ConvertParamName(ParamNameList, Body, index+1);
		return Let;
	}

	private String ResolveValueType(GtNode TargetNode, String value) {
		/*local*/String resolvedValue;
		
		if(TargetNode instanceof ConstNode || TargetNode instanceof NullNode) {
			resolvedValue = value;
		}
		else if(TargetNode instanceof IndexerNode) {
			resolvedValue = "${" + value + "}";
		}
		else if(TargetNode instanceof ApplyNode || TargetNode instanceof CommandNode) {
			resolvedValue = "$(" + value + ")";
		}
		else {
			resolvedValue = "$" + value;
		}
		return resolvedValue;
	}

	@Override public void DefineFunction(GtMethod Method, ArrayList<String> ParamNameList, GtNode Body) {
		/*local*/String Function = "function ";
		this.inFunc = true;
		Function += Method.MethodName + "() {\n";
		this.VisitBlockWithIndent(this.ResolveParamName(ParamNameList, Body), true);
		Function += this.PopSourceCode() + "}\n";
		this.WriteTranslatedCode(Function);
		this.inFunc = false;
	}

	@Override public Object Eval(GtNode Node) {
		this.VisitBlockWithIndent(Node, false);
		/*local*/String Code = this.PopSourceCode();
		if(Code.equals("")) {
			return "";
		}
		this.WriteTranslatedCode(Code);
		return Code;
	}

	@Override public void AddClass(GtType Type) {
	}

	@Override public void SetLanguageContext(GtContext Context) {
	}
}