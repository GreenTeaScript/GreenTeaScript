package parser.ast;

import java.util.ArrayList;

import parser.GtGenerator;
import parser.GtToken;
import parser.GtType;

final public class GtSwitchNode extends GtNode {
	/*field*/public GtNode	MatchNode;
	/*field*/public GtNode	DefaultBlock;
	/*field*/public ArrayList<GtNode> CaseList; // [expr, block, expr, block, ....]
	GtSwitchNode/*constructor*/(GtType Type, GtToken Token, GtNode MatchNode, GtNode DefaultBlock) {
		super(Type, Token);
		this.MatchNode = MatchNode;
		this.DefaultBlock = DefaultBlock;
		this.CaseList = new ArrayList<GtNode>();
		this.SetChild(DefaultBlock);
	}
	@Override public void Accept(GtGenerator Visitor) {
		Visitor.VisitSwitchNode(this);
	}
	@Override public final ArrayList<GtNode> GetList() {
		return this.CaseList;
	}
}