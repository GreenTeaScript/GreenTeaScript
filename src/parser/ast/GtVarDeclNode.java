package parser.ast;

import parser.GtGenerator;
import parser.GtToken;
import parser.GtType;

/**
 * int a = 1;
 * String s ; 
 */

final public class GtVarDeclNode extends GtNode {
	/*field*/public GtType	DeclType;
	/*field*/public String  NativeName;
	/*field*/public GtNode	InitNode;
	/*field*/public GtNode	BlockNode;
	/* let VarNode in Block end */
	public GtVarDeclNode/*constructor*/(GtType Type, GtToken Token, GtType DeclType, String VariableName, GtNode InitNode, GtNode Block) {
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