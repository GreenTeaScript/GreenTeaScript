var GtScriptRunner = (function () {
    function GtScriptRunner() {
    }
    GtScriptRunner.LoadFile = function (Path) {
        if (LibGreenTea.HasFile(Path)) {
            return LibGreenTea.LoadFile(Path);
        }
        return null;
    };
    GtScriptRunner.ExecuteScript = function (Path, Target) {
        var cmd = ["java", "-jar", "GreenTeaScript.jar", "-l", Target, Path];
        var Result = "";

        return Result;
    };

    GtScriptRunner.Test = function (Target, ScriptPath, ResultPath) {
        var Expected = GtScriptRunner.LoadFile(ResultPath);
        var Actual = GtScriptRunner.ExecuteScript(ScriptPath, Target);
        if (!Expected.equals(Actual)) {
            console.log("----------Expected----------");
            console.log(Expected);
            console.log("---------- Actual ----------");
            console.log(Actual);
        }
        LibGreenTea.Assert(Expected.equals(Actual));
    };
    return GtScriptRunner;
})();

var GreenTeaScriptTest = (function () {
    function GreenTeaScriptTest() {
    }
    GreenTeaScriptTest.TestToken = function (Context, Source, TokenTestList) {
        var NameSpace = Context.TopLevelNameSpace;
        var TokenContext = new GtTokenContext(NameSpace, Source, 1);
        var i = 0;
        while (i < TokenTestList.length) {
            var TokenText = TokenTestList[i];
            LibGreenTea.Assert(TokenContext.MatchToken(TokenText));
            i = i + 1;
        }
    };

    GreenTeaScriptTest.CreateContext = function () {
        var CodeGeneratorName = "java";
        var Generator = LibGreenTea.CodeGenerator(CodeGeneratorName, "-", 0);
        return new GtClassContext(new DScriptGrammar(), Generator);
    };

    GreenTeaScriptTest.TokenizeOperator0 = function () {
        var Context = GreenTeaScriptTest.CreateContext();
        var TokenTestList0 = ["1", "||", "2"];
        GreenTeaScriptTest.TestToken(Context, "1 || 2", TokenTestList0);

        var TokenTestList1 = ["1", "==", "2"];
        GreenTeaScriptTest.TestToken(Context, "1 == 2", TokenTestList1);

        var TokenTestList2 = ["1", "!=", "2"];
        GreenTeaScriptTest.TestToken(Context, "1 != 2", TokenTestList2);

        var TokenTestList3 = ["1", "*", "=", "2"];
        GreenTeaScriptTest.TestToken(Context, "1 *= 2", TokenTestList3);

        var TokenTestList4 = ["1", "=", "2"];
        GreenTeaScriptTest.TestToken(Context, "1 = 2", TokenTestList4);
    };

    GreenTeaScriptTest.TokenizeStatement = function () {
        var Context = GreenTeaScriptTest.CreateContext();
        var TokenTestList0 = ["int", "+", "(", "int", "x", ")", ";"];
        GreenTeaScriptTest.TestToken(Context, "int + (int x);", TokenTestList0);
    };

    GreenTeaScriptTest.main = function (Args) {
        if (Args.length != 3) {
            GreenTeaScriptTest.TokenizeOperator0();
            GreenTeaScriptTest.TokenizeStatement();
        } else {
            GtScriptRunner.Test(Args[0], Args[1], Args[2]);
        }
    };
    return GreenTeaScriptTest;
})();
