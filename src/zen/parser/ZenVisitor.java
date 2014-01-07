// ***************************************************************************
// Copyright (c) 2013-2014, Konoha project authors. All rights reserved.
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

package zen.parser;

import zen.ast.GtAndNode;
import zen.ast.GtApplyNode;
import zen.ast.GtArrayLiteralNode;
import zen.ast.GtBinaryNode;
import zen.ast.GtBlockNode;
import zen.ast.GtBooleanNode;
import zen.ast.GtBreakNode;
import zen.ast.GtCastNode;
import zen.ast.GtCatchNode;
import zen.ast.GtConstPoolNode;
import zen.ast.GtErrorNode;
import zen.ast.GtFloatNode;
import zen.ast.GtFuncDeclNode;
import zen.ast.GtFunctionLiteralNode;
import zen.ast.GtGetCapturedNode;
import zen.ast.GtGetIndexNode;
import zen.ast.GtGetLocalNode;
import zen.ast.GtGetterNode;
import zen.ast.GtGroupNode;
import zen.ast.GtIfNode;
import zen.ast.GtInstanceOfNode;
import zen.ast.GtIntNode;
import zen.ast.GtMapLiteralNode;
import zen.ast.GtMethodCallNode;
import zen.ast.GtNullNode;
import zen.ast.GtOrNode;
import zen.ast.GtParamNode;
import zen.ast.GtReturnNode;
import zen.ast.GtSetCapturedNode;
import zen.ast.GtSetIndexNode;
import zen.ast.GtSetLocalNode;
import zen.ast.GtSetterNode;
import zen.ast.GtStringNode;
import zen.ast.GtThrowNode;
import zen.ast.GtTryNode;
import zen.ast.GtUnaryNode;
import zen.ast.GtVarDeclNode;
import zen.ast.GtWhileNode;
import zen.ast2.GtNewArrayNode;
import zen.ast2.GtNewObjectNode;

public interface ZenVisitor {
	public abstract boolean VisitNullNode(GtNullNode Node);
	public abstract boolean VisitBooleanNode(GtBooleanNode Node);
	public abstract boolean VisitIntNode(GtIntNode Node);
	public abstract boolean VisitFloatNode(GtFloatNode Node);
	public abstract boolean VisitStringNode(GtStringNode Node);
	public abstract boolean VisitConstPoolNode(GtConstPoolNode Node);
	public abstract boolean VisitArrayLiteralNode(GtArrayLiteralNode Node);
	public abstract boolean VisitMapLiteralNode(GtMapLiteralNode Node);
	public abstract boolean VisitNewArrayNode(GtNewArrayNode Node);
	public abstract boolean VisitNewObjectNode(GtNewObjectNode Node);
	public abstract boolean VisitGetLocalNode(GtGetLocalNode Node);
	public abstract boolean VisitSetLocalNode(GtSetLocalNode Node);
	public abstract boolean VisitGetCapturedNode(GtGetCapturedNode Node);
	public abstract boolean VisitSetCapturedNode(GtSetCapturedNode Node);
	public abstract boolean VisitGroupNode(GtGroupNode Node);
	public abstract boolean VisitGetterNode(GtGetterNode Node);
	public abstract boolean VisitSetterNode(GtSetterNode Node);
	public abstract boolean VisitGetIndexNode(GtGetIndexNode Node);
	public abstract boolean VisitSetIndexNode(GtSetIndexNode Node);
	public abstract boolean VisitMethodCallNode(GtMethodCallNode Node);
	public abstract boolean VisitApplyNode(GtApplyNode Node);
	public abstract boolean VisitAndNode(GtAndNode Node);
	public abstract boolean VisitOrNode(GtOrNode Node);
	public abstract boolean VisitUnaryNode(GtUnaryNode Node);
	public abstract boolean VisitBinaryNode(GtBinaryNode Node);
	public abstract boolean VisitCastNode(GtCastNode Node);
	public abstract boolean VisitInstanceOfNode(GtInstanceOfNode Node);
	public abstract boolean VisitBlockNode(GtBlockNode Node);
	public abstract boolean VisitVarDeclNode(GtVarDeclNode Node);
	public abstract boolean VisitIfNode(GtIfNode Node);
	public abstract boolean VisitReturnNode(GtReturnNode Node);
	public abstract boolean VisitWhileNode(GtWhileNode Node);
	public abstract boolean VisitBreakNode(GtBreakNode Node);
	public abstract boolean VisitThrowNode(GtThrowNode Node);
	public abstract boolean VisitTryNode(GtTryNode Node);
	public abstract boolean VisitCatchNode(GtCatchNode Node);
	public abstract boolean VisitParamNode(GtParamNode Node);
	public abstract boolean VisitFunctionLiteralNode(GtFunctionLiteralNode Node);
	public abstract boolean VisitFuncDeclNode(GtFuncDeclNode FuncDeclNode);
	public abstract boolean VisitErrorNode(GtErrorNode Node);

//	public abstract boolean VisitTrinaryNode(GtTrinaryNode Node);
//	public abstract boolean VisitPrefixInclNode(GtPrefixInclNode Node);
//	public abstract boolean VisitPrefixDeclNode(GtPrefixDeclNode Node);
//	public abstract boolean VisitSuffixInclNode(GtSuffixInclNode Node);
//	public abstract boolean VisitSuffixDeclNode(GtSuffixDeclNode Node);
//	public abstract boolean VisitRegexNode(GtRegexNode Node);
//	public abstract boolean VisitApplyOverridedMethodNode(GtApplyOverridedMethodNode Node);
//	public abstract boolean VisitSliceNode(GtSliceNode Node);
//	public abstract boolean VisitAllocateNode(GtAllocateNode Node);
//	public abstract boolean VisitUsingNode(GtUsingNode Node);
//	public abstract boolean VisitDoWhileNode(GtDoWhileNode Node);
//	public abstract boolean VisitForNode(GtForNode Node);
//	public abstract boolean VisitForEachNode(GtForEachNode Node);
//	public abstract boolean VisitContinueNode(GtContinueNode Node);
//	public abstract boolean VisitStatementNode(GtStatementNode Node);
//	public abstract boolean VisitYieldNode(GtYieldNode Node);
//	public abstract boolean VisitSwitchNode(GtSwitchNode Node);
//	public abstract boolean VisitCaseNode(GtCaseNode Node);
//	public abstract boolean VisitCommandNode(GtCommandNode Node);
//	public abstract boolean VisitClassDeclNode(GtClassDeclNode ClassDeclNode);
}