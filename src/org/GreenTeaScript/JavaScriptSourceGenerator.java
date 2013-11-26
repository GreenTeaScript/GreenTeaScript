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

public class JavaScriptSourceGenerator extends GtSourceGenerator {
	/*field*/private boolean UseLetKeyword = false;
	/*field*/private boolean IsForNodeJS = false;
	
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
		/*local*/GtSourceBuilder PushedBuilder = this.VisitingBuilder;
		this.VisitingBuilder = Builder;
		this.VisitIndentBlock("{", Body, "}");
		this.VisitingBuilder = PushedBuilder;
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
		this.VisitingBuilder = this.NewSourceBuilder();
		this.VisitingBuilder.AppendIndent();
		this.VisitingBuilder.Append("var  ");
		this.VisitingBuilder.Append(Type.ShortName);
		this.VisitingBuilder.AppendLine(" = (function(_super) {");
		this.VisitingBuilder.Indent();
		
		if(Type.SuperType != null){
			this.VisitingBuilder.AppendIndent();
			this.VisitingBuilder.Append("__extends(");
			this.VisitingBuilder.Append(Type.ShortName);
			this.VisitingBuilder.AppendLine(", _super);");
		}
		
		this.VisitingBuilder.AppendIndent();
		this.VisitingBuilder.Append("function ");
		this.VisitingBuilder.Append(Type.ShortName);
		this.VisitingBuilder.Append("(");
		this.VisitingBuilder.AppendLine(") {");
		this.VisitingBuilder.Indent();
		
		/*local*/int i = 0;
		/*local*/int size = LibGreenTea.ListSize(ClassField.FieldList);
		while(i < size) {
			/*local*/GtFieldInfo FieldInfo = ClassField.FieldList.get(i);
			/*local*/String InitValue = this.StringifyConstValue(FieldInfo.InitValue);
			if(!FieldInfo.Type.IsNativeType()) {
				InitValue = this.NullLiteral;
			}
			this.VisitingBuilder.AppendIndent();
			this.VisitingBuilder.Append("this.");
			this.VisitingBuilder.Append(FieldInfo.NativeName);
			this.VisitingBuilder.Append(" = ");
			this.VisitingBuilder.Append(InitValue);
			this.VisitingBuilder.AppendLine(this.SemiColon);
			i += 1;
		}
		this.VisitingBuilder.UnIndent();
		this.VisitingBuilder.AppendIndent();
		this.VisitingBuilder.AppendLine("};");
		this.VisitingBuilder.AppendIndent();
		this.VisitingBuilder.Append("return  ");
		this.VisitingBuilder.Append(Type.ShortName);
		this.VisitingBuilder.AppendLine(";");
		this.VisitingBuilder.Append("})");
		if(Type.SuperType != null){
			this.VisitingBuilder.Append("(");
			this.VisitingBuilder.Append(Type.SuperType.ShortName);
			this.VisitingBuilder.Append(")");
		}
		this.VisitingBuilder.AppendLine(";");
	}

	@Override public void InvokeMainFunc(String MainFuncName) {
		this.VisitingBuilder = this.NewSourceBuilder();
		this.VisitingBuilder.Append(MainFuncName);
		this.VisitingBuilder.AppendLine("();");
	}
	
	private final boolean DoesNodeExist(GtNode Node){
		return Node != null && !(Node instanceof GtEmptyNode);
	}
	
	private final void DebugAppendNode(GtNode Node){
		this.VisitingBuilder.Append("/* ");
		this.VisitingBuilder.Append(Node.getClass().getSimpleName());
		this.VisitingBuilder.Append(" */");
	}

	@Override public void VisitEmptyNode(GtEmptyNode EmptyNode) {
		LibGreenTea.DebugP("empty node: " + EmptyNode.Token.ParsedText);
	}
	@Override public void VisitInstanceOfNode(GtInstanceOfNode Node) {
		/*extention*/
	}
	@Override public void VisitSelfAssignNode(GtSelfAssignNode Node) {
		Node.LeftNode.Evaluate(this);
		this.VisitingBuilder.Append(Node.Token.ParsedText);
		Node.RightNode.Evaluate(this);
	}
	@Override public void VisitTrinaryNode(GtTrinaryNode Node) {
		Node.ConditionNode.Evaluate(this);
		this.VisitingBuilder.Append(" ? ");
		Node.ThenNode.Evaluate(this);
		this.VisitingBuilder.Append(" : ");
		Node.ElseNode.Evaluate(this);
	}
	@Override public void VisitExistsNode(GtExistsNode Node) {
		this.DebugAppendNode(Node);
	}
	@Override public void VisitCastNode(GtCastNode Node) {
		this.DebugAppendNode(Node);
	}
	@Override public void VisitSliceNode(GtSliceNode Node) {
		this.DebugAppendNode(Node);
	}
	@Override public void VisitSuffixNode(GtSuffixNode Node) {
		this.DebugAppendNode(Node);
	}
	@Override public void VisitUnaryNode(GtUnaryNode Node) {
		this.VisitingBuilder.Append(Node.Token.ParsedText);
		Node.Expr.Evaluate(this);
	}
	@Override public void VisitIndexerNode(GtIndexerNode Node) {
		this.VisitingBuilder.Append("[");
		Node.Expr.Evaluate(this);
		this.VisitingBuilder.Append("]");
	}
	@Override public void VisitArrayNode(GtArrayNode Node) {
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
	@Override public void VisitConstNode(GtConstNode Node) {
		this.VisitingBuilder.Append(Node.Token.ParsedText);
	}
	@Override public void VisitNewNode(GtNewNode Node) {
		this.DebugAppendNode(Node);
	}
	@Override public void VisitConstructorNode(GtConstructorNode Node) {
		this.DebugAppendNode(Node);
	}
	@Override public void VisitNullNode(GtNullNode Node) {
		this.VisitingBuilder.Append(this.NullLiteral);
	}
	@Override public void VisitLocalNode(GtLocalNode Node) {
		this.VisitingBuilder.Append(Node.Token.ParsedText);
	}
	@Override public void VisitGetterNode(GtGetterNode Node) {
		this.DebugAppendNode(Node);
	}
	@Override public void VisitSetterNode(GtSetterNode Node) {
		this.DebugAppendNode(Node);
	}
	@Override public void VisitDyGetterNode(GtDyGetterNode Node) {
		this.DebugAppendNode(Node);
	}
	@Override public void VisitDySetterNode(GtDySetterNode Node) {
		this.DebugAppendNode(Node);
	}
	@Override public void VisitStaticApplyNode(GtStaticApplyNode Node) {
		this.VisitingBuilder.Append(Node.Func.GetNativeFuncName());
		this.VisitingBuilder.Append("(");
		for(/*local*/int i = 0; i < LibGreenTea.ListSize(Node.ParamList); i++){
			Node.ParamList.get(i).Evaluate(this);
		}
		this.VisitingBuilder.Append(")");
	}
	@Override public void VisitApplyOverridedMethodNode(GtApplyOverridedMethodNode Node) {
		this.DebugAppendNode(Node);
	}
	@Override public void VisitApplyFuncNode(GtApplyFuncNode Node) {
		this.DebugAppendNode(Node);
	}
	@Override public void VisitApplyDynamicFuncNode(GtApplyDynamicFuncNode Node) {
		this.DebugAppendNode(Node);
	}
	@Override public void VisitApplyDynamicMethodNode(GtApplyDynamicMethodNode Node) {
		this.DebugAppendNode(Node);
	}
	@Override public void VisitBinaryNode(GtBinaryNode Node) {
		Node.LeftNode.Evaluate(this);
		this.VisitingBuilder.Append(Node.Token.ParsedText);
		Node.RightNode.Evaluate(this);
	}
	@Override public void VisitAndNode(GtAndNode Node) {
		this.DebugAppendNode(Node);
	}
	@Override public void VisitOrNode(GtOrNode Node) {
		this.DebugAppendNode(Node);
	}
	@Override public void VisitAssignNode(GtAssignNode Node) {
		this.DebugAppendNode(Node);
	}
	@Override public void VisitVarNode(GtVarNode Node) {
		this.DebugAppendNode(Node);
	}
	@Override public void VisitIfNode(GtIfNode Node) {
		this.VisitingBuilder.Append("if(");
		Node.CondExpr.Evaluate(this);
		this.VisitingBuilder.Append(")");
		this.VisitIndentBlock("{", Node.ThenNode, "}");
		if(this.DoesNodeExist(Node.ElseNode)){
			this.VisitingBuilder.Append("else");
			this.VisitIndentBlock("{", Node.ElseNode, "}");
		}
	}
	@Override public void VisitSwitchNode(GtSwitchNode Node) {
		this.DebugAppendNode(Node);
	}
	@Override public void VisitReturnNode(GtReturnNode Node) {
		this.VisitingBuilder.Append("return");
		if(this.DoesNodeExist(Node.Expr)){
			this.VisitingBuilder.Append(" ");
			Node.Expr.Evaluate(this);
		}
	}
	@Override public void VisitBreakNode(GtBreakNode Node) {
		this.VisitingBuilder.Append("break");
	}
	@Override public void VisitContinueNode(GtContinueNode Node) {
		this.VisitingBuilder.Append("continue");
	}
	@Override public void VisitTryNode(GtTryNode Node) {
		this.DebugAppendNode(Node);
	}
	@Override public void VisitThrowNode(GtThrowNode Node) {
		this.DebugAppendNode(Node);
	}
	@Override public void VisitFunctionNode(GtFunctionNode Node) {
		this.DebugAppendNode(Node);
	}
	@Override public void VisitErrorNode(GtErrorNode Node) {
		this.DebugAppendNode(Node);
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
//			Node.InitNode.Evaluate(this);
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
