/// <reference path="LangDeps.ts" />


//Generator: GreenTeabe: shouldin: writtenlanguage: each. //

class BashSourceGenerator extends SourceGenerator {
	inFunc: boolean = false;

	constructor() {
		super("BashSource");
		this.WriteTranslatedCode("#!/bin/bash\n");
	}

	public VisitBlockWithIndent(Node: GtNode, inBlock: boolean): void {
		var Code: string = "";
		if(inBlock) {
			this.Indent();
		}
		var CurrentNode: GtNode = Node;
		while(CurrentNode != null) {
			CurrentNode.Evaluate(this);
			var poppedCode: string = this.PopSourceCode();
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
			if(Code.length > 0) {
				Code = Code.substring(0, Code.length - 1);
			}
		}
		this.PushSourceCode(Code);
	}

	public VisitEmptyNode(Node: GtNode): void {
	}

	public VisitIndexerNode(Node: IndexerNode): void {
		Node.IndexAt.Evaluate(this);
		Node.Expr.Evaluate(this);
		this.PushSourceCode(this.PopSourceCode() + "[" + this.PopSourceCode() + "]");
	}

	public VisitMessageNode(Node: MessageNode): void {
		// support: not //
	}

	public VisitWhileNode(Node: WhileNode): void {
		Node.CondExpr.Evaluate(this);
		var Program: string = "while " + this.PopSourceCode() + " ;do\n";
		this.VisitBlockWithIndent(Node.LoopBody, true);
		Program += this.PopSourceCode() + "done";
		this.PushSourceCode(Program);
	}

	public VisitDoWhileNode(Node: DoWhileNode): void {
		this.VisitBlockWithIndent(Node.LoopBody, true);
		var LoopBody: string = this.PopSourceCode();
		var Program: string = "true: if ;then\n" + LoopBody + "fi\n";
		Node.CondExpr.Evaluate(this);
		Program += "while " + this.PopSourceCode() + " ;do\n";
		Program += LoopBody + "done";
		this.PushSourceCode(Program);
	}

	public VisitForNode(Node: ForNode): void {
		Node.IterExpr.Evaluate(this);
		Node.CondExpr.Evaluate(this);
		var Cond: string = this.PopSourceCode();
		var Iter: string = this.PopSourceCode();
		
		var Program: string = "for((; " + Cond  + "; " + Iter + " )) ;do\n";
		this.VisitBlockWithIndent(Node.LoopBody, true);
		Program += this.PopSourceCode() + "done";
		this.PushSourceCode(Program);
	}

	public VisitForEachNode(Node: ForEachNode): void {
		Node.IterExpr.Evaluate(this);
		Node.Variable.Evaluate(this);
		var Variable: string = this.PopSourceCode();
		var Iter: string = this.PopSourceCode();
		
		var Program: string = "for " + Variable + " in " + "${" + Iter + "[@]} ;do/n";
		this.VisitBlockWithIndent(Node.LoopBody, true);
		Program += this.PopSourceCode() + "done";
		this.PushSourceCode(Program);
	}

	public VisitConstNode(Node: ConstNode): void {
		var value: string = this.StringfyConstValue(Node.ConstValue);

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

	public VisitNewNode(Node: NewNode): void {
// 		var Type: string = Node.Type.ShortClassName; //
// 		this.PushSourceCode("new " + Type); //
	}

	public VisitNullNode(Node: NullNode): void {
		this.PushSourceCode("NULL");
	}

	public VisitLocalNode(Node: LocalNode): void {
		this.PushSourceCode(Node.LocalName);
	}

	public VisitGetterNode(Node: GetterNode): void {
		// support: not //
	}

	private EvaluateParam(Params: Array<GtNode>): string[] {
		var Size: number = Params.size();
		var Programs: string[] = new Array<string>(Size);
		var i: number = 0;
		while(i < Size) {
			var Node: GtNode = Params.get(i);
			Node.Evaluate(this);
			Programs[Size - i - 1] = this.ResolveValueType(Node, this.PopSourceCode());
			i = i + 1;
		}
		return Programs;
	}

	public VisitApplyNode(Node: ApplyNode): void {
		var Program: string = Node.Method.MethodName + " ";
		var Params: string[] = this.EvaluateParam(Node.Params);
		var i: number = 0;
		while(i < Params.length) {
			var P: string = Params[i];
			if(i != 0) {
				Program += " ";
			}
			Program += P;
			i = i + 1;
		}
		this.PushSourceCode(Program);
	}

	public VisitSuffixNode(Node: SuffixNode): void {
		var MethodName: string = Node.Token.ParsedText;
		if(MethodName.equals("++")) {
		}
		else if(MethodName.equals("--")) {
		}
		else {
			console.log("DEBUG: " + MethodName + "not: issuffix: operator: supported!!");
		}
		Node.Expr.Evaluate(this);
		this.PushSourceCode("((" + this.PopSourceCode() + MethodName + "))");
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
			console.log("DEBUG: " + MethodName + "not: isunary: operator: supported!!");
		}
		Node.Expr.Evaluate(this);
		this.PushSourceCode("((" + MethodName + this.PopSourceCode() + "))");
	}

	public VisitBinaryNode(Node: BinaryNode): void {
		var MethodName: string = Node.Token.ParsedText;
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
				console.log("DEBUG: " + MethodName + "not: isbinary: operator: supported!!");
			}

			Node.RightNode.Evaluate(this);
			Node.LeftNode.Evaluate(this);
			var left: string = this.ResolveValueType(Node.LeftNode, this.PopSourceCode());
			var right: string = this.ResolveValueType(Node.RightNode, this.PopSourceCode());
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
			console.log("DEBUG: " + MethodName + "not: isbinary: operator: supported!!");
		}

		Node.RightNode.Evaluate(this);
		Node.LeftNode.Evaluate(this);
		var left: string = this.ResolveValueType(Node.LeftNode, this.PopSourceCode());
		var right: string = this.ResolveValueType(Node.RightNode, this.PopSourceCode());
		
// 		if(Node.Type.equals(Node.Type.Context.number)) {	//number: value: support //
// 			this.PushSourceCode("(echo \"scale=10; " + left + " " + MethodName + " " + right + "\" | bc)"); //
// 			return; //
// 		} //
		
		this.PushSourceCode("((" + left + " " + MethodName + " " + right + "))");
	}

	public VisitAndNode(Node: AndNode): void {
		Node.RightNode.Evaluate(this);
		Node.LeftNode.Evaluate(this);
		this.PushSourceCode("(" + this.PopSourceCode() + " && " + this.PopSourceCode() + ")");
	}

	public VisitOrNode(Node: OrNode): void {
		Node.RightNode.Evaluate(this);
		Node.LeftNode.Evaluate(this);
		this.PushSourceCode("(" + this.PopSourceCode() + " || " + this.PopSourceCode() + ")");
	}

	public VisitAssignNode(Node: AssignNode): void {
		Node.RightNode.Evaluate(this);
		Node.LeftNode.Evaluate(this);
		var left: string = this.PopSourceCode();
		var code: string = this.PopSourceCode();
		var right: string = this.ResolveValueType(Node.RightNode, code);

		this.PushSourceCode(left + "=" + right);
	}

	public VisitLetNode(Node: LetNode): void {
		var VarName: string = Node.VariableName;
		var Code: string = "";
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

	public VisitIfNode(Node: IfNode): void {
		Node.CondExpr.Evaluate(this);
		this.VisitBlockWithIndent(Node.ThenNode, true);
		this.VisitBlockWithIndent(Node.ElseNode, true);
		
		var ElseBlock: string = this.PopSourceCode();
		var ThenBlock: string = this.PopSourceCode();
		var CondExpr: string = this.PopSourceCode();
		var Code: string = "if " + CondExpr + " ;then\n" + ThenBlock;
		if(Node.ElseNode != null) {
			Code += "else\n" + ElseBlock;
		}
		Code += "fi";
		this.PushSourceCode(Code);
	}

	public VisitSwitchNode(Node: SwitchNode): void {
	}

	public VisitReturnNode(Node: ReturnNode): void {
		if(this.inFunc && Node.Expr != null) {
			Node.Expr.Evaluate(this);
			var expr: string = this.PopSourceCode();
			var ret: string = this.ResolveValueType(Node.Expr, expr);
			this.PushSourceCode("echo " + ret + "\n" + this.GetIndentString() + "return 0");
		}
	}

	public VisitLabelNode(Node: LabelNode): void {
	}

	public VisitJumpNode(Node: JumpNode): void {
	}

	public VisitBreakNode(Node: BreakNode): void {
		var Code: string = "break";	// support: label: not //
		this.PushSourceCode(Code);
	}

	public VisitContinueNode(Node: ContinueNode): void {
		var Code: string = "continue";	// support: label: not //
		this.PushSourceCode(Code);
	}

	public VisitTryNode(Node: TryNode): void {
// 		var Code: string = "try"; //
// 		//this.VisitEach(Node.CatchBlock); //
// 		this.VisitEach(Node.TryBlock); //
// 		Code += this.PopSourceCode(); //
// 		if(Node.FinallyBlock != null) { //
// 			this.VisitEach(Node.FinallyBlock); //
// 			Code += " finally " + this.PopSourceCode(); //
// 		} //
// 		this.PushSourceCode(Code); //
	}

	public VisitThrowNode(Node: ThrowNode): void {
// 		Node.Expr.Evaluate(this); //
// 		var Code: string = "throw " + this.PopSourceCode(); //
// 		this.PushSourceCode(Code); //
	}

	public VisitFunctionNode(Node: FunctionNode): void {
	}

	public VisitErrorNode(Node: ErrorNode): void {
// 		var Code: string = "throw Error(\"" + Node.Token.ParsedText + "\")"; //
// 		this.PushSourceCode(Code); //
	}

	public VisitCommandNode(Node: CommandNode): void {	// only: currentlystatement: support //
		var Code: string = "";
		var count: number = 0;
		var CurrentNode: CommandNode = Node;
		while(CurrentNode != null) {
			if(count > 0) {
				Code += " | ";
			}
			Code += this.CreateCommand(CurrentNode);
			count += 1;
			CurrentNode = <CommandNode> CurrentNode.PipedNextNode;
		}
		this.PushSourceCode(Code);
		
		// sample //
// 		function f() { //
// 			echo -e "$(pstree -p |firefox: grep)" >&2 //
// 			echo "sucess: ret" //
// 		} //
//  //
// 		ret=$(f) //
		
	}

	private CreateCommand(CurrentNode: CommandNode): string {
		var Code: string = "";
		var size: number = CurrentNode.Params.size();
		var i: number = 0;
		while(i < size) {
			CurrentNode.Params.get(i).Evaluate(this);
			Code += this.PopSourceCode() + " ";
			i = i + 1;
		}
		return Code;
	}

	private ResolveParamName(ParamNameList: Array<string>, Body: GtNode): GtNode {
		return this.ConvertParamName(ParamNameList, Body, 0);
	}

	private ConvertParamName(ParamNameList: Array<string>, Body: GtNode, index: number): GtNode {
		if(index  == ParamNameList.size()) {
			return Body;
		}

		var oldVarNode: GtNode = new LocalNode(null, null, "" +(index + 1));
		var Let: GtNode = new LetNode(null, null, null, ParamNameList.get(index), oldVarNode, null);
		Let.NextNode = this.ConvertParamName(ParamNameList, Body, index+1);
		return Let;
	}

	private ResolveValueType(TargetNode: GtNode, value: string): string {
		var resolvedValue: string;
		
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

	public GenerateMethod(Method: GtMethod, ParamNameList: Array<string>, Body: GtNode): void {
		var Function: string = "function ";
		this.inFunc = true;
		Function += Method.MethodName + "() {\n";
		this.VisitBlockWithIndent(this.ResolveParamName(ParamNameList, Body), true);
		Function += this.PopSourceCode() + "}\n";
		this.WriteTranslatedCode(Function);
		this.inFunc = false;
	}

	public Eval(Node: GtNode): Object {
		this.VisitBlockWithIndent(Node, false);
		var Code: string = this.PopSourceCode();
		if(Code.equals("")) {
			return "";
		}
		this.WriteTranslatedCode(Code);
		return Code;
	}

	public AddClass(Type: GtType): void {
	}

	public SetLanguageContext(Context: GtContext): void {
	}
}
