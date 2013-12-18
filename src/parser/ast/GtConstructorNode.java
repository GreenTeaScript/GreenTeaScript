package parser.ast;

import java.util.ArrayList;

import parser.GtFunc;
import parser.GtGenerator;
import parser.GtParserContext;
import parser.GtToken;
import parser.GtType;

// E.g., ConstructorNode is for object creation in Native language defined
final public class GtConstructorNode extends GtNode {
	/*field*/public ArrayList<GtNode>	ParamList;
	/*field*/public GtFunc Func;
	GtConstructorNode/*constructor*/(GtType Type, GtToken Token, GtFunc Func) {
		super(Type, Token);
		this.ParamList = new ArrayList<GtNode>();
		this.Func = Func;
	}
	@Override public final ArrayList<GtNode> GetList() {
		return this.ParamList;
	}
	@Override public void Accept(GtGenerator Visitor) {
		Visitor.VisitConstructorNode(this);
	}
	@Override public Object ToConstValue(GtParserContext Context, boolean EnforceConst)  {
		if(EnforceConst) {
			return Context.Generator.EvalConstructorNode(this, EnforceConst);
		}
		return null;
	}	
}