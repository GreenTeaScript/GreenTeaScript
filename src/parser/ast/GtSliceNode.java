package parser.ast;

import parser.GtGenerator;
import parser.GtToken;
import parser.GtType;

//E.g., $Expr "[" $Index ":" $Index2 "]"
final public class GtSliceNode extends GtSymbolNode {
	/*field*/public GtNode RecvNode;
	/*field*/public GtNode Index1;
	/*field*/public GtNode Index2;
	public GtSliceNode/*constructor*/(GtType Type, GtToken Token, GtNode RecvNode, GtNode Index1, GtNode Index2) {
		super(Type, Token, "");
		this.RecvNode = RecvNode;
		this.Index1 = Index1;
		this.Index2 = Index2;
		this.SetChild3(RecvNode, Index1, Index2);
	}
	@Override public void Accept(GtGenerator Visitor) {
		Visitor.VisitSliceNode(this);
	}
}