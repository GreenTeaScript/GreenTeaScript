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
        return Node;
    };

    TypedNode.prototype.Append = function (Node) {
    };

    TypedNode.prototype.Evaluate = function (Visitor) {
        Visitor.VisitEmptyNode(this);
    };

    TypedNode.prototype.IsError = function () {
        return (this instanceof ErrorNode);
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

    TypedNode.prototype.CountForrowingNode = function () {
        var n = 0;
        var node = this;
        while (node != null) {
            n++;
            node = node.NextNode;
        }
        return n;
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
        var i = 0;
        while (i < ListSize(this.Params)) {
            var Node = this.Params.get(i);
            if (i != 0) {
                Param += ", ";
            }
            Param += TypedNode.Stringify(Node);
            i = i + 1;
        }
        return "(Apply:" + this.Type + " " + Param + ")";
    };
    return ApplyNode;
})(TypedNode);

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
            Param += TypedNode.Stringify(Node);
            i = i + 1;
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
        var i = 0;
        while (i < ListSize(this.Params)) {
            var Node = this.Params.get(i);
            if (i != 0) {
                Param += ", ";
            }
            Param += TypedNode.Stringify(Node);
            i = i + 1;
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
        var Var = TypedNode.Stringify(this.Variable);
        var Body = TypedNode.Stringify(this.LoopBody);
        var Iter = TypedNode.Stringify(this.IterExpr);
        return "(Foreach:" + this.Type + " Var:" + Var + " Body:" + Body + " Iter:" + Iter + ")";
    };
    return ForEachNode;
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
            Param += TypedNode.Stringify(Node);
            i = i + 1;
        }
        return "(Command:" + this.Type + " " + Param + ")";
    };
    return CommandNode;
})(TypedNode);

var GtObject = (function () {
    function GtObject(Type) {
        this.Type = Type;
    }
    return GtObject;
})();

var GtType = (function () {
    function GtType(Context, ClassFlag, ClassName, DefaultNullValue) {
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
    }
    GtType.prototype.IsGenericType = function () {
        return (this.Types != null);
    };

    GtType.prototype.CreateGenericType = function (BaseIndex, TypeList, ShortName) {
        var GenericType = new GtType(this.Context, this.ClassFlag, ShortName, null);
        GenericType.BaseClass = this.BaseClass;
        GenericType.SearchSuperMethodClass = this.BaseClass;
        GenericType.SuperClass = this.SuperClass;
        this.Types = LangDeps.CompactTypeList(BaseIndex, TypeList);
        console.log("DEBUG: " + "new class: " + GenericType.ShortClassName + ", ClassId=" + GenericType.ClassId);
        return GenericType;
    };

    GtType.prototype.SetParamType = function (ParamType) {
        this.Types = new Array(1);
        this.Types[0] = ParamType;
    };

    GtType.prototype.toString = function () {
        return this.ShortClassName;
    };

    GtType.prototype.GetMethodId = function (MethodName) {
        return "" + this.ClassId + "@" + MethodName;
    };

    GtType.prototype.Accept = function (Type) {
        if (this == Type || this == this.Context.AnyType) {
            return true;
        }
        return false;
    };
    return GtType;
})();

var GtMethod = (function () {
    function GtMethod(MethodFlag, MethodName, BaseIndex, ParamList, SourceMacro) {
        this.MethodFlag = MethodFlag;
        this.MethodName = MethodName;
        this.MethodSymbolId = GetCanonicalSymbolId(MethodName);
        this.Types = LangDeps.CompactTypeList(BaseIndex, ParamList);
        LangDeps.Assert(this.Types.length > 0);
        this.Layer = null;
        this.ElderMethod = null;
        this.FuncType = null;
        this.SourceMacro = SourceMacro;

        var Name = this.MethodName;
        if (!LangDeps.IsLetter(LangDeps.CharAt(Name, 0))) {
            Name = "_operator" + this.MethodSymbolId;
        }
        if (!this.Is(ExportMethod)) {
            Name = Name + "__" + Mangle(this.GetRecvType(), BaseIndex + 1, ParamList);
        }
        this.LocalFuncName = Name;
    }
    GtMethod.prototype.toString = function () {
        var s = this.MethodName + "(";
        var i = 0;
        while (i < this.GetParamSize()) {
            var ParamType = this.GetParamType(i);
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

    GtMethod.prototype.GetParamSize = function () {
        return this.Types.length - 1;
    };

    GtMethod.prototype.GetParamType = function (ParamIdx) {
        return this.Types[ParamIdx + 1];
    };

    GtMethod.prototype.GetFuncType = function () {
        if (this.FuncType != null) {
            var Context = this.GetRecvType().Context;
            this.FuncType = Context.GetGenericType(Context.FuncType, 0, this.Types, true);
        }
        return this.FuncType;
    };

    GtMethod.prototype.ExpandMacro1 = function (Arg0) {
        if (this.SourceMacro == null) {
            return this.MethodName + " " + Arg0;
        } else {
            return this.SourceMacro.replaceAll("$0", Arg0);
        }
    };

    GtMethod.prototype.ExpandMacro2 = function (Arg0, Arg1) {
        if (this.SourceMacro == null) {
            return Arg0 + " " + this.MethodName + " " + Arg1;
        } else {
            return this.SourceMacro.replaceAll("$0", Arg0).replaceAll("$1", Arg1);
        }
    };
    return GtMethod;
})();

var CodeGenerator = (function () {
    function CodeGenerator(LangName) {
        this.LangName = LangName;
        this.Context = null;
        this.GeneratedCodeStack = new Array();
    }
    CodeGenerator.prototype.SetLanguageContext = function (Context) {
        this.Context = Context;
    };

    CodeGenerator.prototype.UnsupportedNode = function (Type, ParsedTree) {
        var Token = ParsedTree.KeyToken;
        ParsedTree.NameSpace.ReportError(ErrorLevel, Token, this.LangName + "no: hassupport: for: language " + Token.ParsedText);
        return new ErrorNode(ParsedTree.NameSpace.Context.VoidType, ParsedTree.KeyToken);
    };

    CodeGenerator.prototype.CreateConstNode = function (Type, ParsedTree, Value) {
        return new ConstNode(Type, ParsedTree.KeyToken, Value);
    };

    CodeGenerator.prototype.CreateNullNode = function (Type, ParsedTree) {
        return new NullNode(Type, ParsedTree.KeyToken);
    };

    CodeGenerator.prototype.CreateLocalNode = function (Type, ParsedTree, LocalName) {
        return new LocalNode(Type, ParsedTree.KeyToken, LocalName);
    };

    CodeGenerator.prototype.CreateGetterNode = function (Type, ParsedTree, Method, Expr) {
        return new GetterNode(Type, ParsedTree.KeyToken, Method, Expr);
    };

    CodeGenerator.prototype.CreateIndexerNode = function (Type, ParsedTree, Method, Expr, Index) {
        return new IndexerNode(Type, ParsedTree.KeyToken, Method, Expr, Index);
    };

    CodeGenerator.prototype.CreateApplyNode = function (Type, ParsedTree, Method) {
        return new ApplyNode(Type, ParsedTree.KeyToken, Method);
    };

    CodeGenerator.prototype.CreateMessageNode = function (Type, ParsedTree, RecvNode, Method) {
        return new MessageNode(Type, ParsedTree.KeyToken, Method, RecvNode);
    };

    CodeGenerator.prototype.CreateNewNode = function (Type, ParsedTree) {
        return new NewNode(Type, ParsedTree.KeyToken);
    };

    CodeGenerator.prototype.CreateUnaryNode = function (Type, ParsedTree, Method, Expr) {
        return new UnaryNode(Type, ParsedTree.KeyToken, Method, Expr);
    };

    CodeGenerator.prototype.CreateSuffixNode = function (Type, ParsedTree, Method, Expr) {
        return new SuffixNode(Type, ParsedTree.KeyToken, Method, Expr);
    };

    CodeGenerator.prototype.CreateBinaryNode = function (Type, ParsedTree, Method, Left, Right) {
        return new BinaryNode(Type, ParsedTree.KeyToken, Method, Left, Right);
    };

    CodeGenerator.prototype.CreateAndNode = function (Type, ParsedTree, Left, Right) {
        return new AndNode(Type, ParsedTree.KeyToken, Left, Right);
    };

    CodeGenerator.prototype.CreateOrNode = function (Type, ParsedTree, Left, Right) {
        return new OrNode(Type, ParsedTree.KeyToken, Left, Right);
    };

    CodeGenerator.prototype.CreateAssignNode = function (Type, ParsedTree, Left, Right) {
        return new AssignNode(Type, ParsedTree.KeyToken, Left, Right);
    };

    CodeGenerator.prototype.CreateLetNode = function (Type, ParsedTree, DeclType, VarNode, Block) {
        return new LetNode(Type, ParsedTree.KeyToken, DeclType, VarNode, Block);
    };

    CodeGenerator.prototype.CreateIfNode = function (Type, ParsedTree, Cond, Then, Else) {
        return new IfNode(Type, ParsedTree.KeyToken, Cond, Then, Else);
    };

    CodeGenerator.prototype.CreateSwitchNode = function (Type, ParsedTree, Match) {
        return null;
    };

    CodeGenerator.prototype.CreateWhileNode = function (Type, ParsedTree, Cond, Block) {
        return new WhileNode(Type, ParsedTree.KeyToken, Cond, Block);
    };

    CodeGenerator.prototype.CreateDoWhileNode = function (Type, ParsedTree, Cond, Block) {
        return new DoWhileNode(Type, ParsedTree.KeyToken, Cond, Block);
    };

    CodeGenerator.prototype.CreateForNode = function (Type, ParsedTree, Cond, IterNode, Block) {
        return new ForNode(Type, ParsedTree.KeyToken, Cond, Block, IterNode);
    };

    CodeGenerator.prototype.CreateForEachNode = function (Type, ParsedTree, VarNode, IterNode, Block) {
        return new ForEachNode(Type, ParsedTree.KeyToken, VarNode, IterNode, Block);
    };

    CodeGenerator.prototype.CreateReturnNode = function (Type, ParsedTree, Node) {
        return new ReturnNode(Type, ParsedTree.KeyToken, Node);
    };

    CodeGenerator.prototype.CreateLabelNode = function (Type, ParsedTree, Node) {
        return null;
    };

    CodeGenerator.prototype.CreateJumpNode = function (Type, ParsedTree, Node, Label) {
        return new JumpNode(Type, ParsedTree.KeyToken, Label);
    };

    CodeGenerator.prototype.CreateBreakNode = function (Type, ParsedTree, Node, Label) {
        return new BreakNode(Type, ParsedTree.KeyToken, Label);
    };

    CodeGenerator.prototype.CreateContinueNode = function (Type, ParsedTree, Node, Label) {
        return new ContinueNode(Type, ParsedTree.KeyToken, Label);
    };

    CodeGenerator.prototype.CreateTryNode = function (Type, ParsedTree, TryBlock, FinallyBlock) {
        return new TryNode(Type, ParsedTree.KeyToken, TryBlock, FinallyBlock);
    };

    CodeGenerator.prototype.CreateThrowNode = function (Type, ParsedTree, Node) {
        return new ThrowNode(Type, ParsedTree.KeyToken, Node);
    };

    CodeGenerator.prototype.CreateFunctionNode = function (Type, ParsedTree, Block) {
        return null;
    };

    CodeGenerator.prototype.CreateDefineNode = function (Type, ParsedTree, Module) {
        return null;
    };

    CodeGenerator.prototype.CreateEmptyNode = function (Type, ParsedTree) {
        return new TypedNode(ParsedTree.NameSpace.Context.VoidType, ParsedTree.KeyToken);
    };

    CodeGenerator.prototype.CreateErrorNode = function (Type, ParsedTree) {
        return new ErrorNode(ParsedTree.NameSpace.Context.VoidType, ParsedTree.KeyToken);
    };

    CodeGenerator.prototype.CreateCommandNode = function (Type, ParsedTree, PipedNextNode) {
        return new CommandNode(Type, ParsedTree.KeyToken, PipedNextNode);
    };

    CodeGenerator.prototype.ParseMethodFlag = function (MethodFlag, MethodDeclTree) {
        if (MethodDeclTree.HasAnnotation("Export")) {
            MethodFlag = MethodFlag | ExportMethod;
        }
        if (MethodDeclTree.HasAnnotation("Operator")) {
            MethodFlag = MethodFlag | OperatorMethod;
        }
        return MethodFlag;
    };

    CodeGenerator.prototype.CreateMethod = function (MethodFlag, MethodName, BaseIndex, TypeList, RawMacro) {
        return new GtMethod(MethodFlag, MethodName, BaseIndex, TypeList, RawMacro);
    };

    CodeGenerator.prototype.VisitEmptyNode = function (EmptyNode) {
        console.log("DEBUG: " + "node: empty: " + EmptyNode.Token.ParsedText);
    };

    CodeGenerator.prototype.VisitSuffixNode = function (SuffixNode) {
    };

    CodeGenerator.prototype.VisitUnaryNode = function (UnaryNode) {
    };

    CodeGenerator.prototype.VisitIndexerNode = function (IndexerNode) {
    };

    CodeGenerator.prototype.VisitMessageNode = function (MessageNode) {
    };

    CodeGenerator.prototype.VisitWhileNode = function (WhileNode) {
    };

    CodeGenerator.prototype.VisitDoWhileNode = function (DoWhileNode) {
    };

    CodeGenerator.prototype.VisitForNode = function (ForNode) {
    };

    CodeGenerator.prototype.VisitForEachNode = function (ForEachNode) {
    };

    CodeGenerator.prototype.VisitConstNode = function (Node) {
    };

    CodeGenerator.prototype.VisitNewNode = function (Node) {
    };

    CodeGenerator.prototype.VisitNullNode = function (Node) {
    };

    CodeGenerator.prototype.VisitLocalNode = function (Node) {
    };

    CodeGenerator.prototype.VisitGetterNode = function (Node) {
    };

    CodeGenerator.prototype.VisitApplyNode = function (Node) {
    };

    CodeGenerator.prototype.VisitBinaryNode = function (Node) {
    };

    CodeGenerator.prototype.VisitAndNode = function (Node) {
    };

    CodeGenerator.prototype.VisitOrNode = function (Node) {
    };

    CodeGenerator.prototype.VisitAssignNode = function (Node) {
    };

    CodeGenerator.prototype.VisitLetNode = function (Node) {
    };

    CodeGenerator.prototype.VisitIfNode = function (Node) {
    };

    CodeGenerator.prototype.VisitSwitchNode = function (Node) {
    };

    CodeGenerator.prototype.VisitReturnNode = function (Node) {
    };

    CodeGenerator.prototype.VisitLabelNode = function (Node) {
    };

    CodeGenerator.prototype.VisitJumpNode = function (Node) {
    };

    CodeGenerator.prototype.VisitBreakNode = function (Node) {
    };

    CodeGenerator.prototype.VisitContinueNode = function (Node) {
    };

    CodeGenerator.prototype.VisitTryNode = function (Node) {
    };

    CodeGenerator.prototype.VisitThrowNode = function (Node) {
    };

    CodeGenerator.prototype.VisitFunctionNode = function (Node) {
    };

    CodeGenerator.prototype.VisitErrorNode = function (Node) {
    };

    CodeGenerator.prototype.VisitCommandNode = function (Node) {
    };

    CodeGenerator.prototype.VisitBlock = function (Node) {
        var CurrentNode = Node;
        while (CurrentNode != null) {
            CurrentNode.Evaluate(this);
            CurrentNode = CurrentNode.NextNode;
        }
    };

    CodeGenerator.prototype.DefineFunction = function (Method, ParamNameList, Body) {
    };

    CodeGenerator.prototype.Eval = function (Node) {
        this.VisitBlock(Node);
        return null;
    };

    CodeGenerator.prototype.AddClass = function (Type) {
    };

    CodeGenerator.prototype.PushCode = function (Code) {
        this.GeneratedCodeStack.add(Code);
    };

    CodeGenerator.prototype.PopCode = function () {
        var Size = this.GeneratedCodeStack.size();
        if (Size > 0) {
            return this.GeneratedCodeStack.remove(Size - 1);
        }
        return "";
    };
    return CodeGenerator;
})();

var SourceGenerator = (function (_super) {
    __extends(SourceGenerator, _super);
    function SourceGenerator(LangName) {
        _super.call(this, LangName);
        this.IndentLevel = 0;
        this.CurrentLevelIndentString = null;
    }
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
})(CodeGenerator);
//@ sourceMappingURL=SourceGenerator.js.map
