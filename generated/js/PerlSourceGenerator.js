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
        return Type.ShortClassName + "->new";
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
        this.PushSourceCode(this.VisitNode(Node.Expr) + this.MemberAccessOperator + "{'" + Node.Func.FuncName + "'}");
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

        //this.VisitEach(Node.CatchBlock);
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
        this.FlushErrorReport();
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
        Program += Signature + ");" + this.LineFeed + this.GetIndentString() + "sub " + FuncName + " {" + this.LineFeed;
        this.Indent();
        Program += Arguments + this.GetIndentString();
        this.VisitBlockEachStatementWithIndent(Body);
        Program += this.PopSourceCode();
        this.UnIndent();
        Program += this.LineFeed + this.GetIndentString() + "}";
        this.WriteLineCode(Program);
    };

    PerlSourceGenerator.prototype.GenerateClassField = function (Type, ClassField) {
        var TypeName = Type.ShortClassName;
        var Program = this.GetIndentString() + "package " + TypeName + ";" + this.LineFeed;
        if (Type.SuperType != null) {
            Program += this.GetIndentString() + "# our @ISA = ('" + Type.SuperType.ShortClassName + "');" + this.LineFeed;
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
    };

    PerlSourceGenerator.prototype.GetRecvName = function () {
        return "self";
    };

    PerlSourceGenerator.prototype.InvokeMainFunc = function (MainFuncName) {
        this.WriteLineCode(MainFuncName);
    };
    return PerlSourceGenerator;
})(SourceGenerator);
