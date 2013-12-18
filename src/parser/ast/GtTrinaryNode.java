package parser.ast;

import org.GreenTeaScript.LibGreenTea;

import parser.GtGenerator;
import parser.GtParserContext;
import parser.GtToken;
import parser.GtType;

//E.g., $CondNode "?" $ThenExpr ":" $ElseExpr
final public class GtTrinaryNode extends GtNode {
	/*field*/public GtNode	CondNode;
	/*field*/public GtNode	ThenNode;
	/*field*/public GtNode	ElseNode;
	GtTrinaryNode/*constructor*/(GtType Type, GtToken Token, GtNode CondNode, GtNode ThenNode, GtNode ElseNode) {
		super(Type, Token);
		this.CondNode = CondNode;
		this.ThenNode = ThenNode;
		this.ElseNode = ElseNode;
		this.SetChild3(CondNode, ThenNode, ElseNode);
	}
	@Override public void Accept(GtGenerator Visitor) {
		Visitor.VisitTrinaryNode(this);
	}
	@Override public Object ToConstValue(GtParserContext Context, boolean EnforceConst)  {
		/*local*/Object CondValue = this.CondNode.ToConstValue(Context, EnforceConst) ;
		if(CondValue instanceof Boolean) {
			if(LibGreenTea.booleanValue(CondValue)) {
				return this.ThenNode.ToConstValue(Context, EnforceConst);
			}
			else {
				return this.ElseNode.ToConstValue(Context, EnforceConst);
			}
		}
		return null;
	}
}