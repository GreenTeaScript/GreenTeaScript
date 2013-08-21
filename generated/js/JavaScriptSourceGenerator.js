var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
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

    JavaScriptSourceGenerator.prototype.VisitLetNode = function (Node) {
        var VarName = Node.VariableName;
        var Source = (this.UseLetKeyword ? "let " : "var ") + " " + VarName;
        if (Node.InitNode != null) {
            Node.InitNode.Evaluate(this);
            Source += " = " + this.PopSourceCode();
        }
        Source += ";";
        this.VisitBlockJSWithIndent(Node.BlockNode);
        this.PushSourceCode(Source + this.PopSourceCode());
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
        this.PushSourceCode("do {" + LoopBody + "}while(" + CondExpr + ");");
    };

    JavaScriptSourceGenerator.prototype.VisitTryNode = function (Node) {
        var Code = "try ";
        Code += this.VisitBlockJSWithIndent(Node.TryBlock);
        var Val = Node.CatchExpr;
        Code += " catch (" + Val.Type.toString() + " " + Val.VariableName + ") ";
        Code += this.VisitBlockJSWithIndent(Node.CatchBlock);
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

    JavaScriptSourceGenerator.prototype.GenerateClassField = function (Type, ClassField) {
        var TypeName = Type.ShortClassName;
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
            Program += this.GetIndentString() + this.GetRecvName() + "." + FieldInfo.NativeName + " = " + InitValue + ";" + this.LineFeed;
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
    return JavaScriptSourceGenerator;
})(SourceGenerator);
