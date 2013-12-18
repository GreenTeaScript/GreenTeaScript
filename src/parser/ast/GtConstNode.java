package parser.ast;

import parser.GtToken;
import parser.GtType;

abstract public class GtConstNode extends GtNode {
	GtConstNode/*constructor*/(GtType Type, GtToken Token) {
		super(Type, Token);
	}
}