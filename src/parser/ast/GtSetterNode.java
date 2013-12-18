package parser.ast;

import parser.GtGenerator;
import parser.GtParserContext;
import parser.GtToken;
import parser.GtType;

//E.g., $RecvNode.$NativeName = $Value
final public class GtSetterNode extends GtSymbolNode {
	/*field*/public GtNode  RecvNode;
	/*field*/public GtNode  ValueNode;
	GtSetterNode/*constructor*/(GtType Type, GtToken Token, GtNode RecvNode, String NativeName, GtNode ValueNode) {
		super(Type, Token, NativeName);
		this.RecvNode  = RecvNode;
		this.ValueNode = ValueNode;
		this.SetChild2(RecvNode, ValueNode);
	}
	@Override public void Accept(GtGenerator Visitor) {
		Visitor.VisitSetterNode(this);
	}
	@Override public Object ToConstValue(GtParserContext Context, boolean EnforceConst)  {
		return Context.Generator.EvalSetterNode(this, EnforceConst);
	}
}