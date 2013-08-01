
//ifdef JAVA
import java.lang.reflect.InvocationTargetException;
import java.lang.reflect.Method;
import java.lang.reflect.Modifier;
import java.util.ArrayList;
import java.util.HashMap;

interface GtConst {
//endif VAJA

	// ClassFlag
	public final static int		PrivateClass					= 1 << 0;
	public final static int		SingletonClass					= 1 << 1;
	public final static int		FinalClass						= 1 << 2;
	public final static int		GtClass						= 1 << 3;
	public final static int		StaticClass						= 1 << 4;
	public final static int		ImmutableClass					= 1 << 5;
	public final static int		InterfaceClass					= 1 << 6;

	// MethodFlag
	public final static int		PrivateMethod					= 1 << 0;
	public final static int		VirtualMethod					= 1 << 1;
	public final static int		FinalMethod						= 1 << 2;
	public final static int		ConstMethod						= 1 << 3;
	public final static int		StaticMethod					= 1 << 4;
	public final static int		ImmutableMethod					= 1 << 5;
	public final static int		TopLevelMethod					= 1 << 6;

	// call rule
	public final static int		CoercionMethod					= 1 << 7;
	public final static int		RestrictedMethod				= 1 << 8;
	public final static int		UncheckedMethod					= 1 << 9;
	public final static int		SmartReturnMethod				= 1 << 10;
	public final static int		VariadicMethod					= 1 << 11;
	public final static int		IterativeMethod					= 1 << 12;

	// compatible
	public final static int		UniversalMethod					= 1 << 13;

	// internal
	public final static int		HiddenMethod					= 1 << 17;
	public final static int		AbstractMethod					= 1 << 18;
	public final static int		OverloadedMethod				= 1 << 19;
	public final static int		Override						= 1 << 20;
	public final static int		DynamicCall						= 1 << 22;

	
	public final static int		SymbolMaskSize					= 3;
	public final static int		LowerSymbolMask					= 1;
	public final static int		GetterSymbolMask				= (1 << 1);
	public final static int		SetterSymbolMask				= (1 << 2);
	public final static int		MetaSymbolMask					= (GetterSymbolMask | SetterSymbolMask);
	public final static String	GetterPrefix					= "Get";
	public final static String	SetterPrefix					= "Set";
	public final static String	MetaPrefix						= "\\";

	public final static int		AllowNewId						= -1;
	public final static int		NoMatch							= -1;
	public final static int		BreakPreProcess					= -1;

	public final static boolean Optional = true;
	public final static boolean Required = false;

	public final static int		ErrorLevel						= 0;
	public final static int		WarningLevel					= 1;
	public final static int		InfoLevel					     = 2;

	public final static int	NullChar				= 0;
	public final static int	UndefinedChar			= 1;
	public final static int	DigitChar				= 2;
	public final static int	UpperAlphaChar			= 3;
	public final static int	LowerAlphaChar			= 4;
	public final static int	UnderBarChar			= 5;
	public final static int	NewLineChar				= 6;
	public final static int	TabChar					= 7;
	public final static int	SpaceChar				= 8;
	public final static int	OpenParChar				= 9;
	public final static int	CloseParChar			= 10;
	public final static int	OpenBracketChar			= 11;
	public final static int	CloseBracketChar		= 12;
	public final static int	OpenBraceChar			= 13;
	public final static int	CloseBraceChar			= 14;
	public final static int	LessThanChar			= 15;
	public final static int	GreaterThanChar			= 16;
	public final static int	QuoteChar				= 17;
	public final static int	DoubleQuoteChar			= 18;
	public final static int	BackQuoteChar			= 19;
	public final static int	SurprisedChar			= 20;
	public final static int	SharpChar				= 21;
	public final static int	DollarChar				= 22;
	public final static int	PercentChar				= 23;
	public final static int	AndChar					= 24;
	public final static int	StarChar				= 25;
	public final static int	PlusChar				= 26;
	public final static int	CommaChar				= 27;
	public final static int	MinusChar				= 28;
	public final static int	DotChar					= 29;
	public final static int	SlashChar				= 30;
	public final static int	ColonChar				= 31;
	public final static int	SemiColonChar			= 32;
	public final static int	EqualChar				= 33;
	public final static int	QuestionChar			= 34;
	public final static int	AtmarkChar				= 35;
	public final static int	VarChar					= 36;
	public final static int	ChilderChar				= 37;
	public final static int	BackSlashChar			= 38;
	public final static int	HatChar					= 39;
	public final static int	UnicodeChar				= 40;
	public final static int MaxSizeOfChars          = 41;

	public static final int	CharMatrix[] = /*BeginArray*/{ 
			0/*nul*/, 1/*soh*/, 1/*stx*/, 1/*etx*/, 1/*eot*/, 1/*enq*/,
			1/*ack*/, 1/*bel*/, 1/*bs*/, TabChar/*ht*/, NewLineChar/*nl*/, 1/*vt*/, 1/*np*/, 1/*cr*/, 1/*so*/, 1/*si*/,
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
		/*EndArray*/};
	
	public final static GtToken NullToken = new GtToken("", 0);

	// TokenFlag
	public final static int	SourceTokenFlag	= 1;
	public final static int	ErrorTokenFlag	= (1 << 1);
	public final static int IndentTokenFlag	= (1 << 2);
	public final static int	WhiteSpaceTokenFlag	= (1 << 3);
	public final static int DelimTokenFlag	= (1 << 4);
	
	// ParseFlag
	public final static int	TrackbackParseFlag	= 1;
	public final static int	SkipIndentParseFlag	= (1 << 1);
	

	// SyntaxTree
	public final static int NoWhere         = -1;
	// UnaryTree, SuffixTree
	public final static int UnaryTerm      = 0;
	// BinaryTree
	public final static int	LeftHandTerm	= 0;
	public final static int	RightHandTerm	= 1;

	// IfStmt
	public final static int	IfCond	= 0;
	public final static int	IfThen	= 1;
	public final static int	IfElse	= 2;

	// ReturnStmt
	public final static int	ReturnExpr	= 0;

	// var N = 1;
	public final static int	VarDeclType		= 0;
	public final static int	VarDeclName		= 1;
	public final static int	VarDeclValue	= 2;
	public final static int	VarDeclScope	= 3;

	// Method Decl;
	public final static int	MethodDeclReturnType	= 0;
	public final static int	MethodDeclClass		= 1;
	public final static int	MethodDeclName		= 2;
	public final static int	MethodDeclBlock		= 3;
	public final static int	MethodDeclParam		= 4;

	// spec 
	public final static int TokenFuncSpec     = 0;
	public final static int SymbolPatternSpec = 1;
	public final static int ExtendedPatternSpec = 2;

//	public final static int		Term							= 1;
//	public final static int		UnaryOperator					= 1;										/* same as Term for readability */
//	public final static int		Statement						= 1;										/* same as Term for readability */
	public final static int		BinaryOperator					= 1 << 1;
//	public final static int		SuffixOperator					= 1 << 2;
	public final static int		LeftJoin						= 1 << 3;
//	public final static int		MetaPattern						= 1 << 4;
	public final static int		PrecedenceShift					= 5;
	public final static int		Precedence_CStyleValue			= (1 << PrecedenceShift);
	public final static int		Precedence_CPPStyleScope		= (50 << PrecedenceShift);
	public final static int		Precedence_CStyleSuffixCall		= (100 << PrecedenceShift);				/*x(); x[]; x.x x->x x++ */
	public final static int		Precedence_CStylePrefixOperator	= (200 << PrecedenceShift);				/*++x; --x; sizeof x &x +x -x !x (T)x  */
	//	Precedence_CppMember      = 300;  /* .x ->x */
	public final static int		Precedence_CStyleMUL			= (400 << PrecedenceShift);				/* x * x; x / x; x % x*/
	public final static int		Precedence_CStyleADD			= (500 << PrecedenceShift);				/* x + x; x - x */
	public final static int		Precedence_CStyleSHIFT			= (600 << PrecedenceShift);				/* x << x; x >> x */
	public final static int		Precedence_CStyleCOMPARE		= (700 << PrecedenceShift);
	public final static int		Precedence_CStyleEquals			= (800 << PrecedenceShift);
	public final static int		Precedence_CStyleBITAND			= (900 << PrecedenceShift);
	public final static int		Precedence_CStyleBITXOR			= (1000 << PrecedenceShift);
	public final static int		Precedence_CStyleBITOR			= (1100 << PrecedenceShift);
	public final static int		Precedence_CStyleAND			= (1200 << PrecedenceShift);
	public final static int		Precedence_CStyleOR				= (1300 << PrecedenceShift);
	public final static int		Precedence_CStyleTRINARY		= (1400 << PrecedenceShift);				/* ? : */
	public final static int		Precedence_CStyleAssign			= (1500 << PrecedenceShift);
	public final static int		Precedence_CStyleCOMMA			= (1600 << PrecedenceShift);
	public final static int		Precedence_Error				= (1700 << PrecedenceShift);
	public final static int		Precedence_Statement			= (1900 << PrecedenceShift);
	public final static int		Precedence_CStyleDelim			= (2000 << PrecedenceShift);

	
	public final static int		DefaultTypeCheckPolicy			= 0;
	public final static int     IgnoreEmptyPolicy               = 1;
	public final static int     AllowEmptyPolicy                = (1 << 1);

	//typedef enum {
	//	TypeCheckPolicy_NoPolicy       = 0,
	//	TypeCheckPolicy_NoCheck        = (1 << 0),
	//	TypeCheckPolicy_AllowVoid      = (1 << 1),
	//	TypeCheckPolicy_Coercion       = (1 << 2),
	//	TypeCheckPolicy_AllowEmpty     = (1 << 3),
	//	TypeCheckPolicy_CONST          = (1 << 4),  /* Reserved */
	//	TypeCheckPolicy_Creation       = (1 << 6)   /* TypeCheckNodeByName */
	//} TypeCheckPolicy;

	public final static String	GlobalConstName					= "global";

	public final GtArray	EmptyList = new GtArray();

	// debug flags
	static final public boolean	UseBuiltInTest	= true;
	static final public boolean	DebugPrint		= false;

//ifdef JAVA
}

class GtStatic implements GtConst {
//endif VAJA
	
	public static void println(String msg) {
		LangDeps.println(msg);		
	}
	
	public static void DebugP(String msg) {
		LangDeps.println("DEBUG" + LangDeps.GetStackInfo(2) + ": " + msg);
	}

	public static void TODO(String msg) {
		LangDeps.println("TODO" + LangDeps.GetStackInfo(2) + ": " + msg);
	}

	public static int ListSize(GtArray a) {
		return (a == null) ? 0 : a.size();
	}
	
	public final static boolean IsFlag(int flag, int flag2) {
		return ((flag & flag2) == flag2);
	}
		
	public final static int FromJavaChar(char c) {
		if(c < 128) {
			return CharMatrix[c];
		}
		return UnicodeChar;
	}

	public final static GtFuncToken FunctionA(Object Callee, String MethodName) {
		return new GtFuncToken(Callee, LangDeps.LookupMethod(Callee, MethodName));
	}

	public final static GtFuncMatch FunctionB(Object Callee, String MethodName) {
		return new GtFuncMatch(Callee, LangDeps.LookupMethod(Callee, MethodName));
	}
	
	public final static GtFuncTypeCheck FunctionC(Object Callee, String MethodName) {
		return new GtFuncTypeCheck(Callee, LangDeps.LookupMethod(Callee, MethodName));
	}

	public final static boolean EqualsMethod(Method m1, Method m2) {
		if(m1 == null) {
			return (m2 == null) ? true : false;
		} else {
			return (m2 == null) ? false : m1.equals(m2);
		}
	}
	
	public final static TokenFunc CreateOrReuseTokenFunc(GtFuncToken f, TokenFunc prev) {
		if(prev != null && EqualsMethod(prev.Func.Method, f.Method)) {
			return prev;
		}
		return new TokenFunc(f, prev);
	}

	public final static int ApplyTokenFunc(TokenFunc TokenFunc, TokenContext TokenContext, String ScriptSource, int Pos) {
		while(TokenFunc != null) {
			GtFuncToken f = TokenFunc.Func;
			int NextIdx = LangDeps.ApplyTokenFunc(f.Self, f.Method, TokenContext, ScriptSource, Pos);
			if(NextIdx > Pos) return NextIdx;
			TokenFunc = TokenFunc.ParentFunc;
		}
		return NoMatch;
	}

	public final static SyntaxPattern MergeSyntaxPattern(SyntaxPattern Pattern, SyntaxPattern Parent) {
		if(Parent == null) return Pattern;
		SyntaxPattern MergedPattern = new SyntaxPattern(Pattern.PackageNameSpace, Pattern.PatternName, Pattern.MatchFunc, Pattern.TypeFunc);
		MergedPattern.ParentPattern = Parent;
		return MergedPattern;
	}

	public final static boolean IsEmptyOrError(SyntaxTree Tree) {
		return Tree == null || Tree.IsEmptyOrError();
	}

	public final static SyntaxTree TreeHead(SyntaxTree Tree) {
		if(Tree != null) {
			while(Tree.PrevTree != null) {
				Tree = Tree.PrevTree;
			}
		}
		return Tree;
	}
	
	public final static SyntaxTree ApplySyntaxPattern(SyntaxPattern Pattern, SyntaxTree LeftTree, TokenContext TokenContext) {
		int Pos = TokenContext.Pos;
		int ParseFlag = TokenContext.ParseFlag;
		SyntaxPattern CurrentPattern = Pattern;
		while(CurrentPattern != null) {
			GtFuncMatch f = Pattern.MatchFunc;
			TokenContext.Pos = Pos;
			if(CurrentPattern.ParentPattern != null) {
				TokenContext.ParseFlag = ParseFlag | TrackbackParseFlag;
			}
			DebugP("B ApplySyntaxPattern: " + CurrentPattern + " > " + CurrentPattern.ParentPattern);
			SyntaxTree ParsedTree = (SyntaxTree)LangDeps.ApplyMatchFunc(f.Self, f.Method, CurrentPattern, LeftTree, TokenContext);
			if(ParsedTree != null && ParsedTree.IsEmpty()) ParsedTree = null;
			DebugP("E ApplySyntaxPattern: " + CurrentPattern + " => " + ParsedTree);
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
			DebugP("undefined syntax pattern: " + Pattern);
		}
		return TokenContext.ReportExpectedPattern(Pattern);
	}

	public final static SyntaxTree ParseSyntaxTree(SyntaxTree PrevTree, TokenContext TokenContext) {
		SyntaxPattern Pattern = TokenContext.GetFirstPattern();
		SyntaxTree LeftTree = GtStatic.ApplySyntaxPattern(Pattern, PrevTree, TokenContext);
		while (!GtStatic.IsEmptyOrError(LeftTree)) {
			SyntaxPattern ExtendedPattern = TokenContext.GetExtendedPattern();
			if(ExtendedPattern == null) {
				DebugP("In $Expression$ ending: " + TokenContext.GetToken());
				break;
			}
			LeftTree = GtStatic.ApplySyntaxPattern(ExtendedPattern, LeftTree, TokenContext);			
		}
		return LeftTree;
	}

	// typing 
	public final static TypedNode ApplyTypeFunc(GtFuncTypeCheck TypeFunc, TypeEnv Gamma, SyntaxTree ParsedTree, GtType Type) {
		if(TypeFunc == null || TypeFunc.Method == null){
			DebugP("try to invoke null TypeFunc");
			return null;
		}
		return (TypedNode)LangDeps.ApplyTypeFunc(TypeFunc.Self, TypeFunc.Method, Gamma, ParsedTree, Type);
	}

//ifdef JAVA
}

final class GtArray {
	private final ArrayList<Object>	List;

	public GtArray() {
		this.List = new ArrayList<Object>();
	}

	public GtArray(int DefaultSize) {
		this.List = new ArrayList<Object>(DefaultSize);
	}

	public int size() {
		return this.List.size();
	}

	public void add(Object Value) {
		this.List.add(Value);
	}

	public Object get(int index) {
		return this.List.get(index);
	}

	public void set(int index, Object Value) {
		this.List.set(index, Value);
	}

	public Object remove(int index) {
		return this.List.remove(index);
	}

	public Object pop() {
		return List.remove(List.size() - 1);
	}

	public void clear() {
		this.List.clear();
	}

	@Override public String toString() {
		return List.toString();
	}
}

final class GtMap {
	private final HashMap<String, Object>	Map;

	public GtMap() {
		this.Map = new HashMap<String, Object>();
	}

	public int size() {
		return this.Map.size();
	}

	public void put(String Key, Object Value) {
		this.Map.put(Key, Value);
	}

	public Object get(String Key) {
		return this.Map.get(Key);
	}

}

final class GtFuncToken {
	public Object	Self;
	public Method	Method;
	GtFuncToken(Object Self, Method method) {
		this.Self = Self;
		this.Method = method;
	}
	@Override public String toString() {
		if(this.Method == null) return "null";
		return this.Method.toString();
	}
}

final class GtFuncMatch {
	public Object	Self;
	public Method	Method;
	GtFuncMatch(Object Self, Method method) {
		this.Self = Self;
		this.Method = method;
	}
	@Override public String toString() {
		if(this.Method == null) return "null";
		return this.Method.toString();
	}
}

final class GtFuncTypeCheck {
	public Object	Self;
	public Method	Method;
	GtFuncTypeCheck(Object Self, Method method) {
		this.Self = Self;
		this.Method = method;
	}
	@Override public String toString() {
		if(this.Method == null) return "null";
		return this.Method.toString();
	}
}

//endif VAJA

// tokenizer

final class GtToken extends GtStatic {
	/*field*/public int		TokenFlag;
	/*field*/public String	ParsedText;
	/*field*/public long		FileLine;
	/*field*/public SyntaxPattern	PresetPattern;

	GtToken/*constructor*/(String text, long FileLine) {
		this.TokenFlag = 0;
		this.ParsedText = text;
		this.FileLine = FileLine;
		this.PresetPattern = null;
	}

	public boolean IsSource() {
		return IsFlag(this.TokenFlag, SourceTokenFlag);
	}
	
	public boolean IsError() {
		return IsFlag(this.TokenFlag, ErrorTokenFlag);
	}

	public boolean IsIndent() {
		return IsFlag(this.TokenFlag, IndentTokenFlag);
	}

	public boolean IsDelim() {
		return IsFlag(this.TokenFlag, DelimTokenFlag);
	}

	public boolean EqualsText(String text) {
		return this.ParsedText.equals(text);
	}

	@Override public String toString() {
		String TokenText = "";
		if(this.PresetPattern != null) {
			TokenText = "(" + this.PresetPattern.PatternName + ") ";
		}
		return TokenText + this.ParsedText;
	}

	public String ToErrorToken(String Message) {
		this.TokenFlag = ErrorTokenFlag;
		this.ParsedText = Message;
		return Message;
	}

	public String GetErrorMessage() {
		assert(this.IsError());
		return this.ParsedText;
	}
}

final class TokenFunc {
	/*field*/public GtFuncToken       Func;
	/*field*/public TokenFunc	ParentFunc;

	TokenFunc/*constructor*/(GtFuncToken Func, TokenFunc prev) {
		this.Func = Func;
		this.ParentFunc = prev;
	}

	@Override public String toString() {
		return this.Func.Method.toString();
	}
}

final class TokenContext extends GtStatic {
	/*field*/public GtNameSpace NameSpace;
	/*field*/public GtArray SourceList;
	/*field*/public int Pos;
	/*field*/public long ParsingLine;
	/*field*/public int ParseFlag;

	TokenContext/*constructor*/(GtNameSpace NameSpace, String Text, long FileLine) {
		this.NameSpace = NameSpace;
		this.SourceList = new GtArray();
		this.Pos = 0;
		this.ParsingLine = FileLine;
		this.ParseFlag = 0;
		AddNewToken(Text, SourceTokenFlag, null);
	}

	public GtToken AddNewToken(String Text, int TokenFlag, String PatternName) {
		GtToken Token = new GtToken(Text, this.ParsingLine);
		Token.TokenFlag |= TokenFlag;
		if(PatternName != null) {
			Token.PresetPattern = this.NameSpace.GetPattern(PatternName);
			assert(Token.PresetPattern != null);
		}
		DebugP("<< " + Text + " : " + PatternName);
		this.SourceList.add(Token);
		return Token;
	}

	public void FoundWhiteSpace() {
		GtToken Token = GetToken();
		Token.TokenFlag |= WhiteSpaceTokenFlag;
	}
	
	public void FoundLineFeed(long line) {
		this.ParsingLine += line;
	}

	public void ReportTokenError(int Level, String Message, String TokenText) {
		GtToken Token = this.AddNewToken(TokenText, 0, "$Error$");
		this.NameSpace.ReportError(Level, Token, Message);
	}
	
	public SyntaxTree NewErrorSyntaxTree(GtToken Token, String Message) {
		if(!IsAllowedTrackback()) {
			this.NameSpace.ReportError(ErrorLevel, Token, Message);
			SyntaxTree ErrorTree = new SyntaxTree(Token.PresetPattern, this.NameSpace, Token);
			return ErrorTree;
		}
		return null;
	}
	
	public GtToken GetBeforeToken() {
		for(int pos = this.Pos - 1; pos >= 0; pos--) {
			GtToken Token = (GtToken)this.SourceList.get(pos);
			if(IsFlag(Token.TokenFlag, IndentTokenFlag)) {
				continue;
			}
			return Token;
		}
		return null;
	}

	public SyntaxTree ReportExpectedToken(String TokenText) {
		if(!IsAllowedTrackback()) {
			GtToken Token = GetBeforeToken();
			if(Token != null) {
				return NewErrorSyntaxTree(Token, TokenText + " is expected after " + Token.ParsedText);
			}
			Token = GetToken();
			assert(Token != NullToken);
			return NewErrorSyntaxTree(Token, TokenText + " is expected at " + Token.ParsedText);
		}
		return null;
	}

	public SyntaxTree ReportExpectedPattern(SyntaxPattern Pattern) {
		return ReportExpectedToken(Pattern.PatternName);
	}
	
	private int DispatchFunc(String ScriptSource, int GtChar, int pos) {
		TokenFunc TokenFunc = this.NameSpace.GetTokenFunc(GtChar);
		int NextIdx = GtStatic.ApplyTokenFunc(TokenFunc, this, ScriptSource, pos);
		if(NextIdx == NoMatch) {
			DebugP("undefined tokenizer: " + ScriptSource.charAt(pos));
			this.AddNewToken(ScriptSource.substring(pos), 0, null);
			return ScriptSource.length();
		}
		return NextIdx;
	}

	private void Tokenize(String ScriptSource, long CurrentLine) {
		int currentPos = 0, len = ScriptSource.length();
		this.ParsingLine = CurrentLine;
		while(currentPos < len) {
			int gtCode = GtStatic.FromJavaChar(ScriptSource.charAt(currentPos));
			int nextPos = this.DispatchFunc(ScriptSource, gtCode, currentPos);
			if(currentPos >= nextPos) {
				break;
			}
			currentPos = nextPos;
		}
		this.Dump();
	}

	public GtToken GetToken() {
		while((this.Pos < this.SourceList.size())) {
			GtToken Token = (GtToken)this.SourceList.get(this.Pos);
			if(Token.IsSource()) {
				this.SourceList.pop();
				this.Tokenize(Token.ParsedText, Token.FileLine);
				Token = (GtToken)this.SourceList.get(this.Pos);
			}
			if(IsFlag(this.ParseFlag, SkipIndentParseFlag) && Token.IsIndent()) {
				this.Pos += 1;
				continue;
			}
			return Token;
		}
		return NullToken;
	}

	public boolean HasNext() {
		return (this.GetToken() != NullToken);
	}

	public GtToken Next() {
		GtToken Token = this.GetToken();
		this.Pos += 1;
		return Token;
	}

	public SyntaxPattern GetPattern(String PatternName) {
		return this.NameSpace.GetPattern(PatternName);
	}

	public SyntaxPattern GetFirstPattern() {
		GtToken Token = GetToken();
		if(Token.PresetPattern != null) {
			return Token.PresetPattern;
		}
		SyntaxPattern Pattern = this.NameSpace.GetPattern(Token.ParsedText);
		if(Pattern == null) {
			return this.NameSpace.GetPattern("$Symbol$");
		}
		return Pattern;
	}

	public SyntaxPattern GetExtendedPattern() {
		GtToken Token = GetToken();
		SyntaxPattern Pattern = this.NameSpace.GetExtendedPattern(Token.ParsedText);
		return Pattern;		
	}
	
	public boolean MatchToken(String TokenText) {
		GtToken Token = GetToken();
		if(Token.EqualsText(TokenText)) {
			this.Pos += 1;
			return true;
		}
		return false;
	}

	public GtToken GetMatchedToken(String TokenText) {
		GtToken Token = GetToken();
		while(Token != NullToken) {
			this.Pos += 1;
			if(Token.EqualsText(TokenText)) {
				break;
			}
		}
		return Token;
	}

	public boolean IsAllowedTrackback() {
		return IsFlag(this.ParseFlag, TrackbackParseFlag);
	}

	public SyntaxTree ParsePattern(String PatternName, boolean IsOptional) {
		int Pos = this.Pos;
		int ParseFlag = this.ParseFlag;
		SyntaxPattern Pattern = this.GetPattern(PatternName);
		if(IsOptional) {
			this.ParseFlag |= TrackbackParseFlag;
		}
		SyntaxTree SyntaxTree = GtStatic.ApplySyntaxPattern(Pattern, null, this);
		this.ParseFlag = ParseFlag;
		if(SyntaxTree != null) {
			return SyntaxTree;
		}
		this.Pos = Pos;
		return null;
	}
	
	public boolean SkipEmptyStatement() {
		GtToken Token;
		while((Token = GetToken()) != NullToken) {
			if(Token.IsIndent() || Token.IsDelim()) {
				this.Pos += 1;
				continue;
			}
			break;
		}
		return (Token != NullToken);
	}
	
	public void Dump() {
		for(int pos = this.Pos ; pos < this.SourceList.size(); pos++) {
			GtToken token = (GtToken)this.SourceList.get(pos);
			DebugP("["+pos+"]\t" + token + " : " + token.PresetPattern);
		}
	}
}

final class SyntaxPattern extends GtStatic {

	/*field*/public GtNameSpace	PackageNameSpace;
	/*field*/public String		PatternName;
	/*field*/int				SyntaxFlag;

	/*field*/public GtFuncMatch       MatchFunc;
	/*field*/public GtFuncTypeCheck       TypeFunc;
	/*field*/public SyntaxPattern	ParentPattern;
	
	SyntaxPattern/*constructor*/(GtNameSpace NameSpace, String PatternName, GtFuncMatch MatchFunc, GtFuncTypeCheck TypeFunc) {
		this.PackageNameSpace = NameSpace;
		this.PatternName = PatternName;
		this.SyntaxFlag = 0;
		this.MatchFunc = MatchFunc;
		this.TypeFunc  = TypeFunc;
		this.ParentPattern = null;
	}

	@Override public String toString() {
		return this.PatternName + "<" + this.MatchFunc + ">";
	}

	public boolean IsBinaryOperator() {
		return IsFlag(this.SyntaxFlag, BinaryOperator);
	}

	public boolean IsLeftJoin(SyntaxPattern Right) {
		int left = this.SyntaxFlag >> PrecedenceShift, right = Right.SyntaxFlag >> PrecedenceShift;
		return (left < right || (left == right && IsFlag(this.SyntaxFlag, LeftJoin) && IsFlag(Right.SyntaxFlag, LeftJoin)));
	}
	
}

class SyntaxTree extends GtStatic {
	/*field*/public SyntaxTree		ParentTree;
	/*field*/public SyntaxTree		PrevTree;
	/*field*/public SyntaxTree		NextTree;

	/*field*/public GtNameSpace	TreeNameSpace;
	/*field*/public SyntaxPattern	Pattern;
	/*field*/public GtToken		KeyToken;
	/*field*/public GtArray	    TreeList;
	/*field*/public Object      ResolvedObject;

	SyntaxTree/*constructor*/(SyntaxPattern Pattern, GtNameSpace NameSpace, GtToken KeyToken) {
		this.TreeNameSpace = NameSpace;
		this.KeyToken = KeyToken;
		this.Pattern = Pattern;
		this.ParentTree = null;
		this.PrevTree = null;
		this.NextTree = null;
		this.TreeList = null;
		this.ResolvedObject = null;
	}

	@Override public String toString() {
		String key = this.KeyToken.ParsedText + ":" + ((this.Pattern != null) ? this.Pattern.PatternName : "null");
		StringBuilder sb = new StringBuilder();
		sb.append("(");
		sb.append(key);
		if(this.TreeList != null) {
			for(int i = 0; i < this.TreeList.size(); i++) {
				Object o = this.TreeList.get(i);
				if(o == null) {
					sb.append(" NULL");
				} else {
					sb.append(" ");
					sb.append(o);
				}
			}
		}
		sb.append(")");
		if(this.NextTree != null) {
			sb.append(";\t");
			sb.append(this.NextTree.toString());
		}
		return sb.toString();
	}

	public void LinkNode(SyntaxTree Tree) {
		Tree.PrevTree = this;
		this.NextTree = Tree;
	}
	
	public boolean IsError() {
		return this.KeyToken.IsError();
	}

	public void ToError(GtToken Token) {
		assert(Token.IsError());
		this.KeyToken = Token;
		this.TreeList = null;
	}

	public boolean IsEmpty() {
		return this.KeyToken == NullToken;
	}

	public void ToEmpty() {
		this.KeyToken = NullToken;
		this.TreeList = null;
		this.Pattern = this.TreeNameSpace.GetPattern("$Empty$");
	}
	
	public boolean IsEmptyOrError() {
		return this.KeyToken == NullToken || this.KeyToken.IsError();
	}
	
	public void ToEmptyOrError(SyntaxTree ErrorTree) {
		if(ErrorTree == null) {
			ToEmpty();
		}
		else {
			ToError(ErrorTree.KeyToken);
		}
	}
	
	public void SetAt(int Index, Object Value) {
		if(!IsEmpty()) {
			if(Index >= 0) {
				if(this.TreeList == null) {
					this.TreeList = new GtArray();
				}
				if(Index < this.TreeList.size()) {
					this.TreeList.set(Index, Value);
					return;
				}
				while(this.TreeList.size() < Index) {
					this.TreeList.add(null);
				}
				this.TreeList.add(Value);
			}
		}
	}
	
	public SyntaxTree GetSyntaxTreeAt(int Index) {
		return (SyntaxTree) this.TreeList.get(Index);
	}

	public void SetSyntaxTreeAt(int Index, SyntaxTree Tree) {
		if(!IsError()) {
			if(Tree.IsError()) {
				ToError(Tree.KeyToken);
			}
			else {
				SetAt(Index, Tree);
				Tree.ParentTree = this;
			}
		}
	}
	
	public void SetMatchedPatternAt(int Index, TokenContext TokenContext, String PatternName,  boolean IsOptional) {
		if(!IsEmptyOrError()) {
			SyntaxTree ParsedTree = TokenContext.ParsePattern(PatternName, IsOptional);
			if(ParsedTree == null && !IsOptional) {
				ToEmpty();
			}
		}
	}

	public void SetMatchedTokenAt(int Index, TokenContext TokenContext, String TokenText, boolean IsOptional) {
		if(!IsEmptyOrError()) {
			int Pos = TokenContext.Pos;
			GtToken Token = TokenContext.Next();
			if(Token.ParsedText.equals(TokenText)) {
				SetAt(Index, Token);
			}
			else {
				TokenContext.Pos = Pos;
				if (!IsOptional) {
					ToEmptyOrError(TokenContext.ReportExpectedToken(TokenText));
				}
			}
		}
	}
	
	public void AppendParsedTree(SyntaxTree Tree) {
		if(!IsError()) {
			if(Tree.IsError()) {
				ToError(Tree.KeyToken);
			}
			else {
				if(this.TreeList == null) {
					this.TreeList = new GtArray();
				}
				this.TreeList.add(Tree);
			}
		}
	}

	public final TypedNode TypeNodeAt(int Index, TypeEnv Gamma, GtType Type, int TypeCheckPolicy) {
		if(this.TreeList != null && Index < this.TreeList.size()) {
			Object NodeObject = this.TreeList.get(Index);
			if(NodeObject instanceof SyntaxTree) {
				TypedNode TypedNode = TypeEnv.TypeCheck(Gamma, (SyntaxTree) NodeObject, Type, TypeCheckPolicy);
				this.TreeList.set(Index, TypedNode);
				return TypedNode;
			}
		}
		if(!IsFlag(TypeCheckPolicy, AllowEmptyPolicy) && !IsFlag(TypeCheckPolicy, IgnoreEmptyPolicy)) {
			Gamma.GammaNameSpace.ReportError(ErrorLevel, this.KeyToken, this.KeyToken.ParsedText + " needs more expression at " + Index);
			return Gamma.Generator.CreateErrorNode(Type, this); // TODO, "syntax tree error: " + Index);
		}
		return null;
	}
}

/* typing */

class GtType extends GtStatic {
	/*field*/public GtContext	GtContext;
	/*field*/int				ClassFlag;
	/*field*/public String		ShortClassName;
	/*field*/GtType				BaseClass;
	/*field*/GtType				SuperClass;
	/*field*/GtParam			ClassParam;
	/*field*/GtType				SearchSimilarClass;
	/*field*/GtArray			ClassMethodList;
	/*field*/public GtType		SearchSuperMethodClass;
	/*field*/public Object		DefaultNullValue;
	/*field*/Object				LocalSpec;

	GtType/*constructor*/(GtContext GtContext, int ClassFlag, String ClassName, Object Spec) {
		this.GtContext = GtContext;
		this.ClassFlag = ClassFlag;
		this.ShortClassName = ClassName;
		this.SuperClass = null;
		this.BaseClass = this;
		this.ClassMethodList = EmptyList;
		this.LocalSpec = Spec;
	}

	@Override public String toString() {
		return this.ShortClassName;
	}

	public boolean Accept(GtType Type) {
		if(this == Type) {
			return true;
		}
		return false;
	}

	public void AddMethod(GtMethod Method) {
		if(this.ClassMethodList == EmptyList){
			this.ClassMethodList = new GtArray();
		}
		this.ClassMethodList.add(Method);
	}

	public GtMethod FindMethod(String MethodName, int ParamSize) {
		for(int i = 0; i < this.ClassMethodList.size(); i++) {
			GtMethod Method = (GtMethod) this.ClassMethodList.get(i);
			if(Method.Match(MethodName, ParamSize)) {
				return Method;
			}
		}
		return null;
	}

	public GtMethod LookupMethod(String MethodName, int ParamSize) {
		GtMethod Method = this.FindMethod(MethodName, ParamSize);
		if(Method != null) {
			return Method;
		}
		if(this.SearchSuperMethodClass != null) {
			Method = this.SearchSuperMethodClass.LookupMethod(MethodName, ParamSize);
			if(Method != null) {
				return Method;
			}
		}
//ifdef JAVA
		if(this.LocalSpec instanceof Class) {
			if(this.CreateMethods(MethodName) > 0) {
				return this.FindMethod(MethodName, ParamSize);
			}
		}
//endif JAVA
		return null;
	}

	public boolean DefineNewMethod(GtMethod NewMethod) {
		for(int i = 0; i < this.ClassMethodList.size(); i++) {
			GtMethod DefinedMethod = (GtMethod) this.ClassMethodList.get(i);
			if(NewMethod.Match(DefinedMethod)) {
				return false;
			}
		}
		this.AddMethod(NewMethod);
		return true;
	}

//ifdef JAVA
	
	public void DefineMethod(int MethodFlag, String MethodName, GtParam Param, Object Callee, String LocalName) {
		GtMethod Method = new GtMethod(MethodFlag, this, MethodName, Param, LangDeps.LookupMethod(Callee, LocalName));
		this.AddMethod(Method);
	}

	public GtType(GtContext GtContext, Class<?> ClassInfo) {
		this(GtContext, 0, ClassInfo.getSimpleName(), null);
		this.LocalSpec = ClassInfo;
		// this.ClassFlag = ClassFlag;
		Class<?> SuperClass = ClassInfo.getSuperclass();
		if(ClassInfo != Object.class && SuperClass != null) {
			this.SuperClass = GtContext.LookupHostLangType(ClassInfo.getSuperclass());
		}
	}

	static GtMethod ConvertMethod(GtContext GtContext, Method Method) {
		GtType ThisType = GtContext.LookupHostLangType(Method.getClass());
		Class<?>[] ParamTypes = Method.getParameterTypes();
		GtType[] ParamData = new GtType[ParamTypes.length + 1];
		String[] ArgNames = new String[ParamTypes.length + 1];
		ParamData[0] = GtContext.LookupHostLangType(Method.getReturnType());
		for(int i = 0; i < ParamTypes.length; i++) {
			ParamData[i + 1] = GtContext.LookupHostLangType(ParamTypes[i]);
			ArgNames[i] = "arg" + i;
		}
		GtParam Param = new GtParam(ParamData.length, ParamData, ArgNames);
		GtMethod Mtd = new GtMethod(0, ThisType, Method.getName(), Param, Method);
		ThisType.AddMethod(Mtd);
		return Mtd;
	}

	int CreateMethods(String MethodName) {
		int Count = 0;
		Method[] Methods = ((Class<?>)this.LocalSpec).getMethods();
		for(int i = 0; i < Methods.length; i++) {
			if(MethodName.equals(Methods[i].getName())) {
				GtType.ConvertMethod(this.GtContext, Methods[i]);
				Count = Count + 1;
			}
		}
		return Count;
	}

	public boolean RegisterCompiledMethod(GtMethod NewMethod) {
		for(int i = 0; i < this.ClassMethodList.size(); i++) {
			GtMethod DefinedMethod = (GtMethod) this.ClassMethodList.get(i);
			if(NewMethod.Match(DefinedMethod)) {
				this.ClassMethodList.set(i, NewMethod);
				return true;
			}
		}
		return false;
	}
//endif VAJA
}

final class GtSymbol extends GtStatic {

	public static boolean IsGetterSymbol(int SymbolId) {
		return (SymbolId & GetterSymbolMask) == GetterSymbolMask;
	}

	public static int ToSetterSymbol(int SymbolId) {
		assert(IsGetterSymbol(SymbolId));
		return (SymbolId & (~GetterSymbolMask)) | SetterSymbolMask;
	}

	// SymbolTable

	static GtArray SymbolList = new GtArray();
	static GtMap   SymbolMap  = new GtMap();

	public final static int MaskSymbol(int SymbolId, int Mask) {
		return (SymbolId << SymbolMaskSize) | Mask;
	}

	public final static int UnmaskSymbol(int SymbolId) {
		return SymbolId >> SymbolMaskSize;
	}

	public static String StringfySymbol(int SymbolId) {
		String Key = (String)SymbolList.get(UnmaskSymbol(SymbolId));
		if((SymbolId & GetterSymbolMask) == GetterSymbolMask) {
			return GetterPrefix + Key;
		}
		if((SymbolId & SetterSymbolMask) == SetterSymbolMask) {
			return GetterPrefix + Key;
		}
		if((SymbolId & MetaSymbolMask) == MetaSymbolMask) {
			return MetaPrefix + Key;
		}
		return Key;
	}

	public static int GetSymbolId(String Symbol, int DefaultSymbolId) {
		String Key = Symbol;
		int Mask = 0;
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
		Integer SymbolObject = (Integer)SymbolMap.get(Key);
		if(SymbolObject == null) {
			if(DefaultSymbolId == AllowNewId) {
				int SymbolId = SymbolList.size();
				SymbolList.add(Key);
				SymbolMap.put(Key, new Integer(SymbolId));
				return MaskSymbol(SymbolId, Mask);
			}
			return DefaultSymbolId;
		}
		return MaskSymbol(SymbolObject.intValue(), Mask);
	}

	public static int GetSymbolId(String Symbol) {
		return GetSymbolId(Symbol, AllowNewId);
	}

	public static String CanonicalSymbol(String Symbol) {
		return Symbol.toLowerCase().replaceAll("_", "");
	}

	public static int GetCanonicalSymbolId(String Symbol) {
		return GetSymbolId(CanonicalSymbol(Symbol), AllowNewId);
	}

}

class GtParam extends GtStatic {
	public final static int	MAX					= 16;
	public final static int	VariableParamSize	= -1;
	public int				ReturnSize;
	public GtType[]			Types;
	public String[]			ArgNames;

	public GtParam(int DataSize, GtType ParamData[], String[] ArgNames) {
		this.ReturnSize = 1;
		this.Types = new GtType[DataSize];
		this.ArgNames = new String[DataSize - this.ReturnSize];
		System.arraycopy(ParamData, 0, this.Types, 0, DataSize);
		System.arraycopy(ArgNames, 0, this.ArgNames, 0, DataSize - this.ReturnSize);
	}

	public static GtParam ParseOf(GtNameSpace ns, String TypeList) {
		GtStatic.TODO("ParseOfParam");
//		Tokens BufferList = ns.Tokenize(TypeList, 0);
//		int next = BufferList.size();
//		ns.PreProcess(BufferList, 0, next, BufferList);
//		GtType[] ParamData = new GtType[GtParam.MAX];
//		String[] ArgNames = new String[GtParam.MAX];
//		int i, DataSize = 0, ParamSize = 0;
//		for(i = next; i < BufferList.size(); i++) {
//			GtToken Token = BufferList.get(i);
//			if(Token.ResolvedObject instanceof GtType) {
//				ParamData[DataSize] = (GtType) Token.ResolvedObject;
//				DataSize++;
//				if(DataSize == GtParam.MAX)
//					break;
//			} else {
//				ArgNames[ParamSize] = Token.ParsedText;
//				ParamSize++;
//			}
//		}
//		return new GtParam(DataSize, ParamData, ArgNames);
		return null;
	}

	public final int GetParamSize() {
		return this.Types.length - this.ReturnSize;
	};

	public final boolean Match(GtParam Other) {
		int ParamSize = Other.GetParamSize();
		if(ParamSize == this.GetParamSize()) {
			for(int i = this.ReturnSize; i < this.Types.length; i++) {
				if(this.Types[i] != Other.Types[i])
					return false;
			}
			return true;
		}
		return false;
	}

	// public boolean Accept(int ParamSize, KClass[] Types) {
	// if(ParamTypes. == ParamSize) {
	// for(int i = 1; i < ParamSize; i++) {
	// if(!ParamTypes[i].Accept(Types[i])) return false;
	// }
	// return true;
	// }
	// return false;
	// }
	// return true;
	// }

}

//ifdef JAVA
class GtMethodInvoker {
	GtParam		Param;
	public Object	CompiledCode;

	public GtMethodInvoker(GtParam Param, Object CompiledCode) {
		this.Param = Param;
		this.CompiledCode = CompiledCode;

	}

	public Object Invoke(Object[] Args) {
		return null;
	}
}

class NativeMethodInvoker extends GtMethodInvoker {

	public NativeMethodInvoker(GtParam Param, Method MethodRef) {
		super(Param, MethodRef);
	}

	public Method GetMethodRef() {
		return (Method) this.CompiledCode;
	}

	boolean IsStaticInvocation() {
		return Modifier.isStatic(this.GetMethodRef().getModifiers());
	}

	@Override public Object Invoke(Object[] Args) {
		int ParamSize = this.Param != null ? this.Param.GetParamSize() : 0;
		try {
			Method MethodRef = this.GetMethodRef();
			if(this.IsStaticInvocation()) {
				switch (ParamSize) {
				case 0:
					return MethodRef.invoke(null, Args[0]);
				case 1:
					return MethodRef.invoke(null, Args[0], Args[1]);
				case 2:
					return MethodRef.invoke(null, Args[0], Args[0], Args[2]);
				case 3:
					return MethodRef.invoke(null, Args[0], Args[0], Args[2], Args[3]);
				case 4:
					return MethodRef.invoke(null, Args[0], Args[1], Args[2], Args[3], Args[4]);
				case 5:
					return MethodRef.invoke(null, Args[0], Args[1], Args[2], Args[3], Args[4], Args[5]);
				default:
					return MethodRef.invoke(null, Args); // FIXME
				}
			} else {
				switch (ParamSize) {
				case 0:
					return MethodRef.invoke(Args[0]);
				case 1:
					return MethodRef.invoke(Args[0], Args[1]);
				case 2:
					return MethodRef.invoke(Args[0], Args[0], Args[2]);
				case 3:
					return MethodRef.invoke(Args[0], Args[0], Args[2], Args[3]);
				case 4:
					return MethodRef.invoke(Args[0], Args[1], Args[2], Args[3], Args[4]);
				case 5:
					return MethodRef.invoke(Args[0], Args[1], Args[2], Args[3], Args[4], Args[5]);
				default:
					return MethodRef.invoke(Args[0], Args); // FIXME
				}
			}
		} catch (IllegalArgumentException e) {
			e.printStackTrace();
		} catch (IllegalAccessException e) {
			e.printStackTrace();
		} catch (InvocationTargetException e) {
			e.printStackTrace();
		}
		return null;
	}
}
//endif VAJA

class GtDef extends GtStatic {

	public void MakeDefinition(GtNameSpace NameSpace) {
		
	}

}

class GtMethod extends GtDef {
	public GtType			ClassInfo;
	public String			MethodName;
	int						MethodSymbolId;
	int						CanonicalSymbolId;
	public GtParam			Param;
	public GtMethodInvoker	MethodInvoker;
	public int				MethodFlag;

	// DoLazyComilation();
	GtNameSpace				LazyNameSpace;
	GtArray					SourceList;
	//FIXME merge ParsedTree field in SouceList.
	public SyntaxTree			ParsedTree;

	public GtMethod(int MethodFlag, GtType ClassInfo, String MethodName, GtParam Param, Method MethodRef) {
		this.MethodFlag = MethodFlag;
		this.ClassInfo = ClassInfo;
		this.MethodName = MethodName;
		this.MethodSymbolId = GtSymbol.GetSymbolId(MethodName);
		this.CanonicalSymbolId = GtSymbol.GetCanonicalSymbolId(MethodName);
		this.Param = Param;
		this.MethodInvoker = null;
		if(MethodRef != null) {
			this.MethodInvoker = new NativeMethodInvoker(Param, MethodRef);
		}
		this.ParsedTree = null;
	}

	@Override public String toString() {
		StringBuilder builder = new StringBuilder();
		builder.append(this.Param.Types[0]);
		builder.append(" ");
		builder.append(this.MethodName);
		builder.append("(");
		for(int i = 0; i < this.Param.ArgNames.length; i++) {
			if(i > 0) {
				builder.append(", ");
			}
			builder.append(this.Param.Types[i + 1]);
			builder.append(" ");
			builder.append(this.Param.ArgNames[i]);
		}
		builder.append(")");
		return builder.toString();
	};

	public boolean Is(int Flag) {
		return ((this.MethodFlag & Flag) == Flag);
	}

	public final GtType GetReturnType(GtType BaseType) {
		GtType ReturnType = this.Param.Types[0];
		return ReturnType;
	}

	public final GtType GetParamType(GtType BaseType, int ParamIdx) {
		GtType ParamType = this.Param.Types[ParamIdx + this.Param.ReturnSize];
		return ParamType;
	}

	public final boolean Match(GtMethod Other) {
		return (this.MethodName.equals(Other.MethodName) && this.Param.Match(Other.Param));
	}

	public boolean Match(String MethodName, int ParamSize) {
		if(MethodName.equals(this.MethodName)) {
			if(ParamSize == -1) {
				return true;
			}
			if(this.Param.GetParamSize() == ParamSize) {
				return true;
			}
		}
		return false;
	}

	public boolean Match(String MethodName, int ParamSize, GtType[] RequestTypes) {
		if(!this.Match(MethodName, ParamSize)) {
			return false;
		}
		for(int i = 0; i < RequestTypes.length; i++) {
			if(RequestTypes.equals(this.GetParamType(this.ClassInfo, i)) == false) {
				return false;
			}
		}
		return true;
	}

	public Object Eval(Object[] ParamData) {
		//int ParamSize = this.Param.GetParamSize();
		//GtDebug.P("ParamSize: " + ParamSize);
		return this.MethodInvoker.Invoke(ParamData);
	}

//	public GtMethod(int MethodFlag, GtType ClassInfo, String MethodName, GtParam Param, GtNameSpace LazyNameSpace, Tokens SourceList) {
//		this(MethodFlag, ClassInfo, MethodName, Param, null);
//		this.LazyNameSpace = LazyNameSpace;
//		this.SourceList = SourceList;
//	}

	public void DoCompilation() {
//		if(this.MethodInvoker != null) {
//			return;
//		}
//		SyntaxTree Tree = this.ParsedTree;
//		GtNameSpace NS = this.LazyNameSpace;
//		if(Tree == null) {
//			Tokens BufferList = new Tokens();
//			NS.PreProcess(this.SourceList, 0, this.SourceList.size(), BufferList);
//			Tree = SyntaxTree.ParseNewNode(NS, null, BufferList, 0, BufferList.size(), AllowEmpty);
//			GtStatic.println("untyped tree: " + Tree);
//		}
//		TypeEnv Gamma = new TypeEnv(this.LazyNameSpace, this);
//		TypedNode TNode = TypeEnv.TypeCheck(Gamma, Tree, Gamma.VoidType, DefaultTypeCheckPolicy);
//		GtBuilder Builder = this.LazyNameSpace.GetBuilder();
//		this.MethodInvoker = Builder.Build(NS, TNode, this);
	}
}

final class VarSet {
	/*field*/public GtType	Type;
	/*field*/public String		Name;

	VarSet/*constructor*/(GtType Type, String Name) {
		this.Type = Type;
		this.Name = Name;
	}
}

final class TypeEnv extends GtStatic {
	/*field*/public GtNameSpace	GammaNameSpace;
	/*field*/public GreenTeaGenerator Generator;

	/*field*/public GtMethod	Method;
	/*field*/public GtType	ReturnType;
	/*field*/public GtType	ThisType;
	/*field*/GtArray	LocalStackList;

	/* for convinient short cut */
	/*field*/public final GtType	VoidType;
	/*field*/public final GtType	BooleanType;
	/*field*/public final GtType	IntType;
	/*field*/public final GtType	StringType;
	/*field*/public final GtType	AnyType;
	
	TypeEnv/*constructor*/(GtNameSpace GammaNameSpace, GtMethod Method) {
		this.GammaNameSpace = GammaNameSpace;
		this.Generator      = GammaNameSpace.GtContext.Generator;
		
		this.VoidType = GammaNameSpace.GtContext.VoidType;
		this.BooleanType = GammaNameSpace.GtContext.BooleanType;
		this.IntType = GammaNameSpace.GtContext.IntType;
		this.StringType = GammaNameSpace.GtContext.StringType;
		this.AnyType = GammaNameSpace.GtContext.AnyType;
		this.Method = Method;
		this.LocalStackList = null;
		
		if(Method != null) {
			this.InitMethod(Method);
		} else {
			// global
			this.ThisType = GammaNameSpace.GetGlobalObject().Type;
			this.AppendLocalType(this.ThisType, "this");
		}
	}

	private void InitMethod(GtMethod Method) {
		this.ReturnType = Method.GetReturnType(Method.ClassInfo);
		this.ThisType = Method.ClassInfo;
		if(!Method.Is(StaticMethod)) {
			this.AppendLocalType(Method.ClassInfo, "this");
			GtParam Param = Method.Param;
			for(int i = 0; i < Param.ArgNames.length; i++) {
				this.AppendLocalType(Param.Types[i + Param.ReturnSize], Param.ArgNames[i]);
			}
		}
	}

	public void AppendLocalType(GtType Type, String Name) {
		if(this.LocalStackList == null) {
			this.LocalStackList = new GtArray();
		}
		this.LocalStackList.add(new VarSet(Type, Name));
	}

	public GtType GetLocalType(String Symbol) {
		if(this.LocalStackList != null) {
			for(int i = this.LocalStackList.size() - 1; i >= 0; i--) {
				VarSet t = (VarSet) this.LocalStackList.get(i);
				if(t.Name.equals(Symbol))
					return t.Type;
			}
		}
		return null;
	}

//	int GetLocalIndex(String Symbol) {
//		return -1;
//	}
//
//	public TypedNode GetDefaultTypedNode(GtType Type) {
//		return null; // TODO
//	}

	public GtType GuessType(Object Value) {
		TODO("GuessType");
		return this.AnyType;
	}
	
	public TypedNode CreateErrorNode(SyntaxTree ParsedTree, String Message) {
		this.GammaNameSpace.ReportError(ErrorLevel, ParsedTree.KeyToken, Message);
		return this.Generator.CreateErrorNode(this.VoidType, ParsedTree);
	}

	public static TypedNode TypeEachNode(TypeEnv Gamma, SyntaxTree Tree, GtType Type) {
		TypedNode Node = GtStatic.ApplyTypeFunc(Tree.Pattern.TypeFunc, Gamma, Tree, Type);
		if(Node == null) {
			Node = Gamma.CreateErrorNode(Tree, "undefined type checker: " + Tree.Pattern);
		}
		return Node;
	}

	public static TypedNode TypeCheckEachNode(TypeEnv Gamma, SyntaxTree Tree, GtType Type, int TypeCheckPolicy) {
		TypedNode Node = TypeEachNode(Gamma, Tree, Type);
		// if(Node.Type == null) {
		//
		// }
		return Node;
	}

	public static TypedNode TypeCheck(TypeEnv Gamma, SyntaxTree Tree, GtType Type, int TypeCheckPolicy) {
		TypedNode TPrevNode = null;
		while(Tree != null) {
			GtType CurrentType = (Tree.NextTree != null) ? Gamma.VoidType : Type;
			TypedNode CurrentTypedNode = TypeCheckEachNode(Gamma, Tree, CurrentType, TypeCheckPolicy);
			if(TPrevNode != null) {
				TPrevNode.LinkNode(CurrentTypedNode);
			}
			TPrevNode = CurrentTypedNode;
			if(CurrentTypedNode.IsError()) {
				break;
			}
			Tree = Tree.NextTree;
		}
		return TPrevNode == null ? null : TPrevNode.GetHeadNode();
	}

}


/* builder */

class GtObject extends GtStatic {
	public GtType	Type;
//	SymbolMap			prototype;
//
	public GtObject(GtType Type) {
		this.Type = Type;
	}

//	public Object GetField(int SymbolId) {
//		if(this.prototype == null) {
//			return null;
//		}
//		return this.prototype.Get(SymbolId);
//	}
//
//	public void SetField(int SymbolId, Object Obj) {
//		if(this.prototype == null) {
//			this.prototype = new SymbolMap();
//		}
//		this.prototype.Set(SymbolId, Obj);
//	}
}



final class GtSpec extends GtStatic {
	/*field*/public int SpecType;
	/*field*/public String SpecKey;
	/*field*/public Object SpecBody;
	
	GtSpec/*constructor*/(int SpecType, String SpecKey, Object SpecBody) {
		this.SpecType = SpecType;
		this.SpecKey  = SpecKey;
		this.SpecBody = SpecBody;
	}
}

final class GtNameSpace extends GtStatic {
	/*field*/public GtContext		GtContext;
	/*field*/GtNameSpace		        ParentNameSpace;
	/*field*/GtArray			        ImportedNameSpaceList;
	/*field*/public GtArray          PublicSpecList;
	/*field*/public GtArray          PrivateSpecList;
	
	/*field*/TokenFunc[]	TokenMatrix;
	/*field*/GtMap	SymbolPatternTable;
	/*field*/GtMap   ExtendedPatternTable;
	
	GtNameSpace/*constructor*/(GtContext GtContext, GtNameSpace ParentNameSpace) {
		this.GtContext = GtContext;
		this.ParentNameSpace = ParentNameSpace;
		this.ImportedNameSpaceList = null;
		this.PublicSpecList = new GtArray();
		this.PrivateSpecList = null;
		this.TokenMatrix = null;
		this.SymbolPatternTable = null;
		this.ExtendedPatternTable = null;
	}
		
	private void RemakeTokenMatrixEach(GtNameSpace NameSpace) {
		for(int i = 0; i < GtStatic.ListSize(NameSpace.PublicSpecList); i++) {
			GtSpec Spec = (GtSpec)NameSpace.PublicSpecList.get(i);
			if(Spec.SpecType != TokenFuncSpec) continue;
			for(int j = 0; j < Spec.SpecKey.length(); j++) {
				int kchar = GtStatic.FromJavaChar(Spec.SpecKey.charAt(j));
				GtFuncToken Func = (GtFuncToken)Spec.SpecBody;
				this.TokenMatrix[kchar] = GtStatic.CreateOrReuseTokenFunc(Func, this.TokenMatrix[kchar]);
			}
		}
	}
	
	private void RemakeTokenMatrix(GtNameSpace NameSpace) {
		if(NameSpace.ParentNameSpace != null) {
			RemakeTokenMatrix(NameSpace.ParentNameSpace);
		}
		RemakeTokenMatrixEach(NameSpace);
		for(int i = 0; i < GtStatic.ListSize(NameSpace.ImportedNameSpaceList); i++) {
			GtNameSpace Imported = (GtNameSpace)NameSpace.ImportedNameSpaceList.get(i);
			RemakeTokenMatrixEach(Imported);
		}
	}
	
	public TokenFunc GetTokenFunc(int GtChar2) {
		if(this.TokenMatrix == null) {
			this.TokenMatrix = new TokenFunc[MaxSizeOfChars];
			RemakeTokenMatrix(this);
		}
		return this.TokenMatrix[GtChar2];
	}

	public void DefineTokenFunc(String keys, GtFuncToken f) {
		this.PublicSpecList.add(new GtSpec(TokenFuncSpec, keys, f));
		this.TokenMatrix = null;
	}
	
	
	private void TableAddSpec(GtMap Table, GtSpec Spec) {
		Object Body = Spec.SpecBody;
		if(Body instanceof SyntaxPattern) {
			Object Parent = Table.get(Spec.SpecKey);
			if(Parent instanceof SyntaxPattern) {
				Body = GtStatic.MergeSyntaxPattern((SyntaxPattern)Body, (SyntaxPattern)Parent);
			}
		}
		Table.put(Spec.SpecKey, Body);
	}
	
	private void RemakeSymbolTableEach(GtNameSpace NameSpace, GtArray SpecList) {
		for(int i = 0; i < GtStatic.ListSize(SpecList); i++) {
			GtSpec Spec = (GtSpec)SpecList.get(i);
			if(Spec.SpecType == SymbolPatternSpec) {
				this.TableAddSpec(this.SymbolPatternTable, Spec);
			}
			else if(Spec.SpecType == ExtendedPatternSpec) {
				this.TableAddSpec(this.ExtendedPatternTable, Spec);
			}
		}
	}
	
	private void RemakeSymbolTable(GtNameSpace NameSpace) {
		if(NameSpace.ParentNameSpace != null) {
			this.RemakeSymbolTable(NameSpace.ParentNameSpace);
		}
		this.RemakeSymbolTableEach(NameSpace, NameSpace.PublicSpecList);
		this.RemakeSymbolTableEach(NameSpace, NameSpace.PrivateSpecList);
		for(int i = 0; i < GtStatic.ListSize(NameSpace.ImportedNameSpaceList); i++) {
			GtNameSpace Imported = (GtNameSpace)NameSpace.ImportedNameSpaceList.get(i);
			this.RemakeSymbolTableEach(Imported, Imported.PublicSpecList);
		}
	}
	
	public Object GetSymbol(String Key) {
		if(this.SymbolPatternTable == null) {
			this.SymbolPatternTable = new GtMap();
			this.ExtendedPatternTable = new GtMap();
			this.RemakeSymbolTable(this);
		}
		return this.SymbolPatternTable.get(Key);
	}
		
	public SyntaxPattern GetPattern(String PatternName) {
		Object Body = this.GetSymbol(PatternName);
		return (Body instanceof SyntaxPattern) ? (SyntaxPattern)Body : null;
	}

	public SyntaxPattern GetExtendedPattern(String PatternName) {
		if(this.ExtendedPatternTable == null) {
			this.SymbolPatternTable = new GtMap();
			this.ExtendedPatternTable = new GtMap();
			this.RemakeSymbolTable(this);
		}
		Object Body = this.ExtendedPatternTable.get(PatternName);
		return (Body instanceof SyntaxPattern) ? (SyntaxPattern)Body : null;
	}

	public void DefineSymbol(String Key, Object Value) {
		GtSpec Spec = new GtSpec(SymbolPatternSpec, Key, Value);
		this.PublicSpecList.add(Spec);
		if(this.SymbolPatternTable != null) {
			this.TableAddSpec(this.SymbolPatternTable, Spec);
		}
	}

	public void DefinePrivateSymbol(String Key, Object Value) {
		GtSpec Spec = new GtSpec(SymbolPatternSpec, Key, Value);
		if(this.PrivateSpecList == null) {
			this.PrivateSpecList = new GtArray();
		}
		this.PrivateSpecList.add(Spec);
		if(this.SymbolPatternTable != null) {
			this.TableAddSpec(this.SymbolPatternTable, Spec);
		}
	}

	public void DefineSyntaxPattern(String PatternName, GtFuncMatch MatchFunc, GtFuncTypeCheck TypeFunc) {
		SyntaxPattern Pattern = new SyntaxPattern(this, PatternName, MatchFunc, TypeFunc);
		GtSpec Spec = new GtSpec(SymbolPatternSpec, PatternName, Pattern);
		this.PublicSpecList.add(Spec);
		if(this.SymbolPatternTable != null) {
			this.TableAddSpec(this.SymbolPatternTable, Spec);
		}
	}

	public void DefineExtendedPattern(String PatternName, int SyntaxFlag, GtFuncMatch MatchFunc, GtFuncTypeCheck TypeFunc) {
		SyntaxPattern Pattern = new SyntaxPattern(this, PatternName, MatchFunc, TypeFunc);
		Pattern.SyntaxFlag = SyntaxFlag;
		GtSpec Spec = new GtSpec(ExtendedPatternSpec, PatternName, Pattern);
		this.PublicSpecList.add(Spec);
		if(this.ExtendedPatternTable != null) {
			this.TableAddSpec(this.ExtendedPatternTable, Spec);
		}
	}
	
	// Global Object
	public GtObject CreateGlobalObject(int ClassFlag, String ShortName) {
		GtType NewClass = new GtType(this.GtContext, ClassFlag, ShortName, null);
		GtObject GlobalObject = new GtObject(NewClass);
		NewClass.DefaultNullValue = GlobalObject;
		return GlobalObject;
	}

	public GtObject GetGlobalObject() {
		Object GlobalObject = this.GetSymbol(GlobalConstName);
		if(GlobalObject == null || !(GlobalObject instanceof GtObject)) {
			GlobalObject = this.CreateGlobalObject(SingletonClass, "global");
			this.DefinePrivateSymbol(GlobalConstName, GlobalObject);
		}
		return (GtObject) GlobalObject;
	}

	public void ImportNameSpace(GtNameSpace ImportedNameSpace) {
		if(this.ImportedNameSpaceList == null) {
			this.ImportedNameSpaceList = new GtArray();
			this.ImportedNameSpaceList.add(ImportedNameSpace);
		}
		this.TokenMatrix = null;
		this.SymbolPatternTable = null;
		this.ExtendedPatternTable = null;
	}

	public Object Eval(String ScriptSource, long FileLine, GreenTeaGenerator Visitor) {
		Object ResultValue = null;
		DebugP("Eval: " + ScriptSource);
		TokenContext TokenContext = new TokenContext(this, ScriptSource, FileLine);
		while(TokenContext.HasNext()) {
			SyntaxTree Tree = GtStatic.ParseSyntaxTree(null, TokenContext);
			DebugP("untyped tree: " + Tree);
//			TypeEnv Gamma = new TypeEnv(this, null);
//			TypedNode TNode = TypeEnv.TypeCheckEachNode(Gamma, Tree, Gamma.VoidType, DefaultTypeCheckPolicy);
//			GtBuilder Builder = this.GetBuilder();
//			ResultValue = Builder.EvalAtTopLevel(this, TNode, this.GetGlobalObject());
		}
		return ResultValue;
	}

	public GtMethod LookupMethod(String MethodName, int ParamSize) {
		//FIXME
		//MethodName = "ClassName.MethodName";
		//1. (ClassName, MethodName) = MethodName.split(".")
		//2. find MethodName(arg0, arg1, ... , arg_ParamSize)
		return null;
	}

	private String GetSourcePosition(long FileLine) {
		return "(eval:" + (int) FileLine + ")";
	}

	public String ReportError(int Level, GtToken Token, String Message) {
		if(!Token.IsError()) {
			if(Level == ErrorLevel) {
				Message = "(error) " + this.GetSourcePosition(Token.FileLine) + " " + Message;
				Token.ToErrorToken(Message);
			} else if(Level == WarningLevel) {
				Message = "(warning) " + this.GetSourcePosition(Token.FileLine) + " " + Message;
			} else if(Level == InfoLevel) {
				Message = "(info) " + this.GetSourcePosition(Token.FileLine) + " " + Message;
			}
			GtStatic.println(Message);
			return Message;
		}
		return Token.GetErrorMessage();
	}

}

class GtGrammar extends GtStatic {

	// Token
	public static int WhiteSpaceToken(TokenContext TokenContext, String SourceText, int pos) {
		TokenContext.FoundWhiteSpace();
		for(; pos < SourceText.length(); pos++) {
			char ch = SourceText.charAt(pos);
			if(!LangDeps.IsWhitespace(ch)) {
				break;
			}
		}
		return pos;
	}

	public static int IndentToken(TokenContext TokenContext, String SourceText, int pos) {
		int LineStart = pos + 1;
		TokenContext.FoundLineFeed(1);
		pos = pos + 1;
		for(; pos < SourceText.length(); pos++) {
			char ch = SourceText.charAt(pos);
			if(!LangDeps.IsWhitespace(ch)) {
				break;
			}
		}
		String Text = "";
		if(LineStart < pos) {
			Text = SourceText.substring(LineStart, pos);
		}
		TokenContext.AddNewToken(Text, IndentTokenFlag, null);
		return pos;
	}

	public static int SingleSymbolToken(TokenContext TokenContext, String SourceText, int pos) {
		TokenContext.AddNewToken(SourceText.substring(pos, pos + 1), 0, null);
		return pos + 1;
	}

	public static int SymbolToken(TokenContext TokenContext, String SourceText, int pos) {
		int start = pos;
		for(; pos < SourceText.length(); pos++) {
			char ch = SourceText.charAt(pos);
			if(!LangDeps.IsLetter(ch) && !LangDeps.IsDigit(ch) && ch != '_') {
				break;
			}
		}
		TokenContext.AddNewToken(SourceText.substring(start, pos), 0, null);
		return pos;
	}

	public static int MemberToken(TokenContext TokenContext, String SourceText, int pos) {
		int start = pos + 1;
		for(; pos < SourceText.length(); pos++) {
			char ch = SourceText.charAt(pos);
			if(!LangDeps.IsLetter(ch) && !LangDeps.IsDigit(ch) && ch != '_') {
				break;
			}
		}
		TokenContext.AddNewToken(SourceText.substring(start, pos), 0, "$Member$");
		return pos;
	}

	public static int NumberLiteralToken(TokenContext TokenContext, String SourceText, int pos) {
		int start = pos;
		for(; pos < SourceText.length(); pos++) {
			char ch = SourceText.charAt(pos);
			if(!LangDeps.IsDigit(ch)) {
				break;
			}
		}
		TokenContext.AddNewToken(SourceText.substring(start, pos), 0, "$IntegerLiteral$");
		return pos;
	}

	public static int StringLiteralToken(TokenContext TokenContext, String SourceText, int pos) {
		int start = pos + 1;
		char prev = '"';
		pos = start;
		while(pos < SourceText.length()) {
			char ch = SourceText.charAt(pos);
			if(ch == '"' && prev != '\\') {
				TokenContext.AddNewToken(SourceText.substring(start, pos), 0, "$StringLiteral$");
				return pos + 1;
			}
			if(ch == '\n') {
				TokenContext.ReportTokenError(ErrorLevel, "expected \" to close the string literal", SourceText.substring(start, pos));
				TokenContext.FoundLineFeed(1);
				return pos;
			}
			pos = pos + 1;
			prev = ch;
		}
		TokenContext.ReportTokenError(ErrorLevel, "expected \" to close the string literal", SourceText.substring(start, pos));
		return pos;
	}

	public static SyntaxTree ParseType(SyntaxPattern Pattern, SyntaxTree LeftTree, TokenContext TokenContext) {
		DebugP("Entering ParseType..");
		return null; // Not Matched
	}

	public static SyntaxTree ParseSymbol(SyntaxPattern Pattern, SyntaxTree LeftTree, TokenContext TokenContext) {
		DebugP("Entering ParseSymbol..");
		GtToken Token = TokenContext.Next();
		return new SyntaxTree(Pattern, TokenContext.NameSpace, Token);
	}

	public static TypedNode TypeVariable(TypeEnv Gamma, SyntaxTree ParsedTree, GtType Type) {
		// case: Symbol is LocalVariable
		Type = Gamma.GetLocalType(ParsedTree.KeyToken.ParsedText);
		if(Type != null) {
			return Gamma.Generator.CreateLocalNode(Type, ParsedTree);
		}
		// case: Symbol is GlobalVariable
		if(ParsedTree.KeyToken.ParsedText.equals("global")) {
			return new ConstNode(
				ParsedTree.TreeNameSpace.GetGlobalObject().Type,
				ParsedTree.KeyToken,
				ParsedTree.TreeNameSpace.GetGlobalObject());
		}
		// case: Symbol is undefined name
		return Gamma.CreateErrorNode(ParsedTree, "undefined name: " + ParsedTree.KeyToken.ParsedText);
	}

	// Parse And Type
	public static SyntaxTree ParseIntegerLiteral(SyntaxPattern Pattern, SyntaxTree LeftTree, TokenContext TokenContext) {
		GtToken Token = TokenContext.Next();
		return new SyntaxTree(Pattern, TokenContext.NameSpace, Token);
	}

	public static TypedNode TypeIntegerLiteral(TypeEnv Gamma, SyntaxTree Tree, GtType Type) {
		GtToken Token = Tree.KeyToken;
		return new ConstNode(Gamma.IntType, Token, Integer.valueOf(Token.ParsedText));
	}

	public static SyntaxTree ParseStringLiteral(SyntaxPattern Pattern, SyntaxTree LeftTree, TokenContext TokenContext) {
		GtToken Token = TokenContext.Next();
		return new SyntaxTree(Pattern, TokenContext.NameSpace, Token);
	}

	public static TypedNode TypeStringLiteral(TypeEnv Gamma, SyntaxTree ParsedTree, GtType Type) {
		GtToken Token = ParsedTree.KeyToken;
		TODO("handling string literal");
		return Gamma.Generator.CreateConstNode(Gamma.StringType, ParsedTree, Token.ParsedText);
	}

	public static SyntaxTree ParseConst(SyntaxPattern Pattern, SyntaxTree LeftTree, TokenContext TokenContext) {
		GtToken Token = TokenContext.Next();
		return new SyntaxTree(Pattern, TokenContext.NameSpace, Token);
	}

	public static TypedNode TypeConst(TypeEnv Gamma, SyntaxTree ParsedTree, GtType Type) {
		GtToken Token = ParsedTree.KeyToken;
		/* FIXME: handling of resolved object */
		return Gamma.Generator.CreateConstNode(Gamma.GuessType(ParsedTree.ResolvedObject), Token, ParsedTree.ResolvedObject);
	}

	public static SyntaxTree ParseExpression(SyntaxPattern Pattern, SyntaxTree LeftTree, TokenContext TokenContext) {
		return GtStatic.ParseSyntaxTree(null, TokenContext);
	}
	
	public static SyntaxTree ParseUnary(SyntaxPattern Pattern, SyntaxTree LeftTree, TokenContext TokenContext) {
		GtToken Token = TokenContext.Next();
		SyntaxTree Tree = new SyntaxTree(Pattern, TokenContext.NameSpace, Token);
		Tree.SetMatchedPatternAt(0, TokenContext, "$Expression$", Required);
		return Tree;
	}

	public static SyntaxTree ParseBinary(SyntaxPattern Pattern, SyntaxTree LeftTree, TokenContext TokenContext) {
		GtToken Token = TokenContext.Next();
		SyntaxTree RightTree = GtStatic.ParseSyntaxTree(null, TokenContext);
		if(GtStatic.IsEmptyOrError(RightTree)) return RightTree;

		/* 1 + 2 * 3 */
		/* 1 * 2 + 3 */
		if(RightTree.Pattern.IsBinaryOperator()) {
			if(Pattern.IsLeftJoin(RightTree.Pattern)) {
				SyntaxTree NewTree = new SyntaxTree(Pattern, TokenContext.NameSpace, Token);
				NewTree.SetSyntaxTreeAt(LeftHandTerm, LeftTree);
				NewTree.SetSyntaxTreeAt(RightHandTerm, RightTree.GetSyntaxTreeAt(LeftHandTerm));
				RightTree.SetSyntaxTreeAt(LeftHandTerm, NewTree);
				return RightTree;
			}
		}
		SyntaxTree NewTree = new SyntaxTree(Pattern, TokenContext.NameSpace, Token);
		NewTree.SetSyntaxTreeAt(LeftHandTerm, LeftTree);
		NewTree.SetSyntaxTreeAt(RightHandTerm, RightTree);
		if(RightTree.NextTree != null) {
			NewTree.LinkNode(RightTree.NextTree);
			RightTree.NextTree = null;
		}
		return NewTree;
	}

	// PatternName: "("
	public static SyntaxTree ParseParenthesis(SyntaxPattern Pattern, SyntaxTree LeftTree, TokenContext TokenContext) {
		int ParseFlag = TokenContext.ParseFlag;
		TokenContext.MatchToken("(");
		TokenContext.ParseFlag |= SkipIndentParseFlag;
		SyntaxTree Tree = TokenContext.ParsePattern("$Expression$", Required);
		if(!TokenContext.MatchToken(")")) {
			Tree = TokenContext.ReportExpectedToken(")");
		}
		TokenContext.ParseFlag = ParseFlag;		
		return Tree;
	}
	
	// PatternName: "("
	public static SyntaxTree ParseParenthesis2(SyntaxPattern Pattern, SyntaxTree LeftTree, TokenContext TokenContext) {
		int ParseFlag = TokenContext.ParseFlag;
		TokenContext.ParseFlag |= SkipIndentParseFlag;
		SyntaxTree FuncTree = new SyntaxTree(Pattern, TokenContext.NameSpace, TokenContext.GetMatchedToken("("));
		FuncTree.AppendParsedTree(LeftTree);
		while(!FuncTree.IsEmptyOrError() && !TokenContext.MatchToken(")")) {
			SyntaxTree Tree = TokenContext.ParsePattern("$Expression$", Required);
			FuncTree.AppendParsedTree(Tree);
			if(TokenContext.MatchToken(",")) continue;
		}
		TokenContext.ParseFlag = ParseFlag;		
		return FuncTree;
	}

	public static SyntaxTree ParseBlock2(SyntaxPattern Pattern, SyntaxTree LeftTree, TokenContext TokenContext) {
		TokenContext.MatchToken("{");
		SyntaxTree PrevTree = null;
		while(TokenContext.SkipEmptyStatement()) {
			if(TokenContext.MatchToken("}")) break;
			PrevTree = GtStatic.ParseSyntaxTree(PrevTree, TokenContext);
			if(GtStatic.IsEmptyOrError(PrevTree)) return PrevTree;
		}
		return GtStatic.TreeHead(PrevTree);
	}

	public static TypedNode TypeBlock(TypeEnv Gamma, SyntaxTree Tree, GtType Type) {
		TODO("TypeBlock");
		return Tree.TypeNodeAt(0, Gamma, Gamma.AnyType, 0);
	}

	public static TypedNode TypeApply(TypeEnv Gamma, SyntaxTree Tree, GtType Type) {
		TODO("This is really necessary");
		return null;
	}

	public static TypedNode TypeAnd(TypeEnv Gamma, SyntaxTree ParsedTree, GtType Type) {
		TypedNode LeftNode = ParsedTree.TypeNodeAt(LeftHandTerm, Gamma, Gamma.BooleanType, DefaultTypeCheckPolicy);
		TypedNode RightNode = ParsedTree.TypeNodeAt(RightHandTerm, Gamma, Gamma.BooleanType, DefaultTypeCheckPolicy);
		return Gamma.Generator.CreateAndNode(Gamma.BooleanType, ParsedTree, LeftNode, RightNode);
	}

	public static TypedNode TypeOr(TypeEnv Gamma, SyntaxTree ParsedTree, GtType Type) {
		TypedNode LeftNode = ParsedTree.TypeNodeAt(LeftHandTerm, Gamma, Gamma.BooleanType, DefaultTypeCheckPolicy);
		TypedNode RightNode = ParsedTree.TypeNodeAt(RightHandTerm, Gamma, Gamma.BooleanType, DefaultTypeCheckPolicy);
		return Gamma.Generator.CreateOrNode(Gamma.BooleanType, ParsedTree, LeftNode, RightNode);
	}

	public static SyntaxTree ParseMember(SyntaxPattern Pattern, SyntaxTree LeftTree, TokenContext TokenContext) {
		GtToken Token = TokenContext.GetToken();
		SyntaxTree NewTree = new SyntaxTree(Pattern, TokenContext.NameSpace, Token);
		NewTree.SetSyntaxTreeAt(0, LeftTree);
		return NewTree;		
	}

	// If Statement

	public static SyntaxTree ParseIf(SyntaxPattern Pattern, SyntaxTree LeftTree, TokenContext TokenContext) {
		GtToken Token = TokenContext.GetMatchedToken("if");
		SyntaxTree NewTree = new SyntaxTree(Pattern, TokenContext.NameSpace, Token);
		NewTree.SetMatchedTokenAt(NoWhere, TokenContext, "(", Required);
		NewTree.SetMatchedPatternAt(IfCond, TokenContext, "$Expression$", Required);
		NewTree.SetMatchedTokenAt(NoWhere, TokenContext, ")", Required);
		NewTree.SetMatchedPatternAt(IfThen, TokenContext, "$Statement$", Required);
		if(TokenContext.MatchToken("else")) {
			NewTree.SetMatchedPatternAt(IfElse, TokenContext, "$Statement$", Required);
		}
		return NewTree;
	}

	public static TypedNode TypeIf(TypeEnv Gamma, SyntaxTree ParsedTree, GtType Type) {
		TypedNode CondNode = ParsedTree.TypeNodeAt(IfCond, Gamma, Gamma.BooleanType, DefaultTypeCheckPolicy);
		TypedNode ThenNode = ParsedTree.TypeNodeAt(IfThen, Gamma, Type, DefaultTypeCheckPolicy);
		TypedNode ElseNode = ParsedTree.TypeNodeAt(IfElse, Gamma, ThenNode.Type, AllowEmptyPolicy);
		return Gamma.Generator.CreateIfNode(ThenNode.Type, ParsedTree, CondNode, ThenNode, ElseNode);
	}

	// Return Statement

	public static SyntaxTree ParseReturn(SyntaxPattern Pattern, SyntaxTree LeftTree, TokenContext TokenContext) {
		GtToken Token = TokenContext.GetMatchedToken("return");
		SyntaxTree NewTree = new SyntaxTree(Pattern, TokenContext.NameSpace, Token);
		NewTree.SetMatchedPatternAt(ReturnExpr, TokenContext, "$Expression$", Optional);
		return NewTree;
	}

	public static TypedNode TypeReturn(TypeEnv Gamma, SyntaxTree ParsedTree, GtType Type) {
		TypedNode Expr = ParsedTree.TypeNodeAt(ReturnExpr, Gamma, Gamma.ReturnType, DefaultTypeCheckPolicy);
		return Gamma.Generator.CreateReturnNode(Expr.Type, ParsedTree, Expr);
	}
	
	public static SyntaxTree ParseVarDecl(SyntaxPattern Pattern, SyntaxTree LeftTree, TokenContext TokenContext) {
		DebugP("Entering ParseVarDecl..");
		SyntaxTree Tree = new SyntaxTree(Pattern, TokenContext.NameSpace, TokenContext.GetToken());
		Tree.SetMatchedPatternAt(VarDeclType, TokenContext, "$Type$", Required);
		Tree.SetMatchedPatternAt(VarDeclName, TokenContext, "$Variable$", Required);
		if(TokenContext.MatchToken("=")) {
			Tree.SetMatchedPatternAt(VarDeclValue, TokenContext, "$Expression$", Required);
		}
		while(TokenContext.MatchToken(",")) {
			SyntaxTree NextTree = new SyntaxTree(Pattern, TokenContext.NameSpace, Tree.KeyToken);
			NextTree.SetAt(VarDeclType, Tree.GetSyntaxTreeAt(VarDeclType));
			Tree.LinkNode(NextTree);
			Tree = NextTree;
			Tree.SetMatchedPatternAt(VarDeclName, TokenContext, "$Variable$", Required);
			if(TokenContext.MatchToken("=")) {
				Tree.SetMatchedPatternAt(VarDeclValue, TokenContext, "$Expression$", Required);
			}
		}
		return Tree;
	}

	public static SyntaxTree ParseMethodDecl(SyntaxPattern Pattern, SyntaxTree LeftTree, TokenContext TokenContext) {
		SyntaxTree Tree = new SyntaxTree(Pattern, TokenContext.NameSpace, TokenContext.GetToken());
		Tree.SetMatchedPatternAt(MethodDeclReturnType, TokenContext, "$Type$", Required);
		Tree.SetMatchedPatternAt(MethodDeclClass, TokenContext, "$MethodClass$", Optional);
		Tree.SetMatchedPatternAt(MethodDeclName, TokenContext, "$MethodName$", Required);
		Tree.SetMatchedTokenAt(NoWhere, TokenContext, "(", Required);
		int ParamBase = MethodDeclParam;
		while(!Tree.IsEmptyOrError() && !TokenContext.MatchToken(")")) {
			Tree.SetMatchedPatternAt(ParamBase + VarDeclType, TokenContext, "$Type$", Required);
			Tree.SetMatchedPatternAt(ParamBase + VarDeclName, TokenContext, "$Symbol$", Required);
			if(TokenContext.MatchToken("=")) {
				Tree.SetMatchedPatternAt(ParamBase + VarDeclValue, TokenContext, "$Expression$", Required);
			}
			ParamBase += 3;
		}
		Tree.SetMatchedPatternAt(MethodDeclBlock, TokenContext, "$Block$", Required);
		return Tree;
	}

	public static TypedNode TypeVarDecl(TypeEnv Gamma, SyntaxTree Tree, GtType Type) {		
		TODO("TypeVarDecl");
//		GtType AnyType = Tree.GetTokenType(VarDeclTypeOffset, null);
//		GtToken VarToken = Tree.GetAtToken(VarDeclNameOffset);
//		String VarName = Tree.GetTokenString(VarDeclNameOffset, null);
//		if(AnyType.equals(Gamma.AnyType)) {
//			return new ErrorNode(Type, VarToken, "cannot infer variable type");
//		}
//		assert (VarName != null);
//		Gamma.AppendLocalType(AnyType, VarName);
//		TypedNode Value = Tree.TypeNodeAt(2, Gamma, AnyType, 0);
//		return new LetNode(AnyType, VarToken, Value, null);
		return null;
	}

	public static TypedNode TypeMethodDecl(TypeEnv Gamma, SyntaxTree Tree, GtType Type) {
		TODO("TypeMethodDecl");
//		GtType AnyType = Tree.GetTokenType(VarDeclTypeOffset, null);
//		GtToken VarToken = Tree.GetAtToken(VarDeclNameOffset);
//		String VarName = Tree.GetTokenString(VarDeclNameOffset, null);
//		if(AnyType.equals(Gamma.AnyType)) {
//			return new ErrorNode(Type, VarToken, "cannot infer variable type");
//		}
//		assert (VarName != null);
//		Gamma.AppendLocalType(AnyType, VarName);
//		TypedNode Value = Tree.TypeNodeAt(2, Gamma, AnyType, 0);
//		return new LetNode(AnyType, VarToken, Value, null);
		return null;
	}

//	public static SyntaxTree ParseUNUSED(SyntaxPattern Pattern, SyntaxTree LeftTree, TokenContext TokenContext) {
//		DebugP("** Syntax " + Tree.Pattern + " is undefined **");
//		return NoMatch;
//	}
//
//	public static TypedNode TypeUNUSED(TypeEnv Gamma, SyntaxTree Tree, GtType Type) {
//		DebugP("** Syntax " + Tree.Pattern + " is undefined **");
//		return null;
//	}

	public void LoadDefaultSyntax(GtNameSpace NameSpace) {
		// Define Types
		GtContext GtContext = NameSpace.GtContext;
		NameSpace.DefineSymbol("void",    GtContext.VoidType); // FIXME
		NameSpace.DefineSymbol("boolean", GtContext.BooleanType);
		NameSpace.DefineSymbol("Object",  GtContext.ObjectType);
		NameSpace.DefineSymbol("int",     GtContext.IntType);
		NameSpace.DefineSymbol("String",  GtContext.StringType);

		// Define Constants
		NameSpace.DefineSymbol("true", new Boolean(true));
		NameSpace.DefineSymbol("false", new Boolean(false));

		NameSpace.DefineTokenFunc(" \t", FunctionA(this, "WhiteSpaceToken"));
		NameSpace.DefineTokenFunc("\n",  FunctionA(this, "IndentToken"));
		NameSpace.DefineTokenFunc("(){}[]<>,;+-*/%=&|!", FunctionA(this, "SingleSymbolToken"));
		NameSpace.DefineTokenFunc("Aa", FunctionA(this, "SymbolToken"));
		NameSpace.DefineTokenFunc(".",  FunctionA(this, "MemberToken"));
		NameSpace.DefineTokenFunc("\"", FunctionA(this, "StringLiteralToken"));
		NameSpace.DefineTokenFunc("1",  FunctionA(this, "NumberLiteralToken"));
//#ifdef JAVA
		GtFuncMatch ParseUnary = FunctionB(this, "ParseUnary");
		GtFuncMatch ParseBinary = FunctionB(this, "ParseBinary");
		GtFuncTypeCheck TypeApply   = FunctionC(this, "TypeApply");
//endif VAJA
		NameSpace.DefineSyntaxPattern("+", ParseUnary, TypeApply);
		NameSpace.DefineSyntaxPattern("-", ParseUnary, TypeApply);
		NameSpace.DefineSyntaxPattern("!", ParseUnary, TypeApply);
		
		NameSpace.DefineExtendedPattern("*", BinaryOperator | Precedence_CStyleMUL, ParseBinary, TypeApply);
		NameSpace.DefineExtendedPattern("/", BinaryOperator | Precedence_CStyleMUL, ParseBinary, TypeApply);
		NameSpace.DefineExtendedPattern("%", BinaryOperator | Precedence_CStyleMUL, ParseBinary, TypeApply);

		NameSpace.DefineExtendedPattern("+", BinaryOperator | Precedence_CStyleADD, ParseBinary, TypeApply);
		NameSpace.DefineExtendedPattern("-", BinaryOperator | Precedence_CStyleADD, ParseBinary, TypeApply);

		NameSpace.DefineExtendedPattern("<", BinaryOperator | Precedence_CStyleCOMPARE, ParseBinary, TypeApply);
		NameSpace.DefineExtendedPattern("<=", BinaryOperator | Precedence_CStyleCOMPARE, ParseBinary, TypeApply);
		NameSpace.DefineExtendedPattern(">", BinaryOperator | Precedence_CStyleCOMPARE, ParseBinary, TypeApply);
		NameSpace.DefineExtendedPattern(">=", BinaryOperator | Precedence_CStyleCOMPARE, ParseBinary, TypeApply);
		NameSpace.DefineExtendedPattern("==", BinaryOperator | Precedence_CStyleEquals, ParseBinary, TypeApply);
		NameSpace.DefineExtendedPattern("!=", BinaryOperator | Precedence_CStyleEquals, ParseBinary, TypeApply);

		NameSpace.DefineExtendedPattern("=", BinaryOperator | Precedence_CStyleAssign | LeftJoin, ParseBinary, FunctionC(this, "TypeAssign"));

		NameSpace.DefineExtendedPattern("&&", BinaryOperator | Precedence_CStyleAND, ParseBinary, FunctionC(this, "TypeAnd"));
		NameSpace.DefineExtendedPattern("||", BinaryOperator | Precedence_CStyleOR, ParseBinary, FunctionC(this, "TypeOr"));
		
		//NameSpace.DefineSyntaxPattern(";", Precedence_CStyleDelim, this, null, null);
		//NameSpace.DefineSyntaxPattern("$Const", Term, this, "Const");
		//NameSpace.DefineSyntaxPattern("$Symbol", Term, this, "Symbol");
		//NameSpace.DefineSyntaxPattern("$Symbol", Term, this, "MethodCall");

		//NameSpace.DefineSyntaxPattern("$MethodCall", Precedence_CStyleSuffixCall, this, "MethodCall");
		//NameSpace.DefineSyntaxPattern("$Member", Precedence_CStyleSuffixCall, this, "Member");
		//NameSpace.DefineSyntaxPattern("$New", Term, this, "New");

		//NameSpace.DefineSyntaxPattern("()", Term | Precedence_CStyleSuffixCall, this, "UNUSED");
		//NameSpace.DefineSyntaxPattern("{}", 0, this, "UNUSED");
		GtFuncTypeCheck TypeConst = FunctionC(this, "TypeConst");
		
		NameSpace.DefineSyntaxPattern("$Symbol$", FunctionB(this, "ParseSymbol"), FunctionC(this, "TypeVariable"));
		NameSpace.DefineSyntaxPattern("$Type$", FunctionB(this, "ParseType"), TypeConst);
		
		NameSpace.DefineSyntaxPattern("$Const$", FunctionB(this, "ParseConst"), FunctionC(this, "TypeSymbol"));
		NameSpace.DefineSyntaxPattern("$StringLiteral$", FunctionB(this, "ParseStringLiteral"), TypeConst);
		NameSpace.DefineSyntaxPattern("$IntegerLiteral$", FunctionB(this, "ParseIntegerLiteral"), TypeConst);

		NameSpace.DefineSyntaxPattern("(", FunctionB(this, "ParseParenthesis"), null);

		NameSpace.DefineSyntaxPattern("{", FunctionB(this, "ParseBlock"), FunctionC(this, "TypeBlock"));
		
		NameSpace.DefineSyntaxPattern("$Symbol$", FunctionB(this, "ParseMethodDecl"), FunctionC(this, "TypeMethodDecl"));
		NameSpace.DefineSyntaxPattern("$Symbol$", FunctionB(this, "ParseVarDecl"), FunctionC(this, "TypeVarDecl"));

		NameSpace.DefineSyntaxPattern("if", FunctionB(this, "ParseIf"), FunctionC(this, "TypeIf"));
		NameSpace.DefineSyntaxPattern("return", FunctionB(this, "ParseReturn"), FunctionC(this, "ParseReturn"));

//		// Load Library
//		new GtInt().MakeDefinition(NameSpace);
//		new GtStringDef().MakeDefinition(NameSpace);
//		new GtSystemDef().MakeDefinition(NameSpace);
	}
}

//ifdef JAVA
class GtInt extends GtStatic {

	public void MakeDefinition(GtNameSpace ns) {
//		GtType BaseClass = ns.LookupHostLangType(Integer.class);
//		GtParam BinaryParam = GtParam.ParseOf(ns, "int int x");
//		GtParam UnaryParam = GtParam.ParseOf(ns, "int");
//
//		BaseClass.DefineMethod(ImmutableMethod | ConstMethod, "+", UnaryParam, this, "PlusInt");
//		BaseClass.DefineMethod(ImmutableMethod | ConstMethod, "+", BinaryParam, this, "IntAddInt");
//		BaseClass.DefineMethod(ImmutableMethod | ConstMethod, "-", UnaryParam, this, "MinusInt");
//		BaseClass.DefineMethod(ImmutableMethod | ConstMethod, "-", BinaryParam, this, "IntSubInt");
//		BaseClass.DefineMethod(ImmutableMethod | ConstMethod, "*", BinaryParam, this, "IntMulInt");
//		BaseClass.DefineMethod(ImmutableMethod | ConstMethod, "/", BinaryParam, this, "IntDivInt");
//		BaseClass.DefineMethod(ImmutableMethod | ConstMethod, "%", BinaryParam, this, "IntModInt");
//
//		GtParam RelationParam = GtParam.ParseOf(ns, "boolean int x");
//		BaseClass.DefineMethod(ImmutableMethod | ConstMethod, "<", RelationParam, this, "IntLtInt");
//		BaseClass.DefineMethod(ImmutableMethod | ConstMethod, "<=", RelationParam, this, "IntLeInt");
//		BaseClass.DefineMethod(ImmutableMethod | ConstMethod, ">", RelationParam, this, "IntGtInt");
//		BaseClass.DefineMethod(ImmutableMethod | ConstMethod, ">=", RelationParam, this, "IntGeInt");
//		BaseClass.DefineMethod(ImmutableMethod | ConstMethod, "==", RelationParam, this, "IntEqInt");
//		BaseClass.DefineMethod(ImmutableMethod | ConstMethod, "!=", RelationParam, this, "IntNeInt");
//
//		//		if(GtDebug.UseBuiltInTest) {
//		//			assert (BaseClass.LookupMethod("+", 0) != null);
//		//			assert (BaseClass.LookupMethod("+", 1) != null);
//		//			assert (BaseClass.LookupMethod("+", 2) == null);
//		//			GtMethod m = BaseClass.LookupMethod("+", 1);
//		//			Object[] p = new Object[2];
//		//			p[0] = new Integer(1);
//		//			p[1] = new Integer(2);
//		//			GtStatic.println("******* 1+2=" + m.Eval(p));
//		//		}
	}

	public static int PlusInt(int x) {
		return +x;
	}

	public static int IntAddInt(int x, int y) {
		return x + y;
	}

	public static int MinusInt(int x) {
		return -x;
	}

	public static int IntSubInt(int x, int y) {
		return x - y;
	}

	public static int IntMulInt(int x, int y) {
		return x * y;
	}

	public static int IntDivInt(int x, int y) {
		return x / y;
	}

	public static int IntModInt(int x, int y) {
		return x % y;
	}

	public static boolean IntLtInt(int x, int y) {
		return x < y;
	}

	public static boolean IntLeInt(int x, int y) {
		return x <= y;
	}

	public static boolean IntGtInt(int x, int y) {
		return x > y;
	}

	public static boolean IntGeInt(int x, int y) {
		return x >= y;
	}

	public static boolean IntEqInt(int x, int y) {
		return x == y;
	}

	public static boolean IntNeInt(int x, int y) {
		return x != y;
	}
}

class GtStringDef extends GtStatic {

	public void MakeDefinition(GtNameSpace ns) {
//		GtType BaseClass = ns.LookupHostLangType(String.class);
//		GtParam BinaryParam = GtParam.ParseOf(ns, "String String x");
//		BaseClass.DefineMethod(ImmutableMethod | ConstMethod, "+", BinaryParam, this, "StringAddString");
//
//		GtParam RelationParam = GtParam.ParseOf(ns, "boolean String x");
//		BaseClass.DefineMethod(ImmutableMethod | ConstMethod, "==", RelationParam, this, "StringEqString");
//		BaseClass.DefineMethod(ImmutableMethod | ConstMethod, "!=", RelationParam, this, "StringNeString");
//
//		GtParam indexOfParam = GtParam.ParseOf(ns, "int String x");
//		BaseClass.DefineMethod(ImmutableMethod | ConstMethod, "indexOf", indexOfParam, this, "StringIndexOf");
//
//		GtParam getSizeParam = GtParam.ParseOf(ns, "int");
//		BaseClass.DefineMethod(ImmutableMethod | ConstMethod, "getSize", getSizeParam, this, "StringGetSize");
	}

	public static String StringAddString(String x, String y) {
		return x + y;
	}

	public static boolean StringEqString(String x, String y) {
		return x.equals(y);
	}

	public static boolean StringNeString(String x, String y) {
		return !x.equals(y);
	}

	public static int StringIndexOf(String self, String str) {
		return self.indexOf(str);
	}

	public static int StringGetSize(String self) {
		return self.length();
	}
}

class GtSystemDef extends GtStatic {

	public void MakeDefinition(GtNameSpace NameSpace) {
//		GtType BaseClass = NameSpace.LookupHostLangType(GtSystemDef.class);
//		NameSpace.DefineSymbol("System", BaseClass);
//
//		GtParam param1 = GtParam.ParseOf(NameSpace, "void String x");
//		BaseClass.DefineMethod(StaticMethod, "p", param1, this, "p");
	}

	public static void p(String x) {
		GtStatic.println(x);
	}

}

//class GtArrayDef extends GtStatic {
//
//	public void MakeDefinition(GtNameSpace ns) {
//        //FIXME int[] only
//        GtType BaseClass = ns.LookupHostLangType(int[].class);
//        GtParam GetterParam = GtParam.ParseOf(ns, "int int i");
//        BaseClass.DefineMethod(ImmutableMethod, "get", GetterParam, this, "ArrayGetter");
//        GtParam SetterParam = GtParam.ParseOf(ns, "void int i int v");
//        BaseClass.DefineMethod(0, "set", SetterParam, this, "ArraySetter");
//        GtParam GetSizeParam = GtParam.ParseOf(ns, "int");
//        BaseClass.DefineMethod(ImmutableMethod | ConstMethod, "getSize", GetSizeParam, this, "ArrayGetSize");
//    }
//
//    public static int ArrayGetter(int[] a, int i) {
//        return a[i];
//    }
//
//    public static void ArraySetter(int[] a, int i, int v) {
//        a[i] = v;
//    }
//
//    public static int ArrayGetSize(int[] a) {
//        return a.length;
//    }
//}
//endif VAJA

class GtContext extends GtStatic {

	/*field*/public GtNameSpace		RootNameSpace;
	/*field*/public GtNameSpace		DefaultNameSpace;

	/*field*/public final GtType		VoidType;
	/*field*/public final GtType		NativeObjectType;
	/*field*/public final GtType		ObjectType;
	/*field*/public final GtType		BooleanType;
	/*field*/public final GtType		IntType;
	/*field*/public final GtType		StringType;
	/*field*/public final GtType		AnyType;

	/*field*/final GtMap				ClassNameMap;
	/*field*/public GreenTeaGenerator   Generator;
	
	GtContext/*constructor*/(GtGrammar Grammar, GreenTeaGenerator Generator) {
		this.ClassNameMap = new GtMap();
		this.RootNameSpace = new GtNameSpace(this, null);
		this.Generator = Generator;
//ifdef JAVA
		this.VoidType = this.LookupHostLangType(Void.class);
		this.NativeObjectType = this.LookupHostLangType(Object.class);
		this.ObjectType = this.LookupHostLangType(Object.class);
		this.BooleanType = this.LookupHostLangType(Boolean.class);
		this.IntType = this.LookupHostLangType(Integer.class);
		this.StringType = this.LookupHostLangType(String.class);
		this.AnyType = this.LookupHostLangType(Object.class);
//endif VAJA
		Grammar.LoadDefaultSyntax(this.RootNameSpace);
		this.DefaultNameSpace = new GtNameSpace(this, this.RootNameSpace);
	}

//ifdef JAVA
	GtType LookupHostLangType(Class<?> ClassInfo) {
		GtType Type = (GtType) this.ClassNameMap.get(ClassInfo.getName());
		if(Type == null) {
			Type = new GtType(this, ClassInfo);
			this.ClassNameMap.put(ClassInfo.getName(), Type);
		}
		return Type;
	}
//endif VAJA

	public void Define(String Symbol, Object Value) {
		this.RootNameSpace.DefineSymbol(Symbol, Value);
	}

	public Object Eval(String text, long FileLine) {
		return this.DefaultNameSpace.Eval(text, FileLine, this.Generator);
	}
}

public class GreenTeaScript {
	
	public static void main(String[] argc) {
		GtContext GtContext = new GtContext(new GtGrammar(), null);
		//GtContext.Eval("int f(int a, int b) { return a + b; }", 0);
		GtContext.Eval("1 + 2 * 3", 0);

	}

}
