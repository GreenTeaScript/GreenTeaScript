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
var BashSourceGenerator = (function (_super) {
    __extends(BashSourceGenerator, _super);
    function BashSourceGenerator(TargetCode, OutputFile, GeneratorFlag) {
        _super.call(this, TargetCode, OutputFile, GeneratorFlag);
        this.inFunc = false;
        this.inMainFunc = false;
        this.TrueLiteral = "0";
        this.FalseLiteral = "1";
        this.NullLiteral = this.Quote("__NULL__");
        this.MemberAccessOperator = "__MEMBER__";
        this.LineComment = "##";
    }
    BashSourceGenerator.prototype.InitContext = function (Context) {
        _super.prototype.InitContext.call(this, Context);
        this.WriteLineHeader("#!/bin/bash");
        this.WriteLineCode(this.LineFeed + "source $GREENTEA_HOME/include/bash/GreenTeaPlus.sh" + this.LineFeed);
    };

    BashSourceGenerator.prototype.GenerateFuncTemplate = function (ParamSize, Func) {
        var BeginIdx = 1;
        var Template = "";
        var IsNative = false;
        if (Func == null) {
            Template = "$1";
            BeginIdx = 2;
        } else if (Func.Is(NativeFunc)) {
            Template = "$1" + this.MemberAccessOperator + Func.FuncName;
            BeginIdx = 2;
        } else if (Func.Is(NativeMacroFunc)) {
            Template = Func.GetNativeMacro();
            IsNative = true;
        } else {
            Template = Func.GetNativeFuncName();
        }
        var i = BeginIdx;
        if (IsNative == false) {
            while (i < ParamSize) {
                Template += " $" + i;
                i = i + 1;
            }
        }
        return Template;
    };

    BashSourceGenerator.prototype.VisitBlockWithIndent = function (Node, allowDummyBlock) {
        return this.VisitBlockWithOption(Node, true, allowDummyBlock, false);
    };

    BashSourceGenerator.prototype.VisitBlockWithSkipJump = function (Node, allowDummyBlock) {
        return this.VisitBlockWithOption(Node, true, allowDummyBlock, true);
    };

    BashSourceGenerator.prototype.VisitBlockWithoutIndent = function (Node, allowDummyBlock) {
        return this.VisitBlockWithOption(Node, false, allowDummyBlock, false);
    };

    BashSourceGenerator.prototype.VisitBlockWithOption = function (Node, inBlock, allowDummyBlock, skipJump) {
        var Code = "";
        if (inBlock) {
            this.Indent();
        }
        var CurrentNode = Node;
        if (this.IsEmptyBlock(Node) && allowDummyBlock) {
            Code += this.GetIndentString() + "echo \"dummy block!!\" &> /dev/zero" + this.LineFeed;
        }
        while (!this.IsEmptyBlock(CurrentNode)) {
            var poppedCode = this.VisitNode(CurrentNode);
            if (skipJump && (CurrentNode instanceof BreakNode || CurrentNode instanceof ContinueNode)) {
                poppedCode = "echo \"skipcode: jump\" $> /dev/zero";
            }
            if (!LibGreenTea.EqualsString(poppedCode, "")) {
                Code += this.GetIndentString() + poppedCode + this.LineFeed;
            }
            CurrentNode = CurrentNode.NextNode;
        }
        if (inBlock) {
            this.UnIndent();
            Code += this.GetIndentString();
        } else {
            if (Code.length > 0) {
                Code = Code.substring(0, Code.length - 1);
            }
        }
        return Code;
    };

    BashSourceGenerator.prototype.Quote = function (Value) {
        return "\"" + Value + "\"";
    };

    BashSourceGenerator.prototype.CreateDoWhileNode = function (Type, ParsedTree, Cond, Block) {
        /*
        * do { Block } while(Cond)
        * => while(True) { Block; if(Cond) { break; } }
        */
        var Break = this.CreateBreakNode(Type, ParsedTree, null);
        var IfBlock = this.CreateIfNode(Type, ParsedTree, Cond, Break, null);
        LinkNode(IfBlock, Block);
        var TrueNode = this.CreateConstNode(ParsedTree.NameSpace.Context.BooleanType, ParsedTree, true);
        return this.CreateWhileNode(Type, ParsedTree, TrueNode, Block);
    };

    BashSourceGenerator.prototype.ResolveCondition = function (Node) {
        var Cond = this.VisitNode(Node);
        if (LibGreenTea.EqualsString(Cond, "0")) {
            Cond = "((1 == 1))";
        } else if (LibGreenTea.EqualsString(Cond, "1")) {
            Cond = "((1 != 1))";
        }
        return Cond;
    };

    BashSourceGenerator.prototype.VisitWhileNode = function (Node) {
        var Program = "while " + this.ResolveCondition(Node.CondExpr) + " ;do" + this.LineFeed;
        Program += this.VisitBlockWithIndent(Node.LoopBody, true) + "done";
        this.PushSourceCode(Program);
    };

    BashSourceGenerator.prototype.VisitForNode = function (Node) {
        var Cond = this.ResolveCondition(Node.CondExpr);
        var Iter = this.VisitNode(Node.IterExpr);
        var Program = "for((; " + Cond + "; " + Iter + " )) ;do" + this.LineFeed;
        Program += this.VisitBlockWithIndent(Node.LoopBody, true) + "done";
        this.PushSourceCode(Program);
    };

    BashSourceGenerator.prototype.VisitForEachNode = function (Node) {
        var Variable = this.VisitNode(Node.Variable);
        var Iter = this.VisitNode(Node.IterExpr);
        var Program = "for " + Variable + " in " + "${" + Iter + "[@]} ;do" + this.LineFeed;
        Program += this.VisitBlockWithIndent(Node.LoopBody, true) + "done";
        this.PushSourceCode(Program);
    };

    BashSourceGenerator.prototype.MakeParamCode = function (ParamList) {
        var Size = LibGreenTea.ListSize(ParamList);
        var ParamCode = new Array(Size - 1);
        var i = 1;
        while (i < Size) {
            ParamCode[i - 1] = this.ResolveValueType(ParamList.get(i), false);
            i = i + 1;
        }
        return ParamCode;
    };

    BashSourceGenerator.prototype.CreateAssertFunc = function (Node) {
        var ParamNode = Node.NodeList.get(1);
        return "assert " + this.Quote(this.ResolveCondition(ParamNode));
    };

    BashSourceGenerator.prototype.VisitApplyNode = function (Node) {
        var ParamCode = this.MakeParamCode(Node.NodeList);
        if (Node.Func == null) {
            this.PushSourceCode(this.JoinCode(ParamCode[0] + " ", 0, ParamCode, "", " "));
        } else if (Node.Func.Is(NativeMacroFunc)) {
            var NativeMacro = Node.Func.GetNativeMacro();
            if (LibGreenTea.EqualsString(NativeMacro, "assert $1")) {
                this.PushSourceCode(this.CreateAssertFunc(Node));
                return;
            }
            this.PushSourceCode(Node.Func.ApplyNativeMacro(0, ParamCode));
        } else {
            this.PushSourceCode(this.JoinCode(Node.Func.GetNativeFuncName() + " ", 0, ParamCode, "", " "));
        }
    };

    BashSourceGenerator.prototype.VisitUnaryNode = function (Node) {
        var FuncName = Node.Token.ParsedText;
        var Func = Node.Func;
        var Expr = this.ResolveValueType(Node.Expr, false);
        var Macro = null;
        if (Func != null) {
            FuncName = Func.GetNativeFuncName();
            if (IsFlag(Func.FuncFlag, NativeMacroFunc)) {
                Macro = Func.GetNativeMacro();
            }
        }
        if (Macro == null) {
            Macro = "((" + FuncName + " $1))";
        }
        this.PushSourceCode(Macro.replace("$1", Expr));
    };

    BashSourceGenerator.prototype.VisitBinaryNode = function (Node) {
        var FuncName = Node.Token.ParsedText;
        var Func = Node.Func;
        var Left = this.ResolveValueType(Node.LeftNode, false);
        var Right = this.ResolveValueType(Node.RightNode, false);
        var Macro = null;
        if (Func != null) {
            FuncName = Func.GetNativeFuncName();
            if (IsFlag(Func.FuncFlag, NativeMacroFunc)) {
                Macro = Func.GetNativeMacro();
            }
        }
        if (Macro == null) {
            Macro = "(($1 " + FuncName + " $2))";
        }
        this.PushSourceCode(Macro.replace("$1", Left).replace("$2", Right));
    };

    BashSourceGenerator.prototype.GetMemberIndex = function (ClassType, MemberName) {
        return "$" + ClassType.ShortClassName + this.MemberAccessOperator + MemberName;
    };

    BashSourceGenerator.prototype.IsNativeType = function (Type) {
        if (Type != null && Type.IsNative()) {
            return true;
        }
        return false;
    };

    BashSourceGenerator.prototype.VisitGetterNode = function (Node) {
        this.PushSourceCode(this.VisitNode(Node.Expr) + "[" + this.GetMemberIndex(Node.Expr.Type, Node.Func.FuncName) + "]");
    };

    BashSourceGenerator.prototype.VisitIndexerNode = function (Node) {
        this.PushSourceCode(this.VisitNode(Node.Expr) + "[" + this.ResolveValueType(Node.GetAt(0), false) + "]");
    };

    BashSourceGenerator.prototype.VisitAndNode = function (Node) {
        this.PushSourceCode("(" + this.ResolveCondition(Node.LeftNode) + " && " + this.ResolveCondition(Node.RightNode) + ")");
    };

    BashSourceGenerator.prototype.VisitOrNode = function (Node) {
        this.PushSourceCode("(" + this.ResolveCondition(Node.LeftNode) + " || " + this.ResolveCondition(Node.RightNode) + ")");
    };

    BashSourceGenerator.prototype.VisitAssignNode = function (Node) {
        this.PushSourceCode(this.VisitNode(Node.LeftNode) + "=" + this.ResolveValueType(Node.RightNode, true));
    };

    BashSourceGenerator.prototype.VisitVarNode = function (Node) {
        var VarName = Node.NativeName;
        var Declare = "declare ";
        var Option = "";
        if (this.inFunc) {
            Declare = "local ";
        }
        if (this.IsNativeType(Node.DeclType)) {
            Option = "-a ";
        }

        var Code = Declare + Option + VarName + this.LineFeed;
        Code += this.GetIndentString() + VarName;
        if (Node.InitNode != null) {
            Code += "=" + this.ResolveValueType(Node.InitNode, true);
        }
        Code += this.LineFeed;
        this.PushSourceCode(Code + this.VisitBlockWithoutIndent(Node.BlockNode, false));
    };

    BashSourceGenerator.prototype.VisitTrinaryNode = function (Node) {
        var CondExpr = this.ResolveCondition(Node.CondExpr);
        var Then = this.ResolveValueType(Node.ThenExpr, false);
        var Else = this.ResolveValueType(Node.ElseExpr, false);
        this.PushSourceCode("((" + CondExpr + " ? " + Then + " : " + Else + "))");
    };

    BashSourceGenerator.prototype.VisitIfNode = function (Node) {
        var CondExpr = this.ResolveCondition(Node.CondExpr);
        var ThenBlock = this.VisitBlockWithIndent(Node.ThenNode, true);
        var Code = "if " + CondExpr + " ;then" + this.LineFeed + ThenBlock;
        if (!this.IsEmptyBlock(Node.ElseNode)) {
            Code += "else" + this.LineFeed + this.VisitBlockWithIndent(Node.ElseNode, false);
        }
        Code += "fi";
        this.PushSourceCode(Code);
    };

    BashSourceGenerator.prototype.VisitSwitchNode = function (Node) {
        var Code = "case " + this.ResolveValueType(Node.MatchNode, false) + " in";
        var i = 0;
        while (i < Node.CaseList.size()) {
            var Case = Node.CaseList.get(i);
            var Block = Node.CaseList.get(i + 1);
            Code += this.LineFeed + this.GetIndentString() + this.VisitNode(Case) + ")" + this.LineFeed;
            Code += this.VisitBlockWithSkipJump(Block, true) + ";;";
            i = i + 2;
        }
        if (Node.DefaultBlock != null) {
            Code += this.LineFeed + this.GetIndentString() + "*)" + this.LineFeed;
            Code += this.VisitBlockWithSkipJump(Node.DefaultBlock, false) + ";;";
        }
        Code += this.LineFeed + this.GetIndentString() + "esac";
        this.PushSourceCode(Code);
    };

    BashSourceGenerator.prototype.VisitReturnNode = function (Node) {
        if (!this.inFunc) {
            return;
        }

        if (Node.Expr != null) {
            var Ret = this.ResolveValueType(Node.Expr, false);
            if (Node.Type.equals(Node.Type.Context.BooleanType) || (Node.Type.equals(Node.Type.Context.IntType) && this.inMainFunc)) {
                this.PushSourceCode("return " + Ret);
                return;
            }
            this.PushSourceCode("echo " + Ret + this.LineFeed + this.GetIndentString() + "return 0");
            return;
        }
        this.PushSourceCode("return 0");
    };

    BashSourceGenerator.prototype.VisitTryNode = function (Node) {
        var TrueNode = new ConstNode(Node.Type.Context.BooleanType, null, true);
        var Code = "trap ";
        var Try = this.VisitNode(new IfNode(null, null, TrueNode, Node.TryBlock, null));
        var Catch = this.VisitNode(new IfNode(null, null, TrueNode, Node.CatchBlock, null));
        Code += this.Quote(Catch) + " ERR" + this.LineFeed;
        Code += this.GetIndentString() + Try + this.LineFeed + this.GetIndentString() + "trap ERR";
        if (Node.FinallyBlock != null) {
            var Finally = this.VisitNode(new IfNode(null, null, TrueNode, Node.FinallyBlock, null));
            Code += this.LineFeed + this.GetIndentString() + Finally;
        }
        this.PushSourceCode(Code);
    };

    BashSourceGenerator.prototype.VisitThrowNode = function (Node) {
        this.PushSourceCode("kill &> /dev/zero");
    };

    BashSourceGenerator.prototype.VisitErrorNode = function (Node) {
        this.PushSourceCode("echo " + this.Quote(Node.Token.ParsedText) + " >&2");
    };

    BashSourceGenerator.prototype.VisitCommandNode = function (Node) {
        var Code = "";
        var Type = Node.Type;
        var CurrentNode = Node;
        while (CurrentNode != null) {
            Code += this.AppendCommand(CurrentNode);
            CurrentNode = CurrentNode.PipedNextNode;
        }

        if (Type.equals(Type.Context.StringType)) {
            Code = "execCommadString " + this.Quote(Code);
        } else if (Type.equals(Type.Context.BooleanType)) {
            Code = "execCommadBool " + this.Quote(Code);
        }
        this.PushSourceCode(Code);
    };

    BashSourceGenerator.prototype.AppendCommand = function (CurrentNode) {
        var Code = "";
        var size = CurrentNode.Params.size();
        var i = 0;
        while (i < size) {
            Code += this.ResolveValueType(CurrentNode.Params.get(i), false) + " ";
            i = i + 1;
        }
        return Code;
    };

    BashSourceGenerator.prototype.ResolveParamName = function (Func, ParamNameList, Body) {
        return this.ConvertParamName(Func, ParamNameList, Body, 0);
    };

    BashSourceGenerator.prototype.ConvertParamName = function (Func, ParamNameList, Body, index) {
        if (ParamNameList == null || index == ParamNameList.size()) {
            return Body;
        }

        var ParamType = Func.GetFuncParamType(index);
        var oldVarNode = new LocalNode(ParamType, null, "" + (index + 1));
        var Let = new VarNode(null, null, ParamType, ParamNameList.get(index), oldVarNode, null);
        index += 1;
        Let.NextNode = this.ConvertParamName(Func, ParamNameList, Body, index);
        return Let;
    };

    BashSourceGenerator.prototype.CheckConstFolding = function (TargetNode) {
        if (TargetNode instanceof ConstNode) {
            return true;
        } else if (TargetNode instanceof UnaryNode) {
            var Unary = TargetNode;
            return this.CheckConstFolding(Unary.Expr);
        } else if (TargetNode instanceof BinaryNode) {
            var Binary = TargetNode;
            if (this.CheckConstFolding(Binary.LeftNode) && this.CheckConstFolding(Binary.RightNode)) {
                return true;
            }
        }
        return false;
    };

    BashSourceGenerator.prototype.ResolveValueType = function (TargetNode, isAssign) {
        var ResolvedValue;
        var Value = this.VisitNode(TargetNode);
        var Type = TargetNode.Type;

        if (this.CheckConstFolding(TargetNode)) {
            return Value;
        }

        if (Type != null && Type.equals(Type.Context.BooleanType)) {
            if (TargetNode instanceof ApplyNode || TargetNode instanceof UnaryNode || TargetNode instanceof CommandNode || TargetNode instanceof BinaryNode) {
                return "$(valueOfBool " + this.Quote(Value) + ")";
            }
        }

        if (TargetNode instanceof ConstNode || TargetNode instanceof NullNode) {
            return Value;
        } else if (TargetNode instanceof IndexerNode || TargetNode instanceof GetterNode) {
            ResolvedValue = "${" + Value + "}";
        } else if (TargetNode instanceof ApplyNode || TargetNode instanceof CommandNode || TargetNode instanceof NewNode) {
            ResolvedValue = "$(" + Value + ")";
        } else if (TargetNode instanceof LocalNode && !this.IsNativeType(Type)) {
            var Local = TargetNode;
            var Name = Local.NativeName;
            ResolvedValue = "${" + Value + "[@]}";
            if (Name.length == 1 && LibGreenTea.IsDigit(Name, 0)) {
                ResolvedValue = "$" + Value;
            }
        } else {
            ResolvedValue = "$" + Value;
        }

        if (isAssign) {
            if (!this.IsNativeType(Type)) {
                ResolvedValue = "(" + ResolvedValue + ")";
                return ResolvedValue;
            }
        }

        if (Type != null) {
            if (Type.equals(Type.Context.StringType) || !this.IsNativeType(Type)) {
                ResolvedValue = this.Quote(ResolvedValue);
            }
        }
        return ResolvedValue;
    };

    BashSourceGenerator.prototype.GenerateFunc = function (Func, ParamNameList, Body) {
        this.FlushErrorReport();
        var Function = "";
        var FuncName = Func.GetNativeFuncName();
        this.inFunc = true;
        if (LibGreenTea.EqualsString(FuncName, "main")) {
            this.inMainFunc = true;
        }
        Function += FuncName + "() {" + this.LineFeed;
        var Block = this.VisitBlockWithIndent(this.ResolveParamName(Func, ParamNameList, Body), true);
        Function += Block + "}" + this.LineFeed;
        this.WriteLineCode(Function);
        this.inFunc = false;
        this.inMainFunc = false;
    };

    BashSourceGenerator.prototype.GetNewOperator = function (Type) {
        return this.Quote("$(__NEW__" + Type.ShortClassName + ")");
    };

    BashSourceGenerator.prototype.GenerateClassField = function (Type, ClassField) {
        var Program = "__NEW__" + Type.ShortClassName + "() {" + this.LineFeed;
        this.WriteLineCode("#### define class " + Type.ShortClassName + " ####");
        this.Indent();
        Program += this.GetIndentString() + "local -a " + this.GetRecvName() + this.LineFeed;

        var i = 0;
        while (i < ClassField.FieldList.size()) {
            var FieldInfo = ClassField.FieldList.get(i);
            var InitValue = this.StringifyConstValue(FieldInfo.InitValue);
            if (!FieldInfo.Type.IsNative()) {
                InitValue = "NULL";
            }
            this.WriteLineCode(Type.ShortClassName + this.MemberAccessOperator + FieldInfo.NativeName + "=" + i);

            Program += this.GetIndentString() + this.GetRecvName();
            Program += "[" + this.GetMemberIndex(Type, FieldInfo.NativeName) + "]=" + InitValue + this.LineFeed;
            i = i + 1;
        }
        Program += this.GetIndentString() + "echo ";
        Program += this.Quote("${" + this.GetRecvName() + "[@]}") + this.LineFeed;
        this.UnIndent();
        Program += "}";

        this.WriteLineCode("\n" + Program);
    };

    BashSourceGenerator.prototype.Eval = function (Node) {
        var Code = this.VisitBlockWithoutIndent(Node, false);
        if (!LibGreenTea.EqualsString(Code, "")) {
            this.WriteLineCode(Code);
        }
        return Code;
    };

    BashSourceGenerator.prototype.InvokeMainFunc = function (MainFuncName) {
        this.WriteLineCode(MainFuncName);
    };
    return BashSourceGenerator;
})(SourceGenerator);
