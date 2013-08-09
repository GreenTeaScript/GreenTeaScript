var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var CSourceGenerator = (function (_super) {
    __extends(CSourceGenerator, _super);
    function CSourceGenerator() {
        _super.call(this, "C");
    }
    CSourceGenerator.prototype.VisitBlockEachStatementWithIndent = function (Node, NeedBlock) {
        var Code = "";
        if (NeedBlock) {
            Code += "{\n";
            this.Indent();
        }
        var CurrentNode = Node;
        while (CurrentNode != null) {
            CurrentNode.Evaluate(this);
            Code += this.GetIndentString() + this.PopSourceCode() + ";\n";
            CurrentNode = CurrentNode.NextNode;
        }
        if (NeedBlock) {
            this.UnIndent();
            Code += this.GetIndentString() + "}";
        }
        this.PushSourceCode(Code);
    };

    CSourceGenerator.prototype.VisitEmptyNode = function (Node) {
    };

    CSourceGenerator.prototype.VisitSuffixNode = function (Node) {
        var MethodName = Node.Token.ParsedText;

        Node.Expr.Evaluate(this);
        this.PushSourceCode(this.PopSourceCode() + MethodName);
    };

    CSourceGenerator.prototype.VisitUnaryNode = function (Node) {
        var MethodName = Node.Token.ParsedText;

        Node.Expr.Evaluate(this);
        this.PushSourceCode(MethodName + this.PopSourceCode());
    };

    CSourceGenerator.prototype.VisitIndexerNode = function (Node) {
        Node.Indexer.Evaluate(this);
        Node.Expr.Evaluate(this);
        this.PushSourceCode(this.PopSourceCode() + "[" + this.PopSourceCode() + "]");
    };

    CSourceGenerator.prototype.VisitMessageNode = function (Node) {
    };

    CSourceGenerator.prototype.VisitWhileNode = function (Node) {
        Node.CondExpr.Evaluate(this);
        var Program = "while(" + this.PopSourceCode() + ")";
        this.VisitBlockEachStatementWithIndent(Node.LoopBody, true);
        Program += this.PopSourceCode();
        this.PushSourceCode(Program);
    };

    CSourceGenerator.prototype.VisitDoWhileNode = function (Node) {
        var Program = "do";
        this.VisitBlockEachStatementWithIndent(Node.LoopBody, true);
        Node.CondExpr.Evaluate(this);
        Program += " while(" + this.PopSourceCode() + ")";
        this.PushSourceCode(Program);
    };

    CSourceGenerator.prototype.VisitForNode = function (Node) {
        Node.IterExpr.Evaluate(this);
        Node.CondExpr.Evaluate(this);
        var Cond = this.PopSourceCode();
        var Iter = this.PopSourceCode();
        var Program = "for(; " + Cond + "; " + Iter + ")";
        Node.LoopBody.Evaluate(this);
        Program += this.PopSourceCode();
        this.PushSourceCode(Program);
    };

    CSourceGenerator.prototype.VisitForEachNode = function (Node) {
    };

    CSourceGenerator.prototype.VisitConstNode = function (Node) {
        var Code = "NULL";
        if (Node.ConstValue != null) {
            Code = this.StringfyConstValue(Node.ConstValue);
        }
        this.PushSourceCode(Code);
    };

    CSourceGenerator.prototype.VisitNewNode = function (Node) {
        var Type = Node.Type.ShortClassName;
        this.PushSourceCode("new " + Type);
    };

    CSourceGenerator.prototype.VisitNullNode = function (Node) {
        this.PushSourceCode("NULL");
    };

    CSourceGenerator.prototype.VisitLocalNode = function (Node) {
        this.PushSourceCode(Node.LocalName);
    };

    CSourceGenerator.prototype.VisitGetterNode = function (Node) {
        Node.Expr.Evaluate(this);
        this.PushSourceCode(this.PopSourceCode() + "->" + Node.Method.MethodName);
    };

    CSourceGenerator.prototype.EvaluateParam = function (Params) {
        var Size = ListSize(Params);
        var Programs = new Array(Size);
        var i = 0;
        while (i < Size) {
            var Node = Params.get(i);
            Node.Evaluate(this);
            Programs[Size - i - 1] = this.PopSourceCode();
            i = i + 1;
        }
        return Programs;
    };

    CSourceGenerator.prototype.VisitApplyNode = function (Node) {
        var Params = this.EvaluateParam(Node.Params);
        var Program = this.GenerateTemplate(Node);
        var i = 0;
        while (i < Params.length) {
            var P = Params[i];
            Program = Program.replace("$" + i, P);
            i = i + 1;
        }
        this.PushSourceCode(Program);
    };

    CSourceGenerator.prototype.GenerateTemplate = function (Node) {
        if (Node.Method.SourceMacro != null) {
            return Node.Method.SourceMacro;
        }
        var Template = Node.Method.LocalFuncName + "(";
        var i = 0;
        var ParamSize = Node.Params.size();
        while (i < ParamSize) {
            if (i != 0) {
                Template += " ,";
            }
            Template += "$" + i;
            i = i + 1;
        }
        Template += ")";
        return Template;
    };

    CSourceGenerator.prototype.VisitBinaryNode = function (Node) {
        var MethodName = Node.Token.ParsedText;

        Node.RightNode.Evaluate(this);
        Node.LeftNode.Evaluate(this);
        this.PushSourceCode(this.PopSourceCode() + " " + MethodName + " " + this.PopSourceCode());
    };

    CSourceGenerator.prototype.VisitAndNode = function (Node) {
        Node.RightNode.Evaluate(this);
        Node.LeftNode.Evaluate(this);
        this.PushSourceCode(this.PopSourceCode() + " && " + this.PopSourceCode());
    };

    CSourceGenerator.prototype.VisitOrNode = function (Node) {
        Node.RightNode.Evaluate(this);
        Node.LeftNode.Evaluate(this);
        this.PushSourceCode(this.PopSourceCode() + " || " + this.PopSourceCode());
    };

    CSourceGenerator.prototype.VisitAssignNode = function (Node) {
        Node.RightNode.Evaluate(this);
        Node.LeftNode.Evaluate(this);
        this.PushSourceCode(this.PopSourceCode() + " = " + this.PopSourceCode());
    };

    CSourceGenerator.prototype.VisitLetNode = function (Node) {
        var Type = Node.DeclType.ShortClassName;
        Node.VarNode.Evaluate(this);
        var Code = Type + " " + this.PopSourceCode() + ";\n";
        this.VisitBlockEachStatementWithIndent(Node.BlockNode, true);
        this.PushSourceCode(Code + this.GetIndentString() + this.PopSourceCode());
    };

    CSourceGenerator.prototype.VisitIfNode = function (Node) {
        Node.CondExpr.Evaluate(this);
        this.VisitBlockEachStatementWithIndent(Node.ThenNode, true);
        this.VisitBlockEachStatementWithIndent(Node.ElseNode, true);
        var ElseBlock = this.PopSourceCode();
        var ThenBlock = this.PopSourceCode();
        var CondExpr = this.PopSourceCode();
        var Code = "if(" + CondExpr + ") " + ThenBlock;
        if (Node.ElseNode != null) {
            Code += " else " + ElseBlock;
        }
        this.PushSourceCode(Code);
    };

    CSourceGenerator.prototype.VisitSwitchNode = function (Node) {
    };

    CSourceGenerator.prototype.VisitReturnNode = function (Node) {
        var Code = "return";
        if (Node.Expr != null) {
            Node.Expr.Evaluate(this);
            Code += " " + this.PopSourceCode();
        }
        this.PushSourceCode(Code);
    };

    CSourceGenerator.prototype.VisitLabelNode = function (Node) {
        var Label = Node.Label;
        this.PushSourceCode(Label + ":");
    };

    CSourceGenerator.prototype.VisitJumpNode = function (Node) {
        var Label = Node.Label;
        this.PushSourceCode("goto " + Label);
    };

    CSourceGenerator.prototype.VisitBreakNode = function (Node) {
        var Code = "break";
        var Label = Node.Label;
        if (Label != null) {
            Code += " " + Label;
        }
        this.PushSourceCode(Code);
    };

    CSourceGenerator.prototype.VisitContinueNode = function (Node) {
        var Code = "continue";
        var Label = Node.Label;
        if (Label != null) {
            Code += " " + Label;
        }
        this.PushSourceCode(Code);
    };

    CSourceGenerator.prototype.VisitTryNode = function (Node) {
        var Code = "try";

        this.VisitBlockEachStatementWithIndent(Node.TryBlock, true);
        Code += this.PopSourceCode();
        if (Node.FinallyBlock != null) {
            this.VisitBlockEachStatementWithIndent(Node.FinallyBlock, true);
            Code += " finally " + this.PopSourceCode();
        }
        this.PushSourceCode(Code);
    };

    CSourceGenerator.prototype.VisitThrowNode = function (Node) {
        Node.Expr.Evaluate(this);
        var Code = "throw " + this.PopSourceCode();
        this.PushSourceCode(Code);
    };

    CSourceGenerator.prototype.VisitFunctionNode = function (Node) {
    };

    CSourceGenerator.prototype.VisitErrorNode = function (Node) {
        var Code = "throw Error(\"" + Node.Token.ParsedText + "\")";
        this.PushSourceCode(Code);
    };

    CSourceGenerator.prototype.VisitCommandNode = function (Node) {
        var Code = "system(";
        var i = 0;
        var Command = "var __Command: string = ";
        while (i < ListSize(Node.Params)) {
            var Param = Node.Params.get(i);
            if (i != 0) {
                Command += " + ";
            }
            Param.Evaluate(this);
            Command += "(" + this.PopSourceCode() + ")";
            i = i + 1;
        }
        Code = Command + ";\n" + this.GetIndentString() + Code + "__Command)";
        this.PushSourceCode(Code);
    };

    CSourceGenerator.prototype.LocalTypeName = function (Type) {
        return Type.ShortClassName;
    };

    CSourceGenerator.prototype.DefineFunction = function (Method, ParamNameList, Body) {
        var Code = "";
        if (!Method.Is(ExportMethod)) {
            Code = "static ";
        }
        var RetTy = this.LocalTypeName(Method.GetReturnType());
        Code += RetTy + " " + Method.LocalFuncName + "(";
        var i = 0;
        while (i < ParamNameList.size()) {
            var ParamTy = this.LocalTypeName(Method.GetParamType(i));
            if (i > 0) {
                Code += ", ";
            }
            Code += ParamTy + " " + ParamNameList.get(i);
            i = i + 1;
        }
        Code += ")";
        this.VisitBlockEachStatementWithIndent(Body, true);
        Code += this.PopSourceCode();
        this.WriteTranslatedCode(Code);
    };

    CSourceGenerator.prototype.Eval = function (Node) {
        this.VisitBlockEachStatementWithIndent(Node, false);
        var Code = this.PopSourceCode();
        if (Code.equals(";\n")) {
            return "";
        }
        this.WriteTranslatedCode(Code);
        return Code;
    };

    CSourceGenerator.prototype.AddClass = function (Type) {
    };

    CSourceGenerator.prototype.SetLanguageContext = function (Context) {
    };
    return CSourceGenerator;
})(SourceGenerator);
