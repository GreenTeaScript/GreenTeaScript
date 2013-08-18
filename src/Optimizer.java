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
	GtGenerator2/*constructor*/(String TargetCode, String OutputFile, int GeneratorFlag) {
		super(TargetCode, OutputFile, GeneratorFlag);
	}

	GtNode FoldBinaryNode(GtFunc Func, GtNode Left, GtNode Right) {
		if(Left instanceof ConstNode) {
			if(Right instanceof ConstNode) {
				if(Func.Is(ConstFunc)) {
					// Eval();
				}
			}
		}
		return null;
	}

	GtNode Fold(GtNode Node) {
		if(Node == null) {
			return null;
		}
		return Node;
	}
	
	Object ConstValue(GtNode Node) {
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
		/*local*/GtNode Node = this.FoldBinaryNode(Func, Left, Right);
		if(Node != null) {
			return Node;
		}
		return new BinaryNode(Type, ParsedTree.KeyToken, Func, Left, Right);
	}

	@Override public GtNode CreateAndNode(GtType Type, GtSyntaxTree ParsedTree, GtNode Left, GtNode Right) {
		Left = this.Fold(Left);
		Right = this.Fold(Right);
		/*local*/GtType BooleanType = ParsedTree.NameSpace.Context.BooleanType;
		if(Left.Type == BooleanType && Right.Type == BooleanType) {
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
		return new AndNode(Type, ParsedTree.KeyToken, Left, Right);
	}

	@Override public GtNode CreateOrNode(GtType Type, GtSyntaxTree ParsedTree, GtNode Left, GtNode Right) {
		Left = this.Fold(Left);
		Right = this.Fold(Right);
		/*local*/GtType BooleanType = ParsedTree.NameSpace.Context.BooleanType;
		if(Left.Type == BooleanType && Right.Type == BooleanType) {
			if(Left instanceof ConstNode) {
				if(this.ConstValue(Left).equals(true)) {
					return Left;
				}
				return Right;
			}
			if(Right instanceof ConstNode) {
				if(this.ConstValue(Right).equals(true)) {
					return Right;
				}
				return Left;
			}
		}
		return new OrNode(Type, ParsedTree.KeyToken, Left, Right);
	}

	@Override public GtNode CreateAssignNode(GtType Type, GtSyntaxTree ParsedTree, GtNode Left, GtNode Right) {
		return new AssignNode(Type, ParsedTree.KeyToken, Left, this.Fold(Right));
	}

	@Override public GtNode CreateLetNode(GtType Type, GtSyntaxTree ParsedTree, GtType DeclType, String VarName, GtNode InitNode, GtNode Block) {
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

	@Override public GtNode CreateSwitchNode(GtType Type, GtSyntaxTree ParsedTree, GtNode Match) {
		return null;
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

	@Override public GtNode CreateForNode(GtType Type, GtSyntaxTree ParsedTree, GtNode Cond, GtNode IterNode, GtNode Block) {
		return new ForNode(Type, ParsedTree.KeyToken, Cond, Block, IterNode);
	}

	@Override public GtNode CreateReturnNode(GtType Type, GtSyntaxTree ParsedTree, GtNode Node) {
		return new ReturnNode(Type, ParsedTree.KeyToken, this.Fold(Node));
	}
}