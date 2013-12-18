package parser.ast;

import parser.GtGenerator;
import parser.GtToken;
import parser.GtType;

final public class GtDoWhileNode extends GtNode {
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