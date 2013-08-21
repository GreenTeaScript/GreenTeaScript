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



class JavaScriptSourceGenerator extends SourceGenerator {
	private UseLetKeyword: boolean;
	private IsNodeJS: boolean;

	 constructor(TargetCode: string, OutputFile: string, GeneratorFlag: number) {
		super(TargetCode, OutputFile, GeneratorFlag);
		this.IsNodeJS = LibGreenTea.EqualsString(TargetCode, "nodejs");
	}

	public  VisitBlockJS(Node: GtNode): string {
		var Code: string = "";
		var CurrentNode: GtNode = Node;
		while(CurrentNode != null) {
			var Statement: string = this.VisitNode(CurrentNode);
			if(Statement.trim().length >0) {
				Code += this.GetIndentString() + Statement + ";" + this.LineFeed;
			}
			CurrentNode = CurrentNode.NextNode;
		}
		return Code;
	}

	public  VisitBlockJSWithIndent(Node: GtNode): string {
		var Code: string = "";
		Code += "{" + this.LineFeed;
		this.Indent();
		Code += this.VisitBlockJS(Node);
		this.UnIndent();
		Code += this.GetIndentString() + "}";
		return Code;
	}

	public VisitBinaryNode(Node: BinaryNode): void {
		var FuncName: string = Node.Token.ParsedText;
		var Left: string = this.VisitNode(Node.LeftNode);
		var Right: string = this.VisitNode(Node.RightNode);
		var Source: string = "(" + SourceGenerator.GenerateApplyFunc2(Node.Func, FuncName, Left, Right) + ")";
		var operator: string = Node.Token.ParsedText;
		if(LibGreenTea.EqualsString(operator, "/") /*&& Node.Type == Context.IntType*/ ) {
			Source = "(" + Source + " | 0)";
		}
		this.PushSourceCode(Source);
	}

	public VisitLetNode(Node: LetNode): void {
		var VarName: string = Node.VariableName;
		var Source: string = (this.UseLetKeyword ? "let " : "var ") + " " + VarName;
		if(Node.InitNode != null) {
			Node.InitNode.Evaluate(this);
			Source += " = " + this.PopSourceCode();
		}
		Source +=  ";";
		this.VisitBlockJSWithIndent(Node.BlockNode);
		this.PushSourceCode(Source + this.PopSourceCode());
	}

	public VisitIfNode(Node: IfNode): void {
		var ThenBlock: string = this.VisitBlockJSWithIndent(Node.ThenNode);
		var CondExpr: string = this.VisitNode(Node.CondExpr);
		var Source: string = "if(" + CondExpr + ") " + ThenBlock;
		if(Node.ElseNode != null) {
			Source = Source + " else " + this.VisitBlockJSWithIndent(Node.ElseNode);
		}
		this.PushSourceCode(Source);
	}

	public VisitWhileNode(Node: WhileNode): void {
		var LoopBody: string = this.VisitBlockJSWithIndent(Node.LoopBody);
		var CondExpr: string = this.VisitNode(Node.CondExpr);
		this.PushSourceCode("while(" + CondExpr + ") {" + LoopBody + "}");
	}

	public VisitForNode(Node: ForNode): void {
		var LoopBody: string = this.VisitBlockJSWithIndent(Node.LoopBody);
		var IterExpr: string = this.VisitNode(Node.IterExpr);
		var CondExpr: string = this.VisitNode(Node.CondExpr);
		this.PushSourceCode("for(;" + CondExpr + "; " + IterExpr + ") {" + LoopBody + "}");
	}

	public VisitDoWhileNode(Node: DoWhileNode): void {
		var LoopBody: string = this.VisitBlockJSWithIndent(Node.LoopBody);
		var CondExpr: string = this.VisitNode(Node.CondExpr);
		this.PushSourceCode("do {" + LoopBody + "}while(" + CondExpr + ");");
	}

	public VisitTryNode(Node: TryNode): void {
		var Code: string = "try ";
		Code += this.VisitBlockJSWithIndent(Node.TryBlock);
		var Val: LetNode = <LetNode> Node.CatchExpr;
		Code += " catch (" + Val.Type.toString() + " " + Val.VariableName + ") ";
		Code += this.VisitBlockJSWithIndent(Node.CatchBlock);
		if(Node.FinallyBlock != null) {
			Code += " finally " + this.VisitBlockJSWithIndent(Node.FinallyBlock);
		}
		this.PushSourceCode(Code);
	}

	public VisitThrowNode(Node: ThrowNode): void {
		var Expr: string = this.VisitNode(Node.Expr);
		this.PushSourceCode("throw " + Expr);
	}

	public VisitErrorNode(Node: ErrorNode): void {
		var Expr: string = Node.Token.ParsedText;
		this.PushSourceCode("(function() {throw new Error(\"" + Expr + "\") })()");
	}

	public GenerateFunc(Func: GtFunc, NameList: Array<string>, Body: GtNode): void {
		var ArgCount: number = Func.Types.length - 1;
		var Code: string = "var " + Func.GetNativeFuncName() + " = (function(";
		var i: number = 0;
		while(i < ArgCount) {
			if(i > 0) {
				Code = Code + ", ";
			}
			Code = Code + NameList.get(i);
			i = i + 1;
		}
		Code = Code + ") " + this.VisitBlockJSWithIndent(Body) + ");";
		this.WriteLineCode(Code);
	}

/**
JavaScript code to be generated:

var CLASS = (function (_super) {
    __extends(CLASS, _super);                                #COMMENT23#
    function CLASS(param) {                                   #COMMENT24#
        _super.call(this, param);
        this.FIELD = param;                                      #COMMENT25#
    }
    CLASS.STATIC_FIELD = "value";                      #COMMENT26#
    
    CLASS.prototype.METHOD = function () {    #COMMENT27#
    }
    CLASS.STATIC_METHOD = function () {         #COMMENT28#
    }
    return CLASS;
})(SUPERCLASS);
 */
	public GenerateClassField(Type: GtType, ClassField: GtClassField): void {
		var TypeName: string = Type.ShortClassName;
		var Program: string = this.GetIndentString() + "var " + TypeName + " = (function() {" + this.LineFeed;
//		if(Type.SuperType != null) {
//			Program += "(" + Type.SuperType.ShortClassName + ")";
//		}
		this.Indent();
		Program += this.GetIndentString() + "function " + TypeName + "() {" + this.LineFeed;
		this.Indent();
		var i: number = 0;
		while(i < ClassField.FieldList.size()) {
			var FieldInfo: GtFieldInfo = ClassField.FieldList.get(i);
			var InitValue: string = this.StringifyConstValue(FieldInfo.InitValue);
			if(!FieldInfo.Type.IsNative()) {
				InitValue = this.NullLiteral;
			}
			Program += this.GetIndentString() + this.GetRecvName() + "." + FieldInfo.NativeName + " = " + InitValue + ";" + this.LineFeed;
			i = i + 1;
		}
		this.UnIndent();
		Program += this.GetIndentString() + "};" + this.LineFeed;
		Program += this.GetIndentString() + "return " + TypeName + ";" + this.LineFeed;
		this.UnIndent();
		Program += this.GetIndentString() + "})();" + this.LineFeed;
		this.WriteLineCode(Program);
	}
	public Eval(Node: GtNode): Object {
		var ret: string = this.VisitBlockJS(Node);
		this.WriteLineCode(ret);
		return ret;
	}

	public StartCompilationUnit(): void {
		if(this.IsNodeJS) {
			this.WriteLineCode("var assert = require('assert');");
		}
		else {			
			this.WriteLineCode("var assert = console.assert;");
		}
	}

	public InvokeMainFunc(MainFuncName: string): void {
		this.WriteLineCode(MainFuncName + "();");
	}
}