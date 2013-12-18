package parser.ast;

import parser.GtGenerator;
import parser.GtParserContext;
import parser.GtToken;
import parser.GtType;

final public class GtStringNode extends GtConstNode {
	/*field*/public String	Value;
	GtStringNode/*constructor*/(GtType Type, GtToken Token, String Value) {
		super(Type, Token);
		this.Value = Value;
	}
	@Override public void Accept(GtGenerator Visitor) {
		Visitor.VisitStringNode(this);
	}
	@Override public Object ToConstValue(GtParserContext Context, boolean EnforceConst)  {
		return this.Value;
	}
}