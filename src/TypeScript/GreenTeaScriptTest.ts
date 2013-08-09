/// <reference path="LangDeps.ts" />


class GtScriptRunner {
	static LoadFile(Path: string): string {
		if(LangDeps.HasFile(Path)) {
			return LangDeps.LoadFile(Path);
		}
		return null;
	}
	static ExecuteScript(Path: string, Target: string): string {
		var cmd: string[] = ["java", "-jar", "GreenTea.jar", "--" + Target, Path]
		var Result: string = "";
		// FIXME //

		return Result;
	}

	static Test(Target: string, ScriptPath: string, ResultPath: string): void {
		console.log("Testing " + ScriptPath + " (Target:" + Target + ") ... ");
		var Expected: string = GtScriptRunner.LoadFile(ResultPath);
		var Actual: string   = GtScriptRunner.ExecuteScript(ScriptPath, Target);
		LangDeps.Assert(Expected.equals(Actual));
		console.log("Testing " + ScriptPath + " (Target:" + Target + ") ... OK");
	}
}

class GreenTeaScriptTest {
	static TestToken(Context: GtContext, Source: string, TokenTestList: string[]): void {
		var NameSpace: GtNameSpace = Context.DefaultNameSpace;
		var TokenContext: GtTokenContext = new GtTokenContext(NameSpace, Source, 1);
		var i: number = 0;
		while(i < TokenTestList.length) {
			var TokenText: string = TokenTestList[i];
			LangDeps.Assert(TokenContext.MatchToken(TokenText));
			i = i + 1;
		}
	}

	static CreateContext(): GtContext {
		var CodeGeneratorName: string = "Java";
		var Generator: GtGenerator = LangDeps.CodeGenerator(CodeGeneratorName);
		return new GtContext(new DScriptGrammar(), Generator);
	}

	static TokenizeOperator0(): void {
		var Context: GtContext = GreenTeaScriptTest.CreateContext();
		var TokenTestList0: string[] = ["1", "||", "2"]
		GreenTeaScriptTest.TestToken(Context, "1 || 2", TokenTestList0);

		var TokenTestList1: string[] = ["1", "==", "2"]
		GreenTeaScriptTest.TestToken(Context, "1 == 2", TokenTestList1);

		var TokenTestList2: string[] = ["1", "!=", "2"]
		GreenTeaScriptTest.TestToken(Context, "1 != 2", TokenTestList2);

		var TokenTestList3: string[] = ["1", "*", "=", "2"]
		GreenTeaScriptTest.TestToken(Context, "1 *= 2", TokenTestList3);

		var TokenTestList4: string[] = ["1", "=", "2"]
		GreenTeaScriptTest.TestToken(Context, "1 = 2", TokenTestList4);
	}
	
	static TokenizeStatement(): void {
		var Context: GtContext = GreenTeaScriptTest.CreateContext();
		var TokenTestList0: string[] = ["int", "+", "(", "int", "x", ")", ";"]
		GreenTeaScriptTest.TestToken(Context, "number + (x: number);", TokenTestList0);
	}

	static main(args: string[]): void {
		if(args.length != 3) {
			GreenTeaScriptTest.TokenizeOperator0();
			GreenTeaScriptTest.TokenizeStatement();
		} else {
			GtScriptRunner.Test(args[0], args[1], args[2]);
		}
	}
}
