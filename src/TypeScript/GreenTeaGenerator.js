var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var TypedNode = (function () {
    function TypedNode(Type, Token) {
        this.Type = Type;
        this.Token = Token;
        this.ParentNode = null;
        this.PrevNode = null;
        this.NextNode = null;
    }
    TypedNode.prototype.MoveHeadNode = function () {
        var Node = this;
        while (Node.PrevNode != null) {
            Node = Node.PrevNode;
        }
        return Node;
    };

    TypedNode.prototype.MoveTailNode = function () {
        var Node = this;
        while (Node.NextNode != null) {
            Node = Node.NextNode;
        }
        return this;
    };

    TypedNode.prototype.Append = function (Node) {
    };

    TypedNode.prototype.Evaluate = function (Visitor) {
    };

    TypedNode.prototype.IsError = function () {
        return false;
    };

    TypedNode.prototype.toString = function () {
        return "(TypedNode)";
    };

    TypedNode.Stringify = function (Block) {
        var Text = Block.toString();
        while (Block != null) {
            Text += Block.toString() + " ";
            Block = Block.NextNode;
        }
        return Text;
    };
    return TypedNode;
})();

var UnaryNode = (function (_super) {
    __extends(UnaryNode, _super);
    function UnaryNode(Type, Token, Method, Expr) {
        _super.call(this, Type, Token);
        this.Method = Method;
        this.Expr = Expr;
    }
    UnaryNode.prototype.Evaluate = function (Visitor) {
        Visitor.VisitUnaryNode(this);
    };
    return UnaryNode;
})(TypedNode);

var SuffixNode = (function (_super) {
    __extends(SuffixNode, _super);
    function SuffixNode(Type, Token, Method, Expr) {
        _super.call(this, Type, Token);
        this.Method = Method;
        this.Expr = Expr;
    }
    SuffixNode.prototype.Evaluate = function (Visitor) {
        Visitor.VisitSuffixNode(this);
    };
    return SuffixNode;
})(TypedNode);

var BinaryNode = (function (_super) {
    __extends(BinaryNode, _super);
    function BinaryNode(Type, Token, Method, Left, Right) {
        _super.call(this, Type, Token);
        this.Method = Method;
        this.LeftNode = Left;
        this.RightNode = Right;
    }
    BinaryNode.prototype.Evaluate = function (Visitor) {
        Visitor.VisitBinaryNode(this);
    };
    return BinaryNode;
})(TypedNode);

var AndNode = (function (_super) {
    __extends(AndNode, _super);
    function AndNode(Type, Token, Left, Right) {
        _super.call(this, Type, Token);
        this.LeftNode = Left;
        this.RightNode = Right;
    }
    AndNode.prototype.Evaluate = function (Visitor) {
        Visitor.VisitAndNode(this);
    };
    AndNode.prototype.toString = function () {
        return "(And:" + this.Type + " " + TypedNode.Stringify(this.LeftNode) + ", " + TypedNode.Stringify(this.RightNode) + ")";
    };
    return AndNode;
})(TypedNode);

var OrNode = (function (_super) {
    __extends(OrNode, _super);
    function OrNode(Type, Token, Left, Right) {
        _super.call(this, Type, Token);
        this.LeftNode = Left;
        this.RightNode = Right;
    }
    OrNode.prototype.Evaluate = function (Visitor) {
        Visitor.VisitOrNode(this);
    };
    OrNode.prototype.toString = function () {
        return "(Or:" + this.Type + " " + TypedNode.Stringify(this.LeftNode) + ", " + TypedNode.Stringify(this.RightNode) + ")";
    };
    return OrNode;
})(TypedNode);

var GetterNode = (function (_super) {
    __extends(GetterNode, _super);
    function GetterNode(Type, Token, Method, Expr) {
        _super.call(this, Type, Token);
        this.Method = Method;
        this.Expr = Expr;
    }
    GetterNode.prototype.Evaluate = function (Visitor) {
        Visitor.VisitGetterNode(this);
    };
    GetterNode.prototype.toString = function () {
        return "(Getter:" + this.Type + " " + TypedNode.Stringify(this.Expr) + ", " + this.Method.MethodName + ")";
    };
    return GetterNode;
})(TypedNode);

var IndexerNode = (function (_super) {
    __extends(IndexerNode, _super);
    function IndexerNode(Type, Token, Method, Expr, Indexer) {
        _super.call(this, Type, Token);
        this.Method = Method;
        this.Expr = Expr;
        this.Indexer = Indexer;
    }
    IndexerNode.prototype.Evaluate = function (Visitor) {
        Visitor.VisitIndexerNode(this);
    };
    IndexerNode.prototype.toString = function () {
        return "(Index:" + this.Type + " " + TypedNode.Stringify(this.Expr) + ", " + TypedNode.Stringify(this.Indexer) + ")";
    };
    return IndexerNode;
})(TypedNode);

var AssignNode = (function (_super) {
    __extends(AssignNode, _super);
    function AssignNode(Type, Token, Left, Right) {
        _super.call(this, Type, Token);
        this.LeftNode = Left;
        this.RightNode = Right;
    }
    AssignNode.prototype.Evaluate = function (Visitor) {
        Visitor.VisitAssignNode(this);
    };
    AssignNode.prototype.toString = function () {
        return "(Assign:" + this.Type + " " + TypedNode.Stringify(this.LeftNode) + " = " + TypedNode.Stringify(this.RightNode) + ")";
    };
    return AssignNode;
})(TypedNode);

var ConstNode = (function (_super) {
    __extends(ConstNode, _super);
    function ConstNode(Type, Token, ConstValue) {
        _super.call(this, Type, Token);
        this.ConstValue = ConstValue;
    }
    ConstNode.prototype.Evaluate = function (Visitor) {
        Visitor.VisitConstNode(this);
    };
    ConstNode.prototype.toString = function () {
        return "(Const:" + this.Type + " " + this.ConstValue.toString() + ")";
    };
    return ConstNode;
})(TypedNode);

var LocalNode = (function (_super) {
    __extends(LocalNode, _super);
    function LocalNode(Type, Token, LocalName) {
        _super.call(this, Type, Token);
        this.LocalName = LocalName;
    }
    LocalNode.prototype.Evaluate = function (Visitor) {
        Visitor.VisitLocalNode(this);
    };
    LocalNode.prototype.toString = function () {
        return "(Local:" + this.Type + " " + this.LocalName + ")";
    };
    return LocalNode;
})(TypedNode);

var NullNode = (function (_super) {
    __extends(NullNode, _super);
    function NullNode(Type, Token) {
        _super.call(this, Type, Token);
    }
    NullNode.prototype.Evaluate = function (Visitor) {
        Visitor.VisitNullNode(this);
    };
    NullNode.prototype.toString = function () {
        return "(Null:" + this.Type + " " + ")";
    };
    return NullNode;
})(TypedNode);

var LetNode = (function (_super) {
    __extends(LetNode, _super);
    function LetNode(Type, Token, DeclType, VarNode, Block) {
        _super.call(this, Type, Token);
        this.DeclType = DeclType;
        this.VarNode = VarNode;
        this.BlockNode = Block;
    }
    LetNode.prototype.Evaluate = function (Visitor) {
        Visitor.VisitLetNode(this);
    };
    LetNode.prototype.toString = function () {
        var Block = TypedNode.Stringify(this.BlockNode);
        return "(Let:" + this.Type + " " + TypedNode.Stringify(this.VarNode) + " in {" + Block + "})";
    };
    return LetNode;
})(TypedNode);

var ApplyNode = (function (_super) {
    __extends(ApplyNode, _super);
    function ApplyNode(Type, KeyToken, Method) {
        _super.call(this, Type, KeyToken);
        this.Method = Method;
        this.Params = new Array();
    }
    ApplyNode.prototype.Append = function (Expr) {
        this.Params.add(Expr);
    };

    ApplyNode.prototype.Evaluate = function (Visitor) {
        Visitor.VisitApplyNode(this);
    };
    ApplyNode.prototype.toString = function () {
        var Param = "";
        for (var i = 0; i < this.Params.length; i++) {
            var Node = this.Params.get(i);
            if (i != 0) {
                Param += ", ";
            }
            Param += TypedNode.Stringify(Node);
        }
        return "(Apply:" + this.Type + " " + Param + ")";
    };
    return ApplyNode;
})(TypedNode);

var MessageNode = (function (_super) {
    __extends(MessageNode, _super);
    function MessageNode(Type, KeyToken, Method) {
        _super.call(this, Type, KeyToken);
        this.Method = Method;
        this.Params = new Array();
    }
    MessageNode.prototype.Append = function (Expr) {
        this.Params.add(Expr);
    };

    MessageNode.prototype.Evaluate = function (Visitor) {
        Visitor.VisitMessageNode(this);
    };
    MessageNode.prototype.toString = function () {
        var Param = "";
        for (var i = 0; i < this.Params.length; i++) {
            var Node = this.Params[i];
            if (i != 0) {
                Param += ", ";
            }
            Param += TypedNode.Stringify(Node);
        }
        return "(Message:" + this.Type + " " + Param + ")";
    };
    return MessageNode;
})(TypedNode);

var NewNode = (function (_super) {
    __extends(NewNode, _super);
    function NewNode(Type, Token) {
        _super.call(this, Type, Token);
        this.Params = new Array();
    }
    NewNode.prototype.Append = function (Expr) {
        this.Params.add(Expr);
    };
    NewNode.prototype.Evaluate = function (Visitor) {
        Visitor.VisitNewNode(this);
    };
    NewNode.prototype.toString = function () {
        var Param = "";
        for (var i = 0; i < this.Params.length; i++) {
            var Node = this.Params[i];
            if (i != 0) {
                Param += ", ";
            }
            Param += TypedNode.Stringify(Node);
        }
        return "(New:" + this.Type + " " + Param + ")";
    };
    return NewNode;
})(TypedNode);

var IfNode = (function (_super) {
    __extends(IfNode, _super);
    function IfNode(Type, Token, CondExpr, ThenBlock, ElseNode) {
        _super.call(this, Type, Token);
        this.CondExpr = CondExpr;
        this.ThenNode = ThenBlock;
        this.ElseNode = ElseNode;
    }
    IfNode.prototype.Evaluate = function (Visitor) {
        Visitor.VisitIfNode(this);
    };
    IfNode.prototype.toString = function () {
        var Cond = TypedNode.Stringify(this.CondExpr);
        var Then = TypedNode.Stringify(this.ThenNode);
        var Else = TypedNode.Stringify(this.ElseNode);
        return "(If:" + this.Type + " Cond:" + Cond + " Then:" + Then + " Else:" + Else + ")";
    };
    return IfNode;
})(TypedNode);

var WhileNode = (function (_super) {
    __extends(WhileNode, _super);
    function WhileNode(Type, Token, CondExpr, LoopBody) {
        _super.call(this, Type, Token);
        this.CondExpr = CondExpr;
        this.LoopBody = LoopBody;
    }
    WhileNode.prototype.Evaluate = function (Visitor) {
        Visitor.VisitWhileNode(this);
    };
    WhileNode.prototype.toString = function () {
        var Cond = TypedNode.Stringify(this.CondExpr);
        var Body = TypedNode.Stringify(this.LoopBody);
        return "(While:" + this.Type + " Cond:" + Cond + " Body:" + Body + ")";
    };
    return WhileNode;
})(TypedNode);

var DoWhileNode = (function (_super) {
    __extends(DoWhileNode, _super);
    function DoWhileNode(Type, Token, CondExpr, LoopBody) {
        _super.call(this, Type, Token);
        this.CondExpr = CondExpr;
        this.LoopBody = LoopBody;
    }
    DoWhileNode.prototype.Evaluate = function (Visitor) {
        Visitor.VisitDoWhileNode(this);
    };
    DoWhileNode.prototype.toString = function () {
        var Cond = TypedNode.Stringify(this.CondExpr);
        var Body = TypedNode.Stringify(this.LoopBody);
        return "(DoWhile:" + this.Type + " Cond:" + Cond + " Body:" + Body + ")";
    };
    return DoWhileNode;
})(TypedNode);

var ForNode = (function (_super) {
    __extends(ForNode, _super);
    function ForNode(Type, Token, CondExpr, IterExpr, LoopBody) {
        _super.call(this, Type, Token);
        this.CondExpr = CondExpr;
        this.LoopBody = LoopBody;
        this.IterExpr = IterExpr;
    }
    ForNode.prototype.Evaluate = function (Visitor) {
        Visitor.VisitForNode(this);
    };
    ForNode.prototype.toString = function () {
        var Cond = TypedNode.Stringify(this.CondExpr);
        var Body = TypedNode.Stringify(this.LoopBody);
        var Iter = TypedNode.Stringify(this.IterExpr);
        return "(For:" + this.Type + " Cond:" + Cond + " Body:" + Body + " Iter:" + Iter + ")";
    };
    return ForNode;
})(TypedNode);

var ForEachNode = (function (_super) {
    __extends(ForEachNode, _super);
    function ForEachNode(Type, Token, Variable, IterExpr, LoopBody) {
        _super.call(this, Type, Token);
        this.Variable = Variable;
        this.IterExpr = IterExpr;
        this.LoopBody = LoopBody;
    }
    ForEachNode.prototype.Evaluate = function (Visitor) {
        Visitor.VisitForEachNode(this);
    };
    ForEachNode.prototype.toString = function () {
        var Cond = TypedNode.Stringify(this.CondExpr);
        var Var = TypedNode.Stringify(this.Variable);
        var Body = TypedNode.Stringify(this.LoopBody);
        var Iter = TypedNode.Stringify(this.IterExpr);
        return "(Foreach:" + this.Type + " Var:" + Var + " Cond:" + Cond + " Body:" + Body + " Iter:" + Iter + ")";
    };
    return ForEachNode;
})(TypedNode);

var LoopNode = (function (_super) {
    __extends(LoopNode, _super);
    function LoopNode(Type, Token, CondExpr, LoopBody, IterExpr) {
        _super.call(this, Type, Token);
        this.CondExpr = CondExpr;
        this.LoopBody = LoopBody;
        this.IterExpr = IterExpr;
    }
    LoopNode.prototype.Evaluate = function (Visitor) {
        Visitor.VisitLoopNode(this);
    };
    LoopNode.prototype.toString = function () {
        var Cond = TypedNode.Stringify(this.CondExpr);
        var Body = TypedNode.Stringify(this.LoopBody);
        return "(Loop:" + this.Type + " Cond:" + Cond + " Body:" + Body + ")";
    };
    return LoopNode;
})(TypedNode);

var LabelNode = (function (_super) {
    __extends(LabelNode, _super);
    function LabelNode(Type, Token, Label) {
        _super.call(this, Type, Token);
        this.Label = Label;
    }
    LabelNode.prototype.Evaluate = function (Visitor) {
        Visitor.VisitLabelNode(this);
    };
    LabelNode.prototype.toString = function () {
        return "(Label:" + this.Type + " " + this.Label + ")";
    };
    return LabelNode;
})(TypedNode);

var JumpNode = (function (_super) {
    __extends(JumpNode, _super);
    function JumpNode(Type, Token, Label) {
        _super.call(this, Type, Token);
        this.Label = Label;
    }
    JumpNode.prototype.Evaluate = function (Visitor) {
        Visitor.VisitJumpNode(this);
    };
    JumpNode.prototype.toString = function () {
        return "(Jump:" + this.Type + " " + this.Label + ")";
    };
    return JumpNode;
})(TypedNode);

var ContinueNode = (function (_super) {
    __extends(ContinueNode, _super);
    function ContinueNode(Type, Token, Label) {
        _super.call(this, Type, Token);
        this.Label = Label;
    }
    ContinueNode.prototype.Evaluate = function (Visitor) {
        Visitor.VisitContinueNode(this);
    };
    ContinueNode.prototype.toString = function () {
        return "(Continue:" + this.Type + ")";
    };
    return ContinueNode;
})(TypedNode);

var BreakNode = (function (_super) {
    __extends(BreakNode, _super);
    function BreakNode(Type, Token, Label) {
        _super.call(this, Type, Token);
        this.Label = Label;
    }
    BreakNode.prototype.Evaluate = function (Visitor) {
        Visitor.VisitBreakNode(this);
    };
    BreakNode.prototype.toString = function () {
        return "(Break:" + this.Type + ")";
    };
    return BreakNode;
})(TypedNode);

var ReturnNode = (function (_super) {
    __extends(ReturnNode, _super);
    function ReturnNode(Type, Token, Expr) {
        _super.call(this, Type, Token);
        this.Expr = Expr;
    }
    ReturnNode.prototype.Evaluate = function (Visitor) {
        Visitor.VisitReturnNode(this);
    };
    ReturnNode.prototype.toString = function () {
        var Text = "";
        if (Text != null) {
            Text = TypedNode.Stringify(this.Expr);
        }
        return "(Return:" + this.Type + " " + Text + ")";
    };
    return ReturnNode;
})(TypedNode);

var ThrowNode = (function (_super) {
    __extends(ThrowNode, _super);
    function ThrowNode(Type, Token, Expr) {
        _super.call(this, Type, Token);
        this.Expr = Expr;
    }
    ThrowNode.prototype.Evaluate = function (Visitor) {
        Visitor.VisitThrowNode(this);
    };
    ThrowNode.prototype.toString = function () {
        return "(Throw:" + this.Type + " " + TypedNode.Stringify(this.Expr) + ")";
    };
    return ThrowNode;
})(TypedNode);

var TryNode = (function (_super) {
    __extends(TryNode, _super);
    function TryNode(Type, Token, TryBlock, FinallyBlock) {
        _super.call(this, Type, Token);
        this.TryBlock = TryBlock;
        this.FinallyBlock = FinallyBlock;
        this.CatchBlock = null;
    }
    TryNode.prototype.Evaluate = function (Visitor) {
        Visitor.VisitTryNode(this);
    };
    TryNode.prototype.toString = function () {
        var TryBlock = TypedNode.Stringify(this.TryBlock);
        return "(Try:" + this.Type + " " + TryBlock + ")";
    };
    return TryNode;
})(TypedNode);

var SwitchNode = (function (_super) {
    __extends(SwitchNode, _super);
    function SwitchNode(Type, Token) {
        _super.call(this, Type, Token);
    }
    SwitchNode.prototype.Evaluate = function (Visitor) {
        Visitor.VisitSwitchNode(this);
    };
    SwitchNode.prototype.toString = function () {
        return "(Switch:" + this.Type + ")";
    };
    return SwitchNode;
})(TypedNode);

var DefineNode = (function (_super) {
    __extends(DefineNode, _super);
    function DefineNode(Type, Token, DefInfo) {
        _super.call(this, Type, Token);
        this.DefInfo = DefInfo;
    }
    DefineNode.prototype.Evaluate = function (Visitor) {
        Visitor.VisitDefineNode(this);
    };
    DefineNode.prototype.toString = function () {
        return "(Define:" + this.Type + " " + this.DefInfo.toString() + ")";
    };
    return DefineNode;
})(TypedNode);

var FunctionNode = (function (_super) {
    __extends(FunctionNode, _super);
    function FunctionNode(Type, Token) {
        _super.call(this, Type, Token);
    }
    FunctionNode.prototype.Evaluate = function (Visitor) {
        Visitor.VisitFunctionNode(this);
    };
    FunctionNode.prototype.toString = function () {
        return "(Function:" + this.Type + ")";
    };
    return FunctionNode;
})(TypedNode);

var ErrorNode = (function (_super) {
    __extends(ErrorNode, _super);
    function ErrorNode(Type, Token) {
        _super.call(this, Type, Token);
    }
    ErrorNode.prototype.Evaluate = function (Visitor) {
        Visitor.VisitErrorNode(this);
    };
    ErrorNode.prototype.toString = function () {
        return "(Error:" + this.Type + " " + this.Token.toString() + ")";
    };
    return ErrorNode;
})(TypedNode);

var GreenTeaGenerator = (function () {
    function GreenTeaGenerator() {
        this.GeneratedCodeStack = new Array();
    }
    GreenTeaGenerator.prototype.CreateConstNode = function (Type, ParsedTree, Value) {
        return new ConstNode(Type, ParsedTree.KeyToken, Value);
    };

    GreenTeaGenerator.prototype.CreateNullNode = function (Type, ParsedTree) {
        return new NullNode(Type, ParsedTree.KeyToken);
    };

    GreenTeaGenerator.prototype.CreateLocalNode = function (Type, ParsedTree, LocalName) {
        return new LocalNode(Type, ParsedTree.KeyToken, LocalName);
    };

    GreenTeaGenerator.prototype.CreateGetterNode = function (Type, ParsedTree, Method, Expr) {
        return new GetterNode(Type, ParsedTree.KeyToken, Method, Expr);
    };

    GreenTeaGenerator.prototype.CreateIndexerNode = function (Type, ParsedTree, Method, Expr, Index) {
        return new IndexerNode(Type, ParsedTree.KeyToken, Method, Expr, Index);
    };

    GreenTeaGenerator.prototype.CreateApplyNode = function (Type, ParsedTree, Method) {
        return new ApplyNode(Type, ParsedTree.KeyToken, Method);
    };

    GreenTeaGenerator.prototype.CreateMessageNode = function (Type, ParsedTree, Method) {
        return new MessageNode(Type, ParsedTree.KeyToken, Method);
    };

    GreenTeaGenerator.prototype.CreateNewNode = function (Type, ParsedTree) {
        return new NewNode(Type, ParsedTree.KeyToken);
    };

    GreenTeaGenerator.prototype.CreateUnaryNode = function (Type, ParsedTree, Method, Expr) {
        return new UnaryNode(Type, ParsedTree.KeyToken, Method, Expr);
    };

    GreenTeaGenerator.prototype.CreateSuffixNode = function (Type, ParsedTree, Method, Expr) {
        return new SuffixNode(Type, ParsedTree.KeyToken, Method, Expr);
    };

    GreenTeaGenerator.prototype.CreateBinaryNode = function (Type, ParsedTree, Method, Left, Right) {
        return new BinaryNode(Type, ParsedTree.KeyToken, Method, Left, Right);
    };

    GreenTeaGenerator.prototype.CreateAndNode = function (Type, ParsedTree, Left, Right) {
        return new AndNode(Type, ParsedTree.KeyToken, Left, Right);
    };

    GreenTeaGenerator.prototype.CreateOrNode = function (Type, ParsedTree, Left, Right) {
        return new OrNode(Type, ParsedTree.KeyToken, Left, Right);
    };

    GreenTeaGenerator.prototype.CreateAssignNode = function (Type, ParsedTree, Left, Right) {
        return new AssignNode(Type, ParsedTree.KeyToken, Left, Right);
    };

    GreenTeaGenerator.prototype.CreateLetNode = function (Type, ParsedTree, DeclType, VarNode, Block) {
        return new LetNode(Type, ParsedTree.KeyToken, DeclType, VarNode, Block);
    };

    GreenTeaGenerator.prototype.CreateIfNode = function (Type, ParsedTree, Cond, Then, Else) {
        return new IfNode(Type, ParsedTree.KeyToken, Cond, Then, Else);
    };

    GreenTeaGenerator.prototype.CreateSwitchNode = function (Type, ParsedTree, Match) {
        return null;
    };

    GreenTeaGenerator.prototype.CreateWhileNode = function (Type, ParsedTree, Cond, Block) {
        return new WhileNode(Type, ParsedTree.KeyToken, Cond, Block);
    };

    GreenTeaGenerator.prototype.CreateDoWhileNode = function (Type, ParsedTree, Cond, Block) {
        return new DoWhileNode(Type, ParsedTree.KeyToken, Cond, Block);
    };

    GreenTeaGenerator.prototype.CreateForNode = function (Type, ParsedTree, Cond, IterNode, Block) {
        return new ForNode(Type, ParsedTree.KeyToken, Cond, Block, IterNode);
    };

    GreenTeaGenerator.prototype.CreateForEachNode = function (Type, ParsedTree, VarNode, IterNode, Block) {
        return new ForEachNode(Type, ParsedTree.KeyToken, VarNode, IterNode, Block);
    };

    GreenTeaGenerator.prototype.CreateLoopNode = function (Type, ParsedTree, Cond, Block, IterNode) {
        return new LoopNode(Type, ParsedTree.KeyToken, Cond, Block, IterNode);
    };

    GreenTeaGenerator.prototype.CreateReturnNode = function (Type, ParsedTree, Node) {
        return new ReturnNode(Type, ParsedTree.KeyToken, Node);
    };

    GreenTeaGenerator.prototype.CreateLabelNode = function (Type, ParsedTree, Node) {
        return null;
    };

    GreenTeaGenerator.prototype.CreateJumpNode = function (Type, ParsedTree, Node, Label) {
        return new JumpNode(Type, ParsedTree.KeyToken, Label);
    };

    GreenTeaGenerator.prototype.CreateBreakNode = function (Type, ParsedTree, Node, Label) {
        return new BreakNode(Type, ParsedTree.KeyToken, Label);
    };

    GreenTeaGenerator.prototype.CreateContinueNode = function (Type, ParsedTree, Node, Label) {
        return new ContinueNode(Type, ParsedTree.KeyToken, Label);
    };

    GreenTeaGenerator.prototype.CreateTryNode = function (Type, ParsedTree, TryNode_, FinallyNode) {
        return new TryNode(Type, ParsedTree.KeyToken, TryNode_, FinallyNode);
    };

    GreenTeaGenerator.prototype.CreateThrowNode = function (Type, ParsedTree, Node) {
        return new ThrowNode(Type, ParsedTree.KeyToken, Node);
    };

    GreenTeaGenerator.prototype.CreateFunctionNode = function (Type, ParsedTree, Block) {
        return null;
    };

    GreenTeaGenerator.prototype.CreateDefineNode = function (Type, ParsedTree, Module) {
        return null;
    };

    GreenTeaGenerator.prototype.CreateErrorNode = function (Type, ParsedTree) {
        return new ErrorNode(Type, ParsedTree.KeyToken);
    };

    GreenTeaGenerator.prototype.VisitSuffixNode = function (suffixNode) {
    };

    GreenTeaGenerator.prototype.VisitUnaryNode = function (unaryNode) {
    };

    GreenTeaGenerator.prototype.VisitIndexerNode = function (indexerNode) {
    };

    GreenTeaGenerator.prototype.VisitMessageNode = function (messageNode) {
    };

    GreenTeaGenerator.prototype.VisitWhileNode = function (whileNode) {
    };

    GreenTeaGenerator.prototype.VisitDoWhileNode = function (doWhileNode) {
    };

    GreenTeaGenerator.prototype.VisitForNode = function (forNode) {
    };

    GreenTeaGenerator.prototype.VisitForEachNode = function (forEachNode) {
    };

    GreenTeaGenerator.prototype.VisitDefineNode = function (Node) {
    };

    GreenTeaGenerator.prototype.VisitConstNode = function (Node) {
    };

    GreenTeaGenerator.prototype.VisitNewNode = function (Node) {
    };

    GreenTeaGenerator.prototype.VisitNullNode = function (Node) {
    };

    GreenTeaGenerator.prototype.VisitLocalNode = function (Node) {
    };

    GreenTeaGenerator.prototype.VisitGetterNode = function (Node) {
    };

    GreenTeaGenerator.prototype.VisitApplyNode = function (Node) {
    };

    GreenTeaGenerator.prototype.VisitBinaryNode = function (Node) {
    };

    GreenTeaGenerator.prototype.VisitAndNode = function (Node) {
    };

    GreenTeaGenerator.prototype.VisitOrNode = function (Node) {
    };

    GreenTeaGenerator.prototype.VisitAssignNode = function (Node) {
    };

    GreenTeaGenerator.prototype.VisitLetNode = function (Node) {
    };

    GreenTeaGenerator.prototype.VisitIfNode = function (Node) {
    };

    GreenTeaGenerator.prototype.VisitSwitchNode = function (Node) {
    };

    GreenTeaGenerator.prototype.VisitLoopNode = function (Node) {
    };

    GreenTeaGenerator.prototype.VisitReturnNode = function (Node) {
    };

    GreenTeaGenerator.prototype.VisitLabelNode = function (Node) {
    };

    GreenTeaGenerator.prototype.VisitJumpNode = function (Node) {
    };

    GreenTeaGenerator.prototype.VisitBreakNode = function (Node) {
    };

    GreenTeaGenerator.prototype.VisitContinueNode = function (Node) {
    };

    GreenTeaGenerator.prototype.VisitTryNode = function (Node) {
    };

    GreenTeaGenerator.prototype.VisitThrowNode = function (Node) {
    };

    GreenTeaGenerator.prototype.VisitFunctionNode = function (Node) {
    };

    GreenTeaGenerator.prototype.VisitErrorNode = function (Node) {
    };

    GreenTeaGenerator.prototype.VisitBlock = function (Node) {
        var CurrentNode = Node;
        while (CurrentNode != null) {
            CurrentNode.Evaluate(this);
            CurrentNode = CurrentNode.NextNode;
        }
    };

    GreenTeaGenerator.prototype.Eval = function (Node) {
        this.VisitBlock(Node);
        return null;
    };

    GreenTeaGenerator.prototype.AddClass = function (Type) {
    };

    GreenTeaGenerator.prototype.PushCode = function (Code) {
        this.GeneratedCodeStack.push(Code);
    };

    GreenTeaGenerator.prototype.PopCode = function () {
        var Size = this.GeneratedCodeStack.length;
        if (Size > 0) {
            return this.GeneratedCodeStack.pop();
        }
        return "";
    };
    return GreenTeaGenerator;
})();

var IndentGenerator = (function () {
    function IndentGenerator() {
        this.IndentLevel = 0;
        this.CurrentLevelIndentString = "";
        this.IndentString = "\t";
    }
    IndentGenerator.prototype.constructor = function (Tabstop) {
        if (Tabstop) {
            this.IndentString = IndentGenerator.Repeat(" ", Tabstop);
        }
    };

    IndentGenerator.Repeat = function (Unit, Times) {
        var Builder;
        for (var i = 0; i < Times; ++i) {
            Builder += Unit;
        }
        return Builder;
    };

    IndentGenerator.prototype.SetIndent = function (Level) {
        if (Level < 0)
            Level = 0;
        if (this.IndentLevel != Level) {
            this.IndentLevel = Level;
            this.CurrentLevelIndentString = IndentGenerator.Repeat(this.IndentString, Level);
        }
    };

    IndentGenerator.prototype.AddIndent = function (LevelDelta) {
        this.SetIndent(this.IndentLevel + LevelDelta);
    };

    IndentGenerator.prototype.Get = function () {
        return this.CurrentLevelIndentString;
    };

    IndentGenerator.prototype.GetAndAddIndent = function (LevelDelta) {
        var IndentString = this.CurrentLevelIndentString;
        this.AddIndent(LevelDelta);
        return IndentString;
    };

    IndentGenerator.prototype.AddIndentAndGet = function (LevelDelta) {
        this.AddIndent(LevelDelta);
        return this.CurrentLevelIndentString;
    };
    return IndentGenerator;
})();
