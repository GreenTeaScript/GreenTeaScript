package parser.ast;

import java.util.ArrayList;

import parser.GtGenerator;
import parser.GtParserContext;
import parser.GtToken;
import parser.GtType;

//E.g., new T "[" 10, [10] "]"
final public class GtNewArrayNode extends GtNode {
	/*field*/public ArrayList<GtNode>	NodeList;
	GtNewArrayNode/*constructor*/(GtType Type, GtToken Token) {
		super(Type, Token);
		this.NodeList = new ArrayList<GtNode>();
	}
	@Override public ArrayList<GtNode> GetList() {
		return this.NodeList;
	}
	@Override public void Accept(GtGenerator Visitor) {
		Visitor.VisitNewArrayNode(this);
	}
	@Override public Object ToConstValue(GtParserContext Context, boolean EnforceConst)  {
		if(EnforceConst) {
			return Context.Generator.EvalNewArrayNode(this, EnforceConst);
		}
		return null;
	}
}