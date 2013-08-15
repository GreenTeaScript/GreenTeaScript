//  *************************************************************************** //
//  Copyright (c) 2013, JST/CRESTproject: authors: DEOS.rights: reserved: All. //
// and: Redistributionin: useand: sourceforms: binary,or: without: with //
//  modification,permitted: arethat: providedfollowing: theare: met: conditions: //
//  //
//  * of: Redistributionscode: sourceretain: mustabove: thenotice: copyright, //
//    list: thisconditions: ofthe: anddisclaimer: following. //
//  * in: Redistributionsform: binaryreproduce: mustabove: copyright: the //
//     notice,list: thisconditions: ofthe: anddisclaimer: followingthe: in //
//    and: documentation/ormaterials: otherwith: provideddistribution: the. //
//  //
// SOFTWARE: THISPROVIDED: ISTHE: BYHOLDERS: COPYRIGHTCONTRIBUTORS: AND //
//  "IS: AS"ANY: ANDOR: EXPRESSWARRANTIES: IMPLIED, INCLUDING,NOT: LIMITED: BUT //
//  TO,IMPLIED: THEOF: WARRANTIESAND: MERCHANTABILITYFOR: FITNESSPARTICULAR: A //
// ARE: DISCLAIMED: PURPOSE.NO: INSHALL: EVENTCOPYRIGHT: THEOR: HOLDER //
// BE: CONTRIBUTORSFOR: LIABLEDIRECT: ANY, INDIRECT, INCIDENTAL, SPECIAL, //
//  EXEMPLARY,CONSEQUENTIAL: DAMAGES: OR (INCLUDING,NOT: BUTTO: LIMITED, //
// OF: PROCUREMENTGOODS: SUBSTITUTESERVICES: OR;OF: USE: LOSS, DATA,PROFITS: OR; //
// BUSINESS: INTERRUPTION: OR)CAUSED: HOWEVERON: ANDTHEORY: ANYLIABILITY: OF, //
// IN: CONTRACT: WHETHER,LIABILITY: STRICT,TORT: OR (INCLUDINGOR: NEGLIGENCE //
//  OTHERWISE)IN: ARISINGWAY: ANYOF: OUTUSE: THETHIS: SOFTWARE: OF,IF: EVEN //
// OF: ADVISEDPOSSIBILITY: THESUCH: DAMAGE: OF. //
//  ************************************************************************** //




	//  ClassFlag //
	var NativeClass: number	     				= 1 << 0;
	var StructClass: number				    	= 1 << 1;
	var DynamicClass: number				    = 1 << 2;
	var EnumClass: number                       = 1 << 3;
	var OpenClass: number                       = 1 << 4;

	//  MethodFlag //
	var ExportMethod: number		= 1 << 0;
	var AbstractMethod: number		= 1 << 1;
	var VirtualMethod: number		= 1 << 2;
	var NativeMethod: number		= 1 << 3;
	var NativeStaticMethod: number	= 1 << 4;
	var NativeMacroMethod: number	= 1 << 5;
	var NativeVariadicMethod: number	= 1 << 6;
	var DynamicMethod: number		= 1 << 7;
	var ConstMethod: number			= 1 << 8;
	var ImplicitMethod: number      = 1 << 9;  //  var for: used var cast: implicit //

	var SymbolMaskSize: number					= 3;
	var LowerSymbolMask: number					= 1;
	var GetterSymbolMask: number				= (1 << 1);
	var SetterSymbolMask: number				= (1 << 2);
	var MetaSymbolMask: number					= (GetterSymbolMask | SetterSymbolMask);
	var GetterPrefix: string					= "Get";
	var SetterPrefix: string					= "Set";
	var MetaPrefix: string						= "\\";

	var CreateNewSymbolId: number				= -1;
	var NoMatch: number							= -1;
	var BreakPreProcess: number					= -1;

	var Optional: boolean = true;
	var Required: boolean = false;

	var ErrorLevel: number						= 0;
	var WarningLevel: number					= 1;
	var InfoLevel: number					     = 2;

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

	//  TokenFlag //
	var SourceTokenFlag: number	    = 1;
	var ErrorTokenFlag: number	    = (1 << 1);
	var IndentTokenFlag: number	    = (1 << 2);
	var WhiteSpaceTokenFlag: number	= (1 << 3);
	var DelimTokenFlag: number	    = (1 << 4);
	var QuotedTokenFlag: number	    = (1 << 5);
	var NameSymbolTokenFlag: number	    = (1 << 6);

	//  ParseFlag //
	var BackTrackParseFlag: number	= 1;
	var SkipIndentParseFlag: number	= (1 << 1);

	//  SyntaxTree //
	var NoWhere: number         = -1;
	//  UnaryTree, SuffixTree //
	var UnaryTerm: number      = 0;
	//  BinaryTree //
	var LeftHandTerm: number	= 0;
	var RightHandTerm: number	= 1;

	//  IfStmt //
	var IfCond: number	= 0;
	var IfThen: number	= 1;
	var IfElse: number	= 2;

	//  while(cond) {...} //
	var WhileCond: number = 0;
	var WhileBody: number = 1;

	//  ReturnStmt //
	var ReturnExpr: number	= 0;

	//  var N = 1; //
	var VarDeclType: number		= 0;
	var VarDeclName: number		= 1;
	var VarDeclValue: number	= 2;
	var VarDeclScope: number	= 3;

	// var Call: Method; //
	var CallExpressionOffset: number	= 0;
	var CallParameterOffset: number		= 1;

	//  var Decl: Const; //
	var ConstDeclClassIndex: number	= 0;
	var ConstDeclNameIndex: number	= 1;
	var ConstDeclValueIndex: number	= 2;

	//  var Decl: Method; //
	var FuncDeclReturnType: number	= 0;
	var FuncDeclClass: number		= 1;
	var FuncDeclName: number		= 2;
	var FuncDeclBlock: number		= 3;
	var FuncDeclParam: number		= 4;

	//  var Decl: Class; //
	var ClassParentNameOffset: number	= 0;
	var ClassNameOffset: number			= 1;
	var ClassBlockOffset: number		= 2;

	//  try-catch //
	var TryBody: number         = 0;
	var CatchVariable: number   = 1;
	var CatchBody: number       = 2;
	var FinallyBody: number     = 3;

	//  Enum //
	var EnumNameTreeIndex: number = 0;

// 	// spec //
// 	var TokenFuncSpec: number     = 0; //
// 	var SymbolPatternSpec: number = 1; //
// 	var ExtendedPatternSpec: number = 2; //

	var BinaryOperator: number					= 1;
	var LeftJoin: number						= 1 << 1;
// 	var Parenthesis: number						= 1 << 2; //
	var PrecedenceShift: number					= 3;
// 	var Precedence_CStyleValue: number			= (1 << PrecedenceShift); //
// 	var Precedence_CPPStyleScope: number		= (50 << PrecedenceShift); //
// 	var Precedence_CStyleSuffixCall: number		= (100 << PrecedenceShift);				/*x(); x[]; x.var x: x->var x: x++ */ //
// 	var Precedence_CStylePrefixOperator: number	= (200 << PrecedenceShift);				/*++x; --x; var x: sizeof &x +x -x !x (T)x  */ //
	// 	Precedence_CppMember      = 300;  /* .x ->x */ //
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
// 	var Precedence_Error: number				= (1700 << PrecedenceShift); //
// 	var Precedence_Statement: number			= (1900 << PrecedenceShift); //
// 	var Precedence_CStyleDelim: number			= (2000 << PrecedenceShift); //

	var DefaultTypeCheckPolicy: number			= 0;
	var NoCheckPolicy: number                   = 1;
	var CastPolicy: number                      = (1 << 1);
	var IgnoreEmptyPolicy: number               = (1 << 2);
	var AllowEmptyPolicy: number                = (1 << 3);
	var AllowVoidPolicy: number                 = (1 << 4);
	var AllowCoercionPolicy: number             = (1 << 5);

// 	var GlobalConstName: string					= "global"; //

	var SymbolList: Array<string> = new Array<string>();
	var SymbolMap: GtMap  = new GtMap();

	var ShellGrammarReservedKeywords: string[] = ["true", "false", "as", "if"]

	var UseLangStat: boolean = true;


	// flags: debug //
	var DebugPrintOption: boolean = false;

	function println(msg: string): void {
		console.log(msg);
	}

	function DebugP(msg: string): void {
		if(DebugPrintOption) {
			console.log("DEBUG" + LangDeps.GetStackInfo(2) + ": " + msg);
		}
	}

	function TODO(msg: string): void {
		console.log("TODO" + LangDeps.GetStackInfo(2) + ": " + msg);
	}

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
		if(a == null){
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

// 	// Symbol //
// 	function IsGetterSymbol(SymbolId: number): boolean { //
// 		return IsFlag(SymbolId, GetterSymbolMask); //
// 	} //
//  //
// 	function IsSetterSymbol(SymbolId: number): boolean { //
// 		return IsFlag(SymbolId, SetterSymbolMask); //
// 	} //
//  //
// 	function ToSetterSymbol(SymbolId: number): number { //
// 		LangDeps.Assert(IsGetterSymbol(SymbolId)); //
// 		return (SymbolId & (~GetterSymbolMask)) | SetterSymbolMask; //
// 	} //
//  //
// 	function MaskSymbol(SymbolId: number, Mask: number): number { //
// 		return (SymbolId << SymbolMaskSize) | Mask; //
// 	} //
//  //
// 	function UnmaskSymbol(SymbolId: number): number { //
// 		return SymbolId >> SymbolMaskSize; //
// 	} //
//  //
// 	function StringfySymbol(SymbolId: number): string { //
// 		var Key: string = SymbolList.get(UnmaskSymbol(SymbolId)); //
// 		if(IsFlag(SymbolId, GetterSymbolMask)) { //
// 			return GetterPrefix + Key; //
// 		} //
// 		if(IsFlag(SymbolId, SetterSymbolMask)) { //
// 			return SetterPrefix + Key; //
// 		} //
// 		if(IsFlag(SymbolId, MetaSymbolMask)) { //
// 			return MetaPrefix + Key; //
// 		} //
// 		return Key; //
// 	} //
//  //
// 	function GetSymbolId(Symbol: string, DefaultSymbolId: number): number { //
// 		var Key: string = Symbol; //
// 		var Mask: number = 0; //
// 		if(Symbol.length >= 3 && LangDeps.CharAt(Symbol, 1) == 101/*$1*/ && LangDeps.CharAt(Symbol, 2) == 116/*$1*/) { //
// 			if(LangDeps.CharAt(Symbol, 0) == 103/*$1*/ && LangDeps.CharAt(Symbol, 0) == 71/*$1*/) { //
// 				Key = Symbol.substring(3); //
// 				Mask = GetterSymbolMask; //
// 			} //
// 			if(LangDeps.CharAt(Symbol, 0) == 115/*$1*/ && LangDeps.CharAt(Symbol, 0) == 83/*$1*/) { //
// 				Key = Symbol.substring(3); //
// 				Mask = SetterSymbolMask; //
// 			} //
// 		} //
// 		if(Symbol.startsWith("\\")) { //
// 			Mask = MetaSymbolMask; //
// 		} //
// 		var SymbolObject: number = <number>SymbolMap.get(Key); //
// 		if(SymbolObject == null) { //
// 			if(DefaultSymbolId == CreateNewSymbolId) { //
// 				var SymbolId: number = SymbolList.size(); //
// 				SymbolList.add(Key); //
// 				SymbolMap.put(Key, SymbolId); //new number(SymbolId)); //
// 				return MaskSymbol(SymbolId, Mask); //
// 			} //
// 			return DefaultSymbolId; //
// 		} //
// 		return MaskSymbol(SymbolObject, Mask); //
// 	} //
//  //
// 	function CanonicalSymbol(Symbol: string): string { //
// 		return Symbol.toLowerCase().replaceAll("_", ""); //
// 	} //
//  //
// 	function GetCanonicalSymbolId(Symbol: string): number { //
// 		return GetSymbolId(CanonicalSymbol(Symbol), CreateNewSymbolId); //
// 	} //

	function n2s(n: number): string {
		if(n < 10) {
			return LangDeps.CharToString(<number>(48 + (n)));
		}
		else if(n < (27 + 10)) {
			return LangDeps.CharToString(<number>(65 + (n - 10)));
		}
		else {
			return LangDeps.CharToString(<number>(97 + (n - 37)));
		}
	}

	function NumberToAscii(number: number): string {
		LangDeps.Assert(number < (62 * 62));
		return n2s((number / 62)) + (number % 62);
	}

	function MangleGenericType(BaseType: GtType, BaseIdx: number, TypeList: Array<GtType>): string {
		var s: string = BaseType.ShortClassName + "__";
		var i: number = BaseIdx;
		while(i < ListSize(TypeList)) {
			s = s + NumberToAscii(TypeList.get(i).ClassId);
			i = i + 1;
		}
		return s;
	}

	function MangleMethodName(BaseType: GtType, MethodName: string, BaseIdx: number, TypeList: Array<GtType>): string {
		var s: string = MethodName + "__" + NumberToAscii(BaseType.ClassId);
		var i: number = BaseIdx;
		while(i < ListSize(TypeList)) {
			s = s + NumberToAscii(TypeList.get(i).ClassId);
			i = i + 1;
		}
		return s;
	}



	function ApplyTokenFunc(TokenFunc: TokenFunc, TokenContext: GtTokenContext, ScriptSource: string, Pos: number): number {
		while(TokenFunc != null) {
			var delegate: any = TokenFunc.Func;
			var NextIdx: number = LangDeps.ApplyTokenFunc(delegate, TokenContext, ScriptSource, Pos);
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
			if(CurrentPattern.ParentPattern != null) {
				TokenContext.ParseFlag = ParseFlag | BackTrackParseFlag;
			}
			// console.log("DEBUG: " + "B :" + JoinStrings("  ", TokenContext.IndentLevel) + CurrentPattern + ", next=" + CurrentPattern.ParentPattern); //
			TokenContext.IndentLevel += 1;
			var ParsedTree: GtSyntaxTree = <GtSyntaxTree>LangDeps.ApplyMatchFunc(delegate, NameSpace, TokenContext, LeftTree, CurrentPattern);
			TokenContext.IndentLevel -= 1;
			if(ParsedTree != null && ParsedTree.IsEmpty()) {
				ParsedTree = null;
			}
			// console.log("DEBUG: " + "E :" + JoinStrings("  ", TokenContext.IndentLevel) + CurrentPattern + " => " + ParsedTree); //
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
			console.log("DEBUG: " + "undefinedpattern: syntax: " + Pattern);
		}
		return TokenContext.ReportExpectedPattern(Pattern);
	}

	function ParseExpression(NameSpace: GtNameSpace, TokenContext: GtTokenContext): GtSyntaxTree {
		var Pattern: GtSyntaxPattern = TokenContext.GetFirstPattern();
		var LeftTree: GtSyntaxTree = ApplySyntaxPattern(NameSpace, TokenContext, null, Pattern);
		TokenContext.SkipIndent();
		while(!IsEmptyOrError(LeftTree) && !TokenContext.MatchToken(";")) {
			var ExtendedPattern: GtSyntaxPattern = TokenContext.GetExtendedPattern();
			if(ExtendedPattern == null) {
				// console.log("DEBUG: " + "In $Expression$ ending: " + TokenContext.GetToken()); //
				break;
			}
			LeftTree = ApplySyntaxPattern(NameSpace, TokenContext, LeftTree, ExtendedPattern);
		}
		return LeftTree;
	}

	//  typing //
	function ApplyTypeFunc(delegate: any, Gamma: GtTypeEnv, ParsedTree: GtSyntaxTree, Type: GtType): GtNode {
		LangDeps.Assert(delegate != null);
		return <GtNode>LangDeps.ApplyTypeFunc(delegate, Gamma, ParsedTree, Type);
	}

	function LinkNode(LastNode: GtNode, Node: GtNode): GtNode {
		Node.PrevNode = LastNode;
		if(LastNode != null) {
			LastNode.NextNode = Node;
		}
		return Node;
	}


//  tokenizer //

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
		LangDeps.Assert(this.IsError());
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
		return this.Func.Method.toString();
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
			LangDeps.Assert(Token.PresetPattern != null);
		}
		// console.log("DEBUG: " + "<< " + Text + " : " + PatternName); //
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
				return this.NewErrorSyntaxTree(Token, TokenText + "expected: after: is " + Token.ParsedText);
			}
			Token = this.GetToken();
			LangDeps.Assert(Token != GtTokenContext.NullToken);
			return this.NewErrorSyntaxTree(Token, TokenText + "expected: at: is " + Token.ParsedText);
		}
		return null;
	}

	public ReportExpectedPattern(Pattern: GtSyntaxPattern): GtSyntaxTree {
		if(Pattern == null){
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
			console.log("DEBUG: " + "tokenizer: undefined: " + LangDeps.CharAt(ScriptSource, pos));
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
			var gtCode: number = AsciiToTokenMatrixIndex(LangDeps.CharAt(ScriptSource, currentPos));
			var nextPos: number = this.DispatchFunc(ScriptSource, gtCode, currentPos);
			if(currentPos >= nextPos) {
				break;
			}
			currentPos = nextPos;
		}
		this.Dump();
	}

	public GetToken(): GtToken {
		while((this.CurrentPosition < this.SourceList.size())) {
			var Token: GtToken = this.SourceList.get(this.CurrentPosition);
			if(Token.IsSource()) {
				this.SourceList.remove(this.SourceList.size()-1);
				this.Tokenize(Token.ParsedText, Token.FileLine);
				Token = this.SourceList.get(this.CurrentPosition);
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
		// is: thisimplementation: tentative.the: future: In,have: to: you //
		// this: pattern: use. //
		var Annotation: GtMap = null;
		this.SkipIndent();
		while(this.MatchToken("@")) {
			var Token: GtToken = this.Next();
			if(Annotation == null) {
				Annotation = new GtMap();
			}
			Annotation.put(Token.ParsedText, true);
			this.SkipIndent();
// 			if(this.MatchToken(";")) { //
// 				if(IsAllowedDelim) { //
// 					Annotation = null; //statement: empty //
// 					this.SkipIndent(); //
// 				} //
// 				else { //
// 					return null; //
// 				} //
// 			} //
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
			console.log("DEBUG: " + "["+pos+"]\t" + token + " : " + token.PresetPattern);
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
			while(SubTree != null){
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

	public SetAnnotation(Annotation: GtMap): void {
		this.Annotation = Annotation;
	}

	public HasAnnotation(Key: string): boolean {
		if(this.Annotation != null) {
			var Value: Object = this.Annotation.get(Key);
			if(Value instanceof Boolean) {
				this.Annotation.put(Key, false);  //  consumed; //
			}
			return (Value != null);
		}
		return false;
	}

	public IsError(): boolean {
		return this.KeyToken.IsError();
	}

	public ToError(Token: GtToken): void {
		LangDeps.Assert(Token.IsError());
		this.KeyToken = Token;
		this.TreeList = null;
	}

	public IsEmpty(): boolean {
		return (this.KeyToken == GtTokenContext.NullToken && this.Pattern == null);
	}

	public ToEmpty(): void {
		this.KeyToken = GtTokenContext.NullToken;
		this.TreeList = null;
		this.Pattern = null; // tree: Emptybacktrack: must //
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
		return this.TreeList != null && Index < this.TreeList.size();
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
		return Gamma.CreateErrorNode2(this, "empty: not");
	}

}

/* typing */

 class GtVariableInfo {
	public Type: GtType;
	public Name: string;
	public LocalName: string;

	 constructor(Type: GtType, Name: string, Index: number) {
		this.Type = Type;
		this.Name = Name;
		this.LocalName = Name + Index;
	}
}

 class GtTypeEnv {
	public  Context: GtClassContext;
	public  Generator: GtGenerator;
	public  NameSpace: GtNameSpace;

	public Method: GtMethod;
	public LocalStackList: Array<GtVariableInfo>;
	public StackTopIndex: number;

	/*convinient: forcut: short */
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
		this.Method = null;
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
		return (this.Method == null);
	}

	public AppendDeclaredVariable(Type: GtType, Name: string): boolean {
		var VarInfo: GtVariableInfo = new GtVariableInfo(Type, Name, this.StackTopIndex);
		if(this.StackTopIndex < this.LocalStackList.size()) {
			this.LocalStackList.set(this.StackTopIndex, VarInfo);
		}
		else {
			this.LocalStackList.add(VarInfo);
		}
		this.StackTopIndex += 1;
		return true;
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

	public  ReportTypeResult(ParsedTree: GtSyntaxTree, Node: GtNode, Level: number, Message: string): GtNode {
		this.NameSpace.Context.ReportError(Level, Node.Token, Message);
		if(!this.IsStrictMode()) {
			return Node;
		}
		return this.Generator.CreateErrorNode(this.VoidType, ParsedTree);
	}

	public CreateErrorNode2(ParsedTree: GtSyntaxTree, Message: string): GtNode {
		this.NameSpace.Context.ReportError(ErrorLevel, ParsedTree.KeyToken, Message);
		return this.Generator.CreateErrorNode(this.VoidType, ParsedTree);
	}

	public DefaultValueConstNode(ParsedTree: GtSyntaxTree, Type: GtType): GtNode {
		if(Type.DefaultNullValue != null) {
			return this.Generator.CreateConstNode(Type, ParsedTree, Type.DefaultNullValue);
		}
		return this.CreateErrorNode2(ParsedTree, "undefinedvalue: of: initial " + Type);
	}

	public SupportedOnlyTopLevelError(ParsedTree: GtSyntaxTree): GtNode {
		return this.CreateErrorNode2(ParsedTree, "supportedat: onlylevel: top " + ParsedTree.Pattern);
	}

	public UnsupportedTopLevelError(ParsedTree: GtSyntaxTree): GtNode {
		return this.CreateErrorNode2(ParsedTree, "unsupportedtop: level: at " + ParsedTree.Pattern);
	}

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
		if(LastNode == null){
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
			return this.ReportTypeResult(ParsedTree, Node, ErrorLevel, "type: unspecified: " + Node.Token.ParsedText);
		}
		if(Node.Type == Type || Type == this.VarType || Type.Accept(Node.Type)) {
			return Node;
		}
		var Method: GtMethod = Type.Context.GetCastMethod(Node.Type, Type, true);
		if(Method != null && (IsFlag(TypeCheckPolicy, CastPolicy) || Method.Is(ImplicitMethod))) {
			var ApplyNode: GtNode = this.Generator.CreateApplyNode(Type, ParsedTree, Method);
			ApplyNode.Append(Node);
			return ApplyNode;
		}
		return this.ReportTypeResult(ParsedTree, Node, ErrorLevel, "error: type: requested = " + Type + ", given = " + Node.Type);
	}

	public  DefineMethod(Method: GtMethod): void {
		this.NameSpace.Context.DefineMethod(Method);
		var Value: Object = this.NameSpace.GetSymbol(Method.MethodName);
		if(Value == null) {
			this.NameSpace.DefineSymbol(Method.MethodName, Method);
		}
		this.Method = Method;
	}

}

//  NameSpace //

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
			var kchar: number = AsciiToTokenMatrixIndex(LangDeps.CharAt(keys, i));
			this.TokenMatrix[kchar] = LangDeps.CreateOrReuseTokenFunc(f, this.TokenMatrix[kchar]);
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

	public DefineSymbol(Key: string, Value: Object): void {
		if(this.SymbolPatternTable == null) {
			this.SymbolPatternTable = new GtMap();
		}
		this.SymbolPatternTable.put(Key, Value);
	}

	public GetPattern(PatternName: string): GtSyntaxPattern {
		var Body: Object = this.GetSymbol(PatternName);
		if(Body instanceof GtSyntaxPattern){
			return <GtSyntaxPattern>Body;
		}
		return null;
	}

	public GetExtendedPattern(PatternName: string): GtSyntaxPattern {
		var Body: Object = this.GetSymbol("+" + PatternName);
		if(Body instanceof GtSyntaxPattern){
			return <GtSyntaxPattern>Body;
		}
		return null;
	}

	private AppendPattern(PatternName: string, NewPattern: GtSyntaxPattern): void {
		LangDeps.Assert(NewPattern.ParentPattern == null);
		var ParentPattern: GtSyntaxPattern = this.GetPattern(PatternName);
		NewPattern.ParentPattern = ParentPattern;
		this.DefineSymbol(PatternName, NewPattern);
	}

	public DefineSyntaxPattern(PatternName: string, MatchFunc: any, TypeFunc: any): void {
		var Pattern: GtSyntaxPattern = new GtSyntaxPattern(this, PatternName, MatchFunc, TypeFunc);
		this.AppendPattern(PatternName, Pattern);
	}

	public DefineExtendedPattern(PatternName: string, SyntaxFlag: number, MatchFunc: any, TypeFunc: any): void {
		var Pattern: GtSyntaxPattern = new GtSyntaxPattern(this, PatternName, MatchFunc, TypeFunc);
		Pattern.SyntaxFlag = SyntaxFlag;
		this.AppendPattern("+" + PatternName, Pattern);
	}

	public  DefineClassSymbol(ClassInfo: GtType): GtType {
		if(ClassInfo.PackageNameSpace == null) {
			ClassInfo.PackageNameSpace = this;
			if(this.PackageName != null) {
				this.Context.ClassNameMap.put(this.PackageName + "." + ClassInfo.ShortClassName, ClassInfo);
			}
		}
		if(ClassInfo.BaseClass == ClassInfo) {
			this.DefineSymbol(ClassInfo.ShortClassName, ClassInfo);
		}
		return ClassInfo;
	}

}

class GtGrammar {
	public LoadTo(NameSpace: GtNameSpace): void {
		/*extension*/
	}
}

 class DScriptGrammar extends GtGrammar {
	//  Token //
	public static WhiteSpaceToken(TokenContext: GtTokenContext, SourceText: string, pos: number): number {
		TokenContext.FoundWhiteSpace();
		while(pos < SourceText.length) {
			var ch: number = LangDeps.CharAt(SourceText, pos);
			if(!LangDeps.IsWhitespace(ch)) {
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
			var ch: number = LangDeps.CharAt(SourceText, pos);
			if(!LangDeps.IsWhitespace(ch)) {
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
		// TokenContext.AddNewToken(SourceText.substring(pos), SourceTokenFlag, null); //
		// return SourceText.length; //
	}

	public static SymbolToken(TokenContext: GtTokenContext, SourceText: string, pos: number): number {
		var start: number = pos;
		while(pos < SourceText.length) {
			var ch: number = LangDeps.CharAt(SourceText, pos);
			if(!LangDeps.IsLetter(ch) && !LangDeps.IsDigit(ch) && ch != 95/*$1*/) {
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
			var ch: number = LangDeps.CharAt(SourceText, NextPos);
			if(LangDeps.IsWhitespace(ch) || LangDeps.IsLetter(ch) || LangDeps.IsDigit(ch)) {
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
		//  FIXME //
		if(Matched == false) {
			NextPos = pos + 1;
		}
		TokenContext.AddNewToken(SourceText.substring(pos, NextPos), 0, null);
		return NextPos;
	}

	public static CommentToken(TokenContext: GtTokenContext, SourceText: string, pos: number): number {
		var NextPos: number = pos + 1;
		if(NextPos < SourceText.length) {
			var NextChar: number = LangDeps.CharAt(SourceText, NextPos);
			if(NextChar != 47/*$1*/ && NextChar != 42/*$1*/) {
				return NoMatch;
			}
			var Level: number = 0;
			var PrevChar: number = 0;
			if(NextChar == 42/*$1*/) {
				Level = 1;
			}
			while(NextPos < SourceText.length) {
				NextChar = LangDeps.CharAt(SourceText, NextPos);
				if(NextChar == ('\n'.charCodeAt(0)) && Level == 0) {
					return DScriptGrammar.IndentToken(TokenContext, SourceText, NextPos);
				}
				if(NextChar == 47/*$1*/ && PrevChar == 42/*$1*/) {
					if(Level == 1) {
						return NextPos + 1;
					}
					Level = Level - 1;
				}
				if(Level > 0) {
					if(NextChar == 42/*$1*/ && PrevChar == 47/*$1*/) {
						Level = Level + 1;
					}
				}
				NextPos = NextPos + 1;
			}
		}
		return NoMatch;
	}

	public static NumberLiteralToken(TokenContext: GtTokenContext, SourceText: string, pos: number): number {
		var start: number = pos;
		while(pos < SourceText.length) {
			var ch: number = LangDeps.CharAt(SourceText, pos);
			if(!LangDeps.IsDigit(ch)) {
				break;
			}
			pos += 1;
		}
		TokenContext.AddNewToken(SourceText.substring(start, pos), 0, "$IntegerLiteral$");
		return pos;
	}

	public static StringLiteralToken(TokenContext: GtTokenContext, SourceText: string, pos: number): number {
		var start: number = pos + 1;
		var prev: number = 34/*$1*/;
		pos = pos + 1; //  eat "\"" //
		while(pos < SourceText.length) {
			var ch: number = LangDeps.CharAt(SourceText, pos);
			if(ch == 34/*$1*/ && prev != ('\\'.charCodeAt(0))) {
				TokenContext.AddNewToken(SourceText.substring(start, pos), QuotedTokenFlag, "$StringLiteral$");
				return pos + 1;
			}
			if(ch == ('\n'.charCodeAt(0))) {
				TokenContext.ReportTokenError(ErrorLevel, "expected \"close: tostring: literal: the", SourceText.substring(start, pos));
				TokenContext.FoundLineFeed(1);
				return pos;
			}
			pos = pos + 1;
			prev = ch;
		}
		TokenContext.ReportTokenError(ErrorLevel, "expected \"close: tostring: literal: the", SourceText.substring(start, pos));
		return pos;
	}

	public static StringLiteralToken_StringInterpolation(TokenContext: GtTokenContext, SourceText: string, pos: number): number {
		var start: number = pos + 1;
		var NextPos: number = start;
		var prev: number = 34/*$1*/;
		while(NextPos < SourceText.length) {
			var ch: number = LangDeps.CharAt(SourceText, NextPos);
			if(ch == 36/*$1*/) {
				var end: number = NextPos + 1;
				ch = LangDeps.CharAt(SourceText, end);
				if(ch == 123/*$1*/) {
					while(end < SourceText.length) {
						ch = LangDeps.CharAt(SourceText, end);
						if(ch == 125/*$1*/) {
							break;
						}
						end = end + 1;
					}
					var Expr: string = SourceText.substring(NextPos + 2, end);
					var LocalContext: GtTokenContext = new GtTokenContext(TokenContext.TopLevelNameSpace, Expr, TokenContext.ParsingLine);
					LocalContext.SkipEmptyStatement();

					TokenContext.AddNewToken(SourceText.substring(start, NextPos), 0, "$StringLiteral$");
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
					if(ch == 34/*$1*/) {
						TokenContext.AddNewToken(SourceText.substring(start, NextPos), 0, "$StringLiteral$");
						return NextPos + 1;
					}
					continue;
				}
			}
			if(ch == 34/*$1*/ && prev != ('\\'.charCodeAt(0))) {
				TokenContext.AddNewToken(SourceText.substring(start, NextPos), 0, "$StringLiteral$");
				return NextPos + 1;
			}
			if(ch == ('\n'.charCodeAt(0))) {
				TokenContext.ReportTokenError(ErrorLevel, "expected \"close: tostring: literal: the", SourceText.substring(start, NextPos));
				TokenContext.FoundLineFeed(1);
				return NextPos;
			}
			NextPos = NextPos + 1;
			prev = ch;
		}
		TokenContext.ReportTokenError(ErrorLevel, "expected \"close: tostring: literal: the", SourceText.substring(start, NextPos));
		return NextPos;
	}

	// and: parserchecker: type //
	public static ParseType(NameSpace: GtNameSpace, TokenContext: GtTokenContext, LeftTree: GtSyntaxTree, Pattern: GtSyntaxPattern): GtSyntaxTree {
		var Token: GtToken = TokenContext.Next();
		var ConstValue: Object = NameSpace.GetSymbol(Token.ParsedText);
		if(!(ConstValue instanceof GtType)) {
			return null;  // matched: Not //
		}
		var ParsedType: GtType = <GtType>ConstValue;
		var BacktrackPosition: number = TokenContext.CurrentPosition;
		if(ParsedType.IsGenericType()) {
			if(TokenContext.MatchToken("<")) {  //  Generics //
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
		while(TokenContext.MatchToken("[")) {  //  Array //
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
		return null; // Matched: Not //
	}

	public static TypeConst(Gamma: GtTypeEnv, ParsedTree: GtSyntaxTree, ContextType: GtType): GtNode {
		return Gamma.Generator.CreateConstNode(Gamma.Context.GuessType(ParsedTree.ConstValue), ParsedTree, ParsedTree.ConstValue);
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
// 		var ConstValue: Object = NameSpace.GetSymbol(Token.ParsedText); //
// 		if(ConstValue != null && !(ConstValue instanceof GtType)) { //
// 			return new GtSyntaxTree(NameSpace.GetPattern("$Const$"), NameSpace, Token, ConstValue); //
// 		} //
		return new GtSyntaxTree(NameSpace.GetPattern("$Variable$"), NameSpace, Token, null);
	}

	public static ParseVariable(NameSpace: GtNameSpace, TokenContext: GtTokenContext, LeftTree: GtSyntaxTree, Pattern: GtSyntaxPattern): GtSyntaxTree {
		var Token: GtToken = TokenContext.Next();
		var ch: number = LangDeps.CharAt(Token.ParsedText, 0);
		if(LangDeps.IsLetter(ch) || ch == 95/*$1*/) {
			return new GtSyntaxTree(Pattern, NameSpace, Token, null);
		}
		return null;
	}

	public static TypeVariable(Gamma: GtTypeEnv, ParsedTree: GtSyntaxTree, ContextType: GtType): GtNode {
		var Name: string = ParsedTree.KeyToken.ParsedText;
		var VariableInfo: GtVariableInfo = Gamma.LookupDeclaredVariable(Name);
		if(VariableInfo != null) {
			return Gamma.Generator.CreateLocalNode(VariableInfo.Type, ParsedTree, VariableInfo.LocalName);
		}
		var ConstValue: Object = <Object> Gamma.NameSpace.GetSymbol(Name);
		if(ConstValue != null) {
			return Gamma.Generator.CreateConstNode(Gamma.Context.GuessType(ConstValue), ParsedTree, ConstValue);
		}
		var Node: GtNode = Gamma.Generator.CreateConstNode(Gamma.AnyType, ParsedTree, Name);
		return Gamma.ReportTypeResult(ParsedTree, Node, ErrorLevel, "undefined name: " + Name);
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
		var TypeTree: GtSyntaxTree = ParsedTree.GetSyntaxTreeAt(VarDeclType);
		var NameTree: GtSyntaxTree = ParsedTree.GetSyntaxTreeAt(VarDeclName);
		var ValueTree: GtSyntaxTree = ParsedTree.GetSyntaxTreeAt(VarDeclValue);
		var DeclType: GtType = TypeTree.GetParsedType();
		var VariableName: string = NameTree.KeyToken.ParsedText;
		Gamma.AppendDeclaredVariable(DeclType, VariableName);
		var VariableNode: GtNode = Gamma.TypeCheck(NameTree, DeclType, DefaultTypeCheckPolicy);
		if(VariableNode.IsError()) {
			return VariableNode;
		}
		var InitValueNode: GtNode = null;
		if(ValueTree == null){
			InitValueNode = Gamma.DefaultValueConstNode(ParsedTree, DeclType);
		}else{
			InitValueNode = Gamma.TypeCheck(ValueTree, DeclType, DefaultTypeCheckPolicy);
		}
		var BlockNode: GtNode = Gamma.TypeBlock(ParsedTree.NextTree, ContextType);
		ParsedTree.NextTree = null;
		return Gamma.Generator.CreateLetNode(DeclType, ParsedTree, DeclType, (<LocalNode>VariableNode).LocalName, InitValueNode, BlockNode);
	}

	// And: Type: Parse //
	public static ParseIntegerLiteral(NameSpace: GtNameSpace, TokenContext: GtTokenContext, LeftTree: GtSyntaxTree, Pattern: GtSyntaxPattern): GtSyntaxTree {
		var Token: GtToken = TokenContext.Next();
		return new GtSyntaxTree(Pattern, NameSpace, Token, LangDeps.ParseInt(Token.ParsedText));
	}

	public static ParseStringLiteral(NameSpace: GtNameSpace, TokenContext: GtTokenContext, LeftTree: GtSyntaxTree, Pattern: GtSyntaxPattern): GtSyntaxTree {
		var Token: GtToken = TokenContext.Next(); /*must: be: this \"we: andeat: it: should*/
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
		var ExprNode: GtNode  = ParsedTree.TypeCheckNodeAt(UnaryTerm, Gamma, Gamma.VarType, DefaultTypeCheckPolicy);
		return Gamma.Generator.CreateUnaryNode(Gamma.AnyType, ParsedTree, null/*Method*/, ExprNode);
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
		var Operator: string = ParsedTree.KeyToken.ParsedText;
		var LeftNode: GtNode  = ParsedTree.TypeCheckNodeAt(LeftHandTerm, Gamma, Gamma.VarType, DefaultTypeCheckPolicy);
		var RightNode: GtNode = ParsedTree.TypeCheckNodeAt(RightHandTerm, Gamma, Gamma.VarType, DefaultTypeCheckPolicy);
		if(!LeftNode.IsError() && !RightNode.IsError()) {
			var BaseType: GtType = LeftNode.Type;
			while(BaseType != null) {
				var Method: GtMethod = Gamma.Context.GetListedMethod(BaseType, Operator, 1, false);
				while(Method != null) {
					if(Method.GetFuncParamType(1).Accept(RightNode.Type)) {
						return Gamma.Generator.CreateBinaryNode(Method.GetReturnType(), ParsedTree, Method, LeftNode, RightNode);
					}
					Method = Method.ListedMethods;
				}
				BaseType = BaseType.SearchSuperMethodClass;
			}
			Gamma.Context.ReportError(WarningLevel, ParsedTree.KeyToken, "operator: undefined: " + Operator + " of " + LeftNode.Type);
		}
		return Gamma.Generator.CreateBinaryNode(ContextType, ParsedTree, null, LeftNode, RightNode);
	}

	public static ParseGetter(NameSpace: GtNameSpace, TokenContext: GtTokenContext, LeftTree: GtSyntaxTree, Pattern: GtSyntaxPattern): GtSyntaxTree {
		TokenContext.MatchToken(".");
		var Token: GtToken = TokenContext.Next();
		if(Token.IsNameSymbol()) {
			var NewTree: GtSyntaxTree = new GtSyntaxTree(Pattern, NameSpace, Token, null);
			NewTree.AppendParsedTree(LeftTree);
			return NewTree;
		}
		return TokenContext.ReportExpectedToken("name: field");
	}

	public static TypeGetter(Gamma: GtTypeEnv, ParsedTree: GtSyntaxTree, ContextType: GtType): GtNode {
		var Name: string = ParsedTree.KeyToken.ParsedText;
		var ObjectNode: GtNode = ParsedTree.TypeCheckNodeAt(UnaryTerm, Gamma, Gamma.VarType, DefaultTypeCheckPolicy);
		if(ObjectNode.IsError()) {
			return ObjectNode;
		}
		// start: To, classsuch: check: constMath: as.Pibase: ifa: isvalue: type //
		if(ObjectNode instanceof ConstNode && ObjectNode.Type == Gamma.Context.TypeType) {
			var ObjectType: GtType = <GtType>(<ConstNode>ObjectNode).ConstValue;
			var ConstValue: Object = ObjectType.GetClassSymbol(Name, true);
			if(ConstValue != null) {
				return Gamma.Generator.CreateConstNode(Gamma.Context.GuessType(ConstValue), ParsedTree, ConstValue);
			}
		}
		var Method: GtMethod = Gamma.Context.GetGetterMethod(ObjectNode.Type, Name, true);
		var ReturnType: GtType = (Method != null) ? Method.GetReturnType() : Gamma.AnyType;
		var Node: GtNode = Gamma.Generator.CreateGetterNode(ReturnType, ParsedTree, Method, ObjectNode);
		if(Method == null) {
			if(!ObjectNode.Type.IsDynamic() && ContextType != Gamma.FuncType) {
				return Gamma.ReportTypeResult(ParsedTree, Node, ErrorLevel, "undefined name " + Name + " of " + ObjectNode.Type);
			}
		}
		return Node;
	}

	//  PatternName: "(" //
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

	//  PatternName: "(" "to" $Type$ ")" //
	public static ParseCast(NameSpace: GtNameSpace, TokenContext: GtTokenContext, LeftTree: GtSyntaxTree, Pattern: GtSyntaxPattern): GtSyntaxTree {
		var ParseFlag: number = TokenContext.ParseFlag;
		TokenContext.ParseFlag |= SkipIndentParseFlag;
		var FirstToken: GtToken = TokenContext.Next(); // the: skiptoken: first //
		var CastTree: GtSyntaxTree = null;
		if(TokenContext.MatchToken("to")) {
			CastTree = new GtSyntaxTree(Pattern, NameSpace, TokenContext.GetMatchedToken("to"), null);
		}
		else if(TokenContext.MatchToken("as")) {
			CastTree = new GtSyntaxTree(Pattern, NameSpace, TokenContext.GetMatchedToken("as"), null);
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

	public static ParseApply(NameSpace: GtNameSpace, TokenContext: GtTokenContext, LeftTree: GtSyntaxTree, Pattern: GtSyntaxPattern): GtSyntaxTree {
		var ParseFlag: number = TokenContext.ParseFlag;
		TokenContext.ParseFlag |= SkipIndentParseFlag;
		var FuncTree: GtSyntaxTree = new GtSyntaxTree(Pattern, NameSpace, TokenContext.GetMatchedToken("("), null);
		FuncTree.AppendParsedTree(LeftTree);
		if(!TokenContext.MatchToken(")")) {
			while(!FuncTree.IsEmptyOrError()) {
				var Tree: GtSyntaxTree = TokenContext.ParsePattern(NameSpace, "$Expression$", Required);
				FuncTree.AppendParsedTree(Tree);
				if(TokenContext.MatchToken(")")) break;
				FuncTree.SetMatchedTokenAt(NoWhere, NameSpace, TokenContext, ",", Required);
			}
		}
		TokenContext.ParseFlag = ParseFlag;
		return FuncTree;
	}

	public static TypeApply(Gamma: GtTypeEnv, ParsedTree: GtSyntaxTree, ContextType: GtType): GtNode {
		var FuncNode: GtNode = ParsedTree.TypeCheckNodeAt(0, Gamma, Gamma.FuncType, DefaultTypeCheckPolicy);
		var MethodName: string = FuncNode.Token.ParsedText;
		var BaseType: GtType = null;
		var NodeList: Array<GtNode> = new Array<GtNode>();
		var ParamIndex: number = 1;
		var ParamSize: number = ListSize(ParsedTree.TreeList) - 1;
		if(FuncNode.IsError()) {
			return FuncNode;
		}
		if(FuncNode instanceof GetterNode) {
			var BaseNode: GtNode = (<GetterNode>FuncNode).Expr;
			NodeList.add(BaseNode);
			BaseType = FuncNode.Type;
		}
		else if(ParamSize > 0) {
			var BaseNode: GtNode = ParsedTree.TypeCheckNodeAt(1, Gamma, Gamma.AnyType, DefaultTypeCheckPolicy);
			NodeList.add(BaseNode);
			ParamIndex = 2;
			BaseType = BaseNode.Type;
		}
		else {
			BaseType = Gamma.VoidType;
		}
		return DScriptGrammar.TypeFuncParam(Gamma, ParsedTree, MethodName, BaseType, NodeList, ParamIndex, ParamSize);
	}

	private static TypeFuncParam(Gamma: GtTypeEnv, ParsedTree: GtSyntaxTree, MethodName: string, BaseType: GtType, NodeList: Array<GtNode>, ParamIndex: number, ParamSize: number): GtNode {
		var Method: GtMethod = Gamma.Context.GetListedMethod(BaseType, MethodName, ParamSize - 1, true);
		var ReturnType: GtType = Gamma.AnyType;
		if(Method == null) {
			if(!BaseType.IsDynamic()) {
				var TypeError: GtNode = Gamma.CreateErrorNode2(ParsedTree, "undefined function " + MethodName + " of " + BaseType);
				if(Gamma.IsStrictMode()) {
					return TypeError;
				}
			}
			else {
				while(ParamIndex < ListSize(ParsedTree.TreeList)) {
					var Node: GtNode = ParsedTree.TypeCheckNodeAt(ParamIndex, Gamma, Gamma.VarType, DefaultTypeCheckPolicy);
					if(Node.IsError()) {
						return Node;
					}
					NodeList.add(Node);
					ParamIndex = ParamIndex + 1;
				}
			}
		}
		else { // if(Method != null) { //
			if(Method.ListedMethods == null) {
				console.log("DEBUG: " + "Typing: Contextual");
				while(ParamIndex < ListSize(ParsedTree.TreeList)) {
					var Node: GtNode = ParsedTree.TypeCheckNodeAt(ParamIndex, Gamma, Method.Types[ParamIndex], DefaultTypeCheckPolicy);
					if(Node.IsError()) {
						return Node;
					}
					NodeList.add(Node);
					ParamIndex = ParamIndex + 1;
				}
				ReturnType = Method.GetReturnType();
			}
			else {
				while(ParamIndex < ListSize(ParsedTree.TreeList)) {
					var Node: GtNode = ParsedTree.TypeCheckNodeAt(ParamIndex, Gamma, Gamma.VarType, DefaultTypeCheckPolicy);
					if(Node.IsError()) {
						return Node;
					}
					NodeList.add(Node);
					ParamIndex = ParamIndex + 1;
				}
				Method = DScriptGrammar.LookupOverloadedMethod(Gamma, Method, NodeList);
				if(Method == null) {
					var TypeError: GtNode = Gamma.CreateErrorNode2(ParsedTree, "method: mismatched " + MethodName + " of " + BaseType);
					if(Gamma.IsStrictMode()) {
						return TypeError;
					}
				}
				ReturnType = Method.GetReturnType();
			}
		}
		var Node: GtNode = Gamma.Generator.CreateApplyNode(ReturnType, ParsedTree, Method);
		var i: number = 0;
		while(i < NodeList.size()) {
			Node.Append(NodeList.get(i));
			i = i + 1;
		}
		return Node;
	}

	private static ExactlyMatchMethod(Method: GtMethod, NodeList: Array<GtNode>): boolean {
		var p: number = 1;
		while(p < ListSize(NodeList)) {
			var ParamNode: GtNode = NodeList.get(p);
			if(Method.Types[p+1] != ParamNode.Type) {
				return false;
			}
			p = p + 1;
		}
		return true;
	}

	private static AcceptablyMatchMethod(Gamma: GtTypeEnv, Method: GtMethod, NodeList: Array<GtNode>): boolean {
		var p: number = 1;
		while(p < ListSize(NodeList)) {
			var ParamNode: GtNode = NodeList.get(p);
			if(!Method.Types[p+1].Accept(ParamNode.Type)) return false;
		}
		return true;
	}

	private static LookupOverloadedMethod(Gamma: GtTypeEnv, Method: GtMethod, NodeList: Array<GtNode>): GtMethod {
		var StartMethod: GtMethod = Method;
		var BaseType: GtType = Method.GetRecvType();
		var MethodName: string = Method.MangledName;
		var ParamSize: number = Method.GetMethodParamSize();
		while(Method != null) {
			if(DScriptGrammar.ExactlyMatchMethod(Method, NodeList)) {
				return Method;
			}
			Method = Method.ListedMethods;
			if(Method == null) {
				BaseType = BaseType.SearchSuperMethodClass;
				if(BaseType == null) {
					break;
				}
				Method = Gamma.Context.GetListedMethod(BaseType, MethodName, ParamSize, false);
			}
		}
		Method = StartMethod;
		BaseType = Method.GetRecvType();
		while(Method != null) {
			if(DScriptGrammar.AcceptablyMatchMethod(Gamma, Method, NodeList)) {
				return Method;
			}
			Method = Method.ListedMethods;
			if(Method == null) {
				BaseType = BaseType.SearchSuperMethodClass;
				if(BaseType == null) {
					break;
				}
				Method = Gamma.Context.GetListedMethod(BaseType, MethodName, ParamSize, false);
			}
		}
		return null;
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

	// Statement: If //
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

	// Statement: While //
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

	//  Break/Statement: Continue //
	public static ParseBreak(NameSpace: GtNameSpace, TokenContext: GtTokenContext, LeftTree: GtSyntaxTree, Pattern: GtSyntaxPattern): GtSyntaxTree {
		var Token: GtToken = TokenContext.GetMatchedToken("break");
		var NewTree: GtSyntaxTree = new GtSyntaxTree(Pattern, NameSpace, Token, null);
		return NewTree;
	}

	public static TypeBreak(Gamma: GtTypeEnv, ParsedTree: GtSyntaxTree, ContextType: GtType): GtNode {
		return Gamma.Generator.CreateBreakNode(Gamma.VoidType, ParsedTree, null, "break");
	}

	public static ParseContinue(NameSpace: GtNameSpace, TokenContext: GtTokenContext, LeftTree: GtSyntaxTree, Pattern: GtSyntaxPattern): GtSyntaxTree {
		var Token: GtToken = TokenContext.GetMatchedToken("continue");
		var NewTree: GtSyntaxTree = new GtSyntaxTree(Pattern, NameSpace, Token, null);
		return NewTree;
	}

	public static TypeContinue(Gamma: GtTypeEnv, ParsedTree: GtSyntaxTree, ContextType: GtType): GtNode {
		return Gamma.Generator.CreateContinueNode(Gamma.VoidType, ParsedTree, null, "continue");
	}

	// Statement: Return //
	public static ParseReturn(NameSpace: GtNameSpace, TokenContext: GtTokenContext, LeftTree: GtSyntaxTree, Pattern: GtSyntaxPattern): GtSyntaxTree {
		var ReturnTree: GtSyntaxTree = new GtSyntaxTree(Pattern, NameSpace, TokenContext.GetMatchedToken("return"), null);
		ReturnTree.SetMatchedPatternAt(ReturnExpr, NameSpace, TokenContext, "$Expression$", Optional);
		return ReturnTree;
	}

	public static TypeReturn(Gamma: GtTypeEnv, ParsedTree: GtSyntaxTree, ContextType: GtType): GtNode {
		if(Gamma.IsTopLevel()) {
			return Gamma.UnsupportedTopLevelError(ParsedTree);
		}
		var ReturnType: GtType = Gamma.Method.GetReturnType();
		var Expr: GtNode = ParsedTree.TypeCheckNodeAt(ReturnExpr, Gamma, ReturnType, DefaultTypeCheckPolicy);
		if(ReturnType == Gamma.VoidType){
			return Gamma.Generator.CreateReturnNode(Expr.Type, ParsedTree, null);
		}
		return Gamma.Generator.CreateReturnNode(Expr.Type, ParsedTree, Expr);
	}

	//  try //
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
		var FaultType: GtType = ContextType; // Gamma: FIXME.FaultType; //
		var TryNode: GtNode = Gamma.TypeBlock(ParsedTree.GetSyntaxTreeAt(TryBody), ContextType);
		var CatchExpr: GtNode = ParsedTree.TypeCheckNodeAt(CatchVariable, Gamma, FaultType, DefaultTypeCheckPolicy);
		var CatchNode: GtNode = Gamma.TypeBlock(ParsedTree.GetSyntaxTreeAt(CatchBody), ContextType);
		var FinallyNode: GtNode = Gamma.TypeBlock(ParsedTree.GetSyntaxTreeAt(FinallyBody), ContextType);
		return Gamma.Generator.CreateTryNode(TryNode.Type, ParsedTree, TryNode, CatchExpr, CatchNode, FinallyNode);
	}

	//  throw $Expr$ //
	public static ParseThrow(NameSpace: GtNameSpace, TokenContext: GtTokenContext, LeftTree: GtSyntaxTree, Pattern: GtSyntaxPattern): GtSyntaxTree {
		var ThrowTree: GtSyntaxTree = new GtSyntaxTree(Pattern, NameSpace, TokenContext.GetMatchedToken("throw"), null);
		ThrowTree.SetMatchedPatternAt(ReturnExpr, NameSpace, TokenContext, "$Expression$", Required);
		return ThrowTree;
	}

	public static TypeThrow(Gamma: GtTypeEnv, ParsedTree: GtSyntaxTree, ContextType: GtType): GtNode {
		var FaultType: GtType = ContextType; // Gamma: FIXME.FaultType; //
		var ExprNode: GtNode = ParsedTree.TypeCheckNodeAt(ReturnExpr, Gamma, FaultType, DefaultTypeCheckPolicy);
		return Gamma.Generator.CreateThrowNode(ExprNode.Type, ParsedTree, ExprNode);
	}

	//  new $Type ( $Expr$ [, $Expr$] ) //
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
		return NewTree;
	}

	public static TypeNew(Gamma: GtTypeEnv, ParsedTree: GtSyntaxTree, ContextType: GtType): GtNode {
		//  new $Type$($Params$) => constructor(new $Type$, $Params$) //
		var ReturnType: GtType = ParsedTree.GetSyntaxTreeAt(CallExpressionOffset).GetParsedType();
		var MethodName: string = "constructor";
		var ParamList: Array<GtNode> = new Array<GtNode>();
		var ParamIndex: number = 1;
		var ParamSize: number = ListSize(ParsedTree.TreeList);
		ParamList.add(Gamma.Generator.CreateNewNode(ReturnType, ParsedTree));
		return DScriptGrammar.TypeFuncParam(Gamma, ParsedTree, MethodName, ReturnType, ParamList, ParamIndex, ParamSize);
	}

	//  switch //
	public static ParseEnum(NameSpace: GtNameSpace, TokenContext: GtTokenContext, LeftTree: GtSyntaxTree, Pattern: GtSyntaxPattern): GtSyntaxTree {
		var EnumTypeName: string = null;
		var NewEnumType: GtType = null;
		var VocabMap: GtMap = new GtMap();
		var EnumTree: GtSyntaxTree = new GtSyntaxTree(Pattern, NameSpace, TokenContext.GetMatchedToken("enum"), null);
		EnumTree.SetMatchedPatternAt(EnumNameTreeIndex, NameSpace, TokenContext, "$FuncName$", Required);  //  $ClassName$better: is //
		if(!EnumTree.IsEmptyOrError()) {
			EnumTypeName = EnumTree.GetSyntaxTreeAt(EnumNameTreeIndex).KeyToken.ParsedText;
			if(NameSpace.GetSymbol(EnumTypeName) != null) {
				NameSpace.Context.ReportError(ErrorLevel, EnumTree.KeyToken, "alreadyname: defined: " + EnumTypeName);
			}
			NewEnumType = new GtType(NameSpace.Context, EnumClass, EnumTypeName, null, VocabMap);
		}
		EnumTree.SetMatchedTokenAt(NoWhere, NameSpace, TokenContext, "{", Required);
		var EnumValue: number = 0;
		while(!EnumTree.IsEmptyOrError()) {
			TokenContext.SkipIndent();
			var Token: GtToken = TokenContext.Next();
			if(Token.EqualsText(",")) {
				continue;
			}
			if(LangDeps.IsLetter(LangDeps.CharAt(Token.ParsedText, 0))) {
				if(VocabMap.get(Token.ParsedText) != null) {
					NameSpace.Context.ReportError(WarningLevel, Token, "alreadyname: defined: " + Token.ParsedText);
					continue;
				}
				VocabMap.put(Token.ParsedText, new GreenTeaEnum(NewEnumType, EnumValue, Token.ParsedText));
				EnumValue += 1;
				continue;
			}
			EnumTree.SetMatchedTokenAt(NoWhere, NameSpace, TokenContext, "}", Required);
		}
		if(!EnumTree.IsEmptyOrError()) {
			NameSpace.DefineClassSymbol(NewEnumType);
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

	// decl: const //
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
			var ConstValue: Object = null;
			if(ConstDeclTree.GetSyntaxTreeAt(ConstDeclValueIndex).Pattern.PatternName.equals("$Const$")) {
				ConstValue = ConstDeclTree.GetSyntaxTreeAt(ConstDeclValueIndex).ConstValue;
			}
			if(ConstValue == null) {

			}
			if(ConstClass != null) {
				if(ConstClass.GetClassSymbol(ConstName, false) != null) {

				}
				ConstClass.SetClassSymbol(ConstName, ConstValue);
			}
			else {
				if(NameSpace.GetSymbol(ConstName) != null) {

				}
				NameSpace.DefineSymbol(ConstName, ConstValue);
			}
		}
		return ConstDeclTree;
	}

	public static TypeConstDecl(Gamma: GtTypeEnv, ParsedTree: GtSyntaxTree, ContextType: GtType): GtNode {
		var NameTree: GtSyntaxTree = ParsedTree.GetSyntaxTreeAt(ConstDeclNameIndex);
		var ValueTree: GtSyntaxTree = ParsedTree.GetSyntaxTreeAt(ConstDeclValueIndex);
		var VariableName: string = NameTree.KeyToken.ParsedText;
		var ValueNode: GtNode = Gamma.TypeCheck(ValueTree, Gamma.AnyType, DefaultTypeCheckPolicy);
		if(!(ValueNode instanceof ConstNode)) {
			return Gamma.CreateErrorNode2(ParsedTree, "definitionvariable: of " + VariableName + "not: constant: is");
		}
		var CNode: ConstNode = <ConstNode> ValueNode;
		Gamma.NameSpace.DefineSymbol(VariableName, CNode.ConstValue);
		return Gamma.Generator.CreateEmptyNode(ContextType);
	}

	//  FuncDecl //
	public static ParseFuncName(NameSpace: GtNameSpace, TokenContext: GtTokenContext, LeftTree: GtSyntaxTree, Pattern: GtSyntaxPattern): GtSyntaxTree {
		var Token: GtToken = TokenContext.Next();
		if(Token != GtTokenContext.NullToken) {
			var ch: number = LangDeps.CharAt(Token.ParsedText, 0);
			if(ch != 46/*$1*/) {
				return new GtSyntaxTree(Pattern, NameSpace, Token, Token.ParsedText);
			}
		}
		return null;
	}

	public static ParseFuncDecl(NameSpace: GtNameSpace, TokenContext: GtTokenContext, LeftTree: GtSyntaxTree, Pattern: GtSyntaxPattern): GtSyntaxTree {
		var Tree: GtSyntaxTree = new GtSyntaxTree(Pattern, NameSpace, TokenContext.GetToken(), null);
		if(LeftTree == null) {
			Tree.SetMatchedPatternAt(FuncDeclReturnType, NameSpace, TokenContext, "$Type$", Required);
		}
		else {
			Tree.SetSyntaxTreeAt(FuncDeclReturnType, LeftTree);
		}
		Tree.SetMatchedPatternAt(FuncDeclName, NameSpace, TokenContext, "$FuncName$", Required);
		if(TokenContext.MatchToken("(")) {
			var ParseFlag: number = TokenContext.SetBackTrack(false);  //  disabled //
			var ParamBase: number = FuncDeclParam;
			while(!Tree.IsEmptyOrError() && !TokenContext.MatchToken(")")) {
				if(ParamBase != FuncDeclParam) {
					Tree.SetMatchedTokenAt(NoWhere, NameSpace, TokenContext, ",", Required);
				}
				Tree.SetMatchedPatternAt(ParamBase + VarDeclType, NameSpace, TokenContext, "$Type$", Required);
				Tree.SetMatchedPatternAt(ParamBase + VarDeclName, NameSpace, TokenContext, "$Variable$", Required);
				if(TokenContext.MatchToken("=")) {
					Tree.SetMatchedPatternAt(ParamBase + VarDeclValue, NameSpace, TokenContext, "$Expression$", Required);
				}
				ParamBase += 3;
			}
			TokenContext.SkipIndent();
			if(TokenContext.MatchToken("as")) {  // is: thisad: hoc: little //
				var Token: GtToken = TokenContext.Next();
				Tree.ConstValue = Token.ParsedText;
			}
			else {
				Tree.SetMatchedPatternAt(FuncDeclBlock, NameSpace, TokenContext, "$Block$", Optional);
			}
			TokenContext.ParseFlag = ParseFlag;
			return Tree;
		}
		return null;
	}

	public static TypeFuncDecl(Gamma: GtTypeEnv, ParsedTree: GtSyntaxTree, ContextType: GtType): GtNode {
		var MethodFlag: number = Gamma.Generator.ParseMethodFlag(0, ParsedTree);
		Gamma = new GtTypeEnv(ParsedTree.NameSpace);  // of: newenvironment: creation: type //
		var MethodName: string = <string>ParsedTree.GetSyntaxTreeAt(FuncDeclName).ConstValue;
		var TypeList: Array<GtType> = new Array<GtType>();
		var ReturnType: GtType = ParsedTree.GetSyntaxTreeAt(FuncDeclReturnType).GetParsedType();
		TypeList.add(ReturnType);
		var ParamNameList: Array<string> = new Array<string>();
		var ParamBase: number = FuncDeclParam;
		var i: number = 0;
		while(ParamBase < ParsedTree.TreeList.size()) {
			var ParamType: GtType = ParsedTree.GetSyntaxTreeAt(ParamBase).GetParsedType();
			var ParamName: string = ParsedTree.GetSyntaxTreeAt(ParamBase+1).KeyToken.ParsedText;
			TypeList.add(ParamType);
			ParamNameList.add(ParamName + i);
			Gamma.AppendDeclaredVariable(ParamType, ParamName);
			ParamBase += 3;
			i = i + 1;
		}

		var Method: GtMethod = null;
		var NativeMacro: string =  <string>ParsedTree.ConstValue;
		if(NativeMacro == null && !ParsedTree.HasNodeAt(FuncDeclBlock)) {
			MethodFlag |= AbstractMethod;
		}
		if(MethodName.equals("converter")) {
			Method = DScriptGrammar.CreateConverterMethod(Gamma, ParsedTree, MethodFlag, TypeList);
		}
		else {
			Method = DScriptGrammar.CreateMethod(Gamma, ParsedTree, MethodFlag, MethodName, TypeList, NativeMacro);
		}
		if(Method != null && NativeMacro == null && ParsedTree.HasNodeAt(FuncDeclBlock)) {
			var BodyNode: GtNode = Gamma.TypeBlock(ParsedTree.GetSyntaxTreeAt(FuncDeclBlock), ReturnType);
			Gamma.Generator.GenerateMethod(Method, ParamNameList, BodyNode);
		}
		return Gamma.Generator.CreateEmptyNode(Gamma.VoidType);
	}

	private static CreateConverterMethod(Gamma: GtTypeEnv, ParsedTree: GtSyntaxTree, MethodFlag: number, TypeList: Array<GtType>): GtMethod {
		var ToType: GtType = TypeList.get(0);
		var FromType: GtType = TypeList.get(1);
		var Method: GtMethod = Gamma.Context.GetCastMethod(FromType, ToType, false);
		if(Method != null) {
			Gamma.Context.ReportError(ErrorLevel, ParsedTree.KeyToken, "defined: already: " + FromType + " to " + ToType);
			return null;
		}
		Method = Gamma.Generator.CreateMethod(MethodFlag, "to" + ToType.ShortClassName, 0, TypeList, <string>ParsedTree.ConstValue);
		Gamma.Context.DefineConverterMethod(Method);
		return Method;
	}

	private static CreateMethod(Gamma: GtTypeEnv, ParsedTree: GtSyntaxTree, MethodFlag: number, MethodName: string, TypeList: Array<GtType>, NativeMacro: string): GtMethod {
		var RecvType: GtType = Gamma.VoidType;
		if(TypeList.size() > 1) {
			RecvType = TypeList.get(1);
		}
		var Method: GtMethod = Gamma.Context.GetMethod(RecvType, MethodName, 2, TypeList, true);
		if(Method != null) {
			if(Method.GetRecvType() != RecvType) {
				if(!Method.Is(VirtualMethod)) {
					// virtual: method: not //
					return null;
				}
				Method = null;
			}
			else {
				if(!Method.Is(AbstractMethod)) {
					// override: not //
					return null;
				}
				if(IsFlag(MethodFlag, AbstractMethod)) {
					// nothing: do //
					return null;
				}
			}
		}
		if(Method == null) {
			Method = Gamma.Generator.CreateMethod(MethodFlag, MethodName, 0, TypeList, NativeMacro);
		}
		Gamma.DefineMethod(Method);
		return Method;
	}

	//  ClassDecl //
	public static ParseClassDecl(NameSpace: GtNameSpace, TokenContext: GtTokenContext, LeftTree: GtSyntaxTree, Pattern: GtSyntaxPattern): GtSyntaxTree {
		var ClassDeclTree: GtSyntaxTree = new GtSyntaxTree(Pattern, NameSpace, TokenContext.GetToken(), null);
		//  "class" $Symbol$ ["extends" $Type$] //
		TokenContext.MatchToken("class");
		var ClassNameTree: GtSyntaxTree = TokenContext.ParsePattern(NameSpace, "$Symbol$", Required);
		ClassDeclTree.SetSyntaxTreeAt(ClassNameOffset, ClassNameTree);
		if(TokenContext.MatchToken("extends")) {
			ClassDeclTree.SetMatchedPatternAt(ClassParentNameOffset, NameSpace, TokenContext, "$Type$", Required);
		}

		//  define new class //
		var ClassName: string = ClassNameTree.KeyToken.ParsedText;
		var SuperClassTree: GtSyntaxTree = ClassDeclTree.GetSyntaxTreeAt(ClassParentNameOffset);
		var SuperType: GtType = NameSpace.Context.StructType;
		if(SuperClassTree != null) {
			SuperType = SuperClassTree.GetParsedType();
		}
		var ClassFlag: number = 0; // Gamma.Generator.ParseMethodFlag(0, ParsedTree); //
		var NewType: GtType = SuperType.CreateSubType(ClassFlag, ClassName, null, null);
		var DefaultObject: GreenTeaTopObject = new GreenTeaTopObject(NewType);
		NewType.DefaultNullValue = DefaultObject;

		NameSpace.DefineClassSymbol(NewType);
		ClassDeclTree.ConstValue = NewType;

		var ParseFlag: number = TokenContext.SetBackTrack(false) | SkipIndentParseFlag;
		TokenContext.ParseFlag = ParseFlag;
		if(TokenContext.MatchToken("{")) {
			var i: number = ClassBlockOffset;
			while(!ClassDeclTree.IsEmptyOrError() && !TokenContext.MatchToken("}")) {
				var FuncDecl: GtSyntaxTree = TokenContext.ParsePattern(NameSpace, "$FuncDecl$", Optional);
				if(FuncDecl != null) {
					ClassDeclTree.SetSyntaxTreeAt(i, FuncDecl);
					TokenContext.MatchToken(";");
					i = i + 1;
				}
				var VarDecl: GtSyntaxTree = TokenContext.ParsePattern(NameSpace, "$VarDecl$", Optional);
				if(VarDecl != null) {
					ClassDeclTree.SetSyntaxTreeAt(i, VarDecl);
					TokenContext.MatchToken(";");
					i = i + 1;
				}
				var InitDecl: GtSyntaxTree = TokenContext.ParsePatternAfter(NameSpace, ClassNameTree, "constructor", Optional);
				if(InitDecl != null) {
					ClassDeclTree.SetSyntaxTreeAt(i, InitDecl);
					if(InitDecl.HasNodeAt(FuncDeclBlock)) {
						var FuncBody: GtSyntaxTree = InitDecl.GetSyntaxTreeAt(FuncDeclBlock);
						var TailTree: GtSyntaxTree = FuncBody;
						while(TailTree.NextTree != null) {
							TailTree = TailTree.NextTree;
						}
						var ThisTree: GtSyntaxTree = new GtSyntaxTree(NameSpace.GetPattern("$Variable$"), NameSpace, new GtToken("this", 0), null);
						var ReturnTree: GtSyntaxTree = new GtSyntaxTree(NameSpace.GetPattern("return"), NameSpace, new GtToken("return", 0), null);
						ReturnTree.SetSyntaxTreeAt(ReturnExpr, ThisTree);
						LinkTree(TailTree, ReturnTree);

					}
					i = i + 1;
				}
			}
		}
		TokenContext.ParseFlag = ParseFlag;
		return ClassDeclTree;
	}

	public static TypeClassDecl(Gamma: GtTypeEnv, ParsedTree: GtSyntaxTree, ContextType: GtType): GtNode {
		var ClassNameTree: GtSyntaxTree = ParsedTree.GetSyntaxTreeAt(ClassNameOffset);
		var NewType: GtType = ParsedTree.GetParsedType();
		var FieldOffset: number = ClassBlockOffset;
		Gamma = new GtTypeEnv(ParsedTree.NameSpace);  // of: newenvironment: creation: type //
		Gamma.AppendDeclaredVariable(NewType, "this");
		ClassNameTree.ConstValue = NewType;

		while(FieldOffset < ParsedTree.TreeList.size()) {
			var FieldTree: GtSyntaxTree = ParsedTree.GetSyntaxTreeAt(FieldOffset);
			if(FieldTree.Pattern.PatternName.equals("$VarDecl$")) {
				var FieldNode: GtNode = ParsedTree.TypeCheckNodeAt(FieldOffset, Gamma, Gamma.AnyType, DefaultTypeCheckPolicy);
				if(FieldNode.IsError()) {
					return FieldNode;
				}
				var FieldName: string = FieldTree.GetSyntaxTreeAt(VarDeclName).KeyToken.ParsedText;
				var FieldInfo: GtVariableInfo = Gamma.LookupDeclaredVariable(FieldName);
				Gamma.Generator.DefineClassField(Gamma.NameSpace, NewType, FieldInfo);
			}
			else if(FieldTree.Pattern.PatternName.equals("$FuncDecl$")) {
				var ReturnTree: GtSyntaxTree = FieldTree.GetSyntaxTreeAt(FuncDeclReturnType);
				var NewTreeList: Array<GtSyntaxTree> = new Array<GtSyntaxTree>();
				var i: number = 0;
				while(i < FieldTree.TreeList.size() + 3) {
					NewTreeList.add(null);
					i = i + 1;
				}
				NewTreeList.set(FuncDeclReturnType, ReturnTree);
				NewTreeList.set(FuncDeclClass, ClassNameTree);
				NewTreeList.set(FuncDeclName, FieldTree.GetSyntaxTreeAt(FuncDeclName));
				NewTreeList.set(FuncDeclBlock, FieldTree.GetSyntaxTreeAt(FuncDeclBlock));
				var ParamBase: number = FuncDeclParam;
				NewTreeList.set(ParamBase + 0, ClassNameTree);
				NewTreeList.set(ParamBase + 1, new GtSyntaxTree(Gamma.NameSpace.GetPattern("$Variable$"), Gamma.NameSpace, new GtToken("this", 0), null));
				if(ParamBase + 2 < NewTreeList.size()) {
					NewTreeList.set(ParamBase + 2, null);
				}
				while(ParamBase < FieldTree.TreeList.size()) {
					NewTreeList.set(ParamBase + 3, FieldTree.GetSyntaxTreeAt(ParamBase + 0));
					NewTreeList.set(ParamBase + 4, FieldTree.GetSyntaxTreeAt(ParamBase + 1));
					if(ParamBase + 5 < FieldTree.TreeList.size()) {
						NewTreeList.set(ParamBase + 5, FieldTree.GetSyntaxTreeAt(ParamBase + 2));
					}
					ParamBase += 3;
				}
				FieldTree.TreeList = NewTreeList;
				Gamma.TypeCheck(FieldTree, Gamma.AnyType, DefaultTypeCheckPolicy);
			}
			else if(FieldTree.Pattern.PatternName.equals("constructor")) {
				FieldTree.Pattern = Gamma.NameSpace.GetPattern("$FuncDecl$");
				FieldTree.GetSyntaxTreeAt(FuncDeclName).ConstValue = "constructor";
				Gamma.TypeCheck(FieldTree, NewType, DefaultTypeCheckPolicy);
			}

			FieldOffset += 1;
		}
		Gamma.Generator.GenerateClassField(NewType);
		return Gamma.Generator.CreateConstNode(ParsedTree.NameSpace.Context.TypeType, ParsedTree, NewType);
	}

	//  constructor //
	public static ParseConstructor(NameSpace: GtNameSpace, TokenContext: GtTokenContext, LeftTree: GtSyntaxTree, Pattern: GtSyntaxPattern): GtSyntaxTree {
		LangDeps.Assert(LeftTree != null);
		var Tree: GtSyntaxTree = new GtSyntaxTree(Pattern, NameSpace, TokenContext.GetToken(), null);
		Tree.SetSyntaxTreeAt(FuncDeclReturnType, LeftTree);
		Tree.SetMatchedTokenAt(FuncDeclName, NameSpace, TokenContext, "constructor", Required);
		if(!Tree.HasNodeAt(FuncDeclName)) {
			return null;
		}
		if(TokenContext.MatchToken("(")) {
			var ParseFlag: number = TokenContext.SetBackTrack(false);  //  disabled //
			var ParamBase: number = FuncDeclParam + 3;
			Tree.SetSyntaxTreeAt(FuncDeclParam + 0, LeftTree);
			Tree.SetSyntaxTreeAt(FuncDeclParam + 1, new GtSyntaxTree(NameSpace.GetPattern("$Variable$"), NameSpace, new GtToken("this", 0), null));
			while(!Tree.IsEmptyOrError() && !TokenContext.MatchToken(")")) {
				if(ParamBase != FuncDeclParam + 3) {
					Tree.SetMatchedTokenAt(NoWhere, NameSpace, TokenContext, ",", Required);
				}
				Tree.SetMatchedPatternAt(ParamBase + VarDeclType, NameSpace, TokenContext, "$Type$", Required);
				Tree.SetMatchedPatternAt(ParamBase + VarDeclName, NameSpace, TokenContext, "$Variable$", Required);
				if(TokenContext.MatchToken("=")) {
					Tree.SetMatchedPatternAt(ParamBase + VarDeclValue, NameSpace, TokenContext, "$Expression$", Required);
				}
				ParamBase += 3;
			}
			TokenContext.SkipIndent();
			Tree.SetMatchedPatternAt(FuncDeclBlock, NameSpace, TokenContext, "$Block$", Optional);
			TokenContext.ParseFlag = ParseFlag;
			return Tree;
		}
		return null;
	}

	// grammar: shell //
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
			var ch: number = LangDeps.CharAt(SourceText, pos);
			//  a-zA-Z0-9_- //
			if(LangDeps.IsLetter(ch)) {
			}
			else if(LangDeps.IsDigit(ch)) {
			}
			else if(ch == 95/*$1*/) {
			}
			else if(ShellMode && (ch == 45/*$1*/ || ch == 47/*$1*/)) {
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
			if(Symbol.startsWith("// ")) { // One-Comment: Line //
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
				//  FIXME //
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
				if(CNode.ConstValue instanceof String) {
					var Val: string = <string> CNode.ConstValue;
					if(Val.equals("|")) {
						console.log("DEBUG: " + "PIPE");
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
		// Constants: Define //
		NameSpace.DefineSymbol("true", true);
		NameSpace.DefineSymbol("false", false);
		NameSpace.DefineSymbol("null", null);

		NameSpace.DefineTokenFunc(" \t", DScriptGrammar.WhiteSpaceToken);
		NameSpace.DefineTokenFunc("\n",  DScriptGrammar.IndentToken);
		NameSpace.DefineTokenFunc("(){}[]<>.,:;+-*/%=&|!@", DScriptGrammar.OperatorToken);
		NameSpace.DefineTokenFunc("/", DScriptGrammar.CommentToken);  //  overloading //
		NameSpace.DefineTokenFunc("Aa", DScriptGrammar.SymbolToken);
		NameSpace.DefineTokenFunc("Aa-/", DScriptGrammar.SymbolShellToken); //  overloading //

		NameSpace.DefineTokenFunc("\"", DScriptGrammar.StringLiteralToken);
		NameSpace.DefineTokenFunc("\"", DScriptGrammar.StringLiteralToken_StringInterpolation);
		NameSpace.DefineTokenFunc("1",  DScriptGrammar.NumberLiteralToken);

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
		// NameSpace.DefineExtendedPattern("!==", BinaryOperator | Precedence_CStyleEquals, DScriptGrammar.ParseBinary, DScriptGrammar.TypeBinary); //

		NameSpace.DefineExtendedPattern("=", BinaryOperator | Precedence_CStyleAssign | LeftJoin, DScriptGrammar.ParseBinary, DScriptGrammar.TypeAssign);
		NameSpace.DefineExtendedPattern("&&", BinaryOperator | Precedence_CStyleAND, DScriptGrammar.ParseBinary, DScriptGrammar.TypeAnd);
		NameSpace.DefineExtendedPattern("||", BinaryOperator | Precedence_CStyleOR, DScriptGrammar.ParseBinary, DScriptGrammar.TypeOr);

		NameSpace.DefineSyntaxPattern("$Empty$", DScriptGrammar.ParseEmpty, DScriptGrammar.TypeEmpty);

		NameSpace.DefineSyntaxPattern("$Symbol$", DScriptGrammar.ParseSymbol, null);
		NameSpace.DefineSyntaxPattern("$Type$", DScriptGrammar.ParseType, DScriptGrammar.TypeConst);
		NameSpace.DefineSyntaxPattern("$Variable$", DScriptGrammar.ParseVariable, DScriptGrammar.TypeVariable);
		NameSpace.DefineSyntaxPattern("$Const$", DScriptGrammar.ParseConst, DScriptGrammar.TypeConst);
		NameSpace.DefineSyntaxPattern("$StringLiteral$", DScriptGrammar.ParseStringLiteral, DScriptGrammar.TypeConst);
		NameSpace.DefineSyntaxPattern("$IntegerLiteral$", DScriptGrammar.ParseIntegerLiteral, DScriptGrammar.TypeConst);

		NameSpace.DefineSyntaxPattern("$ShellExpression$", DScriptGrammar.ParseShell, DScriptGrammar.TypeShell);

		NameSpace.DefineSyntaxPattern("(", DScriptGrammar.ParseGroup, DScriptGrammar.TypeGroup);
		NameSpace.DefineExtendedPattern(".", 0, DScriptGrammar.ParseGetter, DScriptGrammar.TypeGetter);
		NameSpace.DefineExtendedPattern("(", 0, DScriptGrammar.ParseApply, DScriptGrammar.TypeApply);
		// future: NameSpace.DefineExtendedPattern("[", 0, DScriptGrammar.ParseIndexer, DScriptGrammar.TypeIndexer); //

		NameSpace.DefineSyntaxPattern("$Block$", DScriptGrammar.ParseBlock, DScriptGrammar.TypeBlock);
		NameSpace.DefineSyntaxPattern("$Statement$", DScriptGrammar.ParseStatement, DScriptGrammar.TypeBlock);
		NameSpace.DefineSyntaxPattern("$Expression$", DScriptGrammar.ParseExpression, DScriptGrammar.TypeBlock);

		NameSpace.DefineSyntaxPattern("$FuncName$", DScriptGrammar.ParseFuncName, DScriptGrammar.TypeConst);
		NameSpace.DefineSyntaxPattern("$FuncDecl$", DScriptGrammar.ParseFuncDecl, DScriptGrammar.TypeFuncDecl);
		NameSpace.DefineSyntaxPattern("$VarDecl$",  DScriptGrammar.ParseVarDecl, DScriptGrammar.TypeVarDecl);

		NameSpace.DefineSyntaxPattern("if", DScriptGrammar.ParseIf, DScriptGrammar.TypeIf);
		NameSpace.DefineSyntaxPattern("while", DScriptGrammar.ParseWhile, DScriptGrammar.TypeWhile);
		NameSpace.DefineSyntaxPattern("continue", DScriptGrammar.ParseContinue, DScriptGrammar.TypeContinue);
		NameSpace.DefineSyntaxPattern("break", DScriptGrammar.ParseBreak, DScriptGrammar.TypeBreak);
		NameSpace.DefineSyntaxPattern("return", DScriptGrammar.ParseReturn, DScriptGrammar.TypeReturn);
		NameSpace.DefineSyntaxPattern("const", DScriptGrammar.ParseConstDecl, DScriptGrammar.TypeConstDecl);
		NameSpace.DefineSyntaxPattern("class", DScriptGrammar.ParseClassDecl, DScriptGrammar.TypeClassDecl);
		NameSpace.DefineSyntaxPattern("constructor", DScriptGrammar.ParseConstructor, DScriptGrammar.TypeFuncDecl);
		NameSpace.DefineSyntaxPattern("try", DScriptGrammar.ParseTry, DScriptGrammar.TypeTry);
		NameSpace.DefineSyntaxPattern("throw", DScriptGrammar.ParseThrow, DScriptGrammar.TypeThrow);
		NameSpace.DefineSyntaxPattern("new", DScriptGrammar.ParseNew, DScriptGrammar.TypeNew);
	}
}

 class GtStat {
	public MatchCount: number;
	public BacktrackCount: number;  // count: Tomany: howbacktracks: happen: times. //

	 constructor() {
		this.MatchCount     = 0;
		this.BacktrackCount = 0;
	}
}

 class GtClassContext {
	public   Generator: GtGenerator;
	public   RootNameSpace: GtNameSpace;
	public TopLevelNameSpace: GtNameSpace;

	//  basic class //
	public  VoidType: GtType;
// 	public  ObjectType: GtType; //
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
	public   ClassNameMap: GtMap;
	public   UniqueMethodMap: GtMap;

	public ClassCount: number;
	public MethodCount: number;
	public  Stat: GtStat;
	public ReportedErrorList: Array<string>;

	 constructor(Grammar: GtGrammar, Generator: GtGenerator) {
		this.Generator    = Generator;
		this.Generator.Context = this;
		this.SourceMap = new GtMap();
		this.ClassNameMap = new GtMap();
		this.UniqueMethodMap = new GtMap();
		this.RootNameSpace = new GtNameSpace(this, null);
		this.ClassCount = 0;
		this.MethodCount = 0;
		this.Stat = new GtStat();

		this.TopType     = new GtType(this, 0, "top", null, null);               //   unregistered //
		this.StructType  = this.TopType.CreateSubType(0, "record", null, null);  //   unregistered //
		this.EnumType    = this.TopType.CreateSubType(EnumClass, "enum", null, null);    //   unregistered //

		this.VoidType    = this.RootNameSpace.DefineClassSymbol(new GtType(this, NativeClass, "void", null, null));
		this.BooleanType = this.RootNameSpace.DefineClassSymbol(new GtType(this, NativeClass, "boolean", false, Boolean));
		this.IntType     = this.RootNameSpace.DefineClassSymbol(new GtType(this, NativeClass, "int", 0, Number));
		this.StringType  = this.RootNameSpace.DefineClassSymbol(new GtType(this, NativeClass, "string", "", String));
		this.VarType     = this.RootNameSpace.DefineClassSymbol(new GtType(this, 0, "var", null, null));
		this.AnyType     = this.RootNameSpace.DefineClassSymbol(new GtType(this, DynamicClass, "any", null, null));
		this.TypeType    = this.RootNameSpace.DefineClassSymbol(this.TopType.CreateSubType(0, "Type", null, null));
		this.ArrayType   = this.RootNameSpace.DefineClassSymbol(this.TopType.CreateSubType(0, "Array", null, null));
		this.FuncType    = this.RootNameSpace.DefineClassSymbol(this.TopType.CreateSubType(0, "Func", null, null));

		this.ArrayType.Types = new Array<GtType>(1);
		this.ArrayType.Types[0] = this.AnyType;
		this.FuncType.Types = new Array<GtType>(1);
		this.FuncType.Types[0] = this.AnyType;

		Grammar.LoadTo(this.RootNameSpace);
		this.TopLevelNameSpace = new GtNameSpace(this, this.RootNameSpace);
		this.Generator.SetLanguageContext(this);
		this.ReportedErrorList = new Array<string>();
	}

	public LoadGrammar(Grammar: GtGrammar): void {
		Grammar.LoadTo(this.TopLevelNameSpace);
	}

// 	public Define(Symbol: string, Value: Object): void { //
// 		this.RootNameSpace.DefineSymbol(Symbol, Value); //
// 	} //

	public Eval(ScriptSource: string, FileLine: number): Object {
		var resultValue: Object = null;
		console.log("DEBUG: " + "Eval: " + ScriptSource);
		var TokenContext: GtTokenContext = new GtTokenContext(this.TopLevelNameSpace, ScriptSource, FileLine);
		TokenContext.SkipEmptyStatement();
		while(TokenContext.HasNext()) {
			var annotation: GtMap = TokenContext.SkipAndGetAnnotation(true);
			var topLevelTree: GtSyntaxTree = ParseExpression(this.TopLevelNameSpace, TokenContext);
			topLevelTree.SetAnnotation(annotation);
			console.log("DEBUG: " + "untyped tree: " + topLevelTree);
			var gamma: GtTypeEnv = new GtTypeEnv(this.TopLevelNameSpace);
			var node: GtNode = gamma.TypeCheckEachNode(topLevelTree, gamma.VoidType, DefaultTypeCheckPolicy);
			resultValue = this.Generator.Eval(node);
			TokenContext.SkipEmptyStatement();
			TokenContext.Vacume();
		}
		return resultValue;
	}

	public  GuessType(Value: Object): GtType {
		if(Value instanceof GtMethod) {
			return (<GtMethod>Value).GetFuncType();
		}
		else if(Value instanceof GreenTeaTopObject) {
			return (<GreenTeaTopObject>Value).GreenType;
		}
		else {
			return this.Generator.GetNativeType(Value);
		}
	}

	public  CheckSubType(SubType: GtType, SuperType: GtType): boolean {
		//  TODO:Typing: database: Structual //
		return false;
	}

	public GetGenericType(BaseType: GtType, BaseIdx: number, TypeList: Array<GtType>, IsCreation: boolean): GtType {
		LangDeps.Assert(BaseType.IsGenericType());
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

	public  CheckExportableName(Method: GtMethod): boolean {
// 		if(Method.Is(ExportMethod)) { //
// 			var Value: Object = this.UniqueMethodMap.get(Method.MethodName); //
// 			if(Value == null) { //
// 				this.UniqueMethodMap.put(Method.MethodName, Method); //
// 				return true; //
// 			} //
// 			return false; //
// 		} //
		return true;
	}

	/* getter */
	private GetterName(BaseType: GtType, Name: string): string {
		return BaseType.GetSignature() + "@" + Name;
	}

	public DefineGetterMethod(Method: GtMethod): void {
		var Key: string = this.GetterName(Method.GetRecvType(), Method.MethodName);
		if(this.UniqueMethodMap.get(Key) == null) {
			this.UniqueMethodMap.put(Key, Method);
		}
	}

	public GetGetterMethod(BaseType: GtType, Name: string, RecursiveSearch: boolean): GtMethod {
		while(BaseType != null) {
			var Key: string = this.GetterName(BaseType, Name);
			var Method: Object = this.UniqueMethodMap.get(Key);
			if(Method != null) {
				return <GtMethod>Method;
			}
			if(!RecursiveSearch) {
				break;
			}
			BaseType = BaseType.SearchSuperMethodClass;
		}
		return null;
	}

	/* methods */
	private SetUniqueMethod(Key: string, Method: GtMethod): void {
		var Value: Object = this.UniqueMethodMap.get(Key);
		if(Value == null) {
			this.UniqueMethodMap.put(Key, Method);
		}
		else if(Value instanceof GtMethod) {
			this.UniqueMethodMap.put(Key, Key);  // unique: not !! //
		}
	}

	private AddOverloadedMethod(Key: string, Method: GtMethod): void {
		var Value: Object = this.UniqueMethodMap.get(Key);
		if(Value instanceof GtMethod) {
			Method.ListedMethods = <GtMethod>Value;
		}
		this.UniqueMethodMap.put(Key, Method);  // unique: not !! //
	}

	private  FuncNameParamSize(Name: string, ParamSize: number): string {
		return Name + "@" + ParamSize;
	}

	private MethodNameParamSize(BaseType: GtType, Name: string, ParamSize: number): string {
		return BaseType.GetSignature() + ":" + Name + "@" + ParamSize;
	}

	public DefineMethod(Method: GtMethod): void {
		var MethodName: string = Method.MethodName;
		this.SetUniqueMethod(MethodName, Method);
		var Key: string = this.FuncNameParamSize(MethodName, (Method.Types.length - 1));
		this.SetUniqueMethod(Key, Method);
		var RecvType: GtType = Method.GetRecvType();
		Key = this.MethodNameParamSize(RecvType, MethodName, (Method.Types.length - 2));
		this.SetUniqueMethod(Key, Method);
		this.AddOverloadedMethod(Key, Method);
		this.SetUniqueMethod(Method.MangledName, Method);
	}

	public GetUniqueFunctionName(Name: string): GtMethod {
		var Value: Object = this.UniqueMethodMap.get(Name);
		if(Value != null && Value instanceof GtMethod) {
			return <GtMethod>Value;
		}
		return null;
	}

	public GetUniqueFunction(Name: string, FuncParamSize: number): GtMethod {
		var Value: Object = this.UniqueMethodMap.get(this.FuncNameParamSize(Name, FuncParamSize));
		if(Value != null && Value instanceof GtMethod) {
			return <GtMethod>Value;
		}
		return null;
	}

	public  GetGreenListedMethod(BaseType: GtType, MethodName: string, MethodParamSize: number, RecursiveSearch: boolean): GtMethod {
		while(BaseType != null) {
			var Value: Object = this.UniqueMethodMap.get(this.MethodNameParamSize(BaseType, MethodName, MethodParamSize));
			if(Value instanceof GtMethod) {
				return <GtMethod>Value;
			}
			if(!RecursiveSearch) {
				break;
			}
			BaseType = BaseType.SearchSuperMethodClass;
		}
		return null;
	}

	public  GetListedMethod(BaseType: GtType, MethodName: string, MethodParamSize: number, RecursiveSearch: boolean): GtMethod {
		var Method: GtMethod = this.GetGreenListedMethod(BaseType, MethodName, MethodParamSize, RecursiveSearch);
		if(Method == null && BaseType.IsNative() && this.Generator.TransformNativeMethods(BaseType, MethodName)) {
			Method = this.GetGreenListedMethod(BaseType, MethodName, MethodParamSize, RecursiveSearch);
		}
		return Method;
	}

	public  GetGreenMethod(BaseType: GtType, Name: string, BaseIndex: number, TypeList: Array<GtType>, RecursiveSearch: boolean): GtMethod {
		while(BaseType != null) {
			var Key: string = MangleMethodName(BaseType, Name, BaseIndex, TypeList);
			var Value: Object = this.UniqueMethodMap.get(Key);
			if(Value instanceof GtMethod) {
				return <GtMethod>Value;
			}
			if(!RecursiveSearch) {
				break;
			}
			BaseType = BaseType.SearchSuperMethodClass;
		}
		return null;
	}

	public  GetMethod(BaseType: GtType, Name: string, BaseIndex: number, TypeList: Array<GtType>, RecursiveSearch: boolean): GtMethod {
		var Method: GtMethod = this.GetGreenMethod(BaseType, Name, BaseIndex, TypeList, RecursiveSearch);
		if(Method == null && BaseType.IsNative() && this.Generator.TransformNativeMethods(BaseType, Name)) {
			Method = this.GetGreenMethod(BaseType, Name, BaseIndex, TypeList, RecursiveSearch);
		}
		return Method;
	}

	/* convertor, wrapper */
	private  ConverterName(FromType: GtType, ToType: GtType): string {
		return FromType.GetSignature() + ">" + ToType.GetSignature();
	}

	private  WrapperName(FromType: GtType, ToType: GtType): string {
		return FromType.GetSignature() + "<" + ToType.GetSignature();
	}

	public GetConverterMethod(FromType: GtType, ToType: GtType, RecursiveSearch: boolean): GtMethod {
		var Key: string = this.ConverterName(FromType, ToType);
		var Method: Object = this.UniqueMethodMap.get(Key);
		if(Method != null) {
			return <GtMethod>Method;
		}
		if(RecursiveSearch && FromType.SearchSuperMethodClass != null) {
			return this.GetConverterMethod(FromType.SearchSuperMethodClass, ToType, RecursiveSearch);
		}
		return null;
	}

	public GetWrapperMethod(FromType: GtType, ToType: GtType, RecursiveSearch: boolean): GtMethod {
		var Key: string = this.WrapperName(FromType, ToType);
		var Method: Object = this.UniqueMethodMap.get(Key);
		if(Method != null) {
			return <GtMethod>Method;
		}
		if(RecursiveSearch && FromType.SearchSuperMethodClass != null) {
			return this.GetWrapperMethod(FromType.SearchSuperMethodClass, ToType, RecursiveSearch);
		}
		return null;
	}

	public GetCastMethod(FromType: GtType, ToType: GtType, RecursiveSearch: boolean): GtMethod {
		var Key: string = this.WrapperName(FromType, ToType);
		var Method: Object = this.UniqueMethodMap.get(Key);
		if(Method != null) {
			return <GtMethod>Method;
		}
		Key = this.ConverterName(FromType, ToType);
		Method = this.UniqueMethodMap.get(Key);
		if(Method != null) {
			return <GtMethod>Method;
		}
		if(RecursiveSearch && FromType.SearchSuperMethodClass != null) {
			return this.GetCastMethod(FromType.SearchSuperMethodClass, ToType, RecursiveSearch);
		}
		return null;
	}

	public  DefineConverterMethod(Method: GtMethod): void {
		var Key: string = this.ConverterName(Method.GetRecvType(), Method.GetReturnType());
		this.UniqueMethodMap.put(Key, Method);
	}

	public  DefineWrapperMethod(Method: GtMethod): void {
		var Key: string = this.WrapperName(Method.GetRecvType(), Method.GetReturnType());
		this.UniqueMethodMap.put(Key, Method);
	}

	private  GetSourcePosition(FileLine: number): string {
		return "(eval:" + <number> FileLine + ")";  //  FIXME:SourceMap: USE //
	}

	public  ReportError(Level: number, Token: GtToken, Message: string): void {
		if(!Token.IsError()) {
			if(Level == ErrorLevel) {
				Message = "(error) " + this.GetSourcePosition(Token.FileLine) + " " + Message;
				Token.ToErrorToken(Message);
			}
			else if(Level == WarningLevel) {
				Message = "(warning) " + this.GetSourcePosition(Token.FileLine) + " " + Message;
			}
			else if(Level == InfoLevel) {
				Message = "(info) " + this.GetSourcePosition(Token.FileLine) + " " + Message;
			}
			this.ReportedErrorList.add(Message);
			// println(Message); //
		}
	}

	public  GetReportedErrors(): Array<string> {
		var List: Array<string> = this.ReportedErrorList;
		this.ReportedErrorList = new Array<string>();
		return List;
	}


}

class GreenTeaScript {
	public  static main(Args: string[]): void {
		var CodeGeneratorName: string = "--java";
		var Index: number = 0;
		var OneLiner: string = null;
		while(Index < Args.length) {
			var Argu: string = Args[Index];
			if(!Argu.startsWith("-")) {
				break;
			}
			Index += 1;
			if(Argu.startsWith("--")) {
				CodeGeneratorName = Argu;
				continue;
			}
			if(Argu.equals("-e") && Index < Args.length) {
				OneLiner = Args[Index];
				Index += 1;
				continue;
			}
			if(Argu.equals("-verbose")) {
				DebugPrintOption = true;
				continue;
			}
			LangDeps.Usage();
		}
		var Generator: GtGenerator = LangDeps.CodeGenerator(CodeGeneratorName);
		if(Generator == null) {
			LangDeps.Usage();
		}
		var Context: GtClassContext = new GtClassContext(new DScriptGrammar(), Generator);
		var ShellMode: boolean = true;
		if(OneLiner != null) {
			Context.Eval(OneLiner, 1);
			ShellMode = false;
		}
		while(Index < Args.length) {
			Context.Eval(LangDeps.LoadFile(Args[Index]), 1);
			ShellMode = false;
			Index += 1;
		}
		if(ShellMode) {
			var linenum: number = 1;
			var Line: string = null;
			while((Line = LangDeps.ReadLine(">>> ")) != null) {
				Context.Eval(Line, linenum);
				linenum += 1;
			}
		}
	}

}
