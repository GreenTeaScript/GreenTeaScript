var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var ProgName = "GreenTeaScript";
var CodeName = "Reference Implementation of D-Script";
var MajorVersion = 0;
var MinerVersion = 1;
var PatchLevel = 0;
var Version = "0.1";
var Copyright = "Copyright (c) 2013, JST/CREST DEOS project authors";
var License = "BSD-Style Open Source";

var NativeClass = 1 << 0;
var InterfaceClass = 1 << 1;
var DynamicClass = 1 << 2;
var EnumClass = 1 << 3;
var OpenClass = 1 << 4;

var PublicFunc = 1 << 0;
var ExportFunc = 1 << 1;
var VirtualFunc = 1 << 2;
var NativeFunc = 1 << 3;
var NativeStaticFunc = 1 << 4;
var NativeMacroFunc = 1 << 5;
var NativeVariadicFunc = 1 << 6;
var DynamicFunc = 1 << 7;
var ConstFunc = 1 << 8;
var ConstructorFunc = 1 << 9;
var GetterFunc = 1 << 10;
var SetterFunc = 1 << 11;

var ReadOnlyVar = 1;

var NoMatch = -1;
var Optional = true;
var Required = false;

var ErrorLevel = 0;
var TypeErrorLevel = 1;
var WarningLevel = 2;
var InfoLevel = 3;

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
var QuotedTokenFlag = (1 << 5);
var NameSymbolTokenFlag = (1 << 6);

var BackTrackParseFlag = 1;
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

var ConstDeclClassIndex = 0;
var ConstDeclNameIndex = 1;
var ConstDeclValueIndex = 2;

var FuncDeclReturnType = 0;
var FuncDeclClass = 1;
var FuncDeclName = 2;
var FuncDeclBlock = 3;
var FuncDeclParam = 4;

var ClassDeclSuperType = 0;
var ClassDeclName = 1;
var ClassDeclFieldStartIndex = 2;

var TryBody = 0;
var CatchVariable = 1;
var CatchBody = 2;
var FinallyBody = 3;

var EnumNameTreeIndex = 0;

var BinaryOperator = 1;
var LeftJoin = 1 << 1;
var PrecedenceShift = 3;

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

var DefaultTypeCheckPolicy = 0;
var NoCheckPolicy = 1;
var CastPolicy = (1 << 1);
var IgnoreEmptyPolicy = (1 << 2);
var AllowEmptyPolicy = (1 << 3);
var AllowVoidPolicy = (1 << 4);
var AllowCoercionPolicy = (1 << 5);
var OnlyConstPolicy = (1 << 6);

var NativeNameSuffix = "__";
var ShellGrammarReservedKeywords = ["true", "false", "as", "if"];

var UseLangStat = true;

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

function n2s(n) {
    if (n < (27)) {
        return LibGreenTea.CharToString((65 + (n - 0)));
    } else if (n < (27 + 10)) {
        return LibGreenTea.CharToString((48 + (n - 27)));
    } else {
        return LibGreenTea.CharToString((97 + (n - 37)));
    }
}

function NumberToAscii(number) {
    if (number >= 3600) {
        return n2s(number / 3600) + NumberToAscii(number % 3600);
    }
    return n2s((number / 60)) + n2s((number % 60));
}

function NativeVariableName(Name, Index) {
    return Name + NativeNameSuffix + NumberToAscii(Index);
}

function ClassSymbol(ClassType, Symbol) {
    return ClassType.GetUniqueName() + "." + Symbol;
}

function MangleGenericType(BaseType, BaseIdx, TypeList) {
    var s = BaseType.ShortClassName + NativeNameSuffix;
    var i = BaseIdx;
    while (i < ListSize(TypeList)) {
        s = s + NumberToAscii(TypeList.get(i).ClassId);
        i = i + 1;
    }
    return s;
}

function MangleFuncName(BaseType, FuncName, BaseIdx, TypeList) {
    var s = FuncName + NativeNameSuffix + NumberToAscii(BaseType.ClassId);
    var i = BaseIdx;
    while (i < ListSize(TypeList)) {
        s = s + NumberToAscii(TypeList.get(i).ClassId);
        i = i + 1;
    }
    return s;
}

function JoinPolyFuncFunc(ClassType, PolyFunc, Func) {
    if (ClassType == null || Func.GetRecvType() == ClassType) {
        if (PolyFunc == null) {
            PolyFunc = new GtPolyFunc(null, Func);
        } else {
            PolyFunc.FuncList.add(Func);
        }
    }
    return PolyFunc;
}

function JoinPolyFunc(ClassType, PolyFunc, FuncValue) {
    if (FuncValue instanceof GtFunc) {
        return JoinPolyFuncFunc(ClassType, PolyFunc, FuncValue);
    }
    if (FuncValue instanceof GtPolyFunc) {
        var Poly = FuncValue;
        var i = 0;
        while (i < Poly.FuncList.size()) {
            PolyFunc = JoinPolyFuncFunc(ClassType, PolyFunc, Poly.FuncList.get(i));
            i += 1;
        }
    }
    return PolyFunc;
}

function ApplyTokenFunc(TokenFunc, TokenContext, ScriptSource, Pos) {
    while (TokenFunc != null) {
        var delegate = TokenFunc.Func;
        var NextIdx = LibGreenTea.ApplyTokenFunc(delegate, TokenContext, ScriptSource, Pos);
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

function ApplySyntaxPattern(NameSpace, TokenContext, LeftTree, Pattern) {
    var Pos = TokenContext.CurrentPosition;
    var ParseFlag = TokenContext.ParseFlag;
    var CurrentPattern = Pattern;
    while (CurrentPattern != null) {
        var delegate = CurrentPattern.MatchFunc;
        TokenContext.CurrentPosition = Pos;
        if (CurrentPattern.ParentPattern != null) {
            TokenContext.ParseFlag = ParseFlag | BackTrackParseFlag;
        }

        TokenContext.IndentLevel += 1;
        var ParsedTree = LibGreenTea.ApplyMatchFunc(delegate, NameSpace, TokenContext, LeftTree, CurrentPattern);
        TokenContext.IndentLevel -= 1;
        if (ParsedTree != null && ParsedTree.IsEmpty()) {
            ParsedTree = null;
        }

        TokenContext.ParseFlag = ParseFlag;
        if (ParsedTree != null) {
            return ParsedTree;
        }
        CurrentPattern = CurrentPattern.ParentPattern;
    }
    if (TokenContext.IsAllowedBackTrack()) {
        TokenContext.CurrentPosition = Pos;
    }
    if (Pattern == null) {
        LibGreenTea.DebugP("undefined syntax pattern: " + Pattern);
    }
    return TokenContext.ReportExpectedPattern(Pattern);
}

function ParseExpression(NameSpace, TokenContext) {
    var Pattern = TokenContext.GetFirstPattern();
    var LeftTree = ApplySyntaxPattern(NameSpace, TokenContext, null, Pattern);
    while (!IsEmptyOrError(LeftTree) && !TokenContext.MatchToken(";")) {
        var ExtendedPattern = TokenContext.GetExtendedPattern();
        if (ExtendedPattern == null) {
            break;
        }
        LeftTree = ApplySyntaxPattern(NameSpace, TokenContext, LeftTree, ExtendedPattern);
    }
    return LeftTree;
}

function ApplyTypeFunc(delegate, Gamma, ParsedTree, Type) {
    LibGreenTea.Assert(delegate != null);
    Gamma.NameSpace = ParsedTree.NameSpace;
    return LibGreenTea.ApplyTypeFunc(delegate, Gamma, ParsedTree, Type);
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

    GtToken.prototype.IsQuoted = function () {
        return IsFlag(this.TokenFlag, QuotedTokenFlag);
    };

    GtToken.prototype.IsNameSymbol = function () {
        return IsFlag(this.TokenFlag, NameSymbolTokenFlag);
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
        LibGreenTea.Assert(this.IsError());
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
        return this.Func.Func.toString();
    };
    return TokenFunc;
})();

var GtTokenContext = (function () {
    function GtTokenContext(NameSpace, Text, FileLine) {
        this.IndentLevel = 0;
        this.TopLevelNameSpace = NameSpace;
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
            Token.PresetPattern = this.TopLevelNameSpace.GetPattern(PatternName);
            LibGreenTea.Assert(Token.PresetPattern != null);
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
        this.TopLevelNameSpace.Context.ReportError(Level, Token, Message);
    };

    GtTokenContext.prototype.NewErrorSyntaxTree = function (Token, Message) {
        if (!this.IsAllowedBackTrack()) {
            this.TopLevelNameSpace.Context.ReportError(ErrorLevel, Token, Message);
            var ErrorTree = new GtSyntaxTree(Token.PresetPattern, this.TopLevelNameSpace, Token, null);
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
        if (!this.IsAllowedBackTrack()) {
            var Token = this.GetBeforeToken();
            if (Token != null) {
                return this.NewErrorSyntaxTree(Token, TokenText + " is expected after " + Token.ParsedText);
            }
            Token = this.GetToken();
            LibGreenTea.Assert(Token != GtTokenContext.NullToken);
            return this.NewErrorSyntaxTree(Token, TokenText + " is expected at " + Token.ParsedText);
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
        var TokenFunc = this.TopLevelNameSpace.GetTokenFunc(GtChar);
        var NextIdx = ApplyTokenFunc(TokenFunc, this, ScriptSource, pos);
        if (NextIdx == NoMatch) {
            LibGreenTea.DebugP("undefined tokenizer: " + LibGreenTea.CharAt(ScriptSource, pos));
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
            var gtCode = AsciiToTokenMatrixIndex(LibGreenTea.CharAt(ScriptSource, currentPos));
            var nextPos = this.DispatchFunc(ScriptSource, gtCode, currentPos);
            if (currentPos >= nextPos) {
                break;
            }
            currentPos = nextPos;
        }
        this.Dump();
    };

    GtTokenContext.prototype.GetToken = function () {
        while (this.CurrentPosition < this.SourceList.size()) {
            var Token = this.SourceList.get(this.CurrentPosition);
            if (Token.IsSource()) {
                this.SourceList.remove(this.SourceList.size() - 1);
                this.Tokenize(Token.ParsedText, Token.FileLine);
                if (this.CurrentPosition < this.SourceList.size()) {
                    Token = this.SourceList.get(this.CurrentPosition);
                } else {
                    break;
                }
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
        return this.TopLevelNameSpace.GetPattern(PatternName);
    };

    GtTokenContext.prototype.GetFirstPattern = function () {
        var Token = this.GetToken();
        if (Token.PresetPattern != null) {
            return Token.PresetPattern;
        }
        var Pattern = this.TopLevelNameSpace.GetPattern(Token.ParsedText);
        if (Pattern == null) {
            return this.TopLevelNameSpace.GetPattern("$Symbol$");
        }
        return Pattern;
    };

    GtTokenContext.prototype.GetExtendedPattern = function () {
        var Token = this.GetToken();
        if (Token != GtTokenContext.NullToken) {
            var Pattern = this.TopLevelNameSpace.GetExtendedPattern(Token.ParsedText);
            return Pattern;
        }
        return null;
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

    GtTokenContext.prototype.IsAllowedBackTrack = function () {
        return IsFlag(this.ParseFlag, BackTrackParseFlag);
    };

    GtTokenContext.prototype.SetBackTrack = function (Allowed) {
        var ParseFlag = this.ParseFlag;
        if (Allowed) {
            this.ParseFlag = this.ParseFlag | BackTrackParseFlag;
        } else {
            this.ParseFlag = (~(BackTrackParseFlag) & this.ParseFlag);
        }
        return ParseFlag;
    };

    GtTokenContext.prototype.ParsePatternAfter = function (NameSpace, LeftTree, PatternName, IsOptional) {
        var Pos = this.CurrentPosition;
        var ParseFlag = this.ParseFlag;
        var Pattern = this.GetPattern(PatternName);
        if (IsOptional) {
            this.ParseFlag = this.ParseFlag | BackTrackParseFlag;
        }
        var SyntaxTree = ApplySyntaxPattern(NameSpace, this, LeftTree, Pattern);
        this.ParseFlag = ParseFlag;
        if (SyntaxTree != null) {
            return SyntaxTree;
        }
        this.CurrentPosition = Pos;
        return null;
    };

    GtTokenContext.prototype.ParsePattern = function (NameSpace, PatternName, IsOptional) {
        return this.ParsePatternAfter(NameSpace, null, PatternName, IsOptional);
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
            LibGreenTea.DebugP("[" + pos + "]\t" + token + " : " + token.PresetPattern);
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
        return (left < right || (left == right && IsFlag(this.SyntaxFlag, LeftJoin) && IsFlag(Right.SyntaxFlag, LeftJoin)));
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

    GtSyntaxTree.prototype.AppendNext = function (Tree) {
        var TailTree = this;
        while (TailTree.NextTree != null) {
            TailTree = TailTree.NextTree;
        }
        TailTree.NextTree = Tree;
    };

    GtSyntaxTree.prototype.SetAnnotation = function (Annotation) {
        this.Annotation = Annotation;
    };

    GtSyntaxTree.prototype.IsError = function () {
        return this.KeyToken.IsError();
    };

    GtSyntaxTree.prototype.ToError = function (Token) {
        LibGreenTea.Assert(Token.IsError());
        this.KeyToken = Token;
        this.TreeList = null;
    };

    GtSyntaxTree.prototype.IsEmpty = function () {
        return (this.KeyToken == GtTokenContext.NullToken && this.Pattern == null);
    };

    GtSyntaxTree.prototype.ToEmpty = function () {
        this.KeyToken = GtTokenContext.NullToken;
        this.TreeList = null;
        this.Pattern = null;
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

    GtSyntaxTree.prototype.SetMatchedPatternAt = function (Index, NameSpace, TokenContext, PatternName, IsOptional) {
        if (!this.IsEmptyOrError()) {
            var ParsedTree = TokenContext.ParsePattern(NameSpace, PatternName, IsOptional);
            if (ParsedTree != null) {
                this.SetSyntaxTreeAt(Index, ParsedTree);
            } else if (ParsedTree == null && !IsOptional) {
                this.ToEmpty();
            }
        }
    };

    GtSyntaxTree.prototype.SetMatchedTokenAt = function (Index, NameSpace, TokenContext, TokenText, IsOptional) {
        if (!this.IsEmptyOrError()) {
            var Pos = TokenContext.CurrentPosition;
            var Token = TokenContext.Next();
            if (Token.ParsedText.equals(TokenText)) {
                this.SetSyntaxTreeAt(Index, new GtSyntaxTree(null, NameSpace, Token, null));
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
            if (Tree == null) {
                LibGreenTea.DebugP("");
            }
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

    GtSyntaxTree.prototype.GetParsedType = function () {
        return this.ConstValue;
    };

    GtSyntaxTree.prototype.HasNodeAt = function (Index) {
        if (this.TreeList != null && Index < this.TreeList.size()) {
            return this.TreeList.get(Index) != null;
        }
        return false;
    };

    GtSyntaxTree.prototype.TypeCheckNodeAt = function (Index, Gamma, Type, TypeCheckPolicy) {
        if (this.TreeList != null && Index < this.TreeList.size()) {
            var ParsedTree = this.TreeList.get(Index);
            if (ParsedTree != null) {
                var Node = ApplyTypeFunc(ParsedTree.Pattern.TypeFunc, Gamma, ParsedTree, Type);
                var TypedNode = Gamma.TypeCheckSingleNode(ParsedTree, Node, Type, TypeCheckPolicy);
                return TypedNode;
            }
        }
        if (IsFlag(TypeCheckPolicy, AllowEmptyPolicy)) {
            return Gamma.Generator.CreateEmptyNode(Gamma.VoidType);
        }
        return Gamma.CreateSyntaxErrorNode(this, "not empty");
    };
    return GtSyntaxTree;
})();

var GtFieldInfo = (function () {
    function GtFieldInfo(FieldFlag, Type, Name, FieldIndex) {
        this.FieldFlag = FieldFlag;
        this.Type = Type;
        this.Name = Name;
        this.NativeName = Name;
        this.FieldIndex = FieldIndex;
        this.InitValue = null;
        this.GetterFunc = null;
        this.SetterFunc = null;
    }
    return GtFieldInfo;
})();

var GtClassField = (function () {
    function GtClassField(SuperClass) {
        this.FieldList = new Array();
        if (SuperClass.NativeSpec instanceof GtClassField) {
            var SuperField = SuperClass.NativeSpec;
            var i = 0;
            while (i < SuperField.FieldList.size()) {
                this.FieldList.add(SuperField.FieldList.get(i));
                i += 1;
            }
        }
        this.ThisClassIndex = this.FieldList.size();
    }
    GtClassField.prototype.CreateField = function (FieldFlag, Type, Name) {
        var i = 0;
        while (i < this.FieldList.size()) {
            var FieldInfo = this.FieldList.get(i);
            if (FieldInfo.Name.equals(Name)) {
                return null;
            }
            i = i + 1;
        }
        var FieldInfo = new GtFieldInfo(FieldFlag, Type, Name, this.FieldList.size());
        this.FieldList.add(FieldInfo);
        return FieldInfo;
    };
    return GtClassField;
})();

var GtVariableInfo = (function () {
    function GtVariableInfo(VarFlag, Type, Name, Index) {
        this.VariableFlag = VarFlag;
        this.Type = Type;
        this.Name = Name;
        this.NativeName = NativeVariableName(Name, Index);
        this.UsedCount = 0;
        this.DefCount = 1;
    }
    return GtVariableInfo;
})();

var GtTypeEnv = (function () {
    function GtTypeEnv(NameSpace) {
        this.NameSpace = NameSpace;
        this.Context = NameSpace.Context;
        this.Generator = NameSpace.Context.Generator;
        this.Func = null;
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
    GtTypeEnv.prototype.IsStrictMode = function () {
        return this.Generator.IsStrictMode();
    };

    GtTypeEnv.prototype.IsTopLevel = function () {
        return (this.Func == null);
    };

    GtTypeEnv.prototype.AppendRecv = function (RecvType) {
        var ThisName = this.Generator.GetRecvName();
        this.AppendDeclaredVariable(0, RecvType, ThisName);
        this.LocalStackList.get(this.StackTopIndex - 1).NativeName = ThisName;
    };

    GtTypeEnv.prototype.AppendDeclaredVariable = function (VarFlag, Type, Name) {
        var VarInfo = new GtVariableInfo(VarFlag, Type, Name, this.StackTopIndex);
        if (this.StackTopIndex < this.LocalStackList.size()) {
            this.LocalStackList.set(this.StackTopIndex, VarInfo);
        } else {
            this.LocalStackList.add(VarInfo);
        }
        this.StackTopIndex += 1;
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

    GtTypeEnv.prototype.CreateCoercionNode = function (ParamType, TypeCoercion, Node) {
        var ApplyNode = this.Generator.CreateApplyNode(ParamType, null, TypeCoercion);
        ApplyNode.Append(Node);
        return ApplyNode;
    };

    GtTypeEnv.prototype.ReportTypeResult = function (ParsedTree, Node, Level, Message) {
        if (Level == ErrorLevel || (this.IsStrictMode() && Level == TypeErrorLevel)) {
            LibGreenTea.Assert(Node.Token == ParsedTree.KeyToken);
            this.NameSpace.Context.ReportError(ErrorLevel, Node.Token, Message);
            return this.Generator.CreateErrorNode(this.VoidType, ParsedTree);
        } else {
            this.NameSpace.Context.ReportError(Level, Node.Token, Message);
        }
        return Node;
    };

    GtTypeEnv.prototype.ReportTypeInference = function (SourceToken, Name, InfferedType) {
        this.Context.ReportError(InfoLevel, SourceToken, Name + " has type " + InfferedType);
    };

    GtTypeEnv.prototype.CreateSyntaxErrorNode = function (ParsedTree, Message) {
        this.NameSpace.Context.ReportError(ErrorLevel, ParsedTree.KeyToken, Message);
        return this.Generator.CreateErrorNode(this.VoidType, ParsedTree);
    };

    GtTypeEnv.prototype.SupportedOnlyTopLevelError = function (ParsedTree) {
        return this.CreateSyntaxErrorNode(ParsedTree, "supported only at top level " + ParsedTree.Pattern);
    };

    GtTypeEnv.prototype.UnsupportedTopLevelError = function (ParsedTree) {
        return this.CreateSyntaxErrorNode(ParsedTree, "unsupported at top level " + ParsedTree.Pattern);
    };

    GtTypeEnv.prototype.CreateLocalNode = function (ParsedTree, Name) {
        var VariableInfo = this.LookupDeclaredVariable(Name);
        if (VariableInfo != null) {
            return this.Generator.CreateLocalNode(VariableInfo.Type, ParsedTree, VariableInfo.NativeName);
        }
        return this.CreateSyntaxErrorNode(ParsedTree, "unresolved name: " + Name + "; not your fault");
    };

    GtTypeEnv.prototype.CreateDefaultValue = function (ParsedTree, Type) {
        return this.Generator.CreateConstNode(Type, ParsedTree, Type.DefaultNullValue);
    };

    GtTypeEnv.prototype.TypeEachNode = function (Tree, Type) {
        var Node = ApplyTypeFunc(Tree.Pattern.TypeFunc, this, Tree, Type);
        return Node;
    };

    GtTypeEnv.prototype.TypeCheckEachNode = function (Tree, Type, TypeCheckPolicy) {
        var Node = this.TypeEachNode(Tree, Type);
        if (Node.IsError()) {
            return Node;
        }
        return Node;
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

    GtTypeEnv.prototype.TypeCheck = function (ParsedTree, Type, TypeCheckPolicy) {
        return this.TypeBlock(ParsedTree, Type);
    };

    GtTypeEnv.prototype.TypeCheckSingleNode = function (ParsedTree, Node, Type, TypeCheckPolicy) {
        if (Node.IsError() || IsFlag(TypeCheckPolicy, NoCheckPolicy)) {
            return Node;
        }
        if (IsFlag(TypeCheckPolicy, AllowVoidPolicy) || Type == this.VoidType) {
            return Node;
        }
        if (Node.Type == this.VarType) {
            return this.ReportTypeResult(ParsedTree, Node, TypeErrorLevel, "unspecified type: " + Node.Token.ParsedText);
        }
        if (Node.Type == Type || Type == this.VarType || Type.Accept(Node.Type)) {
            return Node;
        }
        var Func = ParsedTree.NameSpace.GetCoercionFunc(Node.Type, Type, true);
        if (Func != null && IsFlag(TypeCheckPolicy, CastPolicy)) {
            var ApplyNode = this.Generator.CreateApplyNode(Type, ParsedTree, Func);
            ApplyNode.Append(Node);
            return ApplyNode;
        }
        return this.ReportTypeResult(ParsedTree, Node, TypeErrorLevel, "type error: requested = " + Type + ", given = " + Node.Type);
    };
    return GtTypeEnv;
})();

var GtNameSpace = (function () {
    function GtNameSpace(Context, ParentNameSpace) {
        this.Context = Context;
        this.ParentNameSpace = ParentNameSpace;
        this.PackageName = (ParentNameSpace != null) ? ParentNameSpace.PackageName : null;
        this.TokenMatrix = null;
        this.SymbolPatternTable = null;
    }
    GtNameSpace.prototype.GetTokenFunc = function (GtChar2) {
        if (this.TokenMatrix == null) {
            return this.ParentNameSpace.GetTokenFunc(GtChar2);
        }
        return this.TokenMatrix[GtChar2];
    };

    GtNameSpace.prototype.DefineTokenFunc = function (keys, f) {
        var i = 0;
        if (this.TokenMatrix == null) {
            this.TokenMatrix = new Array(MaxSizeOfChars);
            if (this.ParentNameSpace != null) {
                while (i < MaxSizeOfChars) {
                    this.TokenMatrix[i] = this.ParentNameSpace.GetTokenFunc(i);
                }
            }
        }
        i = 0;
        while (i < keys.length) {
            var kchar = AsciiToTokenMatrixIndex(LibGreenTea.CharAt(keys, i));
            this.TokenMatrix[kchar] = LibGreenTea.CreateOrReuseTokenFunc(f, this.TokenMatrix[kchar]);
            i += 1;
        }
    };

    GtNameSpace.prototype.GetSymbol = function (Key) {
        var NameSpace = this;
        while (NameSpace != null) {
            if (NameSpace.SymbolPatternTable != null) {
                var Value = NameSpace.SymbolPatternTable.get(Key);
                if (Value != null) {
                    return Value;
                }
            }
            NameSpace = NameSpace.ParentNameSpace;
        }
        return null;
    };

    GtNameSpace.prototype.SetSymbol = function (Key, Value) {
        if (this.SymbolPatternTable == null) {
            this.SymbolPatternTable = new GtMap();
        }
        this.SymbolPatternTable.put(Key, Value);
    };

    GtNameSpace.prototype.GetPattern = function (PatternName) {
        var Body = this.GetSymbol(PatternName);
        if (Body instanceof GtSyntaxPattern) {
            return Body;
        }
        return null;
    };

    GtNameSpace.prototype.GetExtendedPattern = function (PatternName) {
        var Body = this.GetSymbol("\t" + PatternName);
        if (Body instanceof GtSyntaxPattern) {
            return Body;
        }
        return null;
    };

    GtNameSpace.prototype.AppendPattern = function (PatternName, NewPattern) {
        LibGreenTea.Assert(NewPattern.ParentPattern == null);
        var ParentPattern = this.GetPattern(PatternName);
        NewPattern.ParentPattern = ParentPattern;
        this.SetSymbol(PatternName, NewPattern);
    };

    GtNameSpace.prototype.AppendSyntax = function (PatternName, MatchFunc, TypeFunc) {
        var Pattern = new GtSyntaxPattern(this, PatternName, MatchFunc, TypeFunc);
        this.AppendPattern(PatternName, Pattern);
    };

    GtNameSpace.prototype.AppendExtendedSyntax = function (PatternName, SyntaxFlag, MatchFunc, TypeFunc) {
        var Pattern = new GtSyntaxPattern(this, PatternName, MatchFunc, TypeFunc);
        Pattern.SyntaxFlag = SyntaxFlag;
        this.AppendPattern("\t" + PatternName, Pattern);
    };

    GtNameSpace.prototype.AppendTypeName = function (ClassInfo) {
        if (ClassInfo.PackageNameSpace == null) {
            ClassInfo.PackageNameSpace = this;
            if (this.PackageName != null) {
                this.Context.ClassNameMap.put(this.PackageName + "." + ClassInfo.ShortClassName, ClassInfo);
            }
        }
        if (ClassInfo.BaseType == ClassInfo) {
            this.SetSymbol(ClassInfo.ShortClassName, ClassInfo);
        }
        return ClassInfo;
    };

    GtNameSpace.prototype.GetClassSymbol = function (ClassType, Symbol, RecursiveSearch) {
        while (ClassType != null) {
            var Key = ClassSymbol(ClassType, Symbol);
            var Value = this.GetSymbol(Key);
            if (Value != null) {
                return Value;
            }
            if (!RecursiveSearch) {
                break;
            }
            ClassType = ClassType.SuperType;
        }
        return null;
    };

    GtNameSpace.prototype.GetGetterFunc = function (ClassType, Symbol, RecursiveSearch) {
        var Func = this.Context.RootNameSpace.GetClassSymbol(ClassType, Symbol, RecursiveSearch);
        if (Func instanceof GtFunc) {
            return Func;
        }
        return null;
    };

    GtNameSpace.prototype.GetSetterFunc = function (ClassType, Symbol, RecursiveSearch) {
        var Func = this.Context.RootNameSpace.GetClassSymbol(ClassType, Symbol + "=", RecursiveSearch);
        if (Func instanceof GtFunc) {
            return Func;
        }
        return null;
    };

    GtNameSpace.prototype.GetCoercionFunc = function (FromType, ToType, RecursiveSearch) {
        var Func = this.Context.RootNameSpace.GetClassSymbol(FromType, ToType.GetUniqueName(), RecursiveSearch);
        if (Func instanceof GtFunc) {
            return Func;
        }
        return null;
    };

    GtNameSpace.prototype.GetMethod = function (ClassType, Symbol, RecursiveSearch) {
        var PolyFunc = null;
        while (ClassType != null) {
            var Key = ClassSymbol(ClassType, Symbol);
            PolyFunc = JoinPolyFunc(ClassType, PolyFunc, this.GetSymbol(Key));
            if (!RecursiveSearch) {
                break;
            }
            ClassType = ClassType.SuperType;
        }
        return PolyFunc;
    };

    GtNameSpace.prototype.GetConstructorFunc = function (ClassType) {
        return this.Context.RootNameSpace.GetMethod(ClassType, "", false);
    };

    GtNameSpace.prototype.GetFuncParam = function (FuncName, BaseIndex, ParamTypes) {
        var FuncValue = this.GetSymbol(FuncName);
        if (FuncValue instanceof GtFunc) {
            var Func = FuncValue;
            if (Func.EqualsParamTypes(BaseIndex, ParamTypes)) {
                return Func;
            }
        } else if (FuncValue instanceof GtPolyFunc) {
            var PolyFunc = FuncValue;
            var i = PolyFunc.FuncList.size();
            while (i >= 1) {
                if (PolyFunc.FuncList.get(i - 1).EqualsParamTypes(BaseIndex, ParamTypes)) {
                    return PolyFunc.FuncList.get(i);
                }
                i = i - 1;
            }
        }
        return null;
    };

    GtNameSpace.prototype.PublicNameSpace = function (IsPublic) {
        return IsPublic ? this.Context.RootNameSpace : this;
    };

    GtNameSpace.prototype.AppendFuncName = function (Key, Func) {
        var OldValue = this.GetSymbol(Key);
        if (OldValue instanceof GtFunc) {
            var PolyFunc = new GtPolyFunc(this, OldValue);
            this.SetSymbol(Key, PolyFunc);
            return PolyFunc.Append(Func);
        } else if (OldValue instanceof GtPolyFunc) {
            var PolyFunc = (OldValue).Dup(this);
            this.SetSymbol(Key, PolyFunc);
            return PolyFunc.Append(Func);
        } else {
            this.SetSymbol(Key, Func);
        }
        return OldValue;
    };

    GtNameSpace.prototype.AppendFunc = function (Func) {
        return this.PublicNameSpace(Func.Is(PublicFunc)).AppendFuncName(Func.FuncName, Func);
    };

    GtNameSpace.prototype.AppendMethod = function (ClassType, Func) {
        var Key = ClassSymbol(ClassType, Func.FuncName);
        return this.PublicNameSpace(Func.Is(PublicFunc)).AppendFuncName(Key, Func);
    };

    GtNameSpace.prototype.AppendConstructor = function (ClassType, Func) {
        var Key = ClassSymbol(ClassType, "");
        Func.FuncFlag |= ConstructorFunc;
        this.Context.RootNameSpace.AppendFuncName(Key, Func);
    };

    GtNameSpace.prototype.SetGetterFunc = function (ClassType, Name, Func) {
        var Key = ClassSymbol(ClassType, Name);
        Func.FuncFlag |= GetterFunc;
        this.Context.RootNameSpace.SetSymbol(Key, Func);
    };

    GtNameSpace.prototype.SetSetterFunc = function (ClassType, Name, Func) {
        var Key = ClassSymbol(ClassType, Name + "=");
        Func.FuncFlag |= SetterFunc;
        this.Context.RootNameSpace.SetSymbol(Key, Func);
    };

    GtNameSpace.prototype.SetCoercionFunc = function (ClassType, ToType, Func) {
        var Key = ClassSymbol(ClassType, "to" + ToType);
        this.PublicNameSpace(Func.Is(PublicFunc)).SetSymbol(Key, Func);
    };

    GtNameSpace.prototype.ReportOverrideName = function (Token, ClassType, Symbol) {
        var Message = "duplicated symbol: ";
        if (ClassType == null) {
            Message += Symbol;
        } else {
            Message += ClassType + "." + Symbol;
        }
        this.Context.ReportError(WarningLevel, Token, Message);
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
            var ch = LibGreenTea.CharAt(SourceText, pos);
            if (!LibGreenTea.IsWhitespace(ch)) {
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
            var ch = LibGreenTea.CharAt(SourceText, pos);
            if (!LibGreenTea.IsWhitespace(ch)) {
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
            var ch = LibGreenTea.CharAt(SourceText, pos);
            if (!LibGreenTea.IsLetter(ch) && !LibGreenTea.IsDigit(ch) && ch != 95) {
                break;
            }
            pos += 1;
        }
        TokenContext.AddNewToken(SourceText.substring(start, pos), NameSymbolTokenFlag, null);
        return pos;
    };

    DScriptGrammar.OperatorToken = function (TokenContext, SourceText, pos) {
        var NextPos = pos + 1;
        while (NextPos < SourceText.length) {
            var ch = LibGreenTea.CharAt(SourceText, NextPos);
            if (LibGreenTea.IsWhitespace(ch) || LibGreenTea.IsLetter(ch) || LibGreenTea.IsDigit(ch)) {
                break;
            }
            NextPos += 1;
        }
        var Matched = false;
        while (NextPos > pos) {
            var Sub = SourceText.substring(pos, NextPos);
            var Pattern = TokenContext.TopLevelNameSpace.GetExtendedPattern(Sub);
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
            var NextChar = LibGreenTea.CharAt(SourceText, NextPos);
            if (NextChar != 47 && NextChar != 42) {
                return NoMatch;
            }
            var Level = 0;
            var PrevChar = 0;
            if (NextChar == 42) {
                Level = 1;
            }
            while (NextPos < SourceText.length) {
                NextChar = LibGreenTea.CharAt(SourceText, NextPos);
                if (NextChar == ('\n'.charCodeAt(0)) && Level == 0) {
                    return DScriptGrammar.IndentToken(TokenContext, SourceText, NextPos);
                }
                if (NextChar == 47 && PrevChar == 42) {
                    if (Level == 1) {
                        return NextPos + 1;
                    }
                    Level = Level - 1;
                }
                if (Level > 0) {
                    if (NextChar == 42 && PrevChar == 47) {
                        Level = Level + 1;
                    }
                }
                PrevChar = NextChar;
                NextPos = NextPos + 1;
            }
        }
        return NoMatch;
    };

    DScriptGrammar.NumberLiteralToken = function (TokenContext, SourceText, pos) {
        var start = pos;
        while (pos < SourceText.length) {
            var ch = LibGreenTea.CharAt(SourceText, pos);
            if (!LibGreenTea.IsDigit(ch)) {
                break;
            }
            pos += 1;
        }
        TokenContext.AddNewToken(SourceText.substring(start, pos), 0, "$IntegerLiteral$");
        return pos;
    };

    DScriptGrammar.StringLiteralToken = function (TokenContext, SourceText, pos) {
        var start = pos;
        var prev = 34;
        pos = pos + 1;
        while (pos < SourceText.length) {
            var ch = LibGreenTea.CharAt(SourceText, pos);
            if (ch == 34 && prev != ('\\'.charCodeAt(0))) {
                TokenContext.AddNewToken(SourceText.substring(start, pos + 1), QuotedTokenFlag, "$StringLiteral$");
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

    DScriptGrammar.StringLiteralToken_StringInterpolation = function (TokenContext, SourceText, pos) {
        var start = pos + 1;
        var NextPos = start;
        var prev = 34;
        while (NextPos < SourceText.length) {
            var ch = LibGreenTea.CharAt(SourceText, NextPos);
            if (ch == 36) {
                var end = NextPos + 1;
                ch = LibGreenTea.CharAt(SourceText, end);
                if (ch == 123) {
                    while (end < SourceText.length) {
                        ch = LibGreenTea.CharAt(SourceText, end);
                        if (ch == 125) {
                            break;
                        }
                        end = end + 1;
                    }
                    var Expr = SourceText.substring(NextPos + 2, end);
                    var LocalContext = new GtTokenContext(TokenContext.TopLevelNameSpace, Expr, TokenContext.ParsingLine);
                    LocalContext.SkipEmptyStatement();

                    TokenContext.AddNewToken("\"" + SourceText.substring(start, NextPos) + "\"", 0, "$StringLiteral$");
                    TokenContext.AddNewToken("+", 0, null);
                    while (LocalContext.HasNext()) {
                        var NewToken = LocalContext.Next();
                        TokenContext.AddNewToken(NewToken.ParsedText, 0, null);
                    }
                    TokenContext.AddNewToken("+", 0, null);
                    end = end + 1;
                    start = end;
                    NextPos = end;
                    prev = ch;
                    if (ch == 34) {
                        TokenContext.AddNewToken("\"" + SourceText.substring(start, NextPos) + "\"", 0, "$StringLiteral$");
                        return NextPos + 1;
                    }
                    continue;
                }
            }
            if (ch == 34 && prev != ('\\'.charCodeAt(0))) {
                TokenContext.AddNewToken("\"" + SourceText.substring(start, NextPos) + "\"", 0, "$StringLiteral$");
                return NextPos + 1;
            }
            if (ch == ('\n'.charCodeAt(0))) {
                TokenContext.ReportTokenError(ErrorLevel, "expected \"close: tostring: the literal", SourceText.substring(start, NextPos));
                TokenContext.FoundLineFeed(1);
                return NextPos;
            }
            NextPos = NextPos + 1;
            prev = ch;
        }
        TokenContext.ReportTokenError(ErrorLevel, "expected \"close: tostring: the literal", SourceText.substring(start, NextPos));
        return NextPos;
    };

    DScriptGrammar.ParseType = function (NameSpace, TokenContext, LeftTree, Pattern) {
        var Token = TokenContext.Next();
        var ConstValue = NameSpace.GetSymbol(Token.ParsedText);
        if (!(ConstValue instanceof GtType)) {
            return null;
        }
        var ParsedType = ConstValue;
        var BacktrackPosition = TokenContext.CurrentPosition;
        if (ParsedType.IsGenericType()) {
            if (TokenContext.MatchToken("<")) {
                var TypeList = new Array();
                while (!TokenContext.MatchToken(">")) {
                    var ParamTree = TokenContext.ParsePattern(NameSpace, "$Type$", Optional);
                    if (ParamTree == null) {
                        TokenContext.CurrentPosition = BacktrackPosition;
                        return new GtSyntaxTree(Pattern, NameSpace, Token, ParsedType);
                    }
                    TypeList.add(ParamTree.GetParsedType());
                    if (TokenContext.MatchToken(",")) {
                        continue;
                    }
                }
                ParsedType = NameSpace.Context.GetGenericType(ParsedType, 0, TypeList, true);
                BacktrackPosition = TokenContext.CurrentPosition;
            }
        }
        while (TokenContext.MatchToken("[")) {
            if (!TokenContext.MatchToken("]")) {
                TokenContext.CurrentPosition = BacktrackPosition;
                return new GtSyntaxTree(Pattern, NameSpace, Token, ParsedType);
            }
            ParsedType = NameSpace.Context.GetGenericType1(NameSpace.Context.ArrayType, ParsedType, true);
            BacktrackPosition = TokenContext.CurrentPosition;
        }
        return new GtSyntaxTree(Pattern, NameSpace, Token, ParsedType);
    };

    DScriptGrammar.ParseConst = function (NameSpace, TokenContext, LeftTree, Pattern) {
        var Token = TokenContext.Next();
        var ConstValue = NameSpace.GetSymbol(Token.ParsedText);
        if (ConstValue != null) {
            return new GtSyntaxTree(Pattern, NameSpace, Token, ConstValue);
        }
        return null;
    };

    DScriptGrammar.TypeConst = function (Gamma, ParsedTree, ContextType) {
        if ((typeof ParsedTree.ConstValue == 'string' || ParsedTree.ConstValue instanceof String)) {
            ParsedTree.ConstValue = LibGreenTea.UnescapeString(ParsedTree.ConstValue);
        }
        return Gamma.Generator.CreateConstNode(Gamma.Context.GuessType(ParsedTree.ConstValue), ParsedTree, ParsedTree.ConstValue);
    };

    DScriptGrammar.ParseNull = function (NameSpace, TokenContext, LeftTree, Pattern) {
        var Token = TokenContext.GetMatchedToken("null");
        var NewTree = new GtSyntaxTree(Pattern, NameSpace, Token, null);
        return NewTree;
    };

    DScriptGrammar.TypeNull = function (Gamma, ParsedTree, ContextType) {
        var ThisType = ContextType;
        if (ThisType == Gamma.VarType) {
            ThisType = Gamma.AnyType;
        }
        return Gamma.Generator.CreateNullNode(ThisType, ParsedTree);
    };

    DScriptGrammar.ParseSymbol = function (NameSpace, TokenContext, LeftTree, Pattern) {
        var TypeTree = TokenContext.ParsePattern(NameSpace, "$Type$", Optional);
        if (TypeTree != null) {
            var DeclTree = TokenContext.ParsePatternAfter(NameSpace, TypeTree, "$FuncDecl$", Optional);
            if (DeclTree != null) {
                return DeclTree;
            }
            DeclTree = TokenContext.ParsePatternAfter(NameSpace, TypeTree, "$VarDecl$", Optional);
            if (DeclTree != null) {
                return DeclTree;
            }
            return TypeTree;
        }
        var Token = TokenContext.Next();

        return new GtSyntaxTree(NameSpace.GetPattern("$Variable$"), NameSpace, Token, null);
    };

    DScriptGrammar.ParseVariable = function (NameSpace, TokenContext, LeftTree, Pattern) {
        var Token = TokenContext.Next();
        var ch = LibGreenTea.CharAt(Token.ParsedText, 0);
        if (LibGreenTea.IsLetter(ch) || ch == 95) {
            return new GtSyntaxTree(Pattern, NameSpace, Token, null);
        }
        return null;
    };

    DScriptGrammar.TypeVariable = function (Gamma, ParsedTree, ContextType) {
        var Name = ParsedTree.KeyToken.ParsedText;
        var VariableInfo = Gamma.LookupDeclaredVariable(Name);
        if (VariableInfo != null) {
            return Gamma.Generator.CreateLocalNode(VariableInfo.Type, ParsedTree, VariableInfo.NativeName);
        }
        if (Name.equals("this")) {
            VariableInfo = Gamma.LookupDeclaredVariable(Gamma.Generator.GetRecvName());
            if (VariableInfo != null) {
                return Gamma.Generator.CreateLocalNode(VariableInfo.Type, ParsedTree, VariableInfo.NativeName);
            }
        }
        var ConstValue = ParsedTree.NameSpace.GetSymbol(Name);
        if (ConstValue != null) {
            return Gamma.Generator.CreateConstNode(Gamma.Context.GuessType(ConstValue), ParsedTree, ConstValue);
        }
        var Node = Gamma.Generator.CreateLocalNode(Gamma.AnyType, ParsedTree, Name + Gamma.Generator.BlockComment("undefined"));
        return Gamma.ReportTypeResult(ParsedTree, Node, TypeErrorLevel, "undefined name: " + Name);
    };

    DScriptGrammar.ParseVarDecl = function (NameSpace, TokenContext, LeftTree, Pattern) {
        var Tree = new GtSyntaxTree(Pattern, NameSpace, TokenContext.GetToken(), null);
        if (LeftTree == null) {
            Tree.SetMatchedPatternAt(VarDeclType, NameSpace, TokenContext, "$Type$", Required);
        } else {
            Tree.SetSyntaxTreeAt(VarDeclType, LeftTree);
        }
        Tree.SetMatchedPatternAt(VarDeclName, NameSpace, TokenContext, "$Variable$", Required);
        if (Tree.IsEmptyOrError()) {
            return null;
        }
        if (TokenContext.MatchToken("=")) {
            Tree.SetMatchedPatternAt(VarDeclValue, NameSpace, TokenContext, "$Expression$", Required);
        }
        while (TokenContext.MatchToken(",")) {
            var NextTree = new GtSyntaxTree(Pattern, NameSpace, Tree.KeyToken, null);
            NextTree.SetSyntaxTreeAt(VarDeclType, Tree.GetSyntaxTreeAt(VarDeclType));
            Tree = LinkTree(Tree, NextTree);
            Tree.SetMatchedPatternAt(VarDeclName, NameSpace, TokenContext, "$Variable$", Required);
            if (TokenContext.MatchToken("=")) {
                Tree.SetMatchedPatternAt(VarDeclValue, NameSpace, TokenContext, "$Expression$", Required);
            }
        }
        return Tree;
    };

    DScriptGrammar.TypeVarDecl = function (Gamma, ParsedTree, ContextType) {
        var VarFlag = Gamma.Generator.ParseVarFlag(0, ParsedTree.Annotation);
        var TypeTree = ParsedTree.GetSyntaxTreeAt(VarDeclType);
        var NameTree = ParsedTree.GetSyntaxTreeAt(VarDeclName);
        var ValueTree = ParsedTree.GetSyntaxTreeAt(VarDeclValue);
        var DeclType = TypeTree.GetParsedType();
        var VariableName = NameTree.KeyToken.ParsedText;
        Gamma.AppendDeclaredVariable(VarFlag, DeclType, VariableName);
        var VariableNode = Gamma.TypeCheck(NameTree, DeclType, DefaultTypeCheckPolicy);
        if (VariableNode.IsError()) {
            return VariableNode;
        }
        var InitValueNode = (ValueTree == null) ? Gamma.CreateDefaultValue(ParsedTree, DeclType) : Gamma.TypeCheck(ValueTree, DeclType, DefaultTypeCheckPolicy);
        var BlockNode = Gamma.TypeBlock(ParsedTree.NextTree, ContextType);
        ParsedTree.NextTree = null;
        return Gamma.Generator.CreateLetNode(DeclType, ParsedTree, DeclType, (VariableNode).NativeName, InitValueNode, BlockNode);
    };

    DScriptGrammar.ParseIntegerLiteral = function (NameSpace, TokenContext, LeftTree, Pattern) {
        var Token = TokenContext.Next();
        return new GtSyntaxTree(Pattern, NameSpace, Token, LibGreenTea.ParseInt(Token.ParsedText));
    };

    DScriptGrammar.ParseStringLiteral = function (NameSpace, TokenContext, LeftTree, Pattern) {
        var Token = TokenContext.Next();
        var NewTree = new GtSyntaxTree(Pattern, NameSpace, Token, Token.ParsedText);
        return NewTree;
    };

    DScriptGrammar.ParseExpression = function (NameSpace, TokenContext, LeftTree, Pattern) {
        return ParseExpression(NameSpace, TokenContext);
    };

    DScriptGrammar.ParseUnary = function (NameSpace, TokenContext, LeftTree, Pattern) {
        var Token = TokenContext.Next();
        var Tree = new GtSyntaxTree(Pattern, NameSpace, Token, null);
        Tree.SetMatchedPatternAt(UnaryTerm, NameSpace, TokenContext, "$Expression$", Required);
        return Tree;
    };

    DScriptGrammar.TypeUnary = function (Gamma, ParsedTree, ContextType) {
        var OperatorSymbol = ParsedTree.KeyToken.ParsedText;
        var ExprNode = ParsedTree.TypeCheckNodeAt(UnaryTerm, Gamma, Gamma.VarType, DefaultTypeCheckPolicy);
        if (ExprNode.IsError()) {
            return ExprNode;
        }
        var BaseType = ExprNode.Type;
        var ReturnType = Gamma.AnyType;
        var ResolvedFunc = null;
        var PolyFunc = ParsedTree.NameSpace.GetMethod(BaseType, OperatorSymbol, true);
        if (PolyFunc != null) {
            ResolvedFunc = PolyFunc.ResolveUnaryFunc(Gamma, ParsedTree, ExprNode);
        }
        if (ResolvedFunc == null) {
            Gamma.Context.ReportError(TypeErrorLevel, ParsedTree.KeyToken, "mismatched operators: " + PolyFunc);
        } else {
            ReturnType = ResolvedFunc.GetReturnType();
        }
        var UnaryNode = Gamma.Generator.CreateUnaryNode(ReturnType, ParsedTree, ResolvedFunc, ExprNode);
        if (ResolvedFunc == null && !BaseType.IsDynamic()) {
            return Gamma.ReportTypeResult(ParsedTree, UnaryNode, TypeErrorLevel, "undefined operator: " + OperatorSymbol + " of " + BaseType);
        }
        return UnaryNode;
    };

    DScriptGrammar.ParseBinary = function (NameSpace, TokenContext, LeftTree, Pattern) {
        var Token = TokenContext.Next();
        var RightTree = ParseExpression(NameSpace, TokenContext);
        if (IsEmptyOrError(RightTree)) {
            return RightTree;
        }
        if (RightTree.Pattern.IsBinaryOperator()) {
            if (Pattern.IsLeftJoin(RightTree.Pattern)) {
                var NewTree = new GtSyntaxTree(Pattern, NameSpace, Token, null);
                NewTree.SetSyntaxTreeAt(LeftHandTerm, LeftTree);
                NewTree.SetSyntaxTreeAt(RightHandTerm, RightTree.GetSyntaxTreeAt(LeftHandTerm));
                RightTree.SetSyntaxTreeAt(LeftHandTerm, NewTree);
                return RightTree;
            }
        }
        var NewTree = new GtSyntaxTree(Pattern, NameSpace, Token, null);
        NewTree.SetSyntaxTreeAt(LeftHandTerm, LeftTree);
        NewTree.SetSyntaxTreeAt(RightHandTerm, RightTree);
        if (RightTree.NextTree != null) {
            LinkTree(NewTree, RightTree.NextTree);
            RightTree.NextTree = null;
        }
        return NewTree;
    };

    DScriptGrammar.TypeBinary = function (Gamma, ParsedTree, ContextType) {
        var OperatorSymbol = ParsedTree.KeyToken.ParsedText;
        var LeftNode = ParsedTree.TypeCheckNodeAt(LeftHandTerm, Gamma, Gamma.VarType, DefaultTypeCheckPolicy);
        var RightNode = ParsedTree.TypeCheckNodeAt(RightHandTerm, Gamma, Gamma.VarType, DefaultTypeCheckPolicy);
        if (LeftNode.IsError()) {
            return LeftNode;
        }
        if (RightNode.IsError()) {
            return RightNode;
        }
        var BaseType = LeftNode.Type;
        var ReturnType = Gamma.AnyType;
        var ResolvedFunc = null;
        var PolyFunc = ParsedTree.NameSpace.GetMethod(BaseType, OperatorSymbol, true);
        if (PolyFunc != null) {
            var BinaryNodes = new Array(2);
            BinaryNodes[0] = LeftNode;
            BinaryNodes[1] = RightNode;
            ResolvedFunc = PolyFunc.ResolveBinaryFunc(Gamma, BinaryNodes);
            LeftNode = BinaryNodes[0];
            RightNode = BinaryNodes[1];
        }
        if (ResolvedFunc == null) {
            Gamma.Context.ReportError(TypeErrorLevel, ParsedTree.KeyToken, "mismatched operators: " + PolyFunc);
        } else {
            ReturnType = ResolvedFunc.GetReturnType();
        }
        var BinaryNode = Gamma.Generator.CreateBinaryNode(ReturnType, ParsedTree, ResolvedFunc, LeftNode, RightNode);
        if (ResolvedFunc == null && !BaseType.IsDynamic()) {
            return Gamma.ReportTypeResult(ParsedTree, BinaryNode, TypeErrorLevel, "undefined operator: " + OperatorSymbol + " of " + LeftNode.Type);
        }
        return BinaryNode;
    };

    DScriptGrammar.ParseGroup = function (NameSpace, TokenContext, LeftTree, Pattern) {
        var ParseFlag = TokenContext.ParseFlag;
        TokenContext.ParseFlag |= SkipIndentParseFlag;
        var GroupTree = new GtSyntaxTree(Pattern, NameSpace, TokenContext.GetMatchedToken("("), null);
        var Tree = TokenContext.ParsePattern(NameSpace, "$Expression$", Required);
        GroupTree.AppendParsedTree(Tree);
        if (!TokenContext.MatchToken(")")) {
            GroupTree = TokenContext.ReportExpectedToken(")");
        }
        TokenContext.ParseFlag = ParseFlag;
        return GroupTree;
    };

    DScriptGrammar.TypeGroup = function (Gamma, ParsedTree, ContextType) {
        return ParsedTree.TypeCheckNodeAt(UnaryTerm, Gamma, ContextType, DefaultTypeCheckPolicy);
    };

    DScriptGrammar.ParseCast = function (NameSpace, TokenContext, LeftTree, Pattern) {
        var ParseFlag = TokenContext.ParseFlag;
        TokenContext.ParseFlag |= SkipIndentParseFlag;
        var FirstToken = TokenContext.Next();
        var CastTree = null;
        if (TokenContext.MatchToken("to")) {
            CastTree = new GtSyntaxTree(Pattern, NameSpace, TokenContext.GetBeforeToken(), null);
        } else if (TokenContext.MatchToken("as")) {
            CastTree = new GtSyntaxTree(Pattern, NameSpace, TokenContext.GetBeforeToken(), null);
        } else {
            CastTree = new GtSyntaxTree(Pattern, NameSpace, FirstToken, null);
        }
        CastTree.SetMatchedPatternAt(LeftHandTerm, NameSpace, TokenContext, "$Type$", Required);
        CastTree.SetMatchedTokenAt(NoWhere, NameSpace, TokenContext, ")", Required);
        TokenContext.ParseFlag = ParseFlag;
        CastTree.SetMatchedPatternAt(RightHandTerm, NameSpace, TokenContext, "$Expression$", Required);
        return CastTree;
    };

    DScriptGrammar.TypeCast = function (Gamma, ParsedTree, ContextType) {
        var CastType = ParsedTree.GetSyntaxTreeAt(LeftHandTerm).GetParsedType();
        var TypeCheckPolicy = CastPolicy;
        return ParsedTree.TypeCheckNodeAt(RightHandTerm, Gamma, CastType, TypeCheckPolicy);
    };

    DScriptGrammar.ParseGetter = function (NameSpace, TokenContext, LeftTree, Pattern) {
        TokenContext.MatchToken(".");
        var Token = TokenContext.Next();
        if (Token.IsNameSymbol()) {
            var NewTree = new GtSyntaxTree(Pattern, NameSpace, Token, null);
            NewTree.AppendParsedTree(LeftTree);
            return NewTree;
        }
        return TokenContext.ReportExpectedToken("field name");
    };

    DScriptGrammar.TypeGetter = function (Gamma, ParsedTree, ContextType) {
        var Name = ParsedTree.KeyToken.ParsedText;
        var ObjectNode = ParsedTree.TypeCheckNodeAt(UnaryTerm, Gamma, Gamma.VarType, DefaultTypeCheckPolicy);
        if (ObjectNode.IsError()) {
            return ObjectNode;
        }

        if (ObjectNode instanceof ConstNode && ObjectNode.Type == Gamma.Context.TypeType) {
            var ObjectType = (ObjectNode).ConstValue;
            var ConstValue = ParsedTree.NameSpace.GetClassSymbol(ObjectType, Name, true);
            if (ConstValue != null) {
                return Gamma.Generator.CreateConstNode(Gamma.Context.GuessType(ConstValue), ParsedTree, ConstValue);
            }
        }
        var GetterFunc = ParsedTree.NameSpace.GetGetterFunc(ObjectNode.Type, Name, true);
        var ReturnType = (GetterFunc != null) ? GetterFunc.GetReturnType() : Gamma.AnyType;
        var Node = Gamma.Generator.CreateGetterNode(ReturnType, ParsedTree, GetterFunc, ObjectNode);
        if (GetterFunc == null) {
            if (!ObjectNode.Type.IsDynamic() && ContextType != Gamma.FuncType) {
                return Gamma.ReportTypeResult(ParsedTree, Node, TypeErrorLevel, "undefined name " + Name + " of " + ObjectNode.Type);
            }
        }
        return Node;
    };

    DScriptGrammar.ParseApply = function (NameSpace, TokenContext, LeftTree, Pattern) {
        var ParseFlag = TokenContext.ParseFlag;
        TokenContext.ParseFlag |= SkipIndentParseFlag;
        var FuncTree = new GtSyntaxTree(Pattern, NameSpace, TokenContext.GetMatchedToken("("), null);
        FuncTree.AppendParsedTree(LeftTree);
        if (!TokenContext.MatchToken(")")) {
            while (!FuncTree.IsEmptyOrError()) {
                if (TokenContext.CurrentPosition > 150) {
                    LibGreenTea.DebugP("");
                }
                var Tree = TokenContext.ParsePattern(NameSpace, "$Expression$", Required);
                FuncTree.AppendParsedTree(Tree);
                if (TokenContext.MatchToken(")")) {
                    break;
                }
                FuncTree.SetMatchedTokenAt(NoWhere, NameSpace, TokenContext, ",", Required);
            }
        }
        TokenContext.ParseFlag = ParseFlag;
        return FuncTree;
    };

    DScriptGrammar.TypeApply = function (Gamma, ParsedTree, ContextType) {
        var FuncNode = ParsedTree.TypeCheckNodeAt(0, Gamma, Gamma.FuncType, NoCheckPolicy);
        if (FuncNode.IsError()) {
            return FuncNode;
        }
        var NodeList = new Array();
        NodeList.add(FuncNode);
        var ResolvedFunc = null;
        var TreeIndex = 1;
        if (FuncNode instanceof GetterNode) {
            var BaseNode = (FuncNode).Expr;
            var FuncName = FuncNode.Token.ParsedText;
            NodeList.add(BaseNode);
            var PolyFunc = ParsedTree.NameSpace.GetMethod(BaseNode.Type, FuncName, true);
            ResolvedFunc = PolyFunc.ResolveFunc(Gamma, ParsedTree, TreeIndex, NodeList);
        } else if (FuncNode instanceof ConstNode) {
            var Func = (FuncNode).ConstValue;
            if (Func instanceof GtFunc) {
                ResolvedFunc = Func;
            } else if (Func instanceof GtType) {
                var ClassType = Func;
                var PolyFunc = ParsedTree.NameSpace.GetConstructorFunc(ClassType);
                if (PolyFunc == null) {
                    return Gamma.CreateSyntaxErrorNode(ParsedTree, "no constructor: " + ClassType);
                }
                NodeList.set(0, Gamma.Generator.CreateNullNode(ClassType, ParsedTree));
                ResolvedFunc = PolyFunc.ResolveFunc(Gamma, ParsedTree, 1, NodeList);
                if (ResolvedFunc == null) {
                    Gamma.Context.ReportError(TypeErrorLevel, ParsedTree.KeyToken, "mismatched : constructor" + PolyFunc);
                }
                var NewNode = Gamma.Generator.CreateNewNode(ClassType, ParsedTree, ResolvedFunc);
                NewNode.AppendNodeList(NodeList);
                return NewNode;
            } else if (Func instanceof GtPolyFunc) {
                var PolyFunc = Func;
                var ParamList = new Array();
                ResolvedFunc = PolyFunc.ResolveFunc(Gamma, ParsedTree, 1, ParamList);
                if (ResolvedFunc != null) {
                    (FuncNode).ConstValue = ResolvedFunc;
                    (FuncNode).Type = ResolvedFunc.GetFuncType();
                }
            }
        }
        var ReturnType = Gamma.AnyType;
        if (FuncNode.Type == Gamma.AnyType) {
            while (TreeIndex < ListSize(ParsedTree.TreeList)) {
                var Node = ParsedTree.TypeCheckNodeAt(TreeIndex, Gamma, Gamma.VarType, DefaultTypeCheckPolicy);
                if (Node.IsError()) {
                    return Node;
                }
                NodeList.add(Node);
                TreeIndex = TreeIndex + 1;
            }
        } else if (FuncNode.Type.BaseType == Gamma.FuncType) {
            var FuncType = FuncNode.Type;
            LibGreenTea.Assert(ListSize(ParsedTree.TreeList) == FuncType.TypeParams.length);
            while (TreeIndex < ListSize(ParsedTree.TreeList)) {
                var Node = ParsedTree.TypeCheckNodeAt(TreeIndex, Gamma, FuncType.TypeParams[TreeIndex], DefaultTypeCheckPolicy);
                if (Node.IsError()) {
                    return Node;
                }
                NodeList.add(Node);
                TreeIndex = TreeIndex + 1;
            }
            ReturnType = FuncType.TypeParams[0];
        } else {
            return Gamma.CreateSyntaxErrorNode(ParsedTree, FuncNode.Type + " is not applicapable");
        }
        var Node = Gamma.Generator.CreateApplyNode(ReturnType, ParsedTree, ResolvedFunc);
        Node.AppendNodeList(NodeList);
        return Node;
    };

    DScriptGrammar.TypeAnd = function (Gamma, ParsedTree, ContextType) {
        var LeftNode = ParsedTree.TypeCheckNodeAt(LeftHandTerm, Gamma, Gamma.BooleanType, DefaultTypeCheckPolicy);
        var RightNode = ParsedTree.TypeCheckNodeAt(RightHandTerm, Gamma, Gamma.BooleanType, DefaultTypeCheckPolicy);
        return Gamma.Generator.CreateAndNode(Gamma.BooleanType, ParsedTree, LeftNode, RightNode);
    };

    DScriptGrammar.TypeOr = function (Gamma, ParsedTree, ContextType) {
        var LeftNode = ParsedTree.TypeCheckNodeAt(LeftHandTerm, Gamma, Gamma.BooleanType, DefaultTypeCheckPolicy);
        var RightNode = ParsedTree.TypeCheckNodeAt(RightHandTerm, Gamma, Gamma.BooleanType, DefaultTypeCheckPolicy);
        return Gamma.Generator.CreateOrNode(Gamma.BooleanType, ParsedTree, LeftNode, RightNode);
    };

    DScriptGrammar.TypeAssign = function (Gamma, ParsedTree, ContextType) {
        var LeftNode = ParsedTree.TypeCheckNodeAt(LeftHandTerm, Gamma, Gamma.VarType, DefaultTypeCheckPolicy);
        var RightNode = ParsedTree.TypeCheckNodeAt(RightHandTerm, Gamma, LeftNode.Type, DefaultTypeCheckPolicy);
        return Gamma.Generator.CreateAssignNode(LeftNode.Type, ParsedTree, LeftNode, RightNode);
    };

    DScriptGrammar.ParseEmpty = function (NameSpace, TokenContext, LeftTree, Pattern) {
        return new GtSyntaxTree(Pattern, NameSpace, TokenContext.GetBeforeToken(), null);
    };

    DScriptGrammar.TypeEmpty = function (Gamma, ParsedTree, Type) {
        return Gamma.Generator.CreateEmptyNode(Gamma.VoidType);
    };

    DScriptGrammar.ParseBlock = function (ParentNameSpace, TokenContext, LeftTree, Pattern) {
        if (TokenContext.MatchToken("{")) {
            var PrevTree = null;
            var NameSpace = new GtNameSpace(ParentNameSpace.Context, ParentNameSpace);
            while (TokenContext.SkipEmptyStatement()) {
                if (TokenContext.MatchToken("}")) {
                    break;
                }
                var Annotation = TokenContext.SkipAndGetAnnotation(true);
                var CurrentTree = ParseExpression(NameSpace, TokenContext);
                if (IsEmptyOrError(CurrentTree)) {
                    return CurrentTree;
                }
                CurrentTree.SetAnnotation(Annotation);
                PrevTree = LinkTree(PrevTree, CurrentTree);
            }
            if (PrevTree == null) {
                return TokenContext.ParsePattern(NameSpace, "$Empty$", Required);
            }
            return TreeHead(PrevTree);
        }
        return null;
    };

    DScriptGrammar.ParseStatement = function (NameSpace, TokenContext, LeftTree, Pattern) {
        var StmtTree = TokenContext.ParsePattern(NameSpace, "$Block$", Optional);
        if (StmtTree == null) {
            StmtTree = ParseExpression(NameSpace, TokenContext);
        }
        if (StmtTree == null) {
            StmtTree = TokenContext.ParsePattern(NameSpace, "$Empty$", Required);
        }
        return StmtTree;
    };

    DScriptGrammar.TypeBlock = function (Gamma, ParsedTree, ContextType) {
        return Gamma.TypeBlock(ParsedTree, ContextType);
    };

    DScriptGrammar.ParseIf = function (NameSpace, TokenContext, LeftTree, Pattern) {
        var ParseFlag = TokenContext.ParseFlag;
        TokenContext.ParseFlag |= SkipIndentParseFlag;
        var Token = TokenContext.GetMatchedToken("if");
        var NewTree = new GtSyntaxTree(Pattern, NameSpace, Token, null);
        NewTree.SetMatchedTokenAt(NoWhere, NameSpace, TokenContext, "(", Required);
        NewTree.SetMatchedPatternAt(IfCond, NameSpace, TokenContext, "$Expression$", Required);
        NewTree.SetMatchedTokenAt(NoWhere, NameSpace, TokenContext, ")", Required);
        NewTree.SetMatchedPatternAt(IfThen, NameSpace, TokenContext, "$Statement$", Required);
        if (TokenContext.MatchToken("else")) {
            NewTree.SetMatchedPatternAt(IfElse, NameSpace, TokenContext, "$Statement$", Required);
        }
        TokenContext.ParseFlag = ParseFlag;
        return NewTree;
    };

    DScriptGrammar.TypeIf = function (Gamma, ParsedTree, ContextType) {
        var CondNode = ParsedTree.TypeCheckNodeAt(IfCond, Gamma, Gamma.BooleanType, DefaultTypeCheckPolicy);
        var ThenNode = Gamma.TypeBlock(ParsedTree.GetSyntaxTreeAt(IfThen), ContextType);
        var ElseNode = Gamma.TypeBlock(ParsedTree.GetSyntaxTreeAt(IfElse), ThenNode.Type);
        return Gamma.Generator.CreateIfNode(ThenNode.Type, ParsedTree, CondNode, ThenNode, ElseNode);
    };

    DScriptGrammar.ParseWhile = function (NameSpace, TokenContext, LeftTree, Pattern) {
        var WhileTree = new GtSyntaxTree(Pattern, NameSpace, TokenContext.GetMatchedToken("while"), null);
        WhileTree.SetMatchedTokenAt(NoWhere, NameSpace, TokenContext, "(", Required);
        WhileTree.SetMatchedPatternAt(WhileCond, NameSpace, TokenContext, "$Expression$", Required);
        WhileTree.SetMatchedTokenAt(NoWhere, NameSpace, TokenContext, ")", Required);
        WhileTree.SetMatchedPatternAt(WhileBody, NameSpace, TokenContext, "$Block$", Required);
        return WhileTree;
    };

    DScriptGrammar.TypeWhile = function (Gamma, ParsedTree, ContextType) {
        var CondNode = ParsedTree.TypeCheckNodeAt(WhileCond, Gamma, Gamma.BooleanType, DefaultTypeCheckPolicy);
        var BodyNode = Gamma.TypeBlock(ParsedTree.GetSyntaxTreeAt(WhileBody), ContextType);
        return Gamma.Generator.CreateWhileNode(BodyNode.Type, ParsedTree, CondNode, BodyNode);
    };

    DScriptGrammar.ParseBreak = function (NameSpace, TokenContext, LeftTree, Pattern) {
        var Token = TokenContext.GetMatchedToken("break");
        var NewTree = new GtSyntaxTree(Pattern, NameSpace, Token, null);
        return NewTree;
    };

    DScriptGrammar.TypeBreak = function (Gamma, ParsedTree, ContextType) {
        return Gamma.Generator.CreateBreakNode(Gamma.VoidType, ParsedTree, "");
    };

    DScriptGrammar.ParseContinue = function (NameSpace, TokenContext, LeftTree, Pattern) {
        var Token = TokenContext.GetMatchedToken("continue");
        var NewTree = new GtSyntaxTree(Pattern, NameSpace, Token, null);
        return NewTree;
    };

    DScriptGrammar.TypeContinue = function (Gamma, ParsedTree, ContextType) {
        return Gamma.Generator.CreateContinueNode(Gamma.VoidType, ParsedTree, "");
    };

    DScriptGrammar.ParseReturn = function (NameSpace, TokenContext, LeftTree, Pattern) {
        var ReturnTree = new GtSyntaxTree(Pattern, NameSpace, TokenContext.GetMatchedToken("return"), null);
        ReturnTree.SetMatchedPatternAt(ReturnExpr, NameSpace, TokenContext, "$Expression$", Optional);
        return ReturnTree;
    };

    DScriptGrammar.TypeReturn = function (Gamma, ParsedTree, ContextType) {
        ParsedTree.NextTree = null;
        if (Gamma.IsTopLevel()) {
            return Gamma.UnsupportedTopLevelError(ParsedTree);
        }
        var ReturnType = Gamma.Func.GetReturnType();
        if (ParsedTree.HasNodeAt(ReturnExpr)) {
            var Expr = ParsedTree.TypeCheckNodeAt(ReturnExpr, Gamma, ReturnType, DefaultTypeCheckPolicy);
            if (ReturnType == Gamma.VarType && !Expr.IsError()) {
                Gamma.Func.Types[0] = Expr.Type;
                Gamma.ReportTypeInference(ParsedTree.KeyToken, "return value of " + Gamma.Func.FuncName, Expr.Type);
            }
            if (ReturnType == Gamma.VoidType) {
                Gamma.Context.ReportError(WarningLevel, ParsedTree.KeyToken, "ignored return value");
                return Gamma.Generator.CreateReturnNode(ReturnType, ParsedTree, null);
            }
            return Gamma.Generator.CreateReturnNode(Expr.Type, ParsedTree, Expr);
        } else {
            if (ReturnType == Gamma.VarType) {
                Gamma.Func.Types[0] = Gamma.VoidType;
                Gamma.ReportTypeInference(ParsedTree.KeyToken, "return value of " + Gamma.Func.FuncName, Gamma.VoidType);
            }
            if (Gamma.Func.Is(ConstructorFunc)) {
                var ThisNode = Gamma.CreateLocalNode(ParsedTree, Gamma.Generator.GetRecvName());
                return Gamma.Generator.CreateReturnNode(ThisNode.Type, ParsedTree, ThisNode);
            }
            if (ReturnType != Gamma.VoidType) {
                Gamma.Context.ReportError(WarningLevel, ParsedTree.KeyToken, "returning default value of " + ReturnType);
                return Gamma.Generator.CreateReturnNode(ReturnType, ParsedTree, Gamma.CreateDefaultValue(ParsedTree, ReturnType));
            }
            return Gamma.Generator.CreateReturnNode(ReturnType, ParsedTree, null);
        }
    };

    DScriptGrammar.ParseTry = function (NameSpace, TokenContext, LeftTree, Pattern) {
        var TryTree = new GtSyntaxTree(Pattern, NameSpace, TokenContext.GetMatchedToken("try"), null);
        TryTree.SetMatchedPatternAt(TryBody, NameSpace, TokenContext, "$Block$", Required);
        if (TokenContext.MatchToken("catch")) {
            TryTree.SetMatchedTokenAt(NoWhere, NameSpace, TokenContext, "(", Required);
            TryTree.SetMatchedPatternAt(CatchVariable, NameSpace, TokenContext, "$VarDecl$", Required);
            TryTree.SetMatchedTokenAt(NoWhere, NameSpace, TokenContext, ")", Required);
            TryTree.SetMatchedPatternAt(CatchBody, NameSpace, TokenContext, "$Block$", Required);
        }
        if (TokenContext.MatchToken("finally")) {
            TryTree.SetMatchedPatternAt(FinallyBody, NameSpace, TokenContext, "$Block$", Required);
        }
        return TryTree;
    };

    DScriptGrammar.TypeTry = function (Gamma, ParsedTree, ContextType) {
        var FaultType = ContextType;
        var TryNode = Gamma.TypeBlock(ParsedTree.GetSyntaxTreeAt(TryBody), ContextType);
        var CatchExpr = ParsedTree.TypeCheckNodeAt(CatchVariable, Gamma, FaultType, DefaultTypeCheckPolicy);
        var CatchNode = Gamma.TypeBlock(ParsedTree.GetSyntaxTreeAt(CatchBody), ContextType);
        var FinallyNode = Gamma.TypeBlock(ParsedTree.GetSyntaxTreeAt(FinallyBody), ContextType);
        return Gamma.Generator.CreateTryNode(TryNode.Type, ParsedTree, TryNode, CatchExpr, CatchNode, FinallyNode);
    };

    DScriptGrammar.ParseThrow = function (NameSpace, TokenContext, LeftTree, Pattern) {
        var ThrowTree = new GtSyntaxTree(Pattern, NameSpace, TokenContext.GetMatchedToken("throw"), null);
        ThrowTree.SetMatchedPatternAt(ReturnExpr, NameSpace, TokenContext, "$Expression$", Required);
        return ThrowTree;
    };

    DScriptGrammar.TypeThrow = function (Gamma, ParsedTree, ContextType) {
        var FaultType = ContextType;
        var ExprNode = ParsedTree.TypeCheckNodeAt(ReturnExpr, Gamma, FaultType, DefaultTypeCheckPolicy);
        return Gamma.Generator.CreateThrowNode(ExprNode.Type, ParsedTree, ExprNode);
    };

    DScriptGrammar.ParseSuper = function (NameSpace, TokenContext, LeftTree, Pattern) {
        var Token = TokenContext.GetMatchedToken("super");
        var Tree = new GtSyntaxTree(Pattern, NameSpace, Token, null);
        var ParseFlag = TokenContext.ParseFlag;
        TokenContext.ParseFlag |= SkipIndentParseFlag;
        Tree.SetSyntaxTreeAt(CallExpressionOffset, new GtSyntaxTree(NameSpace.GetPattern("$Variable$"), NameSpace, Token, null));
        Tree.SetSyntaxTreeAt(CallParameterOffset, new GtSyntaxTree(NameSpace.GetPattern("$Variable$"), NameSpace, new GtToken("this", 0), null));
        TokenContext.MatchToken("(");
        if (!TokenContext.MatchToken(")")) {
            while (!Tree.IsEmptyOrError()) {
                var ParamTree = TokenContext.ParsePattern(NameSpace, "$Expression$", Required);
                Tree.AppendParsedTree(ParamTree);
                if (TokenContext.MatchToken(")")) {
                    break;
                }
                Tree.SetMatchedTokenAt(NoWhere, NameSpace, TokenContext, ",", Required);
            }
        }
        TokenContext.ParseFlag = ParseFlag;
        if (!Tree.IsEmptyOrError()) {
            Tree.Pattern = NameSpace.GetExtendedPattern("(");
            return Tree;
        }
        return Tree;
    };

    DScriptGrammar.ParseNew = function (NameSpace, TokenContext, LeftTree, Pattern) {
        var NewTree = new GtSyntaxTree(Pattern, NameSpace, TokenContext.GetMatchedToken("new"), null);
        var ParseFlag = TokenContext.ParseFlag;
        TokenContext.ParseFlag |= SkipIndentParseFlag;
        NewTree.SetMatchedPatternAt(CallExpressionOffset, NameSpace, TokenContext, "$Type$", Required);
        TokenContext.MatchToken("(");
        if (!TokenContext.MatchToken(")")) {
            while (!NewTree.IsEmptyOrError()) {
                var Tree = TokenContext.ParsePattern(NameSpace, "$Expression$", Required);
                NewTree.AppendParsedTree(Tree);
                if (TokenContext.MatchToken(")")) {
                    break;
                }
                NewTree.SetMatchedTokenAt(NoWhere, NameSpace, TokenContext, ",", Required);
            }
        }
        TokenContext.ParseFlag = ParseFlag;
        if (NewTree.IsEmptyOrError()) {
            return null;
        }
        return NewTree;
    };

    DScriptGrammar.ParseEnum = function (NameSpace, TokenContext, LeftTree, Pattern) {
        var EnumTypeName = null;
        var NewEnumType = null;
        var VocabMap = new GtMap();
        var EnumTree = new GtSyntaxTree(Pattern, NameSpace, TokenContext.GetMatchedToken("enum"), null);
        EnumTree.SetMatchedPatternAt(EnumNameTreeIndex, NameSpace, TokenContext, "$FuncName$", Required);
        if (!EnumTree.IsEmptyOrError()) {
            EnumTypeName = EnumTree.GetSyntaxTreeAt(EnumNameTreeIndex).KeyToken.ParsedText;
            if (NameSpace.GetSymbol(EnumTypeName) != null) {
                NameSpace.Context.ReportError(WarningLevel, EnumTree.KeyToken, "already defined name: " + EnumTypeName);
            }
            NewEnumType = new GtType(NameSpace.Context, EnumClass, EnumTypeName, null, VocabMap);
        }
        EnumTree.SetMatchedTokenAt(NoWhere, NameSpace, TokenContext, "{", Required);
        var EnumValue = 0;
        while (!EnumTree.IsEmptyOrError()) {
            TokenContext.SkipIndent();
            if (TokenContext.MatchToken(",")) {
                continue;
            }
            if (TokenContext.MatchToken("}")) {
                break;
            }
            var Token = TokenContext.Next();
            if (LibGreenTea.IsLetter(LibGreenTea.CharAt(Token.ParsedText, 0))) {
                if (VocabMap.get(Token.ParsedText) != null) {
                    NameSpace.Context.ReportError(WarningLevel, Token, "already defined name: " + Token.ParsedText);
                    continue;
                }
                VocabMap.put(Token.ParsedText, new GreenTeaEnum(NewEnumType, EnumValue, Token.ParsedText));
                EnumValue += 1;
                continue;
            }
        }
        if (!EnumTree.IsEmptyOrError()) {
            NameSpace.AppendTypeName(NewEnumType);
            EnumTree.ConstValue = NewEnumType;
        }
        return EnumTree;
    };

    DScriptGrammar.TypeEnum = function (Gamma, ParsedTree, ContextType) {
        var EnumType = ParsedTree.ConstValue;
        return Gamma.Generator.CreateConstNode(Gamma.Context.GuessType(EnumType), ParsedTree, EnumType);
    };

    DScriptGrammar.ParseSwitch = function (NameSpace, TokenContext, LeftTree, Pattern) {
        var SwitchTree = new GtSyntaxTree(Pattern, NameSpace, TokenContext.GetMatchedToken("switch"), null);
        SwitchTree.SetMatchedTokenAt(NoWhere, NameSpace, TokenContext, "(", Required);
        SwitchTree.SetMatchedPatternAt(CatchVariable, NameSpace, TokenContext, "$Expression$", Required);
        SwitchTree.SetMatchedTokenAt(NoWhere, NameSpace, TokenContext, ")", Required);
        SwitchTree.SetMatchedTokenAt(NoWhere, NameSpace, TokenContext, "{", Required);
        while (!SwitchTree.IsEmptyOrError() && !TokenContext.MatchToken("}")) {
            if (TokenContext.MatchToken("case")) {
                SwitchTree.SetMatchedPatternAt(CatchVariable, NameSpace, TokenContext, "$Expression$", Required);
                SwitchTree.SetMatchedTokenAt(NoWhere, NameSpace, TokenContext, ":", Required);
                SwitchTree.SetMatchedPatternAt(TryBody, NameSpace, TokenContext, "$CaseBlock$", Required);
                continue;
            }
            SwitchTree.SetMatchedTokenAt(NoWhere, NameSpace, TokenContext, "default", Required);
            SwitchTree.SetMatchedTokenAt(NoWhere, NameSpace, TokenContext, ":", Required);
            SwitchTree.SetMatchedPatternAt(TryBody, NameSpace, TokenContext, "$CaseBlock$", Required);
        }
        return SwitchTree;
    };

    DScriptGrammar.TypeSwitch = function (Gamma, ParsedTree, ContextType) {
        return null;
    };

    DScriptGrammar.ParseConstDecl = function (NameSpace, TokenContext, LeftTree, Pattern) {
        var ConstDeclTree = new GtSyntaxTree(Pattern, NameSpace, TokenContext.GetMatchedToken("const"), null);
        var ClassNameTree = TokenContext.ParsePattern(NameSpace, "$Type$", Optional);
        var ConstClass = null;
        if (ClassNameTree != null) {
            ConstDeclTree.SetMatchedTokenAt(NoWhere, NameSpace, TokenContext, ".", Required);
            if (!ConstDeclTree.IsEmptyOrError()) {
                ConstDeclTree.SetSyntaxTreeAt(ConstDeclClassIndex, ClassNameTree);
                ConstClass = ConstDeclTree.GetParsedType();
            }
        }
        ConstDeclTree.SetMatchedPatternAt(ConstDeclNameIndex, NameSpace, TokenContext, "$Variable$", Required);
        ConstDeclTree.SetMatchedTokenAt(NoWhere, NameSpace, TokenContext, "=", Required);
        ConstDeclTree.SetMatchedPatternAt(ConstDeclValueIndex, NameSpace, TokenContext, "$Expression$", Required);

        if (!ConstDeclTree.IsEmptyOrError()) {
            var ConstName = ConstDeclTree.GetSyntaxTreeAt(ConstDeclNameIndex).KeyToken.ParsedText;
            if (ConstClass != null) {
                ConstName = ClassSymbol(ConstClass, ConstName);
            }
            var ConstValue = null;
            if (ConstDeclTree.GetSyntaxTreeAt(ConstDeclValueIndex).Pattern.PatternName.equals("$Const$")) {
                ConstValue = ConstDeclTree.GetSyntaxTreeAt(ConstDeclValueIndex).ConstValue;
            }
            if (ConstValue == null) {
            }
            if (NameSpace.GetSymbol(ConstName) != null) {
                NameSpace.ReportOverrideName(ConstDeclTree.KeyToken, ConstClass, ConstName);
            }
            NameSpace.SetSymbol(ConstName, ConstValue);
        }
        return ConstDeclTree;
    };

    DScriptGrammar.TypeConstDecl = function (Gamma, ParsedTree, ContextType) {
        var NameTree = ParsedTree.GetSyntaxTreeAt(ConstDeclNameIndex);
        var ValueTree = ParsedTree.GetSyntaxTreeAt(ConstDeclValueIndex);
        var VariableName = NameTree.KeyToken.ParsedText;
        var ValueNode = Gamma.TypeCheck(ValueTree, Gamma.AnyType, DefaultTypeCheckPolicy);
        if (!(ValueNode instanceof ConstNode)) {
            return Gamma.CreateSyntaxErrorNode(ParsedTree, "definition of variable " + VariableName + " is not constant");
        }
        var CNode = ValueNode;
        Gamma.NameSpace.SetSymbol(VariableName, CNode.ConstValue);
        return Gamma.Generator.CreateEmptyNode(ContextType);
    };

    DScriptGrammar.ParseFuncName = function (NameSpace, TokenContext, LeftTree, Pattern) {
        var Token = TokenContext.Next();
        if (Token != GtTokenContext.NullToken) {
            var ch = LibGreenTea.CharAt(Token.ParsedText, 0);
            if (ch != 46) {
                return new GtSyntaxTree(Pattern, NameSpace, Token, Token.ParsedText);
            }
        }
        return null;
    };

    DScriptGrammar.ParseFuncDecl = function (NameSpace, TokenContext, LeftTree, Pattern) {
        var FuncDeclTree = new GtSyntaxTree(Pattern, NameSpace, TokenContext.GetToken(), null);
        if (LeftTree == null) {
            FuncDeclTree.SetMatchedPatternAt(FuncDeclReturnType, NameSpace, TokenContext, "$Type$", Required);
        } else {
            FuncDeclTree.SetSyntaxTreeAt(FuncDeclReturnType, LeftTree);
        }
        FuncDeclTree.SetMatchedPatternAt(FuncDeclName, NameSpace, TokenContext, "$FuncName$", Required);
        FuncDeclTree.SetMatchedTokenAt(NoWhere, NameSpace, TokenContext, "(", Required);
        var ParseFlag = TokenContext.SetBackTrack(false);
        var ParamBase = FuncDeclParam;
        while (!FuncDeclTree.IsEmptyOrError() && !TokenContext.MatchToken(")")) {
            TokenContext.SkipIndent();
            if (ParamBase != FuncDeclParam) {
                FuncDeclTree.SetMatchedTokenAt(NoWhere, NameSpace, TokenContext, ",", Required);
                TokenContext.SkipIndent();
            }
            FuncDeclTree.SetMatchedPatternAt(ParamBase + VarDeclType, NameSpace, TokenContext, "$Type$", Required);
            FuncDeclTree.SetMatchedPatternAt(ParamBase + VarDeclName, NameSpace, TokenContext, "$Variable$", Required);
            if (TokenContext.MatchToken("=")) {
                FuncDeclTree.SetMatchedPatternAt(ParamBase + VarDeclValue, NameSpace, TokenContext, "$Expression$", Required);
            }
            ParamBase += 3;
        }
        TokenContext.SkipIndent();
        if (TokenContext.MatchToken("as")) {
            var Token = TokenContext.Next();
            FuncDeclTree.ConstValue = Token.ParsedText;
        } else {
            FuncDeclTree.SetMatchedPatternAt(FuncDeclBlock, NameSpace, TokenContext, "$Block$", Optional);
        }
        TokenContext.ParseFlag = ParseFlag;
        return FuncDeclTree;
    };

    DScriptGrammar.TypeFuncDecl = function (Gamma, ParsedTree, ContextType) {
        var FuncFlag = Gamma.Generator.ParseFuncFlag(0, ParsedTree.Annotation);
        var FuncName = ParsedTree.GetSyntaxTreeAt(FuncDeclName).ConstValue;
        Gamma = new GtTypeEnv(ParsedTree.NameSpace);
        var TypeList = new Array();
        var ReturnType = ParsedTree.GetSyntaxTreeAt(FuncDeclReturnType).GetParsedType();
        TypeList.add(ReturnType);
        var ParamNameList = new Array();
        var RecvType = null;
        if (ParsedTree.HasNodeAt(FuncDeclClass)) {
            FuncFlag |= VirtualFunc;
            RecvType = ParsedTree.GetSyntaxTreeAt(FuncDeclClass).GetParsedType();
            TypeList.add(RecvType);
            Gamma.AppendRecv(RecvType);
            ParamNameList.add(Gamma.Generator.GetRecvName());
        }
        var TreeIndex = FuncDeclParam;
        while (TreeIndex < ParsedTree.TreeList.size()) {
            var ParamType = ParsedTree.GetSyntaxTreeAt(TreeIndex).GetParsedType();
            var ParamName = ParsedTree.GetSyntaxTreeAt(TreeIndex + 1).KeyToken.ParsedText;
            TypeList.add(ParamType);
            ParamNameList.add(NativeVariableName(ParamName, ParamNameList.size()));
            Gamma.AppendDeclaredVariable(0, ParamType, ParamName);
            TreeIndex += 3;
        }
        var DefinedFunc = null;
        if (FuncName.equals("converter")) {
            DefinedFunc = DScriptGrammar.CreateCoercionFunc(Gamma, ParsedTree, FuncFlag, 0, TypeList);
        } else {
            DefinedFunc = DScriptGrammar.CreateFunc(Gamma, ParsedTree, FuncFlag, FuncName, 0, TypeList);
        }
        if ((typeof ParsedTree.ConstValue == 'string' || ParsedTree.ConstValue instanceof String)) {
            DefinedFunc.SetNativeMacro(LibGreenTea.UnescapeString(ParsedTree.ConstValue));
        } else if (ParsedTree.HasNodeAt(FuncDeclBlock)) {
            Gamma.Func = DefinedFunc;
            var BodyNode = Gamma.TypeBlock(ParsedTree.GetSyntaxTreeAt(FuncDeclBlock), ReturnType);
            Gamma.Generator.GenerateFunc(DefinedFunc, ParamNameList, BodyNode);
            if (FuncName.equals("main")) {
                Gamma.Generator.InvokeMainFunc(DefinedFunc.GetNativeFuncName());
            }
        }
        return Gamma.Generator.CreateEmptyNode(Gamma.VoidType);
    };

    DScriptGrammar.CreateCoercionFunc = function (Gamma, ParsedTree, FuncFlag, BaseIndex, TypeList) {
        var ToType = TypeList.get(0);
        var FromType = TypeList.get(1);
        var Func = ParsedTree.NameSpace.GetCoercionFunc(FromType, ToType, false);
        if (Func != null) {
            Gamma.Context.ReportError(WarningLevel, ParsedTree.KeyToken, "already defined: " + FromType + " to " + ToType);
        }
        Func = Gamma.Generator.CreateFunc(FuncFlag, "to" + ToType.ShortClassName, BaseIndex, TypeList);
        ParsedTree.NameSpace.SetCoercionFunc(FromType, ToType, Func);
        return Func;
    };

    DScriptGrammar.CreateFunc = function (Gamma, ParsedTree, FuncFlag, FuncName, BaseIndex, TypeList) {
        var RecvType = (TypeList.size() > 1) ? TypeList.get(1) : Gamma.VoidType;
        var Func = ParsedTree.NameSpace.GetFuncParam(FuncName, 0, LibGreenTea.CompactTypeList(BaseIndex, TypeList));
        if (Func != null && Func.IsAbstract()) {
            return Func;
        }
        if (Func == null) {
            Func = Gamma.Generator.CreateFunc(FuncFlag, FuncName, BaseIndex, TypeList);
        }
        if (FuncName.equals("constructor")) {
            ParsedTree.NameSpace.AppendConstructor(RecvType, Func);
        } else {
            if (LibGreenTea.IsLetter(LibGreenTea.CharAt(Func.FuncName, 0))) {
                ParsedTree.NameSpace.AppendFunc(Func);
            }
            if (RecvType != Gamma.VoidType) {
                ParsedTree.NameSpace.AppendMethod(RecvType, Func);
            }
        }
        return Func;
    };

    DScriptGrammar.ParseClassDecl = function (NameSpace0, TokenContext, LeftTree, Pattern) {
        var ClassDeclTree = new GtSyntaxTree(Pattern, NameSpace0, TokenContext.GetMatchedToken("class"), null);
        ClassDeclTree.SetMatchedPatternAt(ClassDeclName, NameSpace0, TokenContext, "$FuncName$", Required);
        if (TokenContext.MatchToken("extends")) {
            ClassDeclTree.SetMatchedPatternAt(ClassDeclSuperType, NameSpace0, TokenContext, "$Type$", Required);
        }
        if (ClassDeclTree.IsEmptyOrError()) {
            return ClassDeclTree;
        }

        var ClassNameSpace = new GtNameSpace(NameSpace0.Context, NameSpace0);
        var ClassNameTree = ClassDeclTree.GetSyntaxTreeAt(ClassDeclName);
        var ClassName = ClassNameTree.KeyToken.ParsedText;
        var SuperType = NameSpace0.Context.StructType;
        if (ClassDeclTree.HasNodeAt(ClassDeclSuperType)) {
            SuperType = ClassDeclTree.GetSyntaxTreeAt(ClassDeclSuperType).GetParsedType();
        }
        var ClassFlag = 0;
        var NewType = SuperType.CreateSubType(ClassFlag, ClassName, null, null);

        var DefaultObject = new GreenTeaTopObject(NewType);
        NewType.DefaultNullValue = DefaultObject;
        ClassNameSpace.AppendTypeName(NewType);
        ClassDeclTree.ConstValue = NewType;
        ClassNameTree.ConstValue = NewType;

        if (TokenContext.MatchToken("{")) {
            var ParseFlag = TokenContext.SetBackTrack(false);
            while (!ClassDeclTree.IsEmptyOrError() && !TokenContext.MatchToken("}")) {
                var Annotation = TokenContext.SkipAndGetAnnotation(true);
                if (TokenContext.MatchToken("}")) {
                    break;
                }
                if (TokenContext.MatchToken("constructor")) {
                    var FuncDecl = TokenContext.ParsePatternAfter(ClassNameSpace, ClassNameTree, "$Constructor$", Required);
                    if (!FuncDecl.IsEmptyOrError()) {
                        FuncDecl.SetAnnotation(Annotation);
                        FuncDecl.SetSyntaxTreeAt(FuncDeclClass, ClassNameTree);
                        ClassDeclTree.AppendParsedTree(FuncDecl);
                        continue;
                    }
                }
                var TypeDecl = TokenContext.ParsePattern(ClassNameSpace, "$Type$", Required);
                if (TypeDecl != null && !TypeDecl.IsEmptyOrError()) {
                    var FuncDecl = TokenContext.ParsePatternAfter(ClassNameSpace, TypeDecl, "$FuncDecl$", Optional);
                    if (FuncDecl != null) {
                        FuncDecl.SetAnnotation(Annotation);
                        FuncDecl.SetSyntaxTreeAt(FuncDeclClass, ClassNameTree);
                        ClassDeclTree.AppendParsedTree(FuncDecl);
                        continue;
                    }
                    var VarDecl = TokenContext.ParsePatternAfter(ClassNameSpace, TypeDecl, "$VarDecl$", Required);
                    if (VarDecl != null) {
                        VarDecl = TreeHead(VarDecl);
                        while (VarDecl != null) {
                            var NextTree = VarDecl.NextTree;
                            VarDecl.NextTree = null;
                            VarDecl.SetAnnotation(Annotation);
                            ClassDeclTree.AppendParsedTree(VarDecl);
                            VarDecl = NextTree;
                        }
                    }
                }
            }
            TokenContext.ParseFlag = ParseFlag;
        }
        var TreeIndex = ClassDeclFieldStartIndex;
        var VarDeclList = new Array();
        var ConstructorList = new Array();
        var MethodList = new Array();
        VarDeclList.add(ClassDeclTree.GetSyntaxTreeAt(ClassDeclSuperType));
        VarDeclList.add(ClassDeclTree.GetSyntaxTreeAt(ClassDeclName));
        while (TreeIndex < ClassDeclTree.TreeList.size()) {
            var FieldTree = ClassDeclTree.GetSyntaxTreeAt(TreeIndex);
            if (FieldTree.Pattern.PatternName.equals("$VarDecl$")) {
                VarDeclList.add(FieldTree);
            } else if (FieldTree.Pattern.PatternName.equals("$FuncDecl$")) {
                ConstructorList.add(FieldTree);
            } else if (FieldTree.Pattern.PatternName.equals("$Constructor$")) {
                MethodList.add(FieldTree);
            }
            TreeIndex = TreeIndex + 1;
        }
        ClassDeclTree.TreeList = VarDeclList;
        TreeIndex = 0;
        while (TreeIndex < ConstructorList.size()) {
            ClassDeclTree.AppendParsedTree(ConstructorList.get(TreeIndex));
            TreeIndex = TreeIndex + 1;
        }
        while (TreeIndex < MethodList.size()) {
            ClassDeclTree.AppendParsedTree(MethodList.get(TreeIndex));
            TreeIndex = TreeIndex + 1;
        }
        NameSpace0.AppendTypeName(NewType);
        return ClassDeclTree;
    };

    DScriptGrammar.TypeClassDecl = function (Gamma, ParsedTree, ContextType) {
        var DefinedType = ParsedTree.GetParsedType();
        var TreeIndex = ClassDeclFieldStartIndex;
        var ClassField = new GtClassField(DefinedType.SuperType);
        while (TreeIndex < ParsedTree.TreeList.size()) {
            var FieldTree = ParsedTree.GetSyntaxTreeAt(TreeIndex);
            if (!FieldTree.Pattern.PatternName.equals("$VarDecl$")) {
                break;
            }
            var FieldNode = ParsedTree.TypeCheckNodeAt(TreeIndex, Gamma, Gamma.VarType, OnlyConstPolicy);
            if (FieldNode.IsError()) {
                return FieldNode;
            }
            var FieldName = FieldTree.GetSyntaxTreeAt(VarDeclName).KeyToken.ParsedText;
            var FieldFlag = 0;
            var FieldInfo = ClassField.CreateField(FieldFlag, FieldNode.Type, FieldName);
            if (FieldInfo != null) {
                var ParamList = new Array();
                ParamList.add(FieldInfo.Type);
                ParamList.add(DefinedType);
                FieldInfo.GetterFunc = new GtFunc(0, FieldInfo.Name, 0, ParamList);
                Gamma.NameSpace.SetGetterFunc(DefinedType, FieldInfo.Name, FieldInfo.GetterFunc);
                ParamList.clear();
                ParamList.add(Gamma.VoidType);
                ParamList.add(DefinedType);
                ParamList.add(FieldInfo.Type);
                FieldInfo.SetterFunc = new GtFunc(0, FieldInfo.Name, 0, ParamList);
                Gamma.NameSpace.SetGetterFunc(DefinedType, FieldInfo.Name, FieldInfo.SetterFunc);
                FieldInfo.InitValue = ((FieldNode).InitNode).ConstValue;
            }
            TreeIndex += 1;
        }
        DefinedType.SetClassField(ClassField);
        Gamma.Generator.GenerateClassField(DefinedType, ClassField);
        while (TreeIndex < ParsedTree.TreeList.size()) {
            var FieldTree = ParsedTree.GetSyntaxTreeAt(TreeIndex);
            if (!FieldTree.Pattern.PatternName.equals("$FuncDecl$")) {
                break;
            }
            ParsedTree.TypeCheckNodeAt(TreeIndex, Gamma, Gamma.VarType, OnlyConstPolicy);
            TreeIndex += 1;
        }
        while (TreeIndex < ParsedTree.TreeList.size()) {
            var FieldTree = ParsedTree.GetSyntaxTreeAt(TreeIndex);
            if (!FieldTree.Pattern.PatternName.equals("$Constructor$")) {
                break;
            }
            ParsedTree.TypeCheckNodeAt(TreeIndex, Gamma, DefinedType, OnlyConstPolicy);
            TreeIndex += 1;
        }
        return Gamma.Generator.CreateEmptyNode(Gamma.VoidType);
    };

    DScriptGrammar.TypeConstructor = function (Gamma, ConstructorTree, ContextType) {
        var NameSpace = Gamma.NameSpace;
        var DefinedType = ConstructorTree.GetSyntaxTreeAt(FuncDeclReturnType).GetParsedType();
        var BlockTree = ConstructorTree.GetSyntaxTreeAt(FuncDeclBlock);
        var TailTree = BlockTree;
        while (TailTree.NextTree != null) {
            TailTree = TailTree.NextTree;
        }
        var ThisTree = new GtSyntaxTree(NameSpace.GetPattern("$Variable$"), NameSpace, new GtToken(Gamma.Generator.GetRecvName(), 0), null);
        var ReturnTree = new GtSyntaxTree(NameSpace.GetPattern("return"), NameSpace, new GtToken("return", 0), null);
        ReturnTree.SetSyntaxTreeAt(ReturnExpr, ThisTree);
        if (BlockTree.IsEmpty()) {
            ConstructorTree.SetSyntaxTreeAt(FuncDeclBlock, ReturnTree);
        } else {
            LinkTree(TailTree, ReturnTree);
        }
        if (ConstructorTree.HasNodeAt(FuncDeclBlock)) {
            var Func = Gamma.NameSpace.GetConstructorFunc(DefinedType.SuperType);
            ConstructorTree.GetSyntaxTreeAt(FuncDeclBlock).NameSpace.SetSymbol("super", Func);
        }
        return DScriptGrammar.TypeFuncDecl(Gamma, ConstructorTree, ContextType);
    };

    DScriptGrammar.ParseConstructor = function (NameSpace, TokenContext, LeftTree, Pattern) {
        LibGreenTea.Assert(LeftTree != null);
        var ConstructorTreeDecl = new GtSyntaxTree(Pattern, NameSpace, TokenContext.GetBeforeToken(), null);
        ConstructorTreeDecl.SetSyntaxTreeAt(FuncDeclName, new GtSyntaxTree(null, NameSpace, ConstructorTreeDecl.KeyToken, "constructor"));
        ConstructorTreeDecl.SetSyntaxTreeAt(FuncDeclReturnType, LeftTree);
        ConstructorTreeDecl.SetSyntaxTreeAt(FuncDeclClass, LeftTree);
        ConstructorTreeDecl.SetMatchedTokenAt(NoWhere, NameSpace, TokenContext, "(", Required);

        var ParseFlag = TokenContext.SetBackTrack(false);
        var ParamBase = FuncDeclParam;
        while (!ConstructorTreeDecl.IsEmptyOrError() && !TokenContext.MatchToken(")")) {
            if (ParamBase > FuncDeclParam) {
                ConstructorTreeDecl.SetMatchedTokenAt(NoWhere, NameSpace, TokenContext, ",", Required);
            }
            ConstructorTreeDecl.SetMatchedPatternAt(ParamBase + VarDeclType, NameSpace, TokenContext, "$Type$", Required);
            ConstructorTreeDecl.SetMatchedPatternAt(ParamBase + VarDeclName, NameSpace, TokenContext, "$Variable$", Required);
            if (TokenContext.MatchToken("=")) {
                ConstructorTreeDecl.SetMatchedPatternAt(ParamBase + VarDeclValue, NameSpace, TokenContext, "$Expression$", Required);
            }
            ParamBase += 3;
        }
        ConstructorTreeDecl.SetMatchedPatternAt(FuncDeclBlock, NameSpace, TokenContext, "$Block$", Required);
        TokenContext.ParseFlag = ParseFlag;
        return ConstructorTreeDecl;
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
            var ch = LibGreenTea.CharAt(SourceText, pos);

            if (LibGreenTea.IsLetter(ch)) {
            } else if (LibGreenTea.IsDigit(ch)) {
            } else if (ch == 95) {
            } else if (ShellMode && (ch == 45 || ch == 47)) {
            } else {
                break;
            }
            pos += 1;
        }
        if (start == pos) {
            return NoMatch;
        }
        var Symbol = SourceText.substring(start, pos);

        var i = 0;
        while (i < ShellGrammarReservedKeywords.length) {
            var Keyword = ShellGrammarReservedKeywords[i];
            if (Symbol.equals(Keyword)) {
                return NoMatch;
            }
            i = i + 1;
        }
        if (Symbol.startsWith("/") || Symbol.startsWith("-")) {
            if (Symbol.startsWith("//")) {
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

    DScriptGrammar.ParseShell = function (NameSpace, TokenContext, LeftTree, Pattern) {
        var Token = TokenContext.Next();
        var NewTree = new GtSyntaxTree(Pattern, NameSpace, Token, null);
        while (!IsEmptyOrError(NewTree) && !TokenContext.MatchToken(";")) {
            var Tree = null;
            if (TokenContext.GetToken().IsDelim() || TokenContext.GetToken().IsIndent()) {
                break;
            }
            if (TokenContext.MatchToken("$ShellExpression$")) {
            }
            if (Tree == null) {
                Tree = TokenContext.ParsePattern(NameSpace, "$Expression$", Optional);
            }
            NewTree.AppendParsedTree(Tree);
        }
        return NewTree;
    };

    DScriptGrammar.TypeShell = function (Gamma, ParsedTree, ContextType) {
        var Node = Gamma.Generator.CreateCommandNode(ContextType, ParsedTree, null);
        var HeadNode = Node;
        var i = 0;
        var Command = ParsedTree.KeyToken.ParsedText;
        var ThisNode = Gamma.Generator.CreateConstNode(Gamma.StringType, ParsedTree, Command);
        Node.Append(ThisNode);
        while (i < ListSize(ParsedTree.TreeList)) {
            var ExprNode = ParsedTree.TypeCheckNodeAt(i, Gamma, Gamma.StringType, DefaultTypeCheckPolicy);
            if (ExprNode instanceof ConstNode) {
                var CNode = ExprNode;
                if ((typeof CNode.ConstValue == 'string' || CNode.ConstValue instanceof String)) {
                    var Val = CNode.ConstValue;
                    if (Val.equals("|")) {
                        LibGreenTea.DebugP("PIPE");
                        var PrevNode = Node;
                        Node = Gamma.Generator.CreateCommandNode(ContextType, ParsedTree, null);
                        PrevNode.PipedNextNode = Node;
                    }
                }
            }
            Node.Append(ExprNode);
            i = i + 1;
        }
        return HeadNode;
    };

    DScriptGrammar.prototype.LoadTo = function (NameSpace) {
        NameSpace.SetSymbol("true", true);
        NameSpace.SetSymbol("false", false);
        NameSpace.SetSymbol("null", null);

        NameSpace.DefineTokenFunc(" \t", DScriptGrammar.WhiteSpaceToken);
        NameSpace.DefineTokenFunc("\n", DScriptGrammar.IndentToken);
        NameSpace.DefineTokenFunc("{}()[]<>.,:;+-*/%=&|!@", DScriptGrammar.OperatorToken);
        NameSpace.DefineTokenFunc("/", DScriptGrammar.CommentToken);
        NameSpace.DefineTokenFunc("Aa", DScriptGrammar.SymbolToken);
        NameSpace.DefineTokenFunc("Aa-/", DScriptGrammar.SymbolShellToken);

        NameSpace.DefineTokenFunc("\"", DScriptGrammar.StringLiteralToken);
        NameSpace.DefineTokenFunc("\"", DScriptGrammar.StringLiteralToken_StringInterpolation);
        NameSpace.DefineTokenFunc("1", DScriptGrammar.NumberLiteralToken);

        NameSpace.AppendSyntax("+", DScriptGrammar.ParseUnary, DScriptGrammar.TypeUnary);
        NameSpace.AppendSyntax("-", DScriptGrammar.ParseUnary, DScriptGrammar.TypeUnary);
        NameSpace.AppendSyntax("!", DScriptGrammar.ParseUnary, DScriptGrammar.TypeUnary);

        NameSpace.AppendExtendedSyntax("*", BinaryOperator | Precedence_CStyleMUL, DScriptGrammar.ParseBinary, DScriptGrammar.TypeBinary);
        NameSpace.AppendExtendedSyntax("/", BinaryOperator | Precedence_CStyleMUL, DScriptGrammar.ParseBinary, DScriptGrammar.TypeBinary);
        NameSpace.AppendExtendedSyntax("%", BinaryOperator | Precedence_CStyleMUL, DScriptGrammar.ParseBinary, DScriptGrammar.TypeBinary);

        NameSpace.AppendExtendedSyntax("+", BinaryOperator | Precedence_CStyleADD, DScriptGrammar.ParseBinary, DScriptGrammar.TypeBinary);
        NameSpace.AppendExtendedSyntax("-", BinaryOperator | Precedence_CStyleADD, DScriptGrammar.ParseBinary, DScriptGrammar.TypeBinary);

        NameSpace.AppendExtendedSyntax("<", BinaryOperator | Precedence_CStyleCOMPARE, DScriptGrammar.ParseBinary, DScriptGrammar.TypeBinary);
        NameSpace.AppendExtendedSyntax("<=", BinaryOperator | Precedence_CStyleCOMPARE, DScriptGrammar.ParseBinary, DScriptGrammar.TypeBinary);
        NameSpace.AppendExtendedSyntax(">", BinaryOperator | Precedence_CStyleCOMPARE, DScriptGrammar.ParseBinary, DScriptGrammar.TypeBinary);
        NameSpace.AppendExtendedSyntax(">=", BinaryOperator | Precedence_CStyleCOMPARE, DScriptGrammar.ParseBinary, DScriptGrammar.TypeBinary);
        NameSpace.AppendExtendedSyntax("==", BinaryOperator | Precedence_CStyleEquals, DScriptGrammar.ParseBinary, DScriptGrammar.TypeBinary);
        NameSpace.AppendExtendedSyntax("!=", BinaryOperator | Precedence_CStyleEquals, DScriptGrammar.ParseBinary, DScriptGrammar.TypeBinary);

        NameSpace.AppendExtendedSyntax("<<", BinaryOperator | Precedence_CStyleSHIFT, DScriptGrammar.ParseBinary, DScriptGrammar.TypeBinary);
        NameSpace.AppendExtendedSyntax(">>", BinaryOperator | Precedence_CStyleSHIFT, DScriptGrammar.ParseBinary, DScriptGrammar.TypeBinary);
        NameSpace.AppendExtendedSyntax("&", BinaryOperator | Precedence_CStyleBITAND, DScriptGrammar.ParseBinary, DScriptGrammar.TypeBinary);
        NameSpace.AppendExtendedSyntax("|", BinaryOperator | Precedence_CStyleBITOR, DScriptGrammar.ParseBinary, DScriptGrammar.TypeBinary);
        NameSpace.AppendExtendedSyntax("^", BinaryOperator | Precedence_CStyleBITXOR, DScriptGrammar.ParseBinary, DScriptGrammar.TypeBinary);

        NameSpace.AppendExtendedSyntax("=", BinaryOperator | Precedence_CStyleAssign | LeftJoin, DScriptGrammar.ParseBinary, DScriptGrammar.TypeAssign);
        NameSpace.AppendExtendedSyntax("&&", BinaryOperator | Precedence_CStyleAND, DScriptGrammar.ParseBinary, DScriptGrammar.TypeAnd);
        NameSpace.AppendExtendedSyntax("||", BinaryOperator | Precedence_CStyleOR, DScriptGrammar.ParseBinary, DScriptGrammar.TypeOr);

        NameSpace.AppendSyntax("$Empty$", DScriptGrammar.ParseEmpty, DScriptGrammar.TypeEmpty);

        NameSpace.AppendSyntax("$Symbol$", DScriptGrammar.ParseSymbol, null);
        NameSpace.AppendSyntax("$Type$", DScriptGrammar.ParseType, DScriptGrammar.TypeConst);
        NameSpace.AppendSyntax("$Variable$", DScriptGrammar.ParseVariable, DScriptGrammar.TypeVariable);
        NameSpace.AppendSyntax("$Const$", DScriptGrammar.ParseConst, DScriptGrammar.TypeConst);
        NameSpace.AppendSyntax("$StringLiteral$", DScriptGrammar.ParseStringLiteral, DScriptGrammar.TypeConst);
        NameSpace.AppendSyntax("$IntegerLiteral$", DScriptGrammar.ParseIntegerLiteral, DScriptGrammar.TypeConst);

        NameSpace.AppendSyntax("$ShellExpression$", DScriptGrammar.ParseShell, DScriptGrammar.TypeShell);

        NameSpace.AppendExtendedSyntax(".", 0, DScriptGrammar.ParseGetter, DScriptGrammar.TypeGetter);
        NameSpace.AppendSyntax("(", DScriptGrammar.ParseGroup, DScriptGrammar.TypeGroup);
        NameSpace.AppendSyntax("(", DScriptGrammar.ParseCast, DScriptGrammar.TypeCast);
        NameSpace.AppendExtendedSyntax("(", 0, DScriptGrammar.ParseApply, DScriptGrammar.TypeApply);

        NameSpace.AppendSyntax("$Block$", DScriptGrammar.ParseBlock, DScriptGrammar.TypeBlock);
        NameSpace.AppendSyntax("$Statement$", DScriptGrammar.ParseStatement, DScriptGrammar.TypeBlock);
        NameSpace.AppendSyntax("$Expression$", DScriptGrammar.ParseExpression, DScriptGrammar.TypeBlock);

        NameSpace.AppendSyntax("$FuncName$", DScriptGrammar.ParseFuncName, DScriptGrammar.TypeConst);
        NameSpace.AppendSyntax("$FuncDecl$", DScriptGrammar.ParseFuncDecl, DScriptGrammar.TypeFuncDecl);
        NameSpace.AppendSyntax("$VarDecl$", DScriptGrammar.ParseVarDecl, DScriptGrammar.TypeVarDecl);

        NameSpace.AppendSyntax("$Constructor$", DScriptGrammar.ParseConstructor, DScriptGrammar.TypeConstructor);
        NameSpace.AppendSyntax("super", DScriptGrammar.ParseSuper, null);

        NameSpace.AppendSyntax("null", DScriptGrammar.ParseNull, DScriptGrammar.TypeNull);
        NameSpace.AppendSyntax("if", DScriptGrammar.ParseIf, DScriptGrammar.TypeIf);
        NameSpace.AppendSyntax("while", DScriptGrammar.ParseWhile, DScriptGrammar.TypeWhile);
        NameSpace.AppendSyntax("continue", DScriptGrammar.ParseContinue, DScriptGrammar.TypeContinue);
        NameSpace.AppendSyntax("break", DScriptGrammar.ParseBreak, DScriptGrammar.TypeBreak);
        NameSpace.AppendSyntax("return", DScriptGrammar.ParseReturn, DScriptGrammar.TypeReturn);
        NameSpace.AppendSyntax("const", DScriptGrammar.ParseConstDecl, DScriptGrammar.TypeConstDecl);
        NameSpace.AppendSyntax("class", DScriptGrammar.ParseClassDecl, DScriptGrammar.TypeClassDecl);
        NameSpace.AppendSyntax("try", DScriptGrammar.ParseTry, DScriptGrammar.TypeTry);
        NameSpace.AppendSyntax("throw", DScriptGrammar.ParseThrow, DScriptGrammar.TypeThrow);
        NameSpace.AppendSyntax("new", DScriptGrammar.ParseNew, DScriptGrammar.TypeApply);
        NameSpace.AppendSyntax("enum", DScriptGrammar.ParseEnum, DScriptGrammar.TypeEnum);
    };
    return DScriptGrammar;
})(GtGrammar);

var GtStat = (function () {
    function GtStat() {
        this.MatchCount = 0;
        this.BacktrackCount = 0;
    }
    return GtStat;
})();

var GtClassContext = (function () {
    function GtClassContext(Grammar, Generator) {
        this.Generator = Generator;
        this.Generator.Context = this;
        this.SourceMap = new GtMap();
        this.SourceList = new Array();
        this.ClassNameMap = new GtMap();
        this.UniqueFuncMap = new GtMap();
        this.RootNameSpace = new GtNameSpace(this, null);
        this.ClassCount = 0;
        this.FuncCount = 0;
        this.Stat = new GtStat();
        this.ReportedErrorList = new Array();

        this.TopType = new GtType(this, 0, "top", null, null);
        this.StructType = this.TopType.CreateSubType(0, "record", null, null);
        this.EnumType = this.TopType.CreateSubType(EnumClass, "enum", null, null);

        this.VoidType = this.RootNameSpace.AppendTypeName(new GtType(this, NativeClass, "void", null, null));
        this.BooleanType = this.RootNameSpace.AppendTypeName(new GtType(this, NativeClass, "boolean", false, Boolean));
        this.IntType = this.RootNameSpace.AppendTypeName(new GtType(this, NativeClass, "int", 0, Number));
        this.StringType = this.RootNameSpace.AppendTypeName(new GtType(this, NativeClass, "String", "", String));
        this.VarType = this.RootNameSpace.AppendTypeName(new GtType(this, 0, "var", null, null));
        this.AnyType = this.RootNameSpace.AppendTypeName(new GtType(this, DynamicClass, "any", null, null));
        this.TypeType = this.RootNameSpace.AppendTypeName(this.TopType.CreateSubType(0, "Type", null, null));
        this.ArrayType = this.RootNameSpace.AppendTypeName(this.TopType.CreateSubType(0, "Array", null, null));
        this.FuncType = this.RootNameSpace.AppendTypeName(this.TopType.CreateSubType(0, "Func", null, null));

        this.ArrayType.TypeParams = new Array(1);
        this.ArrayType.TypeParams[0] = this.AnyType;
        this.FuncType.TypeParams = new Array(1);
        this.FuncType.TypeParams[0] = this.AnyType;

        Grammar.LoadTo(this.RootNameSpace);
        this.TopLevelNameSpace = new GtNameSpace(this, this.RootNameSpace);
        this.Generator.InitContext(this);
    }
    GtClassContext.prototype.LoadGrammar = function (Grammar) {
        Grammar.LoadTo(this.TopLevelNameSpace);
    };

    GtClassContext.prototype.GuessType = function (Value) {
        if (Value instanceof GtFunc) {
            return (Value).GetFuncType();
        } else if (Value instanceof GtPolyFunc) {
            return this.FuncType;
        } else if (Value instanceof GreenTeaTopObject) {
            return (Value).GreenType;
        } else if (Value instanceof GtType) {
            return this.TypeType;
        } else {
            return this.Generator.GetNativeType(Value);
        }
    };

    GtClassContext.prototype.SubtypeKey = function (FromType, ToType) {
        return FromType.GetUniqueName() + "<" + ToType.GetUniqueName();
    };

    GtClassContext.prototype.CheckSubType = function (SubType, SuperType) {
        return false;
    };

    GtClassContext.prototype.GetGenericType = function (BaseType, BaseIdx, TypeList, IsCreation) {
        LibGreenTea.Assert(BaseType.IsGenericType());
        var MangleName = MangleGenericType(BaseType, BaseIdx, TypeList);
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

    GtClassContext.prototype.GetGenericType1 = function (BaseType, ParamType, IsCreation) {
        var TypeList = new Array();
        TypeList.add(ParamType);
        return this.GetGenericType(BaseType, 0, TypeList, IsCreation);
    };

    GtClassContext.prototype.CheckExportableName = function (Func) {
        return true;
    };

    GtClassContext.prototype.Eval = function (ScriptSource, FileLine) {
        var resultValue = null;
        LibGreenTea.DebugP("Eval: " + ScriptSource);
        var TokenContext = new GtTokenContext(this.TopLevelNameSpace, ScriptSource, FileLine);
        this.Generator.StartCompilationUnit();
        TokenContext.SkipEmptyStatement();
        while (TokenContext.HasNext()) {
            var annotation = TokenContext.SkipAndGetAnnotation(true);
            var topLevelTree = ParseExpression(this.TopLevelNameSpace, TokenContext);
            topLevelTree.SetAnnotation(annotation);
            LibGreenTea.DebugP("untyped tree: " + topLevelTree);
            var gamma = new GtTypeEnv(this.TopLevelNameSpace);
            var node = gamma.TypeCheckEachNode(topLevelTree, gamma.VoidType, DefaultTypeCheckPolicy);
            resultValue = this.Generator.Eval(node);
            TokenContext.SkipEmptyStatement();
            TokenContext.Vacume();
        }
        this.Generator.FinishCompilationUnit();
        return resultValue;
    };

    GtClassContext.prototype.LoadFile = function (FileName) {
        var ScriptText = LibGreenTea.LoadFile(FileName);
        var FileLine = this.GetFileLine(FileName, 1);
        this.Eval(ScriptText, FileLine);
    };

    GtClassContext.prototype.GetFileLine = function (FileName, Line) {
        var Id = this.SourceMap.get(FileName);
        if (Id == null) {
            this.SourceList.add(FileName);
            Id = this.SourceList.size();
            this.SourceMap.put(FileName, Id);
        }
        return LibGreenTea.JoinIntId(Id, Line);
    };

    GtClassContext.prototype.GetSourcePosition = function (FileLine) {
        var FileId = LibGreenTea.UpperId(FileLine);
        var Line = LibGreenTea.LowerId(FileLine);
        var FileName = (FileId == 0) ? "eval" : this.SourceList.get(FileId - 1);
        return "(" + FileName + ":" + Line + ")";
    };

    GtClassContext.prototype.ReportError = function (Level, Token, Message) {
        if (!Token.IsError()) {
            if (Level == ErrorLevel) {
                Message = "(error) " + this.GetSourcePosition(Token.FileLine) + " " + Message;
                Token.ToErrorToken(Message);
            } else if (Level == TypeErrorLevel) {
                Message = "(error) " + this.GetSourcePosition(Token.FileLine) + " " + Message;
            } else if (Level == WarningLevel) {
                Message = "(warning) " + this.GetSourcePosition(Token.FileLine) + " " + Message;
            } else if (Level == InfoLevel) {
                Message = "(info) " + this.GetSourcePosition(Token.FileLine) + " " + Message;
            }
            this.ReportedErrorList.add(Message);
        }
    };

    GtClassContext.prototype.GetReportedErrors = function () {
        var List = this.ReportedErrorList;
        this.ReportedErrorList = new Array();
        return LibGreenTea.CompactStringList(List);
    };

    GtClassContext.prototype.ShowReportedErrors = function () {
        var i = 0;
        var Messages = this.GetReportedErrors();
        while (i < Messages.length) {
            LibGreenTea.println(Messages[i]);
            i = i + 1;
        }
    };
    return GtClassContext;
})();

var GreenTeaScript = (function () {
    function GreenTeaScript() {
    }
    GreenTeaScript.ParseCommandOption = function (Args) {
        var TargetCode = "exe";
        var GeneratorFlag = 0;
        var OneLiner = null;
        var OutputFile = "-";
        var Index = 0;
        while (Index < Args.length) {
            var Argu = Args[Index];
            if (!Argu.startsWith("-")) {
                break;
            }
            Index += 1;
            if ((Argu.equals("-e") || Argu.equals("--eval")) && Index < Args.length) {
                OneLiner = Args[Index];
                Index += 1;
                continue;
            }
            if ((Argu.equals("-o") || Argu.equals("--out")) && Index < Args.length) {
                if (!Args[Index].endsWith(".green")) {
                    OutputFile = Args[Index];
                    Index += 1;
                    continue;
                }
            }
            if ((Argu.equals("-l") || Argu.equals("--lang")) && Index < Args.length) {
                if (!Args[Index].endsWith(".green")) {
                    TargetCode = Args[Index];
                    Index += 1;
                    continue;
                }
            }
            if (Argu.equals("--verbose")) {
                LibGreenTea.DebugMode = true;
                continue;
            }
            LibGreenTea.Usage();
        }
        var Generator = LibGreenTea.CodeGenerator(TargetCode, OutputFile, GeneratorFlag);
        if (Generator == null) {
            LibGreenTea.Usage();
        }
        var Context = new GtClassContext(new DScriptGrammar(), Generator);
        var ShellMode = true;
        if (OneLiner != null) {
            Context.Eval(OneLiner, 1);
            ShellMode = false;
        }
        while (Index < Args.length) {
            Context.Eval(LibGreenTea.LoadFile(Args[Index]), 1);
            ShellMode = false;
            Index += 1;
        }
        if (ShellMode) {
            LibGreenTea.println(ProgName + Version + " (" + CodeName + ") on " + LibGreenTea.GetPlatform());
            LibGreenTea.println(Copyright);
            var linenum = 1;
            var Line = null;
            while ((Line = LibGreenTea.ReadLine(">>> ")) != null) {
                Context.Eval(Line, linenum);
                Context.ShowReportedErrors();
                linenum += 1;
            }
        } else {
            Generator.FlushBuffer();
        }
    };

    GreenTeaScript.main = function (Args) {
        GreenTeaScript.ParseCommandOption(Args);
    };
    return GreenTeaScript;
})();
