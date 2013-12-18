package parser;

import java.util.ArrayList;

public class GtFuncBlock extends GreenTeaUtils {
	/*field*/public GtNameSpace       NameSpace;
	/*field*/public ArrayList<String> NameList;
	/*field*/public GtSyntaxTree FuncBlock;
	/*field*/public boolean IsVarArgument;
	/*field*/public ArrayList<GtType> TypeList;
	/*field*/public GtFunc DefinedFunc;

	public GtFuncBlock/*constructor*/(GtNameSpace NameSpace, ArrayList<GtType> TypeList) {
		this.NameSpace = NameSpace;
		this.TypeList = TypeList;
		this.NameList = new ArrayList<String>();
		this.FuncBlock = null;
		this.IsVarArgument = false;
		this.DefinedFunc = null;
	}

	public void SetThisIfInClass(GtType Type) {
		if(Type != null) {
			this.TypeList.add(Type);
			this.NameList.add(this.NameSpace.Context.Generator.GetRecvName());
		}
	}
	
	public void AddParameter(GtType Type, String Name) {
		this.TypeList.add(Type);
		if(Type.IsVarType()) {
			this.IsVarArgument = true;
		}
		this.NameList.add(Name);
	}
}