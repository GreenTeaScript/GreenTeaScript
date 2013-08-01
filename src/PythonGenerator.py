class TypedNode :
	# ParentNode
	# PrevNode
	# NextNode

	# Type
	# Token

	def __init__(self, Type, Token):
		self.Type = Type
		self.Token = Token
		self.ParentNode = None
		self.PrevNode = None
		self.NextNode = None
	#

	def LinkNode(self, Node):
		Node.PrevNode = self
		self.NextNode = Node
	#

	def GetHeadNode(self) :
		Node = self
		while(Node.PrevNode != None):
			Node = Node.PrevNode
		#
		return Node
	#

	def GetTailNode(self) :
		Node = self
		while(Node.NextNode != None):
			Node = Node.NextNode
		#
		return self
	#

	def Evaluate(self, Visitor):
		pass
	#

	def IsError(self) :
		return (type(self) == ErrorNode)
	#

#

class UnaryNode (TypedNode):
	# Expr
	def __init__(self, Type, Token, Expr):
		super(Type, Token)
		self.Expr = Expr
	#
#

class BinaryNode (TypedNode):
	# LeftNode
	# RightNode
	def __init__(self, Type, Token, Left, Right):
		super(Type, Token)
		self.LeftNode = Left
		self.RightNode = Right
	#
	def Evaluate(self, Visitor):
		Visitor.VisitBinaryNode(self)
	#
#

class AndNode (BinaryNode):
	def __init__(self, Type, Token, Left, Right):
		super(Type, Token, Left, Right)
	#
	def Evaluate(self, Visitor):
		Visitor.VisitAndNode(self)
	#
#

class OrNode (BinaryNode):
	def __init__(self, Type, Token, Left, Right):
		super(Type, Token, Left, Right)
	#
	def Evaluate(self, Visitor):
		Visitor.VisitOrNode(self)
	#
#

class GetterNode (TypedNode):
	# Expr
	# Method
	def __init__(self, Type, Token, Expr, Method):
		super(Type, Token)
		self.Expr = Expr
		self.Method = Method
	#
	def Evaluate(self, Visitor):
		Visitor.VisitGetterNode(self)
	#
#

class AssignNode (BinaryNode):
	def __init__(self, Type, Token, Left, Right):
		super(Type, Token, Left, Right)
	#
	def Evaluate(self, Visitor):
		Visitor.VisitAssignNode(self)
	#
#

class ConstNode (TypedNode):
	# ConstValue
	def __init__(self, Type, Token, ConstValue):
		super(Type, Token)
		self.ConstValue = ConstValue
	#
	def Evaluate(self, Visitor):
		Visitor.VisitConstNode(self)
	#
#

class LocalNode (TypedNode):
	def __init__(self, Type, Token):
		super(Type, Token)
	#
	def Evaluate(self, Visitor):
		Visitor.VisitLocalNode(self)
	#
#

class NullNode (TypedNode):
	def __init__(self, Type, Token):
		super(Type, Token)
	#
	def Evaluate(self, Visitor):
		Visitor.VisitNullNode(self)
	#
#

class LetNode (TypedNode):
	# VarToken
	# ValueNode
	# BlockNode

	
	def __init__(self, Type, VarToken, Right, Block):
		super(Type, VarToken)
		self.VarToken = VarToken
		self.ValueNode = Right
		self.BlockNode = Block
	#
	def Evaluate(self, Visitor):
		Visitor.VisitLetNode(self)
	#
#

class ApplyNode (TypedNode):
	# Method
	# Params; 

	def __init__(self, Type, KeyToken, Method, arg1):
		super(Type, KeyToken)
		self.Method = Method
		self.Params = []
		self.Params.push(arg1)
	#
	
	def Append(self, Expr):
		self.Params.push(Expr)
	#

	def Evaluate(self, Visitor):
		Visitor.VisitApplyNode(self)
	#
#

class NewNode (TypedNode):
	# Params; 

	def __init__(self, Type, Token):
		super(Type, Token)
		self.Params = []
	#

	def Append(self, Expr):
		self.Params.push(Expr)
	#

	def Evaluate(self, Visitor):
		Visitor.VisitNewNode(self)
	#
#

class IfNode (TypedNode):
	# CondExpr
	# ThenNode
	# ElseNode

	
	def __init__(self, Type, Token, CondExpr, ThenBlock, ElseNode):
		super(Type, Token)
		self.CondExpr = CondExpr
		self.ThenNode = ThenBlock
		self.ElseNode = ElseNode
	#
	def Evaluate(self, Visitor):
		Visitor.VisitIfNode(self)
	#
#

class LoopNode (TypedNode):
	# CondExpr
	# LoopBody
	# IterExpr

	def __init__(self, Type, Token, CondExpr, LoopBody, IterExpr):
		super(Type, Token)
		self.CondExpr = CondExpr
		self.LoopBody = LoopBody
		self.IterExpr = IterExpr
	#
	def Evaluate(self, Visitor):
		Visitor.VisitLoopNode(self)
	#
#

class LabelNode (TypedNode):
	# Label
	def __init__(self, Type, Token, Label):
		super(Type, Token)
		self.Label = Label
	#
	def Evaluate(self, Visitor):
		Visitor.VisitLabelNode(self)
	#
#

class JumpNode (TypedNode):
	# Label
	def __init__(self, Type, Token, Label):
		super(Type, Token)
		self.Label = Label
	#
	def Evaluate(self, Visitor):
		Visitor.VisitJumpNode(self)
	#
#
class ContinueNode (TypedNode):
	# Label
	def __init__(self, Type, Token, Label):
		super(Type, Token)
		self.Label = Label
	#
	def Evaluate(self, Visitor):
		Visitor.VisitContinueNode(self)
	#
#
class BreakNode (TypedNode):
	# Label
	def __init__(self, Type, Token, Label):
		super(Type, Token)
		self.Label = Label
	#
	def Evaluate(self, Visitor):
		Visitor.VisitBreakNode(self)
	#
#

class ReturnNode (UnaryNode):
	def __init__(self, Type, Token, Expr):
		super(Type, Token, Expr)
	#
	def Evaluate(self, Visitor):
		Visitor.VisitReturnNode(self)
	#
#

class ThrowNode (UnaryNode):
	def __init__(self, Type, Token, Expr):
		super(Type, Token, Expr)
	#
	def Evaluate(self, Visitor):
		Visitor.VisitThrowNode(self)
	#
#

class TryNode (TypedNode):
	TryBlock
	CatchBlock
	FinallyBlock
	def __init__(self, Type, Token, TryBlock, FinallyBlock):
		super(Type, Token)
		self.TryBlock = TryBlock
		self.FinallyBlock = FinallyBlock
		self.CatchBlock = None
	#
	def Evaluate(self, Visitor):
		Visitor.VisitTryNode(self)
	#
#

class SwitchNode (TypedNode):
	def __init__(self, Type, Token):
		super(Type, Token)
	#
	def Evaluate(self, Visitor):
		Visitor.VisitSwitchNode(self)
	#
#

class DefineNode (TypedNode):
	DefInfo
	def __init__(self, Type, Token, DefInfo):
		super(Type, Token)
		self.DefInfo = DefInfo
	#
	def Evaluate(self, Visitor):
		Visitor.VisitDefineNode(self)
	#
#

class FunctionNode (TypedNode):
	def __init__(self, Type, Token):
		super(Type, Token); #  TODO
	#
	def Evaluate(self, Visitor):
		Visitor.VisitFunctionNode(self)
	#
#

class ErrorNode (TypedNode):
	def __init__(self, Type, Token):
		super(Type, Token)
	#
	def Evaluate(self, Visitor):
		Visitor.VisitErrorNode(self)
	#
#

class GreenTeaGenerator :
		
	def CreateConstNode(self, Type, ParsedTree, Value): 
		return ConstNode(Type, ParsedTree.KeyToken, Value); 
	#

	def CreateNewNode(self, Type, ParsedTree): 
		return NewNode(Type, ParsedTree.KeyToken); 
	#

	def CreateNullNode(self, Type, ParsedTree): 
		return NewNode(Type, ParsedTree.KeyToken); 
	#

	def CreateLocalNode(self, Type, ParsedTree): 
		return LocalNode(Type, ParsedTree.KeyToken)
	#

	def CreateGetterNode(self, Type, ParsedTree, Expr): 
		return GetterNode(Type, ParsedTree.KeyToken, Expr, None)
	#

	def CreateApplyNode(self, Type, ParsedTree, Func): 
		return ApplyNode(Type, ParsedTree.KeyToken, None, Func)
	#

	def CreateAndNode(self, Type, ParsedTree, Left, Right): 
		return AndNode(Type, ParsedTree.KeyToken, Left, Right)
	#

	def CreateOrNode(self, Type, ParsedTree, Left, Right): 
		return OrNode(Type, ParsedTree.KeyToken, Left, Right)
	#

	def CreateAssignNode(self, Type, ParsedTree, Left, Right): 
		return AssignNode(Type, ParsedTree.KeyToken, Left, Right)
	#

	def CreateLetNode(self, Type, ParsedTree, Left, Right, Block): 
		return LetNode(Type, ParsedTree.KeyToken, Right, Block)
	#
	
	def CreateIfNode(self, Type, ParsedTree, Cond, Then, Else): 
		return IfNode(Type, ParsedTree.KeyToken, Cond, Then, Else)
	#
	
	def CreateSwitchNode(self, Type, ParsedTree, Match): 
		return None; 
	#

	def CreateLoopNode(self, Type, ParsedTree, Cond, Block, IterNode): 
		return LoopNode(Type, ParsedTree.KeyToken, Cond, Block, IterNode)
	#

	def CreateReturnNode(self, Type, ParsedTree, Node): 
		return ReturnNode(Type, ParsedTree.KeyToken, Node)
	#

	def CreateLabelNode(self, Type, ParsedTree, Node): 
		return None; 
	#

	def CreateJumpNode(self, Type, ParsedTree, Node, Label): 
		return JumpNode(Type, ParsedTree.KeyToken, Label); 
	#

	def CreateBreakNode(self, Type, ParsedTree, Node, Label): 
		return BreakNode(Type, ParsedTree.KeyToken, Label); 
	#

	def CreateContinueNode(self, Type, ParsedTree, Node, Label): 
		return ContinueNode(Type, ParsedTree.KeyToken, Label); 
	#
	
	def CreateTryNode(self, Type, ParsedTree, TryNode, FinallyNode): 
		return TryNode(Type, ParsedTree.KeyToken, TryNode, FinallyNode); 
	#

	def CreateThrowNode(self, Type, ParsedTree, Node): 
		return ThrowNode(Type, ParsedTree.KeyToken, Node); 
	#

	def CreateFunctionNode(self, Type, ParsedTree, Block): 
		return None; 
	#

	def CreateDefineNode(self, Type, ParsedTree, Module): 
		return None; 
	#

	def CreateErrorNode(self, Type, ParsedTree): 
		return ErrorNode(Type, ParsedTree.KeyToken)
	#

	def VisitDefineNode(self, Node): 
		pass
	#

	def VisitConstNode(self, Node): 
		pass
	#

	def VisitNewNode(self, Node): 
		pass
	#

	def VisitNullNode(self, Node): 
		pass
	#

	def VisitLocalNode(self, Node): 
		pass
	#

	def VisitGetterNode(self, Node): 
		pass
	#

	def VisitApplyNode(self, Node): 
		pass
	#

	def VisitBinaryNode(self, Node): 
		pass
	#

	def VisitAndNode(self, Node): 
		pass
	#

	def VisitOrNode(self, Node): 
		pass
	#

	def VisitAssignNode(self, Node): 
		pass
	#

	def VisitLetNode(self, Node): 
		pass
	#

	def VisitIfNode(self, Node): 
		pass
	#

	def VisitSwitchNode(self, Node): 
		pass
	#

	def VisitLoopNode(self, Node): 
		pass
	#

	def VisitReturnNode(self, Node): 
		pass
	#

	def VisitLabelNode(self, Node): 
		pass
	#

	def VisitJumpNode(self, Node): 
		pass
	#

	def VisitBreakNode(self, Node): 
		pass
	#
	
	def VisitContinueNode(self, Node): 
		pass
	#

	def VisitTryNode(self, Node): 
		pass
	#

	def VisitThrowNode(self, Node): 
		pass
	#

	def VisitFunctionNode(self, Node): 
		pass
	#

	def VisitErrorNode(self, Node): 
		pass
	#

	def VisitBlock(self, Node):
		CurrentNode = Node
		while(CurrentNode != None):
			CurrentNode.Evaluate(self)
			CurrentNode = CurrentNode.NextNode
		#
	#	

	# must be extended in each language
	def Eval(self, Node):
		VisitBlock(Node)
		return None
	#

#

