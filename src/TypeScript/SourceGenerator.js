/// <reference path="LangDeps.ts" />
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
/* language */
// Generator: GreenTeabe: shouldin: writtenlanguage: each. //
var GtNode = (function () {
    function GtNode(Type, Token) {
        this.Type = Type;
        this.Token = Token;
        this.ParentNode = null;
        this.PrevNode = null;
        this.NextNode = null;
    }
    GtNode.prototype.MoveHeadNode = function () {
        var Node = this;
        while (Node.PrevNode != null) {
            Node = Node.PrevNode;
        }
        return Node;
    };

    GtNode.prototype.MoveTailNode = function () {
        var Node = this;
        while (Node.NextNode != null) {
            Node = Node.NextNode;
        }
        return Node;
    };

    GtNode.prototype.Append = function (Node) {
        /*extension*/
    };

    GtNode.prototype.Evaluate = function (Visitor) {
        Visitor.VisitEmptyNode(this);
    };

    GtNode.prototype.IsError = function () {
        return (this instanceof ErrorNode);
    };

    GtNode.prototype.toString = function () {
        return "(TypedNode)";
    };

    GtNode.Stringify = function (Block) {
        var Text = Block.toString();
        while (Block != null) {
            Text += Block.toString() + " ";
            Block = Block.NextNode;
        }
        return Text;
    };

    GtNode.prototype.CountForrowingNode = function () {
        var n = 0;
        var node = this;
        while (node != null) {
            n++;
            node = node.NextNode;
        }
        return n;
    };
    return GtNode;
})();

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
})(GtNode);

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
})(GtNode);

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
})(GtNode);

// E.g., "~" $Expr //
var CastNode = (function (_super) {
    __extends(CastNode, _super);
    function CastNode(Type, Token, CastType, Expr) {
        _super.call(this, Type, Token);
        this.CastType = CastType;
        this.Expr = Expr;
    }
    CastNode.prototype.Evaluate = function (Visitor) {
        Visitor.VisitCastNode(this);
    };
    return CastNode;
})(GtNode);

//  E.g., "~" $Expr //
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
})(GtNode);

//  E.g.,  $Expr "++" //
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
})(GtNode);

// E.g., "exists" $Expr //
var ExistsNode = (function (_super) {
    __extends(ExistsNode, _super);
    function ExistsNode(Type, Token, Method, Expr) {
        _super.call(this, Type, Token);
        this.Method = Method;
        this.Expr = Expr;
    }
    ExistsNode.prototype.Evaluate = function (Visitor) {
        Visitor.VisitExistsNode(this);
    };
    return ExistsNode;
})(GtNode);

// E.g., $LeftNode = $RightNode //
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
        return "(Assign:" + this.Type + " " + GtNode.Stringify(this.LeftNode) + " = " + GtNode.Stringify(this.RightNode) + ")";
    };
    return AssignNode;
})(GtNode);

// E.g., $LeftNode += $RightNode //
var SelfAssignNode = (function (_super) {
    __extends(SelfAssignNode, _super);
    function SelfAssignNode(Type, Token, Left, Right) {
        _super.call(this, Type, Token);
        this.LeftNode = Left;
        this.RightNode = Right;
    }
    SelfAssignNode.prototype.Evaluate = function (Visitor) {
        Visitor.VisitSelfAssignNode(this);
    };
    SelfAssignNode.prototype.toString = function () {
        return "(Assign:" + this.Type + " " + GtNode.Stringify(this.LeftNode) + " = " + GtNode.Stringify(this.RightNode) + ")";
    };
    return SelfAssignNode;
})(GtNode);

// E.g., $LeftNode || $RightNode //
var InstanceOfNode = (function (_super) {
    __extends(InstanceOfNode, _super);
    function InstanceOfNode(Type, Token, ExprNode, TypeInfo) {
        _super.call(this, Type, Token);
        this.ExprNode = ExprNode;
        this.TypeInfo = TypeInfo;
    }
    InstanceOfNode.prototype.Evaluate = function (Visitor) {
        Visitor.VisitInstanceOfNode(this);
    };
    return InstanceOfNode;
})(GtNode);

//  E.g., $LeftNode "+" $RightNode //
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
})(GtNode);

// E.g., $LeftNode && $RightNode //
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
        return "(And:" + this.Type + " " + GtNode.Stringify(this.LeftNode) + ", " + GtNode.Stringify(this.RightNode) + ")";
    };
    return AndNode;
})(GtNode);

// E.g., $LeftNode || $RightNode //
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
        return "(Or:" + this.Type + " " + GtNode.Stringify(this.LeftNode) + ", " + GtNode.Stringify(this.RightNode) + ")";
    };
    return OrNode;
})(GtNode);

// E.g., $CondExpr "?" $ThenExpr ":" $ElseExpr //
var TrinaryNode = (function (_super) {
    __extends(TrinaryNode, _super);
    function TrinaryNode(Type, Token, CondExpr, ThenExpr, ElseExpr) {
        _super.call(this, Type, Token);
        this.CondExpr = CondExpr;
        this.ThenExpr = ThenExpr;
        this.ElseExpr = ElseExpr;
    }
    TrinaryNode.prototype.Evaluate = function (Visitor) {
        Visitor.VisitTrinaryNode(this);
    };
    return TrinaryNode;
})(GtNode);

// E.g., $Expr . Token.ParsedText //
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
        return "(Getter:" + this.Type + " " + GtNode.Stringify(this.Expr) + ", " + this.Method.MethodName + ")";
    };
    return GetterNode;
})(GtNode);

// E.g., $Expr "[" $Indexer "]" //
var IndexerNode = (function (_super) {
    __extends(IndexerNode, _super);
    function IndexerNode(Type, Token, Method, Expr, IndexAt) {
        _super.call(this, Type, Token);
        this.Method = Method;
        this.Expr = Expr;
        this.IndexAt = IndexAt;
    }
    IndexerNode.prototype.Evaluate = function (Visitor) {
        Visitor.VisitIndexerNode(this);
    };
    IndexerNode.prototype.toString = function () {
        return "(Index:" + this.Type + " " + GtNode.Stringify(this.Expr) + ", " + GtNode.Stringify(this.IndexAt) + ")";
    };
    return IndexerNode;
})(GtNode);

// E.g., $Expr "[" $Index ":" $Index2 "]" //
var SliceNode = (function (_super) {
    __extends(SliceNode, _super);
    function SliceNode(Type, Token, Method, Expr, Index1, Index2) {
        _super.call(this, Type, Token);
        this.Method = Method;
        this.Expr = Expr;
        this.Index1 = Index1;
        this.Index2 = Index2;
    }
    SliceNode.prototype.Evaluate = function (Visitor) {
        Visitor.VisitSliceNode(this);
    };
    SliceNode.prototype.toString = function () {
        return "(Index:" + this.Type + " " + GtNode.Stringify(this.Expr) + ", " + GtNode.Stringify(this.Index1) + ")";
    };
    return SliceNode;
})(GtNode);

var LetNode = (function (_super) {
    __extends(LetNode, _super);
    /*VarNode: letBlock: end: in */
    function LetNode(Type, Token, DeclType, VarName, InitNode, Block) {
        _super.call(this, Type, Token);
        this.VariableName = VarName;
        this.DeclType = DeclType;
        this.InitNode = InitNode;
        this.BlockNode = Block;
    }
    LetNode.prototype.Evaluate = function (Visitor) {
        Visitor.VisitLetNode(this);
    };
    LetNode.prototype.toString = function () {
        var Block = GtNode.Stringify(this.BlockNode);
        var Init = "null";
        if (this.InitNode != null) {
            Init = GtNode.Stringify(this.InitNode);
        }
        return "(Let:" + this.Type + " " + this.VariableName + " = " + Init + " in {" + Block + "})";
    };
    return LetNode;
})(GtNode);

//  E.g., $Param[0] "(" $Param[1], $Param[2], ... ")" //
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
        var i = 0;
        while (i < ListSize(this.Params)) {
            var Node = this.Params.get(i);
            if (i != 0) {
                Param += ", ";
            }
            Param += GtNode.Stringify(Node);
            i = i + 1;
        }
        return "(Apply:" + this.Type + " " + Param + ")";
    };
    return ApplyNode;
})(GtNode);

// E.g., $Recv.Method "(" $Param[0], $Param[1], ... ")" //
var MessageNode = (function (_super) {
    __extends(MessageNode, _super);
    function MessageNode(Type, KeyToken, Method, RecvNode) {
        _super.call(this, Type, KeyToken);
        this.Method = Method;
        this.RecvNode = RecvNode;
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
        var i = 0;
        while (i < ListSize(this.Params)) {
            var Node = this.Params.get(i);
            if (i != 0) {
                Param += ", ";
            }
            Param += GtNode.Stringify(Node);
            i = i + 1;
        }
        return "(Message:" + this.Type + " " + Param + ")";
    };
    return MessageNode;
})(GtNode);

// E.g., "new" $Type "(" $Param[0], $Param[1], ... ")" //
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
        var i = 0;
        while (i < ListSize(this.Params)) {
            var Node = this.Params.get(i);
            if (i != 0) {
                Param += ", ";
            }
            Param += GtNode.Stringify(Node);
            i = i + 1;
        }
        return "(New:" + this.Type + " " + Param + ")";
    };
    return NewNode;
})(GtNode);

// E.g., "if" "(" $Cond ")" $ThenNode "else" $ElseNode //
var IfNode = (function (_super) {
    __extends(IfNode, _super);
    /*CondExpr: IfThenBlock: then else ElseBlock */
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
        var Cond = GtNode.Stringify(this.CondExpr);
        var Then = GtNode.Stringify(this.ThenNode);
        var Else = GtNode.Stringify(this.ElseNode);
        return "(If:" + this.Type + " Cond:" + Cond + " Then:" + Then + " Else:" + Else + ")";
    };
    return IfNode;
})(GtNode);

// E.g., "while" "(" $CondExpr ")" $LoopBody //
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
        var Cond = GtNode.Stringify(this.CondExpr);
        var Body = GtNode.Stringify(this.LoopBody);
        return "(While:" + this.Type + " Cond:" + Cond + " Body:" + Body + ")";
    };
    return WhileNode;
})(GtNode);

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
        var Cond = GtNode.Stringify(this.CondExpr);
        var Body = GtNode.Stringify(this.LoopBody);
        return "(DoWhile:" + this.Type + " Cond:" + Cond + " Body:" + Body + ")";
    };
    return DoWhileNode;
})(GtNode);

// E.g., "for" "(" ";" $CondExpr ";" $IterExpr ")" $LoopNode //
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
        var Cond = GtNode.Stringify(this.CondExpr);
        var Body = GtNode.Stringify(this.LoopBody);
        var Iter = GtNode.Stringify(this.IterExpr);
        return "(For:" + this.Type + " Cond:" + Cond + " Body:" + Body + " Iter:" + Iter + ")";
    };
    return ForNode;
})(GtNode);

// E.g., "for" "(" $Variable ":" $IterExpr ")" $LoopNode //
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
        var Var = GtNode.Stringify(this.Variable);
        var Body = GtNode.Stringify(this.LoopBody);
        var Iter = GtNode.Stringify(this.IterExpr);
        return "(Foreach:" + this.Type + " Var:" + Var + " Body:" + Body + " Iter:" + Iter + ")";
    };
    return ForEachNode;
})(GtNode);

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
})(GtNode);

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
})(GtNode);

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
})(GtNode);

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
})(GtNode);

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
            Text = GtNode.Stringify(this.Expr);
        }
        return "(Return:" + this.Type + " " + Text + ")";
    };
    return ReturnNode;
})(GtNode);

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
        return "(Throw:" + this.Type + " " + GtNode.Stringify(this.Expr) + ")";
    };
    return ThrowNode;
})(GtNode);

var TryNode = (function (_super) {
    __extends(TryNode, _super);
    function TryNode(Type, Token, TryBlock, CatchBlock, FinallyBlock) {
        _super.call(this, Type, Token);
        this.TryBlock = TryBlock;
        this.CatchBlock = CatchBlock;
        this.FinallyBlock = FinallyBlock;
    }
    TryNode.prototype.Evaluate = function (Visitor) {
        Visitor.VisitTryNode(this);
    };
    TryNode.prototype.toString = function () {
        var TryBlock = GtNode.Stringify(this.TryBlock);
        return "(Try:" + this.Type + " " + TryBlock + ")";
    };
    return TryNode;
})(GtNode);

var SwitchNode = (function (_super) {
    __extends(SwitchNode, _super);
    function SwitchNode(Type, Token) {
        _super.call(this, Type, Token);
    }
    // CondExpr: TypedNode; //
    // Labels: Array<TypedNode>; //
    // Blocks: Array<TypedNode>; //
    SwitchNode.prototype.Evaluate = function (Visitor) {
        Visitor.VisitSwitchNode(this);
    };
    SwitchNode.prototype.toString = function () {
        // FIXME //
        return "(Switch:" + this.Type + ")";
    };
    return SwitchNode;
})(GtNode);

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
})(GtNode);

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
})(GtNode);

//  E.g., "ls" "-a".. //
var CommandNode = (function (_super) {
    __extends(CommandNode, _super);
    function CommandNode(Type, KeyToken, PipedNextNode) {
        _super.call(this, Type, KeyToken);
        this.PipedNextNode = PipedNextNode;
        this.Params = new Array();
    }
    CommandNode.prototype.Append = function (Expr) {
        this.Params.add(Expr);
    };

    CommandNode.prototype.Evaluate = function (Visitor) {
        Visitor.VisitCommandNode(this);
    };
    CommandNode.prototype.toString = function () {
        var Param = "";
        var i = 0;
        while (i < ListSize(this.Params)) {
            var Node = this.Params.get(i);
            if (i != 0) {
                Param += ", ";
            }
            Param += GtNode.Stringify(Node);
            i = i + 1;
        }
        return "(Command:" + this.Type + " " + Param + ")";
    };
    return CommandNode;
})(GtNode);

var GtType = (function () {
    function GtType(Context, ClassFlag, ClassName, DefaultNullValue, NativeSpec) {
        this.Context = Context;
        this.ClassFlag = ClassFlag;
        this.ShortClassName = ClassName;
        this.SuperClass = null;
        this.BaseClass = this;
        this.SearchSuperMethodClass = null;
        this.DefaultNullValue = DefaultNullValue;
        this.NativeSpec = NativeSpec;
        this.ClassSymbolTable = IsFlag(ClassFlag, EnumClass) ? NativeSpec : null;
        this.ClassId = Context.ClassCount;
        Context.ClassCount += 1;
        this.Types = null;
    }
    GtType.prototype.CreateSubType = function (ClassFlag, ClassName, DefaultNullValue, NativeSpec) {
        var SubType = new GtType(this.Context, ClassFlag, ClassName, DefaultNullValue, NativeSpec);
        SubType.SuperClass = this;
        SubType.SearchSuperMethodClass = this;
        return SubType;
    };

    // Don: Note'tthis: directly: call.Context: Use.instead: GetGenericType. //
    GtType.prototype.CreateGenericType = function (BaseIndex, TypeList, ShortName) {
        var GenericType = new GtType(this.Context, this.ClassFlag, ShortName, null, null);
        GenericType.BaseClass = this.BaseClass;
        GenericType.SearchSuperMethodClass = this.BaseClass;
        GenericType.SuperClass = this.SuperClass;
        this.Types = LangDeps.CompactTypeList(BaseIndex, TypeList);
        console.log("DEBUG: " + "new class: " + GenericType.ShortClassName + ", ClassId=" + GenericType.ClassId);
        return GenericType;
    };

    GtType.prototype.IsNative = function () {
        return IsFlag(this.ClassFlag, NativeClass);
    };

    GtType.prototype.IsDynamic = function () {
        return IsFlag(this.ClassFlag, DynamicClass);
    };

    GtType.prototype.IsGenericType = function () {
        return (this.Types != null);
    };

    GtType.prototype.toString = function () {
        return this.ShortClassName;
    };

    GtType.prototype.GetClassSymbol = function (Key, RecursiveSearch) {
        var Type = this;
        while (Type != null) {
            if (Type.ClassSymbolTable != null) {
                return Type.ClassSymbolTable.get(Key);
            }
            Type = (RecursiveSearch) ? Type.SuperClass : null;
        }
        return null;
    };

    GtType.prototype.SetClassSymbol = function (Key, Value) {
        if (this.ClassSymbolTable == null) {
            this.ClassSymbolTable = new GtMap();
        }
        this.ClassSymbolTable.put(Key, Value);
    };

    GtType.prototype.GetSignature = function () {
        return NumberToAscii(this.ClassId);
    };

    GtType.prototype.Accept = function (Type) {
        if (this == Type || this == this.Context.AnyType) {
            return true;
        }
        var SuperClass = this.SuperClass;
        while (SuperClass != null) {
            if (SuperClass == Type) {
                return true;
            }
            SuperClass = SuperClass.SuperClass;
        }
        return this.Context.CheckSubType(Type, this);
    };
    return GtType;
})();

var GtMethod = (function () {
    function GtMethod(MethodFlag, MethodName, BaseIndex, ParamList, NativeRef) {
        this.MethodFlag = MethodFlag;
        this.MethodName = MethodName;
        this.MethodSymbolId = GetSymbolId(MethodName, CreateNewSymbolId);
        this.Types = LangDeps.CompactTypeList(BaseIndex, ParamList);
        LangDeps.Assert(this.Types.length > 0);
        this.ListedMethods = null;
        this.FuncType = null;
        this.NativeRef = NativeRef;
        this.MangledName = MangleMethodName(this.GetRecvType(), this.MethodName, BaseIndex + 2, ParamList);
    }
    GtMethod.prototype.GetNativeFuncName = function () {
        if (this.Is(ExportMethod)) {
            return this.MethodName;
        } else {
            return this.MangledName;
        }
    };

    GtMethod.prototype.GetFuncType = function () {
        if (this.FuncType == null) {
            var Context = this.GetRecvType().Context;
            this.FuncType = Context.GetGenericType(Context.FuncType, 0, this.Types, true);
        }
        return this.FuncType;
    };

    GtMethod.prototype.toString = function () {
        var s = this.MethodName + "(";
        var i = 0;
        while (i < this.GetFuncParamSize()) {
            var ParamType = this.GetFuncParamType(i);
            if (i > 0) {
                s += ", ";
            }
            s += ParamType.ShortClassName;
            i += 1;
        }
        return s + ": " + this.GetReturnType();
    };

    GtMethod.prototype.Is = function (Flag) {
        return IsFlag(this.MethodFlag, Flag);
    };

    GtMethod.prototype.GetReturnType = function () {
        return this.Types[0];
    };

    GtMethod.prototype.GetRecvType = function () {
        if (this.Types.length == 1) {
            return this.Types[0].Context.VoidType;
        }
        return this.Types[1];
    };

    GtMethod.prototype.GetFuncParamSize = function () {
        return this.Types.length - 1;
    };

    GtMethod.prototype.GetFuncParamType = function (ParamIdx) {
        return this.Types[ParamIdx + 1];
    };

    GtMethod.prototype.GetMethodParamSize = function () {
        return this.Types.length - 2;
    };

    GtMethod.prototype.GetNativeMacro = function () {
        return this.NativeRef;
    };

    GtMethod.prototype.ExpandMacro1 = function (Arg0) {
        var NativeMacro = IsFlag(this.MethodFlag, NativeMacroMethod) ? this.NativeRef : this.MethodName + " $1";
        return NativeMacro.replaceAll("$0", Arg0);
    };

    GtMethod.prototype.ExpandMacro2 = function (Arg0, Arg1) {
        var NativeMacro = IsFlag(this.MethodFlag, NativeMacroMethod) ? this.NativeRef : "$1 " + this.MethodName + " $2";
        return NativeMacro.replaceAll("$0", Arg0);
    };
    return GtMethod;
})();

var GtGenerator = (function () {
    function GtGenerator(LangName) {
        this.LangName = LangName;
        this.Context = null;
        this.GeneratedCodeStack = new Array();
    }
    GtGenerator.prototype.SetLanguageContext = function (Context) {
        this.Context = Context;
    };

    GtGenerator.prototype.UnsupportedNode = function (Type, ParsedTree) {
        var Token = ParsedTree.KeyToken;
        ParsedTree.NameSpace.ReportError(ErrorLevel, Token, this.LangName + "no: hassupport: for: language " + Token.ParsedText);
        return new ErrorNode(ParsedTree.NameSpace.Context.VoidType, ParsedTree.KeyToken);
    };

    GtGenerator.prototype.CreateConstNode = function (Type, ParsedTree, Value) {
        return new ConstNode(Type, ParsedTree.KeyToken, Value);
    };

    GtGenerator.prototype.CreateNullNode = function (Type, ParsedTree) {
        return new NullNode(Type, ParsedTree.KeyToken);
    };

    GtGenerator.prototype.CreateLocalNode = function (Type, ParsedTree, LocalName) {
        return new LocalNode(Type, ParsedTree.KeyToken, LocalName);
    };

    GtGenerator.prototype.CreateGetterNode = function (Type, ParsedTree, Method, Expr) {
        return new GetterNode(Type, ParsedTree.KeyToken, Method, Expr);
    };

    GtGenerator.prototype.CreateIndexerNode = function (Type, ParsedTree, Method, Expr, Index) {
        return new IndexerNode(Type, ParsedTree.KeyToken, Method, Expr, Index);
    };

    GtGenerator.prototype.CreateApplyNode = function (Type, ParsedTree, Method) {
        return new ApplyNode(Type, ParsedTree.KeyToken, Method);
    };

    GtGenerator.prototype.CreateMessageNode = function (Type, ParsedTree, RecvNode, Method) {
        return new MessageNode(Type, ParsedTree.KeyToken, Method, RecvNode);
    };

    GtGenerator.prototype.CreateNewNode = function (Type, ParsedTree) {
        return new NewNode(Type, ParsedTree.KeyToken);
    };

    GtGenerator.prototype.CreateUnaryNode = function (Type, ParsedTree, Method, Expr) {
        return new UnaryNode(Type, ParsedTree.KeyToken, Method, Expr);
    };

    GtGenerator.prototype.CreateSuffixNode = function (Type, ParsedTree, Method, Expr) {
        return new SuffixNode(Type, ParsedTree.KeyToken, Method, Expr);
    };

    GtGenerator.prototype.CreateBinaryNode = function (Type, ParsedTree, Method, Left, Right) {
        return new BinaryNode(Type, ParsedTree.KeyToken, Method, Left, Right);
    };

    GtGenerator.prototype.CreateAndNode = function (Type, ParsedTree, Left, Right) {
        return new AndNode(Type, ParsedTree.KeyToken, Left, Right);
    };

    GtGenerator.prototype.CreateOrNode = function (Type, ParsedTree, Left, Right) {
        return new OrNode(Type, ParsedTree.KeyToken, Left, Right);
    };

    GtGenerator.prototype.CreateAssignNode = function (Type, ParsedTree, Left, Right) {
        return new AssignNode(Type, ParsedTree.KeyToken, Left, Right);
    };

    GtGenerator.prototype.CreateLetNode = function (Type, ParsedTree, DeclType, VarName, InitNode, Block) {
        return new LetNode(Type, ParsedTree.KeyToken, DeclType, VarName, InitNode, Block);
    };

    GtGenerator.prototype.CreateIfNode = function (Type, ParsedTree, Cond, Then, Else) {
        return new IfNode(Type, ParsedTree.KeyToken, Cond, Then, Else);
    };

    GtGenerator.prototype.CreateSwitchNode = function (Type, ParsedTree, Match) {
        return null;
    };

    GtGenerator.prototype.CreateWhileNode = function (Type, ParsedTree, Cond, Block) {
        return new WhileNode(Type, ParsedTree.KeyToken, Cond, Block);
    };

    GtGenerator.prototype.CreateDoWhileNode = function (Type, ParsedTree, Cond, Block) {
        return new DoWhileNode(Type, ParsedTree.KeyToken, Cond, Block);
    };

    GtGenerator.prototype.CreateForNode = function (Type, ParsedTree, Cond, IterNode, Block) {
        return new ForNode(Type, ParsedTree.KeyToken, Cond, Block, IterNode);
    };

    GtGenerator.prototype.CreateForEachNode = function (Type, ParsedTree, VarNode, IterNode, Block) {
        return new ForEachNode(Type, ParsedTree.KeyToken, VarNode, IterNode, Block);
    };

    GtGenerator.prototype.CreateReturnNode = function (Type, ParsedTree, Node) {
        return new ReturnNode(Type, ParsedTree.KeyToken, Node);
    };

    GtGenerator.prototype.CreateLabelNode = function (Type, ParsedTree, Node) {
        return null;
    };

    GtGenerator.prototype.CreateJumpNode = function (Type, ParsedTree, Node, Label) {
        return new JumpNode(Type, ParsedTree.KeyToken, Label);
    };

    GtGenerator.prototype.CreateBreakNode = function (Type, ParsedTree, Node, Label) {
        return new BreakNode(Type, ParsedTree.KeyToken, Label);
    };

    GtGenerator.prototype.CreateContinueNode = function (Type, ParsedTree, Node, Label) {
        return new ContinueNode(Type, ParsedTree.KeyToken, Label);
    };

    GtGenerator.prototype.CreateTryNode = function (Type, ParsedTree, TryBlock, CatchNode, FinallyBlock) {
        return new TryNode(Type, ParsedTree.KeyToken, TryBlock, CatchNode, FinallyBlock);
    };

    GtGenerator.prototype.CreateThrowNode = function (Type, ParsedTree, Node) {
        return new ThrowNode(Type, ParsedTree.KeyToken, Node);
    };

    GtGenerator.prototype.CreateFunctionNode = function (Type, ParsedTree, Block) {
        return null;
    };

    GtGenerator.prototype.CreateEmptyNode = function (Type) {
        return new GtNode(Type, GtTokenContext.NullToken);
    };

    GtGenerator.prototype.CreateErrorNode = function (Type, ParsedTree) {
        return new ErrorNode(ParsedTree.NameSpace.Context.VoidType, ParsedTree.KeyToken);
    };

    GtGenerator.prototype.CreateCommandNode = function (Type, ParsedTree, PipedNextNode) {
        return new CommandNode(Type, ParsedTree.KeyToken, PipedNextNode);
    };

    /*constructor: language */
    GtGenerator.prototype.GetNativeType = function (Value) {
        var NativeType = this.Context.AnyType;

        return NativeType;
    };

    GtGenerator.prototype.TransformNativeMethods = function (NativeBaseType, MethodName) {
        var TransformedResult = false;

        return TransformedResult;
    };

    GtGenerator.prototype.ParseClassFlag = function (ClassFlag, ClassDeclTree) {
        // 		if(ClassDeclTree.HasAnnotation("Final")) { //
        // 			ClassFlag = ClassFlag | FinalClass; //
        // 		} //
        // 		if(ClassDeclTree.HasAnnotation("Private")) { //
        // 			ClassFlag = ClassFlag | PrivateClass; //
        // 		} //
        return ClassFlag;
    };

    GtGenerator.prototype.AddClass = function (Type) {
        /*extension*/
    };

    GtGenerator.prototype.DefineClassField = function (NameSpace, Type, Field) {
        /*extension*/
    };

    GtGenerator.prototype.DefineClassMethod = function (NameSpace, Type, Method) {
        /*extension*/
    };

    GtGenerator.prototype.FreezeClass = function (Type) {
        /*extension*/
    };

    GtGenerator.prototype.ParseMethodFlag = function (MethodFlag, MethodDeclTree) {
        if (MethodDeclTree.HasAnnotation("Export")) {
            MethodFlag = MethodFlag | ExportMethod;
        }
        return MethodFlag;
    };

    GtGenerator.prototype.CreateMethod = function (MethodFlag, MethodName, BaseIndex, TypeList, RawMacro) {
        return new GtMethod(MethodFlag, MethodName, BaseIndex, TypeList, RawMacro);
    };

    GtGenerator.prototype.GenerateMethod = function (Method, ParamNameList, Body) {
        /*extenstion*/
    };

    // ------------------------------------------------------------------------ //
    GtGenerator.prototype.VisitEmptyNode = function (EmptyNode) {
        console.log("DEBUG: " + "node: empty: " + EmptyNode.Token.ParsedText);
    };

    GtGenerator.prototype.VisitInstanceOfNode = function (Node) {
        /*extention*/
    };

    GtGenerator.prototype.VisitSelfAssignNode = function (Node) {
        /*extention*/
    };

    GtGenerator.prototype.VisitTrinaryNode = function (Node) {
        /*extension*/
    };

    GtGenerator.prototype.VisitExistsNode = function (Node) {
        /*extension*/
    };

    GtGenerator.prototype.VisitCastNode = function (Node) {
        /*extension*/
    };

    GtGenerator.prototype.VisitSliceNode = function (Node) {
        /*extension*/
    };

    GtGenerator.prototype.VisitSuffixNode = function (Node) {
        /*extension*/
    };

    GtGenerator.prototype.VisitUnaryNode = function (Node) {
        /*extension*/
    };

    GtGenerator.prototype.VisitIndexerNode = function (Node) {
        /*extension*/
    };

    GtGenerator.prototype.VisitMessageNode = function (Node) {
        /*extension*/
    };

    GtGenerator.prototype.VisitWhileNode = function (Node) {
        /*extension*/
    };

    GtGenerator.prototype.VisitDoWhileNode = function (Node) {
        /*extension*/
    };

    GtGenerator.prototype.VisitForNode = function (Node) {
        /*extension*/
    };

    GtGenerator.prototype.VisitForEachNode = function (Node) {
        /*extension*/
    };

    GtGenerator.prototype.VisitConstNode = function (Node) {
        /*extension*/
    };

    GtGenerator.prototype.VisitNewNode = function (Node) {
        /*extension*/
    };

    GtGenerator.prototype.VisitNullNode = function (Node) {
        /*extension*/
    };

    GtGenerator.prototype.VisitLocalNode = function (Node) {
        /*extension*/
    };

    GtGenerator.prototype.VisitGetterNode = function (Node) {
        /*extension*/
    };

    GtGenerator.prototype.VisitApplyNode = function (Node) {
        /*extension*/
    };

    GtGenerator.prototype.VisitBinaryNode = function (Node) {
        /*extension*/
    };

    GtGenerator.prototype.VisitAndNode = function (Node) {
        /*extension*/
    };

    GtGenerator.prototype.VisitOrNode = function (Node) {
        /*extension*/
    };

    GtGenerator.prototype.VisitAssignNode = function (Node) {
        /*extension*/
    };

    GtGenerator.prototype.VisitLetNode = function (Node) {
        /*extension*/
    };

    GtGenerator.prototype.VisitIfNode = function (Node) {
        /*extension*/
    };

    GtGenerator.prototype.VisitSwitchNode = function (Node) {
        /*extension*/
    };

    GtGenerator.prototype.VisitReturnNode = function (Node) {
        /*extension*/
    };

    GtGenerator.prototype.VisitLabelNode = function (Node) {
        /*extension*/
    };

    GtGenerator.prototype.VisitJumpNode = function (Node) {
        /*extension*/
    };

    GtGenerator.prototype.VisitBreakNode = function (Node) {
        /*extension*/
    };

    GtGenerator.prototype.VisitContinueNode = function (Node) {
        /*extension*/
    };

    GtGenerator.prototype.VisitTryNode = function (Node) {
        /*extension*/
    };

    GtGenerator.prototype.VisitThrowNode = function (Node) {
        /*extension*/
    };

    GtGenerator.prototype.VisitFunctionNode = function (Node) {
        /*extension*/
    };

    GtGenerator.prototype.VisitErrorNode = function (Node) {
        /*extension*/
    };

    GtGenerator.prototype.VisitCommandNode = function (Node) {
        /*extension*/
    };

    GtGenerator.prototype.VisitBlock = function (Node) {
        var CurrentNode = Node;
        while (CurrentNode != null) {
            CurrentNode.Evaluate(this);
            CurrentNode = CurrentNode.NextNode;
        }
    };

    // must: Thisextended: beeach: language: in //
    GtGenerator.prototype.IsStrictMode = function () {
        return true;
    };

    GtGenerator.prototype.Eval = function (Node) {
        this.VisitBlock(Node);
        return null;
    };

    GtGenerator.prototype.BlockComment = function (Comment) {
        return "/*" + Comment + "*/";
    };

    GtGenerator.prototype.PushCode = function (Code) {
        this.GeneratedCodeStack.add(Code);
    };

    GtGenerator.prototype.PopCode = function () {
        var Size = this.GeneratedCodeStack.size();
        if (Size > 0) {
            return this.GeneratedCodeStack.remove(Size - 1);
        }
        return "";
    };
    return GtGenerator;
})();

var SourceGenerator = (function (_super) {
    __extends(SourceGenerator, _super);
    function SourceGenerator(LangName) {
        _super.call(this, LangName);
        this.IndentLevel = 0;
        this.CurrentLevelIndentString = null;
    }
    /* GeneratorUtils */
    SourceGenerator.prototype.Indent = function () {
        this.IndentLevel += 1;
        this.CurrentLevelIndentString = null;
    };

    SourceGenerator.prototype.UnIndent = function () {
        this.IndentLevel -= 1;
        this.CurrentLevelIndentString = null;
        LangDeps.Assert(this.IndentLevel >= 0);
    };

    SourceGenerator.prototype.GetIndentString = function () {
        if (this.CurrentLevelIndentString == null) {
            this.CurrentLevelIndentString = JoinStrings("   ", this.IndentLevel);
        }
        return this.CurrentLevelIndentString;
    };

    SourceGenerator.prototype.StringfyConstValue = function (ConstValue) {
        if (ConstValue instanceof String) {
            return "\"" + ConstValue + "\"";
        }
        return ConstValue.toString();
    };

    SourceGenerator.prototype.PushSourceCode = function (Code) {
        this.GeneratedCodeStack.add(Code);
    };

    SourceGenerator.prototype.PopSourceCode = function () {
        return this.PopCode();
    };

    SourceGenerator.prototype.PopManyCode = function (n) {
        var array = new Array(n);
        var i = 0;
        while (i < n) {
            array[i] = this.PopSourceCode();
            i = i + 1;
        }
        return array;
    };

    SourceGenerator.prototype.PopManyCodeReverse = function (n) {
        var array = new Array(n);
        var i = 0;
        while (i < n) {
            array[n - i - 1] = this.PopSourceCode();
            i = i + 1;
        }
        return array;
    };

    SourceGenerator.prototype.PopManyCodeAndJoin = function (n, reverse, prefix, suffix, delim) {
        if (prefix == null) {
            prefix = "";
        }
        if (suffix == null) {
            suffix = "";
        }
        if (delim == null) {
            delim = "";
        }
        var array = null;
        if (reverse) {
            array = this.PopManyCodeReverse(n);
        } else {
            array = this.PopManyCode(n);
        }
        var Code = "";
        var i = 0;
        while (i < n) {
            if (i > 0) {
                Code += delim;
            }
            Code = Code + prefix + array[i] + suffix;
            i = i + 1;
        }
        return Code;
    };

    SourceGenerator.prototype.WriteTranslatedCode = function (Text) {
        console.log(Text);
    };
    return SourceGenerator;
})(GtGenerator);
