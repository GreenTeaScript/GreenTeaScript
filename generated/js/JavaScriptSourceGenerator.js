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
        this.PushSourceCode("do {" + LoopBody + "}while(" + CondExpr + ");");
    };

    JavaScriptSourceGenerator.prototype.VisitTryNode = function (Node) {
        var Code = "try ";
        Code += this.VisitBlockJSWithIndent(Node.TryBlock);
        var Val = Node.CatchExpr;
        Code += " catch (" + Val.Type.toString() + " " + Val.NativeName + ") ";
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

    /**
    JavaScript code to be generated:
    
    var CLASS = (function (_super) {
    __extends(CLASS, _super);                                #COMMENT23#
    function CLASS(param) {                                   #COMMENT24#
    _super.call(this, param);
    this.FIELD = param;                                      #COMMENT25#
    }
    CLASS.STATIC_FIELD = "value";                      #COMMENT26#
    
    CLASS.prototype.METHOD = function () {    #COMMENT27#
    }
    CLASS.STATIC_METHOD = function () {         #COMMENT28#
    }
    return CLASS;
    })(SUPERCLASS);
    */
    JavaScriptSourceGenerator.prototype.GenerateClassField = function (Type, ClassField) {
        var TypeName = Type.ShortClassName;
        var Program = this.GetIndentString() + "var " + TypeName + " = (function() {" + this.LineFeed;

        //		if(Type.SuperType != null) {
        //			Program += "(" + Type.SuperType.ShortClassName + ")";
        //		}
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
