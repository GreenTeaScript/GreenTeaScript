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
var CSourceGenerator = (function (_super) {
    __extends(CSourceGenerator, _super);
    ///*field*/ConstantFolder Opt;
    function CSourceGenerator(TargetCode, OutputFile, GeneratorFlag) {
        _super.call(this, TargetCode, OutputFile, GeneratorFlag);

        //this.Opt = new ConstantFolder(TargetCode, OutputFile, GeneratorFlag);
        this.TrueLiteral = "1";
        this.FalseLiteral = "0";
        this.NullLiteral = "NULL";
        this.MemberAccessOperator = "->";
    }
    CSourceGenerator.prototype.InitContext = function (Context) {
        _super.prototype.InitContext.call(this, Context);
        //this.Opt.InitContext(Context);
    };

    CSourceGenerator.prototype.GetLocalType = function (Type, IsPointer) {
        if (Type.IsDynamic() || Type.IsNative()) {
            if (Type == Type.PackageNameSpace.Context.BooleanType) {
                return "int";
            }
            return Type.ShortClassName;
        }
        var TypeName = "struct " + Type.ShortClassName;
        if (IsPointer) {
            TypeName += "*";
        }
        return TypeName;
    };
    CSourceGenerator.prototype.NativeTypeName = function (Type) {
        return this.GetLocalType(Type, false);
    };

    CSourceGenerator.prototype.LocalTypeName = function (Type) {
        return this.GetLocalType(Type, true);
    };

    CSourceGenerator.prototype.GreenTeaTypeName = function (Type) {
        return Type.ShortClassName;
    };

    CSourceGenerator.prototype.GetNewOperator = function (Type) {
        var TypeName = this.GreenTeaTypeName(Type);
        return "NEW_" + TypeName + "()";
    };

    CSourceGenerator.prototype.VisitBlockEachStatementWithIndent = function (Node, NeedBlock) {
        var Code = "";
        if (NeedBlock) {
            Code += "{" + this.LineFeed;
            this.Indent();
        }
        var CurrentNode = Node;
        while (CurrentNode != null) {
            if (!this.IsEmptyBlock(CurrentNode)) {
                var Stmt = this.VisitNode(CurrentNode);
                var SemiColon = "";
                var LineFeed = "";
                if (!Stmt.endsWith(";")) {
                    SemiColon = ";";
                }
                if (!Stmt.endsWith(this.LineFeed)) {
                    LineFeed = this.LineFeed;
                }
                Code += this.GetIndentString() + Stmt + SemiColon + LineFeed;
            }
            CurrentNode = CurrentNode.NextNode;
        }
        if (NeedBlock) {
            this.UnIndent();
            Code += this.GetIndentString() + "}";
        }
        this.PushSourceCode(Code);
    };

    CSourceGenerator.prototype.VisitWhileNode = function (Node) {
        var Program = "while(" + this.VisitNode(Node.CondExpr) + ")";
        this.VisitBlockEachStatementWithIndent(Node.LoopBody, true);
        Program += this.PopSourceCode();
        this.PushSourceCode(Program);
    };

    CSourceGenerator.prototype.VisitDoWhileNode = function (Node) {
        var Program = "do";
        this.VisitBlockEachStatementWithIndent(Node.LoopBody, true);
        Program += this.PopSourceCode() + " while(" + this.VisitNode(Node.CondExpr) + ")";
        this.PushSourceCode(Program);
    };

    CSourceGenerator.prototype.VisitForNode = function (Node) {
        var Cond = this.VisitNode(Node.CondExpr);
        var Iter = this.VisitNode(Node.IterExpr);
        var Program = "for(; " + Cond + "; " + Iter + ") ";
        this.VisitBlockEachStatementWithIndent(Node.LoopBody, true);
        Program += this.PopSourceCode();
        this.PushSourceCode(Program);
    };

    CSourceGenerator.prototype.VisitGetterNode = function (Node) {
        var Program = this.VisitNode(Node.Expr);
        var FieldName = Node.Func.FuncName;
        var RecvType = Node.Func.GetRecvType();
        if (Node.Expr.Type == RecvType) {
            Program = Program + "->" + FieldName;
        } else {
            Program = "GT_GetField(" + this.LocalTypeName(RecvType) + ", " + Program + ", " + FieldName + ")";
        }
        this.PushSourceCode(Program);
    };

    CSourceGenerator.prototype.VisitVarNode = function (Node) {
        var Type = this.LocalTypeName(Node.DeclType);
        var VarName = Node.NativeName;
        var Code = Type + " " + VarName;
        var CreateNewScope = true;
        if (Node.InitNode != null) {
            Code += " = " + this.VisitNode(Node.InitNode);
        }
        Code += ";" + this.LineFeed;
        if (CreateNewScope) {
            Code += this.GetIndentString();
        }
        this.VisitBlockEachStatementWithIndent(Node.BlockNode, CreateNewScope);
        this.PushSourceCode(Code + this.PopSourceCode());
    };

    CSourceGenerator.prototype.VisitIfNode = function (Node) {
        var CondExpr = this.VisitNode(Node.CondExpr);
        this.VisitBlockEachStatementWithIndent(Node.ThenNode, true);
        var ThenBlock = this.PopSourceCode();
        var Code = "if(" + CondExpr + ") " + ThenBlock;
        if (Node.ElseNode != null) {
            this.VisitBlockEachStatementWithIndent(Node.ElseNode, true);
            Code += " else " + this.PopSourceCode();
        }
        this.PushSourceCode(Code);
    };

    CSourceGenerator.prototype.VisitSwitchNode = function (Node) {
        var Code = "switch (" + this.VisitNode(Node.MatchNode) + ") {" + this.LineFeed;
        var i = 0;
        while (i < Node.CaseList.size()) {
            var Case = Node.CaseList.get(i);
            var Block = Node.CaseList.get(i + 1);
            Code += this.GetIndentString() + "case " + this.VisitNode(Case) + ":";
            if (this.IsEmptyBlock(Block)) {
                this.Indent();
                Code += this.LineFeed + this.GetIndentString() + "/* fall-through */" + this.LineFeed;
                this.UnIndent();
            } else {
                this.VisitBlockEachStatementWithIndent(Block, true);
                Code += this.PopSourceCode() + this.LineFeed;
            }
            i = i + 2;
        }
        if (Node.DefaultBlock != null) {
            Code += this.GetIndentString() + "default:" + this.LineFeed;
            this.VisitBlockEachStatementWithIndent(Node.DefaultBlock, true);
            Code += this.PopSourceCode();
        }
        Code += this.GetIndentString() + "}";
        this.PushSourceCode(Code);
    };

    CSourceGenerator.prototype.VisitTryNode = function (Node) {
        var Code = "try ";
        this.VisitBlockEachStatementWithIndent(Node.TryBlock, true);
        Code += this.PopSourceCode();
        var Val = Node.CatchExpr;
        Code += " catch (" + Val.Type.toString() + " " + Val.NativeName + ") ";
        this.VisitBlockEachStatementWithIndent(Node.CatchBlock, true);
        Code += this.PopSourceCode();
        if (Node.FinallyBlock != null) {
            this.VisitBlockEachStatementWithIndent(Node.FinallyBlock, true);
            Code += " finally " + this.PopSourceCode();
        }
        this.PushSourceCode(Code);
    };

    CSourceGenerator.prototype.VisitThrowNode = function (Node) {
        var Code = "throw " + this.VisitNode(Node.Expr);
        this.PushSourceCode(Code);
        this.StopVisitor(Node);
    };

    CSourceGenerator.prototype.VisitErrorNode = function (Node) {
        var Code = "throw Error(\"" + Node.Token.ParsedText + "\")";
        this.PushSourceCode(Code);
        this.StopVisitor(Node);
    };

    CSourceGenerator.prototype.VisitCommandNode = function (Node) {
        var Code = "system(";
        var i = 0;
        var Command = "String __Command = ";
        while (i < LibGreenTea.ListSize(Node.Params)) {
            var Param = Node.Params.get(i);
            if (i != 0) {
                Command += " + ";
            }
            Param.Evaluate(this);
            Command += "(" + this.PopSourceCode() + ")";
            i = i + 1;
        }
        Code = Command + ";" + this.LineFeed + this.GetIndentString() + Code + "__Command)";
        this.PushSourceCode(Code);
    };

    CSourceGenerator.prototype.GenerateFunc = function (Func, ParamNameList, Body) {
        this.FlushErrorReport();
        var Code = "";
        if (!Func.Is(ExportFunc)) {
            Code = "static ";
        }

        //Body = this.Opt.Fold(Body);
        var RetTy = this.LocalTypeName(Func.GetReturnType());
        Code += RetTy + " " + Func.GetNativeFuncName() + "(";
        var i = 0;
        while (i < ParamNameList.size()) {
            var ParamTy = this.LocalTypeName(Func.GetFuncParamType(i));
            if (i > 0) {
                Code += ", ";
            }
            Code += ParamTy + " " + ParamNameList.get(i);
            i = i + 1;
        }
        Code += ")";
        this.VisitBlockEachStatementWithIndent(Body, true);
        Code += this.PopSourceCode();
        this.WriteLineCode(Code);
    };

    CSourceGenerator.prototype.Eval = function (Node) {
        //Node = this.Opt.Fold(Node);
        this.VisitBlockEachStatementWithIndent(Node, false);
        var Code = this.PopSourceCode();
        if (LibGreenTea.EqualsString(Code, ";" + this.LineFeed)) {
            return "";
        }
        this.WriteLineCode(Code);
        return Code;
    };

    CSourceGenerator.prototype.GenerateClassField = function (Type, ClassField) {
        var TypeName = Type.ShortClassName;
        var LocalType = this.LocalTypeName(Type);
        var Program = this.GetIndentString() + "struct " + TypeName + " {" + this.LineFeed;
        this.Indent();
        if (Type.SuperType != null) {
            Program += this.GetIndentString() + "// " + this.LocalTypeName(Type.SuperType) + " __base;" + this.LineFeed;
        }
        var i = 0;
        while (i < ClassField.FieldList.size()) {
            var FieldInfo = ClassField.FieldList.get(i);
            var VarType = FieldInfo.Type;
            var VarName = FieldInfo.NativeName;
            Program += this.GetIndentString() + this.LocalTypeName(VarType) + " " + VarName + ";" + this.LineFeed;
            i = i + 1;
        }
        this.UnIndent();
        Program += this.GetIndentString() + "};" + this.LineFeed;
        Program += this.GetIndentString() + LocalType + " NEW_" + TypeName + "() {" + this.LineFeed;
        this.Indent();
        i = 0;
        Program += this.GetIndentString() + LocalType + " " + this.GetRecvName() + " = " + "GT_New(" + LocalType + ");" + this.LineFeed;
        while (i < ClassField.FieldList.size()) {
            var FieldInfo = ClassField.FieldList.get(i);
            var VarName = FieldInfo.NativeName;
            var InitValue = this.StringifyConstValue(FieldInfo.InitValue);
            if (!FieldInfo.Type.IsNative()) {
                InitValue = this.NullLiteral;
            }
            Program += this.GetIndentString() + this.GetRecvName() + "->" + VarName + " = " + InitValue + ";" + this.LineFeed;
            i = i + 1;
        }
        Program += this.GetIndentString() + "return " + this.GetRecvName() + ";" + this.LineFeed;
        this.UnIndent();
        Program += this.GetIndentString() + "};";

        this.WriteLineCode(Program);
    };

    CSourceGenerator.prototype.StartCompilationUnit = function () {
        this.WriteLineCode("#include \"GreenTeaPlus.h\"");
    };

    CSourceGenerator.prototype.GetRecvName = function () {
        return "self";
    };
    return CSourceGenerator;
})(SourceGenerator);
