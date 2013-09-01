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



/* language */
// GreenTea Generator should be written in each language.

class GtNode {
	public ParentNode: GtNode;
	public PrevNode: GtNode;
	public NextNode: GtNode;

	public Type: GtType;
	public Token: GtToken;

	 constructor(Type: GtType, Token: GtToken) {
		this.Type = Type;
		this.Token = Token;
		this.ParentNode = null;
		this.PrevNode = null;
		this.NextNode = null;
	}

	public  MoveHeadNode(): GtNode {
		var Node: GtNode = this;
		while(Node.PrevNode != null) {
			Node = Node.PrevNode;
		}
		return Node;
	}

	public  MoveTailNode(): GtNode {
		var Node: GtNode = this;
		while(Node.NextNode != null) {
			Node = Node.NextNode;
		}
		return Node;
	}

	public Append(Node: GtNode): void {
		/*extension*/
	}

	public  AppendNodeList(NodeList: Array<GtNode>): void {
		var i: number = 0;
		while(i < LibGreenTea.ListSize(NodeList)) {
			this.Append(NodeList.get(i));
			i = i + 1;
		}
	}

	public Evaluate(Visitor: GtGenerator): void {
		/* must override */
	}

	public  IsError(): boolean {
		return (this instanceof ErrorNode);
	}

	public ToConstValue(EnforceConst: boolean): Object  {
		if(EnforceConst) {
			LibGreenTea.DebugP("node type=" + LibGreenTea.GetClassName(this));
			this.Type.Context.ReportError(ErrorLevel, this.Token, "not const value");
		}
		return null;
	}

}

 class EmptyNode extends GtNode {
	 constructor(Type: GtType, Token: GtToken) {
		super(Type, Token);
	}
	public ToConstValue(EnforceConst: boolean): Object  {
		return null;
	}
}

 class ConstNode extends GtNode {
	public ConstValue: Object;
	 constructor(Type: GtType, Token: GtToken, ConstValue: Object) {
		super(Type, Token);
		this.ConstValue = ConstValue;
	}
	public Evaluate(Visitor: GtGenerator): void {
		Visitor.VisitConstNode(this);
	}
	public ToConstValue(EnforceConst: boolean): Object  {
		return this.ConstValue;
	}
}

 class LocalNode extends GtNode {
	public NativeName: string;
	 constructor(Type: GtType, Token: GtToken, NativeName: string) {
		super(Type, Token);
		this.NativeName = NativeName;
	}
	public Evaluate(Visitor: GtGenerator): void {
		Visitor.VisitLocalNode(this);
	}
}

class NullNode extends GtNode {
	 constructor(Type: GtType, Token: GtToken) {
		super(Type, Token);
	}
	public Evaluate(Visitor: GtGenerator): void {
		Visitor.VisitNullNode(this);
	}
	public ToConstValue(EnforceConst: boolean): Object  {
		return null;
	}
}

//E.g., (T) $Expr
 class CastNode extends GtNode {
	public Func: GtFunc;
	public CastType: GtType;
	public Expr: GtNode;
	 constructor(Type: GtType, Token: GtToken, CastType: GtType, Expr: GtNode) {
		super(Type, Token);
		this.CastType = CastType;
		this.Expr = Expr;
	}
	public Evaluate(Visitor: GtGenerator): void {
		Visitor.VisitCastNode(this);
	}
	public ToConstValue(EnforceConst: boolean): Object  {
		var Value: Object = this.Expr.ToConstValue(EnforceConst) ;
		if(Value != null) {
			return LibGreenTea.EvalCast(this.CastType, Value);
		}
		return Value;
	}
}

// E.g., "~" $Expr
 class UnaryNode extends GtNode {
	public Func: GtFunc;
	public Expr: GtNode;
	 constructor(Type: GtType, Token: GtToken, Func: GtFunc, Expr: GtNode) {
		super(Type, Token);
		this.Func = Func;
		this.Expr = Expr;
	}
	public Evaluate(Visitor: GtGenerator): void {
		Visitor.VisitUnaryNode(this);
	}
	public ToConstValue(EnforceConst: boolean): Object  {
		var Value: Object = this.Expr.ToConstValue(EnforceConst) ;
		if(Value != null) {
			return LibGreenTea.EvalUnary(this.Type, this.Token.ParsedText, Value);
		}
		return Value;
	}	
}

// E.g.,  $Expr "++"
class SuffixNode extends GtNode {
	public Func: GtFunc;
	public Expr: GtNode;
	 constructor(Type: GtType, Token: GtToken, Func: GtFunc, Expr: GtNode) {
		super(Type, Token);
		this.Func = Func;
		this.Expr = Expr;
	}
	public Evaluate(Visitor: GtGenerator): void {
		Visitor.VisitSuffixNode(this);
	}
	public ToConstValue(EnforceConst: boolean): Object  {
		var Value: Object = this.Expr.ToConstValue(EnforceConst) ;
		if(Value != null) {
			return LibGreenTea.EvalSuffix(this.Type, Value, this.Token.ParsedText);
		}
		return Value;
	}
}

//E.g., "exists" $Expr
class ExistsNode extends GtNode {
	public Func: GtFunc;
	public Expr: GtNode;
	 constructor(Type: GtType, Token: GtToken, Func: GtFunc, Expr: GtNode) {
		super(Type, Token);
		this.Func = Func;
		this.Expr = Expr;
	}
	public Evaluate(Visitor: GtGenerator): void {
		Visitor.VisitExistsNode(this);
	}
}

//E.g., $LeftNode = $RightNode
class AssignNode extends GtNode {
	public LeftNode: GtNode;
	public RightNode: GtNode;
	 constructor(Type: GtType, Token: GtToken, Left: GtNode, Right: GtNode) {
		super(Type, Token);
		this.LeftNode  = Left;
		this.RightNode = Right;
	}
	public Evaluate(Visitor: GtGenerator): void {
		Visitor.VisitAssignNode(this);
	}
}

//E.g., $LeftNode += $RightNode
class SelfAssignNode extends GtNode {
	public LeftNode: GtNode;
	public RightNode: GtNode;
	 constructor(Type: GtType, Token: GtToken, Left: GtNode, Right: GtNode) {
		super(Type, Token);
		this.LeftNode  = Left;
		this.RightNode = Right;
	}
	public Evaluate(Visitor: GtGenerator): void {
		Visitor.VisitSelfAssignNode(this);
	}
}

//E.g., $LeftNode || $RightNode
class InstanceOfNode extends GtNode {
	public ExprNode: GtNode;
	public TypeInfo: GtType;
	 constructor(Type: GtType, Token: GtToken, ExprNode: GtNode, TypeInfo: GtType) {
		super(Type, Token);
		this.ExprNode = ExprNode;
		this.TypeInfo = TypeInfo;
	}
	public Evaluate(Visitor: GtGenerator): void {
		Visitor.VisitInstanceOfNode(this);
	}
	public ToConstValue(EnforceConst: boolean): Object  {
		var Value: Object = this.ExprNode.ToConstValue(EnforceConst) ;
		if(Value != null) {
			return LibGreenTea.EvalInstanceOf(Value, this.TypeInfo);
		}
		return Value;
	}
}

// E.g., $LeftNode "+" $RightNode
class BinaryNode extends GtNode {
	public Func: GtFunc;
	public LeftNode: GtNode;
	public RightNode: GtNode;
	 constructor(Type: GtType, Token: GtToken, Func: GtFunc, Left: GtNode, Right: GtNode) {
		super(Type, Token);
		this.Func = Func;
		this.LeftNode  = Left;
		this.RightNode = Right;
	}
	public Evaluate(Visitor: GtGenerator): void {
		Visitor.VisitBinaryNode(this);
	}
	public ToConstValue(EnforceConst: boolean): Object  {
		var LeftValue: Object = this.LeftNode.ToConstValue(EnforceConst) ;
		if(LeftValue != null) {
			var RightValue: Object = this.RightNode.ToConstValue(EnforceConst) ;
			if(RightValue != null) {
				return LibGreenTea.EvalBinary(this.Type, LeftValue, this.Token.ParsedText, RightValue);
			}
		}
		return null;
	}

}

//E.g., $LeftNode && $RightNode
class AndNode extends GtNode {
	public LeftNode: GtNode;
	public RightNode: GtNode;
	 constructor(Type: GtType, Token: GtToken, Left: GtNode, Right: GtNode) {
		super(Type, Token);
		this.LeftNode  = Left;
		this.RightNode = Right;
	}
	public Evaluate(Visitor: GtGenerator): void {
		Visitor.VisitAndNode(this);
	}
	public ToConstValue(EnforceConst: boolean): Object  {
		var LeftValue: Object = this.LeftNode.ToConstValue(EnforceConst) ;
		if(LeftValue instanceof Boolean && LibGreenTea.booleanValue(LeftValue)) {
			return this.RightNode.ToConstValue(EnforceConst) ;
		}
		return null;
	}
}

//E.g., $LeftNode || $RightNode
class OrNode extends GtNode {
	public LeftNode: GtNode;
	public RightNode: GtNode;
	 constructor(Type: GtType, Token: GtToken, Left: GtNode, Right: GtNode) {
		super(Type, Token);
		this.LeftNode  = Left;
		this.RightNode = Right;
	}
	public Evaluate(Visitor: GtGenerator): void {
		Visitor.VisitOrNode(this);
	}
	public ToConstValue(EnforceConst: boolean): Object  {
		var LeftValue: Object = this.LeftNode.ToConstValue(EnforceConst) ;
		if(LeftValue instanceof Boolean) {
			if(LibGreenTea.booleanValue(LeftValue)) {
				return LeftValue;
			}
			else {
				return this.RightNode.ToConstValue(EnforceConst) ;
			}
		}
		return null;
	}
}

//E.g., $CondExpr "?" $ThenExpr ":" $ElseExpr
 class TrinaryNode extends GtNode {
	public Func: GtFunc;
	public CondExpr: GtNode;
	public ThenExpr: GtNode;
	public ElseExpr: GtNode;
	 constructor(Type: GtType, Token: GtToken, CondExpr: GtNode, ThenExpr: GtNode, ElseExpr: GtNode) {
		super(Type, Token);
		this.CondExpr = CondExpr;
		this.ThenExpr = ThenExpr;
		this.ElseExpr = ElseExpr;
	}
	public Evaluate(Visitor: GtGenerator): void {
		Visitor.VisitTrinaryNode(this);
	}
	public ToConstValue(EnforceConst: boolean): Object  {
		var CondValue: Object = this.CondExpr.ToConstValue(EnforceConst) ;
		if(CondValue instanceof Boolean) {
			if(LibGreenTea.booleanValue(CondValue)) {
				return this.ThenExpr.ToConstValue(EnforceConst) ;
			}
			else {
				return this.ElseExpr.ToConstValue(EnforceConst) ;
			}
		}
		return null;
	}
}

//E.g., $Expr . Token.ParsedText
class GetterNode extends GtNode {
	public Expr: GtNode;
	public Func: GtFunc;
	 constructor(Type: GtType, Token: GtToken, Func: GtFunc, Expr: GtNode) {
		super(Type, Token);
		this.Func = Func;
		this.Expr = Expr;
	}
	public Evaluate(Visitor: GtGenerator): void {
		Visitor.VisitGetterNode(this);
	}

	public ToConstValue(EnforceConst: boolean): Object  {
		var Value: Object = this.Expr.ToConstValue(EnforceConst) ;
		if(Value != null) {
			return LibGreenTea.EvalGetter(this.Type, Value, this.Token.ParsedText);
		}
		return Value;
	}
}

//E.g., $Expr "[" $Node, $Node "]"
 class IndexerNode extends GtNode {
	public Func: GtFunc;
	public Expr: GtNode;
	public NodeList: Array<GtNode>; /* [arg1, arg2, ...] */
	 constructor(Type: GtType, Token: GtToken, Func: GtFunc, Expr: GtNode) {
		super(Type, Token);
		this.Func = Func;
		this.Expr = Expr;
		this.NodeList = new Array<GtNode>();
	}

	public Append(Expr: GtNode): void {
		this.NodeList.add(Expr);
	}

	public GetAt(Index: number): GtNode {
		return this.NodeList.get(Index);
	}

	public Evaluate(Visitor: GtGenerator): void {
		Visitor.VisitIndexerNode(this);
	}
}

//E.g., $Expr "[" $Index ":" $Index2 "]"
class SliceNode extends GtNode {
	public Func: GtFunc;
	public Expr: GtNode;
	public Index1: GtNode;
	public Index2: GtNode;
	 constructor(Type: GtType, Token: GtToken, Func: GtFunc, Expr: GtNode, Index1: GtNode, Index2: GtNode) {
		super(Type, Token);
		this.Func = Func;
		this.Expr = Expr;
		this.Index1 = Index1;
		this.Index2 = Index2;
	}
	public Evaluate(Visitor: GtGenerator): void {
		Visitor.VisitSliceNode(this);
	}
}

class VarNode extends GtNode {
	public DeclType: GtType;
//	/*field*/public GtNode	VarNode;
	public NativeName: string;
	public InitNode: GtNode;
	public BlockNode: GtNode;
	/* let VarNode in Block end */
	 constructor(Type: GtType, Token: GtToken, DeclType: GtType, VariableName: string, InitNode: GtNode, Block: GtNode) {
		super(Type, Token);
		this.NativeName = VariableName;
		this.DeclType  = DeclType;
		this.InitNode  = InitNode;
		this.BlockNode = Block;
	}
	public Evaluate(Visitor: GtGenerator): void {
		Visitor.VisitVarNode(this);
	}
}

// E.g., $Param[0] "(" $Param[1], $Param[2], ... ")"
class ApplyNode extends GtNode {
	public Func: GtFunc;
	public NodeList: Array<GtNode>; /* [arg1, arg2, ...] */
	 constructor(Type: GtType, KeyToken: GtToken, Func: GtFunc) {
		super(Type, KeyToken);
		this.Func = Func;
		this.NodeList = new Array<GtNode>();
	}
	public Append(Expr: GtNode): void {
		this.NodeList.add(Expr);
	}

	public Evaluate(Visitor: GtGenerator): void {
		Visitor.VisitApplyNode(this);
	}

	public ToConstValue(EnforceConst: boolean): Object  {
		return this.Type.Context.Generator.EvalApplyNode(this, EnforceConst);
	}
}

//E.g., "new" $Type "(" $Param[0], $Param[1], ... ")"
class NewNode extends GtNode {
	public Params: Array<GtNode>;
	Func: GtFunc;
	 constructor(Type: GtType, Token: GtToken, Func: GtFunc) {
		super(Type, Token);
		this.Params = new Array<GtNode>();
		this.Func = Func;
		this.Params.add(new ConstNode(Func.GetFuncType(), Token, Func));
	}
	public Append(Expr: GtNode): void {
		this.Params.add(Expr);
	}
	public Evaluate(Visitor: GtGenerator): void {
		Visitor.VisitNewNode(this);
	}
}

//E.g., $Expr "[" $Node, $Node "]"
class ArrayNode extends GtNode {
	public NodeList: Array<GtNode>;
	Func: GtFunc;
	 constructor(Type: GtType, Token: GtToken) {
		super(Type, Token);
		this.NodeList = new Array<GtNode>();
	}
	public Append(Expr: GtNode): void {
		this.NodeList.add(Expr);
	}
	public Evaluate(Visitor: GtGenerator): void {
		Visitor.VisitArrayNode(this);
	}
	public ToConstValue(EnforceConst: boolean): Object  {
		if(EnforceConst) {
			return this.Type.Context.Generator.EvalArrayNode(this, EnforceConst);
		}
		return null;
	}
}

//E.g., "if" "(" $Cond ")" $ThenNode "else" $ElseNode
class IfNode extends GtNode {
	public CondExpr: GtNode;
	public ThenNode: GtNode;
	public ElseNode: GtNode;
	/* If CondExpr then ThenBlock else ElseBlock */
	 constructor(Type: GtType, Token: GtToken, CondExpr: GtNode, ThenBlock: GtNode, ElseNode: GtNode) {
		super(Type, Token);
		this.CondExpr = CondExpr;
		this.ThenNode = ThenBlock;
		this.ElseNode = ElseNode;
	}
	public Evaluate(Visitor: GtGenerator): void {
		Visitor.VisitIfNode(this);
	}
}

//E.g., "while" "(" $CondExpr ")" $LoopBody
class WhileNode extends GtNode {
	public CondExpr: GtNode;
	public LoopBody: GtNode;
	 constructor(Type: GtType, Token: GtToken, CondExpr: GtNode, LoopBody: GtNode) {
		super(Type, Token);
		this.CondExpr = CondExpr;
		this.LoopBody = LoopBody;
	}
	public Evaluate(Visitor: GtGenerator): void {
		Visitor.VisitWhileNode(this);
	}
}

class DoWhileNode extends GtNode {
	public CondExpr: GtNode;
	public LoopBody: GtNode;
	 constructor(Type: GtType, Token: GtToken, CondExpr: GtNode, LoopBody: GtNode) {
		super(Type, Token);
		this.CondExpr = CondExpr;
		this.LoopBody = LoopBody;
	}
	public Evaluate(Visitor: GtGenerator): void {
		Visitor.VisitDoWhileNode(this);
	}
}

//E.g., "for" "(" ";" $CondExpr ";" $IterExpr ")" $LoopNode
class ForNode extends GtNode {
	public CondExpr: GtNode;
	public IterExpr: GtNode;
	public LoopBody: GtNode;
	 constructor(Type: GtType, Token: GtToken, CondExpr: GtNode, IterExpr: GtNode, LoopBody: GtNode) {
		super(Type, Token);
		this.CondExpr = CondExpr;
		this.LoopBody = LoopBody;
		this.IterExpr = IterExpr;
	}
	public Evaluate(Visitor: GtGenerator): void {
		Visitor.VisitForNode(this);
	}
}

//E.g., "for" "(" $Variable ":" $IterExpr ")" $LoopNode
class ForEachNode extends GtNode {
	public Variable: GtNode;
	public IterExpr: GtNode;
	public LoopBody: GtNode;
	 constructor(Type: GtType, Token: GtToken, Variable: GtNode, IterExpr: GtNode, LoopBody: GtNode) {
		super(Type, Token);
		this.Variable = Variable;
		this.IterExpr = IterExpr;
		this.LoopBody = LoopBody;
	}
	public Evaluate(Visitor: GtGenerator): void {
		Visitor.VisitForEachNode(this);
	}
}

class LabelNode extends GtNode {
	public Label: string;
	 constructor(Type: GtType, Token: GtToken, Label: string) {
		super(Type, Token);
		this.Label = Label;
	}
	public Evaluate(Visitor: GtGenerator): void {
		Visitor.VisitLabelNode(this);
	}
}

class JumpNode extends GtNode {
	public Label: string;
	 constructor(Type: GtType, Token: GtToken, Label: string) {
		super(Type, Token);
		this.Label = Label;
	}
	public Evaluate(Visitor: GtGenerator): void {
		Visitor.VisitJumpNode(this);
	}
}

class ContinueNode extends GtNode {
	public Label: string;
	 constructor(Type: GtType, Token: GtToken, Label: string) {
		super(Type, Token);
		this.Label = Label;
	}
	public Evaluate(Visitor: GtGenerator): void {
		Visitor.VisitContinueNode(this);
	}
}

class BreakNode extends GtNode {
	public Label: string;
	 constructor(Type: GtType, Token: GtToken, Label: string) {
		super(Type, Token);
		this.Label = Label;
	}
	public Evaluate(Visitor: GtGenerator): void {
		Visitor.VisitBreakNode(this);
	}
}

class ReturnNode extends GtNode {
	public Expr: GtNode;
	 constructor(Type: GtType, Token: GtToken, Expr: GtNode) {
		super(Type, Token);
		this.Expr = Expr;
	}
	public Evaluate(Visitor: GtGenerator): void {
		Visitor.VisitReturnNode(this);
	}
}

class ThrowNode extends GtNode {
	public Expr: GtNode;
	 constructor(Type: GtType, Token: GtToken, Expr: GtNode) {
		super(Type, Token);
		this.Expr = Expr;
	}
	public Evaluate(Visitor: GtGenerator): void {
		Visitor.VisitThrowNode(this);
	}
}

class TryNode extends GtNode {
	public TryBlock: GtNode;
	public CatchExpr: GtNode;
	public CatchBlock: GtNode;
	public FinallyBlock: GtNode;
	 constructor(Type: GtType, Token: GtToken, TryBlock: GtNode, CatchExpr: GtNode, CatchBlock: GtNode, FinallyBlock: GtNode) {
		super(Type, Token);
		this.TryBlock = TryBlock;
		this.CatchExpr = CatchExpr;
		this.CatchBlock = CatchBlock;
		this.FinallyBlock = FinallyBlock;
	}
	public Evaluate(Visitor: GtGenerator): void {
		Visitor.VisitTryNode(this);
	}
}

class SwitchNode extends GtNode {
	public MatchNode: GtNode;
	public DefaultBlock: GtNode;
	public CaseList: Array<GtNode>; // [expr, block, expr, block, ....]

	 constructor(Type: GtType, Token: GtToken, MatchNode: GtNode, DefaultBlock: GtNode) {
		super(Type, Token);
		this.MatchNode = MatchNode;
		this.DefaultBlock = DefaultBlock;
		this.CaseList = new Array<GtNode>();
	}
	public Evaluate(Visitor: GtGenerator): void {
		Visitor.VisitSwitchNode(this);
	}
	public Append(Expr: GtNode): void {
		this.CaseList.add(Expr);
	}
}

class FunctionNode extends GtNode {
	 constructor(Type: GtType, Token: GtToken) {
		super(Type, Token); // TODO
	}
	public Evaluate(Visitor: GtGenerator): void {
		Visitor.VisitFunctionNode(this);
	}
}

class ErrorNode extends GtNode {
	 constructor(Type: GtType, Token: GtToken) {
		super(Type, Token);
	}
	public Evaluate(Visitor: GtGenerator): void {
		Visitor.VisitErrorNode(this);
	}
	public ToConstValue(EnforceConst: boolean): Object  {
		return null;
	}
}

// E.g., "ls" "-a"..
class CommandNode extends GtNode {
	public Params: Array<GtNode>; /* ["ls", "-la", "/", ...] */
	public PipedNextNode: GtNode;
	 constructor(Type: GtType, KeyToken: GtToken, PipedNextNode: GtNode) {
		super(Type, KeyToken);
		this.PipedNextNode = PipedNextNode;
		this.Params = new Array<GtNode>();
	}
	public Append(Expr: GtNode): void {
		this.Params.add(Expr);
	}

	public Evaluate(Visitor: GtGenerator): void {
		Visitor.VisitCommandNode(this);
	}

	public ToConstValue(EnforceConst: boolean): Object  {
		LibGreenTea.println("TODO");
		return null;
	}

}

class GtGenerator {
	public  TargetCode: string;
	public Context: GtContext;
	public GeneratedCodeStack: Array<Object>;
	public OutputFile: string;
	public GeneratorFlag: number;

	 constructor(TargetCode: string, OutputFile: string, GeneratorFlag: number) {
		this.TargetCode = TargetCode;
		this.OutputFile = OutputFile;
		this.GeneratorFlag = GeneratorFlag;
		this.Context = null;
		this.GeneratedCodeStack = null;
	}

	public InitContext(Context: GtContext): void {
		this.Context = Context;
		this.GeneratedCodeStack = new Array<Object>();
		Context.RootNameSpace.LoadRequiredLib("common");
	}

	public  CreateUnsupportedNode(Type: GtType, ParsedTree: GtSyntaxTree): GtNode {
		var Token: GtToken = ParsedTree.KeyToken;
		Type.Context.ReportError(ErrorLevel, Token, this.TargetCode + " has no language support for " + Token.ParsedText);
		return new ErrorNode(Type.Context.VoidType, ParsedTree.KeyToken);
	}

	public CreateConstNode(Type: GtType, ParsedTree: GtSyntaxTree, Value: Object): GtNode {
		return new ConstNode(Type, ParsedTree.KeyToken, Value);
	}

	public CreateNullNode(Type: GtType, ParsedTree: GtSyntaxTree): GtNode {
		return new NullNode(Type, ParsedTree.KeyToken);
	}

	public CreateArrayNode(ArrayType: GtType, ParsedTree: GtSyntaxTree): GtNode {
		return new ArrayNode(ArrayType, ParsedTree.KeyToken);
	}

	public CreateLocalNode(Type: GtType, ParsedTree: GtSyntaxTree, LocalName: string): GtNode {
		return new LocalNode(Type, ParsedTree.KeyToken, LocalName);
	}

	public CreateGetterNode(Type: GtType, ParsedTree: GtSyntaxTree, Func: GtFunc, Expr: GtNode): GtNode {
		return new GetterNode(Type, ParsedTree.KeyToken, Func, Expr);
	}

	public CreateIndexerNode(Type: GtType, ParsedTree: GtSyntaxTree, Func: GtFunc, Expr: GtNode): GtNode {
		return new IndexerNode(Type, ParsedTree.KeyToken, Func, Expr);
	}

	public CreateApplyNode(Type: GtType, ParsedTree: GtSyntaxTree, Func: GtFunc): GtNode {
		return new ApplyNode(Type, ParsedTree == null ? GtTokenContext.NullToken : ParsedTree.KeyToken, Func);
	}

	public CreateNewNode(Type: GtType, ParsedTree: GtSyntaxTree, Func: GtFunc): GtNode {
		return new NewNode(Type, ParsedTree.KeyToken, Func);
	}

	public CreateUnaryNode(Type: GtType, ParsedTree: GtSyntaxTree, Func: GtFunc, Expr: GtNode): GtNode {
		return new UnaryNode(Type, ParsedTree.KeyToken, Func, Expr);
	}

	public CreateSuffixNode(Type: GtType, ParsedTree: GtSyntaxTree, Func: GtFunc, Expr: GtNode): GtNode {
		return new SuffixNode(Type, ParsedTree.KeyToken, Func, Expr);
	}

	public CreateBinaryNode(Type: GtType, ParsedTree: GtSyntaxTree, Func: GtFunc, Left: GtNode, Right: GtNode): GtNode {
		return new BinaryNode(Type, ParsedTree.KeyToken, Func, Left, Right);
	}

	public CreateAndNode(Type: GtType, ParsedTree: GtSyntaxTree, Left: GtNode, Right: GtNode): GtNode {
		return new AndNode(Type, ParsedTree.KeyToken, Left, Right);
	}

	public CreateOrNode(Type: GtType, ParsedTree: GtSyntaxTree, Left: GtNode, Right: GtNode): GtNode {
		return new OrNode(Type, ParsedTree.KeyToken, Left, Right);
	}

	public CreateInstanceOfNode(Type: GtType, ParsedTree: GtSyntaxTree, LeftNode: GtNode, GivenType: GtType): GtNode {
		return new InstanceOfNode(Type, ParsedTree.KeyToken, LeftNode, GivenType);
	}

	public CreateAssignNode(Type: GtType, ParsedTree: GtSyntaxTree, Left: GtNode, Right: GtNode): GtNode {
		return new AssignNode(Type, ParsedTree.KeyToken, Left, Right);
	}

	public CreateSelfAssignNode(Type: GtType, ParsedTree: GtSyntaxTree, Left: GtNode, Right: GtNode): GtNode {
		return new SelfAssignNode(Type, ParsedTree.KeyToken, Left, Right);
	}

	public CreateVarNode(Type: GtType, ParsedTree: GtSyntaxTree, DeclType: GtType, VariableName: string, InitNode: GtNode, Block: GtNode): GtNode {
		return new VarNode(Type, ParsedTree.KeyToken, DeclType, VariableName, InitNode, Block);
	}

	public CreateTrinaryNode(Type: GtType, ParsedTree: GtSyntaxTree, CondNode: GtNode, ThenNode: GtNode, ElseNode: GtNode): GtNode {
		return new TrinaryNode(Type, ParsedTree.KeyToken, CondNode, ThenNode, ElseNode);
	}

	public CreateIfNode(Type: GtType, ParsedTree: GtSyntaxTree, Cond: GtNode, Then: GtNode, Else: GtNode): GtNode {
		return new IfNode(Type, ParsedTree.KeyToken, Cond, Then, Else);
	}

	public CreateSwitchNode(Type: GtType, ParsedTree: GtSyntaxTree, Match: GtNode, DefaultBlock: GtNode): GtNode {
		return new SwitchNode(Type, ParsedTree.KeyToken, Match, DefaultBlock);
	}

	public CreateWhileNode(Type: GtType, ParsedTree: GtSyntaxTree, Cond: GtNode, Block: GtNode): GtNode {
		return new WhileNode(Type, ParsedTree.KeyToken, Cond, Block);
	}

	public CreateDoWhileNode(Type: GtType, ParsedTree: GtSyntaxTree, Cond: GtNode, Block: GtNode): GtNode {
		return new DoWhileNode(Type, ParsedTree.KeyToken, Cond, Block);
	}

	public CreateForNode(Type: GtType, ParsedTree: GtSyntaxTree, Cond: GtNode, IterNode: GtNode, Block: GtNode): GtNode {
		return new ForNode(Type, ParsedTree.KeyToken, Cond, IterNode, Block);
	}

	public CreateForEachNode(Type: GtType, ParsedTree: GtSyntaxTree, VarNode: GtNode, IterNode: GtNode, Block: GtNode): GtNode {
		return new ForEachNode(Type, ParsedTree.KeyToken, VarNode, IterNode, Block);
	}

	public CreateReturnNode(Type: GtType, ParsedTree: GtSyntaxTree, Node: GtNode): GtNode {
		return new ReturnNode(Type, ParsedTree.KeyToken, Node);
	}

	public CreateLabelNode(Type: GtType, ParsedTree: GtSyntaxTree, Node: GtNode): GtNode {
		return null;
	}

	public CreateJumpNode(Type: GtType, ParsedTree: GtSyntaxTree, Node: GtNode, Label: string): GtNode {
		return new JumpNode(Type, ParsedTree.KeyToken, Label);
	}

	public CreateBreakNode(Type: GtType, ParsedTree: GtSyntaxTree, Label: string): GtNode {
		return new BreakNode(Type, ParsedTree.KeyToken, Label);
	}

	public CreateContinueNode(Type: GtType, ParsedTree: GtSyntaxTree, Label: string): GtNode {
		return new ContinueNode(Type, ParsedTree.KeyToken, Label);
	}

	public CreateTryNode(Type: GtType, ParsedTree: GtSyntaxTree, TryBlock: GtNode, CatchExpr: GtNode, CatchNode: GtNode, FinallyBlock: GtNode): GtNode {
		return new TryNode(Type, ParsedTree.KeyToken, TryBlock, CatchExpr, CatchNode, FinallyBlock);
	}

	public CreateThrowNode(Type: GtType, ParsedTree: GtSyntaxTree, Node: GtNode): GtNode {
		return new ThrowNode(Type, ParsedTree.KeyToken, Node);
	}

	public CreateFunctionNode(Type: GtType, ParsedTree: GtSyntaxTree, Block: GtNode): GtNode {
		return null;
	}

	public CreateEmptyNode(Type: GtType): GtNode {
		return new EmptyNode(Type, GtTokenContext.NullToken);
	}

	public CreateErrorNode(Type: GtType, ParsedTree: GtSyntaxTree): GtNode {
		return new ErrorNode(ParsedTree.NameSpace.Context.VoidType, ParsedTree.KeyToken);
	}

	public CreateCommandNode(Type: GtType, ParsedTree: GtSyntaxTree, PipedNextNode: GtNode): GtNode {
		return new CommandNode(Type, ParsedTree.KeyToken, PipedNextNode);
	}

	/* language constructor */

	public  ImportNativeObject(ContextType: GtType, PackageName: string): Object {
		LibGreenTea.VerboseLog(VerboseNative, "importing " + PackageName);

		return null;
	}

	public GetNativeType(Value: Object): GtType {
		return LibGreenTea.GetNativeType(this.Context, Value);
	}

	public LoadNativeField(NativeBaseType: GtType, FieldName: string): boolean {

		NativeBaseType.Context.RootNameSpace.SetUndefinedSymbol(ClassSymbol(NativeBaseType, FieldName));
		NativeBaseType.Context.RootNameSpace.SetUndefinedSymbol(ClassSymbol(NativeBaseType, FieldName)+"="); // for setter
		return false;
	}

	public LoadNativeMethods(NativeBaseType: GtType, FuncName: string): boolean {

		NativeBaseType.Context.RootNameSpace.SetUndefinedSymbol(ClassSymbol(NativeBaseType, FuncName));
		return false;
	}

	public GenerateClassField(Type: GtType, ClassField: GtClassField): void {
		/*extension*/
	}

	public  HasAnnotation(Annotation: GtMap, Key: string): boolean {
		if(Annotation != null) {
			var Value: Object = Annotation.get(Key);
			if(Value instanceof Boolean) {
				Annotation.put(Key, false);  // consumed;
			}
			return (Value != null);
		}
		return false;
	}

	public ParseClassFlag(Flag: number, Annotation: GtMap): number {
		if(Annotation != null) {
			if(this.HasAnnotation(Annotation, "Export")) {
				Flag = Flag | ExportFunc;
			}
			if(this.HasAnnotation(Annotation, "Public")) {
				Flag = Flag | PublicFunc;
			}
			if(this.HasAnnotation(Annotation, "Virtual")) {
				Flag = Flag | VirtualFunc;
			}
			if(this.HasAnnotation(Annotation, "Deprecated")) {
				Flag = Flag | DeprecatedFunc;
			}
		}
		return Flag;
	}

	public ParseFuncFlag(Flag: number, Annotation: GtMap): number {
		if(Annotation != null) {
			if(this.HasAnnotation(Annotation, "Export")) {
				Flag = Flag | ExportFunc;
			}
			if(this.HasAnnotation(Annotation, "Public")) {
				Flag = Flag | PublicFunc;
			}
			if(this.HasAnnotation(Annotation, "Const")) {
				Flag = Flag | ConstFunc;
			}
			if(this.HasAnnotation(Annotation, "Operator")) {
				Flag = Flag | OperatorFunc;
			}
			if(this.HasAnnotation(Annotation, "Coercion")) {
				Flag = Flag | CoercionFunc;
			}
			if(this.HasAnnotation(Annotation, "Deprecated")) {
				Flag = Flag | DeprecatedFunc;
			}
		}
		return Flag;
	}

	public ParseVarFlag(Flag: number, Annotation: GtMap): number {
		if(Annotation != null) {
			if(this.HasAnnotation(Annotation, "ReadOnly")) {
				Flag = Flag | ReadOnlyVar;
			}
		}
		return Flag;
	}

	public CreateFunc(FuncFlag: number, FuncName: string, BaseIndex: number, TypeList: Array<GtType>): GtFunc {
		return new GtFunc(FuncFlag, FuncName, BaseIndex, TypeList);
	}

	public GenerateFunc(Func: GtFunc, ParamNameList: Array<string>, Body: GtNode): void {
		/*extenstion*/
	}

	public SyncCodeGeneration(): void {
		/*extension*/
	}

	public  StopVisitor(Node: GtNode): void {
		Node.NextNode = null;
	}

	public  IsEmptyBlock(Node: GtNode): boolean {
		return Node == null || (Node instanceof EmptyNode) && Node.NextNode == null;
	}

	//------------------------------------------------------------------------

	public VisitEmptyNode(EmptyNode: EmptyNode): void {
		LibGreenTea.DebugP("empty node: " + EmptyNode.Token.ParsedText);
	}

	public VisitInstanceOfNode(Node: InstanceOfNode): void {
		/*extention*/
	}

	public VisitSelfAssignNode(Node: SelfAssignNode): void {
		/*extention*/
	}

	public VisitTrinaryNode(Node: TrinaryNode): void {
		/*extension*/
	}

	public VisitExistsNode(Node: ExistsNode): void {
		/*extension*/
	}

	public VisitCastNode(Node: CastNode): void {
		/*extension*/
	}

	public VisitSliceNode(Node: SliceNode): void {
		/*extension*/
	}

	public VisitSuffixNode(Node: SuffixNode): void {
		/*extension*/
	}

	public VisitUnaryNode(Node: UnaryNode): void {
		/*extension*/
	}

	public VisitIndexerNode(Node: IndexerNode): void {
		/*extension*/
	}

	public VisitArrayNode(Node: ArrayNode): void {
		/*extension*/
	}

	public VisitWhileNode(Node: WhileNode): void {
		/*extension*/
	}

	public VisitDoWhileNode(Node: DoWhileNode): void {
		/*extension*/
	}

	public VisitForNode(Node: ForNode): void {
		/*extension*/
	}

	public VisitForEachNode(Node: ForEachNode): void {
		/*extension*/
	}

	public VisitConstNode(Node: ConstNode): void {
		/*extension*/
	}

	public VisitNewNode(Node: NewNode): void {
		/*extension*/
	}

	public VisitNullNode(Node: NullNode): void {
		/*extension*/
	}

	public VisitLocalNode(Node: LocalNode): void {
		/*extension*/
	}

	public VisitGetterNode(Node: GetterNode): void {
		/*extension*/
	}

	public VisitApplyNode(Node: ApplyNode): void {
		/*extension*/
	}

	public VisitBinaryNode(Node: BinaryNode): void {
		/*extension*/
	}

	public VisitAndNode(Node: AndNode): void {
		/*extension*/
	}

	public VisitOrNode(Node: OrNode): void {
		/*extension*/
	}

	public VisitAssignNode(Node: AssignNode): void {
		/*extension*/
	}

	public VisitVarNode(Node: VarNode): void {
		/*extension*/
	}

	public VisitIfNode(Node: IfNode): void {
		/*extension*/
	}

	public VisitSwitchNode(Node: SwitchNode): void {
		/*extension*/
	}

	public VisitReturnNode(Node: ReturnNode): void {
		/*extension*/
	}

	public VisitLabelNode(Node: LabelNode): void {
		/*extension*/
	}

	public VisitJumpNode(Node: JumpNode): void {
		/*extension*/
	}

	public VisitBreakNode(Node: BreakNode): void {
		/*extension*/
	}

	public VisitContinueNode(Node: ContinueNode): void {
		/*extension*/
	}

	public VisitTryNode(Node: TryNode): void {
		/*extension*/
	}

	public VisitThrowNode(Node: ThrowNode): void {
		/*extension*/
	}

	public VisitFunctionNode(Node: FunctionNode): void {
		/*extension*/
	}

	public VisitErrorNode(Node: ErrorNode): void {
		/*extension*/
	}

	public VisitCommandNode(Node: CommandNode): void {
		/*extension*/
	}

	public  VisitBlock(Node: GtNode): void {
		var CurrentNode: GtNode = Node;
		while(CurrentNode != null) {
			CurrentNode.Evaluate(this);
			CurrentNode = CurrentNode.NextNode;
		}
	}

	// This must be extended in each language

	public IsStrictMode(): boolean {
		return false; /* override this */
	}

	public Eval(Node: GtNode): Object {
		this.VisitBlock(Node);
		return null;
	}

	// EnforceConst : 
	public EvalApplyNode(Node: ApplyNode, EnforceConst: boolean): Object {

		return null;  // if unsupported
	}

	public EvalArrayNode(Node: ArrayNode, EnforceConst: boolean): Object {
		var NewList: Array<Object> = null;

		return NewList;  // if unsupported
	}

	public FlushBuffer(): void {
		/*extension*/
	}

	public BlockComment(Comment: string): string {
		return "/*" + Comment + "*/";
	}

	public StartCompilationUnit(): void {
		/*extension*/
	}

	public FinishCompilationUnit(): void {
		/*extension*/
	}

	 PushCode(Code: Object): void {
		this.GeneratedCodeStack.add(Code);
	}

	  PopCode(): Object {
		var Size: number = this.GeneratedCodeStack.size();
		if(Size > 0) {
			return this.GeneratedCodeStack.remove(Size - 1);
		}
		return "";
	}

	public GetRecvName(): string {
		return "this";  // default 
	}

	public InvokeMainFunc(MainFuncName: string): void {
		/*extension*/
	}

}

class SourceGenerator extends GtGenerator {
	 HeaderSource: string;
	 BodySource: string;

	 Tab: string;
	 LineFeed: string;
	 IndentLevel: number;
	 CurrentLevelIndentString: string;

	 HasLabelSupport: boolean;
	 LogicalOrOperator: string;
	 LogicalAndOperator: string;
	 MemberAccessOperator: string;
	 TrueLiteral: string;
	 FalseLiteral: string;
	 NullLiteral: string;
	 LineComment: string;
	 BreakKeyword: string;
	 ContinueKeyword: string;

	 constructor(TargetCode: string, OutputFile: string, GeneratorFlag: number) {
		super(TargetCode, OutputFile, GeneratorFlag);
		this.LineFeed = "\n";
		this.IndentLevel = 0;
		this.Tab = "   ";
		this.CurrentLevelIndentString = null;
		this.HeaderSource = "";
		this.BodySource = "";
		this.HasLabelSupport = false;
		this.LogicalOrOperator  = "||";
		this.LogicalAndOperator = "&&";
		this.MemberAccessOperator = ".";
		this.TrueLiteral  = "true";
		this.FalseLiteral = "false";
		this.NullLiteral  = "null";
		this.BreakKeyword = "break";
		this.ContinueKeyword = "continue";
		this.LineComment  = "//";
	}

	public InitContext(Context: GtContext): void {
		super.InitContext(Context);
		this.HeaderSource = "";
		this.BodySource = "";
	}

	public  WriteHeader(Text: string): void {
		this.HeaderSource += Text;
	}

	public  WriteLineHeader(Text: string): void {
		this.HeaderSource += Text + this.LineFeed;
	}

	public  WriteCode(Text: string): void {
		this.BodySource += Text;
	}

	public  WriteLineCode(Text: string): void {
		this.BodySource += Text + this.LineFeed;
	}

	public  WriteLineComment(Text: string): void {
		this.BodySource += this.LineComment + " " + Text + this.LineFeed;
	}

	public  FlushErrorReport(): void {
		this.WriteLineCode("");
		var Reports: string[] = this.Context.GetReportedErrors();
		var i: number = 0;
		while(i < Reports.length) {
			this.WriteLineComment(Reports[i]);
			i = i + 1;
		}
		this.WriteLineCode("");		
	}

	public FlushBuffer(): void {
		LibGreenTea.WriteCode(this.OutputFile, this.HeaderSource + this.BodySource);			
		this.HeaderSource = "";
		this.BodySource = "";
	}

	/* GeneratorUtils */

	public  Indent(): void {
		this.IndentLevel += 1;
		this.CurrentLevelIndentString = null;
	}

	public  UnIndent(): void {
		this.IndentLevel -= 1;
		this.CurrentLevelIndentString = null;
		LibGreenTea.Assert(this.IndentLevel >= 0);
	}

	public  GetIndentString(): string {
		if(this.CurrentLevelIndentString == null) {
			this.CurrentLevelIndentString = JoinStrings(this.Tab, this.IndentLevel);
		}
		return this.CurrentLevelIndentString;
	}

	 StringifyConstValue(ConstValue: Object): string {
		if(ConstValue == null) {
			return this.NullLiteral;
		}
		if(ConstValue instanceof Boolean) {
			if(ConstValue.equals(true)) {
				return this.TrueLiteral;
			}
			else {
				return this.FalseLiteral;
			}
		}
		if((typeof ConstValue == 'string' || ConstValue instanceof String)) {
			return LibGreenTea.QuoteString(<string>ConstValue);
		}
		if(ConstValue instanceof GreenTeaEnum) {
			return "" + (<GreenTeaEnum> ConstValue).EnumValue;
		}
		return ConstValue.toString();
	}

	 GetNewOperator(Type: GtType): string {
		return "new " + Type.ShortClassName + "()";
	}

	  PushSourceCode(Code: string): void {
		this.PushCode(Code);
	}

	  PopSourceCode(): string {
		return <string> this.PopCode();
	}

	public  VisitNode(Node: GtNode): string {
		// meaning less ??
//		/*local*/Object ConstValue = Node.ToConstValue(false);
//		if(ConstValue != null) {
//			return this.StringifyConstValue(ConstValue);
//		}
//		else {
		Node.Evaluate(this);
		return this.PopSourceCode();
//		}
	}

	public  JoinCode(BeginCode: string, BeginIdx: number, ParamCode: string[], EndCode: string, Delim: string): string {
		var JoinedCode: string = BeginCode;
		var i: number = BeginIdx;
		while(i < ParamCode.length) {
			var P: string = ParamCode[i];
			if(i != BeginIdx) {
				JoinedCode += Delim;
			}
			JoinedCode += P;
			i = i + 1;
		}
		return JoinedCode + EndCode;
	}

	public  static GenerateApplyFunc1(Func: GtFunc, FuncName: string, IsSuffixOp: boolean, Arg1: string): string {
		var Macro: string = null;
		if(Func != null) {
			FuncName = Func.GetNativeFuncName();
			if(IsFlag(Func.FuncFlag, NativeMacroFunc)) {
				Macro = Func.GetNativeMacro();
			}
		}
		if(Macro == null) {
			if(IsSuffixOp) {
				Macro = "$1 " + FuncName;
			}
			else {
				Macro = FuncName + " $1";
			}
		}
		return Macro.replace("$1", Arg1);
	}

	public  static GenerateApplyFunc2(Func: GtFunc, FuncName: string, Arg1: string, Arg2: string): string {
		var Macro: string = null;
		if(Func != null) {
			FuncName = Func.GetNativeFuncName();
			if(IsFlag(Func.FuncFlag, NativeMacroFunc)) {
				Macro = Func.GetNativeMacro();
			}
		}
		if(Macro == null) {
			Macro = "$1 " + FuncName + " $2";
		}
		return Macro.replace("$1", Arg1).replace("$2", Arg2);
	}

	public GenerateFuncTemplate(ParamSize: number, Func: GtFunc): string {
		var BeginIdx: number = 1;
		var Template: string = "";
		var IsNative: boolean = false;
		if(Func == null) {
			Template = "$1";
			BeginIdx = 2;
		}
		else if(Func.Is(NativeFunc)) {
			Template = "$1" + this.MemberAccessOperator + Func.FuncName;
			BeginIdx = 2;
		}
		else if(Func.Is(NativeMacroFunc)) {
			Template = Func.GetNativeMacro();
			IsNative = true;
		}
		else {
			Template = Func.GetNativeFuncName();
		}
		var i: number = BeginIdx;
		if(IsNative == false) {
			Template += "(";
			while(i < ParamSize) {
				if(i != BeginIdx) {
					Template += ", ";
				}
				Template += "$" + i;
				i = i + 1;
			}
			Template += ")";
		}
		return Template;
	}

	public  ApplyMacro(Template: string, NodeList: Array<GtNode>): string {
		var ParamSize: number = LibGreenTea.ListSize(NodeList);
		var ParamIndex: number = ParamSize - 1;
		while(ParamIndex >= 1) {
			var Param: string = this.VisitNode(NodeList.get(ParamIndex));
			Template = Template.replace("$" + ParamIndex, Param);
			ParamIndex = ParamIndex - 1;
		}
		return Template;
	}

	public  GenerateApplyFunc(Node: ApplyNode): string {
		var ParamSize: number = LibGreenTea.ListSize(Node.NodeList);
		var Template: string = this.GenerateFuncTemplate(ParamSize, Node.Func);
		return this.ApplyMacro(Template, Node.NodeList);
	}

	// Visitor API
	public VisitEmptyNode(Node: EmptyNode): void {
		this.PushSourceCode("");
	}

	public  VisitConstNode(Node: ConstNode): void {
		this.PushSourceCode(this.StringifyConstValue(Node.ConstValue));
	}

	public  VisitNullNode(Node: NullNode): void {
		this.PushSourceCode(this.NullLiteral);
	}

	public VisitLocalNode(Node: LocalNode): void {
		this.PushSourceCode(Node.NativeName);
	}

	public VisitReturnNode(Node: ReturnNode): void {
		var Code: string = "return";
		if(Node.Expr != null) {
			Code += " " + this.VisitNode(Node.Expr);
		}
		this.PushSourceCode(Code);
		this.StopVisitor(Node);
	}

	public VisitIndexerNode(Node: IndexerNode): void {
		this.PushSourceCode(this.VisitNode(Node.Expr) + "[" + this.VisitNode(Node.GetAt(0)) + "]"); // FIXME: Multi
	}

	public  VisitNewNode(Node: NewNode): void {
		var ParamSize: number = LibGreenTea.ListSize(Node.Params);
		var NewOperator: string = this.GetNewOperator(Node.Type);
		var Template: string = this.GenerateFuncTemplate(ParamSize, Node.Func);
		Template = Template.replace("$1", NewOperator);
		this.PushSourceCode(this.ApplyMacro(Template, Node.Params));
	}

	public VisitApplyNode(Node: ApplyNode): void {
		var Program: string = this.GenerateApplyFunc(Node);
		this.PushSourceCode(Program);
	}

	public VisitSuffixNode(Node: SuffixNode): void {
		var FuncName: string = Node.Token.ParsedText;
		var Expr: string = this.VisitNode(Node.Expr);
		if(LibGreenTea.EqualsString(FuncName, "++")) {
		}
		else if(LibGreenTea.EqualsString(FuncName, "--")) {
		}
		else {
			LibGreenTea.DebugP(FuncName + " is not supported suffix operator!!");
		}
		this.PushSourceCode("(" + SourceGenerator.GenerateApplyFunc1(Node.Func, FuncName, true, Expr) + ")");
	}

	public VisitUnaryNode(Node: UnaryNode): void {
		var FuncName: string = Node.Token.ParsedText;
		var Expr: string = this.VisitNode(Node.Expr);
		this.PushSourceCode("(" + SourceGenerator.GenerateApplyFunc1(Node.Func, FuncName, false, Expr) + ")");
	}

	public VisitBinaryNode(Node: BinaryNode): void {
		var FuncName: string = Node.Token.ParsedText;
		var Left: string = this.VisitNode(Node.LeftNode);
		var Right: string = this.VisitNode(Node.RightNode);
		this.PushSourceCode("(" + SourceGenerator.GenerateApplyFunc2(Node.Func, FuncName, Left, Right) + ")");
	}

	public VisitGetterNode(Node: GetterNode): void {
		this.PushSourceCode(this.VisitNode(Node.Expr) + this.MemberAccessOperator + Node.Func.FuncName);
	}
	public VisitAssignNode(Node: AssignNode): void {
		this.PushSourceCode(this.VisitNode(Node.LeftNode) + " = " + this.VisitNode(Node.RightNode));
	}

	public VisitAndNode(Node: AndNode): void {
		var Left: string = this.VisitNode(Node.LeftNode);
		var Right: string = this.VisitNode(Node.RightNode);
		this.PushSourceCode("(" + Left + " " + this.LogicalAndOperator +" " + Right + ")");
	}

	public VisitOrNode(Node: OrNode): void {
		var Left: string = this.VisitNode(Node.LeftNode);
		var Right: string = this.VisitNode(Node.RightNode);
		this.PushSourceCode("(" + Left + " " + this.LogicalOrOperator +" " + Right + ")");
	}

	public VisitBreakNode(Node: BreakNode): void {
		var Code: string = this.BreakKeyword;
		if(this.HasLabelSupport) {
			var Label: string = Node.Label;
			if(Label != null) {
				Code += " " + Label;
			}
		}
		this.PushSourceCode(Code);
		this.StopVisitor(Node);
	}

	public VisitContinueNode(Node: ContinueNode): void {
		var Code: string = this.ContinueKeyword;
		if(this.HasLabelSupport) {
			var Label: string = Node.Label;
			if(Label != null) {
				Code += " " + Label;
			}
		}
		this.PushSourceCode(Code);
		this.StopVisitor(Node);
	}

	public VisitLabelNode(Node: LabelNode): void {
//		/*local*/String Label = Node.Label;
//		this.PushSourceCode(Label + ":");
	}

	public VisitJumpNode(Node: JumpNode): void {
//		/*local*/String Label = Node.Label;
//		this.PushSourceCode("goto " + Label);
//		this.StopVisitor(Node);
	}
}