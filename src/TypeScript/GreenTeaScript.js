var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var PrivateClass = 1 << 0;
var SingletonClass = 1 << 1;
var FinalClass = 1 << 2;
var GreenClass = 1 << 3;
var StaticClass = 1 << 4;
var ImmutableClass = 1 << 5;
var InterfaceClass = 1 << 6;

var PrivateMethod = 1 << 0;
var VirtualMethod = 1 << 1;
var FinalMethod = 1 << 2;
var ConstMethod = 1 << 3;
var StaticMethod = 1 << 4;
var ImmutableMethod = 1 << 5;
var TopLevelMethod = 1 << 6;

var CoercionMethod = 1 << 7;
var RestrictedMethod = 1 << 8;
var UncheckedMethod = 1 << 9;
var SmartReturnMethod = 1 << 10;
var VariadicMethod = 1 << 11;
var IterativeMethod = 1 << 12;

var UniversalMethod = 1 << 13;

var HiddenMethod = 1 << 17;
var AbstractMethod = 1 << 18;
var OverloadedMethod = 1 << 19;
var Override = 1 << 20;
var DynamicCall = 1 << 22;

var SymbolMaskSize = 3;
var LowerSymbolMask = 1;
var GetterSymbolMask = (1 << 1);
var SetterSymbolMask = (1 << 2);
var MetaSymbolMask = (GetterSymbolMask | SetterSymbolMask);
var GetterPrefix = "Get";
var SetterPrefix = "Set";
var MetaPrefix = "\\";

var AllowNewId = -1;
var NoMatch = -1;
var BreakPreProcess = -1;

var Optional = true;
var Required = false;

var ErrorLevel = 0;
var WarningLevel = 1;
var InfoLevel = 2;

var NullChar = 0;
var UndefinedChar = 1;
var DigitChar = 2;
var UpperAlphaChar = 3;
var LowerAlphaChar = 4;
var UnderBarChar = 5;
var NewLineChar = 6;
var TabChar = 7;
var SpaceChar = 8;
var OpenParChar = 9;
var CloseParChar = 10;
var OpenBracketChar = 11;
var CloseBracketChar = 12;
var OpenBraceChar = 13;
var CloseBraceChar = 14;
var LessThanChar = 15;
var GreaterThanChar = 16;
var QuoteChar = 17;
var DoubleQuoteChar = 18;
var BackQuoteChar = 19;
var SurprisedChar = 20;
var SharpChar = 21;
var DollarChar = 22;
var PercentChar = 23;
var AndChar = 24;
var StarChar = 25;
var PlusChar = 26;
var CommaChar = 27;
var MinusChar = 28;
var DotChar = 29;
var SlashChar = 30;
var ColonChar = 31;
var SemiColonChar = 32;
var EqualChar = 33;
var QuestionChar = 34;
var AtmarkChar = 35;
var VarChar = 36;
var ChilderChar = 37;
var BackSlashChar = 38;
var HatChar = 39;
var UnicodeChar = 40;
var MaxSizeOfChars = 41;

var CharMatrix = [
    0,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    TabChar,
    NewLineChar,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    SpaceChar,
    SurprisedChar,
    DoubleQuoteChar,
    SharpChar,
    DollarChar,
    PercentChar,
    AndChar,
    QuoteChar,
    OpenParChar,
    CloseParChar,
    StarChar,
    PlusChar,
    CommaChar,
    MinusChar,
    DotChar,
    SlashChar,
    DigitChar,
    DigitChar,
    DigitChar,
    DigitChar,
    DigitChar,
    DigitChar,
    DigitChar,
    DigitChar,
    DigitChar,
    DigitChar,
    ColonChar,
    SemiColonChar,
    LessThanChar,
    EqualChar,
    GreaterThanChar,
    QuestionChar,
    AtmarkChar,
    UpperAlphaChar,
    UpperAlphaChar,
    UpperAlphaChar,
    UpperAlphaChar,
    UpperAlphaChar,
    UpperAlphaChar,
    UpperAlphaChar,
    UpperAlphaChar,
    UpperAlphaChar,
    UpperAlphaChar,
    UpperAlphaChar,
    UpperAlphaChar,
    UpperAlphaChar,
    UpperAlphaChar,
    UpperAlphaChar,
    UpperAlphaChar,
    UpperAlphaChar,
    UpperAlphaChar,
    UpperAlphaChar,
    UpperAlphaChar,
    UpperAlphaChar,
    UpperAlphaChar,
    UpperAlphaChar,
    UpperAlphaChar,
    UpperAlphaChar,
    UpperAlphaChar,
    OpenBracketChar,
    BackSlashChar,
    CloseBracketChar,
    HatChar,
    UnderBarChar,
    BackQuoteChar,
    LowerAlphaChar,
    LowerAlphaChar,
    LowerAlphaChar,
    LowerAlphaChar,
    LowerAlphaChar,
    LowerAlphaChar,
    LowerAlphaChar,
    LowerAlphaChar,
    LowerAlphaChar,
    LowerAlphaChar,
    LowerAlphaChar,
    LowerAlphaChar,
    LowerAlphaChar,
    LowerAlphaChar,
    LowerAlphaChar,
    LowerAlphaChar,
    LowerAlphaChar,
    LowerAlphaChar,
    LowerAlphaChar,
    LowerAlphaChar,
    LowerAlphaChar,
    LowerAlphaChar,
    LowerAlphaChar,
    LowerAlphaChar,
    LowerAlphaChar,
    LowerAlphaChar,
    OpenBraceChar,
    VarChar,
    CloseBraceChar,
    ChilderChar,
    1
];

var NullToken = new GtToken("", 0);

var SourceTokenFlag = 1;
var ErrorTokenFlag = (1 << 1);
var IndentTokenFlag = (1 << 2);
var WhiteSpaceTokenFlag = (1 << 3);
var DelimTokenFlag = (1 << 4);

var TrackbackParseFlag = 1;
var SkipIndentParseFlag = (1 << 1);

var NoWhere = -1;

var UnaryTerm = 0;

var LeftHandTerm = 0;
var RightHandTerm = 1;

var IfCond = 0;
var IfThen = 1;
var IfElse = 2;

var WhileCond = 0;
var WhileBody = 1;

var ReturnExpr = 0;

var VarDeclType = 0;
var VarDeclName = 1;
var VarDeclValue = 2;
var VarDeclScope = 3;

var CallExpressionOffset = 0;
var CallParameterOffset = 1;

var FuncDeclReturnType = 0;
var FuncDeclClass = 1;
var FuncDeclName = 2;
var FuncDeclBlock = 3;
var FuncDeclParam = 4;

var TokenFuncSpec = 0;
var SymbolPatternSpec = 1;
var ExtendedPatternSpec = 2;

var BinaryOperator = 1;
var LeftJoin = 1 << 1;
var PrecedenceShift = 2;
var Precedence_CStyleValue = (1 << PrecedenceShift);
var Precedence_CPPStyleScope = (50 << PrecedenceShift);
var Precedence_CStyleSuffixCall = (100 << PrecedenceShift);
var Precedence_CStylePrefixOperator = (200 << PrecedenceShift);

var Precedence_CStyleMUL = (400 << PrecedenceShift);
var Precedence_CStyleADD = (500 << PrecedenceShift);
var Precedence_CStyleSHIFT = (600 << PrecedenceShift);
var Precedence_CStyleCOMPARE = (700 << PrecedenceShift);
var Precedence_CStyleEquals = (800 << PrecedenceShift);
var Precedence_CStyleBITAND = (900 << PrecedenceShift);
var Precedence_CStyleBITXOR = (1000 << PrecedenceShift);
var Precedence_CStyleBITOR = (1100 << PrecedenceShift);
var Precedence_CStyleAND = (1200 << PrecedenceShift);
var Precedence_CStyleOR = (1300 << PrecedenceShift);
var Precedence_CStyleTRINARY = (1400 << PrecedenceShift);
var Precedence_CStyleAssign = (1500 << PrecedenceShift);
var Precedence_CStyleCOMMA = (1600 << PrecedenceShift);
var Precedence_Error = (1700 << PrecedenceShift);
var Precedence_Statement = (1900 << PrecedenceShift);
var Precedence_CStyleDelim = (2000 << PrecedenceShift);

var DefaultTypeCheckPolicy = 0;
var NoCheckPolicy = 1;
var IgnoreEmptyPolicy = (1 << 1);
var AllowEmptyPolicy = (1 << 2);
var AllowVoidPolicy = (1 << 3);
var AllowCoercionPolicy = (1 << 4);

var GlobalConstName = "global";

var SymbolList = new Array();
var SymbolMap = new Object();

var AnyGetter = null;

var UseBuiltInTest = true;
var DebugPrintOption = true;

var TestTokenizer = 1 << 0;
var TestParseOnly = 1 << 1;
var TestTypeChecker = 1 << 2;
var TestCodeGeneration = 1 << 3;

function println(msg) {
    LangDeps.println(msg);
}

function DebugP(msg) {
    if (DebugPrintOption) {
        LangDeps.println("DEBUG" + LangDeps.GetStackInfo(2) + ": " + msg);
    }
}

function TODO(msg) {
    LangDeps.println("TODO" + LangDeps.GetStackInfo(2) + ": " + msg);
}

function Indent(Level) {
    var i = 0;
    var s = "";
    while (i < Level) {
        s = s + " ";
        i += 1;
    }
    return s;
}

function ListSize(a) {
    return (a == null) ? 0 : a.length;
}

function IsFlag(flag, flag2) {
    return ((flag & flag2) == flag2);
}

function FromJavaChar(c) {
    if (c < 128) {
        return CharMatrix[c];
    }
    return UnicodeChar;
}

function IsGetterSymbol(SymbolId) {
    return IsFlag(SymbolId, GetterSymbolMask);
}

function IsSetterSymbol(SymbolId) {
    return IsFlag(SymbolId, SetterSymbolMask);
}

function ToSetterSymbol(SymbolId) {
    assert(IsGetterSymbol(SymbolId));
    return (SymbolId & (~GetterSymbolMask)) | SetterSymbolMask;
}

function MaskSymbol(SymbolId, Mask) {
    return (SymbolId << SymbolMaskSize) | Mask;
}

function UnmaskSymbol(SymbolId) {
    return SymbolId >> SymbolMaskSize;
}

function StringfySymbol(SymbolId) {
    var Key = SymbolList.get(UnmaskSymbol(SymbolId));
    if (IsFlag(SymbolId, GetterSymbolMask)) {
        return GetterPrefix + Key;
    }
    if (IsFlag(SymbolId, SetterSymbolMask)) {
        return SetterPrefix + Key;
    }
    if (IsFlag(SymbolId, MetaSymbolMask)) {
        return MetaPrefix + Key;
    }
    return Key;
}

function GetSymbolId(Symbol, DefaultSymbolId) {
    var Key = Symbol;
    var Mask = 0;
    if (Symbol.length >= 3 && LangDeps.CharAt(Symbol, 1) == ('e'.charCodeAt(0)) && LangDeps.CharAt(Symbol, 2) == ('t'.charCodeAt(0))) {
        if (LangDeps.CharAt(Symbol, 0) == ('g'.charCodeAt(0)) && LangDeps.CharAt(Symbol, 0) == ('G'.charCodeAt(0))) {
            Key = Symbol.substring(3);
            Mask = GetterSymbolMask;
        }
        if (LangDeps.CharAt(Symbol, 0) == ('s'.charCodeAt(0)) && LangDeps.CharAt(Symbol, 0) == ('S'.charCodeAt(0))) {
            Key = Symbol.substring(3);
            Mask = SetterSymbolMask;
        }
    }
    if (Symbol.startsWith("\\")) {
        Mask = MetaSymbolMask;
    }
    var SymbolObject = SymbolMap.get(Key);
    if (SymbolObject == null) {
        if (DefaultSymbolId == AllowNewId) {
            var SymbolId = SymbolList.length;
            SymbolList.add(Key);
            SymbolMap.put(Key, SymbolId);
            return MaskSymbol(SymbolId, Mask);
        }
        return DefaultSymbolId;
    }
    return MaskSymbol(SymbolObject, Mask);
}

function CanonicalSymbol(Symbol) {
    return Symbol.toLowerCase().replaceAll("_", "");
}

function GetCanonicalSymbolId(Symbol) {
    return GetSymbolId(CanonicalSymbol(Symbol), AllowNewId);
}

function ApplyTokenFunc(TokenFunc, TokenContext, ScriptSource, Pos) {
    while (TokenFunc != null) {
        var f = TokenFunc.Func;
        var NextIdx = LangDeps.ApplyTokenFunc(f.Self, f.Method, TokenContext, ScriptSource, Pos);
        if (NextIdx > Pos)
            return NextIdx;
        TokenFunc = TokenFunc.ParentFunc;
    }
    return NoMatch;
}

function MergeSyntaxPattern(Pattern, Parent) {
    if (Parent == null)
        return Pattern;
    var MergedPattern = new SyntaxPattern(Pattern.PackageNameSpace, Pattern.PatternName, Pattern.MatchFunc, Pattern.TypeFunc);
    MergedPattern.ParentPattern = Parent;
    return MergedPattern;
}

function IsEmptyOrError(Tree) {
    return Tree == null || Tree.IsEmptyOrError();
}

function LinkTree(LastNode, Node) {
    Node.PrevTree = LastNode;
    if (LastNode != null) {
        LastNode.NextTree = Node;
    }
    return Node;
}

function TreeHead(Tree) {
    if (Tree != null) {
        while (Tree.PrevTree != null) {
            Tree = Tree.PrevTree;
        }
    }
    return Tree;
}

function ApplySyntaxPattern(Pattern, LeftTree, TokenContext) {
    var Pos = TokenContext.Pos;
    var ParseFlag = TokenContext.ParseFlag;
    var CurrentPattern = Pattern;
    while (CurrentPattern != null) {
        var f = CurrentPattern.MatchFunc;
        TokenContext.Pos = Pos;
        if (CurrentPattern.ParentPattern != null) {
            TokenContext.ParseFlag = ParseFlag | TrackbackParseFlag;
        }
        DebugP("B :" + Indent(TokenContext.IndentLevel) + CurrentPattern + ", next=" + CurrentPattern.ParentPattern);
        TokenContext.IndentLevel += 1;
        var ParsedTree = LangDeps.ApplyMatchFunc(f.Self, f.Method, CurrentPattern, LeftTree, TokenContext);
        TokenContext.IndentLevel -= 1;
        if (ParsedTree != null && ParsedTree.IsEmpty())
            ParsedTree = null;
        DebugP("E :" + Indent(TokenContext.IndentLevel) + CurrentPattern + " => " + ParsedTree);
        TokenContext.ParseFlag = ParseFlag;
        if (ParsedTree != null) {
            return ParsedTree;
        }
        CurrentPattern = CurrentPattern.ParentPattern;
    }
    if (TokenContext.IsAllowedTrackback()) {
        TokenContext.Pos = Pos;
    }
    if (Pattern == null) {
        DebugP("undefinedpattern: syntax: " + Pattern);
    }
    return TokenContext.ReportExpectedPattern(Pattern);
}

function ParseExpression(TokenContext) {
    var Pattern = TokenContext.GetFirstPattern();
    var LeftTree = ApplySyntaxPattern(Pattern, null, TokenContext);
    while (!IsEmptyOrError(LeftTree)) {
        var ExtendedPattern = TokenContext.GetExtendedPattern();
        if (ExtendedPattern == null) {
            DebugP("In $Expression$ ending: " + TokenContext.GetToken());
            break;
        }
        LeftTree = ApplySyntaxPattern(ExtendedPattern, LeftTree, TokenContext);
    }
    return LeftTree;
}

function TestSyntaxPattern(Context, Text) {
    var TestLevel = TestTypeChecker;
    var NameSpace = Context.DefaultNameSpace;
    var TokenContext = new TokenContext(NameSpace, Text, 1);
    var ParsedTree = ParseExpression(TokenContext);
    assert(ParsedTree != null);
    if ((TestLevel & TestTypeChecker) != TestTypeChecker) {
        return;
    }
    var Gamma = new TypeEnv(NameSpace, null);
    var TNode = Gamma.TypeCheck(ParsedTree, Gamma.AnyType, DefaultTypeCheckPolicy);
    console.log(TNode.toString());
    if ((TestLevel & TestCodeGeneration) == TestCodeGeneration) {
    }
}

function ApplyTypeFunc(TypeFunc, Gamma, ParsedTree, Type) {
    if (TypeFunc == null || TypeFunc.Method == null) {
        DebugP("tryinvoke: toTypeFunc: null");
        return null;
    }
    return LangDeps.ApplyTypeFunc(TypeFunc.Self, TypeFunc.Method, Gamma, ParsedTree, Type);
}

function LinkNode(LastNode, Node) {
    Node.PrevNode = LastNode;
    if (LastNode != null) {
        LastNode.NextNode = Node;
    }
    return Node;
}

var GtToken = (function () {
    function GtToken(text, FileLine) {
        this.TokenFlag = 0;
        this.ParsedText = text;
        this.FileLine = FileLine;
        this.PresetPattern = null;
    }
    GtToken.prototype.IsSource = function () {
        return IsFlag(this.TokenFlag, SourceTokenFlag);
    };

    GtToken.prototype.IsError = function () {
        return IsFlag(this.TokenFlag, ErrorTokenFlag);
    };

    GtToken.prototype.IsIndent = function () {
        return IsFlag(this.TokenFlag, IndentTokenFlag);
    };

    GtToken.prototype.IsDelim = function () {
        return IsFlag(this.TokenFlag, DelimTokenFlag);
    };

    GtToken.prototype.EqualsText = function (text) {
        return this.ParsedText.equals(text);
    };

    GtToken.prototype.toString = function () {
        var TokenText = "";
        if (this.PresetPattern != null) {
            TokenText = "(" + this.PresetPattern.PatternName + ") ";
        }
        return TokenText + this.ParsedText;
    };

    GtToken.prototype.ToErrorToken = function (Message) {
        this.TokenFlag = ErrorTokenFlag;
        this.ParsedText = Message;
        return Message;
    };

    GtToken.prototype.GetErrorMessage = function () {
        assert(this.IsError());
        return this.ParsedText;
    };
    return GtToken;
})();

var TokenFunc = (function () {
    function TokenFunc(Func, Parent) {
        this.Func = Func;
        this.ParentFunc = Parent;
    }
    TokenFunc.prototype.toString = function () {
        return this.Func.Method.toString();
    };
    return TokenFunc;
})();

var TokenContext = (function () {
    function TokenContext(NameSpace, Text, FileLine) {
        this.IndentLevel = 0;
        this.NameSpace = NameSpace;
        this.SourceList = new Array();
        this.Pos = 0;
        this.ParsingLine = FileLine;
        this.ParseFlag = 0;
        this.AddNewToken(Text, SourceTokenFlag, null);
        this.IndentLevel = 0;
    }
    TokenContext.prototype.AddNewToken = function (Text, TokenFlag, PatternName) {
        var Token = new GtToken(Text, this.ParsingLine);
        Token.TokenFlag |= TokenFlag;
        if (PatternName != null) {
            Token.PresetPattern = this.NameSpace.GetPattern(PatternName);
            assert(Token.PresetPattern != null);
        }

        this.SourceList.add(Token);
        return Token;
    };

    TokenContext.prototype.FoundWhiteSpace = function () {
        var Token = this.GetToken();
        Token.TokenFlag |= WhiteSpaceTokenFlag;
    };

    TokenContext.prototype.FoundLineFeed = function (line) {
        this.ParsingLine += line;
    };

    TokenContext.prototype.ReportTokenError = function (Level, Message, TokenText) {
        var Token = this.AddNewToken(TokenText, 0, "$Error$");
        this.NameSpace.ReportError(Level, Token, Message);
    };

    TokenContext.prototype.NewErrorSyntaxTree = function (Token, Message) {
        if (!this.IsAllowedTrackback()) {
            this.NameSpace.ReportError(ErrorLevel, Token, Message);
            var ErrorTree = new SyntaxTree(Token.PresetPattern, this.NameSpace, Token, null);
            return ErrorTree;
        }
        return null;
    };

    TokenContext.prototype.GetBeforeToken = function () {
        var pos = this.Pos - 1;
        while (pos >= 0) {
            var Token = this.SourceList.get(pos);
            if (IsFlag(Token.TokenFlag, IndentTokenFlag)) {
                pos -= 1;
                continue;
            }
            return Token;
        }
        return null;
    };

    TokenContext.prototype.ReportExpectedToken = function (TokenText) {
        if (!this.IsAllowedTrackback()) {
            var Token = this.GetBeforeToken();
            if (Token != null) {
                return this.NewErrorSyntaxTree(Token, TokenText + "expected: is after " + Token.ParsedText);
            }
            Token = this.GetToken();
            assert(Token != NullToken);
            return this.NewErrorSyntaxTree(Token, TokenText + "expected: is at " + Token.ParsedText);
        }
        return null;
    };

    TokenContext.prototype.ReportExpectedPattern = function (Pattern) {
        return this.ReportExpectedToken(Pattern.PatternName);
    };

    TokenContext.prototype.DispatchFunc = function (ScriptSource, GtChar, pos) {
        var TokenFunc = this.NameSpace.GetTokenFunc(GtChar);
        var NextIdx = ApplyTokenFunc(TokenFunc, this, ScriptSource, pos);
        if (NextIdx == NoMatch) {
            DebugP("undefined tokenizer: " + LangDeps.CharAt(ScriptSource, pos));
            this.AddNewToken(ScriptSource.substring(pos), 0, null);
            return ScriptSource.length;
        }
        return NextIdx;
    };

    TokenContext.prototype.Tokenize = function (ScriptSource, CurrentLine) {
        var currentPos = 0;
        var len = ScriptSource.length;
        this.ParsingLine = CurrentLine;
        while (currentPos < len) {
            var gtCode = FromJavaChar(LangDeps.CharAt(ScriptSource, currentPos));
            var nextPos = this.DispatchFunc(ScriptSource, gtCode, currentPos);
            if (currentPos >= nextPos) {
                break;
            }
            currentPos = nextPos;
        }
        this.Dump();
    };

    TokenContext.prototype.GetToken = function () {
        while ((this.Pos < this.SourceList.length)) {
            var Token = this.SourceList.get(this.Pos);
            if (Token.IsSource()) {
                this.SourceList.remove(this.SourceList.length - 1);
                this.Tokenize(Token.ParsedText, Token.FileLine);
                Token = this.SourceList.get(this.Pos);
            }
            if (IsFlag(this.ParseFlag, SkipIndentParseFlag) && Token.IsIndent()) {
                this.Pos += 1;
                continue;
            }
            return Token;
        }
        return NullToken;
    };

    TokenContext.prototype.HasNext = function () {
        return (this.GetToken() != NullToken);
    };

    TokenContext.prototype.Next = function () {
        var Token = this.GetToken();
        this.Pos += 1;
        return Token;
    };

    TokenContext.prototype.GetPattern = function (PatternName) {
        return this.NameSpace.GetPattern(PatternName);
    };

    TokenContext.prototype.GetFirstPattern = function () {
        var Token = this.GetToken();
        if (Token.PresetPattern != null) {
            return Token.PresetPattern;
        }
        var Pattern = this.NameSpace.GetPattern(Token.ParsedText);
        if (Pattern == null) {
            return this.NameSpace.GetPattern("$Symbol$");
        }
        return Pattern;
    };

    TokenContext.prototype.GetExtendedPattern = function () {
        var Token = this.GetToken();
        var Pattern = this.NameSpace.GetExtendedPattern(Token.ParsedText);
        return Pattern;
    };

    TokenContext.prototype.MatchToken = function (TokenText) {
        var Token = this.GetToken();
        if (Token.EqualsText(TokenText)) {
            this.Pos += 1;
            return true;
        }
        return false;
    };

    TokenContext.prototype.GetMatchedToken = function (TokenText) {
        var Token = this.GetToken();
        while (Token != NullToken) {
            this.Pos += 1;
            if (Token.EqualsText(TokenText)) {
                break;
            }
            Token = this.GetToken();
        }
        return Token;
    };

    TokenContext.prototype.IsAllowedTrackback = function () {
        return IsFlag(this.ParseFlag, TrackbackParseFlag);
    };

    TokenContext.prototype.ParsePatternAfter = function (LeftTree, PatternName, IsOptional) {
        var Pos = this.Pos;
        var ParseFlag = this.ParseFlag;
        var Pattern = this.GetPattern(PatternName);
        if (IsOptional) {
            this.ParseFlag |= TrackbackParseFlag;
        }
        var SyntaxTree = ApplySyntaxPattern(Pattern, LeftTree, this);
        this.ParseFlag = ParseFlag;
        if (SyntaxTree != null) {
            return SyntaxTree;
        }
        this.Pos = Pos;
        return null;
    };

    TokenContext.prototype.ParsePattern = function (PatternName, IsOptional) {
        return this.ParsePatternAfter(null, PatternName, IsOptional);
    };

    TokenContext.prototype.SkipEmptyStatement = function () {
        var Token = null;
        while ((Token = this.GetToken()) != NullToken) {
            if (Token.IsIndent() || Token.IsDelim()) {
                this.Pos += 1;
                continue;
            }
            break;
        }
        return (Token != NullToken);
    };

    TokenContext.prototype.Dump = function () {
        var pos = this.Pos;
        while (pos < this.SourceList.length) {
            var token = this.SourceList.get(pos);
            DebugP("[" + pos + "]\t" + token + " : " + token.PresetPattern);
            pos += 1;
        }
    };
    return TokenContext;
})();

var SyntaxPattern = (function () {
    function SyntaxPattern(NameSpace, PatternName, MatchFunc, TypeFunc) {
        this.PackageNameSpace = NameSpace;
        this.PatternName = PatternName;
        this.SyntaxFlag = 0;
        this.MatchFunc = MatchFunc;
        this.TypeFunc = TypeFunc;
        this.ParentPattern = null;
    }
    SyntaxPattern.prototype.toString = function () {
        return this.PatternName + "<" + this.MatchFunc + ">";
    };

    SyntaxPattern.prototype.IsBinaryOperator = function () {
        return IsFlag(this.SyntaxFlag, BinaryOperator);
    };

    SyntaxPattern.prototype.IsLeftJoin = function (Right) {
        var left = this.SyntaxFlag >> PrecedenceShift;
        var right = Right.SyntaxFlag >> PrecedenceShift;
        return (left < right || (left == right && IsFlag(this.SyntaxFlag, LeftJoin) && IsFlag(Right.SyntaxFlag, LeftJoin)));
    };
    return SyntaxPattern;
})();

var SyntaxTree = (function () {
    function SyntaxTree(Pattern, NameSpace, KeyToken, ConstValue) {
        this.NameSpace = NameSpace;
        this.KeyToken = KeyToken;
        this.Pattern = Pattern;
        this.ParentTree = null;
        this.PrevTree = null;
        this.NextTree = null;
        this.TreeList = null;
        this.ConstValue = ConstValue;
    }
    SyntaxTree.prototype.toString = function () {
        var s = "(" + this.KeyToken.ParsedText;
        var i = 0;
        while (i < ListSize(this.TreeList)) {
            var SubTree = this.TreeList.get(i);
            var Entry = SubTree.toString();
            if (ListSize(SubTree.TreeList) == 0) {
                Entry = SubTree.KeyToken.ParsedText;
            }
            s = s + " " + Entry;
            i += 1;
        }
        return s + ")";
    };

    SyntaxTree.prototype.IsError = function () {
        return this.KeyToken.IsError();
    };

    SyntaxTree.prototype.ToError = function (Token) {
        assert(Token.IsError());
        this.KeyToken = Token;
        this.TreeList = null;
    };

    SyntaxTree.prototype.IsEmpty = function () {
        return this.KeyToken == NullToken;
    };

    SyntaxTree.prototype.ToEmpty = function () {
        this.KeyToken = NullToken;
        this.TreeList = null;
        this.Pattern = this.NameSpace.GetPattern("$Empty$");
    };

    SyntaxTree.prototype.IsEmptyOrError = function () {
        return this.KeyToken == NullToken || this.KeyToken.IsError();
    };

    SyntaxTree.prototype.ToEmptyOrError = function (ErrorTree) {
        if (ErrorTree == null) {
            this.ToEmpty();
        } else {
            this.ToError(ErrorTree.KeyToken);
        }
    };

    SyntaxTree.prototype.GetSyntaxTreeAt = function (Index) {
        return this.TreeList.get(Index);
    };

    SyntaxTree.prototype.SetSyntaxTreeAt = function (Index, Tree) {
        if (!this.IsError()) {
            if (Tree.IsError()) {
                this.ToError(Tree.KeyToken);
            } else {
                if (Index >= 0) {
                    if (this.TreeList == null) {
                        this.TreeList = new Array();
                    }
                    if (Index < this.TreeList.length) {
                        this.TreeList.set(Index, Tree);
                        return;
                    }
                    while (this.TreeList.length < Index) {
                        this.TreeList.add(null);
                    }
                    this.TreeList.add(Tree);
                    Tree.ParentTree = this;
                }
            }
        }
    };

    SyntaxTree.prototype.SetMatchedPatternAt = function (Index, TokenContext, PatternName, IsOptional) {
        if (!this.IsEmptyOrError()) {
            var ParsedTree = TokenContext.ParsePattern(PatternName, IsOptional);
            if (ParsedTree != null) {
                this.SetSyntaxTreeAt(Index, ParsedTree);
            } else if (ParsedTree == null && !IsOptional) {
                this.ToEmpty();
            }
        }
    };

    SyntaxTree.prototype.SetMatchedTokenAt = function (Index, TokenContext, TokenText, IsOptional) {
        if (!this.IsEmptyOrError()) {
            var Pos = TokenContext.Pos;
            var Token = TokenContext.Next();
            if (Token.ParsedText.equals(TokenText)) {
                this.SetSyntaxTreeAt(Index, new SyntaxTree(null, TokenContext.NameSpace, Token, null));
            } else {
                TokenContext.Pos = Pos;
                if (!IsOptional) {
                    this.ToEmptyOrError(TokenContext.ReportExpectedToken(TokenText));
                }
            }
        }
    };

    SyntaxTree.prototype.AppendParsedTree = function (Tree) {
        if (!this.IsError()) {
            if (Tree.IsError()) {
                this.ToError(Tree.KeyToken);
            } else {
                if (this.TreeList == null) {
                    this.TreeList = new Array();
                }
                this.TreeList.add(Tree);
            }
        }
    };

    SyntaxTree.prototype.TypeNodeAt = function (Index, Gamma, Type, TypeCheckPolicy) {
        if (this.TreeList != null && Index < this.TreeList.length) {
            var NodeObject = this.TreeList.get(Index);
            var TypedNode = Gamma.TypeCheck(NodeObject, Type, TypeCheckPolicy);
            return TypedNode;
        }
        if (!IsFlag(TypeCheckPolicy, AllowEmptyPolicy) && !IsFlag(TypeCheckPolicy, IgnoreEmptyPolicy)) {
            Gamma.GammaNameSpace.ReportError(ErrorLevel, this.KeyToken, this.KeyToken.ParsedText + "more: needsat: expression " + Index);
            return Gamma.Generator.CreateErrorNode(Type, this);
        }
        return null;
    };
    return SyntaxTree;
})();

var GtObject = (function () {
    function GtObject(Type) {
        this.Type = Type;
    }
    return GtObject;
})();

var GtType = (function () {
    function GtType(Context, ClassFlag, ClassName, DefaultNullValue) {
        this.Context = Context;
        this.ClassFlag = ClassFlag;
        this.ShortClassName = ClassName;
        this.SuperClass = null;
        this.BaseClass = this;
        this.DefaultNullValue = DefaultNullValue;
        this.LocalSpec = null;
        this.ClassId = Context.ClassCount;
        Context.ClassCount += 1;
    }
    GtType.prototype.toString = function () {
        return this.ShortClassName;
    };

    GtType.prototype.Accept = function (Type) {
        if (this == Type) {
            return true;
        }
        return false;
    };

    GtType.prototype.GetGetter = function (Name) {
        return AnyGetter;
    };

    GtType.prototype.GetMethodId = function (name) {
        return "" + this.ClassId + name;
    };
    return GtType;
})();

var GtLayer = (function () {
    function GtLayer(Name) {
        this.Name = Name;
        this.MethodTable = new Object();
    }
    GtLayer.prototype.LookupUniqueMethod = function (Name) {
        return this.MethodTable.get(Name);
    };

    GtLayer.prototype.LookupMethod = function (Class, Name) {
        var Id = Class.GetMethodId(Name);
        var Method = this.MethodTable.get(Id);
        return Method;
    };

    GtLayer.prototype.DefineMethod = function (Method) {
        var Class = Method.GetRecvType();
        var Id = Class.GetMethodId(Method.MethodName);
        var MethodPrev = this.MethodTable.get(Id);
        Method.ElderMethod = MethodPrev;
        assert(Method.Layer == null);
        Method.Layer = this;
        this.MethodTable.put(Id, Method);
    };
    return GtLayer;
})();

var GtParam = (function () {
    function GtParam(TypeList, NameList) {
        this.Types = TypeList;
        this.Names = NameList;
        this.ParamSize = TypeList.length - 1;
    }
    GtParam.prototype.Equals = function (Other) {
        var ParamSize = Other.ParamSize;
        if (ParamSize == this.ParamSize) {
            var i = 0;
            while (i < ParamSize) {
                if (this.Types.get(i) != Other.Types.get(i)) {
                    return false;
                }
                i += 1;
            }
            return true;
        }
        return false;
    };

    GtParam.prototype.Match = function (ParamSize, ParamList) {
        var i = 0;
        while (i + 1 < ParamSize) {
            var ParamType = this.Types.get(i + 1);
            var GivenType = ParamList.get(i);

            if (!ParamType.equals(GivenType)) {
                return false;
            }
            i += 1;
        }
        return true;
    };
    return GtParam;
})();

var GtDef = (function () {
    function GtDef() {
    }
    GtDef.prototype.MakeDefinition = function (NameSpace) {
    };
    return GtDef;
})();

var GtMethod = (function (_super) {
    __extends(GtMethod, _super);
    function GtMethod(MethodFlag, MethodName, ParamList) {
        _super.call(this);
        this.MethodFlag = MethodFlag;
        this.MethodName = MethodName;
        this.MethodSymbolId = GetCanonicalSymbolId(MethodName);
        this.Types = LangDeps.CompactTypeList(ParamList);
        assert(this.Types.length > 0);
        this.Layer = null;
        this.ElderMethod = null;
    }
    GtMethod.prototype.toString = function () {
        var s = this.MethodName + "(";
        var i = 0;
        while (i < this.GetParamSize()) {
            var ParamType = this.GetParamType(i);
            if (i > 0) {
                s += ", ";
            }
            s += ParamType.ShortClassName;
            i += 1;
        }
        return s + ": " + this.GetReturnType();
    };

    GtMethod.prototype.Is = function (Flag) {
        return IsFlag(this.MethodFlag, Flag);
    };

    GtMethod.prototype.GetReturnType = function () {
        return this.Types[0];
    };

    GtMethod.prototype.GetRecvType = function () {
        return (this.Types.length == 1) ? this.Types[0].Context.VoidType : this.Types[1];
    };

    GtMethod.prototype.GetParamSize = function () {
        return this.Types.length - 1;
    };

    GtMethod.prototype.GetParamType = function (ParamIdx) {
        return this.Types[ParamIdx + 1];
    };
    return GtMethod;
})(GtDef);

var GtMethod2 = (function (_super) {
    __extends(GtMethod2, _super);
    function GtMethod2() {
        _super.apply(this, arguments);
    }
    GtMethod2.prototype.DoCompilation = function () {
    };
    return GtMethod2;
})(GtDef);

var VariableInfo = (function () {
    function VariableInfo(Type, Name, Index) {
        this.Type = Type;
        this.Name = Name;
        this.LocalName = Name + Index;
    }
    return VariableInfo;
})();

var GtDelegate = (function () {
    function GtDelegate() {
    }
    return GtDelegate;
})();

var TypeEnv = (function () {
    function TypeEnv(GammaNameSpace, Method) {
        this.GammaNameSpace = GammaNameSpace;
        this.Generator = GammaNameSpace.GtContext.Generator;

        this.VoidType = GammaNameSpace.GtContext.VoidType;
        this.BooleanType = GammaNameSpace.GtContext.BooleanType;
        this.IntType = GammaNameSpace.GtContext.IntType;
        this.StringType = GammaNameSpace.GtContext.StringType;
        this.VarType = GammaNameSpace.GtContext.VarType;
        this.AnyType = GammaNameSpace.GtContext.AnyType;

        this.Method = Method;
        this.LocalStackList = new Array();
        this.StackTopIndex = 0;
        if (Method != null) {
            this.InitMethod(Method);
        } else {
            this.ThisType = GammaNameSpace.GetGlobalObject().Type;
            this.AppendDeclaredVariable(this.ThisType, "this");
        }
    }
    TypeEnv.prototype.InitMethod = function (Method) {
        this.ReturnType = Method.GetReturnType();
    };

    TypeEnv.prototype.AppendDeclaredVariable = function (Type, Name) {
        var VarInfo = new VariableInfo(Type, Name, this.StackTopIndex);
        if (this.StackTopIndex < this.LocalStackList.length) {
            this.LocalStackList.add(VarInfo);
        } else {
            this.LocalStackList.add(VarInfo);
        }
        this.StackTopIndex += 1;
        return true;
    };

    TypeEnv.prototype.LookupDeclaredVariable = function (Symbol) {
        var i = this.StackTopIndex - 1;
        while (i >= 0) {
            var VarInfo = this.LocalStackList.get(i);
            if (VarInfo.Name.equals(Symbol)) {
                return VarInfo;
            }
            i -= 1;
        }
        return null;
    };

    TypeEnv.prototype.GuessType = function (Value) {
        TODO("GuessType");
        return this.AnyType;
    };

    TypeEnv.prototype.LookupDelegate = function (Name) {
        TODO("finding delegate");
        return null;
    };

    TypeEnv.prototype.DefaultValueConstNode = function (ParsedTree, Type) {
        if (Type.DefaultNullValue != null) {
            return this.Generator.CreateConstNode(Type, ParsedTree, Type.DefaultNullValue);
        }
        return this.CreateErrorNode(ParsedTree, "undefinedvalue: initial of " + Type);
    };

    TypeEnv.prototype.CreateErrorNode = function (ParsedTree, Message) {
        this.GammaNameSpace.ReportError(ErrorLevel, ParsedTree.KeyToken, Message);
        return this.Generator.CreateErrorNode(this.VoidType, ParsedTree);
    };

    TypeEnv.prototype.TypeEachNode = function (Tree, Type) {
        var Node = ApplyTypeFunc(Tree.Pattern.TypeFunc, this, Tree, Type);
        if (Node == null) {
            Node = this.CreateErrorNode(Tree, "undefinedchecker: type: " + Tree.Pattern);
        }
        return Node;
    };

    TypeEnv.prototype.TypeCheckEachNode = function (Tree, Type, TypeCheckPolicy) {
        var Node = this.TypeEachNode(Tree, Type);
        if (Node.IsError()) {
            return Node;
        }
        return Node;
    };

    TypeEnv.prototype.TypeCheck = function (ParsedTree, Type, TypeCheckPolicy) {
        return this.TypeBlock(ParsedTree, Type);
    };

    TypeEnv.prototype.TypeBlock = function (ParsedTree, Type) {
        var StackTopIndex = this.StackTopIndex;
        var LastNode = null;
        while (ParsedTree != null) {
            var CurrentType = (ParsedTree.NextTree != null) ? this.VoidType : Type;
            var TypedNode = this.TypeCheckEachNode(ParsedTree, CurrentType, DefaultTypeCheckPolicy);
            LastNode = LinkNode(LastNode, TypedNode);
            if (TypedNode.IsError()) {
                break;
            }
            ParsedTree = ParsedTree.NextTree;
        }
        this.StackTopIndex = StackTopIndex;
        return (LastNode == null) ? null : LastNode.MoveHeadNode();
    };
    return TypeEnv;
})();

var GtSpec = (function () {
    function GtSpec(SpecType, SpecKey, SpecBody) {
        this.SpecType = SpecType;
        this.SpecKey = SpecKey;
        this.SpecBody = SpecBody;
    }
    return GtSpec;
})();

var GtNameSpace = (function () {
    function GtNameSpace(GtContext, ParentNameSpace) {
        this.GtContext = GtContext;
        this.ParentNameSpace = ParentNameSpace;
        if (ParentNameSpace != null) {
            this.PackageName = ParentNameSpace.PackageName;
        }
        this.ImportedNameSpaceList = null;
        this.PublicSpecList = new Array();
        this.PrivateSpecList = null;
        this.TokenMatrix = null;
        this.SymbolPatternTable = null;
        this.ExtendedPatternTable = null;
    }
    GtNameSpace.prototype.RemakeTokenMatrixEach = function (NameSpace) {
        var i = 0;
        while (i < ListSize(NameSpace.PublicSpecList)) {
            var Spec = NameSpace.PublicSpecList.get(i);
            if (Spec.SpecType == TokenFuncSpec) {
                var j = 0;
                while (j < Spec.SpecKey.length) {
                    var kchar = FromJavaChar(LangDeps.CharAt(Spec.SpecKey, j));
                    var Func = Spec.SpecBody;
                    this.TokenMatrix[kchar] = LangDeps.CreateOrReuseTokenFunc(Func, this.TokenMatrix[kchar]);
                    j += 1;
                }
            }
            i += 1;
        }
    };

    GtNameSpace.prototype.RemakeTokenMatrix = function (NameSpace) {
        if (NameSpace.ParentNameSpace != null) {
            this.RemakeTokenMatrix(NameSpace.ParentNameSpace);
        }
        this.RemakeTokenMatrixEach(NameSpace);
        var i = 0;
        while (i < ListSize(NameSpace.ImportedNameSpaceList)) {
            var Imported = NameSpace.ImportedNameSpaceList.get(i);
            this.RemakeTokenMatrixEach(Imported);
            i += 1;
        }
    };

    GtNameSpace.prototype.GetTokenFunc = function (GtChar2) {
        if (this.TokenMatrix == null) {
            this.TokenMatrix = new TokenFunc[MaxSizeOfChars]();
            this.RemakeTokenMatrix(this);
        }
        return this.TokenMatrix[GtChar2];
    };

    GtNameSpace.prototype.DefineTokenFunc = function (keys, f) {
        this.PublicSpecList.add(new GtSpec(TokenFuncSpec, keys, f));
        this.TokenMatrix = null;
    };

    GtNameSpace.prototype.TableAddSpec = function (Table, Spec) {
        var Body = Spec.SpecBody;
        if (Body instanceof SyntaxPattern) {
            var Parent = Table.get(Spec.SpecKey);
            if (Parent instanceof SyntaxPattern) {
                Body = MergeSyntaxPattern(Body, Parent);
            }
        }
        Table.put(Spec.SpecKey, Body);
    };

    GtNameSpace.prototype.RemakeSymbolTableEach = function (NameSpace, SpecList) {
        var i = 0;
        while (i < ListSize(SpecList)) {
            var Spec = SpecList.get(i);
            if (Spec.SpecType == SymbolPatternSpec) {
                this.TableAddSpec(this.SymbolPatternTable, Spec);
            } else if (Spec.SpecType == ExtendedPatternSpec) {
                this.TableAddSpec(this.ExtendedPatternTable, Spec);
            }
            i += 1;
        }
    };

    GtNameSpace.prototype.RemakeSymbolTable = function (NameSpace) {
        if (NameSpace.ParentNameSpace != null) {
            this.RemakeSymbolTable(NameSpace.ParentNameSpace);
        }
        this.RemakeSymbolTableEach(NameSpace, NameSpace.PublicSpecList);
        this.RemakeSymbolTableEach(NameSpace, NameSpace.PrivateSpecList);
        var i = 0;
        while (i < ListSize(NameSpace.ImportedNameSpaceList)) {
            var Imported = NameSpace.ImportedNameSpaceList.get(i);
            this.RemakeSymbolTableEach(Imported, Imported.PublicSpecList);
            i += 1;
        }
    };

    GtNameSpace.prototype.GetSymbol = function (Key) {
        if (this.SymbolPatternTable == null) {
            this.SymbolPatternTable = new Object();
            this.ExtendedPatternTable = new Object();
            this.RemakeSymbolTable(this);
        }
        return this.SymbolPatternTable.get(Key);
    };

    GtNameSpace.prototype.GetPattern = function (PatternName) {
        var Body = this.GetSymbol(PatternName);
        return (Body instanceof SyntaxPattern) ? Body : null;
    };

    GtNameSpace.prototype.GetExtendedPattern = function (PatternName) {
        if (this.ExtendedPatternTable == null) {
            this.SymbolPatternTable = new Object();
            this.ExtendedPatternTable = new Object();
            this.RemakeSymbolTable(this);
        }
        var Body = this.ExtendedPatternTable.get(PatternName);
        return (Body instanceof SyntaxPattern) ? Body : null;
    };

    GtNameSpace.prototype.DefineSymbol = function (Key, Value) {
        var Spec = new GtSpec(SymbolPatternSpec, Key, Value);
        this.PublicSpecList.add(Spec);
        if (this.SymbolPatternTable != null) {
            this.TableAddSpec(this.SymbolPatternTable, Spec);
        }
    };

    GtNameSpace.prototype.DefinePrivateSymbol = function (Key, Value) {
        var Spec = new GtSpec(SymbolPatternSpec, Key, Value);
        if (this.PrivateSpecList == null) {
            this.PrivateSpecList = new Array();
        }
        this.PrivateSpecList.add(Spec);
        if (this.SymbolPatternTable != null) {
            this.TableAddSpec(this.SymbolPatternTable, Spec);
        }
    };

    GtNameSpace.prototype.DefineSyntaxPattern = function (PatternName, MatchFunc, TypeFunc) {
        var Pattern = new SyntaxPattern(this, PatternName, MatchFunc, TypeFunc);
        var Spec = new GtSpec(SymbolPatternSpec, PatternName, Pattern);
        this.PublicSpecList.add(Spec);
        if (this.SymbolPatternTable != null) {
            this.TableAddSpec(this.SymbolPatternTable, Spec);
        }
    };

    GtNameSpace.prototype.DefineExtendedPattern = function (PatternName, SyntaxFlag, MatchFunc, TypeFunc) {
        var Pattern = new SyntaxPattern(this, PatternName, MatchFunc, TypeFunc);
        Pattern.SyntaxFlag = SyntaxFlag;
        var Spec = new GtSpec(ExtendedPatternSpec, PatternName, Pattern);
        this.PublicSpecList.add(Spec);
        if (this.ExtendedPatternTable != null) {
            this.TableAddSpec(this.ExtendedPatternTable, Spec);
        }
    };

    GtNameSpace.prototype.DefineClass = function (ClassInfo) {
        if (ClassInfo.PackageNameSpace == null) {
            ClassInfo.PackageNameSpace = this;
            if (this.PackageName != null) {
                this.GtContext.ClassNameMap.put(this.PackageName + "." + ClassInfo.ShortClassName, ClassInfo);
            }
            this.GtContext.Generator.AddClass(ClassInfo);
        }
        this.DefineSymbol(ClassInfo.ShortClassName, ClassInfo);
        return ClassInfo;
    };

    GtNameSpace.prototype.CreateGlobalObject = function (ClassFlag, ShortName) {
        var NewClass = new GtType(this.GtContext, ClassFlag, ShortName, null);
        var GlobalObject = new GtObject(NewClass);
        NewClass.DefaultNullValue = GlobalObject;
        return GlobalObject;
    };

    GtNameSpace.prototype.GetGlobalObject = function () {
        var GlobalObject = this.GetSymbol(GlobalConstName);
        if (GlobalObject == null || !(GlobalObject instanceof GtObject)) {
            GlobalObject = this.CreateGlobalObject(SingletonClass, "global");
            this.DefinePrivateSymbol(GlobalConstName, GlobalObject);
        }
        return GlobalObject;
    };

    GtNameSpace.prototype.ImportNameSpace = function (ImportedNameSpace) {
        if (this.ImportedNameSpaceList == null) {
            this.ImportedNameSpaceList = new Array();
            this.ImportedNameSpaceList.add(ImportedNameSpace);
        }
        this.TokenMatrix = null;
        this.SymbolPatternTable = null;
        this.ExtendedPatternTable = null;
    };

    GtNameSpace.prototype.Eval = function (ScriptSource, FileLine, Generator) {
        var ResultValue = null;
        DebugP("Eval: " + ScriptSource);
        var TokenContext = new TokenContext(this, ScriptSource, FileLine);
        while (TokenContext.HasNext()) {
            var Tree = ParseExpression(TokenContext);
            DebugP("untyped tree: " + Tree);
            var Gamma = new TypeEnv(this, null);
            var Node = Gamma.TypeCheckEachNode(Tree, Gamma.VoidType, DefaultTypeCheckPolicy);
            ResultValue = Generator.Eval(Node);
        }
        return ResultValue;
    };

    GtNameSpace.prototype.LookupMethod = function (MethodName, ParamSize) {
        return null;
    };

    GtNameSpace.prototype.GetSourcePosition = function (FileLine) {
        return "(eval:" + FileLine + ")";
    };

    GtNameSpace.prototype.ReportError = function (Level, Token, Message) {
        if (!Token.IsError()) {
            if (Level == ErrorLevel) {
                Message = "(error) " + this.GetSourcePosition(Token.FileLine) + " " + Message;
                Token.ToErrorToken(Message);
            } else if (Level == WarningLevel) {
                Message = "(warning) " + this.GetSourcePosition(Token.FileLine) + " " + Message;
            } else if (Level == InfoLevel) {
                Message = "(info) " + this.GetSourcePosition(Token.FileLine) + " " + Message;
            }
            println(Message);
            return Message;
        }
        return Token.GetErrorMessage();
    };
    return GtNameSpace;
})();

var GtGrammar = (function () {
    function GtGrammar() {
    }
    GtGrammar.prototype.LoadTo = function (NameSpace) {
    };
    return GtGrammar;
})();

var KonohaGrammar = (function (_super) {
    __extends(KonohaGrammar, _super);
    function KonohaGrammar() {
        _super.apply(this, arguments);
    }
    KonohaGrammar.WhiteSpaceToken = function (TokenContext, SourceText, pos) {
        TokenContext.FoundWhiteSpace();
        while (pos < SourceText.length) {
            var ch = LangDeps.CharAt(SourceText, pos);
            if (!LangDeps.IsWhitespace(ch)) {
                break;
            }
            pos += 1;
        }
        return pos;
    };

    KonohaGrammar.IndentToken = function (TokenContext, SourceText, pos) {
        var LineStart = pos + 1;
        TokenContext.FoundLineFeed(1);
        pos = pos + 1;
        while (pos < SourceText.length) {
            var ch = LangDeps.CharAt(SourceText, pos);
            if (!LangDeps.IsWhitespace(ch)) {
                break;
            }
            pos += 1;
        }
        var Text = "";
        if (LineStart < pos) {
            Text = SourceText.substring(LineStart, pos);
        }
        TokenContext.AddNewToken(Text, IndentTokenFlag, null);
        return pos;
    };

    KonohaGrammar.SingleSymbolToken = function (TokenContext, SourceText, pos) {
        TokenContext.AddNewToken(SourceText.substring(pos, pos + 1), 0, null);
        return pos + 1;
    };

    KonohaGrammar.SymbolToken = function (TokenContext, SourceText, pos) {
        var start = pos;
        while (pos < SourceText.length) {
            var ch = LangDeps.CharAt(SourceText, pos);
            if (!LangDeps.IsLetter(ch) && !LangDeps.IsDigit(ch) && ch != ('_'.charCodeAt(0))) {
                break;
            }
            pos += 1;
        }
        TokenContext.AddNewToken(SourceText.substring(start, pos), 0, null);
        return pos;
    };

    KonohaGrammar.OperatorToken = function (TokenContext, SourceText, pos) {
        var NextPos = pos + 1;
        while (NextPos < SourceText.length) {
            var ch = LangDeps.CharAt(SourceText, NextPos);
            if (LangDeps.IsWhitespace(ch) || LangDeps.IsLetter(ch) || LangDeps.IsDigit(ch)) {
                break;
            }
            var Sub = SourceText.substring(pos, pos + 1);
            if (TokenContext.NameSpace.GetExtendedPattern(Sub) == null) {
                NextPos += 1;
                continue;
            }
            break;
        }
        TokenContext.AddNewToken(SourceText.substring(pos, NextPos), 0, null);
        return NextPos;
    };

    KonohaGrammar.NumberLiteralToken = function (TokenContext, SourceText, pos) {
        var start = pos;
        while (pos < SourceText.length) {
            var ch = LangDeps.CharAt(SourceText, pos);
            if (!LangDeps.IsDigit(ch)) {
                break;
            }
            pos += 1;
        }
        TokenContext.AddNewToken(SourceText.substring(start, pos), 0, "$IntegerLiteral$");
        return pos;
    };

    KonohaGrammar.StringLiteralToken = function (TokenContext, SourceText, pos) {
        var start = pos;
        var prev = ('"'.charCodeAt(0));
        while (pos < SourceText.length) {
            var ch = LangDeps.CharAt(SourceText, pos);
            if (ch == ('"'.charCodeAt(0)) && prev != ('\\'.charCodeAt(0))) {
                TokenContext.AddNewToken(SourceText.substring(start, pos + 1), 0, "$StringLiteral$");
                return pos + 1;
            }
            if (ch == ('\n'.charCodeAt(0))) {
                TokenContext.ReportTokenError(ErrorLevel, "expected \"close: tostring: the literal", SourceText.substring(start, pos));
                TokenContext.FoundLineFeed(1);
                return pos;
            }
            pos = pos + 1;
            prev = ch;
        }
        TokenContext.ReportTokenError(ErrorLevel, "expected \"close: tostring: the literal", SourceText.substring(start, pos));
        return pos;
    };

    KonohaGrammar.ParseType = function (Pattern, LeftTree, TokenContext) {
        var Token = TokenContext.Next();
        var ConstValue = TokenContext.NameSpace.GetSymbol(Token.ParsedText);
        if (ConstValue instanceof GtType) {
            return new SyntaxTree(Pattern, TokenContext.NameSpace, Token, ConstValue);
        }
        return null;
    };

    KonohaGrammar.TypeConst = function (Gamma, ParsedTree, Type) {
        return Gamma.Generator.CreateConstNode(Gamma.GuessType(ParsedTree.ConstValue), ParsedTree, ParsedTree.ConstValue);
    };

    KonohaGrammar.ParseSymbol = function (Pattern, LeftTree, TokenContext) {
        var TypeTree = TokenContext.ParsePattern("$Type$", Optional);
        if (TypeTree != null) {
            var DeclTree = TokenContext.ParsePatternAfter(TypeTree, "$VarDecl$", Optional);
            if (DeclTree != null) {
                return DeclTree;
            }
            DeclTree = TokenContext.ParsePatternAfter(TypeTree, "$FuncDecl$", Optional);
            if (DeclTree != null) {
                return DeclTree;
            }
            return TypeTree;
        }
        var Token = TokenContext.Next();
        var NameSpace = TokenContext.NameSpace;
        var ConstValue = NameSpace.GetSymbol(Token.ParsedText);
        if (!(ConstValue instanceof GtType)) {
            return new SyntaxTree(NameSpace.GetPattern("$Const$"), NameSpace, Token, ConstValue);
        }
        return new SyntaxTree(NameSpace.GetPattern("$Variable$"), NameSpace, Token, null);
    };

    KonohaGrammar.ParseVariable = function (Pattern, LeftTree, TokenContext) {
        var Token = TokenContext.Next();
        var ch = LangDeps.CharAt(Token.ParsedText, 0);
        if (LangDeps.IsLetter(ch) || ch == ('_'.charCodeAt(0))) {
            return new SyntaxTree(Pattern, TokenContext.NameSpace, Token, null);
        }
        return null;
    };

    KonohaGrammar.TypeVariable = function (Gamma, ParsedTree, Type) {
        var Name = ParsedTree.KeyToken.ParsedText;
        var VariableInfo = Gamma.LookupDeclaredVariable(Name);
        if (VariableInfo != null) {
            return Gamma.Generator.CreateLocalNode(Type, ParsedTree, VariableInfo.LocalName);
        }
        var Delegate = Gamma.LookupDelegate(Name);
        if (Delegate != null) {
            return Gamma.Generator.CreateConstNode(Delegate.Type, ParsedTree, Delegate);
        }
        return Gamma.CreateErrorNode(ParsedTree, "undefined name: " + Name);
    };

    KonohaGrammar.ParseVarDecl = function (Pattern, LeftTree, TokenContext) {
        var Tree = new SyntaxTree(Pattern, TokenContext.NameSpace, TokenContext.GetToken(), null);
        if (LeftTree == null) {
            Tree.SetMatchedPatternAt(VarDeclType, TokenContext, "$Type$", Required);
        } else {
            Tree.SetSyntaxTreeAt(VarDeclType, LeftTree);
        }
        Tree.SetMatchedPatternAt(VarDeclName, TokenContext, "$Variable$", Required);
        if (TokenContext.MatchToken("=")) {
            Tree.SetMatchedPatternAt(VarDeclValue, TokenContext, "$Expression$", Required);
        }
        while (TokenContext.MatchToken(",")) {
            var NextTree = new SyntaxTree(Pattern, TokenContext.NameSpace, Tree.KeyToken, null);
            NextTree.SetSyntaxTreeAt(VarDeclType, Tree.GetSyntaxTreeAt(VarDeclType));
            Tree = LinkTree(Tree, NextTree);
            Tree.SetMatchedPatternAt(VarDeclName, TokenContext, "$Variable$", Required);
            if (TokenContext.MatchToken("=")) {
                Tree.SetMatchedPatternAt(VarDeclValue, TokenContext, "$Expression$", Required);
            }
        }
        return Tree;
    };

    KonohaGrammar.TypeVarDecl = function (Gamma, ParsedTree, Type) {
        var TypeTree = ParsedTree.GetSyntaxTreeAt(VarDeclType);
        var NameTree = ParsedTree.GetSyntaxTreeAt(VarDeclName);
        var ValueTree = ParsedTree.GetSyntaxTreeAt(VarDeclValue);
        var DeclType = TypeTree.ConstValue;
        var VariableName = NameTree.KeyToken.ParsedText;
        if (!Gamma.AppendDeclaredVariable(DeclType, VariableName)) {
            Gamma.CreateErrorNode(TypeTree, "alreadyvariable: defined " + VariableName);
        }
        var VariableNode = Gamma.TypeCheck(NameTree, DeclType, DefaultTypeCheckPolicy);
        var InitValueNode = (ValueTree == null) ? Gamma.DefaultValueConstNode(ParsedTree, DeclType) : Gamma.TypeCheck(ValueTree, DeclType, DefaultTypeCheckPolicy);
        var AssignNode = Gamma.Generator.CreateAssignNode(DeclType, ParsedTree, VariableNode, InitValueNode);
        var BlockNode = Gamma.TypeBlock(ParsedTree.NextTree, Type);
        ParsedTree.NextTree = null;
        LinkNode(AssignNode, BlockNode);
        return Gamma.Generator.CreateLetNode(BlockNode.Type, ParsedTree, DeclType, VariableNode, AssignNode);
    };

    KonohaGrammar.ParseIntegerLiteral = function (Pattern, LeftTree, TokenContext) {
        var Token = TokenContext.Next();
        return new SyntaxTree(Pattern, TokenContext.NameSpace, Token, LangDeps.ParseInt(Token.ParsedText));
    };

    KonohaGrammar.ParseStringLiteral = function (Pattern, LeftTree, TokenContext) {
        var Token = TokenContext.Next();
        TODO("handlingliteral: string");
        return new SyntaxTree(Pattern, TokenContext.NameSpace, Token, Token.ParsedText);
    };

    KonohaGrammar.ParseExpression = function (Pattern, LeftTree, TokenContext) {
        return ParseExpression(TokenContext);
    };

    KonohaGrammar.ParseUnary = function (Pattern, LeftTree, TokenContext) {
        var Token = TokenContext.Next();
        var Tree = new SyntaxTree(Pattern, TokenContext.NameSpace, Token, null);
        Tree.SetMatchedPatternAt(0, TokenContext, "$Expression$", Required);
        return Tree;
    };

    KonohaGrammar.ParseBinary = function (Pattern, LeftTree, TokenContext) {
        var Token = TokenContext.Next();
        var RightTree = ParseExpression(TokenContext);
        if (IsEmptyOrError(RightTree))
            return RightTree;

        if (RightTree.Pattern.IsBinaryOperator()) {
            if (Pattern.IsLeftJoin(RightTree.Pattern)) {
                var NewTree = new SyntaxTree(Pattern, TokenContext.NameSpace, Token, null);
                NewTree.SetSyntaxTreeAt(LeftHandTerm, LeftTree);
                NewTree.SetSyntaxTreeAt(RightHandTerm, RightTree.GetSyntaxTreeAt(LeftHandTerm));
                RightTree.SetSyntaxTreeAt(LeftHandTerm, NewTree);
                return RightTree;
            }
        }
        var NewTree = new SyntaxTree(Pattern, TokenContext.NameSpace, Token, null);
        NewTree.SetSyntaxTreeAt(LeftHandTerm, LeftTree);
        NewTree.SetSyntaxTreeAt(RightHandTerm, RightTree);
        if (RightTree.NextTree != null) {
            LinkTree(NewTree, RightTree.NextTree);
            RightTree.NextTree = null;
        }
        return NewTree;
    };

    KonohaGrammar.TypeBinary = function (Gamma, ParsedTree, Type) {
        var LeftNode = ParsedTree.TypeNodeAt(LeftHandTerm, Gamma, Gamma.VarType, DefaultTypeCheckPolicy);
        var RightNode = ParsedTree.TypeNodeAt(RightHandTerm, Gamma, Gamma.VarType, DefaultTypeCheckPolicy);
        var ParamSize = 2;
        var Operator = ParsedTree.KeyToken.ParsedText;
        var Method = null;
        return Gamma.Generator.CreateBinaryNode(Gamma.AnyType, ParsedTree, null, LeftNode, RightNode);
    };

    KonohaGrammar.ParseField = function (Pattern, LeftTree, TokenContext) {
        TokenContext.MatchToken(".");
        var Token = TokenContext.Next();
        var NewTree = new SyntaxTree(Pattern, TokenContext.NameSpace, Token, null);
        NewTree.AppendParsedTree(LeftTree);
        return NewTree;
    };

    KonohaGrammar.TypeField = function (Gamma, ParsedTree, Type) {
        var ExprNode = ParsedTree.TypeNodeAt(UnaryTerm, Gamma, Gamma.VarType, DefaultTypeCheckPolicy);
        var Method = ExprNode.Type.GetGetter(ParsedTree.KeyToken.ParsedText);
        return Gamma.Generator.CreateGetterNode(Method.GetReturnType(), ParsedTree, Method, ExprNode);
    };

    KonohaGrammar.ParseParenthesis = function (Pattern, LeftTree, TokenContext) {
        var ParseFlag = TokenContext.ParseFlag;
        TokenContext.MatchToken("(");
        TokenContext.ParseFlag |= SkipIndentParseFlag;
        var Tree = TokenContext.ParsePattern("$Expression$", Required);
        if (!TokenContext.MatchToken(")")) {
            Tree = TokenContext.ReportExpectedToken(")");
        }
        TokenContext.ParseFlag = ParseFlag;
        return Tree;
    };

    KonohaGrammar.ParseApply = function (Pattern, LeftTree, TokenContext) {
        var ParseFlag = TokenContext.ParseFlag;
        TokenContext.ParseFlag |= SkipIndentParseFlag;
        var FuncTree = new SyntaxTree(Pattern, TokenContext.NameSpace, TokenContext.GetMatchedToken("("), null);
        FuncTree.AppendParsedTree(LeftTree);
        while (!FuncTree.IsEmptyOrError() && !TokenContext.MatchToken(")")) {
            var Tree = TokenContext.ParsePattern("$Expression$", Required);
            FuncTree.AppendParsedTree(Tree);
            if (TokenContext.MatchToken(","))
                continue;
        }
        TokenContext.ParseFlag = ParseFlag;
        return FuncTree;
    };

    KonohaGrammar.TypeApply = function (Gamma, ParsedTree, Type) {
        var ApplyNode = Gamma.Generator.CreateApplyNode(Gamma.AnyType, ParsedTree, null);
        var i = 0;
        while (i < ListSize(ParsedTree.TreeList)) {
            var ExprNode = ParsedTree.TypeNodeAt(UnaryTerm, Gamma, Gamma.VarType, DefaultTypeCheckPolicy);
            ApplyNode.Append(ExprNode);
            i += 1;
        }
        return ApplyNode;
    };

    KonohaGrammar.ParseEmpty = function (Pattern, LeftTree, TokenContext) {
        return new SyntaxTree(Pattern, TokenContext.NameSpace, NullToken, null);
    };

    KonohaGrammar.TypeEmpty = function (Gamma, ParsedTree, Type) {
        return Gamma.Generator.CreateNullNode(Gamma.VoidType, ParsedTree);
    };

    KonohaGrammar.ParseBlock = function (Pattern, LeftTree, TokenContext) {
        if (TokenContext.MatchToken("{")) {
            var PrevTree = null;
            while (TokenContext.SkipEmptyStatement()) {
                if (TokenContext.MatchToken("}"))
                    break;
                var CurrentTree = ParseExpression(TokenContext);
                if (IsEmptyOrError(CurrentTree))
                    return CurrentTree;
                PrevTree = LinkTree(PrevTree, CurrentTree);
            }
            if (PrevTree == null) {
                return TokenContext.ParsePattern("$Empty$", Required);
            }
            return TreeHead(PrevTree);
        }
        return null;
    };

    KonohaGrammar.ParseStatement = function (Pattern, LeftTree, TokenContext) {
        var StmtTree = TokenContext.ParsePattern("$Block$", Optional);
        if (StmtTree == null) {
            StmtTree = ParseExpression(TokenContext);
        }
        if (StmtTree == null) {
            StmtTree = TokenContext.ParsePattern("$Empty$", Required);
        }
        return StmtTree;
    };

    KonohaGrammar.TypeBlock = function (Gamma, ParsedTree, Type) {
        return Gamma.TypeBlock(ParsedTree, Type);
    };

    KonohaGrammar.TypeAnd = function (Gamma, ParsedTree, Type) {
        var LeftNode = ParsedTree.TypeNodeAt(LeftHandTerm, Gamma, Gamma.BooleanType, DefaultTypeCheckPolicy);
        var RightNode = ParsedTree.TypeNodeAt(RightHandTerm, Gamma, Gamma.BooleanType, DefaultTypeCheckPolicy);
        return Gamma.Generator.CreateAndNode(Gamma.BooleanType, ParsedTree, LeftNode, RightNode);
    };

    KonohaGrammar.TypeOr = function (Gamma, ParsedTree, Type) {
        var LeftNode = ParsedTree.TypeNodeAt(LeftHandTerm, Gamma, Gamma.BooleanType, DefaultTypeCheckPolicy);
        var RightNode = ParsedTree.TypeNodeAt(RightHandTerm, Gamma, Gamma.BooleanType, DefaultTypeCheckPolicy);
        return Gamma.Generator.CreateOrNode(Gamma.BooleanType, ParsedTree, LeftNode, RightNode);
    };

    KonohaGrammar.ParseIf = function (Pattern, LeftTree, TokenContext) {
        var Token = TokenContext.GetMatchedToken("if");
        var NewTree = new SyntaxTree(Pattern, TokenContext.NameSpace, Token, null);
        NewTree.SetMatchedTokenAt(NoWhere, TokenContext, "(", Required);
        NewTree.SetMatchedPatternAt(IfCond, TokenContext, "$Expression$", Required);
        NewTree.SetMatchedTokenAt(NoWhere, TokenContext, ")", Required);
        NewTree.SetMatchedPatternAt(IfThen, TokenContext, "$Statement$", Required);
        if (TokenContext.MatchToken("else")) {
            NewTree.SetMatchedPatternAt(IfElse, TokenContext, "$Statement$", Required);
        }
        return NewTree;
    };

    KonohaGrammar.TypeIf = function (Gamma, ParsedTree, Type) {
        var CondNode = ParsedTree.TypeNodeAt(IfCond, Gamma, Gamma.BooleanType, DefaultTypeCheckPolicy);
        var ThenNode = ParsedTree.TypeNodeAt(IfThen, Gamma, Type, DefaultTypeCheckPolicy);
        var ElseNode = ParsedTree.TypeNodeAt(IfElse, Gamma, ThenNode.Type, AllowEmptyPolicy);
        return Gamma.Generator.CreateIfNode(ThenNode.Type, ParsedTree, CondNode, ThenNode, ElseNode);
    };

    KonohaGrammar.ParseWhile = function (Pattern, LeftTree, TokenContext) {
        var Token = TokenContext.GetMatchedToken("while");
        var NewTree = new SyntaxTree(Pattern, TokenContext.NameSpace, Token, null);
        NewTree.SetMatchedTokenAt(NoWhere, TokenContext, "(", Required);
        NewTree.SetMatchedPatternAt(WhileCond, TokenContext, "$Expression$", Required);
        NewTree.SetMatchedTokenAt(NoWhere, TokenContext, ")", Required);
        NewTree.SetMatchedPatternAt(WhileBody, TokenContext, "$Block$", Required);
        return NewTree;
    };

    KonohaGrammar.TypeWhile = function (Gamma, ParsedTree, Type) {
        var CondNode = ParsedTree.TypeNodeAt(WhileCond, Gamma, Gamma.BooleanType, DefaultTypeCheckPolicy);
        var BodyNode = ParsedTree.TypeNodeAt(WhileBody, Gamma, Type, DefaultTypeCheckPolicy);
        return Gamma.Generator.CreateLoopNode(BodyNode.Type, ParsedTree, CondNode, BodyNode, null);
    };

    KonohaGrammar.ParseReturn = function (Pattern, LeftTree, TokenContext) {
        var Token = TokenContext.GetMatchedToken("return");
        var NewTree = new SyntaxTree(Pattern, TokenContext.NameSpace, Token, null);
        NewTree.SetMatchedPatternAt(ReturnExpr, TokenContext, "$Expression$", Optional);
        return NewTree;
    };

    KonohaGrammar.TypeReturn = function (Gamma, ParsedTree, Type) {
        var Expr = ParsedTree.TypeNodeAt(ReturnExpr, Gamma, Gamma.ReturnType, DefaultTypeCheckPolicy);
        return Gamma.Generator.CreateReturnNode(Expr.Type, ParsedTree, Expr);
    };

    KonohaGrammar.ParseFuncDecl = function (Pattern, LeftTree, TokenContext) {
        var Tree = new SyntaxTree(Pattern, TokenContext.NameSpace, TokenContext.GetToken(), null);
        if (LeftTree == null) {
            Tree.SetMatchedPatternAt(FuncDeclReturnType, TokenContext, "$Type$", Required);
        } else {
            Tree.SetSyntaxTreeAt(FuncDeclReturnType, LeftTree);
        }

        Tree.SetMatchedPatternAt(FuncDeclName, TokenContext, "$FuncName$", Required);
        Tree.SetMatchedTokenAt(NoWhere, TokenContext, "(", Required);
        var ParamBase = FuncDeclParam;
        while (!Tree.IsEmptyOrError() && !TokenContext.MatchToken(")")) {
            Tree.SetMatchedPatternAt(ParamBase + VarDeclType, TokenContext, "$Type$", Required);
            Tree.SetMatchedPatternAt(ParamBase + VarDeclName, TokenContext, "$Symbol$", Required);
            if (TokenContext.MatchToken("=")) {
                Tree.SetMatchedPatternAt(ParamBase + VarDeclValue, TokenContext, "$Expression$", Required);
            }
            ParamBase += 3;
        }
        Tree.SetMatchedPatternAt(FuncDeclBlock, TokenContext, "$Block$", Required);
        return Tree;
    };

    KonohaGrammar.TypeFuncDecl = function (Gamma, Tree, Type) {
        TODO("TypeFuncDecl");

        return null;
    };

    KonohaGrammar.prototype.LoadTo = function (NameSpace) {
        NameSpace.DefineSymbol("true", true);
        NameSpace.DefineSymbol("false", false);

        NameSpace.DefineTokenFunc(" \t", FunctionA(this, "WhiteSpaceToken"));
        NameSpace.DefineTokenFunc("\n", FunctionA(this, "IndentToken"));
        NameSpace.DefineTokenFunc("(){}[]<>.,:;+-*/%=&|!", FunctionA(this, "OperatorToken"));
        NameSpace.DefineTokenFunc("Aa", FunctionA(this, "SymbolToken"));
        NameSpace.DefineTokenFunc("\"", FunctionA(this, "StringLiteralToken"));
        NameSpace.DefineTokenFunc("1", FunctionA(this, "NumberLiteralToken"));

        var ParseUnary = FunctionB(this, "ParseUnary");
        var ParseBinary = FunctionB(this, "ParseBinary");
        var TypeBinary = FunctionC(this, "TypeBinary");
        var TypeUnary = FunctionC(this, "TypeUnary");
        var TypeConst = FunctionC(this, "TypeConst");
        var TypeBlock = FunctionC(this, "TypeBlock");

        NameSpace.DefineSyntaxPattern("+", ParseUnary, TypeUnary);
        NameSpace.DefineSyntaxPattern("-", ParseUnary, TypeUnary);
        NameSpace.DefineSyntaxPattern("!", ParseUnary, TypeUnary);

        NameSpace.DefineExtendedPattern("*", BinaryOperator | Precedence_CStyleMUL, ParseBinary, TypeBinary);
        NameSpace.DefineExtendedPattern("/", BinaryOperator | Precedence_CStyleMUL, ParseBinary, TypeBinary);
        NameSpace.DefineExtendedPattern("%", BinaryOperator | Precedence_CStyleMUL, ParseBinary, TypeBinary);

        NameSpace.DefineExtendedPattern("+", BinaryOperator | Precedence_CStyleADD, ParseBinary, TypeBinary);
        NameSpace.DefineExtendedPattern("-", BinaryOperator | Precedence_CStyleADD, ParseBinary, TypeBinary);

        NameSpace.DefineExtendedPattern("<", BinaryOperator | Precedence_CStyleCOMPARE, ParseBinary, TypeBinary);
        NameSpace.DefineExtendedPattern("<=", BinaryOperator | Precedence_CStyleCOMPARE, ParseBinary, TypeBinary);
        NameSpace.DefineExtendedPattern(">", BinaryOperator | Precedence_CStyleCOMPARE, ParseBinary, TypeBinary);
        NameSpace.DefineExtendedPattern(">=", BinaryOperator | Precedence_CStyleCOMPARE, ParseBinary, TypeBinary);
        NameSpace.DefineExtendedPattern("==", BinaryOperator | Precedence_CStyleEquals, ParseBinary, TypeBinary);
        NameSpace.DefineExtendedPattern("!=", BinaryOperator | Precedence_CStyleEquals, ParseBinary, TypeBinary);

        NameSpace.DefineExtendedPattern("=", BinaryOperator | Precedence_CStyleAssign | LeftJoin, ParseBinary, FunctionC(this, "TypeAssign"));
        NameSpace.DefineExtendedPattern("&&", BinaryOperator | Precedence_CStyleAND, ParseBinary, FunctionC(this, "TypeAnd"));
        NameSpace.DefineExtendedPattern("||", BinaryOperator | Precedence_CStyleOR, ParseBinary, FunctionC(this, "TypeOr"));

        NameSpace.DefineSyntaxPattern("$Symbol$", FunctionB(this, "ParseSymbol"), null);
        NameSpace.DefineSyntaxPattern("$Type$", FunctionB(this, "ParseType"), TypeConst);
        NameSpace.DefineSyntaxPattern("$Variable$", FunctionB(this, "ParseVariable"), FunctionC(this, "ParseVariable"));
        NameSpace.DefineSyntaxPattern("$Const$", FunctionB(this, "ParseConst"), TypeConst);
        NameSpace.DefineSyntaxPattern("$StringLiteral$", FunctionB(this, "ParseStringLiteral"), TypeConst);
        NameSpace.DefineSyntaxPattern("$IntegerLiteral$", FunctionB(this, "ParseIntegerLiteral"), TypeConst);

        NameSpace.DefineSyntaxPattern("(", FunctionB(this, "ParseParenthesis"), null);
        NameSpace.DefineExtendedPattern(".", 0, FunctionB(this, "ParseField"), FunctionC(this, "TypeField"));
        NameSpace.DefineExtendedPattern("(", 0, FunctionB(this, "ParseApply"), FunctionC(this, "TypeField"));

        NameSpace.DefineSyntaxPattern("$Block$", FunctionB(this, "ParseBlock"), TypeBlock);
        NameSpace.DefineSyntaxPattern("$Statement$", FunctionB(this, "ParseStatement"), TypeBlock);

        NameSpace.DefineSyntaxPattern("$FuncDecl$", FunctionB(this, "ParseFuncDecl"), FunctionC(this, "TypeFuncDecl"));
        NameSpace.DefineSyntaxPattern("$VarDecl$", FunctionB(this, "ParseVarDecl"), FunctionC(this, "TypeVarDecl"));
        NameSpace.DefineSyntaxPattern("if", FunctionB(this, "ParseIf"), FunctionC(this, "TypeIf"));
        NameSpace.DefineSyntaxPattern("return", FunctionB(this, "ParseReturn"), FunctionC(this, "ParseReturn"));
        NameSpace.DefineSyntaxPattern("while", FunctionB(this, "ParseWhile"), FunctionC(this, "TypeWhile"));
    };
    return KonohaGrammar;
})(GtGrammar);

var GtContext = (function () {
    function GtContext(Grammar, Generator) {
        this.ClassNameMap = new Object();
        this.Generator = Generator;
        this.RootNameSpace = new GtNameSpace(this, null);
        this.ClassCount = 0;
        this.MethodCount = 0;
        this.VoidType = this.RootNameSpace.DefineClass(new GtType(this, 0, "void", null));
        this.ObjectType = this.RootNameSpace.DefineClass(new GtType(this, 0, "Object", new Object()));
        this.BooleanType = this.RootNameSpace.DefineClass(new GtType(this, 0, "boolean", false));
        this.IntType = this.RootNameSpace.DefineClass(new GtType(this, 0, "number", 0));
        this.StringType = this.RootNameSpace.DefineClass(new GtType(this, 0, "string", ""));
        this.VarType = this.RootNameSpace.DefineClass(new GtType(this, 0, "var", null));
        this.AnyType = this.RootNameSpace.DefineClass(new GtType(this, 0, "any", null));
        Grammar.LoadTo(this.RootNameSpace);
        this.DefaultNameSpace = new GtNameSpace(this, this.RootNameSpace);
    }
    GtContext.prototype.LoadGrammar = function (Grammar) {
        Grammar.LoadTo(this.DefaultNameSpace);
    };

    GtContext.prototype.Define = function (Symbol, Value) {
        this.RootNameSpace.DefineSymbol(Symbol, Value);
    };

    GtContext.prototype.Eval = function (text, FileLine) {
        return this.DefaultNameSpace.Eval(text, FileLine, this.Generator);
    };
    return GtContext;
})();

var GreenTeaScript = (function () {
    function GreenTeaScript() {
    }
    GreenTeaScript.TestAll = function (Context) {
        TestSyntaxPattern(Context, "number");
    };

    GreenTeaScript.main = function (argc) {
        var GtContext = new GtContext(new KonohaGrammar(), new GreenTeaGenerator());

        GreenTeaScript.TestAll(GtContext);
    };
    return GreenTeaScript;
})();
