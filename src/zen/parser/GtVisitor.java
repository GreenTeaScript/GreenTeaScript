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

package zen.parser;

import zen.ast.GtAndNode;
import zen.ast.GtApplyNode;
import zen.ast.GtBinaryNode;
import zen.ast.GtBooleanNode;
import zen.ast.GtCastNode;
import zen.ast.GtConstPoolNode;
import zen.ast.GtBlockNode;
import zen.ast.GtErrorNode;
import zen.ast.GtFloatNode;
import zen.ast.GtFuncDeclNode;
import zen.ast.GtFunctionLiteralNode;
import zen.ast.GtGetCapturedNode;
import zen.ast.GtGetLocalNode;
import zen.ast.GtGetterNode;
import zen.ast.GtIfNode;
import zen.ast.GtIntNode;
import zen.ast.GtMethodCall;
import zen.ast.GtNode;
import zen.ast.GtNullNode;
import zen.ast.GtOrNode;
import zen.ast.GtParamNode;
import zen.ast.GtReturnNode;
import zen.ast.GtSetCapturedNode;
import zen.ast.GtSetLocalNode;
import zen.ast.GtSetterNode;
import zen.ast.GtStringNode;
import zen.ast.GtTrinaryNode;
import zen.ast.GtUnaryNode;
import zen.ast.GtVarDeclNode;
//import zen.ast2.GtAllocateNode;
//import zen.ast2.GtApplyOverridedMethodNode;
//import zen.ast2.GtArrayLiteralNode;
//import zen.ast2.GtBreakNode;
//import zen.ast2.GtCaseNode;
//import zen.ast2.GtCatchNode;
//import zen.ast2.GtClassDeclNode;
//import zen.ast2.GtCommandNode;
//import zen.ast2.GtConstructorNode;
//import zen.ast2.GtContinueNode;
//import zen.ast2.GtDoWhileNode;
//import zen.ast2.GtForEachNode;
//import zen.ast2.GtForNode;
//import zen.ast2.GtGetIndexNode;
//import zen.ast2.GtInstanceOfNode;
//import zen.ast2.GtMapLiteralNode;
//import zen.ast2.GtNewArrayNode;
//import zen.ast2.GtPrefixDeclNode;
//import zen.ast2.GtPrefixInclNode;
//import zen.ast2.GtRegexNode;
//import zen.ast2.GtSetIndexNode;
//import zen.ast2.GtSliceNode;
//import zen.ast2.GtStatementNode;
//import zen.ast2.GtSuffixDeclNode;
//import zen.ast2.GtSuffixInclNode;
//import zen.ast2.GtSwitchNode;
//import zen.ast2.GtThrowNode;
//import zen.ast2.GtTryNode;
//import zen.ast2.GtUsingNode;
//import zen.ast2.GtWhileNode;
//import zen.ast2.GtYieldNode;

public interface GtVisitor {

	public abstract void VisitBlockNode(GtBlockNode Node);
	public abstract void VisitNullNode(GtNullNode Node);
	public abstract void VisitBooleanNode(GtBooleanNode Node);
	public abstract void VisitIntNode(GtIntNode Node);
	public abstract void VisitFloatNode(GtFloatNode Node);
	public abstract void VisitStringNode(GtStringNode Node);
	public abstract void VisitConstPoolNode(GtConstPoolNode Node);
	public abstract void VisitParamNode(GtParamNode Node);
	public abstract void VisitFunctionLiteralNode(GtFunctionLiteralNode Node);
	public abstract void VisitGetLocalNode(GtGetLocalNode Node);
	public abstract void VisitSetLocalNode(GtSetLocalNode Node);
	public abstract void VisitGetCapturedNode(GtGetCapturedNode Node);
	public abstract void VisitSetCapturedNode(GtSetCapturedNode Node);
	public abstract void VisitGetterNode(GtGetterNode Node);
	public abstract void VisitSetterNode(GtSetterNode Node);
	public abstract void VisitMethodCallNode(GtMethodCall Node);
	public abstract void VisitApplyNode(GtApplyNode Node);
	public abstract void VisitAndNode(GtAndNode Node);
	public abstract void VisitOrNode(GtOrNode Node);
	public abstract void VisitUnaryNode(GtUnaryNode Node);
	public abstract void VisitBinaryNode(GtBinaryNode Node);
	public abstract void VisitTrinaryNode(GtTrinaryNode Node);
	public abstract void VisitCastNode(GtCastNode Node);
	public abstract void VisitVarDeclNode(GtVarDeclNode Node);
	public abstract void VisitIfNode(GtIfNode Node);
	public abstract void VisitReturnNode(GtReturnNode Node);
	public abstract void VisitFuncDeclNode(GtFuncDeclNode FuncDeclNode);
	public abstract void VisitBlock(GtNode Node);
	public abstract void VisitErrorNode(GtErrorNode Node);

//	public abstract void VisitPrefixInclNode(GtPrefixInclNode Node);
//	public abstract void VisitPrefixDeclNode(GtPrefixDeclNode Node);
//	public abstract void VisitSuffixInclNode(GtSuffixInclNode Node);
//	public abstract void VisitSuffixDeclNode(GtSuffixDeclNode Node);
//	public abstract void VisitRegexNode(GtRegexNode Node);
//	public abstract void VisitArrayLiteralNode(GtArrayLiteralNode Node);
//	public abstract void VisitMapLiteralNode(GtMapLiteralNode Node);
//	public abstract void VisitApplyOverridedMethodNode(GtApplyOverridedMethodNode Node);
//	public abstract void VisitGetIndexNode(GtGetIndexNode Node);
//	public abstract void VisitSetIndexNode(GtSetIndexNode Node);
//	public abstract void VisitSliceNode(GtSliceNode Node);
//	public abstract void VisitConstructorNode(GtConstructorNode Node);
//	public abstract void VisitAllocateNode(GtAllocateNode Node);
//	public abstract void VisitNewArrayNode(GtNewArrayNode Node);
//	public abstract void VisitInstanceOfNode(GtInstanceOfNode Node);
//	public abstract void VisitUsingNode(GtUsingNode Node);
//	public abstract void VisitWhileNode(GtWhileNode Node);
//	public abstract void VisitDoWhileNode(GtDoWhileNode Node);
//	public abstract void VisitForNode(GtForNode Node);
//	public abstract void VisitForEachNode(GtForEachNode Node);
//	public abstract void VisitContinueNode(GtContinueNode Node);
//	public abstract void VisitBreakNode(GtBreakNode Node);
//	public abstract void VisitStatementNode(GtStatementNode Node);
//	public abstract void VisitYieldNode(GtYieldNode Node);
//	public abstract void VisitThrowNode(GtThrowNode Node);
//	public abstract void VisitTryNode(GtTryNode Node);
//	public abstract void VisitCatchNode(GtCatchNode Node);
//	public abstract void VisitSwitchNode(GtSwitchNode Node);
//	public abstract void VisitCaseNode(GtCaseNode Node);
//	public abstract void VisitCommandNode(GtCommandNode Node);
//	public abstract void VisitClassDeclNode(GtClassDeclNode ClassDeclNode);
}