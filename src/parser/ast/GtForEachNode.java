package parser.ast;

import parser.GtGenerator;
import parser.GtToken;
import parser.GtType;

//E.g., "for" "(" $Variable "in" $IterNode ")" $BodyNode
final public class GtForEachNode extends GtNode {
	/*field*/public GtNode	Variable;
	/*field*/public GtNode	IterNode;
	/*field*/public GtNode	BodyNode;
	GtForEachNode/*constructor*/(GtType Type, GtToken Token, GtNode Variable, GtNode IterNode, GtNode BodyNode) {
		super(Type, Token);
		this.Variable = Variable;
		this.IterNode = IterNode;
		this.BodyNode = BodyNode;
		this.SetChild3(Variable, BodyNode, IterNode);
	}
	@Override public void Accept(GtGenerator Visitor) {
		Visitor.VisitForEachNode(this);
	}
}