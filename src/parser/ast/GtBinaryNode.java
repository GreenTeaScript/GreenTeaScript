package parser.ast;

import org.GreenTeaScript.LibGreenTea;

import parser.GtGenerator;
import parser.GtParserContext;
import parser.GtToken;
import parser.GtType;

//E.g., $LeftNode "+" $RightNode
final public class GtBinaryNode extends GtSymbolNode {
	/*field*/public GtNode    LeftNode;
	/*field*/public GtNode	  RightNode;
	GtBinaryNode/*constructor*/(GtType Type, GtToken Token, String OperatorName, GtNode Left, GtNode Right) {
		super(Type, Token, OperatorName);
		this.LeftNode  = Left;
		this.RightNode = Right;
		this.SetChild2(Left, Right);
	}
	@Override public void Accept(GtGenerator Visitor) {
		Visitor.VisitBinaryNode(this);
	}
	@Override public Object ToConstValue(GtParserContext Context, boolean EnforceConst)  {
		/*local*/Object LeftValue = this.LeftNode.ToConstValue(Context, EnforceConst) ;
		if(LeftValue != null) {
			/*local*/Object RightValue = this.RightNode.ToConstValue(Context, EnforceConst) ;
			if(RightValue != null) {
				return LibGreenTea.EvalBinary(this.Type, LeftValue, this.Token.ParsedText, RightValue);
			}
		}
		return null;
	}
}