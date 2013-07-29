module GreenScript {	
	
	// utils
	
	interface KonohaConst {
	
		// ClassFlag
		var PrivateClass :number = 1 << 0;
		var SingletonClass :number = 1 << 1;
		var FinalClass :number = 1 << 2;
		var KonohaClass :number = 1 << 3;
		var StaticClass :number = 1 << 4;
		var ImmutableClass :number = 1 << 5;
		var InterfaceClass :number = 1 << 6;
	
		// MethodFlag
		var PrivateMethod :number = 1 << 0;
		var VirtualMethod :number = 1 << 1;
		var FinalMethod :number = 1 << 2;
		var ConstMethod :number = 1 << 3;
		var StaticMethod :number = 1 << 4;
		var ImmutableMethod :number = 1 << 5;
		var TopLevelMethod :number = 1 << 6;
	
		// call rule
		var CoercionMethod :number = 1 << 7;
		var RestrictedMethod :number = 1 << 8;
		var UncheckedMethod :number = 1 << 9;
		var SmartReturnMethod :number = 1 << 10;
		var VariadicMethod :number = 1 << 11;
		var IterativeMethod :number = 1 << 12;
	
		// compatible
		var UniversalMethod :number = 1 << 13;
	
		// internal
		var HiddenMethod :number = 1 << 17;
		var AbstractMethod :number = 1 << 18;
		var OverloadedMethod :number = 1 << 19;
		var Override :number = 1 << 20;
		var DynamicCall :number = 1 << 22;
	
		
		var SymbolMaskSize :number = 3;
		var LowerSymbolMask :number = 1;
		var GetterSymbolMask :number = (1 << 1);
		var SetterSymbolMask :number = (1 << 2);
		var MetaSymbolMask :number = (GetterSymbolMask | SetterSymbolMask);
		var GetterPrefix :string = "Get";
		var SetterPrefix :string = "Set";
		var MetaPrefix :string = "\\";
	
		var AllowNewId :number = -1;
		var NoMatch :number = -1;
		var BreakPreProcess :number = -1;
	
		var Optional :boolean = true;
		var Required :boolean = false;
	
		var ErrorLevel :number = 0;
		var WarningLevel :number = 1;
		var InfoLevel :number = 2;
	
		var KonohaCharMaxSize :number = 41;
		
		var NullToken :KonohaToken = new KonohaToken("", 0);
	
		// TokenFlag
		var SourceTokenFlag :number = 1;
		var ErrorTokenFlag :number = (1 << 1);
		var IndentTokenFlag :number = (1 << 2);
		var WhiteSpaceTokenFlag :number = (1 << 3);
		var DelimTokenFlag :number = (1 << 4);
		
		// ParseFlag
		var TrackbackParseFlag :number = 1;
		var SkipIndentParseFlag :number = (1 << 1);
		
	
		// SyntaxTree
		var NoWhere :number = -1;
		// UniaryTree, SuffixTree
		var UniaryTerm :number = 0;
		// BinaryTree
		var LeftHandTerm :number = 0;
		var RightHandTerm :number = 1;
	
		// IfStmt
		var IfCond :number = 0;
		var IfThen :number = 1;
		var IfElse :number = 2;
	
		// ReturnStmt
		var ReturnExpr :number = 0;
	
		// var N = 1;
		var VarDeclType :number = 0;
		var VarDeclName :number = 1;
		var VarDeclValue :number = 2;
		var VarDeclScope :number = 3;
	
		// Decl :Method;
		var MethodDeclReturnType :number = 0;
		var MethodDeclClass :number = 1;
		var MethodDeclName :number = 2;
		var MethodDeclBlock :number = 3;
		var MethodDeclParam :number = 4;
	
		// spec 
		var TokenFuncSpec :number = 0;
		var SymbolPatternSpec :number = 1;
		var ExtendedPatternSpec :number = 2;
	
	// var Term :number = 1;
	// var UniaryOperator :number = 1; /* same as for :Term readability */
	// var Statement :number = 1; /* same as for :Term readability */
		var BinaryOperator :number = 1 << 1;
	// var SuffixOperator :number = 1 << 2;
		var LeftJoin :number = 1 << 3;
	// var MetaPattern :number = 1 << 4;
		var PrecedenceShift :number = 5;
		var Precedence_CStyleValue :number = (1 << PrecedenceShift);
		var Precedence_CPPStyleScope :number = (50 << PrecedenceShift);
		var Precedence_CStyleSuffixCall :number = (100 << PrecedenceShift); /*x(); x[]; x.x x->x x++ */
		var Precedence_CStylePrefixOperator :number = (200 << PrecedenceShift); /*++x; --x; sizeof x &x +x -x !x <>x */
		// Precedence_CppMember = 300; /* .x ->x */
		var Precedence_CStyleMUL :number = (400 << PrecedenceShift); /* x * x; x / x; x % x*/
		var Precedence_CStyleADD :number = (500 << PrecedenceShift); /* x + x; x - x */
		var Precedence_CStyleSHIFT :number = (600 << PrecedenceShift); /* x << x; x >> x */
		var Precedence_CStyleCOMPARE :number = (700 << PrecedenceShift);
		var Precedence_CStyleEquals :number = (800 << PrecedenceShift);
		var Precedence_CStyleBITAND :number = (900 << PrecedenceShift);
		var Precedence_CStyleBITXOR :number = (1000 << PrecedenceShift);
		var Precedence_CStyleBITOR :number = (1100 << PrecedenceShift);
		var Precedence_CStyleAND :number = (1200 << PrecedenceShift);
		var Precedence_CStyleOR :number = (1300 << PrecedenceShift);
		var Precedence_CStyleTRINARY :number = (1400 << PrecedenceShift); /* ? : */
		var Precedence_CStyleAssign :number = (1500 << PrecedenceShift);
		var Precedence_CStyleCOMMA :number = (1600 << PrecedenceShift);
		var Precedence_Error :number = (1700 << PrecedenceShift);
		var Precedence_Statement :number = (1900 << PrecedenceShift);
		var Precedence_CStyleDelim :number = (2000 << PrecedenceShift);
	
		
		var DefaultTypeCheckPolicy :number = 0;
		var IgnoreEmptyPolicy :number = 1;
		var AllowEmptyPolicy :number = (1 << 1);
	
		//typedef enum {
		// TypeCheckPolicy_NoPolicy = 0,
		// TypeCheckPolicy_NoCheck = (1 << 0),
		// TypeCheckPolicy_AllowVoid = (1 << 1),
		// TypeCheckPolicy_Coercion = (1 << 2),
		// TypeCheckPolicy_AllowEmpty = (1 << 3),
		// TypeCheckPolicy_CONST = (1 << 4), /* Reserved */
		// TypeCheckPolicy_Creation = (1 << 6) /* TypeCheckNodeByName */
		//} TypeCheckPolicy;
	
		var GlobalConstName :string = "global";
	
		
		var EmptyList :KonohaArray = new KonohaArray();
	
	
		// debug flags
		var UseBuiltInTest :boolean = true;
		var DebugPrnumber :boolean = false;
	
	}
	
	class KonohaStatic {
	
		function println(msg :string) :void {
			System.out.println(msg);		
		}
		
		function P(msg :string) :void {
			println("DEBUG: " + msg);
		}
	
		function TODO(msg :string) :void {
			println("TODO: " + msg);
		}
	
		function ListSize(a :KonohaArray) :number {
			return (a == null) ? 0 : a.size();
		}
		
		function IsFlag(flag :number, flag2 :number) :boolean {
			return ((flag & flag2) == flag2);
		}
		
		function IsWhitespace(char ch) :boolean {
			return Character.isWhitespace(ch);
		}
		
		function IsLetter(char ch) :boolean {
			return Character.isLetter(ch);
		}
		
		function IsDigit(char ch) :boolean {
			return Character.isDigit(ch);
		}
		
		function LookupMethod(Callee :Object, MethodName :string) :Method {
			if(MethodName != null) {
				// KonohaDebug.P("looking up method : " + Callee.getClass().getSimpleName() + "." + MethodName);
				Method[] methods = Callee.getClass().getMethods();
				for(var i :number = 0; i < methods.length; i++) {
					if(MethodName.equals(methods[i].getName())) {
						return methods[i];
					}
				}
				P("method not found: " + Callee.getClass().getSimpleName() + "." + MethodName);
			}
			return null; /*throw new KonohaParserException("method not found: " + callee.getClass().getName() + "." + methodName);*/
		}
	
		function function(Callee :Object, MethodName :string) :KonohaFunc {
			return new KonohaFunc(Callee, LookupMethod(Callee, MethodName));
		}
	
		function EqualsMethod(m1 :Method, m2 :Method) :boolean {
			if(m1 == null) {
				return (m2 == null) ? true : false;
			} else {
				return (m2 == null) ? false : m1.equals(m2);
			}
		}
		
		function CreateOrReuseTokenFunc(f :KonohaFunc, prev :TokenFunc) :TokenFunc {
			if(prev != null && EqualsMethod(prev.Func.Method, f.Method)) {
				return prev;
			}
			return new TokenFunc(f, prev);
		}
	
		function ApplyTokenFunc(TokenFunc :TokenFunc, TokenContext :TokenContext, ScriptSource :string, Pos :number) :number {
			try {
				while(TokenFunc != null) {
					var f :KonohaFunc = TokenFunc.Func;
					var NextIdx :number = ((Integer)f.Method.invoke(f.Self, TokenContext, ScriptSource, Pos)).intValue();
					if(NextIdx > Pos) return NextIdx;
					TokenFunc = TokenFunc.ParentFunc;
				}
				return NoMatch;
			}
			catch (e :IllegalArgumentException) {
				e.printStackTrace();
			}
			catch (e :IllegalAccessException) {
				e.printStackTrace();
			}
			catch (e :InvocationTargetException) {
				e.printStackTrace();
			}
			return NoMatch;
		}
	
		function MergeSyntaxPattern(Pattern :SyntaxPattern, Parent :SyntaxPattern) :SyntaxPattern {
			if(Parent == null) return Pattern;
			var MergedPattern :SyntaxPattern = new SyntaxPattern(Pattern.PackageNameSpace, Pattern.PatternName, Pattern.MatchFunc, Pattern.TypeFunc);
			MergedPattern.ParentPattern = Parent;
			return MergedPattern;
		}
	
		function IsEmptyOrError(Tree :SyntaxTree) :boolean {
			return Tree == null || Tree.IsEmptyOrError();
		}
	
		function TreeHead(Tree :SyntaxTree) :SyntaxTree {
			if(Tree != null) {
				while(Tree.PrevTree != null) {
					Tree = Tree.PrevTree;
				}
			}
			return Tree;
		}
		
		function ApplySyntaxPattern(Pattern :SyntaxPattern, LeftTree :SyntaxTree, TokenContext :TokenContext) :SyntaxTree {
			var Pos :number = TokenContext.Pos;
			try {
				var ParseFlag :number = TokenContext.ParseFlag;
				var CurrentPattern :SyntaxPattern = Pattern;
				while(CurrentPattern != null) {
					var f :KonohaFunc = Pattern.MatchFunc;
					TokenContext.Pos = Pos;
					if(CurrentPattern.ParentPattern != null) {
						TokenContext.ParseFlag = ParseFlag | TrackbackParseFlag;
					}
					P("B ApplySyntaxPattern: " + CurrentPattern + " > " + CurrentPattern.ParentPattern);
					var ParsedTree :SyntaxTree = (SyntaxTree)f.Method.invoke(f.Self, CurrentPattern, LeftTree, TokenContext);
					if(ParsedTree != null && ParsedTree.IsEmpty()) ParsedTree = null;
					P("E ApplySyntaxPattern: " + CurrentPattern + " => " + ParsedTree);
					TokenContext.ParseFlag = ParseFlag;
					if(ParsedTree != null) {
						return ParsedTree;
					}
					CurrentPattern = CurrentPattern.ParentPattern;
				}
			}
			catch (e :IllegalArgumentException) {
				e.printStackTrace();
			}
			catch (e :IllegalAccessException) {
				e.printStackTrace();
			}
			catch (e :InvocationTargetException) {
				e.printStackTrace();
			}
			if(TokenContext.IsAllowedTrackback()) {
				TokenContext.Pos = Pos;
			}
			if(Pattern == null) {
				P("undefined syntax pattern: " + Pattern);
			}
			return TokenContext.ReportExpectedPattern(Pattern);
		}
	
		function ParseSyntaxTree(PrevTree :SyntaxTree, TokenContext :TokenContext) :SyntaxTree {
			var Pattern :SyntaxPattern = TokenContext.GetFirstPattern();
			var LeftTree :SyntaxTree = ApplySyntaxPattern(Pattern, PrevTree, TokenContext);
			while (!IsEmptyOrError(LeftTree)) {
				var ExtendedPattern :SyntaxPattern = TokenContext.GetExtendedPattern();
				if(ExtendedPattern == null) {
					P("In $ending :Expression: " + TokenContext.GetToken());
					break;
				}
				LeftTree = ApplySyntaxPattern(ExtendedPattern, LeftTree, TokenContext);			
			}
			return LeftTree;
		}
	
		// typing 
		function ApplyTypeFunc(TypeFunc :KonohaFunc, Gamma :TypeEnv, ParsedTree :SyntaxTree, TypeInfo :KonohaType) :TypedNode {
			try {
				return (TypedNode)TypeFunc.Method.invoke(TypeFunc.Self, Gamma, ParsedTree, TypeInfo);
			}
			catch (e :IllegalArgumentException) {
				e.printStackTrace();
			}
			catch (e :IllegalAccessException) {
				e.printStackTrace();
			}
			catch (e :InvocationTargetException) {
				e.printStackTrace();
			}
			//Node = Gamma.NewErrorNode(Tree.KeyToken, "internal error: " + e + "\n\t" + e.getCause().toString());
			return null;
		}
		
	}
	
	class KonohaArray {
		ArrayList<Object> List;
	
		KonohaArray() {
			this.List = new ArrayList<Object>();
		}
	
		KonohaArray(DefaultSize :number) {
			this.List = new ArrayList<Object>(DefaultSize);
		}
	
		size() :number {
			return this.List.size();
		}
	
		add(Value :Object) :void {
			this.List.add(Value);
		}
	
		get(index :number) :Object {
			return this.List.get(index);
		}
	
		set(index :number, Value :Object) :void {
			this.List.set(index, Value);
		}
	
		remove(index :number) :Object {
			return this.List.remove(index);
		}
	
		pop() :Object {
			return List.remove(List.size() - 1);
		}
	
		clear() :void {
			this.List.clear();
		}
	
		 toString() :string {
			return List.toString();
		}
	}
	
	class KonohaMap {
		HashMap<String, Object> Map;
	
		KonohaMap() {
			this.Map = new HashMap<String, Object>();
		}
	
		size() :number {
			return this.Map.size();
		}
	
		put(Key :string, Value :Object) :void {
			this.Map.put(Key, Value);
		}
	
		get(Key :string) :Object {
			return this.Map.get(Key);
		}
	
	// String[] keys() {
	// Iterator<String> itr = this.Map.keySet().iterator();
	// String[] List = new String[this.Map.size()];
	// var i :number = 0;
	// while(itr.hasNext()) {
	// List[i] = itr.next();
	// i = i + 1;
	// }
	// return List;
	// }
	
	}
	
	class KonohaFunc {
		Self :Object;
		Method :Method;
	
		KonohaFunc(Self :Object, method :Method) {
			this.Self = Self;
			this.Method = method;
		}
	
		function EqualsMethod(m1 :Method, m2 :Method) :boolean {
			if(m1 == null) {
				return (m2 == null) ? true : false;
			} else {
				return (m2 == null) ? false : m1.equals(m2);
			}
		}
	
		 toString() :string {
			return this.Method.toString();
		}
	
	}
	
	// tokenizer
	
	class KonohaChar {
		var Null :number = 0;
		var Undefined :number = 1;
		var Digit :number = 2;
		var UpperAlpha :number = 3;
		var LowerAlpha :number = 4;
		var Unicode :number = 5;
		var NewLine :number = 6;
		var Tab :number = 7;
		var Space :number = 8;
		var OpenParenthesis :number = 9;
		var CloseParenthesis :number = 10;
		var OpenBracket :number = 11;
		var CloseBracket :number = 12;
		var OpenBrace :number = 13;
		var CloseBrace :number = 14;
		var LessThan :number = 15;
		var GreaterThan :number = 16;
		var Quote :number = 17;
		var DoubleQuote :number = 18;
		var BackQuote :number = 19;
		var Surprised :number = 20;
		var Sharp :number = 21;
		var Dollar :number = 22;
		var Percent :number = 23;
		var And :number = 24;
		var Star :number = 25;
		var Plus :number = 26;
		var Comma :number = 27;
		var Minus :number = 28;
		var Dot :number = 29;
		var Slash :number = 30;
		var Colon :number = 31;
		var SemiColon :number = 32;
		var Equal :number = 33;
		var Question :number = 34;
		var AtMark :number = 35;
		var Var :number = 36;
		var Childer :number = 37;
		var BackSlash :number = 38;
		var Hat :number = 39;
		var UnderBar :number = 40;
		var MAX :number = 41;
	
		CharMatrix :number[] = { 0/*nul*/, 1/*soh*/, 1/*stx*/, 1/*etx*/, 1/*eot*/, 1/*enq*/,
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
				/*170 x   171 y   172 z   173 {   174 |   175 }   176 ~   177 del*/
				LowerAlpha, LowerAlpha, LowerAlpha, OpenBrace, Var, CloseBrace, Childer, 1, };
	
		function FromJavaChar(char c) :number {
			if(c < 128) {
				return CharMatrix[c];
			}
			return Unicode;
		}
	}
	
	
	class KonohaToken {
		TokenFlag :number;
		ParsedText :string;
		FileLine :number;
		PresetPattern :SyntaxPattern;
	
		constructor(text :string, FileLine :number) {
			this.ParsedText = text;
			this.FileLine = FileLine;
			this.PresetPattern = null;
		}
	
		IsSource() :boolean {
			return IsFlag(this.TokenFlag, SourceTokenFlag);
		}
		
		IsError() :boolean {
			return IsFlag(this.TokenFlag, ErrorTokenFlag);
		}
	
		IsIndent() :boolean {
			return IsFlag(this.TokenFlag, IndentTokenFlag);
		}
	
		IsDelim() :boolean {
			return IsFlag(this.TokenFlag, DelimTokenFlag);
		}
	
		EqualsText(text :string) :boolean {
			return this.ParsedText.equals(text);
		}
	
		 toString() :string {
			var TokenText :string = "";
			if(this.PresetPattern != null) {
				TokenText = "(" + this.PresetPattern.PatternName + ") ";
			}
			return TokenText + this.ParsedText;
		}
	
		ToErrorToken(Message :string) :string {
			this.TokenFlag = ErrorTokenFlag;
			this.ParsedText = Message;
			return Message;
		}
	
		GetErrorMessage() :string {
			assert(this.IsError());
			return this.ParsedText;
		}
	
	}
	
	class TokenFunc {
		Func :KonohaFunc;
		ParentFunc :TokenFunc;
	
		TokenFunc(Func :KonohaFunc, prev :TokenFunc) {
			this.Func = Func;
			this.ParentFunc = prev;
		}
	
		Duplicate() :TokenFunc {
			if(this.ParentFunc == null) {
				return new TokenFunc(this.Func, null);
			} else {
				return new TokenFunc(this.Func, this.ParentFunc.Duplicate());
			}
		}
	
		 toString() :string {
			return this.Func.Method.toString();
		}
	
	}
	
	class TokenContext {
		NameSpace :KonohaNameSpace;
		SourceList :KonohaArray;
		Pos :number;
		ParsingLine :number;
		ParseFlag :number;
	
		constructor(NameSpace :KonohaNameSpace, Text :string, FileLine :number) {
			this.NameSpace = NameSpace;
			this.SourceList = new KonohaArray();
			this.Pos = 0;
			this.ParsingLine = FileLine;
			this.ParseFlag = 0;
			AddNewToken(Text, SourceTokenFlag, null);
		}
	
		AddNewToken(Text :string, TokenFlag :number, PatternName :string) :KonohaToken {
			var Token :KonohaToken = new KonohaToken(Text, this.ParsingLine);
			Token.TokenFlag |= TokenFlag;
			if(PatternName != null) {
				Token.PresetPattern = this.NameSpace.GetPattern(PatternName);
				assert(Token.PresetPattern != null);
			}
			this.SourceList.add(Token);
			return Token;
		}
	
		FoundWhiteSpace() :void {
			var Token :KonohaToken = GetToken();
			Token.TokenFlag |= WhiteSpaceTokenFlag;
		}
		
		FoundLineFeed(line :number) :void {
			this.ParsingLine += line;
		}
	
		ReportTokenError(Level :number, Message :string, TokenText :string) :void {
			var Token :KonohaToken = this.AddNewToken(TokenText, 0, "$ErrorToken");
			this.NameSpace.ReportError(Level, Token, Message);
		}
		
		NewErrorSyntaxTree(Token :KonohaToken, Message :string) :SyntaxTree {
			if(!IsAllowedTrackback()) {
				this.NameSpace.ReportError(ErrorLevel, Token, Message);
				var ErrorTree :SyntaxTree = new SyntaxTree(Token.PresetPattern, this.NameSpace, Token);
				return ErrorTree;
			}
			return null;
		}
		
		GetBeforeToken() :KonohaToken {
			for(var pos :number = this.Pos - 1; pos >= 0; pos--) {
				var Token :KonohaToken = (KonohaToken)this.SourceList.get(pos);
				if(IsFlag(Token.TokenFlag, IndentTokenFlag)) {
					continue;
				}
				return Token;
			}
			return null;
		}
	
		ReportExpectedToken(TokenText :string) :SyntaxTree {
			if(!IsAllowedTrackback()) {
				var Token :KonohaToken = GetBeforeToken();
				if(Token != null) {
					return NewErrorSyntaxTree(Token, TokenText + " is expected after " + Token.ParsedText);
				}
				Token = GetToken();
				assert(Token != NullToken);
				return NewErrorSyntaxTree(Token, TokenText + " is expected at " + Token.ParsedText);
			}
			return null;
		}
	
		ReportExpectedPattern(Pattern :SyntaxPattern) :SyntaxTree {
			return ReportExpectedToken(Pattern.PatternName);
		}
		
		DispatchFunc(ScriptSource :string, KonohaChar :number, pos :number) :number {
			var TokenFunc :TokenFunc = this.NameSpace.GetTokenFunc(KonohaChar);
			var NextIdx :number = ApplyTokenFunc(TokenFunc, this, ScriptSource, pos);
			if(NextIdx == NoMatch) {
				P("undefined tokenizer: " + ScriptSource.charAt(pos));
				AddNewToken(ScriptSource.substring(pos), 0, null);
				return ScriptSource.length();
			}
			return NextIdx;
		}
	
		Tokenize(ScriptSource :string, CurrentLine :number) :void {
			var pos :number = 0, len = ScriptSource.length();
			this.ParsingLine = CurrentLine;
			while(pos < len) {
				var kchar :number = KonohaChar.FromJavaChar(ScriptSource.charAt(pos));
				var pos2 :number = DispatchFunc(ScriptSource, kchar, pos);
				if(!(pos < pos2)) {
					break;
				}
				pos = pos2;
			}
			Dump();
		}
	
		GetToken() :KonohaToken {
			while((this.< this.SourceList.size())) :Pos {
				var Token :KonohaToken = (KonohaToken)this.SourceList.get(this.Pos);
				if(Token.IsSource()) {
					this.SourceList.pop();
					Tokenize(Token.ParsedText, Token.FileLine);
					Token = (KonohaToken)this.SourceList.get(this.Pos);
				}
				if(IsFlag(this.ParseFlag, SkipIndentParseFlag) && Token.IsIndent()) {
					this.Pos += 1;
					continue;
				}
				return Token;
			}
			return NullToken;
		}
	
		HasNext() :boolean {
			return (GetToken() != NullToken);
		}
	
		Next() :KonohaToken {
			var Token :KonohaToken = GetToken();
			this.Pos += 1;
			return Token;
		}
	
		GetPattern(PatternName :string) :SyntaxPattern {
			return this.NameSpace.GetPattern(PatternName);
		}
	
		GetFirstPattern() :SyntaxPattern {
			var Token :KonohaToken = GetToken();
			if(Token.PresetPattern != null) {
				return Token.PresetPattern;
			}
			var Pattern :SyntaxPattern = this.NameSpace.GetPattern(Token.ParsedText);
			if(Pattern == null) {
				return this.NameSpace.GetPattern("$Symbol");
			}
			return Pattern;
		}
	
		GetExtendedPattern() :SyntaxPattern {
			var Token :KonohaToken = GetToken();
			var Pattern :SyntaxPattern = this.NameSpace.GetExtendedPattern(Token.ParsedText);
			return Pattern;		
		}
		
		MatchToken(TokenText :string) :boolean {
			var Token :KonohaToken = GetToken();
			if(Token.EqualsText(TokenText)) {
				this.Pos += 1;
				return true;
			}
			return false;
		}
	
		GetMatchedToken(TokenText :string) :KonohaToken {
			var Token :KonohaToken = GetToken();
			while(Token != NullToken) {
				this.Pos += 1;
				if(Token.EqualsText(TokenText)) {
					break;
				}
			}
			return Token;
		}
	
		IsAllowedTrackback() :boolean {
			return IsFlag(this.ParseFlag, TrackbackParseFlag);
		}
	
		ParsePattern(PatternName :string, IsOptional :boolean) :SyntaxTree {
			var Pos :number = this.Pos;
			var ParseFlag :number = this.ParseFlag;
			var Pattern :SyntaxPattern = this.GetPattern(PatternName);
			if(IsOptional) {
				this.ParseFlag |= TrackbackParseFlag;
			}
			var SyntaxTree :SyntaxTree = ApplySyntaxPattern(Pattern, null, this);
			this.ParseFlag = ParseFlag;
			if(SyntaxTree != null) {
				return SyntaxTree;
			}
			this.Pos = Pos;
			return null;
		}
		
		SkipEmptyStatement() :boolean {
			Token :KonohaToken;
			while((= GetToken()) != NullToken) :Token {
				if(Token.IsIndent() || Token.IsDelim()) {
					this.Pos += 1;
					continue;
				}
				break;
			}
			return (Token != NullToken);
		}
		
		Dump() :void {
			for(pos = this.; pos < this.SourceList.size(); pos++) :number :Pos {
				P("["+pos+"]\t" + this.SourceList.get(pos));
			}
		}
		
	}
	
	class SyntaxPattern {
	
		PackageNameSpace :KonohaNameSpace;
		PatternName :string;
		SyntaxFlag :number;
	
		MatchFunc :KonohaFunc;
		TypeFunc :KonohaFunc;
		ParentPattern :SyntaxPattern;
		
		 toString() :string {
			return this.PatternName + "<" + this.MatchFunc + ">";
		}
	
		IsBinaryOperator() :boolean {
			return ((this.SyntaxFlag & BinaryOperator) == BinaryOperator);
		}
	
		IsLeftJoin(Right :SyntaxPattern) :boolean {
			var left :number = this.SyntaxFlag >> PrecedenceShift, right = Right.SyntaxFlag >> PrecedenceShift;
			// System.err.printf("left=%d,%s, right=%d,%s\n", left, this.PatternName, right, Right.PatternName);
			return (left < right || (left == right && IsFlag(this.SyntaxFlag, LeftJoin) && IsFlag(Right.SyntaxFlag, LeftJoin)));
		}
	
		// Pop() :KSyntax { return ParentSyntax; }
	
		constructor(NameSpace :KonohaNameSpace, PatternName :string, MatchFunc :KonohaFunc, TypeFunc :KonohaFunc) {
			this.PackageNameSpace = NameSpace;
			this.PatternName = PatternName;
			this.SyntaxFlag = 0;
			this.MatchFunc = MatchFunc;
			this.TypeFunc = TypeFunc;
			this.ParentPattern = null;
		}
		
	}
	
	class SyntaxTree {
		ParentTree :SyntaxTree;
		PrevTree :SyntaxTree;
		NextTree :SyntaxTree;
	
		TreeNameSpace :KonohaNameSpace;
		Pattern :SyntaxPattern;
		KeyToken :KonohaToken;
		TreeList :KonohaArray;
	
		 toString() :string {
			var key :string = this.KeyToken.ParsedText + ":" + ((this.Pattern != null) ? this.Pattern.PatternName : "null");
			var sb :StringBuilder = new StringBuilder();
			sb.append("(");
			sb.append(key);
			if(this.TreeList != null) {
				for(i = 0; i < this.TreeList.size(); i++) :number {
					var o :Object = this.TreeList.get(i);
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
	
		SyntaxTree(Pattern :SyntaxPattern, NameSpace :KonohaNameSpace, KeyToken :KonohaToken) {
			this.TreeNameSpace = NameSpace;
			this.KeyToken = KeyToken;
			this.Pattern = Pattern;
			this.ParentTree = null;
			this.PrevTree = null;
			this.NextTree = null;
			this.TreeList = null;
		}
	
		LinkNode(Tree :SyntaxTree) :void {
			Tree.PrevTree = this;
			this.NextTree = Tree;
		}
		
		IsError() :boolean {
			return this.KeyToken.IsError();
		}
	
		ToError(Token :KonohaToken) :void {
			assert(Token.IsError());
			this.KeyToken = Token;
			this.TreeList = null;
		}
	
		IsEmpty() :boolean {
			return this.KeyToken == NullToken;
		}
	
		ToEmpty() :void {
			this.KeyToken = NullToken;
			this.TreeList = null;
			this.Pattern = this.TreeNameSpace.GetPattern("$Empty");
		}
		
		IsEmptyOrError() :boolean {
			return this.KeyToken == NullToken || this.KeyToken.IsError();
		}
		
		ToEmptyOrError(ErrorTree :SyntaxTree) :void {
			if(ErrorTree == null) {
				ToEmpty();
			}
			else {
				ToError(ErrorTree.KeyToken);
			}
		}
		
		SetAt(Index :number, Value :Object) :void {
			if(!IsEmpty()) {
				if(Index >= 0) {
					if(this.TreeList == null) {
						this.TreeList = new KonohaArray();
					}
					if(< this.TreeList.size()) :Index {
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
		
		GetSyntaxTreeAt(Index :number) :SyntaxTree {
			return (SyntaxTree) this.TreeList.get(Index);
		}
	
		SetSyntaxTreeAt(Index :number, Tree :SyntaxTree) :void {
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
		
		SetMatchedPatternAt(Index :number, TokenContext :TokenContext, PatternName :string, IsOptional :boolean) :void {
			if(!IsEmptyOrError()) {
				var ParsedTree :SyntaxTree = TokenContext.ParsePattern(PatternName, IsOptional);
				if(ParsedTree == null && !IsOptional) {
					ToEmpty();
				}
			}
		}
	
		SetMatchedTokenAt(Index :number, TokenContext :TokenContext, TokenText :string, IsOptional :boolean) :void {
			if(!IsEmptyOrError()) {
				var Pos :number = TokenContext.Pos;
				var Token :KonohaToken = TokenContext.Next();
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
	
		
		AppendParsedTree(Tree :SyntaxTree) :void {
			if(!IsError()) {
				if(Tree.IsError()) {
					ToError(Tree.KeyToken);
				}
				else {
					if(this.TreeList == null) {
						this.TreeList = new KonohaArray();
					}
					this.TreeList.add(Tree);
				}
			}
		}
	
		TypeNodeAt(Index :number, Gamma :TypeEnv, TypeInfo :KonohaType, TypeCheckPolicy :number) :TypedNode {
			if(this.!= null && Index < this.TreeList.size()) :TreeList {
				var NodeObject :Object = this.TreeList.get(Index);
				if(instanceof :NodeObject SyntaxTree) {
					var TypedNode :TypedNode = TypeEnv.TypeCheck(Gamma, (SyntaxTree) NodeObject, TypeInfo, TypeCheckPolicy);
					this.TreeList.set(Index, TypedNode);
					return TypedNode;
				}
			}
			return new ErrorNode(TypeInfo, this.KeyToken, "syntax tree error: " + Index);
		}
	
	}
	
	/* typing */
	
	class KonohaType {
		KonohaContext :KonohaContext;
		ClassFlag :number;
		ShortClassName :string;
		BaseClass :KonohaType;
		SuperClass :KonohaType;
		ClassParam :KonohaParam;
		SearchSimilarClass :KonohaType;
		ClassMethodList :KonohaArray;
		SearchSuperMethodClass :KonohaType;
		DefaultNullValue :Object;
		LocalSpec :Object;
	
		// Implementation :Java Only
		Class<?> HostedClassInfo = null;
	
		KonohaType(KonohaContext :KonohaContext, ClassFlag :number, ClassName :string, Spec :Object) {
			this.KonohaContext = KonohaContext;
			this.ClassFlag = ClassFlag;
			this.ShortClassName = ClassName;
			this.SuperClass = null;
			this.BaseClass = this;
			this.ClassMethodList = EmptyList;
			this.LocalSpec = Spec;
		}
	
		KonohaType(KonohaContext :KonohaContext, Class<?> ClassInfo) {
			this(KonohaContext, 0, ClassInfo.getSimpleName(), null);
			this.HostedClassInfo = ClassInfo;
			// this.ClassFlag = ClassFlag;
			Class<?> SuperClass = ClassInfo.getSuperclass();
			if(ClassInfo != Object.class && SuperClass != null) {
				this.SuperClass = KonohaContext.LookupHostLangType(ClassInfo.getSuperclass());
			}
		}
	
		
		toString() :string {
			return this.ShortClassName;
		}
	
		function ConvertMethod(KonohaContext :KonohaContext, Method :Method) :KonohaMethod {
			var ThisType :KonohaType = KonohaContext.LookupHostLangType(Method.getClass());
			Class<?>[] ParamTypes = Method.getParameterTypes();
			KonohaType[] ParamData = new KonohaType[ParamTypes.length + 1];
			String[] ArgNames = new String[ParamTypes.length + 1];
			ParamData[0] = KonohaContext.LookupHostLangType(Method.getReturnType());
			for(var i :number = 0; i < ParamTypes.length; i++) {
				ParamData[i + 1] = KonohaContext.LookupHostLangType(ParamTypes[i]);
				ArgNames[i] = "arg" + i;
			}
			var Param :KonohaParam = new KonohaParam(ParamData.length, ParamData, ArgNames);
			var Mtd :KonohaMethod = new KonohaMethod(0, ThisType, Method.getName(), Param, Method);
			ThisType.AddMethod(Mtd);
			return Mtd;
		}
	
		CreateMethods(MethodName :string) :number {
			var Count :number = 0;
			Method[] Methods = this.HostedClassInfo.getMethods();
			for(var i :number = 0; i < Methods.length; i++) {
				if(MethodName.equals(Methods[i].getName())) {
					KonohaType.ConvertMethod(this.KonohaContext, Methods[i]);
					Count = Count + 1;
				}
			}
			return Count;
		}
	
		Accept(TypeInfo :KonohaType) :boolean {
			if(this == TypeInfo) {
				return true;
			}
			return false;
		}
	
		AddMethod(Method :KonohaMethod) :void {
			if(this.ClassMethodList == EmptyList){
				this.ClassMethodList = new KonohaArray();
			}
			this.ClassMethodList.add(Method);
		}
	
		DefineMethod(MethodFlag :number, MethodName :string, Param :KonohaParam, Callee :Object, LocalName :string) :void {
			var Method :KonohaMethod = new KonohaMethod(MethodFlag, this, MethodName, Param, LookupMethod(Callee, LocalName));
			this.AddMethod(Method);
		}
	
		FindMethod(MethodName :string, ParamSize :number) :KonohaMethod {
			for(i = 0; i < this.ClassMethodList.size(); i++) :number {
				var Method :KonohaMethod = (KonohaMethod) this.ClassMethodList.get(i);
				if(Method.Match(MethodName, ParamSize)) {
					return Method;
				}
			}
			return null;
		}
	
		LookupMethod(MethodName :string, ParamSize :number) :KonohaMethod {
			var Method :KonohaMethod = this.FindMethod(MethodName, ParamSize);
			if(Method != null) {
				return Method;
			}
			if(this.SearchSuperMethodClass != null) {
				Method = this.SearchSuperMethodClass.LookupMethod(MethodName, ParamSize);
				if(Method != null) {
					return Method;
				}
			}
			if(this.HostedClassInfo != null) {
				if(this.CreateMethods(MethodName) > 0) {
					return this.FindMethod(MethodName, ParamSize);
				}
			}
			return null;
		}
	
		DefineNewMethod(NewMethod :KonohaMethod) :boolean {
			for(i = 0; i < this.ClassMethodList.size(); i++) :number {
				var DefinedMethod :KonohaMethod = (KonohaMethod) this.ClassMethodList.get(i);
				if(NewMethod.Match(DefinedMethod)) {
					return false;
				}
			}
			this.AddMethod(NewMethod);
			return true;
		}
	
		RegisterCompiledMethod(NewMethod :KonohaMethod) :boolean {
			for(i = 0; i < this.ClassMethodList.size(); i++) :number {
				var DefinedMethod :KonohaMethod = (KonohaMethod) this.ClassMethodList.get(i);
				if(NewMethod.Match(DefinedMethod)) {
					this.ClassMethodList.set(i, NewMethod);
					return true;
				}
			}
			return false;
		}
	
	}
	
	class KonohaSymbol {
	
		function IsGetterSymbol(SymbolId :number) :boolean {
			return (SymbolId & GetterSymbolMask) == GetterSymbolMask;
		}
	
		function ToSetterSymbol(SymbolId :number) :number {
			assert(IsGetterSymbol(SymbolId));
			return (SymbolId & (~GetterSymbolMask)) | SetterSymbolMask;
		}
	
		// SymbolTable
	
		var SymbolList :KonohaArray = new KonohaArray();
		var SymbolMap :KonohaMap = new KonohaMap();
	
		function MaskSymbol(SymbolId :number, Mask :number) :number {
			return (SymbolId << SymbolMaskSize) | Mask;
		}
	
		function UnmaskSymbol(SymbolId :number) :number {
			return SymbolId >> SymbolMaskSize;
		}
	
		function StringfySymbol(SymbolId :number) :string {
			var Key :string = (String)SymbolList.get(UnmaskSymbol(SymbolId));
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
	
		function GetSymbolId(Symbol :string, DefaultSymbolId :number) :number {
			var Key :string = Symbol;
			var Mask :number = 0;
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
			var SymbolObject :Integer = (Integer)SymbolMap.get(Key);
			if(SymbolObject == null) {
				if(DefaultSymbolId == AllowNewId) {
					var SymbolId :number = SymbolList.size();
					SymbolList.add(Key);
					SymbolMap.put(Key, new Integer(SymbolId));
					return MaskSymbol(SymbolId, Mask);
				}
				return DefaultSymbolId;
			}
			return MaskSymbol(SymbolObject.intValue(), Mask);
		}
	
		function GetSymbolId(Symbol :string) :number {
			return GetSymbolId(Symbol, AllowNewId);
		}
	
		function CanonicalSymbol(Symbol :string) :string {
			return Symbol.toLowerCase().replaceAll("_", "");
		}
	
		function GetCanonicalSymbolId(Symbol :string) :number {
			return GetSymbolId(CanonicalSymbol(Symbol), AllowNewId);
		}
	
	}
	
	class KonohaParam {
		var MAX :number = 16;
		var VariableParamSize :number = -1;
		ReturnSize :number;
		KonohaType[] Types;
		String[] ArgNames;
	
		KonohaParam(DataSize :number, ParamData :KonohaType[], String[] ArgNames) {
			this.ReturnSize = 1;
			this.Types = new KonohaType[DataSize];
			this.ArgNames = new String[DataSize - this.ReturnSize];
			System.arraycopy(ParamData, 0, this.Types, 0, DataSize);
			System.arraycopy(ArgNames, 0, this.ArgNames, 0, DataSize - this.ReturnSize);
		}
	
		function ParseOf(ns :KonohaNameSpace, TypeList :string) :KonohaParam {
			TODO("ParseOfParam");
	// var BufferList :Tokens = ns.Tokenize(TypeList, 0);
	// var next :number = BufferList.size();
	// ns.PreProcess(BufferList, 0, next, BufferList);
	// KonohaType[] ParamData = new KonohaType[KonohaParam.MAX];
	// String[] ArgNames = new String[KonohaParam.MAX];
	// i :number, DataSize = 0, ParamSize = 0;
	// for(i = next; i < BufferList.size(); i++) {
	// var Token :KonohaToken = BufferList.get(i);
	// if(Token.instanceof :ResolvedObject KonohaType) {
	// ParamData[DataSize] = (KonohaType) Token.ResolvedObject;
	// DataSize++;
	// if(DataSize == KonohaParam.MAX)
	// break;
	// } else {
	// ArgNames[ParamSize] = Token.ParsedText;
	// ParamSize++;
	// }
	// }
	// return new KonohaParam(DataSize, ParamData, ArgNames);
			return null;
		}
	
		GetParamSize() :number {
			return this.Types.length - this.ReturnSize;
		};
	
		Match(Other :KonohaParam) :boolean {
			var ParamSize :number = Other.GetParamSize();
			if(== this.GetParamSize()) :ParamSize {
				for(var i :number = this.ReturnSize; i < this.Types.length; i++) {
					if(this.Types[i] != Other.Types[i])
						return false;
				}
				return true;
			}
			return false;
		}
	
		// Accept(ParamSize :number, KClass[] Types) :boolean {
		// if(ParamTypes. == ParamSize) {
		// for(var i :number = 1; i < ParamSize; i++) {
		// if(!ParamTypes[i].Accept(Types[i])) return false;
		// }
		// return true;
		// }
		// return false;
		// }
		// return true;
		// }
	
	}
	
	class KonohaMethodInvoker {
		Param :KonohaParam;
		CompiledCode :Object;
	
		KonohaMethodInvoker(Param :KonohaParam, CompiledCode :Object) {
			this.Param = Param;
			this.CompiledCode = CompiledCode;
	
		}
	
		Invoke(Object[] Args) :Object {
			return null;
		}
	}
	
	class extends :NativeMethodInvoker KonohaMethodInvoker {
	
		NativeMethodInvoker(Param :KonohaParam, MethodRef :Method) {
			super(Param, MethodRef);
		}
	
		GetMethodRef() :Method {
			return (Method) this.CompiledCode;
		}
	
		IsStaticInvocation() :boolean {
			return Modifier.isStatic(this.GetMethodRef().getModifiers());
		}
	
		
		Invoke(Object[] Args) :Object {
			var ParamSize :number = this.Param != null ? this.Param.GetParamSize() : 0;
			try {
				var MethodRef :Method = this.GetMethodRef();
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
			} catch (e :IllegalArgumentException) {
				e.printStackTrace();
			} catch (e :IllegalAccessException) {
				e.printStackTrace();
			} catch (e :InvocationTargetException) {
				e.printStackTrace();
			}
			return null;
		}
	}
	
	class KonohaDef {
	
		MakeDefinition(NameSpace :KonohaNameSpace) :void {
			
		}
	
	}
	
	class extends :KonohaMethod KonohaDef {
		ClassInfo :KonohaType;
		MethodName :string;
		MethodSymbolId :number;
		CanonicalSymbolId :number;
		Param :KonohaParam;
		MethodInvoker :KonohaMethodInvoker;
		MethodFlag :number;
	
		// DoLazyComilation();
		LazyNameSpace :KonohaNameSpace;
		SourceList :KonohaArray;
		//merge :FIXME field :ParsedTree in SouceList.
		ParsedTree :SyntaxTree;
	
		KonohaMethod(MethodFlag :number, ClassInfo :KonohaType, MethodName :string, Param :KonohaParam, MethodRef :Method) {
			this.MethodFlag = MethodFlag;
			this.ClassInfo = ClassInfo;
			this.MethodName = MethodName;
			this.MethodSymbolId = KonohaSymbol.GetSymbolId(MethodName);
			this.CanonicalSymbolId = KonohaSymbol.GetCanonicalSymbolId(MethodName);
			this.Param = Param;
			this.MethodInvoker = null;
			if(MethodRef != null) {
				this.MethodInvoker = new NativeMethodInvoker(Param, MethodRef);
			}
			this.ParsedTree = null;
		}
	
		 toString() :string {
			var builder :StringBuilder = new StringBuilder();
			builder.append(this.Param.Types[0]);
			builder.append(" ");
			builder.append(this.MethodName);
			builder.append("(");
			for(var i :number = 0; i < this.Param.ArgNames.length; i++) {
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
	
		Is(Flag :number) :boolean {
			return ((this.MethodFlag & Flag) == Flag);
		}
	
		GetReturnType(BaseType :KonohaType) :KonohaType {
			var ReturnType :KonohaType = this.Param.Types[0];
			return ReturnType;
		}
	
		GetParamType(BaseType :KonohaType, ParamIdx :number) :KonohaType {
			var ParamType :KonohaType = this.Param.Types[ParamIdx + this.Param.ReturnSize];
			return ParamType;
		}
	
		Match(Other :KonohaMethod) :boolean {
			return (this.MethodName.equals(Other.MethodName) && this.Param.Match(Other.Param));
		}
	
		Match(MethodName :string, ParamSize :number) :boolean {
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
	
		Match(MethodName :string, ParamSize :number, KonohaType[] RequestTypes) :boolean {
			if(!this.Match(MethodName, ParamSize)) {
				return false;
			}
			for(var i :number = 0; i < RequestTypes.length; i++) {
				if(RequestTypes.equals(this.GetParamType(this.ClassInfo, i)) == false) {
					return false;
				}
			}
			return true;
		}
	
		Eval(Object[] ParamData) :Object {
			//var ParamSize :number = this.Param.GetParamSize();
			//KonohaDebug.P("ParamSize: " + ParamSize);
			return this.MethodInvoker.Invoke(ParamData);
		}
	
	// KonohaMethod(MethodFlag :number, ClassInfo :KonohaType, MethodName :string, Param :KonohaParam, LazyNameSpace :KonohaNameSpace, SourceList :Tokens) {
	// this(MethodFlag, ClassInfo, MethodName, Param, null);
	// this.LazyNameSpace = LazyNameSpace;
	// this.SourceList = SourceList;
	// }
	
		DoCompilation() :void {
	// if(this.MethodInvoker != null) {
	// return;
	// }
	// var Tree :SyntaxTree = this.ParsedTree;
	// var NS :KonohaNameSpace = this.LazyNameSpace;
	// if(Tree == null) {
	// var BufferList :Tokens = new Tokens();
	// NS.PreProcess(this.SourceList, 0, this.SourceList.size(), BufferList);
	// Tree = SyntaxTree.ParseNewNode(NS, null, BufferList, 0, BufferList.size(), AllowEmpty);
	// println("untyped tree: " + Tree);
	// }
	// var Gamma :TypeEnv = new TypeEnv(this.LazyNameSpace, this);
	// var TNode :TypedNode = TypeEnv.TypeCheck(Gamma, Tree, Gamma.VoidType, DefaultTypeCheckPolicy);
	// var Builder :KonohaBuilder = this.LazyNameSpace.GetBuilder();
	// this.MethodInvoker = Builder.Build(NS, TNode, this);
		}
	}
	
	class VarSet {
		TypeInfo :KonohaType;
		Name :string;
	
		VarSet(TypeInfo :KonohaType, Name :string) {
			this.TypeInfo = TypeInfo;
			this.Name = Name;
		}
	}
	
	class TypeEnv {
	
		GammaNameSpace :KonohaNameSpace;
	
		/* for convinient short cut */
		VoidType :KonohaType;
		BooleanType :KonohaType;
		IntType :KonohaType;
		StringType :KonohaType;
		VarType :KonohaType;
	
		TypeEnv(GammaNameSpace :KonohaNameSpace, Method :KonohaMethod) {
			this.GammaNameSpace = GammaNameSpace;
			this.VoidType = GammaNameSpace.KonohaContext.VoidType;
			this.BooleanType = GammaNameSpace.KonohaContext.BooleanType;
			this.IntType = GammaNameSpace.KonohaContext.IntType;
			this.StringType = GammaNameSpace.KonohaContext.StringType;
			this.VarType = GammaNameSpace.KonohaContext.VarType;
			this.Method = Method;
			if(Method != null) {
				this.InitMethod(Method);
			} else {
				// global
				this.ThisType = GammaNameSpace.GetGlobalObject().TypeInfo;
				this.AppendLocalType(this.ThisType, "this");
			}
		}
	
		Method :KonohaMethod;
		ReturnType :KonohaType;
		ThisType :KonohaType;
	
		InitMethod(Method :KonohaMethod) :void {
			this.ReturnType = Method.GetReturnType(Method.ClassInfo);
			this.ThisType = Method.ClassInfo;
			if(!Method.Is(StaticMethod)) {
				this.AppendLocalType(Method.ClassInfo, "this");
				var Param :KonohaParam = Method.Param;
				for(var i :number = 0; i < Param.ArgNames.length; i++) {
					this.AppendLocalType(Param.Types[i + Param.ReturnSize], Param.ArgNames[i]);
				}
			}
		}
	
		var LocalStackList :KonohaArray = null;
	
		AppendLocalType(TypeInfo :KonohaType, Name :string) :void {
			if(this.LocalStackList == null) {
				this.LocalStackList = new KonohaArray();
			}
			this.LocalStackList.add(new VarSet(TypeInfo, Name));
		}
	
		GetLocalType(Symbol :string) :KonohaType {
			if(this.LocalStackList != null) {
				for(i = this.LocalStackList.size() - 1; i >= 0; i--) :number {
					var t :VarSet = (VarSet) this.LocalStackList.get(i);
					if(t.Name.equals(Symbol))
						return t.TypeInfo;
				}
			}
			return null;
		}
	
		GetLocalIndex(Symbol :string) :number {
			return -1;
		}
	
		GetDefaultTypedNode(TypeInfo :KonohaType) :TypedNode {
			return null; // TODO
		}
	
		NewErrorNode(KeyToken :KonohaToken, Message :string) :TypedNode {
			return new ErrorNode(this.VoidType, KeyToken, this.GammaNameSpace.ReportError(ErrorLevel, KeyToken, Message));
		}
	
		function TypeEachNode(Gamma :TypeEnv, Tree :SyntaxTree, TypeInfo :KonohaType) :TypedNode {
			var Node :TypedNode = ApplyTypeFunc(Tree.Pattern.TypeFunc, Gamma, Tree, TypeInfo);
			if(Node == null) {
				Node = Gamma.NewErrorNode(Tree.KeyToken, "undefined type checker: " + Tree.Pattern);
			}
			return Node;
		}
	
		function TypeCheckEachNode(Gamma :TypeEnv, Tree :SyntaxTree, TypeInfo :KonohaType, TypeCheckPolicy :number) :TypedNode {
			var Node :TypedNode = TypeEachNode(Gamma, Tree, TypeInfo);
			// if(Node.TypeInfo == null) {
			//
			// }
			return Node;
		}
	
		function TypeCheck(Gamma :TypeEnv, Tree :SyntaxTree, TypeInfo :KonohaType, TypeCheckPolicy :number) :TypedNode {
			var TPrevNode :TypedNode = null;
			while(Tree != null) {
				var CurrentTypeInfo :KonohaType = (Tree.NextTree != null) ? Gamma.VoidType : TypeInfo;
				var CurrentTypedNode :TypedNode = TypeCheckEachNode(Gamma, Tree, CurrentTypeInfo, TypeCheckPolicy);
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
	
	class TypedNode {
	
		var ParentNode :TypedNode = null;
		var PrevNode :TypedNode = null;
		var NextNode :TypedNode = null;
	
		TypeInfo :KonohaType;
		SourceToken :KonohaToken;
	
		GetHeadNode() :TypedNode {
			var Node :TypedNode = this;
			while(Node.PrevNode != null) {
				Node = Node.PrevNode;
			}
			return Node;
		}
	
		Next(Node :TypedNode) :TypedNode {
			var LastNode :TypedNode = this.GetTailNode();
			LastNode.LinkNode(Node);
			return Node;
		}
	
		GetTailNode() :TypedNode {
			var Node :TypedNode = this;
			while(Node.NextNode != null) {
				Node = Node.NextNode;
			}
			return this;
		}
	
		LinkNode(Node :TypedNode) :void {
			Node.PrevNode = this;
			this.NextNode = Node;
		}
	
		TypedNode(TypeInfo :KonohaType, SourceToken :KonohaToken) {
			this.TypeInfo = TypeInfo;
			this.SourceToken = SourceToken;
		}
	
		Evaluate(Visitor :NodeVisitor) :boolean {
			return false;
		}
	
		IsError() :boolean {
			return (this instanceof ErrorNode);
		}
	
	}
	
	class extends :UnaryNode TypedNode {
		Expr :TypedNode;
	
		UnaryNode(TypeInfo :KonohaType, Expr :TypedNode) {
			super(TypeInfo, null/*fixme*/);
			this.Expr = Expr;
		}
	}
	
	class extends :BinaryNode TypedNode {
		LeftNode :TypedNode;
		RightNode :TypedNode;
	
		BinaryNode(TypeInfo :KonohaType, OperatorToken :KonohaToken, Left :TypedNode, Right :TypedNode) {
			super(TypeInfo, OperatorToken);
			this.LeftNode = Left;
			this.RightNode = Right;
		}
	
	}
	
	class extends :ErrorNode TypedNode {
		ErrorMessage :string;
	
		ErrorNode(TypeInfo :KonohaType, KeyToken :KonohaToken, ErrorMessage :string) {
			super(TypeInfo, KeyToken);
			this.ErrorMessage = KeyToken.ToErrorToken(ErrorMessage);
		}
	
		
		Evaluate(Visitor :NodeVisitor) :boolean {
			return Visitor.VisitError(this);
		}
	}
	
	class extends :ConstNode TypedNode {
		ConstValue :Object;
	
		ConstNode(TypeInfo :KonohaType, SourceToken :KonohaToken, ConstValue :Object) {
			super(TypeInfo, SourceToken);
			this.ConstValue = ConstValue;
		}
	
		
		Evaluate(Visitor :NodeVisitor) :boolean {
			return Visitor.VisitConst(this);
		}
	
	}
	
	class extends :FieldNode TypedNode {
		FieldName :string;
	
		FieldNode(TypeInfo :KonohaType, SourceToken :KonohaToken, FieldName :string) {
			super(TypeInfo, SourceToken);
			this.FieldName = FieldName;
		}
	
		GetFieldName() :string {
			return this.FieldName;
		}
	}
	
	class extends :LocalNode FieldNode {
		LocalNode(TypeInfo :KonohaType, SourceToken :KonohaToken, FieldName :string) {
			super(TypeInfo, SourceToken, FieldName);
		}
	
		
		Evaluate(Visitor :NodeVisitor) :boolean {
			return Visitor.VisitLocal(this);
		}
	
	}
	
	class extends :NullNode TypedNode {
	
		NullNode(TypeInfo :KonohaType) {
			super(TypeInfo, null/* fixme */);
		}
	
		
		Evaluate(Visitor :NodeVisitor) :boolean {
			return Visitor.VisitNull(this);
		}
	
	}
	
	class extends :LetNode TypedNode {
		VarToken :KonohaToken;
		ValueNode :TypedNode;
		BlockNode :TypedNode;
	
		/* let frame[Index] = in :Right end :Block */
		LetNode(TypeInfo :KonohaType, VarToken :KonohaToken, Right :TypedNode, Block :TypedNode) {
			super(TypeInfo, VarToken);
			this.VarToken = VarToken;
			this.ValueNode = Right;
			this.BlockNode = Block;
		}
	
		
		Evaluate(Visitor :NodeVisitor) :boolean {
			return Visitor.VisitLet(this);
		}
	
	}
	
	class extends :AndNode BinaryNode {
		AndNode(TypeInfo :KonohaType, KeyToken :KonohaToken, Left :TypedNode, Right :TypedNode) {
			super(TypeInfo, KeyToken, Left, Right);
		}
	
		
		Evaluate(Visitor :NodeVisitor) :boolean {
			return Visitor.VisitAnd(this);
		}
	}
	
	class extends :OrNode BinaryNode {
	
		OrNode(TypeInfo :KonohaType, KeyToken :KonohaToken, Left :TypedNode, Right :TypedNode) {
			super(TypeInfo, KeyToken, Left, Right);
		}
	
		
		Evaluate(Visitor :NodeVisitor) :boolean {
			return Visitor.VisitOr(this);
		}
	
	}
	
	class extends :ApplyNode TypedNode {
		Method :KonohaMethod;
		Params :KonohaArray; /* [this, arg1, arg2, ...] */
	
		/* call self.Method(arg1, arg2, ...) */
		ApplyNode(TypeInfo :KonohaType, KeyToken :KonohaToken, Method :KonohaMethod) {
			super(TypeInfo, KeyToken);
			this.Method = Method;
			this.Params = new KonohaArray();
		}
	
		ApplyNode(TypeInfo :KonohaType, KeyToken :KonohaToken, Method :KonohaMethod, arg1 :TypedNode) {
			super(TypeInfo, KeyToken);
			this.Method = Method;
			this.Params = new KonohaArray();
			this.Params.add(arg1);
		}
	
		ApplyNode(TypeInfo :KonohaType, KeyToken :KonohaToken, Method :KonohaMethod, arg1 :TypedNode, arg2 :TypedNode) {
			super(TypeInfo, KeyToken);
			this.Method = Method;
			this.Params = new KonohaArray();
			this.Params.add(arg1);
			this.Params.add(arg2);
		}
	
		Append(Expr :TypedNode) :void {
			this.Params.add(Expr);
		}
	
		
		Evaluate(Visitor :NodeVisitor) :boolean {
			return Visitor.VisitApply(this);
		}
	
	}
	
	class extends :NewNode TypedNode {
		Params :KonohaArray; /* [this, arg1, arg2, ...] */
	
		NewNode(TypeInfo :KonohaType, KeyToken :KonohaToken) {
			super(TypeInfo, KeyToken);
			this.Params = new KonohaArray();
		}
	
		Append(Expr :TypedNode) :void {
			this.Params.add(Expr);
		}
	
		
		Evaluate(Visitor :NodeVisitor) :boolean {
			return Visitor.VisitNew(this);
		}
	
	}
	
	class extends :IfNode TypedNode {
		CondExpr :TypedNode;
		ThenNode :TypedNode;
		ElseNode :TypedNode;
	
		/* CondExpr :If then else :ThenBlock ElseBlock */
		IfNode(TypeInfo :KonohaType, CondExpr :TypedNode, ThenBlock :TypedNode, ElseNode :TypedNode) {
			super(TypeInfo, null/* fixme */);
			this.CondExpr = CondExpr;
			this.ThenNode = ThenBlock;
			this.ElseNode = ElseNode;
		}
	
		
		Evaluate(Visitor :NodeVisitor) :boolean {
			return Visitor.VisitIf(this);
		}
	
	}
	
	class extends :LoopNode TypedNode {
	
		/* while then :CondExpr { LoopBlock; IterationExpr } */
		CondExpr :TypedNode;
		LoopBody :TypedNode;
		IterationExpr :TypedNode;
	
		LoopNode(TypeInfo :KonohaType, CondExpr :TypedNode, LoopBody :TypedNode, IterationExpr :TypedNode) {
			super(TypeInfo, null/* fixme */);
			this.CondExpr = CondExpr;
			this.LoopBody = LoopBody;
			this.IterationExpr = IterationExpr;
		}
	
		
		Evaluate(Visitor :NodeVisitor) :boolean {
			return Visitor.VisitLoop(this);
		}
	
	}
	
	class extends :ReturnNode UnaryNode {
	
		ReturnNode(TypeInfo :KonohaType, Expr :TypedNode) {
			super(TypeInfo, Expr);
		}
	
		
		Evaluate(Visitor :NodeVisitor) :boolean {
			return Visitor.VisitReturn(this);
		}
	
	}
	
	class extends :ThrowNode UnaryNode {
		/* ExceptionExpr :THROW */
		ThrowNode(TypeInfo :KonohaType, Expr :TypedNode) {
			super(TypeInfo, Expr);
		}
	
		
		Evaluate(Visitor :NodeVisitor) :boolean {
			return Visitor.VisitThrow(this);
		}
	}
	
	
	class extends :TryNode TypedNode {
		/*
		 * let HasException = TRY(TryBlock); in if HasException ==
		 * CatchedExceptions[0] then CatchBlock[0] if HasException ==
		 * CatchedExceptions[1] then CatchBlock[1] ... end :FinallyBlock
		 */
		TryBlock :TypedNode;
		TargetException :KonohaArray;
		CatchBlock :KonohaArray;
		FinallyBlock :TypedNode;
	
		TryNode(TypeInfo :KonohaType, TryBlock :TypedNode, FinallyBlock :TypedNode) {
			super(TypeInfo, null/* fixme */);
			this.TryBlock = TryBlock;
			this.FinallyBlock = FinallyBlock;
			this.CatchBlock = new KonohaArray();
			this.TargetException = new KonohaArray();
		}
	
		addCatchBlock(TargetException :TypedNode, CatchBlock :TypedNode) :void { //FIXME
			this.TargetException.add(TargetException);
			this.CatchBlock.add(CatchBlock);
		}
	
		 Evaluate(Visitor :NodeVisitor) :boolean {
			return Visitor.VisitTry(this);
		}
	}
	
	class extends :SwitchNode TypedNode {
		SwitchNode(TypeInfo :KonohaType, KeyToken :KonohaType) {
			super(TypeInfo, null/* FIXME */);
		}
	
		/*
		 * switch CondExpr { Label[0]: Blocks[0]; Label[1]: Blocks[2]; ... }
		 */
		CondExpr :TypedNode;
		Labels :KonohaArray;
		Blocks :KonohaArray;
	
		 Evaluate(Visitor :NodeVisitor) :boolean {
			return Visitor.VisitSwitch(this);
		}
	
	}
	
	class extends :DefineNode TypedNode {
	
		DefInfo :KonohaDef;
	
		DefineNode(TypeInfo :KonohaType, KeywordToken :KonohaToken, DefInfo :KonohaDef) {
			super(TypeInfo, KeywordToken);
			this.DefInfo = DefInfo;
		}
	
		 Evaluate(Visitor :NodeVisitor) :boolean {
			return Visitor.VisitDefine(this);
		}
	
	}
	
	/* builder */
	
	class KonohaObject {
		TypeInfo :KonohaType;
	// prototype :SymbolMap;
	//
		KonohaObject(TypeInfo :KonohaType) {
			this.TypeInfo = TypeInfo;
		}
	//
	// GetField(SymbolId :number) :Object {
	// if(this.prototype == null) {
	// return null;
	// }
	// return this.prototype.Get(SymbolId);
	// }
	//
	// SetField(SymbolId :number, Obj :Object) :void {
	// if(this.prototype == null) {
	// this.prototype = new SymbolMap();
	// }
	// this.prototype.Set(SymbolId, Obj);
	// }
	}
	
	class NodeVisitor /* {
		
		//VisitList(NodeList :TypedNode) :boolean { return false;}
	
		VisitDefine(Node :DefineNode):boolean { return false;}
	
		VisitConst(Node :ConstNode):boolean { return false;}
	
		VisitNew(Node :NewNode):boolean { return false;}
	
		VisitNull(Node :NullNode):boolean { return false;}
	
		VisitLocal(Node :LocalNode):boolean { return false;}
	
	// VisitGetter(Node :GetterNode):boolean { return false;}
	
		VisitApply(Node :ApplyNode):boolean { return false;}
	
		VisitAnd(Node :AndNode):boolean { return false;}
	
		VisitOr(Node :OrNode):boolean { return false;}
	
	// VisitAssign(Node :AssignNode):boolean { return false;}
	
		VisitLet(Node :LetNode):boolean { return false;}
	
		VisitIf(Node :IfNode):boolean { return false;}
	
		VisitSwitch(Node :SwitchNode):boolean { return false;}
	
		VisitLoop(Node :LoopNode):boolean { return false;}
	
		VisitReturn(Node :ReturnNode):boolean { return false;}
	
	// VisitLabel(Node :LabelNode):boolean { return false;}
	
	// VisitJump(Node :JumpNode):boolean { return false;}
	
		VisitTry(Node :TryNode):boolean { return false;}
	
		VisitThrow(Node :ThrowNode):boolean { return false;}
	
	// VisitFunction(Node :FunctionNode):boolean { return false;}
	
		VisitError(Node :ErrorNode):boolean { return false;}
	
		VisitList(Node :TypedNode) :boolean {
			var Ret :boolean = true;
			while(Ret && Node != null) {
				Ret &= Node.Evaluate(this);
				Node = Node.NextNode;
			}
			return Ret;
		}
		
	}
	
	class KonohaBuilder {
		EvalAtTopLevel(NameSpace :KonohaNameSpace, Node :TypedNode, GlobalObject :KonohaObject) :Object {
			return null;
		}
	
		Build(NameSpace :KonohaNameSpace, Node :TypedNode, Method :KonohaMethod) :KonohaMethodInvoker {
			return null;
		}
	}
	
	class KonohaSpec {
		SpecType :number;
		SpecKey :string;
		SpecBody :Object;
		constructor(SpecType :number, SpecKey :string, SpecBody :Object) {
			this.SpecType = SpecType;
			this.SpecKey = SpecKey;
			this.SpecBody = SpecBody;
		}
	}
	
	class KonohaNameSpace {
	
		KonohaContext :KonohaContext;
		ParentNameSpace :KonohaNameSpace;
		ImportedNameSpaceList :KonohaArray;
		PublicSpecList :KonohaArray;
		PrivateSpecList :KonohaArray;
		
		TokenFunc[] TokenMatrix;
		SymbolPatternTable :KonohaMap;
		ExtendedPatternTable :KonohaMap;
		
		constructor(KonohaContext :KonohaContext, ParentNameSpace :KonohaNameSpace) {
			this.KonohaContext = KonohaContext;
			this.ParentNameSpace = ParentNameSpace;
			this.ImportedNameSpaceList = null;
			this.PublicSpecList = new KonohaArray();
			this.PrivateSpecList = null;
			this.TokenMatrix = null;
			this.SymbolPatternTable = null;
			this.ExtendedPatternTable = null;
		}
			
		RemakeTokenMatrixEach(NameSpace :KonohaNameSpace) :void {
			for(i = 0; i < ListSize(NameSpace.PublicSpecList); i++) :number {
				var Spec :KonohaSpec = (KonohaSpec)NameSpace.PublicSpecList.get(i);
				if(Spec.SpecType != TokenFuncSpec) continue;
				for(j = 0; j < Spec.SpecKey.length(); j++) :number {
					var kchar :number = KonohaChar.FromJavaChar(Spec.SpecKey.charAt(j));
					var KonohaFunc :KonohaFunc = (KonohaFunc)Spec.SpecBody;
					this.TokenMatrix[kchar] = CreateOrReuseTokenFunc(KonohaFunc, this.TokenMatrix[kchar]);
				}
			}
		}
		
		RemakeTokenMatrix(NameSpace :KonohaNameSpace) :void {
			if(NameSpace.ParentNameSpace != null) {
				RemakeTokenMatrix(NameSpace.ParentNameSpace);
			}
			RemakeTokenMatrixEach(NameSpace);
			for(i = 0; i < ListSize(NameSpace.ImportedNameSpaceList); i++) :number {
				var Imported :KonohaNameSpace = (KonohaNameSpace)NameSpace.ImportedNameSpaceList.get(i);
				RemakeTokenMatrixEach(Imported);
			}
		}
		
		GetTokenFunc(KonohaChar2 :number) :TokenFunc {
			if(this.TokenMatrix == null) {
				this.TokenMatrix = new TokenFunc[KonohaCharMaxSize];
				RemakeTokenMatrix(this);
			}
			return this.TokenMatrix[KonohaChar2];
		}
	
		DefineTokenFunc(keys :string, f :KonohaFunc) :void {
			this.PublicSpecList.add(new KonohaSpec(TokenFuncSpec, keys, f));
			this.TokenMatrix = null;
		}
		
		
		TableAddSpec(Table :KonohaMap, Spec :KonohaSpec) :void {
			var Body :Object = Spec.SpecBody;
			if(instanceof :Body SyntaxPattern) {
				var Parent :Object = Table.get(Spec.SpecKey);
				if(instanceof :Parent SyntaxPattern) {
					Body = MergeSyntaxPattern((SyntaxPattern)Body, (SyntaxPattern)Parent);
				}
			}
			Table.put(Spec.SpecKey, Body);
		}
		
		RemakeSymbolTableEach(NameSpace :KonohaNameSpace, SpecList :KonohaArray) :void {
			for(i = 0; i < ListSize(SpecList); i++) :number {
				var Spec :KonohaSpec = (KonohaSpec)SpecList.get(i);
				if(Spec.SpecType == SymbolPatternSpec) {
					TableAddSpec(this.SymbolPatternTable, Spec);
				}
				else if(Spec.SpecType == ExtendedPatternSpec) {
					TableAddSpec(this.ExtendedPatternTable, Spec);
				}
			}
		}
		
		RemakeSymbolTable(NameSpace :KonohaNameSpace) :void {
			if(NameSpace.ParentNameSpace != null) {
				RemakeSymbolTable(NameSpace.ParentNameSpace);
			}
			RemakeSymbolTableEach(NameSpace, NameSpace.PublicSpecList);
			RemakeSymbolTableEach(NameSpace, NameSpace.PrivateSpecList);
			for(i = 0; i < ListSize(NameSpace.ImportedNameSpaceList); i++) :number {
				var Imported :KonohaNameSpace = (KonohaNameSpace)NameSpace.ImportedNameSpaceList.get(i);
				RemakeSymbolTableEach(Imported, Imported.PublicSpecList);
			}
		}
		
		GetSymbol(Key :string) :Object {
			if(this.SymbolPatternTable == null) {
				this.SymbolPatternTable = new KonohaMap();
				this.ExtendedPatternTable = new KonohaMap();
				RemakeSymbolTable(this);
			}
			return this.SymbolPatternTable.get(Key);
		}
			
		GetPattern(PatternName :string) :SyntaxPattern {
			var Body :Object = this.GetSymbol(PatternName);
			return (instanceof :Body SyntaxPattern) ? (SyntaxPattern)Body : null;
		}
	
		GetExtendedPattern(PatternName :string) :SyntaxPattern {
			if(this.ExtendedPatternTable == null) {
				this.SymbolPatternTable = new KonohaMap();
				this.ExtendedPatternTable = new KonohaMap();
				RemakeSymbolTable(this);
			}
			var Body :Object = this.ExtendedPatternTable.get(PatternName);
			return (instanceof :Body SyntaxPattern) ? (SyntaxPattern)Body : null;
		}
	
		DefineSymbol(Key :string, Value :Object) :void {
			var Spec :KonohaSpec = new KonohaSpec(SymbolPatternSpec, Key, Value);
			this.PublicSpecList.add(Spec);
			if(this.SymbolPatternTable != null) {
				TableAddSpec(this.SymbolPatternTable, Spec);
			}
		}
	
		DefinePrivateSymbol(Key :string, Value :Object) :void {
			var Spec :KonohaSpec = new KonohaSpec(SymbolPatternSpec, Key, Value);
			if(this.PrivateSpecList == null) {
				this.PrivateSpecList = new KonohaArray();
			}
			this.PrivateSpecList.add(Spec);
			if(this.SymbolPatternTable != null) {
				TableAddSpec(this.SymbolPatternTable, Spec);
			}
		}
	
		DefineSyntaxPattern(PatternName :string, MatchFunc :KonohaFunc, TypeFunc :KonohaFunc) :void {
			var Pattern :SyntaxPattern = new SyntaxPattern(this, PatternName, MatchFunc, TypeFunc);
			var Spec :KonohaSpec = new KonohaSpec(SymbolPatternSpec, PatternName, Pattern);
			this.PublicSpecList.add(Spec);
			if(this.SymbolPatternTable != null) {
				TableAddSpec(this.SymbolPatternTable, Spec);
			}
		}
	
		DefineExtendedPattern(PatternName :string, SyntaxFlag :number, MatchFunc :KonohaFunc, TypeFunc :KonohaFunc) :void {
			var Pattern :SyntaxPattern = new SyntaxPattern(this, PatternName, MatchFunc, TypeFunc);
			Pattern.SyntaxFlag = SyntaxFlag;
			var Spec :KonohaSpec = new KonohaSpec(ExtendedPatternSpec, PatternName, Pattern);
			this.PublicSpecList.add(Spec);
			if(this.ExtendedPatternTable != null) {
				TableAddSpec(this.ExtendedPatternTable, Spec);
			}
		}
		
		// Object :Global
		CreateGlobalObject(ClassFlag :number, ShortName :string) :KonohaObject {
			var NewClass :KonohaType = new KonohaType(this.KonohaContext, ClassFlag, ShortName, null);
			var GlobalObject :KonohaObject = new KonohaObject(NewClass);
			NewClass.DefaultNullValue = GlobalObject;
			return GlobalObject;
		}
	
		GetGlobalObject() :KonohaObject {
			var GlobalObject :Object = this.GetSymbol(GlobalConstName);
			if(== null || !(instanceof :GlobalObject KonohaObject)) :GlobalObject {
				GlobalObject = this.CreateGlobalObject(SingletonClass, "global");
				this.DefinePrivateSymbol(GlobalConstName, GlobalObject);
			}
			return (KonohaObject) GlobalObject;
		}
	
		ImportNameSpace(ImportedNameSpace :KonohaNameSpace) :void {
			if(this.ImportedNameSpaceList == null) {
				this.ImportedNameSpaceList = new KonohaArray();
				this.ImportedNameSpaceList.add(ImportedNameSpace);
			}
			this.TokenMatrix = null;
			this.SymbolPatternTable = null;
			this.ExtendedPatternTable = null;
		}
	
		Eval(ScriptSource :string, FileLine :number) :Object {
			var ResultValue :Object = null;
			println("Eval: " + ScriptSource);
			var TokenContext :TokenContext = new TokenContext(this, ScriptSource, FileLine);
			while(TokenContext.HasNext()) {
				var Tree :SyntaxTree = ParseSyntaxTree(null, TokenContext);
				println("untyped tree: " + Tree);
				var Gamma :TypeEnv = new TypeEnv(this, null);
				var TNode :TypedNode = TypeEnv.TypeCheckEachNode(Gamma, Tree, Gamma.VoidType, DefaultTypeCheckPolicy);
				var Builder :KonohaBuilder = this.GetBuilder();
				ResultValue = Builder.EvalAtTopLevel(this, TNode, this.GetGlobalObject());
			}
			return ResultValue;
		}
	
		// Builder
		Builder :KonohaBuilder;
	
		GetBuilder() :KonohaBuilder {
			if(this.Builder == null) {
				if(this.ParentNameSpace != null) {
					return this.ParentNameSpace.GetBuilder();
				}
				//this.Builder = new DefaultKonohaBuilder(); // create default builder
				this.Builder = new KonohaBuilder(); // create default builder
			}
			return this.Builder;
		}
	
		LoadClass(ClassName :string) :Object {
			try {
				Class<?> ClassInfo = Class.forName(ClassName);
				return ClassInfo.newInstance();
			} catch (e1 :ClassNotFoundException) {
				// Auto :TODO-generated catch block
				e1.printStackTrace();
			} catch (e :InstantiationException) {
				// Auto :TODO-generated catch block
				e.printStackTrace();
			} catch (e :IllegalAccessException) {
				// Auto :TODO-generated catch block
				e.printStackTrace();
			}
			return null;
		}
	
		LoadBuilder(Name :string) :boolean {
			var Builder :KonohaBuilder = (KonohaBuilder) this.LoadClass(Name);
			if(Builder != null) {
				this.Builder = Builder;
				return true;
			}
			return false;
		}
	
		LookupMethod(MethodName :string, ParamSize :number) :KonohaMethod {
			//FIXME
			//MethodName = "ClassName.MethodName";
			//1. (ClassName, MethodName) = MethodName.split(".")
			//2. find MethodName(arg0, arg1, ... , arg_ParamSize)
			return null;
		}
	
	// AddPatternSyntax(Parent :SyntaxPattern, Syntax :SyntaxPattern, TopLevel :boolean) :void {
	// this.PegParser.AddSyntax(Syntax, TopLevel);
	// }
	//
	// MergePatternSyntax(Parent :SyntaxPattern, NewSyntax :SyntaxPattern, TopLevel :boolean) :void {
	// this.PegParser.MixSyntax(Parent, NewSyntax, TopLevel);
	// }
	
		GetSourcePosition(FileLine :number) :string {
			return "(eval:" + (int) FileLine + ")";
		}
	
		ReportError(Level :number, Token :KonohaToken, Message :string) :string {
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
	
	class KonohaGrammar {
	
		// Token
		WhiteSpaceToken(TokenContext :TokenContext, SourceText :string, pos :number) :number {
			TokenContext.FoundWhiteSpace();
			for(; pos < SourceText.length(); pos++) {
				char ch = SourceText.charAt(pos);
				if(!IsWhitespace(ch)) {
					break;
				}
			}
			return pos;
		}
	
		IndentToken(TokenContext :TokenContext, SourceText :string, pos :number) :number {
			var LineStart :number = pos + 1;
			TokenContext.FoundLineFeed(1);
			pos = pos + 1;
			for(; pos < SourceText.length(); pos++) {
				char ch = SourceText.charAt(pos);
				if(!IsWhitespace(ch)) {
					break;
				}
			}
			var Text :string = "";
			if(LineStart < pos) {
				Text = SourceText.substring(LineStart, pos);
			}
			TokenContext.AddNewToken(Text, IndentTokenFlag, null);
			return pos;
		}
	
		SingleSymbolToken(TokenContext :TokenContext, SourceText :string, pos :number) :number {
			TokenContext.AddNewToken(SourceText.substring(pos, pos + 1), 0, null);
			return pos + 1;
		}
	
		SymbolToken(TokenContext :TokenContext, SourceText :string, pos :number) :number {
			var start :number = pos;
			for(; pos < SourceText.length(); pos++) {
				char ch = SourceText.charAt(pos);
				if(!IsLetter(ch) && !IsDigit(ch) && ch != '_') {
					break;
				}
			}
			TokenContext.AddNewToken(SourceText.substring(start, pos), 0, null);
			return pos;
		}
	
		MemberToken(TokenContext :TokenContext, SourceText :string, pos :number) :number {
			var start :number = pos + 1;
			for(; pos < SourceText.length(); pos++) {
				char ch = SourceText.charAt(pos);
				if(!IsLetter(ch) && !IsDigit(ch) && ch != '_') {
					break;
				}
			}
			TokenContext.AddNewToken(SourceText.substring(start, pos), 0, "$MemberOperator");
			return pos;
		}
	
		NumberLiteralToken(TokenContext :TokenContext, SourceText :string, pos :number) :number {
			var start :number = pos;
			for(; pos < SourceText.length(); pos++) {
				char ch = SourceText.charAt(pos);
				if(!IsDigit(ch)) {
					break;
				}
			}
			TokenContext.AddNewToken(SourceText.substring(start, pos), 0, "$IntegerLitteral");
			return pos;
		}
	
		StringLiteralToken(TokenContext :TokenContext, SourceText :string, pos :number) :number {
			var start :number = pos + 1;
			char prev = '"';
			pos = start;
			while(pos < SourceText.length()) {
				char ch = SourceText.charAt(pos);
				if(ch == '"' && prev != '\\') {
					TokenContext.AddNewToken(SourceText.substring(start, pos), 0, "$StringLitteral");
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
	
		ParseType(Pattern :SyntaxPattern, LeftTree :SyntaxTree, TokenContext :TokenContext) :SyntaxTree {
			P("ParseType :Entering..");
			return null; // Matched :Not
		}
	
		ParseSymbol(Pattern :SyntaxPattern, LeftTree :SyntaxTree, TokenContext :TokenContext) :SyntaxTree {
			P("ParseSymbol :Entering..");
			var Token :KonohaToken = TokenContext.Next();
			return new SyntaxTree(Pattern, TokenContext.NameSpace, Token);
		}
	
		TypeVariable(Gamma :TypeEnv, Tree :SyntaxTree, TypeInfo :KonohaType) :TypedNode {
			// case: is :Symbol LocalVariable
			TypeInfo = Gamma.GetLocalType(Tree.KeyToken.ParsedText);
			if(TypeInfo != null) {
				return new LocalNode(TypeInfo, Tree.KeyToken, Tree.KeyToken.ParsedText);
			}
			// case: is :Symbol GlobalVariable
			if(Tree.KeyToken.ParsedText.equals("global")) {
				return new ConstNode(
					Tree.TreeNameSpace.GetGlobalObject().TypeInfo,
					Tree.KeyToken,
					Tree.TreeNameSpace.GetGlobalObject());
			}
			// case: is :Symbol undefined name
			return Gamma.NewErrorNode(Tree.KeyToken, "undefined name: " + Tree.KeyToken.ParsedText);
		}
	
		// And :Parse Type
		ParseIntegerLiteral(Pattern :SyntaxPattern, LeftTree :SyntaxTree, TokenContext :TokenContext) :SyntaxTree {
			var Token :KonohaToken = TokenContext.Next();
			return new SyntaxTree(Pattern, TokenContext.NameSpace, Token);
		}
	
		TypeIntegerLiteral(Gamma :TypeEnv, Tree :SyntaxTree, TypeInfo :KonohaType) :TypedNode {
			var Token :KonohaToken = Tree.KeyToken;
			return new ConstNode(Gamma.IntType, Token, Integer.valueOf(Token.ParsedText));
		}
	
		ParseStringLiteral(Pattern :SyntaxPattern, LeftTree :SyntaxTree, TokenContext :TokenContext) :SyntaxTree {
			var Token :KonohaToken = TokenContext.Next();
			return new SyntaxTree(Pattern, TokenContext.NameSpace, Token);
		}
	
		TypeStringLiteral(Gamma :TypeEnv, Tree :SyntaxTree, TypeInfo :KonohaType) :TypedNode {
			var Token :KonohaToken = Tree.KeyToken;
			/* FIXME: handling of escape sequence */
			return new ConstNode(Gamma.StringType, Token, Token.ParsedText);
		}
	
	
		ParseConst(Pattern :SyntaxPattern, LeftTree :SyntaxTree, TokenContext :TokenContext) :SyntaxTree {
			var Token :KonohaToken = TokenContext.Next();
			return new SyntaxTree(Pattern, TokenContext.NameSpace, Token);
		}
	
		TypeConst(Gamma :TypeEnv, Tree :SyntaxTree, TypeInfo :KonohaType) :TypedNode {
			var Token :KonohaToken = Tree.KeyToken;
			/* FIXME: handling of resolved object */
			return new ConstNode(Gamma.StringType, Token, Token.ParsedText);
		}
	
		ParseUniaryOperator(Pattern :SyntaxPattern, LeftTree :SyntaxTree, TokenContext :TokenContext) :SyntaxTree {
			var Token :KonohaToken = TokenContext.Next();
			var Tree :SyntaxTree = new SyntaxTree(Pattern, TokenContext.NameSpace, Token);
			Tree.SetMatchedPatternAt(0, TokenContext, "$Expression", Required);
			return Tree;
		}
	
		ParseBinaryOperator(Pattern :SyntaxPattern, LeftTree :SyntaxTree, TokenContext :TokenContext) :SyntaxTree {
			var Token :KonohaToken = TokenContext.Next();
			var RightTree :SyntaxTree = ParseSyntaxTree(null, TokenContext);
			if(IsEmptyOrError(RightTree)) return RightTree;
	
			/* 1 + 2 * 3 */
			/* 1 * 2 + 3 */
			if(RightTree.Pattern.IsBinaryOperator()) {
				if(Pattern.IsLeftJoin(RightTree.Pattern)) {
					var NewTree :SyntaxTree = new SyntaxTree(Pattern, TokenContext.NameSpace, Token);
					NewTree.SetSyntaxTreeAt(LeftHandTerm, LeftTree);
					NewTree.SetSyntaxTreeAt(RightHandTerm, RightTree.GetSyntaxTreeAt(LeftHandTerm));
					RightTree.SetSyntaxTreeAt(LeftHandTerm, NewTree);
					return RightTree;
				}
			}
			var NewTree :SyntaxTree = new SyntaxTree(Pattern, TokenContext.NameSpace, Token);
			NewTree.SetSyntaxTreeAt(LeftHandTerm, LeftTree);
			NewTree.SetSyntaxTreeAt(RightHandTerm, RightTree);
			if(RightTree.NextTree != null) {
				NewTree.LinkNode(RightTree.NextTree);
				RightTree.NextTree = null;
			}
			return NewTree;
		}
	
	// var MethodCallBaseClass :number = 0;
	// var MethodCallName :number = 1;
	// var MethodCallParam :number = 2;
	//
	// TreeFromToken(NS :KonohaNameSpace, Token :KonohaToken) :SyntaxTree {
	// var globalTokenList :Tokens = new Tokens();
	// Token.PresetPattern = NS.GetSyntax("$Symbol");
	// globalTokenList.add(Token);
	// return SyntaxTree.ParseNewNode(NS, null, globalTokenList, 0, 1, 0);
	// }
	//
	// /**
	// * $Symbol [ "." $Symbol ] () => [(reciever:$Symbol), method@0, (...)]
	// * 
	// * @return
	// */
	// ParseMethodCall(Tree :SyntaxTree, TokenList :Tokens, BeginIdx :number, EndIdx :number, ParseOption :number) :number {
	// var ClassIdx :number = -1;
	// println(Tree.KeyToken.ParsedText);
	// ClassIdx = Tree.MatchSyntax(MethodCallBaseClass, "$Type", TokenList, BeginIdx, BeginIdx + 1, AllowEmpty);
	// var MemberIdx :number = BeginIdx + 1;
	// var isGlobal :boolean = false;
	//
	// var ParamIdx :number = Tree.MatchSyntax(MethodCallName, "$Member", TokenList, MemberIdx, EndIdx, ParseOption);
	//
	// if(ParamIdx == -1) {
	// // method :Global call
	// var SymbolIdx :number = BeginIdx;
	// ParamIdx = Tree.MatchSyntax(MethodCallName, "$Symbol", TokenList, SymbolIdx, EndIdx, ParseOption);
	// isGlobal = true;
	// }
	//
	// var NextIdx :number = Tree.MatchSyntax(-1, "()", TokenList, ParamIdx, EndIdx, ParseOption);
	//
	// if(NextIdx == -1) {
	// return -1;
	// }
	//
	// var ReceiverToken :KonohaToken = null;
	// var MethodToken :KonohaToken = null;
	// if(isGlobal) {
	// ReceiverToken = new KonohaToken(GlobalConstName, 0);
	// ReceiverToken.PresetPattern = Tree.TreeNameSpace.GetSyntax("$Symbol");
	// MethodToken = TokenList.get(BeginIdx);
	// } else {
	// ReceiverToken = TokenList.get(BeginIdx);
	// MethodToken = TokenList.get(BeginIdx + 1);
	// }
	//
	// var baseNode :SyntaxTree = this.TreeFromToken(Tree.TreeNameSpace, ReceiverToken);
	// Tree.SetSyntaxTreeAt(MethodCallBaseClass, baseNode);
	//
	// var GroupToken :KonohaToken = TokenList.get(ParamIdx);
	// var GroupList :Tokens = GroupToken.GetGroupList();
	// Tree.AppendTokenList(",", GroupList, 1, GroupList.size() - 1, 0/* ParseOption */);
	//
	// var methodNode :SyntaxTree = this.TreeFromToken(Tree.TreeNameSpace, MethodToken);
	// Tree.SetSyntaxTreeAt(MethodCallName, methodNode);
	//
	// Tree.Pattern = Tree.TreeNameSpace.GetSyntax("$MethodCall");
	// // System.out.printf("SymbolIdx=%d, ParamIdx=%d, BlockIdx=%d, NextIdx=%d, EndIdx=%d\n",
	// // SymbolIdx, ParamIdx, BlockIdx, NextIdx, EndIdx);
	// return NextIdx;
	// }
	//
	// TypeMethodCall(Gamma :TypeEnv, Tree :SyntaxTree, TypeInfo :KonohaType) :TypedNode {
	// P("(>_<) typing method calls: " + Tree);
	// var NodeList :KonohaArray = Tree.TreeList;
	// assert (NodeList.size() > 1);
	// assert (NodeList.get(0) instanceof SyntaxTree);
	// var UntypedBaseNode :SyntaxTree = (SyntaxTree) NodeList.get(0);
	// if(UntypedBaseNode == null) {
	// } else {
	// var BaseNode :TypedNode = TypeEnv.TypeCheckEachNode(Gamma, UntypedBaseNode, Gamma.VarType, 0);
	// if(BaseNode.IsError()) {
	// return BaseNode;
	// }
	// return this.TypeFindingMethod(Gamma, Tree, BaseNode, TypeInfo);
	// }
	// return null;
	// }
	//
	// ParamSizeFromNodeList(NodeList :KonohaArray) :number {
	// return NodeList.size() - 2;
	// }
	//
	// GetUntypedParamNodeFromNodeList(NodeList :KonohaArray, ParamIndex :number) :SyntaxTree {
	// return (SyntaxTree) NodeList.get(ParamIndex + 2);
	// }
	//
	// TypeFindingMethod(Gamma :TypeEnv, Tree :SyntaxTree, BaseNode :TypedNode, TypeInfo :KonohaType) :TypedNode {
	// var NodeList :KonohaArray = Tree.TreeList;
	// var ParamSize :number = this.ParamSizeFromNodeList(NodeList);
	// var KeyToken :KonohaToken = Tree.KeyToken;
	// var Method :KonohaMethod = null;
	// Method = Gamma.GammaNameSpace.LookupMethod(KeyToken.ParsedText, ParamSize);
	// if(Method == null) {
	// Method = BaseNode.TypeInfo.LookupMethod(KeyToken.ParsedText, ParamSize);
	// }
	// if(Method != null) {
	// var WorkingNode :ApplyNode = new ApplyNode(Method.GetReturnType(BaseNode.TypeInfo), KeyToken, Method);
	// WorkingNode.Append(BaseNode);
	// return this.TypeMethodEachParam(Gamma, BaseNode.TypeInfo, WorkingNode, NodeList);
	// }
	// return Gamma.NewErrorNode(KeyToken, "undefined method: " + KeyToken.ParsedText + " in "
	// + BaseNode.TypeInfo.ShortClassName);
	// }
	//
	// TypeMethodEachParam(Gamma :TypeEnv, BaseType :KonohaType, WorkingNode :ApplyNode, NodeList :KonohaArray) :TypedNode {
	// var Method :KonohaMethod = WorkingNode.Method;
	// var ParamSize :number = this.ParamSizeFromNodeList(NodeList);
	// for(var ParamIdx :number = 0; ParamIdx < ParamSize; ParamIdx++) {
	// var ParamType :KonohaType = Method.GetParamType(BaseType, ParamIdx);
	// var UntypedParamNode :SyntaxTree = this.GetUntypedParamNodeFromNodeList(NodeList, ParamIdx);
	// ParamNode :TypedNode;
	// if(UntypedParamNode != null) {
	// ParamNode = TypeEnv.TypeCheck(Gamma, UntypedParamNode, ParamType, DefaultTypeCheckPolicy);
	// } else {
	// ParamNode = Gamma.GetDefaultTypedNode(ParamType);
	// }
	// if(ParamNode.IsError()) {
	// return ParamNode;
	// }
	// WorkingNode.Append(ParamNode);
	// }
	// return WorkingNode;
	// }
	
		// PatternName: "("
		ParseParenthesis(Pattern :SyntaxPattern, LeftTree :SyntaxTree, TokenContext :TokenContext) :SyntaxTree {
			var ParseFlag :number = TokenContext.ParseFlag;
			TokenContext.MatchToken("(");
			TokenContext.ParseFlag |= SkipIndentParseFlag;
			var Tree :SyntaxTree = TokenContext.ParsePattern("$Expression", Required);
			if(!TokenContext.MatchToken(")")) {
				Tree = TokenContext.ReportExpectedToken(")");
			}
			TokenContext.ParseFlag = ParseFlag;		
			return Tree;
		}
		
		// PatternName: "("
		ParseParenthesis2(Pattern :SyntaxPattern, LeftTree :SyntaxTree, TokenContext :TokenContext) :SyntaxTree {
			var ParseFlag :number = TokenContext.ParseFlag;
			TokenContext.ParseFlag |= SkipIndentParseFlag;
			var FuncTree :SyntaxTree = new SyntaxTree(Pattern, TokenContext.NameSpace, TokenContext.GetMatchedToken("("));
			FuncTree.AppendParsedTree(LeftTree);
			while(!FuncTree.IsEmptyOrError() && !TokenContext.MatchToken(")")) {
				var Tree :SyntaxTree = TokenContext.ParsePattern("$Expression", Required);
				FuncTree.AppendParsedTree(Tree);
				if(TokenContext.MatchToken(",")) continue;
			}
			TokenContext.ParseFlag = ParseFlag;		
			return FuncTree;
		}
	
		ParseBlock2(Pattern :SyntaxPattern, LeftTree :SyntaxTree, TokenContext :TokenContext) :SyntaxTree {
			TokenContext.MatchToken("{");
			var PrevTree :SyntaxTree = null;
			while(TokenContext.SkipEmptyStatement()) {
				if(TokenContext.MatchToken("}")) break;
				PrevTree = ParseSyntaxTree(PrevTree, TokenContext);
				if(IsEmptyOrError(PrevTree)) return PrevTree;
			}
			return TreeHead(PrevTree);
		}
	
		TypeBlock(Gamma :TypeEnv, Tree :SyntaxTree, TypeInfo :KonohaType) :TypedNode {
			return Tree.TypeNodeAt(0, Gamma, Gamma.VarType, 0);
		}
	
	
		TypeAnd(Gamma :TypeEnv, Tree :SyntaxTree, TypeInfo :KonohaType) :TypedNode {
			var LeftNode :TypedNode = Tree.TypeNodeAt(LeftHandTerm, Gamma, Gamma.BooleanType, 0);
			var RightNode :TypedNode = Tree.TypeNodeAt(RightHandTerm, Gamma, Gamma.BooleanType, 0);
			return new AndNode(RightNode.TypeInfo, Tree.KeyToken, LeftNode, RightNode);
		}
	
		TypeOr(Gamma :TypeEnv, Tree :SyntaxTree, TypeInfo :KonohaType) :TypedNode {
			var LeftNode :TypedNode = Tree.TypeNodeAt(LeftHandTerm, Gamma, Gamma.BooleanType, 0);
			var RightNode :TypedNode = Tree.TypeNodeAt(RightHandTerm, Gamma, Gamma.BooleanType, 0);
			return new OrNode(RightNode.TypeInfo, Tree.KeyToken, LeftNode, RightNode);
		}
	
		ParseMember(Pattern :SyntaxPattern, LeftTree :SyntaxTree, TokenContext :TokenContext) :SyntaxTree {
			var Token :KonohaToken = TokenContext.GetToken();
			var NewTree :SyntaxTree = new SyntaxTree(Pattern, TokenContext.NameSpace, Token);
			NewTree.SetSyntaxTreeAt(0, LeftTree);
			return NewTree;		
		}
	
		// Statement :If
	
		ParseIf(Pattern :SyntaxPattern, LeftTree :SyntaxTree, TokenContext :TokenContext) :SyntaxTree {
			var Token :KonohaToken = TokenContext.GetMatchedToken("if");
			var NewTree :SyntaxTree = new SyntaxTree(Pattern, TokenContext.NameSpace, Token);
			NewTree.SetMatchedTokenAt(NoWhere, TokenContext, "(", Required);
			NewTree.SetMatchedPatternAt(IfCond, TokenContext, "$Expression", Required);
			NewTree.SetMatchedTokenAt(NoWhere, TokenContext, ")", Required);
			NewTree.SetMatchedPatternAt(IfThen, TokenContext, "$Statement", Required);
			if(TokenContext.MatchToken("else")) {
				NewTree.SetMatchedPatternAt(IfElse, TokenContext, "$Statement", Required);
			}
			return NewTree;
		}
	
		TypeIf(Gamma :TypeEnv, Tree :SyntaxTree, TypeInfo :KonohaType) :TypedNode {
			var CondNode :TypedNode = Tree.TypeNodeAt(IfCond, Gamma, Gamma.BooleanType, DefaultTypeCheckPolicy);
			var ThenNode :TypedNode = Tree.TypeNodeAt(IfThen, Gamma, TypeInfo, DefaultTypeCheckPolicy);
			var ElseNode :TypedNode = Tree.TypeNodeAt(IfElse, Gamma, ThenNode.TypeInfo, AllowEmptyPolicy);
			return new IfNode(ThenNode.TypeInfo, CondNode, ThenNode, ElseNode);
		}
	
		// Statement :Return
	
		ParseReturn(Pattern :SyntaxPattern, LeftTree :SyntaxTree, TokenContext :TokenContext) :SyntaxTree {
			var Token :KonohaToken = TokenContext.GetMatchedToken("return");
			var NewTree :SyntaxTree = new SyntaxTree(Pattern, TokenContext.NameSpace, Token);
			NewTree.SetMatchedPatternAt(ReturnExpr, TokenContext, "$Expression", Optional);
			return NewTree;
		}
	
		TypeReturn(Gamma :TypeEnv, Tree :SyntaxTree, TypeInfo :KonohaType) :TypedNode {
			var Expr :TypedNode = Tree.TypeNodeAt(ReturnExpr, Gamma, Gamma.ReturnType, 0);
			if(Expr.IsError()) {
				return Expr;
			}
			return new ReturnNode(Expr.TypeInfo, Expr);
		}
		
		ParseVarDecl(Pattern :SyntaxPattern, LeftTree :SyntaxTree, TokenContext :TokenContext) :SyntaxTree {
			P("ParseVarDecl :Entering..");
			var Tree :SyntaxTree = new SyntaxTree(Pattern, TokenContext.NameSpace, TokenContext.GetToken());
			Tree.SetMatchedPatternAt(VarDeclType, TokenContext, "$Type", Required);
			Tree.SetMatchedPatternAt(VarDeclName, TokenContext, "$Variable", Required);
			if(TokenContext.MatchToken("=")) {
				Tree.SetMatchedPatternAt(VarDeclValue, TokenContext, "$Expression", Required);
			}
			while(TokenContext.MatchToken(",")) {
				var NextTree :SyntaxTree = new SyntaxTree(Pattern, TokenContext.NameSpace, Tree.KeyToken);
				NextTree.SetAt(VarDeclType, Tree.GetSyntaxTreeAt(VarDeclType));
				Tree.LinkNode(NextTree);
				Tree = NextTree;
				Tree.SetMatchedPatternAt(VarDeclName, TokenContext, "$Variable", Required);
				if(TokenContext.MatchToken("=")) {
					Tree.SetMatchedPatternAt(VarDeclValue, TokenContext, "$Expression", Required);
				}
			}
			return Tree;
		}
	
		ParseMethodDecl(Pattern :SyntaxPattern, LeftTree :SyntaxTree, TokenContext :TokenContext) :SyntaxTree {
			var Tree :SyntaxTree = new SyntaxTree(Pattern, TokenContext.NameSpace, TokenContext.GetToken());
			Tree.SetMatchedPatternAt(MethodDeclReturnType, TokenContext, "$Type", Required);
			Tree.SetMatchedPatternAt(MethodDeclClass, TokenContext, "$MethodClass", Optional);
			Tree.SetMatchedPatternAt(MethodDeclName, TokenContext, "$MethodName", Required);
			Tree.SetMatchedTokenAt(NoWhere, TokenContext, "(", Required);
			var ParamBase :number = MethodDeclParam;
			while(!Tree.IsEmptyOrError() && !TokenContext.MatchToken(")")) {
				Tree.SetMatchedPatternAt(ParamBase + VarDeclType, TokenContext, "$Type", Required);
				Tree.SetMatchedPatternAt(ParamBase + VarDeclName, TokenContext, "$Symbol", Required);
				if(TokenContext.MatchToken("=")) {
					Tree.SetMatchedPatternAt(ParamBase + VarDeclValue, TokenContext, "$Expression", Required);
				}
				ParamBase += 3;
			}
			Tree.SetMatchedPatternAt(MethodDeclBlock, TokenContext, "$Block", Required);
			return Tree;
		}
	
	// TypeVarDecl(Gamma :TypeEnv, Tree :SyntaxTree, TypeInfo :KonohaType) :TypedNode {		
	// var VarType :KonohaType = Tree.GetTokenType(VarDeclTypeOffset, null);
	// var VarToken :KonohaToken = Tree.GetAtToken(VarDeclNameOffset);
	// var VarName :string = Tree.GetTokenString(VarDeclNameOffset, null);
	// if(VarType.equals(Gamma.VarType)) {
	// return new ErrorNode(TypeInfo, VarToken, "cannot infer variable type");
	// }
	// assert (VarName != null);
	// Gamma.AppendLocalType(VarType, VarName);
	// var Value :TypedNode = Tree.TypeNodeAt(2, Gamma, VarType, 0);
	// return new LetNode(VarType, VarToken, Value, null);
	// }
	//
	// TypeMethodDecl(Gamma :TypeEnv, Tree :SyntaxTree, TypeInfo :KonohaType) :TypedNode {
	// System.err.println("@@@@@ " + Tree);
	// var BaseType :KonohaType = Tree.GetTokenType(MethodDeclClass, null);
	// if(BaseType == null) {
	// BaseType = Tree.TreeNameSpace.GetGlobalObject().TypeInfo;
	// }
	// var MethodName :string = Tree.GetTokenString(MethodDeclName, "new");
	// var ParamSize :number = Tree.TreeList.size() - MethodDeclParam;
	// KonohaType[] ParamData = new KonohaType[ParamSize + 1];
	// String[] ArgNames = new String[ParamSize + 1];
	// ParamData[0] = Tree.GetTokenType(MethodDeclReturnType, Gamma.VarType);
	// for(var i :number = 0; i < ParamSize; i++) {
	// var ParamNode :SyntaxTree = (SyntaxTree) Tree.TreeList.get(MethodDeclParam + i);
	// var ParamType :KonohaType = ParamNode.GetTokenType(VarDeclType, Gamma.VarType);
	// ParamData[i + 1] = ParamType;
	// ArgNames[i] = ParamNode.GetTokenString(VarDeclName, "");
	// }
	// var Param :KonohaParam = new KonohaParam(ParamSize + 1, ParamData, ArgNames);
	// var NewMethod :KonohaMethod = new KonohaMethod(
	// 0,
	// BaseType,
	// MethodName,
	// Param,
	// Tree.TreeNameSpace,
	// Tree.GetTokenList(MethodDeclBlock));
	// BaseType.DefineNewMethod(NewMethod);
	// return new DefineNode(TypeInfo, Tree.KeyToken, NewMethod);
	// }
	
	
	// ParseUNUSED(Pattern :SyntaxPattern, LeftTree :SyntaxTree, TokenContext :TokenContext) :SyntaxTree {
	// P("** Syntax " + Tree.Pattern + " is undefined **");
	// return NoMatch;
	// }
	//
	// TypeUNUSED(Gamma :TypeEnv, Tree :SyntaxTree, TypeInfo :KonohaType) :TypedNode {
	// P("** Syntax " + Tree.Pattern + " is undefined **");
	// return null;
	// }
	
		LoadDefaultSyntax(NameSpace :KonohaNameSpace) :void {
			// Types :Define
			var KonohaContext :KonohaContext = NameSpace.KonohaContext;
			NameSpace.DefineSymbol("void", KonohaContext.VoidType); // FIXME
			NameSpace.DefineSymbol("boolean", KonohaContext.BooleanType);
			NameSpace.DefineSymbol("Object", KonohaContext.ObjectType);
			NameSpace.DefineSymbol("int", KonohaContext.IntType);
			NameSpace.DefineSymbol("String", KonohaContext.StringType);
	
			// Constants :Define
			NameSpace.DefineSymbol("true", new Boolean(true));
			NameSpace.DefineSymbol("false", new Boolean(false));
	
			NameSpace.DefineTokenFunc(" \t", function(this, "WhiteSpaceToken"));
			NameSpace.DefineTokenFunc("\n", function(this, "IndentToken"));
			NameSpace.DefineTokenFunc("(){}[]<>,;+-*/%=&|!", function(this, "SingleSymbolToken"));
			NameSpace.DefineTokenFunc("Aa", function(this, "SymbolToken"));
			NameSpace.DefineTokenFunc(".", function(this, "MemberToken"));
			NameSpace.DefineTokenFunc("\"", function(this, "StringLiteralToken"));
			NameSpace.DefineTokenFunc("1", function(this, "NumberLiteralToken"));
	
			var ParseUniary :KonohaFunc = function(this, "ParseUniary");
			var ParseBinary :KonohaFunc = function(this, "ParseBinary");
			var TypeApply :KonohaFunc = function(this, "TypeApply");
	
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
			//NameSpace.DefineSyntaxPattern("{}", 0, this, "UNUSED");
			var TypeConst :KonohaFunc = function(this, "TypeConst");
			
			NameSpace.DefineSyntaxPattern("$Symbol", function(this, "ParseSymbol"), function(this, "TypeVariable"));
			NameSpace.DefineSyntaxPattern("$Type", function(this, "ParseType"), TypeConst);
			
			NameSpace.DefineSyntaxPattern("$Const", function(this, "ParseConst"), function(this, "TypeSymbol"));
			NameSpace.DefineSyntaxPattern("$StringLiteral", function(this, "ParseStringLiteral"), TypeConst);
			NameSpace.DefineSyntaxPattern("$IntegerLiteral", function(this, "ParseIntegerLiteral"), TypeConst);
	
			NameSpace.DefineSyntaxPattern("(", function(this, "ParseParenthesis"), null);
	
			NameSpace.DefineSyntaxPattern("{", function(this, "ParseBlock"), function(this, "TypeBlock"));
			
			NameSpace.DefineSyntaxPattern("$Symbol", function(this, "ParseMethodDecl"), function(this, "TypeMethodDecl"));
			NameSpace.DefineSyntaxPattern("$Symbol", function(this, "ParseVarDecl"), function(this, "TypeVarDecl"));
	
			NameSpace.DefineSyntaxPattern("if", function(this, "ParseIf"), function(this, "TypeIf"));
			NameSpace.DefineSyntaxPattern("return", function(this, "ParseReturn"), function(this, "ParseReturn"));
	
			// Library :Load
			new KonohaInt().MakeDefinition(NameSpace);
			new KonohaStringDef().MakeDefinition(NameSpace);
			new KonohaSystemDef().MakeDefinition(NameSpace);
		}
	}
	
	
	class KonohaInt {
	
		MakeDefinition(ns :KonohaNameSpace) :void {
	// var BaseClass :KonohaType = ns.LookupHostLangType(Integer.class);
	// var BinaryParam :KonohaParam = KonohaParam.ParseOf(ns, "number :number x");
	// var UniaryParam :KonohaParam = KonohaParam.ParseOf(ns, "int");
	//
	// BaseClass.DefineMethod(ImmutableMethod | ConstMethod, "+", UniaryParam, this, "PlusInt");
	// BaseClass.DefineMethod(ImmutableMethod | ConstMethod, "+", BinaryParam, this, "IntAddInt");
	// BaseClass.DefineMethod(ImmutableMethod | ConstMethod, "-", UniaryParam, this, "MinusInt");
	// BaseClass.DefineMethod(ImmutableMethod | ConstMethod, "-", BinaryParam, this, "IntSubInt");
	// BaseClass.DefineMethod(ImmutableMethod | ConstMethod, "*", BinaryParam, this, "IntMulInt");
	// BaseClass.DefineMethod(ImmutableMethod | ConstMethod, "/", BinaryParam, this, "IntDivInt");
	// BaseClass.DefineMethod(ImmutableMethod | ConstMethod, "%", BinaryParam, this, "IntModInt");
	//
	// var RelationParam :KonohaParam = KonohaParam.ParseOf(ns, "number :boolean x");
	// BaseClass.DefineMethod(ImmutableMethod | ConstMethod, "<", RelationParam, this, "IntLtInt");
	// BaseClass.DefineMethod(ImmutableMethod | ConstMethod, "<=", RelationParam, this, "IntLeInt");
	// BaseClass.DefineMethod(ImmutableMethod | ConstMethod, ">", RelationParam, this, "IntGtInt");
	// BaseClass.DefineMethod(ImmutableMethod | ConstMethod, ">=", RelationParam, this, "IntGeInt");
	// BaseClass.DefineMethod(ImmutableMethod | ConstMethod, "==", RelationParam, this, "IntEqInt");
	// BaseClass.DefineMethod(ImmutableMethod | ConstMethod, "!=", RelationParam, this, "IntNeInt");
	//
	// // if(KonohaDebug.UseBuiltInTest) {
	// // assert (BaseClass.LookupMethod("+", 0) != null);
	// // assert (BaseClass.LookupMethod("+", 1) != null);
	// // assert (BaseClass.LookupMethod("+", 2) == null);
	// // var m :KonohaMethod = BaseClass.LookupMethod("+", 1);
	// // Object[] p = new Object[2];
	// // p[0] = new Integer(1);
	// // p[1] = new Integer(2);
	// // println("******* 1+2=" + m.Eval(p));
	// // }
		}
	
		function PlusInt(x :number) :number {
			return +x;
		}
	
		function IntAddInt(x :number, y :number) :number {
			return x + y;
		}
	
		function MinusInt(x :number) :number {
			return -x;
		}
	
		function IntSubInt(x :number, y :number) :number {
			return x - y;
		}
	
		function IntMulInt(x :number, y :number) :number {
			return x * y;
		}
	
		function IntDivInt(x :number, y :number) :number {
			return x / y;
		}
	
		function IntModInt(x :number, y :number) :number {
			return x % y;
		}
	
		function IntLtInt(x :number, y :number) :boolean {
			return x < y;
		}
	
		function IntLeInt(x :number, y :number) :boolean {
			return x <= y;
		}
	
		function IntGtInt(x :number, y :number) :boolean {
			return x > y;
		}
	
		function IntGeInt(x :number, y :number) :boolean {
			return x >= y;
		}
	
		function IntEqInt(x :number, y :number) :boolean {
			return x == y;
		}
	
		function IntNeInt(x :number, y :number) :boolean {
			return x != y;
		}
	}
	
	class KonohaStringDef {
	
		MakeDefinition(ns :KonohaNameSpace) :void {
	// var BaseClass :KonohaType = ns.LookupHostLangType(String.class);
	// var BinaryParam :KonohaParam = KonohaParam.ParseOf(ns, "String :string x");
	// BaseClass.DefineMethod(ImmutableMethod | ConstMethod, "+", BinaryParam, this, "StringAddString");
	//
	// var RelationParam :KonohaParam = KonohaParam.ParseOf(ns, "String :boolean x");
	// BaseClass.DefineMethod(ImmutableMethod | ConstMethod, "==", RelationParam, this, "StringEqString");
	// BaseClass.DefineMethod(ImmutableMethod | ConstMethod, "!=", RelationParam, this, "StringNeString");
	//
	// var indexOfParam :KonohaParam = KonohaParam.ParseOf(ns, "String :number x");
	// BaseClass.DefineMethod(ImmutableMethod | ConstMethod, "indexOf", indexOfParam, this, "StringIndexOf");
	//
	// var getSizeParam :KonohaParam = KonohaParam.ParseOf(ns, "int");
	// BaseClass.DefineMethod(ImmutableMethod | ConstMethod, "getSize", getSizeParam, this, "StringGetSize");
		}
	
		function StringAddString(x :string, y :string) :string {
			return x + y;
		}
	
		function StringEqString(x :string, y :string) :boolean {
			return x.equals(y);
		}
	
		function StringNeString(x :string, y :string) :boolean {
			return !x.equals(y);
		}
	
		function StringIndexOf(self :string, str :string) :number {
			return self.indexOf(str);
		}
	
		function StringGetSize(self :string) :number {
			return self.length();
		}
	}
	
	class KonohaSystemDef {
	
		MakeDefinition(NameSpace :KonohaNameSpace) :void {
	// var BaseClass :KonohaType = NameSpace.LookupHostLangType(KonohaSystemDef.class);
	// NameSpace.DefineSymbol("System", BaseClass);
	//
	// var param1 :KonohaParam = KonohaParam.ParseOf(NameSpace, "void x :string");
	// BaseClass.DefineMethod(StaticMethod, "p", param1, this, "p");
		}
	
		function p(x :string) :void {
			println(x);
		}
	
	}
	
	//class KonohaArrayDef {
	//
	// MakeDefinition(ns :KonohaNameSpace) :void {
	// //int :FIXME[] only
	// var BaseClass :KonohaType = ns.LookupHostLangType(int[].class);
	// var GetterParam :KonohaParam = KonohaParam.ParseOf(ns, "number :number i");
	// BaseClass.DefineMethod(ImmutableMethod, "get", GetterParam, this, "ArrayGetter");
	// var SetterParam :KonohaParam = KonohaParam.ParseOf(ns, "void i :number v :number");
	// BaseClass.DefineMethod(0, "set", SetterParam, this, "ArraySetter");
	// var GetSizeParam :KonohaParam = KonohaParam.ParseOf(ns, "int");
	// BaseClass.DefineMethod(ImmutableMethod | ConstMethod, "getSize", GetSizeParam, this, "ArrayGetSize");
	// }
	//
	// function ArrayGetter(int[] a, i :number) :number {
	// return a[i];
	// }
	//
	// function ArraySetter(int[] a, i :number, v :number) :void {
	// a[i] = v;
	// }
	//
	// function ArrayGetSize(int[] a) :number {
	// return a.length;
	// }
	//}
	
	class KonohaContext {
	
		RootNameSpace :KonohaNameSpace;
		DefaultNameSpace :KonohaNameSpace;
	
		VoidType :KonohaType;
		NativeObjectType :KonohaType;
		ObjectType :KonohaType;
		BooleanType :KonohaType;
		IntType :KonohaType;
		StringType :KonohaType;
		VarType :KonohaType;
	
		ClassNameMap :KonohaMap;
	
		KonohaContext(Grammar :KonohaGrammar, BuilderClassName :string) {
			this.ClassNameMap = new KonohaMap();
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
			if(BuilderClassName != null) {
				this.DefaultNameSpace.LoadBuilder(BuilderClassName);
			}
		}
	
		LookupHostLangType(Class<?> ClassInfo) :KonohaType {
			var TypeInfo :KonohaType = (KonohaType) this.ClassNameMap.get(ClassInfo.getName());
			if(TypeInfo == null) {
				TypeInfo = new KonohaType(this, ClassInfo);
				this.ClassNameMap.put(ClassInfo.getName(), TypeInfo);
			}
			return TypeInfo;
		}
	
		Define(Symbol :string, Value :Object) :void {
			this.RootNameSpace.DefineSymbol(Symbol, Value);
		}
	
		Eval(text :string, FileLine :number) :Object {
			return this.DefaultNameSpace.Eval(text, FileLine);
		}
	
		function main(String[] argc) :void {
			var KonohaContext :KonohaContext = new KonohaContext(new KonohaGrammar(), null);
			//KonohaContext.Eval("f(a :number, b :number) :number { return a + b; }", 0);
			KonohaContext.Eval("1 + 2 * 3", 0);
	
		}
	
	}
	
	class GreenTeaScript {
	
	}
}