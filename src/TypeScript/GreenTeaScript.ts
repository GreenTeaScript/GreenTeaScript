/// <reference path="LangDeps.ts" />



	//  ClassFlag //
	var PrivateClass: number					= 1 << 0;
	var SingletonClass: number					= 1 << 1;
	var FinalClass: number						= 1 << 2;
	var GreenClass: number		    			= 1 << 3;
	var StaticClass: number						= 1 << 4;
	var ImmutableClass: number					= 1 << 5;
	var InterfaceClass: number					= 1 << 6;

	//  MethodFlag //
	var ExportMethod: number					= 1 << 0;
	var UniqueMethod: number					= 1 << 1;
	var OperatorMethod: number					= 1 << 2;
	var NativeMethod: number					= 1 << 3;

// 	var PrivateMethod: number					= 1 << 0; //
// 	var VirtualMethod: number					= 1 << 1; //
// 	var FinalMethod: number						= 1 << 2; //
// 	var ConstMethod: number						= 1 << 3; //
// 	var StaticMethod: number					= 1 << 4; //
//  //
// 	var ImmutableMethod: number					= 1 << 5; //
// 	var TopLevelMethod: number					= 1 << 6; //
//  //
// 	//var rule: call //
// 	var CoercionMethod: number					= 1 << 7; //
// 	var RestrictedMethod: number				= 1 << 8; //
// 	var UncheckedMethod: number					= 1 << 9; //
// 	var SmartReturnMethod: number				= 1 << 10; //
// 	var VariadicMethod: number					= 1 << 11; //
// 	var IterativeMethod: number					= 1 << 12; //
//  //
// 	// compatible //
// 	var UniversalMethod: number					= 1 << 13; //
//  //
// 	var UniqueMethod: number					= 1 << 14; /* used */ //
// 	var ExportMethod: number					= 1 << 15; /* used */ //
//  //
// 	// internal //
// 	var HiddenMethod: number					= 1 << 17; //
// 	var AbstractMethod: number					= 1 << 18; //
// 	var OverloadedMethod: number				= 1 << 19; //
// 	var Override: number						= 1 << 20; //
// 	var DynamicCall: number						= 1 << 22; //

	var SymbolMaskSize: number					= 3;
	var LowerSymbolMask: number					= 1;
	var GetterSymbolMask: number				= (1 << 1);
	var SetterSymbolMask: number				= (1 << 2);
	var MetaSymbolMask: number					= (GetterSymbolMask | SetterSymbolMask);
	var GetterPrefix: string					= "Get";
	var SetterPrefix: string					= "Set";
	var MetaPrefix: string						= "\\";

	var AllowNewId: number						= -1;
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
		/*stx: nulvar:eot: sohvar:ack: etxvar:bel: enq*/
		0, 1, 1, 1, 1, 1, 1, 1,
		/*nl: bsvar:np: htvar:so: vtvar:si: cr  */
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
	var SourceTokenFlag: number	= 1;
	var ErrorTokenFlag: number	= (1 << 1);
	var IndentTokenFlag: number	= (1 << 2);
	var WhiteSpaceTokenFlag: number	= (1 << 3);
	var DelimTokenFlag: number	= (1 << 4);

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

	//Call: Method; //
	var CallExpressionOffset: number	= 0;
	var CallParameterOffset: number		= 1;

	// var Decl: Method; //
	var FuncDeclReturnType: number	= 0;
	var FuncDeclClass: number		= 1;
	var FuncDeclName: number		= 2;
	var FuncDeclBlock: number		= 3;
	var FuncDeclParam: number		= 4;

	// var Decl: Class; //
	var ClassParentNameOffset: number	= 0;
	var ClassNameOffset: number			= 1;
	var ClassBlockOffset: number		= 2;

	//  spec //
	var TokenFuncSpec: number     = 0;
	var SymbolPatternSpec: number = 1;
	var ExtendedPatternSpec: number = 2;

	var BinaryOperator: number					= 1;
	var LeftJoin: number						= 1 << 1;
	var Parenthesis: number						= 1 << 2;
	var PrecedenceShift: number					= 3;
	var Precedence_CStyleValue: number			= (1 << PrecedenceShift);
	var Precedence_CPPStyleScope: number		= (50 << PrecedenceShift);
	var Precedence_CStyleSuffixCall: number		= (100 << PrecedenceShift);				/*x(); x[]; x.x: x->x: x++ */
	var Precedence_CStylePrefixOperator: number	= (200 << PrecedenceShift);				/*++x; --x;var x: sizeof &x +x -x !x (T)x  */
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
	var Precedence_Error: number				= (1700 << PrecedenceShift);
	var Precedence_Statement: number			= (1900 << PrecedenceShift);
	var Precedence_CStyleDelim: number			= (2000 << PrecedenceShift);

	var DefaultTypeCheckPolicy: number			= 0;
	var NoCheckPolicy: number                   = 1;
	var IgnoreEmptyPolicy: number               = (1 << 1);
	var AllowEmptyPolicy: number                = (1 << 2);
	var AllowVoidPolicy: number                 = (1 << 3);
	var AllowCoercionPolicy: number             = (1 << 4);

	var GlobalConstName: string					= "global";

	var SymbolList: Array<string> = new Array<string>();
	var SymbolMap: GtMap  = new GtMap();
	var MangleNameMap: GtMap = new GtMap();

	//  TestFlags (temporary) //
	var TestTokenizer: number = 1 << 0;
	var TestParseOnly: number = 1 << 1;
	var TestTypeChecker: number = 1 << 2;
	var TestCodeGeneration: number = 1 << 3;


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

	//  Symbol //
	function IsGetterSymbol(SymbolId: number): boolean {
		return IsFlag(SymbolId, GetterSymbolMask);
	}

	function IsSetterSymbol(SymbolId: number): boolean {
		return IsFlag(SymbolId, SetterSymbolMask);
	}

	function ToSetterSymbol(SymbolId: number): number {
		LangDeps.Assert(IsGetterSymbol(SymbolId));
		return (SymbolId & (~GetterSymbolMask)) | SetterSymbolMask;
	}

	function MaskSymbol(SymbolId: number, Mask: number): number {
		return (SymbolId << SymbolMaskSize) | Mask;
	}

	function UnmaskSymbol(SymbolId: number): number {
		return SymbolId >> SymbolMaskSize;
	}

	function StringfySymbol(SymbolId: number): string {
		var Key: string = SymbolList.get(UnmaskSymbol(SymbolId));
		if(IsFlag(SymbolId, GetterSymbolMask)) {
			return GetterPrefix + Key;
		}
		if(IsFlag(SymbolId, SetterSymbolMask)) {
			return SetterPrefix + Key;
		}
		if(IsFlag(SymbolId, MetaSymbolMask)) {
			return MetaPrefix + Key;
		}
		return Key;
	}

	function GetSymbolId(Symbol: string, DefaultSymbolId: number): number {
		var Key: string = Symbol;
		var Mask: number = 0;
		if(Symbol.length >= 3 && LangDeps.CharAt(Symbol, 1) == (101/*e*/) && LangDeps.CharAt(Symbol, 2) == (116/*t*/)) {
			if(LangDeps.CharAt(Symbol, 0) == (103/*g*/) && LangDeps.CharAt(Symbol, 0) == (71/*G*/)) {
				Key = Symbol.substring(3);
				Mask = GetterSymbolMask;
			}
			if(LangDeps.CharAt(Symbol, 0) == (115/*s*/) && LangDeps.CharAt(Symbol, 0) == (83/*S*/)) {
				Key = Symbol.substring(3);
				Mask = SetterSymbolMask;
			}
		}
		if(Symbol.startsWith("\\")) {
			Mask = MetaSymbolMask;
		}
		var SymbolObject: number = <number>SymbolMap.get(Key);
		if(SymbolObject == null) {
			if(DefaultSymbolId == AllowNewId) {
				var SymbolId: number = SymbolList.size();
				SymbolList.add(Key);
				SymbolMap.put(Key, SymbolId); // new number(SymbolId)); //
				return MaskSymbol(SymbolId, Mask);
			}
			return DefaultSymbolId;
		}
		return MaskSymbol(SymbolObject, Mask);
	}

	function CanonicalSymbol(Symbol: string): string {
		return Symbol.toLowerCase().replaceAll("_", "");
	}

	function GetCanonicalSymbolId(Symbol: string): number {
		return GetSymbolId(CanonicalSymbol(Symbol), AllowNewId);
	}

	function NumberToAscii(number: number): string {
		var num: number = number /26;
		var s: string = LangDeps.CharToString(<number>(65 + (number % 26)));
		if(num == 0) {
			return s;
		}
		else {
			return NumberToAscii(num) + s;
		}
	}

	function Mangle(BaseType: GtType, BaseIdx: number, TypeList: Array<GtType>): string {
		var s: string = NumberToAscii(BaseType.ClassId);
		var i: number = BaseIdx;
		while(i < ListSize(TypeList)) {
			s = s + "." + NumberToAscii(TypeList.get(i).ClassId);
			i = i + 1;
		}
		var MangleName: string = <string>MangleNameMap.get(s);
		if(MangleName == null) {
			MangleName = NumberToAscii(MangleNameMap.size());
			MangleNameMap.put(s, MangleName);
		}
		return MangleName;
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

	function ApplySyntaxPattern(Pattern: GtSyntaxPattern, LeftTree: GtSyntaxTree, TokenContext: GtTokenContext): GtSyntaxTree {
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
			var ParsedTree: GtSyntaxTree = <GtSyntaxTree>LangDeps.ApplyMatchFunc(delegate, CurrentPattern, LeftTree, TokenContext);
			TokenContext.IndentLevel -= 1;
			if(ParsedTree != null && ParsedTree.IsEmpty()) ParsedTree = null;
			// console.log("DEBUG: " + "E :" + JoinStrings("  ", TokenContext.IndentLevel) + CurrentPattern + " => " + ParsedTree); //
			TokenContext.ParseFlag = ParseFlag;
			if(ParsedTree != null) {
				return ParsedTree;
			}
			CurrentPattern = CurrentPattern.ParentPattern;
		}
		if(TokenContext.IsAllowedTrackback()) {
			TokenContext.CurrentPosition = Pos;
		}
		if(Pattern == null) {
			console.log("DEBUG: " + "undefinedpattern: syntax: " + Pattern);
		}
		return TokenContext.ReportExpectedPattern(Pattern);
	}

	function ParseExpression(TokenContext: GtTokenContext): GtSyntaxTree {
		var Pattern: GtSyntaxPattern = TokenContext.GetFirstPattern();
		var LeftTree: GtSyntaxTree = ApplySyntaxPattern(Pattern, null, TokenContext);
		while(!IsEmptyOrError(LeftTree) && !TokenContext.MatchToken(";")) {
			var ExtendedPattern: GtSyntaxPattern = TokenContext.GetExtendedPattern();
			if(ExtendedPattern == null) {
				// console.log("DEBUG: " + "In $Expression$ ending: " + TokenContext.GetToken()); //
				break;
			}
			LeftTree = ApplySyntaxPattern(ExtendedPattern, LeftTree, TokenContext);
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

	function TestToken(Context: GtContext, Source: string, TokenText: string, TokenText2: string): void {
		var NameSpace: GtNameSpace = Context.DefaultNameSpace;
		var TokenContext: GtTokenContext = new GtTokenContext(NameSpace, Source, 1);
		LangDeps.Assert(TokenContext.MatchToken(TokenText) && TokenContext.MatchToken(TokenText2));
	}

	function TestSyntaxPattern(Context: GtContext, Text: string): void {
		var TestLevel: number = TestTypeChecker;
		var NameSpace: GtNameSpace = Context.DefaultNameSpace;
		var TokenContext: GtTokenContext = new GtTokenContext(NameSpace, Text, 1);
		var ParsedTree: GtSyntaxTree = ParseExpression(TokenContext);
		LangDeps.Assert(ParsedTree != null);
		if((TestLevel & TestTypeChecker) != TestTypeChecker) {
			return;
		}
		var Gamma: GtTypeEnv = new GtTypeEnv(NameSpace);
		var TNode: GtNode = Gamma.TypeCheck(ParsedTree, Gamma.AnyType, DefaultTypeCheckPolicy);
		console.log(TNode.toString());
		if((TestLevel & TestCodeGeneration) == TestCodeGeneration) {
		}
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
	static NullToken: GtToken = new GtToken("", 0);

	public NameSpace: GtNameSpace;
	public SourceList: Array<GtToken>;
	public CurrentPosition: number;
	public ParsingLine: number;
	public ParseFlag: number;
	public IndentLevel: number = 0;

	constructor(NameSpace: GtNameSpace, Text: string, FileLine: number) {
		this.NameSpace = NameSpace;
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
			Token.PresetPattern = this.NameSpace.GetPattern(PatternName);
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
		this.NameSpace.ReportError(Level, Token, Message);
	}

	public NewErrorSyntaxTree(Token: GtToken, Message: string): GtSyntaxTree {
		if(!this.IsAllowedTrackback()) {
			this.NameSpace.ReportError(ErrorLevel, Token, Message);
			var ErrorTree: GtSyntaxTree = new GtSyntaxTree(Token.PresetPattern, this.NameSpace, Token, null);
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
		if(!this.IsAllowedTrackback()) {
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
		var TokenFunc: TokenFunc = this.NameSpace.GetTokenFunc(GtChar);
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
		return this.NameSpace.GetPattern(PatternName);
	}

	public GetFirstPattern(): GtSyntaxPattern {
		var Token: GtToken = this.GetToken();
		if(Token.PresetPattern != null) {
			return Token.PresetPattern;
		}
		var Pattern: GtSyntaxPattern = this.NameSpace.GetPattern(Token.ParsedText);
		if(Pattern == null) {
			return this.NameSpace.GetPattern("$Symbol$");
		}
		return Pattern;
	}

	public GetExtendedPattern(): GtSyntaxPattern {
		var Token: GtToken = this.GetToken();
		var Pattern: GtSyntaxPattern = this.NameSpace.GetExtendedPattern(Token.ParsedText);
		return Pattern;
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

	 IsAllowedTrackback(): boolean {
		return IsFlag(this.ParseFlag, BackTrackParseFlag);
	}

	 SetTrackback(Allowed: boolean): number {
		var ParseFlag: number = this.ParseFlag;
		if(Allowed) {
			this.ParseFlag = this.ParseFlag | BackTrackParseFlag;
		}
		else {
			this.ParseFlag = (~(BackTrackParseFlag) & this.ParseFlag);
		}
		return ParseFlag;
	}

	 ParsePatternAfter(LeftTree: GtSyntaxTree, PatternName: string, IsOptional: boolean): GtSyntaxTree {
		var Pos: number = this.CurrentPosition;
		var ParseFlag: number = this.ParseFlag;
		var Pattern: GtSyntaxPattern = this.GetPattern(PatternName);
		if(IsOptional) {
			this.ParseFlag = this.ParseFlag | BackTrackParseFlag;
		}
		var SyntaxTree: GtSyntaxTree = ApplySyntaxPattern(Pattern, LeftTree, this);
		this.ParseFlag = ParseFlag;
		if(SyntaxTree != null) {
			return SyntaxTree;
		}
		this.CurrentPosition = Pos;
		return null;
	}

	 ParsePattern(PatternName: string, IsOptional: boolean): GtSyntaxTree {
		return this.ParsePatternAfter(null, PatternName, IsOptional);
	}

	 SkipAndGetAnnotation(IsAllowedDelim: boolean): GtMap {
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

	 SkipEmptyStatement(): boolean {
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
		return (!IsFlag(Right.SyntaxFlag, Parenthesis) && (left < right || (left == right && IsFlag(this.SyntaxFlag, LeftJoin) && IsFlag(Right.SyntaxFlag, LeftJoin))));
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
		return this.KeyToken == GtTokenContext.NullToken;
	}

	public ToEmpty(): void {
		this.KeyToken = GtTokenContext.NullToken;
		this.TreeList = null;
		this.Pattern = this.NameSpace.GetPattern("$Empty$");
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

	public SetMatchedPatternAt(Index: number, TokenContext: GtTokenContext, PatternName: string,  IsOptional: boolean): void {
		if(!this.IsEmptyOrError()) {
			var ParsedTree: GtSyntaxTree = TokenContext.ParsePattern(PatternName, IsOptional);
			if(PatternName.equals("$Expression$") && ParsedTree == null){
				ParsedTree = ParseExpression(TokenContext);
			}
			if(ParsedTree != null) {
				this.SetSyntaxTreeAt(Index, ParsedTree);
			}
			else if(ParsedTree == null && !IsOptional) {
				this.ToEmpty();
			}
		}
	}

	public SetMatchedTokenAt(Index: number, TokenContext: GtTokenContext, TokenText: string, IsOptional: boolean): void {
		if(!this.IsEmptyOrError()) {
			var Pos: number = TokenContext.CurrentPosition;
			var Token: GtToken = TokenContext.Next();
			if(Token.ParsedText.equals(TokenText)) {
				this.SetSyntaxTreeAt(Index, new GtSyntaxTree(null, TokenContext.NameSpace, Token, null));
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

	 TypeNodeAt(Index: number, Gamma: GtTypeEnv, Type: GtType, TypeCheckPolicy: number): GtNode {
		if(this.TreeList != null && Index < this.TreeList.size()) {
			var NodeObject: GtSyntaxTree = this.TreeList.get(Index);
			var TypedNode: GtNode = Gamma.TypeCheck(NodeObject, Type, TypeCheckPolicy);
			return TypedNode;
		}
		if(!IsFlag(TypeCheckPolicy, AllowEmptyPolicy) && !IsFlag(TypeCheckPolicy, IgnoreEmptyPolicy)) {
			Gamma.NameSpace.ReportError(ErrorLevel, this.KeyToken, this.KeyToken.ParsedText + "more: needsat: expression " + Index);
			return Gamma.Generator.CreateErrorNode(Type, this); //  TODO, "syntaxerror: tree: " + Index); //
		}
		return null;
	}
}

/* typing */

 class GtLayer {
	/*public*/Name: string;
	/*public*/MethodTable: GtMap;
	constructor(Name: string) {
		this.Name = Name;
		this.MethodTable = new GtMap();
	}

	 LookupUniqueMethod(Name: string): GtMethod {
		return <GtMethod>this.MethodTable.get(Name);
	}

	 GetMethod(MethodId: string): GtMethod {
		return <GtMethod>this.MethodTable.get(MethodId);
	}

	 DefineMethod(Method: GtMethod): void {
		LangDeps.Assert(Method.Layer == null);
		var Class: GtType = Method.GetRecvType();
		var MethodId: string = Class.GetMethodId(Method.MethodName);
		var MethodPrev: GtMethod = <GtMethod>this.MethodTable.get(MethodId);
		Method.ElderMethod = MethodPrev;
		Method.Layer = this;
		this.MethodTable.put(MethodId, Method);
		// MethodPrev = this.LookupUniqueMethod(Method.MethodName); //
		// if(MethodPrev != null) { //
		// 	TODO("identity: check"); //
		// 	this.MethodTable.remove(Id); //
		// } //
	}
}

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
	public NameSpace: GtNameSpace;
	public Generator: GtGenerator;

	public Method: GtMethod;
	public LocalStackList: Array<GtVariableInfo>;
	public StackTopIndex: number;

	/*convinient: forcut: short */
	 VoidType: GtType;
	 ObjectType: GtType;
	 BooleanType: GtType;
	 IntType: GtType;
	 StringType: GtType;
	 VarType: GtType;
	 AnyType: GtType;
	 ArrayType: GtType;
	 FuncType: GtType;

	constructor(NameSpace: GtNameSpace) {
		this.NameSpace = NameSpace;
		this.Generator = NameSpace.Context.Generator;
		this.Method = null;
		this.LocalStackList = new Array<GtVariableInfo>();
		this.StackTopIndex = 0;

		this.VoidType = NameSpace.Context.VoidType;
		this.ObjectType = NameSpace.Context.ObjectType;
		this.BooleanType = NameSpace.Context.BooleanType;
		this.IntType = NameSpace.Context.IntType;
		this.StringType = NameSpace.Context.StringType;
		this.VarType = NameSpace.Context.VarType;
		this.AnyType = NameSpace.Context.AnyType;
		this.ArrayType = NameSpace.Context.ArrayType;
		this.FuncType = NameSpace.Context.FuncType;
	}

	public SetMethod(Method: GtMethod): void {
		this.Method = Method;
	}

	 IsTopLevel(): boolean {
		return (this.Method == null);
	}

	public AppendDeclaredVariable(Type: GtType, Name: string): boolean {
		var VarInfo: GtVariableInfo = new GtVariableInfo(Type, Name, this.StackTopIndex);
		if(this.StackTopIndex < this.LocalStackList.size()) {
			this.LocalStackList.add(VarInfo);
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

	public GuessType(Value: Object): GtType {
		if(Value instanceof String) {
			return this.StringType;
		}
		else if(Value instanceof Number || Value instanceof Number) {
			return this.IntType;
		}
		else if(Value instanceof Boolean) {
			return this.BooleanType;
		}
		return this.AnyType;
	}

	 LookupFunction(Name: string): GtMethod {
		var Function: Object = this.NameSpace.GetSymbol(Name);
		if(Function instanceof GtMethod) {
			return <GtMethod>Function;
		}
		return null;
	}

	public DefaultValueConstNode(ParsedTree: GtSyntaxTree, Type: GtType): GtNode {
		if(Type.DefaultNullValue != null) {
			return this.Generator.CreateConstNode(Type, ParsedTree, Type.DefaultNullValue);
		}
		return this.CreateErrorNode(ParsedTree, "undefinedvalue: of: initial " + Type);
	}

	public CreateErrorNode(ParsedTree: GtSyntaxTree, Message: string): GtNode {
		this.NameSpace.ReportError(ErrorLevel, ParsedTree.KeyToken, Message);
		return this.Generator.CreateErrorNode(this.VoidType, ParsedTree);
	}

	public SupportedOnlyTopLevelError(ParsedTree: GtSyntaxTree): GtNode {
		return this.CreateErrorNode(ParsedTree, "supportedat: onlylevel: top " + ParsedTree.Pattern);
	}

	public UnsupportedTopLevelError(ParsedTree: GtSyntaxTree): GtNode {
		return this.CreateErrorNode(ParsedTree, "unsupportedtop: level: at " + ParsedTree.Pattern);
	}

	/* typing */
	public TypeEachNode(Tree: GtSyntaxTree, Type: GtType): GtNode {
		var Node: GtNode = ApplyTypeFunc(Tree.Pattern.TypeFunc, this, Tree, Type);
		if(Node == null) {
			Node = this.CreateErrorNode(Tree, "undefined type checker: " + Tree.Pattern);
		}
		return Node;
	}

	public TypeCheckEachNode(Tree: GtSyntaxTree, Type: GtType, TypeCheckPolicy: number): GtNode {
		var Node: GtNode = this.TypeEachNode(Tree, Type);
		if(Node.IsError()) {
			return Node;
		}
		return Node;
	}

	public TypeCheck(ParsedTree: GtSyntaxTree, Type: GtType, TypeCheckPolicy: number): GtNode {
		return this.TypeBlock(ParsedTree, Type);
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

	public AppendConstants(VariableName: string, ConstNode: GtNode): boolean {
		return this.NameSpace.AppendConstants(VariableName, ConstNode);
	}
}

//  NameSpace //

 class GtSpec {
	public SpecType: number;
	public SpecKey: string;
	public SpecBody: Object;

	constructor(SpecType: number, SpecKey: string, SpecBody: Object) {
		this.SpecType = SpecType;
		this.SpecKey  = SpecKey;
		this.SpecBody = SpecBody;
	}
}

 class GtNameSpace {
	public Context: GtContext;
	public PackageName: string;
	public ParentNameSpace: GtNameSpace;
	public ImportedNameSpaceList: Array<GtNameSpace>;
	public PublicSpecList: Array<GtSpec>;
	public PrivateSpecList: Array<GtSpec>;

	TokenMatrix: TokenFunc[];
	SymbolPatternTable: GtMap;
	ExtendedPatternTable: GtMap;
	public  LayerList: Array<GtLayer>;
	TopLevelLayer: GtLayer;
	ConstantTable: GtMap;

	constructor(Context: GtContext, ParentNameSpace: GtNameSpace) {
		this.Context = Context;
		this.ParentNameSpace = ParentNameSpace;
		this.LayerList = new Array<GtLayer>();
		if(ParentNameSpace != null) {
			this.PackageName = ParentNameSpace.PackageName;
			this.TopLevelLayer = ParentNameSpace.TopLevelLayer;
		}
		else {
			this.TopLevelLayer = Context.UserDefinedLayer;
		}
		this.LayerList.add(Context.GreenLayer);
		this.LayerList.add(this.TopLevelLayer);
		this.ImportedNameSpaceList = null;
		this.PublicSpecList = new Array<GtSpec>();
		this.PrivateSpecList = null;
		this.ConstantTable = null;
		this.TokenMatrix = null;
		this.SymbolPatternTable = null;
		this.ExtendedPatternTable = null;
	}

	private RemakeTokenMatrixEach(NameSpace: GtNameSpace): void {
		var i: number = 0;
		while(i < ListSize(NameSpace.PublicSpecList)) {
			var Spec: GtSpec = NameSpace.PublicSpecList.get(i);
			if(Spec.SpecType == TokenFuncSpec) {
				var j: number = 0;
				while(j < Spec.SpecKey.length) {
					var kchar: number = AsciiToTokenMatrixIndex(LangDeps.CharAt(Spec.SpecKey, j));
					var Func: any = <any>Spec.SpecBody;
					this.TokenMatrix[kchar] = LangDeps.CreateOrReuseTokenFunc(Func, this.TokenMatrix[kchar]);
					j += 1;
				}
			}
			i += 1;
		}
	}

	private RemakeTokenMatrix(NameSpace: GtNameSpace): void {
		if(NameSpace.ParentNameSpace != null) {
			this.RemakeTokenMatrix(NameSpace.ParentNameSpace);
		}
		this.RemakeTokenMatrixEach(NameSpace);
		var i: number = 0;
		while(i < ListSize(NameSpace.ImportedNameSpaceList)) {
			var Imported: GtNameSpace = NameSpace.ImportedNameSpaceList.get(i);
			this.RemakeTokenMatrixEach(Imported);
			i += 1;
		}
	}

	public GetTokenFunc(GtChar2: number): TokenFunc {
		if(this.TokenMatrix == null) {
			this.TokenMatrix = new Array<TokenFunc>(MaxSizeOfChars);
			this.RemakeTokenMatrix(this);
		}
		return this.TokenMatrix[GtChar2];
	}

	public DefineTokenFunc(keys: string, f: any): void {
		this.PublicSpecList.add(new GtSpec(TokenFuncSpec, keys, f));
		this.TokenMatrix = null;
	}

	private TableAddSpec(Table: GtMap, Spec: GtSpec): void {
		var Body: Object = Spec.SpecBody;
		if(Body instanceof GtSyntaxPattern) {
			var Parent: Object = Table.get(Spec.SpecKey);
			if(Parent instanceof GtSyntaxPattern) {
				Body = MergeSyntaxPattern(<GtSyntaxPattern>Body, <GtSyntaxPattern>Parent);
			}
		}
		Table.put(Spec.SpecKey, Body);
	}

	private RemakeSymbolTableEach(NameSpace: GtNameSpace, SpecList: Array<GtSpec>): void {
		var i: number = 0;
		while(i < ListSize(SpecList)) {
			var Spec: GtSpec = SpecList.get(i);
			if(Spec.SpecType == SymbolPatternSpec) {
				this.TableAddSpec(this.SymbolPatternTable, Spec);
			}
			else if(Spec.SpecType == ExtendedPatternSpec) {
				this.TableAddSpec(this.ExtendedPatternTable, Spec);
			}
			i += 1;
		}
	}

	private RemakeSymbolTable(NameSpace: GtNameSpace): void {
		if(NameSpace.ParentNameSpace != null) {
			this.RemakeSymbolTable(NameSpace.ParentNameSpace);
		}
		this.RemakeSymbolTableEach(NameSpace, NameSpace.PublicSpecList);
		this.RemakeSymbolTableEach(NameSpace, NameSpace.PrivateSpecList);
		var i: number = 0;
		while(i < ListSize(NameSpace.ImportedNameSpaceList)) {
			var Imported: GtNameSpace = NameSpace.ImportedNameSpaceList.get(i);
			this.RemakeSymbolTableEach(Imported, Imported.PublicSpecList);
			i += 1;
		}
	}

	public GetSymbol(Key: string): Object {
		if(this.SymbolPatternTable == null) {
			this.SymbolPatternTable = new GtMap();
			this.ExtendedPatternTable = new GtMap();
			this.RemakeSymbolTable(this);
		}
		return this.SymbolPatternTable.get(Key);
	}

	public GetPattern(PatternName: string): GtSyntaxPattern {
		var Body: Object = this.GetSymbol(PatternName);
		if(Body instanceof GtSyntaxPattern){
			return <GtSyntaxPattern>Body;
		}
		return null;
	}

	public GetExtendedPattern(PatternName: string): GtSyntaxPattern {
		if(this.ExtendedPatternTable == null) {
			this.SymbolPatternTable = new GtMap();
			this.ExtendedPatternTable = new GtMap();
			this.RemakeSymbolTable(this);
		}
		var Body: Object = this.ExtendedPatternTable.get(PatternName);
		if(Body instanceof GtSyntaxPattern){
			return <GtSyntaxPattern>Body;
		}
		return null;
	}

	public DefineSymbol(Key: string, Value: Object): void {
		var Spec: GtSpec = new GtSpec(SymbolPatternSpec, Key, Value);
		this.PublicSpecList.add(Spec);
		if(this.SymbolPatternTable != null) {
			this.TableAddSpec(this.SymbolPatternTable, Spec);
		}
	}

	public DefinePrivateSymbol(Key: string, Value: Object): void {
		var Spec: GtSpec = new GtSpec(SymbolPatternSpec, Key, Value);
		if(this.PrivateSpecList == null) {
			this.PrivateSpecList = new Array<GtSpec>();
		}
		this.PrivateSpecList.add(Spec);
		if(this.SymbolPatternTable != null) {
			this.TableAddSpec(this.SymbolPatternTable, Spec);
		}
	}

	public DefineSyntaxPattern(PatternName: string, MatchFunc: any, TypeFunc: any): void {
		var Pattern: GtSyntaxPattern = new GtSyntaxPattern(this, PatternName, MatchFunc, TypeFunc);
		var Spec: GtSpec = new GtSpec(SymbolPatternSpec, PatternName, Pattern);
		this.PublicSpecList.add(Spec);
		if(this.SymbolPatternTable != null) {
			this.TableAddSpec(this.SymbolPatternTable, Spec);
		}
	}

	public DefineExtendedPattern(PatternName: string, SyntaxFlag: number, MatchFunc: any, TypeFunc: any): void {
		var Pattern: GtSyntaxPattern = new GtSyntaxPattern(this, PatternName, MatchFunc, TypeFunc);
		Pattern.SyntaxFlag = SyntaxFlag;
		var Spec: GtSpec = new GtSpec(ExtendedPatternSpec, PatternName, Pattern);
		this.PublicSpecList.add(Spec);
		if(this.ExtendedPatternTable != null) {
			this.TableAddSpec(this.ExtendedPatternTable, Spec);
		}
	}

	public DefineClass(ClassInfo: GtType): GtType {
		if(ClassInfo.PackageNameSpace == null) {
			ClassInfo.PackageNameSpace = this;
			if(this.PackageName != null) {
				this.Context.ClassNameMap.put(this.PackageName + "." + ClassInfo.ShortClassName, ClassInfo);
			}
			this.Context.Generator.AddClass(ClassInfo);
		}
		this.DefineSymbol(ClassInfo.ShortClassName, ClassInfo);
		return ClassInfo;
	}

	 DefineMethod(Method: GtMethod): GtMethod {
		//  adding functionthe: totable: symbol //
		this.TopLevelLayer.DefineMethod(Method);
		var Function: Object = this.GetSymbol(Method.MethodName);
		if(Function == null) {
			this.DefineSymbol(Method.MethodName, Method);
		}
		return Method;
	}

	private FilterOverloadedMethods(Method: GtMethod, ParamSize: number, ResolvedSize: number, TypeList: Array<GtType>, BaseIndex: number, FoundMethod: GtMethod): GtMethod {
		while(Method != null) {
			if(Method.GetParamSize() == ParamSize) {
				var i: number = 1;  // the: becausetype: firstmached: isgiven: by class //
				var MatchedMethod: GtMethod = Method;
				while(i < ResolvedSize) {
					if(!Method.GetParamType(i).Accept(TypeList.get(BaseIndex + i))) {
						MatchedMethod = null;
						break;
					}
					i += 1;
				}
				if(MatchedMethod != null) {
					if(FoundMethod != null) {
						return null; /*overloaded: methods: found*/
					}
					FoundMethod = MatchedMethod;
				}
			}
			Method = Method.ElderMethod;
		}
		return FoundMethod;
	}

	public LookupMethod(MethodName: string, ParamSize: number, ResolvedSize: number, TypeList: Array<GtType>, BaseIndex: number): GtMethod {
		var i: number = this.LayerList.size() - 1;
		var FoundMethod: GtMethod = null;
		if(ResolvedSize > 0) {
			var Class: GtType = TypeList.get(BaseIndex + 0);
			while(FoundMethod == null && Class != null) {
				var MethodId: string = Class.GetMethodId(MethodName);
				while(i >= 0) {
					var Layer: GtLayer = this.LayerList.get(i);
					var Method: GtMethod = Layer.GetMethod(MethodId);
					FoundMethod = this.FilterOverloadedMethods(Method, ParamSize, ResolvedSize, TypeList, BaseIndex, FoundMethod);
					i -= 1;
				}
				Class = Class.SearchSuperMethodClass;
			}
		}
		return FoundMethod;
	}

	public GetGetter(Class: GtType, FieldName: string): GtMethod {
		var MethodId: string = Class.GetMethodId(FieldName);
		while(Class != null) {
			var FoundMethod: GtMethod = this.Context.FieldLayer.GetMethod(MethodId);
			if(FoundMethod != null) {
				return FoundMethod;
			}
			Class = Class.SearchSuperMethodClass;
		}
		return null;
	}

	// Object: Global //
	public CreateGlobalObject(ClassFlag: number, ShortName: string): GtObject {
		var NewClass: GtType = new GtType(this.Context, ClassFlag, ShortName, null);
		var GlobalObject: GtObject = new GtObject(NewClass);
		NewClass.DefaultNullValue = GlobalObject;
		return GlobalObject;
	}

	public GetGlobalObject(): GtObject {
		var GlobalObject: Object = this.GetSymbol(GlobalConstName);
		if(GlobalObject == null || !(GlobalObject instanceof GtObject)) {
			GlobalObject = this.CreateGlobalObject(SingletonClass, "global");
			this.DefinePrivateSymbol(GlobalConstName, GlobalObject);
		}
		return <GtObject> GlobalObject;
	}

	// Object: Const //
	public GetConstant(VariableName: string): Object {
		if(this.ConstantTable != null) {
			var ConstValue: Object = this.ConstantTable.get(VariableName);
			if(ConstValue != null) {
				return ConstValue;
			}
			if(this.ParentNameSpace != null) {
				return this.ParentNameSpace.GetConstant(VariableName);
			}
		}
		return null;
	}
	public AppendConstants(VariableName: string, ConstValue: Object): boolean {
		if(this.GetConstant(VariableName) != null) {
			return false;
		}
		if(this.ConstantTable == null) {
			this.ConstantTable = new GtMap();
		}
		this.ConstantTable.put(VariableName, ConstValue);
		return true;
	}

	public Eval(ScriptSource: string, FileLine: number, Generator: GtGenerator): Object {
		var resultValue: Object = null;
		console.log("DEBUG: " + "Eval: " + ScriptSource);
		var tokenContext: GtTokenContext = new GtTokenContext(this, ScriptSource, FileLine);
		tokenContext.SkipEmptyStatement();
		while(tokenContext.HasNext()) {
			var annotation: GtMap = tokenContext.SkipAndGetAnnotation(true);
			var topLevelTree: GtSyntaxTree = ParseExpression(tokenContext);
			topLevelTree.SetAnnotation(annotation);
			console.log("DEBUG: " + "untyped tree: " + topLevelTree);
			var gamma: GtTypeEnv = new GtTypeEnv(this);
			var node: GtNode = gamma.TypeCheckEachNode(topLevelTree, gamma.VoidType, DefaultTypeCheckPolicy);
			resultValue = Generator.Eval(node);
			tokenContext.SkipEmptyStatement();
			tokenContext.Vacume();
		}
		return resultValue;
	}

	private GetSourcePosition(FileLine: number): string {
		return "(eval:" + <number> FileLine + ")";
	}

	public ReportError(Level: number, Token: GtToken, Message: string): string {
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
			println(Message);
			return Message;
		}
		return Token.GetErrorMessage();
	}
}

class GtGrammar {
	public LoadTo(NameSpace: GtNameSpace): void {
		/*extension*/
	}
}

 class DScriptGrammar extends GtGrammar {
	//  Token //
	static WhiteSpaceToken(TokenContext: GtTokenContext, SourceText: string, pos: number): number {
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

	static IndentToken(TokenContext: GtTokenContext, SourceText: string, pos: number): number {
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

	static SymbolToken(TokenContext: GtTokenContext, SourceText: string, pos: number): number {
		var start: number = pos;
		while(pos < SourceText.length) {
			var ch: number = LangDeps.CharAt(SourceText, pos);
			if(!LangDeps.IsLetter(ch) && !LangDeps.IsDigit(ch) && ch != (95/*_*/)) {
				break;
			}
			pos += 1;
		}
		TokenContext.AddNewToken(SourceText.substring(start, pos), 0, null);
		return pos;
	}

	static OperatorToken(TokenContext: GtTokenContext, SourceText: string, pos: number): number {
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
			var Pattern: GtSyntaxPattern = TokenContext.NameSpace.GetExtendedPattern(Sub);
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

	static CommentToken(TokenContext: GtTokenContext, SourceText: string, pos: number): number {
		var NextPos: number = pos + 1;
		if(NextPos < SourceText.length) {
			var NextChar: number = LangDeps.CharAt(SourceText, NextPos);
			if(NextChar != (47/*/*/) && NextChar != (42/***/)) {
				return NoMatch;
			}
			var Level: number = 0;
			var PrevChar: number = 0;
			if(NextChar == (42/***/)) {
				Level = 1;
			}
			while(NextPos < SourceText.length) {
				NextChar = LangDeps.CharAt(SourceText, NextPos);
				if(NextChar == ('\n'.charCodeAt(0)) && Level == 0) {
					return DScriptGrammar.IndentToken(TokenContext, SourceText, NextPos);
				}
				if(NextChar == (47/*/*/) && PrevChar == (42/***/)) {
					if(Level == 1) {
						return NextPos + 1;
					}
					Level = Level - 1;
				}
				if(Level > 0) {
					if(NextChar == (42/***/) && PrevChar == (47/*/*/)) {
						Level = Level + 1;
					}
				}
				NextPos = NextPos + 1;
			}
		}
		return NoMatch;
	}

	static NumberLiteralToken(TokenContext: GtTokenContext, SourceText: string, pos: number): number {
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

	static StringLiteralToken(TokenContext: GtTokenContext, SourceText: string, pos: number): number {
		var start: number = pos + 1;
		var prev: number = (34/*"*/);
		pos = pos + 1; //  eat "\"" //
		while(pos < SourceText.length) {
			var ch: number = LangDeps.CharAt(SourceText, pos);
			if(ch == (34/*"*/) && prev != ('\\'.charCodeAt(0))) {
				TokenContext.AddNewToken(SourceText.substring(start, pos), 0, "$StringLiteral$");
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

	static StringLiteralToken_StringInterpolation(TokenContext: GtTokenContext, SourceText: string, pos: number): number {
		var start: number = pos + 1;
		var NextPos: number = start;
		var prev: number = (34/*"*/);
		while(NextPos < SourceText.length) {
			var ch: number = LangDeps.CharAt(SourceText, NextPos);
			if(ch == (36/*$*/)) {
				var end: number = NextPos + 1;
				ch = LangDeps.CharAt(SourceText, end);
				if(ch == (40/*(*/)) {
					//  find (41/*)*/) //
				}
				else {
					while(end < SourceText.length) {
						ch = LangDeps.CharAt(SourceText, end);
						if(!LangDeps.IsLetter(ch) && !LangDeps.IsDigit(ch)) {
							break;
						}
						end = end + 1;
					}
					if(end == NextPos + 1) {
						//  e.g. "aaaa$ bbbb" //
						/*nothing: do */
					}
					else {
						var VarName: string = SourceText.substring(NextPos + 1, end);
						TokenContext.AddNewToken(SourceText.substring(start, NextPos), 0, "$StringLiteral$");
						TokenContext.AddNewToken("+", 0, null);
						TokenContext.AddNewToken(VarName, 0, null);
						TokenContext.AddNewToken("+", 0, null);
						start = end;
					}
				}
				NextPos = end;
				prev = ch;
				if(ch == (34/*"*/)) {
					TokenContext.AddNewToken(SourceText.substring(start, NextPos), 0, "$StringLiteral$");
					return NextPos + 1;
				}
				continue;
			}
			if(ch == (34/*"*/) && prev != ('\\'.charCodeAt(0))) {
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

	static ParseType(Pattern: GtSyntaxPattern, LeftTree: GtSyntaxTree, TokenContext: GtTokenContext): GtSyntaxTree {
		var Token: GtToken = TokenContext.Next();
		var ConstValue: Object = TokenContext.NameSpace.GetSymbol(Token.ParsedText);
		if(ConstValue instanceof GtType) {
			return new GtSyntaxTree(Pattern, TokenContext.NameSpace, Token, ConstValue);
		}
		return null; // Matched: Not //
	}

	static ParseConst(Pattern: GtSyntaxPattern, LeftTree: GtSyntaxTree, TokenContext: GtTokenContext): GtSyntaxTree {
		var Token: GtToken = TokenContext.Next();
		var ConstValue: Object = TokenContext.NameSpace.GetSymbol(Token.ParsedText);
		if(ConstValue != null) {
			return new GtSyntaxTree(Pattern, TokenContext.NameSpace, Token, ConstValue);
		}
		return null; // Matched: Not //
	}

	static TypeConst(Gamma: GtTypeEnv, ParsedTree: GtSyntaxTree, Type: GtType): GtNode {
		return Gamma.Generator.CreateConstNode(Gamma.GuessType(ParsedTree.ConstValue), ParsedTree, ParsedTree.ConstValue);
	}

	static ParseSymbol(Pattern: GtSyntaxPattern, LeftTree: GtSyntaxTree, TokenContext: GtTokenContext): GtSyntaxTree {
		var TypeTree: GtSyntaxTree = TokenContext.ParsePattern("$Type$", Optional);
		if(TypeTree != null) {
			var DeclTree: GtSyntaxTree = TokenContext.ParsePatternAfter(TypeTree, "$FuncDecl$", Optional);
			if(DeclTree != null) {
				return DeclTree;
			}
			DeclTree = TokenContext.ParsePatternAfter(TypeTree, "$VarDecl$", Optional);
			if(DeclTree != null) {
				return DeclTree;
			}
			return TypeTree;
		}
		var Token: GtToken = TokenContext.Next();
		var NameSpace: GtNameSpace = TokenContext.NameSpace;
		var ConstValue: Object = NameSpace.GetSymbol(Token.ParsedText);
		if(ConstValue != null && !(ConstValue instanceof GtType)) {
			return new GtSyntaxTree(NameSpace.GetPattern("$Const$"), NameSpace, Token, ConstValue);
		}
		return new GtSyntaxTree(NameSpace.GetPattern("$Variable$"), NameSpace, Token, null);
	}

	static ParseVariable(Pattern: GtSyntaxPattern, LeftTree: GtSyntaxTree, TokenContext: GtTokenContext): GtSyntaxTree {
		var Token: GtToken = TokenContext.Next();
		var ch: number = LangDeps.CharAt(Token.ParsedText, 0);
		if(LangDeps.IsLetter(ch) || ch == (95/*_*/)) {
			return new GtSyntaxTree(Pattern, TokenContext.NameSpace, Token, null);
		}
		return null;
	}

	static TypeVariable(Gamma: GtTypeEnv, ParsedTree: GtSyntaxTree, Type: GtType): GtNode {
		var Name: string = ParsedTree.KeyToken.ParsedText;
		var VariableInfo: GtVariableInfo = Gamma.LookupDeclaredVariable(Name);
		if(VariableInfo != null) {
			return Gamma.Generator.CreateLocalNode(VariableInfo.Type, ParsedTree, VariableInfo.LocalName);
		}
		var ConstValue: GtNode = <GtNode> Gamma.NameSpace.GetConstant(Name);
		if(ConstValue != null) {
			return ConstValue;
		}
		var Function: GtMethod = Gamma.LookupFunction(Name);
		if(Function != null) {
			return Gamma.Generator.CreateConstNode(Function.GetFuncType(), ParsedTree, Function);
		}
		return Gamma.CreateErrorNode(ParsedTree, "undefined name: " + Name);
	}

	static ParseVarDecl(Pattern: GtSyntaxPattern, LeftTree: GtSyntaxTree, TokenContext: GtTokenContext): GtSyntaxTree {
		var Tree: GtSyntaxTree = new GtSyntaxTree(Pattern, TokenContext.NameSpace, TokenContext.GetToken(), null);
		if(LeftTree == null) {
			Tree.SetMatchedPatternAt(VarDeclType, TokenContext, "$Type$", Required);
		}
		else {
			Tree.SetSyntaxTreeAt(VarDeclType, LeftTree);
		}
		Tree.SetMatchedPatternAt(VarDeclName, TokenContext, "$Variable$", Required);
		if(TokenContext.MatchToken("=")) {
			Tree.SetMatchedPatternAt(VarDeclValue, TokenContext, "$Expression$", Required);
		}
		while(TokenContext.MatchToken(",")) {
			var NextTree: GtSyntaxTree = new GtSyntaxTree(Pattern, TokenContext.NameSpace, Tree.KeyToken, null);
			NextTree.SetSyntaxTreeAt(VarDeclType, Tree.GetSyntaxTreeAt(VarDeclType));
			Tree = LinkTree(Tree, NextTree);
			Tree.SetMatchedPatternAt(VarDeclName, TokenContext, "$Variable$", Required);
			if(TokenContext.MatchToken("=")) {
				Tree.SetMatchedPatternAt(VarDeclValue, TokenContext, "$Expression$", Required);
			}
		}
		return Tree;
	}

	static TypeVarDecl(Gamma: GtTypeEnv, ParsedTree: GtSyntaxTree, Type: GtType): GtNode {
		var TypeTree: GtSyntaxTree = ParsedTree.GetSyntaxTreeAt(VarDeclType);
		var NameTree: GtSyntaxTree = ParsedTree.GetSyntaxTreeAt(VarDeclName);
		var ValueTree: GtSyntaxTree = ParsedTree.GetSyntaxTreeAt(VarDeclValue);
		var DeclType: GtType = <GtType>TypeTree.ConstValue;
		var VariableName: string = NameTree.KeyToken.ParsedText;
		if(!Gamma.AppendDeclaredVariable(DeclType, VariableName)) {
			Gamma.CreateErrorNode(TypeTree, "defined: already variable " + VariableName);
		}
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
		var BlockNode: GtNode = Gamma.TypeBlock(ParsedTree.NextTree, Type);
		ParsedTree.NextTree = null;
		return Gamma.Generator.CreateLetNode(DeclType, ParsedTree, DeclType, (<LocalNode>VariableNode).LocalName, InitValueNode, BlockNode);
	}

	// And: Type: Parse //
	static ParseIntegerLiteral(Pattern: GtSyntaxPattern, LeftTree: GtSyntaxTree, TokenContext: GtTokenContext): GtSyntaxTree {
		var Token: GtToken = TokenContext.Next();
		return new GtSyntaxTree(Pattern, TokenContext.NameSpace, Token, LangDeps.ParseInt(Token.ParsedText));
	}

	static ParseStringLiteral(Pattern: GtSyntaxPattern, LeftTree: GtSyntaxTree, TokenContext: GtTokenContext): GtSyntaxTree {
		var Token: GtToken = TokenContext.Next(); /*must: be: this \"we: andeat: it: should*/
		var NewTree: GtSyntaxTree = new GtSyntaxTree(Pattern, TokenContext.NameSpace, Token, Token.ParsedText);
		return NewTree;
	}

	static ParseExpression(Pattern: GtSyntaxPattern, LeftTree: GtSyntaxTree, TokenContext: GtTokenContext): GtSyntaxTree {
		return ParseExpression(TokenContext);
	}

	static ParseUnary(Pattern: GtSyntaxPattern, LeftTree: GtSyntaxTree, TokenContext: GtTokenContext): GtSyntaxTree {
		var Token: GtToken = TokenContext.Next();
		var Tree: GtSyntaxTree = new GtSyntaxTree(Pattern, TokenContext.NameSpace, Token, null);
		Tree.SetMatchedPatternAt(UnaryTerm, TokenContext, "$Expression$", Required);
		return Tree;
	}

	static TypeUnary(Gamma: GtTypeEnv, ParsedTree: GtSyntaxTree, Type: GtType): GtNode {
		var ExprNode: GtNode  = ParsedTree.TypeNodeAt(UnaryTerm, Gamma, Gamma.VarType, DefaultTypeCheckPolicy);
		return Gamma.Generator.CreateUnaryNode(Gamma.AnyType, ParsedTree, null/*Method*/, ExprNode);
	}

	static ParseBinary(Pattern: GtSyntaxPattern, LeftTree: GtSyntaxTree, TokenContext: GtTokenContext): GtSyntaxTree {
		var Token: GtToken = TokenContext.Next();
		var RightTree: GtSyntaxTree = ParseExpression(TokenContext);
		if(IsEmptyOrError(RightTree)) return RightTree;
		if(RightTree.Pattern.IsBinaryOperator()) {
			if(Pattern.IsLeftJoin(RightTree.Pattern)) {
				var NewTree: GtSyntaxTree = new GtSyntaxTree(Pattern, TokenContext.NameSpace, Token, null);
				NewTree.SetSyntaxTreeAt(LeftHandTerm, LeftTree);
				NewTree.SetSyntaxTreeAt(RightHandTerm, RightTree.GetSyntaxTreeAt(LeftHandTerm));
				RightTree.SetSyntaxTreeAt(LeftHandTerm, NewTree);
				return RightTree;
			}
		}
		var NewTree: GtSyntaxTree = new GtSyntaxTree(Pattern, TokenContext.NameSpace, Token, null);
		NewTree.SetSyntaxTreeAt(LeftHandTerm, LeftTree);
		NewTree.SetSyntaxTreeAt(RightHandTerm, RightTree);
		if(RightTree.NextTree != null) {
			LinkTree(NewTree, RightTree.NextTree);
			RightTree.NextTree = null;
		}
		return NewTree;
	}

	static TypeBinary(Gamma: GtTypeEnv, ParsedTree: GtSyntaxTree, Type: GtType): GtNode {
		var LeftNode: GtNode  = ParsedTree.TypeNodeAt(LeftHandTerm, Gamma, Gamma.VarType, DefaultTypeCheckPolicy);
		var RightNode: GtNode = ParsedTree.TypeNodeAt(RightHandTerm, Gamma, Gamma.VarType, DefaultTypeCheckPolicy);
		var Operator: string = ParsedTree.KeyToken.ParsedText;
		var TypeList: Array<GtType> = new Array<GtType>();
		TypeList.add(LeftNode.Type);
		TypeList.add(RightNode.Type);
		var Method: GtMethod = Gamma.NameSpace.LookupMethod(Operator, 2, 1, TypeList, 0);
		var ReturnType: GtType = Gamma.VarType;
		if(Method != null) { // need: FIXMErestricted: morechecker: type //
			ReturnType = Method.GetReturnType();
		}
		return Gamma.Generator.CreateBinaryNode(ReturnType, ParsedTree, Method, LeftNode, RightNode);
	}

	// grammar: shell //
	static IsUnixCommand(cmd: string): boolean {

		return false;
	}

	static SymbolShellToken(TokenContext: GtTokenContext, SourceText: string, pos: number): number {
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
			else if(ch == (95/*_*/)) {
			}
			else if(ShellMode && (ch == (45/*-*/) || ch == (47/*/*/))) {
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
		
		if(Symbol.equals("true") || Symbol.equals("false")) {
			return NoMatch;
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

	static ParseShell(Pattern: GtSyntaxPattern, LeftTree: GtSyntaxTree, TokenContext: GtTokenContext): GtSyntaxTree {
		var Token: GtToken = TokenContext.Next();
		var NewTree: GtSyntaxTree = new GtSyntaxTree(Pattern, TokenContext.NameSpace, Token, null);
		while(!IsEmptyOrError(NewTree) && !TokenContext.MatchToken(";")) {
			var Tree: GtSyntaxTree = null;
			if(TokenContext.GetToken().IsDelim() || TokenContext.GetToken().IsIndent()) {
				break;
			}
			if(TokenContext.MatchToken("$ShellExpression$")) {
				//  FIXME //
			}
			if(Tree == null) {
				Tree = TokenContext.ParsePattern("$Expression$", Optional);
			}
			NewTree.AppendParsedTree(Tree);
		}
		return NewTree;
	}

	static TypeShell(Gamma: GtTypeEnv, ParsedTree: GtSyntaxTree, Type: GtType): GtNode {
		var Node: CommandNode = <CommandNode> Gamma.Generator.CreateCommandNode(Type, ParsedTree, null);
		var HeadNode: GtNode = Node;
		var i: number = 0;
		var Command: string = ParsedTree.KeyToken.ParsedText;
		var ThisNode: GtNode = Gamma.Generator.CreateConstNode(Gamma.StringType, ParsedTree, Command);
		Node.Append(ThisNode);
		while(i < ListSize(ParsedTree.TreeList)) {
			var ExprNode: GtNode = ParsedTree.TypeNodeAt(i, Gamma, Gamma.StringType, DefaultTypeCheckPolicy);
			if(ExprNode instanceof ConstNode) {
				var CNode: ConstNode = <ConstNode> ExprNode;
				if(CNode.ConstValue instanceof String) {
					var Val: string = <string> CNode.ConstValue;
					if(Val.equals("|")) {
						console.log("DEBUG: " + "PIPE");
						var PrevNode: CommandNode = Node;
						Node = <CommandNode> Gamma.Generator.CreateCommandNode(Type, ParsedTree, null);
						PrevNode.PipedNextNode = Node;
					}
				}
			}
			Node.Append(ExprNode);
			i = i + 1;
		}
		return HeadNode;
	}

	static ParseField(Pattern: GtSyntaxPattern, LeftTree: GtSyntaxTree, TokenContext: GtTokenContext): GtSyntaxTree {
		TokenContext.MatchToken(".");
		var Token: GtToken = TokenContext.Next();
		var NewTree: GtSyntaxTree = new GtSyntaxTree(Pattern, TokenContext.NameSpace, Token, null);
		NewTree.AppendParsedTree(LeftTree);
		return NewTree;
	}

	static TypeField(Gamma: GtTypeEnv, ParsedTree: GtSyntaxTree, Type: GtType): GtNode {
		var ExprNode: GtNode = ParsedTree.TypeNodeAt(UnaryTerm, Gamma, Gamma.VarType, DefaultTypeCheckPolicy);
		var Method: GtMethod = null; // ExprNode.Type.GetGetter(ParsedTree.KeyToken.ParsedText); //
		return Gamma.Generator.CreateGetterNode(Method.GetReturnType(), ParsedTree, Method, ExprNode);
	}

	//  PatternName: "(" //
	static ParseParenthesis(Pattern: GtSyntaxPattern, LeftTree: GtSyntaxTree, TokenContext: GtTokenContext): GtSyntaxTree {
		var ParseFlag: number = TokenContext.ParseFlag;
		TokenContext.MatchToken("(");
		TokenContext.ParseFlag |= SkipIndentParseFlag;
		var Tree: GtSyntaxTree = TokenContext.ParsePattern("$Expression$", Required);
		if(!TokenContext.MatchToken(")")) {
			Tree = TokenContext.ReportExpectedToken(")");
		}
		TokenContext.ParseFlag = ParseFlag;
		Tree.Pattern.SyntaxFlag |= Parenthesis;
		return Tree;
	}

	static ParseApply(Pattern: GtSyntaxPattern, LeftTree: GtSyntaxTree, TokenContext: GtTokenContext): GtSyntaxTree {
		var ParseFlag: number = TokenContext.ParseFlag;
		TokenContext.ParseFlag |= SkipIndentParseFlag;
		var FuncTree: GtSyntaxTree = new GtSyntaxTree(Pattern, TokenContext.NameSpace, TokenContext.GetMatchedToken("("), null);
		FuncTree.AppendParsedTree(LeftTree);
		if(TokenContext.MatchToken(")")) { //  case: f() //
			var Token: GtToken = TokenContext.GetBeforeToken();
			FuncTree.AppendParsedTree(new GtSyntaxTree(Pattern, TokenContext.NameSpace, Token, null));
		}
		else { //  case: f(1, 2, 3); //
			while(!FuncTree.IsEmptyOrError()) {
				var Tree: GtSyntaxTree = TokenContext.ParsePattern("$Expression$", Required);
				FuncTree.AppendParsedTree(Tree);
				if(TokenContext.MatchToken(",")) {
					continue;
				}
				var EndTree: GtSyntaxTree = new GtSyntaxTree(Pattern, TokenContext.NameSpace, TokenContext.GetMatchedToken(")"), null);
				if(EndTree != null) {
					FuncTree.AppendParsedTree(EndTree);
					break;
				}
			}
		}
		TokenContext.ParseFlag = ParseFlag;
		return FuncTree;
	}

	static TypeApply(Gamma: GtTypeEnv, ParsedTree: GtSyntaxTree, Type: GtType): GtNode {
		var TypeList: Array<GtType> = new Array<GtType>();
		var ParamList: Array<GtNode> = new Array<GtNode>();
		var i: number = 1;
		while(i < ListSize(ParsedTree.TreeList) - 1/*is: for: this ")" */) {
			var ExprNode: GtNode = ParsedTree.TypeNodeAt(i, Gamma, Gamma.VarType, DefaultTypeCheckPolicy);
			ParamList.add(ExprNode);
			//we: FIXMEto: needTypeChecker: implement //
			if(ExprNode.Type.equals(Gamma.VarType)) {
				console.log("DEBUG: " + "Paramater: Typeof " + (i-1) + " is var type.to: NeedTypechecker: Implement");
				ExprNode.Type = Gamma.IntType;
			}
			TypeList.add(ExprNode.Type);
			i += 1;
		}
		if(TypeList.size() == 0) {
			TypeList.add(Gamma.NameSpace.Context.VoidType);
		}

		var TreeList: Array<GtSyntaxTree> = ParsedTree.TreeList;
		var MethodName: string = TreeList.get(0).KeyToken.ParsedText;
		var ParamSize: number = TreeList.size() - 2; /*and: MethodName ")" symol*/
		var Method: GtMethod = Gamma.NameSpace.LookupMethod(MethodName, ParamSize, 1/*FIXME*/, TypeList, 0);
		if(Method == null) {
			return Gamma.CreateErrorNode(ParsedTree, "method: undefined: " + MethodName);
		}
		var Node: GtNode = Gamma.Generator.CreateApplyNode(Method.GetReturnType(), ParsedTree, Method);
		i = 0;
		while(i < ParamList.size()) {
			Node.Append(ParamList.get(i));
			i = i + 1;
		}
		return Node;
	}

	static TypeAnd(Gamma: GtTypeEnv, ParsedTree: GtSyntaxTree, Type: GtType): GtNode {
		var LeftNode: GtNode = ParsedTree.TypeNodeAt(LeftHandTerm, Gamma, Gamma.BooleanType, DefaultTypeCheckPolicy);
		var RightNode: GtNode = ParsedTree.TypeNodeAt(RightHandTerm, Gamma, Gamma.BooleanType, DefaultTypeCheckPolicy);
		return Gamma.Generator.CreateAndNode(Gamma.BooleanType, ParsedTree, LeftNode, RightNode);
	}

	static TypeOr(Gamma: GtTypeEnv, ParsedTree: GtSyntaxTree, Type: GtType): GtNode {
		var LeftNode: GtNode = ParsedTree.TypeNodeAt(LeftHandTerm, Gamma, Gamma.BooleanType, DefaultTypeCheckPolicy);
		var RightNode: GtNode = ParsedTree.TypeNodeAt(RightHandTerm, Gamma, Gamma.BooleanType, DefaultTypeCheckPolicy);
		return Gamma.Generator.CreateOrNode(Gamma.BooleanType, ParsedTree, LeftNode, RightNode);
	}

	static TypeAssign(Gamma: GtTypeEnv, ParsedTree: GtSyntaxTree, Type: GtType): GtNode {
		var LeftNode: GtNode = ParsedTree.TypeNodeAt(LeftHandTerm, Gamma, Gamma.VarType, DefaultTypeCheckPolicy);
		var RightNode: GtNode = ParsedTree.TypeNodeAt(RightHandTerm, Gamma, LeftNode.Type, DefaultTypeCheckPolicy);
		return Gamma.Generator.CreateAssignNode(Gamma.BooleanType, ParsedTree, LeftNode, RightNode);
	}

	static ParseEmpty(Pattern: GtSyntaxPattern, LeftTree: GtSyntaxTree, TokenContext: GtTokenContext): GtSyntaxTree {
		return new GtSyntaxTree(Pattern, TokenContext.NameSpace, GtTokenContext.NullToken, null);
	}

	static TypeEmpty(Gamma: GtTypeEnv, ParsedTree: GtSyntaxTree, Type: GtType): GtNode {
		return Gamma.Generator.CreateNullNode(Gamma.VoidType, ParsedTree);
	}

	static ParseBlock(Pattern: GtSyntaxPattern, LeftTree: GtSyntaxTree, TokenContext: GtTokenContext): GtSyntaxTree {
		if(TokenContext.MatchToken("{")) {
			var PrevTree: GtSyntaxTree = null;
			while(TokenContext.SkipEmptyStatement()) {
				if(TokenContext.MatchToken("}")) break;
				var Annotation: GtMap = TokenContext.SkipAndGetAnnotation(true);
				var CurrentTree: GtSyntaxTree = ParseExpression(TokenContext);
				if(IsEmptyOrError(CurrentTree)) {
					return CurrentTree;
				}
				CurrentTree.SetAnnotation(Annotation);
				PrevTree = LinkTree(PrevTree, CurrentTree);
			}
			if(PrevTree == null) {
				return TokenContext.ParsePattern("$Empty$", Required);
			}
			return TreeHead(PrevTree);
		}
		return null;
	}

	static ParseStatement(Pattern: GtSyntaxPattern, LeftTree: GtSyntaxTree, TokenContext: GtTokenContext): GtSyntaxTree {
		var StmtTree: GtSyntaxTree = TokenContext.ParsePattern("$Block$", Optional);
		if(StmtTree == null) {
			StmtTree = ParseExpression(TokenContext);
		}
		if(StmtTree == null) {
			StmtTree = TokenContext.ParsePattern("$Empty$", Required);
		}
		return StmtTree;
	}

	static TypeBlock(Gamma: GtTypeEnv, ParsedTree: GtSyntaxTree, Type: GtType): GtNode {
		return Gamma.TypeBlock(ParsedTree, Type);
	}

	// Statement: If //
	static ParseIf(Pattern: GtSyntaxPattern, LeftTree: GtSyntaxTree, TokenContext: GtTokenContext): GtSyntaxTree {
		var Token: GtToken = TokenContext.GetMatchedToken("if");
		var NewTree: GtSyntaxTree = new GtSyntaxTree(Pattern, TokenContext.NameSpace, Token, null);
		NewTree.SetMatchedTokenAt(NoWhere, TokenContext, "(", Required);
		NewTree.SetMatchedPatternAt(IfCond, TokenContext, "$Expression$", Required);
		NewTree.SetMatchedTokenAt(NoWhere, TokenContext, ")", Required);
		NewTree.SetMatchedPatternAt(IfThen, TokenContext, "$Statement$", Required);
		if(TokenContext.MatchToken("else")) {
			NewTree.SetMatchedPatternAt(IfElse, TokenContext, "$Statement$", Required);
		}
		return NewTree;
	}

	static TypeIf(Gamma: GtTypeEnv, ParsedTree: GtSyntaxTree, Type: GtType): GtNode {
		var CondNode: GtNode = ParsedTree.TypeNodeAt(IfCond, Gamma, Gamma.BooleanType, DefaultTypeCheckPolicy);
		var ThenNode: GtNode = ParsedTree.TypeNodeAt(IfThen, Gamma, Type, DefaultTypeCheckPolicy);
		var ElseNode: GtNode = ParsedTree.TypeNodeAt(IfElse, Gamma, ThenNode.Type, AllowEmptyPolicy);
		return Gamma.Generator.CreateIfNode(ThenNode.Type, ParsedTree, CondNode, ThenNode, ElseNode);
	}

	// Statement: While //
	static ParseWhile(Pattern: GtSyntaxPattern, LeftTree: GtSyntaxTree, TokenContext: GtTokenContext): GtSyntaxTree {
		var Token: GtToken = TokenContext.GetMatchedToken("while");
		var NewTree: GtSyntaxTree = new GtSyntaxTree(Pattern, TokenContext.NameSpace, Token, null);
		NewTree.SetMatchedTokenAt(NoWhere, TokenContext, "(", Required);
		NewTree.SetMatchedPatternAt(WhileCond, TokenContext, "$Expression$", Required);
		NewTree.SetMatchedTokenAt(NoWhere, TokenContext, ")", Required);
		NewTree.SetMatchedPatternAt(WhileBody, TokenContext, "$Block$", Required);
		return NewTree;
	}

	static TypeWhile(Gamma: GtTypeEnv, ParsedTree: GtSyntaxTree, Type: GtType): GtNode {
		var CondNode: GtNode = ParsedTree.TypeNodeAt(WhileCond, Gamma, Gamma.BooleanType, DefaultTypeCheckPolicy);
		var BodyNode: GtNode = ParsedTree.TypeNodeAt(WhileBody, Gamma, Type, DefaultTypeCheckPolicy);
		return Gamma.Generator.CreateWhileNode(BodyNode.Type, ParsedTree, CondNode, BodyNode);
	}
	//  Break/Statement: Continue //
	static ParseBreak(Pattern: GtSyntaxPattern, LeftTree: GtSyntaxTree, TokenContext: GtTokenContext): GtSyntaxTree {
		var Token: GtToken = TokenContext.GetMatchedToken("break");
		var NewTree: GtSyntaxTree = new GtSyntaxTree(Pattern, TokenContext.NameSpace, Token, null);
		//support: FIXMElabel: break(e.g. LABEL: break; ): with //
		return NewTree;
	}

	static TypeBreak(Gamma: GtTypeEnv, ParsedTree: GtSyntaxTree, Type: GtType): GtNode {
		return Gamma.Generator.CreateBreakNode(Gamma.VoidType, ParsedTree, null, "break");
	}

	static ParseContinue(Pattern: GtSyntaxPattern, LeftTree: GtSyntaxTree, TokenContext: GtTokenContext): GtSyntaxTree {
		var Token: GtToken = TokenContext.GetMatchedToken("continue");
		var NewTree: GtSyntaxTree = new GtSyntaxTree(Pattern, TokenContext.NameSpace, Token, null);
		//support: FIXMElabel: continue(e.g. LABEL: continue; ): with //
		return NewTree;
	}

	static TypeContinue(Gamma: GtTypeEnv, ParsedTree: GtSyntaxTree, Type: GtType): GtNode {
		return Gamma.Generator.CreateContinueNode(Gamma.VoidType, ParsedTree, null, "continue");
	}

	// Statement: Return //
	static ParseReturn(Pattern: GtSyntaxPattern, LeftTree: GtSyntaxTree, TokenContext: GtTokenContext): GtSyntaxTree {
		var Token: GtToken = TokenContext.GetMatchedToken("return");
		var NewTree: GtSyntaxTree = new GtSyntaxTree(Pattern, TokenContext.NameSpace, Token, null);
		NewTree.SetMatchedPatternAt(ReturnExpr, TokenContext, "$Expression$", Optional);
		return NewTree;
	}

	static TypeReturn(Gamma: GtTypeEnv, ParsedTree: GtSyntaxTree, Type: GtType): GtNode {
		if(Gamma.IsTopLevel()) {
			return Gamma.UnsupportedTopLevelError(ParsedTree);
		}
		var ReturnType: GtType = Gamma.Method.GetReturnType();
		var Expr: GtNode = ParsedTree.TypeNodeAt(ReturnExpr, Gamma, ReturnType, DefaultTypeCheckPolicy);
		if(ReturnType == Gamma.VoidType){
			return Gamma.Generator.CreateReturnNode(Expr.Type, ParsedTree, null);
		}
		return Gamma.Generator.CreateReturnNode(Expr.Type, ParsedTree, Expr);
	}

	// Expression: New //
	static ParseNew(Pattern: GtSyntaxPattern, LeftTree: GtSyntaxTree, TokenContext: GtTokenContext): GtSyntaxTree {
		var Token: GtToken = TokenContext.GetMatchedToken("new");
		var NewTree: GtSyntaxTree = new GtSyntaxTree(Pattern, TokenContext.NameSpace, Token, null);
		NewTree.SetMatchedPatternAt(CallExpressionOffset, TokenContext, "$Type$", Required);
		return NewTree;
	}

	static TypeNew(Gamma: GtTypeEnv, ParsedTree: GtSyntaxTree, Type: GtType): GtNode {
		var SelfNode: GtNode = ParsedTree.TypeNodeAt(CallExpressionOffset, Gamma, Gamma.AnyType, DefaultTypeCheckPolicy);
		var ApplyNode: GtNode = Gamma.Generator.CreateApplyNode(Gamma.AnyType, ParsedTree, null);
		var i: number = 0;
		SelfNode = Gamma.Generator.CreateNewNode(SelfNode.Type, ParsedTree);
		ApplyNode.Append(SelfNode);
		/*from: TypeApply: copied */
		while(i < ListSize(ParsedTree.TreeList)) {
			var ExprNode: GtNode = ParsedTree.TypeNodeAt(UnaryTerm, Gamma, Gamma.VarType, DefaultTypeCheckPolicy);
			ApplyNode.Append(ExprNode);
			i += 1;
		}
		return ApplyNode;
	}

	// Statement: Const //
	static ParseConstDecl(Pattern: GtSyntaxPattern, LeftTree: GtSyntaxTree, TokenContext: GtTokenContext): GtSyntaxTree {
		var Token: GtToken = TokenContext.GetMatchedToken("const");
		var NewTree: GtSyntaxTree = new GtSyntaxTree(Pattern, TokenContext.NameSpace, Token, null);
		NewTree.SetMatchedPatternAt(VarDeclName, TokenContext, "$Variable$", Required);
		NewTree.SetMatchedTokenAt(NoWhere, TokenContext, "=", Required);
		NewTree.SetMatchedPatternAt(VarDeclValue, TokenContext, "$Expression$", Required);
		return NewTree;
	}

	static TypeConstDecl(Gamma: GtTypeEnv, ParsedTree: GtSyntaxTree, Type: GtType): GtNode {
		var NameTree: GtSyntaxTree = ParsedTree.GetSyntaxTreeAt(VarDeclName);
		var ValueTree: GtSyntaxTree = ParsedTree.GetSyntaxTreeAt(VarDeclValue);
		var VariableName: string = NameTree.KeyToken.ParsedText;
		var ValueNode: GtNode = Gamma.TypeCheck(ValueTree, Gamma.AnyType, DefaultTypeCheckPolicy);
		if(!(ValueNode instanceof ConstNode)) {
			return Gamma.CreateErrorNode(ParsedTree, "of: definition variable " + VariableName + "not: constant: is");
		}
		if(!Gamma.AppendConstants(VariableName, ValueNode)) {
			return Gamma.CreateErrorNode(ParsedTree, "alreadyconstant: defined " + VariableName);
		}
		return Gamma.Generator.CreateEmptyNode(Type, ParsedTree);
	}

	//  FuncName //
	static ParseFuncName(Pattern: GtSyntaxPattern, LeftTree: GtSyntaxTree, TokenContext: GtTokenContext): GtSyntaxTree {
		var Token: GtToken = TokenContext.Next();
		if(Token != GtTokenContext.NullToken) {
			return new GtSyntaxTree(Pattern, TokenContext.NameSpace, Token, Token.ParsedText);
		}
		return null;
	}

	//  FuncDecl //
	static ParseFuncDecl(Pattern: GtSyntaxPattern, LeftTree: GtSyntaxTree, TokenContext: GtTokenContext): GtSyntaxTree {
		var Tree: GtSyntaxTree = new GtSyntaxTree(Pattern, TokenContext.NameSpace, TokenContext.GetToken(), null);
		if(LeftTree == null) {
			Tree.SetMatchedPatternAt(FuncDeclReturnType, TokenContext, "$Type$", Required);
		}
		else {
			Tree.SetSyntaxTreeAt(FuncDeclReturnType, LeftTree);
		}
		Tree.SetMatchedPatternAt(FuncDeclName, TokenContext, "$FuncName$", Required);
		if(TokenContext.MatchToken("(")) {
			var ParseFlag: number = TokenContext.SetTrackback(false);  //  disabled //
			var ParamBase: number = FuncDeclParam;
			while(!Tree.IsEmptyOrError() && !TokenContext.MatchToken(")")) {
				if(ParamBase != FuncDeclParam) {
					Tree.SetMatchedTokenAt(NoWhere, TokenContext, ",", Required);
				}
				Tree.SetMatchedPatternAt(ParamBase + VarDeclType, TokenContext, "$Type$", Required);
				Tree.SetMatchedPatternAt(ParamBase + VarDeclName, TokenContext, "$Variable$", Required);
				if(TokenContext.MatchToken("=")) {
					Tree.SetMatchedPatternAt(ParamBase + VarDeclValue, TokenContext, "$Expression$", Required);
				}
				ParamBase += 3;
			}
			TokenContext.SkipIndent();
			if(TokenContext.MatchToken("as")) {  // is: thisad: hoc: little //
				var Token: GtToken = TokenContext.Next();
				Tree.ConstValue = Token.ParsedText;
			}
			else {
				Tree.SetMatchedPatternAt(FuncDeclBlock, TokenContext, "$Block$", Optional);
			}
			TokenContext.ParseFlag = ParseFlag;
			return Tree;
		}
		return null;
	}

	static TypeFuncDecl(Gamma: GtTypeEnv, ParsedTree: GtSyntaxTree, Type: GtType): GtNode {
		Gamma = new GtTypeEnv(ParsedTree.NameSpace);  // of: creation newenvironment: type //
		var MethodName: string = <string>ParsedTree.GetSyntaxTreeAt(FuncDeclName).ConstValue;
		var TypeBuffer: Array<GtType> = new Array<GtType>();
		var ReturnType: GtType = <GtType>ParsedTree.GetSyntaxTreeAt(FuncDeclReturnType).ConstValue;
		TypeBuffer.add(ReturnType);
		var ParamNameList: Array<string> = new Array<string>();
		var ParamBase: number = FuncDeclParam;
		var i: number = 0;
		while(ParamBase < ParsedTree.TreeList.size()) {
			var ParamType: GtType = <GtType>ParsedTree.GetSyntaxTreeAt(ParamBase).ConstValue;
			var ParamName: string = ParsedTree.GetSyntaxTreeAt(ParamBase+1).KeyToken.ParsedText;
			TypeBuffer.add(ParamType);
			ParamNameList.add(ParamName + i);
			Gamma.AppendDeclaredVariable(ParamType, ParamName);
			ParamBase += 3;
			i = i + 1;
		}
		var MethodFlag: number = Gamma.Generator.ParseMethodFlag(0, ParsedTree);
		var Method: GtMethod = Gamma.Generator.CreateMethod(MethodFlag, MethodName, 0, TypeBuffer, <string>ParsedTree.ConstValue);
		if(!Gamma.NameSpace.Context.CheckExportableName(Method)) {
			return Gamma.CreateErrorNode(ParsedTree, "duplicatedmethods: exported " + MethodName);
		}
		Gamma.Method = Method;
		Gamma.NameSpace.DefineMethod(Method);
		var BodyNode: GtNode = ParsedTree.TypeNodeAt(FuncDeclBlock, Gamma, ReturnType, IgnoreEmptyPolicy);
		if(BodyNode != null) {
			Gamma.Generator.DefineFunction(Method, ParamNameList, BodyNode);
		}
		return Gamma.Generator.CreateEmptyNode(Gamma.VoidType, ParsedTree);
	}

	static ParseClassDecl(Pattern: GtSyntaxPattern, LeftTree: GtSyntaxTree, TokenContext: GtTokenContext): GtSyntaxTree {
		var Tree: GtSyntaxTree = new GtSyntaxTree(Pattern, TokenContext.NameSpace, TokenContext.GetToken(), null);
		TokenContext.MatchToken("class");
		Tree.SetMatchedPatternAt(ClassNameOffset, TokenContext, "$Symbol$", Required);
		if(TokenContext.MatchToken("extends")) {
			Tree.SetMatchedPatternAt(ClassParentNameOffset, TokenContext, "$Type$", Required);
		}
		if(TokenContext.MatchToken("{")) {
			var i: number = ClassBlockOffset;
			var ParseFlag: number = TokenContext.ParseFlag;
			TokenContext.ParseFlag = ParseFlag | BackTrackParseFlag | SkipIndentParseFlag;
			while(!Tree.IsEmptyOrError() && !TokenContext.MatchToken("}")) {
				Tree.SetMatchedPatternAt(i, TokenContext, "$FuncDecl$", Optional);
				i = Tree.TreeList.size();
				var VarDecl: GtSyntaxTree = TokenContext.ParsePatternAfter(null, "$VarDecl$", Optional);
				if(VarDecl != null) {
					Tree.SetSyntaxTreeAt(i, VarDecl);
					TokenContext.MatchToken(";");
				}
				i = Tree.TreeList.size();
			}
			TokenContext.ParseFlag = ParseFlag;

		}
		return Tree;
	}

	static TypeClassDecl(Gamma: GtTypeEnv, ParsedTree: GtSyntaxTree, Type: GtType): GtNode {
		Gamma = new GtTypeEnv(ParsedTree.NameSpace);  // of: creation newenvironment: type //
		var ClassNameTree: GtSyntaxTree = ParsedTree.GetSyntaxTreeAt(ClassNameOffset);
		var ClassName: string = ClassNameTree.KeyToken.ParsedText;
		var FieldOffset: number = ClassBlockOffset;
		var SuperClassTree: GtSyntaxTree = ParsedTree.GetSyntaxTreeAt(ClassParentNameOffset);
		
		var SuperClass: GtType = Gamma.ObjectType;
		if(SuperClassTree != null) {
			SuperClass = <GtType> SuperClassTree.ConstValue;
		}
		var ClassFlag: number = Gamma.Generator.ParseMethodFlag(0, ParsedTree);
		var NewType: GtType = new GtType(Gamma.NameSpace.Context, ClassFlag, ClassName, null);
		var DefaultObject: GtObject = new GtObject(NewType);
		NewType.DefaultNullValue = DefaultObject;
		NewType.SuperClass = SuperClass;

		Gamma.AppendDeclaredVariable(NewType, "this");

		while(FieldOffset < ParsedTree.TreeList.size()) {
			var FieldTree: GtSyntaxTree = ParsedTree.GetSyntaxTreeAt(FieldOffset);
			if(FieldTree.Pattern.PatternName.equals("$VarDecl$")) {
				var NameTree: GtSyntaxTree = FieldTree.GetSyntaxTreeAt(VarDeclName);
				var TypeTree: GtSyntaxTree = FieldTree.GetSyntaxTreeAt(VarDeclType);
				var DeclType: GtType = <GtType>TypeTree.ConstValue;
				var VarName: string = NameTree.KeyToken.ParsedText;
				Gamma.AppendDeclaredVariable(DeclType, VarName);
				DefaultObject.Field.put(VarName, null);
				DefaultObject.Field.put(VarName + ":Type", DeclType);
			}
			var BodyNode: GtNode = Gamma.TypeCheck(FieldTree, Gamma.AnyType, IgnoreEmptyPolicy);
// 			if(BodyNode instanceof LetNode) { //
// 				//console.log(BodyNode.toString()); //
// 				var Field: LetNode = <LetNode>BodyNode; //
// 			} //
			// we: FIXMEto: needmethod: definition: rewrite //
			//  f(arg: T1): T0 {} => f(this: T, arg: T1): T0 {} //
			if(BodyNode instanceof GtNode) {
				// this: add //
			}
			FieldOffset += 1;
		}
		Gamma.NameSpace.DefineClass(NewType);
		return Gamma.Generator.CreateEmptyNode(Gamma.VoidType, ParsedTree);
	}

	public LoadTo(NameSpace: GtNameSpace): void {
		// Constants: Define //
		NameSpace.DefineSymbol("true", true);
		NameSpace.DefineSymbol("false", false);

		NameSpace.DefineTokenFunc(" \t", DScriptGrammar.WhiteSpaceToken);
		NameSpace.DefineTokenFunc("\n",  DScriptGrammar.IndentToken);
		NameSpace.DefineTokenFunc("(){}[]<>.,:;+-*/%=&|!@", DScriptGrammar.OperatorToken);
		NameSpace.DefineTokenFunc("/", DScriptGrammar.CommentToken);  //  overloading //
		NameSpace.DefineTokenFunc("Aa", DScriptGrammar.SymbolToken);
		NameSpace.DefineTokenFunc("Aa-/", DScriptGrammar.SymbolShellToken); //  overloading //

		NameSpace.DefineTokenFunc("\"", DScriptGrammar.StringLiteralToken);
		// NameSpace.DefineTokenFunc("\"", DScriptGrammar.StringLiteralToken_StringInterpolation); //
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

		NameSpace.DefineSyntaxPattern("$Symbol$", DScriptGrammar.ParseSymbol, null);
		NameSpace.DefineSyntaxPattern("$Type$", DScriptGrammar.ParseType, DScriptGrammar.TypeConst);
		NameSpace.DefineSyntaxPattern("$Variable$", DScriptGrammar.ParseVariable, DScriptGrammar.TypeVariable);
		NameSpace.DefineSyntaxPattern("$Const$", DScriptGrammar.ParseConst, DScriptGrammar.TypeConst);
		NameSpace.DefineSyntaxPattern("$StringLiteral$", DScriptGrammar.ParseStringLiteral, DScriptGrammar.TypeConst);
		NameSpace.DefineSyntaxPattern("$IntegerLiteral$", DScriptGrammar.ParseIntegerLiteral, DScriptGrammar.TypeConst);

		NameSpace.DefineSyntaxPattern("$ShellExpression$", DScriptGrammar.ParseShell, DScriptGrammar.TypeShell);
		
		NameSpace.DefineSyntaxPattern("(", DScriptGrammar.ParseParenthesis, null); /* => */
		NameSpace.DefineExtendedPattern(".", 0, DScriptGrammar.ParseField, DScriptGrammar.TypeField);
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
		NameSpace.DefineSyntaxPattern("new", DScriptGrammar.ParseNew, DScriptGrammar.TypeNew);  //  tentative //
		NameSpace.DefineSyntaxPattern("const", DScriptGrammar.ParseConstDecl, DScriptGrammar.TypeConstDecl);
		NameSpace.DefineSyntaxPattern("class", DScriptGrammar.ParseClassDecl, DScriptGrammar.TypeClassDecl);
	}
}

class GtContext {
	  Generator: GtGenerator;
	  RootNameSpace: GtNameSpace;
	public DefaultNameSpace: GtNameSpace;

	 VoidType: GtType;
	 ObjectType: GtType;
	 BooleanType: GtType;
	 IntType: GtType;
	 StringType: GtType;
	 VarType: GtType;
	 AnyType: GtType;
	 ArrayType: GtType;
	 FuncType: GtType;

	  ClassNameMap: GtMap;
	  UniqueMethodMap: GtMap;
	  LayerMap: GtMap;
	  GreenLayer: GtLayer;
	  FieldLayer: GtLayer;
	  UserDefinedLayer: GtLayer;
	public ClassCount: number;
	public MethodCount: number;

	constructor(Grammar: GtGrammar, Generator: GtGenerator) {
		this.Generator    = Generator;
		this.Generator.Context = this;
		this.ClassNameMap = new GtMap();
		this.LayerMap     = new GtMap();
		this.UniqueMethodMap = new GtMap();
		this.GreenLayer   = this.LoadLayer("GreenTea");
		this.FieldLayer   = this.LoadLayer("Field");
		this.UserDefinedLayer = this.LoadLayer("UserDefined");
		this.RootNameSpace = new GtNameSpace(this, null);
		this.ClassCount = 0;
		this.MethodCount = 0;
		this.VoidType    = this.RootNameSpace.DefineClass(new GtType(this, 0, "void", null));
		this.ObjectType  = this.RootNameSpace.DefineClass(new GtType(this, 0, "Object", new Object()));
		this.BooleanType = this.RootNameSpace.DefineClass(new GtType(this, 0, "boolean", false));
		this.IntType     = this.RootNameSpace.DefineClass(new GtType(this, 0, "int", 0));
		this.StringType  = this.RootNameSpace.DefineClass(new GtType(this, 0, "string", ""));
		this.VarType     = this.RootNameSpace.DefineClass(new GtType(this, 0, "var", null));
		this.AnyType     = this.RootNameSpace.DefineClass(new GtType(this, 0, "any", null));
		this.ArrayType   = this.RootNameSpace.DefineClass(new GtType(this, 0, "Array", null));
		this.FuncType    = this.RootNameSpace.DefineClass(new GtType(this, 0, "Func", null));
		this.ArrayType.Types = new Array<GtType>(1);
		this.ArrayType.Types[0] = this.AnyType;
		this.FuncType.Types = new Array<GtType>(1);
		this.FuncType.Types[0] = this.VoidType;
		Grammar.LoadTo(this.RootNameSpace);
		
		this.DefaultNameSpace = new GtNameSpace(this, this.RootNameSpace);
		this.Generator.SetLanguageContext(this);
	}

	public LoadLayer(Name: string): GtLayer {
		var Layer: GtLayer = new GtLayer(Name);
		this.LayerMap.put(Name, Layer);
		return Layer;
	}

	public LoadGrammar(Grammar: GtGrammar): void {
		Grammar.LoadTo(this.DefaultNameSpace);
	}

	public Define(Symbol: string, Value: Object): void {
		this.RootNameSpace.DefineSymbol(Symbol, Value);
	}

	public Eval(text: string, FileLine: number): Object {
		return this.DefaultNameSpace.Eval(text, FileLine, this.Generator);
	}

	public GetGenericType(BaseType: GtType, BaseIdx: number, TypeList: Array<GtType>, IsCreation: boolean): GtType {
		LangDeps.Assert(BaseType.IsGenericType());
		var MangleName: string = Mangle(BaseType, BaseIdx, TypeList);
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

	 CheckExportableName(Method: GtMethod): boolean {
		if(Method.Is(ExportMethod)) {
			var Value: Object = this.UniqueMethodMap.get(Method.MethodName);
			if(Value == null) {
				this.UniqueMethodMap.put(Method.MethodName, Method);
				return true;
			}
			return false;
		}
		return true;
	}
}

class GreenTeaScript {

// 	static TestAll(Context: GtContext): void { //
// 		//TestSyntaxPattern(Context, "int"); //
// 		//TestSyntaxPattern(Context, "123"); //
// 		//TestSyntaxPattern(Context, "1 + 2 * 3"); //
// 		TestToken(Context, "1 || 2", "1", "||"); //
// 		TestToken(Context, "1 == 2", "1", "=="); //
// 		TestToken(Context, "1 != 2", "1", "!="); //
// 		//TestToken(Context, "1 !== 2", "1", "!=="); //
// 		TestToken(Context, "1 *= 2", "1", "*"); //
// 		TestToken(Context, "1 = 2", "1", "="); //
// 	} //

	static main(Args: string[]): void {
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
		var Context: GtContext = new GtContext(new DScriptGrammar(), Generator);
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
