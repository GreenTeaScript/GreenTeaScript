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

var ExportMethod = 1 << 0;
var UniqueMethod = 1 << 1;
var OperatorMethod = 1 << 2;
var NativeMethod = 1 << 3;

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
var SymbolMap = new GtMap();
var MangleNameMap = new GtMap();

var AnyGetter = null;

var TestTokenizer = 1 << 0;
var TestParseOnly = 1 << 1;
var TestTypeChecker = 1 << 2;
var TestCodeGeneration = 1 << 3;

var DebugPrintOption = true;

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

function JoinStrings(Unit, Times) {
    var s = "";
    var i = 0;
    while (i < Times) {
        s = s + Unit;
        i = i + 1;
    }
    return s;
}

function ListSize(a) {
    if (a == null) {
        return 0;
    }
    return a.size();
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
    LangDeps.Assert(IsGetterSymbol(SymbolId));
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
    if (Symbol.length >= 3 && LangDeps.CharAt(Symbol, 1) == (101) && LangDeps.CharAt(Symbol, 2) == (116)) {
        if (LangDeps.CharAt(Symbol, 0) == (103) && LangDeps.CharAt(Symbol, 0) == (71)) {
            Key = Symbol.substring(3);
            Mask = GetterSymbolMask;
        }
        if (LangDeps.CharAt(Symbol, 0) == (115) && LangDeps.CharAt(Symbol, 0) == (83)) {
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
            var SymbolId = SymbolList.size();
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

function NumberToAscii(number) {
    var num = number / 26;
    var s = LangDeps.CharToString((65 + (number % 26)));
    if (num == 0) {
        return s;
    } else {
        return NumberToAscii(num) + s;
    }
}

function Mangle(BaseType, BaseIdx, TypeList) {
    var s = NumberToAscii(BaseType.ClassId);
    var i = BaseIdx;
    while (i < ListSize(TypeList)) {
        s = s + "." + NumberToAscii(TypeList.get(i).ClassId);
        i = i + 1;
    }
    var MangleName = MangleNameMap.get(s);
    if (MangleName == null) {
        MangleName = NumberToAscii(MangleNameMap.size());
        MangleNameMap.put(s, MangleName);
    }
    return MangleName;
}

function ApplyTokenFunc(TokenFunc, TokenContext, ScriptSource, Pos) {
    while (TokenFunc != null) {
        var delegate = TokenFunc.Func;
        var NextIdx = LangDeps.ApplyTokenFunc(delegate.Self, delegate.Method, TokenContext, ScriptSource, Pos);
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
    var Pos = TokenContext.CurrentPosition;
    var ParseFlag = TokenContext.ParseFlag;
    var CurrentPattern = Pattern;
    while (CurrentPattern != null) {
        var delegate = CurrentPattern.MatchFunc;
        TokenContext.CurrentPosition = Pos;
        if (CurrentPattern.ParentPattern != null) {
            TokenContext.ParseFlag = ParseFlag | TrackbackParseFlag;
        }

        TokenContext.IndentLevel += 1;
        var ParsedTree = LangDeps.ApplyMatchFunc(delegate.Self, delegate.Method, CurrentPattern, LeftTree, TokenContext);
        TokenContext.IndentLevel -= 1;
        if (ParsedTree != null && ParsedTree.IsEmpty())
            ParsedTree = null;

        TokenContext.ParseFlag = ParseFlag;
        if (ParsedTree != null) {
            return ParsedTree;
        }
        CurrentPattern = CurrentPattern.ParentPattern;
    }
    if (TokenContext.IsAllowedTrackback()) {
        TokenContext.CurrentPosition = Pos;
    }
    if (Pattern == null) {
        DebugP("undefinedpattern: syntax: " + Pattern);
    }
    return TokenContext.ReportExpectedPattern(Pattern);
}

function ParseExpression(TokenContext) {
    var Pattern = TokenContext.GetFirstPattern();
    var LeftTree = ApplySyntaxPattern(Pattern, null, TokenContext);
    while (!IsEmptyOrError(LeftTree) && !TokenContext.MatchToken(";")) {
        var ExtendedPattern = TokenContext.GetExtendedPattern();
        if (ExtendedPattern == null) {
            DebugP("In $Expression$ ending: " + TokenContext.GetToken());
            break;
        }
        LeftTree = ApplySyntaxPattern(ExtendedPattern, LeftTree, TokenContext);
    }
    return LeftTree;
}

function ApplyTypeFunc(delegate, Gamma, ParsedTree, Type) {
    if (delegate == null || delegate.Method == null) {
        DebugP("tryinvoke: toTypeFunc: null");
        return null;
    }
    return LangDeps.ApplyTypeFunc(delegate.Self, delegate.Method, Gamma, ParsedTree, Type);
}

function LinkNode(LastNode, Node) {
    Node.PrevNode = LastNode;
    if (LastNode != null) {
        LastNode.NextNode = Node;
    }
    return Node;
}

function TestToken(Context, Source, TokenText, TokenText2) {
    var NameSpace = Context.DefaultNameSpace;
    var TokenContext = new TokenContext(NameSpace, Source, 1);
    LangDeps.Assert(TokenContext.MatchToken(TokenText) && TokenContext.MatchToken(TokenText2));
}

function TestSyntaxPattern(Context, Text) {
    var TestLevel = TestTypeChecker;
    var NameSpace = Context.DefaultNameSpace;
    var TokenContext = new TokenContext(NameSpace, Text, 1);
    var ParsedTree = ParseExpression(TokenContext);
    LangDeps.Assert(ParsedTree != null);
    if ((TestLevel & TestTypeChecker) != TestTypeChecker) {
        return;
    }
    var Gamma = new TypeEnv(NameSpace);
    var TNode = Gamma.TypeCheck(ParsedTree, Gamma.AnyType, DefaultTypeCheckPolicy);
    console.log(TNode.toString());
    if ((TestLevel & TestCodeGeneration) == TestCodeGeneration) {
    }
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
        LangDeps.Assert(this.IsError());
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
        this.CurrentPosition = 0;
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
            LangDeps.Assert(Token.PresetPattern != null);
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
        var pos = this.CurrentPosition - 1;
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
                return this.NewErrorSyntaxTree(Token, TokenText + "expected: after: is " + Token.ParsedText);
            }
            Token = this.GetToken();
            LangDeps.Assert(Token != NullToken);
            return this.NewErrorSyntaxTree(Token, TokenText + "expected: at: is " + Token.ParsedText);
        }
        return null;
    };

    TokenContext.prototype.ReportExpectedPattern = function (Pattern) {
        if (Pattern == null) {
            return this.ReportExpectedToken("null");
        }
        return this.ReportExpectedToken(Pattern.PatternName);
    };

    TokenContext.prototype.Vacume = function () {
        if (this.CurrentPosition > 0) {
            var NewList = new Array();
            var i = this.CurrentPosition;
            while (i < ListSize(this.SourceList)) {
                NewList.add(this.SourceList.get(i));
                i = i + 1;
            }
            this.SourceList = NewList;
            this.CurrentPosition = 0;
        }
    };

    TokenContext.prototype.DispatchFunc = function (ScriptSource, GtChar, pos) {
        var TokenFunc = this.NameSpace.GetTokenFunc(GtChar);
        var NextIdx = ApplyTokenFunc(TokenFunc, this, ScriptSource, pos);
        if (NextIdx == NoMatch) {
            DebugP("tokenizer: undefined: " + LangDeps.CharAt(ScriptSource, pos));
            this.AddNewToken(ScriptSource.substring(pos, pos + 1), 0, null);
            return pos + 1;
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
        while ((this.CurrentPosition < this.SourceList.size())) {
            var Token = this.SourceList.get(this.CurrentPosition);
            if (Token.IsSource()) {
                this.SourceList.remove(this.SourceList.size() - 1);
                this.Tokenize(Token.ParsedText, Token.FileLine);
                Token = this.SourceList.get(this.CurrentPosition);
            }
            if (IsFlag(this.ParseFlag, SkipIndentParseFlag) && Token.IsIndent()) {
                this.CurrentPosition = this.CurrentPosition + 1;
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
        this.CurrentPosition += 1;
        return Token;
    };

    TokenContext.prototype.SkipIndent = function () {
        var Token = this.GetToken();
        while (Token.IsIndent()) {
            this.CurrentPosition = this.CurrentPosition + 1;
            Token = this.GetToken();
        }
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
            this.CurrentPosition += 1;
            return true;
        }
        return false;
    };

    TokenContext.prototype.GetMatchedToken = function (TokenText) {
        var Token = this.GetToken();
        while (Token != NullToken) {
            this.CurrentPosition += 1;
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

    TokenContext.prototype.SetTrackback = function (Allowed) {
        var ParseFlag = this.ParseFlag;
        if (Allowed) {
            this.ParseFlag = this.ParseFlag | TrackbackParseFlag;
        } else {
            this.ParseFlag = (~(TrackbackParseFlag) & this.ParseFlag);
        }
        return ParseFlag;
    };

    TokenContext.prototype.ParsePatternAfter = function (LeftTree, PatternName, IsOptional) {
        var Pos = this.CurrentPosition;
        var ParseFlag = this.ParseFlag;
        var Pattern = this.GetPattern(PatternName);
        if (IsOptional) {
            this.ParseFlag = this.ParseFlag | TrackbackParseFlag;
        }
        var SyntaxTree = ApplySyntaxPattern(Pattern, LeftTree, this);
        this.ParseFlag = ParseFlag;
        if (SyntaxTree != null) {
            return SyntaxTree;
        }
        this.CurrentPosition = Pos;
        return null;
    };

    TokenContext.prototype.ParsePattern = function (PatternName, IsOptional) {
        return this.ParsePatternAfter(null, PatternName, IsOptional);
    };

    TokenContext.prototype.SkipAndGetAnnotation = function (IsAllowedDelim) {
        var Annotation = null;
        this.SkipIndent();
        while (this.MatchToken("@")) {
            var Token = this.Next();
            if (Annotation == null) {
                Annotation = new GtMap();
            }
            Annotation.put(Token.ParsedText, true);
            this.SkipIndent();
        }
        return Annotation;
    };

    TokenContext.prototype.SkipEmptyStatement = function () {
        var Token = null;
        while ((Token = this.GetToken()) != NullToken) {
            if (Token.IsIndent() || Token.IsDelim()) {
                this.CurrentPosition += 1;
                continue;
            }
            break;
        }
        return (Token != NullToken);
    };

    TokenContext.prototype.Dump = function () {
        var pos = this.CurrentPosition;
        while (pos < this.SourceList.size()) {
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
        this.Annotation = null;
    }
    SyntaxTree.prototype.toString = function () {
        var s = "(" + this.KeyToken.ParsedText;
        var i = 0;
        while (i < ListSize(this.TreeList)) {
            var SubTree = this.TreeList.get(i);
            while (SubTree != null) {
                var Entry = SubTree.toString();
                if (ListSize(SubTree.TreeList) == 0) {
                    Entry = SubTree.KeyToken.ParsedText;
                }
                s = s + " " + Entry;
                SubTree = SubTree.NextTree;
            }
            i += 1;
        }
        return s + ")";
    };

    SyntaxTree.prototype.SetAnnotation = function (Annotation) {
        this.Annotation = Annotation;
    };

    SyntaxTree.prototype.HasAnnotation = function (Key) {
        if (this.Annotation != null) {
            var Value = this.Annotation.get(Key);
            if (Value instanceof Boolean) {
                this.Annotation.put(Key, false);
            }
            return (Value != null);
        }
        return false;
    };

    SyntaxTree.prototype.IsError = function () {
        return this.KeyToken.IsError();
    };

    SyntaxTree.prototype.ToError = function (Token) {
        LangDeps.Assert(Token.IsError());
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
        if (this.TreeList != null && Index >= this.TreeList.size()) {
            return null;
        }
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
                    if (Index < this.TreeList.size()) {
                        this.TreeList.set(Index, Tree);
                        return;
                    }
                    while (this.TreeList.size() < Index) {
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
            if (PatternName.equals("$Expression$") && ParsedTree == null) {
                ParsedTree = ParseExpression(TokenContext);
            }
            if (ParsedTree != null) {
                this.SetSyntaxTreeAt(Index, ParsedTree);
            } else if (ParsedTree == null && !IsOptional) {
                this.ToEmpty();
            }
        }
    };

    SyntaxTree.prototype.SetMatchedTokenAt = function (Index, TokenContext, TokenText, IsOptional) {
        if (!this.IsEmptyOrError()) {
            var Pos = TokenContext.CurrentPosition;
            var Token = TokenContext.Next();
            if (Token.ParsedText.equals(TokenText)) {
                this.SetSyntaxTreeAt(Index, new SyntaxTree(null, TokenContext.NameSpace, Token, null));
            } else {
                TokenContext.CurrentPosition = Pos;
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
        if (this.TreeList != null && Index < this.TreeList.size()) {
            var NodeObject = this.TreeList.get(Index);
            var TypedNode = Gamma.TypeCheck(NodeObject, Type, TypeCheckPolicy);
            return TypedNode;
        }
        if (!IsFlag(TypeCheckPolicy, AllowEmptyPolicy) && !IsFlag(TypeCheckPolicy, IgnoreEmptyPolicy)) {
            Gamma.NameSpace.ReportError(ErrorLevel, this.KeyToken, this.KeyToken.ParsedText + "more: needsat: expression " + Index);
            return Gamma.Generator.CreateErrorNode(Type, this);
        }
        return null;
    };
    return SyntaxTree;
})();

var GtLayer = (function () {
    function GtLayer(Name) {
        this.Name = Name;
        this.MethodTable = new GtMap();
    }
    GtLayer.prototype.LookupUniqueMethod = function (Name) {
        return this.MethodTable.get(Name);
    };

    GtLayer.prototype.GetMethod = function (MethodId) {
        return this.MethodTable.get(MethodId);
    };

    GtLayer.prototype.DefineMethod = function (Method) {
        LangDeps.Assert(Method.Layer == null);
        var Class = Method.GetRecvType();
        var MethodId = Class.GetMethodId(Method.MethodName);
        var MethodPrev = this.MethodTable.get(MethodId);
        Method.ElderMethod = MethodPrev;
        Method.Layer = this;
        this.MethodTable.put(MethodId, Method);
    };
    return GtLayer;
})();

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
    function TypeEnv(NameSpace) {
        this.NameSpace = NameSpace;
        this.Generator = NameSpace.Context.Generator;
        this.Method = null;
        this.LocalStackList = new Array();
        this.StackTopIndex = 0;

        this.VoidType = NameSpace.Context.VoidType;
        this.BooleanType = NameSpace.Context.BooleanType;
        this.IntType = NameSpace.Context.IntType;
        this.StringType = NameSpace.Context.StringType;
        this.VarType = NameSpace.Context.VarType;
        this.AnyType = NameSpace.Context.AnyType;
    }
    TypeEnv.prototype.SetMethod = function (Method) {
        this.Method = Method;
    };

    TypeEnv.prototype.IsTopLevel = function () {
        return (this.Method == null);
    };

    TypeEnv.prototype.AppendDeclaredVariable = function (Type, Name) {
        var VarInfo = new VariableInfo(Type, Name, this.StackTopIndex);
        if (this.StackTopIndex < this.LocalStackList.size()) {
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
        if (Value instanceof String) {
            return this.StringType;
        } else if (Value instanceof Number || Value instanceof Number) {
            return this.IntType;
        } else if (Value instanceof Boolean) {
            return this.BooleanType;
        }
        return this.AnyType;
    };

    TypeEnv.prototype.LookupDelegate = function (Name) {
        TODO("delegate: finding");
        return new GtDelegate();
    };

    TypeEnv.prototype.DefaultValueConstNode = function (ParsedTree, Type) {
        if (Type.DefaultNullValue != null) {
            return this.Generator.CreateConstNode(Type, ParsedTree, Type.DefaultNullValue);
        }
        return this.CreateErrorNode(ParsedTree, "undefinedvalue: of: initial " + Type);
    };

    TypeEnv.prototype.CreateErrorNode = function (ParsedTree, Message) {
        this.NameSpace.ReportError(ErrorLevel, ParsedTree.KeyToken, Message);
        return this.Generator.CreateErrorNode(this.VoidType, ParsedTree);
    };

    TypeEnv.prototype.SupportedOnlyTopLevelError = function (ParsedTree) {
        return this.CreateErrorNode(ParsedTree, "supportedat: onlylevel: top " + ParsedTree.Pattern);
    };

    TypeEnv.prototype.UnsupportedTopLevelError = function (ParsedTree) {
        return this.CreateErrorNode(ParsedTree, "unsupportedtop: level: at " + ParsedTree.Pattern);
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
            var CurrentType = Type;
            if (ParsedTree.NextTree != null) {
                CurrentType = this.VoidType;
            }
            var TypedNode = this.TypeCheckEachNode(ParsedTree, CurrentType, DefaultTypeCheckPolicy);
            LastNode = LinkNode(LastNode, TypedNode);
            if (TypedNode.IsError()) {
                break;
            }
            ParsedTree = ParsedTree.NextTree;
        }
        this.StackTopIndex = StackTopIndex;
        if (LastNode == null) {
            return null;
        }
        return LastNode.MoveHeadNode();
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
    function GtNameSpace(Context, ParentNameSpace) {
        this.Context = Context;
        this.ParentNameSpace = ParentNameSpace;
        this.LayerList = new Array();
        if (ParentNameSpace != null) {
            this.PackageName = ParentNameSpace.PackageName;
            this.TopLevelLayer = ParentNameSpace.TopLevelLayer;
        } else {
            this.TopLevelLayer = Context.UserDefinedLayer;
        }
        this.LayerList.add(Context.GreenLayer);
        this.LayerList.add(this.TopLevelLayer);
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
            this.TokenMatrix = new Array(MaxSizeOfChars);
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
            this.SymbolPatternTable = new GtMap();
            this.ExtendedPatternTable = new GtMap();
            this.RemakeSymbolTable(this);
        }
        return this.SymbolPatternTable.get(Key);
    };

    GtNameSpace.prototype.GetPattern = function (PatternName) {
        var Body = this.GetSymbol(PatternName);
        if (Body instanceof SyntaxPattern) {
            return Body;
        }
        return null;
    };

    GtNameSpace.prototype.GetExtendedPattern = function (PatternName) {
        if (this.ExtendedPatternTable == null) {
            this.SymbolPatternTable = new GtMap();
            this.ExtendedPatternTable = new GtMap();
            this.RemakeSymbolTable(this);
        }
        var Body = this.ExtendedPatternTable.get(PatternName);
        if (Body instanceof SyntaxPattern) {
            return Body;
        }
        return null;
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
                this.Context.ClassNameMap.put(this.PackageName + "." + ClassInfo.ShortClassName, ClassInfo);
            }
            this.Context.Generator.AddClass(ClassInfo);
        }
        this.DefineSymbol(ClassInfo.ShortClassName, ClassInfo);
        return ClassInfo;
    };

    GtNameSpace.prototype.DefineMethod = function (Method) {
        this.TopLevelLayer.DefineMethod(Method);
        return Method;
    };

    GtNameSpace.prototype.FilterOverloadedMethods = function (Method, ParamSize, ResolvedSize, TypeList, BaseIndex, FoundMethod) {
        while (Method != null) {
            if (Method.GetParamSize() == ParamSize) {
                var i = 1;
                var MatchedMethod = Method;
                while (i < ResolvedSize) {
                    if (!Method.GetParamType(i).Accept(TypeList.get(BaseIndex + i))) {
                        MatchedMethod = null;
                        break;
                    }
                    i += 1;
                }
                if (MatchedMethod != null) {
                    if (FoundMethod != null) {
                        return null;
                    }
                    FoundMethod = MatchedMethod;
                }
            }
            Method = Method.ElderMethod;
        }
        return FoundMethod;
    };

    GtNameSpace.prototype.LookupMethod = function (MethodName, ParamSize, ResolvedSize, TypeList, BaseIndex) {
        var i = this.LayerList.size() - 1;
        var FoundMethod = null;
        if (ResolvedSize > 0) {
            var Class = TypeList.get(BaseIndex + 0);
            while (FoundMethod == null && Class != null) {
                var MethodId = Class.GetMethodId(MethodName);
                while (i >= 0) {
                    var Layer = this.LayerList.get(i);
                    var Method = Layer.GetMethod(MethodId);
                    FoundMethod = this.FilterOverloadedMethods(Method, ParamSize, ResolvedSize, TypeList, BaseIndex, FoundMethod);
                    i -= 1;
                }
                Class = Class.SearchSuperMethodClass;
            }
        }
        return FoundMethod;
    };

    GtNameSpace.prototype.GetGetter = function (Class, FieldName) {
        var MethodId = Class.GetMethodId(FieldName);
        while (Class != null) {
            var FoundMethod = this.Context.FieldLayer.GetMethod(MethodId);
            if (FoundMethod != null) {
                return FoundMethod;
            }
            Class = Class.SearchSuperMethodClass;
        }
        return null;
    };

    GtNameSpace.prototype.CreateGlobalObject = function (ClassFlag, ShortName) {
        var NewClass = new GtType(this.Context, ClassFlag, ShortName, null);
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
        TokenContext.SkipEmptyStatement();
        while (TokenContext.HasNext()) {
            var Annotation = TokenContext.SkipAndGetAnnotation(true);
            var TopLevelTree = ParseExpression(TokenContext);
            TopLevelTree.SetAnnotation(Annotation);
            DebugP("tree: untyped: " + TopLevelTree);
            var Gamma = new TypeEnv(this);
            var Node = Gamma.TypeCheckEachNode(TopLevelTree, Gamma.VoidType, DefaultTypeCheckPolicy);
            ResultValue = Generator.Eval(Node);
            TokenContext.SkipEmptyStatement();
            TokenContext.Vacume();
        }
        return ResultValue;
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

    KonohaGrammar.SymbolToken = function (TokenContext, SourceText, pos) {
        var start = pos;
        while (pos < SourceText.length) {
            var ch = LangDeps.CharAt(SourceText, pos);
            if (!LangDeps.IsLetter(ch) && !LangDeps.IsDigit(ch) && ch != (95)) {
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
            NextPos += 1;
        }

        var Matched = false;
        while (NextPos > pos) {
            var Sub = SourceText.substring(pos, NextPos);
            var Pattern = TokenContext.NameSpace.GetExtendedPattern(Sub);
            if (Pattern != null) {
                Matched = true;
                break;
            }
            NextPos -= 1;
        }

        if (Matched == false) {
            NextPos = pos + 1;
        }
        TokenContext.AddNewToken(SourceText.substring(pos, NextPos), 0, null);
        return NextPos;
    };

    KonohaGrammar.CommentToken = function (TokenContext, SourceText, pos) {
        var NextPos = pos + 1;
        if (pos + 1 < SourceText.length) {
            var NextChar = LangDeps.CharAt(SourceText, pos + 1);
            if (NextChar == (47)) {
                NextPos = NextPos + 1;
                while (NextPos < SourceText.length) {
                    var ch = LangDeps.CharAt(SourceText, NextPos);
                    if (ch == ('\n'.charCodeAt(0))) {
                        return KonohaGrammar.IndentToken(TokenContext, SourceText, NextPos);
                    }
                    NextPos = NextPos + 1;
                }
            }
        }
        return NoMatch;
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
        var start = pos + 1;
        var prev = (34);
        pos = pos + 1;
        while (pos < SourceText.length) {
            var ch = LangDeps.CharAt(SourceText, pos);
            if (ch == (34) && prev != ('\\'.charCodeAt(0))) {
                TokenContext.AddNewToken(SourceText.substring(start, pos), 0, "$StringLiteral$");
                return pos + 1;
            }
            if (ch == ('\n'.charCodeAt(0))) {
                TokenContext.ReportTokenError(ErrorLevel, "expected \"close: tostring: literal: the", SourceText.substring(start, pos));
                TokenContext.FoundLineFeed(1);
                return pos;
            }
            pos = pos + 1;
            prev = ch;
        }
        TokenContext.ReportTokenError(ErrorLevel, "expected \"close: tostring: literal: the", SourceText.substring(start, pos));
        return pos;
    };
    KonohaGrammar.StringLiteralToken_StringInterpolation = function (TokenContext, SourceText, pos) {
        var start = pos + 1;
        var NextPos = start;
        var prev = (34);
        while (NextPos < SourceText.length) {
            var ch = LangDeps.CharAt(SourceText, NextPos);
            if (ch == (36)) {
                var end = NextPos + 1;
                ch = LangDeps.CharAt(SourceText, end);
                if (ch == (40)) {
                } else {
                    while (end < SourceText.length) {
                        ch = LangDeps.CharAt(SourceText, end);
                        if (!LangDeps.IsLetter(ch) && !LangDeps.IsDigit(ch)) {
                            break;
                        }
                        end = end + 1;
                    }
                    if (end == NextPos + 1) {
                    } else {
                        var VarName = SourceText.substring(NextPos + 1, end);
                        TokenContext.AddNewToken(SourceText.substring(start, NextPos), 0, "$StringLiteral$");
                        TokenContext.AddNewToken("+", 0, null);
                        TokenContext.AddNewToken(VarName, 0, null);
                        TokenContext.AddNewToken("+", 0, null);
                        start = end;
                    }
                }
                NextPos = end;
                prev = ch;
                if (ch == (34)) {
                    TokenContext.AddNewToken(SourceText.substring(start, NextPos), 0, "$StringLiteral$");
                    return NextPos + 1;
                }
                continue;
            }
            if (ch == (34) && prev != ('\\'.charCodeAt(0))) {
                TokenContext.AddNewToken(SourceText.substring(start, NextPos + 1), 0, "$StringLiteral$");
                return NextPos + 1;
            }
            if (ch == ('\n'.charCodeAt(0))) {
                TokenContext.ReportTokenError(ErrorLevel, "expected \"close: tostring: literal: the", SourceText.substring(start, NextPos));
                TokenContext.FoundLineFeed(1);
                return NextPos;
            }
            NextPos = NextPos + 1;
            prev = ch;
        }
        TokenContext.ReportTokenError(ErrorLevel, "expected \"close: tostring: literal: the", SourceText.substring(start, NextPos));
        return NextPos;
    };
    KonohaGrammar.ParseType = function (Pattern, LeftTree, TokenContext) {
        var Token = TokenContext.Next();
        var ConstValue = TokenContext.NameSpace.GetSymbol(Token.ParsedText);
        if (ConstValue instanceof GtType) {
            return new SyntaxTree(Pattern, TokenContext.NameSpace, Token, ConstValue);
        }
        return null;
    };

    KonohaGrammar.ParseConst = function (Pattern, LeftTree, TokenContext) {
        var Token = TokenContext.Next();
        var ConstValue = TokenContext.NameSpace.GetSymbol(Token.ParsedText);
        if (ConstValue != null) {
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
            var DeclTree = TokenContext.ParsePatternAfter(TypeTree, "$FuncDecl$", Optional);
            if (DeclTree != null) {
                return DeclTree;
            }
            DeclTree = TokenContext.ParsePatternAfter(TypeTree, "$VarDecl$", Optional);
            if (DeclTree != null) {
                return DeclTree;
            }
            return TypeTree;
        }
        var Token = TokenContext.Next();
        var NameSpace = TokenContext.NameSpace;
        var ConstValue = NameSpace.GetSymbol(Token.ParsedText);
        if (ConstValue != null && !(ConstValue instanceof GtType)) {
            return new SyntaxTree(NameSpace.GetPattern("$Const$"), NameSpace, Token, ConstValue);
        }
        return new SyntaxTree(NameSpace.GetPattern("$Variable$"), NameSpace, Token, null);
    };

    KonohaGrammar.ParseVariable = function (Pattern, LeftTree, TokenContext) {
        var Token = TokenContext.Next();
        var ch = LangDeps.CharAt(Token.ParsedText, 0);
        if (LangDeps.IsLetter(ch) || ch == (95)) {
            return new SyntaxTree(Pattern, TokenContext.NameSpace, Token, null);
        }
        return null;
    };

    KonohaGrammar.TypeVariable = function (Gamma, ParsedTree, Type) {
        var Name = ParsedTree.KeyToken.ParsedText;
        var VariableInfo = Gamma.LookupDeclaredVariable(Name);
        if (VariableInfo != null) {
            return Gamma.Generator.CreateLocalNode(VariableInfo.Type, ParsedTree, VariableInfo.LocalName);
        }
        var Delegate = Gamma.LookupDelegate(Name);
        if (Delegate != null) {
            return Gamma.Generator.CreateConstNode(Delegate.Type, ParsedTree, Delegate);
        }
        return Gamma.CreateErrorNode(ParsedTree, "name: undefined: " + Name);
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
            Gamma.CreateErrorNode(TypeTree, "defined: already variable " + VariableName);
        }
        var VariableNode = Gamma.TypeCheck(NameTree, DeclType, DefaultTypeCheckPolicy);
        var InitValueNode = null;
        if (ValueTree == null) {
            InitValueNode = Gamma.DefaultValueConstNode(ParsedTree, DeclType);
        } else {
            InitValueNode = Gamma.TypeCheck(ValueTree, DeclType, DefaultTypeCheckPolicy);
        }
        var AssignNode = Gamma.Generator.CreateAssignNode(DeclType, ParsedTree, VariableNode, InitValueNode);
        var BlockNode = Gamma.TypeBlock(ParsedTree.NextTree, Type);
        ParsedTree.NextTree = null;
        if (BlockNode != null) {
            LinkNode(AssignNode, BlockNode);
        }
        return Gamma.Generator.CreateLetNode(DeclType, ParsedTree, DeclType, VariableNode, AssignNode);
    };

    KonohaGrammar.ParseIntegerLiteral = function (Pattern, LeftTree, TokenContext) {
        var Token = TokenContext.Next();
        return new SyntaxTree(Pattern, TokenContext.NameSpace, Token, LangDeps.ParseInt(Token.ParsedText));
    };

    KonohaGrammar.ParseStringLiteral = function (Pattern, LeftTree, TokenContext) {
        var Token = TokenContext.Next();
        var NewTree = new SyntaxTree(Pattern, TokenContext.NameSpace, Token, Token.ParsedText);
        return NewTree;
    };

    KonohaGrammar.ParseExpression = function (Pattern, LeftTree, TokenContext) {
        return ParseExpression(TokenContext);
    };

    KonohaGrammar.ParseUnary = function (Pattern, LeftTree, TokenContext) {
        var Token = TokenContext.Next();
        var Tree = new SyntaxTree(Pattern, TokenContext.NameSpace, Token, null);
        Tree.SetMatchedPatternAt(UnaryTerm, TokenContext, "$Expression$", Required);
        return Tree;
    };

    KonohaGrammar.TypeUnary = function (Gamma, ParsedTree, Type) {
        var ExprNode = ParsedTree.TypeNodeAt(UnaryTerm, Gamma, Gamma.VarType, DefaultTypeCheckPolicy);
        return Gamma.Generator.CreateUnaryNode(Gamma.AnyType, ParsedTree, null, ExprNode);
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
        var Operator = ParsedTree.KeyToken.ParsedText;
        var TypeList = new Array();
        TypeList.add(LeftNode.Type);
        TypeList.add(RightNode.Type);
        var Method = Gamma.NameSpace.LookupMethod(Operator, 2, 1, TypeList, 0);
        var ReturnType = Gamma.VarType;
        if (Method != null) {
            ReturnType = Method.GetReturnType();
        }
        return Gamma.Generator.CreateBinaryNode(ReturnType, ParsedTree, Method, LeftNode, RightNode);
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
        var Method = null;
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
        if (TokenContext.MatchToken(")")) {
            var Token = TokenContext.GetBeforeToken();
            FuncTree.AppendParsedTree(new SyntaxTree(Pattern, TokenContext.NameSpace, Token, null));
        } else {
            while (!FuncTree.IsEmptyOrError()) {
                var Tree = TokenContext.ParsePattern("$Expression$", Required);
                FuncTree.AppendParsedTree(Tree);
                if (TokenContext.MatchToken(","))
                    continue;
                var EndTree = new SyntaxTree(Pattern, TokenContext.NameSpace, TokenContext.GetMatchedToken(")"), null);
                if (EndTree != null) {
                    FuncTree.AppendParsedTree(EndTree);
                    break;
                }
            }
        }
        TokenContext.ParseFlag = ParseFlag;
        return FuncTree;
    };

    KonohaGrammar.TypeApply = function (Gamma, ParsedTree, Type) {
        var ApplyNode = Gamma.Generator.CreateApplyNode(Gamma.AnyType, ParsedTree, null);
        var TypeList = new Array();
        var i = 1;
        while (i < ListSize(ParsedTree.TreeList) - 1) {
            var ExprNode = ParsedTree.TypeNodeAt(i, Gamma, Gamma.VarType, DefaultTypeCheckPolicy);
            ApplyNode.Append(ExprNode);

            if (ExprNode.Type.equals(Gamma.VarType)) {
                ExprNode.Type = Gamma.IntType;
            }
            TypeList.add(ExprNode.Type);
            i += 1;
        }
        if (TypeList.size() == 0) {
            TypeList.add(Gamma.NameSpace.Context.VoidType);
        }

        var TreeList = ParsedTree.TreeList;
        var MethodName = TreeList.get(0).KeyToken.ParsedText;
        var ParamSize = TreeList.size() - 2;
        var Method = Gamma.NameSpace.LookupMethod(MethodName, ParamSize, 1, TypeList, 0);
        if (Method == null) {
            return Gamma.CreateErrorNode(ParsedTree, "method: Undefined: " + MethodName);
        }
        (ApplyNode).Method = Method;
        return ApplyNode;
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

    KonohaGrammar.TypeAssign = function (Gamma, ParsedTree, Type) {
        var LeftNode = ParsedTree.TypeNodeAt(LeftHandTerm, Gamma, Gamma.VarType, DefaultTypeCheckPolicy);
        var RightNode = ParsedTree.TypeNodeAt(RightHandTerm, Gamma, LeftNode.Type, DefaultTypeCheckPolicy);
        return Gamma.Generator.CreateAssignNode(Gamma.BooleanType, ParsedTree, LeftNode, RightNode);
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
                var Annotation = TokenContext.SkipAndGetAnnotation(true);
                var CurrentTree = ParseExpression(TokenContext);
                if (IsEmptyOrError(CurrentTree)) {
                    return CurrentTree;
                }
                CurrentTree.SetAnnotation(Annotation);
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
        return Gamma.Generator.CreateWhileNode(BodyNode.Type, ParsedTree, CondNode, BodyNode);
    };

    KonohaGrammar.ParseBreak = function (Pattern, LeftTree, TokenContext) {
        var Token = TokenContext.GetMatchedToken("break");
        var NewTree = new SyntaxTree(Pattern, TokenContext.NameSpace, Token, null);

        return NewTree;
    };

    KonohaGrammar.TypeBreak = function (Gamma, ParsedTree, Type) {
        return Gamma.Generator.CreateBreakNode(Gamma.VoidType, ParsedTree, null, "break");
    };
    KonohaGrammar.ParseContinue = function (Pattern, LeftTree, TokenContext) {
        var Token = TokenContext.GetMatchedToken("continue");
        var NewTree = new SyntaxTree(Pattern, TokenContext.NameSpace, Token, null);

        return NewTree;
    };

    KonohaGrammar.TypeContinue = function (Gamma, ParsedTree, Type) {
        return Gamma.Generator.CreateContinueNode(Gamma.VoidType, ParsedTree, null, "continue");
    };

    KonohaGrammar.ParseReturn = function (Pattern, LeftTree, TokenContext) {
        var Token = TokenContext.GetMatchedToken("return");
        var NewTree = new SyntaxTree(Pattern, TokenContext.NameSpace, Token, null);
        NewTree.SetMatchedPatternAt(ReturnExpr, TokenContext, "$Expression$", Optional);
        return NewTree;
    };

    KonohaGrammar.TypeReturn = function (Gamma, ParsedTree, Type) {
        if (Gamma.IsTopLevel()) {
            return Gamma.UnsupportedTopLevelError(ParsedTree);
        }
        var ReturnType = Gamma.Method.GetReturnType();
        var Expr = ParsedTree.TypeNodeAt(ReturnExpr, Gamma, ReturnType, DefaultTypeCheckPolicy);
        if (ReturnType == Gamma.VoidType) {
            return Gamma.Generator.CreateReturnNode(Expr.Type, ParsedTree, null);
        }
        return Gamma.Generator.CreateReturnNode(Expr.Type, ParsedTree, Expr);
    };

    KonohaGrammar.ParseNew = function (Pattern, LeftTree, TokenContext) {
        var Token = TokenContext.GetMatchedToken("new");
        var NewTree = new SyntaxTree(Pattern, TokenContext.NameSpace, Token, null);
        NewTree.SetMatchedPatternAt(CallExpressionOffset, TokenContext, "$Type$", Required);
        return NewTree;
    };

    KonohaGrammar.TypeNew = function (Gamma, ParsedTree, Type) {
        var SelfNode = ParsedTree.TypeNodeAt(CallExpressionOffset, Gamma, Gamma.AnyType, DefaultTypeCheckPolicy);
        var ApplyNode = Gamma.Generator.CreateApplyNode(Gamma.AnyType, ParsedTree, null);
        var i = 0;
        SelfNode = Gamma.Generator.CreateNewNode(SelfNode.Type, ParsedTree);
        ApplyNode.Append(SelfNode);

        while (i < ListSize(ParsedTree.TreeList)) {
            var ExprNode = ParsedTree.TypeNodeAt(UnaryTerm, Gamma, Gamma.VarType, DefaultTypeCheckPolicy);
            ApplyNode.Append(ExprNode);
            i += 1;
        }
        return ApplyNode;
    };

    KonohaGrammar.ParseFuncName = function (Pattern, LeftTree, TokenContext) {
        var Token = TokenContext.Next();
        if (Token != NullToken) {
            return new SyntaxTree(Pattern, TokenContext.NameSpace, Token, Token.ParsedText);
        }
        return null;
    };

    KonohaGrammar.ParseFuncDecl = function (Pattern, LeftTree, TokenContext) {
        var Tree = new SyntaxTree(Pattern, TokenContext.NameSpace, TokenContext.GetToken(), null);
        if (LeftTree == null) {
            Tree.SetMatchedPatternAt(FuncDeclReturnType, TokenContext, "$Type$", Required);
        } else {
            Tree.SetSyntaxTreeAt(FuncDeclReturnType, LeftTree);
        }
        Tree.SetMatchedPatternAt(FuncDeclName, TokenContext, "$FuncName$", Required);
        if (TokenContext.MatchToken("(")) {
            var ParseFlag = TokenContext.SetTrackback(false);
            var ParamBase = FuncDeclParam;
            while (!Tree.IsEmptyOrError() && !TokenContext.MatchToken(")")) {
                if (ParamBase != FuncDeclParam) {
                    Tree.SetMatchedTokenAt(NoWhere, TokenContext, ",", Required);
                }
                Tree.SetMatchedPatternAt(ParamBase + VarDeclType, TokenContext, "$Type$", Required);
                Tree.SetMatchedPatternAt(ParamBase + VarDeclName, TokenContext, "$Variable$", Required);
                if (TokenContext.MatchToken("=")) {
                    Tree.SetMatchedPatternAt(ParamBase + VarDeclValue, TokenContext, "$Expression$", Required);
                }
                ParamBase += 3;
            }
            TokenContext.SkipIndent();
            if (TokenContext.MatchToken("~")) {
                var Token = TokenContext.GetToken();
                Tree.ConstValue = Token.ParsedText;
            } else {
                Tree.SetMatchedPatternAt(FuncDeclBlock, TokenContext, "$Block$", Optional);
            }
            TokenContext.ParseFlag = ParseFlag;
            return Tree;
        }
        return null;
    };

    KonohaGrammar.TypeFuncDecl = function (Gamma, ParsedTree, Type) {
        Gamma = new TypeEnv(ParsedTree.NameSpace);
        var MethodName = ParsedTree.GetSyntaxTreeAt(FuncDeclName).ConstValue;
        var TypeBuffer = new Array();
        var ReturnType = ParsedTree.GetSyntaxTreeAt(FuncDeclReturnType).ConstValue;
        TypeBuffer.add(ReturnType);
        var ParamNameList = new Array();
        var ParamBase = FuncDeclParam;
        var i = 0;
        while (ParamBase < ParsedTree.TreeList.size()) {
            var ParamType = ParsedTree.GetSyntaxTreeAt(ParamBase).ConstValue;
            var ParamName = ParsedTree.GetSyntaxTreeAt(ParamBase + 1).KeyToken.ParsedText;
            TypeBuffer.add(ParamType);
            ParamNameList.add(ParamName + i);
            Gamma.AppendDeclaredVariable(ParamType, ParamName);
            ParamBase += 3;
            i = i + 1;
        }
        var MethodFlag = Gamma.Generator.ParseMethodFlag(0, ParsedTree);
        var Method = Gamma.Generator.CreateMethod(MethodFlag, MethodName, 0, TypeBuffer, ParsedTree.ConstValue);
        Gamma.Method = Method;
        Gamma.NameSpace.DefineMethod(Method);
        var BodyNode = ParsedTree.TypeNodeAt(FuncDeclBlock, Gamma, ReturnType, IgnoreEmptyPolicy);
        if (BodyNode != null) {
            Gamma.Generator.DefineFunction(Method, ParamNameList, BodyNode);
        }
        return Gamma.Generator.CreateEmptyNode(Gamma.VoidType, ParsedTree);
    };

    KonohaGrammar.ParseClassDecl = function (Pattern, LeftTree, TokenContext) {
        var Tree = new SyntaxTree(Pattern, TokenContext.NameSpace, TokenContext.GetToken(), null);

        return null;
    };

    KonohaGrammar.TypeClassDecl = function (Gamma, ParsedTree, Type) {
        return null;
    };

    KonohaGrammar.prototype.LoadTo = function (NameSpace) {
        NameSpace.DefineSymbol("true", true);
        NameSpace.DefineSymbol("false", false);

        NameSpace.DefineTokenFunc(" \t", KonohaGrammar.WhiteSpaceToken);
        NameSpace.DefineTokenFunc("\n", KonohaGrammar.IndentToken);
        NameSpace.DefineTokenFunc("(){}[]<>.,:;+-*/%=&|!@", KonohaGrammar.OperatorToken);
        NameSpace.DefineTokenFunc("/", KonohaGrammar.CommentToken);
        NameSpace.DefineTokenFunc("Aa", KonohaGrammar.SymbolToken);
        NameSpace.DefineTokenFunc("\"", KonohaGrammar.StringLiteralToken_StringInterpolation);
        NameSpace.DefineTokenFunc("1", KonohaGrammar.NumberLiteralToken);

        NameSpace.DefineSyntaxPattern("+", KonohaGrammar.ParseUnary, KonohaGrammar.TypeUnary);
        NameSpace.DefineSyntaxPattern("-", KonohaGrammar.ParseUnary, KonohaGrammar.TypeUnary);
        NameSpace.DefineSyntaxPattern("!", KonohaGrammar.ParseUnary, KonohaGrammar.TypeUnary);

        NameSpace.DefineExtendedPattern("*", BinaryOperator | Precedence_CStyleMUL, KonohaGrammar.ParseBinary, KonohaGrammar.TypeBinary);
        NameSpace.DefineExtendedPattern("/", BinaryOperator | Precedence_CStyleMUL, KonohaGrammar.ParseBinary, KonohaGrammar.TypeBinary);
        NameSpace.DefineExtendedPattern("%", BinaryOperator | Precedence_CStyleMUL, KonohaGrammar.ParseBinary, KonohaGrammar.TypeBinary);

        NameSpace.DefineExtendedPattern("+", BinaryOperator | Precedence_CStyleADD, KonohaGrammar.ParseBinary, KonohaGrammar.TypeBinary);
        NameSpace.DefineExtendedPattern("-", BinaryOperator | Precedence_CStyleADD, KonohaGrammar.ParseBinary, KonohaGrammar.TypeBinary);

        NameSpace.DefineExtendedPattern("<", BinaryOperator | Precedence_CStyleCOMPARE, KonohaGrammar.ParseBinary, KonohaGrammar.TypeBinary);
        NameSpace.DefineExtendedPattern("<=", BinaryOperator | Precedence_CStyleCOMPARE, KonohaGrammar.ParseBinary, KonohaGrammar.TypeBinary);
        NameSpace.DefineExtendedPattern(">", BinaryOperator | Precedence_CStyleCOMPARE, KonohaGrammar.ParseBinary, KonohaGrammar.TypeBinary);
        NameSpace.DefineExtendedPattern(">=", BinaryOperator | Precedence_CStyleCOMPARE, KonohaGrammar.ParseBinary, KonohaGrammar.TypeBinary);
        NameSpace.DefineExtendedPattern("==", BinaryOperator | Precedence_CStyleEquals, KonohaGrammar.ParseBinary, KonohaGrammar.TypeBinary);
        NameSpace.DefineExtendedPattern("!=", BinaryOperator | Precedence_CStyleEquals, KonohaGrammar.ParseBinary, KonohaGrammar.TypeBinary);

        NameSpace.DefineExtendedPattern("=", BinaryOperator | Precedence_CStyleAssign | LeftJoin, KonohaGrammar.ParseBinary, KonohaGrammar.TypeAssign);
        NameSpace.DefineExtendedPattern("&&", BinaryOperator | Precedence_CStyleAND, KonohaGrammar.ParseBinary, KonohaGrammar.TypeAnd);
        NameSpace.DefineExtendedPattern("||", BinaryOperator | Precedence_CStyleOR, KonohaGrammar.ParseBinary, KonohaGrammar.TypeOr);

        NameSpace.DefineSyntaxPattern("$Symbol$", KonohaGrammar.ParseSymbol, null);
        NameSpace.DefineSyntaxPattern("$Type$", KonohaGrammar.ParseType, KonohaGrammar.TypeConst);
        NameSpace.DefineSyntaxPattern("$Variable$", KonohaGrammar.ParseVariable, KonohaGrammar.TypeVariable);
        NameSpace.DefineSyntaxPattern("$Const$", KonohaGrammar.ParseConst, KonohaGrammar.TypeConst);
        NameSpace.DefineSyntaxPattern("$StringLiteral$", KonohaGrammar.ParseStringLiteral, KonohaGrammar.TypeConst);
        NameSpace.DefineSyntaxPattern("$IntegerLiteral$", KonohaGrammar.ParseIntegerLiteral, KonohaGrammar.TypeConst);

        NameSpace.DefineSyntaxPattern("(", KonohaGrammar.ParseParenthesis, null);
        NameSpace.DefineExtendedPattern(".", 0, KonohaGrammar.ParseField, KonohaGrammar.TypeField);
        NameSpace.DefineExtendedPattern("(", 0, KonohaGrammar.ParseApply, KonohaGrammar.TypeApply);

        NameSpace.DefineSyntaxPattern("$Block$", KonohaGrammar.ParseBlock, KonohaGrammar.TypeBlock);
        NameSpace.DefineSyntaxPattern("$Statement$", KonohaGrammar.ParseStatement, KonohaGrammar.TypeBlock);
        NameSpace.DefineSyntaxPattern("$Expression$", KonohaGrammar.ParseExpression, KonohaGrammar.TypeBlock);

        NameSpace.DefineSyntaxPattern("$FuncName$", KonohaGrammar.ParseFuncName, KonohaGrammar.TypeConst);
        NameSpace.DefineSyntaxPattern("$FuncDecl$", KonohaGrammar.ParseFuncDecl, KonohaGrammar.TypeFuncDecl);
        NameSpace.DefineSyntaxPattern("$VarDecl$", KonohaGrammar.ParseVarDecl, KonohaGrammar.TypeVarDecl);

        NameSpace.DefineSyntaxPattern("if", KonohaGrammar.ParseIf, KonohaGrammar.TypeIf);
        NameSpace.DefineSyntaxPattern("while", KonohaGrammar.ParseWhile, KonohaGrammar.TypeWhile);
        NameSpace.DefineSyntaxPattern("continue", KonohaGrammar.ParseContinue, KonohaGrammar.TypeContinue);
        NameSpace.DefineSyntaxPattern("break", KonohaGrammar.ParseBreak, KonohaGrammar.TypeBreak);
        NameSpace.DefineSyntaxPattern("return", KonohaGrammar.ParseReturn, KonohaGrammar.TypeReturn);
        NameSpace.DefineSyntaxPattern("new", KonohaGrammar.ParseNew, KonohaGrammar.TypeNew);
    };
    return KonohaGrammar;
})(GtGrammar);

var GtContext = (function () {
    function GtContext(Grammar, Generator) {
        this.Generator = Generator;
        this.Generator.Context = this;
        this.ClassNameMap = new GtMap();
        this.LayerMap = new GtMap();
        this.GreenLayer = this.LoadLayer("GreenTea");
        this.FieldLayer = this.LoadLayer("Field");
        this.UserDefinedLayer = this.LoadLayer("UserDefined");
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
        this.ArrayType = this.RootNameSpace.DefineClass(new GtType(this, 0, "Array", null));
        this.FuncType = this.RootNameSpace.DefineClass(new GtType(this, 0, "Func", null));
        this.ArrayType.Types = new Array(1);
        this.ArrayType.Types[0] = this.AnyType;
        this.FuncType.Types = new Array(1);
        this.FuncType.Types[0] = this.VoidType;
        Grammar.LoadTo(this.RootNameSpace);
        this.DefaultNameSpace = new GtNameSpace(this, this.RootNameSpace);
        this.Generator.SetLanguageContext(this);
    }
    GtContext.prototype.LoadLayer = function (Name) {
        var Layer = new GtLayer(Name);
        this.LayerMap.put(Name, Layer);
        return Layer;
    };

    GtContext.prototype.LoadGrammar = function (Grammar) {
        Grammar.LoadTo(this.DefaultNameSpace);
    };

    GtContext.prototype.Define = function (Symbol, Value) {
        this.RootNameSpace.DefineSymbol(Symbol, Value);
    };

    GtContext.prototype.Eval = function (text, FileLine) {
        return this.DefaultNameSpace.Eval(text, FileLine, this.Generator);
    };

    GtContext.prototype.GetGenericType = function (BaseType, BaseIdx, TypeList, IsCreation) {
        LangDeps.Assert(BaseType.IsGenericType());
        var MangleName = Mangle(BaseType, BaseIdx, TypeList);
        var GenericType = this.ClassNameMap.get(MangleName);
        if (GenericType == null && IsCreation) {
            var i = BaseIdx;
            var s = BaseType.ShortClassName + "<";
            while (i < ListSize(TypeList)) {
                s = s + TypeList.get(i).ShortClassName;
                i += 1;
                if (i == ListSize(TypeList)) {
                    s = s + ">";
                } else {
                    s = s + ",";
                }
            }
            GenericType = BaseType.CreateGenericType(BaseIdx, TypeList, s);
            this.ClassNameMap.put(MangleName, GenericType);
        }
        return GenericType;
    };

    GtContext.prototype.GetGenericType1 = function (BaseType, ParamType, IsCreation) {
        var TypeList = new Array();
        TypeList.add(ParamType);
        return this.GetGenericType(BaseType, 0, TypeList, IsCreation);
    };
    return GtContext;
})();

var GreenTeaScript = (function () {
    function GreenTeaScript() {
    }
    GreenTeaScript.TestAll = function (Context) {
        TestToken(Context, "1 || 2", "1", "||");
        TestToken(Context, "1 == 2", "1", "==");
        TestToken(Context, "1 != 2", "1", "!=");

        TestToken(Context, "1 *= 2", "1", "*");
        TestToken(Context, "1 = 2", "1", "=");
    };

    GreenTeaScript.main3 = function (Args) {
        var FileIndex = 0;
        var CodeGeneratorName = "--Java";
        if (Args.length > 0 && Args[0].startsWith("--")) {
            CodeGeneratorName = Args[0];
            FileIndex = 1;
        }
        var Generator = LangDeps.CodeGenerator(CodeGeneratorName);
        var Context = new GtContext(new KonohaGrammar(), Generator);
        if (Args.length > FileIndex) {
            Context.Eval(LangDeps.LoadFile(Args[FileIndex]), 1);
        } else {
            GreenTeaScript.TestAll(Context);
        }
    };

    GreenTeaScript.main = function (Args) {
        var CodeGeneratorName = "--java";
        var Index = 0;
        var OneLiner = null;
        while (Index < Args.length) {
            var Argu = Args[Index];
            if (!Argu.startsWith("-")) {
                break;
            }
            Index += 1;
            if (Argu.startsWith("--")) {
                CodeGeneratorName = Argu;
                continue;
            }
            if (Argu.equals("-e") && Index < Args.length) {
                OneLiner = Args[Index];
                Index += 1;
                continue;
            }

            if (Argu.equals("-no-debug") && Index < Args.length) {
                DebugPrintOption = false;
                continue;
            }
            LangDeps.Usage();
        }
        var Generator = LangDeps.CodeGenerator(CodeGeneratorName);
        if (Generator == null) {
            LangDeps.Usage();
        }
        var Context = new GtContext(new KonohaGrammar(), Generator);
        var ShellMode = true;
        if (OneLiner != null) {
            Context.Eval(OneLiner, 1);
            ShellMode = false;
        }
        while (Index < Args.length) {
            Context.Eval(LangDeps.LoadFile(Args[Index]), 1);
            ShellMode = false;
            Index += 1;
        }
        if (ShellMode) {
            var linenum = 1;
            var Line = null;
            while ((Line = LangDeps.ReadLine(">>> ")) != null) {
                Context.Eval(Line, linenum);
                linenum += 1;
            }
        }
    };
    return GreenTeaScript;
})();
