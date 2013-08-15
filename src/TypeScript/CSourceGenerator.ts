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

class CSourceGenerator extends SourceGenerator {
	public  DefaultTypes: string[] = ["void", "int", "boolean", "float", "double", "string", "Object", "Array", "Func", "var", "any"]
	public  DefinedClass: GtMap;
	
	 constructor() {
		super("C");
		this.DefinedClass = new GtMap();
	}

	public VisitBlockEachStatementWithIndent(Node: GtNode, NeedBlock: boolean): void {
		var Code: string = "";
		if(NeedBlock) {
			Code += "{\n";
			this.Indent();
		}
		var CurrentNode: GtNode = Node;
		while(CurrentNode != null) {
			CurrentNode.Evaluate(this);
			Code += this.GetIndentString() + this.PopSourceCode() + ";\n";
			CurrentNode = CurrentNode.NextNode;
		}
		if(NeedBlock) {
			this.UnIndent();
			Code += this.GetIndentString() + "}";
		}
		this.PushSourceCode(Code);
	}

	public VisitEmptyNode(Node: GtNode): void {
		this.PushSourceCode("");
	}

	public VisitSuffixNode(Node: SuffixNode): void {
		var MethodName: string = Node.Token.ParsedText;
		Node.Expr.Evaluate(this);
		this.PushSourceCode(this.PopSourceCode() + MethodName);
	}

	public VisitUnaryNode(Node: UnaryNode): void {
		var MethodName: string = Node.Token.ParsedText;
		Node.Expr.Evaluate(this);
		this.PushSourceCode(MethodName + this.PopSourceCode());
	}

	public VisitIndexerNode(Node: IndexerNode): void {
		Node.IndexAt.Evaluate(this);
		Node.Expr.Evaluate(this);
		this.PushSourceCode(this.PopSourceCode() + "[" + this.PopSourceCode() + "]");
	}

	public VisitMessageNode(Node: MessageNode): void {
		// Auto: TODO-generatedstub: method //
	}

	public VisitWhileNode(Node: WhileNode): void {
		Node.CondExpr.Evaluate(this);
		var Program: string = "while(" + this.PopSourceCode() + ")";
		this.VisitBlockEachStatementWithIndent(Node.LoopBody, true);
		Program += this.PopSourceCode();
		this.PushSourceCode(Program);
	}

	public VisitDoWhileNode(Node: DoWhileNode): void {
		var Program: string = "do";
		this.VisitBlockEachStatementWithIndent(Node.LoopBody, true);
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
		var Code: string = "NULL";
		if(Node.ConstValue != null) {
			Code = this.StringfyConstValue(Node.ConstValue);
		}
		this.PushSourceCode(Code);
	}

	public VisitNewNode(Node: NewNode): void {
		var Type: string = Node.Type.ShortClassName;
		this.PushSourceCode("new " + Type + "()");
	}

	public VisitNullNode(Node: NullNode): void {
		this.PushSourceCode("NULL");
	}

	public VisitLocalNode(Node: LocalNode): void {
		this.PushSourceCode(Node.LocalName);
	}

	public VisitGetterNode(Node: GetterNode): void {
		Node.Expr.Evaluate(this);
		this.PushSourceCode(this.PopSourceCode() + "->" + Node.Method.MethodName);
	}

	public VisitApplyNode(Node: ApplyNode): void {
		var Program: string = this.GenerateMacro(Node);
		var i: number = 0;
		while(i < ListSize(Node.Params)) {
			Node.Params.get(i).Evaluate(this);
			Program = Program.replace("$" + i, this.PopSourceCode());
			i = i + 1;
		}
		this.PushSourceCode(Program);
	}

	private GenerateMacro(Node: ApplyNode): string {
		if(Node.Method.SourceMacro != null) {
			return Node.Method.SourceMacro;
		}
		var Template: string = Node.Method.GetNativeFuncName() + "(";
		var i: number = 0;
		var ParamSize: number = Node.Params.size();
		while(i < ParamSize) {
			if(i != 0) {
				Template += " ,";
			}
			Template += "$" + i;
			i = i + 1;
		}
		Template += ")";
		return Template;
	}

	public VisitBinaryNode(Node: BinaryNode): void {
		var MethodName: string = Node.Token.ParsedText;
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
		var Type: string = Node.DeclType.ShortClassName;
		var VarName: string = Node.VariableName;
		var Code: string = Type + " " + VarName;
		if(Node.InitNode != null) {
			Node.InitNode.Evaluate(this);
			Code += " = " + this.PopSourceCode();
		}
		Code +=  ";\n";
		this.VisitBlockEachStatementWithIndent(Node.BlockNode, true);
		this.PushSourceCode(Code + this.GetIndentString() + this.PopSourceCode());
	}

	public VisitIfNode(Node: IfNode): void {
		Node.CondExpr.Evaluate(this);
		this.VisitBlockEachStatementWithIndent(Node.ThenNode, true);
		this.VisitBlockEachStatementWithIndent(Node.ElseNode, true);
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
		var Code: string = "try ";
		this.VisitBlockEachStatementWithIndent(Node.TryBlock, true);
		Code += this.PopSourceCode();
		var Val: LetNode = <LetNode> Node.CatchExpr;
		Code += " catch (" + Val.Type.toString() + " " + Val.VariableName + ") ";
		this.VisitBlockEachStatementWithIndent(Node.CatchBlock, true);
		Code += this.PopSourceCode();
		if(Node.FinallyBlock != null) {
			this.VisitBlockEachStatementWithIndent(Node.FinallyBlock, true);
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
		var Code: string = "system(";
		var i: number = 0;
		var Command: string = "var __Command: string = ";
		while(i < ListSize(Node.Params)) {
			var Param: GtNode = Node.Params.get(i);
			if(i != 0) {
				Command += " + ";
			}
			Param.Evaluate(this);
			Command += "(" + this.PopSourceCode() + ")";
			i = i + 1;
		}
		Code = Command + ";\n" + this.GetIndentString() + Code + "__Command)";
		this.PushSourceCode(Code);
	}

	public LocalTypeName(Type: GtType): string {
		return Type.ShortClassName;
	}

	public GenerateMethod(Method: GtMethod, ParamNameList: Array<string>, Body: GtNode): void {
		var Code: string = "";
		if(!Method.Is(ExportMethod)) {
			Code = "static ";
		}
		var RetTy: string = this.LocalTypeName(Method.GetReturnType());
		Code += RetTy + " " + Method.GetNativeFuncName() + "(";
		var i: number = 0;
		while(i < ParamNameList.size()) {
			var ParamTy: string = this.LocalTypeName(Method.GetFuncParamType(i));
			if(i > 0) {
				Code += ", ";
			}
			Code += ParamTy + " " + ParamNameList.get(i);
			i = i + 1;
		}
		Code += ")";
		this.VisitBlockEachStatementWithIndent(Body, true);
		Code += this.PopSourceCode();
		this.WriteTranslatedCode(Code);
	}

	public Eval(Node: GtNode): Object {
		this.VisitBlockEachStatementWithIndent(Node, false);
		var Code: string = this.PopSourceCode();
		if(Code.equals(";\n")) {
			return "";
		}
		this.WriteTranslatedCode(Code);
		return Code;
	}

	 IsDefiendType(TypeName: string): boolean {
		var i: number = 0;
		while(i < this.DefaultTypes.length) {
			if(this.DefaultTypes[i].equals(TypeName)) {
				return true;
			}
			i = i + 1;
		}
		// care: about: FIXME "var", "any" //
		
		return false;
	}

	public DefineClassField(NameSpace: GtNameSpace, Type: GtType, VarInfo: GtVariableInfo): void {
		var Program: string = <string> this.DefinedClass.get(Type.ShortClassName);
		var VarType: GtType = VarInfo.Type;
		var VarName: string = VarInfo.Name;
		this.Indent();
		Program += this.GetIndentString() + VarType.ShortClassName + " " + VarName + ";\n";
		this.UnIndent();
		this.DefinedClass.put(Type.ShortClassName, Program);
		var ParamList: Array<GtType> = new Array<GtType>();
		ParamList.add(VarType);
		ParamList.add(Type);
		var GetterMethod: GtMethod = new GtMethod(0, VarName, 0, ParamList, null);
		NameSpace.Context.DefineGetterMethod(GetterMethod);
	}

	public DefineClassMethod(NameSpace: GtNameSpace, Type: GtType, Method: GtMethod): void {
		var Program: string = <string> this.DefinedClass.get(Type.ShortClassName);
		this.Indent();
		Program += this.GetIndentString() + Method.GetFuncType().ShortClassName + " " + Method.MangledName + ";\n";
		this.UnIndent();
		this.DefinedClass.put(Type.ShortClassName, Program);
	}

	public GenerateClassField(Type: GtType): void {
		var Program: string = <string> this.DefinedClass.get(Type.ShortClassName);
		Program += "}";
		this.WriteTranslatedCode(Program);
	}

	public AddClass(Type: GtType): void {
		var TypeName: string = Type.ShortClassName;
		if(this.IsDefiendType(TypeName) == true) {
			return;
		}
		var Program: string = this.GetIndentString() + "struct: typedef " + TypeName;
		this.WriteTranslatedCode(Program + " " + TypeName + ";");
		Program += " {\n";
		this.Indent();
		if(Type.SuperClass != null) {
			Program += this.GetIndentString() + Type.SuperClass.ShortClassName + " __base;\n";
		}
		this.UnIndent();
		this.DefinedClass.put(TypeName, Program);
	}

	public SetLanguageContext(Context: GtClassContext): void {
		Context.Eval(LangDeps.LoadFile("lib/c/common.green"), 1);
	}
}