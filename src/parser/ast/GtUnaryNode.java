package parser.ast;

import org.GreenTeaScript.LibGreenTea;

import parser.GtGenerator;
import parser.GtParserContext;
import parser.GtToken;
import parser.GtType;

//E.g., "~" $RecvNode
final public class GtUnaryNode extends GtSymbolNode {
	/*field*/public GtNode	RecvNode;
	GtUnaryNode/*constructor*/(GtType Type, GtToken Token, String OperatorName, GtNode RecvNode) {
		super(Type, Token, OperatorName);
		this.RecvNode = RecvNode;
		this.SetChild(RecvNode);
	}
	@Override public void Accept(GtGenerator Visitor) {
		Visitor.VisitUnaryNode(this);
	}
	@Override public Object ToConstValue(GtParserContext Context, boolean EnforceConst)  {
		/*local*/Object Value = this.RecvNode.ToConstValue(Context, EnforceConst) ;
		if(Value != null) {
			return LibGreenTea.EvalUnary(this.Type, this.Token.ParsedText, Value);
		}
		return Value;
	}	
}