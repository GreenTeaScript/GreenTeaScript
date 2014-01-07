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
import zen.ast.GtMethodCallNode;
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
import zen.parser.ZenVisitor;
import zen.parser.ZenUtils;


abstract class ZenTypeCheckerImpl implements ZenVisitor {
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
	/*field*/private ZenType ContextType_;
	/*field*/private GtNode TypedNode_;
	
	public final GtNameSpace GetNameSpace() {
		return this.NameSpace_;
	}
	
	public final ZenType GetContextType() {
		return this.ContextType_;
	}
	
	public final boolean ReturnTypedNode(GtNode Node) {
		this.TypedNode_ = Node;
		return true;
	}

	public final boolean ReturnNode(GtNode Node, ZenType Type) {
		Node.Type = Type;
		this.TypedNode_ = Node;
		return true;
	}
	
	public final GtNode TypeCheck(GtNode Node, GtNameSpace NameSpace, ZenType ContextType, int TypeCheckPolicy) {
		GtNameSpace NameSpace_ = this.NameSpace_;
		ZenType ContextType_ = this.ContextType_;
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
	
	private final GtNode TypeCheckImpl(GtNode Node, ZenType ContextType, int TypeCheckPolicy) {
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
	
	protected final ZenType GetFieldType(GtNameSpace NameSpace, ZenType BaseType, String Name) {
		return NameSpace.Generator.GetFieldType(BaseType, Name);
	}

	protected final ZenType GetSetterType(GtNameSpace NameSpace, ZenType BaseType, String Name) {
		return NameSpace.Generator.GetSetterType(BaseType, Name);
	}

	protected ZenType GetReturnType(GtNameSpace NameSpace) {
		// TODO Auto-generated method stub
		return null;
	}

	protected void InferReturnType(GtNameSpace NameSpace, ZenType InferredType) {
		// TODO Auto-generated method stub
	}
 
	protected GtNode CreateDefaultValueNode(ZenType Type) {
		// TODO Auto-generated method stub
		return null;
	}

	protected GtNode CreateReadOnlyErrorNode(GtNode Node, ZenType ClassType, String NativeName) {
		// TODO Auto-generated method stub
		return null;
	}

}

public class ZenTypeChecker extends ZenTypeCheckerImpl {

	@Override
	public boolean VisitNullNode(GtNullNode Node) {
		ZenType Type = this.GetContextType();
		if(Type.IsVarType()) {
			Type = ZenSystem.AnyType;
		}
		return this.ReturnNode(Node, Type);
	}

	@Override
	public boolean VisitBooleanNode(GtBooleanNode Node) {
		Node.Type = ZenSystem.BooleanType;
		return this.ReturnTypedNode(Node);
	}

	@Override
	public boolean VisitIntNode(GtIntNode Node) {
		Node.Type = ZenSystem.IntType;
		return this.ReturnTypedNode(Node);
	}

	@Override
	public boolean VisitFloatNode(GtFloatNode Node) {
		Node.Type = ZenSystem.FloatType;
		return this.ReturnTypedNode(Node);
	}

	@Override
	public boolean VisitStringNode(GtStringNode Node) {
		Node.Type = ZenSystem.StringType;
		return this.ReturnTypedNode(Node);
	}

	@Override
	public boolean VisitConstPoolNode(GtConstPoolNode Node) {
		Node.Type = ZenSystem.GuessType(Node.ConstValue);
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
	public boolean VisitGetIndexNode(GtGetIndexNode Node) {
		GtNameSpace NameSpace = this.GetNameSpace();
		Node.RecvNode = this.TypeCheck(Node.RecvNode, NameSpace, ZenSystem.BooleanType, DefaultTypeCheckPolicy);
		if(Node.RecvNode.IsErrorNode()) {
			return this.ReturnTypedNode(Node.RecvNode);			
		}
		
		return this.ReturnTypedNode(Node);
	}

	@Override
	public boolean VisitSetIndexNode(GtSetIndexNode Node) {
		// TODO Auto-generated method stub
		return this.ReturnTypedNode(Node);
	}

	@Override
	public boolean VisitGroupNode(GtGroupNode Node) {
		return this.ReturnTypedNode(this.TypeCheck(Node.RecvNode, this.GetNameSpace(), this.GetContextType(), DefaultTypeCheckPolicy));
	}

	@Override public boolean VisitGetterNode(GtGetterNode Node) {
		GtNameSpace NameSpace = this.GetNameSpace();
		Node.RecvNode = this.TypeCheck(Node.RecvNode, NameSpace, ZenSystem.BooleanType, DefaultTypeCheckPolicy);
		if(Node.RecvNode.IsErrorNode()) {
			return this.ReturnTypedNode(Node.RecvNode);			
		}
		ZenType FieldType = this.GetFieldType(NameSpace, Node.RecvNode.Type, Node.NativeName);
		Node.Type = FieldType;
		return this.ReturnTypedNode(Node);
	}

	@Override public boolean VisitSetterNode(GtSetterNode Node) {
		GtNameSpace NameSpace = this.GetNameSpace();
		ZenType ContextType = this.GetContextType();
		Node.RecvNode = this.TypeCheck(Node.RecvNode, NameSpace, ZenSystem.BooleanType, DefaultTypeCheckPolicy);
		if(Node.RecvNode.IsErrorNode()) {
			return this.ReturnTypedNode(Node.RecvNode);			
		}
		ZenType FieldType = this.GetSetterType(NameSpace, Node.RecvNode.Type, Node.NativeName);
		if(FieldType.IsVoidType()) {
			return this.ReturnTypedNode(this.CreateReadOnlyErrorNode(Node, Node.RecvNode.Type, Node.NativeName));
		}
		Node.ValueNode = this.TypeCheck(Node.ValueNode, NameSpace, FieldType, DefaultTypeCheckPolicy);
		if(Node.ValueNode.IsErrorNode()) {
			return this.ReturnTypedNode(Node.ValueNode);
		}
		Node.Type = ContextType.IsVoidType() ? ContextType : FieldType;
		return this.ReturnTypedNode(Node);
	}

	@Override public boolean VisitMethodCallNode(GtMethodCallNode Node) {
		// TODO Auto-generated method stub
		return this.ReturnTypedNode(Node);
	}

	@Override public boolean VisitApplyNode(GtApplyNode Node) {
		GtNameSpace NameSpace = this.GetNameSpace();
		int i = 0;
		while(i < Node.ParamList.size()) {
			GtNode SubNode = Node.ParamList.get(i);
			SubNode = this.TypeCheck(SubNode, NameSpace, ZenSystem.VarType, DefaultTypeCheckPolicy);
			if(SubNode.IsErrorNode()) {
				return this.ReturnTypedNode(SubNode);
			}
			Node.ParamList.set(i, SubNode);
			i = i + 1;
		}
		return this.ReturnNode(Node, ZenSystem.VarType);
	}

	@Override public boolean VisitAndNode(GtAndNode Node) {
		GtNameSpace NameSpace = this.GetNameSpace();
		Node.LeftNode = this.TypeCheck(Node.LeftNode, NameSpace, ZenSystem.BooleanType, DefaultTypeCheckPolicy);
		if(Node.LeftNode.IsErrorNode()) {
			return this.ReturnTypedNode(Node.LeftNode);
		}
		Node.RightNode = this.TypeCheck(Node.RightNode, NameSpace, ZenSystem.BooleanType, DefaultTypeCheckPolicy);
		if(Node.RightNode.IsErrorNode()) {
			return this.ReturnTypedNode(Node.RightNode);
		}
		Node.Type = ZenSystem.BooleanType;
		return this.ReturnTypedNode(Node);
	}

	@Override public boolean VisitOrNode(GtOrNode Node) {
		GtNameSpace NameSpace = this.GetNameSpace();
		Node.LeftNode = this.TypeCheck(Node.LeftNode, NameSpace, ZenSystem.BooleanType, DefaultTypeCheckPolicy);
		if(Node.LeftNode.IsErrorNode()) {
			return this.ReturnTypedNode(Node.LeftNode);
		}
		Node.RightNode = this.TypeCheck(Node.RightNode, NameSpace, ZenSystem.BooleanType, DefaultTypeCheckPolicy);
		if(Node.RightNode.IsErrorNode()) {
			return this.ReturnTypedNode(Node.RightNode);
		}
		Node.Type = ZenSystem.BooleanType;
		return this.ReturnTypedNode(Node);
	}

	@Override public boolean VisitUnaryNode(GtUnaryNode Node) {
		// TODO Auto-generated method stub
		return this.ReturnTypedNode(Node);
	}

	@Override public boolean VisitBinaryNode(GtBinaryNode Node) {
		GtNameSpace NameSpace = this.GetNameSpace();
		Node.LeftNode = this.TypeCheck(Node.LeftNode, NameSpace, ZenSystem.VarType, DefaultTypeCheckPolicy);
		if(Node.LeftNode.IsErrorNode()) {
			return this.ReturnTypedNode(Node.LeftNode);
		}
		Node.RightNode = this.TypeCheck(Node.RightNode, NameSpace, ZenSystem.VarType, DefaultTypeCheckPolicy);
		if(Node.RightNode.IsErrorNode()) {
			return this.ReturnTypedNode(Node.RightNode);
		}
//		GtType OperatorType = this.GetBinaryOperatorType(Node.LeftNode.Type, Node.SourceToken, Node.RightNode.Type);
		return this.ReturnTypedNode(Node);
	}

	@Override public boolean VisitCastNode(GtCastNode Node) {
		// TODO Auto-generated method stub
		return this.ReturnTypedNode(Node);
	}

	@Override public boolean VisitInstanceOfNode(GtInstanceOfNode Node) {
		GtNameSpace NameSpace = this.GetNameSpace();
		Node.LeftNode = this.TypeCheck(Node.LeftNode, NameSpace, ZenSystem.VarType, DefaultTypeCheckPolicy);
		if(Node.LeftNode.IsErrorNode()) {
			return this.ReturnTypedNode(Node.LeftNode);
		}
		return this.ReturnNode(Node, ZenSystem.BooleanType);
	}

	@Override
	public boolean VisitBlockNode(GtBlockNode Node) {
		ZenType ContextType = this.GetContextType();
		int i = 0;
		while(i < Node.NodeList.size() - 1) {
			GtNode SubNode = Node.NodeList.get(i);
			SubNode = this.TypeCheck(SubNode, Node.NameSpace, ZenSystem.VoidType, DefaultTypeCheckPolicy);
			Node.NodeList.set(i, SubNode);
			i = i + 1;
		}
		if(i < Node.NodeList.size()) {
			GtNode LastNode = Node.NodeList.get(i);
			LastNode = this.TypeCheck(LastNode, Node.NameSpace, ContextType, DefaultTypeCheckPolicy);
			Node.NodeList.set(i, LastNode);
			if(ContextType.IsVarType()) {
				ContextType = LastNode.Type;
			}
		}
		return this.ReturnNode(Node, ContextType);
	}

	@Override
	public boolean VisitVarDeclNode(GtVarDeclNode Node) {
		// TODO Auto-generated method stub
		return this.ReturnTypedNode(Node);
	}

	@Override public boolean VisitIfNode(GtIfNode Node) {
		ZenType ContextType = this.GetContextType();
		GtNameSpace NameSpace = this.GetNameSpace();
		Node.CondNode = this.TypeCheck(Node.CondNode, NameSpace, ZenSystem.BooleanType, DefaultTypeCheckPolicy);
		if(Node.CondNode.IsErrorNode()) {
			return this.ReturnTypedNode(Node.CondNode);
		}
		Node.ThenNode = this.TypeCheck(Node.ThenNode, NameSpace, ContextType, DefaultTypeCheckPolicy);
		if(Node.ThenNode.IsErrorNode()) {
			return this.ReturnTypedNode(Node.ThenNode);
		}
		if(Node.ElseNode != null) {
			Node.ElseNode = this.TypeCheck(Node.ElseNode, NameSpace, Node.ThenNode.Type, DefaultTypeCheckPolicy);
		}
		return this.ReturnNode(Node, Node.ThenNode.Type);
	}

	@Override public boolean VisitReturnNode(GtReturnNode Node) {
		GtNameSpace NameSpace = this.GetNameSpace();
		ZenType ReturnType = this.GetReturnType(NameSpace);
		if(Node.ValueNode != null) {
			Node.ValueNode = this.TypeCheck(Node.ValueNode, NameSpace, ReturnType, DefaultTypeCheckPolicy);
			if(Node.ValueNode.IsErrorNode()) {
				return this.ReturnTypedNode(Node.ValueNode);
			}
		}
		if(ReturnType.IsVarType()) {
			if(Node.ValueNode == null) {
				this.InferReturnType(NameSpace, ZenSystem.VoidType);
			}
			else {
				this.InferReturnType(NameSpace, Node.ValueNode.Type);
			}
		}
		else if(ReturnType.IsVoidType()) {
			if(Node.ValueNode != null) {
				Node.ValueNode = null;
			}
		}
		else {
			if(Node.ValueNode == null) {
				Node.ValueNode = this.CreateDefaultValueNode(ReturnType);
			}
		}
		return this.ReturnNode(Node, ZenSystem.VoidType);
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
		Node.Type = ZenSystem.VoidType;
		return this.ReturnTypedNode(Node);
	}
	
}

