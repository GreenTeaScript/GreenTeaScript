module GreenScript {

	class TypedNode {
		var ParentNode :TypedNode = null;
		var PrevNode :TypedNode = null;
		var NextNode :TypedNode = null;
	
		Type :GtType;
		Token :GtToken;
	
		constructor(Type :GtType, Token :GtToken) {
			this.Type = Type;
			this.Token = Token;
			this.ParentNode = null;
			this.PrevNode = null;
			this.NextNode = null;
		}
	
		LinkNode(Node :TypedNode) :void {
			Node.PrevNode = this;
			this.NextNode = Node;
		}
	
		GetHeadNode() :TypedNode {
			var Node :TypedNode = this;
			while(Node.PrevNode != null) {
				Node = Node.PrevNode;
			}
			return Node;
		}
	
		GetTailNode() :TypedNode {
			var Node :TypedNode = this;
			while(Node.NextNode != null) {
				Node = Node.NextNode;
			}
			return this;
		}
	
		Evaluate(Visitor :GreenTeaGenerator) :void {
			// Override
		}
	
		IsError() :boolean {
			return (this instanceof ErrorNode);
		}
	
	}
	
	class UnaryNode extends TypedNode {
		Expr :TypedNode;
		constructor(Type :GtType, Token :GtToken, Expr :TypedNode) {
			super(Type, Token);
			this.Expr = Expr;
		}
	}
	
	class BinaryNode extends TypedNode {
		LeftNode :TypedNode;
		RightNode :TypedNode;
		constructor(Type :GtType, Token :GtToken, Left :TypedNode, Right :TypedNode) {
			super(Type, Token);
			this.LeftNode = Left;
			this.RightNode = Right;
		}
		Evaluate(Visitor :GreenTeaGenerator) :void {
			Visitor.VisitBinaryNode(this);
		}
	}
	
	class AndNode extends BinaryNode {
		constructor(Type :GtType, Token :GtToken, Left :TypedNode, Right :TypedNode) {
			super(Type, Token, Left, Right);
		}
		Evaluate(Visitor :GreenTeaGenerator) :void {
			Visitor.VisitAndNode(this);
		}
	}
	
	class OrNode extends BinaryNode {
		constructor(Type :GtType, Token :GtToken, Left :TypedNode, Right :TypedNode) {
			super(Type, Token, Left, Right);
		}
		Evaluate(Visitor :GreenTeaGenerator) :void {
			Visitor.VisitOrNode(this);
		}
	}
	
	class GetterNode extends TypedNode {
		Expr :TypedNode;
		Method :GtMethod;
		constructor(Type :GtType, Token :GtToken, Expr :TypedNode, Method :GtMethod) {
			super(Type, Token);
			this.Expr = Expr;
			this.Method = Method;
		}
		Evaluate(Visitor :GreenTeaGenerator) :void {
			Visitor.VisitGetterNode(this);
		}
	}
	
	class AssignNode extends BinaryNode {
		constructor(Type :GtType, Token :GtToken, Left :TypedNode, Right :TypedNode) {
			super(Type, Token, Left, Right);
		}
		Evaluate(Visitor :GreenTeaGenerator) :void {
			Visitor.VisitAssignNode(this);
		}
	}
	
	class ConstNode extends TypedNode {
		ConstValue :Object;
		constructor(Type :GtType, Token :GtToken, ConstValue :Object) {
			super(Type, Token);
			this.ConstValue = ConstValue;
		}
		Evaluate(Visitor :GreenTeaGenerator) :void {
			Visitor.VisitConstNode(this);
		}
	}
	
	class LocalNode extends TypedNode {
		constructor(Type :GtType, Token :GtToken) {
			super(Type, Token);
		}
		Evaluate(Visitor :GreenTeaGenerator) :void {
			Visitor.VisitLocalNode(this);
		}
	}
	
	class NullNode extends TypedNode {
		constructor(Type :GtType, Token :GtToken) {
			super(Type, Token);
		}
		Evaluate(Visitor :GreenTeaGenerator) :void {
			Visitor.VisitNullNode(this);
		}
	}
	
	class LetNode extends TypedNode {
		VarToken :GtToken;
		ValueNode :TypedNode;
		BlockNode :TypedNode;
	
		
		constructor(Type :GtType, VarToken :GtToken, Right :TypedNode, Block :TypedNode) {
			super(Type, VarToken);
			this.VarToken = VarToken;
			this.ValueNode = Right;
			this.BlockNode = Block;
		}
		Evaluate(Visitor :GreenTeaGenerator) :void {
			Visitor.VisitLetNode(this);
		}
	}
	
	class ApplyNode extends TypedNode {
		Method :GtMethod;
		Params :any[]; 
	
		
		constructor(Type :GtType, KeyToken :GtToken, Method :GtMethod) {
			super(Type, KeyToken);
			this.Method = Method;
			this.Params = [];
		}
		
		constructor(Type :GtType, KeyToken :GtToken, Method :GtMethod, arg1 :TypedNode) {
			super(Type, KeyToken);
			this.Method = Method;
			this.Params = [];
			this.Params.push(arg1);
		}
		
		ApplyNode(Type :GtType, KeyToken :GtToken, Method :GtMethod, arg1 :TypedNode, arg2 :TypedNode) {
			super(Type, KeyToken);
			this.Method = Method;
			this.Params = [];
			this.Params.push(arg1);
			this.Params.push(arg2);
		}
	
		Append(Expr :TypedNode) :void {
			this.Params.push(Expr);
		}
	
		Evaluate(Visitor :GreenTeaGenerator) :void {
			Visitor.VisitApplyNode(this);
		}
	}
	
	class NewNode extends TypedNode {
		Params :any[]; 
	
		constructor(Type :GtType, Token :GtToken) {
			super(Type, Token);
			this.Params = [];
		}
	
		Append(Expr :TypedNode) :void {
			this.Params.push(Expr);
		}
	
		Evaluate(Visitor :GreenTeaGenerator) :void {
			Visitor.VisitNewNode(this);
		}
	}
	
	class IfNode extends TypedNode {
		CondExpr :TypedNode;
		ThenNode :TypedNode;
		ElseNode :TypedNode;
	
		
		constructor(Type :GtType, Token :GtToken, CondExpr :TypedNode, ThenBlock :TypedNode, ElseNode :TypedNode) {
			super(Type, Token);
			this.CondExpr = CondExpr;
			this.ThenNode = ThenBlock;
			this.ElseNode = ElseNode;
		}
		Evaluate(Visitor :GreenTeaGenerator) :void {
			Visitor.VisitIfNode(this);
		}
	}
	
	class LoopNode extends TypedNode {
		CondExpr :TypedNode;
		LoopBody :TypedNode;
		IterationExpr :TypedNode;
	
		LoopNode(Type :GtType, Token :GtToken, CondExpr :TypedNode, LoopBody :TypedNode, IterationExpr :TypedNode) {
			super(Type, Token);
			this.CondExpr = CondExpr;
			this.LoopBody = LoopBody;
			this.IterationExpr = IterationExpr;
		}
		Evaluate(Visitor :GreenTeaGenerator) :void {
			Visitor.VisitLoopNode(this);
		}
	}
	
	class LabelNode extends TypedNode {
		Label :string;
		constructor(Type :GtType, Token :GtToken, Label :string) {
			super(Type, Token);
			this.Label = Label;
		}
		Evaluate(Visitor :GreenTeaGenerator) :void {
			Visitor.VisitLabelNode(this);
		}
	}
	
	class JumpNode extends TypedNode {
		Label :string;
		constructor(Type :GtType, Token :GtToken, Label :string) {
			super(Type, Token);
			this.Label = Label;
		}
		Evaluate(Visitor :GreenTeaGenerator) :void {
			Visitor.VisitJumpNode(this);
		}
	}
	class ContinueNode extends TypedNode {
		Label :string;
		constructor(Type :GtType, Token :GtToken, Label :string) {
			super(Type, Token);
			this.Label = Label;
		}
		Evaluate(Visitor :GreenTeaGenerator) :void {
			Visitor.VisitContinueNode(this);
		}
	}
	class BreakNode extends TypedNode {
		Label :string;
		constructor(Type :GtType, Token :GtToken, Label :string) {
			super(Type, Token);
			this.Label = Label;
		}
		Evaluate(Visitor :GreenTeaGenerator) :void {
			Visitor.VisitBreakNode(this);
		}
	}
	
	class ReturnNode extends UnaryNode {
		constructor(Type :GtType, Token :GtToken, Expr :TypedNode) {
			super(Type, Token, Expr);
		}
		Evaluate(Visitor :GreenTeaGenerator) :void {
			Visitor.VisitReturnNode(this);
		}
	}
	
	class ThrowNode extends UnaryNode {
		constructor(Type :GtType, Token :GtToken, Expr :TypedNode) {
			super(Type, Token, Expr);
		}
		Evaluate(Visitor :GreenTeaGenerator) :void {
			Visitor.VisitThrowNode(this);
		}
	}
	
	class TryNode extends TypedNode {
		TryBlock :TypedNode;
		CatchBlock :TypedNode;
		FinallyBlock :TypedNode;
		constructor(Type :GtType, Token :GtToken, TryBlock :TypedNode, FinallyBlock :TypedNode) {
			super(Type, Token);
			this.TryBlock = TryBlock;
			this.FinallyBlock = FinallyBlock;
			this.CatchBlock = null;
		}
		Evaluate(Visitor :GreenTeaGenerator) :void {
			Visitor.VisitTryNode(this);
		}
	}
	
	class SwitchNode extends TypedNode {
		constructor(Type :GtType, Token :GtToken) {
			super(Type, Token);
		}
		Evaluate(Visitor :GreenTeaGenerator) :void {
			Visitor.VisitSwitchNode(this);
		}
	}
	
	class DefineNode extends TypedNode {
		DefInfo :GtDef;
		constructor(Type :GtType, Token :GtToken, DefInfo :GtDef) {
			super(Type, Token);
			this.DefInfo = DefInfo;
		}
		Evaluate(Visitor :GreenTeaGenerator) :void {
			Visitor.VisitDefineNode(this);
		}
	}
	
	class FunctionNode extends TypedNode {
		constructor(Type :GtType, Token :GtToken) {
			super(Type, Token); // TODO
		}
		Evaluate(Visitor :GreenTeaGenerator) :void {
			Visitor.VisitFunctionNode(this);
		}
	}
	
	class ErrorNode extends TypedNode {
		constructor(Type :GtType, Token :GtToken) {
			super(Type, Token);
		}
		Evaluate(Visitor :GreenTeaGenerator) :void {
			Visitor.VisitErrorNode(this);
		}
	}
	
	class GreenTeaGenerator {
			
		CreateConstNode(Type :GtType, ParsedTree :SyntaxTree, Value :Object) :TypedNode { 
			return new ConstNode(Type, ParsedTree.KeyToken, Value); 
		}
	
		CreateNewNode(Type :GtType, ParsedTree :SyntaxTree) :TypedNode { 
			return new NewNode(Type, ParsedTree.KeyToken); 
		}
	
		CreateNullNode(Type :GtType, ParsedTree :SyntaxTree) :TypedNode { 
			return new NewNode(Type, ParsedTree.KeyToken); 
		}
	
		CreateLocalNode(Type :GtType, ParsedTree :SyntaxTree) :TypedNode { 
			return new LocalNode(Type, ParsedTree.KeyToken);
		}
	
		CreateGetterNode(Type :GtType, ParsedTree :SyntaxTree, Expr :TypedNode) :TypedNode { 
			return new GetterNode(Type, ParsedTree.KeyToken, Expr, null);
		}
	
		CreateApplyNode(Type :GtType, ParsedTree :SyntaxTree, Func :TypedNode) :TypedNode { 
			return new ApplyNode(Type, ParsedTree.KeyToken, null, Func);
		}
	
		CreateAndNode(Type :GtType, ParsedTree :SyntaxTree, Left :TypedNode, Right :TypedNode) :TypedNode { 
			return new AndNode(Type, ParsedTree.KeyToken, Left, Right);
		}
	
		CreateOrNode(Type :GtType, ParsedTree :SyntaxTree, Left :TypedNode, Right :TypedNode) :TypedNode { 
			return new OrNode(Type, ParsedTree.KeyToken, Left, Right);
		}
	
		CreateAssignNode(Type :GtType, ParsedTree :SyntaxTree, Left :TypedNode, Right :TypedNode) :TypedNode { 
			return new AssignNode(Type, ParsedTree.KeyToken, Left, Right);
		}
	
		CreateLetNode(Type :GtType, ParsedTree :SyntaxTree, Left :TypedNode, Right :TypedNode, Block :TypedNode) :TypedNode { 
			return new LetNode(Type, ParsedTree.KeyToken, Right, Block);
		}
		
		CreateIfNode(Type :GtType, ParsedTree :SyntaxTree, Cond :TypedNode, Then :TypedNode, Else :TypedNode) :TypedNode { 
			return new IfNode(Type, ParsedTree.KeyToken, Cond, Then, Else);
		}
		
		CreateSwitchNode(Type :GtType, ParsedTree :SyntaxTree, Match :TypedNode) :TypedNode { 
			return null; 
		}
	
		CreateLoopNode(Type :GtType, ParsedTree :SyntaxTree, Cond :TypedNode, Block :TypedNode, IterNode :TypedNode) :TypedNode { 
			return new LoopNode(Type, ParsedTree.KeyToken, Cond, Block, IterNode);
		}
	
		CreateReturnNode(Type :GtType, ParsedTree :SyntaxTree, Node :TypedNode) :TypedNode { 
			return new ReturnNode(Type, ParsedTree.KeyToken, Node);
		}
	
		CreateLabelNode(Type :GtType, ParsedTree :SyntaxTree, Node :TypedNode) :TypedNode { 
			return null; 
		}
	
		CreateJumpNode(Type :GtType, ParsedTree :SyntaxTree, Node :TypedNode, Label :string) :TypedNode { 
			return new JumpNode(Type, ParsedTree.KeyToken, Label); 
		}
	
		CreateBreakNode(Type :GtType, ParsedTree :SyntaxTree, Node :TypedNode, Label :string) :TypedNode { 
			return new BreakNode(Type, ParsedTree.KeyToken, Label); 
		}
	
		CreateContinueNode(Type :GtType, ParsedTree :SyntaxTree, Node :TypedNode, Label :string) :TypedNode { 
			return new ContinueNode(Type, ParsedTree.KeyToken, Label); 
		}
		
		CreateTryNode(Type :GtType, ParsedTree :SyntaxTree, TryNode :TypedNode, FinallyNode :TypedNode) :TypedNode { 
			return new TryNode(Type, ParsedTree.KeyToken, TryNode, FinallyNode); 
		}
	
		CreateThrowNode(Type :GtType, ParsedTree :SyntaxTree, Node :TypedNode) :TypedNode { 
			return new ThrowNode(Type, ParsedTree.KeyToken, Node); 
		}
	
		CreateFunctionNode(Type :GtType, ParsedTree :SyntaxTree, Block :TypedNode) :TypedNode { 
			return null; 
		}
	
		CreateDefineNode(Type :GtType, ParsedTree :SyntaxTree, Module :Object) :TypedNode { 
			return null; 
		}
	
		CreateErrorNode(Type :GtType, ParsedTree :SyntaxTree) :TypedNode { 
			return new ErrorNode(Type, ParsedTree.KeyToken);
		}
	
	
		VisitDefineNode(Node :DefineNode) :void { 
		}
	
		VisitConstNode(Node :ConstNode) :void { 
		}
	
		VisitNewNode(Node :NewNode) :void { 
		}
	
		VisitNullNode(Node :NullNode) :void { 
		}
	
		VisitLocalNode(Node :LocalNode) :void { 
		}
	
		VisitGetterNode(Node :GetterNode) :void { 
		}
	
		VisitApplyNode(Node :ApplyNode) :void { 
		}
	
		VisitBinaryNode(Node :BinaryNode) :void { 
		}
	
		VisitAndNode(Node :AndNode) :void { 
		}
	
		VisitOrNode(Node :OrNode) :void { 
		}
	
		VisitAssignNode(Node :AssignNode) :void { 
		}
	
		VisitLetNode(Node :LetNode) :void { 
		}
	
		VisitIfNode(Node :IfNode) :void { 
		}
	
		VisitSwitchNode(Node :SwitchNode) :void { 
		}
	
		VisitLoopNode(Node :LoopNode) :void { 
		}
	
		VisitReturnNode(Node :ReturnNode) :void { 
		}
	
		VisitLabelNode(Node :LabelNode) :void { 
		}
	
		VisitJumpNode(Node :JumpNode) :void { 
		}
	
		VisitBreakNode(Node :BreakNode) :void { 
		}
		
		VisitContinueNode(Node :ContinueNode) :void { 
		}
	
		VisitTryNode(Node :TryNode) :void { 
		}
	
		VisitThrowNode(Node :ThrowNode) :void { 
		}
	
		VisitFunctionNode(Node :FunctionNode) :void { 
		}
	
		VisitErrorNode(Node :ErrorNode) :void { 
		}
	
		VisitBlock(Node :TypedNode) :void {
			var CurrentNode :TypedNode = Node;
			while(CurrentNode != null) {
				CurrentNode.Evaluate(this);
				CurrentNode = CurrentNode.NextNode;
			}
		}	
	
		// must :This be extended in each language
		Eval(Node :TypedNode) :Object {
			VisitBlock(Node);
			return null;
		}
	
	}
	
}
