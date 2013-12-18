package parser.ast;

import parser.GtGenerator;
import parser.GtParserContext;
import parser.GtToken;
import parser.GtType;

final public class GtBooleanNode extends GtConstNode {
	/*field*/public boolean	Value;
	GtBooleanNode/*constructor*/(GtType Type, GtToken Token, boolean Value) {
		super(Type, Token);
		this.Value = Value;
	}
	@Override public void Accept(GtGenerator Visitor) {
		Visitor.VisitBooleanNode(this);
	}
	@Override public Object ToConstValue(GtParserContext Context, boolean EnforceConst)  {
		return this.Value;
	}
}