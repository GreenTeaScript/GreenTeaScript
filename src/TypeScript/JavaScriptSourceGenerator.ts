/// <reference path="LangDeps.ts" />


class JavaScriptSourceGenerator extends SourceGenerator {

	constructor() {
		super("JavaScript");
	}

	UseLetKeyword: boolean;

	public DefineFunction(Method: GtMethod, NameList: Array<string>, Body: GtNode): void {
		var ArgCount: number = Method.Types.length - 1;
		var Code: string = "var " + Method.LocalFuncName + "= (function(";
		var i: number = 0;
		while(i < ArgCount){
			if(i > 0){
				Code = Code + ", ";
			}
			Code = Code + NameList.get(i);
			i = i + 1;
		}
		Code = Code + ") ";
		this.VisitBlockJS(Body);
		Code += this.PopSourceCode() + ")";
		this.PushSourceCode(Code);
		this.WriteTranslatedCode(Code);
	}

	public  VisitBlockJS(Node: GtNode): void {
		this.Indent();
		var highLevelIndent: string = this.GetIndentString();
		super.VisitBlock(Node);
		this.UnIndent();
		var Size: number = Node.CountForrowingNode();
		var Block: string = this.PopManyCodeAndJoin(Size, true, "\n" + highLevelIndent, ";", null);
		this.PushSourceCode("{" + Block + "\n" + this.GetIndentString() + "}");
	}

	public VisitConstNode(Node: ConstNode): void {
		this.PushSourceCode(Node.ConstValue == null ? "null" : Node.ConstValue.toString());
	}

	public VisitUnaryNode(UnaryNode: UnaryNode): void {
		UnaryNode.Expr.Evaluate(this);
		this.PushSourceCode(UnaryNode.Token.ParsedText + this.PopSourceCode());
	}

	public VisitBinaryNode(Node: BinaryNode): void {
		Node.RightNode.Evaluate(this);
		Node.LeftNode.Evaluate(this);
		var operator: string = Node.Token.ParsedText;
		if(operator.equals("/") /*&& Node.Type == Context.IntType*/ ){
			this.PushSourceCode("((" + this.PopSourceCode() + " " + operator + " " + this.PopSourceCode() + ") | 0)");
		}else{
			this.PushSourceCode("(" + this.PopSourceCode() + " " + operator + " " + this.PopSourceCode() + ")");
		}
	}

	public VisitNewNode(Node: NewNode): void {
		var i: number = 0;
		while(i < Node.Params.size()) {
			var Param: GtNode = Node.Params.get(i);
			Param.Evaluate(this);
			i = i + 1;
		}
		this.PushSourceCode("new " + Node.Type.ShortClassName + "()");
	}

	public VisitNullNode(Node: NullNode): void {
		this.PushSourceCode("null");
	}

	public VisitLocalNode(Node: LocalNode): void {
		this.PushSourceCode(Node.LocalName);
	}

	public VisitGetterNode(Node: GetterNode): void {
		Node.Expr.Evaluate(this);
		this.PushSourceCode(this.PopSourceCode() + "." + Node.Token.ParsedText);
	}

	public VisitIndexerNode(Node: IndexerNode): void {
		Node.Indexer.Evaluate(this);
		Node.Expr.Evaluate(this);
		this.PushSourceCode(this.PopSourceCode() + "." + Node.Token.ParsedText + "[" +this.PopSourceCode() + "]");
	}

	public VisitApplyNode(Node: ApplyNode): void {
		var methodName: string = Node.Method.LocalFuncName;
		var ParamCount: number = Node.Params.size();
		var i: number = 0;
		while(i < ParamCount) {
			Node.Params.get(i).Evaluate(this);
			i = i + 1;
		}
		var params: string = "(" + this.PopManyCodeAndJoin(ParamCount, true, null, null, ", ") + ")";
		this.PushSourceCode(methodName + params);
	}

	public VisitAndNode(Node: AndNode): void {
		Node.LeftNode.Evaluate(this);
		Node.RightNode.Evaluate(this);
		var Right: string = this.PopSourceCode();
		var Left: string = this.PopSourceCode();
		this.PushSourceCode(Left + " && " + Right);
	}

	public VisitOrNode(Node: OrNode): void {
		Node.LeftNode.Evaluate(this);
		Node.RightNode.Evaluate(this);
		var Right: string = this.PopSourceCode();
		var Left: string = this.PopSourceCode();
		this.PushSourceCode(Left + " || " + Right);
	}

	public VisitAssignNode(Node: AssignNode): void {
		Node.LeftNode.Evaluate(this);
		Node.RightNode.Evaluate(this);
		var Right: string = this.PopSourceCode();
		var Left: string = this.PopSourceCode();
		this.PushSourceCode((this.UseLetKeyword ? "let " : "var ") + Left + " = " + Right);
	}

	public VisitLetNode(Node: LetNode): void {
		this.VisitBlockJS(Node.BlockNode);
	}

	public VisitIfNode(Node: IfNode): void {
		Node.CondExpr.Evaluate(this);
		this.VisitBlockJS(Node.ThenNode);
		var ThenBlock: string = this.PopSourceCode();
		var CondExpr: string = this.PopSourceCode();
		var Source: string = "if(" + CondExpr + ") " + ThenBlock;
		if(Node.ElseNode != null) {
			this.VisitBlockJS(Node.ElseNode);
			Source = Source + " else " + this.PopSourceCode();
		}
		this.PushSourceCode(Source);
	}

	public VisitSwitchNode(Node: SwitchNode): void {
		// Auto: TODO-generatedstub: method //
	}

	public VisitWhileNode(Node: WhileNode): void {
		Node.CondExpr.Evaluate(this);
		this.VisitBlockJS(Node.LoopBody);
		var LoopBody: string = this.PopSourceCode();
		var CondExpr: string = this.PopSourceCode();
		this.PushSourceCode("while(" + CondExpr + ") {" + LoopBody + "}");
	}

	public VisitForNode(Node: ForNode): void {
		Node.CondExpr.Evaluate(this);
		Node.IterExpr.Evaluate(this);
		this.VisitBlockJS(Node.LoopBody);
		var LoopBody: string = this.PopSourceCode();
		var IterExpr: string = this.PopSourceCode();
		var CondExpr: string = this.PopSourceCode();
		this.PushSourceCode("for(;" + CondExpr + "; " + IterExpr + ") {" + LoopBody + "}");
	}

	public VisitDoWhileNode(Node: DoWhileNode): void {
		Node.CondExpr.Evaluate(this);
		this.VisitBlockJS(Node.LoopBody);
		var LoopBody: string = this.PopSourceCode();
		var CondExpr: string = this.PopSourceCode();
		this.PushSourceCode("do {" + LoopBody + "}while(" + CondExpr + ");");
	}

	public VisitForEachNode(ForEachNode: ForEachNode): void {
		// Auto: TODO-generatedstub: method //
	}

	public VisitEmptyNode(Node: GtNode): void {
		this.PushSourceCode("");
	}

	public VisitReturnNode(Node: ReturnNode): void {
		if(Node.Expr != null){
			Node.Expr.Evaluate(this);
			this.PushSourceCode("return " + this.PopSourceCode());
		}else{
			this.PushSourceCode("return");
		}
	}

	public VisitBreakNode(Node: BreakNode): void {
		this.PushSourceCode("break");
	}

	public VisitContinueNode(Node: ContinueNode): void {
		this.PushSourceCode("continue");
	}

	public VisitTryNode(Node: TryNode): void {
		this.VisitBlockJS(Node.TryBlock);
// 		/* FIXME:not: Dofor: statement: use */for(var i: number = 0; i < Node.CatchBlock.size(); i++) { //
// 			var Block: TypedNode = (TypedNode) Node.CatchBlock.get(i); //
// 			var Exception: TypedNode = (TypedNode) Node.TargetException.get(i); //
// 			this.VisitBlockJS(Block); //
// 		} //
		this.VisitBlockJS(Node.FinallyBlock);

		var FinallyBlock: string = this.PopSourceCode();
		var CatchBlocks: string = "";// this.PopManyCodeWithModifier(Node.CatchBlock.CountForrowingNode(), true, "catch() ", null, null); //
		var TryBlock: string = this.PopSourceCode();
		this.PushSourceCode("try " + TryBlock /*+ CatchBlocks*/ + "finally " + FinallyBlock);
		return;
	}

	public VisitThrowNode(Node: ThrowNode): void {
		Node.Expr.Evaluate(this);
		var Expr: string = this.PopSourceCode();
		this.PushSourceCode("throw " + Expr);
		return;
	}

	public VisitFunctionNode(Node: FunctionNode): void {
		// Auto: TODO-generatedstub: method //
		return;
	}

	public VisitErrorNode(Node: ErrorNode): void {
		var Expr: string = Node.toString();
		this.PushSourceCode("(function() {throw new Error(\"" + Expr + "\") })()");
		return;
	}

	// must: Thisextended: beeach: language: in //
	public Eval(Node: GtNode): Object {
		this.VisitBlock(Node);
		var ret: string = "";
		while(this.GeneratedCodeStack.size() > 0){
			var Line: string = this.PopSourceCode();
			if(Line.length > 0){
				ret =  Line + ";\n" + ret;
			}
		}
		// this.WriteTranslatedCode(ret); //
		return ret;
	}

}
