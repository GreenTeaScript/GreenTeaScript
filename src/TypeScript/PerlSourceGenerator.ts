/// <reference path="LangDeps.ts" />


//Generator: GreenTeabe: shouldin: writtenlanguage: each. //

class PerlSourceGenerator extends SourceGenerator {
	constructor() {
		super("Perl");
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
		else {
			// throw new RuntimeException("NotSupportOperator"); //
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
		else {
			// throw new RuntimeException("NotSupportOperator"); //
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
		this.PushSourceCode("$" + Node.LocalName);
	}

	public VisitGetterNode(Node: GetterNode): void {
		Node.Expr.Evaluate(this);
		this.PushSourceCode(this.PopSourceCode() + "->" + Node.Method.MethodName);
	}

	private EvaluateParam(Params: Array<GtNode>): string[] {
		var Size: number = ListSize(Params);
		var Programs: string[] = new Array<string>(Size);
		var i: number = 0;
		while(i < Size) {
			var Node: GtNode = Params.get(i);
			Node.Evaluate(this);
			Programs[Size - i - 1] = this.PopSourceCode();
			i = i + 1;
		}
		return Programs;
	}

	public VisitApplyNode(Node: ApplyNode): void {
		var Program: string = Node.Method.GetLocalFuncName() + "(";
		var Params: string[] = this.EvaluateParam(Node.Params);
		var i: number = 0;
		while(i < Params.length) {
			var P: string = Params[i];
			if(i != 0) {
				Program += ",";
			}
			Program += P;
			i = i + 1;
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
			if(Node.Method.GetRecvType() == this.Context.StringType) {
				MethodName = "ne";
			}
		}
		else if(MethodName.equals("==")) {
			if(Node.Method.GetRecvType() == this.Context.StringType) {
				MethodName = "eq";
			}
		}
		else {
			// throw new RuntimeException("NotSupportOperator"); //
		}
		Node.RightNode.Evaluate(this);
		Node.LeftNode.Evaluate(this);
		this.PushSourceCode(this.PopSourceCode() + " " + MethodName + " " + this.PopSourceCode());
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
		// var Type: string = Node.DeclType.ShortClassName; //
		var VarName: string = Node.VariableName;
		var Code: string = "my " + VarName;
		if(Node.InitNode != null) {
			Node.InitNode.Evaluate(this);
			Code += " = " + this.PopSourceCode();
		}
		Code +=  ";\n";
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
		var Code: string = "throw Error(\"" + Node.Token.ParsedText + "\")";
		this.PushSourceCode(Code);

	}

	public VisitCommandNode(Node: CommandNode): void {
		var Code: string = "system(\"";
		var i: number = 0;
		while(i < Node.Params.size()) {
			var Param: GtNode = Node.Params.get(i);
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

	public DefineFunction(Method: GtMethod, ParamNameList: Array<string>, Body: GtNode): void {
		var Program: string = "";
		var RetTy: string = Method.GetReturnType().ShortClassName;
		var FuncName: string = Method.GetLocalFuncName();
		var Signature: string = "# ";
		var Arguments: string = "";
		Signature += RetTy + " " + FuncName + "(";
		this.Indent();
		var i: number = 0;
		while(i < ParamNameList.size()) {
			var ParamTy: string = Method.GetFuncParamType(i).ShortClassName;
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
		this.WriteTranslatedCode(Program);
	}

	public Eval(SingleNode: GtNode): Object {
		SingleNode.Evaluate(this);
		return this.PopSourceCode();
	}

	public AddClass(Type: GtType): void {
		// Auto: TODO-generatedstub: method //

	}

	public SetLanguageContext(Context: GtContext): void {
		// Auto: TODO-generatedstub: method //

	}

}
