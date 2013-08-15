var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var PerlSourceGenerator = (function (_super) {
    __extends(PerlSourceGenerator, _super);
    function PerlSourceGenerator() {
        _super.call(this, "Perl");
    }
    PerlSourceGenerator.prototype.VisitBlockEachStatementWithIndent = function (Node) {
        var Code = "{\n";
        this.Indent();
        var CurrentNode = Node;
        while (CurrentNode != null) {
            CurrentNode.Evaluate(this);
            Code += this.GetIndentString() + this.PopSourceCode() + ";\n";
            CurrentNode = CurrentNode.NextNode;
        }
        this.UnIndent();
        Code += this.GetIndentString() + "}";
        this.PushSourceCode(Code);
    };

    PerlSourceGenerator.prototype.VisitEmptyNode = function (Node) {
    };

    PerlSourceGenerator.prototype.VisitSuffixNode = function (Node) {
        var MethodName = Node.Token.ParsedText;
        if (MethodName.equals("++")) {
        } else if (MethodName.equals("--")) {
        } else {
        }
        Node.Expr.Evaluate(this);
        this.PushSourceCode(this.PopSourceCode() + MethodName);
    };

    PerlSourceGenerator.prototype.VisitUnaryNode = function (Node) {
        var MethodName = Node.Token.ParsedText;
        if (MethodName.equals("+")) {
        } else if (MethodName.equals("-")) {
        } else if (MethodName.equals("~")) {
        } else if (MethodName.equals("!")) {
        } else if (MethodName.equals("++")) {
        } else if (MethodName.equals("--")) {
        } else {
        }
        Node.Expr.Evaluate(this);
        this.PushSourceCode(MethodName + this.PopSourceCode());
    };

    PerlSourceGenerator.prototype.VisitIndexerNode = function (Node) {
        Node.IndexAt.Evaluate(this);
        Node.Expr.Evaluate(this);
        this.PushSourceCode(this.PopSourceCode() + "[" + this.PopSourceCode() + "]");
    };

    PerlSourceGenerator.prototype.VisitMessageNode = function (Node) {
    };

    PerlSourceGenerator.prototype.VisitWhileNode = function (Node) {
        Node.CondExpr.Evaluate(this);
        var Program = "while(" + this.PopSourceCode() + ")";
        this.VisitBlockEachStatementWithIndent(Node.LoopBody);
        Program += this.PopSourceCode();
        this.PushSourceCode(Program);
    };

    PerlSourceGenerator.prototype.VisitDoWhileNode = function (Node) {
        var Program = "do";
        this.VisitBlockEachStatementWithIndent(Node.LoopBody);
        Node.CondExpr.Evaluate(this);
        Program += " while(" + this.PopSourceCode() + ")";
        this.PushSourceCode(Program);
    };

    PerlSourceGenerator.prototype.VisitForNode = function (Node) {
        Node.IterExpr.Evaluate(this);
        Node.CondExpr.Evaluate(this);
        var Cond = this.PopSourceCode();
        var Iter = this.PopSourceCode();

        var Program = "for(; " + Cond + "; " + Iter + ")";
        Node.LoopBody.Evaluate(this);
        Program += this.PopSourceCode();
        this.PushSourceCode(Program);
    };

    PerlSourceGenerator.prototype.VisitForEachNode = function (Node) {
    };

    PerlSourceGenerator.prototype.VisitConstNode = function (Node) {
        this.PushSourceCode(Node.ConstValue.toString());
    };

    PerlSourceGenerator.prototype.VisitNewNode = function (Node) {
        var Type = Node.Type.ShortClassName;
        this.PushSourceCode("new " + Type);
    };

    PerlSourceGenerator.prototype.VisitNullNode = function (Node) {
        this.PushSourceCode("NULL");
    };

    PerlSourceGenerator.prototype.VisitLocalNode = function (Node) {
        this.PushSourceCode("$" + Node.LocalName);
    };

    PerlSourceGenerator.prototype.VisitGetterNode = function (Node) {
        Node.Expr.Evaluate(this);
        this.PushSourceCode(this.PopSourceCode() + "->" + Node.Method.MethodName);
    };

    PerlSourceGenerator.prototype.EvaluateParam = function (Params) {
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

    PerlSourceGenerator.prototype.VisitApplyNode = function (Node) {
        var Program = Node.Method.GetNativeFuncName() + "(";
        var Params = this.EvaluateParam(Node.Params);
        var i = 0;
        while (i < Params.length) {
            var P = Params[i];
            if (i != 0) {
                Program += ",";
            }
            Program += P;
            i = i + 1;
        }
        Program += ")";
        this.PushSourceCode(Program);
    };

    PerlSourceGenerator.prototype.VisitBinaryNode = function (Node) {
        var MethodName = Node.Token.ParsedText;
        if (MethodName.equals("+")) {
        } else if (MethodName.equals("-")) {
        } else if (MethodName.equals("*")) {
        } else if (MethodName.equals("/")) {
        } else if (MethodName.equals("%")) {
        } else if (MethodName.equals("<<")) {
        } else if (MethodName.equals(">>")) {
        } else if (MethodName.equals("&")) {
        } else if (MethodName.equals("|")) {
        } else if (MethodName.equals("^")) {
        } else if (MethodName.equals("<=")) {
        } else if (MethodName.equals("<")) {
        } else if (MethodName.equals(">=")) {
        } else if (MethodName.equals(">")) {
        } else if (MethodName.equals("!=")) {
            if (Node.Method.GetRecvType() == this.Context.StringType) {
                MethodName = "ne";
            }
        } else if (MethodName.equals("==")) {
            if (Node.Method.GetRecvType() == this.Context.StringType) {
                MethodName = "eq";
            }
        } else {
        }
        Node.RightNode.Evaluate(this);
        Node.LeftNode.Evaluate(this);
        this.PushSourceCode(this.PopSourceCode() + " " + MethodName + " " + this.PopSourceCode());
    };

    PerlSourceGenerator.prototype.VisitAndNode = function (Node) {
        Node.RightNode.Evaluate(this);
        Node.LeftNode.Evaluate(this);
        this.PushSourceCode(this.PopSourceCode() + " && " + this.PopSourceCode());
    };

    PerlSourceGenerator.prototype.VisitOrNode = function (Node) {
        Node.RightNode.Evaluate(this);
        Node.LeftNode.Evaluate(this);
        this.PushSourceCode(this.PopSourceCode() + " || " + this.PopSourceCode());
    };

    PerlSourceGenerator.prototype.VisitAssignNode = function (Node) {
        Node.RightNode.Evaluate(this);
        Node.LeftNode.Evaluate(this);
        this.PushSourceCode(this.PopSourceCode() + " = " + this.PopSourceCode());
    };

    PerlSourceGenerator.prototype.VisitLetNode = function (Node) {
        var VarName = Node.VariableName;
        var Code = "my " + VarName;
        if (Node.InitNode != null) {
            Node.InitNode.Evaluate(this);
            Code += " = " + this.PopSourceCode();
        }
        Code += ";\n";
        Node.BlockNode.Evaluate(this);
        this.PushSourceCode(Code + this.PopSourceCode());
    };

    PerlSourceGenerator.prototype.VisitIfNode = function (Node) {
        Node.CondExpr.Evaluate(this);
        this.VisitBlockEachStatementWithIndent(Node.ThenNode);
        this.VisitBlockEachStatementWithIndent(Node.ElseNode);

        var ElseBlock = this.PopSourceCode();
        var ThenBlock = this.PopSourceCode();
        var CondExpr = this.PopSourceCode();
        var Code = "if(" + CondExpr + ") " + ThenBlock;
        if (Node.ElseNode != null) {
            Code += " else " + ElseBlock;
        }
        this.PushSourceCode(Code);
    };

    PerlSourceGenerator.prototype.VisitSwitchNode = function (Node) {
    };

    PerlSourceGenerator.prototype.VisitReturnNode = function (Node) {
        var Code = "return";
        if (Node.Expr != null) {
            Node.Expr.Evaluate(this);
            Code += " " + this.PopSourceCode();
        }
        this.PushSourceCode(Code);
    };

    PerlSourceGenerator.prototype.VisitBreakNode = function (Node) {
        var Code = "break";
        var Label = Node.Label;
        if (Label != null) {
            Code += " " + Label;
        }
        this.PushSourceCode(Code);
    };

    PerlSourceGenerator.prototype.VisitContinueNode = function (Node) {
        var Code = "continue";
        var Label = Node.Label;
        if (Label != null) {
            Code += " " + Label;
        }
        this.PushSourceCode(Code);
    };

    PerlSourceGenerator.prototype.VisitTryNode = function (Node) {
        var Code = "try";

        this.VisitBlockEachStatementWithIndent(Node.TryBlock);

        Code += this.PopSourceCode();
        if (Node.FinallyBlock != null) {
            this.VisitBlockEachStatementWithIndent(Node.FinallyBlock);
            Code += " finally " + this.PopSourceCode();
        }
        this.PushSourceCode(Code);
    };

    PerlSourceGenerator.prototype.VisitThrowNode = function (Node) {
        Node.Expr.Evaluate(this);
        var Code = "throw " + this.PopSourceCode();
        this.PushSourceCode(Code);
    };

    PerlSourceGenerator.prototype.VisitFunctionNode = function (Node) {
    };

    PerlSourceGenerator.prototype.VisitErrorNode = function (Node) {
        var Code = "throw Error(\"" + Node.Token.ParsedText + "\")";
        this.PushSourceCode(Code);
    };

    PerlSourceGenerator.prototype.VisitCommandNode = function (Node) {
        var Code = "system(\"";
        var i = 0;
        while (i < Node.Params.size()) {
            var Param = Node.Params.get(i);
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

    PerlSourceGenerator.prototype.GenerateMethod = function (Method, ParamNameList, Body) {
        var Program = "";
        var RetTy = Method.GetReturnType().ShortClassName;
        var FuncName = Method.GetNativeFuncName();
        var Signature = "# ";
        var Arguments = "";
        Signature += RetTy + " " + FuncName + "(";
        this.Indent();
        var i = 0;
        while (i < ParamNameList.size()) {
            var ParamTy = Method.GetFuncParamType(i).ShortClassName;
            Signature += " ," + ParamTy + " " + ParamNameList.get(i);
            Arguments += this.GetIndentString() + "my $" + ParamNameList.get(i) + " = $_[" + i + "];\n";
            i = i + 1;
        }
        this.UnIndent();
        Program += Signature + ");\n" + this.GetIndentString() + "sub " + FuncName + "{\n";
        this.Indent();
        Program += Arguments + this.GetIndentString();
        this.VisitBlockEachStatementWithIndent(Body);
        Program += this.PopSourceCode();
        this.UnIndent();
        Program += "\n" + this.GetIndentString() + "}";
        this.WriteTranslatedCode(Program);
    };

    PerlSourceGenerator.prototype.Eval = function (SingleNode) {
        SingleNode.Evaluate(this);
        return this.PopSourceCode();
    };

    PerlSourceGenerator.prototype.AddClass = function (Type) {
    };

    PerlSourceGenerator.prototype.SetLanguageContext = function (Context) {
    };
    return PerlSourceGenerator;
})(SourceGenerator);
