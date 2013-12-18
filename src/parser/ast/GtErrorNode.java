package parser.ast;

import parser.GtGenerator;
import parser.GtParserContext;
import parser.GtToken;
import parser.GtType;

/**
 * ErrorNode carries error information at the parser level
 * Token.ParsedText has error message  
 */

final public class GtErrorNode extends GtNode {
	public GtErrorNode/*constructor*/(GtType Type, GtToken Token) {
		super(Type, Token);
	}
	@Override public void Accept(GtGenerator Visitor) {
		Visitor.VisitErrorNode(this);
	}
	@Override public Object ToConstValue(GtParserContext Context, boolean EnforceConst)  {
		return null;
	}
}