// ***************************************************************************
// Copyright (c) 2013, JST/CREST DEOS project authors. All rights reserved.
// Redistribution and use in source and binary forms, with or without
// modification, are permitted provided that the following conditions are met:
//
// *  Redistributions of source code must retain the above copyright notice,
//    this list of conditions and the following disclaimer.
// *  Redistributions in binary form must reproduce the above copyright
//    notice, this list of conditions and the following disclaimer in the
//    documentation and/or other materials provided with the distribution.
//
// THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS
// #STR0# AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED
// TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR
// PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER OR
// CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL,
// EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO,
// PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS;
// OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY,
// WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR
// OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF
// ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
// **************************************************************************



class GtScriptRunner {
	public static LoadFile(Path: string): string {
		if(LibGreenTea.HasFile(Path)) {
			return LibGreenTea.LoadFile(Path);
		}
		return null;
	}
	public static ExecuteScript(Path: string, Target: string): string {
		var cmd: string[] = ["java", "-jar", "GreenTeaScript.jar", "-l", Target, Path]
		var Result: string = "";
		//FIXME

		return Result;
	}

	public static Test(Target: string, ScriptPath: string, ResultPath: string): void {
		//LangDeps.println(#STR7# + ScriptPath + #STR8# + Target + #STR9#);
		var Expected: string = GtScriptRunner.LoadFile(ResultPath);
		var Actual: string   = GtScriptRunner.ExecuteScript(ScriptPath, Target);
		if(!Expected.equals(Actual)) {
			console.log("----------Expected----------");
			console.log(Expected);
			console.log("---------- Actual ----------");
			console.log(Actual);
		}
		LibGreenTea.Assert(Expected.equals(Actual));
		//LangDeps.println(#STR12# + ScriptPath + #STR13# + Target + #STR14#);
	}
}

class GreenTeaScriptTest {
	public static TestToken(Context: GtClassContext, Source: string, TokenTestList: string[]): void {
		var NameSpace: GtNameSpace = Context.TopLevelNameSpace;
		var TokenContext: GtTokenContext = new GtTokenContext(NameSpace, Source, 1);
		var i: number = 0;
		while(i < TokenTestList.length) {
			var TokenText: string = TokenTestList[i];
			LibGreenTea.Assert(TokenContext.MatchToken(TokenText));
			i = i + 1;
		}
	}

	public static CreateContext(): GtClassContext {
		var CodeGeneratorName: string = "java";
		var Generator: GtGenerator = LibGreenTea.CodeGenerator(CodeGeneratorName, "-", 0);
		return new GtClassContext(new DScriptGrammar(), Generator);
	}

	public static TokenizeOperator0(): void {
		var Context: GtClassContext = GreenTeaScriptTest.CreateContext();
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

	public static TokenizeStatement(): void {
		var Context: GtClassContext = GreenTeaScriptTest.CreateContext();
		var TokenTestList0: string[] = ["int", "+", "(", "int", "x", ")", ";"]
		GreenTeaScriptTest.TestToken(Context, "int + (int x);", TokenTestList0);
	}

	public static main(Args: string[]): void {
		if(Args.length != 3) {
			GreenTeaScriptTest.TokenizeOperator0();
			GreenTeaScriptTest.TokenizeStatement();
		}
		else {
			GtScriptRunner.Test(Args[0], Args[1], Args[2]);
		}
	}
}