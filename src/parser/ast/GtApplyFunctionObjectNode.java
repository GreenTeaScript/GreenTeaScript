package parser.ast;

import java.util.ArrayList;

import parser.GtGenerator;
import parser.GtParserContext;
import parser.GtToken;
import parser.GtType;

//E.g., $FuncNode "(" $Param[0], $Param[1], ... ")"
final public class GtApplyFunctionObjectNode extends GtNode {
	/*field*/public GtNode	FuncNode;
	/*field*/public ArrayList<GtNode>  ParamList; /* [arg0, arg1, ...] */
	GtApplyFunctionObjectNode/*constructor*/(GtType Type, GtToken Token, GtNode FuncNode) {
		super(Type, Token);
		this.FuncNode = FuncNode;
		this.ParamList = new ArrayList<GtNode>();
		this.SetChild(FuncNode);
	}
	@Override public final ArrayList<GtNode> GetList() {
		return this.ParamList;
	}
	@Override public void Accept(GtGenerator Visitor) {
		Visitor.VisitApplyFunctionObjectNode(this);
	}
	@Override public Object ToConstValue(GtParserContext Context, boolean EnforceConst)  {
		return Context.Generator.EvalApplyFuncionObjectNode(this, EnforceConst);
	}
}