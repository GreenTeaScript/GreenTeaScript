package parser.ast;

import parser.GtGenerator;
import parser.GtToken;
import parser.GtType;

// E.g., $NativeName
final public class GtGetLocalNode extends GtSymbolNode {
	public GtGetLocalNode/*constructor*/(GtType Type, GtToken Token, String NativeName) {
		super(Type, Token, NativeName);
	}
	@Override public void Accept(GtGenerator Visitor) {
		Visitor.VisitGetLocalNode(this);
	}
}