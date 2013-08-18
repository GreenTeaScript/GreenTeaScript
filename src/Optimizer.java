// ***************************************************************************
// Copyright (c) 2013, JST/CREST DEOS project authors. All rights reserved.
// Redistribution and use in source and binary forms, with or without
// modification, are permitted provided that the following conditions are met:
//
// *  Redistributions of source code must retain the above copyright notice,
//    this list of conditions and the following disclaimer.
// *  Redistributions in binary form must reproduce the above copyright
//    notice, this list of conditions and the following disclaimer in the
//    documentation and/or other materials provided with the distribution.
//
// THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS
// "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED
// TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR
// PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER OR
// CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL,
// EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO,
// PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS;
// OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY,
// WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR
// OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF
// ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
// **************************************************************************

//ifdef  JAVA
//endif VAJA

class GtGenerator2 extends GtGenerator {
	private GtType BooleanType;

	GtGenerator2/*constructor*/(String TargetCode, String OutputFile, int GeneratorFlag) {
		super(TargetCode, OutputFile, GeneratorFlag);
	}
	@Override public void InitContext(GtClassContext Context) {
		this.BooleanType = Context.BooleanType;
	}

	GtNode FoldBlock(GtNode Block) {
		if(Block == null) {
			return null;
		}
		/*local*/GtNode Head = this.Fold(Block);
		/*local*/GtNode Tmp = Head;
		Block = Block.NextNode;
		while(Block != null) {
			Tmp.NextNode = this.Fold(Block);
			Block = Block.NextNode;
			Tmp = Tmp.NextNode;
		}
		return Head;
	}

	GtNode FoldCast(CastNode Node) {
		Node.Expr = this.Fold(Node.Expr);
		// Node = Eval(Node);
		return Node;
	}
	GtNode FoldUnary(UnaryNode Node) {
		Node.Expr = this.Fold(Node.Expr);
		// Node = Eval(Node);
		return Node;
	}
	
	GtNode FoldSuffix(SuffixNode Node) {
		Node.Expr = this.Fold(Node.Expr);
		// Node = Eval(Node);
		return Node;
	}
	GtNode FoldExists(ExistsNode Node) {
		Node.Expr = this.Fold(Node.Expr);
		// Node = Eval(Node);
		return Node;
	}
	GtNode FoldAssign(AssignNode Node) {
		Node.RightNode = this.Fold(Node.RightNode);
		return Node;
	}
	GtNode FoldSelfAssign(SelfAssignNode Node) {
		Node.RightNode = this.Fold(Node.RightNode);
		return Node;
	}
	GtNode FoldInstanceOf(InstanceOfNode Node) {
		Node.ExprNode = this.Fold(Node.ExprNode);
		// Node = Eval(Node);
		return Node;
	}
	GtNode FoldGetter(GetterNode Node) {
		Node.Expr = this.Fold(Node.Expr);
		// Eval(Node);
		return Node;
	}
	GtNode FoldIndexer(IndexerNode Node) {
		Node.IndexAt = this.Fold(Node.IndexAt);
		return Node;
	}
	GtNode FoldBinary(BinaryNode Node) {
		return this.FoldBinaryNode(Node, Node.Func, Node.LeftNode, Node.RightNode);
	}
	GtNode FoldBinaryNode(BinaryNode Original, GtFunc Func, GtNode Left, GtNode Right) {
		Left = this.Fold(Left);
		Right = this.Fold(Right);
		if(Func != null) {
			if(Left instanceof ConstNode) {
				if(Right instanceof ConstNode) {
					if(Func.Is(ConstFunc)) {
						// Eval();
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
	
	private GtNode FoldTrinary(TrinaryNode Node) {
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

	private GtNode FoldOr(OrNode Node) {
		/*local*/GtNode Left = Node.LeftNode;
		/*local*/GtNode Right = Node.RightNode;
		return this.FoldOrNode(Node, Left, Right);
	}

	private GtNode FoldOrNode(GtNode Original, GtNode Left, GtNode Right) {
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

	GtNode FoldAnd(AndNode Node) {
		/*local*/GtNode Left = Node.LeftNode;
		/*local*/GtNode Right = Node.RightNode;
		return this.FoldAndNode(Node, Left, Right);
	}
	
	private GtNode FoldAndNode(GtNode Original, GtNode Left, GtNode Right) {
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

	GtNode FoldLet(LetNode Node) {
		Node.InitNode = this.Fold(Node.InitNode);
		return Node;
	}
	GtNode FoldSlice(SliceNode Node) {
		Node.Index1 = this.Fold(Node.Index1);
		Node.Index2 = this.Fold(Node.Index2);
		return Node;
	}
	GtNode FoldApply(ApplyNode Node) {
		/*local*/int i = 0;
		while(i < Node.Params.size()) {
			/*local*/GtNode Param = Node.Params.get(i);
			Node.Params.set(i, this.Fold(Param));
			i = i + 1;
		}
		return Node;
	}
	GtNode FoldMessage(MessageNode Node) {
		Node.RecvNode = this.Fold(Node.RecvNode);
		/*local*/int i = 0;
		while(i < Node.Params.size()) {
			/*local*/GtNode Param = Node.Params.get(i);
			Node.Params.set(i, this.Fold(Param));
			i = i + 1;
		}
		return Node;
	}
	GtNode FoldIf(IfNode Node) {
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
	GtNode FoldWhile(WhileNode Node) {
		Node.CondExpr = this.Fold(Node.CondExpr);
		Node.LoopBody = this.FoldBlock(Node.LoopBody);
		if(this.ConstValue(Node.CondExpr).equals(false)) {
			return this.CreateEmptyNode(Node.Type);
		}
		return Node;
	}
	GtNode FoldDoWhile(DoWhileNode Node) {
		Node.CondExpr = this.Fold(Node.CondExpr);
		Node.LoopBody = this.FoldBlock(Node.LoopBody);
		if(this.ConstValue(Node.CondExpr).equals(false)) {
			return Node.LoopBody;
		}
		return Node;
	}
	GtNode FoldFor(ForNode Node) {
		Node.IterExpr = this.Fold(Node.IterExpr);
		Node.CondExpr = this.Fold(Node.CondExpr);
		Node.LoopBody = this.FoldBlock(Node.LoopBody);
		return Node;
	}
	GtNode FoldReturn(ReturnNode Node) {
		Node.Expr = this.Fold(Node.Expr);
		return Node;
	}
	GtNode FoldThrow(ThrowNode Node) {
		Node.Expr = this.Fold(Node.Expr);
		return Node;
	}
	GtNode FoldTry(TryNode Node) {
		Node.TryBlock = this.FoldBlock(Node.TryBlock);
		Node.CatchBlock = this.FoldBlock(Node.CatchBlock);
		Node.FinallyBlock = this.FoldBlock(Node.FinallyBlock);
		return Node;
	}
	GtNode FoldCommand(CommandNode Node) {
		/*local*/int i = 0;
		while(i < Node.Params.size()) {
			/*local*/GtNode Param = Node.Params.get(i);
			Node.Params.set(i, this.Fold(Param));
			i = i + 1;
		}
		return Node;
	}
	GtNode Fold(GtNode SourceNode) {
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
			return this.FoldCast((/*cast*/CastNode) SourceNode);
		}
		else if(SourceNode instanceof UnaryNode) {
			return this.FoldUnary((/*cast*/UnaryNode) SourceNode);
		}
		else if(SourceNode instanceof SuffixNode) {
			return this.FoldSuffix((/*cast*/SuffixNode) SourceNode);
		}
		else if(SourceNode instanceof ExistsNode) {
			return this.FoldExists((/*cast*/ExistsNode) SourceNode);
		}
		else if(SourceNode instanceof AssignNode) {
			return this.FoldAssign((/*cast*/AssignNode) SourceNode);
		}
		else if(SourceNode instanceof SelfAssignNode) {
			return this.FoldSelfAssign((/*cast*/SelfAssignNode) SourceNode);
		}
		else if(SourceNode instanceof InstanceOfNode) {
			return this.FoldInstanceOf((/*cast*/InstanceOfNode) SourceNode);
		}
		else if(SourceNode instanceof BinaryNode) {
			return this.FoldBinary((/*cast*/BinaryNode) SourceNode);
		}
		else if(SourceNode instanceof AndNode) {
			return this.FoldAnd((/*cast*/AndNode) SourceNode);
		}
		else if(SourceNode instanceof OrNode) {
			return this.FoldOr((/*cast*/OrNode) SourceNode);
		}
		else if(SourceNode instanceof TrinaryNode) {
			return this.FoldTrinary((/*cast*/TrinaryNode) SourceNode);
		}
		else if(SourceNode instanceof GetterNode) {
			return this.FoldGetter((/*cast*/GetterNode) SourceNode);
		}
		else if(SourceNode instanceof IndexerNode) {
			return this.FoldIndexer((/*cast*/IndexerNode) SourceNode);
		}
		else if(SourceNode instanceof SliceNode) {
			return this.FoldSlice((/*cast*/SliceNode) SourceNode);
		}
		else if(SourceNode instanceof LetNode) {
			return this.FoldLet((/*cast*/LetNode) SourceNode);
		}
		else if(SourceNode instanceof ApplyNode) {
			return this.FoldApply((/*cast*/ApplyNode) SourceNode);
		}
		else if(SourceNode instanceof MessageNode) {
			return this.FoldMessage((/*cast*/MessageNode) SourceNode);
		}
		else if(SourceNode instanceof NewNode) {
		}
		else if(SourceNode instanceof IfNode) {
			return this.FoldIf((/*cast*/IfNode) SourceNode);
		}
		else if(SourceNode instanceof WhileNode) {
			return this.FoldWhile((/*cast*/WhileNode) SourceNode);
		}
		else if(SourceNode instanceof DoWhileNode) {
			return this.FoldDoWhile((/*cast*/DoWhileNode) SourceNode);
		}
		else if(SourceNode instanceof ForNode) {
			return this.FoldFor((/*cast*/ForNode) SourceNode);
		}
		else if(SourceNode instanceof ForEachNode) {
		}
		else if(SourceNode instanceof ContinueNode) {
		}
		else if(SourceNode instanceof BreakNode) {
		}
		else if(SourceNode instanceof ReturnNode) {
			return this.FoldReturn((/*cast*/ReturnNode) SourceNode);
		}
		else if(SourceNode instanceof ThrowNode) {
			return this.FoldThrow((/*cast*/ThrowNode) SourceNode);
		}
		else if(SourceNode instanceof TryNode) {
			return this.FoldTry((/*cast*/TryNode) SourceNode);
		}
		else if(SourceNode instanceof SwitchNode) {
		}
		else if(SourceNode instanceof FunctionNode) {
		}
		else if(SourceNode instanceof ErrorNode) {
		}
		else if(SourceNode instanceof CommandNode) {
			return this.FoldCommand((/*cast*/CommandNode) SourceNode);
		}
		return SourceNode;
	}

	private Object ConstValue(GtNode Node) {
		if(Node instanceof ConstNode) {
			return ((/*cast*/ConstNode) Node).ConstValue;
		}
		return null;
	}

	@Override public GtNode CreateGetterNode(GtType Type, GtSyntaxTree ParsedTree, GtFunc Func, GtNode Expr) {
		return new GetterNode(Type, ParsedTree.KeyToken, Func, this.Fold(Expr));
	}

	@Override public GtNode CreateIndexerNode(GtType Type, GtSyntaxTree ParsedTree, GtFunc Func, GtNode Expr, GtNode Index) {
		return new IndexerNode(Type, ParsedTree.KeyToken, Func, this.Fold(Expr), this.Fold(Index));
	}

	@Override public GtNode CreateUnaryNode(GtType Type, GtSyntaxTree ParsedTree, GtFunc Func, GtNode Expr) {
		return new UnaryNode(Type, ParsedTree.KeyToken, Func, this.Fold(Expr));
	}

	@Override public GtNode CreateSuffixNode(GtType Type, GtSyntaxTree ParsedTree, GtFunc Func, GtNode Expr) {
		return new SuffixNode(Type, ParsedTree.KeyToken, Func, this.Fold(Expr));
	}

	@Override public GtNode CreateBinaryNode(GtType Type, GtSyntaxTree ParsedTree, GtFunc Func, GtNode Left, GtNode Right) {
		Left = this.Fold(Left);
		Right = this.Fold(Right);
		/*local*/GtNode Node = this.FoldBinaryNode(null, Func, Left, Right);
		if(Node != null) {
			return Node;
		}
		return new BinaryNode(Type, ParsedTree.KeyToken, Func, Left, Right);
	}

	@Override public GtNode CreateAndNode(GtType Type, GtSyntaxTree ParsedTree, GtNode Left, GtNode Right) {
		Left = this.Fold(Left);
		Right = this.Fold(Right);
		/*local*/GtNode Node = this.FoldAndNode(null, Left, Right);
		if(Node != null) {
			return Node;
		}
		return new AndNode(Type, ParsedTree.KeyToken, Left, Right);
	}

	@Override public GtNode CreateOrNode(GtType Type, GtSyntaxTree ParsedTree, GtNode Left, GtNode Right) {
		Left = this.Fold(Left);
		Right = this.Fold(Right);
		/*local*/GtNode Node = this.FoldOrNode(null, Left, Right);
		if(Node != null) {
			return Node;
		}
		return new OrNode(Type, ParsedTree.KeyToken, Left, Right);
	}

	@Override public GtNode CreateAssignNode(GtType Type, GtSyntaxTree ParsedTree, GtNode Left, GtNode Right) {
		Right = this.Fold(Right);
		return new AssignNode(Type, ParsedTree.KeyToken, Left, Right);
	}

	@Override public GtNode CreateLetNode(GtType Type, GtSyntaxTree ParsedTree, GtType DeclType, String VarName, GtNode InitNode, GtNode Block) {
		InitNode = this.Fold(InitNode);
		return new LetNode(Type, ParsedTree.KeyToken, DeclType, VarName, InitNode, Block);
	}

	@Override public GtNode CreateIfNode(GtType Type, GtSyntaxTree ParsedTree, GtNode Cond, GtNode Then, GtNode Else) {
		Cond = this.Fold(Cond);
		/*local*/GtType BooleanType = ParsedTree.NameSpace.Context.BooleanType;
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

	@Override public GtNode CreateWhileNode(GtType Type, GtSyntaxTree ParsedTree, GtNode Cond, GtNode Block) {
		Cond = this.Fold(Cond);
		/*local*/GtType BooleanType = ParsedTree.NameSpace.Context.BooleanType;
		if(Cond.Type == BooleanType) {
			if(Cond instanceof ConstNode) {
				if(this.ConstValue(Cond).equals(false)) {
					return this.CreateEmptyNode(Type);
				}
			}
		}
		return new WhileNode(Type, ParsedTree.KeyToken, Cond, Block);
	}

	@Override public GtNode CreateDoWhileNode(GtType Type, GtSyntaxTree ParsedTree, GtNode Cond, GtNode Block) {
		Cond = this.Fold(Cond);
		/*local*/GtType BooleanType = ParsedTree.NameSpace.Context.BooleanType;
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
