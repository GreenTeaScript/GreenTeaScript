package parser.ast;

import parser.GtGenerator;
import parser.GtToken;
import parser.GtType;

final public class GtYieldNode extends GtNode {
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