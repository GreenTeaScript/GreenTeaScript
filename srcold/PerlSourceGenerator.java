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
import parser.GtNameSpace;
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

	@Override public void InitContext(GtNameSpace Context) {
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
		this.CurrentBuilder.Append(this.NullLiteral);
	}

	@Override public void VisitBooleanNode(GtBooleanNode Node) {
		if(Node.Value) {
			this.CurrentBuilder.Append(this.TrueLiteral);
		}
		else {
			this.CurrentBuilder.Append(this.FalseLiteral);
		}
	}

	@Override public void VisitIntNode(GtIntNode Node) {
		this.CurrentBuilder.Append(Long.toString(Node.Value));
	}

	@Override public void VisitFloatNode(GtFloatNode Node) {
		this.CurrentBuilder.Append(Double.toString(Node.Value));
	}

	@Override public void VisitStringNode(GtStringNode Node) {
		this.CurrentBuilder.Append(LibGreenTea.QuoteString(Node.Value));
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
		this.CurrentBuilder.Append("{");
		for (int i = 0; i < LibGreenTea.ListSize(Node.NodeList); i++) {
			if(i != 0) {
				this.CurrentBuilder.Append(", ");
			}
			Node.NodeList.get(i).Accept(this);
		}
		this.CurrentBuilder.Append("}");
	}

//	@Override public void VisitMapLiteralNode(GtMapLiteralNode Node) {
//		this.VisitingBuilder.Append("");
//	}

	@Override public void VisitParamNode(GtParamNode Node) {
		this.CurrentBuilder.Append("");
	}

//	@Override public void VisitFunctionLiteralNode(GtFunctionLiteralNode Node) {
//		this.VisitingBuilder.Append("");
//	}

	@Override public void VisitGetLocalNode(GtGetLocalNode Node) {
		this.CurrentBuilder.Append("$" + Node.NativeName);
	}

	@Override public void VisitSetLocalNode(GtSetLocalNode Node) {
		this.CurrentBuilder.Append(Node.NativeName + " = ");
		Node.ValueNode.Accept(this);
	}

	@Override public void VisitGetCapturedNode(GtGetCapturedNode Node) {
		this.CurrentBuilder.Append("__env->" + Node.NativeName);
	}

	@Override public void VisitSetCapturedNode(GtSetCapturedNode Node) {
		this.CurrentBuilder.Append("__env->" + Node.NativeName + " = ");
		Node.ValueNode.Accept(this);
	}

	@Override public void VisitGetterNode(GtGetterNode Node) {
		/*local*/String FieldName = Node.NativeName;
		Node.RecvNode.Accept(this);
		this.CurrentBuilder.Append("->{'" + FieldName + "'}");
	}

	@Override public void VisitSetterNode(GtSetterNode Node) {
		/*local*/String FieldName = Node.NativeName;
		Node.RecvNode.Accept(this);
		this.CurrentBuilder.Append("->{'" + FieldName + "'} = ");
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

	@Override public void VisitApplyFunctionObjectNode(GtApplyFunctionObjectNode Node) {
		//FIXME
		Node.FuncNode.Accept(this);
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
		//FIXME
		this.CurrentBuilder.Append(Node.Func.FuncName);
		this.CurrentBuilder.Append("(");
		for(/*local*/int i = 0; i < LibGreenTea.ListSize(Node.ParamList); i++){
			if(i > 0){
				this.CurrentBuilder.Append(", ");
			}
			Node.ParamList.get(i).Accept(this);
		}
		this.CurrentBuilder.Append(")");
	}

	@Override public void VisitGetIndexNode(GtGetIndexNode Node) {
		Node.RecvNode.Accept(this);
		this.CurrentBuilder.Append("[");
		Node.IndexNode.Accept(this);
		this.CurrentBuilder.Append("]");
	}

	@Override public void VisitSetIndexNode(GtSetIndexNode Node) {
		Node.RecvNode.Accept(this);
		this.CurrentBuilder.Append("[");
		Node.IndexNode.Accept(this);
		this.CurrentBuilder.Append("] = ");
		Node.ValueNode.Accept(this);
	}

	@Override public void VisitSliceNode(GtSliceNode Node) {
		this.CurrentBuilder.Append("GT_Slice(");
		Node.RecvNode.Accept(this);
		this.CurrentBuilder.Append(", ");
		Node.Index1.Accept(this);
		this.CurrentBuilder.Append(", ");
		Node.Index2.Accept(this);
		this.CurrentBuilder.Append(")");
	}

	@Override public void VisitAndNode(GtAndNode Node) {
		this.CurrentBuilder.Append("(");
		Node.LeftNode.Accept(this);
		this.CurrentBuilder.Append(" && ");
		Node.RightNode.Accept(this);
		this.CurrentBuilder.Append(")");
	}

	@Override public void VisitOrNode(GtOrNode Node) {
		this.CurrentBuilder.Append("(");
		Node.LeftNode.Accept(this);
		this.CurrentBuilder.Append(" || ");
		Node.RightNode.Accept(this);
		this.CurrentBuilder.Append(")");
	}

	@Override public void VisitUnaryNode(GtUnaryNode Node) {
		this.CurrentBuilder.Append("(");
		this.CurrentBuilder.Append(Node.NativeName);
		Node.RecvNode.Accept(this);
		this.CurrentBuilder.Append(")");
	}

	@Override public void VisitPrefixInclNode(GtPrefixInclNode Node) {
		this.CurrentBuilder.Append("(++");
		Node.RecvNode.Accept(this);
		this.CurrentBuilder.Append(")");
	}

	@Override public void VisitPrefixDeclNode(GtPrefixDeclNode Node) {
		this.CurrentBuilder.Append("(--");
		Node.RecvNode.Accept(this);
		this.CurrentBuilder.Append(")");
	}

	@Override public void VisitSuffixInclNode(GtSuffixInclNode Node) {
		this.CurrentBuilder.Append("(");
		Node.RecvNode.Accept(this);
		this.CurrentBuilder.Append("++)");
	}

	@Override public void VisitSuffixDeclNode(GtSuffixDeclNode Node) {
		this.CurrentBuilder.Append("(");
		Node.RecvNode.Accept(this);
		this.CurrentBuilder.Append("--)");
	}

	@Override public void VisitBinaryNode(GtBinaryNode Node) {
		this.CurrentBuilder.Append("(");
		Node.LeftNode.Accept(this);
		this.CurrentBuilder.Append(" " + Node.NativeName + " ");
		Node.RightNode.Accept(this);
		this.CurrentBuilder.Append(")");
	}

	@Override public void VisitTrinaryNode(GtTrinaryNode Node) {
		this.CurrentBuilder.Append("(");
		Node.CondNode.Accept(this);
		this.CurrentBuilder.Append(") ? (");
		Node.ThenNode.Accept(this);
		this.CurrentBuilder.Append(") : (");
		Node.ElseNode.Accept(this);
		this.CurrentBuilder.Append(")");
	}

	@Override public void VisitConstructorNode(GtConstructorNode Node) {
		this.CurrentBuilder.Append(Node.Func.FuncName);
		this.CurrentBuilder.Append("(");
		for(/*local*/int i = 0; i < LibGreenTea.ListSize(Node.ParamList); i++){
			if(i > 0){
				this.CurrentBuilder.Append(", ");
			}
			Node.ParamList.get(i).Accept(this);
		}
		this.CurrentBuilder.Append(")");
	}

	@Override public void VisitAllocateNode(GtAllocateNode Node) {
		this.CurrentBuilder.Append(GetLocalType(Node.Type, false) + "->new()");
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
		this.CurrentBuilder.Append("InstanceOf(");
		Node.ExprNode.Accept(this);
		this.CurrentBuilder.Append(", ");
		this.CurrentBuilder.Append(GetLocalType(Node.TypeInfo, false).toString());
		this.CurrentBuilder.Append(")");
	}

	@Override public void VisitCastNode(GtCastNode Node) {
		this.CurrentBuilder.Append("Cast(");
		Node.Expr.Accept(this);
		this.CurrentBuilder.Append(", ");
		this.CurrentBuilder.Append(GetLocalType(Node.CastType, false).toString());
		this.CurrentBuilder.Append(")");
	}

	@Override public void VisitVarDeclNode(GtVarDeclNode Node) {
		/*local*/String VarName = Node.NativeName;
		this.CurrentBuilder.Append("my $" + VarName);
		if(Node.InitNode != null) {
			this.CurrentBuilder.Append(" = ");
			Node.InitNode.Accept(this);
		}
		this.CurrentBuilder.AppendLine(this.SemiColon);
		this.CurrentBuilder.AppendIndent();
		this.VisitIndentBlock("{", Node.BlockNode, "}");
	}

	@Override public void VisitUsingNode(GtUsingNode Node) {
		throw new RuntimeException("FIXME");
	}

	@Override public void VisitIfNode(GtIfNode Node) {
		this.CurrentBuilder.Append("if(");
		Node.CondNode.Accept(this);
		this.CurrentBuilder.Append(")");
		this.VisitIndentBlock("{", Node.ThenNode, "}");
		if(Node.ElseNode != null) {
			this.CurrentBuilder.Append("else");
			this.VisitIndentBlock("{", Node.ElseNode, "}");
		}
	}

	@Override public void VisitWhileNode(GtWhileNode Node) {
		this.CurrentBuilder.Append("while(");
		Node.CondNode.Accept(this);
		this.CurrentBuilder.Append(")");
		this.VisitIndentBlock("{", Node.BodyNode, "}");
	}

	@Override public void VisitDoWhileNode(GtDoWhileNode Node) {
		this.CurrentBuilder.Append("do ");
		this.VisitIndentBlock("{", Node.BodyNode, "}");
		this.CurrentBuilder.Append("while(");
		Node.CondNode.Accept(this);
		this.CurrentBuilder.Append(")");
	}

	@Override public void VisitForNode(GtForNode Node) {
		this.CurrentBuilder.Append("for(;");
		Node.CondNode.Accept(this);
		this.CurrentBuilder.Append(";");
		Node.IterNode.Accept(this);
		this.CurrentBuilder.Append(") ");
		this.VisitIndentBlock("{", Node.BodyNode, "}");
	}

	@Override public void VisitForEachNode(GtForEachNode Node) {
		Node.Variable.Accept(this);
		this.CurrentBuilder.Append("while(");
		Node.IterNode.Accept(this);
		this.CurrentBuilder.Append(")");
		this.VisitIndentBlock("{", Node.BodyNode, "}");	}

	@Override public void VisitContinueNode(GtContinueNode Node) {
		this.CurrentBuilder.Append("next");
		if(Node.Label != null) {
			this.CurrentBuilder.Append(" " + Node.Label);
		}
	}

	@Override public void VisitBreakNode(GtBreakNode Node) {
		this.CurrentBuilder.Append("last");
		if(Node.Label != null) {
			this.CurrentBuilder.Append(" " + Node.Label);
		}
	}

	@Override public void VisitStatementNode(GtStatementNode Node) {
		Node.ValueNode.Accept(this);
	}

	@Override public void VisitReturnNode(GtReturnNode Node) {
		this.CurrentBuilder.Append("return ");
		if(Node.ValueNode != null) {
			Node.ValueNode.Accept(this);
		}
		this.StopVisitor(Node);
	}

	@Override public void VisitYieldNode(GtYieldNode Node) {
		this.CurrentBuilder.Append("yield ");
		Node.ValueNode.Accept(this);
		this.StopVisitor(Node);
	}

	@Override public void VisitThrowNode(GtThrowNode Node) {
		this.CurrentBuilder.Append("throw ");
		Node.ValueNode.Accept(this);
		this.StopVisitor(Node);
	}

	@Override public void VisitTryNode(GtTryNode Node) {
		this.CurrentBuilder.Append("try ");
		this.VisitIndentBlock("{", Node.TryNode, "}");
		for (int i = 0; i < LibGreenTea.ListSize(Node.CatchList); i++) {
			Node.CatchList.get(i).Accept(this);
		}
		if(Node.FinallyNode != null) {
			this.CurrentBuilder.Append("finally ");
			this.VisitIndentBlock("{", Node.FinallyNode, "}");
		}
	}

	@Override public void VisitCatchNode(GtCatchNode Node) {
		this.CurrentBuilder.AppendLine(" catch " + Node.ExceptionType + " with {");
		this.CurrentBuilder.AppendLine(" my $" + Node.ExceptionName + " = shift;");
		this.VisitIndentBlock("{", Node.BodyNode, "}");
		this.CurrentBuilder.AppendLine("}");
	}

	@Override public void VisitSwitchNode(GtSwitchNode Node) {
		this.CurrentBuilder.Append("switch (");
		Node.MatchNode.Accept(this);
		this.CurrentBuilder.AppendLine(") {");
		for (/*local*/int i = 0; i < LibGreenTea.ListSize(Node.CaseList); i++) {
			Node.CaseList.get(i).Accept(this);
		}
		this.CurrentBuilder.AppendLine("}");
	}

	@Override public void VisitCaseNode(GtCaseNode Node) {
		this.CurrentBuilder.Append("case ");
		Node.CaseNode.Accept(this);
		this.CurrentBuilder.Append(" : ");
		this.VisitIndentBlock("{", Node.BodyNode, "}");
	}

	@Override public void VisitCommandNode(GtCommandNode Node) {
		this.CurrentBuilder.Append("String __Command = ");
		for(/*local*/int i = 0; i < LibGreenTea.ListSize(Node.ArgumentList); i += 1) {
			/*local*/GtNode Param = Node.ArgumentList.get(i);
			if(i != 0) {
				this.CurrentBuilder.Append(" . ");
			}
			this.CurrentBuilder.Append("(");
			Param.Accept(this);
			this.CurrentBuilder.Append(")");
		}
		this.CurrentBuilder.AppendLine(this.SemiColon);
		this.CurrentBuilder.AppendIndent();
		this.CurrentBuilder.Append("system(__Command)");
	}

	@Override public void VisitErrorNode(GtErrorNode Node) {
		/*local*/String Code = "throw Error(\"" + Node.Token.ParsedText + "\")";
		this.CurrentBuilder.Append(Code);
		this.StopVisitor(Node);
	}

	@Override public void GenerateFunc(GtFunc Func, ArrayList<String> ParamNameList, GtNode Body) {
		this.FlushErrorReport();
		/*local*/String FuncName = Func.GetNativeFuncName();
		this.CurrentBuilder.AppendLine("sub " + FuncName + " {");
		this.CurrentBuilder.Indent();
		for(/*local*/int i = 0; i < LibGreenTea.ListSize(ParamNameList); i += 1) {
			this.CurrentBuilder.AppendLine("my $" + ParamNameList.get(i) + " = $_[" + i + "];");
		}
		this.CurrentBuilder.UnIndent();
		this.VisitIndentBlock("", Body, "");
	}

	@Override public void OpenClassField(GtSyntaxTree ParsedTree, GtType Type, GtClassField ClassField) {
		/*local*/String TypeName = Type.ShortName;
		this.CurrentBuilder.AppendLine("package " + TypeName + this.SemiColon);
		if(Type.SuperType != null) {
			this.CurrentBuilder.AppendLine("# our @ISA = ('" + Type.SuperType.ShortName + "');" + this.SemiColon);
		}
		this.CurrentBuilder.AppendLine("sub new {");
		this.CurrentBuilder.Indent();
		this.CurrentBuilder.AppendLine("my $class = shift" + this.SemiColon);
		this.CurrentBuilder.AppendLine("my $" + this.GetRecvName() + " = {}" + this.SemiColon);
		for(/*local*/int i = 0; i < LibGreenTea.ListSize(ClassField.FieldList); i += 1) {
			/*local*/GtFieldInfo FieldInfo = ClassField.FieldList.get(i);
			/*local*/String InitValue = this.StringifyConstValue(FieldInfo.InitValue);
			if(!FieldInfo.Type.IsNativeType()) {
				InitValue = this.NullLiteral;
			}
			this.CurrentBuilder.AppendLine("$" + this.GetRecvName() + "->{'" + FieldInfo.NativeName + "'} = " + InitValue + this.SemiColon);
		}
		this.CurrentBuilder.AppendLine("return bless $" + this.GetRecvName() + ", $class");
		this.CurrentBuilder.UnIndent();
		this.CurrentBuilder.AppendLine("}");
		this.CurrentBuilder.AppendLine("package main;");
	}

	@Override public void InvokeMainFunc(String MainFuncName) {
		this.CurrentBuilder = this.NewSourceBuilder();
		this.CurrentBuilder.Append(MainFuncName);
		this.CurrentBuilder.AppendLine("();");
	}
}