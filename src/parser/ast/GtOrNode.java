package parser.ast;

import org.GreenTeaScript.LibGreenTea;

import parser.GtGenerator;
import parser.GtParserContext;
import parser.GtToken;
import parser.GtType;

//E.g., $LeftNode || $RightNode
final public class GtOrNode extends GtNode {
	/*field*/public GtNode   LeftNode;
	/*field*/public GtNode	 RightNode;
	GtOrNode/*constructor*/(GtType Type, GtToken Token, GtNode Left, GtNode Right) {
		super(Type, Token);
		this.LeftNode  = Left;
		this.RightNode = Right;
		this.SetChild2(Left, Right);
	}
	@Override public void Accept(GtGenerator Visitor) {
		Visitor.VisitOrNode(this);
	}
	@Override public Object ToConstValue(GtParserContext Context, boolean EnforceConst)  {
		/*local*/Object LeftValue = this.LeftNode.ToConstValue(Context, EnforceConst) ;
		if(LeftValue instanceof Boolean) {
			if(LibGreenTea.booleanValue(LeftValue)) {
				return LeftValue;
			}
			else {
				return this.RightNode.ToConstValue(Context, EnforceConst) ;
			}
		}
		return null;
	}
}