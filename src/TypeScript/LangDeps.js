var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
function assert(expect) {
    if (!expect) {
        throw new Error();
    }
}

var GtDelegateCommon = (function () {
    function GtDelegateCommon() {
    }
    GtDelegateCommon.prototype.constractor = function (Self, method) {
        this.Self = Self;
        this.Method = method;
    };
    GtDelegateCommon.prototype.toString = function () {
        return (this.Method == null) ? "*undefined*" : this.Method.toString();
    };
    return GtDelegateCommon;
})();

var GtDelegateToken = (function (_super) {
    __extends(GtDelegateToken, _super);
    function GtDelegateToken() {
        _super.apply(this, arguments);
    }
    GtDelegateToken.prototype.constractor = function (Self, method) {
        this.Self = Self;
        this.Method = method;
    };
    return GtDelegateToken;
})(GtDelegateCommon);

var GtDelegateMatch = (function (_super) {
    __extends(GtDelegateMatch, _super);
    function GtDelegateMatch() {
        _super.apply(this, arguments);
    }
    GtDelegateMatch.prototype.constractor = function (Self, method) {
        this.Self = Self;
        this.Method = method;
    };
    return GtDelegateMatch;
})(GtDelegateCommon);

var GtDelegateType = (function (_super) {
    __extends(GtDelegateType, _super);
    function GtDelegateType() {
        _super.apply(this, arguments);
    }
    GtDelegateType.prototype.constractor = function (Self, method) {
        this.Self = Self;
        this.Method = method;
    };
    return GtDelegateType;
})(GtDelegateCommon);

var LangDeps = (function () {
    function LangDeps() {
    }
    LangDeps.println = function (msg) {
        console.log(msg);
    };

    LangDeps.DebugP = function (msg) {
        if (DebugPrintOption) {
            LangDeps.println("DEBUG" + LangDeps.GetStackInfo(2) + ": " + msg);
        }
    };

    LangDeps.GetStackInfo = function (depth) {
        return " ";
    };

    LangDeps.IsWhitespace = function (ch) {
        return " ".charCodeAt(0) == ch;
    };

    LangDeps.IsLetter = function (ch) {
        return true;
    };

    LangDeps.IsDigit = function (ch) {
        return true;
    };

    LangDeps.CharAt = function (Text, Pos) {
        return Text.charCodeAt(Pos);
    };

    LangDeps.ParseInt = function (Text) {
        return Text - 0;
    };

    LangDeps.LookupMethod = function (Callee, MethodName) {
        return Callee[MethodName];
    };

    LangDeps.EqualsMethod = function (m1, m2) {
        return m1 === m2;
    };

    LangDeps.CreateOrReuseTokenFunc = function (f, prev) {
        if (prev != null && LangDeps.EqualsMethod(prev.Func.Method, f.Method)) {
            return prev;
        }
        return new TokenFunc(f, prev);
    };

    LangDeps.ApplyTokenFunc = function (Self, Method, TokenContext, Text, pos) {
        try  {
            return Method.apply(Self, TokenContext, Text, pos);
        } catch (e) {
            console.log(e);
        }
        return -1;
    };

    LangDeps.ApplyMatchFunc = function (Self, Method, Pattern, LeftTree, TokenContext) {
        try  {
            return Method.apply(Self, Pattern, LeftTree, TokenContext);
        } catch (e) {
            console.log(e);
        }
        return null;
    };

    LangDeps.ApplyTypeFunc = function (Self, Method, Gamma, ParsedTree, TypeInfo) {
        try  {
            return Method.apply(Self, Gamma, ParsedTree, TypeInfo);
        } catch (e) {
            console.log(e);
        }
        return null;
    };

    LangDeps.CompactTypeList = function (List) {
        var Tuple = new Array(List.length);
        for (var i = 0; i < List.length; i++) {
            Tuple[i] = List[i];
        }
        return Tuple;
    };

    LangDeps.CompactStringList = function (List) {
        if (List == null)
            return null;
        var Tuple = new Array(List.length);
        for (var i = 0; i < List.length; i++) {
            Tuple[i] = List[i];
        }
        return Tuple;
    };
    return LangDeps;
})();

function FunctionA(Callee, MethodName) {
    return null;
}

function FunctionB(Callee, MethodName) {
    return null;
}

function FunctionC(Callee, MethodName) {
    return null;
}
