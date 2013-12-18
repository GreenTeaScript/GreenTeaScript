package parser.ast;

import parser.GtParserContext;
import parser.GtToken;
import parser.GtType;

final public class GtEmptyNode extends GtConstNode {
	public GtEmptyNode/*constructor*/(GtType Type, GtToken Token) {
		super(Type, Token);
	}
	@Override public Object ToConstValue(GtParserContext Context, boolean EnforceConst)  {
		return null;
	}
}