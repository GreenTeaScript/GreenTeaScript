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
import zen.parser.GtType;
import zen.parser.GtVisitor;
import zen.parser.ZenUtils;


abstract class ZenTypeCheckerImpl implements GtVisitor {
	public final static int DefaultTypeCheckPolicy			= 0;
	public final static int NoCheckPolicy                   = 1;
	public final static int CastPolicy                      = (1 << 1);
	public final static int IgnoreEmptyPolicy               = (1 << 2);
	public final static int AllowEmptyPolicy                = (1 << 3);
	public final static int AllowVoidPolicy                 = (1 << 4);
	public final static int AllowCoercionPolicy             = (1 << 5);
	public final static int OnlyConstPolicy                 = (1 << 6);
	public final static int NullablePolicy                  = (1 << 8);
	public final static int BlockPolicy                     = (1 << 7);

	/*field*/private GtNameSpace NameSpace_;
	/*field*/private GtType ContextType_;
	/*field*/private GtNode TypedNode_;
	
	public final GtNameSpace GetNameSpace() {
		return this.NameSpace_;
	}
	
	public final GtType GetContextType() {
		return this.ContextType_;
	}
	
	public final boolean ReturnTypedNode(GtNode Node) {
		this.TypedNode_ = Node;
		return true;
	}
	
	public final GtNode TypeCheck(GtNode Node, GtNameSpace NameSpace, GtType ContextType, int TypeCheckPolicy) {
		GtNameSpace NameSpace_ = this.NameSpace_;
		GtType ContextType_ = this.ContextType_;
		GtNode TypedNode_ = this.TypedNode_;
		this.NameSpace_ = NameSpace;
		this.ContextType_ = ContextType;
		if(Node.Type.IsVarType()) {
			Node.Accept(this);
			Node = this.TypedNode_;
		}
		Node = this.TypeCheckImpl(Node, ContextType, TypeCheckPolicy);
		this.NameSpace_ = NameSpace_;
		this.ContextType_ = ContextType_;
		this.TypedNode_ = TypedNode_;
		return Node;
	}

	private final GtNode TypeCheckImpl(GtNode Node, GtType ContextType, int TypeCheckPolicy) {
		if(Node.IsErrorNode()) {
			return Node;
		}
//		if(Node.Type.IsUnrevealedType()) {
//			/*local*/GtFunc Func = ParsedTree.NameSpace.GetConverterFunc(Node.Type, Node.Type.BaseType, true);
//			Node = this.Generator.CreateCoercionNode(Func.GetReturnType(), ParsedTree.NameSpace, Func, Node);
//		}
//		System.err.println("**** " + Node.getClass());
//		/*local*/Object ConstValue = Node.ToConstValue(this.Context, IsFlag(TypeCheckPolicy, OnlyConstPolicy));
//		if(ConstValue != null && !(Node.IsConstNode())) {  // recreated
//			Node = this.Generator.CreateConstNode_OLD(Node.Type, ParsedTree, ConstValue);
//		}
//		if(IsFlag(TypeCheckPolicy, OnlyConstPolicy) && ConstValue == null) {
//			if(IsFlag(TypeCheckPolicy, NullablePolicy) && Node.IsNullNode()) { // OK
//			}
//			else {
//				return this.CreateSyntaxErrorNode(ParsedTree, "value must be const");
//			}
//		}
		if(ZenUtils.IsFlag(TypeCheckPolicy, AllowVoidPolicy) || Node.Type.IsVoidType()) {
			return Node;
		}
		if(Node.Type == ContextType || ContextType.IsVarType() || ContextType.Accept(Node.Type)) {
			return Node;
		}
//		/*local*/GtFunc Func1 = this.GetConverterFunc(Node.Type, ContextType, true);
//		if(Func1 != null && (Func1.Is(CoercionFunc) || IsFlag(TypeCheckPolicy, CastPolicy))) {
//			return this.Generator.CreateCoercionNode(Type, ParsedTree.NameSpace, Func1, Node);
//		}		
		//System.err.println("node="+ LibZen.GetClassName(Node) + "type error: requested = " + Type + ", given = " + Node.Type);
		return new GtErrorNode(Node.SourceToken, "type error: requested = " + ContextType + ", given = " + Node.Type);
	}

}

public class ZenTypeChecker extends ZenTypeCheckerImpl {

	@Override
	public boolean VisitNullNode(GtNullNode Node) {
		return this.ReturnTypedNode(Node);
	}

	@Override
	public boolean VisitBooleanNode(GtBooleanNode Node) {
		return this.ReturnTypedNode(Node);
	}

	@Override
	public boolean VisitIntNode(GtIntNode Node) {
		return this.ReturnTypedNode(Node);
	}

	@Override
	public boolean VisitFloatNode(GtFloatNode Node) {
		return this.ReturnTypedNode(Node);
	}

	@Override
	public boolean VisitStringNode(GtStringNode Node) {
		return this.ReturnTypedNode(Node);
	}

	@Override
	public boolean VisitConstPoolNode(GtConstPoolNode Node) {
		return this.ReturnTypedNode(Node);
	}

	@Override
	public boolean VisitArrayLiteralNode(GtArrayLiteralNode Node) {
		// TODO Auto-generated method stub
		return this.ReturnTypedNode(Node);
	}

	@Override
	public boolean VisitMapLiteralNode(GtMapLiteralNode Node) {
		// TODO Auto-generated method stub
		return this.ReturnTypedNode(Node);
	}

	@Override
	public boolean VisitNewArrayNode(GtNewArrayNode Node) {
		// TODO Auto-generated method stub
		return this.ReturnTypedNode(Node);
	}

	@Override
	public boolean VisitNewObjectNode(GtNewObjectNode Node) {
		// TODO Auto-generated method stub
		return this.ReturnTypedNode(Node);
	}

	@Override
	public boolean VisitGetLocalNode(GtGetLocalNode Node) {
		// TODO Auto-generated method stub
		return this.ReturnTypedNode(Node);
	}

	@Override
	public boolean VisitSetLocalNode(GtSetLocalNode Node) {
		// TODO Auto-generated method stub
		return this.ReturnTypedNode(Node);
	}

	@Override
	public boolean VisitGetCapturedNode(GtGetCapturedNode Node) {
		// TODO Auto-generated method stub
		return this.ReturnTypedNode(Node);
	}

	@Override
	public boolean VisitSetCapturedNode(GtSetCapturedNode Node) {
		// TODO Auto-generated method stub
		return this.ReturnTypedNode(Node);
	}

	@Override
	public boolean VisitGroupNode(GtGroupNode Node) {
		return this.ReturnTypedNode(this.TypeCheck(Node.RecvNode, this.GetNameSpace(), this.GetContextType(), DefaultTypeCheckPolicy));
	}

	@Override
	public boolean VisitGetterNode(GtGetterNode Node) {
		// TODO Auto-generated method stub
		return this.ReturnTypedNode(Node);
	}

	@Override
	public boolean VisitSetterNode(GtSetterNode Node) {
		// TODO Auto-generated method stub
		return this.ReturnTypedNode(Node);
	}

	@Override
	public boolean VisitGetIndexNode(GtGetIndexNode Node) {
		// TODO Auto-generated method stub
		return this.ReturnTypedNode(Node);
	}

	@Override
	public boolean VisitSetIndexNode(GtSetIndexNode Node) {
		// TODO Auto-generated method stub
		return this.ReturnTypedNode(Node);
	}

	@Override
	public boolean VisitMethodCallNode(GtMethodCall Node) {
		// TODO Auto-generated method stub
		return this.ReturnTypedNode(Node);
	}

	@Override
	public boolean VisitApplyNode(GtApplyNode Node) {
		// TODO Auto-generated method stub
		return this.ReturnTypedNode(Node);
	}

	@Override
	public boolean VisitAndNode(GtAndNode Node) {
		// TODO Auto-generated method stub
		return this.ReturnTypedNode(Node);
	}

	@Override
	public boolean VisitOrNode(GtOrNode Node) {
		// TODO Auto-generated method stub
		return this.ReturnTypedNode(Node);
	}

	@Override
	public boolean VisitUnaryNode(GtUnaryNode Node) {
		// TODO Auto-generated method stub
		return this.ReturnTypedNode(Node);
	}

	@Override
	public boolean VisitBinaryNode(GtBinaryNode Node) {
		// TODO Auto-generated method stub
		return this.ReturnTypedNode(Node);
	}

	@Override
	public boolean VisitCastNode(GtCastNode Node) {
		// TODO Auto-generated method stub
		return this.ReturnTypedNode(Node);
	}

	@Override
	public boolean VisitInstanceOfNode(GtInstanceOfNode Node) {
		// TODO Auto-generated method stub
		return this.ReturnTypedNode(Node);
	}

	@Override
	public boolean VisitBlockNode(GtBlockNode Node) {
		// TODO Auto-generated method stub
		return this.ReturnTypedNode(Node);
	}

	@Override
	public boolean VisitVarDeclNode(GtVarDeclNode Node) {
		// TODO Auto-generated method stub
		return this.ReturnTypedNode(Node);
	}

	@Override
	public boolean VisitIfNode(GtIfNode Node) {
		// TODO Auto-generated method stub
		return this.ReturnTypedNode(Node);
	}

	@Override
	public boolean VisitReturnNode(GtReturnNode Node) {
		// TODO Auto-generated method stub
		return this.ReturnTypedNode(Node);
	}

	@Override
	public boolean VisitWhileNode(GtWhileNode Node) {
		// TODO Auto-generated method stub
		return this.ReturnTypedNode(Node);
	}

	@Override
	public boolean VisitBreakNode(GtBreakNode Node) {
		// TODO Auto-generated method stub
		return this.ReturnTypedNode(Node);
	}

	@Override
	public boolean VisitThrowNode(GtThrowNode Node) {
		// TODO Auto-generated method stub
		return this.ReturnTypedNode(Node);
	}

	@Override
	public boolean VisitTryNode(GtTryNode Node) {
		// TODO Auto-generated method stub
		return this.ReturnTypedNode(Node);
	}

	@Override
	public boolean VisitCatchNode(GtCatchNode Node) {
		// TODO Auto-generated method stub
		return this.ReturnTypedNode(Node);
	}

	@Override
	public boolean VisitParamNode(GtParamNode Node) {
		// TODO Auto-generated method stub
		return this.ReturnTypedNode(Node);
	}

	@Override
	public boolean VisitFunctionLiteralNode(GtFunctionLiteralNode Node) {
		// TODO Auto-generated method stub
		return this.ReturnTypedNode(Node);
	}

	@Override
	public boolean VisitFuncDeclNode(GtFuncDeclNode Node) {
		// TODO Auto-generated method stub
		return this.ReturnTypedNode(Node);
	}

	@Override
	public boolean VisitErrorNode(GtErrorNode Node) {
		// TODO Auto-generated method stub
		return this.ReturnTypedNode(Node);
	}
	
}

