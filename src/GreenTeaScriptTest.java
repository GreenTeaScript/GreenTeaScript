//ifdef  JAVA
import java.io.InputStream;
//endif VAJA

class GtScriptRunner {
	public static String LoadFile(String Path) {
		if(LangDeps.HasFile(Path)) {
			return LangDeps.LoadFile(Path);
		}
		return null;
	}
	public static String ExecuteScript(String Path, String Target) {
		/*local*/String[] cmd = {"java", "-jar", "GreenTeaScript.jar", "--" + Target, Path};
		/*local*/String Result = "";
		//FIXME
//ifdef JAVA
		try {
			/*local*/Process proc = new ProcessBuilder(cmd).start();
			proc.waitFor();
			if(proc.exitValue() != 0) {
				return null;
			}
			/*local*/InputStream stdout = proc.getInputStream();
			/*local*/byte[] buffer = new byte[512];
			/*local*/int read = 0;
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
		LangDeps.Assert(Expected.equals(Actual));
		//LangDeps.println("Testing " + ScriptPath + " (Target:" + Target + ") ... OK");
	}
}

public class GreenTeaScriptTest {
	public static void TestToken(GtContext Context, String Source, String[] TokenTestList) {
		/*local*/GtNameSpace NameSpace = Context.DefaultNameSpace;
		/*local*/GtTokenContext TokenContext = new GtTokenContext(NameSpace, Source, 1);
		/*local*/int i = 0;
		while(i < TokenTestList.length) {
			/*local*/String TokenText = TokenTestList[i];
			LangDeps.Assert(TokenContext.MatchToken(TokenText));
			i = i + 1;
		}
	}

	public static GtContext CreateContext() {
		/*local*/String CodeGeneratorName = "Java";
		/*local*/GtGenerator Generator = LangDeps.CodeGenerator(CodeGeneratorName);
		return new GtContext(new DScriptGrammar(), Generator);
	}

	public static void TokenizeOperator0() {
		GtContext Context = GreenTeaScriptTest.CreateContext();
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
		GtContext Context = GreenTeaScriptTest.CreateContext();
		/*local*/String[] TokenTestList0 = {"int", "+", "(", "int", "x", ")", ";"};
		GreenTeaScriptTest.TestToken(Context, "int + (int x);", TokenTestList0);
	}

	public static void main(String[] args) {
		if(args.length != 3) {
			GreenTeaScriptTest.TokenizeOperator0();
			GreenTeaScriptTest.TokenizeStatement();
		} else {
			GtScriptRunner.Test(args[0], args[1], args[2]);
		}
	}
}
