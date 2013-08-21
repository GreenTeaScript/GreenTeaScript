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
//GreenTea Generator should be written in each language.
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

        //this.VisitEach(Node.CatchBlock);
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
        //FIXME
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
        //FIXME
        this.VisitBlockEachStatementWithIndent(Node);
        return this.PopSourceCode();
    };
    return JavaSourceGenerator;
})(SourceGenerator);
