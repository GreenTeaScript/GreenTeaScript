package parser.ast;

import parser.GtGenerator;
import parser.GtParserContext;
import parser.GtToken;
import parser.GtType;

//E.g., $RecvNode.$NativeName
final public class GtGetterNode extends GtSymbolNode {
	/*field*/public GtNode  RecvNode;
	public GtGetterNode/*constructor*/(GtType Type, GtToken Token, GtNode RecvNode, String NativeName) {
		super(Type, Token, NativeName);
		this.RecvNode = RecvNode;
		this.SetChild(RecvNode);
	}
	@Override public void Accept(GtGenerator Visitor) {
		Visitor.VisitGetterNode(this);
	}
	@Override public Object ToConstValue(GtParserContext Context, boolean EnforceConst)  {
		return Context.Generator.EvalGetterNode(this, EnforceConst);
	}
}