package parser.ast;

import parser.GtGenerator;
import parser.GtToken;
import parser.GtType;

final public class GtCaseNode extends GtNode {
	/*field*/public GtNode  CaseNode;;
	/*field*/public GtNode	BodyNode;
	public GtCaseNode/*constructor*/(GtType Type, GtToken Token, GtNode CaseNode, GtNode BodyNode) {
		super(Type, Token);
		this.CaseNode = CaseNode;
		this.BodyNode = BodyNode;
		this.SetChild2(BodyNode, CaseNode);
	}
	@Override public void Accept(GtGenerator Visitor) {
		Visitor.VisitCaseNode(this);
	}
}