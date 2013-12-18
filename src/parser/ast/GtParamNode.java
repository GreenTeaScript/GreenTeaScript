package parser.ast;

import parser.GtToken;
import parser.GtType;

final public class GtParamNode extends GtNode {
	/*field*/public String  Name;
	/*field*/public GtNode  InitNode;  /* nullable*/
	public GtParamNode/*constructor*/(GtType Type, GtToken Token, String Name, GtNode InitNode) {
		super(Type, Token); // TODO
		this.Name = Name;
		this.InitNode = InitNode;
	}
}