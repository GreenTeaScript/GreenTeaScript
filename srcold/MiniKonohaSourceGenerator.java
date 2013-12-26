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
import parser.ast.GtAndNode;
import parser.ast.GtApplyFunctionObjectNode;
import parser.ast.GtApplyOverridedMethodNode;
import parser.ast.GtApplySymbolNode;
import parser.ast.GtArrayLiteralNode;
import parser.ast.GtBinaryNode;
import parser.ast.GtBreakNode;
import parser.ast.GtCastNode;
import parser.ast.GtCommandNode;
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
import parser.ast.GtReturnNode;
import parser.ast.GtSetLocalNode;
import parser.ast.GtSetterNode;
import parser.ast.GtSliceNode;
import parser.ast.GtSwitchNode;
import parser.ast.GtThrowNode;
import parser.ast.GtTrinaryNode;
import parser.ast.GtTryNode;
import parser.ast.GtUnaryNode;
import parser.ast.GtVarDeclNode;
import parser.ast.GtWhileNode;
import parser.deps.LibGreenTea;

public class MiniKonohaSourceGenerator extends GtSourceGenerator {
	/*field*/private ArrayList<String> UsedLibrary;
	
	public MiniKonohaSourceGenerator(String TargetCode, String OutputFile, int GeneratorFlag) {
		super(TargetCode, OutputFile, GeneratorFlag);
		this.UsedLibrary = new ArrayList<String>();
	}

	@Override
	public void GenerateFunc(GtFunc Func, ArrayList<String> ParamNameList, GtNode Body) {
		String MethodName = Func.GetNativeFuncName();
		GtSourceBuilder Builder = this.NewSourceBuilder();
		Builder.IndentAndAppend(this.ConvertToNativeTypeName(Func.GetReturnType()));
		Builder.SpaceAppendSpace(MethodName);
		Builder.Append("(");
		/*local*/int i = 0;
		/*local*/int size = LibGreenTea.ListSize(ParamNameList);
		while(i < size) {
			if(i != 0) {
				Builder.Append(this.Camma);
			}
			Builder.Append(this.ConvertToNativeTypeName(Func.GetFuncParamType(i)));
			Builder.SpaceAppendSpace(ParamNameList.get(i));
			i += 1;
		}
		Builder.Append(")");
		GtSourceBuilder PushedBuilder = this.CurrentBuilder;
		this.CurrentBuilder = Builder;
		this.VisitIndentBlock("{", Body, "}");
		this.CurrentBuilder.AppendLine("");
		this.CurrentBuilder = PushedBuilder;
	}

	private void AddUseLibrary(String Library) {
		if(this.UsedLibrary.indexOf(Library) == (-1)) {
			this.UsedLibrary.add(Library);
		}
		return;
	}
	
	private String ConvertToNativeFuncName(GtFunc Func) {
		if(Func.FuncName.equals("assert")) {
			return "assert";
		}
		return Func.GetNativeFuncName();
	}
	private String ConvertToNativeTypeName(GtType Type) {
		if(Type.IsIntType()) {
			return "int";
		}
		else if(Type.IsFloatType()) {
			this.AddUseLibrary("Type.Float");
			return "float";
		}
		else if(Type.IsBooleanType()) {
			return "boolean";
		}
		else if(Type.IsStringType()) {
			return "String";
		}
		else if(Type.IsArrayType()){
			this.AddUseLibrary("JavaScript.Array");
			return this.ConvertToNativeTypeName(Type.TypeParams[0])+ "[]";
		}
		return Type.ShortName;
	}
	private void VisitBlockWithoutIndent(GtNode Node) {
		/*local*/GtNode CurrentNode = Node;
		while(CurrentNode != null) {
			if(!this.IsEmptyBlock(CurrentNode)) {
				this.CurrentBuilder.AppendIndent();
				CurrentNode.Accept(this);
				this.CurrentBuilder.AppendLine(this.SemiColon);
			}
			CurrentNode = CurrentNode.NextNode;
		}
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
	
	private String GetHeaderCode() {
		String HeaderCode = "";
		for(String Library : this.UsedLibrary) {
			HeaderCode += "import(\"" + Library + "\")\n";
		}
		HeaderCode += "\n";
		return HeaderCode;
	}

	@Override public String GetSourceCode() {		
		return this.GetHeaderCode() + super.GetSourceCode();
	}

//	@Override public void FlushBuffer() {
//		if(this.OutputFile.equals("-")) {
//			LibGreenTea.WriteCode(this.OutputFile, this.GetHeaderCode());
//			super.FlushBuffer();			
//		}
//		else {
//			String PushedSourceCode = this.GetSourceCode();
//			super.FlushBuffer();
//			LibGreenTea.WriteCode(this.OutputFile, PushedSourceCode);
//		}
//	}

	@Override public void OpenClassField(GtSyntaxTree ParsedTree, GtType Type, GtClassField ClassField) {
		this.AddUseLibrary("Syntax.JavaStyleClass");
		this.CurrentBuilder = this.NewSourceBuilder();
		this.CurrentBuilder.AppendIndent();
		this.CurrentBuilder.Append("class ");
		this.CurrentBuilder.Append(Type.ShortName);
		//if(Type.SuperType != null){
		if(!Type.SuperType.ShortName.equals("Top")){
			this.CurrentBuilder.SpaceAppendSpace("extends");
			this.CurrentBuilder.Append(Type.SuperType.ShortName);
		}
		this.CurrentBuilder.AppendLine(" {");
		this.CurrentBuilder.Indent();
		
		/*local*/int i = 0;
		/*local*/int size = LibGreenTea.ListSize(ClassField.FieldList);
		while(i < size) {
			/*local*/GtFieldInfo FieldInfo = ClassField.FieldList.get(i);
			/*local*/String InitValue = this.StringifyConstValue(FieldInfo.InitValue);
			if(!FieldInfo.Type.IsNativeType()) {
				this.AddUseLibrary("Syntax.Null");
				InitValue = this.NullLiteral;
			}
			this.CurrentBuilder.AppendIndent();
			this.CurrentBuilder.Append(this.ConvertToNativeTypeName(FieldInfo.Type));
			this.CurrentBuilder.SpaceAppendSpace(FieldInfo.NativeName);
			this.CurrentBuilder.Append("= ");
			this.CurrentBuilder.Append(InitValue);
			this.CurrentBuilder.AppendLine(this.SemiColon);
			i += 1;
		}
		this.CurrentBuilder.UnIndent();
		this.CurrentBuilder.AppendIndent();
		this.CurrentBuilder.AppendLine("}");
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
	}

	@Override public void VisitEmptyNode(GtEmptyNode EmptyNode) {
		LibGreenTea.DebugP("empty node: " + EmptyNode.Token.ParsedText);
	}
	@Override public void VisitInstanceOfNode(GtInstanceOfNode Node) {
		this.AddUseLibrary("JavaStyle.Object");
		Node.ExprNode.Accept(this);
		this.CurrentBuilder.SpaceAppendSpace("instanceof");
		this.CurrentBuilder.Append(Node.TypeInfo.GetNativeName());
	}
	@Override public void VisitTrinaryNode(GtTrinaryNode Node) {
		this.CurrentBuilder.Append("if(");
		Node.CondNode.Accept(this);
		this.CurrentBuilder.Append(") {");
		Node.ThenNode.Accept(this);
		this.CurrentBuilder.Append("} ");
		if(this.DoesNodeExist(Node.ElseNode)){
			this.CurrentBuilder.Append("else {");
			Node.ElseNode.Accept(this);
			this.CurrentBuilder.Append("}");
		}
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
//	@Override public void VisitSuffixNode(GtSuffixNode Node) {
//		this.DebugAppendNode(Node);
//	}
	@Override public void VisitUnaryNode(GtUnaryNode Node) {
		this.CurrentBuilder.Append(Node.Token.ParsedText);
		Node.RecvNode.Accept(this);
	}
//	@Override public void VisitIndexerNode(GtGetterNode Node) {
//		this.AddUseLibrary("JavaScript.String");
//		this.VisitingBuilder.Append("[");
//		Node.RecvNode.Accept(this);
//		this.VisitingBuilder.Append("]");
//	}
	@Override public void VisitArrayLiteralNode(GtArrayLiteralNode Node) {
		this.AddUseLibrary("JavaScript.Array");
		/*local*/int size = LibGreenTea.ListSize(Node.NodeList);
		/*local*/int i = 0;
		this.CurrentBuilder.Append("[");
		while(i < size) {
			if(i != 0) {
				this.CurrentBuilder.Append(", ");
			}   
			Node.NodeList.get(i).Accept(this);
			i += 1;
		}   
		this.CurrentBuilder.Append("]");
	}
	@Override public void VisitNewArrayNode(GtNewArrayNode Node) {
		this.DebugAppendNode(Node);
	}
	@Override public void VisitWhileNode(GtWhileNode Node) {
		this.AddUseLibrary("Syntax.CStyleWhile");
		this.CurrentBuilder.Append("while(");
		Node.CondNode.Accept(this);
		this.CurrentBuilder.Append(") ");
		this.VisitIndentBlock("{", Node.BodyNode, "}");
		this.CurrentBuilder.AppendLine("");
	}
	@Override public void VisitDoWhileNode(GtDoWhileNode Node) {
		this.AddUseLibrary("Syntax.CStyleWhile");
		this.CurrentBuilder.Append("do ");
		this.VisitIndentBlock("{", Node.BodyNode, "}");
		this.CurrentBuilder.Append(" while(");
		Node.CondNode.Accept(this);
		this.CurrentBuilder.AppendLine(");");
	}

	@Override public void VisitForNode(GtForNode Node) {
		this.AddUseLibrary("Syntax.CStyleFor");
		this.CurrentBuilder.Append("for(");
		this.CurrentBuilder.Append("; ");
		Node.CondNode.Accept(this);
		this.CurrentBuilder.Append("; ");
		Node.IterNode.Accept(this);
		this.CurrentBuilder.Append(") ");
		this.VisitIndentBlock("{", Node.BodyNode, "}");
		this.CurrentBuilder.AppendLine("");
	}
	private boolean IsInForExpr(GtNode Node) {
		if(Node.ParentNode instanceof GtForNode){
			GtForNode Parent = (GtForNode) Node.ParentNode;
			if(Node == Parent.CondNode) return true;
			if(Node == Parent.IterNode) return true;
		}
		return false;
	}

	@Override public void VisitForEachNode(GtForEachNode Node) {
		this.DebugAppendNode(Node);
	}
//	@Override public void VisitConstNode(GtConstNode Node) {
//		this.VisitingBuilder.Append(Node.Token.ParsedText);
//	}
//	@Override public void VisitNewNode(GtAllocateNode Node) {
//		this.VisitingBuilder.Append("new ");
//		this.VisitingBuilder.Append(this.ConvertToNativeTypeName(Node.Type));
//		this.VisitingBuilder.Append("(");
//		this.VisitingBuilder.Append(")");
//	}
	@Override public void VisitConstructorNode(GtConstructorNode Node) {
		this.DebugAppendNode(Node);
	}
	@Override public void VisitNullNode(GtNullNode Node) {
		this.AddUseLibrary("Syntax.Null");
		this.CurrentBuilder.Append(this.NullLiteral);
	}
	@Override public void VisitGetLocalNode(GtGetLocalNode Node) {
		this.CurrentBuilder.Append(Node.Token.ParsedText);
	}
	@Override public void VisitGetterNode(GtGetterNode Node) {
		Node.RecvNode.Accept(this);
		this.CurrentBuilder.Append(".");
		this.CurrentBuilder.Append(Node.Token.ParsedText);
	}
	@Override public void VisitSetterNode(GtSetterNode Node) {
		Node.RecvNode.Accept(this);
		this.CurrentBuilder.Append(".");
		this.CurrentBuilder.Append(Node.Token.ParsedText);
		this.CurrentBuilder.SpaceAppendSpace("=");
		Node.ValueNode.Accept(this);
		this.CurrentBuilder.Append(";");
		if(!this.IsInForExpr(Node)) this.CurrentBuilder.AppendLine("");
	}
	@Override public void VisitApplySymbolNode(GtApplySymbolNode Node) {
		this.CurrentBuilder.Append(ConvertToNativeFuncName(Node.ResolvedFunc));
		this.CurrentBuilder.Append("(");
		for(/*local*/int i = 0; i < LibGreenTea.ListSize(Node.ParamList); i++){
			if(i != 0) this.CurrentBuilder.Append(", ");
			Node.ParamList.get(i).Accept(this);
		}
		this.CurrentBuilder.Append(")");
	}
	@Override public void VisitApplyOverridedMethodNode(GtApplyOverridedMethodNode Node) {
		this.DebugAppendNode(Node);
	}
	@Override public void VisitApplyFunctionObjectNode(GtApplyFunctionObjectNode Node) {
		this.DebugAppendNode(Node);
	}
	@Override public void VisitBinaryNode(GtBinaryNode Node) {
		Node.LeftNode.Accept(this);
		this.CurrentBuilder.SpaceAppendSpace(Node.Token.ParsedText);
		Node.RightNode.Accept(this);
	}
	@Override public void VisitAndNode(GtAndNode Node) {
		Node.LeftNode.Accept(this);
		this.CurrentBuilder.SpaceAppendSpace("&&");
		Node.RightNode.Accept(this);
	}
	@Override public void VisitOrNode(GtOrNode Node) {
		Node.LeftNode.Accept(this);
		this.CurrentBuilder.SpaceAppendSpace("||");
		Node.RightNode.Accept(this);
	}
	@Override public void VisitSetLocalNode(GtSetLocalNode Node) {
		this.CurrentBuilder.Append(Node.NativeName);
		this.CurrentBuilder.SpaceAppendSpace("=");
		Node.ValueNode.Accept(this);
		this.CurrentBuilder.Append(";");
		if(!this.IsInForExpr(Node)) this.CurrentBuilder.AppendLine("");
	}
	@Override public void VisitVarDeclNode(GtVarDeclNode Node) {
		this.CurrentBuilder.Append(this.ConvertToNativeTypeName(Node.DeclType));
		String VarName = Node.Token.ParsedText;
		this.CurrentBuilder.SpaceAppendSpace(VarName);
		//if(this.DoesNodeExist(Node.InitNode)){ //FIXME: Always true
		if(Node.InitNode.Token.ParsedText != VarName){
			this.CurrentBuilder.SpaceAppendSpace("=");
			Node.InitNode.Accept(this);
		}
		this.CurrentBuilder.AppendLine(";");
		this.VisitBlockWithoutIndent(Node.BlockNode);
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
		this.DebugAppendNode(Node);
	}
	@Override public void VisitThrowNode(GtThrowNode Node) {
		this.DebugAppendNode(Node);
	}
	@Override public void VisitFunctionLiteralNode(GtFunctionLiteralNode Node) {
		this.DebugAppendNode(Node);
	}
	@Override public void VisitErrorNode(GtErrorNode Node) {
		this.DebugAppendNode(Node);
	}
	@Override public void VisitCommandNode(GtCommandNode Node) {
		this.DebugAppendNode(Node);
	}
}
