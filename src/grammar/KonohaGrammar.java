// ***************************************************************************
// Copyright (c) 2013, JST/CREST DEOS project authors. All rights reserved.
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

//ifdef JAVA
package grammar;
import java.util.ArrayList;

import parser.GreenTeaConsts;
import parser.GreenTeaUtils;
import parser.GtClassField;
import parser.GtFunc;
import parser.GtFuncBlock;
import parser.GtGrammar;
import parser.GtMap;
import parser.GtNameSpace;
import parser.GtParserContext;
import parser.GtPolyFunc;
import parser.GtResolvedFunc;
import parser.GtStaticTable;
import parser.GtSyntaxPattern;
import parser.GtSyntaxTree;
import parser.GtToken;
import parser.GtTokenContext;
import parser.GtType;
import parser.GtTypeEnv;
import parser.GtVariableInfo;
import parser.ast.GtBinaryNode;
import parser.ast.GtGetIndexNode;
import parser.ast.GtGetLocalNode;
import parser.ast.GtGetterNode;
import parser.ast.GtNode;
import parser.ast.GtSymbolNode;
import parser.ast.GtUnaryNode;
import parser.ast.GtVarDeclNode;
import parser.ast.GtWhileNode;
import parser.deps.GreenTeaEnum;
import parser.deps.LibGreenTea;
import parser.deps.LibNative;
//endif VAJA

public class KonohaGrammar extends GtGrammar {
	private static final boolean HasAnnotation(GtMap Annotation, String Key) {
		if(Annotation != null) {
			/*local*/Object Value = Annotation.GetOrNull(Key);
			if(Value instanceof Boolean) {
				Annotation.put(Key, false);  // consumed;
			}
			return (Value != null);
		}
		return false;
	}

	public static int ParseNameSpaceFlag(int Flag, GtMap Annotation) {
		if(Annotation != null) {
			if(KonohaGrammar.HasAnnotation(Annotation, "RootNameSpace")) {
				Flag = Flag | GreenTeaConsts.RootNameSpace;
			}
			if(KonohaGrammar.HasAnnotation(Annotation, "Public")) {
				Flag = Flag | GreenTeaConsts.PublicNameSpace;
			}
		}
		return Flag;
	}

	public static int ParseClassFlag(int Flag, GtMap Annotation) {
		if(Annotation != null) {
			if(KonohaGrammar.HasAnnotation(Annotation, "Export")) {
				Flag = Flag | GreenTeaConsts.ExportFunc;
			}
			if(KonohaGrammar.HasAnnotation(Annotation, "Public")) {
				Flag = Flag | GreenTeaConsts.PublicFunc;
			}
			if(KonohaGrammar.HasAnnotation(Annotation, "Virtual")) {
				Flag = Flag | GreenTeaConsts.VirtualFunc;
			}
			if(KonohaGrammar.HasAnnotation(Annotation, "Deprecated")) {
				Flag = Flag | GreenTeaConsts.DeprecatedFunc;
			}
		}
		return Flag;
	}

	public static int ParseFuncFlag(int Flag, GtMap Annotation) {
		if(Annotation != null) {
			if(KonohaGrammar.HasAnnotation(Annotation, "Export")) {
				Flag = Flag | GreenTeaConsts.ExportFunc;
			}
			if(KonohaGrammar.HasAnnotation(Annotation, "Public")) {
				Flag = Flag | GreenTeaConsts.PublicFunc;
			}
			if(KonohaGrammar.HasAnnotation(Annotation, "Hidden")) {
				Flag = Flag | GreenTeaConsts.HiddenFunc;
			}
			if(KonohaGrammar.HasAnnotation(Annotation, "Const")) {
				Flag = Flag | GreenTeaConsts.ConstFunc;
			}
			if(KonohaGrammar.HasAnnotation(Annotation, "Common")) {
				Flag = Flag | GreenTeaConsts.CommonFunc;
			}
			if(KonohaGrammar.HasAnnotation(Annotation, "Operator")) {
				Flag = Flag | GreenTeaConsts.OperatorFunc;
			}
			if(KonohaGrammar.HasAnnotation(Annotation, "Method")) {
				Flag = Flag | GreenTeaConsts.MethodFunc;
			}
			if(KonohaGrammar.HasAnnotation(Annotation, "Coercion")) {
				Flag = Flag | GreenTeaConsts.CoercionFunc;
			}
			if(KonohaGrammar.HasAnnotation(Annotation, "StrongCoercion")) {
				Flag = Flag | GreenTeaConsts.CoercionFunc | GreenTeaConsts.StrongCoercionFunc ;
			}
			if(KonohaGrammar.HasAnnotation(Annotation, "Deprecated")) {
				Flag = Flag | GreenTeaConsts.DeprecatedFunc;
			}
		}
		return Flag;
	}

	public static int ParseVarFlag(int Flag, GtMap Annotation) {
		if(Annotation != null) {
			if(KonohaGrammar.HasAnnotation(Annotation, "ReadOnly")) {
				Flag = Flag | GreenTeaConsts.ReadOnlyVar;
			}
		}
		return Flag;
	}

	// Token
	public static long WhiteSpaceToken(GtTokenContext TokenContext, String SourceText, long pos) {
		TokenContext.FoundWhiteSpace();
		while(pos < SourceText.length()) {
			/*local*/char ch = LibGreenTea.CharAt(SourceText, pos);
			if(ch == '\n' || !LibGreenTea.IsWhitespace(SourceText, pos)) {
				break;
			}
			pos += 1;
		}
		return pos;
	}

	public static long IndentToken(GtTokenContext TokenContext, String SourceText, long pos) {
		/*local*/long LineStart = pos + 1;
		TokenContext.FoundLineFeed(1);
		pos = pos + 1;
		while(pos < SourceText.length()) {
			if(!LibGreenTea.IsWhitespace(SourceText, pos)) {
				break;
			}
			if(LibGreenTea.CharAt(SourceText, pos) == '\n') {
				TokenContext.FoundLineFeed(1);
			}
			pos += 1;
		}
		/*local*/String Text = "";
		if(LineStart < pos) {
			Text = LibGreenTea.SubString(SourceText, LineStart, pos);
		}
		TokenContext.AddNewToken(Text, GreenTeaConsts.IndentTokenFlag, null);
		return pos;
		//TokenContext.AddNewToken(SourceText.substring(pos), SourceTokenFlag, null);
		//return SourceText.length();
	}

	public static long SemiColonToken(GtTokenContext TokenContext, String SourceText, long pos) {
		TokenContext.AddNewToken(LibGreenTea.SubString(SourceText, pos, (pos+1)), GreenTeaConsts.DelimTokenFlag, null);
		return pos+1;
	}

	public static long SymbolToken(GtTokenContext TokenContext, String SourceText, long pos) {
		/*local*/long start = pos;
		/*local*/String PresetPattern = null;
		while(pos < SourceText.length()) {
			if(!LibGreenTea.IsVariableName(SourceText, pos) && !LibGreenTea.IsDigit(SourceText, pos)) {
				break;
			}
			pos += 1;
		}
		TokenContext.AddNewToken(LibGreenTea.SubString(SourceText, start, pos), GreenTeaConsts.NameSymbolTokenFlag, PresetPattern);
		return pos;
	}

	public static long OperatorToken(GtTokenContext TokenContext, String SourceText, long pos) {
		/*local*/long NextPos = pos + 1;
		while(NextPos < SourceText.length()) {
			if(LibGreenTea.IsWhitespace(SourceText, NextPos) || LibGreenTea.IsLetter(SourceText, NextPos) || LibGreenTea.IsDigit(SourceText, NextPos)) {
				break;
			}
			NextPos += 1;
		}
		/*local*/boolean Matched = false;
		while(NextPos > pos) {
			/*local*/String Sub = LibGreenTea.SubString(SourceText, pos, NextPos);
			/*local*/GtSyntaxPattern Pattern = TokenContext.TopLevelNameSpace.GetExtendedSyntaxPattern(Sub);
			if(Pattern != null) {
				Matched = true;
				break;
			}
			NextPos -= 1;
		}
		// FIXME
		if(Matched == false) {
			NextPos = pos + 1;
		}
		TokenContext.AddNewToken(LibGreenTea.SubString(SourceText, pos, NextPos), 0, null);
		return NextPos;
	}

	public static long CommentToken(GtTokenContext TokenContext, String SourceText, long pos) {
		/*local*/long NextPos = pos + 1;
		/*local*/char NextChar = LibGreenTea.CharAt(SourceText, NextPos);
		if(NextChar != '/' && NextChar != '*') {
			return GreenTeaConsts.MismatchedPosition;
		}
		if(NextChar == '*') { // MultiLineComment
			// SourceMap ${file:line}
			if(LibGreenTea.CharAt(SourceText, NextPos+1) == '$' && LibGreenTea.CharAt(SourceText, NextPos+2) == '{') {
				/*local*/long StartPos = NextPos + 3;
				NextPos += 3;
				while(NextChar != 0) {
					NextChar = LibGreenTea.CharAt(SourceText, NextPos);
					if(NextChar == '}') {
						TokenContext.SetSourceMap(LibGreenTea.SubString(SourceText, StartPos, NextPos));
						break;
					}
					if(NextChar == '\n' || NextChar == '*') {
						break;  // stop
					}
					NextPos += 1;
				}
			}
			/*local*/int Level = 1;
			/*local*/char PrevChar = '0';
			while(NextPos < SourceText.length()) {
				NextChar = LibGreenTea.CharAt(SourceText, NextPos);
				if(NextChar == '/' && PrevChar == '*') {
					if(Level == 1) {
						return NextPos + 1;
					}
					Level = Level - 1;
				}
				if(Level > 0) {
					if(NextChar == '*' && PrevChar == '/') {
						Level = Level + 1;
					}
				}
				PrevChar = NextChar;
				NextPos = NextPos + 1;
			}
		}
		else if(NextChar == '/') { // SingleLineComment
			while(NextPos < SourceText.length()) {
				NextChar = LibGreenTea.CharAt(SourceText, NextPos);
				if(NextChar == '\n') {
					break;
				}
				NextPos = NextPos + 1;
			}
			return KonohaGrammar.IndentToken(TokenContext, SourceText, NextPos);
		}
		return GreenTeaConsts.MismatchedPosition;
	}

	public static long NumberLiteralToken(GtTokenContext TokenContext, String SourceText, long pos) {
		/*local*/long start = pos;
		/*local*/long LastMatchedPos = pos;
		while(pos < SourceText.length()) {
			if(!LibGreenTea.IsDigit(SourceText, pos)) {
				break;
			}
			pos += 1;
		}
		LastMatchedPos = pos;
		/*local*/char ch = LibGreenTea.CharAt(SourceText, pos);
		if(ch != '.' && ch != 'e' && ch != 'E') {
			TokenContext.AddNewToken(LibGreenTea.SubString(SourceText, start, pos), 0, "$IntegerLiteral$");
			return pos;
		}
		if(ch == '.') {
			pos += 1;
			while(pos < SourceText.length()) {
				if(!LibGreenTea.IsDigit(SourceText, pos)) {
					break;
				}
				pos += 1;
			}
		}
		ch = LibGreenTea.CharAt(SourceText, pos);
		if(ch == 'e' || ch == 'E') {
			pos += 1;
			ch = LibGreenTea.CharAt(SourceText, pos);
			if(ch == '+' || ch == '-') {
				pos += 1;
				ch = LibGreenTea.CharAt(SourceText, pos);
			}
			/*local*/long saved = pos;
			while(pos < SourceText.length()) {
				if(!LibGreenTea.IsDigit(SourceText, pos)) {
					break;
				}
				pos += 1;
			}
			if(saved == pos) {
				pos = LastMatchedPos;
			}
		}
		TokenContext.AddNewToken(LibGreenTea.SubString(SourceText, start, pos), 0, "$FloatLiteral$");
		return pos;
	}

	public static long CharLiteralToken(GtTokenContext TokenContext, String SourceText, long pos) {
		/*local*/long start = pos;
		/*local*/char prev = '\'';
		pos = pos + 1; // eat "\'"
		while(pos < SourceText.length()) {
			/*local*/char ch = LibGreenTea.CharAt(SourceText, pos);
			if(ch == '\'' && prev != '\\') {
				TokenContext.AddNewToken(LibGreenTea.SubString(SourceText, start, (pos + 1)), GreenTeaConsts.QuotedTokenFlag, "$CharLiteral$");
				return pos + 1;
			}
			if(ch == '\n') {
				TokenContext.ReportTokenError1(GreenTeaConsts.ErrorLevel, "expected ' to close the charctor literal", LibGreenTea.SubString(SourceText, start, pos));
				TokenContext.FoundLineFeed(1);
				return pos;
			}
			pos = pos + 1;
			prev = ch;
		}
		TokenContext.ReportTokenError1(GreenTeaConsts.ErrorLevel, "expected ' to close the charctor literal", LibGreenTea.SubString(SourceText, start, pos));
		return pos;
	}

	private static long SkipBackSlashOrNewLineOrDoubleQuote( String SourceText, long pos) {
		while(pos < SourceText.length()) {
			/*local*/char ch = LibGreenTea.CharAt(SourceText, pos);
			if(ch == '\\' || ch == '\n' || ch == '"') {
				return pos;
			}
			pos = pos + 1;
		}
		return pos;
	}

	public static long StringLiteralToken(GtTokenContext TokenContext, String SourceText, long pos) {
		/*local*/long start = pos;
		pos = pos + 1; // eat "\""
		while(pos < SourceText.length()) {
			pos = KonohaGrammar.SkipBackSlashOrNewLineOrDoubleQuote(SourceText, pos);
			/*local*/char ch = LibGreenTea.CharAt(SourceText, pos);
			if(ch == '\\') {
				if(pos + 1 < SourceText.length()) {
					/*local*/char NextChar = LibGreenTea.CharAt(SourceText, pos + 1);
					if(NextChar == 'u') { // \u12345
						while(pos < SourceText.length()) {
							if(!LibGreenTea.IsDigit(SourceText, pos)) {
								break;
							}
							pos += 1;
						}
					}
				}
				pos = pos + 1;
			}
			if(ch == '"') {
				TokenContext.AddNewToken(LibGreenTea.SubString(SourceText, start, (pos + 1)), GreenTeaConsts.QuotedTokenFlag, "$StringLiteral$");
				return pos + 1;
			}
			if(ch == '\n') {
				TokenContext.ReportTokenError1(GreenTeaConsts.ErrorLevel, "expected \" to close the string literal", LibGreenTea.SubString(SourceText, start, pos));
				TokenContext.FoundLineFeed(1);
				return pos;
			}
			pos = pos + 1;
		}
		TokenContext.ReportTokenError1(GreenTeaConsts.ErrorLevel, "expected \" to close the string literal", LibGreenTea.SubString(SourceText, start, pos));
		return pos;
	}

//	public static long StringLiteralToken_StringInterpolation(GtTokenContext TokenContext, String SourceText, long pos) {
//		/*local*/long start = pos + 1;
//		/*local*/long NextPos = start;
//		/*local*/char prev = '"';
//		while(NextPos < SourceText.length()) {
//			/*local*/char ch = LibGreenTea.CharAt(SourceText, NextPos);
//			if(ch == '$') {
//				/*local*/long end = NextPos + 1;
//				/*local*/char nextch = LibGreenTea.CharAt(SourceText, end);
//				if(nextch == '{') {
//					while(end < SourceText.length()) {
//						ch = LibGreenTea.CharAt(SourceText, end);
//						if(ch == '}') {
//							break;
//						}
//						end = end + 1;
//					}
//					/*local*/String Expr = LibGreenTea.SubString(SourceText, (NextPos + 2), end);
//					/*local*/GtTokenContext LocalContext = new GtTokenContext(TokenContext.TopLevelNameSpace, Expr, TokenContext.ParsingLine);
//					LocalContext.SkipEmptyStatement();
//
//					TokenContext.AddNewToken("\"" + LibGreenTea.SubString(SourceText, start, NextPos) + "\"", QuotedTokenFlag, "$StringLiteral$");
//					TokenContext.AddNewToken("+", 0, null);
//					while(LocalContext.HasNext()) {
//						/*local*/GtToken NewToken = LocalContext.Next();
//						TokenContext.AddNewToken(NewToken.ParsedText, 0, null);
//					}
//					TokenContext.AddNewToken("+", 0, null);
//					end = end + 1;
//					start = end;
//					NextPos = end;
//					prev = ch;
//					if(ch == '"') {
//						TokenContext.AddNewToken("\"" + LibGreenTea.SubString(SourceText, start, NextPos) + "\"", QuotedTokenFlag, "$StringLiteral$");
//						return NextPos + 1;
//					}
//					continue;
//				}
//			}
//			if(ch == '"' && prev != '\\') {
//				TokenContext.AddNewToken("\"" + LibGreenTea.SubString(SourceText, start, NextPos) + "\"", QuotedTokenFlag, "$StringLiteral$");
//				return NextPos + 1;
//			}
//			if(ch == '\n') {
//				TokenContext.ReportTokenError(ErrorLevel, "expected \" to close the string literal", LibGreenTea.SubString(SourceText, start, NextPos));
//				TokenContext.FoundLineFeed(1);
//				return NextPos;
//			}
//			NextPos = NextPos + 1;
//			prev = ch;
//		}
//		TokenContext.ReportTokenError(ErrorLevel, "expected \" to close the string literal", LibGreenTea.SubString(SourceText, start, NextPos));
//		return NextPos;
//	}

	public static GtSyntaxTree ParseTypeOf(GtNameSpace NameSpace, GtTokenContext TokenContext, GtSyntaxTree LeftTree, GtSyntaxPattern Pattern) {
		/*local*/GtSyntaxTree TypeOfTree = TokenContext.CreateMatchedSyntaxTree(NameSpace, Pattern, "typeof");
		TypeOfTree.SetMatchedTokenAt(GreenTeaConsts.NoWhere, NameSpace, TokenContext, "(", GreenTeaConsts.Required);
		TypeOfTree.SetMatchedPatternAt(GreenTeaConsts.UnaryTerm, NameSpace, TokenContext, "$Expression$", GreenTeaConsts.Required);
		TypeOfTree.SetMatchedTokenAt(GreenTeaConsts.NoWhere, NameSpace, TokenContext, ")", GreenTeaConsts.Required);
		if(!TypeOfTree.IsMismatchedOrError()) {
			/*local*/GtTypeEnv Gamma = new GtTypeEnv(NameSpace);
			/*local*/GtNode ObjectNode = TypeOfTree.TypeCheckAt(GreenTeaConsts.UnaryTerm, Gamma, GtStaticTable.VarType, GreenTeaConsts.DefaultTypeCheckPolicy);
			if(ObjectNode.IsErrorNode()) {
				TypeOfTree.ToError(ObjectNode.Token);
			}
			else {
				TypeOfTree.ToConstTree(ObjectNode.Type);
				/*local*/GtSyntaxTree TypeTree = TokenContext.ParsePatternAfter_OLD(NameSpace, TypeOfTree, "$TypeSuffix$", GreenTeaConsts.Optional);
				return (TypeTree == null) ? TypeOfTree : TypeTree;
			}
		}
		return TypeOfTree;
	}

	public static GtSyntaxTree ParseTypeSuffix(GtNameSpace NameSpace, GtTokenContext TokenContext, GtSyntaxTree TypeTree, GtSyntaxPattern Pattern) {
		/*local*/GtType ParsedType = TypeTree.GetParsedType();
		if(ParsedType.IsGenericType()) {
			if(TokenContext.MatchToken("<")) {  // Generics
				/*local*/ArrayList<GtType> TypeList = new ArrayList<GtType>();
				while(!TokenContext.StartsWithToken(">")) {
					if(TypeList.size() > 0 && !TokenContext.MatchToken(",")) {
						return null;
					}
					/*local*/GtSyntaxTree ParamTypeTree = TokenContext.ParsePattern_OLD(NameSpace, "$Type$", GreenTeaConsts.Optional);
					if(ParamTypeTree == null) {
						return ParamTypeTree;
					}
					TypeList.add(ParamTypeTree.GetParsedType());
				}
				ParsedType = GtStaticTable.GetGenericType(ParsedType, 0, TypeList, true);
			}
		}
		while(TokenContext.MatchToken("[")) {  // Array
			if(!TokenContext.MatchToken("]")) {
				return null;
			}
			ParsedType = GtStaticTable.GetGenericType1(GtStaticTable.ArrayType, ParsedType, true);
		}
		TypeTree.ToConstTree(ParsedType);
		return TypeTree;
	}

	// parser and type checker
	public static GtSyntaxTree ParseType(GtNameSpace NameSpace, GtTokenContext TokenContext, GtSyntaxTree LeftTree, GtSyntaxPattern Pattern) {
		if(TokenContext.MatchToken("typeof")) {
			return KonohaGrammar.ParseTypeOf(NameSpace, TokenContext, LeftTree, Pattern);
		}
		/*local*/GtToken Token = TokenContext.Next();
		/*local*/Object ConstValue = NameSpace.GetSymbol(Token.ParsedText);
		if(!(ConstValue instanceof GtType)) {
			return null;  // Not matched
		}
		/*local*/GtSyntaxTree TypeTree = new GtSyntaxTree(Pattern, NameSpace, Token, ConstValue);
		/*local*/GtSyntaxTree TypeSuffixTree = TokenContext.ParsePatternAfter_OLD(NameSpace, TypeTree, "$TypeSuffix$", GreenTeaConsts.Optional);
		return (TypeSuffixTree == null) ? TypeTree : TypeSuffixTree;
	}
	
	public static GtSyntaxTree ParseConst(GtNameSpace NameSpace, GtTokenContext TokenContext, GtSyntaxTree LeftTree, GtSyntaxPattern Pattern) {
		/*local*/GtToken Token = TokenContext.Next();
		/*local*/Object ConstValue = NameSpace.GetSymbol(Token.ParsedText);
		if(ConstValue != null) {
			return new GtSyntaxTree(Pattern, NameSpace, Token, ConstValue);
		}
		return null; // Not Matched
	}

	public static GtNode TypeConst(GtTypeEnv Gamma, GtSyntaxTree ParsedTree, GtType ContextType) {
		return Gamma.Generator.CreateConstNode_OLD(GtStaticTable.GuessType(ParsedTree.ParsedValue), ParsedTree, ParsedTree.ParsedValue);
	}

	public static GtNode MatchConst(GtNameSpace NameSpace, GtTokenContext TokenContext, GtNode LeftNode) {
		/*local*/GtToken Token = TokenContext.Next();
		/*local*/Object ConstValue = NameSpace.GetSymbol(Token.ParsedText);
		if(ConstValue != null) {
			return NameSpace.Context.Generator.CreateConstNode(Token, ConstValue);
		}
		return null; // Not Matched
	}
	
	public static GtSyntaxTree ParseNull(GtNameSpace NameSpace, GtTokenContext TokenContext, GtSyntaxTree LeftTree, GtSyntaxPattern Pattern) {
		return TokenContext.CreateMatchedSyntaxTree(NameSpace, Pattern, "null");
	}

	public static GtNode TypeNull(GtTypeEnv Gamma, GtSyntaxTree ParsedTree, GtType ContextType) {
		/*local*/GtType ThisType = ContextType;
		if(ThisType == GtStaticTable.VarType) {
			ThisType = GtStaticTable.AnyType;
		}
		if(ThisType.DefaultNullValue != null) {
			return Gamma.Generator.CreateConstNode_OLD(ThisType, ParsedTree, ThisType.DefaultNullValue);
		}
		return Gamma.Generator.CreateNullNode_OLD(ThisType, ParsedTree);
	}

	public static GtNode MatchNull(GtNameSpace NameSpace, GtTokenContext TokenContext, GtNode LeftNode) {
		/*local*/GtToken Token = TokenContext.Next();
		return NameSpace.Context.Generator.CreateNullNode(Token);
	}

	public static GtSyntaxTree ParseSymbol(GtNameSpace NameSpace, GtTokenContext TokenContext, GtSyntaxTree LeftTree, GtSyntaxPattern Pattern) {
		/*local*/GtSyntaxTree TypeTree = TokenContext.ParsePattern_OLD(NameSpace, "$Type$", GreenTeaConsts.Optional);
		if(TypeTree != null) {
			/*local*/GtSyntaxTree DeclTree = TokenContext.ParsePatternAfter_OLD(NameSpace, TypeTree, "$FuncDecl$", GreenTeaConsts.Optional);
			if(DeclTree != null) {
				return DeclTree;
			}
			DeclTree = TokenContext.ParsePatternAfter_OLD(NameSpace, TypeTree, "$VarDecl$", GreenTeaConsts.Optional);
			if(DeclTree != null) {
				return DeclTree;
			}
			TypeTree.Pattern = NameSpace.GetSyntaxPattern("$Const$");
			return TypeTree;
		}
		/*local*/GtToken Token = TokenContext.Next();
		/*local*/GtSyntaxTree VarTree = new GtSyntaxTree(NameSpace.GetSyntaxPattern("$Variable$"), NameSpace, Token, null);
		if(!LibGreenTea.IsVariableName(Token.ParsedText, 0)) {
			return TokenContext.ReportExpectedMessage(Token, "name", true);
		}
		return VarTree;
	}

	public static GtSyntaxTree ParseVariable(GtNameSpace NameSpace, GtTokenContext TokenContext, GtSyntaxTree LeftTree, GtSyntaxPattern Pattern) {
		/*local*/GtToken Token = TokenContext.Next();
		if(LibGreenTea.IsVariableName(Token.ParsedText, 0)) {
			return new GtSyntaxTree(Pattern, NameSpace, Token, null);
		}
		return TokenContext.ReportExpectedMessage(Token, "name", true);
	}

	public static GtNode TypeVariable(GtTypeEnv Gamma, GtSyntaxTree ParsedTree, GtType ContextType) {
		/*local*/String Name = ParsedTree.KeyToken.ParsedText;
		/*local*/GtVariableInfo VariableInfo = Gamma.LookupDeclaredVariable(Name);
		if(VariableInfo != null) {
			VariableInfo.Used();
			return Gamma.Generator.CreateGetLocalNode(VariableInfo.Type, ParsedTree, VariableInfo.NativeName);
		}
		/*local*/Object ConstValue = ParsedTree.NameSpace.GetSymbol(Name);
		if(ConstValue != null) {
			return Gamma.Generator.CreateConstNode_OLD(GtStaticTable.GuessType(ConstValue), ParsedTree, ConstValue);
		}
		/*local*/GtNode Node = Gamma.Generator.CreateGetLocalNode(GtStaticTable.AnyType, ParsedTree, Name + Gamma.Generator.BlockComment("undefined"));
		return Gamma.ReportTypeResult(ParsedTree, Node, GreenTeaConsts.TypeErrorLevel, "undefined name: " + Name);
	}

	public static GtSyntaxTree ParseVarDecl(GtNameSpace NameSpace, GtTokenContext TokenContext, GtSyntaxTree LeftTree, GtSyntaxPattern Pattern) {
		/*local*/GtSyntaxTree Tree = new GtSyntaxTree(Pattern, NameSpace, TokenContext.GetToken(), null);
		if(LeftTree == null) {
			Tree.SetMatchedPatternAt(GreenTeaConsts.VarDeclType, NameSpace, TokenContext, "$Type$", GreenTeaConsts.Required);
		}
		else {
			Tree.SetSyntaxTreeAt(GreenTeaConsts.VarDeclType, LeftTree);
		}
		Tree.SetMatchedPatternAt(GreenTeaConsts.VarDeclName, NameSpace, TokenContext, "$Variable$", GreenTeaConsts.Required);
		if(Tree.IsMismatchedOrError()) {
			return Tree;  // stopping to funcdecl operator
		}
		if(TokenContext.MatchToken("=")) {
			Tree.SetMatchedPatternAt(GreenTeaConsts.VarDeclValue, NameSpace, TokenContext, "$Expression$", GreenTeaConsts.Required);
		}
		while(TokenContext.MatchToken(",")) {
			/*local*/GtSyntaxTree NextTree = new GtSyntaxTree(Pattern, NameSpace, Tree.KeyToken, null);
			NextTree.SetSyntaxTreeAt(GreenTeaConsts.VarDeclType, Tree.GetSyntaxTreeAt(GreenTeaConsts.VarDeclType));
			NextTree.SetMatchedPatternAt(GreenTeaConsts.VarDeclName, NameSpace, TokenContext, "$Variable$", GreenTeaConsts.Required);
			if(TokenContext.MatchToken("=")) {
				NextTree.SetMatchedPatternAt(GreenTeaConsts.VarDeclValue, NameSpace, TokenContext, "$Expression$", GreenTeaConsts.Required);
			}
			Tree = GreenTeaUtils.LinkTree(Tree, NextTree);
		}
		return Tree;
	}

	public static GtNode TypeVarDecl(GtTypeEnv Gamma, GtSyntaxTree ParsedTree, GtType ContextType) {
		/*local*/int VarFlag = KonohaGrammar.ParseVarFlag(0, ParsedTree.Annotation);
		/*local*/GtType DeclType = ParsedTree.GetSyntaxTreeAt(GreenTeaConsts.VarDeclType).GetParsedType();
		/*local*/String VariableName = ParsedTree.GetSyntaxTreeAt(GreenTeaConsts.VarDeclName).KeyToken.ParsedText;
		/*local*/GtNode InitValueNode = null;
		if(ParsedTree.HasNodeAt(GreenTeaConsts.VarDeclValue)) {
			InitValueNode = ParsedTree.TypeCheckAt(GreenTeaConsts.VarDeclValue, Gamma, DeclType, GreenTeaConsts.DefaultTypeCheckPolicy);
			if(InitValueNode.IsErrorNode()) {
				return InitValueNode;
			}
		}
		if(GreenTeaConsts.UseLangStat) {
			Gamma.Context.Stat.VarDecl += 1;
		}/*EndOfStat*/
		if(DeclType.IsVarType()) {
			if(InitValueNode == null) {
				DeclType = GtStaticTable.AnyType;
			}
			else {
				DeclType = InitValueNode.Type;
			}
			Gamma.ReportTypeInference(ParsedTree.KeyToken, VariableName, DeclType);
			if(GreenTeaConsts.UseLangStat) {
				Gamma.Context.Stat.VarDeclInfer += 1;
				if(DeclType.IsAnyType()) {
					Gamma.Context.Stat.VarDeclInferAny += 1;
				}
			}/*EndOfStat*/
		}
		if(GreenTeaConsts.UseLangStat) {
			if(DeclType.IsAnyType()) {
				Gamma.Context.Stat.VarDeclAny += 1;
			}
		}/*EndOfStat*/
		if(InitValueNode == null) {
			if(DeclType.DefaultNullValue != null) {
				InitValueNode = Gamma.CreateDefaultValue(ParsedTree, DeclType);
			}
			else {
				InitValueNode = Gamma.Generator.CreateNullNode_OLD(DeclType, ParsedTree);
			}
		}
		/*local*/GtVariableInfo VarInfo = Gamma.AppendDeclaredVariable(VarFlag, DeclType, VariableName, ParsedTree.GetSyntaxTreeAt(GreenTeaConsts.VarDeclName).KeyToken, InitValueNode.ToConstValue(Gamma.Context, false));
		/*local*/GtNode BlockNode = GreenTeaUtils.TypeBlock(Gamma, ParsedTree.NextTree, GtStaticTable.VoidType);
		ParsedTree.NextTree = null;
		return Gamma.Generator.CreateVarDeclNode(DeclType, ParsedTree, DeclType, VarInfo.NativeName, InitValueNode, BlockNode);
	}

	// Parse And Type
	public static GtSyntaxTree ParseIntegerLiteral(GtNameSpace NameSpace, GtTokenContext TokenContext, GtSyntaxTree LeftTree, GtSyntaxPattern Pattern) {
		/*local*/GtToken Token = TokenContext.Next();
		return new GtSyntaxTree(Pattern, NameSpace, Token, LibGreenTea.ParseInt(Token.ParsedText));
	}
	
	public static GtSyntaxTree ParseFloatLiteral(GtNameSpace NameSpace, GtTokenContext TokenContext, GtSyntaxTree LeftTree, GtSyntaxPattern Pattern) {
		/*local*/GtToken Token = TokenContext.Next();
		return new GtSyntaxTree(Pattern, NameSpace, Token, LibGreenTea.ParseFloat(Token.ParsedText));
	}

	public static GtSyntaxTree ParseStringLiteral(GtNameSpace NameSpace, GtTokenContext TokenContext, GtSyntaxTree LeftTree, GtSyntaxPattern Pattern) {
		/*local*/GtToken Token = TokenContext.Next();
		return new GtSyntaxTree(Pattern, NameSpace, Token, LibGreenTea.UnquoteString(Token.ParsedText));
	}

	public static GtSyntaxTree ParseCharLiteral(GtNameSpace NameSpace, GtTokenContext TokenContext, GtSyntaxTree LeftTree, GtSyntaxPattern Pattern) {
		/*local*/GtToken Token = TokenContext.Next();
		/*local*/GtSyntaxTree NewTree = new GtSyntaxTree(Pattern, NameSpace, Token, LibGreenTea.UnquoteString(Token.ParsedText));
		return NewTree;
	}

	public static GtNode TypeCharLiteral(GtTypeEnv Gamma, GtSyntaxTree ParsedTree, GtType ContextType) {
		/*local*/String Text = ParsedTree.KeyToken.ParsedText;
		if(Text.length() == 3) {/* e.g. 'A'*/
			/*local*/int ch = LibGreenTea.CharAt(Text, 1);
			/*local*/Object Value = ch;
			ParsedTree.ParsedValue = LibGreenTea.ParseInt(Value.toString());
		}
		else if(Text.length() == 4) {/* e.g. '\n'*/
			/*local*/int ch = LibGreenTea.CharAt(Text, 2);
			if(LibGreenTea.CharAt(Text, 1) == '\\') {
				switch(ch) {
				case '\'': ch = '\''; break;
				case '\\': ch = '\\'; break;
				case 'b':  ch = '\b'; break;
				case 'f':  ch = '\f'; break;
				case 'n':  ch = '\n'; break;
				case 'r':  ch = '\r'; break;
				case 't':  ch = '\t'; break;
				default:   ch = -1;
				}
				if(ch >= 0) {
					/*local*/Object Value = ch;
					ParsedTree.ParsedValue = LibGreenTea.ParseInt(Value.toString());
				}
			}
		}
		return KonohaGrammar.TypeConst(Gamma, ParsedTree, ContextType);
	}
	
	public static GtSyntaxTree ParseExpression(GtNameSpace NameSpace, GtTokenContext TokenContext, GtSyntaxTree LeftTree, GtSyntaxPattern Pattern) {
		//return GreenTeaUtils.ParseExpression(NameSpace, TokenContext, false/*SuffixOnly*/);
		Pattern = TokenContext.GetFirstPattern(NameSpace);
		LeftTree = GreenTeaUtils.ApplySyntaxPattern_OLD(NameSpace, TokenContext, LeftTree, Pattern);
		while(!GreenTeaUtils.IsMismatchedOrError(LeftTree)) {
			/*local*/GtSyntaxPattern ExtendedPattern = TokenContext.GetExtendedPattern(NameSpace);
			if(ExtendedPattern == null) {
				break;
			}
			LeftTree = GreenTeaUtils.ApplySyntaxPattern_OLD(NameSpace, TokenContext, LeftTree, ExtendedPattern);
		}
		return LeftTree;
	}

	public static GtNode MatchExpression(GtNameSpace NameSpace, GtTokenContext TokenContext, GtNode LeftNode) {
		GtSyntaxPattern Pattern = TokenContext.GetFirstPattern(NameSpace);
		LeftNode = GtSyntaxPattern.ApplySyntaxPattern(NameSpace, TokenContext, LeftNode, Pattern);
		while(LeftNode != null) { //GreenTeaUtils.IsMismatchedOrError(LeftNode)) {
			/*local*/GtSyntaxPattern ExtendedPattern = TokenContext.GetExtendedPattern(NameSpace);
			if(ExtendedPattern == null) {
				break;
			}
			LeftNode = GtSyntaxPattern.ApplySyntaxPattern(NameSpace, TokenContext, LeftNode, ExtendedPattern);
		}
		return LeftNode;
	}

	public static GtSyntaxTree ParseSuffixExpression(GtNameSpace NameSpace, GtTokenContext TokenContext, GtSyntaxTree LeftTree, GtSyntaxPattern Pattern) {
		Pattern = TokenContext.GetFirstPattern(NameSpace);
		LeftTree = GreenTeaUtils.ApplySyntaxPattern_OLD(NameSpace, TokenContext, LeftTree, Pattern);
		while(!GreenTeaUtils.IsMismatchedOrError(LeftTree)) {
			/*local*/GtSyntaxPattern ExtendedPattern = TokenContext.GetExtendedPattern(NameSpace);
			if(ExtendedPattern == null || ExtendedPattern.IsBinaryOperator()) {
				break;
			}
			LeftTree = GreenTeaUtils.ApplySyntaxPattern_OLD(NameSpace, TokenContext, LeftTree, ExtendedPattern);
		}
		return LeftTree;
	}

	public static GtNode MatchUnary(GtNameSpace NameSpace, GtTokenContext TokenContext, GtNode LeftNode) {
		/*local*/GtToken Token = TokenContext.Next();
		GtNode ValueNode = TokenContext.ParsePattern(NameSpace, "$SuffixExpression$", GreenTeaConsts.Required);
		if(ValueNode.IsErrorNode()) {
			return ValueNode;
		}
		return new GtUnaryNode(GtStaticTable.VarType, Token, Token.ParsedText, ValueNode);
	}
	
	public static GtSyntaxTree ParseUnary(GtNameSpace NameSpace, GtTokenContext TokenContext, GtSyntaxTree LeftTree, GtSyntaxPattern Pattern) {
		/*local*/GtToken Token = TokenContext.Next();
		/*local*/GtSyntaxTree Tree = new GtSyntaxTree(Pattern, NameSpace, Token, null);
		Tree.SetMatchedPatternAt(GreenTeaConsts.UnaryTerm, NameSpace, TokenContext, "$SuffixExpression$", GreenTeaConsts.Required);
		return Tree;
	}

	public static GtNode TypeUnary(GtTypeEnv Gamma, GtSyntaxTree ParsedTree, GtType ContextType) {
		/*local*/GtNode RecvNode  = ParsedTree.TypeCheckAt(GreenTeaConsts.UnaryTerm, Gamma, GtStaticTable.VarType, GreenTeaConsts.DefaultTypeCheckPolicy);
		if(RecvNode.IsErrorNode()) {
			return RecvNode;
		}
		/*local*/String OperatorSymbol = ParsedTree.KeyToken.ParsedText;
		/*local*/GtPolyFunc PolyFunc = ParsedTree.NameSpace.GetMethod(RecvNode.Type, GreenTeaUtils.FuncSymbol(OperatorSymbol), true);
		/*local*/GtFunc ResolvedFunc = PolyFunc.ResolveUnaryMethod(Gamma, RecvNode.Type);
		if(ResolvedFunc != null) {
			Gamma.CheckFunc("operator", ResolvedFunc, ParsedTree.KeyToken);
			GtNode Node = Gamma.Generator.CreateUnaryNode(ResolvedFunc.GetReturnType(), ParsedTree, GreenTeaUtils.FuncSymbol(OperatorSymbol), RecvNode);
			if(Node instanceof GtSymbolNode) {
				((/*cast*/GtSymbolNode)Node).ResolvedFunc = ResolvedFunc;
			}
			return Node;
		}
		if(RecvNode.Type.IsDynamicType()) {
			GtNode Node = Gamma.Generator.CreateApplySymbolNode(GtStaticTable.AnyType, ParsedTree, GreenTeaUtils.FuncSymbol(OperatorSymbol), null);
			Node.Append(RecvNode);
			return Node;
		}
		return PolyFunc.CreateTypeErrorNode(Gamma, ParsedTree, "operator", RecvNode.Type, OperatorSymbol);
	}


	private static GtNode RightJoin(GtNameSpace NameSpace, GtNode LeftTree, GtSyntaxPattern Pattern, GtToken Token, GtBinaryNode RightTree) {
		/*local*/GtNode RightLeft = RightTree.LeftNode;
		if(RightLeft instanceof GtBinaryNode && Pattern.IsRightJoin(((GtBinaryNode)RightLeft)._Pattern)) {
			RightTree.LeftNode = KonohaGrammar.RightJoin(NameSpace, LeftTree, Pattern, Token, (GtBinaryNode) RightLeft);
		}
		else {
			/*local*/GtBinaryNode NewTree = new GtBinaryNode(GtStaticTable.VarType, Token, Token.ParsedText, LeftTree, RightLeft);
			RightTree.LeftNode = NewTree;
//			/*local*/GtSyntaxTree NewTree = new GtSyntaxTree(Pattern, NameSpace, OperatorToken, null);
//			NewTree.SetSyntaxTreeAt(GreenTeaConsts.LeftHandTerm, LeftTree);
//			NewTree.SetSyntaxTreeAt(GreenTeaConsts.RightHandTerm, RightLeft);
//			RightTree.SetSyntaxTreeAt(GreenTeaConsts.LeftHandTerm, NewTree);
		}
		return RightTree;
	}
 
	public static GtNode MatchBinary(GtNameSpace NameSpace, GtTokenContext TokenContext, GtNode LeftNode) {
		/*local*/GtToken Token = TokenContext.Next();
		/*local*/GtNode RightTree = TokenContext.ParsePattern(NameSpace, "$Expression$", GreenTeaConsts.Required);
		if(RightTree.IsErrorNode()) {
			return RightTree;
		}
		/*local*/GtSyntaxPattern Pattern = NameSpace.GetExtendedSyntaxPattern(Token.ParsedText);  // FIXME
		if(RightTree instanceof GtBinaryNode && Pattern.IsRightJoin(((GtBinaryNode)RightTree)._Pattern)) {
			return KonohaGrammar.RightJoin(NameSpace, LeftNode, Pattern, Token, (GtBinaryNode) RightTree);
		}
		// LeftJoin
		/*local*/GtBinaryNode NewTree = new GtBinaryNode(GtStaticTable.VarType, Token, Token.ParsedText, LeftNode, RightTree);
		if(RightTree.NextNode != null) {  // necesarry; don't remove
			GreenTeaUtils.LinkNode(NewTree, RightTree.NextNode);
			RightTree.NextNode = null;
		}
		return NewTree;
	}

	private static GtSyntaxTree RightJoin_OLD(GtNameSpace NameSpace, GtSyntaxTree LeftTree, GtSyntaxPattern Pattern, GtToken OperatorToken, GtSyntaxTree RightTree) {
		/*local*/GtSyntaxTree RightLeft = RightTree.GetSyntaxTreeAt(GreenTeaConsts.LeftHandTerm);
		if(RightLeft.Pattern.IsBinaryOperator() && Pattern.IsRightJoin(RightLeft.Pattern)) {
			RightTree.SetSyntaxTreeAt(GreenTeaConsts.LeftHandTerm, KonohaGrammar.RightJoin_OLD(NameSpace, LeftTree, Pattern, OperatorToken, RightLeft));
		}
		else {
			/*local*/GtSyntaxTree NewTree = new GtSyntaxTree(Pattern, NameSpace, OperatorToken, null);
			NewTree.SetSyntaxTreeAt(GreenTeaConsts.LeftHandTerm, LeftTree);
			NewTree.SetSyntaxTreeAt(GreenTeaConsts.RightHandTerm, RightLeft);
			RightTree.SetSyntaxTreeAt(GreenTeaConsts.LeftHandTerm, NewTree);
		}
		return RightTree;
	}

	public static GtSyntaxTree ParseBinary(GtNameSpace NameSpace, GtTokenContext TokenContext, GtSyntaxTree LeftTree, GtSyntaxPattern Pattern) {
		/*local*/GtToken OperatorToken = TokenContext.Next();
		/*local*/GtSyntaxTree RightTree = TokenContext.ParsePattern_OLD(NameSpace, "$Expression$", GreenTeaConsts.Required);
		if(GreenTeaUtils.IsMismatchedOrError(RightTree)) {
			return RightTree;
		}
		//System.err.println("left=" + Pattern.SyntaxFlag + ", right=" + RightTree.Pattern.SyntaxFlag + ", binary?" +  RightTree.Pattern.IsBinaryOperator() + RightTree.Pattern);
		if(RightTree.Pattern.IsBinaryOperator() && Pattern.IsRightJoin(RightTree.Pattern)) {
			return KonohaGrammar.RightJoin_OLD(NameSpace, LeftTree, Pattern, OperatorToken, RightTree);
		}
		// LeftJoin
		/*local*/GtSyntaxTree NewTree = new GtSyntaxTree(Pattern, NameSpace, OperatorToken, null);
		NewTree.SetSyntaxTreeAt(GreenTeaConsts.LeftHandTerm, LeftTree);
		NewTree.SetSyntaxTreeAt(GreenTeaConsts.RightHandTerm, RightTree);
		if(RightTree.NextTree != null) {  // necesarry; don't remove
			GreenTeaUtils.LinkTree(NewTree, RightTree.NextTree);
			RightTree.NextTree = null;
		}
		return NewTree;
	}

	
	public static GtNode TypeBinary(GtTypeEnv Gamma, GtSyntaxTree ParsedTree, GtType ContextType) {
		/*local*/GtNode RecvNode  = ParsedTree.TypeCheckAt(GreenTeaConsts.LeftHandTerm, Gamma, GtStaticTable.VarType, GreenTeaConsts.DefaultTypeCheckPolicy);
		if(RecvNode.IsErrorNode()) {
			return RecvNode;
		}
		/*local*/String OperatorSymbol = ParsedTree.KeyToken.ParsedText;
		/*local*/GtPolyFunc PolyFunc = ParsedTree.NameSpace.GetMethod(RecvNode.Type, GreenTeaUtils.FuncSymbol(OperatorSymbol), true);
		if(!PolyFunc.IsEmpty()) {
			/*local*/ArrayList<GtNode> ParamList = new ArrayList<GtNode>();
			ParamList.add(RecvNode);
			/*local*/GtResolvedFunc ResolvedFunc = PolyFunc.ResolveFunc(Gamma, ParsedTree, 1, ParamList);
			if(ResolvedFunc.Func != null) {
				GtNode Node = Gamma.Generator.CreateBinaryNode(ResolvedFunc.ReturnType, ParsedTree, GreenTeaUtils.FuncSymbol(OperatorSymbol), RecvNode, ParamList.get(1));
				if(Node instanceof GtSymbolNode) {
					((/*cast*/GtSymbolNode)Node).ResolvedFunc = ResolvedFunc.Func;
				}
				return Node;
			}
		}
		if(RecvNode.Type.IsDynamicType()) {
			/*local*/ArrayList<GtNode> ParamList = new ArrayList<GtNode>();
			ParamList.add(RecvNode);
			ParamList.add(ParsedTree.TypeCheckAt(GreenTeaConsts.RightHandTerm, Gamma, GtStaticTable.VarType, GreenTeaConsts.DefaultTypeCheckPolicy));
			return Gamma.Generator.CreateApplySymbolNode(GtStaticTable.AnyType, ParsedTree, GreenTeaUtils.FuncSymbol(OperatorSymbol), null).AppendNodeList(0, ParamList);
		}
		return PolyFunc.CreateTypeErrorNode(Gamma, ParsedTree, "operator", RecvNode.Type, OperatorSymbol);
	}

	public static GtSyntaxTree ParseTrinary(GtNameSpace NameSpace, GtTokenContext TokenContext, GtSyntaxTree LeftTree, GtSyntaxPattern Pattern) {
		/*local*/GtSyntaxTree TrinaryTree = TokenContext.CreateMatchedSyntaxTree(NameSpace, Pattern, "?");
		TrinaryTree.SetSyntaxTreeAt(GreenTeaConsts.IfCond, LeftTree);
		TrinaryTree.SetMatchedPatternAt(GreenTeaConsts.IfThen, NameSpace, TokenContext, "$Expression$", GreenTeaConsts.Required);
		TrinaryTree.SetMatchedTokenAt(GreenTeaConsts.NoWhere, NameSpace, TokenContext, ":", GreenTeaConsts.Required);
		TrinaryTree.SetMatchedPatternAt(GreenTeaConsts.IfElse, NameSpace, TokenContext, "$Expression$", GreenTeaConsts.Required);
		return TrinaryTree;
	}

	public static GtNode TypeTrinary(GtTypeEnv Gamma, GtSyntaxTree ParsedTree, GtType ContextType) {
		/*local*/GtNode CondNode = ParsedTree.TypeCheckAt(GreenTeaConsts.IfCond, Gamma, GtStaticTable.BooleanType, GreenTeaConsts.DefaultTypeCheckPolicy);
		/*local*/GtNode ThenNode = ParsedTree.TypeCheckAt(GreenTeaConsts.IfThen, Gamma, GtStaticTable.VarType, GreenTeaConsts.DefaultTypeCheckPolicy);
		if(ThenNode.IsErrorNode()) {
			return ThenNode;
		}
		/*local*/GtNode ElseNode = ParsedTree.TypeCheckAt(GreenTeaConsts.IfElse, Gamma, ThenNode.Type, GreenTeaConsts.DefaultTypeCheckPolicy);
		return Gamma.Generator.CreateTrinaryNode(ThenNode.Type, ParsedTree, CondNode, ThenNode, ElseNode);
	}

	// PatternName: "("  (1)
	public static GtSyntaxTree ParseGroup(GtNameSpace NameSpace, GtTokenContext TokenContext, GtSyntaxTree LeftTree, GtSyntaxPattern Pattern) {
		/*local*/GtSyntaxTree GroupTree = TokenContext.CreateSyntaxTree(NameSpace, Pattern, null);
		GroupTree.SetMatchedTokenAt(GreenTeaConsts.KeyTokenIndex, NameSpace, TokenContext, "(", GreenTeaConsts.Required);
		/*local*/int ParseFlag = TokenContext.SetSkipIndent(true);
		GroupTree.AppendMatchedPattern(NameSpace, TokenContext, "$Expression$", GreenTeaConsts.Required);
		GroupTree.SetMatchedTokenAt(GreenTeaConsts.NoWhere, NameSpace, TokenContext, ")", GreenTeaConsts.Required);
		TokenContext.SetRememberFlag(ParseFlag);
		return GroupTree;
	}

	public static GtNode TypeGroup(GtTypeEnv Gamma, GtSyntaxTree ParsedTree, GtType ContextType) {
		return ParsedTree.TypeCheckAt(GreenTeaConsts.UnaryTerm, Gamma, ContextType, GreenTeaConsts.DefaultTypeCheckPolicy);
	}

	// PatternName: "("  (1)
	public static GtNode MatchGroup(GtNameSpace NameSpace, GtTokenContext TokenContext, GtNode LeftTree) {
//		/*local*/GtToken Token = TokenContext.Next();
//		/*local*/GtNode GroupNode = new GtUnaryNode(GtStaticTable.VarType, Token, null, null); 
//		/*local*/GtSyntaxTree GroupTree = TokenContext.CreateSyntaxTree(NameSpace, Pattern, null);
//		GroupTree.SetMatchedTokenAt(GreenTeaConsts.KeyTokenIndex, NameSpace, TokenContext, "(", GreenTeaConsts.Required);
		TokenContext.Push();
		/*local*/GtNode GroupNode = new GtUnaryNode(GtStaticTable.VarType, null, null, null); 
		GroupNode = TokenContext.MatchNodeToken(GroupNode, NameSpace, "(", GreenTeaConsts.Required | GreenTeaConsts.OpenSkipIndent);
		GroupTree.AppendMatchedPattern(NameSpace, TokenContext, "$Expression$", GreenTeaConsts.Required);
		GroupNode = TokenContext.MatchNodeToken(GroupNode, NameSpace, ")", GreenTeaConsts.Required);
		TokenContext.Pop();
		//TokenContext.SetRememberFlag(ParseFlag);
		return GroupNode;
	}

	public static GtNode TypeGroup(GtTypeEnv Gamma, GtSyntaxTree ParsedTree, GtType ContextType) {
		return ParsedTree.TypeCheckAt(GreenTeaConsts.UnaryTerm, Gamma, ContextType, GreenTeaConsts.DefaultTypeCheckPolicy);
	}

	// PatternName: "(" "to" $Type$ ")"
	public static GtSyntaxTree ParseCast(GtNameSpace NameSpace, GtTokenContext TokenContext, GtSyntaxTree LeftTree, GtSyntaxPattern Pattern) {
		/*local*/GtToken FirstToken = TokenContext.Next(); // skip the first token
		/*local*/GtSyntaxTree CastTree = null;
		if(TokenContext.MatchToken("to")) {
			CastTree = new GtSyntaxTree(Pattern, NameSpace, TokenContext.GetBeforeToken(), null);
		}
		else {
			CastTree = new GtSyntaxTree(Pattern, NameSpace, FirstToken, null);
		}
		CastTree.SetMatchedPatternAt(GreenTeaConsts.LeftHandTerm, NameSpace, TokenContext, "$Type$", GreenTeaConsts.Required);
		CastTree.SetMatchedTokenAt(GreenTeaConsts.NoWhere, NameSpace, TokenContext, ")", GreenTeaConsts.Required);
		CastTree.SetMatchedPatternAt(GreenTeaConsts.RightHandTerm, NameSpace, TokenContext, "$SuffixExpression$", GreenTeaConsts.Required);
		return CastTree;
	}

	public static GtNode TypeCast(GtTypeEnv Gamma, GtSyntaxTree ParsedTree, GtType ContextType) {
		/*local*/GtType CastType = ParsedTree.GetSyntaxTreeAt(GreenTeaConsts.LeftHandTerm).GetParsedType();
		/*local*/int TypeCheckPolicy = GreenTeaConsts.CastPolicy;
		return ParsedTree.TypeCheckAt(GreenTeaConsts.RightHandTerm, Gamma, CastType, TypeCheckPolicy);
	}

	public static GtNode TypeNewNode(GtTypeEnv Gamma, GtSyntaxTree ParsedTree, GtToken ClassToken, GtType ClassType, GtType ContextType) {
		if(ClassType.IsVarType()) {  /* constructor */
			ClassType = ContextType;
			if(ClassType.IsVarType()) {
				return Gamma.CreateSyntaxErrorNode(ParsedTree, "ambigious constructor: " + ClassToken);
			}
			Gamma.ReportTypeInference(ClassToken, "constructor", ClassType);
		}
		if(ClassType.IsAbstractType()) {
			return Gamma.CreateSyntaxErrorNode(ParsedTree, "type is abstract");
		}
		/*local*/GtPolyFunc PolyFunc = ParsedTree.NameSpace.GetConstructorFunc(/*GtFunc*/ClassType);
		/*local*/ArrayList<GtNode> ParamList = new ArrayList<GtNode>();
		if(ClassType.IsNativeType()) {
			/*local*/GtResolvedFunc ResolvedFunc = PolyFunc.ResolveFunc(Gamma, ParsedTree, 1, ParamList);
			if(ResolvedFunc.ErrorNode != null) {
				return ResolvedFunc.ErrorNode;
			}
			if(ResolvedFunc.Func != null && ResolvedFunc.Func.Is(GreenTeaConsts.NativeFunc)) {
				Gamma.CheckFunc("constructor", ResolvedFunc.Func, ParsedTree.KeyToken);
				GtNode Node = Gamma.Generator.CreateConstructorNode(ClassType, ParsedTree, ResolvedFunc.Func);
				Node.AppendNodeList(0, ParamList);
				return Node;
			}
		}
		else {
			/*local*/GtNode NewNode = Gamma.Generator.CreateAllocateNode(ClassType, ParsedTree);
			ParamList.add(NewNode);
			/*local*/GtResolvedFunc ResolvedFunc = PolyFunc.ResolveFunc(Gamma, ParsedTree, 1, ParamList);
			if(ResolvedFunc.ErrorNode != null) {
				return ResolvedFunc.ErrorNode;
			}
			if(ResolvedFunc.Func == null) {
				if(ParsedTree.SubTreeList.size() == 1) {
					return NewNode;
				}
			}
			else {
				Gamma.CheckFunc("constructor", ResolvedFunc.Func, ParsedTree.KeyToken);
				/*local*/GtNode Node = Gamma.Generator.CreateConstructorNode(ResolvedFunc.ReturnType, ParsedTree, ResolvedFunc.Func);
				Node.AppendNodeList(0, ParamList);
				return Node;
			}
		}
		return PolyFunc.CreateTypeErrorNode(Gamma, ParsedTree, "constructor", ClassType, "");
	}

	public static GtSyntaxTree ParseGetter(GtNameSpace NameSpace, GtTokenContext TokenContext, GtSyntaxTree LeftTree, GtSyntaxPattern Pattern) {
		TokenContext.MatchToken(".");
		/*local*/GtToken Token = TokenContext.Next();
		if(!Token.IsNameSymbol()) {
			return TokenContext.ReportExpectedMessage(Token, "field name", true);
		}
		if(TokenContext.IsToken("(")) {  // method call
			/*local*/GtSyntaxTree ApplyTree = TokenContext.ParsePatternAfter_OLD(NameSpace, LeftTree, "$MethodCall$", GreenTeaConsts.Required);
			if(GreenTeaUtils.IsValidSyntax(ApplyTree)) {
				ApplyTree.KeyToken = Token;
			}
			return ApplyTree;
		}
		/*local*/GtSyntaxTree NewTree = new GtSyntaxTree(Pattern, NameSpace, Token, null);
		NewTree.AppendParsedTree2(LeftTree);
		if(TokenContext.MatchToken("=")) {
			NewTree.Pattern = NameSpace.GetSyntaxPattern("$Setter$");
			NewTree.SetMatchedPatternAt(GreenTeaConsts.RightHandTerm, NameSpace, TokenContext, "$Expression$", GreenTeaConsts.Required);
		}
		return NewTree;
	}

	public static GtNode TypeGetter(GtTypeEnv Gamma, GtSyntaxTree ParsedTree, GtType ContextType) {
		/*local*/String Name = ParsedTree.KeyToken.ParsedText;
		/*local*/GtNode RecvNode = ParsedTree.TypeCheckAt(GreenTeaConsts.UnaryTerm, Gamma, GtStaticTable.VarType, GreenTeaConsts.DefaultTypeCheckPolicy);
		if(RecvNode.IsErrorNode()) {
			return RecvNode;
		}
		// 1. To start, check class const such as Math.Pi if base is a type value
		/*local*/String TypeName = RecvNode.Type.ShortName;
		if(RecvNode.IsConstNode() && RecvNode.Type.IsTypeType()) {
			/*local*/GtType ObjectType = (/*cast*/GtType)RecvNode.ToConstValue(Gamma.Context, false);
			/*local*/Object ConstValue = ParsedTree.NameSpace.GetClassStaticSymbol(ObjectType, Name, true);
			if(ConstValue != null) {
				return Gamma.Generator.CreateConstNode_OLD(GtStaticTable.VarType, ParsedTree, ConstValue);
			}
			TypeName = ObjectType.ShortName;
		}
		// 2. find Class method
		// 3. find object field
		/*local*/GtFunc GetterFunc = ParsedTree.NameSpace.GetGetterFunc(RecvNode.Type, Name, true);
		if(GetterFunc != null) {
			GtNode Node = Gamma.Generator.CreateGetterNode(GetterFunc.GetReturnType(), ParsedTree, RecvNode, Name);
			if(Node instanceof GtSymbolNode) {
				((/*cast*/GtSymbolNode) Node).ResolvedFunc = GetterFunc;
			}
			return Node;
		}
		if(RecvNode.Type.IsDynamicType()) {
			throw new RuntimeException("FIXME implement dynamic getter");
			//return Gamma.Generator.CreateDyGetterNode(ContextType, ParsedTree, RecvNode, Name);
		}
		/*local*/GtPolyFunc PolyFunc = ParsedTree.NameSpace.GetMethod(RecvNode.Type, Name, true);
		if(PolyFunc.FuncList.size() > 0) {
			return Gamma.CreateSyntaxErrorNode(ParsedTree, Name + " of " + TypeName + " is method(s): " + PolyFunc);
		}
		return Gamma.CreateSyntaxErrorNode(ParsedTree, "undefined name: " + Name + " of " + TypeName);
	}

	public static GtNode TypeSetter(GtTypeEnv Gamma, GtSyntaxTree ParsedTree, GtType ContextType) {
		/*local*/String Name = ParsedTree.KeyToken.ParsedText;
		/*local*/GtNode RecvNode = ParsedTree.TypeCheckAt(GreenTeaConsts.UnaryTerm, Gamma, GtStaticTable.VarType, GreenTeaConsts.DefaultTypeCheckPolicy);
		if(RecvNode.IsErrorNode()) {
			return RecvNode;
		}
		/*local*/GtFunc SetterFunc = ParsedTree.NameSpace.GetSetterFunc(RecvNode.Type, Name, true);
		if(SetterFunc != null) {
			/*local*/GtType ValueType = SetterFunc.GetFuncParamType(1);
			/*local*/GtNode ValueNode = ParsedTree.TypeCheckAt(GreenTeaConsts.RightHandTerm, Gamma, ValueType, GreenTeaConsts.DefaultTypeCheckPolicy);
			GtNode Node = Gamma.Generator.CreateSetterNode(GtStaticTable.VoidType, ParsedTree, RecvNode, Name, ValueNode);
			if(Node instanceof GtSymbolNode) {
				((/*cast*/GtSymbolNode)Node).ResolvedFunc = SetterFunc;
			}
			return Node;
		}
		if(RecvNode.Type.IsDynamicType()) {
			/*local*/GtNode ValueNode = ParsedTree.TypeCheckAt(GreenTeaConsts.RightHandTerm, Gamma, GtStaticTable.VarType, GreenTeaConsts.DefaultTypeCheckPolicy);
			return Gamma.Generator.CreateSetterNode(GtStaticTable.VoidType, ParsedTree, RecvNode, Name, ValueNode);
		}
		return Gamma.CreateSyntaxErrorNode(ParsedTree, "undefined name: " + Name + " of " + RecvNode.Type);
	}

	public static GtNode TypeMethodCall(GtTypeEnv Gamma, GtSyntaxTree ParsedTree, GtType ContextType) {
		/*local*/String Name = ParsedTree.KeyToken.ParsedText;
		/*local*/GtNode RecvNode = ParsedTree.TypeCheckAt(GreenTeaConsts.UnaryTerm, Gamma, GtStaticTable.VarType, GreenTeaConsts.DefaultTypeCheckPolicy);
		if(RecvNode.IsErrorNode()) {
			return RecvNode;
		}
		if(RecvNode.IsConstNode() && RecvNode.Type.IsTypeType()) {
			/*local*/GtType ObjectType = (/*cast*/GtType)RecvNode.ToConstValue(Gamma.Context, false);
			/*local*/Object ConstValue = ParsedTree.NameSpace.GetClassStaticSymbol(ObjectType, Name, true);
			if(ConstValue != null) {
				return Gamma.Generator.CreateConstNode_OLD(GtStaticTable.VarType, ParsedTree, ConstValue);
			}
			Name = ObjectType.ShortName + "." + Name;
			return Gamma.CreateSyntaxErrorNode(ParsedTree, "undefined name: " + Name);
		}
		return KonohaGrammar.TypeMethodNameCall(Gamma, ParsedTree, RecvNode, Name, ContextType);
	}

	public static GtNode TypeMethodNameCall(GtTypeEnv Gamma, GtSyntaxTree ParsedTree, GtNode RecvNode, String MethodName, GtType ContextType) {
		if(RecvNode.IsErrorNode()) {
			return RecvNode;
		}
		/*local*/GtPolyFunc PolyFunc = ParsedTree.NameSpace.GetMethod(RecvNode.Type, GreenTeaUtils.FuncSymbol(MethodName), true);
		//System.err.println("polyfunc: " + PolyFunc);
		/*local*/ArrayList<GtNode> ParamList = new ArrayList<GtNode>();
		ParamList.add(RecvNode);
		/*local*/GtResolvedFunc ResolvedFunc = PolyFunc.ResolveFunc(Gamma, ParsedTree, 1, ParamList);
		if(ResolvedFunc.ErrorNode != null) {
			return ResolvedFunc.ErrorNode;
		}
		if(ResolvedFunc.Func != null) {
			Gamma.CheckFunc("method", ResolvedFunc.Func, ParsedTree.KeyToken);
			GtNode Node = Gamma.Generator.CreateApplyMethodNode(ResolvedFunc.ReturnType, ParsedTree, GreenTeaUtils.FuncSymbol(MethodName), ResolvedFunc.Func);
			Node.AppendNodeList(0, ParamList);
			return Node;
		}
		if(RecvNode.Type.IsDynamicType()) {
			Gamma.FoundUncommonFunc = true;
			GtNode Node = Gamma.Generator.CreateApplySymbolNode(ContextType, ParsedTree, MethodName, null);
			Node.AppendNodeList(0, ParamList);
			return Node;
		}
		if(LibGreenTea.EqualsString(MethodName, "()")) {
			return Gamma.CreateSyntaxErrorNode(ParsedTree, RecvNode.Type + " is not applicapable");
		}
		return PolyFunc.CreateTypeErrorNode(Gamma, ParsedTree, "method", RecvNode.Type, MethodName);
	}

	public static GtNode TypePolyFuncCall(GtTypeEnv Gamma, GtSyntaxTree ParsedTree, GtPolyFunc PolyFunc) {
		/*local*/ArrayList<GtNode> ParamList = new ArrayList<GtNode>();
		/*local*/GtResolvedFunc ResolvedFunc = PolyFunc.ResolveFunc(Gamma, ParsedTree, 1, ParamList);
		if(ResolvedFunc.ErrorNode != null) {
			return ResolvedFunc.ErrorNode;
		}
		if(ResolvedFunc.Func != null) {
			Gamma.CheckFunc("function", ResolvedFunc.Func, ParsedTree.KeyToken);
			GtNode Node = Gamma.Generator.CreateApplySymbolNode(ResolvedFunc.ReturnType, ParsedTree, ResolvedFunc.Func.FuncName, ResolvedFunc.Func);
			Node.AppendNodeList(0, ParamList);
			return Node;
		}
		return Gamma.CreateSyntaxErrorNode(ParsedTree, "mismatched function: " + PolyFunc);
	}

	public static GtNode TypeFuncObject(GtTypeEnv Gamma, GtSyntaxTree ParsedTree, GtNode FuncNode) {
		/*local*/GtType FuncType = FuncNode.Type;
		/*local*/int FuncParamSize = FuncType.TypeParams.length;
		/*local*/int i = 0;
		while(i < FuncParamSize) {
			if(FuncType.TypeParams[i].IsVarType() || FuncType.TypeParams[i].IsTypeVariable()) {
				return Gamma.CreateSyntaxErrorNode(ParsedTree, "ambigious function: " + FuncType);
			}
			i += 1;
		}
		if(LibGreenTea.ListSize(ParsedTree.SubTreeList) == FuncParamSize) {
			/*local*/ArrayList<GtNode> ParamList = new ArrayList<GtNode>();
			i = 1;
			while(i < FuncParamSize) {
				/*local*/GtNode Node = ParsedTree.TypeCheckAt(i, Gamma, FuncType.TypeParams[i], GreenTeaConsts.DefaultTypeCheckPolicy);
				if(Node.IsErrorNode()) {
					return Node;
				}
				ParamList.add(Node);
				i += 1;
			}
			return Gamma.Generator.CreateApplyFunctionObjectNode(FuncType.TypeParams[0], ParsedTree, FuncNode).AppendNodeList(0, ParamList);
		}
		return Gamma.CreateSyntaxErrorNode(ParsedTree, "mismatched function: " + FuncType);
	}

	public static GtNode TypeFuncCall(GtTypeEnv Gamma, GtSyntaxTree ParsedTree, GtNode FuncNode, GtType ContextType) {
		if(FuncNode.IsConstNode()) {
			/*local*/Object Func = FuncNode.ToConstValue(Gamma.Context, false);
			if(Func instanceof GtType) {  // constructor;
				return KonohaGrammar.TypeNewNode(Gamma, ParsedTree, FuncNode.Token, (/*cast*/GtType)Func, ContextType);
			}
			else if(Func instanceof GtFunc) {
				return KonohaGrammar.TypePolyFuncCall(Gamma, ParsedTree, new GtPolyFunc(null).Append(Gamma.Context, (/*cast*/GtFunc)Func, null));
			}
			else if(Func instanceof GtPolyFunc) {
				return KonohaGrammar.TypePolyFuncCall(Gamma, ParsedTree, (/*cast*/GtPolyFunc)Func);
			}
		}
		if(FuncNode.Type.IsFuncType()) {
			return KonohaGrammar.TypeFuncObject(Gamma, ParsedTree, FuncNode);
		}
		return KonohaGrammar.TypeMethodNameCall(Gamma, ParsedTree, FuncNode, "()", ContextType);
	}

	public static GtSyntaxTree ParseApply(GtNameSpace NameSpace, GtTokenContext TokenContext, GtSyntaxTree LeftTree, GtSyntaxPattern Pattern) {
		/*local*/int ParseFlag = TokenContext.SetSkipIndent(true);
		/*local*/GtSyntaxTree FuncTree = TokenContext.CreateSyntaxTree(NameSpace, Pattern, null);
		FuncTree.SetMatchedTokenAt(GreenTeaConsts.KeyTokenIndex, NameSpace, TokenContext, "(", GreenTeaConsts.Required);
		FuncTree.AppendParsedTree2(LeftTree);
		if(!TokenContext.MatchToken(")")) {
			while(!FuncTree.IsMismatchedOrError()) {
				FuncTree.AppendMatchedPattern(NameSpace, TokenContext, "$Expression$", GreenTeaConsts.Required);
				if(TokenContext.MatchToken(")")) {
					break;
				}
				FuncTree.SetMatchedTokenAt(GreenTeaConsts.NoWhere, NameSpace, TokenContext, ",", GreenTeaConsts.Required);
			}
		}
		TokenContext.SetRememberFlag(ParseFlag);
		return FuncTree;
	}

	public static GtNode TypeApply(GtTypeEnv Gamma, GtSyntaxTree ParsedTree, GtType ContextType) {
		/*local*/GtNode FuncNode = ParsedTree.TypeCheckAt(0, Gamma, GtStaticTable.FuncType, GreenTeaConsts.NoCheckPolicy);
		if(FuncNode.IsErrorNode()) {
			return FuncNode;
		}
		return KonohaGrammar.TypeFuncCall(Gamma, ParsedTree, FuncNode, ContextType);
	}

	public static GtSyntaxTree ParseDefined(GtNameSpace NameSpace, GtTokenContext TokenContext, GtSyntaxTree LeftTree, GtSyntaxPattern Pattern) {
		/*local*/GtSyntaxTree DefinedTree = TokenContext.CreateMatchedSyntaxTree(NameSpace, Pattern, "defined");
		DefinedTree.SetMatchedTokenAt(GreenTeaConsts.NoWhere, NameSpace, TokenContext, "(", GreenTeaConsts.Required);
		DefinedTree.SetMatchedPatternAt(GreenTeaConsts.UnaryTerm, NameSpace, TokenContext, "$Expression$", GreenTeaConsts.Required);
		DefinedTree.SetMatchedTokenAt(GreenTeaConsts.NoWhere, NameSpace, TokenContext, ")", GreenTeaConsts.Required);
		return DefinedTree;
	}

	public static GtNode TypeDefined(GtTypeEnv Gamma, GtSyntaxTree ParsedTree, GtType Type) {
		Gamma.Context.SetNoErrorReport(true);
		/*local*/GtNode ObjectNode = ParsedTree.TypeCheckAt(GreenTeaConsts.UnaryTerm, Gamma, GtStaticTable.VarType, GreenTeaConsts.DefaultTypeCheckPolicy);
		Gamma.Context.SetNoErrorReport(false);
		return Gamma.Generator.CreateConstNode_OLD(GtStaticTable.BooleanType, ParsedTree, (ObjectNode.IsConstNode()));
	}

	public static GtSyntaxTree ParseNot(GtNameSpace NameSpace, GtTokenContext TokenContext, GtSyntaxTree LeftTree, GtSyntaxPattern Pattern) {
		/*local*/GtSyntaxTree Tree = new GtSyntaxTree(Pattern, NameSpace, TokenContext.Next(), null);
		Tree.SetMatchedPatternAt(GreenTeaConsts.UnaryTerm, NameSpace, TokenContext, "$SuffixExpression$", GreenTeaConsts.Required);
		return Tree;
	}

	public static GtNode TypeNot(GtTypeEnv Gamma, GtSyntaxTree ParsedTree, GtType ContextType) {
		/*local*/GtNode ExprNode  = ParsedTree.TypeCheckAt(GreenTeaConsts.UnaryTerm, Gamma, GtStaticTable.BooleanType, GreenTeaConsts.DefaultTypeCheckPolicy);
		if(ExprNode.IsErrorNode()) {
			return ExprNode;
		}
		/*local*/String OperatorSymbol = ParsedTree.KeyToken.ParsedText;
		/*local*/GtPolyFunc PolyFunc = ParsedTree.NameSpace.GetMethod(ExprNode.Type, GreenTeaUtils.FuncSymbol(OperatorSymbol), true);
		/*local*/GtFunc ResolvedFunc = PolyFunc.ResolveUnaryMethod(Gamma, GtStaticTable.BooleanType);
		LibGreenTea.Assert(ResolvedFunc != null);
		GtNode Node = Gamma.Generator.CreateUnaryNode(GtStaticTable.BooleanType, ParsedTree, GreenTeaUtils.FuncSymbol(OperatorSymbol), ExprNode);
		if(Node instanceof GtSymbolNode) {
			((/*cast*/GtSymbolNode)Node).ResolvedFunc = ResolvedFunc;
		}
		return Node;
	}

	public static GtNode TypeAnd(GtTypeEnv Gamma, GtSyntaxTree ParsedTree, GtType ContextType) {
		/*local*/GtNode LeftNode = ParsedTree.TypeCheckAt(GreenTeaConsts.LeftHandTerm, Gamma, GtStaticTable.BooleanType, GreenTeaConsts.DefaultTypeCheckPolicy);
		/*local*/GtNode RightNode = ParsedTree.TypeCheckAt(GreenTeaConsts.RightHandTerm, Gamma, GtStaticTable.BooleanType, GreenTeaConsts.DefaultTypeCheckPolicy);
		return Gamma.Generator.CreateAndNode(GtStaticTable.BooleanType, ParsedTree, LeftNode, RightNode);
	}

	public static GtNode TypeOr(GtTypeEnv Gamma, GtSyntaxTree ParsedTree, GtType ContextType) {
		/*local*/GtNode LeftNode = ParsedTree.TypeCheckAt(GreenTeaConsts.LeftHandTerm, Gamma, GtStaticTable.BooleanType, GreenTeaConsts.DefaultTypeCheckPolicy);
		/*local*/GtNode RightNode = ParsedTree.TypeCheckAt(GreenTeaConsts.RightHandTerm, Gamma, GtStaticTable.BooleanType, GreenTeaConsts.DefaultTypeCheckPolicy);
		return Gamma.Generator.CreateOrNode(GtStaticTable.BooleanType, ParsedTree, LeftNode, RightNode);
	}

	public static GtNode TypeInstanceOf(GtTypeEnv Gamma, GtSyntaxTree ParsedTree, GtType ContextType) {
		/*local*/GtNode LeftNode = ParsedTree.TypeCheckAt(GreenTeaConsts.LeftHandTerm, Gamma, GtStaticTable.VarType, GreenTeaConsts.DefaultTypeCheckPolicy);
		/*local*/GtType GivenType = ParsedTree.GetSyntaxTreeAt(GreenTeaConsts.RightHandTerm).GetParsedType();
		if(GivenType == null) {
			return Gamma.CreateSyntaxErrorNode(ParsedTree,  "type is expected in " + ParsedTree.KeyToken);
		}
		return Gamma.Generator.CreateInstanceOfNode(GtStaticTable.BooleanType, ParsedTree, LeftNode, GivenType);
	}

	public static GtNode TypeAssign(GtTypeEnv Gamma, GtSyntaxTree ParsedTree, GtType ContextType) {
		/*local*/GtNode LeftNode = ParsedTree.TypeCheckAt(GreenTeaConsts.LeftHandTerm, Gamma, GtStaticTable.VarType, GreenTeaConsts.DefaultTypeCheckPolicy);
		if(LeftNode.IsErrorNode()) {
			return LeftNode;
		}
		if(LeftNode instanceof GtGetLocalNode) {
			/*local*/GtGetLocalNode LocalNode = (/*cast*/GtGetLocalNode) LeftNode;
			/*local*/GtNode RightNode = ParsedTree.TypeCheckAt(GreenTeaConsts.RightHandTerm, Gamma, LeftNode.Type, GreenTeaConsts.DefaultTypeCheckPolicy);
			return Gamma.Generator.CreateSetLocalNode(LeftNode.Type, ParsedTree, LocalNode.NativeName, RightNode);
		}
		return Gamma.CreateSyntaxErrorNode(ParsedTree, "the left-hand side of an assignment must be variable");
	}

	public static GtNode TypeSelfAssign(GtTypeEnv Gamma, GtSyntaxTree ParsedTree, GtType ContextType) {
		/*local*/GtNode LeftNode = ParsedTree.TypeCheckAt(GreenTeaConsts.LeftHandTerm, Gamma, GtStaticTable.VarType, GreenTeaConsts.DefaultTypeCheckPolicy);
		if(LeftNode.IsErrorNode()) {
			return LeftNode;
		}
		if(!(LeftNode instanceof GtGetLocalNode || LeftNode instanceof GtGetterNode || LeftNode instanceof GtGetIndexNode)) {
			return Gamma.CreateSyntaxErrorNode(ParsedTree, "the left-hand side of an assignment must be variable");
		}
		/*local*/GtNode RightNode = ParsedTree.TypeCheckAt(GreenTeaConsts.RightHandTerm, Gamma, LeftNode.Type, GreenTeaConsts.DefaultTypeCheckPolicy);
		/*local*/String OperatorSymbol = ParsedTree.KeyToken.ParsedText;
		// "<<=" => "<<"
		OperatorSymbol = OperatorSymbol.substring(0, OperatorSymbol.length() - 1);
		/*local*/GtPolyFunc PolyFunc = ParsedTree.NameSpace.GetMethod(LeftNode.Type, GreenTeaUtils.FuncSymbol(OperatorSymbol), true);
		/*local*/ArrayList<GtNode> ParamList = new ArrayList<GtNode>();
		ParamList.add(LeftNode);
		/*local*/GtResolvedFunc ResolvedFunc = PolyFunc.ResolveFunc(Gamma, ParsedTree, 1, ParamList);
		if(ResolvedFunc.Func != null) {
			LeftNode = ParamList.get(0);
			RightNode = ParamList.get(1);
		}

		return Gamma.Generator.CreateUpdateNode(LeftNode.Type, ParsedTree, ResolvedFunc.Func, LeftNode, RightNode);
	}

	public static GtSyntaxTree ParseIncl(GtNameSpace NameSpace, GtTokenContext TokenContext, GtSyntaxTree LeftTree, GtSyntaxPattern Pattern) {
		/*local*/GtSyntaxTree InclTree = new GtSyntaxTree(Pattern, NameSpace, TokenContext.Next(), null);
		if(LeftTree != null) { /* i++ */
			InclTree.SetSyntaxTreeAt(GreenTeaConsts.UnaryTerm, LeftTree);
		}
		else { /* ++i */
			/*local*/GtSyntaxTree Tree = TokenContext.ParsePattern_OLD(NameSpace, "$Expression$", GreenTeaConsts.Required);
			InclTree.SetSyntaxTreeAt(GreenTeaConsts.UnaryTerm, Tree);
		}
		return InclTree;
	}

	public static GtNode TypeIncl(GtTypeEnv Gamma, GtSyntaxTree ParsedTree, GtType Type) {
		/*local*/GtNode LeftNode = ParsedTree.TypeCheckAt(GreenTeaConsts.UnaryTerm, Gamma, GtStaticTable.VarType, GreenTeaConsts.DefaultTypeCheckPolicy);
		if(LeftNode.Type == GtStaticTable.IntType) {
			if(Type != GtStaticTable.VoidType) {
				Gamma.Context.ReportError(GreenTeaConsts.WarningLevel, ParsedTree.KeyToken, "only available as statement: " + ParsedTree.KeyToken);
			}
			if(LeftNode instanceof GtGetLocalNode || LeftNode instanceof GtGetterNode || LeftNode instanceof GtGetIndexNode) {
				/*local*/GtNode ConstNode = Gamma.Generator.CreateConstNode_OLD(LeftNode.Type, ParsedTree, 1L);
				// ++ => +
				/*local*/String OperatorSymbol = LibGreenTea.SubString(ParsedTree.KeyToken.ParsedText, 0, 1);
				/*local*/GtPolyFunc PolyFunc = ParsedTree.NameSpace.GetMethod(LeftNode.Type, GreenTeaUtils.FuncSymbol(OperatorSymbol), true);
				/*local*/ArrayList<GtNode> ParamList = new ArrayList<GtNode>();
				ParamList.add(LeftNode);
				ParamList.add(ConstNode);
				/*local*/GtResolvedFunc ResolvedFunc = PolyFunc.ResolveFunc(Gamma, ParsedTree, 1, ParamList);
				return Gamma.Generator.CreateUpdateNode(LeftNode.Type, ParsedTree, ResolvedFunc.Func, LeftNode, ConstNode);
			}
			return Gamma.CreateSyntaxErrorNode(ParsedTree, "neither incremental nor decrimental");
		}
		return LeftNode.IsErrorNode() ? LeftNode : KonohaGrammar.TypeUnary(Gamma, ParsedTree, Type);
	}

	public static GtSyntaxTree ParseError(GtNameSpace NameSpace, GtTokenContext TokenContext, GtSyntaxTree LeftTree, GtSyntaxPattern Pattern) {
		return new GtSyntaxTree(Pattern, NameSpace, TokenContext.GetToken(), null);
	}

	public static GtNode TypeError(GtTypeEnv Gamma, GtSyntaxTree ParsedTree, GtType Type) {
		return Gamma.Generator.CreateErrorNode(GtStaticTable.VoidType, ParsedTree);
	}

	public static GtSyntaxTree ParseEmpty(GtNameSpace NameSpace, GtTokenContext TokenContext, GtSyntaxTree LeftTree, GtSyntaxPattern Pattern) {
		return new GtSyntaxTree(Pattern, NameSpace, TokenContext.GetBeforeToken(), null);
	}

	public static GtNode TypeEmpty(GtTypeEnv Gamma, GtSyntaxTree ParsedTree, GtType Type) {
		return Gamma.Generator.CreateEmptyNode(GtStaticTable.VoidType);
	}

	public static GtSyntaxTree ParseSemiColon(GtNameSpace NameSpace, GtTokenContext TokenContext, GtSyntaxTree LeftTree, GtSyntaxPattern Pattern) {
		if(TokenContext.IsAllowedBackTrack()) {
			return null;
		}
		else {
			return TokenContext.ReportTokenError2(TokenContext.GetToken(), "unexpected ;", false);
		}
	}

	public static GtSyntaxTree ParseRequire(GtNameSpace NameSpace, GtTokenContext TokenContext, GtSyntaxTree LeftTree, GtSyntaxPattern Pattern) {
		TokenContext.Next(); // skipped first token "require";
		while(TokenContext.HasNext()) {
			/*local*/GtToken Token = TokenContext.Next();
			if(Token.IsIndent() || Token.IsDelim()) {
				break;
			}
			if(Token.IsNameSymbol()) {
				if(!NameSpace.LoadRequiredLib(Token.ParsedText)) {
					return TokenContext.NewErrorSyntaxTree(Token, "failed to load required library: " + Token.ParsedText);
				}
			}
			if(TokenContext.MatchToken(",")) {
				continue;
			}
		}
		return KonohaGrammar.ParseEmpty(NameSpace, TokenContext, LeftTree, Pattern);
	}

	private static String ParseJoinedName(GtTokenContext TokenContext) {
		/*local*/GtToken Token = TokenContext.Next();
		/*local*/String PackageName = LibGreenTea.UnquoteString(Token.ParsedText);
		while(TokenContext.HasNext()) {
			Token = TokenContext.Next();
			if(Token.IsNameSymbol() || LibGreenTea.EqualsString(Token.ParsedText, ".")) {
				PackageName += Token.ParsedText;
				continue;
			}
			break;
		}
		return PackageName;
	}

	public static GtSyntaxTree ParseImport(GtNameSpace NameSpace, GtTokenContext TokenContext, GtSyntaxTree LeftTree, GtSyntaxPattern Pattern) {
		/*local*/GtSyntaxTree ImportTree = TokenContext.CreateMatchedSyntaxTree(NameSpace, Pattern, "import");
		/*local*/String PackageName = KonohaGrammar.ParseJoinedName(TokenContext);
		ImportTree.ParsedValue = PackageName;
		return ImportTree;
	}

	public static GtNode TypeImport(GtTypeEnv Gamma, GtSyntaxTree ParsedTree, GtType Type) {
		/*local*/Object Value = LibNative.ImportNativeObject(Gamma.NameSpace, (/*cast*/String)ParsedTree.ParsedValue);
		if(Value == null) {
			return Gamma.CreateSyntaxErrorNode(ParsedTree, "cannot import: " + ParsedTree.ParsedValue);
		}
		return Gamma.Generator.CreateConstNode_OLD(GtStaticTable.GuessType(Value), ParsedTree, Value);
	}

	public static GtSyntaxTree ParseBlock(GtNameSpace ParentNameSpace, GtTokenContext TokenContext, GtSyntaxTree LeftTree, GtSyntaxPattern Pattern) {
		if(TokenContext.MatchToken("{")) {
			/*local*/GtSyntaxTree PrevTree = null;
			/*local*/GtNameSpace NameSpace = ParentNameSpace.CreateSubNameSpace();
			while(TokenContext.HasNext()) {
				TokenContext.SkipEmptyStatement();
				if(TokenContext.MatchToken("}")) {
					break;
				}
				/*local*/GtMap Annotation = TokenContext.SkipAndGetAnnotation(true);
				/*local*/GtSyntaxTree ParsedTree = TokenContext.ParsePattern_OLD(NameSpace, "$Expression$", GreenTeaConsts.Required);
				if(GreenTeaUtils.IsMismatchedOrError(ParsedTree)) {
					return ParsedTree;
				}
				ParsedTree.SetAnnotation(Annotation);
				//PrevTree = GtStatic.TreeTail(GtStatic.LinkTree(PrevTree, GtStatic.TreeHead(CurrentTree)));
				if(ParsedTree.PrevTree != null) {
					ParsedTree = GreenTeaUtils.TreeHead(ParsedTree);
				}
				PrevTree = GreenTeaUtils.LinkTree(PrevTree, ParsedTree);
				TokenContext.SkipIncompleteStatement();  // check; and skip empty statement
			}
			if(PrevTree == null) {
				return TokenContext.ParsePattern_OLD(NameSpace, "$Empty$", GreenTeaConsts.Required);
			}
			return GreenTeaUtils.TreeHead(PrevTree);
		}
		return null;
	}

	public static GtSyntaxTree ParseStatement(GtNameSpace NameSpace, GtTokenContext TokenContext, GtSyntaxTree LeftTree, GtSyntaxPattern Pattern) {
		/*local*/GtSyntaxTree StmtTree = TokenContext.ParsePattern_OLD(NameSpace, "$Block$", GreenTeaConsts.Optional);
		if(StmtTree == null) {
			StmtTree = TokenContext.ParsePattern_OLD(NameSpace, "$Expression$", GreenTeaConsts.Optional);
		}
		if(StmtTree == null) {
			StmtTree = TokenContext.ParsePattern_OLD(NameSpace, "$Empty$", GreenTeaConsts.Required);
		}
		return StmtTree;
	}

	// If Statement
	public static GtSyntaxTree ParseIf(GtNameSpace NameSpace, GtTokenContext TokenContext, GtSyntaxTree LeftTree, GtSyntaxPattern Pattern) {
		/*local*/GtSyntaxTree NewTree = TokenContext.CreateMatchedSyntaxTree(NameSpace, Pattern, "if");
		NewTree.SetMatchedTokenAt(GreenTeaConsts.NoWhere, NameSpace, TokenContext, "(", GreenTeaConsts.Required | GreenTeaConsts.OpenSkipIndent);
		NewTree.SetMatchedPatternAt(GreenTeaConsts.IfCond, NameSpace, TokenContext, "$Expression$", GreenTeaConsts.Required);
		NewTree.SetMatchedTokenAt(GreenTeaConsts.NoWhere, NameSpace, TokenContext, ")", GreenTeaConsts.Required | GreenTeaConsts.CloseSkipIndent);
		NewTree.SetMatchedPatternAt(GreenTeaConsts.IfThen, NameSpace, TokenContext, "$Statement$", GreenTeaConsts.AllowLineFeed | GreenTeaConsts.Required);
		TokenContext.SkipEmptyStatement();
		if(TokenContext.MatchToken2("else", GreenTeaConsts.AllowLineFeed)) {
			NewTree.SetMatchedPatternAt(GreenTeaConsts.IfElse, NameSpace, TokenContext, "$Statement$", GreenTeaConsts.AllowLineFeed | GreenTeaConsts.Required);
		}
		return NewTree;
	}

	public static GtNode TypeIf(GtTypeEnv Gamma, GtSyntaxTree ParsedTree, GtType ContextType) {
		/*local*/GtNode CondNode = ParsedTree.TypeCheckAt(GreenTeaConsts.IfCond, Gamma, GtStaticTable.BooleanType, GreenTeaConsts.DefaultTypeCheckPolicy);
		/*local*/GtNode ThenNode = ParsedTree.TypeCheckAt(GreenTeaConsts.IfThen, Gamma, GtStaticTable.VoidType, GreenTeaConsts.DefaultTypeCheckPolicy);
		/*local*/GtNode ElseNode = ParsedTree.TypeCheckAt(GreenTeaConsts.IfElse, Gamma, GtStaticTable.VoidType, GreenTeaConsts.DefaultTypeCheckPolicy);
		if(ThenNode.HasReturnNode() && ElseNode != null && ElseNode.HasReturnNode()) {
			ParsedTree.NextTree = null;
		}
		return Gamma.Generator.CreateIfNode(ThenNode.Type, ParsedTree, CondNode, ThenNode, ElseNode);
	}

	// While Statement
	public static GtSyntaxTree ParseWhile(GtNameSpace NameSpace, GtTokenContext TokenContext, GtSyntaxTree LeftTree, GtSyntaxPattern Pattern) {
		/*local*/GtSyntaxTree WhileTree = TokenContext.CreateMatchedSyntaxTree(NameSpace, Pattern, "while");
		WhileTree.SetMatchedTokenAt(GreenTeaConsts.NoWhere, NameSpace, TokenContext, "(", GreenTeaConsts.Required | GreenTeaConsts.OpenSkipIndent);
		WhileTree.SetMatchedPatternAt(GreenTeaConsts.WhileCond, NameSpace, TokenContext, "$Expression$", GreenTeaConsts.Required);
		WhileTree.SetMatchedTokenAt(GreenTeaConsts.NoWhere, NameSpace, TokenContext, ")", GreenTeaConsts.Required | GreenTeaConsts.CloseSkipIndent);
		WhileTree.SetMatchedPatternAt(GreenTeaConsts.WhileBody, NameSpace, TokenContext, "$Statement$", GreenTeaConsts.Required);
		return WhileTree;
	}

	public static GtNode TypeWhile(GtTypeEnv Gamma, GtSyntaxTree ParsedTree, GtType ContextType) {
		/*local*/GtNode CondNode = ParsedTree.TypeCheckAt(GreenTeaConsts.WhileCond, Gamma, GtStaticTable.BooleanType, GreenTeaConsts.DefaultTypeCheckPolicy);
		/*local*/GtNode BodyNode =  ParsedTree.TypeCheckAt(GreenTeaConsts.WhileBody, Gamma, GtStaticTable.VoidType, GreenTeaConsts.DefaultTypeCheckPolicy);
		return Gamma.Generator.CreateWhileNode(BodyNode.Type, ParsedTree, CondNode, BodyNode);
	}

	// DoWhile Statement
	public static GtSyntaxTree ParseDoWhile(GtNameSpace NameSpace, GtTokenContext TokenContext, GtSyntaxTree LeftTree, GtSyntaxPattern Pattern) {
		/*local*/GtSyntaxTree Tree = TokenContext.CreateMatchedSyntaxTree(NameSpace, Pattern, "do");
		Tree.SetMatchedPatternAt(GreenTeaConsts.WhileBody, NameSpace, TokenContext, "$Statement$", GreenTeaConsts.Required);
		Tree.SetMatchedTokenAt(GreenTeaConsts.NoWhere, NameSpace, TokenContext, "while", GreenTeaConsts.Required);
		Tree.SetMatchedTokenAt(GreenTeaConsts.NoWhere, NameSpace, TokenContext, "(", GreenTeaConsts.Required | GreenTeaConsts.OpenSkipIndent);
		Tree.SetMatchedPatternAt(GreenTeaConsts.WhileCond, NameSpace, TokenContext, "$Expression$", GreenTeaConsts.Required);
		Tree.SetMatchedTokenAt(GreenTeaConsts.NoWhere, NameSpace, TokenContext, ")", GreenTeaConsts.Required | GreenTeaConsts.CloseSkipIndent);
		return Tree;
	}

	public static GtNode TypeDoWhile(GtTypeEnv Gamma, GtSyntaxTree ParsedTree, GtType ContextType) {
		/*local*/GtNode CondNode = ParsedTree.TypeCheckAt(GreenTeaConsts.WhileCond, Gamma, GtStaticTable.BooleanType, GreenTeaConsts.DefaultTypeCheckPolicy);
		/*local*/GtNode BodyNode =  ParsedTree.TypeCheckAt(GreenTeaConsts.WhileBody, Gamma, GtStaticTable.VoidType, GreenTeaConsts.DefaultTypeCheckPolicy);
		return Gamma.Generator.CreateDoWhileNode(BodyNode.Type, ParsedTree, CondNode, BodyNode);
	}

	// For Statement
	public static GtSyntaxTree ParseFor(GtNameSpace NameSpace, GtTokenContext TokenContext, GtSyntaxTree LeftTree, GtSyntaxPattern Pattern) {
		/*local*/GtSyntaxTree Tree = TokenContext.CreateMatchedSyntaxTree(NameSpace, Pattern, "for");
		Tree.SetMatchedTokenAt(GreenTeaConsts.NoWhere, NameSpace, TokenContext, "(", GreenTeaConsts.Required | GreenTeaConsts.OpenSkipIndent);
		Tree.SetMatchedPatternAt(GreenTeaConsts.ForInit, NameSpace, TokenContext, "$Expression$", GreenTeaConsts.Optional);
		Tree.SetMatchedTokenAt(GreenTeaConsts.NoWhere, NameSpace, TokenContext, ";", GreenTeaConsts.Required);
		Tree.SetMatchedPatternAt(GreenTeaConsts.ForCond, NameSpace, TokenContext, "$Expression$", GreenTeaConsts.Optional);
		Tree.SetMatchedTokenAt(GreenTeaConsts.NoWhere, NameSpace, TokenContext, ";", GreenTeaConsts.Required);
		Tree.SetMatchedPatternAt(GreenTeaConsts.ForIteration, NameSpace, TokenContext, "$Expression$", GreenTeaConsts.Optional);
		Tree.SetMatchedTokenAt(GreenTeaConsts.NoWhere, NameSpace, TokenContext, ")", GreenTeaConsts.Required | GreenTeaConsts.CloseSkipIndent);
		Tree.SetMatchedPatternAt(GreenTeaConsts.ForBody, NameSpace, TokenContext, "$Statement$", GreenTeaConsts.Required);
		return Tree;
	}

	public static GtNode TypeFor(GtTypeEnv Gamma, GtSyntaxTree ParsedTree, GtType ContextType) {
		/*local*/GtNode InitNode = null;
		/*local*/GtNode CondNode = null;
		/*local*/GtNode IterNode = null;
		if(ParsedTree.HasNodeAt(GreenTeaConsts.ForInit)) {
			InitNode =  ParsedTree.TypeCheckAt(GreenTeaConsts.ForInit, Gamma, GtStaticTable.VarType, GreenTeaConsts.DefaultTypeCheckPolicy);
		}
		if(ParsedTree.HasNodeAt(GreenTeaConsts.ForCond)) {
			CondNode =  ParsedTree.TypeCheckAt(GreenTeaConsts.ForCond, Gamma, GtStaticTable.BooleanType, GreenTeaConsts.DefaultTypeCheckPolicy);
		}
		if(ParsedTree.HasNodeAt(GreenTeaConsts.ForIteration)) {
			IterNode =  ParsedTree.TypeCheckAt(GreenTeaConsts.ForIteration, Gamma, GtStaticTable.VarType, GreenTeaConsts.DefaultTypeCheckPolicy);
		}
		/*local*/GtNode BodyNode =  ParsedTree.TypeCheckAt(GreenTeaConsts.ForBody, Gamma, GtStaticTable.VoidType, GreenTeaConsts.DefaultTypeCheckPolicy);
		/*local*/GtNode ForNode = Gamma.Generator.CreateForNode(BodyNode.Type, ParsedTree, CondNode, IterNode, BodyNode);
		if(InitNode != null) {
			if(InitNode instanceof GtVarDeclNode) {
				((/*cast*/GtVarDeclNode)InitNode).BlockNode = ForNode;
			}
			else {
				InitNode = GreenTeaUtils.LinkNode(InitNode, ForNode);
			}
			return InitNode;
		}
		return ForNode;
	}

	// ForEach Statement
	public static GtSyntaxTree ParseForEach(GtNameSpace NameSpace, GtTokenContext TokenContext, GtSyntaxTree LeftTree, GtSyntaxPattern Pattern) {
		/*local*/GtSyntaxTree Tree = TokenContext.CreateMatchedSyntaxTree(NameSpace, Pattern, "for");
		Tree.SetMatchedTokenAt(GreenTeaConsts.NoWhere, NameSpace, TokenContext, "(", GreenTeaConsts.Required | GreenTeaConsts.OpenSkipIndent);
		Tree.SetMatchedPatternAt(GreenTeaConsts.ForEachType, NameSpace, TokenContext, "$Type$", GreenTeaConsts.Optional);
		Tree.SetMatchedPatternAt(GreenTeaConsts.ForEachName, NameSpace, TokenContext, "$Variable$", GreenTeaConsts.Required);
		Tree.SetMatchedTokenAt(GreenTeaConsts.NoWhere, NameSpace, TokenContext, "in", GreenTeaConsts.Required);
		Tree.SetMatchedPatternAt(GreenTeaConsts.ForEachIter, NameSpace, TokenContext, "$Expression$", GreenTeaConsts.Required);
		Tree.SetMatchedTokenAt(GreenTeaConsts.NoWhere, NameSpace, TokenContext, ")", GreenTeaConsts.Required | GreenTeaConsts.CloseSkipIndent);
		Tree.SetMatchedPatternAt(GreenTeaConsts.ForEachBody, NameSpace, TokenContext, "$Statement$", GreenTeaConsts.Required);
		return Tree;
	}

	public static GtNode TypeForEach(GtTypeEnv Gamma, GtSyntaxTree ParsedTree, GtType ContextType) {
		/*local*/GtNode IterNode =  ParsedTree.TypeCheckAt(GreenTeaConsts.ForEachIter, Gamma, GtStaticTable.VarType, GreenTeaConsts.DefaultTypeCheckPolicy);
		if(IterNode.IsErrorNode()) {
			return IterNode;
		}
		if(!IterNode.Type.IsIteratorType()) {
			/*local*/GtPolyFunc PolyFunc = Gamma.NameSpace.GetMethod(IterNode.Type, GreenTeaUtils.FuncSymbol(".."), true);
			/*local*/GtFunc Func = PolyFunc.ResolveUnaryMethod(Gamma, IterNode.Type);
			if(Func == null) {
				return Gamma.CreateSyntaxErrorNode(ParsedTree, "for/in takes an iterator, but given = " + IterNode.Type);
			}
			Gamma.CheckFunc("operator", Func, ParsedTree.KeyToken);
			GtNode ApplyNode = Gamma.Generator.CreateApplySymbolNode(Func.GetReturnType(), ParsedTree, GreenTeaUtils.FuncSymbol(".."), Func);
			ApplyNode.Append(IterNode);
			IterNode = ApplyNode;
		}
		/*local*/GtVariableInfo VarInfo = null;
		/*local*/String VarName = ParsedTree.GetSyntaxTreeAt(GreenTeaConsts.ForEachName).KeyToken.ParsedText;
		/*local*/GtType VarType = null;
		if(ParsedTree.HasNodeAt(GreenTeaConsts.ForEachType)) {
			VarType = ParsedTree.GetSyntaxTreeAt(GreenTeaConsts.ForEachType).GetParsedType();
			if(VarType.IsVarType()) {
				VarType = IterNode.Type.TypeParams[0];
				Gamma.ReportTypeInference(ParsedTree.GetSyntaxTreeAt(GreenTeaConsts.ForEachName).KeyToken, VarName, VarType);
			}
			VarInfo = Gamma.AppendDeclaredVariable(0, VarType, VarName, null, null);
		}
		else {
			/*local*/GtVariableInfo VarDefInfo = Gamma.LookupDeclaredVariable(VarName);
			if(VarDefInfo == null) {
				return Gamma.CreateSyntaxErrorNode(ParsedTree, "undefined symbol: " + VarName);
			}
			VarType = VarDefInfo.Type;
		}
		if(IterNode.Type.TypeParams[0] != VarType) {
			return Gamma.CreateSyntaxErrorNode(ParsedTree, "mismatched iterator: " + VarType + " " + VarName + " in " + IterNode.Type);
		}
		/*local*/GtVariableInfo VarIterInfo = Gamma.AppendDeclaredVariable(0, IterNode.Type, "iter", null, null);
		/*local*/GtNode WhileNode = Gamma.ParseTypedNode("while(iter.hasHext()) { " + VarName + " = iter.next(); }", ParsedTree.KeyToken.FileLine, GtStaticTable.VoidType);
		if(!WhileNode.IsErrorNode()) {
			/*local*/GtNode BodyNode =  ParsedTree.TypeCheckAt(GreenTeaConsts.ForEachBody, Gamma, GtStaticTable.VoidType, GreenTeaConsts.DefaultTypeCheckPolicy);
			/*local*/GtWhileNode WhileNode2 = (/*cast*/GtWhileNode)WhileNode;
			GreenTeaUtils.LinkNode(WhileNode2.BodyNode, BodyNode);
		}
		/*local*/GtNode Node = Gamma.Generator.CreateVarDeclNode(IterNode.Type, ParsedTree, IterNode.Type, VarIterInfo.NativeName, IterNode, WhileNode);
		if(VarInfo != null) {
			Node = Gamma.Generator.CreateVarDeclNode(VarInfo.Type, ParsedTree, VarInfo.Type, VarInfo.NativeName, Gamma.CreateDefaultValue(ParsedTree, VarInfo.Type), Node);
		}
		return Node;
	}

	// Break/Continue Statement
	public static GtSyntaxTree ParseBreak(GtNameSpace NameSpace, GtTokenContext TokenContext, GtSyntaxTree LeftTree, GtSyntaxPattern Pattern) {
		return TokenContext.CreateMatchedSyntaxTree(NameSpace, Pattern, "break");
	}

	public static GtNode TypeBreak(GtTypeEnv Gamma, GtSyntaxTree ParsedTree, GtType ContextType) {
		return Gamma.Generator.CreateBreakNode(GtStaticTable.VoidType, ParsedTree, "");
	}

	public static GtSyntaxTree ParseContinue(GtNameSpace NameSpace, GtTokenContext TokenContext, GtSyntaxTree LeftTree, GtSyntaxPattern Pattern) {
		return TokenContext.CreateMatchedSyntaxTree(NameSpace, Pattern, "continue");
	}

	public static GtNode TypeContinue(GtTypeEnv Gamma, GtSyntaxTree ParsedTree, GtType ContextType) {
		return Gamma.Generator.CreateContinueNode(GtStaticTable.VoidType, ParsedTree, "");
	}

	// Return Statement
	public static GtSyntaxTree ParseReturn(GtNameSpace NameSpace, GtTokenContext TokenContext, GtSyntaxTree LeftTree, GtSyntaxPattern Pattern) {
		/*local*/GtSyntaxTree ReturnTree = TokenContext.CreateMatchedSyntaxTree(NameSpace, Pattern, "return");
		ReturnTree.SetMatchedPatternAt(GreenTeaConsts.ReturnExpr, NameSpace, TokenContext, "$Expression$", GreenTeaConsts.Optional);
		return ReturnTree;
	}

	public static GtNode TypeReturn(GtTypeEnv Gamma, GtSyntaxTree ParsedTree, GtType ContextType) {
		ParsedTree.NextTree = null; // stop typing of next trees
		if(Gamma.IsTopLevel()) {
			return Gamma.UnsupportedTopLevelError(ParsedTree);
		}
		/*local*/GtType ReturnType = Gamma.FuncBlock.DefinedFunc.GetReturnType();
		if(ParsedTree.HasNodeAt(GreenTeaConsts.ReturnExpr)) {
			/*local*/GtNode Expr = ParsedTree.TypeCheckAt(GreenTeaConsts.ReturnExpr, Gamma, ReturnType, GreenTeaConsts.DefaultTypeCheckPolicy);
			if(ReturnType.IsVarType() && !Expr.IsErrorNode()) {
				Gamma.FuncBlock.DefinedFunc.Types[0] = Expr.Type;
				Gamma.ReportTypeInference(ParsedTree.KeyToken, "return value of " + Gamma.FuncBlock.DefinedFunc.FuncName, Expr.Type);
			}
			if(ReturnType.IsVoidType()) {
				Gamma.Context.ReportError(GreenTeaConsts.WarningLevel, ParsedTree.KeyToken, "ignored return value");
				return Gamma.Generator.CreateReturnNode(ReturnType, ParsedTree, null);
			}
			return Gamma.Generator.CreateReturnNode(Expr.Type, ParsedTree, Expr);
		}
		else {
			if(ReturnType.IsVarType()) {
				Gamma.FuncBlock.DefinedFunc.Types[0] = GtStaticTable.VoidType;
				Gamma.ReportTypeInference(ParsedTree.KeyToken, "return value of " + Gamma.FuncBlock.DefinedFunc.FuncName, GtStaticTable.VoidType);
			}
			if(Gamma.FuncBlock.DefinedFunc.Is(GreenTeaConsts.ConstructorFunc)) {
				/*local*/GtNode ThisNode = Gamma.CreateLocalNode(ParsedTree, Gamma.Generator.GetRecvName());
				return Gamma.Generator.CreateReturnNode(ThisNode.Type, ParsedTree, ThisNode);
			}
			if(!ReturnType.IsVoidType()) {
				Gamma.Context.ReportError(GreenTeaConsts.WarningLevel, ParsedTree.KeyToken, "returning default value of " + ReturnType);
				return Gamma.Generator.CreateReturnNode(ReturnType, ParsedTree, Gamma.CreateDefaultValue(ParsedTree, ReturnType));
			}
			return Gamma.Generator.CreateReturnNode(ReturnType, ParsedTree, null);
		}
	}

	// try
	public static GtSyntaxTree ParseTry(GtNameSpace NameSpace, GtTokenContext TokenContext, GtSyntaxTree LeftTree, GtSyntaxPattern Pattern) {
		/*local*/GtSyntaxTree TryTree = TokenContext.CreateMatchedSyntaxTree(NameSpace, Pattern, "try");
		TryTree.SetMatchedPatternAt(GreenTeaConsts.TryBody, NameSpace, TokenContext, "$Block$", GreenTeaConsts.Required);
		TokenContext.SkipEmptyStatement();
		if(TokenContext.MatchToken("catch")) {
			TryTree.SetMatchedTokenAt(GreenTeaConsts.NoWhere, NameSpace, TokenContext, "(", GreenTeaConsts.Required | GreenTeaConsts.OpenSkipIndent);
			TryTree.SetMatchedPatternAt(GreenTeaConsts.CatchVariable, NameSpace, TokenContext, "$VarDecl$", GreenTeaConsts.Required);
			TryTree.SetMatchedTokenAt(GreenTeaConsts.NoWhere, NameSpace, TokenContext, ")", GreenTeaConsts.Required | GreenTeaConsts.CloseSkipIndent);
			TryTree.SetMatchedPatternAt(GreenTeaConsts.CatchBody, NameSpace, TokenContext, "$Block$", GreenTeaConsts.Required);
		}
		TokenContext.SkipEmptyStatement();
		if(TokenContext.MatchToken("finally")) {
			TryTree.SetMatchedPatternAt(GreenTeaConsts.FinallyBody, NameSpace, TokenContext, "$Block$", GreenTeaConsts.Required);
		}
		return TryTree;
	}

	public static GtNode TypeTry(GtTypeEnv Gamma, GtSyntaxTree ParsedTree, GtType ContextType) {
		/*local*/GtNode TryNode = ParsedTree.TypeCheckAt(GreenTeaConsts.TryBody, Gamma, GtStaticTable.VoidType, GreenTeaConsts.DefaultTypeCheckPolicy);
		/*local*/GtNode FinallyNode = ParsedTree.TypeCheckAt(GreenTeaConsts.FinallyBody, Gamma, GtStaticTable.VoidType, GreenTeaConsts.DefaultTypeCheckPolicy);
		GtNode Node = Gamma.Generator.CreateTryNode(TryNode.Type, ParsedTree, TryNode, FinallyNode);
		if(ParsedTree.HasNodeAt(GreenTeaConsts.CatchVariable)) {
			GtSyntaxTree CatchTree = ParsedTree.GetSyntaxTreeAt(GreenTeaConsts.CatchVariable);
			/*local*/String CatchName = CatchTree.GetSyntaxTreeAt(GreenTeaConsts.VarDeclName).KeyToken.ParsedText;
			/*local*/GtType CatchType = CatchTree.GetSyntaxTreeAt(GreenTeaConsts.VarDeclType).GetParsedType();
			//FIXME we need to add CatchName into LocalVariable
			/*local*/GtNode BodyNode = ParsedTree.TypeCheckAt(GreenTeaConsts.CatchBody, Gamma, GtStaticTable.VoidType, GreenTeaConsts.DefaultTypeCheckPolicy);
			Node.Append(Gamma.Generator.CreateCatchNode(GtStaticTable.VoidType, ParsedTree, CatchType, CatchName, BodyNode));
		}
		return Node;
	}

	// throw $Expr$
	public static GtSyntaxTree ParseThrow(GtNameSpace NameSpace, GtTokenContext TokenContext, GtSyntaxTree LeftTree, GtSyntaxPattern Pattern) {
		/*local*/GtSyntaxTree ThrowTree = TokenContext.CreateMatchedSyntaxTree(NameSpace, Pattern, "throw");
		ThrowTree.SetMatchedPatternAt(GreenTeaConsts.ReturnExpr, NameSpace, TokenContext, "$Expression$", GreenTeaConsts.Required);
		return ThrowTree;
	}

	public static GtNode TypeThrow(GtTypeEnv Gamma, GtSyntaxTree ParsedTree, GtType ContextType) {
		ParsedTree.NextTree = null;
		/*local*/GtType FaultType = ContextType; // FIXME Gamma.FaultType;
		/*local*/GtNode ExprNode = ParsedTree.TypeCheckAt(GreenTeaConsts.ReturnExpr, Gamma, FaultType, GreenTeaConsts.DefaultTypeCheckPolicy);
		return Gamma.Generator.CreateThrowNode(ExprNode.Type, ParsedTree, ExprNode);
	}

	public static GtSyntaxTree ParseThis(GtNameSpace NameSpace, GtTokenContext TokenContext, GtSyntaxTree LeftTree, GtSyntaxPattern Pattern) {
		return TokenContext.CreateMatchedSyntaxTree(NameSpace, Pattern, "this");
	}

	public static GtNode TypeThis(GtTypeEnv Gamma, GtSyntaxTree ParsedTree, GtType ContextType) {
		return Gamma.CreateLocalNode(ParsedTree, Gamma.Generator.GetRecvName());
	}

	public static GtSyntaxTree ParseLine(GtNameSpace NameSpace, GtTokenContext TokenContext, GtSyntaxTree LeftTree, GtSyntaxPattern Pattern) {
		return TokenContext.CreateMatchedSyntaxTree(NameSpace, Pattern, "__line__");
	}

	public static GtNode TypeLine(GtTypeEnv Gamma, GtSyntaxTree ParsedTree, GtType ContextType) {
		return Gamma.Generator.CreateConstNode_OLD(GtStaticTable.StringType, ParsedTree, GtStaticTable.FormatFileLineNumber(ParsedTree.KeyToken.FileLine));
	}

	public static GtSyntaxTree ParseSymbols(GtNameSpace NameSpace, GtTokenContext TokenContext, GtSyntaxTree LeftTree, GtSyntaxPattern Pattern) {
		return TokenContext.CreateMatchedSyntaxTree(NameSpace, Pattern, "__").ToConstTree(NameSpace);
	}

	public static GtSyntaxTree ParseSuper(GtNameSpace NameSpace, GtTokenContext TokenContext, GtSyntaxTree LeftTree, GtSyntaxPattern Pattern) {
		/*local*/GtSyntaxTree Tree = TokenContext.CreateMatchedSyntaxTree(NameSpace, Pattern, "super");
//		/*local*/int ParseFlag = TokenContext.SetSkipIndent(true);
//		Tree.SetSyntaxTreeAt(0, new GtSyntaxTree(NameSpace.GetSyntaxPattern("$Variable$"), NameSpace, Token, null));
//		Tree.SetSyntaxTreeAt(1,  new GtSyntaxTree(NameSpace.GetSyntaxPattern("this"), NameSpace, new GtToken("this", 0), null));
//		TokenContext.MatchToken("(");
//		if(!TokenContext.MatchToken(")")) {
//			while(!Tree.IsMismatchedOrError()) {
//				Tree.AppendMatchedPattern(NameSpace, TokenContext, "$Expression$", Required);
//				if(TokenContext.MatchToken(")")) {
//					break;
//				}
//				Tree.SetMatchedTokenAt(NoWhere, NameSpace, TokenContext, ",", Required);
//			}
//		}
//		TokenContext.ParseFlag = ParseFlag;
//		if(!Tree.IsMismatchedOrError()) {
//			// translate '$super$(this, $Params$)' => 'super(this, $Params$)'
//			Tree.Pattern = NameSpace.GetExtendedSyntaxPattern("(");
//			return Tree;
//		}
		return Tree;
	}

	// new $Type ( $Expr$ [, $Expr$] )
	public static GtSyntaxTree ParseNew(GtNameSpace NameSpace, GtTokenContext TokenContext, GtSyntaxTree LeftTree, GtSyntaxPattern Pattern) {
		/*local*/GtSyntaxTree NewTree = TokenContext.CreateMatchedSyntaxTree(NameSpace, Pattern, "new");
		NewTree.SetMatchedPatternAt(0, NameSpace, TokenContext, "$Type$", GreenTeaConsts.Optional);
		if(!NewTree.HasNodeAt(0)) {
			NewTree.SetSyntaxTreeAt(0, NewTree.CreateConstTree(GtStaticTable.VarType)); // TODO
		}
		/*local*/int ParseFlag = TokenContext.SetSkipIndent(true);
		NewTree.SetMatchedTokenAt(GreenTeaConsts.NoWhere, NameSpace, TokenContext, "(", GreenTeaConsts.Required);
		if(!TokenContext.MatchToken(")")) {
			while(!NewTree.IsMismatchedOrError()) {
				NewTree.AppendMatchedPattern(NameSpace, TokenContext, "$Expression$", GreenTeaConsts.Required);
				if(TokenContext.MatchToken(")")) {
					break;
				}
				NewTree.SetMatchedTokenAt(GreenTeaConsts.NoWhere, NameSpace, TokenContext, ",", GreenTeaConsts.Required);
			}
		}
		TokenContext.SetRememberFlag(ParseFlag);
		return NewTree;
	}

	// switch
	public static GtSyntaxTree ParseEnum(GtNameSpace NameSpace, GtTokenContext TokenContext, GtSyntaxTree LeftTree, GtSyntaxPattern Pattern) {
		/*local*/String EnumTypeName = null;
		/*local*/GtType NewEnumType = null;
		/*local*/GtMap EnumMap = new GtMap();
		/*local*/GtSyntaxTree EnumTree = TokenContext.CreateMatchedSyntaxTree(NameSpace, Pattern, "enum");
		EnumTree.SetMatchedPatternAt(GreenTeaConsts.EnumNameTreeIndex, NameSpace, TokenContext, "$FuncName$", GreenTeaConsts.Required);  // $ClassName$ is better
		if(!EnumTree.IsMismatchedOrError()) {
			EnumTypeName = EnumTree.GetSyntaxTreeAt(GreenTeaConsts.EnumNameTreeIndex).KeyToken.ParsedText;
			NewEnumType = GtStaticTable.EnumBaseType.CreateSubType(GreenTeaConsts.EnumType, EnumTypeName, null, EnumMap);
		}
		EnumTree.SetMatchedTokenAt(GreenTeaConsts.NoWhere, NameSpace, TokenContext, "{", GreenTeaConsts.Required);
		/*local*/int EnumValue = 0;
		/*local*/ArrayList<GtToken> NameList = new ArrayList<GtToken>();
		while(!EnumTree.IsMismatchedOrError()) {
			TokenContext.SkipIndent();
			if(TokenContext.MatchToken(",")) {
				continue;
			}
			if(TokenContext.MatchToken("}")) {
				break;
			}
			/*local*/GtToken Token = TokenContext.Next();
			if(LibGreenTea.IsVariableName(Token.ParsedText, 0)) {
				if(EnumMap.GetOrNull(Token.ParsedText) != null) {
					NameSpace.Context.ReportError(GreenTeaConsts.ErrorLevel, Token, "duplicated name: " + Token.ParsedText);
					continue;
				}
				NameList.add(Token);
				EnumMap.put(Token.ParsedText, new GreenTeaEnum(NewEnumType, EnumValue, Token.ParsedText));
				EnumValue += 1;
				continue;
			}
		}
		if(!EnumTree.IsMismatchedOrError()) {
			/*local*/GtNameSpace StoreNameSpace = NameSpace.GetNameSpace(KonohaGrammar.ParseNameSpaceFlag(0, TokenContext.ParsingAnnotation));
			StoreNameSpace.AppendTypeName(NewEnumType, EnumTree.GetSyntaxTreeAt(GreenTeaConsts.EnumNameTreeIndex).KeyToken);
			/*local*/int i = 0;
			while(i < LibGreenTea.ListSize(NameList)) {
				/*local*/String Key = NameList.get(i).ParsedText;
				StoreNameSpace.SetSymbol(GreenTeaUtils.ClassStaticSymbol(NewEnumType, Key), EnumMap.GetOrNull(Key), NameList.get(i));
				i = i + 1;
			}
			EnumTree.ParsedValue = NewEnumType;
		}
		return EnumTree;
	}

	public static GtNode TypeEnum(GtTypeEnv Gamma, GtSyntaxTree ParsedTree, GtType ContextType) {
		/*local*/Object EnumType = ParsedTree.ParsedValue;
		return Gamma.Generator.CreateConstNode_OLD(GtStaticTable.GuessType(EnumType), ParsedTree, EnumType);
	}

	public static GtSyntaxTree ParseCaseBlock(GtNameSpace ParentNameSpace, GtTokenContext TokenContext, GtSyntaxTree LeftTree, GtSyntaxPattern Pattern) {
		/*local*/GtSyntaxTree PrevTree = null;
		/*local*/GtNameSpace NameSpace = ParentNameSpace.CreateSubNameSpace();
		/*local*/boolean IsCaseBlock = TokenContext.MatchToken("{"); // case EXPR : {}
		while(TokenContext.HasNext()) {
			TokenContext.SkipEmptyStatement();
			if(TokenContext.IsToken("case")) {
				break;
			}
			if(TokenContext.IsToken("default")) {
				break;
			}
			if(TokenContext.IsToken("}")) {
				if(!IsCaseBlock) {
				}
				break;
			}
			/*local*/GtMap Annotation = TokenContext.SkipAndGetAnnotation(true);
			/*local*/GtSyntaxTree CurrentTree = TokenContext.ParsePattern_OLD(NameSpace, "$Expression$", GreenTeaConsts.Required);
			if(GreenTeaUtils.IsMismatchedOrError(CurrentTree)) {
				return CurrentTree;
			}
			CurrentTree.SetAnnotation(Annotation);
			PrevTree = GreenTeaUtils.LinkTree(PrevTree, CurrentTree);
		}
		if(PrevTree == null) {
			return TokenContext.ParsePattern_OLD(NameSpace, "$Empty$", GreenTeaConsts.Required);
		}
		return GreenTeaUtils.TreeHead(PrevTree);
	}

	public static GtSyntaxTree ParseSwitch(GtNameSpace NameSpace, GtTokenContext TokenContext, GtSyntaxTree LeftTree, GtSyntaxPattern Pattern) {
		/*local*/GtSyntaxTree SwitchTree = TokenContext.CreateMatchedSyntaxTree(NameSpace, Pattern, "switch");
		SwitchTree.SetMatchedTokenAt(GreenTeaConsts.NoWhere, NameSpace, TokenContext, "(", GreenTeaConsts.Required | GreenTeaConsts.OpenSkipIndent);
		SwitchTree.SetMatchedPatternAt(GreenTeaConsts.SwitchCaseCondExpr, NameSpace, TokenContext, "$Expression$", GreenTeaConsts.Required);
		SwitchTree.SetMatchedTokenAt(GreenTeaConsts.NoWhere, NameSpace, TokenContext, ")", GreenTeaConsts.Required | GreenTeaConsts.CloseSkipIndent);
		SwitchTree.SetMatchedTokenAt(GreenTeaConsts.NoWhere, NameSpace, TokenContext, "{", GreenTeaConsts.Required);

		/*local*/int CaseIndex = GreenTeaConsts.SwitchCaseCaseIndex;
		/*local*/int ParseFlag = TokenContext.SetSkipIndent(true);
		while(!SwitchTree.IsMismatchedOrError() && !TokenContext.MatchToken("}")) {
			if(TokenContext.MatchToken("case")) {
				SwitchTree.SetMatchedPatternAt(CaseIndex, NameSpace, TokenContext, "$Expression$", GreenTeaConsts.Required);
				SwitchTree.SetMatchedTokenAt(GreenTeaConsts.NoWhere, NameSpace, TokenContext, ":", GreenTeaConsts.Required);
				SwitchTree.SetMatchedPatternAt(CaseIndex + 1, NameSpace, TokenContext, "$CaseBlock$", GreenTeaConsts.Required);
				CaseIndex += 2;
				continue;
			}
			if(TokenContext.MatchToken("default")) {
				SwitchTree.SetMatchedTokenAt(GreenTeaConsts.NoWhere, NameSpace, TokenContext, ":", GreenTeaConsts.Required);
				SwitchTree.SetMatchedPatternAt(GreenTeaConsts.SwitchCaseDefaultBlock, NameSpace, TokenContext, "$CaseBlock$", GreenTeaConsts.Required);
			}
		}
		TokenContext.SetRememberFlag(ParseFlag);
		return SwitchTree;
	}

	public static GtNode TypeSwitch(GtTypeEnv Gamma, GtSyntaxTree ParsedTree, GtType ContextType) {
		/*local*/GtNode CondNode = ParsedTree.TypeCheckAt(GreenTeaConsts.IfCond, Gamma, GtStaticTable.VarType, GreenTeaConsts.DefaultTypeCheckPolicy);
		/*local*/GtNode DefaultNode = null;
		if(ParsedTree.HasNodeAt(GreenTeaConsts.SwitchCaseDefaultBlock)) {
			DefaultNode = ParsedTree.TypeCheckAt(GreenTeaConsts.SwitchCaseDefaultBlock, Gamma, GtStaticTable.VoidType, GreenTeaConsts.DefaultTypeCheckPolicy);
		}
		/*local*/GtNode Node = Gamma.Generator.CreateSwitchNode(GtStaticTable.VoidType, ParsedTree, CondNode, DefaultNode);
		/*local*/int CaseIndex = GreenTeaConsts.SwitchCaseCaseIndex;
		while(CaseIndex < ParsedTree.SubTreeList.size()) {
			/*local*/GtNode CaseExpr  = ParsedTree.TypeCheckAt(CaseIndex, Gamma, CondNode.Type, GreenTeaConsts.DefaultTypeCheckPolicy);
			/*local*/GtNode CaseBlock = null;
			if(ParsedTree.HasNodeAt(CaseIndex+1)) {
				CaseBlock = ParsedTree.TypeCheckAt(CaseIndex+1, Gamma, GtStaticTable.VoidType, GreenTeaConsts.DefaultTypeCheckPolicy);
			}
			Node.Append(CaseExpr);
			Node.Append(CaseBlock);
			CaseIndex += 2;
		}
		return Node;
	}

	// const decl
	public static GtSyntaxTree ParseSymbolDecl(GtNameSpace NameSpace, GtTokenContext TokenContext, GtSyntaxTree LeftTree, GtSyntaxPattern Pattern) {
		/*local*/GtSyntaxTree SymbolDeclTree = new GtSyntaxTree(Pattern, NameSpace, TokenContext.Next() /*const, let */, null);
		/*local*/GtType ConstClass = null;
		SymbolDeclTree.SetMatchedPatternAt(GreenTeaConsts.SymbolDeclNameIndex, NameSpace, TokenContext, "$Variable$", GreenTeaConsts.Required);
		if(TokenContext.MatchToken(".")) {
			/*local*/String ClassName = SymbolDeclTree.GetSyntaxTreeAt(GreenTeaConsts.SymbolDeclNameIndex).KeyToken.ParsedText;
			ConstClass = NameSpace.GetType(ClassName);
			if(ConstClass == null) {
				return TokenContext.ReportExpectedMessage(SymbolDeclTree.GetSyntaxTreeAt(GreenTeaConsts.SymbolDeclNameIndex).KeyToken, "type name", true);
			}
			SymbolDeclTree.SetMatchedPatternAt(GreenTeaConsts.SymbolDeclNameIndex, NameSpace, TokenContext, "$Variable$", GreenTeaConsts.Required);
		}
		SymbolDeclTree.SetMatchedTokenAt(GreenTeaConsts.NoWhere, NameSpace, TokenContext, "=", GreenTeaConsts.Required);
		SymbolDeclTree.SetMatchedPatternAt(GreenTeaConsts.SymbolDeclValueIndex, NameSpace, TokenContext, "$Expression$", GreenTeaConsts.Required);

		if(SymbolDeclTree.IsValidSyntax()) {
			/*local*/GtToken SourceToken = SymbolDeclTree.GetSyntaxTreeAt(GreenTeaConsts.SymbolDeclNameIndex).KeyToken;
			/*local*/String ConstName = SourceToken.ParsedText;
			if(ConstClass != null) {
				ConstName = GreenTeaUtils.ClassStaticSymbol(ConstClass, ConstName);
				SourceToken.AddTypeInfoToErrorMessage(ConstClass);
			}
			/*local*/Object ConstValue = null;
			if(SymbolDeclTree.GetSyntaxTreeAt(GreenTeaConsts.SymbolDeclValueIndex).Pattern.EqualsName("$Const$")) {
				ConstValue = SymbolDeclTree.GetSyntaxTreeAt(GreenTeaConsts.SymbolDeclValueIndex).ParsedValue;
			}
			if(ConstValue == null) {
				/*local*/GtTypeEnv Gamma = new GtTypeEnv(NameSpace);
				/*local*/GtNode Node = SymbolDeclTree.TypeCheckAt(GreenTeaConsts.SymbolDeclValueIndex, Gamma, GtStaticTable.VarType, GreenTeaConsts.OnlyConstPolicy);
				if(Node.IsErrorNode()) {
					SymbolDeclTree.ToError(Node.Token);
					return SymbolDeclTree;
				}
				ConstValue = Node.ToConstValue(Gamma.Context, true);
			}
			/*local*/int NameSpaceFlag = KonohaGrammar.ParseNameSpaceFlag(0, TokenContext.ParsingAnnotation);
			/*local*/GtNameSpace StoreNameSpace = NameSpace.GetNameSpace(NameSpaceFlag);
			StoreNameSpace.SetSymbol(ConstName, ConstValue, SourceToken);
		}
		return SymbolDeclTree;
	}

	public static GtNode TypeSymbolDecl(GtTypeEnv Gamma, GtSyntaxTree ParsedTree, GtType ContextType) {
		return Gamma.Generator.CreateEmptyNode(ContextType);
	}

	// FuncDecl
	public static GtSyntaxTree ParseFuncName(GtNameSpace NameSpace, GtTokenContext TokenContext, GtSyntaxTree LeftTree, GtSyntaxPattern Pattern) {
		/*local*/GtToken Token = TokenContext.Next();
		/*local*/String Name = Token.ParsedText;
		if(Token.IsQuoted()) {
			Name = LibGreenTea.UnquoteString(Name);
			Token.ParsedText = Name;
			return new GtSyntaxTree(Pattern, NameSpace, Token, Name);
		}
		if(Name.length() > 0 && LibGreenTea.CharAt(Name, 0) != '(' && LibGreenTea.CharAt(Name, 0) != '.') {
			return new GtSyntaxTree(Pattern, NameSpace, Token, Name);
		}
		return TokenContext.ReportExpectedMessage(Token, "name", true);
	}

	private static void ParseFuncParam(GtNameSpace NameSpace, GtTokenContext TokenContext, GtSyntaxTree FuncDeclTree, GtFuncBlock FuncBlock) {
		/*local*/int ParamBase = GreenTeaConsts.FuncDeclParam;
		while(!FuncDeclTree.IsMismatchedOrError() && !TokenContext.MatchToken(")")) {
			TokenContext.SkipIndent();
			if(ParamBase != GreenTeaConsts.FuncDeclParam) {
				FuncDeclTree.SetMatchedTokenAt(GreenTeaConsts.NoWhere, NameSpace, TokenContext, ",", GreenTeaConsts.Required);
				TokenContext.SkipIndent();
			}
			FuncDeclTree.SetMatchedPatternAt(ParamBase + GreenTeaConsts.VarDeclType, NameSpace, TokenContext, "$Type$", GreenTeaConsts.Required);
			FuncDeclTree.SetMatchedPatternAt(ParamBase + GreenTeaConsts.VarDeclName, NameSpace, TokenContext, "$Variable$", GreenTeaConsts.Required);
			if(FuncDeclTree.IsValidSyntax()) {
				FuncBlock.AddParameter(FuncDeclTree.GetSyntaxTreeAt(ParamBase + GreenTeaConsts.VarDeclType).GetParsedType(), FuncDeclTree.GetSyntaxTreeAt(ParamBase + GreenTeaConsts.VarDeclName).KeyToken.ParsedText);
			}
			if(TokenContext.MatchToken("=")) {
				FuncDeclTree.SetMatchedPatternAt(ParamBase + GreenTeaConsts.VarDeclValue, NameSpace, TokenContext, "$Expression$", GreenTeaConsts.Required);
			}
			ParamBase += 3;
		}
		TokenContext.SetSkipIndent(false);
	}

	private static void ParseFuncBody(GtNameSpace NameSpace, GtTokenContext TokenContext, GtSyntaxTree FuncDeclTree, GtFuncBlock FuncBlock) {
		TokenContext.SkipIndent();
		if(TokenContext.MatchToken("as")) {
			/*local*/GtToken Token = TokenContext.Next();
			FuncBlock.DefinedFunc.SetNativeMacro(LibGreenTea.UnquoteString(Token.ParsedText));
		}
		else if(TokenContext.IsToken("import")) {
			/*local*/GtSyntaxTree ImportTree = TokenContext.ParsePattern_OLD(NameSpace, "import", GreenTeaConsts.Optional);
			if(GreenTeaUtils.IsValidSyntax(ImportTree)) {
				if(!FuncBlock.DefinedFunc.ImportMethod((/*cast*/String)ImportTree.ParsedValue)) {
					NameSpace.Context.ReportError(GreenTeaConsts.WarningLevel, ImportTree.KeyToken, "unable to import: " + ImportTree.ParsedValue);
				}
			}
		}
		else {
			/*local*/GtSyntaxTree BlockTree = TokenContext.ParsePattern_OLD(NameSpace, "$Block$", GreenTeaConsts.Optional);
			if(GreenTeaUtils.IsValidSyntax(BlockTree)) {
				FuncBlock.FuncBlock = BlockTree;
				/*local*/GtSyntaxTree ReturnTree = new GtSyntaxTree(NameSpace.GetSyntaxPattern("return"), NameSpace, BlockTree.KeyToken, null);
				GreenTeaUtils.LinkTree(GreenTeaUtils.TreeTail(BlockTree), ReturnTree);
				FuncBlock.DefinedFunc.FuncBody = FuncBlock;
			}
		}
	}

//	public static GtSyntaxTree ParseFunction(GtNameSpace NameSpace, GtTokenContext TokenContext, GtSyntaxTree LeftTree, GtSyntaxPattern Pattern) {
//		/*local*/GtSyntaxTree FuncDeclTree = new GtSyntaxTree(Pattern, NameSpace, TokenContext.GetToken(), null);
//		FuncDeclTree.SetMatchedPatternAt(FuncDeclName, NameSpace, TokenContext, "$FuncName$", Optional);
//		if(FuncDeclTree.HasNodeAt(FuncDeclName)) {
//			//NameSpace = ParseFuncGenericParam(NameSpace, TokenContext, FuncDeclTree);
//		}
//		FuncDeclTree.SetMatchedTokenAt(NoWhere, NameSpace, TokenContext, "(", Required);
//		GreenTeaGrammar.ParseFuncParam(NameSpace, TokenContext, FuncDeclTree);
//		if(!FuncDeclTree.IsEmptyOrError() && TokenContext.MatchToken(":")) {
//			FuncDeclTree.SetMatchedPatternAt(FuncDeclReturnType, NameSpace, TokenContext, "$Type$", Required);
//		}
//		GreenTeaGrammar.ParseFuncBody(NameSpace, TokenContext, FuncDeclTree);
//		return FuncDeclTree;
//	}

	public static GtSyntaxTree ParseFuncDecl(GtNameSpace NameSpace, GtTokenContext TokenContext, GtSyntaxTree LeftTree, GtSyntaxPattern Pattern) {
		/*local*/GtSyntaxTree FuncDeclTree = new GtSyntaxTree(Pattern, NameSpace, TokenContext.GetToken(), null);
		/*local*/int FuncFlag = KonohaGrammar.ParseFuncFlag(0, TokenContext.ParsingAnnotation);
		/*local*/ArrayList<GtType> TypeList = new ArrayList<GtType>();
		LibGreenTea.Assert(LeftTree != null);
		FuncDeclTree.SetSyntaxTreeAt(GreenTeaConsts.FuncDeclReturnType, LeftTree);
		TypeList.add(LeftTree.GetParsedType());
		FuncDeclTree.SetMatchedPatternAt(GreenTeaConsts.FuncDeclName, NameSpace, TokenContext, "$FuncName$", GreenTeaConsts.Required);
		FuncDeclTree.SetMatchedTokenAt(GreenTeaConsts.NoWhere, NameSpace, TokenContext, "(", GreenTeaConsts.Required | GreenTeaConsts.OpenSkipIndent);
		if(FuncDeclTree.IsValidSyntax()) {
			/*local*/GtFuncBlock FuncBlock = new GtFuncBlock(NameSpace, TypeList);
			/*local*/boolean FoundAbstractFunc = false;
			/*local*/GtToken SourceToken = FuncDeclTree.GetSyntaxTreeAt(GreenTeaConsts.FuncDeclName).KeyToken;
			/*local*/String FuncName = GreenTeaUtils.FuncSymbol(SourceToken.ParsedText);
			/*local*/int ParseFlag = TokenContext.SetBackTrack(false);  // disabled
			/*local*/GtNameSpace StoreNameSpace = NameSpace.GetNameSpace(KonohaGrammar.ParseNameSpaceFlag(0, TokenContext.ParsingAnnotation));
			if(LibGreenTea.EqualsString(FuncName, "converter")) {
				FuncFlag |= GreenTeaConsts.ConverterFunc;
				//				FuncBlock.SetConverterType();
				KonohaGrammar.ParseFuncParam(NameSpace, TokenContext, FuncDeclTree, FuncBlock);
				if(TypeList.size() != 2) {
					NameSpace.Context.ReportError(GreenTeaConsts.ErrorLevel, SourceToken, "converter takes one parameter");
					FuncDeclTree.ToError(SourceToken);
					return FuncDeclTree;
				}
				FuncName = "to" + TypeList.get(0);
				FuncBlock.DefinedFunc = NameSpace.Context.Generator.CreateFunc(FuncFlag, FuncName, 0, FuncBlock.TypeList);
				KonohaGrammar.ParseFuncBody(NameSpace, TokenContext, FuncDeclTree, FuncBlock);
				if(GreenTeaUtils.IsFlag(FuncFlag, GreenTeaConsts.StrongCoercionFunc)) {  // this part is for weak type treatment
					/*local*/GtType FromType = FuncBlock.DefinedFunc.GetFuncParamType(0);
					/*local*/GtType ToType = FuncBlock.DefinedFunc.GetReturnType();
					FromType.SetUnrevealedType(ToType);
					StoreNameSpace = NameSpace.Context.RootNameSpace;
				}
				SourceToken.ParsedText = FuncName;
				StoreNameSpace.SetConverterFunc(null, null, FuncBlock.DefinedFunc, SourceToken);
			}
			else {
				FuncBlock.SetThisIfInClass(NameSpace.GetType("This"));
				KonohaGrammar.ParseFuncParam(NameSpace, TokenContext, FuncDeclTree, FuncBlock);
				FuncBlock.DefinedFunc = NameSpace.GetFunc(FuncName, 0, TypeList);
				if(FuncBlock.DefinedFunc == null || !FuncBlock.DefinedFunc.IsAbstract()) {
					FuncBlock.DefinedFunc = NameSpace.Context.Generator.CreateFunc(FuncFlag, FuncName, 0, TypeList);
				}
				else {
					FoundAbstractFunc = true;
					FuncBlock.DefinedFunc.FuncFlag = FuncFlag;
				}
				KonohaGrammar.ParseFuncBody(NameSpace, TokenContext, FuncDeclTree, FuncBlock);
				/*local*/GtFunc DefinedFunc = FuncBlock.DefinedFunc;
				if(!DefinedFunc.IsAbstract() || !FoundAbstractFunc) {
					/*local*/GtType StaticType = DefinedFunc.GetStaticType(NameSpace);
					if(StaticType != null) {
						StoreNameSpace.AppendStaticFunc(StaticType, DefinedFunc, SourceToken);
					}
					else {
						if(!DefinedFunc.Is(GreenTeaConsts.MethodFunc) || !DefinedFunc.Is(GreenTeaConsts.OperatorFunc)) {
							StoreNameSpace.AppendFunc(DefinedFunc, SourceToken);
						}
						/*local*/GtType RecvType = DefinedFunc.GetRecvType();
						if(RecvType.IsVoidType() || LibGreenTea.EqualsString(DefinedFunc.FuncName, "_")) {
						}
						else {
							StoreNameSpace.AppendMethod(DefinedFunc, SourceToken.AddTypeInfoToErrorMessage(RecvType));
						}
					}
				}
			}
			FuncDeclTree.ParsedValue = FuncBlock.DefinedFunc;
			TokenContext.SetRememberFlag(ParseFlag);
		}
		return FuncDeclTree;
	}

	public static GtNode TypeFuncDecl(GtTypeEnv Gamma, GtSyntaxTree ParsedTree, GtType ContextType) {
		/*local*/GtFunc DefinedFunc = (/*cast*/GtFunc)ParsedTree.ParsedValue;
		DefinedFunc.GenerateNativeFunc();
		return Gamma.Generator.CreateEmptyNode(GtStaticTable.VoidType);
	}

	public static GtSyntaxTree ParseGenericFuncDecl(GtNameSpace NameSpace, GtTokenContext TokenContext, GtSyntaxTree LeftTree, GtSyntaxPattern Pattern) {
		/*local*/GtSyntaxTree FuncTree = TokenContext.CreateSyntaxTree(NameSpace, Pattern, null);
		/*local*/ArrayList<Object> RevertList = new ArrayList<Object>();
		FuncTree.SetMatchedTokenAt(GreenTeaConsts.KeyTokenIndex, NameSpace, TokenContext, "<", GreenTeaConsts.Required);
		/*local*/int StartIndex = GreenTeaConsts.GenericParam;
		while(FuncTree.IsValidSyntax()) {
			/*local*/GtType ParamBaseType = GtStaticTable.VarType;
			FuncTree.SetMatchedPatternAt(StartIndex, NameSpace, TokenContext, "$Variable$", GreenTeaConsts.Required);
			if(TokenContext.MatchToken(":")) {
				FuncTree.SetMatchedPatternAt(StartIndex + 1, NameSpace, TokenContext, "$Type$", GreenTeaConsts.Required);
				if(FuncTree.IsValidSyntax()) {
					ParamBaseType = FuncTree.GetSyntaxTreeAt(StartIndex).GetParsedType();
				}
			}
			if(FuncTree.IsValidSyntax()) {
				/*local*/GtToken SourceToken = FuncTree.GetSyntaxTreeAt(StartIndex).KeyToken;
				NameSpace.AppendTypeVariable(SourceToken.ParsedText, ParamBaseType, SourceToken, RevertList);

			}
			if(TokenContext.MatchToken(">")) {
				break;
			}
			FuncTree.SetMatchedTokenAt(GreenTeaConsts.NoWhere, NameSpace, TokenContext, ",", GreenTeaConsts.Required);
			StartIndex += 2;
		}
		FuncTree.SetMatchedPatternAt(GreenTeaConsts.GenericReturnType, NameSpace, TokenContext, "$Type$", GreenTeaConsts.Required);
		if(FuncTree.IsValidSyntax()) {
			FuncTree = KonohaGrammar.ParseFuncDecl(NameSpace, TokenContext, FuncTree.GetSyntaxTreeAt(GreenTeaConsts.GenericReturnType), NameSpace.GetSyntaxPattern("$FuncDecl$"));
			if(FuncTree.IsValidSyntax()) {
				/*local*/GtFunc DefinedFunc = (/*cast*/GtFunc)FuncTree.ParsedValue;
				DefinedFunc.FuncFlag |= GreenTeaConsts.GenericFunc;
			}
		}
		NameSpace.Revert(RevertList);
		return FuncTree;
	}

	// constructor
	public static GtSyntaxTree ParseConstructor2(GtNameSpace NameSpace, GtTokenContext TokenContext, GtSyntaxTree LeftTree, GtSyntaxPattern Pattern) {
		/*local*/GtSyntaxTree FuncDeclTree = TokenContext.CreateMatchedSyntaxTree(NameSpace, Pattern, "constructor");
		/*local*/GtType ThisType = NameSpace.GetType("This");
		if(ThisType == null) {
			NameSpace.Context.ReportError(GreenTeaConsts.ErrorLevel, FuncDeclTree.KeyToken, "constructor is used inside class");
			FuncDeclTree.ToError(FuncDeclTree.KeyToken);
			return FuncDeclTree;
		}
		/*local*/int FuncFlag = KonohaGrammar.ParseFuncFlag(GreenTeaConsts.ConstructorFunc, TokenContext.ParsingAnnotation);
		/*local*/ArrayList<GtType> TypeList = new ArrayList<GtType>();
		TypeList.add(ThisType);
		FuncDeclTree.SetMatchedTokenAt(GreenTeaConsts.NoWhere, NameSpace, TokenContext, "(", GreenTeaConsts.Required | GreenTeaConsts.OpenSkipIndent);
		if(FuncDeclTree.IsValidSyntax()) {
			/*local*/GtFuncBlock FuncBlock = new GtFuncBlock(NameSpace, TypeList);
			/*local*/GtToken SourceToken = FuncDeclTree.KeyToken;
			/*local*/int ParseFlag = TokenContext.SetBackTrack(false);  // disabled
			/*local*/GtNameSpace StoreNameSpace = NameSpace.GetNameSpace(KonohaGrammar.ParseNameSpaceFlag(0, TokenContext.ParsingAnnotation));
			FuncBlock.SetThisIfInClass(ThisType);
			KonohaGrammar.ParseFuncParam(NameSpace, TokenContext, FuncDeclTree, FuncBlock);
			if(FuncDeclTree.IsValidSyntax()) {
				FuncBlock.DefinedFunc = NameSpace.Context.Generator.CreateFunc(FuncFlag, ThisType.ShortName, 0, FuncBlock.TypeList);
				KonohaGrammar.ParseFuncBody(NameSpace, TokenContext, FuncDeclTree, FuncBlock);
				StoreNameSpace.AppendConstructor(ThisType, FuncBlock.DefinedFunc, SourceToken.AddTypeInfoToErrorMessage(ThisType));
				FuncDeclTree.ParsedValue = FuncBlock.DefinedFunc;
			}
			TokenContext.SetRememberFlag(ParseFlag);
		}
		return FuncDeclTree;
	}

	// Array
	public static GtSyntaxTree ParseNewArray(GtNameSpace NameSpace, GtTokenContext TokenContext, GtSyntaxTree LeftTree, GtSyntaxPattern Pattern) {
		/*local*/GtSyntaxTree ArrayTree = TokenContext.CreateMatchedSyntaxTree(NameSpace, Pattern, "new");
		ArrayTree.AppendMatchedPattern(NameSpace, TokenContext, "$Type$", GreenTeaConsts.Required);
		while(TokenContext.HasNext() && ArrayTree.IsValidSyntax()) {
			ArrayTree.SetMatchedTokenAt(GreenTeaConsts.NoWhere, NameSpace, TokenContext, "[", GreenTeaConsts.Required);
			ArrayTree.AppendMatchedPattern(NameSpace, TokenContext, "$Expression$", GreenTeaConsts.Required);
			ArrayTree.SetMatchedTokenAt(GreenTeaConsts.NoWhere, NameSpace, TokenContext, "]", GreenTeaConsts.Required);
			if(!TokenContext.IsToken("[")) {
				break;
			}
		}
		return ArrayTree;
	}

	public static GtNode TypeNewArray(GtTypeEnv Gamma, GtSyntaxTree ParsedTree, GtType ContextType) {
		/*local*/GtType ArrayType = ParsedTree.GetSyntaxTreeAt(0).GetParsedType();
		/*local*/GtNode ArrayNode = Gamma.Generator.CreateNewArrayNode(GtStaticTable.ArrayType, ParsedTree);
		/*local*/int i = 1;
		while(i < LibGreenTea.ListSize(ParsedTree.SubTreeList)) {
			/*local*/GtNode Node = ParsedTree.TypeCheckAt(i, Gamma, GtStaticTable.IntType, GreenTeaConsts.DefaultTypeCheckPolicy);
			if(Node.IsErrorNode()) {
				return Node;
			}
			ArrayType = GtStaticTable.GetGenericType1(GtStaticTable.ArrayType, ArrayType, true);
			ArrayNode.Append(Node);
			i = i + 1;
		}
		ArrayNode.Type = ArrayType;
		return ArrayNode;
	}

	public static GtSyntaxTree ParseArray(GtNameSpace NameSpace, GtTokenContext TokenContext, GtSyntaxTree LeftTree, GtSyntaxPattern Pattern) {
		/*local*/int OldFlag = TokenContext.SetSkipIndent(true);
		/*local*/GtSyntaxTree ArrayTree = TokenContext.CreateMatchedSyntaxTree(NameSpace, Pattern, "[");
		while(TokenContext.HasNext() && ArrayTree.IsValidSyntax()) {
			if(TokenContext.MatchToken("]")) {
				break;
			}
			if(TokenContext.MatchToken(",")) {
				continue;
			}
			ArrayTree.AppendMatchedPattern(NameSpace, TokenContext, "$Expression$", GreenTeaConsts.Required);
		}
		TokenContext.SetRememberFlag(OldFlag);
		return ArrayTree;
	}

	public static GtNode TypeArray(GtTypeEnv Gamma, GtSyntaxTree ParsedTree, GtType ContextType) {
		/*local*/GtNode ArrayNode = Gamma.Generator.CreateArrayLiteralNode(GtStaticTable.ArrayType, ParsedTree);
		/*local*/GtType ElemType = GtStaticTable.VarType;
		if(ContextType.IsArrayType()) {
			ElemType = ContextType.TypeParams[0];
			ArrayNode.Type = ContextType;
		}
		/*local*/int i = 0;
		while(i < LibGreenTea.ListSize(ParsedTree.SubTreeList)) {
			/*local*/GtNode Node = ParsedTree.TypeCheckAt(i, Gamma, ElemType, GreenTeaConsts.DefaultTypeCheckPolicy);
			if(Node.IsErrorNode()) {
				return Node;
			}
			if(ElemType.IsVarType()) {
				ElemType = Node.Type;
				ArrayNode.Type = GtStaticTable.GetGenericType1(GtStaticTable.ArrayType, ElemType, true);
			}
			ArrayNode.Append(Node);
			i = i + 1;
		}
		if(ElemType.IsVarType()) {
			ArrayNode.Type = GtStaticTable.GetGenericType1(GtStaticTable.ArrayType, GtStaticTable.AnyType, true);
		}
		return ArrayNode;
	}

	public static GtSyntaxTree ParseSize(GtNameSpace NameSpace, GtTokenContext TokenContext, GtSyntaxTree LeftTree, GtSyntaxPattern Pattern) {
		/*local*/GtSyntaxTree ArrayTree = TokenContext.CreateMatchedSyntaxTree(NameSpace, Pattern, "|");
		ArrayTree.SetMatchedPatternAt(GreenTeaConsts.UnaryTerm, NameSpace, TokenContext, "$SuffixExpression$", GreenTeaConsts.Required);
		ArrayTree.SetMatchedTokenAt(GreenTeaConsts.NoWhere, NameSpace, TokenContext, "|", GreenTeaConsts.Required);
		return ArrayTree;
	}

	public static GtNode TypeSize(GtTypeEnv Gamma, GtSyntaxTree ParsedTree, GtType ContextType) {
		/*local*/GtNode ExprNode = ParsedTree.TypeCheckAt(GreenTeaConsts.UnaryTerm, Gamma, GtStaticTable.VarType, GreenTeaConsts.DefaultTypeCheckPolicy);
		if(ExprNode.IsErrorNode()) {
			return ExprNode;
		}
		/*local*/GtPolyFunc PolyFunc = Gamma.NameSpace.GetMethod(ExprNode.Type, GreenTeaUtils.FuncSymbol("||"), true);
		//System.err.println("polyfunc: " + PolyFunc);
		/*local*/GtFunc Func = PolyFunc.ResolveUnaryMethod(Gamma, ExprNode.Type);
		LibGreenTea.Assert(Func != null);  // any has ||
		Gamma.CheckFunc("operator", Func, ParsedTree.KeyToken);
		GtNode Node = Gamma.Generator.CreateApplySymbolNode(Func.GetReturnType(), ParsedTree, GreenTeaUtils.FuncSymbol("||"), Func);
		Node.Append(ExprNode);
		if(Node instanceof GtSymbolNode) {
			((/*cast*/GtSymbolNode)Node).ResolvedFunc = Func;
		}
		return Node;
	}

	public static GtSyntaxTree ParseIndexer(GtNameSpace NameSpace, GtTokenContext TokenContext, GtSyntaxTree LeftTree, GtSyntaxPattern Pattern) {
		/*local*/GtSyntaxTree ArrayTree = TokenContext.CreateMatchedSyntaxTree(NameSpace, Pattern, "[");
		ArrayTree.AppendParsedTree2(LeftTree);
		/*local*/int OldFlag = TokenContext.SetSkipIndent(true);
		do {
			ArrayTree.AppendMatchedPattern(NameSpace, TokenContext, "$Expression$", GreenTeaConsts.Required);
		}
		while(!ArrayTree.IsMismatchedOrError() && TokenContext.MatchToken(","));
		ArrayTree.SetMatchedTokenAt(GreenTeaConsts.NoWhere, NameSpace, TokenContext, "]", GreenTeaConsts.Required);
		TokenContext.SetRememberFlag(OldFlag);
		/*local*/String OperatorSymbol = "[]";
		if(TokenContext.MatchToken("=")) {
			ArrayTree.AppendMatchedPattern(NameSpace, TokenContext, "$Expression$", GreenTeaConsts.Required);
			OperatorSymbol = "[]=";
		}
		if(ArrayTree.IsValidSyntax()) {
			ArrayTree.KeyToken.ParsedText = OperatorSymbol;
		}
		return ArrayTree;
	}

	public static GtNode TypeIndexer(GtTypeEnv Gamma, GtSyntaxTree ParsedTree, GtType Type) {
		/*local*/GtNode RecvNode = ParsedTree.TypeCheckAt(GreenTeaConsts.LeftHandTerm, Gamma, GtStaticTable.VarType, GreenTeaConsts.DefaultTypeCheckPolicy);
		if(!RecvNode.IsErrorNode()) {
			/*local*/String MethodName = ParsedTree.KeyToken.ParsedText;
			/*local*/GtResolvedFunc ResolvedFunc = null;
			/*local*/GtPolyFunc PolyFunc = ParsedTree.NameSpace.GetMethod(RecvNode.Type, GreenTeaUtils.FuncSymbol(MethodName), true);
			//System.err.println("polyfunc: " + PolyFunc);
			/*local*/ArrayList<GtNode> ParamList = new ArrayList<GtNode>();
			ParamList.add(RecvNode);
			ResolvedFunc = PolyFunc.ResolveFunc(Gamma, ParsedTree, 1, ParamList);
			if(ResolvedFunc.Func == null) {
				return Gamma.CreateSyntaxErrorNode(ParsedTree, "undefined: " + MethodName + " of " + RecvNode.Type);
			}
			if(LibGreenTea.EqualsString(ParsedTree.KeyToken.ParsedText, "[]")) {
				return Gamma.Generator.CreateGetIndexNode(ResolvedFunc.ReturnType, ParsedTree, RecvNode, ResolvedFunc.Func, ParamList.get(1));
			}
			else {
				return Gamma.Generator.CreateSetIndexNode(ResolvedFunc.ReturnType, ParsedTree, RecvNode, ResolvedFunc.Func, ParamList.get(1), ParamList.get(2));
			}
		}
		return RecvNode;
	}

	public static GtSyntaxTree ParseSlice(GtNameSpace NameSpace, GtTokenContext TokenContext, GtSyntaxTree LeftTree, GtSyntaxPattern Pattern) {
		/*local*/GtSyntaxTree SliceTree = TokenContext.CreateMatchedSyntaxTree(NameSpace, Pattern, "[");
		SliceTree.AppendParsedTree2(LeftTree);
		SliceTree.SetMatchedPatternAt(1, NameSpace, TokenContext, "$Expression$", GreenTeaConsts.Optional);
		if(!SliceTree.HasNodeAt(1)) {
			SliceTree.SetSyntaxTreeAt(1, SliceTree.CreateConstTree(0L)); // s[:x]
		}
		SliceTree.SetMatchedTokenAt(GreenTeaConsts.NoWhere, NameSpace, TokenContext, ":", GreenTeaConsts.Required);
		SliceTree.AppendMatchedPattern(NameSpace, TokenContext, "$Expression$", GreenTeaConsts.Optional);
		SliceTree.SetMatchedTokenAt(GreenTeaConsts.NoWhere, NameSpace, TokenContext, "]", GreenTeaConsts.Required);
		return SliceTree;
	}

	public static GtNode TypeSlice(GtTypeEnv Gamma, GtSyntaxTree ParsedTree, GtType ContextType) {
		/*local*/GtNode RecvNode = ParsedTree.TypeCheckAt(GreenTeaConsts.LeftHandTerm, Gamma, GtStaticTable.VarType, GreenTeaConsts.DefaultTypeCheckPolicy);
		if(!RecvNode.IsErrorNode()) {
			return KonohaGrammar.TypeMethodNameCall(Gamma, ParsedTree, RecvNode, "[:]", ContextType);
		}
		return RecvNode;
	}

	// ClassDecl
	private static boolean TypeFieldDecl(GtTypeEnv Gamma, GtSyntaxTree ParsedTree, GtClassField ClassField) {
		/*local*/int    FieldFlag = KonohaGrammar.ParseVarFlag(0, ParsedTree.Annotation);
		/*local*/GtType DeclType = ParsedTree.GetSyntaxTreeAt(GreenTeaConsts.VarDeclType).GetParsedType();
		/*local*/String FieldName = ParsedTree.GetSyntaxTreeAt(GreenTeaConsts.VarDeclName).KeyToken.ParsedText;
		/*local*/GtNode InitValueNode = null;
		/*local*/Object InitValue = null;
		if(ParsedTree.HasNodeAt(GreenTeaConsts.VarDeclValue)) {
			InitValueNode = ParsedTree.TypeCheckAt(GreenTeaConsts.VarDeclValue, Gamma, DeclType, GreenTeaConsts.OnlyConstPolicy | GreenTeaConsts.NullablePolicy);
			if(InitValueNode.IsErrorNode()) {
				return false;
			}
			InitValue = InitValueNode.ToConstValue(Gamma.Context, true);
		}
		if(GreenTeaConsts.UseLangStat) {
			Gamma.Context.Stat.VarDecl += 1;
		}/*EndOfStat*/
		if(DeclType.IsVarType()) {
			if(InitValueNode == null) {
				DeclType = GtStaticTable.AnyType;
			}
			else {
				DeclType = InitValueNode.Type;
			}
			Gamma.ReportTypeInference(ParsedTree.KeyToken, FieldName, DeclType);
			if(GreenTeaConsts.UseLangStat) {
				Gamma.Context.Stat.VarDeclInfer += 1;
				if(DeclType.IsAnyType()) {
					Gamma.Context.Stat.VarDeclInferAny += 1;
				}
			}/*EndOfStat*/
		}
		if(GreenTeaConsts.UseLangStat) {
			if(DeclType.IsAnyType()) {
				Gamma.Context.Stat.VarDeclAny += 1;
			}
		}/*EndOfStat*/
		if(InitValueNode == null) {
			InitValue = DeclType.DefaultNullValue;
		}
		ClassField.CreateField(FieldFlag, DeclType, FieldName, ParsedTree.GetSyntaxTreeAt(GreenTeaConsts.VarDeclName).KeyToken, InitValue);
		return true;
	}

	public static GtSyntaxTree ParseClassDecl2(GtNameSpace NameSpace, GtTokenContext TokenContext, GtSyntaxTree LeftTree, GtSyntaxPattern Pattern) {
		/*local*/GtSyntaxTree ClassDeclTree = TokenContext.CreateMatchedSyntaxTree(NameSpace, Pattern, "class");
		ClassDeclTree.SetMatchedPatternAt(GreenTeaConsts.ClassDeclName, NameSpace, TokenContext, "$FuncName$", GreenTeaConsts.Required); //$ClassName$ is better
		if(TokenContext.MatchToken("extends")) {
			ClassDeclTree.SetMatchedPatternAt(GreenTeaConsts.ClassDeclSuperType, NameSpace, TokenContext, "$Type$", GreenTeaConsts.Required);
		}
		if(ClassDeclTree.IsMismatchedOrError()) {
			return ClassDeclTree;
		}
		// define new class
		/*local*/GtNameSpace ClassNameSpace = new GtNameSpace(NameSpace.Context, NameSpace);
		/*local*/GtToken NameToken = ClassDeclTree.GetSyntaxTreeAt(GreenTeaConsts.ClassDeclName).KeyToken;
		/*local*/GtType SuperType = GtStaticTable.TopType;
		if(ClassDeclTree.HasNodeAt(GreenTeaConsts.ClassDeclSuperType)) {
			SuperType = ClassDeclTree.GetSyntaxTreeAt(GreenTeaConsts.ClassDeclSuperType).GetParsedType();
		}
		/*local*/int ClassFlag = KonohaGrammar.ParseClassFlag(0, TokenContext.ParsingAnnotation);
		/*local*/String ClassName = NameToken.ParsedText;
		/*local*/GtType DefinedType = NameSpace.GetType(ClassName);
		if(DefinedType != null && DefinedType.IsAbstractType()) {
			DefinedType.TypeFlag = ClassFlag;
			DefinedType.SuperType = SuperType;
			NameToken = null; // preventing duplicated symbol message at (A)
		}
		else {
			DefinedType = SuperType.CreateSubType(ClassFlag, ClassName, null, null);
			ClassNameSpace.AppendTypeName(DefinedType, NameToken);  // temporary
		}
		ClassNameSpace.SetSymbol("This", DefinedType, NameToken);
		ClassDeclTree.SetMatchedPatternAt(GreenTeaConsts.ClassDeclBlock, ClassNameSpace, TokenContext, "$Block$", GreenTeaConsts.Optional);
		if(ClassDeclTree.HasNodeAt(GreenTeaConsts.ClassDeclBlock)) {
			/*local*/GtClassField ClassField = new GtClassField(DefinedType, NameSpace);
			/*local*/GtTypeEnv Gamma = new GtTypeEnv(ClassNameSpace);
			/*local*/GtSyntaxTree SubTree = ClassDeclTree.GetSyntaxTreeAt(GreenTeaConsts.ClassDeclBlock);
			while(SubTree != null) {
				if(SubTree.Pattern.EqualsName("$VarDecl$")) {
					KonohaGrammar.TypeFieldDecl(Gamma, SubTree, ClassField);
				}
				SubTree = SubTree.NextTree;
			}
			ClassDeclTree.ParsedValue = ClassField;
		}
		if(ClassDeclTree.IsValidSyntax()) {
			NameSpace.AppendTypeName(DefinedType, NameToken);   /* (A) */
		}
		return ClassDeclTree;
	}

	public static GtNode TypeClassDecl2(GtTypeEnv Gamma, GtSyntaxTree ParsedTree, GtType ContextType) {
		/*local*/GtClassField ClassField = (/*cast*/GtClassField)ParsedTree.ParsedValue;
		if(ClassField != null) {
			/*local*/GtType DefinedType = ClassField.DefinedType;
			DefinedType.SetClassField(ClassField);
			Gamma.Generator.OpenClassField(ParsedTree, DefinedType, ClassField);
			/*local*/GtSyntaxTree SubTree = ParsedTree.GetSyntaxTreeAt(GreenTeaConsts.ClassDeclBlock);
			/*local*/ArrayList<GtFunc> MemberList = new ArrayList<GtFunc>();
			while(SubTree != null) {
				if(SubTree.Pattern.EqualsName("$FuncDecl$") || SubTree.Pattern.EqualsName("$Constructor2$")) {
					MemberList.add((/*cast*/GtFunc)SubTree.ParsedValue);
				}
				if(!SubTree.Pattern.EqualsName("$VarDecl$")) {
					SubTree.TypeCheck(Gamma, GtStaticTable.VoidType, GreenTeaConsts.DefaultTypeCheckPolicy);
				}
				SubTree = SubTree.NextTree;
			}
			Gamma.Generator.CloseClassField(DefinedType, MemberList);
		}
		return Gamma.Generator.CreateEmptyNode(GtStaticTable.VoidType);
	}

	@Override public void LoadTo(GtNameSpace NameSpace) {
		// Define Constants
		/*local*/GtParserContext Context = NameSpace.Context;
		NameSpace.SetSymbol("true", true, null);
		NameSpace.SetSymbol("false", false, null);

		NameSpace.AppendTokenFunc(" \t", GtGrammar.LoadTokenFunc(Context, this, "WhiteSpaceToken"));
		NameSpace.AppendTokenFunc("\n",  GtGrammar.LoadTokenFunc(Context, this, "IndentToken"));
		NameSpace.AppendTokenFunc(";", GtGrammar.LoadTokenFunc(Context, this, "SemiColonToken"));
		NameSpace.AppendTokenFunc("{}()[]<>.,?:+-*/%=&|!@~^$", GtGrammar.LoadTokenFunc(Context, this, "OperatorToken"));
		NameSpace.AppendTokenFunc("/", GtGrammar.LoadTokenFunc(Context, this, "CommentToken"));  // overloading
		NameSpace.AppendTokenFunc("Aa_", GtGrammar.LoadTokenFunc(Context, this, "SymbolToken"));

		NameSpace.AppendTokenFunc("\"", GtGrammar.LoadTokenFunc(Context, this, "StringLiteralToken"));
		//NameSpace.AppendTokenFunc("\"", GtGrammar.LoadTokenFunc(ParserContext, this, "StringLiteralToken_StringInterpolation"));
		NameSpace.AppendTokenFunc("'", GtGrammar.LoadTokenFunc(Context, this, "CharLiteralToken"));
		NameSpace.AppendTokenFunc("1",  GtGrammar.LoadTokenFunc(Context, this, "NumberLiteralToken"));

		/*local*/GtFunc ParseUnary     = GtGrammar.LoadParseFunc(Context, this, "ParseUnary");
		/*local*/GtFunc  TypeUnary      = GtGrammar.LoadTypeFunc(Context, this, "TypeUnary");
		/*local*/GtFunc ParseBinary    = GtGrammar.LoadParseFunc(Context, this, "ParseBinary");
		/*local*/GtFunc  TypeBinary     = GtGrammar.LoadTypeFunc(Context, this, "TypeBinary");
		/*local*/GtFunc  TypeConst      = GtGrammar.LoadTypeFunc(Context, this, "TypeConst");

		NameSpace.AppendSyntax("+", ParseUnary, TypeUnary);
		NameSpace.AppendSyntax("-", ParseUnary, TypeUnary);
		NameSpace.AppendSyntax("~", ParseUnary, TypeUnary);
		NameSpace.AppendSyntax("! not", GtGrammar.LoadParseFunc(Context, this, "ParseNot"), GtGrammar.LoadTypeFunc(Context, this, "TypeNot"));
		NameSpace.AppendSyntax("++ --", GtGrammar.LoadParseFunc(Context, this, "ParseIncl"), GtGrammar.LoadTypeFunc(Context, this, "TypeIncl"));

		NameSpace.AppendExtendedSyntax("* / % mod", GreenTeaConsts.PrecedenceCStyleMUL, ParseBinary, TypeBinary);
		NameSpace.AppendExtendedSyntax("+ -", GreenTeaConsts.PrecedenceCStyleADD, ParseBinary, TypeBinary);

		NameSpace.AppendExtendedSyntax("< <= > >=", GreenTeaConsts.PrecedenceCStyleCOMPARE, ParseBinary, TypeBinary);
		NameSpace.AppendExtendedSyntax("== !=", GreenTeaConsts.PrecedenceCStyleEquals, ParseBinary, TypeBinary);

		NameSpace.AppendExtendedSyntax("<< >>", GreenTeaConsts.PrecedenceCStyleSHIFT, ParseBinary, TypeBinary);
		NameSpace.AppendExtendedSyntax("&", GreenTeaConsts.PrecedenceCStyleBITAND, ParseBinary, TypeBinary);
		NameSpace.AppendExtendedSyntax("|", GreenTeaConsts.PrecedenceCStyleBITOR, ParseBinary, TypeBinary);
		NameSpace.AppendExtendedSyntax("^", GreenTeaConsts.PrecedenceCStyleBITXOR, ParseBinary, TypeBinary);

		NameSpace.AppendExtendedSyntax("=", GreenTeaConsts.PrecedenceCStyleAssign | GreenTeaConsts.LeftJoin, ParseBinary, GtGrammar.LoadTypeFunc(Context, this, "TypeAssign"));
		NameSpace.AppendExtendedSyntax("+= -= *= /= %= <<= >>= & | ^=", GreenTeaConsts.PrecedenceCStyleAssign, ParseBinary, GtGrammar.LoadTypeFunc(Context, this, "TypeSelfAssign"));
		NameSpace.AppendExtendedSyntax("++ --", 0, GtGrammar.LoadParseFunc(Context, this, "ParseIncl"), GtGrammar.LoadTypeFunc(Context, this, "TypeIncl"));

		NameSpace.AppendExtendedSyntax("&& and", GreenTeaConsts.PrecedenceCStyleAND, ParseBinary, GtGrammar.LoadTypeFunc(Context, this, "TypeAnd"));
		NameSpace.AppendExtendedSyntax("|| or", GreenTeaConsts.PrecedenceCStyleOR, ParseBinary, GtGrammar.LoadTypeFunc(Context, this, "TypeOr"));
		NameSpace.AppendExtendedSyntax("<: instanceof", GreenTeaConsts.PrecedenceInstanceof, ParseBinary, GtGrammar.LoadTypeFunc(Context, this, "TypeInstanceOf"));

		NameSpace.AppendExtendedSyntax("?", 0, GtGrammar.LoadParseFunc(Context, this, "ParseTrinary"), GtGrammar.LoadTypeFunc(Context, this, "TypeTrinary"));

		NameSpace.AppendSyntax("$Error$", GtGrammar.LoadParseFunc(Context, this, "ParseError"), GtGrammar.LoadTypeFunc(Context, this, "TypeError"));
		NameSpace.AppendSyntax("$Empty$", GtGrammar.LoadParseFunc(Context, this, "ParseEmpty"), GtGrammar.LoadTypeFunc(Context, this, "TypeEmpty"));
		NameSpace.AppendSyntax(";", GtGrammar.LoadParseFunc(Context, this, "ParseSemiColon"), null);
		NameSpace.AppendSyntax("$Symbol$", GtGrammar.LoadParseFunc(Context, this, "ParseSymbol"), null);
		NameSpace.AppendSyntax("$Type$",GtGrammar.LoadParseFunc(Context, this, "ParseType"), TypeConst);
		NameSpace.AppendSyntax("$TypeSuffix$", GtGrammar.LoadParseFunc(Context, this, "ParseTypeSuffix"), null);
		NameSpace.AppendSyntax("<", GtGrammar.LoadParseFunc(Context, this, "ParseGenericFuncDecl"), null);
		NameSpace.AppendSyntax("$Variable$", GtGrammar.LoadParseFunc(Context, this, "ParseVariable"), GtGrammar.LoadTypeFunc(Context, this, "TypeVariable"));
		NameSpace.AppendSyntax("$Const$", GtGrammar.LoadParseFunc(Context, this, "ParseConst"), TypeConst);
		NameSpace.AppendSyntax("$CharLiteral$", GtGrammar.LoadParseFunc(Context, this, "ParseCharLiteral"), GtGrammar.LoadTypeFunc(Context, this, "TypeCharLiteral"));
		NameSpace.AppendSyntax("$StringLiteral$", GtGrammar.LoadParseFunc(Context, this, "ParseStringLiteral"), TypeConst);
		NameSpace.AppendSyntax("$IntegerLiteral$", GtGrammar.LoadParseFunc(Context, this, "ParseIntegerLiteral"), TypeConst);
		NameSpace.AppendSyntax("$FloatLiteral$", GtGrammar.LoadParseFunc(Context, this, "ParseFloatLiteral"), TypeConst);

		NameSpace.AppendExtendedSyntax(".", 0, GtGrammar.LoadParseFunc(Context, this, "ParseGetter"), GtGrammar.LoadTypeFunc(Context, this, "TypeGetter"));
		NameSpace.AppendSyntax("$Setter$", null, GtGrammar.LoadTypeFunc(Context, this, "TypeSetter"));
		NameSpace.AppendSyntax("$MethodCall$", GtGrammar.LoadParseFunc(Context, this, "ParseApply"), GtGrammar.LoadTypeFunc(Context, this, "TypeMethodCall"));

		NameSpace.AppendSyntax("(", GtGrammar.LoadParseFunc(Context, this, "ParseGroup"), GtGrammar.LoadTypeFunc(Context, this, "TypeGroup"));
		NameSpace.AppendSyntax("(", GtGrammar.LoadParseFunc(Context, this, "ParseCast"), GtGrammar.LoadTypeFunc(Context, this, "TypeCast"));
		NameSpace.AppendExtendedSyntax("(", 0, GtGrammar.LoadParseFunc(Context, this, "ParseApply"), GtGrammar.LoadTypeFunc(Context, this, "TypeApply"));
		NameSpace.AppendSyntax("[", GtGrammar.LoadParseFunc(Context, this, "ParseArray"), GtGrammar.LoadTypeFunc(Context, this, "TypeArray"));
		NameSpace.AppendExtendedSyntax("[", 0, GtGrammar.LoadParseFunc(Context, this, "ParseIndexer"), GtGrammar.LoadTypeFunc(Context, this, "TypeIndexer"));
		NameSpace.AppendExtendedSyntax("[", 0, GtGrammar.LoadParseFunc(Context, this, "ParseSlice"), GtGrammar.LoadTypeFunc(Context, this, "TypeSlice"));
		NameSpace.AppendSyntax("|", GtGrammar.LoadParseFunc(Context, this, "ParseSize"), GtGrammar.LoadTypeFunc(Context, this, "TypeSize"));

		NameSpace.AppendSyntax("$Block$", GtGrammar.LoadParseFunc(Context, this, "ParseBlock"), null);
		NameSpace.AppendSyntax("$Statement$", GtGrammar.LoadParseFunc(Context, this, "ParseStatement"), null);
		NameSpace.AppendSyntax("$Expression$", GtGrammar.LoadParseFunc(Context, this, "ParseExpression"), null);
		NameSpace.AppendSyntax("$SuffixExpression$", GtGrammar.LoadParseFunc(Context, this, "ParseSuffixExpression"), null);

		NameSpace.AppendSyntax("$FuncName$", GtGrammar.LoadParseFunc(Context, this, "ParseFuncName"), TypeConst);
		NameSpace.AppendSyntax("$FuncDecl$", GtGrammar.LoadParseFunc(Context, this, "ParseFuncDecl"), GtGrammar.LoadTypeFunc(Context, this, "TypeFuncDecl"));
		NameSpace.AppendSyntax("$VarDecl$",  GtGrammar.LoadParseFunc(Context, this, "ParseVarDecl"), GtGrammar.LoadTypeFunc(Context, this, "TypeVarDecl"));

		NameSpace.AppendSyntax("null", GtGrammar.LoadParseFunc(Context, this, "ParseNull"), GtGrammar.LoadTypeFunc(Context, this, "TypeNull"));
		NameSpace.AppendSyntax("defined", GtGrammar.LoadParseFunc(Context, this, "ParseDefined"), GtGrammar.LoadTypeFunc(Context, this, "TypeDefined"));
		NameSpace.AppendSyntax("typeof", GtGrammar.LoadParseFunc(Context, this, "ParseTypeOf"), TypeConst);
		NameSpace.AppendSyntax("require", GtGrammar.LoadParseFunc(Context, this, "ParseRequire"), null);
		NameSpace.AppendSyntax("import", GtGrammar.LoadParseFunc(Context, this, "ParseImport"), GtGrammar.LoadTypeFunc(Context, this, "TypeImport"));

		NameSpace.AppendSyntax("if", GtGrammar.LoadParseFunc(Context, this, "ParseIf"), GtGrammar.LoadTypeFunc(Context, this, "TypeIf"));
		NameSpace.AppendSyntax("while", GtGrammar.LoadParseFunc(Context, this, "ParseWhile"), GtGrammar.LoadTypeFunc(Context, this, "TypeWhile"));
		NameSpace.AppendSyntax("do", GtGrammar.LoadParseFunc(Context, this, "ParseDoWhile"), GtGrammar.LoadTypeFunc(Context, this, "TypeDoWhile"));
		NameSpace.AppendSyntax("for", GtGrammar.LoadParseFunc(Context, this, "ParseFor"), GtGrammar.LoadTypeFunc(Context, this, "TypeFor"));
		NameSpace.AppendSyntax("for", GtGrammar.LoadParseFunc(Context, this, "ParseForEach"), GtGrammar.LoadTypeFunc(Context, this, "TypeForEach"));
		NameSpace.AppendSyntax("continue", GtGrammar.LoadParseFunc(Context, this, "ParseContinue"), GtGrammar.LoadTypeFunc(Context, this, "TypeContinue"));
		NameSpace.AppendSyntax("break", GtGrammar.LoadParseFunc(Context, this, "ParseBreak"), GtGrammar.LoadTypeFunc(Context, this, "TypeBreak"));
		NameSpace.AppendSyntax("return", GtGrammar.LoadParseFunc(Context, this, "ParseReturn"), GtGrammar.LoadTypeFunc(Context, this, "TypeReturn"));
		NameSpace.AppendSyntax("let const", GtGrammar.LoadParseFunc(Context, this, "ParseSymbolDecl"), null/*GtGrammar.LoadTypeFunc(ParserContext, this, "TypeSymbolDecl")*/);

		NameSpace.AppendSyntax("try", GtGrammar.LoadParseFunc(Context, this, "ParseTry"), GtGrammar.LoadTypeFunc(Context, this, "TypeTry"));
		NameSpace.AppendSyntax("throw", GtGrammar.LoadParseFunc(Context, this, "ParseThrow"), GtGrammar.LoadTypeFunc(Context, this, "TypeThrow"));

		NameSpace.AppendSyntax("class", GtGrammar.LoadParseFunc(Context, this, "ParseClassDecl2"), GtGrammar.LoadTypeFunc(Context, this, "TypeClassDecl2"));
		NameSpace.AppendSyntax("constructor", GtGrammar.LoadParseFunc(Context, this, "ParseConstructor2"), GtGrammar.LoadTypeFunc(Context, this, "TypeFuncDecl"));
		NameSpace.AppendSyntax("super", GtGrammar.LoadParseFunc(Context, this, "ParseSuper"), null);
		NameSpace.AppendSyntax("this", GtGrammar.LoadParseFunc(Context, this, "ParseThis"), GtGrammar.LoadTypeFunc(Context, this, "TypeThis"));
		NameSpace.AppendSyntax("new", GtGrammar.LoadParseFunc(Context, this, "ParseNew"), GtGrammar.LoadTypeFunc(Context, this, "TypeApply"));
		NameSpace.AppendSyntax("new", GtGrammar.LoadParseFunc(Context, this, "ParseNewArray"), GtGrammar.LoadTypeFunc(Context, this, "TypeNewArray"));

		NameSpace.AppendSyntax("enum", GtGrammar.LoadParseFunc(Context, this, "ParseEnum"), GtGrammar.LoadTypeFunc(Context, this, "TypeEnum"));
		NameSpace.AppendSyntax("switch", GtGrammar.LoadParseFunc(Context, this, "ParseSwitch"), GtGrammar.LoadTypeFunc(Context, this, "TypeSwitch"));
		NameSpace.AppendSyntax("$CaseBlock$", GtGrammar.LoadParseFunc(Context, this, "ParseCaseBlock"), null);

		// expermental
		NameSpace.AppendSyntax("__line__", GtGrammar.LoadParseFunc(Context, this, "ParseLine"), GtGrammar.LoadTypeFunc(Context, this, "TypeLine"));
		NameSpace.AppendSyntax("__", GtGrammar.LoadParseFunc(Context, this, "ParseSymbols"), null);
	}
}
