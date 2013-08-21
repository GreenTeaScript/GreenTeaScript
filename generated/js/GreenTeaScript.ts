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
	var ProgName: string  = "GreenTeaScript";
	var CodeName: string  = "Reference Implementation of D-Script";
	var MajorVersion: number = 0;
	var MinerVersion: number = 1;
	var PatchLevel: number   = 0;
	var Version: string = "0.1";
	var Copyright: string = "Copyright (c) 2013, JST/CREST DEOS project authors";
	var License: string = "BSD-Style Open Source";

	// ClassFlag
	var NativeClass: number	     				= 1 << 0;
	var InterfaceClass: number				   	= 1 << 1;
	var DynamicClass: number				    = 1 << 2;
	var EnumClass: number                       = 1 << 3;
	var OpenClass: number                       = 1 << 4;

	// FuncFlag
	var PublicFunc: number          = 1 << 0;
	var ExportFunc: number		    = 1 << 1;
	var VirtualFunc: number		    = 1 << 2;
	var NativeFunc: number		    = 1 << 3;
	var NativeStaticFunc: number	= 1 << 4;
	var NativeMacroFunc: number	    = 1 << 5;
	var NativeVariadicFunc: number	= 1 << 6;
	var DynamicFunc: number		    = 1 << 7;
	var ConstFunc: number			= 1 << 8;
	var ConstructorFunc: number     = 1 << 9;
	var GetterFunc: number          = 1 << 10;
	var SetterFunc: number          = 1 << 11;

	// VarFlag
	var ReadOnlyVar: number = 1;              // @var x: ReadOnly = 1; var x: disallow = 2
	//var MutableFieldVar: int  = (1 << 1);  // @var x: Mutable; x.y = 1 var allowed: is

	var NoMatch: number							= -1;
	var Optional: boolean = true;
	var Required: boolean = false;

	var ErrorLevel: number						= 0;
	var TypeErrorLevel: number                  = 1;
	var WarningLevel: number					= 2;
	var InfoLevel: number					    = 3;

	var NullChar: number				= 0;
	var UndefinedChar: number			= 1;
	var DigitChar: number				= 2;
	var UpperAlphaChar: number			= 3;
	var LowerAlphaChar: number			= 4;
	var UnderBarChar: number			= 5;
	var NewLineChar: number				= 6;
	var TabChar: number					= 7;
	var SpaceChar: number				= 8;
	var OpenParChar: number				= 9;
	var CloseParChar: number			= 10;
	var OpenBracketChar: number			= 11;
	var CloseBracketChar: number		= 12;
	var OpenBraceChar: number			= 13;
	var CloseBraceChar: number			= 14;
	var LessThanChar: number			= 15;
	var GreaterThanChar: number			= 16;
	var QuoteChar: number				= 17;
	var DoubleQuoteChar: number			= 18;
	var BackQuoteChar: number			= 19;
	var SurprisedChar: number			= 20;
	var SharpChar: number				= 21;
	var DollarChar: number				= 22;
	var PercentChar: number				= 23;
	var AndChar: number					= 24;
	var StarChar: number				= 25;
	var PlusChar: number				= 26;
	var CommaChar: number				= 27;
	var MinusChar: number				= 28;
	var DotChar: number					= 29;
	var SlashChar: number				= 30;
	var ColonChar: number				= 31;
	var SemiColonChar: number			= 32;
	var EqualChar: number				= 33;
	var QuestionChar: number			= 34;
	var AtmarkChar: number				= 35;
	var VarChar: number					= 36;
	var ChilderChar: number				= 37;
	var BackSlashChar: number			= 38;
	var HatChar: number					= 39;
	var UnicodeChar: number				= 40;
	var MaxSizeOfChars: number          = 41;

	var CharMatrix: number[] = [
		/*var soh: nul var etx: stx var enq: eot var bel: ack*/
		0, 1, 1, 1, 1, 1, 1, 1,
		/*var ht: bs var vt: nl var cr: np var si: so  */
		1, TabChar, NewLineChar, 1, 1, NewLineChar, 1, 1,
		/*020 dle  021 dc1  022 dc2  023 dc3  024 dc4  025 nak  026 syn  027 etb */
		1, 1, 1, 1, 1, 1, 1, 1,
		/*030 can  031 em   032 sub  033 esc  034 fs   035 gs   036 rs   037 us */
		1, 1, 1, 1, 1, 1, 1, 1,
		/*040 sp   041  !   042  "   043  #   044  $   045  %   046  &   047  ' */
		SpaceChar, SurprisedChar, DoubleQuoteChar, SharpChar, DollarChar, PercentChar, AndChar, QuoteChar,
		/*050  (   051  )   052  *   053  +   054  ,   055  -   056  .   057  / */
		OpenParChar, CloseParChar, StarChar, PlusChar, CommaChar, MinusChar, DotChar, SlashChar,
		/*060  0   061  1   062  2   063  3   064  4   065  5   066  6   067  7 */
		DigitChar, DigitChar, DigitChar, DigitChar, DigitChar, DigitChar, DigitChar, DigitChar,
		/*070  8   071  9   072  :   073  ;   074  <   075  =   076  >   077  ? */
		DigitChar, DigitChar, ColonChar, SemiColonChar, LessThanChar, EqualChar, GreaterThanChar, QuestionChar,
		/*100  @   101  A   102  B   103  C   104  D   105  E   106  F   107  G */
		AtmarkChar, UpperAlphaChar, UpperAlphaChar, UpperAlphaChar, UpperAlphaChar, UpperAlphaChar, UpperAlphaChar, UpperAlphaChar,
		/*110  H   111  I   112  J   113  K   114  L   115  M   116  N   117  O */
		UpperAlphaChar, UpperAlphaChar, UpperAlphaChar, UpperAlphaChar, UpperAlphaChar, UpperAlphaChar, UpperAlphaChar, UpperAlphaChar,
		/*120  P   121  Q   122  R   123  S   124  T   125  U   126  V   127  W */
		UpperAlphaChar, UpperAlphaChar, UpperAlphaChar, UpperAlphaChar, UpperAlphaChar, UpperAlphaChar, UpperAlphaChar, UpperAlphaChar,
		/*130  X   131  Y   132  Z   133  [   134  \   135  ]   136  ^   137  _ */
		UpperAlphaChar, UpperAlphaChar, UpperAlphaChar, OpenBracketChar, BackSlashChar, CloseBracketChar, HatChar, UnderBarChar,
		/*140  `   141  a   142  b   143  c   144  d   145  e   146  f   147  g */
		BackQuoteChar, LowerAlphaChar, LowerAlphaChar, LowerAlphaChar, LowerAlphaChar, LowerAlphaChar, LowerAlphaChar, LowerAlphaChar,
		/*150  h   151  i   152  j   153  k   154  l   155  m   156  n   157  o */
		LowerAlphaChar, LowerAlphaChar, LowerAlphaChar, LowerAlphaChar, LowerAlphaChar, LowerAlphaChar, LowerAlphaChar, LowerAlphaChar,
		/*160  p   161  q   162  r   163  s   164  t   165  u   166  v   167  w */
		LowerAlphaChar, LowerAlphaChar, LowerAlphaChar, LowerAlphaChar, LowerAlphaChar, LowerAlphaChar, LowerAlphaChar, LowerAlphaChar,
		/*170  x   171  y   172  z   173  {   174  |   175  }   176  ~   177 del*/
		LowerAlphaChar, LowerAlphaChar, LowerAlphaChar, OpenBraceChar, VarChar, CloseBraceChar, ChilderChar, 1,
		]

	// TokenFlag
	var SourceTokenFlag: number	    = 1;
	var ErrorTokenFlag: number	    = (1 << 1);
	var IndentTokenFlag: number	    = (1 << 2);
	var WhiteSpaceTokenFlag: number	= (1 << 3);
	var DelimTokenFlag: number	    = (1 << 4);
	var QuotedTokenFlag: number	    = (1 << 5);
	var NameSymbolTokenFlag: number	    = (1 << 6);

	// ParseFlag
	var BackTrackParseFlag: number	= 1;
	var SkipIndentParseFlag: number	= (1 << 1);

	// SyntaxTree
	var NoWhere: number         = -1;
	// UnaryTree, SuffixTree
	var UnaryTerm: number      = 0;
	// BinaryTree
	var LeftHandTerm: number	= 0;
	var RightHandTerm: number	= 1;

	// IfStmt
	var IfCond: number	= 0;
	var IfThen: number	= 1;
	var IfElse: number	= 2;

	// while(cond) {...}
	var WhileCond: number = 0;
	var WhileBody: number = 1;

	// ReturnStmt
	var ReturnExpr: number	= 0;

	// var N = 1;
	var VarDeclType: number		= 0;
	var VarDeclName: number		= 1;
	var VarDeclValue: number	= 2;
	var VarDeclScope: number	= 3;

	//var Call: Func;
	var CallExpressionOffset: number	= 0;
	var CallParameterOffset: number		= 1;

	// var Decl: Const;
	var ConstDeclClassIndex: number	= 0;
	var ConstDeclNameIndex: number	= 1;
	var ConstDeclValueIndex: number	= 2;

	// var Decl: Func;
	var FuncDeclReturnType: number	= 0;
	var FuncDeclClass: number		= 1;
	var FuncDeclName: number		= 2;
	var FuncDeclBlock: number		= 3;
	var FuncDeclParam: number		= 4;

	// var Decl: Class;
	var ClassDeclSuperType: number	= 0;
	var ClassDeclName: number			= 1;
	var ClassDeclFieldStartIndex: number    = 2;

	// try-catch
	var TryBody: number         = 0;
	var CatchVariable: number   = 1;
	var CatchBody: number       = 2;
	var FinallyBody: number     = 3;

	// Enum
	var EnumNameTreeIndex: number = 0;

	var BinaryOperator: number					= 1;
	var LeftJoin: number						= 1 << 1;
	var PrecedenceShift: number					= 3;
	//	Precedence_CppMember      = 300;  /* .x ->x */
	var Precedence_CStyleMUL: number			= (400 << PrecedenceShift);				/* x * x; x / x; x % x*/
	var Precedence_CStyleADD: number			= (500 << PrecedenceShift);				/* x + x; x - x */
	var Precedence_CStyleSHIFT: number			= (600 << PrecedenceShift);				/* x << x; x >> x */
	var Precedence_CStyleCOMPARE: number		= (700 << PrecedenceShift);
	var Precedence_CStyleEquals: number			= (800 << PrecedenceShift);
	var Precedence_CStyleBITAND: number			= (900 << PrecedenceShift);
	var Precedence_CStyleBITXOR: number			= (1000 << PrecedenceShift);
	var Precedence_CStyleBITOR: number			= (1100 << PrecedenceShift);
	var Precedence_CStyleAND: number			= (1200 << PrecedenceShift);
	var Precedence_CStyleOR: number				= (1300 << PrecedenceShift);
	var Precedence_CStyleTRINARY: number		= (1400 << PrecedenceShift);				/* ? : */
	var Precedence_CStyleAssign: number			= (1500 << PrecedenceShift);
	var Precedence_CStyleCOMMA: number			= (1600 << PrecedenceShift);

	var DefaultTypeCheckPolicy: number			= 0;
	var NoCheckPolicy: number                   = 1;
	var CastPolicy: number                      = (1 << 1);
	var IgnoreEmptyPolicy: number               = (1 << 2);
	var AllowEmptyPolicy: number                = (1 << 3);
	var AllowVoidPolicy: number                 = (1 << 4);
	var AllowCoercionPolicy: number             = (1 << 5);
	var OnlyConstPolicy: number                 = (1 << 6);

	var NativeNameSuffix: string = "__";
	var ShellGrammarReservedKeywords: string[] = ["true", "false", "as", "if"]

	var UseLangStat: boolean = true;


	function JoinStrings(Unit: string, Times: number): string {
		var s: string = "";
		var i: number = 0;
		while(i < Times) {
			s = s + Unit;
			i = i + 1;
		}
		return s;
	}

	function ListSize(a: any): number {
		if(a == null) {
			return 0;
		}
		return a.size();
	}

	function IsFlag(flag: number, flag2: number): boolean {
		return ((flag & flag2) == flag2);
	}

	function AsciiToTokenMatrixIndex(c: number): number {
		if(c < 128) {
			return CharMatrix[c];
		}
		return UnicodeChar;
	}

	function n2s(n: number): string {
		if(n < (27)) {
			return LibGreenTea.CharToString(<number>(65 + (n - 0)));
		}
		else if(n < (27 + 10)) {
			return LibGreenTea.CharToString(<number>(48 + (n - 27)));
		}
		else {
			return LibGreenTea.CharToString(<number>(97 + (n - 37)));
		}
	}

	function NumberToAscii(number: number): string {
		if(number >= 3600) {
			return n2s(number / 3600) + NumberToAscii(number % 3600);
		}
		return n2s((number / 60)) + n2s((number % 60));
	}

	function NativeVariableName(Name: string, Index: number): string {
		return Name + NativeNameSuffix + NumberToAscii(Index);
	}

	function ClassSymbol(ClassType: GtType, Symbol: string): string {
		return ClassType.GetUniqueName() + "." + Symbol;
	}

	function MangleGenericType(BaseType: GtType, BaseIdx: number, TypeList: Array<GtType>): string {
		var s: string = BaseType.ShortClassName + NativeNameSuffix;
		var i: number = BaseIdx;
		while(i < ListSize(TypeList)) {
			s = s + NumberToAscii(TypeList.get(i).ClassId);
			i = i + 1;
		}
		return s;
	}

	function MangleFuncName(BaseType: GtType, FuncName: string, BaseIdx: number, TypeList: Array<GtType>): string {
		var s: string = FuncName + NativeNameSuffix + NumberToAscii(BaseType.ClassId);
		var i: number = BaseIdx;
		while(i < ListSize(TypeList)) {
			s = s + NumberToAscii(TypeList.get(i).ClassId);
			i = i + 1;
		}
		return s;
	}

	function JoinPolyFuncFunc(ClassType: GtType, PolyFunc: GtPolyFunc, Func: GtFunc): GtPolyFunc {
		if(ClassType == null || Func.GetRecvType() == ClassType) {
			if(PolyFunc == null) {
				PolyFunc = new GtPolyFunc(null, Func);
			}
			else {
				PolyFunc.FuncList.add(Func);
			}
		}
		return PolyFunc;
	}

	function JoinPolyFunc(ClassType: GtType, PolyFunc: GtPolyFunc, FuncValue: Object): GtPolyFunc {
		if(FuncValue instanceof GtFunc) {
			return JoinPolyFuncFunc(ClassType, PolyFunc, <GtFunc>FuncValue);
		}
		if(FuncValue instanceof GtPolyFunc) {
			var Poly: GtPolyFunc = <GtPolyFunc>FuncValue;
			var i: number = 0;
			while(i < Poly.FuncList.size()) {
				PolyFunc = JoinPolyFuncFunc(ClassType, PolyFunc, Poly.FuncList.get(i));
				i += 1;
			}
		}
		return PolyFunc;
	}



	function ApplyTokenFunc(TokenFunc: TokenFunc, TokenContext: GtTokenContext, ScriptSource: string, Pos: number): number {
		while(TokenFunc != null) {
			var delegate: any = TokenFunc.Func;
			var NextIdx: number = LibGreenTea.ApplyTokenFunc(delegate, TokenContext, ScriptSource, Pos);
			if(NextIdx > Pos) return NextIdx;
			TokenFunc = TokenFunc.ParentFunc;
		}
		return NoMatch;
	}

	function MergeSyntaxPattern(Pattern: GtSyntaxPattern, Parent: GtSyntaxPattern): GtSyntaxPattern {
		if(Parent == null) return Pattern;
		var MergedPattern: GtSyntaxPattern = new GtSyntaxPattern(Pattern.PackageNameSpace, Pattern.PatternName, Pattern.MatchFunc, Pattern.TypeFunc);
		MergedPattern.ParentPattern = Parent;
		return MergedPattern;
	}

	function IsEmptyOrError(Tree: GtSyntaxTree): boolean {
		return Tree == null || Tree.IsEmptyOrError();
	}

	function LinkTree(LastNode: GtSyntaxTree, Node: GtSyntaxTree): GtSyntaxTree {
		Node.PrevTree = LastNode;
		if(LastNode != null) {
			LastNode.NextTree = Node;
		}
		return Node;
	}

	function TreeHead(Tree: GtSyntaxTree): GtSyntaxTree {
		if(Tree != null) {
			while(Tree.PrevTree != null) {
				Tree = Tree.PrevTree;
			}
		}
		return Tree;
	}

	function ApplySyntaxPattern(NameSpace: GtNameSpace, TokenContext: GtTokenContext, LeftTree: GtSyntaxTree, Pattern: GtSyntaxPattern): GtSyntaxTree {
		var Pos: number = TokenContext.CurrentPosition;
		var ParseFlag: number = TokenContext.ParseFlag;
		var CurrentPattern: GtSyntaxPattern = Pattern;
		while(CurrentPattern != null) {
			var delegate: any = CurrentPattern.MatchFunc;
			TokenContext.CurrentPosition = Pos;
			if(CurrentPattern.ParentPattern != null) {   // This means it has next patterns
				TokenContext.ParseFlag = ParseFlag | BackTrackParseFlag;
			}
			//LibGreenTea.DebugP("B :" + JoinStrings("  ", TokenContext.IndentLevel) + CurrentPattern + ", next=" + CurrentPattern.ParentPattern);
			TokenContext.IndentLevel += 1;
			var ParsedTree: GtSyntaxTree = <GtSyntaxTree>LibGreenTea.ApplyMatchFunc(delegate, NameSpace, TokenContext, LeftTree, CurrentPattern);
			TokenContext.IndentLevel -= 1;
			if(ParsedTree != null && ParsedTree.IsEmpty()) {
				ParsedTree = null;
			}
			//LibGreenTea.DebugP("E :" + JoinStrings("  ", TokenContext.IndentLevel) + CurrentPattern + " => " + ParsedTree);
			TokenContext.ParseFlag = ParseFlag;
			if(ParsedTree != null) {
				return ParsedTree;
			}
			CurrentPattern = CurrentPattern.ParentPattern;
		}
		if(TokenContext.IsAllowedBackTrack()) {
			TokenContext.CurrentPosition = Pos;
		}
		if(Pattern == null) {
			LibGreenTea.DebugP("undefined syntax pattern: " + Pattern);
		}
		return TokenContext.ReportExpectedPattern(Pattern);
	}

	function ParseExpression(NameSpace: GtNameSpace, TokenContext: GtTokenContext): GtSyntaxTree {
		var Pattern: GtSyntaxPattern = TokenContext.GetFirstPattern();
		var LeftTree: GtSyntaxTree = ApplySyntaxPattern(NameSpace, TokenContext, null, Pattern);
		while(!IsEmptyOrError(LeftTree) && !TokenContext.MatchToken(";")) {
			var ExtendedPattern: GtSyntaxPattern = TokenContext.GetExtendedPattern();
			if(ExtendedPattern == null) {
				//LibGreenTea.DebugP("In $Expression$ ending: " + TokenContext.GetToken());
				break;
			}
			LeftTree = ApplySyntaxPattern(NameSpace, TokenContext, LeftTree, ExtendedPattern);
		}
		return LeftTree;
	}

	// typing
	function ApplyTypeFunc(delegate: any, Gamma: GtTypeEnv, ParsedTree: GtSyntaxTree, Type: GtType): GtNode {
		LibGreenTea.Assert(delegate != null);
		Gamma.NameSpace = ParsedTree.NameSpace;
		return <GtNode>LibGreenTea.ApplyTypeFunc(delegate, Gamma, ParsedTree, Type);
	}

	function LinkNode(LastNode: GtNode, Node: GtNode): GtNode {
		Node.PrevNode = LastNode;
		if(LastNode != null) {
			LastNode.NextNode = Node;
		}
		return Node;
	}


// tokenizer

 class GtToken {
	public TokenFlag: number;
	public ParsedText: string;
	public FileLine: number;
	public PresetPattern: GtSyntaxPattern;

	 constructor(text: string, FileLine: number) {
		this.TokenFlag = 0;
		this.ParsedText = text;
		this.FileLine = FileLine;
		this.PresetPattern = null;
	}

	public IsSource(): boolean {
		return IsFlag(this.TokenFlag, SourceTokenFlag);
	}

	public IsError(): boolean {
		return IsFlag(this.TokenFlag, ErrorTokenFlag);
	}

	public IsIndent(): boolean {
		return IsFlag(this.TokenFlag, IndentTokenFlag);
	}

	public IsDelim(): boolean {
		return IsFlag(this.TokenFlag, DelimTokenFlag);
	}

	public IsQuoted(): boolean {
		return IsFlag(this.TokenFlag, QuotedTokenFlag);
	}

	public IsNameSymbol(): boolean {
		return IsFlag(this.TokenFlag, NameSymbolTokenFlag);
	}

	public EqualsText(text: string): boolean {
		return this.ParsedText.equals(text);
	}

	public toString(): string {
		var TokenText: string = "";
		if(this.PresetPattern != null) {
			TokenText = "(" + this.PresetPattern.PatternName + ") ";
		}
		return TokenText + this.ParsedText;
	}

	public ToErrorToken(Message: string): string {
		this.TokenFlag = ErrorTokenFlag;
		this.ParsedText = Message;
		return Message;
	}

	public GetErrorMessage(): string {
		LibGreenTea.Assert(this.IsError());
		return this.ParsedText;
	}
}

 class TokenFunc {
	public Func: any;
	public ParentFunc: TokenFunc;

	 constructor(Func: any, Parent: TokenFunc) {
		this.Func = Func;
		this.ParentFunc = Parent;
	}

	public toString(): string {
		return this.Func.Func.toString();
	}
}

 class GtTokenContext {
	public  static NullToken: GtToken = new GtToken("", 0);

	public TopLevelNameSpace: GtNameSpace;
	public SourceList: Array<GtToken>;
	public CurrentPosition: number;
	public ParsingLine: number;
	public ParseFlag: number;
	public IndentLevel: number = 0;

	 constructor(NameSpace: GtNameSpace, Text: string, FileLine: number) {
		this.TopLevelNameSpace = NameSpace;
		this.SourceList = new Array<GtToken>();
		this.CurrentPosition = 0;
		this.ParsingLine = FileLine;
		this.ParseFlag = 0;
		this.AddNewToken(Text, SourceTokenFlag, null);
		this.IndentLevel = 0;
	}

	public AddNewToken(Text: string, TokenFlag: number, PatternName: string): GtToken {
		var Token: GtToken = new GtToken(Text, this.ParsingLine);
		Token.TokenFlag |= TokenFlag;
		if(PatternName != null) {
			Token.PresetPattern = this.TopLevelNameSpace.GetPattern(PatternName);
			LibGreenTea.Assert(Token.PresetPattern != null);
		}
		//LibGreenTea.DebugP("<< " + Text + " : " + PatternName);
		this.SourceList.add(Token);
		return Token;
	}

	public FoundWhiteSpace(): void {
		var Token: GtToken = this.GetToken();
		Token.TokenFlag |= WhiteSpaceTokenFlag;
	}

	public FoundLineFeed(line: number): void {
		this.ParsingLine += line;
	}

	public ReportTokenError(Level: number, Message: string, TokenText: string): void {
		var Token: GtToken = this.AddNewToken(TokenText, 0, "$Error$");
		this.TopLevelNameSpace.Context.ReportError(Level, Token, Message);
	}

	public NewErrorSyntaxTree(Token: GtToken, Message: string): GtSyntaxTree {
		if(!this.IsAllowedBackTrack()) {
			this.TopLevelNameSpace.Context.ReportError(ErrorLevel, Token, Message);
			var ErrorTree: GtSyntaxTree = new GtSyntaxTree(Token.PresetPattern, this.TopLevelNameSpace, Token, null);
			return ErrorTree;
		}
		return null;
	}

	public GetBeforeToken(): GtToken {
		var pos: number = this.CurrentPosition - 1;
		while(pos >= 0 && pos < this.SourceList.size()) {
			var Token: GtToken = this.SourceList.get(pos);
			if(IsFlag(Token.TokenFlag, IndentTokenFlag)) {
				pos -= 1;
				continue;
			}
			return Token;
		}
		return null;
	}

	public ReportExpectedToken(TokenText: string): GtSyntaxTree {
		if(!this.IsAllowedBackTrack()) {
			var Token: GtToken = this.GetBeforeToken();
			if(Token != null) {
				return this.NewErrorSyntaxTree(Token, TokenText + " is expected after " + Token.ParsedText);
			}
			Token = this.GetToken();
			LibGreenTea.Assert(Token != GtTokenContext.NullToken);
			return this.NewErrorSyntaxTree(Token, TokenText + " is expected at " + Token.ParsedText);
		}
		return null;
	}

	public ReportExpectedPattern(Pattern: GtSyntaxPattern): GtSyntaxTree {
		if(Pattern == null) {
			return this.ReportExpectedToken("null");
		}
		return this.ReportExpectedToken(Pattern.PatternName);
	}

	public Vacume(): void {
		if(this.CurrentPosition > 0) {
			var NewList: Array<GtToken> = new Array<GtToken>();
			var i: number = this.CurrentPosition;
			while(i < ListSize(this.SourceList)) {
				NewList.add(this.SourceList.get(i));
				i = i + 1;
			}
			this.SourceList = NewList;
			this.CurrentPosition = 0;
		}
	}

	private DispatchFunc(ScriptSource: string, GtChar: number, pos: number): number {
		var TokenFunc: TokenFunc = this.TopLevelNameSpace.GetTokenFunc(GtChar);
		var NextIdx: number = ApplyTokenFunc(TokenFunc, this, ScriptSource, pos);
		if(NextIdx == NoMatch) {
			LibGreenTea.DebugP("undefined tokenizer: " + LibGreenTea.CharAt(ScriptSource, pos));
			this.AddNewToken(ScriptSource.substring(pos, pos + 1), 0, null);
			return pos + 1;
		}
		return NextIdx;
	}

	private Tokenize(ScriptSource: string, CurrentLine: number): void {
		var currentPos: number = 0;
		var len: number = ScriptSource.length;
		this.ParsingLine = CurrentLine;
		while(currentPos < len) {
			var gtCode: number = AsciiToTokenMatrixIndex(LibGreenTea.CharAt(ScriptSource, currentPos));
			var nextPos: number = this.DispatchFunc(ScriptSource, gtCode, currentPos);
			if(currentPos >= nextPos) {
				break;
			}
			currentPos = nextPos;
		}
		this.Dump();
	}

	public GetToken(): GtToken {
		while(this.CurrentPosition < this.SourceList.size()) {
			var Token: GtToken = this.SourceList.get(this.CurrentPosition);
			if(Token.IsSource()) {
				this.SourceList.remove(this.SourceList.size()-1);
				this.Tokenize(Token.ParsedText, Token.FileLine);
				if(this.CurrentPosition < this.SourceList.size()) {
					Token = this.SourceList.get(this.CurrentPosition);
				}else{
					break;
				}
			}
			if(IsFlag(this.ParseFlag, SkipIndentParseFlag) && Token.IsIndent()) {
				this.CurrentPosition = this.CurrentPosition + 1;
				continue;
			}
			return Token;
		}
		return GtTokenContext.NullToken;
	}

	public HasNext(): boolean {
		return (this.GetToken() != GtTokenContext.NullToken);
	}

	public Next(): GtToken {
		var Token: GtToken = this.GetToken();
		this.CurrentPosition += 1;
		return Token;
	}

	public SkipIndent(): void {
		var Token: GtToken = this.GetToken();
		while(Token.IsIndent()) {
			this.CurrentPosition = this.CurrentPosition + 1;
			Token = this.GetToken();
		}
	}

	public GetPattern(PatternName: string): GtSyntaxPattern {
		return this.TopLevelNameSpace.GetPattern(PatternName);
	}

	public GetFirstPattern(): GtSyntaxPattern {
		var Token: GtToken = this.GetToken();
		if(Token.PresetPattern != null) {
			return Token.PresetPattern;
		}
		var Pattern: GtSyntaxPattern = this.TopLevelNameSpace.GetPattern(Token.ParsedText);
		if(Pattern == null) {
			return this.TopLevelNameSpace.GetPattern("$Symbol$");
		}
		return Pattern;
	}

	public GetExtendedPattern(): GtSyntaxPattern {
		var Token: GtToken = this.GetToken();
		if(Token != GtTokenContext.NullToken) {
			var Pattern: GtSyntaxPattern = this.TopLevelNameSpace.GetExtendedPattern(Token.ParsedText);
			return Pattern;
		}
		return null;
	}

	public MatchToken(TokenText: string): boolean {
		var Token: GtToken = this.GetToken();
		if(Token.EqualsText(TokenText)) {
			this.CurrentPosition += 1;
			return true;
		}
		return false;
	}

	public GetMatchedToken(TokenText: string): GtToken {
		var Token: GtToken = this.GetToken();
		while(Token != GtTokenContext.NullToken) {
			this.CurrentPosition += 1;
			if(Token.EqualsText(TokenText)) {
				break;
			}
			Token = this.GetToken();
		}
		return Token;
	}

	public  IsAllowedBackTrack(): boolean {
		return IsFlag(this.ParseFlag, BackTrackParseFlag);
	}

	public  SetBackTrack(Allowed: boolean): number {
		var ParseFlag: number = this.ParseFlag;
		if(Allowed) {
			this.ParseFlag = this.ParseFlag | BackTrackParseFlag;
		}
		else {
			this.ParseFlag = (~(BackTrackParseFlag) & this.ParseFlag);
		}
		return ParseFlag;
	}

	public  ParsePatternAfter(NameSpace: GtNameSpace, LeftTree: GtSyntaxTree, PatternName: string, IsOptional: boolean): GtSyntaxTree {
		var Pos: number = this.CurrentPosition;
		var ParseFlag: number = this.ParseFlag;
		var Pattern: GtSyntaxPattern = this.GetPattern(PatternName);
		if(IsOptional) {
			this.ParseFlag = this.ParseFlag | BackTrackParseFlag;
		}
		var SyntaxTree: GtSyntaxTree = ApplySyntaxPattern(NameSpace, this, LeftTree, Pattern);
		this.ParseFlag = ParseFlag;
		if(SyntaxTree != null) {
			return SyntaxTree;
		}
		this.CurrentPosition = Pos;
		return null;
	}

	public  ParsePattern(NameSpace: GtNameSpace, PatternName: string, IsOptional: boolean): GtSyntaxTree {
		return this.ParsePatternAfter(NameSpace, null, PatternName, IsOptional);
	}

	public  SkipAndGetAnnotation(IsAllowedDelim: boolean): GtMap {
		// this is tentative implementation. In the future, you have to
		// use this pattern.
		var Annotation: GtMap = null;
		this.SkipIndent();
		while(this.MatchToken("@")) {
			var Token: GtToken = this.Next();
			if(Annotation == null) {
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
	}

	public  SkipEmptyStatement(): boolean {
		var Token: GtToken = null;
		while((Token = this.GetToken()) != GtTokenContext.NullToken) {
			if(Token.IsIndent() || Token.IsDelim()) {
				this.CurrentPosition += 1;
				continue;
			}
			break;
		}
		return (Token != GtTokenContext.NullToken);
	}

	public Dump(): void {
		var pos: number = this.CurrentPosition;
		while(pos < this.SourceList.size()) {
			var token: GtToken = this.SourceList.get(pos);
			LibGreenTea.DebugP("["+pos+"]\t" + token + " : " + token.PresetPattern);
			pos += 1;
		}
	}
}

 class GtSyntaxPattern {
	public PackageNameSpace: GtNameSpace;
	public PatternName: string;
	SyntaxFlag: number;
	public MatchFunc: any;
	public TypeFunc: any;
	public ParentPattern: GtSyntaxPattern;

	 constructor(NameSpace: GtNameSpace, PatternName: string, MatchFunc: any, TypeFunc: any) {
		this.PackageNameSpace = NameSpace;
		this.PatternName = PatternName;
		this.SyntaxFlag = 0;
		this.MatchFunc = MatchFunc;
		this.TypeFunc  = TypeFunc;
		this.ParentPattern = null;
	}

	public toString(): string {
		return this.PatternName + "<" + this.MatchFunc + ">";
	}

	public IsBinaryOperator(): boolean {
		return IsFlag(this.SyntaxFlag, BinaryOperator);
	}

	public IsLeftJoin(Right: GtSyntaxPattern): boolean {
		var left: number = this.SyntaxFlag >> PrecedenceShift;
		var right: number = Right.SyntaxFlag >> PrecedenceShift;
		return (left < right || (left == right && IsFlag(this.SyntaxFlag, LeftJoin) && IsFlag(Right.SyntaxFlag, LeftJoin)));
	}
}

class GtSyntaxTree {
	public ParentTree: GtSyntaxTree;
	public PrevTree: GtSyntaxTree;
	public NextTree: GtSyntaxTree;

	public NameSpace: GtNameSpace;
	public Pattern: GtSyntaxPattern;
	public KeyToken: GtToken;
	public TreeList: Array<GtSyntaxTree>;
	public ConstValue: Object;
	public Annotation: GtMap;

	 constructor(Pattern: GtSyntaxPattern, NameSpace: GtNameSpace, KeyToken: GtToken, ConstValue: Object) {
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

	public toString(): string {
		var s: string = "(" + this.KeyToken.ParsedText;
		var i: number = 0;
		while(i < ListSize(this.TreeList)) {
			var SubTree: GtSyntaxTree = this.TreeList.get(i);
			while(SubTree != null) {
				var Entry: string = SubTree.toString();
				if(ListSize(SubTree.TreeList) == 0) {
					Entry = SubTree.KeyToken.ParsedText;
				}
				s = s + " " + Entry;
				SubTree = SubTree.NextTree;
			}
			i += 1;
		}
		return s + ")";
	}

	public  AppendNext(Tree: GtSyntaxTree): void {
		var TailTree: GtSyntaxTree = this;
		while(TailTree.NextTree != null) {
			TailTree = TailTree.NextTree;
		}
		TailTree.NextTree = Tree;
	}

	public SetAnnotation(Annotation: GtMap): void {
		this.Annotation = Annotation;
	}

	public IsError(): boolean {
		return this.KeyToken.IsError();
	}

	public ToError(Token: GtToken): void {
		LibGreenTea.Assert(Token.IsError());
		this.KeyToken = Token;
		this.TreeList = null;
	}

	public IsEmpty(): boolean {
		return (this.KeyToken == GtTokenContext.NullToken && this.Pattern == null);
	}

	public ToEmpty(): void {
		this.KeyToken = GtTokenContext.NullToken;
		this.TreeList = null;
		this.Pattern = null; // Empty tree must backtrack
	}

	public IsEmptyOrError(): boolean {
		return this.KeyToken == GtTokenContext.NullToken || this.KeyToken.IsError();
	}

	public ToEmptyOrError(ErrorTree: GtSyntaxTree): void {
		if(ErrorTree == null) {
			this.ToEmpty();
		}
		else {
			this.ToError(ErrorTree.KeyToken);
		}
	}

	public GetSyntaxTreeAt(Index: number): GtSyntaxTree {
		if(this.TreeList != null && Index >= this.TreeList.size()) {
			return null;
		}
		return this.TreeList.get(Index);
	}

	public SetSyntaxTreeAt(Index: number, Tree: GtSyntaxTree): void {
		if(!this.IsError()) {
			if(Tree.IsError()) {
				this.ToError(Tree.KeyToken);
			}
			else {
				if(Index >= 0) {
					if(this.TreeList == null) {
						this.TreeList = new Array<GtSyntaxTree>();
					}
					if(Index < this.TreeList.size()) {
						this.TreeList.set(Index, Tree);
						return;
					}
					while(this.TreeList.size() < Index) {
						this.TreeList.add(null);
					}
					this.TreeList.add(Tree);
					Tree.ParentTree = this;
				}
			}
		}
	}

	public SetMatchedPatternAt(Index: number, NameSpace: GtNameSpace, TokenContext: GtTokenContext, PatternName: string,  IsOptional: boolean): void {
		if(!this.IsEmptyOrError()) {
			var ParsedTree: GtSyntaxTree = TokenContext.ParsePattern(NameSpace, PatternName, IsOptional);
			if(ParsedTree != null) {
				this.SetSyntaxTreeAt(Index, ParsedTree);
			}
			else if(ParsedTree == null && !IsOptional) {
				this.ToEmpty();
			}
		}
	}

	public SetMatchedTokenAt(Index: number, NameSpace: GtNameSpace, TokenContext: GtTokenContext, TokenText: string, IsOptional: boolean): void {
		if(!this.IsEmptyOrError()) {
			var Pos: number = TokenContext.CurrentPosition;
			var Token: GtToken = TokenContext.Next();
			if(Token.ParsedText.equals(TokenText)) {
				this.SetSyntaxTreeAt(Index, new GtSyntaxTree(null, NameSpace, Token, null));
			}
			else {
				TokenContext.CurrentPosition = Pos;
				if(!IsOptional) {
					this.ToEmptyOrError(TokenContext.ReportExpectedToken(TokenText));
				}
			}
		}
	}

	public AppendParsedTree(Tree: GtSyntaxTree): void {
		if(!this.IsError()) {
			if(Tree == null) {
				LibGreenTea.DebugP("");
			}
			if(Tree.IsError()) {
				this.ToError(Tree.KeyToken);
			}
			else {
				if(this.TreeList == null) {
					this.TreeList = new Array<GtSyntaxTree>();
				}
				this.TreeList.add(Tree);
			}
		}
	}

	public  GetParsedType(): GtType {
		return <GtType>this.ConstValue;
	}

	public  HasNodeAt(Index: number): boolean {
		if(this.TreeList != null && Index < this.TreeList.size()) {
			return this.TreeList.get(Index) != null;
		}
		return false;
	}

	public  TypeCheckNodeAt(Index: number, Gamma: GtTypeEnv, Type: GtType, TypeCheckPolicy: number): GtNode {
		if(this.TreeList != null && Index < this.TreeList.size()) {
			var ParsedTree: GtSyntaxTree = this.TreeList.get(Index);
			if(ParsedTree != null) {
				var Node: GtNode = ApplyTypeFunc(ParsedTree.Pattern.TypeFunc, Gamma, ParsedTree, Type);
				var TypedNode: GtNode = Gamma.TypeCheckSingleNode(ParsedTree, Node, Type, TypeCheckPolicy);
				return TypedNode;
			}
		}
		if(IsFlag(TypeCheckPolicy, AllowEmptyPolicy)) {
			return Gamma.Generator.CreateEmptyNode(Gamma.VoidType);
		}
		return Gamma.CreateSyntaxErrorNode(this, "not empty");
	}
}

/* typing */
class GtFieldInfo {
	public FieldFlag: number;
	public FieldIndex: number;
	public Type: GtType;
	public Name: string;
	public NativeName: string;
	public InitValue: Object;
	public GetterFunc: GtFunc;
	public SetterFunc: GtFunc;

	 constructor(FieldFlag: number, Type: GtType, Name: string, FieldIndex: number) {
		this.FieldFlag = FieldFlag;
		this.Type = Type;
		this.Name = Name;
		this.NativeName = Name; // use this in a generator
		this.FieldIndex = FieldIndex;
		this.InitValue = null;
		this.GetterFunc = null;
		this.SetterFunc = null;
	}
}

 class GtClassField {
	/*field*/ FieldList: Array<GtFieldInfo>;
	/*field*/ ThisClassIndex: number;

	 constructor(SuperClass: GtType) {
		this.FieldList = new Array<GtFieldInfo>();
		if(SuperClass.NativeSpec instanceof GtClassField) {
			var SuperField: GtClassField = <GtClassField>SuperClass.NativeSpec;
			var i: number = 0;
			while(i < SuperField.FieldList.size()) {
				this.FieldList.add(SuperField.FieldList.get(i));
				i+=1;
			}
		}
		this.ThisClassIndex = this.FieldList.size();
	}

	public CreateField(FieldFlag: number, Type: GtType, Name: string): GtFieldInfo {
		var i: number = 0;
		while(i < this.FieldList.size()) {
			var FieldInfo: GtFieldInfo = this.FieldList.get(i);
			if(FieldInfo.Name.equals(Name)) {
				return null;  // report error
			}
			i = i + 1;
		}
		var FieldInfo: GtFieldInfo = new GtFieldInfo(FieldFlag, Type, Name, this.FieldList.size());
		this.FieldList.add(FieldInfo);
		return FieldInfo;
	}

}

class GtVariableInfo {
	public VariableFlag: number;
	public Type: GtType;
	public Name: string;
	public NativeName: string;
	public DefCount: number;
	public UsedCount: number;

	 constructor(VarFlag: number, Type: GtType, Name: string, Index: number) {
		this.VariableFlag = VarFlag;
		this.Type = Type;
		this.Name = Name;
		this.NativeName = NativeVariableName(Name, Index);
		this.UsedCount = 0;
		this.DefCount  = 1;
	}
}

 class GtTypeEnv {
	public  Context: GtClassContext;
	public  Generator: GtGenerator;
	public NameSpace: GtNameSpace;

	public Func: GtFunc;
	public LocalStackList: Array<GtVariableInfo>;
	public StackTopIndex: number;

	/* for convinient short cut */
	public  VoidType: GtType;
	public  BooleanType: GtType;
	public  IntType: GtType;
	public  StringType: GtType;
	public  VarType: GtType;
	public  AnyType: GtType;
	public  ArrayType: GtType;
	public  FuncType: GtType;

	 constructor(NameSpace: GtNameSpace) {
		this.NameSpace = NameSpace;
		this.Context   = NameSpace.Context;
		this.Generator = NameSpace.Context.Generator;
		this.Func = null;
		this.LocalStackList = new Array<GtVariableInfo>();
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

	public  IsStrictMode(): boolean {
		return this.Generator.IsStrictMode();
	}

	public  IsTopLevel(): boolean {
		return (this.Func == null);
	}

	public AppendRecv(RecvType: GtType): void {
		var ThisName: string = this.Generator.GetRecvName();
		this.AppendDeclaredVariable(0, RecvType, ThisName);
		this.LocalStackList.get(this.StackTopIndex-1).NativeName = ThisName;
	}

	public AppendDeclaredVariable(VarFlag: number, Type: GtType, Name: string): void {
		var VarInfo: GtVariableInfo = new GtVariableInfo(VarFlag, Type, Name, this.StackTopIndex);
		if(this.StackTopIndex < this.LocalStackList.size()) {
			this.LocalStackList.set(this.StackTopIndex, VarInfo);
		}
		else {
			this.LocalStackList.add(VarInfo);
		}
		this.StackTopIndex += 1;
	}

	public LookupDeclaredVariable(Symbol: string): GtVariableInfo {
		var i: number = this.StackTopIndex - 1;
		while(i >= 0) {
			var VarInfo: GtVariableInfo = this.LocalStackList.get(i);
			if(VarInfo.Name.equals(Symbol)) {
				return VarInfo;
			}
			i -= 1;
		}
		return null;
	}

	public  CreateCoercionNode(ParamType: GtType, TypeCoercion: GtFunc, Node: GtNode): GtNode {
		var ApplyNode: GtNode = this.Generator.CreateApplyNode(ParamType, null, TypeCoercion);
		ApplyNode.Append(Node);
		return ApplyNode;
	}

	public  ReportTypeResult(ParsedTree: GtSyntaxTree, Node: GtNode, Level: number, Message: string): GtNode {
		if(Level == ErrorLevel || (this.IsStrictMode() && Level == TypeErrorLevel)) {
			LibGreenTea.Assert(Node.Token == ParsedTree.KeyToken);
			this.NameSpace.Context.ReportError(ErrorLevel, Node.Token, Message);
			return this.Generator.CreateErrorNode(this.VoidType, ParsedTree);
		}
		else {
			this.NameSpace.Context.ReportError(Level, Node.Token, Message);
		}
		return Node;
	}

	public  ReportTypeInference(SourceToken: GtToken, Name: string, InfferedType: GtType): void {
		this.Context.ReportError(InfoLevel, SourceToken, Name + " has type " + InfferedType);
	}

	public  CreateSyntaxErrorNode(ParsedTree: GtSyntaxTree, Message: string): GtNode {
		this.NameSpace.Context.ReportError(ErrorLevel, ParsedTree.KeyToken, Message);
		return this.Generator.CreateErrorNode(this.VoidType, ParsedTree);
	}

	public  SupportedOnlyTopLevelError(ParsedTree: GtSyntaxTree): GtNode {
		return this.CreateSyntaxErrorNode(ParsedTree, "supported only at top level " + ParsedTree.Pattern);
	}

	public  UnsupportedTopLevelError(ParsedTree: GtSyntaxTree): GtNode {
		return this.CreateSyntaxErrorNode(ParsedTree, "unsupported at top level " + ParsedTree.Pattern);
	}

	public  CreateLocalNode(ParsedTree: GtSyntaxTree, Name: string): GtNode {
		var VariableInfo: GtVariableInfo = this.LookupDeclaredVariable(Name);
		if(VariableInfo != null) {
			return this.Generator.CreateLocalNode(VariableInfo.Type, ParsedTree, VariableInfo.NativeName);
		}
		return this.CreateSyntaxErrorNode(ParsedTree, "unresolved name: " + Name + "; not your fault");
	}

	public  CreateDefaultValue(ParsedTree: GtSyntaxTree, Type: GtType): GtNode {
		return this.Generator.CreateConstNode(Type, ParsedTree, Type.DefaultNullValue);
	}

//	public GtNode DefaultValueConstNode(GtSyntaxTree ParsedTree, GtType Type) {
//		if(Type.DefaultNullValue != null) {
//			return this.Generator.CreateConstNode(Type, ParsedTree, Type.DefaultNullValue);
//		}
//		return this.CreateSyntaxErrorNode(ParsedTree, "undefined initial value of " + Type);
//	}

	/* typing */
	public TypeEachNode(Tree: GtSyntaxTree, Type: GtType): GtNode {
		var Node: GtNode = ApplyTypeFunc(Tree.Pattern.TypeFunc, this, Tree, Type);
		return Node;
	}

	public TypeCheckEachNode(Tree: GtSyntaxTree, Type: GtType, TypeCheckPolicy: number): GtNode {
		var Node: GtNode = this.TypeEachNode(Tree, Type);
		if(Node.IsError()) {
			return Node;
		}
		return Node;
	}

	public TypeBlock(ParsedTree: GtSyntaxTree, Type: GtType): GtNode {
		var StackTopIndex: number = this.StackTopIndex;
		var LastNode: GtNode = null;
		while(ParsedTree != null) {
			var CurrentType: GtType = Type;
			if(ParsedTree.NextTree != null) {
				CurrentType = this.VoidType;
			}
			var TypedNode: GtNode = this.TypeCheckEachNode(ParsedTree, CurrentType, DefaultTypeCheckPolicy);
			/*local*/LastNode = LinkNode(LastNode, TypedNode);
			if(TypedNode.IsError()) {
				break;
			}
			ParsedTree = ParsedTree.NextTree;
		}
		this.StackTopIndex = StackTopIndex;
		if(LastNode == null) {
			return null;
		}
		return LastNode.MoveHeadNode();
	}

	public TypeCheck(ParsedTree: GtSyntaxTree, Type: GtType, TypeCheckPolicy: number): GtNode {
		return this.TypeBlock(ParsedTree, Type);
	}

	public  TypeCheckSingleNode(ParsedTree: GtSyntaxTree, Node: GtNode, Type: GtType, TypeCheckPolicy: number): GtNode {
		if(Node.IsError() || IsFlag(TypeCheckPolicy, NoCheckPolicy)) {
			return Node;
		}
		if(IsFlag(TypeCheckPolicy, AllowVoidPolicy) || Type == this.VoidType) {
			return Node;
		}
		if(Node.Type == this.VarType) {
			return this.ReportTypeResult(ParsedTree, Node, TypeErrorLevel, "unspecified type: " + Node.Token.ParsedText);
		}
		if(Node.Type == Type || Type == this.VarType || Type.Accept(Node.Type)) {
			return Node;
		}
		var Func: GtFunc = ParsedTree.NameSpace.GetCoercionFunc(Node.Type, Type, true);
		if(Func != null && IsFlag(TypeCheckPolicy, CastPolicy)) {
			var ApplyNode: GtNode = this.Generator.CreateApplyNode(Type, ParsedTree, Func);
			ApplyNode.Append(Node);
			return ApplyNode;
		}
		return this.ReportTypeResult(ParsedTree, Node, TypeErrorLevel, "type error: requested = " + Type + ", given = " + Node.Type);
	}

//	public final void DefineFunc(GtFunc Func) {
//		this.NameSpace.AppendFunc(Func);
//		this.Func = Func;
//	}

}

// NameSpace

 class GtNameSpace {
	public  Context: GtClassContext;
	public  ParentNameSpace: GtNameSpace;
	public PackageName: string;

	TokenMatrix: TokenFunc[];
	SymbolPatternTable: GtMap;

	 constructor(Context: GtClassContext, ParentNameSpace: GtNameSpace) {
		this.Context = Context;
		this.ParentNameSpace = ParentNameSpace;
		this.PackageName = (ParentNameSpace != null) ? ParentNameSpace.PackageName : null;
		this.TokenMatrix = null;
		this.SymbolPatternTable = null;
	}

	public  GetTokenFunc(GtChar2: number): TokenFunc {
		if(this.TokenMatrix == null) {
			return this.ParentNameSpace.GetTokenFunc(GtChar2);
		}
		return this.TokenMatrix[GtChar2];
	}

	public  DefineTokenFunc(keys: string, f: any): void {
		var i: number = 0;
		if(this.TokenMatrix == null) {
			this.TokenMatrix = new Array<TokenFunc>(MaxSizeOfChars);
			if(this.ParentNameSpace != null) {
				while(i < MaxSizeOfChars) {
					this.TokenMatrix[i] = this.ParentNameSpace.GetTokenFunc(i);
				}
			}
		}
		i = 0;
		while(i < keys.length) {
			var kchar: number = AsciiToTokenMatrixIndex(LibGreenTea.CharAt(keys, i));
			this.TokenMatrix[kchar] = LibGreenTea.CreateOrReuseTokenFunc(f, this.TokenMatrix[kchar]);
			i += 1;
		}
	}

	public  GetSymbol(Key: string): Object {
		var NameSpace: GtNameSpace = this;
		while(NameSpace != null) {
			if(NameSpace.SymbolPatternTable != null) {
				var Value: Object = NameSpace.SymbolPatternTable.get(Key);
				if(Value != null) {
					return Value;
				}
			}
			NameSpace = NameSpace.ParentNameSpace;
		}
		return null;
	}

	public SetSymbol(Key: string, Value: Object): void {
		if(this.SymbolPatternTable == null) {
			this.SymbolPatternTable = new GtMap();
		}
		this.SymbolPatternTable.put(Key, Value);
	}

	public GetPattern(PatternName: string): GtSyntaxPattern {
		var Body: Object = this.GetSymbol(PatternName);
		if(Body instanceof GtSyntaxPattern) {
			return <GtSyntaxPattern>Body;
		}
		return null;
	}

	public GetExtendedPattern(PatternName: string): GtSyntaxPattern {
		var Body: Object = this.GetSymbol("\t" + PatternName);
		if(Body instanceof GtSyntaxPattern) {
			return <GtSyntaxPattern>Body;
		}
		return null;
	}

	private AppendPattern(PatternName: string, NewPattern: GtSyntaxPattern): void {
		LibGreenTea.Assert(NewPattern.ParentPattern == null);
		var ParentPattern: GtSyntaxPattern = this.GetPattern(PatternName);
		NewPattern.ParentPattern = ParentPattern;
		this.SetSymbol(PatternName, NewPattern);
	}

	public AppendSyntax(PatternName: string, MatchFunc: any, TypeFunc: any): void {
		var Pattern: GtSyntaxPattern = new GtSyntaxPattern(this, PatternName, MatchFunc, TypeFunc);
		this.AppendPattern(PatternName, Pattern);
	}

	public AppendExtendedSyntax(PatternName: string, SyntaxFlag: number, MatchFunc: any, TypeFunc: any): void {
		var Pattern: GtSyntaxPattern = new GtSyntaxPattern(this, PatternName, MatchFunc, TypeFunc);
		Pattern.SyntaxFlag = SyntaxFlag;
		this.AppendPattern("\t" + PatternName, Pattern);
	}

	public  AppendTypeName(ClassInfo: GtType): GtType {
		if(ClassInfo.PackageNameSpace == null) {
			ClassInfo.PackageNameSpace = this;
			if(this.PackageName != null) {
				this.Context.ClassNameMap.put(this.PackageName + "." + ClassInfo.ShortClassName, ClassInfo);
			}
		}
		if(ClassInfo.BaseType == ClassInfo) {
			this.SetSymbol(ClassInfo.ShortClassName, ClassInfo);
		}
		return ClassInfo;
	}

	public  GetClassSymbol(ClassType: GtType, Symbol: string, RecursiveSearch: boolean): Object {
		while(ClassType != null) {
			var Key: string = ClassSymbol(ClassType, Symbol);
			var Value: Object = this.GetSymbol(Key);
			if(Value != null) {
				return Value;
			}
			if(!RecursiveSearch) {
				break;
			}
			ClassType = ClassType.SuperType;
		}
		return null;
	}

	public  GetGetterFunc(ClassType: GtType, Symbol: string, RecursiveSearch: boolean): GtFunc {
		var Func: Object = this.Context.RootNameSpace.GetClassSymbol(ClassType, Symbol, RecursiveSearch);
		if(Func instanceof GtFunc) {
			return <GtFunc>Func;
		}
		return null;
	}

	public  GetSetterFunc(ClassType: GtType, Symbol: string, RecursiveSearch: boolean): GtFunc {
		var Func: Object = this.Context.RootNameSpace.GetClassSymbol(ClassType, Symbol + "=", RecursiveSearch);
		if(Func instanceof GtFunc) {
			return <GtFunc>Func;
		}
		return null;
	}

	public  GetCoercionFunc(FromType: GtType, ToType: GtType, RecursiveSearch: boolean): GtFunc {
		var Func: Object = this.Context.RootNameSpace.GetClassSymbol(FromType, ToType.GetUniqueName(), RecursiveSearch);
		if(Func instanceof GtFunc) {
			return <GtFunc>Func;
		}
		return null;
	}

	public  GetMethod(ClassType: GtType, Symbol: string, RecursiveSearch: boolean): GtPolyFunc {
		var PolyFunc: GtPolyFunc = null;
		while(ClassType != null) {
			var Key: string = ClassSymbol(ClassType, Symbol);
			PolyFunc = JoinPolyFunc(ClassType, PolyFunc, this.GetSymbol(Key));
			if(!RecursiveSearch) {
				break;
			}
			ClassType = ClassType.SuperType;
		}
		return PolyFunc;
	}

	public  GetConstructorFunc(ClassType: GtType): GtPolyFunc {
		return this.Context.RootNameSpace.GetMethod(ClassType, "", false);
	}

	public  GetFuncParam(FuncName: string, BaseIndex: number, ParamTypes: GtType[]): GtFunc {
		var FuncValue: Object = this.GetSymbol(FuncName);
		if(FuncValue instanceof GtFunc) {
			var Func: GtFunc = <GtFunc>FuncValue;
			if(Func.EqualsParamTypes(BaseIndex, ParamTypes)) {
				return Func;
			}
		}
		else if(FuncValue instanceof GtPolyFunc) {
			var PolyFunc: GtPolyFunc = <GtPolyFunc>FuncValue;
			var i: number = PolyFunc.FuncList.size();
			while(i >= 1) {
				if(PolyFunc.FuncList.get(i-1).EqualsParamTypes(BaseIndex, ParamTypes)) {
					return PolyFunc.FuncList.get(i);
				}
				i = i - 1;
			}
		}
		return null;
	}

	private  PublicNameSpace(IsPublic: boolean): GtNameSpace {
		return IsPublic ? this.Context.RootNameSpace : this;
	}

	public  AppendFuncName(Key: string, Func: GtFunc): Object {
		var OldValue: Object = this.GetSymbol(Key);
		if(OldValue instanceof GtFunc) {
			var PolyFunc: GtPolyFunc = new GtPolyFunc(this, <GtFunc>OldValue);
			this.SetSymbol(Key, PolyFunc);
			return PolyFunc.Append(Func);
		}
		else if(OldValue instanceof GtPolyFunc) {
			var PolyFunc: GtPolyFunc = (<GtPolyFunc>OldValue).Dup(this);
			this.SetSymbol(Key, PolyFunc);
			return PolyFunc.Append(Func);
		}
		else {
			this.SetSymbol(Key, Func);
		}
		return OldValue;
	}

	public  AppendFunc(Func: GtFunc): Object {
		return this.PublicNameSpace(Func.Is(PublicFunc)).AppendFuncName(Func.FuncName, Func);
	}

	public  AppendMethod(ClassType: GtType, Func: GtFunc): Object {
		var Key: string = ClassSymbol(ClassType, Func.FuncName);
		return this.PublicNameSpace(Func.Is(PublicFunc)).AppendFuncName(Key, Func);
	}

	public  AppendConstructor(ClassType: GtType, Func: GtFunc): void {
		var Key: string = ClassSymbol(ClassType, "");
		Func.FuncFlag |= ConstructorFunc;
		this.Context.RootNameSpace.AppendFuncName(Key, Func);  // @Public
	}

	public  SetGetterFunc(ClassType: GtType, Name: string, Func: GtFunc): void {
		var Key: string = ClassSymbol(ClassType, Name);
		Func.FuncFlag |= GetterFunc;
		this.Context.RootNameSpace.SetSymbol(Key, Func);  // @Public
	}

	public  SetSetterFunc(ClassType: GtType, Name: string, Func: GtFunc): void {
		var Key: string = ClassSymbol(ClassType, Name + "=");
		Func.FuncFlag |= SetterFunc;
		this.Context.RootNameSpace.SetSymbol(Key, Func);  // @Public
	}

	public  SetCoercionFunc(ClassType: GtType, ToType: GtType, Func: GtFunc): void {
		var Key: string = ClassSymbol(ClassType, "to" + ToType);
		this.PublicNameSpace(Func.Is(PublicFunc)).SetSymbol(Key, Func);
	}

	public  ReportOverrideName(Token: GtToken, ClassType: GtType, Symbol: string): void {
		var Message: string = "duplicated symbol: ";
		if(ClassType == null) {
			Message += Symbol;
		}
		else {
			Message += ClassType + "." + Symbol;
		}
		this.Context.ReportError(WarningLevel, Token, Message);
	}

}

class GtGrammar {
	public LoadTo(NameSpace: GtNameSpace): void {
		/*extension*/
	}
}

 class DScriptGrammar extends GtGrammar {
	// Token
	public static WhiteSpaceToken(TokenContext: GtTokenContext, SourceText: string, pos: number): number {
		TokenContext.FoundWhiteSpace();
		while(pos < SourceText.length) {
			var ch: number = LibGreenTea.CharAt(SourceText, pos);
			if(!LibGreenTea.IsWhitespace(ch)) {
				break;
			}
			pos += 1;
		}
		return pos;
	}

	public static IndentToken(TokenContext: GtTokenContext, SourceText: string, pos: number): number {
		var LineStart: number = pos + 1;
		TokenContext.FoundLineFeed(1);
		pos = pos + 1;
		while(pos < SourceText.length) {
			var ch: number = LibGreenTea.CharAt(SourceText, pos);
			if(!LibGreenTea.IsWhitespace(ch)) {
				break;
			}
			pos += 1;
		}
		var Text: string = "";
		if(LineStart < pos) {
			Text = SourceText.substring(LineStart, pos);
		}
		TokenContext.AddNewToken(Text, IndentTokenFlag, null);
		return pos;
		//TokenContext.AddNewToken(SourceText.substring(pos), SourceTokenFlag, null);
		//return SourceText.length();
	}

	public static SymbolToken(TokenContext: GtTokenContext, SourceText: string, pos: number): number {
		var start: number = pos;
		while(pos < SourceText.length) {
			var ch: number = LibGreenTea.CharAt(SourceText, pos);
			if(!LibGreenTea.IsLetter(ch) && !LibGreenTea.IsDigit(ch) && ch != 95/*_*/) {
				break;
			}
			pos += 1;
		}
		TokenContext.AddNewToken(SourceText.substring(start, pos), NameSymbolTokenFlag, null);
		return pos;
	}

	public static OperatorToken(TokenContext: GtTokenContext, SourceText: string, pos: number): number {
		var NextPos: number = pos + 1;
		while(NextPos < SourceText.length) {
			var ch: number = LibGreenTea.CharAt(SourceText, NextPos);
			if(LibGreenTea.IsWhitespace(ch) || LibGreenTea.IsLetter(ch) || LibGreenTea.IsDigit(ch)) {
				break;
			}
			NextPos += 1;
		}
		var Matched: boolean = false;
		while(NextPos > pos) {
			var Sub: string = SourceText.substring(pos, NextPos);
			var Pattern: GtSyntaxPattern = TokenContext.TopLevelNameSpace.GetExtendedPattern(Sub);
			if(Pattern != null) {
				Matched = true;
				break;
			}
			NextPos -= 1;
		}
		// FIXME
		if(Matched == false) {
			NextPos = pos + 1;
		}
		TokenContext.AddNewToken(SourceText.substring(pos, NextPos), 0, null);
		return NextPos;
	}

	public static CommentToken(TokenContext: GtTokenContext, SourceText: string, pos: number): number {
		var NextPos: number = pos + 1;
		if(NextPos < SourceText.length) {
			var NextChar: number = LibGreenTea.CharAt(SourceText, NextPos);
			if(NextChar != 47/*/*/ && NextChar != 42/***/) {
				return NoMatch;
			}
			var Level: number = 0;
			var PrevChar: number = 0;
			if(NextChar == 42/***/) {
				Level = 1;
			}
			while(NextPos < SourceText.length) {
				NextChar = LibGreenTea.CharAt(SourceText, NextPos);
				if(NextChar == ('\n'.charCodeAt(0)) && Level == 0) {
					return DScriptGrammar.IndentToken(TokenContext, SourceText, NextPos);
				}
				if(NextChar == 47/*/*/ && PrevChar == 42/***/) {
					if(Level == 1) {
						return NextPos + 1;
					}
					Level = Level - 1;
				}
				if(Level > 0) {
					if(NextChar == 42/***/ && PrevChar == 47/*/*/) {
						Level = Level + 1;
					}
				}
				PrevChar = NextChar;
				NextPos = NextPos + 1;
			}
		}
		return NoMatch;
	}

	public static NumberLiteralToken(TokenContext: GtTokenContext, SourceText: string, pos: number): number {
		var start: number = pos;
		while(pos < SourceText.length) {
			var ch: number = LibGreenTea.CharAt(SourceText, pos);
			if(!LibGreenTea.IsDigit(ch)) {
				break;
			}
			pos += 1;
		}
		TokenContext.AddNewToken(SourceText.substring(start, pos), 0, "$IntegerLiteral$");
		return pos;
	}

	public static StringLiteralToken(TokenContext: GtTokenContext, SourceText: string, pos: number): number {
		var start: number = pos;
		var prev: number = 34/*"*/;
		pos = pos + 1; // eat "\""
		while(pos < SourceText.length) {
			var ch: number = LibGreenTea.CharAt(SourceText, pos);
			if(ch == 34/*"*/ && prev != ('\\'.charCodeAt(0))) {
				TokenContext.AddNewToken(SourceText.substring(start, pos + 1), QuotedTokenFlag, "$StringLiteral$");
				return pos + 1;
			}
			if(ch == ('\n'.charCodeAt(0))) {
				TokenContext.ReportTokenError(ErrorLevel, "expected \"close: tostring: the literal", SourceText.substring(start, pos));
				TokenContext.FoundLineFeed(1);
				return pos;
			}
			pos = pos + 1;
			prev = ch;
		}
		TokenContext.ReportTokenError(ErrorLevel, "expected \"close: tostring: the literal", SourceText.substring(start, pos));
		return pos;
	}

	public static StringLiteralToken_StringInterpolation(TokenContext: GtTokenContext, SourceText: string, pos: number): number {
		var start: number = pos + 1;
		var NextPos: number = start;
		var prev: number = 34/*"*/;
		while(NextPos < SourceText.length) {
			var ch: number = LibGreenTea.CharAt(SourceText, NextPos);
			if(ch == 36/*$*/) {
				var end: number = NextPos + 1;
				ch = LibGreenTea.CharAt(SourceText, end);
				if(ch == 123/*{*/) {
					while(end < SourceText.length) {
						ch = LibGreenTea.CharAt(SourceText, end);
						if(ch == 125/*}*/) {
							break;
						}
						end = end + 1;
					}
					var Expr: string = SourceText.substring(NextPos + 2, end);
					var LocalContext: GtTokenContext = new GtTokenContext(TokenContext.TopLevelNameSpace, Expr, TokenContext.ParsingLine);
					LocalContext.SkipEmptyStatement();

					TokenContext.AddNewToken("\"" + SourceText.substring(start, NextPos) + "\"", 0, "$StringLiteral$");
					TokenContext.AddNewToken("+", 0, null);
					while(LocalContext.HasNext()) {
						var NewToken: GtToken = LocalContext.Next();
						TokenContext.AddNewToken(NewToken.ParsedText, 0, null);
					}
					TokenContext.AddNewToken("+", 0, null);
					end = end + 1;
					start = end;
					NextPos = end;
					prev = ch;
					if(ch == 34/*"*/) {
						TokenContext.AddNewToken("\"" + SourceText.substring(start, NextPos) + "\"", 0, "$StringLiteral$");
						return NextPos + 1;
					}
					continue;
				}
			}
			if(ch == 34/*"*/ && prev != ('\\'.charCodeAt(0))) {
				TokenContext.AddNewToken("\"" + SourceText.substring(start, NextPos) + "\"", 0, "$StringLiteral$");
				return NextPos + 1;
			}
			if(ch == ('\n'.charCodeAt(0))) {
				TokenContext.ReportTokenError(ErrorLevel, "expected \"close: tostring: the literal", SourceText.substring(start, NextPos));
				TokenContext.FoundLineFeed(1);
				return NextPos;
			}
			NextPos = NextPos + 1;
			prev = ch;
		}
		TokenContext.ReportTokenError(ErrorLevel, "expected \"close: tostring: the literal", SourceText.substring(start, NextPos));
		return NextPos;
	}

	// parser and type checker
	public static ParseType(NameSpace: GtNameSpace, TokenContext: GtTokenContext, LeftTree: GtSyntaxTree, Pattern: GtSyntaxPattern): GtSyntaxTree {
		var Token: GtToken = TokenContext.Next();
		var ConstValue: Object = NameSpace.GetSymbol(Token.ParsedText);
		if(!(ConstValue instanceof GtType)) {
			return null;  // Not matched
		}
		var ParsedType: GtType = <GtType>ConstValue;
		var BacktrackPosition: number = TokenContext.CurrentPosition;
		if(ParsedType.IsGenericType()) {
			if(TokenContext.MatchToken("<")) {  // Generics
				var TypeList: Array<GtType> = new Array<GtType>();
				while(!TokenContext.MatchToken(">")) {
					var ParamTree: GtSyntaxTree = TokenContext.ParsePattern(NameSpace, "$Type$", Optional);
					if(ParamTree == null) {
						TokenContext.CurrentPosition = BacktrackPosition;
						return new GtSyntaxTree(Pattern, NameSpace, Token, ParsedType);
					}
					TypeList.add(ParamTree.GetParsedType());
					if(TokenContext.MatchToken(",")) {
						continue;
					}
				}
				ParsedType = NameSpace.Context.GetGenericType(ParsedType, 0, TypeList, true);
				BacktrackPosition = TokenContext.CurrentPosition;
			}
		}
		while(TokenContext.MatchToken("[")) {  // Array
			if(!TokenContext.MatchToken("]")) {
				TokenContext.CurrentPosition = BacktrackPosition;
				return new GtSyntaxTree(Pattern, NameSpace, Token, ParsedType);
			}
			ParsedType = NameSpace.Context.GetGenericType1(NameSpace.Context.ArrayType, ParsedType, true);
			BacktrackPosition = TokenContext.CurrentPosition;
		}
		return new GtSyntaxTree(Pattern, NameSpace, Token, ParsedType);
	}

	public static ParseConst(NameSpace: GtNameSpace, TokenContext: GtTokenContext, LeftTree: GtSyntaxTree, Pattern: GtSyntaxPattern): GtSyntaxTree {
		var Token: GtToken = TokenContext.Next();
		var ConstValue: Object = NameSpace.GetSymbol(Token.ParsedText);
		if(ConstValue != null) {
			return new GtSyntaxTree(Pattern, NameSpace, Token, ConstValue);
		}
		return null; // Not Matched
	}

	public static TypeConst(Gamma: GtTypeEnv, ParsedTree: GtSyntaxTree, ContextType: GtType): GtNode {
		if((typeof ParsedTree.ConstValue == 'string' || ParsedTree.ConstValue instanceof String)) {
			ParsedTree.ConstValue = LibGreenTea.UnescapeString(<string> ParsedTree.ConstValue);
		}
		return Gamma.Generator.CreateConstNode(Gamma.Context.GuessType(ParsedTree.ConstValue), ParsedTree, ParsedTree.ConstValue);
	}

	public static ParseNull(NameSpace: GtNameSpace, TokenContext: GtTokenContext, LeftTree: GtSyntaxTree, Pattern: GtSyntaxPattern): GtSyntaxTree {
		var Token: GtToken = TokenContext.GetMatchedToken("null");
		var NewTree: GtSyntaxTree = new GtSyntaxTree(Pattern, NameSpace, Token, null);
		return NewTree;
	}

	public static TypeNull(Gamma: GtTypeEnv, ParsedTree: GtSyntaxTree, ContextType: GtType): GtNode {
		var ThisType: GtType = ContextType;
		if(ThisType == Gamma.VarType) {
			ThisType = Gamma.AnyType;
		}
		return Gamma.Generator.CreateNullNode(ThisType, ParsedTree);
	}

	public static ParseSymbol(NameSpace: GtNameSpace, TokenContext: GtTokenContext, LeftTree: GtSyntaxTree, Pattern: GtSyntaxPattern): GtSyntaxTree {
		var TypeTree: GtSyntaxTree = TokenContext.ParsePattern(NameSpace, "$Type$", Optional);
		if(TypeTree != null) {
			var DeclTree: GtSyntaxTree = TokenContext.ParsePatternAfter(NameSpace, TypeTree, "$FuncDecl$", Optional);
			if(DeclTree != null) {
				return DeclTree;
			}
			DeclTree = TokenContext.ParsePatternAfter(NameSpace, TypeTree, "$VarDecl$", Optional);
			if(DeclTree != null) {
				return DeclTree;
			}
			return TypeTree;
		}
		var Token: GtToken = TokenContext.Next();
//		/*local*/Object ConstValue = NameSpace.GetSymbol(Token.ParsedText);
//		if(ConstValue != null && !(ConstValue instanceof GtType)) {
//			return new GtSyntaxTree(NameSpace.GetPattern("$Const$"), NameSpace, Token, ConstValue);
//		}
		return new GtSyntaxTree(NameSpace.GetPattern("$Variable$"), NameSpace, Token, null);
	}

	public static ParseVariable(NameSpace: GtNameSpace, TokenContext: GtTokenContext, LeftTree: GtSyntaxTree, Pattern: GtSyntaxPattern): GtSyntaxTree {
		var Token: GtToken = TokenContext.Next();
		var ch: number = LibGreenTea.CharAt(Token.ParsedText, 0);
		if(LibGreenTea.IsLetter(ch) || ch == 95/*_*/) {
			return new GtSyntaxTree(Pattern, NameSpace, Token, null);
		}
		return null;
	}

	public static TypeVariable(Gamma: GtTypeEnv, ParsedTree: GtSyntaxTree, ContextType: GtType): GtNode {
		var Name: string = ParsedTree.KeyToken.ParsedText;
		var VariableInfo: GtVariableInfo = Gamma.LookupDeclaredVariable(Name);
		if(VariableInfo != null) {
			return Gamma.Generator.CreateLocalNode(VariableInfo.Type, ParsedTree, VariableInfo.NativeName);
		}
		if(Name.equals("this")) {
			VariableInfo = Gamma.LookupDeclaredVariable(Gamma.Generator.GetRecvName());
			if(VariableInfo != null) {
				return Gamma.Generator.CreateLocalNode(VariableInfo.Type, ParsedTree, VariableInfo.NativeName);
			}
		}
		var ConstValue: Object = <Object> ParsedTree.NameSpace.GetSymbol(Name);
		if(ConstValue != null) {
			return Gamma.Generator.CreateConstNode(Gamma.Context.GuessType(ConstValue), ParsedTree, ConstValue);
		}
		var Node: GtNode = Gamma.Generator.CreateLocalNode(Gamma.AnyType, ParsedTree, Name + Gamma.Generator.BlockComment("undefined"));
		return Gamma.ReportTypeResult(ParsedTree, Node, TypeErrorLevel, "undefined name: " + Name);
	}

	public static ParseVarDecl(NameSpace: GtNameSpace, TokenContext: GtTokenContext, LeftTree: GtSyntaxTree, Pattern: GtSyntaxPattern): GtSyntaxTree {
		var Tree: GtSyntaxTree = new GtSyntaxTree(Pattern, NameSpace, TokenContext.GetToken(), null);
		if(LeftTree == null) {
			Tree.SetMatchedPatternAt(VarDeclType, NameSpace, TokenContext, "$Type$", Required);
		}
		else {
			Tree.SetSyntaxTreeAt(VarDeclType, LeftTree);
		}
		Tree.SetMatchedPatternAt(VarDeclName, NameSpace, TokenContext, "$Variable$", Required);
		if(Tree.IsEmptyOrError()) {
			return null;
		}
		if(TokenContext.MatchToken("=")) {
			Tree.SetMatchedPatternAt(VarDeclValue, NameSpace, TokenContext, "$Expression$", Required);
		}
		while(TokenContext.MatchToken(",")) {
			var NextTree: GtSyntaxTree = new GtSyntaxTree(Pattern, NameSpace, Tree.KeyToken, null);
			NextTree.SetSyntaxTreeAt(VarDeclType, Tree.GetSyntaxTreeAt(VarDeclType));
			Tree = LinkTree(Tree, NextTree);
			Tree.SetMatchedPatternAt(VarDeclName, NameSpace, TokenContext, "$Variable$", Required);
			if(TokenContext.MatchToken("=")) {
				Tree.SetMatchedPatternAt(VarDeclValue, NameSpace, TokenContext, "$Expression$", Required);
			}
		}
		return Tree;
	}

	public static TypeVarDecl(Gamma: GtTypeEnv, ParsedTree: GtSyntaxTree, ContextType: GtType): GtNode {
		var VarFlag: number = Gamma.Generator.ParseVarFlag(0, ParsedTree.Annotation);
		var TypeTree: GtSyntaxTree = ParsedTree.GetSyntaxTreeAt(VarDeclType);
		var NameTree: GtSyntaxTree = ParsedTree.GetSyntaxTreeAt(VarDeclName);
		var ValueTree: GtSyntaxTree = ParsedTree.GetSyntaxTreeAt(VarDeclValue);
		var DeclType: GtType = TypeTree.GetParsedType();
		var VariableName: string = NameTree.KeyToken.ParsedText;
		Gamma.AppendDeclaredVariable(VarFlag, DeclType, VariableName);
		var VariableNode: GtNode = Gamma.TypeCheck(NameTree, DeclType, DefaultTypeCheckPolicy);
		if(VariableNode.IsError()) {
			return VariableNode;
		}
		var InitValueNode: GtNode = (ValueTree == null) ? Gamma.CreateDefaultValue(ParsedTree, DeclType) : Gamma.TypeCheck(ValueTree, DeclType, DefaultTypeCheckPolicy);
		var BlockNode: GtNode = Gamma.TypeBlock(ParsedTree.NextTree, ContextType);
		ParsedTree.NextTree = null;
		return Gamma.Generator.CreateLetNode(DeclType, ParsedTree, DeclType, (<LocalNode>VariableNode).NativeName, InitValueNode, BlockNode);
	}

	// Parse And Type
	public static ParseIntegerLiteral(NameSpace: GtNameSpace, TokenContext: GtTokenContext, LeftTree: GtSyntaxTree, Pattern: GtSyntaxPattern): GtSyntaxTree {
		var Token: GtToken = TokenContext.Next();
		return new GtSyntaxTree(Pattern, NameSpace, Token, LibGreenTea.ParseInt(Token.ParsedText));
	}

	public static ParseStringLiteral(NameSpace: GtNameSpace, TokenContext: GtTokenContext, LeftTree: GtSyntaxTree, Pattern: GtSyntaxPattern): GtSyntaxTree {
		var Token: GtToken = TokenContext.Next(); /* this must be \" and we should eat it*/
		var NewTree: GtSyntaxTree = new GtSyntaxTree(Pattern, NameSpace, Token, Token.ParsedText);
		return NewTree;
	}

	public static ParseExpression(NameSpace: GtNameSpace, TokenContext: GtTokenContext, LeftTree: GtSyntaxTree, Pattern: GtSyntaxPattern): GtSyntaxTree {
		return ParseExpression(NameSpace, TokenContext);
	}

	public static ParseUnary(NameSpace: GtNameSpace, TokenContext: GtTokenContext, LeftTree: GtSyntaxTree, Pattern: GtSyntaxPattern): GtSyntaxTree {
		var Token: GtToken = TokenContext.Next();
		var Tree: GtSyntaxTree = new GtSyntaxTree(Pattern, NameSpace, Token, null);
		Tree.SetMatchedPatternAt(UnaryTerm, NameSpace, TokenContext, "$Expression$", Required);
		return Tree;
	}

	public static TypeUnary(Gamma: GtTypeEnv, ParsedTree: GtSyntaxTree, ContextType: GtType): GtNode {
		var OperatorSymbol: string = ParsedTree.KeyToken.ParsedText;
		var ExprNode: GtNode  = ParsedTree.TypeCheckNodeAt(UnaryTerm, Gamma, Gamma.VarType, DefaultTypeCheckPolicy);
		if(ExprNode.IsError()) {
			return ExprNode;
		}
		var BaseType: GtType = ExprNode.Type;
		var ReturnType: GtType = Gamma.AnyType;
		var ResolvedFunc: GtFunc = null;
		var PolyFunc: GtPolyFunc = ParsedTree.NameSpace.GetMethod(BaseType, OperatorSymbol, true);
		if(PolyFunc != null) {
			ResolvedFunc = PolyFunc.ResolveUnaryFunc(Gamma, ParsedTree, ExprNode);
		}
		if(ResolvedFunc == null) {
			Gamma.Context.ReportError(TypeErrorLevel, ParsedTree.KeyToken, "mismatched operators: " + PolyFunc);
		}
		else {
			ReturnType = ResolvedFunc.GetReturnType();
		}
		var UnaryNode: GtNode =  Gamma.Generator.CreateUnaryNode(ReturnType, ParsedTree, ResolvedFunc, ExprNode);
		if(ResolvedFunc == null && !BaseType.IsDynamic()) {
			return Gamma.ReportTypeResult(ParsedTree, UnaryNode, TypeErrorLevel, "undefined operator: "+ OperatorSymbol + " of " + BaseType);
		}
		return UnaryNode;
	}

	public static ParseBinary(NameSpace: GtNameSpace, TokenContext: GtTokenContext, LeftTree: GtSyntaxTree, Pattern: GtSyntaxPattern): GtSyntaxTree {
		var Token: GtToken = TokenContext.Next();
		var RightTree: GtSyntaxTree = ParseExpression(NameSpace, TokenContext);
		if(IsEmptyOrError(RightTree)) {
			return RightTree;
		}
		if(RightTree.Pattern.IsBinaryOperator()) {
			if(Pattern.IsLeftJoin(RightTree.Pattern)) {
				var NewTree: GtSyntaxTree = new GtSyntaxTree(Pattern, NameSpace, Token, null);
				NewTree.SetSyntaxTreeAt(LeftHandTerm, LeftTree);
				NewTree.SetSyntaxTreeAt(RightHandTerm, RightTree.GetSyntaxTreeAt(LeftHandTerm));
				RightTree.SetSyntaxTreeAt(LeftHandTerm, NewTree);
				return RightTree;
			}
		}
		var NewTree: GtSyntaxTree = new GtSyntaxTree(Pattern, NameSpace, Token, null);
		NewTree.SetSyntaxTreeAt(LeftHandTerm, LeftTree);
		NewTree.SetSyntaxTreeAt(RightHandTerm, RightTree);
		if(RightTree.NextTree != null) {
			LinkTree(NewTree, RightTree.NextTree);
			RightTree.NextTree = null;
		}
		return NewTree;
	}

	public static TypeBinary(Gamma: GtTypeEnv, ParsedTree: GtSyntaxTree, ContextType: GtType): GtNode {
		var OperatorSymbol: string = ParsedTree.KeyToken.ParsedText;
		var LeftNode: GtNode  = ParsedTree.TypeCheckNodeAt(LeftHandTerm, Gamma, Gamma.VarType, DefaultTypeCheckPolicy);
		var RightNode: GtNode = ParsedTree.TypeCheckNodeAt(RightHandTerm, Gamma, Gamma.VarType, DefaultTypeCheckPolicy);
		if(LeftNode.IsError()) {
			return LeftNode;
		}
		if(RightNode.IsError()) {
			return RightNode;
		}
		var BaseType: GtType = LeftNode.Type;
		var ReturnType: GtType = Gamma.AnyType;
		var ResolvedFunc: GtFunc = null;
		var PolyFunc: GtPolyFunc = ParsedTree.NameSpace.GetMethod(BaseType, OperatorSymbol, true);
		if(PolyFunc != null) {
			var BinaryNodes: GtNode[] = new Array<GtNode>(2);
			BinaryNodes[0] = LeftNode;
			BinaryNodes[1] = RightNode;
			ResolvedFunc = PolyFunc.ResolveBinaryFunc(Gamma, BinaryNodes);
			LeftNode = BinaryNodes[0];
			RightNode = BinaryNodes[1];
		}
		if(ResolvedFunc == null) {
			Gamma.Context.ReportError(TypeErrorLevel, ParsedTree.KeyToken, "mismatched operators: " + PolyFunc);
		}
		else {
			ReturnType = ResolvedFunc.GetReturnType();
		}
		var BinaryNode: GtNode =  Gamma.Generator.CreateBinaryNode(ReturnType, ParsedTree, ResolvedFunc, LeftNode, RightNode);
		if(ResolvedFunc == null && !BaseType.IsDynamic()) {
			return Gamma.ReportTypeResult(ParsedTree, BinaryNode, TypeErrorLevel, "undefined operator: "+ OperatorSymbol + " of " + LeftNode.Type);
		}
		return BinaryNode;
	}

	// PatternName: "("
	public static ParseGroup(NameSpace: GtNameSpace, TokenContext: GtTokenContext, LeftTree: GtSyntaxTree, Pattern: GtSyntaxPattern): GtSyntaxTree {
		var ParseFlag: number = TokenContext.ParseFlag;
		TokenContext.ParseFlag |= SkipIndentParseFlag;
		var GroupTree: GtSyntaxTree = new GtSyntaxTree(Pattern, NameSpace, TokenContext.GetMatchedToken("("), null);
		var Tree: GtSyntaxTree = TokenContext.ParsePattern(NameSpace, "$Expression$", Required);
		GroupTree.AppendParsedTree(Tree);
		if(!TokenContext.MatchToken(")")) {
			GroupTree = TokenContext.ReportExpectedToken(")");
		}
		TokenContext.ParseFlag = ParseFlag;
		return GroupTree;
	}

	public static TypeGroup(Gamma: GtTypeEnv, ParsedTree: GtSyntaxTree, ContextType: GtType): GtNode {
		return ParsedTree.TypeCheckNodeAt(UnaryTerm, Gamma, ContextType, DefaultTypeCheckPolicy);
	}

	// PatternName: "(" "to" $Type$ ")"
	public static ParseCast(NameSpace: GtNameSpace, TokenContext: GtTokenContext, LeftTree: GtSyntaxTree, Pattern: GtSyntaxPattern): GtSyntaxTree {
		var ParseFlag: number = TokenContext.ParseFlag;
		TokenContext.ParseFlag |= SkipIndentParseFlag;
		var FirstToken: GtToken = TokenContext.Next(); // skip the first token
		var CastTree: GtSyntaxTree = null;
		if(TokenContext.MatchToken("to")) {
			CastTree = new GtSyntaxTree(Pattern, NameSpace, TokenContext.GetBeforeToken(), null);
		}
		else if(TokenContext.MatchToken("as")) {
			CastTree = new GtSyntaxTree(Pattern, NameSpace, TokenContext.GetBeforeToken(), null);
		}
		else {
			CastTree = new GtSyntaxTree(Pattern, NameSpace, FirstToken, null);
		}
		CastTree.SetMatchedPatternAt(LeftHandTerm, NameSpace, TokenContext, "$Type$", Required);
		CastTree.SetMatchedTokenAt(NoWhere, NameSpace, TokenContext, ")", Required);
		TokenContext.ParseFlag = ParseFlag;
		CastTree.SetMatchedPatternAt(RightHandTerm, NameSpace, TokenContext, "$Expression$", Required);
		return CastTree;
	}

	public static TypeCast(Gamma: GtTypeEnv, ParsedTree: GtSyntaxTree, ContextType: GtType): GtNode {
		var CastType: GtType = ParsedTree.GetSyntaxTreeAt(LeftHandTerm).GetParsedType();
		var TypeCheckPolicy: number = CastPolicy;
		return ParsedTree.TypeCheckNodeAt(RightHandTerm, Gamma, CastType, TypeCheckPolicy);
	}

	public static ParseGetter(NameSpace: GtNameSpace, TokenContext: GtTokenContext, LeftTree: GtSyntaxTree, Pattern: GtSyntaxPattern): GtSyntaxTree {
		TokenContext.MatchToken(".");
		var Token: GtToken = TokenContext.Next();
		if(Token.IsNameSymbol()) {
			var NewTree: GtSyntaxTree = new GtSyntaxTree(Pattern, NameSpace, Token, null);
			NewTree.AppendParsedTree(LeftTree);
			return NewTree;
		}
		return TokenContext.ReportExpectedToken("field name");
	}

	public static TypeGetter(Gamma: GtTypeEnv, ParsedTree: GtSyntaxTree, ContextType: GtType): GtNode {
		var Name: string = ParsedTree.KeyToken.ParsedText;
		var ObjectNode: GtNode = ParsedTree.TypeCheckNodeAt(UnaryTerm, Gamma, Gamma.VarType, DefaultTypeCheckPolicy);
		if(ObjectNode.IsError()) {
			return ObjectNode;
		}
		// To start, check class const such as Math.Pi if base is a type value
		if(ObjectNode instanceof ConstNode && ObjectNode.Type == Gamma.Context.TypeType) {
			var ObjectType: GtType = <GtType>(<ConstNode>ObjectNode).ConstValue;
			var ConstValue: Object = ParsedTree.NameSpace.GetClassSymbol(ObjectType, Name, true);
			if(ConstValue != null) {
				return Gamma.Generator.CreateConstNode(Gamma.Context.GuessType(ConstValue), ParsedTree, ConstValue);
			}
		}
		var GetterFunc: GtFunc = ParsedTree.NameSpace.GetGetterFunc(ObjectNode.Type, Name, true);
		var ReturnType: GtType = (GetterFunc != null) ? GetterFunc.GetReturnType() : Gamma.AnyType;
		var Node: GtNode = Gamma.Generator.CreateGetterNode(ReturnType, ParsedTree, GetterFunc, ObjectNode);
		if(GetterFunc == null) {
			if(!ObjectNode.Type.IsDynamic() && ContextType != Gamma.FuncType) {
				return Gamma.ReportTypeResult(ParsedTree, Node, TypeErrorLevel, "undefined name " + Name + " of " + ObjectNode.Type);
			}
		}
		return Node;
	}

	public static ParseApply(NameSpace: GtNameSpace, TokenContext: GtTokenContext, LeftTree: GtSyntaxTree, Pattern: GtSyntaxPattern): GtSyntaxTree {
		var ParseFlag: number = TokenContext.ParseFlag;
		TokenContext.ParseFlag |= SkipIndentParseFlag;
		var FuncTree: GtSyntaxTree = new GtSyntaxTree(Pattern, NameSpace, TokenContext.GetMatchedToken("("), null);
		FuncTree.AppendParsedTree(LeftTree);
		if(!TokenContext.MatchToken(")")) {
			while(!FuncTree.IsEmptyOrError()) {
				if(TokenContext.CurrentPosition > 150) {
					LibGreenTea.DebugP("");
				}
				var Tree: GtSyntaxTree = TokenContext.ParsePattern(NameSpace, "$Expression$", Required);
				FuncTree.AppendParsedTree(Tree);
				if(TokenContext.MatchToken(")")) {
					break;
				}
				FuncTree.SetMatchedTokenAt(NoWhere, NameSpace, TokenContext, ",", Required);
			}
		}
		TokenContext.ParseFlag = ParseFlag;
		return FuncTree;
	}

	public static TypeApply(Gamma: GtTypeEnv, ParsedTree: GtSyntaxTree, ContextType: GtType): GtNode {
		var FuncNode: GtNode = ParsedTree.TypeCheckNodeAt(0, Gamma, Gamma.FuncType, NoCheckPolicy);
		if(FuncNode.IsError()) {
			return FuncNode;
		}
		var NodeList: Array<GtNode> = new Array<GtNode>();
		NodeList.add(FuncNode);
		var ResolvedFunc: GtFunc = null;
		var TreeIndex: number = 1;
		if(FuncNode instanceof GetterNode) { /* Func style .. o.f x, y, .. */
			var BaseNode: GtNode = (<GetterNode>FuncNode).Expr;
			var FuncName: string = FuncNode.Token.ParsedText;
			NodeList.add(BaseNode);
			var PolyFunc: GtPolyFunc = ParsedTree.NameSpace.GetMethod(BaseNode.Type, FuncName, true);
			ResolvedFunc = PolyFunc.ResolveFunc(Gamma, ParsedTree, TreeIndex, NodeList);
		}
		else if(FuncNode instanceof ConstNode) { /* Func style .. f x, y .. */
			var Func: Object = (<ConstNode>FuncNode).ConstValue;
			if(Func instanceof GtFunc) {
				ResolvedFunc = <GtFunc>Func;
			}
			else if(Func instanceof GtType) {  // constructor;
				var ClassType: GtType = <GtType>Func;
				var PolyFunc: GtPolyFunc = ParsedTree.NameSpace.GetConstructorFunc(/*GtFunc*/ClassType);
				if(PolyFunc == null) {
					return Gamma.CreateSyntaxErrorNode(ParsedTree, "no constructor: " + ClassType);
				}
				NodeList.set(0, Gamma.Generator.CreateNullNode(ClassType, ParsedTree));
				ResolvedFunc = PolyFunc.ResolveFunc(Gamma, ParsedTree, 1, NodeList);
				if(ResolvedFunc == null) {
					Gamma.Context.ReportError(TypeErrorLevel, ParsedTree.KeyToken, "mismatched : constructor" + PolyFunc);
				}
				var NewNode: GtNode = Gamma.Generator.CreateNewNode(ClassType, ParsedTree, ResolvedFunc);
				NewNode.AppendNodeList(NodeList);
				return NewNode;
			}
			else if(Func instanceof GtPolyFunc) {
				var PolyFunc: GtPolyFunc = <GtPolyFunc>Func;
				var ParamList: Array<GtNode> = new Array<GtNode>();
				ResolvedFunc = PolyFunc.ResolveFunc(Gamma, ParsedTree, 1, ParamList);
				if(ResolvedFunc != null) {
					// reset ConstValue as if non-polymorphic function were found
					(<ConstNode>FuncNode).ConstValue = ResolvedFunc;
					(<ConstNode>FuncNode).Type = ResolvedFunc.GetFuncType();
				}
			}
		}
		var ReturnType: GtType = Gamma.AnyType;
		if(FuncNode.Type == Gamma.AnyType) {
			while(TreeIndex < ListSize(ParsedTree.TreeList)) {
				var Node: GtNode = ParsedTree.TypeCheckNodeAt(TreeIndex, Gamma, Gamma.VarType, DefaultTypeCheckPolicy);
				if(Node.IsError()) {
					return Node;
				}
				NodeList.add(Node);
				TreeIndex = TreeIndex + 1;
			}
		}
		else if(FuncNode.Type.BaseType == Gamma.FuncType) {
			var FuncType: GtType = FuncNode.Type;
			LibGreenTea.Assert(ListSize(ParsedTree.TreeList) == FuncType.TypeParams.length); // FIXME: add check paramerter size
			while(TreeIndex < ListSize(ParsedTree.TreeList)) {
				var Node: GtNode = ParsedTree.TypeCheckNodeAt(TreeIndex, Gamma, FuncType.TypeParams[TreeIndex], DefaultTypeCheckPolicy);
				if(Node.IsError()) {
					return Node;
				}
				NodeList.add(Node);
				TreeIndex = TreeIndex + 1;
			}
			ReturnType = FuncType.TypeParams[0];
		}
		else {
			return Gamma.CreateSyntaxErrorNode(ParsedTree, FuncNode.Type + " is not applicapable");
		}
		var Node: GtNode = Gamma.Generator.CreateApplyNode(ReturnType, ParsedTree, ResolvedFunc);
		Node.AppendNodeList(NodeList);
		return Node;
	}

	public static TypeAnd(Gamma: GtTypeEnv, ParsedTree: GtSyntaxTree, ContextType: GtType): GtNode {
		var LeftNode: GtNode = ParsedTree.TypeCheckNodeAt(LeftHandTerm, Gamma, Gamma.BooleanType, DefaultTypeCheckPolicy);
		var RightNode: GtNode = ParsedTree.TypeCheckNodeAt(RightHandTerm, Gamma, Gamma.BooleanType, DefaultTypeCheckPolicy);
		return Gamma.Generator.CreateAndNode(Gamma.BooleanType, ParsedTree, LeftNode, RightNode);
	}

	public static TypeOr(Gamma: GtTypeEnv, ParsedTree: GtSyntaxTree, ContextType: GtType): GtNode {
		var LeftNode: GtNode = ParsedTree.TypeCheckNodeAt(LeftHandTerm, Gamma, Gamma.BooleanType, DefaultTypeCheckPolicy);
		var RightNode: GtNode = ParsedTree.TypeCheckNodeAt(RightHandTerm, Gamma, Gamma.BooleanType, DefaultTypeCheckPolicy);
		return Gamma.Generator.CreateOrNode(Gamma.BooleanType, ParsedTree, LeftNode, RightNode);
	}

	public static TypeAssign(Gamma: GtTypeEnv, ParsedTree: GtSyntaxTree, ContextType: GtType): GtNode {
		var LeftNode: GtNode = ParsedTree.TypeCheckNodeAt(LeftHandTerm, Gamma, Gamma.VarType, DefaultTypeCheckPolicy);
		var RightNode: GtNode = ParsedTree.TypeCheckNodeAt(RightHandTerm, Gamma, LeftNode.Type, DefaultTypeCheckPolicy);
		return Gamma.Generator.CreateAssignNode(LeftNode.Type, ParsedTree, LeftNode, RightNode);
	}

	public static ParseEmpty(NameSpace: GtNameSpace, TokenContext: GtTokenContext, LeftTree: GtSyntaxTree, Pattern: GtSyntaxPattern): GtSyntaxTree {
		return new GtSyntaxTree(Pattern, NameSpace, TokenContext.GetBeforeToken(), null);
	}

	public static TypeEmpty(Gamma: GtTypeEnv, ParsedTree: GtSyntaxTree, Type: GtType): GtNode {
		return Gamma.Generator.CreateEmptyNode(Gamma.VoidType);
	}

	public static ParseBlock(ParentNameSpace: GtNameSpace, TokenContext: GtTokenContext, LeftTree: GtSyntaxTree, Pattern: GtSyntaxPattern): GtSyntaxTree {
		if(TokenContext.MatchToken("{")) {
			var PrevTree: GtSyntaxTree = null;
			var NameSpace: GtNameSpace = new GtNameSpace(ParentNameSpace.Context, ParentNameSpace);
			while(TokenContext.SkipEmptyStatement()) {
				if(TokenContext.MatchToken("}")) {
					break;
				}
				var Annotation: GtMap = TokenContext.SkipAndGetAnnotation(true);
				var CurrentTree: GtSyntaxTree = ParseExpression(NameSpace, TokenContext);
				if(IsEmptyOrError(CurrentTree)) {
					return CurrentTree;
				}
				CurrentTree.SetAnnotation(Annotation);
				PrevTree = LinkTree(PrevTree, CurrentTree);
			}
			if(PrevTree == null) {
				return TokenContext.ParsePattern(NameSpace, "$Empty$", Required);
			}
			return TreeHead(PrevTree);
		}
		return null;
	}

	public static ParseStatement(NameSpace: GtNameSpace, TokenContext: GtTokenContext, LeftTree: GtSyntaxTree, Pattern: GtSyntaxPattern): GtSyntaxTree {
		var StmtTree: GtSyntaxTree = TokenContext.ParsePattern(NameSpace, "$Block$", Optional);
		if(StmtTree == null) {
			StmtTree = ParseExpression(NameSpace, TokenContext);
		}
		if(StmtTree == null) {
			StmtTree = TokenContext.ParsePattern(NameSpace, "$Empty$", Required);
		}
		return StmtTree;
	}

	public static TypeBlock(Gamma: GtTypeEnv, ParsedTree: GtSyntaxTree, ContextType: GtType): GtNode {
		return Gamma.TypeBlock(ParsedTree, ContextType);
	}

	// If Statement
	public static ParseIf(NameSpace: GtNameSpace, TokenContext: GtTokenContext, LeftTree: GtSyntaxTree, Pattern: GtSyntaxPattern): GtSyntaxTree {
		var ParseFlag: number = TokenContext.ParseFlag;
		TokenContext.ParseFlag |= SkipIndentParseFlag;
		var Token: GtToken = TokenContext.GetMatchedToken("if");
		var NewTree: GtSyntaxTree = new GtSyntaxTree(Pattern, NameSpace, Token, null);
		NewTree.SetMatchedTokenAt(NoWhere, NameSpace, TokenContext, "(", Required);
		NewTree.SetMatchedPatternAt(IfCond, NameSpace, TokenContext, "$Expression$", Required);
		NewTree.SetMatchedTokenAt(NoWhere, NameSpace, TokenContext, ")", Required);
		NewTree.SetMatchedPatternAt(IfThen, NameSpace, TokenContext, "$Statement$", Required);
		if(TokenContext.MatchToken("else")) {
			NewTree.SetMatchedPatternAt(IfElse, NameSpace, TokenContext, "$Statement$", Required);
		}
		TokenContext.ParseFlag = ParseFlag;
		return NewTree;
	}

	public static TypeIf(Gamma: GtTypeEnv, ParsedTree: GtSyntaxTree, ContextType: GtType): GtNode {
		var CondNode: GtNode = ParsedTree.TypeCheckNodeAt(IfCond, Gamma, Gamma.BooleanType, DefaultTypeCheckPolicy);
		var ThenNode: GtNode = Gamma.TypeBlock(ParsedTree.GetSyntaxTreeAt(IfThen), ContextType);
		var ElseNode: GtNode = Gamma.TypeBlock(ParsedTree.GetSyntaxTreeAt(IfElse), ThenNode.Type);
		return Gamma.Generator.CreateIfNode(ThenNode.Type, ParsedTree, CondNode, ThenNode, ElseNode);
	}

	// While Statement
	public static ParseWhile(NameSpace: GtNameSpace, TokenContext: GtTokenContext, LeftTree: GtSyntaxTree, Pattern: GtSyntaxPattern): GtSyntaxTree {
		var WhileTree: GtSyntaxTree = new GtSyntaxTree(Pattern, NameSpace, TokenContext.GetMatchedToken("while"), null);
		WhileTree.SetMatchedTokenAt(NoWhere, NameSpace, TokenContext, "(", Required);
		WhileTree.SetMatchedPatternAt(WhileCond, NameSpace, TokenContext, "$Expression$", Required);
		WhileTree.SetMatchedTokenAt(NoWhere, NameSpace, TokenContext, ")", Required);
		WhileTree.SetMatchedPatternAt(WhileBody, NameSpace, TokenContext, "$Block$", Required);
		return WhileTree;
	}

	public static TypeWhile(Gamma: GtTypeEnv, ParsedTree: GtSyntaxTree, ContextType: GtType): GtNode {
		var CondNode: GtNode = ParsedTree.TypeCheckNodeAt(WhileCond, Gamma, Gamma.BooleanType, DefaultTypeCheckPolicy);
		var BodyNode: GtNode = Gamma.TypeBlock(ParsedTree.GetSyntaxTreeAt(WhileBody), ContextType);
		return Gamma.Generator.CreateWhileNode(BodyNode.Type, ParsedTree, CondNode, BodyNode);
	}

	// Break/Continue Statement
	public static ParseBreak(NameSpace: GtNameSpace, TokenContext: GtTokenContext, LeftTree: GtSyntaxTree, Pattern: GtSyntaxPattern): GtSyntaxTree {
		var Token: GtToken = TokenContext.GetMatchedToken("break");
		var NewTree: GtSyntaxTree = new GtSyntaxTree(Pattern, NameSpace, Token, null);
		return NewTree;
	}

	public static TypeBreak(Gamma: GtTypeEnv, ParsedTree: GtSyntaxTree, ContextType: GtType): GtNode {
		return Gamma.Generator.CreateBreakNode(Gamma.VoidType, ParsedTree, "");
	}

	public static ParseContinue(NameSpace: GtNameSpace, TokenContext: GtTokenContext, LeftTree: GtSyntaxTree, Pattern: GtSyntaxPattern): GtSyntaxTree {
		var Token: GtToken = TokenContext.GetMatchedToken("continue");
		var NewTree: GtSyntaxTree = new GtSyntaxTree(Pattern, NameSpace, Token, null);
		return NewTree;
	}

	public static TypeContinue(Gamma: GtTypeEnv, ParsedTree: GtSyntaxTree, ContextType: GtType): GtNode {
		return Gamma.Generator.CreateContinueNode(Gamma.VoidType, ParsedTree, "");
	}

	// Return Statement
	public static ParseReturn(NameSpace: GtNameSpace, TokenContext: GtTokenContext, LeftTree: GtSyntaxTree, Pattern: GtSyntaxPattern): GtSyntaxTree {
		var ReturnTree: GtSyntaxTree = new GtSyntaxTree(Pattern, NameSpace, TokenContext.GetMatchedToken("return"), null);
		ReturnTree.SetMatchedPatternAt(ReturnExpr, NameSpace, TokenContext, "$Expression$", Optional);
		return ReturnTree;
	}

	public static TypeReturn(Gamma: GtTypeEnv, ParsedTree: GtSyntaxTree, ContextType: GtType): GtNode {
		ParsedTree.NextTree = null; // stop
		if(Gamma.IsTopLevel()) {
			return Gamma.UnsupportedTopLevelError(ParsedTree);
		}
		var ReturnType: GtType = Gamma.Func.GetReturnType();
		if(ParsedTree.HasNodeAt(ReturnExpr)) {
			var Expr: GtNode = ParsedTree.TypeCheckNodeAt(ReturnExpr, Gamma, ReturnType, DefaultTypeCheckPolicy);
			if(ReturnType == Gamma.VarType && !Expr.IsError()) {
				Gamma.Func.Types[0] = Expr.Type;
				Gamma.ReportTypeInference(ParsedTree.KeyToken, "return value of " + Gamma.Func.FuncName, Expr.Type);
			}
			if(ReturnType == Gamma.VoidType) {
				Gamma.Context.ReportError(WarningLevel, ParsedTree.KeyToken, "ignored return value");
				return Gamma.Generator.CreateReturnNode(ReturnType, ParsedTree, null);
			}
			return Gamma.Generator.CreateReturnNode(Expr.Type, ParsedTree, Expr);
		}
		else {
			if(ReturnType == Gamma.VarType) {
				Gamma.Func.Types[0] = Gamma.VoidType;
				Gamma.ReportTypeInference(ParsedTree.KeyToken, "return value of " + Gamma.Func.FuncName, Gamma.VoidType);
			}
			if(Gamma.Func.Is(ConstructorFunc)) {
				var ThisNode: GtNode = Gamma.CreateLocalNode(ParsedTree, Gamma.Generator.GetRecvName());
				return Gamma.Generator.CreateReturnNode(ThisNode.Type, ParsedTree, ThisNode);
			}
			if(ReturnType != Gamma.VoidType) {
				Gamma.Context.ReportError(WarningLevel, ParsedTree.KeyToken, "returning default value of " + ReturnType);
				return Gamma.Generator.CreateReturnNode(ReturnType, ParsedTree, Gamma.CreateDefaultValue(ParsedTree, ReturnType));
			}
			return Gamma.Generator.CreateReturnNode(ReturnType, ParsedTree, null);
		}
	}

	// try
	public static ParseTry(NameSpace: GtNameSpace, TokenContext: GtTokenContext, LeftTree: GtSyntaxTree, Pattern: GtSyntaxPattern): GtSyntaxTree {
		var TryTree: GtSyntaxTree = new GtSyntaxTree(Pattern, NameSpace, TokenContext.GetMatchedToken("try"), null);
		TryTree.SetMatchedPatternAt(TryBody, NameSpace, TokenContext, "$Block$", Required);
		if(TokenContext.MatchToken("catch")) {
			TryTree.SetMatchedTokenAt(NoWhere, NameSpace, TokenContext, "(", Required);
			TryTree.SetMatchedPatternAt(CatchVariable, NameSpace, TokenContext, "$VarDecl$", Required);
			TryTree.SetMatchedTokenAt(NoWhere, NameSpace, TokenContext, ")", Required);
			TryTree.SetMatchedPatternAt(CatchBody, NameSpace, TokenContext, "$Block$", Required);
		}
		if(TokenContext.MatchToken("finally")) {
			TryTree.SetMatchedPatternAt(FinallyBody, NameSpace, TokenContext, "$Block$", Required);
		}
		return TryTree;
	}

	public static TypeTry(Gamma: GtTypeEnv, ParsedTree: GtSyntaxTree, ContextType: GtType): GtNode {
		var FaultType: GtType = ContextType; // FIXME Gamma.FaultType;
		var TryNode: GtNode = Gamma.TypeBlock(ParsedTree.GetSyntaxTreeAt(TryBody), ContextType);
		var CatchExpr: GtNode = ParsedTree.TypeCheckNodeAt(CatchVariable, Gamma, FaultType, DefaultTypeCheckPolicy);
		var CatchNode: GtNode = Gamma.TypeBlock(ParsedTree.GetSyntaxTreeAt(CatchBody), ContextType);
		var FinallyNode: GtNode = Gamma.TypeBlock(ParsedTree.GetSyntaxTreeAt(FinallyBody), ContextType);
		return Gamma.Generator.CreateTryNode(TryNode.Type, ParsedTree, TryNode, CatchExpr, CatchNode, FinallyNode);
	}

	// throw $Expr$
	public static ParseThrow(NameSpace: GtNameSpace, TokenContext: GtTokenContext, LeftTree: GtSyntaxTree, Pattern: GtSyntaxPattern): GtSyntaxTree {
		var ThrowTree: GtSyntaxTree = new GtSyntaxTree(Pattern, NameSpace, TokenContext.GetMatchedToken("throw"), null);
		ThrowTree.SetMatchedPatternAt(ReturnExpr, NameSpace, TokenContext, "$Expression$", Required);
		return ThrowTree;
	}

	public static TypeThrow(Gamma: GtTypeEnv, ParsedTree: GtSyntaxTree, ContextType: GtType): GtNode {
		var FaultType: GtType = ContextType; // FIXME Gamma.FaultType;
		var ExprNode: GtNode = ParsedTree.TypeCheckNodeAt(ReturnExpr, Gamma, FaultType, DefaultTypeCheckPolicy);
		return Gamma.Generator.CreateThrowNode(ExprNode.Type, ParsedTree, ExprNode);
	}

	public static ParseSuper(NameSpace: GtNameSpace, TokenContext: GtTokenContext, LeftTree: GtSyntaxTree, Pattern: GtSyntaxPattern): GtSyntaxTree {
		var Token: GtToken =TokenContext.GetMatchedToken("super");
		var Tree: GtSyntaxTree = new GtSyntaxTree(Pattern, NameSpace, Token, null);
		var ParseFlag: number = TokenContext.ParseFlag;
		TokenContext.ParseFlag |= SkipIndentParseFlag;
		Tree.SetSyntaxTreeAt(CallExpressionOffset, new GtSyntaxTree(NameSpace.GetPattern("$Variable$"), NameSpace, Token, null));
		Tree.SetSyntaxTreeAt(CallParameterOffset,  new GtSyntaxTree(NameSpace.GetPattern("$Variable$"), NameSpace, new GtToken("this", 0), null));
		TokenContext.MatchToken("(");
		if(!TokenContext.MatchToken(")")) {
			while(!Tree.IsEmptyOrError()) {
				var ParamTree: GtSyntaxTree = TokenContext.ParsePattern(NameSpace, "$Expression$", Required);
				Tree.AppendParsedTree(ParamTree);
				if(TokenContext.MatchToken(")")) {
					break;
				}
				Tree.SetMatchedTokenAt(NoWhere, NameSpace, TokenContext, ",", Required);
			}
		}
		TokenContext.ParseFlag = ParseFlag;
		if(!Tree.IsEmptyOrError()) {
			// translate '$super$(this, $Params$)' => 'super(this, $Params$)'
			Tree.Pattern = NameSpace.GetExtendedPattern("(");
			return Tree;
		}
		return Tree;
	}
	// new $Type ( $Expr$ [, $Expr$] )
	public static ParseNew(NameSpace: GtNameSpace, TokenContext: GtTokenContext, LeftTree: GtSyntaxTree, Pattern: GtSyntaxPattern): GtSyntaxTree {
		var NewTree: GtSyntaxTree = new GtSyntaxTree(Pattern, NameSpace, TokenContext.GetMatchedToken("new"), null);
		var ParseFlag: number = TokenContext.ParseFlag;
		TokenContext.ParseFlag |= SkipIndentParseFlag;
		NewTree.SetMatchedPatternAt(CallExpressionOffset, NameSpace, TokenContext, "$Type$", Required);
		TokenContext.MatchToken("(");
		if(!TokenContext.MatchToken(")")) {
			while(!NewTree.IsEmptyOrError()) {
				var Tree: GtSyntaxTree = TokenContext.ParsePattern(NameSpace, "$Expression$", Required);
				NewTree.AppendParsedTree(Tree);
				if(TokenContext.MatchToken(")")) {
					break;
				}
				NewTree.SetMatchedTokenAt(NoWhere, NameSpace, TokenContext, ",", Required);
			}
		}
		TokenContext.ParseFlag = ParseFlag;
		if(NewTree.IsEmptyOrError()) {
			return null;
		}
		return NewTree;
	}

	// switch
	public static ParseEnum(NameSpace: GtNameSpace, TokenContext: GtTokenContext, LeftTree: GtSyntaxTree, Pattern: GtSyntaxPattern): GtSyntaxTree {
		var EnumTypeName: string = null;
		var NewEnumType: GtType = null;
		var VocabMap: GtMap = new GtMap();
		var EnumTree: GtSyntaxTree = new GtSyntaxTree(Pattern, NameSpace, TokenContext.GetMatchedToken("enum"), null);
		EnumTree.SetMatchedPatternAt(EnumNameTreeIndex, NameSpace, TokenContext, "$FuncName$", Required);  // $ClassName$ is better
		if(!EnumTree.IsEmptyOrError()) {
			EnumTypeName = EnumTree.GetSyntaxTreeAt(EnumNameTreeIndex).KeyToken.ParsedText;
			if(NameSpace.GetSymbol(EnumTypeName) != null) {
				NameSpace.Context.ReportError(WarningLevel, EnumTree.KeyToken, "already defined name: " + EnumTypeName);
			}
			NewEnumType = new GtType(NameSpace.Context, EnumClass, EnumTypeName, null, VocabMap);
		}
		EnumTree.SetMatchedTokenAt(NoWhere, NameSpace, TokenContext, "{", Required);
		var EnumValue: number = 0;
		while(!EnumTree.IsEmptyOrError()) {
			TokenContext.SkipIndent();
			if(TokenContext.MatchToken(",")) {
				continue;
			}
			if(TokenContext.MatchToken("}")) {
				break;
			}
			var Token: GtToken = TokenContext.Next();
			if(LibGreenTea.IsLetter(LibGreenTea.CharAt(Token.ParsedText, 0))) {
				if(VocabMap.get(Token.ParsedText) != null) {
					NameSpace.Context.ReportError(WarningLevel, Token, "already defined name: " + Token.ParsedText);
					continue;
				}
				VocabMap.put(Token.ParsedText, new GreenTeaEnum(NewEnumType, EnumValue, Token.ParsedText));
				EnumValue += 1;
				continue;
			}
		}
		if(!EnumTree.IsEmptyOrError()) {
			NameSpace.AppendTypeName(NewEnumType);
			EnumTree.ConstValue = NewEnumType;
		}
		return EnumTree;
	}

	public static TypeEnum(Gamma: GtTypeEnv, ParsedTree: GtSyntaxTree, ContextType: GtType): GtNode {
		var EnumType: Object = ParsedTree.ConstValue;
		return Gamma.Generator.CreateConstNode(Gamma.Context.GuessType(EnumType), ParsedTree, EnumType);
	}

	public static ParseSwitch(NameSpace: GtNameSpace, TokenContext: GtTokenContext, LeftTree: GtSyntaxTree, Pattern: GtSyntaxPattern): GtSyntaxTree {
		var SwitchTree: GtSyntaxTree = new GtSyntaxTree(Pattern, NameSpace, TokenContext.GetMatchedToken("switch"), null);
		SwitchTree.SetMatchedTokenAt(NoWhere, NameSpace, TokenContext, "(", Required);
		SwitchTree.SetMatchedPatternAt(CatchVariable, NameSpace, TokenContext, "$Expression$", Required);
		SwitchTree.SetMatchedTokenAt(NoWhere, NameSpace, TokenContext, ")", Required);
		SwitchTree.SetMatchedTokenAt(NoWhere, NameSpace, TokenContext, "{", Required);
		while(!SwitchTree.IsEmptyOrError() && !TokenContext.MatchToken("}")) {
			if(TokenContext.MatchToken("case")) {
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
	}

	public static TypeSwitch(Gamma: GtTypeEnv, ParsedTree: GtSyntaxTree, ContextType: GtType): GtNode {
		return null;
	}

	// const decl
	public static ParseConstDecl(NameSpace: GtNameSpace, TokenContext: GtTokenContext, LeftTree: GtSyntaxTree, Pattern: GtSyntaxPattern): GtSyntaxTree {
		var ConstDeclTree: GtSyntaxTree = new GtSyntaxTree(Pattern, NameSpace, TokenContext.GetMatchedToken("const"), null);
		var ClassNameTree: GtSyntaxTree = TokenContext.ParsePattern(NameSpace, "$Type$", Optional);
		var ConstClass: GtType = null;
		if(ClassNameTree != null) {
			ConstDeclTree.SetMatchedTokenAt(NoWhere, NameSpace, TokenContext, ".", Required);
			if(!ConstDeclTree.IsEmptyOrError()) {
				ConstDeclTree.SetSyntaxTreeAt(ConstDeclClassIndex, ClassNameTree);
				ConstClass = ConstDeclTree.GetParsedType();
			}
		}
		ConstDeclTree.SetMatchedPatternAt(ConstDeclNameIndex, NameSpace, TokenContext, "$Variable$", Required);
		ConstDeclTree.SetMatchedTokenAt(NoWhere, NameSpace, TokenContext, "=", Required);
		ConstDeclTree.SetMatchedPatternAt(ConstDeclValueIndex, NameSpace, TokenContext, "$Expression$", Required);

		if(!ConstDeclTree.IsEmptyOrError()) {
			var ConstName: string = ConstDeclTree.GetSyntaxTreeAt(ConstDeclNameIndex).KeyToken.ParsedText;
			if(ConstClass != null) {
				ConstName = ClassSymbol(ConstClass, ConstName);
			}
			var ConstValue: Object = null;
			if(ConstDeclTree.GetSyntaxTreeAt(ConstDeclValueIndex).Pattern.PatternName.equals("$Const$")) {
				ConstValue = ConstDeclTree.GetSyntaxTreeAt(ConstDeclValueIndex).ConstValue;
			}
			if(ConstValue == null) {

			}
			if(NameSpace.GetSymbol(ConstName) != null) {
				NameSpace.ReportOverrideName(ConstDeclTree.KeyToken, ConstClass, ConstName);
			}
			NameSpace.SetSymbol(ConstName, ConstValue);
		}
		return ConstDeclTree;
	}

	public static TypeConstDecl(Gamma: GtTypeEnv, ParsedTree: GtSyntaxTree, ContextType: GtType): GtNode {
		var NameTree: GtSyntaxTree = ParsedTree.GetSyntaxTreeAt(ConstDeclNameIndex);
		var ValueTree: GtSyntaxTree = ParsedTree.GetSyntaxTreeAt(ConstDeclValueIndex);
		var VariableName: string = NameTree.KeyToken.ParsedText;
		var ValueNode: GtNode = Gamma.TypeCheck(ValueTree, Gamma.AnyType, DefaultTypeCheckPolicy);
		if(!(ValueNode instanceof ConstNode)) {
			return Gamma.CreateSyntaxErrorNode(ParsedTree, "definition of variable " + VariableName + " is not constant");
		}
		var CNode: ConstNode = <ConstNode> ValueNode;
		Gamma.NameSpace.SetSymbol(VariableName, CNode.ConstValue);
		return Gamma.Generator.CreateEmptyNode(ContextType);
	}

	// FuncDecl
	public static ParseFuncName(NameSpace: GtNameSpace, TokenContext: GtTokenContext, LeftTree: GtSyntaxTree, Pattern: GtSyntaxPattern): GtSyntaxTree {
		var Token: GtToken = TokenContext.Next();
		if(Token != GtTokenContext.NullToken) {
			var ch: number = LibGreenTea.CharAt(Token.ParsedText, 0);
			if(ch != 46/*.*/) {
				return new GtSyntaxTree(Pattern, NameSpace, Token, Token.ParsedText);
			}
		}
		return null;
	}

	public static ParseFuncDecl(NameSpace: GtNameSpace, TokenContext: GtTokenContext, LeftTree: GtSyntaxTree, Pattern: GtSyntaxPattern): GtSyntaxTree {
		var FuncDeclTree: GtSyntaxTree = new GtSyntaxTree(Pattern, NameSpace, TokenContext.GetToken(), null);
		if(LeftTree == null) {
			FuncDeclTree.SetMatchedPatternAt(FuncDeclReturnType, NameSpace, TokenContext, "$Type$", Required);
		}
		else {
			FuncDeclTree.SetSyntaxTreeAt(FuncDeclReturnType, LeftTree);
		}
		FuncDeclTree.SetMatchedPatternAt(FuncDeclName, NameSpace, TokenContext, "$FuncName$", Required);
		FuncDeclTree.SetMatchedTokenAt(NoWhere, NameSpace, TokenContext, "(", Required);
		var ParseFlag: number = TokenContext.SetBackTrack(false);  // disabled
		var ParamBase: number = FuncDeclParam;
		while(!FuncDeclTree.IsEmptyOrError() && !TokenContext.MatchToken(")")) {
			TokenContext.SkipIndent();
			if(ParamBase != FuncDeclParam) {
				FuncDeclTree.SetMatchedTokenAt(NoWhere, NameSpace, TokenContext, ",", Required);
				TokenContext.SkipIndent();
			}
			FuncDeclTree.SetMatchedPatternAt(ParamBase + VarDeclType, NameSpace, TokenContext, "$Type$", Required);
			FuncDeclTree.SetMatchedPatternAt(ParamBase + VarDeclName, NameSpace, TokenContext, "$Variable$", Required);
			if(TokenContext.MatchToken("=")) {
				FuncDeclTree.SetMatchedPatternAt(ParamBase + VarDeclValue, NameSpace, TokenContext, "$Expression$", Required);
			}
			ParamBase += 3;
		}
		TokenContext.SkipIndent();
		if(TokenContext.MatchToken("as")) {
			var Token: GtToken = TokenContext.Next();
			FuncDeclTree.ConstValue = Token.ParsedText;
		}
		else {
			FuncDeclTree.SetMatchedPatternAt(FuncDeclBlock, NameSpace, TokenContext, "$Block$", Optional);
		}
		TokenContext.ParseFlag = ParseFlag;
		return FuncDeclTree;
	}

	public static TypeFuncDecl(Gamma: GtTypeEnv, ParsedTree: GtSyntaxTree, ContextType: GtType): GtNode {
		var FuncFlag: number = Gamma.Generator.ParseFuncFlag(0, ParsedTree.Annotation);
		var FuncName: string = <string>ParsedTree.GetSyntaxTreeAt(FuncDeclName).ConstValue;
		Gamma = new GtTypeEnv(ParsedTree.NameSpace);  // creation of new type environment
		var TypeList: Array<GtType> = new Array<GtType>();
		var ReturnType: GtType = ParsedTree.GetSyntaxTreeAt(FuncDeclReturnType).GetParsedType();
		TypeList.add(ReturnType);
		var ParamNameList: Array<string> = new Array<string>();
		var RecvType: GtType = null;
		if(ParsedTree.HasNodeAt(FuncDeclClass)) {
			FuncFlag |= VirtualFunc;
			RecvType = ParsedTree.GetSyntaxTreeAt(FuncDeclClass).GetParsedType();
			TypeList.add(RecvType);
			Gamma.AppendRecv(RecvType);
			ParamNameList.add(Gamma.Generator.GetRecvName());
		}
		var TreeIndex: number = FuncDeclParam;
		while(TreeIndex < ParsedTree.TreeList.size()) {
			var ParamType: GtType = ParsedTree.GetSyntaxTreeAt(TreeIndex).GetParsedType();
			var ParamName: string = ParsedTree.GetSyntaxTreeAt(TreeIndex+1).KeyToken.ParsedText;
			TypeList.add(ParamType);
			ParamNameList.add(NativeVariableName(ParamName, ParamNameList.size()));
			Gamma.AppendDeclaredVariable(0, ParamType, ParamName);
			TreeIndex += 3;
		}
		var DefinedFunc: GtFunc = null;
		if(FuncName.equals("converter")) {
			DefinedFunc = DScriptGrammar.CreateCoercionFunc(Gamma, ParsedTree, FuncFlag, 0, TypeList);
		}
		else {
			DefinedFunc = DScriptGrammar.CreateFunc(Gamma, ParsedTree, FuncFlag, FuncName, 0, TypeList);
		}
		if((typeof ParsedTree.ConstValue == 'string' || ParsedTree.ConstValue instanceof String)) {
			DefinedFunc.SetNativeMacro(LibGreenTea.UnescapeString(<string>ParsedTree.ConstValue));
		}
		else if(ParsedTree.HasNodeAt(FuncDeclBlock)) {
			Gamma.Func = DefinedFunc;
			var BodyNode: GtNode = Gamma.TypeBlock(ParsedTree.GetSyntaxTreeAt(FuncDeclBlock), ReturnType);
			Gamma.Generator.GenerateFunc(DefinedFunc, ParamNameList, BodyNode);
			if(FuncName.equals("main")) {
				Gamma.Generator.InvokeMainFunc(DefinedFunc.GetNativeFuncName());
			}

		}
		return Gamma.Generator.CreateEmptyNode(Gamma.VoidType);
	}

	private static CreateCoercionFunc(Gamma: GtTypeEnv, ParsedTree: GtSyntaxTree, FuncFlag: number, BaseIndex: number, TypeList: Array<GtType>): GtFunc {
		var ToType: GtType = TypeList.get(0);
		var FromType: GtType = TypeList.get(1);
		var Func: GtFunc = ParsedTree.NameSpace.GetCoercionFunc(FromType, ToType, false);
		if(Func != null) {
			Gamma.Context.ReportError(WarningLevel, ParsedTree.KeyToken, "already defined: " + FromType + " to " + ToType);
		}
		Func = Gamma.Generator.CreateFunc(FuncFlag, "to" + ToType.ShortClassName, BaseIndex, TypeList);
		ParsedTree.NameSpace.SetCoercionFunc(FromType, ToType, Func);
		return Func;
	}

	private static CreateFunc(Gamma: GtTypeEnv, ParsedTree: GtSyntaxTree, FuncFlag: number, FuncName: string, BaseIndex: number, TypeList: Array<GtType>): GtFunc {
		var RecvType: GtType = (TypeList.size() > 1) ? TypeList.get(1) : Gamma.VoidType;
		var Func: GtFunc = ParsedTree.NameSpace.GetFuncParam(FuncName, 0, LibGreenTea.CompactTypeList(BaseIndex, TypeList));
		if(Func != null && Func.IsAbstract()) {
			return Func;
		}
		if(Func == null) {
			Func = Gamma.Generator.CreateFunc(FuncFlag, FuncName, BaseIndex, TypeList);
		}
		if(FuncName.equals("constructor")) {
			ParsedTree.NameSpace.AppendConstructor(RecvType, Func);
		}
		else {
			if(LibGreenTea.IsLetter(LibGreenTea.CharAt(Func.FuncName, 0))) {
				ParsedTree.NameSpace.AppendFunc(Func);
			}
			if(RecvType != Gamma.VoidType) {
				ParsedTree.NameSpace.AppendMethod(RecvType, Func);
			}
		}
		return Func;
	}

	// ClassDecl
	public static ParseClassDecl(NameSpace0: GtNameSpace, TokenContext: GtTokenContext, LeftTree: GtSyntaxTree, Pattern: GtSyntaxPattern): GtSyntaxTree {
		var ClassDeclTree: GtSyntaxTree = new GtSyntaxTree(Pattern, NameSpace0, TokenContext.GetMatchedToken("class"), null);
		ClassDeclTree.SetMatchedPatternAt(ClassDeclName, NameSpace0, TokenContext, "$FuncName$", Required); //$ClassName$ is better
		if(TokenContext.MatchToken("extends")) {
			ClassDeclTree.SetMatchedPatternAt(ClassDeclSuperType, NameSpace0, TokenContext, "$Type$", Required);
		}
		if(ClassDeclTree.IsEmptyOrError()) {
			return ClassDeclTree;
		}
		// define new class
		var ClassNameSpace: GtNameSpace = new GtNameSpace(NameSpace0.Context, NameSpace0);
		var ClassNameTree: GtSyntaxTree = ClassDeclTree.GetSyntaxTreeAt(ClassDeclName);
		var ClassName: string = ClassNameTree.KeyToken.ParsedText;
		var SuperType: GtType = NameSpace0.Context.StructType;
		if(ClassDeclTree.HasNodeAt(ClassDeclSuperType)) {
			SuperType = ClassDeclTree.GetSyntaxTreeAt(ClassDeclSuperType).GetParsedType();
		}
		var ClassFlag: number = 0; //Gamma.Generator.ParseClassFlag(0, ParsedTree);
		var NewType: GtType = SuperType.CreateSubType(ClassFlag, ClassName, null, null);
		// FIXME: Obviously strange
		var DefaultObject: GreenTeaTopObject = new GreenTeaTopObject(NewType);
		NewType.DefaultNullValue = DefaultObject;
		ClassNameSpace.AppendTypeName(NewType);  // Tempollary
		ClassDeclTree.ConstValue = NewType;
		ClassNameTree.ConstValue = NewType;

		if(TokenContext.MatchToken("{")) {
			var ParseFlag: number = TokenContext.SetBackTrack(false);
			while(!ClassDeclTree.IsEmptyOrError() && !TokenContext.MatchToken("}")) {
				var Annotation: GtMap = TokenContext.SkipAndGetAnnotation(true);
				if(TokenContext.MatchToken("}")) {
					break;
				}
				if(TokenContext.MatchToken("constructor")) {
					var FuncDecl: GtSyntaxTree = TokenContext.ParsePatternAfter(ClassNameSpace, ClassNameTree, "$Constructor$", Required);
					if(!FuncDecl.IsEmptyOrError()) {
						FuncDecl.SetAnnotation(Annotation);
						FuncDecl.SetSyntaxTreeAt(FuncDeclClass, ClassNameTree);
						ClassDeclTree.AppendParsedTree(FuncDecl);
						continue;
					}
				}
				var TypeDecl: GtSyntaxTree = TokenContext.ParsePattern(ClassNameSpace, "$Type$", Required);
				if(TypeDecl != null && !TypeDecl.IsEmptyOrError()) {
					var FuncDecl: GtSyntaxTree = TokenContext.ParsePatternAfter(ClassNameSpace, TypeDecl, "$FuncDecl$", Optional);
					if(FuncDecl != null) {
						FuncDecl.SetAnnotation(Annotation);
						FuncDecl.SetSyntaxTreeAt(FuncDeclClass, ClassNameTree);
						ClassDeclTree.AppendParsedTree(FuncDecl);
						continue;
					}
					var VarDecl: GtSyntaxTree = TokenContext.ParsePatternAfter(ClassNameSpace, TypeDecl, "$VarDecl$", Required);
					if(VarDecl != null) {
						VarDecl = TreeHead(VarDecl);
						while(VarDecl != null) {
							var NextTree: GtSyntaxTree = VarDecl.NextTree;
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
		var TreeIndex: number = ClassDeclFieldStartIndex;
		var VarDeclList: Array<GtSyntaxTree> = new Array<GtSyntaxTree>();
		var ConstructorList: Array<GtSyntaxTree> = new Array<GtSyntaxTree>();
		var MethodList: Array<GtSyntaxTree> = new Array<GtSyntaxTree>();
		VarDeclList.add(ClassDeclTree.GetSyntaxTreeAt(ClassDeclSuperType));
		VarDeclList.add(ClassDeclTree.GetSyntaxTreeAt(ClassDeclName));
		while(TreeIndex < ClassDeclTree.TreeList.size()) {
			var FieldTree: GtSyntaxTree = ClassDeclTree.GetSyntaxTreeAt(TreeIndex);
			if(FieldTree.Pattern.PatternName.equals("$VarDecl$")) {
				VarDeclList.add(FieldTree);
			}
			else if(FieldTree.Pattern.PatternName.equals("$FuncDecl$")) {
				ConstructorList.add(FieldTree);
			}
			else if(FieldTree.Pattern.PatternName.equals("$Constructor$")) {
				MethodList.add(FieldTree);
			}
			TreeIndex = TreeIndex + 1;
		}
		ClassDeclTree.TreeList = VarDeclList;
		TreeIndex = 0;
		while(TreeIndex < ConstructorList.size()) {
			ClassDeclTree.AppendParsedTree(ConstructorList.get(TreeIndex));
			TreeIndex = TreeIndex + 1;
		}
		while(TreeIndex < MethodList.size()) {
			ClassDeclTree.AppendParsedTree(MethodList.get(TreeIndex));
			TreeIndex = TreeIndex + 1;
		}
		NameSpace0.AppendTypeName(NewType);
		return ClassDeclTree;
	}

	public static TypeClassDecl(Gamma: GtTypeEnv, ParsedTree: GtSyntaxTree, ContextType: GtType): GtNode {
		var DefinedType: GtType = ParsedTree.GetParsedType();
		var TreeIndex: number = ClassDeclFieldStartIndex;
		var ClassField: GtClassField = new GtClassField(DefinedType.SuperType);
		while(TreeIndex < ParsedTree.TreeList.size()) {
			var FieldTree: GtSyntaxTree = ParsedTree.GetSyntaxTreeAt(TreeIndex);
			if(!FieldTree.Pattern.PatternName.equals("$VarDecl$")) {
				break;
			}
			var FieldNode: GtNode = ParsedTree.TypeCheckNodeAt(TreeIndex, Gamma, Gamma.VarType, OnlyConstPolicy);
			if(FieldNode.IsError()) {
				return FieldNode;
			}
			var FieldName: string = FieldTree.GetSyntaxTreeAt(VarDeclName).KeyToken.ParsedText;
			var FieldFlag: number = 0;
			var FieldInfo: GtFieldInfo = ClassField.CreateField(FieldFlag, FieldNode.Type, FieldName);
			if(FieldInfo != null) {
				var ParamList: Array<GtType> = new Array<GtType>();
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
				FieldInfo.InitValue = (<ConstNode>(<LetNode>FieldNode).InitNode).ConstValue;
			}
			TreeIndex += 1;
		}
		DefinedType.SetClassField(ClassField);
		Gamma.Generator.GenerateClassField(DefinedType, ClassField);
		while(TreeIndex < ParsedTree.TreeList.size()) {
			var FieldTree: GtSyntaxTree = ParsedTree.GetSyntaxTreeAt(TreeIndex);
			if(!FieldTree.Pattern.PatternName.equals("$FuncDecl$")) {
				break;
			}
			ParsedTree.TypeCheckNodeAt(TreeIndex, Gamma, Gamma.VarType, OnlyConstPolicy);
			TreeIndex += 1;
		}
		while(TreeIndex < ParsedTree.TreeList.size()) {
			var FieldTree: GtSyntaxTree = ParsedTree.GetSyntaxTreeAt(TreeIndex);
			if(!FieldTree.Pattern.PatternName.equals("$Constructor$")) {
				break;
			}
			ParsedTree.TypeCheckNodeAt(TreeIndex, Gamma, DefinedType, OnlyConstPolicy);
			TreeIndex += 1;
		}
		return Gamma.Generator.CreateEmptyNode(Gamma.VoidType);
	}

	public static TypeConstructor(Gamma: GtTypeEnv, ConstructorTree: GtSyntaxTree, ContextType: GtType): GtNode {
		var NameSpace: GtNameSpace = Gamma.NameSpace;
		var DefinedType: GtType = ConstructorTree.GetSyntaxTreeAt(FuncDeclReturnType).GetParsedType();
		var BlockTree: GtSyntaxTree = ConstructorTree.GetSyntaxTreeAt(FuncDeclBlock);
		var TailTree: GtSyntaxTree = BlockTree;
		while(TailTree.NextTree != null) {
			TailTree = TailTree.NextTree;
		}
		var ThisTree: GtSyntaxTree = new GtSyntaxTree(NameSpace.GetPattern("$Variable$"), NameSpace, new GtToken(Gamma.Generator.GetRecvName(), 0), null);
		var ReturnTree: GtSyntaxTree = new GtSyntaxTree(NameSpace.GetPattern("return"), NameSpace, new GtToken("return", 0), null);
		ReturnTree.SetSyntaxTreeAt(ReturnExpr, ThisTree);
		if(BlockTree.IsEmpty()) {
			ConstructorTree.SetSyntaxTreeAt(FuncDeclBlock, ReturnTree);
		}
		else {
			LinkTree(TailTree, ReturnTree);
		}
		if(ConstructorTree.HasNodeAt(FuncDeclBlock)) {
			var Func: GtPolyFunc = Gamma.NameSpace.GetConstructorFunc(DefinedType.SuperType);
			ConstructorTree.GetSyntaxTreeAt(FuncDeclBlock).NameSpace.SetSymbol("super", Func);
		}
		return DScriptGrammar.TypeFuncDecl(Gamma, ConstructorTree, ContextType);
	}

	// constructor
	public static ParseConstructor(NameSpace: GtNameSpace, TokenContext: GtTokenContext, LeftTree: GtSyntaxTree, Pattern: GtSyntaxPattern): GtSyntaxTree {
		LibGreenTea.Assert(LeftTree != null);
		var ConstructorTreeDecl: GtSyntaxTree = new GtSyntaxTree(Pattern, NameSpace, TokenContext.GetBeforeToken(), null);
		ConstructorTreeDecl.SetSyntaxTreeAt(FuncDeclName, new GtSyntaxTree(null, NameSpace, ConstructorTreeDecl.KeyToken, "constructor"));
		ConstructorTreeDecl.SetSyntaxTreeAt(FuncDeclReturnType, LeftTree);
		ConstructorTreeDecl.SetSyntaxTreeAt(FuncDeclClass, LeftTree);
		ConstructorTreeDecl.SetMatchedTokenAt(NoWhere, NameSpace, TokenContext, "(", Required);

		var ParseFlag: number = TokenContext.SetBackTrack(false);  // disabled
		var ParamBase: number = FuncDeclParam;
		while(!ConstructorTreeDecl.IsEmptyOrError() && !TokenContext.MatchToken(")")) {
			if(ParamBase > FuncDeclParam) {
				ConstructorTreeDecl.SetMatchedTokenAt(NoWhere, NameSpace, TokenContext, ",", Required);
			}
			ConstructorTreeDecl.SetMatchedPatternAt(ParamBase + VarDeclType, NameSpace, TokenContext, "$Type$", Required);
			ConstructorTreeDecl.SetMatchedPatternAt(ParamBase + VarDeclName, NameSpace, TokenContext, "$Variable$", Required);
			if(TokenContext.MatchToken("=")) {
				ConstructorTreeDecl.SetMatchedPatternAt(ParamBase + VarDeclValue, NameSpace, TokenContext, "$Expression$", Required);
			}
			ParamBase += 3;
		}
		ConstructorTreeDecl.SetMatchedPatternAt(FuncDeclBlock, NameSpace, TokenContext, "$Block$", Required);
		TokenContext.ParseFlag = ParseFlag;
		return ConstructorTreeDecl;
	}

	// shell grammar
	private static IsUnixCommand(cmd: string): boolean {

		return false;
	}

	public static SymbolShellToken(TokenContext: GtTokenContext, SourceText: string, pos: number): number {
		var ShellMode: boolean = false;
		var start: number = pos;
		if(TokenContext.SourceList.size() > 0) {
			var PrevToken: GtToken = TokenContext.SourceList.get(TokenContext.SourceList.size() - 1);
			if(PrevToken != null && PrevToken.PresetPattern != null &&
				PrevToken.PresetPattern.PatternName.equals("$ShellExpression$")) {
				ShellMode = true;
			}
		}

		while(pos < SourceText.length) {
			var ch: number = LibGreenTea.CharAt(SourceText, pos);
			// a-zA-Z0-9_-
			if(LibGreenTea.IsLetter(ch)) {
			}
			else if(LibGreenTea.IsDigit(ch)) {
			}
			else if(ch == 95/*_*/) {
			}
			else if(ShellMode && (ch == 45/*-*/ || ch == 47/*/*/)) {
			}
			else {
				break;
			}
			pos += 1;
		}
		if(start == pos) {
			return NoMatch;
		}
		var Symbol: string = SourceText.substring(start, pos);

		var i: number = 0;
		while(i < ShellGrammarReservedKeywords.length) {
			var Keyword: string = ShellGrammarReservedKeywords[i];
			if(Symbol.equals(Keyword)) {
				return NoMatch;
			}
			i = i + 1;
		}
		if(Symbol.startsWith("/") || Symbol.startsWith("-")) {
			if(Symbol.startsWith("//")) { // One-Line Comment
				return NoMatch;
			}
			TokenContext.AddNewToken(Symbol, 0, "$StringLiteral$");
			return pos;
		}

		if(DScriptGrammar.IsUnixCommand(Symbol)) {
			TokenContext.AddNewToken(Symbol, 0, "$ShellExpression$");
			return pos;
		}
		return NoMatch;
	}

	public  static ParseShell(NameSpace: GtNameSpace, TokenContext: GtTokenContext, LeftTree: GtSyntaxTree, Pattern: GtSyntaxPattern): GtSyntaxTree {
		var Token: GtToken = TokenContext.Next();
		var NewTree: GtSyntaxTree = new GtSyntaxTree(Pattern, NameSpace, Token, null);
		while(!IsEmptyOrError(NewTree) && !TokenContext.MatchToken(";")) {
			var Tree: GtSyntaxTree = null;
			if(TokenContext.GetToken().IsDelim() || TokenContext.GetToken().IsIndent()) {
				break;
			}
			if(TokenContext.MatchToken("$ShellExpression$")) {
				// FIXME
			}
			if(Tree == null) {
				Tree = TokenContext.ParsePattern(NameSpace, "$Expression$", Optional);
			}
			NewTree.AppendParsedTree(Tree);
		}
		return NewTree;
	}

	public static TypeShell(Gamma: GtTypeEnv, ParsedTree: GtSyntaxTree, ContextType: GtType): GtNode {
		var Node: CommandNode = <CommandNode> Gamma.Generator.CreateCommandNode(ContextType, ParsedTree, null);
		var HeadNode: GtNode = Node;
		var i: number = 0;
		var Command: string = ParsedTree.KeyToken.ParsedText;
		var ThisNode: GtNode = Gamma.Generator.CreateConstNode(Gamma.StringType, ParsedTree, Command);
		Node.Append(ThisNode);
		while(i < ListSize(ParsedTree.TreeList)) {
			var ExprNode: GtNode = ParsedTree.TypeCheckNodeAt(i, Gamma, Gamma.StringType, DefaultTypeCheckPolicy);
			if(ExprNode instanceof ConstNode) {
				var CNode: ConstNode = <ConstNode> ExprNode;
				if((typeof CNode.ConstValue == 'string' || CNode.ConstValue instanceof String)) {
					var Val: string = <string> CNode.ConstValue;
					if(Val.equals("|")) {
						LibGreenTea.DebugP("PIPE");
						var PrevNode: CommandNode = Node;
						Node = <CommandNode> Gamma.Generator.CreateCommandNode(ContextType, ParsedTree, null);
						PrevNode.PipedNextNode = Node;
					}
				}
			}
			Node.Append(ExprNode);
			i = i + 1;
		}
		return HeadNode;
	}

	public LoadTo(NameSpace: GtNameSpace): void {
		// Define Constants
		NameSpace.SetSymbol("true", true);
		NameSpace.SetSymbol("false", false);
		NameSpace.SetSymbol("null", null);

		NameSpace.DefineTokenFunc(" \t", DScriptGrammar.WhiteSpaceToken);
		NameSpace.DefineTokenFunc("\n",  DScriptGrammar.IndentToken);
		NameSpace.DefineTokenFunc("{}()[]<>.,:;+-*/%=&|!@", DScriptGrammar.OperatorToken);
		NameSpace.DefineTokenFunc("/", DScriptGrammar.CommentToken);  // overloading
		NameSpace.DefineTokenFunc("Aa", DScriptGrammar.SymbolToken);
		NameSpace.DefineTokenFunc("Aa-/", DScriptGrammar.SymbolShellToken); // overloading

		NameSpace.DefineTokenFunc("\"", DScriptGrammar.StringLiteralToken);
		NameSpace.DefineTokenFunc("\"", DScriptGrammar.StringLiteralToken_StringInterpolation);
		NameSpace.DefineTokenFunc("1",  DScriptGrammar.NumberLiteralToken);

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
		//future: NameSpace.DefineExtendedPattern("[", 0, DScriptGrammar.ParseIndexer, DScriptGrammar.TypeIndexer);

		NameSpace.AppendSyntax("$Block$", DScriptGrammar.ParseBlock, DScriptGrammar.TypeBlock);
		NameSpace.AppendSyntax("$Statement$", DScriptGrammar.ParseStatement, DScriptGrammar.TypeBlock);
		NameSpace.AppendSyntax("$Expression$", DScriptGrammar.ParseExpression, DScriptGrammar.TypeBlock);

		NameSpace.AppendSyntax("$FuncName$", DScriptGrammar.ParseFuncName, DScriptGrammar.TypeConst);
		NameSpace.AppendSyntax("$FuncDecl$", DScriptGrammar.ParseFuncDecl, DScriptGrammar.TypeFuncDecl);
		NameSpace.AppendSyntax("$VarDecl$",  DScriptGrammar.ParseVarDecl, DScriptGrammar.TypeVarDecl);

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
	}
}

 class GtStat {
	public MatchCount: number;
	public BacktrackCount: number;  // To count how many times backtracks happen.

	 constructor() {
		this.MatchCount     = 0;
		this.BacktrackCount = 0;
	}
}

 class GtClassContext {
	public   Generator: GtGenerator;
	public   RootNameSpace: GtNameSpace;
	public TopLevelNameSpace: GtNameSpace;

	// basic class
	public  VoidType: GtType;
	public  BooleanType: GtType;
	public  IntType: GtType;
	public  StringType: GtType;
	public  AnyType: GtType;
	public  ArrayType: GtType;
	public  FuncType: GtType;

	public  TopType: GtType;
	public  EnumType: GtType;
	public  StructType: GtType;
	public  VarType: GtType;

	public  TypeType: GtType;
	public PolyFuncType: GtType;

	public   SourceMap: GtMap;
	public   SourceList: Array<string>;
	public   ClassNameMap: GtMap;
	public   UniqueFuncMap: GtMap;
	public ClassCount: number;
	public FuncCount: number;
	public  Stat: GtStat;
	public ReportedErrorList: Array<string>;

	 constructor(Grammar: GtGrammar, Generator: GtGenerator) {
		this.Generator    = Generator;
		this.Generator.Context = this;
		this.SourceMap     = new GtMap();
		this.SourceList    = new Array<string>();
		this.ClassNameMap  = new GtMap();
		this.UniqueFuncMap = new GtMap();
		this.RootNameSpace = new GtNameSpace(this, null);
		this.ClassCount = 0;
		this.FuncCount = 0;
		this.Stat = new GtStat();
		this.ReportedErrorList = new Array<string>();

		this.TopType     = new GtType(this, 0, "top", null, null);               //  unregistered
		this.StructType  = this.TopType.CreateSubType(0, "record", null, null);  //  unregistered
		this.EnumType    = this.TopType.CreateSubType(EnumClass, "enum", null, null);    //  unregistered

		this.VoidType    = this.RootNameSpace.AppendTypeName(new GtType(this, NativeClass, "void", null, null));
		this.BooleanType = this.RootNameSpace.AppendTypeName(new GtType(this, NativeClass, "boolean", false, Boolean));
		this.IntType     = this.RootNameSpace.AppendTypeName(new GtType(this, NativeClass, "int", 0, Number));
		this.StringType  = this.RootNameSpace.AppendTypeName(new GtType(this, NativeClass, "String", "", String));
		this.VarType     = this.RootNameSpace.AppendTypeName(new GtType(this, 0, "var", null, null));
		this.AnyType     = this.RootNameSpace.AppendTypeName(new GtType(this, DynamicClass, "any", null, null));
		this.TypeType    = this.RootNameSpace.AppendTypeName(this.TopType.CreateSubType(0, "Type", null, null));
		this.ArrayType   = this.RootNameSpace.AppendTypeName(this.TopType.CreateSubType(0, "Array", null, null));
		this.FuncType    = this.RootNameSpace.AppendTypeName(this.TopType.CreateSubType(0, "Func", null, null));

		this.ArrayType.TypeParams = new Array<GtType>(1);
		this.ArrayType.TypeParams[0] = this.AnyType;
		this.FuncType.TypeParams = new Array<GtType>(1);
		this.FuncType.TypeParams[0] = this.AnyType;


		Grammar.LoadTo(this.RootNameSpace);
		this.TopLevelNameSpace = new GtNameSpace(this, this.RootNameSpace);
		this.Generator.InitContext(this);
	}

	public LoadGrammar(Grammar: GtGrammar): void {
		Grammar.LoadTo(this.TopLevelNameSpace);
	}

	public  GuessType(Value: Object): GtType {
		if(Value instanceof GtFunc) {
			return (<GtFunc>Value).GetFuncType();
		}
		else if(Value instanceof GtPolyFunc) {
			return this.FuncType;
		}
		else if(Value instanceof GreenTeaTopObject) {
			return (<GreenTeaTopObject>Value).GreenType;
		}
		else if(Value instanceof GtType) {
			return this.TypeType;
		}
		else {
			return this.Generator.GetNativeType(Value);
		}
	}

	private  SubtypeKey(FromType: GtType, ToType: GtType): string {
		return FromType.GetUniqueName() + "<" + ToType.GetUniqueName();
	}

	public  CheckSubType(SubType: GtType, SuperType: GtType): boolean {
		// TODO: Structual Typing database
		return false;
	}

	public GetGenericType(BaseType: GtType, BaseIdx: number, TypeList: Array<GtType>, IsCreation: boolean): GtType {
		LibGreenTea.Assert(BaseType.IsGenericType());
		var MangleName: string = MangleGenericType(BaseType, BaseIdx, TypeList);
		var GenericType: GtType = <GtType>this.ClassNameMap.get(MangleName);
		if(GenericType == null && IsCreation) {
			var i: number = BaseIdx;
			var s: string = BaseType.ShortClassName + "<";
			while(i < ListSize(TypeList)) {
				s = s + TypeList.get(i).ShortClassName;
				i += 1;
				if(i == ListSize(TypeList)) {
					s = s + ">";
				}
				else {
					s = s + ",";
				}
			}
			GenericType = BaseType.CreateGenericType(BaseIdx, TypeList, s);
			this.ClassNameMap.put(MangleName, GenericType);
		}
		return GenericType;
	}

	public GetGenericType1(BaseType: GtType, ParamType: GtType, IsCreation: boolean): GtType {
		var TypeList: Array<GtType> = new Array<GtType>();
		TypeList.add(ParamType);
		return this.GetGenericType(BaseType, 0, TypeList, IsCreation);
	}

	public  CheckExportableName(Func: GtFunc): boolean {
		return true;
	}

	public  Eval(ScriptSource: string, FileLine: number): Object {
		var resultValue: Object = null;
		LibGreenTea.DebugP("Eval: " + ScriptSource);
		var TokenContext: GtTokenContext = new GtTokenContext(this.TopLevelNameSpace, ScriptSource, FileLine);
		this.Generator.StartCompilationUnit();
		TokenContext.SkipEmptyStatement();
		while(TokenContext.HasNext()) {
			var annotation: GtMap = TokenContext.SkipAndGetAnnotation(true);
			var topLevelTree: GtSyntaxTree = ParseExpression(this.TopLevelNameSpace, TokenContext);
			topLevelTree.SetAnnotation(annotation);
			LibGreenTea.DebugP("untyped tree: " + topLevelTree);
			var gamma: GtTypeEnv = new GtTypeEnv(this.TopLevelNameSpace);
			var node: GtNode = gamma.TypeCheckEachNode(topLevelTree, gamma.VoidType, DefaultTypeCheckPolicy);
			resultValue = this.Generator.Eval(node);
			TokenContext.SkipEmptyStatement();
			TokenContext.Vacume();
		}
		this.Generator.FinishCompilationUnit();
		return resultValue;
	}

	public  LoadFile(FileName: string): void {
		var ScriptText: string = LibGreenTea.LoadFile(FileName);
		var FileLine: number = this.GetFileLine(FileName, 1);
		this.Eval(ScriptText, FileLine);
	}

	public  GetFileLine(FileName: string, Line: number): number {
		var Id: number = <number>this.SourceMap.get(FileName);
		if(Id == null) {
			this.SourceList.add(FileName);
			Id = this.SourceList.size();
			this.SourceMap.put(FileName, Id);
		}
		return LibGreenTea.JoinIntId(Id, Line);
	}

	private  GetSourcePosition(FileLine: number): string {
		var FileId: number = LibGreenTea.UpperId(FileLine);
		var Line: number = LibGreenTea.LowerId(FileLine);
		var FileName: string = (FileId == 0) ? "eval" : this.SourceList.get(FileId - 1);
		return "(" + FileName + ":" + Line + ")";
	}

	public  ReportError(Level: number, Token: GtToken, Message: string): void {
		if(!Token.IsError()) {
			if(Level == ErrorLevel) {
				Message = "(error) " + this.GetSourcePosition(Token.FileLine) + " " + Message;
				Token.ToErrorToken(Message);
			}
			else if(Level == TypeErrorLevel) {
				Message = "(error) " + this.GetSourcePosition(Token.FileLine) + " " + Message;
			}
			else if(Level == WarningLevel) {
				Message = "(warning) " + this.GetSourcePosition(Token.FileLine) + " " + Message;
			}
			else if(Level == InfoLevel) {
				Message = "(info) " + this.GetSourcePosition(Token.FileLine) + " " + Message;
			}
			this.ReportedErrorList.add(Message);
			//GtStatic.println(Message);
		}
	}

	public  GetReportedErrors(): string[] {
		var List: Array<string> = this.ReportedErrorList;
		this.ReportedErrorList = new Array<string>();
		return LibGreenTea.CompactStringList(List);
	}

	public  ShowReportedErrors(): void {
		var i: number = 0;
		var Messages: string[] = this.GetReportedErrors();
		while(i < Messages.length) {
			LibGreenTea.println(Messages[i]);
			i = i + 1;
		}
	}
}

class GreenTeaScript {
	public  static ParseCommandOption(Args: string[]): void {
		var TargetCode: string = "exe";  // self executable
		var GeneratorFlag: number = 0;
		var OneLiner: string = null;
		var OutputFile: string = "-";  // stdout
		var Index: number = 0;
		while(Index < Args.length) {
			var Argu: string = Args[Index];
			if(!Argu.startsWith("-")) {
				break;
			}
			Index += 1;
			if((Argu.equals("-e") || Argu.equals("--eval")) && Index < Args.length) {
				OneLiner = Args[Index];
				Index += 1;
				continue;
			}
			if((Argu.equals("-o") || Argu.equals("--out")) && Index < Args.length) {
				if(!Args[Index].endsWith(".green")) {  // for safety
					OutputFile = Args[Index];
					Index += 1;
					continue;
				}
			}
			if((Argu.equals("-l") || Argu.equals("--lang")) && Index < Args.length) {
				if(!Args[Index].endsWith(".green")) {  // for safety
					TargetCode = Args[Index];
					Index += 1;
					continue;
				}
			}
			if(Argu.equals("--verbose")) {
				LibGreenTea.DebugMode = true;
				continue;
			}
			LibGreenTea.Usage();
		}
		var Generator: GtGenerator = LibGreenTea.CodeGenerator(TargetCode, OutputFile, GeneratorFlag);
		if(Generator == null) {
			LibGreenTea.Usage();
		}
		var Context: GtClassContext = new GtClassContext(new DScriptGrammar(), Generator);
		var ShellMode: boolean = true;
		if(OneLiner != null) {
			Context.Eval(OneLiner, 1);
			ShellMode = false;
		}
		while(Index < Args.length) {
			Context.Eval(LibGreenTea.LoadFile(Args[Index]), 1);
			ShellMode = false;
			Index += 1;
		}
		if(ShellMode) {
			LibGreenTea.println(ProgName + Version + " (" + CodeName + ") on " + LibGreenTea.GetPlatform());
			LibGreenTea.println(Copyright);
			var linenum: number = 1;
			var Line: string = null;
			while((Line = LibGreenTea.ReadLine(">>> ")) != null) {
				Context.Eval(Line, linenum);
				Context.ShowReportedErrors();
				linenum += 1;
			}
		}
		else {
			Generator.FlushBuffer();
		}
	}

	public  static main(Args: string[]): void {
		GreenTeaScript.ParseCommandOption(Args);
	}
}