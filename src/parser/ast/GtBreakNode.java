package parser.ast;

import parser.GtGenerator;
import parser.GtToken;
import parser.GtType;

final public class GtBreakNode extends GtNode {
	/*field*/public String Label;
	public GtBreakNode/*constructor*/(GtType Type, GtToken Token, String Label) {
		super(Type, Token);
		this.Label = Label;
	}
	@Override public void Accept(GtGenerator Visitor) {
		Visitor.VisitBreakNode(this);
	}
}