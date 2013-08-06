import java.util.ArrayList;


public class GtIntDef extends EmbeddedMethodDef {

	public GtIntDef(GtNameSpace NameSpace, NativeMethodMap NMMap) {
		super(NameSpace, NMMap);
	}

	@Override public void MakeDefinition() {
		ArrayList<GtType> UnaryParam = MakeParamTypeList(IntType, IntType);
		ArrayList<GtType> BinaryParam = MakeParamTypeList(IntType, IntType, IntType);
		ArrayList<GtType> RelationParam = MakeParamTypeList(BooleanType, IntType, IntType);

		RegisterMethod(ImmutableMethod | ConstMethod, "+", UnaryParam, this, "PlusInt");
		RegisterMethod(ImmutableMethod | ConstMethod, "+", BinaryParam, this, "IntAddInt");
		RegisterMethod(ImmutableMethod | ConstMethod, "-", UnaryParam, this, "MinusInt");
		RegisterMethod(ImmutableMethod | ConstMethod, "-", BinaryParam, this, "IntSubInt");
		RegisterMethod(ImmutableMethod | ConstMethod, "*", BinaryParam, this, "IntMulInt");
		RegisterMethod(ImmutableMethod | ConstMethod, "/", BinaryParam, this, "IntDivInt");
		RegisterMethod(ImmutableMethod | ConstMethod, "%", BinaryParam, this, "IntModInt");

		RegisterMethod(ImmutableMethod | ConstMethod, "<", RelationParam, this, "IntLtInt");
		RegisterMethod(ImmutableMethod | ConstMethod, "<=", RelationParam, this, "IntLeInt");
		RegisterMethod(ImmutableMethod | ConstMethod, ">", RelationParam, this, "IntGtInt");
		RegisterMethod(ImmutableMethod | ConstMethod, ">=", RelationParam, this, "IntGeInt");
		RegisterMethod(ImmutableMethod | ConstMethod, "==", RelationParam, this, "IntEqInt");
		RegisterMethod(ImmutableMethod | ConstMethod, "!=", RelationParam, this, "IntNeInt");
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
