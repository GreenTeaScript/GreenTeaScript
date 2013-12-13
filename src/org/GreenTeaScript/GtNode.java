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

public class GtNode /*extends GreenTeaUtils*/ {
	/*field*/public GtNode	ParentNode;
	/*field*/public GtNode	PrevNode;
	/*field*/public GtNode	NextNode;
	/*field*/public GtType	Type;
	/*field*/public GtToken	Token;
	GtNode/*constructor*/(GtType Type, GtToken Token) {
//		this.Context = Context;
		this.Type = Type;
		this.Token = Token;
		this.ParentNode = null;
		this.PrevNode = null;
		this.NextNode = null;
	}
	
	public final GtNode MoveHeadNode() {
		/*local*/GtNode Node = this;
		while(Node.PrevNode != null) {
			Node = Node.PrevNode;
		}
		return Node;
	}
	public final GtNode MoveTailNode() {
		/*local*/GtNode Node = this;
		while(Node.NextNode != null) {
			Node = Node.NextNode;
		}
		return Node;
	}

	public final boolean HasReturnNode() {
		/*local*/GtNode LastNode = this.MoveTailNode();
		return (LastNode instanceof GtReturnNode || LastNode instanceof GtThrowNode);
	}

	public final void SetChild(GtNode Node) {
		if(Node != null) {
			Node.ParentNode = this;
		}
	}
	public final void SetChild2(GtNode Node, GtNode Node2) {
		this.SetChild(Node);
		this.SetChild(Node2);
	}
	public final void SetChild3(GtNode Node, GtNode Node2, GtNode Node3) {
		this.SetChild(Node);
		this.SetChild(Node2);
		this.SetChild(Node3);
	}
	
	public ArrayList<GtNode> GetList() {
		return null;
	}
	public final GtNode GetAt(int Index) {
		return this.GetList().get(Index);
	}
	public final GtNode Append(GtNode Node) {
		this.GetList().add(Node);
		this.SetChild(Node);
		return this;
	}
	public final GtNode AppendNodeList(int StartIndex, ArrayList<GtNode> NodeList) {
		/*local*/int i = StartIndex;
		/*local*/ArrayList<GtNode> List = this.GetList();
		while(i < LibGreenTea.ListSize(NodeList)) {
			/*local*/GtNode Node = NodeList.get(i);
			List.add(Node);
			this.SetChild(Node);
			i = i + 1;
		}
		return this;
	}
	public final boolean IsConstNode() {
		return (this instanceof GtConstPoolNode);
	}
	public final boolean IsNullNode() {
		return (this instanceof GtNullNode);
	}
	public final boolean IsErrorNode() {
		return (this instanceof GtErrorNode);
	}

	public void Accept(GtGenerator Visitor) {
		/* must override */
	}
	public final Object ToNullValue(GtParserContext Context, boolean EnforceConst) {
		if(EnforceConst) {
			Context.ReportError(GreenTeaUtils.ErrorLevel, this.Token, "value must be constant in this context");
		}
		return null;
	}
	public Object ToConstValue(GtParserContext Context, boolean EnforceConst)  {
		return this.ToNullValue(Context, EnforceConst);
	}
}

abstract class GtConstNode extends GtNode {
	GtConstNode/*constructor*/(GtType Type, GtToken Token) {
		super(Type, Token);
	}
}

final class GtEmptyNode extends GtConstNode {
	GtEmptyNode/*constructor*/(GtType Type, GtToken Token) {
		super(Type, Token);
	}
	@Override public Object ToConstValue(GtParserContext Context, boolean EnforceConst)  {
		return null;
	}
}

final class GtNullNode extends GtConstNode {
	GtNullNode/*constructor*/(GtType Type, GtToken Token) {
		super(Type, Token);
	}
	@Override public void Accept(GtGenerator Visitor) {
		Visitor.VisitNullNode(this);
	}
	@Override public Object ToConstValue(GtParserContext Context, boolean EnforceConst)  {
		return null;
	}
}

final class GtBooleanNode extends GtConstNode {
	/*field*/public boolean	Value;
	GtBooleanNode/*constructor*/(GtType Type, GtToken Token, boolean Value) {
		super(Type, Token);
		this.Value = Value;
	}
	@Override public void Accept(GtGenerator Visitor) {
		Visitor.VisitBooleanNode(this);
	}
	@Override public Object ToConstValue(GtParserContext Context, boolean EnforceConst)  {
		return this.Value;
	}
}

final class GtIntNode extends GtConstNode {
	/*field*/public long	Value;
	GtIntNode/*constructor*/(GtType Type, GtToken Token, long Value) {
		super(Type, Token);
		this.Value = Value;
	}
	@Override public void Accept(GtGenerator Visitor) {
		Visitor.VisitIntNode(this);
	}
	@Override public Object ToConstValue(GtParserContext Context, boolean EnforceConst)  {
		return this.Value;
	}
}

final class GtFloatNode extends GtConstNode {
	/*field*/public double	Value;
	GtFloatNode/*constructor*/(GtType Type, GtToken Token, double Value) {
		super(Type, Token);
		this.Value = Value;
	}
	@Override public void Accept(GtGenerator Visitor) {
		Visitor.VisitFloatNode(this);
	}
	@Override public Object ToConstValue(GtParserContext Context, boolean EnforceConst)  {
		return this.Value;
	}
}

final class GtStringNode extends GtConstNode {
	/*field*/public String	Value;
	GtStringNode/*constructor*/(GtType Type, GtToken Token, String Value) {
		super(Type, Token);
		this.Value = Value;
	}
	@Override public void Accept(GtGenerator Visitor) {
		Visitor.VisitStringNode(this);
	}
	@Override public Object ToConstValue(GtParserContext Context, boolean EnforceConst)  {
		return this.Value;
	}
}

final class GtRegexNode extends GtConstNode {
	/*field*/public String	Value;
	GtRegexNode/*constructor*/(GtType Type, GtToken Token, String Value) {
		super(Type, Token);
		this.Value = Value;
		throw new RuntimeException("FIXME: Regex object must be defined");
	}
	@Override public void Accept(GtGenerator Visitor) {
		Visitor.VisitRegexNode(this);
	}
	@Override public Object ToConstValue(GtParserContext Context, boolean EnforceConst)  {
		return this.Value;
	}
}

final class GtConstPoolNode extends GtConstNode {
	/*field*/public Object	ConstValue;
	GtConstPoolNode/*constructor*/(GtType Type, GtToken Token, Object ConstValue) {
		super(Type, Token);
		this.ConstValue = ConstValue;
	}
	@Override public void Accept(GtGenerator Visitor) {
		// int ConstPoolId = SetConstPool(ConstValue)
		// using StaticApplyNode => GetConstPool(ConstPoolId);
		Visitor.VisitConstPoolNode(this);
	}
	@Override public Object ToConstValue(GtParserContext Context, boolean EnforceConst)  {
		return this.ConstValue;
	}
}

//E.g., "[" $Node, $Node "]"
final class GtArrayLiteralNode extends GtNode {   // => ArrayLiteral
	/*field*/public ArrayList<GtNode>	NodeList;
	GtArrayLiteralNode/*constructor*/(GtType Type, GtToken Token) {
		super(Type, Token);
		this.NodeList = new ArrayList<GtNode>();
	}
	@Override public ArrayList<GtNode> GetList() {
		return this.NodeList;
	}
	@Override public void Accept(GtGenerator Visitor) {
		Visitor.VisitArrayLiteralNode(this);
	}
	@Override public Object ToConstValue(GtParserContext Context, boolean EnforceConst)  {
		if(EnforceConst) {
			return Context.Generator.EvalArrayNode(this, EnforceConst);
		}
		return null;
	}
}

//E.g., "{" StringNode, $Node, StringNode, $Node "}"
final class GtMapLiteralNode extends GtNode {   // => ArrayLiteral
	/*field*/public ArrayList<GtNode>	NodeList;
	GtMapLiteralNode/*constructor*/(GtType Type, GtToken Token) {
		super(Type, Token);
		this.NodeList = new ArrayList<GtNode>();
	}
	@Override public ArrayList<GtNode> GetList() {
		return this.NodeList;
	}
	@Override public void Accept(GtGenerator Visitor) {
		Visitor.VisitMapLiteralNode(this);
	}
	@Override public Object ToConstValue(GtParserContext Context, boolean EnforceConst)  {
//		if(EnforceConst) {
//			return Context.Generator.EvalArrayNode(this, EnforceConst);
//		}
		return null;
	}
}

final class GtParamNode extends GtNode {
	/*field*/public String  Name;
	/*field*/public GtNode  InitNode;  /* nullable*/
	GtParamNode/*constructor*/(GtType Type, GtToken Token, String Name, GtNode InitNode) {
		super(Type, Token); // TODO
		this.Name = Name;
		this.InitNode = InitNode;
	}
}

/* E.g., function(argument, ..) $Body */
/* int x; // captured variable 
 * f = function(a, b) {
 * 	  return x + a + b;
 * }
 * ArgumentList = List of ParamNode
 * BodyNode
 */

final class GtFunctionLiteralNode extends GtNode {
	/*field*/public ArrayList<GtNode>  ArgumentList;  // list of ParamNode 
	/*field*/public GtNode BodyNode;
	GtFunctionLiteralNode/*constructor*/(GtType Type, GtToken Token, GtNode BodyNode) {
		super(Type, Token); // TODO
		this.ArgumentList = new ArrayList<GtNode>();
		this.BodyNode = BodyNode;
		this.SetChild(BodyNode);
	}
	@Override public ArrayList<GtNode> GetList() {
		return this.ArgumentList;
	}
	@Override public void Accept(GtGenerator Visitor) {
		Visitor.VisitFunctionLiteralNode(this);
	}
}

/* symbol variable, function name */

abstract class GtSymbolNode extends GtNode {
	/*field*/public String  NativeName;
	/*field*/public GtFunc	ResolvedFunc;    // 
	GtSymbolNode/*constructor*/(GtType Type, GtToken Token, String NativeName) {
		super(Type, Token);
		this.NativeName = NativeName;
		this.ResolvedFunc = null;
	}
}

// E.g., $NativeName
final class GtGetLocalNode extends GtSymbolNode {
	GtGetLocalNode/*constructor*/(GtType Type, GtToken Token, String NativeName) {
		super(Type, Token, NativeName);
	}
	@Override public void Accept(GtGenerator Visitor) {
		Visitor.VisitGetLocalNode(this);
	}
}

// E.g., $NativeName = $ValueNode
final class GtSetLocalNode extends GtSymbolNode {
	/*field*/public GtNode	 ValueNode;
	GtSetLocalNode/*constructor*/(GtType Type, GtToken Token, String NativeName, GtNode ValueNode) {
		super(Type, Token, NativeName);
		this.ValueNode = ValueNode;
		this.SetChild(ValueNode);
	}
	@Override public void Accept(GtGenerator Visitor) {
		Visitor.VisitSetLocalNode(this);
	}
}

//E.g., $NativeName
final class GtGetCapturedNode extends GtSymbolNode {
	GtGetCapturedNode/*constructor*/(GtType Type, GtToken Token, String NativeName) {
		super(Type, Token, NativeName);
	}
	@Override public void Accept(GtGenerator Visitor) {
		Visitor.VisitGetCapturedNode(this);
	}
}

//E.g., $NativeName = $RightNode
final class GtSetCapturedNode extends GtSymbolNode {
	/*field*/public GtNode	 ValueNode;
	GtSetCapturedNode/*constructor*/(GtType Type, GtToken Token, String NativeName, GtNode ValueNode) {
		super(Type, Token, NativeName);
		this.ValueNode = ValueNode;
		this.SetChild(ValueNode);
	}
	@Override public void Accept(GtGenerator Visitor) {
		Visitor.VisitSetCapturedNode(this);
	}
}

//E.g., $RecvNode.$NativeName
final class GtGetterNode extends GtSymbolNode {
	/*field*/public GtNode  RecvNode;
	GtGetterNode/*constructor*/(GtType Type, GtToken Token, GtNode RecvNode, String NativeName) {
		super(Type, Token, NativeName);
		this.RecvNode = RecvNode;
		this.SetChild(RecvNode);
	}
	@Override public void Accept(GtGenerator Visitor) {
		Visitor.VisitGetterNode(this);
	}
	@Override public Object ToConstValue(GtParserContext Context, boolean EnforceConst)  {
		return Context.Generator.EvalGetterNode(this, EnforceConst);
	}
}
//E.g., $RecvNode.$NativeName = $Value
final class GtSetterNode extends GtSymbolNode {
	/*field*/public GtNode  RecvNode;
	/*field*/public GtNode  ValueNode;
	GtSetterNode/*constructor*/(GtType Type, GtToken Token, GtNode RecvNode, String NativeName, GtNode ValueNode) {
		super(Type, Token, NativeName);
		this.RecvNode  = RecvNode;
		this.ValueNode = ValueNode;
		this.SetChild2(RecvNode, ValueNode);
	}
	@Override public void Accept(GtGenerator Visitor) {
		Visitor.VisitSetterNode(this);
	}
	@Override public Object ToConstValue(GtParserContext Context, boolean EnforceConst)  {
		return Context.Generator.EvalSetterNode(this, EnforceConst);
	}
}

//E.g., $NativeFuncName "(" $Param[0], $Param[1], ... ")"
final class GtApplySymbolNode extends GtSymbolNode {
	/*field*/public ArrayList<GtNode>  ParamList; /* [arg1, arg2, ...] */
	GtApplySymbolNode/*constructor*/(GtType Type, GtToken Token, String NativeFuncName) {
		super(Type, Token, NativeFuncName);
		this.ParamList = new ArrayList<GtNode>();
	}
	@Override public final ArrayList<GtNode> GetList() {
		return this.ParamList;
	}
	@Override public void Accept(GtGenerator Visitor) {
		Visitor.VisitApplySymbolNode(this);
	}
	@Override public Object ToConstValue(GtParserContext Context, boolean EnforceConst)  {
		return Context.Generator.EvalApplySymbolNode(this, EnforceConst);
	}
}

//E.g., $FuncNode "(" $Param[0], $Param[1], ... ")"
final class GtApplyFunctionObjectNode extends GtNode {
	/*field*/public GtNode	FuncNode;
	/*field*/public ArrayList<GtNode>  ParamList; /* [arg0, arg1, ...] */
	GtApplyFunctionObjectNode/*constructor*/(GtType Type, GtToken Token, GtNode FuncNode) {
		super(Type, Token);
		this.FuncNode = FuncNode;
		this.ParamList = new ArrayList<GtNode>();
		this.SetChild(FuncNode);
	}
	@Override public final ArrayList<GtNode> GetList() {
		return this.ParamList;
	}
	@Override public void Accept(GtGenerator Visitor) {
		Visitor.VisitApplyFunctionObjectNode(this);
	}
	@Override public Object ToConstValue(GtParserContext Context, boolean EnforceConst)  {
		return Context.Generator.EvalApplyFuncionObjectNode(this, EnforceConst);
	}
}

final class GtApplyOverridedMethodNode extends GtNode {
	/*field*/public GtNameSpace NameSpace;
	/*field*/public GtFunc Func;
	/*field*/public ArrayList<GtNode>  ParamList; /* [arg1, arg2, ...] */
	GtApplyOverridedMethodNode/*constructor*/(GtType Type, GtToken Token, GtNameSpace NameSpace, GtFunc Func) {
		super(Type, Token);
		this.NameSpace = NameSpace.Minimum();
		this.Func = Func;
		this.ParamList = new ArrayList<GtNode>();
		throw new RuntimeException("FIXME: ApplyOverridedMethodNode is not finished");
	}
	@Override public final ArrayList<GtNode> GetList() {
		return this.ParamList;
	}
	@Override public void Accept(GtGenerator Visitor) {
		Visitor.VisitApplyOverridedMethodNode(this);
	}
	@Override public Object ToConstValue(GtParserContext Context, boolean EnforceConst)  {
		return Context.Generator.EvalApplyOverridedMethodNode(this, EnforceConst);
	}
}

//E.g., $Recv[$Index]
final class GtGetIndexNode extends GtSymbolNode {
	/*field*/public GtNode  RecvNode;
	/*field*/public GtNode  IndexNode;
	GtGetIndexNode/*constructor*/(GtType Type, GtToken Token, GtNode RecvNode, GtNode IndexNode) {
		super(Type, Token, "[]");
		this.RecvNode = RecvNode;
		this.IndexNode = IndexNode;
		this.SetChild2(RecvNode, IndexNode);
	}
	@Override public void Accept(GtGenerator Visitor) {
		Visitor.VisitGetIndexNode(this);
	}
	@Override public Object ToConstValue(GtParserContext Context, boolean EnforceConst)  {
		//FIXME
		//return Context.Generator.EvalGetIndexNode(this, EnforceConst);
		return null;
	}
}
//E.g., $Recv[$Index] = $ValueNode
final class GtSetIndexNode extends GtSymbolNode {
	/*field*/public GtNode  RecvNode;
	/*field*/public GtNode  IndexNode;
	/*field*/public GtNode  ValueNode;
	GtSetIndexNode/*constructor*/(GtType Type, GtToken Token, GtNode RecvNode, GtNode IndexNode, GtNode ValueNode) {
		super(Type, Token, "[]=");
		this.RecvNode  = RecvNode;
		this.IndexNode = IndexNode;
		this.ValueNode = ValueNode;
		this.SetChild3(RecvNode, IndexNode, ValueNode);
	}
	@Override public void Accept(GtGenerator Visitor) {
		Visitor.VisitSetIndexNode(this);
	}
	@Override public Object ToConstValue(GtParserContext Context, boolean EnforceConst)  {
		//FIXME
		//return Context.Generator.EvalSetIndexNode(this, EnforceConst);
		return null;
	}
}

//E.g., $Expr "[" $Index ":" $Index2 "]"
final class GtSliceNode extends GtSymbolNode {
	/*field*/public GtNode RecvNode;
	/*field*/public GtNode Index1;
	/*field*/public GtNode Index2;
	GtSliceNode/*constructor*/(GtType Type, GtToken Token, GtNode RecvNode, GtNode Index1, GtNode Index2) {
		super(Type, Token, "");
		this.RecvNode = RecvNode;
		this.Index1 = Index1;
		this.Index2 = Index2;
		this.SetChild3(RecvNode, Index1, Index2);
	}
	@Override public void Accept(GtGenerator Visitor) {
		Visitor.VisitSliceNode(this);
	}
}

// operator 

//E.g., $LeftNode && $RightNode
final class GtAndNode extends GtNode {
	/*field*/public GtNode   LeftNode;
	/*field*/public GtNode	 RightNode;
	GtAndNode/*constructor*/(GtType Type, GtToken Token, GtNode Left, GtNode Right) {
		super(Type, Token);
		this.LeftNode  = Left;
		this.RightNode = Right;
		this.SetChild2(Left, Right);
	}
	@Override public void Accept(GtGenerator Visitor) {
		Visitor.VisitAndNode(this);
	}
	@Override public Object ToConstValue(GtParserContext Context, boolean EnforceConst)  {
		/*local*/Object LeftValue = this.LeftNode.ToConstValue(Context, EnforceConst) ;
		if(LeftValue instanceof Boolean && LibGreenTea.booleanValue(LeftValue)) {
			return this.RightNode.ToConstValue(Context, EnforceConst) ;
		}
		return null;
	}
}

//E.g., $LeftNode || $RightNode
final class GtOrNode extends GtNode {
	/*field*/public GtNode   LeftNode;
	/*field*/public GtNode	 RightNode;
	GtOrNode/*constructor*/(GtType Type, GtToken Token, GtNode Left, GtNode Right) {
		super(Type, Token);
		this.LeftNode  = Left;
		this.RightNode = Right;
		this.SetChild2(Left, Right);
	}
	@Override public void Accept(GtGenerator Visitor) {
		Visitor.VisitOrNode(this);
	}
	@Override public Object ToConstValue(GtParserContext Context, boolean EnforceConst)  {
		/*local*/Object LeftValue = this.LeftNode.ToConstValue(Context, EnforceConst) ;
		if(LeftValue instanceof Boolean) {
			if(LibGreenTea.booleanValue(LeftValue)) {
				return LeftValue;
			}
			else {
				return this.RightNode.ToConstValue(Context, EnforceConst) ;
			}
		}
		return null;
	}
}

//E.g., "~" $RecvNode
final class GtUnaryNode extends GtSymbolNode {
	/*field*/public GtNode	RecvNode;
	GtUnaryNode/*constructor*/(GtType Type, GtToken Token, String OperatorName, GtNode RecvNode) {
		super(Type, Token, OperatorName);
		this.RecvNode = RecvNode;
		this.SetChild(RecvNode);
	}
	@Override public void Accept(GtGenerator Visitor) {
		Visitor.VisitUnaryNode(this);
	}
	@Override public Object ToConstValue(GtParserContext Context, boolean EnforceConst)  {
		/*local*/Object Value = this.RecvNode.ToConstValue(Context, EnforceConst) ;
		if(Value != null) {
			return LibGreenTea.EvalUnary(this.Type, this.Token.ParsedText, Value);
		}
		return Value;
	}	
}

//E.g.,  "++" $RecvNode 
final class GtPrefixInclNode extends GtNode {
	/*field*/public GtNode	RecvNode;
	GtPrefixInclNode/*constructor*/(GtType Type, GtToken Token, GtNode RecvNode) {
		super(Type, Token);
		this.RecvNode = RecvNode;
		this.SetChild(RecvNode);
	}
	@Override public void Accept(GtGenerator Visitor) {
		Visitor.VisitPrefixInclNode(this);
	}
}
//E.g.,  "--" $RecvNode
final class GtPrefixDeclNode extends GtNode {
	/*field*/public GtNode	RecvNode;
	GtPrefixDeclNode/*constructor*/(GtType Type, GtToken Token, GtNode RecvNode) {
		super(Type, Token);
		this.RecvNode = RecvNode;
		this.SetChild(RecvNode);
	}
	@Override public void Accept(GtGenerator Visitor) {
		Visitor.VisitPrefixDeclNode(this);
	}
}
//E.g.,  $RecvNode "++" 
final class GtSuffixInclNode extends GtNode {
	/*field*/public GtNode	RecvNode;
	GtSuffixInclNode/*constructor*/(GtType Type, GtToken Token, GtNode RecvNode) {
		super(Type, Token);
		this.RecvNode = RecvNode;
		this.SetChild(RecvNode);
	}
	@Override public void Accept(GtGenerator Visitor) {
		Visitor.VisitSuffixInclNode(this);
	}
}
//E.g.,  $RecvNode "--" 
final class GtSuffixDeclNode extends GtNode {
	/*field*/public GtNode	RecvNode;
	GtSuffixDeclNode/*constructor*/(GtType Type, GtToken Token, GtNode RecvNode) {
		super(Type, Token);
		this.RecvNode = RecvNode;
		this.SetChild(RecvNode);
	}
	@Override public void Accept(GtGenerator Visitor) {
		Visitor.VisitSuffixDeclNode(this);
	}
}

//E.g., $LeftNode "+" $RightNode
final class GtBinaryNode extends GtSymbolNode {
	/*field*/public GtNode    LeftNode;
	/*field*/public GtNode	  RightNode;
	GtBinaryNode/*constructor*/(GtType Type, GtToken Token, String OperatorName, GtNode Left, GtNode Right) {
		super(Type, Token, OperatorName);
		this.LeftNode  = Left;
		this.RightNode = Right;
		this.SetChild2(Left, Right);
	}
	@Override public void Accept(GtGenerator Visitor) {
		Visitor.VisitBinaryNode(this);
	}
	@Override public Object ToConstValue(GtParserContext Context, boolean EnforceConst)  {
		/*local*/Object LeftValue = this.LeftNode.ToConstValue(Context, EnforceConst) ;
		if(LeftValue != null) {
			/*local*/Object RightValue = this.RightNode.ToConstValue(Context, EnforceConst) ;
			if(RightValue != null) {
				return LibGreenTea.EvalBinary(this.Type, LeftValue, this.Token.ParsedText, RightValue);
			}
		}
		return null;
	}
}

//E.g., $CondNode "?" $ThenExpr ":" $ElseExpr
final class GtTrinaryNode extends GtNode {
	/*field*/public GtNode	CondNode;
	/*field*/public GtNode	ThenNode;
	/*field*/public GtNode	ElseNode;
	GtTrinaryNode/*constructor*/(GtType Type, GtToken Token, GtNode CondNode, GtNode ThenNode, GtNode ElseNode) {
		super(Type, Token);
		this.CondNode = CondNode;
		this.ThenNode = ThenNode;
		this.ElseNode = ElseNode;
		this.SetChild3(CondNode, ThenNode, ElseNode);
	}
	@Override public void Accept(GtGenerator Visitor) {
		Visitor.VisitTrinaryNode(this);
	}
	@Override public Object ToConstValue(GtParserContext Context, boolean EnforceConst)  {
		/*local*/Object CondValue = this.CondNode.ToConstValue(Context, EnforceConst) ;
		if(CondValue instanceof Boolean) {
			if(LibGreenTea.booleanValue(CondValue)) {
				return this.ThenNode.ToConstValue(Context, EnforceConst);
			}
			else {
				return this.ElseNode.ToConstValue(Context, EnforceConst);
			}
		}
		return null;
	}
}

//E.g., "exists" $Expr
@Deprecated final class GtExistsNode extends GtNode {
	/*field*/public GtFunc  Func;
	/*field*/public GtNode	Expr;
	GtExistsNode/*constructor*/(GtType Type, GtToken Token, GtFunc Func, GtNode Expr) {
		super(Type, Token);
		this.Func = Func;
		this.Expr = Expr;
		this.SetChild(Expr);
	}
	@Override public void Accept(GtGenerator Visitor) {
		//Visitor.VisitExistsNode(this);
	}
}
//E.g., $LeftNode += $RightNode
@Deprecated final class GtSelfAssignNode extends GtNode {
	/*field*/public GtFunc Func;
	/*field*/public GtNode LeftNode;
	/*field*/public GtNode RightNode;
	GtSelfAssignNode/*constructor*/(GtType Type, GtToken Token, GtFunc Func, GtNode Left, GtNode Right) {
		super(Type, Token);
		this.Func  = Func;
		this.LeftNode  = Left;
		this.RightNode = Right;
		this.SetChild2(Left, Right);
	}
	@Override public void Accept(GtGenerator Visitor) {
		//Visitor.VisitSelfAssignNode(this);
	}
}

//E.g., $Expr . Token.ParsedText
@Deprecated final class GtDyGetterNode extends GtNode {
	/*field*/public GtNode  RecvNode;
	/*field*/public GtNameSpace NameSpace;
	/*field*/public String FieldName;
	GtDyGetterNode/*constructor*/(GtType Type, GtToken Token, GtNode Expr, GtNameSpace NameSpace, String FieldName) {
		super(Type, Token);
		this.RecvNode = Expr;
		this.NameSpace = NameSpace;
		this.FieldName = FieldName;
		this.SetChild(Expr);
	}
	@Override public void Accept(GtGenerator Visitor) {
		//Visitor.VisitDyGetterNode(this);
	}

	@Override public Object ToConstValue(GtParserContext Context, boolean EnforceConst)  {
		return Context.Generator.EvalDyGetterNode(this, EnforceConst);
	}
}

//E.g., $Left . Token.ParsedText = $Right
@Deprecated final class GtDySetterNode extends GtNode {
	/*field*/public GtNode  RecvNode;
	/*field*/public GtNameSpace NameSpace;
	/*field*/public String FieldName;
	/*field*/public GtNode  ValueNode;
	GtDySetterNode/*constructor*/(GtType Type, GtToken Token, GtNode LeftNode, GtNameSpace NameSpace, String FieldName, GtNode RightNode) {
		super(Type, Token);
		this.RecvNode  = LeftNode;
		this.NameSpace = NameSpace;
		this.FieldName = FieldName;
		this.ValueNode = RightNode;
		this.SetChild2(LeftNode, RightNode);
	}
	@Override public void Accept(GtGenerator Visitor) {
		//Visitor.VisitDySetterNode(this);
	}
	@Override public Object ToConstValue(GtParserContext Context, boolean EnforceConst)  {
		return Context.Generator.EvalDySetterNode(this, EnforceConst);
	}
}

//E.g., $Param[0] "(" $Param[1], $Param[2], ... ")"
@Deprecated final class GtApplyNode extends GtNode {
	/*field*/public GtFunc	Func;
	/*field*/public ArrayList<GtNode>  NodeList; /* [arg1, arg2, ...] */
	GtApplyNode/*constructor*/(GtType Type, GtToken Token, GtFunc Func) {
		super(Type, Token);
		this.Func = Func;
		this.NodeList = new ArrayList<GtNode>();
	}
	@Override public final ArrayList<GtNode> GetList() {
		return this.NodeList;
	}
	@Override public void Accept(GtGenerator Visitor) {
		//Visitor.VisitApplyNode(this);
	}
	@Override public Object ToConstValue(GtParserContext Context, boolean EnforceConst)  {
		return Context.Generator.EvalApplyNode(this, EnforceConst);
	}
}

//E.g., "FuncName" "(" $Param[0], $Param[1], ... ")"
@Deprecated final class GtApplyDynamicFuncNode extends GtNode {
	/*field*/public GtNameSpace NameSpace;
	/*field*/public String	FuncName;
	/*field*/public ArrayList<GtNode>  ParamList; /* [arg0, arg1, ...] */
	GtApplyDynamicFuncNode/*constructor*/(GtType Type, GtToken Token, GtNameSpace NameSpace, String FuncName) {
		super(Type, Token);
		this.NameSpace = NameSpace.Minimum();
		this.FuncName = FuncName;
		this.ParamList = new ArrayList<GtNode>();
	}
	@Override public final ArrayList<GtNode> GetList() {
		return this.ParamList;
	}
	@Override public void Accept(GtGenerator Visitor) {
		//Visitor.VisitApplyDynamicFuncNode(this);
	}
	@Override public Object ToConstValue(GtParserContext Context, boolean EnforceConst)  {
		return Context.Generator.EvalApplyDynamicFuncNode(this, EnforceConst);
	}
}

//E.g., $RecvNode . FuncName "(" $Param[1], $Param[2], ... ")"
@Deprecated final class GtApplyDynamicMethodNode extends GtNode {
//	/*field*/public GtNode RecvNode;
	/*field*/public GtNameSpace NameSpace;
	/*field*/public String FuncName;
	/*field*/public ArrayList<GtNode>  ParamList; /* [arg1, arg2, ...] */
	GtApplyDynamicMethodNode/*constructor*/(GtType Type, GtToken Token, GtNameSpace NameSpace, String FuncName) {
		super(Type, Token);
		this.NameSpace = NameSpace.Minimum();
		this.FuncName = FuncName;
		this.ParamList = new ArrayList<GtNode>();
	}
	@Override public final ArrayList<GtNode> GetList() {
		return this.ParamList;
	}
	@Override public void Accept(GtGenerator Visitor) {
		//Visitor.VisitApplyDynamicMethodNode(this);
	}
	@Override public Object ToConstValue(GtParserContext Context, boolean EnforceConst)  {
		return Context.Generator.EvalApplyDynamicMethodNode(this, EnforceConst);
	}
}

// E.g., ConstructorNode is for object creation in Native language defined
final class GtConstructorNode extends GtNode {
	/*field*/public ArrayList<GtNode>	ParamList;
	/*field*/public GtFunc Func;
	GtConstructorNode/*constructor*/(GtType Type, GtToken Token, GtFunc Func) {
		super(Type, Token);
		this.ParamList = new ArrayList<GtNode>();
		this.Func = Func;
	}
	@Override public final ArrayList<GtNode> GetList() {
		return this.ParamList;
	}
	@Override public void Accept(GtGenerator Visitor) {
		Visitor.VisitConstructorNode(this);
	}
	@Override public Object ToConstValue(GtParserContext Context, boolean EnforceConst)  {
		if(EnforceConst) {
			return Context.Generator.EvalConstructorNode(this, EnforceConst);
		}
		return null;
	}	
}

// E.g., AllocateNode (without parameters); StaticApply is needed to init
final class GtAllocateNode extends GtNode {
	GtAllocateNode/*constructor*/(GtType Type, GtToken Token) {
		super(Type, Token);
	}
	@Override public void Accept(GtGenerator Visitor) {
		Visitor.VisitAllocateNode(this);
	}
	@Override public Object ToConstValue(GtParserContext Context, boolean EnforceConst)  {
		return Context.Generator.EvalAllocateNode(this, EnforceConst);
	}	
}

//E.g., new T "[" 10, [10] "]"
final class GtNewArrayNode extends GtNode {
	/*field*/public ArrayList<GtNode>	NodeList;
	GtNewArrayNode/*constructor*/(GtType Type, GtToken Token) {
		super(Type, Token);
		this.NodeList = new ArrayList<GtNode>();
	}
	@Override public ArrayList<GtNode> GetList() {
		return this.NodeList;
	}
	@Override public void Accept(GtGenerator Visitor) {
		Visitor.VisitNewArrayNode(this);
	}
	@Override public Object ToConstValue(GtParserContext Context, boolean EnforceConst)  {
		if(EnforceConst) {
			return Context.Generator.EvalNewArrayNode(this, EnforceConst);
		}
		return null;
	}
}

//E.g., $ExprNode instanceof TypeInfo
final class GtInstanceOfNode extends GtNode {
	/*field*/public GtNode   ExprNode;
	/*field*/public GtType	 TypeInfo;
	GtInstanceOfNode/*constructor*/(GtType Type, GtToken Token, GtNode ExprNode, GtType TypeInfo) {
		super(Type, Token);
		this.ExprNode = ExprNode;
		this.TypeInfo = TypeInfo;
		this.SetChild(ExprNode);
	}
	@Override public void Accept(GtGenerator Visitor) {
		Visitor.VisitInstanceOfNode(this);
	}
	@Override public Object ToConstValue(GtParserContext Context, boolean EnforceConst)  {
		/*local*/Object Value = this.ExprNode.ToConstValue(Context, EnforceConst) ;
		if(Value != null) {
			return LibGreenTea.DynamicInstanceOf(Value, this.TypeInfo);
		}
		return Value;
	}
}

//E.g., (T) $Expr
final class GtCastNode extends GtNode {
	/*field*/public GtFunc  Func;
	/*field*/public GtType	CastType;
	/*field*/public GtNode	Expr;
	GtCastNode/*constructor*/(GtType Type, GtToken Token, GtType CastType, GtNode Expr) {
		super(Type, Token);
		this.CastType = CastType;
		this.Expr = Expr;
		this.SetChild(Expr);
	}
	@Override public void Accept(GtGenerator Visitor) {
		Visitor.VisitCastNode(this);
	}
	@Override public Object ToConstValue(GtParserContext Context, boolean EnforceConst)  {
		/*local*/Object Value = this.Expr.ToConstValue(Context, EnforceConst) ;
		if(Value != null) {
			return LibGreenTea.DynamicCast(this.CastType, Value);
		}
		return Value;
	}
}

/**
 * int a = 1;
 * String s ; 
 */

final class GtVarDeclNode extends GtNode {
	/*field*/public GtType	DeclType;
	/*field*/public String  NativeName;
	/*field*/public GtNode	InitNode;
	/*field*/public GtNode	BlockNode;
	/* let VarNode in Block end */
	GtVarDeclNode/*constructor*/(GtType Type, GtToken Token, GtType DeclType, String VariableName, GtNode InitNode, GtNode Block) {
		super(Type, Token);
		this.NativeName = VariableName;
		this.DeclType  = DeclType;
		this.InitNode  = InitNode;    // given expression or NullNode
		this.BlockNode = Block;
		this.SetChild2(InitNode, this.BlockNode);
	}
	@Override public void Accept(GtGenerator Visitor) {
		Visitor.VisitVarDeclNode(this);
	}
}

/**
 * using(File f = new File() {
 * 	f.read();
 * }
 * try-catch is needed
 */

final class GtUsingNode extends GtNode {
	/*field*/public GtType	DeclType;
	/*field*/public String  NativeName;
	/*field*/public GtNode	InitNode;
	/*field*/public GtNode	BlockNode;   // release resource of NativeName after BlockNode 
	/* let VarNode in Block end */
	GtUsingNode/*constructor*/(GtType Type, GtToken Token, GtType DeclType, String VariableName, GtNode InitNode, GtNode Block) {
		super(Type, Token);
		this.NativeName = VariableName;
		this.DeclType  = DeclType;
		this.InitNode  = InitNode;
		this.BlockNode = Block;
		this.SetChild2(InitNode, this.BlockNode);
	}
	@Override public void Accept(GtGenerator Visitor) {
		Visitor.VisitUsingNode(this);
	}
}
//E.g., "if" "(" $Cond ")" $ThenNode "else" $ElseNode
final class GtIfNode extends GtNode {
	/*field*/public GtNode	CondNode;
	/*field*/public GtNode	ThenNode;
	/*field*/public GtNode	ElseNode;
	/* If CondNode then ThenBlock else ElseBlock */
	GtIfNode/*constructor*/(GtType Type, GtToken Token, GtNode CondNode, GtNode ThenNode, GtNode ElseNode) {
		super(Type, Token);
		this.CondNode = CondNode;
		this.ThenNode = ThenNode;
		this.ElseNode = ElseNode;
		this.SetChild3(CondNode, ThenNode, ElseNode);
	}
	@Override public void Accept(GtGenerator Visitor) {
		Visitor.VisitIfNode(this);
	}
}
//E.g., "while" "(" $Cond ")" $Body
final class GtWhileNode extends GtNode {
	/*field*/public GtNode	CondNode;
	/*field*/public GtNode	BodyNode;
	GtWhileNode/*constructor*/(GtType Type, GtToken Token, GtNode CondNode, GtNode BodyNode) {
		super(Type, Token);
		this.CondNode = CondNode;
		this.BodyNode = BodyNode;
		this.SetChild2(CondNode, BodyNode);
	}
	@Override public void Accept(GtGenerator Visitor) {
		Visitor.VisitWhileNode(this);
	}
}
final class GtDoWhileNode extends GtNode {
	/*field*/public GtNode	CondNode;
	/*field*/public GtNode	BodyNode;
	GtDoWhileNode/*constructor*/(GtType Type, GtToken Token, GtNode CondNode, GtNode BodyNode) {
		super(Type, Token);
		this.CondNode = CondNode;
		this.BodyNode = BodyNode;
		this.SetChild2(CondNode, BodyNode);
	}
	@Override public void Accept(GtGenerator Visitor) {
		Visitor.VisitDoWhileNode(this);
	}
	public GtNode ToWhileNode() {
		/**
		while(true) {
			$BodyNode;
			break;
		}
		while($CondNode) {
			$BodyNode;
		}
		**/
		return null;
	}
}

//E.g., "for" "(" ";" $CondNode ";" $IterNode ")" $LoopNode
final class GtForNode extends GtNode {
	/*field*/public GtNode	CondNode;
	/*field*/public GtNode	IterNode;
	/*field*/public GtNode	BodyNode;
	GtForNode/*constructor*/(GtType Type, GtToken Token, GtNode CondNode, GtNode IterNode, GtNode BodyNode) {
		super(Type, Token);
		this.CondNode = CondNode;
		this.BodyNode = BodyNode;
		this.IterNode = IterNode;
		this.SetChild3(CondNode, BodyNode, IterNode);
	}
	@Override public void Accept(GtGenerator Visitor) {
		Visitor.VisitForNode(this);
	}
}

//E.g., "for" "(" $Variable "in" $IterNode ")" $BodyNode
final class GtForEachNode extends GtNode {
	/*field*/public GtNode	Variable;
	/*field*/public GtNode	IterNode;
	/*field*/public GtNode	BodyNode;
	GtForEachNode/*constructor*/(GtType Type, GtToken Token, GtNode Variable, GtNode IterNode, GtNode BodyNode) {
		super(Type, Token);
		this.Variable = Variable;
		this.IterNode = IterNode;
		this.BodyNode = BodyNode;
		this.SetChild3(Variable, BodyNode, IterNode);
	}
	@Override public void Accept(GtGenerator Visitor) {
		Visitor.VisitForEachNode(this);
	}
}

final class GtContinueNode extends GtNode {
	/*field*/public String Label;
	GtContinueNode/*constructor*/(GtType Type, GtToken Token, String Label) {
		super(Type, Token);
		this.Label = Label;
	}
	@Override public void Accept(GtGenerator Visitor) {
		Visitor.VisitContinueNode(this);
	}
}

final class GtBreakNode extends GtNode {
	/*field*/public String Label;
	GtBreakNode/*constructor*/(GtType Type, GtToken Token, String Label) {
		super(Type, Token);
		this.Label = Label;
	}
	@Override public void Accept(GtGenerator Visitor) {
		Visitor.VisitBreakNode(this);
	}
}

/**
 * int f(int n);
 * f(1)
 */

final class GtStatementNode extends GtNode {
	/*field*/public GtNode ValueNode;
	GtStatementNode/*constructor*/(GtType Type, GtToken Token, GtNode ValueNode) {
		super(Type, Token);
		this.ValueNode = ValueNode;
		this.SetChild(ValueNode);
	}
	@Override public void Accept(GtGenerator Visitor) {
		Visitor.VisitStatementNode(this);
	}
}

final class GtReturnNode extends GtNode {
	/*field*/public GtNode ValueNode;
	GtReturnNode/*constructor*/(GtType Type, GtToken Token, GtNode ValueNode) {
		super(Type, Token);
		this.ValueNode = ValueNode;
		this.SetChild(ValueNode);
	}
	@Override public void Accept(GtGenerator Visitor) {
		Visitor.VisitReturnNode(this);
	}
}

final class GtYieldNode extends GtNode {
	/*field*/public GtNode ValueNode;
	GtYieldNode/*constructor*/(GtType Type, GtToken Token, GtNode ValueNode) {
		super(Type, Token);
		this.ValueNode = ValueNode;
		this.SetChild(ValueNode);
	}
	@Override public void Accept(GtGenerator Visitor) {
		Visitor.VisitYieldNode(this);
	}
}

final class GtThrowNode extends GtNode {
	/*field*/public GtNode ValueNode;
	GtThrowNode/*constructor*/(GtType Type, GtToken Token, GtNode ValueNode) {
		super(Type, Token);
		this.ValueNode = ValueNode;
	}
	@Override public void Accept(GtGenerator Visitor) {
		Visitor.VisitThrowNode(this);
	}
}

final class GtTryNode extends GtNode {
	/*field*/public GtNode	TryNode;
	/*field*/public ArrayList<GtNode> 	CatchList;
	/*field*/public GtNode	FinallyNode;
	GtTryNode/*constructor*/(GtType Type, GtToken Token, GtNode TryBlock, GtNode FinallyBlock) {
		super(Type, Token);
		this.TryNode = TryBlock;
		this.FinallyNode = FinallyBlock;
		this.CatchList = new ArrayList<GtNode>();
		this.SetChild2(TryBlock, FinallyBlock);
	}
	@Override public ArrayList<GtNode> GetList() {
		return this.CatchList;
	}
	@Override public void Accept(GtGenerator Visitor) {
		Visitor.VisitTryNode(this);
	}
}

final class GtCatchNode extends GtNode {
	/*field*/public GtType  ExceptionType;
	/*field*/public String  ExceptionName;
	/*field*/public GtNode	BodyNode;
	GtCatchNode/*constructor*/(GtType Type, GtToken Token, GtType ExceptionType, String Name, GtNode BodyNode) {
		super(Type, Token);
		this.ExceptionType = ExceptionType;
		this.ExceptionName = Name;
		this.BodyNode = BodyNode;
		this.SetChild(BodyNode);
	}
	@Override public void Accept(GtGenerator Visitor) {
		Visitor.VisitCatchNode(this);
	}
}

final class GtSwitchNode extends GtNode {
	/*field*/public GtNode	MatchNode;
	/*field*/public GtNode	DefaultBlock;
	/*field*/public ArrayList<GtNode> CaseList; // [expr, block, expr, block, ....]
	GtSwitchNode/*constructor*/(GtType Type, GtToken Token, GtNode MatchNode, GtNode DefaultBlock) {
		super(Type, Token);
		this.MatchNode = MatchNode;
		this.DefaultBlock = DefaultBlock;
		this.CaseList = new ArrayList<GtNode>();
		this.SetChild(DefaultBlock);
	}
	@Override public void Accept(GtGenerator Visitor) {
		Visitor.VisitSwitchNode(this);
	}
	@Override public final ArrayList<GtNode> GetList() {
		return this.CaseList;
	}
}

final class GtCaseNode extends GtNode {
	/*field*/public GtNode  CaseNode;;
	/*field*/public GtNode	BodyNode;
	GtCaseNode/*constructor*/(GtType Type, GtToken Token, GtNode CaseNode, GtNode BodyNode) {
		super(Type, Token);
		this.CaseNode = CaseNode;
		this.BodyNode = BodyNode;
		this.SetChild2(BodyNode, CaseNode);
	}
	@Override public void Accept(GtGenerator Visitor) {
		Visitor.VisitCaseNode(this);
	}
}

// E.g., "ls" "-a"..
final class GtCommandNode extends GtNode {
	/*field*/public ArrayList<GtNode>  ArgumentList; /* ["/bin/ls" , "-la", "/", ...] */
	/*field*/public GtNode PipedNextNode;
	GtCommandNode/*constructor*/(GtType Type, GtToken Token, GtNode PipedNextNode) {
		super(Type, Token);
		this.PipedNextNode = PipedNextNode;
		this.ArgumentList = new ArrayList<GtNode>();
	}
	@Override public final ArrayList<GtNode> GetList() {
		return this.ArgumentList;
	}

	@Override public void Accept(GtGenerator Visitor) {
		Visitor.VisitCommandNode(this);
	}

	@Override public Object ToConstValue(GtParserContext Context, boolean EnforceConst) {
		//FIXME: Exception
		return Context.Generator.EvalCommandNode(this, EnforceConst);
	}
}

/**
 * ErrorNode carries error information at the parser level
 * Token.ParsedText has error message  
 */

final class GtErrorNode extends GtNode {
	GtErrorNode/*constructor*/(GtType Type, GtToken Token) {
		super(Type, Token);
	}
	@Override public void Accept(GtGenerator Visitor) {
		Visitor.VisitErrorNode(this);
	}
	@Override public Object ToConstValue(GtParserContext Context, boolean EnforceConst)  {
		return null;
	}
}
