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

        //FIXME
        return Result;
    };

    GtScriptRunner.Test = function (Target, ScriptPath, ResultPath) {
        //LangDeps.println(#STR7# + ScriptPath + #STR8# + Target + #STR9#);
        var Expected = GtScriptRunner.LoadFile(ResultPath);
        var Actual = GtScriptRunner.ExecuteScript(ScriptPath, Target);
        if (!Expected.equals(Actual)) {
            console.log("----------Expected----------");
            console.log(Expected);
            console.log("---------- Actual ----------");
            console.log(Actual);
        }
        LibGreenTea.Assert(Expected.equals(Actual));
        //LangDeps.println(#STR12# + ScriptPath + #STR13# + Target + #STR14#);
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
