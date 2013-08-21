var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var BashSourceGenerator = (function (_super) {
    __extends(BashSourceGenerator, _super);
    function BashSourceGenerator(TargetCode, OutputFile, GeneratorFlag) {
        _super.call(this, TargetCode, OutputFile, GeneratorFlag);
        this.inFunc = false;
        this.inMainFunc = false;
        this.cmdCounter = 0;
        this.TrueLiteral = "0";
        this.FalseLiteral = "1";
        this.NullLiteral = "NULL";
    }
    BashSourceGenerator.prototype.InitContext = function (Context) {
        _super.prototype.InitContext.call(this, Context);
        this.WriteLineHeader("#!/bin/bash");
        this.WriteLineCode(this.LineFeed + "source $GREENTEA_HOME/include/bash/GreenTeaPlus.sh" + this.LineFeed);
    };

    BashSourceGenerator.prototype.IsEmptyNode = function (Node) {
        return (Node == null || Node instanceof EmptyNode);
    };

    BashSourceGenerator.prototype.VisitBlockWithIndent = function (Node, inBlock, allowDummyBlock) {
        var Code = "";
        if (inBlock) {
            this.Indent();
        }
        var CurrentNode = Node;
        if (this.IsEmptyNode(Node) && allowDummyBlock) {
            Code += this.GetIndentString() + "echo \"dummy block!!\" &> /dev/zero" + this.LineFeed;
        }
        while (!this.IsEmptyNode(CurrentNode)) {
            var poppedCode = this.VisitNode(CurrentNode);
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

    BashSourceGenerator.prototype.CreateDoWhileNode = function (Type, ParsedTree, Cond, Block) {
        var Break = this.CreateBreakNode(Type, ParsedTree, null);
        var IfBlock = this.CreateIfNode(Type, ParsedTree, Cond, Break, null);
        LinkNode(IfBlock, Block);
        var TrueNode = this.CreateConstNode(ParsedTree.NameSpace.Context.BooleanType, ParsedTree, true);
        return this.CreateWhileNode(Type, ParsedTree, TrueNode, Block);
    };

    BashSourceGenerator.prototype.ResolveCondition = function (Node) {
        if (!Node.Type.equals(Node.Type.Context.BooleanType)) {
            LibGreenTea.DebugP("invalid condition type");
            return null;
        }

        if (Node instanceof ConstNode) {
            var Const = Node;
            if (Const.ConstValue.equals(true)) {
                return "true";
            }
            return "false";
        }
        return this.VisitNode(Node);
    };

    BashSourceGenerator.prototype.VisitWhileNode = function (Node) {
        var Program = "while " + this.ResolveCondition(Node.CondExpr) + " ;do" + this.LineFeed;
        Program += this.VisitBlockWithIndent(Node.LoopBody, true, true) + "done";
        this.PushSourceCode(Program);
    };

    BashSourceGenerator.prototype.VisitForNode = function (Node) {
        var Cond = this.ResolveCondition(Node.CondExpr);
        var Iter = this.VisitNode(Node.IterExpr);
        var Program = "for((; " + Cond + "; " + Iter + " )) ;do" + this.LineFeed;
        Program += this.VisitBlockWithIndent(Node.LoopBody, true, true) + "done";
        this.PushSourceCode(Program);
    };

    BashSourceGenerator.prototype.VisitForEachNode = function (Node) {
        var Variable = this.VisitNode(Node.Variable);
        var Iter = this.VisitNode(Node.IterExpr);
        var Program = "for " + Variable + " in " + "${" + Iter + "[@]} ;do" + this.LineFeed;
        Program += this.VisitBlockWithIndent(Node.LoopBody, true, true) + "done";
        this.PushSourceCode(Program);
    };

    BashSourceGenerator.prototype.MakeParamCode = function (ParamList) {
        var Size = ListSize(ParamList);
        var ParamCode = new Array(Size - 1);
        var i = 1;
        while (i < Size) {
            var Node = ParamList.get(i);
            ParamCode[i - 1] = this.ResolveValueType(Node);
            i = i + 1;
        }
        return ParamCode;
    };

    BashSourceGenerator.prototype.CreateAssertFunc = function (Node) {
        var ParamList = Node.Params;
        var Size = ListSize(ParamList);
        var ParamCode = new Array(Size - 1);
        var i = 1;
        while (i < Size) {
            var Param = this.VisitNode(ParamList.get(i));
            if (ParamList.get(i) instanceof ConstNode) {
                var Const = ParamList.get(i);
                if (Const.Type.equals(Const.Type.Context.BooleanType)) {
                    if (Const.ConstValue.equals(true)) {
                        Param = "true";
                    } else {
                        Param = "false";
                    }
                }
            }
            ParamCode[i - 1] = "\"" + Param + "\"";
            i = i + 1;
        }
        return this.JoinCode("assert ", 0, ParamCode, "", " ");
    };

    BashSourceGenerator.prototype.VisitApplyNode = function (Node) {
        var ParamCode = this.MakeParamCode(Node.Params);
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

    BashSourceGenerator.prototype.VisitBinaryNode = function (Node) {
        var FuncName = Node.Token.ParsedText;
        var Left = this.ResolveValueType(Node.LeftNode);
        var Right = this.ResolveValueType(Node.RightNode);
        this.PushSourceCode(SourceGenerator.GenerateApplyFunc2(Node.Func, FuncName, Left, Right));
    };

    BashSourceGenerator.prototype.VisitAndNode = function (Node) {
        this.PushSourceCode("(" + this.ResolveCondition(Node.LeftNode) + " && " + this.ResolveCondition(Node.RightNode) + ")");
    };

    BashSourceGenerator.prototype.VisitOrNode = function (Node) {
        this.PushSourceCode("(" + this.ResolveCondition(Node.LeftNode) + " || " + this.ResolveCondition(Node.RightNode) + ")");
    };

    BashSourceGenerator.prototype.VisitAssignNode = function (Node) {
        var Left = this.VisitNode(Node.LeftNode);
        var Right = this.ResolveValueType(Node.RightNode);
        var Head = "";
        if (Node.LeftNode instanceof GetterNode) {
            Head = "eval ";
        }
        this.PushSourceCode(Head + Left + "=" + Right);
    };

    BashSourceGenerator.prototype.VisitLetNode = function (Node) {
        var VarName = Node.VariableName;
        var Code = "";
        var Head = "";
        if (this.inFunc) {
            Code += "local " + VarName + this.LineFeed + this.GetIndentString();
        }

        if (Node.InitNode != null && Node.InitNode instanceof GetterNode) {
            Head = "eval ";
        }
        Code += Head + VarName;
        if (Node.InitNode != null) {
            Code += "=" + this.ResolveValueType(Node.InitNode);
        }
        Code += this.LineFeed;
        this.PushSourceCode(Code + this.VisitBlockWithIndent(Node.BlockNode, false, false));
    };

    BashSourceGenerator.prototype.VisitIfNode = function (Node) {
        var CondExpr = this.ResolveCondition(Node.CondExpr);
        var ThenBlock = this.VisitBlockWithIndent(Node.ThenNode, true, true);
        var ElseBlock = this.VisitBlockWithIndent(Node.ElseNode, true, false);
        var Code = "if " + CondExpr + " ;then" + this.LineFeed + ThenBlock;
        if (!this.IsEmptyNode(Node.ElseNode)) {
            Code += "else" + this.LineFeed + ElseBlock;
        }
        Code += "fi";
        this.PushSourceCode(Code);
    };

    BashSourceGenerator.prototype.VisitReturnNode = function (Node) {
        if (!this.inFunc) {
            return;
        }

        if (Node.Expr != null) {
            var Ret = this.ResolveValueType(Node.Expr);
            if (Node.Type.equals(Node.Type.Context.BooleanType) || (Node.Type.equals(Node.Type.Context.IntType) && this.inMainFunc)) {
                this.PushSourceCode("return " + Ret + this.LineFeed);
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
        Code += "\"" + Catch + "\" ERR" + this.LineFeed;
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
    };

    BashSourceGenerator.prototype.VisitCommandNode = function (Node) {
        var Code = "";
        var count = 0;
        var CurrentNode = Node;
        while (CurrentNode != null) {
            if (count > 0) {
                Code += " | ";
            }
            Code += this.AppendCommand(CurrentNode);
            count += 1;
            CurrentNode = CurrentNode.PipedNextNode;
        }
        this.PushSourceCode(this.CreateCommandFunc(Code, Node.Type));
    };

    BashSourceGenerator.prototype.AppendCommand = function (CurrentNode) {
        var Code = "";
        var size = CurrentNode.Params.size();
        var i = 0;
        while (i < size) {
            Code += this.ResolveValueType(CurrentNode.Params.get(i)) + " ";
            i = i + 1;
        }
        return Code;
    };

    BashSourceGenerator.prototype.CreateCommandFunc = function (cmd, Type) {
        var FuncName = "execCmd";
        var RunnableCmd = cmd;
        if (Type.equals(Type.Context.StringType)) {
            RunnableCmd = FuncName + this.cmdCounter + "() {" + this.LineFeed;
            RunnableCmd += this.GetIndentString() + "echo $(" + cmd + ")" + this.LineFeed;
            RunnableCmd += this.GetIndentString() + "return 0" + this.LineFeed + "}" + this.LineFeed;
            this.WriteLineCode(RunnableCmd);
            RunnableCmd = FuncName + this.cmdCounter;
            this.cmdCounter++;
        } else if (Type.equals(Type.Context.BooleanType)) {
            RunnableCmd = FuncName + this.cmdCounter + "() {" + this.LineFeed;
            RunnableCmd += this.GetIndentString() + cmd + " >&2" + this.LineFeed;
            RunnableCmd += this.GetIndentString() + "return $?" + this.LineFeed + "}" + this.LineFeed;
            this.WriteLineCode(RunnableCmd);
            RunnableCmd = FuncName + this.cmdCounter;
            this.cmdCounter++;
        }
        return RunnableCmd;
    };

    BashSourceGenerator.prototype.ResolveParamName = function (ParamNameList, Body) {
        return this.ConvertParamName(ParamNameList, Body, 0);
    };

    BashSourceGenerator.prototype.ConvertParamName = function (ParamNameList, Body, index) {
        if (ParamNameList == null || index == ParamNameList.size()) {
            return Body;
        }

        var oldVarNode = new LocalNode(null, null, "" + (index + 1));
        var Let = new LetNode(null, null, null, ParamNameList.get(index), oldVarNode, null);
        Let.NextNode = this.ConvertParamName(ParamNameList, Body, index + 1);
        return Let;
    };

    BashSourceGenerator.prototype.ResolveValueType = function (TargetNode) {
        var ResolvedValue;
        var Value = this.VisitNode(TargetNode);
        var Head = "";
        var Tail = "";

        if (TargetNode.Type != null && TargetNode.Type.equals(TargetNode.Type.Context.BooleanType)) {
            if (TargetNode instanceof ApplyNode || TargetNode instanceof UnaryNode || TargetNode instanceof CommandNode || TargetNode instanceof BinaryNode) {
                return "$(retBool \"" + Value + "\")";
            }
        }

        if (TargetNode instanceof ConstNode || TargetNode instanceof NullNode) {
            return Value;
        } else if (TargetNode instanceof IndexerNode || TargetNode instanceof GetterNode) {
            ResolvedValue = "${" + Value + "}";
        } else if (TargetNode instanceof ApplyNode || TargetNode instanceof CommandNode) {
            ResolvedValue = "$(" + Value + ")";
        } else {
            ResolvedValue = "$" + Value;
        }
        if (TargetNode.Type != null) {
            if (TargetNode.Type.equals(TargetNode.Type.Context.StringType)) {
                Head = "\"";
                Tail = "\"";
            }
        }
        return Head + ResolvedValue + Tail;
    };

    BashSourceGenerator.prototype.GenerateFunc = function (Func, ParamNameList, Body) {
        var Function = "";
        var FuncName = Func.GetNativeFuncName();
        this.inFunc = true;
        if (LibGreenTea.EqualsString(FuncName, "main")) {
            this.inMainFunc = true;
        }
        Function += FuncName + "() {" + this.LineFeed;
        var Block = this.VisitBlockWithIndent(this.ResolveParamName(ParamNameList, Body), true, true);
        Function += Block + "}" + this.LineFeed;
        this.WriteLineCode(Function);
        this.inFunc = false;
        this.inMainFunc = false;
    };

    BashSourceGenerator.prototype.Eval = function (Node) {
        var Code = this.VisitBlockWithIndent(Node, false, false);
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
