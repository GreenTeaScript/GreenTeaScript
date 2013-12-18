package parser.ast;

import parser.GtGenerator;
import parser.GtToken;
import parser.GtType;

final public class GtThrowNode extends GtNode {
	/*field*/public GtNode ValueNode;
	public GtThrowNode/*constructor*/(GtType Type, GtToken Token, GtNode ValueNode) {
		super(Type, Token);
		this.ValueNode = ValueNode;
	}
	@Override public void Accept(GtGenerator Visitor) {
		Visitor.VisitThrowNode(this);
	}
}