/// <reference path="LangDeps.ts" />


class TypedNode {
	ParentNode: TypedNode;
	PrevNode: TypedNode;
	NextNode: TypedNode;

	Type: GtType;
	Token: GtToken;

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
		return this;
	}

	Append(Node: TypedNode): void {
		/*extension*/
	}

	Evaluate(Visitor: any): void {
		/*extension*/
	}

	IsError(): boolean {
		return false;//TODO (this instanceof ErrorNode);
	}
	
	toString(): string {
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
}

class UnaryNode extends TypedNode {
	public Method: GtMethod;
	public Expr: TypedNode;
	constructor(Type: GtType, Token: GtToken, Method: GtMethod, Expr: TypedNode) {
		super(Type, Token);
		this.Method = Method;
		this.Expr = Expr;
	}
	public Evaluate(Visitor: GreenTeaGenerator): void {
		Visitor.VisitUnaryNode(this);
	}
}

class SuffixNode extends TypedNode {
	public Method: GtMethod;
	public Expr: TypedNode;
	constructor(Type: GtType, Token: GtToken, Method: GtMethod, Expr: TypedNode) {
		super(Type, Token);
		this.Method = Method;
		this.Expr = Expr;
	}
	public Evaluate(Visitor: GreenTeaGenerator): void {
		Visitor.VisitSuffixNode(this);
	}
}

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
	public Evaluate(Visitor: GreenTeaGenerator): void {
		Visitor.VisitBinaryNode(this);
	}
}

class AndNode extends TypedNode {
	public LeftNode: TypedNode;
	public RightNode: TypedNode;
	constructor(Type: GtType, Token: GtToken, Left: TypedNode, Right: TypedNode) {
		super(Type, Token);
		this.LeftNode  = Left;
		this.RightNode = Right;
	}
	public Evaluate(Visitor: GreenTeaGenerator): void {
		Visitor.VisitAndNode(this);
	}
	public toString(): string {
		return "(And:" + this.Type + " " + TypedNode.Stringify(this.LeftNode) + ", " + TypedNode.Stringify(this.RightNode) + ")";
	}
}

class OrNode extends TypedNode {
	public LeftNode: TypedNode;
	public RightNode: TypedNode;
	constructor(Type: GtType, Token: GtToken, Left: TypedNode, Right: TypedNode) {
		super(Type, Token);
		this.LeftNode  = Left;
		this.RightNode = Right;
	}
	public Evaluate(Visitor: GreenTeaGenerator): void {
		Visitor.VisitOrNode(this);
	}
	public toString(): string {
		return "(Or:" + this.Type + " " + TypedNode.Stringify(this.LeftNode) + ", " + TypedNode.Stringify(this.RightNode) + ")";
	}
}

class GetterNode extends TypedNode {
	public Expr: TypedNode;
	public Method: GtMethod;
	constructor(Type: GtType, Token: GtToken, Method: GtMethod, Expr: TypedNode) {
		super(Type, Token);
		this.Method = Method;
		this.Expr = Expr;
	}
	public Evaluate(Visitor: GreenTeaGenerator): void {
		Visitor.VisitGetterNode(this);
	}
	public toString(): string {
		return "(Getter:" + this.Type + " " + TypedNode.Stringify(this.Expr) + ", " + this.Method.MethodName + ")";
	}
}

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
	public Evaluate(Visitor: GreenTeaGenerator): void {
		Visitor.VisitIndexerNode(this);
	}
	public toString(): string {
		return "(Index:" + this.Type + " " + TypedNode.Stringify(this.Expr) + ", " + TypedNode.Stringify(this.Indexer) + ")";
	}
}

class AssignNode extends TypedNode {
	public LeftNode: TypedNode;
	public RightNode: TypedNode;
	constructor(Type: GtType, Token: GtToken, Left: TypedNode, Right: TypedNode) {
		super(Type, Token);
		this.LeftNode  = Left;
		this.RightNode = Right;
	}
	public Evaluate(Visitor: GreenTeaGenerator): void {
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
	public Evaluate(Visitor: GreenTeaGenerator): void {
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
	public Evaluate(Visitor: GreenTeaGenerator): void {
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
	public Evaluate(Visitor: GreenTeaGenerator): void {
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
	/*VarNode: letBlock: in end */
	constructor(Type: GtType, Token: GtToken, DeclType: GtType, VarNode: TypedNode, Block: TypedNode) {
		super(Type, Token);
		this.DeclType = DeclType;
		this.VarNode  = VarNode;
		this.BlockNode = Block;
	}
	public Evaluate(Visitor: GreenTeaGenerator): void {
		Visitor.VisitLetNode(this);
	}
	public toString(): string {
		var Block: string = TypedNode.Stringify(this.BlockNode);
		return "(Let:" + this.Type + " " + TypedNode.Stringify(this.VarNode) + " in {" + Block + "})";
	}
}

class ApplyNode extends TypedNode {
	public Method: GtMethod;
	public Params: Array<TypedNode>; /* [this, arg1, arg2, ...] */
	constructor(Type: GtType, KeyToken: GtToken, Method: GtMethod) {
		super(Type, KeyToken);
		this.Method = Method;
		this.Params = new Array<TypedNode>();
	}
	public Append(Expr: TypedNode): void {
		this.Params.add(Expr);
	}

	public Evaluate(Visitor: GreenTeaGenerator): void {
		Visitor.VisitApplyNode(this);
	}
	public toString(): string {
		var Param: string = "";
		for(var i = 0; i < this.Params.length; i++) {
			var Node: TypedNode = this.Params.get(i);
			if(i != 0) {
				Param += ", ";
			}
			Param += TypedNode.Stringify(Node);
		}
		return "(Apply:" + this.Type + " " + Param + ")";
	}
}

class MessageNode extends TypedNode {
	public Method: GtMethod;
	public Params: Array<TypedNode>; /* [this, arg1, arg2, ...] */
	constructor(Type: GtType, KeyToken: GtToken, Method: GtMethod) {
		super(Type, KeyToken);
		this.Method = Method;
		this.Params = new Array<TypedNode>();
	}
	public Append(Expr: TypedNode): void {
		this.Params.add(Expr);
	}

	public Evaluate(Visitor: GreenTeaGenerator): void {
		Visitor.VisitMessageNode(this);
	}
	public toString(): string {
		var Param: string = "";
		for(var i = 0; i < this.Params.length; i++) {
			var Node = this.Params[i];
			if(i != 0) {
				Param += ", ";
			}
			Param += TypedNode.Stringify(Node);
		}
		return "(Message:" + this.Type + " " + Param + ")";
	}
}

class NewNode extends TypedNode {
	public Params: Array<TypedNode>; /* [this, arg1, arg2, ...] */
	constructor(Type: GtType, Token: GtToken) {
		super(Type, Token);
		this.Params = new Array<TypedNode>();
	}
	public Append(Expr: TypedNode): void {
		this.Params.add(Expr);
	}
	public Evaluate(Visitor: GreenTeaGenerator): void {
		Visitor.VisitNewNode(this);
	}
	public toString(): string {
		var Param: string = "";
		for(var i = 0; i < this.Params.length; i++) {
			var Node = this.Params[i];
			if(i != 0) {
				Param += ", ";
			}
			Param += TypedNode.Stringify(Node);
		}
		return "(New:" + this.Type + " " + Param + ")";
	}
}

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
	public Evaluate(Visitor: GreenTeaGenerator): void {
		Visitor.VisitIfNode(this);
	}
	public toString(): string {
		var Cond: string = TypedNode.Stringify(this.CondExpr);
		var Then: string = TypedNode.Stringify(this.ThenNode);
		var Else: string = TypedNode.Stringify(this.ElseNode);
		return "(If:" + this.Type + " Cond:" + Cond + " Then:"+ Then + " Else:" + Else + ")";
	}
}

class WhileNode extends TypedNode {
	public CondExpr: TypedNode;
	public LoopBody: TypedNode;
	constructor(Type: GtType, Token: GtToken, CondExpr: TypedNode, LoopBody: TypedNode) {
		super(Type, Token);
		this.CondExpr = CondExpr;
		this.LoopBody = LoopBody;
	}
	public Evaluate(Visitor: GreenTeaGenerator): void {
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
	public Evaluate(Visitor: GreenTeaGenerator): void {
		Visitor.VisitDoWhileNode(this);
	}
	public toString(): string {
		var Cond: string = TypedNode.Stringify(this.CondExpr);
		var Body: string = TypedNode.Stringify(this.LoopBody);
		return "(DoWhile:" + this.Type + " Cond:" + Cond + " Body:"+ Body + ")";
	}
}

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
	public Evaluate(Visitor: GreenTeaGenerator): void {
		Visitor.VisitForNode(this);
	}
	public toString(): string {
		var Cond: string = TypedNode.Stringify(this.CondExpr);
		var Body: string = TypedNode.Stringify(this.LoopBody);
		var Iter: string = TypedNode.Stringify(this.IterExpr);
		return "(For:" + this.Type + " Cond:" + Cond + " Body:"+ Body + " Iter:" + Iter + ")";
	}
}

class ForEachNode extends TypedNode {
	public CondExpr: TypedNode;
	public Variable: TypedNode;
	public IterExpr: TypedNode;
	public LoopBody: TypedNode;
	constructor(Type: GtType, Token: GtToken, Variable: TypedNode, IterExpr: TypedNode, LoopBody: TypedNode) {
		super(Type, Token);
		this.Variable = Variable;
		this.IterExpr = IterExpr;
		this.LoopBody = LoopBody;
	}
	public Evaluate(Visitor: GreenTeaGenerator): void {
		Visitor.VisitForEachNode(this);
	}
	public toString(): string {
		var Cond: string = TypedNode.Stringify(this.CondExpr);
		var Var: string = TypedNode.Stringify(this.Variable);
		var Body: string = TypedNode.Stringify(this.LoopBody);
		var Iter: string = TypedNode.Stringify(this.IterExpr);
		return "(Foreach:" + this.Type + " Var:" + Var + " Cond:" + Cond + " Body:"+ Body + " Iter:" + Iter + ")";
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
	public Evaluate(Visitor: GreenTeaGenerator): void {
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
	public Evaluate(Visitor: GreenTeaGenerator): void {
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
	public Evaluate(Visitor: GreenTeaGenerator): void {
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
	public Evaluate(Visitor: GreenTeaGenerator): void {
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
	public Evaluate(Visitor: GreenTeaGenerator): void {
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
	public Evaluate(Visitor: GreenTeaGenerator): void {
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
	public Evaluate(Visitor: GreenTeaGenerator): void {
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
// 	public addCatchBlock(TargetException: TypedNode, CatchBlock: TypedNode): void { //FIXME //
// 		this.TargetException.add(TargetException); //
// 		this.CatchBlock.add(CatchBlock); //
// 	} //
	public Evaluate(Visitor: GreenTeaGenerator): void {
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
// 	CondExpr: TypedNode; //
// 	Labels: Array<TypedNode>; //
// 	Blocks: Array<TypedNode>; //
	public Evaluate(Visitor: GreenTeaGenerator): void {
		Visitor.VisitSwitchNode(this);
	}
	public toString(): string {
		// FIXME //
		return "(Switch:" + this.Type + ")";
	}
}

class DefineNode extends TypedNode {
	DefInfo: GtDef;
	constructor(Type: GtType, Token: GtToken, DefInfo: GtDef) {
		super(Type, Token);
		this.DefInfo = DefInfo;
	}
	public Evaluate(Visitor: GreenTeaGenerator): void {
		Visitor.VisitDefineNode(this);
	}
	public toString(): string {
		return "(Define:" + this.Type + " " + this.DefInfo.toString() /*FIXME*/ + ")";
	}
}

class FunctionNode extends TypedNode {
	constructor(Type: GtType, Token: GtToken) {
		super(Type, Token); //  TODO //
	}
	public Evaluate(Visitor: GreenTeaGenerator): void {
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
	public Evaluate(Visitor: GreenTeaGenerator): void {
		Visitor.VisitErrorNode(this);
	}
	public toString(): string {
		return "(Error:" + this.Type + " " + this.Token.toString() + ")";
	}
}

class GreenTeaGenerator {
	GeneratedCodeStack: Array<string>;

	constructor() {
		this.GeneratedCodeStack = new Array<string>();
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

	public CreateMessageNode(Type: GtType, ParsedTree: SyntaxTree, Method: GtMethod): TypedNode {
		return new MessageNode(Type, ParsedTree.KeyToken, Method);
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

	public CreateTryNode(Type: GtType, ParsedTree: SyntaxTree, TryNode_: TypedNode, FinallyNode: TypedNode): TypedNode {
		return new TryNode(Type, ParsedTree.KeyToken, TryNode_, FinallyNode);
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

	public CreateErrorNode(Type: GtType, ParsedTree: SyntaxTree): TypedNode {
		return new ErrorNode(Type, ParsedTree.KeyToken);
	}




	public VisitSuffixNode(suffixNode: SuffixNode): void {
		/*extension*/
	}

	public VisitUnaryNode(unaryNode: UnaryNode): void {
		/*extension*/
	}

	public VisitIndexerNode(indexerNode: IndexerNode): void {
		/*extension*/
	}

	public VisitMessageNode(messageNode: MessageNode): void {
		/*extension*/
	}

	public VisitWhileNode(whileNode: WhileNode): void {
		/*extension*/
	}

	public VisitDoWhileNode(doWhileNode: DoWhileNode): void {
		/*extension*/
	}

	public VisitForNode(forNode: ForNode): void {
		/*extension*/
	}

	public VisitForEachNode(forEachNode: ForEachNode): void {
		/*extension*/
	}

	public VisitDefineNode(Node: DefineNode): void {
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

	VisitBlock(Node: TypedNode): void {
		var CurrentNode: TypedNode = Node;
		while(CurrentNode != null) {
			CurrentNode.Evaluate(this);
			CurrentNode = CurrentNode.NextNode;
		}
	}

	// must: Thisextended: beeach: in language //
	public Eval(Node: TypedNode): Object {
		this.VisitBlock(Node);
		return null;
	}

	public AddClass(Type: GtType): void {
		/*extension*/
	}

	PushCode(Code: string): void {
		this.GeneratedCodeStack.push(Code);
	}

	PopCode(): string{
		var Size: number = this.GeneratedCodeStack.length;
		if(Size > 0){
			return this.GeneratedCodeStack.pop();
		}
		return "";
	}

}

class IndentGenerator {
	private IndentLevel: number					= 0;
	private CurrentLevelIndentString: string	= "";
	private IndentString: string				= "\t";

	public constructor();
	public constructor(Tabstop?: number) {
		if(Tabstop){
			this.IndentString = IndentGenerator.Repeat(" ", Tabstop);
		}
	}

	static Repeat(Unit: string, Times: number): string {
		var Builder: string;
		for(var i = 0; i < Times; ++i) {
			Builder += Unit;
		}
		return Builder;
	}

	public SetIndent(Level: number): void {
		if(Level < 0)
			Level = 0;
		if(this.IndentLevel != Level) {
			this.IndentLevel = Level;
			this.CurrentLevelIndentString = IndentGenerator.Repeat(this.IndentString, Level);
		}
	}

	public AddIndent(LevelDelta: number): void {
		this.SetIndent(this.IndentLevel + LevelDelta);
	}

	public Get(): string {
		return this.CurrentLevelIndentString;
	}

	public GetAndAddIndent(LevelDelta: number): string {
		var IndentString: string = this.CurrentLevelIndentString;
		this.AddIndent(LevelDelta);
		return IndentString;
	}

	public AddIndentAndGet(LevelDelta: number): string {
		this.AddIndent(LevelDelta);
		return this.CurrentLevelIndentString;
	}
}
