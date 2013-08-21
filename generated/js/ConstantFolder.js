var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var ConstantFolder = (function (_super) {
    __extends(ConstantFolder, _super);
    function ConstantFolder(TargetCode, OutputFile, GeneratorFlag) {
        _super.call(this, TargetCode, OutputFile, GeneratorFlag);
    }
    ConstantFolder.prototype.InitContext = function (Context) {
        this.BooleanType = Context.BooleanType;
    };

    ConstantFolder.prototype.FoldBlock = function (Block) {
        if (Block == null) {
            return null;
        }
        var Head = this.Fold(Block);
        var Tmp = Head;
        Block = Block.NextNode;
        while (Block != null) {
            Tmp.NextNode = this.Fold(Block);
            Block = Block.NextNode;
            Tmp = Tmp.NextNode;
        }
        return Head;
    };

    ConstantFolder.prototype.FoldCast = function (Node) {
        Node.Expr = this.Fold(Node.Expr);

        return Node;
    };
    ConstantFolder.prototype.FoldUnary = function (Node) {
        Node.Expr = this.Fold(Node.Expr);

        return Node;
    };

    ConstantFolder.prototype.FoldSuffix = function (Node) {
        Node.Expr = this.Fold(Node.Expr);

        return Node;
    };
    ConstantFolder.prototype.FoldExists = function (Node) {
        Node.Expr = this.Fold(Node.Expr);

        return Node;
    };
    ConstantFolder.prototype.FoldAssign = function (Node) {
        Node.RightNode = this.Fold(Node.RightNode);
        return Node;
    };
    ConstantFolder.prototype.FoldSelfAssign = function (Node) {
        Node.RightNode = this.Fold(Node.RightNode);
        return Node;
    };
    ConstantFolder.prototype.FoldInstanceOf = function (Node) {
        Node.ExprNode = this.Fold(Node.ExprNode);

        return Node;
    };
    ConstantFolder.prototype.FoldGetter = function (Node) {
        Node.Expr = this.Fold(Node.Expr);

        return Node;
    };
    ConstantFolder.prototype.FoldIndexer = function (Node) {
        Node.IndexAt = this.Fold(Node.IndexAt);
        return Node;
    };
    ConstantFolder.prototype.FoldBinary = function (Node) {
        return this.FoldBinaryNode(Node, Node.Func, Node.LeftNode, Node.RightNode);
    };
    ConstantFolder.prototype.FoldBinaryNode = function (Original, Func, Left, Right) {
        Left = this.Fold(Left);
        Right = this.Fold(Right);
        if (Func != null) {
            if (Left instanceof ConstNode) {
                if (Right instanceof ConstNode) {
                    if (Func.Is(ConstFunc)) {
                    }
                }
            }
        }
        if (Original != null) {
            Original.LeftNode = Left;
            Original.RightNode = Right;
        }
        return Original;
    };

    ConstantFolder.prototype.FoldTrinary = function (Node) {
        Node.CondExpr = this.Fold(Node.CondExpr);
        Node.ThenExpr = this.Fold(Node.ThenExpr);
        Node.ElseExpr = this.Fold(Node.ElseExpr);
        if (Node.CondExpr instanceof ConstNode && Node.CondExpr.Type.equals(this.BooleanType)) {
            if (this.ConstValue(Node.CondExpr).equals(true)) {
                return Node.ThenExpr;
            } else {
                return Node.ElseExpr;
            }
        }
        return Node;
    };

    ConstantFolder.prototype.FoldOr = function (Node) {
        var Left = Node.LeftNode;
        var Right = Node.RightNode;
        return this.FoldOrNode(Node, Left, Right);
    };

    ConstantFolder.prototype.FoldOrNode = function (Original, Left, Right) {
        Left = this.Fold(Left);
        Right = this.Fold(Right);
        if (Left.Type == this.BooleanType && Right.Type == this.BooleanType) {
            if (Left instanceof ConstNode) {
                if (this.ConstValue(Left).equals(false)) {
                    return Right;
                }
            }
            if (Right instanceof ConstNode) {
                if (this.ConstValue(Right).equals(false)) {
                    return Left;
                }
            }
        }
        return Original;
    };

    ConstantFolder.prototype.FoldAnd = function (Node) {
        var Left = Node.LeftNode;
        var Right = Node.RightNode;
        return this.FoldAndNode(Node, Left, Right);
    };

    ConstantFolder.prototype.FoldAndNode = function (Original, Left, Right) {
        Left = this.Fold(Left);
        Right = this.Fold(Right);
        if (Left.Type == this.BooleanType && Right.Type == this.BooleanType) {
            if (Left instanceof ConstNode) {
                if (this.ConstValue(Left).equals(false)) {
                    return Left;
                }
                if (Right instanceof ConstNode && this.ConstValue(Right).equals(true)) {
                    return Left;
                }
            }
            if (Right instanceof ConstNode) {
                if (this.ConstValue(Right).equals(false)) {
                    return Right;
                }
            }
        }
        return Original;
    };

    ConstantFolder.prototype.FoldLet = function (Node) {
        Node.InitNode = this.Fold(Node.InitNode);
        return Node;
    };
    ConstantFolder.prototype.FoldSlice = function (Node) {
        Node.Index1 = this.Fold(Node.Index1);
        Node.Index2 = this.Fold(Node.Index2);
        return Node;
    };
    ConstantFolder.prototype.FoldApply = function (Node) {
        var i = 0;
        while (i < Node.Params.size()) {
            var Param = Node.Params.get(i);
            Node.Params.set(i, this.Fold(Param));
            i = i + 1;
        }
        return Node;
    };
    ConstantFolder.prototype.FoldMessage = function (Node) {
        Node.RecvNode = this.Fold(Node.RecvNode);
        var i = 0;
        while (i < Node.Params.size()) {
            var Param = Node.Params.get(i);
            Node.Params.set(i, this.Fold(Param));
            i = i + 1;
        }
        return Node;
    };
    ConstantFolder.prototype.FoldIf = function (Node) {
        Node.CondExpr = this.Fold(Node.CondExpr);
        Node.ThenNode = this.FoldBlock(Node.ThenNode);
        Node.ElseNode = this.FoldBlock(Node.ElseNode);
        if (Node.CondExpr.Type == this.BooleanType && Node.CondExpr instanceof ConstNode) {
            if (this.ConstValue(Node.CondExpr).equals(true)) {
                return Node.ThenNode;
            } else {
                if (Node.ElseNode == null) {
                    return this.CreateEmptyNode(Node.Type);
                }
                return Node.ElseNode;
            }
        }
        return Node;
    };
    ConstantFolder.prototype.FoldWhile = function (Node) {
        Node.CondExpr = this.Fold(Node.CondExpr);
        Node.LoopBody = this.FoldBlock(Node.LoopBody);
        if (this.ConstValue(Node.CondExpr).equals(false)) {
            return this.CreateEmptyNode(Node.Type);
        }
        return Node;
    };
    ConstantFolder.prototype.FoldDoWhile = function (Node) {
        Node.CondExpr = this.Fold(Node.CondExpr);
        Node.LoopBody = this.FoldBlock(Node.LoopBody);
        if (this.ConstValue(Node.CondExpr).equals(false)) {
            return Node.LoopBody;
        }
        return Node;
    };
    ConstantFolder.prototype.FoldFor = function (Node) {
        Node.IterExpr = this.Fold(Node.IterExpr);
        Node.CondExpr = this.Fold(Node.CondExpr);
        Node.LoopBody = this.FoldBlock(Node.LoopBody);
        return Node;
    };
    ConstantFolder.prototype.FoldReturn = function (Node) {
        Node.Expr = this.Fold(Node.Expr);
        return Node;
    };
    ConstantFolder.prototype.FoldThrow = function (Node) {
        Node.Expr = this.Fold(Node.Expr);
        return Node;
    };
    ConstantFolder.prototype.FoldTry = function (Node) {
        Node.TryBlock = this.FoldBlock(Node.TryBlock);
        Node.CatchBlock = this.FoldBlock(Node.CatchBlock);
        Node.FinallyBlock = this.FoldBlock(Node.FinallyBlock);
        return Node;
    };
    ConstantFolder.prototype.FoldCommand = function (Node) {
        var i = 0;
        while (i < Node.Params.size()) {
            var Param = Node.Params.get(i);
            Node.Params.set(i, this.Fold(Param));
            i = i + 1;
        }
        return Node;
    };
    ConstantFolder.prototype.Fold = function (SourceNode) {
        if (SourceNode == null) {
            return null;
        } else if (SourceNode instanceof ConstNode) {
        } else if (SourceNode instanceof LocalNode) {
        } else if (SourceNode instanceof NullNode) {
        } else if (SourceNode instanceof CastNode) {
            return this.FoldCast(SourceNode);
        } else if (SourceNode instanceof UnaryNode) {
            return this.FoldUnary(SourceNode);
        } else if (SourceNode instanceof SuffixNode) {
            return this.FoldSuffix(SourceNode);
        } else if (SourceNode instanceof ExistsNode) {
            return this.FoldExists(SourceNode);
        } else if (SourceNode instanceof AssignNode) {
            return this.FoldAssign(SourceNode);
        } else if (SourceNode instanceof SelfAssignNode) {
            return this.FoldSelfAssign(SourceNode);
        } else if (SourceNode instanceof InstanceOfNode) {
            return this.FoldInstanceOf(SourceNode);
        } else if (SourceNode instanceof BinaryNode) {
            return this.FoldBinary(SourceNode);
        } else if (SourceNode instanceof AndNode) {
            return this.FoldAnd(SourceNode);
        } else if (SourceNode instanceof OrNode) {
            return this.FoldOr(SourceNode);
        } else if (SourceNode instanceof TrinaryNode) {
            return this.FoldTrinary(SourceNode);
        } else if (SourceNode instanceof GetterNode) {
            return this.FoldGetter(SourceNode);
        } else if (SourceNode instanceof IndexerNode) {
            return this.FoldIndexer(SourceNode);
        } else if (SourceNode instanceof SliceNode) {
            return this.FoldSlice(SourceNode);
        } else if (SourceNode instanceof LetNode) {
            return this.FoldLet(SourceNode);
        } else if (SourceNode instanceof ApplyNode) {
            return this.FoldApply(SourceNode);
        } else if (SourceNode instanceof MessageNode) {
            return this.FoldMessage(SourceNode);
        } else if (SourceNode instanceof NewNode) {
        } else if (SourceNode instanceof IfNode) {
            return this.FoldIf(SourceNode);
        } else if (SourceNode instanceof WhileNode) {
            return this.FoldWhile(SourceNode);
        } else if (SourceNode instanceof DoWhileNode) {
            return this.FoldDoWhile(SourceNode);
        } else if (SourceNode instanceof ForNode) {
            return this.FoldFor(SourceNode);
        } else if (SourceNode instanceof ForEachNode) {
        } else if (SourceNode instanceof ContinueNode) {
        } else if (SourceNode instanceof BreakNode) {
        } else if (SourceNode instanceof ReturnNode) {
            return this.FoldReturn(SourceNode);
        } else if (SourceNode instanceof ThrowNode) {
            return this.FoldThrow(SourceNode);
        } else if (SourceNode instanceof TryNode) {
            return this.FoldTry(SourceNode);
        } else if (SourceNode instanceof SwitchNode) {
        } else if (SourceNode instanceof FunctionNode) {
        } else if (SourceNode instanceof ErrorNode) {
        } else if (SourceNode instanceof CommandNode) {
            return this.FoldCommand(SourceNode);
        }
        return SourceNode;
    };

    ConstantFolder.prototype.ConstValue = function (Node) {
        if (Node instanceof ConstNode) {
            return (Node).ConstValue;
        }
        return null;
    };

    ConstantFolder.prototype.CreateGetterNode = function (Type, ParsedTree, Func, Expr) {
        return new GetterNode(Type, ParsedTree.KeyToken, Func, this.Fold(Expr));
    };

    ConstantFolder.prototype.CreateIndexerNode = function (Type, ParsedTree, Func, Expr, Index) {
        return new IndexerNode(Type, ParsedTree.KeyToken, Func, this.Fold(Expr), this.Fold(Index));
    };

    ConstantFolder.prototype.CreateUnaryNode = function (Type, ParsedTree, Func, Expr) {
        return new UnaryNode(Type, ParsedTree.KeyToken, Func, this.Fold(Expr));
    };

    ConstantFolder.prototype.CreateSuffixNode = function (Type, ParsedTree, Func, Expr) {
        return new SuffixNode(Type, ParsedTree.KeyToken, Func, this.Fold(Expr));
    };

    ConstantFolder.prototype.CreateBinaryNode = function (Type, ParsedTree, Func, Left, Right) {
        Left = this.Fold(Left);
        Right = this.Fold(Right);
        var Node = this.FoldBinaryNode(null, Func, Left, Right);
        if (Node != null) {
            return Node;
        }
        return new BinaryNode(Type, ParsedTree.KeyToken, Func, Left, Right);
    };

    ConstantFolder.prototype.CreateAndNode = function (Type, ParsedTree, Left, Right) {
        Left = this.Fold(Left);
        Right = this.Fold(Right);
        var Node = this.FoldAndNode(null, Left, Right);
        if (Node != null) {
            return Node;
        }
        return new AndNode(Type, ParsedTree.KeyToken, Left, Right);
    };

    ConstantFolder.prototype.CreateOrNode = function (Type, ParsedTree, Left, Right) {
        Left = this.Fold(Left);
        Right = this.Fold(Right);
        var Node = this.FoldOrNode(null, Left, Right);
        if (Node != null) {
            return Node;
        }
        return new OrNode(Type, ParsedTree.KeyToken, Left, Right);
    };

    ConstantFolder.prototype.CreateAssignNode = function (Type, ParsedTree, Left, Right) {
        Right = this.Fold(Right);
        return new AssignNode(Type, ParsedTree.KeyToken, Left, Right);
    };

    ConstantFolder.prototype.CreateLetNode = function (Type, ParsedTree, DeclType, VarName, InitNode, Block) {
        InitNode = this.Fold(InitNode);
        return new LetNode(Type, ParsedTree.KeyToken, DeclType, VarName, InitNode, Block);
    };

    ConstantFolder.prototype.CreateIfNode = function (Type, ParsedTree, Cond, Then, Else) {
        Cond = this.Fold(Cond);
        var BooleanType = ParsedTree.NameSpace.Context.BooleanType;
        if (Cond.Type == BooleanType) {
            if (Cond instanceof ConstNode) {
                if (this.ConstValue(Cond).equals(true)) {
                    return Then;
                } else {
                    return Else;
                }
            }
        }
        return new IfNode(Type, ParsedTree.KeyToken, Cond, Then, Else);
    };

    ConstantFolder.prototype.CreateWhileNode = function (Type, ParsedTree, Cond, Block) {
        Cond = this.Fold(Cond);
        var BooleanType = ParsedTree.NameSpace.Context.BooleanType;
        if (Cond.Type == BooleanType) {
            if (Cond instanceof ConstNode) {
                if (this.ConstValue(Cond).equals(false)) {
                    return this.CreateEmptyNode(Type);
                }
            }
        }
        return new WhileNode(Type, ParsedTree.KeyToken, Cond, Block);
    };

    ConstantFolder.prototype.CreateDoWhileNode = function (Type, ParsedTree, Cond, Block) {
        Cond = this.Fold(Cond);
        var BooleanType = ParsedTree.NameSpace.Context.BooleanType;
        if (Cond.Type == BooleanType) {
            if (Cond instanceof ConstNode) {
                if (this.ConstValue(Cond).equals(false)) {
                    return Block;
                }
            }
        }
        return new DoWhileNode(Type, ParsedTree.KeyToken, Cond, Block);
    };
    return ConstantFolder;
})(GtGenerator);
