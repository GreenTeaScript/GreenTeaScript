package parser.ast;

import parser.GtGenerator;
import parser.GtToken;
import parser.GtType;

//E.g., "while" "(" $Cond ")" $Body
final public class GtWhileNode extends GtNode {
	/*field*/public GtNode	CondNode;
	/*field*/public GtNode	BodyNode;
	public GtWhileNode/*constructor*/(GtType Type, GtToken Token, GtNode CondNode, GtNode BodyNode) {
		super(Type, Token);
		this.CondNode = CondNode;
		this.BodyNode = BodyNode;
		this.SetChild2(CondNode, BodyNode);
	}
	@Override public void Accept(GtGenerator Visitor) {
		Visitor.VisitWhileNode(this);
	}
}