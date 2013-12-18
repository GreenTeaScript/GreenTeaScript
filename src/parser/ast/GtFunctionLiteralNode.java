package parser.ast;

import java.util.ArrayList;

import parser.GtGenerator;
import parser.GtToken;
import parser.GtType;

final public class GtFunctionLiteralNode extends GtNode {

/* E.g., function(argument, ..) $Body */
/* int x; // captured variable 
 * f = function(a, b) {
 * 	  return x + a + b;
 * }
 * ArgumentList = List of ParamNode
 * BodyNode
 */
	/*field*/public ArrayList<GtNode>  ArgumentList;  // list of ParamNode 
	/*field*/public GtNode BodyNode;
	GtFunctionLiteralNode/*constructor*/(GtType Type, GtToken Token, GtNode BodyNode) {
		super(Type, Token); // TODO
		this.ArgumentList = new ArrayList<GtNode>();
		this.BodyNode = BodyNode;
		this.SetChild(BodyNode);
	}
	@Override public ArrayList<GtNode> GetList() {
		return this.ArgumentList;
	}
	@Override public void Accept(GtGenerator Visitor) {
		Visitor.VisitFunctionLiteralNode(this);
	}
}