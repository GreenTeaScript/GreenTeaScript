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
	var ExportClass: number         = 1 << 0;  // @Export
	var PublicClass: number         = 1 << 1;  // @Public
	var NativeClass: number	     	= 1 << 2;
	var VirtualClass: number		= 1 << 3;  // @Virtual
	var EnumClass: number           = 1 << 4;
	var DeprecatedClass: number     = 1 << 5;  // @Deprecated

	var DynamicClass: number	    = 1 << 6;  // @Dynamic
	var OpenClass: number           = 1 << 7;  // @var for: Open var future: the
	var TypeRef: number        = 1 << 15;

	// FuncFlag
	var ExportFunc: number		    = 1 << 0;  // @Export
	var PublicFunc: number          = 1 << 1;  // @Public
	var NativeFunc: number		    = 1 << 2;  
	var VirtualFunc: number		    = 1 << 3;  
	var ConstFunc: number			= 1 << 4;  // @Const
	var DeprecatedFunc: number      = 1 << 5;  // @Deprecated

	var NativeStaticFunc: number	= 1 << 6;
	var NativeMacroFunc: number	    = 1 << 7;
	var NativeVariadicFunc: number	= 1 << 8;
	var ConstructorFunc: number     = 1 << 9;
	var GetterFunc: number          = 1 << 10;
	var SetterFunc: number          = 1 << 11;
	var OperatorFunc: number        = 1 << 12;  //@Operator
	var CoercionFunc: number        = 1 << 13;  //@Coercion
	var LazyFunc: number		    = 1 << 14;  //@Deprecated

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

	// for(init; cond; iter) {...}
	var ForInit: number = 0;
	var ForCond: number = 1;
	var ForIteration: number = 2;
	var ForBody: number = 3;

	// ReturnStmt
	var ReturnExpr: number	= 0;

	// var N = 1;
	var VarDeclType: number		= 0;
	var VarDeclName: number		= 1;
	var VarDeclValue: number	= 2;
	var VarDeclScope: number	= 3;

	//var Call: Func;
	var CallExpressionIndex: number	= 0;
	var CallParameterIndex: number		= 1;

	// var Decl: Const;
	var SymbolDeclClassIndex: number	= 0;
	var SymbolDeclNameIndex: number	= 1;
	var SymbolDeclValueIndex: number	= 2;

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

	// switch-case
	var SwitchCaseCondExpr: number = 0;
	var SwitchCaseDefaultBlock: number = 1;
	var SwitchCaseCaseIndex: number = 2;

	// Enum
	var EnumNameTreeIndex: number = 0;

	var BinaryOperator: number					= 1;
	var LeftJoin: number						= 1 << 1;
	var PrecedenceShift: number					= 3;
	var PrecedenceCStyleMUL: number			    = (100 << PrecedenceShift) | BinaryOperator;
	var PrecedenceCStyleADD: number			    = (200 << PrecedenceShift) | BinaryOperator;
	var PrecedenceCStyleSHIFT: number			= (300 << PrecedenceShift) | BinaryOperator;
	var PrecedenceCStyleCOMPARE: number		    = (400 << PrecedenceShift) | BinaryOperator;
	var PrecedenceInstanceof: number            = PrecedenceCStyleCOMPARE;
	var PrecedenceCStyleEquals: number			= (500 << PrecedenceShift) | BinaryOperator;
	var PrecedenceCStyleBITAND: number			= (600 << PrecedenceShift) | BinaryOperator;
	var PrecedenceCStyleBITXOR: number			= (700 << PrecedenceShift) | BinaryOperator;
	var PrecedenceCStyleBITOR: number			= (800 << PrecedenceShift) | BinaryOperator;
	var PrecedenceCStyleAND: number			    = (900 << PrecedenceShift) | BinaryOperator;
	var PrecedenceCStyleOR: number				= (1000 << PrecedenceShift) | BinaryOperator;
	var PrecedenceCStyleTRINARY: number		    = (1100 << PrecedenceShift) | BinaryOperator;				/* ? : */
	var PrecedenceCStyleAssign: number			= (1200 << PrecedenceShift) | BinaryOperator;
	var PrecedenceCStyleCOMMA: number			= (1300 << PrecedenceShift) | BinaryOperator;

	var DefaultTypeCheckPolicy: number			= 0;
	var NoCheckPolicy: number                   = 1;
	var CastPolicy: number                      = (1 << 1);
	var IgnoreEmptyPolicy: number               = (1 << 2);
	var AllowEmptyPolicy: number                = (1 << 3);
	var AllowVoidPolicy: number                 = (1 << 4);
	var AllowCoercionPolicy: number             = (1 << 5);
	var OnlyConstPolicy: number                 = (1 << 6);
	var BlockPolicy: number                     = (1 << 7);

	var UndefinedSymbol: Object = new Object();   // any class
	var NativeNameSuffix: string = "__";
	var ShellGrammarReservedKeywords: string[] = ["true", "false", "as", "if", "/"]

	var UseLangStat: boolean = true;

	var VerboseSymbol: number    = 1;
	var VerboseType: number      = (1 << 1);
	var VerboseFunc: number      = (1 << 2);
	var VerboseEval: number      = (1 << 3);
	var VerboseToken: number     = (1 << 4);
	var VerboseUndefined: number   = (1 << 5);

	var VerboseNative: number    = (1 << 6);
	var VerboseFile: number      = (1 << 7);
	var VerboseException: number = (1 << 8);



	function JoinStrings(Unit: string, Times: number): string {
		var s: string = "";
		var i: number = 0;
		while(i < Times) {
			s = s + Unit;
			i = i + 1;
		}
		return s;
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
		return Name + NativeNameSuffix + Index;
	}

	function ClassSymbol(ClassType: GtType, Symbol: string): string {
		return ClassType.GetUniqueName() + "." + Symbol;
	}

	function MangleGenericType(BaseType: GtType, BaseIdx: number, TypeList: Array<GtType>): string {
		var s: string = BaseType.ShortClassName + NativeNameSuffix;
		var i: number = BaseIdx;
		while(i < LibGreenTea.ListSize(TypeList)) {
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
		return (Tree == null || Tree.IsEmptyOrError());
	}

	function TreeHead(Tree: GtSyntaxTree): GtSyntaxTree {
		if(Tree != null) {
			while(Tree.PrevTree != null) {
				Tree = Tree.PrevTree;
			}
		}
		return Tree;
	}

	function TreeTail(Tree: GtSyntaxTree): GtSyntaxTree {
		if(Tree != null) {
			while(Tree.NextTree != null) {
				Tree = Tree.NextTree;
			}
		}
		return Tree;
	}

	function LinkTree(LastNode: GtSyntaxTree, Node: GtSyntaxTree): GtSyntaxTree {
		Node.PrevTree = LastNode;
		if(LastNode != null) {
			LastNode.NextTree = Node;
		}
		return TreeTail(Node);
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
			LibGreenTea.VerboseLog(VerboseUndefined, "undefined syntax pattern: " + Pattern);
		}
		return TokenContext.ReportExpectedPattern(Pattern);
	}

	function ParseExpression(NameSpace: GtNameSpace, TokenContext: GtTokenContext, SuffixOnly: boolean): GtSyntaxTree {
		var Pattern: GtSyntaxPattern = TokenContext.GetFirstPattern();
		var LeftTree: GtSyntaxTree = ApplySyntaxPattern(NameSpace, TokenContext, null, Pattern);
		while(!IsEmptyOrError(LeftTree)) {
			var ExtendedPattern: GtSyntaxPattern = TokenContext.GetExtendedPattern();
			if(ExtendedPattern == null || (SuffixOnly && ExtendedPattern.IsBinaryOperator()) ) {
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

	function TypeBlock(Gamma: GtTypeEnv, ParsedTree: GtSyntaxTree, ContextType: GtType): GtNode {
		var StackTopIndex: number = Gamma.StackTopIndex;
		var LastNode: GtNode = null;
		while(ParsedTree != null) {
			var Node: GtNode = ApplyTypeFunc(ParsedTree.Pattern.TypeFunc, Gamma, ParsedTree, Gamma.VoidType);
			/*local*/Node = Gamma.TypeCheckSingleNode(ParsedTree, Node, Gamma.VoidType, DefaultTypeCheckPolicy);
			/*local*/LastNode = LinkNode(LastNode, Node);
			if(Node.IsError()) {
				break;
			}
			ParsedTree = ParsedTree.NextTree;
		}
		Gamma.PushBackStackIndex(StackTopIndex);
		if(LastNode == null) {
			return Gamma.Generator.CreateEmptyNode(Gamma.VoidType);
		}
		return LastNode.MoveHeadNode();
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

	public  IsNextWhiteSpace(): boolean {
		return IsFlag(this.TokenFlag, WhiteSpaceTokenFlag);
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
			while(i < LibGreenTea.ListSize(this.SourceList)) {
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
			LibGreenTea.VerboseLog(VerboseUndefined, "undefined tokenizer: " + ScriptSource.substring(pos, pos+1));
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

	public  MatchToken(TokenText: string): boolean {
		if(this.PeekToken(TokenText)) {
			this.CurrentPosition += 1;
			return true;
		}
		return false;
	}

	public  PeekToken(TokenText: string): boolean {
		var Token: GtToken = this.GetToken();
		if(Token.EqualsText(TokenText)) {
			return true;
		}
		return false;
	}

	public  MatchIndentToken(TokenText: string): boolean {
		var RollbackPosition: number = this.CurrentPosition;
		var Token: GtToken = this.Next();
		while(Token.IsIndent()) {
			Token = this.Next();
		}
		if(Token.EqualsText(TokenText)) {
			return true;
		}
		this.CurrentPosition = RollbackPosition;
		return false;
	}

	public  StartsWithToken(TokenText: string): boolean {
		var Token: GtToken = this.GetToken();
		if(Token.EqualsText(TokenText)) {
			this.CurrentPosition += 1;
			return true;
		}
		if(Token.ParsedText.startsWith(TokenText)) {
			Token = new GtToken(Token.ParsedText.substring(TokenText.length), Token.FileLine);
			this.CurrentPosition += 1;
			this.SourceList.add(this.CurrentPosition, Token);
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
		var OldFlag: number = this.ParseFlag;
		if(Allowed) {
			this.ParseFlag = this.ParseFlag | BackTrackParseFlag;
		}
		else {
			this.ParseFlag = (~(BackTrackParseFlag) & this.ParseFlag);
		}
		return OldFlag;
	}

	public  SetSkipIndent(Allowed: boolean): number {
		var OldFlag: number = this.ParseFlag;
		if(Allowed) {
			this.ParseFlag = this.ParseFlag | SkipIndentParseFlag;
		}
		else {
			this.ParseFlag = (~(SkipIndentParseFlag) & this.ParseFlag);
		}
		return OldFlag;
	}

	public  SetRememberFlag(OldFlag: number): void {
		this.ParseFlag = OldFlag;
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
		this.SkipEmptyStatement();
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

	public  SkipEmptyStatement(): void {
		while(this.HasNext()) {
			var Token: GtToken = this.GetToken();
			if(Token.IsIndent() || Token.IsDelim()) {
				this.CurrentPosition += 1;
				continue;
			}
			break;
		}
//		return (Token != GtTokenContext.NullToken);
	}

	public  SkipIncompleteStatement(): void {
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
	}

	public  Stringfy(PreText: string, BeginIdx: number, EndIdx: number): string {
		var Buffer: string = PreText;
		var Position: number = BeginIdx;
		while(Position < EndIdx) {
			var Token: GtToken = this.SourceList.get(Position);
			if(Token.IsIndent()) {
				Buffer += "\n";
			}
			Buffer += Token.ParsedText;
			if(Token.IsNextWhiteSpace()) {
				Buffer += " ";
			}
			Position += 1;
		}
		return Buffer;
	}

	public  Dump(): void {
		var Position: number = this.CurrentPosition;
		while(Position < this.SourceList.size()) {
			var Token: GtToken = this.SourceList.get(Position);
			var DumpedToken: string = "["+Position+"] " + Token;
			if(Token.PresetPattern != null) {
				DumpedToken = DumpedToken + " : " + Token.PresetPattern;
			}
			LibGreenTea.VerboseLog(VerboseToken,  DumpedToken);
			Position += 1;
		}
	}

	public  SetSourceMap(SourceMap: string): void {
		var Index: number = SourceMap.lastIndexOf(":");
		if(Index != -1) {
			var FileName: string = SourceMap.substring(0, Index);
			var Line: number = <number>LibGreenTea.ParseInt(SourceMap.substring(Index+1));
			this.ParsingLine = this.TopLevelNameSpace.Context.GetFileLine(FileName, Line);
		}
	}

	public StopParsing(b: boolean): void {
		// TODO Auto-generated method stub
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

	public  IsRightJoin(Right: GtSyntaxPattern): boolean {
		var left: number = this.SyntaxFlag;
		var right: number = Right.SyntaxFlag;
		return (left < right || (left == right && !IsFlag(this.SyntaxFlag, LeftJoin) && !IsFlag(Right.SyntaxFlag, LeftJoin)));
	}

	public  EqualsName(Name: string): boolean {
		return LibGreenTea.EqualsString(this.PatternName, Name);
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
		while(i < LibGreenTea.ListSize(this.TreeList)) {
			var SubTree: GtSyntaxTree = this.TreeList.get(i);
			while(SubTree != null) {
				var Entry: string = SubTree.toString();
				if(LibGreenTea.ListSize(SubTree.TreeList) == 0) {
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
		return this.IsEmpty() || this.KeyToken.IsError();
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
			else {
				if(!IsOptional) {
					this.ToEmpty();
				}
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
			LibGreenTea.Assert(Tree != null);
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
		return (this.ConstValue instanceof GtType) ? <GtType>this.ConstValue : null;
	}

	public  HasNodeAt(Index: number): boolean {
		if(this.TreeList != null && Index < this.TreeList.size()) {
			return this.TreeList.get(Index) != null;
		}
		return false;
	}

	public TypeCheck(Gamma: GtTypeEnv, ContextType: GtType, TypeCheckPolicy: number): GtNode {
		var Node: GtNode = ApplyTypeFunc(this.Pattern.TypeFunc, Gamma, this, ContextType);
		return Gamma.TypeCheckSingleNode(this, Node, ContextType, TypeCheckPolicy);
	}

	public  TypeCheckNodeAt(Index: number, Gamma: GtTypeEnv, ContextType: GtType, TypeCheckPolicy: number): GtNode {
		var ParsedTree: GtSyntaxTree = this.GetSyntaxTreeAt(Index);
		if(ContextType == Gamma.VoidType || IsFlag(TypeCheckPolicy, BlockPolicy)) {
			return TypeBlock(Gamma, ParsedTree, ContextType);
		}
		else if(ParsedTree != null) {
			return ParsedTree.TypeCheck(Gamma, ContextType, TypeCheckPolicy);
		}
		return Gamma.CreateSyntaxErrorNode(this, "not empty");
	}

	public ToConstTree(ConstValue: Object): void {
		this.Pattern = this.NameSpace.GetPattern("$Const$");
		this.ConstValue = ConstValue;
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
	public NameToken: GtToken;
	public InitValue: Object;
	public DefCount: number;
	public UsedCount: number;

	 constructor(VarFlag: number, Type: GtType, Name: string, Index: number, NameToken: GtToken, InitValue: Object) {
		this.VariableFlag = VarFlag;
		this.Type = Type;
		this.NameToken = NameToken;
		this.Name = Name;
		this.NativeName = NativeVariableName(Name, Index);
		this.InitValue = null;
		this.UsedCount = 0;
		this.DefCount  = 1;
	}

	public  Defined(): void {
		this.DefCount += 1;
		this.InitValue = null;
	}

	public  Used(): void {
		this.UsedCount += 1;
	}

	public Check(): void {
		if(this.UsedCount == 0 && this.NameToken != null) {
			this.Type.Context.ReportError(WarningLevel, this.NameToken, "unused variable: " + this.Name);
		}
	}

}

 class GtTypeEnv {
	public  Context: GtContext;
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
		this.AppendDeclaredVariable(0, RecvType, ThisName, null, null);
		this.LocalStackList.get(this.StackTopIndex-1).NativeName = ThisName;
	}

	public AppendDeclaredVariable(VarFlag: number, Type: GtType, Name: string, NameToken: GtToken, InitValue: Object): GtVariableInfo {
		var VarInfo: GtVariableInfo = new GtVariableInfo(VarFlag, Type, Name, this.StackTopIndex, NameToken, InitValue);
		if(this.StackTopIndex < this.LocalStackList.size()) {
			this.LocalStackList.set(this.StackTopIndex, VarInfo);
		}
		else {
			this.LocalStackList.add(VarInfo);
		}
		this.StackTopIndex += 1;
		return VarInfo;
	}

	public LookupDeclaredVariable(Symbol: string): GtVariableInfo {
		var i: number = this.StackTopIndex - 1;
		while(i >= 0) {
			var VarInfo: GtVariableInfo = this.LocalStackList.get(i);
			if(VarInfo.Name.equals(Symbol)) {
				return VarInfo;
			}
			i = i - 1;
		}
		return null;
	}

	public PushBackStackIndex(PushBackIndex: number): void {
		var i: number = this.StackTopIndex - 1;
		while(i >= PushBackIndex) {
			var VarInfo: GtVariableInfo = this.LocalStackList.get(i);
			VarInfo.Check();
			i = i - 1;
		}
		this.StackTopIndex = PushBackIndex;
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

	public  TypeCheckSingleNode(ParsedTree: GtSyntaxTree, Node: GtNode, Type: GtType, TypeCheckPolicy: number): GtNode {
		LibGreenTea.Assert(Node != null);
		if(Node.IsError() || IsFlag(TypeCheckPolicy, NoCheckPolicy)) {
			return Node;
		}
		var ConstValue: Object = Node.ToConstValue(IsFlag(TypeCheckPolicy, OnlyConstPolicy));
		if(ConstValue != null && !(Node instanceof ConstNode)) {
			Node = this.Generator.CreateConstNode(Node.Type, ParsedTree, ConstValue);
		}
		if(IsFlag(TypeCheckPolicy, OnlyConstPolicy) && ConstValue == null) {
			return this.CreateSyntaxErrorNode(ParsedTree, "value must be const");
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
}

// NameSpace

 class GtNameSpace {
	public  Context: GtContext;
	public  ParentNameSpace: GtNameSpace;
	public PackageName: string;

	TokenMatrix: TokenFunc[];
	SymbolPatternTable: GtMap;

	 constructor(Context: GtContext, ParentNameSpace: GtNameSpace) {
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
					return Value == UndefinedSymbol ? null : Value;
				}
			}
			NameSpace = NameSpace.ParentNameSpace;
		}
		return null;
	}

	public  HasSymbol(Key: string): boolean {
		return (this.GetSymbol(Key) != null);
	}

	public  SetSymbol(Key: string, Value: Object): void {
		if(this.SymbolPatternTable == null) {
			this.SymbolPatternTable = new GtMap();
		}
		this.SymbolPatternTable.put(Key, Value);
		LibGreenTea.VerboseLog(VerboseSymbol, "adding symbol: " + Key + ", " + Value);
	}

	public  SetUndefinedSymbol(Symbol: string): void {
		this.SetSymbol(Symbol, UndefinedSymbol);
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
		var Alias: number = PatternName.indexOf(" ");
		var Name: string = (Alias == -1) ? PatternName : PatternName.substring(0, Alias);
		var Pattern: GtSyntaxPattern = new GtSyntaxPattern(this, Name, MatchFunc, TypeFunc);
		this.AppendPattern(Name, Pattern);
		if(Alias != -1) {
			this.AppendSyntax(PatternName.substring(Alias+1), MatchFunc, TypeFunc);
		}
	}

	public AppendExtendedSyntax(PatternName: string, SyntaxFlag: number, MatchFunc: any, TypeFunc: any): void {
		var Alias: number = PatternName.indexOf(" ");
		var Name: string = (Alias == -1) ? PatternName : PatternName.substring(0, Alias);
		var Pattern: GtSyntaxPattern = new GtSyntaxPattern(this, Name, MatchFunc, TypeFunc);
		Pattern.SyntaxFlag = SyntaxFlag;
		this.AppendPattern("\t" + Name, Pattern);
		if(Alias != -1) {
			this.AppendExtendedSyntax(PatternName.substring(Alias+1), SyntaxFlag, MatchFunc, TypeFunc);
		}
	}

	public  AppendTypeName(ClassInfo: GtType): GtType {
		if(ClassInfo.PackageNameSpace == null) {
			ClassInfo.PackageNameSpace = this;
			if(this.PackageName != null) {
				this.Context.SetGlobalTypeName(this.PackageName + "." + ClassInfo.ShortClassName, ClassInfo);
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

	public  Eval(ScriptSource: string, FileLine: number): Object {
		var ResultValue: Object = null;
		LibGreenTea.VerboseLog(VerboseEval, "eval: " + ScriptSource);
		var TokenContext: GtTokenContext = new GtTokenContext(this, ScriptSource, FileLine);
		this.Context.Generator.StartCompilationUnit();
		TokenContext.SkipEmptyStatement();
		while(TokenContext.HasNext()) {
			var Annotation: GtMap = TokenContext.SkipAndGetAnnotation(true);
			var TopLevelTree: GtSyntaxTree = ParseExpression(this, TokenContext, false/*SuffixOnly*/);
			TopLevelTree.SetAnnotation(Annotation);
			var Gamma: GtTypeEnv = new GtTypeEnv(this);
			var Node: GtNode = TopLevelTree.TypeCheck(Gamma, Gamma.VoidType, DefaultTypeCheckPolicy);
			ResultValue = Node.ToConstValue(true/*EnforceConst*/);
			TokenContext.SkipIncompleteStatement();
			TokenContext.Vacume();
		}
		this.Context.Generator.FinishCompilationUnit();
		return ResultValue;
	}

	public  LoadFile(FileName: string): boolean {
		var ScriptText: string = LibGreenTea.LoadFile2(FileName);
		if(ScriptText != null) {
			var FileLine: number = this.Context.GetFileLine(FileName, 1);
			this.Eval(ScriptText, FileLine);
			return true;
		}
		return false;
	}

	public  LoadRequiredLib(LibName: string): boolean {
		var Key: string = NativeNameSuffix + LibName.toLowerCase();
		if(!this.HasSymbol(Key)) {
			var Path: string = LibGreenTea.GetLibPath(this.Context.Generator.TargetCode, LibName);
			var Script: string = LibGreenTea.LoadFile2(Path);
			if(Script == null) {
				return false;
			}
			var FileLine: number = this.Context.GetFileLine(Path, 1);
			this.Eval(Script, FileLine);
			this.SetSymbol(Key, Script); // Rich
		}
		return true;
	}

}

class GtGrammar {
	public LoadTo(NameSpace: GtNameSpace): void {
		/*extension*/
	}
}

 class GreenTeaGrammar extends GtGrammar {
	// Token
	public static WhiteSpaceToken(TokenContext: GtTokenContext, SourceText: string, pos: number): number {
		TokenContext.FoundWhiteSpace();
		while(pos < SourceText.length) {
			var ch: number = LibGreenTea.CharAt(SourceText, pos);
			if(ch == 10/*\n*/ || !LibGreenTea.IsWhitespace(SourceText, pos)) {
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
			if(!LibGreenTea.IsWhitespace(SourceText, pos)) {
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

	public static SemiColonToken(TokenContext: GtTokenContext, SourceText: string, pos: number): number {
		TokenContext.AddNewToken(SourceText.substring(pos, pos+1), DelimTokenFlag, null);
		return pos+1;
	}

	public static SymbolToken(TokenContext: GtTokenContext, SourceText: string, pos: number): number {
		var start: number = pos;
		var PresetPattern: string = null;
		if(LibGreenTea.CharAt(SourceText, pos + 1) == 36/*$*/ && LibGreenTea.CharAt(SourceText, pos) == 84/*T*/) {
			PresetPattern = "$TypeRef$";  // T$1_0
			pos += 2;
		}
		while(pos < SourceText.length) {
			if(!LibGreenTea.IsVariableName(SourceText, pos) && !LibGreenTea.IsDigit(SourceText, pos)) {
				break;
			}
			pos += 1;
		}
		TokenContext.AddNewToken(SourceText.substring(start, pos), NameSymbolTokenFlag, PresetPattern);
		return pos;
	}

	public static OperatorToken(TokenContext: GtTokenContext, SourceText: string, pos: number): number {
		var NextPos: number = pos + 1;
		while(NextPos < SourceText.length) {
			if(LibGreenTea.IsWhitespace(SourceText, NextPos) || LibGreenTea.IsLetter(SourceText, NextPos) || LibGreenTea.IsDigit(SourceText, NextPos)) {
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
		var NextChar: number = LibGreenTea.CharAt(SourceText, NextPos);
		if(NextChar != 47/*/*/ && NextChar != 42/***/) {
			return NoMatch;
		}
		var Level: number = 0;
		var PrevChar: number = 0;
		if(NextChar == 42/***/) {
			Level = 1;
			// SourceMap ${file:line}
			if(LibGreenTea.CharAt(SourceText, NextPos+1) == 36/*$*/ && LibGreenTea.CharAt(SourceText, NextPos+2) == 123/*{*/) { 
				var StartPos: number = NextPos + 3;
				NextPos += 3;
				while(NextChar != 0) {
					NextChar = LibGreenTea.CharAt(SourceText, NextPos);
					if(NextChar == 125/*}*/) {
						TokenContext.SetSourceMap(SourceText.substring(StartPos, NextPos));
						break;
					}
					if(NextChar == 10/*\n*/ || NextChar == 42/***/) {
						break;  // stop
					}
					NextPos += 1;
				}
			}
		}
		while(NextPos < SourceText.length) {
			NextChar = LibGreenTea.CharAt(SourceText, NextPos);
			if(NextChar == 10/*\n*/ && Level == 0) {
				return GreenTeaGrammar.IndentToken(TokenContext, SourceText, NextPos);
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
		return NoMatch;
	}

	public static NumberLiteralToken(TokenContext: GtTokenContext, SourceText: string, pos: number): number {
		var start: number = pos;
		while(pos < SourceText.length) {
			if(!LibGreenTea.IsDigit(SourceText, pos)) {
				break;
			}
			pos += 1;
		}
		TokenContext.AddNewToken(SourceText.substring(start, pos), 0, "$IntegerLiteral$");
		return pos;
	}

	public static CharLiteralToken(TokenContext: GtTokenContext, SourceText: string, pos: number): number {
		var start: number = pos;
		var prev: number = 92/*\'*/;
		pos = pos + 1; // eat "\'"
		while(pos < SourceText.length) {
			var ch: number = LibGreenTea.CharAt(SourceText, pos);
			if(ch == 92/*\'*/ && prev != 92/*\\*/) {
				TokenContext.AddNewToken(SourceText.substring(start, pos + 1), QuotedTokenFlag, "$CharLiteral$");
				return pos + 1;
			}
			if(ch == 10/*\n*/) {
				TokenContext.ReportTokenError(ErrorLevel, "expected ' to close the charctor literal", SourceText.substring(start, pos));
				TokenContext.FoundLineFeed(1);
				return pos;
			}
			pos = pos + 1;
			prev = ch;
		}
		TokenContext.ReportTokenError(ErrorLevel, "expected ' to close the charctor literal", SourceText.substring(start, pos));
		return pos;
	}

	public static StringLiteralToken(TokenContext: GtTokenContext, SourceText: string, pos: number): number {
		var start: number = pos;
		var prev: number = 34/*"*/;
		pos = pos + 1; // eat "\""
		while(pos < SourceText.length) {
			var ch: number = LibGreenTea.CharAt(SourceText, pos);
			if(ch == 34/*"*/ && prev != 92/*\\*/) {
				TokenContext.AddNewToken(SourceText.substring(start, pos + 1), QuotedTokenFlag, "$StringLiteral$");
				return pos + 1;
			}
			if(ch == 10/*\n*/) {
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
				var nextch: number = LibGreenTea.CharAt(SourceText, end);
				if(nextch == 123/*{*/) {
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
			if(ch == 34/*"*/ && prev != 92/*\\*/) {
				TokenContext.AddNewToken("\"" + SourceText.substring(start, NextPos) + "\"", 0, "$StringLiteral$");
				return NextPos + 1;
			}
			if(ch == 10/*\n*/) {
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

	public static ParseTypeOf(NameSpace: GtNameSpace, TokenContext: GtTokenContext, LeftTree: GtSyntaxTree, Pattern: GtSyntaxPattern): GtSyntaxTree {
		var TypeOfTree: GtSyntaxTree = new GtSyntaxTree(Pattern, NameSpace, TokenContext.GetMatchedToken("typeof"), null);
		TypeOfTree.SetMatchedTokenAt(NoWhere, NameSpace, TokenContext, "(", Required);
		TypeOfTree.SetMatchedPatternAt(UnaryTerm, NameSpace, TokenContext, "$Expression$", Required);
		TypeOfTree.SetMatchedTokenAt(NoWhere, NameSpace, TokenContext, ")", Required);
		if(!TypeOfTree.IsEmptyOrError()) {
			var Gamma: GtTypeEnv = new GtTypeEnv(NameSpace);
			var ObjectNode: GtNode = TypeOfTree.TypeCheckNodeAt(UnaryTerm, Gamma, Gamma.VarType, DefaultTypeCheckPolicy);
			if(ObjectNode.IsError()) {
				TypeOfTree.ToError(ObjectNode.Token);
			}
			else {
				TypeOfTree.ToConstTree(ObjectNode.Type);
				var TypeTree: GtSyntaxTree = TokenContext.ParsePatternAfter(NameSpace, TypeOfTree, "$TypeSuffix$", Optional);
				return (TypeTree == null) ? TypeOfTree : TypeTree;
			}
		}
		return TypeOfTree;
	}

	public static ParseTypeSuffix(NameSpace: GtNameSpace, TokenContext: GtTokenContext, TypeTree: GtSyntaxTree, Pattern: GtSyntaxPattern): GtSyntaxTree {
		var ParsedType: GtType = TypeTree.GetParsedType();
		if(ParsedType.IsGenericType()) {
			if(TokenContext.MatchToken("<")) {  // Generics
				var TypeList: Array<GtType> = new Array<GtType>();
				while(!TokenContext.StartsWithToken(">")) {
					if(TypeList.size() > 0 && !TokenContext.MatchToken(",")) {
						return null;
					}
					var ParamTypeTree: GtSyntaxTree = TokenContext.ParsePattern(NameSpace, "$Type$", Optional);
					if(ParamTypeTree == null) {
						return ParamTypeTree;
					}
					TypeList.add(ParamTypeTree.GetParsedType());
				}
				ParsedType = NameSpace.Context.GetGenericType(ParsedType, 0, TypeList, true);
			}
		}
		while(TokenContext.MatchToken("[")) {  // Array
			if(!TokenContext.MatchToken("]")) {
				return null;
			}
			ParsedType = NameSpace.Context.GetGenericType1(NameSpace.Context.ArrayType, ParsedType, true);
		}
		TypeTree.ToConstTree(ParsedType);
		return TypeTree;
	}

	// parser and type checker
	public static ParseType(NameSpace: GtNameSpace, TokenContext: GtTokenContext, LeftTree: GtSyntaxTree, Pattern: GtSyntaxPattern): GtSyntaxTree {
		if(TokenContext.MatchToken("typeof")) {
			return GreenTeaGrammar.ParseTypeOf(NameSpace, TokenContext, LeftTree, Pattern);
		}
		var Token: GtToken = TokenContext.Next();
		var ConstValue: Object = NameSpace.GetSymbol(Token.ParsedText);
		if(!(ConstValue instanceof GtType)) {
			return null;  // Not matched
		}
		var TypeTree: GtSyntaxTree = new GtSyntaxTree(Pattern, NameSpace, Token, ConstValue);
		var TypeSuffixTree: GtSyntaxTree = TokenContext.ParsePatternAfter(NameSpace, TypeTree, "$TypeSuffix$", Optional);
		return (TypeSuffixTree == null) ? TypeTree : TypeSuffixTree;
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
		if((typeof ParsedTree.ConstValue == 'string' || ParsedTree.ConstValue instanceof String)) { // FIXME IMIFU
			ParsedTree.ConstValue = <string> ParsedTree.ConstValue;
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
		if(ThisType.DefaultNullValue != null) {
			return Gamma.Generator.CreateConstNode(ThisType, ParsedTree, ThisType.DefaultNullValue);
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
			TypeTree.Pattern = NameSpace.GetPattern("$Const$");
			return TypeTree;
		}
		var Token: GtToken = TokenContext.Next();
		var VarTree: GtSyntaxTree = new GtSyntaxTree(NameSpace.GetPattern("$Variable$"), NameSpace, Token, null);
		if(!LibGreenTea.IsVariableName(Token.ParsedText, 0)) {
//			NameSpace.Context.ReportError(ErrorLevel, Token, "illegal variable name: '" + Token.ParsedText + "'");
//			VarTree.ToError(Token);
			return null;
		}
		return VarTree;
	}

	public static ParseVariable(NameSpace: GtNameSpace, TokenContext: GtTokenContext, LeftTree: GtSyntaxTree, Pattern: GtSyntaxPattern): GtSyntaxTree {
		var Token: GtToken = TokenContext.Next();
		if(LibGreenTea.IsVariableName(Token.ParsedText, 0)) {
			return new GtSyntaxTree(Pattern, NameSpace, Token, null);
		}
		return null;
	}

	public static TypeVariable(Gamma: GtTypeEnv, ParsedTree: GtSyntaxTree, ContextType: GtType): GtNode {
		var Name: string = ParsedTree.KeyToken.ParsedText;
		var VariableInfo: GtVariableInfo = Gamma.LookupDeclaredVariable(Name);
		if(VariableInfo != null) {
			VariableInfo.Used();
			return Gamma.Generator.CreateLocalNode(VariableInfo.Type, ParsedTree, VariableInfo.NativeName);
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
			NextTree.SetMatchedPatternAt(VarDeclName, NameSpace, TokenContext, "$Variable$", Required);
			if(TokenContext.MatchToken("=")) {
				NextTree.SetMatchedPatternAt(VarDeclValue, NameSpace, TokenContext, "$Expression$", Required);
			}
			Tree = LinkTree(Tree, NextTree);
		}
		return Tree;
	}

	public static TypeVarDecl(Gamma: GtTypeEnv, ParsedTree: GtSyntaxTree, ContextType: GtType): GtNode {
		var VarFlag: number = Gamma.Generator.ParseVarFlag(0, ParsedTree.Annotation);
		var DeclType: GtType = ParsedTree.GetSyntaxTreeAt(VarDeclType).GetParsedType();
		var VariableName: string = ParsedTree.GetSyntaxTreeAt(VarDeclName).KeyToken.ParsedText;
		var InitValueNode: GtNode = null;
		if(ParsedTree.HasNodeAt(VarDeclValue)) {
			InitValueNode = ParsedTree.TypeCheckNodeAt(VarDeclValue, Gamma, DeclType, DefaultTypeCheckPolicy);
		}
		if(UseLangStat) {
			Gamma.Context.Stat.VarDecl += 1;
		}/*EndOfStat*/
		if(DeclType.IsVarType()) {
			if(InitValueNode == null) {
				DeclType = Gamma.AnyType;
			}
			else {
				DeclType = InitValueNode.Type;
			}
			Gamma.ReportTypeInference(ParsedTree.KeyToken, VariableName, DeclType);
			if(UseLangStat) {
				Gamma.Context.Stat.VarDeclInfer += 1;
				if(DeclType.IsAnyType()) {
					Gamma.Context.Stat.VarDeclInferAny += 1;
				}
			}/*EndOfStat*/
		}
		if(UseLangStat) {
			if(DeclType.IsAnyType()) {
				Gamma.Context.Stat.VarDeclAny += 1;
			}
		}/*EndOfStat*/
		if(InitValueNode == null) {
			InitValueNode = Gamma.CreateDefaultValue(ParsedTree, DeclType);
		}
		var VarInfo: GtVariableInfo = Gamma.AppendDeclaredVariable(VarFlag, DeclType, VariableName, ParsedTree.GetSyntaxTreeAt(VarDeclName).KeyToken, InitValueNode.ToConstValue(false));
		var BlockNode: GtNode = TypeBlock(Gamma, ParsedTree.NextTree, Gamma.VoidType);
		ParsedTree.NextTree = null;
		return Gamma.Generator.CreateVarNode(DeclType, ParsedTree, DeclType, VarInfo.NativeName, InitValueNode, BlockNode);
	}

	// Parse And Type
	public static ParseIntegerLiteral(NameSpace: GtNameSpace, TokenContext: GtTokenContext, LeftTree: GtSyntaxTree, Pattern: GtSyntaxPattern): GtSyntaxTree {
		var Token: GtToken = TokenContext.Next();
		return new GtSyntaxTree(Pattern, NameSpace, Token, LibGreenTea.ParseInt(Token.ParsedText));
	}

	public static ParseStringLiteral(NameSpace: GtNameSpace, TokenContext: GtTokenContext, LeftTree: GtSyntaxTree, Pattern: GtSyntaxPattern): GtSyntaxTree {
		var Token: GtToken = TokenContext.Next();
		var NewTree: GtSyntaxTree = new GtSyntaxTree(Pattern, NameSpace, Token, LibGreenTea.UnquoteString(Token.ParsedText));
		return NewTree;
	}

	public static ParseCharLiteral(NameSpace: GtNameSpace, TokenContext: GtTokenContext, LeftTree: GtSyntaxTree, Pattern: GtSyntaxPattern): GtSyntaxTree {
		var Token: GtToken = TokenContext.Next();
		var NewTree: GtSyntaxTree = new GtSyntaxTree(Pattern, NameSpace, Token, LibGreenTea.UnquoteString(Token.ParsedText));
		return NewTree;
	}

	public static TypeCharLiteral(Gamma: GtTypeEnv, ParsedTree: GtSyntaxTree, ContextType: GtType): GtNode {
		var Text: string = ParsedTree.KeyToken.ParsedText;
		if(Text.length == 3/*'A'*/) {
			var ch: number = LibGreenTea.CharAt(Text, 1);
			var Value: Object = ch;
			ParsedTree.ConstValue = LibGreenTea.ParseInt(Value.toString());
		}
		else if(Text.length == 4/*'\n'*/) {
			var ch: number = LibGreenTea.CharAt(Text, 2);
			if(LibGreenTea.CharAt(Text, 1) == 92/*\\*/) {
				switch(ch) {
				case 92/*\'*/: ch = 92/*\'*/; break;
				case 92/*\\*/: ch = 92/*\\*/; break;
				case 98/*b*/:  ch = 92/*\b*/; break;
				case 102/*f*/:  ch = 92/*\f*/; break;
				case 110/*n*/:  ch = 10/*\n*/; break;
				case 114/*r*/:  ch = 92/*\r*/; break;
				case 116/*t*/:  ch = 9/*\t*/; break;
				default:   ch = -1;
				}
				if(ch >= 0) {
					var Value: Object = ch;
					ParsedTree.ConstValue = LibGreenTea.ParseInt(Value.toString());
				}
			}
		}
		return GreenTeaGrammar.TypeConst(Gamma, ParsedTree, ContextType);
	}

	public static ParseTypeRef(NameSpace: GtNameSpace, TokenContext: GtTokenContext, LeftTree: GtSyntaxTree, Pattern: GtSyntaxPattern): GtSyntaxTree {
		var Token: GtToken = TokenContext.Next();
		var NewTree: GtSyntaxTree = new GtSyntaxTree(Pattern, NameSpace, Token, Token.ParsedText);
		return NewTree;
	}

	public static TypeTypeRef(Gamma: GtTypeEnv, ParsedTree: GtSyntaxTree, ContextType: GtType): GtNode {
		var TypeRef: string = ParsedTree.KeyToken.ParsedText;
		return Gamma.CreateSyntaxErrorNode(ParsedTree, "illegal use of type reference: " + TypeRef);
	}

	public static ParseExpression(NameSpace: GtNameSpace, TokenContext: GtTokenContext, LeftTree: GtSyntaxTree, Pattern: GtSyntaxPattern): GtSyntaxTree {
		return ParseExpression(NameSpace, TokenContext, false/*SuffixOnly*/);
	}

	public static ParseUnary(NameSpace: GtNameSpace, TokenContext: GtTokenContext, LeftTree: GtSyntaxTree, Pattern: GtSyntaxPattern): GtSyntaxTree {
		var Token: GtToken = TokenContext.Next();
		var Tree: GtSyntaxTree = new GtSyntaxTree(Pattern, NameSpace, Token, null);
		var SubTree: GtSyntaxTree = ParseExpression(NameSpace, TokenContext, true/*SuffixOnly*/);
		Tree.SetSyntaxTreeAt(UnaryTerm, SubTree);
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

	private static RightJoin(NameSpace: GtNameSpace, LeftTree: GtSyntaxTree, Pattern: GtSyntaxPattern, OperatorToken: GtToken, RightTree: GtSyntaxTree): GtSyntaxTree {
		var RightLeft: GtSyntaxTree = RightTree.GetSyntaxTreeAt(LeftHandTerm);
		if(RightLeft.Pattern.IsBinaryOperator() && Pattern.IsRightJoin(RightLeft.Pattern)) {
			RightTree.SetSyntaxTreeAt(LeftHandTerm, GreenTeaGrammar.RightJoin(NameSpace, LeftTree, Pattern, OperatorToken, RightLeft));
		}
		else {
			var NewTree: GtSyntaxTree = new GtSyntaxTree(Pattern, NameSpace, OperatorToken, null);
			NewTree.SetSyntaxTreeAt(LeftHandTerm, LeftTree);
			NewTree.SetSyntaxTreeAt(RightHandTerm, RightLeft);
			RightTree.SetSyntaxTreeAt(LeftHandTerm, NewTree);
		}
		return RightTree;
	}

	public static ParseBinary(NameSpace: GtNameSpace, TokenContext: GtTokenContext, LeftTree: GtSyntaxTree, Pattern: GtSyntaxPattern): GtSyntaxTree {
		var OperatorToken: GtToken = TokenContext.Next();
		var RightTree: GtSyntaxTree = ParseExpression(NameSpace, TokenContext, false/*SuffixOnly*/);
		if(IsEmptyOrError(RightTree)) {
			return RightTree;
		}
		//System.err.println("left=" + Pattern.SyntaxFlag + ", right=" + RightTree.Pattern.SyntaxFlag + ", binary?" +  RightTree.Pattern.IsBinaryOperator() + RightTree.Pattern);
		if(RightTree.Pattern.IsBinaryOperator() && Pattern.IsRightJoin(RightTree.Pattern)) {
			return GreenTeaGrammar.RightJoin(NameSpace, LeftTree, Pattern, OperatorToken, RightTree);
		}
		// LeftJoin
		var NewTree: GtSyntaxTree = new GtSyntaxTree(Pattern, NameSpace, OperatorToken, null);
		NewTree.SetSyntaxTreeAt(LeftHandTerm, LeftTree);
		NewTree.SetSyntaxTreeAt(RightHandTerm, RightTree);
		if(RightTree.NextTree != null) {  // necesarry; don't remove 
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
			var ParamList: Array<GtNode> = new Array<GtNode>();
			ParamList.add(LeftNode);
			ResolvedFunc = PolyFunc.ResolveFunc(Gamma, ParsedTree, 1, ParamList);
			if(ResolvedFunc != null) {
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

	public static ParseTrinary(NameSpace: GtNameSpace, TokenContext: GtTokenContext, LeftTree: GtSyntaxTree, Pattern: GtSyntaxPattern): GtSyntaxTree {
		var TrinaryTree: GtSyntaxTree = new GtSyntaxTree(Pattern, NameSpace, TokenContext.GetMatchedToken("?"), null);
		TrinaryTree.SetSyntaxTreeAt(IfCond, LeftTree);
		TrinaryTree.SetMatchedPatternAt(IfThen, NameSpace, TokenContext, "$Expression$", Required);
		TrinaryTree.SetMatchedTokenAt(NoWhere, NameSpace, TokenContext, ":", Required);
		TrinaryTree.SetMatchedPatternAt(IfElse, NameSpace, TokenContext, "$Expression$", Required);
		return TrinaryTree;
	}

	public static TypeTrinary(Gamma: GtTypeEnv, ParsedTree: GtSyntaxTree, ContextType: GtType): GtNode {
		var CondNode: GtNode = ParsedTree.TypeCheckNodeAt(IfCond, Gamma, Gamma.BooleanType, DefaultTypeCheckPolicy);
		var ThenNode: GtNode = ParsedTree.TypeCheckNodeAt(IfThen, Gamma, Gamma.VarType, DefaultTypeCheckPolicy);
		if(ThenNode.IsError()) {
			return ThenNode;
		}
		var ElseNode: GtNode = ParsedTree.TypeCheckNodeAt(IfElse, Gamma, ThenNode.Type, DefaultTypeCheckPolicy);
		return Gamma.Generator.CreateTrinaryNode(ThenNode.Type, ParsedTree, CondNode, ThenNode, ElseNode);
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
		var ExprTree: GtSyntaxTree = ParseExpression(NameSpace, TokenContext, true/*SuffixOnly*/);
		CastTree.SetSyntaxTreeAt(RightHandTerm, ExprTree);
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
			// EnumType.EnumValue
			if(ObjectType.IsEnumType()) {
				LibGreenTea.Assert(ObjectType.NativeSpec instanceof GtMap);
				var NativeSpec: GtMap = <GtMap>ObjectType.NativeSpec;
				var EnumValue: GreenTeaEnum = <GreenTeaEnum> NativeSpec.get(Name);
				if(EnumValue != null) {
					return Gamma.Generator.CreateConstNode(Gamma.Context.GuessType(EnumValue), ParsedTree, EnumValue);
				}
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

	public static ParseDefined(NameSpace: GtNameSpace, TokenContext: GtTokenContext, LeftTree: GtSyntaxTree, Pattern: GtSyntaxPattern): GtSyntaxTree {
		var DefinedTree: GtSyntaxTree = new GtSyntaxTree(Pattern, NameSpace, TokenContext.GetMatchedToken("defined"), null);
		DefinedTree.SetMatchedTokenAt(NoWhere, NameSpace, TokenContext, "(", Required);
		DefinedTree.SetMatchedPatternAt(UnaryTerm, NameSpace, TokenContext, "$Expression$", Required);
		DefinedTree.SetMatchedTokenAt(NoWhere, NameSpace, TokenContext, ")", Required);
		return DefinedTree;
	}

	public static TypeDefined(Gamma: GtTypeEnv, ParsedTree: GtSyntaxTree, Type: GtType): GtNode {
		Gamma.Context.SetNoErrorReport(true);
		var ObjectNode: GtNode = ParsedTree.TypeCheckNodeAt(UnaryTerm, Gamma, Gamma.VarType, DefaultTypeCheckPolicy);
		Gamma.Context.SetNoErrorReport(false);
		return Gamma.Generator.CreateConstNode(Gamma.BooleanType, ParsedTree, (ObjectNode instanceof ConstNode));
	}
	public static ParseApply(NameSpace: GtNameSpace, TokenContext: GtTokenContext, LeftTree: GtSyntaxTree, Pattern: GtSyntaxPattern): GtSyntaxTree {
		var ParseFlag: number = TokenContext.ParseFlag;
		TokenContext.ParseFlag |= SkipIndentParseFlag;
		var FuncTree: GtSyntaxTree = new GtSyntaxTree(Pattern, NameSpace, TokenContext.GetMatchedToken("("), null);
		FuncTree.AppendParsedTree(LeftTree);
		if(!TokenContext.MatchToken(")")) {
			while(!FuncTree.IsEmptyOrError()) {
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
			LibGreenTea.Assert(PolyFunc != null);
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
			while(TreeIndex < LibGreenTea.ListSize(ParsedTree.TreeList)) {
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
			LibGreenTea.Assert(LibGreenTea.ListSize(ParsedTree.TreeList) == FuncType.TypeParams.length); // FIXME: add check paramerter size
			while(TreeIndex < LibGreenTea.ListSize(ParsedTree.TreeList)) {
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

	public static TypeInstanceOf(Gamma: GtTypeEnv, ParsedTree: GtSyntaxTree, ContextType: GtType): GtNode {
		var LeftNode: GtNode = ParsedTree.TypeCheckNodeAt(LeftHandTerm, Gamma, Gamma.VarType, DefaultTypeCheckPolicy);
		var GivenType: GtType = ParsedTree.GetSyntaxTreeAt(RightHandTerm).GetParsedType();
		if(GivenType != null) {
			return Gamma.CreateSyntaxErrorNode(ParsedTree,  "type is expected in" + ParsedTree.KeyToken);
		}
		return Gamma.Generator.CreateInstanceOfNode(Gamma.BooleanType, ParsedTree, LeftNode, GivenType);
	}

	public static TypeAssign(Gamma: GtTypeEnv, ParsedTree: GtSyntaxTree, ContextType: GtType): GtNode {
		var LeftNode: GtNode = ParsedTree.TypeCheckNodeAt(LeftHandTerm, Gamma, Gamma.VarType, DefaultTypeCheckPolicy);
		
		if(LeftNode instanceof LocalNode || LeftNode instanceof GetterNode || LeftNode instanceof IndexerNode) {
			var RightNode: GtNode = ParsedTree.TypeCheckNodeAt(RightHandTerm, Gamma, LeftNode.Type, DefaultTypeCheckPolicy);
			return Gamma.Generator.CreateAssignNode(LeftNode.Type, ParsedTree, LeftNode, RightNode);
		}
		return Gamma.CreateSyntaxErrorNode(ParsedTree, "not assigned to a left hand value");
	}

	public static TypeSelfAssign(Gamma: GtTypeEnv, ParsedTree: GtSyntaxTree, ContextType: GtType): GtNode {
		var LeftNode: GtNode = ParsedTree.TypeCheckNodeAt(LeftHandTerm, Gamma, Gamma.VarType, DefaultTypeCheckPolicy);
		if(LeftNode instanceof LocalNode || LeftNode instanceof GetterNode || LeftNode instanceof IndexerNode) {
			var RightNode: GtNode = ParsedTree.TypeCheckNodeAt(RightHandTerm, Gamma, LeftNode.Type, DefaultTypeCheckPolicy);
			return Gamma.Generator.CreateSelfAssignNode(LeftNode.Type, ParsedTree, LeftNode, RightNode);
		}
		return Gamma.CreateSyntaxErrorNode(ParsedTree, "not assigned to a left hand value");
	}

	public static ParseIncl(NameSpace: GtNameSpace, TokenContext: GtTokenContext, LeftTree: GtSyntaxTree, Pattern: GtSyntaxPattern): GtSyntaxTree {
		var InclTree: GtSyntaxTree = new GtSyntaxTree(Pattern, NameSpace, TokenContext.Next(), null);
		if(LeftTree != null) { /* i++ */
			InclTree.SetSyntaxTreeAt(UnaryTerm, LeftTree);
		}
		else { /* ++i */
			var Tree: GtSyntaxTree = TokenContext.ParsePattern(NameSpace, "$Expression$", Required);
			InclTree.SetSyntaxTreeAt(UnaryTerm, Tree);
		}
		return InclTree;
	}

	public static TypeIncl(Gamma: GtTypeEnv, ParsedTree: GtSyntaxTree, Type: GtType): GtNode {
		var LeftNode: GtNode = ParsedTree.TypeCheckNodeAt(UnaryTerm, Gamma, Gamma.VarType, DefaultTypeCheckPolicy);
		if(LeftNode.Type == Gamma.IntType) {
			if(Type != Gamma.VoidType) {
				Gamma.Context.ReportError(WarningLevel, ParsedTree.KeyToken, "only available as statement: " + ParsedTree.KeyToken);
			}
			if(LeftNode instanceof LocalNode || LeftNode instanceof GetterNode || LeftNode instanceof IndexerNode) {
				var ConstNode: GtNode = Gamma.Generator.CreateConstNode(LeftNode.Type, ParsedTree, 1);
				return Gamma.Generator.CreateSelfAssignNode(LeftNode.Type, ParsedTree, LeftNode, ConstNode);
			}
			return Gamma.CreateSyntaxErrorNode(ParsedTree, "neither incremental nor decrimental");
		}
		return LeftNode.IsError() ? LeftNode : GreenTeaGrammar.TypeUnary(Gamma, ParsedTree, Type);
	}

	public static ParseEmpty(NameSpace: GtNameSpace, TokenContext: GtTokenContext, LeftTree: GtSyntaxTree, Pattern: GtSyntaxPattern): GtSyntaxTree {
		return new GtSyntaxTree(Pattern, NameSpace, TokenContext.GetBeforeToken(), null);
	}

	public static TypeEmpty(Gamma: GtTypeEnv, ParsedTree: GtSyntaxTree, Type: GtType): GtNode {
		return Gamma.Generator.CreateEmptyNode(Gamma.VoidType);
	}

	public static ParseRequire(NameSpace: GtNameSpace, TokenContext: GtTokenContext, LeftTree: GtSyntaxTree, Pattern: GtSyntaxPattern): GtSyntaxTree {
		TokenContext.Next(); // skipped first token "require";
		while(TokenContext.HasNext()) {
			var Token: GtToken = TokenContext.Next();
			if(Token.IsIndent() || Token.IsDelim()) {
				break;
			}
			if(Token.IsNameSymbol()) {
				if(!NameSpace.LoadRequiredLib(Token.ParsedText)) {
					NameSpace.Context.ReportError(ErrorLevel, Token, "no required library: " + Token.ParsedText);
					TokenContext.StopParsing(true);
				}
			}
			if(TokenContext.MatchToken(",")) {
				continue;
			}
		}
		return GreenTeaGrammar.ParseEmpty(NameSpace, TokenContext, LeftTree, Pattern);
	}

	public static ParseImport(NameSpace: GtNameSpace, TokenContext: GtTokenContext, LeftTree: GtSyntaxTree, Pattern: GtSyntaxPattern): GtSyntaxTree {
		var ImportTree: GtSyntaxTree = new GtSyntaxTree(Pattern, NameSpace, TokenContext.GetMatchedToken("import"), null);
		var Token: GtToken = TokenContext.Next();
		var PackageName: string = LibGreenTea.UnquoteString(Token.ParsedText);
		while(TokenContext.HasNext()) {
			Token = TokenContext.Next();
			if(Token.IsNameSymbol() || LibGreenTea.EqualsString(Token.ParsedText, ".")) {
				PackageName += Token.ParsedText;
				continue;
			}
			break;
		}
		ImportTree.ConstValue = PackageName;
		return ImportTree;
	}

	public static TypeImport(Gamma: GtTypeEnv, ParsedTree: GtSyntaxTree, Type: GtType): GtNode {
		var Value: Object = Gamma.Generator.ImportNativeObject(Type, <string>ParsedTree.ConstValue);
		if(Value == null) {
			return Gamma.CreateSyntaxErrorNode(ParsedTree, "cannot import: " + ParsedTree.ConstValue);
		}
		return Gamma.Generator.CreateConstNode(Gamma.Context.GuessType(Value), ParsedTree, Value);
	}

	public static ParseBlock(ParentNameSpace: GtNameSpace, TokenContext: GtTokenContext, LeftTree: GtSyntaxTree, Pattern: GtSyntaxPattern): GtSyntaxTree {
		if(TokenContext.MatchToken("{")) {
			var PrevTree: GtSyntaxTree = null;
			var NameSpace: GtNameSpace = new GtNameSpace(ParentNameSpace.Context, ParentNameSpace);
			while(TokenContext.HasNext()) {
				TokenContext.SkipEmptyStatement();
				if(TokenContext.MatchToken("}")) {
					break;
				}
				var Annotation: GtMap = TokenContext.SkipAndGetAnnotation(true);
				var ParsedTree: GtSyntaxTree = ParseExpression(NameSpace, TokenContext, false/*SuffixOnly*/);
				if(IsEmptyOrError(ParsedTree)) {
					return ParsedTree;
				}
				ParsedTree.SetAnnotation(Annotation);
				//PrevTree = GtStatic.TreeTail(GtStatic.LinkTree(PrevTree, GtStatic.TreeHead(CurrentTree)));
				if(ParsedTree.PrevTree != null) {
					ParsedTree = TreeHead(ParsedTree);
				}
				PrevTree = LinkTree(PrevTree, ParsedTree);
				TokenContext.SkipIncompleteStatement();  // check; and skip empty statement
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
			StmtTree = ParseExpression(NameSpace, TokenContext, false/*SuffixOnly*/);
		}
		if(StmtTree == null) {
			StmtTree = TokenContext.ParsePattern(NameSpace, "$Empty$", Required);
		}
		return StmtTree;
	}

	// If Statement
	public static ParseIf(NameSpace: GtNameSpace, TokenContext: GtTokenContext, LeftTree: GtSyntaxTree, Pattern: GtSyntaxPattern): GtSyntaxTree {
		var Token: GtToken = TokenContext.GetMatchedToken("if");
		var NewTree: GtSyntaxTree = new GtSyntaxTree(Pattern, NameSpace, Token, null);
		NewTree.SetMatchedTokenAt(NoWhere, NameSpace, TokenContext, "(", Required);
		var ParseFlag: number = TokenContext.ParseFlag;
		TokenContext.ParseFlag |= SkipIndentParseFlag;
		NewTree.SetMatchedPatternAt(IfCond, NameSpace, TokenContext, "$Expression$", Required);
		NewTree.SetMatchedTokenAt(NoWhere, NameSpace, TokenContext, ")", Required);
		TokenContext.ParseFlag = ParseFlag;
		TokenContext.SkipIndent();
		NewTree.SetMatchedPatternAt(IfThen, NameSpace, TokenContext, "$Statement$", Required);
		if(TokenContext.MatchIndentToken("else")) {
			TokenContext.SkipIndent();
			NewTree.SetMatchedPatternAt(IfElse, NameSpace, TokenContext, "$Statement$", Required);
		}
		return NewTree;
	}

	public static TypeIf(Gamma: GtTypeEnv, ParsedTree: GtSyntaxTree, ContextType: GtType): GtNode {
		var CondNode: GtNode = ParsedTree.TypeCheckNodeAt(IfCond, Gamma, Gamma.BooleanType, DefaultTypeCheckPolicy);
		var ThenNode: GtNode = ParsedTree.TypeCheckNodeAt(IfThen, Gamma, Gamma.VoidType, DefaultTypeCheckPolicy);
		var ElseNode: GtNode = ParsedTree.TypeCheckNodeAt(IfElse, Gamma, Gamma.VoidType, DefaultTypeCheckPolicy);
		return Gamma.Generator.CreateIfNode(ThenNode.Type, ParsedTree, CondNode, ThenNode, ElseNode);
	}

	// While Statement
	public static ParseWhile(NameSpace: GtNameSpace, TokenContext: GtTokenContext, LeftTree: GtSyntaxTree, Pattern: GtSyntaxPattern): GtSyntaxTree {
		var WhileTree: GtSyntaxTree = new GtSyntaxTree(Pattern, NameSpace, TokenContext.GetMatchedToken("while"), null);
		WhileTree.SetMatchedTokenAt(NoWhere, NameSpace, TokenContext, "(", Required);
		WhileTree.SetMatchedPatternAt(WhileCond, NameSpace, TokenContext, "$Expression$", Required);
		WhileTree.SetMatchedTokenAt(NoWhere, NameSpace, TokenContext, ")", Required);
		WhileTree.SetMatchedPatternAt(WhileBody, NameSpace, TokenContext, "$Statement$", Required);
		return WhileTree;
	}

	public static TypeWhile(Gamma: GtTypeEnv, ParsedTree: GtSyntaxTree, ContextType: GtType): GtNode {
		var CondNode: GtNode = ParsedTree.TypeCheckNodeAt(WhileCond, Gamma, Gamma.BooleanType, DefaultTypeCheckPolicy);
		var BodyNode: GtNode =  ParsedTree.TypeCheckNodeAt(WhileBody, Gamma, Gamma.VoidType, DefaultTypeCheckPolicy);
		return Gamma.Generator.CreateWhileNode(BodyNode.Type, ParsedTree, CondNode, BodyNode);
	}

	// DoWhile Statement
	public static ParseDoWhile(NameSpace: GtNameSpace, TokenContext: GtTokenContext, LeftTree: GtSyntaxTree, Pattern: GtSyntaxPattern): GtSyntaxTree {
		var Tree: GtSyntaxTree = new GtSyntaxTree(Pattern, NameSpace, TokenContext.GetMatchedToken("do"), null);
		Tree.SetMatchedPatternAt(WhileBody, NameSpace, TokenContext, "$Statement$", Required);
		Tree.SetMatchedTokenAt(NoWhere, NameSpace, TokenContext, "while", Required);
		Tree.SetMatchedTokenAt(NoWhere, NameSpace, TokenContext, "(", Required);
		Tree.SetMatchedPatternAt(WhileCond, NameSpace, TokenContext, "$Expression$", Required);
		Tree.SetMatchedTokenAt(NoWhere, NameSpace, TokenContext, ")", Required);
		return Tree;
	}

	public static TypeDoWhile(Gamma: GtTypeEnv, ParsedTree: GtSyntaxTree, ContextType: GtType): GtNode {
		var CondNode: GtNode = ParsedTree.TypeCheckNodeAt(WhileCond, Gamma, Gamma.BooleanType, DefaultTypeCheckPolicy);
		var BodyNode: GtNode =  ParsedTree.TypeCheckNodeAt(WhileBody, Gamma, Gamma.VoidType, DefaultTypeCheckPolicy);
		return Gamma.Generator.CreateDoWhileNode(BodyNode.Type, ParsedTree, CondNode, BodyNode);
	}

	// For Statement
	public static ParseFor(NameSpace: GtNameSpace, TokenContext: GtTokenContext, LeftTree: GtSyntaxTree, Pattern: GtSyntaxPattern): GtSyntaxTree {
		var Tree: GtSyntaxTree = new GtSyntaxTree(Pattern, NameSpace, TokenContext.GetMatchedToken("for"), null);
		Tree.SetMatchedTokenAt(NoWhere, NameSpace, TokenContext, "(", Required);
		Tree.SetMatchedPatternAt(ForInit, NameSpace, TokenContext, "$Expression$", Optional);
		Tree.SetMatchedTokenAt(NoWhere, NameSpace, TokenContext, ";", Required);
		Tree.SetMatchedPatternAt(ForCond, NameSpace, TokenContext, "$Expression$", Optional);
		Tree.SetMatchedTokenAt(NoWhere, NameSpace, TokenContext, ";", Required);
		Tree.SetMatchedPatternAt(ForIteration, NameSpace, TokenContext, "$Expression$", Optional);
		Tree.SetMatchedTokenAt(NoWhere, NameSpace, TokenContext, ")", Required);
		Tree.SetMatchedPatternAt(ForBody, NameSpace, TokenContext, "$Statement$", Required);
		return Tree;
	}

	public static TypeFor(Gamma: GtTypeEnv, ParsedTree: GtSyntaxTree, ContextType: GtType): GtNode {
		var InitNode: GtNode = null;
		var CondNode: GtNode = null;
		var IterNode: GtNode = null;
		if(ParsedTree.HasNodeAt(ForInit)) {
			InitNode =  ParsedTree.TypeCheckNodeAt(ForInit, Gamma, Gamma.VarType, DefaultTypeCheckPolicy);
		}
		if(ParsedTree.HasNodeAt(ForCond)) {
			CondNode =  ParsedTree.TypeCheckNodeAt(ForCond, Gamma, Gamma.BooleanType, DefaultTypeCheckPolicy);
		}
		if(ParsedTree.HasNodeAt(ForIteration)) {
			IterNode =  ParsedTree.TypeCheckNodeAt(ForIteration, Gamma, Gamma.VarType, DefaultTypeCheckPolicy);
		}
		var BodyNode: GtNode =  ParsedTree.TypeCheckNodeAt(ForBody, Gamma, Gamma.VoidType, DefaultTypeCheckPolicy);
		var ForNode: GtNode = Gamma.Generator.CreateForNode(BodyNode.Type, ParsedTree, CondNode, IterNode, BodyNode);
		if(InitNode != null) {
			if(InitNode instanceof VarNode) {
				(<VarNode>InitNode).BlockNode = ForNode;
			}			else {
				InitNode = LinkNode(InitNode, ForNode);
			}
			return InitNode;
		}
		return ForNode;
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
		var ParseFlag: number = TokenContext.ParseFlag;
		TokenContext.ParseFlag |= SkipIndentParseFlag;
		if(TokenContext.MatchToken("catch")) {
			TryTree.SetMatchedTokenAt(NoWhere, NameSpace, TokenContext, "(", Required);
			TryTree.SetMatchedPatternAt(CatchVariable, NameSpace, TokenContext, "$VarDecl$", Required);
			TryTree.SetMatchedTokenAt(NoWhere, NameSpace, TokenContext, ")", Required);
			TryTree.SetMatchedPatternAt(CatchBody, NameSpace, TokenContext, "$Block$", Required);
		}
		if(TokenContext.MatchToken("finally")) {
			TryTree.SetMatchedPatternAt(FinallyBody, NameSpace, TokenContext, "$Block$", Required);
		}
		TokenContext.ParseFlag = ParseFlag;
		return TryTree;
	}

	public static TypeTry(Gamma: GtTypeEnv, ParsedTree: GtSyntaxTree, ContextType: GtType): GtNode {
		var TryNode: GtNode = ParsedTree.TypeCheckNodeAt(TryBody, Gamma, Gamma.VoidType, DefaultTypeCheckPolicy);
		var CatchExpr: GtNode = ParsedTree.TypeCheckNodeAt(CatchVariable, Gamma, Gamma.VarType, DefaultTypeCheckPolicy);
		var CatchNode: GtNode = ParsedTree.TypeCheckNodeAt(CatchBody, Gamma, Gamma.VoidType, DefaultTypeCheckPolicy);
		var FinallyNode: GtNode = ParsedTree.TypeCheckNodeAt(FinallyBody, Gamma, Gamma.VoidType, DefaultTypeCheckPolicy);
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

	public static ParseThis(NameSpace: GtNameSpace, TokenContext: GtTokenContext, LeftTree: GtSyntaxTree, Pattern: GtSyntaxPattern): GtSyntaxTree {
		var Token: GtToken = TokenContext.GetMatchedToken("this");
		var Tree: GtSyntaxTree = new GtSyntaxTree(Pattern, NameSpace, Token, null);
		return Tree;
	}

	public static TypeThis(Gamma: GtTypeEnv, ParsedTree: GtSyntaxTree, ContextType: GtType): GtNode {
		return Gamma.CreateLocalNode(ParsedTree, Gamma.Generator.GetRecvName());
	}

	public static ParseSuper(NameSpace: GtNameSpace, TokenContext: GtTokenContext, LeftTree: GtSyntaxTree, Pattern: GtSyntaxPattern): GtSyntaxTree {
		var Token: GtToken =TokenContext.GetMatchedToken("super");
		var Tree: GtSyntaxTree = new GtSyntaxTree(Pattern, NameSpace, Token, null);
		var ParseFlag: number = TokenContext.ParseFlag;
		TokenContext.ParseFlag |= SkipIndentParseFlag;
		Tree.SetSyntaxTreeAt(CallExpressionIndex, new GtSyntaxTree(NameSpace.GetPattern("$Variable$"), NameSpace, Token, null));
		Tree.SetSyntaxTreeAt(CallParameterIndex,  new GtSyntaxTree(NameSpace.GetPattern("this"), NameSpace, new GtToken("this", 0), null));
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
		NewTree.SetMatchedPatternAt(CallExpressionIndex, NameSpace, TokenContext, "$Type$", Required);
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
			if(LibGreenTea.IsVariableName(Token.ParsedText, 0)) {
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

	public static ParseCaseBlock(ParentNameSpace: GtNameSpace, TokenContext: GtTokenContext, LeftTree: GtSyntaxTree, Pattern: GtSyntaxPattern): GtSyntaxTree {
		var PrevTree: GtSyntaxTree = null;
		var NameSpace: GtNameSpace = new GtNameSpace(ParentNameSpace.Context, ParentNameSpace);
		var IsCaseBlock: boolean = TokenContext.MatchToken("{"); // case EXPR : {}
		while(TokenContext.HasNext()) {
			TokenContext.SkipEmptyStatement();
			if(TokenContext.MatchToken("case")) {
				TokenContext.CurrentPosition -= 1;
				break;
			}
			if(TokenContext.MatchToken("default")) {
				TokenContext.CurrentPosition -= 1;
				break;
			}
			if(TokenContext.MatchToken("}")) {
				if(!IsCaseBlock) {
					TokenContext.CurrentPosition -= 1;
				}
				break;
			}
			var Annotation: GtMap = TokenContext.SkipAndGetAnnotation(true);
			var CurrentTree: GtSyntaxTree = ParseExpression(NameSpace, TokenContext, false/*SuffixOnly*/);
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

	public static ParseSwitch(NameSpace: GtNameSpace, TokenContext: GtTokenContext, LeftTree: GtSyntaxTree, Pattern: GtSyntaxPattern): GtSyntaxTree {
		var SwitchTree: GtSyntaxTree = new GtSyntaxTree(Pattern, NameSpace, TokenContext.GetMatchedToken("switch"), null);
		SwitchTree.SetMatchedTokenAt(NoWhere, NameSpace, TokenContext, "(", Required);
		SwitchTree.SetMatchedPatternAt(SwitchCaseCondExpr, NameSpace, TokenContext, "$Expression$", Required);
		SwitchTree.SetMatchedTokenAt(NoWhere, NameSpace, TokenContext, ")", Required);
		SwitchTree.SetMatchedTokenAt(NoWhere, NameSpace, TokenContext, "{", Required);
		var ParseFlag: number = TokenContext.ParseFlag;
		TokenContext.ParseFlag |= SkipIndentParseFlag;

		var CaseIndex: number = SwitchCaseCaseIndex;
		while(!SwitchTree.IsEmptyOrError() && !TokenContext.MatchToken("}")) {
			if(TokenContext.MatchToken("case")) {
				SwitchTree.SetMatchedPatternAt(CaseIndex, NameSpace, TokenContext, "$Expression$", Required);
				SwitchTree.SetMatchedTokenAt(NoWhere, NameSpace, TokenContext, ":", Required);
				SwitchTree.SetMatchedPatternAt(CaseIndex + 1, NameSpace, TokenContext, "$CaseBlock$", Required);
				CaseIndex += 2;
				continue;
			}
			if(TokenContext.MatchToken("default")) {
				SwitchTree.SetMatchedTokenAt(NoWhere, NameSpace, TokenContext, ":", Required);
				SwitchTree.SetMatchedPatternAt(SwitchCaseDefaultBlock, NameSpace, TokenContext, "$CaseBlock$", Required);
			}
		}
		TokenContext.ParseFlag = ParseFlag;
		return SwitchTree;
	}

	public static TypeSwitch(Gamma: GtTypeEnv, ParsedTree: GtSyntaxTree, ContextType: GtType): GtNode {
		var CondNode: GtNode = ParsedTree.TypeCheckNodeAt(IfCond, Gamma, Gamma.VarType, DefaultTypeCheckPolicy);
		var DefaultNode: GtNode = null;
		if(ParsedTree.HasNodeAt(SwitchCaseDefaultBlock)) {
			DefaultNode = ParsedTree.TypeCheckNodeAt(SwitchCaseDefaultBlock, Gamma, Gamma.VoidType, DefaultTypeCheckPolicy);
		}
		var Node: GtNode = Gamma.Generator.CreateSwitchNode(Gamma.VoidType/*FIXME*/, ParsedTree, CondNode, DefaultNode);
		var CaseIndex: number = SwitchCaseCaseIndex;
		while(CaseIndex < ParsedTree.TreeList.size()) {
			var CaseExpr: GtNode  = ParsedTree.TypeCheckNodeAt(CaseIndex, Gamma, CondNode.Type, DefaultTypeCheckPolicy);
			var CaseBlock: GtNode = null;
			if(ParsedTree.HasNodeAt(CaseIndex+1)) {
				CaseBlock = ParsedTree.TypeCheckNodeAt(CaseIndex+1, Gamma, Gamma.VoidType, DefaultTypeCheckPolicy);
			}
			Node.Append(CaseExpr);
			Node.Append(CaseBlock);
			CaseIndex += 2;
		}
		return Node;
	}

	// const decl
	public static ParseSymbolDecl(NameSpace: GtNameSpace, TokenContext: GtTokenContext, LeftTree: GtSyntaxTree, Pattern: GtSyntaxPattern): GtSyntaxTree {
		var SymbolDeclTree: GtSyntaxTree = new GtSyntaxTree(Pattern, NameSpace, TokenContext.Next() /*const, let */, null);
		var ClassNameTree: GtSyntaxTree = TokenContext.ParsePattern(NameSpace, "$Type$", Optional);
		var ConstClass: GtType = null;
		if(ClassNameTree != null) {
			SymbolDeclTree.SetMatchedTokenAt(NoWhere, NameSpace, TokenContext, ".", Required);
			if(!SymbolDeclTree.IsEmptyOrError()) {
				SymbolDeclTree.SetSyntaxTreeAt(SymbolDeclClassIndex, ClassNameTree);
				ConstClass = ClassNameTree.GetParsedType();
			}
		}
		SymbolDeclTree.SetMatchedPatternAt(SymbolDeclNameIndex, NameSpace, TokenContext, "$Variable$", Required);
		SymbolDeclTree.SetMatchedTokenAt(NoWhere, NameSpace, TokenContext, "=", Required);
		SymbolDeclTree.SetMatchedPatternAt(SymbolDeclValueIndex, NameSpace, TokenContext, "$Expression$", Required);

		if(!SymbolDeclTree.IsEmptyOrError()) {
			var ConstName: string = SymbolDeclTree.GetSyntaxTreeAt(SymbolDeclNameIndex).KeyToken.ParsedText;
			if(ConstClass != null) {
				ConstName = ClassSymbol(ConstClass, ConstName);
			}
			var ConstValue: Object = null;
			if(SymbolDeclTree.GetSyntaxTreeAt(SymbolDeclValueIndex).Pattern.EqualsName("$Const$")) {
				ConstValue = SymbolDeclTree.GetSyntaxTreeAt(SymbolDeclValueIndex).ConstValue;
			}
			if(ConstValue == null) {
				var Gamma: GtTypeEnv = new GtTypeEnv(NameSpace);
				var Node: GtNode = SymbolDeclTree.TypeCheckNodeAt(SymbolDeclValueIndex, Gamma, Gamma.VarType, OnlyConstPolicy);
				if(Node.IsError()) {
					SymbolDeclTree.ToError(Node.Token);
					return SymbolDeclTree;
				}
				ConstValue = Node.ToConstValue(true);
			}
			if(NameSpace.GetSymbol(ConstName) != null) {
				NameSpace.ReportOverrideName(SymbolDeclTree.KeyToken, ConstClass, ConstName);
			}
			NameSpace.SetSymbol(ConstName, ConstValue);
		}
		return SymbolDeclTree;
	}

	public static TypeSymbolDecl(Gamma: GtTypeEnv, ParsedTree: GtSyntaxTree, ContextType: GtType): GtNode {
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

	private static ParseFuncParam(NameSpace: GtNameSpace, TokenContext: GtTokenContext, FuncDeclTree: GtSyntaxTree): void {
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
	}

	private static ParseFuncBody(NameSpace: GtNameSpace, TokenContext: GtTokenContext, FuncDeclTree: GtSyntaxTree): void {
		TokenContext.SkipIndent();
		if(TokenContext.MatchToken("as")) {
			var Token: GtToken = TokenContext.Next();
			FuncDeclTree.ConstValue = LibGreenTea.UnquoteString(Token.ParsedText);
		}
		else if(TokenContext.PeekToken("import")) {
			FuncDeclTree.SetMatchedPatternAt(FuncDeclBlock, NameSpace, TokenContext, "import", Required);
		}
		else {
			FuncDeclTree.SetMatchedPatternAt(FuncDeclBlock, NameSpace, TokenContext, "$Block$", Optional);
			if(!FuncDeclTree.IsEmptyOrError() && FuncDeclTree.HasNodeAt(FuncDeclBlock)) {
				var ReturnTree: GtSyntaxTree = new GtSyntaxTree(NameSpace.GetPattern("return"), NameSpace, GtTokenContext.NullToken, null);
				LinkTree(TreeTail(FuncDeclTree.GetSyntaxTreeAt(FuncDeclBlock)), ReturnTree);
			}
		}
	}

	public static ParseFunction(NameSpace: GtNameSpace, TokenContext: GtTokenContext, LeftTree: GtSyntaxTree, Pattern: GtSyntaxPattern): GtSyntaxTree {
		var FuncDeclTree: GtSyntaxTree = new GtSyntaxTree(Pattern, NameSpace, TokenContext.GetToken(), null);
		FuncDeclTree.SetMatchedPatternAt(FuncDeclName, NameSpace, TokenContext, "$FuncName$", Optional);
		if(FuncDeclTree.HasNodeAt(FuncDeclName)) {
			//NameSpace = ParseFuncGenericParam(NameSpace, TokenContext, FuncDeclTree);
		}
		FuncDeclTree.SetMatchedTokenAt(NoWhere, NameSpace, TokenContext, "(", Required);
		GreenTeaGrammar.ParseFuncParam(NameSpace, TokenContext, FuncDeclTree);
		if(!FuncDeclTree.IsEmptyOrError() && TokenContext.MatchToken(":")) {
			FuncDeclTree.SetMatchedPatternAt(FuncDeclReturnType, NameSpace, TokenContext, "$Type$", Required);
		}
		GreenTeaGrammar.ParseFuncBody(NameSpace, TokenContext, FuncDeclTree);
		return FuncDeclTree;
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
		GreenTeaGrammar.ParseFuncParam(NameSpace, TokenContext, FuncDeclTree);
		GreenTeaGrammar.ParseFuncBody(NameSpace, TokenContext, FuncDeclTree);
		TokenContext.SetRememberFlag(ParseFlag);
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
			Gamma.AppendDeclaredVariable(0, ParamType, ParamName, null, null);
			TreeIndex += 3;
		}
		var DefinedFunc: GtFunc = null;
		if(FuncName.equals("converter")) {
			DefinedFunc = GreenTeaGrammar.CreateCoercionFunc(Gamma, ParsedTree, FuncFlag, 0, TypeList);
		}
		else {
			DefinedFunc = GreenTeaGrammar.CreateFunc(Gamma, ParsedTree, FuncFlag, FuncName, 0, TypeList);
		}
		if((typeof ParsedTree.ConstValue == 'string' || ParsedTree.ConstValue instanceof String)) {
			DefinedFunc.SetNativeMacro(<string>ParsedTree.ConstValue);
		}
		else if(ParsedTree.HasNodeAt(FuncDeclBlock)) {
			var ImportTree: GtSyntaxTree = ParsedTree.GetSyntaxTreeAt(FuncDeclBlock);
			if(ImportTree.Pattern.EqualsName("import")) {
				if(!LibGreenTea.ImportNativeMethod(DefinedFunc, <string>ImportTree.ConstValue)) {
					Gamma.Context.ReportError(WarningLevel, ImportTree.KeyToken, "cannot import: " + ImportTree.ConstValue);
				}
			}
			else {
				Gamma.Func = DefinedFunc;
				var BodyNode: GtNode = ParsedTree.TypeCheckNodeAt(FuncDeclBlock, Gamma, Gamma.VoidType/*ReturnType*/, BlockPolicy);
				Gamma.Generator.GenerateFunc(DefinedFunc, ParamNameList, BodyNode);
			}
			if(FuncName.equals("main")) {
				Gamma.Generator.InvokeMainFunc(DefinedFunc.GetNativeFuncName());
			}
		}
		return Gamma.Generator.CreateEmptyNode(Gamma.VoidType);
	}

	private static CreateCoercionFunc(Gamma: GtTypeEnv, ParsedTree: GtSyntaxTree, FuncFlag: number, BaseIndex: number, TypeList: Array<GtType>): GtFunc {
		var ToType: GtType = TypeList.get(0);
		var FromType: GtType = TypeList.get(1);
		var DefinedFunc: GtFunc = ParsedTree.NameSpace.GetCoercionFunc(FromType, ToType, false);
		if(DefinedFunc != null) {
			Gamma.Context.ReportError(WarningLevel, ParsedTree.KeyToken, "already defined: " + FromType + " to " + ToType);
		}
		DefinedFunc = Gamma.Generator.CreateFunc(FuncFlag, "to" + ToType.ShortClassName, BaseIndex, TypeList);
		ParsedTree.NameSpace.SetCoercionFunc(FromType, ToType, DefinedFunc);
		return DefinedFunc;
	}

	private static CreateFunc(Gamma: GtTypeEnv, ParsedTree: GtSyntaxTree, FuncFlag: number, FuncName: string, BaseIndex: number, TypeList: Array<GtType>): GtFunc {
		var RecvType: GtType = (TypeList.size() > 1) ? TypeList.get(1) : Gamma.VoidType;
		var DefinedFunc: GtFunc = ParsedTree.NameSpace.GetFuncParam(FuncName, 0, LibGreenTea.CompactTypeList(BaseIndex, TypeList));
		if(DefinedFunc != null && DefinedFunc.IsAbstract()) {
			return DefinedFunc;
		}
		if(DefinedFunc == null) {
			DefinedFunc = Gamma.Generator.CreateFunc(FuncFlag, FuncName, BaseIndex, TypeList);
		}
		if(FuncName.equals("constructor")) {
			ParsedTree.NameSpace.AppendConstructor(RecvType, DefinedFunc);
		}
		else {
			if(LibGreenTea.IsLetter(DefinedFunc.FuncName, 0)) {
				ParsedTree.NameSpace.AppendFunc(DefinedFunc);
			}
			if(RecvType != Gamma.VoidType) {
				ParsedTree.NameSpace.AppendMethod(RecvType, DefinedFunc);
			}
		}
		return DefinedFunc;
	}

	public static ParseArray(NameSpace: GtNameSpace, TokenContext: GtTokenContext, LeftTree: GtSyntaxTree, Pattern: GtSyntaxPattern): GtSyntaxTree {
		var OldFlag: number = TokenContext.SetSkipIndent(true);
		var ArrayTree: GtSyntaxTree = new GtSyntaxTree(Pattern, NameSpace, TokenContext.GetMatchedToken("["), null);
		//FuncTree.AppendParsedTree(LeftTree);
		while(TokenContext.HasNext() && !ArrayTree.IsEmptyOrError()) {
			if(TokenContext.MatchToken("]")) {
				break;
			}
			if(TokenContext.MatchToken(",")) {
				continue;
			}
			var Tree: GtSyntaxTree = TokenContext.ParsePattern(NameSpace, "$Expression$", Required);
			ArrayTree.AppendParsedTree(Tree);
		}
		TokenContext.SetRememberFlag(OldFlag);
		return ArrayTree;
	}

	public static TypeArray(Gamma: GtTypeEnv, ParsedTree: GtSyntaxTree, ContextType: GtType): GtNode {
		var ArrayNode: GtNode = Gamma.Generator.CreateArrayNode(Gamma.ArrayType, ParsedTree);
		var ElemType: GtType = Gamma.VarType;
		if(ContextType.IsArrayType()) {
			ElemType = ContextType.TypeParams[0];
			ArrayNode.Type = ContextType;
		}
		var i: number = 0;
		while(i < LibGreenTea.ListSize(ParsedTree.TreeList)) {
			var Node: GtNode = ParsedTree.TypeCheckNodeAt(i, Gamma, ElemType, DefaultTypeCheckPolicy);
			if(Node.IsError()) {
				return Node;
			}
			if(ElemType.IsVarType()) {
				ElemType = Node.Type;
				ArrayNode.Type = Gamma.Context.GetGenericType1(Gamma.ArrayType, ElemType, true);
			}
			i = i + 1;
		}
		return ArrayNode;
	}

	public static ParseIndexer(NameSpace: GtNameSpace, TokenContext: GtTokenContext, LeftTree: GtSyntaxTree, Pattern: GtSyntaxPattern): GtSyntaxTree {
		var ArrayTree: GtSyntaxTree = new GtSyntaxTree(Pattern, NameSpace, TokenContext.GetMatchedToken("["), null);
		ArrayTree.AppendParsedTree(LeftTree);
		var OldFlag: number = TokenContext.SetSkipIndent(true);
		do {
			var Tree: GtSyntaxTree = TokenContext.ParsePattern(NameSpace, "$Expression$", Required);
			ArrayTree.AppendParsedTree(Tree);
		}
		while(!ArrayTree.IsEmptyOrError() && TokenContext.MatchToken(","));
		ArrayTree.SetMatchedTokenAt(NoWhere, NameSpace, TokenContext, "]", Required);
		TokenContext.SetRememberFlag(OldFlag);
		return ArrayTree;
	}

	public static TypeIndexer(Gamma: GtTypeEnv, ParsedTree: GtSyntaxTree, Type: GtType): GtNode {
		var ExprNode: GtNode = ParsedTree.TypeCheckNodeAt(LeftHandTerm, Gamma, Gamma.ArrayType, DefaultTypeCheckPolicy);
		if(ExprNode.IsError()) {
			return ExprNode;
		}
		var ResolvedFunc: GtFunc = null;
		var PolyFunc: GtPolyFunc = ParsedTree.NameSpace.GetMethod(ExprNode.Type, "get", true);
		var ParamList: Array<GtNode> = new Array<GtNode>();
		ParamList.add(ExprNode);
		if(PolyFunc != null) {
			ResolvedFunc = PolyFunc.ResolveFunc(Gamma, ParsedTree, 1, ParamList);
			if(ResolvedFunc != null) {
				Type = ResolvedFunc.GetReturnType();
			}
		}
		var Node: GtNode = Gamma.Generator.CreateIndexerNode(Type, ParsedTree, ResolvedFunc, ExprNode);
		Node.AppendNodeList(ParamList);
		return Node;
	}

	public static ParseSize(NameSpace: GtNameSpace, TokenContext: GtTokenContext, LeftTree: GtSyntaxTree, Pattern: GtSyntaxPattern): GtSyntaxTree {
		var ArrayTree: GtSyntaxTree = new GtSyntaxTree(Pattern, NameSpace, TokenContext.GetMatchedToken("|"), null);
		var SubTree: GtSyntaxTree = ParseExpression(NameSpace, TokenContext, true/*SuffixOnly*/);
		ArrayTree.SetSyntaxTreeAt(UnaryTerm, SubTree);
		ArrayTree.SetMatchedTokenAt(NoWhere, NameSpace, TokenContext, "|", Required);
		return ArrayTree;
	}

	public static TypeSize(Gamma: GtTypeEnv, ParsedTree: GtSyntaxTree, Type: GtType): GtNode {
		var ExprNode: GtNode = ParsedTree.TypeCheckNodeAt(UnaryTerm, Gamma, Gamma.VarType, DefaultTypeCheckPolicy);
		if(ExprNode.IsError()) {
			return ExprNode;
		}
		if(!(ExprNode.Type.Accept(Gamma.ArrayType) || ExprNode.Type.Accept(Gamma.StringType))) {
			return Gamma.CreateSyntaxErrorNode(ParsedTree, ExprNode.Type + " has no sizeof operator");
		}
		var PolyFunc: GtPolyFunc = Gamma.NameSpace.GetMethod(ExprNode.Type, "length", true);
		var NodeList: Array<GtNode> = new Array<GtNode>();
		var Func: GtFunc = PolyFunc.ResolveFunc(Gamma, ParsedTree, 1, NodeList);
		var Node: GtNode = Gamma.Generator.CreateApplyNode(Type, ParsedTree, Func);
		Node.Append(ExprNode);
		return Node;
	}

	public static ParseSlice(NameSpace: GtNameSpace, TokenContext: GtTokenContext, LeftTree: GtSyntaxTree, Pattern: GtSyntaxPattern): GtSyntaxTree {
		var ArrayTree: GtSyntaxTree = new GtSyntaxTree(Pattern, NameSpace, TokenContext.GetMatchedToken("["), null);
		ArrayTree.AppendParsedTree(LeftTree);
		var Tree: GtSyntaxTree = TokenContext.ParsePattern(NameSpace, "$Expression$", Optional);
		if(Tree == null) {
			ArrayTree.AppendParsedTree(GreenTeaGrammar.ParseEmpty(NameSpace, TokenContext, LeftTree, Pattern));
		}
		else {
			ArrayTree.AppendParsedTree(Tree);
		}
		ArrayTree.SetMatchedTokenAt(NoWhere, NameSpace, TokenContext, ":", Required);
		Tree = TokenContext.ParsePattern(NameSpace, "$Expression$", Optional);
		if(Tree != null) {
			ArrayTree.AppendParsedTree(Tree);
		}
		ArrayTree.SetMatchedTokenAt(NoWhere, NameSpace, TokenContext, "]", Required);
		return ArrayTree;
	}

	public static TypeSlice(Gamma: GtTypeEnv, ParsedTree: GtSyntaxTree, ContextType: GtType): GtNode {
		return null;
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
		ClassNameSpace.AppendTypeName(NewType);  // temporary
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
			if(FieldTree.Pattern.EqualsName("$VarDecl$")) {
				VarDeclList.add(FieldTree);
			}
			else if(FieldTree.Pattern.EqualsName("$FuncDecl$")) {
				ConstructorList.add(FieldTree);
			}
			else if(FieldTree.Pattern.EqualsName("$Constructor$")) {
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
			if(!FieldTree.Pattern.EqualsName("$VarDecl$")) {
				break;
			}
			var FieldNode: GtNode = ParsedTree.TypeCheckNodeAt(TreeIndex, Gamma, Gamma.VarType, DefaultTypeCheckPolicy);
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
				FieldInfo.InitValue = (<ConstNode>(<VarNode>FieldNode).InitNode).ConstValue;
			}
			TreeIndex += 1;
		}
		DefinedType.SetClassField(ClassField);
		Gamma.Generator.GenerateClassField(DefinedType, ClassField);
		while(TreeIndex < ParsedTree.TreeList.size()) {
			var FieldTree: GtSyntaxTree = ParsedTree.GetSyntaxTreeAt(TreeIndex);
			if(!FieldTree.Pattern.EqualsName("$FuncDecl$")) {
				break;
			}
			ParsedTree.TypeCheckNodeAt(TreeIndex, Gamma, Gamma.VarType, DefaultTypeCheckPolicy);
			TreeIndex += 1;
		}
		while(TreeIndex < ParsedTree.TreeList.size()) {
			var FieldTree: GtSyntaxTree = ParsedTree.GetSyntaxTreeAt(TreeIndex);
			if(!FieldTree.Pattern.EqualsName("$Constructor$")) {
				break;
			}
			ParsedTree.TypeCheckNodeAt(TreeIndex, Gamma,  Gamma.VarType, DefaultTypeCheckPolicy);
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
		return GreenTeaGrammar.TypeFuncDecl(Gamma, ConstructorTree, ContextType);
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
	public static SymbolShellToken(TokenContext: GtTokenContext, SourceText: string, pos: number): number {
		var start: number = pos;
		var isHeadOfToken: boolean = true;
		while(pos < SourceText.length) {
			var ch: number = LibGreenTea.CharAt(SourceText, pos);
			// a-zA-Z0-9_-
			if(ch == 32/* */ || ch == 9/*\t*/ || ch == 10/*\n*/ || ch == 59/*;*/) {
				break;
			}
			else if(ch == 124/*|*/ || ch == 62/*>*/ || ch == 60/*<*/) {
				if(isHeadOfToken) {
					pos += 1;
				}
				break;
			}
			isHeadOfToken = false;
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

		if(Symbol.startsWith("/")) {
			if(Symbol.startsWith("//")) { // One-Line Comment
				return NoMatch;
			}
			if(Symbol.startsWith("/*")) {
				return NoMatch;
			}
		}

		if(LibGreenTea.IsUnixCommand(Symbol)) {
			TokenContext.AddNewToken(Symbol, WhiteSpaceTokenFlag, "$ShellExpression$");
			return pos;
		}

		var SrcListSize: number = TokenContext.SourceList.size();
		if(SrcListSize > 0) {
			var index: number = SrcListSize - 1;
			while(index >= 0) {
				var PrevToken: GtToken = TokenContext.SourceList.get(index);
				if(PrevToken.PresetPattern != null &&
					PrevToken.PresetPattern.EqualsName("$ShellExpression$")) {
					TokenContext.AddNewToken(Symbol, WhiteSpaceTokenFlag, "$StringLiteral$");
					return pos;
				}
				if(PrevToken.IsIndent() || PrevToken.EqualsText(";")) {
					break;
				}
				index = index - 1;
			}
		}
		return NoMatch;
	}

	public  static ParseShell(NameSpace: GtNameSpace, TokenContext: GtTokenContext, LeftTree: GtSyntaxTree, Pattern: GtSyntaxPattern): GtSyntaxTree {
		var Token: GtToken = TokenContext.Next();
		var NewTree: GtSyntaxTree = new GtSyntaxTree(Pattern, NameSpace, Token, null);
		var ParseFlag: number = TokenContext.ParseFlag;
		TokenContext.ParseFlag = 0;
		while(!IsEmptyOrError(NewTree) && !TokenContext.MatchToken(";")) {
			var Tree: GtSyntaxTree = null;
			if(TokenContext.GetToken().IsDelim() || TokenContext.GetToken().IsIndent()) {
				break;
			}

			if(TokenContext.GetToken().IsNextWhiteSpace()) {
				Tree = TokenContext.ParsePattern(NameSpace, "$StringLiteral$", Optional);
				if(Tree == null) {
					Tree = TokenContext.ParsePattern(NameSpace, "$ShellExpression$", Optional);
				}
			}
			if(Tree == null) {
				Tree = TokenContext.ParsePattern(NameSpace, "$Expression$", Optional);
			}
			NewTree.AppendParsedTree(Tree);
		}
		TokenContext.ParseFlag = ParseFlag;
		return NewTree;
	}

	public static TypeShell(Gamma: GtTypeEnv, ParsedTree: GtSyntaxTree, ContextType: GtType): GtNode {
		var Node: CommandNode = <CommandNode> Gamma.Generator.CreateCommandNode(ContextType, ParsedTree, null);
		var HeadNode: GtNode = Node;
		var i: number = 0;
		var Command: string = ParsedTree.KeyToken.ParsedText;
		var ThisNode: GtNode = Gamma.Generator.CreateConstNode(Gamma.StringType, ParsedTree, Command);
		Node.Append(ThisNode);
		while(i < LibGreenTea.ListSize(ParsedTree.TreeList)) {
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

		NameSpace.DefineTokenFunc(" \t", GreenTeaGrammar["WhiteSpaceToken"]);
		NameSpace.DefineTokenFunc("\n",  GreenTeaGrammar["IndentToken"]);
		NameSpace.DefineTokenFunc(";", GreenTeaGrammar["SemiColonToken"]);
		NameSpace.DefineTokenFunc("{}()[]<>.,?:+-*/%=&|!@~^", GreenTeaGrammar["OperatorToken"]);
		NameSpace.DefineTokenFunc("/", GreenTeaGrammar["CommentToken"]);  // overloading
		NameSpace.DefineTokenFunc("Aa", GreenTeaGrammar["SymbolToken"]);

		NameSpace.DefineTokenFunc("\"", GreenTeaGrammar["StringLiteralToken"]);
		NameSpace.DefineTokenFunc("\"", GreenTeaGrammar["StringLiteralToken_StringInterpolation"]);
		NameSpace.DefineTokenFunc("'", GreenTeaGrammar["CharLiteralToken"]);
		NameSpace.DefineTokenFunc("1",  GreenTeaGrammar["NumberLiteralToken"]);

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
		NameSpace.AppendSyntax("$VarDecl$",  GreenTeaGrammar["ParseVarDecl"], GreenTeaGrammar["TypeVarDecl"]);

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

	}
}

 class GtStat {
	public VarDeclAny: number;
	public VarDeclInferAny: number;
	public VarDeclInfer: number;
	public VarDecl: number;

	public MatchCount: number;
	public BacktrackCount: number;  // To count how many times backtracks happen.

	 constructor() {
		this.VarDecl = 0;
		this.VarDeclInfer = 0;
		this.VarDeclAny = 0;
		this.VarDeclInferAny = 0;
		
		this.MatchCount     = 0;
		this.BacktrackCount = 0;
	}
}

 class GtContext {
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

	public   SourceMap: GtMap;
	public   SourceList: Array<string>;
	public   ClassNameMap: GtMap;

	public ClassCount: number;
	public FuncCount: number;
	public  Stat: GtStat;
	public ReportedErrorList: Array<string>;
	/*filed*/NoErrorReport: boolean;

	 constructor(Grammar: GtGrammar, Generator: GtGenerator) {
		this.Generator    = Generator;
		this.Generator.Context = this;
		this.SourceMap     = new GtMap();
		this.SourceList    = new Array<string>();
		this.ClassNameMap  = new GtMap();
		this.RootNameSpace = new GtNameSpace(this, null);
		this.ClassCount = 0;
		this.FuncCount = 0;
		this.Stat = new GtStat();
		this.NoErrorReport = false;
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
		this.FuncType.TypeParams[0] = this.VarType;  // for PolyFunc


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

	public SetGlobalTypeName(Name: string, Type: GtType): void {
		this.ClassNameMap.put(Name, Type);
		LibGreenTea.VerboseLog(VerboseSymbol, "global type name: " + Name + ", " + Type);
	}

	public GetGenericType(BaseType: GtType, BaseIdx: number, TypeList: Array<GtType>, IsCreation: boolean): GtType {
		LibGreenTea.Assert(BaseType.IsGenericType());
		var MangleName: string = MangleGenericType(BaseType, BaseIdx, TypeList);
		var GenericType: GtType = <GtType>this.ClassNameMap.get(MangleName);
		if(GenericType == null && IsCreation) {
			var i: number = BaseIdx;
			var s: string = BaseType.ShortClassName + "<";
			while(i < LibGreenTea.ListSize(TypeList)) {
				s = s + TypeList.get(i).ShortClassName;
				i += 1;
				if(i == LibGreenTea.ListSize(TypeList)) {
					s = s + ">";
				}
				else {
					s = s + ",";
				}
			}
			GenericType = BaseType.CreateGenericType(BaseIdx, TypeList, s);
			this.SetGlobalTypeName(MangleName, GenericType);
		}
		return GenericType;
	}

	public GetGenericType1(BaseType: GtType, ParamType: GtType, IsCreation: boolean): GtType {
		var TypeList: Array<GtType> = new Array<GtType>();
		TypeList.add(ParamType);
		return this.GetGenericType(BaseType, 0, TypeList, IsCreation);
	}

	public  GetFileLine(FileName: string, Line: number): number {
		var Id: number = /* (FileName == null) ? 0 :*/ <number>this.SourceMap.get(FileName);
		if(Id == null) {
			this.SourceList.add(FileName);
			Id = this.SourceList.size();
			this.SourceMap.put(FileName, Id);
		}
		return LibGreenTea.JoinIntId(Id, Line);
	}

	public  GetSourceFileName(FileLine: number): string {
		var FileId: number = LibGreenTea.UpperId(FileLine);
		return (FileId == 0) ? null : this.SourceList.get(FileId - 1);
	}

	private  GetSourcePosition(FileLine: number): string {
		var FileId: number = LibGreenTea.UpperId(FileLine);
		var Line: number = LibGreenTea.LowerId(FileLine);
		var FileName: string = (FileId == 0) ? "eval" : this.SourceList.get(FileId - 1);
		return "(" + FileName + ":" + Line + ")";
	}

	public SetNoErrorReport(b: boolean): void {
		this.NoErrorReport = b;
	}

	public  ReportError(Level: number, Token: GtToken, Message: string): void {
		if(!Token.IsError() || !this.NoErrorReport) {
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
			LibGreenTea.DebugP(Message);
			this.ReportedErrorList.add(Message);
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
			if(LibGreenTea.EqualsString(Argu, "--verbose")) {
				LibGreenTea.DebugMode = true;
				LibGreenTea.VerboseMask |= (VerboseFile|VerboseSymbol|VerboseNative);
				continue;
			}
			if(LibGreenTea.EqualsString(Argu, "--verbose:token")) {
				LibGreenTea.VerboseMask |= VerboseToken;
				continue;
			}
			if(LibGreenTea.EqualsString(Argu, "--verbose:type")) {
				LibGreenTea.VerboseMask |= VerboseType;
				continue;
			}
			if(LibGreenTea.EqualsString(Argu, "--verbose:symbol")) {
				LibGreenTea.VerboseMask |= VerboseSymbol;
				continue;
			}
			if(LibGreenTea.EqualsString(Argu, "--verbose:native")) {
				LibGreenTea.VerboseMask |= VerboseNative;
				continue;
			}
			if(LibGreenTea.EqualsString(Argu, "--verbose:func")) {
				LibGreenTea.VerboseMask |= VerboseFunc;
				continue;
			}
			if(LibGreenTea.EqualsString(Argu, "--verbose:no")) {
				LibGreenTea.VerboseMask = 0;
				continue;
			}
			LibGreenTea.Usage(Argu + " is unknown");
		}
		var Generator: GtGenerator = LibGreenTea.CodeGenerator(TargetCode, OutputFile, GeneratorFlag);
		if(Generator == null) {
			LibGreenTea.Usage("no target: " + TargetCode);
		}
		var Context: GtContext = new GtContext(new GreenTeaGrammar(), Generator);
		var ShellMode: boolean = true;
		if(OneLiner != null) {
			Context.TopLevelNameSpace.Eval(OneLiner, 1);
			ShellMode = false;
		}
		while(Index < Args.length) {
			var ScriptText: string = LibGreenTea.LoadFile2(Args[Index]);
			if(ScriptText == null) {
				LibGreenTea.Exit(1, "file not found: " + Args[Index]);
			}
			var FileLine: number = Context.GetFileLine(Args[Index], 1);
			Context.TopLevelNameSpace.Eval(ScriptText, FileLine);
			ShellMode = false;
			Index += 1;
		}
		if(ShellMode) {
			LibGreenTea.println(ProgName + Version + " (" + CodeName + ") on " + LibGreenTea.GetPlatform());
			LibGreenTea.println(Copyright);
			var linenum: number = 1;
			var Line: string = null;
			while((Line = LibGreenTea.ReadLine(">>> ")) != null) {
				var EvaledValue: Object = Context.TopLevelNameSpace.Eval(Line, linenum);
				Context.ShowReportedErrors();
				if(EvaledValue != null) {
					LibGreenTea.println(" (" + Context.GuessType(EvaledValue) + ":" + LibGreenTea.GetClassName(EvaledValue) + ") " + EvaledValue);
				}
				linenum += 1;
			}
			LibGreenTea.println("");
		}
		else {
			Generator.FlushBuffer();
		}
	}

	public  static main(Args: string[]): void {
		GreenTeaScript.ParseCommandOption(Args);
	}
}