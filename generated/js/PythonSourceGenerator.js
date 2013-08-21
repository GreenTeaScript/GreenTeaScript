var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var PythonSourceGenerator = (function (_super) {
    __extends(PythonSourceGenerator, _super);
    function PythonSourceGenerator(TargetCode, OutputFile, GeneratorFlag) {
        _super.call(this, TargetCode, OutputFile, GeneratorFlag);
        this.Tab = "    ";
        this.LogicalAndOperator = "and";
        this.LogicalOrOperator = "or";
        this.TrueLiteral = "True";
        this.FalseLiteral = "False";
        this.NullLiteral = "None";
    }
    PythonSourceGenerator.prototype.GetNewOperator = function (Type) {
        var TypeName = Type.ShortClassName;
        return TypeName + "()";
    };

    PythonSourceGenerator.prototype.VisitBlockWithIndent = function (Node, inBlock) {
        var Code = "";
        if (inBlock) {
            this.Indent();
        }
        var CurrentNode = Node;
        while (CurrentNode != null) {
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

    PythonSourceGenerator.prototype.CreateDoWhileNode = function (Type, ParsedTree, Cond, Block) {
        var Break = this.CreateBreakNode(Type, ParsedTree, null);
        var IfBlock = this.CreateIfNode(Type, ParsedTree, Cond, Break, null);
        LinkNode(IfBlock, Block);
        var TrueNode = this.CreateConstNode(ParsedTree.NameSpace.Context.BooleanType, ParsedTree, true);
        return this.CreateWhileNode(Type, ParsedTree, TrueNode, Block);
    };

    PythonSourceGenerator.prototype.IsEmptyBlock = function (Node) {
        return (Node instanceof EmptyNode) && Node.NextNode == null;
    };

    PythonSourceGenerator.prototype.VisitWhileNode = function (Node) {
        var Program = "while " + this.VisitNode(Node.CondExpr) + ":" + this.LineFeed;
        if (this.IsEmptyBlock(Node.LoopBody)) {
            Program += this.GetIndentString() + "pass";
        } else {
            Program += this.VisitBlockWithIndent(Node.LoopBody, true);
        }
        this.PushSourceCode(Program);
    };

    PythonSourceGenerator.prototype.VisitForNode = function (Node) {
        Node.LoopBody.MoveTailNode().NextNode = Node.IterExpr;
        var NewLoopBody = Node.LoopBody;
        var NewNode = new WhileNode(Node.Type, Node.Token, Node.CondExpr, NewLoopBody);
        this.VisitWhileNode(NewNode);
    };

    PythonSourceGenerator.prototype.VisitForEachNode = function (Node) {
        var Iter = this.VisitNode(Node.IterExpr);
        var Variable = this.VisitNode(Node.Variable);
        var Program = "for " + Variable + " in " + Iter + ":" + this.LineFeed;
        Program += this.VisitBlockWithIndent(Node.LoopBody, true);
        this.PushSourceCode(Program);
    };

    PythonSourceGenerator.prototype.VisitSuffixNode = function (Node) {
        var FuncName = Node.Token.ParsedText;
        var Expr = this.VisitNode(Node.Expr);
        if (LibGreenTea.EqualsString(FuncName, "++")) {
            FuncName = " += 1";
        } else if (LibGreenTea.EqualsString(FuncName, "--")) {
            FuncName = " -= 1";
        } else {
            LibGreenTea.DebugP(FuncName + " is not supported suffix operator!!");
        }
        this.PushSourceCode("(" + SourceGenerator.GenerateApplyFunc1(null, FuncName, true, Expr) + ")");
    };

    PythonSourceGenerator.prototype.VisitLetNode = function (Node) {
        var Code = Node.VariableName;
        var InitValue = this.NullLiteral;
        if (Node.InitNode != null) {
            InitValue = this.VisitNode(Node.InitNode);
        }
        Code += " = " + InitValue + this.LineFeed;
        this.PushSourceCode(Code + this.VisitBlockWithIndent(Node.BlockNode, false));
    };

    PythonSourceGenerator.prototype.VisitIfNode = function (Node) {
        var CondExpr = this.VisitNode(Node.CondExpr);
        var ThenBlock = this.VisitBlockWithIndent(Node.ThenNode, true);
        var Code = "if " + CondExpr + ":" + this.LineFeed + ThenBlock;
        if (this.IsEmptyBlock(Node.ThenNode)) {
            Code += this.GetIndentString() + "pass" + this.LineFeed + this.GetIndentString();
        }

        if (Node.ElseNode != null && !this.IsEmptyBlock(Node.ElseNode)) {
            var ElseBlock = this.VisitBlockWithIndent(Node.ElseNode, true);
            Code += "else:" + this.LineFeed + ElseBlock;
        }
        this.PushSourceCode(Code);
    };

    PythonSourceGenerator.prototype.VisitTryNode = function (Node) {
        var Code = "try:" + this.LineFeed;
        Code += this.VisitBlockWithIndent(Node.TryBlock, true);
        var Val = Node.CatchExpr;
        Code += "except " + Val.Type.toString() + ", " + Val.VariableName + ":" + this.LineFeed;
        Code += this.VisitBlockWithIndent(Node.CatchBlock, true);
        if (Node.FinallyBlock != null) {
            var Finally = this.VisitBlockWithIndent(Node.FinallyBlock, true);
            Code += "finally:" + this.LineFeed + Finally;
        }
        this.PushSourceCode(Code);
    };

    PythonSourceGenerator.prototype.VisitThrowNode = function (Node) {
        var expr = "";
        if (Node.Expr != null) {
            expr = this.VisitNode(Node.Expr);
        }
        this.PushSourceCode("raise " + expr);
    };

    PythonSourceGenerator.prototype.VisitErrorNode = function (Node) {
        var Code = "raise SoftwareFault(\"" + Node.Token.ParsedText + "\")";
        this.PushSourceCode(Code);
    };

    PythonSourceGenerator.prototype.VisitCommandNode = function (Node) {
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

        if (Node.Type.equals(Node.Type.Context.StringType)) {
            Code = "subprocess.check_output(\"" + Code + "\", shell=True)";
        } else if (Node.Type.equals(Node.Type.Context.BooleanType)) {
            Code = "(subprocess.call(\"" + Code + "\", shell=True) == 0)";
        } else {
            Code = "subprocess.call(\"" + Code + "\", shell=True)";
        }
        this.PushSourceCode(Code);
    };

    PythonSourceGenerator.prototype.AppendCommand = function (CurrentNode) {
        var Code = "";
        var size = CurrentNode.Params.size();
        var i = 0;
        while (i < size) {
            Code += this.VisitNode(CurrentNode.Params.get(i)) + " ";
            i = i + 1;
        }
        return Code;
    };

    PythonSourceGenerator.prototype.GenerateFunc = function (Func, ParamNameList, Body) {
        var Function = "def ";
        Function += Func.GetNativeFuncName() + "(";
        var i = 0;
        var size = ParamNameList.size();
        while (i < size) {
            if (i > 0) {
                Function += ", ";
            }
            Function += ParamNameList.get(i);
            i = i + 1;
        }
        var Block = this.VisitBlockWithIndent(Body, true);
        Function += "):" + this.LineFeed + Block + this.LineFeed;
        this.WriteLineCode(Function);
    };

    PythonSourceGenerator.prototype.GenerateClassField = function (Type, ClassField) {
        var Program = this.GetIndentString() + "class " + Type.ShortClassName;

        Program += ":" + this.LineFeed;
        this.Indent();

        Program += this.GetIndentString() + "def __init__(" + this.GetRecvName() + ")" + ":" + this.LineFeed;
        this.Indent();
        var i = 0;
        while (i < ClassField.FieldList.size()) {
            var FieldInfo = ClassField.FieldList.get(i);
            var InitValue = this.StringifyConstValue(FieldInfo.InitValue);
            if (!FieldInfo.Type.IsNative()) {
                InitValue = "None";
            }
            Program += this.GetIndentString() + this.GetRecvName() + "." + FieldInfo.NativeName + " = " + InitValue + this.LineFeed;
            i = i + 1;
        }
        this.UnIndent();

        this.UnIndent();
        this.WriteLineCode(Program);
    };

    PythonSourceGenerator.prototype.Eval = function (Node) {
        var Code = this.VisitBlockWithIndent(Node, false);
        if (!LibGreenTea.EqualsString(Code, "")) {
            this.WriteLineCode(Code);
        }
        return Code;
    };

    PythonSourceGenerator.prototype.GetRecvName = function () {
        return "self";
    };

    PythonSourceGenerator.prototype.InvokeMainFunc = function (MainFuncName) {
        this.WriteLineCode("if __name__ == '__main__':");
        this.WriteLineCode(this.Tab + MainFuncName + "()");
    };
    return PythonSourceGenerator;
})(SourceGenerator);
