var GtScriptRunner = (function () {
    function GtScriptRunner() {
    }
    GtScriptRunner.LoadFile = function (Path) {
        if (LangDeps.HasFile(Path)) {
            return LangDeps.LoadFile(Path);
        }
        return null;
    };
    GtScriptRunner.ExecuteScript = function (Path, Target) {
        var cmd = ["java", "-jar", "GreenTea.jar", "--" + Target, Path];
        var Result = "";

        return Result;
    };

    GtScriptRunner.Test = function (Target, ScriptPath, ResultPath) {
        console.log("Testing " + ScriptPath + " (Target:" + Target + ") ... ");
        var Expected = GtScriptRunner.LoadFile(ResultPath);
        var Actual = GtScriptRunner.ExecuteScript(ScriptPath, Target);
        LangDeps.Assert(Expected.equals(Actual));
        console.log("Testing " + ScriptPath + " (Target:" + Target + ") ... OK");
    };
    return GtScriptRunner;
})();

var GreenTeaScriptTest = (function () {
    function GreenTeaScriptTest() {
    }
    GreenTeaScriptTest.TestToken = function (Context, Source, TokenTestList) {
        var NameSpace = Context.DefaultNameSpace;
        var TokenContext = new GtTokenContext(NameSpace, Source, 1);
        var i = 0;
        while (i < TokenTestList.length) {
            var TokenText = TokenTestList[i];
            LangDeps.Assert(TokenContext.MatchToken(TokenText));
            i = i + 1;
        }
    };

    GreenTeaScriptTest.CreateContext = function () {
        var CodeGeneratorName = "Java";
        var Generator = LangDeps.CodeGenerator(CodeGeneratorName);
        return new GtContext(new DScriptGrammar(), Generator);
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
        var TokenTestList0 = ["number", "+", "(", "number", "x", ")", ";"];
        GreenTeaScriptTest.TestToken(Context, "number + (x: number);", TokenTestList0);
    };

    GreenTeaScriptTest.main = function (args) {
        if (args.length != 3) {
            GreenTeaScriptTest.TokenizeOperator0();
            GreenTeaScriptTest.TokenizeStatement();
        } else {
            GtScriptRunner.Test(args[0], args[1], args[2]);
        }
    };
    return GreenTeaScriptTest;
})();
