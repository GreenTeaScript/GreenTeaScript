package parser.ast;

import parser.GtGenerator;
import parser.GtParserContext;
import parser.GtToken;
import parser.GtType;

//E.g., $Recv[$Index] = $ValueNode
final public class GtSetIndexNode extends GtSymbolNode {
	/*field*/public GtNode  RecvNode;
	/*field*/public GtNode  IndexNode;
	/*field*/public GtNode  ValueNode;
	GtSetIndexNode/*constructor*/(GtType Type, GtToken Token, GtNode RecvNode, GtNode IndexNode, GtNode ValueNode) {
		super(Type, Token, "[]=");
		this.RecvNode  = RecvNode;
		this.IndexNode = IndexNode;
		this.ValueNode = ValueNode;
		this.SetChild3(RecvNode, IndexNode, ValueNode);
	}
	@Override public void Accept(GtGenerator Visitor) {
		Visitor.VisitSetIndexNode(this);
	}
	@Override public Object ToConstValue(GtParserContext Context, boolean EnforceConst)  {
		//FIXME
		//return Context.Generator.EvalSetIndexNode(this, EnforceConst);
		return null;
	}
}