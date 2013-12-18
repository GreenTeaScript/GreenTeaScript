package parser.ast;

import parser.GtGenerator;
import parser.GtParserContext;
import parser.GtToken;
import parser.GtType;

final public class GtFloatNode extends GtConstNode {
	/*field*/public double	Value;
	GtFloatNode/*constructor*/(GtType Type, GtToken Token, double Value) {
		super(Type, Token);
		this.Value = Value;
	}
	@Override public void Accept(GtGenerator Visitor) {
		Visitor.VisitFloatNode(this);
	}
	@Override public Object ToConstValue(GtParserContext Context, boolean EnforceConst)  {
		return this.Value;
	}
}