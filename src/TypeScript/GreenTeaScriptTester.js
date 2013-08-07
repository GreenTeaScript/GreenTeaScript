var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var GreenTeaScriptTestCase = (function () {
    function GreenTeaScriptTestCase() {
    }
    GreenTeaScriptTestCase.prototype.constructor = function () {
    };

    GreenTeaScriptTestCase.Check = function (Actual, Expected) {
        LangDeps.Assert(Actual != Expected);
    };

    GreenTeaScriptTestCase.Assert = function (Cond) {
        GreenTeaScriptTestCase.AssertTrue(Cond);
    };

    GreenTeaScriptTestCase.AssertTrue = function (Cond) {
        GreenTeaScriptTestCase.Check(Cond, true);
    };

    GreenTeaScriptTestCase.AssertFalse = function (Cond) {
        GreenTeaScriptTestCase.Check(Cond, false);
    };

    GreenTeaScriptTestCase.AssertEqualB = function (Actual, Expected) {
        GreenTeaScriptTestCase.Check(Actual, Expected);
    };

    GreenTeaScriptTestCase.AssertEqualI = function (Actual, Expected) {
        GreenTeaScriptTestCase.Check(Actual == Expected, true);
    };

    GreenTeaScriptTestCase.AssertEqualF = function (Actual, Expected, Delta) {
        GreenTeaScriptTestCase.Check(Actual - Expected <= Delta, true);
    };

    GreenTeaScriptTestCase.AssertEqualO = function (Actual, Expected) {
        GreenTeaScriptTestCase.Check(Actual.equals(Expected), true);
    };
    return GreenTeaScriptTestCase;
})();

var GreenTeaTokenizerTestCase = (function (_super) {
    __extends(GreenTeaTokenizerTestCase, _super);
    function GreenTeaTokenizerTestCase() {
        _super.apply(this, arguments);
    }
    GreenTeaTokenizerTestCase.TestToken = function (Context, Source, TokenTestList) {
        var NameSpace = Context.DefaultNameSpace;
        var TokenContext = new TokenContext(NameSpace, Source, 1);
        var i = 0;
        while (i < TokenTestList.length) {
            var TokenText = TokenTestList[i];
            LangDeps.Assert(TokenContext.MatchToken(TokenText));
            i = i + 1;
        }
    };

    GreenTeaTokenizerTestCase.Test = function (Context) {
        var TokenTestList0 = ["1", "||", "2"];
        GreenTeaTokenizerTestCase.TestToken(Context, "1 || 2", TokenTestList0);

        var TokenTestList1 = ["1", "==", "2"];
        GreenTeaTokenizerTestCase.TestToken(Context, "1 == 2", TokenTestList1);

        var TokenTestList2 = ["1", "!=", "2"];
        GreenTeaTokenizerTestCase.TestToken(Context, "1 != 2", TokenTestList2);

        var TokenTestList3 = ["1", "*", "=", "2"];
        GreenTeaTokenizerTestCase.TestToken(Context, "1 *= 2", TokenTestList3);

        var TokenTestList4 = ["1", "=", "2"];
        GreenTeaTokenizerTestCase.TestToken(Context, "1 = 2", TokenTestList4);

        var TokenTestList5 = ["number", "+", "(", "number", "x", ")", ";"];
        GreenTeaTokenizerTestCase.TestToken(Context, "number + (x: number);", TokenTestList5);
    };
    return GreenTeaTokenizerTestCase;
})(GreenTeaScriptTestCase);

var GreenTeaParseerTestCase = (function (_super) {
    __extends(GreenTeaParseerTestCase, _super);
    function GreenTeaParseerTestCase() {
        _super.apply(this, arguments);
    }
    GreenTeaParseerTestCase.Test = function (Context) {
    };
    return GreenTeaParseerTestCase;
})(GreenTeaScriptTestCase);

var GreenTeaCodeGenTestCase = (function (_super) {
    __extends(GreenTeaCodeGenTestCase, _super);
    function GreenTeaCodeGenTestCase() {
        _super.apply(this, arguments);
    }
    GreenTeaCodeGenTestCase.Test = function (Context) {
    };
    return GreenTeaCodeGenTestCase;
})(GreenTeaScriptTestCase);

var GreenTeaScriptTester = (function () {
    function GreenTeaScriptTester() {
    }
    GreenTeaScriptTester.main = function (args) {
        var CodeGeneratorName = "Java";
        var Generator = LangDeps.CodeGenerator(CodeGeneratorName);
        var Context = new GtContext(new KonohaGrammar(), Generator);

        GreenTeaTokenizerTestCase.Test(Context);
        GreenTeaParseerTestCase.Test(Context);
        GreenTeaCodeGenTestCase.Test(Context);
    };
    return GreenTeaScriptTester;
})();
//@ sourceMappingURL=GreenTeaScriptTester.js.map
