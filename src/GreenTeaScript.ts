

	//  ClassFlag //
	var PrivateClass: number					= 1 << 0;
	var SingletonClass: number					= 1 << 1;
	var FinalClass: number						= 1 << 2;
	var GreenClass: number		    			= 1 << 3;
	var StaticClass: number						= 1 << 4;
	var ImmutableClass: number					= 1 << 5;
	var InterfaceClass: number					= 1 << 6;

	//  MethodFlag //
	var PrivateMethod: number					= 1 << 0;
	var VirtualMethod: number					= 1 << 1;
	var FinalMethod: number						= 1 << 2;
	var ConstMethod: number						= 1 << 3;
	var StaticMethod: number					= 1 << 4;
	var ImmutableMethod: number					= 1 << 5;
	var TopLevelMethod: number					= 1 << 6;

	//rule: var: call //
	var CoercionMethod: number					= 1 << 7;
	var RestrictedMethod: number				= 1 << 8;
	var UncheckedMethod: number					= 1 << 9;
	var SmartReturnMethod: number				= 1 << 10;
	var VariadicMethod: number					= 1 << 11;
	var IterativeMethod: number					= 1 << 12;

	//  compatible //
	var UniversalMethod: number					= 1 << 13;

	//  internal //
	var HiddenMethod: number					= 1 << 17;
	var AbstractMethod: number					= 1 << 18;
	var OverloadedMethod: number				= 1 << 19;
	var Override: number						= 1 << 20;
	var DynamicCall: number						= 1 << 22;

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
			/*nulvar stx:eot: sohvar:ack: etxvar:bel: enq*/
			0, 1, 1, 1, 1, 1, 1, 1,
			/*bsvar nl:np: htvar:so: vtvar:si: cr  */
			1, TabChar, NewLineChar, 1, 1, 1, 1, 1,
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
		];

	var NullToken: GtToken = new GtToken("", 0);

	//  TokenFlag //
	var SourceTokenFlag: number	= 1;
	var ErrorTokenFlag: number	= (1 << 1);
	var IndentTokenFlag: number	= (1 << 2);
	var WhiteSpaceTokenFlag: number	= (1 << 3);
	var DelimTokenFlag: number	= (1 << 4);

	//  ParseFlag //
	var TrackbackParseFlag: number	= 1;
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

	//N: var: var = 1; //
	var VarDeclType: number		= 0;
	var VarDeclName: number		= 1;
	var VarDeclValue: number	= 2;
	var VarDeclScope: number	= 3;

	//Call: Method; //
	var CallExpressionOffset: number	= 0;
	var CallParameterOffset: number		= 1;

	//Decl: var: Method; //
	var FuncDeclReturnType: number	= 0;
	var FuncDeclClass: number		= 1;
	var FuncDeclName: number		= 2;
	var FuncDeclBlock: number		= 3;
	var FuncDeclParam: number		= 4;

	//  spec //
	var TokenFuncSpec: number     = 0;
	var SymbolPatternSpec: number = 1;
	var ExtendedPatternSpec: number = 2;

	var BinaryOperator: number					= 1;
	var LeftJoin: number						= 1 << 1;
	var PrecedenceShift: number					= 2;
	var Precedence_CStyleValue: number			= (1 << PrecedenceShift);
	var Precedence_CPPStyleScope: number		= (50 << PrecedenceShift);
	var Precedence_CStyleSuffixCall: number		= (100 << PrecedenceShift);				/*x(); x[]; x.x x->x x++ */
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
	var IgnoreEmptyPolicy: number           = (1 << 1);
	var AllowEmptyPolicy: number            = (1 << 2);
	var AllowVoidPolicy: number                 = (1 << 3);
	var AllowCoercionPolicy: number             = (1 << 4);

	var GlobalConstName: string					= "global";

	var SymbolList: Array<string> = new Array<string>();
	var SymbolMap: Object  = new Object();

	var AnyGetter: GtMethod = null;

	//flags: var: debug //
	var UseBuiltInTest: boolean	= true;
	var DebugPrintOption: boolean = true;

	//  TestFlags (temporary) //
	var TestTokenizer: number = 1 << 0;
	var TestParseOnly: number = 1 << 1;
	var TestTypeChecker: number = 1 << 2;
	var TestCodeGeneration: number = 1 << 3;


	function println(msg: string): void {
		LangDeps.println(msg);
	}

	function DebugP(msg: string): void {
		if(DebugPrintOption) {
			LangDeps.println("DEBUG" + LangDeps.GetStackInfo(2) + ": " + msg);
		}
	}

	function TODO(msg: string): void {
		LangDeps.println("TODO" + LangDeps.GetStackInfo(2) + ": " + msg);
	}

	function Indent(Level: number): string {
		var i: number = 0;
		var s: string = "";
		while(i < Level) {
			s = s + " ";
			i += 1;
		}
		return s;
	}

	function ListSize(a: any): number {
		return (a == null) ? 0 : a.size();
	}

	function IsFlag(flag: number, flag2: number): boolean {
		return ((flag & flag2) == flag2);
	}

	function FromJavaChar(c: char): number {
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
		assert(IsGetterSymbol(SymbolId));
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
		if(Symbol.length() >= 3 && Symbol.charAt(1) == 'e' && Symbol.charAt(2) == 't') {
			if(Symbol.charAt(0) == 'g' && Symbol.charAt(0) == 'G') {
				Key = Symbol.substring(3);
				Mask = GetterSymbolMask;
			}
			if(Symbol.charAt(0) == 's' && Symbol.charAt(0) == 'S') {
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
		return MaskSymbol(SymbolObject.intValue(), Mask);
	}

	function CanonicalSymbol(Symbol: string): string {
		return Symbol.toLowerCase().replaceAll("_", "");
	}

	function GetCanonicalSymbolId(Symbol: string): number {
		return GetSymbolId(CanonicalSymbol(Symbol), AllowNewId);
	}



	function ApplyTokenFunc(TokenFunc: TokenFunc, TokenContext: TokenContext, ScriptSource: string, Pos: number): number {
		while(TokenFunc != null) {
			var f: GtDelegateToken = TokenFunc.Func;
			var NextIdx: number = LangDeps.ApplyTokenFunc(f.Self, f.Method, TokenContext, ScriptSource, Pos);
			if(NextIdx > Pos) return NextIdx;
			TokenFunc = TokenFunc.ParentFunc;
		}
		return NoMatch;
	}

	function MergeSyntaxPattern(Pattern: SyntaxPattern, Parent: SyntaxPattern): SyntaxPattern {
		if(Parent == null) return Pattern;
		var MergedPattern: SyntaxPattern = new SyntaxPattern(Pattern.PackageNameSpace, Pattern.PatternName, Pattern.MatchFunc, Pattern.TypeFunc);
		MergedPattern.ParentPattern = Parent;
		return MergedPattern;
	}

	function IsEmptyOrError(Tree: SyntaxTree): boolean {
		return Tree == null || Tree.IsEmptyOrError();
	}

	function LinkTree(LastNode: SyntaxTree, Node: SyntaxTree): SyntaxTree {
		Node.PrevTree = LastNode;
		if(LastNode != null) {
			LastNode.NextTree = Node;
		}
		return Node;
	}

	function TreeHead(Tree: SyntaxTree): SyntaxTree {
		if(Tree != null) {
			while(Tree.PrevTree != null) {
				Tree = Tree.PrevTree;
			}
		}
		return Tree;
	}

	function ApplySyntaxPattern(Pattern: SyntaxPattern, LeftTree: SyntaxTree, TokenContext: TokenContext): SyntaxTree {
		var Pos: number = TokenContext.Pos;
		var ParseFlag: number = TokenContext.ParseFlag;
		var CurrentPattern: SyntaxPattern = Pattern;
		while(CurrentPattern != null) {
			var f: GtDelegateMatch = CurrentPattern.MatchFunc;
			TokenContext.Pos = Pos;
			if(CurrentPattern.ParentPattern != null) {
				TokenContext.ParseFlag = ParseFlag | TrackbackParseFlag;
			}
			DebugP("B :" + Indent(TokenContext.IndentLevel) + CurrentPattern + ", next=" + CurrentPattern.ParentPattern);
			TokenContext.IndentLevel += 1;
			var ParsedTree: SyntaxTree = LangDeps.ApplyMatchFunc(f.Self, f.Method, CurrentPattern, LeftTree, TokenContext);
			TokenContext.IndentLevel -= 1;
			if(ParsedTree != null && ParsedTree.IsEmpty()) ParsedTree = null;
			DebugP("E :" + Indent(TokenContext.IndentLevel) + CurrentPattern + " => " + ParsedTree);
			TokenContext.ParseFlag = ParseFlag;
			if(ParsedTree != null) {
				return ParsedTree;
			}
			CurrentPattern = CurrentPattern.ParentPattern;
		}
		if(TokenContext.IsAllowedTrackback()) {
			TokenContext.Pos = Pos;
		}
		if(Pattern == null) {
			DebugP("undefinedpattern: syntax: " + Pattern);
		}
		return TokenContext.ReportExpectedPattern(Pattern);
	}

	function ParseExpression(TokenContext: TokenContext): SyntaxTree {
		var Pattern: SyntaxPattern = TokenContext.GetFirstPattern();
		var LeftTree: SyntaxTree = ApplySyntaxPattern(Pattern, null, TokenContext);
		while (!IsEmptyOrError(LeftTree)) {
			var ExtendedPattern: SyntaxPattern = TokenContext.GetExtendedPattern();
			if(ExtendedPattern == null) {
				DebugP("In $Expression$ ending: " + TokenContext.GetToken());
				break;
			}
			LeftTree = ApplySyntaxPattern(ExtendedPattern, LeftTree, TokenContext);
		}
		return LeftTree;
	}
	
	function TestSyntaxPattern(Context: GtContext, Text: string): void {
		var TestLevel: number = TestTypeChecker;
		var TokenContext: TokenContext = new TokenContext(Context.DefaultNameSpace, Text, 1);
		var ParsedTree: SyntaxTree = ParseExpression(TokenContext);
		assert(ParsedTree != null);
		if((TestLevel & TestTypeChecker) == TestTypeChecker) {
			var Gamma: TypeEnv = new TypeEnv(Context.DefaultNameSpace, null);
			var TNode: TypedNode = Gamma.TypeCheck(ParsedTree, Gamma.AnyType, DefaultTypeCheckPolicy);
			System.out.println(TNode.toString());
		}
	}
	
	//  typing  //
	function ApplyTypeFunc(TypeFunc: GtDelegateType, Gamma: TypeEnv, ParsedTree: SyntaxTree, Type: GtType): TypedNode {
		if(TypeFunc == null || TypeFunc.Method == null){
			DebugP("tryinvoke: toTypeFunc: null");
			return null;
		}
		return LangDeps.ApplyTypeFunc(TypeFunc.Self, TypeFunc.Method, Gamma, ParsedTree, Type);
	}

	function LinkNode(LastNode: TypedNode, Node: TypedNode): TypedNode {
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
	public PresetPattern: SyntaxPattern;

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
		assert(this.IsError());
		return this.ParsedText;
	}

}

class TokenFunc {
	public Func: GtDelegateToken;
	public ParentFunc: TokenFunc;
	
	constructor(Func: GtDelegateToken, Parent: TokenFunc) {
		this.Func = Func;
		this.ParentFunc = Parent;
	}

	public toString(): string {
		return this.Func.Method.toString();
	}
}

class TokenContext {
	public NameSpace: GtNameSpace;
	public SourceList: Array<GtToken>;
	public Pos: number;
	public ParsingLine: number;
	public ParseFlag: number;
	public IndentLevel: number = 0;

	constructor(NameSpace: GtNameSpace, Text: string, FileLine: number) {
		this.NameSpace = NameSpace;
		this.SourceList = new Array<GtToken>();
		this.Pos = 0;
		this.ParsingLine = FileLine;
		this.ParseFlag = 0;
		AddNewToken(Text, SourceTokenFlag, null);
		this.IndentLevel = 0;
	}

	public AddNewToken(Text: string, TokenFlag: number, PatternName: string): GtToken {
		var Token: GtToken = new GtToken(Text, this.ParsingLine);
		Token.TokenFlag |= TokenFlag;
		if(PatternName != null) {
			Token.PresetPattern = this.NameSpace.GetPattern(PatternName);
			assert(Token.PresetPattern != null);
		}
		// DebugP("<< " + Text + " : " + PatternName); //
		this.SourceList.add(Token);
		return Token;
	}

	public FoundWhiteSpace(): void {
		var Token: GtToken = GetToken();
		Token.TokenFlag |= WhiteSpaceTokenFlag;
	}

	public FoundLineFeed(line: number): void {
		this.ParsingLine += line;
	}

	public ReportTokenError(Level: number, Message: string, TokenText: string): void {
		var Token: GtToken = this.AddNewToken(TokenText, 0, "$Error$");
		this.NameSpace.ReportError(Level, Token, Message);
	}

	public NewErrorSyntaxTree(Token: GtToken, Message: string): SyntaxTree {
		if(!IsAllowedTrackback()) {
			this.NameSpace.ReportError(ErrorLevel, Token, Message);
			var ErrorTree: SyntaxTree = new SyntaxTree(Token.PresetPattern, this.NameSpace, Token, null);
			return ErrorTree;
		}
		return null;
	}

	public GetBeforeToken(): GtToken {
		var pos: number = this.Pos - 1;
		while(pos >= 0) {
			var Token: GtToken = this.SourceList.get(pos);
			if(IsFlag(Token.TokenFlag, IndentTokenFlag)) {
				pos -= 1;
				continue;
			}
			return Token;
		}
		return null;
	}

	public ReportExpectedToken(TokenText: string): SyntaxTree {
		if(!IsAllowedTrackback()) {
			var Token: GtToken = GetBeforeToken();
			if(Token != null) {
				return NewErrorSyntaxTree(Token, TokenText + "expected: is after " + Token.ParsedText);
			}
			Token = GetToken();
			assert(Token != NullToken);
			return NewErrorSyntaxTree(Token, TokenText + "expected: is at " + Token.ParsedText);
		}
		return null;
	}

	public ReportExpectedPattern(Pattern: SyntaxPattern): SyntaxTree {
		return ReportExpectedToken(Pattern.PatternName);
	}

	private DispatchFunc(ScriptSource: string, GtChar: number, pos: number): number {
		var TokenFunc: TokenFunc = this.NameSpace.GetTokenFunc(GtChar);
		var NextIdx: number = ApplyTokenFunc(TokenFunc, this, ScriptSource, pos);
		if(NextIdx == NoMatch) {
			DebugP("undefined tokenizer: " + ScriptSource.charAt(pos));
			this.AddNewToken(ScriptSource.substring(pos), 0, null);
			return ScriptSource.length();
		}
		return NextIdx;
	}

	private Tokenize(ScriptSource: string, CurrentLine: number): void {
		var currentPos: number = 0;
		var len: number = ScriptSource.length();
		this.ParsingLine = CurrentLine;
		while(currentPos < len) {
			var gtCode: number = FromJavaChar(ScriptSource.charAt(currentPos));
			var nextPos: number = this.DispatchFunc(ScriptSource, gtCode, currentPos);
			if(currentPos >= nextPos) {
				break;
			}
			currentPos = nextPos;
		}
		this.Dump();
	}

	public GetToken(): GtToken {
		while((this.Pos < this.SourceList.size())) {
			var Token: GtToken = this.SourceList.get(this.Pos);
			if(Token.IsSource()) {
				this.SourceList.remove(this.SourceList.size()-1);
				this.Tokenize(Token.ParsedText, Token.FileLine);
				Token = this.SourceList.get(this.Pos);
			}
			if(IsFlag(this.ParseFlag, SkipIndentParseFlag) && Token.IsIndent()) {
				this.Pos += 1;
				continue;
			}
			return Token;
		}
		return NullToken;
	}

	public HasNext(): boolean {
		return (this.GetToken() != NullToken);
	}

	public Next(): GtToken {
		var Token: GtToken = this.GetToken();
		this.Pos += 1;
		return Token;
	}

	public GetPattern(PatternName: string): SyntaxPattern {
		return this.NameSpace.GetPattern(PatternName);
	}

	public GetFirstPattern(): SyntaxPattern {
		var Token: GtToken = GetToken();
		if(Token.PresetPattern != null) {
			return Token.PresetPattern;
		}
		var Pattern: SyntaxPattern = this.NameSpace.GetPattern(Token.ParsedText);
		if(Pattern == null) {
			return this.NameSpace.GetPattern("$Symbol$");
		}
		return Pattern;
	}

	public GetExtendedPattern(): SyntaxPattern {
		var Token: GtToken = GetToken();
		var Pattern: SyntaxPattern = this.NameSpace.GetExtendedPattern(Token.ParsedText);
		return Pattern;
	}

	public MatchToken(TokenText: string): boolean {
		var Token: GtToken = GetToken();
		if(Token.EqualsText(TokenText)) {
			this.Pos += 1;
			return true;
		}
		return false;
	}

	public GetMatchedToken(TokenText: string): GtToken {
		var Token: GtToken = GetToken();
		while(Token != NullToken) {
			this.Pos += 1;
			if(Token.EqualsText(TokenText)) {
				break;
			}
			Token = GetToken();
		}
		return Token;
	}

	public IsAllowedTrackback(): boolean {
		return IsFlag(this.ParseFlag, TrackbackParseFlag);
	}

	ParsePatternAfter(LeftTree: SyntaxTree, PatternName: string, IsOptional: boolean): SyntaxTree {
		var Pos: number = this.Pos;
		var ParseFlag: number = this.ParseFlag;
		var Pattern: SyntaxPattern = this.GetPattern(PatternName);
		if(IsOptional) {
			this.ParseFlag |= TrackbackParseFlag;
		}
		var SyntaxTree: SyntaxTree = ApplySyntaxPattern(Pattern, LeftTree, this);
		this.ParseFlag = ParseFlag;
		if(SyntaxTree != null) {
			return SyntaxTree;
		}
		this.Pos = Pos;
		return null;
	}

	ParsePattern(PatternName: string, IsOptional: boolean): SyntaxTree {
		return this.ParsePatternAfter(null, PatternName, IsOptional);
	}

	SkipEmptyStatement(): boolean {
		var Token: GtToken = null;
		while((Token = GetToken()) != NullToken) {
			if(Token.IsIndent() || Token.IsDelim()) {
				this.Pos += 1;
				continue;
			}
			break;
		}
		return (Token != NullToken);
	}

	public Dump(): void {
		var pos: number = this.Pos;
		while(pos < this.SourceList.size()) {
			var token: GtToken = this.SourceList.get(pos);
			DebugP("["+pos+"]\t" + token + " : " + token.PresetPattern);
			pos += 1;
		}
	}
}

class SyntaxPattern {
	public PackageNameSpace: GtNameSpace;
	public PatternName: string;
	SyntaxFlag: number;
	public MatchFunc: GtDelegateMatch;
	public TypeFunc: GtDelegateType;
	public ParentPattern: SyntaxPattern;
	
	constructor(NameSpace: GtNameSpace, PatternName: string, MatchFunc: GtDelegateMatch, TypeFunc: GtDelegateType) {
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

	public IsLeftJoin(Right: SyntaxPattern): boolean {
		var left: number = this.SyntaxFlag >> PrecedenceShift;
		var right: number = Right.SyntaxFlag >> PrecedenceShift;
		return (left < right || (left == right && IsFlag(this.SyntaxFlag, LeftJoin) && IsFlag(Right.SyntaxFlag, LeftJoin)));
	}
}

class SyntaxTree {
	public ParentTree: SyntaxTree;
	public PrevTree: SyntaxTree;
	public NextTree: SyntaxTree;

	public NameSpace: GtNameSpace;
	public Pattern: SyntaxPattern;
	public KeyToken: GtToken;
	public TreeList: Array<SyntaxTree>;
	public ConstValue: object;

	constructor(Pattern: SyntaxPattern, NameSpace: GtNameSpace, KeyToken: GtToken, ConstValue: object) {
		this.NameSpace = NameSpace;
		this.KeyToken = KeyToken;
		this.Pattern = Pattern;
		this.ParentTree = null;
		this.PrevTree = null;
		this.NextTree = null;
		this.TreeList = null;
		this.ConstValue = ConstValue;
	}

	public toString(): string {
		var s: string = "(" + this.KeyToken.ParsedText;
		var i: number = 0;
		while(i < ListSize(this.TreeList)) {
			var SubTree: SyntaxTree = this.TreeList.get(i);
			var Entry: string = SubTree.toString();
			if(ListSize(SubTree.TreeList) == 0) {
				Entry = SubTree.KeyToken.ParsedText;
			}
			s = s + " " + Entry;
			i += 1;
		}
		return s + ")";
	}

	public IsError(): boolean {
		return this.KeyToken.IsError();
	}

	public ToError(Token: GtToken): void {
		assert(Token.IsError());
		this.KeyToken = Token;
		this.TreeList = null;
	}

	public IsEmpty(): boolean {
		return this.KeyToken == NullToken;
	}

	public ToEmpty(): void {
		this.KeyToken = NullToken;
		this.TreeList = null;
		this.Pattern = this.NameSpace.GetPattern("$Empty$");
	}

	public IsEmptyOrError(): boolean {
		return this.KeyToken == NullToken || this.KeyToken.IsError();
	}

	public ToEmptyOrError(ErrorTree: SyntaxTree): void {
		if(ErrorTree == null) {
			ToEmpty();
		}
		else {
			ToError(ErrorTree.KeyToken);
		}
	}

	public GetSyntaxTreeAt(Index: number): SyntaxTree {
		return this.TreeList.get(Index);
	}

	public SetSyntaxTreeAt(Index: number, Tree: SyntaxTree): void {
		if(!IsError()) {
			if(Tree.IsError()) {
				ToError(Tree.KeyToken);
			}
			else {
				if(Index >= 0) {
					if(this.TreeList == null) {
						this.TreeList = new Array<SyntaxTree>();
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

	public SetMatchedPatternAt(Index: number, TokenContext: TokenContext, PatternName: string,  IsOptional: boolean): void {
		if(!IsEmptyOrError()) {
			var ParsedTree: SyntaxTree = TokenContext.ParsePattern(PatternName, IsOptional);
			if(ParsedTree != null) {
				SetSyntaxTreeAt(Index, ParsedTree);
			} else if(ParsedTree == null && !IsOptional) {
				ToEmpty();
			}
		}
	}

	public SetMatchedTokenAt(Index: number, TokenContext: TokenContext, TokenText: string, IsOptional: boolean): void {
		if(!IsEmptyOrError()) {
			var Pos: number = TokenContext.Pos;
			var Token: GtToken = TokenContext.Next();
			if(Token.ParsedText.equals(TokenText)) {
				SetSyntaxTreeAt(Index, new SyntaxTree(null, TokenContext.NameSpace, Token, null));
			}
			else {
				TokenContext.Pos = Pos;
				if(!IsOptional) {
					ToEmptyOrError(TokenContext.ReportExpectedToken(TokenText));
				}
			}
		}
	}

	public AppendParsedTree(Tree: SyntaxTree): void {
		if(!IsError()) {
			if(Tree.IsError()) {
				ToError(Tree.KeyToken);
			}
			else {
				if(this.TreeList == null) {
					this.TreeList = new Array<SyntaxTree>();
				}
				this.TreeList.add(Tree);
			}
		}
	}

	TypeNodeAt(Index: number, Gamma: TypeEnv, Type: GtType, TypeCheckPolicy: number): TypedNode {
		if(this.TreeList != null && Index < this.TreeList.size()) {
			var NodeObject: SyntaxTree = this.TreeList.get(Index);
			var TypedNode: TypedNode = Gamma.TypeCheck(NodeObject, Type, TypeCheckPolicy);
			return TypedNode;
		}
		if(!IsFlag(TypeCheckPolicy, AllowEmptyPolicy) && !IsFlag(TypeCheckPolicy, IgnoreEmptyPolicy)) {
			Gamma.GammaNameSpace.ReportError(ErrorLevel, this.KeyToken, this.KeyToken.ParsedText + "more: needsat: expression " + Index);
			return Gamma.Generator.CreateErrorNode(Type, this); //  TODO, "syntaxerror: tree: " + Index); //
		}
		return null;
	}
}

/* typing */

/* builder */
class GtObject {
	public Type: GtType;
	constructor(Type: GtType) {
		this.Type = Type;
	}
}

class GtType {
	public PackageNameSpace: GtNameSpace;
	ClassFlag: number;
	public Context: GtContext;
	ClassId: number;
	public ShortClassName: string;
	SuperClass: GtType;
	ClassParam: GtParam;
	SearchSimilarClass: GtType;
	BaseClass: GtType;
	public SearchSuperMethodClass: GtType;
	public DefaultNullValue: object;
	public LocalSpec: object;

	constructor(Context: GtContext, ClassFlag: number, ClassName: string, DefaultNullValue: object) {
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

	public toString(): string {
		return this.ShortClassName;
	}

	public Accept(Type: GtType): boolean {
		if(this == Type) {
			return true;
		}
		return false;
	}

	public GetGetter(Name: string): GtMethod {
		return AnyGetter;
	}

	GetMethodId(name: string): string {
		return "" + this.ClassId + name;
	}
}

class GtLayer {
	/*public*/Name: string;
	/*public*/MethodTable: Object;
	constructor(Name: string) {
		this.Name = Name;
		this.MethodTable = new Object();
	}
	
	LookupUniqueMethod(Name: string): GtMethod {
		return <GtMethod>this.MethodTable.get(Name);
	}
	
	LookupMethod(Class: GtType, Name: string): GtMethod {
		var Id: string = Class.GetMethodId(Name);
		var Method: GtMethod = <GtMethod>this.MethodTable.get(Id);
		return Method;
	}

	DefineMethod(Method: GtMethod): void {
		var Class: GtType = Method.GetRecvType();
		var Id: string = Class.GetMethodId(Method.MethodName);
		var MethodPrev: GtMethod = <GtMethod>this.MethodTable.get(Id);
		Method.ElderMethod = MethodPrev;
		assert(Method.Layer == null);
		Method.Layer = this;
		this.MethodTable.put(Id, Method);
// 		MethodPrev = this.LookupUniqueMethod(Method.MethodName); //
// 		if(MethodPrev != null) { //
// 			TODO("check identity"); //
// 			this.MethodTable.remove(Id); //
// 		} //
	}
}

class GtParam {
	public ParamSize: number;
	public Names: Array<string>;
	public Types: Array<GtType>;

	constructor(TypeList: Array<GtType>, NameList: Array<string>) {
		this.Types = TypeList;
		this.Names = NameList;
		this.ParamSize = TypeList.size() - 1;
	}

	Equals(Other: GtParam): boolean {
		var ParamSize: number = Other.ParamSize;
		if(ParamSize == this.ParamSize) {
			var i: number = 0;
			while(i < ParamSize) {
				if(this.Types.get(i) != Other.Types.get(i)) {
					return false;
				}
				i += 1;
			}
			return true;
		}
		return false;
	}

	Match(ParamSize: number, ParamList: Array<GtType>): boolean {
		var i: number = 0;
		while(i + 1 < ParamSize) {
			var ParamType: GtType = this.Types.get(i+1);
			var GivenType: GtType = ParamList.get(i);
			// if(!ParamType.Match(GivenType)) {} //
			if(!ParamType.equals(GivenType)) { //replace: FIXME Type.equals => GtType.Match //
				return false;
			}
			i += 1;
		}
		return true;
	}

}

class GtDef {

	public MakeDefinition(NameSpace: GtNameSpace): void {

	}

}

class GtMethod extends GtDef {
	public Layer: GtLayer;
	public MethodFlag: number;
	public MethodName: string;
	MethodSymbolId: number;
	public Types: GtType[];
	public ElderMethod: GtMethod;

	constructor(MethodFlag: number, MethodName: string, ParamList: Array<GtType>) {
		this.MethodFlag = MethodFlag;
		this.MethodName = MethodName;
		this.MethodSymbolId = GetCanonicalSymbolId(MethodName);
		this.Types = LangDeps.CompactTypeList(ParamList);
		assert(this.Types.length > 0);
		this.Layer = null;
		this.ElderMethod = null;
	}

	public toString(): string {
		var s: string = this.MethodName + "(";
		var i: number = 0;
		while(i < this.GetParamSize()) {
			var ParamType: GtType = this.GetParamType(i);
			if(i > 0) {
				s += ", ";
			}
			s += ParamType.ShortClassName;
			i += 1;
		}
		return s + ": " + this.GetReturnType();
	}

	public Is(Flag: number): boolean {
		return IsFlag(this.MethodFlag, Flag);
	}
	
	GetReturnType(): GtType {
		return this.Types[0];
	}

	GetRecvType(): GtType {
		return (this.Types.length == 1) ? this.Types[0].Context.VoidType : this.Types[1];
	}

	GetParamSize(): number {
		return this.Types.length - 1;
	}

	GetParamType(ParamIdx: number): GtType {
		return this.Types[ParamIdx+1];
	}
}

class GtMethod2 extends GtDef {

// 	Match(Other: GtMethod): boolean { //
// 		return (this.MethodName.equals(Other.MethodName) && this.Param.Equals(Other.Param)); //
// 	} //
//  //
// 	public Match(MethodName: string, ParamSize: number): boolean { //
// 		if(MethodName.equals(this.MethodName)) { //
// 			if(ParamSize == -1) { //
// 				return true; //
// 			} //
// 			if(this.Param.ParamSize == ParamSize) { //
// 				return true; //
// 			} //
// 		} //
// 		return false; //
// 	} //
//  //
// 	public Match(MethodName: string, ParamSize: number, RequestTypes: GtType[]): boolean { //
// 		if(!this.Match(MethodName, ParamSize)) { //
// 			return false; //
// 		} //
// 		for(number i = 0; i < RequestTypes.length; i++) { //
// 			if(RequestTypes.equals(this.GetParamType(this.ClassInfo, i)) == false) { //
// 				return false; //
// 			} //
// 		} //
// 		return true; //
// 	} //

// 	public Eval(ParamData: object[]): object { //
// 		//number ParamSize = this.Param.GetParamSize(); //
// 		//GtDebug.P("ParamSize: " + ParamSize); //
// 		return this.MethodInvoker.Invoke(ParamData); //
// 	} //
//  //
// 	public GtMethod(number MethodFlag,ClassInfo: GtType,MethodName: string,Param: GtParam,LazyNameSpace: GtNameSpace,SourceList: Tokens) { //
// 		this(MethodFlag, ClassInfo, MethodName, Param, null); //
// 		this.LazyNameSpace = LazyNameSpace; //
// 		this.SourceList = SourceList; //
// 	} //

	public DoCompilation(): void {
// 		if(this.MethodInvoker != null) { //
// 			return; //
// 		} //
// 		SyntaxTree Tree = this.ParsedTree; //
// 		GtNameSpace NS = this.LazyNameSpace; //
// 		if(Tree == null) { //
// 			Tokens BufferList = new Tokens(); //
// 			NS.PreProcess(this.SourceList, 0, this.SourceList.size(), BufferList); //
// 			Tree = SyntaxTree.ParseNewNode(NS, null, BufferList, 0, BufferList.size(), AllowEmpty); //
// 			println("untyped tree: " + Tree); //
// 		} //
// 		TypeEnv Gamma = new TypeEnv(this.LazyNameSpace, this); //
// 		TypedNode TNode = TypeEnv.TypeCheck(Gamma, Tree, Gamma.VoidType, DefaultTypeCheckPolicy); //
// 		GtBuilder Builder = this.LazyNameSpace.GetBuilder(); //
// 		this.MethodInvoker = Builder.Build(NS, TNode, this); //
	}
}

class VariableInfo {
	public Type: GtType;
	public Name: string;
	public LocalName: string;

	constructor(Type: GtType, Name: string, Index: number) {
		this.Type = Type;
		this.Name = Name;
		this.LocalName = Name + Index;
	}
}

class GtDelegate {
	public Method: GtMethod;
	public Callee: object;
	public Type: GtType;
}

class TypeEnv {
	public GammaNameSpace: GtNameSpace;
	public Generator: GreenTeaGenerator;

	public Method: GtMethod;
	public ReturnType: GtType;
	public ThisType: GtType;
// 	LocalStackList: any; //
	public StackTopIndex: number;
	public LocalStackList: Array<VariableInfo>;

	/*convinient: forcut: short */
	VoidType: GtType;
	BooleanType: GtType;
	IntType: GtType;
	StringType: GtType;
	VarType: GtType;
	AnyType: GtType;

	constructor(GammaNameSpace: GtNameSpace, Method: GtMethod) {
		this.GammaNameSpace = GammaNameSpace;
		this.Generator      = GammaNameSpace.GtContext.Generator;

		this.VoidType = GammaNameSpace.GtContext.VoidType;
		this.BooleanType = GammaNameSpace.GtContext.BooleanType;
		this.IntType = GammaNameSpace.GtContext.IntType;
		this.StringType = GammaNameSpace.GtContext.StringType;
		this.VarType = GammaNameSpace.GtContext.VarType;
		this.AnyType = GammaNameSpace.GtContext.AnyType;
		
		this.Method = Method;
		this.LocalStackList = new Array<VariableInfo>();
		this.StackTopIndex = 0;
		if(Method != null) {
			this.InitMethod(Method);
		} else {
			//  global //
			this.ThisType = GammaNameSpace.GetGlobalObject().Type;
			this.AppendDeclaredVariable(this.ThisType, "this");
		}
	}

	private InitMethod(Method: GtMethod): void {
		this.ReturnType = Method.GetReturnType();
// 		this.ThisType = Method.ClassInfo; //
// 		if(!Method.Is(StaticMethod)) { //
// 			this.AppendDeclaredVariable(Method.ClassInfo, "this"); //
// 			var Param: GtParam = Method.Param; //
// 			var i: number = 0; //
// 			while(i < Param.ParamSize) { //
// 				this.AppendDeclaredVariable(Param.Types.get(i), Param.Names.get(i)); //
// 				i += 1; //
// 			} //
// 		} //
	}

	public AppendDeclaredVariable(Type: GtType, Name: string): boolean {
		var VarInfo: VariableInfo = new VariableInfo(Type, Name, this.StackTopIndex);
		if(this.StackTopIndex < this.LocalStackList.size()) {
			this.LocalStackList.add(VarInfo);
		}
		else {
			this.LocalStackList.add(VarInfo);
		}
		this.StackTopIndex += 1;
		return true;
	}

	public LookupDeclaredVariable(Symbol: string): VariableInfo {
		var i: number = this.StackTopIndex - 1;
		while(i >= 0) {
			var VarInfo: VariableInfo = this.LocalStackList.get(i);
			if(VarInfo.Name.equals(Symbol)) {
				return VarInfo;
			}
			i -= 1;
		}
		return null;
	}

	public GuessType(Value: object): GtType {
		TODO("GuessType");
		return this.AnyType;
	}

	public LookupDelegate(Name: string): GtDelegate {
		TODO("finding delegate");
		return null;
	}

	public DefaultValueConstNode(ParsedTree: SyntaxTree, Type: GtType): TypedNode {
		if(Type.DefaultNullValue != null) {
			return this.Generator.CreateConstNode(Type, ParsedTree, Type.DefaultNullValue);
		}
		return CreateErrorNode(ParsedTree, "undefinedvalue: initial of " + Type);
	}

	public CreateErrorNode(ParsedTree: SyntaxTree, Message: string): TypedNode {
		this.GammaNameSpace.ReportError(ErrorLevel, ParsedTree.KeyToken, Message);
		return this.Generator.CreateErrorNode(this.VoidType, ParsedTree);
	}

	/* typing */
	public TypeEachNode(Tree: SyntaxTree, Type: GtType): TypedNode {
		var Node: TypedNode = ApplyTypeFunc(Tree.Pattern.TypeFunc, this, Tree, Type);
		if(Node == null) {
			Node = this.CreateErrorNode(Tree, "undefinedchecker: type: " + Tree.Pattern);
		}
		return Node;
	}

	public TypeCheckEachNode(Tree: SyntaxTree, Type: GtType, TypeCheckPolicy: number): TypedNode {
		var Node: TypedNode = this.TypeEachNode(Tree, Type);
		if(Node.IsError()) {
			return Node;
		}
		return Node;
	}

	public TypeCheck(ParsedTree: SyntaxTree, Type: GtType, TypeCheckPolicy: number): TypedNode {
		return this.TypeBlock(ParsedTree, Type);
	}

	public TypeBlock(ParsedTree: SyntaxTree, Type: GtType): TypedNode {
		var StackTopIndex: number = this.StackTopIndex;
		var LastNode: TypedNode = null;
		while(ParsedTree != null) {
			var CurrentType: GtType = (ParsedTree.NextTree != null) ? this.VoidType : Type;
			var TypedNode: TypedNode = this.TypeCheckEachNode(ParsedTree, CurrentType, DefaultTypeCheckPolicy);
			/*local*/LastNode = LinkNode(LastNode, TypedNode);
			if(TypedNode.IsError()) {
				break;
			}
			ParsedTree = ParsedTree.NextTree;
		}
		this.StackTopIndex = StackTopIndex;
		return (LastNode == null) ? null : LastNode.MoveHeadNode();
	}
}

//  NameSpace //

class GtSpec {
	public SpecType: number;
	public SpecKey: string;
	public SpecBody: object;

	constructor(SpecType: number, SpecKey: string, SpecBody: object) {
		this.SpecType = SpecType;
		this.SpecKey  = SpecKey;
		this.SpecBody = SpecBody;
	}
}

class GtNameSpace {
	public GtContext: GtContext;
	public PackageName: string;
	public ParentNameSpace: GtNameSpace;
	public ImportedNameSpaceList: Array<GtNameSpace>;
	public PublicSpecList: Array<GtSpec>;
	public PrivateSpecList: Array<GtSpec>;

	TokenMatrix: TokenFunc[];
	SymbolPatternTable: Object;
	ExtendedPatternTable: Object;

	constructor(GtContext: GtContext, ParentNameSpace: GtNameSpace) {
		this.GtContext = GtContext;
		this.ParentNameSpace = ParentNameSpace;
		if(ParentNameSpace != null) {
			this.PackageName = ParentNameSpace.PackageName;
		}
		this.ImportedNameSpaceList = null;
		this.PublicSpecList = new Array<GtSpec>();
		this.PrivateSpecList = null;
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
				while(j < Spec.SpecKey.length()) {
					var kchar: number = FromJavaChar(Spec.SpecKey.charAt(j));
					var Func: GtDelegateToken = <GtDelegateToken>Spec.SpecBody;
					this.TokenMatrix[kchar] = LangDeps.CreateOrReuseTokenFunc(Func, this.TokenMatrix[kchar]);
					j += 1;
				}
			}
			i += 1;
		}
	}

	private RemakeTokenMatrix(NameSpace: GtNameSpace): void {
		if(NameSpace.ParentNameSpace != null) {
			RemakeTokenMatrix(NameSpace.ParentNameSpace);
		}
		RemakeTokenMatrixEach(NameSpace);
		var i: number = 0;
		while(i < ListSize(NameSpace.ImportedNameSpaceList)) {
			var Imported: GtNameSpace = NameSpace.ImportedNameSpaceList.get(i);
			RemakeTokenMatrixEach(Imported);
			i += 1;
		}
	}

	public GetTokenFunc(GtChar2: number): TokenFunc {
		if(this.TokenMatrix == null) {
			this.TokenMatrix = new TokenFunc[MaxSizeOfChars];
			RemakeTokenMatrix(this);
		}
		return this.TokenMatrix[GtChar2];
	}

	public DefineTokenFunc(keys: string, f: GtDelegateToken): void {
		this.PublicSpecList.add(new GtSpec(TokenFuncSpec, keys, f));
		this.TokenMatrix = null;
	}

	private TableAddSpec(Table: Object, Spec: GtSpec): void {
		var Body: object = Spec.SpecBody;
		if(Body instanceof SyntaxPattern) {
			var Parent: object = Table.get(Spec.SpecKey);
			if(Parent instanceof SyntaxPattern) {
				Body = MergeSyntaxPattern(<SyntaxPattern>Body, <SyntaxPattern>Parent);
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

	public GetSymbol(Key: string): object {
		if(this.SymbolPatternTable == null) {
			this.SymbolPatternTable = new Object();
			this.ExtendedPatternTable = new Object();
			this.RemakeSymbolTable(this);
		}
		return this.SymbolPatternTable.get(Key);
	}

	public GetPattern(PatternName: string): SyntaxPattern {
		var Body: object = this.GetSymbol(PatternName);
		return (Body instanceof SyntaxPattern) ? <SyntaxPattern>Body : null;
	}

	public GetExtendedPattern(PatternName: string): SyntaxPattern {
		if(this.ExtendedPatternTable == null) {
			this.SymbolPatternTable = new Object();
			this.ExtendedPatternTable = new Object();
			this.RemakeSymbolTable(this);
		}
		var Body: object = this.ExtendedPatternTable.get(PatternName);
		return (Body instanceof SyntaxPattern) ? <SyntaxPattern>Body : null;
	}

	public DefineSymbol(Key: string, Value: object): void {
		var Spec: GtSpec = new GtSpec(SymbolPatternSpec, Key, Value);
		this.PublicSpecList.add(Spec);
		if(this.SymbolPatternTable != null) {
			this.TableAddSpec(this.SymbolPatternTable, Spec);
		}
	}

	public DefinePrivateSymbol(Key: string, Value: object): void {
		var Spec: GtSpec = new GtSpec(SymbolPatternSpec, Key, Value);
		if(this.PrivateSpecList == null) {
			this.PrivateSpecList = new Array<GtSpec>();
		}
		this.PrivateSpecList.add(Spec);
		if(this.SymbolPatternTable != null) {
			this.TableAddSpec(this.SymbolPatternTable, Spec);
		}
	}

	public DefineSyntaxPattern(PatternName: string, MatchFunc: GtDelegateMatch, TypeFunc: GtDelegateType): void {
		var Pattern: SyntaxPattern = new SyntaxPattern(this, PatternName, MatchFunc, TypeFunc);
		var Spec: GtSpec = new GtSpec(SymbolPatternSpec, PatternName, Pattern);
		this.PublicSpecList.add(Spec);
		if(this.SymbolPatternTable != null) {
			this.TableAddSpec(this.SymbolPatternTable, Spec);
		}
	}

	public DefineExtendedPattern(PatternName: string, SyntaxFlag: number, MatchFunc: GtDelegateMatch, TypeFunc: GtDelegateType): void {
		var Pattern: SyntaxPattern = new SyntaxPattern(this, PatternName, MatchFunc, TypeFunc);
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
				this.GtContext.ClassNameMap.put(this.PackageName + "." + ClassInfo.ShortClassName, ClassInfo);
			}
			this.GtContext.Generator.AddClass(ClassInfo);
		}
		this.DefineSymbol(ClassInfo.ShortClassName, ClassInfo);
		return ClassInfo;
	}

	// object: Global //
	public CreateGlobalObject(ClassFlag: number, ShortName: string): GtObject {
		var NewClass: GtType = new GtType(this.GtContext, ClassFlag, ShortName, null);
		var GlobalObject: GtObject = new GtObject(NewClass);
		NewClass.DefaultNullValue = GlobalObject;
		return GlobalObject;
	}

	public GetGlobalObject(): GtObject {
		var GlobalObject: object = this.GetSymbol(GlobalConstName);
		if(GlobalObject == null || !(GlobalObject instanceof GtObject)) {
			GlobalObject = this.CreateGlobalObject(SingletonClass, "global");
			this.DefinePrivateSymbol(GlobalConstName, GlobalObject);
		}
		return <GtObject> GlobalObject;
	}

	public ImportNameSpace(ImportedNameSpace: GtNameSpace): void {
		if(this.ImportedNameSpaceList == null) {
			this.ImportedNameSpaceList = new Array<GtNameSpace>();
			this.ImportedNameSpaceList.add(ImportedNameSpace);
		}
		this.TokenMatrix = null;
		this.SymbolPatternTable = null;
		this.ExtendedPatternTable = null;
	}

	public Eval(ScriptSource: string, FileLine: number, Generator: GreenTeaGenerator): object {
		var ResultValue: object = null;
		DebugP("Eval: " + ScriptSource);
		var TokenContext: TokenContext = new TokenContext(this, ScriptSource, FileLine);
		while(TokenContext.HasNext()) {
			var Tree: SyntaxTree = ParseExpression(TokenContext);
			DebugP("untyped tree: " + Tree);
			var Gamma: TypeEnv = new TypeEnv(this, null);
			var Node: TypedNode = Gamma.TypeCheckEachNode(Tree, Gamma.VoidType, DefaultTypeCheckPolicy);
			ResultValue = Generator.Eval(Node);
		}
		return ResultValue;
	}

	public LookupMethod(MethodName: string, ParamSize: number): GtMethod {
		// FIXME //
		// MethodName = "ClassName.MethodName"; //
		// 1. (ClassName, MethodName) = MethodName.split(".") //
		// 2. MethodName(arg0, arg1, ... , arg_ParamSize): find //
		return null;
	}

	private GetSourcePosition(FileLine: number): string {
		return "(eval:" + <number> FileLine + ")";
	}

	public ReportError(Level: number, Token: GtToken, Message: string): string {
		if(!Token.IsError()) {
			if(Level == ErrorLevel) {
				Message = "(error) " + this.GetSourcePosition(Token.FileLine) + " " + Message;
				Token.ToErrorToken(Message);
			} else if(Level == WarningLevel) {
				Message = "(warning) " + this.GetSourcePosition(Token.FileLine) + " " + Message;
			} else if(Level == InfoLevel) {
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

class KonohaGrammar extends GtGrammar {

	//  Token //
	static WhiteSpaceToken(TokenContext: TokenContext, SourceText: string, pos: number): number {
		TokenContext.FoundWhiteSpace();
		while(pos < SourceText.length()) {
			var ch: char = SourceText.charAt(pos);
			if(!LangDeps.IsWhitespace(ch)) {
				break;
			}
			pos += 1;
		}
		return pos;
	}

	static IndentToken(TokenContext: TokenContext, SourceText: string, pos: number): number {
		var LineStart: number = pos + 1;
		TokenContext.FoundLineFeed(1);
		pos = pos + 1;
		while(pos < SourceText.length()) {
			var ch: char = SourceText.charAt(pos);
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
	}

	static SingleSymbolToken(TokenContext: TokenContext, SourceText: string, pos: number): number {
		TokenContext.AddNewToken(SourceText.substring(pos, pos + 1), 0, null);
		return pos + 1;
	}

	static SymbolToken(TokenContext: TokenContext, SourceText: string, pos: number): number {
		var start: number = pos;
		while(pos < SourceText.length()) {
			var ch: char = SourceText.charAt(pos);
			if(!LangDeps.IsLetter(ch) && !LangDeps.IsDigit(ch) && ch != '_') {
				break;
			}
			pos += 1;
		}
		TokenContext.AddNewToken(SourceText.substring(start, pos), 0, null);
		return pos;
	}

	static OperatorToken(TokenContext: TokenContext, SourceText: string, pos: number): number {
		var NextPos: number = pos + 1;
		while(NextPos < SourceText.length()) {
			var ch: char = SourceText.charAt(NextPos);
			if(LangDeps.IsWhitespace(ch) || LangDeps.IsLetter(ch) || LangDeps.IsDigit(ch)) {
				break;
			}
			var Sub: string = SourceText.substring(pos, pos + 1);
			if(TokenContext.NameSpace.GetExtendedPattern(Sub) == null) {
				NextPos += 1;
				continue;
			}
			break;
		}
		TokenContext.AddNewToken(SourceText.substring(pos, NextPos), 0, null);
		return NextPos;
	}
	
	static NumberLiteralToken(TokenContext: TokenContext, SourceText: string, pos: number): number {
		var start: number = pos;
		while(pos < SourceText.length()) {
			var ch: char = SourceText.charAt(pos);
			if(!LangDeps.IsDigit(ch)) {
				break;
			}
			pos += 1;
		}
		TokenContext.AddNewToken(SourceText.substring(start, pos), 0, "$IntegerLiteral$");
		return pos;
	}

	static StringLiteralToken(TokenContext: TokenContext, SourceText: string, pos: number): number {
		var start: number = pos;
		var prev: char = '"';
		while(pos < SourceText.length()) {
			var ch: char = SourceText.charAt(pos);
			if(ch == '"' && prev != '\\') {
				TokenContext.AddNewToken(SourceText.substring(start, pos+1), 0, "$StringLiteral$");
				return pos + 1;
			}
			if(ch == '\n') {
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

	static ParseType(Pattern: SyntaxPattern, LeftTree: SyntaxTree, TokenContext: TokenContext): SyntaxTree {
		var Token: GtToken = TokenContext.Next();
		var ConstValue: object = TokenContext.NameSpace.GetSymbol(Token.ParsedText);
		if(ConstValue instanceof GtType) {
			return new SyntaxTree(Pattern, TokenContext.NameSpace, Token, ConstValue);
		}
		return null; // Matched: Not //
	}

	static TypeConst(Gamma: TypeEnv, ParsedTree: SyntaxTree, Type: GtType): TypedNode {
		return Gamma.Generator.CreateConstNode(Gamma.GuessType(ParsedTree.ConstValue), ParsedTree, ParsedTree.ConstValue);
	}

	static ParseSymbol(Pattern: SyntaxPattern, LeftTree: SyntaxTree, TokenContext: TokenContext): SyntaxTree {
		var TypeTree: SyntaxTree = TokenContext.ParsePattern("$Type$", Optional);
		if(TypeTree != null) {
			var DeclTree: SyntaxTree = TokenContext.ParsePatternAfter(TypeTree, "$VarDecl$", Optional);
			if(DeclTree != null) {
				return DeclTree;
			}
			DeclTree = TokenContext.ParsePatternAfter(TypeTree, "$FuncDecl$", Optional);
			if(DeclTree != null) {
				return DeclTree;
			}
			return TypeTree;
		}
		var Token: GtToken = TokenContext.Next();
		var NameSpace: GtNameSpace = TokenContext.NameSpace;
		var ConstValue: object = NameSpace.GetSymbol(Token.ParsedText);
		if(!(ConstValue instanceof GtType)) {
			return new SyntaxTree(NameSpace.GetPattern("$Const$"), NameSpace, Token, ConstValue);
		}
		return new SyntaxTree(NameSpace.GetPattern("$Variable$"), NameSpace, Token, null);
	}

	static ParseVariable(Pattern: SyntaxPattern, LeftTree: SyntaxTree, TokenContext: TokenContext): SyntaxTree {
		var Token: GtToken = TokenContext.Next();
		var ch: char = Token.ParsedText.charAt(0);
		if(LangDeps.IsLetter(ch) || ch == '_') {
			return new SyntaxTree(Pattern, TokenContext.NameSpace, Token, null);
		}
		return null;
	}

	static TypeVariable(Gamma: TypeEnv, ParsedTree: SyntaxTree, Type: GtType): TypedNode {
		var Name: string = ParsedTree.KeyToken.ParsedText;
		var VariableInfo: VariableInfo = Gamma.LookupDeclaredVariable(Name);
		if(VariableInfo != null) {
			return Gamma.Generator.CreateLocalNode(Type, ParsedTree, VariableInfo.LocalName);
		}
		var Delegate: GtDelegate = Gamma.LookupDelegate(Name);
		if(Delegate != null) {
			return Gamma.Generator.CreateConstNode(Delegate.Type, ParsedTree, Delegate);
		}
		return Gamma.CreateErrorNode(ParsedTree, "undefined name: " + Name);
	}

	static ParseVarDecl(Pattern: SyntaxPattern, LeftTree: SyntaxTree, TokenContext: TokenContext): SyntaxTree {
		var Tree: SyntaxTree = new SyntaxTree(Pattern, TokenContext.NameSpace, TokenContext.GetToken(), null);
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
			var NextTree: SyntaxTree = new SyntaxTree(Pattern, TokenContext.NameSpace, Tree.KeyToken, null);
			NextTree.SetSyntaxTreeAt(VarDeclType, Tree.GetSyntaxTreeAt(VarDeclType));
			Tree = LinkTree(Tree, NextTree);
			Tree.SetMatchedPatternAt(VarDeclName, TokenContext, "$Variable$", Required);
			if(TokenContext.MatchToken("=")) {
				Tree.SetMatchedPatternAt(VarDeclValue, TokenContext, "$Expression$", Required);
			}
		}
		return Tree;
	}

	static TypeVarDecl(Gamma: TypeEnv, ParsedTree: SyntaxTree, Type: GtType): TypedNode {
		var TypeTree: SyntaxTree = ParsedTree.GetSyntaxTreeAt(VarDeclType);
		var NameTree: SyntaxTree = ParsedTree.GetSyntaxTreeAt(VarDeclName);
		var ValueTree: SyntaxTree = ParsedTree.GetSyntaxTreeAt(VarDeclValue);
		var DeclType: GtType = <GtType>TypeTree.ConstValue;
		var VariableName: string = NameTree.KeyToken.ParsedText;
		if(!Gamma.AppendDeclaredVariable(DeclType, VariableName)) {
			Gamma.CreateErrorNode(TypeTree, "alreadyvariable: defined " + VariableName);
		}
		var VariableNode: TypedNode = Gamma.TypeCheck(NameTree, DeclType, DefaultTypeCheckPolicy);
		var InitValueNode: TypedNode = (ValueTree == null) ? Gamma.DefaultValueConstNode(ParsedTree, DeclType) : Gamma.TypeCheck(ValueTree, DeclType, DefaultTypeCheckPolicy);
		var AssignNode: TypedNode = Gamma.Generator.CreateAssignNode(DeclType, ParsedTree, VariableNode, InitValueNode);
		var BlockNode: TypedNode = Gamma.TypeBlock(ParsedTree.NextTree, Type);
		ParsedTree.NextTree = null;
		LinkNode(AssignNode, BlockNode);
		return Gamma.Generator.CreateLetNode(BlockNode.Type, ParsedTree, DeclType, VariableNode, AssignNode/*connected block*/);
	}

	// And: Parse Type //
	static ParseIntegerLiteral(Pattern: SyntaxPattern, LeftTree: SyntaxTree, TokenContext: TokenContext): SyntaxTree {
		var Token: GtToken = TokenContext.Next();
		return new SyntaxTree(Pattern, TokenContext.NameSpace, Token, LangDeps.ParseInt(Token.ParsedText));
	}

	static ParseStringLiteral(Pattern: SyntaxPattern, LeftTree: SyntaxTree, TokenContext: TokenContext): SyntaxTree {
		var Token: GtToken = TokenContext.Next();
		TODO("handlingliteral: string");
		return new SyntaxTree(Pattern, TokenContext.NameSpace, Token, Token.ParsedText);
	}

	static ParseExpression(Pattern: SyntaxPattern, LeftTree: SyntaxTree, TokenContext: TokenContext): SyntaxTree {
		return ParseExpression(TokenContext);
	}

	static ParseUnary(Pattern: SyntaxPattern, LeftTree: SyntaxTree, TokenContext: TokenContext): SyntaxTree {
		var Token: GtToken = TokenContext.Next();
		var Tree: SyntaxTree = new SyntaxTree(Pattern, TokenContext.NameSpace, Token, null);
		Tree.SetMatchedPatternAt(0, TokenContext, "$Expression$", Required);
		return Tree;
	}

	static ParseBinary(Pattern: SyntaxPattern, LeftTree: SyntaxTree, TokenContext: TokenContext): SyntaxTree {
		var Token: GtToken = TokenContext.Next();
		var RightTree: SyntaxTree = ParseExpression(TokenContext);
		if(IsEmptyOrError(RightTree)) return RightTree;
		/* 1 + 2 * 3 */
		/* 1 * 2 + 3 */
		if(RightTree.Pattern.IsBinaryOperator()) {
			if(Pattern.IsLeftJoin(RightTree.Pattern)) {
				var NewTree: SyntaxTree = new SyntaxTree(Pattern, TokenContext.NameSpace, Token, null);
				NewTree.SetSyntaxTreeAt(LeftHandTerm, LeftTree);
				NewTree.SetSyntaxTreeAt(RightHandTerm, RightTree.GetSyntaxTreeAt(LeftHandTerm));
				RightTree.SetSyntaxTreeAt(LeftHandTerm, NewTree);
				return RightTree;
			}
		}
		var NewTree: SyntaxTree = new SyntaxTree(Pattern, TokenContext.NameSpace, Token, null);
		NewTree.SetSyntaxTreeAt(LeftHandTerm, LeftTree);
		NewTree.SetSyntaxTreeAt(RightHandTerm, RightTree);
		if(RightTree.NextTree != null) {
			LinkTree(NewTree, RightTree.NextTree);
			RightTree.NextTree = null;
		}
		return NewTree;
	}

	static TypeBinary(Gamma: TypeEnv, ParsedTree: SyntaxTree, Type: GtType): TypedNode {
		var LeftNode: TypedNode  = ParsedTree.TypeNodeAt(LeftHandTerm, Gamma, Gamma.VarType, DefaultTypeCheckPolicy);
		var RightNode: TypedNode = ParsedTree.TypeNodeAt(RightHandTerm, Gamma, Gamma.VarType, DefaultTypeCheckPolicy);
		var ParamSize: number = 2;
		var Operator: string = ParsedTree.KeyToken.ParsedText;
		var Method: GtMethod = null; // LeftNode.Type.LookupMethod(Operator, ParamSize); //
		return Gamma.Generator.CreateBinaryNode(Gamma.AnyType, ParsedTree, null/*Method*/, LeftNode, RightNode);
	}

	static ParseField(Pattern: SyntaxPattern, LeftTree: SyntaxTree, TokenContext: TokenContext): SyntaxTree {
		TokenContext.MatchToken(".");
		var Token: GtToken = TokenContext.Next();
		var NewTree: SyntaxTree = new SyntaxTree(Pattern, TokenContext.NameSpace, Token, null);
		NewTree.AppendParsedTree(LeftTree);
		return NewTree;
	}

	static TypeField(Gamma: TypeEnv, ParsedTree: SyntaxTree, Type: GtType): TypedNode {
		var ExprNode: TypedNode = ParsedTree.TypeNodeAt(UnaryTerm, Gamma, Gamma.VarType, DefaultTypeCheckPolicy);
		var Method: GtMethod = ExprNode.Type.GetGetter(ParsedTree.KeyToken.ParsedText);
		return Gamma.Generator.CreateGetterNode(Method.GetReturnType(), ParsedTree, Method, ExprNode);
	}

	//  PatternName: "(" //
	static ParseParenthesis(Pattern: SyntaxPattern, LeftTree: SyntaxTree, TokenContext: TokenContext): SyntaxTree {
		var ParseFlag: number = TokenContext.ParseFlag;
		TokenContext.MatchToken("(");
		TokenContext.ParseFlag |= SkipIndentParseFlag;
		var Tree: SyntaxTree = TokenContext.ParsePattern("$Expression$", Required);
		if(!TokenContext.MatchToken(")")) {
			Tree = TokenContext.ReportExpectedToken(")");
		}
		TokenContext.ParseFlag = ParseFlag;
		return Tree;
	}

	static ParseApply(Pattern: SyntaxPattern, LeftTree: SyntaxTree, TokenContext: TokenContext): SyntaxTree {
		var ParseFlag: number = TokenContext.ParseFlag;
		TokenContext.ParseFlag |= SkipIndentParseFlag;
		var FuncTree: SyntaxTree = new SyntaxTree(Pattern, TokenContext.NameSpace, TokenContext.GetMatchedToken("("), null);
		FuncTree.AppendParsedTree(LeftTree);
		while(!FuncTree.IsEmptyOrError() && !TokenContext.MatchToken(")")) {
			var Tree: SyntaxTree = TokenContext.ParsePattern("$Expression$", Required);
			FuncTree.AppendParsedTree(Tree);
			if(TokenContext.MatchToken(",")) continue;
		}
		TokenContext.ParseFlag = ParseFlag;
		return FuncTree;
	}


	static TypeApply(Gamma: TypeEnv, ParsedTree: SyntaxTree, Type: GtType): TypedNode {
		var ApplyNode: TypedNode = Gamma.Generator.CreateApplyNode(Gamma.AnyType, ParsedTree, null);
		var i: number = 0;
		while(i < ListSize(ParsedTree.TreeList)) {
			var ExprNode: TypedNode = ParsedTree.TypeNodeAt(UnaryTerm, Gamma, Gamma.VarType, DefaultTypeCheckPolicy);
			ApplyNode.Append(ExprNode);
			i += 1;
		}
		return ApplyNode;
// ======= //
// 		var MemberExpr: TypedNode = ParsedTree.TypeNodeAt(CallExpressionOffset, Gamma, Gamma.AnyType, 0); //
// 		if(MemberExpr.IsError()) { //
// 			return MemberExpr; //
// 		} //
// 		var Reciver: TypedNode = null; //
// 		var MethodName: string = null; //
// 		if(MemberExpr instanceof ConstNode) { //
// 			var Const: ConstNode = (ConstNode) MemberExpr; //
// 			if(Const.ConstValue instanceof GtMethod) { //
// 				// case: MethodName(3) => MemberExpr=(ConstNode:Method) //
// 				//to: tranform this.MethodName(3) //
// 				var Method: GtMethod = (GtMethod) Const.ConstValue; //
// 				var ReciverType: GtType = Gamma.LookupDeclaredVariable("this").Type; //
// 				Reciver = new LocalNode(ReciverType, ParsedTree.KeyToken, "this"); //
// 				MethodName = Method.MethodName; //
// 			} else { //
// 				// case: SomeClass.CONST(1) => MemberExpr=(ConstNode:Func) //
// 				//to: transform CONST.Invoke(1) //
// 				return Gamma.CreateErrorNode(ParsedTree, "CallingObject: Functionnot: isyet: supported."); //
// 			} //
// 		} else if(MemberExpr instanceof LocalNode) { //
// 			// case: FieldName(3) => MemberExpr= (LocalNode:Func FieldName) //
// 			var LNode: LocalNode = (LocalNode) MemberExpr; //
// 			var ReciverType: GtType = Gamma.LookupDeclaredVariable("this").Type; //
// 			Reciver = new LocalNode(ReciverType, ParsedTree.KeyToken, "this"); //
// 			MethodName = LNode.LocalName; //
// 		} else if(MemberExpr instanceof GetterNode) { //
// 			// SomeInstance.MethodName(2) => MemberExpr=(GetterNode:MethodFieldName: SomeInstance) //
// 			// SomeInstance.FieldName(2) => MemberExpr=(GetterNode:FuncFieldName: SomeInstance) //
// 			var GNode: GetterNode = (GetterNode) MemberExpr; //
// 			Reciver = GNode.Expr; //
// 			MethodName = GNode.Method.MethodName; //
// 		} //
// 		return TypeFindingMethod(Gamma, ParsedTree, Type, Reciver, MethodName); //
	}

// 	static TypeFindingMethod(Gamma: TypeEnv, ParsedTree: SyntaxTree, TypeInfo: GtType, Reciver: TypedNode, MethodName: string): TypedNode { //
// 		var NodeList: Array<SyntaxTree> = ParsedTree.TreeList; //
// 		var ParamSize: number = NodeList.size() - CallParameterOffset; //
// 		var ReciverType: GtType = Reciver.Type; //
// 		var Method: GtMethod = ReciverType.LookupMethod(MethodName, ParamSize); //
// 		if(Method != null) { //
// 			var CallNode: ApplyNode =  (ApplyNode) Gamma.Generator.CreateApplyNode(Method.GetReturnType(), ParsedTree, Method); //
// 			CallNode.Append(Reciver); //
// 			return TypeMethodEachParam(Gamma, ParsedTree, ReciverType, CallNode, NodeList, ParamSize); //
// 		} //
// 		return Gamma.CreateErrorNode(ParsedTree, "undefined method: " + MethodName + " in " + ReciverType.ShortClassName); //
// 	} //
//  //
// 	static TypeMethodEachParam(Gamma: TypeEnv, ParsedTree: SyntaxTree, ReciverType: GtType, CallNode: ApplyNode, NodeList: Array<SyntaxTree>, ParamSize: number): TypedNode { //
// 		var Method: GtMethod = CallNode.Method; //
// 		for(number ParamIdx = 0; ParamIdx < ParamSize; ParamIdx++) { //
// 			var ParamType: GtType = Method.GetParamType(ParamIdx); //
// 			var UntypedParamNode: SyntaxTree = NodeList.get(CallParameterOffset + ParamIdx); //
// 			var ParamNode: TypedNode; //
// 			if(UntypedParamNode != null) { //
// 				ParamNode = Gamma.TypeCheck(UntypedParamNode, ParamType, DefaultTypeCheckPolicy); //
// 			} else { //
// 				ParamNode = Gamma.DefaultValueConstNode(ParsedTree, ParamType); //
// 			} //
// 			if(ParamNode.IsError()) { //
// 				return ParamNode; //
// 			} //
// 			CallNode.Append(ParamNode); //
// 		} //
// 		return CallNode; //
// >>>>>>> d54ad65822325ee531da46bbe2f1fee293187718 //
// 	} //

	static ParseEmpty(Pattern: SyntaxPattern, LeftTree: SyntaxTree, TokenContext: TokenContext): SyntaxTree {
		return new SyntaxTree(Pattern, TokenContext.NameSpace, NullToken, null);
	}

	static TypeEmpty(Gamma: TypeEnv, ParsedTree: SyntaxTree, Type: GtType): TypedNode {
		return Gamma.Generator.CreateNullNode(Gamma.VoidType, ParsedTree);
	}

	static ParseBlock(Pattern: SyntaxPattern, LeftTree: SyntaxTree, TokenContext: TokenContext): SyntaxTree {
		if(TokenContext.MatchToken("{")) {
			var PrevTree: SyntaxTree = null;
			while(TokenContext.SkipEmptyStatement()) {
				if(TokenContext.MatchToken("}")) break;
				var CurrentTree: SyntaxTree = ParseExpression(TokenContext);
				if(IsEmptyOrError(CurrentTree)) return CurrentTree;
				PrevTree = LinkTree(PrevTree, CurrentTree);
			}
			if(PrevTree == null) {
				return TokenContext.ParsePattern("$Empty$", Required);
			}
			return TreeHead(PrevTree);
		}
		return null;
	}

	static ParseStatement(Pattern: SyntaxPattern, LeftTree: SyntaxTree, TokenContext: TokenContext): SyntaxTree {
		var StmtTree: SyntaxTree = TokenContext.ParsePattern("$Block$", Optional);
		if(StmtTree == null) {
			StmtTree = ParseExpression(TokenContext);
		}
		if(StmtTree == null) {
			StmtTree = TokenContext.ParsePattern("$Empty$", Required);
		}
		return StmtTree;		
	}
	
	static TypeBlock(Gamma: TypeEnv, ParsedTree: SyntaxTree, Type: GtType): TypedNode {
		return Gamma.TypeBlock(ParsedTree, Type);
	}

	static TypeAnd(Gamma: TypeEnv, ParsedTree: SyntaxTree, Type: GtType): TypedNode {
		var LeftNode: TypedNode = ParsedTree.TypeNodeAt(LeftHandTerm, Gamma, Gamma.BooleanType, DefaultTypeCheckPolicy);
		var RightNode: TypedNode = ParsedTree.TypeNodeAt(RightHandTerm, Gamma, Gamma.BooleanType, DefaultTypeCheckPolicy);
		return Gamma.Generator.CreateAndNode(Gamma.BooleanType, ParsedTree, LeftNode, RightNode);
	}

	static TypeOr(Gamma: TypeEnv, ParsedTree: SyntaxTree, Type: GtType): TypedNode {
		var LeftNode: TypedNode = ParsedTree.TypeNodeAt(LeftHandTerm, Gamma, Gamma.BooleanType, DefaultTypeCheckPolicy);
		var RightNode: TypedNode = ParsedTree.TypeNodeAt(RightHandTerm, Gamma, Gamma.BooleanType, DefaultTypeCheckPolicy);
		return Gamma.Generator.CreateOrNode(Gamma.BooleanType, ParsedTree, LeftNode, RightNode);
	}

	// Statement: If //
	static ParseIf(Pattern: SyntaxPattern, LeftTree: SyntaxTree, TokenContext: TokenContext): SyntaxTree {
		var Token: GtToken = TokenContext.GetMatchedToken("if");
		var NewTree: SyntaxTree = new SyntaxTree(Pattern, TokenContext.NameSpace, Token, null);
		NewTree.SetMatchedTokenAt(NoWhere, TokenContext, "(", Required);
		NewTree.SetMatchedPatternAt(IfCond, TokenContext, "$Expression$", Required);
		NewTree.SetMatchedTokenAt(NoWhere, TokenContext, ")", Required);
		NewTree.SetMatchedPatternAt(IfThen, TokenContext, "$Statement$", Required);
		if(TokenContext.MatchToken("else")) {
			NewTree.SetMatchedPatternAt(IfElse, TokenContext, "$Statement$", Required);
		}
		return NewTree;
	}

	static TypeIf(Gamma: TypeEnv, ParsedTree: SyntaxTree, Type: GtType): TypedNode {
		var CondNode: TypedNode = ParsedTree.TypeNodeAt(IfCond, Gamma, Gamma.BooleanType, DefaultTypeCheckPolicy);
		var ThenNode: TypedNode = ParsedTree.TypeNodeAt(IfThen, Gamma, Type, DefaultTypeCheckPolicy);
		var ElseNode: TypedNode = ParsedTree.TypeNodeAt(IfElse, Gamma, ThenNode.Type, AllowEmptyPolicy);
		return Gamma.Generator.CreateIfNode(ThenNode.Type, ParsedTree, CondNode, ThenNode, ElseNode);
	}

	// Statement: While //
	static ParseWhile(Pattern: SyntaxPattern, LeftTree: SyntaxTree, TokenContext: TokenContext): SyntaxTree {
		var Token: GtToken = TokenContext.GetMatchedToken("while");
		var NewTree: SyntaxTree = new SyntaxTree(Pattern, TokenContext.NameSpace, Token, null);
		NewTree.SetMatchedTokenAt(NoWhere, TokenContext, "(", Required);
		NewTree.SetMatchedPatternAt(WhileCond, TokenContext, "$Expression$", Required);
		NewTree.SetMatchedTokenAt(NoWhere, TokenContext, ")", Required);
		NewTree.SetMatchedPatternAt(WhileBody, TokenContext, "$Block$", Required);
		return NewTree;
	}

	static TypeWhile(Gamma: TypeEnv, ParsedTree: SyntaxTree, Type: GtType): TypedNode {
		var CondNode: TypedNode = ParsedTree.TypeNodeAt(WhileCond, Gamma, Gamma.BooleanType, DefaultTypeCheckPolicy);
		var BodyNode: TypedNode = ParsedTree.TypeNodeAt(WhileBody, Gamma, Type, DefaultTypeCheckPolicy);
		return Gamma.Generator.CreateLoopNode(BodyNode.Type, ParsedTree, CondNode, BodyNode, null);
	}

	// Statement: Return //
	static ParseReturn(Pattern: SyntaxPattern, LeftTree: SyntaxTree, TokenContext: TokenContext): SyntaxTree {
		var Token: GtToken = TokenContext.GetMatchedToken("return");
		var NewTree: SyntaxTree = new SyntaxTree(Pattern, TokenContext.NameSpace, Token, null);
		NewTree.SetMatchedPatternAt(ReturnExpr, TokenContext, "$Expression$", Optional);
		return NewTree;
	}

	static TypeReturn(Gamma: TypeEnv, ParsedTree: SyntaxTree, Type: GtType): TypedNode {
		var Expr: TypedNode = ParsedTree.TypeNodeAt(ReturnExpr, Gamma, Gamma.ReturnType, DefaultTypeCheckPolicy);
		return Gamma.Generator.CreateReturnNode(Expr.Type, ParsedTree, Expr);
	}

	static ParseFuncDecl(Pattern: SyntaxPattern, LeftTree: SyntaxTree, TokenContext: TokenContext): SyntaxTree {
		var Tree: SyntaxTree = new SyntaxTree(Pattern, TokenContext.NameSpace, TokenContext.GetToken(), null);
		if(LeftTree == null) {
			Tree.SetMatchedPatternAt(FuncDeclReturnType, TokenContext, "$Type$", Required);
		}
		else {
			Tree.SetSyntaxTreeAt(FuncDeclReturnType, LeftTree);
		}
// 		Tree.SetMatchedPatternAt(FuncDeclClass, TokenContext, "$MethodClass$", Optional); //
		Tree.SetMatchedPatternAt(FuncDeclName, TokenContext, "$FuncName$", Required);
		Tree.SetMatchedTokenAt(NoWhere, TokenContext, "(", Required);
		var ParamBase: number = FuncDeclParam;
		while(!Tree.IsEmptyOrError() && !TokenContext.MatchToken(")")) {
			Tree.SetMatchedPatternAt(ParamBase + VarDeclType, TokenContext, "$Type$", Required);
			Tree.SetMatchedPatternAt(ParamBase + VarDeclName, TokenContext, "$Symbol$", Required);
			if(TokenContext.MatchToken("=")) {
				Tree.SetMatchedPatternAt(ParamBase + VarDeclValue, TokenContext, "$Expression$", Required);
			}
			ParamBase += 3;
		}
		Tree.SetMatchedPatternAt(FuncDeclBlock, TokenContext, "$Block$", Required);
		return Tree;
	}

	static TypeFuncDecl(Gamma: TypeEnv, Tree: SyntaxTree, Type: GtType): TypedNode {
		TODO("TypeFuncDecl");
// 		GtType AnyType = Tree.GetTokenType(VarDeclTypeOffset, null); //
// 		GtToken VarToken = Tree.GetAtToken(VarDeclNameOffset); //
// 		string VarName = Tree.GetTokenString(VarDeclNameOffset, null); //
// 		if(AnyType.equals(Gamma.AnyType)) { //
// 			return new ErrorNode(Type, VarToken, "cannotvariable: infer type"); //
// 		} //
// 		assert (VarName != null); //
// 		Gamma.AppendLocalType(AnyType, VarName); //
// 		TypedNode Value = Tree.TypeNodeAt(2, Gamma, AnyType, 0); //
// 		return new LetNode(AnyType, VarToken, Value, null); //
		return null;
	}

	public LoadTo(NameSpace: GtNameSpace): void {
		// Constants: Define //
		NameSpace.DefineSymbol("true", true);
		NameSpace.DefineSymbol("false", false);

		NameSpace.DefineTokenFunc(" \t", FunctionA(this, "WhiteSpaceToken"));
		NameSpace.DefineTokenFunc("\n",  FunctionA(this, "IndentToken"));
		NameSpace.DefineTokenFunc("(){}[]<>.,:;+-*/%=&|!", FunctionA(this, "OperatorToken"));
		NameSpace.DefineTokenFunc("Aa", FunctionA(this, "SymbolToken"));
		NameSpace.DefineTokenFunc("\"", FunctionA(this, "StringLiteralToken"));
		NameSpace.DefineTokenFunc("1",  FunctionA(this, "NumberLiteralToken"));

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

		NameSpace.DefineSyntaxPattern("(", FunctionB(this, "ParseParenthesis"), null); /* => */
		NameSpace.DefineExtendedPattern(".", 0, FunctionB(this, "ParseField"), FunctionC(this, "TypeField"));
		NameSpace.DefineExtendedPattern("(", 0, FunctionB(this, "ParseApply"), FunctionC(this, "TypeField"));
		// future: NameSpace.DefineExtendedPattern("[", 0, FunctionB(this, "ParseIndexer"), FunctionC(this, "TypeIndexer")); //
		
		NameSpace.DefineSyntaxPattern("$Block$", FunctionB(this, "ParseBlock"), TypeBlock);
		NameSpace.DefineSyntaxPattern("$Statement$", FunctionB(this, "ParseStatement"), TypeBlock);

		NameSpace.DefineSyntaxPattern("$FuncDecl$", FunctionB(this, "ParseFuncDecl"), FunctionC(this, "TypeFuncDecl"));
		NameSpace.DefineSyntaxPattern("$VarDecl$", FunctionB(this, "ParseVarDecl"), FunctionC(this, "TypeVarDecl"));
		NameSpace.DefineSyntaxPattern("if", FunctionB(this, "ParseIf"), FunctionC(this, "TypeIf"));
		NameSpace.DefineSyntaxPattern("return", FunctionB(this, "ParseReturn"), FunctionC(this, "ParseReturn"));
		NameSpace.DefineSyntaxPattern("while", FunctionB(this, "ParseWhile"), FunctionC(this, "TypeWhile"));
	}
}


class GtContext {
	public RootNameSpace: GtNameSpace;
	public DefaultNameSpace: GtNameSpace;

	VoidType: GtType;
	ObjectType: GtType;
	BooleanType: GtType;
	IntType: GtType;
	StringType: GtType;
	VarType: GtType;
	AnyType: GtType;

	ClassNameMap: Object;
	public Generator: GreenTeaGenerator;
	public ClassCount: number;
	public MethodCount: number;

	constructor(Grammar: GtGrammar, Generator: GreenTeaGenerator) {
		this.ClassNameMap = new Object();
		this.Generator    = Generator;
		this.RootNameSpace = new GtNameSpace(this, null);
		this.ClassCount = 0;
		this.MethodCount = 0;
		this.VoidType    = this.RootNameSpace.DefineClass(new GtType(this, 0, "void", null));
		this.ObjectType  = this.RootNameSpace.DefineClass(new GtType(this, 0, "object", new object()));
		this.BooleanType = this.RootNameSpace.DefineClass(new GtType(this, 0, "boolean", false));
		this.IntType     = this.RootNameSpace.DefineClass(new GtType(this, 0, "number", 0));
		this.StringType  = this.RootNameSpace.DefineClass(new GtType(this, 0, "string", ""));
		this.VarType     = this.RootNameSpace.DefineClass(new GtType(this, 0, "var", null));
		this.AnyType     = this.RootNameSpace.DefineClass(new GtType(this, 0, "any", null));
		Grammar.LoadTo(this.RootNameSpace);
		this.DefaultNameSpace = new GtNameSpace(this, this.RootNameSpace);
	}

	public LoadGrammar(Grammar: GtGrammar): void {
		Grammar.LoadTo(this.DefaultNameSpace);
	}

	public Define(Symbol: string, Value: object): void {
		this.RootNameSpace.DefineSymbol(Symbol, Value);
	}

	public Eval(text: string, FileLine: number): object {
		return this.DefaultNameSpace.Eval(text, FileLine, this.Generator);
	}
}

class GreenTeaScript {

	static TestAll(Context: GtContext): void {
		TestSyntaxPattern(Context, "number");
// 		TestSyntaxPattern(Context, "123"); //
// 		TestSyntaxPattern(Context, "1 + 2 * 3"); //
	}

	static main(argc: string[]): void {
		var GtContext: GtContext = new GtContext(new KonohaGrammar(), new GreenTeaGenerator());
// 		//GtContext.Eval("f(a: number, b: number): number { return a + b; }", 0); //
// 		//GtContext.Eval("1 + 2 * 3", 0); //
		TestAll(GtContext);
		
// 		GtContext GtContext = new GtContext(new KonohaGrammar(), new JavaByteCodeGenerator()); //
// 		System.err.println("##value: Eval: " + GtContext.Eval("1", 0)); //
	}

}
