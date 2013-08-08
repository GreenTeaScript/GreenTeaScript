import static org.junit.Assert.*;

import org.junit.Test;

public class GreenTeaScriptTest {
	/*field*/GtContext Context;

	final static void TestToken(GtContext Context, String Source, String[] TokenTestList) {
		/*local*/GtNameSpace NameSpace = Context.DefaultNameSpace;
		/*local*/TokenContext TokenContext = new TokenContext(NameSpace, Source, 1);
		/*local*/int i = 0;
		while(i < TokenTestList.length) {
			/*local*/String TokenText = TokenTestList[i];
			assertTrue(TokenContext.MatchToken(TokenText));
			i = i + 1;
		}
	}

	public void InitContext() {
		/*local*/String CodeGeneratorName = "Java";
		/*local*/CodeGenerator Generator = LangDeps.CodeGenerator(CodeGeneratorName);
		Context = new GtContext(new KonohaGrammar(), Generator);
	}

	@Test
	public void TokenizeOperator0() {
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
	}
	
	@Test
	public void TokenizeStatement() {
		/*local*/String[] TokenTestList0 = {"int", "+", "(", "int", "x", ")", ";"};
		GreenTeaTokenizerTestCase.TestToken(Context, "int + (int x);", TokenTestList0);
	}

}
