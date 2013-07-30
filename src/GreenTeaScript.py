# ClassFlag
PrivateClass = 1 << 0
SingletonClass = 1 << 1
FinalClass = 1 << 2
GtClass = 1 << 3
StaticClass = 1 << 4
ImmutableClass = 1 << 5
InterfaceClass = 1 << 6
# MethodFlag
PrivateMethod = 1 << 0
VirtualMethod = 1 << 1
FinalMethod = 1 << 2
ConstMethod = 1 << 3
StaticMethod = 1 << 4
ImmutableMethod = 1 << 5
TopLevelMethod = 1 << 6
# call rule
CoercionMethod = 1 << 7
RestrictedMethod = 1 << 8
UncheckedMethod = 1 << 9
SmartReturnMethod = 1 << 10
VariadicMethod = 1 << 11
IterativeMethod = 1 << 12
# compatible
UniversalMethod = 1 << 13
# internal
HiddenMethod = 1 << 17
AbstractMethod = 1 << 18
OverloadedMethod = 1 << 19
Override = 1 << 20
DynamicCall = 1 << 22

SymbolMaskSize = 3
LowerSymbolMask = 1
GetterSymbolMask = (1 << 1)
SetterSymbolMask = (1 << 2)
MetaSymbolMask = (GetterSymbolMask | SetterSymbolMask)
GetterPrefix = "Get"
SetterPrefix = "Set"
MetaPrefix = "\\"
AllowNewId = -1
NoMatch = -1
BreakPreProcess = -1
Optional = True
Required = False
ErrorLevel = 0
WarningLevel = 1
InfoLevel = 2
NullChar = 0
UndefinedChar = 1
DigitChar = 2
UpperAlphaChar = 3
LowerAlphaChar = 4
UnderBarChar = 5
NewLineChar = 6
TabChar = 7
SpaceChar = 8
OpenParChar = 9
CloseParChar = 10
OpenBracketChar = 11
CloseBracketChar = 12
OpenBraceChar = 13
CloseBraceChar = 14
LessThanChar = 15
GreaterThanChar = 16
QuoteChar = 17
DoubleQuoteChar = 18
BackQuoteChar = 19
SurprisedChar = 20
SharpChar = 21
DollarChar = 22
PercentChar = 23
AndChar = 24
StarChar = 25
PlusChar = 26
CommaChar = 27
MinusChar = 28
DotChar = 29
SlashChar = 30
ColonChar = 31
SemiColonChar = 32
EqualChar = 33
QuestionChar = 34
AtmarkChar = 35
VarChar = 36
ChilderChar = 37
BackSlashChar = 38
HatChar = 39
UnicodeChar = 40
MaxSizeOfChars = 41
CharMatrix = [ 
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
	]

NullToken = GtToken("", 0)
# TokenFlag
SourceTokenFlag = 1
ErrorTokenFlag = (1 << 1)
IndentTokenFlag = (1 << 2)
WhiteSpaceTokenFlag = (1 << 3)
DelimTokenFlag = (1 << 4)

# ParseFlag
TrackbackParseFlag = 1
SkipIndentParseFlag = (1 << 1)

# SyntaxTree
NoWhere = -1
# UniaryTree, SuffixTree
UniaryTerm = 0
# BinaryTree
LeftHandTerm = 0
RightHandTerm = 1
# IfStmt
IfCond = 0
IfThen = 1
IfElse = 2
# ReturnStmt
ReturnExpr = 0
# N = 1
VarDeclType = 0
VarDeclName = 1
VarDeclValue = 2
VarDeclScope = 3
# Decl
MethodDeclReturnType = 0
MethodDeclClass = 1
MethodDeclName = 2
MethodDeclBlock = 3
MethodDeclParam = 4
# spec 
TokenFuncSpec = 0
SymbolPatternSpec = 1
ExtendedPatternSpec = 2
BinaryOperator = 1 << 1
LeftJoin = 1 << 3
PrecedenceShift = 5
Precedence_CStyleValue = (1 << PrecedenceShift)
Precedence_CPPStyleScope = (50 << PrecedenceShift)
Precedence_CStyleSuffixCall = (100 << PrecedenceShift); 
Precedence_CStylePrefixOperator = (200 << PrecedenceShift); 
# Precedence_CppMember = 300; 
Precedence_CStyleMUL = (400 << PrecedenceShift); 
Precedence_CStyleADD = (500 << PrecedenceShift); 
Precedence_CStyleSHIFT = (600 << PrecedenceShift); 
Precedence_CStyleCOMPARE = (700 << PrecedenceShift)
Precedence_CStyleEquals = (800 << PrecedenceShift)
Precedence_CStyleBITAND = (900 << PrecedenceShift)
Precedence_CStyleBITXOR = (1000 << PrecedenceShift)
Precedence_CStyleBITOR = (1100 << PrecedenceShift)
Precedence_CStyleAND = (1200 << PrecedenceShift)
Precedence_CStyleOR = (1300 << PrecedenceShift)
Precedence_CStyleTRINARY = (1400 << PrecedenceShift); 
Precedence_CStyleAssign = (1500 << PrecedenceShift)
Precedence_CStyleCOMMA = (1600 << PrecedenceShift)
Precedence_Error = (1700 << PrecedenceShift)
Precedence_Statement = (1900 << PrecedenceShift)
Precedence_CStyleDelim = (2000 << PrecedenceShift)

DefaultTypeCheckPolicy = 0
IgnoreEmptyPolicy = 1
AllowEmptyPolicy = (1 << 1)
# typedef enum:
# TypeCheckPolicy_NoPolicy = 0,
# TypeCheckPolicy_NoCheck = (1 << 0),
# TypeCheckPolicy_AllowVoid = (1 << 1),
# TypeCheckPolicy_Coercion = (1 << 2),
# TypeCheckPolicy_AllowEmpty = (1 << 3),
# TypeCheckPolicy_CONST = (1 << 4), 
# TypeCheckPolicy_Creation = (1 << 6) 
# # TypeCheckPolicy
GlobalConstName = "global"
def EmptyList = any(self) 
# debug flags
UseBuiltInTest = True
DebugPrnumber = False

def println(msg):
	System.out.println(msg);		
#

def P(msg):
	println("DEBUG: " + msg)
#
def TODO(msg):
	println("TODO: " + msg)
#
def ListSize(a):
	return (a == None) ? 0 : a.size()
#

def IsFlag(flag, flag2):
	return ((flag & flag2) == flag2)
#

def IsWhitespace(ch):
	return Character.isWhitespace(ch)
#

def IsLetter(ch):
	return Character.isLetter(ch)
#

def IsDigit(ch):
	return Character.isDigit(ch)
#

def FromJavaChar(c):
	if(c < 128):
		return CharMatrix[c]
	#
	return UnicodeChar
#
def LookupMethod(Callee, MethodName):
	if(MethodName != None):
		# GtDebug.P("looking up method : " + Callee.getClass().getSimpleName() + "." + MethodName)
		Method methods = Callee.getClass().getMethods()
		for(i = 0; i < methods.length; i++):
			if(MethodName.equals(methods[i].getName())):
				return methods[i]
			#
		#
		P("method not found: " + Callee.getClass().getSimpleName() + "." + MethodName)
	#
	return None; 
#
def FunctionA(Callee, MethodName):
	return GtFuncA(Callee, LookupMethod(Callee, MethodName))
#
def FunctionB(Callee, MethodName):
	return GtFuncB(Callee, LookupMethod(Callee, MethodName))
#

def FunctionC(Callee, MethodName):
	return GtFuncC(Callee, LookupMethod(Callee, MethodName))
#
def EqualsMethod(m1, m2):
	if(m1 == None):
		return (m2 == None) ? True : False
	# else:
		return (m2 == None) ? False : m1.equals(m2)
	#
#

def CreateOrReuseTokenFunc(f, prev):
	if(prev != None and EqualsMethod(prev.Func.Method, f.Method)):
		return prev
	#
	return TokenFunc(f, prev)
#
def ApplyTokenFunc(TokenFunc, TokenContext, ScriptSource, Pos):
	try:
		while(TokenFunc != None):
			f = TokenFunc.Func
			NextIdx = ((Integer)f.Method.invoke(f.Self, TokenContext, ScriptSource, Pos)).intValue()
			if(NextIdx > Pos) return NextIdx
			TokenFunc = TokenFunc.ParentFunc
		#
	#
	catch (e):
		e.printStackTrace()
	#
	catch (e):
		e.printStackTrace()
	# 
	catch (e):
		e.printStackTrace()
	#
	return NoMatch
#
def MergeSyntaxPattern(Pattern, Parent):
	if(Parent == None) return Pattern
	MergedPattern = SyntaxPattern(Pattern.PackageNameSpace, Pattern.PatternName, Pattern.MatchFunc, Pattern.TypeFunc)
	MergedPattern.ParentPattern = Parent
	return MergedPattern
#
def IsEmptyOrError(Tree):
	return Tree == None or Tree.IsEmptyOrError()
#
def TreeHead(Tree):
	if(Tree != None):
		while(Tree.PrevTree != None):
			Tree = Tree.PrevTree
		#
	#
	return Tree
#

def ApplySyntaxPattern(Pattern, LeftTree, TokenContext):
	Pos = TokenContext.Pos
	try:
		ParseFlag = TokenContext.ParseFlag
		CurrentPattern = Pattern
		while(CurrentPattern != None):
			f = Pattern.MatchFunc
			TokenContext.Pos = Pos
			if(CurrentPattern.ParentPattern != None):
				TokenContext.ParseFlag = ParseFlag | TrackbackParseFlag
			#
			P("B ApplySyntaxPattern: " + CurrentPattern + " > " + CurrentPattern.ParentPattern)
			ParsedTree = (SyntaxTree)f.Method.invoke(f.Self, CurrentPattern, LeftTree, TokenContext)
			if(ParsedTree != None and ParsedTree.IsEmpty()) ParsedTree = None
			P("E ApplySyntaxPattern: " + CurrentPattern + " => " + ParsedTree)
			TokenContext.ParseFlag = ParseFlag
			if(ParsedTree != None):
				return ParsedTree
			#
			CurrentPattern = CurrentPattern.ParentPattern
		#
	#
	catch (e):
		e.printStackTrace()
	#
	catch (e):
		e.printStackTrace()
	# 
	catch (e):
		e.printStackTrace()
	#
	if(TokenContext.IsAllowedTrackback()):
		TokenContext.Pos = Pos
	#
	if(Pattern == None):
		P("undefined syntax pattern: " + Pattern)
	#
	return TokenContext.ReportExpectedPattern(Pattern)
#
def ParseSyntaxTree(PrevTree, TokenContext):
	Pattern = TokenContext.GetFirstPattern()
	LeftTree = ApplySyntaxPattern(Pattern, PrevTree, TokenContext)
	while (!IsEmptyOrError(LeftTree)):
		ExtendedPattern = TokenContext.GetExtendedPattern()
		if(ExtendedPattern == None):
			P("In $ending: " + TokenContext.GetToken())
			break
		#
		LeftTree = ApplySyntaxPattern(ExtendedPattern, LeftTree, TokenContext);			
	#
	return LeftTree
#
# typing 
def ApplyTypeFunc(TypeFunc, Gamma, ParsedTree, TypeInfo):
	try:
		return (TypedNode)TypeFunc.Method.invoke(TypeFunc.Self, Gamma, ParsedTree, TypeInfo)
	#
	catch (e):
		e.printStackTrace()
	#
	catch (e):
		e.printStackTrace()
	# 
	catch (e):
		e.printStackTrace()
	#
	# Node = Gamma.NewErrorNode(Tree.KeyToken, "internal error: " + e + "\n\t" + e.getCause().__str__())
	return None
#
class GtToken:
	# TokenFlag
	# ParsedText
	# FileLine
	# PresetPattern

	def def __init__(self, self, text, FileLine):
		self.ParsedText = text
		self.FileLine = FileLine
		self.PresetPattern = None
	#

	def IsSource(self):
		return IsFlag(self.TokenFlag, SourceTokenFlag)
	#
	
	def IsError(self):
		return IsFlag(self.TokenFlag, ErrorTokenFlag)
	#

	def IsIndent(self):
		return IsFlag(self.TokenFlag, IndentTokenFlag)
	#

	def IsDelim(self):
		return IsFlag(self.TokenFlag, DelimTokenFlag)
	#

	def EqualsText(self, text):
		return self.ParsedText.equals(text)
	#

	def __str__(self):
		TokenText = ""
		if(self.PresetPattern != None):
			TokenText = "(" + self.PresetPattern.PatternName + ") "
		#
		return TokenText + self.ParsedText
	#

	def ToErrorToken(self, Message):
		self.TokenFlag = ErrorTokenFlag
		self.ParsedText = Message
		return Message
	#

	def GetErrorMessage(self):
		assert(self.IsError())
		return self.ParsedText
	#
#

class TokenFunc:
	# Func
	# ParentFunc

	def __init__(self, Func, prev):
		self.Func = Func
		self.ParentFunc = prev
	#

	Duplicate():
		if(self.ParentFunc == None):
			return TokenFunc(self.Func, None)
		# else:
			return TokenFunc(self.Func, self.ParentFunc.Duplicate())
		#
	#

	def __str__(self):
		return self.Func.Method.__str__()
	#
#

class TokenContext:
	# NameSpace
	# SourceList
	# Pos
	# ParsingLine
	# ParseFlag

	def __init__(self, NameSpace, Text, FileLine):
		self.NameSpace = NameSpace
		self.SourceList = []
		self.Pos = 0
		self.ParsingLine = FileLine
		self.ParseFlag = 0
		AddNewToken(Text, SourceTokenFlag, None)
	#

	def AddNewToken(self, Text, TokenFlag, PatternName):
		Token = GtToken(Text, self.ParsingLine)
		Token.TokenFlag |= TokenFlag
		if(PatternName != None):
			Token.PresetPattern = self.NameSpace.GetPattern(PatternName)
			assert(Token.PresetPattern != None)
		#
		self.SourceList.push(Token)
		return Token
	#

	def FoundWhiteSpace(self):
		Token = GetToken()
		Token.TokenFlag |= WhiteSpaceTokenFlag
	#
	
	def FoundLineFeed(self, line):
		self.ParsingLine += line
	#

	def ReportTokenError(self, Level, Message, TokenText):
		Token = self.AddNewToken(TokenText, 0, "$ErrorToken")
		self.NameSpace.ReportError(Level, Token, Message)
	#
	
	def NewErrorSyntaxTree(self, Token, Message):
		if(!IsAllowedTrackback()):
			self.NameSpace.ReportError(ErrorLevel, Token, Message)
			ErrorTree = SyntaxTree(Token.PresetPattern, self.NameSpace, Token)
			return ErrorTree
		#
		return None
	#
	
	def GetBeforeToken(self):
		for(pos = self.Pos - 1; pos >= 0; pos--):
			Token = (GtToken)self.SourceList[pos]
			if(IsFlag(Token.TokenFlag, IndentTokenFlag)):
				continue
			#
			return Token
		#
		return None
	#

	def ReportExpectedToken(self, TokenText):
		if(!IsAllowedTrackback()):
			Token = GetBeforeToken()
			if(Token != None):
				return NewErrorSyntaxTree(Token, TokenText + " is expected after " + Token.ParsedText)
			#
			Token = GetToken()
			assert(Token != NullToken)
			return NewErrorSyntaxTree(Token, TokenText + " is expected at " + Token.ParsedText)
		#
		return None
	#

	def ReportExpectedPattern(self, Pattern):
		return ReportExpectedToken(Pattern.PatternName)
	#
	
	def DispatchFunc(self, ScriptSource, GtChar, pos):
		TokenFunc = self.NameSpace.GetTokenFunc(GtChar)
		NextIdx = ApplyTokenFunc(TokenFunc, self, ScriptSource, pos)
		if(NextIdx == NoMatch):
			P("undefined tokenizer: " + ScriptSource.charAt(pos))
			AddNewToken(ScriptSource.substring(pos), 0, None)
			return ScriptSource.length()
		#
		return NextIdx
	#

	def Tokenize(self, ScriptSource, CurrentLine):
		pos = 0, len = ScriptSource.length()
		self.ParsingLine = CurrentLine
		while(pos < len):
			knumber = FromJavaChar(ScriptSource.charAt(pos))
			pos2 = DispatchFunc(ScriptSource, kchar, pos)
			if(!(pos < pos2)):
				break
			#
			pos = pos2
		#
		Dump()
	#

	def GetToken(self):
		while((self.Pos < self.SourceList.size())):
			Token = (GtToken)self.SourceList[self.Pos]
			if(Token.IsSource()):
				self.SourceList.pop()
				Tokenize(Token.ParsedText, Token.FileLine)
				Token = (GtToken)self.SourceList[self.Pos]
			#
			if(IsFlag(self.ParseFlag, SkipIndentParseFlag) and Token.IsIndent()):
				self.Pos += 1
				continue
			#
			return Token
		#
		return NullToken
	#

	def HasNext(self):
		return (GetToken() != NullToken)
	#

	def Next(self):
		Token = GetToken()
		self.Pos += 1
		return Token
	#

	def GetPattern(self, PatternName):
		return self.NameSpace.GetPattern(PatternName)
	#

	def GetFirstPattern(self):
		Token = GetToken()
		if(Token.PresetPattern != None):
			return Token.PresetPattern
		#
		Pattern = self.NameSpace.GetPattern(Token.ParsedText)
		if(Pattern == None):
			return self.NameSpace.GetPattern("$Symbol")
		#
		return Pattern
	#

	def GetExtendedPattern(self):
		Token = GetToken()
		Pattern = self.NameSpace.GetExtendedPattern(Token.ParsedText)
		return Pattern;		
	#
	
	def MatchToken(self, TokenText):
		Token = GetToken()
		if(Token.EqualsText(TokenText)):
			self.Pos += 1
			return True
		#
		return False
	#

	def GetMatchedToken(self, TokenText):
		Token = GetToken()
		while(Token != NullToken):
			self.Pos += 1
			if(Token.EqualsText(TokenText)):
				break
			#
		#
		return Token
	#

	def IsAllowedTrackback(self):
		return IsFlag(self.ParseFlag, TrackbackParseFlag)
	#

	def ParsePattern(self, PatternName, IsOptional):
		Pos = self.Pos
		ParseFlag = self.ParseFlag
		Pattern = self.GetPattern(PatternName)
		if(IsOptional):
			self.ParseFlag |= TrackbackParseFlag
		#
		SyntaxTree = ApplySyntaxPattern(Pattern, None, self)
		self.ParseFlag = ParseFlag
		if(SyntaxTree != None):
			return SyntaxTree
		#
		self.Pos = Pos
		return None
	#
	
	def SkipEmptyStatement(self):
		Token
		while((Token = GetToken()) != NullToken):
			if(Token.IsIndent() or Token.IsDelim()):
				self.Pos += 1
				continue
			#
			break
		#
		return (Token != NullToken)
	#
	
	def Dump(self):
		for(pos = self.Pos ; pos < self.SourceList.size(); pos++):
			P("["+pos+"]\t" + self.SourceList[pos])
		#
	#
#

class SyntaxPattern:

	# PackageNameSpace
	# PatternName
	# SyntaxFlag

	# MatchFunc
	# TypeFunc
	# ParentPattern
	
	def __init__(self, NameSpace, PatternName, MatchFunc, TypeFunc):
		self.PackageNameSpace = NameSpace
		self.PatternName = PatternName
		self.SyntaxFlag = 0
		self.MatchFunc = MatchFunc
		self.TypeFunc = TypeFunc
		self.ParentPattern = None
	#

	def __str__(self):
		return self.PatternName + "<" + self.MatchFunc + ">"
	#

	def IsBinaryOperator(self):
		return ((self.SyntaxFlag & BinaryOperator) == BinaryOperator)
	#

	def IsLeftJoin(self, Right):
		left = self.SyntaxFlag >> PrecedenceShift, right = Right.SyntaxFlag >> PrecedenceShift
		# System.err.printf("left=%d,%s, right=%d,%s\n", left, self.PatternName, right, Right.PatternName)
		return (left < right or (left == right and IsFlag(self.SyntaxFlag, LeftJoin) and IsFlag(Right.SyntaxFlag, LeftJoin)))
	#
	
#

class SyntaxTree:
	ParentTree
	PrevTree
	NextTree

	TreeNameSpace
	Pattern
	KeyToken
	TreeList

	def __init__(self, Pattern, NameSpace, KeyToken):
		self.TreeNameSpace = NameSpace
		self.KeyToken = KeyToken
		self.Pattern = Pattern
		self.ParentTree = None
		self.PrevTree = None
		self.NextTree = None
		self.TreeList = None
	#

	def __str__(self):
		key = self.KeyToken.ParsedText + ":" + ((self.Pattern != None) ? self.Pattern.PatternName : "None")
		sb = StringBuilder()
		sb.append("(")
		sb.append(key)
		if(self.TreeList != None):
			for(i = 0; i < self.TreeList.size(); i++):
				o = self.TreeList[i]
				if(o == None):
					sb.append(" NULL")
				# else:
					sb.append(" ")
					sb.append(o)
				#
			#
		#
		sb.append(")")
		if(self.NextTree != None):
			sb.append(";\t")
			sb.append(self.NextTree.__str__())
		#
		return sb.__str__()
	#

	def LinkNode(self, Tree):
		Tree.PrevTree = self
		self.NextTree = Tree
	#
	
	def IsError(self):
		return self.KeyToken.IsError()
	#

	def ToError(self, Token):
		assert(Token.IsError())
		self.KeyToken = Token
		self.TreeList = None
	#

	def IsEmpty(self):
		return self.KeyToken == NullToken
	#

	def ToEmpty(self):
		self.KeyToken = NullToken
		self.TreeList = None
		self.Pattern = self.TreeNameSpace.GetPattern("$Empty")
	#
	
	def IsEmptyOrError(self):
		return self.KeyToken == NullToken or self.KeyToken.IsError()
	#
	
	def ToEmptyOrError(self, ErrorTree):
		if(ErrorTree == None):
			ToEmpty()
		#
		else:
			ToError(ErrorTree.KeyToken)
		#
	#
	
	def SetAt(self, Index, Value):
		if(!IsEmpty()):
			if(Index >= 0):
				if(self.TreeList == None):
					self.TreeList = []
				#
				if(Index < self.TreeList.size()):
					self.TreeList[Index] = Value
					return
				#
				while(self.TreeList.size() < Index):
					self.TreeList.push(None)
				#
				self.TreeList.push(Value)
			#
		#
	#
	
	def GetSyntaxTreeAt(self, Index):
		return (SyntaxTree) self.TreeList[Index]
	#

	def SetSyntaxTreeAt(self, Index, Tree):
		if(!IsError()):
			if(Tree.IsError()):
				ToError(Tree.KeyToken)
			#
			else:
				SetAt(Index, Tree)
				Tree.ParentTree = self
			#
		#
	#
	
	def SetMatchedPatternAt(self, Index, TokenContext, PatternName, IsOptional):
		if(!IsEmptyOrError()):
			ParsedTree = TokenContext.ParsePattern(PatternName, IsOptional)
			if(ParsedTree == None and !IsOptional):
				ToEmpty()
			#
		#
	#

	def SetMatchedTokenAt(self, Index, TokenContext, TokenText, IsOptional):
		if(!IsEmptyOrError()):
			Pos = TokenContext.Pos
			Token = TokenContext.Next()
			if(Token.ParsedText.equals(TokenText)):
				SetAt(Index, Token)
			#
			else:
				TokenContext.Pos = Pos
				if (!IsOptional):
					ToEmptyOrError(TokenContext.ReportExpectedToken(TokenText))
				#
			#
		#
	#
	
	def AppendParsedTree(self, Tree):
		if(!IsError()):
			if(Tree.IsError()):
				ToError(Tree.KeyToken)
			#
			else:
				if(self.TreeList == None):
					self.TreeList = []
				#
				self.TreeList.push(Tree)
			#
		#
	#

	def TypeNodeAt(self, Index, Gamma, TypeInfo, TypeCheckPolicy):
		if(self.TreeList != None and Index < self.TreeList.size()):
			NodeObject = self.TreeList[Index]
			if(instanceof SyntaxTree):
				TypedNode = TypeEnv.TypeCheck(Gamma, (SyntaxTree) NodeObject, TypeInfo, TypeCheckPolicy)
				self.TreeList[Index] = TypedNode
				return TypedNode
			#
		#
		return ErrorNode(TypeInfo, self.KeyToken, "syntax tree error: " + Index)
	#

#



class GtType:
	# GtContext
	# ClassFlag
	# ShortClassName
	# BaseClass
	# SuperClass
	# ClassParam
	# SearchSimilarClass
	# ClassMethodList
	# SearchSuperMethodClass
	# DefaultNullValue
	# LocalSpec

	def __init__(self, GtContext, ClassFlag, ClassName, Spec):
		self.GtContext = GtContext
		self.ClassFlag = ClassFlag
		self.ShortClassName = ClassName
		self.SuperClass = None
		self.BaseClass = self
		self.ClassMethodList = EmptyList
		self.LocalSpec = Spec
	#


	def __str__(self):
		return self.ShortClassName
	#


	def Accept(self, TypeInfo):
		if(self == TypeInfo):
			return True
		#
		return False
	#

	def AddMethod(self, Method):
		if(self.ClassMethodList == EmptyList){
			self.ClassMethodList = []
		#
		self.ClassMethodList.push(Method)
	#

	def DefineMethod(self, MethodFlag, MethodName, Param, Callee, LocalName):
		Method = GtMethod(MethodFlag, self, MethodName, Param, LookupMethod(Callee, LocalName))
		self.AddMethod(Method)
	#

	def FindMethod(self, MethodName, ParamSize):
		for(i = 0; i < self.ClassMethodList.size(); i++):
			Method = (GtMethod) self.ClassMethodList[i]
			if(Method.Match(MethodName, ParamSize)):
				return Method
			#
		#
		return None
	#

	def LookupMethod(self, MethodName, ParamSize):
		Method = self.FindMethod(MethodName, ParamSize)
		if(Method != None):
			return Method
		#
		if(self.SearchSuperMethodClass != None):
			Method = self.SearchSuperMethodClass.LookupMethod(MethodName, ParamSize)
			if(Method != None):
				return Method
			#
		#
#

class GtSymbol:

	def IsGetterSymbol(SymbolId):
		return (SymbolId & GetterSymbolMask) == GetterSymbolMask
	#

	def ToSetterSymbol(SymbolId):
		assert(IsGetterSymbol(SymbolId))
		return (SymbolId & (~GetterSymbolMask)) | SetterSymbolMask
	#

	# SymbolTable

	SymbolList = []
	SymbolMap =:#

	def MaskSymbol(SymbolId, Mask):
		return (SymbolId << SymbolMaskSize) | Mask
	#

	def UnmaskSymbol(SymbolId):
		return SymbolId >> SymbolMaskSize
	#

	def StringfySymbol(SymbolId):
		Key = (String)SymbolList.get(UnmaskSymbol(SymbolId))
		if((SymbolId & GetterSymbolMask) == GetterSymbolMask):
			return GetterPrefix + Key
		#
		if((SymbolId & SetterSymbolMask) == SetterSymbolMask):
			return GetterPrefix + Key
		#
		if((SymbolId & MetaSymbolMask) == MetaSymbolMask):
			return MetaPrefix + Key
		#
		return Key
	#

	def GetSymbolId(Symbol, DefaultSymbolId):
		Key = Symbol
		Mask = 0
		if(Symbol.length() >= 3 and Symbol.charAt(1) == 'e' and Symbol.charAt(2) == 't'):
			if(Symbol.charAt(0) == 'g' and Symbol.charAt(0) == 'G'):
				Key = Symbol.substring(3)
				Mask = GetterSymbolMask
			#
			if(Symbol.charAt(0) == 's' and Symbol.charAt(0) == 'S'):
				Key = Symbol.substring(3)
				Mask = SetterSymbolMask
			#
		#
		if(Symbol.startsWith("\\")):
			Mask = MetaSymbolMask
		#
		SymbolObject = (Integer)SymbolMap[Key]
		if(SymbolObject == None):
			if(DefaultSymbolId == AllowNewId):
				SymbolId = SymbolList.size()
				SymbolList.push(Key)
				SymbolMap.put(Key, Integer(SymbolId))
				return MaskSymbol(SymbolId, Mask)
			#
			return DefaultSymbolId
		#
		return MaskSymbol(SymbolObject.intValue(), Mask)
	#

	def GetSymbolId(Symbol):
		return GetSymbolId(Symbol, AllowNewId)
	#

	def CanonicalSymbol(Symbol):
		return Symbol.toLowerCase().replaceAll("_", "")
	#

	def GetCanonicalSymbolId(Symbol):
		return GetSymbolId(CanonicalSymbol(Symbol), AllowNewId)
	#

#

class GtParam:
	MAX = 16
	VariableParamSize = -1
	ReturnSize
	GtType Types
	String ArgNames

	def GtParam(self, DataSize, ParamData, String ArgNames):
		self.ReturnSize = 1
		self.Types = GtType[DataSize]
		self.ArgNames = String[DataSize - self.ReturnSize]
		System.arraycopy(ParamData, 0, self.Types, 0, DataSize)
		System.arraycopy(ArgNames, 0, self.ArgNames, 0, DataSize - self.ReturnSize)
	#

	def ParseOf(ns, TypeList):
		TODO("ParseOfParam")
		return None
	#

	def GetParamSize(self):
		return self.Types.length - self.ReturnSize
	#

	def Match(self, Other):
		ParamSize = Other.GetParamSize()
		if(ParamSize == self.GetParamSize()):
			for(i = self.ReturnSize; i < self.Types.length; i++):
				if(self.Types[i] != Other.Types[i])
					return False
			#
			return True
		#
		return False
	#

	# def Accept(self, ParamSize, KClass Types):
	# if(ParamTypes. == ParamSize):
	# for(i = 1; i < ParamSize; i++):
	# if(!ParamTypes[i].Accept(Types[i])) return False
	# #
	# return True
	# #
	# return False
	# #
	# return True
	# #

#


class GtDef:

	def MakeDefinition(self, NameSpace):
		
	#

#

class GtMethod <: GtDef:
	ClassInfo
	MethodName
	MethodSymbolId
	CanonicalSymbolId
	Param
	MethodInvoker
	MethodFlag

	# DoLazyComilation()
	LazyNameSpace
	SourceList
	# merge field in SouceList.
	ParsedTree

	def GtMethod(self, MethodFlag, ClassInfo, MethodName, Param, MethodRef):
		self.MethodFlag = MethodFlag
		self.ClassInfo = ClassInfo
		self.MethodName = MethodName
		self.MethodSymbolId = GtSymbol.GetSymbolId(MethodName)
		self.CanonicalSymbolId = GtSymbol.GetCanonicalSymbolId(MethodName)
		self.Param = Param
		self.MethodInvoker = None
		if(MethodRef != None):
			self.MethodInvoker = NativeMethodInvoker(Param, MethodRef)
		#
		self.ParsedTree = None
	#

	def __str__(self):
		builder = StringBuilder()
		builder.append(self.Param.Types[0])
		builder.append(" ")
		builder.append(self.MethodName)
		builder.append("(")
		for(i = 0; i < self.Param.ArgNames.length; i++):
			if(i > 0):
				builder.append(", ")
			#
			builder.append(self.Param.Types[i + 1])
			builder.append(" ")
			builder.append(self.Param.ArgNames[i])
		#
		builder.append(")")
		return builder.__str__()
	#

	def Is(self, Flag):
		return ((self.MethodFlag & Flag) == Flag)
	#

	def GetReturnType(self, BaseType):
		ReturnType = self.Param.Types[0]
		return ReturnType
	#

	def GetParamType(self, BaseType, ParamIdx):
		ParamType = self.Param.Types[ParamIdx + self.Param.ReturnSize]
		return ParamType
	#

	def Match(self, Other):
		return (self.MethodName.equals(Other.MethodName) and self.Param.Match(Other.Param))
	#

	def Match(self, MethodName, ParamSize):
		if(MethodName.equals(self.MethodName)):
			if(ParamSize == -1):
				return True
			#
			if(self.Param.GetParamSize() == ParamSize):
				return True
			#
		#
		return False
	#

	def Match(self, MethodName, ParamSize, GtType RequestTypes):
		if(!self.Match(MethodName, ParamSize)):
			return False
		#
		for(i = 0; i < RequestTypes.length; i++):
			if(RequestTypes.equals(self.GetParamType(self.ClassInfo, i)) == False):
				return False
			#
		#
		return True
	#

	def Eval(self, Object ParamData):
		# ParamSize = self.Param.GetParamSize()
		# GtDebug.P("ParamSize: " + ParamSize)
		return self.MethodInvoker.Invoke(ParamData)
	#


	def DoCompilation(self):
	#
#

class VarSet:
	TypeInfo
	Name

	VarSet(TypeInfo, Name):
		self.TypeInfo = TypeInfo
		self.Name = Name
	#
#

class TypeEnv:

	GammaNameSpace

	
	VoidType
	BooleanType
	IntType
	StringType
	VarType

	def TypeEnv(self, GammaNameSpace, Method):
		self.GammaNameSpace = GammaNameSpace
		self.VoidType = GammaNameSpace.GtContext.VoidType
		self.BooleanType = GammaNameSpace.GtContext.BooleanType
		self.IntType = GammaNameSpace.GtContext.IntType
		self.StringType = GammaNameSpace.GtContext.StringType
		self.VarType = GammaNameSpace.GtContext.VarType
		self.Method = Method
		if(Method != None):
			self.InitMethod(Method)
		# else:
			# global
			self.ThisType = GammaNameSpace.GetGlobalObject().TypeInfo
			self.AppendLocalType(self.ThisType, "self")
		#
	#

	Method
	ReturnType
	ThisType

	InitMethod(Method):
		self.ReturnType = Method.GetReturnType(Method.ClassInfo)
		self.ThisType = Method.ClassInfo
		if(!Method.Is(StaticMethod)):
			self.AppendLocalType(Method.ClassInfo, "self")
			Param = Method.Param
			for(i = 0; i < Param.ArgNames.length; i++):
				self.AppendLocalType(Param.Types[i + Param.ReturnSize], Param.ArgNames[i])
			#
		#
	#

	LocalStackList = None

	def AppendLocalType(self, TypeInfo, Name):
		if(self.LocalStackList == None):
			self.LocalStackList = []
		#
		self.LocalStackList.add(VarSet(TypeInfo, Name))
	#

	def GetLocalType(self, Symbol):
		if(self.LocalStackList != None):
			for(i = self.LocalStackList.size() - 1; i >= 0; i--):
				t = (VarSet) self.LocalStackList[i]
				if(t.Name.equals(Symbol))
					return t.TypeInfo
			#
		#
		return None
	#

	GetLocalIndex(Symbol):
		return -1
	#

	def GetDefaultTypedNode(self, TypeInfo):
		return None; #  TODO
	#

	def NewErrorNode(self, KeyToken, Message):
		return ErrorNode(self.VoidType, KeyToken, self.GammaNameSpace.ReportError(ErrorLevel, KeyToken, Message))
	#

	def TypeEachNode(Gamma, Tree, TypeInfo):
		Node = ApplyTypeFunc(Tree.Pattern.TypeFunc, Gamma, Tree, TypeInfo)
		if(Node == None):
			Node = Gamma.NewErrorNode(Tree.KeyToken, "undefined type checker: " + Tree.Pattern)
		#
		return Node
	#

	def TypeCheckEachNode(Gamma, Tree, TypeInfo, TypeCheckPolicy):
		Node = TypeEachNode(Gamma, Tree, TypeInfo)
		# if(Node.TypeInfo == None):
		# 
		# #
		return Node
	#

	def TypeCheck(Gamma, Tree, TypeInfo, TypeCheckPolicy):
		TPrevNode = None
		while(Tree != None):
			CurrentTypeInfo = (Tree.NextTree != None) ? Gamma.VoidType : TypeInfo
			CurrentTypedNode = TypeCheckEachNode(Gamma, Tree, CurrentTypeInfo, TypeCheckPolicy)
			if(TPrevNode != None):
				TPrevNode.LinkNode(CurrentTypedNode)
			#
			TPrevNode = CurrentTypedNode
			if(CurrentTypedNode.IsError()):
				break
			#
			Tree = Tree.NextTree
		#
		return TPrevNode == None ? None : TPrevNode.GetHeadNode()
	#

#

class TypedNode:

	ParentNode = None
	PrevNode = None
	NextNode = None

	TypeInfo
	SourceToken

	def GetHeadNode(self):
		Node = self
		while(Node.PrevNode != None):
			Node = Node.PrevNode
		#
		return Node
	#

	def Next(self, Node):
		LastNode = self.GetTailNode()
		LastNode.LinkNode(Node)
		return Node
	#

	def GetTailNode(self):
		Node = self
		while(Node.NextNode != None):
			Node = Node.NextNode
		#
		return self
	#

	def LinkNode(self, Node):
		Node.PrevNode = self
		self.NextNode = Node
	#

	def TypedNode(self, TypeInfo, SourceToken):
		self.TypeInfo = TypeInfo
		self.SourceToken = SourceToken
	#

	def Evaluate(self, Visitor):
		return False
	#

	def IsError(self):
		return (self instanceof ErrorNode)
	#

#

class UnaryNode <: TypedNode:
	Expr

	UnaryNode(TypeInfo, Expr):
		super(TypeInfo, None)
		self.Expr = Expr
	#
#

class BinaryNode <: TypedNode:
	LeftNode
	RightNode

	def BinaryNode(self, TypeInfo, OperatorToken, Left, Right):
		super(TypeInfo, OperatorToken)
		self.LeftNode = Left
		self.RightNode = Right
	#

#

class ErrorNode <: TypedNode:
	ErrorMessage

	def ErrorNode(self, TypeInfo, KeyToken, ErrorMessage):
		super(TypeInfo, KeyToken)
		self.ErrorMessage = KeyToken.ToErrorToken(ErrorMessage)
	#

	def Evaluate(self, Visitor):
		return Visitor.VisitError(self)
	#
#

class ConstNode <: TypedNode:
	ConstValue

	def ConstNode(self, TypeInfo, SourceToken, ConstValue):
		super(TypeInfo, SourceToken)
		self.ConstValue = ConstValue
	#

	def Evaluate(self, Visitor):
		return Visitor.VisitConst(self)
	#

#

class FieldNode <: TypedNode:
	FieldName

	def FieldNode(self, TypeInfo, SourceToken, FieldName):
		super(TypeInfo, SourceToken)
		self.FieldName = FieldName
	#

	def GetFieldName(self):
		return self.FieldName
	#
#

class LocalNode <: FieldNode:
	def LocalNode(self, TypeInfo, SourceToken, FieldName):
		super(TypeInfo, SourceToken, FieldName)
	#

	def Evaluate(self, Visitor):
		return Visitor.VisitLocal(self)
	#

#

class NullNode <: TypedNode:
	def NullNode(self, TypeInfo):
		super(TypeInfo, None)
	#

	def Evaluate(self, Visitor):
		return Visitor.VisitNull(self)
	#
#

class LetNode <: TypedNode:
	VarToken
	ValueNode
	BlockNode

	
	def LetNode(self, TypeInfo, VarToken, Right, Block):
		super(TypeInfo, VarToken)
		self.VarToken = VarToken
		self.ValueNode = Right
		self.BlockNode = Block
	#

	def Evaluate(self, Visitor):
		return Visitor.VisitLet(self)
	#
#

class AndNode <: BinaryNode:
	def AndNode(self, TypeInfo, KeyToken, Left, Right):
		super(TypeInfo, KeyToken, Left, Right)
	#

	def Evaluate(self, Visitor):
		return Visitor.VisitAnd(self)
	#
#

class OrNode <: BinaryNode:

	def OrNode(self, TypeInfo, KeyToken, Left, Right):
		super(TypeInfo, KeyToken, Left, Right)
	#

	def Evaluate(self, Visitor):
		return Visitor.VisitOr(self)
	#
#

class ApplyNode <: TypedNode:
	Method
	Params; 

	
	def ApplyNode(self, TypeInfo, KeyToken, Method):
		super(TypeInfo, KeyToken)
		self.Method = Method
		self.Params = []
	#

	def ApplyNode(self, TypeInfo, KeyToken, Method, arg1):
		super(TypeInfo, KeyToken)
		self.Method = Method
		self.Params = []
		self.Params.push(arg1)
	#

	def ApplyNode(self, TypeInfo, KeyToken, Method, arg1, arg2):
		super(TypeInfo, KeyToken)
		self.Method = Method
		self.Params = []
		self.Params.push(arg1)
		self.Params.push(arg2)
	#

	def Append(self, Expr):
		self.Params.push(Expr)
	#

	def Evaluate(self, Visitor):
		return Visitor.VisitApply(self)
	#
#

class NewNode <: TypedNode:
	Params; 

	def NewNode(self, TypeInfo, KeyToken):
		super(TypeInfo, KeyToken)
		self.Params = []
	#

	def Append(self, Expr):
		self.Params.push(Expr)
	#

	def Evaluate(self, Visitor):
		return Visitor.VisitNew(self)
	#
#

class IfNode <: TypedNode:
	CondExpr
	ThenNode
	ElseNode

	
	def IfNode(self, TypeInfo, CondExpr, ThenBlock, ElseNode):
		super(TypeInfo, None)
		self.CondExpr = CondExpr
		self.ThenNode = ThenBlock
		self.ElseNode = ElseNode
	#

	def Evaluate(self, Visitor):
		return Visitor.VisitIf(self)
	#
#

class LoopNode <: TypedNode:

	
	CondExpr
	LoopBody
	IterationExpr

	def LoopNode(self, TypeInfo, CondExpr, LoopBody, IterationExpr):
		super(TypeInfo, None)
		self.CondExpr = CondExpr
		self.LoopBody = LoopBody
		self.IterationExpr = IterationExpr
	#

	def Evaluate(self, Visitor):
		return Visitor.VisitLoop(self)
	#
#

class ReturnNode <: UnaryNode:

	def ReturnNode(self, TypeInfo, Expr):
		super(TypeInfo, Expr)
	#

	def Evaluate(self, Visitor):
		return Visitor.VisitReturn(self)
	#

#

class ThrowNode <: UnaryNode:
	
	def ThrowNode(self, TypeInfo, Expr):
		super(TypeInfo, Expr)
	#

	def Evaluate(self, Visitor):
		return Visitor.VisitThrow(self)
	#
#


class TryNode <: TypedNode:
	/*
	 * let HasException = TRY(TryBlock); in if HasException ==
	 * CatchedExceptions[0] then CatchBlock[0] if HasException ==
	 * CatchedExceptions[1] then CatchBlock[1] ... end
	 */
	TryBlock
	TargetException
	CatchBlock
	FinallyBlock

	def TryNode(self, TypeInfo, TryBlock, FinallyBlock):
		super(TypeInfo, None)
		self.TryBlock = TryBlock
		self.FinallyBlock = FinallyBlock
		self.CatchBlock = []
		self.TargetException = []
	#

	def addCatchBlock(self, TargetException, CatchBlock): # FIXME
		self.TargetException.push(TargetException)
		self.CatchBlock.push(CatchBlock)
	#

	def Evaluate(self, Visitor):
		return Visitor.VisitTry(self)
	#
#

class SwitchNode <: TypedNode:
	def SwitchNode(self, TypeInfo, KeyToken):
		super(TypeInfo, None)
	#

	/*
	 * switch CondExpr: Label[0]: Blocks[0]; Label[1]: Blocks[2]; ... #
	 */
	CondExpr
	Labels
	Blocks

	def Evaluate(self, Visitor):
		return Visitor.VisitSwitch(self)
	#
#

class DefineNode <: TypedNode:

	DefInfo

	def DefineNode(self, TypeInfo, KeywordToken, DefInfo):
		super(TypeInfo, KeywordToken)
		self.DefInfo = DefInfo
	#

	def Evaluate(self, Visitor):
		return Visitor.VisitDefine(self)
	#
#



class GtObject:
	TypeInfo
	def GtObject(self, TypeInfo):
		self.TypeInfo = TypeInfo
	#
#

class NodeVisitor /*:
	
	# VisitList(NodeList): return False;#

	VisitDefine(Node):boolean: return False;#

	VisitConst(Node):boolean: return False;#

	VisitNew(Node):boolean: return False;#

	VisitNull(Node):boolean: return False;#

	VisitLocal(Node):boolean: return False;#


	VisitApply(Node):boolean: return False;#

	VisitAnd(Node):boolean: return False;#

	VisitOr(Node):boolean: return False;#


	VisitLet(Node):boolean: return False;#

	VisitIf(Node):boolean: return False;#

	VisitSwitch(Node):boolean: return False;#

	VisitLoop(Node):boolean: return False;#

	VisitReturn(Node):boolean: return False;#



	VisitTry(Node):boolean: return False;#

	VisitThrow(Node):boolean: return False;#


	VisitError(Node):boolean: return False;#

	def VisitList(self, Node):
		Ret = True
		while(Ret and Node != None):
			Ret &= Node.Evaluate(self)
			Node = Node.NextNode
		#
		return Ret
	#
	
#

class GtBuilder:
	
	EvalAtTopLevel(NameSpace, Node, GlobalObject):
		return None
	#

	Build(NameSpace, Node, Method):
		return None
	#
#

class GtSpec:
	# SpecType
	# SpecKey
	# SpecBody
	
	def __init__(self, SpecType, SpecKey, SpecBody):
		self.SpecType = SpecType
		self.SpecKey = SpecKey
		self.SpecBody = SpecBody
	#
#

class GtNameSpace:
	# GtContext
	# ParentNameSpace
	# ImportedNameSpaceList
	# PublicSpecList
	# PrivateSpecList
	
	# TokenFunc TokenMatrix
	# SymbolPatternTable
	# ExtendedPatternTable
	
	def __init__(self, GtContext, ParentNameSpace):
		self.GtContext = GtContext
		self.ParentNameSpace = ParentNameSpace
		self.ImportedNameSpaceList = None
		self.PublicSpecList = []
		self.PrivateSpecList = None
		self.TokenMatrix = None
		self.SymbolPatternTable = None
		self.ExtendedPatternTable = None
	#
		
	def RemakeTokenMatrixEach(self, NameSpace):
		for(i = 0; i < ListSize(NameSpace.PublicSpecList); i++):
			Spec = (GtSpec)NameSpace.PublicSpecList[i]
			if(Spec.SpecType != TokenFuncSpec) continue
			for(j = 0; j < Spec.SpecKey.length(); j++):
				knumber = FromJavaChar(Spec.SpecKey.charAt(j))
				Func = (GtFuncA)Spec.SpecBody
				self.TokenMatrix[kchar] = CreateOrReuseTokenFunc(Func, self.TokenMatrix[kchar])
			#
		#
	#
	
	def RemakeTokenMatrix(self, NameSpace):
		if(NameSpace.ParentNameSpace != None):
			RemakeTokenMatrix(NameSpace.ParentNameSpace)
		#
		RemakeTokenMatrixEach(NameSpace)
		for(i = 0; i < ListSize(NameSpace.ImportedNameSpaceList); i++):
			Imported = (GtNameSpace)NameSpace.ImportedNameSpaceList[i]
			RemakeTokenMatrixEach(Imported)
		#
	#
	
	def GetTokenFunc(self, GtChar2):
		if(self.TokenMatrix == None):
			self.TokenMatrix = TokenFunc[MaxSizeOfChars]
			RemakeTokenMatrix(self)
		#
		return self.TokenMatrix[GtChar2]
	#

	def DefineTokenFunc(self, keys, f):
		self.PublicSpecList.add(GtSpec(TokenFuncSpec, keys, f))
		self.TokenMatrix = None
	#
	
	
	def TableAddSpec(self, Table, Spec):
		Body = Spec.SpecBody
		if(instanceof SyntaxPattern):
			Parent = Table[Spec.SpecKey]
			if(instanceof SyntaxPattern):
				Body = MergeSyntaxPattern((SyntaxPattern)Body, (SyntaxPattern)Parent)
			#
		#
		Table.put(Spec.SpecKey, Body)
	#
	
	def RemakeSymbolTableEach(self, NameSpace, SpecList):
		for(i = 0; i < ListSize(SpecList); i++):
			Spec = (GtSpec)SpecList[i]
			if(Spec.SpecType == SymbolPatternSpec):
				TableAddSpec(self.SymbolPatternTable, Spec)
			#
			else if(Spec.SpecType == ExtendedPatternSpec):
				TableAddSpec(self.ExtendedPatternTable, Spec)
			#
		#
	#
	
	def RemakeSymbolTable(self, NameSpace):
		if(NameSpace.ParentNameSpace != None):
			RemakeSymbolTable(NameSpace.ParentNameSpace)
		#
		RemakeSymbolTableEach(NameSpace, NameSpace.PublicSpecList)
		RemakeSymbolTableEach(NameSpace, NameSpace.PrivateSpecList)
		for(i = 0; i < ListSize(NameSpace.ImportedNameSpaceList); i++):
			Imported = (GtNameSpace)NameSpace.ImportedNameSpaceList[i]
			RemakeSymbolTableEach(Imported, Imported.PublicSpecList)
		#
	#
	
	def GetSymbol(self, Key):
		if(self.SymbolPatternTable == None):
			self.SymbolPatternTable =:#
			self.ExtendedPatternTable =:#
			RemakeSymbolTable(self)
		#
		return self.SymbolPatternTable[Key]
	#
		
	def GetPattern(self, PatternName):
		Body = self.GetSymbol(PatternName)
		return (instanceof SyntaxPattern) ? (SyntaxPattern)Body : None
	#

	def GetExtendedPattern(self, PatternName):
		if(self.ExtendedPatternTable == None):
			self.SymbolPatternTable =:#
			self.ExtendedPatternTable =:#
			RemakeSymbolTable(self)
		#
		Body = self.ExtendedPatternTable[PatternName]
		return (instanceof SyntaxPattern) ? (SyntaxPattern)Body : None
	#

	def DefineSymbol(self, Key, Value):
		Spec = GtSpec(SymbolPatternSpec, Key, Value)
		self.PublicSpecList.push(Spec)
		if(self.SymbolPatternTable != None):
			TableAddSpec(self.SymbolPatternTable, Spec)
		#
	#

	def DefinePrivateSymbol(self, Key, Value):
		Spec = GtSpec(SymbolPatternSpec, Key, Value)
		if(self.PrivateSpecList == None):
			self.PrivateSpecList = []
		#
		self.PrivateSpecList.push(Spec)
		if(self.SymbolPatternTable != None):
			TableAddSpec(self.SymbolPatternTable, Spec)
		#
	#

	def DefineSyntaxPattern(self, PatternName, MatchFunc, TypeFunc):
		Pattern = SyntaxPattern(self, PatternName, MatchFunc, TypeFunc)
		Spec = GtSpec(SymbolPatternSpec, PatternName, Pattern)
		self.PublicSpecList.push(Spec)
		if(self.SymbolPatternTable != None):
			TableAddSpec(self.SymbolPatternTable, Spec)
		#
	#

	def DefineExtendedPattern(self, PatternName, SyntaxFlag, MatchFunc, TypeFunc):
		Pattern = SyntaxPattern(self, PatternName, MatchFunc, TypeFunc)
		Pattern.SyntaxFlag = SyntaxFlag
		Spec = GtSpec(ExtendedPatternSpec, PatternName, Pattern)
		self.PublicSpecList.push(Spec)
		if(self.ExtendedPatternTable != None):
			TableAddSpec(self.ExtendedPatternTable, Spec)
		#
	#
	
	# Object
	def CreateGlobalObject(self, ClassFlag, ShortName):
		NewClass = GtType(self.GtContext, ClassFlag, ShortName, None)
		GlobalObject = GtObject(NewClass)
		NewClass.DefaultNullValue = GlobalObject
		return GlobalObject
	#

	def GetGlobalObject(self):
		GlobalObject = self.GetSymbol(GlobalConstName)
		if(GlobalObject == None or !(instanceof GtObject)):
			GlobalObject = self.CreateGlobalObject(SingletonClass, "global")
			self.DefinePrivateSymbol(GlobalConstName, GlobalObject)
		#
		return (GtObject) GlobalObject
	#

	def ImportNameSpace(self, ImportedNameSpace):
		if(self.ImportedNameSpaceList == None):
			self.ImportedNameSpaceList = []
			self.ImportedNameSpaceList.push(ImportedNameSpace)
		#
		self.TokenMatrix = None
		self.SymbolPatternTable = None
		self.ExtendedPatternTable = None
	#

	def Eval(self, ScriptSource, FileLine):
		ResultValue = None
		println("Eval: " + ScriptSource)
		TokenContext = TokenContext(self, ScriptSource, FileLine)
		while(TokenContext.HasNext()):
			Tree = ParseSyntaxTree(None, TokenContext)
			println("untyped tree: " + Tree)
			Gamma = TypeEnv(self, None)
			TNode = TypeEnv.TypeCheckEachNode(Gamma, Tree, Gamma.VoidType, DefaultTypeCheckPolicy)
			Builder = self.GetBuilder()
			ResultValue = Builder.EvalAtTopLevel(self, TNode, self.GetGlobalObject())
		#
		return ResultValue
	#

	# Builder
	Builder

	def GetBuilder(self):
		if(self.Builder == None):
			if(self.ParentNameSpace != None):
				return self.ParentNameSpace.GetBuilder()
			#
			# self.Builder = DefaultGtBuilder(); #  create default builder
			self.Builder = GtBuilder(); #  create default builder
		#
		return self.Builder
	#


	def LookupMethod(self, MethodName, ParamSize):
		# FIXME
		# MethodName = "ClassName.MethodName"
		# 1. (ClassName, MethodName) = MethodName.split(".")
		# 2. find MethodName(arg0, arg1, ... , arg_ParamSize)
		return None
	#


	def GetSourcePosition(self, FileLine):
		return "(eval:" + (int) FileLine + ")"
	#

	def ReportError(self, Level, Token, Message):
		if(!Token.IsError()):
			if(Level == ErrorLevel):
				Message = "(error) " + self.GetSourcePosition(Token.FileLine) + " " + Message
				Token.ToErrorToken(Message)
			# else if(Level == WarningLevel):
				Message = "(warning) " + self.GetSourcePosition(Token.FileLine) + " " + Message
			# else if(Level == InfoLevel):
				Message = "(info) " + self.GetSourcePosition(Token.FileLine) + " " + Message
			#
			println(Message)
			return Message
		#
		return Token.GetErrorMessage()
	#

#

class GtGrammar:

	# Token
	def WhiteSpaceToken(TokenContext, SourceText, pos):
		TokenContext.FoundWhiteSpace()
		for(; pos < SourceText.length(); pos++):
			ch = SourceText.charAt(pos)
			if(!IsWhitespace(ch)):
				break
			#
		#
		return pos
	#

	def IndentToken(TokenContext, SourceText, pos):
		LineStart = pos + 1
		TokenContext.FoundLineFeed(1)
		pos = pos + 1
		for(; pos < SourceText.length(); pos++):
			ch = SourceText.charAt(pos)
			if(!IsWhitespace(ch)):
				break
			#
		#
		Text = ""
		if(LineStart < pos):
			Text = SourceText.substring(LineStart, pos)
		#
		TokenContext.AddNewToken(Text, IndentTokenFlag, None)
		return pos
	#

	def SingleSymbolToken(TokenContext, SourceText, pos):
		TokenContext.AddNewToken(SourceText.substring(pos, pos + 1), 0, None)
		return pos + 1
	#

	def SymbolToken(TokenContext, SourceText, pos):
		start = pos
		for(; pos < SourceText.length(); pos++):
			ch = SourceText.charAt(pos)
			if(!IsLetter(ch) and !IsDigit(ch) and ch != '_'):
				break
			#
		#
		TokenContext.AddNewToken(SourceText.substring(start, pos), 0, None)
		return pos
	#

	def MemberToken(TokenContext, SourceText, pos):
		start = pos + 1
		for(; pos < SourceText.length(); pos++):
			ch = SourceText.charAt(pos)
			if(!IsLetter(ch) and !IsDigit(ch) and ch != '_'):
				break
			#
		#
		TokenContext.AddNewToken(SourceText.substring(start, pos), 0, "$MemberOperator")
		return pos
	#

	def NumberLiteralToken(TokenContext, SourceText, pos):
		start = pos
		for(; pos < SourceText.length(); pos++):
			ch = SourceText.charAt(pos)
			if(!IsDigit(ch)):
				break
			#
		#
		TokenContext.AddNewToken(SourceText.substring(start, pos), 0, "$IntegerLitteral")
		return pos
	#

	def StringLiteralToken(TokenContext, SourceText, pos):
		start = pos + 1
		prev = '"'
		pos = start
		while(pos < SourceText.length()):
			ch = SourceText.charAt(pos)
			if(ch == '"' and prev != '\\'):
				TokenContext.AddNewToken(SourceText.substring(start, pos), 0, "$StringLitteral")
				return pos + 1
			#
			if(ch == '\n'):
				TokenContext.ReportTokenError(ErrorLevel, "expected \" to close the string literal", SourceText.substring(start, pos))
				TokenContext.FoundLineFeed(1)
				return pos
			#
			pos = pos + 1
			prev = ch
		#
		TokenContext.ReportTokenError(ErrorLevel, "expected \" to close the string literal", SourceText.substring(start, pos))
		return pos
	#

	def ParseType(Pattern, LeftTree, TokenContext):
		P("ParseType..")
		return None; #  Matched
	#

	def ParseSymbol(Pattern, LeftTree, TokenContext):
		P("ParseSymbol..")
		Token = TokenContext.Next()
		return SyntaxTree(Pattern, TokenContext.NameSpace, Token)
	#

	def TypeVariable(Gamma, Tree, TypeInfo):
		# case: is LocalVariable
		TypeInfo = Gamma.GetLocalType(Tree.KeyToken.ParsedText)
		if(TypeInfo != None):
			return LocalNode(TypeInfo, Tree.KeyToken, Tree.KeyToken.ParsedText)
		#
		# case: is GlobalVariable
		if(Tree.KeyToken.ParsedText.equals("global")):
			return ConstNode(
				Tree.TreeNameSpace.GetGlobalObject().TypeInfo,
				Tree.KeyToken,
				Tree.TreeNameSpace.GetGlobalObject())
		#
		# case: is undefined name
		return Gamma.NewErrorNode(Tree.KeyToken, "undefined name: " + Tree.KeyToken.ParsedText)
	#

	# And Type
	def ParseIntegerLiteral(Pattern, LeftTree, TokenContext):
		Token = TokenContext.Next()
		return SyntaxTree(Pattern, TokenContext.NameSpace, Token)
	#

	def TypeIntegerLiteral(Gamma, Tree, TypeInfo):
		Token = Tree.KeyToken
		return ConstNode(Gamma.IntType, Token, Integer.valueOf(Token.ParsedText))
	#

	def ParseStringLiteral(Pattern, LeftTree, TokenContext):
		Token = TokenContext.Next()
		return SyntaxTree(Pattern, TokenContext.NameSpace, Token)
	#

	def TypeStringLiteral(Gamma, Tree, TypeInfo):
		Token = Tree.KeyToken
		
		return ConstNode(Gamma.StringType, Token, Token.ParsedText)
	#

	def ParseConst(Pattern, LeftTree, TokenContext):
		Token = TokenContext.Next()
		return SyntaxTree(Pattern, TokenContext.NameSpace, Token)
	#

	def TypeConst(Gamma, Tree, TypeInfo):
		Token = Tree.KeyToken
		
		return ConstNode(Gamma.StringType, Token, Token.ParsedText)
	#

	def ParseUniaryOperator(Pattern, LeftTree, TokenContext):
		Token = TokenContext.Next()
		Tree = SyntaxTree(Pattern, TokenContext.NameSpace, Token)
		Tree.SetMatchedPatternAt(0, TokenContext, "$Expression", Required)
		return Tree
	#

	def ParseBinaryOperator(Pattern, LeftTree, TokenContext):
		Token = TokenContext.Next()
		RightTree = ParseSyntaxTree(None, TokenContext)
		if(IsEmptyOrError(RightTree)) return RightTree

		
		
		if(RightTree.Pattern.IsBinaryOperator()):
			if(Pattern.IsLeftJoin(RightTree.Pattern)):
				NewTree = SyntaxTree(Pattern, TokenContext.NameSpace, Token)
				NewTree.SetSyntaxTreeAt(LeftHandTerm, LeftTree)
				NewTree.SetSyntaxTreeAt(RightHandTerm, RightTree.GetSyntaxTreeAt(LeftHandTerm))
				RightTree.SetSyntaxTreeAt(LeftHandTerm, NewTree)
				return RightTree
			#
		#
		NewTree = SyntaxTree(Pattern, TokenContext.NameSpace, Token)
		NewTree.SetSyntaxTreeAt(LeftHandTerm, LeftTree)
		NewTree.SetSyntaxTreeAt(RightHandTerm, RightTree)
		if(RightTree.NextTree != None):
			NewTree.LinkNode(RightTree.NextTree)
			RightTree.NextTree = None
		#
		return NewTree
	#


	# PatternName: "("
	def ParseParenthesis(Pattern, LeftTree, TokenContext):
		ParseFlag = TokenContext.ParseFlag
		TokenContext.MatchToken("(")
		TokenContext.ParseFlag |= SkipIndentParseFlag
		Tree = TokenContext.ParsePattern("$Expression", Required)
		if(!TokenContext.MatchToken(")")):
			Tree = TokenContext.ReportExpectedToken(")")
		#
		TokenContext.ParseFlag = ParseFlag;		
		return Tree
	#
	
	# PatternName: "("
	def ParseParenthesis2(Pattern, LeftTree, TokenContext):
		ParseFlag = TokenContext.ParseFlag
		TokenContext.ParseFlag |= SkipIndentParseFlag
		FuncTree = SyntaxTree(Pattern, TokenContext.NameSpace, TokenContext.GetMatchedToken("("))
		FuncTree.AppendParsedTree(LeftTree)
		while(!FuncTree.IsEmptyOrError() and !TokenContext.MatchToken(")")):
			Tree = TokenContext.ParsePattern("$Expression", Required)
			FuncTree.AppendParsedTree(Tree)
			if(TokenContext.MatchToken(",")) continue
		#
		TokenContext.ParseFlag = ParseFlag;		
		return FuncTree
	#

	def ParseBlock2(Pattern, LeftTree, TokenContext):
		TokenContext.MatchToken("{")
		PrevTree = None
		while(TokenContext.SkipEmptyStatement()):
			if(TokenContext.MatchToken("#")) break
			PrevTree = ParseSyntaxTree(PrevTree, TokenContext)
			if(IsEmptyOrError(PrevTree)) return PrevTree
		#
		return TreeHead(PrevTree)
	#

	def TypeBlock(Gamma, Tree, TypeInfo):
		return Tree.TypeNodeAt(0, Gamma, Gamma.VarType, 0)
	#


	def TypeAnd(Gamma, Tree, TypeInfo):
		LeftNode = Tree.TypeNodeAt(LeftHandTerm, Gamma, Gamma.BooleanType, 0)
		RightNode = Tree.TypeNodeAt(RightHandTerm, Gamma, Gamma.BooleanType, 0)
		return AndNode(RightNode.TypeInfo, Tree.KeyToken, LeftNode, RightNode)
	#

	def TypeOr(Gamma, Tree, TypeInfo):
		LeftNode = Tree.TypeNodeAt(LeftHandTerm, Gamma, Gamma.BooleanType, 0)
		RightNode = Tree.TypeNodeAt(RightHandTerm, Gamma, Gamma.BooleanType, 0)
		return OrNode(RightNode.TypeInfo, Tree.KeyToken, LeftNode, RightNode)
	#

	def ParseMember(Pattern, LeftTree, TokenContext):
		Token = TokenContext.GetToken()
		NewTree = SyntaxTree(Pattern, TokenContext.NameSpace, Token)
		NewTree.SetSyntaxTreeAt(0, LeftTree)
		return NewTree;		
	#

	# Statement

	def ParseIf(Pattern, LeftTree, TokenContext):
		Token = TokenContext.GetMatchedToken("if")
		NewTree = SyntaxTree(Pattern, TokenContext.NameSpace, Token)
		NewTree.SetMatchedTokenAt(NoWhere, TokenContext, "(", Required)
		NewTree.SetMatchedPatternAt(IfCond, TokenContext, "$Expression", Required)
		NewTree.SetMatchedTokenAt(NoWhere, TokenContext, ")", Required)
		NewTree.SetMatchedPatternAt(IfThen, TokenContext, "$Statement", Required)
		if(TokenContext.MatchToken("else")):
			NewTree.SetMatchedPatternAt(IfElse, TokenContext, "$Statement", Required)
		#
		return NewTree
	#

	def TypeIf(Gamma, Tree, TypeInfo):
		CondNode = Tree.TypeNodeAt(IfCond, Gamma, Gamma.BooleanType, DefaultTypeCheckPolicy)
		ThenNode = Tree.TypeNodeAt(IfThen, Gamma, TypeInfo, DefaultTypeCheckPolicy)
		ElseNode = Tree.TypeNodeAt(IfElse, Gamma, ThenNode.TypeInfo, AllowEmptyPolicy)
		return IfNode(ThenNode.TypeInfo, CondNode, ThenNode, ElseNode)
	#

	# Statement

	def ParseReturn(Pattern, LeftTree, TokenContext):
		Token = TokenContext.GetMatchedToken("return")
		NewTree = SyntaxTree(Pattern, TokenContext.NameSpace, Token)
		NewTree.SetMatchedPatternAt(ReturnExpr, TokenContext, "$Expression", Optional)
		return NewTree
	#

	def TypeReturn(Gamma, Tree, TypeInfo):
		Expr = Tree.TypeNodeAt(ReturnExpr, Gamma, Gamma.ReturnType, 0)
		if(Expr.IsError()):
			return Expr
		#
		return ReturnNode(Expr.TypeInfo, Expr)
	#
	
	def ParseVarDecl(Pattern, LeftTree, TokenContext):
		P("ParseVarDecl..")
		Tree = SyntaxTree(Pattern, TokenContext.NameSpace, TokenContext.GetToken())
		Tree.SetMatchedPatternAt(VarDeclType, TokenContext, "$Type", Required)
		Tree.SetMatchedPatternAt(VarDeclName, TokenContext, "$Variable", Required)
		if(TokenContext.MatchToken("=")):
			Tree.SetMatchedPatternAt(VarDeclValue, TokenContext, "$Expression", Required)
		#
		while(TokenContext.MatchToken(",")):
			NextTree = SyntaxTree(Pattern, TokenContext.NameSpace, Tree.KeyToken)
			NextTree.SetAt(VarDeclType, Tree.GetSyntaxTreeAt(VarDeclType))
			Tree.LinkNode(NextTree)
			Tree = NextTree
			Tree.SetMatchedPatternAt(VarDeclName, TokenContext, "$Variable", Required)
			if(TokenContext.MatchToken("=")):
				Tree.SetMatchedPatternAt(VarDeclValue, TokenContext, "$Expression", Required)
			#
		#
		return Tree
	#

	def ParseMethodDecl(Pattern, LeftTree, TokenContext):
		Tree = SyntaxTree(Pattern, TokenContext.NameSpace, TokenContext.GetToken())
		Tree.SetMatchedPatternAt(MethodDeclReturnType, TokenContext, "$Type", Required)
		Tree.SetMatchedPatternAt(MethodDeclClass, TokenContext, "$MethodClass", Optional)
		Tree.SetMatchedPatternAt(MethodDeclName, TokenContext, "$MethodName", Required)
		Tree.SetMatchedTokenAt(NoWhere, TokenContext, "(", Required)
		ParamBase = MethodDeclParam
		while(!Tree.IsEmptyOrError() and !TokenContext.MatchToken(")")):
			Tree.SetMatchedPatternAt(ParamBase + VarDeclType, TokenContext, "$Type", Required)
			Tree.SetMatchedPatternAt(ParamBase + VarDeclName, TokenContext, "$Symbol", Required)
			if(TokenContext.MatchToken("=")):
				Tree.SetMatchedPatternAt(ParamBase + VarDeclValue, TokenContext, "$Expression", Required)
			#
			ParamBase += 3
		#
		Tree.SetMatchedPatternAt(MethodDeclBlock, TokenContext, "$Block", Required)
		return Tree
	#




	def LoadDefaultSyntax(self, NameSpace):
		# Types
		GtContext = NameSpace.GtContext
		NameSpace.DefineSymbol("void", GtContext.VoidType); #  FIXME
		NameSpace.DefineSymbol("boolean", GtContext.BooleanType)
		NameSpace.DefineSymbol("Object", GtContext.ObjectType)
		NameSpace.DefineSymbol("int", GtContext.IntType)
		NameSpace.DefineSymbol("String", GtContext.StringType)

		# Constants
		NameSpace.DefineSymbol("true", Boolean(True))
		NameSpace.DefineSymbol("false", Boolean(False))

		NameSpace.DefineTokenFunc(" \t", WhiteSpaceToken)
		NameSpace.DefineTokenFunc("\n", IndentToken)
		NameSpace.DefineTokenFunc("(){#[]<>,;+-*/%=&|!", SingleSymbolToken)
		NameSpace.DefineTokenFunc("Aa", SymbolToken)
		NameSpace.DefineTokenFunc(".", MemberToken)
		NameSpace.DefineTokenFunc("\"", StringLiteralToken)
		NameSpace.DefineTokenFunc("1", NumberLiteralToken)

		ParseUniary = ParseUniary
		ParseBinary = ParseBinary
		TypeApply = TypeApply

		NameSpace.DefineSyntaxPattern("+", ParseUniary, TypeApply)
		NameSpace.DefineSyntaxPattern("-", ParseUniary, TypeApply)
		NameSpace.DefineSyntaxPattern("!", ParseUniary, TypeApply)
		
		NameSpace.DefineExtendedPattern("*", BinaryOperator | Precedence_CStyleMUL, ParseBinary, TypeApply)
		NameSpace.DefineExtendedPattern("/", BinaryOperator | Precedence_CStyleMUL, ParseBinary, TypeApply)
		NameSpace.DefineExtendedPattern("%", BinaryOperator | Precedence_CStyleMUL, ParseBinary, TypeApply)

		NameSpace.DefineExtendedPattern("+", BinaryOperator | Precedence_CStyleADD, ParseBinary, TypeApply)
		NameSpace.DefineExtendedPattern("-", BinaryOperator | Precedence_CStyleADD, ParseBinary, TypeApply)

		NameSpace.DefineExtendedPattern("<", BinaryOperator | Precedence_CStyleCOMPARE, ParseBinary, TypeApply)
		NameSpace.DefineExtendedPattern("<=", BinaryOperator | Precedence_CStyleCOMPARE, ParseBinary, TypeApply)
		NameSpace.DefineExtendedPattern(">", BinaryOperator | Precedence_CStyleCOMPARE, ParseBinary, TypeApply)
		NameSpace.DefineExtendedPattern(">=", BinaryOperator | Precedence_CStyleCOMPARE, ParseBinary, TypeApply)
		NameSpace.DefineExtendedPattern("==", BinaryOperator | Precedence_CStyleEquals, ParseBinary, TypeApply)
		NameSpace.DefineExtendedPattern("!=", BinaryOperator | Precedence_CStyleEquals, ParseBinary, TypeApply)

		NameSpace.DefineExtendedPattern("=", BinaryOperator | Precedence_CStyleAssign | LeftJoin, ParseBinary, TypeAssign)

		NameSpace.DefineExtendedPattern("&&", BinaryOperator | Precedence_CStyleAND, ParseBinary, TypeAnd)
		NameSpace.DefineExtendedPattern("||", BinaryOperator | Precedence_CStyleOR, ParseBinary, TypeOr)
		
		# NameSpace.DefineSyntaxPattern(";", Precedence_CStyleDelim, self, None, None)
		# NameSpace.DefineSyntaxPattern("$Const", Term, self, "Const")
		# NameSpace.DefineSyntaxPattern("$Symbol", Term, self, "Symbol")
		# NameSpace.DefineSyntaxPattern("$Symbol", Term, self, "MethodCall")

		# NameSpace.DefineSyntaxPattern("$MethodCall", Precedence_CStyleSuffixCall, self, "MethodCall")
		# NameSpace.DefineSyntaxPattern("$Member", Precedence_CStyleSuffixCall, self, "Member")
		# NameSpace.DefineSyntaxPattern("$New", Term, self, "New")

		# NameSpace.DefineSyntaxPattern("()", Term | Precedence_CStyleSuffixCall, self, "UNUSED")
		# NameSpace.DefineSyntaxPattern("{#", 0, self, "UNUSED")
		TypeConst = TypeConst
		
		NameSpace.DefineSyntaxPattern("$Symbol", ParseSymbol, TypeVariable)
		NameSpace.DefineSyntaxPattern("$Type", ParseType, TypeConst)
		
		NameSpace.DefineSyntaxPattern("$Const", ParseConst, TypeSymbol)
		NameSpace.DefineSyntaxPattern("$StringLiteral", ParseStringLiteral, TypeConst)
		NameSpace.DefineSyntaxPattern("$IntegerLiteral", ParseIntegerLiteral, TypeConst)

		NameSpace.DefineSyntaxPattern("(", ParseParenthesis, None)

		NameSpace.DefineSyntaxPattern("{", ParseBlock, TypeBlock)
		
		NameSpace.DefineSyntaxPattern("$Symbol", ParseMethodDecl, TypeMethodDecl)
		NameSpace.DefineSyntaxPattern("$Symbol", ParseVarDecl, TypeVarDecl)

		NameSpace.DefineSyntaxPattern("if", ParseIf, TypeIf)
		NameSpace.DefineSyntaxPattern("return", ParseReturn, ParseReturn)

		# Library
		GtInt().MakeDefinition(NameSpace)
		GtStringDef().MakeDefinition(NameSpace)
		GtSystemDef().MakeDefinition(NameSpace)
	#
#


class GtInt:

	def MakeDefinition(self, ns):
	#

	def PlusInt(x):
		return +x
	#

	def IntAddInt(x, y):
		return x + y
	#

	def MinusInt(x):
		return -x
	#

	def IntSubInt(x, y):
		return x - y
	#

	def IntMulInt(x, y):
		return x * y
	#

	def IntDivInt(x, y):
		return x / y
	#

	def IntModInt(x, y):
		return x % y
	#

	def IntLtInt(x, y):
		return x < y
	#

	def IntLeInt(x, y):
		return x <= y
	#

	def IntGtInt(x, y):
		return x > y
	#

	def IntGeInt(x, y):
		return x >= y
	#

	def IntEqInt(x, y):
		return x == y
	#

	def IntNeInt(x, y):
		return x != y
	#
#

class GtStringDef:

	def MakeDefinition(self, ns):
	#

	def StringAddString(x, y):
		return x + y
	#

	def StringEqString(x, y):
		return x.equals(y)
	#

	def StringNeString(x, y):
		return !x.equals(y)
	#

	def StringIndexOf(self, str):
		return self.indexOf(str)
	#

	def StringGetSize(self):
		return self.length()
	#
#

class GtSystemDef:

	def MakeDefinition(self, NameSpace):
	#

	def p(x):
		println(x)
	#

#


class GtContext:

	RootNameSpace
	DefaultNameSpace

	VoidType
	NativeObjectType
	ObjectType
	BooleanType
	IntType
	StringType
	VarType

	ClassNameMap

	def GtContext(self, Grammar, BuilderClassName):
		self.ClassNameMap =:#
		self.RootNameSpace = GtNameSpace(self, None)
		self.VoidType = self.LookupHostLangType(Void.class)
		self.NativeObjectType = self.LookupHostLangType(Object.class)
		self.ObjectType = self.LookupHostLangType(Object.class)
		self.BooleanType = self.LookupHostLangType(Boolean.class)
		self.IntType = self.LookupHostLangType(Integer.class)
		self.StringType = self.LookupHostLangType(String.class)
		self.VarType = self.LookupHostLangType(Object.class)

		Grammar.LoadDefaultSyntax(self.RootNameSpace)
		self.DefaultNameSpace = GtNameSpace(self, self.RootNameSpace)
		if(BuilderClassName != None):
			self.DefaultNameSpace.LoadBuilder(BuilderClassName)
		#
	#

	LookupHostLangType(Class<?> ClassInfo):
		TypeInfo = (GtType) self.ClassNameMap.get(ClassInfo.getName())
		if(TypeInfo == None):
			TypeInfo = GtType(self, ClassInfo)
			self.ClassNameMap.put(ClassInfo.getName(), TypeInfo)
		#
		return TypeInfo
	#

	def Define(self, Symbol, Value):
		self.RootNameSpace.DefineSymbol(Symbol, Value)
	#

	def Eval(self, text, FileLine):
		return self.DefaultNameSpace.Eval(text, FileLine)
	#
#

class GreenTeaScript:
	
	def main(String argc):
		GtContext = GtContext(GtGrammar(), None)
		# GtContext.Eval("f(a, b): return a + b; #", 0)
		GtContext.Eval("1 + 2 * 3", 0)

	#

#
