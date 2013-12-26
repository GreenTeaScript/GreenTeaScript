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

//ifdef JAVA
package org.GreenTeaScript;
import java.util.ArrayList;
//endif VAJA

import parser.GtClassField;
import parser.GtFieldInfo;
import parser.GtFunc;
import parser.GtSourceBuilder;
import parser.GtSourceGenerator;
import parser.GtSyntaxTree;
import parser.GtType;
import parser.ast.GtAllocateNode;
import parser.ast.GtAndNode;
import parser.ast.GtApplyFunctionObjectNode;
import parser.ast.GtApplyOverridedMethodNode;
import parser.ast.GtApplySymbolNode;
import parser.ast.GtArrayLiteralNode;
import parser.ast.GtBinaryNode;
import parser.ast.GtBreakNode;
import parser.ast.GtCastNode;
import parser.ast.GtCatchNode;
import parser.ast.GtCommandNode;
import parser.ast.GtConstPoolNode;
import parser.ast.GtConstructorNode;
import parser.ast.GtContinueNode;
import parser.ast.GtDoWhileNode;
import parser.ast.GtEmptyNode;
import parser.ast.GtErrorNode;
import parser.ast.GtForEachNode;
import parser.ast.GtForNode;
import parser.ast.GtFunctionLiteralNode;
import parser.ast.GtGetLocalNode;
import parser.ast.GtGetterNode;
import parser.ast.GtIfNode;
import parser.ast.GtInstanceOfNode;
import parser.ast.GtNewArrayNode;
import parser.ast.GtNode;
import parser.ast.GtNullNode;
import parser.ast.GtOrNode;
import parser.ast.GtPrefixDeclNode;
import parser.ast.GtPrefixInclNode;
import parser.ast.GtReturnNode;
import parser.ast.GtSetLocalNode;
import parser.ast.GtSetterNode;
import parser.ast.GtSliceNode;
import parser.ast.GtSuffixDeclNode;
import parser.ast.GtSuffixInclNode;
import parser.ast.GtSwitchNode;
import parser.ast.GtThrowNode;
import parser.ast.GtTrinaryNode;
import parser.ast.GtTryNode;
import parser.ast.GtUnaryNode;
import parser.ast.GtVarDeclNode;
import parser.ast.GtWhileNode;
import parser.deps.LibGreenTea;

public class JavaScriptSourceGenerator extends GtSourceGenerator {
//	/*field*/private boolean UseLetKeyword = false;
//	/*field*/private boolean IsForNodeJS = false;

	public JavaScriptSourceGenerator/*constructor*/(String TargetCode, String OutputFile, int GeneratorFlag) {
		super(TargetCode, OutputFile, GeneratorFlag);
	}
	
	@Override public void GenerateFunc(GtFunc Func, ArrayList<String> ParamNameList, GtNode Body) {
		/*local*/String MethodName = Func.GetNativeFuncName();
		/*local*/GtSourceBuilder Builder = new GtSourceBuilder(this);
		Builder.IndentAndAppend("function ");
		Builder.SpaceAppendSpace(MethodName);
		Builder.Append("(");
		/*local*/int i = 0;
		/*local*/int size = LibGreenTea.ListSize(ParamNameList);
		while(i < size) {
			if(i != 0) {
				Builder.Append(this.Camma);
			}
			Builder.Append(ParamNameList.get(i));
			i += 1;
		}
		Builder.Append(")");
		/*local*/GtSourceBuilder PushedBuilder = this.CurrentBuilder;
		this.CurrentBuilder = Builder;
		this.VisitIndentBlock("{", Body, "}");
		this.CurrentBuilder = PushedBuilder;
		System.out.println(Builder);
	}
	
/**
JavaScript code to be generated:

var CLASS = (function (_super) {
	    __extends(CLASS, _super);                                // Derived class only.
	    function CLASS(param) {                                   // Constructor.
	        _super.call(this, param);
	        this.FIELD = param;                                      // Field definition and initialization.
	    };
	    CLASS.STATIC_FIELD = "value";                      // Static fields
    
	    CLASS.prototype.METHOD = function () {    // Methods.
	    };
	    CLASS.STATIC_METHOD = function () {         // Static methods.
	    };
	    return CLASS;
})(SUPERCLASS);
 */
	
	@Override public void OpenClassField(GtSyntaxTree ParsedTree, GtType Type, GtClassField ClassField) {
		this.CurrentBuilder = this.NewSourceBuilder();
		this.CurrentBuilder.AppendIndent();
		this.CurrentBuilder.Append("var  ");
		this.CurrentBuilder.Append(Type.ShortName);
		this.CurrentBuilder.AppendLine(" = (function(_super) {");
		this.CurrentBuilder.Indent();
		
		if(Type.SuperType != null){
			this.CurrentBuilder.AppendIndent();
			this.CurrentBuilder.Append("__extends(");
			this.CurrentBuilder.Append(Type.ShortName);
			this.CurrentBuilder.AppendLine(", _super);");
		}
		
		this.CurrentBuilder.AppendIndent();
		this.CurrentBuilder.Append("function ");
		this.CurrentBuilder.Append(Type.ShortName);
		this.CurrentBuilder.Append("(");
		this.CurrentBuilder.AppendLine(") {");
		this.CurrentBuilder.Indent();
		
		/*local*/int i = 0;
		/*local*/int size = LibGreenTea.ListSize(ClassField.FieldList);
		while(i < size) {
			/*local*/GtFieldInfo FieldInfo = ClassField.FieldList.get(i);
			/*local*/String InitValue = this.StringifyConstValue(FieldInfo.InitValue);
			if(!FieldInfo.Type.IsNativeType()) {
				InitValue = this.NullLiteral;
			}
			this.CurrentBuilder.AppendIndent();
			this.CurrentBuilder.Append("this.");
			this.CurrentBuilder.Append(FieldInfo.NativeName);
			this.CurrentBuilder.Append(" = ");
			this.CurrentBuilder.Append(InitValue);
			this.CurrentBuilder.AppendLine(this.SemiColon);
			i += 1;
		}
		this.CurrentBuilder.UnIndent();
		this.CurrentBuilder.AppendIndent();
		this.CurrentBuilder.AppendLine("};");
		this.CurrentBuilder.AppendIndent();
		this.CurrentBuilder.Append("return  ");
		this.CurrentBuilder.Append(Type.ShortName);
		this.CurrentBuilder.AppendLine(";");
		this.CurrentBuilder.Append("})");
		if(Type.SuperType != null){
			this.CurrentBuilder.Append("(");
			this.CurrentBuilder.Append(Type.SuperType.ShortName);
			this.CurrentBuilder.Append(")");
		}
		this.CurrentBuilder.AppendLine(";");
	}

	@Override public void InvokeMainFunc(String MainFuncName) {
		this.CurrentBuilder = this.NewSourceBuilder();
		this.CurrentBuilder.Append(MainFuncName);
		this.CurrentBuilder.AppendLine("();");
	}
	
	private final boolean DoesNodeExist(GtNode Node){
		return Node != null && !(Node instanceof GtEmptyNode);
	}
	
	private final void DebugAppendNode(GtNode Node){
		this.CurrentBuilder.Append("/* ");
		this.CurrentBuilder.Append(Node.getClass().getSimpleName());
		this.CurrentBuilder.Append(" */");
		if(Node.NextNode != null){
			Node.NextNode.Accept(this); 
		}
	}

	@Override public void VisitEmptyNode(GtEmptyNode EmptyNode) {
		LibGreenTea.DebugP("empty node: " + EmptyNode.Token.ParsedText);
	}
	@Override public void VisitInstanceOfNode(GtInstanceOfNode Node) {
		/*extention*/
	}
//	@Override public void VisitSelfAssignNode(GtSelfAssignNode Node) {
//		Node.LeftNode.Accept(this);
//		this.VisitingBuilder.Append(Node.Token.ParsedText);
//		Node.RightNode.Accept(this);
//	}
	@Override public void VisitTrinaryNode(GtTrinaryNode Node) {
		Node.CondNode.Accept(this);
		this.CurrentBuilder.Append(" ? ");
		Node.ThenNode.Accept(this);
		this.CurrentBuilder.Append(" : ");
		Node.ElseNode.Accept(this);
	}
//	@Override public void VisitExistsNode(GtExistsNode Node) {
//		this.DebugAppendNode(Node);
//	}
	@Override public void VisitCastNode(GtCastNode Node) {
		this.DebugAppendNode(Node);
	}
	@Override public void VisitSliceNode(GtSliceNode Node) {
		this.DebugAppendNode(Node);
	}
	@Override public void VisitSuffixInclNode(GtSuffixInclNode Node) {
		this.DebugAppendNode(Node);
	}
	@Override public void VisitSuffixDeclNode(GtSuffixDeclNode Node) {
		this.DebugAppendNode(Node);
	}
	@Override public void VisitPrefixInclNode(GtPrefixInclNode Node) {
		this.DebugAppendNode(Node);
	}
	@Override public void VisitPrefixDeclNode(GtPrefixDeclNode Node) {
		this.DebugAppendNode(Node);
	}
	@Override public void VisitUnaryNode(GtUnaryNode Node) {
		this.CurrentBuilder.Append(Node.Token.ParsedText);
		Node.RecvNode.Accept(this);
	}
//	@Override public void VisitIndexerNode(GtIndexerNode Node) {
//		this.VisitingBuilder.Append("[");
//		Node.Expr.Accept(this);
//		this.VisitingBuilder.Append("]");
//	}
	@Override public void VisitArrayLiteralNode(GtArrayLiteralNode Node) {
		this.DebugAppendNode(Node);
	}
	@Override public void VisitNewArrayNode(GtNewArrayNode Node) {
		this.DebugAppendNode(Node);
	}
	@Override public void VisitWhileNode(GtWhileNode Node) {
		this.DebugAppendNode(Node);
	}
	@Override public void VisitDoWhileNode(GtDoWhileNode Node) {
		this.DebugAppendNode(Node);
	}
	@Override public void VisitForNode(GtForNode Node) {
		this.DebugAppendNode(Node);
	}
	@Override public void VisitForEachNode(GtForEachNode Node) {
		this.DebugAppendNode(Node);
	}
	@Override public void VisitConstPoolNode(GtConstPoolNode Node) {
		this.CurrentBuilder.Append(Node.Token.ParsedText);
	}
	@Override public void VisitAllocateNode(GtAllocateNode Node) {
		this.CurrentBuilder.Append("new ");
		this.CurrentBuilder.Append(Node.Type.ShortName);
		this.CurrentBuilder.Append("()");
	}
	@Override public void VisitConstructorNode(GtConstructorNode Node) {
		this.DebugAppendNode(Node);
	}
	@Override public void VisitNullNode(GtNullNode Node) {
		this.CurrentBuilder.Append(this.NullLiteral);
	}
	@Override public void VisitGetLocalNode(GtGetLocalNode Node) {
		this.CurrentBuilder.Append(Node.Token.ParsedText);
	}
	@Override public void VisitGetterNode(GtGetterNode Node) {
		Node.RecvNode.Accept(this);
		this.CurrentBuilder.Append(".");
		this.CurrentBuilder.Append(Node.NativeName);
	}
	@Override public void VisitSetterNode(GtSetterNode Node) {
		Node.RecvNode.Accept(this);
		this.CurrentBuilder.Append(".");
		this.CurrentBuilder.Append(Node.NativeName);
		this.CurrentBuilder.Append(" = ");
		Node.ValueNode.Accept(this);
	}
	@Override public void VisitApplySymbolNode(GtApplySymbolNode Node) {
		this.CurrentBuilder.Append(Node.NativeName);
		this.CurrentBuilder.Append("(");
		for(/*local*/int i = 0; i < LibGreenTea.ListSize(Node.ParamList); i++){
			if(i > 0){
				this.CurrentBuilder.Append(", ");
			}
			Node.ParamList.get(i).Accept(this);
		}
		this.CurrentBuilder.Append(")");
	}
	@Override public void VisitApplyOverridedMethodNode(GtApplyOverridedMethodNode Node) {
		this.CurrentBuilder.Append(Node.Func.GetNativeFuncName());
		this.CurrentBuilder.Append("(");
		for(/*local*/int i = 0; i < LibGreenTea.ListSize(Node.ParamList); i++){
			if(i > 0){
				this.CurrentBuilder.Append(", ");
			}
			Node.ParamList.get(i).Accept(this);
		}
		this.CurrentBuilder.Append(")");
	}
	
	// e. g  (function(...){...})(...)
	@Override public void VisitApplyFunctionObjectNode(GtApplyFunctionObjectNode Node) {
		this.CurrentBuilder.Append("(");
		Node.FuncNode.Accept(this);
		this.CurrentBuilder.Append(")");
		this.CurrentBuilder.Append("(");
		for(/*local*/int i = 0; i < LibGreenTea.ListSize(Node.ParamList); i++){
			if(i > 0){
				this.CurrentBuilder.Append(", ");
			}
			Node.ParamList.get(i).Accept(this);
		}
		this.CurrentBuilder.Append(")");
	}
	@Override public void VisitBinaryNode(GtBinaryNode Node) {
		Node.LeftNode.Accept(this);
		this.CurrentBuilder.Append(Node.Token.ParsedText);
		Node.RightNode.Accept(this);
	}
	@Override public void VisitAndNode(GtAndNode Node) {
		Node.LeftNode.Accept(this);
		this.CurrentBuilder.Append("&&");
		Node.RightNode.Accept(this);
	}
	@Override public void VisitOrNode(GtOrNode Node) {
		Node.LeftNode.Accept(this);
		this.CurrentBuilder.Append("||");
		Node.RightNode.Accept(this);
	}
	@Override public void VisitSetLocalNode(GtSetLocalNode Node) {
		this.CurrentBuilder.Append(Node.NativeName);
		this.CurrentBuilder.Append(" = ");
		Node.ValueNode.Accept(this);
	}
	@Override public void VisitVarDeclNode(GtVarDeclNode Node) {
		this.CurrentBuilder.Append(Node.NativeName);
		this.CurrentBuilder.Append(" = ");
		Node.InitNode.Accept(this);
		Node.BlockNode.Accept(this);
	}
	@Override public void VisitIfNode(GtIfNode Node) {
		this.CurrentBuilder.Append("if(");
		Node.CondNode.Accept(this);
		this.CurrentBuilder.Append(")");
		this.VisitIndentBlock("{", Node.ThenNode, "}");
		if(this.DoesNodeExist(Node.ElseNode)){
			this.CurrentBuilder.Append("else");
			this.VisitIndentBlock("{", Node.ElseNode, "}");
		}
	}
	@Override public void VisitSwitchNode(GtSwitchNode Node) {
		this.DebugAppendNode(Node);
	}
	@Override public void VisitReturnNode(GtReturnNode Node) {
		this.CurrentBuilder.Append("return");
		if(this.DoesNodeExist(Node.ValueNode)){
			this.CurrentBuilder.Append(" ");
			Node.ValueNode.Accept(this);
		}
	}
	@Override public void VisitBreakNode(GtBreakNode Node) {
		this.CurrentBuilder.Append("break");
	}
	@Override public void VisitContinueNode(GtContinueNode Node) {
		this.CurrentBuilder.Append("continue");
	}
	@Override public void VisitTryNode(GtTryNode Node) {
		this.CurrentBuilder.Append("try");
		this.VisitIndentBlock("{", Node.TryNode, "}");
		assert(LibGreenTea.ListSize(Node.CatchList) <= 1);
		for (int i = 0; i < LibGreenTea.ListSize(Node.CatchList); i++) {
			GtCatchNode Catch = (/*cast*/GtCatchNode) Node.CatchList.get(i);
			this.CurrentBuilder.Append("catch(" + Catch.ExceptionName + ")");
			this.VisitIndentBlock("{", Catch.BodyNode, "}");
		}
		this.CurrentBuilder.Append("finally");
		this.VisitIndentBlock("{", Node.FinallyNode, "}");
	}
	@Override public void VisitThrowNode(GtThrowNode Node) {
		this.CurrentBuilder.Append("throw ");
		Node.ValueNode.Accept(this);
	}
	@Override public void VisitFunctionLiteralNode(GtFunctionLiteralNode Node) {
		this.DebugAppendNode(Node);
	}
	@Override public void VisitErrorNode(GtErrorNode Node) {
		this.CurrentBuilder.Append("(function(){ throw new Error('");
		this.CurrentBuilder.Append(Node.Token.ParsedText);
		this.CurrentBuilder.Append("'); })()");
	}
	@Override public void VisitCommandNode(GtCommandNode Node) {
		this.DebugAppendNode(Node);
	}

	
//
//	JavaScriptSourceGenerator/*constructor*/(String TargetCode, String OutputFile, int GeneratorFlag) {
//		super(TargetCode, OutputFile, GeneratorFlag);
//		this.IsNodeJS = LibGreenTea.EqualsString(TargetCode, "nodejs");
//		this.HasLabelSupport= false;
//		this.LogicalAndOperator = "&&";
//		this.LogicalOrOperator = "||";
//		this.MemberAccessOperator = ".";
//		this.TrueLiteral = "true";
//		this.FalseLiteral = "false";
//		this.NullLiteral = "null";
//		this.LineComment = "//";
//		this.BreakKeyword = "break";
//		this.ContinueKeyword = "continue";
//		this.ParameterBegin = "(";
//		this.ParameterEnd = ")";
//		this.ParameterDelimiter = ",";
//		this.SemiColon = ";";
//		this.BlockBegin = "{";
//		this.BlockEnd = "}";
//	}
//
//	
//	public String VisitBlockJS(GtNode Node) {
//		/*local*/String Code = "";
//		/*local*/GtNode CurrentNode = Node;
//		while(CurrentNode != null) {
//			/*local*/String Statement = this.VisitNode(CurrentNode);
//			if(Statement.trim().length() >0) {
//				Code += this.GetIndentString() + Statement + ";" + this.LineFeed;
//			}
//			CurrentNode = CurrentNode.NextNode;
//		}
//		return Code;
//	}
//
//	public String VisitBlockJSWithIndent(GtNode Node) {
//		/*local*/String Code = "";
//		Code += "{" + this.LineFeed;
//		this.Indent();
//		Code += this.VisitBlockJS(Node);
//		this.UnIndent();
//		Code += this.GetIndentString() + "}";
//		return Code;
//	}
//
//	@Override public void VisitBinaryNode(GtBinaryNode Node) {
//		/*local*/String FuncName = Node.Token.ParsedText;
//		/*local*/String Left = this.VisitNode(Node.LeftNode);
//		/*local*/String Right = this.VisitNode(Node.RightNode);
//		/*local*/String Source = "(" + SourceGenerator.GenerateApplyFunc2(Node.Func, FuncName, Left, Right) + ")";
//		/*local*/String operator = Node.Token.ParsedText;
//		if(LibGreenTea.EqualsString(operator, "/") /*&& Node.Type == Context.IntType*/ ) {
//			Source = "(" + Source + " | 0)";
//		}
//		this.PushSourceCode(Source);
//	}
//
//	@Override public void VisitVarNode(GtVarNode Node) {
//		/*local*/String VarName = Node.NativeName;
//		/*local*/String Source = (this.UseLetKeyword ? "let " : "var ") + " " + VarName;
//		if(Node.InitNode != null) {
//			Node.InitNode.Accept(this);
//			Source += " = " + this.PopSourceCode();
//		}
//		Source +=  ";";
//		Source += this.VisitBlockJSWithIndent(Node.BlockNode);
//		this.PushSourceCode(Source);
//	}
//
//	@Override public void VisitIfNode(GtIfNode Node) {
//		/*local*/String ThenBlock = this.VisitBlockJSWithIndent(Node.ThenNode);
//		/*local*/String CondExpr = this.VisitNode(Node.CondExpr);
//		/*local*/String Source = "if(" + CondExpr + ") " + ThenBlock;
//		if(Node.ElseNode != null) {
//			Source = Source + " else " + this.VisitBlockJSWithIndent(Node.ElseNode);
//		}
//		this.PushSourceCode(Source);
//	}
//
//	@Override public void VisitWhileNode(GtWhileNode Node) {
//		/*local*/String LoopBody = this.VisitBlockJSWithIndent(Node.LoopBody);
//		/*local*/String CondExpr = this.VisitNode(Node.CondExpr);
//		this.PushSourceCode("while(" + CondExpr + ") {" + LoopBody + "}");
//	}
//
//	@Override public void VisitForNode(GtForNode Node) {
//		/*local*/String LoopBody = this.VisitBlockJSWithIndent(Node.LoopBody);
//		/*local*/String IterExpr = this.VisitNode(Node.IterExpr);
//		/*local*/String CondExpr = this.VisitNode(Node.CondExpr);
//		this.PushSourceCode("for(;" + CondExpr + "; " + IterExpr + ") {" + LoopBody + "}");
//	}
//
//	@Override public void VisitDoWhileNode(GtDoWhileNode Node) {
//		/*local*/String LoopBody = this.VisitBlockJSWithIndent(Node.LoopBody);
//		/*local*/String CondExpr = this.VisitNode(Node.CondExpr);
//		this.PushSourceCode("do {" + LoopBody + "} while(" + CondExpr + ");");
//	}
//
//	@Override public void VisitTryNode(GtTryNode Node) {
//		/*local*/String Code = "try ";
//		Code += this.VisitBlockJSWithIndent(Node.TryBlock);
//		if(Node.CatchExpr != null) {
//			/*local*/GtVarNode Val = (/*cast*/GtVarNode) Node.CatchExpr;
//			Code += " catch (" + Val.Type.toString() + " " + Val.NativeName + ") ";
//			Code += this.VisitBlockJSWithIndent(Node.CatchBlock);
//		}
//		if(Node.FinallyBlock != null) {
//			Code += " finally " + this.VisitBlockJSWithIndent(Node.FinallyBlock);
//		}
//		this.PushSourceCode(Code);
//	}
//
//	@Override public void VisitThrowNode(GtThrowNode Node) {
//		/*local*/String Expr = this.VisitNode(Node.Expr);
//		this.PushSourceCode("throw " + Expr);
//	}
//
//	@Override public void VisitErrorNode(GtErrorNode Node) {
//		/*local*/String Expr = Node.Token.ParsedText;
//		this.PushSourceCode("(function() {throw new Error(\"" + Expr + "\") })()");
//	}
//
//	@Override public void GenerateFunc(GtFunc Func, ArrayList<String> NameList, GtNode Body) {
//		this.FlushErrorReport();
//		/*local*/int ArgCount = Func.Types.length - 1;
//		/*local*/String Code = "var " + Func.GetNativeFuncName() + " = (function(";
//		/*local*/int i = 0;
//		while(i < ArgCount) {
//			if(i > 0) {
//				Code = Code + ", ";
//			}
//			Code = Code + NameList.get(i);
//			i = i + 1;
//		}
//		Code = Code + ") " + this.VisitBlockJSWithIndent(Body) + ");";
//		this.WriteLineCode(Code);
//	}
//
///**
//JavaScript code to be generated:
//
//var CLASS = (function (_super) {
//    __extends(CLASS, _super);                                // Derived class only.
//    function CLASS(param) {                                   // Constructor.
//        _super.call(this, param);
//        this.FIELD = param;                                      // Field definition and initialization.
//    };
//    CLASS.STATIC_FIELD = "value";                      // Static fields
//    
//    CLASS.prototype.METHOD = function () {    // Methods.
//    };
//    CLASS.STATIC_METHOD = function () {         // Static methods.
//    };
//    return CLASS;
//})(SUPERCLASS);
// */
//	@Override public void OpenClassField(GtSyntaxTree ParsedTree, GtType Type, GtClassField ClassField) {
//		/*local*/String TypeName = Type.ShortName;
//		/*local*/String Program = this.GetIndentString() + "var " + TypeName + " = (function() {" + this.LineFeed;
////		if(Type.SuperType != null) {
////			Program += "(" + Type.SuperType.ShortClassName + ")";
////		}
//		this.Indent();
//		Program += this.GetIndentString() + "function " + TypeName + "() {" + this.LineFeed;
//		this.Indent();
//		/*local*/int i = 0;
//		while(i < ClassField.FieldList.size()) {
//			/*local*/GtFieldInfo FieldInfo = ClassField.FieldList.get(i);
//			/*local*/String InitValue = this.StringifyConstValue(FieldInfo.InitValue);
//			if(!FieldInfo.Type.IsNativeType()) {
//				InitValue = this.NullLiteral;
//			}
//			Program += this.GetIndentString() + "this" + "." + FieldInfo.NativeName + " = " + InitValue + ";" + this.LineFeed;
//			i = i + 1;
//		}
//		this.UnIndent();
//		Program += this.GetIndentString() + "};" + this.LineFeed;
//		Program += this.GetIndentString() + "return " + TypeName + ";" + this.LineFeed;
//		this.UnIndent();
//		Program += this.GetIndentString() + "})();" + this.LineFeed;
//		this.WriteLineCode(Program);
//	}
//	@Override public Object Eval(GtNode Node) {
//		/*local*/String ret = this.VisitBlockJS(Node);
//		this.WriteLineCode(ret);
//		return ret;
//	}
//
//	@Override public void StartCompilationUnit() {
//		if(this.IsNodeJS) {
//			this.WriteLineCode("var assert = require('assert');");
//		}
//		else {			
//			this.WriteLineCode("var assert = console.assert;");
//		}
//	}
//
//	@Override public void InvokeMainFunc(String MainFuncName) {
//		this.WriteLineCode(MainFuncName + "();");
//	}
//	@Override public String GetRecvName() {
//		return "$__this";
//	}
}
