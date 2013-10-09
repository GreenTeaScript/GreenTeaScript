var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var GreenTeaTopObject = (function () {
    function GreenTeaTopObject(GreenType) {
        this.GreenType = GreenType;
    }
    GreenTeaTopObject.prototype.GetGreenType = function () {
        return this.GreenType;
    };

    GreenTeaTopObject.prototype.toString = function () {
        var s = "{";

        return s + "}";
    };
    return GreenTeaTopObject;
})();

var GreenTeaAnyObject = (function (_super) {
    __extends(GreenTeaAnyObject, _super);
    function GreenTeaAnyObject(GreenType, NativeValue) {
        _super.call(this, GreenType);
        this.NativeValue = NativeValue;
    }
    return GreenTeaAnyObject;
})(GreenTeaTopObject);

var GreenTeaArray = (function (_super) {
    __extends(GreenTeaArray, _super);
    function GreenTeaArray(GreenType) {
        _super.call(this, GreenType);
        this.ArrayBody = new Array();
    }
    GreenTeaArray.prototype.SubArray = function (bindex, eindex) {
        var ArrayObject = new GreenTeaArray(this.GreenType);
        for (var i = bindex; i < eindex; i++) {
            var Value = this.ArrayBody.get(i);
            ArrayObject.ArrayBody.add(Value);
        }
        return ArrayObject;
    };
    GreenTeaArray.prototype.toString = function () {
        var s = "[";
        for (var i = 0; i < this.ArrayBody.size(); i++) {
            var Value = this.ArrayBody.get(i);
            if (i > 0) {
                s += ", ";
            }
            s += LibGreenTea.Stringify(Value);
        }
        return s + "]";
    };
    GreenTeaArray.NewArray1 = function (Type, InitSize) {
        var ArrayType = Type.Context.GetGenericType1(Type.Context.ArrayType, Type, true);
        var ArrayObject = new GreenTeaArray(ArrayType);
        for (var i = 0; i < InitSize; i++) {
            ArrayObject.ArrayBody.add(Type.DefaultNullValue);
        }
        return ArrayObject;
    };

    GreenTeaArray.NewArray2 = function (Type, InitSize, InitSize2) {
        var ArrayType = Type.Context.GetGenericType1(Type.Context.ArrayType, Type, true);
        ArrayType = Type.Context.GetGenericType1(Type.Context.ArrayType, ArrayType, true);
        var ArrayObject = new GreenTeaArray(ArrayType);
        for (var i = 0; i < InitSize2; i++) {
            ArrayObject.ArrayBody.add(GreenTeaArray.NewArray1(Type, InitSize));
        }
        return ArrayObject;
    };
    GreenTeaArray.NewArray3 = function (Type, InitSize, InitSize2, InitSize3) {
        var ArrayType = Type.Context.GetGenericType1(Type.Context.ArrayType, Type, true);
        ArrayType = Type.Context.GetGenericType1(Type.Context.ArrayType, ArrayType, true);
        ArrayType = Type.Context.GetGenericType1(Type.Context.ArrayType, ArrayType, true);
        var ArrayObject = new GreenTeaArray(ArrayType);
        for (var i = 0; i < InitSize2; i++) {
            ArrayObject.ArrayBody.add(GreenTeaArray.NewArray2(Type, InitSize, InitSize2));
        }
        return ArrayObject;
    };
    GreenTeaArray.NewArrayLiteral = function (ArrayType, Values) {
        var ArrayObject = new GreenTeaArray(ArrayType);
        for (var i = 0; i < Values.length; i++) {
            ArrayObject.ArrayBody.add(Values[i]);
        }
        return ArrayObject;
    };
    return GreenTeaArray;
})(GreenTeaTopObject);

var GreenTeaEnum = (function (_super) {
    __extends(GreenTeaEnum, _super);
    function GreenTeaEnum(GreenType, EnumValue, EnumSymbol) {
        _super.call(this, GreenType);
        this.EnumValue = EnumValue;
        this.EnumSymbol = EnumSymbol;
    }
    GreenTeaEnum.prototype.toString = function () {
        return "" + this.EnumValue;
    };
    return GreenTeaEnum;
})(GreenTeaTopObject);

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

    GtNode.prototype.HasReturnNode = function () {
        var LastNode = this.MoveTailNode();
        return (LastNode instanceof GtReturnNode || LastNode instanceof GtThrowNode);
    };

    GtNode.prototype.SetChild = function (Node) {
        if (Node != null) {
            Node.ParentNode = this;
        }
    };
    GtNode.prototype.SetChild2 = function (Node, Node2) {
        this.SetChild(Node);
        this.SetChild(Node2);
    };
    GtNode.prototype.SetChild3 = function (Node, Node2, Node3) {
        this.SetChild(Node);
        this.SetChild(Node2);
        this.SetChild(Node3);
    };

    GtNode.prototype.GetList = function () {
        return null;
    };
    GtNode.prototype.GetAt = function (Index) {
        return this.GetList().get(Index);
    };
    GtNode.prototype.Append = function (Node) {
        this.GetList().add(Node);
        this.SetChild(Node);
    };
    GtNode.prototype.AppendNodeList = function (StartIndex, NodeList) {
        var i = StartIndex;
        var List = this.GetList();
        while (i < LibGreenTea.ListSize(NodeList)) {
            var Node = NodeList.get(i);
            List.add(Node);
            this.SetChild(Node);
            i = i + 1;
        }
    };

    GtNode.prototype.Evaluate = function (Visitor) {
    };
    GtNode.prototype.IsErrorNode = function () {
        return (this instanceof GtErrorNode);
    };

    GtNode.prototype.IsNullNode = function () {
        return (this instanceof GtNullNode);
    };

    GtNode.prototype.ToNullValue = function (EnforceConst) {
        if (EnforceConst) {
            this.Type.Context.ReportError(ErrorLevel, this.Token, "value must be constant in this context");
        }
        return null;
    };
    GtNode.prototype.ToConstValue = function (EnforceConst) {
        return this.ToNullValue(EnforceConst);
    };
    return GtNode;
})();

var GtBasicNode = (function (_super) {
    __extends(GtBasicNode, _super);
    function GtBasicNode(Type, Token) {
        _super.call(this, Type, Token);
    }
    return GtBasicNode;
})(GtNode);

var GtEmptyNode = (function (_super) {
    __extends(GtEmptyNode, _super);
    function GtEmptyNode(Type, Token) {
        _super.call(this, Type, Token);
    }
    GtEmptyNode.prototype.ToConstValue = function (EnforceConst) {
        return null;
    };
    return GtEmptyNode;
})(GtNode);

var GtNullNode = (function (_super) {
    __extends(GtNullNode, _super);
    function GtNullNode(Type, Token) {
        _super.call(this, Type, Token);
    }
    GtNullNode.prototype.Evaluate = function (Visitor) {
        Visitor.VisitNullNode(this);
    };
    GtNullNode.prototype.ToConstValue = function (EnforceConst) {
        return null;
    };
    return GtNullNode;
})(GtNode);

var GtNewNode = (function (_super) {
    __extends(GtNewNode, _super);
    function GtNewNode(Type, Token) {
        _super.call(this, Type, Token);
    }
    GtNewNode.prototype.Evaluate = function (Visitor) {
        Visitor.VisitNewNode(this);
    };
    GtNewNode.prototype.ToConstValue = function (EnforceConst) {
        return this.Type.Context.Generator.EvalNewNode(this, EnforceConst);
    };
    return GtNewNode;
})(GtNode);
var GtConstNode = (function (_super) {
    __extends(GtConstNode, _super);
    function GtConstNode(Type, Token, ConstValue) {
        _super.call(this, Type, Token);
        this.ConstValue = ConstValue;
    }
    GtConstNode.prototype.Evaluate = function (Visitor) {
        Visitor.VisitConstNode(this);
    };
    GtConstNode.prototype.ToConstValue = function (EnforceConst) {
        return this.ConstValue;
    };
    return GtConstNode;
})(GtNode);

var GtArrayNode = (function (_super) {
    __extends(GtArrayNode, _super);
    function GtArrayNode(Type, Token) {
        _super.call(this, Type, Token);
        this.NodeList = new Array();
    }
    GtArrayNode.prototype.GetList = function () {
        return this.NodeList;
    };
    GtArrayNode.prototype.Evaluate = function (Visitor) {
        Visitor.VisitArrayNode(this);
    };
    GtArrayNode.prototype.ToConstValue = function (EnforceConst) {
        if (EnforceConst) {
            return this.Type.Context.Generator.EvalArrayNode(this, EnforceConst);
        }
        return null;
    };
    return GtArrayNode;
})(GtNode);

var GtNewArrayNode = (function (_super) {
    __extends(GtNewArrayNode, _super);
    function GtNewArrayNode(Type, Token) {
        _super.call(this, Type, Token);
        this.NodeList = new Array();
    }
    GtNewArrayNode.prototype.GetList = function () {
        return this.NodeList;
    };
    GtNewArrayNode.prototype.Evaluate = function (Visitor) {
        Visitor.VisitNewArrayNode(this);
    };
    GtNewArrayNode.prototype.ToConstValue = function (EnforceConst) {
        if (EnforceConst) {
            return this.Type.Context.Generator.EvalNewArrayNode(this, EnforceConst);
        }
        return null;
    };
    return GtNewArrayNode;
})(GtNode);
var GtLocalNode = (function (_super) {
    __extends(GtLocalNode, _super);
    function GtLocalNode(Type, Token, NativeName) {
        _super.call(this, Type, Token);
        this.NativeName = NativeName;
    }
    GtLocalNode.prototype.Evaluate = function (Visitor) {
        Visitor.VisitLocalNode(this);
    };
    return GtLocalNode;
})(GtNode);

var GtAssignNode = (function (_super) {
    __extends(GtAssignNode, _super);
    function GtAssignNode(Type, Token, Left, Right) {
        _super.call(this, Type, Token);
        this.LeftNode = Left;
        this.RightNode = Right;
        this.SetChild2(Left, Right);
    }
    GtAssignNode.prototype.Evaluate = function (Visitor) {
        Visitor.VisitAssignNode(this);
    };
    return GtAssignNode;
})(GtNode);

var GtInstanceOfNode = (function (_super) {
    __extends(GtInstanceOfNode, _super);
    function GtInstanceOfNode(Type, Token, ExprNode, TypeInfo) {
        _super.call(this, Type, Token);
        this.ExprNode = ExprNode;
        this.TypeInfo = TypeInfo;
        this.SetChild(ExprNode);
    }
    GtInstanceOfNode.prototype.Evaluate = function (Visitor) {
        Visitor.VisitInstanceOfNode(this);
    };
    GtInstanceOfNode.prototype.ToConstValue = function (EnforceConst) {
        var Value = this.ExprNode.ToConstValue(EnforceConst);
        if (Value != null) {
            return LibGreenTea.DynamicInstanceOf(Value, this.TypeInfo);
        }
        return Value;
    };
    return GtInstanceOfNode;
})(GtNode);

var GtAndNode = (function (_super) {
    __extends(GtAndNode, _super);
    function GtAndNode(Type, Token, Left, Right) {
        _super.call(this, Type, Token);
        this.LeftNode = Left;
        this.RightNode = Right;
        this.SetChild2(Left, Right);
    }
    GtAndNode.prototype.Evaluate = function (Visitor) {
        Visitor.VisitAndNode(this);
    };
    GtAndNode.prototype.ToConstValue = function (EnforceConst) {
        var LeftValue = this.LeftNode.ToConstValue(EnforceConst);
        if (LeftValue instanceof Boolean && LibGreenTea.booleanValue(LeftValue)) {
            return this.RightNode.ToConstValue(EnforceConst);
        }
        return null;
    };
    return GtAndNode;
})(GtNode);

var GtOrNode = (function (_super) {
    __extends(GtOrNode, _super);
    function GtOrNode(Type, Token, Left, Right) {
        _super.call(this, Type, Token);
        this.LeftNode = Left;
        this.RightNode = Right;
        this.SetChild2(Left, Right);
    }
    GtOrNode.prototype.Evaluate = function (Visitor) {
        Visitor.VisitOrNode(this);
    };
    GtOrNode.prototype.ToConstValue = function (EnforceConst) {
        var LeftValue = this.LeftNode.ToConstValue(EnforceConst);
        if (LeftValue instanceof Boolean) {
            if (LibGreenTea.booleanValue(LeftValue)) {
                return LeftValue;
            } else {
                return this.RightNode.ToConstValue(EnforceConst);
            }
        }
        return null;
    };
    return GtOrNode;
})(GtNode);

var GtVarNode = (function (_super) {
    __extends(GtVarNode, _super);
    function GtVarNode(Type, Token, DeclType, VariableName, InitNode, Block) {
        _super.call(this, Type, Token);
        this.NativeName = VariableName;
        this.DeclType = DeclType;
        this.InitNode = InitNode;
        this.BlockNode = Block;
        this.SetChild2(InitNode, this.BlockNode);
    }
    GtVarNode.prototype.Evaluate = function (Visitor) {
        Visitor.VisitVarNode(this);
    };
    return GtVarNode;
})(GtNode);

var GtCastNode = (function (_super) {
    __extends(GtCastNode, _super);
    function GtCastNode(Type, Token, CastType, Expr) {
        _super.call(this, Type, Token);
        this.CastType = CastType;
        this.Expr = Expr;
        this.SetChild(Expr);
    }
    GtCastNode.prototype.Evaluate = function (Visitor) {
        Visitor.VisitCastNode(this);
    };
    GtCastNode.prototype.ToConstValue = function (EnforceConst) {
        var Value = this.Expr.ToConstValue(EnforceConst);
        if (Value != null) {
            return LibGreenTea.DynamicCast(this.CastType, Value);
        }
        return Value;
    };
    return GtCastNode;
})(GtNode);

var GtUnaryNode = (function (_super) {
    __extends(GtUnaryNode, _super);
    function GtUnaryNode(Type, Token, Func, Expr) {
        _super.call(this, Type, Token);
        this.Func = Func;
        this.Expr = Expr;
        this.SetChild(Expr);
    }
    GtUnaryNode.prototype.Evaluate = function (Visitor) {
        Visitor.VisitUnaryNode(this);
    };
    GtUnaryNode.prototype.ToConstValue = function (EnforceConst) {
        var Value = this.Expr.ToConstValue(EnforceConst);
        if (Value != null) {
            return LibGreenTea.EvalUnary(this.Type, this.Token.ParsedText, Value);
        }
        return Value;
    };
    return GtUnaryNode;
})(GtNode);

var GtSuffixNode = (function (_super) {
    __extends(GtSuffixNode, _super);
    function GtSuffixNode(Type, Token, Func, Expr) {
        _super.call(this, Type, Token);
        this.Func = Func;
        this.Expr = Expr;
        this.SetChild(Expr);
    }
    GtSuffixNode.prototype.Evaluate = function (Visitor) {
        Visitor.VisitSuffixNode(this);
    };
    GtSuffixNode.prototype.ToConstValue = function (EnforceConst) {
        var Value = this.Expr.ToConstValue(EnforceConst);
        if (Value != null) {
            return LibGreenTea.EvalSuffix(this.Type, Value, this.Token.ParsedText);
        }
        return Value;
    };
    return GtSuffixNode;
})(GtNode);

var GtExistsNode = (function (_super) {
    __extends(GtExistsNode, _super);
    function GtExistsNode(Type, Token, Func, Expr) {
        _super.call(this, Type, Token);
        this.Func = Func;
        this.Expr = Expr;
        this.SetChild(Expr);
    }
    GtExistsNode.prototype.Evaluate = function (Visitor) {
        Visitor.VisitExistsNode(this);
    };
    return GtExistsNode;
})(GtNode);

var GtSelfAssignNode = (function (_super) {
    __extends(GtSelfAssignNode, _super);
    function GtSelfAssignNode(Type, Token, Func, Left, Right) {
        _super.call(this, Type, Token);
        this.Func = Func;
        this.LeftNode = Left;
        this.RightNode = Right;
        this.SetChild2(Left, Right);
    }
    GtSelfAssignNode.prototype.Evaluate = function (Visitor) {
        Visitor.VisitSelfAssignNode(this);
    };
    return GtSelfAssignNode;
})(GtNode);

var GtBinaryNode = (function (_super) {
    __extends(GtBinaryNode, _super);
    function GtBinaryNode(Type, Token, Func, Left, Right) {
        _super.call(this, Type, Token);
        this.Func = Func;
        this.LeftNode = Left;
        this.RightNode = Right;
        this.SetChild2(Left, Right);
    }
    GtBinaryNode.prototype.Evaluate = function (Visitor) {
        Visitor.VisitBinaryNode(this);
    };
    GtBinaryNode.prototype.ToConstValue = function (EnforceConst) {
        var LeftValue = this.LeftNode.ToConstValue(EnforceConst);
        if (LeftValue != null) {
            var RightValue = this.RightNode.ToConstValue(EnforceConst);
            if (RightValue != null) {
                return LibGreenTea.EvalBinary(this.Type, LeftValue, this.Token.ParsedText, RightValue);
            }
        }
        return null;
    };
    return GtBinaryNode;
})(GtNode);

var GtTrinaryNode = (function (_super) {
    __extends(GtTrinaryNode, _super);
    function GtTrinaryNode(Type, Token, CondExpr, ThenExpr, ElseExpr) {
        _super.call(this, Type, Token);
        this.ConditionNode = CondExpr;
        this.ThenNode = ThenExpr;
        this.ElseNode = ElseExpr;
        this.SetChild(CondExpr);
        this.SetChild2(ThenExpr, ElseExpr);
    }
    GtTrinaryNode.prototype.Evaluate = function (Visitor) {
        Visitor.VisitTrinaryNode(this);
    };
    GtTrinaryNode.prototype.ToConstValue = function (EnforceConst) {
        var CondValue = this.ConditionNode.ToConstValue(EnforceConst);
        if (CondValue instanceof Boolean) {
            if (LibGreenTea.booleanValue(CondValue)) {
                return this.ThenNode.ToConstValue(EnforceConst);
            } else {
                return this.ElseNode.ToConstValue(EnforceConst);
            }
        }
        return null;
    };
    return GtTrinaryNode;
})(GtNode);

var GtGetterNode = (function (_super) {
    __extends(GtGetterNode, _super);
    function GtGetterNode(Type, Token, Func, Expr) {
        _super.call(this, Type, Token);
        this.Func = Func;
        this.ExprNode = Expr;
        this.SetChild(Expr);
    }
    GtGetterNode.prototype.Evaluate = function (Visitor) {
        Visitor.VisitGetterNode(this);
    };

    GtGetterNode.prototype.ToConstValue = function (EnforceConst) {
        return this.Type.Context.Generator.EvalGetterNode(this, EnforceConst);
    };
    return GtGetterNode;
})(GtNode);

var GtSetterNode = (function (_super) {
    __extends(GtSetterNode, _super);
    function GtSetterNode(Type, Token, Func, LeftNode, RightNode) {
        _super.call(this, Type, Token);
        this.Func = Func;
        this.LeftNode = LeftNode;
        this.RightNode = RightNode;
        this.SetChild2(LeftNode, RightNode);
    }
    GtSetterNode.prototype.Evaluate = function (Visitor) {
        Visitor.VisitSetterNode(this);
    };
    GtSetterNode.prototype.ToConstValue = function (EnforceConst) {
        return this.Type.Context.Generator.EvalSetterNode(this, EnforceConst);
    };
    return GtSetterNode;
})(GtNode);

var GtDyGetterNode = (function (_super) {
    __extends(GtDyGetterNode, _super);
    function GtDyGetterNode(Type, Token, Expr, NameSpace, FieldName) {
        _super.call(this, Type, Token);
        this.ExprNode = Expr;
        this.NameSpace = NameSpace;
        this.FieldName = FieldName;
        this.SetChild(Expr);
    }
    GtDyGetterNode.prototype.Evaluate = function (Visitor) {
        Visitor.VisitDyGetterNode(this);
    };

    GtDyGetterNode.prototype.ToConstValue = function (EnforceConst) {
        return this.Type.Context.Generator.EvalDyGetterNode(this, EnforceConst);
    };
    return GtDyGetterNode;
})(GtNode);

var GtDySetterNode = (function (_super) {
    __extends(GtDySetterNode, _super);
    function GtDySetterNode(Type, Token, Func, LeftNode, NameSpace, FieldName, RightNode) {
        _super.call(this, Type, Token);
        this.LeftNode = LeftNode;
        this.NameSpace = NameSpace;
        this.FieldName = FieldName;
        this.RightNode = RightNode;
        this.SetChild2(LeftNode, RightNode);
    }
    GtDySetterNode.prototype.Evaluate = function (Visitor) {
        Visitor.VisitDySetterNode(this);
    };
    GtDySetterNode.prototype.ToConstValue = function (EnforceConst) {
        return this.Type.Context.Generator.EvalDySetterNode(this, EnforceConst);
    };
    return GtDySetterNode;
})(GtNode);

var GtIndexerNode = (function (_super) {
    __extends(GtIndexerNode, _super);
    function GtIndexerNode(Type, Token, Func, Expr) {
        _super.call(this, Type, Token);
        this.Func = Func;
        this.Expr = Expr;
        this.NodeList = new Array();
        this.SetChild(Expr);
    }
    GtIndexerNode.prototype.GetList = function () {
        return this.NodeList;
    };
    GtIndexerNode.prototype.Evaluate = function (Visitor) {
        Visitor.VisitIndexerNode(this);
    };
    GtIndexerNode.prototype.ToBasicNode = function () {
        var Node = new GtApplyNode(this.Type, this.Token, this.Func);
        Node.Append(new GtConstNode(this.Func.GetFuncType(), this.Token, this.Func));
        Node.Append(this.Expr);
        Node.AppendNodeList(0, this.NodeList);
        return Node;
    };
    GtIndexerNode.prototype.ToConstValue = function (EnforceConst) {
        var Node = this.ToBasicNode();
        return Node.ToConstValue(EnforceConst);
    };
    return GtIndexerNode;
})(GtNode);

var GtSliceNode = (function (_super) {
    __extends(GtSliceNode, _super);
    function GtSliceNode(Type, Token, Func, Expr, Index1, Index2) {
        _super.call(this, Type, Token);
        this.Func = Func;
        this.Expr = Expr;
        this.Index1 = Index1;
        this.Index2 = Index2;
        this.SetChild(Expr);
        this.SetChild2(Index1, Index2);
    }
    GtSliceNode.prototype.Evaluate = function (Visitor) {
        Visitor.VisitSliceNode(this);
    };
    return GtSliceNode;
})(GtNode);

var GtApplyNode = (function (_super) {
    __extends(GtApplyNode, _super);
    function GtApplyNode(Type, KeyToken, Func) {
        _super.call(this, Type, KeyToken);
        this.Func = Func;
        this.NodeList = new Array();
    }
    GtApplyNode.prototype.GetList = function () {
        return this.NodeList;
    };
    GtApplyNode.prototype.Evaluate = function (Visitor) {
        Visitor.VisitApplyNode(this);
    };
    GtApplyNode.prototype.ToConstValue = function (EnforceConst) {
        return this.Type.Context.Generator.EvalApplyNode(this, EnforceConst);
    };
    return GtApplyNode;
})(GtNode);

var GtStaticApplyNode = (function (_super) {
    __extends(GtStaticApplyNode, _super);
    function GtStaticApplyNode(Type, KeyToken, Func) {
        _super.call(this, Type, KeyToken);
        this.Func = Func;
        this.ParamList = new Array();
    }
    GtStaticApplyNode.prototype.GetList = function () {
        return this.ParamList;
    };
    GtStaticApplyNode.prototype.Evaluate = function (Visitor) {
        Visitor.VisitStaticApplyNode(this);
    };
    GtStaticApplyNode.prototype.ToConstValue = function (EnforceConst) {
        return this.Type.Context.Generator.EvalStaticApplyNode(this, EnforceConst);
    };
    return GtStaticApplyNode;
})(GtNode);

var GtApplyStaticMethodNode = (function (_super) {
    __extends(GtApplyStaticMethodNode, _super);
    function GtApplyStaticMethodNode(Type, KeyToken, RecvNode, Func) {
        _super.call(this, Type, KeyToken);
        this.Func = Func;
        this.ParamList = new Array();
    }
    GtApplyStaticMethodNode.prototype.GetList = function () {
        return this.ParamList;
    };
    GtApplyStaticMethodNode.prototype.Evaluate = function (Visitor) {
        Visitor.VisitApplyStaticMethodNode(this);
    };
    GtApplyStaticMethodNode.prototype.ToConstValue = function (EnforceConst) {
        return this.Type.Context.Generator.EvalApplyStaticMethodNode(this, EnforceConst);
    };
    return GtApplyStaticMethodNode;
})(GtNode);

var GtApplyOverridedMethodNode = (function (_super) {
    __extends(GtApplyOverridedMethodNode, _super);
    function GtApplyOverridedMethodNode(Type, KeyToken, RecvNode, NameSpace, Func) {
        _super.call(this, Type, KeyToken);
        this.NameSpace = NameSpace;
        this.Func = Func;
        this.ParamList = new Array();
    }
    GtApplyOverridedMethodNode.prototype.GetList = function () {
        return this.ParamList;
    };
    GtApplyOverridedMethodNode.prototype.Evaluate = function (Visitor) {
        Visitor.VisitApplyOverridedMethodNode(this);
    };
    GtApplyOverridedMethodNode.prototype.ToConstValue = function (EnforceConst) {
        return this.Type.Context.Generator.EvalApplyOverridedMethodNode(this, EnforceConst);
    };
    return GtApplyOverridedMethodNode;
})(GtNode);

var GtApplyFuncNode = (function (_super) {
    __extends(GtApplyFuncNode, _super);
    function GtApplyFuncNode(Type, KeyToken, FuncNode) {
        _super.call(this, Type, KeyToken);
        this.FuncNode = FuncNode;
        this.ParamList = new Array();
    }
    GtApplyFuncNode.prototype.GetList = function () {
        return this.ParamList;
    };
    GtApplyFuncNode.prototype.Evaluate = function (Visitor) {
        Visitor.VisitApplyFuncNode(this);
    };
    GtApplyFuncNode.prototype.ToConstValue = function (EnforceConst) {
        return this.Type.Context.Generator.EvalApplyFuncNode(this, EnforceConst);
    };
    return GtApplyFuncNode;
})(GtNode);

var GtApplyDynamicFuncNode = (function (_super) {
    __extends(GtApplyDynamicFuncNode, _super);
    function GtApplyDynamicFuncNode(Type, KeyToken, NameSpace, FuncName) {
        _super.call(this, Type, KeyToken);
        this.NameSpace = NameSpace;
        this.FuncName = FuncName;
        this.ParamList = new Array();
    }
    GtApplyDynamicFuncNode.prototype.GetList = function () {
        return this.ParamList;
    };
    GtApplyDynamicFuncNode.prototype.Evaluate = function (Visitor) {
        Visitor.VisitApplyDynamicFuncNode(this);
    };
    GtApplyDynamicFuncNode.prototype.ToConstValue = function (EnforceConst) {
        return this.Type.Context.Generator.EvalApplyDynamicFuncNode(this, EnforceConst);
    };
    return GtApplyDynamicFuncNode;
})(GtNode);

var GtApplyDynamicMethodNode = (function (_super) {
    __extends(GtApplyDynamicMethodNode, _super);
    function GtApplyDynamicMethodNode(Type, KeyToken, RecvNode, NameSpace, FuncName) {
        _super.call(this, Type, KeyToken);
        this.NameSpace = NameSpace;
        this.FuncName = FuncName;
        this.ParamList = new Array();
    }
    GtApplyDynamicMethodNode.prototype.GetList = function () {
        return this.ParamList;
    };
    GtApplyDynamicMethodNode.prototype.Evaluate = function (Visitor) {
        Visitor.VisitApplyDynamicMethodNode(this);
    };
    GtApplyDynamicMethodNode.prototype.ToConstValue = function (EnforceConst) {
        return this.Type.Context.Generator.EvalApplyDynamicMethodNode(this, EnforceConst);
    };
    return GtApplyDynamicMethodNode;
})(GtNode);

var GtConstructorNode = (function (_super) {
    __extends(GtConstructorNode, _super);
    function GtConstructorNode(Type, Token, Func) {
        _super.call(this, Type, Token);
        this.ParamList = new Array();
        this.Func = Func;
    }
    GtConstructorNode.prototype.GetList = function () {
        return this.ParamList;
    };
    GtConstructorNode.prototype.Evaluate = function (Visitor) {
        Visitor.VisitConstructorNode(this);
    };
    GtConstructorNode.prototype.ToConstValue = function (EnforceConst) {
        if (EnforceConst) {
            return this.Type.Context.Generator.EvalConstructorNode(this, EnforceConst);
        }
        return null;
    };
    return GtConstructorNode;
})(GtNode);

var GtIfNode = (function (_super) {
    __extends(GtIfNode, _super);
    function GtIfNode(Type, Token, CondExpr, ThenBlock, ElseNode) {
        _super.call(this, Type, Token);
        this.CondExpr = CondExpr;
        this.ThenNode = ThenBlock;
        this.ElseNode = ElseNode;
        this.SetChild(CondExpr);
        this.SetChild2(ThenBlock, ElseNode);
    }
    GtIfNode.prototype.Evaluate = function (Visitor) {
        Visitor.VisitIfNode(this);
    };
    return GtIfNode;
})(GtNode);

var GtWhileNode = (function (_super) {
    __extends(GtWhileNode, _super);
    function GtWhileNode(Type, Token, CondExpr, LoopBody) {
        _super.call(this, Type, Token);
        this.CondExpr = CondExpr;
        this.LoopBody = LoopBody;
        this.SetChild2(CondExpr, LoopBody);
    }
    GtWhileNode.prototype.Evaluate = function (Visitor) {
        Visitor.VisitWhileNode(this);
    };
    return GtWhileNode;
})(GtNode);
var GtDoWhileNode = (function (_super) {
    __extends(GtDoWhileNode, _super);
    function GtDoWhileNode(Type, Token, CondExpr, LoopBody) {
        _super.call(this, Type, Token);
        this.CondExpr = CondExpr;
        this.LoopBody = LoopBody;
        this.SetChild2(CondExpr, LoopBody);
    }
    GtDoWhileNode.prototype.Evaluate = function (Visitor) {
        Visitor.VisitDoWhileNode(this);
    };
    return GtDoWhileNode;
})(GtNode);

var GtForNode = (function (_super) {
    __extends(GtForNode, _super);
    function GtForNode(Type, Token, CondExpr, IterExpr, LoopBody) {
        _super.call(this, Type, Token);
        this.CondExpr = CondExpr;
        this.LoopBody = LoopBody;
        this.IterExpr = IterExpr;
        this.SetChild2(CondExpr, LoopBody);
        this.SetChild(IterExpr);
    }
    GtForNode.prototype.Evaluate = function (Visitor) {
        Visitor.VisitForNode(this);
    };
    return GtForNode;
})(GtNode);

var GtForEachNode = (function (_super) {
    __extends(GtForEachNode, _super);
    function GtForEachNode(Type, Token, Variable, IterExpr, LoopBody) {
        _super.call(this, Type, Token);
        this.Variable = Variable;
        this.IterExpr = IterExpr;
        this.LoopBody = LoopBody;
        this.SetChild2(Variable, LoopBody);
        this.SetChild(IterExpr);
    }
    GtForEachNode.prototype.Evaluate = function (Visitor) {
        Visitor.VisitForEachNode(this);
    };
    return GtForEachNode;
})(GtNode);
var GtContinueNode = (function (_super) {
    __extends(GtContinueNode, _super);
    function GtContinueNode(Type, Token, Label) {
        _super.call(this, Type, Token);
        this.Label = Label;
    }
    GtContinueNode.prototype.Evaluate = function (Visitor) {
        Visitor.VisitContinueNode(this);
    };
    return GtContinueNode;
})(GtNode);
var GtBreakNode = (function (_super) {
    __extends(GtBreakNode, _super);
    function GtBreakNode(Type, Token, Label) {
        _super.call(this, Type, Token);
        this.Label = Label;
    }
    GtBreakNode.prototype.Evaluate = function (Visitor) {
        Visitor.VisitBreakNode(this);
    };
    return GtBreakNode;
})(GtNode);
var GtReturnNode = (function (_super) {
    __extends(GtReturnNode, _super);
    function GtReturnNode(Type, Token, Expr) {
        _super.call(this, Type, Token);
        this.Expr = Expr;
        this.SetChild(Expr);
    }
    GtReturnNode.prototype.Evaluate = function (Visitor) {
        Visitor.VisitReturnNode(this);
    };
    return GtReturnNode;
})(GtNode);
var GtThrowNode = (function (_super) {
    __extends(GtThrowNode, _super);
    function GtThrowNode(Type, Token, Expr) {
        _super.call(this, Type, Token);
        this.Expr = Expr;
    }
    GtThrowNode.prototype.Evaluate = function (Visitor) {
        Visitor.VisitThrowNode(this);
    };
    return GtThrowNode;
})(GtNode);
var GtTryNode = (function (_super) {
    __extends(GtTryNode, _super);
    function GtTryNode(Type, Token, TryBlock, CatchExpr, CatchBlock, FinallyBlock) {
        _super.call(this, Type, Token);
        this.TryBlock = TryBlock;
        this.CatchExpr = CatchExpr;
        this.CatchBlock = CatchBlock;
        this.FinallyBlock = FinallyBlock;
        this.SetChild2(TryBlock, FinallyBlock);
        this.SetChild2(CatchBlock, CatchExpr);
    }
    GtTryNode.prototype.Evaluate = function (Visitor) {
        Visitor.VisitTryNode(this);
    };
    return GtTryNode;
})(GtNode);
var GtSwitchNode = (function (_super) {
    __extends(GtSwitchNode, _super);
    function GtSwitchNode(Type, Token, MatchNode, DefaultBlock) {
        _super.call(this, Type, Token);
        this.MatchNode = MatchNode;
        this.DefaultBlock = DefaultBlock;
        this.CaseList = new Array();
        this.SetChild(DefaultBlock);
    }
    GtSwitchNode.prototype.Evaluate = function (Visitor) {
        Visitor.VisitSwitchNode(this);
    };
    GtSwitchNode.prototype.GetList = function () {
        return this.CaseList;
    };
    return GtSwitchNode;
})(GtNode);
var GtFunctionNode = (function (_super) {
    __extends(GtFunctionNode, _super);
    function GtFunctionNode(Type, Token) {
        _super.call(this, Type, Token);
    }
    GtFunctionNode.prototype.Evaluate = function (Visitor) {
        Visitor.VisitFunctionNode(this);
    };
    return GtFunctionNode;
})(GtNode);

var GtCommandNode = (function (_super) {
    __extends(GtCommandNode, _super);
    function GtCommandNode(Type, KeyToken, PipedNextNode) {
        _super.call(this, Type, KeyToken);
        this.PipedNextNode = PipedNextNode;
        this.ArgumentList = new Array();
    }
    GtCommandNode.prototype.GetList = function () {
        return this.ArgumentList;
    };

    GtCommandNode.prototype.Evaluate = function (Visitor) {
        Visitor.VisitCommandNode(this);
    };

    GtCommandNode.prototype.ToConstValue = function (EnforceConst) {
        return this.Type.Context.Generator.EvalCommandNode(this, EnforceConst);
    };
    return GtCommandNode;
})(GtNode);

var GtErrorNode = (function (_super) {
    __extends(GtErrorNode, _super);
    function GtErrorNode(Type, Token) {
        _super.call(this, Type, Token);
    }
    GtErrorNode.prototype.Evaluate = function (Visitor) {
        Visitor.VisitErrorNode(this);
    };
    GtErrorNode.prototype.ToConstValue = function (EnforceConst) {
        return null;
    };
    return GtErrorNode;
})(GtNode);

var GtFieldInfo = (function () {
    function GtFieldInfo(FieldFlag, Type, Name, FieldIndex, InitValue) {
        this.FieldFlag = FieldFlag;
        this.Type = Type;
        this.Name = Name;
        this.NativeName = Name;
        this.FieldIndex = FieldIndex;
        this.InitValue = InitValue;
        this.GetterFunc = null;
        this.SetterFunc = null;
    }
    return GtFieldInfo;
})();

var GtClassField = (function () {
    function GtClassField(DefinedType, NameSpace) {
        this.DefinedType = DefinedType;
        this.NameSpace = NameSpace;
        this.FieldList = new Array();
        var SuperClass = DefinedType.SuperType;
        if (SuperClass.TypeBody instanceof GtClassField) {
            var SuperField = SuperClass.TypeBody;
            var i = 0;
            while (i < SuperField.FieldList.size()) {
                this.FieldList.add(SuperField.FieldList.get(i));
                i += 1;
            }
        }
        this.ThisClassIndex = this.FieldList.size();
    }
    GtClassField.prototype.CreateField = function (FieldFlag, Type, Name, SourceToken, InitValue) {
        var i = 0;
        while (i < this.FieldList.size()) {
            var FieldInfo = this.FieldList.get(i);
            if (FieldInfo.Name.equals(Name)) {
                Type.Context.ReportError(WarningLevel, SourceToken, "duplicated field: " + Name);
                return null;
            }
            i = i + 1;
        }
        var FieldInfo = new GtFieldInfo(FieldFlag, Type, Name, this.FieldList.size(), InitValue);
        var ParamList = new Array();
        ParamList.add(FieldInfo.Type);
        ParamList.add(this.DefinedType);
        FieldInfo.GetterFunc = new GtFunc(GetterFunc, FieldInfo.Name, 0, ParamList);
        this.NameSpace.SetGetterFunc(this.DefinedType, FieldInfo.Name, FieldInfo.GetterFunc, SourceToken);
        ParamList.clear();
        ParamList.add(Type.Context.VoidType);
        ParamList.add(this.DefinedType);
        ParamList.add(FieldInfo.Type);
        FieldInfo.SetterFunc = new GtFunc(SetterFunc, FieldInfo.Name, 0, ParamList);
        this.NameSpace.SetSetterFunc(this.DefinedType, FieldInfo.Name, FieldInfo.SetterFunc, SourceToken);
        this.FieldList.add(FieldInfo);
        return FieldInfo;
    };
    return GtClassField;
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
        Context.RootNameSpace.LoadRequiredLib("common");
    };

    GtGenerator.prototype.CreateUnsupportedNode = function (Type, ParsedTree) {
        var Token = ParsedTree.KeyToken;
        Type.Context.ReportError(ErrorLevel, Token, this.TargetCode + " has no language support for " + Token.ParsedText);
        return new GtErrorNode(Type.Context.VoidType, ParsedTree.KeyToken);
    };

    GtGenerator.prototype.CreateConstNode = function (Type, ParsedTree, Value) {
        if (Type.IsVarType()) {
            Type = LibGreenTea.GetNativeType(Type.Context, Value);
        }
        return new GtConstNode(Type, ParsedTree != null ? ParsedTree.KeyToken : GtTokenContext.NullToken, Value);
    };

    GtGenerator.prototype.CreateNullNode = function (Type, ParsedTree) {
        return new GtNullNode(Type, ParsedTree.KeyToken);
    };
    GtGenerator.prototype.CreateArrayNode = function (ArrayType, ParsedTree) {
        return new GtArrayNode(ArrayType, ParsedTree.KeyToken);
    };
    GtGenerator.prototype.CreateNewArrayNode = function (ArrayType, ParsedTree) {
        return new GtNewArrayNode(ArrayType, ParsedTree.KeyToken);
    };
    GtGenerator.prototype.CreateLocalNode = function (Type, ParsedTree, LocalName) {
        return new GtLocalNode(Type, ParsedTree.KeyToken, LocalName);
    };
    GtGenerator.prototype.CreateGetterNode = function (Type, ParsedTree, Func, Expr) {
        return new GtGetterNode(Type, ParsedTree.KeyToken, Func, Expr);
    };
    GtGenerator.prototype.CreateSetterNode = function (Type, ParsedTree, Func, Left, Right) {
        return new GtSetterNode(Type, ParsedTree.KeyToken, Func, Left, Right);
    };
    GtGenerator.prototype.CreateIndexerNode = function (Type, ParsedTree, Func, Expr) {
        return new GtIndexerNode(Type, ParsedTree.KeyToken, Func, Expr);
    };
    GtGenerator.prototype.CreateApplyNode = function (Type, ParsedTree, Func) {
        return new GtApplyNode(Type, ParsedTree == null ? GtTokenContext.NullToken : ParsedTree.KeyToken, Func);
    };
    GtGenerator.prototype.CreateCoercionNode = function (Type, Func, Node) {
        var ApplyNode = this.CreateApplyNode(Type, null, Func);
        var TypeNode = this.CreateConstNode(Type.Context.TypeType, null, Type);
        ApplyNode.Append(TypeNode);
        ApplyNode.Append(TypeNode);
        ApplyNode.Append(Node);
        return ApplyNode;
    };
    GtGenerator.prototype.CreateNewNode = function (Type, ParsedTree) {
        return new GtNewNode(Type, ParsedTree.KeyToken);
    };
    GtGenerator.prototype.CreateConstructorNode = function (Type, ParsedTree, Func, NodeList) {
        var Node = new GtConstructorNode(Type, ParsedTree.KeyToken, Func);
        if (NodeList != null) {
            Node.AppendNodeList(0, NodeList);
        }
        return Node;
    };
    GtGenerator.prototype.CreateUnaryNode = function (Type, ParsedTree, Func, Expr) {
        return new GtUnaryNode(Type, ParsedTree.KeyToken, Func, Expr);
    };
    GtGenerator.prototype.CreateSuffixNode = function (Type, ParsedTree, Func, Expr) {
        return new GtSuffixNode(Type, ParsedTree.KeyToken, Func, Expr);
    };
    GtGenerator.prototype.CreateBinaryNode = function (Type, ParsedTree, Func, Left, Right) {
        return new GtBinaryNode(Type, ParsedTree.KeyToken, Func, Left, Right);
    };
    GtGenerator.prototype.CreateAndNode = function (Type, ParsedTree, Left, Right) {
        return new GtAndNode(Type, ParsedTree.KeyToken, Left, Right);
    };
    GtGenerator.prototype.CreateOrNode = function (Type, ParsedTree, Left, Right) {
        return new GtOrNode(Type, ParsedTree.KeyToken, Left, Right);
    };
    GtGenerator.prototype.CreateInstanceOfNode = function (Type, ParsedTree, LeftNode, GivenType) {
        return new GtInstanceOfNode(Type, ParsedTree.KeyToken, LeftNode, GivenType);
    };
    GtGenerator.prototype.CreateAssignNode = function (Type, ParsedTree, Left, Right) {
        return new GtAssignNode(Type, ParsedTree.KeyToken, Left, Right);
    };
    GtGenerator.prototype.CreateSelfAssignNode = function (Type, ParsedTree, Func, Left, Right) {
        return new GtSelfAssignNode(Type, ParsedTree.KeyToken, Func, Left, Right);
    };
    GtGenerator.prototype.CreateVarNode = function (Type, ParsedTree, DeclType, VariableName, InitNode, Block) {
        return new GtVarNode(Type, ParsedTree.KeyToken, DeclType, VariableName, InitNode, Block);
    };
    GtGenerator.prototype.CreateTrinaryNode = function (Type, ParsedTree, CondNode, ThenNode, ElseNode) {
        return new GtTrinaryNode(Type, ParsedTree.KeyToken, CondNode, ThenNode, ElseNode);
    };
    GtGenerator.prototype.CreateIfNode = function (Type, ParsedTree, Cond, Then, Else) {
        return new GtIfNode(Type, ParsedTree.KeyToken, Cond, Then, Else);
    };
    GtGenerator.prototype.CreateSwitchNode = function (Type, ParsedTree, Match, DefaultBlock) {
        return new GtSwitchNode(Type, ParsedTree.KeyToken, Match, DefaultBlock);
    };
    GtGenerator.prototype.CreateWhileNode = function (Type, ParsedTree, Cond, Block) {
        return new GtWhileNode(Type, ParsedTree.KeyToken, Cond, Block);
    };
    GtGenerator.prototype.CreateDoWhileNode = function (Type, ParsedTree, Cond, Block) {
        return new GtDoWhileNode(Type, ParsedTree.KeyToken, Cond, Block);
    };
    GtGenerator.prototype.CreateForNode = function (Type, ParsedTree, Cond, IterNode, Block) {
        return new GtForNode(Type, ParsedTree.KeyToken, Cond, IterNode, Block);
    };
    GtGenerator.prototype.CreateForEachNode = function (Type, ParsedTree, VarNode, IterNode, Block) {
        return new GtForEachNode(Type, ParsedTree.KeyToken, VarNode, IterNode, Block);
    };
    GtGenerator.prototype.CreateReturnNode = function (Type, ParsedTree, Node) {
        return new GtReturnNode(Type, ParsedTree.KeyToken, Node);
    };
    GtGenerator.prototype.CreateLabelNode = function (Type, ParsedTree, Node) {
        return null;
    };
    GtGenerator.prototype.CreateBreakNode = function (Type, ParsedTree, Label) {
        return new GtBreakNode(Type, ParsedTree.KeyToken, Label);
    };
    GtGenerator.prototype.CreateContinueNode = function (Type, ParsedTree, Label) {
        return new GtContinueNode(Type, ParsedTree.KeyToken, Label);
    };
    GtGenerator.prototype.CreateTryNode = function (Type, ParsedTree, TryBlock, CatchExpr, CatchNode, FinallyBlock) {
        return new GtTryNode(Type, ParsedTree.KeyToken, TryBlock, CatchExpr, CatchNode, FinallyBlock);
    };
    GtGenerator.prototype.CreateThrowNode = function (Type, ParsedTree, Node) {
        return new GtThrowNode(Type, ParsedTree.KeyToken, Node);
    };
    GtGenerator.prototype.CreateFunctionNode = function (Type, ParsedTree, Block) {
        return null;
    };
    GtGenerator.prototype.CreateEmptyNode = function (Type) {
        return new GtEmptyNode(Type, GtTokenContext.NullToken);
    };
    GtGenerator.prototype.CreateErrorNode = function (Type, ParsedTree) {
        return new GtErrorNode(ParsedTree.NameSpace.Context.VoidType, ParsedTree.KeyToken);
    };
    GtGenerator.prototype.CreateCommandNode = function (Type, ParsedTree, PipedNextNode) {
        return new GtCommandNode(Type, ParsedTree.KeyToken, PipedNextNode);
    };

    GtGenerator.prototype.GetNativeType = function (Value) {
        return LibGreenTea.GetNativeType(this.Context, Value);
    };

    GtGenerator.prototype.OpenClassField = function (DefinedType, ClassField) {
    };

    GtGenerator.prototype.CloseClassField = function (DefinedType, MemberList) {
    };

    GtGenerator.prototype.CreateFunc = function (FuncFlag, FuncName, BaseIndex, TypeList) {
        return new GtFunc(FuncFlag, FuncName, BaseIndex, TypeList);
    };

    GtGenerator.prototype.GenerateFunc = function (Func, ParamNameList, Body) {
    };

    GtGenerator.prototype.SyncCodeGeneration = function () {
    };

    GtGenerator.prototype.StopVisitor = function (Node) {
        Node.NextNode = null;
    };

    GtGenerator.prototype.IsEmptyBlock = function (Node) {
        return Node == null || (Node instanceof GtEmptyNode) && Node.NextNode == null;
    };

    GtGenerator.prototype.FindParentForNode = function (Node) {
        var Parent = Node.ParentNode;
        while (Parent != null) {
            if (Parent instanceof GtForNode) {
                return Parent;
            }
            if (Parent.ParentNode == null) {
                Parent = Parent.MoveHeadNode();
            }
            Parent = Parent.ParentNode;
        }
        return null;
    };

    GtGenerator.prototype.VisitEmptyNode = function (EmptyNode) {
        LibGreenTea.DebugP("empty node: " + EmptyNode.Token.ParsedText);
    };
    GtGenerator.prototype.VisitInstanceOfNode = function (Node) {
    };
    GtGenerator.prototype.VisitSelfAssignNode = function (Node) {
    };
    GtGenerator.prototype.VisitTrinaryNode = function (Node) {
    };
    GtGenerator.prototype.VisitExistsNode = function (Node) {
    };
    GtGenerator.prototype.VisitCastNode = function (Node) {
    };
    GtGenerator.prototype.VisitSliceNode = function (Node) {
    };
    GtGenerator.prototype.VisitSuffixNode = function (Node) {
    };
    GtGenerator.prototype.VisitUnaryNode = function (Node) {
    };
    GtGenerator.prototype.VisitIndexerNode = function (Node) {
    };
    GtGenerator.prototype.VisitArrayNode = function (Node) {
    };
    GtGenerator.prototype.VisitNewArrayNode = function (Node) {
    };
    GtGenerator.prototype.VisitWhileNode = function (Node) {
    };
    GtGenerator.prototype.VisitDoWhileNode = function (Node) {
    };
    GtGenerator.prototype.VisitForNode = function (Node) {
    };
    GtGenerator.prototype.VisitForEachNode = function (Node) {
    };
    GtGenerator.prototype.VisitConstNode = function (Node) {
    };
    GtGenerator.prototype.VisitNewNode = function (Node) {
    };
    GtGenerator.prototype.VisitConstructorNode = function (Node) {
    };
    GtGenerator.prototype.VisitNullNode = function (Node) {
    };
    GtGenerator.prototype.VisitLocalNode = function (Node) {
    };
    GtGenerator.prototype.VisitGetterNode = function (Node) {
    };
    GtGenerator.prototype.VisitSetterNode = function (Node) {
    };
    GtGenerator.prototype.VisitDyGetterNode = function (Node) {
    };
    GtGenerator.prototype.VisitDySetterNode = function (Node) {
    };
    GtGenerator.prototype.VisitApplyNode = function (Node) {
    };
    GtGenerator.prototype.VisitStaticApplyNode = function (Node) {
    };
    GtGenerator.prototype.VisitApplyStaticMethodNode = function (Node) {
    };
    GtGenerator.prototype.VisitApplyOverridedMethodNode = function (Node) {
    };
    GtGenerator.prototype.VisitApplyFuncNode = function (Node) {
    };
    GtGenerator.prototype.VisitApplyDynamicFuncNode = function (Node) {
    };
    GtGenerator.prototype.VisitApplyDynamicMethodNode = function (Node) {
    };
    GtGenerator.prototype.VisitBinaryNode = function (Node) {
    };
    GtGenerator.prototype.VisitAndNode = function (Node) {
    };
    GtGenerator.prototype.VisitOrNode = function (Node) {
    };
    GtGenerator.prototype.VisitAssignNode = function (Node) {
    };
    GtGenerator.prototype.VisitVarNode = function (Node) {
    };
    GtGenerator.prototype.VisitIfNode = function (Node) {
    };
    GtGenerator.prototype.VisitSwitchNode = function (Node) {
    };
    GtGenerator.prototype.VisitReturnNode = function (Node) {
    };
    GtGenerator.prototype.VisitBreakNode = function (Node) {
    };
    GtGenerator.prototype.VisitContinueNode = function (Node) {
    };
    GtGenerator.prototype.VisitTryNode = function (Node) {
    };
    GtGenerator.prototype.VisitThrowNode = function (Node) {
    };
    GtGenerator.prototype.VisitFunctionNode = function (Node) {
    };
    GtGenerator.prototype.VisitErrorNode = function (Node) {
    };
    GtGenerator.prototype.VisitCommandNode = function (Node) {
    };

    GtGenerator.prototype.VisitBlock = function (Node) {
        var CurrentNode = Node;
        while (CurrentNode != null) {
            CurrentNode.Evaluate(this);
            CurrentNode = CurrentNode.NextNode;
        }
    };

    GtGenerator.prototype.IsStrictMode = function () {
        return true;
    };

    GtGenerator.prototype.Eval = function (Node) {
        this.VisitBlock(Node);
        return null;
    };

    GtGenerator.prototype.EvalNewNode = function (Node, EnforceConst) {
        return Node.ToNullValue(EnforceConst);
    };

    GtGenerator.prototype.EvalConstructorNode = function (Node, EnforceConst) {
        return Node.ToNullValue(EnforceConst);
    };

    GtGenerator.prototype.EvalApplyNode = function (Node, EnforceConst) {
        return Node.ToNullValue(EnforceConst);
    };
    GtGenerator.prototype.EvalArrayNode = function (Node, EnforceConst) {
        var ArrayObject = null;

        return ArrayObject;
    };
    GtGenerator.prototype.EvalNewArrayNode = function (Node, EnforceConst) {
        var ArrayObject = null;

        return ArrayObject;
    };

    GtGenerator.prototype.EvalGetterNode = function (Node, EnforceConst) {
        return Node.ToNullValue(EnforceConst);
    };

    GtGenerator.prototype.EvalSetterNode = function (Node, EnforceConst) {
        return Node.ToNullValue(EnforceConst);
    };

    GtGenerator.prototype.EvalCommandNode = function (Node, EnforceConst) {
        return Node.ToNullValue(EnforceConst);
    };

    GtGenerator.prototype.FlushBuffer = function () {
    };

    GtGenerator.prototype.BlockComment = function (Comment) {
        return "#COMMENT53#";
    };

    GtGenerator.prototype.StartCompilationUnit = function () {
    };

    GtGenerator.prototype.FinishCompilationUnit = function () {
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
    };

    GtGenerator.prototype.MakeArguments = function (RecvObject, ParamList, EnforceConst) {
        var StartIdx = 0;
        var Size = LibGreenTea.ListSize(ParamList);
        var Values = new Array(RecvObject == null ? Size : Size + 1);
        if (RecvObject != null) {
            Values[0] = RecvObject;
            StartIdx = 1;
        }
        var i = 0;
        while (i < Size) {
            var Node = ParamList.get(i);
            if (Node.IsNullNode()) {
                Values[StartIdx + i] = null;
            } else {
                var Value = Node.ToConstValue(EnforceConst);
                if (Value == null) {
                    return null;
                }
                Values[StartIdx + i] = Value;
            }
            i += 1;
        }
        return Values;
    };

    GtGenerator.prototype.EvalStaticApplyNode = function (ApplyNode, EnforceConst) {
        if ((EnforceConst || ApplyNode.Func.Is(ConstFunc))) {
            var Arguments = this.MakeArguments(null, ApplyNode.ParamList, EnforceConst);
            if (Arguments != null) {
                return LibGreenTea.ApplyFunc(ApplyNode.Func, null, Arguments);
            }
        }
        return null;
    };

    GtGenerator.prototype.EvalApplyStaticMethodNode = function (ApplyNode, EnforceConst) {
        if ((EnforceConst || ApplyNode.Func.Is(ConstFunc))) {
            var RecvObject = ApplyNode.RecvNode.ToConstValue(EnforceConst);
            if (RecvObject != null) {
                var Arguments = this.MakeArguments(null, ApplyNode.ParamList, EnforceConst);
                if (Arguments != null) {
                    return LibGreenTea.ApplyFunc(ApplyNode.Func, RecvObject, Arguments);
                }
            }
        }
        return null;
    };

    GtGenerator.prototype.EvalApplyOverridedMethodNode = function (ApplyNode, EnforceConst) {
        if ((EnforceConst || ApplyNode.Func.Is(ConstFunc))) {
            var RecvObject = ApplyNode.RecvNode.ToConstValue(EnforceConst);
            if (RecvObject != null) {
                var Arguments = this.MakeArguments(RecvObject, ApplyNode.ParamList, EnforceConst);
                if (Arguments != null) {
                    return LibGreenTea.ApplyOverridedMethod(0, ApplyNode.NameSpace, ApplyNode.Func, Arguments);
                }
            }
        }
        return null;
    };

    GtGenerator.prototype.EvalApplyFuncNode = function (ApplyNode, EnforceConst) {
        var Func = ApplyNode.ToConstValue(EnforceConst);
        if (Func != null) {
            var Arguments = this.MakeArguments(null, ApplyNode.ParamList, EnforceConst);
            if (Arguments != null) {
                return Func.Apply(Arguments);
            }
        }
        return null;
    };

    GtGenerator.prototype.EvalApplyDynamicFuncNode = function (ApplyNode, EnforceConst) {
        var Arguments = this.MakeArguments(null, ApplyNode.ParamList, EnforceConst);
        if (Arguments != null) {
            return LibGreenTea.InvokeDynamicFunc(0, ApplyNode.Type, ApplyNode.NameSpace, ApplyNode.FuncName, Arguments);
        }
        return null;
    };

    GtGenerator.prototype.EvalApplyDynamicMethodNode = function (ApplyNode, EnforceConst) {
        var RecvObject = ApplyNode.RecvNode.ToConstValue(EnforceConst);
        if (RecvObject != null) {
            var Arguments = this.MakeArguments(RecvObject, ApplyNode.ParamList, EnforceConst);
            if (Arguments != null) {
                return LibGreenTea.InvokeDynamicMethod(0, ApplyNode.Type, ApplyNode.NameSpace, ApplyNode.FuncName, Arguments);
            }
        }
        return null;
    };

    GtGenerator.prototype.EvalDyGetterNode = function (GetterNode, EnforceConst) {
        var RecvObject = GetterNode.ExprNode.ToConstValue(EnforceConst);
        if (RecvObject != null) {
            return LibGreenTea.DynamicGetter(GetterNode.Type, RecvObject, GetterNode.FieldName);
        }
        return null;
    };

    GtGenerator.prototype.EvalDySetterNode = function (SetterNode, EnforceConst) {
        var RecvObject = SetterNode.LeftNode.ToConstValue(EnforceConst);
        if (RecvObject != null) {
            var Value = SetterNode.RightNode.ToConstValue(EnforceConst);
            if (Value != null || SetterNode.RightNode.IsNullNode()) {
                return LibGreenTea.DynamicSetter(SetterNode.Type, RecvObject, SetterNode.FieldName, Value);
            }
        }
        return null;
    };
    return GtGenerator;
})();

var SourceGenerator = (function (_super) {
    __extends(SourceGenerator, _super);
    function SourceGenerator(TargetCode, OutputFile, GeneratorFlag) {
        _super.call(this, TargetCode, OutputFile, GeneratorFlag);
        this.LineFeed = "\n";
        this.IndentLevel = 0;
        this.Tab = "   ";
        this.CurrentLevelIndentString = null;
        this.HeaderSource = "";
        this.BodySource = "";
        this.HasLabelSupport = false;
        this.LogicalOrOperator = "||";
        this.LogicalAndOperator = "&&";
        this.MemberAccessOperator = ".";
        this.TrueLiteral = "true";
        this.FalseLiteral = "false";
        this.NullLiteral = "null";
        this.BreakKeyword = "break";
        this.ContinueKeyword = "continue";
        this.LineComment = "//";
        this.ParameterBegin = "(";
        this.ParameterEnd = ")";
        this.ParameterDelimiter = ",";
        this.SemiColon = ";";
        this.BlockBegin = "{";
        this.BlockEnd = "}";
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

    SourceGenerator.prototype.WriteLineComment = function (Text) {
        this.BodySource += this.LineComment + " " + Text + this.LineFeed;
    };

    SourceGenerator.prototype.FlushErrorReport = function () {
        this.WriteLineCode("");
        var Reports = this.Context.GetReportedErrors();
        var i = 0;
        while (i < Reports.length) {
            this.WriteLineComment(Reports[i]);
            i = i + 1;
        }
        this.WriteLineCode("");
    };

    SourceGenerator.prototype.FlushBuffer = function () {
        LibGreenTea.WriteCode(this.OutputFile, this.HeaderSource + this.BodySource);
        this.HeaderSource = "";
        this.BodySource = "";
    };

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

    SourceGenerator.prototype.VisitBlockWithIndent = function (Node, NeedBlock) {
        var Code = "";
        if (NeedBlock) {
            Code += this.BlockBegin + this.LineFeed;
            this.Indent();
        }
        var CurrentNode = Node;
        while (CurrentNode != null) {
            if (!this.IsEmptyBlock(CurrentNode)) {
                var Stmt = this.VisitNode(CurrentNode);
                if (!LibGreenTea.EqualsString(Stmt, "")) {
                    Code += this.GetIndentString() + Stmt + this.SemiColon + this.LineFeed;
                }
            }
            CurrentNode = CurrentNode.NextNode;
        }
        if (NeedBlock) {
            this.UnIndent();
            Code += this.GetIndentString() + this.BlockEnd;
        }

        return Code;
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
            return LibGreenTea.QuoteString(ConstValue);
        }
        if (ConstValue instanceof GreenTeaEnum) {
            return "" + (ConstValue).EnumValue;
        }
        return ConstValue.toString();
    };

    SourceGenerator.prototype.GetNewOperator = function (Type) {
        return "new " + Type.ShortName + "()";
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
                Macro = "$1 " + FuncName;
            } else {
                Macro = FuncName + " $1";
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

        if (Func.Is(ConverterFunc)) {
            BeginIdx += 1;
        }
        var i = BeginIdx;
        if (IsNative == false) {
            Template += this.ParameterBegin;
            while (i < ParamSize) {
                if (i != BeginIdx) {
                    Template += this.ParameterDelimiter + " ";
                }
                Template += "$" + i;
                i = i + 1;
            }
            Template += this.ParameterEnd;
        }
        return Template;
    };

    SourceGenerator.prototype.ApplyMacro = function (Template, NodeList) {
        var ParamSize = LibGreenTea.ListSize(NodeList);
        var ParamIndex = ParamSize - 1;
        while (ParamIndex >= 1) {
            var Param = this.VisitNode(NodeList.get(ParamIndex));
            Template = Template.replace("$" + ParamIndex, Param);
            ParamIndex = ParamIndex - 1;
        }
        return Template;
    };
    SourceGenerator.prototype.ApplyMacro2 = function (Template, ParamList) {
        var ParamSize = ParamList.length;
        var ParamIndex = ParamSize - 1;
        while (ParamIndex >= 1) {
            var Param = ParamList[ParamIndex];
            Template = Template.replace("$" + ParamIndex, Param);
            ParamIndex = ParamIndex - 1;
        }
        return Template;
    };

    SourceGenerator.prototype.GenerateApplyFunc = function (Node) {
        var ParamSize = LibGreenTea.ListSize(Node.NodeList);
        var Template = this.GenerateFuncTemplate(ParamSize, Node.Func);
        return this.ApplyMacro(Template, Node.NodeList);
    };

    SourceGenerator.prototype.VisitEmptyNode = function (Node) {
        this.PushSourceCode("");
    };

    SourceGenerator.prototype.VisitInstanceOfNode = function (Node) {
        this.PushSourceCode(this.VisitNode(Node.ExprNode) + " instanceof " + Node.TypeInfo);
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
        this.PushSourceCode(this.VisitNode(Node.Expr) + "[" + this.VisitNode(Node.GetAt(0)) + "]");
    };

    SourceGenerator.prototype.VisitConstructorNode = function (Node) {
        var ParamSize = LibGreenTea.ListSize(Node.ParamList);
        var Template = this.GenerateFuncTemplate(ParamSize, Node.Func);
        this.PushSourceCode(this.ApplyMacro(Template, Node.ParamList));
    };

    SourceGenerator.prototype.VisitNewNode = function (Node) {
        this.PushSourceCode(this.GetNewOperator(Node.Type));
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
            LibGreenTea.DebugP(FuncName + " is not supported suffix operator!!");
        }
        this.PushSourceCode("(" + SourceGenerator.GenerateApplyFunc1(Node.Func, FuncName, true, Expr) + ")");
    };

    SourceGenerator.prototype.VisitSelfAssignNode = function (Node) {
        var FuncName = Node.Token.ParsedText;
        var Left = this.VisitNode(Node.LeftNode);
        var Right = this.VisitNode(Node.RightNode);
        this.PushSourceCode(Left + " = " + SourceGenerator.GenerateApplyFunc2(Node.Func, FuncName, Left, Right));
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
        this.PushSourceCode(this.VisitNode(Node.ExprNode) + this.MemberAccessOperator + Node.Func.FuncName);
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

    SourceGenerator.prototype.VisitTrinaryNode = function (Node) {
        var CondExpr = this.VisitNode(Node.ConditionNode);
        var ThenExpr = this.VisitNode(Node.ThenNode);
        var ElseExpr = this.VisitNode(Node.ElseNode);
        this.PushSourceCode("((" + CondExpr + ")? " + ThenExpr + " : " + ElseExpr + ")");
    };

    SourceGenerator.prototype.VisitBreakNode = function (Node) {
        var Code = this.BreakKeyword;
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
        var Code = this.ContinueKeyword;
        if (this.HasLabelSupport) {
            var Label = Node.Label;
            if (Label != null) {
                Code += " " + Label;
            }
        }
        this.PushSourceCode(Code);
        this.StopVisitor(Node);
    };

    SourceGenerator.prototype.VisitSwitchNode = function (Node) {
        var Code = "switch (" + this.VisitNode(Node.MatchNode) + ") {" + this.LineFeed;
        var i = 0;
        while (i < Node.CaseList.size()) {
            var Case = Node.CaseList.get(i);
            var Block = Node.CaseList.get(i + 1);
            Code += this.GetIndentString() + "case " + this.VisitNode(Case) + ":";
            if (this.IsEmptyBlock(Block)) {
                this.Indent();
                Code += this.LineFeed + this.GetIndentString() + "#COMMENT1#" + this.LineFeed;
                this.UnIndent();
            } else {
                Code += this.VisitBlockWithIndent(Block, true) + this.LineFeed;
            }
            i = i + 2;
        }
        if (Node.DefaultBlock != null) {
            Code += this.GetIndentString() + "default: ";
            Code += this.VisitBlockWithIndent(Node.DefaultBlock, true) + this.LineFeed;
        }
        Code += this.GetIndentString() + "}";
        this.PushSourceCode(Code);
    };
    return SourceGenerator;
})(GtGenerator);

var GtGrammar = (function () {
    function GtGrammar() {
    }
    GtGrammar.prototype.LoadTo = function (NameSpace) {
    };
    return GtGrammar;
})();

var GtParserContext = (function () {
    function GtParserContext(Grammar, Generator) {
        this.ParserId = LibGreenTea.NewParserId();
        this.Generator = Generator;
        this.Generator.Context = this;
        this.SourceMap = new GtMap();
        this.SourceList = new Array();
        this.ClassNameMap = new GtMap();
        this.RootNameSpace = new GtNameSpace(this, null);
        this.TypePools = new Array();
        this.FuncPools = new Array();
        this.Stat = new GtStat();
        this.NoErrorReport = false;
        this.ReportedErrorList = new Array();

        this.TopType = this.RootNameSpace.AppendTypeName(new GtType(this, 0, "Top", null, null), null);
        this.StructType = this.TopType.CreateSubType(0, "record", null, null);
        this.EnumBaseType = this.TopType.CreateSubType(EnumType, "enum", null, null);

        this.VoidType = this.RootNameSpace.AppendTypeName(new GtType(this, NativeType, "void", null, null), null);
        this.BooleanType = this.RootNameSpace.AppendTypeName(new GtType(this, NativeType | UnboxType, "boolean", false, Boolean), null);
        this.IntType = this.RootNameSpace.AppendTypeName(new GtType(this, NativeType | UnboxType, "int", 0, Number), null);
        this.FloatType = this.RootNameSpace.AppendTypeName(new GtType(this, NativeType | UnboxType, "double", 0.0, Number), null);
        this.StringType = this.RootNameSpace.AppendTypeName(new GtType(this, NativeType, "String", null, String), null);
        this.VarType = this.RootNameSpace.AppendTypeName(new GtType(this, 0, "var", null, null), null);
        this.AnyType = this.RootNameSpace.AppendTypeName(new GtType(this, DynamicType, "any", null, null), null);
        this.TypeType = this.RootNameSpace.AppendTypeName(this.TopType.CreateSubType(0, "Type", null, null), null);
        this.ArrayType = this.RootNameSpace.AppendTypeName(this.TopType.CreateSubType(0, "Array", null, null), null);
        this.FuncType = this.RootNameSpace.AppendTypeName(this.TopType.CreateSubType(0, "Func", null, null), null);

        this.ArrayType.TypeParams = new Array(1);
        this.ArrayType.TypeParams[0] = this.VarType;
        this.FuncType.TypeParams = new Array(1);
        this.FuncType.TypeParams[0] = this.VarType;

        Grammar.LoadTo(this.RootNameSpace);
        this.TopLevelNameSpace = new GtNameSpace(this, this.RootNameSpace);
        this.Generator.InitContext(this);
    }
    GtParserContext.prototype.LoadGrammar = function (Grammar) {
        Grammar.LoadTo(this.TopLevelNameSpace);
    };

    GtParserContext.prototype.GuessType = function (Value) {
        if (Value instanceof GtFunc) {
            return (Value).GetFuncType();
        } else if (Value instanceof GtPolyFunc) {
            return this.FuncType;
        } else if (Value instanceof GreenTeaObject) {
            return (Value).GetGreenType();
        } else {
            return this.Generator.GetNativeType(Value);
        }
    };

    GtParserContext.prototype.SubtypeKey = function (FromType, ToType) {
        return FromType.GetUniqueName() + "<" + ToType.GetUniqueName();
    };

    GtParserContext.prototype.CheckSubType = function (SubType, SuperType) {
        return false;
    };

    GtParserContext.prototype.SetNativeTypeName = function (Name, Type) {
        this.ClassNameMap.put(Name, Type);
        LibGreenTea.VerboseLog(VerboseSymbol, "global type name: " + Name + ", " + Type);
    };

    GtParserContext.prototype.GetGenericType = function (BaseType, BaseIdx, TypeList, IsCreation) {
        LibGreenTea.Assert(BaseType.IsGenericType());
        var MangleName = MangleGenericType(BaseType, BaseIdx, TypeList);
        var GenericType = this.ClassNameMap.GetOrNull(MangleName);
        if (GenericType == null && IsCreation) {
            var i = BaseIdx;
            var s = BaseType.ShortName + "<";
            while (i < LibGreenTea.ListSize(TypeList)) {
                s = s + TypeList.get(i).ShortName;
                i += 1;
                if (i == LibGreenTea.ListSize(TypeList)) {
                    s = s + ">";
                } else {
                    s = s + ",";
                }
            }
            GenericType = BaseType.CreateGenericType(BaseIdx, TypeList, s);
            this.SetNativeTypeName(MangleName, GenericType);
        }
        return GenericType;
    };

    GtParserContext.prototype.GetGenericType1 = function (BaseType, ParamType, IsCreation) {
        var TypeList = new Array();
        TypeList.add(ParamType);
        return this.GetGenericType(BaseType, 0, TypeList, IsCreation);
    };

    GtParserContext.prototype.GetFileLine = function (FileName, Line) {
        var Id = this.SourceMap.GetOrNull(FileName);
        if (Id == null) {
            this.SourceList.add(FileName);
            Id = this.SourceList.size();
            this.SourceMap.put(FileName, Id);
        }
        return LibGreenTea.JoinIntId(Id, Line);
    };

    GtParserContext.prototype.GetSourceFileName = function (FileLine) {
        var FileId = LibGreenTea.UpperId(FileLine);
        return (FileId == 0) ? null : this.SourceList.get(FileId - 1);
    };

    GtParserContext.prototype.GetSourcePosition = function (FileLine) {
        var FileId = LibGreenTea.UpperId(FileLine);
        var Line = LibGreenTea.LowerId(FileLine);
        var FileName = (FileId == 0) ? "eval" : this.SourceList.get(FileId - 1);
        return "(" + FileName + ":" + Line + ")";
    };

    GtParserContext.prototype.SetNoErrorReport = function (b) {
        this.NoErrorReport = b;
    };

    GtParserContext.prototype.ReportError = function (Level, Token, Message) {
        if (!Token.IsError() || !this.NoErrorReport) {
            if (Level == ErrorLevel) {
                Message = "(error) " + this.GetSourcePosition(Token.FileLine) + " " + Message;
                Token.SetErrorMessage(Message, this.RootNameSpace.GetSyntaxPattern("$Error$"));
            } else if (Level == TypeErrorLevel) {
                Message = "(error) " + this.GetSourcePosition(Token.FileLine) + " " + Message;
            } else if (Level == WarningLevel) {
                Message = "(warning) " + this.GetSourcePosition(Token.FileLine) + " " + Message;
            } else if (Level == InfoLevel) {
                Message = "(info) " + this.GetSourcePosition(Token.FileLine) + " " + Message;
            }

            this.ReportedErrorList.add(Message);
        }
    };

    GtParserContext.prototype.GetReportedErrors = function () {
        var List = this.ReportedErrorList;
        this.ReportedErrorList = new Array();
        return LibGreenTea.CompactStringList(List);
    };

    GtParserContext.prototype.ShowReportedErrors = function () {
        var i = 0;
        var Messages = this.GetReportedErrors();
        while (i < Messages.length) {
            LibGreenTea.println(Messages[i]);
            i = i + 1;
        }
    };

    GtParserContext.prototype.GetTypeById = function (TypeId) {
        return this.TypePools.get(TypeId);
    };

    GtParserContext.prototype.GetFuncById = function (FuncId) {
        return this.FuncPools.get(FuncId);
    };
    return GtParserContext;
})();

var GtTokenFunc = (function () {
    function GtTokenFunc(Func, Parent) {
        this.Func = Func;
        this.ParentFunc = Parent;
    }
    GtTokenFunc.prototype.toString = function () {
        return this.Func.toString();
    };
    return GtTokenFunc;
})();

var GtNameSpace = (function () {
    function GtNameSpace(Context, ParentNameSpace) {
        this.Context = Context;
        this.ParentNameSpace = ParentNameSpace;
        this.PackageName = (ParentNameSpace != null) ? ParentNameSpace.PackageName : null;
        this.TokenMatrix = null;
        this.SymbolPatternTable = null;
    }
    GtNameSpace.prototype.GetNameSpace = function (NameSpaceFlag) {
        if (IsFlag(NameSpaceFlag, RootNameSpace)) {
            return this.Context.RootNameSpace;
        }
        if (IsFlag(NameSpaceFlag, PublicNameSpace)) {
            return this.ParentNameSpace;
        }
        return this;
    };

    GtNameSpace.prototype.CreateSubNameSpace = function () {
        return new GtNameSpace(this.Context, this);
    };

    GtNameSpace.prototype.GetTokenFunc = function (GtChar2) {
        if (this.TokenMatrix == null) {
            return this.ParentNameSpace.GetTokenFunc(GtChar2);
        }
        return this.TokenMatrix[GtChar2];
    };

    GtNameSpace.prototype.JoinParentFunc = function (Func, Parent) {
        if (Parent != null && Parent.Func == Func) {
            return Parent;
        }
        return new GtTokenFunc(Func, Parent);
    };

    GtNameSpace.prototype.AppendTokenFunc = function (keys, TokenFunc) {
        var i = 0;
        if (this.TokenMatrix == null) {
            this.TokenMatrix = new Array(MaxSizeOfChars);
            if (this.ParentNameSpace != null) {
                while (i < MaxSizeOfChars) {
                    this.TokenMatrix[i] = this.ParentNameSpace.GetTokenFunc(i);
                }
            }
        }
        i = 0;
        while (i < keys.length) {
            var kchar = AsciiToTokenMatrixIndex(LibGreenTea.CharAt(keys, i));
            this.TokenMatrix[kchar] = this.JoinParentFunc(TokenFunc, this.TokenMatrix[kchar]);
            i += 1;
        }
    };

    GtNameSpace.prototype.GetLocalUndefinedSymbol = function (Key) {
        if (this.SymbolPatternTable != null) {
            return this.SymbolPatternTable.GetOrNull(Key);
        }
        return null;
    };

    GtNameSpace.prototype.GetLocalSymbol = function (Key) {
        if (this.SymbolPatternTable != null) {
            var Value = this.SymbolPatternTable.GetOrNull(Key);
            if (Value != null) {
                return Value == UndefinedSymbol ? null : Value;
            }
        }
        return null;
    };

    GtNameSpace.prototype.GetSymbol = function (Key) {
        var NameSpace = this;
        while (NameSpace != null) {
            if (NameSpace.SymbolPatternTable != null) {
                var Value = NameSpace.SymbolPatternTable.GetOrNull(Key);
                if (Value != null) {
                    return Value == UndefinedSymbol ? null : Value;
                }
            }
            NameSpace = NameSpace.ParentNameSpace;
        }
        return null;
    };

    GtNameSpace.prototype.HasSymbol = function (Key) {
        return (this.GetSymbol(Key) != null);
    };

    GtNameSpace.prototype.SetSymbol = function (Key, Value, SourceToken) {
        if (this.SymbolPatternTable == null) {
            this.SymbolPatternTable = new GtMap();
        }
        if (SourceToken != null) {
            var OldValue = this.SymbolPatternTable.GetOrNull(Key);
            if (OldValue != null && OldValue != UndefinedSymbol) {
                if (LibGreenTea.DebugMode) {
                    this.Context.ReportError(WarningLevel, SourceToken, "duplicated symbol: " + SourceToken + " old, new =" + OldValue + ", " + Value);
                } else {
                    if (!LibGreenTea.EqualsString(Key, "_")) {
                        this.Context.ReportError(WarningLevel, SourceToken, "duplicated symbol: " + SourceToken);
                    }
                }
            }
        }
        this.SymbolPatternTable.put(Key, Value);
        LibGreenTea.VerboseLog(VerboseSymbol, "symbol: " + Key + ", " + Value);
    };

    GtNameSpace.prototype.SetUndefinedSymbol = function (Symbol, SourceToken) {
        this.SetSymbol(Symbol, UndefinedSymbol, SourceToken);
    };

    GtNameSpace.prototype.GetSymbolText = function (Key) {
        var Body = this.GetSymbol(Key);
        if ((typeof Body == 'string' || Body instanceof String)) {
            return Body;
        }
        return null;
    };

    GtNameSpace.prototype.GetSyntaxPattern = function (PatternName) {
        var Body = this.GetSymbol(PatternName);
        if (Body instanceof GtSyntaxPattern) {
            return Body;
        }
        return null;
    };

    GtNameSpace.prototype.GetExtendedSyntaxPattern = function (PatternName) {
        var Body = this.GetSymbol("\t" + PatternName);
        if (Body instanceof GtSyntaxPattern) {
            return Body;
        }
        return null;
    };

    GtNameSpace.prototype.AppendSyntaxPattern = function (PatternName, NewPattern, SourceToken) {
        LibGreenTea.Assert(NewPattern.ParentPattern == null);
        var ParentPattern = this.GetSyntaxPattern(PatternName);
        NewPattern.ParentPattern = ParentPattern;
        this.SetSymbol(PatternName, NewPattern, SourceToken);
    };

    GtNameSpace.prototype.AppendSyntax = function (PatternName, MatchFunc, TypeFunc) {
        var Alias = PatternName.indexOf(" ");
        var Name = (Alias == -1) ? PatternName : PatternName.substring(0, Alias);
        var Pattern = new GtSyntaxPattern(this, Name, MatchFunc, TypeFunc);
        this.AppendSyntaxPattern(Name, Pattern, null);
        if (Alias != -1) {
            this.AppendSyntax(PatternName.substring(Alias + 1), MatchFunc, TypeFunc);
        }
    };

    GtNameSpace.prototype.AppendExtendedSyntax = function (PatternName, SyntaxFlag, MatchFunc, TypeFunc) {
        var Alias = PatternName.indexOf(" ");
        var Name = (Alias == -1) ? PatternName : PatternName.substring(0, Alias);
        var Pattern = new GtSyntaxPattern(this, Name, MatchFunc, TypeFunc);
        Pattern.SyntaxFlag = SyntaxFlag;
        this.AppendSyntaxPattern("\t" + Name, Pattern, null);
        if (Alias != -1) {
            this.AppendExtendedSyntax(PatternName.substring(Alias + 1), SyntaxFlag, MatchFunc, TypeFunc);
        }
    };

    GtNameSpace.prototype.GetType = function (TypeName) {
        var TypeInfo = this.GetSymbol(TypeName);
        if (TypeInfo instanceof GtType) {
            return TypeInfo;
        }
        return null;
    };

    GtNameSpace.prototype.AppendTypeName = function (Type, SourceToken) {
        if (Type.PackageNameSpace == null) {
            Type.PackageNameSpace = this;
            if (this.PackageName != null) {
                this.Context.SetNativeTypeName(this.PackageName + "." + Type.ShortName, Type);
            }
        }
        if (Type.BaseType == Type) {
            this.SetSymbol(Type.ShortName, Type, SourceToken);
        }
        return Type;
    };

    GtNameSpace.prototype.AppendTypeVariable = function (Name, ParamBaseType, SourceToken, RevertList) {
        this.UpdateRevertList(Name, RevertList);
        var TypeVar = new GtType(this.Context, TypeVariable, Name, ParamBaseType, null);
        this.SetSymbol(Name, TypeVar, SourceToken);
        return TypeVar;
    };

    GtNameSpace.prototype.GetClassSymbol = function (ClassType, Symbol, RecursiveSearch) {
        while (ClassType != null) {
            var Key = ClassSymbol(ClassType, Symbol);
            var Value = this.GetSymbol(Key);
            if (Value != null) {
                return Value;
            }

            if (!RecursiveSearch) {
                break;
            }
            ClassType = ClassType.ParentMethodSearch;
        }
        return null;
    };

    GtNameSpace.prototype.GetClassStaticSymbol = function (StaticClassType, Symbol, RecursiveSearch) {
        var Key = null;
        var ClassType = StaticClassType;
        while (ClassType != null) {
            Key = ClassStaticSymbol(ClassType, Symbol);
            var Value = this.GetSymbol(Key);
            if (Value != null) {
                return Value;
            }
            if (!RecursiveSearch) {
                break;
            }
            ClassType = ClassType.SuperType;
        }
        Key = ClassStaticSymbol(StaticClassType, Symbol);
        if (StaticClassType.IsDynamicNaitiveLoading() && this.Context.RootNameSpace.GetLocalUndefinedSymbol(Key) == null) {
            var Value = LibGreenTea.LoadNativeStaticFieldValue(StaticClassType, Symbol);
            if (Value == null) {
                this.Context.RootNameSpace.SetUndefinedSymbol(Key, null);
            } else {
                this.Context.RootNameSpace.SetSymbol(Key, Value, null);
            }
            return Value;
        }
        return null;
    };

    GtNameSpace.prototype.GetGetterFunc = function (ClassType, Symbol, RecursiveSearch) {
        var Func = this.Context.RootNameSpace.GetClassSymbol(ClassType, GetterSymbol(Symbol), RecursiveSearch);
        if (Func instanceof GtFunc) {
            return Func;
        }
        Func = this.Context.RootNameSpace.GetLocalUndefinedSymbol(ClassSymbol(ClassType, GetterSymbol(Symbol)));
        if (ClassType.IsDynamicNaitiveLoading() && Func == null) {
            return LibGreenTea.LoadNativeField(ClassType, Symbol, false);
        }
        return null;
    };

    GtNameSpace.prototype.GetSetterFunc = function (ClassType, Symbol, RecursiveSearch) {
        var Func = this.Context.RootNameSpace.GetClassSymbol(ClassType, SetterSymbol(Symbol), RecursiveSearch);
        if (Func instanceof GtFunc) {
            return Func;
        }
        Func = this.Context.RootNameSpace.GetLocalUndefinedSymbol(ClassSymbol(ClassType, SetterSymbol(Symbol)));
        if (ClassType.IsDynamicNaitiveLoading() && Func == null) {
            return LibGreenTea.LoadNativeField(ClassType, Symbol, true);
        }
        return null;
    };

    GtNameSpace.prototype.GetConverterFunc = function (FromType, ToType, RecursiveSearch) {
        var Func = this.Context.RootNameSpace.GetClassSymbol(FromType, ConverterSymbol(ToType), RecursiveSearch);
        if (Func instanceof GtFunc) {
            return Func;
        }
        return null;
    };

    GtNameSpace.prototype.GetMethod = function (ClassType, Symbol, RecursiveSearch) {
        var FuncList = new Array();
        while (ClassType != null) {
            var Key = ClassSymbol(ClassType, Symbol);
            var RootValue = this.RetrieveFuncList(Key, FuncList);
            if (RootValue == null && ClassType.IsDynamicNaitiveLoading()) {
                if (LibGreenTea.EqualsString(Symbol, ConstructorSymbol())) {
                    LibGreenTea.LoadNativeConstructors(ClassType, FuncList);
                } else {
                    LibGreenTea.LoadNativeMethods(ClassType, Symbol, FuncList);
                }
            }
            if (!RecursiveSearch) {
                break;
            }

            ClassType = ClassType.ParentMethodSearch;
        }
        return new GtPolyFunc(FuncList);
    };

    GtNameSpace.prototype.GetConstructorFunc = function (ClassType) {
        return this.Context.RootNameSpace.GetMethod(ClassType, ConstructorSymbol(), false);
    };

    GtNameSpace.prototype.GetOverridedMethod = function (ClassType, GivenFunc) {
        var Symbol = FuncSymbol(GivenFunc.FuncName);
        var GivenClassType = GivenFunc.GetRecvType();
        if (ClassType != GivenClassType) {
            var FuncList = new Array();
            while (ClassType != null) {
                var Key = ClassSymbol(ClassType, Symbol);
                this.RetrieveFuncList(Key, FuncList);
                var i = 0;
                while (i < FuncList.size()) {
                    var Func = FuncList.get(i);
                    i += 1;
                    if (Func.EqualsOverridedMethod(GivenFunc)) {
                        return Func;
                    }
                }
                FuncList.clear();
                ClassType = ClassType.ParentMethodSearch;
            }
        }
        return GivenFunc;
    };

    GtNameSpace.prototype.RetrieveFuncList = function (FuncName, FuncList) {
        var FuncValue = this.GetLocalSymbol(FuncName);
        if (FuncValue instanceof GtFunc) {
            var Func = FuncValue;
            FuncList.add(Func);
        } else if (FuncValue instanceof GtPolyFunc) {
            var PolyFunc = FuncValue;
            var i = PolyFunc.FuncList.size() - 1;
            while (i >= 0) {
                FuncList.add(PolyFunc.FuncList.get(i));
                i = i - 1;
            }
        }
        if (this.ParentNameSpace != null) {
            return this.ParentNameSpace.RetrieveFuncList(FuncName, FuncList);
        }
        return FuncValue;
    };

    GtNameSpace.prototype.GetPolyFunc = function (FuncName) {
        var FuncList = new Array();
        this.RetrieveFuncList(FuncName, FuncList);
        return new GtPolyFunc(FuncList);
    };

    GtNameSpace.prototype.GetFunc = function (FuncName, BaseIndex, TypeList) {
        var FuncList = new Array();
        this.RetrieveFuncList(FuncName, FuncList);
        var i = 0;
        while (i < FuncList.size()) {
            var Func = FuncList.get(i);
            if (Func.Types.length == TypeList.size() - BaseIndex) {
                var j = 0;
                while (j < Func.Types.length) {
                    if (TypeList.get(BaseIndex + j) != Func.Types[j]) {
                        Func = null;
                        break;
                    }
                    j = j + 1;
                }
                if (Func != null) {
                    return Func;
                }
            }
            i = i + 1;
        }
        return null;
    };

    GtNameSpace.prototype.AppendFuncName = function (Key, Func, SourceToken) {
        var OldValue = this.GetLocalSymbol(Key);
        if (OldValue instanceof GtSyntaxPattern) {
            return OldValue;
        }
        if (OldValue instanceof GtFunc) {
            var OldFunc = OldValue;
            if (!OldFunc.EqualsType(Func)) {
                var PolyFunc = new GtPolyFunc(null);
                PolyFunc.Append(OldFunc, SourceToken);
                PolyFunc.Append(Func, SourceToken);
                this.SetSymbol(Key, PolyFunc, null);
                return PolyFunc;
            }
        } else if (OldValue instanceof GtPolyFunc) {
            var PolyFunc = OldValue;
            PolyFunc.Append(Func, SourceToken);
            return PolyFunc;
        }
        this.SetSymbol(Key, Func, SourceToken);
        return OldValue;
    };

    GtNameSpace.prototype.AppendFunc = function (Func, SourceToken) {
        return this.AppendFuncName(Func.FuncName, Func, SourceToken);
    };

    GtNameSpace.prototype.AppendMethod = function (Func, SourceToken) {
        var ClassType = Func.GetRecvType();
        if (ClassType.IsGenericType() && ClassType.HasTypeVariable()) {
            ClassType = ClassType.BaseType;
        }
        var Key = ClassSymbol(ClassType, Func.FuncName);
        return this.AppendFuncName(Key, Func, SourceToken);
    };

    GtNameSpace.prototype.AppendConstructor = function (ClassType, Func, SourceToken) {
        var Key = ClassSymbol(ClassType, ConstructorSymbol());
        LibGreenTea.Assert(Func.Is(ConstructorFunc));
        this.Context.RootNameSpace.AppendFuncName(Key, Func, SourceToken);
    };

    GtNameSpace.prototype.SetGetterFunc = function (ClassType, Name, Func, SourceToken) {
        var Key = ClassSymbol(ClassType, GetterSymbol(Name));
        LibGreenTea.Assert(Func.Is(GetterFunc));
        this.Context.RootNameSpace.SetSymbol(Key, Func, SourceToken);
    };

    GtNameSpace.prototype.SetSetterFunc = function (ClassType, Name, Func, SourceToken) {
        var Key = ClassSymbol(ClassType, SetterSymbol(Name));
        LibGreenTea.Assert(Func.Is(SetterFunc));
        this.Context.RootNameSpace.SetSymbol(Key, Func, SourceToken);
    };

    GtNameSpace.prototype.SetConverterFunc = function (ClassType, ToType, Func, SourceToken) {
        if (ClassType == null) {
            ClassType = Func.GetFuncParamType(1);
        }
        if (ToType == null) {
            ToType = Func.GetReturnType();
        }
        var Key = ClassSymbol(ClassType, ConverterSymbol(ToType));
        LibGreenTea.Assert(Func.Is(ConverterFunc));
        this.Context.RootNameSpace.SetSymbol(Key, Func, SourceToken);
    };

    GtNameSpace.prototype.EvalWithErrorInfo = function (ScriptText, FileLine) {
        var ResultValue = null;
        LibGreenTea.VerboseLog(VerboseEval, "eval: " + ScriptText);
        var TokenContext = new GtTokenContext(this, ScriptText, FileLine);
        this.Context.Generator.StartCompilationUnit();
        TokenContext.SkipEmptyStatement();
        while (TokenContext.HasNext()) {
            var Annotation = TokenContext.SkipAndGetAnnotation(true);
            TokenContext.ParseFlag = 0;

            var TopLevelTree = TokenContext.ParsePattern(this, "$Expression$", Required);
            TokenContext.SkipEmptyStatement();
            if (TopLevelTree.IsError() && TokenContext.HasNext()) {
                var Token = TokenContext.GetToken();
                this.Context.ReportError(InfoLevel, TokenContext.GetToken(), "stopping script eval at " + Token.ParsedText);
                ResultValue = TopLevelTree.KeyToken;
                break;
            }
            if (TopLevelTree.IsValidSyntax()) {
                TopLevelTree.SetAnnotation(Annotation);
                var Gamma = new GtTypeEnv(this);
                var Node = TopLevelTree.TypeCheck(Gamma, Gamma.VoidType, DefaultTypeCheckPolicy);
                ResultValue = Node.ToConstValue(true);
            }
            TokenContext.Vacume();
        }
        this.Context.Generator.FinishCompilationUnit();
        return ResultValue;
    };

    GtNameSpace.prototype.Eval = function (ScriptText, FileLine) {
        var ResultValue = this.EvalWithErrorInfo(ScriptText, FileLine);
        if (ResultValue instanceof GtToken && (ResultValue).IsError()) {
            return null;
        }
        return ResultValue;
    };

    GtNameSpace.prototype.Load = function (ScriptText, FileLine) {
        var Token = this.EvalWithErrorInfo(ScriptText, FileLine);
        if (Token instanceof GtToken && (Token).IsError()) {
            return false;
        }
        return true;
    };

    GtNameSpace.prototype.LoadFile = function (FileName) {
        var ScriptText = LibGreenTea.LoadFile2(FileName);
        if (ScriptText != null) {
            var FileLine = this.Context.GetFileLine(FileName, 1);
            return this.Load(ScriptText, FileLine);
        }
        return false;
    };

    GtNameSpace.prototype.LoadRequiredLib = function (LibName) {
        var Key = NativeNameSuffix + "L" + LibName.toLowerCase();
        if (!this.HasSymbol(Key)) {
            var Path = LibGreenTea.GetLibPath(this.Context.Generator.TargetCode, LibName);
            var Script = LibGreenTea.LoadFile2(Path);
            if (Script != null) {
                var FileLine = this.Context.GetFileLine(Path, 1);
                if (this.Load(Script, FileLine)) {
                    this.SetSymbol(Key, Path, null);
                    return true;
                }
            }
            return false;
        }
        return true;
    };

    GtNameSpace.prototype.UpdateRevertList = function (Key, RevertList) {
        var Value = this.GetLocalSymbol(Key);
        RevertList.add(Key);
        if (Value != null) {
            RevertList.add(Value);
        } else {
            RevertList.add(UndefinedSymbol);
        }
    };

    GtNameSpace.prototype.Revert = function (RevertList) {
        var i = 0;
        while (i < RevertList.size()) {
            var Key = RevertList.get(i);
            var Value = RevertList.get(i + 1);
            this.SetSymbol(Key, Value, null);
            i += 2;
        }
    };
    return GtNameSpace;
})();

var GtFuncBlock = (function () {
    function GtFuncBlock(NameSpace, TypeList) {
        this.NameSpace = NameSpace;
        this.TypeList = TypeList;
        this.NameList = new Array();
        this.FuncBlock = null;
        this.IsVarArgument = false;
        this.DefinedFunc = null;
    }
    GtFuncBlock.prototype.SetThisIfInClass = function (Type) {
        if (Type != null) {
            this.TypeList.add(Type);
            this.NameList.add(this.NameSpace.Context.Generator.GetRecvName());
        }
    };

    GtFuncBlock.prototype.SetConverterType = function () {
        this.TypeList.add(this.NameSpace.Context.TypeType);
        this.NameList.add("type");
    };

    GtFuncBlock.prototype.AddParameter = function (Type, Name) {
        this.TypeList.add(Type);
        if (Type.IsVarType()) {
            this.IsVarArgument = true;
        }
        this.NameList.add(Name);
    };
    return GtFuncBlock;
})();

var GtFunc = (function () {
    function GtFunc(FuncFlag, FuncName, BaseIndex, ParamList) {
        this.FuncFlag = FuncFlag;
        this.FuncName = FuncName;
        this.Types = LibGreenTea.CompactTypeList(BaseIndex, ParamList);
        LibGreenTea.Assert(this.Types.length > 0);
        this.FuncType = null;
        this.FuncBody = null;
        var Context = this.GetContext();
        this.FuncId = Context.FuncPools.size();
        Context.FuncPools.add(this);
        this.MangledName = FuncName + NativeNameSuffix + this.FuncId;
    }
    GtFunc.prototype.GetContext = function () {
        return this.GetReturnType().Context;
    };

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
        var s = this.GetReturnType().GetRevealedType() + " " + this.FuncName + "(";
        var i = 0;
        while (i < this.GetFuncParamSize()) {
            var ParamType = this.GetFuncParamType(i).GetRevealedType();
            if (i > 0) {
                s += ", ";
            }
            s += ParamType;
            i += 1;
        }
        return s + ")";
    };

    GtFunc.prototype.Is = function (Flag) {
        return IsFlag(this.FuncFlag, Flag);
    };

    GtFunc.prototype.GetReturnType = function () {
        return this.Types[0];
    };

    GtFunc.prototype.SetReturnType = function (ReturnType) {
        LibGreenTea.Assert(this.GetReturnType().IsVarType());
        this.Types[0] = ReturnType;
        this.FuncType = null;
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

    GtFunc.prototype.GetVargType = function () {
        if (this.Types.length > 0) {
            var VargType = this.Types[this.Types.length - 1];
            if (VargType.IsArrayType()) {
                return VargType.TypeParams[0];
            }
        }
        return null;
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
        return this.EqualsParamTypes(0, AFunc.Types);
    };

    GtFunc.prototype.EqualsOverridedMethod = function (AFunc) {
        return this.Types[0] == AFunc.Types[0] && this.EqualsParamTypes(2, AFunc.Types);
    };

    GtFunc.prototype.IsAbstract = function () {
        return this.FuncBody == null;
    };

    GtFunc.prototype.SetNativeMacro = function (NativeMacro) {
        LibGreenTea.Assert(this.FuncBody == null);
        this.FuncFlag |= NativeMacroFunc;
        this.FuncBody = NativeMacro;
    };

    GtFunc.prototype.GetNativeMacro = function () {
        return this.FuncBody;
    };

    GtFunc.prototype.SetNativeMethod = function (OptionalFuncFlag, Method) {
        this.FuncFlag |= NativeFunc | OptionalFuncFlag;
        this.FuncBody = Method;
    };

    GtFunc.prototype.HasStaticBlock = function () {
        if (this.FuncBody instanceof GtFuncBlock) {
            var FuncBlock = this.FuncBody;
            return !FuncBlock.IsVarArgument;
        }
        return false;
    };

    GtFunc.prototype.GenerateNativeFunc = function () {
        if (this.HasStaticBlock()) {
            var FuncBlock = this.FuncBody;
            var Gamma = new GtTypeEnv(FuncBlock.NameSpace);
            var i = 0;
            var NameList = new Array();
            while (i < FuncBlock.NameList.size()) {
                var VarInfo = Gamma.AppendDeclaredVariable(0, FuncBlock.DefinedFunc.Types[i + 1], FuncBlock.NameList.get(i), null, null);
                NameList.add(VarInfo.NativeName);
                i = i + 1;
            }
            Gamma.Func = FuncBlock.DefinedFunc;
            var BodyNode = TypeBlock(Gamma, FuncBlock.FuncBlock, Gamma.VoidType);
            if (Gamma.FoundUncommonFunc) {
                Gamma.Func.FuncFlag = UnsetFlag(Gamma.Func.FuncFlag, CommonFunc);
            }
            var FuncName = FuncBlock.DefinedFunc.GetNativeFuncName();
            Gamma.Generator.GenerateFunc(FuncBlock.DefinedFunc, NameList, BodyNode);
            if (FuncName.equals("main")) {
                Gamma.Generator.InvokeMainFunc(FuncName);
            }
        }
    };

    GtFunc.prototype.HasLazyBlock = function () {
        if (this.FuncBody instanceof GtFuncBlock) {
            var FuncBlock = this.FuncBody;
            return FuncBlock.IsVarArgument;
        }
        return false;
    };

    GtFunc.prototype.GenerateLazyFunc = function (NodeList) {
        return null;
    };

    GtFunc.prototype.GetGenericNameSpace = function (NameSpace, NodeList, MaxSize) {
        if (this.Is(GenericFunc)) {
            var GenericNameSpace = NameSpace.CreateSubNameSpace();
            var i = 0;
            while (i < this.Types.length) {
                this.Types[i].AppendTypeVariable(GenericNameSpace, 0);
                i = i + 1;
            }
            i = 0;
            while (i < MaxSize) {
                this.Types[i + 1].Match(GenericNameSpace, NodeList.get(i).Type);
                i = i + 1;
            }
            return GenericNameSpace;
        }
        return NameSpace;
    };

    GtFunc.prototype.GetGenericNameSpaceT = function (NameSpace, NodeList, MaxSize) {
        if (this.Is(GenericFunc)) {
            var GenericNameSpace = NameSpace.CreateSubNameSpace();
            var i = 0;
            while (i < this.Types.length) {
                this.Types[i].AppendTypeVariable(GenericNameSpace, 0);
                i = i + 1;
            }
            i = 0;
            while (i < MaxSize) {
                this.Types[i + 1].Match(GenericNameSpace, NodeList.get(i));
                i = i + 1;
            }
            return GenericNameSpace;
        }
        return NameSpace;
    };

    GtFunc.prototype.Apply = function (Arguments) {
        if (this.IsAbstract()) {
            LibGreenTea.VerboseLog(VerboseRuntime, "applying abstract function: " + this);
            return this.GetReturnType().DefaultNullValue;
        } else if (!this.Is(NativeStaticFunc)) {
            var MethodArguments = new Array(Arguments.length - 1);
            LibGreenTea.ArrayCopy(Arguments, 1, MethodArguments, 0, MethodArguments.length);
            return LibGreenTea.ApplyFunc(this, Arguments[0], MethodArguments);
        }
        return LibGreenTea.ApplyFunc(this, null, Arguments);
    };
    return GtFunc;
})();

var GtResolvedFunc = (function () {
    function GtResolvedFunc(NameSpace) {
        this.GenericNameSpace = NameSpace;
        this.Func = null;
        this.ReturnType = NameSpace.Context.AnyType;
        this.ErrorNode = null;
    }
    GtResolvedFunc.prototype.UpdateFunc = function (Func, GenericNameSpace) {
        this.Func = Func;
        if (Func != null) {
            this.ReturnType = Func.GetReturnType().RealType(GenericNameSpace, GenericNameSpace.Context.AnyType);
        }
        return this;
    };
    return GtResolvedFunc;
})();

var GtPolyFunc = (function () {
    function GtPolyFunc(FuncList) {
        this.FuncList = FuncList == null ? new Array() : FuncList;
    }
    GtPolyFunc.prototype.toString = function () {
        var s = "";
        var i = 0;
        while (i < this.FuncList.size()) {
            if (i > 0) {
                s = s + ", ";
            }
            s = s + this.FuncList.get(i);
            i = i + 1;
        }
        return s;
    };

    GtPolyFunc.prototype.Append = function (Func, SourceToken) {
        if (SourceToken != null) {
            var i = 0;
            while (i < this.FuncList.size()) {
                var ListedFunc = this.FuncList.get(i);
                if (ListedFunc == Func) {
                    return this;
                }
                if (Func.EqualsType(ListedFunc)) {
                    Func.GetContext().ReportError(WarningLevel, SourceToken, "duplicated symbol" + SourceToken.ParsedText);
                    break;
                }
                i = i + 1;
            }
        }
        this.FuncList.add(Func);
        return this;
    };

    GtPolyFunc.prototype.ResolveUnaryMethod = function (Gamma, Type) {
        var i = 0;
        while (i < this.FuncList.size()) {
            var Func = this.FuncList.get(i);
            if (Func.GetFuncParamSize() == 1) {
                return Func;
            }
            i = i + 1;
        }
        return null;
    };

    GtPolyFunc.prototype.CheckIncrementalTyping = function (NameSpace, FuncParamSize, ParamList, ResolvedFunc) {
        var FoundFunc = null;
        var GenericNameSpace = null;
        var i = 0;
        while (i < this.FuncList.size()) {
            var Func = this.FuncList.get(i);
            if (Func.GetFuncParamSize() == FuncParamSize) {
                GenericNameSpace = Func.GetGenericNameSpace(NameSpace, ParamList, 0);
                var p = 0;
                while (p < ParamList.size()) {
                    var Node = ParamList.get(p);
                    if (!Func.Types[p + 1].Match(GenericNameSpace, Node.Type)) {
                        Func = null;
                        break;
                    }
                    p = p + 1;
                }
                if (Func != null) {
                    if (ParamList.size() == FuncParamSize) {
                        ResolvedFunc.Func = Func;
                        return true;
                    }
                    if (FoundFunc != null) {
                        ResolvedFunc.Func = null;
                        return false;
                    }
                    FoundFunc = Func;
                }
            }
            i = i + 1;
        }
        ResolvedFunc.Func = FoundFunc;
        ResolvedFunc.GenericNameSpace = GenericNameSpace;
        return true;
    };

    GtPolyFunc.prototype.CheckParamWithCoercion = function (GenericNameSpace, Func, ParamList) {
        var p = 0;
        var ConvertedNodes = null;
        while (p < ParamList.size()) {
            var ParamType = Func.Types[p + 1];
            var Node = ParamList.get(p);
            ParamType = ParamType.RealType(GenericNameSpace, Node.Type);
            if (!ParamType.Accept(Node.Type)) {
                var TypeCoercion = GenericNameSpace.GetConverterFunc(Node.Type, ParamType, true);
                if (TypeCoercion != null && TypeCoercion.Is(CoercionFunc)) {
                    if (ConvertedNodes == null) {
                        ConvertedNodes = new Array(ParamList.size());
                    }
                    ConvertedNodes[p] = GenericNameSpace.Context.Generator.CreateCoercionNode(ParamType, TypeCoercion, Node);
                } else {
                    return null;
                }
            }
            p = p + 1;
        }
        if (ConvertedNodes != null) {
            p = 1;
            while (p < ConvertedNodes.length) {
                if (ConvertedNodes[p] != null) {
                    ParamList.set(p, ConvertedNodes[p]);
                }
                p = p + 1;
            }
        }
        return Func;
    };

    GtPolyFunc.prototype.CheckParamAsVarArg = function (GenericNameSpace, Func, VargType, ParamList) {
        var p = 0;
        var ConvertedNodes = null;
        while (p < ParamList.size()) {
            var ParamType = (p + 1 < Func.Types.length - 1) ? Func.Types[p + 1] : VargType;
            var Node = ParamList.get(p);
            var RealType = ParamType.RealType(GenericNameSpace, Node.Type);
            if (RealType == null) {
                return null;
            }
            if (!ParamType.Accept(RealType)) {
                var TypeCoercion = GenericNameSpace.GetConverterFunc(RealType, ParamType, true);
                if (TypeCoercion != null && TypeCoercion.Is(CoercionFunc)) {
                    if (ConvertedNodes == null) {
                        ConvertedNodes = new Array(ParamList.size());
                    }
                    ConvertedNodes[p] = GenericNameSpace.Context.Generator.CreateCoercionNode(ParamType, TypeCoercion, Node);
                } else {
                    return null;
                }
            }
            p = p + 1;
        }
        if (ConvertedNodes != null) {
            p = 1;
            while (p < ConvertedNodes.length) {
                if (ConvertedNodes[p] != null) {
                    ParamList.set(p, ConvertedNodes[p]);
                }
                p = p + 1;
            }
            ConvertedNodes = null;
        }
        if (!Func.Is(NativeVariadicFunc)) {
            var ArrayType = Func.Types[Func.Types.length - 1];
            var ArrayNode = GenericNameSpace.Context.Generator.CreateArrayNode(ArrayType, null);
            p = Func.Types.length - 1;
            while (p < ParamList.size()) {
                ArrayNode.Append(ParamList.get(p));
            }
            while (Func.Types.length - 1 < ParamList.size()) {
                ParamList.remove(ParamList.size() - 1);
            }
            ParamList.add(ArrayNode);
        }
        return Func;
    };

    GtPolyFunc.prototype.GetAcceptableFunc = function (Gamma, FuncParamSize, ParamList, ResolvedFunc) {
        var i = 0;
        while (i < this.FuncList.size()) {
            var Func = this.FuncList.get(i);
            if (Func.GetFuncParamSize() == FuncParamSize) {
                var GenericNameSpace = Func.GetGenericNameSpace(Gamma.NameSpace, ParamList, 0);
                Func = this.CheckParamWithCoercion(GenericNameSpace, Func, ParamList);
                if (Func != null) {
                    return ResolvedFunc.UpdateFunc(Func, GenericNameSpace);
                }
            }
            i = i + 1;
        }
        i = 0;
        while (i < this.FuncList.size()) {
            var Func = this.FuncList.get(i);
            var VargType = Func.GetVargType();
            if (VargType != null && Func.GetFuncParamSize() <= FuncParamSize) {
                var GenericNameSpace = Func.GetGenericNameSpace(Gamma.NameSpace, ParamList, 0);
                Func = this.CheckParamAsVarArg(GenericNameSpace, Func, VargType, ParamList);
                if (Func != null) {
                    return ResolvedFunc.UpdateFunc(Func, GenericNameSpace);
                }
            }
            i = i + 1;
        }
        return ResolvedFunc;
    };

    GtPolyFunc.prototype.ResolveFunc = function (Gamma, ParsedTree, TreeIndex, ParamList) {
        var FuncParamSize = LibGreenTea.ListSize(ParsedTree.SubTreeList) - TreeIndex + ParamList.size();

        var ResolvedFunc = new GtResolvedFunc(Gamma.NameSpace);
        while (!this.CheckIncrementalTyping(Gamma.NameSpace, FuncParamSize, ParamList, ResolvedFunc) && TreeIndex < LibGreenTea.ListSize(ParsedTree.SubTreeList)) {
            var Node = ParsedTree.TypeCheckAt(TreeIndex, Gamma, Gamma.VarType, DefaultTypeCheckPolicy);
            if (Node.IsErrorNode()) {
                ResolvedFunc.ErrorNode = Node;
                return ResolvedFunc;
            }
            ParamList.add(Node);
            TreeIndex = TreeIndex + 1;
        }
        if (ResolvedFunc.Func != null) {
            var GenericNameSpace = ResolvedFunc.GenericNameSpace;
            while (TreeIndex < LibGreenTea.ListSize(ParsedTree.SubTreeList)) {
                var ContextType = ResolvedFunc.Func.GetFuncParamType(ParamList.size());
                ContextType = ContextType.RealType(GenericNameSpace, Gamma.VarType);

                var Node = ParsedTree.TypeCheckAt(TreeIndex, Gamma, ContextType, DefaultTypeCheckPolicy);
                if (Node.IsErrorNode()) {
                    ResolvedFunc.ErrorNode = Node;
                    return ResolvedFunc;
                }
                if (ContextType.IsVarType()) {
                    ResolvedFunc.Func.Types[TreeIndex + 1].Match(GenericNameSpace, Node.Type);
                }
                ParamList.add(Node);
                TreeIndex = TreeIndex + 1;
            }
            return ResolvedFunc.UpdateFunc(ResolvedFunc.Func, GenericNameSpace);
        }
        return this.GetAcceptableFunc(Gamma, FuncParamSize, ParamList, ResolvedFunc);
    };

    GtPolyFunc.prototype.CheckArguments = function (NameSpace, Func, Arguments, ConvertedArguments, TypeList) {
        var p = 0;
        while (p < Arguments.length) {
            var DefinedType = Func.Types[p + 1];
            var GivenType = TypeList.get(p);
            if (DefinedType.Accept(GivenType)) {
                ConvertedArguments[p] = Arguments[p];
            } else {
                var TypeCoercion = NameSpace.GetConverterFunc(GivenType, DefinedType, true);
                if (TypeCoercion != null && TypeCoercion.Is(CoercionFunc)) {
                    ConvertedArguments[p] = LibGreenTea.DynamicConvertTo(DefinedType, Arguments[p]);
                } else {
                    return false;
                }
            }
            p = p + 1;
        }
        return true;
    };

    GtPolyFunc.prototype.GetMatchedFunc = function (NameSpace, Arguments) {
        var OriginalArguments = new Array(Arguments.length);
        LibGreenTea.ArrayCopy(Arguments, 0, OriginalArguments, 0, Arguments.length);
        var TypeList = new Array();
        var i = 0;
        while (i < Arguments.length) {
            TypeList.add(NameSpace.Context.GuessType(Arguments[i]));
            i = i + 1;
        }
        i = 0;
        while (i < this.FuncList.size()) {
            var Func = this.FuncList.get(i);
            if (Func.GetFuncParamSize() == Arguments.length) {
                var GenericNameSpace = Func.GetGenericNameSpaceT(NameSpace, TypeList, 0);
                if (this.CheckArguments(GenericNameSpace, Func, OriginalArguments, Arguments, TypeList)) {
                    return Func;
                }
            }

            i = i + 1;
        }
        return null;
    };

    GtPolyFunc.prototype.MessageTypeError = function (ClassType, MethodName) {
        if (ClassType == null) {
            if (this.FuncList.size() == 0) {
                return "undefined function: " + MethodName;
            } else {
                return "mismatched functions: " + this;
            }
        } else {
            if (this.FuncList.size() == 0) {
                return "undefined method: " + MethodName + " of " + ClassType;
            } else {
                return "mismatched methods: " + this;
            }
        }
    };

    GtPolyFunc.prototype.ReportTypeError = function (Gamma, ParsedTree, ClassType, MethodName) {
        return Gamma.CreateSyntaxErrorNode(ParsedTree, this.MessageTypeError(ClassType, MethodName));
    };
    return GtPolyFunc;
})();

var GtSyntaxPattern = (function () {
    function GtSyntaxPattern(NameSpace, PatternName, MatchFunc, TypeFunc) {
        this.PackageNameSpace = NameSpace;
        this.PatternName = PatternName;
        this.SyntaxFlag = 0;
        this.MatchFunc = MatchFunc;
        this.TypeFunc = TypeFunc;
        this.ParentPattern = null;
    }
    GtSyntaxPattern.prototype.toString = function () {
        return this.PatternName + "<" + this.MatchFunc + ">";
    };

    GtSyntaxPattern.prototype.IsBinaryOperator = function () {
        return IsFlag(this.SyntaxFlag, BinaryOperator);
    };

    GtSyntaxPattern.prototype.IsRightJoin = function (Right) {
        var left = this.SyntaxFlag;
        var right = Right.SyntaxFlag;
        return (left < right || (left == right && !IsFlag(this.SyntaxFlag, LeftJoin) && !IsFlag(Right.SyntaxFlag, LeftJoin)));
    };

    GtSyntaxPattern.prototype.EqualsName = function (Name) {
        return LibGreenTea.EqualsString(this.PatternName, Name);
    };
    return GtSyntaxPattern;
})();

var GtSyntaxTree = (function () {
    function GtSyntaxTree(Pattern, NameSpace, KeyToken, ParsedValue) {
        this.NameSpace = NameSpace;
        this.Annotation = null;
        this.KeyToken = KeyToken;
        this.Pattern = Pattern;
        this.ParentTree = null;
        this.PrevTree = null;
        this.NextTree = null;
        this.SubTreeList = null;
        this.ParsedValue = ParsedValue;
    }
    GtSyntaxTree.prototype.toString = function () {
        var s = "(" + this.KeyToken.ParsedText;
        var i = 0;
        while (i < LibGreenTea.ListSize(this.SubTreeList)) {
            var SubTree = this.SubTreeList.get(i);
            while (SubTree != null) {
                var Entry = SubTree.toString();
                if (LibGreenTea.ListSize(SubTree.SubTreeList) == 0) {
                    Entry = SubTree.KeyToken.ParsedText;
                }
                s = s + " " + Entry;
                SubTree = SubTree.NextTree;
            }
            i += 1;
        }
        return s + ")";
    };

    GtSyntaxTree.prototype.AppendNext = function (Tree) {
        var TailTree = this;
        while (TailTree.NextTree != null) {
            TailTree = TailTree.NextTree;
        }
        TailTree.NextTree = Tree;
    };

    GtSyntaxTree.prototype.SetAnnotation = function (Annotation) {
        this.Annotation = Annotation;
    };

    GtSyntaxTree.prototype.IsError = function () {
        return this.KeyToken.IsError();
    };

    GtSyntaxTree.prototype.ToError = function (Token) {
        LibGreenTea.Assert(Token.IsError());
        this.KeyToken = Token;
        this.SubTreeList = null;
        this.Pattern = Token.PresetPattern;
    };

    GtSyntaxTree.prototype.IsMismatched = function () {
        return (this.Pattern == null);
    };

    GtSyntaxTree.prototype.ToMismatched = function () {
        this.SubTreeList = null;
        this.Pattern = null;
    };

    GtSyntaxTree.prototype.IsMismatchedOrError = function () {
        return this.IsMismatched() || this.KeyToken.IsError();
    };

    GtSyntaxTree.prototype.IsValidSyntax = function () {
        return !(this.IsMismatchedOrError());
    };

    GtSyntaxTree.prototype.ToEmptyOrError = function (ErrorTree) {
        if (ErrorTree == null) {
            this.ToMismatched();
        } else {
            this.ToError(ErrorTree.KeyToken);
        }
    };

    GtSyntaxTree.prototype.GetSyntaxTreeAt = function (Index) {
        if (this.SubTreeList != null && Index >= this.SubTreeList.size()) {
            return null;
        }
        return this.SubTreeList.get(Index);
    };

    GtSyntaxTree.prototype.SetSyntaxTreeAt = function (Index, Tree) {
        if (!this.IsError()) {
            if (Tree.IsError()) {
                this.ToError(Tree.KeyToken);
            } else {
                if (Index >= 0) {
                    if (this.SubTreeList == null) {
                        this.SubTreeList = new Array();
                    }
                    if (Index < this.SubTreeList.size()) {
                        this.SubTreeList.set(Index, Tree);
                        return;
                    }
                    while (this.SubTreeList.size() < Index) {
                        this.SubTreeList.add(null);
                    }
                    this.SubTreeList.add(Tree);
                    Tree.ParentTree = this;
                }
            }
        }
    };

    GtSyntaxTree.prototype.SetMatchedPatternAt = function (Index, NameSpace, TokenContext, PatternName, MatchFlag) {
        if (!this.IsMismatchedOrError()) {
            var ParsedTree = TokenContext.ParsePattern(NameSpace, PatternName, MatchFlag);
            if (ParsedTree != null) {
                this.SetSyntaxTreeAt(Index, ParsedTree);
            } else {
                if (IsFlag(MatchFlag, Required)) {
                    this.ToMismatched();
                }
            }
        }
    };

    GtSyntaxTree.prototype.SetMatchedTokenAt = function (Index, NameSpace, TokenContext, TokenText, MatchFlag) {
        if (!this.IsMismatchedOrError()) {
            var Pos = TokenContext.GetPosition(MatchFlag);
            var Token = TokenContext.Next();
            if (Token.ParsedText.equals(TokenText)) {
                if (Index == KeyTokenIndex) {
                    this.KeyToken = Token;
                } else if (Index != NoWhere) {
                    this.SetSyntaxTreeAt(Index, new GtSyntaxTree(null, NameSpace, Token, null));
                }
                if (IsFlag(MatchFlag, OpenSkipIndent)) {
                    TokenContext.SetSkipIndent(true);
                }
                if (IsFlag(MatchFlag, CloseSkipIndent)) {
                    TokenContext.SetSkipIndent(false);
                }
            } else {
                TokenContext.RollbackPosition(Pos, MatchFlag);
                if (IsFlag(MatchFlag, Required)) {
                    this.ToEmptyOrError(TokenContext.ReportExpectedToken(TokenText));
                }
            }
        }
    };

    GtSyntaxTree.prototype.AppendParsedTree2 = function (Tree) {
        if (!this.IsError()) {
            LibGreenTea.Assert(Tree != null);
            if (Tree.IsError()) {
                this.ToError(Tree.KeyToken);
            } else {
                if (this.SubTreeList == null) {
                    this.SubTreeList = new Array();
                }
                this.SubTreeList.add(Tree);
            }
        }
    };

    GtSyntaxTree.prototype.AppendMatchedPattern = function (NameSpace, TokenContext, PatternName, MatchFlag) {
        if (!this.IsMismatchedOrError()) {
            var ParsedTree = TokenContext.ParsePattern(NameSpace, PatternName, MatchFlag);
            if (ParsedTree != null) {
                this.AppendParsedTree2(ParsedTree);
            } else {
                if (IsFlag(MatchFlag, Required)) {
                    this.ToMismatched();
                }
            }
        }
    };

    GtSyntaxTree.prototype.GetParsedType = function () {
        return (this.ParsedValue instanceof GtType) ? this.ParsedValue : null;
    };

    GtSyntaxTree.prototype.HasNodeAt = function (Index) {
        if (this.SubTreeList != null && Index < this.SubTreeList.size()) {
            return this.SubTreeList.get(Index) != null;
        }
        return false;
    };

    GtSyntaxTree.prototype.TypeCheck = function (Gamma, ContextType, TypeCheckPolicy) {
        var Node = ApplyTypeFunc(this.Pattern.TypeFunc, Gamma, this, ContextType);
        return Gamma.TypeCheckSingleNode(this, Node, ContextType, TypeCheckPolicy);
    };

    GtSyntaxTree.prototype.TypeCheckAt = function (Index, Gamma, ContextType, TypeCheckPolicy) {
        var ParsedTree = this.GetSyntaxTreeAt(Index);
        if (ContextType == Gamma.VoidType || IsFlag(TypeCheckPolicy, BlockPolicy)) {
            return TypeBlock(Gamma, ParsedTree, ContextType);
        } else if (ParsedTree != null) {
            return ParsedTree.TypeCheck(Gamma, ContextType, TypeCheckPolicy);
        }
        return Gamma.CreateSyntaxErrorNode(this, "not empty");
    };

    GtSyntaxTree.prototype.TypeCheckParam = function (Gamma, TreeIndex, NodeList) {
        while (TreeIndex < LibGreenTea.ListSize(this.SubTreeList)) {
            var Node = this.TypeCheckAt(TreeIndex, Gamma, Gamma.VarType, DefaultTypeCheckPolicy);
            NodeList.add(Node);
            TreeIndex = TreeIndex + 1;
        }
    };

    GtSyntaxTree.prototype.ToConstTree = function (ConstValue) {
        this.Pattern = this.NameSpace.GetSyntaxPattern("$Const$");
        this.ParsedValue = ConstValue;
        return this;
    };

    GtSyntaxTree.prototype.CreateConstTree = function (ConstValue) {
        return new GtSyntaxTree(this.NameSpace.GetSyntaxPattern("$Const$"), this.NameSpace, this.KeyToken, ConstValue);
    };
    return GtSyntaxTree;
})();

var GtToken = (function () {
    function GtToken(text, FileLine) {
        this.TokenFlag = 0;
        this.ParsedText = text;
        this.FileLine = FileLine;
        this.PresetPattern = null;
    }
    GtToken.prototype.IsSource = function () {
        return IsFlag(this.TokenFlag, SourceTokenFlag);
    };

    GtToken.prototype.IsError = function () {
        return IsFlag(this.TokenFlag, ErrorTokenFlag);
    };

    GtToken.prototype.IsIndent = function () {
        return IsFlag(this.TokenFlag, IndentTokenFlag);
    };

    GtToken.prototype.IsDelim = function () {
        return IsFlag(this.TokenFlag, DelimTokenFlag);
    };

    GtToken.prototype.IsNextWhiteSpace = function () {
        return IsFlag(this.TokenFlag, WhiteSpaceTokenFlag);
    };

    GtToken.prototype.IsQuoted = function () {
        return IsFlag(this.TokenFlag, QuotedTokenFlag);
    };

    GtToken.prototype.IsNameSymbol = function () {
        return IsFlag(this.TokenFlag, NameSymbolTokenFlag);
    };

    GtToken.prototype.EqualsText = function (text) {
        return this.ParsedText.equals(text);
    };

    GtToken.prototype.toString = function () {
        var TokenText = "";
        if (this.PresetPattern != null) {
            TokenText = "(" + this.PresetPattern.PatternName + ") ";
        }
        return TokenText + this.ParsedText;
    };

    GtToken.prototype.SetErrorMessage = function (Message, ErrorPattern) {
        if (this.ParsedText.length > 0) {
            this.TokenFlag = ErrorTokenFlag;
            this.ParsedText = Message;
            this.PresetPattern = ErrorPattern;
        }
        return Message;
    };

    GtToken.prototype.GetErrorMessage = function () {
        LibGreenTea.Assert(this.IsError());
        return this.ParsedText;
    };

    GtToken.prototype.AddTypeInfoToErrorMessage = function (ClassType) {
        this.ParsedText += " of " + ClassType.ShortName;
        return this;
    };
    return GtToken;
})();

var GtTokenContext = (function () {
    function GtTokenContext(NameSpace, Text, FileLine) {
        this.IndentLevel = 0;
        this.TopLevelNameSpace = NameSpace;
        this.SourceList = new Array();
        this.CurrentPosition = 0;
        this.ParsingLine = FileLine;
        this.ParseFlag = 0;
        this.AddNewToken(Text, SourceTokenFlag, null);
        this.ParsingAnnotation = null;
        this.IndentLevel = 0;
        this.LatestToken = null;
    }
    GtTokenContext.prototype.AddNewToken = function (Text, TokenFlag, PatternName) {
        var Token = new GtToken(Text, this.ParsingLine);
        Token.TokenFlag |= TokenFlag;
        if (PatternName != null) {
            Token.PresetPattern = this.TopLevelNameSpace.GetSyntaxPattern(PatternName);
            LibGreenTea.Assert(Token.PresetPattern != null);
        }
        this.SourceList.add(Token);
        return Token;
    };

    GtTokenContext.prototype.FoundWhiteSpace = function () {
        var Token = this.SourceList.get(this.SourceList.size() - 1);
        Token.TokenFlag |= WhiteSpaceTokenFlag;
    };

    GtTokenContext.prototype.FoundLineFeed = function (line) {
        this.ParsingLine += line;
    };

    GtTokenContext.prototype.ReportTokenError1 = function (Level, Message, TokenText) {
        var Token = this.AddNewToken(TokenText, 0, "$Error$");
        this.TopLevelNameSpace.Context.ReportError(Level, Token, Message);
    };

    GtTokenContext.prototype.NewErrorSyntaxTree = function (Token, Message) {
        if (!this.IsAllowedBackTrack()) {
            this.TopLevelNameSpace.Context.ReportError(ErrorLevel, Token, Message);
            var ErrorTree = new GtSyntaxTree(Token.PresetPattern, this.TopLevelNameSpace, Token, null);
            return ErrorTree;
        }
        return null;
    };

    GtTokenContext.prototype.GetBeforeToken = function () {
        var pos = this.CurrentPosition - 1;
        while (pos >= 0 && pos < this.SourceList.size()) {
            var Token = this.SourceList.get(pos);
            if (IsFlag(Token.TokenFlag, IndentTokenFlag)) {
                pos -= 1;
                continue;
            }
            return Token;
        }
        return null;
    };

    GtTokenContext.prototype.SkipErrorStatement = function () {
        var LeastRecentToken = this.LatestToken;
        while (this.HasNext()) {
            var T = this.GetToken();
            if (T.IsDelim() || T.EqualsText("}")) {
                break;
            }
            this.TopLevelNameSpace.Context.ReportError(InfoLevel, T, "skipping: " + T.ParsedText);
            this.Next();
        }
        this.LatestToken = LeastRecentToken;
    };

    GtTokenContext.prototype.ReportTokenError2 = function (Token, Message, SkipToken) {
        if (this.IsAllowedBackTrack()) {
            return null;
        } else {
            var ErrorTree = this.NewErrorSyntaxTree(Token, Message);
            if (SkipToken) {
                this.SkipErrorStatement();
            }
            return ErrorTree;
        }
    };

    GtTokenContext.prototype.ReportExpectedToken = function (TokenText) {
        if (!this.IsAllowedBackTrack()) {
            var Token = this.GetBeforeToken();
            if (Token != null) {
                return this.NewErrorSyntaxTree(Token, TokenText + " is expected at " + Token.ParsedText);
            } else {
                Token = this.LatestToken;
                return this.NewErrorSyntaxTree(Token, TokenText + " is expected after " + Token.ParsedText);
            }
        }
        return null;
    };

    GtTokenContext.prototype.ReportExpectedPattern = function (Pattern) {
        return this.ReportExpectedToken("syntax pattern " + Pattern.PatternName);
    };

    GtTokenContext.prototype.ReportExpectedMessage = function (Token, Message, SkipToken) {
        return this.ReportTokenError2(Token, "expected " + Message + "; given = " + Token.ParsedText, SkipToken);
    };

    GtTokenContext.prototype.Vacume = function () {
    };

    GtTokenContext.prototype.DispatchFunc = function (ScriptSource, GtChar, pos) {
        var TokenFunc = this.TopLevelNameSpace.GetTokenFunc(GtChar);
        var NextIdx = ApplyTokenFunc(TokenFunc, this, ScriptSource, pos);
        if (NextIdx == MismatchedPosition) {
            LibGreenTea.VerboseLog(VerboseUndefined, "undefined tokenizer: " + ScriptSource.substring(pos, pos + 1));
            this.AddNewToken(ScriptSource.substring(pos, pos + 1), 0, null);
            return pos + 1;
        }
        return NextIdx;
    };

    GtTokenContext.prototype.Tokenize = function (ScriptSource, CurrentLine) {
        var currentPos = 0;
        var len = ScriptSource.length;
        this.ParsingLine = CurrentLine;
        while (currentPos < len) {
            var gtCode = AsciiToTokenMatrixIndex(LibGreenTea.CharAt(ScriptSource, currentPos));
            var nextPos = this.DispatchFunc(ScriptSource, gtCode, currentPos);
            if (currentPos >= nextPos) {
                break;
            }
            currentPos = nextPos;
        }
        this.Dump();
    };

    GtTokenContext.prototype.GetPosition = function (MatchFlag) {
        var Pos = this.CurrentPosition;
        if (IsFlag(MatchFlag, AllowLineFeed)) {
            this.SkipIndent();
        }
        if (IsFlag(MatchFlag, AllowAnnotation)) {
            this.SkipAndGetAnnotation(true);
        }
        return Pos;
    };

    GtTokenContext.prototype.RollbackPosition = function (Pos, MatchFlag) {
        this.CurrentPosition = Pos;
        if (IsFlag(MatchFlag, AllowAnnotation)) {
        }
    };

    GtTokenContext.prototype.GetToken = function () {
        while (this.CurrentPosition < this.SourceList.size()) {
            var Token = this.SourceList.get(this.CurrentPosition);
            if (Token.IsSource()) {
                this.SourceList.remove(this.SourceList.size() - 1);
                this.Tokenize(Token.ParsedText, Token.FileLine);
                if (this.CurrentPosition < this.SourceList.size()) {
                    Token = this.SourceList.get(this.CurrentPosition);
                } else {
                    break;
                }
            }
            if (IsFlag(this.ParseFlag, SkipIndentParseFlag) && Token.IsIndent()) {
                this.CurrentPosition = this.CurrentPosition + 1;
                continue;
            }

            this.LatestToken = Token;
            return Token;
        }

        return GtTokenContext.NullToken;
    };

    GtTokenContext.prototype.HasNext = function () {
        return (this.GetToken() != GtTokenContext.NullToken);
    };

    GtTokenContext.prototype.Next = function () {
        var Token = this.GetToken();
        this.CurrentPosition += 1;
        return Token;
    };

    GtTokenContext.prototype.SkipIndent = function () {
        var Token = this.GetToken();
        while (Token.IsIndent()) {
            this.CurrentPosition = this.CurrentPosition + 1;
            Token = this.GetToken();
        }
    };

    GtTokenContext.prototype.GetPattern = function (PatternName) {
        return this.TopLevelNameSpace.GetSyntaxPattern(PatternName);
    };

    GtTokenContext.prototype.GetFirstPattern = function (NameSpace) {
        var Token = this.GetToken();
        if (Token.PresetPattern != null) {
            return Token.PresetPattern;
        }
        var Pattern = NameSpace.GetSyntaxPattern(Token.ParsedText);
        if (Pattern == null) {
            return NameSpace.GetSyntaxPattern("$Symbol$");
        }
        return Pattern;
    };

    GtTokenContext.prototype.GetExtendedPattern = function (NameSpace) {
        var Token = this.GetToken();
        if (Token != GtTokenContext.NullToken) {
            var Pattern = NameSpace.GetExtendedSyntaxPattern(Token.ParsedText);
            return Pattern;
        }
        return null;
    };

    GtTokenContext.prototype.IsToken = function (TokenText) {
        var Token = this.GetToken();
        if (Token.EqualsText(TokenText)) {
            return true;
        }
        return false;
    };

    GtTokenContext.prototype.MatchToken = function (TokenText) {
        if (this.IsToken(TokenText)) {
            this.CurrentPosition += 1;
            return true;
        }
        return false;
    };

    GtTokenContext.prototype.MatchToken2 = function (TokenText, MatchFlag) {
        var Pos = this.GetPosition(MatchFlag);
        var Token = this.Next();
        if (Token.EqualsText(TokenText)) {
            return true;
        }
        this.RollbackPosition(Pos, MatchFlag);
        return false;
    };

    GtTokenContext.prototype.StartsWithToken = function (TokenText) {
        var Token = this.GetToken();
        if (Token.EqualsText(TokenText)) {
            this.CurrentPosition += 1;
            return true;
        }
        if (Token.ParsedText.startsWith(TokenText)) {
            Token = new GtToken(Token.ParsedText.substring(TokenText.length), Token.FileLine);
            this.CurrentPosition += 1;
            this.SourceList.add(this.CurrentPosition, Token);
            return true;
        }
        return false;
    };

    GtTokenContext.prototype.CreateSyntaxTree = function (NameSpace, Pattern, ConstValue) {
        if (ConstValue != null) {
            Pattern = NameSpace.GetSyntaxPattern("$Const$");
        }
        if ((typeof Pattern == 'string' || Pattern instanceof String)) {
            Pattern = NameSpace.GetSyntaxPattern(Pattern.toString());
        }
        return new GtSyntaxTree(Pattern, NameSpace, this.GetToken(), ConstValue);
    };

    GtTokenContext.prototype.CreateMatchedSyntaxTree = function (NameSpace, Pattern, TokenText) {
        var SyntaxTree = this.CreateSyntaxTree(NameSpace, Pattern, null);
        SyntaxTree.SetMatchedTokenAt(KeyTokenIndex, NameSpace, this, TokenText, Required);
        return SyntaxTree;
    };

    GtTokenContext.prototype.IsAllowedBackTrack = function () {
        return IsFlag(this.ParseFlag, BackTrackParseFlag);
    };

    GtTokenContext.prototype.SetBackTrack = function (Allowed) {
        var OldFlag = this.ParseFlag;
        if (Allowed) {
            this.ParseFlag = this.ParseFlag | BackTrackParseFlag;
        } else {
            this.ParseFlag = (~(BackTrackParseFlag) & this.ParseFlag);
        }
        return OldFlag;
    };

    GtTokenContext.prototype.SetSkipIndent = function (Allowed) {
        var OldFlag = this.ParseFlag;
        if (Allowed) {
            this.ParseFlag = this.ParseFlag | SkipIndentParseFlag;
        } else {
            this.ParseFlag = (~(SkipIndentParseFlag) & this.ParseFlag);
        }
        return OldFlag;
    };

    GtTokenContext.prototype.SetRememberFlag = function (OldFlag) {
        this.ParseFlag = OldFlag;
    };

    GtTokenContext.prototype.ParsePatternAfter = function (NameSpace, LeftTree, PatternName, MatchFlag) {
        var Pos = this.GetPosition(MatchFlag);
        var ParseFlag = this.ParseFlag;
        if (IsFlag(MatchFlag, Optional)) {
            this.ParseFlag = this.ParseFlag | BackTrackParseFlag;
        }
        var Pattern = this.GetPattern(PatternName);
        if (Pattern == null) {
            console.log("unknown pattern: " + PatternName);
        }
        var SyntaxTree = ApplySyntaxPattern(NameSpace, this, LeftTree, Pattern);
        this.ParseFlag = ParseFlag;
        if (SyntaxTree != null) {
            return SyntaxTree;
        }
        this.RollbackPosition(Pos, MatchFlag);
        return null;
    };

    GtTokenContext.prototype.ParsePattern = function (NameSpace, PatternName, MatchFlag) {
        return this.ParsePatternAfter(NameSpace, null, PatternName, MatchFlag);
    };

    GtTokenContext.prototype.SkipAndGetAnnotation = function (IsAllowedDelim) {
        this.ParsingAnnotation = null;
        this.SkipEmptyStatement();
        while (this.MatchToken("@")) {
            var Token = this.Next();
            if (this.ParsingAnnotation == null) {
                this.ParsingAnnotation = new GtMap();
            }
            this.ParsingAnnotation.put(Token.ParsedText, true);
            this.SkipIndent();
        }
        return this.ParsingAnnotation;
    };

    GtTokenContext.prototype.SkipEmptyStatement = function () {
        while (this.HasNext()) {
            var Token = this.GetToken();
            if (Token.IsIndent() || Token.IsDelim()) {
                this.CurrentPosition += 1;
                continue;
            }
            break;
        }
    };

    GtTokenContext.prototype.SkipIncompleteStatement = function () {
        this.SkipEmptyStatement();
    };

    GtTokenContext.prototype.Stringfy = function (PreText, BeginIdx, EndIdx) {
        var Buffer = PreText;
        var Position = BeginIdx;
        while (Position < EndIdx) {
            var Token = this.SourceList.get(Position);
            if (Token.IsIndent()) {
                Buffer += "\n";
            }
            Buffer += Token.ParsedText;
            if (Token.IsNextWhiteSpace()) {
                Buffer += " ";
            }
            Position += 1;
        }
        return Buffer;
    };

    GtTokenContext.prototype.Dump = function () {
        var Position = this.CurrentPosition;
        while (Position < this.SourceList.size()) {
            var Token = this.SourceList.get(Position);
            var DumpedToken = "[" + Position + "] " + Token;
            if (Token.PresetPattern != null) {
                DumpedToken = DumpedToken + " : " + Token.PresetPattern;
            }
            LibGreenTea.VerboseLog(VerboseToken, DumpedToken);
            Position += 1;
        }
    };

    GtTokenContext.prototype.SetSourceMap = function (SourceMap) {
        var Index = SourceMap.lastIndexOf(":");
        if (Index != -1) {
            var FileName = SourceMap.substring(0, Index);
            var Line = LibGreenTea.ParseInt(SourceMap.substring(Index + 1));
            this.ParsingLine = this.TopLevelNameSpace.Context.GetFileLine(FileName, Line);
        }
    };
    GtTokenContext.NullToken = new GtToken("", 0);
    return GtTokenContext;
})();

var GtType = (function () {
    function GtType(Context, TypeFlag, ShortName, DefaultNullValue, TypeBody) {
        this.Context = Context;
        this.ShortName = ShortName;
        this.TypeFlag = TypeFlag;
        this.DefaultNullValue = DefaultNullValue;
        this.TypeBody = TypeBody;
        this.SuperType = null;
        this.BaseType = this;
        this.ParentMethodSearch = Context.TopType;
        if (!IsFlag(TypeFlag, TypeVariable)) {
            this.TypeId = Context.TypePools.size();
            Context.TypePools.add(this);
        }
        this.TypeParams = null;
    }
    GtType.prototype.CreateSubType = function (ClassFlag, ClassName, DefaultNullValue, NativeSpec) {
        var SubType = new GtType(this.Context, ClassFlag, ClassName, DefaultNullValue, NativeSpec);
        SubType.SuperType = this;
        SubType.ParentMethodSearch = this;
        return SubType;
    };

    GtType.prototype.CreateGenericType = function (BaseIndex, TypeList, ShortName) {
        var i = BaseIndex;
        var TypeVariableFlag = 0;
        while (i < TypeList.size()) {
            if (TypeList.get(i).HasTypeVariable()) {
                TypeVariableFlag = GenericVariable;
                break;
            }
            i = i + 1;
        }
        var GenericType = new GtType(this.Context, this.TypeFlag | TypeVariableFlag, ShortName, null, null);
        GenericType.BaseType = this.BaseType;
        GenericType.ParentMethodSearch = this.BaseType;
        GenericType.SuperType = this.SuperType;
        GenericType.TypeParams = LibGreenTea.CompactTypeList(BaseIndex, TypeList);
        LibGreenTea.VerboseLog(VerboseType, "new generic type: " + GenericType.ShortName + ", ClassId=" + GenericType.TypeId);
        return GenericType;
    };

    GtType.prototype.IsAbstract = function () {
        return (this.TypeBody == null && this.SuperType == this.Context.StructType);
    };

    GtType.prototype.IsNative = function () {
        return IsFlag(this.TypeFlag, NativeType);
    };

    GtType.prototype.IsDynamic = function () {
        return IsFlag(this.TypeFlag, DynamicType);
    };

    GtType.prototype.IsUnboxType = function () {
        return IsFlag(this.BaseType.TypeFlag, UnboxType);
    };

    GtType.prototype.IsGenericType = function () {
        return (this.TypeParams != null);
    };

    GtType.prototype.IsFuncType = function () {
        return (this.BaseType == this.Context.FuncType);
    };

    GtType.prototype.IsTopType = function () {
        return (this == this.Context.TopType);
    };

    GtType.prototype.IsVoidType = function () {
        return (this == this.Context.VoidType);
    };

    GtType.prototype.IsVarType = function () {
        return (this == this.Context.VarType);
    };

    GtType.prototype.IsAnyType = function () {
        return (this == this.Context.AnyType);
    };

    GtType.prototype.IsTypeType = function () {
        return (this == this.Context.TypeType);
    };

    GtType.prototype.IsBooleanType = function () {
        return (this == this.Context.BooleanType);
    };

    GtType.prototype.IsIntType = function () {
        return (this == this.Context.IntType);
    };

    GtType.prototype.IsStringType = function () {
        return (this == this.Context.StringType);
    };

    GtType.prototype.IsArrayType = function () {
        return (this == this.Context.ArrayType);
    };

    GtType.prototype.IsEnumType = function () {
        return IsFlag(this.TypeFlag, EnumType);
    };
    GtType.prototype.SetUnrevealedType = function (StrongType) {
        this.BaseType = StrongType;
        this.TypeFlag |= UnrevealedType;
        this.ShortName = "_" + this.ShortName + "_";
    };
    GtType.prototype.IsUnrevealedType = function () {
        return IsFlag(this.TypeFlag, UnrevealedType);
    };
    GtType.prototype.GetRevealedType = function () {
        if (this.IsUnrevealedType()) {
            return this.BaseType;
        }
        return this;
    };

    GtType.prototype.toString = function () {
        return this.ShortName;
    };

    GtType.prototype.GetNativeName = function () {
        if (IsFlag(this.TypeFlag, ExportType)) {
            return this.ShortName;
        } else {
            return this.BaseType.ShortName + NativeNameSuffix + this.TypeId;
        }
    };

    GtType.prototype.GetUniqueName = function () {
        if (IsFlag(this.TypeFlag, TypeVariable)) {
            return this.ShortName;
        } else {
            if (LibGreenTea.DebugMode) {
                return this.BaseType.ShortName + NativeNameSuffix + this.TypeId;
            } else {
                return NativeNameSuffix + this.TypeId;
            }
        }
    };

    GtType.prototype.Accept = function (Type) {
        if (this == Type || this == this.Context.AnyType) {
            return true;
        }
        var SuperClass = Type.SuperType;
        while (SuperClass != null) {
            if (SuperClass == this) {
                return true;
            }
            SuperClass = SuperClass.SuperType;
        }
        return this.Context.CheckSubType(Type, this);
    };

    GtType.prototype.AcceptValue = function (Value) {
        return (Value != null) ? this.Accept(this.Context.GuessType(Value)) : true;
    };

    GtType.prototype.SetClassField = function (ClassField) {
        this.TypeBody = ClassField;
    };

    GtType.prototype.IsDynamicNaitiveLoading = function () {
        return this.IsNative();
    };

    GtType.prototype.IsTypeVariable = function () {
        return IsFlag(this.TypeFlag, TypeVariable);
    };

    GtType.prototype.HasTypeVariable = function () {
        return IsFlag(this.TypeFlag, TypeVariable) || IsFlag(this.TypeFlag, GenericVariable);
    };

    GtType.prototype.AppendTypeVariable = function (GenericNameSpace, Count) {
        if (IsFlag(this.TypeFlag, TypeVariable)) {
            var TypeVar = GenericNameSpace.GetType(this.ShortName);
            if (TypeVar != null && TypeVar.IsTypeVariable()) {
                return Count;
            }
            GenericNameSpace.SetSymbol(this.ShortName, this, null);
            return Count + 1;
        }
        if (IsFlag(this.TypeFlag, GenericVariable)) {
            var i = 0;
            while (i < this.TypeParams.length) {
                Count = this.TypeParams[i].AppendTypeVariable(GenericNameSpace, Count);
                i += 1;
            }
        }
        return Count;
    };

    GtType.prototype.GivenParamType = function (GivenType, ParamIndex) {
        if (GivenType.BaseType == this.BaseType && GivenType.TypeParams.length == this.TypeParams.length) {
            return GivenType.TypeParams[ParamIndex];
        }
        return GivenType;
    };

    GtType.prototype.RealType = function (GenericNameSpace, GivenType) {
        if (IsFlag(this.TypeFlag, TypeVariable)) {
            var TypeVar = GenericNameSpace.GetType(this.ShortName);

            if (TypeVar != null && TypeVar.IsTypeVariable()) {
                GenericNameSpace.SetSymbol(this.ShortName, GivenType, null);
                return GivenType;
            } else {
                return TypeVar;
            }
        }
        if (IsFlag(this.TypeFlag, GenericVariable)) {
            var i = 0;
            var TypeList = new Array();
            while (i < this.TypeParams.length) {
                var RealParamType = this.TypeParams[i].RealType(GenericNameSpace, this.GivenParamType(GivenType, i));
                TypeList.add(RealParamType);
                i += 1;
            }
            return this.Context.GetGenericType(this.BaseType, 0, TypeList, true);
        }
        return this;
    };

    GtType.prototype.Match = function (GenericNameSpace, GivenType) {
        if (IsFlag(this.TypeFlag, TypeVariable)) {
            var TypeVar = GenericNameSpace.GetType(this.ShortName);
            if (TypeVar.IsTypeVariable()) {
                GenericNameSpace.SetSymbol(this.ShortName, GivenType, null);
                return true;
            }
            return TypeVar.Accept(GivenType);
        }
        if (IsFlag(this.TypeFlag, GenericVariable)) {
            if (GivenType.BaseType == this.BaseType && GivenType.TypeParams.length == this.TypeParams.length) {
                var i = 0;
                while (i < this.TypeParams.length) {
                    if (!this.TypeParams[i].Match(GenericNameSpace, GivenType.TypeParams[i])) {
                        return false;
                    }
                    i += 1;
                }
                return true;
            }
            return false;
        }
        return this.Accept(GivenType);
    };
    return GtType;
})();

var GtTypeEnv = (function () {
    function GtTypeEnv(NameSpace) {
        this.NameSpace = NameSpace;
        this.Context = NameSpace.Context;
        this.Generator = NameSpace.Context.Generator;
        this.Func = null;
        this.FoundUncommonFunc = false;
        this.LocalStackList = new Array();
        this.StackTopIndex = 0;

        this.VoidType = NameSpace.Context.VoidType;
        this.BooleanType = NameSpace.Context.BooleanType;
        this.IntType = NameSpace.Context.IntType;
        this.StringType = NameSpace.Context.StringType;
        this.VarType = NameSpace.Context.VarType;
        this.AnyType = NameSpace.Context.AnyType;
        this.ArrayType = NameSpace.Context.ArrayType;
        this.FuncType = NameSpace.Context.FuncType;
    }
    GtTypeEnv.prototype.IsStrictMode = function () {
        return this.Generator.IsStrictMode();
    };

    GtTypeEnv.prototype.IsTopLevel = function () {
        return (this.Func == null);
    };

    GtTypeEnv.prototype.AppendRecv = function (RecvType) {
        var ThisName = this.Generator.GetRecvName();
        this.AppendDeclaredVariable(0, RecvType, ThisName, null, null);
        this.LocalStackList.get(this.StackTopIndex - 1).NativeName = ThisName;
    };

    GtTypeEnv.prototype.AppendDeclaredVariable = function (VarFlag, Type, Name, NameToken, InitValue) {
        var VarInfo = new GtVariableInfo(VarFlag, Type, Name, this.StackTopIndex, NameToken, InitValue);
        if (this.StackTopIndex < this.LocalStackList.size()) {
            this.LocalStackList.set(this.StackTopIndex, VarInfo);
        } else {
            this.LocalStackList.add(VarInfo);
        }
        this.StackTopIndex += 1;
        return VarInfo;
    };

    GtTypeEnv.prototype.LookupDeclaredVariable = function (Symbol) {
        var i = this.StackTopIndex - 1;
        while (i >= 0) {
            var VarInfo = this.LocalStackList.get(i);
            if (VarInfo.Name.equals(Symbol)) {
                return VarInfo;
            }
            i = i - 1;
        }
        return null;
    };

    GtTypeEnv.prototype.PushBackStackIndex = function (PushBackIndex) {
        var i = this.StackTopIndex - 1;
        while (i >= PushBackIndex) {
            var VarInfo = this.LocalStackList.get(i);
            VarInfo.Check();
            i = i - 1;
        }
        this.StackTopIndex = PushBackIndex;
    };

    GtTypeEnv.prototype.CheckFunc = function (FuncType, Func, SourceToken) {
        if (!this.FoundUncommonFunc && (!Func.Is(CommonFunc))) {
            this.FoundUncommonFunc = true;
            if (this.Func != null && this.Func.Is(CommonFunc)) {
                this.NameSpace.Context.ReportError(WarningLevel, SourceToken, "using uncommon " + FuncType + ": " + Func.FuncName);
            }
        }
    };

    GtTypeEnv.prototype.ReportTypeResult = function (ParsedTree, Node, Level, Message) {
        if (Level == ErrorLevel || (this.IsStrictMode() && Level == TypeErrorLevel)) {
            LibGreenTea.Assert(Node.Token == ParsedTree.KeyToken);
            this.NameSpace.Context.ReportError(ErrorLevel, Node.Token, Message);
            return this.Generator.CreateErrorNode(this.VoidType, ParsedTree);
        } else {
            this.NameSpace.Context.ReportError(Level, Node.Token, Message);
        }
        return Node;
    };

    GtTypeEnv.prototype.ReportTypeInference = function (SourceToken, Name, InfferedType) {
        this.Context.ReportError(InfoLevel, SourceToken, Name + " has type " + InfferedType);
    };

    GtTypeEnv.prototype.CreateSyntaxErrorNode = function (ParsedTree, Message) {
        this.NameSpace.Context.ReportError(ErrorLevel, ParsedTree.KeyToken, Message);
        return this.Generator.CreateErrorNode(this.VoidType, ParsedTree);
    };

    GtTypeEnv.prototype.UnsupportedTopLevelError = function (ParsedTree) {
        return this.CreateSyntaxErrorNode(ParsedTree, "unsupported " + ParsedTree.Pattern.PatternName + " at the top level");
    };

    GtTypeEnv.prototype.CreateLocalNode = function (ParsedTree, Name) {
        var VariableInfo = this.LookupDeclaredVariable(Name);
        if (VariableInfo != null) {
            return this.Generator.CreateLocalNode(VariableInfo.Type, ParsedTree, VariableInfo.NativeName);
        }
        return this.CreateSyntaxErrorNode(ParsedTree, "unresolved name: " + Name + "; not your fault");
    };

    GtTypeEnv.prototype.CreateDefaultValue = function (ParsedTree, Type) {
        return this.Generator.CreateConstNode(Type, ParsedTree, Type.DefaultNullValue);
    };

    GtTypeEnv.prototype.TypeCheckSingleNode = function (ParsedTree, Node, Type, TypeCheckPolicy) {
        LibGreenTea.Assert(Node != null);
        if (Node.IsErrorNode() || IsFlag(TypeCheckPolicy, NoCheckPolicy)) {
            return Node;
        }
        if (Node.Type.IsUnrevealedType()) {
            var Func = ParsedTree.NameSpace.GetConverterFunc(Node.Type, Node.Type.BaseType, true);

            Node = this.Generator.CreateCoercionNode(Func.GetReturnType(), Func, Node);
        }

        var ConstValue = Node.ToConstValue(IsFlag(TypeCheckPolicy, OnlyConstPolicy));
        if (ConstValue != null && !(Node instanceof GtConstNode)) {
            Node = this.Generator.CreateConstNode(Node.Type, ParsedTree, ConstValue);
        }
        if (IsFlag(TypeCheckPolicy, OnlyConstPolicy) && ConstValue == null) {
            if (IsFlag(TypeCheckPolicy, NullablePolicy) && Node.IsNullNode()) {
            } else {
                return this.CreateSyntaxErrorNode(ParsedTree, "value must be const");
            }
        }
        if (IsFlag(TypeCheckPolicy, AllowVoidPolicy) || Type == this.VoidType) {
            return Node;
        }
        if (Node.Type == this.VarType) {
            return this.ReportTypeResult(ParsedTree, Node, TypeErrorLevel, "unspecified type: " + Node.Token.ParsedText);
        }
        if (Node.Type == Type || Type == this.VarType || Node.Type.Accept(Type)) {
            return Node;
        }
        var Func = ParsedTree.NameSpace.GetConverterFunc(Node.Type, Type, true);
        if (Func != null && (Func.Is(CoercionFunc) || IsFlag(TypeCheckPolicy, CastPolicy))) {
            return this.Generator.CreateCoercionNode(Type, Func, Node);
        }
        console.log("node=" + LibGreenTea.GetClassName(Node) + "type error: requested = " + Type + ", given = " + Node.Type);
        return this.ReportTypeResult(ParsedTree, Node, TypeErrorLevel, "type error: requested = " + Type + ", given = " + Node.Type);
    };
    return GtTypeEnv;
})();

var GtVariableInfo = (function () {
    function GtVariableInfo(VarFlag, Type, Name, Index, NameToken, InitValue) {
        this.VariableFlag = VarFlag;
        this.Type = Type;
        this.NameToken = NameToken;
        this.Name = Name;
        this.NativeName = (NameToken == null) ? Name : NativeVariableName(Name, Index);
        this.InitValue = null;
        this.UsedCount = 0;
        this.DefCount = 1;
    }
    GtVariableInfo.prototype.Defined = function () {
        this.DefCount += 1;
        this.InitValue = null;
    };

    GtVariableInfo.prototype.Used = function () {
        this.UsedCount += 1;
    };

    GtVariableInfo.prototype.Check = function () {
        if (this.UsedCount == 0 && this.NameToken != null) {
            this.Type.Context.ReportError(WarningLevel, this.NameToken, "unused variable: " + this.Name);
        }
    };

    GtVariableInfo.prototype.toString = function () {
        return "(" + this.Type + " " + this.Name + ", " + this.NativeName + ")";
    };
    return GtVariableInfo;
})();

var JavaScriptSourceGenerator = (function (_super) {
    __extends(JavaScriptSourceGenerator, _super);
    function JavaScriptSourceGenerator(TargetCode, OutputFile, GeneratorFlag) {
        _super.call(this, TargetCode, OutputFile, GeneratorFlag);
        this.IsNodeJS = LibGreenTea.EqualsString(TargetCode, "nodejs");
    }
    JavaScriptSourceGenerator.prototype.VisitBlockJS = function (Node) {
        var Code = "";
        var CurrentNode = Node;
        while (CurrentNode != null) {
            var Statement = this.VisitNode(CurrentNode);
            if (Statement.trim().length > 0) {
                Code += this.GetIndentString() + Statement + ";" + this.LineFeed;
            }
            CurrentNode = CurrentNode.NextNode;
        }
        return Code;
    };

    JavaScriptSourceGenerator.prototype.VisitBlockJSWithIndent = function (Node) {
        var Code = "";
        Code += "{" + this.LineFeed;
        this.Indent();
        Code += this.VisitBlockJS(Node);
        this.UnIndent();
        Code += this.GetIndentString() + "}";
        return Code;
    };

    JavaScriptSourceGenerator.prototype.VisitBinaryNode = function (Node) {
        var FuncName = Node.Token.ParsedText;
        var Left = this.VisitNode(Node.LeftNode);
        var Right = this.VisitNode(Node.RightNode);
        var Source = "(" + SourceGenerator.GenerateApplyFunc2(Node.Func, FuncName, Left, Right) + ")";
        var operator = Node.Token.ParsedText;
        if (LibGreenTea.EqualsString(operator, "/")) {
            Source = "(" + Source + " | 0)";
        }
        this.PushSourceCode(Source);
    };

    JavaScriptSourceGenerator.prototype.VisitVarNode = function (Node) {
        var VarName = Node.NativeName;
        var Source = (this.UseLetKeyword ? "let " : "var ") + " " + VarName;
        if (Node.InitNode != null) {
            Node.InitNode.Evaluate(this);
            Source += " = " + this.PopSourceCode();
        }
        Source += ";";
        Source += this.VisitBlockJSWithIndent(Node.BlockNode);
        this.PushSourceCode(Source);
    };

    JavaScriptSourceGenerator.prototype.VisitIfNode = function (Node) {
        var ThenBlock = this.VisitBlockJSWithIndent(Node.ThenNode);
        var CondExpr = this.VisitNode(Node.CondExpr);
        var Source = "if(" + CondExpr + ") " + ThenBlock;
        if (Node.ElseNode != null) {
            Source = Source + " else " + this.VisitBlockJSWithIndent(Node.ElseNode);
        }
        this.PushSourceCode(Source);
    };

    JavaScriptSourceGenerator.prototype.VisitWhileNode = function (Node) {
        var LoopBody = this.VisitBlockJSWithIndent(Node.LoopBody);
        var CondExpr = this.VisitNode(Node.CondExpr);
        this.PushSourceCode("while(" + CondExpr + ") {" + LoopBody + "}");
    };

    JavaScriptSourceGenerator.prototype.VisitForNode = function (Node) {
        var LoopBody = this.VisitBlockJSWithIndent(Node.LoopBody);
        var IterExpr = this.VisitNode(Node.IterExpr);
        var CondExpr = this.VisitNode(Node.CondExpr);
        this.PushSourceCode("for(;" + CondExpr + "; " + IterExpr + ") {" + LoopBody + "}");
    };

    JavaScriptSourceGenerator.prototype.VisitDoWhileNode = function (Node) {
        var LoopBody = this.VisitBlockJSWithIndent(Node.LoopBody);
        var CondExpr = this.VisitNode(Node.CondExpr);
        this.PushSourceCode("do {" + LoopBody + "} while(" + CondExpr + ");");
    };

    JavaScriptSourceGenerator.prototype.VisitTryNode = function (Node) {
        var Code = "try ";
        Code += this.VisitBlockJSWithIndent(Node.TryBlock);
        if (Node.CatchExpr != null) {
            var Val = Node.CatchExpr;
            Code += " catch (" + Val.Type.toString() + " " + Val.NativeName + ") ";
            Code += this.VisitBlockJSWithIndent(Node.CatchBlock);
        }
        if (Node.FinallyBlock != null) {
            Code += " finally " + this.VisitBlockJSWithIndent(Node.FinallyBlock);
        }
        this.PushSourceCode(Code);
    };

    JavaScriptSourceGenerator.prototype.VisitThrowNode = function (Node) {
        var Expr = this.VisitNode(Node.Expr);
        this.PushSourceCode("throw " + Expr);
    };

    JavaScriptSourceGenerator.prototype.VisitErrorNode = function (Node) {
        var Expr = Node.Token.ParsedText;
        this.PushSourceCode("(function() {throw new Error(\"" + Expr + "\") })()");
    };

    JavaScriptSourceGenerator.prototype.GenerateFunc = function (Func, NameList, Body) {
        this.FlushErrorReport();
        var ArgCount = Func.Types.length - 1;
        var Code = "var " + Func.GetNativeFuncName() + " = (function(";
        var i = 0;
        while (i < ArgCount) {
            if (i > 0) {
                Code = Code + ", ";
            }
            Code = Code + NameList.get(i);
            i = i + 1;
        }
        Code = Code + ") " + this.VisitBlockJSWithIndent(Body) + ");";
        this.WriteLineCode(Code);
    };

    JavaScriptSourceGenerator.prototype.OpenClassField = function (Type, ClassField) {
        var TypeName = Type.ShortName;
        var Program = this.GetIndentString() + "var " + TypeName + " = (function() {" + this.LineFeed;

        this.Indent();
        Program += this.GetIndentString() + "function " + TypeName + "() {" + this.LineFeed;
        this.Indent();
        var i = 0;
        while (i < ClassField.FieldList.size()) {
            var FieldInfo = ClassField.FieldList.get(i);
            var InitValue = this.StringifyConstValue(FieldInfo.InitValue);
            if (!FieldInfo.Type.IsNative()) {
                InitValue = this.NullLiteral;
            }
            Program += this.GetIndentString() + "this" + "." + FieldInfo.NativeName + " = " + InitValue + ";" + this.LineFeed;
            i = i + 1;
        }
        this.UnIndent();
        Program += this.GetIndentString() + "};" + this.LineFeed;
        Program += this.GetIndentString() + "return " + TypeName + ";" + this.LineFeed;
        this.UnIndent();
        Program += this.GetIndentString() + "})();" + this.LineFeed;
        this.WriteLineCode(Program);
    };
    JavaScriptSourceGenerator.prototype.Eval = function (Node) {
        var ret = this.VisitBlockJS(Node);
        this.WriteLineCode(ret);
        return ret;
    };

    JavaScriptSourceGenerator.prototype.StartCompilationUnit = function () {
        if (this.IsNodeJS) {
            this.WriteLineCode("var assert = require('assert');");
        } else {
            this.WriteLineCode("var assert = console.assert;");
        }
    };

    JavaScriptSourceGenerator.prototype.InvokeMainFunc = function (MainFuncName) {
        this.WriteLineCode(MainFuncName + "();");
    };
    JavaScriptSourceGenerator.prototype.GetRecvName = function () {
        return "$__this";
    };
    return JavaScriptSourceGenerator;
})(SourceGenerator);

var BashSourceGenerator = (function (_super) {
    __extends(BashSourceGenerator, _super);
    function BashSourceGenerator(TargetCode, OutputFile, GeneratorFlag) {
        _super.call(this, TargetCode, OutputFile, GeneratorFlag);
        this.inFunc = false;
        this.inMainFunc = false;
        this.TrueLiteral = "0";
        this.FalseLiteral = "1";
        this.NullLiteral = LibGreenTea.QuoteString("__NULL__");
        this.MemberAccessOperator = "__MEMBER__";
        this.LineComment = "##";
        this.ParameterBegin = " ";
        this.ParameterEnd = "";
        this.ParameterDelimiter = "";
    }
    BashSourceGenerator.prototype.InitContext = function (Context) {
        _super.prototype.InitContext.call(this, Context);
        this.WriteLineHeader("#!/bin/bash");
        this.WriteLineCode(this.LineFeed + "source $GREENTEA_HOME/include/bash/GreenTeaPlus.sh" + this.LineFeed);
    };

    BashSourceGenerator.prototype.VisitBlockWithIndent = function (Node, NeedBlock) {
        return this.VisitBlockWithOption(Node, true, NeedBlock, false);
    };

    BashSourceGenerator.prototype.VisitBlockWithReplaceBreak = function (Node, allowDummyBlock) {
        return this.VisitBlockWithOption(Node, true, allowDummyBlock, true);
    };

    BashSourceGenerator.prototype.VisitBlockWithoutIndent = function (Node, allowDummyBlock) {
        return this.VisitBlockWithOption(Node, false, allowDummyBlock, false);
    };

    BashSourceGenerator.prototype.VisitBlockWithOption = function (Node, inBlock, allowDummyBlock, replaceBreak) {
        var Code = "";
        var isBreakReplaced = false;
        if (inBlock) {
            this.Indent();
        }
        var CurrentNode = Node;
        if (this.IsEmptyBlock(Node) && allowDummyBlock) {
            Code += this.GetIndentString() + "echo dummy block!! &> /dev/zero" + this.LineFeed;
        }
        while (!this.IsEmptyBlock(CurrentNode)) {
            var poppedCode = this.VisitNode(CurrentNode);
            if (replaceBreak && CurrentNode instanceof GtBreakNode) {
                isBreakReplaced = true;
                poppedCode = ";;";
            }
            if (!LibGreenTea.EqualsString(poppedCode, "")) {
                Code += this.GetIndentString() + poppedCode + this.LineFeed;
            }
            CurrentNode = CurrentNode.NextNode;
        }
        if (replaceBreak && !isBreakReplaced) {
            Code += this.GetIndentString() + ";&" + this.LineFeed;
        }
        if (inBlock) {
            this.UnIndent();
            Code += this.GetIndentString();
        } else {
            if (Code.length > 0) {
                Code = LibGreenTea.SubString(Code, 0, Code.length - 1);
            }
        }
        return Code;
    };

    BashSourceGenerator.prototype.CreateDoWhileNode = function (Type, ParsedTree, Cond, Block) {
        var BoolType = Type.Context.BooleanType;
        var VarName = "FirstCond";
        var TrueNode = this.CreateConstNode(BoolType, ParsedTree, true);
        var FalseNode = this.CreateConstNode(BoolType, ParsedTree, false);

        var FirstCond = this.CreateLocalNode(BoolType, ParsedTree, VarName);
        var NewCond = this.CreateOrNode(BoolType, ParsedTree, FirstCond, Cond);
        var LoopBody = this.CreateAssignNode(BoolType, ParsedTree, FirstCond, FalseNode);

        LinkNode(LoopBody.MoveTailNode(), Block);
        var NewWhileNode = this.CreateWhileNode(Type, ParsedTree, NewCond, LoopBody);
        return this.CreateVarNode(BoolType, ParsedTree, BoolType, VarName, TrueNode, NewWhileNode);
    };

    BashSourceGenerator.prototype.ResolveCondition = function (Node) {
        var Cond = this.VisitNode(Node);
        if (LibGreenTea.EqualsString(Cond, this.TrueLiteral)) {
            Cond = "((1 == 1))";
        } else if (LibGreenTea.EqualsString(Cond, this.FalseLiteral)) {
            Cond = "((1 != 1))";
        } else {
            if (Node instanceof GtLocalNode) {
                Cond = "((0 == " + this.ResolveValueType(Node, false) + "))";
            }
        }
        return Cond;
    };

    BashSourceGenerator.prototype.VisitWhileNode = function (Node) {
        var Program = "while " + this.ResolveCondition(Node.CondExpr) + " ;do" + this.LineFeed;
        Program += this.VisitBlockWithIndent(Node.LoopBody, true) + "done";
        this.PushSourceCode(Program);
    };

    BashSourceGenerator.prototype.VisitForNode = function (Node) {
        var Cond = this.ResolveCondition(Node.CondExpr);
        var Iter = this.VisitNode(Node.IterExpr);
        var Program = "for((; " + Cond + "; " + Iter + " )) ;do" + this.LineFeed;
        Program += this.VisitBlockWithIndent(Node.LoopBody, true) + "done";
        this.PushSourceCode(Program);
    };

    BashSourceGenerator.prototype.VisitForEachNode = function (Node) {
        var Variable = this.VisitNode(Node.Variable);
        var Iter = this.VisitNode(Node.IterExpr);
        var Program = "for " + Variable + " in " + "${" + Iter + "[@]} ;do" + this.LineFeed;
        Program += this.VisitBlockWithIndent(Node.LoopBody, true) + "done";
        this.PushSourceCode(Program);
    };

    BashSourceGenerator.prototype.MakeParamCode = function (ParamList, isAssert) {
        var Size = LibGreenTea.ListSize(ParamList);
        var ParamCode = new Array(Size);
        var i = 0;
        while (i < Size) {
            var ParamNode = ParamList.get(i);
            if (isAssert) {
                ParamCode[i] = this.ResolveCondition(ParamNode);
            } else {
                ParamCode[i] = this.ResolveValueType(ParamNode, false);
            }
            i = i + 1;
        }
        return ParamCode;
    };

    BashSourceGenerator.prototype.FindAssert = function (Func) {
        var isAssert = false;
        if (Func != null && Func.Is(NativeMacroFunc)) {
            if (LibGreenTea.EqualsString(Func.FuncName, "assert")) {
                isAssert = true;
            }
        }
        return isAssert;
    };

    BashSourceGenerator.prototype.VisitApplyNode = function (Node) {
        var ParamSize = LibGreenTea.ListSize(Node.NodeList);
        var Template = this.GenerateFuncTemplate(ParamSize, Node.Func);
        var isAssert = this.FindAssert(Node.Func);
        if (isAssert) {
            Template = "assert " + LibGreenTea.QuoteString("$1");
        }
        var ParamCode = this.MakeParamCode(Node.NodeList, isAssert);
        this.PushSourceCode(this.ApplyMacro2(Template, ParamCode));
    };

    BashSourceGenerator.prototype.VisitUnaryNode = function (Node) {
        var FuncName = Node.Token.ParsedText;
        var Func = Node.Func;
        var Expr = this.ResolveValueType(Node.Expr, false);
        var Macro = null;
        if (Func != null) {
            FuncName = Func.GetNativeFuncName();
            if (IsFlag(Func.FuncFlag, NativeMacroFunc)) {
                Macro = Func.GetNativeMacro();
            }
        }
        if (Macro == null) {
            Macro = "((" + FuncName + " $1))";
        }
        this.PushSourceCode(Macro.replace("$1", Expr));
    };

    BashSourceGenerator.prototype.VisitBinaryNode = function (Node) {
        var FuncName = Node.Token.ParsedText;
        var Func = Node.Func;
        var Left = this.ResolveValueType(Node.LeftNode, false);
        var Right = this.ResolveValueType(Node.RightNode, false);
        var Macro = null;
        if (Func != null) {
            FuncName = Func.GetNativeFuncName();
            if (IsFlag(Func.FuncFlag, NativeMacroFunc)) {
                Macro = Func.GetNativeMacro();
            }
        }
        if (Macro == null) {
            Macro = "(($1 " + FuncName + " $2))";
        }
        this.PushSourceCode(Macro.replace("$1", Left).replace("$2", Right));
    };

    BashSourceGenerator.prototype.GetMemberIndex = function (ClassType, MemberName) {
        return "$" + ClassType.ShortName + this.MemberAccessOperator + MemberName;
    };

    BashSourceGenerator.prototype.IsNativeType = function (Type) {
        if (Type != null && Type.IsNative()) {
            return true;
        }
        return false;
    };

    BashSourceGenerator.prototype.VisitGetterNode = function (Node) {
        this.PushSourceCode(this.VisitNode(Node.ExprNode) + "[" + this.GetMemberIndex(Node.ExprNode.Type, Node.Func.FuncName) + "]");
    };

    BashSourceGenerator.prototype.VisitIndexerNode = function (Node) {
        this.PushSourceCode(this.VisitNode(Node.Expr) + "[" + this.ResolveValueType(Node.GetAt(0), false) + "]");
    };

    BashSourceGenerator.prototype.VisitAndNode = function (Node) {
        this.PushSourceCode("(" + this.ResolveCondition(Node.LeftNode) + " && " + this.ResolveCondition(Node.RightNode) + ")");
    };

    BashSourceGenerator.prototype.VisitOrNode = function (Node) {
        this.PushSourceCode("(" + this.ResolveCondition(Node.LeftNode) + " || " + this.ResolveCondition(Node.RightNode) + ")");
    };

    BashSourceGenerator.prototype.VisitAssignNode = function (Node) {
        this.PushSourceCode(this.VisitNode(Node.LeftNode) + "=" + this.ResolveValueType(Node.RightNode, true));
    };

    BashSourceGenerator.prototype.VisitSelfAssignNode = function (Node) {
        var FuncName = Node.Token.ParsedText;
        var Func = Node.Func;
        var Left = this.VisitNode(Node.LeftNode);
        var Right = this.ResolveValueType(Node.RightNode, false);
        var Macro = null;
        if (Func != null) {
            FuncName = Func.GetNativeFuncName();
            if (IsFlag(Func.FuncFlag, NativeMacroFunc)) {
                Macro = Func.GetNativeMacro();
            }
        }
        if (Macro == null) {
            Macro = "(($1 " + FuncName + " $2))";
        }
        this.PushSourceCode(Macro.replace("$1", Left).replace("$2", Right));
    };

    BashSourceGenerator.prototype.VisitVarNode = function (Node) {
        var VarName = Node.NativeName;
        var Declare = "declare ";
        var Option = "";
        if (this.inFunc) {
            Declare = "local ";
        }
        if (!this.IsNativeType(Node.DeclType)) {
            Option = "-a ";
        }

        var Code = Declare + Option + VarName + this.LineFeed;
        Code += this.GetIndentString() + VarName;
        if (Node.InitNode != null) {
            Code += "=" + this.ResolveValueType(Node.InitNode, true);
        }
        Code += this.LineFeed;
        this.PushSourceCode(Code + this.VisitBlockWithoutIndent(Node.BlockNode, false));
    };

    BashSourceGenerator.prototype.VisitTrinaryNode = function (Node) {
        var CondExpr = this.ResolveCondition(Node.ConditionNode);
        var Then = this.ResolveValueType(Node.ThenNode, false);
        var Else = this.ResolveValueType(Node.ElseNode, false);
        this.PushSourceCode("((" + CondExpr + " ? " + Then + " : " + Else + "))");
    };

    BashSourceGenerator.prototype.VisitIfNode = function (Node) {
        var CondExpr = this.ResolveCondition(Node.CondExpr);
        var ThenBlock = this.VisitBlockWithIndent(Node.ThenNode, true);
        var Code = "if " + CondExpr + " ;then" + this.LineFeed + ThenBlock;
        if (!this.IsEmptyBlock(Node.ElseNode)) {
            Code += "else" + this.LineFeed + this.VisitBlockWithIndent(Node.ElseNode, false);
        }
        Code += "fi";
        this.PushSourceCode(Code);
    };

    BashSourceGenerator.prototype.VisitSwitchNode = function (Node) {
        var Match = this.ResolveValueType(Node.MatchNode, false);
        var Code = "case " + Match + " in" + this.LineFeed + this.GetIndentString();
        var i = 0;
        while (i < LibGreenTea.ListSize(Node.CaseList)) {
            var Case = Node.CaseList.get(i);
            var Block = Node.CaseList.get(i + 1);
            Code += this.VisitNode(Case) + ")" + this.LineFeed;
            Code += this.VisitBlockWithReplaceBreak(Block, true);
            i = i + 2;
        }
        if (Node.DefaultBlock != null) {
            Code += "*)" + this.LineFeed;
            Code += this.VisitBlockWithReplaceBreak(Node.DefaultBlock, false);
        }
        Code += "esac";
        this.PushSourceCode(Code);
    };

    BashSourceGenerator.prototype.VisitReturnNode = function (Node) {
        if (!this.inFunc) {
            return;
        }

        if (Node.Expr != null) {
            var Ret = this.ResolveValueType(Node.Expr, false);
            if (Node.Type.equals(Node.Type.Context.BooleanType) || (Node.Type.equals(Node.Type.Context.IntType) && this.inMainFunc)) {
                this.PushSourceCode("return " + Ret);
                return;
            }
            this.PushSourceCode("echo " + Ret + this.LineFeed + this.GetIndentString() + "return 0");
            return;
        }
        this.PushSourceCode("return 0");
    };

    BashSourceGenerator.prototype.VisitTryNode = function (Node) {
        var TrueNode = new GtConstNode(Node.Type.Context.BooleanType, null, true);
        var Code = "trap ";
        var Try = this.VisitNode(new GtIfNode(null, null, TrueNode, Node.TryBlock, null));
        var Catch = this.VisitNode(new GtIfNode(null, null, TrueNode, Node.CatchBlock, null));
        Code += LibGreenTea.QuoteString(Catch) + " ERR" + this.LineFeed;
        Code += this.GetIndentString() + Try + this.LineFeed + this.GetIndentString() + "trap ERR";
        if (Node.FinallyBlock != null) {
            var Finally = this.VisitNode(new GtIfNode(null, null, TrueNode, Node.FinallyBlock, null));
            Code += this.LineFeed + this.GetIndentString() + Finally;
        }
        this.PushSourceCode(Code);
    };

    BashSourceGenerator.prototype.VisitThrowNode = function (Node) {
        this.PushSourceCode("kill &> /dev/zero");
    };

    BashSourceGenerator.prototype.VisitErrorNode = function (Node) {
        this.PushSourceCode("echo " + LibGreenTea.QuoteString(Node.Token.ParsedText) + " >&2");
    };

    BashSourceGenerator.prototype.VisitCommandNode = function (Node) {
        var Code = "";
        var count = 0;
        var Type = Node.Type;
        var CurrentNode = Node;
        while (CurrentNode != null) {
            if (count > 0) {
                Code += " | ";
            }
            Code += this.AppendCommand(CurrentNode);
            CurrentNode = CurrentNode.PipedNextNode;
            count += 1;
        }

        if (Type.equals(Type.Context.StringType)) {
            Code = "execCommadString " + LibGreenTea.QuoteString(Code);
        } else if (Type.equals(Type.Context.BooleanType)) {
            Code = "execCommadBool " + LibGreenTea.QuoteString(Code);
        }
        this.PushSourceCode(Code);
    };

    BashSourceGenerator.prototype.AppendCommand = function (CurrentNode) {
        var Code = "";
        var size = LibGreenTea.ListSize(CurrentNode.ArgumentList);
        var i = 0;
        while (i < size) {
            Code += this.ResolveValueType(CurrentNode.ArgumentList.get(i), false) + " ";
            i = i + 1;
        }
        return Code;
    };

    BashSourceGenerator.prototype.CheckConstFolding = function (TargetNode) {
        if (TargetNode instanceof GtConstNode) {
            return true;
        } else if (TargetNode instanceof GtUnaryNode) {
            var Unary = TargetNode;
            return this.CheckConstFolding(Unary.Expr);
        } else if (TargetNode instanceof GtBinaryNode) {
            var Binary = TargetNode;
            if (this.CheckConstFolding(Binary.LeftNode) && this.CheckConstFolding(Binary.RightNode)) {
                return true;
            }
        }
        return false;
    };

    BashSourceGenerator.prototype.ResolveValueType = function (TargetNode, isAssign) {
        var ResolvedValue;
        var Value = this.VisitNode(TargetNode);
        var Type = TargetNode.Type;

        if (this.CheckConstFolding(TargetNode)) {
            return Value;
        }

        if (Type != null && Type.equals(Type.Context.BooleanType)) {
            if (TargetNode instanceof GtApplyNode || TargetNode instanceof GtUnaryNode || TargetNode instanceof GtCommandNode || TargetNode instanceof GtBinaryNode) {
                return "$(valueOfBool " + LibGreenTea.QuoteString(Value) + ")";
            }
        }

        if (TargetNode instanceof GtConstNode || TargetNode instanceof GtNullNode) {
            return Value;
        } else if (TargetNode instanceof GtIndexerNode || TargetNode instanceof GtGetterNode) {
            ResolvedValue = "${" + Value + "}";
        } else if (TargetNode instanceof GtApplyNode || TargetNode instanceof GtCommandNode || TargetNode instanceof GtConstructorNode) {
            ResolvedValue = "$(" + Value + ")";
        } else if (TargetNode instanceof GtLocalNode && !this.IsNativeType(Type)) {
            var Local = TargetNode;
            var Name = Local.NativeName;
            ResolvedValue = "${" + Value + "[@]}";
            if (Name.length == 1 && LibGreenTea.IsDigit(Name, 0)) {
                ResolvedValue = "$" + Value;
            }
        } else {
            ResolvedValue = "$" + Value;
        }

        if (isAssign) {
            if (!this.IsNativeType(Type)) {
                ResolvedValue = "(" + ResolvedValue + ")";
                return ResolvedValue;
            }
        }

        if (Type != null) {
            if (Type.equals(Type.Context.StringType) || !this.IsNativeType(Type)) {
                ResolvedValue = LibGreenTea.QuoteString(ResolvedValue);
            }
        }
        return ResolvedValue;
    };

    BashSourceGenerator.prototype.GenerateFunc = function (Func, ParamNameList, Body) {
        this.FlushErrorReport();
        var Function = "";
        var FuncName = Func.GetNativeFuncName();
        this.inFunc = true;
        if (LibGreenTea.EqualsString(FuncName, "main")) {
            this.inMainFunc = true;
        }
        Function += FuncName + "() {" + this.LineFeed;
        this.Indent();

        var i = 0;
        while (i < ParamNameList.size()) {
            var ParamType = Func.GetFuncParamType(i);

            Function += this.GetIndentString() + "local ";
            if (!this.IsNativeType(ParamType)) {
                Function += "-a ";
            }
            Function += ParamNameList.get(i) + ";" + this.LineFeed + this.GetIndentString();

            Function += ParamNameList.get(i) + "=$" + (i + 1) + ";" + this.LineFeed;
            i = i + 1;
        }

        Function += this.VisitBlockWithoutIndent(Body, true) + this.LineFeed;
        this.UnIndent();
        Function += this.GetIndentString() + "}" + this.LineFeed;
        this.WriteLineCode(Function);
        this.inFunc = false;
        this.inMainFunc = false;
    };

    BashSourceGenerator.prototype.GetNewOperator = function (Type) {
        return LibGreenTea.QuoteString("$(__NEW__" + Type.ShortName + ")");
    };

    BashSourceGenerator.prototype.OpenClassField = function (Type, ClassField) {
        var Program = "__NEW__" + Type.ShortName + "() {" + this.LineFeed;
        this.WriteLineCode("#### define class " + Type.ShortName + " ####");
        this.Indent();
        Program += this.GetIndentString() + "local -a " + this.GetRecvName() + this.LineFeed;

        var i = 0;
        while (i < LibGreenTea.ListSize(ClassField.FieldList)) {
            var FieldInfo = ClassField.FieldList.get(i);
            var InitValue = this.StringifyConstValue(FieldInfo.InitValue);
            if (!FieldInfo.Type.IsNative()) {
                InitValue = "NULL";
            }
            this.WriteLineCode(Type.ShortName + this.MemberAccessOperator + FieldInfo.NativeName + "=" + i);

            Program += this.GetIndentString() + this.GetRecvName();
            Program += "[" + this.GetMemberIndex(Type, FieldInfo.NativeName) + "]=" + InitValue + this.LineFeed;
            i = i + 1;
        }
        Program += this.GetIndentString() + "echo ";
        Program += LibGreenTea.QuoteString("${" + this.GetRecvName() + "[@]}") + this.LineFeed;
        this.UnIndent();
        Program += "}";

        this.WriteLineCode(this.LineFeed + Program);
    };

    BashSourceGenerator.prototype.Eval = function (Node) {
        var Code = this.VisitBlockWithoutIndent(Node, false);
        if (!LibGreenTea.EqualsString(Code, "")) {
            this.WriteLineCode(Code);
        }
        return Code;
    };

    BashSourceGenerator.prototype.InvokeMainFunc = function (MainFuncName) {
        this.WriteLineCode(MainFuncName);
    };
    return BashSourceGenerator;
})(SourceGenerator);

var CSourceGenerator = (function (_super) {
    __extends(CSourceGenerator, _super);
    function CSourceGenerator(TargetCode, OutputFile, GeneratorFlag) {
        _super.call(this, TargetCode, OutputFile, GeneratorFlag);
        this.TrueLiteral = "1";
        this.FalseLiteral = "0";
        this.Tab = "\t";
        this.NullLiteral = "NULL";
        this.MemberAccessOperator = "->";
    }
    CSourceGenerator.prototype.InitContext = function (Context) {
        _super.prototype.InitContext.call(this, Context);
    };

    CSourceGenerator.prototype.GetLocalType = function (Type, IsPointer) {
        if (Type.IsDynamic() || Type.IsNative()) {
            if (Type == Type.PackageNameSpace.Context.BooleanType) {
                return "int";
            }
            return Type.ShortName;
        }
        var TypeName = "struct " + Type.ShortName;
        if (IsPointer) {
            TypeName += "*";
        }
        return TypeName;
    };
    CSourceGenerator.prototype.NativeTypeName = function (Type) {
        return this.GetLocalType(Type, false);
    };

    CSourceGenerator.prototype.LocalTypeName = function (Type) {
        return this.GetLocalType(Type, true);
    };

    CSourceGenerator.prototype.GtTypeName = function (Type) {
        return Type.ShortName;
    };

    CSourceGenerator.prototype.GetNewOperator = function (Type) {
        var TypeName = this.GtTypeName(Type);
        return "NEW_" + TypeName + "()";
    };

    CSourceGenerator.prototype.VisitWhileNode = function (Node) {
        var Program = "while(" + this.VisitNode(Node.CondExpr) + ")";
        Program += this.VisitBlockWithIndent(Node.LoopBody, true);
        this.PushSourceCode(Program);
    };

    CSourceGenerator.prototype.VisitDoWhileNode = function (Node) {
        var Program = "do" + this.VisitBlockWithIndent(Node.LoopBody, true);
        Program += " while(" + this.VisitNode(Node.CondExpr) + ")";
        this.PushSourceCode(Program);
    };

    CSourceGenerator.prototype.VisitForNode = function (Node) {
        var Cond = this.VisitNode(Node.CondExpr);
        var Iter = this.VisitNode(Node.IterExpr);
        var Program = "for(; " + Cond + "; " + Iter + ") ";
        Program += this.VisitBlockWithIndent(Node.LoopBody, true);
        this.PushSourceCode(Program);
    };

    CSourceGenerator.prototype.VisitGetterNode = function (Node) {
        var Program = this.VisitNode(Node.ExprNode);
        var FieldName = Node.Func.FuncName;
        var RecvType = Node.Func.GetRecvType();
        if (Node.ExprNode.Type == RecvType) {
            Program = Program + "->" + FieldName;
        } else {
            Program = "GT_GetField(" + this.LocalTypeName(RecvType) + ", " + Program + ", " + FieldName + ")";
        }
        this.PushSourceCode(Program);
    };

    CSourceGenerator.prototype.VisitVarNode = function (Node) {
        var Type = this.LocalTypeName(Node.DeclType);
        var VarName = Node.NativeName;
        var Code = Type + " " + VarName;
        var CreateNewScope = true;
        if (Node.InitNode != null) {
            Code += " = " + this.VisitNode(Node.InitNode);
        }
        Code += ";" + this.LineFeed;
        if (CreateNewScope) {
            Code += this.GetIndentString();
        }
        Code += this.VisitBlockWithIndent(Node.BlockNode, CreateNewScope);
        this.PushSourceCode(Code + this.PopSourceCode());
    };

    CSourceGenerator.prototype.VisitIfNode = function (Node) {
        var CondExpr = this.VisitNode(Node.CondExpr);
        var ThenBlock = this.VisitBlockWithIndent(Node.ThenNode, true);
        var Code = "if(" + CondExpr + ") " + ThenBlock;
        if (Node.ElseNode != null) {
            Code += " else " + this.VisitBlockWithIndent(Node.ElseNode, true);
        }
        this.PushSourceCode(Code);
    };

    CSourceGenerator.prototype.VisitTryNode = function (Node) {
        var Code = "try ";
        Code += this.VisitBlockWithIndent(Node.TryBlock, true);
        if (Node.CatchExpr != null) {
            var Val = Node.CatchExpr;
            Code += " catch (" + Val.Type.toString() + " " + Val.NativeName + ") ";
            Code += this.VisitBlockWithIndent(Node.CatchBlock, true);
        }
        if (Node.FinallyBlock != null) {
            Code += " finally " + this.VisitBlockWithIndent(Node.FinallyBlock, true);
        }
        this.PushSourceCode(Code);
    };

    CSourceGenerator.prototype.VisitThrowNode = function (Node) {
        var Code = "throw " + this.VisitNode(Node.Expr);
        this.PushSourceCode(Code);
        this.StopVisitor(Node);
    };

    CSourceGenerator.prototype.VisitErrorNode = function (Node) {
        var Code = "throw Error(\"" + Node.Token.ParsedText + "\")";
        this.PushSourceCode(Code);
        this.StopVisitor(Node);
    };

    CSourceGenerator.prototype.VisitCommandNode = function (Node) {
        var Code = "system(";
        var i = 0;
        var Command = "String __Command = ";
        while (i < LibGreenTea.ListSize(Node.ArgumentList)) {
            var Param = Node.ArgumentList.get(i);
            if (i != 0) {
                Command += " + ";
            }
            Param.Evaluate(this);
            Command += "(" + this.PopSourceCode() + ")";
            i = i + 1;
        }
        Code = Command + ";" + this.LineFeed + this.GetIndentString() + Code + "__Command)";
        this.PushSourceCode(Code);
    };

    CSourceGenerator.prototype.GenerateFunc = function (Func, ParamNameList, Body) {
        this.FlushErrorReport();
        var Code = "";
        if (!Func.Is(ExportFunc)) {
            Code = "static ";
        }

        var RetTy = this.LocalTypeName(Func.GetReturnType());
        Code += RetTy + " " + Func.GetNativeFuncName() + "(";
        var i = 0;
        while (i < ParamNameList.size()) {
            var ParamTy = this.LocalTypeName(Func.GetFuncParamType(i));
            if (i > 0) {
                Code += ", ";
            }
            Code += ParamTy + " " + ParamNameList.get(i);
            i = i + 1;
        }
        Code += ")";
        Code += this.VisitBlockWithIndent(Body, true);
        this.WriteLineCode(Code);
    };

    CSourceGenerator.prototype.Eval = function (Node) {
        var Code = this.VisitBlockWithIndent(Node, false);
        if (LibGreenTea.EqualsString(Code, ";" + this.LineFeed)) {
            return "";
        }
        this.WriteLineCode(Code);
        return Code;
    };

    CSourceGenerator.prototype.OpenClassField = function (Type, ClassField) {
        var TypeName = Type.ShortName;
        var LocalType = this.LocalTypeName(Type);
        var Program = this.GetIndentString() + "struct " + TypeName + " {" + this.LineFeed;
        this.Indent();
        if (Type.SuperType != null) {
            Program += this.GetIndentString() + "// " + this.LocalTypeName(Type.SuperType) + " __base;" + this.LineFeed;
        }
        var i = 0;
        while (i < ClassField.FieldList.size()) {
            var FieldInfo = ClassField.FieldList.get(i);
            var VarType = FieldInfo.Type;
            var VarName = FieldInfo.NativeName;
            Program += this.GetIndentString() + this.LocalTypeName(VarType) + " " + VarName + ";" + this.LineFeed;
            i = i + 1;
        }
        this.UnIndent();
        Program += this.GetIndentString() + "};" + this.LineFeed;
        Program += this.GetIndentString() + LocalType + " NEW_" + TypeName + "() {" + this.LineFeed;
        this.Indent();
        i = 0;
        Program += this.GetIndentString() + LocalType + " " + this.GetRecvName() + " = " + "GT_New(" + LocalType + ");" + this.LineFeed;
        while (i < ClassField.FieldList.size()) {
            var FieldInfo = ClassField.FieldList.get(i);
            var VarName = FieldInfo.NativeName;
            var InitValue = this.StringifyConstValue(FieldInfo.InitValue);
            if (!FieldInfo.Type.IsNative()) {
                InitValue = this.NullLiteral;
            }
            Program += this.GetIndentString() + this.GetRecvName() + "->" + VarName + " = " + InitValue + ";" + this.LineFeed;
            i = i + 1;
        }
        Program += this.GetIndentString() + "return " + this.GetRecvName() + ";" + this.LineFeed;
        this.UnIndent();
        Program += this.GetIndentString() + "};";

        this.WriteLineCode(Program);
    };

    CSourceGenerator.prototype.StartCompilationUnit = function () {
        this.WriteLineCode("#include \"GreenTeaPlus.h\"");
    };

    CSourceGenerator.prototype.GetRecvName = function () {
        return "self";
    };
    return CSourceGenerator;
})(SourceGenerator);

var PerlSourceGenerator = (function (_super) {
    __extends(PerlSourceGenerator, _super);
    function PerlSourceGenerator(TargetCode, OutputFile, GeneratorFlag) {
        _super.call(this, "perl", OutputFile, GeneratorFlag);
        this.TrueLiteral = "1";
        this.FalseLiteral = "0";
        this.NullLiteral = "undef";
        this.LineComment = "##";
        this.MemberAccessOperator = "->";
        this.BreakKeyword = "last";
        this.ContinueKeyword = "next";
    }
    PerlSourceGenerator.prototype.VisitBlockEachStatementWithIndent = function (Node) {
        var Code = "{" + this.LineFeed;
        this.Indent();
        var CurrentNode = Node;
        while (CurrentNode != null) {
            CurrentNode.Evaluate(this);
            Code += this.GetIndentString() + this.PopSourceCode() + ";" + this.LineFeed;
            CurrentNode = CurrentNode.NextNode;
        }
        this.UnIndent();
        Code += this.GetIndentString() + "}";
        this.PushSourceCode(Code);
    };

    PerlSourceGenerator.prototype.GetNewOperator = function (Type) {
        return Type.ShortName + "->new";
    };

    PerlSourceGenerator.prototype.VisitWhileNode = function (Node) {
        Node.CondExpr.Evaluate(this);
        var Program = "while(" + this.PopSourceCode() + ")";
        this.VisitBlockEachStatementWithIndent(Node.LoopBody);
        Program += this.PopSourceCode();
        this.PushSourceCode(Program);
    };

    PerlSourceGenerator.prototype.VisitDoWhileNode = function (Node) {
        var Program = "do {";
        this.VisitBlockEachStatementWithIndent(Node.LoopBody);
        Program += this.PopSourceCode();
        Node.CondExpr.Evaluate(this);
        Program += "} while(" + this.PopSourceCode() + ")";
        this.PushSourceCode(Program);
    };

    PerlSourceGenerator.prototype.VisitForNode = function (Node) {
        Node.IterExpr.Evaluate(this);
        Node.CondExpr.Evaluate(this);
        var Cond = this.PopSourceCode();
        var Iter = this.PopSourceCode();

        var Program = "for(; " + Cond + "; " + Iter + ")";
        this.VisitBlockEachStatementWithIndent(Node.LoopBody);
        Program += this.PopSourceCode();
        this.PushSourceCode(Program);
    };

    PerlSourceGenerator.prototype.VisitLocalNode = function (Node) {
        this.PushSourceCode("$" + Node.NativeName);
    };

    PerlSourceGenerator.prototype.VisitVarNode = function (Node) {
        var VarName = Node.NativeName;
        var Code = "my $" + VarName;
        if (Node.InitNode != null) {
            Code += " = " + this.VisitNode(Node.InitNode);
        }
        Code += ";" + this.LineFeed;
        Code += this.GetIndentString();
        this.VisitBlockEachStatementWithIndent(Node.BlockNode);
        this.PushSourceCode(Code + this.PopSourceCode());
    };

    PerlSourceGenerator.prototype.VisitGetterNode = function (Node) {
        this.PushSourceCode(this.VisitNode(Node.ExprNode) + this.MemberAccessOperator + "{'" + Node.Func.FuncName + "'}");
    };

    PerlSourceGenerator.prototype.VisitIfNode = function (Node) {
        var CondExpr = this.VisitNode(Node.CondExpr);
        this.VisitBlockEachStatementWithIndent(Node.ThenNode);
        var ThenBlock = this.PopSourceCode();
        var Code = "if(" + CondExpr + ") " + ThenBlock;
        if (Node.ElseNode != null) {
            this.VisitBlockEachStatementWithIndent(Node.ElseNode);
            Code += " else " + this.PopSourceCode();
        }
        this.PushSourceCode(Code);
    };

    PerlSourceGenerator.prototype.VisitTryNode = function (Node) {
        var Code = "try ";
        Code += this.VisitBlockWithIndent(Node.TryBlock, true);
        if (Node.CatchExpr != null) {
            var Val = Node.CatchExpr;
            Code += " catch " + Val.Type.toString() + " with {" + this.LineFeed;
            this.Indent();
            Code += this.GetIndentString() + "my $" + Val.NativeName + " = shift;" + this.LineFeed;
            Code += this.GetIndentString() + this.VisitBlockWithIndent(Node.CatchBlock, false);
            Code += "}";
        }
        if (Node.FinallyBlock != null) {
            Code += " finally " + this.VisitBlockWithIndent(Node.FinallyBlock, true);
        }
        this.PushSourceCode(Code);
    };

    PerlSourceGenerator.prototype.VisitThrowNode = function (Node) {
        Node.Expr.Evaluate(this);
        var Code = "throw " + this.PopSourceCode();
        this.PushSourceCode(Code);
    };

    PerlSourceGenerator.prototype.VisitErrorNode = function (Node) {
        var Code = "throw Error(\"" + Node.Token.ParsedText + "\")";
        this.PushSourceCode(Code);
    };

    PerlSourceGenerator.prototype.VisitCommandNode = function (Node) {
        var Code = "system(\"";
        var i = 0;
        while (i < Node.ArgumentList.size()) {
            var Param = Node.ArgumentList.get(i);
            if (i != 0) {
                Code += " ";
            }
            Param.Evaluate(this);
            Code += this.PopSourceCode();
            i = i + 1;
        }
        Code += "\")";
        this.PushSourceCode(Code);
    };

    PerlSourceGenerator.prototype.GenerateFunc = function (Func, ParamNameList, Body) {
        this.FlushErrorReport();
        var Program = "";
        var RetTy = Func.GetReturnType().ShortName;
        var FuncName = Func.GetNativeFuncName();
        var Signature = "# ";
        var Arguments = "";
        Signature += RetTy + " " + FuncName + "(";
        this.Indent();
        var i = 0;
        while (i < ParamNameList.size()) {
            var ParamTy = Func.GetFuncParamType(i).ShortName;
            Signature += " ," + ParamTy + " " + ParamNameList.get(i);
            Arguments += this.GetIndentString() + "my $" + ParamNameList.get(i) + " = $_[" + i + "];" + this.LineFeed;
            i = i + 1;
        }
        this.UnIndent();
        Program += Signature + ");" + this.LineFeed + this.GetIndentString() + "sub " + FuncName + " {" + this.LineFeed;
        this.Indent();
        Program += Arguments + this.GetIndentString();
        this.VisitBlockEachStatementWithIndent(Body);
        Program += this.PopSourceCode();
        this.UnIndent();
        Program += this.LineFeed + this.GetIndentString() + "}";
        this.WriteLineCode(Program);
    };

    PerlSourceGenerator.prototype.OpenClassField = function (Type, ClassField) {
        var TypeName = Type.ShortName;
        var Program = this.GetIndentString() + "package " + TypeName + ";" + this.LineFeed;
        if (Type.SuperType != null) {
            Program += this.GetIndentString() + "# our @ISA = ('" + Type.SuperType.ShortName + "');" + this.LineFeed;
        }
        Program += this.GetIndentString() + "sub new {" + this.LineFeed;
        this.Indent();
        var i = 0;
        Program += this.GetIndentString() + "my $class = shift;" + this.LineFeed;
        Program += this.GetIndentString() + "my $" + this.GetRecvName() + " = {};" + this.LineFeed;
        while (i < ClassField.FieldList.size()) {
            var FieldInfo = ClassField.FieldList.get(i);
            var InitValue = this.StringifyConstValue(FieldInfo.InitValue);
            if (!FieldInfo.Type.IsNative()) {
                InitValue = this.NullLiteral;
            }
            Program += this.GetIndentString() + "$" + this.GetRecvName() + "->{'" + FieldInfo.NativeName + "'} = " + InitValue + ";" + this.LineFeed;
            i = i + 1;
        }
        Program += this.GetIndentString() + "return bless $" + this.GetRecvName() + ", $class" + this.LineFeed;
        this.UnIndent();
        Program += this.GetIndentString() + "}" + this.LineFeed;
        Program += this.GetIndentString() + "package main;" + this.LineFeed;
        this.WriteLineCode(Program);
    };

    PerlSourceGenerator.prototype.Eval = function (SingleNode) {
        SingleNode.Evaluate(this);
        return this.PopSourceCode();
    };

    PerlSourceGenerator.prototype.StartCompilationUnit = function () {
        this.WriteLineCode("use strict;");
        this.WriteLineCode("use warnings;");
        this.WriteLineCode("use Error qw(:try);");
    };

    PerlSourceGenerator.prototype.GetRecvName = function () {
        return "self";
    };

    PerlSourceGenerator.prototype.InvokeMainFunc = function (MainFuncName) {
        this.WriteLineCode(MainFuncName);
    };
    return PerlSourceGenerator;
})(SourceGenerator);

var PythonSourceGenerator = (function (_super) {
    __extends(PythonSourceGenerator, _super);
    function PythonSourceGenerator(TargetCode, OutputFile, GeneratorFlag) {
        _super.call(this, TargetCode, OutputFile, GeneratorFlag);
        this.importSubProc = false;
        this.Tab = "    ";
        this.LogicalAndOperator = "and";
        this.LogicalOrOperator = "or";
        this.TrueLiteral = "True";
        this.FalseLiteral = "False";
        this.NullLiteral = "None";
        this.LineComment = "##";
        this.SwitchCaseCount = 0;
        this.BlockBegin = "";
        this.BlockEnd = "";
        this.SemiColon = "";
    }
    PythonSourceGenerator.prototype.GetNewOperator = function (Type) {
        var TypeName = Type.ShortName;
        return TypeName + "()";
    };

    PythonSourceGenerator.prototype.CreateDoWhileNode = function (Type, ParsedTree, Cond, Block) {
        var Break = this.CreateBreakNode(Type, ParsedTree, null);
        var PolyFunc = ParsedTree.NameSpace.GetMethod(Cond.Type, "not", true);
        var Gamma = new GtTypeEnv(ParsedTree.NameSpace);
        var Func = null;
        if (PolyFunc != null) {
            Func = PolyFunc.ResolveUnaryMethod(Gamma, Cond.Type);
        }
        Cond = this.CreateUnaryNode(Type, ParsedTree, Func, Cond);
        var IfBlock = this.CreateIfNode(Type, ParsedTree, Cond, Break, null);
        var TrueNode = this.CreateConstNode(ParsedTree.NameSpace.Context.BooleanType, ParsedTree, true);
        return this.CreateForNode(Type, ParsedTree, TrueNode, IfBlock, Block);
    };

    PythonSourceGenerator.prototype.VisitWhileNode = function (Node) {
        var Program = "while " + this.VisitNode(Node.CondExpr) + ":" + this.LineFeed;
        if (this.IsEmptyBlock(Node.LoopBody)) {
            this.Indent();
            Program += this.GetIndentString() + "pass";
            this.UnIndent();
        } else {
            Program += this.VisitBlockWithIndent(Node.LoopBody, true);
        }
        this.PushSourceCode(Program);
    };

    PythonSourceGenerator.prototype.VisitForNode = function (Node) {
        var Program = "while " + this.VisitNode(Node.CondExpr) + ":" + this.LineFeed;
        if (this.IsEmptyBlock(Node.LoopBody)) {
            this.Indent();
            Program += this.GetIndentString() + "pass";
            this.UnIndent();
        } else {
            Program += this.VisitBlockWithIndent(Node.LoopBody, true);
        }
        Program += this.VisitBlockWithIndent(Node.IterExpr, true);
        this.PushSourceCode(Program);
    };

    PythonSourceGenerator.prototype.VisitForEachNode = function (Node) {
        var Iter = this.VisitNode(Node.IterExpr);
        var Variable = this.VisitNode(Node.Variable);
        var Program = "for " + Variable + " in " + Iter + ":" + this.LineFeed;
        Program += this.VisitBlockWithIndent(Node.LoopBody, true);
        this.PushSourceCode(Program);
    };

    PythonSourceGenerator.prototype.VisitContinueNode = function (Node) {
        var Code = "";
        var Parent = this.FindParentForNode(Node);
        if (Parent != null) {
            var IterNode = Parent.IterExpr;
            if (IterNode != null) {
                Code += this.VisitNode(IterNode) + this.LineFeed + this.GetIndentString();
            }
        }
        Code += this.ContinueKeyword;
        if (this.HasLabelSupport) {
            var Label = Node.Label;
            if (Label != null) {
                Code += " " + Label;
            }
        }
        this.PushSourceCode(Code);
        this.StopVisitor(Node);
    };

    PythonSourceGenerator.prototype.VisitSuffixNode = function (Node) {
        var FuncName = Node.Token.ParsedText;
        var Expr = this.VisitNode(Node.Expr);
        if (LibGreenTea.EqualsString(FuncName, "++")) {
            FuncName = " += 1";
        } else if (LibGreenTea.EqualsString(FuncName, "--")) {
            FuncName = " -= 1";
        } else {
            LibGreenTea.DebugP(FuncName + " is not supported suffix operator!!");
        }
        this.PushSourceCode("(" + SourceGenerator.GenerateApplyFunc1(null, FuncName, true, Expr) + ")");
    };

    PythonSourceGenerator.prototype.VisitVarNode = function (Node) {
        var Code = Node.NativeName;
        var InitValue = this.NullLiteral;
        if (Node.InitNode != null) {
            InitValue = this.VisitNode(Node.InitNode);
        }
        Code += " = " + InitValue + this.LineFeed;
        this.PushSourceCode(Code + this.VisitBlockWithIndent(Node.BlockNode, false));
    };

    PythonSourceGenerator.prototype.VisitTrinaryNode = function (Node) {
        var CondExpr = this.VisitNode(Node.ConditionNode);
        var Then = this.VisitNode(Node.ThenNode);
        var Else = this.VisitNode(Node.ElseNode);
        this.PushSourceCode(Then + " if " + CondExpr + " else " + Else);
    };

    PythonSourceGenerator.prototype.VisitIfNode = function (Node) {
        var CondExpr = this.VisitNode(Node.CondExpr);
        var ThenBlock = this.VisitBlockWithIndent(Node.ThenNode, true);
        var Code = "if " + CondExpr + ":" + this.LineFeed + this.GetIndentString() + ThenBlock;
        if (this.IsEmptyBlock(Node.ThenNode)) {
            Code += this.GetIndentString() + "pass" + this.LineFeed + this.GetIndentString();
        }

        if (!this.IsEmptyBlock(Node.ElseNode)) {
            var ElseBlock = this.VisitBlockWithIndent(Node.ElseNode, true);
            Code += "else:" + this.LineFeed + ElseBlock;
        }
        this.PushSourceCode(Code);
    };
    PythonSourceGenerator.prototype.VisitSwitchNode = function (Node) {
        var Code = "Match" + this.SwitchCaseCount + " = " + this.VisitNode(Node.MatchNode) + this.LineFeed;
        this.SwitchCaseCount += 1;
        var i = 0;
        while (i < Node.CaseList.size()) {
            var Case = Node.CaseList.get(i);
            var Block = Node.CaseList.get(i + 1);
            Code += this.GetIndentString();
            if (i == 0) {
                Code += "if";
            } else {
                Code += "elif";
            }
            Code += this.VisitNode(Case) + ":";
            Code += this.VisitBlockWithIndent(Block, true) + this.LineFeed;
            i = i + 2;
        }
        if (Node.DefaultBlock != null) {
            Code += this.GetIndentString() + "else: ";
            Code += this.VisitBlockWithIndent(Node.DefaultBlock, true) + this.LineFeed;
        }
        Code += this.GetIndentString() + "}";
        this.PushSourceCode(Code);
    };

    PythonSourceGenerator.prototype.VisitTryNode = function (Node) {
        var Code = "try:" + this.LineFeed;
        Code += this.VisitBlockWithIndent(Node.TryBlock, true);
        if (Node.CatchExpr != null) {
            var Val = Node.CatchExpr;
            Code += "except " + Val.Type.toString() + ", " + Val.NativeName + ":" + this.LineFeed;
            Code += this.VisitBlockWithIndent(Node.CatchBlock, true);
        }
        if (Node.FinallyBlock != null) {
            var Finally = this.VisitBlockWithIndent(Node.FinallyBlock, true);
            Code += "finally:" + this.LineFeed + Finally;
        }
        this.PushSourceCode(Code);
    };

    PythonSourceGenerator.prototype.VisitThrowNode = function (Node) {
        var expr = "";
        if (Node.Expr != null) {
            expr = this.VisitNode(Node.Expr);
        }
        this.PushSourceCode("raise " + expr);
    };

    PythonSourceGenerator.prototype.VisitErrorNode = function (Node) {
        var Code = "raise SoftwareFault(\"" + Node.Token.ParsedText + "\")";
        this.PushSourceCode(Code);
    };

    PythonSourceGenerator.prototype.VisitCommandNode = function (Node) {
        if (!this.importSubProc) {
            this.importSubProc = true;
            var Header = "import sys, os" + this.LineFeed;
            Header += "sys.path.append(os.getenv(" + LibGreenTea.QuoteString("GREENTEA_HOME") + ") + ";
            Header += LibGreenTea.QuoteString("/include/python") + ")" + this.LineFeed;
            Header += "import GtSubProc";
            this.WriteHeader(Header);
        }

        var Code = "";
        var CurrentNode = Node;
        while (CurrentNode != null) {
            Code += this.AppendCommand(CurrentNode);
            CurrentNode = CurrentNode.PipedNextNode;
            break;
        }

        if (Node.Type.equals(Node.Type.Context.StringType)) {
            Code = "GtSubProc.execCommandString([" + Code + "])";
        } else if (Node.Type.equals(Node.Type.Context.BooleanType)) {
            Code = "GtSubProc.execCommandBool([" + Code + "])";
        } else {
            Code = "GtSubProc.execCommandVoid([" + Code + "])";
        }
        this.PushSourceCode(Code);
    };

    PythonSourceGenerator.prototype.AppendCommand = function (CurrentNode) {
        var Code = "";
        var size = CurrentNode.ArgumentList.size();
        var i = 0;
        while (i < size) {
            if (i > 0) {
                Code += ", ";
            }
            Code += this.VisitNode(CurrentNode.ArgumentList.get(i));
            i = i + 1;
        }
        return Code;
    };

    PythonSourceGenerator.prototype.GenerateFunc = function (Func, ParamNameList, Body) {
        this.FlushErrorReport();
        var Function = "def ";
        Function += Func.GetNativeFuncName() + "(";
        var i = 0;
        var size = ParamNameList.size();
        while (i < size) {
            if (i > 0) {
                Function += ", ";
            }
            Function += ParamNameList.get(i);
            i = i + 1;
        }
        var Block = this.VisitBlockWithIndent(Body, true);
        Function += "):" + this.LineFeed + Block + this.LineFeed;
        this.WriteLineCode(Function);
    };

    PythonSourceGenerator.prototype.OpenClassField = function (Type, ClassField) {
        this.FlushErrorReport();
        var Program = this.GetIndentString() + "class " + Type.ShortName;

        Program += ":" + this.LineFeed;
        this.Indent();

        Program += this.GetIndentString() + "def __init__(" + this.GetRecvName() + ")" + ":" + this.LineFeed;
        this.Indent();
        var i = 0, length = LibGreenTea.ListSize(ClassField.FieldList);
        if (length == 0) {
            Program += this.GetIndentString() + "pass;" + this.LineFeed;
        } else {
            while (i < length) {
                var FieldInfo = ClassField.FieldList.get(i);
                var InitValue = this.StringifyConstValue(FieldInfo.InitValue);
                if (!FieldInfo.Type.IsNative()) {
                    InitValue = "None";
                }
                Program += this.GetIndentString() + this.GetRecvName() + "." + FieldInfo.NativeName + " = " + InitValue + this.LineFeed;
                i = i + 1;
            }
        }
        this.UnIndent();
        this.UnIndent();
        this.WriteLineCode(Program);
    };

    PythonSourceGenerator.prototype.Eval = function (Node) {
        var Code = this.VisitBlockWithIndent(Node, false);
        if (!LibGreenTea.EqualsString(Code, "")) {
            this.WriteLineCode(Code);
        }
        return null;
    };

    PythonSourceGenerator.prototype.GetRecvName = function () {
        return "self";
    };

    PythonSourceGenerator.prototype.InvokeMainFunc = function (MainFuncName) {
        this.WriteLineCode("if __name__ == '__main__':");
        this.WriteLineCode(this.Tab + MainFuncName + "()");
    };
    return PythonSourceGenerator;
})(SourceGenerator);

var ScalaSourceGenerator = (function (_super) {
    __extends(ScalaSourceGenerator, _super);
    function ScalaSourceGenerator(TargetCode, OutputFile, GeneratorFlag) {
        _super.call(this, TargetCode, OutputFile, GeneratorFlag);
        this.OutFileName = OutputFile;
        if (LibGreenTea.EqualsString(this.OutFileName, "-")) {
            this.OutFileName = "GreenTea";
        } else {
            this.OutFileName = this.OutFileName.replace("/", "_").replace(".", "_").replace("-", "_");
        }
    }
    ScalaSourceGenerator.prototype.LocalTypeName = function (Type) {
        if (Type.IsDynamic() || Type.IsNative()) {
            if (Type == Type.PackageNameSpace.Context.VoidType) {
                return "Unit";
            }
            if (Type == Type.PackageNameSpace.Context.IntType) {
                return "Int";
            }
            if (Type == Type.PackageNameSpace.Context.FloatType) {
                return "Double";
            }
            if (Type == Type.PackageNameSpace.Context.BooleanType) {
                return "Boolean";
            }
        }
        return Type.ShortName;
    };

    ScalaSourceGenerator.prototype.VisitForNode = function (Node) {
        var Program = "while(" + this.VisitNode(Node.CondExpr) + ")" + this.LineFeed;
        Program += this.GetIndentString() + "{";
        this.Indent();
        Program += this.VisitBlockWithIndent(Node.LoopBody, false);
        Program += this.VisitBlockWithIndent(Node.IterExpr, false);
        Program += this.GetIndentString() + "}";
        this.UnIndent();
        this.PushSourceCode(Program);
    };

    ScalaSourceGenerator.prototype.VisitContinueNode = function (Node) {
        var Code = "";
        var Parent = this.FindParentForNode(Node);
        if (Parent != null) {
            var IterNode = Parent.IterExpr;
            if (IterNode != null) {
                Code += this.VisitNode(IterNode) + this.LineFeed + this.GetIndentString();
            }
        }
        Code += this.ContinueKeyword;
        if (this.HasLabelSupport) {
            var Label = Node.Label;
            if (Label != null) {
                Code += " " + Label;
            }
        }
        this.PushSourceCode(Code);
        this.StopVisitor(Node);
    };

    ScalaSourceGenerator.prototype.VisitWhileNode = function (Node) {
        var Program = "while(" + this.VisitNode(Node.CondExpr) + ")";
        Program += this.VisitBlockWithIndent(Node.LoopBody, true);
        this.PushSourceCode(Program);
    };

    ScalaSourceGenerator.prototype.VisitDoWhileNode = function (Node) {
        var Program = "do" + this.VisitBlockWithIndent(Node.LoopBody, true);
        Program += " while(" + this.VisitNode(Node.CondExpr) + ")";
        this.PushSourceCode(Program);
    };

    ScalaSourceGenerator.prototype.VisitGetterNode = function (Node) {
        var Program = this.VisitNode(Node.ExprNode);
        var FieldName = Node.Func.FuncName;
        Program = Program + "." + FieldName;
        this.PushSourceCode(Program);
    };

    ScalaSourceGenerator.prototype.VisitVarNode = function (Node) {
        var Type = this.LocalTypeName(Node.DeclType);
        var VarName = Node.NativeName;
        var Code = "var " + VarName + " : " + Type + " ";
        var CreateNewScope = true;
        if (Node.InitNode != null) {
            Code += " = " + this.VisitNode(Node.InitNode);
        }
        Code += ";" + this.LineFeed;
        if (CreateNewScope) {
            Code += this.GetIndentString();
        }
        Code += this.VisitBlockWithIndent(Node.BlockNode, CreateNewScope);
        this.PushSourceCode(Code + this.PopSourceCode());
    };

    ScalaSourceGenerator.prototype.VisitIfNode = function (Node) {
        var CondExpr = this.VisitNode(Node.CondExpr);
        var ThenBlock = this.VisitBlockWithIndent(Node.ThenNode, true);
        var Code = "if(" + CondExpr + ") " + ThenBlock;
        if (Node.ElseNode != null) {
            Code += " else " + this.VisitBlockWithIndent(Node.ElseNode, true);
        }
        this.PushSourceCode(Code);
    };

    ScalaSourceGenerator.prototype.VisitTryNode = function (Node) {
        var Code = "try ";
        Code += this.VisitBlockWithIndent(Node.TryBlock, true);
        if (Node.CatchExpr != null) {
            var Val = Node.CatchExpr;
            Code += " catch (" + Val.Type.toString() + " " + Val.NativeName + ") ";
            Code += this.VisitBlockWithIndent(Node.CatchBlock, true);
        }
        if (Node.FinallyBlock != null) {
            Code += " finally " + this.VisitBlockWithIndent(Node.FinallyBlock, true);
        }
        this.PushSourceCode(Code);
    };

    ScalaSourceGenerator.prototype.VisitThrowNode = function (Node) {
        var Code = "throw " + this.VisitNode(Node.Expr);
        this.PushSourceCode(Code);
    };

    ScalaSourceGenerator.prototype.VisitErrorNode = function (Node) {
        var Code = "throw RuntimeError(\"" + Node.Token.ParsedText + "\")";
        this.PushSourceCode(Code);
    };

    ScalaSourceGenerator.prototype.Eval = function (Node) {
        var Code = this.VisitBlockWithIndent(Node, false);
        if (LibGreenTea.EqualsString(Code, ";" + this.LineFeed)) {
            return "";
        }
        this.WriteLineCode(Code);
        return Code;
    };

    ScalaSourceGenerator.prototype.GenerateFunc = function (Func, ParamNameList, Body) {
        this.FlushErrorReport();
        var Function = "def ";
        Function += Func.GetNativeFuncName() + "(";
        var i = 0;
        var size = ParamNameList.size();
        while (i < size) {
            if (i > 0) {
                Function += ", ";
            }
            var ParamTy = this.LocalTypeName(Func.GetFuncParamType(i));
            Function += ParamNameList.get(i) + " : " + ParamTy;
            i = i + 1;
        }
        var Block = this.VisitBlockWithIndent(Body, true);
        Function += ") : " + this.LocalTypeName(Func.GetReturnType()) + " = " + this.LineFeed + Block + this.LineFeed;
        this.WriteLineCode(Function);
    };

    ScalaSourceGenerator.prototype.OpenClassField = function (Type, ClassField) {
        var TypeName = this.LocalTypeName(Type);
        var Program = this.GetIndentString() + "class " + TypeName;

        Program += " {" + this.LineFeed;
        this.Indent();
        var i = ClassField.ThisClassIndex;
        while (i < ClassField.FieldList.size()) {
            var FieldInfo = ClassField.FieldList.get(i);
            var VarType = FieldInfo.Type;
            var VarName = FieldInfo.NativeName;
            Program += this.GetIndentString() + "var " + VarName + " : ";
            Program += this.LocalTypeName(VarType) + " = _#COMMENT1#;" + this.LineFeed;
            i = i + 1;
        }
        this.UnIndent();
        Program += this.GetIndentString() + "};" + this.LineFeed;
        Program += this.GetIndentString() + "def constructor(self : " + TypeName + ") : " + this.LocalTypeName(Type);
        Program += " = {" + this.LineFeed;
        this.Indent();
        i = 0;

        while (i < ClassField.FieldList.size()) {
            var FieldInfo = ClassField.FieldList.get(i);
            var VarName = FieldInfo.NativeName;
            var InitValue = this.StringifyConstValue(FieldInfo.InitValue);
            if (!FieldInfo.Type.IsNative()) {
                InitValue = this.NullLiteral;
            }
            Program += this.GetIndentString() + this.GetRecvName() + "." + VarName + " = " + InitValue + ";" + this.LineFeed;
            i = i + 1;
        }
        Program += this.GetIndentString() + "return " + this.GetRecvName() + ";" + this.LineFeed;
        this.UnIndent();
        Program += this.GetIndentString() + "};";

        this.WriteLineCode(Program);
    };

    ScalaSourceGenerator.prototype.StartCompilationUnit = function () {
        this.WriteLineCode("object " + this.OutFileName + " {");
    };

    ScalaSourceGenerator.prototype.FinishCompilationUnit = function () {
        this.WriteLineCode("}");
    };
    ScalaSourceGenerator.prototype.InvokeMainFunc = function (MainFuncName) {
        this.WriteLineCode("def main(args: Array[String]) {");
        this.WriteLineCode(this.Tab + MainFuncName + "()");
        this.WriteLineCode("}");
    };

    ScalaSourceGenerator.prototype.GetRecvName = function () {
        return "self";
    };
    return ScalaSourceGenerator;
})(SourceGenerator);

var KonohaGrammar = (function (_super) {
    __extends(KonohaGrammar, _super);
    function KonohaGrammar() {
        _super.apply(this, arguments);
    }
    KonohaGrammar.HasAnnotation = function (Annotation, Key) {
        if (Annotation != null) {
            var Value = Annotation.GetOrNull(Key);
            if (Value instanceof Boolean) {
                Annotation.put(Key, false);
            }
            return (Value != null);
        }
        return false;
    };

    KonohaGrammar.ParseNameSpaceFlag = function (Flag, Annotation) {
        if (Annotation != null) {
            if (KonohaGrammar.HasAnnotation(Annotation, "RootNameSpace")) {
                Flag = Flag | RootNameSpace;
            }
            if (KonohaGrammar.HasAnnotation(Annotation, "Public")) {
                Flag = Flag | PublicNameSpace;
            }
        }
        return Flag;
    };

    KonohaGrammar.ParseClassFlag = function (Flag, Annotation) {
        if (Annotation != null) {
            if (KonohaGrammar.HasAnnotation(Annotation, "Export")) {
                Flag = Flag | ExportFunc;
            }
            if (KonohaGrammar.HasAnnotation(Annotation, "Public")) {
                Flag = Flag | PublicFunc;
            }
            if (KonohaGrammar.HasAnnotation(Annotation, "Virtual")) {
                Flag = Flag | VirtualFunc;
            }
            if (KonohaGrammar.HasAnnotation(Annotation, "Deprecated")) {
                Flag = Flag | DeprecatedFunc;
            }
        }
        return Flag;
    };

    KonohaGrammar.ParseFuncFlag = function (Flag, Annotation) {
        if (Annotation != null) {
            if (KonohaGrammar.HasAnnotation(Annotation, "Export")) {
                Flag = Flag | ExportFunc;
            }
            if (KonohaGrammar.HasAnnotation(Annotation, "Public")) {
                Flag = Flag | PublicFunc;
            }
            if (KonohaGrammar.HasAnnotation(Annotation, "Hidden")) {
                Flag = Flag | HiddenFunc;
            }
            if (KonohaGrammar.HasAnnotation(Annotation, "Const")) {
                Flag = Flag | ConstFunc;
            }
            if (KonohaGrammar.HasAnnotation(Annotation, "Common")) {
                Flag = Flag | CommonFunc;
            }
            if (KonohaGrammar.HasAnnotation(Annotation, "Operator")) {
                Flag = Flag | OperatorFunc;
            }
            if (KonohaGrammar.HasAnnotation(Annotation, "Method")) {
                Flag = Flag | MethodFunc;
            }
            if (KonohaGrammar.HasAnnotation(Annotation, "Coercion")) {
                Flag = Flag | CoercionFunc;
            }
            if (KonohaGrammar.HasAnnotation(Annotation, "StrongCoercion")) {
                Flag = Flag | CoercionFunc | StrongCoercionFunc;
            }
            if (KonohaGrammar.HasAnnotation(Annotation, "Deprecated")) {
                Flag = Flag | DeprecatedFunc;
            }
        }
        return Flag;
    };

    KonohaGrammar.ParseVarFlag = function (Flag, Annotation) {
        if (Annotation != null) {
            if (KonohaGrammar.HasAnnotation(Annotation, "ReadOnly")) {
                Flag = Flag | ReadOnlyVar;
            }
        }
        return Flag;
    };

    KonohaGrammar.WhiteSpaceToken = function (TokenContext, SourceText, pos) {
        TokenContext.FoundWhiteSpace();
        while (pos < SourceText.length) {
            var ch = LibGreenTea.CharAt(SourceText, pos);
            if (ch == 10 || !LibGreenTea.IsWhitespace(SourceText, pos)) {
                break;
            }
            pos += 1;
        }
        return pos;
    };

    KonohaGrammar.IndentToken = function (TokenContext, SourceText, pos) {
        var LineStart = pos + 1;
        TokenContext.FoundLineFeed(1);
        pos = pos + 1;
        while (pos < SourceText.length) {
            if (!LibGreenTea.IsWhitespace(SourceText, pos)) {
                break;
            }
            if (LibGreenTea.CharAt(SourceText, pos) == 10) {
                TokenContext.FoundLineFeed(1);
            }
            pos += 1;
        }
        var Text = "";
        if (LineStart < pos) {
            Text = LibGreenTea.SubString(SourceText, LineStart, pos);
        }
        TokenContext.AddNewToken(Text, IndentTokenFlag, null);
        return pos;
    };

    KonohaGrammar.SemiColonToken = function (TokenContext, SourceText, pos) {
        TokenContext.AddNewToken(LibGreenTea.SubString(SourceText, pos, (pos + 1)), DelimTokenFlag, null);
        return pos + 1;
    };

    KonohaGrammar.SymbolToken = function (TokenContext, SourceText, pos) {
        var start = pos;
        var PresetPattern = null;
        while (pos < SourceText.length) {
            if (!LibGreenTea.IsVariableName(SourceText, pos) && !LibGreenTea.IsDigit(SourceText, pos)) {
                break;
            }
            pos += 1;
        }
        TokenContext.AddNewToken(LibGreenTea.SubString(SourceText, start, pos), NameSymbolTokenFlag, PresetPattern);
        return pos;
    };

    KonohaGrammar.OperatorToken = function (TokenContext, SourceText, pos) {
        var NextPos = pos + 1;
        while (NextPos < SourceText.length) {
            if (LibGreenTea.IsWhitespace(SourceText, NextPos) || LibGreenTea.IsLetter(SourceText, NextPos) || LibGreenTea.IsDigit(SourceText, NextPos)) {
                break;
            }
            NextPos += 1;
        }
        var Matched = false;
        while (NextPos > pos) {
            var Sub = LibGreenTea.SubString(SourceText, pos, NextPos);
            var Pattern = TokenContext.TopLevelNameSpace.GetExtendedSyntaxPattern(Sub);
            if (Pattern != null) {
                Matched = true;
                break;
            }
            NextPos -= 1;
        }

        if (Matched == false) {
            NextPos = pos + 1;
        }
        TokenContext.AddNewToken(LibGreenTea.SubString(SourceText, pos, NextPos), 0, null);
        return NextPos;
    };

    KonohaGrammar.CommentToken = function (TokenContext, SourceText, pos) {
        var NextPos = pos + 1;
        var NextChar = LibGreenTea.CharAt(SourceText, NextPos);
        if (NextChar != 47 && NextChar != 42) {
            return MismatchedPosition;
        }
        if (NextChar == 42) {
            if (LibGreenTea.CharAt(SourceText, NextPos + 1) == 36 && LibGreenTea.CharAt(SourceText, NextPos + 2) == 123) {
                var StartPos = NextPos + 3;
                NextPos += 3;
                while (NextChar != 0) {
                    NextChar = LibGreenTea.CharAt(SourceText, NextPos);
                    if (NextChar == 125) {
                        TokenContext.SetSourceMap(LibGreenTea.SubString(SourceText, StartPos, NextPos));
                        break;
                    }
                    if (NextChar == 10 || NextChar == 42) {
                        break;
                    }
                    NextPos += 1;
                }
            }
            var Level = 1;
            var PrevChar = 0;
            while (NextPos < SourceText.length) {
                NextChar = LibGreenTea.CharAt(SourceText, NextPos);
                if (NextChar == 47 && PrevChar == 42) {
                    if (Level == 1) {
                        return NextPos + 1;
                    }
                    Level = Level - 1;
                }
                if (Level > 0) {
                    if (NextChar == 42 && PrevChar == 47) {
                        Level = Level + 1;
                    }
                }
                PrevChar = NextChar;
                NextPos = NextPos + 1;
            }
        } else if (NextChar == 47) {
            while (NextPos < SourceText.length) {
                NextChar = LibGreenTea.CharAt(SourceText, NextPos);
                if (NextChar == 10) {
                    return KonohaGrammar.IndentToken(TokenContext, SourceText, NextPos);
                }
                NextPos = NextPos + 1;
            }
        }
        return MismatchedPosition;
    };

    KonohaGrammar.NumberLiteralToken = function (TokenContext, SourceText, pos) {
        var start = pos;
        var LastMatchedPos = pos;
        while (pos < SourceText.length) {
            if (!LibGreenTea.IsDigit(SourceText, pos)) {
                break;
            }
            pos += 1;
        }
        LastMatchedPos = pos;
        var ch = LibGreenTea.CharAt(SourceText, pos);
        if (ch != 46 && ch != 101 && ch != 69) {
            TokenContext.AddNewToken(LibGreenTea.SubString(SourceText, start, pos), 0, "$IntegerLiteral$");
            return pos;
        }
        if (ch == 46) {
            pos += 1;
            while (pos < SourceText.length) {
                if (!LibGreenTea.IsDigit(SourceText, pos)) {
                    break;
                }
                pos += 1;
            }
        }
        ch = LibGreenTea.CharAt(SourceText, pos);
        if (ch == 101 || ch == 69) {
            pos += 1;
            ch = LibGreenTea.CharAt(SourceText, pos);
            if (ch == 43 || ch == 45) {
                pos += 1;
                ch = LibGreenTea.CharAt(SourceText, pos);
            }
            var saved = pos;
            while (pos < SourceText.length) {
                if (!LibGreenTea.IsDigit(SourceText, pos)) {
                    break;
                }
                pos += 1;
            }
            if (saved == pos) {
                pos = LastMatchedPos;
            }
        }
        TokenContext.AddNewToken(LibGreenTea.SubString(SourceText, start, pos), 0, "$FloatLiteral$");
        return pos;
    };

    KonohaGrammar.CharLiteralToken = function (TokenContext, SourceText, pos) {
        var start = pos;
        var prev = 92;
        pos = pos + 1;
        while (pos < SourceText.length) {
            var ch = LibGreenTea.CharAt(SourceText, pos);
            if (ch == 92 && prev != 92) {
                TokenContext.AddNewToken(LibGreenTea.SubString(SourceText, start, (pos + 1)), QuotedTokenFlag, "$CharLiteral$");
                return pos + 1;
            }
            if (ch == 10) {
                TokenContext.ReportTokenError1(ErrorLevel, "expected ' to close the charctor literal", LibGreenTea.SubString(SourceText, start, pos));
                TokenContext.FoundLineFeed(1);
                return pos;
            }
            pos = pos + 1;
            prev = ch;
        }
        TokenContext.ReportTokenError1(ErrorLevel, "expected ' to close the charctor literal", LibGreenTea.SubString(SourceText, start, pos));
        return pos;
    };

    KonohaGrammar.SkipBackSlashOrNewLineOrDoubleQuote = function (SourceText, pos) {
        while (pos < SourceText.length) {
            var ch = LibGreenTea.CharAt(SourceText, pos);
            if (ch == 92 || ch == 10 || ch == 34) {
                return pos;
            }
            pos = pos + 1;
        }
        return pos;
    };

    KonohaGrammar.StringLiteralToken = function (TokenContext, SourceText, pos) {
        var start = pos;
        pos = pos + 1;
        while (pos < SourceText.length) {
            pos = KonohaGrammar.SkipBackSlashOrNewLineOrDoubleQuote(SourceText, pos);
            var ch = LibGreenTea.CharAt(SourceText, pos);
            if (ch == 92) {
                if (pos + 1 < SourceText.length) {
                    var NextChar = LibGreenTea.CharAt(SourceText, pos + 1);
                    if (NextChar == 117) {
                        TokenContext.ReportTokenError1(ErrorLevel, "Unicode character escape sequences is not supported", LibGreenTea.SubString(SourceText, start, pos));
                        return pos;
                    }
                }
                pos = pos + 1;
            }
            if (ch == 34) {
                TokenContext.AddNewToken(LibGreenTea.SubString(SourceText, start, (pos + 1)), QuotedTokenFlag, "$StringLiteral$");
                return pos + 1;
            }
            if (ch == 10) {
                TokenContext.ReportTokenError1(ErrorLevel, "expected \" to close the string literal", LibGreenTea.SubString(SourceText, start, pos));
                TokenContext.FoundLineFeed(1);
                return pos;
            }
            pos = pos + 1;
        }
        TokenContext.ReportTokenError1(ErrorLevel, "expected \" to close the string literal", LibGreenTea.SubString(SourceText, start, pos));
        return pos;
    };

    KonohaGrammar.ParseTypeOf = function (NameSpace, TokenContext, LeftTree, Pattern) {
        var TypeOfTree = TokenContext.CreateMatchedSyntaxTree(NameSpace, Pattern, "typeof");
        TypeOfTree.SetMatchedTokenAt(NoWhere, NameSpace, TokenContext, "(", Required);
        TypeOfTree.SetMatchedPatternAt(UnaryTerm, NameSpace, TokenContext, "$Expression$", Required);
        TypeOfTree.SetMatchedTokenAt(NoWhere, NameSpace, TokenContext, ")", Required);
        if (!TypeOfTree.IsMismatchedOrError()) {
            var Gamma = new GtTypeEnv(NameSpace);
            var ObjectNode = TypeOfTree.TypeCheckAt(UnaryTerm, Gamma, Gamma.VarType, DefaultTypeCheckPolicy);
            if (ObjectNode.IsErrorNode()) {
                TypeOfTree.ToError(ObjectNode.Token);
            } else {
                TypeOfTree.ToConstTree(ObjectNode.Type);
                var TypeTree = TokenContext.ParsePatternAfter(NameSpace, TypeOfTree, "$TypeSuffix$", Optional);
                return (TypeTree == null) ? TypeOfTree : TypeTree;
            }
        }
        return TypeOfTree;
    };

    KonohaGrammar.ParseTypeSuffix = function (NameSpace, TokenContext, TypeTree, Pattern) {
        var ParsedType = TypeTree.GetParsedType();
        if (ParsedType.IsGenericType()) {
            if (TokenContext.MatchToken("<")) {
                var TypeList = new Array();
                while (!TokenContext.StartsWithToken(">")) {
                    if (TypeList.size() > 0 && !TokenContext.MatchToken(",")) {
                        return null;
                    }
                    var ParamTypeTree = TokenContext.ParsePattern(NameSpace, "$Type$", Optional);
                    if (ParamTypeTree == null) {
                        return ParamTypeTree;
                    }
                    TypeList.add(ParamTypeTree.GetParsedType());
                }
                ParsedType = NameSpace.Context.GetGenericType(ParsedType, 0, TypeList, true);
            }
        }
        while (TokenContext.MatchToken("[")) {
            if (!TokenContext.MatchToken("]")) {
                return null;
            }
            ParsedType = NameSpace.Context.GetGenericType1(NameSpace.Context.ArrayType, ParsedType, true);
        }
        TypeTree.ToConstTree(ParsedType);
        return TypeTree;
    };

    KonohaGrammar.ParseType = function (NameSpace, TokenContext, LeftTree, Pattern) {
        if (TokenContext.MatchToken("typeof")) {
            return KonohaGrammar.ParseTypeOf(NameSpace, TokenContext, LeftTree, Pattern);
        }
        var Token = TokenContext.Next();
        var ConstValue = NameSpace.GetSymbol(Token.ParsedText);
        if (!(ConstValue instanceof GtType)) {
            return null;
        }
        var TypeTree = new GtSyntaxTree(Pattern, NameSpace, Token, ConstValue);
        var TypeSuffixTree = TokenContext.ParsePatternAfter(NameSpace, TypeTree, "$TypeSuffix$", Optional);
        return (TypeSuffixTree == null) ? TypeTree : TypeSuffixTree;
    };

    KonohaGrammar.ParseConst = function (NameSpace, TokenContext, LeftTree, Pattern) {
        var Token = TokenContext.Next();
        var ConstValue = NameSpace.GetSymbol(Token.ParsedText);
        if (ConstValue != null) {
            return new GtSyntaxTree(Pattern, NameSpace, Token, ConstValue);
        }
        return null;
    };

    KonohaGrammar.TypeConst = function (Gamma, ParsedTree, ContextType) {
        if ((typeof ParsedTree.ParsedValue == 'string' || ParsedTree.ParsedValue instanceof String)) {
            ParsedTree.ParsedValue = ParsedTree.ParsedValue;
        }
        return Gamma.Generator.CreateConstNode(Gamma.Context.GuessType(ParsedTree.ParsedValue), ParsedTree, ParsedTree.ParsedValue);
    };

    KonohaGrammar.ParseNull = function (NameSpace, TokenContext, LeftTree, Pattern) {
        return TokenContext.CreateMatchedSyntaxTree(NameSpace, Pattern, "null");
    };

    KonohaGrammar.TypeNull = function (Gamma, ParsedTree, ContextType) {
        var ThisType = ContextType;
        if (ThisType == Gamma.VarType) {
            ThisType = Gamma.AnyType;
        }
        if (ThisType.DefaultNullValue != null) {
            return Gamma.Generator.CreateConstNode(ThisType, ParsedTree, ThisType.DefaultNullValue);
        }
        return Gamma.Generator.CreateNullNode(ThisType, ParsedTree);
    };

    KonohaGrammar.ParseSymbol = function (NameSpace, TokenContext, LeftTree, Pattern) {
        var TypeTree = TokenContext.ParsePattern(NameSpace, "$Type$", Optional);
        if (TypeTree != null) {
            var DeclTree = TokenContext.ParsePatternAfter(NameSpace, TypeTree, "$FuncDecl$", Optional);
            if (DeclTree != null) {
                return DeclTree;
            }
            DeclTree = TokenContext.ParsePatternAfter(NameSpace, TypeTree, "$VarDecl$", Optional);
            if (DeclTree != null) {
                return DeclTree;
            }
            TypeTree.Pattern = NameSpace.GetSyntaxPattern("$Const$");
            return TypeTree;
        }
        var Token = TokenContext.Next();
        var VarTree = new GtSyntaxTree(NameSpace.GetSyntaxPattern("$Variable$"), NameSpace, Token, null);
        if (!LibGreenTea.IsVariableName(Token.ParsedText, 0)) {
            return TokenContext.ReportExpectedMessage(Token, "name", true);
        }
        return VarTree;
    };

    KonohaGrammar.ParseVariable = function (NameSpace, TokenContext, LeftTree, Pattern) {
        var Token = TokenContext.Next();
        if (LibGreenTea.IsVariableName(Token.ParsedText, 0)) {
            return new GtSyntaxTree(Pattern, NameSpace, Token, null);
        }
        return TokenContext.ReportExpectedMessage(Token, "name", true);
    };

    KonohaGrammar.TypeVariable = function (Gamma, ParsedTree, ContextType) {
        var Name = ParsedTree.KeyToken.ParsedText;
        var VariableInfo = Gamma.LookupDeclaredVariable(Name);
        if (VariableInfo != null) {
            VariableInfo.Used();
            return Gamma.Generator.CreateLocalNode(VariableInfo.Type, ParsedTree, VariableInfo.NativeName);
        }
        var ConstValue = ParsedTree.NameSpace.GetSymbol(Name);
        if (ConstValue != null) {
            return Gamma.Generator.CreateConstNode(Gamma.Context.GuessType(ConstValue), ParsedTree, ConstValue);
        }
        var Node = Gamma.Generator.CreateLocalNode(Gamma.AnyType, ParsedTree, Name + Gamma.Generator.BlockComment("undefined"));
        return Gamma.ReportTypeResult(ParsedTree, Node, TypeErrorLevel, "undefined name: " + Name);
    };

    KonohaGrammar.ParseVarDecl = function (NameSpace, TokenContext, LeftTree, Pattern) {
        var Tree = new GtSyntaxTree(Pattern, NameSpace, TokenContext.GetToken(), null);
        if (LeftTree == null) {
            Tree.SetMatchedPatternAt(VarDeclType, NameSpace, TokenContext, "$Type$", Required);
        } else {
            Tree.SetSyntaxTreeAt(VarDeclType, LeftTree);
        }
        Tree.SetMatchedPatternAt(VarDeclName, NameSpace, TokenContext, "$Variable$", Required);
        if (Tree.IsMismatchedOrError()) {
            return Tree;
        }
        if (TokenContext.MatchToken("=")) {
            Tree.SetMatchedPatternAt(VarDeclValue, NameSpace, TokenContext, "$Expression$", Required);
        }
        while (TokenContext.MatchToken(",")) {
            var NextTree = new GtSyntaxTree(Pattern, NameSpace, Tree.KeyToken, null);
            NextTree.SetSyntaxTreeAt(VarDeclType, Tree.GetSyntaxTreeAt(VarDeclType));
            NextTree.SetMatchedPatternAt(VarDeclName, NameSpace, TokenContext, "$Variable$", Required);
            if (TokenContext.MatchToken("=")) {
                NextTree.SetMatchedPatternAt(VarDeclValue, NameSpace, TokenContext, "$Expression$", Required);
            }
            Tree = LinkTree(Tree, NextTree);
        }
        return Tree;
    };

    KonohaGrammar.TypeVarDecl = function (Gamma, ParsedTree, ContextType) {
        var VarFlag = KonohaGrammar.ParseVarFlag(0, ParsedTree.Annotation);
        var DeclType = ParsedTree.GetSyntaxTreeAt(VarDeclType).GetParsedType();
        var VariableName = ParsedTree.GetSyntaxTreeAt(VarDeclName).KeyToken.ParsedText;
        var InitValueNode = null;
        if (ParsedTree.HasNodeAt(VarDeclValue)) {
            InitValueNode = ParsedTree.TypeCheckAt(VarDeclValue, Gamma, DeclType, DefaultTypeCheckPolicy);
            if (InitValueNode.IsErrorNode()) {
                return InitValueNode;
            }
        }
        if (UseLangStat) {
            Gamma.Context.Stat.VarDecl += 1;
        }
        if (DeclType.IsVarType()) {
            if (InitValueNode == null) {
                DeclType = Gamma.AnyType;
            } else {
                DeclType = InitValueNode.Type;
            }
            Gamma.ReportTypeInference(ParsedTree.KeyToken, VariableName, DeclType);
            if (UseLangStat) {
                Gamma.Context.Stat.VarDeclInfer += 1;
                if (DeclType.IsAnyType()) {
                    Gamma.Context.Stat.VarDeclInferAny += 1;
                }
            }
        }
        if (UseLangStat) {
            if (DeclType.IsAnyType()) {
                Gamma.Context.Stat.VarDeclAny += 1;
            }
        }
        if (InitValueNode == null) {
            InitValueNode = Gamma.CreateDefaultValue(ParsedTree, DeclType);
        }
        var VarInfo = Gamma.AppendDeclaredVariable(VarFlag, DeclType, VariableName, ParsedTree.GetSyntaxTreeAt(VarDeclName).KeyToken, InitValueNode.ToConstValue(false));
        var BlockNode = TypeBlock(Gamma, ParsedTree.NextTree, Gamma.VoidType);
        ParsedTree.NextTree = null;
        return Gamma.Generator.CreateVarNode(DeclType, ParsedTree, DeclType, VarInfo.NativeName, InitValueNode, BlockNode);
    };

    KonohaGrammar.ParseIntegerLiteral = function (NameSpace, TokenContext, LeftTree, Pattern) {
        var Token = TokenContext.Next();
        return new GtSyntaxTree(Pattern, NameSpace, Token, LibGreenTea.ParseInt(Token.ParsedText));
    };
    KonohaGrammar.ParseFloatLiteral = function (NameSpace, TokenContext, LeftTree, Pattern) {
        var Token = TokenContext.Next();
        return new GtSyntaxTree(Pattern, NameSpace, Token, LibGreenTea.ParseFloat(Token.ParsedText));
    };

    KonohaGrammar.ParseStringLiteral = function (NameSpace, TokenContext, LeftTree, Pattern) {
        var Token = TokenContext.Next();
        return new GtSyntaxTree(Pattern, NameSpace, Token, LibGreenTea.UnquoteString(Token.ParsedText));
    };

    KonohaGrammar.ParseCharLiteral = function (NameSpace, TokenContext, LeftTree, Pattern) {
        var Token = TokenContext.Next();
        var NewTree = new GtSyntaxTree(Pattern, NameSpace, Token, LibGreenTea.UnquoteString(Token.ParsedText));
        return NewTree;
    };

    KonohaGrammar.TypeCharLiteral = function (Gamma, ParsedTree, ContextType) {
        var Text = ParsedTree.KeyToken.ParsedText;
        if (Text.length == 3) {
            var ch = LibGreenTea.CharAt(Text, 1);
            var Value = ch;
            ParsedTree.ParsedValue = LibGreenTea.ParseInt(Value.toString());
        } else if (Text.length == 4) {
            var ch = LibGreenTea.CharAt(Text, 2);
            if (LibGreenTea.CharAt(Text, 1) == 92) {
                switch (ch) {
                    case 92:
                        ch = 92;
                        break;
                    case 92:
                        ch = 92;
                        break;
                    case 98:
                        ch = 92;
                        break;
                    case 102:
                        ch = 92;
                        break;
                    case 110:
                        ch = 10;
                        break;
                    case 114:
                        ch = 92;
                        break;
                    case 116:
                        ch = 9;
                        break;
                    default:
                        ch = -1;
                }
                if (ch >= 0) {
                    var Value = ch;
                    ParsedTree.ParsedValue = LibGreenTea.ParseInt(Value.toString());
                }
            }
        }
        return KonohaGrammar.TypeConst(Gamma, ParsedTree, ContextType);
    };

    KonohaGrammar.ParseExpression = function (NameSpace, TokenContext, LeftTree, Pattern) {
        Pattern = TokenContext.GetFirstPattern(NameSpace);
        LeftTree = ApplySyntaxPattern(NameSpace, TokenContext, LeftTree, Pattern);
        while (!IsMismatchedOrError(LeftTree)) {
            var ExtendedPattern = TokenContext.GetExtendedPattern(NameSpace);
            if (ExtendedPattern == null) {
                break;
            }
            LeftTree = ApplySyntaxPattern(NameSpace, TokenContext, LeftTree, ExtendedPattern);
        }
        return LeftTree;
    };

    KonohaGrammar.ParseSuffixExpression = function (NameSpace, TokenContext, LeftTree, Pattern) {
        Pattern = TokenContext.GetFirstPattern(NameSpace);
        LeftTree = ApplySyntaxPattern(NameSpace, TokenContext, LeftTree, Pattern);
        while (!IsMismatchedOrError(LeftTree)) {
            var ExtendedPattern = TokenContext.GetExtendedPattern(NameSpace);
            if (ExtendedPattern == null || ExtendedPattern.IsBinaryOperator()) {
                break;
            }
            LeftTree = ApplySyntaxPattern(NameSpace, TokenContext, LeftTree, ExtendedPattern);
        }
        return LeftTree;
    };

    KonohaGrammar.ParseUnary = function (NameSpace, TokenContext, LeftTree, Pattern) {
        var Token = TokenContext.Next();
        var Tree = new GtSyntaxTree(Pattern, NameSpace, Token, null);
        Tree.SetMatchedPatternAt(UnaryTerm, NameSpace, TokenContext, "$SuffixExpression$", Required);
        return Tree;
    };

    KonohaGrammar.TypeUnary = function (Gamma, ParsedTree, ContextType) {
        var ExprNode = ParsedTree.TypeCheckAt(UnaryTerm, Gamma, Gamma.VarType, DefaultTypeCheckPolicy);
        if (ExprNode.IsErrorNode()) {
            return ExprNode;
        }
        var BaseType = ExprNode.Type;
        var ReturnType = Gamma.AnyType;
        var OperatorSymbol = ParsedTree.KeyToken.ParsedText;
        var PolyFunc = ParsedTree.NameSpace.GetMethod(BaseType, FuncSymbol(OperatorSymbol), true);
        var ResolvedFunc = PolyFunc.ResolveUnaryMethod(Gamma, BaseType);
        if (ResolvedFunc == null) {
            Gamma.Context.ReportError(TypeErrorLevel, ParsedTree.KeyToken, "mismatched operators: " + PolyFunc);
        } else {
            Gamma.CheckFunc("operator", ResolvedFunc, ParsedTree.KeyToken);
            ReturnType = ResolvedFunc.GetReturnType();
        }
        var UnaryNode = Gamma.Generator.CreateUnaryNode(ReturnType, ParsedTree, ResolvedFunc, ExprNode);
        if (ResolvedFunc == null && !BaseType.IsDynamic()) {
            return Gamma.ReportTypeResult(ParsedTree, UnaryNode, TypeErrorLevel, "undefined operator: " + OperatorSymbol + " of " + BaseType);
        }
        return UnaryNode;
    };

    KonohaGrammar.RightJoin = function (NameSpace, LeftTree, Pattern, OperatorToken, RightTree) {
        var RightLeft = RightTree.GetSyntaxTreeAt(LeftHandTerm);
        if (RightLeft.Pattern.IsBinaryOperator() && Pattern.IsRightJoin(RightLeft.Pattern)) {
            RightTree.SetSyntaxTreeAt(LeftHandTerm, KonohaGrammar.RightJoin(NameSpace, LeftTree, Pattern, OperatorToken, RightLeft));
        } else {
            var NewTree = new GtSyntaxTree(Pattern, NameSpace, OperatorToken, null);
            NewTree.SetSyntaxTreeAt(LeftHandTerm, LeftTree);
            NewTree.SetSyntaxTreeAt(RightHandTerm, RightLeft);
            RightTree.SetSyntaxTreeAt(LeftHandTerm, NewTree);
        }
        return RightTree;
    };

    KonohaGrammar.ParseBinary = function (NameSpace, TokenContext, LeftTree, Pattern) {
        var OperatorToken = TokenContext.Next();
        var RightTree = TokenContext.ParsePattern(NameSpace, "$Expression$", Required);
        if (IsMismatchedOrError(RightTree)) {
            return RightTree;
        }

        if (RightTree.Pattern.IsBinaryOperator() && Pattern.IsRightJoin(RightTree.Pattern)) {
            return KonohaGrammar.RightJoin(NameSpace, LeftTree, Pattern, OperatorToken, RightTree);
        }

        var NewTree = new GtSyntaxTree(Pattern, NameSpace, OperatorToken, null);
        NewTree.SetSyntaxTreeAt(LeftHandTerm, LeftTree);
        NewTree.SetSyntaxTreeAt(RightHandTerm, RightTree);
        if (RightTree.NextTree != null) {
            LinkTree(NewTree, RightTree.NextTree);
            RightTree.NextTree = null;
        }
        return NewTree;
    };

    KonohaGrammar.TypeBinary = function (Gamma, ParsedTree, ContextType) {
        var LeftNode = ParsedTree.TypeCheckAt(LeftHandTerm, Gamma, Gamma.VarType, DefaultTypeCheckPolicy);
        if (!LeftNode.IsErrorNode()) {
            var BaseType = LeftNode.Type;
            var OperatorSymbol = ParsedTree.KeyToken.ParsedText;
            var PolyFunc = ParsedTree.NameSpace.GetMethod(BaseType, FuncSymbol(OperatorSymbol), true);
            var ParamList = new Array();
            ParamList.add(LeftNode);
            var ResolvedFunc = PolyFunc.ResolveFunc(Gamma, ParsedTree, 1, ParamList);
            if (ResolvedFunc.Func == null) {
                Gamma.Context.ReportError(TypeErrorLevel, ParsedTree.KeyToken, "mismatched operators: " + PolyFunc);
            } else {
                Gamma.CheckFunc("operator", ResolvedFunc.Func, ParsedTree.KeyToken);
            }
            var BinaryNode = Gamma.Generator.CreateBinaryNode(ResolvedFunc.ReturnType, ParsedTree, ResolvedFunc.Func, LeftNode, ParamList.get(1));
            if (ResolvedFunc.Func == null && !BaseType.IsDynamic()) {
                return Gamma.ReportTypeResult(ParsedTree, BinaryNode, TypeErrorLevel, "undefined operator: " + OperatorSymbol + " of " + LeftNode.Type);
            }
            return BinaryNode;
        }
        return LeftNode;
    };

    KonohaGrammar.ParseTrinary = function (NameSpace, TokenContext, LeftTree, Pattern) {
        var TrinaryTree = TokenContext.CreateMatchedSyntaxTree(NameSpace, Pattern, "?");
        TrinaryTree.SetSyntaxTreeAt(IfCond, LeftTree);
        TrinaryTree.SetMatchedPatternAt(IfThen, NameSpace, TokenContext, "$Expression$", Required);
        TrinaryTree.SetMatchedTokenAt(NoWhere, NameSpace, TokenContext, ":", Required);
        TrinaryTree.SetMatchedPatternAt(IfElse, NameSpace, TokenContext, "$Expression$", Required);
        return TrinaryTree;
    };

    KonohaGrammar.TypeTrinary = function (Gamma, ParsedTree, ContextType) {
        var CondNode = ParsedTree.TypeCheckAt(IfCond, Gamma, Gamma.BooleanType, DefaultTypeCheckPolicy);
        var ThenNode = ParsedTree.TypeCheckAt(IfThen, Gamma, Gamma.VarType, DefaultTypeCheckPolicy);
        if (ThenNode.IsErrorNode()) {
            return ThenNode;
        }
        var ElseNode = ParsedTree.TypeCheckAt(IfElse, Gamma, ThenNode.Type, DefaultTypeCheckPolicy);
        return Gamma.Generator.CreateTrinaryNode(ThenNode.Type, ParsedTree, CondNode, ThenNode, ElseNode);
    };

    KonohaGrammar.ParseGroup = function (NameSpace, TokenContext, LeftTree, Pattern) {
        var GroupTree = TokenContext.CreateSyntaxTree(NameSpace, Pattern, null);
        GroupTree.SetMatchedTokenAt(KeyTokenIndex, NameSpace, TokenContext, "(", Required);
        var ParseFlag = TokenContext.SetSkipIndent(true);
        GroupTree.AppendMatchedPattern(NameSpace, TokenContext, "$Expression$", Required);
        GroupTree.SetMatchedTokenAt(NoWhere, NameSpace, TokenContext, ")", Required);
        TokenContext.SetRememberFlag(ParseFlag);
        return GroupTree;
    };

    KonohaGrammar.TypeGroup = function (Gamma, ParsedTree, ContextType) {
        return ParsedTree.TypeCheckAt(UnaryTerm, Gamma, ContextType, DefaultTypeCheckPolicy);
    };

    KonohaGrammar.ParseCast = function (NameSpace, TokenContext, LeftTree, Pattern) {
        var FirstToken = TokenContext.Next();
        var CastTree = null;
        if (TokenContext.MatchToken("to")) {
            CastTree = new GtSyntaxTree(Pattern, NameSpace, TokenContext.GetBeforeToken(), null);
        } else {
            CastTree = new GtSyntaxTree(Pattern, NameSpace, FirstToken, null);
        }
        CastTree.SetMatchedPatternAt(LeftHandTerm, NameSpace, TokenContext, "$Type$", Required);
        CastTree.SetMatchedTokenAt(NoWhere, NameSpace, TokenContext, ")", Required);
        CastTree.SetMatchedPatternAt(RightHandTerm, NameSpace, TokenContext, "$SuffixExpression$", Required);
        return CastTree;
    };

    KonohaGrammar.TypeCast = function (Gamma, ParsedTree, ContextType) {
        var CastType = ParsedTree.GetSyntaxTreeAt(LeftHandTerm).GetParsedType();
        var TypeCheckPolicy = CastPolicy;
        return ParsedTree.TypeCheckAt(RightHandTerm, Gamma, CastType, TypeCheckPolicy);
    };

    KonohaGrammar.ParseGetter = function (NameSpace, TokenContext, LeftTree, Pattern) {
        TokenContext.MatchToken(".");
        var Token = TokenContext.Next();
        if (!Token.IsNameSymbol()) {
            return TokenContext.ReportExpectedMessage(Token, "field name", true);
        }
        var NewTree = new GtSyntaxTree(Pattern, NameSpace, Token, null);
        NewTree.AppendParsedTree2(LeftTree);
        if (TokenContext.MatchToken("=")) {
            NewTree.Pattern = NameSpace.GetSyntaxPattern("$Setter$");
            NewTree.SetMatchedPatternAt(RightHandTerm, NameSpace, TokenContext, "$Expression$", Required);
        }
        return NewTree;
    };

    KonohaGrammar.TypeGetter = function (Gamma, ParsedTree, ContextType) {
        var Name = ParsedTree.KeyToken.ParsedText;
        var ObjectNode = ParsedTree.TypeCheckAt(UnaryTerm, Gamma, Gamma.VarType, DefaultTypeCheckPolicy);
        if (ObjectNode.IsErrorNode()) {
            return ObjectNode;
        }

        var TypeName = ObjectNode.Type.ShortName;
        if (ObjectNode instanceof GtConstNode && ObjectNode.Type.IsTypeType()) {
            var ObjectType = (ObjectNode).ConstValue;
            var ConstValue = ParsedTree.NameSpace.GetClassStaticSymbol(ObjectType, Name, true);

            if (ConstValue != null) {
                return Gamma.Generator.CreateConstNode(Gamma.Context.GuessType(ConstValue), ParsedTree, ConstValue);
            }
            TypeName = ObjectType.ShortName;
        }

        var PolyFunc = ParsedTree.NameSpace.GetMethod(ObjectNode.Type, Name, true);
        if (PolyFunc.FuncList.size() > 0 && ContextType == Gamma.FuncType) {
            var FirstFunc = PolyFunc.FuncList.get(0);
            return Gamma.Generator.CreateGetterNode(ContextType, ParsedTree, FirstFunc, ObjectNode);
        }

        var GetterFunc = ParsedTree.NameSpace.GetGetterFunc(ObjectNode.Type, Name, true);
        var ReturnType = (GetterFunc != null) ? GetterFunc.GetReturnType() : Gamma.AnyType;
        var Node = Gamma.Generator.CreateGetterNode(ReturnType, ParsedTree, GetterFunc, ObjectNode);
        if (GetterFunc == null) {
            if (!ObjectNode.Type.IsDynamic() && ContextType != Gamma.FuncType) {
                return Gamma.ReportTypeResult(ParsedTree, Node, TypeErrorLevel, "undefined name: " + Name + " of " + TypeName);
            }
        }
        return Node;
    };

    KonohaGrammar.TypeSetter = function (Gamma, ParsedTree, ContextType) {
        var Name = ParsedTree.KeyToken.ParsedText;
        var ObjectNode = ParsedTree.TypeCheckAt(UnaryTerm, Gamma, Gamma.VarType, DefaultTypeCheckPolicy);
        if (ObjectNode.IsErrorNode()) {
            return ObjectNode;
        }
        var SetterFunc = ParsedTree.NameSpace.GetSetterFunc(ObjectNode.Type, Name, true);
        if (SetterFunc != null) {
            var ValueType = SetterFunc.GetFuncParamType(1);
            var ValueNode = ParsedTree.TypeCheckAt(RightHandTerm, Gamma, ValueType, DefaultTypeCheckPolicy);
            return Gamma.Generator.CreateSetterNode(Gamma.VoidType, ParsedTree, SetterFunc, ObjectNode, ValueNode);
        } else if (ObjectNode.Type.IsDynamic()) {
            var ValueNode = ParsedTree.TypeCheckAt(RightHandTerm, Gamma, Gamma.VoidType, DefaultTypeCheckPolicy);
            return Gamma.Generator.CreateSetterNode(Gamma.VoidType, ParsedTree, SetterFunc, ObjectNode, ValueNode);
        } else {
            return Gamma.CreateSyntaxErrorNode(ParsedTree, "undefined name: " + Name + " of " + ObjectNode.Type);
        }
    };

    KonohaGrammar.ParseDefined = function (NameSpace, TokenContext, LeftTree, Pattern) {
        var DefinedTree = TokenContext.CreateMatchedSyntaxTree(NameSpace, Pattern, "defined");
        DefinedTree.SetMatchedTokenAt(NoWhere, NameSpace, TokenContext, "(", Required);
        DefinedTree.SetMatchedPatternAt(UnaryTerm, NameSpace, TokenContext, "$Expression$", Required);
        DefinedTree.SetMatchedTokenAt(NoWhere, NameSpace, TokenContext, ")", Required);
        return DefinedTree;
    };

    KonohaGrammar.TypeDefined = function (Gamma, ParsedTree, Type) {
        Gamma.Context.SetNoErrorReport(true);
        var ObjectNode = ParsedTree.TypeCheckAt(UnaryTerm, Gamma, Gamma.VarType, DefaultTypeCheckPolicy);
        Gamma.Context.SetNoErrorReport(false);
        return Gamma.Generator.CreateConstNode(Gamma.BooleanType, ParsedTree, (ObjectNode instanceof GtConstNode));
    };

    KonohaGrammar.ParseApply = function (NameSpace, TokenContext, LeftTree, Pattern) {
        var ParseFlag = TokenContext.SetSkipIndent(true);
        var FuncTree = TokenContext.CreateSyntaxTree(NameSpace, Pattern, null);
        FuncTree.SetMatchedTokenAt(KeyTokenIndex, NameSpace, TokenContext, "(", Required);
        FuncTree.AppendParsedTree2(LeftTree);
        if (!TokenContext.MatchToken(")")) {
            while (!FuncTree.IsMismatchedOrError()) {
                FuncTree.AppendMatchedPattern(NameSpace, TokenContext, "$Expression$", Required);
                if (TokenContext.MatchToken(")")) {
                    break;
                }
                FuncTree.SetMatchedTokenAt(NoWhere, NameSpace, TokenContext, ",", Required);
            }
        }
        TokenContext.SetRememberFlag(ParseFlag);
        return FuncTree;
    };

    KonohaGrammar.TypeNewNode = function (Gamma, ParsedTree, ClassToken, ClassType, ContextType) {
        if (ClassType.IsVarType()) {
            ClassType = ContextType;
            if (ClassType.IsVarType()) {
                return Gamma.CreateSyntaxErrorNode(ParsedTree, "ambigious constructor: " + ClassToken);
            }
            Gamma.ReportTypeInference(ClassToken, "constructor", ClassType);
        }
        if (ClassType.IsAbstract()) {
            return Gamma.CreateSyntaxErrorNode(ParsedTree, "type is abstract");
        }
        var PolyFunc = ParsedTree.NameSpace.GetConstructorFunc(ClassType);
        var ParamList = new Array();
        if (ClassType.IsNative()) {
            var ResolvedFunc = PolyFunc.ResolveFunc(Gamma, ParsedTree, 1, ParamList);
            if (ResolvedFunc.ErrorNode != null) {
                return ResolvedFunc.ErrorNode;
            }
            if (ResolvedFunc.Func != null && ResolvedFunc.Func.Is(NativeFunc)) {
                Gamma.CheckFunc("constructor", ResolvedFunc.Func, ParsedTree.KeyToken);
                return Gamma.Generator.CreateConstructorNode(ClassType, ParsedTree, ResolvedFunc.Func, ParamList);
            }
        } else {
            var NewNode = Gamma.Generator.CreateNewNode(ClassType, ParsedTree);
            ParamList.add(NewNode);
            var ResolvedFunc = PolyFunc.ResolveFunc(Gamma, ParsedTree, 1, ParamList);
            if (ResolvedFunc.ErrorNode != null) {
                return ResolvedFunc.ErrorNode;
            }
            if (ResolvedFunc.Func == null) {
                if (ParsedTree.SubTreeList.size() == 1) {
                    return NewNode;
                }
            } else {
                Gamma.CheckFunc("constructor", ResolvedFunc.Func, ParsedTree.KeyToken);
                var Node = Gamma.Generator.CreateApplyNode(ResolvedFunc.ReturnType, ParsedTree, ResolvedFunc.Func);
                Node.Append(Gamma.Generator.CreateConstNode(Gamma.VarType, ParsedTree, ResolvedFunc.Func));
                Node.AppendNodeList(0, ParamList);
                return Node;
            }
        }
        return PolyFunc.ReportTypeError(Gamma, ParsedTree, ClassType, "constructor");
    };

    KonohaGrammar.TypeMethodCall = function (Gamma, ParsedTree, RecvNode, MethodName) {
        if (!RecvNode.IsErrorNode()) {
            var PolyFunc = ParsedTree.NameSpace.GetMethod(RecvNode.Type, FuncSymbol(MethodName), true);

            var ParamList = new Array();
            ParamList.add(RecvNode);
            var ResolvedFunc = PolyFunc.ResolveFunc(Gamma, ParsedTree, 1, ParamList);
            if (ResolvedFunc.ErrorNode != null) {
                return ResolvedFunc.ErrorNode;
            }
            if (ResolvedFunc.Func == null) {
                if (LibGreenTea.EqualsString(MethodName, "()")) {
                    return Gamma.CreateSyntaxErrorNode(ParsedTree, RecvNode.Type + " is not applicapable");
                } else {
                    return PolyFunc.ReportTypeError(Gamma, ParsedTree, RecvNode.Type, MethodName);
                }
            }
            Gamma.CheckFunc("method", ResolvedFunc.Func, ParsedTree.KeyToken);
            var Node = Gamma.Generator.CreateApplyNode(ResolvedFunc.ReturnType, ParsedTree, ResolvedFunc.Func);
            Node.Append(Gamma.Generator.CreateConstNode(Gamma.VarType, ParsedTree, ResolvedFunc.Func));
            Node.AppendNodeList(0, ParamList);
            return Node;
        }
        return RecvNode;
    };

    KonohaGrammar.TypePolyFunc = function (Gamma, ParsedTree, FuncNode, PolyFunc) {
        var ParamList = new Array();
        var ResolvedFunc = PolyFunc.ResolveFunc(Gamma, ParsedTree, 1, ParamList);
        if (ResolvedFunc.ErrorNode != null) {
            return ResolvedFunc.ErrorNode;
        }
        if (ResolvedFunc.Func != null) {
            FuncNode.ConstValue = ResolvedFunc.Func;
            FuncNode.Type = ResolvedFunc.Func.GetFuncType();
        }
        Gamma.CheckFunc("function", ResolvedFunc.Func, ParsedTree.KeyToken);
        var Node = Gamma.Generator.CreateApplyNode(ResolvedFunc.ReturnType, ParsedTree, ResolvedFunc.Func);
        Node.Append(FuncNode);
        Node.AppendNodeList(0, ParamList);
        return Node;
    };

    KonohaGrammar.TypeApply = function (Gamma, ParsedTree, ContextType) {
        var FuncNode = ParsedTree.TypeCheckAt(0, Gamma, Gamma.FuncType, NoCheckPolicy);
        if (FuncNode.IsErrorNode()) {
            return FuncNode;
        }
        if (FuncNode instanceof GtGetterNode) {
            var FuncName = FuncNode.Token.ParsedText;
            var BaseNode = (FuncNode).ExprNode;
            return KonohaGrammar.TypeMethodCall(Gamma, ParsedTree, BaseNode, FuncName);
        }
        if (FuncNode instanceof GtConstNode) {
            var Func = (FuncNode).ConstValue;
            if (Func instanceof GtType) {
                return KonohaGrammar.TypeNewNode(Gamma, ParsedTree, FuncNode.Token, Func, ContextType);
            } else if (Func instanceof GtFunc) {
                return KonohaGrammar.TypePolyFunc(Gamma, ParsedTree, (FuncNode), new GtPolyFunc(null).Append(Func, null));
            } else if (Func instanceof GtPolyFunc) {
                return KonohaGrammar.TypePolyFunc(Gamma, ParsedTree, (FuncNode), Func);
            }
        }

        if (FuncNode.Type.IsFuncType()) {
        }

        return KonohaGrammar.TypeMethodCall(Gamma, ParsedTree, FuncNode, "()");
    };

    KonohaGrammar.ParseNot = function (NameSpace, TokenContext, LeftTree, Pattern) {
        var Tree = new GtSyntaxTree(Pattern, NameSpace, TokenContext.Next(), null);
        Tree.SetMatchedPatternAt(UnaryTerm, NameSpace, TokenContext, "$SuffixExpression$", Required);
        return Tree;
    };

    KonohaGrammar.TypeNot = function (Gamma, ParsedTree, ContextType) {
        var ExprNode = ParsedTree.TypeCheckAt(UnaryTerm, Gamma, Gamma.BooleanType, DefaultTypeCheckPolicy);
        if (ExprNode.IsErrorNode()) {
            return ExprNode;
        }
        var OperatorSymbol = ParsedTree.KeyToken.ParsedText;
        var PolyFunc = ParsedTree.NameSpace.GetMethod(ExprNode.Type, FuncSymbol(OperatorSymbol), true);
        var ResolvedFunc = PolyFunc.ResolveUnaryMethod(Gamma, Gamma.BooleanType);
        LibGreenTea.Assert(ResolvedFunc != null);
        return Gamma.Generator.CreateUnaryNode(Gamma.BooleanType, ParsedTree, ResolvedFunc, ExprNode);
    };

    KonohaGrammar.TypeAnd = function (Gamma, ParsedTree, ContextType) {
        var LeftNode = ParsedTree.TypeCheckAt(LeftHandTerm, Gamma, Gamma.BooleanType, DefaultTypeCheckPolicy);
        var RightNode = ParsedTree.TypeCheckAt(RightHandTerm, Gamma, Gamma.BooleanType, DefaultTypeCheckPolicy);
        return Gamma.Generator.CreateAndNode(Gamma.BooleanType, ParsedTree, LeftNode, RightNode);
    };

    KonohaGrammar.TypeOr = function (Gamma, ParsedTree, ContextType) {
        var LeftNode = ParsedTree.TypeCheckAt(LeftHandTerm, Gamma, Gamma.BooleanType, DefaultTypeCheckPolicy);
        var RightNode = ParsedTree.TypeCheckAt(RightHandTerm, Gamma, Gamma.BooleanType, DefaultTypeCheckPolicy);
        return Gamma.Generator.CreateOrNode(Gamma.BooleanType, ParsedTree, LeftNode, RightNode);
    };

    KonohaGrammar.TypeInstanceOf = function (Gamma, ParsedTree, ContextType) {
        var LeftNode = ParsedTree.TypeCheckAt(LeftHandTerm, Gamma, Gamma.VarType, DefaultTypeCheckPolicy);
        var GivenType = ParsedTree.GetSyntaxTreeAt(RightHandTerm).GetParsedType();
        if (GivenType == null) {
            return Gamma.CreateSyntaxErrorNode(ParsedTree, "type is expected in " + ParsedTree.KeyToken);
        }
        return Gamma.Generator.CreateInstanceOfNode(Gamma.BooleanType, ParsedTree, LeftNode, GivenType);
    };

    KonohaGrammar.TypeAssign = function (Gamma, ParsedTree, ContextType) {
        var LeftNode = ParsedTree.TypeCheckAt(LeftHandTerm, Gamma, Gamma.VarType, DefaultTypeCheckPolicy);
        if (LeftNode.IsErrorNode()) {
            return LeftNode;
        }
        if (LeftNode instanceof GtLocalNode) {
            var RightNode = ParsedTree.TypeCheckAt(RightHandTerm, Gamma, LeftNode.Type, DefaultTypeCheckPolicy);
            return Gamma.Generator.CreateAssignNode(LeftNode.Type, ParsedTree, LeftNode, RightNode);
        }
        return Gamma.CreateSyntaxErrorNode(ParsedTree, "the left-hand side of an assignment must be variable");
    };

    KonohaGrammar.TypeSelfAssign = function (Gamma, ParsedTree, ContextType) {
        var LeftNode = ParsedTree.TypeCheckAt(LeftHandTerm, Gamma, Gamma.VarType, DefaultTypeCheckPolicy);
        if (LeftNode.IsErrorNode()) {
            return LeftNode;
        }
        if (!(LeftNode instanceof GtLocalNode || LeftNode instanceof GtGetterNode || LeftNode instanceof GtIndexerNode)) {
            return Gamma.CreateSyntaxErrorNode(ParsedTree, "the left-hand side of an assignment must be variable");
        }
        var RightNode = ParsedTree.TypeCheckAt(RightHandTerm, Gamma, LeftNode.Type, DefaultTypeCheckPolicy);
        var OperatorSymbol = ParsedTree.KeyToken.ParsedText;
        OperatorSymbol = OperatorSymbol.substring(0, OperatorSymbol.length - 1);
        var Func = null;
        var PolyFunc = ParsedTree.NameSpace.GetMethod(LeftNode.Type, FuncSymbol(OperatorSymbol), true);
        var ParamList = new Array();
        ParamList.add(LeftNode);
        var ResolvedFunc = PolyFunc.ResolveFunc(Gamma, ParsedTree, 1, ParamList);
        if (ResolvedFunc.Func != null) {
            LeftNode = ParamList.get(0);
            RightNode = ParamList.get(1);
        }
        return Gamma.Generator.CreateSelfAssignNode(LeftNode.Type, ParsedTree, ResolvedFunc.Func, LeftNode, RightNode);
    };

    KonohaGrammar.ParseIncl = function (NameSpace, TokenContext, LeftTree, Pattern) {
        var InclTree = new GtSyntaxTree(Pattern, NameSpace, TokenContext.Next(), null);
        if (LeftTree != null) {
            InclTree.SetSyntaxTreeAt(UnaryTerm, LeftTree);
        } else {
            var Tree = TokenContext.ParsePattern(NameSpace, "$Expression$", Required);
            InclTree.SetSyntaxTreeAt(UnaryTerm, Tree);
        }
        return InclTree;
    };

    KonohaGrammar.TypeIncl = function (Gamma, ParsedTree, Type) {
        var LeftNode = ParsedTree.TypeCheckAt(UnaryTerm, Gamma, Gamma.VarType, DefaultTypeCheckPolicy);
        if (LeftNode.Type == Gamma.IntType) {
            if (Type != Gamma.VoidType) {
                Gamma.Context.ReportError(WarningLevel, ParsedTree.KeyToken, "only available as statement: " + ParsedTree.KeyToken);
            }
            if (LeftNode instanceof GtLocalNode || LeftNode instanceof GtGetterNode || LeftNode instanceof GtIndexerNode) {
                var ConstNode = Gamma.Generator.CreateConstNode(LeftNode.Type, ParsedTree, 1);

                var OperatorSymbol = LibGreenTea.SubString(ParsedTree.KeyToken.ParsedText, 0, 1);
                var PolyFunc = ParsedTree.NameSpace.GetMethod(LeftNode.Type, FuncSymbol(OperatorSymbol), true);
                var ParamList = new Array();
                ParamList.add(LeftNode);
                ParamList.add(ConstNode);
                var ResolvedFunc = PolyFunc.ResolveFunc(Gamma, ParsedTree, 1, ParamList);
                return Gamma.Generator.CreateSelfAssignNode(LeftNode.Type, ParsedTree, ResolvedFunc.Func, LeftNode, ConstNode);
            }
            return Gamma.CreateSyntaxErrorNode(ParsedTree, "neither incremental nor decrimental");
        }
        return LeftNode.IsErrorNode() ? LeftNode : KonohaGrammar.TypeUnary(Gamma, ParsedTree, Type);
    };

    KonohaGrammar.ParseError = function (NameSpace, TokenContext, LeftTree, Pattern) {
        return new GtSyntaxTree(Pattern, NameSpace, TokenContext.GetToken(), null);
    };

    KonohaGrammar.TypeError = function (Gamma, ParsedTree, Type) {
        return Gamma.Generator.CreateErrorNode(Gamma.VoidType, ParsedTree);
    };

    KonohaGrammar.ParseEmpty = function (NameSpace, TokenContext, LeftTree, Pattern) {
        return new GtSyntaxTree(Pattern, NameSpace, TokenContext.GetBeforeToken(), null);
    };

    KonohaGrammar.TypeEmpty = function (Gamma, ParsedTree, Type) {
        return Gamma.Generator.CreateEmptyNode(Gamma.VoidType);
    };

    KonohaGrammar.ParseSemiColon = function (NameSpace, TokenContext, LeftTree, Pattern) {
        if (TokenContext.IsAllowedBackTrack()) {
            return null;
        } else {
            return TokenContext.ReportTokenError2(TokenContext.GetToken(), "unexpected ;", false);
        }
    };

    KonohaGrammar.ParseRequire = function (NameSpace, TokenContext, LeftTree, Pattern) {
        TokenContext.Next();
        while (TokenContext.HasNext()) {
            var Token = TokenContext.Next();
            if (Token.IsIndent() || Token.IsDelim()) {
                break;
            }
            if (Token.IsNameSymbol()) {
                if (!NameSpace.LoadRequiredLib(Token.ParsedText)) {
                    return TokenContext.NewErrorSyntaxTree(Token, "failed to load required library: " + Token.ParsedText);
                }
            }
            if (TokenContext.MatchToken(",")) {
                continue;
            }
        }
        return KonohaGrammar.ParseEmpty(NameSpace, TokenContext, LeftTree, Pattern);
    };

    KonohaGrammar.ParseJoinedName = function (TokenContext) {
        var Token = TokenContext.Next();
        var PackageName = LibGreenTea.UnquoteString(Token.ParsedText);
        while (TokenContext.HasNext()) {
            Token = TokenContext.Next();
            if (Token.IsNameSymbol() || LibGreenTea.EqualsString(Token.ParsedText, ".")) {
                PackageName += Token.ParsedText;
                continue;
            }
            break;
        }
        return PackageName;
    };

    KonohaGrammar.ParseImport = function (NameSpace, TokenContext, LeftTree, Pattern) {
        var ImportTree = TokenContext.CreateMatchedSyntaxTree(NameSpace, Pattern, "import");
        var PackageName = KonohaGrammar.ParseJoinedName(TokenContext);
        ImportTree.ParsedValue = PackageName;
        return ImportTree;
    };

    KonohaGrammar.TypeImport = function (Gamma, ParsedTree, Type) {
        var Value = LibGreenTea.ImportNativeObject(Gamma.NameSpace, ParsedTree.ParsedValue);
        if (Value == null) {
            return Gamma.CreateSyntaxErrorNode(ParsedTree, "cannot import: " + ParsedTree.ParsedValue);
        }
        return Gamma.Generator.CreateConstNode(Gamma.Context.GuessType(Value), ParsedTree, Value);
    };

    KonohaGrammar.ParseBlock = function (ParentNameSpace, TokenContext, LeftTree, Pattern) {
        if (TokenContext.MatchToken("{")) {
            var PrevTree = null;
            var NameSpace = ParentNameSpace.CreateSubNameSpace();
            while (TokenContext.HasNext()) {
                TokenContext.SkipEmptyStatement();
                if (TokenContext.MatchToken("}")) {
                    break;
                }
                var Annotation = TokenContext.SkipAndGetAnnotation(true);
                var ParsedTree = TokenContext.ParsePattern(NameSpace, "$Expression$", Required);
                if (IsMismatchedOrError(ParsedTree)) {
                    return ParsedTree;
                }
                ParsedTree.SetAnnotation(Annotation);

                if (ParsedTree.PrevTree != null) {
                    ParsedTree = TreeHead(ParsedTree);
                }
                PrevTree = LinkTree(PrevTree, ParsedTree);
                TokenContext.SkipIncompleteStatement();
            }
            if (PrevTree == null) {
                return TokenContext.ParsePattern(NameSpace, "$Empty$", Required);
            }
            return TreeHead(PrevTree);
        }
        return null;
    };

    KonohaGrammar.ParseStatement = function (NameSpace, TokenContext, LeftTree, Pattern) {
        var StmtTree = TokenContext.ParsePattern(NameSpace, "$Block$", Optional);
        if (StmtTree == null) {
            StmtTree = TokenContext.ParsePattern(NameSpace, "$Expression$", Optional);
        }
        if (StmtTree == null) {
            StmtTree = TokenContext.ParsePattern(NameSpace, "$Empty$", Required);
        }
        return StmtTree;
    };

    KonohaGrammar.ParseIf = function (NameSpace, TokenContext, LeftTree, Pattern) {
        var NewTree = TokenContext.CreateMatchedSyntaxTree(NameSpace, Pattern, "if");
        NewTree.SetMatchedTokenAt(NoWhere, NameSpace, TokenContext, "(", Required | OpenSkipIndent);
        NewTree.SetMatchedPatternAt(IfCond, NameSpace, TokenContext, "$Expression$", Required);
        NewTree.SetMatchedTokenAt(NoWhere, NameSpace, TokenContext, ")", Required | CloseSkipIndent);
        NewTree.SetMatchedPatternAt(IfThen, NameSpace, TokenContext, "$Statement$", AllowLineFeed | Required);
        TokenContext.SkipEmptyStatement();
        if (TokenContext.MatchToken2("else", AllowLineFeed)) {
            NewTree.SetMatchedPatternAt(IfElse, NameSpace, TokenContext, "$Statement$", AllowLineFeed | Required);
        }
        return NewTree;
    };

    KonohaGrammar.TypeIf = function (Gamma, ParsedTree, ContextType) {
        var CondNode = ParsedTree.TypeCheckAt(IfCond, Gamma, Gamma.BooleanType, DefaultTypeCheckPolicy);
        var ThenNode = ParsedTree.TypeCheckAt(IfThen, Gamma, Gamma.VoidType, DefaultTypeCheckPolicy);
        var ElseNode = ParsedTree.TypeCheckAt(IfElse, Gamma, Gamma.VoidType, DefaultTypeCheckPolicy);
        if (ThenNode.HasReturnNode() && ElseNode != null && ElseNode.HasReturnNode()) {
            ParsedTree.NextTree = null;
        }
        return Gamma.Generator.CreateIfNode(ThenNode.Type, ParsedTree, CondNode, ThenNode, ElseNode);
    };

    KonohaGrammar.ParseWhile = function (NameSpace, TokenContext, LeftTree, Pattern) {
        var WhileTree = TokenContext.CreateMatchedSyntaxTree(NameSpace, Pattern, "while");
        WhileTree.SetMatchedTokenAt(NoWhere, NameSpace, TokenContext, "(", Required | OpenSkipIndent);
        WhileTree.SetMatchedPatternAt(WhileCond, NameSpace, TokenContext, "$Expression$", Required);
        WhileTree.SetMatchedTokenAt(NoWhere, NameSpace, TokenContext, ")", Required | CloseSkipIndent);
        WhileTree.SetMatchedPatternAt(WhileBody, NameSpace, TokenContext, "$Statement$", Required);
        return WhileTree;
    };

    KonohaGrammar.TypeWhile = function (Gamma, ParsedTree, ContextType) {
        var CondNode = ParsedTree.TypeCheckAt(WhileCond, Gamma, Gamma.BooleanType, DefaultTypeCheckPolicy);
        var BodyNode = ParsedTree.TypeCheckAt(WhileBody, Gamma, Gamma.VoidType, DefaultTypeCheckPolicy);
        return Gamma.Generator.CreateWhileNode(BodyNode.Type, ParsedTree, CondNode, BodyNode);
    };

    KonohaGrammar.ParseDoWhile = function (NameSpace, TokenContext, LeftTree, Pattern) {
        var Tree = TokenContext.CreateMatchedSyntaxTree(NameSpace, Pattern, "do");
        Tree.SetMatchedPatternAt(WhileBody, NameSpace, TokenContext, "$Statement$", Required);
        Tree.SetMatchedTokenAt(NoWhere, NameSpace, TokenContext, "while", Required);
        Tree.SetMatchedTokenAt(NoWhere, NameSpace, TokenContext, "(", Required | OpenSkipIndent);
        Tree.SetMatchedPatternAt(WhileCond, NameSpace, TokenContext, "$Expression$", Required);
        Tree.SetMatchedTokenAt(NoWhere, NameSpace, TokenContext, ")", Required | CloseSkipIndent);
        return Tree;
    };

    KonohaGrammar.TypeDoWhile = function (Gamma, ParsedTree, ContextType) {
        var CondNode = ParsedTree.TypeCheckAt(WhileCond, Gamma, Gamma.BooleanType, DefaultTypeCheckPolicy);
        var BodyNode = ParsedTree.TypeCheckAt(WhileBody, Gamma, Gamma.VoidType, DefaultTypeCheckPolicy);
        return Gamma.Generator.CreateDoWhileNode(BodyNode.Type, ParsedTree, CondNode, BodyNode);
    };

    KonohaGrammar.ParseFor = function (NameSpace, TokenContext, LeftTree, Pattern) {
        var Tree = TokenContext.CreateMatchedSyntaxTree(NameSpace, Pattern, "for");
        Tree.SetMatchedTokenAt(NoWhere, NameSpace, TokenContext, "(", Required | OpenSkipIndent);
        Tree.SetMatchedPatternAt(ForInit, NameSpace, TokenContext, "$Expression$", Optional);
        Tree.SetMatchedTokenAt(NoWhere, NameSpace, TokenContext, ";", Required);
        Tree.SetMatchedPatternAt(ForCond, NameSpace, TokenContext, "$Expression$", Optional);
        Tree.SetMatchedTokenAt(NoWhere, NameSpace, TokenContext, ";", Required);
        Tree.SetMatchedPatternAt(ForIteration, NameSpace, TokenContext, "$Expression$", Optional);
        Tree.SetMatchedTokenAt(NoWhere, NameSpace, TokenContext, ")", Required | CloseSkipIndent);
        Tree.SetMatchedPatternAt(ForBody, NameSpace, TokenContext, "$Statement$", Required);
        return Tree;
    };

    KonohaGrammar.TypeFor = function (Gamma, ParsedTree, ContextType) {
        var InitNode = null;
        var CondNode = null;
        var IterNode = null;
        if (ParsedTree.HasNodeAt(ForInit)) {
            InitNode = ParsedTree.TypeCheckAt(ForInit, Gamma, Gamma.VarType, DefaultTypeCheckPolicy);
        }
        if (ParsedTree.HasNodeAt(ForCond)) {
            CondNode = ParsedTree.TypeCheckAt(ForCond, Gamma, Gamma.BooleanType, DefaultTypeCheckPolicy);
        }
        if (ParsedTree.HasNodeAt(ForIteration)) {
            IterNode = ParsedTree.TypeCheckAt(ForIteration, Gamma, Gamma.VarType, DefaultTypeCheckPolicy);
        }
        var BodyNode = ParsedTree.TypeCheckAt(ForBody, Gamma, Gamma.VoidType, DefaultTypeCheckPolicy);
        var ForNode = Gamma.Generator.CreateForNode(BodyNode.Type, ParsedTree, CondNode, IterNode, BodyNode);
        if (InitNode != null) {
            if (InitNode instanceof GtVarNode) {
                (InitNode).BlockNode = ForNode;
            } else {
                InitNode = LinkNode(InitNode, ForNode);
            }
            return InitNode;
        }
        return ForNode;
    };

    KonohaGrammar.ParseBreak = function (NameSpace, TokenContext, LeftTree, Pattern) {
        return TokenContext.CreateMatchedSyntaxTree(NameSpace, Pattern, "break");
    };

    KonohaGrammar.TypeBreak = function (Gamma, ParsedTree, ContextType) {
        return Gamma.Generator.CreateBreakNode(Gamma.VoidType, ParsedTree, "");
    };

    KonohaGrammar.ParseContinue = function (NameSpace, TokenContext, LeftTree, Pattern) {
        return TokenContext.CreateMatchedSyntaxTree(NameSpace, Pattern, "continue");
    };

    KonohaGrammar.TypeContinue = function (Gamma, ParsedTree, ContextType) {
        return Gamma.Generator.CreateContinueNode(Gamma.VoidType, ParsedTree, "");
    };

    KonohaGrammar.ParseReturn = function (NameSpace, TokenContext, LeftTree, Pattern) {
        var ReturnTree = TokenContext.CreateMatchedSyntaxTree(NameSpace, Pattern, "return");
        ReturnTree.SetMatchedPatternAt(ReturnExpr, NameSpace, TokenContext, "$Expression$", Optional);
        return ReturnTree;
    };

    KonohaGrammar.TypeReturn = function (Gamma, ParsedTree, ContextType) {
        ParsedTree.NextTree = null;
        if (Gamma.IsTopLevel()) {
            return Gamma.UnsupportedTopLevelError(ParsedTree);
        }
        var ReturnType = Gamma.Func.GetReturnType();
        if (ParsedTree.HasNodeAt(ReturnExpr)) {
            var Expr = ParsedTree.TypeCheckAt(ReturnExpr, Gamma, ReturnType, DefaultTypeCheckPolicy);
            if (ReturnType == Gamma.VarType && !Expr.IsErrorNode()) {
                Gamma.Func.Types[0] = Expr.Type;
                Gamma.ReportTypeInference(ParsedTree.KeyToken, "return value of " + Gamma.Func.FuncName, Expr.Type);
            }
            if (ReturnType == Gamma.VoidType) {
                Gamma.Context.ReportError(WarningLevel, ParsedTree.KeyToken, "ignored return value");
                return Gamma.Generator.CreateReturnNode(ReturnType, ParsedTree, null);
            }
            return Gamma.Generator.CreateReturnNode(Expr.Type, ParsedTree, Expr);
        } else {
            if (ReturnType == Gamma.VarType) {
                Gamma.Func.Types[0] = Gamma.VoidType;
                Gamma.ReportTypeInference(ParsedTree.KeyToken, "return value of " + Gamma.Func.FuncName, Gamma.VoidType);
            }
            if (Gamma.Func.Is(ConstructorFunc)) {
                var ThisNode = Gamma.CreateLocalNode(ParsedTree, Gamma.Generator.GetRecvName());
                return Gamma.Generator.CreateReturnNode(ThisNode.Type, ParsedTree, ThisNode);
            }
            if (ReturnType != Gamma.VoidType) {
                Gamma.Context.ReportError(WarningLevel, ParsedTree.KeyToken, "returning default value of " + ReturnType);
                return Gamma.Generator.CreateReturnNode(ReturnType, ParsedTree, Gamma.CreateDefaultValue(ParsedTree, ReturnType));
            }
            return Gamma.Generator.CreateReturnNode(ReturnType, ParsedTree, null);
        }
    };

    KonohaGrammar.ParseTry = function (NameSpace, TokenContext, LeftTree, Pattern) {
        var TryTree = TokenContext.CreateMatchedSyntaxTree(NameSpace, Pattern, "try");
        TryTree.SetMatchedPatternAt(TryBody, NameSpace, TokenContext, "$Block$", Required);
        TokenContext.SkipEmptyStatement();
        if (TokenContext.MatchToken("catch")) {
            TryTree.SetMatchedTokenAt(NoWhere, NameSpace, TokenContext, "(", Required | OpenSkipIndent);
            TryTree.SetMatchedPatternAt(CatchVariable, NameSpace, TokenContext, "$VarDecl$", Required);
            TryTree.SetMatchedTokenAt(NoWhere, NameSpace, TokenContext, ")", Required | CloseSkipIndent);
            TryTree.SetMatchedPatternAt(CatchBody, NameSpace, TokenContext, "$Block$", Required);
        }
        TokenContext.SkipEmptyStatement();
        if (TokenContext.MatchToken("finally")) {
            TryTree.SetMatchedPatternAt(FinallyBody, NameSpace, TokenContext, "$Block$", Required);
        }
        return TryTree;
    };

    KonohaGrammar.TypeTry = function (Gamma, ParsedTree, ContextType) {
        var TryNode = ParsedTree.TypeCheckAt(TryBody, Gamma, Gamma.VoidType, DefaultTypeCheckPolicy);
        var CatchExpr = null;
        var CatchNode = null;
        if (ParsedTree.HasNodeAt(CatchVariable)) {
            CatchExpr = ParsedTree.TypeCheckAt(CatchVariable, Gamma, Gamma.VarType, DefaultTypeCheckPolicy);
            CatchNode = ParsedTree.TypeCheckAt(CatchBody, Gamma, Gamma.VoidType, DefaultTypeCheckPolicy);
        }
        var FinallyNode = ParsedTree.TypeCheckAt(FinallyBody, Gamma, Gamma.VoidType, DefaultTypeCheckPolicy);
        return Gamma.Generator.CreateTryNode(TryNode.Type, ParsedTree, TryNode, CatchExpr, CatchNode, FinallyNode);
    };

    KonohaGrammar.ParseThrow = function (NameSpace, TokenContext, LeftTree, Pattern) {
        var ThrowTree = TokenContext.CreateMatchedSyntaxTree(NameSpace, Pattern, "throw");
        ThrowTree.SetMatchedPatternAt(ReturnExpr, NameSpace, TokenContext, "$Expression$", Required);
        return ThrowTree;
    };

    KonohaGrammar.TypeThrow = function (Gamma, ParsedTree, ContextType) {
        ParsedTree.NextTree = null;
        var FaultType = ContextType;
        var ExprNode = ParsedTree.TypeCheckAt(ReturnExpr, Gamma, FaultType, DefaultTypeCheckPolicy);
        return Gamma.Generator.CreateThrowNode(ExprNode.Type, ParsedTree, ExprNode);
    };

    KonohaGrammar.ParseThis = function (NameSpace, TokenContext, LeftTree, Pattern) {
        return TokenContext.CreateMatchedSyntaxTree(NameSpace, Pattern, "this");
    };

    KonohaGrammar.TypeThis = function (Gamma, ParsedTree, ContextType) {
        return Gamma.CreateLocalNode(ParsedTree, Gamma.Generator.GetRecvName());
    };

    KonohaGrammar.ParseLine = function (NameSpace, TokenContext, LeftTree, Pattern) {
        return TokenContext.CreateMatchedSyntaxTree(NameSpace, Pattern, "__line__");
    };

    KonohaGrammar.TypeLine = function (Gamma, ParsedTree, ContextType) {
        return Gamma.Generator.CreateConstNode(Gamma.StringType, ParsedTree, Gamma.Context.GetSourcePosition(ParsedTree.KeyToken.FileLine));
    };

    KonohaGrammar.ParseSymbols = function (NameSpace, TokenContext, LeftTree, Pattern) {
        return TokenContext.CreateMatchedSyntaxTree(NameSpace, Pattern, "__").ToConstTree(NameSpace);
    };

    KonohaGrammar.ParseSuper = function (NameSpace, TokenContext, LeftTree, Pattern) {
        var Tree = TokenContext.CreateMatchedSyntaxTree(NameSpace, Pattern, "super");

        return Tree;
    };

    KonohaGrammar.ParseNew = function (NameSpace, TokenContext, LeftTree, Pattern) {
        var NewTree = TokenContext.CreateMatchedSyntaxTree(NameSpace, Pattern, "new");
        NewTree.SetMatchedPatternAt(0, NameSpace, TokenContext, "$Type$", Optional);
        if (!NewTree.HasNodeAt(0)) {
            NewTree.SetSyntaxTreeAt(0, NewTree.CreateConstTree(NameSpace.Context.VarType));
        }
        var ParseFlag = TokenContext.SetSkipIndent(true);
        NewTree.SetMatchedTokenAt(NoWhere, NameSpace, TokenContext, "(", Required);
        if (!TokenContext.MatchToken(")")) {
            while (!NewTree.IsMismatchedOrError()) {
                NewTree.AppendMatchedPattern(NameSpace, TokenContext, "$Expression$", Required);
                if (TokenContext.MatchToken(")")) {
                    break;
                }
                NewTree.SetMatchedTokenAt(NoWhere, NameSpace, TokenContext, ",", Required);
            }
        }
        TokenContext.SetRememberFlag(ParseFlag);
        return NewTree;
    };

    KonohaGrammar.ParseEnum = function (NameSpace, TokenContext, LeftTree, Pattern) {
        var EnumTypeName = null;
        var NewEnumType = null;
        var EnumMap = new GtMap();
        var EnumTree = TokenContext.CreateMatchedSyntaxTree(NameSpace, Pattern, "enum");
        EnumTree.SetMatchedPatternAt(EnumNameTreeIndex, NameSpace, TokenContext, "$FuncName$", Required);
        if (!EnumTree.IsMismatchedOrError()) {
            EnumTypeName = EnumTree.GetSyntaxTreeAt(EnumNameTreeIndex).KeyToken.ParsedText;
            NewEnumType = NameSpace.Context.EnumBaseType.CreateSubType(EnumType, EnumTypeName, null, EnumMap);
        }
        EnumTree.SetMatchedTokenAt(NoWhere, NameSpace, TokenContext, "{", Required);
        var EnumValue = 0;
        var NameList = new Array();
        while (!EnumTree.IsMismatchedOrError()) {
            TokenContext.SkipIndent();
            if (TokenContext.MatchToken(",")) {
                continue;
            }
            if (TokenContext.MatchToken("}")) {
                break;
            }
            var Token = TokenContext.Next();
            if (LibGreenTea.IsVariableName(Token.ParsedText, 0)) {
                if (EnumMap.GetOrNull(Token.ParsedText) != null) {
                    NameSpace.Context.ReportError(ErrorLevel, Token, "duplicated name: " + Token.ParsedText);
                    continue;
                }
                NameList.add(Token);
                EnumMap.put(Token.ParsedText, new GreenTeaEnum(NewEnumType, EnumValue, Token.ParsedText));
                EnumValue += 1;
                continue;
            }
        }
        if (!EnumTree.IsMismatchedOrError()) {
            var StoreNameSpace = NameSpace.GetNameSpace(KonohaGrammar.ParseNameSpaceFlag(0, TokenContext.ParsingAnnotation));
            StoreNameSpace.AppendTypeName(NewEnumType, EnumTree.GetSyntaxTreeAt(EnumNameTreeIndex).KeyToken);
            var i = 0;
            while (i < LibGreenTea.ListSize(NameList)) {
                var Key = NameList.get(i).ParsedText;
                StoreNameSpace.SetSymbol(ClassStaticSymbol(NewEnumType, Key), EnumMap.GetOrNull(Key), NameList.get(i));
                i = i + 1;
            }
            EnumTree.ParsedValue = NewEnumType;
        }
        return EnumTree;
    };

    KonohaGrammar.TypeEnum = function (Gamma, ParsedTree, ContextType) {
        var EnumType = ParsedTree.ParsedValue;
        return Gamma.Generator.CreateConstNode(Gamma.Context.GuessType(EnumType), ParsedTree, EnumType);
    };

    KonohaGrammar.ParseCaseBlock = function (ParentNameSpace, TokenContext, LeftTree, Pattern) {
        var PrevTree = null;
        var NameSpace = ParentNameSpace.CreateSubNameSpace();
        var IsCaseBlock = TokenContext.MatchToken("{");
        while (TokenContext.HasNext()) {
            TokenContext.SkipEmptyStatement();
            if (TokenContext.IsToken("case")) {
                break;
            }
            if (TokenContext.IsToken("default")) {
                break;
            }
            if (TokenContext.IsToken("}")) {
                if (!IsCaseBlock) {
                }
                break;
            }
            var Annotation = TokenContext.SkipAndGetAnnotation(true);
            var CurrentTree = TokenContext.ParsePattern(NameSpace, "$Expression$", Required);
            if (IsMismatchedOrError(CurrentTree)) {
                return CurrentTree;
            }
            CurrentTree.SetAnnotation(Annotation);
            PrevTree = LinkTree(PrevTree, CurrentTree);
        }
        if (PrevTree == null) {
            return TokenContext.ParsePattern(NameSpace, "$Empty$", Required);
        }
        return TreeHead(PrevTree);
    };

    KonohaGrammar.ParseSwitch = function (NameSpace, TokenContext, LeftTree, Pattern) {
        var SwitchTree = TokenContext.CreateMatchedSyntaxTree(NameSpace, Pattern, "switch");
        SwitchTree.SetMatchedTokenAt(NoWhere, NameSpace, TokenContext, "(", Required | OpenSkipIndent);
        SwitchTree.SetMatchedPatternAt(SwitchCaseCondExpr, NameSpace, TokenContext, "$Expression$", Required);
        SwitchTree.SetMatchedTokenAt(NoWhere, NameSpace, TokenContext, ")", Required | CloseSkipIndent);
        SwitchTree.SetMatchedTokenAt(NoWhere, NameSpace, TokenContext, "{", Required);

        var CaseIndex = SwitchCaseCaseIndex;
        var ParseFlag = TokenContext.SetSkipIndent(true);
        while (!SwitchTree.IsMismatchedOrError() && !TokenContext.MatchToken("}")) {
            if (TokenContext.MatchToken("case")) {
                SwitchTree.SetMatchedPatternAt(CaseIndex, NameSpace, TokenContext, "$Expression$", Required);
                SwitchTree.SetMatchedTokenAt(NoWhere, NameSpace, TokenContext, ":", Required);
                SwitchTree.SetMatchedPatternAt(CaseIndex + 1, NameSpace, TokenContext, "$CaseBlock$", Required);
                CaseIndex += 2;
                continue;
            }
            if (TokenContext.MatchToken("default")) {
                SwitchTree.SetMatchedTokenAt(NoWhere, NameSpace, TokenContext, ":", Required);
                SwitchTree.SetMatchedPatternAt(SwitchCaseDefaultBlock, NameSpace, TokenContext, "$CaseBlock$", Required);
            }
        }
        TokenContext.SetRememberFlag(ParseFlag);
        return SwitchTree;
    };

    KonohaGrammar.TypeSwitch = function (Gamma, ParsedTree, ContextType) {
        var CondNode = ParsedTree.TypeCheckAt(IfCond, Gamma, Gamma.VarType, DefaultTypeCheckPolicy);
        var DefaultNode = null;
        if (ParsedTree.HasNodeAt(SwitchCaseDefaultBlock)) {
            DefaultNode = ParsedTree.TypeCheckAt(SwitchCaseDefaultBlock, Gamma, Gamma.VoidType, DefaultTypeCheckPolicy);
        }
        var Node = Gamma.Generator.CreateSwitchNode(Gamma.VoidType, ParsedTree, CondNode, DefaultNode);
        var CaseIndex = SwitchCaseCaseIndex;
        while (CaseIndex < ParsedTree.SubTreeList.size()) {
            var CaseExpr = ParsedTree.TypeCheckAt(CaseIndex, Gamma, CondNode.Type, DefaultTypeCheckPolicy);
            var CaseBlock = null;
            if (ParsedTree.HasNodeAt(CaseIndex + 1)) {
                CaseBlock = ParsedTree.TypeCheckAt(CaseIndex + 1, Gamma, Gamma.VoidType, DefaultTypeCheckPolicy);
            }
            Node.Append(CaseExpr);
            Node.Append(CaseBlock);
            CaseIndex += 2;
        }
        return Node;
    };

    KonohaGrammar.ParseSymbolDecl = function (NameSpace, TokenContext, LeftTree, Pattern) {
        var SymbolDeclTree = new GtSyntaxTree(Pattern, NameSpace, TokenContext.Next(), null);
        var ConstClass = null;
        SymbolDeclTree.SetMatchedPatternAt(SymbolDeclNameIndex, NameSpace, TokenContext, "$Variable$", Required);
        if (TokenContext.MatchToken(".")) {
            var ClassName = SymbolDeclTree.GetSyntaxTreeAt(SymbolDeclNameIndex).KeyToken.ParsedText;
            ConstClass = NameSpace.GetType(ClassName);
            if (ConstClass == null) {
                return TokenContext.ReportExpectedMessage(SymbolDeclTree.GetSyntaxTreeAt(SymbolDeclNameIndex).KeyToken, "type name", true);
            }
            SymbolDeclTree.SetMatchedPatternAt(SymbolDeclNameIndex, NameSpace, TokenContext, "$Variable$", Required);
        }
        SymbolDeclTree.SetMatchedTokenAt(NoWhere, NameSpace, TokenContext, "=", Required);
        SymbolDeclTree.SetMatchedPatternAt(SymbolDeclValueIndex, NameSpace, TokenContext, "$Expression$", Required);

        if (SymbolDeclTree.IsValidSyntax()) {
            var SourceToken = SymbolDeclTree.GetSyntaxTreeAt(SymbolDeclNameIndex).KeyToken;
            var ConstName = SourceToken.ParsedText;
            if (ConstClass != null) {
                ConstName = ClassStaticSymbol(ConstClass, ConstName);
                SourceToken.AddTypeInfoToErrorMessage(ConstClass);
            }
            var ConstValue = null;
            if (SymbolDeclTree.GetSyntaxTreeAt(SymbolDeclValueIndex).Pattern.EqualsName("$Const$")) {
                ConstValue = SymbolDeclTree.GetSyntaxTreeAt(SymbolDeclValueIndex).ParsedValue;
            }
            if (ConstValue == null) {
                var Gamma = new GtTypeEnv(NameSpace);
                var Node = SymbolDeclTree.TypeCheckAt(SymbolDeclValueIndex, Gamma, Gamma.VarType, OnlyConstPolicy);
                if (Node.IsErrorNode()) {
                    SymbolDeclTree.ToError(Node.Token);
                    return SymbolDeclTree;
                }
                ConstValue = Node.ToConstValue(true);
            }
            var NameSpaceFlag = KonohaGrammar.ParseNameSpaceFlag(0, TokenContext.ParsingAnnotation);
            var StoreNameSpace = NameSpace.GetNameSpace(NameSpaceFlag);
            StoreNameSpace.SetSymbol(ConstName, ConstValue, SourceToken);
        }
        return SymbolDeclTree;
    };

    KonohaGrammar.TypeSymbolDecl = function (Gamma, ParsedTree, ContextType) {
        return Gamma.Generator.CreateEmptyNode(ContextType);
    };

    KonohaGrammar.ParseFuncName = function (NameSpace, TokenContext, LeftTree, Pattern) {
        var Token = TokenContext.Next();
        var Name = Token.ParsedText;
        if (Token.IsQuoted()) {
            Name = LibGreenTea.UnquoteString(Name);
            Token.ParsedText = Name;
            return new GtSyntaxTree(Pattern, NameSpace, Token, Name);
        }
        if (Name.length > 0 && LibGreenTea.CharAt(Name, 0) != 40 && LibGreenTea.CharAt(Name, 0) != 46) {
            return new GtSyntaxTree(Pattern, NameSpace, Token, Name);
        }
        return TokenContext.ReportExpectedMessage(Token, "name", true);
    };

    KonohaGrammar.ParseFuncParam = function (NameSpace, TokenContext, FuncDeclTree, FuncBlock) {
        var ParamBase = FuncDeclParam;
        while (!FuncDeclTree.IsMismatchedOrError() && !TokenContext.MatchToken(")")) {
            TokenContext.SkipIndent();
            if (ParamBase != FuncDeclParam) {
                FuncDeclTree.SetMatchedTokenAt(NoWhere, NameSpace, TokenContext, ",", Required);
                TokenContext.SkipIndent();
            }
            FuncDeclTree.SetMatchedPatternAt(ParamBase + VarDeclType, NameSpace, TokenContext, "$Type$", Required);
            FuncDeclTree.SetMatchedPatternAt(ParamBase + VarDeclName, NameSpace, TokenContext, "$Variable$", Required);
            if (FuncDeclTree.IsValidSyntax()) {
                FuncBlock.AddParameter(FuncDeclTree.GetSyntaxTreeAt(ParamBase + VarDeclType).GetParsedType(), FuncDeclTree.GetSyntaxTreeAt(ParamBase + VarDeclName).KeyToken.ParsedText);
            }
            if (TokenContext.MatchToken("=")) {
                FuncDeclTree.SetMatchedPatternAt(ParamBase + VarDeclValue, NameSpace, TokenContext, "$Expression$", Required);
            }
            ParamBase += 3;
        }
        TokenContext.SetSkipIndent(false);
    };

    KonohaGrammar.ParseFuncBody = function (NameSpace, TokenContext, FuncDeclTree, FuncBlock) {
        TokenContext.SkipIndent();
        if (TokenContext.MatchToken("as")) {
            var Token = TokenContext.Next();
            FuncBlock.DefinedFunc.SetNativeMacro(LibGreenTea.UnquoteString(Token.ParsedText));
        } else if (TokenContext.IsToken("import")) {
            var ImportTree = TokenContext.ParsePattern(NameSpace, "import", Optional);
            if (IsValidSyntax(ImportTree)) {
                if (!LibGreenTea.ImportNativeMethod(NameSpace, FuncBlock.DefinedFunc, ImportTree.ParsedValue)) {
                    NameSpace.Context.ReportError(WarningLevel, ImportTree.KeyToken, "unable to import: " + ImportTree.ParsedValue);
                }
            }
        } else {
            var BlockTree = TokenContext.ParsePattern(NameSpace, "$Block$", Optional);
            if (IsValidSyntax(BlockTree)) {
                FuncBlock.FuncBlock = BlockTree;
                var ReturnTree = new GtSyntaxTree(NameSpace.GetSyntaxPattern("return"), NameSpace, BlockTree.KeyToken, null);
                LinkTree(TreeTail(BlockTree), ReturnTree);
                FuncBlock.DefinedFunc.FuncBody = FuncBlock;
            }
        }
    };

    KonohaGrammar.ParseFuncDecl = function (NameSpace, TokenContext, LeftTree, Pattern) {
        var FuncDeclTree = new GtSyntaxTree(Pattern, NameSpace, TokenContext.GetToken(), null);
        var FuncFlag = KonohaGrammar.ParseFuncFlag(0, TokenContext.ParsingAnnotation);
        var TypeList = new Array();
        LibGreenTea.Assert(LeftTree != null);
        FuncDeclTree.SetSyntaxTreeAt(FuncDeclReturnType, LeftTree);
        TypeList.add(LeftTree.GetParsedType());
        FuncDeclTree.SetMatchedPatternAt(FuncDeclName, NameSpace, TokenContext, "$FuncName$", Required);
        FuncDeclTree.SetMatchedTokenAt(NoWhere, NameSpace, TokenContext, "(", Required | OpenSkipIndent);
        if (FuncDeclTree.IsValidSyntax()) {
            var FuncBlock = new GtFuncBlock(NameSpace, TypeList);
            var FoundAbstractFunc = false;
            var SourceToken = FuncDeclTree.GetSyntaxTreeAt(FuncDeclName).KeyToken;
            var FuncName = FuncSymbol(SourceToken.ParsedText);
            var ParseFlag = TokenContext.SetBackTrack(false);
            var StoreNameSpace = NameSpace.GetNameSpace(KonohaGrammar.ParseNameSpaceFlag(0, TokenContext.ParsingAnnotation));
            if (LibGreenTea.EqualsString(FuncName, "converter")) {
                FuncFlag |= ConverterFunc;
                FuncBlock.SetConverterType();
                KonohaGrammar.ParseFuncParam(NameSpace, TokenContext, FuncDeclTree, FuncBlock);
                if (TypeList.size() != 3) {
                    NameSpace.Context.ReportError(ErrorLevel, SourceToken, "converter takes one parameter");
                    FuncDeclTree.ToError(SourceToken);
                    return FuncDeclTree;
                }
                FuncName = "to" + TypeList.get(0);
                FuncBlock.DefinedFunc = NameSpace.Context.Generator.CreateFunc(FuncFlag, FuncName, 0, FuncBlock.TypeList);
                KonohaGrammar.ParseFuncBody(NameSpace, TokenContext, FuncDeclTree, FuncBlock);
                if (IsFlag(FuncFlag, StrongCoercionFunc)) {
                    var FromType = FuncBlock.DefinedFunc.GetFuncParamType(1);
                    var ToType = FuncBlock.DefinedFunc.GetReturnType();
                    FromType.SetUnrevealedType(ToType);
                    StoreNameSpace = ToType.Context.RootNameSpace;
                }
                SourceToken.ParsedText = FuncName;
                StoreNameSpace.SetConverterFunc(null, null, FuncBlock.DefinedFunc, SourceToken);
            } else {
                FuncBlock.SetThisIfInClass(NameSpace.GetType("This"));
                KonohaGrammar.ParseFuncParam(NameSpace, TokenContext, FuncDeclTree, FuncBlock);
                FuncBlock.DefinedFunc = NameSpace.GetFunc(FuncName, 0, TypeList);
                if (FuncBlock.DefinedFunc == null || !FuncBlock.DefinedFunc.IsAbstract()) {
                    FuncBlock.DefinedFunc = NameSpace.Context.Generator.CreateFunc(FuncFlag, FuncName, 0, TypeList);
                } else {
                    FoundAbstractFunc = true;
                    FuncBlock.DefinedFunc.FuncFlag = FuncFlag;
                }
                KonohaGrammar.ParseFuncBody(NameSpace, TokenContext, FuncDeclTree, FuncBlock);
                if (!FuncBlock.DefinedFunc.IsAbstract() || !FoundAbstractFunc) {
                    if (!FuncBlock.DefinedFunc.Is(MethodFunc) || !FuncBlock.DefinedFunc.Is(OperatorFunc)) {
                        StoreNameSpace.AppendFunc(FuncBlock.DefinedFunc, SourceToken);
                    }
                    var RecvType = FuncBlock.DefinedFunc.GetRecvType();
                    if (RecvType.IsVoidType() || LibGreenTea.EqualsString(FuncBlock.DefinedFunc.FuncName, "_")) {
                    } else {
                        StoreNameSpace.AppendMethod(FuncBlock.DefinedFunc, SourceToken.AddTypeInfoToErrorMessage(RecvType));
                    }
                }
            }
            FuncDeclTree.ParsedValue = FuncBlock.DefinedFunc;
            TokenContext.SetRememberFlag(ParseFlag);
        }
        return FuncDeclTree;
    };

    KonohaGrammar.TypeFuncDecl = function (Gamma, ParsedTree, ContextType) {
        var DefinedFunc = ParsedTree.ParsedValue;
        DefinedFunc.GenerateNativeFunc();
        return Gamma.Generator.CreateEmptyNode(Gamma.VoidType);
    };

    KonohaGrammar.ParseGenericFuncDecl = function (NameSpace, TokenContext, LeftTree, Pattern) {
        var FuncTree = TokenContext.CreateSyntaxTree(NameSpace, Pattern, null);
        var RevertList = new Array();
        FuncTree.SetMatchedTokenAt(KeyTokenIndex, NameSpace, TokenContext, "<", Required);
        var StartIndex = GenericParam;
        while (FuncTree.IsValidSyntax()) {
            var ParamBaseType = NameSpace.Context.VarType;
            FuncTree.SetMatchedPatternAt(StartIndex, NameSpace, TokenContext, "$Variable$", Required);
            if (TokenContext.MatchToken(":")) {
                FuncTree.SetMatchedPatternAt(StartIndex + 1, NameSpace, TokenContext, "$Type$", Required);
                if (FuncTree.IsValidSyntax()) {
                    ParamBaseType = FuncTree.GetSyntaxTreeAt(StartIndex).GetParsedType();
                }
            }
            if (FuncTree.IsValidSyntax()) {
                var SourceToken = FuncTree.GetSyntaxTreeAt(StartIndex).KeyToken;
                NameSpace.AppendTypeVariable(SourceToken.ParsedText, ParamBaseType, SourceToken, RevertList);
            }
            if (TokenContext.MatchToken(">")) {
                break;
            }
            FuncTree.SetMatchedTokenAt(NoWhere, NameSpace, TokenContext, ",", Required);
            StartIndex += 2;
        }
        FuncTree.SetMatchedPatternAt(GenericReturnType, NameSpace, TokenContext, "$Type$", Required);
        if (FuncTree.IsValidSyntax()) {
            FuncTree = KonohaGrammar.ParseFuncDecl(NameSpace, TokenContext, FuncTree.GetSyntaxTreeAt(GenericReturnType), NameSpace.GetSyntaxPattern("$FuncDecl$"));
            if (FuncTree.IsValidSyntax()) {
                var DefinedFunc = FuncTree.ParsedValue;
                DefinedFunc.FuncFlag |= GenericFunc;
            }
        }
        NameSpace.Revert(RevertList);
        return FuncTree;
    };

    KonohaGrammar.ParseConstructor2 = function (NameSpace, TokenContext, LeftTree, Pattern) {
        var FuncDeclTree = TokenContext.CreateMatchedSyntaxTree(NameSpace, Pattern, "constructor");
        var ThisType = NameSpace.GetType("This");
        if (ThisType == null) {
            NameSpace.Context.ReportError(ErrorLevel, FuncDeclTree.KeyToken, "constructor is used inside class");
            FuncDeclTree.ToError(FuncDeclTree.KeyToken);
            return FuncDeclTree;
        }
        var FuncFlag = KonohaGrammar.ParseFuncFlag(ConstructorFunc, TokenContext.ParsingAnnotation);
        var TypeList = new Array();
        TypeList.add(ThisType);
        FuncDeclTree.SetMatchedTokenAt(NoWhere, NameSpace, TokenContext, "(", Required | OpenSkipIndent);
        if (FuncDeclTree.IsValidSyntax()) {
            var FuncBlock = new GtFuncBlock(NameSpace, TypeList);
            var SourceToken = FuncDeclTree.KeyToken;
            var ParseFlag = TokenContext.SetBackTrack(false);
            var StoreNameSpace = NameSpace.GetNameSpace(KonohaGrammar.ParseNameSpaceFlag(0, TokenContext.ParsingAnnotation));
            FuncBlock.SetThisIfInClass(ThisType);
            KonohaGrammar.ParseFuncParam(NameSpace, TokenContext, FuncDeclTree, FuncBlock);
            if (FuncDeclTree.IsValidSyntax()) {
                FuncBlock.DefinedFunc = NameSpace.Context.Generator.CreateFunc(FuncFlag, ThisType.ShortName, 0, FuncBlock.TypeList);
                KonohaGrammar.ParseFuncBody(NameSpace, TokenContext, FuncDeclTree, FuncBlock);
                StoreNameSpace.AppendConstructor(ThisType, FuncBlock.DefinedFunc, SourceToken.AddTypeInfoToErrorMessage(ThisType));
                FuncDeclTree.ParsedValue = FuncBlock.DefinedFunc;
            }
            TokenContext.SetRememberFlag(ParseFlag);
        }
        return FuncDeclTree;
    };

    KonohaGrammar.ParseNewArray = function (NameSpace, TokenContext, LeftTree, Pattern) {
        var ArrayTree = TokenContext.CreateMatchedSyntaxTree(NameSpace, Pattern, "new");
        ArrayTree.AppendMatchedPattern(NameSpace, TokenContext, "$Type$", Required);
        while (TokenContext.HasNext() && ArrayTree.IsValidSyntax()) {
            ArrayTree.SetMatchedTokenAt(NoWhere, NameSpace, TokenContext, "[", Required);
            ArrayTree.AppendMatchedPattern(NameSpace, TokenContext, "$Expression$", Required);
            ArrayTree.SetMatchedTokenAt(NoWhere, NameSpace, TokenContext, "]", Required);
            if (!TokenContext.IsToken("[")) {
                break;
            }
        }
        return ArrayTree;
    };

    KonohaGrammar.TypeNewArray = function (Gamma, ParsedTree, ContextType) {
        var ArrayType = ParsedTree.GetSyntaxTreeAt(0).GetParsedType();
        var ArrayNode = Gamma.Generator.CreateNewArrayNode(Gamma.ArrayType, ParsedTree);
        var i = 1;
        while (i < LibGreenTea.ListSize(ParsedTree.SubTreeList)) {
            var Node = ParsedTree.TypeCheckAt(i, Gamma, Gamma.IntType, DefaultTypeCheckPolicy);
            if (Node.IsErrorNode()) {
                return Node;
            }
            ArrayType = Gamma.Context.GetGenericType1(Gamma.ArrayType, ArrayType, true);
            ArrayNode.Append(Node);
            i = i + 1;
        }
        ArrayNode.Type = ArrayType;
        return ArrayNode;
    };

    KonohaGrammar.ParseArray = function (NameSpace, TokenContext, LeftTree, Pattern) {
        var OldFlag = TokenContext.SetSkipIndent(true);
        var ArrayTree = TokenContext.CreateMatchedSyntaxTree(NameSpace, Pattern, "[");
        while (TokenContext.HasNext() && ArrayTree.IsValidSyntax()) {
            if (TokenContext.MatchToken("]")) {
                break;
            }
            if (TokenContext.MatchToken(",")) {
                continue;
            }
            ArrayTree.AppendMatchedPattern(NameSpace, TokenContext, "$Expression$", Required);
        }
        TokenContext.SetRememberFlag(OldFlag);
        return ArrayTree;
    };

    KonohaGrammar.TypeArray = function (Gamma, ParsedTree, ContextType) {
        var ArrayNode = Gamma.Generator.CreateArrayNode(Gamma.ArrayType, ParsedTree);
        var ElemType = Gamma.VarType;
        if (ContextType.IsArrayType()) {
            ElemType = ContextType.TypeParams[0];
            ArrayNode.Type = ContextType;
        }
        var i = 0;
        while (i < LibGreenTea.ListSize(ParsedTree.SubTreeList)) {
            var Node = ParsedTree.TypeCheckAt(i, Gamma, ElemType, DefaultTypeCheckPolicy);
            if (Node.IsErrorNode()) {
                return Node;
            }
            if (ElemType.IsVarType()) {
                ElemType = Node.Type;
                ArrayNode.Type = Gamma.Context.GetGenericType1(Gamma.ArrayType, ElemType, true);
            }
            ArrayNode.Append(Node);
            i = i + 1;
        }
        if (ElemType.IsVarType()) {
            ArrayNode.Type = Gamma.Context.GetGenericType1(Gamma.ArrayType, Gamma.AnyType, true);
        }
        return ArrayNode;
    };

    KonohaGrammar.ParseSize = function (NameSpace, TokenContext, LeftTree, Pattern) {
        var ArrayTree = TokenContext.CreateMatchedSyntaxTree(NameSpace, Pattern, "|");
        ArrayTree.SetMatchedPatternAt(UnaryTerm, NameSpace, TokenContext, "$SuffixExpression$", Required);
        ArrayTree.SetMatchedTokenAt(NoWhere, NameSpace, TokenContext, "|", Required);
        return ArrayTree;
    };

    KonohaGrammar.TypeSize = function (Gamma, ParsedTree, ContextType) {
        var ExprNode = ParsedTree.TypeCheckAt(UnaryTerm, Gamma, Gamma.VarType, DefaultTypeCheckPolicy);
        if (ExprNode.IsErrorNode()) {
            return ExprNode;
        }
        var PolyFunc = Gamma.NameSpace.GetMethod(ExprNode.Type, FuncSymbol("||"), true);

        var Func = PolyFunc.ResolveUnaryMethod(Gamma, ExprNode.Type);
        LibGreenTea.Assert(Func != null);
        Gamma.CheckFunc("operator", Func, ParsedTree.KeyToken);
        var Node = Gamma.Generator.CreateApplyNode(Func.GetReturnType(), ParsedTree, Func);
        Node.Append(Gamma.Generator.CreateConstNode(Gamma.VarType, ParsedTree, Func));
        Node.Append(ExprNode);
        return Node;
    };

    KonohaGrammar.ParseIndexer = function (NameSpace, TokenContext, LeftTree, Pattern) {
        var ArrayTree = TokenContext.CreateMatchedSyntaxTree(NameSpace, Pattern, "[");
        ArrayTree.AppendParsedTree2(LeftTree);
        var OldFlag = TokenContext.SetSkipIndent(true);
        do {
            ArrayTree.AppendMatchedPattern(NameSpace, TokenContext, "$Expression$", Required);
        } while(!ArrayTree.IsMismatchedOrError() && TokenContext.MatchToken(","));
        ArrayTree.SetMatchedTokenAt(NoWhere, NameSpace, TokenContext, "]", Required);
        TokenContext.SetRememberFlag(OldFlag);
        var OperatorSymbol = "[]";
        if (TokenContext.MatchToken("=")) {
            ArrayTree.AppendMatchedPattern(NameSpace, TokenContext, "$Expression$", Required);
            OperatorSymbol = "[]=";
        }
        if (ArrayTree.IsValidSyntax()) {
            ArrayTree.KeyToken.ParsedText = OperatorSymbol;
        }
        return ArrayTree;
    };

    KonohaGrammar.TypeIndexer = function (Gamma, ParsedTree, Type) {
        var RecvNode = ParsedTree.TypeCheckAt(LeftHandTerm, Gamma, Gamma.VarType, DefaultTypeCheckPolicy);
        if (!RecvNode.IsErrorNode()) {
            var MethodName = ParsedTree.KeyToken.ParsedText;
            var ResolvedFunc = null;
            var PolyFunc = ParsedTree.NameSpace.GetMethod(RecvNode.Type, FuncSymbol(MethodName), true);

            var ParamList = new Array();
            ParamList.add(RecvNode);
            ResolvedFunc = PolyFunc.ResolveFunc(Gamma, ParsedTree, 1, ParamList);
            if (ResolvedFunc.Func == null) {
                return Gamma.CreateSyntaxErrorNode(ParsedTree, "undefined: " + MethodName + " of " + RecvNode.Type);
            }
            var Node = Gamma.Generator.CreateIndexerNode(ResolvedFunc.ReturnType, ParsedTree, ResolvedFunc.Func, RecvNode);
            Node.AppendNodeList(1, ParamList);
            return Node;
        }
        return RecvNode;
    };

    KonohaGrammar.ParseSlice = function (NameSpace, TokenContext, LeftTree, Pattern) {
        var SliceTree = TokenContext.CreateMatchedSyntaxTree(NameSpace, Pattern, "[");
        SliceTree.AppendParsedTree2(LeftTree);
        SliceTree.SetMatchedPatternAt(1, NameSpace, TokenContext, "$Expression$", Optional);
        if (!SliceTree.HasNodeAt(1)) {
            SliceTree.SetSyntaxTreeAt(1, SliceTree.CreateConstTree(0));
        }
        SliceTree.SetMatchedTokenAt(NoWhere, NameSpace, TokenContext, ":", Required);
        SliceTree.AppendMatchedPattern(NameSpace, TokenContext, "$Expression$", Optional);
        SliceTree.SetMatchedTokenAt(NoWhere, NameSpace, TokenContext, "]", Required);
        return SliceTree;
    };

    KonohaGrammar.TypeSlice = function (Gamma, ParsedTree, ContextType) {
        var RecvNode = ParsedTree.TypeCheckAt(LeftHandTerm, Gamma, Gamma.VarType, DefaultTypeCheckPolicy);
        if (!RecvNode.IsErrorNode()) {
            return KonohaGrammar.TypeMethodCall(Gamma, ParsedTree, RecvNode, "[:]");
        }
        return RecvNode;
    };

    KonohaGrammar.TypeFieldDecl = function (Gamma, ParsedTree, ClassField) {
        var FieldFlag = KonohaGrammar.ParseVarFlag(0, ParsedTree.Annotation);
        var DeclType = ParsedTree.GetSyntaxTreeAt(VarDeclType).GetParsedType();
        var FieldName = ParsedTree.GetSyntaxTreeAt(VarDeclName).KeyToken.ParsedText;
        var InitValueNode = null;
        var InitValue = null;
        if (ParsedTree.HasNodeAt(VarDeclValue)) {
            InitValueNode = ParsedTree.TypeCheckAt(VarDeclValue, Gamma, DeclType, OnlyConstPolicy | NullablePolicy);
            if (InitValueNode.IsErrorNode()) {
                return false;
            }
            InitValue = InitValueNode.ToConstValue(true);
        }
        if (UseLangStat) {
            Gamma.Context.Stat.VarDecl += 1;
        }
        if (DeclType.IsVarType()) {
            if (InitValueNode == null) {
                DeclType = Gamma.AnyType;
            } else {
                DeclType = InitValueNode.Type;
            }
            Gamma.ReportTypeInference(ParsedTree.KeyToken, FieldName, DeclType);
            if (UseLangStat) {
                Gamma.Context.Stat.VarDeclInfer += 1;
                if (DeclType.IsAnyType()) {
                    Gamma.Context.Stat.VarDeclInferAny += 1;
                }
            }
        }
        if (UseLangStat) {
            if (DeclType.IsAnyType()) {
                Gamma.Context.Stat.VarDeclAny += 1;
            }
        }
        if (InitValueNode == null) {
            InitValue = DeclType.DefaultNullValue;
        }
        ClassField.CreateField(FieldFlag, DeclType, FieldName, ParsedTree.GetSyntaxTreeAt(VarDeclName).KeyToken, InitValue);
        return true;
    };

    KonohaGrammar.ParseClassDecl2 = function (NameSpace, TokenContext, LeftTree, Pattern) {
        var ClassDeclTree = TokenContext.CreateMatchedSyntaxTree(NameSpace, Pattern, "class");
        ClassDeclTree.SetMatchedPatternAt(ClassDeclName, NameSpace, TokenContext, "$FuncName$", Required);
        if (TokenContext.MatchToken("extends")) {
            ClassDeclTree.SetMatchedPatternAt(ClassDeclSuperType, NameSpace, TokenContext, "$Type$", Required);
        }
        if (ClassDeclTree.IsMismatchedOrError()) {
            return ClassDeclTree;
        }

        var ClassNameSpace = new GtNameSpace(NameSpace.Context, NameSpace);
        var NameToken = ClassDeclTree.GetSyntaxTreeAt(ClassDeclName).KeyToken;
        var SuperType = NameSpace.Context.StructType;
        if (ClassDeclTree.HasNodeAt(ClassDeclSuperType)) {
            SuperType = ClassDeclTree.GetSyntaxTreeAt(ClassDeclSuperType).GetParsedType();
        }
        var ClassFlag = KonohaGrammar.ParseClassFlag(0, TokenContext.ParsingAnnotation);
        var ClassName = NameToken.ParsedText;
        var DefinedType = NameSpace.GetType(ClassName);
        if (DefinedType != null && DefinedType.IsAbstract()) {
            DefinedType.TypeFlag = ClassFlag;
            DefinedType.SuperType = SuperType;
            NameToken = null;
        } else {
            DefinedType = SuperType.CreateSubType(ClassFlag, ClassName, null, null);
            ClassNameSpace.AppendTypeName(DefinedType, NameToken);
        }
        ClassNameSpace.SetSymbol("This", DefinedType, NameToken);
        ClassDeclTree.SetMatchedPatternAt(ClassDeclBlock, ClassNameSpace, TokenContext, "$Block$", Optional);
        if (ClassDeclTree.HasNodeAt(ClassDeclBlock)) {
            var ClassField = new GtClassField(DefinedType, NameSpace);
            var Gamma = new GtTypeEnv(ClassNameSpace);
            var SubTree = ClassDeclTree.GetSyntaxTreeAt(ClassDeclBlock);
            while (SubTree != null) {
                if (SubTree.Pattern.EqualsName("$VarDecl$")) {
                    KonohaGrammar.TypeFieldDecl(Gamma, SubTree, ClassField);
                }
                SubTree = SubTree.NextTree;
            }
            ClassDeclTree.ParsedValue = ClassField;
        }
        if (ClassDeclTree.IsValidSyntax()) {
            NameSpace.AppendTypeName(DefinedType, NameToken);
        }
        return ClassDeclTree;
    };

    KonohaGrammar.TypeClassDecl2 = function (Gamma, ParsedTree, ContextType) {
        var ClassField = ParsedTree.ParsedValue;
        if (ClassField != null) {
            var DefinedType = ClassField.DefinedType;
            DefinedType.SetClassField(ClassField);
            Gamma.Generator.OpenClassField(DefinedType, ClassField);
            var SubTree = ParsedTree.GetSyntaxTreeAt(ClassDeclBlock);
            var MemberList = new Array();
            while (SubTree != null) {
                if (SubTree.Pattern.EqualsName("$FuncDecl$") || SubTree.Pattern.EqualsName("$Constructor2$")) {
                    MemberList.add(SubTree.ParsedValue);
                }
                if (!SubTree.Pattern.EqualsName("$VarDecl$")) {
                    SubTree.TypeCheck(Gamma, Gamma.VoidType, DefaultTypeCheckPolicy);
                }
                SubTree = SubTree.NextTree;
            }
            Gamma.Generator.CloseClassField(DefinedType, MemberList);
        }
        return Gamma.Generator.CreateEmptyNode(Gamma.VoidType);
    };

    KonohaGrammar.prototype.LoadTo = function (NameSpace) {
        var Context = NameSpace.Context;
        NameSpace.SetSymbol("true", true, null);
        NameSpace.SetSymbol("false", false, null);

        NameSpace.AppendTokenFunc(" \t", LibLoadFunc.LoadTokenFunc(Context, this, "WhiteSpaceToken"));
        NameSpace.AppendTokenFunc("\n", LibLoadFunc.LoadTokenFunc(Context, this, "IndentToken"));
        NameSpace.AppendTokenFunc(";", LibLoadFunc.LoadTokenFunc(Context, this, "SemiColonToken"));
        NameSpace.AppendTokenFunc("{}()[]<>.,?:+-*/%=&|!@~^$", LibLoadFunc.LoadTokenFunc(Context, this, "OperatorToken"));
        NameSpace.AppendTokenFunc("/", LibLoadFunc.LoadTokenFunc(Context, this, "CommentToken"));
        NameSpace.AppendTokenFunc("Aa_", LibLoadFunc.LoadTokenFunc(Context, this, "SymbolToken"));

        NameSpace.AppendTokenFunc("\"", LibLoadFunc.LoadTokenFunc(Context, this, "StringLiteralToken"));

        NameSpace.AppendTokenFunc("'", LibLoadFunc.LoadTokenFunc(Context, this, "CharLiteralToken"));
        NameSpace.AppendTokenFunc("1", LibLoadFunc.LoadTokenFunc(Context, this, "NumberLiteralToken"));

        var ParseUnary = LibLoadFunc.LoadParseFunc(Context, this, "ParseUnary");
        var TypeUnary = LibLoadFunc.LoadTypeFunc(Context, this, "TypeUnary");
        var ParseBinary = LibLoadFunc.LoadParseFunc(Context, this, "ParseBinary");
        var TypeBinary = LibLoadFunc.LoadTypeFunc(Context, this, "TypeBinary");
        var TypeConst = LibLoadFunc.LoadTypeFunc(Context, this, "TypeConst");

        NameSpace.AppendSyntax("+", ParseUnary, TypeUnary);
        NameSpace.AppendSyntax("-", ParseUnary, TypeUnary);
        NameSpace.AppendSyntax("~", ParseUnary, TypeUnary);
        NameSpace.AppendSyntax("! not", LibLoadFunc.LoadParseFunc(Context, this, "ParseNot"), LibLoadFunc.LoadTypeFunc(Context, this, "TypeNot"));
        NameSpace.AppendSyntax("++ --", LibLoadFunc.LoadParseFunc(Context, this, "ParseIncl"), LibLoadFunc.LoadTypeFunc(Context, this, "TypeIncl"));

        NameSpace.AppendExtendedSyntax("* / % mod", PrecedenceCStyleMUL, ParseBinary, TypeBinary);
        NameSpace.AppendExtendedSyntax("+ -", PrecedenceCStyleADD, ParseBinary, TypeBinary);

        NameSpace.AppendExtendedSyntax("< <= > >=", PrecedenceCStyleCOMPARE, ParseBinary, TypeBinary);
        NameSpace.AppendExtendedSyntax("== !=", PrecedenceCStyleEquals, ParseBinary, TypeBinary);

        NameSpace.AppendExtendedSyntax("<< >>", PrecedenceCStyleSHIFT, ParseBinary, TypeBinary);
        NameSpace.AppendExtendedSyntax("&", PrecedenceCStyleBITAND, ParseBinary, TypeBinary);
        NameSpace.AppendExtendedSyntax("|", PrecedenceCStyleBITOR, ParseBinary, TypeBinary);
        NameSpace.AppendExtendedSyntax("^", PrecedenceCStyleBITXOR, ParseBinary, TypeBinary);

        NameSpace.AppendExtendedSyntax("=", PrecedenceCStyleAssign | LeftJoin, ParseBinary, LibLoadFunc.LoadTypeFunc(Context, this, "TypeAssign"));
        NameSpace.AppendExtendedSyntax("+= -= *= /= %= <<= >>= & | ^=", PrecedenceCStyleAssign, ParseBinary, LibLoadFunc.LoadTypeFunc(Context, this, "TypeSelfAssign"));
        NameSpace.AppendExtendedSyntax("++ --", 0, LibLoadFunc.LoadParseFunc(Context, this, "ParseIncl"), LibLoadFunc.LoadTypeFunc(Context, this, "TypeIncl"));

        NameSpace.AppendExtendedSyntax("&& and", PrecedenceCStyleAND, ParseBinary, LibLoadFunc.LoadTypeFunc(Context, this, "TypeAnd"));
        NameSpace.AppendExtendedSyntax("|| or", PrecedenceCStyleOR, ParseBinary, LibLoadFunc.LoadTypeFunc(Context, this, "TypeOr"));
        NameSpace.AppendExtendedSyntax("<: instanceof", PrecedenceInstanceof, ParseBinary, LibLoadFunc.LoadTypeFunc(Context, this, "TypeInstanceOf"));

        NameSpace.AppendExtendedSyntax("?", 0, LibLoadFunc.LoadParseFunc(Context, this, "ParseTrinary"), LibLoadFunc.LoadTypeFunc(Context, this, "TypeTrinary"));

        NameSpace.AppendSyntax("$Error$", LibLoadFunc.LoadParseFunc(Context, this, "ParseError"), LibLoadFunc.LoadTypeFunc(Context, this, "TypeError"));
        NameSpace.AppendSyntax("$Empty$", LibLoadFunc.LoadParseFunc(Context, this, "ParseEmpty"), LibLoadFunc.LoadTypeFunc(Context, this, "TypeEmpty"));
        NameSpace.AppendSyntax(";", LibLoadFunc.LoadParseFunc(Context, this, "ParseSemiColon"), null);
        NameSpace.AppendSyntax("$Symbol$", LibLoadFunc.LoadParseFunc(Context, this, "ParseSymbol"), null);
        NameSpace.AppendSyntax("$Type$", LibLoadFunc.LoadParseFunc(Context, this, "ParseType"), TypeConst);
        NameSpace.AppendSyntax("$TypeSuffix$", LibLoadFunc.LoadParseFunc(Context, this, "ParseTypeSuffix"), null);
        NameSpace.AppendSyntax("<", LibLoadFunc.LoadParseFunc(Context, this, "ParseGenericFuncDecl"), null);
        NameSpace.AppendSyntax("$Variable$", LibLoadFunc.LoadParseFunc(Context, this, "ParseVariable"), LibLoadFunc.LoadTypeFunc(Context, this, "TypeVariable"));
        NameSpace.AppendSyntax("$Const$", LibLoadFunc.LoadParseFunc(Context, this, "ParseConst"), TypeConst);
        NameSpace.AppendSyntax("$CharLiteral$", LibLoadFunc.LoadParseFunc(Context, this, "ParseCharLiteral"), LibLoadFunc.LoadTypeFunc(Context, this, "TypeCharLiteral"));
        NameSpace.AppendSyntax("$StringLiteral$", LibLoadFunc.LoadParseFunc(Context, this, "ParseStringLiteral"), TypeConst);
        NameSpace.AppendSyntax("$IntegerLiteral$", LibLoadFunc.LoadParseFunc(Context, this, "ParseIntegerLiteral"), TypeConst);
        NameSpace.AppendSyntax("$FloatLiteral$", LibLoadFunc.LoadParseFunc(Context, this, "ParseFloatLiteral"), TypeConst);

        NameSpace.AppendExtendedSyntax(".", 0, LibLoadFunc.LoadParseFunc(Context, this, "ParseGetter"), LibLoadFunc.LoadTypeFunc(Context, this, "TypeGetter"));
        NameSpace.AppendSyntax("$Setter$", null, LibLoadFunc.LoadTypeFunc(Context, this, "TypeSetter"));

        NameSpace.AppendSyntax("(", LibLoadFunc.LoadParseFunc(Context, this, "ParseGroup"), LibLoadFunc.LoadTypeFunc(Context, this, "TypeGroup"));
        NameSpace.AppendSyntax("(", LibLoadFunc.LoadParseFunc(Context, this, "ParseCast"), LibLoadFunc.LoadTypeFunc(Context, this, "TypeCast"));
        NameSpace.AppendExtendedSyntax("(", 0, LibLoadFunc.LoadParseFunc(Context, this, "ParseApply"), LibLoadFunc.LoadTypeFunc(Context, this, "TypeApply"));
        NameSpace.AppendSyntax("[", LibLoadFunc.LoadParseFunc(Context, this, "ParseArray"), LibLoadFunc.LoadTypeFunc(Context, this, "TypeArray"));
        NameSpace.AppendExtendedSyntax("[", 0, LibLoadFunc.LoadParseFunc(Context, this, "ParseIndexer"), LibLoadFunc.LoadTypeFunc(Context, this, "TypeIndexer"));
        NameSpace.AppendExtendedSyntax("[", 0, LibLoadFunc.LoadParseFunc(Context, this, "ParseSlice"), LibLoadFunc.LoadTypeFunc(Context, this, "TypeSlice"));
        NameSpace.AppendSyntax("|", LibLoadFunc.LoadParseFunc(Context, this, "ParseSize"), LibLoadFunc.LoadTypeFunc(Context, this, "TypeSize"));

        NameSpace.AppendSyntax("$Block$", LibLoadFunc.LoadParseFunc(Context, this, "ParseBlock"), null);
        NameSpace.AppendSyntax("$Statement$", LibLoadFunc.LoadParseFunc(Context, this, "ParseStatement"), null);
        NameSpace.AppendSyntax("$Expression$", LibLoadFunc.LoadParseFunc(Context, this, "ParseExpression"), null);
        NameSpace.AppendSyntax("$SuffixExpression$", LibLoadFunc.LoadParseFunc(Context, this, "ParseSuffixExpression"), null);

        NameSpace.AppendSyntax("$FuncName$", LibLoadFunc.LoadParseFunc(Context, this, "ParseFuncName"), TypeConst);
        NameSpace.AppendSyntax("$FuncDecl$", LibLoadFunc.LoadParseFunc(Context, this, "ParseFuncDecl"), LibLoadFunc.LoadTypeFunc(Context, this, "TypeFuncDecl"));
        NameSpace.AppendSyntax("$VarDecl$", LibLoadFunc.LoadParseFunc(Context, this, "ParseVarDecl"), LibLoadFunc.LoadTypeFunc(Context, this, "TypeVarDecl"));

        NameSpace.AppendSyntax("null", LibLoadFunc.LoadParseFunc(Context, this, "ParseNull"), LibLoadFunc.LoadTypeFunc(Context, this, "TypeNull"));
        NameSpace.AppendSyntax("defined", LibLoadFunc.LoadParseFunc(Context, this, "ParseDefined"), LibLoadFunc.LoadTypeFunc(Context, this, "TypeDefined"));
        NameSpace.AppendSyntax("typeof", LibLoadFunc.LoadParseFunc(Context, this, "ParseTypeOf"), TypeConst);
        NameSpace.AppendSyntax("require", LibLoadFunc.LoadParseFunc(Context, this, "ParseRequire"), null);
        NameSpace.AppendSyntax("import", LibLoadFunc.LoadParseFunc(Context, this, "ParseImport"), LibLoadFunc.LoadTypeFunc(Context, this, "TypeImport"));

        NameSpace.AppendSyntax("if", LibLoadFunc.LoadParseFunc(Context, this, "ParseIf"), LibLoadFunc.LoadTypeFunc(Context, this, "TypeIf"));
        NameSpace.AppendSyntax("while", LibLoadFunc.LoadParseFunc(Context, this, "ParseWhile"), LibLoadFunc.LoadTypeFunc(Context, this, "TypeWhile"));
        NameSpace.AppendSyntax("do", LibLoadFunc.LoadParseFunc(Context, this, "ParseDoWhile"), LibLoadFunc.LoadTypeFunc(Context, this, "TypeDoWhile"));
        NameSpace.AppendSyntax("for", LibLoadFunc.LoadParseFunc(Context, this, "ParseFor"), LibLoadFunc.LoadTypeFunc(Context, this, "TypeFor"));
        NameSpace.AppendSyntax("continue", LibLoadFunc.LoadParseFunc(Context, this, "ParseContinue"), LibLoadFunc.LoadTypeFunc(Context, this, "TypeContinue"));
        NameSpace.AppendSyntax("break", LibLoadFunc.LoadParseFunc(Context, this, "ParseBreak"), LibLoadFunc.LoadTypeFunc(Context, this, "TypeBreak"));
        NameSpace.AppendSyntax("return", LibLoadFunc.LoadParseFunc(Context, this, "ParseReturn"), LibLoadFunc.LoadTypeFunc(Context, this, "TypeReturn"));
        NameSpace.AppendSyntax("let const", LibLoadFunc.LoadParseFunc(Context, this, "ParseSymbolDecl"), null);

        NameSpace.AppendSyntax("try", LibLoadFunc.LoadParseFunc(Context, this, "ParseTry"), LibLoadFunc.LoadTypeFunc(Context, this, "TypeTry"));
        NameSpace.AppendSyntax("throw", LibLoadFunc.LoadParseFunc(Context, this, "ParseThrow"), LibLoadFunc.LoadTypeFunc(Context, this, "TypeThrow"));

        NameSpace.AppendSyntax("class", LibLoadFunc.LoadParseFunc(Context, this, "ParseClassDecl2"), LibLoadFunc.LoadTypeFunc(Context, this, "TypeClassDecl2"));
        NameSpace.AppendSyntax("constructor", LibLoadFunc.LoadParseFunc(Context, this, "ParseConstructor2"), LibLoadFunc.LoadTypeFunc(Context, this, "TypeFuncDecl"));
        NameSpace.AppendSyntax("super", LibLoadFunc.LoadParseFunc(Context, this, "ParseSuper"), null);
        NameSpace.AppendSyntax("this", LibLoadFunc.LoadParseFunc(Context, this, "ParseThis"), LibLoadFunc.LoadTypeFunc(Context, this, "TypeThis"));
        NameSpace.AppendSyntax("new", LibLoadFunc.LoadParseFunc(Context, this, "ParseNew"), LibLoadFunc.LoadTypeFunc(Context, this, "TypeApply"));
        NameSpace.AppendSyntax("new", LibLoadFunc.LoadParseFunc(Context, this, "ParseNewArray"), LibLoadFunc.LoadTypeFunc(Context, this, "TypeNewArray"));

        NameSpace.AppendSyntax("enum", LibLoadFunc.LoadParseFunc(Context, this, "ParseEnum"), LibLoadFunc.LoadTypeFunc(Context, this, "TypeEnum"));
        NameSpace.AppendSyntax("switch", LibLoadFunc.LoadParseFunc(Context, this, "ParseSwitch"), LibLoadFunc.LoadTypeFunc(Context, this, "TypeSwitch"));
        NameSpace.AppendSyntax("$CaseBlock$", LibLoadFunc.LoadParseFunc(Context, this, "ParseCaseBlock"), null);

        NameSpace.AppendSyntax("__line__", LibLoadFunc.LoadParseFunc(Context, this, "ParseLine"), LibLoadFunc.LoadTypeFunc(Context, this, "TypeLine"));
        NameSpace.AppendSyntax("__", LibLoadFunc.LoadParseFunc(Context, this, "ParseSymbols"), null);
    };
    return KonohaGrammar;
})(GtGrammar);

var GtUndefinedSymbol = (function () {
    function GtUndefinedSymbol() {
    }
    GtUndefinedSymbol.prototype.toString = function () {
        return "UndefinedSymbol";
    };
    return GtUndefinedSymbol;
})();

var ProgName = "GreenTeaScript";
var CodeName = "Reference Implementation of D-Script";
var MajorVersion = 0;
var MinerVersion = 1;
var PatchLevel = 0;
var Version = "0.1";
var Copyright = "Copyright (c) 2013, JST/CREST DEOS and Konoha project authors";
var License = "BSD-Style Open Source";

var RootNameSpace = 1 << 0;
var PublicNameSpace = 1 << 1;

var ExportType = 1 << 0;
var PublicType = 1 << 1;
var NativeType = 1 << 2;
var VirtualType = 1 << 3;
var EnumType = 1 << 4;
var DeprecatedType = 1 << 5;
var HiddenType = 1 << 6;

var UnrevealedType = HiddenType;
var CommonType = 1 << 7;

var DynamicType = 1 << 8;
var OpenType = 1 << 9;
var UnboxType = 1 << 10;
var TypeVariable = 1 << 14;
var GenericVariable = 1 << 15;

var ExportFunc = 1 << 0;
var PublicFunc = 1 << 1;
var NativeFunc = 1 << 2;
var VirtualFunc = 1 << 3;
var ConstFunc = 1 << 4;
var DeprecatedFunc = 1 << 5;
var HiddenFunc = 1 << 6;
var CommonFunc = 1 << 7;

var NativeStaticFunc = 1 << 8;
var NativeMacroFunc = 1 << 9;
var NativeVariadicFunc = 1 << 10;
var ConstructorFunc = 1 << 11;
var MethodFunc = 1 << 12;
var GetterFunc = 1 << 13;
var SetterFunc = 1 << 14;
var OperatorFunc = 1 << 15;
var ConverterFunc = 1 << 16;
var CoercionFunc = 1 << 17;
var StrongCoercionFunc = 1 << 18;
var GenericFunc = 1 << 15;
var LazyFunc = 1 << 16;

var ReadOnlyVar = 1;

var MismatchedPosition = -1;
var Required = (1 << 0);
var Optional = (1 << 1);
var AllowLineFeed = (1 << 2);
var AllowAnnotation = (1 << 3);
var OpenSkipIndent = (1 << 4);
var CloseSkipIndent = (1 << 5);

var ErrorLevel = 0;
var TypeErrorLevel = 1;
var WarningLevel = 2;
var InfoLevel = 3;

var NullChar = 0;
var UndefinedChar = 1;
var DigitChar = 2;
var UpperAlphaChar = 3;
var LowerAlphaChar = 4;
var UnderBarChar = 5;
var NewLineChar = 6;
var TabChar = 7;
var SpaceChar = 8;
var OpenParChar = 9;
var CloseParChar = 10;
var OpenBracketChar = 11;
var CloseBracketChar = 12;
var OpenBraceChar = 13;
var CloseBraceChar = 14;
var LessThanChar = 15;
var GreaterThanChar = 16;
var QuoteChar = 17;
var DoubleQuoteChar = 18;
var BackQuoteChar = 19;
var SurprisedChar = 20;
var SharpChar = 21;
var DollarChar = 22;
var PercentChar = 23;
var AndChar = 24;
var StarChar = 25;
var PlusChar = 26;
var CommaChar = 27;
var MinusChar = 28;
var DotChar = 29;
var SlashChar = 30;
var ColonChar = 31;
var SemiColonChar = 32;
var EqualChar = 33;
var QuestionChar = 34;
var AtmarkChar = 35;
var VarChar = 36;
var ChilderChar = 37;
var BackSlashChar = 38;
var HatChar = 39;
var UnicodeChar = 40;
var MaxSizeOfChars = 41;

var CharMatrix = [
    0,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    TabChar,
    NewLineChar,
    1,
    1,
    NewLineChar,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    SpaceChar,
    SurprisedChar,
    DoubleQuoteChar,
    SharpChar,
    DollarChar,
    PercentChar,
    AndChar,
    QuoteChar,
    OpenParChar,
    CloseParChar,
    StarChar,
    PlusChar,
    CommaChar,
    MinusChar,
    DotChar,
    SlashChar,
    DigitChar,
    DigitChar,
    DigitChar,
    DigitChar,
    DigitChar,
    DigitChar,
    DigitChar,
    DigitChar,
    DigitChar,
    DigitChar,
    ColonChar,
    SemiColonChar,
    LessThanChar,
    EqualChar,
    GreaterThanChar,
    QuestionChar,
    AtmarkChar,
    UpperAlphaChar,
    UpperAlphaChar,
    UpperAlphaChar,
    UpperAlphaChar,
    UpperAlphaChar,
    UpperAlphaChar,
    UpperAlphaChar,
    UpperAlphaChar,
    UpperAlphaChar,
    UpperAlphaChar,
    UpperAlphaChar,
    UpperAlphaChar,
    UpperAlphaChar,
    UpperAlphaChar,
    UpperAlphaChar,
    UpperAlphaChar,
    UpperAlphaChar,
    UpperAlphaChar,
    UpperAlphaChar,
    UpperAlphaChar,
    UpperAlphaChar,
    UpperAlphaChar,
    UpperAlphaChar,
    UpperAlphaChar,
    UpperAlphaChar,
    UpperAlphaChar,
    OpenBracketChar,
    BackSlashChar,
    CloseBracketChar,
    HatChar,
    UnderBarChar,
    BackQuoteChar,
    LowerAlphaChar,
    LowerAlphaChar,
    LowerAlphaChar,
    LowerAlphaChar,
    LowerAlphaChar,
    LowerAlphaChar,
    LowerAlphaChar,
    LowerAlphaChar,
    LowerAlphaChar,
    LowerAlphaChar,
    LowerAlphaChar,
    LowerAlphaChar,
    LowerAlphaChar,
    LowerAlphaChar,
    LowerAlphaChar,
    LowerAlphaChar,
    LowerAlphaChar,
    LowerAlphaChar,
    LowerAlphaChar,
    LowerAlphaChar,
    LowerAlphaChar,
    LowerAlphaChar,
    LowerAlphaChar,
    LowerAlphaChar,
    LowerAlphaChar,
    LowerAlphaChar,
    OpenBraceChar,
    VarChar,
    CloseBraceChar,
    ChilderChar,
    1
];

var SourceTokenFlag = 1;
var ErrorTokenFlag = (1 << 1);
var IndentTokenFlag = (1 << 2);
var WhiteSpaceTokenFlag = (1 << 3);
var DelimTokenFlag = (1 << 4);
var QuotedTokenFlag = (1 << 5);
var NameSymbolTokenFlag = (1 << 6);

var BackTrackParseFlag = 1;
var SkipIndentParseFlag = (1 << 1);

var KeyTokenIndex = -2;
var NoWhere = -1;

var UnaryTerm = 0;

var LeftHandTerm = 0;
var RightHandTerm = 1;

var IfCond = 0;
var IfThen = 1;
var IfElse = 2;

var WhileCond = 0;
var WhileBody = 1;

var ForInit = 0;
var ForCond = 1;
var ForIteration = 2;
var ForBody = 3;

var ReturnExpr = 0;

var VarDeclType = 0;
var VarDeclName = 1;
var VarDeclValue = 2;
var VarDeclScope = 3;

var SymbolDeclClassIndex = 0;
var SymbolDeclNameIndex = 1;
var SymbolDeclValueIndex = 2;

var FuncDeclReturnType = 0;
var FuncDeclClass = 1;
var FuncDeclName = 2;
var FuncDeclBlock = 3;
var FuncGenericOption = 4;
var FuncDeclParam = 5;

var GenericReturnType = 0;
var GenericParam = 1;

var ClassDeclName = 0;
var ClassDeclSuperType = 1;
var ClassDeclBlock = 2;
var ClassDeclFieldStartIndex = 2;

var TryBody = 0;
var CatchVariable = 1;
var CatchBody = 2;
var FinallyBody = 3;

var SwitchCaseCondExpr = 0;
var SwitchCaseDefaultBlock = 1;
var SwitchCaseCaseIndex = 2;

var EnumNameTreeIndex = 0;

var BinaryOperator = 1;
var LeftJoin = 1 << 1;
var PrecedenceShift = 3;
var PrecedenceCStyleMUL = (100 << PrecedenceShift) | BinaryOperator;
var PrecedenceCStyleADD = (200 << PrecedenceShift) | BinaryOperator;
var PrecedenceCStyleSHIFT = (300 << PrecedenceShift) | BinaryOperator;
var PrecedenceCStyleCOMPARE = (400 << PrecedenceShift) | BinaryOperator;
var PrecedenceInstanceof = PrecedenceCStyleCOMPARE;
var PrecedenceCStyleEquals = (500 << PrecedenceShift) | BinaryOperator;
var PrecedenceCStyleBITAND = (600 << PrecedenceShift) | BinaryOperator;
var PrecedenceCStyleBITXOR = (700 << PrecedenceShift) | BinaryOperator;
var PrecedenceCStyleBITOR = (800 << PrecedenceShift) | BinaryOperator;
var PrecedenceCStyleAND = (900 << PrecedenceShift) | BinaryOperator;
var PrecedenceCStyleOR = (1000 << PrecedenceShift) | BinaryOperator;
var PrecedenceCStyleTRINARY = (1100 << PrecedenceShift) | BinaryOperator;
var PrecedenceCStyleAssign = (1200 << PrecedenceShift) | BinaryOperator;
var PrecedenceCStyleCOMMA = (1300 << PrecedenceShift) | BinaryOperator;

var DefaultTypeCheckPolicy = 0;
var NoCheckPolicy = 1;
var CastPolicy = (1 << 1);
var IgnoreEmptyPolicy = (1 << 2);
var AllowEmptyPolicy = (1 << 3);
var AllowVoidPolicy = (1 << 4);
var AllowCoercionPolicy = (1 << 5);
var OnlyConstPolicy = (1 << 6);
var NullablePolicy = (1 << 8);
var BlockPolicy = (1 << 7);

var UndefinedSymbol = new GtUndefinedSymbol();
var NativeNameSuffix = "__";

var UseLangStat = true;

var VerboseSymbol = 1;
var VerboseType = (1 << 1);
var VerboseFunc = (1 << 2);
var VerboseEval = (1 << 3);
var VerboseToken = (1 << 4);
var VerboseUndefined = (1 << 5);

var VerboseNative = (1 << 6);
var VerboseFile = (1 << 7);
var VerboseException = (1 << 8);

var VerboseRuntime = (1 << 9);

function IsFlag(flag, flag2) {
    return ((flag & flag2) == flag2);
}

function UnsetFlag(flag, flag2) {
    return (flag & (~flag2));
}

function JoinStrings(Unit, Times) {
    var s = "";
    var i = 0;
    while (i < Times) {
        s = s + Unit;
        i = i + 1;
    }
    return s;
}

function AsciiToTokenMatrixIndex(c) {
    if (c < 128) {
        return CharMatrix[c];
    }
    return UnicodeChar;
}

function n2s(n) {
    if (n < (27)) {
        return LibGreenTea.CharToString((65 + (n - 0)));
    } else if (n < (27 + 10)) {
        return LibGreenTea.CharToString((48 + (n - 27)));
    } else {
        return LibGreenTea.CharToString((97 + (n - 37)));
    }
}

function NumberToAscii(number) {
    if (number >= 3600) {
        return n2s(number / 3600) + NumberToAscii(number % 3600);
    }
    return n2s((number / 60)) + n2s((number % 60));
}

function NativeVariableName(Name, Index) {
    return Name + NativeNameSuffix + Index;
}

function ClassSymbol(ClassType, Symbol) {
    return ClassType.GetUniqueName() + "." + Symbol;
}

function ClassStaticSymbol(ClassType, Symbol) {
    return ClassType.GetUniqueName() + ".@" + Symbol;
}

function FuncSymbol(Symbol) {
    return LibGreenTea.IsVariableName(Symbol, 0) ? Symbol : "__" + Symbol;
}

function ConverterSymbol(ClassType) {
    return ClassType.GetUniqueName();
}

function ConstructorSymbol() {
    return "";
}

function GetterSymbol(Symbol) {
    return Symbol + "+";
}

function SetterSymbol(Symbol) {
    return Symbol + "=";
}

function MangleGenericType(BaseType, BaseIdx, TypeList) {
    var s = BaseType.ShortName + NativeNameSuffix;
    var i = BaseIdx;
    while (i < LibGreenTea.ListSize(TypeList)) {
        var Type = TypeList.get(i);
        if (Type.IsTypeVariable()) {
            s = s + Type.ShortName;
        } else {
            s = s + NumberToAscii(TypeList.get(i).TypeId);
        }
        i = i + 1;
    }
    return s;
}

function ApplyTokenFunc(TokenFunc, TokenContext, ScriptSource, Pos) {
    while (TokenFunc != null) {
        var NextIdx = LibGreenTea.ApplyTokenFunc(TokenFunc.Func, TokenContext, ScriptSource, Pos);
        if (NextIdx > Pos)
            return NextIdx;
        TokenFunc = TokenFunc.ParentFunc;
    }
    return MismatchedPosition;
}

function MergeSyntaxPattern(Pattern, Parent) {
    if (Parent == null)
        return Pattern;
    var MergedPattern = new GtSyntaxPattern(Pattern.PackageNameSpace, Pattern.PatternName, Pattern.MatchFunc, Pattern.TypeFunc);
    MergedPattern.ParentPattern = Parent;
    return MergedPattern;
}

function IsMismatchedOrError(Tree) {
    return (Tree == null || Tree.IsMismatchedOrError());
}

function IsValidSyntax(Tree) {
    return !(IsMismatchedOrError(Tree));
}

function TreeHead(Tree) {
    if (Tree != null) {
        while (Tree.PrevTree != null) {
            Tree = Tree.PrevTree;
        }
    }
    return Tree;
}

function TreeTail(Tree) {
    if (Tree != null) {
        while (Tree.NextTree != null) {
            Tree = Tree.NextTree;
        }
    }
    return Tree;
}

function LinkTree(LastNode, Node) {
    Node.PrevTree = LastNode;
    if (LastNode != null) {
        LastNode.NextTree = Node;
    }
    return TreeTail(Node);
}

function ApplySyntaxPattern(NameSpace, TokenContext, LeftTree, Pattern) {
    var Pos = TokenContext.GetPosition(0);
    var ParseFlag = TokenContext.ParseFlag;
    var CurrentPattern = Pattern;
    while (CurrentPattern != null) {
        var delegate = CurrentPattern.MatchFunc;
        TokenContext.RollbackPosition(Pos, 0);
        if (CurrentPattern.ParentPattern != null) {
            TokenContext.ParseFlag = ParseFlag | BackTrackParseFlag;
        }

        TokenContext.IndentLevel += 1;
        var ParsedTree = LibGreenTea.ApplyParseFunc(delegate, NameSpace, TokenContext, LeftTree, CurrentPattern);
        TokenContext.IndentLevel -= 1;
        TokenContext.ParseFlag = ParseFlag;
        if (ParsedTree != null && ParsedTree.IsMismatched()) {
            ParsedTree = null;
        }

        if (ParsedTree != null) {
            return ParsedTree;
        }
        CurrentPattern = CurrentPattern.ParentPattern;
    }
    if (TokenContext.IsAllowedBackTrack()) {
        TokenContext.RollbackPosition(Pos, 0);
    } else {
        TokenContext.SkipErrorStatement();
    }
    if (Pattern == null) {
        LibGreenTea.VerboseLog(VerboseUndefined, "undefined syntax pattern: " + Pattern);
    }
    return TokenContext.ReportExpectedPattern(Pattern);
}

function ApplyTypeFunc(TypeFunc, Gamma, ParsedTree, Type) {
    if (TypeFunc != null) {
        Gamma.NameSpace = ParsedTree.NameSpace;
        return LibGreenTea.ApplyTypeFunc(TypeFunc, Gamma, ParsedTree, Type);
    }
    return Gamma.Generator.CreateEmptyNode(Gamma.VoidType);
}

function LinkNode(LastNode, Node) {
    Node.PrevNode = LastNode;
    if (LastNode != null) {
        LastNode.NextNode = Node;
    }
    return Node;
}

function TypeBlock(Gamma, ParsedTree, ContextType) {
    var StackTopIndex = Gamma.StackTopIndex;
    var LastNode = null;
    while (ParsedTree != null) {
        var Node = ApplyTypeFunc(ParsedTree.Pattern.TypeFunc, Gamma, ParsedTree, Gamma.VoidType);
        Node = Gamma.TypeCheckSingleNode(ParsedTree, Node, Gamma.VoidType, DefaultTypeCheckPolicy);
        LastNode = LinkNode(LastNode, Node);
        if (Node.IsErrorNode()) {
            break;
        }
        ParsedTree = ParsedTree.NextTree;
    }
    Gamma.PushBackStackIndex(StackTopIndex);
    if (LastNode == null) {
        return Gamma.Generator.CreateEmptyNode(Gamma.VoidType);
    }
    return LastNode.MoveHeadNode();
}

var GtStat = (function () {
    function GtStat() {
        this.VarDecl = 0;
        this.VarDeclInfer = 0;
        this.VarDeclAny = 0;
        this.VarDeclInferAny = 0;

        this.MatchCount = 0;
        this.BacktrackCount = 0;
    }
    return GtStat;
})();

var GreenTeaScript = (function () {
    function GreenTeaScript() {
    }
    GreenTeaScript.ExecCommand = function (Args) {
        var TargetCode = "exe";
        var GeneratorFlag = 0;
        var OneLiner = null;
        var RequiredLibName = null;
        var OutputFile = "-";
        var Index = 0;
        var ShellMode = false;
        while (Index < Args.length) {
            var Argu = Args[Index];
            if (!Argu.startsWith("-")) {
                break;
            }
            Index += 1;
            if ((Argu.equals("-e") || Argu.equals("--eval")) && Index < Args.length) {
                OneLiner = Args[Index];
                Index += 1;
                continue;
            }
            if ((Argu.equals("-o") || Argu.equals("--out")) && Index < Args.length) {
                if (!Args[Index].endsWith(".green")) {
                    OutputFile = Args[Index];
                    Index += 1;
                    continue;
                }
            }
            if ((Argu.equals("-l") || Argu.equals("--lang")) && Index < Args.length) {
                if (!Args[Index].endsWith(".green")) {
                    TargetCode = Args[Index];
                    Index += 1;
                    continue;
                }
            }
            if ((Argu.equals("-r") || Argu.equals("--require")) && Index < Args.length) {
                RequiredLibName = Args[Index];
                Index += 1;
                continue;
            }
            if (Argu.equals("-i")) {
                ShellMode = true;
                continue;
            }
            if (LibGreenTea.EqualsString(Argu, "--verbose")) {
                LibGreenTea.DebugMode = true;
                LibGreenTea.VerboseMask |= (VerboseFile | VerboseSymbol | VerboseNative);
                continue;
            }
            if (LibGreenTea.EqualsString(Argu, "--verbose:token")) {
                LibGreenTea.VerboseMask |= VerboseToken;
                continue;
            }
            if (LibGreenTea.EqualsString(Argu, "--verbose:type")) {
                LibGreenTea.VerboseMask |= VerboseType;
                continue;
            }
            if (LibGreenTea.EqualsString(Argu, "--verbose:symbol")) {
                LibGreenTea.VerboseMask |= VerboseSymbol;
                continue;
            }
            if (LibGreenTea.EqualsString(Argu, "--verbose:native")) {
                LibGreenTea.VerboseMask |= VerboseNative;
                continue;
            }
            if (LibGreenTea.EqualsString(Argu, "--verbose:func")) {
                LibGreenTea.VerboseMask |= VerboseFunc;
                continue;
            }
            if (LibGreenTea.EqualsString(Argu, "--verbose:all")) {
                LibGreenTea.VerboseMask = -1;
                continue;
            }
            if (LibGreenTea.EqualsString(Argu, "--verbose:no")) {
                LibGreenTea.VerboseMask = 0;
                continue;
            }
            LibGreenTea.Usage(Argu + " is unknown");
        }
        var Generator = LibGreenTea.CodeGenerator(TargetCode, OutputFile, GeneratorFlag);
        if (Generator == null) {
            LibGreenTea.Usage("no target: " + TargetCode);
        }
        var Context = new GtParserContext(new KonohaGrammar(), Generator);

        if (RequiredLibName != null) {
            if (!Context.TopLevelNameSpace.LoadRequiredLib(RequiredLibName)) {
                LibGreenTea.Exit(1, "failed to load required library: " + RequiredLibName);
            }
        }
        if (OneLiner != null) {
            Context.TopLevelNameSpace.Eval(OneLiner, 1);
        }
        if (!(Index < Args.length)) {
            ShellMode = true;
        }
        while (Index < Args.length) {
            var ScriptText = LibGreenTea.LoadFile2(Args[Index]);
            if (ScriptText == null) {
                LibGreenTea.Exit(1, "file not found: " + Args[Index]);
            }
            var FileLine = Context.GetFileLine(Args[Index], 1);
            var Success = Context.TopLevelNameSpace.Load(ScriptText, FileLine);
            Context.ShowReportedErrors();
            if (!Success) {
                LibGreenTea.Exit(1, "abort loading: " + Args[Index]);
            }
            Index += 1;
        }
        if (ShellMode) {
            LibGreenTea.println(ProgName + Version + " (" + CodeName + ") on " + LibGreenTea.GetPlatform());
            LibGreenTea.println(Copyright);
            Context.ShowReportedErrors();
            var linenum = 1;
            var Line = null;
            while ((Line = LibGreenTea.ReadLine2(">>> ", "    ")) != null) {
                try  {
                    var EvaledValue = Context.TopLevelNameSpace.Eval(Line, linenum);
                    Context.ShowReportedErrors();
                    if (EvaledValue != null) {
                        LibGreenTea.println(" (" + Context.GuessType(EvaledValue) + ":" + LibGreenTea.GetClassName(EvaledValue) + ") " + LibGreenTea.Stringify(EvaledValue));
                    }
                    linenum += 1;
                } catch (e) {
                    e.printStackTrace();
                }
            }
            LibGreenTea.println("");
        } else {
            Generator.FlushBuffer();
        }
    };

    GreenTeaScript.main = function (Args) {
        GreenTeaScript.ExecCommand(Args);
    };
    return GreenTeaScript;
})();
var GreenTeaLibraries = {};
GreenTeaLibraries["lib/bash/common.green"] = "int \"+\"(int x) as \"(($1))\";\n\nint \"-\"(int x) as \"((-$1))\";\n\nint \"~\"(int x) as \"((~$1))\";\n\nint \"+\"(int x, int y)      as \"(($1 + $2))\";\n\nint \"-\"(int x, int y)      as \"(($1 - $2))\";\n\nint \"*\"(int x, int y)      as \"(($1 * $2))\";\n\nint \"/\"(int x, int y)      as \"(($1 / $2))\";\n\nint \"%\"(int x, int y)      as \"(($1 % $2))\";\n\nint \"<<\"(int x, int y)     as \"(($1 << $2))\";\n\nint \">>\"(int x, int y)     as \"(($1 >> $2))\";\n\nint \"^\"(int x, int y)      as \"(($1 ^ $2))\";\n\nint \"|\"(int x, int y)      as \"(($1 | $2))\";\n\nint \"&\"(int x, int y)      as \"(($1 & $2))\";\n\nboolean \"<\"(int x,  int y) as \"(($1 < $2))\";\n\nboolean \"<=\"(int x, int y) as \"(($1 <= $2))\";\n\nboolean \">\"(int x,  int y) as \"(($1 > $2))\";\n\nboolean \">=\"(int x, int y) as \"(($1 >= $2))\";\n\nboolean \"==\"(int x, int y) as \"(($1 == $2))\";\n\nboolean \"!=\"(int x, int y) as \"(($1 != $2))\";\n\n\n\nString  \"+\"(String x, String y) as \"(concat $1 $2)\";\n\nboolean \"==\"(String x, String y) as \"(eqStr $1 $2)\";\n\nboolean \"!=\"(String x, String y) as \"(neStr $1 $2)\";\n\n\n\nboolean not(boolean x)   as \"(notBool $1)\";\n\nboolean \"!\"(boolean x)    as \"(notBool $1)\";\n\nboolean \"==\"(boolean x, boolean y) as \"(($1 == $2))\";\n\nboolean \"!=\"(boolean x, boolean y) as \"(($1 != $2))\";\n\n\n\nboolean \"==\"(any x, any y) as \"(eqAny $1 $2)\";\n\nboolean \"!=\"(any x, any y) as \"(neAny $1 $2)\";\n\n\n\nvoid print(String x) as \"print $1\";\n\nvoid println(String x) as \"println $1\";\n\nvoid assert(boolean x) as \"assert $1\";\n\n\n\nvoid rec(int n) as \"rec $1\";\n";
GreenTeaLibraries["lib/c/common.green"] = "// common api for c\n\n\n\n// unary operator\n\n@Const @Operator boolean \"!\"(boolean x) as \"! $1\"\n\n@Const @Operator int \"+\"(int x) as \"$1\";\n\n@Const @Operator int \"-\"(int x) as \"-$1\";\n\n@Const @Operator int \"~\"(int x) as \"~$1\";\n\n@Const @Operator double \"+\"(double x) as \"$1\";\n\n@Const @Operator double \"-\"(double x) as \"-$1\";\n\n\n\n// binary operator\n\n// any\n\n@Const @Operator boolean \"==\"(any x, any y) as \"$1  == $2\";\n\n@Const @Operator boolean \"!=\"(any x, any y) as \"$1  != $2\";\n\n\n\n// boolean\n\n@Const @Operator boolean \"==\"(boolean x, boolean y) as \"$1  == $2\";\n\n@Const @Operator boolean \"!=\"(boolean x, boolean y) as \"$1  != $2\";\n\n@Const @Operator String converter(boolean x) as \"greentea_tostrb($1)\";\n\n\n\n// int \n\n@Const @Operator int     \"+\"(int x, int y)      as \"$1 + $2\";\n\n@Const @Operator int     \"-\"(int x, int y)      as \"$1 - $2\";\n\n@Const @Operator int     \"*\"(int x, int y)      as \"$1 * $2\";\n\n@Const @Operator int     \"/\"(int x, int y)      as \"$1 / $2\";\n\n@Const @Operator int     \"%\"(int x, int y)      as \"$1 % $2\";\n\n@Const @Operator int     \"<<\"(int x, int y)     as \"$1 << $2\";\n\n@Const @Operator int     \">>\"(int x, int y)     as \"$1 >> $2\";\n\n@Const @Operator int     \"^\"(int x, int y)      as \"$1 ^ $2\";\n\n@Const @Operator int     \"|\"(int x, int y)      as \"$1 | $2\";\n\n@Const @Operator int     \"&\"(int x, int y)      as \"$1 & $2\";\n\n@Const @Operator boolean \"<\"(int x,  int y) as \"$1 < $2\";\n\n@Const @Operator boolean \">\"(int x,  int y) as \"$1 > $2\";\n\n@Const @Operator boolean \"<=\"(int x, int y) as \"$1 <= $2\";\n\n@Const @Operator boolean \">=\"(int x, int y) as \"$1 >= $2\";\n\n@Const @Operator boolean \"==\"(int x, int y) as \"$1 == $2\";\n\n@Const @Operator boolean \"!=\"(int x, int y) as \"$1 != $2\";\n\n\n\n@Coercion @Const any converter(int x)    as \"greentea_boxi($2)\";\n\n@Coercion @Const int converter(any x)    as \"greentea_unboxi($2)\";\n\n@Coercion @Const String converter(int x) as \"greentea_tostr($2)\";\n\n@Const int converter(String x)           as \"strtol($2, NULL, 10)\";\n\n\n\n\n\n// String\n\n@Const @Operator String  \"+\"(String x, String y)      as \"greentea_strcat($1, $2)\";\n\n@Const @Operator boolean \"==\"(String x, String y)    as \"strcmp($1, $2) == 0\";\n\n@Const @Operator boolean \"!=\"(String x, String y)    as \"strcmp($1, $2) != 0\";\n\n@Const @Operator boolean \"<\"(String x,  String y)    as \"strcmp($1, $2) <  0\";\n\n@Const @Operator boolean \">\"(String x,  String y)    as \"strcmp($1, $2) >  0\";\n\n@Const @Operator boolean \"<=\"(String x, String y)    as \"strcmp($1, $2) <= 0\";\n\n@Const @Operator boolean \">=\"(String x, String y)    as \"strcmp($1, $2) >= 0\";\n\n\n\nboolean startsWith(String x, String y)   as \"greentea_startswith($1, $2)\";\n\nboolean endsWith(String x, String y)     as \"greentea_endswith($1, $2)\";\n\nint indexOf(String x, String sub)        as \"strstr($1, $2)\";\n\nint lastIndexOf(String x, String sub)    as \"greentea_lastIndexOf($1, $2)\";\n\nString substring(String x, int s)        as \"greentea_substring($1, $2, strlen($1))\"\n\nString substring(String x, int s, int e) as \"greentea_substring($1, $2, $3)\"; \n\nString toLower(String x)                 as \"greentea_lower($1)\";\n\nString toUpper(String x)                 as \"greentea_upper($1)\";\n\nint charAt(String x, int pos)            as \"$1[$2]\";\n\nString replace(String x, String old, String new) as \"greentea_replace($1, $2, $3)\";\n\n\n\n// double\n\n@Const @Operator double  \"+\"(double x, double y)   as \"$1 + $2\";\n\n@Const @Operator double  \"-\"(double x, double y)   as \"$1 - $2\";\n\n@Const @Operator double  \"*\"(double x, double y)   as \"$1 * $2\";\n\n@Const @Operator double  \"/\"(double x, double y)   as \"$1 / $2\";\n\n@Const @Operator boolean \"<\"(double x,  double y) as \"$1 < $2\";\n\n@Const @Operator boolean \">\"(double x,  double y) as \"$1 > $2\";\n\n@Const @Operator boolean \"<=\"(double x, double y) as \"$1 <= $2\"\n\n@Const @Operator boolean \">=\"(double x, double y) as \"$1 >= $2\"\n\n@Const @Operator boolean \"==\"(double x, double y) as \"$1 == $2\"\n\n@Const @Operator boolean \"!=\"(double x, double y) as \"$1 != $2\"\n\n\n\n@Const @Operator double \"+\"(int x, double y) as \"$1 + $2\";\n\n@Const @Operator double \"-\"(int x, double y) as \"$1 - $2\";\n\n@Const @Operator double \"*\"(int x, double y) as \"$1 * $2\";\n\n@Const @Operator double \"/\"(int x, double y) as \"$1 / $2\";\n\n\n\n//FIXME ApplyNode for converter func has 3 arguments:\n\n//      converter(FromType, ToType, x)\n\n@Coercion @Const any converter(double x) as \"greentea_boxf($2)\";\n\n@Coercion @Const double converter(any x) as \"greentea_unboxf($2)\";\n\n@Const double converter(String x)        as \"strtod($2, NULL)\";\n\n\n\n// function\n\nvoid print(String x) as \"puts($1)\";\n\nvoid println(String x) as \"puts($1);\";\n\nvoid assert(boolean x) as \"assert($1)\";\n";
GreenTeaLibraries["lib/c/file.green"] = "class FilePtr {};\n\n\n\nFilePtr fopen(String path, String option) as \"fopen($1, $2)\";\n\n\n\nclass File {\n\n    FilePtr file;\n\n    constructor(String path) {\n\n        this.file = fopen(path, \"r\");\n\n    }\n\n    boolean Exist();\n\n}\n\n\n\nboolean File.Exist() {\n\n    return this.file != null;\n\n}\n\n\n\n@Export int main() {\n\n    File file = new File(\"./file.green\");\n\n    file.read();\n\n    return 0;\n\n}\n";
GreenTeaLibraries["lib/c/math.green"] = "class Math {};\n\n\n\n//// Returns the absolute value of a double value.\n\n////let Math.abs = import java.lang.Math.abs;\n\n////@Static double abs(double a)              as \"abs($1)\";\n\n//\n\n//// Returns the absolute value of a long value.\n\n////let Math.abs = import java.lang.Math.abs;\n\n////@Static int    abs(int a)                 as \"abs($1)\";\n\n\n\n// Returns the arc cosine of a value; the returned angle is in the range 0.0 through pi.\n\n//let Math.acos = import java.lang.Math.acos;\n\n//@Static double acos(double a)             as \"acos($1)\";\n\n\n\n// Returns the arc sine of a value; the returned angle is in the range -pi/2 through pi/2.\n\n//let Math.asin = import java.lang.Math.asin;\n\n//@Static double asin(double a)             as \"asin($1)\";\n\n\n\n// Returns the arc tangent of a value; the returned angle is in the range -pi/2 through pi/2.\n\n//let Math.atan = import java.lang.Math.atan;\n\n//@Static double atan(double a)             as \"atan($1)\";\n\n\n\n// Returns the angle theta from the conversion of rectangular coordinates (x, y) to polar coordinates (r, theta).\n\n//let Math.atan2 = import java.lang.Math.atan2;\n\n//@Static double atan2(double y, double x)  as \"atan2($1, $2)\";\n\n\n\n// Returns the smallest (closest to negative infinity) double value that is greater than or equal to the argument and is equal to a mathematical integer.\n\n//let Math.ceil = import java.lang.Math.ceil;\n\n//@Static double ceil(double a)             as \"ceil($1)\";\n\n\n\n// Returns the trigonometric cosine of an angle.\n\n//let Math.cos = import java.lang.Math.cos;\n\n//@Static double cos(double a)              as \"cos($1)\";\n\n\n\n// Returns the hyperbolic cosine of a double value.\n\n//let Math.cosh = import java.lang.Math.cosh;\n\n//@Static double cosh(double x)             as \"cosh($1)\";\n\n\n\n// Returns Euler's number e raised to the power of a double value.\n\n//let Math.exp = import java.lang.Math.exp;\n\n//@Static double exp(double a)              as \"exp($1)\";\n\n\n\n// Returns the largest (closest to positive infinity) double value that is less than or equal to the argument and is equal to a mathematical integer.\n\n//let Math.floor = import java.lang.Math.floor;\n\n//@Static double floor(double a)            as \"floor($1)\";\n\n\n\n// Returns the natural logarithm (base e) of a double value.\n\n//let Math.log = import java.lang.Math.log;\n\n//@Static double log(double a)              as \"log($1)\";\n\n\n\n// Returns the base 10 logarithm of a double value.\n\n//let Math.log10 = import java.lang.Math.log10;\n\n//@Static double log10(double a)            as \"log10($1)\";\n\n\n\n//// Returns the greater of two double values.\n\n////let Math.max = import java.lang.Math.max;\n\n//@Static double max(double a, double b)    as \"max($1, $2)\";\n\n//\n\n//// Returns the greater of two long values.\n\n////let Math.max = import java.lang.Math.max;\n\n//@Static long   max(long a, long b)        as \"max($1, $2)\";\n\n\n\n//// Returns the smaller of two double values.\n\n////let Math.min = import java.lang.Math.min;\n\n//@Static double min(double a, double b)    as \"min($1, $2)\";\n\n//\n\n//// Returns the smaller of two long values.\n\n////let Math.min = import java.lang.Math.min;\n\n//@Static long   min(long a, long b)        as \"min($1, $2)\";\n\n\n\n// Returns the value of the first argument raised to the power of the second argument.\n\n//let Math.pow = import java.lang.Math.pow;\n\n//@Static double pow(double a, double b)    as \"pow($1, $2)\";\n\n\n\n////@Static long   round(double a)            as \"round($1)\";\n\n\n\n// Returns a double value with a positive sign, greater than or equal to 0.0 and less than 1.0.\n\n//let Math.random import java.lang.Math.random;\n\n//@Static double random()                   as \"random()\";\n\n\n\n// Returns the trigonometric sine of an angle.\n\n//let Math.sin = import java.lang.Math.sin;\n\n//@Static double sin(double a)              as \"sin($1)\";\n\n\n\n// Returns the hyperbolic sine of a double value.\n\n////let Math.sinh = import java.lang.Math.sinh;\n\n//@Static double sinh(double x)             as \"sinh($1)\";\n\n//\n\n// Returns the correctly rounded positive square root of a double value.\n\n//let Math.sqrt = import java.lang.Math.sqrt;\n\n//@Static double sqrt(double a)             as \"sqrt($1)\";\n\n\n\n// Returns the trigonometric tangent of an angle.\n\n//let Math.tan = import java.lang.Math.tan;\n\n//@Static double tan(double a)              as \"tan($1)\";\n\n\n\n// Returns the hyperbolic tangent of a double value.\n\n//let Math.tanh = import java.lang.Math.tanh;\n\n//@Static double tanh(double x)             as \"tanh($1)\";\n";
GreenTeaLibraries["lib/java/c.green"] = "\n\nimport org.GreenTeaScript.CGrammar;\n";
GreenTeaLibraries["lib/java/common.green"] = "\n\n// libgreentea\n\n@Common void print(any x)   import LibGreenTea.print;\n\n@Common void println(any x) import LibGreenTea.println;\n\n@Common void assert(boolean x) import LibGreenTea.Assert;\n\n\n\n// top type\n\n@Common @Const @Operator int \"||\"(Top x) import Konoha.TopApi.Size;\n\n@Common @Const @Operator boolean \"==\"(Top x, Top y) import Konoha.TopApi.Equals;\n\n@Common @Const @Operator boolean \"!=\"(Top x, Top y) import Konoha.TopApi.NotEquals;\n\n\n\n// enum\n\n@Common @Coercion @Const int converter(var x) import Konoha.TopApi.EnumToInt;\n\n@Common @Coercion @Const String converter(var x) import Konoha.TopApi.EnumToString;\n\n\n\n// AnyApi\n\n\n\n// StringApi\n\n@Common @Const @Operator String \"+\"(String x, any y) import Konoha.StringApi.Add;\n\n//@Const @Operator String \"+\"(int x, String y) import GreenTeaRuntime.Add;\n\n//@Const @Operator String \"+\"(boolean x, String y) import GreenTeaRuntime.Add;\n\n\n\n@Common @Const @Operator boolean \"==\"(String x, String y) import Konoha.StringApi.Equals;\n\n@Common @Const @Operator boolean \"!=\"(String x, String y) import Konoha.StringApi.NotEquals;\n\n\n\n@Common @Const @Operator int \"||\"(String x) import Konoha.StringApi.GetSize;\n\n@Common @Const @Operator String \"[]\"(String x, int index) import Konoha.StringApi.Get;\n\n@Common @Const @Operator String \"[:]\"(String x, int beginIndex) import Konoha.StringApi.Slice;\n\n@Common @Const @Operator String \"[:]\"(String x, int beginIndex, int endIndex) import Konoha.StringApi.Slice;\n\n\n\n@Common @Const boolean startsWith(String x, String y) import Konoha.StringApi.StartsWith;\n\n@Common @Const boolean endsWith(String x, String y) import Konoha.StringApi.EndsWith;\n\n@Common @Const int indexOf(String x, String y) import Konoha.StringApi.IndexOf;\n\n@Common @Const int lastIndexOf(String x, String y) import Konoha.StringApi.LastIndexOf;\n\n\n\n@Const var split(String x, String y) import Konoha.StringApi.Split;\n\n\n\n@Common @Const @Coercion any converter(String x) import Konoha.StringApi.ToAny;\n\n@Common @Const int converter(String x) import Konoha.StringApi.ToInt;\n\n@Common @Const double converter(String x) import Konoha.StringApi.ToDouble;\n\n\n\n@Hidden @Coercion @Const var converter(var x) import Konoha.StringApi.s2c;\n\n@Hidden @StrongCoercion @Const var converter(var x) import Konoha.StringApi.c2s;\n\n\n\n// BooleanApi\n\n@Common @Const @Operator boolean not(boolean x) import Konoha.BooleanApi.Not;\n\n@Common @Const @Operator boolean \"!\"(boolean x) import Konoha.BooleanApi.Not;\n\n@Common @Const @Operator boolean \"==\"(boolean x, boolean y) import Konoha.BooleanApi.Equals;\n\n@Common @Const @Operator boolean \"!=\"(boolean x, boolean y) import Konoha.BooleanApi.NotEquals;\n\n\n\n@Common @Const @Coercion String converter(boolean x) import Konoha.BooleanApi.ToString;\n\n@Common @Const @Coercion any converter(boolean x) import Konoha.BooleanApi.ToAny;\n\n\n\n// IntApi\n\n@Common @Const @Operator int \"+\"(int x) import Konoha.IntApi.Plus;\n\n@Common @Const @Operator int \"-\"(int x) import Konoha.IntApi.Minus;\n\n@Common @Const @Operator int \"~\"(int x) import Konoha.IntApi.BitwiseNot;\n\n\n\n@Common @Const @Operator int \"+\"(int x, int y) import Konoha.IntApi.Add;\n\n@Common @Const @Operator int \"-\"(int x, int y) import Konoha.IntApi.Sub;\n\n@Common @Const @Operator int \"*\"(int x, int y) import Konoha.IntApi.Mul;\n\n@Common @Const @Operator int \"/\"(int x, int y) import Konoha.IntApi.Div;\n\n@Common @Const @Operator int \"%\"(int x, int y) import Konoha.IntApi.Mod;\n\n@Common @Const @Operator int \"<<\"(int x, int y) import Konoha.IntApi.LeftShift;\n\n@Common @Const @Operator int \">>\"(int x, int y) import Konoha.IntApi.RightShift;\n\n@Common @Const @Operator int \"^\"(int x, int y) import Konoha.IntApi.BitwiseAnd;\n\n@Common @Const @Operator int \"|\"(int x, int y) import Konoha.IntApi.BitwiseOr;\n\n@Common @Const @Operator int \"&\"(int x, int y) import Konoha.IntApi.BitwiseXor;\n\n@Common @Const @Operator boolean \"<\"(int x,  int y) import Konoha.IntApi.LessThan;\n\n@Common @Const @Operator boolean \"<=\"(int x, int y) import Konoha.IntApi.LessThanEquals;\n\n@Common @Const @Operator boolean \">\"(int x,  int y) import Konoha.IntApi.GreaterThan;\n\n@Common @Const @Operator boolean \">=\"(int x, int y) import Konoha.IntApi.GreaterThanEquals;\n\n@Common @Const @Operator boolean \"==\"(int x, int y) import Konoha.IntApi.Equals;\n\n@Common @Const @Operator boolean \"!=\"(int x, int y) import Konoha.IntApi.NotEquals;\n\n\n\n@Common @Const @Operator double \"+\"(int x, double y) import Konoha.IntApi.Add;\n\n@Common @Const @Operator double \"-\"(int x, double y) import Konoha.IntApi.Sub;\n\n@Common @Const @Operator double \"*\"(int x, double y) import Konoha.IntApi.Mul;\n\n@Common @Const @Operator double \"/\"(int x, double y) import Konoha.IntApi.Div;\n\n@Common @Const @Operator double \"%\"(int x, double y) import Konoha.IntApi.Mod;\n\n\n\n@Coercion @Const any converter(int x) import Konoha.IntApi.ToAny;\n\n@Common @Coercion @Const String converter(int x) import Konoha.IntApi.ToString;\n\n@Common @Coercion @Const double converter(int x) import Konoha.IntApi.ToDouble;\n\n\n\n@Hidden @Coercion @Const var converter(var x) import Konoha.IntApi.l2i;\n\n@Hidden @StrongCoercion @Const var converter(var x) import Konoha.IntApi.i2l;\n\n@Hidden @Coercion @Const var converter(var x) import Konoha.IntApi.l2s;\n\n@Hidden @StrongCoercion @Const var converter(var x) import Konoha.IntApi.s2l;\n\n@Hidden @Coercion @Const var converter(var x) import Konoha.IntApi.l2b;\n\n@Hidden @StrongCoercion @Const var converter(var x) import Konoha.IntApi.b2l;\n\n\n\n// DoubleApi\n\n@Common @Const @Operator double \"+\"(double x) import Konoha.DoubleApi.Plus;\n\n@Common @Const @Operator double \"-\"(double x) import Konoha.DoubleApi.Minus;\n\n\n\n@Common @Const @Operator double \"+\"(double x, double y) import Konoha.DoubleApi.Add;\n\n@Common @Const @Operator double \"-\"(double x, double y) import Konoha.DoubleApi.Sub;\n\n@Common @Const @Operator double \"*\"(double x, double y) import Konoha.DoubleApi.Mul;\n\n@Common @Const @Operator double \"/\"(double x, double y) import Konoha.DoubleApi.Div;\n\n@Common @Const @Operator boolean \"<\"(double x,  double y) import Konoha.DoubleApi.LessThan;\n\n@Common @Const @Operator boolean \"<=\"(double x, double y) import Konoha.DoubleApi.LessThanEquals;\n\n@Common @Const @Operator boolean \">\"(double x,  double y) import Konoha.DoubleApi.GreaterThan;\n\n@Common @Const @Operator boolean \">=\"(double x, double y) import Konoha.DoubleApi.GreaterThanEquals;\n\n@Common @Const @Operator boolean \"==\"(double x, double y) import Konoha.DoubleApi.Equals;\n\n@Common @Const @Operator boolean \"!=\"(double x, double y) import Konoha.DoubleApi.NotEquals;\n\n\n\n@Coercion @Const any converter(double x) import Konoha.DoubleApi.ToAny;\n\n@Common @Coercion @Const String converter(double x) import Konoha.DoubleApi.ToString;\n\n@Common @Coercion @Const int converter(double x) import Konoha.DoubleApi.ToInt;\n\n\n\n@Hidden @Coercion @Const var converter(var x) import Konoha.DoubleApi.d2f;\n\n@Hidden @StrongCoercion @Const var converter(var x) import Konoha.DoubleApi.f2d;\n\n//@Hidden @Coercion @Const var converter(var x) import Konoha.DoubleApi.d2i;\n\n//@Hidden @Coercion @Const var converter(var x) import Konoha.DoubleApi.i2d;\n\n\n\n//@Const @Coercion boolean converter(any x) import org.GreenTeaScript.GreenTeaRuntime.AnyToBoolean;\n\n//@Coercion @Const int converter(any x) import org.GreenTeaScript.GreenTeaRuntime.AnyToInt;\n\n// double\n\n//@Coercion @Const any converter(double x) import org.GreenTeaScript.GreenTeaRuntime.DoubleToAny;\n\n//@Coercion @Const double converter(any x) import org.GreenTeaScript.GreenTeaRuntime.AnyToDouble;\n\n//@Const double converter(String x) import org.GreenTeaScript.GreenTeaRuntime.StringToDouble;\n\n\n\n// ArrayApi\n\n@Common @Const @Operator <T> int \"||\"(Array<T> this) import Konoha.ArrayApi.GetSize;\n\n@Common @Const @Operator <T> T \"[]\"(Array<T> this, int index) import Konoha.ArrayApi.Get;\n\n@Common @Operator <T> void \"[]=\"(Array<T> this, int index, T value) import Konoha.ArrayApi.Set;\n\n@Common <T> Array<T> add(Array<T> this, T value) import Konoha.ArrayApi.Add;\n\n@Common @Const @Operator <T> Array<T> \"[:]\"(Array<T> x, int beginIndex) import Konoha.ArrayApi.Slice;\n\n@Common @Const @Operator <T> Array<T> \"[:]\"(Array<T> x, int beginIndex, int endIndex) import Konoha.ArrayApi.Slice;\n\n\n\n//@Common @Const @Operator int \"||\"(Array<int> this) import Konoha.ArrayApi.GetSizeI;\n\n//@Common @Const @Operator int \"[]\"(Array<int> this, int index) import Konoha.ArrayApi.GetI;\n\n//@Common @Operator void \"[]=\"(Array<int> this, int index, int value) import Konoha.ArrayApi.SetI;\n\n//@Common Array<int> add(Array<int> this, int value) import Konoha.ArrayApi.AddI;\n\n//@Common @Const @Operator Array<int> \"[:]\"(Array<int> x, int beginIndex) import Konoha.ArrayApi.SliceI;\n\n//@Common @Const @Operator Array<int> \"[:]\"(Array<int> x, int beginIndex, int endIndex) import Konoha.ArrayApi.SliceI;\n\n\n\n// experimental\n\n@Hidden @Coercion @Const var converter(var x) import Konoha.ArrayApi.GreenArrayToStringArray;\n\n@Hidden @StrongCoercion @Const var converter(var x) import Konoha.ArrayApi.StringArrayToGreenArray;\n\n\n\n\n\n\n";
GreenTeaLibraries["lib/java/dshell.green"] = "// DEOS D-Script Implementation\n\n\n\nimport org.GreenTeaScript.DShellGrammar;\n\n\n\n@Const @Operator boolean \"-f\"(String Path) import DShellGrammar.IsFile;\n\n@Const @Operator boolean \"-d\"(String Path) import DShellGrammar.IsDirectory;\n\n@Const @Operator boolean \"-e\"(String Path) import DShellGrammar.IsFileExists;\n\n@Const @Operator boolean \"-r\"(String Path) import DShellGrammar.IsFileReadable;\n\n@Const @Operator boolean \"-w\"(String Path) import DShellGrammar.IsFileWritable;\n\n@Const @Operator boolean \"-x\"(String Path) import DShellGrammar.IsFileExecutable;\n\n\n\nlet TooManyArgsException = import org.GreenTeaScript.DShell.TooManyArgsException;\n\nlet NotPermittedException = import org.GreenTeaScript.DShell.NotPermittedException;\n\nlet TemporaryUnavailableException = import org.GreenTeaScript.DShell.TemporaryUnavailableException;\n\nlet BadFileDescriptorException = import org.GreenTeaScript.DShell.BadFileDescriptorException;\n\nlet BadStateFileDescriptorException = import org.GreenTeaScript.DShell.BadStateFileDescriptorException;\n\nlet BadMessageException = import org.GreenTeaScript.DShell.BadMessageException;\n\nlet NoChildException = import org.GreenTeaScript.DShell.NoChildException;\n\nlet ConnectionRefusedException = import org.GreenTeaScript.DShell.ConnectionRefusedException;\n\nlet FileExistException = import org.GreenTeaScript.DShell.FileExistException;\n\nlet TooLargeFileException = import org.GreenTeaScript.DShell.TooLargeFileException;\n\nlet UnreachableHostException = import org.GreenTeaScript.DShell.UnreachableHostException;\n\nlet InterruptedBySignalException = import org.GreenTeaScript.DShell.InterruptedBySignalException;\n\nlet InvalidArgumentException = import org.GreenTeaScript.DShell.InvalidArgumentException;\n\nlet IOException = import org.GreenTeaScript.DShell.IOException;\n\nlet IsDirectoryException = import org.GreenTeaScript.DShell.IsDirectoryException;\n\nlet TooManyLinkException = import org.GreenTeaScript.DShell.TooManyLinkException;\n\nlet TooManyFileOpenException = import org.GreenTeaScript.DShell.TooManyFileOpenException;\n\nlet TooLongMessageException = import org.GreenTeaScript.DShell.TooLongMessageException;\n\nlet TooLongNameException = import org.GreenTeaScript.DShell.TooLongNameException;\n\nlet UnreachableNetworkException = import org.GreenTeaScript.DShell.UnreachableNetworkException;\n\nlet FileTableOverflowException = import org.GreenTeaScript.DShell.FileTableOverflowException;\n\nlet NoBufferSpaceException = import org.GreenTeaScript.DShell.NoBufferSpaceException;\n\nlet DeviceNotFoundException = import org.GreenTeaScript.DShell.DeviceNotFoundException;\n\nlet FileNotFoundException = import org.GreenTeaScript.DShell.FileNotFoundException;\n\nlet NoFreeMemoryException = import org.GreenTeaScript.DShell.NoFreeMemoryException;\n\nlet NoFreeSpaceException = import org.GreenTeaScript.DShell.NoFreeSpaceException;\n\nlet NotDirectoryException = import org.GreenTeaScript.DShell.NotDirectoryException;\n\nlet NotEmptyDirectoryException = import org.GreenTeaScript.DShell.NotEmptyDirectoryException;\n\nlet NotSocketException = import org.GreenTeaScript.DShell.NotSocketException;\n\nlet InappropriateOperateException = import org.GreenTeaScript.DShell.InappropriateOperateException;\n\nlet NotPermittedOperateException = import org.GreenTeaScript.DShell.NotPermittedOperateException;\n\nlet BrokenPipeException = import org.GreenTeaScript.DShell.BrokenPipeException;\n\nlet RemoteIOException = import org.GreenTeaScript.DShell.RemoteIOException;\n\nlet ReadOnlyException = import org.GreenTeaScript.DShell.ReadOnlyException;\n\nlet IllegalSeekException = import org.GreenTeaScript.DShell.IllegalSeekException;\n\nlet ConnectionTimeoutException = import org.GreenTeaScript.DShell.ConnectionTimeoutException;\n\nlet TooManyUsersException = import org.GreenTeaScript.DShell.TooManyUsersException;\n\n\n\n// FaultTypes\n\nlet DFault       = import org.GreenTeaScript.DShell.DFault;\n\nboolean MatchFault(DFault fault, String Location, String FaultInfo) import org.GreenTeaScript.DShell.DFault.MatchFault;\n\n\n\n//let DFault._new  = import org.GreenTeaScript.JVM.Fault.DFault._new;\n\n//let DFault.getLocation = import org.GreenTeaScript.JVM.Fault.DFault.getLocation;\n\n//let DFault.setLocation = import org.GreenTeaScript.JVM.Fault.DFault.setLocation;\n\n//let UnknownFault = import org.GreenTeaScript.JVM.Fault.UnknownFault;\n\n//let ReportAction = import org.GreenTeaScript.DShellGrammar.UpdateFaultInfomation;\n\n@Const @Operator boolean \"==\"(DFault x, DFault y) import org.GreenTeaScript.DShell.DFault.Equals;\n\n@Const @Operator boolean \"!=\"(DFault x, DFault y) import org.GreenTeaScript.DShell.DFault.NotEquals;\n";
GreenTeaLibraries["lib/java/math.green"] = "let Math = import java.lang.Math;\n\n\n\n//// Returns the absolute value of a double value.\n\n//let Math.abs = import java.lang.Math.abs;\n\n//\n\n//// Returns the absolute value of a long value.\n\n//let Math.abs = import java.lang.Math.abs;\n\n\n\n// Returns the arc cosine of a value; the returned angle is in the range 0.0 through pi.\n\nlet Math.acos = import java.lang.Math.acos;\n\n\n\n// Returns the arc sine of a value; the returned angle is in the range -pi/2 through pi/2.\n\nlet Math.asin = import java.lang.Math.asin;\n\n\n\n// Returns the arc tangent of a value; the returned angle is in the range -pi/2 through pi/2.\n\nlet Math.atan = import java.lang.Math.atan;\n\n\n\n// Returns the angle theta from the conversion of rectangular coordinates (x, y) to polar coordinates (r, theta).\n\nlet Math.atan2 = import java.lang.Math.atan2;\n\n\n\n// Returns the smallest (closest to negative infinity) double value that is greater than or equal to the argument and is equal to a mathematical integer.\n\nlet Math.ceil = import java.lang.Math.ceil;\n\n\n\n// Returns the trigonometric cosine of an angle.\n\nlet Math.cos = import java.lang.Math.cos;\n\n\n\n// Returns the hyperbolic cosine of a double value.\n\nlet Math.cosh = import java.lang.Math.cosh;\n\n\n\n// Returns Euler's number e raised to the power of a double value.\n\nlet Math.exp = import java.lang.Math.exp;\n\n\n\n// Returns the largest (closest to positive infinity) double value that is less than or equal to the argument and is equal to a mathematical integer.\n\nlet Math.floor = import java.lang.Math.floor;\n\n\n\n// Returns the natural logarithm (base e) of a double value.\n\nlet Math.log = import java.lang.Math.log;\n\n\n\n// Returns the base 10 logarithm of a double value.\n\nlet Math.log10 = import java.lang.Math.log10;\n\n\n\n//// Returns the greater of two double values.\n\n//let Math.max = import java.lang.Math.max;\n\n//\n\n//// Returns the greater of two long values.\n\n//let Math.max = import java.lang.Math.max;\n\n\n\n//// Returns the smaller of two double values.\n\n//let Math.min = import java.lang.Math.min;\n\n//\n\n//// Returns the smaller of two long values.\n\n//let Math.min = import java.lang.Math.min;\n\n\n\n// Returns the value of the first argument raised to the power of the second argument.\n\nlet Math.pow = import java.lang.Math.pow;\n\n\n\n// Returns a double value with a positive sign, greater than or equal to 0.0 and less than 1.0.\n\nlet Math.random = import java.lang.Math.random;\n\n\n\n// Returns the trigonometric sine of an angle.\n\nlet Math.sin = import java.lang.Math.sin;\n\n\n\n// Returns the hyperbolic sine of a double value.\n\n//let Math.sinh = import java.lang.Math.sinh;\n\n//\n\n// Returns the correctly rounded positive square root of a double value.\n\nlet Math.sqrt = import java.lang.Math.sqrt;\n\n\n\n// Returns the trigonometric tangent of an angle.\n\nlet Math.tan = import java.lang.Math.tan;\n\n\n\n// Returns the hyperbolic tangent of a double value.\n\nlet Math.tanh = import java.lang.Math.tanh;\n";
GreenTeaLibraries["lib/js/common.green"] = "// common api for c\n\n// unary operator\n\n@Const @Operator boolean \"!\"(boolean x) as \"! $1\"\n\n@Const @Operator int \"+\"(int x) as \"($1 | 0)\";\n\n@Const @Operator int \"-\"(int x) as \"-$1\";\n\n@Const @Operator int \"~\"(int x) as \"~$1\";\n\n@Const @Operator double \"+\"(double x) as \"$1\";\n\n@Const @Operator double \"-\"(double x) as \"-$1\";\n\n\n\n// binary operator\n\n// any\n\n@Const @Operator boolean \"==\"(any x, any y) as \"$1  == $2\";\n\n@Const @Operator boolean \"!=\"(any x, any y) as \"$1  != $2\";\n\n\n\n// boolean\n\n@Const @Operator boolean \"==\"(boolean x, boolean y) as \"$1  == $2\";\n\n@Const @Operator boolean \"!=\"(boolean x, boolean y) as \"$1  != $2\";\n\n@Const @Operator String converter(boolean x) as \"\\\"\\\" + $1\";\n\n\n\n// int \n\n@Const @Operator int     \"+\"(int x, int y)  as \"$1 + $2\";\n\n@Const @Operator int     \"-\"(int x, int y)  as \"$1 - $2\";\n\n@Const @Operator int     \"*\"(int x, int y)  as \"$1 * $2\";\n\n@Const @Operator int     \"/\"(int x, int y)  as \"$1 / $2\";\n\n@Const @Operator int     \"%\"(int x, int y)  as \"$1 % $2\";\n\n@Const @Operator int     \"<<\"(int x, int y) as \"$1 << $2\";\n\n@Const @Operator int     \">>\"(int x, int y) as \"$1 >> $2\";\n\n@Const @Operator int     \"^\"(int x, int y)  as \"$1 ^ $2\";\n\n@Const @Operator int     \"|\"(int x, int y)  as \"$1 | $2\";\n\n@Const @Operator int     \"&\"(int x, int y)  as \"$1 & $2\";\n\n@Const @Operator boolean \"<\"(int x,  int y) as \"$1 < $2\";\n\n@Const @Operator boolean \">\"(int x,  int y) as \"$1 > $2\";\n\n@Const @Operator boolean \"<=\"(int x, int y) as \"$1 <= $2\";\n\n@Const @Operator boolean \">=\"(int x, int y) as \"$1 >= $2\";\n\n@Const @Operator boolean \"==\"(int x, int y) as \"$1 == $2\";\n\n@Const @Operator boolean \"!=\"(int x, int y) as \"$1 != $2\";\n\n\n\n\n\n\n\n// String\n\nString +(String x, String y)      as \"$1 + $2\";\n\nboolean ==(String x, String y)    as \"$1 == $2\";\n\nboolean !=(String x, String y)    as \"$1 != $2\";\n\nboolean <(String x,  String y)    as \"$1 <= $2\";\n\nboolean <=(String x, String y)    as \"$1 <  $2\";\n\nboolean >(String x,  String y)    as \"$1 >  $2\";\n\nboolean >=(String x, String y)    as \"$1 >= $2\";\n\n\n\nboolean startsWith(String x, String y) as \" $1.indexOf($2, 0) == 0\";\n\nboolean endsWith(String x, String y) as \"$1.lastIndexOf($2, 0) == 0\";\n\nint indexOf(String x, String sub) as \"$1.indexOf($2)\";\n\nint lastIndexOf(String x, String sub) as \"$1.lastIndexOf($2)\";\n\nString substring(String x, int s) as \"$1.substring($2)\"\n\nString substring(String x, int s, int e) as \"$1.substring($2, $3)\"; \n\nString toLower(String x) as \"$1.lower()\";\n\nString toUpper(String x) as \"$1.upper()\";\n\nString replace(String x, String old, String new) as \"$1.replace($2, $3)\";\n\n\n\n// double\n\n@Const @Operator double  \"+\"(double x, double y)   as \"$1 + $2\";\n\n@Const @Operator double  \"-\"(double x, double y)   as \"$1 - $2\";\n\n@Const @Operator double  \"*\"(double x, double y)   as \"$1 * $2\";\n\n@Const @Operator double  \"/\"(double x, double y)   as \"$1 / $2\";\n\n@Const @Operator boolean \"<\"(double x,  double y) as \"$1 < $2\";\n\n@Const @Operator boolean \">\"(double x,  double y) as \"$1 > $2\";\n\n@Const @Operator boolean \"<=\"(double x, double y) as \"$1 <= $2\"\n\n@Const @Operator boolean \">=\"(double x, double y) as \"$1 >= $2\"\n\n@Const @Operator boolean \"==\"(double x, double y) as \"$1 == $2\"\n\n@Const @Operator boolean \"!=\"(double x, double y) as \"$1 != $2\"\n\n\n\n@Const @Operator double \"+\"(int x, double y) as \"$1 + $2\";\n\n@Const @Operator double \"-\"(int x, double y) as \"$1 - $2\";\n\n@Const @Operator double \"*\"(int x, double y) as \"$1 * $2\";\n\n@Const @Operator double \"/\"(int x, double y) as \"$1 / $2\";\n\n\n\n\n\n// function\n\nvoid print(String x) as \"console.log($1)\";\n\nvoid println(String x) as \"console.log($1)\";\n\nvoid assert(boolean x) as \"assert($1)\";\n";
GreenTeaLibraries["lib/perl/common.green"] = "// common api for perl\n\n\n\n// unary operator\n\n// any\n\nboolean not(boolean x) as \"! $1\"\n\nboolean \"!\"(boolean x) as \"! $1\"\n\nint \"+\"(int x) as \"$1\";\n\nint \"-\"(int x) as \"-$1\";\n\nint \"~\"(int x) as \"~$1\";\n\n\n\n// binary operator\n\n// any\n\nboolean \"==\"(any x, any y) as \"$1 == $2\";\n\nboolean \"!=\"(any x, any y) as \"$1 != $2\";\n\n\n\n// boolean\n\nboolean \"==\"(boolean x, boolean y) as \"$1 == $2\";\n\nboolean \"!=\"(boolean x, boolean y) as \"$1 != $2\";\n\nString convert(boolean x) as \"\\\"\\\" . $1\"; /*FIXME*/\n\n\n\n// int\n\n@Const @Operator int     \"+\"(int x, int y)  as \"$1 + $2\";\n\n@Const @Operator int     \"-\"(int x, int y)  as \"$1 - $2\";\n\n@Const @Operator int     \"*\"(int x, int y)  as \"$1 * $2\";\n\n@Const @Operator int     \"/\"(int x, int y)  as \"$1 / $2\";\n\n@Const @Operator int     \"%\"(int x, int y)  as \"$1 % $2\";\n\n@Const @Operator int     \"<<\"(int x, int y) as \"$1 << $2\";\n\n@Const @Operator int     \">>\"(int x, int y) as \"$1 >> $2\";\n\n@Const @Operator int     \"^\"(int x, int y)  as \"$1 ^ $2\";\n\n@Const @Operator int     \"|\"(int x, int y)  as \"$1 | $2\";\n\n@Const @Operator int     \"&\"(int x, int y)  as \"$1 & $2\";\n\n@Const @Operator boolean \"<\"(int x,  int y) as \"$1 < $2\";\n\n@Const @Operator boolean \">\"(int x,  int y) as \"$1 > $2\";\n\n@Const @Operator boolean \"<=\"(int x, int y) as \"$1 <= $2\";\n\n@Const @Operator boolean \">=\"(int x, int y) as \"$1 >= $2\";\n\n@Const @Operator boolean \"==\"(int x, int y) as \"$1 == $2\";\n\n@Const @Operator boolean \"!=\"(int x, int y) as \"$1 != $2\";\n\n\n\nString convert(int x) as \"\\\"\\\" . $1\";\n\n\n\n// String\n\nString  \"+\"(String x, String y) as \"$1 . $2\";\n\nboolean \"==\"(String x, String y)    as \"$1 eq $2\";\n\nboolean \"!=\"(String x, String y)    as \"$1 ne $2\";\n\nboolean \"<\"(String x,  String y)    as \"$1 lt $2\";\n\nboolean \">\"(String x,  String y)    as \"$1 gt$2\";\n\nboolean \"<=\"(String x, String y)    as \"$1 le $2\";\n\nboolean \">=\"(String x, String y)    as \"$1 ge $2\";\n\nint length(String x) as \"length($1)\";\n\n\n\n// double\n\n@Const @Operator double  \"+\"(double x, double y)   as \"$1 + $2\";\n\n@Const @Operator double  \"-\"(double x, double y)   as \"$1 - $2\";\n\n@Const @Operator double  \"*\"(double x, double y)   as \"$1 * $2\";\n\n@Const @Operator double  \"/\"(double x, double y)   as \"$1 / $2\";\n\n@Const @Operator boolean \"<\"(double x,  double y) as \"$1 < $2\";\n\n@Const @Operator boolean \">\"(double x,  double y) as \"$1 > $2\";\n\n@Const @Operator boolean \"<=\"(double x, double y) as \"$1 <= $2\"\n\n@Const @Operator boolean \">=\"(double x, double y) as \"$1 >= $2\"\n\n@Const @Operator boolean \"==\"(double x, double y) as \"$1 == $2\"\n\n@Const @Operator boolean \"!=\"(double x, double y) as \"$1 != $2\"\n\n\n\n@Const @Operator double \"+\"(int x, double y) as \"$1 + $2\";\n\n@Const @Operator double \"-\"(int x, double y) as \"$1 - $2\";\n\n@Const @Operator double \"*\"(int x, double y) as \"$1 * $2\";\n\n@Const @Operator double \"/\"(int x, double y) as \"$1 / $2\";\n\n\n\n@Coercion @Const any converter(double x) as \"$1\";\n\n@Coercion @Const double converter(any x) as \"$1 + 0.0\";\n\n@Const double converter(String x)        as \"$1 + 0.0\";\n\n\n\n\n\n// function\n\nvoid print(String x) as \"print $1,\";\n\nvoid println(String x) as \"print $1\";\n\nvoid assert(boolean x) as \"($1 == 1) or die \\\"Assertion faild\\\"\";\n";
GreenTeaLibraries["lib/python/common.green"] = "// common api for python\n\n\n\n// unary operator\n\n// any\n\nboolean not(boolean x) as \"not $1\"\n\nboolean !(boolean x) as \"not $1\"\n\nint +(int x) as \"$1\";\n\nint -(int x) as \"-$1\";\n\nint ~(int x) as \"~$1\";\n\n\n\n// binary operator\n\n// any\n\nboolean ==(any x, any y) as \"$1  == $2\";\n\nboolean !=(any x, any y) as \"$1  != $2\";\n\n\n\n// boolean\n\nboolean ==(boolean x, boolean y) as \"$1  == $2\";\n\nboolean !=(boolean x, boolean y) as \"$1  != $2\";\n\nString convert(boolean x) as \"green_toString($1)\";\n\n\n\n// int\n\n@Const @Operator int     \"+\"(int x, int y)      as \"$1 + $2\";\n\n@Const @Operator int     \"-\"(int x, int y)      as \"$1 - $2\";\n\n@Const @Operator int     \"*\"(int x, int y)      as \"$1 * $2\";\n\n@Const @Operator int     \"/\"(int x, int y)      as \"$1 / $2\";\n\n@Const @Operator int     \"%\"(int x, int y)      as \"$1 % $2\";\n\n@Const @Operator int     \"<<\"(int x, int y)     as \"$1 << $2\";\n\n@Const @Operator int     \">>\"(int x, int y)     as \"$1 >> $2\";\n\n@Const @Operator int     \"^\"(int x, int y)      as \"$1 ^ $2\";\n\n@Const @Operator int     \"|\"(int x, int y)      as \"$1 | $2\";\n\n@Const @Operator int     \"&\"(int x, int y)      as \"$1 & $2\";\n\n@Const @Operator boolean \"<\"(int x,  int y) as \"$1 < $2\";\n\n@Const @Operator boolean \">\"(int x,  int y) as \"$1 > $2\";\n\n@Const @Operator boolean \"<=\"(int x, int y) as \"$1 <= $2\";\n\n@Const @Operator boolean \">=\"(int x, int y) as \"$1 >= $2\";\n\n@Const @Operator boolean \"==\"(int x, int y) as \"$1 == $2\";\n\n@Const @Operator boolean \"!=\"(int x, int y) as \"$1 != $2\";\n\n\n\nString convert(int x) as \"str($1)\";\n\n\n\n// String\n\nString +(String x, String y)      as \"$1 + $2\";\n\nboolean ==(String x, String y)    as \"$1 == $2\";\n\nboolean !=(String x, String y)    as \"$1 != $2\";\n\nboolean <(String x,  String y)    as \"$1 < $2\";\n\nboolean <=(String x, String y)    as \"$1 <= $2\";\n\nboolean >(String x,  String y)    as \"$1 > $2\";\n\nboolean >=(String x, String y)    as \"$1 >= $2\";\n\n\n\nboolean startsWith(String x, String y) as \"$1.startswith($2)\";\n\nboolean endsWith(String x, String y) as \"$1.endswith($2)\";\n\nint indexOf(String x, String sub) as \"$1.find($2)\";\n\nint lastIndexOf(String x, String sub) as \"$1.rfind($2)\";\n\nString substring(String x, int s) as \"$1[$2:]\"\n\nString substring(String x, int s, int e) as \"$1[$2:$3]\";\n\nString toLower(String x) as \"$1.lower()\";\n\nString toUpper(String x) as \"$1.upper()\";\n\nString replace(String x, String old, String new) as \"$1.replace($2, $3)\";\n\n\n\n// double\n\n@Const @Operator double  \"+\"(double x, double y)   as \"$1 + $2\";\n\n@Const @Operator double  \"-\"(double x, double y)   as \"$1 - $2\";\n\n@Const @Operator double  \"*\"(double x, double y)   as \"$1 * $2\";\n\n@Const @Operator double  \"/\"(double x, double y)   as \"$1 / $2\";\n\n@Const @Operator boolean \"<\"(double x,  double y) as \"$1 < $2\";\n\n@Const @Operator boolean \">\"(double x,  double y) as \"$1 > $2\";\n\n@Const @Operator boolean \"<=\"(double x, double y) as \"$1 <= $2\"\n\n@Const @Operator boolean \">=\"(double x, double y) as \"$1 >= $2\"\n\n@Const @Operator boolean \"==\"(double x, double y) as \"$1 == $2\"\n\n@Const @Operator boolean \"!=\"(double x, double y) as \"$1 != $2\"\n\n\n\n@Const @Operator double \"+\"(int x, double y) as \"$1 + $2\";\n\n@Const @Operator double \"-\"(int x, double y) as \"$1 - $2\";\n\n@Const @Operator double \"*\"(int x, double y) as \"$1 * $2\";\n\n@Const @Operator double \"/\"(int x, double y) as \"$1 / $2\";\n\n\n\n@Coercion @Const any converter(double x) as \"$1\";\n\n@Coercion @Const double converter(any x) as \"float($1)\";\n\n@Const double converter(String x)        as \"float($1)\";\n\n\n\n// function\n\nvoid print(String x) as \"print $1,\";\n\nvoid println(String x) as \"print $1\";\n\nvoid assert(boolean x) as \"assert($1)\";\n\n\n";
GreenTeaLibraries["lib/scala/common.green"] = "// unary operator\n\n@Const @Operator boolean \"!\"(boolean x) as \"! $1\"\n\n@Const @Operator boolean not(boolean x) as \"! $1\"\n\n@Const @Operator int \"+\"(int x) as \"$1\";\n\n@Const @Operator int \"-\"(int x) as \"-$1\";\n\n@Const @Operator int \"~\"(int x) as \"~$1\";\n\n@Const @Operator double \"+\"(double x) as \"$1\";\n\n@Const @Operator double \"-\"(double x) as \"-$1\";\n\n\n\n// binary operator\n\n// any\n\n@Const @Operator boolean \"==\"(any x, any y) as \"$1 == $2\";\n\n@Const @Operator boolean \"!=\"(any x, any y) as \"$1 != $2\";\n\n\n\n// boolean\n\n@Const @Operator boolean \"==\"(boolean x, boolean y) as \"$1 == $2\";\n\n@Const @Operator boolean \"!=\"(boolean x, boolean y) as \"$1 != $2\";\n\n@Const @Operator boolean converter(String x) as \"($1).toBoolean\";\n\n@Const @Operator String  converter(boolean x) as \"($1).toString\";\n\n\n\n// int \n\n@Const @Operator int \"+\"(int x, int y)      as \"$1 + $2\";\n\n@Const @Operator int \"-\"(int x, int y)      as \"$1 - $2\";\n\n@Const @Operator int \"*\"(int x, int y)      as \"$1 * $2\";\n\n@Const @Operator int \"/\"(int x, int y)      as \"$1 / $2\";\n\n@Const @Operator int \"%\"(int x, int y)      as \"$1 % $2\";\n\n@Const @Operator int \"<<\"(int x, int y)     as \"$1 << $2\";\n\n@Const @Operator int \">>\"(int x, int y)     as \"$1 >> $2\";\n\n@Const @Operator int \"^\"(int x, int y)      as \"$1 ^ $2\";\n\n@Const @Operator int \"|\"(int x, int y)      as \"$1 | $2\";\n\n@Const @Operator int \"&\"(int x, int y)      as \"$1 & $2\";\n\n@Const @Operator boolean \"<\"(int x,  int y) as \"$1 < $2\";\n\n@Const @Operator boolean \"<=\"(int x, int y) as \"$1 <= $2\";\n\n@Const @Operator boolean \">\"(int x,  int y) as \"$1 > $2\";\n\n@Const @Operator boolean \">=\"(int x, int y) as \"$1 >= $2\";\n\n@Const @Operator boolean \"==\"(int x, int y) as \"$1 == $2\";\n\n@Const @Operator boolean \"!=\"(int x, int y) as \"$1 != $2\";\n\n\n\n@Coercion @Const String converter(int x) as \"($2).toString\";\n\n@Const int converter(String x)           as \"($2).toInt\";\n\n\n\n// String\n\n@Const @Operator String \"+\"(String x, String y)  as \"$1 + $2\";\n\n@Const @Operator String \"+\"(int x, String y)     as \"$1 + $2\";\n\n@Const @Operator String \"+\"(boolean x, String y) as \"$1 + $2\";\n\n\n\n@Const @Operator boolean \"==\"(String x, String y)    as \"$1 == $2\";\n\n@Const @Operator boolean \"!=\"(String x, String y)    as \"$1 != $2\";\n\n\n\nboolean startsWith(String x, String y)   as \"($1).startsWith($2)\";\n\nboolean endsWith(String x, String y)     as \"($1).endsWith($2)\";\n\nint indexOf(String x, String sub)        as \"($1).indexOf($2)\";\n\nint lastIndexOf(String x, String sub)    as \"($1).lastIndexOf($2)\";\n\nString substring(String x, int s)        as \"($1).substring($2)\"\n\nString substring(String x, int s, int e) as \"($1).substring($2, $3)\"; \n\nString toLower(String x)                 as \"($1).toLower()\";\n\nString toUpper(String x)                 as \"($1).toUpper()\";\n\nint charAt(String x, int pos)            as \"$1[$2]\";\n\nString replace(String x, String old, String new) as \"($1).replace($2, $3)\";\n\n\n\n// double\n\n@Const @Operator double  \"+\"(double x, double y)   as \"$1 + $2\";\n\n@Const @Operator double  \"-\"(double x, double y)   as \"$1 - $2\";\n\n@Const @Operator double  \"*\"(double x, double y)   as \"$1 * $2\";\n\n@Const @Operator double  \"/\"(double x, double y)   as \"$1 / $2\";\n\n@Const @Operator boolean \"<\"(double x,  double y) as \"$1 < $2\";\n\n@Const @Operator boolean \"<=\"(double x, double y) as \"$1 <= $2\"\n\n@Const @Operator boolean \">\"(double x,  double y) as \"$1 > $2\";\n\n@Const @Operator boolean \">=\"(double x, double y) as \"$1 >= $2\"\n\n@Const @Operator boolean \"==\"(double x, double y) as \"$1 == $2\"\n\n@Const @Operator boolean \"!=\"(double x, double y) as \"$1 != $2\"\n\n\n\n@Const @Operator double \"+\"(int x, double y) as \"$1 + $2\";\n\n@Const @Operator double \"-\"(int x, double y) as \"$1 - $2\";\n\n@Const @Operator double \"*\"(int x, double y) as \"$1 * $2\";\n\n@Const @Operator double \"/\"(int x, double y) as \"$1 / $2\";\n\n\n\n//FIXME ApplyNode for converter func has 3 arguments:\n\n//      converter(FromType, ToType, x)\n\n@Const double converter(String x)        as \"($2).toDouble\";\n\n@Coercion @Const String converter(double x) as \"($2).toString\";\n\n\n\n// function\n\nvoid print(String x) as \"print($1)\";\n\nvoid println(String x) as \"println($1);\";\n\nvoid assert(boolean x) as \"assert($1)\";\n";

var JavaScriptGlobal = Function("return this")();

Array.prototype["size"] = function () {
    return this.length;
};

Array.prototype["add"] = function (arg1) {
    if (arguments.length == 1) {
        this.push(arg1);
    } else {
        var arg2 = arguments[1];
        this.splice(arg1, 0, arg2);
    }
};

Array.prototype["get"] = function (i) {
    if (i >= this.length) {
        throw new RangeError("invalid array index");
    }
    return this[i];
};

Array.prototype["set"] = function (i, v) {
    this[i] = v;
};

Array.prototype["remove"] = function (i) {
    if (i >= this.length) {
        throw new RangeError("invalid array index");
    }
    var v = this[i];
    this.splice(i, 1);
    return v;
};

Array.prototype["clear"] = function () {
    this.length = 0;
};

Object.prototype["equals"] = function (other) {
    return (this === other);
};

Object.prototype["InstanceOf"] = function (klass) {
    return (this).constructor == klass;
};

String.prototype["startsWith"] = function (key) {
    return this.indexOf(key, 0) == 0;
};

String.prototype["endsWith"] = function (key) {
    return this.lastIndexOf(key, 0) == 0;
};

String.prototype["equals"] = function (other) {
    return (this == other);
};

JavaScriptGlobal["GreenTeaObject"] = (function () {
    function GreenTeaObject() {
    }
    GreenTeaObject.prototype.GetGreenType = function () {
        throw new Error("Abstruct method is called.");
    };
    return GreenTeaObject;
})();

var LibLoadFunc = (function () {
    function LibLoadFunc() {
    }
    LibLoadFunc.__LoadFunc = function (ParserContext, Grammar, FuncName) {
        if (!Grammar) {
            throw new Error("Grammar is " + Grammar);
        }
        var Func = Grammar[FuncName] || Grammar.constructor[FuncName];
        if (!Func) {
            throw new Error(Grammar.constructor.name + "." + FuncName + " is " + Func);
        }
        return LibGreenTea.ConvertNativeMethodToFunc(ParserContext, Func);
    };

    LibLoadFunc.LoadTokenFunc = function (ParserContext, Grammar, FuncName) {
        return LibLoadFunc.__LoadFunc(ParserContext, Grammar, FuncName);
    };

    LibLoadFunc.LoadParseFunc = function (ParserContext, Grammar, FuncName) {
        return LibLoadFunc.__LoadFunc(ParserContext, Grammar, FuncName);
    };

    LibLoadFunc.LoadTypeFunc = function (ParserContext, Grammar, FuncName) {
        return LibLoadFunc.__LoadFunc(ParserContext, Grammar, FuncName);
    };
    return LibLoadFunc;
})();

var GtMap = (function () {
    function GtMap() {
        this.map = {};
        this.key = [];
        this.length = 0;
    }
    GtMap.prototype.get = function (index) {
        return this.map[index];
    };
    GtMap.prototype.GetOrNull = function (index) {
        if (this.map[index] != undefined) {
            return this.map[index];
        }
        return null;
    };
    GtMap.prototype.put = function (key, obj) {
        this.length++;
        this.map[key] = obj;
        this.key.push(key);
    };
    GtMap.prototype.size = function () {
        return this.length;
    };
    GtMap.prototype.keys = function () {
        return this.key;
    };
    return GtMap;
})();

var LibGreenTea = (function () {
    function LibGreenTea() {
    }
    LibGreenTea.print = function (msg) {
        console.log(msg);
    };

    LibGreenTea.println = function (msg) {
        console.log(msg);
    };

    LibGreenTea.Assert = function (expect) {
        if (!expect) {
            throw new Error("Assertion Failed");
        }
    };

    LibGreenTea.NewArray = function (Type, InitSizes) {
        if (InitSizes.length == 1) {
            return GreenTeaArray.NewArray1(Type.TypeParams[0], InitSizes[0] - 0);
        } else if (InitSizes.length == 2) {
            return GreenTeaArray.NewArray2(Type.TypeParams[0].TypeParams[0], InitSizes[0] - 0, InitSizes[1] - 0);
        } else if (InitSizes.length == 3) {
            return GreenTeaArray.NewArray3(Type.TypeParams[0].TypeParams[0].TypeParams[0], InitSizes[0] - 0, InitSizes[1] - 0, InitSizes[2] - 0);
        }
        return InitSizes;
    };

    LibGreenTea.NewArrayLiteral = function (ArrayType, Values) {
        return GreenTeaArray.NewArrayLiteral(ArrayType, Values);
    };

    LibGreenTea.ArrayCopy = function (src, srcPos, dest, destPos, length) {
        for (var i = 0; i < length; ++i) {
            dest[destPos + i] = src[srcPos + i];
        }
    };

    LibGreenTea.ApplyOverridedMethod = function (FileLine, NameSpace, Func, Arguments) {
        var ClassType = NameSpace.Context.GuessType(Arguments[0]);
        Func = NameSpace.GetOverridedMethod(ClassType, Func);
        return Func.Apply(Arguments);
    };

    LibGreenTea.InvokeDynamicFunc = function (FileLine, ContextType, NameSpace, FuncName, Arguments) {
        var PolyFunc = NameSpace.GetPolyFunc(FuncName);
        var Func = PolyFunc.GetMatchedFunc(NameSpace, Arguments);
        var Value = ContextType.DefaultNullValue;
        if (Func != null) {
            Value = Func.Apply(Arguments);
            return LibGreenTea.DynamicCast(ContextType, Value);
        }
        LibGreenTea.VerboseLog(VerboseRuntime, PolyFunc.MessageTypeError(null, FuncName));
        return Value;
    };

    LibGreenTea.InvokeDynamicMethod = function (FileLine, ContextType, NameSpace, FuncName, Arguments) {
        var ClassType = ContextType.Context.GuessType(Arguments[0]);
        var PolyFunc = NameSpace.GetMethod(ClassType, FuncName, true);
        var Func = PolyFunc.GetMatchedFunc(NameSpace, Arguments);
        var Value = ContextType.DefaultNullValue;
        if (Func != null) {
            Value = Func.Apply(Arguments);
            return LibGreenTea.DynamicCast(ContextType, Value);
        }
        LibGreenTea.VerboseLog(VerboseRuntime, PolyFunc.MessageTypeError(ClassType, FuncName));
        return Value;
    };

    LibGreenTea.DynamicGetter = function (ContextType, RecvObject, FieldName) {
        try  {
            return LibGreenTea.DynamicCast(ContextType, RecvObject[FieldName]);
        } catch (e) {
        }
        return ContextType.DefaultNullValue;
    };

    LibGreenTea.DynamicSetter = function (ContextType, RecvObject, FieldName, Value) {
        try  {
            RecvObject[FieldName] = Value;
            return LibGreenTea.DynamicCast(ContextType, RecvObject[FieldName]);
        } catch (e) {
        }
        return ContextType.DefaultNullValue;
    };

    LibGreenTea.GetPlatform = function () {
        return "TypeScript 0.9.0.1, " + (LibGreenTea.isNodeJS ? "Node.js " + process.version + " " + process.platform : navigator.appName + " " + navigator.appVersion);
    };

    LibGreenTea.GetStackInfo = function (depth) {
        return " ";
    };

    LibGreenTea.TODO = function (msg) {
        LibGreenTea.println("TODO" + LibGreenTea.GetStackInfo(2) + ": " + msg);
    };

    LibGreenTea.DebugP = function (msg) {
        if (LibGreenTea.DebugMode) {
            LibGreenTea.println("DEBUG" + LibGreenTea.GetStackInfo(2) + ": " + msg);
        }
    };

    LibGreenTea.VerboseLog = function (VerboseFlag, msg) {
        LibGreenTea.println(msg);
    };

    LibGreenTea.VerboseException = function (e) {
        throw new Error("NotImplementedAPI");
    };

    LibGreenTea.Exit = function (status, message) {
        throw new Error("Exit: " + message);
    };

    LibGreenTea.NewParserId = function () {
        LibGreenTea.ParserCount++;
        return LibGreenTea.ParserCount;
    };

    LibGreenTea.CharAt = function (Text, Pos) {
        return Text.charCodeAt(Pos);
    };

    LibGreenTea.SubString = function (Text, StartIdx, EndIdx) {
        return Text.slice(StartIdx, EndIdx);
    };

    LibGreenTea.IsWhitespace = function (Text, Pos) {
        var ch = LibGreenTea.CharAt(Text, Pos);
        return ch == 32 || ch == 9;
    };

    LibGreenTea.IsLetter = function (Text, Pos) {
        var ch = LibGreenTea.CharAt(Text, Pos);
        if (ch > 90) {
            ch -= 0x20;
        }
        return 65 <= ch && ch <= 90;
    };

    LibGreenTea.IsDigit = function (Text, Pos) {
        var ch = LibGreenTea.CharAt(Text, Pos);
        return 48 <= ch && ch <= 57;
    };

    LibGreenTea.IsVariableName = function (Text, Pos) {
        var ch = LibGreenTea.CharAt(Text, Pos);
        return LibGreenTea.IsLetter(Text, Pos) || ch == '_'.charCodeAt(0) || ch > 255;
    };

    LibGreenTea.CheckBraceLevel = function (Text) {
        var level = 0;
        for (var i = 0; i < Text.length; i++) {
            var ch = Text[i];
            if (ch == '{' || ch == '[') {
                level++;
            }
            if (ch == '}' || ch == ']') {
                level--;
            }
        }
        return level;
    };

    LibGreenTea.CharToString = function (code) {
        return String.fromCharCode(code);
    };

    LibGreenTea.UnquoteString = function (Text) {
        var start = Text[0];
        if (start == "\"" || start == "'") {
            Text = Text.substring(1, Text.length - 1);
        }
        return Text.replace(/\\t/, "\t").replace(/\\n/, "\n").replace(/\\r/, "\r").replace(/\\"/, "\"").replace(/\\'/, "'").replace(/\\\\/, "\\");
    };

    LibGreenTea.QuoteString = function (Text) {
        return "\"" + Text.replace(/\t/, "\\t").replace(/\n/, "\\n").replace(/\r/, "\\r").replace(/"/, "\\\"").replace(/'/, "\\'").replace(/\\/, "\\") + "\"";
    };

    LibGreenTea.Stringify = function (Value) {
        if (Value === null) {
            return "null";
        }
        var name = LibGreenTea.GetClassName(Value);
        if (name == "String") {
            return LibGreenTea.QuoteString(Value);
        }
        return Value.toString();
    };

    LibGreenTea.StringifyField = function (Value) {
        var field = [];
        for (var key in Value) {
            field.push(key + ": " + LibGreenTea.Stringify(Value[key]));
        }
        return "{" + field.join(", ") + "};";
    };

    LibGreenTea.EqualsString = function (s1, s2) {
        return s1 == s2;
    };

    LibGreenTea.ParseInt = function (Text) {
        return ~~(Text);
    };

    LibGreenTea.ParseFloat = function (Text) {
        return Text - 0;
    };

    LibGreenTea.GetNativeType = function (Context, Value) {
        var NativeGtType = null;
        var NativeClassInfo = Value.constructor;
        if (Value.InstanceOf(Number) || Value == Number.prototype) {
            if ((Value | 0) == Value) {
                return Context.IntType;
            }
        }
        if (Value.InstanceOf(String) || Value == String.prototype) {
            return Context.StringType;
        }
        NativeGtType = Context.ClassNameMap.get(NativeClassInfo.name);
        if (NativeGtType == null) {
            NativeGtType = new GtType(Context, NativeType, NativeClassInfo.name, null, NativeClassInfo);
            Context.ClassNameMap.put(NativeClassInfo.name, NativeGtType);
        }
        if (!NativeGtType.InstanceOf(GtType)) {
            throw new Error("Invalid NativeGtType for " + Value.constructor.name);
        }
        return NativeGtType;
    };

    LibGreenTea.GetClassName = function (Value) {
        return (Value).constructor.name;
    };

    LibGreenTea.AcceptJavascriptType = function (GreenType, Type) {
        if (GreenType.IsVarType() || GreenType.IsTypeVariable()) {
            return true;
        }
        if (GreenType.IsTopType()) {
            return (Type == Object);
        }
        var JavascriptType = LibGreenTea.GetNativeType(GreenType.Context, Type);
        if (GreenType != JavascriptType) {
            if (GreenType.IsGenericType() && GreenType.HasTypeVariable()) {
                return GreenType.BaseType == JavascriptType.BaseType;
            }
            return false;
        }
        return true;
    };

    LibGreenTea.MatchNativeMethod = function (FuncType, JavaScriptFunction) {
        if (!LibGreenTea.AcceptJavascriptType(FuncType.TypeParams[0], Object)) {
            return false;
        }
        var StartIndex = 2;

        var ParamSize = FuncType.TypeParams.length - StartIndex;
        if (JavaScriptFunction.length != ParamSize)
            return false;
        for (var i = 0; i < JavaScriptFunction.length; i++) {
            if (!LibGreenTea.AcceptJavascriptType(FuncType.TypeParams[StartIndex + i], Object)) {
                return false;
            }
        }
        return true;
    };

    LibGreenTea.SetNativeMethod = function (NativeMethod, JavaScriptFunction) {
        var FuncFlag = NativeFunc;
        NativeMethod.SetNativeMethod(FuncFlag, JavaScriptFunction);
        return NativeMethod;
    };

    LibGreenTea.ConvertNativeMethodToFunc = function (Context, JavaScriptFunction) {
        var TypeList = [];
        TypeList.add(LibGreenTea.GetNativeType(Context, Object));
        TypeList.add(LibGreenTea.GetNativeType(Context, Object));
        var ParamTypes = [];
        for (var i = 0; i < JavaScriptFunction.length; i++) {
            TypeList.add(LibGreenTea.GetNativeType(Context, Object));
        }
        return LibGreenTea.SetNativeMethod(new GtFunc(0, JavaScriptFunction.name, 0, TypeList), JavaScriptFunction);
    };

    LibGreenTea.LoadNativeClass = function (ClassName) {
        return eval(ClassName);
    };

    LibGreenTea.LoadNativeMethod = function (ContextType, FullName, StaticMethodOnly) {
        var NameSplitted = FullName.split(".");
        var FuncName = NameSplitted.pop();
        var ClassName = NameSplitted.join(".");
        var Class = LibGreenTea.LoadNativeClass(ClassName);
        for (var key in Class) {
            var StaticMethod = Class[key];
            if (key == FuncName && StaticMethod && StaticMethod instanceof Function) {
                return StaticMethod;
            }
        }
        for (var key in Class.prototype) {
            var InstacnceMethod = Class.prototype[key];
            if (key == FuncName && InstacnceMethod && InstacnceMethod instanceof Function) {
                return InstacnceMethod;
            }
        }
        LibGreenTea.VerboseLog(VerboseUndefined, "undefined method: " + FullName + " for " + ContextType);
        return null;
    };

    LibGreenTea.ImportNativeMethod = function (NameSpace, NativeFunc, FullName) {
        var JavaScriptMethod = LibGreenTea.LoadNativeMethod(NativeFunc.GetFuncType(), FullName, false);
        if (JavaScriptMethod) {
            LibGreenTea.SetNativeMethod(NativeFunc, JavaScriptMethod);
            if (NativeFunc.GetReturnType().IsVarType()) {
                NativeFunc.SetReturnType(LibGreenTea.GetNativeType(NativeFunc.GetContext(), Object));
            }
            var StartIdx = NativeFunc.Is(NativeStaticFunc) ? 1 : 2;
            for (var i = 0; i < JavaScriptMethod.length; i++) {
                if (NativeFunc.Types[StartIdx + i].IsVarType()) {
                    NativeFunc.Types[StartIdx + i] = LibGreenTea.GetNativeType(NativeFunc.GetContext(), Object);
                    NativeFunc.FuncType = null;
                }
            }
            return true;
        }
        return false;
    };

    LibGreenTea.ImportNativeObject = function (NameSpace, PackageName) {
        LibGreenTea.VerboseLog(VerboseNative, "importing " + PackageName);
        var NativeClass = LibGreenTea.LoadNativeClass(PackageName);
        if (NativeClass && NativeClass.prototype && NativeClass.prototype.ImportGrammar instanceof Function) {
            var LoaderMethod = NativeClass.prototype.ImportGrammar;
            LoaderMethod(NameSpace, NativeClass);
            return LibGreenTea.GetNativeType(NameSpace.Context, NativeClass);
        }
        var Index = PackageName.lastIndexOf(".");
        if (Index == -1) {
            return null;
        }
        var NativeClass = LibGreenTea.LoadNativeClass(PackageName.substring(0, Index));
        return LibGreenTea.ImportStaticObject(NameSpace.Context, NativeClass, PackageName.substring(Index + 1));
    };

    LibGreenTea.LoadNativeConstructors = function (ClassType, FuncList) {
        throw new Error("NotSupportedAPI");
        return false;
    };

    LibGreenTea.LoadNativeField = function (ClassType, FieldName, GetSetter) {
        throw new Error("NotSupportedAPI");
        return null;
    };

    LibGreenTea.NativeFieldValue = function (ObjectValue, NativeField) {
        throw new Error("NotImplementedAPI");
        return null;
    };

    LibGreenTea.NativeFieldGetter = function (ObjectValue, NativeField) {
        throw new Error("NotImplementedAPI");
        return null;
    };

    LibGreenTea.NativeFieldSetter = function (ObjectValue, NativeField, Value) {
        throw new Error("NotImplementedAPI");
        return null;
    };

    LibGreenTea.ImportStaticObject = function (Context, NativeClass, Symbol) {
        throw new Error("NotImplementedAPI");
        return null;
    };

    LibGreenTea.LoadNativeStaticFieldValue = function (ClassType, Symbol) {
        throw new Error("NotImplementedAPI");
        return null;
    };

    LibGreenTea.LoadNativeMethods = function (ClassType, FuncName, FuncList) {
        throw new Error("NotImplementedAPI");
    };

    LibGreenTea.LookupNativeMethod = function (Callee, MethodName) {
        return Callee[MethodName];
    };

    LibGreenTea.ApplyFunc = function (Func, Self, Params) {
        return (Func.FuncBody).apply(Self, Params);
    };

    LibGreenTea.ApplyFunc1 = function (Func, Self, Param1) {
        return (Func.FuncBody).call(Self, Param1);
    };

    LibGreenTea.ApplyFunc2 = function (Func, Self, Param1, Param2) {
        return (Func.FuncBody).call(Self, Param1, Param2);
    };

    LibGreenTea.ApplyFunc3 = function (Func, Self, Param1, Param2, Param3) {
        return (Func.FuncBody).call(Self, Param1, Param2, Param3);
    };

    LibGreenTea.ApplyFunc4 = function (Func, Self, Param1, Param2, Param3, Param4) {
        return (Func.FuncBody).call(Self, Param1, Param2, Param3, Param4);
    };

    LibGreenTea.ApplyTokenFunc = function (TokenFunc, TokenContext, Text, pos) {
        return LibGreenTea.ApplyFunc3(TokenFunc, null, TokenContext, Text, pos);
    };

    LibGreenTea.ApplyParseFunc = function (ParseFunc, NameSpace, TokenContext, LeftTree, Pattern) {
        return LibGreenTea.ApplyFunc4(ParseFunc, null, NameSpace, TokenContext, LeftTree, Pattern);
    };

    LibGreenTea.ApplyTypeFunc = function (TypeFunc, Gamma, ParsedTree, ContextType) {
        return LibGreenTea.ApplyFunc3(TypeFunc, null, Gamma, ParsedTree, ContextType);
    };

    LibGreenTea.ListSize = function (List) {
        if (List == null) {
            return 0;
        }
        return List.length;
    };

    LibGreenTea.CompactTypeList = function (BaseIndex, List) {
        var Tuple = new Array(List.length - BaseIndex);
        for (var i = BaseIndex; i < List.length; i++) {
            Tuple[i] = List[i];
        }
        return Tuple;
    };

    LibGreenTea.CompactStringList = function (List) {
        return List.slice(0);
    };

    LibGreenTea.RetrieveMapKeys = function (Map, Prefix, List) {
        for (var i = 0; i < Map.keys.length; i++) {
            List.push(Map.keys[i]);
        }
    };

    LibGreenTea.Usage = function (message) {
    };

    LibGreenTea.DetectTargetCode = function (Extension, TargetCode) {
        throw new Error("NotImplementedAPI");
        return null;
    };

    LibGreenTea.StartsWith = function (self, key) {
        return self.indexOf(key, 0) == 0;
    };

    LibGreenTea.EndsWith = function (self, key) {
        return self.lastIndexOf(key, 0) == (self.length - key.length);
    };

    LibGreenTea.CodeGenerator = function (TargetCode, OutputFile, GeneratorFlag) {
        var Extension = (OutputFile == null ? "-" : OutputFile);
        if (LibGreenTea.EndsWith(Extension, ".js") || LibGreenTea.StartsWith(TargetCode, "js") || LibGreenTea.StartsWith(TargetCode, "javascript")) {
            return new JavaScriptSourceGenerator(TargetCode, OutputFile, GeneratorFlag);
        } else if (LibGreenTea.EndsWith(Extension, ".pl") || LibGreenTea.StartsWith(TargetCode, "perl")) {
            return new PerlSourceGenerator(TargetCode, OutputFile, GeneratorFlag);
        } else if (LibGreenTea.EndsWith(Extension, ".py") || LibGreenTea.StartsWith(TargetCode, "python")) {
            return new PythonSourceGenerator(TargetCode, OutputFile, GeneratorFlag);
        } else if (LibGreenTea.EndsWith(Extension, ".sh") || LibGreenTea.StartsWith(TargetCode, "bash")) {
            return new BashSourceGenerator(TargetCode, OutputFile, GeneratorFlag);
        } else if (LibGreenTea.EndsWith(Extension, ".scala") || LibGreenTea.StartsWith(TargetCode, "scala")) {
            return new ScalaSourceGenerator(TargetCode, OutputFile, GeneratorFlag);
        } else if (LibGreenTea.EndsWith(Extension, ".c") || LibGreenTea.StartsWith(TargetCode, "c")) {
            return new CSourceGenerator(TargetCode, OutputFile, GeneratorFlag);
        } else if (LibGreenTea.EndsWith(Extension, "X") || LibGreenTea.StartsWith(TargetCode, "exe")) {
            throw new Error("JavaByteCodeGenerator is not implemented for this environment");
        }
        return null;
    };

    LibGreenTea.WriteCode = function (OutputFile, SourceCode) {
        if (OutputFile == null) {
            LibGreenTea.Eval(SourceCode);
        } else if (OutputFile == "-") {
            console.log(SourceCode);
        } else {
            throw new Error("LibGreenTea.WriteCode cannon write code into a file in this environment");
        }
    };

    LibGreenTea.ReadLine = function (Prompt, Prompt2) {
        throw new Error("LibGreenTea.ReadLine is not implemented for this environment");
        return "";
    };

    LibGreenTea.ReadLine2 = function (Prompt, Prompt2) {
        throw new Error("LibGreenTea.ReadLine is not implemented for this environment");
        return "";
    };

    LibGreenTea.HasFile = function (FileName) {
        if (LibGreenTea.hasFileSystem) {
            return fs.existsSync(FileName).toString();
        } else {
            return !!GreenTeaLibraries[FileName];
        }
        return false;
    };

    LibGreenTea.IsSupportedTarget = function (TargetCode) {
        return LibGreenTea.HasFile(LibGreenTea.GetLibPath(TargetCode, "common"));
    };

    LibGreenTea.GetLibPath = function (TargetCode, FileName) {
        return ("lib/" + TargetCode + "/" + FileName + ".green");
    };

    LibGreenTea.LoadFile2 = function (FileName) {
        if (LibGreenTea.hasFileSystem) {
            return fs.readFileSync(FileName);
        } else {
            return GreenTeaLibraries[FileName];
        }
        return "";
    };

    LibGreenTea.JoinIntId = function (UpperId, LowerId) {
        return UpperId * LibGreenTea.Int32Max + LowerId;
    };

    LibGreenTea.UpperId = function (Fileline) {
        return (Fileline / LibGreenTea.Int32Max) | 0;
    };

    LibGreenTea.LowerId = function (Fileline) {
        return Fileline | Fileline;
    };

    LibGreenTea.booleanValue = function (Value) {
        return (Value);
    };

    LibGreenTea.Eval = function (SourceCode) {
        return eval(SourceCode);
    };

    LibGreenTea.DynamicCast = function (CastType, Value) {
        return null;
    };

    LibGreenTea.DynamicInstanceOf = function (Value, Type) {
        return false;
    };

    LibGreenTea.DynamicConvertTo = function (CastType, Value) {
        throw new Error("NotImplementedAPI");
        return false;
    };

    LibGreenTea.EvalUnary = function (Type, Operator, Value) {
        return null;
    };

    LibGreenTea.EvalSuffix = function (Type, Value, Operator) {
        return null;
    };

    LibGreenTea.EvalBinary = function (Type, LeftValue, Operator, RightValue) {
        return null;
    };

    LibGreenTea.EvalGetter = function (Type, Value, FieldName) {
        return null;
    };
    LibGreenTea.isNodeJS = typeof (process) != "undefined";
    LibGreenTea.hasFileSystem = typeof (fs) != "undefined";

    LibGreenTea.DebugMode = true;

    LibGreenTea.VerboseMask = 0;

    LibGreenTea.ParserCount = -1;

    LibGreenTea.Int32Max = Math.pow(2, 32);
    return LibGreenTea;
})();
