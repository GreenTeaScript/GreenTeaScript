package parser.ast;

import java.util.ArrayList;

import parser.GtGenerator;
import parser.GtParserContext;
import parser.GtToken;
import parser.GtType;

// E.g., "ls" "-a"..
final public class GtCommandNode extends GtNode {
	/*field*/public ArrayList<GtNode>  ArgumentList; /* ["/bin/ls" , "-la", "/", ...] */
	/*field*/public GtNode PipedNextNode;
	GtCommandNode/*constructor*/(GtType Type, GtToken Token, GtNode PipedNextNode) {
		super(Type, Token);
		this.PipedNextNode = PipedNextNode;
		this.ArgumentList = new ArrayList<GtNode>();
	}
	@Override public final ArrayList<GtNode> GetList() {
		return this.ArgumentList;
	}

	@Override public void Accept(GtGenerator Visitor) {
		Visitor.VisitCommandNode(this);
	}

	@Override public Object ToConstValue(GtParserContext Context, boolean EnforceConst) {
		//FIXME: Exception
		return Context.Generator.EvalCommandNode(this, EnforceConst);
	}
}