import java.util.ArrayList;


public class GtStringDef extends EmbeddedMethodDef {

	public GtStringDef(GtNameSpace NameSpace, NativeMethodMap NMMap) {
		super(NameSpace, NMMap);
	}

	@Override public void MakeDefinition() {
		ArrayList<GtType> BinaryParam = MakeParamTypeList(StringType, StringType, StringType);
		ArrayList<GtType> RelationParam = MakeParamTypeList(BooleanType, StringType, StringType);
		ArrayList<GtType> indexOfParam = MakeParamTypeList(IntType, StringType, StringType);
		ArrayList<GtType> getSizeParam = MakeParamTypeList(IntType, StringType);

		RegisterMethod(ImmutableMethod | ConstMethod, "+", BinaryParam, this, "StringAddString");

		RegisterMethod(ImmutableMethod | ConstMethod, "==", RelationParam, this, "StringEqString");
		RegisterMethod(ImmutableMethod | ConstMethod, "!=", RelationParam, this, "StringNeString");

		RegisterMethod(ImmutableMethod | ConstMethod, "indexOf", indexOfParam, this, "StringIndexOf");

		RegisterMethod(ImmutableMethod | ConstMethod, "getSize", getSizeParam, this, "StringGetSize");
	}

	public static String StringAddString(String x, String y) {
		return x + y;
	}

	public static boolean StringEqString(String x, String y) {
		return x.equals(y);
	}

	public static boolean StringNeString(String x, String y) {
		return !x.equals(y);
	}

	public static int StringIndexOf(String self, String str) {
		return self.indexOf(str);
	}

	public static int StringGetSize(String self) {
		return self.length();
	}
}
