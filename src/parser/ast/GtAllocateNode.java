package parser.ast;

import parser.GtGenerator;
import parser.GtParserContext;
import parser.GtToken;
import parser.GtType;

// E.g., AllocateNode (without parameters); StaticApply is needed to init
final public class GtAllocateNode extends GtNode {
	public GtAllocateNode/*constructor*/(GtType Type, GtToken Token) {
		super(Type, Token);
	}
	@Override public void Accept(GtGenerator Visitor) {
		Visitor.VisitAllocateNode(this);
	}
	@Override public Object ToConstValue(GtParserContext Context, boolean EnforceConst)  {
		return Context.Generator.EvalAllocateNode(this, EnforceConst);
	}	
}