package parser.ast;

import parser.GtGenerator;
import parser.GtToken;
import parser.GtType;

//E.g., "for" "(" ";" $CondNode ";" $IterNode ")" $LoopNode
final public class GtForNode extends GtNode {
	/*field*/public GtNode	CondNode;
	/*field*/public GtNode	IterNode;
	/*field*/public GtNode	BodyNode;
	public GtForNode/*constructor*/(GtType Type, GtToken Token, GtNode CondNode, GtNode IterNode, GtNode BodyNode) {
		super(Type, Token);
		this.CondNode = CondNode;
		this.BodyNode = BodyNode;
		this.IterNode = IterNode;
		this.SetChild3(CondNode, BodyNode, IterNode);
	}
	@Override public void Accept(GtGenerator Visitor) {
		Visitor.VisitForNode(this);
	}
}