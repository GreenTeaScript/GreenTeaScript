package parser.ast;

import org.GreenTeaScript.LibGreenTea;

import parser.GtGenerator;
import parser.GtParserContext;
import parser.GtToken;
import parser.GtType;

//E.g., $ExprNode instanceof TypeInfo
final public class GtInstanceOfNode extends GtNode {
	/*field*/public GtNode   ExprNode;
	/*field*/public GtType	 TypeInfo;
	public GtInstanceOfNode/*constructor*/(GtType Type, GtToken Token, GtNode ExprNode, GtType TypeInfo) {
		super(Type, Token);
		this.ExprNode = ExprNode;
		this.TypeInfo = TypeInfo;
		this.SetChild(ExprNode);
	}
	@Override public void Accept(GtGenerator Visitor) {
		Visitor.VisitInstanceOfNode(this);
	}
	@Override public Object ToConstValue(GtParserContext Context, boolean EnforceConst)  {
		/*local*/Object Value = this.ExprNode.ToConstValue(Context, EnforceConst) ;
		if(Value != null) {
			return LibGreenTea.DynamicInstanceOf(Value, this.TypeInfo);
		}
		return Value;
	}
}