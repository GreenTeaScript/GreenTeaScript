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
var Parenthesis = 1 << 2;
var PrecedenceShift = 3;
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

var TestTokenizer = 1 << 0;
var TestParseOnly = 1 << 1;
var TestTypeChecker = 1 << 2;
var TestCodeGeneration = 1 << 3;

var DebugPrintOption = false;

function println(msg) {
    console.log(msg);
}

function DebugP(msg) {
    if (DebugPrintOption) {
        console.log("DEBUG" + LangDeps.GetStackInfo(2) + ": " + msg);
    }
}

function TODO(msg) {
    console.log("TODO" + LangDeps.GetStackInfo(2) + ": " + msg);
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

function AsciiToTokenMatrixIndex(c) {
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
        var NextIdx = LangDeps.ApplyTokenFunc(delegate, TokenContext, ScriptSource, Pos);
        if (NextIdx > Pos)
            return NextIdx;
        TokenFunc = TokenFunc.ParentFunc;
    }
    return NoMatch;
}

function MergeSyntaxPattern(Pattern, Parent) {
    if (Parent == null)
        return Pattern;
    var MergedPattern = new GtSyntaxPattern(Pattern.PackageNameSpace, Pattern.PatternName, Pattern.MatchFunc, Pattern.TypeFunc);
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
        var ParsedTree = LangDeps.ApplyMatchFunc(delegate, CurrentPattern, LeftTree, TokenContext);
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
        console.log("DEBUG: " + "undefinedpattern: syntax: " + Pattern);
    }
    return TokenContext.ReportExpectedPattern(Pattern);
}

function ParseExpression(TokenContext) {
    var Pattern = TokenContext.GetFirstPattern();
    var LeftTree = ApplySyntaxPattern(Pattern, null, TokenContext);
    while (!IsEmptyOrError(LeftTree) && !TokenContext.MatchToken(";")) {
        var ExtendedPattern = TokenContext.GetExtendedPattern();
        if (ExtendedPattern == null) {
            break;
        }
        LeftTree = ApplySyntaxPattern(ExtendedPattern, LeftTree, TokenContext);
    }
    return LeftTree;
}

function ApplyTypeFunc(delegate, Gamma, ParsedTree, Type) {
    LangDeps.Assert(delegate != null);
    return LangDeps.ApplyTypeFunc(delegate, Gamma, ParsedTree, Type);
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
    var TokenContext = new GtTokenContext(NameSpace, Source, 1);
    LangDeps.Assert(TokenContext.MatchToken(TokenText) && TokenContext.MatchToken(TokenText2));
}

function TestSyntaxPattern(Context, Text) {
    var TestLevel = TestTypeChecker;
    var NameSpace = Context.DefaultNameSpace;
    var TokenContext = new GtTokenContext(NameSpace, Text, 1);
    var ParsedTree = ParseExpression(TokenContext);
    LangDeps.Assert(ParsedTree != null);
    if ((TestLevel & TestTypeChecker) != TestTypeChecker) {
        return;
    }
    var Gamma = new GtTypeEnv(NameSpace);
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

var GtTokenContext = (function () {
    function GtTokenContext(NameSpace, Text, FileLine) {
        this.IndentLevel = 0;
        this.NameSpace = NameSpace;
        this.SourceList = new Array();
        this.CurrentPosition = 0;
        this.ParsingLine = FileLine;
        this.ParseFlag = 0;
        this.AddNewToken(Text, SourceTokenFlag, null);
        this.IndentLevel = 0;
    }
    GtTokenContext.prototype.AddNewToken = function (Text, TokenFlag, PatternName) {
        var Token = new GtToken(Text, this.ParsingLine);
        Token.TokenFlag |= TokenFlag;
        if (PatternName != null) {
            Token.PresetPattern = this.NameSpace.GetPattern(PatternName);
            LangDeps.Assert(Token.PresetPattern != null);
        }

        this.SourceList.add(Token);
        return Token;
    };

    GtTokenContext.prototype.FoundWhiteSpace = function () {
        var Token = this.GetToken();
        Token.TokenFlag |= WhiteSpaceTokenFlag;
    };

    GtTokenContext.prototype.FoundLineFeed = function (line) {
        this.ParsingLine += line;
    };

    GtTokenContext.prototype.ReportTokenError = function (Level, Message, TokenText) {
        var Token = this.AddNewToken(TokenText, 0, "$Error$");
        this.NameSpace.ReportError(Level, Token, Message);
    };

    GtTokenContext.prototype.NewErrorSyntaxTree = function (Token, Message) {
        if (!this.IsAllowedTrackback()) {
            this.NameSpace.ReportError(ErrorLevel, Token, Message);
            var ErrorTree = new GtSyntaxTree(Token.PresetPattern, this.NameSpace, Token, null);
            return ErrorTree;
        }
        return null;
    };

    GtTokenContext.prototype.GetBeforeToken = function () {
        var pos = this.CurrentPosition - 1;
        while (pos >= 0 && pos < this.SourceList.size()) {
            var Token = this.SourceList.get(pos);
            if (IsFlag(Token.TokenFlag, IndentTokenFlag)) {
                pos -= 1;
                continue;
            }
            return Token;
        }
        return null;
    };

    GtTokenContext.prototype.ReportExpectedToken = function (TokenText) {
        if (!this.IsAllowedTrackback()) {
            var Token = this.GetBeforeToken();
            if (Token != null) {
                return this.NewErrorSyntaxTree(Token, TokenText + "expected: after: is " + Token.ParsedText);
            }
            Token = this.GetToken();
            LangDeps.Assert(Token != GtTokenContext.NullToken);
            return this.NewErrorSyntaxTree(Token, TokenText + "expected: at: is " + Token.ParsedText);
        }
        return null;
    };

    GtTokenContext.prototype.ReportExpectedPattern = function (Pattern) {
        if (Pattern == null) {
            return this.ReportExpectedToken("null");
        }
        return this.ReportExpectedToken(Pattern.PatternName);
    };

    GtTokenContext.prototype.Vacume = function () {
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

    GtTokenContext.prototype.DispatchFunc = function (ScriptSource, GtChar, pos) {
        var TokenFunc = this.NameSpace.GetTokenFunc(GtChar);
        var NextIdx = ApplyTokenFunc(TokenFunc, this, ScriptSource, pos);
        if (NextIdx == NoMatch) {
            console.log("DEBUG: " + "tokenizer: undefined: " + LangDeps.CharAt(ScriptSource, pos));
            this.AddNewToken(ScriptSource.substring(pos, pos + 1), 0, null);
            return pos + 1;
        }
        return NextIdx;
    };

    GtTokenContext.prototype.Tokenize = function (ScriptSource, CurrentLine) {
        var currentPos = 0;
        var len = ScriptSource.length;
        this.ParsingLine = CurrentLine;
        while (currentPos < len) {
            var gtCode = AsciiToTokenMatrixIndex(LangDeps.CharAt(ScriptSource, currentPos));
            var nextPos = this.DispatchFunc(ScriptSource, gtCode, currentPos);
            if (currentPos >= nextPos) {
                break;
            }
            currentPos = nextPos;
        }
        this.Dump();
    };

    GtTokenContext.prototype.GetToken = function () {
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
        return GtTokenContext.NullToken;
    };

    GtTokenContext.prototype.HasNext = function () {
        return (this.GetToken() != GtTokenContext.NullToken);
    };

    GtTokenContext.prototype.Next = function () {
        var Token = this.GetToken();
        this.CurrentPosition += 1;
        return Token;
    };

    GtTokenContext.prototype.SkipIndent = function () {
        var Token = this.GetToken();
        while (Token.IsIndent()) {
            this.CurrentPosition = this.CurrentPosition + 1;
            Token = this.GetToken();
        }
    };

    GtTokenContext.prototype.GetPattern = function (PatternName) {
        return this.NameSpace.GetPattern(PatternName);
    };

    GtTokenContext.prototype.GetFirstPattern = function () {
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

    GtTokenContext.prototype.GetExtendedPattern = function () {
        var Token = this.GetToken();
        var Pattern = this.NameSpace.GetExtendedPattern(Token.ParsedText);
        return Pattern;
    };

    GtTokenContext.prototype.MatchToken = function (TokenText) {
        var Token = this.GetToken();
        if (Token.EqualsText(TokenText)) {
            this.CurrentPosition += 1;
            return true;
        }
        return false;
    };

    GtTokenContext.prototype.GetMatchedToken = function (TokenText) {
        var Token = this.GetToken();
        while (Token != GtTokenContext.NullToken) {
            this.CurrentPosition += 1;
            if (Token.EqualsText(TokenText)) {
                break;
            }
            Token = this.GetToken();
        }
        return Token;
    };

    GtTokenContext.prototype.IsAllowedTrackback = function () {
        return IsFlag(this.ParseFlag, TrackbackParseFlag);
    };

    GtTokenContext.prototype.SetTrackback = function (Allowed) {
        var ParseFlag = this.ParseFlag;
        if (Allowed) {
            this.ParseFlag = this.ParseFlag | TrackbackParseFlag;
        } else {
            this.ParseFlag = (~(TrackbackParseFlag) & this.ParseFlag);
        }
        return ParseFlag;
    };

    GtTokenContext.prototype.ParsePatternAfter = function (LeftTree, PatternName, IsOptional) {
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

    GtTokenContext.prototype.ParsePattern = function (PatternName, IsOptional) {
        return this.ParsePatternAfter(null, PatternName, IsOptional);
    };

    GtTokenContext.prototype.SkipAndGetAnnotation = function (IsAllowedDelim) {
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

    GtTokenContext.prototype.SkipEmptyStatement = function () {
        var Token = null;
        while ((Token = this.GetToken()) != GtTokenContext.NullToken) {
            if (Token.IsIndent() || Token.IsDelim()) {
                this.CurrentPosition += 1;
                continue;
            }
            break;
        }
        return (Token != GtTokenContext.NullToken);
    };

    GtTokenContext.prototype.Dump = function () {
        var pos = this.CurrentPosition;
        while (pos < this.SourceList.size()) {
            var token = this.SourceList.get(pos);
            console.log("DEBUG: " + "[" + pos + "]\t" + token + " : " + token.PresetPattern);
            pos += 1;
        }
    };
    GtTokenContext.NullToken = new GtToken("", 0);
    return GtTokenContext;
})();

var GtSyntaxPattern = (function () {
    function GtSyntaxPattern(NameSpace, PatternName, MatchFunc, TypeFunc) {
        this.PackageNameSpace = NameSpace;
        this.PatternName = PatternName;
        this.SyntaxFlag = 0;
        this.MatchFunc = MatchFunc;
        this.TypeFunc = TypeFunc;
        this.ParentPattern = null;
    }
    GtSyntaxPattern.prototype.toString = function () {
        return this.PatternName + "<" + this.MatchFunc + ">";
    };

    GtSyntaxPattern.prototype.IsBinaryOperator = function () {
        return IsFlag(this.SyntaxFlag, BinaryOperator);
    };

    GtSyntaxPattern.prototype.IsLeftJoin = function (Right) {
        var left = this.SyntaxFlag >> PrecedenceShift;
        var right = Right.SyntaxFlag >> PrecedenceShift;
        return (!IsFlag(Right.SyntaxFlag, Parenthesis) && (left < right || (left == right && IsFlag(this.SyntaxFlag, LeftJoin) && IsFlag(Right.SyntaxFlag, LeftJoin))));
    };
    return GtSyntaxPattern;
})();

var GtSyntaxTree = (function () {
    function GtSyntaxTree(Pattern, NameSpace, KeyToken, ConstValue) {
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
    GtSyntaxTree.prototype.toString = function () {
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

    GtSyntaxTree.prototype.SetAnnotation = function (Annotation) {
        this.Annotation = Annotation;
    };

    GtSyntaxTree.prototype.HasAnnotation = function (Key) {
        if (this.Annotation != null) {
            var Value = this.Annotation.get(Key);
            if (Value instanceof Boolean) {
                this.Annotation.put(Key, false);
            }
            return (Value != null);
        }
        return false;
    };

    GtSyntaxTree.prototype.IsError = function () {
        return this.KeyToken.IsError();
    };

    GtSyntaxTree.prototype.ToError = function (Token) {
        LangDeps.Assert(Token.IsError());
        this.KeyToken = Token;
        this.TreeList = null;
    };

    GtSyntaxTree.prototype.IsEmpty = function () {
        return this.KeyToken == GtTokenContext.NullToken;
    };

    GtSyntaxTree.prototype.ToEmpty = function () {
        this.KeyToken = GtTokenContext.NullToken;
        this.TreeList = null;
        this.Pattern = this.NameSpace.GetPattern("$Empty$");
    };

    GtSyntaxTree.prototype.IsEmptyOrError = function () {
        return this.KeyToken == GtTokenContext.NullToken || this.KeyToken.IsError();
    };

    GtSyntaxTree.prototype.ToEmptyOrError = function (ErrorTree) {
        if (ErrorTree == null) {
            this.ToEmpty();
        } else {
            this.ToError(ErrorTree.KeyToken);
        }
    };

    GtSyntaxTree.prototype.GetSyntaxTreeAt = function (Index) {
        if (this.TreeList != null && Index >= this.TreeList.size()) {
            return null;
        }
        return this.TreeList.get(Index);
    };

    GtSyntaxTree.prototype.SetSyntaxTreeAt = function (Index, Tree) {
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

    GtSyntaxTree.prototype.SetMatchedPatternAt = function (Index, TokenContext, PatternName, IsOptional) {
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

    GtSyntaxTree.prototype.SetMatchedTokenAt = function (Index, TokenContext, TokenText, IsOptional) {
        if (!this.IsEmptyOrError()) {
            var Pos = TokenContext.CurrentPosition;
            var Token = TokenContext.Next();
            if (Token.ParsedText.equals(TokenText)) {
                this.SetSyntaxTreeAt(Index, new GtSyntaxTree(null, TokenContext.NameSpace, Token, null));
            } else {
                TokenContext.CurrentPosition = Pos;
                if (!IsOptional) {
                    this.ToEmptyOrError(TokenContext.ReportExpectedToken(TokenText));
                }
            }
        }
    };

    GtSyntaxTree.prototype.AppendParsedTree = function (Tree) {
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

    GtSyntaxTree.prototype.TypeNodeAt = function (Index, Gamma, Type, TypeCheckPolicy) {
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
    return GtSyntaxTree;
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

var GtVariableInfo = (function () {
    function GtVariableInfo(Type, Name, Index) {
        this.Type = Type;
        this.Name = Name;
        this.LocalName = Name + Index;
    }
    return GtVariableInfo;
})();

var GtTypeEnv = (function () {
    function GtTypeEnv(NameSpace) {
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
        this.ArrayType = NameSpace.Context.ArrayType;
        this.FuncType = NameSpace.Context.FuncType;
    }
    GtTypeEnv.prototype.SetMethod = function (Method) {
        this.Method = Method;
    };

    GtTypeEnv.prototype.IsTopLevel = function () {
        return (this.Method == null);
    };

    GtTypeEnv.prototype.AppendDeclaredVariable = function (Type, Name) {
        var VarInfo = new GtVariableInfo(Type, Name, this.StackTopIndex);
        if (this.StackTopIndex < this.LocalStackList.size()) {
            this.LocalStackList.add(VarInfo);
        } else {
            this.LocalStackList.add(VarInfo);
        }
        this.StackTopIndex += 1;
        return true;
    };

    GtTypeEnv.prototype.LookupDeclaredVariable = function (Symbol) {
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

    GtTypeEnv.prototype.GuessType = function (Value) {
        if (Value instanceof String) {
            return this.StringType;
        } else if (Value instanceof Number || Value instanceof Number) {
            return this.IntType;
        } else if (Value instanceof Boolean) {
            return this.BooleanType;
        }
        return this.AnyType;
    };

    GtTypeEnv.prototype.LookupFunction = function (Name) {
        var Function = this.NameSpace.GetSymbol(Name);
        if (Function instanceof GtMethod) {
            return Function;
        }
        return null;
    };

    GtTypeEnv.prototype.DefaultValueConstNode = function (ParsedTree, Type) {
        if (Type.DefaultNullValue != null) {
            return this.Generator.CreateConstNode(Type, ParsedTree, Type.DefaultNullValue);
        }
        return this.CreateErrorNode(ParsedTree, "undefinedvalue: of: initial " + Type);
    };

    GtTypeEnv.prototype.CreateErrorNode = function (ParsedTree, Message) {
        this.NameSpace.ReportError(ErrorLevel, ParsedTree.KeyToken, Message);
        return this.Generator.CreateErrorNode(this.VoidType, ParsedTree);
    };

    GtTypeEnv.prototype.SupportedOnlyTopLevelError = function (ParsedTree) {
        return this.CreateErrorNode(ParsedTree, "supportedat: onlylevel: top " + ParsedTree.Pattern);
    };

    GtTypeEnv.prototype.UnsupportedTopLevelError = function (ParsedTree) {
        return this.CreateErrorNode(ParsedTree, "unsupportedtop: level: at " + ParsedTree.Pattern);
    };

    GtTypeEnv.prototype.TypeEachNode = function (Tree, Type) {
        var Node = ApplyTypeFunc(Tree.Pattern.TypeFunc, this, Tree, Type);
        if (Node == null) {
            Node = this.CreateErrorNode(Tree, "undefined type checker: " + Tree.Pattern);
        }
        return Node;
    };

    GtTypeEnv.prototype.TypeCheckEachNode = function (Tree, Type, TypeCheckPolicy) {
        var Node = this.TypeEachNode(Tree, Type);
        if (Node.IsError()) {
            return Node;
        }
        return Node;
    };

    GtTypeEnv.prototype.TypeCheck = function (ParsedTree, Type, TypeCheckPolicy) {
        return this.TypeBlock(ParsedTree, Type);
    };

    GtTypeEnv.prototype.TypeBlock = function (ParsedTree, Type) {
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

    GtTypeEnv.prototype.AppendConstants = function (VariableName, ConstNode) {
        return this.NameSpace.AppendConstants(VariableName, ConstNode);
    };
    return GtTypeEnv;
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
        this.ConstantTable = null;
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
                    var kchar = AsciiToTokenMatrixIndex(LangDeps.CharAt(Spec.SpecKey, j));
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
        if (Body instanceof GtSyntaxPattern) {
            var Parent = Table.get(Spec.SpecKey);
            if (Parent instanceof GtSyntaxPattern) {
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
        if (Body instanceof GtSyntaxPattern) {
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
        if (Body instanceof GtSyntaxPattern) {
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
        var Pattern = new GtSyntaxPattern(this, PatternName, MatchFunc, TypeFunc);
        var Spec = new GtSpec(SymbolPatternSpec, PatternName, Pattern);
        this.PublicSpecList.add(Spec);
        if (this.SymbolPatternTable != null) {
            this.TableAddSpec(this.SymbolPatternTable, Spec);
        }
    };

    GtNameSpace.prototype.DefineExtendedPattern = function (PatternName, SyntaxFlag, MatchFunc, TypeFunc) {
        var Pattern = new GtSyntaxPattern(this, PatternName, MatchFunc, TypeFunc);
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
        var Function = this.GetSymbol(Method.MethodName);
        if (Function == null) {
            this.DefineSymbol(Method.MethodName, Method);
        }
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

    GtNameSpace.prototype.GetConstant = function (VariableName) {
        if (this.ConstantTable != null) {
            var ConstValue = this.ConstantTable.get(VariableName);
            if (ConstValue != null) {
                return ConstValue;
            }
            if (this.ParentNameSpace != null) {
                return this.ParentNameSpace.GetConstant(VariableName);
            }
        }
        return null;
    };
    GtNameSpace.prototype.AppendConstants = function (VariableName, ConstValue) {
        if (this.GetConstant(VariableName) != null) {
            return false;
        }
        if (this.ConstantTable == null) {
            this.ConstantTable = new GtMap();
        }
        this.ConstantTable.put(VariableName, ConstValue);
        return true;
    };

    GtNameSpace.prototype.Eval = function (ScriptSource, FileLine, Generator) {
        var resultValue = null;
        console.log("DEBUG: " + "Eval: " + ScriptSource);
        var tokenContext = new GtTokenContext(this, ScriptSource, FileLine);
        tokenContext.SkipEmptyStatement();
        while (tokenContext.HasNext()) {
            var annotation = tokenContext.SkipAndGetAnnotation(true);
            var topLevelTree = ParseExpression(tokenContext);
            topLevelTree.SetAnnotation(annotation);
            console.log("DEBUG: " + "untyped tree: " + topLevelTree);
            var gamma = new GtTypeEnv(this);
            var node = gamma.TypeCheckEachNode(topLevelTree, gamma.VoidType, DefaultTypeCheckPolicy);
            resultValue = Generator.Eval(node);
            tokenContext.SkipEmptyStatement();
            tokenContext.Vacume();
        }
        return resultValue;
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

var DScriptGrammar = (function (_super) {
    __extends(DScriptGrammar, _super);
    function DScriptGrammar() {
        _super.apply(this, arguments);
    }
    DScriptGrammar.WhiteSpaceToken = function (TokenContext, SourceText, pos) {
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

    DScriptGrammar.IndentToken = function (TokenContext, SourceText, pos) {
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

    DScriptGrammar.SymbolToken = function (TokenContext, SourceText, pos) {
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

    DScriptGrammar.OperatorToken = function (TokenContext, SourceText, pos) {
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

    DScriptGrammar.CommentToken = function (TokenContext, SourceText, pos) {
        var NextPos = pos + 1;
        if (NextPos < SourceText.length) {
            var NextChar = LangDeps.CharAt(SourceText, NextPos);
            if (NextChar != (47) && NextChar != (42)) {
                return NoMatch;
            }
            var Level = 0;
            var PrevChar = 0;
            if (NextChar == (42)) {
                Level = 1;
            }
            while (NextPos < SourceText.length) {
                NextChar = LangDeps.CharAt(SourceText, NextPos);
                if (NextChar == ('\n'.charCodeAt(0)) && Level == 0) {
                    return DScriptGrammar.IndentToken(TokenContext, SourceText, NextPos);
                }
                if (NextChar == (47) && PrevChar == (42)) {
                    if (Level == 1) {
                        return NextPos + 1;
                    }
                    Level = Level - 1;
                }
                if (Level > 0) {
                    if (NextChar == (42) && PrevChar == (47)) {
                        Level = Level + 1;
                    }
                }
                NextPos = NextPos + 1;
            }
        }
        return NoMatch;
    };

    DScriptGrammar.NumberLiteralToken = function (TokenContext, SourceText, pos) {
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

    DScriptGrammar.StringLiteralToken = function (TokenContext, SourceText, pos) {
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

    DScriptGrammar.StringLiteralToken_StringInterpolation = function (TokenContext, SourceText, pos) {
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
                TokenContext.AddNewToken(SourceText.substring(start, NextPos), 0, "$StringLiteral$");
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

    DScriptGrammar.ParseType = function (Pattern, LeftTree, TokenContext) {
        var Token = TokenContext.Next();
        var ConstValue = TokenContext.NameSpace.GetSymbol(Token.ParsedText);
        if (ConstValue instanceof GtType) {
            return new GtSyntaxTree(Pattern, TokenContext.NameSpace, Token, ConstValue);
        }
        return null;
    };

    DScriptGrammar.ParseConst = function (Pattern, LeftTree, TokenContext) {
        var Token = TokenContext.Next();
        var ConstValue = TokenContext.NameSpace.GetSymbol(Token.ParsedText);
        if (ConstValue != null) {
            return new GtSyntaxTree(Pattern, TokenContext.NameSpace, Token, ConstValue);
        }
        return null;
    };

    DScriptGrammar.TypeConst = function (Gamma, ParsedTree, Type) {
        return Gamma.Generator.CreateConstNode(Gamma.GuessType(ParsedTree.ConstValue), ParsedTree, ParsedTree.ConstValue);
    };

    DScriptGrammar.ParseSymbol = function (Pattern, LeftTree, TokenContext) {
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
            return new GtSyntaxTree(NameSpace.GetPattern("$Const$"), NameSpace, Token, ConstValue);
        }
        return new GtSyntaxTree(NameSpace.GetPattern("$Variable$"), NameSpace, Token, null);
    };

    DScriptGrammar.ParseVariable = function (Pattern, LeftTree, TokenContext) {
        var Token = TokenContext.Next();
        var ch = LangDeps.CharAt(Token.ParsedText, 0);
        if (LangDeps.IsLetter(ch) || ch == (95)) {
            return new GtSyntaxTree(Pattern, TokenContext.NameSpace, Token, null);
        }
        return null;
    };

    DScriptGrammar.TypeVariable = function (Gamma, ParsedTree, Type) {
        var Name = ParsedTree.KeyToken.ParsedText;
        var VariableInfo = Gamma.LookupDeclaredVariable(Name);
        if (VariableInfo != null) {
            return Gamma.Generator.CreateLocalNode(VariableInfo.Type, ParsedTree, VariableInfo.LocalName);
        }
        var ConstValue = Gamma.NameSpace.GetConstant(Name);
        if (ConstValue != null) {
            return ConstValue;
        }
        var Function = Gamma.LookupFunction(Name);
        if (Function != null) {
            return Gamma.Generator.CreateConstNode(Function.GetFuncType(), ParsedTree, Function);
        }
        return Gamma.CreateErrorNode(ParsedTree, "undefined name: " + Name);
    };

    DScriptGrammar.ParseVarDecl = function (Pattern, LeftTree, TokenContext) {
        var Tree = new GtSyntaxTree(Pattern, TokenContext.NameSpace, TokenContext.GetToken(), null);
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
            var NextTree = new GtSyntaxTree(Pattern, TokenContext.NameSpace, Tree.KeyToken, null);
            NextTree.SetSyntaxTreeAt(VarDeclType, Tree.GetSyntaxTreeAt(VarDeclType));
            Tree = LinkTree(Tree, NextTree);
            Tree.SetMatchedPatternAt(VarDeclName, TokenContext, "$Variable$", Required);
            if (TokenContext.MatchToken("=")) {
                Tree.SetMatchedPatternAt(VarDeclValue, TokenContext, "$Expression$", Required);
            }
        }
        return Tree;
    };

    DScriptGrammar.TypeVarDecl = function (Gamma, ParsedTree, Type) {
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

    DScriptGrammar.ParseIntegerLiteral = function (Pattern, LeftTree, TokenContext) {
        var Token = TokenContext.Next();
        return new GtSyntaxTree(Pattern, TokenContext.NameSpace, Token, LangDeps.ParseInt(Token.ParsedText));
    };

    DScriptGrammar.ParseStringLiteral = function (Pattern, LeftTree, TokenContext) {
        var Token = TokenContext.Next();
        var NewTree = new GtSyntaxTree(Pattern, TokenContext.NameSpace, Token, Token.ParsedText);
        return NewTree;
    };

    DScriptGrammar.ParseExpression = function (Pattern, LeftTree, TokenContext) {
        return ParseExpression(TokenContext);
    };

    DScriptGrammar.ParseUnary = function (Pattern, LeftTree, TokenContext) {
        var Token = TokenContext.Next();
        var Tree = new GtSyntaxTree(Pattern, TokenContext.NameSpace, Token, null);
        Tree.SetMatchedPatternAt(UnaryTerm, TokenContext, "$Expression$", Required);
        return Tree;
    };

    DScriptGrammar.TypeUnary = function (Gamma, ParsedTree, Type) {
        var ExprNode = ParsedTree.TypeNodeAt(UnaryTerm, Gamma, Gamma.VarType, DefaultTypeCheckPolicy);
        return Gamma.Generator.CreateUnaryNode(Gamma.AnyType, ParsedTree, null, ExprNode);
    };

    DScriptGrammar.ParseBinary = function (Pattern, LeftTree, TokenContext) {
        var Token = TokenContext.Next();
        var RightTree = ParseExpression(TokenContext);
        if (IsEmptyOrError(RightTree))
            return RightTree;
        if (RightTree.Pattern.IsBinaryOperator()) {
            if (Pattern.IsLeftJoin(RightTree.Pattern)) {
                var NewTree = new GtSyntaxTree(Pattern, TokenContext.NameSpace, Token, null);
                NewTree.SetSyntaxTreeAt(LeftHandTerm, LeftTree);
                NewTree.SetSyntaxTreeAt(RightHandTerm, RightTree.GetSyntaxTreeAt(LeftHandTerm));
                RightTree.SetSyntaxTreeAt(LeftHandTerm, NewTree);
                return RightTree;
            }
        }
        var NewTree = new GtSyntaxTree(Pattern, TokenContext.NameSpace, Token, null);
        NewTree.SetSyntaxTreeAt(LeftHandTerm, LeftTree);
        NewTree.SetSyntaxTreeAt(RightHandTerm, RightTree);
        if (RightTree.NextTree != null) {
            LinkTree(NewTree, RightTree.NextTree);
            RightTree.NextTree = null;
        }
        return NewTree;
    };

    DScriptGrammar.TypeBinary = function (Gamma, ParsedTree, Type) {
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

    DScriptGrammar.IsUnixCommand = function (cmd) {
        return false;
    };

    DScriptGrammar.SymbolShellToken = function (TokenContext, SourceText, pos) {
        var ShellMode = false;
        var start = pos;
        if (TokenContext.SourceList.size() > 0) {
            var PrevToken = TokenContext.SourceList.get(TokenContext.SourceList.size() - 1);
            if (PrevToken != null && PrevToken.PresetPattern != null && PrevToken.PresetPattern.PatternName.equals("$ShellExpression$")) {
                ShellMode = true;
            }
        }

        while (pos < SourceText.length) {
            var ch = LangDeps.CharAt(SourceText, pos);

            if (LangDeps.IsLetter(ch)) {
            } else if (LangDeps.IsDigit(ch)) {
            } else if (ch == (95)) {
            } else if (ShellMode && (ch == (45) || ch == (47))) {
            } else {
                break;
            }
            pos += 1;
        }
        if (start == pos) {
            return NoMatch;
        }
        var Symbol = SourceText.substring(start, pos);

        if (Symbol.equals("true") || Symbol.equals("false")) {
            return NoMatch;
        }
        if (Symbol.startsWith("/") || Symbol.startsWith("-")) {
            if (Symbol.startsWith("// ")) {
                return NoMatch;
            }
            TokenContext.AddNewToken(Symbol, 0, "$StringLiteral$");
            return pos;
        }

        if (DScriptGrammar.IsUnixCommand(Symbol)) {
            TokenContext.AddNewToken(Symbol, 0, "$ShellExpression$");
            return pos;
        }
        return NoMatch;
    };

    DScriptGrammar.ParseShell = function (Pattern, LeftTree, TokenContext) {
        var Token = TokenContext.Next();
        var NewTree = new GtSyntaxTree(Pattern, TokenContext.NameSpace, Token, null);
        while (!IsEmptyOrError(NewTree) && !TokenContext.MatchToken(";")) {
            var Tree = null;
            if (TokenContext.GetToken().IsDelim() || TokenContext.GetToken().IsIndent()) {
                break;
            }
            if (TokenContext.MatchToken("$ShellExpression$")) {
            }
            if (Tree == null) {
                Tree = TokenContext.ParsePattern("$Expression$", Optional);
            }
            NewTree.AppendParsedTree(Tree);
        }
        return NewTree;
    };

    DScriptGrammar.TypeShell = function (Gamma, ParsedTree, Type) {
        var Node = Gamma.Generator.CreateCommandNode(Type, ParsedTree, null);
        var HeadNode = Node;
        var i = 0;
        var Command = ParsedTree.KeyToken.ParsedText;
        var ThisNode = Gamma.Generator.CreateConstNode(Gamma.StringType, ParsedTree, Command);
        Node.Append(ThisNode);
        while (i < ListSize(ParsedTree.TreeList)) {
            var ExprNode = ParsedTree.TypeNodeAt(i, Gamma, Gamma.StringType, DefaultTypeCheckPolicy);
            if (ExprNode instanceof ConstNode) {
                var CNode = ExprNode;
                if (CNode.ConstValue instanceof String) {
                    var Val = CNode.ConstValue;
                    if (Val.equals("|")) {
                        console.log("DEBUG: " + "PIPE");
                        var PrevNode = Node;
                        Node = Gamma.Generator.CreateCommandNode(Type, ParsedTree, null);
                        PrevNode.PipedNextNode = Node;
                    }
                }
            }
            Node.Append(ExprNode);
            i = i + 1;
        }
        return HeadNode;
    };

    DScriptGrammar.ParseField = function (Pattern, LeftTree, TokenContext) {
        TokenContext.MatchToken(".");
        var Token = TokenContext.Next();
        var NewTree = new GtSyntaxTree(Pattern, TokenContext.NameSpace, Token, null);
        NewTree.AppendParsedTree(LeftTree);
        return NewTree;
    };

    DScriptGrammar.TypeField = function (Gamma, ParsedTree, Type) {
        var ExprNode = ParsedTree.TypeNodeAt(UnaryTerm, Gamma, Gamma.VarType, DefaultTypeCheckPolicy);
        var Method = null;
        return Gamma.Generator.CreateGetterNode(Method.GetReturnType(), ParsedTree, Method, ExprNode);
    };

    DScriptGrammar.ParseParenthesis = function (Pattern, LeftTree, TokenContext) {
        var ParseFlag = TokenContext.ParseFlag;
        TokenContext.MatchToken("(");
        TokenContext.ParseFlag |= SkipIndentParseFlag;
        var Tree = TokenContext.ParsePattern("$Expression$", Required);
        if (!TokenContext.MatchToken(")")) {
            Tree = TokenContext.ReportExpectedToken(")");
        }
        TokenContext.ParseFlag = ParseFlag;
        Tree.Pattern.SyntaxFlag |= Parenthesis;
        return Tree;
    };

    DScriptGrammar.ParseApply = function (Pattern, LeftTree, TokenContext) {
        var ParseFlag = TokenContext.ParseFlag;
        TokenContext.ParseFlag |= SkipIndentParseFlag;
        var FuncTree = new GtSyntaxTree(Pattern, TokenContext.NameSpace, TokenContext.GetMatchedToken("("), null);
        FuncTree.AppendParsedTree(LeftTree);
        if (TokenContext.MatchToken(")")) {
            var Token = TokenContext.GetBeforeToken();
            FuncTree.AppendParsedTree(new GtSyntaxTree(Pattern, TokenContext.NameSpace, Token, null));
        } else {
            while (!FuncTree.IsEmptyOrError()) {
                var Tree = TokenContext.ParsePattern("$Expression$", Required);
                FuncTree.AppendParsedTree(Tree);
                if (TokenContext.MatchToken(","))
                    continue;
                var EndTree = new GtSyntaxTree(Pattern, TokenContext.NameSpace, TokenContext.GetMatchedToken(")"), null);
                if (EndTree != null) {
                    FuncTree.AppendParsedTree(EndTree);
                    break;
                }
            }
        }
        TokenContext.ParseFlag = ParseFlag;
        return FuncTree;
    };

    DScriptGrammar.TypeApply = function (Gamma, ParsedTree, Type) {
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

    DScriptGrammar.TypeAnd = function (Gamma, ParsedTree, Type) {
        var LeftNode = ParsedTree.TypeNodeAt(LeftHandTerm, Gamma, Gamma.BooleanType, DefaultTypeCheckPolicy);
        var RightNode = ParsedTree.TypeNodeAt(RightHandTerm, Gamma, Gamma.BooleanType, DefaultTypeCheckPolicy);
        return Gamma.Generator.CreateAndNode(Gamma.BooleanType, ParsedTree, LeftNode, RightNode);
    };

    DScriptGrammar.TypeOr = function (Gamma, ParsedTree, Type) {
        var LeftNode = ParsedTree.TypeNodeAt(LeftHandTerm, Gamma, Gamma.BooleanType, DefaultTypeCheckPolicy);
        var RightNode = ParsedTree.TypeNodeAt(RightHandTerm, Gamma, Gamma.BooleanType, DefaultTypeCheckPolicy);
        return Gamma.Generator.CreateOrNode(Gamma.BooleanType, ParsedTree, LeftNode, RightNode);
    };

    DScriptGrammar.TypeAssign = function (Gamma, ParsedTree, Type) {
        var LeftNode = ParsedTree.TypeNodeAt(LeftHandTerm, Gamma, Gamma.VarType, DefaultTypeCheckPolicy);
        var RightNode = ParsedTree.TypeNodeAt(RightHandTerm, Gamma, LeftNode.Type, DefaultTypeCheckPolicy);
        return Gamma.Generator.CreateAssignNode(Gamma.BooleanType, ParsedTree, LeftNode, RightNode);
    };

    DScriptGrammar.ParseEmpty = function (Pattern, LeftTree, TokenContext) {
        return new GtSyntaxTree(Pattern, TokenContext.NameSpace, GtTokenContext.NullToken, null);
    };

    DScriptGrammar.TypeEmpty = function (Gamma, ParsedTree, Type) {
        return Gamma.Generator.CreateNullNode(Gamma.VoidType, ParsedTree);
    };

    DScriptGrammar.ParseBlock = function (Pattern, LeftTree, TokenContext) {
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

    DScriptGrammar.ParseStatement = function (Pattern, LeftTree, TokenContext) {
        var StmtTree = TokenContext.ParsePattern("$Block$", Optional);
        if (StmtTree == null) {
            StmtTree = ParseExpression(TokenContext);
        }
        if (StmtTree == null) {
            StmtTree = TokenContext.ParsePattern("$Empty$", Required);
        }
        return StmtTree;
    };

    DScriptGrammar.TypeBlock = function (Gamma, ParsedTree, Type) {
        return Gamma.TypeBlock(ParsedTree, Type);
    };

    DScriptGrammar.ParseIf = function (Pattern, LeftTree, TokenContext) {
        var Token = TokenContext.GetMatchedToken("if");
        var NewTree = new GtSyntaxTree(Pattern, TokenContext.NameSpace, Token, null);
        NewTree.SetMatchedTokenAt(NoWhere, TokenContext, "(", Required);
        NewTree.SetMatchedPatternAt(IfCond, TokenContext, "$Expression$", Required);
        NewTree.SetMatchedTokenAt(NoWhere, TokenContext, ")", Required);
        NewTree.SetMatchedPatternAt(IfThen, TokenContext, "$Statement$", Required);
        if (TokenContext.MatchToken("else")) {
            NewTree.SetMatchedPatternAt(IfElse, TokenContext, "$Statement$", Required);
        }
        return NewTree;
    };

    DScriptGrammar.TypeIf = function (Gamma, ParsedTree, Type) {
        var CondNode = ParsedTree.TypeNodeAt(IfCond, Gamma, Gamma.BooleanType, DefaultTypeCheckPolicy);
        var ThenNode = ParsedTree.TypeNodeAt(IfThen, Gamma, Type, DefaultTypeCheckPolicy);
        var ElseNode = ParsedTree.TypeNodeAt(IfElse, Gamma, ThenNode.Type, AllowEmptyPolicy);
        return Gamma.Generator.CreateIfNode(ThenNode.Type, ParsedTree, CondNode, ThenNode, ElseNode);
    };

    DScriptGrammar.ParseWhile = function (Pattern, LeftTree, TokenContext) {
        var Token = TokenContext.GetMatchedToken("while");
        var NewTree = new GtSyntaxTree(Pattern, TokenContext.NameSpace, Token, null);
        NewTree.SetMatchedTokenAt(NoWhere, TokenContext, "(", Required);
        NewTree.SetMatchedPatternAt(WhileCond, TokenContext, "$Expression$", Required);
        NewTree.SetMatchedTokenAt(NoWhere, TokenContext, ")", Required);
        NewTree.SetMatchedPatternAt(WhileBody, TokenContext, "$Block$", Required);
        return NewTree;
    };

    DScriptGrammar.TypeWhile = function (Gamma, ParsedTree, Type) {
        var CondNode = ParsedTree.TypeNodeAt(WhileCond, Gamma, Gamma.BooleanType, DefaultTypeCheckPolicy);
        var BodyNode = ParsedTree.TypeNodeAt(WhileBody, Gamma, Type, DefaultTypeCheckPolicy);
        return Gamma.Generator.CreateWhileNode(BodyNode.Type, ParsedTree, CondNode, BodyNode);
    };

    DScriptGrammar.ParseBreak = function (Pattern, LeftTree, TokenContext) {
        var Token = TokenContext.GetMatchedToken("break");
        var NewTree = new GtSyntaxTree(Pattern, TokenContext.NameSpace, Token, null);

        return NewTree;
    };

    DScriptGrammar.TypeBreak = function (Gamma, ParsedTree, Type) {
        return Gamma.Generator.CreateBreakNode(Gamma.VoidType, ParsedTree, null, "break");
    };

    DScriptGrammar.ParseContinue = function (Pattern, LeftTree, TokenContext) {
        var Token = TokenContext.GetMatchedToken("continue");
        var NewTree = new GtSyntaxTree(Pattern, TokenContext.NameSpace, Token, null);

        return NewTree;
    };

    DScriptGrammar.TypeContinue = function (Gamma, ParsedTree, Type) {
        return Gamma.Generator.CreateContinueNode(Gamma.VoidType, ParsedTree, null, "continue");
    };

    DScriptGrammar.ParseReturn = function (Pattern, LeftTree, TokenContext) {
        var Token = TokenContext.GetMatchedToken("return");
        var NewTree = new GtSyntaxTree(Pattern, TokenContext.NameSpace, Token, null);
        NewTree.SetMatchedPatternAt(ReturnExpr, TokenContext, "$Expression$", Optional);
        return NewTree;
    };

    DScriptGrammar.TypeReturn = function (Gamma, ParsedTree, Type) {
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

    DScriptGrammar.ParseNew = function (Pattern, LeftTree, TokenContext) {
        var Token = TokenContext.GetMatchedToken("new");
        var NewTree = new GtSyntaxTree(Pattern, TokenContext.NameSpace, Token, null);
        NewTree.SetMatchedPatternAt(CallExpressionOffset, TokenContext, "$Type$", Required);
        return NewTree;
    };

    DScriptGrammar.TypeNew = function (Gamma, ParsedTree, Type) {
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

    DScriptGrammar.ParseConstDecl = function (Pattern, LeftTree, TokenContext) {
        var Token = TokenContext.GetMatchedToken("const");
        var NewTree = new GtSyntaxTree(Pattern, TokenContext.NameSpace, Token, null);
        NewTree.SetMatchedPatternAt(VarDeclName, TokenContext, "$Variable$", Required);
        NewTree.SetMatchedTokenAt(NoWhere, TokenContext, "=", Required);
        NewTree.SetMatchedPatternAt(VarDeclValue, TokenContext, "$Expression$", Required);
        return NewTree;
    };

    DScriptGrammar.TypeConstDecl = function (Gamma, ParsedTree, Type) {
        var NameTree = ParsedTree.GetSyntaxTreeAt(VarDeclName);
        var ValueTree = ParsedTree.GetSyntaxTreeAt(VarDeclValue);
        var VariableName = NameTree.KeyToken.ParsedText;
        var ValueNode = Gamma.TypeCheck(ValueTree, Gamma.AnyType, DefaultTypeCheckPolicy);
        if (!(ValueNode instanceof ConstNode)) {
            return Gamma.CreateErrorNode(ParsedTree, "of: definition variable " + VariableName + "not: constant: is");
        }
        if (!Gamma.AppendConstants(VariableName, ValueNode)) {
            return Gamma.CreateErrorNode(ParsedTree, "alreadyconstant: defined " + VariableName);
        }
        return Gamma.Generator.CreateEmptyNode(Type, ParsedTree);
    };

    DScriptGrammar.ParseFuncName = function (Pattern, LeftTree, TokenContext) {
        var Token = TokenContext.Next();
        if (Token != GtTokenContext.NullToken) {
            return new GtSyntaxTree(Pattern, TokenContext.NameSpace, Token, Token.ParsedText);
        }
        return null;
    };

    DScriptGrammar.ParseFuncDecl = function (Pattern, LeftTree, TokenContext) {
        var Tree = new GtSyntaxTree(Pattern, TokenContext.NameSpace, TokenContext.GetToken(), null);
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
            if (TokenContext.MatchToken("as")) {
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

    DScriptGrammar.TypeFuncDecl = function (Gamma, ParsedTree, Type) {
        Gamma = new GtTypeEnv(ParsedTree.NameSpace);
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
        if (!Gamma.NameSpace.Context.CheckExportableName(Method)) {
            return Gamma.CreateErrorNode(ParsedTree, "duplicatedmethods: exported " + MethodName);
        }
        Gamma.Method = Method;
        Gamma.NameSpace.DefineMethod(Method);
        var BodyNode = ParsedTree.TypeNodeAt(FuncDeclBlock, Gamma, ReturnType, IgnoreEmptyPolicy);
        if (BodyNode != null) {
            Gamma.Generator.DefineFunction(Method, ParamNameList, BodyNode);
        }
        return Gamma.Generator.CreateEmptyNode(Gamma.VoidType, ParsedTree);
    };

    DScriptGrammar.ParseClassDecl = function (Pattern, LeftTree, TokenContext) {
        var Tree = new GtSyntaxTree(Pattern, TokenContext.NameSpace, TokenContext.GetToken(), null);

        return null;
    };

    DScriptGrammar.TypeClassDecl = function (Gamma, ParsedTree, Type) {
        return null;
    };

    DScriptGrammar.prototype.LoadTo = function (NameSpace) {
        NameSpace.DefineSymbol("true", true);
        NameSpace.DefineSymbol("false", false);

        NameSpace.DefineTokenFunc(" \t", DScriptGrammar.WhiteSpaceToken);
        NameSpace.DefineTokenFunc("\n", DScriptGrammar.IndentToken);
        NameSpace.DefineTokenFunc("(){}[]<>.,:;+-*/%=&|!@", DScriptGrammar.OperatorToken);
        NameSpace.DefineTokenFunc("/", DScriptGrammar.CommentToken);
        NameSpace.DefineTokenFunc("Aa", DScriptGrammar.SymbolToken);
        NameSpace.DefineTokenFunc("Aa-/", DScriptGrammar.SymbolShellToken);

        NameSpace.DefineTokenFunc("\"", DScriptGrammar.StringLiteralToken_StringInterpolation);
        NameSpace.DefineTokenFunc("1", DScriptGrammar.NumberLiteralToken);

        NameSpace.DefineSyntaxPattern("+", DScriptGrammar.ParseUnary, DScriptGrammar.TypeUnary);
        NameSpace.DefineSyntaxPattern("-", DScriptGrammar.ParseUnary, DScriptGrammar.TypeUnary);
        NameSpace.DefineSyntaxPattern("!", DScriptGrammar.ParseUnary, DScriptGrammar.TypeUnary);

        NameSpace.DefineExtendedPattern("*", BinaryOperator | Precedence_CStyleMUL, DScriptGrammar.ParseBinary, DScriptGrammar.TypeBinary);
        NameSpace.DefineExtendedPattern("/", BinaryOperator | Precedence_CStyleMUL, DScriptGrammar.ParseBinary, DScriptGrammar.TypeBinary);
        NameSpace.DefineExtendedPattern("%", BinaryOperator | Precedence_CStyleMUL, DScriptGrammar.ParseBinary, DScriptGrammar.TypeBinary);

        NameSpace.DefineExtendedPattern("+", BinaryOperator | Precedence_CStyleADD, DScriptGrammar.ParseBinary, DScriptGrammar.TypeBinary);
        NameSpace.DefineExtendedPattern("-", BinaryOperator | Precedence_CStyleADD, DScriptGrammar.ParseBinary, DScriptGrammar.TypeBinary);

        NameSpace.DefineExtendedPattern("<", BinaryOperator | Precedence_CStyleCOMPARE, DScriptGrammar.ParseBinary, DScriptGrammar.TypeBinary);
        NameSpace.DefineExtendedPattern("<=", BinaryOperator | Precedence_CStyleCOMPARE, DScriptGrammar.ParseBinary, DScriptGrammar.TypeBinary);
        NameSpace.DefineExtendedPattern(">", BinaryOperator | Precedence_CStyleCOMPARE, DScriptGrammar.ParseBinary, DScriptGrammar.TypeBinary);
        NameSpace.DefineExtendedPattern(">=", BinaryOperator | Precedence_CStyleCOMPARE, DScriptGrammar.ParseBinary, DScriptGrammar.TypeBinary);
        NameSpace.DefineExtendedPattern("==", BinaryOperator | Precedence_CStyleEquals, DScriptGrammar.ParseBinary, DScriptGrammar.TypeBinary);
        NameSpace.DefineExtendedPattern("!=", BinaryOperator | Precedence_CStyleEquals, DScriptGrammar.ParseBinary, DScriptGrammar.TypeBinary);

        NameSpace.DefineExtendedPattern("=", BinaryOperator | Precedence_CStyleAssign | LeftJoin, DScriptGrammar.ParseBinary, DScriptGrammar.TypeAssign);
        NameSpace.DefineExtendedPattern("&&", BinaryOperator | Precedence_CStyleAND, DScriptGrammar.ParseBinary, DScriptGrammar.TypeAnd);
        NameSpace.DefineExtendedPattern("||", BinaryOperator | Precedence_CStyleOR, DScriptGrammar.ParseBinary, DScriptGrammar.TypeOr);

        NameSpace.DefineSyntaxPattern("$Symbol$", DScriptGrammar.ParseSymbol, null);
        NameSpace.DefineSyntaxPattern("$Type$", DScriptGrammar.ParseType, DScriptGrammar.TypeConst);
        NameSpace.DefineSyntaxPattern("$Variable$", DScriptGrammar.ParseVariable, DScriptGrammar.TypeVariable);
        NameSpace.DefineSyntaxPattern("$Const$", DScriptGrammar.ParseConst, DScriptGrammar.TypeConst);
        NameSpace.DefineSyntaxPattern("$StringLiteral$", DScriptGrammar.ParseStringLiteral, DScriptGrammar.TypeConst);
        NameSpace.DefineSyntaxPattern("$IntegerLiteral$", DScriptGrammar.ParseIntegerLiteral, DScriptGrammar.TypeConst);

        NameSpace.DefineSyntaxPattern("$ShellExpression$", DScriptGrammar.ParseShell, DScriptGrammar.TypeShell);

        NameSpace.DefineSyntaxPattern("(", DScriptGrammar.ParseParenthesis, null);
        NameSpace.DefineExtendedPattern(".", 0, DScriptGrammar.ParseField, DScriptGrammar.TypeField);
        NameSpace.DefineExtendedPattern("(", 0, DScriptGrammar.ParseApply, DScriptGrammar.TypeApply);

        NameSpace.DefineSyntaxPattern("$Block$", DScriptGrammar.ParseBlock, DScriptGrammar.TypeBlock);
        NameSpace.DefineSyntaxPattern("$Statement$", DScriptGrammar.ParseStatement, DScriptGrammar.TypeBlock);
        NameSpace.DefineSyntaxPattern("$Expression$", DScriptGrammar.ParseExpression, DScriptGrammar.TypeBlock);

        NameSpace.DefineSyntaxPattern("$FuncName$", DScriptGrammar.ParseFuncName, DScriptGrammar.TypeConst);
        NameSpace.DefineSyntaxPattern("$FuncDecl$", DScriptGrammar.ParseFuncDecl, DScriptGrammar.TypeFuncDecl);
        NameSpace.DefineSyntaxPattern("$VarDecl$", DScriptGrammar.ParseVarDecl, DScriptGrammar.TypeVarDecl);

        NameSpace.DefineSyntaxPattern("if", DScriptGrammar.ParseIf, DScriptGrammar.TypeIf);
        NameSpace.DefineSyntaxPattern("while", DScriptGrammar.ParseWhile, DScriptGrammar.TypeWhile);
        NameSpace.DefineSyntaxPattern("continue", DScriptGrammar.ParseContinue, DScriptGrammar.TypeContinue);
        NameSpace.DefineSyntaxPattern("break", DScriptGrammar.ParseBreak, DScriptGrammar.TypeBreak);
        NameSpace.DefineSyntaxPattern("return", DScriptGrammar.ParseReturn, DScriptGrammar.TypeReturn);
        NameSpace.DefineSyntaxPattern("new", DScriptGrammar.ParseNew, DScriptGrammar.TypeNew);
        NameSpace.DefineSyntaxPattern("const", DScriptGrammar.ParseConstDecl, DScriptGrammar.TypeConstDecl);
    };
    return DScriptGrammar;
})(GtGrammar);

var GtContext = (function () {
    function GtContext(Grammar, Generator) {
        this.Generator = Generator;
        this.Generator.Context = this;
        this.ClassNameMap = new GtMap();
        this.LayerMap = new GtMap();
        this.UniqueMethodMap = new GtMap();
        this.GreenLayer = this.LoadLayer("GreenTea");
        this.FieldLayer = this.LoadLayer("Field");
        this.UserDefinedLayer = this.LoadLayer("UserDefined");
        this.RootNameSpace = new GtNameSpace(this, null);
        this.ClassCount = 0;
        this.MethodCount = 0;
        this.VoidType = this.RootNameSpace.DefineClass(new GtType(this, 0, "void", null));
        this.ObjectType = this.RootNameSpace.DefineClass(new GtType(this, 0, "Object", new Object()));
        this.BooleanType = this.RootNameSpace.DefineClass(new GtType(this, 0, "boolean", false));
        this.IntType = this.RootNameSpace.DefineClass(new GtType(this, 0, "int", 0));
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

    GtContext.prototype.CheckExportableName = function (Method) {
        if (Method.Is(ExportMethod)) {
            var Value = this.UniqueMethodMap.get(Method.MethodName);
            if (Value == null) {
                this.UniqueMethodMap.put(Method.MethodName, Method);
                return true;
            }
            return false;
        }
        return true;
    };
    return GtContext;
})();

var GreenTeaScript = (function () {
    function GreenTeaScript() {
    }
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
            if (Argu.equals("-verbose")) {
                DebugPrintOption = true;
                continue;
            }
            LangDeps.Usage();
        }
        var Generator = LangDeps.CodeGenerator(CodeGeneratorName);
        if (Generator == null) {
            LangDeps.Usage();
        }
        var Context = new GtContext(new DScriptGrammar(), Generator);
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
