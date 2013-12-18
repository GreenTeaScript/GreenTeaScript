package parser.ast;

import parser.GtGenerator;
import parser.GtParserContext;
import parser.GtToken;
import parser.GtType;

final public class GtRegexNode extends GtConstNode {
	/*field*/public String	Value;
	public GtRegexNode/*constructor*/(GtType Type, GtToken Token, String Value) {
		super(Type, Token);
		this.Value = Value;
		throw new RuntimeException("FIXME: Regex object must be defined");
	}
	@Override public void Accept(GtGenerator Visitor) {
		Visitor.VisitRegexNode(this);
	}
	@Override public Object ToConstValue(GtParserContext Context, boolean EnforceConst)  {
		return this.Value;
	}
}