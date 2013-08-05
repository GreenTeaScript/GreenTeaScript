import java.util.ArrayList;



public class JavaLayerDef extends GtStatic{
	public static ArrayList<GtType> MakeParamTypeList(GtType ReturnType, GtType RecvType, GtType...ParamTypes) {
		ArrayList<GtType> TypeList = new ArrayList<GtType>();
		TypeList.add(ReturnType);
		TypeList.add(RecvType);
		for(int i = 0; i < ParamTypes.length; i++) {
			TypeList.add(ParamTypes[i]);
		}
		return TypeList;
	}

	public static void DefineMethod(GtNameSpace NameSpace, int MethodFlag, String MethodName, ArrayList<GtType> ParamTypeList, Object Callee, String LocalName) {
		GtMethod Method = new GtMethod(MethodFlag, MethodName, ParamTypeList);
		NameSpace.DefineMethod(Method);
	}

	public void MakeDefinition(GtNameSpace NameSpace) {
		GtType IntType = NameSpace.Context.IntType;
		GtType BooleanType = NameSpace.Context.BooleanType;
		ArrayList<GtType> UnaryParam = MakeParamTypeList(IntType, IntType);
		ArrayList<GtType> BinaryParam = MakeParamTypeList(IntType, IntType, IntType);
		ArrayList<GtType> RelationParam = MakeParamTypeList(BooleanType, IntType, IntType);

		DefineMethod(NameSpace, ImmutableMethod | ConstMethod, "+", UnaryParam, this, "PlusInt");
		DefineMethod(NameSpace, ImmutableMethod | ConstMethod, "+", BinaryParam, this, "IntAddInt");
		DefineMethod(NameSpace, ImmutableMethod | ConstMethod, "-", UnaryParam, this, "MinusInt");
		DefineMethod(NameSpace, ImmutableMethod | ConstMethod, "-", BinaryParam, this, "IntSubInt");
		DefineMethod(NameSpace, ImmutableMethod | ConstMethod, "*", BinaryParam, this, "IntMulInt");
		DefineMethod(NameSpace, ImmutableMethod | ConstMethod, "/", BinaryParam, this, "IntDivInt");
		DefineMethod(NameSpace, ImmutableMethod | ConstMethod, "%", BinaryParam, this, "IntModInt");

		DefineMethod(NameSpace, ImmutableMethod | ConstMethod, "<", RelationParam, this, "IntLtInt");
		DefineMethod(NameSpace, ImmutableMethod | ConstMethod, "<=", RelationParam, this, "IntLeInt");
		DefineMethod(NameSpace, ImmutableMethod | ConstMethod, ">", RelationParam, this, "IntGtInt");
		DefineMethod(NameSpace, ImmutableMethod | ConstMethod, ">=", RelationParam, this, "IntGeInt");
		DefineMethod(NameSpace, ImmutableMethod | ConstMethod, "==", RelationParam, this, "IntEqInt");
		DefineMethod(NameSpace, ImmutableMethod | ConstMethod, "!=", RelationParam, this, "IntNeInt");
	}

	public static int PlusInt(int x) {
		return +x;
	}

	public static int IntAddInt(int x, int y) {
		return x + y;
	}

	public static int MinusInt(int x) {
		return -x;
	}

	public static int IntSubInt(int x, int y) {
		return x - y;
	}

	public static int IntMulInt(int x, int y) {
		return x * y;
	}

	public static int IntDivInt(int x, int y) {
		return x / y;
	}

	public static int IntModInt(int x, int y) {
		return x % y;
	}

	public static boolean IntLtInt(int x, int y) {
		return x < y;
	}

	public static boolean IntLeInt(int x, int y) {
		return x <= y;
	}

	public static boolean IntGtInt(int x, int y) {
		return x > y;
	}

	public static boolean IntGeInt(int x, int y) {
		return x >= y;
	}

	public static boolean IntEqInt(int x, int y) {
		return x == y;
	}

	public static boolean IntNeInt(int x, int y) {
		return x != y;
	}
}
