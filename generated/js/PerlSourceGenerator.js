var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var PerlSourceGenerator = (function (_super) {
    __extends(PerlSourceGenerator, _super);
    function PerlSourceGenerator(TargetCode, OutputFile, GeneratorFlag) {
        _super.call(this, "perl", OutputFile, GeneratorFlag);
        this.TrueLiteral = "1";
        this.FalseLiteral = "0";
        this.NullLiteral = "NULL";
        this.MemberAccessOperator = "->";
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

    PerlSourceGenerator.prototype.VisitLocalNode = function (Node) {
        this.PushSourceCode("$" + Node.NativeName);
    };

    PerlSourceGenerator.prototype.VisitLetNode = function (Node) {
        var VarName = Node.VariableName;
        var Code = "my $" + VarName;
        if (Node.InitNode != null) {
            Code += " = " + this.VisitNode(Node.InitNode);
        }
        Code += ";" + this.LineFeed;
        Code += this.GetIndentString();
        this.VisitBlockEachStatementWithIndent(Node.BlockNode);
        this.PushSourceCode(Code + this.PopSourceCode());
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

    PerlSourceGenerator.prototype.GenerateFunc = function (Func, ParamNameList, Body) {
        var Program = "";
        var RetTy = Func.GetReturnType().ShortClassName;
        var FuncName = Func.GetNativeFuncName();
        var Signature = "# ";
        var Arguments = "";
        Signature += RetTy + " " + FuncName + "(";
        this.Indent();
        var i = 0;
        while (i < ParamNameList.size()) {
            var ParamTy = Func.GetFuncParamType(i).ShortClassName;
            Signature += " ," + ParamTy + " " + ParamNameList.get(i);
            Arguments += this.GetIndentString() + "my $" + ParamNameList.get(i) + " = $_[" + i + "];" + this.LineFeed;
            i = i + 1;
        }
        this.UnIndent();
        Program += Signature + ");" + this.LineFeed + this.GetIndentString() + "sub " + FuncName + "{" + this.LineFeed;
        this.Indent();
        Program += Arguments + this.GetIndentString();
        this.VisitBlockEachStatementWithIndent(Body);
        Program += this.PopSourceCode();
        this.UnIndent();
        Program += this.LineFeed + this.GetIndentString() + "}";
        this.WriteLineCode(Program);
    };

    PerlSourceGenerator.prototype.Eval = function (SingleNode) {
        SingleNode.Evaluate(this);
        return this.PopSourceCode();
    };

    PerlSourceGenerator.prototype.StartCompilationUnit = function () {
        this.WriteLineCode("use strict;");
        this.WriteLineCode("use warnings;");
    };

    PerlSourceGenerator.prototype.InvokeMainFunc = function (MainFuncName) {
        this.WriteLineCode(MainFuncName);
    };
    return PerlSourceGenerator;
})(SourceGenerator);
