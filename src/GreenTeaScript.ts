module GreenScript {

////JAVA
//import java.lang.reflect.InvocationTargetException;
//import java.lang.reflect.Method;
//import java.lang.reflect.Modifier;
//import java.util.ArrayList;
//import java.util.HashMap;
//
//interface KonohaConst {
//VAJA

	// ClassFlag
	var PrivateClass = 1 << 0;
	var SingletonClass = 1 << 1;
	var FinalClass = 1 << 2;
	var KonohaClass = 1 << 3;
	var StaticClass = 1 << 4;
	var ImmutableClass = 1 << 5;
	var InterfaceClass = 1 << 6;

	// MethodFlag
	var PrivateMethod = 1 << 0;
	var VirtualMethod = 1 << 1;
	var FinalMethod = 1 << 2;
	var ConstMethod = 1 << 3;
	var StaticMethod = 1 << 4;
	var ImmutableMethod = 1 << 5;
	var TopLevelMethod = 1 << 6;

	// call rule
	var CoercionMethod = 1 << 7;
	var RestrictedMethod = 1 << 8;
	var UncheckedMethod = 1 << 9;
	var SmartReturnMethod = 1 << 10;
	var VariadicMethod = 1 << 11;
	var IterativeMethod = 1 << 12;

	// compatible
	var UniversalMethod = 1 << 13;

	// internal
	var HiddenMethod = 1 << 17;
	var AbstractMethod = 1 << 18;
	var OverloadedMethod = 1 << 19;
	var Override = 1 << 20;
	var DynamicCall = 1 << 22;

	
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

	var KonohaCharMaxSize = 41;
	
	var NullToken = new KonohaToken("", 0);

	// TokenFlag
	var SourceTokenFlag = 1;
	var ErrorTokenFlag = (1 << 1);
	var IndentTokenFlag = (1 << 2);
	var WhiteSpaceTokenFlag = (1 << 3);
	var DelimTokenFlag = (1 << 4);
	
	// ParseFlag
	var TrackbackParseFlag = 1;
	var SkipIndentParseFlag = (1 << 1);
	

	// SyntaxTree
	var NoWhere = -1;
	// UniaryTree, SuffixTree
	var UniaryTerm = 0;
	// BinaryTree
	var LeftHandTerm = 0;
	var RightHandTerm = 1;

	// IfStmt
	var IfCond = 0;
	var IfThen = 1;
	var IfElse = 2;

	// ReturnStmt
	var ReturnExpr = 0;

	// var N = 1;
	var VarDeclType = 0;
	var VarDeclName = 1;
	var VarDeclValue = 2;
	var VarDeclScope = 3;

	// Decl;
	var MethodDeclReturnType = 0;
	var MethodDeclClass = 1;
	var MethodDeclName = 2;
	var MethodDeclBlock = 3;
	var MethodDeclParam = 4;

	// spec 
	var TokenFuncSpec = 0;
	var SymbolPatternSpec = 1;
	var ExtendedPatternSpec = 2;

// var Term = 1;
// var UniaryOperator = 1; /* same as for readability */
// var Statement = 1; /* same as for readability */
	var BinaryOperator = 1 << 1;
// var SuffixOperator = 1 << 2;
	var LeftJoin = 1 << 3;
// var MetaPattern = 1 << 4;
	var PrecedenceShift = 5;
	var Precedence_CStyleValue = (1 << PrecedenceShift);
	var Precedence_CPPStyleScope = (50 << PrecedenceShift);
	var Precedence_CStyleSuffixCall = (100 << PrecedenceShift); /*x(); x[]; x.x x->x x++ */
	var Precedence_CStylePrefixOperator = (200 << PrecedenceShift); /*++x; --x; sizeof x &x +x -x !x <>x */
	// Precedence_CppMember = 300; /* .x ->x */
	var Precedence_CStyleMUL = (400 << PrecedenceShift); /* x * x; x / x; x % x*/
	var Precedence_CStyleADD = (500 << PrecedenceShift); /* x + x; x - x */
	var Precedence_CStyleSHIFT = (600 << PrecedenceShift); /* x << x; x >> x */
	var Precedence_CStyleCOMPARE = (700 << PrecedenceShift);
	var Precedence_CStyleEquals = (800 << PrecedenceShift);
	var Precedence_CStyleBITAND = (900 << PrecedenceShift);
	var Precedence_CStyleBITXOR = (1000 << PrecedenceShift);
	var Precedence_CStyleBITOR = (1100 << PrecedenceShift);
	var Precedence_CStyleAND = (1200 << PrecedenceShift);
	var Precedence_CStyleOR = (1300 << PrecedenceShift);
	var Precedence_CStyleTRINARY = (1400 << PrecedenceShift); /* ? : */
	var Precedence_CStyleAssign = (1500 << PrecedenceShift);
	var Precedence_CStyleCOMMA = (1600 << PrecedenceShift);
	var Precedence_Error = (1700 << PrecedenceShift);
	var Precedence_Statement = (1900 << PrecedenceShift);
	var Precedence_CStyleDelim = (2000 << PrecedenceShift);

	
	var DefaultTypeCheckPolicy = 0;
	var IgnoreEmptyPolicy = 1;
	var AllowEmptyPolicy = (1 << 1);

	//typedef enum :
	// TypeCheckPolicy_NoPolicy = 0,
	// TypeCheckPolicy_NoCheck = (1 << 0),
	// TypeCheckPolicy_AllowVoid = (1 << 1),
	// TypeCheckPolicy_Coercion = (1 << 2),
	// TypeCheckPolicy_AllowEmpty = (1 << 3),
	// TypeCheckPolicy_CONST = (1 << 4), /* Reserved */
	// TypeCheckPolicy_Creation = (1 << 6) /* TypeCheckNodeByName */
	// TypeCheckPolicy;

	var GlobalConstName = "global";

	
	var EmptyList[] = [];


	// debug flags
	var UseBuiltInTest = true;
	var DebugPrnumber = false;

////JAVA
//}
//
//class KonohaStatic implements KonohaConst {
//VAJA
	
	function println(msg) :
		System.out.println(msg);		
	
	
	function P(msg) :
		println("DEBUG: " + msg);
	

	function TODO(msg) :
		println("TODO: " + msg);
	

	function ListSize(a[]) :
		return (a == null) ? 0 : a.size();
	
	
	function IsFlag(flag, flag2) :
		return ((flag & flag2) == flag2);
	
	
	function IsWhitespace(ch) :
		return Character.isWhitespace(ch);
	
	
	function IsLetter(ch) :
		return Character.isLetter(ch);
	
	
	function IsDigit(ch) :
		return Character.isDigit(ch);
	
	
	function LookupMethod(Callee, MethodName) :
		if(MethodName != null) :
			// KonohaDebug.P("looking up method : " + Callee.getClass().getSimpleName() + "." + MethodName);
			Method[] methods = Callee.getClass().getMethods();
			for(var i = 0; i < methods.length; i++) :
				if(MethodName.equals(methods[i].getName())) :
					return methods[i];
				
			
			P("method not found: " + Callee.getClass().getSimpleName() + "." + MethodName);
		
		return null; /*throw new KonohaParserException("method not found: " + callee.getClass().getName() + "." + methodName);*/
	

	function function(Callee, MethodName) :
		return new KonohaFunc(Callee, LookupMethod(Callee, MethodName));
	

	function EqualsMethod(m1, m2) :
		if(m1 == null) :
			return (m2 == null) ? true : false;
		 else :
			return (m2 == null) ? false : m1.equals(m2);
		
	
	
	function CreateOrReuseTokenFunc(f, prev) :
		if(prev != null && EqualsMethod(prev.Func.Method, f.Method)) :
			return prev;
		
		return new TokenFunc(f, prev);
	

	function ApplyTokenFunc(TokenFunc, TokenContext, ScriptSource, Pos) :
		try :
			while(TokenFunc != null) :
				var f = TokenFunc.Func;
				var NextIdx = ((Integer)f.Method.invoke(f.Self, TokenContext, ScriptSource, Pos)).intValue();
				if(NextIdx > Pos) return NextIdx;
				TokenFunc = TokenFunc.ParentFunc;
			
			return NoMatch;
		
		catch (e) :
			e.printStackTrace();
		
		catch (e) :
			e.printStackTrace();
		
		catch (e) :
			e.printStackTrace();
		
		return NoMatch;
	

	function MergeSyntaxPattern(Pattern, Parent) :
		if(Parent == null) return Pattern;
		var MergedPattern = new SyntaxPattern(Pattern.PackageNameSpace, Pattern.PatternName, Pattern.MatchFunc, Pattern.TypeFunc);
		MergedPattern.ParentPattern = Parent;
		return MergedPattern;
	

	function IsEmptyOrError(Tree) :
		return Tree == null || Tree.IsEmptyOrError();
	

	function TreeHead(Tree) :
		if(Tree != null) :
			while(Tree.PrevTree != null) :
				Tree = Tree.PrevTree;
			
		
		return Tree;
	
	
	function ApplySyntaxPattern(Pattern, LeftTree, TokenContext) :
		var Pos = TokenContext.Pos;
		try :
			var ParseFlag = TokenContext.ParseFlag;
			var CurrentPattern = Pattern;
			while(CurrentPattern != null) :
				var f = Pattern.MatchFunc;
				TokenContext.Pos = Pos;
				if(CurrentPattern.ParentPattern != null) :
					TokenContext.ParseFlag = ParseFlag | TrackbackParseFlag;
				
				P("B ApplySyntaxPattern: " + CurrentPattern + " > " + CurrentPattern.ParentPattern);
				var ParsedTree = (SyntaxTree)f.Method.invoke(f.Self, CurrentPattern, LeftTree, TokenContext);
				if(ParsedTree != null && ParsedTree.IsEmpty()) ParsedTree = null;
				P("E ApplySyntaxPattern: " + CurrentPattern + " => " + ParsedTree);
				TokenContext.ParseFlag = ParseFlag;
				if(ParsedTree != null) :
					return ParsedTree;
				
				CurrentPattern = CurrentPattern.ParentPattern;
			
		
		catch (e) :
			e.printStackTrace();
		
		catch (e) :
			e.printStackTrace();
		
		catch (e) :
			e.printStackTrace();
		
		if(TokenContext.IsAllowedTrackback()) :
			TokenContext.Pos = Pos;
		
		if(Pattern == null) :
			P("undefined syntax pattern: " + Pattern);
		
		return TokenContext.ReportExpectedPattern(Pattern);
	

	function ParseSyntaxTree(PrevTree, TokenContext) :
		var Pattern = TokenContext.GetFirstPattern();
		var LeftTree = ApplySyntaxPattern(Pattern, PrevTree, TokenContext);
		while (!IsEmptyOrError(LeftTree)) :
			var ExtendedPattern = TokenContext.GetExtendedPattern();
			if(ExtendedPattern == null) :
				P("In $ending: " + TokenContext.GetToken());
				break;
			
			LeftTree = ApplySyntaxPattern(ExtendedPattern, LeftTree, TokenContext);			
		
		return LeftTree;
	

	// typing 
	function ApplyTypeFunc(TypeFunc, Gamma, ParsedTree, TypeInfo) :
		try :
			return (TypedNode)TypeFunc.Method.invoke(TypeFunc.Self, Gamma, ParsedTree, TypeInfo);
		
		catch (e) :
			e.printStackTrace();
		
		catch (e) :
			e.printStackTrace();
		
		catch (e) :
			e.printStackTrace();
		
		//Node = Gamma.NewErrorNode(Tree.KeyToken, "internal error: " + e + "\n\t" + e.getCause().toString());
		return null;
	

////JAVA
//}
//
//final class KonohaArray {
//	private final ArrayList<Object>	List;
//
//	public KonohaArray() {
//		this.List = new ArrayList<Object>();
//	}
//
//	public KonohaArray(int DefaultSize) {
//		this.List = new ArrayList<Object>(DefaultSize);
//	}
//
//	public int size() {
//		return this.List.size();
//	}
//
//	public void add(Object Value) {
//		this.List.add(Value);
//	}
//
//	public Object get(int index) {
//		return this.List.get(index);
//	}
//
//	public void set(int index, Object Value) {
//		this.List.set(index, Value);
//	}
//
//	public Object remove(int index) {
//		return this.List.remove(index);
//	}
//
//	public Object pop() {
//		return List.remove(List.size() - 1);
//	}
//
//	public void clear() {
//		this.List.clear();
//	}
//
//	@Override public String toString() {
//		return List.toString();
//	}
//}
//
//final class KonohaMap {
//	private final HashMap<String, Object>	Map;
//
//	public KonohaMap() {
//		this.Map = new HashMap<String, Object>();
//	}
//
//	public int size() {
//		return this.Map.size();
//	}
//
//	public void put(String Key, Object Value) {
//		this.Map.put(Key, Value);
//	}
//
//	public Object get(String Key) {
//		return this.Map.get(Key);
//	}
//
////	public String[] keys() {
////		Iterator<String> itr = this.Map.keySet().iterator();
////		String[] List = new String[this.Map.size()];
////		int i = 0;
////		while(itr.hasNext()) {
////			List[i] = itr.next();
////			i = i + 1;
////		}
////		return List;
////	}
//
//}
//
//final class KonohaFunc {
//	public Object	Self;
//	public Method	Method;
//
//	KonohaFunc(Object Self, Method method) {
//		this.Self = Self;
//		this.Method = method;
//	}
//
//	static boolean EqualsMethod(Method m1, Method m2) {
//		if(m1 == null) {
//			return (m2 == null) ? true : false;
//		} else {
//			return (m2 == null) ? false : m1.equals(m2);
//		}
//	}
//
//	@Override public String toString() {
//		return this.Method.toString();
//	}
//
//}
// VAJA

// tokenizer

	class KonohaChar :
		var Null = 0;
		var Undefined = 1;
		var Digit = 2;
		var UpperAlpha = 3;
		var LowerAlpha = 4;
		var Unicode = 5;
		var NewLine = 6;
		var Tab = 7;
		var Space = 8;
		var OpenParenthesis = 9;
		var CloseParenthesis = 10;
		var OpenBracket = 11;
		var CloseBracket = 12;
		var OpenBrace = 13;
		var CloseBrace = 14;
		var LessThan = 15;
		var GreaterThan = 16;
		var Quote = 17;
		var DoubleQuote = 18;
		var BackQuote = 19;
		var Surprised = 20;
		var Sharp = 21;
		var Dollar = 22;
		var Percent = 23;
		var And = 24;
		var Star = 25;
		var Plus = 26;
		var Comma = 27;
		var Minus = 28;
		var Dot = 29;
		var Slash = 30;
		var Colon = 31;
		var SemiColon = 32;
		var Equal = 33;
		var Question = 34;
		var AtMark = 35;
		var Var = 36;
		var Childer = 37;
		var BackSlash = 38;
		var Hat = 39;
		var UnderBar = 40;
		var MAX = 41;
	
		CharMatrix[] = : 0/*nul*/, 1/*soh*/, 1/*stx*/, 1/*etx*/, 1/*eot*/, 1/*enq*/,
				1/*ack*/, 1/*bel*/, 1/*bs*/, Tab/*ht*/, NewLine/*nl*/, 1/*vt*/, 1/*np*/, 1/*cr*/, 1/*so*/, 1/*si*/,
				/*020 dle 021 dc1 022 dc2 023 dc3 024 dc4 025 nak 026 syn 027 etb */
				1, 1, 1, 1, 1, 1, 1, 1,
				/*030 can 031 em 032 sub 033 esc 034 fs 035 gs 036 rs 037 us */
				1, 1, 1, 1, 1, 1, 1, 1,
				/*040 sp 041 !   042 "   043 #   044 $   045 %   046 &   047 ' */
				Space, Surprised, DoubleQuote, Sharp, Dollar, Percent, And, Quote,
				/*050 (   051 )   052 *   053 +   054 ,   055 -   056 .   057 / */
				OpenParenthesis, CloseParenthesis, Star, Plus, Comma, Minus, Dot, Slash,
				/*060 0   061 1   062 2   063 3   064 4   065 5   066 6   067 7 */
				Digit, Digit, Digit, Digit, Digit, Digit, Digit, Digit,
				/*070 8   071 9   072 :   073 ;   074 <   075 =   076 >   077 ? */
				Digit, Digit, Colon, SemiColon, LessThan, Equal, GreaterThan, Question,
				/*100 @   101 A   102 B   103 C   104 D   105 E   106 F   107 G */
				AtMark, UpperAlpha, UpperAlpha, UpperAlpha, UpperAlpha, UpperAlpha, UpperAlpha, UpperAlpha,
				/*110 H   111 I   112 J   113 K   114 L   115 M   116 N   117 O */
				UpperAlpha, UpperAlpha, UpperAlpha, UpperAlpha, UpperAlpha, UpperAlpha, UpperAlpha, UpperAlpha,
				/*120 P   121 Q   122 R   123 S   124 T   125 U   126 V   127 W */
				UpperAlpha, UpperAlpha, UpperAlpha, UpperAlpha, UpperAlpha, UpperAlpha, UpperAlpha, UpperAlpha,
				/*130 X   131 Y   132 Z   133 [   134 \   135 ]   136 ^   137 _ */
				UpperAlpha, UpperAlpha, UpperAlpha, OpenBracket, BackSlash, CloseBracket, Hat, UnderBar,
				/*140 `   141 a   142 b   143 c   144 d   145 e   146 f   147 g */
				BackQuote, LowerAlpha, LowerAlpha, LowerAlpha, LowerAlpha, LowerAlpha, LowerAlpha, LowerAlpha,
				/*150 h   151 i   152 j   153 k   154 l   155 m   156 n   157 o */
				LowerAlpha, LowerAlpha, LowerAlpha, LowerAlpha, LowerAlpha, LowerAlpha, LowerAlpha, LowerAlpha,
				/*160 p   161 q   162 r   163 s   164 t   165 u   166 v   167 w */
				LowerAlpha, LowerAlpha, LowerAlpha, LowerAlpha, LowerAlpha, LowerAlpha, LowerAlpha, LowerAlpha,
				/*170 x   171 y   172 z   173 :   174 |   175    176 ~   177 del*/
				LowerAlpha, LowerAlpha, LowerAlpha, OpenBrace, Var, CloseBrace, Childer, 1, ;
	
		function FromJavaChar(c) :
			if(c < 128) :
				return CharMatrix[c];
			
			return Unicode;
		
	
	
	
	class KonohaToken :
		TokenFlag;
		ParsedText;
		FileLine;
		PresetPattern;
	
		constructor(text, FileLine) :
			this.ParsedText = text;
			this.FileLine = FileLine;
			this.PresetPattern = null;
		
	
		IsSource() :
			return IsFlag(this.TokenFlag, SourceTokenFlag);
		
		
		IsError() :
			return IsFlag(this.TokenFlag, ErrorTokenFlag);
		
	
		IsIndent() :
			return IsFlag(this.TokenFlag, IndentTokenFlag);
		
	
		IsDelim() :
			return IsFlag(this.TokenFlag, DelimTokenFlag);
		
	
		EqualsText(text) :
			return this.ParsedText.equals(text);
		
	
		toString() :
			var TokenText = "";
			if(this.PresetPattern != null) :
				TokenText = "(" + this.PresetPattern.PatternName + ") ";
			
			return TokenText + this.ParsedText;
		
	
		ToErrorToken(Message) :
			this.TokenFlag = ErrorTokenFlag;
			this.ParsedText = Message;
			return Message;
		
	
		GetErrorMessage() :
			assert(this.IsError());
			return this.ParsedText;
		
	
	
	
	class TokenFunc :
		Func;
		ParentFunc;
	
		TokenFunc(Func, prev) :
			this.Func = Func;
			this.ParentFunc = prev;
		
	
		Duplicate() :
			if(this.ParentFunc == null) :
				return new TokenFunc(this.Func, null);
			 else :
				return new TokenFunc(this.Func, this.ParentFunc.Duplicate());
			
		
	
		toString() :
			return this.Func.Method.toString();
		
	
	
	
	class TokenContext :
		NameSpace;
		SourceList[];
		Pos;
		ParsingLine;
		ParseFlag;
	
		constructor(NameSpace, Text, FileLine) :
			this.NameSpace = NameSpace;
			this.SourceList = [];
			this.Pos = 0;
			this.ParsingLine = FileLine;
			this.ParseFlag = 0;
			AddNewToken(Text, SourceTokenFlag, null);
		
	
		AddNewToken(Text, TokenFlag, PatternName) :
			var Token = new KonohaToken(Text, this.ParsingLine);
			Token.TokenFlag |= TokenFlag;
			if(PatternName != null) :
				Token.PresetPattern = this.NameSpace.GetPattern(PatternName);
				assert(Token.PresetPattern != null);
			
			this.SourceList.add(Token);
			return Token;
		
	
		FoundWhiteSpace() :
			var Token = GetToken();
			Token.TokenFlag |= WhiteSpaceTokenFlag;
		
		
		FoundLineFeed(line) :
			this.ParsingLine += line;
		
	
		ReportTokenError(Level, Message, TokenText) :
			var Token = this.AddNewToken(TokenText, 0, "$ErrorToken");
			this.NameSpace.ReportError(Level, Token, Message);
		
		
		NewErrorSyntaxTree(Token, Message) :
			if(!IsAllowedTrackback()) :
				this.NameSpace.ReportError(ErrorLevel, Token, Message);
				var ErrorTree = new SyntaxTree(Token.PresetPattern, this.NameSpace, Token);
				return ErrorTree;
			
			return null;
		
		
		GetBeforeToken() :
			for(var pos = this.Pos - 1; pos >= 0; pos--) :
				var Token = (KonohaToken)this.SourceList.get(pos);
				if(IsFlag(Token.TokenFlag, IndentTokenFlag)) :
					continue;
				
				return Token;
			
			return null;
		
	
		ReportExpectedToken(TokenText) :
			if(!IsAllowedTrackback()) :
				var Token = GetBeforeToken();
				if(Token != null) :
					return NewErrorSyntaxTree(Token, TokenText + " is expected after " + Token.ParsedText);
				
				Token = GetToken();
				assert(Token != NullToken);
				return NewErrorSyntaxTree(Token, TokenText + " is expected at " + Token.ParsedText);
			
			return null;
		
	
		ReportExpectedPattern(Pattern) :
			return ReportExpectedToken(Pattern.PatternName);
		
		
		DispatchFunc(ScriptSource, KonohaChar, pos) :
			var TokenFunc = this.NameSpace.GetTokenFunc(KonohaChar);
			var NextIdx = ApplyTokenFunc(TokenFunc, this, ScriptSource, pos);
			if(NextIdx == NoMatch) :
				P("undefined tokenizer: " + ScriptSource.charAt(pos));
				AddNewToken(ScriptSource.substring(pos), 0, null);
				return ScriptSource.length();
			
			return NextIdx;
		
	
		Tokenize(ScriptSource, CurrentLine) :
			var pos = 0, len = ScriptSource.length();
			this.ParsingLine = CurrentLine;
			while(pos < len) :
				var knumber = KonohaChar.FromJavaChar(ScriptSource.charAt(pos));
				var pos2 = DispatchFunc(ScriptSource, kchar, pos);
				if(!(pos < pos2)) :
					break;
				
				pos = pos2;
			
			Dump();
		
	
		GetToken() :
			while((this.< this.SourceList.size())) :
				var Token = (KonohaToken)this.SourceList.get(this.Pos);
				if(Token.IsSource()) :
					this.SourceList.pop();
					Tokenize(Token.ParsedText, Token.FileLine);
					Token = (KonohaToken)this.SourceList.get(this.Pos);
				
				if(IsFlag(this.ParseFlag, SkipIndentParseFlag) && Token.IsIndent()) :
					this.Pos += 1;
					continue;
				
				return Token;
			
			return NullToken;
		
	
		HasNext() :
			return (GetToken() != NullToken);
		
	
		Next() :
			var Token = GetToken();
			this.Pos += 1;
			return Token;
		
	
		GetPattern(PatternName) :
			return this.NameSpace.GetPattern(PatternName);
		
	
		GetFirstPattern() :
			var Token = GetToken();
			if(Token.PresetPattern != null) :
				return Token.PresetPattern;
			
			var Pattern = this.NameSpace.GetPattern(Token.ParsedText);
			if(Pattern == null) :
				return this.NameSpace.GetPattern("$Symbol");
			
			return Pattern;
		
	
		GetExtendedPattern() :
			var Token = GetToken();
			var Pattern = this.NameSpace.GetExtendedPattern(Token.ParsedText);
			return Pattern;		
		
		
		MatchToken(TokenText) :
			var Token = GetToken();
			if(Token.EqualsText(TokenText)) :
				this.Pos += 1;
				return true;
			
			return false;
		
	
		GetMatchedToken(TokenText) :
			var Token = GetToken();
			while(Token != NullToken) :
				this.Pos += 1;
				if(Token.EqualsText(TokenText)) :
					break;
				
			
			return Token;
		
	
		IsAllowedTrackback() :
			return IsFlag(this.ParseFlag, TrackbackParseFlag);
		
	
		ParsePattern(PatternName, IsOptional) :
			var Pos = this.Pos;
			var ParseFlag = this.ParseFlag;
			var Pattern = this.GetPattern(PatternName);
			if(IsOptional) :
				this.ParseFlag |= TrackbackParseFlag;
			
			var SyntaxTree = ApplySyntaxPattern(Pattern, null, this);
			this.ParseFlag = ParseFlag;
			if(SyntaxTree != null) :
				return SyntaxTree;
			
			this.Pos = Pos;
			return null;
		
		
		SkipEmptyStatement() :
			Token;
			while((= GetToken()) != NullToken) :
				if(Token.IsIndent() || Token.IsDelim()) :
					this.Pos += 1;
					continue;
				
				break;
			
			return (Token != NullToken);
		
		
		Dump() :
			for(pos = this.; pos < this.SourceList.size(); pos++) :
				P("["+pos+"]\t" + this.SourceList.get(pos));
			
		
		
	
	
	class SyntaxPattern :
	
		PackageNameSpace;
		PatternName;
		SyntaxFlag;
	
		MatchFunc;
		TypeFunc;
		ParentPattern;
		
		toString() :
			return this.PatternName + "<" + this.MatchFunc + ">";
		
	
		IsBinaryOperator() :
			return ((this.SyntaxFlag & BinaryOperator) == BinaryOperator);
		
	
		IsLeftJoin(Right) :
			var left = this.SyntaxFlag >> PrecedenceShift, right = Right.SyntaxFlag >> PrecedenceShift;
			// System.err.printf("left=%d,%s, right=%d,%s\n", left, this.PatternName, right, Right.PatternName);
			return (left < right || (left == right && IsFlag(this.SyntaxFlag, LeftJoin) && IsFlag(Right.SyntaxFlag, LeftJoin)));
		
	
		// Pop() : return ParentSyntax; 
	
		constructor(NameSpace, PatternName, MatchFunc, TypeFunc) :
			this.PackageNameSpace = NameSpace;
			this.PatternName = PatternName;
			this.SyntaxFlag = 0;
			this.MatchFunc = MatchFunc;
			this.TypeFunc = TypeFunc;
			this.ParentPattern = null;
		
		
	
	
	class SyntaxTree :
		ParentTree;
		PrevTree;
		NextTree;
	
		TreeNameSpace;
		Pattern;
		KeyToken;
		TreeList[];
	
		toString() :
			var key = this.KeyToken.ParsedText + ":" + ((this.Pattern != null) ? this.Pattern.PatternName : "null");
			var sb = new StringBuilder();
			sb.append("(");
			sb.append(key);
			if(this.TreeList != null) :
				for(i = 0; i < this.TreeList.size(); i++) :
					var o = this.TreeList.get(i);
					if(o == null) :
						sb.append(" NULL");
					 else :
						sb.append(" ");
						sb.append(o);
					
				
			
			sb.append(")");
			if(this.NextTree != null) :
				sb.append(";\t");
				sb.append(this.NextTree.toString());
			
			return sb.toString();
		
	
		SyntaxTree(Pattern, NameSpace, KeyToken) :
			this.TreeNameSpace = NameSpace;
			this.KeyToken = KeyToken;
			this.Pattern = Pattern;
			this.ParentTree = null;
			this.PrevTree = null;
			this.NextTree = null;
			this.TreeList = null;
		
	
		LinkNode(Tree) :
			Tree.PrevTree = this;
			this.NextTree = Tree;
		
		
		IsError() :
			return this.KeyToken.IsError();
		
	
		ToError(Token) :
			assert(Token.IsError());
			this.KeyToken = Token;
			this.TreeList = null;
		
	
		IsEmpty() :
			return this.KeyToken == NullToken;
		
	
		ToEmpty() :
			this.KeyToken = NullToken;
			this.TreeList = null;
			this.Pattern = this.TreeNameSpace.GetPattern("$Empty");
		
		
		IsEmptyOrError() :
			return this.KeyToken == NullToken || this.KeyToken.IsError();
		
		
		ToEmptyOrError(ErrorTree) :
			if(ErrorTree == null) :
				ToEmpty();
			
			else :
				ToError(ErrorTree.KeyToken);
			
		
		
		SetAt(Index, Value) :
			if(!IsEmpty()) :
				if(Index >= 0) :
					if(this.TreeList == null) :
						this.TreeList = [];
					
					if(< this.TreeList.size()) :
						this.TreeList.set(Index, Value);
						return;
					
					while(this.TreeList.size() < Index) :
						this.TreeList.add(null);
					
					this.TreeList.add(Value);
				
			
		
		
		GetSyntaxTreeAt(Index) :
			return (SyntaxTree) this.TreeList.get(Index);
		
	
		SetSyntaxTreeAt(Index, Tree) :
			if(!IsError()) :
				if(Tree.IsError()) :
					ToError(Tree.KeyToken);
				
				else :
					SetAt(Index, Tree);
					Tree.ParentTree = this;
				
			
		
		
		SetMatchedPatternAt(Index, TokenContext, PatternName, IsOptional) :
			if(!IsEmptyOrError()) :
				var ParsedTree = TokenContext.ParsePattern(PatternName, IsOptional);
				if(ParsedTree == null && !IsOptional) :
					ToEmpty();
				
			
		
	
		SetMatchedTokenAt(Index, TokenContext, TokenText, IsOptional) :
			if(!IsEmptyOrError()) :
				var Pos = TokenContext.Pos;
				var Token = TokenContext.Next();
				if(Token.ParsedText.equals(TokenText)) :
					SetAt(Index, Token);
				
				else :
					TokenContext.Pos = Pos;
					if (!IsOptional) :
						ToEmptyOrError(TokenContext.ReportExpectedToken(TokenText));
					
				
			
		
	
		
		AppendParsedTree(Tree) :
			if(!IsError()) :
				if(Tree.IsError()) :
					ToError(Tree.KeyToken);
				
				else :
					if(this.TreeList == null) :
						this.TreeList = [];
					
					this.TreeList.add(Tree);
				
			
		
	
		TypeNodeAt(Index, Gamma, TypeInfo, TypeCheckPolicy) :
			if(this.!= null && Index < this.TreeList.size()) :
				var NodeObject = this.TreeList.get(Index);
				if(instanceof SyntaxTree) :
					var TypedNode = TypeEnv.TypeCheck(Gamma, (SyntaxTree) NodeObject, TypeInfo, TypeCheckPolicy);
					this.TreeList.set(Index, TypedNode);
					return TypedNode;
				
			
			return new ErrorNode(TypeInfo, this.KeyToken, "syntax tree error: " + Index);
		
	
	
	
	/* typing */
	
	class KonohaType :
		KonohaContext;
		ClassFlag;
		ShortClassName;
		BaseClass;
		SuperClass;
		ClassParam;
		SearchSimilarClass;
		ClassMethodList[];
		SearchSuperMethodClass;
		DefaultNullValue;
		LocalSpec;
	
		// Implementation Only
		Class<?> HostedClassInfo = null;
	
		KonohaType(KonohaContext, ClassFlag, ClassName, Spec) :
			this.KonohaContext = KonohaContext;
			this.ClassFlag = ClassFlag;
			this.ShortClassName = ClassName;
			this.SuperClass = null;
			this.BaseClass = this;
			this.ClassMethodList = EmptyList;
			this.LocalSpec = Spec;
		
	
		KonohaType(KonohaContext, Class<?> ClassInfo) :
			this(KonohaContext, 0, ClassInfo.getSimpleName(), null);
			this.HostedClassInfo = ClassInfo;
			// this.ClassFlag = ClassFlag;
			Class<?> SuperClass = ClassInfo.getSuperclass();
			if(ClassInfo != Object.class && SuperClass != null) :
				this.SuperClass = KonohaContext.LookupHostLangType(ClassInfo.getSuperclass());
			
		
	
		@Override
		toString() :
			return this.ShortClassName;
		
	
		function ConvertMethod(KonohaContext, Method) :
			var ThisType = KonohaContext.LookupHostLangType(Method.getClass());
			Class<?>[] ParamTypes = Method.getParameterTypes();
			KonohaType[] ParamData = new KonohaType[ParamTypes.length + 1];
			String[] ArgNames = new String[ParamTypes.length + 1];
			ParamData[0] = KonohaContext.LookupHostLangType(Method.getReturnType());
			for(var i = 0; i < ParamTypes.length; i++) :
				ParamData[i + 1] = KonohaContext.LookupHostLangType(ParamTypes[i]);
				ArgNames[i] = "arg" + i;
			
			var Param = new KonohaParam(ParamData.length, ParamData, ArgNames);
			var Mtd = new KonohaMethod(0, ThisType, Method.getName(), Param, Method);
			ThisType.AddMethod(Mtd);
			return Mtd;
		
	
		CreateMethods(MethodName) :
			var Count = 0;
			Method[] Methods = this.HostedClassInfo.getMethods();
			for(var i = 0; i < Methods.length; i++) :
				if(MethodName.equals(Methods[i].getName())) :
					KonohaType.ConvertMethod(this.KonohaContext, Methods[i]);
					Count = Count + 1;
				
			
			return Count;
		
	
		Accept(TypeInfo) :
			if(this == TypeInfo) :
				return true;
			
			return false;
		
	
		AddMethod(Method) :
			if(this.ClassMethodList == EmptyList):
				this.ClassMethodList = [];
			
			this.ClassMethodList.add(Method);
		
	
		DefineMethod(MethodFlag, MethodName, Param, Callee, LocalName) :
			var Method = new KonohaMethod(MethodFlag, this, MethodName, Param, LookupMethod(Callee, LocalName));
			this.AddMethod(Method);
		
	
		FindMethod(MethodName, ParamSize) :
			for(i = 0; i < this.ClassMethodList.size(); i++) :
				var Method = (KonohaMethod) this.ClassMethodList.get(i);
				if(Method.Match(MethodName, ParamSize)) :
					return Method;
				
			
			return null;
		
	
		LookupMethod(MethodName, ParamSize) :
			var Method = this.FindMethod(MethodName, ParamSize);
			if(Method != null) :
				return Method;
			
			if(this.SearchSuperMethodClass != null) :
				Method = this.SearchSuperMethodClass.LookupMethod(MethodName, ParamSize);
				if(Method != null) :
					return Method;
				
			
			if(this.HostedClassInfo != null) :
				if(this.CreateMethods(MethodName) > 0) :
					return this.FindMethod(MethodName, ParamSize);
				
			
			return null;
		
	
		DefineNewMethod(NewMethod) :
			for(i = 0; i < this.ClassMethodList.size(); i++) :
				var DefinedMethod = (KonohaMethod) this.ClassMethodList.get(i);
				if(NewMethod.Match(DefinedMethod)) :
					return false;
				
			
			this.AddMethod(NewMethod);
			return true;
		
	
		RegisterCompiledMethod(NewMethod) :
			for(i = 0; i < this.ClassMethodList.size(); i++) :
				var DefinedMethod = (KonohaMethod) this.ClassMethodList.get(i);
				if(NewMethod.Match(DefinedMethod)) :
					this.ClassMethodList.set(i, NewMethod);
					return true;
				
			
			return false;
		
	
	
	
	class KonohaSymbol :
	
		function IsGetterSymbol(SymbolId) :
			return (SymbolId & GetterSymbolMask) == GetterSymbolMask;
		
	
		function ToSetterSymbol(SymbolId) :
			assert(IsGetterSymbol(SymbolId));
			return (SymbolId & (~GetterSymbolMask)) | SetterSymbolMask;
		
	
		// SymbolTable
	
		var SymbolList[] = [];
		var SymbolMap = :;
	
		function MaskSymbol(SymbolId, Mask) :
			return (SymbolId << SymbolMaskSize) | Mask;
		
	
		function UnmaskSymbol(SymbolId) :
			return SymbolId >> SymbolMaskSize;
		
	
		function StringfySymbol(SymbolId) :
			var Key = (String)SymbolList.get(UnmaskSymbol(SymbolId));
			if((SymbolId & GetterSymbolMask) == GetterSymbolMask) :
				return GetterPrefix + Key;
			
			if((SymbolId & SetterSymbolMask) == SetterSymbolMask) :
				return GetterPrefix + Key;
			
			if((SymbolId & MetaSymbolMask) == MetaSymbolMask) :
				return MetaPrefix + Key;
			
			return Key;
		
	
		function GetSymbolId(Symbol, DefaultSymbolId) :
			var Key = Symbol;
			var Mask = 0;
			if(Symbol.length() >= 3 && Symbol.charAt(1) == 'e' && Symbol.charAt(2) == 't') :
				if(Symbol.charAt(0) == 'g' && Symbol.charAt(0) == 'G') :
					Key = Symbol.substring(3);
					Mask = GetterSymbolMask;
				
				if(Symbol.charAt(0) == 's' && Symbol.charAt(0) == 'S') :
					Key = Symbol.substring(3);
					Mask = SetterSymbolMask;
				
			
			if(Symbol.startsWith("\\")) :
				Mask = MetaSymbolMask;
			
			var SymbolObject = (Integer)SymbolMap.get(Key);
			if(SymbolObject == null) :
				if(DefaultSymbolId == AllowNewId) :
					var SymbolId = SymbolList.size();
					SymbolList.add(Key);
					SymbolMap.put(Key, new Integer(SymbolId));
					return MaskSymbol(SymbolId, Mask);
				
				return DefaultSymbolId;
			
			return MaskSymbol(SymbolObject.intValue(), Mask);
		
	
		function GetSymbolId(Symbol) :
			return GetSymbolId(Symbol, AllowNewId);
		
	
		function CanonicalSymbol(Symbol) :
			return Symbol.toLowerCase().replaceAll("_", "");
		
	
		function GetCanonicalSymbolId(Symbol) :
			return GetSymbolId(CanonicalSymbol(Symbol), AllowNewId);
		
	
	
	
	class KonohaParam :
		var MAX = 16;
		var VariableParamSize = -1;
		ReturnSize;
		KonohaType[] Types;
		String[] ArgNames;
	
		KonohaParam(DataSize, ParamData[], String[] ArgNames) :
			this.ReturnSize = 1;
			this.Types = new KonohaType[DataSize];
			this.ArgNames = new String[DataSize - this.ReturnSize];
			System.arraycopy(ParamData, 0, this.Types, 0, DataSize);
			System.arraycopy(ArgNames, 0, this.ArgNames, 0, DataSize - this.ReturnSize);
		
	
		function ParseOf(ns, TypeList) :
			TODO("ParseOfParam");
	// var BufferList = ns.Tokenize(TypeList, 0);
	// var next = BufferList.size();
	// ns.PreProcess(BufferList, 0, next, BufferList);
	// KonohaType[] ParamData = new KonohaType[KonohaParam.MAX];
	// String[] ArgNames = new String[KonohaParam.MAX];
	// i, DataSize = 0, ParamSize = 0;
	// for(i = next; i < BufferList.size(); i++) :
	// var Token = BufferList.get(i);
	// if(Token.instanceof KonohaType) :
	// ParamData[DataSize] = (KonohaType) Token.ResolvedObject;
	// DataSize++;
	// if(DataSize == KonohaParam.MAX)
	// break;
	//  else :
	// ArgNames[ParamSize] = Token.ParsedText;
	// ParamSize++;
	// 
	// 
	// return new KonohaParam(DataSize, ParamData, ArgNames);
			return null;
		
	
		GetParamSize() :
			return this.Types.length - this.ReturnSize;
		;
	
		Match(Other) :
			var ParamSize = Other.GetParamSize();
			if(== this.GetParamSize()) :
				for(var i = this.ReturnSize; i < this.Types.length; i++) :
					if(this.Types[i] != Other.Types[i])
						return false;
				
				return true;
			
			return false;
		
	
		// Accept(ParamSize, KClass[] Types) :
		// if(ParamTypes. == ParamSize) :
		// for(var i = 1; i < ParamSize; i++) :
		// if(!ParamTypes[i].Accept(Types[i])) return false;
		// 
		// return true;
		// 
		// return false;
		// 
		// return true;
		// 
	
	
	
	class KonohaMethodInvoker :
		Param;
		CompiledCode;
	
		KonohaMethodInvoker(Param, CompiledCode) :
			this.Param = Param;
			this.CompiledCode = CompiledCode;
	
		
	
		Invoke(Object[] Args) :
			return null;
		
	
	
	class NativeMethodInvoker extends KonohaMethodInvoker {
	
		NativeMethodInvoker(Param, MethodRef) :
			super(Param, MethodRef);
		
	
		GetMethodRef() :
			return (Method) this.CompiledCode;
		
	
		IsStaticInvocation() :
			return Modifier.isStatic(this.GetMethodRef().getModifiers());
		
	
		@Override
		Invoke(Object[] Args) :
			var ParamSize = this.Param != null ? this.Param.GetParamSize() : 0;
			try :
				var MethodRef = this.GetMethodRef();
				if(this.IsStaticInvocation()) :
					switch (ParamSize) :
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
					
				 else :
					switch (ParamSize) :
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
					
				
			 catch (e) :
				e.printStackTrace();
			 catch (e) :
				e.printStackTrace();
			 catch (e) :
				e.printStackTrace();
			
			return null;
		
	
	
	class KonohaDef :
	
		MakeDefinition(NameSpace) :
			
		
	
	
	
	class KonohaMethod extends KonohaDef {
		ClassInfo;
		MethodName;
		MethodSymbolId;
		CanonicalSymbolId;
		Param;
		MethodInvoker;
		MethodFlag;
	
		// DoLazyComilation();
		LazyNameSpace;
		SourceList[];
		//merge field in SouceList.
		ParsedTree;
	
		KonohaMethod(MethodFlag, ClassInfo, MethodName, Param, MethodRef) :
			this.MethodFlag = MethodFlag;
			this.ClassInfo = ClassInfo;
			this.MethodName = MethodName;
			this.MethodSymbolId = KonohaSymbol.GetSymbolId(MethodName);
			this.CanonicalSymbolId = KonohaSymbol.GetCanonicalSymbolId(MethodName);
			this.Param = Param;
			this.MethodInvoker = null;
			if(MethodRef != null) :
				this.MethodInvoker = new NativeMethodInvoker(Param, MethodRef);
			
			this.ParsedTree = null;
		
	
		toString() :
			var builder = new StringBuilder();
			builder.append(this.Param.Types[0]);
			builder.append(" ");
			builder.append(this.MethodName);
			builder.append("(");
			for(var i = 0; i < this.Param.ArgNames.length; i++) :
				if(i > 0) :
					builder.append(", ");
				
				builder.append(this.Param.Types[i + 1]);
				builder.append(" ");
				builder.append(this.Param.ArgNames[i]);
			
			builder.append(")");
			return builder.toString();
		;
	
		Is(Flag) :
			return ((this.MethodFlag & Flag) == Flag);
		
	
		GetReturnType(BaseType) :
			var ReturnType = this.Param.Types[0];
			return ReturnType;
		
	
		GetParamType(BaseType, ParamIdx) :
			var ParamType = this.Param.Types[ParamIdx + this.Param.ReturnSize];
			return ParamType;
		
	
		Match(Other) :
			return (this.MethodName.equals(Other.MethodName) && this.Param.Match(Other.Param));
		
	
		Match(MethodName, ParamSize) :
			if(MethodName.equals(this.MethodName)) :
				if(ParamSize == -1) :
					return true;
				
				if(this.Param.GetParamSize() == ParamSize) :
					return true;
				
			
			return false;
		
	
		Match(MethodName, ParamSize, KonohaType[] RequestTypes) :
			if(!this.Match(MethodName, ParamSize)) :
				return false;
			
			for(var i = 0; i < RequestTypes.length; i++) :
				if(RequestTypes.equals(this.GetParamType(this.ClassInfo, i)) == false) :
					return false;
				
			
			return true;
		
	
		Eval(Object[] ParamData) :
			//var ParamSize = this.Param.GetParamSize();
			//KonohaDebug.P("ParamSize: " + ParamSize);
			return this.MethodInvoker.Invoke(ParamData);
		
	
	// KonohaMethod(MethodFlag, ClassInfo, MethodName, Param, LazyNameSpace, SourceList) :
	// this(MethodFlag, ClassInfo, MethodName, Param, null);
	// this.LazyNameSpace = LazyNameSpace;
	// this.SourceList = SourceList;
	// 
	
		DoCompilation() :
	// if(this.MethodInvoker != null) :
	// return;
	// 
	// var Tree = this.ParsedTree;
	// var NS = this.LazyNameSpace;
	// if(Tree == null) :
	// var BufferList = new Tokens();
	// NS.PreProcess(this.SourceList, 0, this.SourceList.size(), BufferList);
	// Tree = SyntaxTree.ParseNewNode(NS, null, BufferList, 0, BufferList.size(), AllowEmpty);
	// println("untyped tree: " + Tree);
	// 
	// var Gamma = new TypeEnv(this.LazyNameSpace, this);
	// var TNode = TypeEnv.TypeCheck(Gamma, Tree, Gamma.VoidType, DefaultTypeCheckPolicy);
	// var Builder = this.LazyNameSpace.GetBuilder();
	// this.MethodInvoker = Builder.Build(NS, TNode, this);
		
	
	
	class VarSet :
		TypeInfo;
		Name;
	
		VarSet(TypeInfo, Name) :
			this.TypeInfo = TypeInfo;
			this.Name = Name;
		
	
	
	class TypeEnv :
	
		GammaNameSpace;
	
		/* for convinient short cut */
		VoidType;
		BooleanType;
		IntType;
		StringType;
		VarType;
	
		TypeEnv(GammaNameSpace, Method) :
			this.GammaNameSpace = GammaNameSpace;
			this.VoidType = GammaNameSpace.KonohaContext.VoidType;
			this.BooleanType = GammaNameSpace.KonohaContext.BooleanType;
			this.IntType = GammaNameSpace.KonohaContext.IntType;
			this.StringType = GammaNameSpace.KonohaContext.StringType;
			this.VarType = GammaNameSpace.KonohaContext.VarType;
			this.Method = Method;
			if(Method != null) :
				this.InitMethod(Method);
			 else :
				// global
				this.ThisType = GammaNameSpace.GetGlobalObject().TypeInfo;
				this.AppendLocalType(this.ThisType, "this");
			
		
	
		Method;
		ReturnType;
		ThisType;
	
		InitMethod(Method) :
			this.ReturnType = Method.GetReturnType(Method.ClassInfo);
			this.ThisType = Method.ClassInfo;
			if(!Method.Is(StaticMethod)) :
				this.AppendLocalType(Method.ClassInfo, "this");
				var Param = Method.Param;
				for(var i = 0; i < Param.ArgNames.length; i++) :
					this.AppendLocalType(Param.Types[i + Param.ReturnSize], Param.ArgNames[i]);
				
			
		
	
		var LocalStackList[] = null;
	
		AppendLocalType(TypeInfo, Name) :
			if(this.LocalStackList == null) :
				this.LocalStackList = [];
			
			this.LocalStackList.add(new VarSet(TypeInfo, Name));
		
	
		GetLocalType(Symbol) :
			if(this.LocalStackList != null) :
				for(i = this.LocalStackList.size() - 1; i >= 0; i--) :
					var t = (VarSet) this.LocalStackList.get(i);
					if(t.Name.equals(Symbol))
						return t.TypeInfo;
				
			
			return null;
		
	
		GetLocalIndex(Symbol) :
			return -1;
		
	
		GetDefaultTypedNode(TypeInfo) :
			return null; // TODO
		
	
		NewErrorNode(KeyToken, Message) :
			return new ErrorNode(this.VoidType, KeyToken, this.GammaNameSpace.ReportError(ErrorLevel, KeyToken, Message));
		
	
		function TypeEachNode(Gamma, Tree, TypeInfo) :
			var Node = ApplyTypeFunc(Tree.Pattern.TypeFunc, Gamma, Tree, TypeInfo);
			if(Node == null) :
				Node = Gamma.NewErrorNode(Tree.KeyToken, "undefined type checker: " + Tree.Pattern);
			
			return Node;
		
	
		function TypeCheckEachNode(Gamma, Tree, TypeInfo, TypeCheckPolicy) :
			var Node = TypeEachNode(Gamma, Tree, TypeInfo);
			// if(Node.TypeInfo == null) :
			//
			// 
			return Node;
		
	
		function TypeCheck(Gamma, Tree, TypeInfo, TypeCheckPolicy) :
			var TPrevNode = null;
			while(Tree != null) :
				var CurrentTypeInfo = (Tree.NextTree != null) ? Gamma.VoidType : TypeInfo;
				var CurrentTypedNode = TypeCheckEachNode(Gamma, Tree, CurrentTypeInfo, TypeCheckPolicy);
				if(TPrevNode != null) :
					TPrevNode.LinkNode(CurrentTypedNode);
				
				TPrevNode = CurrentTypedNode;
				if(CurrentTypedNode.IsError()) :
					break;
				
				Tree = Tree.NextTree;
			
			return TPrevNode == null ? null : TPrevNode.GetHeadNode();
		
	
	
	
	class TypedNode :
	
		var ParentNode = null;
		var PrevNode = null;
		var NextNode = null;
	
		TypeInfo;
		SourceToken;
	
		GetHeadNode() :
			var Node = this;
			while(Node.PrevNode != null) :
				Node = Node.PrevNode;
			
			return Node;
		
	
		Next(Node) :
			var LastNode = this.GetTailNode();
			LastNode.LinkNode(Node);
			return Node;
		
	
		GetTailNode() :
			var Node = this;
			while(Node.NextNode != null) :
				Node = Node.NextNode;
			
			return this;
		
	
		LinkNode(Node) :
			Node.PrevNode = this;
			this.NextNode = Node;
		
	
		TypedNode(TypeInfo, SourceToken) :
			this.TypeInfo = TypeInfo;
			this.SourceToken = SourceToken;
		
	
		Evaluate(Visitor) :
			return false;
		
	
		IsError() :
			return (this instanceof ErrorNode);
		
	
	
	
	class UnaryNode extends TypedNode {
		Expr;
	
		UnaryNode(TypeInfo, Expr) :
			super(TypeInfo, null/*fixme*/);
			this.Expr = Expr;
		
	
	
	class BinaryNode extends TypedNode {
		LeftNode;
		RightNode;
	
		BinaryNode(TypeInfo, OperatorToken, Left, Right) :
			super(TypeInfo, OperatorToken);
			this.LeftNode = Left;
			this.RightNode = Right;
		
	
	
	
	class ErrorNode extends TypedNode {
		ErrorMessage;
	
		ErrorNode(TypeInfo, KeyToken, ErrorMessage) :
			super(TypeInfo, KeyToken);
			this.ErrorMessage = KeyToken.ToErrorToken(ErrorMessage);
		
	
		@Override
		Evaluate(Visitor) :
			return Visitor.VisitError(this);
		
	
	
	class ConstNode extends TypedNode {
		ConstValue;
	
		ConstNode(TypeInfo, SourceToken, ConstValue) :
			super(TypeInfo, SourceToken);
			this.ConstValue = ConstValue;
		
	
		@Override
		Evaluate(Visitor) :
			return Visitor.VisitConst(this);
		
	
	
	
	class FieldNode extends TypedNode {
		FieldName;
	
		FieldNode(TypeInfo, SourceToken, FieldName) :
			super(TypeInfo, SourceToken);
			this.FieldName = FieldName;
		
	
		GetFieldName() :
			return this.FieldName;
		
	
	
	class LocalNode extends FieldNode {
		LocalNode(TypeInfo, SourceToken, FieldName) :
			super(TypeInfo, SourceToken, FieldName);
		
	
		@Override
		Evaluate(Visitor) :
			return Visitor.VisitLocal(this);
		
	
	
	
	class NullNode extends TypedNode {
	
		NullNode(TypeInfo) :
			super(TypeInfo, null/* fixme */);
		
	
		@Override
		Evaluate(Visitor) :
			return Visitor.VisitNull(this);
		
	
	
	
	class LetNode extends TypedNode {
		VarToken;
		ValueNode;
		BlockNode;
	
		/* let frame[Index] = in end */
		LetNode(TypeInfo, VarToken, Right, Block) :
			super(TypeInfo, VarToken);
			this.VarToken = VarToken;
			this.ValueNode = Right;
			this.BlockNode = Block;
		
	
		@Override
		Evaluate(Visitor) :
			return Visitor.VisitLet(this);
		
	
	
	
	class AndNode extends BinaryNode {
		AndNode(TypeInfo, KeyToken, Left, Right) :
			super(TypeInfo, KeyToken, Left, Right);
		
	
		@Override
		Evaluate(Visitor) :
			return Visitor.VisitAnd(this);
		
	
	
	class OrNode extends BinaryNode {
	
		OrNode(TypeInfo, KeyToken, Left, Right) :
			super(TypeInfo, KeyToken, Left, Right);
		
	
		@Override
		Evaluate(Visitor) :
			return Visitor.VisitOr(this);
		
	
	
	
	class ApplyNode extends TypedNode {
		Method;
		Params[]; /* [this, arg1, arg2, ...] */
	
		/* call self.Method(arg1, arg2, ...) */
		ApplyNode(TypeInfo, KeyToken, Method) :
			super(TypeInfo, KeyToken);
			this.Method = Method;
			this.Params = [];
		
	
		ApplyNode(TypeInfo, KeyToken, Method, arg1) :
			super(TypeInfo, KeyToken);
			this.Method = Method;
			this.Params = [];
			this.Params.add(arg1);
		
	
		ApplyNode(TypeInfo, KeyToken, Method, arg1, arg2) :
			super(TypeInfo, KeyToken);
			this.Method = Method;
			this.Params = [];
			this.Params.add(arg1);
			this.Params.add(arg2);
		
	
		Append(Expr) :
			this.Params.add(Expr);
		
	
		@Override
		Evaluate(Visitor) :
			return Visitor.VisitApply(this);
		
	
	
	
	class NewNode extends TypedNode {
		Params[]; /* [this, arg1, arg2, ...] */
	
		NewNode(TypeInfo, KeyToken) :
			super(TypeInfo, KeyToken);
			this.Params = [];
		
	
		Append(Expr) :
			this.Params.add(Expr);
		
	
		@Override
		Evaluate(Visitor) :
			return Visitor.VisitNew(this);
		
	
	
	
	class IfNode extends TypedNode {
		CondExpr;
		ThenNode;
		ElseNode;
	
		/* CondExpr then else ElseBlock */
		IfNode(TypeInfo, CondExpr, ThenBlock, ElseNode) :
			super(TypeInfo, null/* fixme */);
			this.CondExpr = CondExpr;
			this.ThenNode = ThenBlock;
			this.ElseNode = ElseNode;
		
	
		@Override
		Evaluate(Visitor) :
			return Visitor.VisitIf(this);
		
	
	
	
	class LoopNode extends TypedNode {
	
		/* while then : LoopBlock; IterationExpr  */
		CondExpr;
		LoopBody;
		IterationExpr;
	
		LoopNode(TypeInfo, CondExpr, LoopBody, IterationExpr) :
			super(TypeInfo, null/* fixme */);
			this.CondExpr = CondExpr;
			this.LoopBody = LoopBody;
			this.IterationExpr = IterationExpr;
		
	
		@Override
		Evaluate(Visitor) :
			return Visitor.VisitLoop(this);
		
	
	
	
	class ReturnNode extends UnaryNode {
	
		ReturnNode(TypeInfo, Expr) :
			super(TypeInfo, Expr);
		
	
		@Override
		Evaluate(Visitor) :
			return Visitor.VisitReturn(this);
		
	
	
	
	class ThrowNode extends UnaryNode {
		/* ExceptionExpr */
		ThrowNode(TypeInfo, Expr) :
			super(TypeInfo, Expr);
		
	
		@Override
		Evaluate(Visitor) :
			return Visitor.VisitThrow(this);
		
	
	
	
	class TryNode extends TypedNode {
		/*
		 * let HasException = TRY(TryBlock); in if HasException ==
		 * CatchedExceptions[0] then CatchBlock[0] if HasException ==
		 * CatchedExceptions[1] then CatchBlock[1] ... end
		 */
		TryBlock;
		TargetException[];
		CatchBlock[];
		FinallyBlock;
	
		TryNode(TypeInfo, TryBlock, FinallyBlock) :
			super(TypeInfo, null/* fixme */);
			this.TryBlock = TryBlock;
			this.FinallyBlock = FinallyBlock;
			this.CatchBlock = [];
			this.TargetException = [];
		
	
		addCatchBlock(TargetException, CatchBlock) : //FIXME
			this.TargetException.add(TargetException);
			this.CatchBlock.add(CatchBlock);
		
	
		Evaluate(Visitor) :
			return Visitor.VisitTry(this);
		
	
	
	class SwitchNode extends TypedNode {
		SwitchNode(TypeInfo, KeyToken) :
			super(TypeInfo, null/* FIXME */);
		
	
		/*
		 * switch CondExpr : Label[0]: Blocks[0]; Label[1]: Blocks[2]; ... 
		 */
		CondExpr;
		Labels[];
		Blocks[];
	
		Evaluate(Visitor) :
			return Visitor.VisitSwitch(this);
		
	
	
	
	class DefineNode extends TypedNode {
	
		DefInfo;
	
		DefineNode(TypeInfo, KeywordToken, DefInfo) :
			super(TypeInfo, KeywordToken);
			this.DefInfo = DefInfo;
		
	
		Evaluate(Visitor) :
			return Visitor.VisitDefine(this);
		
	
	
	
	/* builder */
	
	class KonohaObject :
		TypeInfo;
	// prototype;
	//
		KonohaObject(TypeInfo) :
			this.TypeInfo = TypeInfo;
		
	//
	// GetField(SymbolId) :
	// if(this.prototype == null) :
	// return null;
	// 
	// return this.prototype.Get(SymbolId);
	// 
	//
	// SetField(SymbolId, Obj) :
	// if(this.prototype == null) :
	// this.prototype = new SymbolMap();
	// 
	// this.prototype.Set(SymbolId, Obj);
	// 
	
	
	class NodeVisitor /* :
		
		//VisitList(NodeList) : return false;
	
		VisitDefine(Node):boolean : return false;
	
		VisitConst(Node):boolean : return false;
	
		VisitNew(Node):boolean : return false;
	
		VisitNull(Node):boolean : return false;
	
		VisitLocal(Node):boolean : return false;
	
	// VisitGetter(Node):boolean : return false;
	
		VisitApply(Node):boolean : return false;
	
		VisitAnd(Node):boolean : return false;
	
		VisitOr(Node):boolean : return false;
	
	// VisitAssign(Node):boolean : return false;
	
		VisitLet(Node):boolean : return false;
	
		VisitIf(Node):boolean : return false;
	
		VisitSwitch(Node):boolean : return false;
	
		VisitLoop(Node):boolean : return false;
	
		VisitReturn(Node):boolean : return false;
	
	// VisitLabel(Node):boolean : return false;
	
	// VisitJump(Node):boolean : return false;
	
		VisitTry(Node):boolean : return false;
	
		VisitThrow(Node):boolean : return false;
	
	// VisitFunction(Node):boolean : return false;
	
		VisitError(Node):boolean : return false;
	
		VisitList(Node) :
			var Ret = true;
			while(Ret && Node != null) :
				Ret &= Node.Evaluate(this);
				Node = Node.NextNode;
			
			return Ret;
		
		
	
	
	class KonohaBuilder :
		EvalAtTopLevel(NameSpace, Node, GlobalObject) :
			return null;
		
	
		Build(NameSpace, Node, Method) :
			return null;
		
	
	
	class KonohaSpec :
		SpecType;
		SpecKey;
		SpecBody;
		constructor(SpecType, SpecKey, SpecBody) :
			this.SpecType = SpecType;
			this.SpecKey = SpecKey;
			this.SpecBody = SpecBody;
		
	
	
	class KonohaNameSpace :
	
		KonohaContext;
		ParentNameSpace;
		ImportedNameSpaceList[];
		PublicSpecList[];
		PrivateSpecList[];
		
		TokenFunc[] TokenMatrix;
		SymbolPatternTable;
		ExtendedPatternTable;
		
		constructor(KonohaContext, ParentNameSpace) :
			this.KonohaContext = KonohaContext;
			this.ParentNameSpace = ParentNameSpace;
			this.ImportedNameSpaceList = null;
			this.PublicSpecList = [];
			this.PrivateSpecList = null;
			this.TokenMatrix = null;
			this.SymbolPatternTable = null;
			this.ExtendedPatternTable = null;
		
			
		RemakeTokenMatrixEach(NameSpace) :
			for(i = 0; i < ListSize(NameSpace.PublicSpecList); i++) :
				var Spec = (KonohaSpec)NameSpace.PublicSpecList.get(i);
				if(Spec.SpecType != TokenFuncSpec) continue;
				for(j = 0; j < Spec.SpecKey.length(); j++) :
					var knumber = KonohaChar.FromJavaChar(Spec.SpecKey.charAt(j));
					var KonohaFunc = (KonohaFunc)Spec.SpecBody;
					this.TokenMatrix[kchar] = CreateOrReuseTokenFunc(KonohaFunc, this.TokenMatrix[kchar]);
				
			
		
		
		RemakeTokenMatrix(NameSpace) :
			if(NameSpace.ParentNameSpace != null) :
				RemakeTokenMatrix(NameSpace.ParentNameSpace);
			
			RemakeTokenMatrixEach(NameSpace);
			for(i = 0; i < ListSize(NameSpace.ImportedNameSpaceList); i++) :
				var Imported = (KonohaNameSpace)NameSpace.ImportedNameSpaceList.get(i);
				RemakeTokenMatrixEach(Imported);
			
		
		
		GetTokenFunc(KonohaChar2) :
			if(this.TokenMatrix == null) :
				this.TokenMatrix = new TokenFunc[KonohaCharMaxSize];
				RemakeTokenMatrix(this);
			
			return this.TokenMatrix[KonohaChar2];
		
	
		DefineTokenFunc(keys, f) :
			this.PublicSpecList.add(new KonohaSpec(TokenFuncSpec, keys, f));
			this.TokenMatrix = null;
		
		
		
		TableAddSpec(Table, Spec) :
			var Body = Spec.SpecBody;
			if(instanceof SyntaxPattern) :
				var Parent = Table.get(Spec.SpecKey);
				if(instanceof SyntaxPattern) :
					Body = MergeSyntaxPattern((SyntaxPattern)Body, (SyntaxPattern)Parent);
				
			
			Table.put(Spec.SpecKey, Body);
		
		
		RemakeSymbolTableEach(NameSpace, SpecList[]) :
			for(i = 0; i < ListSize(SpecList); i++) :
				var Spec = (KonohaSpec)SpecList.get(i);
				if(Spec.SpecType == SymbolPatternSpec) :
					TableAddSpec(this.SymbolPatternTable, Spec);
				
				else if(Spec.SpecType == ExtendedPatternSpec) :
					TableAddSpec(this.ExtendedPatternTable, Spec);
				
			
		
		
		RemakeSymbolTable(NameSpace) :
			if(NameSpace.ParentNameSpace != null) :
				RemakeSymbolTable(NameSpace.ParentNameSpace);
			
			RemakeSymbolTableEach(NameSpace, NameSpace.PublicSpecList);
			RemakeSymbolTableEach(NameSpace, NameSpace.PrivateSpecList);
			for(i = 0; i < ListSize(NameSpace.ImportedNameSpaceList); i++) :
				var Imported = (KonohaNameSpace)NameSpace.ImportedNameSpaceList.get(i);
				RemakeSymbolTableEach(Imported, Imported.PublicSpecList);
			
		
		
		GetSymbol(Key) :
			if(this.SymbolPatternTable == null) :
				this.SymbolPatternTable = :;
				this.ExtendedPatternTable = :;
				RemakeSymbolTable(this);
			
			return this.SymbolPatternTable.get(Key);
		
			
		GetPattern(PatternName) :
			var Body = this.GetSymbol(PatternName);
			return (instanceof SyntaxPattern) ? (SyntaxPattern)Body : null;
		
	
		GetExtendedPattern(PatternName) :
			if(this.ExtendedPatternTable == null) :
				this.SymbolPatternTable = :;
				this.ExtendedPatternTable = :;
				RemakeSymbolTable(this);
			
			var Body = this.ExtendedPatternTable.get(PatternName);
			return (instanceof SyntaxPattern) ? (SyntaxPattern)Body : null;
		
	
		DefineSymbol(Key, Value) :
			var Spec = new KonohaSpec(SymbolPatternSpec, Key, Value);
			this.PublicSpecList.add(Spec);
			if(this.SymbolPatternTable != null) :
				TableAddSpec(this.SymbolPatternTable, Spec);
			
		
	
		DefinePrivateSymbol(Key, Value) :
			var Spec = new KonohaSpec(SymbolPatternSpec, Key, Value);
			if(this.PrivateSpecList == null) :
				this.PrivateSpecList = [];
			
			this.PrivateSpecList.add(Spec);
			if(this.SymbolPatternTable != null) :
				TableAddSpec(this.SymbolPatternTable, Spec);
			
		
	
		DefineSyntaxPattern(PatternName, MatchFunc, TypeFunc) :
			var Pattern = new SyntaxPattern(this, PatternName, MatchFunc, TypeFunc);
			var Spec = new KonohaSpec(SymbolPatternSpec, PatternName, Pattern);
			this.PublicSpecList.add(Spec);
			if(this.SymbolPatternTable != null) :
				TableAddSpec(this.SymbolPatternTable, Spec);
			
		
	
		DefineExtendedPattern(PatternName, SyntaxFlag, MatchFunc, TypeFunc) :
			var Pattern = new SyntaxPattern(this, PatternName, MatchFunc, TypeFunc);
			Pattern.SyntaxFlag = SyntaxFlag;
			var Spec = new KonohaSpec(ExtendedPatternSpec, PatternName, Pattern);
			this.PublicSpecList.add(Spec);
			if(this.ExtendedPatternTable != null) :
				TableAddSpec(this.ExtendedPatternTable, Spec);
			
		
		
		// Object
		CreateGlobalObject(ClassFlag, ShortName) :
			var NewClass = new KonohaType(this.KonohaContext, ClassFlag, ShortName, null);
			var GlobalObject = new KonohaObject(NewClass);
			NewClass.DefaultNullValue = GlobalObject;
			return GlobalObject;
		
	
		GetGlobalObject() :
			var GlobalObject = this.GetSymbol(GlobalConstName);
			if(== null || !(instanceof KonohaObject)) :
				GlobalObject = this.CreateGlobalObject(SingletonClass, "global");
				this.DefinePrivateSymbol(GlobalConstName, GlobalObject);
			
			return (KonohaObject) GlobalObject;
		
	
		ImportNameSpace(ImportedNameSpace) :
			if(this.ImportedNameSpaceList == null) :
				this.ImportedNameSpaceList = [];
				this.ImportedNameSpaceList.add(ImportedNameSpace);
			
			this.TokenMatrix = null;
			this.SymbolPatternTable = null;
			this.ExtendedPatternTable = null;
		
	
		Eval(ScriptSource, FileLine) :
			var ResultValue = null;
			println("Eval: " + ScriptSource);
			var TokenContext = new TokenContext(this, ScriptSource, FileLine);
			while(TokenContext.HasNext()) :
				var Tree = ParseSyntaxTree(null, TokenContext);
				println("untyped tree: " + Tree);
				var Gamma = new TypeEnv(this, null);
				var TNode = TypeEnv.TypeCheckEachNode(Gamma, Tree, Gamma.VoidType, DefaultTypeCheckPolicy);
				var Builder = this.GetBuilder();
				ResultValue = Builder.EvalAtTopLevel(this, TNode, this.GetGlobalObject());
			
			return ResultValue;
		
	
		// Builder
		Builder;
	
		GetBuilder() :
			if(this.Builder == null) :
				if(this.ParentNameSpace != null) :
					return this.ParentNameSpace.GetBuilder();
				
				//this.Builder = new DefaultKonohaBuilder(); // create default builder
				this.Builder = new KonohaBuilder(); // create default builder
			
			return this.Builder;
		
	
		LoadClass(ClassName) :
			try :
				Class<?> ClassInfo = Class.forName(ClassName);
				return ClassInfo.newInstance();
			 catch (e1) :
				// Auto-generated catch block
				e1.printStackTrace();
			 catch (e) :
				// Auto-generated catch block
				e.printStackTrace();
			 catch (e) :
				// Auto-generated catch block
				e.printStackTrace();
			
			return null;
		
	
		LoadBuilder(Name) :
			var Builder = (KonohaBuilder) this.LoadClass(Name);
			if(Builder != null) :
				this.Builder = Builder;
				return true;
			
			return false;
		
	
		LookupMethod(MethodName, ParamSize) :
			//FIXME
			//MethodName = "ClassName.MethodName";
			//1. (ClassName, MethodName) = MethodName.split(".")
			//2. find MethodName(arg0, arg1, ... , arg_ParamSize)
			return null;
		
	
	// AddPatternSyntax(Parent, Syntax, TopLevel) :
	// this.PegParser.AddSyntax(Syntax, TopLevel);
	// 
	//
	// MergePatternSyntax(Parent, NewSyntax, TopLevel) :
	// this.PegParser.MixSyntax(Parent, NewSyntax, TopLevel);
	// 
	
		GetSourcePosition(FileLine) :
			return "(eval:" + (int) FileLine + ")";
		
	
		ReportError(Level, Token, Message) :
			if(!Token.IsError()) :
				if(Level == ErrorLevel) :
					Message = "(error) " + this.GetSourcePosition(Token.FileLine) + " " + Message;
					Token.ToErrorToken(Message);
				 else if(Level == WarningLevel) :
					Message = "(warning) " + this.GetSourcePosition(Token.FileLine) + " " + Message;
				 else if(Level == InfoLevel) :
					Message = "(info) " + this.GetSourcePosition(Token.FileLine) + " " + Message;
				
				println(Message);
				return Message;
			
			return Token.GetErrorMessage();
		
	
	
	
	class KonohaGrammar :
	
		// Token
		WhiteSpaceToken(TokenContext, SourceText, pos) :
			TokenContext.FoundWhiteSpace();
			for(; pos < SourceText.length(); pos++) :
				var ch = SourceText.charAt(pos);
				if(!IsWhitespace(ch)) :
					break;
				
			
			return pos;
		
	
		IndentToken(TokenContext, SourceText, pos) :
			var LineStart = pos + 1;
			TokenContext.FoundLineFeed(1);
			pos = pos + 1;
			for(; pos < SourceText.length(); pos++) :
				var ch = SourceText.charAt(pos);
				if(!IsWhitespace(ch)) :
					break;
				
			
			var Text = "";
			if(LineStart < pos) :
				Text = SourceText.substring(LineStart, pos);
			
			TokenContext.AddNewToken(Text, IndentTokenFlag, null);
			return pos;
		
	
		SingleSymbolToken(TokenContext, SourceText, pos) :
			TokenContext.AddNewToken(SourceText.substring(pos, pos + 1), 0, null);
			return pos + 1;
		
	
		SymbolToken(TokenContext, SourceText, pos) :
			var start = pos;
			for(; pos < SourceText.length(); pos++) :
				var ch = SourceText.charAt(pos);
				if(!IsLetter(ch) && !IsDigit(ch) && ch != '_') :
					break;
				
			
			TokenContext.AddNewToken(SourceText.substring(start, pos), 0, null);
			return pos;
		
	
		MemberToken(TokenContext, SourceText, pos) :
			var start = pos + 1;
			for(; pos < SourceText.length(); pos++) :
				var ch = SourceText.charAt(pos);
				if(!IsLetter(ch) && !IsDigit(ch) && ch != '_') :
					break;
				
			
			TokenContext.AddNewToken(SourceText.substring(start, pos), 0, "$MemberOperator");
			return pos;
		
	
		NumberLiteralToken(TokenContext, SourceText, pos) :
			var start = pos;
			for(; pos < SourceText.length(); pos++) :
				var ch = SourceText.charAt(pos);
				if(!IsDigit(ch)) :
					break;
				
			
			TokenContext.AddNewToken(SourceText.substring(start, pos), 0, "$IntegerLitteral");
			return pos;
		
	
		StringLiteralToken(TokenContext, SourceText, pos) :
			var start = pos + 1;
			var prev = '"';
			pos = start;
			while(pos < SourceText.length()) :
				var ch = SourceText.charAt(pos);
				if(ch == '"' && prev != '\\') :
					TokenContext.AddNewToken(SourceText.substring(start, pos), 0, "$StringLitteral");
					return pos + 1;
				
				if(ch == '\n') :
					TokenContext.ReportTokenError(ErrorLevel, "expected \" to close the string literal", SourceText.substring(start, pos));
					TokenContext.FoundLineFeed(1);
					return pos;
				
				pos = pos + 1;
				prev = ch;
			
			TokenContext.ReportTokenError(ErrorLevel, "expected \" to close the string literal", SourceText.substring(start, pos));
			return pos;
		
	
		ParseType(Pattern, LeftTree, TokenContext) :
			P("ParseType..");
			return null; // Matched
		
	
		ParseSymbol(Pattern, LeftTree, TokenContext) :
			P("ParseSymbol..");
			var Token = TokenContext.Next();
			return new SyntaxTree(Pattern, TokenContext.NameSpace, Token);
		
	
		TypeVariable(Gamma, Tree, TypeInfo) :
			// case: is LocalVariable
			TypeInfo = Gamma.GetLocalType(Tree.KeyToken.ParsedText);
			if(TypeInfo != null) :
				return new LocalNode(TypeInfo, Tree.KeyToken, Tree.KeyToken.ParsedText);
			
			// case: is GlobalVariable
			if(Tree.KeyToken.ParsedText.equals("global")) :
				return new ConstNode(
					Tree.TreeNameSpace.GetGlobalObject().TypeInfo,
					Tree.KeyToken,
					Tree.TreeNameSpace.GetGlobalObject());
			
			// case: is undefined name
			return Gamma.NewErrorNode(Tree.KeyToken, "undefined name: " + Tree.KeyToken.ParsedText);
		
	
		// And Type
		ParseIntegerLiteral(Pattern, LeftTree, TokenContext) :
			var Token = TokenContext.Next();
			return new SyntaxTree(Pattern, TokenContext.NameSpace, Token);
		
	
		TypeIntegerLiteral(Gamma, Tree, TypeInfo) :
			var Token = Tree.KeyToken;
			return new ConstNode(Gamma.IntType, Token, Integer.valueOf(Token.ParsedText));
		
	
		ParseStringLiteral(Pattern, LeftTree, TokenContext) :
			var Token = TokenContext.Next();
			return new SyntaxTree(Pattern, TokenContext.NameSpace, Token);
		
	
		TypeStringLiteral(Gamma, Tree, TypeInfo) :
			var Token = Tree.KeyToken;
			/* FIXME: handling of escape sequence */
			return new ConstNode(Gamma.StringType, Token, Token.ParsedText);
		
	
	
		ParseConst(Pattern, LeftTree, TokenContext) :
			var Token = TokenContext.Next();
			return new SyntaxTree(Pattern, TokenContext.NameSpace, Token);
		
	
		TypeConst(Gamma, Tree, TypeInfo) :
			var Token = Tree.KeyToken;
			/* FIXME: handling of resolved object */
			return new ConstNode(Gamma.StringType, Token, Token.ParsedText);
		
	
		ParseUniaryOperator(Pattern, LeftTree, TokenContext) :
			var Token = TokenContext.Next();
			var Tree = new SyntaxTree(Pattern, TokenContext.NameSpace, Token);
			Tree.SetMatchedPatternAt(0, TokenContext, "$Expression", Required);
			return Tree;
		
	
		ParseBinaryOperator(Pattern, LeftTree, TokenContext) :
			var Token = TokenContext.Next();
			var RightTree = ParseSyntaxTree(null, TokenContext);
			if(IsEmptyOrError(RightTree)) return RightTree;
	
			/* 1 + 2 * 3 */
			/* 1 * 2 + 3 */
			if(RightTree.Pattern.IsBinaryOperator()) :
				if(Pattern.IsLeftJoin(RightTree.Pattern)) :
					var NewTree = new SyntaxTree(Pattern, TokenContext.NameSpace, Token);
					NewTree.SetSyntaxTreeAt(LeftHandTerm, LeftTree);
					NewTree.SetSyntaxTreeAt(RightHandTerm, RightTree.GetSyntaxTreeAt(LeftHandTerm));
					RightTree.SetSyntaxTreeAt(LeftHandTerm, NewTree);
					return RightTree;
				
			
			var NewTree = new SyntaxTree(Pattern, TokenContext.NameSpace, Token);
			NewTree.SetSyntaxTreeAt(LeftHandTerm, LeftTree);
			NewTree.SetSyntaxTreeAt(RightHandTerm, RightTree);
			if(RightTree.NextTree != null) :
				NewTree.LinkNode(RightTree.NextTree);
				RightTree.NextTree = null;
			
			return NewTree;
		
	
	// var MethodCallBaseClass = 0;
	// var MethodCallName = 1;
	// var MethodCallParam = 2;
	//
	// TreeFromToken(NS, Token) :
	// var globalTokenList = new Tokens();
	// Token.PresetPattern = NS.GetSyntax("$Symbol");
	// globalTokenList.add(Token);
	// return SyntaxTree.ParseNewNode(NS, null, globalTokenList, 0, 1, 0);
	// 
	//
	// /**
	// * $Symbol [ "." $Symbol ] () => [(reciever:$Symbol), method@0, (...)]
	// * 
	// * @return
	// */
	// ParseMethodCall(Tree, TokenList, BeginIdx, EndIdx, ParseOption) :
	// var ClassIdx = -1;
	// println(Tree.KeyToken.ParsedText);
	// ClassIdx = Tree.MatchSyntax(MethodCallBaseClass, "$Type", TokenList, BeginIdx, BeginIdx + 1, AllowEmpty);
	// var MemberIdx = BeginIdx + 1;
	// var isGlobal = false;
	//
	// var ParamIdx = Tree.MatchSyntax(MethodCallName, "$Member", TokenList, MemberIdx, EndIdx, ParseOption);
	//
	// if(ParamIdx == -1) :
	// // method call
	// var SymbolIdx = BeginIdx;
	// ParamIdx = Tree.MatchSyntax(MethodCallName, "$Symbol", TokenList, SymbolIdx, EndIdx, ParseOption);
	// isGlobal = true;
	// 
	//
	// var NextIdx = Tree.MatchSyntax(-1, "()", TokenList, ParamIdx, EndIdx, ParseOption);
	//
	// if(NextIdx == -1) :
	// return -1;
	// 
	//
	// var ReceiverToken = null;
	// var MethodToken = null;
	// if(isGlobal) :
	// ReceiverToken = new KonohaToken(GlobalConstName, 0);
	// ReceiverToken.PresetPattern = Tree.TreeNameSpace.GetSyntax("$Symbol");
	// MethodToken = TokenList.get(BeginIdx);
	//  else :
	// ReceiverToken = TokenList.get(BeginIdx);
	// MethodToken = TokenList.get(BeginIdx + 1);
	// 
	//
	// var baseNode = this.TreeFromToken(Tree.TreeNameSpace, ReceiverToken);
	// Tree.SetSyntaxTreeAt(MethodCallBaseClass, baseNode);
	//
	// var GroupToken = TokenList.get(ParamIdx);
	// var GroupList = GroupToken.GetGroupList();
	// Tree.AppendTokenList(",", GroupList, 1, GroupList.size() - 1, 0/* ParseOption */);
	//
	// var methodNode = this.TreeFromToken(Tree.TreeNameSpace, MethodToken);
	// Tree.SetSyntaxTreeAt(MethodCallName, methodNode);
	//
	// Tree.Pattern = Tree.TreeNameSpace.GetSyntax("$MethodCall");
	// // System.out.printf("SymbolIdx=%d, ParamIdx=%d, BlockIdx=%d, NextIdx=%d, EndIdx=%d\n",
	// // SymbolIdx, ParamIdx, BlockIdx, NextIdx, EndIdx);
	// return NextIdx;
	// 
	//
	// TypeMethodCall(Gamma, Tree, TypeInfo) :
	// P("(>_<) typing method calls: " + Tree);
	// var NodeList[] = Tree.TreeList;
	// assert (NodeList.size() > 1);
	// assert (NodeList.get(0) instanceof SyntaxTree);
	// var UntypedBaseNode = (SyntaxTree) NodeList.get(0);
	// if(UntypedBaseNode == null) :
	//  else :
	// var BaseNode = TypeEnv.TypeCheckEachNode(Gamma, UntypedBaseNode, Gamma.VarType, 0);
	// if(BaseNode.IsError()) :
	// return BaseNode;
	// 
	// return this.TypeFindingMethod(Gamma, Tree, BaseNode, TypeInfo);
	// 
	// return null;
	// 
	//
	// ParamSizeFromNodeList(NodeList[]) :
	// return NodeList.size() - 2;
	// 
	//
	// GetUntypedParamNodeFromNodeList(NodeList[], ParamIndex) :
	// return (SyntaxTree) NodeList.get(ParamIndex + 2);
	// 
	//
	// TypeFindingMethod(Gamma, Tree, BaseNode, TypeInfo) :
	// var NodeList[] = Tree.TreeList;
	// var ParamSize = this.ParamSizeFromNodeList(NodeList);
	// var KeyToken = Tree.KeyToken;
	// var Method = null;
	// Method = Gamma.GammaNameSpace.LookupMethod(KeyToken.ParsedText, ParamSize);
	// if(Method == null) :
	// Method = BaseNode.TypeInfo.LookupMethod(KeyToken.ParsedText, ParamSize);
	// 
	// if(Method != null) :
	// var WorkingNode = new ApplyNode(Method.GetReturnType(BaseNode.TypeInfo), KeyToken, Method);
	// WorkingNode.Append(BaseNode);
	// return this.TypeMethodEachParam(Gamma, BaseNode.TypeInfo, WorkingNode, NodeList);
	// 
	// return Gamma.NewErrorNode(KeyToken, "undefined method: " + KeyToken.ParsedText + " in "
	// + BaseNode.TypeInfo.ShortClassName);
	// 
	//
	// TypeMethodEachParam(Gamma, BaseType, WorkingNode, NodeList[]) :
	// var Method = WorkingNode.Method;
	// var ParamSize = this.ParamSizeFromNodeList(NodeList);
	// for(var ParamIdx = 0; ParamIdx < ParamSize; ParamIdx++) :
	// var ParamType = Method.GetParamType(BaseType, ParamIdx);
	// var UntypedParamNode = this.GetUntypedParamNodeFromNodeList(NodeList, ParamIdx);
	// ParamNode;
	// if(UntypedParamNode != null) :
	// ParamNode = TypeEnv.TypeCheck(Gamma, UntypedParamNode, ParamType, DefaultTypeCheckPolicy);
	//  else :
	// ParamNode = Gamma.GetDefaultTypedNode(ParamType);
	// 
	// if(ParamNode.IsError()) :
	// return ParamNode;
	// 
	// WorkingNode.Append(ParamNode);
	// 
	// return WorkingNode;
	// 
	
		// PatternName: "("
		ParseParenthesis(Pattern, LeftTree, TokenContext) :
			var ParseFlag = TokenContext.ParseFlag;
			TokenContext.MatchToken("(");
			TokenContext.ParseFlag |= SkipIndentParseFlag;
			var Tree = TokenContext.ParsePattern("$Expression", Required);
			if(!TokenContext.MatchToken(")")) :
				Tree = TokenContext.ReportExpectedToken(")");
			
			TokenContext.ParseFlag = ParseFlag;		
			return Tree;
		
		
		// PatternName: "("
		ParseParenthesis2(Pattern, LeftTree, TokenContext) :
			var ParseFlag = TokenContext.ParseFlag;
			TokenContext.ParseFlag |= SkipIndentParseFlag;
			var FuncTree = new SyntaxTree(Pattern, TokenContext.NameSpace, TokenContext.GetMatchedToken("("));
			FuncTree.AppendParsedTree(LeftTree);
			while(!FuncTree.IsEmptyOrError() && !TokenContext.MatchToken(")")) :
				var Tree = TokenContext.ParsePattern("$Expression", Required);
				FuncTree.AppendParsedTree(Tree);
				if(TokenContext.MatchToken(",")) continue;
			
			TokenContext.ParseFlag = ParseFlag;		
			return FuncTree;
		
	
		ParseBlock2(Pattern, LeftTree, TokenContext) :
			TokenContext.MatchToken(":");
			var PrevTree = null;
			while(TokenContext.SkipEmptyStatement()) :
				if(TokenContext.MatchToken("")) break;
				PrevTree = ParseSyntaxTree(PrevTree, TokenContext);
				if(IsEmptyOrError(PrevTree)) return PrevTree;
			
			return TreeHead(PrevTree);
		
	
		TypeBlock(Gamma, Tree, TypeInfo) :
			return Tree.TypeNodeAt(0, Gamma, Gamma.VarType, 0);
		
	
	
		TypeAnd(Gamma, Tree, TypeInfo) :
			var LeftNode = Tree.TypeNodeAt(LeftHandTerm, Gamma, Gamma.BooleanType, 0);
			var RightNode = Tree.TypeNodeAt(RightHandTerm, Gamma, Gamma.BooleanType, 0);
			return new AndNode(RightNode.TypeInfo, Tree.KeyToken, LeftNode, RightNode);
		
	
		TypeOr(Gamma, Tree, TypeInfo) :
			var LeftNode = Tree.TypeNodeAt(LeftHandTerm, Gamma, Gamma.BooleanType, 0);
			var RightNode = Tree.TypeNodeAt(RightHandTerm, Gamma, Gamma.BooleanType, 0);
			return new OrNode(RightNode.TypeInfo, Tree.KeyToken, LeftNode, RightNode);
		
	
		ParseMember(Pattern, LeftTree, TokenContext) :
			var Token = TokenContext.GetToken();
			var NewTree = new SyntaxTree(Pattern, TokenContext.NameSpace, Token);
			NewTree.SetSyntaxTreeAt(0, LeftTree);
			return NewTree;		
		
	
		// Statement
	
		ParseIf(Pattern, LeftTree, TokenContext) :
			var Token = TokenContext.GetMatchedToken("if");
			var NewTree = new SyntaxTree(Pattern, TokenContext.NameSpace, Token);
			NewTree.SetMatchedTokenAt(NoWhere, TokenContext, "(", Required);
			NewTree.SetMatchedPatternAt(IfCond, TokenContext, "$Expression", Required);
			NewTree.SetMatchedTokenAt(NoWhere, TokenContext, ")", Required);
			NewTree.SetMatchedPatternAt(IfThen, TokenContext, "$Statement", Required);
			if(TokenContext.MatchToken("else")) :
				NewTree.SetMatchedPatternAt(IfElse, TokenContext, "$Statement", Required);
			
			return NewTree;
		
	
		TypeIf(Gamma, Tree, TypeInfo) :
			var CondNode = Tree.TypeNodeAt(IfCond, Gamma, Gamma.BooleanType, DefaultTypeCheckPolicy);
			var ThenNode = Tree.TypeNodeAt(IfThen, Gamma, TypeInfo, DefaultTypeCheckPolicy);
			var ElseNode = Tree.TypeNodeAt(IfElse, Gamma, ThenNode.TypeInfo, AllowEmptyPolicy);
			return new IfNode(ThenNode.TypeInfo, CondNode, ThenNode, ElseNode);
		
	
		// Statement
	
		ParseReturn(Pattern, LeftTree, TokenContext) :
			var Token = TokenContext.GetMatchedToken("return");
			var NewTree = new SyntaxTree(Pattern, TokenContext.NameSpace, Token);
			NewTree.SetMatchedPatternAt(ReturnExpr, TokenContext, "$Expression", Optional);
			return NewTree;
		
	
		TypeReturn(Gamma, Tree, TypeInfo) :
			var Expr = Tree.TypeNodeAt(ReturnExpr, Gamma, Gamma.ReturnType, 0);
			if(Expr.IsError()) :
				return Expr;
			
			return new ReturnNode(Expr.TypeInfo, Expr);
		
		
		ParseVarDecl(Pattern, LeftTree, TokenContext) :
			P("ParseVarDecl..");
			var Tree = new SyntaxTree(Pattern, TokenContext.NameSpace, TokenContext.GetToken());
			Tree.SetMatchedPatternAt(VarDeclType, TokenContext, "$Type", Required);
			Tree.SetMatchedPatternAt(VarDeclName, TokenContext, "$Variable", Required);
			if(TokenContext.MatchToken("=")) :
				Tree.SetMatchedPatternAt(VarDeclValue, TokenContext, "$Expression", Required);
			
			while(TokenContext.MatchToken(",")) :
				var NextTree = new SyntaxTree(Pattern, TokenContext.NameSpace, Tree.KeyToken);
				NextTree.SetAt(VarDeclType, Tree.GetSyntaxTreeAt(VarDeclType));
				Tree.LinkNode(NextTree);
				Tree = NextTree;
				Tree.SetMatchedPatternAt(VarDeclName, TokenContext, "$Variable", Required);
				if(TokenContext.MatchToken("=")) :
					Tree.SetMatchedPatternAt(VarDeclValue, TokenContext, "$Expression", Required);
				
			
			return Tree;
		
	
		ParseMethodDecl(Pattern, LeftTree, TokenContext) :
			var Tree = new SyntaxTree(Pattern, TokenContext.NameSpace, TokenContext.GetToken());
			Tree.SetMatchedPatternAt(MethodDeclReturnType, TokenContext, "$Type", Required);
			Tree.SetMatchedPatternAt(MethodDeclClass, TokenContext, "$MethodClass", Optional);
			Tree.SetMatchedPatternAt(MethodDeclName, TokenContext, "$MethodName", Required);
			Tree.SetMatchedTokenAt(NoWhere, TokenContext, "(", Required);
			var ParamBase = MethodDeclParam;
			while(!Tree.IsEmptyOrError() && !TokenContext.MatchToken(")")) :
				Tree.SetMatchedPatternAt(ParamBase + VarDeclType, TokenContext, "$Type", Required);
				Tree.SetMatchedPatternAt(ParamBase + VarDeclName, TokenContext, "$Symbol", Required);
				if(TokenContext.MatchToken("=")) :
					Tree.SetMatchedPatternAt(ParamBase + VarDeclValue, TokenContext, "$Expression", Required);
				
				ParamBase += 3;
			
			Tree.SetMatchedPatternAt(MethodDeclBlock, TokenContext, "$Block", Required);
			return Tree;
		
	
	// TypeVarDecl(Gamma, Tree, TypeInfo) :		
	// var VarType = Tree.GetTokenType(VarDeclTypeOffset, null);
	// var VarToken = Tree.GetAtToken(VarDeclNameOffset);
	// var VarName = Tree.GetTokenString(VarDeclNameOffset, null);
	// if(VarType.equals(Gamma.VarType)) :
	// return new ErrorNode(TypeInfo, VarToken, "cannot infer variable type");
	// 
	// assert (VarName != null);
	// Gamma.AppendLocalType(VarType, VarName);
	// var Value = Tree.TypeNodeAt(2, Gamma, VarType, 0);
	// return new LetNode(VarType, VarToken, Value, null);
	// 
	//
	// TypeMethodDecl(Gamma, Tree, TypeInfo) :
	// System.err.println("@@@@@ " + Tree);
	// var BaseType = Tree.GetTokenType(MethodDeclClass, null);
	// if(BaseType == null) :
	// BaseType = Tree.TreeNameSpace.GetGlobalObject().TypeInfo;
	// 
	// var MethodName = Tree.GetTokenString(MethodDeclName, "new");
	// var ParamSize = Tree.TreeList.size() - MethodDeclParam;
	// KonohaType[] ParamData = new KonohaType[ParamSize + 1];
	// String[] ArgNames = new String[ParamSize + 1];
	// ParamData[0] = Tree.GetTokenType(MethodDeclReturnType, Gamma.VarType);
	// for(var i = 0; i < ParamSize; i++) :
	// var ParamNode = (SyntaxTree) Tree.TreeList.get(MethodDeclParam + i);
	// var ParamType = ParamNode.GetTokenType(VarDeclType, Gamma.VarType);
	// ParamData[i + 1] = ParamType;
	// ArgNames[i] = ParamNode.GetTokenString(VarDeclName, "");
	// 
	// var Param = new KonohaParam(ParamSize + 1, ParamData, ArgNames);
	// var NewMethod = new KonohaMethod(
	// 0,
	// BaseType,
	// MethodName,
	// Param,
	// Tree.TreeNameSpace,
	// Tree.GetTokenList(MethodDeclBlock));
	// BaseType.DefineNewMethod(NewMethod);
	// return new DefineNode(TypeInfo, Tree.KeyToken, NewMethod);
	// 
	
	
	// ParseUNUSED(Pattern, LeftTree, TokenContext) :
	// P("** Syntax " + Tree.Pattern + " is undefined **");
	// return NoMatch;
	// 
	//
	// TypeUNUSED(Gamma, Tree, TypeInfo) :
	// P("** Syntax " + Tree.Pattern + " is undefined **");
	// return null;
	// 
	
		LoadDefaultSyntax(NameSpace) :
			// Types
			var KonohaContext = NameSpace.KonohaContext;
			NameSpace.DefineSymbol("void", KonohaContext.VoidType); // FIXME
			NameSpace.DefineSymbol("boolean", KonohaContext.BooleanType);
			NameSpace.DefineSymbol("Object", KonohaContext.ObjectType);
			NameSpace.DefineSymbol("int", KonohaContext.IntType);
			NameSpace.DefineSymbol("String", KonohaContext.StringType);
	
			// Constants
			NameSpace.DefineSymbol("true", new Boolean(true));
			NameSpace.DefineSymbol("false", new Boolean(false));
	
			NameSpace.DefineTokenFunc(" \t", function(this, "WhiteSpaceToken"));
			NameSpace.DefineTokenFunc("\n", function(this, "IndentToken"));
			NameSpace.DefineTokenFunc("():[]<>,;+-*/%=&|!", function(this, "SingleSymbolToken"));
			NameSpace.DefineTokenFunc("Aa", function(this, "SymbolToken"));
			NameSpace.DefineTokenFunc(".", function(this, "MemberToken"));
			NameSpace.DefineTokenFunc("\"", function(this, "StringLiteralToken"));
			NameSpace.DefineTokenFunc("1", function(this, "NumberLiteralToken"));
	
			var ParseUniary = function(this, "ParseUniary");
			var ParseBinary = function(this, "ParseBinary");
			var TypeApply = function(this, "TypeApply");
	
			NameSpace.DefineSyntaxPattern("+", ParseUniary, TypeApply);
			NameSpace.DefineSyntaxPattern("-", ParseUniary, TypeApply);
			NameSpace.DefineSyntaxPattern("!", ParseUniary, TypeApply);
			
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
	
			NameSpace.DefineExtendedPattern("=", BinaryOperator | Precedence_CStyleAssign | LeftJoin, ParseBinary, function(this, "TypeAssign"));
	
			NameSpace.DefineExtendedPattern("&&", BinaryOperator | Precedence_CStyleAND, ParseBinary, function(this, "TypeAnd"));
			NameSpace.DefineExtendedPattern("||", BinaryOperator | Precedence_CStyleOR, ParseBinary, function(this, "TypeOr"));
			
			//NameSpace.DefineSyntaxPattern(";", Precedence_CStyleDelim, this, null, null);
			//NameSpace.DefineSyntaxPattern("$Const", Term, this, "Const");
			//NameSpace.DefineSyntaxPattern("$Symbol", Term, this, "Symbol");
			//NameSpace.DefineSyntaxPattern("$Symbol", Term, this, "MethodCall");
	
			//NameSpace.DefineSyntaxPattern("$MethodCall", Precedence_CStyleSuffixCall, this, "MethodCall");
			//NameSpace.DefineSyntaxPattern("$Member", Precedence_CStyleSuffixCall, this, "Member");
			//NameSpace.DefineSyntaxPattern("$New", Term, this, "New");
	
			//NameSpace.DefineSyntaxPattern("()", Term | Precedence_CStyleSuffixCall, this, "UNUSED");
			//NameSpace.DefineSyntaxPattern(":", 0, this, "UNUSED");
			var TypeConst = function(this, "TypeConst");
			
			NameSpace.DefineSyntaxPattern("$Symbol", function(this, "ParseSymbol"), function(this, "TypeVariable"));
			NameSpace.DefineSyntaxPattern("$Type", function(this, "ParseType"), TypeConst);
			
			NameSpace.DefineSyntaxPattern("$Const", function(this, "ParseConst"), function(this, "TypeSymbol"));
			NameSpace.DefineSyntaxPattern("$StringLiteral", function(this, "ParseStringLiteral"), TypeConst);
			NameSpace.DefineSyntaxPattern("$IntegerLiteral", function(this, "ParseIntegerLiteral"), TypeConst);
	
			NameSpace.DefineSyntaxPattern("(", function(this, "ParseParenthesis"), null);
	
			NameSpace.DefineSyntaxPattern(":", function(this, "ParseBlock"), function(this, "TypeBlock"));
			
			NameSpace.DefineSyntaxPattern("$Symbol", function(this, "ParseMethodDecl"), function(this, "TypeMethodDecl"));
			NameSpace.DefineSyntaxPattern("$Symbol", function(this, "ParseVarDecl"), function(this, "TypeVarDecl"));
	
			NameSpace.DefineSyntaxPattern("if", function(this, "ParseIf"), function(this, "TypeIf"));
			NameSpace.DefineSyntaxPattern("return", function(this, "ParseReturn"), function(this, "ParseReturn"));
	
			// Library
			new KonohaInt().MakeDefinition(NameSpace);
			new KonohaStringDef().MakeDefinition(NameSpace);
			new KonohaSystemDef().MakeDefinition(NameSpace);
		
	
	
	
	class KonohaInt :
	
		MakeDefinition(ns) :
	// var BaseClass = ns.LookupHostLangType(Integer.class);
	// var BinaryParam = KonohaParam.ParseOf(ns, "number x");
	// var UniaryParam = KonohaParam.ParseOf(ns, "int");
	//
	// BaseClass.DefineMethod(ImmutableMethod | ConstMethod, "+", UniaryParam, this, "PlusInt");
	// BaseClass.DefineMethod(ImmutableMethod | ConstMethod, "+", BinaryParam, this, "IntAddInt");
	// BaseClass.DefineMethod(ImmutableMethod | ConstMethod, "-", UniaryParam, this, "MinusInt");
	// BaseClass.DefineMethod(ImmutableMethod | ConstMethod, "-", BinaryParam, this, "IntSubInt");
	// BaseClass.DefineMethod(ImmutableMethod | ConstMethod, "*", BinaryParam, this, "IntMulInt");
	// BaseClass.DefineMethod(ImmutableMethod | ConstMethod, "/", BinaryParam, this, "IntDivInt");
	// BaseClass.DefineMethod(ImmutableMethod | ConstMethod, "%", BinaryParam, this, "IntModInt");
	//
	// var RelationParam = KonohaParam.ParseOf(ns, "number x");
	// BaseClass.DefineMethod(ImmutableMethod | ConstMethod, "<", RelationParam, this, "IntLtInt");
	// BaseClass.DefineMethod(ImmutableMethod | ConstMethod, "<=", RelationParam, this, "IntLeInt");
	// BaseClass.DefineMethod(ImmutableMethod | ConstMethod, ">", RelationParam, this, "IntGtInt");
	// BaseClass.DefineMethod(ImmutableMethod | ConstMethod, ">=", RelationParam, this, "IntGeInt");
	// BaseClass.DefineMethod(ImmutableMethod | ConstMethod, "==", RelationParam, this, "IntEqInt");
	// BaseClass.DefineMethod(ImmutableMethod | ConstMethod, "!=", RelationParam, this, "IntNeInt");
	//
	// // if(KonohaDebug.UseBuiltInTest) :
	// // assert (BaseClass.LookupMethod("+", 0) != null);
	// // assert (BaseClass.LookupMethod("+", 1) != null);
	// // assert (BaseClass.LookupMethod("+", 2) == null);
	// // var m = BaseClass.LookupMethod("+", 1);
	// // Object[] p = new Object[2];
	// // p[0] = new Integer(1);
	// // p[1] = new Integer(2);
	// // println("******* 1+2=" + m.Eval(p));
	// // 
		
	
		function PlusInt(x) :
			return +x;
		
	
		function IntAddInt(x, y) :
			return x + y;
		
	
		function MinusInt(x) :
			return -x;
		
	
		function IntSubInt(x, y) :
			return x - y;
		
	
		function IntMulInt(x, y) :
			return x * y;
		
	
		function IntDivInt(x, y) :
			return x / y;
		
	
		function IntModInt(x, y) :
			return x % y;
		
	
		function IntLtInt(x, y) :
			return x < y;
		
	
		function IntLeInt(x, y) :
			return x <= y;
		
	
		function IntGtInt(x, y) :
			return x > y;
		
	
		function IntGeInt(x, y) :
			return x >= y;
		
	
		function IntEqInt(x, y) :
			return x == y;
		
	
		function IntNeInt(x, y) :
			return x != y;
		
	
	
	class KonohaStringDef :
	
		MakeDefinition(ns) :
	// var BaseClass = ns.LookupHostLangType(String.class);
	// var BinaryParam = KonohaParam.ParseOf(ns, "String x");
	// BaseClass.DefineMethod(ImmutableMethod | ConstMethod, "+", BinaryParam, this, "StringAddString");
	//
	// var RelationParam = KonohaParam.ParseOf(ns, "String x");
	// BaseClass.DefineMethod(ImmutableMethod | ConstMethod, "==", RelationParam, this, "StringEqString");
	// BaseClass.DefineMethod(ImmutableMethod | ConstMethod, "!=", RelationParam, this, "StringNeString");
	//
	// var indexOfParam = KonohaParam.ParseOf(ns, "String x");
	// BaseClass.DefineMethod(ImmutableMethod | ConstMethod, "indexOf", indexOfParam, this, "StringIndexOf");
	//
	// var getSizeParam = KonohaParam.ParseOf(ns, "int");
	// BaseClass.DefineMethod(ImmutableMethod | ConstMethod, "getSize", getSizeParam, this, "StringGetSize");
		
	
		function StringAddString(x, y) :
			return x + y;
		
	
		function StringEqString(x, y) :
			return x.equals(y);
		
	
		function StringNeString(x, y) :
			return !x.equals(y);
		
	
		function StringIndexOf(self, str) :
			return self.indexOf(str);
		
	
		function StringGetSize(self) :
			return self.length();
		
	
	
	class KonohaSystemDef :
	
		MakeDefinition(NameSpace) :
	// var BaseClass = NameSpace.LookupHostLangType(KonohaSystemDef.class);
	// NameSpace.DefineSymbol("System", BaseClass);
	//
	// var param1 = KonohaParam.ParseOf(NameSpace, "void x");
	// BaseClass.DefineMethod(StaticMethod, "p", param1, this, "p");
		
	
		function p(x) :
			println(x);
		
	
	
	
	//class any[]Def :
	//
	// MakeDefinition(ns) :
	// //int[] only
	// var BaseClass = ns.LookupHostLangType(int[].class);
	// var GetterParam = KonohaParam.ParseOf(ns, "number i");
	// BaseClass.DefineMethod(ImmutableMethod, "get", GetterParam, this, "ArrayGetter");
	// var SetterParam = KonohaParam.ParseOf(ns, "void i v");
	// BaseClass.DefineMethod(0, "set", SetterParam, this, "ArraySetter");
	// var GetSizeParam = KonohaParam.ParseOf(ns, "int");
	// BaseClass.DefineMethod(ImmutableMethod | ConstMethod, "getSize", GetSizeParam, this, "ArrayGetSize");
	// 
	//
	// function ArrayGetter(int[] a, i) :
	// return a[i];
	// 
	//
	// function ArraySetter(int[] a, i, v) :
	// a[i] = v;
	// 
	//
	// function ArrayGetSize(int[] a) :
	// return a.length;
	// 
	//
	
	class KonohaContext :
	
		RootNameSpace;
		DefaultNameSpace;
	
		VoidType;
		NativeObjectType;
		ObjectType;
		BooleanType;
		IntType;
		StringType;
		VarType;
	
		ClassNameMap;
	
		KonohaContext(Grammar, BuilderClassName) :
			this.ClassNameMap = :;
			this.RootNameSpace = new KonohaNameSpace(this, null);
			this.VoidType = this.LookupHostLangType(Void.class);
			this.NativeObjectType = this.LookupHostLangType(Object.class);
			this.ObjectType = this.LookupHostLangType(Object.class);
			this.BooleanType = this.LookupHostLangType(Boolean.class);
			this.IntType = this.LookupHostLangType(Integer.class);
			this.StringType = this.LookupHostLangType(String.class);
			this.VarType = this.LookupHostLangType(Object.class);
	
			Grammar.LoadDefaultSyntax(this.RootNameSpace);
			this.DefaultNameSpace = new KonohaNameSpace(this, this.RootNameSpace);
			if(BuilderClassName != null) :
				this.DefaultNameSpace.LoadBuilder(BuilderClassName);
			
		
	
		LookupHostLangType(Class<?> ClassInfo) :
			var TypeInfo = (KonohaType) this.ClassNameMap.get(ClassInfo.getName());
			if(TypeInfo == null) :
				TypeInfo = new KonohaType(this, ClassInfo);
				this.ClassNameMap.put(ClassInfo.getName(), TypeInfo);
			
			return TypeInfo;
		
	
		Define(Symbol, Value) :
			this.RootNameSpace.DefineSymbol(Symbol, Value);
		
	
		Eval(text, FileLine) :
			return this.DefaultNameSpace.Eval(text, FileLine);
		
	
		function main(String[] argc) :
			var KonohaContext = new KonohaContext(new KonohaGrammar(), null);
			//KonohaContext.Eval("f(a, b) : return a + b; ", 0);
			KonohaContext.Eval("1 + 2 * 3", 0);
	
		
	
	
	
	class GreenTeaScript :
	
	
}
