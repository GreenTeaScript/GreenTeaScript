/// <reference path="LangDeps.ts" />

class GreenTeaScriptTestCase {
	TestName: string;

	public constructor() {
	}

	static Check(Actual: boolean, Expected: boolean): void {
		LangDeps.Assert(Actual != Expected);
	}

	static Assert(Cond: boolean): void {
		GreenTeaScriptTestCase.AssertTrue(Cond);
	}

	static AssertTrue(Cond: boolean): void {
		GreenTeaScriptTestCase.Check(Cond, true);
	}

	static AssertFalse(Cond: boolean): void {
		GreenTeaScriptTestCase.Check(Cond, false);
	}

	static AssertEqualB(Actual: boolean, Expected: boolean): void {
		GreenTeaScriptTestCase.Check(Actual, Expected);
	}

	static AssertEqualI(Actual: number, Expected: number): void {
		GreenTeaScriptTestCase.Check(Actual == Expected, true);
	}

	static AssertEqualF(Actual: number, Expected: number, Delta: number): void {
		GreenTeaScriptTestCase.Check(Actual - Expected <= Delta, true);
	}

	static AssertEqualO(Actual: Object, Expected: Object): void {
		GreenTeaScriptTestCase.Check(Actual.equals(Expected), true);
	}
}

class GreenTeaTokenizerTestCase extends GreenTeaScriptTestCase {
	
	static TestToken(Context: GtContext, Source: string, TokenTestList: string[]): void {
		var NameSpace: GtNameSpace = Context.DefaultNameSpace;
		var TokenContext: TokenContext = new TokenContext(NameSpace, Source, 1);
		var i: number = 0;
		while(i < TokenTestList.length) {
			var TokenText: string = TokenTestList[i];
			LangDeps.Assert(TokenContext.MatchToken(TokenText));
			i = i + 1;
		}
	}

	static Test(Context: GtContext): void {
		var TokenTestList0: string[] = ["1", "||", "2"]
		GreenTeaTokenizerTestCase.TestToken(Context, "1 || 2", TokenTestList0);

		var TokenTestList1: string[] = ["1", "==", "2"]
		GreenTeaTokenizerTestCase.TestToken(Context, "1 == 2", TokenTestList1);

		var TokenTestList2: string[] = ["1", "!=", "2"]
		GreenTeaTokenizerTestCase.TestToken(Context, "1 != 2", TokenTestList2);

		var TokenTestList3: string[] = ["1", "*", "=", "2"]
		GreenTeaTokenizerTestCase.TestToken(Context, "1 *= 2", TokenTestList3);

		var TokenTestList4: string[] = ["1", "=", "2"]
		GreenTeaTokenizerTestCase.TestToken(Context, "1 = 2", TokenTestList4);

		var TokenTestList5: string[] = ["number", "+", "(", "number", "x", ")", ";"]
		GreenTeaTokenizerTestCase.TestToken(Context, "number + (x: number);", TokenTestList5);
	}
}

class GreenTeaParseerTestCase extends GreenTeaScriptTestCase {
	static Test(Context: GtContext): void {
	}
}

class GreenTeaCodeGenTestCase extends GreenTeaScriptTestCase {
	static Test(Context: GtContext): void {
	}
}

class GreenTeaScriptTester {
	static main(args: string[]): void {
		var CodeGeneratorName: string = "Java";
		var Generator: CodeGenerator = LangDeps.CodeGenerator(CodeGeneratorName);
		var Context: GtContext = new GtContext(new KonohaGrammar(), Generator);

		GreenTeaTokenizerTestCase.Test(Context);
		GreenTeaParseerTestCase.Test(Context);
		GreenTeaCodeGenTestCase.Test(Context);
	}
}
