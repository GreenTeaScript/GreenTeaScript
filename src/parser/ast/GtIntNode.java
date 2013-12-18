package parser.ast;

import parser.GtGenerator;
import parser.GtParserContext;
import parser.GtToken;
import parser.GtType;

final public class GtIntNode extends GtConstNode {
	/*field*/public long	Value;
	GtIntNode/*constructor*/(GtType Type, GtToken Token, long Value) {
		super(Type, Token);
		this.Value = Value;
	}
	@Override public void Accept(GtGenerator Visitor) {
		Visitor.VisitIntNode(this);
	}
	@Override public Object ToConstValue(GtParserContext Context, boolean EnforceConst)  {
		return this.Value;
	}
}