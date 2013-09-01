var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
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
// "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED
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
// Version
var ProgName = "GreenTeaScript";
var CodeName = "Reference Implementation of D-Script";
var MajorVersion = 0;
var MinerVersion = 1;
var PatchLevel = 0;
var Version = "0.1";
var Copyright = "Copyright (c) 2013, JST/CREST DEOS project authors";
var License = "BSD-Style Open Source";

// ClassFlag
var ExportClass = 1 << 0;
var PublicClass = 1 << 1;
var NativeClass = 1 << 2;
var VirtualClass = 1 << 3;
var EnumClass = 1 << 4;
var DeprecatedClass = 1 << 5;

var DynamicClass = 1 << 6;
var OpenClass = 1 << 7;
var TypeRef = 1 << 15;

// FuncFlag
var ExportFunc = 1 << 0;
var PublicFunc = 1 << 1;
var NativeFunc = 1 << 2;
var VirtualFunc = 1 << 3;
var ConstFunc = 1 << 4;
var DeprecatedFunc = 1 << 5;

var NativeStaticFunc = 1 << 6;
var NativeMacroFunc = 1 << 7;
var NativeVariadicFunc = 1 << 8;
var ConstructorFunc = 1 << 9;
var GetterFunc = 1 << 10;
var SetterFunc = 1 << 11;
var OperatorFunc = 1 << 12;
var CoercionFunc = 1 << 13;
var LazyFunc = 1 << 14;

// VarFlag
var ReadOnlyVar = 1;

//var MutableFieldVar: int  = (1 << 1);  // @var x: Mutable; x.y = 1 var allowed: is
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
    /*var soh: nul var etx: stx var enq: eot var bel: ack*/
    0,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    /*var ht: bs var vt: nl var cr: np var si: so  */
    1,
    TabChar,
    NewLineChar,
    1,
    1,
    NewLineChar,
    1,
    1,
    /*020 dle  021 dc1  022 dc2  023 dc3  024 dc4  025 nak  026 syn  027 etb */
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    /*030 can  031 em   032 sub  033 esc  034 fs   035 gs   036 rs   037 us */
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

// TokenFlag
var SourceTokenFlag = 1;
var ErrorTokenFlag = (1 << 1);
var IndentTokenFlag = (1 << 2);
var WhiteSpaceTokenFlag = (1 << 3);
var DelimTokenFlag = (1 << 4);
var QuotedTokenFlag = (1 << 5);
var NameSymbolTokenFlag = (1 << 6);

// ParseFlag
var BackTrackParseFlag = 1;
var SkipIndentParseFlag = (1 << 1);

// SyntaxTree
var NoWhere = -1;

// UnaryTree, SuffixTree
var UnaryTerm = 0;

// BinaryTree
var LeftHandTerm = 0;
var RightHandTerm = 1;

// IfStmt
var IfCond = 0;
var IfThen = 1;
var IfElse = 2;

// while(cond) {...}
var WhileCond = 0;
var WhileBody = 1;

// for(init; cond; iter) {...}
var ForInit = 0;
var ForCond = 1;
var ForIteration = 2;
var ForBody = 3;

// ReturnStmt
var ReturnExpr = 0;

// var N = 1;
var VarDeclType = 0;
var VarDeclName = 1;
var VarDeclValue = 2;
var VarDeclScope = 3;

//var Call: Func;
var CallExpressionIndex = 0;
var CallParameterIndex = 1;

// var Decl: Const;
var SymbolDeclClassIndex = 0;
var SymbolDeclNameIndex = 1;
var SymbolDeclValueIndex = 2;

// var Decl: Func;
var FuncDeclReturnType = 0;
var FuncDeclClass = 1;
var FuncDeclName = 2;
var FuncDeclBlock = 3;
var FuncDeclParam = 4;

// var Decl: Class;
var ClassDeclSuperType = 0;
var ClassDeclName = 1;
var ClassDeclFieldStartIndex = 2;

// try-catch
var TryBody = 0;
var CatchVariable = 1;
var CatchBody = 2;
var FinallyBody = 3;

// switch-case
var SwitchCaseCondExpr = 0;
var SwitchCaseDefaultBlock = 1;
var SwitchCaseCaseIndex = 2;

// Enum
var EnumNameTreeIndex = 0;

var BinaryOperator = 1;
var LeftJoin = 1 << 1;
var PrecedenceShift = 3;
var PrecedenceCStyleMUL = (100 << PrecedenceShift) | BinaryOperator;
var PrecedenceCStyleADD = (200 << PrecedenceShift) | BinaryOperator;
var PrecedenceCStyleSHIFT = (300 << PrecedenceShift) | BinaryOperator;
var PrecedenceCStyleCOMPARE = (400 << PrecedenceShift) | BinaryOperator;
var PrecedenceInstanceof = PrecedenceCStyleCOMPARE;
var PrecedenceCStyleEquals = (500 << PrecedenceShift) | BinaryOperator;
var PrecedenceCStyleBITAND = (600 << PrecedenceShift) | BinaryOperator;
var PrecedenceCStyleBITXOR = (700 << PrecedenceShift) | BinaryOperator;
var PrecedenceCStyleBITOR = (800 << PrecedenceShift) | BinaryOperator;
var PrecedenceCStyleAND = (900 << PrecedenceShift) | BinaryOperator;
var PrecedenceCStyleOR = (1000 << PrecedenceShift) | BinaryOperator;
var PrecedenceCStyleTRINARY = (1100 << PrecedenceShift) | BinaryOperator;
var PrecedenceCStyleAssign = (1200 << PrecedenceShift) | BinaryOperator;
var PrecedenceCStyleCOMMA = (1300 << PrecedenceShift) | BinaryOperator;

var DefaultTypeCheckPolicy = 0;
var NoCheckPolicy = 1;
var CastPolicy = (1 << 1);
var IgnoreEmptyPolicy = (1 << 2);
var AllowEmptyPolicy = (1 << 3);
var AllowVoidPolicy = (1 << 4);
var AllowCoercionPolicy = (1 << 5);
var OnlyConstPolicy = (1 << 6);
var BlockPolicy = (1 << 7);

var UndefinedSymbol = new Object();
var NativeNameSuffix = "__";
var ShellGrammarReservedKeywords = ["true", "false", "as", "if", "/"];

var UseLangStat = true;

var VerboseSymbol = 1;
var VerboseType = (1 << 1);
var VerboseFunc = (1 << 2);
var VerboseEval = (1 << 3);
var VerboseToken = (1 << 4);
var VerboseUndefined = (1 << 5);

var VerboseNative = (1 << 6);
var VerboseFile = (1 << 7);
var VerboseException = (1 << 8);

function JoinStrings(Unit, Times) {
    var s = "";
    var i = 0;
    while (i < Times) {
        s = s + Unit;
        i = i + 1;
    }
    return s;
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
    return Name + NativeNameSuffix + Index;
}

function ClassSymbol(ClassType, Symbol) {
    return ClassType.GetUniqueName() + "." + Symbol;
}

function MangleGenericType(BaseType, BaseIdx, TypeList) {
    var s = BaseType.ShortClassName + NativeNameSuffix;
    var i = BaseIdx;
    while (i < LibGreenTea.ListSize(TypeList)) {
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
    return (Tree == null || Tree.IsEmptyOrError());
}

function TreeHead(Tree) {
    if (Tree != null) {
        while (Tree.PrevTree != null) {
            Tree = Tree.PrevTree;
        }
    }
    return Tree;
}

function TreeTail(Tree) {
    if (Tree != null) {
        while (Tree.NextTree != null) {
            Tree = Tree.NextTree;
        }
    }
    return Tree;
}

function LinkTree(LastNode, Node) {
    Node.PrevTree = LastNode;
    if (LastNode != null) {
        LastNode.NextTree = Node;
    }
    return TreeTail(Node);
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

        //LibGreenTea.DebugP("B :" + JoinStrings("  ", TokenContext.IndentLevel) + CurrentPattern + ", next=" + CurrentPattern.ParentPattern);
        TokenContext.IndentLevel += 1;
        var ParsedTree = LibGreenTea.ApplyMatchFunc(delegate, NameSpace, TokenContext, LeftTree, CurrentPattern);
        TokenContext.IndentLevel -= 1;
        if (ParsedTree != null && ParsedTree.IsEmpty()) {
            ParsedTree = null;
        }

        //LibGreenTea.DebugP("E :" + JoinStrings("  ", TokenContext.IndentLevel) + CurrentPattern + " => " + ParsedTree);
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
        LibGreenTea.VerboseLog(VerboseUndefined, "undefined syntax pattern: " + Pattern);
    }
    return TokenContext.ReportExpectedPattern(Pattern);
}

function ParseExpression(NameSpace, TokenContext, SuffixOnly) {
    var Pattern = TokenContext.GetFirstPattern();
    var LeftTree = ApplySyntaxPattern(NameSpace, TokenContext, null, Pattern);
    while (!IsEmptyOrError(LeftTree)) {
        var ExtendedPattern = TokenContext.GetExtendedPattern();
        if (ExtendedPattern == null || (SuffixOnly && ExtendedPattern.IsBinaryOperator())) {
            break;
        }
        LeftTree = ApplySyntaxPattern(NameSpace, TokenContext, LeftTree, ExtendedPattern);
    }
    return LeftTree;
}

// typing
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

function TypeBlock(Gamma, ParsedTree, ContextType) {
    var StackTopIndex = Gamma.StackTopIndex;
    var LastNode = null;
    while (ParsedTree != null) {
        var Node = ApplyTypeFunc(ParsedTree.Pattern.TypeFunc, Gamma, ParsedTree, Gamma.VoidType);
        /*local*/ Node = Gamma.TypeCheckSingleNode(ParsedTree, Node, Gamma.VoidType, DefaultTypeCheckPolicy);
        /*local*/ LastNode = LinkNode(LastNode, Node);
        if (Node.IsError()) {
            break;
        }
        ParsedTree = ParsedTree.NextTree;
    }
    Gamma.PushBackStackIndex(StackTopIndex);
    if (LastNode == null) {
        return Gamma.Generator.CreateEmptyNode(Gamma.VoidType);
    }
    return LastNode.MoveHeadNode();
}

// tokenizer
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

    GtToken.prototype.IsNextWhiteSpace = function () {
        return IsFlag(this.TokenFlag, WhiteSpaceTokenFlag);
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
            while (i < LibGreenTea.ListSize(this.SourceList)) {
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
            LibGreenTea.VerboseLog(VerboseUndefined, "undefined tokenizer: " + ScriptSource.substring(pos, pos + 1));
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
        if (this.PeekToken(TokenText)) {
            this.CurrentPosition += 1;
            return true;
        }
        return false;
    };

    GtTokenContext.prototype.PeekToken = function (TokenText) {
        var Token = this.GetToken();
        if (Token.EqualsText(TokenText)) {
            return true;
        }
        return false;
    };

    GtTokenContext.prototype.MatchIndentToken = function (TokenText) {
        var RollbackPosition = this.CurrentPosition;
        var Token = this.Next();
        while (Token.IsIndent()) {
            Token = this.Next();
        }
        if (Token.EqualsText(TokenText)) {
            return true;
        }
        this.CurrentPosition = RollbackPosition;
        return false;
    };

    GtTokenContext.prototype.StartsWithToken = function (TokenText) {
        var Token = this.GetToken();
        if (Token.EqualsText(TokenText)) {
            this.CurrentPosition += 1;
            return true;
        }
        if (Token.ParsedText.startsWith(TokenText)) {
            Token = new GtToken(Token.ParsedText.substring(TokenText.length), Token.FileLine);
            this.CurrentPosition += 1;
            this.SourceList.add(this.CurrentPosition, Token);
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
        var OldFlag = this.ParseFlag;
        if (Allowed) {
            this.ParseFlag = this.ParseFlag | BackTrackParseFlag;
        } else {
            this.ParseFlag = (~(BackTrackParseFlag) & this.ParseFlag);
        }
        return OldFlag;
    };

    GtTokenContext.prototype.SetSkipIndent = function (Allowed) {
        var OldFlag = this.ParseFlag;
        if (Allowed) {
            this.ParseFlag = this.ParseFlag | SkipIndentParseFlag;
        } else {
            this.ParseFlag = (~(SkipIndentParseFlag) & this.ParseFlag);
        }
        return OldFlag;
    };

    GtTokenContext.prototype.SetRememberFlag = function (OldFlag) {
        this.ParseFlag = OldFlag;
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
        // this is tentative implementation. In the future, you have to
        // use this pattern.
        var Annotation = null;
        this.SkipEmptyStatement();
        while (this.MatchToken("@")) {
            var Token = this.Next();
            if (Annotation == null) {
                Annotation = new GtMap();
            }
            Annotation.put(Token.ParsedText, true);
            this.SkipIndent();
            //			if(this.MatchToken(";")) {
            //				if(IsAllowedDelim) {
            //					Annotation = null; // empty statement
            //					this.SkipIndent();
            //				}
            //				else {
            //					return null;
            //				}
            //			}
        }
        return Annotation;
    };

    GtTokenContext.prototype.SkipEmptyStatement = function () {
        while (this.HasNext()) {
            var Token = this.GetToken();
            if (Token.IsIndent() || Token.IsDelim()) {
                this.CurrentPosition += 1;
                continue;
            }
            break;
        }
        //		return (Token != GtTokenContext.NullToken);
    };

    GtTokenContext.prototype.SkipIncompleteStatement = function () {
        //		if(this.HasNext()) {
        //			/*local*/GtToken Token = this.GetToken();
        //			if(!Token.IsIndent() && !Token.IsDelim()) {
        //				this.TopLevelNameSpace.Context.ReportError(WarningLevel, Token, "needs ;");
        //				if(Token.EqualsText("}")) {
        //					return;
        //				}
        //				this.CurrentPosition += 1;
        //				while(this.HasNext()) {
        //					Token = this.GetToken();
        //					if(Token.IsIndent() || Token.IsDelim()) {
        //						break;
        //					}
        //					if(Token.EqualsText("}")) {
        //						return;
        //					}
        //					this.CurrentPosition += 1;
        //				}
        //			}
        this.SkipEmptyStatement();
        //		}
    };

    GtTokenContext.prototype.Stringfy = function (PreText, BeginIdx, EndIdx) {
        var Buffer = PreText;
        var Position = BeginIdx;
        while (Position < EndIdx) {
            var Token = this.SourceList.get(Position);
            if (Token.IsIndent()) {
                Buffer += "\n";
            }
            Buffer += Token.ParsedText;
            if (Token.IsNextWhiteSpace()) {
                Buffer += " ";
            }
            Position += 1;
        }
        return Buffer;
    };

    GtTokenContext.prototype.Dump = function () {
        var Position = this.CurrentPosition;
        while (Position < this.SourceList.size()) {
            var Token = this.SourceList.get(Position);
            var DumpedToken = "[" + Position + "] " + Token;
            if (Token.PresetPattern != null) {
                DumpedToken = DumpedToken + " : " + Token.PresetPattern;
            }
            LibGreenTea.VerboseLog(VerboseToken, DumpedToken);
            Position += 1;
        }
    };

    GtTokenContext.prototype.SetSourceMap = function (SourceMap) {
        var Index = SourceMap.lastIndexOf(":");
        if (Index != -1) {
            var FileName = SourceMap.substring(0, Index);
            var Line = LibGreenTea.ParseInt(SourceMap.substring(Index + 1));
            this.ParsingLine = this.TopLevelNameSpace.Context.GetFileLine(FileName, Line);
        }
    };

    GtTokenContext.prototype.StopParsing = function (b) {
        // TODO Auto-generated method stub
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

    GtSyntaxPattern.prototype.IsRightJoin = function (Right) {
        var left = this.SyntaxFlag;
        var right = Right.SyntaxFlag;
        return (left < right || (left == right && !IsFlag(this.SyntaxFlag, LeftJoin) && !IsFlag(Right.SyntaxFlag, LeftJoin)));
    };

    GtSyntaxPattern.prototype.EqualsName = function (Name) {
        return LibGreenTea.EqualsString(this.PatternName, Name);
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
        while (i < LibGreenTea.ListSize(this.TreeList)) {
            var SubTree = this.TreeList.get(i);
            while (SubTree != null) {
                var Entry = SubTree.toString();
                if (LibGreenTea.ListSize(SubTree.TreeList) == 0) {
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
        return this.IsEmpty() || this.KeyToken.IsError();
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
            } else {
                if (!IsOptional) {
                    this.ToEmpty();
                }
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
            LibGreenTea.Assert(Tree != null);
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
        return (this.ConstValue instanceof GtType) ? this.ConstValue : null;
    };

    GtSyntaxTree.prototype.HasNodeAt = function (Index) {
        if (this.TreeList != null && Index < this.TreeList.size()) {
            return this.TreeList.get(Index) != null;
        }
        return false;
    };

    GtSyntaxTree.prototype.TypeCheck = function (Gamma, ContextType, TypeCheckPolicy) {
        var Node = ApplyTypeFunc(this.Pattern.TypeFunc, Gamma, this, ContextType);
        return Gamma.TypeCheckSingleNode(this, Node, ContextType, TypeCheckPolicy);
    };

    GtSyntaxTree.prototype.TypeCheckNodeAt = function (Index, Gamma, ContextType, TypeCheckPolicy) {
        var ParsedTree = this.GetSyntaxTreeAt(Index);
        if (ContextType == Gamma.VoidType || IsFlag(TypeCheckPolicy, BlockPolicy)) {
            return TypeBlock(Gamma, ParsedTree, ContextType);
        } else if (ParsedTree != null) {
            return ParsedTree.TypeCheck(Gamma, ContextType, TypeCheckPolicy);
        }
        return Gamma.CreateSyntaxErrorNode(this, "not empty");
    };

    GtSyntaxTree.prototype.ToConstTree = function (ConstValue) {
        this.Pattern = this.NameSpace.GetPattern("$Const$");
        this.ConstValue = ConstValue;
    };
    return GtSyntaxTree;
})();

/* typing */
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
    function GtVariableInfo(VarFlag, Type, Name, Index, NameToken, InitValue) {
        this.VariableFlag = VarFlag;
        this.Type = Type;
        this.NameToken = NameToken;
        this.Name = Name;
        this.NativeName = NativeVariableName(Name, Index);
        this.InitValue = null;
        this.UsedCount = 0;
        this.DefCount = 1;
    }
    GtVariableInfo.prototype.Defined = function () {
        this.DefCount += 1;
        this.InitValue = null;
    };

    GtVariableInfo.prototype.Used = function () {
        this.UsedCount += 1;
    };

    GtVariableInfo.prototype.Check = function () {
        if (this.UsedCount == 0 && this.NameToken != null) {
            this.Type.Context.ReportError(WarningLevel, this.NameToken, "unused variable: " + this.Name);
        }
    };
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
        this.AppendDeclaredVariable(0, RecvType, ThisName, null, null);
        this.LocalStackList.get(this.StackTopIndex - 1).NativeName = ThisName;
    };

    GtTypeEnv.prototype.AppendDeclaredVariable = function (VarFlag, Type, Name, NameToken, InitValue) {
        var VarInfo = new GtVariableInfo(VarFlag, Type, Name, this.StackTopIndex, NameToken, InitValue);
        if (this.StackTopIndex < this.LocalStackList.size()) {
            this.LocalStackList.set(this.StackTopIndex, VarInfo);
        } else {
            this.LocalStackList.add(VarInfo);
        }
        this.StackTopIndex += 1;
        return VarInfo;
    };

    GtTypeEnv.prototype.LookupDeclaredVariable = function (Symbol) {
        var i = this.StackTopIndex - 1;
        while (i >= 0) {
            var VarInfo = this.LocalStackList.get(i);
            if (VarInfo.Name.equals(Symbol)) {
                return VarInfo;
            }
            i = i - 1;
        }
        return null;
    };

    GtTypeEnv.prototype.PushBackStackIndex = function (PushBackIndex) {
        var i = this.StackTopIndex - 1;
        while (i >= PushBackIndex) {
            var VarInfo = this.LocalStackList.get(i);
            VarInfo.Check();
            i = i - 1;
        }
        this.StackTopIndex = PushBackIndex;
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

    GtTypeEnv.prototype.TypeCheckSingleNode = function (ParsedTree, Node, Type, TypeCheckPolicy) {
        LibGreenTea.Assert(Node != null);
        if (Node.IsError() || IsFlag(TypeCheckPolicy, NoCheckPolicy)) {
            return Node;
        }
        var ConstValue = Node.ToConstValue(IsFlag(TypeCheckPolicy, OnlyConstPolicy));
        if (ConstValue != null && !(Node instanceof ConstNode)) {
            Node = this.Generator.CreateConstNode(Node.Type, ParsedTree, ConstValue);
        }
        if (IsFlag(TypeCheckPolicy, OnlyConstPolicy) && ConstValue == null) {
            return this.CreateSyntaxErrorNode(ParsedTree, "value must be const");
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

// NameSpace
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
                    return Value == UndefinedSymbol ? null : Value;
                }
            }
            NameSpace = NameSpace.ParentNameSpace;
        }
        return null;
    };

    GtNameSpace.prototype.HasSymbol = function (Key) {
        return (this.GetSymbol(Key) != null);
    };

    GtNameSpace.prototype.SetSymbol = function (Key, Value) {
        if (this.SymbolPatternTable == null) {
            this.SymbolPatternTable = new GtMap();
        }
        this.SymbolPatternTable.put(Key, Value);
        LibGreenTea.VerboseLog(VerboseSymbol, "adding symbol: " + Key + ", " + Value);
    };

    GtNameSpace.prototype.SetUndefinedSymbol = function (Symbol) {
        this.SetSymbol(Symbol, UndefinedSymbol);
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
        var Alias = PatternName.indexOf(" ");
        var Name = (Alias == -1) ? PatternName : PatternName.substring(0, Alias);
        var Pattern = new GtSyntaxPattern(this, Name, MatchFunc, TypeFunc);
        this.AppendPattern(Name, Pattern);
        if (Alias != -1) {
            this.AppendSyntax(PatternName.substring(Alias + 1), MatchFunc, TypeFunc);
        }
    };

    GtNameSpace.prototype.AppendExtendedSyntax = function (PatternName, SyntaxFlag, MatchFunc, TypeFunc) {
        var Alias = PatternName.indexOf(" ");
        var Name = (Alias == -1) ? PatternName : PatternName.substring(0, Alias);
        var Pattern = new GtSyntaxPattern(this, Name, MatchFunc, TypeFunc);
        Pattern.SyntaxFlag = SyntaxFlag;
        this.AppendPattern("\t" + Name, Pattern);
        if (Alias != -1) {
            this.AppendExtendedSyntax(PatternName.substring(Alias + 1), SyntaxFlag, MatchFunc, TypeFunc);
        }
    };

    GtNameSpace.prototype.AppendTypeName = function (ClassInfo) {
        if (ClassInfo.PackageNameSpace == null) {
            ClassInfo.PackageNameSpace = this;
            if (this.PackageName != null) {
                this.Context.SetGlobalTypeName(this.PackageName + "." + ClassInfo.ShortClassName, ClassInfo);
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

    GtNameSpace.prototype.Eval = function (ScriptSource, FileLine) {
        var ResultValue = null;
        LibGreenTea.VerboseLog(VerboseEval, "eval: " + ScriptSource);
        var TokenContext = new GtTokenContext(this, ScriptSource, FileLine);
        this.Context.Generator.StartCompilationUnit();
        TokenContext.SkipEmptyStatement();
        while (TokenContext.HasNext()) {
            var Annotation = TokenContext.SkipAndGetAnnotation(true);
            var TopLevelTree = ParseExpression(this, TokenContext, false);
            TopLevelTree.SetAnnotation(Annotation);
            var Gamma = new GtTypeEnv(this);
            var Node = TopLevelTree.TypeCheck(Gamma, Gamma.VoidType, DefaultTypeCheckPolicy);
            ResultValue = Node.ToConstValue(true);
            TokenContext.SkipIncompleteStatement();
            TokenContext.Vacume();
        }
        this.Context.Generator.FinishCompilationUnit();
        return ResultValue;
    };

    GtNameSpace.prototype.LoadFile = function (FileName) {
        var ScriptText = LibGreenTea.LoadFile2(FileName);
        if (ScriptText != null) {
            var FileLine = this.Context.GetFileLine(FileName, 1);
            this.Eval(ScriptText, FileLine);
            return true;
        }
        return false;
    };

    GtNameSpace.prototype.LoadRequiredLib = function (LibName) {
        var Key = NativeNameSuffix + LibName.toLowerCase();
        if (!this.HasSymbol(Key)) {
            var Path = LibGreenTea.GetLibPath(this.Context.Generator.TargetCode, LibName);
            var Script = LibGreenTea.LoadFile2(Path);
            if (Script == null) {
                return false;
            }
            var FileLine = this.Context.GetFileLine(Path, 1);
            this.Eval(Script, FileLine);
            this.SetSymbol(Key, Script);
        }
        return true;
    };
    return GtNameSpace;
})();

var GtGrammar = (function () {
    function GtGrammar() {
    }
    GtGrammar.prototype.LoadTo = function (NameSpace) {
        /*extension*/
    };
    return GtGrammar;
})();

var GreenTeaGrammar = (function (_super) {
    __extends(GreenTeaGrammar, _super);
    function GreenTeaGrammar() {
        _super.apply(this, arguments);
    }
    GreenTeaGrammar.WhiteSpaceToken = // Token
    function (TokenContext, SourceText, pos) {
        TokenContext.FoundWhiteSpace();
        while (pos < SourceText.length) {
            var ch = LibGreenTea.CharAt(SourceText, pos);
            if (ch == 10 || !LibGreenTea.IsWhitespace(SourceText, pos)) {
                break;
            }
            pos += 1;
        }
        return pos;
    };

    GreenTeaGrammar.IndentToken = function (TokenContext, SourceText, pos) {
        var LineStart = pos + 1;
        TokenContext.FoundLineFeed(1);
        pos = pos + 1;
        while (pos < SourceText.length) {
            if (!LibGreenTea.IsWhitespace(SourceText, pos)) {
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
        //TokenContext.AddNewToken(SourceText.substring(pos), SourceTokenFlag, null);
        //return SourceText.length();
    };

    GreenTeaGrammar.SemiColonToken = function (TokenContext, SourceText, pos) {
        TokenContext.AddNewToken(SourceText.substring(pos, pos + 1), DelimTokenFlag, null);
        return pos + 1;
    };

    GreenTeaGrammar.SymbolToken = function (TokenContext, SourceText, pos) {
        var start = pos;
        var PresetPattern = null;
        if (LibGreenTea.CharAt(SourceText, pos + 1) == 36 && LibGreenTea.CharAt(SourceText, pos) == 84) {
            PresetPattern = "$TypeRef$";
            pos += 2;
        }
        while (pos < SourceText.length) {
            if (!LibGreenTea.IsVariableName(SourceText, pos) && !LibGreenTea.IsDigit(SourceText, pos)) {
                break;
            }
            pos += 1;
        }
        TokenContext.AddNewToken(SourceText.substring(start, pos), NameSymbolTokenFlag, PresetPattern);
        return pos;
    };

    GreenTeaGrammar.OperatorToken = function (TokenContext, SourceText, pos) {
        var NextPos = pos + 1;
        while (NextPos < SourceText.length) {
            if (LibGreenTea.IsWhitespace(SourceText, NextPos) || LibGreenTea.IsLetter(SourceText, NextPos) || LibGreenTea.IsDigit(SourceText, NextPos)) {
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

    GreenTeaGrammar.CommentToken = function (TokenContext, SourceText, pos) {
        var NextPos = pos + 1;
        var NextChar = LibGreenTea.CharAt(SourceText, NextPos);
        if (NextChar != 47 && NextChar != 42) {
            return NoMatch;
        }
        var Level = 0;
        var PrevChar = 0;
        if (NextChar == 42) {
            Level = 1;

            if (LibGreenTea.CharAt(SourceText, NextPos + 1) == 36 && LibGreenTea.CharAt(SourceText, NextPos + 2) == 123) {
                var StartPos = NextPos + 3;
                NextPos += 3;
                while (NextChar != 0) {
                    NextChar = LibGreenTea.CharAt(SourceText, NextPos);
                    if (NextChar == 125) {
                        TokenContext.SetSourceMap(SourceText.substring(StartPos, NextPos));
                        break;
                    }
                    if (NextChar == 10 || NextChar == 42) {
                        break;
                    }
                    NextPos += 1;
                }
            }
        }
        while (NextPos < SourceText.length) {
            NextChar = LibGreenTea.CharAt(SourceText, NextPos);
            if (NextChar == 10 && Level == 0) {
                return GreenTeaGrammar.IndentToken(TokenContext, SourceText, NextPos);
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
        return NoMatch;
    };

    GreenTeaGrammar.NumberLiteralToken = function (TokenContext, SourceText, pos) {
        var start = pos;
        while (pos < SourceText.length) {
            if (!LibGreenTea.IsDigit(SourceText, pos)) {
                break;
            }
            pos += 1;
        }
        TokenContext.AddNewToken(SourceText.substring(start, pos), 0, "$IntegerLiteral$");
        return pos;
    };

    GreenTeaGrammar.CharLiteralToken = function (TokenContext, SourceText, pos) {
        var start = pos;
        var prev = 92/*\'*/ ;
        pos = pos + 1;
        while (pos < SourceText.length) {
            var ch = LibGreenTea.CharAt(SourceText, pos);
            if (ch == 92 && prev != 92) {
                TokenContext.AddNewToken(SourceText.substring(start, pos + 1), QuotedTokenFlag, "$CharLiteral$");
                return pos + 1;
            }
            if (ch == 10) {
                TokenContext.ReportTokenError(ErrorLevel, "expected ' to close the charctor literal", SourceText.substring(start, pos));
                TokenContext.FoundLineFeed(1);
                return pos;
            }
            pos = pos + 1;
            prev = ch;
        }
        TokenContext.ReportTokenError(ErrorLevel, "expected ' to close the charctor literal", SourceText.substring(start, pos));
        return pos;
    };

    GreenTeaGrammar.StringLiteralToken = function (TokenContext, SourceText, pos) {
        var start = pos;
        var prev = 34/*"*/ ;
        pos = pos + 1;
        while (pos < SourceText.length) {
            var ch = LibGreenTea.CharAt(SourceText, pos);
            if (ch == 34 && prev != 92) {
                TokenContext.AddNewToken(SourceText.substring(start, pos + 1), QuotedTokenFlag, "$StringLiteral$");
                return pos + 1;
            }
            if (ch == 10) {
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

    GreenTeaGrammar.StringLiteralToken_StringInterpolation = function (TokenContext, SourceText, pos) {
        var start = pos + 1;
        var NextPos = start;
        var prev = 34/*"*/ ;
        while (NextPos < SourceText.length) {
            var ch = LibGreenTea.CharAt(SourceText, NextPos);
            if (ch == 36) {
                var end = NextPos + 1;
                var nextch = LibGreenTea.CharAt(SourceText, end);
                if (nextch == 123) {
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
            if (ch == 34 && prev != 92) {
                TokenContext.AddNewToken("\"" + SourceText.substring(start, NextPos) + "\"", 0, "$StringLiteral$");
                return NextPos + 1;
            }
            if (ch == 10) {
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

    GreenTeaGrammar.ParseTypeOf = function (NameSpace, TokenContext, LeftTree, Pattern) {
        var TypeOfTree = new GtSyntaxTree(Pattern, NameSpace, TokenContext.GetMatchedToken("typeof"), null);
        TypeOfTree.SetMatchedTokenAt(NoWhere, NameSpace, TokenContext, "(", Required);
        TypeOfTree.SetMatchedPatternAt(UnaryTerm, NameSpace, TokenContext, "$Expression$", Required);
        TypeOfTree.SetMatchedTokenAt(NoWhere, NameSpace, TokenContext, ")", Required);
        if (!TypeOfTree.IsEmptyOrError()) {
            var Gamma = new GtTypeEnv(NameSpace);
            var ObjectNode = TypeOfTree.TypeCheckNodeAt(UnaryTerm, Gamma, Gamma.VarType, DefaultTypeCheckPolicy);
            if (ObjectNode.IsError()) {
                TypeOfTree.ToError(ObjectNode.Token);
            } else {
                TypeOfTree.ToConstTree(ObjectNode.Type);
                var TypeTree = TokenContext.ParsePatternAfter(NameSpace, TypeOfTree, "$TypeSuffix$", Optional);
                return (TypeTree == null) ? TypeOfTree : TypeTree;
            }
        }
        return TypeOfTree;
    };

    GreenTeaGrammar.ParseTypeSuffix = function (NameSpace, TokenContext, TypeTree, Pattern) {
        var ParsedType = TypeTree.GetParsedType();
        if (ParsedType.IsGenericType()) {
            if (TokenContext.MatchToken("<")) {
                var TypeList = new Array();
                while (!TokenContext.StartsWithToken(">")) {
                    if (TypeList.size() > 0 && !TokenContext.MatchToken(",")) {
                        return null;
                    }
                    var ParamTypeTree = TokenContext.ParsePattern(NameSpace, "$Type$", Optional);
                    if (ParamTypeTree == null) {
                        return ParamTypeTree;
                    }
                    TypeList.add(ParamTypeTree.GetParsedType());
                }
                ParsedType = NameSpace.Context.GetGenericType(ParsedType, 0, TypeList, true);
            }
        }
        while (TokenContext.MatchToken("[")) {
            if (!TokenContext.MatchToken("]")) {
                return null;
            }
            ParsedType = NameSpace.Context.GetGenericType1(NameSpace.Context.ArrayType, ParsedType, true);
        }
        TypeTree.ToConstTree(ParsedType);
        return TypeTree;
    };

    GreenTeaGrammar.ParseType = // parser and type checker
    function (NameSpace, TokenContext, LeftTree, Pattern) {
        if (TokenContext.MatchToken("typeof")) {
            return GreenTeaGrammar.ParseTypeOf(NameSpace, TokenContext, LeftTree, Pattern);
        }
        var Token = TokenContext.Next();
        var ConstValue = NameSpace.GetSymbol(Token.ParsedText);
        if (!(ConstValue instanceof GtType)) {
            return null;
        }
        var TypeTree = new GtSyntaxTree(Pattern, NameSpace, Token, ConstValue);
        var TypeSuffixTree = TokenContext.ParsePatternAfter(NameSpace, TypeTree, "$TypeSuffix$", Optional);
        return (TypeSuffixTree == null) ? TypeTree : TypeSuffixTree;
    };

    GreenTeaGrammar.ParseConst = function (NameSpace, TokenContext, LeftTree, Pattern) {
        var Token = TokenContext.Next();
        var ConstValue = NameSpace.GetSymbol(Token.ParsedText);
        if (ConstValue != null) {
            return new GtSyntaxTree(Pattern, NameSpace, Token, ConstValue);
        }
        return null;
    };

    GreenTeaGrammar.TypeConst = function (Gamma, ParsedTree, ContextType) {
        if ((typeof ParsedTree.ConstValue == 'string' || ParsedTree.ConstValue instanceof String)) {
            ParsedTree.ConstValue = ParsedTree.ConstValue;
        }
        return Gamma.Generator.CreateConstNode(Gamma.Context.GuessType(ParsedTree.ConstValue), ParsedTree, ParsedTree.ConstValue);
    };

    GreenTeaGrammar.ParseNull = function (NameSpace, TokenContext, LeftTree, Pattern) {
        var Token = TokenContext.GetMatchedToken("null");
        var NewTree = new GtSyntaxTree(Pattern, NameSpace, Token, null);
        return NewTree;
    };

    GreenTeaGrammar.TypeNull = function (Gamma, ParsedTree, ContextType) {
        var ThisType = ContextType;
        if (ThisType == Gamma.VarType) {
            ThisType = Gamma.AnyType;
        }
        if (ThisType.DefaultNullValue != null) {
            return Gamma.Generator.CreateConstNode(ThisType, ParsedTree, ThisType.DefaultNullValue);
        }
        return Gamma.Generator.CreateNullNode(ThisType, ParsedTree);
    };

    GreenTeaGrammar.ParseSymbol = function (NameSpace, TokenContext, LeftTree, Pattern) {
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
            TypeTree.Pattern = NameSpace.GetPattern("$Const$");
            return TypeTree;
        }
        var Token = TokenContext.Next();
        var VarTree = new GtSyntaxTree(NameSpace.GetPattern("$Variable$"), NameSpace, Token, null);
        if (!LibGreenTea.IsVariableName(Token.ParsedText, 0)) {
            //			NameSpace.Context.ReportError(ErrorLevel, Token, "illegal variable name: '" + Token.ParsedText + "'");
            //			VarTree.ToError(Token);
            return null;
        }
        return VarTree;
    };

    GreenTeaGrammar.ParseVariable = function (NameSpace, TokenContext, LeftTree, Pattern) {
        var Token = TokenContext.Next();
        if (LibGreenTea.IsVariableName(Token.ParsedText, 0)) {
            return new GtSyntaxTree(Pattern, NameSpace, Token, null);
        }
        return null;
    };

    GreenTeaGrammar.TypeVariable = function (Gamma, ParsedTree, ContextType) {
        var Name = ParsedTree.KeyToken.ParsedText;
        var VariableInfo = Gamma.LookupDeclaredVariable(Name);
        if (VariableInfo != null) {
            VariableInfo.Used();
            return Gamma.Generator.CreateLocalNode(VariableInfo.Type, ParsedTree, VariableInfo.NativeName);
        }
        var ConstValue = ParsedTree.NameSpace.GetSymbol(Name);
        if (ConstValue != null) {
            return Gamma.Generator.CreateConstNode(Gamma.Context.GuessType(ConstValue), ParsedTree, ConstValue);
        }
        var Node = Gamma.Generator.CreateLocalNode(Gamma.AnyType, ParsedTree, Name + Gamma.Generator.BlockComment("undefined"));
        return Gamma.ReportTypeResult(ParsedTree, Node, TypeErrorLevel, "undefined name: " + Name);
    };

    GreenTeaGrammar.ParseVarDecl = function (NameSpace, TokenContext, LeftTree, Pattern) {
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
            NextTree.SetMatchedPatternAt(VarDeclName, NameSpace, TokenContext, "$Variable$", Required);
            if (TokenContext.MatchToken("=")) {
                NextTree.SetMatchedPatternAt(VarDeclValue, NameSpace, TokenContext, "$Expression$", Required);
            }
            Tree = LinkTree(Tree, NextTree);
        }
        return Tree;
    };

    GreenTeaGrammar.TypeVarDecl = function (Gamma, ParsedTree, ContextType) {
        var VarFlag = Gamma.Generator.ParseVarFlag(0, ParsedTree.Annotation);
        var DeclType = ParsedTree.GetSyntaxTreeAt(VarDeclType).GetParsedType();
        var VariableName = ParsedTree.GetSyntaxTreeAt(VarDeclName).KeyToken.ParsedText;
        var InitValueNode = null;
        if (ParsedTree.HasNodeAt(VarDeclValue)) {
            InitValueNode = ParsedTree.TypeCheckNodeAt(VarDeclValue, Gamma, DeclType, DefaultTypeCheckPolicy);
        }
        if (UseLangStat) {
            Gamma.Context.Stat.VarDecl += 1;
        }
        if (DeclType.IsVarType()) {
            if (InitValueNode == null) {
                DeclType = Gamma.AnyType;
            } else {
                DeclType = InitValueNode.Type;
            }
            Gamma.ReportTypeInference(ParsedTree.KeyToken, VariableName, DeclType);
            if (UseLangStat) {
                Gamma.Context.Stat.VarDeclInfer += 1;
                if (DeclType.IsAnyType()) {
                    Gamma.Context.Stat.VarDeclInferAny += 1;
                }
            }
        }
        if (UseLangStat) {
            if (DeclType.IsAnyType()) {
                Gamma.Context.Stat.VarDeclAny += 1;
            }
        }
        if (InitValueNode == null) {
            InitValueNode = Gamma.CreateDefaultValue(ParsedTree, DeclType);
        }
        var VarInfo = Gamma.AppendDeclaredVariable(VarFlag, DeclType, VariableName, ParsedTree.GetSyntaxTreeAt(VarDeclName).KeyToken, InitValueNode.ToConstValue(false));
        var BlockNode = TypeBlock(Gamma, ParsedTree.NextTree, Gamma.VoidType);
        ParsedTree.NextTree = null;
        return Gamma.Generator.CreateVarNode(DeclType, ParsedTree, DeclType, VarInfo.NativeName, InitValueNode, BlockNode);
    };

    GreenTeaGrammar.ParseIntegerLiteral = // Parse And Type
    function (NameSpace, TokenContext, LeftTree, Pattern) {
        var Token = TokenContext.Next();
        return new GtSyntaxTree(Pattern, NameSpace, Token, LibGreenTea.ParseInt(Token.ParsedText));
    };

    GreenTeaGrammar.ParseStringLiteral = function (NameSpace, TokenContext, LeftTree, Pattern) {
        var Token = TokenContext.Next();
        var NewTree = new GtSyntaxTree(Pattern, NameSpace, Token, LibGreenTea.UnquoteString(Token.ParsedText));
        return NewTree;
    };

    GreenTeaGrammar.ParseCharLiteral = function (NameSpace, TokenContext, LeftTree, Pattern) {
        var Token = TokenContext.Next();
        var NewTree = new GtSyntaxTree(Pattern, NameSpace, Token, LibGreenTea.UnquoteString(Token.ParsedText));
        return NewTree;
    };

    GreenTeaGrammar.TypeCharLiteral = function (Gamma, ParsedTree, ContextType) {
        var Text = ParsedTree.KeyToken.ParsedText;
        if (Text.length == 3) {
            var ch = LibGreenTea.CharAt(Text, 1);
            var Value = ch;
            ParsedTree.ConstValue = LibGreenTea.ParseInt(Value.toString());
        } else if (Text.length == 4) {
            var ch = LibGreenTea.CharAt(Text, 2);
            if (LibGreenTea.CharAt(Text, 1) == 92) {
                switch (ch) {
                    case 92:
                        ch = 92;
                        break;
                    case 92:
                        ch = 92;
                        break;
                    case 98:
                        ch = 92;
                        break;
                    case 102:
                        ch = 92;
                        break;
                    case 110:
                        ch = 10;
                        break;
                    case 114:
                        ch = 92;
                        break;
                    case 116:
                        ch = 9;
                        break;
                    default:
                        ch = -1;
                }
                if (ch >= 0) {
                    var Value = ch;
                    ParsedTree.ConstValue = LibGreenTea.ParseInt(Value.toString());
                }
            }
        }
        return GreenTeaGrammar.TypeConst(Gamma, ParsedTree, ContextType);
    };

    GreenTeaGrammar.ParseTypeRef = function (NameSpace, TokenContext, LeftTree, Pattern) {
        var Token = TokenContext.Next();
        var NewTree = new GtSyntaxTree(Pattern, NameSpace, Token, Token.ParsedText);
        return NewTree;
    };

    GreenTeaGrammar.TypeTypeRef = function (Gamma, ParsedTree, ContextType) {
        var TypeRef = ParsedTree.KeyToken.ParsedText;
        return Gamma.CreateSyntaxErrorNode(ParsedTree, "illegal use of type reference: " + TypeRef);
    };

    GreenTeaGrammar.ParseExpression = function (NameSpace, TokenContext, LeftTree, Pattern) {
        return ParseExpression(NameSpace, TokenContext, false);
    };

    GreenTeaGrammar.ParseUnary = function (NameSpace, TokenContext, LeftTree, Pattern) {
        var Token = TokenContext.Next();
        var Tree = new GtSyntaxTree(Pattern, NameSpace, Token, null);
        var SubTree = ParseExpression(NameSpace, TokenContext, true);
        Tree.SetSyntaxTreeAt(UnaryTerm, SubTree);
        return Tree;
    };

    GreenTeaGrammar.TypeUnary = function (Gamma, ParsedTree, ContextType) {
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

    GreenTeaGrammar.RightJoin = function (NameSpace, LeftTree, Pattern, OperatorToken, RightTree) {
        var RightLeft = RightTree.GetSyntaxTreeAt(LeftHandTerm);
        if (RightLeft.Pattern.IsBinaryOperator() && Pattern.IsRightJoin(RightLeft.Pattern)) {
            RightTree.SetSyntaxTreeAt(LeftHandTerm, GreenTeaGrammar.RightJoin(NameSpace, LeftTree, Pattern, OperatorToken, RightLeft));
        } else {
            var NewTree = new GtSyntaxTree(Pattern, NameSpace, OperatorToken, null);
            NewTree.SetSyntaxTreeAt(LeftHandTerm, LeftTree);
            NewTree.SetSyntaxTreeAt(RightHandTerm, RightLeft);
            RightTree.SetSyntaxTreeAt(LeftHandTerm, NewTree);
        }
        return RightTree;
    };

    GreenTeaGrammar.ParseBinary = function (NameSpace, TokenContext, LeftTree, Pattern) {
        var OperatorToken = TokenContext.Next();
        var RightTree = ParseExpression(NameSpace, TokenContext, false);
        if (IsEmptyOrError(RightTree)) {
            return RightTree;
        }

        if (RightTree.Pattern.IsBinaryOperator() && Pattern.IsRightJoin(RightTree.Pattern)) {
            return GreenTeaGrammar.RightJoin(NameSpace, LeftTree, Pattern, OperatorToken, RightTree);
        }

        // LeftJoin
        var NewTree = new GtSyntaxTree(Pattern, NameSpace, OperatorToken, null);
        NewTree.SetSyntaxTreeAt(LeftHandTerm, LeftTree);
        NewTree.SetSyntaxTreeAt(RightHandTerm, RightTree);
        if (RightTree.NextTree != null) {
            LinkTree(NewTree, RightTree.NextTree);
            RightTree.NextTree = null;
        }
        return NewTree;
    };

    GreenTeaGrammar.TypeBinary = function (Gamma, ParsedTree, ContextType) {
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
            var ParamList = new Array();
            ParamList.add(LeftNode);
            ResolvedFunc = PolyFunc.ResolveFunc(Gamma, ParsedTree, 1, ParamList);
            if (ResolvedFunc != null) {
                LeftNode = ParamList.get(0);
                RightNode = ParamList.get(1);
            }
            //			/*local*/GtNode[] BinaryNodes = new GtNode[2];
            //			BinaryNodes[0] = LeftNode;
            //			BinaryNodes[1] = RightNode;
            //			ResolvedFunc = PolyFunc.ResolveBinaryFunc(Gamma, BinaryNodes);
            //			LeftNode = BinaryNodes[0];
            //			RightNode = BinaryNodes[1];
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

    GreenTeaGrammar.ParseTrinary = function (NameSpace, TokenContext, LeftTree, Pattern) {
        var TrinaryTree = new GtSyntaxTree(Pattern, NameSpace, TokenContext.GetMatchedToken("?"), null);
        TrinaryTree.SetSyntaxTreeAt(IfCond, LeftTree);
        TrinaryTree.SetMatchedPatternAt(IfThen, NameSpace, TokenContext, "$Expression$", Required);
        TrinaryTree.SetMatchedTokenAt(NoWhere, NameSpace, TokenContext, ":", Required);
        TrinaryTree.SetMatchedPatternAt(IfElse, NameSpace, TokenContext, "$Expression$", Required);
        return TrinaryTree;
    };

    GreenTeaGrammar.TypeTrinary = function (Gamma, ParsedTree, ContextType) {
        var CondNode = ParsedTree.TypeCheckNodeAt(IfCond, Gamma, Gamma.BooleanType, DefaultTypeCheckPolicy);
        var ThenNode = ParsedTree.TypeCheckNodeAt(IfThen, Gamma, Gamma.VarType, DefaultTypeCheckPolicy);
        if (ThenNode.IsError()) {
            return ThenNode;
        }
        var ElseNode = ParsedTree.TypeCheckNodeAt(IfElse, Gamma, ThenNode.Type, DefaultTypeCheckPolicy);
        return Gamma.Generator.CreateTrinaryNode(ThenNode.Type, ParsedTree, CondNode, ThenNode, ElseNode);
    };

    GreenTeaGrammar.ParseGroup = // PatternName: "("
    function (NameSpace, TokenContext, LeftTree, Pattern) {
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

    GreenTeaGrammar.TypeGroup = function (Gamma, ParsedTree, ContextType) {
        return ParsedTree.TypeCheckNodeAt(UnaryTerm, Gamma, ContextType, DefaultTypeCheckPolicy);
    };

    GreenTeaGrammar.ParseCast = // PatternName: "(" "to" $Type$ ")"
    function (NameSpace, TokenContext, LeftTree, Pattern) {
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
        var ExprTree = ParseExpression(NameSpace, TokenContext, true);
        CastTree.SetSyntaxTreeAt(RightHandTerm, ExprTree);
        return CastTree;
    };

    GreenTeaGrammar.TypeCast = function (Gamma, ParsedTree, ContextType) {
        var CastType = ParsedTree.GetSyntaxTreeAt(LeftHandTerm).GetParsedType();
        var TypeCheckPolicy = CastPolicy;
        return ParsedTree.TypeCheckNodeAt(RightHandTerm, Gamma, CastType, TypeCheckPolicy);
    };

    GreenTeaGrammar.ParseGetter = function (NameSpace, TokenContext, LeftTree, Pattern) {
        TokenContext.MatchToken(".");
        var Token = TokenContext.Next();
        if (Token.IsNameSymbol()) {
            var NewTree = new GtSyntaxTree(Pattern, NameSpace, Token, null);
            NewTree.AppendParsedTree(LeftTree);
            return NewTree;
        }
        return TokenContext.ReportExpectedToken("field name");
    };

    GreenTeaGrammar.TypeGetter = function (Gamma, ParsedTree, ContextType) {
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

            if (ObjectType.IsEnumType()) {
                LibGreenTea.Assert(ObjectType.NativeSpec instanceof GtMap);
                var NativeSpec = ObjectType.NativeSpec;
                var EnumValue = NativeSpec.get(Name);
                if (EnumValue != null) {
                    return Gamma.Generator.CreateConstNode(Gamma.Context.GuessType(EnumValue), ParsedTree, EnumValue);
                }
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

    GreenTeaGrammar.ParseDefined = function (NameSpace, TokenContext, LeftTree, Pattern) {
        var DefinedTree = new GtSyntaxTree(Pattern, NameSpace, TokenContext.GetMatchedToken("defined"), null);
        DefinedTree.SetMatchedTokenAt(NoWhere, NameSpace, TokenContext, "(", Required);
        DefinedTree.SetMatchedPatternAt(UnaryTerm, NameSpace, TokenContext, "$Expression$", Required);
        DefinedTree.SetMatchedTokenAt(NoWhere, NameSpace, TokenContext, ")", Required);
        return DefinedTree;
    };

    GreenTeaGrammar.TypeDefined = function (Gamma, ParsedTree, Type) {
        Gamma.Context.SetNoErrorReport(true);
        var ObjectNode = ParsedTree.TypeCheckNodeAt(UnaryTerm, Gamma, Gamma.VarType, DefaultTypeCheckPolicy);
        Gamma.Context.SetNoErrorReport(false);
        return Gamma.Generator.CreateConstNode(Gamma.BooleanType, ParsedTree, (ObjectNode instanceof ConstNode));
    };
    GreenTeaGrammar.ParseApply = function (NameSpace, TokenContext, LeftTree, Pattern) {
        var ParseFlag = TokenContext.ParseFlag;
        TokenContext.ParseFlag |= SkipIndentParseFlag;
        var FuncTree = new GtSyntaxTree(Pattern, NameSpace, TokenContext.GetMatchedToken("("), null);
        FuncTree.AppendParsedTree(LeftTree);
        if (!TokenContext.MatchToken(")")) {
            while (!FuncTree.IsEmptyOrError()) {
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

    GreenTeaGrammar.TypeApply = function (Gamma, ParsedTree, ContextType) {
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
            LibGreenTea.Assert(PolyFunc != null);
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
                    // reset ConstValue as if non-polymorphic function were found
                    (FuncNode).ConstValue = ResolvedFunc;
                    (FuncNode).Type = ResolvedFunc.GetFuncType();
                }
            }
        }
        var ReturnType = Gamma.AnyType;
        if (FuncNode.Type == Gamma.AnyType) {
            while (TreeIndex < LibGreenTea.ListSize(ParsedTree.TreeList)) {
                var Node = ParsedTree.TypeCheckNodeAt(TreeIndex, Gamma, Gamma.VarType, DefaultTypeCheckPolicy);
                if (Node.IsError()) {
                    return Node;
                }
                NodeList.add(Node);
                TreeIndex = TreeIndex + 1;
            }
        } else if (FuncNode.Type.BaseType == Gamma.FuncType) {
            var FuncType = FuncNode.Type;
            LibGreenTea.Assert(LibGreenTea.ListSize(ParsedTree.TreeList) == FuncType.TypeParams.length);
            while (TreeIndex < LibGreenTea.ListSize(ParsedTree.TreeList)) {
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

    GreenTeaGrammar.TypeAnd = function (Gamma, ParsedTree, ContextType) {
        var LeftNode = ParsedTree.TypeCheckNodeAt(LeftHandTerm, Gamma, Gamma.BooleanType, DefaultTypeCheckPolicy);
        var RightNode = ParsedTree.TypeCheckNodeAt(RightHandTerm, Gamma, Gamma.BooleanType, DefaultTypeCheckPolicy);
        return Gamma.Generator.CreateAndNode(Gamma.BooleanType, ParsedTree, LeftNode, RightNode);
    };

    GreenTeaGrammar.TypeOr = function (Gamma, ParsedTree, ContextType) {
        var LeftNode = ParsedTree.TypeCheckNodeAt(LeftHandTerm, Gamma, Gamma.BooleanType, DefaultTypeCheckPolicy);
        var RightNode = ParsedTree.TypeCheckNodeAt(RightHandTerm, Gamma, Gamma.BooleanType, DefaultTypeCheckPolicy);
        return Gamma.Generator.CreateOrNode(Gamma.BooleanType, ParsedTree, LeftNode, RightNode);
    };

    GreenTeaGrammar.TypeInstanceOf = function (Gamma, ParsedTree, ContextType) {
        var LeftNode = ParsedTree.TypeCheckNodeAt(LeftHandTerm, Gamma, Gamma.VarType, DefaultTypeCheckPolicy);
        var GivenType = ParsedTree.GetSyntaxTreeAt(RightHandTerm).GetParsedType();
        if (GivenType != null) {
            return Gamma.CreateSyntaxErrorNode(ParsedTree, "type is expected in" + ParsedTree.KeyToken);
        }
        return Gamma.Generator.CreateInstanceOfNode(Gamma.BooleanType, ParsedTree, LeftNode, GivenType);
    };

    GreenTeaGrammar.TypeAssign = function (Gamma, ParsedTree, ContextType) {
        var LeftNode = ParsedTree.TypeCheckNodeAt(LeftHandTerm, Gamma, Gamma.VarType, DefaultTypeCheckPolicy);

        if (LeftNode instanceof LocalNode || LeftNode instanceof GetterNode || LeftNode instanceof IndexerNode) {
            var RightNode = ParsedTree.TypeCheckNodeAt(RightHandTerm, Gamma, LeftNode.Type, DefaultTypeCheckPolicy);
            return Gamma.Generator.CreateAssignNode(LeftNode.Type, ParsedTree, LeftNode, RightNode);
        }
        return Gamma.CreateSyntaxErrorNode(ParsedTree, "not assigned to a left hand value");
    };

    GreenTeaGrammar.TypeSelfAssign = function (Gamma, ParsedTree, ContextType) {
        var LeftNode = ParsedTree.TypeCheckNodeAt(LeftHandTerm, Gamma, Gamma.VarType, DefaultTypeCheckPolicy);
        if (LeftNode instanceof LocalNode || LeftNode instanceof GetterNode || LeftNode instanceof IndexerNode) {
            var RightNode = ParsedTree.TypeCheckNodeAt(RightHandTerm, Gamma, LeftNode.Type, DefaultTypeCheckPolicy);
            return Gamma.Generator.CreateSelfAssignNode(LeftNode.Type, ParsedTree, LeftNode, RightNode);
        }
        return Gamma.CreateSyntaxErrorNode(ParsedTree, "not assigned to a left hand value");
    };

    GreenTeaGrammar.ParseIncl = function (NameSpace, TokenContext, LeftTree, Pattern) {
        var InclTree = new GtSyntaxTree(Pattern, NameSpace, TokenContext.Next(), null);
        if (LeftTree != null) {
            InclTree.SetSyntaxTreeAt(UnaryTerm, LeftTree);
        } else {
            var Tree = TokenContext.ParsePattern(NameSpace, "$Expression$", Required);
            InclTree.SetSyntaxTreeAt(UnaryTerm, Tree);
        }
        return InclTree;
    };

    GreenTeaGrammar.TypeIncl = function (Gamma, ParsedTree, Type) {
        var LeftNode = ParsedTree.TypeCheckNodeAt(UnaryTerm, Gamma, Gamma.VarType, DefaultTypeCheckPolicy);
        if (LeftNode.Type == Gamma.IntType) {
            if (Type != Gamma.VoidType) {
                Gamma.Context.ReportError(WarningLevel, ParsedTree.KeyToken, "only available as statement: " + ParsedTree.KeyToken);
            }
            if (LeftNode instanceof LocalNode || LeftNode instanceof GetterNode || LeftNode instanceof IndexerNode) {
                var ConstNode = Gamma.Generator.CreateConstNode(LeftNode.Type, ParsedTree, 1);
                return Gamma.Generator.CreateSelfAssignNode(LeftNode.Type, ParsedTree, LeftNode, ConstNode);
            }
            return Gamma.CreateSyntaxErrorNode(ParsedTree, "neither incremental nor decrimental");
        }
        return LeftNode.IsError() ? LeftNode : GreenTeaGrammar.TypeUnary(Gamma, ParsedTree, Type);
    };

    GreenTeaGrammar.ParseEmpty = function (NameSpace, TokenContext, LeftTree, Pattern) {
        return new GtSyntaxTree(Pattern, NameSpace, TokenContext.GetBeforeToken(), null);
    };

    GreenTeaGrammar.TypeEmpty = function (Gamma, ParsedTree, Type) {
        return Gamma.Generator.CreateEmptyNode(Gamma.VoidType);
    };

    GreenTeaGrammar.ParseRequire = function (NameSpace, TokenContext, LeftTree, Pattern) {
        TokenContext.Next();
        while (TokenContext.HasNext()) {
            var Token = TokenContext.Next();
            if (Token.IsIndent() || Token.IsDelim()) {
                break;
            }
            if (Token.IsNameSymbol()) {
                if (!NameSpace.LoadRequiredLib(Token.ParsedText)) {
                    NameSpace.Context.ReportError(ErrorLevel, Token, "no required library: " + Token.ParsedText);
                    TokenContext.StopParsing(true);
                }
            }
            if (TokenContext.MatchToken(",")) {
                continue;
            }
        }
        return GreenTeaGrammar.ParseEmpty(NameSpace, TokenContext, LeftTree, Pattern);
    };

    GreenTeaGrammar.ParseImport = function (NameSpace, TokenContext, LeftTree, Pattern) {
        var ImportTree = new GtSyntaxTree(Pattern, NameSpace, TokenContext.GetMatchedToken("import"), null);
        var Token = TokenContext.Next();
        var PackageName = LibGreenTea.UnquoteString(Token.ParsedText);
        while (TokenContext.HasNext()) {
            Token = TokenContext.Next();
            if (Token.IsNameSymbol() || LibGreenTea.EqualsString(Token.ParsedText, ".")) {
                PackageName += Token.ParsedText;
                continue;
            }
            break;
        }
        ImportTree.ConstValue = PackageName;
        return ImportTree;
    };

    GreenTeaGrammar.TypeImport = function (Gamma, ParsedTree, Type) {
        var Value = Gamma.Generator.ImportNativeObject(Type, ParsedTree.ConstValue);
        if (Value == null) {
            return Gamma.CreateSyntaxErrorNode(ParsedTree, "cannot import: " + ParsedTree.ConstValue);
        }
        return Gamma.Generator.CreateConstNode(Gamma.Context.GuessType(Value), ParsedTree, Value);
    };

    GreenTeaGrammar.ParseBlock = function (ParentNameSpace, TokenContext, LeftTree, Pattern) {
        if (TokenContext.MatchToken("{")) {
            var PrevTree = null;
            var NameSpace = new GtNameSpace(ParentNameSpace.Context, ParentNameSpace);
            while (TokenContext.HasNext()) {
                TokenContext.SkipEmptyStatement();
                if (TokenContext.MatchToken("}")) {
                    break;
                }
                var Annotation = TokenContext.SkipAndGetAnnotation(true);
                var ParsedTree = ParseExpression(NameSpace, TokenContext, false);
                if (IsEmptyOrError(ParsedTree)) {
                    return ParsedTree;
                }
                ParsedTree.SetAnnotation(Annotation);

                if (ParsedTree.PrevTree != null) {
                    ParsedTree = TreeHead(ParsedTree);
                }
                PrevTree = LinkTree(PrevTree, ParsedTree);
                TokenContext.SkipIncompleteStatement();
            }
            if (PrevTree == null) {
                return TokenContext.ParsePattern(NameSpace, "$Empty$", Required);
            }
            return TreeHead(PrevTree);
        }
        return null;
    };

    GreenTeaGrammar.ParseStatement = function (NameSpace, TokenContext, LeftTree, Pattern) {
        var StmtTree = TokenContext.ParsePattern(NameSpace, "$Block$", Optional);
        if (StmtTree == null) {
            StmtTree = ParseExpression(NameSpace, TokenContext, false);
        }
        if (StmtTree == null) {
            StmtTree = TokenContext.ParsePattern(NameSpace, "$Empty$", Required);
        }
        return StmtTree;
    };

    GreenTeaGrammar.ParseIf = // If Statement
    function (NameSpace, TokenContext, LeftTree, Pattern) {
        var Token = TokenContext.GetMatchedToken("if");
        var NewTree = new GtSyntaxTree(Pattern, NameSpace, Token, null);
        NewTree.SetMatchedTokenAt(NoWhere, NameSpace, TokenContext, "(", Required);
        var ParseFlag = TokenContext.ParseFlag;
        TokenContext.ParseFlag |= SkipIndentParseFlag;
        NewTree.SetMatchedPatternAt(IfCond, NameSpace, TokenContext, "$Expression$", Required);
        NewTree.SetMatchedTokenAt(NoWhere, NameSpace, TokenContext, ")", Required);
        TokenContext.ParseFlag = ParseFlag;
        TokenContext.SkipIndent();
        NewTree.SetMatchedPatternAt(IfThen, NameSpace, TokenContext, "$Statement$", Required);
        if (TokenContext.MatchIndentToken("else")) {
            TokenContext.SkipIndent();
            NewTree.SetMatchedPatternAt(IfElse, NameSpace, TokenContext, "$Statement$", Required);
        }
        return NewTree;
    };

    GreenTeaGrammar.TypeIf = function (Gamma, ParsedTree, ContextType) {
        var CondNode = ParsedTree.TypeCheckNodeAt(IfCond, Gamma, Gamma.BooleanType, DefaultTypeCheckPolicy);
        var ThenNode = ParsedTree.TypeCheckNodeAt(IfThen, Gamma, Gamma.VoidType, DefaultTypeCheckPolicy);
        var ElseNode = ParsedTree.TypeCheckNodeAt(IfElse, Gamma, Gamma.VoidType, DefaultTypeCheckPolicy);
        return Gamma.Generator.CreateIfNode(ThenNode.Type, ParsedTree, CondNode, ThenNode, ElseNode);
    };

    GreenTeaGrammar.ParseWhile = // While Statement
    function (NameSpace, TokenContext, LeftTree, Pattern) {
        var WhileTree = new GtSyntaxTree(Pattern, NameSpace, TokenContext.GetMatchedToken("while"), null);
        WhileTree.SetMatchedTokenAt(NoWhere, NameSpace, TokenContext, "(", Required);
        WhileTree.SetMatchedPatternAt(WhileCond, NameSpace, TokenContext, "$Expression$", Required);
        WhileTree.SetMatchedTokenAt(NoWhere, NameSpace, TokenContext, ")", Required);
        WhileTree.SetMatchedPatternAt(WhileBody, NameSpace, TokenContext, "$Statement$", Required);
        return WhileTree;
    };

    GreenTeaGrammar.TypeWhile = function (Gamma, ParsedTree, ContextType) {
        var CondNode = ParsedTree.TypeCheckNodeAt(WhileCond, Gamma, Gamma.BooleanType, DefaultTypeCheckPolicy);
        var BodyNode = ParsedTree.TypeCheckNodeAt(WhileBody, Gamma, Gamma.VoidType, DefaultTypeCheckPolicy);
        return Gamma.Generator.CreateWhileNode(BodyNode.Type, ParsedTree, CondNode, BodyNode);
    };

    GreenTeaGrammar.ParseDoWhile = // DoWhile Statement
    function (NameSpace, TokenContext, LeftTree, Pattern) {
        var Tree = new GtSyntaxTree(Pattern, NameSpace, TokenContext.GetMatchedToken("do"), null);
        Tree.SetMatchedPatternAt(WhileBody, NameSpace, TokenContext, "$Statement$", Required);
        Tree.SetMatchedTokenAt(NoWhere, NameSpace, TokenContext, "while", Required);
        Tree.SetMatchedTokenAt(NoWhere, NameSpace, TokenContext, "(", Required);
        Tree.SetMatchedPatternAt(WhileCond, NameSpace, TokenContext, "$Expression$", Required);
        Tree.SetMatchedTokenAt(NoWhere, NameSpace, TokenContext, ")", Required);
        return Tree;
    };

    GreenTeaGrammar.TypeDoWhile = function (Gamma, ParsedTree, ContextType) {
        var CondNode = ParsedTree.TypeCheckNodeAt(WhileCond, Gamma, Gamma.BooleanType, DefaultTypeCheckPolicy);
        var BodyNode = ParsedTree.TypeCheckNodeAt(WhileBody, Gamma, Gamma.VoidType, DefaultTypeCheckPolicy);
        return Gamma.Generator.CreateDoWhileNode(BodyNode.Type, ParsedTree, CondNode, BodyNode);
    };

    GreenTeaGrammar.ParseFor = // For Statement
    function (NameSpace, TokenContext, LeftTree, Pattern) {
        var Tree = new GtSyntaxTree(Pattern, NameSpace, TokenContext.GetMatchedToken("for"), null);
        Tree.SetMatchedTokenAt(NoWhere, NameSpace, TokenContext, "(", Required);
        Tree.SetMatchedPatternAt(ForInit, NameSpace, TokenContext, "$Expression$", Optional);
        Tree.SetMatchedTokenAt(NoWhere, NameSpace, TokenContext, ";", Required);
        Tree.SetMatchedPatternAt(ForCond, NameSpace, TokenContext, "$Expression$", Optional);
        Tree.SetMatchedTokenAt(NoWhere, NameSpace, TokenContext, ";", Required);
        Tree.SetMatchedPatternAt(ForIteration, NameSpace, TokenContext, "$Expression$", Optional);
        Tree.SetMatchedTokenAt(NoWhere, NameSpace, TokenContext, ")", Required);
        Tree.SetMatchedPatternAt(ForBody, NameSpace, TokenContext, "$Statement$", Required);
        return Tree;
    };

    GreenTeaGrammar.TypeFor = function (Gamma, ParsedTree, ContextType) {
        var InitNode = null;
        var CondNode = null;
        var IterNode = null;
        if (ParsedTree.HasNodeAt(ForInit)) {
            InitNode = ParsedTree.TypeCheckNodeAt(ForInit, Gamma, Gamma.VarType, DefaultTypeCheckPolicy);
        }
        if (ParsedTree.HasNodeAt(ForCond)) {
            CondNode = ParsedTree.TypeCheckNodeAt(ForCond, Gamma, Gamma.BooleanType, DefaultTypeCheckPolicy);
        }
        if (ParsedTree.HasNodeAt(ForIteration)) {
            IterNode = ParsedTree.TypeCheckNodeAt(ForIteration, Gamma, Gamma.VarType, DefaultTypeCheckPolicy);
        }
        var BodyNode = ParsedTree.TypeCheckNodeAt(ForBody, Gamma, Gamma.VoidType, DefaultTypeCheckPolicy);
        var ForNode = Gamma.Generator.CreateForNode(BodyNode.Type, ParsedTree, CondNode, IterNode, BodyNode);
        if (InitNode != null) {
            if (InitNode instanceof VarNode) {
                (InitNode).BlockNode = ForNode;
            } else {
                InitNode = LinkNode(InitNode, ForNode);
            }
            return InitNode;
        }
        return ForNode;
    };

    GreenTeaGrammar.ParseBreak = // Break/Continue Statement
    function (NameSpace, TokenContext, LeftTree, Pattern) {
        var Token = TokenContext.GetMatchedToken("break");
        var NewTree = new GtSyntaxTree(Pattern, NameSpace, Token, null);
        return NewTree;
    };

    GreenTeaGrammar.TypeBreak = function (Gamma, ParsedTree, ContextType) {
        return Gamma.Generator.CreateBreakNode(Gamma.VoidType, ParsedTree, "");
    };

    GreenTeaGrammar.ParseContinue = function (NameSpace, TokenContext, LeftTree, Pattern) {
        var Token = TokenContext.GetMatchedToken("continue");
        var NewTree = new GtSyntaxTree(Pattern, NameSpace, Token, null);
        return NewTree;
    };

    GreenTeaGrammar.TypeContinue = function (Gamma, ParsedTree, ContextType) {
        return Gamma.Generator.CreateContinueNode(Gamma.VoidType, ParsedTree, "");
    };

    GreenTeaGrammar.ParseReturn = // Return Statement
    function (NameSpace, TokenContext, LeftTree, Pattern) {
        var ReturnTree = new GtSyntaxTree(Pattern, NameSpace, TokenContext.GetMatchedToken("return"), null);
        ReturnTree.SetMatchedPatternAt(ReturnExpr, NameSpace, TokenContext, "$Expression$", Optional);
        return ReturnTree;
    };

    GreenTeaGrammar.TypeReturn = function (Gamma, ParsedTree, ContextType) {
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

    GreenTeaGrammar.ParseTry = // try
    function (NameSpace, TokenContext, LeftTree, Pattern) {
        var TryTree = new GtSyntaxTree(Pattern, NameSpace, TokenContext.GetMatchedToken("try"), null);
        TryTree.SetMatchedPatternAt(TryBody, NameSpace, TokenContext, "$Block$", Required);
        var ParseFlag = TokenContext.ParseFlag;
        TokenContext.ParseFlag |= SkipIndentParseFlag;
        if (TokenContext.MatchToken("catch")) {
            TryTree.SetMatchedTokenAt(NoWhere, NameSpace, TokenContext, "(", Required);
            TryTree.SetMatchedPatternAt(CatchVariable, NameSpace, TokenContext, "$VarDecl$", Required);
            TryTree.SetMatchedTokenAt(NoWhere, NameSpace, TokenContext, ")", Required);
            TryTree.SetMatchedPatternAt(CatchBody, NameSpace, TokenContext, "$Block$", Required);
        }
        if (TokenContext.MatchToken("finally")) {
            TryTree.SetMatchedPatternAt(FinallyBody, NameSpace, TokenContext, "$Block$", Required);
        }
        TokenContext.ParseFlag = ParseFlag;
        return TryTree;
    };

    GreenTeaGrammar.TypeTry = function (Gamma, ParsedTree, ContextType) {
        var TryNode = ParsedTree.TypeCheckNodeAt(TryBody, Gamma, Gamma.VoidType, DefaultTypeCheckPolicy);
        var CatchExpr = ParsedTree.TypeCheckNodeAt(CatchVariable, Gamma, Gamma.VarType, DefaultTypeCheckPolicy);
        var CatchNode = ParsedTree.TypeCheckNodeAt(CatchBody, Gamma, Gamma.VoidType, DefaultTypeCheckPolicy);
        var FinallyNode = ParsedTree.TypeCheckNodeAt(FinallyBody, Gamma, Gamma.VoidType, DefaultTypeCheckPolicy);
        return Gamma.Generator.CreateTryNode(TryNode.Type, ParsedTree, TryNode, CatchExpr, CatchNode, FinallyNode);
    };

    GreenTeaGrammar.ParseThrow = // throw $Expr$
    function (NameSpace, TokenContext, LeftTree, Pattern) {
        var ThrowTree = new GtSyntaxTree(Pattern, NameSpace, TokenContext.GetMatchedToken("throw"), null);
        ThrowTree.SetMatchedPatternAt(ReturnExpr, NameSpace, TokenContext, "$Expression$", Required);
        return ThrowTree;
    };

    GreenTeaGrammar.TypeThrow = function (Gamma, ParsedTree, ContextType) {
        var FaultType = ContextType;
        var ExprNode = ParsedTree.TypeCheckNodeAt(ReturnExpr, Gamma, FaultType, DefaultTypeCheckPolicy);
        return Gamma.Generator.CreateThrowNode(ExprNode.Type, ParsedTree, ExprNode);
    };

    GreenTeaGrammar.ParseThis = function (NameSpace, TokenContext, LeftTree, Pattern) {
        var Token = TokenContext.GetMatchedToken("this");
        var Tree = new GtSyntaxTree(Pattern, NameSpace, Token, null);
        return Tree;
    };

    GreenTeaGrammar.TypeThis = function (Gamma, ParsedTree, ContextType) {
        return Gamma.CreateLocalNode(ParsedTree, Gamma.Generator.GetRecvName());
    };

    GreenTeaGrammar.ParseSuper = function (NameSpace, TokenContext, LeftTree, Pattern) {
        var Token = TokenContext.GetMatchedToken("super");
        var Tree = new GtSyntaxTree(Pattern, NameSpace, Token, null);
        var ParseFlag = TokenContext.ParseFlag;
        TokenContext.ParseFlag |= SkipIndentParseFlag;
        Tree.SetSyntaxTreeAt(CallExpressionIndex, new GtSyntaxTree(NameSpace.GetPattern("$Variable$"), NameSpace, Token, null));
        Tree.SetSyntaxTreeAt(CallParameterIndex, new GtSyntaxTree(NameSpace.GetPattern("this"), NameSpace, new GtToken("this", 0), null));
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
            // translate '$super$(this, $Params$)' => 'super(this, $Params$)'
            Tree.Pattern = NameSpace.GetExtendedPattern("(");
            return Tree;
        }
        return Tree;
    };

    GreenTeaGrammar.ParseNew = // new $Type ( $Expr$ [, $Expr$] )
    function (NameSpace, TokenContext, LeftTree, Pattern) {
        var NewTree = new GtSyntaxTree(Pattern, NameSpace, TokenContext.GetMatchedToken("new"), null);
        var ParseFlag = TokenContext.ParseFlag;
        TokenContext.ParseFlag |= SkipIndentParseFlag;
        NewTree.SetMatchedPatternAt(CallExpressionIndex, NameSpace, TokenContext, "$Type$", Required);
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

    GreenTeaGrammar.ParseEnum = // switch
    function (NameSpace, TokenContext, LeftTree, Pattern) {
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
            if (LibGreenTea.IsVariableName(Token.ParsedText, 0)) {
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

    GreenTeaGrammar.TypeEnum = function (Gamma, ParsedTree, ContextType) {
        var EnumType = ParsedTree.ConstValue;
        return Gamma.Generator.CreateConstNode(Gamma.Context.GuessType(EnumType), ParsedTree, EnumType);
    };

    GreenTeaGrammar.ParseCaseBlock = function (ParentNameSpace, TokenContext, LeftTree, Pattern) {
        var PrevTree = null;
        var NameSpace = new GtNameSpace(ParentNameSpace.Context, ParentNameSpace);
        var IsCaseBlock = TokenContext.MatchToken("{");
        while (TokenContext.HasNext()) {
            TokenContext.SkipEmptyStatement();
            if (TokenContext.MatchToken("case")) {
                TokenContext.CurrentPosition -= 1;
                break;
            }
            if (TokenContext.MatchToken("default")) {
                TokenContext.CurrentPosition -= 1;
                break;
            }
            if (TokenContext.MatchToken("}")) {
                if (!IsCaseBlock) {
                    TokenContext.CurrentPosition -= 1;
                }
                break;
            }
            var Annotation = TokenContext.SkipAndGetAnnotation(true);
            var CurrentTree = ParseExpression(NameSpace, TokenContext, false);
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
    };

    GreenTeaGrammar.ParseSwitch = function (NameSpace, TokenContext, LeftTree, Pattern) {
        var SwitchTree = new GtSyntaxTree(Pattern, NameSpace, TokenContext.GetMatchedToken("switch"), null);
        SwitchTree.SetMatchedTokenAt(NoWhere, NameSpace, TokenContext, "(", Required);
        SwitchTree.SetMatchedPatternAt(SwitchCaseCondExpr, NameSpace, TokenContext, "$Expression$", Required);
        SwitchTree.SetMatchedTokenAt(NoWhere, NameSpace, TokenContext, ")", Required);
        SwitchTree.SetMatchedTokenAt(NoWhere, NameSpace, TokenContext, "{", Required);
        var ParseFlag = TokenContext.ParseFlag;
        TokenContext.ParseFlag |= SkipIndentParseFlag;

        var CaseIndex = SwitchCaseCaseIndex;
        while (!SwitchTree.IsEmptyOrError() && !TokenContext.MatchToken("}")) {
            if (TokenContext.MatchToken("case")) {
                SwitchTree.SetMatchedPatternAt(CaseIndex, NameSpace, TokenContext, "$Expression$", Required);
                SwitchTree.SetMatchedTokenAt(NoWhere, NameSpace, TokenContext, ":", Required);
                SwitchTree.SetMatchedPatternAt(CaseIndex + 1, NameSpace, TokenContext, "$CaseBlock$", Required);
                CaseIndex += 2;
                continue;
            }
            if (TokenContext.MatchToken("default")) {
                SwitchTree.SetMatchedTokenAt(NoWhere, NameSpace, TokenContext, ":", Required);
                SwitchTree.SetMatchedPatternAt(SwitchCaseDefaultBlock, NameSpace, TokenContext, "$CaseBlock$", Required);
            }
        }
        TokenContext.ParseFlag = ParseFlag;
        return SwitchTree;
    };

    GreenTeaGrammar.TypeSwitch = function (Gamma, ParsedTree, ContextType) {
        var CondNode = ParsedTree.TypeCheckNodeAt(IfCond, Gamma, Gamma.VarType, DefaultTypeCheckPolicy);
        var DefaultNode = null;
        if (ParsedTree.HasNodeAt(SwitchCaseDefaultBlock)) {
            DefaultNode = ParsedTree.TypeCheckNodeAt(SwitchCaseDefaultBlock, Gamma, Gamma.VoidType, DefaultTypeCheckPolicy);
        }
        var Node = Gamma.Generator.CreateSwitchNode(Gamma.VoidType, ParsedTree, CondNode, DefaultNode);
        var CaseIndex = SwitchCaseCaseIndex;
        while (CaseIndex < ParsedTree.TreeList.size()) {
            var CaseExpr = ParsedTree.TypeCheckNodeAt(CaseIndex, Gamma, CondNode.Type, DefaultTypeCheckPolicy);
            var CaseBlock = null;
            if (ParsedTree.HasNodeAt(CaseIndex + 1)) {
                CaseBlock = ParsedTree.TypeCheckNodeAt(CaseIndex + 1, Gamma, Gamma.VoidType, DefaultTypeCheckPolicy);
            }
            Node.Append(CaseExpr);
            Node.Append(CaseBlock);
            CaseIndex += 2;
        }
        return Node;
    };

    GreenTeaGrammar.ParseSymbolDecl = // const decl
    function (NameSpace, TokenContext, LeftTree, Pattern) {
        var SymbolDeclTree = new GtSyntaxTree(Pattern, NameSpace, TokenContext.Next(), null);
        var ClassNameTree = TokenContext.ParsePattern(NameSpace, "$Type$", Optional);
        var ConstClass = null;
        if (ClassNameTree != null) {
            SymbolDeclTree.SetMatchedTokenAt(NoWhere, NameSpace, TokenContext, ".", Required);
            if (!SymbolDeclTree.IsEmptyOrError()) {
                SymbolDeclTree.SetSyntaxTreeAt(SymbolDeclClassIndex, ClassNameTree);
                ConstClass = ClassNameTree.GetParsedType();
            }
        }
        SymbolDeclTree.SetMatchedPatternAt(SymbolDeclNameIndex, NameSpace, TokenContext, "$Variable$", Required);
        SymbolDeclTree.SetMatchedTokenAt(NoWhere, NameSpace, TokenContext, "=", Required);
        SymbolDeclTree.SetMatchedPatternAt(SymbolDeclValueIndex, NameSpace, TokenContext, "$Expression$", Required);

        if (!SymbolDeclTree.IsEmptyOrError()) {
            var ConstName = SymbolDeclTree.GetSyntaxTreeAt(SymbolDeclNameIndex).KeyToken.ParsedText;
            if (ConstClass != null) {
                ConstName = ClassSymbol(ConstClass, ConstName);
            }
            var ConstValue = null;
            if (SymbolDeclTree.GetSyntaxTreeAt(SymbolDeclValueIndex).Pattern.EqualsName("$Const$")) {
                ConstValue = SymbolDeclTree.GetSyntaxTreeAt(SymbolDeclValueIndex).ConstValue;
            }
            if (ConstValue == null) {
                var Gamma = new GtTypeEnv(NameSpace);
                var Node = SymbolDeclTree.TypeCheckNodeAt(SymbolDeclValueIndex, Gamma, Gamma.VarType, OnlyConstPolicy);
                if (Node.IsError()) {
                    SymbolDeclTree.ToError(Node.Token);
                    return SymbolDeclTree;
                }
                ConstValue = Node.ToConstValue(true);
            }
            if (NameSpace.GetSymbol(ConstName) != null) {
                NameSpace.ReportOverrideName(SymbolDeclTree.KeyToken, ConstClass, ConstName);
            }
            NameSpace.SetSymbol(ConstName, ConstValue);
        }
        return SymbolDeclTree;
    };

    GreenTeaGrammar.TypeSymbolDecl = function (Gamma, ParsedTree, ContextType) {
        return Gamma.Generator.CreateEmptyNode(ContextType);
    };

    GreenTeaGrammar.ParseFuncName = // FuncDecl
    function (NameSpace, TokenContext, LeftTree, Pattern) {
        var Token = TokenContext.Next();
        if (Token != GtTokenContext.NullToken) {
            var ch = LibGreenTea.CharAt(Token.ParsedText, 0);
            if (ch != 46) {
                return new GtSyntaxTree(Pattern, NameSpace, Token, Token.ParsedText);
            }
        }
        return null;
    };

    GreenTeaGrammar.ParseFuncParam = function (NameSpace, TokenContext, FuncDeclTree) {
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
    };

    GreenTeaGrammar.ParseFuncBody = function (NameSpace, TokenContext, FuncDeclTree) {
        TokenContext.SkipIndent();
        if (TokenContext.MatchToken("as")) {
            var Token = TokenContext.Next();
            FuncDeclTree.ConstValue = LibGreenTea.UnquoteString(Token.ParsedText);
        } else if (TokenContext.PeekToken("import")) {
            FuncDeclTree.SetMatchedPatternAt(FuncDeclBlock, NameSpace, TokenContext, "import", Required);
        } else {
            FuncDeclTree.SetMatchedPatternAt(FuncDeclBlock, NameSpace, TokenContext, "$Block$", Optional);
            if (!FuncDeclTree.IsEmptyOrError() && FuncDeclTree.HasNodeAt(FuncDeclBlock)) {
                var ReturnTree = new GtSyntaxTree(NameSpace.GetPattern("return"), NameSpace, GtTokenContext.NullToken, null);
                LinkTree(TreeTail(FuncDeclTree.GetSyntaxTreeAt(FuncDeclBlock)), ReturnTree);
            }
        }
    };

    GreenTeaGrammar.ParseFunction = function (NameSpace, TokenContext, LeftTree, Pattern) {
        var FuncDeclTree = new GtSyntaxTree(Pattern, NameSpace, TokenContext.GetToken(), null);
        FuncDeclTree.SetMatchedPatternAt(FuncDeclName, NameSpace, TokenContext, "$FuncName$", Optional);
        if (FuncDeclTree.HasNodeAt(FuncDeclName)) {
            //NameSpace = ParseFuncGenericParam(NameSpace, TokenContext, FuncDeclTree);
        }
        FuncDeclTree.SetMatchedTokenAt(NoWhere, NameSpace, TokenContext, "(", Required);
        GreenTeaGrammar.ParseFuncParam(NameSpace, TokenContext, FuncDeclTree);
        if (!FuncDeclTree.IsEmptyOrError() && TokenContext.MatchToken(":")) {
            FuncDeclTree.SetMatchedPatternAt(FuncDeclReturnType, NameSpace, TokenContext, "$Type$", Required);
        }
        GreenTeaGrammar.ParseFuncBody(NameSpace, TokenContext, FuncDeclTree);
        return FuncDeclTree;
    };

    GreenTeaGrammar.ParseFuncDecl = function (NameSpace, TokenContext, LeftTree, Pattern) {
        var FuncDeclTree = new GtSyntaxTree(Pattern, NameSpace, TokenContext.GetToken(), null);
        if (LeftTree == null) {
            FuncDeclTree.SetMatchedPatternAt(FuncDeclReturnType, NameSpace, TokenContext, "$Type$", Required);
        } else {
            FuncDeclTree.SetSyntaxTreeAt(FuncDeclReturnType, LeftTree);
        }
        FuncDeclTree.SetMatchedPatternAt(FuncDeclName, NameSpace, TokenContext, "$FuncName$", Required);
        FuncDeclTree.SetMatchedTokenAt(NoWhere, NameSpace, TokenContext, "(", Required);
        var ParseFlag = TokenContext.SetBackTrack(false);
        GreenTeaGrammar.ParseFuncParam(NameSpace, TokenContext, FuncDeclTree);
        GreenTeaGrammar.ParseFuncBody(NameSpace, TokenContext, FuncDeclTree);
        TokenContext.SetRememberFlag(ParseFlag);
        return FuncDeclTree;
    };

    GreenTeaGrammar.TypeFuncDecl = function (Gamma, ParsedTree, ContextType) {
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
            Gamma.AppendDeclaredVariable(0, ParamType, ParamName, null, null);
            TreeIndex += 3;
        }
        var DefinedFunc = null;
        if (FuncName.equals("converter")) {
            DefinedFunc = GreenTeaGrammar.CreateCoercionFunc(Gamma, ParsedTree, FuncFlag, 0, TypeList);
        } else {
            DefinedFunc = GreenTeaGrammar.CreateFunc(Gamma, ParsedTree, FuncFlag, FuncName, 0, TypeList);
        }
        if ((typeof ParsedTree.ConstValue == 'string' || ParsedTree.ConstValue instanceof String)) {
            DefinedFunc.SetNativeMacro(ParsedTree.ConstValue);
        } else if (ParsedTree.HasNodeAt(FuncDeclBlock)) {
            var ImportTree = ParsedTree.GetSyntaxTreeAt(FuncDeclBlock);
            if (ImportTree.Pattern.EqualsName("import")) {
                if (!LibGreenTea.ImportNativeMethod(DefinedFunc, ImportTree.ConstValue)) {
                    Gamma.Context.ReportError(WarningLevel, ImportTree.KeyToken, "cannot import: " + ImportTree.ConstValue);
                }
            } else {
                Gamma.Func = DefinedFunc;
                var BodyNode = ParsedTree.TypeCheckNodeAt(FuncDeclBlock, Gamma, Gamma.VoidType, BlockPolicy);
                Gamma.Generator.GenerateFunc(DefinedFunc, ParamNameList, BodyNode);
            }
            if (FuncName.equals("main")) {
                Gamma.Generator.InvokeMainFunc(DefinedFunc.GetNativeFuncName());
            }
        }
        return Gamma.Generator.CreateEmptyNode(Gamma.VoidType);
    };

    GreenTeaGrammar.CreateCoercionFunc = function (Gamma, ParsedTree, FuncFlag, BaseIndex, TypeList) {
        var ToType = TypeList.get(0);
        var FromType = TypeList.get(1);
        var DefinedFunc = ParsedTree.NameSpace.GetCoercionFunc(FromType, ToType, false);
        if (DefinedFunc != null) {
            Gamma.Context.ReportError(WarningLevel, ParsedTree.KeyToken, "already defined: " + FromType + " to " + ToType);
        }
        DefinedFunc = Gamma.Generator.CreateFunc(FuncFlag, "to" + ToType.ShortClassName, BaseIndex, TypeList);
        ParsedTree.NameSpace.SetCoercionFunc(FromType, ToType, DefinedFunc);
        return DefinedFunc;
    };

    GreenTeaGrammar.CreateFunc = function (Gamma, ParsedTree, FuncFlag, FuncName, BaseIndex, TypeList) {
        var RecvType = (TypeList.size() > 1) ? TypeList.get(1) : Gamma.VoidType;
        var DefinedFunc = ParsedTree.NameSpace.GetFuncParam(FuncName, 0, LibGreenTea.CompactTypeList(BaseIndex, TypeList));
        if (DefinedFunc != null && DefinedFunc.IsAbstract()) {
            return DefinedFunc;
        }
        if (DefinedFunc == null) {
            DefinedFunc = Gamma.Generator.CreateFunc(FuncFlag, FuncName, BaseIndex, TypeList);
        }
        if (FuncName.equals("constructor")) {
            ParsedTree.NameSpace.AppendConstructor(RecvType, DefinedFunc);
        } else {
            if (LibGreenTea.IsLetter(DefinedFunc.FuncName, 0)) {
                ParsedTree.NameSpace.AppendFunc(DefinedFunc);
            }
            if (RecvType != Gamma.VoidType) {
                ParsedTree.NameSpace.AppendMethod(RecvType, DefinedFunc);
            }
        }
        return DefinedFunc;
    };

    GreenTeaGrammar.ParseArray = function (NameSpace, TokenContext, LeftTree, Pattern) {
        var OldFlag = TokenContext.SetSkipIndent(true);
        var ArrayTree = new GtSyntaxTree(Pattern, NameSpace, TokenContext.GetMatchedToken("["), null);

        while (TokenContext.HasNext() && !ArrayTree.IsEmptyOrError()) {
            if (TokenContext.MatchToken("]")) {
                break;
            }
            if (TokenContext.MatchToken(",")) {
                continue;
            }
            var Tree = TokenContext.ParsePattern(NameSpace, "$Expression$", Required);
            ArrayTree.AppendParsedTree(Tree);
        }
        TokenContext.SetRememberFlag(OldFlag);
        return ArrayTree;
    };

    GreenTeaGrammar.TypeArray = function (Gamma, ParsedTree, ContextType) {
        var ArrayNode = Gamma.Generator.CreateArrayNode(Gamma.ArrayType, ParsedTree);
        var ElemType = Gamma.VarType;
        if (ContextType.IsArrayType()) {
            ElemType = ContextType.TypeParams[0];
            ArrayNode.Type = ContextType;
        }
        var i = 0;
        while (i < LibGreenTea.ListSize(ParsedTree.TreeList)) {
            var Node = ParsedTree.TypeCheckNodeAt(i, Gamma, ElemType, DefaultTypeCheckPolicy);
            if (Node.IsError()) {
                return Node;
            }
            if (ElemType.IsVarType()) {
                ElemType = Node.Type;
                ArrayNode.Type = Gamma.Context.GetGenericType1(Gamma.ArrayType, ElemType, true);
            }
            i = i + 1;
        }
        return ArrayNode;
    };

    GreenTeaGrammar.ParseIndexer = function (NameSpace, TokenContext, LeftTree, Pattern) {
        var ArrayTree = new GtSyntaxTree(Pattern, NameSpace, TokenContext.GetMatchedToken("["), null);
        ArrayTree.AppendParsedTree(LeftTree);
        var OldFlag = TokenContext.SetSkipIndent(true);
        do {
            var Tree = TokenContext.ParsePattern(NameSpace, "$Expression$", Required);
            ArrayTree.AppendParsedTree(Tree);
        } while(!ArrayTree.IsEmptyOrError() && TokenContext.MatchToken(","));
        ArrayTree.SetMatchedTokenAt(NoWhere, NameSpace, TokenContext, "]", Required);
        TokenContext.SetRememberFlag(OldFlag);
        return ArrayTree;
    };

    GreenTeaGrammar.TypeIndexer = function (Gamma, ParsedTree, Type) {
        var ExprNode = ParsedTree.TypeCheckNodeAt(LeftHandTerm, Gamma, Gamma.ArrayType, DefaultTypeCheckPolicy);
        if (ExprNode.IsError()) {
            return ExprNode;
        }
        var ResolvedFunc = null;
        var PolyFunc = ParsedTree.NameSpace.GetMethod(ExprNode.Type, "get", true);
        var ParamList = new Array();
        ParamList.add(ExprNode);
        if (PolyFunc != null) {
            ResolvedFunc = PolyFunc.ResolveFunc(Gamma, ParsedTree, 1, ParamList);
            if (ResolvedFunc != null) {
                Type = ResolvedFunc.GetReturnType();
            }
        }
        var Node = Gamma.Generator.CreateIndexerNode(Type, ParsedTree, ResolvedFunc, ExprNode);
        Node.AppendNodeList(ParamList);
        return Node;
    };

    GreenTeaGrammar.ParseSize = function (NameSpace, TokenContext, LeftTree, Pattern) {
        var ArrayTree = new GtSyntaxTree(Pattern, NameSpace, TokenContext.GetMatchedToken("|"), null);
        var SubTree = ParseExpression(NameSpace, TokenContext, true);
        ArrayTree.SetSyntaxTreeAt(UnaryTerm, SubTree);
        ArrayTree.SetMatchedTokenAt(NoWhere, NameSpace, TokenContext, "|", Required);
        return ArrayTree;
    };

    GreenTeaGrammar.TypeSize = function (Gamma, ParsedTree, Type) {
        var ExprNode = ParsedTree.TypeCheckNodeAt(UnaryTerm, Gamma, Gamma.VarType, DefaultTypeCheckPolicy);
        if (ExprNode.IsError()) {
            return ExprNode;
        }
        if (!(ExprNode.Type.Accept(Gamma.ArrayType) || ExprNode.Type.Accept(Gamma.StringType))) {
            return Gamma.CreateSyntaxErrorNode(ParsedTree, ExprNode.Type + " has no sizeof operator");
        }
        var PolyFunc = Gamma.NameSpace.GetMethod(ExprNode.Type, "length", true);
        var NodeList = new Array();
        var Func = PolyFunc.ResolveFunc(Gamma, ParsedTree, 1, NodeList);
        var Node = Gamma.Generator.CreateApplyNode(Type, ParsedTree, Func);
        Node.Append(ExprNode);
        return Node;
    };

    GreenTeaGrammar.ParseSlice = function (NameSpace, TokenContext, LeftTree, Pattern) {
        var ArrayTree = new GtSyntaxTree(Pattern, NameSpace, TokenContext.GetMatchedToken("["), null);
        ArrayTree.AppendParsedTree(LeftTree);
        var Tree = TokenContext.ParsePattern(NameSpace, "$Expression$", Optional);
        if (Tree == null) {
            ArrayTree.AppendParsedTree(GreenTeaGrammar.ParseEmpty(NameSpace, TokenContext, LeftTree, Pattern));
        } else {
            ArrayTree.AppendParsedTree(Tree);
        }
        ArrayTree.SetMatchedTokenAt(NoWhere, NameSpace, TokenContext, ":", Required);
        Tree = TokenContext.ParsePattern(NameSpace, "$Expression$", Optional);
        if (Tree != null) {
            ArrayTree.AppendParsedTree(Tree);
        }
        ArrayTree.SetMatchedTokenAt(NoWhere, NameSpace, TokenContext, "]", Required);
        return ArrayTree;
    };

    GreenTeaGrammar.TypeSlice = function (Gamma, ParsedTree, ContextType) {
        return null;
    };

    GreenTeaGrammar.ParseClassDecl = // ClassDecl
    function (NameSpace0, TokenContext, LeftTree, Pattern) {
        var ClassDeclTree = new GtSyntaxTree(Pattern, NameSpace0, TokenContext.GetMatchedToken("class"), null);
        ClassDeclTree.SetMatchedPatternAt(ClassDeclName, NameSpace0, TokenContext, "$FuncName$", Required);
        if (TokenContext.MatchToken("extends")) {
            ClassDeclTree.SetMatchedPatternAt(ClassDeclSuperType, NameSpace0, TokenContext, "$Type$", Required);
        }
        if (ClassDeclTree.IsEmptyOrError()) {
            return ClassDeclTree;
        }

        // define new class
        var ClassNameSpace = new GtNameSpace(NameSpace0.Context, NameSpace0);
        var ClassNameTree = ClassDeclTree.GetSyntaxTreeAt(ClassDeclName);
        var ClassName = ClassNameTree.KeyToken.ParsedText;
        var SuperType = NameSpace0.Context.StructType;
        if (ClassDeclTree.HasNodeAt(ClassDeclSuperType)) {
            SuperType = ClassDeclTree.GetSyntaxTreeAt(ClassDeclSuperType).GetParsedType();
        }
        var ClassFlag = 0;
        var NewType = SuperType.CreateSubType(ClassFlag, ClassName, null, null);

        // FIXME: Obviously strange
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
            if (FieldTree.Pattern.EqualsName("$VarDecl$")) {
                VarDeclList.add(FieldTree);
            } else if (FieldTree.Pattern.EqualsName("$FuncDecl$")) {
                ConstructorList.add(FieldTree);
            } else if (FieldTree.Pattern.EqualsName("$Constructor$")) {
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

    GreenTeaGrammar.TypeClassDecl = function (Gamma, ParsedTree, ContextType) {
        var DefinedType = ParsedTree.GetParsedType();
        var TreeIndex = ClassDeclFieldStartIndex;
        var ClassField = new GtClassField(DefinedType.SuperType);
        while (TreeIndex < ParsedTree.TreeList.size()) {
            var FieldTree = ParsedTree.GetSyntaxTreeAt(TreeIndex);
            if (!FieldTree.Pattern.EqualsName("$VarDecl$")) {
                break;
            }
            var FieldNode = ParsedTree.TypeCheckNodeAt(TreeIndex, Gamma, Gamma.VarType, DefaultTypeCheckPolicy);
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
            if (!FieldTree.Pattern.EqualsName("$FuncDecl$")) {
                break;
            }
            ParsedTree.TypeCheckNodeAt(TreeIndex, Gamma, Gamma.VarType, DefaultTypeCheckPolicy);
            TreeIndex += 1;
        }
        while (TreeIndex < ParsedTree.TreeList.size()) {
            var FieldTree = ParsedTree.GetSyntaxTreeAt(TreeIndex);
            if (!FieldTree.Pattern.EqualsName("$Constructor$")) {
                break;
            }
            ParsedTree.TypeCheckNodeAt(TreeIndex, Gamma, Gamma.VarType, DefaultTypeCheckPolicy);
            TreeIndex += 1;
        }
        return Gamma.Generator.CreateEmptyNode(Gamma.VoidType);
    };

    GreenTeaGrammar.TypeConstructor = function (Gamma, ConstructorTree, ContextType) {
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
        return GreenTeaGrammar.TypeFuncDecl(Gamma, ConstructorTree, ContextType);
    };

    GreenTeaGrammar.ParseConstructor = // constructor
    function (NameSpace, TokenContext, LeftTree, Pattern) {
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

    GreenTeaGrammar.SymbolShellToken = // shell grammar
    function (TokenContext, SourceText, pos) {
        var start = pos;
        var isHeadOfToken = true;
        while (pos < SourceText.length) {
            var ch = LibGreenTea.CharAt(SourceText, pos);

            if (ch == 32 || ch == 9 || ch == 10 || ch == 59) {
                break;
            } else if (ch == 124 || ch == 62 || ch == 60) {
                if (isHeadOfToken) {
                    pos += 1;
                }
                break;
            }
            isHeadOfToken = false;
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

        if (Symbol.startsWith("/")) {
            if (Symbol.startsWith("//")) {
                return NoMatch;
            }
            if (Symbol.startsWith("/*")) {
                return NoMatch;
            }
        }

        if (LibGreenTea.IsUnixCommand(Symbol)) {
            TokenContext.AddNewToken(Symbol, WhiteSpaceTokenFlag, "$ShellExpression$");
            return pos;
        }

        var SrcListSize = TokenContext.SourceList.size();
        if (SrcListSize > 0) {
            var index = SrcListSize - 1;
            while (index >= 0) {
                var PrevToken = TokenContext.SourceList.get(index);
                if (PrevToken.PresetPattern != null && PrevToken.PresetPattern.EqualsName("$ShellExpression$")) {
                    TokenContext.AddNewToken(Symbol, WhiteSpaceTokenFlag, "$StringLiteral$");
                    return pos;
                }
                if (PrevToken.IsIndent() || PrevToken.EqualsText(";")) {
                    break;
                }
                index = index - 1;
            }
        }
        return NoMatch;
    };

    GreenTeaGrammar.ParseShell = function (NameSpace, TokenContext, LeftTree, Pattern) {
        var Token = TokenContext.Next();
        var NewTree = new GtSyntaxTree(Pattern, NameSpace, Token, null);
        var ParseFlag = TokenContext.ParseFlag;
        TokenContext.ParseFlag = 0;
        while (!IsEmptyOrError(NewTree) && !TokenContext.MatchToken(";")) {
            var Tree = null;
            if (TokenContext.GetToken().IsDelim() || TokenContext.GetToken().IsIndent()) {
                break;
            }

            if (TokenContext.GetToken().IsNextWhiteSpace()) {
                Tree = TokenContext.ParsePattern(NameSpace, "$StringLiteral$", Optional);
                if (Tree == null) {
                    Tree = TokenContext.ParsePattern(NameSpace, "$ShellExpression$", Optional);
                }
            }
            if (Tree == null) {
                Tree = TokenContext.ParsePattern(NameSpace, "$Expression$", Optional);
            }
            NewTree.AppendParsedTree(Tree);
        }
        TokenContext.ParseFlag = ParseFlag;
        return NewTree;
    };

    GreenTeaGrammar.TypeShell = function (Gamma, ParsedTree, ContextType) {
        var Node = Gamma.Generator.CreateCommandNode(ContextType, ParsedTree, null);
        var HeadNode = Node;
        var i = 0;
        var Command = ParsedTree.KeyToken.ParsedText;
        var ThisNode = Gamma.Generator.CreateConstNode(Gamma.StringType, ParsedTree, Command);
        Node.Append(ThisNode);
        while (i < LibGreenTea.ListSize(ParsedTree.TreeList)) {
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

    GreenTeaGrammar.prototype.LoadTo = function (NameSpace) {
        // Define Constants
        NameSpace.SetSymbol("true", true);
        NameSpace.SetSymbol("false", false);

        NameSpace.DefineTokenFunc(" \t", GreenTeaGrammar["WhiteSpaceToken"]);
        NameSpace.DefineTokenFunc("\n", GreenTeaGrammar["IndentToken"]);
        NameSpace.DefineTokenFunc(";", GreenTeaGrammar["SemiColonToken"]);
        NameSpace.DefineTokenFunc("{}()[]<>.,?:+-*/%=&|!@~^", GreenTeaGrammar["OperatorToken"]);
        NameSpace.DefineTokenFunc("/", GreenTeaGrammar["CommentToken"]);
        NameSpace.DefineTokenFunc("Aa", GreenTeaGrammar["SymbolToken"]);

        NameSpace.DefineTokenFunc("\"", GreenTeaGrammar["StringLiteralToken"]);
        NameSpace.DefineTokenFunc("\"", GreenTeaGrammar["StringLiteralToken_StringInterpolation"]);
        NameSpace.DefineTokenFunc("'", GreenTeaGrammar["CharLiteralToken"]);
        NameSpace.DefineTokenFunc("1", GreenTeaGrammar["NumberLiteralToken"]);

        NameSpace.AppendSyntax("+", GreenTeaGrammar["ParseUnary"], GreenTeaGrammar["TypeUnary"]);
        NameSpace.AppendSyntax("-", GreenTeaGrammar["ParseUnary"], GreenTeaGrammar["TypeUnary"]);
        NameSpace.AppendSyntax("~", GreenTeaGrammar["ParseUnary"], GreenTeaGrammar["TypeUnary"]);
        NameSpace.AppendSyntax("! not", GreenTeaGrammar["ParseUnary"], GreenTeaGrammar["TypeUnary"]);
        NameSpace.AppendSyntax("++ --", GreenTeaGrammar["ParseIncl"], GreenTeaGrammar["TypeIncl"]);

        NameSpace.AppendExtendedSyntax("* / % mod", PrecedenceCStyleMUL, GreenTeaGrammar["ParseBinary"], GreenTeaGrammar["TypeBinary"]);
        NameSpace.AppendExtendedSyntax("+ -", PrecedenceCStyleADD, GreenTeaGrammar["ParseBinary"], GreenTeaGrammar["TypeBinary"]);

        NameSpace.AppendExtendedSyntax("< <= > >=", PrecedenceCStyleCOMPARE, GreenTeaGrammar["ParseBinary"], GreenTeaGrammar["TypeBinary"]);
        NameSpace.AppendExtendedSyntax("== !=", PrecedenceCStyleEquals, GreenTeaGrammar["ParseBinary"], GreenTeaGrammar["TypeBinary"]);

        NameSpace.AppendExtendedSyntax("<< >>", PrecedenceCStyleSHIFT, GreenTeaGrammar["ParseBinary"], GreenTeaGrammar["TypeBinary"]);
        NameSpace.AppendExtendedSyntax("&", PrecedenceCStyleBITAND, GreenTeaGrammar["ParseBinary"], GreenTeaGrammar["TypeBinary"]);
        NameSpace.AppendExtendedSyntax("|", PrecedenceCStyleBITOR, GreenTeaGrammar["ParseBinary"], GreenTeaGrammar["TypeBinary"]);
        NameSpace.AppendExtendedSyntax("^", PrecedenceCStyleBITXOR, GreenTeaGrammar["ParseBinary"], GreenTeaGrammar["TypeBinary"]);

        NameSpace.AppendExtendedSyntax("=", PrecedenceCStyleAssign | LeftJoin, GreenTeaGrammar["ParseBinary"], GreenTeaGrammar["TypeAssign"]);
        NameSpace.AppendExtendedSyntax("+= -= *= /= %= <<= >>= & | ^=", PrecedenceCStyleAssign, GreenTeaGrammar["ParseBinary"], GreenTeaGrammar["TypeSelfAssign"]);
        NameSpace.AppendExtendedSyntax("++ --", 0, GreenTeaGrammar["ParseIncl"], GreenTeaGrammar["TypeIncl"]);

        NameSpace.AppendExtendedSyntax("&& and", PrecedenceCStyleAND, GreenTeaGrammar["ParseBinary"], GreenTeaGrammar["TypeAnd"]);
        NameSpace.AppendExtendedSyntax("|| or", PrecedenceCStyleOR, GreenTeaGrammar["ParseBinary"], GreenTeaGrammar["TypeOr"]);
        NameSpace.AppendExtendedSyntax("<: instanceof", PrecedenceInstanceof, GreenTeaGrammar["ParseBinary"], GreenTeaGrammar["TypeInstanceOf"]);

        NameSpace.AppendExtendedSyntax("?", 0, GreenTeaGrammar["ParseTrinary"], GreenTeaGrammar["TypeTrinary"]);

        NameSpace.AppendSyntax("$Empty$", GreenTeaGrammar["ParseEmpty"], GreenTeaGrammar["TypeEmpty"]);
        NameSpace.AppendSyntax("$Symbol$", GreenTeaGrammar["ParseSymbol"], null);
        NameSpace.AppendSyntax("$Type$", GreenTeaGrammar["ParseType"], GreenTeaGrammar["TypeConst"]);
        NameSpace.AppendSyntax("$TypeSuffix$", GreenTeaGrammar["ParseTypeSuffix"], null);
        NameSpace.AppendSyntax("$Variable$", GreenTeaGrammar["ParseVariable"], GreenTeaGrammar["TypeVariable"]);
        NameSpace.AppendSyntax("$Const$", GreenTeaGrammar["ParseConst"], GreenTeaGrammar["TypeConst"]);
        NameSpace.AppendSyntax("$CharLiteral$", GreenTeaGrammar["ParseCharLiteral"], GreenTeaGrammar["TypeCharLiteral"]);
        NameSpace.AppendSyntax("$StringLiteral$", GreenTeaGrammar["ParseStringLiteral"], GreenTeaGrammar["TypeConst"]);
        NameSpace.AppendSyntax("$IntegerLiteral$", GreenTeaGrammar["ParseIntegerLiteral"], GreenTeaGrammar["TypeConst"]);
        NameSpace.AppendSyntax("$TypeRef$", GreenTeaGrammar["ParseTypeRef"], GreenTeaGrammar["TypeTypeRef"]);

        NameSpace.AppendExtendedSyntax(".", 0, GreenTeaGrammar["ParseGetter"], GreenTeaGrammar["TypeGetter"]);
        NameSpace.AppendSyntax("(", GreenTeaGrammar["ParseGroup"], GreenTeaGrammar["TypeGroup"]);
        NameSpace.AppendSyntax("(", GreenTeaGrammar["ParseCast"], GreenTeaGrammar["TypeCast"]);
        NameSpace.AppendExtendedSyntax("(", 0, GreenTeaGrammar["ParseApply"], GreenTeaGrammar["TypeApply"]);
        NameSpace.AppendSyntax("[", GreenTeaGrammar["ParseArray"], GreenTeaGrammar["TypeArray"]);
        NameSpace.AppendExtendedSyntax("[", 0, GreenTeaGrammar["ParseIndexer"], GreenTeaGrammar["TypeIndexer"]);
        NameSpace.AppendSyntax("|", GreenTeaGrammar["ParseSize"], GreenTeaGrammar["TypeSize"]);

        NameSpace.AppendSyntax("$Block$", GreenTeaGrammar["ParseBlock"], null);
        NameSpace.AppendSyntax("$Statement$", GreenTeaGrammar["ParseStatement"], null);
        NameSpace.AppendSyntax("$Expression$", GreenTeaGrammar["ParseExpression"], null);

        NameSpace.AppendSyntax("$FuncName$", GreenTeaGrammar["ParseFuncName"], GreenTeaGrammar["TypeConst"]);
        NameSpace.AppendSyntax("$FuncDecl$", GreenTeaGrammar["ParseFuncDecl"], GreenTeaGrammar["TypeFuncDecl"]);
        NameSpace.AppendSyntax("$VarDecl$", GreenTeaGrammar["ParseVarDecl"], GreenTeaGrammar["TypeVarDecl"]);

        NameSpace.AppendSyntax("null", GreenTeaGrammar["ParseNull"], GreenTeaGrammar["TypeNull"]);
        NameSpace.AppendSyntax("defined", GreenTeaGrammar["ParseDefined"], GreenTeaGrammar["TypeDefined"]);
        NameSpace.AppendSyntax("typeof", GreenTeaGrammar["ParseTypeOf"], GreenTeaGrammar["TypeConst"]);
        NameSpace.AppendSyntax("require", GreenTeaGrammar["ParseRequire"], null);
        NameSpace.AppendSyntax("import", GreenTeaGrammar["ParseImport"], GreenTeaGrammar["TypeImport"]);

        NameSpace.AppendSyntax("if", GreenTeaGrammar["ParseIf"], GreenTeaGrammar["TypeIf"]);
        NameSpace.AppendSyntax("while", GreenTeaGrammar["ParseWhile"], GreenTeaGrammar["TypeWhile"]);
        NameSpace.AppendSyntax("do", GreenTeaGrammar["ParseDoWhile"], GreenTeaGrammar["TypeDoWhile"]);
        NameSpace.AppendSyntax("for", GreenTeaGrammar["ParseFor"], GreenTeaGrammar["TypeFor"]);
        NameSpace.AppendSyntax("continue", GreenTeaGrammar["ParseContinue"], GreenTeaGrammar["TypeContinue"]);
        NameSpace.AppendSyntax("break", GreenTeaGrammar["ParseBreak"], GreenTeaGrammar["TypeBreak"]);
        NameSpace.AppendSyntax("return", GreenTeaGrammar["ParseReturn"], GreenTeaGrammar["TypeReturn"]);
        NameSpace.AppendSyntax("let const", GreenTeaGrammar["ParseSymbolDecl"], GreenTeaGrammar["TypeSymbolDecl"]);

        NameSpace.AppendSyntax("try", GreenTeaGrammar["ParseTry"], GreenTeaGrammar["TypeTry"]);
        NameSpace.AppendSyntax("throw", GreenTeaGrammar["ParseThrow"], GreenTeaGrammar["TypeThrow"]);

        NameSpace.AppendSyntax("class", GreenTeaGrammar["ParseClassDecl"], GreenTeaGrammar["TypeClassDecl"]);
        NameSpace.AppendSyntax("$Constructor$", GreenTeaGrammar["ParseConstructor"], GreenTeaGrammar["TypeConstructor"]);
        NameSpace.AppendSyntax("super", GreenTeaGrammar["ParseSuper"], null);
        NameSpace.AppendSyntax("this", GreenTeaGrammar["ParseThis"], GreenTeaGrammar["TypeThis"]);
        NameSpace.AppendSyntax("new", GreenTeaGrammar["ParseNew"], GreenTeaGrammar["TypeApply"]);

        NameSpace.AppendSyntax("enum", GreenTeaGrammar["ParseEnum"], GreenTeaGrammar["TypeEnum"]);
        NameSpace.AppendSyntax("switch", GreenTeaGrammar["ParseSwitch"], GreenTeaGrammar["TypeSwitch"]);
        NameSpace.AppendSyntax("$CaseBlock$", GreenTeaGrammar["ParseCaseBlock"], null);
        //		NameSpace.DefineTokenFunc("Aa-/1.<>|", GreenTeaGrammar["SymbolShellToken"]); // overloading
        //		NameSpace.AppendSyntax("$ShellExpression$", GreenTeaGrammar["ParseShell"], GreenTeaGrammar["TypeShell"]);
    };
    return GreenTeaGrammar;
})(GtGrammar);

var GtStat = (function () {
    function GtStat() {
        this.VarDecl = 0;
        this.VarDeclInfer = 0;
        this.VarDeclAny = 0;
        this.VarDeclInferAny = 0;

        this.MatchCount = 0;
        this.BacktrackCount = 0;
    }
    return GtStat;
})();

var GtContext = (function () {
    function GtContext(Grammar, Generator) {
        this.Generator = Generator;
        this.Generator.Context = this;
        this.SourceMap = new GtMap();
        this.SourceList = new Array();
        this.ClassNameMap = new GtMap();
        this.RootNameSpace = new GtNameSpace(this, null);
        this.ClassCount = 0;
        this.FuncCount = 0;
        this.Stat = new GtStat();
        this.NoErrorReport = false;
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
        this.FuncType.TypeParams[0] = this.VarType;

        Grammar.LoadTo(this.RootNameSpace);
        this.TopLevelNameSpace = new GtNameSpace(this, this.RootNameSpace);
        this.Generator.InitContext(this);
    }
    GtContext.prototype.LoadGrammar = function (Grammar) {
        Grammar.LoadTo(this.TopLevelNameSpace);
    };

    GtContext.prototype.GuessType = function (Value) {
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

    GtContext.prototype.SubtypeKey = function (FromType, ToType) {
        return FromType.GetUniqueName() + "<" + ToType.GetUniqueName();
    };

    GtContext.prototype.CheckSubType = function (SubType, SuperType) {
        // TODO: Structual Typing database
        return false;
    };

    GtContext.prototype.SetGlobalTypeName = function (Name, Type) {
        this.ClassNameMap.put(Name, Type);
        LibGreenTea.VerboseLog(VerboseSymbol, "global type name: " + Name + ", " + Type);
    };

    GtContext.prototype.GetGenericType = function (BaseType, BaseIdx, TypeList, IsCreation) {
        LibGreenTea.Assert(BaseType.IsGenericType());
        var MangleName = MangleGenericType(BaseType, BaseIdx, TypeList);
        var GenericType = this.ClassNameMap.get(MangleName);
        if (GenericType == null && IsCreation) {
            var i = BaseIdx;
            var s = BaseType.ShortClassName + "<";
            while (i < LibGreenTea.ListSize(TypeList)) {
                s = s + TypeList.get(i).ShortClassName;
                i += 1;
                if (i == LibGreenTea.ListSize(TypeList)) {
                    s = s + ">";
                } else {
                    s = s + ",";
                }
            }
            GenericType = BaseType.CreateGenericType(BaseIdx, TypeList, s);
            this.SetGlobalTypeName(MangleName, GenericType);
        }
        return GenericType;
    };

    GtContext.prototype.GetGenericType1 = function (BaseType, ParamType, IsCreation) {
        var TypeList = new Array();
        TypeList.add(ParamType);
        return this.GetGenericType(BaseType, 0, TypeList, IsCreation);
    };

    GtContext.prototype.GetFileLine = function (FileName, Line) {
        var Id = /* (FileName == null) ? 0 :*/ this.SourceMap.get(FileName);
        if (Id == null) {
            this.SourceList.add(FileName);
            Id = this.SourceList.size();
            this.SourceMap.put(FileName, Id);
        }
        return LibGreenTea.JoinIntId(Id, Line);
    };

    GtContext.prototype.GetSourceFileName = function (FileLine) {
        var FileId = LibGreenTea.UpperId(FileLine);
        return (FileId == 0) ? null : this.SourceList.get(FileId - 1);
    };

    GtContext.prototype.GetSourcePosition = function (FileLine) {
        var FileId = LibGreenTea.UpperId(FileLine);
        var Line = LibGreenTea.LowerId(FileLine);
        var FileName = (FileId == 0) ? "eval" : this.SourceList.get(FileId - 1);
        return "(" + FileName + ":" + Line + ")";
    };

    GtContext.prototype.SetNoErrorReport = function (b) {
        this.NoErrorReport = b;
    };

    GtContext.prototype.ReportError = function (Level, Token, Message) {
        if (!Token.IsError() || !this.NoErrorReport) {
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
            LibGreenTea.DebugP(Message);
            this.ReportedErrorList.add(Message);
        }
    };

    GtContext.prototype.GetReportedErrors = function () {
        var List = this.ReportedErrorList;
        this.ReportedErrorList = new Array();
        return LibGreenTea.CompactStringList(List);
    };

    GtContext.prototype.ShowReportedErrors = function () {
        var i = 0;
        var Messages = this.GetReportedErrors();
        while (i < Messages.length) {
            LibGreenTea.println(Messages[i]);
            i = i + 1;
        }
    };
    return GtContext;
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
            if (LibGreenTea.EqualsString(Argu, "--verbose")) {
                LibGreenTea.DebugMode = true;
                LibGreenTea.VerboseMask |= (VerboseFile | VerboseSymbol | VerboseNative);
                continue;
            }
            if (LibGreenTea.EqualsString(Argu, "--verbose:token")) {
                LibGreenTea.VerboseMask |= VerboseToken;
                continue;
            }
            if (LibGreenTea.EqualsString(Argu, "--verbose:type")) {
                LibGreenTea.VerboseMask |= VerboseType;
                continue;
            }
            if (LibGreenTea.EqualsString(Argu, "--verbose:symbol")) {
                LibGreenTea.VerboseMask |= VerboseSymbol;
                continue;
            }
            if (LibGreenTea.EqualsString(Argu, "--verbose:native")) {
                LibGreenTea.VerboseMask |= VerboseNative;
                continue;
            }
            if (LibGreenTea.EqualsString(Argu, "--verbose:func")) {
                LibGreenTea.VerboseMask |= VerboseFunc;
                continue;
            }
            if (LibGreenTea.EqualsString(Argu, "--verbose:no")) {
                LibGreenTea.VerboseMask = 0;
                continue;
            }
            LibGreenTea.Usage(Argu + " is unknown");
        }
        var Generator = LibGreenTea.CodeGenerator(TargetCode, OutputFile, GeneratorFlag);
        if (Generator == null) {
            LibGreenTea.Usage("no target: " + TargetCode);
        }
        var Context = new GtContext(new GreenTeaGrammar(), Generator);
        var ShellMode = true;
        if (OneLiner != null) {
            Context.TopLevelNameSpace.Eval(OneLiner, 1);
            ShellMode = false;
        }
        while (Index < Args.length) {
            var ScriptText = LibGreenTea.LoadFile2(Args[Index]);
            if (ScriptText == null) {
                LibGreenTea.Exit(1, "file not found: " + Args[Index]);
            }
            var FileLine = Context.GetFileLine(Args[Index], 1);
            Context.TopLevelNameSpace.Eval(ScriptText, FileLine);
            ShellMode = false;
            Index += 1;
        }
        if (ShellMode) {
            LibGreenTea.println(ProgName + Version + " (" + CodeName + ") on " + LibGreenTea.GetPlatform());
            LibGreenTea.println(Copyright);
            var linenum = 1;
            var Line = null;
            while ((Line = LibGreenTea.ReadLine(">>> ")) != null) {
                var EvaledValue = Context.TopLevelNameSpace.Eval(Line, linenum);
                Context.ShowReportedErrors();
                if (EvaledValue != null) {
                    LibGreenTea.println(" (" + Context.GuessType(EvaledValue) + ":" + LibGreenTea.GetClassName(EvaledValue) + ") " + EvaledValue);
                }
                linenum += 1;
            }
            LibGreenTea.println("");
        } else {
            Generator.FlushBuffer();
        }
    };

    GreenTeaScript.main = function (Args) {
        GreenTeaScript.ParseCommandOption(Args);
    };
    return GreenTeaScript;
})();
