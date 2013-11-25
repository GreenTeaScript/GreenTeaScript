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
// "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED
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

//ifdef  JAVA
package org.GreenTeaScript;
import java.io.InputStream;
import java.util.concurrent.TimeUnit;
//endif VAJA

class GtScriptRunner {
	public static String LoadFile(String Path) {
		if(LibGreenTea.HasFile(Path)) {
			return LibGreenTea.LoadFile2(Path);
		}
		return null;
	}
	public static String ExecuteScript(String Path, String Target) {
		/*local*/String[] cmd = {"java", "-ea", "-jar", "GreenTeaScript.jar", "-l", Target, Path};
		/*local*/String Result = "";
		//FIXME
//ifdef JAVA
		try {
			Process proc = new ProcessBuilder(cmd).start();
			long begin = System.currentTimeMillis();
			for(;;) {
				try {
					Thread.sleep(100);
				} catch (InterruptedException e) {
				}
				try {
					proc.exitValue();
				} catch (IllegalThreadStateException e) {
					long now = System.currentTimeMillis();
					if(TimeUnit.MILLISECONDS.toSeconds(now - begin) < 10) {
						continue;
					}
					proc.destroy();
					System.out.println("D");
					break;
				}
				break;
			}
			if(proc.exitValue() != 0) {
				return null;
			}
			InputStream stdout = proc.getInputStream();
			byte[] buffer = new byte[512];
			int read = 0;
			while(read > -1) {
				read = stdout.read(buffer, 0, buffer.length);
				if(read > -1) {
					Result += new String(buffer, 0, read);
				}
			}
		} catch (Exception e) {
			e.printStackTrace();
			throw new RuntimeException();
		}
//endif VAJA
		return Result;
	}

	public static void Test(String Target, String ScriptPath, String ResultPath) {
		//LangDeps.println("Testing " + ScriptPath + " (Target:" + Target + ") ... ");
		/*local*/String Expected = GtScriptRunner.LoadFile(ResultPath);
		/*local*/String Actual   = GtScriptRunner.ExecuteScript(ScriptPath, Target);
		if(!Expected.equals(Actual)) {
			System.out.println("----------Expected----------");
			System.out.println(Expected);
			System.out.println("---------- Actual ----------");
			System.out.println(Actual);
		}
		LibGreenTea.Assert(Expected.equals(Actual));
		//LangDeps.println("Testing " + ScriptPath + " (Target:" + Target + ") ... OK");
	}
}

public class GreenTeaScriptTest {
	public static void TestToken(GtParserContext Context, String Source, String[] TokenTestList) {
		/*local*/GtNameSpace NameSpace = Context.TopLevelNameSpace;
		/*local*/GtTokenContext TokenContext = new GtTokenContext(NameSpace, Source, 1);
		/*local*/int i = 0;
		while(i < TokenTestList.length) {
			/*local*/String TokenText = TokenTestList[i];
			LibGreenTea.Assert(TokenContext.MatchToken(TokenText));
			i = i + 1;
		}
	}

	public static GtParserContext CreateContext() {
		/*local*/String CodeGeneratorName = "java";
		/*local*/GtGenerator Generator = LibGreenTea.CodeGenerator(CodeGeneratorName, "-", 0);
		return new GtParserContext(new KonohaGrammar(), Generator);
	}

	public static void TokenizeOperator0() {
		/*local*/GtParserContext Context = GreenTeaScriptTest.CreateContext();
		/*local*/String[] TokenTestList0 = {"1", "||", "2"};
		GreenTeaScriptTest.TestToken(Context, "1 || 2", TokenTestList0);

		/*local*/String[] TokenTestList1 = {"1", "==", "2"};
		GreenTeaScriptTest.TestToken(Context, "1 == 2", TokenTestList1);

		/*local*/String[] TokenTestList2 = {"1", "!=", "2"};
		GreenTeaScriptTest.TestToken(Context, "1 != 2", TokenTestList2);

		/*local*/String[] TokenTestList3 = {"1", "*", "=", "2"};
		GreenTeaScriptTest.TestToken(Context, "1 *= 2", TokenTestList3);

		/*local*/String[] TokenTestList4 = {"1", "=", "2"};
		GreenTeaScriptTest.TestToken(Context, "1 = 2", TokenTestList4);
	}

	public static void TokenizeStatement() {
		/*local*/GtParserContext Context = GreenTeaScriptTest.CreateContext();
		/*local*/String[] TokenTestList0 = {"int", "+", "(", "int", "x", ")", ";"};
		GreenTeaScriptTest.TestToken(Context, "int + (int x);", TokenTestList0);
	}
//ifdef JAVA
	public static void main(String[] Args) {
		if(Args.length != 3) {
			GreenTeaScriptTest.TokenizeOperator0();
			GreenTeaScriptTest.TokenizeStatement();
		}
		else {
			GtScriptRunner.Test(Args[0], Args[1], Args[2]);
		}
	}
//endif VAJA
}