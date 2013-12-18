package parser.ast;

import parser.GtGenerator;
import parser.GtToken;
import parser.GtType;

final public class GtStatementNode extends GtNode {
	/**
	 * int f(int n);
	 * f(1)
	 */
	/*field*/public GtNode ValueNode;
	GtStatementNode/*constructor*/(GtType Type, GtToken Token, GtNode ValueNode) {
		super(Type, Token);
		this.ValueNode = ValueNode;
		this.SetChild(ValueNode);
	}
	@Override public void Accept(GtGenerator Visitor) {
		Visitor.VisitStatementNode(this);
	}
}