package parser.ast;

import parser.GtGenerator;
import parser.GtToken;
import parser.GtType;

//E.g.,  "--" $RecvNode
final public class GtPrefixDeclNode extends GtNode {
	/*field*/public GtNode	RecvNode;
	public GtPrefixDeclNode/*constructor*/(GtType Type, GtToken Token, GtNode RecvNode) {
		super(Type, Token);
		this.RecvNode = RecvNode;
		this.SetChild(RecvNode);
	}
	@Override public void Accept(GtGenerator Visitor) {
		Visitor.VisitPrefixDeclNode(this);
	}
}