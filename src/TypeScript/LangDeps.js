Array.prototype.size = function () {
    return this.length;
};

Array.prototype.add = function (v) {
    this.push(v);
};

Array.prototype.get = function (i) {
    return this[i];
};

Array.prototype.set = function (i, v) {
    this[i] = v;
};

Array.prototype.remove = function (i) {
    var v = this[i];
    this.splice(i, 1);
    return v;
};

Object.prototype["equals"] = function (other) {
    return (this === other);
};

String.prototype["startsWith"] = function (key) {
    return this.lastIndexOf(key, 0) == 0;
};

String.prototype["replaceAll"] = function (key, rep) {
    this.replace(key, rep);
};

String.prototype["equals"] = function (other) {
    return (this == other);
};

var GtMap = (function () {
    function GtMap() {
        this.map = new Object();
        this.length = 0;
    }
    GtMap.prototype.get = function (index) {
        return this.map[index];
    };
    GtMap.prototype.put = function (key, obj) {
        this.length++;
        this.map[key] = obj;
    };
    GtMap.prototype.size = function () {
        return this.length;
    };
    return GtMap;
})();

var LangDeps = (function () {
    function LangDeps() {
    }
    LangDeps.Assert = function (expect) {
        if (!expect) {
            throw new Error();
        }
    };

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
        return ch == 32 || ch == 9;
    };

    LangDeps.IsLetter = function (ch) {
        if (ch > 90) {
            ch -= 0x20;
        }
        return 65 <= ch && ch <= 90;
    };

    LangDeps.IsDigit = function (ch) {
        return 48 <= ch && ch <= 57;
    };

    LangDeps.CharAt = function (Text, Pos) {
        return Text.charCodeAt(Pos);
    };

    LangDeps.CharToString = function (code) {
        return String.fromCharCode(code);
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
        if (prev != null && LangDeps.EqualsMethod(prev.Func, f)) {
            return prev;
        }
        return new TokenFunc(f, prev);
    };

    LangDeps.ApplyTokenFunc = function (Delegate, TokenContext, Text, pos) {
        try  {
            return Delegate(TokenContext, Text, pos);
        } catch (e) {
            console.log(e);
        }
        return -1;
    };

    LangDeps.ApplyMatchFunc = function (Delegate, Pattern, LeftTree, TokenContext) {
        try  {
            return Delegate(Pattern, LeftTree, TokenContext);
        } catch (e) {
            console.log(e);
        }
        return null;
    };

    LangDeps.ApplyTypeFunc = function (Delegate, Gamma, ParsedTree, TypeInfo) {
        try  {
            return Delegate(Gamma, ParsedTree, TypeInfo);
        } catch (e) {
            console.log(e);
        }
        return null;
    };

    LangDeps.CompactTypeList = function (BaseIndex, List) {
        var Tuple = new Array(List.length - BaseIndex);
        for (var i = BaseIndex; i < List.length; i++) {
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

    LangDeps.CodeGenerator = function (Option) {
        return new JavaScriptSourceGenerator();
    };

    LangDeps.HasFile = function (FileName) {
        throw new Error("LangDeps.LoadFile is not implemented for this environment");
        return "";
    };

    LangDeps.LoadFile = function (FileName) {
        throw new Error("LangDeps.LoadFile is not implemented for this environment");
        return "";
    };

    LangDeps.Usage = function () {
    };

    LangDeps.ReadLine = function (prompt) {
        return "";
    };
    return LangDeps;
})();
