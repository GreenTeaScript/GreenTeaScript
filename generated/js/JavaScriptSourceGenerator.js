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
// #STR0# AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED
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
var JavaScriptSourceGenerator = (function (_super) {
    __extends(JavaScriptSourceGenerator, _super);
    function JavaScriptSourceGenerator(TargetCode, OutputFile, GeneratorFlag) {
        _super.call(this, TargetCode, OutputFile, GeneratorFlag);
    }
    JavaScriptSourceGenerator.prototype.VisitBlockJS = function (Node) {
        var Code = "";
        Code += "{" + this.LineFeed;
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
        this.VisitBlockJS(Node.BlockNode);
        this.PushSourceCode(Source + this.PopSourceCode());
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

    JavaScriptSourceGenerator.prototype.VisitWhileNode = function (Node) {
        this.VisitBlockJS(Node.LoopBody);
        var LoopBody = this.PopSourceCode();
        var CondExpr = this.VisitNode(Node.CondExpr);
        this.PushSourceCode("while(" + CondExpr + ") {" + LoopBody + "}");
    };

    JavaScriptSourceGenerator.prototype.VisitForNode = function (Node) {
        this.VisitBlockJS(Node.LoopBody);
        var LoopBody = this.PopSourceCode();
        var IterExpr = this.VisitNode(Node.IterExpr);
        var CondExpr = this.VisitNode(Node.CondExpr);
        this.PushSourceCode("for(;" + CondExpr + "; " + IterExpr + ") {" + LoopBody + "}");
    };

    JavaScriptSourceGenerator.prototype.VisitDoWhileNode = function (Node) {
        this.VisitBlockJS(Node.LoopBody);
        var LoopBody = this.PopSourceCode();
        var CondExpr = this.VisitNode(Node.CondExpr);
        this.PushSourceCode("do {" + LoopBody + "}while(" + CondExpr + ");");
    };

    JavaScriptSourceGenerator.prototype.VisitTryNode = function (Node) {
        var Code = "try ";
        this.VisitBlockJS(Node.TryBlock);
        Code += this.PopSourceCode();
        var Val = Node.CatchExpr;
        Code += " catch (" + Val.Type.toString() + " " + Val.VariableName + ") ";
        this.VisitBlockJS(Node.CatchBlock);
        Code += this.PopSourceCode();
        if (Node.FinallyBlock != null) {
            this.VisitBlockJS(Node.FinallyBlock);
            Code += " finally " + this.PopSourceCode();
        }
        this.PushSourceCode(Code);
    };

    JavaScriptSourceGenerator.prototype.VisitThrowNode = function (Node) {
        Node.Expr.Evaluate(this);
        var Expr = this.PopSourceCode();
        this.PushSourceCode("throw " + Expr);
        return;
    };

    JavaScriptSourceGenerator.prototype.VisitErrorNode = function (Node) {
        var Expr = Node.Token.ParsedText;
        this.PushSourceCode("(function() {throw new Error(\"" + Expr + "\") })()");
    };

    // This must be extended in each language
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
        Code = Code + ") ";
        this.VisitBlockJS(Body);
        Code += this.PopSourceCode() + ")";

        //this.PushSourceCode(Code);
        this.WriteLineCode(Code);
    };

    JavaScriptSourceGenerator.prototype.Eval = function (Node) {
        this.VisitBlock(Node);
        var ret = "";

        //		while(this.GeneratedCodeStack.size() > 0) {
        //			/*local*/String Line = this.PopSourceCode();
        //			if(Line.length() > 0) {
        //				ret =  Line + #STR43# + ret;
        //			}
        //		}
        ret = this.PopSourceCode();
        this.WriteLineCode(ret);
        return ret;
    };
    return JavaScriptSourceGenerator;
})(SourceGenerator);
