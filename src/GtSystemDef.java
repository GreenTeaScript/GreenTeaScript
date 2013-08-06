import java.util.ArrayList;


public class GtSystemDef extends EmbeddedMethodDef {

	public GtSystemDef(GtNameSpace NameSpace, NativeMethodMap NMMap) {
		super(NameSpace, NMMap);
	}

	@Override public void MakeDefinition() {
		RegisterClass(0, "System", null);
		ArrayList<GtType> param = MakeParamTypeList(VoidType, ObjectType, ObjectType);

		RegisterMethod(StaticMethod, "p", param, this, "p");
	}

	public static void p(Object self, Object x) {
		System.out.println(x);
	}

}
