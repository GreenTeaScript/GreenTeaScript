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

//ifdef JAVA
package zen.grammar;
import java.util.ArrayList;

import zen.ast.GtAndNode;
import zen.ast.GtApplyNode;
import zen.ast.GtBinaryNode;
import zen.ast.GtBlockNode;
import zen.ast.GtBreakNode;
import zen.ast.GtCastNode;
import zen.ast.GtCatchNode;
import zen.ast.GtConstNode;
import zen.ast.GtErrorNode;
import zen.ast.GtFuncDeclNode;
import zen.ast.GtFunctionLiteralNode;
import zen.ast.GtGetLocalNode;
import zen.ast.GtGetterNode;
import zen.ast.GtGroupNode;
import zen.ast.GtIfNode;
import zen.ast.GtMethodCall;
import zen.ast.GtNode;
import zen.ast.GtNullNode;
import zen.ast.GtOrNode;
import zen.ast.GtParamNode;
import zen.ast.GtReturnNode;
import zen.ast.GtSetterNode;
import zen.ast.GtThrowNode;
import zen.ast.GtTryNode;
import zen.ast.GtTypeNode;
import zen.ast.GtUnaryNode;
import zen.ast.GtVarDeclNode;
import zen.ast.GtWhileNode;
import zen.deps.LibNative;
import zen.deps.LibZen;
import zen.parser.GtFunc;
import zen.parser.GtNameSpace;
import zen.parser.GtSyntaxPattern;
import zen.parser.GtToken;
import zen.parser.GtTokenContext;
import zen.parser.GtType;
import zen.parser.GtVariableInfo;
import zen.parser.ZenParserConst;
import zen.parser.ZenTypeSystem;

//endif VAJA

public class SugarlessGrammar {
	// Token
	public static long WhiteSpaceToken(GtTokenContext TokenContext, String SourceText, long pos) {
		TokenContext.FoundWhiteSpace();
		while(pos < SourceText.length()) {
			/*local*/char ch = LibZen.CharAt(SourceText, pos);
			if(ch == '\n' || !LibZen.IsWhitespace(SourceText, pos)) {
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
			if(!LibZen.IsWhitespace(SourceText, pos)) {
				break;
			}
			if(LibZen.CharAt(SourceText, pos) == '\n') {
				TokenContext.FoundLineFeed(1);
			}
			pos += 1;
		}
		/*local*/String Text = "";
		if(LineStart < pos) {
			Text = LibZen.SubString(SourceText, LineStart, pos);
		}
		TokenContext.AppendParsedToken(Text, ZenParserConst.IndentTokenFlag, null);
		return pos;
	}

	public static long SemiColonToken(GtTokenContext TokenContext, String SourceText, long pos) {
		TokenContext.AppendParsedToken(LibZen.SubString(SourceText, pos, (pos+1)), ZenParserConst.DelimTokenFlag, null);
		return pos+1;
	}

	public static long SymbolToken(GtTokenContext TokenContext, String SourceText, long pos) {
		/*local*/long start = pos;
		/*local*/String PresetPattern = null;
		while(pos < SourceText.length()) {
			if(!LibZen.IsVariableName(SourceText, pos) && !LibZen.IsDigit(SourceText, pos)) {
				break;
			}
			pos += 1;
		}
		TokenContext.AppendParsedToken(LibZen.SubString(SourceText, start, pos), ZenParserConst.NameSymbolTokenFlag, PresetPattern);
		return pos;
	}

	public static long OperatorToken(GtTokenContext TokenContext, String SourceText, long pos) {
		/*local*/long NextPos = pos + 1;
		while(NextPos < SourceText.length()) {
			if(LibZen.IsWhitespace(SourceText, NextPos) || LibZen.IsLetter(SourceText, NextPos) || LibZen.IsDigit(SourceText, NextPos)) {
				break;
			}
			NextPos += 1;
		}
		/*local*/boolean Matched = false;
		while(NextPos > pos) {
			/*local*/String Sub = LibZen.SubString(SourceText, pos, NextPos);
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
		TokenContext.AppendParsedToken(LibZen.SubString(SourceText, pos, NextPos), 0, null);
		return NextPos;
	}

	public static long CommentToken(GtTokenContext TokenContext, String SourceText, long pos) {
		/*local*/long NextPos = pos + 1;
		/*local*/char NextChar = LibZen.CharAt(SourceText, NextPos);
		if(NextChar != '/' && NextChar != '*') {
			return ZenParserConst.MismatchedPosition;
		}
		if(NextChar == '*') { // MultiLineComment
			// SourceMap ${file:line}
			if(LibZen.CharAt(SourceText, NextPos+1) == '$' && LibZen.CharAt(SourceText, NextPos+2) == '{') {
				/*local*/long StartPos = NextPos + 3;
				NextPos += 3;
				while(NextChar != 0) {
					NextChar = LibZen.CharAt(SourceText, NextPos);
					if(NextChar == '}') {
						TokenContext.SetSourceMap(LibZen.SubString(SourceText, StartPos, NextPos));
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
				NextChar = LibZen.CharAt(SourceText, NextPos);
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
				NextChar = LibZen.CharAt(SourceText, NextPos);
				if(NextChar == '\n') {
					break;
				}
				NextPos = NextPos + 1;
			}
			return SugarlessGrammar.IndentToken(TokenContext, SourceText, NextPos);
		}
		return ZenParserConst.MismatchedPosition;
	}

	public static long NumberLiteralToken(GtTokenContext TokenContext, String SourceText, long pos) {
		/*local*/long start = pos;
		/*local*/long LastMatchedPos = pos;
		while(pos < SourceText.length()) {
			if(!LibZen.IsDigit(SourceText, pos)) {
				break;
			}
			pos += 1;
		}
		LastMatchedPos = pos;
		/*local*/char ch = LibZen.CharAt(SourceText, pos);
		if(ch != '.' && ch != 'e' && ch != 'E') {
			TokenContext.AppendParsedToken(LibZen.SubString(SourceText, start, pos), 0, "$IntegerLiteral$");
			return pos;
		}
		if(ch == '.') {
			pos += 1;
			while(pos < SourceText.length()) {
				if(!LibZen.IsDigit(SourceText, pos)) {
					break;
				}
				pos += 1;
			}
		}
		ch = LibZen.CharAt(SourceText, pos);
		if(ch == 'e' || ch == 'E') {
			pos += 1;
			ch = LibZen.CharAt(SourceText, pos);
			if(ch == '+' || ch == '-') {
				pos += 1;
				ch = LibZen.CharAt(SourceText, pos);
			}
			/*local*/long saved = pos;
			while(pos < SourceText.length()) {
				if(!LibZen.IsDigit(SourceText, pos)) {
					break;
				}
				pos += 1;
			}
			if(saved == pos) {
				pos = LastMatchedPos;
			}
		}
		TokenContext.AppendParsedToken(LibZen.SubString(SourceText, start, pos), 0, "$FloatLiteral$");
		return pos;
	}

//	public static long CharLiteralToken(GtTokenContext TokenContext, String SourceText, long pos) {
//		/*local*/long start = pos;
//		/*local*/char prev = '\'';
//		pos = pos + 1; // eat "\'"
//		while(pos < SourceText.length()) {
//			/*local*/char ch = LibZen.CharAt(SourceText, pos);
//			if(ch == '\'' && prev != '\\') {
//				TokenContext.AddNewToken(LibZen.SubString(SourceText, start, (pos + 1)), GreenTeaConsts.QuotedTokenFlag, "$CharLiteral$");
//				return pos + 1;
//			}
//			if(ch == '\n') {
//				TokenContext.ReportTokenError1(GreenTeaConsts.ErrorLevel, "expected ' to close the charctor literal", LibZen.SubString(SourceText, start, pos));
//				TokenContext.FoundLineFeed(1);
//				return pos;
//			}
//			pos = pos + 1;
//			prev = ch;
//		}
//		TokenContext.ReportTokenError1(GreenTeaConsts.ErrorLevel, "expected ' to close the charctor literal", LibZen.SubString(SourceText, start, pos));
//		return pos;
//	}

	private static long SkipBackSlashOrNewLineOrDoubleQuote( String SourceText, long pos) {
		while(pos < SourceText.length()) {
			/*local*/char ch = LibZen.CharAt(SourceText, pos);
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
			pos = SugarlessGrammar.SkipBackSlashOrNewLineOrDoubleQuote(SourceText, pos);
			/*local*/char ch = LibZen.CharAt(SourceText, pos);
			if(ch == '\\') {
				if(pos + 1 < SourceText.length()) {
					/*local*/char NextChar = LibZen.CharAt(SourceText, pos + 1);
					if(NextChar == 'u') { // \u12345
						while(pos < SourceText.length()) {
							if(!LibZen.IsDigit(SourceText, pos)) {
								break;
							}
							pos += 1;
						}
					}
				}
				pos = pos + 1;
			}
			if(ch == '"') {
				TokenContext.AppendParsedToken(LibZen.SubString(SourceText, start, (pos + 1)), ZenParserConst.QuotedTokenFlag, "$StringLiteral$");
				return pos + 1;
			}
			if(ch == '\n') {
				TokenContext.ReportTokenError1(ZenParserConst.ErrorLevel, "expected \" to close the string literal", LibZen.SubString(SourceText, start, pos));
				TokenContext.FoundLineFeed(1);
				return pos;
			}
			pos = pos + 1;
		}
		TokenContext.ReportTokenError1(ZenParserConst.ErrorLevel, "expected \" to close the string literal", LibZen.SubString(SourceText, start, pos));
		return pos;
	}

	// Match 

	public static GtNode MatchNull(GtNameSpace NameSpace, GtTokenContext TokenContext, GtNode LeftNode) {
		return new GtNullNode(TokenContext.Next());
	}

	public static GtNode MatchTrue(GtNameSpace NameSpace, GtTokenContext TokenContext, GtNode LeftNode) {
		return NameSpace.Generator.CreateBooleanNode(TokenContext.Next(), true);
	}

	public static GtNode MatchFalse(GtNameSpace NameSpace, GtTokenContext TokenContext, GtNode LeftNode) {
		return NameSpace.Generator.CreateBooleanNode(TokenContext.Next(), false);
	}

	public static GtNode MatchIntLiteral(GtNameSpace NameSpace, GtTokenContext TokenContext, GtNode LeftNode) {
		/*local*/GtToken Token = TokenContext.Next();
		return NameSpace.Generator.CreateIntNode(Token, LibZen.ParseInt(Token.ParsedText));
	}

	public static GtNode MatchFloatLiteral(GtNameSpace NameSpace, GtTokenContext TokenContext, GtNode LeftNode) {
		/*local*/GtToken Token = TokenContext.Next();
		return NameSpace.Generator.CreateFloatNode(Token, LibZen.ParseFloat(Token.ParsedText));
	}

	public static GtNode MatchStringLiteral(GtNameSpace NameSpace, GtTokenContext TokenContext, GtNode LeftNode) {
		/*local*/GtToken Token = TokenContext.Next();
		return NameSpace.Generator.CreateStringNode(Token, LibZen.UnquoteString(Token.ParsedText));
	}

	public static GtNode MatchType(GtNameSpace NameSpace, GtTokenContext TokenContext, GtNode LeftNode) {
		/*local*/GtToken Token = TokenContext.Next();
		/*local*/GtType Type = NameSpace.GetType(Token.ParsedText);
		if(Type != null) {
			GtNode TypeNode = new GtTypeNode(Token, Type);
			return TokenContext.ParsePatternAfter(NameSpace, TypeNode, "$TypeSuffix$", ZenParserConst.Optional);
		}
		return null; // Not Matched
	}

	public static GtNode MatchTypeSuffix(GtNameSpace NameSpace, GtTokenContext TokenContext, GtNode LeftNode) {
		GtTypeNode TypeNode = (GtTypeNode) LeftNode;
		if(TypeNode.Type.IsGenericType()) {
			if(TokenContext.MatchToken("<")) {  // Generics
				/*local*/ArrayList<GtType> TypeList = new ArrayList<GtType>();
				while(!TokenContext.StartsWithToken(">")) {
					if(TypeList.size() > 0 && !TokenContext.MatchToken(",")) {
						return null;
					}
					/*local*/GtTypeNode ParamTypeNode = (GtTypeNode) TokenContext.ParsePattern(NameSpace, "$Type$", ZenParserConst.Optional);
					if(ParamTypeNode == null) {
						return TypeNode;
					}
					TypeList.add(ParamTypeNode.Type);
				}
				TypeNode.Type = ZenTypeSystem.GetGenericType(TypeNode.Type, 0, TypeList, true);
			}
		}
		while(TokenContext.MatchToken("[")) {  // Array
			if(!TokenContext.MatchToken("]")) {
				return null;
			}
			TypeNode.Type = ZenTypeSystem.GetGenericType1(ZenTypeSystem.ArrayType, TypeNode.Type, true);
		}
		return TypeNode;
	}

	public static GtNode MatchSymbol(GtNameSpace NameSpace, GtTokenContext TokenContext, GtNode LeftNode) {
		/*local*/GtToken Token = TokenContext.Next();
		if(!Token.IsNameSymbol()) {
			return TokenContext.CreateExpectedErrorNode(Token, "identifier");
		}
		/*local*/GtNode AssignedNode = null;
		if(TokenContext.MatchToken("=")) {
			AssignedNode = TokenContext.ParsePattern(NameSpace, "$Expression$", ZenParserConst.Required);
			if(AssignedNode.IsErrorNode()) {
				return AssignedNode;
			}
		}
		/*local*/Object ConstValue = NameSpace.GetSymbol(Token.ParsedText);
		if(ConstValue instanceof GtVariableInfo) {
			GtVariableInfo Var = (GtVariableInfo) ConstValue;
			return NameSpace.Generator.CreateSymbolNode(Token, Var.Type, Var.NativeName, Var.IsCaptured(NameSpace), AssignedNode);
		}
		if(ConstValue != null) {
			if(AssignedNode != null) {
				return new GtErrorNode(Token, "cannot be assigned");
			}
			return NameSpace.Generator.CreateConstNode(Token, ConstValue);
		}
		return NameSpace.Generator.CreateSymbolNode(Token, ZenTypeSystem.VarType, Token.ParsedText, false/*captured*/, AssignedNode);
	}

	// PatternName: "("  (1)
	public static GtNode MatchGroup(GtNameSpace NameSpace, GtTokenContext TokenContext, GtNode LeftNode) {
		/*local*/GtNode GroupNode = new GtGroupNode();
		TokenContext.Push();
		GroupNode = TokenContext.MatchNodeToken(GroupNode, NameSpace, "(", ZenParserConst.Required | ZenParserConst.AllowSkipIndent);
		GroupNode = TokenContext.AppendMatchedPattern(GroupNode, NameSpace, "$Expression$", ZenParserConst.Required);
		GroupNode = TokenContext.MatchNodeToken(GroupNode, NameSpace, ")", ZenParserConst.Required);
		TokenContext.Pop();
		return GroupNode;
	}
	
	public static GtNode MatchCast(GtNameSpace NameSpace, GtTokenContext TokenContext, GtNode LeftNode) {
		/*local*/GtNode CastNode = new GtCastNode();
		CastNode = TokenContext.MatchNodeToken(CastNode, NameSpace, "(", ZenParserConst.Required | ZenParserConst.AllowSkipIndent);
		CastNode = TokenContext.AppendMatchedPattern(CastNode, NameSpace, "$Type$", ZenParserConst.Required);
		CastNode = TokenContext.MatchNodeToken(CastNode, NameSpace, ")", ZenParserConst.Required);
		CastNode = TokenContext.AppendMatchedPattern(CastNode, NameSpace, "$SuffixExpression$", ZenParserConst.Required);
		return CastNode;
	}

	public static GtNode MatchGetter(GtNameSpace NameSpace, GtTokenContext TokenContext, GtNode LeftNode) {
		TokenContext.MatchToken(".");
		/*local*/GtToken Token = TokenContext.Next();
		if(!Token.IsNameSymbol()) {
			return TokenContext.CreateExpectedErrorNode(Token, "field name");
		}
		if(TokenContext.MatchToken("(")) {  // method call
			/*local*/GtNode ApplyNode = new GtMethodCall(Token, LeftNode, Token.ParsedText);
			if(!TokenContext.MatchToken(")")) {
				while(!ApplyNode.IsErrorNode()) {
					ApplyNode = TokenContext.AppendMatchedPattern(ApplyNode, NameSpace, "$Expression$", ZenParserConst.Required);
					if(TokenContext.MatchToken(")")) {
						break;
					}
					ApplyNode = TokenContext.MatchNodeToken(ApplyNode, NameSpace, ",", ZenParserConst.Required | ZenParserConst.DisallowSkipIndent);
				}
			}
			return ApplyNode;
		}
		if(TokenContext.MatchToken("=")) {
			GtNode SetterNode = new GtSetterNode(Token, LeftNode, Token.ParsedText);
			SetterNode = TokenContext.AppendMatchedPattern(SetterNode, NameSpace, "$Expression$", ZenParserConst.Required);
			return SetterNode;
		}
		else {
			return new GtGetterNode(Token, LeftNode, Token.ParsedText);
		}
	}
	
	public static GtNode MatchApply(GtNameSpace NameSpace, GtTokenContext TokenContext, GtNode LeftNode) {
		/*local*/GtNode ApplyNode = new GtApplyNode(LeftNode);
		ApplyNode = TokenContext.MatchNodeToken(ApplyNode, NameSpace, "(", ZenParserConst.Required | ZenParserConst.AllowSkipIndent);
		if(!TokenContext.MatchToken(")")) {
			while(!ApplyNode.IsErrorNode()) {
				ApplyNode = TokenContext.AppendMatchedPattern(ApplyNode, NameSpace, "$Expression$", ZenParserConst.Required);
				if(TokenContext.MatchToken(")")) {
					break;
				}
				ApplyNode = TokenContext.MatchNodeToken(ApplyNode, NameSpace, ",", ZenParserConst.Required | ZenParserConst.DisallowSkipIndent);
			}
		}
		return ApplyNode;
	}

	public static GtNode MatchUnary(GtNameSpace NameSpace, GtTokenContext TokenContext, GtNode LeftNode) {
		/*local*/GtNode UnaryNode = new GtUnaryNode(TokenContext.Next());
		return TokenContext.AppendMatchedPattern(UnaryNode, NameSpace, "$SuffixExpression$", ZenParserConst.Required);
	}

	public static GtNode MatchNot(GtNameSpace NameSpace, GtTokenContext TokenContext, GtNode LeftNode) {
		/*local*/GtNode UnaryNode = new GtUnaryNode(TokenContext.Next());
		UnaryNode = TokenContext.AppendMatchedPattern(UnaryNode, NameSpace, "$SuffixExpression$", ZenParserConst.Required);
		return UnaryNode;
	}
	
	private static GtNode RightJoin(GtNameSpace NameSpace, GtNode LeftNode, GtSyntaxPattern Pattern, GtToken Token, GtBinaryNode RightNode) {
		/*local*/GtNode RightLeftNode = RightNode.LeftNode;
		if(RightLeftNode instanceof GtBinaryNode && Pattern.IsRightJoin(((GtBinaryNode)RightLeftNode).Pattern)) {
			RightNode.LeftNode = SugarlessGrammar.RightJoin(NameSpace, LeftNode, Pattern, Token, (GtBinaryNode) RightLeftNode);
		}
		else {
			/*local*/GtBinaryNode BinaryNode = new GtBinaryNode(Token, LeftNode, Pattern);
			BinaryNode.Append(RightLeftNode);
			RightNode.LeftNode = BinaryNode;
			RightNode.SetChild(BinaryNode);
		}
		return RightNode;
	}
 
	public static GtNode MatchBinary(GtNameSpace NameSpace, GtTokenContext TokenContext, GtNode LeftNode) {
		/*local*/GtToken Token = TokenContext.Next();
		/*local*/GtNode RightNode = TokenContext.ParsePattern(NameSpace, "$Expression$", ZenParserConst.Required);
		if(RightNode.IsErrorNode()) {
			return RightNode;
		}
		/*local*/GtSyntaxPattern Pattern = NameSpace.GetExtendedSyntaxPattern(Token.ParsedText);  // FIXME
		if(RightNode instanceof GtBinaryNode && Pattern.IsRightJoin(((GtBinaryNode)RightNode).Pattern)) {
			return SugarlessGrammar.RightJoin(NameSpace, LeftNode, Pattern, Token, (GtBinaryNode) RightNode);
		}
		// LeftJoin
		/*local*/GtBinaryNode BinaryNode = new GtBinaryNode(Token, LeftNode, Pattern);
		BinaryNode.Append(RightNode);
//		if(RightNode.NextNode != null) {  // necesarry; don't remove
//			GtNode.LinkNode(BinaryNode, RightNode.NextNode);
//			RightNode.NextNode = null;
//		}
		return BinaryNode;
	}

	public static GtNode MatchSuffixExpression(GtNameSpace NameSpace, GtTokenContext TokenContext, GtNode LeftNode) {
		GtSyntaxPattern Pattern = TokenContext.GetFirstPattern(NameSpace);
		LeftNode = GtSyntaxPattern.ApplyMatchPattern(NameSpace, TokenContext, LeftNode, Pattern);
		while(LeftNode != null) {
			/*local*/GtSyntaxPattern SuffixPattern = TokenContext.GetSuffixPattern(NameSpace);
			if(SuffixPattern == null || SuffixPattern.IsBinaryOperator()) {
				break;
			}
			LeftNode = GtSyntaxPattern.ApplyMatchPattern(NameSpace, TokenContext, LeftNode, SuffixPattern);
		}
		return LeftNode;
	}

	public static GtNode MatchAnd(GtNameSpace NameSpace, GtTokenContext TokenContext, GtNode LeftNode) {
		/*local*/GtNode BinaryNode = new GtAndNode(TokenContext.Next(), LeftNode, NameSpace.GetSyntaxPattern("&&"));
		BinaryNode = TokenContext.AppendMatchedPattern(BinaryNode, NameSpace, "$Expression$", ZenParserConst.Required);
		return BinaryNode;
	}

	public static GtNode MatchOr(GtNameSpace NameSpace, GtTokenContext TokenContext, GtNode LeftNode) {
		/*local*/GtNode BinaryNode = new GtOrNode(TokenContext.Next(), LeftNode, NameSpace.GetSyntaxPattern("||"));
		BinaryNode = TokenContext.AppendMatchedPattern(BinaryNode, NameSpace, "$Expression$", ZenParserConst.Required);
		return BinaryNode;
	}

	public static GtNode MatchExpression(GtNameSpace NameSpace, GtTokenContext TokenContext, GtNode LeftNode) {
		GtSyntaxPattern Pattern = TokenContext.GetFirstPattern(NameSpace);
		LeftNode = GtSyntaxPattern.ApplyMatchPattern(NameSpace, TokenContext, LeftNode, Pattern);
		while(LeftNode != null) {
			/*local*/GtSyntaxPattern SuffixPattern = TokenContext.GetSuffixPattern(NameSpace);
			if(SuffixPattern == null) {
				break;
			}
			LeftNode = GtSyntaxPattern.ApplyMatchPattern(NameSpace, TokenContext, LeftNode, SuffixPattern);
		}
		return LeftNode;
	}

	public static GtNode MatchIf(GtNameSpace NameSpace, GtTokenContext TokenContext, GtNode LeftNode) {
		/*local*/GtNode IfNode = new GtIfNode();
		IfNode = TokenContext.MatchNodeToken(IfNode, NameSpace, "if", ZenParserConst.Required);
		IfNode = TokenContext.MatchNodeToken(IfNode, NameSpace, "(", ZenParserConst.Required | ZenParserConst.AllowSkipIndent);
		IfNode = TokenContext.AppendMatchedPattern(IfNode, NameSpace, "$Expression$", ZenParserConst.Required);
		IfNode = TokenContext.MatchNodeToken(IfNode, NameSpace, ")", ZenParserConst.Required | ZenParserConst.DisallowSkipIndent);
		IfNode = TokenContext.AppendMatchedPattern(IfNode, NameSpace, "$Block$", ZenParserConst.Required);
		if(TokenContext.MatchNewLineToken("else")) {
			IfNode = TokenContext.AppendMatchedPattern(IfNode, NameSpace, "$Block$", ZenParserConst.Required);
		}
		return IfNode;
	}

	public static GtNode MatchReturn(GtNameSpace NameSpace, GtTokenContext TokenContext, GtNode LeftNode) {
		/*local*/GtNode ReturnNode = new GtReturnNode();
		ReturnNode = TokenContext.MatchNodeToken(ReturnNode, NameSpace, "return", ZenParserConst.Required);
		ReturnNode = TokenContext.AppendMatchedPattern(ReturnNode, NameSpace, "$Expression$", ZenParserConst.Optional);
		return ReturnNode;
	}

	public static GtNode MatchWhile(GtNameSpace NameSpace, GtTokenContext TokenContext, GtNode LeftNode) {
		/*local*/GtNode WhileNode = new GtWhileNode();
		WhileNode = TokenContext.MatchNodeToken(WhileNode, NameSpace, "while", ZenParserConst.Required);
		WhileNode = TokenContext.MatchNodeToken(WhileNode, NameSpace, "(", ZenParserConst.Required | ZenParserConst.AllowSkipIndent);
		WhileNode = TokenContext.AppendMatchedPattern(WhileNode, NameSpace, "$Expression$", ZenParserConst.Required);
		WhileNode = TokenContext.MatchNodeToken(WhileNode, NameSpace, ")", ZenParserConst.Required | ZenParserConst.DisallowSkipIndent);
		WhileNode = TokenContext.AppendMatchedPattern(WhileNode, NameSpace, "$Block$", ZenParserConst.Required);
		return WhileNode;
	}

	public static GtNode MatchBreak(GtNameSpace NameSpace, GtTokenContext TokenContext, GtNode LeftNode) {
		/*local*/GtNode BreakNode = new GtBreakNode();
		BreakNode = TokenContext.MatchNodeToken(BreakNode, NameSpace, "break", ZenParserConst.Required);
		return BreakNode;
	}

	public static GtNode MatchCatch(GtNameSpace NameSpace, GtTokenContext TokenContext, GtNode LeftNode) {
		/*local*/GtNode CatchNode = new GtCatchNode();
		CatchNode = TokenContext.MatchNodeToken(CatchNode, NameSpace, "catch", ZenParserConst.Required);
		CatchNode = TokenContext.MatchNodeToken(CatchNode, NameSpace, "(", ZenParserConst.Required | ZenParserConst.AllowSkipIndent);
		CatchNode = TokenContext.AppendMatchedPattern(CatchNode, NameSpace, "$Identifier$", ZenParserConst.Required);
		CatchNode = TokenContext.AppendMatchedPattern(CatchNode, NameSpace, "$TypeAnnotation$", ZenParserConst.Optional);	
		CatchNode = TokenContext.MatchNodeToken(CatchNode, NameSpace, ")", ZenParserConst.Required | ZenParserConst.DisallowSkipIndent);
		CatchNode = TokenContext.AppendMatchedPattern(CatchNode, NameSpace, "$Block$", ZenParserConst.Required);
		return CatchNode;
	}
	
	public static GtNode MatchTry(GtNameSpace NameSpace, GtTokenContext TokenContext, GtNode LeftNode) {
		/*local*/GtNode TryNode = new GtTryNode();
		TryNode = TokenContext.MatchNodeToken(TryNode, NameSpace, "try", ZenParserConst.Required);
		TryNode = TokenContext.AppendMatchedPattern(TryNode, NameSpace, "$Block$", ZenParserConst.Required);
		while(TokenContext.IsNewLineToken("catch")) {
			TryNode = TokenContext.AppendMatchedPattern(TryNode, NameSpace, "$Catch$", ZenParserConst.Required);
		}
		if(TokenContext.MatchNewLineToken("finally")) {
			TryNode = TokenContext.AppendMatchedPattern(TryNode, NameSpace, "$Block$", ZenParserConst.Required);
		}
		return TryNode;
	}

	public static GtNode MatchThrow(GtNameSpace NameSpace, GtTokenContext TokenContext, GtNode LeftNode) {
		/*local*/GtNode ThrowNode = new GtThrowNode();
		ThrowNode = TokenContext.MatchNodeToken(ThrowNode, NameSpace, "throw", ZenParserConst.Required);
		ThrowNode = TokenContext.AppendMatchedPattern(ThrowNode, NameSpace, "$Expression$", ZenParserConst.Required);
		return ThrowNode;
	}

//	public static GtNode TypeTry(GtTypeEnv Gamma, GtSyntaxTree ParsedTree, GtType ContextType) {
//		/*local*/GtNode TryNode = ParsedTree.TypeCheckAt(GreenTeaConsts.TryBody, Gamma, GtStaticTable.VoidType, GreenTeaConsts.DefaultTypeCheckPolicy);
//		/*local*/GtNode FinallyNode = ParsedTree.TypeCheckAt(GreenTeaConsts.FinallyBody, Gamma, GtStaticTable.VoidType, GreenTeaConsts.DefaultTypeCheckPolicy);
//		GtNode Node = Gamma.Generator.CreateTryNode(TryNode.Type, ParsedTree, TryNode, FinallyNode);
//		if(ParsedTree.HasNodeAt(GreenTeaConsts.CatchVariable)) {
//			GtSyntaxTree CatchTree = ParsedTree.GetSyntaxTreeAt(GreenTeaConsts.CatchVariable);
//			/*local*/String CatchName = CatchTree.GetSyntaxTreeAt(GreenTeaConsts.VarDeclName).KeyToken.ParsedText;
//			/*local*/GtType CatchType = CatchTree.GetSyntaxTreeAt(GreenTeaConsts.VarDeclType).GetParsedType();
//			//FIXME we need to add CatchName into LocalVariable
//			/*local*/GtNode BodyNode = ParsedTree.TypeCheckAt(GreenTeaConsts.CatchBody, Gamma, GtStaticTable.VoidType, GreenTeaConsts.DefaultTypeCheckPolicy);
//			Node.Append(Gamma.Generator.CreateCatchNode(GtStaticTable.VoidType, ParsedTree, CatchType, CatchName, BodyNode));
//		}
//		return Node;
//	}

//	// throw $Expr$
//	public static GtSyntaxTree ParseThrow(GtNameSpace NameSpace, GtTokenContext TokenContext, GtSyntaxTree LeftNode, GtSyntaxPattern Pattern) {
//		/*local*/GtSyntaxTree ThrowTree = TokenContext.CreateMatchedSyntaxTree(NameSpace, Pattern, "throw");
//		ThrowTree.SetMatchedPatternAt(GreenTeaConsts.ReturnExpr, NameSpace, TokenContext, "$Expression$", GreenTeaConsts.Required);
//		return ThrowTree;
//	}
//
//	public static GtNode TypeThrow(GtTypeEnv Gamma, GtSyntaxTree ParsedTree, GtType ContextType) {
//		ParsedTree.NextTree = null;
//		/*local*/GtType FaultType = ContextType; // FIXME Gamma.FaultType;
//		/*local*/GtNode ExprNode = ParsedTree.TypeCheckAt(GreenTeaConsts.ReturnExpr, Gamma, FaultType, GreenTeaConsts.DefaultTypeCheckPolicy);
//		return Gamma.Generator.CreateThrowNode(ExprNode.Type, ParsedTree, ExprNode);
//	}

	
	public static GtNode MatchLetDecl(GtNameSpace NameSpace, GtTokenContext TokenContext, GtNode LeftNode) {
		GtToken SourceToken = TokenContext.Next(); /* let */
		GtToken SymbolToken = TokenContext.Next(); /* name */
		/*local*/GtType ConstClass = null;
		if(TokenContext.MatchToken(".")) {
			/*local*/String ClassName = SymbolToken.ParsedText;
			ConstClass = NameSpace.GetType(ClassName);
			if(ConstClass == null) {
				return new GtErrorNode(SymbolToken, "unknown type: " + ClassName);
			}
			SymbolToken = TokenContext.Next(); /* class name */
		}
		if(!TokenContext.MatchToken("=")) {
			return TokenContext.CreateExpectedErrorNode(SymbolToken, "=");
		}
		GtNode ValueNode = TokenContext.ParsePattern(NameSpace, "$Expression$", ZenParserConst.Required);
		
		if(!ValueNode.IsErrorNode()) {
			/*local*/String ConstName = SymbolToken.ParsedText;
			if(ConstClass != null) {
				ConstName = GtNameSpace.ClassStaticSymbol(ConstClass, ConstName);
				SourceToken.AddTypeInfoToErrorMessage(ConstClass);
			}
			ValueNode = NameSpace.TypeCheck(ValueNode, NameSpace.GetSymbolType(ConstName), ZenParserConst.DefaultTypeCheckPolicy);
			GtConstNode ConstNode = ValueNode.ToConstNode(true);
			if(!ConstNode.IsErrorNode()) {
//				/*local*/int NameSpaceFlag = KonohaGrammar.ParseNameSpaceFlag(0, TokenContext.ParsingAnnotation);
//				/*local*/GtNameSpace StoreNameSpace = NameSpace.GetNameSpace(NameSpaceFlag);
				NameSpace.SetSymbol(ConstName, ConstNode.GetValue(), SourceToken);
				return ConstNode.Done();
			}
			return ConstNode;
		}
		return ValueNode;
	}

	public static GtNode MatchIdentifier(GtNameSpace NameSpace, GtTokenContext TokenContext, GtNode LeftNode) {
		/*local*/GtToken Token = TokenContext.Next();
		if(LibZen.IsVariableName(Token.ParsedText, 0)) {
			return new GtGetLocalNode(ZenTypeSystem.VarType, Token, Token.ParsedText);
		}
		return new GtErrorNode(Token, "illegal name:" + Token.ParsedText);
	}	

	public static GtNode MatchTypeAnnotation(GtNameSpace NameSpace, GtTokenContext TokenContext, GtNode LeftNode) {
		if(TokenContext.MatchToken(":")) {
			return TokenContext.ParsePattern(NameSpace, "$Type$", ZenParserConst.Required);
		}
		return null;
	}
	
	// "var" $Identifier [: $Type$] "=" $Expression$ 
	public static GtNode MatchVarDecl(GtNameSpace NameSpace, GtTokenContext TokenContext, GtNode LeftNode) {
		/*local*/GtNode VarNode = new GtVarDeclNode();
		VarNode = TokenContext.MatchNodeToken(VarNode, NameSpace, "var", ZenParserConst.Required);
		VarNode = TokenContext.AppendMatchedPattern(VarNode, NameSpace, "$Idenifier$", ZenParserConst.Required);
		VarNode = TokenContext.AppendMatchedPattern(VarNode, NameSpace, "$TypeAnnotation$", ZenParserConst.Optional);
		VarNode = TokenContext.MatchNodeToken(VarNode, NameSpace, "=", ZenParserConst.Required);
		VarNode = TokenContext.AppendMatchedPattern(VarNode, NameSpace, "$Expression$", ZenParserConst.Required);
		return VarNode;
	}	

	// FuncDecl
	public static GtNode MatchParam(GtNameSpace NameSpace, GtTokenContext TokenContext, GtNode LeftNode) {
		/*local*/GtToken NameToken = TokenContext.Next();
		if(!NameToken.IsNameSymbol()) {
			return TokenContext.CreateExpectedErrorNode(NameToken, "parameter name");
		}
		GtNode VarNode = new GtParamNode(ZenTypeSystem.VarType, NameToken, NameToken.ParsedText);
		VarNode = TokenContext.AppendMatchedPattern(VarNode, NameSpace, "$TypeAnnotation$", ZenParserConst.Optional);
		return VarNode;
	}
	
	public static GtNode MatchFunction(GtNameSpace NameSpace, GtTokenContext TokenContext, GtNode LeftNode) {
		/*local*/GtToken FuncToken = TokenContext.Next(); /* function*/
		/*local*/GtNode FuncNode;
		if(TokenContext.IsToken("(")) {
			FuncNode = new GtFunctionLiteralNode(FuncToken);
		}
		else {
			/*local*/GtToken NameToken = TokenContext.Next();
			FuncNode = new GtFuncDeclNode(FuncToken, NameSpace, NameToken.ParsedText);
		}
		FuncNode = TokenContext.MatchNodeToken(FuncNode,  NameSpace, "(", ZenParserConst.Required | ZenParserConst.AllowSkipIndent);
		if(!TokenContext.MatchToken(")")) {
			while(!FuncNode.IsErrorNode()) {
				FuncNode = TokenContext.AppendMatchedPattern(FuncNode, NameSpace, "$Param$", ZenParserConst.Required);
				if(TokenContext.MatchToken(")")) {
					break;
				}
				FuncNode = TokenContext.MatchNodeToken(FuncNode,  NameSpace, ",", ZenParserConst.Required);
			}
		}
		FuncNode = TokenContext.AppendMatchedPattern(FuncNode, NameSpace, "$TypeAnnotation$", ZenParserConst.Optional);
		FuncNode = TokenContext.AppendMatchedPattern(FuncNode, NameSpace, "$Block$", ZenParserConst.Optional);
		return FuncNode;
	}

	public static GtNode MatchStatement(GtNameSpace NameSpace, GtTokenContext TokenContext, GtNode LeftNode) {
		TokenContext.SkipAndGetAnnotation(true);
		/*local*/GtNode ParsedNode = TokenContext.ParsePattern(NameSpace, "$Expression$", ZenParserConst.Required);
		if(!ParsedNode.IsErrorNode() && TokenContext.HasNext()) {
			GtToken Token = TokenContext.Next();
			if(!Token.IsDelim() || !Token.IsIndent()) {
				return TokenContext.CreateExpectedErrorNode(Token, ";");
			}
		}
		return LeftNode;
	}

	public static GtNode MatchBlock(GtNameSpace NameSpace, GtTokenContext TokenContext, GtNode LeftNode) {
		TokenContext.SkipIndent();
		if(TokenContext.IsToken("{")) {
			GtToken IndentToken = TokenContext.GetCurrentIndentToken();
			/*local*/GtNameSpace BlockNameSpace = NameSpace.CreateSubNameSpace();
			GtBlockNode BlockNode = new GtBlockNode(TokenContext.Next(), BlockNameSpace);
			while(TokenContext.HasNext()) {
				TokenContext.SkipEmptyStatement();
				if(TokenContext.MatchToken("}")) {
					break;
				}
				/*local*/GtNode ParsedNode = TokenContext.ParsePattern(BlockNameSpace, "$Statement$", ZenParserConst.Required);
				BlockNode.Append(ParsedNode);
				if(ParsedNode.IsErrorNode()) {
					TokenContext.SkipUntilIndent(IndentToken);
					TokenContext.MatchToken("}");
					break;
				}
			}
			return BlockNode;
		}
		return TokenContext.CreateExpectedErrorNode(null, "block");
	}
	
//	public static GtSyntaxTree ParseError(GtNameSpace NameSpace, GtTokenContext TokenContext, GtSyntaxTree LeftNode, GtSyntaxPattern Pattern) {
//	return new GtSyntaxTree(Pattern, NameSpace, TokenContext.GetToken(), null);
//}
//
//public static GtNode TypeError(GtTypeEnv Gamma, GtSyntaxTree ParsedTree, GtType Type) {
//	return Gamma.Generator.CreateErrorNode(GtStaticTable.VoidType, ParsedTree);
//}

//public static GtSyntaxTree ParseRequire(GtNameSpace NameSpace, GtTokenContext TokenContext, GtSyntaxTree LeftNode, GtSyntaxPattern Pattern) {
//	TokenContext.Next(); // skipped first token "require";
//	while(TokenContext.HasNext()) {
//		/*local*/GtToken Token = TokenContext.Next();
//		if(Token.IsIndent() || Token.IsDelim()) {
//			break;
//		}
//		if(Token.IsNameSymbol()) {
//			if(!NameSpace.LoadRequiredLib(Token.ParsedText)) {
//				return TokenContext.NewErrorSyntaxTree(Token, "failed to load required library: " + Token.ParsedText);
//			}
//		}
//		if(TokenContext.MatchToken(",")) {
//			continue;
//		}
//	}
//	return KonohaGrammar.ParseEmpty(NameSpace, TokenContext, LeftNode, Pattern);
//}
//
//private static String ParseJoinedName(GtTokenContext TokenContext) {
//	/*local*/GtToken Token = TokenContext.Next();
//	/*local*/String PackageName = LibZen.UnquoteString(Token.ParsedText);
//	while(TokenContext.HasNext()) {
//		Token = TokenContext.Next();
//		if(Token.IsNameSymbol() || LibZen.EqualsString(Token.ParsedText, ".")) {
//			PackageName += Token.ParsedText;
//			continue;
//		}
//		break;
//	}
//	return PackageName;
//}
//
//public static GtSyntaxTree ParseImport(GtNameSpace NameSpace, GtTokenContext TokenContext, GtSyntaxTree LeftNode, GtSyntaxPattern Pattern) {
//	/*local*/GtSyntaxTree ImportTree = TokenContext.CreateMatchedSyntaxTree(NameSpace, Pattern, "import");
//	/*local*/String PackageName = KonohaGrammar.ParseJoinedName(TokenContext);
//	ImportTree.ParsedValue = PackageName;
//	return ImportTree;
//}
//
//public static GtNode TypeImport(GtTypeEnv Gamma, GtSyntaxTree ParsedTree, GtType Type) {
//	/*local*/Object Value = LibNative.ImportNativeObject(Gamma.NameSpace, (/*cast*/String)ParsedTree.ParsedValue);
//	if(Value == null) {
//		return Gamma.CreateSyntaxErrorNode(ParsedTree, "cannot import: " + ParsedTree.ParsedValue);
//	}
//	return Gamma.Generator.CreateConstNode_OLD(GtStaticTable.GuessType(Value), ParsedTree, Value);
//}

//	// DoWhile Statement
//	public static GtSyntaxTree ParseDoWhile(GtNameSpace NameSpace, GtTokenContext TokenContext, GtSyntaxTree LeftNode, GtSyntaxPattern Pattern) {
//		/*local*/GtSyntaxTree Tree = TokenContext.CreateMatchedSyntaxTree(NameSpace, Pattern, "do");
//		Tree.SetMatchedPatternAt(GreenTeaConsts.WhileBody, NameSpace, TokenContext, "$StmtBlock$", GreenTeaConsts.Required);
//		Tree.SetMatchedTokenAt(GreenTeaConsts.NoWhere, NameSpace, TokenContext, "while", GreenTeaConsts.Required);
//		Tree.SetMatchedTokenAt(GreenTeaConsts.NoWhere, NameSpace, TokenContext, "(", GreenTeaConsts.Required | GreenTeaConsts.OpenSkipIndent);
//		Tree.SetMatchedPatternAt(GreenTeaConsts.WhileCond, NameSpace, TokenContext, "$Expression$", GreenTeaConsts.Required);
//		Tree.SetMatchedTokenAt(GreenTeaConsts.NoWhere, NameSpace, TokenContext, ")", GreenTeaConsts.Required | GreenTeaConsts.CloseSkipIndent);
//		return Tree;
//	}
//
//	public static GtNode TypeDoWhile(GtTypeEnv Gamma, GtSyntaxTree ParsedTree, GtType ContextType) {
//		/*local*/GtNode CondNode = ParsedTree.TypeCheckAt(GreenTeaConsts.WhileCond, Gamma, GtStaticTable.BooleanType, GreenTeaConsts.DefaultTypeCheckPolicy);
//		/*local*/GtNode BodyNode =  ParsedTree.TypeCheckAt(GreenTeaConsts.WhileBody, Gamma, GtStaticTable.VoidType, GreenTeaConsts.DefaultTypeCheckPolicy);
//		return Gamma.Generator.CreateDoWhileNode(BodyNode.Type, ParsedTree, CondNode, BodyNode);
//	}
//
//	// For Statement
//	public static GtSyntaxTree ParseFor(GtNameSpace NameSpace, GtTokenContext TokenContext, GtSyntaxTree LeftNode, GtSyntaxPattern Pattern) {
//		/*local*/GtSyntaxTree Tree = TokenContext.CreateMatchedSyntaxTree(NameSpace, Pattern, "for");
//		Tree.SetMatchedTokenAt(GreenTeaConsts.NoWhere, NameSpace, TokenContext, "(", GreenTeaConsts.Required | GreenTeaConsts.OpenSkipIndent);
//		Tree.SetMatchedPatternAt(GreenTeaConsts.ForInit, NameSpace, TokenContext, "$Expression$", GreenTeaConsts.Optional);
//		Tree.SetMatchedTokenAt(GreenTeaConsts.NoWhere, NameSpace, TokenContext, ";", GreenTeaConsts.Required);
//		Tree.SetMatchedPatternAt(GreenTeaConsts.ForCond, NameSpace, TokenContext, "$Expression$", GreenTeaConsts.Optional);
//		Tree.SetMatchedTokenAt(GreenTeaConsts.NoWhere, NameSpace, TokenContext, ";", GreenTeaConsts.Required);
//		Tree.SetMatchedPatternAt(GreenTeaConsts.ForIteration, NameSpace, TokenContext, "$Expression$", GreenTeaConsts.Optional);
//		Tree.SetMatchedTokenAt(GreenTeaConsts.NoWhere, NameSpace, TokenContext, ")", GreenTeaConsts.Required | GreenTeaConsts.CloseSkipIndent);
//		Tree.SetMatchedPatternAt(GreenTeaConsts.ForBody, NameSpace, TokenContext, "$StmtBlock$", GreenTeaConsts.Required);
//		return Tree;
//	}
//
//	public static GtNode TypeFor(GtTypeEnv Gamma, GtSyntaxTree ParsedTree, GtType ContextType) {
//		/*local*/GtNode InitNode = null;
//		/*local*/GtNode CondNode = null;
//		/*local*/GtNode IterNode = null;
//		if(ParsedTree.HasNodeAt(GreenTeaConsts.ForInit)) {
//			InitNode =  ParsedTree.TypeCheckAt(GreenTeaConsts.ForInit, Gamma, GtStaticTable.VarType, GreenTeaConsts.DefaultTypeCheckPolicy);
//		}
//		if(ParsedTree.HasNodeAt(GreenTeaConsts.ForCond)) {
//			CondNode =  ParsedTree.TypeCheckAt(GreenTeaConsts.ForCond, Gamma, GtStaticTable.BooleanType, GreenTeaConsts.DefaultTypeCheckPolicy);
//		}
//		if(ParsedTree.HasNodeAt(GreenTeaConsts.ForIteration)) {
//			IterNode =  ParsedTree.TypeCheckAt(GreenTeaConsts.ForIteration, Gamma, GtStaticTable.VarType, GreenTeaConsts.DefaultTypeCheckPolicy);
//		}
//		/*local*/GtNode BodyNode =  ParsedTree.TypeCheckAt(GreenTeaConsts.ForBody, Gamma, GtStaticTable.VoidType, GreenTeaConsts.DefaultTypeCheckPolicy);
//		/*local*/GtNode ForNode = Gamma.Generator.CreateForNode(BodyNode.Type, ParsedTree, CondNode, IterNode, BodyNode);
//		if(InitNode != null) {
//			if(InitNode instanceof GtVarDeclNode) {
//				((/*cast*/GtVarDeclNode)InitNode).BlockNode = ForNode;
//			}
//			else {
//				InitNode = GreenTeaUtils.LinkNode(InitNode, ForNode);
//			}
//			return InitNode;
//		}
//		return ForNode;
//	}
//
//	// ForEach Statement
//	public static GtSyntaxTree ParseForEach(GtNameSpace NameSpace, GtTokenContext TokenContext, GtSyntaxTree LeftNode, GtSyntaxPattern Pattern) {
//		/*local*/GtSyntaxTree Tree = TokenContext.CreateMatchedSyntaxTree(NameSpace, Pattern, "for");
//		Tree.SetMatchedTokenAt(GreenTeaConsts.NoWhere, NameSpace, TokenContext, "(", GreenTeaConsts.Required | GreenTeaConsts.OpenSkipIndent);
//		Tree.SetMatchedPatternAt(GreenTeaConsts.ForEachType, NameSpace, TokenContext, "$Type$", GreenTeaConsts.Optional);
//		Tree.SetMatchedPatternAt(GreenTeaConsts.ForEachName, NameSpace, TokenContext, "$Variable$", GreenTeaConsts.Required);
//		Tree.SetMatchedTokenAt(GreenTeaConsts.NoWhere, NameSpace, TokenContext, "in", GreenTeaConsts.Required);
//		Tree.SetMatchedPatternAt(GreenTeaConsts.ForEachIter, NameSpace, TokenContext, "$Expression$", GreenTeaConsts.Required);
//		Tree.SetMatchedTokenAt(GreenTeaConsts.NoWhere, NameSpace, TokenContext, ")", GreenTeaConsts.Required | GreenTeaConsts.CloseSkipIndent);
//		Tree.SetMatchedPatternAt(GreenTeaConsts.ForEachBody, NameSpace, TokenContext, "$StmtBlock$", GreenTeaConsts.Required);
//		return Tree;
//	}
//
//	public static GtNode TypeForEach(GtTypeEnv Gamma, GtSyntaxTree ParsedTree, GtType ContextType) {
//		/*local*/GtNode IterNode =  ParsedTree.TypeCheckAt(GreenTeaConsts.ForEachIter, Gamma, GtStaticTable.VarType, GreenTeaConsts.DefaultTypeCheckPolicy);
//		if(IterNode.IsErrorNode()) {
//			return IterNode;
//		}
//		if(!IterNode.Type.IsIteratorType()) {
//			/*local*/GtPolyFunc PolyFunc = Gamma.NameSpace.GetMethod(IterNode.Type, GreenTeaUtils.FuncSymbol(".."), true);
//			/*local*/GtFunc Func = PolyFunc.ResolveUnaryMethod(Gamma, IterNode.Type);
//			if(Func == null) {
//				return Gamma.CreateSyntaxErrorNode(ParsedTree, "for/in takes an iterator, but given = " + IterNode.Type);
//			}
//			Gamma.CheckFunc("operator", Func, ParsedTree.KeyToken);
//			GtNode ApplyNode = Gamma.Generator.CreateApplySymbolNode(Func.GetReturnType(), ParsedTree, GreenTeaUtils.FuncSymbol(".."), Func);
//			ApplyNode.Append(IterNode);
//			IterNode = ApplyNode;
//		}
//		/*local*/GtVariableInfo VarInfo = null;
//		/*local*/String VarName = ParsedTree.GetSyntaxTreeAt(GreenTeaConsts.ForEachName).KeyToken.ParsedText;
//		/*local*/GtType VarType = null;
//		if(ParsedTree.HasNodeAt(GreenTeaConsts.ForEachType)) {
//			VarType = ParsedTree.GetSyntaxTreeAt(GreenTeaConsts.ForEachType).GetParsedType();
//			if(VarType.IsVarType()) {
//				VarType = IterNode.Type.TypeParams[0];
//				Gamma.ReportTypeInference(ParsedTree.GetSyntaxTreeAt(GreenTeaConsts.ForEachName).KeyToken, VarName, VarType);
//			}
//			VarInfo = Gamma.AppendDeclaredVariable(0, VarType, VarName, null, null);
//		}
//		else {
//			/*local*/GtVariableInfo VarDefInfo = Gamma.LookupDeclaredVariable(VarName);
//			if(VarDefInfo == null) {
//				return Gamma.CreateSyntaxErrorNode(ParsedTree, "undefined symbol: " + VarName);
//			}
//			VarType = VarDefInfo.Type;
//		}
//		if(IterNode.Type.TypeParams[0] != VarType) {
//			return Gamma.CreateSyntaxErrorNode(ParsedTree, "mismatched iterator: " + VarType + " " + VarName + " in " + IterNode.Type);
//		}
//		/*local*/GtVariableInfo VarIterInfo = Gamma.AppendDeclaredVariable(0, IterNode.Type, "iter", null, null);
//		/*local*/GtNode WhileNode = Gamma.ParseTypedNode("while(iter.hasHext()) { " + VarName + " = iter.next(); }", ParsedTree.KeyToken.FileLine, GtStaticTable.VoidType);
//		if(!WhileNode.IsErrorNode()) {
//			/*local*/GtNode BodyNode =  ParsedTree.TypeCheckAt(GreenTeaConsts.ForEachBody, Gamma, GtStaticTable.VoidType, GreenTeaConsts.DefaultTypeCheckPolicy);
//			/*local*/GtWhileNode WhileNode2 = (/*cast*/GtWhileNode)WhileNode;
//			GreenTeaUtils.LinkNode(WhileNode2.BodyNode, BodyNode);
//		}
//		/*local*/GtNode Node = Gamma.Generator.CreateVarDeclNode(IterNode.Type, ParsedTree, IterNode.Type, VarIterInfo.NativeName, IterNode, WhileNode);
//		if(VarInfo != null) {
//			Node = Gamma.Generator.CreateVarDeclNode(VarInfo.Type, ParsedTree, VarInfo.Type, VarInfo.NativeName, Gamma.CreateDefaultValue(ParsedTree, VarInfo.Type), Node);
//		}
//		return Node;
//	}
//
//	// Break/Continue Statement
//	public static GtSyntaxTree ParseBreak(GtNameSpace NameSpace, GtTokenContext TokenContext, GtSyntaxTree LeftNode, GtSyntaxPattern Pattern) {
//		return TokenContext.CreateMatchedSyntaxTree(NameSpace, Pattern, "break");
//	}
//
//	public static GtNode TypeBreak(GtTypeEnv Gamma, GtSyntaxTree ParsedTree, GtType ContextType) {
//		return Gamma.Generator.CreateBreakNode(GtStaticTable.VoidType, ParsedTree, "");
//	}
//
//	public static GtSyntaxTree ParseContinue(GtNameSpace NameSpace, GtTokenContext TokenContext, GtSyntaxTree LeftNode, GtSyntaxPattern Pattern) {
//		return TokenContext.CreateMatchedSyntaxTree(NameSpace, Pattern, "continue");
//	}
//
//	public static GtNode TypeContinue(GtTypeEnv Gamma, GtSyntaxTree ParsedTree, GtType ContextType) {
//		return Gamma.Generator.CreateContinueNode(GtStaticTable.VoidType, ParsedTree, "");
//	}

//	// Return Statement
//	public static GtSyntaxTree ParseReturn(GtNameSpace NameSpace, GtTokenContext TokenContext, GtSyntaxTree LeftNode, GtSyntaxPattern Pattern) {
//		/*local*/GtSyntaxTree ReturnTree = TokenContext.CreateMatchedSyntaxTree(NameSpace, Pattern, "return");
//		ReturnTree.SetMatchedPatternAt(GreenTeaConsts.ReturnExpr, NameSpace, TokenContext, "$Expression$", GreenTeaConsts.Optional);
//		return ReturnTree;
//	}
//
//	public static GtNode TypeReturn(GtTypeEnv Gamma, GtSyntaxTree ParsedTree, GtType ContextType) {
//		ParsedTree.NextTree = null; // stop typing of next trees
//		if(Gamma.IsTopLevel()) {
//			return Gamma.UnsupportedTopLevelError(ParsedTree);
//		}
//		/*local*/GtType ReturnType = Gamma.FuncBlock.DefinedFunc.GetReturnType();
//		if(ParsedTree.HasNodeAt(GreenTeaConsts.ReturnExpr)) {
//			/*local*/GtNode Expr = ParsedTree.TypeCheckAt(GreenTeaConsts.ReturnExpr, Gamma, ReturnType, GreenTeaConsts.DefaultTypeCheckPolicy);
//			if(ReturnType.IsVarType() && !Expr.IsErrorNode()) {
//				Gamma.FuncBlock.DefinedFunc.Types[0] = Expr.Type;
//				Gamma.ReportTypeInference(ParsedTree.KeyToken, "return value of " + Gamma.FuncBlock.DefinedFunc.FuncName, Expr.Type);
//			}
//			if(ReturnType.IsVoidType()) {
//				Gamma.Context.ReportError(GreenTeaConsts.WarningLevel, ParsedTree.KeyToken, "ignored return value");
//				return Gamma.Generator.CreateReturnNode(ReturnType, ParsedTree, null);
//			}
//			return Gamma.Generator.CreateReturnNode(Expr.Type, ParsedTree, Expr);
//		}
//		else {
//			if(ReturnType.IsVarType()) {
//				Gamma.FuncBlock.DefinedFunc.Types[0] = GtStaticTable.VoidType;
//				Gamma.ReportTypeInference(ParsedTree.KeyToken, "return value of " + Gamma.FuncBlock.DefinedFunc.FuncName, GtStaticTable.VoidType);
//			}
//			if(Gamma.FuncBlock.DefinedFunc.Is(GreenTeaConsts.ConstructorFunc)) {
//				/*local*/GtNode ThisNode = Gamma.CreateLocalNode(ParsedTree, Gamma.Generator.GetRecvName());
//				return Gamma.Generator.CreateReturnNode(ThisNode.Type, ParsedTree, ThisNode);
//			}
//			if(!ReturnType.IsVoidType()) {
//				Gamma.Context.ReportError(GreenTeaConsts.WarningLevel, ParsedTree.KeyToken, "returning default value of " + ReturnType);
//				return Gamma.Generator.CreateReturnNode(ReturnType, ParsedTree, Gamma.CreateDefaultValue(ParsedTree, ReturnType));
//			}
//			return Gamma.Generator.CreateReturnNode(ReturnType, ParsedTree, null);
//		}
//	}


//	public static GtSyntaxTree ParseThis(GtNameSpace NameSpace, GtTokenContext TokenContext, GtSyntaxTree LeftNode, GtSyntaxPattern Pattern) {
//		return TokenContext.CreateMatchedSyntaxTree(NameSpace, Pattern, "this");
//	}
//
//	public static GtNode TypeThis(GtTypeEnv Gamma, GtSyntaxTree ParsedTree, GtType ContextType) {
//		return Gamma.CreateLocalNode(ParsedTree, Gamma.Generator.GetRecvName());
//	}
//
//	public static GtSyntaxTree ParseLine(GtNameSpace NameSpace, GtTokenContext TokenContext, GtSyntaxTree LeftNode, GtSyntaxPattern Pattern) {
//		return TokenContext.CreateMatchedSyntaxTree(NameSpace, Pattern, "__line__");
//	}
//
//	public static GtNode TypeLine(GtTypeEnv Gamma, GtSyntaxTree ParsedTree, GtType ContextType) {
//		return Gamma.Generator.CreateConstNode_OLD(GtStaticTable.StringType, ParsedTree, GtStaticTable.FormatFileLineNumber(ParsedTree.KeyToken.FileLine));
//	}
//
//	public static GtSyntaxTree ParseSymbols(GtNameSpace NameSpace, GtTokenContext TokenContext, GtSyntaxTree LeftNode, GtSyntaxPattern Pattern) {
//		return TokenContext.CreateMatchedSyntaxTree(NameSpace, Pattern, "__").ToConstTree(NameSpace);
//	}

//	public static GtSyntaxTree ParseSuper(GtNameSpace NameSpace, GtTokenContext TokenContext, GtSyntaxTree LeftNode, GtSyntaxPattern Pattern) {
//		/*local*/GtSyntaxTree Tree = TokenContext.CreateMatchedSyntaxTree(NameSpace, Pattern, "super");
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
//		return Tree;
//	}

//	// new $Type ( $Expr$ [, $Expr$] )
//	public static GtSyntaxTree ParseNew(GtNameSpace NameSpace, GtTokenContext TokenContext, GtSyntaxTree LeftNode, GtSyntaxPattern Pattern) {
//		/*local*/GtSyntaxTree NewTree = TokenContext.CreateMatchedSyntaxTree(NameSpace, Pattern, "new");
//		NewTree.SetMatchedPatternAt(0, NameSpace, TokenContext, "$Type$", GreenTeaConsts.Optional);
//		if(!NewTree.HasNodeAt(0)) {
//			NewTree.SetSyntaxTreeAt(0, NewTree.CreateConstTree(GtStaticTable.VarType)); // TODO
//		}
//		/*local*/int ParseFlag = TokenContext.SetSkipIndent(true);
//		NewTree.SetMatchedTokenAt(GreenTeaConsts.NoWhere, NameSpace, TokenContext, "(", GreenTeaConsts.Required);
//		if(!TokenContext.MatchToken(")")) {
//			while(!NewTree.IsMismatchedOrError()) {
//				NewTree.AppendMatchedPattern(NameSpace, TokenContext, "$Expression$", GreenTeaConsts.Required);
//				if(TokenContext.MatchToken(")")) {
//					break;
//				}
//				NewTree.SetMatchedTokenAt(GreenTeaConsts.NoWhere, NameSpace, TokenContext, ",", GreenTeaConsts.Required);
//			}
//		}
//		TokenContext.SetRememberFlag(ParseFlag);
//		return NewTree;
//	}

//	// switch
//	public static GtSyntaxTree ParseEnum(GtNameSpace NameSpace, GtTokenContext TokenContext, GtSyntaxTree LeftNode, GtSyntaxPattern Pattern) {
//		/*local*/String EnumTypeName = null;
//		/*local*/GtType NewEnumType = null;
//		/*local*/GtMap EnumMap = new GtMap();
//		/*local*/GtSyntaxTree EnumTree = TokenContext.CreateMatchedSyntaxTree(NameSpace, Pattern, "enum");
//		EnumTree.SetMatchedPatternAt(GreenTeaConsts.EnumNameTreeIndex, NameSpace, TokenContext, "$FuncName$", GreenTeaConsts.Required);  // $ClassName$ is better
//		if(!EnumTree.IsMismatchedOrError()) {
//			EnumTypeName = EnumTree.GetSyntaxTreeAt(GreenTeaConsts.EnumNameTreeIndex).KeyToken.ParsedText;
//			NewEnumType = GtStaticTable.EnumBaseType.CreateSubType(GreenTeaConsts.EnumType, EnumTypeName, null, EnumMap);
//		}
//		EnumTree.SetMatchedTokenAt(GreenTeaConsts.NoWhere, NameSpace, TokenContext, "{", GreenTeaConsts.Required);
//		/*local*/int EnumValue = 0;
//		/*local*/ArrayList<GtToken> NameList = new ArrayList<GtToken>();
//		while(!EnumTree.IsMismatchedOrError()) {
//			TokenContext.SkipIndent();
//			if(TokenContext.MatchToken(",")) {
//				continue;
//			}
//			if(TokenContext.MatchToken("}")) {
//				break;
//			}
//			/*local*/GtToken Token = TokenContext.Next();
//			if(LibZen.IsVariableName(Token.ParsedText, 0)) {
//				if(EnumMap.GetOrNull(Token.ParsedText) != null) {
//					NameSpace.Context.ReportError(GreenTeaConsts.ErrorLevel, Token, "duplicated name: " + Token.ParsedText);
//					continue;
//				}
//				NameList.add(Token);
//				EnumMap.put(Token.ParsedText, new GreenTeaEnum(NewEnumType, EnumValue, Token.ParsedText));
//				EnumValue += 1;
//				continue;
//			}
//		}
//		if(!EnumTree.IsMismatchedOrError()) {
//			/*local*/GtNameSpace StoreNameSpace = NameSpace.GetNameSpace(KonohaGrammar.ParseNameSpaceFlag(0, TokenContext.ParsingAnnotation));
//			StoreNameSpace.AppendTypeName(NewEnumType, EnumTree.GetSyntaxTreeAt(GreenTeaConsts.EnumNameTreeIndex).KeyToken);
//			/*local*/int i = 0;
//			while(i < LibZen.ListSize(NameList)) {
//				/*local*/String Key = NameList.get(i).ParsedText;
//				StoreNameSpace.SetSymbol(GreenTeaUtils.ClassStaticSymbol(NewEnumType, Key), EnumMap.GetOrNull(Key), NameList.get(i));
//				i = i + 1;
//			}
//			EnumTree.ParsedValue = NewEnumType;
//		}
//		return EnumTree;
//	}
//
//	public static GtNode TypeEnum(GtTypeEnv Gamma, GtSyntaxTree ParsedTree, GtType ContextType) {
//		/*local*/Object EnumType = ParsedTree.ParsedValue;
//		return Gamma.Generator.CreateConstNode_OLD(GtStaticTable.GuessType(EnumType), ParsedTree, EnumType);
//	}
//
//	public static GtSyntaxTree ParseCaseBlock(GtNameSpace ParentNameSpace, GtTokenContext TokenContext, GtSyntaxTree LeftNode, GtSyntaxPattern Pattern) {
//		/*local*/GtSyntaxTree PrevTree = null;
//		/*local*/GtNameSpace NameSpace = ParentNameSpace.CreateSubNameSpace();
//		/*local*/boolean IsCaseBlock = TokenContext.MatchToken("{"); // case EXPR : {}
//		while(TokenContext.HasNext()) {
//			TokenContext.SkipEmptyStatement();
//			if(TokenContext.IsToken("case")) {
//				break;
//			}
//			if(TokenContext.IsToken("default")) {
//				break;
//			}
//			if(TokenContext.IsToken("}")) {
//				if(!IsCaseBlock) {
//				}
//				break;
//			}
//			/*local*/GtMap Annotation = TokenContext.SkipAndGetAnnotation(true);
//			/*local*/GtSyntaxTree CurrentTree = TokenContext.ParsePattern_OLD(NameSpace, "$Expression$", GreenTeaConsts.Required);
//			if(GreenTeaUtils.IsMismatchedOrError(CurrentTree)) {
//				return CurrentTree;
//			}
//			CurrentTree.SetAnnotation(Annotation);
//			PrevTree = GreenTeaUtils.LinkTree(PrevTree, CurrentTree);
//		}
//		if(PrevTree == null) {
//			return TokenContext.ParsePattern_OLD(NameSpace, "$Empty$", GreenTeaConsts.Required);
//		}
//		return GreenTeaUtils.TreeHead(PrevTree);
//	}
//
//	public static GtSyntaxTree ParseSwitch(GtNameSpace NameSpace, GtTokenContext TokenContext, GtSyntaxTree LeftNode, GtSyntaxPattern Pattern) {
//		/*local*/GtSyntaxTree SwitchTree = TokenContext.CreateMatchedSyntaxTree(NameSpace, Pattern, "switch");
//		SwitchTree.SetMatchedTokenAt(GreenTeaConsts.NoWhere, NameSpace, TokenContext, "(", GreenTeaConsts.Required | GreenTeaConsts.OpenSkipIndent);
//		SwitchTree.SetMatchedPatternAt(GreenTeaConsts.SwitchCaseCondExpr, NameSpace, TokenContext, "$Expression$", GreenTeaConsts.Required);
//		SwitchTree.SetMatchedTokenAt(GreenTeaConsts.NoWhere, NameSpace, TokenContext, ")", GreenTeaConsts.Required | GreenTeaConsts.CloseSkipIndent);
//		SwitchTree.SetMatchedTokenAt(GreenTeaConsts.NoWhere, NameSpace, TokenContext, "{", GreenTeaConsts.Required);
//
//		/*local*/int CaseIndex = GreenTeaConsts.SwitchCaseCaseIndex;
//		/*local*/int ParseFlag = TokenContext.SetSkipIndent(true);
//		while(!SwitchTree.IsMismatchedOrError() && !TokenContext.MatchToken("}")) {
//			if(TokenContext.MatchToken("case")) {
//				SwitchTree.SetMatchedPatternAt(CaseIndex, NameSpace, TokenContext, "$Expression$", GreenTeaConsts.Required);
//				SwitchTree.SetMatchedTokenAt(GreenTeaConsts.NoWhere, NameSpace, TokenContext, ":", GreenTeaConsts.Required);
//				SwitchTree.SetMatchedPatternAt(CaseIndex + 1, NameSpace, TokenContext, "$CaseBlock$", GreenTeaConsts.Required);
//				CaseIndex += 2;
//				continue;
//			}
//			if(TokenContext.MatchToken("default")) {
//				SwitchTree.SetMatchedTokenAt(GreenTeaConsts.NoWhere, NameSpace, TokenContext, ":", GreenTeaConsts.Required);
//				SwitchTree.SetMatchedPatternAt(GreenTeaConsts.SwitchCaseDefaultBlock, NameSpace, TokenContext, "$CaseBlock$", GreenTeaConsts.Required);
//			}
//		}
//		TokenContext.SetRememberFlag(ParseFlag);
//		return SwitchTree;
//	}
//
//	public static GtNode TypeSwitch(GtTypeEnv Gamma, GtSyntaxTree ParsedTree, GtType ContextType) {
//		/*local*/GtNode CondNode = ParsedTree.TypeCheckAt(GreenTeaConsts.IfCond, Gamma, GtStaticTable.VarType, GreenTeaConsts.DefaultTypeCheckPolicy);
//		/*local*/GtNode DefaultNode = null;
//		if(ParsedTree.HasNodeAt(GreenTeaConsts.SwitchCaseDefaultBlock)) {
//			DefaultNode = ParsedTree.TypeCheckAt(GreenTeaConsts.SwitchCaseDefaultBlock, Gamma, GtStaticTable.VoidType, GreenTeaConsts.DefaultTypeCheckPolicy);
//		}
//		/*local*/GtNode Node = Gamma.Generator.CreateSwitchNode(GtStaticTable.VoidType, ParsedTree, CondNode, DefaultNode);
//		/*local*/int CaseIndex = GreenTeaConsts.SwitchCaseCaseIndex;
//		while(CaseIndex < ParsedTree.SubTreeList.size()) {
//			/*local*/GtNode CaseExpr  = ParsedTree.TypeCheckAt(CaseIndex, Gamma, CondNode.Type, GreenTeaConsts.DefaultTypeCheckPolicy);
//			/*local*/GtNode CaseBlock = null;
//			if(ParsedTree.HasNodeAt(CaseIndex+1)) {
//				CaseBlock = ParsedTree.TypeCheckAt(CaseIndex+1, Gamma, GtStaticTable.VoidType, GreenTeaConsts.DefaultTypeCheckPolicy);
//			}
//			Node.Append(CaseExpr);
//			Node.Append(CaseBlock);
//			CaseIndex += 2;
//		}
//		return Node;
//	}

	



//	// Array
//	public static GtSyntaxTree ParseNewArray(GtNameSpace NameSpace, GtTokenContext TokenContext, GtSyntaxTree LeftNode, GtSyntaxPattern Pattern) {
//		/*local*/GtSyntaxTree ArrayTree = TokenContext.CreateMatchedSyntaxTree(NameSpace, Pattern, "new");
//		ArrayTree.AppendMatchedPattern(NameSpace, TokenContext, "$Type$", GreenTeaConsts.Required);
//		while(TokenContext.HasNext() && ArrayTree.IsValidSyntax()) {
//			ArrayTree.SetMatchedTokenAt(GreenTeaConsts.NoWhere, NameSpace, TokenContext, "[", GreenTeaConsts.Required);
//			ArrayTree.AppendMatchedPattern(NameSpace, TokenContext, "$Expression$", GreenTeaConsts.Required);
//			ArrayTree.SetMatchedTokenAt(GreenTeaConsts.NoWhere, NameSpace, TokenContext, "]", GreenTeaConsts.Required);
//			if(!TokenContext.IsToken("[")) {
//				break;
//			}
//		}
//		return ArrayTree;
//	}
//
//	public static GtNode TypeNewArray(GtTypeEnv Gamma, GtSyntaxTree ParsedTree, GtType ContextType) {
//		/*local*/GtType ArrayType = ParsedTree.GetSyntaxTreeAt(0).GetParsedType();
//		/*local*/GtNode ArrayNode = Gamma.Generator.CreateNewArrayNode(GtStaticTable.ArrayType, ParsedTree);
//		/*local*/int i = 1;
//		while(i < LibZen.ListSize(ParsedTree.SubTreeList)) {
//			/*local*/GtNode Node = ParsedTree.TypeCheckAt(i, Gamma, GtStaticTable.IntType, GreenTeaConsts.DefaultTypeCheckPolicy);
//			if(Node.IsErrorNode()) {
//				return Node;
//			}
//			ArrayType = GtStaticTable.GetGenericType1(GtStaticTable.ArrayType, ArrayType, true);
//			ArrayNode.Append(Node);
//			i = i + 1;
//		}
//		ArrayNode.Type = ArrayType;
//		return ArrayNode;
//	}
//
//	public static GtSyntaxTree ParseArray(GtNameSpace NameSpace, GtTokenContext TokenContext, GtSyntaxTree LeftNode, GtSyntaxPattern Pattern) {
//		/*local*/int OldFlag = TokenContext.SetSkipIndent(true);
//		/*local*/GtSyntaxTree ArrayTree = TokenContext.CreateMatchedSyntaxTree(NameSpace, Pattern, "[");
//		while(TokenContext.HasNext() && ArrayTree.IsValidSyntax()) {
//			if(TokenContext.MatchToken("]")) {
//				break;
//			}
//			if(TokenContext.MatchToken(",")) {
//				continue;
//			}
//			ArrayTree.AppendMatchedPattern(NameSpace, TokenContext, "$Expression$", GreenTeaConsts.Required);
//		}
//		TokenContext.SetRememberFlag(OldFlag);
//		return ArrayTree;
//	}
//
//	public static GtNode TypeArray(GtTypeEnv Gamma, GtSyntaxTree ParsedTree, GtType ContextType) {
//		/*local*/GtNode ArrayNode = Gamma.Generator.CreateArrayLiteralNode(GtStaticTable.ArrayType, ParsedTree);
//		/*local*/GtType ElemType = GtStaticTable.VarType;
//		if(ContextType.IsArrayType()) {
//			ElemType = ContextType.TypeParams[0];
//			ArrayNode.Type = ContextType;
//		}
//		/*local*/int i = 0;
//		while(i < LibZen.ListSize(ParsedTree.SubTreeList)) {
//			/*local*/GtNode Node = ParsedTree.TypeCheckAt(i, Gamma, ElemType, GreenTeaConsts.DefaultTypeCheckPolicy);
//			if(Node.IsErrorNode()) {
//				return Node;
//			}
//			if(ElemType.IsVarType()) {
//				ElemType = Node.Type;
//				ArrayNode.Type = GtStaticTable.GetGenericType1(GtStaticTable.ArrayType, ElemType, true);
//			}
//			ArrayNode.Append(Node);
//			i = i + 1;
//		}
//		if(ElemType.IsVarType()) {
//			ArrayNode.Type = GtStaticTable.GetGenericType1(GtStaticTable.ArrayType, GtStaticTable.AnyType, true);
//		}
//		return ArrayNode;
//	}
//
//	public static GtSyntaxTree ParseSize(GtNameSpace NameSpace, GtTokenContext TokenContext, GtSyntaxTree LeftNode, GtSyntaxPattern Pattern) {
//		/*local*/GtSyntaxTree ArrayTree = TokenContext.CreateMatchedSyntaxTree(NameSpace, Pattern, "|");
//		ArrayTree.SetMatchedPatternAt(GreenTeaConsts.UnaryTerm, NameSpace, TokenContext, "$SuffixExpression$", GreenTeaConsts.Required);
//		ArrayTree.SetMatchedTokenAt(GreenTeaConsts.NoWhere, NameSpace, TokenContext, "|", GreenTeaConsts.Required);
//		return ArrayTree;
//	}
//
//	public static GtNode TypeSize(GtTypeEnv Gamma, GtSyntaxTree ParsedTree, GtType ContextType) {
//		/*local*/GtNode ExprNode = ParsedTree.TypeCheckAt(GreenTeaConsts.UnaryTerm, Gamma, GtStaticTable.VarType, GreenTeaConsts.DefaultTypeCheckPolicy);
//		if(ExprNode.IsErrorNode()) {
//			return ExprNode;
//		}
//		/*local*/GtPolyFunc PolyFunc = Gamma.NameSpace.GetMethod(ExprNode.Type, GreenTeaUtils.FuncSymbol("||"), true);
//		//System.err.println("polyfunc: " + PolyFunc);
//		/*local*/GtFunc Func = PolyFunc.ResolveUnaryMethod(Gamma, ExprNode.Type);
//		LibZen.Assert(Func != null);  // any has ||
//		Gamma.CheckFunc("operator", Func, ParsedTree.KeyToken);
//		GtNode Node = Gamma.Generator.CreateApplySymbolNode(Func.GetReturnType(), ParsedTree, GreenTeaUtils.FuncSymbol("||"), Func);
//		Node.Append(ExprNode);
//		if(Node instanceof GtSymbolNode) {
//			((/*cast*/GtSymbolNode)Node).ResolvedFunc = Func;
//		}
//		return Node;
//	}
//
//	public static GtSyntaxTree ParseIndexer(GtNameSpace NameSpace, GtTokenContext TokenContext, GtSyntaxTree LeftNode, GtSyntaxPattern Pattern) {
//		/*local*/GtSyntaxTree ArrayTree = TokenContext.CreateMatchedSyntaxTree(NameSpace, Pattern, "[");
//		ArrayTree.AppendParsedTree2(LeftNode);
//		/*local*/int OldFlag = TokenContext.SetSkipIndent(true);
//		do {
//			ArrayTree.AppendMatchedPattern(NameSpace, TokenContext, "$Expression$", GreenTeaConsts.Required);
//		}
//		while(!ArrayTree.IsMismatchedOrError() && TokenContext.MatchToken(","));
//		ArrayTree.SetMatchedTokenAt(GreenTeaConsts.NoWhere, NameSpace, TokenContext, "]", GreenTeaConsts.Required);
//		TokenContext.SetRememberFlag(OldFlag);
//		/*local*/String OperatorSymbol = "[]";
//		if(TokenContext.MatchToken("=")) {
//			ArrayTree.AppendMatchedPattern(NameSpace, TokenContext, "$Expression$", GreenTeaConsts.Required);
//			OperatorSymbol = "[]=";
//		}
//		if(ArrayTree.IsValidSyntax()) {
//			ArrayTree.KeyToken.ParsedText = OperatorSymbol;
//		}
//		return ArrayTree;
//	}
//
//	public static GtNode TypeIndexer(GtTypeEnv Gamma, GtSyntaxTree ParsedTree, GtType Type) {
//		/*local*/GtNode RecvNode = ParsedTree.TypeCheckAt(GreenTeaConsts.LeftHandTerm, Gamma, GtStaticTable.VarType, GreenTeaConsts.DefaultTypeCheckPolicy);
//		if(!RecvNode.IsErrorNode()) {
//			/*local*/String MethodName = ParsedTree.KeyToken.ParsedText;
//			/*local*/GtResolvedFunc ResolvedFunc = null;
//			/*local*/GtPolyFunc PolyFunc = ParsedTree.NameSpace.GetMethod(RecvNode.Type, GreenTeaUtils.FuncSymbol(MethodName), true);
//			//System.err.println("polyfunc: " + PolyFunc);
//			/*local*/ArrayList<GtNode> ParamList = new ArrayList<GtNode>();
//			ParamList.add(RecvNode);
//			ResolvedFunc = PolyFunc.ResolveFunc(Gamma, ParsedTree, 1, ParamList);
//			if(ResolvedFunc.Func == null) {
//				return Gamma.CreateSyntaxErrorNode(ParsedTree, "undefined: " + MethodName + " of " + RecvNode.Type);
//			}
//			if(LibZen.EqualsString(ParsedTree.KeyToken.ParsedText, "[]")) {
//				return Gamma.Generator.CreateGetIndexNode(ResolvedFunc.ReturnType, ParsedTree, RecvNode, ResolvedFunc.Func, ParamList.get(1));
//			}
//			else {
//				return Gamma.Generator.CreateSetIndexNode(ResolvedFunc.ReturnType, ParsedTree, RecvNode, ResolvedFunc.Func, ParamList.get(1), ParamList.get(2));
//			}
//		}
//		return RecvNode;
//	}
//
//	public static GtSyntaxTree ParseSlice(GtNameSpace NameSpace, GtTokenContext TokenContext, GtSyntaxTree LeftNode, GtSyntaxPattern Pattern) {
//		/*local*/GtSyntaxTree SliceTree = TokenContext.CreateMatchedSyntaxTree(NameSpace, Pattern, "[");
//		SliceTree.AppendParsedTree2(LeftNode);
//		SliceTree.SetMatchedPatternAt(1, NameSpace, TokenContext, "$Expression$", GreenTeaConsts.Optional);
//		if(!SliceTree.HasNodeAt(1)) {
//			SliceTree.SetSyntaxTreeAt(1, SliceTree.CreateConstTree(0L)); // s[:x]
//		}
//		SliceTree.SetMatchedTokenAt(GreenTeaConsts.NoWhere, NameSpace, TokenContext, ":", GreenTeaConsts.Required);
//		SliceTree.AppendMatchedPattern(NameSpace, TokenContext, "$Expression$", GreenTeaConsts.Optional);
//		SliceTree.SetMatchedTokenAt(GreenTeaConsts.NoWhere, NameSpace, TokenContext, "]", GreenTeaConsts.Required);
//		return SliceTree;
//	}
//
//	public static GtNode TypeSlice(GtTypeEnv Gamma, GtSyntaxTree ParsedTree, GtType ContextType) {
//		/*local*/GtNode RecvNode = ParsedTree.TypeCheckAt(GreenTeaConsts.LeftHandTerm, Gamma, GtStaticTable.VarType, GreenTeaConsts.DefaultTypeCheckPolicy);
//		if(!RecvNode.IsErrorNode()) {
//			return KonohaGrammar.TypeMethodNameCall(Gamma, ParsedTree, RecvNode, "[:]", ContextType);
//		}
//		return RecvNode;
//	}

	// ClassDecl
//	private static boolean TypeFieldDecl(GtTypeEnv Gamma, GtSyntaxTree ParsedTree, GtClassField ClassField) {
//		/*local*/int    FieldFlag = KonohaGrammar.ParseVarFlag(0, ParsedTree.Annotation);
//		/*local*/GtType DeclType = ParsedTree.GetSyntaxTreeAt(GreenTeaConsts.VarDeclType).GetParsedType();
//		/*local*/String FieldName = ParsedTree.GetSyntaxTreeAt(GreenTeaConsts.VarDeclName).KeyToken.ParsedText;
//		/*local*/GtNode InitValueNode = null;
//		/*local*/Object InitValue = null;
//		if(ParsedTree.HasNodeAt(GreenTeaConsts.VarDeclValue)) {
//			InitValueNode = ParsedTree.TypeCheckAt(GreenTeaConsts.VarDeclValue, Gamma, DeclType, GreenTeaConsts.OnlyConstPolicy | GreenTeaConsts.NullablePolicy);
//			if(InitValueNode.IsErrorNode()) {
//				return false;
//			}
//			InitValue = InitValueNode.ToConstValue(Gamma.Context, true);
//		}
//		if(GreenTeaConsts.UseLangStat) {
//			Gamma.Context.Stat.VarDecl += 1;
//		}/*EndOfStat*/
//		if(DeclType.IsVarType()) {
//			if(InitValueNode == null) {
//				DeclType = GtStaticTable.AnyType;
//			}
//			else {
//				DeclType = InitValueNode.Type;
//			}
//			Gamma.ReportTypeInference(ParsedTree.KeyToken, FieldName, DeclType);
//			if(GreenTeaConsts.UseLangStat) {
//				Gamma.Context.Stat.VarDeclInfer += 1;
//				if(DeclType.IsAnyType()) {
//					Gamma.Context.Stat.VarDeclInferAny += 1;
//				}
//			}/*EndOfStat*/
//		}
//		if(GreenTeaConsts.UseLangStat) {
//			if(DeclType.IsAnyType()) {
//				Gamma.Context.Stat.VarDeclAny += 1;
//			}
//		}/*EndOfStat*/
//		if(InitValueNode == null) {
//			InitValue = DeclType.DefaultNullValue;
//		}
//		ClassField.CreateField(FieldFlag, DeclType, FieldName, ParsedTree.GetSyntaxTreeAt(GreenTeaConsts.VarDeclName).KeyToken, InitValue);
//		return true;
//	}
//
//	public static GtSyntaxTree ParseClassDecl2(GtNameSpace NameSpace, GtTokenContext TokenContext, GtSyntaxTree LeftNode, GtSyntaxPattern Pattern) {
//		/*local*/GtSyntaxTree ClassDeclTree = TokenContext.CreateMatchedSyntaxTree(NameSpace, Pattern, "class");
//		ClassDeclTree.SetMatchedPatternAt(GreenTeaConsts.ClassDeclName, NameSpace, TokenContext, "$FuncName$", GreenTeaConsts.Required); //$ClassName$ is better
//		if(TokenContext.MatchToken("extends")) {
//			ClassDeclTree.SetMatchedPatternAt(GreenTeaConsts.ClassDeclSuperType, NameSpace, TokenContext, "$Type$", GreenTeaConsts.Required);
//		}
//		if(ClassDeclTree.IsMismatchedOrError()) {
//			return ClassDeclTree;
//		}
//		// define new class
//		/*local*/GtNameSpace ClassNameSpace = new GtNameSpace(NameSpace.Context, NameSpace);
//		/*local*/GtToken NameToken = ClassDeclTree.GetSyntaxTreeAt(GreenTeaConsts.ClassDeclName).KeyToken;
//		/*local*/GtType SuperType = GtStaticTable.TopType;
//		if(ClassDeclTree.HasNodeAt(GreenTeaConsts.ClassDeclSuperType)) {
//			SuperType = ClassDeclTree.GetSyntaxTreeAt(GreenTeaConsts.ClassDeclSuperType).GetParsedType();
//		}
//		/*local*/int ClassFlag = KonohaGrammar.ParseClassFlag(0, TokenContext.ParsingAnnotation);
//		/*local*/String ClassName = NameToken.ParsedText;
//		/*local*/GtType DefinedType = NameSpace.GetType(ClassName);
//		if(DefinedType != null && DefinedType.IsAbstractType()) {
//			DefinedType.TypeFlag = ClassFlag;
//			DefinedType.SuperType = SuperType;
//			NameToken = null; // preventing duplicated symbol message at (A)
//		}
//		else {
//			DefinedType = SuperType.CreateSubType(ClassFlag, ClassName, null, null);
//			ClassNameSpace.AppendTypeName(DefinedType, NameToken);  // temporary
//		}
//		ClassNameSpace.SetSymbol("This", DefinedType, NameToken);
//		ClassDeclTree.SetMatchedPatternAt(GreenTeaConsts.ClassDeclBlock, ClassNameSpace, TokenContext, "$Block$", GreenTeaConsts.Optional);
//		if(ClassDeclTree.HasNodeAt(GreenTeaConsts.ClassDeclBlock)) {
//			/*local*/GtClassField ClassField = new GtClassField(DefinedType, NameSpace);
//			/*local*/GtTypeEnv Gamma = new GtTypeEnv(ClassNameSpace);
//			/*local*/GtSyntaxTree SubTree = ClassDeclTree.GetSyntaxTreeAt(GreenTeaConsts.ClassDeclBlock);
//			while(SubTree != null) {
//				if(SubTree.Pattern.EqualsName("$VarDecl$")) {
//					KonohaGrammar.TypeFieldDecl(Gamma, SubTree, ClassField);
//				}
//				SubTree = SubTree.NextTree;
//			}
//			ClassDeclTree.ParsedValue = ClassField;
//		}
//		if(ClassDeclTree.IsValidSyntax()) {
//			NameSpace.AppendTypeName(DefinedType, NameToken);   /* (A) */
//		}
//		return ClassDeclTree;
//	}
//
//	public static GtNode TypeClassDecl2(GtTypeEnv Gamma, GtSyntaxTree ParsedTree, GtType ContextType) {
//		/*local*/GtClassField ClassField = (/*cast*/GtClassField)ParsedTree.ParsedValue;
//		if(ClassField != null) {
//			/*local*/GtType DefinedType = ClassField.DefinedType;
//			DefinedType.SetClassField(ClassField);
//			Gamma.Generator.OpenClassField(ParsedTree, DefinedType, ClassField);
//			/*local*/GtSyntaxTree SubTree = ParsedTree.GetSyntaxTreeAt(GreenTeaConsts.ClassDeclBlock);
//			/*local*/ArrayList<GtFunc> MemberList = new ArrayList<GtFunc>();
//			while(SubTree != null) {
//				if(SubTree.Pattern.EqualsName("$FuncDecl$") || SubTree.Pattern.EqualsName("$Constructor2$")) {
//					MemberList.add((/*cast*/GtFunc)SubTree.ParsedValue);
//				}
//				if(!SubTree.Pattern.EqualsName("$VarDecl$")) {
//					SubTree.TypeCheck(Gamma, GtStaticTable.VoidType, GreenTeaConsts.DefaultTypeCheckPolicy);
//				}
//				SubTree = SubTree.NextTree;
//			}
//			Gamma.Generator.CloseClassField(DefinedType, MemberList);
//		}
//		return Gamma.Generator.CreateEmptyNode(GtStaticTable.VoidType);
//	}
	
	public static void ImportGrammar(GtNameSpace NameSpace, Class<?> Grammar) {
		NameSpace.AppendTokenFunc(" \t", LibNative.LoadTokenFunc(Grammar, "WhiteSpaceToken"));
		NameSpace.AppendTokenFunc("\n",  LibNative.LoadTokenFunc(Grammar, "IndentToken"));
		NameSpace.AppendTokenFunc(";", LibNative.LoadTokenFunc(Grammar, "SemiColonToken"));
		NameSpace.AppendTokenFunc("{}()[]<>.,?:+-*/%=&|!@~^$", LibNative.LoadTokenFunc(Grammar, "OperatorToken"));
		NameSpace.AppendTokenFunc("/", LibNative.LoadTokenFunc(Grammar, "CommentToken"));  // overloading
		NameSpace.AppendTokenFunc("Aa_", LibNative.LoadTokenFunc(Grammar, "SymbolToken"));

		NameSpace.AppendTokenFunc("\"", LibNative.LoadTokenFunc(Grammar, "StringLiteralToken"));
		NameSpace.AppendTokenFunc("1",  LibNative.LoadTokenFunc(Grammar, "NumberLiteralToken"));

		/*local*/GtFunc MatchUnary     = LibNative.LoadMatchFunc(Grammar, "MatchUnary");
		/*local*/GtFunc MatchBinary    = LibNative.LoadMatchFunc(Grammar, "MatchBinary");

		NameSpace.AppendSyntax("null", LibNative.LoadMatchFunc(Grammar, "MatchNull"));
		NameSpace.AppendSyntax("true", LibNative.LoadMatchFunc(Grammar, "MatchTrue"));
		NameSpace.AppendSyntax("false", LibNative.LoadMatchFunc(Grammar, "MatchFalse"));

		NameSpace.AppendSyntax("+", MatchUnary);
		NameSpace.AppendSyntax("-", MatchUnary);
		NameSpace.AppendSyntax("~", MatchUnary);
		NameSpace.AppendSyntax("!", LibNative.LoadMatchFunc(Grammar, "MatchNot"));
//		NameSpace.AppendSyntax("++ --", LibNative.LoadMatchFunc(Grammar, "MatchIncl"));

		NameSpace.AppendSuffixSyntax("* / %", ZenPrecedence.CStyleMUL, MatchBinary);
		NameSpace.AppendSuffixSyntax("+ -", ZenPrecedence.CStyleADD, MatchBinary);

		NameSpace.AppendSuffixSyntax("< <= > >=", ZenPrecedence.CStyleCOMPARE, MatchBinary);
		NameSpace.AppendSuffixSyntax("== !=", ZenPrecedence.CStyleEquals, MatchBinary);

		NameSpace.AppendSuffixSyntax("<< >>", ZenPrecedence.CStyleSHIFT, MatchBinary);
		NameSpace.AppendSuffixSyntax("&", ZenPrecedence.CStyleBITAND, MatchBinary);
		NameSpace.AppendSuffixSyntax("|", ZenPrecedence.CStyleBITOR, MatchBinary);
		NameSpace.AppendSuffixSyntax("^", ZenPrecedence.CStyleBITXOR, MatchBinary);

		NameSpace.AppendSuffixSyntax("=", ZenPrecedence.CStyleAssign | ZenParserConst.LeftJoin, MatchBinary);
//		NameSpace.AppendSuffixSyntax("+= -= *= /= %= <<= >>= &= |= ^=", ZenPrecedence.CStyleAssign, MatchBinary);
//		NameSpace.AppendExtendedSyntax("++ --", 0, LibNative.LoadMatchFunc(Grammar, "MatchIncl"));

		NameSpace.AppendSuffixSyntax("&&", ZenPrecedence.CStyleAND, LibNative.LoadMatchFunc(Grammar, "MatchAnd"));
		NameSpace.AppendSuffixSyntax("||", ZenPrecedence.CStyleOR, LibNative.LoadMatchFunc(Grammar, "MatchOr"));
		NameSpace.AppendSuffixSyntax("<: instanceof", ZenPrecedence.Instanceof, MatchBinary);

//		NameSpace.AppendExtendedSyntax("?", 0, LibNative.LoadMatchFunc(Grammar, "MatchTrinary"));

//		NameSpace.AppendSyntax("$Error$", LibNative.LoadMatchFunc(Grammar, "MatchError"));
//		NameSpace.AppendSyntax("$Empty$", LibNative.LoadMatchFunc(Grammar, "MatchEmpty"));
		NameSpace.AppendSyntax("$Symbol$", LibNative.LoadMatchFunc(Grammar, "MatchSymbol"));
		NameSpace.AppendSyntax("$Type$",LibNative.LoadMatchFunc(Grammar, "MatchType"));
		NameSpace.AppendSyntax("$TypeSuffix$", LibNative.LoadMatchFunc(Grammar, "MatchTypeSuffix"));
		NameSpace.AppendSyntax("$TypeAnnotation$", LibNative.LoadMatchFunc(Grammar, "MatchTypeSuffix"));
		
//		NameSpace.AppendSyntax("<", LibNative.LoadMatchFunc(Grammar, "MatchGenericFuncDecl"));
//		NameSpace.AppendSyntax("$Variable$", LibNative.LoadMatchFunc(Grammar, "MatchVariable"));
//		NameSpace.AppendSyntax("$Const$", LibNative.LoadMatchFunc(Grammar, "MatchConst"));
//		NameSpace.AppendSyntax("$CharLiteral$", LibNative.LoadMatchFunc(Grammar, "MatchCharLiteral"));
		NameSpace.AppendSyntax("$StringLiteral$", LibNative.LoadMatchFunc(Grammar, "MatchStringLiteral"));
		NameSpace.AppendSyntax("$IntegerLiteral$", LibNative.LoadMatchFunc(Grammar, "MatchIntLiteral"));
		NameSpace.AppendSyntax("$FloatLiteral$", LibNative.LoadMatchFunc(Grammar, "MatchFloatLiteral"));

		NameSpace.AppendSuffixSyntax(".", 0, LibNative.LoadMatchFunc(Grammar, "MatchGetter"));

		NameSpace.AppendSyntax("(", LibNative.LoadMatchFunc(Grammar, "MatchGroup"));
		NameSpace.AppendSyntax("(", LibNative.LoadMatchFunc(Grammar, "MatchCast"));
		NameSpace.AppendSuffixSyntax("(", 0, LibNative.LoadMatchFunc(Grammar, "MatchApply"));
//		NameSpace.AppendSyntax("[", LibNative.LoadMatchFunc(Grammar, "MatchArray"), LibNative.LoadMatchFunc(Grammar, "MatchArray"));
//		NameSpace.AppendExtendedSyntax("[", 0, LibNative.LoadMatchFunc(Grammar, "MatchIndexer"), LibNative.LoadMatchFunc(Grammar, "MatchIndexer"));
//		NameSpace.AppendExtendedSyntax("[", 0, LibNative.LoadMatchFunc(Grammar, "MatchSlice"), LibNative.LoadMatchFunc(Grammar, "MatchSlice"));
//		NameSpace.AppendSyntax("|", LibNative.LoadMatchFunc(Grammar, "MatchSize"), LibNative.LoadMatchFunc(Grammar, "MatchSize"));

		NameSpace.AppendSyntax("$Block$", LibNative.LoadMatchFunc(Grammar, "MatchBlock"));
		NameSpace.AppendSyntax("$Statement$", LibNative.LoadMatchFunc(Grammar, "MatchStatement"));
		NameSpace.AppendSyntax("$Expression$", LibNative.LoadMatchFunc(Grammar, "MatchExpression"));
		NameSpace.AppendSyntax("$SuffixExpression$", LibNative.LoadMatchFunc(Grammar, "MatchSuffixExpression"));

		NameSpace.AppendSyntax("if", LibNative.LoadMatchFunc(Grammar, "MatchIf"));
		NameSpace.AppendSyntax("return", LibNative.LoadMatchFunc(Grammar, "MatchReturn"));

		NameSpace.AppendSyntax("$Identifier$", LibNative.LoadMatchFunc(Grammar, "MatchIdentifier"));
		NameSpace.AppendSyntax("var",  LibNative.LoadMatchFunc(Grammar, "MatchVarDecl"));
		NameSpace.AppendSyntax("$Param$", LibNative.LoadMatchFunc(Grammar, "MatchParam"));
		NameSpace.AppendSyntax("function", LibNative.LoadMatchFunc(Grammar, "MatchFunction"));
		NameSpace.AppendSyntax("let", LibNative.LoadMatchFunc(Grammar, "MatchLetDecl"));
	}

}
