// ***************************************************************************
// Copyright (c) 2013-2014, Konoha project authors. All rights reserved.
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

package zen.parser;


/*GreenTeaConst Begin*/
//ifdef JAVA
public interface ZenParserConst {
//endif VAJA
	// Version
	public final static String  ProgName  = "LibZen";
	public final static String  CodeName  = "Reference Implementation of D-Script";
	public final static int     MajorVersion = 0;
	public final static int     MinerVersion = 1;
	public final static int     PatchLevel   = 0;
	public final static String  Version = "0.1";
	public final static String  Copyright = "Copyright (c) 2013-2014, Konoha project authors";
	public final static String  License = "BSD-Style Open Source";

	// NameSpaceFlag
	public final static int     RootNameSpace       = 1 << 0;  // @RootNameSpace
	public final static int     PublicNameSpace     = 1 << 1;  // @Public


	// FuncFlag
	public final static int		ExportFunc		    = 1 << 0;  // @Export
	public final static int     PublicFunc          = 1 << 1;  // @Public
	public final static int		NativeFunc		    = 1 << 2;
	public final static int		VirtualFunc		    = 1 << 3;
	public final static int		ConstFunc			= 1 << 4;  // @Const
	public final static int     DeprecatedFunc      = 1 << 5;  // @Deprecated
	public final static int     HiddenFunc          = 1 << 6;  // @Hidden
	public final static int     CommonFunc          = 1 << 7;  // @Common

	public final static int		NativeMethodFunc	= 1 << 8;
	public final static int		NativeMacroFunc	    = 1 << 9;
	public final static int		NativeVariadicFunc	= 1 << 10;
	public final static int     ConstructorFunc     = 1 << 11;
	public final static int     MethodFunc          = 1 << 12;  
	public final static int     GetterFunc          = 1 << 13;
	public final static int     SetterFunc          = 1 << 14;
	public final static int     OperatorFunc        = 1 << 15;  //@Operator
	public final static int     ConverterFunc       = 1 << 16;
	public final static int     CoercionFunc        = 1 << 17;  //@Coercion
	public final static int     StrongCoercionFunc  = 1 << 18;  //@StrongCoercion
	public final static int     GenericFunc         = 1 << 15;
	public final static int		LazyFunc		    = 1 << 16;
	
	// VarFlag
	public final static int  ReadOnlyVar = 1;              // @ReadOnly x = 1; disallow x = 2
	//public final static int  MutableFieldVar  = (1 << 1);  // @Mutable x; x.y = 1 is allowed

	public final static int		MismatchedPosition		= -1;
	public final static int     Required          = (1 << 0);
	public final static int     Optional          = (1 << 1);
	public final static int     AllowLineFeed     = (1 << 2);
	public final static int     AllowAnnotation   = (1 << 3);
	public final static int     AllowSkipIndent    = (1 << 4);
	public final static int     DisallowSkipIndent   = (1 << 5);

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

	public final static int[]	CharMatrix = /*BeginArray*/{
		/*nul soh stx etx eot enq ack bel*/
		0, 1, 1, 1, 1, 1, 1, 1,
		/*bs ht nl vt np cr so si  */
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
		/*EndArray*/};

	// TokenFlag
	public final static int	SourceTokenFlag	    = 1;
	public final static int	ErrorTokenFlag	    = (1 << 1);
	public final static int IndentTokenFlag	    = (1 << 2);
	public final static int	WhiteSpaceTokenFlag	= (1 << 3);
	public final static int DelimTokenFlag	    = (1 << 4);
	public final static int QuotedTokenFlag	    = (1 << 5);
	public final static int NameSymbolTokenFlag	  = (1 << 6);

	// ParseFlag
	public final static int	BackTrackParseFlag	= 1;
	public final static int	SkipIndentParseFlag	= (1 << 1);


	public final static int BinaryOperator					= 1;
	public final static int LeftJoin						= 1 << 1;
//	public final static int PrecedenceShift					= 3;
//	public final static int PrecedenceCStyleMUL			    = (100 << PrecedenceShift) | BinaryOperator;
//	public final static int PrecedenceCStyleADD			    = (200 << PrecedenceShift) | BinaryOperator;
//	public final static int PrecedenceCStyleSHIFT			= (300 << PrecedenceShift) | BinaryOperator;
//	public final static int PrecedenceCStyleCOMPARE		    = (400 << PrecedenceShift) | BinaryOperator;
//	public final static int PrecedenceInstanceof            = PrecedenceCStyleCOMPARE;
//	public final static int PrecedenceCStyleEquals			= (500 << PrecedenceShift) | BinaryOperator;
//	public final static int PrecedenceCStyleBITAND			= (600 << PrecedenceShift) | BinaryOperator;
//	public final static int PrecedenceCStyleBITXOR			= (700 << PrecedenceShift) | BinaryOperator;
//	public final static int PrecedenceCStyleBITOR			= (800 << PrecedenceShift) | BinaryOperator;
//	public final static int PrecedenceCStyleAND			    = (900 << PrecedenceShift) | BinaryOperator;
//	public final static int PrecedenceCStyleOR				= (1000 << PrecedenceShift) | BinaryOperator;
//	public final static int PrecedenceCStyleTRINARY		    = (1100 << PrecedenceShift) | BinaryOperator;				/* ? : */
//	public final static int PrecedenceCStyleAssign			= (1200 << PrecedenceShift) | BinaryOperator;
//	public final static int PrecedenceCStyleCOMMA			= (1300 << PrecedenceShift) | BinaryOperator;


	public final static Object UndefinedSymbol = new GtUndefinedSymbol();
	public final static String NativeNameSuffix = "__";

	public final static boolean UseLangStat = true;

	public final static boolean DebugVisitor = true;
/*GreenTeaConst End*/
//ifdef JAVA
}