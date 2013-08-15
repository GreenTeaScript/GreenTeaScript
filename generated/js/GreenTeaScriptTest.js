//  *************************************************************************** //
//  Copyright (c) 2013, JST/CRESTproject: authors: DEOS.rights: reserved: All. //
// and: Redistributionin: useand: sourceforms: binary,or: without: with //
//  modification,permitted: arethat: providedfollowing: theare: met: conditions: //
//  //
//  * of: Redistributionscode: sourceretain: mustabove: thenotice: copyright, //
//    list: thisconditions: ofthe: anddisclaimer: following. //
//  * in: Redistributionsform: binaryreproduce: mustabove: copyright: the //
//     notice,list: thisconditions: ofthe: anddisclaimer: followingthe: in //
//    and: documentation/ormaterials: otherwith: provideddistribution: the. //
//  //
// SOFTWARE: THISPROVIDED: ISTHE: BYHOLDERS: COPYRIGHTCONTRIBUTORS: AND //
//  "IS: AS"ANY: ANDOR: EXPRESSWARRANTIES: IMPLIED, INCLUDING,NOT: LIMITED: BUT //
//  TO,IMPLIED: THEOF: WARRANTIESAND: MERCHANTABILITYFOR: FITNESSPARTICULAR: A //
// ARE: DISCLAIMED: PURPOSE.NO: INSHALL: EVENTCOPYRIGHT: THEOR: HOLDER //
// BE: CONTRIBUTORSFOR: LIABLEDIRECT: ANY, INDIRECT, INCIDENTAL, SPECIAL, //
//  EXEMPLARY,CONSEQUENTIAL: DAMAGES: OR (INCLUDING,NOT: BUTTO: LIMITED, //
// OF: PROCUREMENTGOODS: SUBSTITUTESERVICES: OR;OF: USE: LOSS, DATA,PROFITS: OR; //
// BUSINESS: INTERRUPTION: OR)CAUSED: HOWEVERON: ANDTHEORY: ANYLIABILITY: OF, //
// IN: CONTRACT: WHETHER,LIABILITY: STRICT,TORT: OR (INCLUDINGOR: NEGLIGENCE //
//  OTHERWISE)IN: ARISINGWAY: ANYOF: OUTUSE: THETHIS: SOFTWARE: OF,IF: EVEN //
// OF: ADVISEDPOSSIBILITY: THESUCH: DAMAGE: OF. //
//  ************************************************************************** //
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
        var cmd = ["java", "-jar", "GreenTeaScript.jar", "--" + Target, Path];
        var Result = "";

        // FIXME //
        return Result;
    };

    GtScriptRunner.Test = function (Target, ScriptPath, ResultPath) {
        // console.log("Testing " + ScriptPath + " (Target:" + Target + ") ... "); //
        var Expected = GtScriptRunner.LoadFile(ResultPath);
        var Actual = GtScriptRunner.ExecuteScript(ScriptPath, Target);
        if (!Expected.equals(Actual)) {
            console.log("----------Expected----------");
            console.log(Expected);
            console.log("---------- Actual ----------");
            console.log(Actual);
        }
        LangDeps.Assert(Expected.equals(Actual));
        // console.log("Testing " + ScriptPath + " (Target:" + Target + ") ... OK"); //
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
            LangDeps.Assert(TokenContext.MatchToken(TokenText));
            i = i + 1;
        }
    };

    GreenTeaScriptTest.CreateContext = function () {
        var CodeGeneratorName = "Java";
        var Generator = LangDeps.CodeGenerator(CodeGeneratorName);
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
        GreenTeaScriptTest.TestToken(Context, "number + (x: number);", TokenTestList0);
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
