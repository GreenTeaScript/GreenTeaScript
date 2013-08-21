Array.prototype.size = function () {
    return this.length;
};

Array.prototype.add = function (v) {
    this.push(v);
};

Array.prototype.get = function (i) {
    if (i >= this.length) {
        throw new RangeError("invalid array index");
    }
    return this[i];
};

Array.prototype.set = function (i, v) {
    this[i] = v;
};

Array.prototype.remove = function (i) {
    if (i >= this.length) {
        throw new RangeError("invalid array index");
    }
    var v = this[i];
    this.splice(i, 1);
    return v;
};

Array.prototype.clear = function () {
    this.length = 0;
};

Object.prototype["equals"] = function (other) {
    return (this === other);
};

String.prototype["startsWith"] = function (key) {
    return this.indexOf(key, 0) == 0;
};

String.prototype["endsWith"] = function (key) {
    return this.lastIndexOf(key, 0) == 0;
};

String.prototype["replaceAll"] = function (key, rep) {
    return this.replace(key, rep);
};

String.prototype["equals"] = function (other) {
    return (this == other);
};

var GtMap = (function () {
    function GtMap() {
        this.map = new Object();
        this.key = [];
        this.length = 0;
    }
    GtMap.prototype.get = function (index) {
        return this.map[index];
    };
    GtMap.prototype.put = function (key, obj) {
        this.length++;
        this.map[key] = obj;
        this.key.push(key);
    };
    GtMap.prototype.size = function () {
        return this.length;
    };
    GtMap.prototype.keys = function () {
        return this.key;
    };
    return GtMap;
})();

var LibGreenTea = (function () {
    function LibGreenTea() {
    }
    LibGreenTea.GetPlatform = function () {
        return "TypeScript 0.9.0.1, " + (LibGreenTea.isNodeJS ? "Node.js " + process.version + " " + process.platform : navigator.appName + " " + navigator.appVersion);
    };

    LibGreenTea.println = function (msg) {
        console.log(msg);
    };

    LibGreenTea.GetStackInfo = function (depth) {
        return " ";
    };

    LibGreenTea.DebugP = function (msg) {
        if (LibGreenTea.DebugMode) {
            LibGreenTea.println("DEBUG" + LibGreenTea.GetStackInfo(2) + ": " + msg);
        }
    };

    LibGreenTea.VerboseLog = function (VerboseFlag, msg) {
        LibGreenTea.println(msg);
    };

    LibGreenTea.Exit = function (status, message) {
        throw new Error("Exit: " + message);
    };

    LibGreenTea.Assert = function (expect) {
        if (!expect) {
            throw new Error("Assertion Failed");
        }
    };

    LibGreenTea.IsWhitespace = function (ch) {
        return ch == 32 || ch == 9;
    };

    LibGreenTea.IsLetter = function (ch) {
        if (ch > 90) {
            ch -= 0x20;
        }
        return 65 <= ch && ch <= 90;
    };

    LibGreenTea.IsDigit = function (ch) {
        return 48 <= ch && ch <= 57;
    };

    LibGreenTea.CharAt = function (Text, Pos) {
        return Text.charCodeAt(Pos);
    };

    LibGreenTea.CharToString = function (code) {
        return String.fromCharCode(code);
    };

    LibGreenTea.UnescapeString = function (Text) {
        return Text;
    };

    LibGreenTea.EscapeString = function (Text) {
        return Text;
    };

    LibGreenTea.EqualsString = function (s1, s2) {
        return s1 == s2;
    };

    LibGreenTea.ParseInt = function (Text) {
        return Text - 0;
    };

    LibGreenTea.GetNativeType = function (Context, Value) {
        var NativeType = null;
        var NativeClassInfo = Value.constructor;
        if (typeof Value == 'number' || Value instanceof Number) {
            if ((Value | 0) == Value) {
                return Context.IntType;
            }
        }
        if (typeof Value == 'string' || Value instanceof String) {
            return Context.StringType;
        }
        NativeType = Context.ClassNameMap.get(NativeClassInfo.name);
        if (NativeType == null) {
            NativeType = new GtType(Context, NativeClass, NativeClassInfo.getSimpleName(), null, NativeClassInfo);
            Context.ClassNameMap.put(NativeClassInfo.getName(), NativeType);
        }
        return NativeType;
    };

    LibGreenTea.StartsWith = function (self, key) {
        return self.indexOf(key, 0) == 0;
    };

    LibGreenTea.EndsWith = function (self, key) {
        return self.lastIndexOf(key, 0) == 0;
    };

    LibGreenTea.LookupNativeMethod = function (Callee, MethodName) {
        return Callee[MethodName];
    };

    LibGreenTea.EqualsFunc = function (m1, m2) {
        return m1 === m2;
    };

    LibGreenTea.CreateOrReuseTokenFunc = function (f, prev) {
        if (prev != null && LibGreenTea.EqualsFunc(prev.Func, f)) {
            return prev;
        }
        return new TokenFunc(f, prev);
    };

    LibGreenTea.ApplyTokenFunc = function (Delegate, TokenContext, Text, pos) {
        try  {
            return Delegate(TokenContext, Text, pos);
        } catch (e) {
            console.log(e);
        }
        LibGreenTea.Exit(1, "Failed ApplyTokenFunc");
        return -1;
    };

    LibGreenTea.ApplyMatchFunc = function (Delegate, NameSpace, TokenContext, LeftTree, Pattern) {
        try  {
            return Delegate(NameSpace, TokenContext, LeftTree, Pattern);
        } catch (e) {
            console.log(e);
        }
        LibGreenTea.Exit(1, "Failed ApplyMatchFunc");
        return null;
    };

    LibGreenTea.ApplyTypeFunc = function (Delegate, Gamma, ParsedTree, TypeInfo) {
        try  {
            return Delegate(Gamma, ParsedTree, TypeInfo);
        } catch (e) {
            console.log(e);
        }
        LibGreenTea.Exit(1, "Failed ApplyTypeFunc");
        return null;
    };

    LibGreenTea.CompactTypeList = function (BaseIndex, List) {
        var Tuple = new Array(List.length - BaseIndex);
        for (var i = BaseIndex; i < List.length; i++) {
            Tuple[i] = List[i];
        }
        return Tuple;
    };

    LibGreenTea.CompactStringList = function (List) {
        return List.slice(0);
    };

    LibGreenTea.MapGetKeys = function (Map) {
        return Map.keys();
    };

    LibGreenTea.Usage = function () {
    };

    LibGreenTea.CodeGenerator = function (TargetCode, OutputFile, GeneratorFlag) {
        var Extension = (OutputFile == null ? "-" : OutputFile);
        if (LibGreenTea.EndsWith(Extension, ".js") || LibGreenTea.StartsWith(TargetCode, "js") || LibGreenTea.StartsWith(TargetCode, "javascript")) {
            return new JavaScriptSourceGenerator(TargetCode, OutputFile, GeneratorFlag);
        } else if (LibGreenTea.EndsWith(Extension, ".pl") || LibGreenTea.StartsWith(TargetCode, "perl")) {
            return new PerlSourceGenerator(TargetCode, OutputFile, GeneratorFlag);
        } else if (LibGreenTea.EndsWith(Extension, ".py") || LibGreenTea.StartsWith(TargetCode, "python")) {
            return new PythonSourceGenerator(TargetCode, OutputFile, GeneratorFlag);
        } else if (LibGreenTea.EndsWith(Extension, ".sh") || LibGreenTea.StartsWith(TargetCode, "bash")) {
            return new BashSourceGenerator(TargetCode, OutputFile, GeneratorFlag);
        } else if (LibGreenTea.EndsWith(Extension, ".java") || LibGreenTea.StartsWith(TargetCode, "java")) {
            return new JavaSourceGenerator(TargetCode, OutputFile, GeneratorFlag);
        } else if (LibGreenTea.EndsWith(Extension, ".c") || LibGreenTea.StartsWith(TargetCode, "c")) {
            return new CSourceGenerator(TargetCode, OutputFile, GeneratorFlag);
        } else if (LibGreenTea.EndsWith(Extension, "X") || LibGreenTea.StartsWith(TargetCode, "exe")) {
            throw new Error("JavaByteCodeGenerator is not implemented for this environment");
        }
        return null;
    };

    LibGreenTea.WriteCode = function (OutputFile, SourceCode) {
        if (OutputFile == null) {
            LibGreenTea.Eval(SourceCode);
        } else if (OutputFile == "-") {
            console.log(SourceCode);
        } else {
            throw new Error("LibGreenTea.WriteCode cannon write code into a file in this environment");
        }
    };

    LibGreenTea.ReadLine = function (prompt) {
        throw new Error("LibGreenTea.ReadLine is not implemented for this environment");
        return "";
    };

    LibGreenTea.HasFile = function (FileName) {
        if (LibGreenTea.hasFileSystem) {
            return fs.existsSync(FileName).toString();
        } else {
            return !!GreenTeaLibraries[FileName];
        }
        return false;
    };

    LibGreenTea.LoadFile = function (FileName) {
        if (LibGreenTea.hasFileSystem) {
            return fs.readFileSync(FileName);
        } else {
            return GreenTeaLibraries[FileName];
        }
        return "";
    };

    LibGreenTea.IsSupportedTarget = function (TargetCode) {
        return LibGreenTea.HasFile(LibGreenTea.GetLibPath(TargetCode, "common"));
    };

    LibGreenTea.GetLibFile = function (TargetCode, FileName) {
        return LibGreenTea.LoadFile(LibGreenTea.GetLibPath(TargetCode, FileName));
    };

    LibGreenTea.GetLibPath = function (TargetCode, FileName) {
        return ("lib/" + TargetCode + "/" + FileName + ".green");
    };

    LibGreenTea.JoinIntId = function (UpperId, LowerId) {
        return UpperId * LibGreenTea.Int32Max + LowerId;
    };

    LibGreenTea.UpperId = function (Fileline) {
        return (Fileline / LibGreenTea.Int32Max) | 0;
    };

    LibGreenTea.LowerId = function (Fileline) {
        return Fileline | Fileline;
    };

    LibGreenTea.Eval = function (SourceCode) {
        return eval(SourceCode);
    };

    LibGreenTea.EvalCast = function (CastType, Value) {
        return null;
    };

    LibGreenTea.EvalInstanceOf = function (Value, Type) {
        return false;
    };

    LibGreenTea.EvalUnary = function (Type, Operator, Value) {
        return null;
    };

    LibGreenTea.EvalSuffix = function (Type, Value, Operator) {
        return null;
    };

    LibGreenTea.EvalBinary = function (Type, LeftValue, Operator, RightValue) {
        return null;
    };

    LibGreenTea.EvalGetter = function (Type, Value, FieldName) {
        return null;
    };
    LibGreenTea.isNodeJS = typeof (process) != "undefined";
    LibGreenTea.hasFileSystem = typeof (fs) != "undefined";

    LibGreenTea.DebugMode = true;

    LibGreenTea.Int32Max = Math.pow(2, 32);
    return LibGreenTea;
})();
