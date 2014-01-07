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

import zen.ast.GtBooleanNode;
import zen.ast.GtConstPoolNode;
import zen.ast.GtFloatNode;
import zen.ast.GtGetCapturedNode;
import zen.ast.GtGetLocalNode;
import zen.ast.GtIntNode;
import zen.ast.GtNode;
import zen.ast.GtSetCapturedNode;
import zen.ast.GtSetLocalNode;
import zen.ast.GtStringNode;
import zen.lang.ZenType;

public abstract class ZenNodeUtils {
	//	public final GtNode CreateUnsupportedNode(GtType Type, GtSyntaxTree ParsedTree) {
	//		/*local*/GtToken Token = ParsedTree.KeyToken;
	//		this.Context.ReportError(GreenTeaConsts.ErrorLevel, Token, this.TargetCode + " has no language support for " + Token.ParsedText);
	//		return new GtErrorNode(GtStaticTable.VoidType, ParsedTree.KeyToken);
	//	}

	public final static GtNode CreateConstNode(GtToken SourceToken, Object Value) {
		if(Value instanceof Boolean) {
			return new GtBooleanNode(SourceToken, (Boolean) Value);
		}
		if((Value instanceof Long) || (Value instanceof Integer)) {
			return new GtIntNode(SourceToken, ((Number)Value).longValue());
		}
		if((Value instanceof Double) || (Value instanceof Float)) {
			return new GtFloatNode(SourceToken, ((Number)Value).doubleValue());
		}
		if(Value instanceof String) {
			return new GtStringNode(SourceToken, Value.toString());
		}
		return new GtConstPoolNode(SourceToken, Value);
	}

	public final GtNode CreateSymbolNode(GtToken SourceToken, ZenType Type, String NativeName, boolean IsCaptured, GtNode AssignedNode) {
		if(AssignedNode != null) {
			if(IsCaptured) {
				return new GtSetCapturedNode(Type, SourceToken, NativeName, AssignedNode);
			}
			else {
				return new GtSetLocalNode(Type, SourceToken, NativeName, AssignedNode);
			}
		}
		else {
			if(IsCaptured) {
				return new GtGetCapturedNode(Type, SourceToken, NativeName);
			}
			else {
				return new GtGetLocalNode(Type, SourceToken, NativeName);
			}
		}
	}

	//	public GtNode CreateNullNode_OLD(GtType Type, GtSyntaxTree ParsedTree) {
	//		return new GtNullNode(Type, ParsedTree.KeyToken);
	//	}
	//
	//
	//	public GtNode CreateArrayLiteralNode(GtType Type, GtSyntaxTree ParsedTree) {
	//		return new GtArrayLiteralNode(Type, ParsedTree.KeyToken);
	//	}
	//
	//	public GtNode CreateMapLiteralNode(GtType Type, GtSyntaxTree ParsedTree) {
	//		return new GtMapLiteralNode(Type, ParsedTree.KeyToken);
	//	}
	//
	//	public GtNode CreateParamNode(GtType Type, GtSyntaxTree ParsedTree, String Name, GtNode InitNode) {
	//		return new GtParamNode(Type, ParsedTree.KeyToken, Name, InitNode);
	//	}
	//
	//	public GtNode CreateFunctionLiteralNode(GtType Type, GtSyntaxTree ParsedTree, GtNode BodyNode) {
	//		return new GtFunctionLiteralNode(Type, ParsedTree.KeyToken, BodyNode);
	//	}
	//
	//	public GtNode CreateGetLocalNode(GtType Type, GtSyntaxTree ParsedTree, String NativeName) {
	//		return new GtGetLocalNode(Type, ParsedTree.KeyToken, NativeName);
	//	}
	//
	//	public GtNode CreateSetLocalNode(GtType Type, GtSyntaxTree ParsedTree, String NativeName, GtNode ValueNode) {
	//		return new GtSetLocalNode(Type, ParsedTree.KeyToken, NativeName, ValueNode);
	//	}
	//
	//	public GtNode CreateGetCapturedNode(GtType Type, GtSyntaxTree ParsedTree, String NativeName) {
	//		return new GtGetCapturedNode(Type, ParsedTree.KeyToken, NativeName);
	//	}
	//
	//	public GtNode CreateSetCapturedNode(GtType Type, GtSyntaxTree ParsedTree, String NativeName, GtNode ValueNode) {
	//		return new GtSetCapturedNode(Type, ParsedTree.KeyToken, NativeName, ValueNode);
	//	}
	//
	//	public GtNode CreateGetterNode(GtType Type, GtSyntaxTree ParsedTree, GtNode RecvNode, String NativeName) {
	//		return new GtGetterNode(Type, ParsedTree.KeyToken, RecvNode, NativeName);
	//	}
	//
	//	public GtNode CreateSetterNode(GtType Type, GtSyntaxTree ParsedTree, GtNode RecvNode, String NativeName, GtNode ValueNode) {
	//		return new GtSetterNode(Type, ParsedTree.KeyToken, RecvNode, NativeName, ValueNode);
	//	}
	//
	//	public GtNode CreateApplySymbolNode(GtType Type, GtSyntaxTree ParsedTree, String FuncName, GtFunc Func) {
	//		GtApplyNode Node = new GtApplyNode(Type, ParsedTree == null ? GtTokenContext.NullToken : ParsedTree.KeyToken, FuncName);
	//		Node.ResolvedFunc = Func;
	//		return Node;
	//	}
	//
	//	public GtNode CreateApplyFunctionObjectNode(GtType Type, GtSyntaxTree ParsedTree, GtNode FuncNode) {
	//		return new GtMethodNode(Type, ParsedTree.KeyToken, FuncNode);
	//	}
	//
	//	public GtNode CreateApplyOverridedMethodNode(GtType Type, GtSyntaxTree ParsedTree, GtNameSpace NameSpace, GtFunc Func) {
	//		return new GtApplyOverridedMethodNode(Type, ParsedTree.KeyToken, NameSpace, Func);
	//	}
	//
	//	public GtNode CreateGetIndexNode(GtType Type, GtSyntaxTree ParsedTree, GtNode RecvNode, GtFunc Func, GtNode IndexNode) {
	//		GtGetIndexNode Node = new GtGetIndexNode(Type, ParsedTree.KeyToken, RecvNode, IndexNode);
	//		Node.ResolvedFunc = Func;
	//		return Node;
	//	}
	//
	//	public GtNode CreateSetIndexNode(GtType Type, GtSyntaxTree ParsedTree, GtNode RecvNode, GtFunc Func, GtNode IndexNode, GtNode ValueNode) {
	//		GtSetIndexNode Node = new GtSetIndexNode(Type, ParsedTree.KeyToken, RecvNode, IndexNode, ValueNode);
	//		Node.ResolvedFunc = Func;
	//		return Node;
	//	}
	//
	//	public GtNode CreateSliceNode(GtType Type, GtSyntaxTree ParsedTree, GtNode RecvNode, GtNode Index1, GtNode Index2) {
	//		return new GtSliceNode(Type, ParsedTree.KeyToken, RecvNode, Index1, Index2);
	//	}
	//
	//	public GtNode CreateAndNode(GtType Type, GtSyntaxTree ParsedTree, GtNode LeftNode, GtNode RightNode) {
	//		return new GtAndNode(Type, ParsedTree.KeyToken, LeftNode, RightNode);
	//	}
	//
	//	public GtNode CreateOrNode(GtType Type, GtSyntaxTree ParsedTree, GtNode LeftNode, GtNode RightNode) {
	//		return new GtOrNode(Type, ParsedTree.KeyToken, LeftNode, RightNode);
	//	}
	//
	//	public GtNode CreateUnaryNode(GtType Type, GtSyntaxTree ParsedTree, String OperatorName, GtNode ValueNode) {
	//		return new GtUnaryNode(Type, ParsedTree.KeyToken, OperatorName, ValueNode);
	//	}
	//
	//	public GtNode CreatePrefixInclNode(GtType Type, GtSyntaxTree ParsedTree, GtNode RecvNode) {
	//		return new GtPrefixInclNode(Type, ParsedTree.KeyToken, RecvNode);
	//	}
	//
	//	public GtNode CreatePrefixDeclNode(GtType Type, GtSyntaxTree ParsedTree, GtNode RecvNode) {
	//		return new GtPrefixDeclNode(Type, ParsedTree.KeyToken, RecvNode);
	//	}
	//
	//	public GtNode CreateSuffixInclNode(GtType Type, GtSyntaxTree ParsedTree, GtNode RecvNode) {
	//		return new GtSuffixInclNode(Type, ParsedTree.KeyToken, RecvNode);
	//	}
	//
	//	public GtNode CreateSuffixDeclNode(GtType Type, GtSyntaxTree ParsedTree, GtNode RecvNode) {
	//		return new GtSuffixDeclNode(Type, ParsedTree.KeyToken, RecvNode);
	//	}
	//
	//	public GtNode CreateBinaryNode(GtType Type, GtSyntaxTree ParsedTree, String OperatorName, GtNode LeftNode, GtNode RightNode) {
	//		return new GtBinaryNode(Type, ParsedTree.KeyToken, OperatorName, LeftNode, RightNode);
	//	}
	//
	//	public GtNode CreateTrinaryNode(GtType Type, GtSyntaxTree ParsedTree, GtNode CondNode, GtNode ThenNode, GtNode ElseNode) {
	//		return new GtTrinaryNode(Type, ParsedTree.KeyToken, CondNode, ThenNode, ElseNode);
	//	}
	//
	//	public GtNode CreateConstructorNode(GtType Type, GtSyntaxTree ParsedTree, GtFunc Func) {
	//		return new GtConstructorNode(Type, ParsedTree.KeyToken, Func);
	//	}
	//
	//	public GtNode CreateAllocateNode(GtType Type, GtSyntaxTree ParsedTree) {
	//		return new GtAllocateNode(Type, ParsedTree.KeyToken);
	//	}
	//
	//	public GtNode CreateNewArrayNode(GtType Type, GtSyntaxTree ParsedTree) {
	//		return new GtNewArrayNode(Type, ParsedTree.KeyToken);
	//	}
	//
	//	public GtNode CreateInstanceOfNode(GtType Type, GtSyntaxTree ParsedTree, GtNode ExprNode, GtType TypeInfo) {
	//		return new GtInstanceOfNode(Type, ParsedTree.KeyToken, ExprNode, TypeInfo);
	//	}
	//
	//	public GtNode CreateCastNode(GtType Type, GtSyntaxTree ParsedTree, GtNode ExprNode, GtType TypeInfo) {
	//		return new GtCastNode(Type, ParsedTree.KeyToken, TypeInfo, ExprNode);
	//	}
	//
	//	public GtNode CreateVarDeclNode(GtType Type, GtSyntaxTree ParsedTree, GtType DeclType, String VariableName, GtNode InitNode, GtNode Block) {
	//		return new GtVarDeclNode(Type, ParsedTree.KeyToken, DeclType, VariableName, InitNode, Block);
	//	}
	//
	//	public GtNode CreateUsingNode(GtType Type, GtSyntaxTree ParsedTree, GtType DeclType, String VariableName, GtNode InitNode, GtNode Block) {
	//		return new GtUsingNode(Type, ParsedTree.KeyToken, DeclType, VariableName, InitNode, Block);
	//	}
	//
	//	public GtNode CreateIfNode(GtType Type, GtSyntaxTree ParsedTree, GtNode CondNode, GtNode ThenNode, GtNode ElseNode) {
	//		return new GtIfNode(Type, ParsedTree.KeyToken, CondNode, ThenNode, ElseNode);
	//	}
	//
	//	public GtNode CreateWhileNode(GtType Type, GtSyntaxTree ParsedTree, GtNode CondNode, GtNode BodyNode) {
	//		return new GtWhileNode(Type, ParsedTree.KeyToken, CondNode, BodyNode);
	//	}
	//
	//	public GtNode CreateDoWhileNode(GtType Type, GtSyntaxTree ParsedTree, GtNode CondNode, GtNode BodyNode) {
	//		return new GtDoWhileNode(Type, ParsedTree.KeyToken, CondNode, BodyNode);
	//	}
	//
	//	public GtNode CreateForNode(GtType Type, GtSyntaxTree ParsedTree, GtNode CondNode, GtNode IterNode, GtNode BodyNode) {
	//		return new GtForNode(Type, ParsedTree.KeyToken, CondNode, IterNode, BodyNode);
	//	}
	//
	//	public GtNode CreateForEachNode(GtType Type, GtSyntaxTree ParsedTree, GtNode VariableNode, GtNode IterNode, GtNode BodyNode) {
	//		return new GtForEachNode(Type, ParsedTree.KeyToken, VariableNode, IterNode, BodyNode);
	//	}
	//
	//	public GtNode CreateContinueNode(GtType Type, GtSyntaxTree ParsedTree, String LabelName) {
	//		return new GtContinueNode(Type, ParsedTree.KeyToken, LabelName);
	//	}
	//
	//	public GtNode CreateBreakNode(GtType Type, GtSyntaxTree ParsedTree, String LabelName) {
	//		return new GtBreakNode(Type, ParsedTree.KeyToken, LabelName);
	//	}
	//
	//	public GtNode CreateStatementNode(GtType Type, GtSyntaxTree ParsedTree, GtNode ValueNode) {
	//		return new GtStatementNode(Type, ParsedTree.KeyToken, ValueNode);
	//	}
	//
	//	public GtNode CreateReturnNode(GtType Type, GtSyntaxTree ParsedTree, GtNode ValueNode) {
	//		return new GtReturnNode(Type, ParsedTree.KeyToken, ValueNode);
	//	}
	//
	//	public GtNode CreateYieldNode(GtType Type, GtSyntaxTree ParsedTree, GtNode ValueNode) {
	//		return new GtYieldNode(Type, ParsedTree.KeyToken, ValueNode);
	//	}
	//
	//	public GtNode CreateThrowNode(GtType Type, GtSyntaxTree ParsedTree, GtNode ValueNode) {
	//		return new GtThrowNode(Type, ParsedTree.KeyToken, ValueNode);
	//	}
	//
	//	public GtNode CreateTryNode(GtType Type, GtSyntaxTree ParsedTree, GtNode TryBlock, GtNode FinallyBlock) {
	//		return new GtTryNode(Type, ParsedTree.KeyToken, TryBlock, FinallyBlock);
	//	}
	//
	//	public GtNode CreateCatchNode(GtType Type, GtSyntaxTree ParsedTree, GtType ExceptionType, String Name, GtNode BodyNode) {
	//		return new GtCatchNode(Type, ParsedTree.KeyToken, ExceptionType, Name, BodyNode);
	//	}
	//
	//	public GtNode CreateSwitchNode(GtType Type, GtSyntaxTree ParsedTree, GtNode MatchNode, GtNode DefaultBlock) {
	//		return new GtSwitchNode(Type, ParsedTree.KeyToken, MatchNode, DefaultBlock);
	//	}
	//
	//	public GtNode CreateCaseNode(GtType Type, GtSyntaxTree ParsedTree, GtNode CaseNode, GtNode BodyNode) {
	//		return new GtCaseNode(Type, ParsedTree.KeyToken, CaseNode, BodyNode);
	//	}
	//
	//	public GtNode CreateCommandNode(GtType Type, GtSyntaxTree ParsedTree, GtNode PipedNextNode) {
	//		return new GtCommandNode(Type, ParsedTree.KeyToken, PipedNextNode);
	//	}
	//
	//	public GtNode CreateErrorNode(GtType Type, GtSyntaxTree ParsedTree) {
	//		return new GtErrorNode(Type, ParsedTree.KeyToken);
	//	}

	// useful Create* API
	//	public final GtNode CreateCoercionNode(GtType Type, GtNameSpace NameSpace, GtFunc Func, GtNode Node) {
	//		/*local*/GtNode ApplyNode = this.CreateApplySymbolNode(Type, null, "Coercion", Func);
	//		ApplyNode.Append(Node);
	//		return ApplyNode;
	//	}
	//
	//
	//	public final GtNode CreateConstNode_OLD(GtType Type, GtSyntaxTree ParsedTree, Object Value) {
	//		if(Value instanceof Boolean) {
	//			return this.CreateBooleanNode(ParsedTree.KeyToken, (Boolean) Value);
	//		}
	//		if(Value instanceof Long) {
	//			return this.CreateIntNode(ParsedTree.KeyToken, (Long) Value);
	//		}
	//		if(Value instanceof Double) {
	//			return this.CreateFloatNode(ParsedTree.KeyToken, (Double) Value);
	//		}
	//		if(Value instanceof String) {
	//			return this.CreateStringNode(ParsedTree.KeyToken, (String) Value);
	//		}
	////		if(Value instanceof Rexex) {
	////			return CreateRegexNode(Type, ParsedTree, (String) Value);
	////		}
	//		return this.CreateConstPoolNode(ParsedTree.KeyToken, Value);
	//	}
	//
	//	public GtNode CreateApplyMethodNode(GtType Type, GtSyntaxTree ParsedTree, String FuncName, GtFunc Func) {
	//		if(Func != null && Func.Is(VirtualFunc)) {
	//			return CreateApplyOverridedMethodNode(Type, ParsedTree, ParsedTree.NameSpace.Minimum(), Func);
	//		}
	//		return CreateApplySymbolNode(Type, ParsedTree, FuncName, Func);
	//	}
	//
	//	public GtNode CreateUpdateNode(GtType Type, GtSyntaxTree ParsedTree, GtFunc ResolovedFunc, GtNode LeftNode, GtNode RightNode) {
	//		GtNode Node = null;
	//		if(LeftNode instanceof GtGetIndexNode) {
	//			/*local*/GtGetIndexNode IndexNode = (/*cast*/GtGetIndexNode) LeftNode;
	//			return CreateSetIndexNode(LeftNode.Type, ParsedTree, IndexNode.RecvNode, ResolovedFunc, IndexNode.IndexNode, RightNode);
	//		}
	//		else if(LeftNode instanceof GtGetLocalNode) {
	//			/*local*/GtGetLocalNode LocalNode = (/*cast*/GtGetLocalNode) LeftNode;
	//			Node = CreateSetLocalNode(LeftNode.Type, ParsedTree, LocalNode.NativeName, RightNode);
	//		}
	//		else if(LeftNode instanceof GtGetterNode) {
	//			/*local*/GtGetterNode GetterNode = (/*cast*/GtGetterNode) LeftNode;
	//			Node = CreateSetterNode(LeftNode.Type, ParsedTree, GetterNode.RecvNode, GetterNode.NativeName, RightNode);
	//		}
	//		else {
	//			LibZen.Assert(false); // unreachable
	//		}
	//		if(Node instanceof GtSymbolNode) {
	//			((/*cast*/GtSymbolNode) Node).ResolvedFunc = ResolovedFunc;
	//		}
	//		return Node;
	//	}
	
}