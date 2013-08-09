/// <reference path="LangDeps.ts" />


//Generator: GreenTeabe: shouldin: writtenlanguage: each. //

class JavaSourceGenerator extends SourceGenerator {
	constructor() {
		super("Java");
	}

	public VisitBlockEachStatementWithIndent(Node: GtNode): void {
		var Code: string = "{\n";
		this.Indent();
		var CurrentNode: GtNode = Node;
		while(CurrentNode != null) {
			CurrentNode.Evaluate(this);
			Code += this.GetIndentString() + this.PopSourceCode() + ";\n";
			CurrentNode = CurrentNode.NextNode;
		}
		this.UnIndent();
		Code += this.GetIndentString() + "}";
		this.PushSourceCode(Code);
	}

	public VisitEmptyNode(Node: GtNode): void {
	}

	public VisitSuffixNode(Node: SuffixNode): void {
		var MethodName: string = Node.Token.ParsedText;

		if(MethodName.equals("++")) {
		}
		else if(MethodName.equals("--")) {
		}
		Node.Expr.Evaluate(this);
		this.PushSourceCode(this.PopSourceCode() + MethodName);
	}

	public VisitUnaryNode(Node: UnaryNode): void {
		var MethodName: string = Node.Token.ParsedText;
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
		Node.Expr.Evaluate(this);
		this.PushSourceCode(MethodName + this.PopSourceCode());
	}

	public VisitIndexerNode(Node: IndexerNode): void {
		Node.Indexer.Evaluate(this);
		Node.Expr.Evaluate(this);
		this.PushSourceCode(this.PopSourceCode() + "[" + this.PopSourceCode() + "]");
	}

	public VisitMessageNode(Node: MessageNode): void {
		// Auto: TODO-generatedstub: method //

	}

	public VisitWhileNode(Node: WhileNode): void {
		Node.CondExpr.Evaluate(this);
		var Program: string = "while(" + this.PopSourceCode() + ")";
		this.VisitBlockEachStatementWithIndent(Node.LoopBody);
		Program += this.PopSourceCode();
		this.PushSourceCode(Program);
	}

	public VisitDoWhileNode(Node: DoWhileNode): void {
		var Program: string = "do";
		this.VisitBlockEachStatementWithIndent(Node.LoopBody);
		Node.CondExpr.Evaluate(this);
		Program += " while(" + this.PopSourceCode() + ")";
		this.PushSourceCode(Program);
	}

	public VisitForNode(Node: ForNode): void {
		Node.IterExpr.Evaluate(this);
		Node.CondExpr.Evaluate(this);
		var Cond: string = this.PopSourceCode();
		var Iter: string = this.PopSourceCode();

		var Program: string = "for(; " + Cond  + "; " + Iter + ")";
		Node.LoopBody.Evaluate(this);
		Program += this.PopSourceCode();
		this.PushSourceCode(Program);
	}

	public VisitForEachNode(Node: ForEachNode): void {
		// Auto: TODO-generatedstub: method //

	}

	public VisitConstNode(Node: ConstNode): void {
		this.PushSourceCode(Node.ConstValue.toString());
	}

	public VisitNewNode(Node: NewNode): void {
		var Type: string = Node.Type.ShortClassName;
		this.PushSourceCode("new " + Type);
	}

	public VisitNullNode(Node: NullNode): void {
		this.PushSourceCode("NULL");
	}

	public VisitLocalNode(Node: LocalNode): void {
		this.PushSourceCode(Node.LocalName);
	}

	public VisitGetterNode(Node: GetterNode): void {
		Node.Expr.Evaluate(this);
		this.PushSourceCode(this.PopSourceCode() + "." + Node.Method.MethodName);
	}

	private EvaluateParam(Params: Array<GtNode>): string[] {
		var Size: number = Params.size();
		var Programs: string[] = new Array<string>(Size);
		for(var i: number = 0; i < Size; i++) {
			var Node: GtNode = Params.get(i);
			Node.Evaluate(this);
			Programs[Size - i - 1] = this.PopSourceCode();
		}
		return Programs;
	}

	public VisitApplyNode(Node: ApplyNode): void {
		var Program: string = Node.Method.MethodName + "(";
		var Params: string[] = this.EvaluateParam(Node.Params);
		for(var i: number = 0; i < Params.length; i++) {
			var P: string = Params[i];
			if(i != 0) {
				Program += ",";
			}
			Program += P;
		}
		Program += ")";
		this.PushSourceCode(Program);
	}

	public VisitBinaryNode(Node: BinaryNode): void {
		var MethodName: string = Node.Token.ParsedText;
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
		Node.RightNode.Evaluate(this);
		Node.LeftNode.Evaluate(this);
		/*TOO: FIXMEPARENTHESIS: MANY */
		this.PushSourceCode("(" + this.PopSourceCode() + " " + MethodName + " " + this.PopSourceCode() + ")");
	}

	public VisitAndNode(Node: AndNode): void {
		Node.RightNode.Evaluate(this);
		Node.LeftNode.Evaluate(this);
		this.PushSourceCode(this.PopSourceCode() + " && " + this.PopSourceCode());
	}

	public VisitOrNode(Node: OrNode): void {
		Node.RightNode.Evaluate(this);
		Node.LeftNode.Evaluate(this);
		this.PushSourceCode(this.PopSourceCode() + " || " + this.PopSourceCode());
	}

	public VisitAssignNode(Node: AssignNode): void {
		Node.RightNode.Evaluate(this);
		Node.LeftNode.Evaluate(this);
		this.PushSourceCode(this.PopSourceCode() + " = " + this.PopSourceCode());
	}

	public VisitLetNode(Node: LetNode): void {
		var Type: string = Node.DeclType.ShortClassName;
		Node.VarNode.Evaluate(this);
		var Code: string = Type + " " + this.PopSourceCode();
		Node.BlockNode.Evaluate(this);
		this.PushSourceCode(Code + this.PopSourceCode());
	}

	public VisitIfNode(Node: IfNode): void {
		Node.CondExpr.Evaluate(this);
		this.VisitBlockEachStatementWithIndent(Node.ThenNode);
		this.VisitBlockEachStatementWithIndent(Node.ElseNode);

		var ElseBlock: string = this.PopSourceCode();
		var ThenBlock: string = this.PopSourceCode();
		var CondExpr: string = this.PopSourceCode();
		var Code: string = "if(" + CondExpr + ") " + ThenBlock;
		if(Node.ElseNode != null) {
			Code += " else " + ElseBlock;
		}
		this.PushSourceCode(Code);

	}

	public VisitSwitchNode(Node: SwitchNode): void {
		// Auto: TODO-generatedstub: method //

	}

	public VisitReturnNode(Node: ReturnNode): void {
		var Code: string = "return";
		if(Node.Expr != null) {
			Node.Expr.Evaluate(this);
			Code += " " + this.PopSourceCode();
		}
		this.PushSourceCode(Code);
	}

	public VisitLabelNode(Node: LabelNode): void {
		var Label: string = Node.Label;
		this.PushSourceCode(Label + ":");
	}

	public VisitJumpNode(Node: JumpNode): void {
		var Label: string = Node.Label;
		this.PushSourceCode("goto " + Label);
	}

	public VisitBreakNode(Node: BreakNode): void {
		var Code: string = "break";
		var Label: string = Node.Label;
		if(Label != null) {
			Code += " " + Label;
		}
		this.PushSourceCode(Code);
	}

	public VisitContinueNode(Node: ContinueNode): void {
		var Code: string = "continue";
		var Label: string = Node.Label;
		if(Label != null) {
			Code += " " + Label;
		}
		this.PushSourceCode(Code);
	}

	public VisitTryNode(Node: TryNode): void {
		var Code: string = "try";
		// this.VisitEach(Node.CatchBlock); //
		this.VisitBlockEachStatementWithIndent(Node.TryBlock);
		Code += this.PopSourceCode();
		if(Node.FinallyBlock != null) {
			this.VisitBlockEachStatementWithIndent(Node.FinallyBlock);
			Code += " finally " + this.PopSourceCode();
		}
		this.PushSourceCode(Code);
	}

	public VisitThrowNode(Node: ThrowNode): void {
		Node.Expr.Evaluate(this);
		var Code: string = "throw " + this.PopSourceCode();
		this.PushSourceCode(Code);
	}

	public VisitFunctionNode(Node: FunctionNode): void {
		// Auto: TODO-generatedstub: method //

	}

	public VisitErrorNode(Node: ErrorNode): void {
		var Code: string = "throw RuntimeError(\"" + Node.Token.ParsedText + "\")";
		this.PushSourceCode(Code);
	}

	public DefineFunction(Method: GtMethod, ParamNameList: Array<string>, Body: GtNode): void {
		// FIXME //
		var Program: string = "";
		var RetTy: string = Method.GetReturnType().ShortClassName;
		var ThisTy: string = Method.GetRecvType().ShortClassName;
		Program += RetTy + " " + ThisTy + "_" + Method.LocalFuncName + "(";
		Program += ThisTy + " " + "this";
		for(var i: number = 0; i < ParamNameList.size(); i++) {
			var ParamTy: string = Method.GetParamType(i).ShortClassName;
			Program += " ," + ParamTy + " " + ParamNameList.get(i);
		}

		Program += this.Eval(Body);
		this.WriteTranslatedCode(Program);
	}

	public Eval(Node: GtNode): Object {
		// FIXME //
		this.VisitBlockEachStatementWithIndent(Node);
		return this.PopSourceCode();
	}

	public AddClass(Type: GtType): void {
		// FIXME //
		// Auto: TODO-generatedstub: method //

	}

	public SetLanguageContext(Context: GtContext): void {
	}
}
