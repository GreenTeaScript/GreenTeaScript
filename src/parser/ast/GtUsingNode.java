package parser.ast;

import parser.GtGenerator;
import parser.GtToken;
import parser.GtType;

/**
 * using(File f = new File() {
 * 	f.read();
 * }
 * try-catch is needed
 */
final public class GtUsingNode extends GtNode {
	/*field*/public GtType	DeclType;
	/*field*/public String  NativeName;
	/*field*/public GtNode	InitNode;
	/*field*/public GtNode	BlockNode;   // release resource of NativeName after BlockNode 
	/* let VarNode in Block end */
	public GtUsingNode/*constructor*/(GtType Type, GtToken Token, GtType DeclType, String VariableName, GtNode InitNode, GtNode Block) {
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