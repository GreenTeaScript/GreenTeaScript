package parser.ast;

import parser.GtGenerator;
import parser.GtToken;
import parser.GtType;

final public class GtContinueNode extends GtNode {
	/*field*/public String Label;
	GtContinueNode/*constructor*/(GtType Type, GtToken Token, String Label) {
		super(Type, Token);
		this.Label = Label;
	}
	@Override public void Accept(GtGenerator Visitor) {
		Visitor.VisitContinueNode(this);
	}
}