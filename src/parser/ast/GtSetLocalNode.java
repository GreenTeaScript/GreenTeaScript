package parser.ast;

import parser.GtGenerator;
import parser.GtToken;
import parser.GtType;

// E.g., $NativeName = $ValueNode
final public class GtSetLocalNode extends GtSymbolNode {
	/*field*/public GtNode	 ValueNode;
	public GtSetLocalNode/*constructor*/(GtType Type, GtToken Token, String NativeName, GtNode ValueNode) {
		super(Type, Token, NativeName);
		this.ValueNode = ValueNode;
		this.SetChild(ValueNode);
	}
	@Override public void Accept(GtGenerator Visitor) {
		Visitor.VisitSetLocalNode(this);
	}
}