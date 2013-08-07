class GreenTeaScriptTestCase {
	/*field*/String	TestName;

	public GreenTeaScriptTestCase/*constructor*/() {
	}

	public static void Check(boolean Actual, boolean Expected) {
		LangDeps.Assert(Actual != Expected);
	}

	public static void Assert(boolean Cond) {
		GreenTeaScriptTestCase.AssertTrue(Cond);
	}

	public static void AssertTrue(boolean Cond) {
		GreenTeaScriptTestCase.Check(Cond, true);
	}

	public static void AssertFalse(boolean Cond) {
		GreenTeaScriptTestCase.Check(Cond, false);
	}

	public static void AssertEqualB(boolean Actual, boolean Expected) {
		GreenTeaScriptTestCase.Check(Actual, Expected);
	}

	public static void AssertEqualI(int Actual, int Expected) {
		GreenTeaScriptTestCase.Check(Actual == Expected, true);
	}

	public static void AssertEqualF(float Actual, float Expected, float Delta) {
		GreenTeaScriptTestCase.Check(Actual - Expected <= Delta, true);
	}

	public static void AssertEqualO(Object Actual, Object Expected) {
		GreenTeaScriptTestCase.Check(Actual.equals(Expected), true);
	}
}

class GreenTeaTokenizerTestCase extends GreenTeaScriptTestCase {
	
	final static void TestToken(GtContext Context, String Source, String[] TokenTestList) {
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
		/*local*/String[] TokenTestList0 = {"1", "||", "2"};
		GreenTeaTokenizerTestCase.TestToken(Context, "1 || 2", TokenTestList0);

		/*local*/String[] TokenTestList1 = {"1", "==", "2"};
		GreenTeaTokenizerTestCase.TestToken(Context, "1 == 2", TokenTestList1);

		/*local*/String[] TokenTestList2 = {"1", "!=", "2"};
		GreenTeaTokenizerTestCase.TestToken(Context, "1 != 2", TokenTestList2);

		/*local*/String[] TokenTestList3 = {"1", "*", "=", "2"};
		GreenTeaTokenizerTestCase.TestToken(Context, "1 *= 2", TokenTestList3);

		/*local*/String[] TokenTestList4 = {"1", "=", "2"};
		GreenTeaTokenizerTestCase.TestToken(Context, "1 = 2", TokenTestList4);

		/*local*/String[] TokenTestList5 = {"int", "+", "(", "int", "x", ")", ";"};
		GreenTeaTokenizerTestCase.TestToken(Context, "int + (int x);", TokenTestList5);
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
		/*local*/CodeGenerator Generator = LangDeps.CodeGenerator(CodeGeneratorName);
		/*local*/GtContext Context = new GtContext(new KonohaGrammar(), Generator);

		GreenTeaTokenizerTestCase.Test(Context);
		GreenTeaParseerTestCase.Test(Context);
		GreenTeaCodeGenTestCase.Test(Context);
	}
}
