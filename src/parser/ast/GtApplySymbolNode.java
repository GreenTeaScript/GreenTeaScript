package parser.ast;

import java.util.ArrayList;

import parser.GtGenerator;
import parser.GtParserContext;
import parser.GtToken;
import parser.GtType;

//E.g., $NativeFuncName "(" $Param[0], $Param[1], ... ")"
final public class GtApplySymbolNode extends GtSymbolNode {
	/*field*/public ArrayList<GtNode>  ParamList; /* [arg1, arg2, ...] */
	GtApplySymbolNode/*constructor*/(GtType Type, GtToken Token, String NativeFuncName) {
		super(Type, Token, NativeFuncName);
		this.ParamList = new ArrayList<GtNode>();
	}
	@Override public final ArrayList<GtNode> GetList() {
		return this.ParamList;
	}
	@Override public void Accept(GtGenerator Visitor) {
		Visitor.VisitApplySymbolNode(this);
	}
	@Override public Object ToConstValue(GtParserContext Context, boolean EnforceConst)  {
		return Context.Generator.EvalApplySymbolNode(this, EnforceConst);
	}
}