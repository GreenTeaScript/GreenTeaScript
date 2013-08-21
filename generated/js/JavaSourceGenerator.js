var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var JavaSourceGenerator = (function (_super) {
    __extends(JavaSourceGenerator, _super);
    function JavaSourceGenerator(TargetCode, OutputFile, GeneratorFlag) {
        _super.call(this, TargetCode, OutputFile, GeneratorFlag);
    }
    JavaSourceGenerator.prototype.VisitBlockEachStatementWithIndent = function (Node) {
        var Code = "{" + this.LineFeed;
        this.Indent();
        var CurrentNode = Node;
        while (CurrentNode != null) {
            Code += this.GetIndentString() + this.VisitNode(CurrentNode) + ";" + this.LineFeed;
            CurrentNode = CurrentNode.NextNode;
        }
        this.UnIndent();
        Code += this.GetIndentString() + "}";
        this.PushSourceCode(Code);
    };

    JavaSourceGenerator.prototype.VisitWhileNode = function (Node) {
        var Program = "while(" + this.VisitNode(Node.CondExpr) + ")";
        this.VisitBlockEachStatementWithIndent(Node.LoopBody);
        Program += this.PopSourceCode();
        this.PushSourceCode(Program);
    };

    JavaSourceGenerator.prototype.VisitDoWhileNode = function (Node) {
        var Program = "do";
        this.VisitBlockEachStatementWithIndent(Node.LoopBody);
        Program += " while(" + this.VisitNode(Node.CondExpr) + ")";
        this.PushSourceCode(Program);
    };

    JavaSourceGenerator.prototype.VisitForNode = function (Node) {
        var Cond = this.VisitNode(Node.CondExpr);
        var Iter = this.VisitNode(Node.IterExpr);
        var Program = "for(; " + Cond + "; " + Iter + ")";
        Program += this.VisitNode(Node.LoopBody);
        this.PushSourceCode(Program);
    };

    JavaSourceGenerator.prototype.VisitLetNode = function (Node) {
        var Type = Node.DeclType.ShortClassName;
        var VarName = Node.VariableName;
        var Code = Type + " " + VarName;
        if (Node.InitNode != null) {
            Code += " = " + this.VisitNode(Node.InitNode);
        }
        Code += ";" + this.LineFeed;
        this.VisitBlockEachStatementWithIndent(Node.BlockNode);
        this.PushSourceCode(Code + this.PopSourceCode());
    };

    JavaSourceGenerator.prototype.VisitIfNode = function (Node) {
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

    JavaSourceGenerator.prototype.VisitTryNode = function (Node) {
        var Code = "try";

        this.VisitBlockEachStatementWithIndent(Node.TryBlock);
        Code += this.PopSourceCode();
        if (Node.FinallyBlock != null) {
            this.VisitBlockEachStatementWithIndent(Node.FinallyBlock);
            Code += " finally " + this.PopSourceCode();
        }
        this.PushSourceCode(Code);
    };

    JavaSourceGenerator.prototype.VisitThrowNode = function (Node) {
        var Code = "throw " + this.VisitNode(Node.Expr);
        this.PushSourceCode(Code);
    };

    JavaSourceGenerator.prototype.VisitErrorNode = function (Node) {
        var Code = "throw RuntimeError(\"" + Node.Token.ParsedText + "\")";
        this.PushSourceCode(Code);
    };

    JavaSourceGenerator.prototype.GenerateFunc = function (Func, ParamNameList, Body) {
        var Program = "";
        var RetTy = Func.GetReturnType().ShortClassName;
        var ThisTy = Func.GetRecvType().ShortClassName;
        Program += RetTy + " " + ThisTy + "_" + Func.GetNativeFuncName() + "(";
        Program += ThisTy + " " + "this";
        for (var i = 0; i < ParamNameList.size(); i++) {
            var ParamTy = Func.GetFuncParamType(i).ShortClassName;
            Program += " ," + ParamTy + " " + ParamNameList.get(i);
        }

        Program += this.Eval(Body);
        this.WriteLineCode(Program);
    };

    JavaSourceGenerator.prototype.Eval = function (Node) {
        this.VisitBlockEachStatementWithIndent(Node);
        return this.PopSourceCode();
    };
    return JavaSourceGenerator;
})(SourceGenerator);
