module GreenScript {

	// ClassFlag
	var PrivateClass :number = 1 << 0;
	var SingletonClass :number = 1 << 1;
	var FinalClass :number = 1 << 2;
	var GreenClass :number = 1 << 3;
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

	int[] CharMatrix = [ 
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
	// UnaryTree, SuffixTree
	var UnaryTerm :number = 0;
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

	var BinaryOperator :number = 1;
	var LeftJoin :number = 1 << 1;
	var PrecedenceShift :number = 2;
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

	var SymbolList :string[] = [];
	var SymbolMap :any = {};

	var AnyGetter :GtMethod = null;
	// debug flags
	var UseBuiltInTest :boolean = true;
	var DebugPrintOption :boolean = true;

	
	function println(msg :string) :void {
		LangDeps.println(msg);		
	}
	
	function DebugP(msg :string) :void {
		if(DebugPrintOption) {
			LangDeps.println("DEBUG" + LangDeps.GetStackInfo(2) + ": " + msg);
		}
	}

	function TODO(msg :string) :void {
		LangDeps.println("TODO" + LangDeps.GetStackInfo(2) + ": " + msg);
	}

	function ListSize(any[] a) :number {
		return (a == null) ? 0 : a.size();
	}
	
	function IsFlag(flag :number, flag2 :number) :boolean {
		return ((flag & flag2) == flag2);
	}
		
	function FromJavaChar(c :number) :number {
		if(c < 128) {
			return CharMatrix[c];
		}
		return UnicodeChar;
	}

	// Symbol
	function IsGetterSymbol(SymbolId :number) :boolean {
		return IsFlag(SymbolId, GetterSymbolMask);
	}

	function IsSetterSymbol(SymbolId :number) :boolean {
		return IsFlag(SymbolId, SetterSymbolMask);
	}

	function ToSetterSymbol(SymbolId :number) :number {
		assert(IsGetterSymbol(SymbolId));
		return (SymbolId & (~GetterSymbolMask)) | SetterSymbolMask;
	}

	function MaskSymbol(SymbolId :number, Mask :number) :number {
		return (SymbolId << SymbolMaskSize) | Mask;
	}

	function UnmaskSymbol(SymbolId :number) :number {
		return SymbolId >> SymbolMaskSize;
	}

	function StringfySymbol(SymbolId :number) :string {
		var Key :string = SymbolList.get(UnmaskSymbol(SymbolId));
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
		var SymbolObject :number = <Integer>SymbolMap[Key];
		if(SymbolObject == null) {
			if(DefaultSymbolId == AllowNewId) {
				var SymbolId :number = SymbolList.size();
				SymbolList.push(Key);
				SymbolMap.put(Key, SymbolId); //new Integer(SymbolId));
				return MaskSymbol(SymbolId, Mask);
			}
			return DefaultSymbolId;
		}
		return MaskSymbol(SymbolObject.intValue(), Mask);
	}

	function CanonicalSymbol(Symbol :string) :string {
		return Symbol.toLowerCase().replaceAll("_", "");
	}

	function GetCanonicalSymbolId(Symbol :string) :number {
		return GetSymbolId(CanonicalSymbol(Symbol), AllowNewId);
	}


	function ApplyTokenFunc(TokenFunc :TokenFunc, TokenContext :TokenContext, ScriptSource :string, Pos :number) :number {
		while(TokenFunc != null) {
			var f :(a :TokenContext, b :string, c :number) => number = TokenFunc.Func;
			var NextIdx :number = LangDeps.ApplyTokenFunc(f.Self, f.Method, TokenContext, ScriptSource, Pos);
			if(NextIdx > Pos) return NextIdx;
			TokenFunc = TokenFunc.ParentFunc;
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
		var ParseFlag :number = TokenContext.ParseFlag;
		var CurrentPattern :SyntaxPattern = Pattern;
		while(CurrentPattern != null) {
			var f :(a :SyntaxPattern, b :SyntaxTree, c :TokenContext) => SyntaxTree = CurrentPattern.MatchFunc;
			TokenContext.Pos = Pos;
			if(CurrentPattern.ParentPattern != null) {
				TokenContext.ParseFlag = ParseFlag | TrackbackParseFlag;
			}
			DebugP("B ApplySyntaxPattern: " + CurrentPattern + " > " + CurrentPattern.ParentPattern);
			var ParsedTree :SyntaxTree = <SyntaxTree>LangDeps.ApplyMatchFunc(f.Self, f.Method, CurrentPattern, LeftTree, TokenContext);
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

	function ParseSyntaxTree(PrevTree :SyntaxTree, TokenContext :TokenContext) :SyntaxTree {
		var Pattern :SyntaxPattern = TokenContext.GetFirstPattern();
		var LeftTree :SyntaxTree = ApplySyntaxPattern(Pattern, PrevTree, TokenContext);
		while (!IsEmptyOrError(LeftTree)) {
			var ExtendedPattern :SyntaxPattern = TokenContext.GetExtendedPattern();
			if(ExtendedPattern == null) {
				DebugP("In $Expression$ ending: " + TokenContext.GetToken());
				break;
			}
			LeftTree = ApplySyntaxPattern(ExtendedPattern, LeftTree, TokenContext);			
		}
		return LeftTree;
	}

	function TestSyntaxPattern(Context :GtContext, Text :string) :void {
		var TokenContext :TokenContext = new TokenContext(Context.DefaultNameSpace, Text, 1);
		var ParsedTree :SyntaxTree = ParseSyntaxTree(null, TokenContext);
		assert(ParsedTree != null);
	}
	
	// typing 
	function ApplyTypeFunc(TypeFunc :(a :TypeEnv, b: SyntaxTree, c: GtType) => TypedNodeCheck, Gamma :TypeEnv, ParsedTree :SyntaxTree, Type :GtType) :TypedNode {
		if(TypeFunc == null || TypeFunc.Method == null){
			DebugP("try to invoke null TypeFunc");
			return null;
		}
		return <TypedNode>LangDeps.ApplyTypeFunc(TypeFunc.Self, TypeFunc.Method, Gamma, ParsedTree, Type);
	}
	
	function LinkNode(LastNode :TypedNode, Node :TypedNode) :TypedNode {
		Node.PrevNode = LastNode;
		if(LastNode != null) {
			LastNode.NextNode = Node;
		}
		return Node;
	}



	class GtToken {
		TokenFlag :number;
		ParsedText :string;
		FileLine :number;
		PresetPattern :SyntaxPattern;
	
		constructor(text :string, FileLine :number) {
			this.TokenFlag = 0;
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
	
		constructor(Func :(a :TokenContext, b :string, c :number) => number, Parent :TokenFunc) {
			this.Func = Func;
			this.ParentFunc = Parent;
		}
	
		toString() :string {
			return this.Func.Method.toString();
		}
	}
	
	class TokenContext {
		NameSpace :GtNameSpace;
		SourceList :GtToken[];
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
			//DebugP("<< " + Text + " : " + PatternName);
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
			var Token :GtToken = this.AddNewToken(TokenText, 0, "$Error$");
			this.NameSpace.ReportError(Level, Token, Message);
		}
		
		NewErrorSyntaxTree(Token :GtToken, Message :string) :SyntaxTree {
			if(!IsAllowedTrackback()) {
				this.NameSpace.ReportError(ErrorLevel, Token, Message);
				var ErrorTree :SyntaxTree = new SyntaxTree(Token.PresetPattern, this.NameSpace, Token, null);
				return ErrorTree;
			}
			return null;
		}
		
		GetBeforeToken() :GtToken {
			var pos :number = this.Pos - 1;
			while(pos >= 0) {
				var Token :GtToken = this.SourceList[pos];
				if(IsFlag(Token.TokenFlag, IndentTokenFlag)) {
					pos -= 1;
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
				DebugP("undefined tokenizer: " + ScriptSource.charAt(pos));
				this.AddNewToken(ScriptSource.substring(pos), 0, null);
				return ScriptSource.length();
			}
			return NextIdx;
		}
	
		Tokenize(ScriptSource :string, CurrentLine :number) :void {
			var currentPos :number = 0;
			var len :number = ScriptSource.length();
			this.ParsingLine = CurrentLine;
			while(currentPos < len) {
				var gtCode :number = FromJavaChar(ScriptSource.charAt(currentPos));
				var nextPos :number = this.DispatchFunc(ScriptSource, gtCode, currentPos);
				if(currentPos >= nextPos) {
					break;
				}
				currentPos = nextPos;
			}
			this.Dump();
		}
	
		GetToken() :GtToken {
			while((this.Pos < this.SourceList.size())) {
				var Token :GtToken = <GtToken>this.SourceList[this.Pos];
				if(Token.IsSource()) {
					this.SourceList.remove(this.SourceList.size()-1);
					this.Tokenize(Token.ParsedText, Token.FileLine);
					Token = <GtToken>this.SourceList[this.Pos];
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
			return (this.GetToken() != NullToken);
		}
	
		Next() :GtToken {
			var Token :GtToken = this.GetToken();
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
				return this.NameSpace.GetPattern("$Symbol$");
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
				Token = GetToken();
			}
			return Token;
		}
	
		IsAllowedTrackback() :boolean {
			return IsFlag(this.ParseFlag, TrackbackParseFlag);
		}
	
		ParsePatternAfter(LeftTree :SyntaxTree, PatternName :string, IsOptional :boolean) :SyntaxTree {
			var Pos :number = this.Pos;
			var ParseFlag :number = this.ParseFlag;
			var Pattern :SyntaxPattern = this.GetPattern(PatternName);
			if(IsOptional) {
				this.ParseFlag |= TrackbackParseFlag;
			}
			var SyntaxTree :SyntaxTree = ApplySyntaxPattern(Pattern, LeftTree, this);
			this.ParseFlag = ParseFlag;
			if(SyntaxTree != null) {
				return SyntaxTree;
			}
			this.Pos = Pos;
			return null;
		}
	
		ParsePattern(PatternName :string, IsOptional :boolean) :SyntaxTree {
			return this.ParsePatternAfter(null, PatternName, IsOptional);
		}
	
		SkipEmptyStatement() :boolean {
			var Token :GtToken = null;
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
			var pos :number = this.Pos;
			while(pos < this.SourceList.size()) {
				var token :GtToken = <GtToken>this.SourceList[pos];
				DebugP("["+pos+"]\t" + token + " : " + token.PresetPattern);
				pos += 1;
			}
		}
	}
	
	class SyntaxPattern {
		PackageNameSpace :GtNameSpace;
		PatternName :string;
		SyntaxFlag :number;
		MatchFunc :(a :SyntaxPattern, b :SyntaxTree, c :TokenContext) => SyntaxTree;
		TypeFunc :(a :TypeEnv, b: SyntaxTree, c: GtType) => TypedNodeCheck;
		ParentPattern :SyntaxPattern;
		
		constructor(NameSpace :GtNameSpace, PatternName :string, MatchFunc :(a :SyntaxPattern, b :SyntaxTree, c :TokenContext) => SyntaxTree, TypeFunc :(a :TypeEnv, b: SyntaxTree, c: GtType) => TypedNodeCheck) {
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
			return IsFlag(this.SyntaxFlag, BinaryOperator);
		}
	
		IsLeftJoin(Right :SyntaxPattern) :boolean {
			var left :number = this.SyntaxFlag >> PrecedenceShift;
			var right :number = Right.SyntaxFlag >> PrecedenceShift;
			return (left < right || (left == right && IsFlag(this.SyntaxFlag, LeftJoin) && IsFlag(Right.SyntaxFlag, LeftJoin)));
		}
	}
	
	class SyntaxTree {
		ParentTree :SyntaxTree;
		PrevTree :SyntaxTree;
		NextTree :SyntaxTree;
	
		NameSpace :GtNameSpace;
		Pattern :SyntaxPattern;
		KeyToken :GtToken;
		TreeList :SyntaxTree[];
		ConstValue :Object;
	
		constructor(Pattern :SyntaxPattern, NameSpace :GtNameSpace, KeyToken :GtToken, ConstValue :Object) {
			this.NameSpace = NameSpace;
			this.KeyToken = KeyToken;
			this.Pattern = Pattern;
			this.ParentTree = null;
			this.PrevTree = null;
			this.NextTree = null;
			this.TreeList = null;
			this.ConstValue = ConstValue;
		}
	
		toString() :string {
			var s :string = "(" + this.KeyToken.ParsedText;
			var i :number = 0;
			while(i < ListSize(this.TreeList)) {
				var o :Object = this.TreeList[i];
				var Entry :string = o.toString();
				if(o instanceof SyntaxTree) {
					var SubTree :SyntaxTree = <SyntaxTree>o;
					if(ListSize(SubTree.TreeList) == 0) {
						Entry = SubTree.KeyToken.ParsedText;
					}
				}
				s = s + " " + Entry;
				i += 1;
			}
			return s + ")";
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
			this.Pattern = this.NameSpace.GetPattern("$Empty$");
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
			
		GetSyntaxTreeAt(Index :number) :SyntaxTree {
			return this.TreeList[Index];
		}
	
		SetSyntaxTreeAt(Index :number, Tree :SyntaxTree) :void {
			if(!IsError()) {
				if(Tree.IsError()) {
					ToError(Tree.KeyToken);
				}
				else {
					if(Index >= 0) {
						if(this.TreeList == null) {
							this.TreeList = [];
						}
						if(Index < this.TreeList.size()) {
							this.TreeList[Index] = Tree;
							return;
						}
						while(this.TreeList.size() < Index) {
							this.TreeList.push(null);
						}
						this.TreeList.push(Tree);
						Tree.ParentTree = this;
					}
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
					SetSyntaxTreeAt(Index, new SyntaxTree(null, TokenContext.NameSpace, Token, null));
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
	
		TypeNodeAt(Index :number, Gamma :TypeEnv, Type :GtType, TypeCheckPolicy :number) :TypedNode {
			if(this.TreeList != null && Index < this.TreeList.size()) {
				var NodeObject :SyntaxTree = this.TreeList[Index];
				var TypedNode :TypedNode = Gamma.TypeCheck(NodeObject, Type, TypeCheckPolicy);
				return TypedNode;
			}
			if(!IsFlag(TypeCheckPolicy, AllowEmptyPolicy) && !IsFlag(TypeCheckPolicy, IgnoreEmptyPolicy)) {
				Gamma.GammaNameSpace.ReportError(ErrorLevel, this.KeyToken, this.KeyToken.ParsedText + " needs more expression at " + Index);
				return Gamma.Generator.CreateErrorNode(Type, this); // TODO, "syntax tree error: " + Index);
			}
			return null;
		}
	}
	
	
	
	
	class GtObject {
		Type :GtType;
		constructor(Type :GtType) {
			this.Type = Type;
		}
	}
	
	class GtType {
		PackageNameSpace :GtNameSpace;
		ClassFlag :number;
		GtContext :GtContext;
		ShortClassName :string;
		BaseClass :GtType;
		SuperClass :GtType;
		ClassParam :GtParam;
		SearchSimilarClass :GtType;
		ClassMethodList :GtMethod[];
		SearchSuperMethodClass :GtType;
		DefaultNullValue :Object;
		LocalSpec :Object;
	
		constructor(GtContext :GtContext, ClassFlag :number, ClassName :string, DefaultNullValue :Object) {
			this.GtContext = GtContext;
			this.ClassFlag = ClassFlag;
			this.ShortClassName = ClassName;
			this.SuperClass = null;
			this.BaseClass = this;
			this.ClassMethodList = [];
			this.DefaultNullValue = DefaultNullValue;
			this.LocalSpec = null;
		}
	
		toString() :string {
			return this.ShortClassName;
		}
	
		Accept(Type :GtType) :boolean {
			if(this == Type) {
				return true;
			}
			return false;
		}
	
		AddMethod(Method :GtMethod) :void {
			this.ClassMethodList.push(Method);
		}
	
		GetGetter(Name :string) :GtMethod {
			return AnyGetter;
		}
		
	}
	
	class GtParam {
		ParamSize :number;
		TypeList :GtType[];
		NameList :string[];
	
		constructor(TypeList :GtType[], NameList :string[]) {
			this.TypeList = TypeList;
			this.NameList = NameList;
			this.ParamSize = TypeList.size() - 1;
		}
	
		Equals(Other :GtParam) :boolean {
			var ParamSize :number = Other.ParamSize;
			if(ParamSize == this.ParamSize) {
				var i :number = 0;
				while(i < ParamSize) {
					if(this.TypeList[i] != Other.TypeList[i]) {
						return false;
					}
					i += 1;
				}
				return true;
			}
			return false;
		}
	
		
	}
	
	class GtDef {
	
		MakeDefinition(NameSpace :GtNameSpace) :void {
			
		}
	
	}
	
	class GtMethod extends GtDef {
		MethodFlag :number;
		ClassInfo :GtType;
		MethodName :string;
		MethodSymbolId :number;
		CanonicalSymbolId :number;
		Param :GtParam;
	
		constructor(MethodFlag :number, ClassInfo :GtType, MethodName :string, Param :GtParam) {
			this.MethodFlag = MethodFlag;
			this.ClassInfo = ClassInfo;
			this.MethodName = MethodName;
			this.MethodSymbolId = GetSymbolId(MethodName, AllowNewId);
			this.CanonicalSymbolId = GetCanonicalSymbolId(MethodName);
			this.Param = Param;
		}
	
		toString() :string {
			var s :string = this.ClassInfo + "." + this.MethodName + "(";
			var i :number = 0;
			while(i < this.Param.ParamSize) {
				var ParamType :GtType = this.GetParamType(i);
				if(i > 0) {
					s += ", ";
				}
				s += ParamType;
				i += 1;
			}
			return s + ": " + this.GetReturnType();
		};
	
		Is(Flag :number) :boolean {
			return IsFlag(this.MethodFlag, Flag);
		}
	
		GetReturnType() :GtType {
			var ReturnType :GtType = this.Param.TypeList[0];
			return ReturnType;
		}
	
		GetParamType(ParamIdx :number) :GtType {
			var ParamType :GtType = this.Param.TypeList[0];
			return ParamType;
		}
	
	
	
		DoCompilation() :void {
		}
	}
	
	
	class VariableInfo {
		Type :GtType;
		Name :string;
		LocalName :string;
	
		constructor(Type :GtType, Name :string, Index :number) {
			this.Type = Type;
			this.Name = Name;
			this.LocalName = Name + Index;
		}
	}
	
	class GtDelegate {
		Method :GtMethod;
		Callee :Object;
		Type :GtType;
	}
	
	class TypeEnv {
		GammaNameSpace :GtNameSpace;
		Generator :GreenTeaGenerator;
	
		Method :GtMethod;
		ReturnType :GtType;
		ThisType :GtType;
		StackTopIndex :number;
		LocalStackList :VariableInfo[];
		
		
		VoidType :GtType;
		BooleanType :GtType;
		IntType :GtType;
		StringType :GtType;
		VarType :GtType;
		AnyType :GtType;
		
		constructor(GammaNameSpace :GtNameSpace, Method :GtMethod) {
			this.GammaNameSpace = GammaNameSpace;
			this.Generator = GammaNameSpace.GtContext.Generator;
			
			this.VoidType = GammaNameSpace.GtContext.VoidType;
			this.BooleanType = GammaNameSpace.GtContext.BooleanType;
			this.IntType = GammaNameSpace.GtContext.IntType;
			this.StringType = GammaNameSpace.GtContext.StringType;
			this.VarType = GammaNameSpace.GtContext.VarType;
			this.AnyType = GammaNameSpace.GtContext.AnyType;
			this.Method = Method;
			this.LocalStackList = [];
			this.StackTopIndex = 0;
			if(Method != null) {
				this.InitMethod(Method);
			} else {
				// global
				this.ThisType = GammaNameSpace.GetGlobalObject().Type;
				this.AppendDeclaredVariable(this.ThisType, "this");
			}
		}
	
		InitMethod(Method :GtMethod) :void {
			this.ReturnType = Method.GetReturnType();
			this.ThisType = Method.ClassInfo;
			if(!Method.Is(StaticMethod)) {
				this.AppendDeclaredVariable(Method.ClassInfo, "this");
				var Param :GtParam = Method.Param;
				var i :number = 0;
				while(i < Param.ParamSize) {
					this.AppendDeclaredVariable(Param.TypeList[i], Param.NameList[i]);
					i += 1;
				}
			}
		}
	
		AppendDeclaredVariable(Type :GtType, Name :string) :boolean {
			var VarInfo :VariableInfo = new VariableInfo(Type, Name, this.StackTopIndex);
			if(this.StackTopIndex < this.LocalStackList.size()) {
				this.LocalStackList.push(VarInfo);			
			}
			else {
				this.LocalStackList.push(VarInfo);
			}
			this.StackTopIndex += 1;
			return true;
		}
	
		LookupDeclaredVariable(Symbol :string) :VariableInfo {
			var i :number = this.StackTopIndex - 1;
			while(i >= 0) {
				var VarInfo :VariableInfo = this.LocalStackList[i];
				if(VarInfo.Name.equals(Symbol)) {
					return VarInfo;
				}
				i -= 1;
			}
			return null;
		}
	
		GuessType(Value :Object) :GtType {
			TODO("GuessType");
			return this.AnyType;
		}
		
		LookupDelegate(Name :string) :GtDelegate {
			TODO("finding delegate");
			return null;
		}
		
		DefaultValueConstNode(ParsedTree :SyntaxTree, Type :GtType) :TypedNode {
			if(Type.DefaultNullValue != null) {
				return this.Generator.CreateConstNode(Type, ParsedTree, Type.DefaultNullValue);
			}
			return CreateErrorNode(ParsedTree, "undefined initial value of " + Type);
		}
		
		CreateErrorNode(ParsedTree :SyntaxTree, Message :string) :TypedNode {
			this.GammaNameSpace.ReportError(ErrorLevel, ParsedTree.KeyToken, Message);
			return this.Generator.CreateErrorNode(this.VoidType, ParsedTree);
		}
	
		
		TypeEachNode(Tree :SyntaxTree, Type :GtType) :TypedNode {
			var Node :TypedNode = ApplyTypeFunc(Tree.Pattern.TypeFunc, this, Tree, Type);
			if(Node == null) {
				Node = this.CreateErrorNode(Tree, "undefined type checker: " + Tree.Pattern);
			}
			return Node;
		}
	
		TypeCheckEachNode(Tree :SyntaxTree, Type :GtType, TypeCheckPolicy :number) :TypedNode {
			var Node :TypedNode = this.TypeEachNode(Tree, Type);
			if(Node.IsError()) {
				return Node;
			}
			return Node;
		}
		
		TypeCheck(ParsedTree :SyntaxTree, Type :GtType, TypeCheckPolicy :number) :TypedNode {
			return this.TypeBlock(ParsedTree, Type);
		}
	
		TypeBlock(ParsedTree :SyntaxTree, Type :GtType) :TypedNode {
			var StackTopIndex :number = this.StackTopIndex;
			var LastNode :TypedNode = null;
			while(ParsedTree != null) {
				var CurrentType :GtType = (ParsedTree.NextTree != null) ? this.VoidType : Type;
				var TypedNode :TypedNode = this.TypeCheckEachNode(ParsedTree, CurrentType, DefaultTypeCheckPolicy);
				LastNode = LinkNode(LastNode, TypedNode);
				if(TypedNode.IsError()) {
					break;
				}
				ParsedTree = ParsedTree.NextTree;
			}
			this.StackTopIndex = StackTopIndex;
			return (LastNode == null) ? null : LastNode.MoveHeadNode();
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
		PackageName :string;
		ParentNameSpace :GtNameSpace;
		ImportedNameSpaceList :GtNameSpace[];
		PublicSpecList :GtSpec[];
		PrivateSpecList :GtSpec[];
		
		TokenMatrix :TokenFunc[];
		SymbolPatternTable :any;
		ExtendedPatternTable :any;
		
		constructor(GtContext :GtContext, ParentNameSpace :GtNameSpace) {
			this.GtContext = GtContext;
			this.ParentNameSpace = ParentNameSpace;
			if(ParentNameSpace != null) {
				this.PackageName = ParentNameSpace.PackageName;
			}
			this.ImportedNameSpaceList = null;
			this.PublicSpecList = [];
			this.PrivateSpecList = null;
			this.TokenMatrix = null;
			this.SymbolPatternTable = null;
			this.ExtendedPatternTable = null;
		}
			
		RemakeTokenMatrixEach(NameSpace :GtNameSpace) :void {
			var i :number = 0;
			while(i < ListSize(NameSpace.PublicSpecList)) {
				var Spec :GtSpec = NameSpace.PublicSpecList[i];
				if(Spec.SpecType == TokenFuncSpec) {
				var j :number = 0;
					while(j < Spec.SpecKey.length()) {
						var knumber :number = FromJavaChar(Spec.SpecKey.charAt(j));
						var Func :(a :TokenContext, b :string, c :number) => number = <(a :TokenContext, b :string, c :number) => number>Spec.SpecBody;
						this.TokenMatrix[kchar] = LangDeps.CreateOrReuseTokenFunc(Func, this.TokenMatrix[kchar]);
						j += 1;
					}
				}
				i += 1;
			}
		}
		
		RemakeTokenMatrix(NameSpace :GtNameSpace) :void {
			if(NameSpace.ParentNameSpace != null) {
				RemakeTokenMatrix(NameSpace.ParentNameSpace);
			}
			RemakeTokenMatrixEach(NameSpace);
			var i :number = 0;
			while(i < ListSize(NameSpace.ImportedNameSpaceList)) {
				var Imported :GtNameSpace = NameSpace.ImportedNameSpaceList[i];
				RemakeTokenMatrixEach(Imported);
				i += 1;
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
			
		TableAddSpec(Table :any, Spec :GtSpec) :void {
			var Body :Object = Spec.SpecBody;
			if(Body instanceof SyntaxPattern) {
				var Parent :Object = Table[Spec.SpecKey];
				if(Parent instanceof SyntaxPattern) {
					Body = MergeSyntaxPattern((SyntaxPattern)Body, <SyntaxPattern>Parent);
				}
			}
			Table.put(Spec.SpecKey, Body);
		}
		
		RemakeSymbolTableEach(NameSpace :GtNameSpace, any[] SpecList) :void {
			var i :number = 0;
			while(i < ListSize(SpecList)) {
				var Spec :GtSpec = <GtSpec>SpecList[i];
				if(Spec.SpecType == SymbolPatternSpec) {
					this.TableAddSpec(this.SymbolPatternTable, Spec);
				}
				else if(Spec.SpecType == ExtendedPatternSpec) {
					this.TableAddSpec(this.ExtendedPatternTable, Spec);
				}
				i += 1;
			}
		}
		
		RemakeSymbolTable(NameSpace :GtNameSpace) :void {
			if(NameSpace.ParentNameSpace != null) {
				this.RemakeSymbolTable(NameSpace.ParentNameSpace);
			}
			this.RemakeSymbolTableEach(NameSpace, NameSpace.PublicSpecList);
			this.RemakeSymbolTableEach(NameSpace, NameSpace.PrivateSpecList);
			var i :number = 0;
			while(i < ListSize(NameSpace.ImportedNameSpaceList)) {
				var Imported :GtNameSpace = <GtNameSpace>NameSpace.ImportedNameSpaceList[i];
				this.RemakeSymbolTableEach(Imported, Imported.PublicSpecList);
				i += 1;
			}
		}
		
		GetSymbol(Key :string) :Object {
			if(this.SymbolPatternTable == null) {
				this.SymbolPatternTable = {};
				this.ExtendedPatternTable = {};
				this.RemakeSymbolTable(this);
			}
			return this.SymbolPatternTable[Key];
		}
			
		GetPattern(PatternName :string) :SyntaxPattern {
			var Body :Object = this.GetSymbol(PatternName);
			return (Body instanceof SyntaxPattern) ? <SyntaxPattern>Body : null;
		}
	
		GetExtendedPattern(PatternName :string) :SyntaxPattern {
			if(this.ExtendedPatternTable == null) {
				this.SymbolPatternTable = {};
				this.ExtendedPatternTable = {};
				this.RemakeSymbolTable(this);
			}
			var Body :Object = this.ExtendedPatternTable[PatternName];
			return (Body instanceof SyntaxPattern) ? <SyntaxPattern>Body : null;
		}
	
		DefineSymbol(Key :string, Value :Object) :void {
			var Spec :GtSpec = new GtSpec(SymbolPatternSpec, Key, Value);
			this.PublicSpecList.push(Spec);
			if(this.SymbolPatternTable != null) {
				this.TableAddSpec(this.SymbolPatternTable, Spec);
			}
		}
	
		DefinePrivateSymbol(Key :string, Value :Object) :void {
			var Spec :GtSpec = new GtSpec(SymbolPatternSpec, Key, Value);
			if(this.PrivateSpecList == null) {
				this.PrivateSpecList = [];
			}
			this.PrivateSpecList.push(Spec);
			if(this.SymbolPatternTable != null) {
				this.TableAddSpec(this.SymbolPatternTable, Spec);
			}
		}
	
		DefineSyntaxPattern(PatternName :string, MatchFunc :(a :SyntaxPattern, b :SyntaxTree, c :TokenContext) => SyntaxTree, TypeFunc :(a :TypeEnv, b: SyntaxTree, c: GtType) => TypedNodeCheck) :void {
			var Pattern :SyntaxPattern = new SyntaxPattern(this, PatternName, MatchFunc, TypeFunc);
			var Spec :GtSpec = new GtSpec(SymbolPatternSpec, PatternName, Pattern);
			this.PublicSpecList.push(Spec);
			if(this.SymbolPatternTable != null) {
				this.TableAddSpec(this.SymbolPatternTable, Spec);
			}
		}
	
		DefineExtendedPattern(PatternName :string, SyntaxFlag :number, MatchFunc :(a :SyntaxPattern, b :SyntaxTree, c :TokenContext) => SyntaxTree, TypeFunc :(a :TypeEnv, b: SyntaxTree, c: GtType) => TypedNodeCheck) :void {
			var Pattern :SyntaxPattern = new SyntaxPattern(this, PatternName, MatchFunc, TypeFunc);
			Pattern.SyntaxFlag = SyntaxFlag;
			var Spec :GtSpec = new GtSpec(ExtendedPatternSpec, PatternName, Pattern);
			this.PublicSpecList.push(Spec);
			if(this.ExtendedPatternTable != null) {
				this.TableAddSpec(this.ExtendedPatternTable, Spec);
			}
		}
		
		DefineClass(ClassInfo :GtType) :GtType {
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
		
		// Object :Global
		CreateGlobalObject(ClassFlag :number, ShortName :string) :GtObject {
			var NewClass :GtType = new GtType(this.GtContext, ClassFlag, ShortName, null);
			var GlobalObject :GtObject = new GtObject(NewClass);
			NewClass.DefaultNullValue = GlobalObject;
			return GlobalObject;
		}
	
		GetGlobalObject() :GtObject {
			var GlobalObject :Object = this.GetSymbol(GlobalConstName);
			if(GlobalObject == null || !(GlobalObject instanceof GtObject)) {
				GlobalObject = this.CreateGlobalObject(SingletonClass, "global");
				this.DefinePrivateSymbol(GlobalConstName, GlobalObject);
			}
			return <GtObject> GlobalObject;
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
	
		Eval(ScriptSource :string, FileLine :number, Generator :GreenTeaGenerator) :Object {
			var ResultValue :Object = null;
			DebugP("Eval: " + ScriptSource);
			var TokenContext :TokenContext = new TokenContext(this, ScriptSource, FileLine);
			while(TokenContext.HasNext()) {
				var Tree :SyntaxTree = ParseSyntaxTree(null, TokenContext);
				DebugP("untyped tree: " + Tree);
				var Gamma :TypeEnv = new TypeEnv(this, null);
				var Node :TypedNode = Gamma.TypeCheckEachNode(Tree, Gamma.VoidType, DefaultTypeCheckPolicy);
				ResultValue = Generator.Eval(Node);
			}
			return ResultValue;
		}
	
		LookupMethod(MethodName :string, ParamSize :number) :GtMethod {
			//FIXME
			//MethodName = "ClassName.MethodName";
			//1. (ClassName, MethodName) = MethodName.split(".")
			//2. find MethodName(arg0, arg1, ... , arg_ParamSize)
			return null;
		}
	
		GetSourcePosition(FileLine :number) :string {
			return "(eval:" + <int> FileLine + ")";
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
		LoadTo(NameSpace :GtNameSpace) :void {
			
		}
	}
	
	class KonohaGrammar extends GtGrammar {
	
		// Token
		function WhiteSpaceToken(TokenContext :TokenContext, SourceText :string, pos :number) :number {
			TokenContext.FoundWhiteSpace();
			while(pos < SourceText.length()) {
				var ch :number = SourceText.charAt(pos);
				if(!LangDeps.IsWhitespace(ch)) {
					break;
				}
				pos += 1;
			}
			return pos;
		}
	
		function IndentToken(TokenContext :TokenContext, SourceText :string, pos :number) :number {
			var LineStart :number = pos + 1;
			TokenContext.FoundLineFeed(1);
			pos = pos + 1;
			while(pos < SourceText.length()) {
				var ch :number = SourceText.charAt(pos);
				if(!LangDeps.IsWhitespace(ch)) {
					break;
				}
				pos += 1;
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
			while(pos < SourceText.length()) {
				var ch :number = SourceText.charAt(pos);
				if(!LangDeps.IsLetter(ch) && !LangDeps.IsDigit(ch) && ch != '_') {
					break;
				}
				pos += 1;
			}
			TokenContext.AddNewToken(SourceText.substring(start, pos), 0, null);
			return pos;
		}
	
		function OperatorToken(TokenContext :TokenContext, SourceText :string, pos :number) :number {
			var NextPos :number = pos + 1;
			while(NextPos < SourceText.length()) {
				var ch :number = SourceText.charAt(NextPos);
				if(LangDeps.IsWhitespace(ch) || LangDeps.IsLetter(ch) || LangDeps.IsDigit(ch)) {
					break;
				}
				var Sub :string = SourceText.substring(pos, pos + 1);
				if(TokenContext.NameSpace.GetExtendedPattern(Sub) == null) {
					NextPos += 1;
					continue;
				}
				break;
			}
			TokenContext.AddNewToken(SourceText.substring(pos, NextPos), 0, null);
			return NextPos;
		}
		
	
		function NumberLiteralToken(TokenContext :TokenContext, SourceText :string, pos :number) :number {
			var start :number = pos;
			while(pos < SourceText.length()) {
				var ch :number = SourceText.charAt(pos);
				if(!LangDeps.IsDigit(ch)) {
					break;
				}
				pos += 1;
			}
			TokenContext.AddNewToken(SourceText.substring(start, pos), 0, "$IntegerLiteral$");
			return pos;
		}
	
		function StringLiteralToken(TokenContext :TokenContext, SourceText :string, pos :number) :number {
			var start :number = pos;
			var prev :number = '"';
			while(pos < SourceText.length()) {
				var ch :number = SourceText.charAt(pos);
				if(ch == '"' && prev != '\\') {
					TokenContext.AddNewToken(SourceText.substring(start, pos+1), 0, "$StringLiteral$");
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
			var Token :GtToken = TokenContext.Next();
			var ConstValue :Object = TokenContext.NameSpace.GetSymbol(Token.ParsedText);
			if(ConstValue instanceof GtType) {
				return new SyntaxTree(Pattern, TokenContext.NameSpace, Token, ConstValue);
			}
			return null; // Matched :Not
		}
		
		function TypeConst(Gamma :TypeEnv, ParsedTree :SyntaxTree, Type :GtType) :TypedNode {
			return Gamma.Generator.CreateConstNode(Gamma.GuessType(ParsedTree.ConstValue), ParsedTree, ParsedTree.ConstValue);
		}
		
		function ParseSymbol(Pattern :SyntaxPattern, LeftTree :SyntaxTree, TokenContext :TokenContext) :SyntaxTree {
			var TypeTree :SyntaxTree = TokenContext.ParsePattern("$Type$", Optional);
			if(TypeTree != null) {
				var DeclTree :SyntaxTree = TokenContext.ParsePatternAfter(TypeTree, "$VarDecl$", Optional);
				if(DeclTree != null) {
					return DeclTree;
				}
				DeclTree = TokenContext.ParsePatternAfter(TypeTree, "$MethodDecl$", Optional);
				if(DeclTree != null) {
					return DeclTree;
				}
				return TypeTree;
			}
			var Token :GtToken = TokenContext.Next();
			var NameSpace :GtNameSpace = TokenContext.NameSpace;
			var ConstValue :Object = NameSpace.GetSymbol(Token.ParsedText);
			if(!(ConstValue instanceof GtType)) {
				return new SyntaxTree(NameSpace.GetPattern("$Const$"), NameSpace, Token, ConstValue);
			}
			return new SyntaxTree(NameSpace.GetPattern("$Variable$"), NameSpace, Token, null);
		}
	
		function ParseVariable(Pattern :SyntaxPattern, LeftTree :SyntaxTree, TokenContext :TokenContext) :SyntaxTree {
			var Token :GtToken = TokenContext.Next();
			var ch :number = Token.ParsedText.charAt(0);
			if(LangDeps.IsLetter(ch) || ch == '_') {
				return new SyntaxTree(Pattern, TokenContext.NameSpace, Token, null);
			}
			return null;
		}
		
		function TypeVariable(Gamma :TypeEnv, ParsedTree :SyntaxTree, Type :GtType) :TypedNode {
			var Name :string = ParsedTree.KeyToken.ParsedText;
			var VariableInfo :VariableInfo = Gamma.LookupDeclaredVariable(Name);
			if(VariableInfo != null) {
				return Gamma.Generator.CreateLocalNode(Type, ParsedTree, VariableInfo.LocalName);
			}
			var Delegate :GtDelegate = Gamma.LookupDelegate(Name);
			if(Delegate != null) {
				return Gamma.Generator.CreateConstNode(Delegate.Type, ParsedTree, Delegate);
			}
			return Gamma.CreateErrorNode(ParsedTree, "undefined name: " + Name);
		}
		
		function ParseVarDecl(Pattern :SyntaxPattern, LeftTree :SyntaxTree, TokenContext :TokenContext) :SyntaxTree {
			var Tree :SyntaxTree = new SyntaxTree(Pattern, TokenContext.NameSpace, TokenContext.GetToken(), null);
			Tree.SetMatchedPatternAt(VarDeclType, TokenContext, "$Type$", Required);
			Tree.SetMatchedPatternAt(VarDeclName, TokenContext, "$Variable$", Required);
			if(TokenContext.MatchToken("=")) {
				Tree.SetMatchedPatternAt(VarDeclValue, TokenContext, "$Expression$", Required);
			}
			while(TokenContext.MatchToken(",")) {
				var NextTree :SyntaxTree = new SyntaxTree(Pattern, TokenContext.NameSpace, Tree.KeyToken, null);
				NextTree.SetSyntaxTreeAt(VarDeclType, Tree.GetSyntaxTreeAt(VarDeclType));
				Tree.LinkNode(NextTree);
				Tree = NextTree;
				Tree.SetMatchedPatternAt(VarDeclName, TokenContext, "$Variable$", Required);
				if(TokenContext.MatchToken("=")) {
					Tree.SetMatchedPatternAt(VarDeclValue, TokenContext, "$Expression$", Required);
				}
			}
			return Tree;
		}
	
		function TypeVarDecl(Gamma :TypeEnv, ParsedTree :SyntaxTree, Type :GtType) :TypedNode {
			var TypeTree :SyntaxTree = ParsedTree.GetSyntaxTreeAt(VarDeclType);
			var NameTree :SyntaxTree = ParsedTree.GetSyntaxTreeAt(VarDeclName);
			var ValueTree :SyntaxTree = ParsedTree.GetSyntaxTreeAt(VarDeclValue);
			var DeclType :GtType = <GtType>TypeTree.ConstValue;
			var VariableName :string = NameTree.KeyToken.ParsedText;
			if(!Gamma.AppendDeclaredVariable(DeclType, VariableName)) {
				Gamma.CreateErrorNode(TypeTree, "already defined variable " + VariableName);
			}
			var VariableNode :TypedNode = Gamma.TypeCheck(NameTree, DeclType, DefaultTypeCheckPolicy);
			var InitValueNode :TypedNode = (ValueTree == null) ? Gamma.DefaultValueConstNode(ParsedTree, DeclType) : Gamma.TypeCheck(ValueTree, DeclType, DefaultTypeCheckPolicy);
			var AssignNode :TypedNode = Gamma.Generator.CreateAssignNode(DeclType, ParsedTree, VariableNode, InitValueNode);
			var BlockNode :TypedNode = Gamma.TypeBlock(ParsedTree.NextTree, Type);
			ParsedTree.NextTree = null;
			LinkNode(AssignNode, BlockNode);
			return Gamma.Generator.CreateLetNode(BlockNode.Type, ParsedTree, DeclType, VariableNode, AssignNode);
		}
	
		// And :Parse Type
		function ParseIntegerLiteral(Pattern :SyntaxPattern, LeftTree :SyntaxTree, TokenContext :TokenContext) :SyntaxTree {
			var Token :GtToken = TokenContext.Next();
			return new SyntaxTree(Pattern, TokenContext.NameSpace, Token, LangDeps.ParseInt(Token.ParsedText));
		}
	
		function ParseStringLiteral(Pattern :SyntaxPattern, LeftTree :SyntaxTree, TokenContext :TokenContext) :SyntaxTree {
			var Token :GtToken = TokenContext.Next();
			TODO("handling string literal");
			return new SyntaxTree(Pattern, TokenContext.NameSpace, Token, Token.ParsedText);
		}
	
		function ParseExpression(Pattern :SyntaxPattern, LeftTree :SyntaxTree, TokenContext :TokenContext) :SyntaxTree {
			return ParseSyntaxTree(null, TokenContext);
		}
		
		function ParseUnary(Pattern :SyntaxPattern, LeftTree :SyntaxTree, TokenContext :TokenContext) :SyntaxTree {
			var Token :GtToken = TokenContext.Next();
			var Tree :SyntaxTree = new SyntaxTree(Pattern, TokenContext.NameSpace, Token, null);
			Tree.SetMatchedPatternAt(0, TokenContext, "$Expression$", Required);
			return Tree;
		}
	
		function ParseBinary(Pattern :SyntaxPattern, LeftTree :SyntaxTree, TokenContext :TokenContext) :SyntaxTree {
			var Token :GtToken = TokenContext.Next();
			var RightTree :SyntaxTree = ParseSyntaxTree(null, TokenContext);
			if(IsEmptyOrError(RightTree)) return RightTree;
			
			
			if(RightTree.Pattern.IsBinaryOperator()) {
				if(Pattern.IsLeftJoin(RightTree.Pattern)) {
					var NewTree :SyntaxTree = new SyntaxTree(Pattern, TokenContext.NameSpace, Token, null);
					NewTree.SetSyntaxTreeAt(LeftHandTerm, LeftTree);
					NewTree.SetSyntaxTreeAt(RightHandTerm, RightTree.GetSyntaxTreeAt(LeftHandTerm));
					RightTree.SetSyntaxTreeAt(LeftHandTerm, NewTree);
					return RightTree;
				}
			}
			var NewTree :SyntaxTree = new SyntaxTree(Pattern, TokenContext.NameSpace, Token, null);
			NewTree.SetSyntaxTreeAt(LeftHandTerm, LeftTree);
			NewTree.SetSyntaxTreeAt(RightHandTerm, RightTree);
			if(RightTree.NextTree != null) {
				NewTree.LinkNode(RightTree.NextTree);
				RightTree.NextTree = null;
			}
			return NewTree;
		}
	
		function TypeBinary(Gamma :TypeEnv, ParsedTree :SyntaxTree, Type :GtType) :TypedNode {
			var LeftNode :TypedNode = ParsedTree.TypeNodeAt(LeftHandTerm, Gamma, Gamma.VarType, DefaultTypeCheckPolicy);
			var RightNode :TypedNode = ParsedTree.TypeNodeAt(RightHandTerm, Gamma, Gamma.VarType, DefaultTypeCheckPolicy);
			return Gamma.Generator.CreateBinaryNode(Gamma.AnyType, ParsedTree, null, LeftNode, RightNode);
		}
		
		function ParseField(Pattern :SyntaxPattern, LeftTree :SyntaxTree, TokenContext :TokenContext) :SyntaxTree {
			TokenContext.MatchToken(".");
			var Token :GtToken = TokenContext.Next();
			var NewTree :SyntaxTree = new SyntaxTree(Pattern, TokenContext.NameSpace, Token, null);
			NewTree.AppendParsedTree(LeftTree);
			return NewTree;
		}
	
		function TypeField(Gamma :TypeEnv, ParsedTree :SyntaxTree, Type :GtType) :TypedNode {
			var ExprNode :TypedNode = ParsedTree.TypeNodeAt(UnaryTerm, Gamma, Gamma.VarType, DefaultTypeCheckPolicy);
			var Method :GtMethod = ExprNode.Type.GetGetter(ParsedTree.KeyToken.ParsedText);
			return Gamma.Generator.CreateGetterNode(Method.GetReturnType(), ParsedTree, Method, ExprNode);
		}
		
		// PatternName: "("
		function ParseParenthesis(Pattern :SyntaxPattern, LeftTree :SyntaxTree, TokenContext :TokenContext) :SyntaxTree {
			var ParseFlag :number = TokenContext.ParseFlag;
			TokenContext.MatchToken("(");
			TokenContext.ParseFlag |= SkipIndentParseFlag;
			var Tree :SyntaxTree = TokenContext.ParsePattern("$Expression$", Required);
			if(!TokenContext.MatchToken(")")) {
				Tree = TokenContext.ReportExpectedToken(")");
			}
			TokenContext.ParseFlag = ParseFlag;		
			return Tree;
		}
		
		function ParseApply(Pattern :SyntaxPattern, LeftTree :SyntaxTree, TokenContext :TokenContext) :SyntaxTree {
			var ParseFlag :number = TokenContext.ParseFlag;
			TokenContext.ParseFlag |= SkipIndentParseFlag;
			var FuncTree :SyntaxTree = new SyntaxTree(Pattern, TokenContext.NameSpace, TokenContext.GetMatchedToken("("), null);
			FuncTree.AppendParsedTree(LeftTree);
			while(!FuncTree.IsEmptyOrError() && !TokenContext.MatchToken(")")) {
				var Tree :SyntaxTree = TokenContext.ParsePattern("$Expression$", Required);
				FuncTree.AppendParsedTree(Tree);
				if(TokenContext.MatchToken(",")) continue;
			}
			TokenContext.ParseFlag = ParseFlag;		
			return FuncTree;
		}
	
		function TypeApply(Gamma :TypeEnv, ParsedTree :SyntaxTree, Type :GtType) :TypedNode {
			var ApplyNode :TypedNode = Gamma.Generator.CreateApplyNode(Gamma.AnyType, ParsedTree, null);
			var i :number = 0;
			while(i < ListSize(ParsedTree.TreeList)) {
				var ExprNode :TypedNode = ParsedTree.TypeNodeAt(UnaryTerm, Gamma, Gamma.VarType, DefaultTypeCheckPolicy);
				ApplyNode.Append(ExprNode);
				i += 1;
			}
			return ApplyNode;
		}
	
		function ParseEmpty(Pattern :SyntaxPattern, LeftTree :SyntaxTree, TokenContext :TokenContext) :SyntaxTree {
			return new SyntaxTree(Pattern, TokenContext.NameSpace, NullToken, null);
		}
	
		function TypeEmpty(Gamma :TypeEnv, ParsedTree :SyntaxTree, Type :GtType) :TypedNode {
			return Gamma.Generator.CreateNullNode(Gamma.VoidType, ParsedTree);
		}
		
		function ParseBlock(Pattern :SyntaxPattern, LeftTree :SyntaxTree, TokenContext :TokenContext) :SyntaxTree {
			if(TokenContext.MatchToken("{")) {
				var PrevTree :SyntaxTree = null;
				while(TokenContext.SkipEmptyStatement()) {
					if(TokenContext.MatchToken("}")) break;
					PrevTree = ParseSyntaxTree(PrevTree, TokenContext);
					if(IsEmptyOrError(PrevTree)) return PrevTree;
				}
				if(PrevTree == null) {
					return TokenContext.ParsePattern("$Empty$", Required);
				}
				return TreeHead(PrevTree);
			}
			return null;
		}
	
		function TypeBlock(Gamma :TypeEnv, ParsedTree :SyntaxTree, Type :GtType) :TypedNode {
			return Gamma.TypeBlock(ParsedTree, Type);
		}
	
	
		function TypeAnd(Gamma :TypeEnv, ParsedTree :SyntaxTree, Type :GtType) :TypedNode {
			var LeftNode :TypedNode = ParsedTree.TypeNodeAt(LeftHandTerm, Gamma, Gamma.BooleanType, DefaultTypeCheckPolicy);
			var RightNode :TypedNode = ParsedTree.TypeNodeAt(RightHandTerm, Gamma, Gamma.BooleanType, DefaultTypeCheckPolicy);
			return Gamma.Generator.CreateAndNode(Gamma.BooleanType, ParsedTree, LeftNode, RightNode);
		}
	
		function TypeOr(Gamma :TypeEnv, ParsedTree :SyntaxTree, Type :GtType) :TypedNode {
			var LeftNode :TypedNode = ParsedTree.TypeNodeAt(LeftHandTerm, Gamma, Gamma.BooleanType, DefaultTypeCheckPolicy);
			var RightNode :TypedNode = ParsedTree.TypeNodeAt(RightHandTerm, Gamma, Gamma.BooleanType, DefaultTypeCheckPolicy);
			return Gamma.Generator.CreateOrNode(Gamma.BooleanType, ParsedTree, LeftNode, RightNode);
		}
	
		function ParseMember(Pattern :SyntaxPattern, LeftTree :SyntaxTree, TokenContext :TokenContext) :SyntaxTree {
			var Token :GtToken = TokenContext.GetToken();
			var NewTree :SyntaxTree = new SyntaxTree(Pattern, TokenContext.NameSpace, Token, null);
			NewTree.SetSyntaxTreeAt(0, LeftTree);
			return NewTree;		
		}
	
		// Statement :If
	
		function ParseIf(Pattern :SyntaxPattern, LeftTree :SyntaxTree, TokenContext :TokenContext) :SyntaxTree {
			var Token :GtToken = TokenContext.GetMatchedToken("if");
			var NewTree :SyntaxTree = new SyntaxTree(Pattern, TokenContext.NameSpace, Token, null);
			NewTree.SetMatchedTokenAt(NoWhere, TokenContext, "(", Required);
			NewTree.SetMatchedPatternAt(IfCond, TokenContext, "$Expression$", Required);
			NewTree.SetMatchedTokenAt(NoWhere, TokenContext, ")", Required);
			NewTree.SetMatchedPatternAt(IfThen, TokenContext, "$Statement$", Required);
			if(TokenContext.MatchToken("else")) {
				NewTree.SetMatchedPatternAt(IfElse, TokenContext, "$Statement$", Required);
			}
			return NewTree;
		}
	
		function TypeIf(Gamma :TypeEnv, ParsedTree :SyntaxTree, Type :GtType) :TypedNode {
			var CondNode :TypedNode = ParsedTree.TypeNodeAt(IfCond, Gamma, Gamma.BooleanType, DefaultTypeCheckPolicy);
			var ThenNode :TypedNode = ParsedTree.TypeNodeAt(IfThen, Gamma, Type, DefaultTypeCheckPolicy);
			var ElseNode :TypedNode = ParsedTree.TypeNodeAt(IfElse, Gamma, ThenNode.Type, AllowEmptyPolicy);
			return Gamma.Generator.CreateIfNode(ThenNode.Type, ParsedTree, CondNode, ThenNode, ElseNode);
		}
	
		// Statement :Return
		function ParseReturn(Pattern :SyntaxPattern, LeftTree :SyntaxTree, TokenContext :TokenContext) :SyntaxTree {
			var Token :GtToken = TokenContext.GetMatchedToken("return");
			var NewTree :SyntaxTree = new SyntaxTree(Pattern, TokenContext.NameSpace, Token, null);
			NewTree.SetMatchedPatternAt(ReturnExpr, TokenContext, "$Expression$", Optional);
			return NewTree;
		}
	
		function TypeReturn(Gamma :TypeEnv, ParsedTree :SyntaxTree, Type :GtType) :TypedNode {
			var Expr :TypedNode = ParsedTree.TypeNodeAt(ReturnExpr, Gamma, Gamma.ReturnType, DefaultTypeCheckPolicy);
			return Gamma.Generator.CreateReturnNode(Expr.Type, ParsedTree, Expr);
		}
		
		function ParseMethodDecl(Pattern :SyntaxPattern, LeftTree :SyntaxTree, TokenContext :TokenContext) :SyntaxTree {
			var Tree :SyntaxTree = new SyntaxTree(Pattern, TokenContext.NameSpace, TokenContext.GetToken(), null);
			Tree.SetMatchedPatternAt(MethodDeclReturnType, TokenContext, "$Type$", Required);
			Tree.SetMatchedPatternAt(MethodDeclClass, TokenContext, "$MethodClass$", Optional);
			Tree.SetMatchedPatternAt(MethodDeclName, TokenContext, "$MethodName$", Required);
			Tree.SetMatchedTokenAt(NoWhere, TokenContext, "(", Required);
			var ParamBase :number = MethodDeclParam;
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
	
		function TypeMethodDecl(Gamma :TypeEnv, Tree :SyntaxTree, Type :GtType) :TypedNode {
			TODO("TypeMethodDecl");
			return null;
		}
	
		LoadTo(NameSpace :GtNameSpace) :void {
			// Types :Define
			var GtContext :GtContext = NameSpace.GtContext;
	
			// Constants :Define
			NameSpace.DefineSymbol("true", new Boolean(true));
			NameSpace.DefineSymbol("false", new Boolean(false));
	
			NameSpace.DefineTokenFunc(" \t", WhiteSpaceToken);
			NameSpace.DefineTokenFunc("\n", IndentToken);
			NameSpace.DefineTokenFunc("(){}[]<>.,:;+-*/%=&|!", OperatorToken);
			NameSpace.DefineTokenFunc("Aa", SymbolToken);
			NameSpace.DefineTokenFunc("\"", StringLiteralToken);
			NameSpace.DefineTokenFunc("1", NumberLiteralToken);
			NameSpace.DefineSyntaxPattern("+", ParseUnary, TypeOperator);
			NameSpace.DefineSyntaxPattern("-", ParseUnary, TypeOperator);
			NameSpace.DefineSyntaxPattern("!", ParseUnary, TypeOperator);
			
			NameSpace.DefineExtendedPattern("*", BinaryOperator | Precedence_CStyleMUL, ParseBinary, TypeOperator);
			NameSpace.DefineExtendedPattern("/", BinaryOperator | Precedence_CStyleMUL, ParseBinary, TypeOperator);
			NameSpace.DefineExtendedPattern("%", BinaryOperator | Precedence_CStyleMUL, ParseBinary, TypeOperator);
	
			NameSpace.DefineExtendedPattern("+", BinaryOperator | Precedence_CStyleADD, ParseBinary, TypeOperator);
			NameSpace.DefineExtendedPattern("-", BinaryOperator | Precedence_CStyleADD, ParseBinary, TypeOperator);
	
			NameSpace.DefineExtendedPattern("<", BinaryOperator | Precedence_CStyleCOMPARE, ParseBinary, TypeOperator);
			NameSpace.DefineExtendedPattern("<=", BinaryOperator | Precedence_CStyleCOMPARE, ParseBinary, TypeOperator);
			NameSpace.DefineExtendedPattern(">", BinaryOperator | Precedence_CStyleCOMPARE, ParseBinary, TypeOperator);
			NameSpace.DefineExtendedPattern(">=", BinaryOperator | Precedence_CStyleCOMPARE, ParseBinary, TypeOperator);
			NameSpace.DefineExtendedPattern("==", BinaryOperator | Precedence_CStyleEquals, ParseBinary, TypeOperator);
			NameSpace.DefineExtendedPattern("!=", BinaryOperator | Precedence_CStyleEquals, ParseBinary, TypeOperator);
	
			NameSpace.DefineExtendedPattern("=", BinaryOperator | Precedence_CStyleAssign | LeftJoin, ParseBinary, TypeAssign);
	
			NameSpace.DefineExtendedPattern("&&", BinaryOperator | Precedence_CStyleAND, ParseBinary, TypeAnd);
			NameSpace.DefineExtendedPattern("||", BinaryOperator | Precedence_CStyleOR, ParseBinary, TypeOr);
			
			NameSpace.DefineSyntaxPattern("$Symbol$", ParseSymbol, null);
			NameSpace.DefineSyntaxPattern("$Type$", ParseType, ParseVariable);
			NameSpace.DefineSyntaxPattern("$Variable$", ParseVariable, ParseVariable);
			NameSpace.DefineSyntaxPattern("$Const$", ParseConst, TypeConst);
	
			NameSpace.DefineSyntaxPattern("$StringLiteral$", ParseStringLiteral, TypeConst);
			NameSpace.DefineSyntaxPattern("$IntegerLiteral$", ParseIntegerLiteral, TypeConst);
	
			NameSpace.DefineSyntaxPattern("(", ParseParenthesis, null);
			NameSpace.DefineExtendedPattern("(", 0, ParseApply, TypeField);
			NameSpace.DefineExtendedPattern(".", 0, ParseField, TypeField);
			
			NameSpace.DefineSyntaxPattern("$Block$", ParseBlock, TypeBlock);
			NameSpace.DefineSyntaxPattern("$Statement$", ParseStatement, TypeBlock);
			NameSpace.DefineSyntaxPattern("$MethodDecl$", ParseMethodDecl, TypeMethodDecl);
			NameSpace.DefineSyntaxPattern("$VarDecl$", ParseVarDecl, TypeVarDecl);
			NameSpace.DefineSyntaxPattern("if", ParseIf, TypeIf);
			NameSpace.DefineSyntaxPattern("return", ParseReturn, ParseReturn);
		}
	}
	
	
	class GtContext {
		RootNameSpace :GtNameSpace;
		DefaultNameSpace :GtNameSpace;
	
		VoidType :GtType;
		ObjectType :GtType;
		BooleanType :GtType;
		IntType :GtType;
		StringType :GtType;
		VarType :GtType;
		AnyType :GtType;
	
		ClassNameMap :any;
		Generator :GreenTeaGenerator;
		
		constructor(Grammar :GtGrammar, Generator :GreenTeaGenerator) {
			this.ClassNameMap = {};
			this.Generator = Generator;
			this.RootNameSpace = new GtNameSpace(this, null);
			this.VoidType = this.RootNameSpace.DefineClass(new GtType(this, 0, "void", null));
			this.ObjectType = this.RootNameSpace.DefineClass(new GtType(this, 0, "Object", new Object()));
			this.BooleanType = this.RootNameSpace.DefineClass(new GtType(this, 0, "boolean", false));
			this.IntType = this.RootNameSpace.DefineClass(new GtType(this, 0, "int", 0));
			this.StringType = this.RootNameSpace.DefineClass(new GtType(this, 0, "String", ""));
			this.VarType = this.RootNameSpace.DefineClass(new GtType(this, 0, "var", null));		
			this.AnyType = this.RootNameSpace.DefineClass(new GtType(this, 0, "any", null));
			Grammar.LoadTo(this.RootNameSpace);
			this.DefaultNameSpace = new GtNameSpace(this, this.RootNameSpace);
		}
	
		LoadGrammar(Grammar :GtGrammar) :void {
			Grammar.LoadTo(this.DefaultNameSpace);
		}
		
		Define(Symbol :string, Value :Object) :void {
			this.RootNameSpace.DefineSymbol(Symbol, Value);
		}
	
		Eval(text :string, FileLine :number) :Object {
			return this.DefaultNameSpace.Eval(text, FileLine, this.Generator);
		}
	}
	
	class GreenTeaScript {
		
		function TestAll(Context :GtContext) :void {
			TestSyntaxPattern(Context, "int");
		}
		
		function main(argc :string[]) :void {
			var GtContext :GtContext = new GtContext(new KonohaGrammar(), new GreenTeaGenerator());
			//GtContext.Eval("f(a :number, b :number) :number { return a + b; }", 0);
			//GtContext.Eval("1 + 2 * 3", 0);
			TestAll(GtContext);
		}
	
	}
	
	import java.util.ArrayList;
	
	class TypedNode {
		ParentNode :TypedNode;
		PrevNode :TypedNode;
		NextNode :TypedNode;
	
		Type :GtType;
		Token :GtToken;
	
		constructor(Type :GtType, Token :GtToken) {
			this.Type = Type;
			this.Token = Token;
			this.ParentNode = null;
			this.PrevNode = null;
			this.NextNode = null;
		}
	
		MoveHeadNode() :TypedNode {
			var Node :TypedNode = this;
			while(Node.PrevNode != null) {
				Node = Node.PrevNode;
			}
			return Node;
		}
	
		MoveTailNode() :TypedNode {
			var Node :TypedNode = this;
			while(Node.NextNode != null) {
				Node = Node.NextNode;
			}
			return this;
		}
	
		Append(Node :TypedNode) :void {
			
		}
		
		Evaluate(Visitor :GreenTeaGenerator) :void {
			
		}
	
		IsError() :boolean {
			return (this instanceof ErrorNode);
		}
	}
	
	class UnaryNode extends TypedNode {
		Method :GtMethod;
		Expr :TypedNode;
		constructor(Type :GtType, Token :GtToken, Method :GtMethod, Expr :TypedNode) {
			super(Type, Token);
			this.Method = Method;
			this.Expr = Expr;
		}
		Evaluate(Visitor :GreenTeaGenerator) :void {
			Visitor.VisitUnaryNode(this);
		}
	}
	
	class SuffixNode extends TypedNode {
		Method :GtMethod;
		Expr :TypedNode;
		constructor(Type :GtType, Token :GtToken, Method :GtMethod, Expr :TypedNode) {
			super(Type, Token);
			this.Method = Method;
			this.Expr = Expr;
		}
		Evaluate(Visitor :GreenTeaGenerator) :void {
			Visitor.VisitSuffixNode(this);
		}
	}
	
	class BinaryNode extends TypedNode {
		Method :GtMethod;
		LeftNode :TypedNode;
		RightNode :TypedNode;
		constructor(Type :GtType, Token :GtToken, Method :GtMethod, Left :TypedNode, Right :TypedNode) {
			super(Type, Token);
			this.Method = Method;
			this.LeftNode = Left;
			this.RightNode = Right;
		}
		Evaluate(Visitor :GreenTeaGenerator) :void {
			Visitor.VisitBinaryNode(this);
		}
	}
	
	class AndNode extends TypedNode {
		LeftNode :TypedNode;
		RightNode :TypedNode;
		constructor(Type :GtType, Token :GtToken, Left :TypedNode, Right :TypedNode) {
			super(Type, Token);
			this.LeftNode = Left;
			this.RightNode = Right;
		}
		Evaluate(Visitor :GreenTeaGenerator) :void {
			Visitor.VisitAndNode(this);
		}
	}
	
	class OrNode extends TypedNode {
		LeftNode :TypedNode;
		RightNode :TypedNode;
		constructor(Type :GtType, Token :GtToken, Left :TypedNode, Right :TypedNode) {
			super(Type, Token);
			this.LeftNode = Left;
			this.RightNode = Right;
		}
		Evaluate(Visitor :GreenTeaGenerator) :void {
			Visitor.VisitOrNode(this);
		}
	}
	
	class GetterNode extends TypedNode {
		Expr :TypedNode;
		Method :GtMethod;
		constructor(Type :GtType, Token :GtToken, Method :GtMethod, Expr :TypedNode) {
			super(Type, Token);
			this.Method = Method;
			this.Expr = Expr;
		}
		Evaluate(Visitor :GreenTeaGenerator) :void {
			Visitor.VisitGetterNode(this);
		}
	}
	
	class IndexerNode extends TypedNode {
		Method :GtMethod;
		Expr :TypedNode;
		Indexer :TypedNode;
		constructor(Type :GtType, Token :GtToken, Method :GtMethod, Expr :TypedNode, Indexer :TypedNode) {
			super(Type, Token);
			this.Method = Method;
			this.Expr = Expr;
			this.Indexer = Indexer;
		}
		Evaluate(Visitor :GreenTeaGenerator) :void {
			Visitor.VisitIndexerNode(this);
		}
	}
	
	class AssignNode extends TypedNode {
		LeftNode :TypedNode;
		RightNode :TypedNode;
		constructor(Type :GtType, Token :GtToken, Left :TypedNode, Right :TypedNode) {
			super(Type, Token);
			this.LeftNode = Left;
			this.RightNode = Right;
		}
		Evaluate(Visitor :GreenTeaGenerator) :void {
			Visitor.VisitAssignNode(this);
		}
	}
	
	class ConstNode extends TypedNode {
		ConstValue :Object;
		constructor(Type :GtType, Token :GtToken, ConstValue :Object) {
			super(Type, Token);
			this.ConstValue = ConstValue;
		}
		Evaluate(Visitor :GreenTeaGenerator) :void {
			Visitor.VisitConstNode(this);
		}
	}
	
	class LocalNode extends TypedNode {
		LocalName :string;
		constructor(Type :GtType, Token :GtToken, LocalName :string) {
			super(Type, Token);
			this.LocalName = LocalName;
		}
		Evaluate(Visitor :GreenTeaGenerator) :void {
			Visitor.VisitLocalNode(this);
		}
	}
	
	class NullNode extends TypedNode {
		constructor(Type :GtType, Token :GtToken) {
			super(Type, Token);
		}
		Evaluate(Visitor :GreenTeaGenerator) :void {
			Visitor.VisitNullNode(this);
		}
	}
	
	class LetNode extends TypedNode {
		DeclType :GtType;  
		VarNode :TypedNode;
		BlockNode :TypedNode;
		
		constructor(Type :GtType, Token :GtToken, DeclType :GtType, VarNode :TypedNode, Block :TypedNode) {
			super(Type, Token);
			this.DeclType = DeclType;
			this.VarNode = VarNode;
			this.BlockNode = Block;
		}
		Evaluate(Visitor :GreenTeaGenerator) :void {
			Visitor.VisitLetNode(this);
		}
	}
	
	class ApplyNode extends TypedNode {
		Method :GtMethod;
		
		constructor(Type :GtType, KeyToken :GtToken, Method :GtMethod) {
			super(Type, KeyToken);
			this.Method = Method;
			this.Params = [];
		}
		Append(Expr :TypedNode) :void {
			this.Params.push(Expr);
		}
	
		Evaluate(Visitor :GreenTeaGenerator) :void {
			Visitor.VisitApplyNode(this);
		}
	}
	
	class MessageNode extends TypedNode {
		Method :GtMethod;
		
		constructor(Type :GtType, KeyToken :GtToken, Method :GtMethod) {
			super(Type, KeyToken);
			this.Method = Method;
			this.Params = [];
		}
		Append(Expr :TypedNode) :void {
			this.Params.push(Expr);
		}
	
		Evaluate(Visitor :GreenTeaGenerator) :void {
			Visitor.VisitMessageNode(this);
		}
	}
	
	class NewNode extends TypedNode {
		
		constructor(Type :GtType, Token :GtToken) {
			super(Type, Token);
			this.Params = [];
		}
		Append(Expr :TypedNode) :void {
			this.Params.push(Expr);
		}
		Evaluate(Visitor :GreenTeaGenerator) :void {
			Visitor.VisitNewNode(this);
		}
	}
	
	class IfNode extends TypedNode {
		CondExpr :TypedNode;
		ThenNode :TypedNode;
		ElseNode :TypedNode;
		
		constructor(Type :GtType, Token :GtToken, CondExpr :TypedNode, ThenBlock :TypedNode, ElseNode :TypedNode) {
			super(Type, Token);
			this.CondExpr = CondExpr;
			this.ThenNode = ThenBlock;
			this.ElseNode = ElseNode;
		}
		Evaluate(Visitor :GreenTeaGenerator) :void {
			Visitor.VisitIfNode(this);
		}
	}
	
	class WhileNode extends TypedNode {
		CondExpr :TypedNode;
		LoopBody :TypedNode;
		constructor(Type :GtType, Token :GtToken, CondExpr :TypedNode, LoopBody :TypedNode) {
			super(Type, Token);
			this.CondExpr = CondExpr;
			this.LoopBody = LoopBody;
		}
		Evaluate(Visitor :GreenTeaGenerator) :void {
			Visitor.VisitWhileNode(this);
		}
	}
	
	class DoWhileNode extends TypedNode {
		CondExpr :TypedNode;
		LoopBody :TypedNode;
		constructor(Type :GtType, Token :GtToken, CondExpr :TypedNode, LoopBody :TypedNode) {
			super(Type, Token);
			this.CondExpr = CondExpr;
			this.LoopBody = LoopBody;
		}
		Evaluate(Visitor :GreenTeaGenerator) :void {
			Visitor.VisitDoWhileNode(this);
		}
	}
	
	class ForNode extends TypedNode {
		CondExpr :TypedNode;
		IterExpr :TypedNode;
		LoopBody :TypedNode;
		constructor(Type :GtType, Token :GtToken, CondExpr :TypedNode, IterExpr :TypedNode, LoopBody :TypedNode) {
			super(Type, Token);
			this.CondExpr = CondExpr;
			this.LoopBody = LoopBody;
			this.IterExpr = IterExpr;
		}
		Evaluate(Visitor :GreenTeaGenerator) :void {
			Visitor.VisitForNode(this);
		}
	}
	
	class ForEachNode extends TypedNode {
		CondExpr :TypedNode;
		Variable :TypedNode;
		IterExpr :TypedNode;
		LoopBody :TypedNode;
		constructor(Type :GtType, Token :GtToken, Variable :TypedNode, IterExpr :TypedNode, LoopBody :TypedNode) {
			super(Type, Token);
			this.Variable = Variable;
			this.IterExpr = IterExpr;
			this.LoopBody = LoopBody;
		}
		Evaluate(Visitor :GreenTeaGenerator) :void {
			Visitor.VisitForEachNode(this);
		}
	}
	
	class LoopNode extends TypedNode {
		CondExpr :TypedNode;
		LoopBody :TypedNode;
		IterExpr :TypedNode;
		constructor(Type :GtType, Token :GtToken, CondExpr :TypedNode, LoopBody :TypedNode, IterExpr :TypedNode) {
			super(Type, Token);
			this.CondExpr = CondExpr;
			this.LoopBody = LoopBody;
			this.IterExpr = IterExpr;
		}
		Evaluate(Visitor :GreenTeaGenerator) :void {
			Visitor.VisitLoopNode(this);
		}
	}
	
	class LabelNode extends TypedNode {
		Label :string;
		constructor(Type :GtType, Token :GtToken, Label :string) {
			super(Type, Token);
			this.Label = Label;
		}
		Evaluate(Visitor :GreenTeaGenerator) :void {
			Visitor.VisitLabelNode(this);
		}
	}
	
	class JumpNode extends TypedNode {
		Label :string;
		constructor(Type :GtType, Token :GtToken, Label :string) {
			super(Type, Token);
			this.Label = Label;
		}
		Evaluate(Visitor :GreenTeaGenerator) :void {
			Visitor.VisitJumpNode(this);
		}
	}
	
	class ContinueNode extends TypedNode {
		Label :string;
		constructor(Type :GtType, Token :GtToken, Label :string) {
			super(Type, Token);
			this.Label = Label;
		}
		Evaluate(Visitor :GreenTeaGenerator) :void {
			Visitor.VisitContinueNode(this);
		}
	}
	
	class BreakNode extends TypedNode {
		Label :string;
		constructor(Type :GtType, Token :GtToken, Label :string) {
			super(Type, Token);
			this.Label = Label;
		}
		Evaluate(Visitor :GreenTeaGenerator) :void {
			Visitor.VisitBreakNode(this);
		}
	}
	
	class ReturnNode extends TypedNode {
		Expr :TypedNode;
		constructor(Type :GtType, Token :GtToken, Expr :TypedNode) {
			super(Type, Token);
			this.Expr = Expr;
		}
		Evaluate(Visitor :GreenTeaGenerator) :void {
			Visitor.VisitReturnNode(this);
		}
	}
	
	class ThrowNode extends TypedNode {
		Expr :TypedNode;
		constructor(Type :GtType, Token :GtToken, Expr :TypedNode) {
			super(Type, Token);
			this.Expr = Expr;
		}
		Evaluate(Visitor :GreenTeaGenerator) :void {
			Visitor.VisitThrowNode(this);
		}
	}
	
	class TryNode extends TypedNode {
		TryBlock :TypedNode;
		CatchBlock :TypedNode;
		FinallyBlock :TypedNode;
		constructor(Type :GtType, Token :GtToken, TryBlock :TypedNode, FinallyBlock :TypedNode) {
			super(Type, Token);
			this.TryBlock = TryBlock;
			this.FinallyBlock = FinallyBlock;
			this.CatchBlock = null;
		}
		Evaluate(Visitor :GreenTeaGenerator) :void {
			Visitor.VisitTryNode(this);
		}
	}
	
	class SwitchNode extends TypedNode {
		constructor(Type :GtType, Token :GtToken) {
			super(Type, Token);
		}
		Evaluate(Visitor :GreenTeaGenerator) :void {
			Visitor.VisitSwitchNode(this);
		}
	}
	
	class DefineNode extends TypedNode {
		DefInfo :GtDef;
		constructor(Type :GtType, Token :GtToken, DefInfo :GtDef) {
			super(Type, Token);
			this.DefInfo = DefInfo;
		}
		Evaluate(Visitor :GreenTeaGenerator) :void {
			Visitor.VisitDefineNode(this);
		}
	}
	
	class FunctionNode extends TypedNode {
		constructor(Type :GtType, Token :GtToken) {
			super(Type, Token); // TODO
		}
		Evaluate(Visitor :GreenTeaGenerator) :void {
			Visitor.VisitFunctionNode(this);
		}
	}
	
	class ErrorNode extends TypedNode {
		constructor(Type :GtType, Token :GtToken) {
			super(Type, Token);
		}
		Evaluate(Visitor :GreenTeaGenerator) :void {
			Visitor.VisitErrorNode(this);
		}
	}
	
	class GreenTeaGenerator {
			
		CreateConstNode(Type :GtType, ParsedTree :SyntaxTree, Value :Object) :TypedNode { 
			return new ConstNode(Type, ParsedTree.KeyToken, Value); 
		}
	
		CreateNullNode(Type :GtType, ParsedTree :SyntaxTree) :TypedNode { 
			return new NullNode(Type, ParsedTree.KeyToken); 
		}
	
		CreateLocalNode(Type :GtType, ParsedTree :SyntaxTree, LocalName :string) :TypedNode { 
			return new LocalNode(Type, ParsedTree.KeyToken, LocalName);
		}
	
		CreateGetterNode(Type :GtType, ParsedTree :SyntaxTree, Method :GtMethod, Expr :TypedNode) :TypedNode { 
			return new GetterNode(Type, ParsedTree.KeyToken, Method, Expr);
		}
	
		CreateIndexerNode(Type :GtType, ParsedTree :SyntaxTree, Method :GtMethod, Expr :TypedNode, Index :TypedNode) :TypedNode { 
			return new IndexerNode(Type, ParsedTree.KeyToken, Method, Expr, Index);
		}
	
		CreateApplyNode(Type :GtType, ParsedTree :SyntaxTree, Method :GtMethod) :TypedNode { 
			return new ApplyNode(Type, ParsedTree.KeyToken, Method);
		}
	
		CreateMessageNode(Type :GtType, ParsedTree :SyntaxTree, Method :GtMethod) :TypedNode { 
			return new MessageNode(Type, ParsedTree.KeyToken, Method);
		}
	
		CreateNewNode(Type :GtType, ParsedTree :SyntaxTree) :TypedNode { 
			return new NewNode(Type, ParsedTree.KeyToken); 
		}
		
		CreateUnaryNode(Type :GtType, ParsedTree :SyntaxTree, Method :GtMethod, Expr :TypedNode) :TypedNode { 
			return new UnaryNode(Type, ParsedTree.KeyToken, Method, Expr);
		}
	
		CreateSuffixNode(Type :GtType, ParsedTree :SyntaxTree, Method :GtMethod, Expr :TypedNode) :TypedNode { 
			return new SuffixNode(Type, ParsedTree.KeyToken, Method, Expr);
		}
	
		CreateBinaryNode(Type :GtType, ParsedTree :SyntaxTree, Method :GtMethod, Left :TypedNode, Right :TypedNode) :TypedNode { 
			return new BinaryNode(Type, ParsedTree.KeyToken, Method, Left, Right);
		}
	
		CreateAndNode(Type :GtType, ParsedTree :SyntaxTree, Left :TypedNode, Right :TypedNode) :TypedNode { 
			return new AndNode(Type, ParsedTree.KeyToken, Left, Right);
		}
	
		CreateOrNode(Type :GtType, ParsedTree :SyntaxTree, Left :TypedNode, Right :TypedNode) :TypedNode { 
			return new OrNode(Type, ParsedTree.KeyToken, Left, Right);
		}
	
		CreateAssignNode(Type :GtType, ParsedTree :SyntaxTree, Left :TypedNode, Right :TypedNode) :TypedNode { 
			return new AssignNode(Type, ParsedTree.KeyToken, Left, Right);
		}
	
		CreateLetNode(Type :GtType, ParsedTree :SyntaxTree, DeclType :GtType, VarNode :TypedNode, Block :TypedNode) :TypedNode { 
			return new LetNode(Type, ParsedTree.KeyToken, DeclType, VarNode, Block);
		}
		
		CreateIfNode(Type :GtType, ParsedTree :SyntaxTree, Cond :TypedNode, Then :TypedNode, Else :TypedNode) :TypedNode { 
			return new IfNode(Type, ParsedTree.KeyToken, Cond, Then, Else);
		}
		
		CreateSwitchNode(Type :GtType, ParsedTree :SyntaxTree, Match :TypedNode) :TypedNode { 
			return null; 
		}
	
		CreateWhileNode(Type :GtType, ParsedTree :SyntaxTree, Cond :TypedNode, Block :TypedNode) :TypedNode { 
			return new WhileNode(Type, ParsedTree.KeyToken, Cond, Block);
		}
	
		CreateDoWhileNode(Type :GtType, ParsedTree :SyntaxTree, Cond :TypedNode, Block :TypedNode) :TypedNode { 
			return new DoWhileNode(Type, ParsedTree.KeyToken, Cond, Block);
		}
	
		CreateForNode(Type :GtType, ParsedTree :SyntaxTree, Cond :TypedNode, IterNode :TypedNode, Block :TypedNode) :TypedNode { 
			return new ForNode(Type, ParsedTree.KeyToken, Cond, Block, IterNode);
		}
	
		CreateForEachNode(Type :GtType, ParsedTree :SyntaxTree, VarNode :TypedNode, IterNode :TypedNode, Block :TypedNode) :TypedNode { 
			return new ForEachNode(Type, ParsedTree.KeyToken, VarNode, IterNode, Block);
		}
	
		CreateLoopNode(Type :GtType, ParsedTree :SyntaxTree, Cond :TypedNode, Block :TypedNode, IterNode :TypedNode) :TypedNode { 
			return new LoopNode(Type, ParsedTree.KeyToken, Cond, Block, IterNode);
		}
	
		CreateReturnNode(Type :GtType, ParsedTree :SyntaxTree, Node :TypedNode) :TypedNode { 
			return new ReturnNode(Type, ParsedTree.KeyToken, Node);
		}
	
		CreateLabelNode(Type :GtType, ParsedTree :SyntaxTree, Node :TypedNode) :TypedNode { 
			return null; 
		}
	
		CreateJumpNode(Type :GtType, ParsedTree :SyntaxTree, Node :TypedNode, Label :string) :TypedNode { 
			return new JumpNode(Type, ParsedTree.KeyToken, Label); 
		}
	
		CreateBreakNode(Type :GtType, ParsedTree :SyntaxTree, Node :TypedNode, Label :string) :TypedNode { 
			return new BreakNode(Type, ParsedTree.KeyToken, Label); 
		}
	
		CreateContinueNode(Type :GtType, ParsedTree :SyntaxTree, Node :TypedNode, Label :string) :TypedNode { 
			return new ContinueNode(Type, ParsedTree.KeyToken, Label); 
		}
		
		CreateTryNode(Type :GtType, ParsedTree :SyntaxTree, TryNode :TypedNode, FinallyNode :TypedNode) :TypedNode { 
			return new TryNode(Type, ParsedTree.KeyToken, TryNode, FinallyNode); 
		}
	
		CreateThrowNode(Type :GtType, ParsedTree :SyntaxTree, Node :TypedNode) :TypedNode { 
			return new ThrowNode(Type, ParsedTree.KeyToken, Node); 
		}
	
		CreateFunctionNode(Type :GtType, ParsedTree :SyntaxTree, Block :TypedNode) :TypedNode { 
			return null; 
		}
	
		CreateDefineNode(Type :GtType, ParsedTree :SyntaxTree, Module :Object) :TypedNode { 
			return null; 
		}
	
		CreateErrorNode(Type :GtType, ParsedTree :SyntaxTree) :TypedNode { 
			return new ErrorNode(Type, ParsedTree.KeyToken);
		}
	
		
		
		
		VisitSuffixNode(suffixNode :SuffixNode) :void {
			
		}
	
		VisitUnaryNode(unaryNode :UnaryNode) :void {
			
		}
	
		VisitIndexerNode(indexerNode :IndexerNode) :void {
			
		}
	
		VisitMessageNode(messageNode :MessageNode) :void {
			
		}
	
		VisitWhileNode(whileNode :WhileNode) :void {
			
		}
	
		VisitDoWhileNode(doWhileNode :DoWhileNode) :void {
			
		}
	
		VisitForNode(forNode :ForNode) :void {
			
		}
	
		VisitForEachNode(forEachNode :ForEachNode) :void {
			
		}
	
		VisitDefineNode(Node :DefineNode) :void { 
			
		}
	
		VisitConstNode(Node :ConstNode) :void { 
			
		}
	
		VisitNewNode(Node :NewNode) :void { 
			
		}
	
		VisitNullNode(Node :NullNode) :void { 
			
		}
	
		VisitLocalNode(Node :LocalNode) :void { 
			
		}
	
		VisitGetterNode(Node :GetterNode) :void { 
			
		}
	
		VisitApplyNode(Node :ApplyNode) :void { 
			
		}
	
		VisitBinaryNode(Node :BinaryNode) :void { 
			
		}
	
		VisitAndNode(Node :AndNode) :void { 
			
		}
	
		VisitOrNode(Node :OrNode) :void { 
			
		}
	
		VisitAssignNode(Node :AssignNode) :void { 
			
		}
	
		VisitLetNode(Node :LetNode) :void { 
			
		}
	
		VisitIfNode(Node :IfNode) :void { 
			
		}
	
		VisitSwitchNode(Node :SwitchNode) :void { 
			
		}
	
		VisitLoopNode(Node :LoopNode) :void { 
			
		}
	
		VisitReturnNode(Node :ReturnNode) :void { 
			
		}
	
		VisitLabelNode(Node :LabelNode) :void { 
			
		}
	
		VisitJumpNode(Node :JumpNode) :void { 
			
		}
	
		VisitBreakNode(Node :BreakNode) :void { 
			
		}
		
		VisitContinueNode(Node :ContinueNode) :void { 
			
		}
	
		VisitTryNode(Node :TryNode) :void { 
			
		}
	
		VisitThrowNode(Node :ThrowNode) :void { 
			
		}
	
		VisitFunctionNode(Node :FunctionNode) :void { 
			
		}
	
		VisitErrorNode(Node :ErrorNode) :void { 
			
		}
	
		
		VisitBlock(Node :TypedNode) :void {
			var CurrentNode :TypedNode = Node;
			while(CurrentNode != null) {
				CurrentNode.Evaluate(this);
				CurrentNode = CurrentNode.NextNode;
			}
		}	
	
		// must :This be extended in each language	
		Eval(Node :TypedNode) :Object {
			VisitBlock(Node);
			return null;
		}
	
		AddClass(Type :GtType) :void {
			
		}
	
	}
	
}
