package parser.ast;

import parser.GtGenerator;
import parser.GtParserContext;
import parser.GtToken;
import parser.GtType;

final public class GtConstPoolNode extends GtConstNode {
	/*field*/public Object	ConstValue;
	public GtConstPoolNode/*constructor*/(GtType Type, GtToken Token, Object ConstValue) {
		super(Type, Token);
		this.ConstValue = ConstValue;
	}
	@Override public void Accept(GtGenerator Visitor) {
		// int ConstPoolId = SetConstPool(ConstValue)
		// using StaticApplyNode => GetConstPool(ConstPoolId);
		Visitor.VisitConstPoolNode(this);
	}
	@Override public Object ToConstValue(GtParserContext Context, boolean EnforceConst)  {
		return this.ConstValue;
	}
}