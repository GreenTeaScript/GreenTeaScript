package parser.ast;

import parser.GtGenerator;
import parser.GtToken;
import parser.GtType;

//E.g., $NativeName
final public class GtGetCapturedNode extends GtSymbolNode {
	public GtGetCapturedNode/*constructor*/(GtType Type, GtToken Token, String NativeName) {
		super(Type, Token, NativeName);
	}
	@Override public void Accept(GtGenerator Visitor) {
		Visitor.VisitGetCapturedNode(this);
	}
}