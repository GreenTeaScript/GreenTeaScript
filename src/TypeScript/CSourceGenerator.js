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
var CSourceGenerator = (function (_super) {
    __extends(CSourceGenerator, _super);
    function CSourceGenerator() {
        _super.call(this, "C");
        this.DefaultTypes = ["void", "int", "boolean", "float", "double", "string", "Object", "Array", "Func", "var", "any"];
        this.DefinedClass = new GtMap();
    }
    CSourceGenerator.prototype.VisitBlockEachStatementWithIndent = function (Node, NeedBlock) {
        var Code = "";
        if (NeedBlock) {
            Code += "{\n";
            this.Indent();
        }
        var CurrentNode = Node;
        while (CurrentNode != null) {
            CurrentNode.Evaluate(this);
            Code += this.GetIndentString() + this.PopSourceCode() + ";\n";
            CurrentNode = CurrentNode.NextNode;
        }
        if (NeedBlock) {
            this.UnIndent();
            Code += this.GetIndentString() + "}";
        }
        this.PushSourceCode(Code);
    };

    CSourceGenerator.prototype.VisitEmptyNode = function (Node) {
        this.PushSourceCode("");
    };

    CSourceGenerator.prototype.VisitSuffixNode = function (Node) {
        var MethodName = Node.Token.ParsedText;
        Node.Expr.Evaluate(this);
        this.PushSourceCode(this.PopSourceCode() + MethodName);
    };

    CSourceGenerator.prototype.VisitUnaryNode = function (Node) {
        var MethodName = Node.Token.ParsedText;
        Node.Expr.Evaluate(this);
        this.PushSourceCode(MethodName + this.PopSourceCode());
    };

    CSourceGenerator.prototype.VisitIndexerNode = function (Node) {
        Node.IndexAt.Evaluate(this);
        Node.Expr.Evaluate(this);
        this.PushSourceCode(this.PopSourceCode() + "[" + this.PopSourceCode() + "]");
    };

    CSourceGenerator.prototype.VisitMessageNode = function (Node) {
        // Auto: TODO-generatedstub: method //
    };

    CSourceGenerator.prototype.VisitWhileNode = function (Node) {
        Node.CondExpr.Evaluate(this);
        var Program = "while(" + this.PopSourceCode() + ")";
        this.VisitBlockEachStatementWithIndent(Node.LoopBody, true);
        Program += this.PopSourceCode();
        this.PushSourceCode(Program);
    };

    CSourceGenerator.prototype.VisitDoWhileNode = function (Node) {
        var Program = "do";
        this.VisitBlockEachStatementWithIndent(Node.LoopBody, true);
        Node.CondExpr.Evaluate(this);
        Program += " while(" + this.PopSourceCode() + ")";
        this.PushSourceCode(Program);
    };

    CSourceGenerator.prototype.VisitForNode = function (Node) {
        Node.IterExpr.Evaluate(this);
        Node.CondExpr.Evaluate(this);
        var Cond = this.PopSourceCode();
        var Iter = this.PopSourceCode();
        var Program = "for(; " + Cond + "; " + Iter + ")";
        Node.LoopBody.Evaluate(this);
        Program += this.PopSourceCode();
        this.PushSourceCode(Program);
    };

    CSourceGenerator.prototype.VisitForEachNode = function (Node) {
        // Auto: TODO-generatedstub: method //
    };

    CSourceGenerator.prototype.VisitConstNode = function (Node) {
        var Code = "NULL";
        if (Node.ConstValue != null) {
            Code = this.StringfyConstValue(Node.ConstValue);
        }
        this.PushSourceCode(Code);
    };

    CSourceGenerator.prototype.VisitNewNode = function (Node) {
        var Type = Node.Type.ShortClassName;
        this.PushSourceCode("new " + Type + "()");
    };

    CSourceGenerator.prototype.VisitNullNode = function (Node) {
        this.PushSourceCode("NULL");
    };

    CSourceGenerator.prototype.VisitLocalNode = function (Node) {
        this.PushSourceCode(Node.LocalName);
    };

    CSourceGenerator.prototype.VisitGetterNode = function (Node) {
        Node.Expr.Evaluate(this);
        this.PushSourceCode(this.PopSourceCode() + "->" + Node.Method.MethodName);
    };

    CSourceGenerator.prototype.VisitApplyNode = function (Node) {
        var Program = this.GenerateMacro(Node);
        var i = 0;
        while (i < ListSize(Node.Params)) {
            Node.Params.get(i).Evaluate(this);
            Program = Program.replace("$" + i, this.PopSourceCode());
            i = i + 1;
        }
        this.PushSourceCode(Program);
    };

    CSourceGenerator.prototype.GenerateMacro = function (Node) {
        if (Node.Method.SourceMacro != null) {
            return Node.Method.SourceMacro;
        }
        var Template = Node.Method.GetNativeFuncName() + "(";
        var i = 0;
        var ParamSize = Node.Params.size();
        while (i < ParamSize) {
            if (i != 0) {
                Template += " ,";
            }
            Template += "$" + i;
            i = i + 1;
        }
        Template += ")";
        return Template;
    };

    CSourceGenerator.prototype.VisitBinaryNode = function (Node) {
        var MethodName = Node.Token.ParsedText;
        Node.RightNode.Evaluate(this);
        Node.LeftNode.Evaluate(this);
        this.PushSourceCode(this.PopSourceCode() + " " + MethodName + " " + this.PopSourceCode());
    };

    CSourceGenerator.prototype.VisitAndNode = function (Node) {
        Node.RightNode.Evaluate(this);
        Node.LeftNode.Evaluate(this);
        this.PushSourceCode(this.PopSourceCode() + " && " + this.PopSourceCode());
    };

    CSourceGenerator.prototype.VisitOrNode = function (Node) {
        Node.RightNode.Evaluate(this);
        Node.LeftNode.Evaluate(this);
        this.PushSourceCode(this.PopSourceCode() + " || " + this.PopSourceCode());
    };

    CSourceGenerator.prototype.VisitAssignNode = function (Node) {
        Node.RightNode.Evaluate(this);
        Node.LeftNode.Evaluate(this);
        this.PushSourceCode(this.PopSourceCode() + " = " + this.PopSourceCode());
    };

    CSourceGenerator.prototype.VisitLetNode = function (Node) {
        var Type = Node.DeclType.ShortClassName;
        var VarName = Node.VariableName;
        var Code = Type + " " + VarName;
        if (Node.InitNode != null) {
            Node.InitNode.Evaluate(this);
            Code += " = " + this.PopSourceCode();
        }
        Code += ";\n";
        this.VisitBlockEachStatementWithIndent(Node.BlockNode, true);
        this.PushSourceCode(Code + this.GetIndentString() + this.PopSourceCode());
    };

    CSourceGenerator.prototype.VisitIfNode = function (Node) {
        Node.CondExpr.Evaluate(this);
        this.VisitBlockEachStatementWithIndent(Node.ThenNode, true);
        this.VisitBlockEachStatementWithIndent(Node.ElseNode, true);
        var ElseBlock = this.PopSourceCode();
        var ThenBlock = this.PopSourceCode();
        var CondExpr = this.PopSourceCode();
        var Code = "if(" + CondExpr + ") " + ThenBlock;
        if (Node.ElseNode != null) {
            Code += " else " + ElseBlock;
        }
        this.PushSourceCode(Code);
    };

    CSourceGenerator.prototype.VisitSwitchNode = function (Node) {
        // Auto: TODO-generatedstub: method //
    };

    CSourceGenerator.prototype.VisitReturnNode = function (Node) {
        var Code = "return";
        if (Node.Expr != null) {
            Node.Expr.Evaluate(this);
            Code += " " + this.PopSourceCode();
        }
        this.PushSourceCode(Code);
    };

    CSourceGenerator.prototype.VisitLabelNode = function (Node) {
        var Label = Node.Label;
        this.PushSourceCode(Label + ":");
    };

    CSourceGenerator.prototype.VisitJumpNode = function (Node) {
        var Label = Node.Label;
        this.PushSourceCode("goto " + Label);
    };

    CSourceGenerator.prototype.VisitBreakNode = function (Node) {
        var Code = "break";
        var Label = Node.Label;
        if (Label != null) {
            Code += " " + Label;
        }
        this.PushSourceCode(Code);
    };

    CSourceGenerator.prototype.VisitContinueNode = function (Node) {
        var Code = "continue";
        var Label = Node.Label;
        if (Label != null) {
            Code += " " + Label;
        }
        this.PushSourceCode(Code);
    };

    CSourceGenerator.prototype.VisitTryNode = function (Node) {
        var Code = "try ";
        this.VisitBlockEachStatementWithIndent(Node.TryBlock, true);
        Code += this.PopSourceCode();
        var Val = Node.CatchExpr;
        Code += " catch (" + Val.Type.toString() + " " + Val.VariableName + ") ";
        this.VisitBlockEachStatementWithIndent(Node.CatchBlock, true);
        Code += this.PopSourceCode();
        if (Node.FinallyBlock != null) {
            this.VisitBlockEachStatementWithIndent(Node.FinallyBlock, true);
            Code += " finally " + this.PopSourceCode();
        }
        this.PushSourceCode(Code);
    };

    CSourceGenerator.prototype.VisitThrowNode = function (Node) {
        Node.Expr.Evaluate(this);
        var Code = "throw " + this.PopSourceCode();
        this.PushSourceCode(Code);
    };

    CSourceGenerator.prototype.VisitFunctionNode = function (Node) {
        // Auto: TODO-generatedstub: method //
    };

    CSourceGenerator.prototype.VisitErrorNode = function (Node) {
        var Code = "throw Error(\"" + Node.Token.ParsedText + "\")";
        this.PushSourceCode(Code);
    };

    CSourceGenerator.prototype.VisitCommandNode = function (Node) {
        var Code = "system(";
        var i = 0;
        var Command = "var __Command: string = ";
        while (i < ListSize(Node.Params)) {
            var Param = Node.Params.get(i);
            if (i != 0) {
                Command += " + ";
            }
            Param.Evaluate(this);
            Command += "(" + this.PopSourceCode() + ")";
            i = i + 1;
        }
        Code = Command + ";\n" + this.GetIndentString() + Code + "__Command)";
        this.PushSourceCode(Code);
    };

    CSourceGenerator.prototype.LocalTypeName = function (Type) {
        return Type.ShortClassName;
    };

    CSourceGenerator.prototype.GenerateMethod = function (Method, ParamNameList, Body) {
        var Code = "";
        if (!Method.Is(ExportMethod)) {
            Code = "static ";
        }
        var RetTy = this.LocalTypeName(Method.GetReturnType());
        Code += RetTy + " " + Method.GetNativeFuncName() + "(";
        var i = 0;
        while (i < ParamNameList.size()) {
            var ParamTy = this.LocalTypeName(Method.GetFuncParamType(i));
            if (i > 0) {
                Code += ", ";
            }
            Code += ParamTy + " " + ParamNameList.get(i);
            i = i + 1;
        }
        Code += ")";
        this.VisitBlockEachStatementWithIndent(Body, true);
        Code += this.PopSourceCode();
        this.WriteTranslatedCode(Code);
    };

    CSourceGenerator.prototype.Eval = function (Node) {
        this.VisitBlockEachStatementWithIndent(Node, false);
        var Code = this.PopSourceCode();
        if (Code.equals(";\n")) {
            return "";
        }
        this.WriteTranslatedCode(Code);
        return Code;
    };

    CSourceGenerator.prototype.IsDefiendType = function (TypeName) {
        var i = 0;
        while (i < this.DefaultTypes.length) {
            if (this.DefaultTypes[i].equals(TypeName)) {
                return true;
            }
            i = i + 1;
        }

        // care: about: FIXME "var", "any" //
        return false;
    };

    CSourceGenerator.prototype.GenerateClassField = function (NameSpace, Type, FieldList) {
        var i = 0;
        var Program = this.GetIndentString() + "struct " + Type.ShortClassName + "{\n";
        this.Indent();
        if (Type.SuperClass != null) {
            Program += this.GetIndentString() + Type.SuperClass.ShortClassName + " __base;\n";
        }
        while (i < FieldList.size()) {
            var VarInfo = FieldList.get(i);
            var VarType = VarInfo.Type;
            var VarName = VarInfo.Name;
            Program += this.GetIndentString() + VarType.ShortClassName + " " + VarName + ";\n";
            this.DefinedClass.put(Type.ShortClassName, Program);
            var ParamList = new Array();
            ParamList.add(VarType);
            ParamList.add(Type);
            var GetterMethod = new GtMethod(0, VarName, 0, ParamList, null);
            NameSpace.Context.DefineGetterMethod(GetterMethod);
            i = i + 1;
        }
        this.UnIndent();
        Program += this.GetIndentString() + "}";
        this.WriteTranslatedCode(Program);
    };

    // 	public DefineClassMethod(NameSpace: GtNameSpace, Type: GtType, Method: GtMethod): void { //
    // 		var Program: string = <string> this.DefinedClass.get(Type.ShortClassName); //
    // 		this.Indent(); //
    // 		Program += this.GetIndentString() + Method.GetFuncType().ShortClassName + " " + Method.MangledName + ";\n"; //
    // 		this.UnIndent(); //
    // 		this.DefinedClass.put(Type.ShortClassName, Program); //
    // 	} //
    CSourceGenerator.prototype.AddClass = function (Type) {
        var TypeName = Type.ShortClassName;
        if (this.IsDefiendType(TypeName) == true) {
            return;
        }
        var Program = this.GetIndentString() + "struct: typedef " + TypeName;
        this.WriteTranslatedCode(Program + " " + TypeName + ";");
    };

    CSourceGenerator.prototype.SetLanguageContext = function (Context) {
        Context.Eval(LangDeps.LoadFile("lib/c/common.green"), 1);
    };
    return CSourceGenerator;
})(SourceGenerator);
