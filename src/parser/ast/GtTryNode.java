package parser.ast;

import java.util.ArrayList;

import parser.GtGenerator;
import parser.GtToken;
import parser.GtType;

final public class GtTryNode extends GtNode {
	/*field*/public GtNode	TryNode;
	/*field*/public ArrayList<GtNode> 	CatchList;
	/*field*/public GtNode	FinallyNode;
	GtTryNode/*constructor*/(GtType Type, GtToken Token, GtNode TryBlock, GtNode FinallyBlock) {
		super(Type, Token);
		this.TryNode = TryBlock;
		this.FinallyNode = FinallyBlock;
		this.CatchList = new ArrayList<GtNode>();
		this.SetChild2(TryBlock, FinallyBlock);
	}
	@Override public ArrayList<GtNode> GetList() {
		return this.CatchList;
	}
	@Override public void Accept(GtGenerator Visitor) {
		Visitor.VisitTryNode(this);
	}
}