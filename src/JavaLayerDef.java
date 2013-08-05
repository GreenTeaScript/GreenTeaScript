import java.util.ArrayList;



public class JavaLayerDef extends GtStatic {
	public static ArrayList<GtType> MakeParamTypeList(GtType ReturnType, GtType RecvType, GtType...ParamTypes) {
		ArrayList<GtType> TypeList = new ArrayList<GtType>();
		TypeList.add(ReturnType);
		TypeList.add(RecvType);
		for(int i = 0; i < ParamTypes.length; i++) {
			TypeList.add(ParamTypes[i]);
		}
		return TypeList;
	}

	public static void DefineMethod(GtNameSpace NameSpace, int MethodFlag, String MethodName, ArrayList<GtType> ParamTypeList) {
		GtMethod Method = new GtMethod(MethodFlag, MethodName, ParamTypeList);
		NameSpace.DefineMethod(Method);
	}

	public void MakeDefinition(GtNameSpace NameSpace) {
		GtType IntType = NameSpace.Context.IntType;
		GtType BooleanType = NameSpace.Context.BooleanType;
		ArrayList<GtType> UnaryParam = MakeParamTypeList(IntType, IntType);
		ArrayList<GtType> BinaryParam = MakeParamTypeList(IntType, IntType, IntType);
		ArrayList<GtType> RelationParam = MakeParamTypeList(BooleanType, IntType, IntType);

		DefineMethod(NameSpace, ImmutableMethod | ConstMethod, "+", UnaryParam);
		DefineMethod(NameSpace, ImmutableMethod | ConstMethod, "+", BinaryParam);
		DefineMethod(NameSpace, ImmutableMethod | ConstMethod, "-", UnaryParam);
		DefineMethod(NameSpace, ImmutableMethod | ConstMethod, "-", BinaryParam);
		DefineMethod(NameSpace, ImmutableMethod | ConstMethod, "*", BinaryParam);
		DefineMethod(NameSpace, ImmutableMethod | ConstMethod, "/", BinaryParam);
		DefineMethod(NameSpace, ImmutableMethod | ConstMethod, "%", BinaryParam);

		DefineMethod(NameSpace, ImmutableMethod | ConstMethod, "<", RelationParam);
		DefineMethod(NameSpace, ImmutableMethod | ConstMethod, "<=", RelationParam);
		DefineMethod(NameSpace, ImmutableMethod | ConstMethod, ">", RelationParam);
		DefineMethod(NameSpace, ImmutableMethod | ConstMethod, ">=", RelationParam);
		DefineMethod(NameSpace, ImmutableMethod | ConstMethod, "==", RelationParam);
		DefineMethod(NameSpace, ImmutableMethod | ConstMethod, "!=", RelationParam);
	}
}
