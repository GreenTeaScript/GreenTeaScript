/// <reference path="LangDeps.ts" />


/* language */


// Generator: GreenTeabe: shouldin: writtenlanguage: each. //

class TypedNode {
	public ParentNode: TypedNode;
	public PrevNode: TypedNode;
	public NextNode: TypedNode;

	public Type: GtType;
	public Token: GtToken;

	constructor(Type: GtType, Token: GtToken) {
		this.Type = Type;
		this.Token = Token;
		this.ParentNode = null;
		this.PrevNode = null;
		this.NextNode = null;
	}

	 MoveHeadNode(): TypedNode {
		var Node: TypedNode = this;
		while(Node.PrevNode != null) {
			Node = Node.PrevNode;
		}
		return Node;
	}

	 MoveTailNode(): TypedNode {
		var Node: TypedNode = this;
		while(Node.NextNode != null) {
			Node = Node.NextNode;
		}
		return Node;
	}

	public Append(Node: TypedNode): void {
		/*extension*/
	}

	public Evaluate(Visitor: CodeGenerator): void {
		Visitor.VisitEmptyNode(this);  /*override: must */
	}

	 IsError(): boolean {
		return (this instanceof ErrorNode);
	}

	public toString(): string {
		return "(TypedNode)";
	}

	static Stringify(Block: TypedNode): string {
		var Text: string = Block.toString();
		while(Block != null) {
			Text += Block.toString() + " ";
			Block = Block.NextNode;
		}
		return Text;
	}

	public CountForrowingNode(): number {
		var n: number = 0;
		var node: TypedNode = this;
		while(node != null){
			n++;
			node = node.NextNode;
		}
		return n;
	}
}

//  E.g., "~" $Expr //
class UnaryNode extends TypedNode {
	public Method: GtMethod;
	public Expr: TypedNode;
	constructor(Type: GtType, Token: GtToken, Method: GtMethod, Expr: TypedNode) {
		super(Type, Token);
		this.Method = Method;
		this.Expr = Expr;
	}
	public Evaluate(Visitor: CodeGenerator): void {
		Visitor.VisitUnaryNode(this);
	}
}

//  E.g.,  $Expr "++" //
class SuffixNode extends TypedNode {
	public Method: GtMethod;
	public Expr: TypedNode;
	constructor(Type: GtType, Token: GtToken, Method: GtMethod, Expr: TypedNode) {
		super(Type, Token);
		this.Method = Method;
		this.Expr = Expr;
	}
	public Evaluate(Visitor: CodeGenerator): void {
		Visitor.VisitSuffixNode(this);
	}
}

//  E.g., $LeftNode "+" $RightNode //
class BinaryNode extends TypedNode {
	public Method: GtMethod;
	public LeftNode: TypedNode;
	public RightNode: TypedNode;
	constructor(Type: GtType, Token: GtToken, Method: GtMethod, Left: TypedNode, Right: TypedNode) {
		super(Type, Token);
		this.Method = Method;
		this.LeftNode  = Left;
		this.RightNode = Right;
	}
	public Evaluate(Visitor: CodeGenerator): void {
		Visitor.VisitBinaryNode(this);
	}
}

// E.g., $LeftNode && $RightNode //
class AndNode extends TypedNode {
	public LeftNode: TypedNode;
	public RightNode: TypedNode;
	constructor(Type: GtType, Token: GtToken, Left: TypedNode, Right: TypedNode) {
		super(Type, Token);
		this.LeftNode  = Left;
		this.RightNode = Right;
	}
	public Evaluate(Visitor: CodeGenerator): void {
		Visitor.VisitAndNode(this);
	}
	public toString(): string {
		return "(And:" + this.Type + " " + TypedNode.Stringify(this.LeftNode) + ", " + TypedNode.Stringify(this.RightNode) + ")";
	}
}

// E.g., $LeftNode || $RightNode //
class OrNode extends TypedNode {
	public LeftNode: TypedNode;
	public RightNode: TypedNode;
	constructor(Type: GtType, Token: GtToken, Left: TypedNode, Right: TypedNode) {
		super(Type, Token);
		this.LeftNode  = Left;
		this.RightNode = Right;
	}
	public Evaluate(Visitor: CodeGenerator): void {
		Visitor.VisitOrNode(this);
	}
	public toString(): string {
		return "(Or:" + this.Type + " " + TypedNode.Stringify(this.LeftNode) + ", " + TypedNode.Stringify(this.RightNode) + ")";
	}
}

// E.g., $LeftNode || $RightNode //
class GetterNode extends TypedNode {
	public Expr: TypedNode;
	public Method: GtMethod;
	constructor(Type: GtType, Token: GtToken, Method: GtMethod, Expr: TypedNode) {
		super(Type, Token);
		this.Method = Method;
		this.Expr = Expr;
	}
	public Evaluate(Visitor: CodeGenerator): void {
		Visitor.VisitGetterNode(this);
	}
	public toString(): string {
		return "(Getter:" + this.Type + " " + TypedNode.Stringify(this.Expr) + ", " + this.Method.MethodName + ")";
	}
}

// E.g., $Expr "[" $Indexer "]" //
class IndexerNode extends TypedNode {
	public Method: GtMethod;
	public Expr: TypedNode;
	public Indexer: TypedNode;
	constructor(Type: GtType, Token: GtToken, Method: GtMethod, Expr: TypedNode, Indexer: TypedNode) {
		super(Type, Token);
		this.Method = Method;
		this.Expr = Expr;
		this.Indexer = Indexer;
	}
	public Evaluate(Visitor: CodeGenerator): void {
		Visitor.VisitIndexerNode(this);
	}
	public toString(): string {
		return "(Index:" + this.Type + " " + TypedNode.Stringify(this.Expr) + ", " + TypedNode.Stringify(this.Indexer) + ")";
	}
}

// E.g., $LeftNode = $RightNode //
class AssignNode extends TypedNode {
	public LeftNode: TypedNode;
	public RightNode: TypedNode;
	constructor(Type: GtType, Token: GtToken, Left: TypedNode, Right: TypedNode) {
		super(Type, Token);
		this.LeftNode  = Left;
		this.RightNode = Right;
	}
	public Evaluate(Visitor: CodeGenerator): void {
		Visitor.VisitAssignNode(this);
	}
	public toString(): string {
		return "(Assign:" + this.Type + " " + TypedNode.Stringify(this.LeftNode) + " = " + TypedNode.Stringify(this.RightNode) + ")";
	}
}

class ConstNode extends TypedNode {
	public ConstValue: Object;
	constructor(Type: GtType, Token: GtToken, ConstValue: Object) {
		super(Type, Token);
		this.ConstValue = ConstValue;
	}
	public Evaluate(Visitor: CodeGenerator): void {
		Visitor.VisitConstNode(this);
	}
	public toString(): string {
		return "(Const:" + this.Type + " "+ this.ConstValue.toString() + ")";
	}
}

class LocalNode extends TypedNode {
	public LocalName: string;
	constructor(Type: GtType, Token: GtToken, LocalName: string) {
		super(Type, Token);
		this.LocalName = LocalName;
	}
	public Evaluate(Visitor: CodeGenerator): void {
		Visitor.VisitLocalNode(this);
	}
	public toString(): string {
		return "(Local:" + this.Type + " " + this.LocalName + ")";
	}
}

class NullNode extends TypedNode {
	constructor(Type: GtType, Token: GtToken) {
		super(Type, Token);
	}
	public Evaluate(Visitor: CodeGenerator): void {
		Visitor.VisitNullNode(this);
	}
	public toString(): string {
		return "(Null:" + this.Type + " " + ")";
	}
}

class LetNode extends TypedNode {
	public DeclType: GtType;
	public VarNode: TypedNode;
	public BlockNode: TypedNode;
	/*VarNode: letBlock: end: in */
	constructor(Type: GtType, Token: GtToken, DeclType: GtType, VarNode: TypedNode, Block: TypedNode) {
		super(Type, Token);
		this.DeclType = DeclType;
		this.VarNode  = VarNode;
		this.BlockNode = Block;
	}
	public Evaluate(Visitor: CodeGenerator): void {
		Visitor.VisitLetNode(this);
	}
	public toString(): string {
		var Block: string = TypedNode.Stringify(this.BlockNode);
		return "(Let:" + this.Type + " " + TypedNode.Stringify(this.VarNode) + " in {" + Block + "})";
	}
}

//  E.g., $Param[0] "(" $Param[1], $Param[2], ... ")" //
class ApplyNode extends TypedNode {
	public Method: GtMethod;
	public Params: Array<TypedNode>; /* [arg1, arg2, ...] */
	constructor(Type: GtType, KeyToken: GtToken, Method: GtMethod) {
		super(Type, KeyToken);
		this.Method = Method;
		this.Params = new Array<TypedNode>();
	}
	public Append(Expr: TypedNode): void {
		this.Params.add(Expr);
	}

	public Evaluate(Visitor: CodeGenerator): void {
		Visitor.VisitApplyNode(this);
	}
	public toString(): string {
		var Param: string = "";
		var i: number = 0;
		while(i < ListSize(this.Params)) {
			var Node: TypedNode = this.Params.get(i);
			if(i != 0) {
				Param += ", ";
			}
			Param += TypedNode.Stringify(Node);
			i = i + 1;
		}
		return "(Apply:" + this.Type + " " + Param + ")";
	}
}

// E.g., $Recv.Method "(" $Param[0], $Param[1], ... ")" //
class MessageNode extends TypedNode {
	public Method: GtMethod;
	public RecvNode: TypedNode;
	public Params: Array<TypedNode>;
	constructor(Type: GtType, KeyToken: GtToken, Method: GtMethod, RecvNode: TypedNode) {
		super(Type, KeyToken);
		this.Method = Method;
		this.RecvNode = RecvNode;
		this.Params = new Array<TypedNode>();
	}
	public Append(Expr: TypedNode): void {
		this.Params.add(Expr);
	}

	public Evaluate(Visitor: CodeGenerator): void {
		Visitor.VisitMessageNode(this);
	}
	public toString(): string {
		var Param: string = "";
		var i: number = 0;
		while(i < ListSize(this.Params)) {
			var Node: TypedNode = this.Params.get(i);
			if(i != 0) {
				Param += ", ";
			}
			Param += TypedNode.Stringify(Node);
			i = i + 1;
		}
		return "(Message:" + this.Type + " " + Param + ")";
	}
}

// E.g., "new" $Type "(" $Param[0], $Param[1], ... ")" //
class NewNode extends TypedNode {
	public Params: Array<TypedNode>;
	constructor(Type: GtType, Token: GtToken) {
		super(Type, Token);
		this.Params = new Array<TypedNode>();
	}
	public Append(Expr: TypedNode): void {
		this.Params.add(Expr);
	}
	public Evaluate(Visitor: CodeGenerator): void {
		Visitor.VisitNewNode(this);
	}
	public toString(): string {
		var Param: string = "";
		var i: number = 0;
		while(i < ListSize(this.Params)) {
			var Node: TypedNode = this.Params.get(i);
			if(i != 0) {
				Param += ", ";
			}
			Param += TypedNode.Stringify(Node);
			i = i + 1;
		}
		return "(New:" + this.Type + " " + Param + ")";
	}
}

// E.g., "if" "(" $Cond ")" $ThenNode "else" $ElseNode //
class IfNode extends TypedNode {
	public CondExpr: TypedNode;
	public ThenNode: TypedNode;
	public ElseNode: TypedNode;
	/*CondExpr: IfThenBlock: then else ElseBlock */
	constructor(Type: GtType, Token: GtToken, CondExpr: TypedNode, ThenBlock: TypedNode, ElseNode: TypedNode) {
		super(Type, Token);
		this.CondExpr = CondExpr;
		this.ThenNode = ThenBlock;
		this.ElseNode = ElseNode;
	}
	public Evaluate(Visitor: CodeGenerator): void {
		Visitor.VisitIfNode(this);
	}
	public toString(): string {
		var Cond: string = TypedNode.Stringify(this.CondExpr);
		var Then: string = TypedNode.Stringify(this.ThenNode);
		var Else: string = TypedNode.Stringify(this.ElseNode);
		return "(If:" + this.Type + " Cond:" + Cond + " Then:"+ Then + " Else:" + Else + ")";
	}
}

// E.g., "while" "(" $CondExpr ")" $LoopBody //
class WhileNode extends TypedNode {
	public CondExpr: TypedNode;
	public LoopBody: TypedNode;
	constructor(Type: GtType, Token: GtToken, CondExpr: TypedNode, LoopBody: TypedNode) {
		super(Type, Token);
		this.CondExpr = CondExpr;
		this.LoopBody = LoopBody;
	}
	public Evaluate(Visitor: CodeGenerator): void {
		Visitor.VisitWhileNode(this);
	}
	public toString(): string {
		var Cond: string = TypedNode.Stringify(this.CondExpr);
		var Body: string = TypedNode.Stringify(this.LoopBody);
		return "(While:" + this.Type + " Cond:" + Cond + " Body:"+ Body + ")";
	}
}

class DoWhileNode extends TypedNode {
	public CondExpr: TypedNode;
	public LoopBody: TypedNode;
	constructor(Type: GtType, Token: GtToken, CondExpr: TypedNode, LoopBody: TypedNode) {
		super(Type, Token);
		this.CondExpr = CondExpr;
		this.LoopBody = LoopBody;
	}
	public Evaluate(Visitor: CodeGenerator): void {
		Visitor.VisitDoWhileNode(this);
	}
	public toString(): string {
		var Cond: string = TypedNode.Stringify(this.CondExpr);
		var Body: string = TypedNode.Stringify(this.LoopBody);
		return "(DoWhile:" + this.Type + " Cond:" + Cond + " Body:"+ Body + ")";
	}
}

// E.g., "for" "(" ";" $CondExpr ";" $IterExpr ")" $LoopNode //
class ForNode extends TypedNode {
	public CondExpr: TypedNode;
	public IterExpr: TypedNode;
	public LoopBody: TypedNode;
	constructor(Type: GtType, Token: GtToken, CondExpr: TypedNode, IterExpr: TypedNode, LoopBody: TypedNode) {
		super(Type, Token);
		this.CondExpr = CondExpr;
		this.LoopBody = LoopBody;
		this.IterExpr = IterExpr;
	}
	public Evaluate(Visitor: CodeGenerator): void {
		Visitor.VisitForNode(this);
	}
	public toString(): string {
		var Cond: string = TypedNode.Stringify(this.CondExpr);
		var Body: string = TypedNode.Stringify(this.LoopBody);
		var Iter: string = TypedNode.Stringify(this.IterExpr);
		return "(For:" + this.Type + " Cond:" + Cond + " Body:"+ Body + " Iter:" + Iter + ")";
	}
}

// E.g., "for" "(" $Variable ":" $IterExpr ")" $LoopNode //
class ForEachNode extends TypedNode {
	public Variable: TypedNode;
	public IterExpr: TypedNode;
	public LoopBody: TypedNode;
	constructor(Type: GtType, Token: GtToken, Variable: TypedNode, IterExpr: TypedNode, LoopBody: TypedNode) {
		super(Type, Token);
		this.Variable = Variable;
		this.IterExpr = IterExpr;
		this.LoopBody = LoopBody;
	}
	public Evaluate(Visitor: CodeGenerator): void {
		Visitor.VisitForEachNode(this);
	}
	public toString(): string {
		var Var: string = TypedNode.Stringify(this.Variable);
		var Body: string = TypedNode.Stringify(this.LoopBody);
		var Iter: string = TypedNode.Stringify(this.IterExpr);
		return "(Foreach:" + this.Type + " Var:" + Var + " Body:"+ Body + " Iter:" + Iter + ")";
	}
}

class LoopNode extends TypedNode {
	public CondExpr: TypedNode;
	public LoopBody: TypedNode;
	public IterExpr: TypedNode;
	constructor(Type: GtType, Token: GtToken, CondExpr: TypedNode, LoopBody: TypedNode, IterExpr: TypedNode) {
		super(Type, Token);
		this.CondExpr = CondExpr;
		this.LoopBody = LoopBody;
		this.IterExpr = IterExpr;
	}
	public Evaluate(Visitor: CodeGenerator): void {
		Visitor.VisitLoopNode(this);
	}
	public toString(): string {
		var Cond: string = TypedNode.Stringify(this.CondExpr);
		var Body: string = TypedNode.Stringify(this.LoopBody);
		return "(Loop:" + this.Type + " Cond:" + Cond + " Body:"+ Body + ")";
	}
}

class LabelNode extends TypedNode {
	public Label: string;
	constructor(Type: GtType, Token: GtToken, Label: string) {
		super(Type, Token);
		this.Label = Label;
	}
	public Evaluate(Visitor: CodeGenerator): void {
		Visitor.VisitLabelNode(this);
	}
	public toString(): string {
		return "(Label:" + this.Type + " " + this.Label + ")";
	}
}

class JumpNode extends TypedNode {
	public Label: string;
	constructor(Type: GtType, Token: GtToken, Label: string) {
		super(Type, Token);
		this.Label = Label;
	}
	public Evaluate(Visitor: CodeGenerator): void {
		Visitor.VisitJumpNode(this);
	}
	public toString(): string {
		return "(Jump:" + this.Type + " " + this.Label + ")";
	}
}

class ContinueNode extends TypedNode {
	public Label: string;
	constructor(Type: GtType, Token: GtToken, Label: string) {
		super(Type, Token);
		this.Label = Label;
	}
	public Evaluate(Visitor: CodeGenerator): void {
		Visitor.VisitContinueNode(this);
	}
	public toString(): string {
		return "(Continue:" + this.Type + ")";
	}
}

class BreakNode extends TypedNode {
	public Label: string;
	constructor(Type: GtType, Token: GtToken, Label: string) {
		super(Type, Token);
		this.Label = Label;
	}
	public Evaluate(Visitor: CodeGenerator): void {
		Visitor.VisitBreakNode(this);
	}
	public toString(): string {
		return "(Break:" + this.Type + ")";
	}
}

class ReturnNode extends TypedNode {
	public Expr: TypedNode;
	constructor(Type: GtType, Token: GtToken, Expr: TypedNode) {
		super(Type, Token);
		this.Expr = Expr;
	}
	public Evaluate(Visitor: CodeGenerator): void {
		Visitor.VisitReturnNode(this);
	}
	public toString(): string {
		var Text: string = "";
		if(Text != null) {
			Text = TypedNode.Stringify(this.Expr);
		}
		return "(Return:" + this.Type + " " + Text + ")";
	}
}

class ThrowNode extends TypedNode {
	public Expr: TypedNode;
	constructor(Type: GtType, Token: GtToken, Expr: TypedNode) {
		super(Type, Token);
		this.Expr = Expr;
	}
	public Evaluate(Visitor: CodeGenerator): void {
		Visitor.VisitThrowNode(this);
	}
	public toString(): string {
		return "(Throw:" + this.Type + " " + TypedNode.Stringify(this.Expr) + ")";
	}
}

class TryNode extends TypedNode {
	TryBlock: TypedNode;
	CatchBlock: TypedNode;
	FinallyBlock: TypedNode;
	constructor(Type: GtType, Token: GtToken, TryBlock: TypedNode, FinallyBlock: TypedNode) {
		super(Type, Token);
		this.TryBlock = TryBlock;
		this.FinallyBlock = FinallyBlock;
		this.CatchBlock = null;
	}
	// public addCatchBlock(TargetException: TypedNode, CatchBlock: TypedNode): void { //FIXME //
	// 	this.TargetException.add(TargetException); //
	// 	this.CatchBlock.add(CatchBlock); //
	// } //
	public Evaluate(Visitor: CodeGenerator): void {
		Visitor.VisitTryNode(this);
	}
	public toString(): string {
		var TryBlock: string = TypedNode.Stringify(this.TryBlock);
		return "(Try:" + this.Type + " " + TryBlock + ")";
	}
}

class SwitchNode extends TypedNode {
	constructor(Type: GtType, Token: GtToken) {
		super(Type, Token);
	}
	// CondExpr: TypedNode; //
	// Labels: Array<TypedNode>; //
	// Blocks: Array<TypedNode>; //
	public Evaluate(Visitor: CodeGenerator): void {
		Visitor.VisitSwitchNode(this);
	}
	public toString(): string {
		// FIXME //
		return "(Switch:" + this.Type + ")";
	}
}

class FunctionNode extends TypedNode {
	constructor(Type: GtType, Token: GtToken) {
		super(Type, Token); //  TODO //
	}
	public Evaluate(Visitor: CodeGenerator): void {
		Visitor.VisitFunctionNode(this);
	}
	public toString(): string {
		return "(Function:" + this.Type + ")";
	}
}

class ErrorNode extends TypedNode {
	constructor(Type: GtType, Token: GtToken) {
		super(Type, Token);
	}
	public Evaluate(Visitor: CodeGenerator): void {
		Visitor.VisitErrorNode(this);
	}
	public toString(): string {
		return "(Error:" + this.Type + " " + this.Token.toString() + ")";
	}
}

//  E.g., "ls" "-a".. //
class CommandNode extends TypedNode {
	public Params: Array<TypedNode>; /* ["ls", "-la", "/", ...] */
	public PipedNextNode: TypedNode;
	constructor(Type: GtType, KeyToken: GtToken, PipedNextNode: TypedNode) {
		super(Type, KeyToken);
		this.PipedNextNode = PipedNextNode;
		this.Params = new Array<TypedNode>();
	}
	public Append(Expr: TypedNode): void {
		this.Params.add(Expr);
	}

	public Evaluate(Visitor: CodeGenerator): void {
		Visitor.VisitCommandNode(this);
	}
	public toString(): string {
		var Param: string = "";
		var i: number = 0;
		while(i < ListSize(this.Params)) {
			var Node: TypedNode = this.Params.get(i);
			if(i != 0) {
				Param += ", ";
			}
			Param += TypedNode.Stringify(Node);
			i = i + 1;
		}
		return "(Command:" + this.Type + " " + Param + ")";
	}
}

class GtObject {
	public Type: GtType;
	constructor(Type: GtType) {
		this.Type = Type;
	}
}

class GtType {
	public PackageNameSpace: GtNameSpace;
	ClassFlag: number;
	public Context: GtContext;
	ClassId: number;
	public ShortClassName: string;
	SuperClass: GtType;
	public SearchSuperMethodClass: GtType;
	public DefaultNullValue: Object;
	BaseClass: GtType;
	Types: GtType[];
	public LocalSpec: Object;

	constructor(Context: GtContext, ClassFlag: number, ClassName: string, DefaultNullValue: Object) {
		this.Context = Context;
		this.ClassFlag = ClassFlag;
		this.ShortClassName = ClassName;
		this.SuperClass = null;
		this.BaseClass = this;
		this.SearchSuperMethodClass = null;
		this.DefaultNullValue = DefaultNullValue;
		this.LocalSpec = null;
		this.ClassId = Context.ClassCount;
		Context.ClassCount += 1;
		this.Types = null;
		DebugP("new class: " + this.ShortClassName + ", ClassId=" + this.ClassId);
	}

	 IsGenericType(): boolean {
		return (this.Types != null);
	}

	// Don: Note'tthis: directly: call.Context: Use.instead: GetGenericType. //
	public CreateGenericType(BaseIndex: number, TypeList: Array<GtType>, ShortName: string): GtType {
		var GenericType: GtType = new GtType(this.Context, this.ClassFlag, ShortName, null);
		GenericType.BaseClass = this.BaseClass;
		GenericType.SearchSuperMethodClass = this.BaseClass;
		GenericType.SuperClass = this.SuperClass;
		this.Types = LangDeps.CompactTypeList(BaseIndex, TypeList);
		return GenericType;
	}

	public SetParamType(ParamType: GtType): void {
		this.Types = new Array<GtType>(1);
		this.Types[0] = ParamType;
	}

	public toString(): string {
		return this.ShortClassName;
	}

	 GetMethodId(MethodName: string): string {
		return "" + this.ClassId + "@" + MethodName;
	}

	 Accept(Type: GtType): boolean {
		if(this == Type || this == this.Context.AnyType) {
			return true;
		}
		return false;
	}
}

class GtMethod {
	public Layer: GtLayer;
	public MethodFlag: number;
	MethodSymbolId: number;
	public MethodName: string;
	public LocalFuncName: string;
	public Types: GtType[];
	public ElderMethod: GtMethod;

	constructor(MethodFlag: number, MethodName: string, BaseIndex: number, ParamList: Array<GtType>) {
		this.MethodFlag = MethodFlag;
		this.MethodName = MethodName;
		this.MethodSymbolId = GetCanonicalSymbolId(MethodName);
		this.Types = LangDeps.CompactTypeList(BaseIndex, ParamList);
		LangDeps.Assert(this.Types.length > 0);
		this.Layer = null;
		this.ElderMethod = null;
		
		var Name: string = this.MethodName;
		if(!LangDeps.IsLetter(LangDeps.CharAt(Name, 0))) {
			Name = "operator" + this.MethodSymbolId;
		}
		if(!this.Is(ExportMethod)) {
			Name = Name + "__" + Mangle(this.GetRecvType(), BaseIndex + 1, ParamList);
		}
		this.LocalFuncName = Name;
	}

	public toString(): string {
		var s: string = this.MethodName + "(";
		var i: number = 0;
		while(i < this.GetParamSize()) {
			var ParamType: GtType = this.GetParamType(i);
			if(i > 0) {
				s += ", ";
			}
			s += ParamType.ShortClassName;
			i += 1;
		}
		return s + ": " + this.GetReturnType();
	}

	public Is(Flag: number): boolean {
		return IsFlag(this.MethodFlag, Flag);
	}

	 GetReturnType(): GtType {
		return this.Types[0];
	}

	 GetRecvType(): GtType {
		if(this.Types.length == 1){
			return this.Types[0].Context.VoidType;
		}
		return this.Types[1];
	}

	 GetParamSize(): number {
		return this.Types.length - 1;
	}

	 GetParamType(ParamIdx: number): GtType {
		return this.Types[ParamIdx+1];
	}
}


class CodeGenerator {
	public LangName: string;
	public Context: GtContext;
	public GeneratedCodeStack: Array<Object>;

	constructor(LangName: string) {
		this.LangName = LangName;
		this.Context = null;
		this.GeneratedCodeStack = new Array<Object>();
	}
	
	public SetLanguageContext(Context: GtContext): void {
		this.Context = Context;
	}

	 UnsupportedNode(Type: GtType, ParsedTree: SyntaxTree): TypedNode {
		var Token: GtToken = ParsedTree.KeyToken;
		ParsedTree.NameSpace.ReportError(ErrorLevel, Token, this.LangName + "no: hassupport: for: language " + Token.ParsedText);
		return new ErrorNode(ParsedTree.NameSpace.Context.VoidType, ParsedTree.KeyToken);
	}

	public CreateConstNode(Type: GtType, ParsedTree: SyntaxTree, Value: Object): TypedNode {
		return new ConstNode(Type, ParsedTree.KeyToken, Value);
	}

	public CreateNullNode(Type: GtType, ParsedTree: SyntaxTree): TypedNode {
		return new NullNode(Type, ParsedTree.KeyToken);
	}

	public CreateLocalNode(Type: GtType, ParsedTree: SyntaxTree, LocalName: string): TypedNode {
		return new LocalNode(Type, ParsedTree.KeyToken, LocalName);
	}

	public CreateGetterNode(Type: GtType, ParsedTree: SyntaxTree, Method: GtMethod, Expr: TypedNode): TypedNode {
		return new GetterNode(Type, ParsedTree.KeyToken, Method, Expr);
	}

	public CreateIndexerNode(Type: GtType, ParsedTree: SyntaxTree, Method: GtMethod, Expr: TypedNode, Index: TypedNode): TypedNode {
		return new IndexerNode(Type, ParsedTree.KeyToken, Method, Expr, Index);
	}

	public CreateApplyNode(Type: GtType, ParsedTree: SyntaxTree, Method: GtMethod): TypedNode {
		return new ApplyNode(Type, ParsedTree.KeyToken, Method);
	}

	public CreateMessageNode(Type: GtType, ParsedTree: SyntaxTree, RecvNode: TypedNode, Method: GtMethod): TypedNode {
		return new MessageNode(Type, ParsedTree.KeyToken, Method, RecvNode);
	}

	public CreateNewNode(Type: GtType, ParsedTree: SyntaxTree): TypedNode {
		return new NewNode(Type, ParsedTree.KeyToken);
	}

	public CreateUnaryNode(Type: GtType, ParsedTree: SyntaxTree, Method: GtMethod, Expr: TypedNode): TypedNode {
		return new UnaryNode(Type, ParsedTree.KeyToken, Method, Expr);
	}

	public CreateSuffixNode(Type: GtType, ParsedTree: SyntaxTree, Method: GtMethod, Expr: TypedNode): TypedNode {
		return new SuffixNode(Type, ParsedTree.KeyToken, Method, Expr);
	}

	public CreateBinaryNode(Type: GtType, ParsedTree: SyntaxTree, Method: GtMethod, Left: TypedNode, Right: TypedNode): TypedNode {
		return new BinaryNode(Type, ParsedTree.KeyToken, Method, Left, Right);
	}

	public CreateAndNode(Type: GtType, ParsedTree: SyntaxTree, Left: TypedNode, Right: TypedNode): TypedNode {
		return new AndNode(Type, ParsedTree.KeyToken, Left, Right);
	}

	public CreateOrNode(Type: GtType, ParsedTree: SyntaxTree, Left: TypedNode, Right: TypedNode): TypedNode {
		return new OrNode(Type, ParsedTree.KeyToken, Left, Right);
	}

	public CreateAssignNode(Type: GtType, ParsedTree: SyntaxTree, Left: TypedNode, Right: TypedNode): TypedNode {
		return new AssignNode(Type, ParsedTree.KeyToken, Left, Right);
	}

	public CreateLetNode(Type: GtType, ParsedTree: SyntaxTree, DeclType: GtType, VarNode: TypedNode, Block: TypedNode): TypedNode {
		return new LetNode(Type, ParsedTree.KeyToken, DeclType, VarNode, Block);
	}

	public CreateIfNode(Type: GtType, ParsedTree: SyntaxTree, Cond: TypedNode, Then: TypedNode, Else: TypedNode): TypedNode {
		return new IfNode(Type, ParsedTree.KeyToken, Cond, Then, Else);
	}

	public CreateSwitchNode(Type: GtType, ParsedTree: SyntaxTree, Match: TypedNode): TypedNode {
		return null;
	}

	public CreateWhileNode(Type: GtType, ParsedTree: SyntaxTree, Cond: TypedNode, Block: TypedNode): TypedNode {
		return new WhileNode(Type, ParsedTree.KeyToken, Cond, Block);
	}

	public CreateDoWhileNode(Type: GtType, ParsedTree: SyntaxTree, Cond: TypedNode, Block: TypedNode): TypedNode {
		return new DoWhileNode(Type, ParsedTree.KeyToken, Cond, Block);
	}

	public CreateForNode(Type: GtType, ParsedTree: SyntaxTree, Cond: TypedNode, IterNode: TypedNode, Block: TypedNode): TypedNode {
		return new ForNode(Type, ParsedTree.KeyToken, Cond, Block, IterNode);
	}

	public CreateForEachNode(Type: GtType, ParsedTree: SyntaxTree, VarNode: TypedNode, IterNode: TypedNode, Block: TypedNode): TypedNode {
		return new ForEachNode(Type, ParsedTree.KeyToken, VarNode, IterNode, Block);
	}

	public CreateLoopNode(Type: GtType, ParsedTree: SyntaxTree, Cond: TypedNode, Block: TypedNode, IterNode: TypedNode): TypedNode {
		return new LoopNode(Type, ParsedTree.KeyToken, Cond, Block, IterNode);
	}

	public CreateReturnNode(Type: GtType, ParsedTree: SyntaxTree, Node: TypedNode): TypedNode {
		return new ReturnNode(Type, ParsedTree.KeyToken, Node);
	}

	public CreateLabelNode(Type: GtType, ParsedTree: SyntaxTree, Node: TypedNode): TypedNode {
		return null;
	}

	public CreateJumpNode(Type: GtType, ParsedTree: SyntaxTree, Node: TypedNode, Label: string): TypedNode {
		return new JumpNode(Type, ParsedTree.KeyToken, Label);
	}

	public CreateBreakNode(Type: GtType, ParsedTree: SyntaxTree, Node: TypedNode, Label: string): TypedNode {
		return new BreakNode(Type, ParsedTree.KeyToken, Label);
	}

	public CreateContinueNode(Type: GtType, ParsedTree: SyntaxTree, Node: TypedNode, Label: string): TypedNode {
		return new ContinueNode(Type, ParsedTree.KeyToken, Label);
	}

	public CreateTryNode(Type: GtType, ParsedTree: SyntaxTree, TryBlock: TypedNode, FinallyBlock: TypedNode): TypedNode {
		return new TryNode(Type, ParsedTree.KeyToken, TryBlock, FinallyBlock);
	}

	public CreateThrowNode(Type: GtType, ParsedTree: SyntaxTree, Node: TypedNode): TypedNode {
		return new ThrowNode(Type, ParsedTree.KeyToken, Node);
	}

	public CreateFunctionNode(Type: GtType, ParsedTree: SyntaxTree, Block: TypedNode): TypedNode {
		return null;
	}

	public CreateDefineNode(Type: GtType, ParsedTree: SyntaxTree, Module: Object): TypedNode {
		return null;
	}

	public CreateEmptyNode(Type: GtType, ParsedTree: SyntaxTree): TypedNode {
		return new TypedNode(ParsedTree.NameSpace.Context.VoidType, ParsedTree.KeyToken);
	}

	public CreateErrorNode(Type: GtType, ParsedTree: SyntaxTree): TypedNode {
		return new ErrorNode(ParsedTree.NameSpace.Context.VoidType, ParsedTree.KeyToken);
	}

	public CreateCommandNode(Type: GtType, ParsedTree: SyntaxTree, PipedNextNode: TypedNode): TypedNode {
		return new CommandNode(Type, ParsedTree.KeyToken, PipedNextNode);
	}
	

	public ParseMethodFlag(MethodFlag: number, MethodDeclTree: SyntaxTree): number {
		if(MethodDeclTree.HasAnnotation("Export")) {
			MethodFlag = MethodFlag | ExportMethod;
		}
		if(MethodDeclTree.HasAnnotation("Operator")) {
			MethodFlag = MethodFlag | OperatorMethod;
		}
		return MethodFlag;
	}
	
	public CreateMethod(MethodFlag: number, MethodName: string, BaseIndex: number, TypeList: Array<GtType>): GtMethod {
		return new GtMethod(MethodFlag, MethodName, BaseIndex, TypeList);
	}

	// ------------------------------------------------------------------------ //
	
	public VisitEmptyNode(EmptyNode: TypedNode): void {
		DebugP("node: empty: " + EmptyNode.Token.ParsedText);
	}

	public VisitSuffixNode(SuffixNode: SuffixNode): void {
		/*extension*/
	}

	public VisitUnaryNode(UnaryNode: UnaryNode): void {
		/*extension*/
	}

	public VisitIndexerNode(IndexerNode: IndexerNode): void {
		/*extension*/
	}

	public VisitMessageNode(MessageNode: MessageNode): void {
		/*extension*/
	}

	public VisitWhileNode(WhileNode: WhileNode): void {
		/*extension*/
	}

	public VisitDoWhileNode(DoWhileNode: DoWhileNode): void {
		/*extension*/
	}

	public VisitForNode(ForNode: ForNode): void {
		/*extension*/
	}

	public VisitForEachNode(ForEachNode: ForEachNode): void {
		/*extension*/
	}

	public VisitConstNode(Node: ConstNode): void {
		/*extension*/
	}

	public VisitNewNode(Node: NewNode): void {
		/*extension*/
	}

	public VisitNullNode(Node: NullNode): void {
		/*extension*/
	}

	public VisitLocalNode(Node: LocalNode): void {
		/*extension*/
	}

	public VisitGetterNode(Node: GetterNode): void {
		/*extension*/
	}

	public VisitApplyNode(Node: ApplyNode): void {
		/*extension*/
	}

	public VisitBinaryNode(Node: BinaryNode): void {
		/*extension*/
	}

	public VisitAndNode(Node: AndNode): void {
		/*extension*/
	}

	public VisitOrNode(Node: OrNode): void {
		/*extension*/
	}

	public VisitAssignNode(Node: AssignNode): void {
		/*extension*/
	}

	public VisitLetNode(Node: LetNode): void {
		/*extension*/
	}

	public VisitIfNode(Node: IfNode): void {
		/*extension*/
	}

	public VisitSwitchNode(Node: SwitchNode): void {
		/*extension*/
	}

	public VisitLoopNode(Node: LoopNode): void {
		/*extension*/
	}

	public VisitReturnNode(Node: ReturnNode): void {
		/*extension*/
	}

	public VisitLabelNode(Node: LabelNode): void {
		/*extension*/
	}

	public VisitJumpNode(Node: JumpNode): void {
		/*extension*/
	}

	public VisitBreakNode(Node: BreakNode): void {
		/*extension*/
	}

	public VisitContinueNode(Node: ContinueNode): void {
		/*extension*/
	}

	public VisitTryNode(Node: TryNode): void {
		/*extension*/
	}

	public VisitThrowNode(Node: ThrowNode): void {
		/*extension*/
	}

	public VisitFunctionNode(Node: FunctionNode): void {
		/*extension*/
	}

	public VisitErrorNode(Node: ErrorNode): void {
		/*extension*/
	}

	public VisitCommandNode(Node: CommandNode): void {
		/*extension*/
	}

	 VisitBlock(Node: TypedNode): void {
		var CurrentNode: TypedNode = Node;
		while(CurrentNode != null) {
			CurrentNode.Evaluate(this);
			CurrentNode = CurrentNode.NextNode;
		}
	}

	// must: Thisextended: beeach: language: in //
	public DefineFunction(Method: GtMethod, ParamNameList: Array<string>, Body: TypedNode): void {
		/*extenstion*/
	}

	public Eval(Node: TypedNode): Object {
		this.VisitBlock(Node);
		return null;
	}

	public AddClass(Type: GtType): void {
		/*extension*/
	}
	

	 PushCode(Code: Object): void{
		this.GeneratedCodeStack.add(Code);
	}

	 PopCode(): Object{
		var Size: number = this.GeneratedCodeStack.size();
		if(Size > 0){
			return this.GeneratedCodeStack.remove(Size - 1);
		}
		return "";
	}
}

class SourceGenerator extends CodeGenerator {
	public IndentLevel: number;
	public CurrentLevelIndentString: string;

	constructor(LangName: string) {
		super(LangName);
		this.IndentLevel = 0;
		this.CurrentLevelIndentString = null;
	}

	/* GeneratorUtils */
	
	 Indent(): void {
		this.IndentLevel += 1;
		this.CurrentLevelIndentString = null;
	}

	 UnIndent(): void {
		this.IndentLevel -= 1;
		this.CurrentLevelIndentString = null;
		LangDeps.Assert(this.IndentLevel >= 0);
	}

	 GetIndentString(): string {
		if(this.CurrentLevelIndentString == null) {
			this.CurrentLevelIndentString = JoinStrings("   ", this.IndentLevel);
		}
		return this.CurrentLevelIndentString;
	}

	 StringfyConstValue(ConstValue: Object): string {
		if(ConstValue instanceof String) {
			return "\"" + ConstValue + "\"";  //  FIXME \n //
		}
		return ConstValue.toString();
	}

	 PushSourceCode(Code: string): void{
		this.GeneratedCodeStack.add(Code);
	}

	 PopSourceCode(): string{
		return <string>this.PopCode();
	}

	 PopManyCode(n: number): string[] {
		var array: string[] = new Array<string>(n);
		var i: number = 0;
		while(i < n) {
			array[i] = this.PopSourceCode();
			i = i + 1;
		}
		return array;
	}

	 PopManyCodeReverse(n: number): string[] {
		var array: string[] = new Array<string>(n);
		var i: number = 0;
		while(i < n) {
			array[n - i - 1] = this.PopSourceCode();
			i = i  + 1;
		}
		return array;
	}

	 PopManyCodeAndJoin(n: number, reverse: boolean, prefix: string, suffix: string, delim: string): string {
		if(prefix == null) {
			prefix = "";
		}
		if(suffix == null) {
			suffix = "";
		}
		if(delim == null) {
			delim = "";
		}
		var array: string[] = null;
		if(reverse) {
			array = this.PopManyCodeReverse(n);
		}else{
			array = this.PopManyCode(n);
		}
		var Code: string = "";
		var i: number = 0;
		while(i < n) {
			if(i > 0) {
				Code += delim;
			}
			Code = Code + prefix + array[i] + suffix;
			i = i + 1;
		}
		return Code;
	}
	
}


