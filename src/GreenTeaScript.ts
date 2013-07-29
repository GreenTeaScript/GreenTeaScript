module GreenScript {

////ifdef JAVA
//import java.lang.reflect.InvocationTargetException;
//import java.lang.reflect.Method;
//import java.lang.reflect.Modifier;
//import java.util.ArrayList;
//import java.util.HashMap;
//
//interface GtConst {
//endif VAJA

	// ClassFlag
	var PrivateClass :number = 1 << 0;
	var SingletonClass :number = 1 << 1;
	var FinalClass :number = 1 << 2;
	var GtClass :number = 1 << 3;
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

	var NullChar :number = 0;
	var UndefinedChar :number = 1;
	var DigitChar :number = 2;
	var UpperAlphaChar :number = 3;
	var LowerAlphaChar :number = 4;
	var UnderBarChar :number = 5;
	var NewLineChar :number = 6;
	var TabChar :number = 7;
	var SpaceChar :number = 8;
	var OpenParChar :number = 9;
	var CloseParChar :number = 10;
	var OpenBracketChar :number = 11;
	var CloseBracketChar :number = 12;
	var OpenBraceChar :number = 13;
	var CloseBraceChar :number = 14;
	var LessThanChar :number = 15;
	var GreaterThanChar :number = 16;
	var QuoteChar :number = 17;
	var DoubleQuoteChar :number = 18;
	var BackQuoteChar :number = 19;
	var SurprisedChar :number = 20;
	var SharpChar :number = 21;
	var DollarChar :number = 22;
	var PercentChar :number = 23;
	var AndChar :number = 24;
	var StarChar :number = 25;
	var PlusChar :number = 26;
	var CommaChar :number = 27;
	var MinusChar :number = 28;
	var DotChar :number = 29;
	var SlashChar :number = 30;
	var ColonChar :number = 31;
	var SemiColonChar :number = 32;
	var EqualChar :number = 33;
	var QuestionChar :number = 34;
	var AtmarkChar :number = 35;
	var VarChar :number = 36;
	var ChilderChar :number = 37;
	var BackSlashChar :number = 38;
	var HatChar :number = 39;
	var UnicodeChar :number = 40;
	var MaxSizeOfChars :number = 41;

	CharMatrix :number[] = [ 
			0,
			1,
			
			1, 1, 1, 1, 1, 1, 1, 1,
			
			1, 1, 1, 1, 1, 1, 1, 1,
			
			SpaceChar, SurprisedChar, DoubleQuoteChar, SharpChar, DollarChar, PercentChar, AndChar, QuoteChar,
			
			OpenParChar, CloseParChar, StarChar, PlusChar, CommaChar, MinusChar, DotChar, SlashChar,
			
			DigitChar, DigitChar, DigitChar, DigitChar, DigitChar, DigitChar, DigitChar, DigitChar,
			
			DigitChar, DigitChar, ColonChar, SemiColonChar, LessThanChar, EqualChar, GreaterThanChar, QuestionChar,
			
			AtmarkChar, UpperAlphaChar, UpperAlphaChar, UpperAlphaChar, UpperAlphaChar, UpperAlphaChar, UpperAlphaChar, UpperAlphaChar,
			
			UpperAlphaChar, UpperAlphaChar, UpperAlphaChar, UpperAlphaChar, UpperAlphaChar, UpperAlphaChar, UpperAlphaChar, UpperAlphaChar,
			
			UpperAlphaChar, UpperAlphaChar, UpperAlphaChar, UpperAlphaChar, UpperAlphaChar, UpperAlphaChar, UpperAlphaChar, UpperAlphaChar,
			
			UpperAlphaChar, UpperAlphaChar, UpperAlphaChar, OpenBracketChar, BackSlashChar, CloseBracketChar, HatChar, UnderBarChar,
			
			BackQuoteChar, LowerAlphaChar, LowerAlphaChar, LowerAlphaChar, LowerAlphaChar, LowerAlphaChar, LowerAlphaChar, LowerAlphaChar,
			
			LowerAlphaChar, LowerAlphaChar, LowerAlphaChar, LowerAlphaChar, LowerAlphaChar, LowerAlphaChar, LowerAlphaChar, LowerAlphaChar,
			
			LowerAlphaChar, LowerAlphaChar, LowerAlphaChar, LowerAlphaChar, LowerAlphaChar, LowerAlphaChar, LowerAlphaChar, LowerAlphaChar,
			
			LowerAlphaChar, LowerAlphaChar, LowerAlphaChar, OpenBraceChar, VarChar, CloseBraceChar, ChilderChar, 1, 
		];
	
	var NullToken :GtToken = new GtToken("", 0);

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
// var UniaryOperator :number = 1; 
// var Statement :number = 1; 
	var BinaryOperator :number = 1 << 1;
// var SuffixOperator :number = 1 << 2;
	var LeftJoin :number = 1 << 3;
// var MetaPattern :number = 1 << 4;
	var PrecedenceShift :number = 5;
	var Precedence_CStyleValue :number = (1 << PrecedenceShift);
	var Precedence_CPPStyleScope :number = (50 << PrecedenceShift);
	var Precedence_CStyleSuffixCall :number = (100 << PrecedenceShift); 
	var Precedence_CStylePrefixOperator :number = (200 << PrecedenceShift); 
	// Precedence_CppMember = 300; 
	var Precedence_CStyleMUL :number = (400 << PrecedenceShift); 
	var Precedence_CStyleADD :number = (500 << PrecedenceShift); 
	var Precedence_CStyleSHIFT :number = (600 << PrecedenceShift); 
	var Precedence_CStyleCOMPARE :number = (700 << PrecedenceShift);
	var Precedence_CStyleEquals :number = (800 << PrecedenceShift);
	var Precedence_CStyleBITAND :number = (900 << PrecedenceShift);
	var Precedence_CStyleBITXOR :number = (1000 << PrecedenceShift);
	var Precedence_CStyleBITOR :number = (1100 << PrecedenceShift);
	var Precedence_CStyleAND :number = (1200 << PrecedenceShift);
	var Precedence_CStyleOR :number = (1300 << PrecedenceShift);
	var Precedence_CStyleTRINARY :number = (1400 << PrecedenceShift); 
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
	// TypeCheckPolicy_CONST = (1 << 4), 
	// TypeCheckPolicy_Creation = (1 << 6) 
	//} TypeCheckPolicy;

	var GlobalConstName :string = "global";

	var EmptyList :any[] = [];

	// debug flags
	var UseBuiltInTest :boolean = true;
	var DebugPrnumber :boolean = false;

////ifdef JAVA
//}
//
//class GtStatic implements GtConst {
//endif VAJA
	
	function println(msg :string) :void {
		System.out.println(msg);		
	}
	
	function P(msg :string) :void {
		println("DEBUG: " + msg);
	}

	function TODO(msg :string) :void {
		println("TODO: " + msg);
	}

	function ListSize(a :any[]) :number {
		return (a == null) ? 0 : a.size();
	}
	
	function IsFlag(flag :number, flag2 :number) :boolean {
		return ((flag & flag2) == flag2);
	}
	
	function IsWhitespace(ch :number) :boolean {
		return Character.isWhitespace(ch);
	}
	
	function IsLetter(ch :number) :boolean {
		return Character.isLetter(ch);
	}
	
	function IsDigit(ch :number) :boolean {
		return Character.isDigit(ch);
	}
	
	function FromJavaChar(c :number) :number {
		if(c < 128) {
			return CharMatrix[c];
		}
		return UnicodeChar;
	}

	function LookupMethod(Callee :Object, MethodName :string) :Method {
		if(MethodName != null) {
			// GtDebug.P("looking up method : " + Callee.getClass().getSimpleName() + "." + MethodName);
			Method[] methods = Callee.getClass().getMethods();
			for(var i :number = 0; i < methods.length; i++) {
				if(MethodName.equals(methods[i].getName())) {
					return methods[i];
				}
			}
			P("method not found: " + Callee.getClass().getSimpleName() + "." + MethodName);
		}
		return null; 
	}

	function FunctionA(Callee :Object, MethodName :string) :(a :TokenContext, b :string, c :number) => number {
		return new (a :TokenContext, b :string, c :number) => number(Callee, LookupMethod(Callee, MethodName));
	}

	function FunctionB(Callee :Object, MethodName :string) :(a :SyntaxPattern, b :SyntaxTree, c :TokenContext) => SyntaxTree {
		return new (a :SyntaxPattern, b :SyntaxTree, c :TokenContext) => SyntaxTree(Callee, LookupMethod(Callee, MethodName));
	}
	
	function FunctionC(Callee :Object, MethodName :string) :(a :TypeEnv, b: SyntaxTree, c: GtType) => TypedNode {
		return new (a :TypeEnv, b: SyntaxTree, c: GtType) => TypedNode(Callee, LookupMethod(Callee, MethodName));
	}

	function EqualsMethod(m1 :Method, m2 :Method) :boolean {
		if(m1 == null) {
			return (m2 == null) ? true : false;
		} else {
			return (m2 == null) ? false : m1.equals(m2);
		}
	}
	
	function CreateOrReuseTokenFunc(f :(a :TokenContext, b :string, c :number) => number, prev :TokenFunc) :TokenFunc {
		if(prev != null && EqualsMethod(prev.Func.Method, f.Method)) {
			return prev;
		}
		return new TokenFunc(f, prev);
	}

	function ApplyTokenFunc(TokenFunc :TokenFunc, TokenContext :TokenContext, ScriptSource :string, Pos :number) :number {
		try {
			while(TokenFunc != null) {
				var f :(a :TokenContext, b :string, c :number) => number = TokenFunc.Func;
				var NextIdx :number = ((Integer)f.Method.invoke(f.Self, TokenContext, ScriptSource, Pos)).intValue();
				if(NextIdx > Pos) return NextIdx;
				TokenFunc = TokenFunc.ParentFunc;
			}
		}
		catch (e :InvocationTargetException) {
			e.printStackTrace();
		}
		catch (e :IllegalArgumentException) {
			e.printStackTrace();
		} 
		catch (e :IllegalAccessException) {
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
				var f :(a :SyntaxPattern, b :SyntaxTree, c :TokenContext) => SyntaxTree = Pattern.MatchFunc;
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
		catch (e :InvocationTargetException) {
			e.printStackTrace();
		}
		catch (e :IllegalArgumentException) {
			e.printStackTrace();
		} 
		catch (e :IllegalAccessException) {
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
	function ApplyTypeFunc(TypeFunc :(a :TypeEnv, b: SyntaxTree, c: GtType) => TypedNode, Gamma :TypeEnv, ParsedTree :SyntaxTree, TypeInfo :GtType) :TypedNode {
		try {
			return (TypedNode)TypeFunc.Method.invoke(TypeFunc.Self, Gamma, ParsedTree, TypeInfo);
		}
		catch (e :InvocationTargetException) {
			e.printStackTrace();
		}
		catch (e :IllegalArgumentException) {
			e.printStackTrace();
		} 
		catch (e :IllegalAccessException) {
			e.printStackTrace();
		}
		//Node = Gamma.NewErrorNode(Tree.KeyToken, "internal error: " + e + "\n\t" + e.getCause().toString());
		return null;
	}

////ifdef JAVA
//}
//
//final class GtArray {
//	private final ArrayList<Object>	List;
//
//	public GtArray() {
//		this.List = new ArrayList<Object>();
//	}
//
//	public GtArray(int DefaultSize) {
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
//final class GtMap {
//	private final HashMap<String, Object>	Map;
//
//	public GtMap() {
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
//final class GtFuncA {
//	public Object	Self;
//	public Method	Method;
//	GtFuncA(Object Self, Method method) {
//		this.Self = Self;
//		this.Method = method;
//	}
//	@Override public String toString() {
//		return this.Method.toString();
//	}
//}
//
//final class GtFuncB {
//	public Object	Self;
//	public Method	Method;
//	GtFuncB(Object Self, Method method) {
//		this.Self = Self;
//		this.Method = method;
//	}
//	@Override public String toString() {
//		return this.Method.toString();
//	}
//}
//
//final class GtFuncC {
//	public Object	Self;
//	public Method	Method;
//	GtFuncC(Object Self, Method method) {
//		this.Self = Self;
//		this.Method = method;
//	}
//	@Override public String toString() {
//		return this.Method.toString();
//	}
//}
//
//
//endif VAJA

// tokenizer

	class GtToken {
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
		Func :(a :TokenContext, b :string, c :number) => number;
		ParentFunc :TokenFunc;
	
		constructor(Func :(a :TokenContext, b :string, c :number) => number, prev :TokenFunc) {
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
		NameSpace :GtNameSpace;
		SourceList :any[];
		Pos :number;
		ParsingLine :number;
		ParseFlag :number;
	
		constructor(NameSpace :GtNameSpace, Text :string, FileLine :number) {
			this.NameSpace = NameSpace;
			this.SourceList = [];
			this.Pos = 0;
			this.ParsingLine = FileLine;
			this.ParseFlag = 0;
			AddNewToken(Text, SourceTokenFlag, null);
		}
	
		AddNewToken(Text :string, TokenFlag :number, PatternName :string) :GtToken {
			var Token :GtToken = new GtToken(Text, this.ParsingLine);
			Token.TokenFlag |= TokenFlag;
			if(PatternName != null) {
				Token.PresetPattern = this.NameSpace.GetPattern(PatternName);
				assert(Token.PresetPattern != null);
			}
			this.SourceList.push(Token);
			return Token;
		}
	
		FoundWhiteSpace() :void {
			var Token :GtToken = GetToken();
			Token.TokenFlag |= WhiteSpaceTokenFlag;
		}
		
		FoundLineFeed(line :number) :void {
			this.ParsingLine += line;
		}
	
		ReportTokenError(Level :number, Message :string, TokenText :string) :void {
			var Token :GtToken = this.AddNewToken(TokenText, 0, "$ErrorToken");
			this.NameSpace.ReportError(Level, Token, Message);
		}
		
		NewErrorSyntaxTree(Token :GtToken, Message :string) :SyntaxTree {
			if(!IsAllowedTrackback()) {
				this.NameSpace.ReportError(ErrorLevel, Token, Message);
				var ErrorTree :SyntaxTree = new SyntaxTree(Token.PresetPattern, this.NameSpace, Token);
				return ErrorTree;
			}
			return null;
		}
		
		GetBeforeToken() :GtToken {
			for(var pos :number = this.Pos - 1; pos >= 0; pos--) {
				var Token :GtToken = (GtToken)this.SourceList[pos];
				if(IsFlag(Token.TokenFlag, IndentTokenFlag)) {
					continue;
				}
				return Token;
			}
			return null;
		}
	
		ReportExpectedToken(TokenText :string) :SyntaxTree {
			if(!IsAllowedTrackback()) {
				var Token :GtToken = GetBeforeToken();
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
		
		DispatchFunc(ScriptSource :string, GtChar :number, pos :number) :number {
			var TokenFunc :TokenFunc = this.NameSpace.GetTokenFunc(GtChar);
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
				var knumber :number = FromJavaChar(ScriptSource.charAt(pos));
				var pos2 :number = DispatchFunc(ScriptSource, kchar, pos);
				if(!(pos < pos2)) {
					break;
				}
				pos = pos2;
			}
			Dump();
		}
	
		GetToken() :GtToken {
			while((this.Pos < this.SourceList.size())) {
				var Token :GtToken = (GtToken)this.SourceList[this.Pos];
				if(Token.IsSource()) {
					this.SourceList.pop();
					Tokenize(Token.ParsedText, Token.FileLine);
					Token = (GtToken)this.SourceList[this.Pos];
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
	
		Next() :GtToken {
			var Token :GtToken = GetToken();
			this.Pos += 1;
			return Token;
		}
	
		GetPattern(PatternName :string) :SyntaxPattern {
			return this.NameSpace.GetPattern(PatternName);
		}
	
		GetFirstPattern() :SyntaxPattern {
			var Token :GtToken = GetToken();
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
			var Token :GtToken = GetToken();
			var Pattern :SyntaxPattern = this.NameSpace.GetExtendedPattern(Token.ParsedText);
			return Pattern;		
		}
		
		MatchToken(TokenText :string) :boolean {
			var Token :GtToken = GetToken();
			if(Token.EqualsText(TokenText)) {
				this.Pos += 1;
				return true;
			}
			return false;
		}
	
		GetMatchedToken(TokenText :string) :GtToken {
			var Token :GtToken = GetToken();
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
			Token :GtToken;
			while((Token = GetToken()) != NullToken) {
				if(Token.IsIndent() || Token.IsDelim()) {
					this.Pos += 1;
					continue;
				}
				break;
			}
			return (Token != NullToken);
		}
		
		Dump() :void {
			for(pos = this.Pos ; pos < this.SourceList.size(); pos++) :number {
				P("["+pos+"]\t" + this.SourceList[pos]);
			}
		}
	}
	
	class SyntaxPattern {
	
		PackageNameSpace :GtNameSpace;
		PatternName :string;
		SyntaxFlag :number;
	
		MatchFunc :(a :SyntaxPattern, b :SyntaxTree, c :TokenContext) => SyntaxTree;
		TypeFunc :(a :TypeEnv, b: SyntaxTree, c: GtType) => TypedNode;
		ParentPattern :SyntaxPattern;
		
		constructor(NameSpace :GtNameSpace, PatternName :string, MatchFunc :(a :SyntaxPattern, b :SyntaxTree, c :TokenContext) => SyntaxTree, TypeFunc :(a :TypeEnv, b: SyntaxTree, c: GtType) => TypedNode) {
			this.PackageNameSpace = NameSpace;
			this.PatternName = PatternName;
			this.SyntaxFlag = 0;
			this.MatchFunc = MatchFunc;
			this.TypeFunc = TypeFunc;
			this.ParentPattern = null;
		}
	
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
		
	}
	
	class SyntaxTree {
		ParentTree :SyntaxTree;
		PrevTree :SyntaxTree;
		NextTree :SyntaxTree;
	
		TreeNameSpace :GtNameSpace;
		Pattern :SyntaxPattern;
		KeyToken :GtToken;
		TreeList :any[];
	
		constructor(Pattern :SyntaxPattern, NameSpace :GtNameSpace, KeyToken :GtToken) {
			this.TreeNameSpace = NameSpace;
			this.KeyToken = KeyToken;
			this.Pattern = Pattern;
			this.ParentTree = null;
			this.PrevTree = null;
			this.NextTree = null;
			this.TreeList = null;
		}
	
		toString() :string {
			var key :string = this.KeyToken.ParsedText + ":" + ((this.Pattern != null) ? this.Pattern.PatternName : "null");
			var sb :StringBuilder = new StringBuilder();
			sb.append("(");
			sb.append(key);
			if(this.TreeList != null) {
				for(i = 0; i < this.TreeList.size(); i++) :number {
					var o :Object = this.TreeList[i];
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
	
		LinkNode(Tree :SyntaxTree) :void {
			Tree.PrevTree = this;
			this.NextTree = Tree;
		}
		
		IsError() :boolean {
			return this.KeyToken.IsError();
		}
	
		ToError(Token :GtToken) :void {
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
						this.TreeList = [];
					}
					if(Index < this.TreeList.size()) {
						this.TreeList[Index] = Value;
						return;
					}
					while(this.TreeList.size() < Index) {
						this.TreeList.push(null);
					}
					this.TreeList.push(Value);
				}
			}
		}
		
		GetSyntaxTreeAt(Index :number) :SyntaxTree {
			return (SyntaxTree) this.TreeList[Index];
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
				var Token :GtToken = TokenContext.Next();
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
						this.TreeList = [];
					}
					this.TreeList.push(Tree);
				}
			}
		}
	
		TypeNodeAt(Index :number, Gamma :TypeEnv, TypeInfo :GtType, TypeCheckPolicy :number) :TypedNode {
			if(this.TreeList != null && Index < this.TreeList.size()) {
				var NodeObject :Object = this.TreeList[Index];
				if(instanceof :NodeObject SyntaxTree) {
					var TypedNode :TypedNode = TypeEnv.TypeCheck(Gamma, (SyntaxTree) NodeObject, TypeInfo, TypeCheckPolicy);
					this.TreeList[Index] = TypedNode;
					return TypedNode;
				}
			}
			return new ErrorNode(TypeInfo, this.KeyToken, "syntax tree error: " + Index);
		}
	
	}
	
	
	
	class GtType {
		GtContext :GtContext;
		ClassFlag :number;
		ShortClassName :string;
		BaseClass :GtType;
		SuperClass :GtType;
		ClassParam :GtParam;
		SearchSimilarClass :GtType;
		ClassMethodList :any[];
		SearchSuperMethodClass :GtType;
		DefaultNullValue :Object;
		LocalSpec :Object;
	
		constructor(GtContext :GtContext, ClassFlag :number, ClassName :string, Spec :Object) {
			this.GtContext = GtContext;
			this.ClassFlag = ClassFlag;
			this.ShortClassName = ClassName;
			this.SuperClass = null;
			this.BaseClass = this;
			this.ClassMethodList = EmptyList;
			this.LocalSpec = Spec;
		}
	
	
		toString() :string {
			return this.ShortClassName;
		}
	
	
		Accept(TypeInfo :GtType) :boolean {
			if(this == TypeInfo) {
				return true;
			}
			return false;
		}
	
		AddMethod(Method :GtMethod) :void {
			if(this.ClassMethodList == EmptyList){
				this.ClassMethodList = [];
			}
			this.ClassMethodList.push(Method);
		}
	
		DefineMethod(MethodFlag :number, MethodName :string, Param :GtParam, Callee :Object, LocalName :string) :void {
			var Method :GtMethod = new GtMethod(MethodFlag, this, MethodName, Param, LookupMethod(Callee, LocalName));
			this.AddMethod(Method);
		}
	
		FindMethod(MethodName :string, ParamSize :number) :GtMethod {
			for(i = 0; i < this.ClassMethodList.size(); i++) :number {
				var Method :GtMethod = (GtMethod) this.ClassMethodList[i];
				if(Method.Match(MethodName, ParamSize)) {
					return Method;
				}
			}
			return null;
		}
	
		LookupMethod(MethodName :string, ParamSize :number) :GtMethod {
			var Method :GtMethod = this.FindMethod(MethodName, ParamSize);
			if(Method != null) {
				return Method;
			}
			if(this.SearchSuperMethodClass != null) {
				Method = this.SearchSuperMethodClass.LookupMethod(MethodName, ParamSize);
				if(Method != null) {
					return Method;
				}
			}
////ifdef JAVA
//		if(this.LocalSpec instanceof Class) {
//			if(this.CreateMethods(MethodName) > 0) {
//				return this.FindMethod(MethodName, ParamSize);
//			}
//		}
////endif JAVA
//		return null;
//	}
//
//	public boolean DefineNewMethod(GtMethod NewMethod) {
//		for(int i = 0; i < this.ClassMethodList.size(); i++) {
//			GtMethod DefinedMethod = (GtMethod) this.ClassMethodList.get(i);
//			if(NewMethod.Match(DefinedMethod)) {
//				return false;
//			}
//		}
//		this.AddMethod(NewMethod);
//		return true;
//	}
//
////ifdef JAVA
//	public GtType(GtContext GtContext, Class<?> ClassInfo) {
//		this(GtContext, 0, ClassInfo.getSimpleName(), null);
//		this.LocalSpec = ClassInfo;
//		// this.ClassFlag = ClassFlag;
//		Class<?> SuperClass = ClassInfo.getSuperclass();
//		if(ClassInfo != Object.class && SuperClass != null) {
//			this.SuperClass = GtContext.LookupHostLangType(ClassInfo.getSuperclass());
//		}
//	}
//
//	static GtMethod ConvertMethod(GtContext GtContext, Method Method) {
//		GtType ThisType = GtContext.LookupHostLangType(Method.getClass());
//		Class<?>[] ParamTypes = Method.getParameterTypes();
//		GtType[] ParamData = new GtType[ParamTypes.length + 1];
//		String[] ArgNames = new String[ParamTypes.length + 1];
//		ParamData[0] = GtContext.LookupHostLangType(Method.getReturnType());
//		for(int i = 0; i < ParamTypes.length; i++) {
//			ParamData[i + 1] = GtContext.LookupHostLangType(ParamTypes[i]);
//			ArgNames[i] = "arg" + i;
//		}
//		GtParam Param = new GtParam(ParamData.length, ParamData, ArgNames);
//		GtMethod Mtd = new GtMethod(0, ThisType, Method.getName(), Param, Method);
//		ThisType.AddMethod(Mtd);
//		return Mtd;
//	}
//
//	int CreateMethods(String MethodName) {
//		int Count = 0;
//		Method[] Methods = ((Class<?>)this.LocalSpec).getMethods();
//		for(int i = 0; i < Methods.length; i++) {
//			if(MethodName.equals(Methods[i].getName())) {
//				GtType.ConvertMethod(this.GtContext, Methods[i]);
//				Count = Count + 1;
//			}
//		}
//		return Count;
//	}
//
//	public boolean RegisterCompiledMethod(GtMethod NewMethod) {
//		for(int i = 0; i < this.ClassMethodList.size(); i++) {
//			GtMethod DefinedMethod = (GtMethod) this.ClassMethodList.get(i);
//			if(NewMethod.Match(DefinedMethod)) {
//				this.ClassMethodList.set(i, NewMethod);
//				return true;
//			}
//		}
//		return false;
//	}
	//endif VAJA
	}
	
	class GtSymbol {
	
		function IsGetterSymbol(SymbolId :number) :boolean {
			return (SymbolId & GetterSymbolMask) == GetterSymbolMask;
		}
	
		function ToSetterSymbol(SymbolId :number) :number {
			assert(IsGetterSymbol(SymbolId));
			return (SymbolId & (~GetterSymbolMask)) | SetterSymbolMask;
		}
	
		// SymbolTable
	
		var SymbolList :any[] = [];
		var SymbolMap :object = {};
	
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
			var SymbolObject :Integer = (Integer)SymbolMap[Key];
			if(SymbolObject == null) {
				if(DefaultSymbolId == AllowNewId) {
					var SymbolId :number = SymbolList.size();
					SymbolList.push(Key);
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
	
	class GtParam {
		var MAX :number = 16;
		var VariableParamSize :number = -1;
		ReturnSize :number;
		GtType[] Types;
		String[] ArgNames;
	
		GtParam(DataSize :number, ParamData :GtType[], String[] ArgNames) {
			this.ReturnSize = 1;
			this.Types = new GtType[DataSize];
			this.ArgNames = new String[DataSize - this.ReturnSize];
			System.arraycopy(ParamData, 0, this.Types, 0, DataSize);
			System.arraycopy(ArgNames, 0, this.ArgNames, 0, DataSize - this.ReturnSize);
		}
	
		function ParseOf(ns :GtNameSpace, TypeList :string) :GtParam {
			TODO("ParseOfParam");
	// var BufferList :Tokens = ns.Tokenize(TypeList, 0);
	// var next :number = BufferList.size();
	// ns.PreProcess(BufferList, 0, next, BufferList);
	// GtType[] ParamData = new GtType[GtParam.MAX];
	// String[] ArgNames = new String[GtParam.MAX];
	// i :number, DataSize = 0, ParamSize = 0;
	// for(i = next; i < BufferList.size(); i++) {
	// var Token :GtToken = BufferList[i];
	// if(Token.instanceof :ResolvedObject GtType) {
	// ParamData[DataSize] = (GtType) Token.ResolvedObject;
	// DataSize++;
	// if(DataSize == GtParam.MAX)
	// break;
	// } else {
	// ArgNames[ParamSize] = Token.ParsedText;
	// ParamSize++;
	// }
	// }
	// return new GtParam(DataSize, ParamData, ArgNames);
			return null;
		}
	
		GetParamSize() :number {
			return this.Types.length - this.ReturnSize;
		};
	
		Match(Other :GtParam) :boolean {
			var ParamSize :number = Other.GetParamSize();
			if(ParamSize == this.GetParamSize()) {
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
	
////ifdef JAVA
//class GtMethodInvoker {
//	GtParam		Param;
//	public Object	CompiledCode;
//
//	public GtMethodInvoker(GtParam Param, Object CompiledCode) {
//		this.Param = Param;
//		this.CompiledCode = CompiledCode;
//
//	}
//
//	public Object Invoke(Object[] Args) {
//		return null;
//	}
//}
//
//class NativeMethodInvoker extends GtMethodInvoker {
//
//	public NativeMethodInvoker(GtParam Param, Method MethodRef) {
//		super(Param, MethodRef);
//	}
//
//	public Method GetMethodRef() {
//		return (Method) this.CompiledCode;
//	}
//
//	boolean IsStaticInvocation() {
//		return Modifier.isStatic(this.GetMethodRef().getModifiers());
//	}
//
//	@Override public Object Invoke(Object[] Args) {
//		int ParamSize = this.Param != null ? this.Param.GetParamSize() : 0;
//		try {
//			Method MethodRef = this.GetMethodRef();
//			if(this.IsStaticInvocation()) {
//				switch (ParamSize) {
//				case 0:
//					return MethodRef.invoke(null, Args[0]);
//				case 1:
//					return MethodRef.invoke(null, Args[0], Args[1]);
//				case 2:
//					return MethodRef.invoke(null, Args[0], Args[0], Args[2]);
//				case 3:
//					return MethodRef.invoke(null, Args[0], Args[0], Args[2], Args[3]);
//				case 4:
//					return MethodRef.invoke(null, Args[0], Args[1], Args[2], Args[3], Args[4]);
//				case 5:
//					return MethodRef.invoke(null, Args[0], Args[1], Args[2], Args[3], Args[4], Args[5]);
//				default:
//					return MethodRef.invoke(null, Args); // FIXME
//				}
//			} else {
//				switch (ParamSize) {
//				case 0:
//					return MethodRef.invoke(Args[0]);
//				case 1:
//					return MethodRef.invoke(Args[0], Args[1]);
//				case 2:
//					return MethodRef.invoke(Args[0], Args[0], Args[2]);
//				case 3:
//					return MethodRef.invoke(Args[0], Args[0], Args[2], Args[3]);
//				case 4:
//					return MethodRef.invoke(Args[0], Args[1], Args[2], Args[3], Args[4]);
//				case 5:
//					return MethodRef.invoke(Args[0], Args[1], Args[2], Args[3], Args[4], Args[5]);
//				default:
//					return MethodRef.invoke(Args[0], Args); // FIXME
//				}
//			}
//		} catch (IllegalArgumentException e) {
//			e.printStackTrace();
//		} catch (IllegalAccessException e) {
//			e.printStackTrace();
//		} catch (InvocationTargetException e) {
//			e.printStackTrace();
//		}
//		return null;
//	}
//}
	//endif VAJA
	
	class GtDef {
	
		MakeDefinition(NameSpace :GtNameSpace) :void {
			
		}
	
	}
	
	class GtMethod extends GtDef {
		ClassInfo :GtType;
		MethodName :string;
		MethodSymbolId :number;
		CanonicalSymbolId :number;
		Param :GtParam;
		MethodInvoker :GtMethodInvoker;
		MethodFlag :number;
	
		// DoLazyComilation();
		LazyNameSpace :GtNameSpace;
		SourceList :any[];
		//merge :FIXME field :ParsedTree in SouceList.
		ParsedTree :SyntaxTree;
	
		GtMethod(MethodFlag :number, ClassInfo :GtType, MethodName :string, Param :GtParam, MethodRef :Method) {
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
	
		GetReturnType(BaseType :GtType) :GtType {
			var ReturnType :GtType = this.Param.Types[0];
			return ReturnType;
		}
	
		GetParamType(BaseType :GtType, ParamIdx :number) :GtType {
			var ParamType :GtType = this.Param.Types[ParamIdx + this.Param.ReturnSize];
			return ParamType;
		}
	
		Match(Other :GtMethod) :boolean {
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
	
		Match(MethodName :string, ParamSize :number, GtType[] RequestTypes) :boolean {
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
			//GtDebug.P("ParamSize: " + ParamSize);
			return this.MethodInvoker.Invoke(ParamData);
		}
	
	// GtMethod(MethodFlag :number, ClassInfo :GtType, MethodName :string, Param :GtParam, LazyNameSpace :GtNameSpace, SourceList :Tokens) {
	// this(MethodFlag, ClassInfo, MethodName, Param, null);
	// this.LazyNameSpace = LazyNameSpace;
	// this.SourceList = SourceList;
	// }
	
		DoCompilation() :void {
	// if(this.MethodInvoker != null) {
	// return;
	// }
	// var Tree :SyntaxTree = this.ParsedTree;
	// var NS :GtNameSpace = this.LazyNameSpace;
	// if(Tree == null) {
	// var BufferList :Tokens = new Tokens();
	// NS.PreProcess(this.SourceList, 0, this.SourceList.size(), BufferList);
	// Tree = SyntaxTree.ParseNewNode(NS, null, BufferList, 0, BufferList.size(), AllowEmpty);
	// println("untyped tree: " + Tree);
	// }
	// var Gamma :TypeEnv = new TypeEnv(this.LazyNameSpace, this);
	// var TNode :TypedNode = TypeEnv.TypeCheck(Gamma, Tree, Gamma.VoidType, DefaultTypeCheckPolicy);
	// var Builder :GtBuilder = this.LazyNameSpace.GetBuilder();
	// this.MethodInvoker = Builder.Build(NS, TNode, this);
		}
	}
	
	class VarSet {
		TypeInfo :GtType;
		Name :string;
	
		VarSet(TypeInfo :GtType, Name :string) {
			this.TypeInfo = TypeInfo;
			this.Name = Name;
		}
	}
	
	class TypeEnv {
	
		GammaNameSpace :GtNameSpace;
	
		
		VoidType :GtType;
		BooleanType :GtType;
		IntType :GtType;
		StringType :GtType;
		VarType :GtType;
	
		TypeEnv(GammaNameSpace :GtNameSpace, Method :GtMethod) {
			this.GammaNameSpace = GammaNameSpace;
			this.VoidType = GammaNameSpace.GtContext.VoidType;
			this.BooleanType = GammaNameSpace.GtContext.BooleanType;
			this.IntType = GammaNameSpace.GtContext.IntType;
			this.StringType = GammaNameSpace.GtContext.StringType;
			this.VarType = GammaNameSpace.GtContext.VarType;
			this.Method = Method;
			if(Method != null) {
				this.InitMethod(Method);
			} else {
				// global
				this.ThisType = GammaNameSpace.GetGlobalObject().TypeInfo;
				this.AppendLocalType(this.ThisType, "this");
			}
		}
	
		Method :GtMethod;
		ReturnType :GtType;
		ThisType :GtType;
	
		InitMethod(Method :GtMethod) :void {
			this.ReturnType = Method.GetReturnType(Method.ClassInfo);
			this.ThisType = Method.ClassInfo;
			if(!Method.Is(StaticMethod)) {
				this.AppendLocalType(Method.ClassInfo, "this");
				var Param :GtParam = Method.Param;
				for(var i :number = 0; i < Param.ArgNames.length; i++) {
					this.AppendLocalType(Param.Types[i + Param.ReturnSize], Param.ArgNames[i]);
				}
			}
		}
	
		var LocalStackList :any[] = null;
	
		AppendLocalType(TypeInfo :GtType, Name :string) :void {
			if(this.LocalStackList == null) {
				this.LocalStackList = [];
			}
			this.LocalStackList.add(new VarSet(TypeInfo, Name));
		}
	
		GetLocalType(Symbol :string) :GtType {
			if(this.LocalStackList != null) {
				for(i = this.LocalStackList.size() - 1; i >= 0; i--) :number {
					var t :VarSet = (VarSet) this.LocalStackList[i];
					if(t.Name.equals(Symbol))
						return t.TypeInfo;
				}
			}
			return null;
		}
	
		GetLocalIndex(Symbol :string) :number {
			return -1;
		}
	
		GetDefaultTypedNode(TypeInfo :GtType) :TypedNode {
			return null; // TODO
		}
	
		NewErrorNode(KeyToken :GtToken, Message :string) :TypedNode {
			return new ErrorNode(this.VoidType, KeyToken, this.GammaNameSpace.ReportError(ErrorLevel, KeyToken, Message));
		}
	
		function TypeEachNode(Gamma :TypeEnv, Tree :SyntaxTree, TypeInfo :GtType) :TypedNode {
			var Node :TypedNode = ApplyTypeFunc(Tree.Pattern.TypeFunc, Gamma, Tree, TypeInfo);
			if(Node == null) {
				Node = Gamma.NewErrorNode(Tree.KeyToken, "undefined type checker: " + Tree.Pattern);
			}
			return Node;
		}
	
		function TypeCheckEachNode(Gamma :TypeEnv, Tree :SyntaxTree, TypeInfo :GtType, TypeCheckPolicy :number) :TypedNode {
			var Node :TypedNode = TypeEachNode(Gamma, Tree, TypeInfo);
			// if(Node.TypeInfo == null) {
			//
			// }
			return Node;
		}
	
		function TypeCheck(Gamma :TypeEnv, Tree :SyntaxTree, TypeInfo :GtType, TypeCheckPolicy :number) :TypedNode {
			var TPrevNode :TypedNode = null;
			while(Tree != null) {
				var CurrentTypeInfo :GtType = (Tree.NextTree != null) ? Gamma.VoidType : TypeInfo;
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
	
		TypeInfo :GtType;
		SourceToken :GtToken;
	
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
	
		TypedNode(TypeInfo :GtType, SourceToken :GtToken) {
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
	
	class UnaryNode extends TypedNode {
		Expr :TypedNode;
	
		UnaryNode(TypeInfo :GtType, Expr :TypedNode) {
			super(TypeInfo, null);
			this.Expr = Expr;
		}
	}
	
	class BinaryNode extends TypedNode {
		LeftNode :TypedNode;
		RightNode :TypedNode;
	
		BinaryNode(TypeInfo :GtType, OperatorToken :GtToken, Left :TypedNode, Right :TypedNode) {
			super(TypeInfo, OperatorToken);
			this.LeftNode = Left;
			this.RightNode = Right;
		}
	
	}
	
	class ErrorNode extends TypedNode {
		ErrorMessage :string;
	
		ErrorNode(TypeInfo :GtType, KeyToken :GtToken, ErrorMessage :string) {
			super(TypeInfo, KeyToken);
			this.ErrorMessage = KeyToken.ToErrorToken(ErrorMessage);
		}
	
		Evaluate(Visitor :NodeVisitor) :boolean {
			return Visitor.VisitError(this);
		}
	}
	
	class ConstNode extends TypedNode {
		ConstValue :Object;
	
		ConstNode(TypeInfo :GtType, SourceToken :GtToken, ConstValue :Object) {
			super(TypeInfo, SourceToken);
			this.ConstValue = ConstValue;
		}
	
		Evaluate(Visitor :NodeVisitor) :boolean {
			return Visitor.VisitConst(this);
		}
	
	}
	
	class FieldNode extends TypedNode {
		FieldName :string;
	
		FieldNode(TypeInfo :GtType, SourceToken :GtToken, FieldName :string) {
			super(TypeInfo, SourceToken);
			this.FieldName = FieldName;
		}
	
		GetFieldName() :string {
			return this.FieldName;
		}
	}
	
	class LocalNode extends FieldNode {
		LocalNode(TypeInfo :GtType, SourceToken :GtToken, FieldName :string) {
			super(TypeInfo, SourceToken, FieldName);
		}
	
		Evaluate(Visitor :NodeVisitor) :boolean {
			return Visitor.VisitLocal(this);
		}
	
	}
	
	class NullNode extends TypedNode {
		NullNode(TypeInfo :GtType) {
			super(TypeInfo, null);
		}
	
		Evaluate(Visitor :NodeVisitor) :boolean {
			return Visitor.VisitNull(this);
		}
	}
	
	class LetNode extends TypedNode {
		VarToken :GtToken;
		ValueNode :TypedNode;
		BlockNode :TypedNode;
	
		
		LetNode(TypeInfo :GtType, VarToken :GtToken, Right :TypedNode, Block :TypedNode) {
			super(TypeInfo, VarToken);
			this.VarToken = VarToken;
			this.ValueNode = Right;
			this.BlockNode = Block;
		}
	
		Evaluate(Visitor :NodeVisitor) :boolean {
			return Visitor.VisitLet(this);
		}
	}
	
	class AndNode extends BinaryNode {
		AndNode(TypeInfo :GtType, KeyToken :GtToken, Left :TypedNode, Right :TypedNode) {
			super(TypeInfo, KeyToken, Left, Right);
		}
	
		Evaluate(Visitor :NodeVisitor) :boolean {
			return Visitor.VisitAnd(this);
		}
	}
	
	class OrNode extends BinaryNode {
	
		OrNode(TypeInfo :GtType, KeyToken :GtToken, Left :TypedNode, Right :TypedNode) {
			super(TypeInfo, KeyToken, Left, Right);
		}
	
		Evaluate(Visitor :NodeVisitor) :boolean {
			return Visitor.VisitOr(this);
		}
	}
	
	class ApplyNode extends TypedNode {
		Method :GtMethod;
		Params :any[]; 
	
		
		ApplyNode(TypeInfo :GtType, KeyToken :GtToken, Method :GtMethod) {
			super(TypeInfo, KeyToken);
			this.Method = Method;
			this.Params = [];
		}
	
		ApplyNode(TypeInfo :GtType, KeyToken :GtToken, Method :GtMethod, arg1 :TypedNode) {
			super(TypeInfo, KeyToken);
			this.Method = Method;
			this.Params = [];
			this.Params.push(arg1);
		}
	
		ApplyNode(TypeInfo :GtType, KeyToken :GtToken, Method :GtMethod, arg1 :TypedNode, arg2 :TypedNode) {
			super(TypeInfo, KeyToken);
			this.Method = Method;
			this.Params = [];
			this.Params.push(arg1);
			this.Params.push(arg2);
		}
	
		Append(Expr :TypedNode) :void {
			this.Params.push(Expr);
		}
	
		Evaluate(Visitor :NodeVisitor) :boolean {
			return Visitor.VisitApply(this);
		}
	}
	
	class NewNode extends TypedNode {
		Params :any[]; 
	
		NewNode(TypeInfo :GtType, KeyToken :GtToken) {
			super(TypeInfo, KeyToken);
			this.Params = [];
		}
	
		Append(Expr :TypedNode) :void {
			this.Params.push(Expr);
		}
	
		Evaluate(Visitor :NodeVisitor) :boolean {
			return Visitor.VisitNew(this);
		}
	}
	
	class IfNode extends TypedNode {
		CondExpr :TypedNode;
		ThenNode :TypedNode;
		ElseNode :TypedNode;
	
		
		IfNode(TypeInfo :GtType, CondExpr :TypedNode, ThenBlock :TypedNode, ElseNode :TypedNode) {
			super(TypeInfo, null);
			this.CondExpr = CondExpr;
			this.ThenNode = ThenBlock;
			this.ElseNode = ElseNode;
		}
	
		Evaluate(Visitor :NodeVisitor) :boolean {
			return Visitor.VisitIf(this);
		}
	}
	
	class LoopNode extends TypedNode {
	
		
		CondExpr :TypedNode;
		LoopBody :TypedNode;
		IterationExpr :TypedNode;
	
		LoopNode(TypeInfo :GtType, CondExpr :TypedNode, LoopBody :TypedNode, IterationExpr :TypedNode) {
			super(TypeInfo, null);
			this.CondExpr = CondExpr;
			this.LoopBody = LoopBody;
			this.IterationExpr = IterationExpr;
		}
	
		Evaluate(Visitor :NodeVisitor) :boolean {
			return Visitor.VisitLoop(this);
		}
	}
	
	class ReturnNode extends UnaryNode {
	
		ReturnNode(TypeInfo :GtType, Expr :TypedNode) {
			super(TypeInfo, Expr);
		}
	
		Evaluate(Visitor :NodeVisitor) :boolean {
			return Visitor.VisitReturn(this);
		}
	
	}
	
	class ThrowNode extends UnaryNode {
		
		ThrowNode(TypeInfo :GtType, Expr :TypedNode) {
			super(TypeInfo, Expr);
		}
	
		Evaluate(Visitor :NodeVisitor) :boolean {
			return Visitor.VisitThrow(this);
		}
	}
	
	
	class TryNode extends TypedNode {
		/*
		 * let HasException = TRY(TryBlock); in if HasException ==
		 * CatchedExceptions[0] then CatchBlock[0] if HasException ==
		 * CatchedExceptions[1] then CatchBlock[1] ... end :FinallyBlock
		 */
		TryBlock :TypedNode;
		TargetException :any[];
		CatchBlock :any[];
		FinallyBlock :TypedNode;
	
		TryNode(TypeInfo :GtType, TryBlock :TypedNode, FinallyBlock :TypedNode) {
			super(TypeInfo, null);
			this.TryBlock = TryBlock;
			this.FinallyBlock = FinallyBlock;
			this.CatchBlock = [];
			this.TargetException = [];
		}
	
		addCatchBlock(TargetException :TypedNode, CatchBlock :TypedNode) :void { //FIXME
			this.TargetException.push(TargetException);
			this.CatchBlock.push(CatchBlock);
		}
	
		Evaluate(Visitor :NodeVisitor) :boolean {
			return Visitor.VisitTry(this);
		}
	}
	
	class SwitchNode extends TypedNode {
		SwitchNode(TypeInfo :GtType, KeyToken :GtType) {
			super(TypeInfo, null);
		}
	
		/*
		 * switch CondExpr { Label[0]: Blocks[0]; Label[1]: Blocks[2]; ... }
		 */
		CondExpr :TypedNode;
		Labels :any[];
		Blocks :any[];
	
		Evaluate(Visitor :NodeVisitor) :boolean {
			return Visitor.VisitSwitch(this);
		}
	}
	
	class DefineNode extends TypedNode {
	
		DefInfo :GtDef;
	
		DefineNode(TypeInfo :GtType, KeywordToken :GtToken, DefInfo :GtDef) {
			super(TypeInfo, KeywordToken);
			this.DefInfo = DefInfo;
		}
	
		Evaluate(Visitor :NodeVisitor) :boolean {
			return Visitor.VisitDefine(this);
		}
	}
	
	
	
	class GtObject {
		TypeInfo :GtType;
	// prototype :SymbolMap;
	//
		GtObject(TypeInfo :GtType) {
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
	
	class GtBuilder {
		
		EvalAtTopLevel(NameSpace :GtNameSpace, Node :TypedNode, GlobalObject :GtObject) :Object {
			return null;
		}
	
		Build(NameSpace :GtNameSpace, Node :TypedNode, Method :GtMethod) :GtMethodInvoker {
			return null;
		}
	}
	
	class GtSpec {
		SpecType :number;
		SpecKey :string;
		SpecBody :Object;
		
		constructor(SpecType :number, SpecKey :string, SpecBody :Object) {
			this.SpecType = SpecType;
			this.SpecKey = SpecKey;
			this.SpecBody = SpecBody;
		}
	}
	
	class GtNameSpace {
		GtContext :GtContext;
		ParentNameSpace :GtNameSpace;
		ImportedNameSpaceList :any[];
		PublicSpecList :any[];
		PrivateSpecList :any[];
		
		TokenFunc[] TokenMatrix;
		SymbolPatternTable :object;
		ExtendedPatternTable :object;
		
		constructor(GtContext :GtContext, ParentNameSpace :GtNameSpace) {
			this.GtContext = GtContext;
			this.ParentNameSpace = ParentNameSpace;
			this.ImportedNameSpaceList = null;
			this.PublicSpecList = [];
			this.PrivateSpecList = null;
			this.TokenMatrix = null;
			this.SymbolPatternTable = null;
			this.ExtendedPatternTable = null;
		}
			
		RemakeTokenMatrixEach(NameSpace :GtNameSpace) :void {
			for(i = 0; i < ListSize(NameSpace.PublicSpecList); i++) :number {
				var Spec :GtSpec = (GtSpec)NameSpace.PublicSpecList[i];
				if(Spec.SpecType != TokenFuncSpec) continue;
				for(j = 0; j < Spec.SpecKey.length(); j++) :number {
					var knumber :number = FromJavaChar(Spec.SpecKey.charAt(j));
					var Func :(a :TokenContext, b :string, c :number) => number = ((a :TokenContext, b :string, c :number) => number)Spec.SpecBody;
					this.TokenMatrix[kchar] = CreateOrReuseTokenFunc(Func, this.TokenMatrix[kchar]);
				}
			}
		}
		
		RemakeTokenMatrix(NameSpace :GtNameSpace) :void {
			if(NameSpace.ParentNameSpace != null) {
				RemakeTokenMatrix(NameSpace.ParentNameSpace);
			}
			RemakeTokenMatrixEach(NameSpace);
			for(i = 0; i < ListSize(NameSpace.ImportedNameSpaceList); i++) :number {
				var Imported :GtNameSpace = (GtNameSpace)NameSpace.ImportedNameSpaceList[i];
				RemakeTokenMatrixEach(Imported);
			}
		}
		
		GetTokenFunc(GtChar2 :number) :TokenFunc {
			if(this.TokenMatrix == null) {
				this.TokenMatrix = new TokenFunc[MaxSizeOfChars];
				RemakeTokenMatrix(this);
			}
			return this.TokenMatrix[GtChar2];
		}
	
		DefineTokenFunc(keys :string, f :(a :TokenContext, b :string, c :number) => number) :void {
			this.PublicSpecList.add(new GtSpec(TokenFuncSpec, keys, f));
			this.TokenMatrix = null;
		}
		
		
		TableAddSpec(Table :object, Spec :GtSpec) :void {
			var Body :Object = Spec.SpecBody;
			if(instanceof :Body SyntaxPattern) {
				var Parent :Object = Table[Spec.SpecKey];
				if(instanceof :Parent SyntaxPattern) {
					Body = MergeSyntaxPattern((SyntaxPattern)Body, (SyntaxPattern)Parent);
				}
			}
			Table.put(Spec.SpecKey, Body);
		}
		
		RemakeSymbolTableEach(NameSpace :GtNameSpace, SpecList :any[]) :void {
			for(i = 0; i < ListSize(SpecList); i++) :number {
				var Spec :GtSpec = (GtSpec)SpecList[i];
				if(Spec.SpecType == SymbolPatternSpec) {
					TableAddSpec(this.SymbolPatternTable, Spec);
				}
				else if(Spec.SpecType == ExtendedPatternSpec) {
					TableAddSpec(this.ExtendedPatternTable, Spec);
				}
			}
		}
		
		RemakeSymbolTable(NameSpace :GtNameSpace) :void {
			if(NameSpace.ParentNameSpace != null) {
				RemakeSymbolTable(NameSpace.ParentNameSpace);
			}
			RemakeSymbolTableEach(NameSpace, NameSpace.PublicSpecList);
			RemakeSymbolTableEach(NameSpace, NameSpace.PrivateSpecList);
			for(i = 0; i < ListSize(NameSpace.ImportedNameSpaceList); i++) :number {
				var Imported :GtNameSpace = (GtNameSpace)NameSpace.ImportedNameSpaceList[i];
				RemakeSymbolTableEach(Imported, Imported.PublicSpecList);
			}
		}
		
		GetSymbol(Key :string) :Object {
			if(this.SymbolPatternTable == null) {
				this.SymbolPatternTable = {};
				this.ExtendedPatternTable = {};
				RemakeSymbolTable(this);
			}
			return this.SymbolPatternTable[Key];
		}
			
		GetPattern(PatternName :string) :SyntaxPattern {
			var Body :Object = this.GetSymbol(PatternName);
			return (instanceof :Body SyntaxPattern) ? (SyntaxPattern)Body : null;
		}
	
		GetExtendedPattern(PatternName :string) :SyntaxPattern {
			if(this.ExtendedPatternTable == null) {
				this.SymbolPatternTable = {};
				this.ExtendedPatternTable = {};
				RemakeSymbolTable(this);
			}
			var Body :Object = this.ExtendedPatternTable[PatternName];
			return (instanceof :Body SyntaxPattern) ? (SyntaxPattern)Body : null;
		}
	
		DefineSymbol(Key :string, Value :Object) :void {
			var Spec :GtSpec = new GtSpec(SymbolPatternSpec, Key, Value);
			this.PublicSpecList.push(Spec);
			if(this.SymbolPatternTable != null) {
				TableAddSpec(this.SymbolPatternTable, Spec);
			}
		}
	
		DefinePrivateSymbol(Key :string, Value :Object) :void {
			var Spec :GtSpec = new GtSpec(SymbolPatternSpec, Key, Value);
			if(this.PrivateSpecList == null) {
				this.PrivateSpecList = [];
			}
			this.PrivateSpecList.push(Spec);
			if(this.SymbolPatternTable != null) {
				TableAddSpec(this.SymbolPatternTable, Spec);
			}
		}
	
		DefineSyntaxPattern(PatternName :string, MatchFunc :(a :SyntaxPattern, b :SyntaxTree, c :TokenContext) => SyntaxTree, TypeFunc :(a :TypeEnv, b: SyntaxTree, c: GtType) => TypedNode) :void {
			var Pattern :SyntaxPattern = new SyntaxPattern(this, PatternName, MatchFunc, TypeFunc);
			var Spec :GtSpec = new GtSpec(SymbolPatternSpec, PatternName, Pattern);
			this.PublicSpecList.push(Spec);
			if(this.SymbolPatternTable != null) {
				TableAddSpec(this.SymbolPatternTable, Spec);
			}
		}
	
		DefineExtendedPattern(PatternName :string, SyntaxFlag :number, MatchFunc :(a :SyntaxPattern, b :SyntaxTree, c :TokenContext) => SyntaxTree, TypeFunc :(a :TypeEnv, b: SyntaxTree, c: GtType) => TypedNode) :void {
			var Pattern :SyntaxPattern = new SyntaxPattern(this, PatternName, MatchFunc, TypeFunc);
			Pattern.SyntaxFlag = SyntaxFlag;
			var Spec :GtSpec = new GtSpec(ExtendedPatternSpec, PatternName, Pattern);
			this.PublicSpecList.push(Spec);
			if(this.ExtendedPatternTable != null) {
				TableAddSpec(this.ExtendedPatternTable, Spec);
			}
		}
		
		// Object :Global
		CreateGlobalObject(ClassFlag :number, ShortName :string) :GtObject {
			var NewClass :GtType = new GtType(this.GtContext, ClassFlag, ShortName, null);
			var GlobalObject :GtObject = new GtObject(NewClass);
			NewClass.DefaultNullValue = GlobalObject;
			return GlobalObject;
		}
	
		GetGlobalObject() :GtObject {
			var GlobalObject :Object = this.GetSymbol(GlobalConstName);
			if(GlobalObject == null || !(instanceof :GlobalObject GtObject)) {
				GlobalObject = this.CreateGlobalObject(SingletonClass, "global");
				this.DefinePrivateSymbol(GlobalConstName, GlobalObject);
			}
			return (GtObject) GlobalObject;
		}
	
		ImportNameSpace(ImportedNameSpace :GtNameSpace) :void {
			if(this.ImportedNameSpaceList == null) {
				this.ImportedNameSpaceList = [];
				this.ImportedNameSpaceList.push(ImportedNameSpace);
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
				var Builder :GtBuilder = this.GetBuilder();
				ResultValue = Builder.EvalAtTopLevel(this, TNode, this.GetGlobalObject());
			}
			return ResultValue;
		}
	
		// Builder
		Builder :GtBuilder;
	
		GetBuilder() :GtBuilder {
			if(this.Builder == null) {
				if(this.ParentNameSpace != null) {
					return this.ParentNameSpace.GetBuilder();
				}
				//this.Builder = new DefaultGtBuilder(); // create default builder
				this.Builder = new GtBuilder(); // create default builder
			}
			return this.Builder;
		}
	
////ifdef JAVA
//	private Object LoadClass(String ClassName) {
//		try {
//			Class<?> ClassInfo = Class.forName(ClassName);
//			return ClassInfo.newInstance();
//		} catch (ClassNotFoundException e1) {
//			// TODO Auto-generated catch block
//			e1.printStackTrace();
//		} catch (InstantiationException e) {
//			// TODO Auto-generated catch block
//			e.printStackTrace();
//		} catch (IllegalAccessException e) {
//			// TODO Auto-generated catch block
//			e.printStackTrace();
//		}
//		return null;
//	}
//
//	public boolean LoadBuilder(String Name) {
//		GtBuilder Builder = (GtBuilder) this.LoadClass(Name);
//		if(Builder != null) {
//			this.Builder = Builder;
//			return true;
//		}
//		return false;
//	}
	//endif VAJA
	
		LookupMethod(MethodName :string, ParamSize :number) :GtMethod {
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
	
		ReportError(Level :number, Token :GtToken, Message :string) :string {
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
	
		// Token
		function WhiteSpaceToken(TokenContext :TokenContext, SourceText :string, pos :number) :number {
			TokenContext.FoundWhiteSpace();
			for(; pos < SourceText.length(); pos++) {
				var ch :number = SourceText.charAt(pos);
				if(!IsWhitespace(ch)) {
					break;
				}
			}
			return pos;
		}
	
		function IndentToken(TokenContext :TokenContext, SourceText :string, pos :number) :number {
			var LineStart :number = pos + 1;
			TokenContext.FoundLineFeed(1);
			pos = pos + 1;
			for(; pos < SourceText.length(); pos++) {
				var ch :number = SourceText.charAt(pos);
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
	
		function SingleSymbolToken(TokenContext :TokenContext, SourceText :string, pos :number) :number {
			TokenContext.AddNewToken(SourceText.substring(pos, pos + 1), 0, null);
			return pos + 1;
		}
	
		function SymbolToken(TokenContext :TokenContext, SourceText :string, pos :number) :number {
			var start :number = pos;
			for(; pos < SourceText.length(); pos++) {
				var ch :number = SourceText.charAt(pos);
				if(!IsLetter(ch) && !IsDigit(ch) && ch != '_') {
					break;
				}
			}
			TokenContext.AddNewToken(SourceText.substring(start, pos), 0, null);
			return pos;
		}
	
		function MemberToken(TokenContext :TokenContext, SourceText :string, pos :number) :number {
			var start :number = pos + 1;
			for(; pos < SourceText.length(); pos++) {
				var ch :number = SourceText.charAt(pos);
				if(!IsLetter(ch) && !IsDigit(ch) && ch != '_') {
					break;
				}
			}
			TokenContext.AddNewToken(SourceText.substring(start, pos), 0, "$MemberOperator");
			return pos;
		}
	
		function NumberLiteralToken(TokenContext :TokenContext, SourceText :string, pos :number) :number {
			var start :number = pos;
			for(; pos < SourceText.length(); pos++) {
				var ch :number = SourceText.charAt(pos);
				if(!IsDigit(ch)) {
					break;
				}
			}
			TokenContext.AddNewToken(SourceText.substring(start, pos), 0, "$IntegerLitteral");
			return pos;
		}
	
		function StringLiteralToken(TokenContext :TokenContext, SourceText :string, pos :number) :number {
			var start :number = pos + 1;
			var prev :number = '"';
			pos = start;
			while(pos < SourceText.length()) {
				var ch :number = SourceText.charAt(pos);
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
	
		function ParseType(Pattern :SyntaxPattern, LeftTree :SyntaxTree, TokenContext :TokenContext) :SyntaxTree {
			P("ParseType :Entering..");
			return null; // Matched :Not
		}
	
		function ParseSymbol(Pattern :SyntaxPattern, LeftTree :SyntaxTree, TokenContext :TokenContext) :SyntaxTree {
			P("ParseSymbol :Entering..");
			var Token :GtToken = TokenContext.Next();
			return new SyntaxTree(Pattern, TokenContext.NameSpace, Token);
		}
	
		function TypeVariable(Gamma :TypeEnv, Tree :SyntaxTree, TypeInfo :GtType) :TypedNode {
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
		function ParseIntegerLiteral(Pattern :SyntaxPattern, LeftTree :SyntaxTree, TokenContext :TokenContext) :SyntaxTree {
			var Token :GtToken = TokenContext.Next();
			return new SyntaxTree(Pattern, TokenContext.NameSpace, Token);
		}
	
		function TypeIntegerLiteral(Gamma :TypeEnv, Tree :SyntaxTree, TypeInfo :GtType) :TypedNode {
			var Token :GtToken = Tree.KeyToken;
			return new ConstNode(Gamma.IntType, Token, Integer.valueOf(Token.ParsedText));
		}
	
		function ParseStringLiteral(Pattern :SyntaxPattern, LeftTree :SyntaxTree, TokenContext :TokenContext) :SyntaxTree {
			var Token :GtToken = TokenContext.Next();
			return new SyntaxTree(Pattern, TokenContext.NameSpace, Token);
		}
	
		function TypeStringLiteral(Gamma :TypeEnv, Tree :SyntaxTree, TypeInfo :GtType) :TypedNode {
			var Token :GtToken = Tree.KeyToken;
			
			return new ConstNode(Gamma.StringType, Token, Token.ParsedText);
		}
	
		function ParseConst(Pattern :SyntaxPattern, LeftTree :SyntaxTree, TokenContext :TokenContext) :SyntaxTree {
			var Token :GtToken = TokenContext.Next();
			return new SyntaxTree(Pattern, TokenContext.NameSpace, Token);
		}
	
		function TypeConst(Gamma :TypeEnv, Tree :SyntaxTree, TypeInfo :GtType) :TypedNode {
			var Token :GtToken = Tree.KeyToken;
			
			return new ConstNode(Gamma.StringType, Token, Token.ParsedText);
		}
	
		function ParseUniaryOperator(Pattern :SyntaxPattern, LeftTree :SyntaxTree, TokenContext :TokenContext) :SyntaxTree {
			var Token :GtToken = TokenContext.Next();
			var Tree :SyntaxTree = new SyntaxTree(Pattern, TokenContext.NameSpace, Token);
			Tree.SetMatchedPatternAt(0, TokenContext, "$Expression", Required);
			return Tree;
		}
	
		function ParseBinaryOperator(Pattern :SyntaxPattern, LeftTree :SyntaxTree, TokenContext :TokenContext) :SyntaxTree {
			var Token :GtToken = TokenContext.Next();
			var RightTree :SyntaxTree = ParseSyntaxTree(null, TokenContext);
			if(IsEmptyOrError(RightTree)) return RightTree;
	
			
			
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
	// TreeFromToken(NS :GtNameSpace, Token :GtToken) :SyntaxTree {
	// var globalTokenList :Tokens = new Tokens();
	// Token.PresetPattern = NS.GetSyntax("$Symbol");
	// globalTokenList.push(Token);
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
	// var ReceiverToken :GtToken = null;
	// var MethodToken :GtToken = null;
	// if(isGlobal) {
	// ReceiverToken = new GtToken(GlobalConstName, 0);
	// ReceiverToken.PresetPattern = Tree.TreeNameSpace.GetSyntax("$Symbol");
	// MethodToken = TokenList[BeginIdx];
	// } else {
	// ReceiverToken = TokenList[BeginIdx];
	// MethodToken = TokenList.get(BeginIdx + 1);
	// }
	//
	// var baseNode :SyntaxTree = this.TreeFromToken(Tree.TreeNameSpace, ReceiverToken);
	// Tree.SetSyntaxTreeAt(MethodCallBaseClass, baseNode);
	//
	// var GroupToken :GtToken = TokenList[ParamIdx];
	// var GroupList :Tokens = GroupToken.GetGroupList();
	// Tree.AppendTokenList(",", GroupList, 1, GroupList.size() - 1, 0);
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
	// TypeMethodCall(Gamma :TypeEnv, Tree :SyntaxTree, TypeInfo :GtType) :TypedNode {
	// P("(>_<) typing method calls: " + Tree);
	// var NodeList :any[] = Tree.TreeList;
	// assert (NodeList.size() > 1);
	// assert (NodeList[0] instanceof SyntaxTree);
	// var UntypedBaseNode :SyntaxTree = (SyntaxTree) NodeList[0];
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
	// ParamSizeFromNodeList(NodeList :any[]) :number {
	// return NodeList.size() - 2;
	// }
	//
	// GetUntypedParamNodeFromNodeList(NodeList :any[], ParamIndex :number) :SyntaxTree {
	// return (SyntaxTree) NodeList.get(ParamIndex + 2);
	// }
	//
	// TypeFindingMethod(Gamma :TypeEnv, Tree :SyntaxTree, BaseNode :TypedNode, TypeInfo :GtType) :TypedNode {
	// var NodeList :any[] = Tree.TreeList;
	// var ParamSize :number = this.ParamSizeFromNodeList(NodeList);
	// var KeyToken :GtToken = Tree.KeyToken;
	// var Method :GtMethod = null;
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
	// TypeMethodEachParam(Gamma :TypeEnv, BaseType :GtType, WorkingNode :ApplyNode, NodeList :any[]) :TypedNode {
	// var Method :GtMethod = WorkingNode.Method;
	// var ParamSize :number = this.ParamSizeFromNodeList(NodeList);
	// for(var ParamIdx :number = 0; ParamIdx < ParamSize; ParamIdx++) {
	// var ParamType :GtType = Method.GetParamType(BaseType, ParamIdx);
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
		function ParseParenthesis(Pattern :SyntaxPattern, LeftTree :SyntaxTree, TokenContext :TokenContext) :SyntaxTree {
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
		function ParseParenthesis2(Pattern :SyntaxPattern, LeftTree :SyntaxTree, TokenContext :TokenContext) :SyntaxTree {
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
	
		function ParseBlock2(Pattern :SyntaxPattern, LeftTree :SyntaxTree, TokenContext :TokenContext) :SyntaxTree {
			TokenContext.MatchToken("{");
			var PrevTree :SyntaxTree = null;
			while(TokenContext.SkipEmptyStatement()) {
				if(TokenContext.MatchToken("}")) break;
				PrevTree = ParseSyntaxTree(PrevTree, TokenContext);
				if(IsEmptyOrError(PrevTree)) return PrevTree;
			}
			return TreeHead(PrevTree);
		}
	
		function TypeBlock(Gamma :TypeEnv, Tree :SyntaxTree, TypeInfo :GtType) :TypedNode {
			return Tree.TypeNodeAt(0, Gamma, Gamma.VarType, 0);
		}
	
	
		function TypeAnd(Gamma :TypeEnv, Tree :SyntaxTree, TypeInfo :GtType) :TypedNode {
			var LeftNode :TypedNode = Tree.TypeNodeAt(LeftHandTerm, Gamma, Gamma.BooleanType, 0);
			var RightNode :TypedNode = Tree.TypeNodeAt(RightHandTerm, Gamma, Gamma.BooleanType, 0);
			return new AndNode(RightNode.TypeInfo, Tree.KeyToken, LeftNode, RightNode);
		}
	
		function TypeOr(Gamma :TypeEnv, Tree :SyntaxTree, TypeInfo :GtType) :TypedNode {
			var LeftNode :TypedNode = Tree.TypeNodeAt(LeftHandTerm, Gamma, Gamma.BooleanType, 0);
			var RightNode :TypedNode = Tree.TypeNodeAt(RightHandTerm, Gamma, Gamma.BooleanType, 0);
			return new OrNode(RightNode.TypeInfo, Tree.KeyToken, LeftNode, RightNode);
		}
	
		function ParseMember(Pattern :SyntaxPattern, LeftTree :SyntaxTree, TokenContext :TokenContext) :SyntaxTree {
			var Token :GtToken = TokenContext.GetToken();
			var NewTree :SyntaxTree = new SyntaxTree(Pattern, TokenContext.NameSpace, Token);
			NewTree.SetSyntaxTreeAt(0, LeftTree);
			return NewTree;		
		}
	
		// Statement :If
	
		function ParseIf(Pattern :SyntaxPattern, LeftTree :SyntaxTree, TokenContext :TokenContext) :SyntaxTree {
			var Token :GtToken = TokenContext.GetMatchedToken("if");
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
	
		function TypeIf(Gamma :TypeEnv, Tree :SyntaxTree, TypeInfo :GtType) :TypedNode {
			var CondNode :TypedNode = Tree.TypeNodeAt(IfCond, Gamma, Gamma.BooleanType, DefaultTypeCheckPolicy);
			var ThenNode :TypedNode = Tree.TypeNodeAt(IfThen, Gamma, TypeInfo, DefaultTypeCheckPolicy);
			var ElseNode :TypedNode = Tree.TypeNodeAt(IfElse, Gamma, ThenNode.TypeInfo, AllowEmptyPolicy);
			return new IfNode(ThenNode.TypeInfo, CondNode, ThenNode, ElseNode);
		}
	
		// Statement :Return
	
		function ParseReturn(Pattern :SyntaxPattern, LeftTree :SyntaxTree, TokenContext :TokenContext) :SyntaxTree {
			var Token :GtToken = TokenContext.GetMatchedToken("return");
			var NewTree :SyntaxTree = new SyntaxTree(Pattern, TokenContext.NameSpace, Token);
			NewTree.SetMatchedPatternAt(ReturnExpr, TokenContext, "$Expression", Optional);
			return NewTree;
		}
	
		function TypeReturn(Gamma :TypeEnv, Tree :SyntaxTree, TypeInfo :GtType) :TypedNode {
			var Expr :TypedNode = Tree.TypeNodeAt(ReturnExpr, Gamma, Gamma.ReturnType, 0);
			if(Expr.IsError()) {
				return Expr;
			}
			return new ReturnNode(Expr.TypeInfo, Expr);
		}
		
		function ParseVarDecl(Pattern :SyntaxPattern, LeftTree :SyntaxTree, TokenContext :TokenContext) :SyntaxTree {
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
	
		function ParseMethodDecl(Pattern :SyntaxPattern, LeftTree :SyntaxTree, TokenContext :TokenContext) :SyntaxTree {
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
	
	// function TypeVarDecl(Gamma :TypeEnv, Tree :SyntaxTree, TypeInfo :GtType) :TypedNode {		
	// var VarType :GtType = Tree.GetTokenType(VarDeclTypeOffset, null);
	// var VarToken :GtToken = Tree.GetAtToken(VarDeclNameOffset);
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
	// function TypeMethodDecl(Gamma :TypeEnv, Tree :SyntaxTree, TypeInfo :GtType) :TypedNode {
	// System.err.println("@@@@@ " + Tree);
	// var BaseType :GtType = Tree.GetTokenType(MethodDeclClass, null);
	// if(BaseType == null) {
	// BaseType = Tree.TreeNameSpace.GetGlobalObject().TypeInfo;
	// }
	// var MethodName :string = Tree.GetTokenString(MethodDeclName, "new");
	// var ParamSize :number = Tree.TreeList.size() - MethodDeclParam;
	// GtType[] ParamData = new GtType[ParamSize + 1];
	// String[] ArgNames = new String[ParamSize + 1];
	// ParamData[0] = Tree.GetTokenType(MethodDeclReturnType, Gamma.VarType);
	// for(var i :number = 0; i < ParamSize; i++) {
	// var ParamNode :SyntaxTree = (SyntaxTree) Tree.TreeList.get(MethodDeclParam + i);
	// var ParamType :GtType = ParamNode.GetTokenType(VarDeclType, Gamma.VarType);
	// ParamData[i + 1] = ParamType;
	// ArgNames[i] = ParamNode.GetTokenString(VarDeclName, "");
	// }
	// var Param :GtParam = new GtParam(ParamSize + 1, ParamData, ArgNames);
	// var NewMethod :GtMethod = new GtMethod(
	// 0,
	// BaseType,
	// MethodName,
	// Param,
	// Tree.TreeNameSpace,
	// Tree.GetTokenList(MethodDeclBlock));
	// BaseType.DefineNewMethod(NewMethod);
	// return new DefineNode(TypeInfo, Tree.KeyToken, NewMethod);
	// }
	
	
	// function ParseUNUSED(Pattern :SyntaxPattern, LeftTree :SyntaxTree, TokenContext :TokenContext) :SyntaxTree {
	// P("** Syntax " + Tree.Pattern + " is undefined **");
	// return NoMatch;
	// }
	//
	// function TypeUNUSED(Gamma :TypeEnv, Tree :SyntaxTree, TypeInfo :GtType) :TypedNode {
	// P("** Syntax " + Tree.Pattern + " is undefined **");
	// return null;
	// }
	
		LoadDefaultSyntax(NameSpace :GtNameSpace) :void {
			// Types :Define
			var GtContext :GtContext = NameSpace.GtContext;
			NameSpace.DefineSymbol("void", GtContext.VoidType); // FIXME
			NameSpace.DefineSymbol("boolean", GtContext.BooleanType);
			NameSpace.DefineSymbol("Object", GtContext.ObjectType);
			NameSpace.DefineSymbol("int", GtContext.IntType);
			NameSpace.DefineSymbol("String", GtContext.StringType);
	
			// Constants :Define
			NameSpace.DefineSymbol("true", new Boolean(true));
			NameSpace.DefineSymbol("false", new Boolean(false));
	
			NameSpace.DefineTokenFunc(" \t", WhiteSpaceToken);
			NameSpace.DefineTokenFunc("\n", IndentToken);
			NameSpace.DefineTokenFunc("(){}[]<>,;+-*/%=&|!", SingleSymbolToken);
			NameSpace.DefineTokenFunc("Aa", SymbolToken);
			NameSpace.DefineTokenFunc(".", MemberToken);
			NameSpace.DefineTokenFunc("\"", StringLiteralToken);
			NameSpace.DefineTokenFunc("1", NumberLiteralToken);
	
			var ParseUniary :(a :SyntaxPattern, b :SyntaxTree, c :TokenContext) => SyntaxTree = ParseUniary;
			var ParseBinary :(a :SyntaxPattern, b :SyntaxTree, c :TokenContext) => SyntaxTree = ParseBinary;
			var TypeApply :(a :TypeEnv, b: SyntaxTree, c: GtType) => TypedNode = TypeApply;
	
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
	
			NameSpace.DefineExtendedPattern("=", BinaryOperator | Precedence_CStyleAssign | LeftJoin, ParseBinary, TypeAssign);
	
			NameSpace.DefineExtendedPattern("&&", BinaryOperator | Precedence_CStyleAND, ParseBinary, TypeAnd);
			NameSpace.DefineExtendedPattern("||", BinaryOperator | Precedence_CStyleOR, ParseBinary, TypeOr);
			
			//NameSpace.DefineSyntaxPattern(";", Precedence_CStyleDelim, this, null, null);
			//NameSpace.DefineSyntaxPattern("$Const", Term, this, "Const");
			//NameSpace.DefineSyntaxPattern("$Symbol", Term, this, "Symbol");
			//NameSpace.DefineSyntaxPattern("$Symbol", Term, this, "MethodCall");
	
			//NameSpace.DefineSyntaxPattern("$MethodCall", Precedence_CStyleSuffixCall, this, "MethodCall");
			//NameSpace.DefineSyntaxPattern("$Member", Precedence_CStyleSuffixCall, this, "Member");
			//NameSpace.DefineSyntaxPattern("$New", Term, this, "New");
	
			//NameSpace.DefineSyntaxPattern("()", Term | Precedence_CStyleSuffixCall, this, "UNUSED");
			//NameSpace.DefineSyntaxPattern("{}", 0, this, "UNUSED");
			var TypeConst :(a :TypeEnv, b: SyntaxTree, c: GtType) => TypedNode = TypeConst;
			
			NameSpace.DefineSyntaxPattern("$Symbol", ParseSymbol, TypeVariable);
			NameSpace.DefineSyntaxPattern("$Type", ParseType, TypeConst);
			
			NameSpace.DefineSyntaxPattern("$Const", ParseConst, TypeSymbol);
			NameSpace.DefineSyntaxPattern("$StringLiteral", ParseStringLiteral, TypeConst);
			NameSpace.DefineSyntaxPattern("$IntegerLiteral", ParseIntegerLiteral, TypeConst);
	
			NameSpace.DefineSyntaxPattern("(", ParseParenthesis, null);
	
			NameSpace.DefineSyntaxPattern("{", ParseBlock, TypeBlock);
			
			NameSpace.DefineSyntaxPattern("$Symbol", ParseMethodDecl, TypeMethodDecl);
			NameSpace.DefineSyntaxPattern("$Symbol", ParseVarDecl, TypeVarDecl);
	
			NameSpace.DefineSyntaxPattern("if", ParseIf, TypeIf);
			NameSpace.DefineSyntaxPattern("return", ParseReturn, ParseReturn);
	
			// Library :Load
			new GtInt().MakeDefinition(NameSpace);
			new GtStringDef().MakeDefinition(NameSpace);
			new GtSystemDef().MakeDefinition(NameSpace);
		}
	}
	
	
	class GtInt {
	
		MakeDefinition(ns :GtNameSpace) :void {
	// var BaseClass :GtType = ns.LookupHostLangType(Integer.class);
	// var BinaryParam :GtParam = GtParam.ParseOf(ns, "number :number x");
	// var UniaryParam :GtParam = GtParam.ParseOf(ns, "int");
	//
	// BaseClass.DefineMethod(ImmutableMethod | ConstMethod, "+", UniaryParam, this, "PlusInt");
	// BaseClass.DefineMethod(ImmutableMethod | ConstMethod, "+", BinaryParam, this, "IntAddInt");
	// BaseClass.DefineMethod(ImmutableMethod | ConstMethod, "-", UniaryParam, this, "MinusInt");
	// BaseClass.DefineMethod(ImmutableMethod | ConstMethod, "-", BinaryParam, this, "IntSubInt");
	// BaseClass.DefineMethod(ImmutableMethod | ConstMethod, "*", BinaryParam, this, "IntMulInt");
	// BaseClass.DefineMethod(ImmutableMethod | ConstMethod, "/", BinaryParam, this, "IntDivInt");
	// BaseClass.DefineMethod(ImmutableMethod | ConstMethod, "%", BinaryParam, this, "IntModInt");
	//
	// var RelationParam :GtParam = GtParam.ParseOf(ns, "number :boolean x");
	// BaseClass.DefineMethod(ImmutableMethod | ConstMethod, "<", RelationParam, this, "IntLtInt");
	// BaseClass.DefineMethod(ImmutableMethod | ConstMethod, "<=", RelationParam, this, "IntLeInt");
	// BaseClass.DefineMethod(ImmutableMethod | ConstMethod, ">", RelationParam, this, "IntGtInt");
	// BaseClass.DefineMethod(ImmutableMethod | ConstMethod, ">=", RelationParam, this, "IntGeInt");
	// BaseClass.DefineMethod(ImmutableMethod | ConstMethod, "==", RelationParam, this, "IntEqInt");
	// BaseClass.DefineMethod(ImmutableMethod | ConstMethod, "!=", RelationParam, this, "IntNeInt");
	//
	// // if(GtDebug.UseBuiltInTest) {
	// // assert (BaseClass.LookupMethod("+", 0) != null);
	// // assert (BaseClass.LookupMethod("+", 1) != null);
	// // assert (BaseClass.LookupMethod("+", 2) == null);
	// // var m :GtMethod = BaseClass.LookupMethod("+", 1);
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
	
	class GtStringDef {
	
		MakeDefinition(ns :GtNameSpace) :void {
	// var BaseClass :GtType = ns.LookupHostLangType(String.class);
	// var BinaryParam :GtParam = GtParam.ParseOf(ns, "String :string x");
	// BaseClass.DefineMethod(ImmutableMethod | ConstMethod, "+", BinaryParam, this, "StringAddString");
	//
	// var RelationParam :GtParam = GtParam.ParseOf(ns, "String :boolean x");
	// BaseClass.DefineMethod(ImmutableMethod | ConstMethod, "==", RelationParam, this, "StringEqString");
	// BaseClass.DefineMethod(ImmutableMethod | ConstMethod, "!=", RelationParam, this, "StringNeString");
	//
	// var indexOfParam :GtParam = GtParam.ParseOf(ns, "String :number x");
	// BaseClass.DefineMethod(ImmutableMethod | ConstMethod, "indexOf", indexOfParam, this, "StringIndexOf");
	//
	// var getSizeParam :GtParam = GtParam.ParseOf(ns, "int");
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
	
	class GtSystemDef {
	
		MakeDefinition(NameSpace :GtNameSpace) :void {
	// var BaseClass :GtType = NameSpace.LookupHostLangType(GtSystemDef.class);
	// NameSpace.DefineSymbol("System", BaseClass);
	//
	// var param1 :GtParam = GtParam.ParseOf(NameSpace, "void x :string");
	// BaseClass.DefineMethod(StaticMethod, "p", param1, this, "p");
		}
	
		function p(x :string) :void {
			println(x);
		}
	
	}
	
	//class any[]Def {
	//
	// MakeDefinition(ns :GtNameSpace) :void {
	// //int :FIXME[] only
	// var BaseClass :GtType = ns.LookupHostLangType(int[].class);
	// var GetterParam :GtParam = GtParam.ParseOf(ns, "number :number i");
	// BaseClass.DefineMethod(ImmutableMethod, "get", GetterParam, this, "ArrayGetter");
	// var SetterParam :GtParam = GtParam.ParseOf(ns, "void i :number v :number");
	// BaseClass.DefineMethod(0, "set", SetterParam, this, "ArraySetter");
	// var GetSizeParam :GtParam = GtParam.ParseOf(ns, "int");
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
	
	class GtContext {
	
		RootNameSpace :GtNameSpace;
		DefaultNameSpace :GtNameSpace;
	
		VoidType :GtType;
		NativeObjectType :GtType;
		ObjectType :GtType;
		BooleanType :GtType;
		IntType :GtType;
		StringType :GtType;
		VarType :GtType;
	
		ClassNameMap :object;
	
		GtContext(Grammar :GtGrammar, BuilderClassName :string) {
			this.ClassNameMap = {};
			this.RootNameSpace = new GtNameSpace(this, null);
			this.VoidType = this.LookupHostLangType(Void.class);
			this.NativeObjectType = this.LookupHostLangType(Object.class);
			this.ObjectType = this.LookupHostLangType(Object.class);
			this.BooleanType = this.LookupHostLangType(Boolean.class);
			this.IntType = this.LookupHostLangType(Integer.class);
			this.StringType = this.LookupHostLangType(String.class);
			this.VarType = this.LookupHostLangType(Object.class);
	
			Grammar.LoadDefaultSyntax(this.RootNameSpace);
			this.DefaultNameSpace = new GtNameSpace(this, this.RootNameSpace);
			if(BuilderClassName != null) {
				this.DefaultNameSpace.LoadBuilder(BuilderClassName);
			}
		}
	
		LookupHostLangType(Class<?> ClassInfo) :GtType {
			var TypeInfo :GtType = (GtType) this.ClassNameMap.get(ClassInfo.getName());
			if(TypeInfo == null) {
				TypeInfo = new GtType(this, ClassInfo);
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
	}
	
	class GreenTeaScript {
		
		function main(String[] argc) :void {
			var GtContext :GtContext = new GtContext(new GtGrammar(), null);
			//GtContext.Eval("f(a :number, b :number) :number { return a + b; }", 0);
			GtContext.Eval("1 + 2 * 3", 0);
	
		}
	
	}
}
