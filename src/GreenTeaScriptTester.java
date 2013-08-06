
class GreenTeaScriptTestCase {
	String	TestName;

	public GreenTeaScriptTestCase() {
	}

	public static void Check(boolean Actual, boolean Expected) {
		LangDeps.Assert(Actual != Expected);
	}

	public static void Assert(boolean Cond) {
		AssertTrue(Cond);
	}

	public static void AssertTrue(boolean Cond) {
		Check(Cond, true);
	}

	public static void AssertFalse(boolean Cond) {
		Check(Cond, false);
	}

	public static void AssertEqual(boolean Actual, boolean Expected) {
		Check(Actual, Expected);
	}

	public static void AssertEqual(int Actual, int Expected) {
		Check(Actual == Expected, true);
	}

	public static void AssertEqual(float Actual, float Expected, float Delta) {
		Check(Actual - Expected <= Delta, true);
	}

	public static void AssertEqual(Object Actual, Object Expected) {
		Check(Actual.equals(Expected), true);
	}
}

class GreenTeaTokenizerTestCase extends GreenTeaScriptTestCase {
	static final void TestToken(GtContext Context, String Source, String[] TokenTestList) {
		/*local*/GtNameSpace NameSpace = Context.DefaultNameSpace;
		/*local*/TokenContext TokenContext = new TokenContext(NameSpace, Source, 1);
		/*local*/int i = 0;
		while(i < TokenTestList.length) {
			/*local*/String TokenText = TokenTestList[i];
			LangDeps.Assert(TokenContext.MatchToken(TokenText));
			i = i + 1;
		}
	}

	static void Test(GtContext Context) {
		String[] TokenTestList0 = {"1", "||", "2"};
		TestToken(Context, "1 || 2", TokenTestList0);

		String[] TokenTestList1 = {"1", "==", "2"};
		TestToken(Context, "1 == 2", TokenTestList1);

		String[] TokenTestList2 = {"1", "!=", "2"};
		TestToken(Context, "1 != 2", TokenTestList2);

		String[] TokenTestList3 = {"1", "*", "=", "2"};
		TestToken(Context, "1 *= 2", TokenTestList3);

		String[] TokenTestList4 = {"1", "=", "2"};
		TestToken(Context, "1 = 2", TokenTestList4);

		String[] TokenTestList5 = {"int", "+", "(", "int", "x", ")", ";"};
		TestToken(Context, "int + (int x);", TokenTestList5);
	}
}

class GreenTeaParseerTestCase extends GreenTeaScriptTestCase {
	static void Test(GtContext Context) {
	}
}

class GreenTeaCodeGenTestCase extends GreenTeaScriptTestCase {
	static void Test(GtContext Context) {
	}
}

public class GreenTeaScriptTester {
	public static void main(String[] args) {
		/*local*/String CodeGeneratorName = "Java";
		/*local*/GreenTeaGenerator Generator = LangDeps.CodeGenerator(CodeGeneratorName);
		/*local*/GtContext Context = new GtContext(new KonohaGrammar(), Generator);

		GreenTeaTokenizerTestCase.Test(Context);
		GreenTeaParseerTestCase.Test(Context);
		GreenTeaCodeGenTestCase.Test(Context);
	}
}
