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
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
/* language */
// GreenTea Generator should be written in each language.
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

    GtNode.prototype.AppendNodeList = function (NodeList) {
        var i = 0;
        while (i < ListSize(NodeList)) {
            this.Append(NodeList.get(i));
            i = i + 1;
        }
    };

    GtNode.prototype.Evaluate = function (Visitor) {
        /* must override */
    };

    GtNode.prototype.IsError = function () {
        return (this instanceof ErrorNode);
    };

    GtNode.prototype.ToConstValue = function () {
        return null;
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

var EmptyNode = (function (_super) {
    __extends(EmptyNode, _super);
    function EmptyNode(Type, Token) {
        _super.call(this, Type, Token);
    }
    return EmptyNode;
})(GtNode);

var ConstNode = (function (_super) {
    __extends(ConstNode, _super);
    function ConstNode(Type, Token, ConstValue) {
        _super.call(this, Type, Token);
        this.ConstValue = ConstValue;
    }
    ConstNode.prototype.Evaluate = function (Visitor) {
        Visitor.VisitConstNode(this);
    };
    ConstNode.prototype.ToConstValue = function () {
        return this.ConstValue;
    };
    return ConstNode;
})(GtNode);

var LocalNode = (function (_super) {
    __extends(LocalNode, _super);
    function LocalNode(Type, Token, NativeName) {
        _super.call(this, Type, Token);
        this.NativeName = NativeName;
    }
    LocalNode.prototype.Evaluate = function (Visitor) {
        Visitor.VisitLocalNode(this);
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
    return NullNode;
})(GtNode);

//E.g., (T) $Expr
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
    CastNode.prototype.ToConstValue = function () {
        var Value = this.Expr.ToConstValue();
        if (Value != null) {
            return LibGreenTea.EvalCast(this.CastType, Value);
        }
        return Value;
    };
    return CastNode;
})(GtNode);

// E.g., "~" $Expr
var UnaryNode = (function (_super) {
    __extends(UnaryNode, _super);
    function UnaryNode(Type, Token, Func, Expr) {
        _super.call(this, Type, Token);
        this.Func = Func;
        this.Expr = Expr;
    }
    UnaryNode.prototype.Evaluate = function (Visitor) {
        Visitor.VisitUnaryNode(this);
    };
    UnaryNode.prototype.ToConstValue = function () {
        var Value = this.Expr.ToConstValue();
        if (Value != null) {
            return LibGreenTea.EvalUnary(this.Type, this.Token.ParsedText, Value);
        }
        return Value;
    };
    return UnaryNode;
})(GtNode);

// E.g.,  $Expr "++"
var SuffixNode = (function (_super) {
    __extends(SuffixNode, _super);
    function SuffixNode(Type, Token, Func, Expr) {
        _super.call(this, Type, Token);
        this.Func = Func;
        this.Expr = Expr;
    }
    SuffixNode.prototype.Evaluate = function (Visitor) {
        Visitor.VisitSuffixNode(this);
    };
    SuffixNode.prototype.ToConstValue = function () {
        var Value = this.Expr.ToConstValue();
        if (Value != null) {
            return LibGreenTea.EvalSuffix(this.Type, Value, this.Token.ParsedText);
        }
        return Value;
    };
    return SuffixNode;
})(GtNode);

//E.g., "exists" $Expr
var ExistsNode = (function (_super) {
    __extends(ExistsNode, _super);
    function ExistsNode(Type, Token, Func, Expr) {
        _super.call(this, Type, Token);
        this.Func = Func;
        this.Expr = Expr;
    }
    ExistsNode.prototype.Evaluate = function (Visitor) {
        Visitor.VisitExistsNode(this);
    };
    return ExistsNode;
})(GtNode);

//E.g., $LeftNode = $RightNode
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
    return AssignNode;
})(GtNode);

//E.g., $LeftNode += $RightNode
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
    return SelfAssignNode;
})(GtNode);

//E.g., $LeftNode || $RightNode
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
    InstanceOfNode.prototype.ToConstValue = function () {
        var Value = this.ExprNode.ToConstValue();
        if (Value != null) {
            return LibGreenTea.EvalInstanceOf(Value, this.TypeInfo);
        }
        return Value;
    };
    return InstanceOfNode;
})(GtNode);

// E.g., $LeftNode "+" $RightNode
var BinaryNode = (function (_super) {
    __extends(BinaryNode, _super);
    function BinaryNode(Type, Token, Func, Left, Right) {
        _super.call(this, Type, Token);
        this.Func = Func;
        this.LeftNode = Left;
        this.RightNode = Right;
    }
    BinaryNode.prototype.Evaluate = function (Visitor) {
        Visitor.VisitBinaryNode(this);
    };
    BinaryNode.prototype.ToConstValue = function () {
        var LeftValue = this.LeftNode.ToConstValue();
        if (LeftValue != null) {
            var RightValue = this.RightNode.ToConstValue();
            if (RightValue != null) {
                return LibGreenTea.EvalBinary(this.Type, LeftValue, this.Token.ParsedText, RightValue);
            }
        }
        return null;
    };
    return BinaryNode;
})(GtNode);

//E.g., $LeftNode && $RightNode
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
    AndNode.prototype.ToConstValue = function () {
        var LeftValue = this.LeftNode.ToConstValue();

        return null;
    };
    return AndNode;
})(GtNode);

//E.g., $LeftNode || $RightNode
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
    OrNode.prototype.ToConstValue = function () {
        var LeftValue = this.LeftNode.ToConstValue();

        return null;
    };
    return OrNode;
})(GtNode);

//E.g., $CondExpr "?" $ThenExpr ":" $ElseExpr
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
    TrinaryNode.prototype.ToConstValue = function () {
        var CondValue = this.CondExpr.ToConstValue();

        return null;
    };
    return TrinaryNode;
})(GtNode);

//E.g., $Expr . Token.ParsedText
var GetterNode = (function (_super) {
    __extends(GetterNode, _super);
    function GetterNode(Type, Token, Func, Expr) {
        _super.call(this, Type, Token);
        this.Func = Func;
        this.Expr = Expr;
    }
    GetterNode.prototype.Evaluate = function (Visitor) {
        Visitor.VisitGetterNode(this);
    };

    GetterNode.prototype.ToConstValue = function () {
        var Value = this.Expr.ToConstValue();
        if (Value != null) {
            return LibGreenTea.EvalGetter(this.Type, Value, this.Token.ParsedText);
        }
        return Value;
    };
    return GetterNode;
})(GtNode);

//E.g., $Expr "[" $Indexer "]"
var IndexerNode = (function (_super) {
    __extends(IndexerNode, _super);
    function IndexerNode(Type, Token, Func, Expr, IndexAt) {
        _super.call(this, Type, Token);
        this.Func = Func;
        this.Expr = Expr;
        this.IndexAt = IndexAt;
    }
    IndexerNode.prototype.Evaluate = function (Visitor) {
        Visitor.VisitIndexerNode(this);
    };
    return IndexerNode;
})(GtNode);

//E.g., $Expr "[" $Index ":" $Index2 "]"
var SliceNode = (function (_super) {
    __extends(SliceNode, _super);
    function SliceNode(Type, Token, Func, Expr, Index1, Index2) {
        _super.call(this, Type, Token);
        this.Func = Func;
        this.Expr = Expr;
        this.Index1 = Index1;
        this.Index2 = Index2;
    }
    SliceNode.prototype.Evaluate = function (Visitor) {
        Visitor.VisitSliceNode(this);
    };
    return SliceNode;
})(GtNode);

var LetNode = (function (_super) {
    __extends(LetNode, _super);
    /* let VarNode in Block end */
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
    return LetNode;
})(GtNode);

// E.g., $Param[0] "(" $Param[1], $Param[2], ... ")"
var ApplyNode = (function (_super) {
    __extends(ApplyNode, _super);
    function ApplyNode(Type, KeyToken, Func) {
        _super.call(this, Type, KeyToken);
        this.Func = Func;
        this.Params = new Array();
    }
    ApplyNode.prototype.Append = function (Expr) {
        this.Params.add(Expr);
    };

    ApplyNode.prototype.Evaluate = function (Visitor) {
        Visitor.VisitApplyNode(this);
    };
    return ApplyNode;
})(GtNode);

//E.g., $Recv.Func "(" $Param[0], $Param[1], ... ")"
var MessageNode = (function (_super) {
    __extends(MessageNode, _super);
    function MessageNode(Type, KeyToken, Func, RecvNode) {
        _super.call(this, Type, KeyToken);
        this.Func = Func;
        this.RecvNode = RecvNode;
        this.Params = new Array();
    }
    MessageNode.prototype.Append = function (Expr) {
        this.Params.add(Expr);
    };

    MessageNode.prototype.Evaluate = function (Visitor) {
        Visitor.VisitMessageNode(this);
    };
    return MessageNode;
})(GtNode);

//E.g., "new" $Type "(" $Param[0], $Param[1], ... ")"
var NewNode = (function (_super) {
    __extends(NewNode, _super);
    function NewNode(Type, Token, Func) {
        _super.call(this, Type, Token);
        this.Params = new Array();
        this.Func = Func;
        this.Params.add(new ConstNode(Func.GetFuncType(), Token, Func));
    }
    NewNode.prototype.Append = function (Expr) {
        this.Params.add(Expr);
    };
    NewNode.prototype.Evaluate = function (Visitor) {
        Visitor.VisitNewNode(this);
    };
    return NewNode;
})(GtNode);

//E.g., "if" "(" $Cond ")" $ThenNode "else" $ElseNode
var IfNode = (function (_super) {
    __extends(IfNode, _super);
    /* If CondExpr then ThenBlock else ElseBlock */
    function IfNode(Type, Token, CondExpr, ThenBlock, ElseNode) {
        _super.call(this, Type, Token);
        this.CondExpr = CondExpr;
        this.ThenNode = ThenBlock;
        this.ElseNode = ElseNode;
    }
    IfNode.prototype.Evaluate = function (Visitor) {
        Visitor.VisitIfNode(this);
    };
    return IfNode;
})(GtNode);

//E.g., "while" "(" $CondExpr ")" $LoopBody
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
    return DoWhileNode;
})(GtNode);

//E.g., "for" "(" ";" $CondExpr ";" $IterExpr ")" $LoopNode
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
    return ForNode;
})(GtNode);

//E.g., "for" "(" $Variable ":" $IterExpr ")" $LoopNode
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
    return ThrowNode;
})(GtNode);

var TryNode = (function (_super) {
    __extends(TryNode, _super);
    function TryNode(Type, Token, TryBlock, CatchExpr, CatchBlock, FinallyBlock) {
        _super.call(this, Type, Token);
        this.TryBlock = TryBlock;
        this.CatchExpr = CatchExpr;
        this.CatchBlock = CatchBlock;
        this.FinallyBlock = FinallyBlock;
    }
    TryNode.prototype.Evaluate = function (Visitor) {
        Visitor.VisitTryNode(this);
    };
    return TryNode;
})(GtNode);

var SwitchNode = (function (_super) {
    __extends(SwitchNode, _super);
    function SwitchNode(Type, Token) {
        _super.call(this, Type, Token);
    }
    SwitchNode.prototype.Evaluate = function (Visitor) {
        Visitor.VisitSwitchNode(this);
    };
    SwitchNode.prototype.ToConstValue = function () {
        //FIXME
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
    return ErrorNode;
})(GtNode);

// E.g., "ls" "-a"..
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
    return CommandNode;
})(GtNode);

var GtType = (function () {
    function GtType(Context, ClassFlag, ClassName, DefaultNullValue, NativeSpec) {
        this.Context = Context;
        this.ClassFlag = ClassFlag;
        this.ShortClassName = ClassName;
        this.SuperType = null;
        this.BaseType = this;
        this.SearchSuperFuncClass = null;
        this.DefaultNullValue = DefaultNullValue;
        this.NativeSpec = NativeSpec;

        //		this.ClassSymbolTable = IsFlag(ClassFlag, EnumClass) ? (/*cast*/GtMap)NativeSpec : null;
        this.ClassId = Context.ClassCount;
        Context.ClassCount += 1;
        this.TypeParams = null;
    }
    GtType.prototype.CreateSubType = function (ClassFlag, ClassName, DefaultNullValue, NativeSpec) {
        var SubType = new GtType(this.Context, ClassFlag, ClassName, DefaultNullValue, NativeSpec);
        SubType.SuperType = this;
        SubType.SearchSuperFuncClass = this;
        return SubType;
    };

    // Note Don't call this directly. Use Context.GetGenericType instead.
    GtType.prototype.CreateGenericType = function (BaseIndex, TypeList, ShortName) {
        var GenericType = new GtType(this.Context, this.ClassFlag, ShortName, null, null);
        GenericType.BaseType = this.BaseType;
        GenericType.SearchSuperFuncClass = this.BaseType;
        GenericType.SuperType = this.SuperType;
        GenericType.TypeParams = LibGreenTea.CompactTypeList(BaseIndex, TypeList);
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
        return (this.TypeParams != null);
    };

    GtType.prototype.toString = function () {
        return this.ShortClassName;
    };

    GtType.prototype.GetUniqueName = function () {
        if (LibGreenTea.DebugMode) {
            return this.BaseType.ShortClassName + NativeNameSuffix + NumberToAscii(this.ClassId);
        } else {
            return NativeNameSuffix + NumberToAscii(this.ClassId);
        }
    };

    GtType.prototype.Accept = function (Type) {
        if (this == Type || this == this.Context.AnyType) {
            return true;
        }
        var SuperClass = this.SuperType;
        while (SuperClass != null) {
            if (SuperClass == Type) {
                return true;
            }
            SuperClass = SuperClass.SuperType;
        }
        return this.Context.CheckSubType(Type, this);
    };

    GtType.prototype.SetClassField = function (ClassField) {
        this.NativeSpec = ClassField;
    };
    return GtType;
})();

var GtFunc = (function () {
    function GtFunc(FuncFlag, FuncName, BaseIndex, ParamList) {
        this.FuncFlag = FuncFlag;
        this.FuncName = FuncName;

        //		this.FuncSymbolId = GtStatic.GetSymbolId(FuncName, CreateNewSymbolId);
        this.Types = LibGreenTea.CompactTypeList(BaseIndex, ParamList);
        LibGreenTea.Assert(this.Types.length > 0);
        this.ListedFuncs = null;
        this.FuncType = null;
        this.NativeRef = null;
        this.MangledName = MangleFuncName(this.GetRecvType(), this.FuncName, BaseIndex + 2, ParamList);
    }
    GtFunc.prototype.GetNativeFuncName = function () {
        if (this.Is(ExportFunc)) {
            return this.FuncName;
        } else {
            return this.MangledName;
        }
    };

    GtFunc.prototype.GetFuncType = function () {
        if (this.FuncType == null) {
            var Context = this.GetRecvType().Context;
            this.FuncType = Context.GetGenericType(Context.FuncType, 0, this.Types, true);
        }
        return this.FuncType;
    };

    GtFunc.prototype.toString = function () {
        var s = this.FuncName + "(";
        var i = 0;
        while (i < this.GetFuncParamSize()) {
            var ParamType = this.GetFuncParamType(i);
            if (i > 0) {
                s += ", ";
            }
            s += ParamType;
            i += 1;
        }
        return s + ") : " + this.GetReturnType();
    };

    GtFunc.prototype.Is = function (Flag) {
        return IsFlag(this.FuncFlag, Flag);
    };

    GtFunc.prototype.GetReturnType = function () {
        return this.Types[0];
    };

    GtFunc.prototype.GetRecvType = function () {
        if (this.Types.length == 1) {
            return this.Types[0].Context.VoidType;
        }
        return this.Types[1];
    };

    GtFunc.prototype.GetFuncParamSize = function () {
        return this.Types.length - 1;
    };

    GtFunc.prototype.GetFuncParamType = function (ParamIdx) {
        return this.Types[ParamIdx + 1];
    };

    GtFunc.prototype.GetMethodParamSize = function () {
        return this.Types.length - 2;
    };

    GtFunc.prototype.EqualsParamTypes = function (BaseIndex, ParamTypes) {
        if (this.Types.length == ParamTypes.length) {
            var i = BaseIndex;
            while (i < this.Types.length) {
                if (this.Types[i] != ParamTypes[i]) {
                    return false;
                }
                i = i + 1;
            }
            return true;
        }
        return false;
    };

    GtFunc.prototype.EqualsType = function (AFunc) {
        return this.EqualsParamTypes(0, this.Types);
    };

    GtFunc.prototype.IsAbstract = function () {
        return this.NativeRef == null;
    };

    GtFunc.prototype.SetNativeMacro = function (NativeMacro) {
        LibGreenTea.Assert(this.NativeRef == null);
        this.FuncFlag |= NativeMacroFunc;
        this.NativeRef = NativeMacro;
    };

    GtFunc.prototype.GetNativeMacro = function () {
        var NativeMacro = this.NativeRef;
        NativeMacro = NativeMacro.substring(1, NativeMacro.length - 1);

        // FIXME
        return NativeMacro;
    };

    GtFunc.prototype.ApplyNativeMacro = function (BaseIndex, ParamCode) {
        var NativeMacro = "$1 " + this.FuncName + " $2";
        if (IsFlag(this.FuncFlag, NativeMacroFunc)) {
            NativeMacro = this.GetNativeMacro();
        }
        var Code = NativeMacro.replace("$1", ParamCode[BaseIndex]);
        if (ParamCode.length == BaseIndex + 1) {
            Code = Code.replace("$2", "");
        } else {
            Code = Code.replace("$2", ParamCode[BaseIndex + 1]);
        }
        return Code;
    };

    GtFunc.prototype.SetNativeMethod = function (OptionalFuncFlag, Method) {
        LibGreenTea.Assert(this.NativeRef == null);
        this.FuncFlag |= NativeFunc | OptionalFuncFlag;
        this.NativeRef = Method;
    };
    return GtFunc;
})();

var GtPolyFunc = (function () {
    function GtPolyFunc(NameSpace, Func1) {
        this.NameSpace = NameSpace;
        this.FuncList = new Array();
        this.FuncList.add(Func1);
    }
    GtPolyFunc.prototype.toString = function () {
        var s = "";
        var i = 0;
        while (i < this.FuncList.size()) {
            if (i > 0) {
                s = s + " ";
            }
            s = s + this.FuncList.get(i);
            i = i + 1;
        }
        return s;
    };

    GtPolyFunc.prototype.Dup = function (NameSpace) {
        if (this.NameSpace != NameSpace) {
            var PolyFunc = new GtPolyFunc(NameSpace, this.FuncList.get(0));
            var i = 1;
            while (i < this.FuncList.size()) {
                PolyFunc.FuncList.add(this.FuncList.get(i));
                i = i + 1;
            }
            return PolyFunc;
        }
        return this;
    };

    GtPolyFunc.prototype.Append = function (Func) {
        var i = 0;
        while (i < this.FuncList.size()) {
            var ListedFunc = this.FuncList.get(i);
            if (ListedFunc == Func) {
                return null;
            }
            if (Func.EqualsType(ListedFunc)) {
                this.FuncList.add(Func);
                return ListedFunc;
            }
            i = i + 1;
        }
        this.FuncList.add(Func);
        return null;
    };

    GtPolyFunc.prototype.ResolveUnaryFunc = function (Gamma, ParsedTree, ExprNode) {
        var i = this.FuncList.size() - 1;
        while (i >= 0) {
            var Func = this.FuncList.get(i);
            if (Func.GetFuncParamSize() == 1 && Func.Types[1].Accept(ExprNode.Type)) {
                return Func;
            }
            i = i - 1;
        }
        return null;
    };

    GtPolyFunc.prototype.ResolveBinaryFunc = function (Gamma, BinaryNodes) {
        var i = this.FuncList.size() - 1;
        while (i >= 0) {
            var Func = this.FuncList.get(i);
            if (Func.GetFuncParamSize() == 2 && Func.Types[1].Accept(BinaryNodes[0].Type) && Func.Types[2].Accept(BinaryNodes[1].Type)) {
                return Func;
            }
            i = i - 1;
        }
        i = this.FuncList.size() - 1;
        while (i >= 0) {
            var Func = this.FuncList.get(i);
            if (Func.GetFuncParamSize() == 2 && Func.Types[1].Accept(BinaryNodes[0].Type)) {
                var TypeCoercion = Gamma.NameSpace.GetCoercionFunc(BinaryNodes[1].Type, Func.Types[2], true);
                if (TypeCoercion != null) {
                    BinaryNodes[1] = Gamma.CreateCoercionNode(Func.Types[2], TypeCoercion, BinaryNodes[1]);
                    return Func;
                }
            }
            i = i - 1;
        }
        return null;
    };

    GtPolyFunc.prototype.IncrementalMatch = function (FuncParamSize, NodeList) {
        var i = this.FuncList.size() - 1;
        var ResolvedFunc = null;
        while (i >= 0) {
            var Func = this.FuncList.get(i);
            if (Func.GetFuncParamSize() == FuncParamSize) {
                var p = 0;
                while (p < NodeList.size()) {
                    var Node = NodeList.get(p);
                    if (!Func.Types[p + 1].Accept(Node.Type)) {
                        Func = null;
                        break;
                    }
                    p = p + 1;
                }
                if (Func != null) {
                    if (ResolvedFunc != null) {
                        return null;
                    }
                    ResolvedFunc = Func;
                }
            }
            i = i - 1;
        }
        return ResolvedFunc;
    };

    GtPolyFunc.prototype.MatchAcceptableFunc = function (Gamma, FuncParamSize, NodeList) {
        var i = this.FuncList.size() - 1;
        while (i >= 0) {
            var Func = this.FuncList.get(i);
            if (Func.GetFuncParamSize() == FuncParamSize) {
                var p = 0;
                var Coercions = null;
                while (p < NodeList.size()) {
                    var ParamType = Func.Types[p + 1];
                    var Node = NodeList.get(p);
                    if (ParamType.Accept(Node.Type)) {
                        p = p + 1;
                        continue;
                    }
                    var TypeCoercion = Gamma.NameSpace.GetCoercionFunc(Node.Type, ParamType, true);
                    if (TypeCoercion != null) {
                        if (Coercions == null) {
                            Coercions = new Array(NodeList.size());
                        }
                        Coercions[p] = Gamma.CreateCoercionNode(ParamType, TypeCoercion, Node);
                        p = p + 1;
                        continue;
                    }
                    Func = null;
                    Coercions = null;
                    break;
                }
                if (Func != null) {
                    if (Coercions != null) {
                        i = 1;
                        while (i < Coercions.length) {
                            if (Coercions[i] != null) {
                                NodeList.set(i, Coercions[i]);
                            }
                            i = i + 1;
                        }
                        Coercions = null;
                    }
                    return Func;
                }
            }
            i = i - 1;
        }
        return null;
    };

    GtPolyFunc.prototype.ResolveFunc = function (Gamma, ParsedTree, TreeIndex, NodeList) {
        var FuncParamSize = ListSize(ParsedTree.TreeList) - TreeIndex + NodeList.size();
        var ResolvedFunc = this.IncrementalMatch(FuncParamSize, NodeList);
        while (ResolvedFunc == null && TreeIndex < ListSize(ParsedTree.TreeList)) {
            var Node = ParsedTree.TypeCheckNodeAt(TreeIndex, Gamma, Gamma.VarType, DefaultTypeCheckPolicy);
            NodeList.add(Node);
            if (Node.IsError()) {
                return null;
            }
            TreeIndex = TreeIndex + 1;
            ResolvedFunc = this.IncrementalMatch(FuncParamSize, NodeList);
        }
        if (ResolvedFunc == null) {
            return this.MatchAcceptableFunc(Gamma, FuncParamSize, NodeList);
        }
        while (TreeIndex < ListSize(ParsedTree.TreeList)) {
            var ContextType = ResolvedFunc.Types[NodeList.size()];
            var Node = ParsedTree.TypeCheckNodeAt(TreeIndex, Gamma, ContextType, DefaultTypeCheckPolicy);
            NodeList.add(Node);
            if (Node.IsError()) {
                return null;
            }
            TreeIndex = TreeIndex + 1;
        }
        return ResolvedFunc;
    };
    return GtPolyFunc;
})();

var GtGenerator = (function () {
    function GtGenerator(TargetCode, OutputFile, GeneratorFlag) {
        this.TargetCode = TargetCode;
        this.OutputFile = OutputFile;
        this.GeneratorFlag = GeneratorFlag;
        this.Context = null;
        this.GeneratedCodeStack = null;
    }
    GtGenerator.prototype.InitContext = function (Context) {
        this.Context = Context;
        this.GeneratedCodeStack = new Array();
        Context.LoadFile(LibGreenTea.GetLibPath(this.TargetCode, "common"));
    };

    GtGenerator.prototype.UnsupportedNode = function (Type, ParsedTree) {
        var Token = ParsedTree.KeyToken;
        Type.Context.ReportError(ErrorLevel, Token, this.TargetCode + " has no language support for " + Token.ParsedText);
        return new ErrorNode(Type.Context.VoidType, ParsedTree.KeyToken);
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

    GtGenerator.prototype.CreateGetterNode = function (Type, ParsedTree, Func, Expr) {
        return new GetterNode(Type, ParsedTree.KeyToken, Func, Expr);
    };

    GtGenerator.prototype.CreateIndexerNode = function (Type, ParsedTree, Func, Expr, Index) {
        return new IndexerNode(Type, ParsedTree.KeyToken, Func, Expr, Index);
    };

    GtGenerator.prototype.CreateApplyNode = function (Type, ParsedTree, Func) {
        return new ApplyNode(Type, ParsedTree == null ? GtTokenContext.NullToken : ParsedTree.KeyToken, Func);
    };

    GtGenerator.prototype.CreateMessageNode = function (Type, ParsedTree, RecvNode, Func) {
        return new MessageNode(Type, ParsedTree.KeyToken, Func, RecvNode);
    };

    GtGenerator.prototype.CreateNewNode = function (Type, ParsedTree, Func) {
        return new NewNode(Type, ParsedTree.KeyToken, Func);
    };

    GtGenerator.prototype.CreateUnaryNode = function (Type, ParsedTree, Func, Expr) {
        return new UnaryNode(Type, ParsedTree.KeyToken, Func, Expr);
    };

    GtGenerator.prototype.CreateSuffixNode = function (Type, ParsedTree, Func, Expr) {
        return new SuffixNode(Type, ParsedTree.KeyToken, Func, Expr);
    };

    GtGenerator.prototype.CreateBinaryNode = function (Type, ParsedTree, Func, Left, Right) {
        return new BinaryNode(Type, ParsedTree.KeyToken, Func, Left, Right);
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

    GtGenerator.prototype.CreateBreakNode = function (Type, ParsedTree, Label) {
        return new BreakNode(Type, ParsedTree.KeyToken, Label);
    };

    GtGenerator.prototype.CreateContinueNode = function (Type, ParsedTree, Label) {
        return new ContinueNode(Type, ParsedTree.KeyToken, Label);
    };

    GtGenerator.prototype.CreateTryNode = function (Type, ParsedTree, TryBlock, CatchExpr, CatchNode, FinallyBlock) {
        return new TryNode(Type, ParsedTree.KeyToken, TryBlock, CatchExpr, CatchNode, FinallyBlock);
    };

    GtGenerator.prototype.CreateThrowNode = function (Type, ParsedTree, Node) {
        return new ThrowNode(Type, ParsedTree.KeyToken, Node);
    };

    GtGenerator.prototype.CreateFunctionNode = function (Type, ParsedTree, Block) {
        return null;
    };

    GtGenerator.prototype.CreateEmptyNode = function (Type) {
        return new EmptyNode(Type, GtTokenContext.NullToken);
    };

    GtGenerator.prototype.CreateErrorNode = function (Type, ParsedTree) {
        return new ErrorNode(ParsedTree.NameSpace.Context.VoidType, ParsedTree.KeyToken);
    };

    GtGenerator.prototype.CreateCommandNode = function (Type, ParsedTree, PipedNextNode) {
        return new CommandNode(Type, ParsedTree.KeyToken, PipedNextNode);
    };

    /* language constructor */
    GtGenerator.prototype.GetNativeType = function (Value) {
        var NativeType = null;
        NativeType = LibGreenTea.GetNativeType(this.Context, Value);
        if (NativeType == null) {
            NativeType = this.Context.AnyType;
        }
        return NativeType;
    };

    GtGenerator.prototype.TransformNativeFuncs = function (NativeBaseType, FuncName) {
        var TransformedResult = false;

        return TransformedResult;
    };

    GtGenerator.prototype.GenerateClassField = function (Type, ClassField) {
        /*extension*/
    };

    GtGenerator.prototype.HasAnnotation = function (Annotation, Key) {
        if (Annotation != null) {
            var Value = Annotation.get(Key);
            if (Value instanceof Boolean) {
                Annotation.put(Key, false);
            }
            return (Value != null);
        }
        return false;
    };

    GtGenerator.prototype.ParseClassFlag = function (ClassFlag, Annotation) {
        return ClassFlag;
    };

    GtGenerator.prototype.ParseFuncFlag = function (FuncFlag, Annotation) {
        if (Annotation != null) {
            if (this.HasAnnotation(Annotation, "Export")) {
                FuncFlag = FuncFlag | ExportFunc;
            }
            if (this.HasAnnotation(Annotation, "Public")) {
                FuncFlag = FuncFlag | PublicFunc;
            }
        }
        return FuncFlag;
    };

    GtGenerator.prototype.ParseVarFlag = function (VarFlag, Annotation) {
        if (Annotation != null) {
            if (this.HasAnnotation(Annotation, "ReadOnly")) {
                VarFlag = VarFlag | ReadOnlyVar;
            }
        }
        return VarFlag;
    };

    GtGenerator.prototype.CreateFunc = function (FuncFlag, FuncName, BaseIndex, TypeList) {
        return new GtFunc(FuncFlag, FuncName, BaseIndex, TypeList);
    };

    GtGenerator.prototype.GenerateFunc = function (Func, ParamNameList, Body) {
        /*extenstion*/
    };

    GtGenerator.prototype.SyncCodeGeneration = function () {
        /*extension*/
    };

    GtGenerator.prototype.StopVisitor = function (Node) {
        Node.NextNode = null;
    };

    //------------------------------------------------------------------------
    GtGenerator.prototype.VisitEmptyNode = function (EmptyNode) {
        console.log("DEBUG: " + "empty node: " + EmptyNode.Token.ParsedText);
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

    // This must be extended in each language
    GtGenerator.prototype.IsStrictMode = function () {
        return false;
    };

    GtGenerator.prototype.Eval = function (Node) {
        this.VisitBlock(Node);
        return null;
    };

    GtGenerator.prototype.FlushBuffer = function () {
        /*extension*/
    };

    GtGenerator.prototype.BlockComment = function (Comment) {
        return "/*" + Comment + "*/";
    };

    GtGenerator.prototype.StartCompilationUnit = function () {
        /*extension*/
    };

    GtGenerator.prototype.FinishCompilationUnit = function () {
        /*extension*/
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

    GtGenerator.prototype.GetRecvName = function () {
        return "this";
    };

    GtGenerator.prototype.InvokeMainFunc = function (MainFuncName) {
        /*extension*/
    };
    return GtGenerator;
})();

var SourceGenerator = (function (_super) {
    __extends(SourceGenerator, _super);
    function SourceGenerator(TargetCode, OutputFile, GeneratorFlag) {
        _super.call(this, TargetCode, OutputFile, GeneratorFlag);
        this.HasLabelSupport = false;
        this.LogicalOrOperator = "||";
        this.LogicalAndOperator = "&&";
        this.MemberAccessOperator = ".";
        this.TrueLiteral = "true";
        this.FalseLiteral = "false";
        this.NullLiteral = "null";
        this.LineFeed = "\n";
        this.IndentLevel = 0;
        this.Tab = "   ";
        this.CurrentLevelIndentString = null;
        this.HeaderSource = "";
        this.BodySource = "";
    }
    SourceGenerator.prototype.InitContext = function (Context) {
        _super.prototype.InitContext.call(this, Context);
        this.HeaderSource = "";
        this.BodySource = "";
    };

    SourceGenerator.prototype.WriteHeader = function (Text) {
        this.HeaderSource += Text;
    };

    SourceGenerator.prototype.WriteLineHeader = function (Text) {
        this.HeaderSource += Text + this.LineFeed;
    };

    SourceGenerator.prototype.WriteCode = function (Text) {
        this.BodySource += Text;
    };

    SourceGenerator.prototype.WriteLineCode = function (Text) {
        this.BodySource += Text + this.LineFeed;
    };

    SourceGenerator.prototype.FlushBuffer = function () {
        LibGreenTea.WriteCode(this.OutputFile, this.HeaderSource + this.BodySource);
        this.HeaderSource = "";
        this.BodySource = "";
    };

    /* GeneratorUtils */
    SourceGenerator.prototype.Indent = function () {
        this.IndentLevel += 1;
        this.CurrentLevelIndentString = null;
    };

    SourceGenerator.prototype.UnIndent = function () {
        this.IndentLevel -= 1;
        this.CurrentLevelIndentString = null;
        LibGreenTea.Assert(this.IndentLevel >= 0);
    };

    SourceGenerator.prototype.GetIndentString = function () {
        if (this.CurrentLevelIndentString == null) {
            this.CurrentLevelIndentString = JoinStrings(this.Tab, this.IndentLevel);
        }
        return this.CurrentLevelIndentString;
    };

    SourceGenerator.prototype.StringifyConstValue = function (ConstValue) {
        if (ConstValue == null) {
            return this.NullLiteral;
        }
        if (ConstValue instanceof Boolean) {
            if (ConstValue.equals(true)) {
                return this.TrueLiteral;
            } else {
                return this.FalseLiteral;
            }
        }
        if ((typeof ConstValue == 'string' || ConstValue instanceof String)) {
            var i = 0;
            var Value = ConstValue.toString();
            var List = Value.split("\n");
            Value = "";
            while (i < List.length) {
                Value += List[i];
                if (i > 0) {
                    Value += "\n";
                }
                i = i + 1;
            }
            return Value;
        }
        return ConstValue.toString();
    };

    SourceGenerator.prototype.GetNewOperator = function (Type) {
        return "new " + Type.ShortClassName + "()";
    };

    SourceGenerator.prototype.PushSourceCode = function (Code) {
        this.PushCode(Code);
    };

    SourceGenerator.prototype.PopSourceCode = function () {
        return this.PopCode();
    };

    SourceGenerator.prototype.VisitNode = function (Node) {
        Node.Evaluate(this);
        return this.PopSourceCode();
    };

    SourceGenerator.prototype.JoinCode = function (BeginCode, BeginIdx, ParamCode, EndCode, Delim) {
        var JoinedCode = BeginCode;
        var i = BeginIdx;
        while (i < ParamCode.length) {
            var P = ParamCode[i];
            if (i != BeginIdx) {
                JoinedCode += Delim;
            }
            JoinedCode += P;
            i = i + 1;
        }
        return JoinedCode + EndCode;
    };

    SourceGenerator.GenerateApplyFunc1 = function (Func, FuncName, IsSuffixOp, Arg1) {
        var Macro = null;
        if (Func != null) {
            FuncName = Func.GetNativeFuncName();
            if (IsFlag(Func.FuncFlag, NativeMacroFunc)) {
                Macro = Func.GetNativeMacro();
            }
        }
        if (Macro == null) {
            if (IsSuffixOp) {
                Macro = FuncName + " $1";
            } else {
                Macro = "$1 " + FuncName;
            }
        }
        return Macro.replace("$1", Arg1);
    };

    SourceGenerator.GenerateApplyFunc2 = function (Func, FuncName, Arg1, Arg2) {
        var Macro = null;
        if (Func != null) {
            FuncName = Func.GetNativeFuncName();
            if (IsFlag(Func.FuncFlag, NativeMacroFunc)) {
                Macro = Func.GetNativeMacro();
            }
        }
        if (Macro == null) {
            Macro = "$1 " + FuncName + " $2";
        }
        return Macro.replace("$1", Arg1).replace("$2", Arg2);
    };

    SourceGenerator.prototype.GenerateFuncTemplate = function (ParamSize, Func) {
        var BeginIdx = 1;
        var i = BeginIdx;
        var Template = "";
        var IsNative = false;
        if (Func == null) {
            Template = "$1";
            BeginIdx = 2;
        } else if (Func.Is(NativeFunc)) {
            Template = "$1" + this.MemberAccessOperator + Func.FuncName;
            BeginIdx = 2;
        } else if (Func.Is(NativeMacroFunc)) {
            Template = Func.GetNativeMacro();
            IsNative = true;
        } else {
            Template = Func.GetNativeFuncName();
        }
        if (IsNative == false) {
            Template += "(";
            while (i < ParamSize) {
                if (i != BeginIdx) {
                    Template += ", ";
                }
                Template += "$" + i;
                i = i + 1;
            }
            Template += ")";
        }
        return Template;
    };

    SourceGenerator.prototype.ApplyMacro = function (Template, NodeList) {
        var ParamSize = ListSize(NodeList);
        var ParamIndex = ParamSize - 1;
        while (ParamIndex >= 1) {
            var Param = this.VisitNode(NodeList.get(ParamIndex));
            Template = Template.replace("$" + ParamIndex, Param);
            ParamIndex = ParamIndex - 1;
        }
        return Template;
    };

    SourceGenerator.prototype.GenerateApplyFunc = function (Node) {
        var ParamSize = ListSize(Node.Params);
        var Template = this.GenerateFuncTemplate(ParamSize, Node.Func);
        return this.ApplyMacro(Template, Node.Params);
    };

    // Visitor API
    SourceGenerator.prototype.VisitEmptyNode = function (Node) {
        this.PushSourceCode("");
    };

    SourceGenerator.prototype.VisitConstNode = function (Node) {
        this.PushSourceCode(this.StringifyConstValue(Node.ConstValue));
    };

    SourceGenerator.prototype.VisitNullNode = function (Node) {
        this.PushSourceCode(this.NullLiteral);
    };

    SourceGenerator.prototype.VisitLocalNode = function (Node) {
        this.PushSourceCode(Node.NativeName);
    };

    SourceGenerator.prototype.VisitReturnNode = function (Node) {
        var Code = "return";
        if (Node.Expr != null) {
            Code += " " + this.VisitNode(Node.Expr);
        }
        this.PushSourceCode(Code);
        this.StopVisitor(Node);
    };

    SourceGenerator.prototype.VisitIndexerNode = function (Node) {
        this.PushSourceCode(this.VisitNode(Node.Expr) + "[" + this.VisitNode(Node.IndexAt) + "]");
    };

    SourceGenerator.prototype.VisitNewNode = function (Node) {
        var ParamSize = ListSize(Node.Params);
        var NewOperator = this.GetNewOperator(Node.Type);
        var Template = this.GenerateFuncTemplate(ParamSize, Node.Func);
        Template = Template.replace("$1", NewOperator);
        this.PushSourceCode(this.ApplyMacro(Template, Node.Params));
    };

    SourceGenerator.prototype.VisitApplyNode = function (Node) {
        var Program = this.GenerateApplyFunc(Node);
        this.PushSourceCode(Program);
    };

    SourceGenerator.prototype.VisitSuffixNode = function (Node) {
        var FuncName = Node.Token.ParsedText;
        var Expr = this.VisitNode(Node.Expr);
        if (LibGreenTea.EqualsString(FuncName, "++")) {
        } else if (LibGreenTea.EqualsString(FuncName, "--")) {
        } else {
            console.log("DEBUG: " + FuncName + " is not supported suffix operator!!");
        }
        this.PushSourceCode("(" + SourceGenerator.GenerateApplyFunc1(Node.Func, FuncName, true, Expr) + ")");
    };

    SourceGenerator.prototype.VisitUnaryNode = function (Node) {
        var FuncName = Node.Token.ParsedText;
        var Expr = this.VisitNode(Node.Expr);
        this.PushSourceCode("(" + SourceGenerator.GenerateApplyFunc1(Node.Func, FuncName, false, Expr) + ")");
    };

    SourceGenerator.prototype.VisitBinaryNode = function (Node) {
        var FuncName = Node.Token.ParsedText;
        var Left = this.VisitNode(Node.LeftNode);
        var Right = this.VisitNode(Node.RightNode);
        this.PushSourceCode("(" + SourceGenerator.GenerateApplyFunc2(Node.Func, FuncName, Left, Right) + ")");
    };

    SourceGenerator.prototype.VisitGetterNode = function (Node) {
        this.PushSourceCode(this.VisitNode(Node.Expr) + this.MemberAccessOperator + Node.Func.FuncName);
    };
    SourceGenerator.prototype.VisitAssignNode = function (Node) {
        this.PushSourceCode(this.VisitNode(Node.LeftNode) + " = " + this.VisitNode(Node.RightNode));
    };

    SourceGenerator.prototype.VisitAndNode = function (Node) {
        var Left = this.VisitNode(Node.LeftNode);
        var Right = this.VisitNode(Node.RightNode);
        this.PushSourceCode("(" + Left + " " + this.LogicalAndOperator + " " + Right + ")");
    };

    SourceGenerator.prototype.VisitOrNode = function (Node) {
        var Left = this.VisitNode(Node.LeftNode);
        var Right = this.VisitNode(Node.RightNode);
        this.PushSourceCode("(" + Left + " " + this.LogicalOrOperator + " " + Right + ")");
    };

    SourceGenerator.prototype.VisitBreakNode = function (Node) {
        var Code = "break";
        if (this.HasLabelSupport) {
            var Label = Node.Label;
            if (Label != null) {
                Code += " " + Label;
            }
        }
        this.PushSourceCode(Code);
        this.StopVisitor(Node);
    };

    SourceGenerator.prototype.VisitContinueNode = function (Node) {
        var Code = "continue";
        if (this.HasLabelSupport) {
            var Label = Node.Label;
            if (Label != null) {
                Code += " " + Label;
            }
        }
        this.PushSourceCode(Code);
        this.StopVisitor(Node);
    };

    SourceGenerator.prototype.VisitLabelNode = function (Node) {
        //		/*local*/String Label = Node.Label;
        //		this.PushSourceCode(Label + ":");
    };

    SourceGenerator.prototype.VisitJumpNode = function (Node) {
        //		/*local*/String Label = Node.Label;
        //		this.PushSourceCode("goto " + Label);
        //		this.StopVisitor(Node);
    };
    return SourceGenerator;
})(GtGenerator);
