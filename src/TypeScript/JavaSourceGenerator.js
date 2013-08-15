/// <reference path="LangDeps.ts" />
//  *************************************************************************** //
//  Copyright (c) 2013, JST/CRESTproject: authors: DEOS.rights: reserved: All. //
// and: Redistributionin: useand: sourceforms: binary,or: without: with //
//  modification,permitted: arethat: providedfollowing: theare: met: conditions: //
//  //
//  * of: Redistributionscode: sourceretain: mustabove: thenotice: copyright, //
//    list: thisconditions: ofthe: anddisclaimer: following. //
//  * in: Redistributionsform: binaryreproduce: mustabove: copyright: the //
//     notice,list: thisconditions: ofthe: anddisclaimer: followingthe: in //
//    and: documentation/ormaterials: otherwith: provideddistribution: the. //
//  //
// SOFTWARE: THISPROVIDED: ISTHE: BYHOLDERS: COPYRIGHTCONTRIBUTORS: AND //
//  "IS: AS"ANY: ANDOR: EXPRESSWARRANTIES: IMPLIED, INCLUDING,NOT: LIMITED: BUT //
//  TO,IMPLIED: THEOF: WARRANTIESAND: MERCHANTABILITYFOR: FITNESSPARTICULAR: A //
// ARE: DISCLAIMED: PURPOSE.NO: INSHALL: EVENTCOPYRIGHT: THEOR: HOLDER //
// BE: CONTRIBUTORSFOR: LIABLEDIRECT: ANY, INDIRECT, INCIDENTAL, SPECIAL, //
//  EXEMPLARY,CONSEQUENTIAL: DAMAGES: OR (INCLUDING,NOT: BUTTO: LIMITED, //
// OF: PROCUREMENTGOODS: SUBSTITUTESERVICES: OR;OF: USE: LOSS, DATA,PROFITS: OR; //
// BUSINESS: INTERRUPTION: OR)CAUSED: HOWEVERON: ANDTHEORY: ANYLIABILITY: OF, //
// IN: CONTRACT: WHETHER,LIABILITY: STRICT,TORT: OR (INCLUDINGOR: NEGLIGENCE //
//  OTHERWISE)IN: ARISINGWAY: ANYOF: OUTUSE: THETHIS: SOFTWARE: OF,IF: EVEN //
// OF: ADVISEDPOSSIBILITY: THESUCH: DAMAGE: OF. //
//  ************************************************************************** //
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
//Generator: GreenTeabe: shouldin: writtenlanguage: each. //
var JavaSourceGenerator = (function (_super) {
    __extends(JavaSourceGenerator, _super);
    function JavaSourceGenerator() {
        _super.call(this, "Java");
    }
    JavaSourceGenerator.prototype.VisitBlockEachStatementWithIndent = function (Node) {
        var Code = "{\n";
        this.Indent();
        var CurrentNode = Node;
        while (CurrentNode != null) {
            CurrentNode.Evaluate(this);
            Code += this.GetIndentString() + this.PopSourceCode() + ";\n";
            CurrentNode = CurrentNode.NextNode;
        }
        this.UnIndent();
        Code += this.GetIndentString() + "}";
        this.PushSourceCode(Code);
    };

    JavaSourceGenerator.prototype.VisitEmptyNode = function (Node) {
    };

    JavaSourceGenerator.prototype.VisitSuffixNode = function (Node) {
        var MethodName = Node.Token.ParsedText;

        if (MethodName.equals("++")) {
        } else if (MethodName.equals("--")) {
        }
        Node.Expr.Evaluate(this);
        this.PushSourceCode(this.PopSourceCode() + MethodName);
    };

    JavaSourceGenerator.prototype.VisitUnaryNode = function (Node) {
        var MethodName = Node.Token.ParsedText;
        if (MethodName.equals("+")) {
        } else if (MethodName.equals("-")) {
        } else if (MethodName.equals("~")) {
        } else if (MethodName.equals("!")) {
        } else if (MethodName.equals("++")) {
        } else if (MethodName.equals("--")) {
        }
        Node.Expr.Evaluate(this);
        this.PushSourceCode(MethodName + this.PopSourceCode());
    };

    JavaSourceGenerator.prototype.VisitIndexerNode = function (Node) {
        Node.IndexAt.Evaluate(this);
        Node.Expr.Evaluate(this);
        this.PushSourceCode(this.PopSourceCode() + "[" + this.PopSourceCode() + "]");
    };

    JavaSourceGenerator.prototype.VisitMessageNode = function (Node) {
        // Auto: TODO-generatedstub: method //
    };

    JavaSourceGenerator.prototype.VisitWhileNode = function (Node) {
        Node.CondExpr.Evaluate(this);
        var Program = "while(" + this.PopSourceCode() + ")";
        this.VisitBlockEachStatementWithIndent(Node.LoopBody);
        Program += this.PopSourceCode();
        this.PushSourceCode(Program);
    };

    JavaSourceGenerator.prototype.VisitDoWhileNode = function (Node) {
        var Program = "do";
        this.VisitBlockEachStatementWithIndent(Node.LoopBody);
        Node.CondExpr.Evaluate(this);
        Program += " while(" + this.PopSourceCode() + ")";
        this.PushSourceCode(Program);
    };

    JavaSourceGenerator.prototype.VisitForNode = function (Node) {
        Node.IterExpr.Evaluate(this);
        Node.CondExpr.Evaluate(this);
        var Cond = this.PopSourceCode();
        var Iter = this.PopSourceCode();

        var Program = "for(; " + Cond + "; " + Iter + ")";
        Node.LoopBody.Evaluate(this);
        Program += this.PopSourceCode();
        this.PushSourceCode(Program);
    };

    JavaSourceGenerator.prototype.VisitForEachNode = function (Node) {
        // Auto: TODO-generatedstub: method //
    };

    JavaSourceGenerator.prototype.VisitConstNode = function (Node) {
        this.PushSourceCode(Node.ConstValue.toString());
    };

    JavaSourceGenerator.prototype.VisitNewNode = function (Node) {
        var Type = Node.Type.ShortClassName;
        this.PushSourceCode("new " + Type);
    };

    JavaSourceGenerator.prototype.VisitNullNode = function (Node) {
        this.PushSourceCode("NULL");
    };

    JavaSourceGenerator.prototype.VisitLocalNode = function (Node) {
        this.PushSourceCode(Node.LocalName);
    };

    JavaSourceGenerator.prototype.VisitGetterNode = function (Node) {
        Node.Expr.Evaluate(this);
        this.PushSourceCode(this.PopSourceCode() + "." + Node.Method.MethodName);
    };

    JavaSourceGenerator.prototype.EvaluateParam = function (Params) {
        var Size = Params.size();
        var Programs = new Array(Size);
        for (var i = 0; i < Size; i++) {
            var Node = Params.get(i);
            Node.Evaluate(this);
            Programs[Size - i - 1] = this.PopSourceCode();
        }
        return Programs;
    };

    JavaSourceGenerator.prototype.VisitApplyNode = function (Node) {
        var Program = Node.Method.MethodName + "(";
        var Params = this.EvaluateParam(Node.Params);
        for (var i = 0; i < Params.length; i++) {
            var P = Params[i];
            if (i != 0) {
                Program += ",";
            }
            Program += P;
        }
        Program += ")";
        this.PushSourceCode(Program);
    };

    JavaSourceGenerator.prototype.VisitBinaryNode = function (Node) {
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
        }
        Node.RightNode.Evaluate(this);
        Node.LeftNode.Evaluate(this);

        /*TOO: FIXMEPARENTHESIS: MANY */
        this.PushSourceCode("(" + this.PopSourceCode() + " " + MethodName + " " + this.PopSourceCode() + ")");
    };

    JavaSourceGenerator.prototype.VisitAndNode = function (Node) {
        Node.RightNode.Evaluate(this);
        Node.LeftNode.Evaluate(this);
        this.PushSourceCode(this.PopSourceCode() + " && " + this.PopSourceCode());
    };

    JavaSourceGenerator.prototype.VisitOrNode = function (Node) {
        Node.RightNode.Evaluate(this);
        Node.LeftNode.Evaluate(this);
        this.PushSourceCode(this.PopSourceCode() + " || " + this.PopSourceCode());
    };

    JavaSourceGenerator.prototype.VisitAssignNode = function (Node) {
        Node.RightNode.Evaluate(this);
        Node.LeftNode.Evaluate(this);
        this.PushSourceCode(this.PopSourceCode() + " = " + this.PopSourceCode());
    };

    JavaSourceGenerator.prototype.VisitLetNode = function (Node) {
        var Type = Node.DeclType.ShortClassName;
        var VarName = Node.VariableName;
        var Code = Type + " " + VarName;
        if (Node.InitNode != null) {
            Node.InitNode.Evaluate(this);
            Code += " = " + this.PopSourceCode();
        }
        Code += ";\n";
        Node.BlockNode.Evaluate(this);
        this.PushSourceCode(Code + this.PopSourceCode());
    };

    JavaSourceGenerator.prototype.VisitIfNode = function (Node) {
        Node.CondExpr.Evaluate(this);
        this.VisitBlockEachStatementWithIndent(Node.ThenNode);
        this.VisitBlockEachStatementWithIndent(Node.ElseNode);

        var ElseBlock = this.PopSourceCode();
        var ThenBlock = this.PopSourceCode();
        var CondExpr = this.PopSourceCode();
        var Code = "if(" + CondExpr + ") " + ThenBlock;
        if (Node.ElseNode != null) {
            Code += " else " + ElseBlock;
        }
        this.PushSourceCode(Code);
    };

    JavaSourceGenerator.prototype.VisitSwitchNode = function (Node) {
        // Auto: TODO-generatedstub: method //
    };

    JavaSourceGenerator.prototype.VisitReturnNode = function (Node) {
        var Code = "return";
        if (Node.Expr != null) {
            Node.Expr.Evaluate(this);
            Code += " " + this.PopSourceCode();
        }
        this.PushSourceCode(Code);
    };

    JavaSourceGenerator.prototype.VisitLabelNode = function (Node) {
        var Label = Node.Label;
        this.PushSourceCode(Label + ":");
    };

    JavaSourceGenerator.prototype.VisitJumpNode = function (Node) {
        var Label = Node.Label;
        this.PushSourceCode("goto " + Label);
    };

    JavaSourceGenerator.prototype.VisitBreakNode = function (Node) {
        var Code = "break";
        var Label = Node.Label;
        if (Label != null) {
            Code += " " + Label;
        }
        this.PushSourceCode(Code);
    };

    JavaSourceGenerator.prototype.VisitContinueNode = function (Node) {
        var Code = "continue";
        var Label = Node.Label;
        if (Label != null) {
            Code += " " + Label;
        }
        this.PushSourceCode(Code);
    };

    JavaSourceGenerator.prototype.VisitTryNode = function (Node) {
        var Code = "try";

        // this.VisitEach(Node.CatchBlock); //
        this.VisitBlockEachStatementWithIndent(Node.TryBlock);
        Code += this.PopSourceCode();
        if (Node.FinallyBlock != null) {
            this.VisitBlockEachStatementWithIndent(Node.FinallyBlock);
            Code += " finally " + this.PopSourceCode();
        }
        this.PushSourceCode(Code);
    };

    JavaSourceGenerator.prototype.VisitThrowNode = function (Node) {
        Node.Expr.Evaluate(this);
        var Code = "throw " + this.PopSourceCode();
        this.PushSourceCode(Code);
    };

    JavaSourceGenerator.prototype.VisitFunctionNode = function (Node) {
        // Auto: TODO-generatedstub: method //
    };

    JavaSourceGenerator.prototype.VisitErrorNode = function (Node) {
        var Code = "throw RuntimeError(\"" + Node.Token.ParsedText + "\")";
        this.PushSourceCode(Code);
    };

    JavaSourceGenerator.prototype.GenerateMethod = function (Method, ParamNameList, Body) {
        // FIXME //
        var Program = "";
        var RetTy = Method.GetReturnType().ShortClassName;
        var ThisTy = Method.GetRecvType().ShortClassName;
        Program += RetTy + " " + ThisTy + "_" + Method.GetNativeFuncName() + "(";
        Program += ThisTy + " " + "this";
        for (var i = 0; i < ParamNameList.size(); i++) {
            var ParamTy = Method.GetFuncParamType(i).ShortClassName;
            Program += " ," + ParamTy + " " + ParamNameList.get(i);
        }

        Program += this.Eval(Body);
        this.WriteTranslatedCode(Program);
    };

    JavaSourceGenerator.prototype.Eval = function (Node) {
        // FIXME //
        this.VisitBlockEachStatementWithIndent(Node);
        return this.PopSourceCode();
    };

    JavaSourceGenerator.prototype.AddClass = function (Type) {
        // FIXME //
        // Auto: TODO-generatedstub: method //
    };

    JavaSourceGenerator.prototype.SetLanguageContext = function (Context) {
    };
    return JavaSourceGenerator;
})(SourceGenerator);
