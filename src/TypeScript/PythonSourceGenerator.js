var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var PythonSourceGenerator = (function (_super) {
    __extends(PythonSourceGenerator, _super);
    function PythonSourceGenerator() {
        _super.call(this, "PythonSource");
        this.WriteTranslatedCode("os: import\n");
    }
    PythonSourceGenerator.prototype.VisitBlockWithIndent = function (Node, inBlock) {
        var Code = "";
        if (inBlock) {
            this.Indent();
        }
        var CurrentNode = Node;
        while (CurrentNode != null) {
            CurrentNode.Evaluate(this);
            var poppedCode = this.PopSourceCode();
            if (!poppedCode.equals("")) {
                Code += this.GetIndentString() + poppedCode + "\n";
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
        this.PushSourceCode(Code);
    };

    PythonSourceGenerator.prototype.VisitEmptyNode = function (Node) {
    };

    PythonSourceGenerator.prototype.VisitIndexerNode = function (Node) {
        Node.Indexer.Evaluate(this);
        Node.Expr.Evaluate(this);
        this.PushSourceCode(this.PopSourceCode() + "[" + this.PopSourceCode() + "]");
    };

    PythonSourceGenerator.prototype.VisitMessageNode = function (Node) {
    };

    PythonSourceGenerator.prototype.VisitWhileNode = function (Node) {
        Node.CondExpr.Evaluate(this);
        var Program = "while " + this.PopSourceCode() + ":\n";
        this.VisitBlockWithIndent(Node.LoopBody, true);
        Program += this.PopSourceCode();
        this.PushSourceCode(Program);
    };

    PythonSourceGenerator.prototype.VisitDoWhileNode = function (Node) {
        this.VisitBlockWithIndent(Node.LoopBody, true);
        var LoopBody = this.PopSourceCode();
        var Program = "True: if:\n" + LoopBody;
        Node.CondExpr.Evaluate(this);
        Program += "while " + this.PopSourceCode() + ":\n";
        this.PushSourceCode(Program + LoopBody);
    };

    PythonSourceGenerator.prototype.VisitForNode = function (Node) {
        Node.LoopBody.MoveTailNode().NextNode = Node.IterExpr;
        var NewLoopBody = Node.LoopBody;
        var NewNode = new WhileNode(Node.Type, Node.Token, Node.CondExpr, NewLoopBody);
        this.VisitWhileNode(NewNode);
    };

    PythonSourceGenerator.prototype.VisitForEachNode = function (Node) {
        Node.Variable.Evaluate(this);
        Node.IterExpr.Evaluate(this);
        var Iter = this.PopSourceCode();
        var Variable = this.PopSourceCode();

        var Program = "for " + Variable + " in " + Iter + ":\n";
        this.VisitBlockWithIndent(Node.LoopBody, true);
        Program += this.PopSourceCode();
        this.PushSourceCode(Program);
    };

    PythonSourceGenerator.prototype.VisitConstNode = function (Node) {
        var value = this.StringfyConstValue(Node.ConstValue);
        if (Node.Type.equals(Node.Type.Context.BooleanType) || value.equals("true") || value.equals("false")) {
            if (value.equals("true")) {
                value = "True";
            } else if (value.equals("false")) {
                value = "False";
            }
        }
        this.PushSourceCode(value);
    };

    PythonSourceGenerator.prototype.VisitNewNode = function (Node) {
        var Type = Node.Type.ShortClassName;
        var paramString = this.AppendParams(this.EvaluateParam(Node.Params));
        this.PushSourceCode(Type + "(" + paramString + ")");
    };

    PythonSourceGenerator.prototype.VisitNullNode = function (Node) {
        this.PushSourceCode("None");
    };

    PythonSourceGenerator.prototype.VisitLocalNode = function (Node) {
        this.PushSourceCode(Node.LocalName);
    };

    PythonSourceGenerator.prototype.VisitGetterNode = function (Node) {
    };

    PythonSourceGenerator.prototype.EvaluateParam = function (Params) {
        var Size = Params.size();
        var Programs = new Array(Size);
        var i = 0;
        while (i < Size) {
            var Node = Params.get(i);
            Node.Evaluate(this);
            Programs[Size - i - 1] = this.PopSourceCode();
            i = i + 1;
        }
        return Programs;
    };

    PythonSourceGenerator.prototype.AppendParams = function (Params) {
        var param = "";
        var i = 0;
        while (i < Params.length) {
            var P = Params[i];
            if (i != 0) {
                param += ", ";
            }
            param += P;
            i = i + 1;
        }
        return param;
    };

    PythonSourceGenerator.prototype.VisitApplyNode = function (Node) {
        var paramString = this.AppendParams(this.EvaluateParam(Node.Params));
        this.PushSourceCode(Node.Method.MethodName + "(" + paramString + ")");
    };

    PythonSourceGenerator.prototype.VisitSuffixNode = function (Node) {
        var MethodName = Node.Token.ParsedText;
        if (MethodName.equals("++")) {
            MethodName = " += 1";
        } else if (MethodName.equals("--")) {
            MethodName = " -= 1";
        } else {
            console.log("DEBUG: " + MethodName + "not: issuffix: operator: supported!!");
        }
        Node.Expr.Evaluate(this);
        this.PushSourceCode(this.PopSourceCode() + MethodName);
    };

    PythonSourceGenerator.prototype.VisitUnaryNode = function (Node) {
        var MethodName = Node.Token.ParsedText;
        if (MethodName.equals("+")) {
        } else if (MethodName.equals("-")) {
        } else if (MethodName.equals("~")) {
        } else if (MethodName.equals("!")) {
            MethodName = "not ";
        } else {
            console.log("DEBUG: " + MethodName + "not: isunary: operator: supported!!");
        }
        Node.Expr.Evaluate(this);
        this.PushSourceCode(MethodName + this.PopSourceCode());
    };

    PythonSourceGenerator.prototype.VisitBinaryNode = function (Node) {
        var MethodName = Node.Token.ParsedText;
        if (MethodName.equals("+")) {
        } else if (MethodName.equals("-")) {
        } else if (MethodName.equals("*")) {
        } else if (MethodName.equals("/")) {
        } else if (MethodName.equals("%")) {
        } else if (MethodName.equals("<<")) {
        } else if (MethodName.equals(">>")) {
        } else if (MethodName.equals("&")) {
        } else if (MethodName.equals("|")) {
        } else if (MethodName.equals("^")) {
        } else if (MethodName.equals("<=")) {
        } else if (MethodName.equals("<")) {
        } else if (MethodName.equals(">=")) {
        } else if (MethodName.equals(">")) {
        } else if (MethodName.equals("!=")) {
        } else if (MethodName.equals("==")) {
        } else {
            console.log("DEBUG: " + MethodName + "not: isbinary: operator: supported!!");
        }
        Node.RightNode.Evaluate(this);
        Node.LeftNode.Evaluate(this);
        this.PushSourceCode(this.PopSourceCode() + " " + MethodName + " " + this.PopSourceCode());
    };

    PythonSourceGenerator.prototype.VisitAndNode = function (Node) {
        Node.RightNode.Evaluate(this);
        Node.LeftNode.Evaluate(this);
        this.PushSourceCode(this.PopSourceCode() + " and " + this.PopSourceCode());
    };

    PythonSourceGenerator.prototype.VisitOrNode = function (Node) {
        Node.RightNode.Evaluate(this);
        Node.LeftNode.Evaluate(this);
        this.PushSourceCode(this.PopSourceCode() + " or " + this.PopSourceCode());
    };

    PythonSourceGenerator.prototype.VisitAssignNode = function (Node) {
        Node.RightNode.Evaluate(this);
        Node.LeftNode.Evaluate(this);
        this.PushSourceCode(this.PopSourceCode() + " = " + this.PopSourceCode());
    };

    PythonSourceGenerator.prototype.VisitLetNode = function (Node) {
        var Code = Node.VariableName;
        var InitValue = "None";
        if (Node.InitNode != null) {
            Node.InitNode.Evaluate(this);
            InitValue = this.PopSourceCode();
        }
        Code += " = " + InitValue + "\n";
        this.VisitBlockWithIndent(Node.BlockNode, false);
        this.PushSourceCode(Code + this.PopSourceCode());
    };

    PythonSourceGenerator.prototype.VisitIfNode = function (Node) {
        Node.CondExpr.Evaluate(this);
        this.VisitBlockWithIndent(Node.ThenNode, true);
        this.VisitBlockWithIndent(Node.ElseNode, true);

        var ElseBlock = this.PopSourceCode();
        var ThenBlock = this.PopSourceCode();
        var CondExpr = this.PopSourceCode();
        var Code = "if " + CondExpr + ":\n" + ThenBlock;
        if (Node.ElseNode != null) {
            Code += "else:\n" + ElseBlock;
        }
        this.PushSourceCode(Code);
    };

    PythonSourceGenerator.prototype.VisitSwitchNode = function (Node) {
    };

    PythonSourceGenerator.prototype.VisitReturnNode = function (Node) {
        var retValue = "";
        if (Node.Expr != null) {
            Node.Expr.Evaluate(this);
            retValue = this.PopSourceCode();
        }
        this.PushSourceCode("return " + retValue);
    };

    PythonSourceGenerator.prototype.VisitLabelNode = function (Node) {
    };

    PythonSourceGenerator.prototype.VisitJumpNode = function (Node) {
    };

    PythonSourceGenerator.prototype.VisitBreakNode = function (Node) {
        var Code = "break";
        this.PushSourceCode(Code);
    };

    PythonSourceGenerator.prototype.VisitContinueNode = function (Node) {
        var Code = "continue";
        this.PushSourceCode(Code);
    };

    PythonSourceGenerator.prototype.VisitTryNode = function (Node) {
        var Code = "try:\n";
        this.VisitBlockWithIndent(Node.TryBlock, true);
        Code += this.PopSourceCode();

        if (Node.FinallyBlock != null) {
            this.VisitBlockWithIndent(Node.FinallyBlock, true);
            Code += " finally:\n" + this.PopSourceCode();
        }
        this.PushSourceCode(Code);
    };

    PythonSourceGenerator.prototype.VisitThrowNode = function (Node) {
        var expr = "";
        if (Node.Expr != null) {
            Node.Expr.Evaluate(this);
            expr = this.PopSourceCode();
        }
        this.PushSourceCode("raise " + expr);
    };

    PythonSourceGenerator.prototype.VisitFunctionNode = function (Node) {
    };

    PythonSourceGenerator.prototype.VisitErrorNode = function (Node) {
        var Code = "Error(\"" + Node.Token.ParsedText + "\"): raise";
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
            Code += this.CreateCommand(CurrentNode);
            count += 1;
            CurrentNode = CurrentNode.PipedNextNode;
        }
        this.PushSourceCode("os.system(\"" + Code + "\")");
    };

    PythonSourceGenerator.prototype.CreateCommand = function (CurrentNode) {
        var Code = "";
        var size = CurrentNode.Params.size();
        var i = 0;
        while (i < size) {
            CurrentNode.Params.get(i).Evaluate(this);
            Code += this.PopSourceCode() + " ";
            i = i + 1;
        }
        return Code;
    };

    PythonSourceGenerator.prototype.DefineFunction = function (Method, ParamNameList, Body) {
        var Function = "def ";
        Function += Method.MethodName + "(";
        var i = 0;
        var size = ParamNameList.size();
        while (i < size) {
            if (i > 0) {
                Function += ", ";
            }
            Function += ParamNameList.get(i);
            i = i + 1;
        }
        this.VisitBlockWithIndent(Body, true);
        Function += "):\n" + this.PopSourceCode() + "\n";
        this.WriteTranslatedCode(Function);
    };

    PythonSourceGenerator.prototype.Eval = function (Node) {
        this.VisitBlockWithIndent(Node, false);
        var Code = this.PopSourceCode();
        if (Code.equals("")) {
            return "";
        }
        this.WriteTranslatedCode(Code);
        return Code;
    };

    PythonSourceGenerator.prototype.AddClass = function (Type) {
    };

    PythonSourceGenerator.prototype.SetLanguageContext = function (Context) {
    };
    return PythonSourceGenerator;
})(SourceGenerator);
