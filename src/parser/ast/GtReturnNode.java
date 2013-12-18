package parser.ast;

import parser.GtGenerator;
import parser.GtToken;
import parser.GtType;

final public class GtReturnNode extends GtNode {
	/*field*/public GtNode ValueNode;
	GtReturnNode/*constructor*/(GtType Type, GtToken Token, GtNode ValueNode) {
		super(Type, Token);
		this.ValueNode = ValueNode;
		this.SetChild(ValueNode);
	}
	@Override public void Accept(GtGenerator Visitor) {
		Visitor.VisitReturnNode(this);
	}
}