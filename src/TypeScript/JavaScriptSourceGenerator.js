var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var JavaScriptSourceGenerator = (function (_super) {
    __extends(JavaScriptSourceGenerator, _super);
    function JavaScriptSourceGenerator() {
        _super.call(this, "JavaScript");
    }
    JavaScriptSourceGenerator.prototype.DefineFunction = function (Method, NameList, Body) {
        var ArgCount = Method.Types.length - 1;
        var Code = "var " + Method.LocalFuncName + " = (function(";
        var i = 0;
        while (i < ArgCount) {
            if (i > 0) {
                Code = Code + ", ";
            }
            Code = Code + NameList.get(i);
            i = i + 1;
        }
        Code = Code + ") ";
        this.VisitBlockJS(Body);
        Code += this.PopSourceCode() + ")";
        this.PushSourceCode(Code);
        this.WriteTranslatedCode(Code);
    };

    JavaScriptSourceGenerator.prototype.VisitBlockJS = function (Node) {
        this.Indent();
        var highLevelIndent = this.GetIndentString();
        _super.prototype.VisitBlock.call(this, Node);
        this.UnIndent();
        var Size = Node.CountForrowingNode();
        var Block = this.PopManyCodeAndJoin(Size, true, "\n" + highLevelIndent, ";", null);
        this.PushSourceCode("{" + Block + "\n" + this.GetIndentString() + "}");
    };

    JavaScriptSourceGenerator.prototype.VisitConstNode = function (Node) {
        this.PushSourceCode(Node.ConstValue == null ? "null" : Node.ConstValue.toString());
    };

    JavaScriptSourceGenerator.prototype.VisitUnaryNode = function (UnaryNode) {
        UnaryNode.Expr.Evaluate(this);
        this.PushSourceCode(UnaryNode.Token.ParsedText + this.PopSourceCode());
    };

    JavaScriptSourceGenerator.prototype.VisitBinaryNode = function (Node) {
        Node.RightNode.Evaluate(this);
        Node.LeftNode.Evaluate(this);
        var operator = Node.Token.ParsedText;
        if (operator.equals("/")) {
            this.PushSourceCode("((" + this.PopSourceCode() + " " + operator + " " + this.PopSourceCode() + ") | 0)");
        } else {
            this.PushSourceCode("(" + this.PopSourceCode() + " " + operator + " " + this.PopSourceCode() + ")");
        }
    };

    JavaScriptSourceGenerator.prototype.VisitNewNode = function (Node) {
        var i = 0;
        while (i < Node.Params.size()) {
            var Param = Node.Params.get(i);
            Param.Evaluate(this);
            i = i + 1;
        }
        this.PushSourceCode("new " + Node.Type.ShortClassName + "()");
    };

    JavaScriptSourceGenerator.prototype.VisitNullNode = function (Node) {
        this.PushSourceCode("null");
    };

    JavaScriptSourceGenerator.prototype.VisitLocalNode = function (Node) {
        this.PushSourceCode(Node.LocalName);
    };

    JavaScriptSourceGenerator.prototype.VisitGetterNode = function (Node) {
        Node.Expr.Evaluate(this);
        this.PushSourceCode(this.PopSourceCode() + "." + Node.Token.ParsedText);
    };

    JavaScriptSourceGenerator.prototype.VisitIndexerNode = function (Node) {
        Node.Indexer.Evaluate(this);
        Node.Expr.Evaluate(this);
        this.PushSourceCode(this.PopSourceCode() + "." + Node.Token.ParsedText + "[" + this.PopSourceCode() + "]");
    };

    JavaScriptSourceGenerator.prototype.VisitApplyNode = function (Node) {
        var methodName = Node.Method.LocalFuncName;
        var ParamCount = Node.Params.size();
        var i = 0;
        while (i < ParamCount) {
            Node.Params.get(i).Evaluate(this);
            i = i + 1;
        }
        var params = "(" + this.PopManyCodeAndJoin(ParamCount, true, null, null, ", ") + ")";
        this.PushSourceCode(methodName + params);
    };

    JavaScriptSourceGenerator.prototype.VisitAndNode = function (Node) {
        Node.LeftNode.Evaluate(this);
        Node.RightNode.Evaluate(this);
        var Right = this.PopSourceCode();
        var Left = this.PopSourceCode();
        this.PushSourceCode(Left + " && " + Right);
    };

    JavaScriptSourceGenerator.prototype.VisitOrNode = function (Node) {
        Node.LeftNode.Evaluate(this);
        Node.RightNode.Evaluate(this);
        var Right = this.PopSourceCode();
        var Left = this.PopSourceCode();
        this.PushSourceCode(Left + " || " + Right);
    };

    JavaScriptSourceGenerator.prototype.VisitAssignNode = function (Node) {
        Node.LeftNode.Evaluate(this);
        Node.RightNode.Evaluate(this);
        var Right = this.PopSourceCode();
        var Left = this.PopSourceCode();
        this.PushSourceCode((this.UseLetKeyword ? "let " : "var ") + Left + " = " + Right);
    };

    JavaScriptSourceGenerator.prototype.VisitLetNode = function (Node) {
        this.VisitBlockJS(Node.BlockNode);
    };

    JavaScriptSourceGenerator.prototype.VisitIfNode = function (Node) {
        Node.CondExpr.Evaluate(this);
        this.VisitBlockJS(Node.ThenNode);
        var ThenBlock = this.PopSourceCode();
        var CondExpr = this.PopSourceCode();
        var Source = "if(" + CondExpr + ") " + ThenBlock;
        if (Node.ElseNode != null) {
            this.VisitBlockJS(Node.ElseNode);
            Source = Source + " else " + this.PopSourceCode();
        }
        this.PushSourceCode(Source);
    };

    JavaScriptSourceGenerator.prototype.VisitSwitchNode = function (Node) {
    };

    JavaScriptSourceGenerator.prototype.VisitWhileNode = function (Node) {
        Node.CondExpr.Evaluate(this);
        this.VisitBlockJS(Node.LoopBody);
        var LoopBody = this.PopSourceCode();
        var CondExpr = this.PopSourceCode();
        this.PushSourceCode("while(" + CondExpr + ") {" + LoopBody + "}");
    };

    JavaScriptSourceGenerator.prototype.VisitForNode = function (Node) {
        Node.CondExpr.Evaluate(this);
        Node.IterExpr.Evaluate(this);
        this.VisitBlockJS(Node.LoopBody);
        var LoopBody = this.PopSourceCode();
        var IterExpr = this.PopSourceCode();
        var CondExpr = this.PopSourceCode();
        this.PushSourceCode("for(;" + CondExpr + "; " + IterExpr + ") {" + LoopBody + "}");
    };

    JavaScriptSourceGenerator.prototype.VisitDoWhileNode = function (Node) {
        Node.CondExpr.Evaluate(this);
        this.VisitBlockJS(Node.LoopBody);
        var LoopBody = this.PopSourceCode();
        var CondExpr = this.PopSourceCode();
        this.PushSourceCode("do {" + LoopBody + "}while(" + CondExpr + ");");
    };

    JavaScriptSourceGenerator.prototype.VisitForEachNode = function (ForEachNode) {
    };

    JavaScriptSourceGenerator.prototype.VisitEmptyNode = function (Node) {
        this.PushSourceCode("");
    };

    JavaScriptSourceGenerator.prototype.VisitReturnNode = function (Node) {
        if (Node.Expr != null) {
            Node.Expr.Evaluate(this);
            this.PushSourceCode("return " + this.PopSourceCode());
        } else {
            this.PushSourceCode("return");
        }
    };

    JavaScriptSourceGenerator.prototype.VisitBreakNode = function (Node) {
        this.PushSourceCode("break");
    };

    JavaScriptSourceGenerator.prototype.VisitContinueNode = function (Node) {
        this.PushSourceCode("continue");
    };

    JavaScriptSourceGenerator.prototype.VisitTryNode = function (Node) {
        this.VisitBlockJS(Node.TryBlock);

        this.VisitBlockJS(Node.FinallyBlock);

        var FinallyBlock = this.PopSourceCode();
        var CatchBlocks = "";
        var TryBlock = this.PopSourceCode();
        this.PushSourceCode("try " + TryBlock + "finally " + FinallyBlock);
        return;
    };

    JavaScriptSourceGenerator.prototype.VisitThrowNode = function (Node) {
        Node.Expr.Evaluate(this);
        var Expr = this.PopSourceCode();
        this.PushSourceCode("throw " + Expr);
        return;
    };

    JavaScriptSourceGenerator.prototype.VisitFunctionNode = function (Node) {
        return;
    };

    JavaScriptSourceGenerator.prototype.VisitErrorNode = function (Node) {
        var Expr = Node.toString();
        this.PushSourceCode("(function() {throw new Error(\"" + Expr + "\") })()");
        return;
    };

    JavaScriptSourceGenerator.prototype.Eval = function (Node) {
        this.VisitBlock(Node);
        var ret = "";
        while (this.GeneratedCodeStack.size() > 0) {
            var Line = this.PopSourceCode();
            if (Line.length > 0) {
                ret = Line + ";\n" + ret;
            }
        }

        return ret;
    };
    return JavaScriptSourceGenerator;
})(SourceGenerator);
