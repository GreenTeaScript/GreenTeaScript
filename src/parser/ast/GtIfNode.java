package parser.ast;

import parser.GtGenerator;
import parser.GtToken;
import parser.GtType;

//E.g., "if" "(" $Cond ")" $ThenNode "else" $ElseNode
final public class GtIfNode extends GtNode {
	/*field*/public GtNode	CondNode;
	/*field*/public GtNode	ThenNode;
	/*field*/public GtNode	ElseNode;
	/* If CondNode then ThenBlock else ElseBlock */
	GtIfNode/*constructor*/(GtType Type, GtToken Token, GtNode CondNode, GtNode ThenNode, GtNode ElseNode) {
		super(Type, Token);
		this.CondNode = CondNode;
		this.ThenNode = ThenNode;
		this.ElseNode = ElseNode;
		this.SetChild3(CondNode, ThenNode, ElseNode);
	}
	@Override public void Accept(GtGenerator Visitor) {
		Visitor.VisitIfNode(this);
	}
}