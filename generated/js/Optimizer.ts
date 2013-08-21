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



class ConstantFolder extends GtGenerator {
	BooleanType: GtType;

	 constructor(TargetCode: string, OutputFile: string, GeneratorFlag: number) {
		super(TargetCode, OutputFile, GeneratorFlag);
	}
	public InitContext(Context: GtClassContext): void {
		this.BooleanType = Context.BooleanType;
	}

	FoldBlock(Block: GtNode): GtNode {
		if(Block == null) {
			return null;
		}
		var Head: GtNode = this.Fold(Block);
		var Tmp: GtNode = Head;
		Block = Block.NextNode;
		while(Block != null) {
			Tmp.NextNode = this.Fold(Block);
			Block = Block.NextNode;
			Tmp = Tmp.NextNode;
		}
		return Head;
	}

	FoldCast(Node: CastNode): GtNode {
		Node.Expr = this.Fold(Node.Expr);
		//  Node = Eval(Node); //
		return Node;
	}
	FoldUnary(Node: UnaryNode): GtNode {
		Node.Expr = this.Fold(Node.Expr);
		//  Node = Eval(Node); //
		return Node;
	}
	
	FoldSuffix(Node: SuffixNode): GtNode {
		Node.Expr = this.Fold(Node.Expr);
		//  Node = Eval(Node); //
		return Node;
	}
	FoldExists(Node: ExistsNode): GtNode {
		Node.Expr = this.Fold(Node.Expr);
		//  Node = Eval(Node); //
		return Node;
	}
	FoldAssign(Node: AssignNode): GtNode {
		Node.RightNode = this.Fold(Node.RightNode);
		return Node;
	}
	FoldSelfAssign(Node: SelfAssignNode): GtNode {
		Node.RightNode = this.Fold(Node.RightNode);
		return Node;
	}
	FoldInstanceOf(Node: InstanceOfNode): GtNode {
		Node.ExprNode = this.Fold(Node.ExprNode);
		//  Node = Eval(Node); //
		return Node;
	}
	FoldGetter(Node: GetterNode): GtNode {
		Node.Expr = this.Fold(Node.Expr);
		//  Eval(Node); //
		return Node;
	}
	FoldIndexer(Node: IndexerNode): GtNode {
		Node.IndexAt = this.Fold(Node.IndexAt);
		return Node;
	}
	FoldBinary(Node: BinaryNode): GtNode {
		return this.FoldBinaryNode(Node, Node.Func, Node.LeftNode, Node.RightNode);
	}
	FoldBinaryNode(Original: BinaryNode, Func: GtFunc, Left: GtNode, Right: GtNode): GtNode {
		Left = this.Fold(Left);
		Right = this.Fold(Right);
		if(Func != null) {
			if(Left instanceof ConstNode) {
				if(Right instanceof ConstNode) {
					if(Func.Is(ConstFunc)) {
						//  Eval(); //
					}
				}
			}
		}
		if(Original != null) {
			Original.LeftNode = Left;
			Original.RightNode = Right;
		}
		return Original;
	}
	
	private FoldTrinary(Node: TrinaryNode): GtNode {
		Node.CondExpr = this.Fold(Node.CondExpr);
		Node.ThenExpr = this.Fold(Node.ThenExpr);
		Node.ElseExpr = this.Fold(Node.ElseExpr);
		if(Node.CondExpr instanceof ConstNode && Node.CondExpr.Type.equals(this.BooleanType)) {
			if(this.ConstValue(Node.CondExpr).equals(true)) {
				return Node.ThenExpr;
			} else {
				return Node.ElseExpr;
			}
		}
		return Node;
	}

	private FoldOr(Node: OrNode): GtNode {
		var Left: GtNode = Node.LeftNode;
		var Right: GtNode = Node.RightNode;
		return this.FoldOrNode(Node, Left, Right);
	}

	private FoldOrNode(Original: GtNode, Left: GtNode, Right: GtNode): GtNode {
		Left = this.Fold(Left);
		Right = this.Fold(Right);
		if(Left.Type == this.BooleanType && Right.Type == this.BooleanType) {
			if(Left instanceof ConstNode) {
				if(this.ConstValue(Left).equals(false)) {
					return Right;
				}
			}
			if(Right instanceof ConstNode) {
				if(this.ConstValue(Right).equals(false)) {
					return Left;
				}
			}
		}
		return Original;
	}

	FoldAnd(Node: AndNode): GtNode {
		var Left: GtNode = Node.LeftNode;
		var Right: GtNode = Node.RightNode;
		return this.FoldAndNode(Node, Left, Right);
	}
	
	private FoldAndNode(Original: GtNode, Left: GtNode, Right: GtNode): GtNode {
		Left = this.Fold(Left);
		Right = this.Fold(Right);
		if(Left.Type == this.BooleanType && Right.Type == this.BooleanType) {
			if(Left instanceof ConstNode) {
				if(this.ConstValue(Left).equals(false)) {
					return Left;
				}
				if(Right instanceof ConstNode && this.ConstValue(Right).equals(true)) {
					return Left;
				}
			}
			if(Right instanceof ConstNode) {
				if(this.ConstValue(Right).equals(false)) {
					return Right;
				}
			}
		}
		return Original;
	}

	FoldLet(Node: LetNode): GtNode {
		Node.InitNode = this.Fold(Node.InitNode);
		return Node;
	}
	FoldSlice(Node: SliceNode): GtNode {
		Node.Index1 = this.Fold(Node.Index1);
		Node.Index2 = this.Fold(Node.Index2);
		return Node;
	}
	FoldApply(Node: ApplyNode): GtNode {
		var i: number = 0;
		while(i < Node.Params.size()) {
			var Param: GtNode = Node.Params.get(i);
			Node.Params.set(i, this.Fold(Param));
			i = i + 1;
		}
		return Node;
	}
	FoldMessage(Node: MessageNode): GtNode {
		Node.RecvNode = this.Fold(Node.RecvNode);
		var i: number = 0;
		while(i < Node.Params.size()) {
			var Param: GtNode = Node.Params.get(i);
			Node.Params.set(i, this.Fold(Param));
			i = i + 1;
		}
		return Node;
	}
	FoldIf(Node: IfNode): GtNode {
		Node.CondExpr = this.Fold(Node.CondExpr);
		Node.ThenNode = this.FoldBlock(Node.ThenNode);
		Node.ElseNode = this.FoldBlock(Node.ElseNode);
		if(Node.CondExpr.Type == this.BooleanType) {
			if(this.ConstValue(Node.CondExpr).equals(true)) {
				return Node.ThenNode;
			} else {
				if(Node.ElseNode == null) {
					return this.CreateEmptyNode(Node.Type);
				}
				return Node.ElseNode;
			}
		}
		return Node;
	}
	FoldWhile(Node: WhileNode): GtNode {
		Node.CondExpr = this.Fold(Node.CondExpr);
		Node.LoopBody = this.FoldBlock(Node.LoopBody);
		if(this.ConstValue(Node.CondExpr).equals(false)) {
			return this.CreateEmptyNode(Node.Type);
		}
		return Node;
	}
	FoldDoWhile(Node: DoWhileNode): GtNode {
		Node.CondExpr = this.Fold(Node.CondExpr);
		Node.LoopBody = this.FoldBlock(Node.LoopBody);
		if(this.ConstValue(Node.CondExpr).equals(false)) {
			return Node.LoopBody;
		}
		return Node;
	}
	FoldFor(Node: ForNode): GtNode {
		Node.IterExpr = this.Fold(Node.IterExpr);
		Node.CondExpr = this.Fold(Node.CondExpr);
		Node.LoopBody = this.FoldBlock(Node.LoopBody);
		return Node;
	}
	FoldReturn(Node: ReturnNode): GtNode {
		Node.Expr = this.Fold(Node.Expr);
		return Node;
	}
	FoldThrow(Node: ThrowNode): GtNode {
		Node.Expr = this.Fold(Node.Expr);
		return Node;
	}
	FoldTry(Node: TryNode): GtNode {
		Node.TryBlock = this.FoldBlock(Node.TryBlock);
		Node.CatchBlock = this.FoldBlock(Node.CatchBlock);
		Node.FinallyBlock = this.FoldBlock(Node.FinallyBlock);
		return Node;
	}
	FoldCommand(Node: CommandNode): GtNode {
		var i: number = 0;
		while(i < Node.Params.size()) {
			var Param: GtNode = Node.Params.get(i);
			Node.Params.set(i, this.Fold(Param));
			i = i + 1;
		}
		return Node;
	}
	Fold(SourceNode: GtNode): GtNode {
		if(SourceNode == null) {
			return null;
		}
		else if(SourceNode instanceof ConstNode) {
		}
		else if(SourceNode instanceof LocalNode) {
		}
		else if(SourceNode instanceof NullNode) {
		}
		else if(SourceNode instanceof CastNode) {
			return this.FoldCast(<CastNode> SourceNode);
		}
		else if(SourceNode instanceof UnaryNode) {
			return this.FoldUnary(<UnaryNode> SourceNode);
		}
		else if(SourceNode instanceof SuffixNode) {
			return this.FoldSuffix(<SuffixNode> SourceNode);
		}
		else if(SourceNode instanceof ExistsNode) {
			return this.FoldExists(<ExistsNode> SourceNode);
		}
		else if(SourceNode instanceof AssignNode) {
			return this.FoldAssign(<AssignNode> SourceNode);
		}
		else if(SourceNode instanceof SelfAssignNode) {
			return this.FoldSelfAssign(<SelfAssignNode> SourceNode);
		}
		else if(SourceNode instanceof InstanceOfNode) {
			return this.FoldInstanceOf(<InstanceOfNode> SourceNode);
		}
		else if(SourceNode instanceof BinaryNode) {
			return this.FoldBinary(<BinaryNode> SourceNode);
		}
		else if(SourceNode instanceof AndNode) {
			return this.FoldAnd(<AndNode> SourceNode);
		}
		else if(SourceNode instanceof OrNode) {
			return this.FoldOr(<OrNode> SourceNode);
		}
		else if(SourceNode instanceof TrinaryNode) {
			return this.FoldTrinary(<TrinaryNode> SourceNode);
		}
		else if(SourceNode instanceof GetterNode) {
			return this.FoldGetter(<GetterNode> SourceNode);
		}
		else if(SourceNode instanceof IndexerNode) {
			return this.FoldIndexer(<IndexerNode> SourceNode);
		}
		else if(SourceNode instanceof SliceNode) {
			return this.FoldSlice(<SliceNode> SourceNode);
		}
		else if(SourceNode instanceof LetNode) {
			return this.FoldLet(<LetNode> SourceNode);
		}
		else if(SourceNode instanceof ApplyNode) {
			return this.FoldApply(<ApplyNode> SourceNode);
		}
		else if(SourceNode instanceof MessageNode) {
			return this.FoldMessage(<MessageNode> SourceNode);
		}
		else if(SourceNode instanceof NewNode) {
		}
		else if(SourceNode instanceof IfNode) {
			return this.FoldIf(<IfNode> SourceNode);
		}
		else if(SourceNode instanceof WhileNode) {
			return this.FoldWhile(<WhileNode> SourceNode);
		}
		else if(SourceNode instanceof DoWhileNode) {
			return this.FoldDoWhile(<DoWhileNode> SourceNode);
		}
		else if(SourceNode instanceof ForNode) {
			return this.FoldFor(<ForNode> SourceNode);
		}
		else if(SourceNode instanceof ForEachNode) {
		}
		else if(SourceNode instanceof ContinueNode) {
		}
		else if(SourceNode instanceof BreakNode) {
		}
		else if(SourceNode instanceof ReturnNode) {
			return this.FoldReturn(<ReturnNode> SourceNode);
		}
		else if(SourceNode instanceof ThrowNode) {
			return this.FoldThrow(<ThrowNode> SourceNode);
		}
		else if(SourceNode instanceof TryNode) {
			return this.FoldTry(<TryNode> SourceNode);
		}
		else if(SourceNode instanceof SwitchNode) {
		}
		else if(SourceNode instanceof FunctionNode) {
		}
		else if(SourceNode instanceof ErrorNode) {
		}
		else if(SourceNode instanceof CommandNode) {
			return this.FoldCommand(<CommandNode> SourceNode);
		}
		return SourceNode;
	}

	private ConstValue(Node: GtNode): Object {
		if(Node instanceof ConstNode) {
			return (<ConstNode> Node).ConstValue;
		}
		return null;
	}

	public CreateGetterNode(Type: GtType, ParsedTree: GtSyntaxTree, Func: GtFunc, Expr: GtNode): GtNode {
		return new GetterNode(Type, ParsedTree.KeyToken, Func, this.Fold(Expr));
	}

	public CreateIndexerNode(Type: GtType, ParsedTree: GtSyntaxTree, Func: GtFunc, Expr: GtNode, Index: GtNode): GtNode {
		return new IndexerNode(Type, ParsedTree.KeyToken, Func, this.Fold(Expr), this.Fold(Index));
	}

	public CreateUnaryNode(Type: GtType, ParsedTree: GtSyntaxTree, Func: GtFunc, Expr: GtNode): GtNode {
		return new UnaryNode(Type, ParsedTree.KeyToken, Func, this.Fold(Expr));
	}

	public CreateSuffixNode(Type: GtType, ParsedTree: GtSyntaxTree, Func: GtFunc, Expr: GtNode): GtNode {
		return new SuffixNode(Type, ParsedTree.KeyToken, Func, this.Fold(Expr));
	}

	public CreateBinaryNode(Type: GtType, ParsedTree: GtSyntaxTree, Func: GtFunc, Left: GtNode, Right: GtNode): GtNode {
		Left = this.Fold(Left);
		Right = this.Fold(Right);
		var Node: GtNode = this.FoldBinaryNode(null, Func, Left, Right);
		if(Node != null) {
			return Node;
		}
		return new BinaryNode(Type, ParsedTree.KeyToken, Func, Left, Right);
	}

	public CreateAndNode(Type: GtType, ParsedTree: GtSyntaxTree, Left: GtNode, Right: GtNode): GtNode {
		Left = this.Fold(Left);
		Right = this.Fold(Right);
		var Node: GtNode = this.FoldAndNode(null, Left, Right);
		if(Node != null) {
			return Node;
		}
		return new AndNode(Type, ParsedTree.KeyToken, Left, Right);
	}

	public CreateOrNode(Type: GtType, ParsedTree: GtSyntaxTree, Left: GtNode, Right: GtNode): GtNode {
		Left = this.Fold(Left);
		Right = this.Fold(Right);
		var Node: GtNode = this.FoldOrNode(null, Left, Right);
		if(Node != null) {
			return Node;
		}
		return new OrNode(Type, ParsedTree.KeyToken, Left, Right);
	}

	public CreateAssignNode(Type: GtType, ParsedTree: GtSyntaxTree, Left: GtNode, Right: GtNode): GtNode {
		Right = this.Fold(Right);
		return new AssignNode(Type, ParsedTree.KeyToken, Left, Right);
	}

	public CreateLetNode(Type: GtType, ParsedTree: GtSyntaxTree, DeclType: GtType, VarName: string, InitNode: GtNode, Block: GtNode): GtNode {
		InitNode = this.Fold(InitNode);
		return new LetNode(Type, ParsedTree.KeyToken, DeclType, VarName, InitNode, Block);
	}

	public CreateIfNode(Type: GtType, ParsedTree: GtSyntaxTree, Cond: GtNode, Then: GtNode, Else: GtNode): GtNode {
		Cond = this.Fold(Cond);
		var BooleanType: GtType = ParsedTree.NameSpace.Context.BooleanType;
		if(Cond.Type == BooleanType) {
			if(Cond instanceof ConstNode) {
				if(this.ConstValue(Cond).equals(true)) {
					return Then;
				} else {
					return Else;
				}
			}
		}
		return new IfNode(Type, ParsedTree.KeyToken, Cond, Then, Else);
	}

	public CreateWhileNode(Type: GtType, ParsedTree: GtSyntaxTree, Cond: GtNode, Block: GtNode): GtNode {
		Cond = this.Fold(Cond);
		var BooleanType: GtType = ParsedTree.NameSpace.Context.BooleanType;
		if(Cond.Type == BooleanType) {
			if(Cond instanceof ConstNode) {
				if(this.ConstValue(Cond).equals(false)) {
					return this.CreateEmptyNode(Type);
				}
			}
		}
		return new WhileNode(Type, ParsedTree.KeyToken, Cond, Block);
	}

	public CreateDoWhileNode(Type: GtType, ParsedTree: GtSyntaxTree, Cond: GtNode, Block: GtNode): GtNode {
		Cond = this.Fold(Cond);
		var BooleanType: GtType = ParsedTree.NameSpace.Context.BooleanType;
		if(Cond.Type == BooleanType) {
			if(Cond instanceof ConstNode) {
				if(this.ConstValue(Cond).equals(false)) {
					return Block;
				}
			}
		}
		return new DoWhileNode(Type, ParsedTree.KeyToken, Cond, Block);
	}
}
