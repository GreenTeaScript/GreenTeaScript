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

//ifdef  JAVA
package org.GreenTeaScript;
import java.util.ArrayList;

import parser.GtClassField;
import parser.GtFieldInfo;
import parser.GtFunc;
import parser.GtParserContext;
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
import parser.ast.GtBooleanNode;
import parser.ast.GtBreakNode;
import parser.ast.GtCaseNode;
import parser.ast.GtCastNode;
import parser.ast.GtCatchNode;
import parser.ast.GtCommandNode;
import parser.ast.GtConstructorNode;
import parser.ast.GtContinueNode;
import parser.ast.GtDoWhileNode;
import parser.ast.GtErrorNode;
import parser.ast.GtFloatNode;
import parser.ast.GtForEachNode;
import parser.ast.GtForNode;
import parser.ast.GtGetCapturedNode;
import parser.ast.GtGetIndexNode;
import parser.ast.GtGetLocalNode;
import parser.ast.GtGetterNode;
import parser.ast.GtIfNode;
import parser.ast.GtInstanceOfNode;
import parser.ast.GtIntNode;
import parser.ast.GtNewArrayNode;
import parser.ast.GtNode;
import parser.ast.GtNullNode;
import parser.ast.GtOrNode;
import parser.ast.GtParamNode;
import parser.ast.GtPrefixDeclNode;
import parser.ast.GtPrefixInclNode;
import parser.ast.GtReturnNode;
import parser.ast.GtSetCapturedNode;
import parser.ast.GtSetIndexNode;
import parser.ast.GtSetLocalNode;
import parser.ast.GtSetterNode;
import parser.ast.GtSliceNode;
import parser.ast.GtStatementNode;
import parser.ast.GtStringNode;
import parser.ast.GtSuffixDeclNode;
import parser.ast.GtSuffixInclNode;
import parser.ast.GtSwitchNode;
import parser.ast.GtThrowNode;
import parser.ast.GtTrinaryNode;
import parser.ast.GtTryNode;
import parser.ast.GtUnaryNode;
import parser.ast.GtUsingNode;
import parser.ast.GtVarDeclNode;
import parser.ast.GtWhileNode;
import parser.ast.GtYieldNode;
import parser.deps.LibGreenTea;
//endif VAJA

//GreenTea Generator should be written in each language.

public class PerlSourceGenerator extends GtSourceGenerator {
	public PerlSourceGenerator/*constructor*/(String TargetCode, String OutputFile, int GeneratorFlag) {
		super("perl", OutputFile, GeneratorFlag);
		this.TrueLiteral  = "1";
		this.FalseLiteral = "0";
		this.NullLiteral = "undef";
		this.LineComment = "##";
	}

	@Override public void InitContext(GtParserContext Context) {
		super.InitContext(Context);
		this.HeaderBuilder.AppendLine("use strict;");
		this.HeaderBuilder.AppendLine("use warnings;");
		this.HeaderBuilder.AppendLine("use Error qw(:try);");
	}

	@Override public String GetRecvName() {
		return "self";
	}

	private String GetLocalType(GtType Type, boolean IsPointer) {
		if(Type.IsDynamicType() || Type.IsNativeType()) {
			if(Type.IsBooleanType()) {
				return "int";
			}
			return Type.ShortName;
		}
		/*local*/String TypeName = "struct " + Type.ShortName;
		if(IsPointer) {
			TypeName += "*";
		}
		return TypeName;

	}
	public String NativeTypeName(GtType Type) {
		return this.GetLocalType(Type, false);
	}

	public String LocalTypeName(GtType Type) {
		return this.GetLocalType(Type, true);
	}

	public String GtTypeName(GtType Type) {
		return Type.ShortName;
	}

	@Override public void VisitNullNode(GtNullNode Node) {
		this.VisitingBuilder.Append(this.NullLiteral);
	}

	@Override public void VisitBooleanNode(GtBooleanNode Node) {
		if(Node.Value) {
			this.VisitingBuilder.Append(this.TrueLiteral);
		}
		else {
			this.VisitingBuilder.Append(this.FalseLiteral);
		}
	}

	@Override public void VisitIntNode(GtIntNode Node) {
		this.VisitingBuilder.Append(Long.toString(Node.Value));
	}

	@Override public void VisitFloatNode(GtFloatNode Node) {
		this.VisitingBuilder.Append(Double.toString(Node.Value));
	}

	@Override public void VisitStringNode(GtStringNode Node) {
		this.VisitingBuilder.Append(LibGreenTea.QuoteString(Node.Value));
	}

	//FIXME Need to Implement
//	@Override public void VisitRegexNode(GtRegexNode Node) {
//		this.VisitingBuilder.Append("");
//	}
//
//	@Override public void VisitConstPoolNode(GtConstPoolNode Node) {
//		this.VisitingBuilder.Append("");
//	}
//
	@Override public void VisitArrayLiteralNode(GtArrayLiteralNode Node) {
		this.VisitingBuilder.Append("{");
		for (int i = 0; i < LibGreenTea.ListSize(Node.NodeList); i++) {
			if(i != 0) {
				this.VisitingBuilder.Append(", ");
			}
			Node.NodeList.get(i).Accept(this);
		}
		this.VisitingBuilder.Append("}");
	}

//	@Override public void VisitMapLiteralNode(GtMapLiteralNode Node) {
//		this.VisitingBuilder.Append("");
//	}

	@Override public void VisitParamNode(GtParamNode Node) {
		this.VisitingBuilder.Append("");
	}

//	@Override public void VisitFunctionLiteralNode(GtFunctionLiteralNode Node) {
//		this.VisitingBuilder.Append("");
//	}

	@Override public void VisitGetLocalNode(GtGetLocalNode Node) {
		this.VisitingBuilder.Append("$" + Node.NativeName);
	}

	@Override public void VisitSetLocalNode(GtSetLocalNode Node) {
		this.VisitingBuilder.Append(Node.NativeName + " = ");
		Node.ValueNode.Accept(this);
	}

	@Override public void VisitGetCapturedNode(GtGetCapturedNode Node) {
		this.VisitingBuilder.Append("__env->" + Node.NativeName);
	}

	@Override public void VisitSetCapturedNode(GtSetCapturedNode Node) {
		this.VisitingBuilder.Append("__env->" + Node.NativeName + " = ");
		Node.ValueNode.Accept(this);
	}

	@Override public void VisitGetterNode(GtGetterNode Node) {
		/*local*/String FieldName = Node.NativeName;
		Node.RecvNode.Accept(this);
		this.VisitingBuilder.Append("->{'" + FieldName + "'}");
	}

	@Override public void VisitSetterNode(GtSetterNode Node) {
		/*local*/String FieldName = Node.NativeName;
		Node.RecvNode.Accept(this);
		this.VisitingBuilder.Append("->{'" + FieldName + "'} = ");
		Node.ValueNode.Accept(this);
	}

	@Override public void VisitApplySymbolNode(GtApplySymbolNode Node) {
		this.VisitingBuilder.Append(Node.NativeName);
		this.VisitingBuilder.Append("(");
		for(/*local*/int i = 0; i < LibGreenTea.ListSize(Node.ParamList); i++){
			if(i > 0){
				this.VisitingBuilder.Append(", ");
			}
			Node.ParamList.get(i).Accept(this);
		}
		this.VisitingBuilder.Append(")");
	}

	@Override public void VisitApplyFunctionObjectNode(GtApplyFunctionObjectNode Node) {
		//FIXME
		Node.FuncNode.Accept(this);
		this.VisitingBuilder.Append("(");
		for(/*local*/int i = 0; i < LibGreenTea.ListSize(Node.ParamList); i++){
			if(i > 0){
				this.VisitingBuilder.Append(", ");
			}
			Node.ParamList.get(i).Accept(this);
		}
		this.VisitingBuilder.Append(")");
	}

	@Override public void VisitApplyOverridedMethodNode(GtApplyOverridedMethodNode Node) {
		//FIXME
		this.VisitingBuilder.Append(Node.Func.FuncName);
		this.VisitingBuilder.Append("(");
		for(/*local*/int i = 0; i < LibGreenTea.ListSize(Node.ParamList); i++){
			if(i > 0){
				this.VisitingBuilder.Append(", ");
			}
			Node.ParamList.get(i).Accept(this);
		}
		this.VisitingBuilder.Append(")");
	}

	@Override public void VisitGetIndexNode(GtGetIndexNode Node) {
		Node.RecvNode.Accept(this);
		this.VisitingBuilder.Append("[");
		Node.IndexNode.Accept(this);
		this.VisitingBuilder.Append("]");
	}

	@Override public void VisitSetIndexNode(GtSetIndexNode Node) {
		Node.RecvNode.Accept(this);
		this.VisitingBuilder.Append("[");
		Node.IndexNode.Accept(this);
		this.VisitingBuilder.Append("] = ");
		Node.ValueNode.Accept(this);
	}

	@Override public void VisitSliceNode(GtSliceNode Node) {
		this.VisitingBuilder.Append("GT_Slice(");
		Node.RecvNode.Accept(this);
		this.VisitingBuilder.Append(", ");
		Node.Index1.Accept(this);
		this.VisitingBuilder.Append(", ");
		Node.Index2.Accept(this);
		this.VisitingBuilder.Append(")");
	}

	@Override public void VisitAndNode(GtAndNode Node) {
		this.VisitingBuilder.Append("(");
		Node.LeftNode.Accept(this);
		this.VisitingBuilder.Append(" && ");
		Node.RightNode.Accept(this);
		this.VisitingBuilder.Append(")");
	}

	@Override public void VisitOrNode(GtOrNode Node) {
		this.VisitingBuilder.Append("(");
		Node.LeftNode.Accept(this);
		this.VisitingBuilder.Append(" || ");
		Node.RightNode.Accept(this);
		this.VisitingBuilder.Append(")");
	}

	@Override public void VisitUnaryNode(GtUnaryNode Node) {
		this.VisitingBuilder.Append("(");
		this.VisitingBuilder.Append(Node.NativeName);
		Node.RecvNode.Accept(this);
		this.VisitingBuilder.Append(")");
	}

	@Override public void VisitPrefixInclNode(GtPrefixInclNode Node) {
		this.VisitingBuilder.Append("(++");
		Node.RecvNode.Accept(this);
		this.VisitingBuilder.Append(")");
	}

	@Override public void VisitPrefixDeclNode(GtPrefixDeclNode Node) {
		this.VisitingBuilder.Append("(--");
		Node.RecvNode.Accept(this);
		this.VisitingBuilder.Append(")");
	}

	@Override public void VisitSuffixInclNode(GtSuffixInclNode Node) {
		this.VisitingBuilder.Append("(");
		Node.RecvNode.Accept(this);
		this.VisitingBuilder.Append("++)");
	}

	@Override public void VisitSuffixDeclNode(GtSuffixDeclNode Node) {
		this.VisitingBuilder.Append("(");
		Node.RecvNode.Accept(this);
		this.VisitingBuilder.Append("--)");
	}

	@Override public void VisitBinaryNode(GtBinaryNode Node) {
		this.VisitingBuilder.Append("(");
		Node.LeftNode.Accept(this);
		this.VisitingBuilder.Append(" " + Node.NativeName + " ");
		Node.RightNode.Accept(this);
		this.VisitingBuilder.Append(")");
	}

	@Override public void VisitTrinaryNode(GtTrinaryNode Node) {
		this.VisitingBuilder.Append("(");
		Node.CondNode.Accept(this);
		this.VisitingBuilder.Append(") ? (");
		Node.ThenNode.Accept(this);
		this.VisitingBuilder.Append(") : (");
		Node.ElseNode.Accept(this);
		this.VisitingBuilder.Append(")");
	}

	@Override public void VisitConstructorNode(GtConstructorNode Node) {
		this.VisitingBuilder.Append(Node.Func.FuncName);
		this.VisitingBuilder.Append("(");
		for(/*local*/int i = 0; i < LibGreenTea.ListSize(Node.ParamList); i++){
			if(i > 0){
				this.VisitingBuilder.Append(", ");
			}
			Node.ParamList.get(i).Accept(this);
		}
		this.VisitingBuilder.Append(")");
	}

	@Override public void VisitAllocateNode(GtAllocateNode Node) {
		this.VisitingBuilder.Append(GetLocalType(Node.Type, false) + "->new()");
	}

	@Override public void VisitNewArrayNode(GtNewArrayNode Node) {
		throw new RuntimeException("NOT Implemented");
//		this.VisitingBuilder.Append("NEWARRAY_" + GetLocalType(Node.Type, false) + "(");
//		for (int i = 0; i < LibGreenTea.ListSize(Node.NodeList); i++) {
//			if(i > 0) {
//				this.VisitingBuilder.Append(", ");
//			}
//			Node.NodeList.get(i).Accept(this);
//		}
//		this.VisitingBuilder.Append(")");
	}

	@Override public void VisitInstanceOfNode(GtInstanceOfNode Node) {
		this.VisitingBuilder.Append("InstanceOf(");
		Node.ExprNode.Accept(this);
		this.VisitingBuilder.Append(", ");
		this.VisitingBuilder.Append(GetLocalType(Node.TypeInfo, false).toString());
		this.VisitingBuilder.Append(")");
	}

	@Override public void VisitCastNode(GtCastNode Node) {
		this.VisitingBuilder.Append("Cast(");
		Node.Expr.Accept(this);
		this.VisitingBuilder.Append(", ");
		this.VisitingBuilder.Append(GetLocalType(Node.CastType, false).toString());
		this.VisitingBuilder.Append(")");
	}

	@Override public void VisitVarDeclNode(GtVarDeclNode Node) {
		/*local*/String VarName = Node.NativeName;
		this.VisitingBuilder.Append("my $" + VarName);
		if(Node.InitNode != null) {
			this.VisitingBuilder.Append(" = ");
			Node.InitNode.Accept(this);
		}
		this.VisitingBuilder.AppendLine(this.SemiColon);
		this.VisitingBuilder.AppendIndent();
		this.VisitIndentBlock("{", Node.BlockNode, "}");
	}

	@Override public void VisitUsingNode(GtUsingNode Node) {
		throw new RuntimeException("FIXME");
	}

	@Override public void VisitIfNode(GtIfNode Node) {
		this.VisitingBuilder.Append("if(");
		Node.CondNode.Accept(this);
		this.VisitingBuilder.Append(")");
		this.VisitIndentBlock("{", Node.ThenNode, "}");
		if(Node.ElseNode != null) {
			this.VisitingBuilder.Append("else");
			this.VisitIndentBlock("{", Node.ElseNode, "}");
		}
	}

	@Override public void VisitWhileNode(GtWhileNode Node) {
		this.VisitingBuilder.Append("while(");
		Node.CondNode.Accept(this);
		this.VisitingBuilder.Append(")");
		this.VisitIndentBlock("{", Node.BodyNode, "}");
	}

	@Override public void VisitDoWhileNode(GtDoWhileNode Node) {
		this.VisitingBuilder.Append("do ");
		this.VisitIndentBlock("{", Node.BodyNode, "}");
		this.VisitingBuilder.Append("while(");
		Node.CondNode.Accept(this);
		this.VisitingBuilder.Append(")");
	}

	@Override public void VisitForNode(GtForNode Node) {
		this.VisitingBuilder.Append("for(;");
		Node.CondNode.Accept(this);
		this.VisitingBuilder.Append(";");
		Node.IterNode.Accept(this);
		this.VisitingBuilder.Append(") ");
		this.VisitIndentBlock("{", Node.BodyNode, "}");
	}

	@Override public void VisitForEachNode(GtForEachNode Node) {
		Node.Variable.Accept(this);
		this.VisitingBuilder.Append("while(");
		Node.IterNode.Accept(this);
		this.VisitingBuilder.Append(")");
		this.VisitIndentBlock("{", Node.BodyNode, "}");	}

	@Override public void VisitContinueNode(GtContinueNode Node) {
		this.VisitingBuilder.Append("next");
		if(Node.Label != null) {
			this.VisitingBuilder.Append(" " + Node.Label);
		}
	}

	@Override public void VisitBreakNode(GtBreakNode Node) {
		this.VisitingBuilder.Append("last");
		if(Node.Label != null) {
			this.VisitingBuilder.Append(" " + Node.Label);
		}
	}

	@Override public void VisitStatementNode(GtStatementNode Node) {
		Node.ValueNode.Accept(this);
	}

	@Override public void VisitReturnNode(GtReturnNode Node) {
		this.VisitingBuilder.Append("return ");
		if(Node.ValueNode != null) {
			Node.ValueNode.Accept(this);
		}
		this.StopVisitor(Node);
	}

	@Override public void VisitYieldNode(GtYieldNode Node) {
		this.VisitingBuilder.Append("yield ");
		Node.ValueNode.Accept(this);
		this.StopVisitor(Node);
	}

	@Override public void VisitThrowNode(GtThrowNode Node) {
		this.VisitingBuilder.Append("throw ");
		Node.ValueNode.Accept(this);
		this.StopVisitor(Node);
	}

	@Override public void VisitTryNode(GtTryNode Node) {
		this.VisitingBuilder.Append("try ");
		this.VisitIndentBlock("{", Node.TryNode, "}");
		for (int i = 0; i < LibGreenTea.ListSize(Node.CatchList); i++) {
			Node.CatchList.get(i).Accept(this);
		}
		if(Node.FinallyNode != null) {
			this.VisitingBuilder.Append("finally ");
			this.VisitIndentBlock("{", Node.FinallyNode, "}");
		}
	}

	@Override public void VisitCatchNode(GtCatchNode Node) {
		this.VisitingBuilder.AppendLine(" catch " + Node.ExceptionType + " with {");
		this.VisitingBuilder.AppendLine(" my $" + Node.ExceptionName + " = shift;");
		this.VisitIndentBlock("{", Node.BodyNode, "}");
		this.VisitingBuilder.AppendLine("}");
	}

	@Override public void VisitSwitchNode(GtSwitchNode Node) {
		this.VisitingBuilder.Append("switch (");
		Node.MatchNode.Accept(this);
		this.VisitingBuilder.AppendLine(") {");
		for (/*local*/int i = 0; i < LibGreenTea.ListSize(Node.CaseList); i++) {
			Node.CaseList.get(i).Accept(this);
		}
		this.VisitingBuilder.AppendLine("}");
	}

	@Override public void VisitCaseNode(GtCaseNode Node) {
		this.VisitingBuilder.Append("case ");
		Node.CaseNode.Accept(this);
		this.VisitingBuilder.Append(" : ");
		this.VisitIndentBlock("{", Node.BodyNode, "}");
	}

	@Override public void VisitCommandNode(GtCommandNode Node) {
		this.VisitingBuilder.Append("String __Command = ");
		for(/*local*/int i = 0; i < LibGreenTea.ListSize(Node.ArgumentList); i += 1) {
			/*local*/GtNode Param = Node.ArgumentList.get(i);
			if(i != 0) {
				this.VisitingBuilder.Append(" . ");
			}
			this.VisitingBuilder.Append("(");
			Param.Accept(this);
			this.VisitingBuilder.Append(")");
		}
		this.VisitingBuilder.AppendLine(this.SemiColon);
		this.VisitingBuilder.AppendIndent();
		this.VisitingBuilder.Append("system(__Command)");
	}

	@Override public void VisitErrorNode(GtErrorNode Node) {
		/*local*/String Code = "throw Error(\"" + Node.Token.ParsedText + "\")";
		this.VisitingBuilder.Append(Code);
		this.StopVisitor(Node);
	}

	@Override public void GenerateFunc(GtFunc Func, ArrayList<String> ParamNameList, GtNode Body) {
		this.FlushErrorReport();
		/*local*/String FuncName = Func.GetNativeFuncName();
		this.VisitingBuilder.AppendLine("sub " + FuncName + " {");
		this.VisitingBuilder.Indent();
		for(/*local*/int i = 0; i < LibGreenTea.ListSize(ParamNameList); i += 1) {
			this.VisitingBuilder.AppendLine("my $" + ParamNameList.get(i) + " = $_[" + i + "];");
		}
		this.VisitingBuilder.UnIndent();
		this.VisitIndentBlock("", Body, "");
	}

	@Override public void OpenClassField(GtSyntaxTree ParsedTree, GtType Type, GtClassField ClassField) {
		/*local*/String TypeName = Type.ShortName;
		this.VisitingBuilder.AppendLine("package " + TypeName + this.SemiColon);
		if(Type.SuperType != null) {
			this.VisitingBuilder.AppendLine("# our @ISA = ('" + Type.SuperType.ShortName + "');" + this.SemiColon);
		}
		this.VisitingBuilder.AppendLine("sub new {");
		this.VisitingBuilder.Indent();
		this.VisitingBuilder.AppendLine("my $class = shift" + this.SemiColon);
		this.VisitingBuilder.AppendLine("my $" + this.GetRecvName() + " = {}" + this.SemiColon);
		for(/*local*/int i = 0; i < LibGreenTea.ListSize(ClassField.FieldList); i += 1) {
			/*local*/GtFieldInfo FieldInfo = ClassField.FieldList.get(i);
			/*local*/String InitValue = this.StringifyConstValue(FieldInfo.InitValue);
			if(!FieldInfo.Type.IsNativeType()) {
				InitValue = this.NullLiteral;
			}
			this.VisitingBuilder.AppendLine("$" + this.GetRecvName() + "->{'" + FieldInfo.NativeName + "'} = " + InitValue + this.SemiColon);
		}
		this.VisitingBuilder.AppendLine("return bless $" + this.GetRecvName() + ", $class");
		this.VisitingBuilder.UnIndent();
		this.VisitingBuilder.AppendLine("}");
		this.VisitingBuilder.AppendLine("package main;");
	}

	@Override public void InvokeMainFunc(String MainFuncName) {
		this.VisitingBuilder = this.NewSourceBuilder();
		this.VisitingBuilder.Append(MainFuncName);
		this.VisitingBuilder.AppendLine("();");
	}
}