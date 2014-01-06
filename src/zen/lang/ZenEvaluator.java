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

//ifdef JAVA

package zen.lang;

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
import zen.ast.GtMethodCall;
import zen.ast.GtNode;
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
import zen.parser.GtNameSpace;
import zen.parser.GtVisitor;

public class ZenEvaluator implements GtVisitor {
	/*field*/private GtNameSpace NameSpace_;
	/*field*/private boolean IsEnforced_;
	/*field*/private Object EvaledValue_;

	public final Object Eval(GtNode Node, GtNameSpace NameSpace, boolean IsEnforced) {
		this.NameSpace_ = NameSpace;
		this.IsEnforced_ = IsEnforced;
		Node.Accept(this);
		return this.EvaledValue_;
	}

	private boolean Return(Object Value) {
		this.EvaledValue_ = Value;
		return true;
	}

	private boolean Break() {
		this.EvaledValue_ = null;
		return false;
	}
	
	@Override
	public boolean VisitBlockNode(GtBlockNode Node) {
		// TODO Auto-generated method stub
		return false;
	}

	@Override
	public boolean VisitGroupNode(GtGroupNode Node) {
		return Node.Accept(this);
	}

	@Override
	public boolean VisitNullNode(GtNullNode Node) {
		return this.Return(null);
	}

	@Override
	public boolean VisitBooleanNode(GtBooleanNode Node) {
		return this.Return(Node.Value);
	}

	@Override
	public boolean VisitIntNode(GtIntNode Node) {
		return this.Return(Node.Value);
	}

	@Override
	public boolean VisitFloatNode(GtFloatNode Node) {
		return this.Return(Node.Value);
	}

	@Override
	public boolean VisitStringNode(GtStringNode Node) {
		return this.Return(Node.Value);
	}

	@Override
	public boolean VisitConstPoolNode(GtConstPoolNode Node) {
		return this.Return(Node.ConstValue);
	}

	@Override
	public boolean VisitGetLocalNode(GtGetLocalNode Node) {
		// TODO Auto-generated method stub
		return false;
	}

	@Override
	public boolean VisitSetLocalNode(GtSetLocalNode Node) {
		// TODO Auto-generated method stub
		return false;
	}

	@Override
	public boolean VisitGetCapturedNode(GtGetCapturedNode Node) {
		// TODO Auto-generated method stub
		return false;
	}

	@Override
	public boolean VisitSetCapturedNode(GtSetCapturedNode Node) {
		// TODO Auto-generated method stub
		return false;
	}

	@Override
	public boolean VisitGetterNode(GtGetterNode Node) {
		// TODO Auto-generated method stub
		return false;
	}

	@Override
	public boolean VisitSetterNode(GtSetterNode Node) {
		// TODO Auto-generated method stub
		return false;
	}

	@Override
	public boolean VisitGetIndexNode(GtGetIndexNode Node) {
		// TODO Auto-generated method stub
		return false;
	}

	@Override
	public boolean VisitSetIndexNode(GtSetIndexNode Node) {
		// TODO Auto-generated method stub
		return false;
	}

	@Override
	public boolean VisitMethodCallNode(GtMethodCall Node) {
		// TODO Auto-generated method stub
		return false;
	}

	@Override
	public boolean VisitApplyNode(GtApplyNode Node) {
		// TODO Auto-generated method stub
		return false;
	}

	@Override
	public boolean VisitAndNode(GtAndNode Node) {
		// TODO Auto-generated method stub
		return false;
	}

	@Override
	public boolean VisitOrNode(GtOrNode Node) {
		// TODO Auto-generated method stub
		return false;
	}

	@Override
	public boolean VisitUnaryNode(GtUnaryNode Node) {
		// TODO Auto-generated method stub
		return false;
	}

	@Override
	public boolean VisitBinaryNode(GtBinaryNode Node) {
		// TODO Auto-generated method stub
		return false;
	}

	@Override
	public boolean VisitCastNode(GtCastNode Node) {
		// TODO Auto-generated method stub
		return false;
	}

	@Override
	public boolean VisitInstanceOfNode(GtInstanceOfNode Node) {
		// TODO Auto-generated method stub
		return false;
	}

	@Override
	public boolean VisitVarDeclNode(GtVarDeclNode Node) {
		// TODO Auto-generated method stub
		return false;
	}

	@Override
	public boolean VisitIfNode(GtIfNode Node) {
		// TODO Auto-generated method stub
		return false;
	}

	@Override
	public boolean VisitReturnNode(GtReturnNode Node) {
		// TODO Auto-generated method stub
		return false;
	}

	@Override
	public boolean VisitParamNode(GtParamNode Node) {
		// TODO Auto-generated method stub
		return false;
	}

	@Override
	public boolean VisitWhileNode(GtWhileNode Node) {
		// TODO Auto-generated method stub
		return false;
	}

	@Override
	public boolean VisitBreakNode(GtBreakNode Node) {
		// TODO Auto-generated method stub
		return false;
	}

	@Override
	public boolean VisitThrowNode(GtThrowNode Node) {
		// TODO Auto-generated method stub
		return false;
	}

	@Override
	public boolean VisitTryNode(GtTryNode Node) {
		// TODO Auto-generated method stub
		return false;
	}

	@Override
	public boolean VisitCatchNode(GtCatchNode Node) {
		// TODO Auto-generated method stub
		return false;
	}

	@Override
	public boolean VisitFunctionLiteralNode(GtFunctionLiteralNode Node) {
		// TODO Auto-generated method stub
		return false;
	}

	@Override
	public boolean VisitFuncDeclNode(GtFuncDeclNode FuncDeclNode) {
		// TODO Auto-generated method stub
		return false;
	}

	@Override
	public boolean VisitErrorNode(GtErrorNode Node) {
		// TODO Auto-generated method stub
		return false;
	}

	@Override
	public boolean VisitArrayLiteralNode(GtArrayLiteralNode Node) {
		// TODO Auto-generated method stub
		return false;
	}

	@Override
	public boolean VisitMapLiteralNode(GtMapLiteralNode Node) {
		// TODO Auto-generated method stub
		return false;
	}

	@Override
	public boolean VisitNewArrayNode(GtNewArrayNode Node) {
		// TODO Auto-generated method stub
		return false;
	}

	@Override
	public boolean VisitNewObjectNode(GtNewObjectNode Node) {
		// TODO Auto-generated method stub
		return false;
	}
	
}
