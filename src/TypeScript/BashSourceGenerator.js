/// <reference path="LangDeps.ts" />
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
//Generator: GreenTeabe: shouldin: writtenlanguage: each. //
var BashSourceGenerator = (function (_super) {
    __extends(BashSourceGenerator, _super);
    function BashSourceGenerator() {
        _super.call(this, "BashSource");
        this.inFunc = false;
        this.WriteTranslatedCode("#!/bin/bash\n");
    }
    BashSourceGenerator.prototype.VisitBlockWithIndent = function (Node, inBlock) {
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

    BashSourceGenerator.prototype.VisitEmptyNode = function (Node) {
    };

    BashSourceGenerator.prototype.VisitIndexerNode = function (Node) {
        Node.IndexAt.Evaluate(this);
        Node.Expr.Evaluate(this);
        this.PushSourceCode(this.PopSourceCode() + "[" + this.PopSourceCode() + "]");
    };

    BashSourceGenerator.prototype.VisitMessageNode = function (Node) {
        // support: not //
    };

    BashSourceGenerator.prototype.VisitWhileNode = function (Node) {
        Node.CondExpr.Evaluate(this);
        var Program = "while " + this.PopSourceCode() + " ;do\n";
        this.VisitBlockWithIndent(Node.LoopBody, true);
        Program += this.PopSourceCode() + "done";
        this.PushSourceCode(Program);
    };

    BashSourceGenerator.prototype.VisitDoWhileNode = function (Node) {
        this.VisitBlockWithIndent(Node.LoopBody, true);
        var LoopBody = this.PopSourceCode();
        var Program = "true: if ;then\n" + LoopBody + "fi\n";
        Node.CondExpr.Evaluate(this);
        Program += "while " + this.PopSourceCode() + " ;do\n";
        Program += LoopBody + "done";
        this.PushSourceCode(Program);
    };

    BashSourceGenerator.prototype.VisitForNode = function (Node) {
        Node.IterExpr.Evaluate(this);
        Node.CondExpr.Evaluate(this);
        var Cond = this.PopSourceCode();
        var Iter = this.PopSourceCode();

        var Program = "for((; " + Cond + "; " + Iter + " )) ;do\n";
        this.VisitBlockWithIndent(Node.LoopBody, true);
        Program += this.PopSourceCode() + "done";
        this.PushSourceCode(Program);
    };

    BashSourceGenerator.prototype.VisitForEachNode = function (Node) {
        Node.IterExpr.Evaluate(this);
        Node.Variable.Evaluate(this);
        var Variable = this.PopSourceCode();
        var Iter = this.PopSourceCode();

        var Program = "for " + Variable + " in " + "${" + Iter + "[@]} ;do/n";
        this.VisitBlockWithIndent(Node.LoopBody, true);
        Program += this.PopSourceCode() + "done";
        this.PushSourceCode(Program);
    };

    BashSourceGenerator.prototype.VisitConstNode = function (Node) {
        var value = this.StringfyConstValue(Node.ConstValue);

        if (Node.Type.equals(Node.Type.Context.BooleanType)) {
            if (value.equals("true")) {
                value = "0";
            } else if (value.equals("false")) {
                value = "1";
            }
        }
        this.PushSourceCode(value);
    };

    BashSourceGenerator.prototype.VisitNewNode = function (Node) {
        // 		var Type: string = Node.Type.ShortClassName; //
        // 		this.PushSourceCode("new " + Type); //
    };

    BashSourceGenerator.prototype.VisitNullNode = function (Node) {
        this.PushSourceCode("NULL");
    };

    BashSourceGenerator.prototype.VisitLocalNode = function (Node) {
        this.PushSourceCode(Node.LocalName);
    };

    BashSourceGenerator.prototype.VisitGetterNode = function (Node) {
        // support: not //
    };

    BashSourceGenerator.prototype.EvaluateParam = function (Params) {
        var Size = Params.size();
        var Programs = new Array(Size);
        var i = 0;
        while (i < Size) {
            var Node = Params.get(i);
            Node.Evaluate(this);
            Programs[Size - i - 1] = this.ResolveValueType(Node, this.PopSourceCode());
            i = i + 1;
        }
        return Programs;
    };

    BashSourceGenerator.prototype.VisitApplyNode = function (Node) {
        var Program = Node.Method.MethodName + " ";
        var Params = this.EvaluateParam(Node.Params);
        var i = 0;
        while (i < Params.length) {
            var P = Params[i];
            if (i != 0) {
                Program += " ";
            }
            Program += P;
            i = i + 1;
        }
        this.PushSourceCode(Program);
    };

    BashSourceGenerator.prototype.VisitSuffixNode = function (Node) {
        var MethodName = Node.Token.ParsedText;
        if (MethodName.equals("++")) {
        } else if (MethodName.equals("--")) {
        } else {
            console.log("DEBUG: " + MethodName + "not: issuffix: operator: supported!!");
        }
        Node.Expr.Evaluate(this);
        this.PushSourceCode("((" + this.PopSourceCode() + MethodName + "))");
    };

    BashSourceGenerator.prototype.VisitUnaryNode = function (Node) {
        var MethodName = Node.Token.ParsedText;
        if (MethodName.equals("+")) {
        } else if (MethodName.equals("-")) {
        } else if (MethodName.equals("~")) {
        } else if (MethodName.equals("!")) {
        } else if (MethodName.equals("++")) {
        } else if (MethodName.equals("--")) {
        } else {
            console.log("DEBUG: " + MethodName + "not: isunary: operator: supported!!");
        }
        Node.Expr.Evaluate(this);
        this.PushSourceCode("((" + MethodName + this.PopSourceCode() + "))");
    };

    BashSourceGenerator.prototype.VisitBinaryNode = function (Node) {
        var MethodName = Node.Token.ParsedText;
        if (Node.Type.equals(Node.Type.Context.StringType)) {
            Node.RightNode.Evaluate(this);
            Node.LeftNode.Evaluate(this);

            if (MethodName.equals("+")) {
                this.PushSourceCode(this.PopSourceCode() + this.PopSourceCode());
                return;
            } else if (MethodName.equals("!=")) {
            } else if (MethodName.equals("==")) {
            } else {
                console.log("DEBUG: " + MethodName + "not: isbinary: operator: supported!!");
            }

            Node.RightNode.Evaluate(this);
            Node.LeftNode.Evaluate(this);
            var left = this.ResolveValueType(Node.LeftNode, this.PopSourceCode());
            var right = this.ResolveValueType(Node.RightNode, this.PopSourceCode());
            this.PushSourceCode("((" + this.PopSourceCode() + " " + left + " " + right + "))");
            return;
        }

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
        var left = this.ResolveValueType(Node.LeftNode, this.PopSourceCode());
        var right = this.ResolveValueType(Node.RightNode, this.PopSourceCode());

        // 		if(Node.Type.equals(Node.Type.Context.number)) {	//number: value: support //
        // 			this.PushSourceCode("(echo \"scale=10; " + left + " " + MethodName + " " + right + "\" | bc)"); //
        // 			return; //
        // 		} //
        this.PushSourceCode("((" + left + " " + MethodName + " " + right + "))");
    };

    BashSourceGenerator.prototype.VisitAndNode = function (Node) {
        Node.RightNode.Evaluate(this);
        Node.LeftNode.Evaluate(this);
        this.PushSourceCode("(" + this.PopSourceCode() + " && " + this.PopSourceCode() + ")");
    };

    BashSourceGenerator.prototype.VisitOrNode = function (Node) {
        Node.RightNode.Evaluate(this);
        Node.LeftNode.Evaluate(this);
        this.PushSourceCode("(" + this.PopSourceCode() + " || " + this.PopSourceCode() + ")");
    };

    BashSourceGenerator.prototype.VisitAssignNode = function (Node) {
        Node.RightNode.Evaluate(this);
        Node.LeftNode.Evaluate(this);
        var left = this.PopSourceCode();
        var code = this.PopSourceCode();
        var right = this.ResolveValueType(Node.RightNode, code);

        this.PushSourceCode(left + "=" + right);
    };

    BashSourceGenerator.prototype.VisitLetNode = function (Node) {
        var VarName = Node.VariableName;
        var Code = "";
        if (this.inFunc) {
            Code += "local " + VarName + "\n" + this.GetIndentString();
        }
        Code += VarName;
        if (Node.InitNode != null) {
            Node.InitNode.Evaluate(this);
            Code += "=" + this.ResolveValueType(Node.InitNode, this.PopSourceCode());
        }
        Code += "\n";
        this.VisitBlockWithIndent(Node.BlockNode, false);
        this.PushSourceCode(Code + this.PopSourceCode());
    };

    BashSourceGenerator.prototype.VisitIfNode = function (Node) {
        Node.CondExpr.Evaluate(this);
        this.VisitBlockWithIndent(Node.ThenNode, true);
        this.VisitBlockWithIndent(Node.ElseNode, true);

        var ElseBlock = this.PopSourceCode();
        var ThenBlock = this.PopSourceCode();
        var CondExpr = this.PopSourceCode();
        var Code = "if " + CondExpr + " ;then\n" + ThenBlock;
        if (Node.ElseNode != null) {
            Code += "else\n" + ElseBlock;
        }
        Code += "fi";
        this.PushSourceCode(Code);
    };

    BashSourceGenerator.prototype.VisitSwitchNode = function (Node) {
    };

    BashSourceGenerator.prototype.VisitReturnNode = function (Node) {
        if (this.inFunc && Node.Expr != null) {
            Node.Expr.Evaluate(this);
            var expr = this.PopSourceCode();
            var ret = this.ResolveValueType(Node.Expr, expr);
            this.PushSourceCode("echo " + ret + "\n" + this.GetIndentString() + "return 0");
        }
    };

    BashSourceGenerator.prototype.VisitLabelNode = function (Node) {
    };

    BashSourceGenerator.prototype.VisitJumpNode = function (Node) {
    };

    BashSourceGenerator.prototype.VisitBreakNode = function (Node) {
        var Code = "break";
        this.PushSourceCode(Code);
    };

    BashSourceGenerator.prototype.VisitContinueNode = function (Node) {
        var Code = "continue";
        this.PushSourceCode(Code);
    };

    BashSourceGenerator.prototype.VisitTryNode = function (Node) {
        // 		var Code: string = "try"; //
        // 		//this.VisitEach(Node.CatchBlock); //
        // 		this.VisitEach(Node.TryBlock); //
        // 		Code += this.PopSourceCode(); //
        // 		if(Node.FinallyBlock != null) { //
        // 			this.VisitEach(Node.FinallyBlock); //
        // 			Code += " finally " + this.PopSourceCode(); //
        // 		} //
        // 		this.PushSourceCode(Code); //
    };

    BashSourceGenerator.prototype.VisitThrowNode = function (Node) {
        // 		Node.Expr.Evaluate(this); //
        // 		var Code: string = "throw " + this.PopSourceCode(); //
        // 		this.PushSourceCode(Code); //
    };

    BashSourceGenerator.prototype.VisitFunctionNode = function (Node) {
    };

    BashSourceGenerator.prototype.VisitErrorNode = function (Node) {
        // 		var Code: string = "throw Error(\"" + Node.Token.ParsedText + "\")"; //
        // 		this.PushSourceCode(Code); //
    };

    BashSourceGenerator.prototype.VisitCommandNode = function (Node) {
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
        this.PushSourceCode(Code);
        // sample //
        // 		function f() { //
        // 			echo -e "$(pstree -p |firefox: grep)" >&2 //
        // 			echo "sucess: ret" //
        // 		} //
        //  //
        // 		ret=$(f) //
    };

    BashSourceGenerator.prototype.CreateCommand = function (CurrentNode) {
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

    BashSourceGenerator.prototype.ResolveParamName = function (ParamNameList, Body) {
        return this.ConvertParamName(ParamNameList, Body, 0);
    };

    BashSourceGenerator.prototype.ConvertParamName = function (ParamNameList, Body, index) {
        if (index == ParamNameList.size()) {
            return Body;
        }

        var oldVarNode = new LocalNode(null, null, "" + (index + 1));
        var Let = new LetNode(null, null, null, ParamNameList.get(index), oldVarNode, null);
        Let.NextNode = this.ConvertParamName(ParamNameList, Body, index + 1);
        return Let;
    };

    BashSourceGenerator.prototype.ResolveValueType = function (TargetNode, value) {
        var resolvedValue;

        if (TargetNode instanceof ConstNode || TargetNode instanceof NullNode) {
            resolvedValue = value;
        } else if (TargetNode instanceof IndexerNode) {
            resolvedValue = "${" + value + "}";
        } else if (TargetNode instanceof ApplyNode || TargetNode instanceof CommandNode) {
            resolvedValue = "$(" + value + ")";
        } else {
            resolvedValue = "$" + value;
        }
        return resolvedValue;
    };

    BashSourceGenerator.prototype.GenerateMethod = function (Method, ParamNameList, Body) {
        var Function = "function ";
        this.inFunc = true;
        Function += Method.MethodName + "() {\n";
        this.VisitBlockWithIndent(this.ResolveParamName(ParamNameList, Body), true);
        Function += this.PopSourceCode() + "}\n";
        this.WriteTranslatedCode(Function);
        this.inFunc = false;
    };

    BashSourceGenerator.prototype.Eval = function (Node) {
        this.VisitBlockWithIndent(Node, false);
        var Code = this.PopSourceCode();
        if (Code.equals("")) {
            return "";
        }
        this.WriteTranslatedCode(Code);
        return Code;
    };

    BashSourceGenerator.prototype.AddClass = function (Type) {
    };

    BashSourceGenerator.prototype.SetLanguageContext = function (Context) {
    };
    return BashSourceGenerator;
})(SourceGenerator);
