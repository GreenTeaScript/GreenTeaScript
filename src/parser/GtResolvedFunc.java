package parser;

import parser.ast.GtNode;

public class GtResolvedFunc {
	/*field*/public GtNameSpace GenericNameSpace;
	/*field*/public GtFunc Func;
	/*field*/public GtType ReturnType;
	/*field*/public GtNode ErrorNode;
	GtResolvedFunc/*constructor*/(GtNameSpace NameSpace) {
		this.GenericNameSpace = NameSpace;
		this.Func = null;
		this.ReturnType = GtStaticTable.AnyType;
		this.ErrorNode = null;
	}	
	GtResolvedFunc UpdateFunc(GtFunc Func, GtNameSpace GenericNameSpace) {		
		this.Func = Func;
		if(Func != null) {
			this.ReturnType = Func.GetReturnType().RealType(GenericNameSpace, GtStaticTable.AnyType);
		}
		return this;
	}
}