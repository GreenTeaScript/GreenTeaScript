package parser.ast;

import parser.GtGenerator;
import parser.GtToken;
import parser.GtType;

//E.g., $NativeName = $RightNode
final public class GtSetCapturedNode extends GtSymbolNode {
	/*field*/public GtNode	 ValueNode;
	GtSetCapturedNode/*constructor*/(GtType Type, GtToken Token, String NativeName, GtNode ValueNode) {
		super(Type, Token, NativeName);
		this.ValueNode = ValueNode;
		this.SetChild(ValueNode);
	}
	@Override public void Accept(GtGenerator Visitor) {
		Visitor.VisitSetCapturedNode(this);
	}
}