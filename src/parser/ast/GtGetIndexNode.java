package parser.ast;

import parser.GtGenerator;
import parser.GtParserContext;
import parser.GtToken;
import parser.GtType;

//E.g., $Recv[$Index]
final public class GtGetIndexNode extends GtSymbolNode {
	/*field*/public GtNode  RecvNode;
	/*field*/public GtNode  IndexNode;
	GtGetIndexNode/*constructor*/(GtType Type, GtToken Token, GtNode RecvNode, GtNode IndexNode) {
		super(Type, Token, "[]");
		this.RecvNode = RecvNode;
		this.IndexNode = IndexNode;
		this.SetChild2(RecvNode, IndexNode);
	}
	@Override public void Accept(GtGenerator Visitor) {
		Visitor.VisitGetIndexNode(this);
	}
	@Override public Object ToConstValue(GtParserContext Context, boolean EnforceConst)  {
		//FIXME
		//return Context.Generator.EvalGetIndexNode(this, EnforceConst);
		return null;
	}
}