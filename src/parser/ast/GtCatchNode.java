package parser.ast;

import parser.GtGenerator;
import parser.GtToken;
import parser.GtType;

final public class GtCatchNode extends GtNode {
	/*field*/public GtType  ExceptionType;
	/*field*/public String  ExceptionName;
	/*field*/public GtNode	BodyNode;
	GtCatchNode/*constructor*/(GtType Type, GtToken Token, GtType ExceptionType, String Name, GtNode BodyNode) {
		super(Type, Token);
		this.ExceptionType = ExceptionType;
		this.ExceptionName = Name;
		this.BodyNode = BodyNode;
		this.SetChild(BodyNode);
	}
	@Override public void Accept(GtGenerator Visitor) {
		Visitor.VisitCatchNode(this);
	}
}