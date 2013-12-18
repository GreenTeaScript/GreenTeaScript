package parser.ast;

import parser.GtFunc;
import parser.GtToken;
import parser.GtType;

abstract public class GtSymbolNode extends GtNode {
	/*field*/public String  NativeName;
	/*field*/public GtFunc	ResolvedFunc;    // 
	GtSymbolNode/*constructor*/(GtType Type, GtToken Token, String NativeName) {
		super(Type, Token);
		this.NativeName = NativeName;
		this.ResolvedFunc = null;
	}
}