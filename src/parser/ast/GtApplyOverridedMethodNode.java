package parser.ast;

import java.util.ArrayList;

import parser.GtFunc;
import parser.GtGenerator;
import parser.GtNameSpace;
import parser.GtParserContext;
import parser.GtToken;
import parser.GtType;

final public class GtApplyOverridedMethodNode extends GtNode {
	/*field*/public GtNameSpace NameSpace;
	/*field*/public GtFunc Func;
	/*field*/public ArrayList<GtNode>  ParamList; /* [arg1, arg2, ...] */
	public GtApplyOverridedMethodNode/*constructor*/(GtType Type, GtToken Token, GtNameSpace NameSpace, GtFunc Func) {
		super(Type, Token);
		this.NameSpace = NameSpace.Minimum();
		this.Func = Func;
		this.ParamList = new ArrayList<GtNode>();
		throw new RuntimeException("FIXME: ApplyOverridedMethodNode is not finished");
	}
	@Override public final ArrayList<GtNode> GetList() {
		return this.ParamList;
	}
	@Override public void Accept(GtGenerator Visitor) {
		Visitor.VisitApplyOverridedMethodNode(this);
	}
	@Override public Object ToConstValue(GtParserContext Context, boolean EnforceConst)  {
		return Context.Generator.EvalApplyOverridedMethodNode(this, EnforceConst);
	}
}