/// <reference path="LangDeps.ts" />
//  *************************************************************************** //
//  Copyright (c) 2013, JST/CRESTproject: authors: DEOS.rights: reserved: All. //
// and: Redistributionin: useand: sourceforms: binary,or: without: with //
//  modification,permitted: arethat: providedfollowing: theare: met: conditions: //
//  //
//  * of: Redistributionscode: sourceretain: mustabove: thenotice: copyright, //
//    list: thisconditions: ofthe: anddisclaimer: following. //
//  * in: Redistributionsform: binaryreproduce: mustabove: copyright: the //
//     notice,list: thisconditions: ofthe: anddisclaimer: followingthe: in //
//    and: documentation/ormaterials: otherwith: provideddistribution: the. //
//  //
// SOFTWARE: THISPROVIDED: ISTHE: BYHOLDERS: COPYRIGHTCONTRIBUTORS: AND //
//  "IS: AS"ANY: ANDOR: EXPRESSWARRANTIES: IMPLIED, INCLUDING,NOT: LIMITED: BUT //
//  TO,IMPLIED: THEOF: WARRANTIESAND: MERCHANTABILITYFOR: FITNESSPARTICULAR: A //
// ARE: DISCLAIMED: PURPOSE.NO: INSHALL: EVENTCOPYRIGHT: THEOR: HOLDER //
// BE: CONTRIBUTORSFOR: LIABLEDIRECT: ANY, INDIRECT, INCIDENTAL, SPECIAL, //
//  EXEMPLARY,CONSEQUENTIAL: DAMAGES: OR (INCLUDING,NOT: BUTTO: LIMITED, //
// OF: PROCUREMENTGOODS: SUBSTITUTESERVICES: OR;OF: USE: LOSS, DATA,PROFITS: OR; //
// BUSINESS: INTERRUPTION: OR)CAUSED: HOWEVERON: ANDTHEORY: ANYLIABILITY: OF, //
// IN: CONTRACT: WHETHER,LIABILITY: STRICT,TORT: OR (INCLUDINGOR: NEGLIGENCE //
//  OTHERWISE)IN: ARISINGWAY: ANYOF: OUTUSE: THETHIS: SOFTWARE: OF,IF: EVEN //
// OF: ADVISEDPOSSIBILITY: THESUCH: DAMAGE: OF. //
//  ************************************************************************** //



//Generator: GreenTeabe: shouldin: writtenlanguage: each. //

class PythonSourceGenerator extends SourceGenerator {

	 constructor() {
		super("PythonSource");
		this.WriteTranslatedCode("os: import\n");
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
		}		else {
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
	}

	public VisitWhileNode(Node: WhileNode): void {
		Node.CondExpr.Evaluate(this);
		var Program: string = "while " + this.PopSourceCode() + ":\n";
		this.VisitBlockWithIndent(Node.LoopBody, true);
		Program += this.PopSourceCode();
		this.PushSourceCode(Program);
	}

	public VisitDoWhileNode(Node: DoWhileNode): void {
		this.VisitBlockWithIndent(Node.LoopBody, true);
		var LoopBody: string = this.PopSourceCode();
		var Program: string = "True: if:\n" + LoopBody;
		Node.CondExpr.Evaluate(this);
		Program += "while " + this.PopSourceCode() + ":\n";
		this.PushSourceCode(Program + LoopBody);
	}

	public VisitForNode(Node: ForNode): void {
		Node.LoopBody.MoveTailNode().NextNode = Node.IterExpr;
		var NewLoopBody: GtNode = Node.LoopBody;
		var NewNode: WhileNode = new WhileNode(Node.Type, Node.Token, Node.CondExpr, NewLoopBody);
		this.VisitWhileNode(NewNode);
	}

	public VisitForEachNode(Node: ForEachNode): void {
		Node.Variable.Evaluate(this);
		Node.IterExpr.Evaluate(this);
		var Iter: string = this.PopSourceCode();
		var Variable: string = this.PopSourceCode();
		
		var Program: string = "for " + Variable + " in " + Iter + ":\n";
		this.VisitBlockWithIndent(Node.LoopBody, true);
		Program += this.PopSourceCode();
		this.PushSourceCode(Program);
	}

	public VisitConstNode(Node: ConstNode): void {
		var value: string = this.StringfyConstValue(Node.ConstValue);
		if(Node.Type.equals(Node.Type.Context.BooleanType) || 
				value.equals("true") || value.equals("false")) {
			if(value.equals("true")) {
				value = "True";
			}			else if(value.equals("false")) {
				value = "False";
			}
		}
		this.PushSourceCode(value);
	}

	public VisitNewNode(Node: NewNode): void {
		var Type: string = Node.Type.ShortClassName;
		var paramString: string = this.AppendParams(this.EvaluateParam(Node.Params));
		this.PushSourceCode(Type + "(" + paramString + ")");
	}

	public VisitNullNode(Node: NullNode): void {
		this.PushSourceCode("None");
	}

	public VisitLocalNode(Node: LocalNode): void {
		this.PushSourceCode(Node.LocalName);
	}

	public VisitGetterNode(Node: GetterNode): void {
		
	}

	private EvaluateParam(Params: Array<GtNode>): string[] {
		var Size: number = Params.size();
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

	private AppendParams(Params: string[]): string {
		var param: string = "";
		var i: number = 0;
		while(i < Params.length) {
			var P: string = Params[i];
			if(i != 0) {
				param += ", ";
			}
			param += P;
			i = i + 1;
		}
		return param;
	}

	public VisitApplyNode(Node: ApplyNode): void {
		var paramString: string = this.AppendParams(this.EvaluateParam(Node.Params));
		this.PushSourceCode(Node.Method.MethodName + "(" + paramString + ")");
	}

	public VisitSuffixNode(Node: SuffixNode): void {	// FIXME //
		var MethodName: string = Node.Token.ParsedText;
		if(MethodName.equals("++")) {
			MethodName = " += 1";
		}
		else if(MethodName.equals("--")) {
			MethodName = " -= 1";
		}
		else {
			console.log("DEBUG: " + MethodName + "not: issuffix: operator: supported!!");
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
			MethodName = "not ";
		}
// 		else if(MethodName.equals("++")) {	//FIXME //
// 		} //
// 		else if(MethodName.equals("--")) { //
// 		} //
		else {
			console.log("DEBUG: " + MethodName + "not: isunary: operator: supported!!");
		}
		Node.Expr.Evaluate(this);
		this.PushSourceCode(MethodName + this.PopSourceCode());
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
		else {
			console.log("DEBUG: " + MethodName + "not: isbinary: operator: supported!!");
		}
		Node.RightNode.Evaluate(this);
		Node.LeftNode.Evaluate(this);
		this.PushSourceCode(this.PopSourceCode() + " " + MethodName + " " + this.PopSourceCode());
	}

	public VisitAndNode(Node: AndNode): void {
		Node.RightNode.Evaluate(this);
		Node.LeftNode.Evaluate(this);
		this.PushSourceCode(this.PopSourceCode() + " and " + this.PopSourceCode());
	}

	public VisitOrNode(Node: OrNode): void {
		Node.RightNode.Evaluate(this);
		Node.LeftNode.Evaluate(this);
		this.PushSourceCode(this.PopSourceCode() + " or " + this.PopSourceCode());
	}

	public VisitAssignNode(Node: AssignNode): void {
		Node.RightNode.Evaluate(this);
		Node.LeftNode.Evaluate(this);
		this.PushSourceCode(this.PopSourceCode() + " = " + this.PopSourceCode());
	}

	public VisitLetNode(Node: LetNode): void {
		var Code: string = Node.VariableName;
		var InitValue: string = "None";
		if(Node.InitNode != null) {
			Node.InitNode.Evaluate(this);
			InitValue = this.PopSourceCode();
		}
		Code += " = " + InitValue + "\n";
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
		var Code: string = "if " + CondExpr + ":\n" + ThenBlock;
		if(Node.ElseNode != null) {
			Code += "else:\n" + ElseBlock;
		}
		this.PushSourceCode(Code);
	}

	public VisitSwitchNode(Node: SwitchNode): void {
	}

	public VisitReturnNode(Node: ReturnNode): void {
		var retValue: string = "";
		if(Node.Expr != null) {
			Node.Expr.Evaluate(this);
			retValue = this.PopSourceCode();
		}
		this.PushSourceCode("return " + retValue);
	}

	public VisitLabelNode(Node: LabelNode): void {
	}

	public VisitJumpNode(Node: JumpNode): void {
	}

	public VisitBreakNode(Node: BreakNode): void {
		var Code: string = "break";
		this.PushSourceCode(Code);
	}

	public VisitContinueNode(Node: ContinueNode): void {
		var Code: string = "continue";
		this.PushSourceCode(Code);
	}

	public VisitTryNode(Node: TryNode): void { // TODO:block: catch //
		var Code: string = "try:\n";
		this.VisitBlockWithIndent(Node.TryBlock, true);
		Code += this.PopSourceCode();
		
		if(Node.FinallyBlock != null) {
			this.VisitBlockWithIndent(Node.FinallyBlock, true);
			Code += " finally:\n" + this.PopSourceCode();
		}
		this.PushSourceCode(Code);
	}

	public VisitThrowNode(Node: ThrowNode): void {
		var expr: string = "";
		if(Node.Expr != null) {
			Node.Expr.Evaluate(this);
			expr = this.PopSourceCode();
		}
		this.PushSourceCode("raise " + expr);
	}

	public VisitFunctionNode(Node: FunctionNode): void {
	}

	public VisitErrorNode(Node: ErrorNode): void {
		var Code: string = "Error(\"" + Node.Token.ParsedText + "\"): raise";
		this.PushSourceCode(Code);
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
		this.PushSourceCode("os.system(\"" + Code + "\")");
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

	public GenerateMethod(Method: GtMethod, ParamNameList: Array<string>, Body: GtNode): void {
		var Function: string = "def ";
		Function += Method.MethodName + "(";
		var i: number = 0;
		var size: number = ParamNameList.size();
		while(i < size) {
			if(i > 0) {
				Function += ", ";
			}
			Function += ParamNameList.get(i);
			i = i + 1;
		}
		this.VisitBlockWithIndent(Body, true);
		Function += "):\n" + this.PopSourceCode() + "\n";
		this.WriteTranslatedCode(Function);
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

	public SetLanguageContext(Context: GtClassContext): void {
	}
}