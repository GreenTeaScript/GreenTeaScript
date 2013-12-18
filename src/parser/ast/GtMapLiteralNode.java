package parser.ast;

import java.util.ArrayList;

import parser.GtGenerator;
import parser.GtParserContext;
import parser.GtToken;
import parser.GtType;

//E.g., "{" StringNode, $Node, StringNode, $Node "}"
final public class GtMapLiteralNode extends GtNode {   // => ArrayLiteral
	/*field*/public ArrayList<GtNode>	NodeList;
	GtMapLiteralNode/*constructor*/(GtType Type, GtToken Token) {
		super(Type, Token);
		this.NodeList = new ArrayList<GtNode>();
	}
	@Override public ArrayList<GtNode> GetList() {
		return this.NodeList;
	}
	@Override public void Accept(GtGenerator Visitor) {
		Visitor.VisitMapLiteralNode(this);
	}
	@Override public Object ToConstValue(GtParserContext Context, boolean EnforceConst)  {
//		if(EnforceConst) {
//			return Context.Generator.EvalArrayNode(this, EnforceConst);
//		}
		return null;
	}
}