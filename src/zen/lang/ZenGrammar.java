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
package zen.lang;
import java.util.ArrayList;

import zen.ast.GtAndNode;
import zen.ast.GtApplyNode;
import zen.ast.GtArrayLiteralNode;
import zen.ast.GtBinaryNode;
import zen.ast.GtBlockNode;
import zen.ast.GtBooleanNode;
import zen.ast.GtBreakNode;
import zen.ast.GtCastNode;
import zen.ast.GtCatchNode;
import zen.ast.GtConstNode;
import zen.ast.GtErrorNode;
import zen.ast.GtFloatNode;
import zen.ast.GtFuncDeclNode;
import zen.ast.GtFunctionLiteralNode;
import zen.ast.GtGetIndexNode;
import zen.ast.GtGetLocalNode;
import zen.ast.GtGetterNode;
import zen.ast.GtGroupNode;
import zen.ast.GtIfNode;
import zen.ast.GtInstanceOfNode;
import zen.ast.GtIntNode;
import zen.ast.GtMapLiteralNode;
import zen.ast.GtMethodCallNode;
import zen.ast.GtNode;
import zen.ast.GtNullNode;
import zen.ast.GtOrNode;
import zen.ast.GtParamNode;
import zen.ast.GtReturnNode;
import zen.ast.GtSetIndexNode;
import zen.ast.GtSetterNode;
import zen.ast.GtStringNode;
import zen.ast.GtThrowNode;
import zen.ast.GtTryNode;
import zen.ast.GtTypeNode;
import zen.ast.GtUnaryNode;
import zen.ast.GtVarDeclNode;
import zen.ast.GtWhileNode;
import zen.deps.LibNative;
import zen.deps.LibZen;
import zen.parser.GtNameSpace;
import zen.parser.GtToken;
import zen.parser.GtVariableInfo;
import zen.parser.ZenLogger;
import zen.parser.ZenParserConst;
import zen.parser.ZenSyntaxPattern;
import zen.parser.ZenTokenContext;

//endif VAJA

public class ZenGrammar {
	// Token
	public static long WhiteSpaceToken(ZenTokenContext TokenContext, String SourceText, long pos) {
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

	public static long IndentToken(ZenTokenContext TokenContext, String SourceText, long pos) {
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

	public static long SemiColonToken(ZenTokenContext TokenContext, String SourceText, long pos) {
		TokenContext.AppendParsedToken(LibZen.SubString(SourceText, pos, (pos+1)), ZenParserConst.DelimTokenFlag, null);
		return pos+1;
	}

	public static long SymbolToken(ZenTokenContext TokenContext, String SourceText, long pos) {
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

	public static long OperatorToken(ZenTokenContext TokenContext, String SourceText, long pos) {
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
			/*local*/ZenSyntaxPattern Pattern = TokenContext.TopLevelNameSpace.GetExtendedSyntaxPattern(Sub);
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

	public static long CommentToken(ZenTokenContext TokenContext, String SourceText, long pos) {
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
			return ZenGrammar.IndentToken(TokenContext, SourceText, NextPos);
		}
		return ZenParserConst.MismatchedPosition;
	}

	public static long NumberLiteralToken(ZenTokenContext TokenContext, String SourceText, long pos) {
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

	public static long StringLiteralToken(ZenTokenContext TokenContext, String SourceText, long pos) {
		/*local*/long start = pos;
		pos = pos + 1; // eat "\""
		while(pos < SourceText.length()) {
			pos = ZenGrammar.SkipBackSlashOrNewLineOrDoubleQuote(SourceText, pos);
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
				TokenContext.ReportTokenError1(ZenLogger.ErrorLevel, "expected \" to close the string literal", LibZen.SubString(SourceText, start, pos));
				TokenContext.FoundLineFeed(1);
				return pos;
			}
			pos = pos + 1;
		}
		TokenContext.ReportTokenError1(ZenLogger.ErrorLevel, "expected \" to close the string literal", LibZen.SubString(SourceText, start, pos));
		return pos;
	}

	// Match 

	public static GtNode MatchNull(GtNameSpace NameSpace, ZenTokenContext TokenContext, GtNode LeftNode) {
		return new GtNullNode(TokenContext.GetTokenAndMoveForward());
	}

	public static GtNode MatchTrue(GtNameSpace NameSpace, ZenTokenContext TokenContext, GtNode LeftNode) {
		return new GtBooleanNode(TokenContext.GetTokenAndMoveForward(), true);
	}

	public static GtNode MatchFalse(GtNameSpace NameSpace, ZenTokenContext TokenContext, GtNode LeftNode) {
		return new GtBooleanNode(TokenContext.GetTokenAndMoveForward(), false);
	}

	public static GtNode MatchIntLiteral(GtNameSpace NameSpace, ZenTokenContext TokenContext, GtNode LeftNode) {
		/*local*/GtToken Token = TokenContext.GetTokenAndMoveForward();
		return new GtIntNode(Token, LibZen.ParseInt(Token.ParsedText));
	}

	public static GtNode MatchFloatLiteral(GtNameSpace NameSpace, ZenTokenContext TokenContext, GtNode LeftNode) {
		/*local*/GtToken Token = TokenContext.GetTokenAndMoveForward();
		return new GtFloatNode(Token, LibZen.ParseFloat(Token.ParsedText));
	}

	public static GtNode MatchStringLiteral(GtNameSpace NameSpace, ZenTokenContext TokenContext, GtNode LeftNode) {
		/*local*/GtToken Token = TokenContext.GetTokenAndMoveForward();
		return new GtStringNode(Token, LibZen.UnquoteString(Token.ParsedText));
	}

	public static GtNode MatchArrayLiteral(GtNameSpace NameSpace, ZenTokenContext TokenContext, GtNode LeftNode) {
		/*local*/GtNode LiteralNode = new GtArrayLiteralNode();
		if(!TokenContext.MatchToken("]")) {
			while(TokenContext.HasNext()) {
				LiteralNode = TokenContext.AppendMatchedPattern(LiteralNode, NameSpace, "$Expression$", ZenParserConst.Required);
				if(LiteralNode.IsErrorNode() || TokenContext.MatchToken("]")) {
					break;
				}
				LiteralNode = TokenContext.MatchNodeToken(LiteralNode, NameSpace, ",", ZenParserConst.Required);
				if(LiteralNode.IsErrorNode() || TokenContext.MatchToken("]")) {
					break;
				}
			}
		}
		return LiteralNode;
	}

	public static GtNode MatchMapLiteral(GtNameSpace NameSpace, ZenTokenContext TokenContext, GtNode LeftNode) {
		/*local*/GtNode LiteralNode = new GtMapLiteralNode();
		if(!TokenContext.MatchToken("}")) {
			while(TokenContext.HasNext()) {
				LiteralNode = TokenContext.AppendMatchedPattern(LiteralNode, NameSpace, "$Expression$", ZenParserConst.Required);
				LiteralNode = TokenContext.MatchNodeToken(LiteralNode, NameSpace, ":", ZenParserConst.Required);
				LiteralNode = TokenContext.AppendMatchedPattern(LiteralNode, NameSpace, "$Expression$", ZenParserConst.Required);
				if(LiteralNode.IsErrorNode() || TokenContext.MatchToken("}")) {
					break;
				}
				LiteralNode = TokenContext.MatchNodeToken(LiteralNode, NameSpace, ",", ZenParserConst.Required);
				if(LiteralNode.IsErrorNode() || TokenContext.MatchToken("}")) {
					break;
				}
			}
		}
		return LiteralNode;		
	}

	public static GtNode MatchType(GtNameSpace NameSpace, ZenTokenContext TokenContext, GtNode LeftNode) {
		/*local*/GtToken Token = TokenContext.GetTokenAndMoveForward();
		/*local*/ZenType Type = NameSpace.GetType(Token.ParsedText);
		if(Type != null) {
			GtNode TypeNode = new GtTypeNode(Token, Type);
			return TokenContext.ParsePatternAfter(NameSpace, TypeNode, "$TypeSuffix$", ZenParserConst.Optional);
		}
		return null; // Not Matched
	}

	public static GtNode MatchTypeSuffix(GtNameSpace NameSpace, ZenTokenContext TokenContext, GtNode LeftNode) {
		GtTypeNode TypeNode = (GtTypeNode) LeftNode;
		if(TypeNode.Type.GetParamSize() > 0) {
			if(TokenContext.MatchToken("<")) {  // Generics
				/*local*/ArrayList<ZenType> TypeList = new ArrayList<ZenType>();
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
				TypeNode.Type = ZenSystem.GetGenericType(TypeNode.Type, 0, TypeList, true);
			}
		}
		while(TokenContext.MatchToken("[")) {  // Array
			if(!TokenContext.MatchToken("]")) {
				return null;
			}
			TypeNode.Type = ZenSystem.GetGenericType1(ZenSystem.ArrayType, TypeNode.Type, true);
		}
		return TypeNode;
	}

	public static GtNode MatchSymbol(GtNameSpace NameSpace, ZenTokenContext TokenContext, GtNode LeftNode) {
		/*local*/GtToken Token = TokenContext.GetTokenAndMoveForward();
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
		return NameSpace.Generator.CreateSymbolNode(Token, ZenSystem.VarType, Token.ParsedText, false/*captured*/, AssignedNode);
	}

	// PatternName: "("  (1)
	public static GtNode MatchGroup(GtNameSpace NameSpace, ZenTokenContext TokenContext, GtNode LeftNode) {
		/*local*/GtNode GroupNode = new GtGroupNode();
		TokenContext.Push();
		GroupNode = TokenContext.MatchNodeToken(GroupNode, NameSpace, "(", ZenParserConst.Required | ZenParserConst.AllowSkipIndent);
		GroupNode = TokenContext.AppendMatchedPattern(GroupNode, NameSpace, "$Expression$", ZenParserConst.Required);
		GroupNode = TokenContext.MatchNodeToken(GroupNode, NameSpace, ")", ZenParserConst.Required);
		TokenContext.Pop();
		return GroupNode;
	}
	
	public static GtNode MatchCast(GtNameSpace NameSpace, ZenTokenContext TokenContext, GtNode LeftNode) {
		/*local*/GtNode CastNode = new GtCastNode(ZenSystem.VarType, null);
		CastNode = TokenContext.MatchNodeToken(CastNode, NameSpace, "(", ZenParserConst.Required | ZenParserConst.AllowSkipIndent);
		CastNode = TokenContext.AppendMatchedPattern(CastNode, NameSpace, "$Type$", ZenParserConst.Required);
		CastNode = TokenContext.MatchNodeToken(CastNode, NameSpace, ")", ZenParserConst.Required);
		CastNode = TokenContext.AppendMatchedPattern(CastNode, NameSpace, "$SuffixExpression$", ZenParserConst.Required);
		return CastNode;
	}

	public static GtNode MatchGetter(GtNameSpace NameSpace, ZenTokenContext TokenContext, GtNode LeftNode) {
		TokenContext.MatchToken(".");
		/*local*/GtToken Token = TokenContext.GetTokenAndMoveForward();
		if(!Token.IsNameSymbol()) {
			return TokenContext.CreateExpectedErrorNode(Token, "field name");
		}
		if(TokenContext.MatchToken("(")) {  // method call
			/*local*/GtNode MethodCallNode = new GtMethodCallNode(Token, LeftNode, Token.ParsedText);
			if(!TokenContext.MatchToken(")")) {
				while(!MethodCallNode.IsErrorNode()) {
					MethodCallNode = TokenContext.AppendMatchedPattern(MethodCallNode, NameSpace, "$Expression$", ZenParserConst.Required);
					if(TokenContext.MatchToken(")")) {
						break;
					}
					MethodCallNode = TokenContext.MatchNodeToken(MethodCallNode, NameSpace, ",", ZenParserConst.Required | ZenParserConst.DisallowSkipIndent);
				}
			}
			return MethodCallNode;
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
	
	public static GtNode MatchApply(GtNameSpace NameSpace, ZenTokenContext TokenContext, GtNode LeftNode) {
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

	public static GtNode MatchIndexer(GtNameSpace NameSpace, ZenTokenContext TokenContext, GtNode LeftNode) {
		/*local*/GtNode IndexerNode = new GtGetIndexNode(LeftNode);
		IndexerNode = TokenContext.MatchNodeToken(IndexerNode, NameSpace, "[", ZenParserConst.Required);
		IndexerNode = TokenContext.AppendMatchedPattern(IndexerNode, NameSpace, "$Expression$", ZenParserConst.Required);
		IndexerNode = TokenContext.MatchNodeToken(IndexerNode, NameSpace, "]", ZenParserConst.Required);
		if(TokenContext.MatchToken("=") && !IndexerNode.IsErrorNode()) {
			IndexerNode = new GtSetIndexNode((GtGetIndexNode)IndexerNode);
			IndexerNode = TokenContext.AppendMatchedPattern(IndexerNode, NameSpace, "$Expression$", ZenParserConst.Required);			
		}
		return IndexerNode;
	}

	public static GtNode MatchUnary(GtNameSpace NameSpace, ZenTokenContext TokenContext, GtNode LeftNode) {
		/*local*/GtNode UnaryNode = new GtUnaryNode(TokenContext.GetTokenAndMoveForward());
		return TokenContext.AppendMatchedPattern(UnaryNode, NameSpace, "$SuffixExpression$", ZenParserConst.Required);
	}

	public static GtNode MatchNot(GtNameSpace NameSpace, ZenTokenContext TokenContext, GtNode LeftNode) {
		/*local*/GtNode UnaryNode = new GtUnaryNode(TokenContext.GetTokenAndMoveForward());
		UnaryNode = TokenContext.AppendMatchedPattern(UnaryNode, NameSpace, "$SuffixExpression$", ZenParserConst.Required);
		return UnaryNode;
	}
	
	private static GtNode RightJoin(GtNameSpace NameSpace, GtNode LeftNode, ZenSyntaxPattern Pattern, GtToken Token, GtBinaryNode RightNode) {
		/*local*/GtNode RightLeftNode = RightNode.LeftNode;
		if(RightLeftNode instanceof GtBinaryNode && Pattern.IsRightJoin(((GtBinaryNode)RightLeftNode).Pattern)) {
			RightNode.LeftNode = ZenGrammar.RightJoin(NameSpace, LeftNode, Pattern, Token, (GtBinaryNode) RightLeftNode);
		}
		else {
			/*local*/GtBinaryNode BinaryNode = new GtBinaryNode(Token, LeftNode, Pattern);
			BinaryNode.Append(RightLeftNode);
			RightNode.LeftNode = BinaryNode;
			RightNode.SetChild(BinaryNode);
		}
		return RightNode;
	}
 
	public static GtNode MatchBinary(GtNameSpace NameSpace, ZenTokenContext TokenContext, GtNode LeftNode) {
		/*local*/GtToken Token = TokenContext.GetTokenAndMoveForward();
		/*local*/GtNode RightNode = TokenContext.ParsePattern(NameSpace, "$Expression$", ZenParserConst.Required);
		if(RightNode.IsErrorNode()) {
			return RightNode;
		}
		/*local*/ZenSyntaxPattern Pattern = NameSpace.GetExtendedSyntaxPattern(Token.ParsedText);  // FIXME
		if(RightNode instanceof GtBinaryNode && Pattern.IsRightJoin(((GtBinaryNode)RightNode).Pattern)) {
			return ZenGrammar.RightJoin(NameSpace, LeftNode, Pattern, Token, (GtBinaryNode) RightNode);
		}
		// LeftJoin
		/*local*/GtBinaryNode BinaryNode = new GtBinaryNode(Token, LeftNode, Pattern);
		BinaryNode.Append(RightNode);
		return BinaryNode;
	}

	public static GtNode MatchSuffixExpression(GtNameSpace NameSpace, ZenTokenContext TokenContext, GtNode LeftNode) {
		ZenSyntaxPattern Pattern = TokenContext.GetFirstPattern(NameSpace);
		LeftNode = TokenContext.ApplyMatchPattern(NameSpace, LeftNode, Pattern);
		while(LeftNode != null) {
			/*local*/ZenSyntaxPattern SuffixPattern = TokenContext.GetSuffixPattern(NameSpace);
			if(SuffixPattern == null || SuffixPattern.IsBinaryOperator()) {
				break;
			}
			LeftNode = TokenContext.ApplyMatchPattern(NameSpace, LeftNode, SuffixPattern);
		}
		return LeftNode;
	}

	public static GtNode MatchAnd(GtNameSpace NameSpace, ZenTokenContext TokenContext, GtNode LeftNode) {
		/*local*/GtNode BinaryNode = new GtAndNode(TokenContext.GetTokenAndMoveForward(), LeftNode, NameSpace.GetSyntaxPattern("&&"));
		BinaryNode = TokenContext.AppendMatchedPattern(BinaryNode, NameSpace, "$Expression$", ZenParserConst.Required);
		return BinaryNode;
	}

	public static GtNode MatchOr(GtNameSpace NameSpace, ZenTokenContext TokenContext, GtNode LeftNode) {
		/*local*/GtNode BinaryNode = new GtOrNode(TokenContext.GetTokenAndMoveForward(), LeftNode, NameSpace.GetSyntaxPattern("||"));
		BinaryNode = TokenContext.AppendMatchedPattern(BinaryNode, NameSpace, "$Expression$", ZenParserConst.Required);
		return BinaryNode;
	}

	public static GtNode MatchInstanceOf(GtNameSpace NameSpace, ZenTokenContext TokenContext, GtNode LeftNode) {
		/*local*/GtNode BinaryNode = new GtInstanceOfNode(TokenContext.GetTokenAndMoveForward(), LeftNode, NameSpace.GetSyntaxPattern("instanceof"));
		BinaryNode = TokenContext.AppendMatchedPattern(BinaryNode, NameSpace, "$Expression$", ZenParserConst.Required);
		return BinaryNode;
	}

	public static GtNode MatchExpression(GtNameSpace NameSpace, ZenTokenContext TokenContext, GtNode LeftNode) {
		ZenSyntaxPattern Pattern = TokenContext.GetFirstPattern(NameSpace);
		LeftNode = TokenContext.ApplyMatchPattern(NameSpace, LeftNode, Pattern);
		while(LeftNode != null) {
			/*local*/ZenSyntaxPattern SuffixPattern = TokenContext.GetSuffixPattern(NameSpace);
			if(SuffixPattern == null) {
				break;
			}
			LeftNode = TokenContext.ApplyMatchPattern(NameSpace, LeftNode, SuffixPattern);
		}
		return LeftNode;
	}

	public static GtNode MatchIf(GtNameSpace NameSpace, ZenTokenContext TokenContext, GtNode LeftNode) {
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

	public static GtNode MatchReturn(GtNameSpace NameSpace, ZenTokenContext TokenContext, GtNode LeftNode) {
		/*local*/GtNode ReturnNode = new GtReturnNode();
		ReturnNode = TokenContext.MatchNodeToken(ReturnNode, NameSpace, "return", ZenParserConst.Required);
		ReturnNode = TokenContext.AppendMatchedPattern(ReturnNode, NameSpace, "$Expression$", ZenParserConst.Optional);
		return ReturnNode;
	}

	public static GtNode MatchWhile(GtNameSpace NameSpace, ZenTokenContext TokenContext, GtNode LeftNode) {
		/*local*/GtNode WhileNode = new GtWhileNode();
		WhileNode = TokenContext.MatchNodeToken(WhileNode, NameSpace, "while", ZenParserConst.Required);
		WhileNode = TokenContext.MatchNodeToken(WhileNode, NameSpace, "(", ZenParserConst.Required | ZenParserConst.AllowSkipIndent);
		WhileNode = TokenContext.AppendMatchedPattern(WhileNode, NameSpace, "$Expression$", ZenParserConst.Required);
		WhileNode = TokenContext.MatchNodeToken(WhileNode, NameSpace, ")", ZenParserConst.Required | ZenParserConst.DisallowSkipIndent);
		WhileNode = TokenContext.AppendMatchedPattern(WhileNode, NameSpace, "$Block$", ZenParserConst.Required);
		return WhileNode;
	}

	public static GtNode MatchBreak(GtNameSpace NameSpace, ZenTokenContext TokenContext, GtNode LeftNode) {
		/*local*/GtNode BreakNode = new GtBreakNode();
		BreakNode = TokenContext.MatchNodeToken(BreakNode, NameSpace, "break", ZenParserConst.Required);
		return BreakNode;
	}

	public static GtNode MatchCatch(GtNameSpace NameSpace, ZenTokenContext TokenContext, GtNode LeftNode) {
		/*local*/GtNode CatchNode = new GtCatchNode();
		CatchNode = TokenContext.MatchNodeToken(CatchNode, NameSpace, "catch", ZenParserConst.Required);
		CatchNode = TokenContext.MatchNodeToken(CatchNode, NameSpace, "(", ZenParserConst.Required | ZenParserConst.AllowSkipIndent);
		CatchNode = TokenContext.AppendMatchedPattern(CatchNode, NameSpace, "$Identifier$", ZenParserConst.Required);
		CatchNode = TokenContext.AppendMatchedPattern(CatchNode, NameSpace, "$TypeAnnotation$", ZenParserConst.Optional);	
		CatchNode = TokenContext.MatchNodeToken(CatchNode, NameSpace, ")", ZenParserConst.Required | ZenParserConst.DisallowSkipIndent);
		CatchNode = TokenContext.AppendMatchedPattern(CatchNode, NameSpace, "$Block$", ZenParserConst.Required);
		return CatchNode;
	}
	
	public static GtNode MatchTry(GtNameSpace NameSpace, ZenTokenContext TokenContext, GtNode LeftNode) {
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

	public static GtNode MatchThrow(GtNameSpace NameSpace, ZenTokenContext TokenContext, GtNode LeftNode) {
		/*local*/GtNode ThrowNode = new GtThrowNode();
		ThrowNode = TokenContext.MatchNodeToken(ThrowNode, NameSpace, "throw", ZenParserConst.Required);
		ThrowNode = TokenContext.AppendMatchedPattern(ThrowNode, NameSpace, "$Expression$", ZenParserConst.Required);
		return ThrowNode;
	}
	
	public static GtNode MatchLetDecl(GtNameSpace NameSpace, ZenTokenContext TokenContext, GtNode LeftNode) {
		GtToken SourceToken = TokenContext.GetTokenAndMoveForward(); /* let */
		GtToken SymbolToken = TokenContext.GetTokenAndMoveForward(); /* name */
		/*local*/ZenType ConstClass = null;
		if(TokenContext.MatchToken(".")) {
			/*local*/String ClassName = SymbolToken.ParsedText;
			ConstClass = NameSpace.GetType(ClassName);
			if(ConstClass == null) {
				return new GtErrorNode(SymbolToken, "unknown type: " + ClassName);
			}
			SymbolToken = TokenContext.GetTokenAndMoveForward(); /* class name */
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
//			ValueNode = NameSpace.TypeCheck(ValueNode, NameSpace.GetSymbolType(ConstName), ZenParserConst.DefaultTypeCheckPolicy);
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

	public static GtNode MatchIdentifier(GtNameSpace NameSpace, ZenTokenContext TokenContext, GtNode LeftNode) {
		/*local*/GtToken Token = TokenContext.GetTokenAndMoveForward();
		if(LibZen.IsVariableName(Token.ParsedText, 0)) {
			return new GtGetLocalNode(ZenSystem.VarType, Token, Token.ParsedText);
		}
		return new GtErrorNode(Token, "illegal name:" + Token.ParsedText);
	}	

	public static GtNode MatchTypeAnnotation(GtNameSpace NameSpace, ZenTokenContext TokenContext, GtNode LeftNode) {
		if(TokenContext.MatchToken(":")) {
			return TokenContext.ParsePattern(NameSpace, "$Type$", ZenParserConst.Required);
		}
		return null;
	}
	
	// "var" $Identifier [: $Type$] "=" $Expression$ 
	public static GtNode MatchVarDecl(GtNameSpace NameSpace, ZenTokenContext TokenContext, GtNode LeftNode) {
		/*local*/GtNode VarNode = new GtVarDeclNode();
		VarNode = TokenContext.MatchNodeToken(VarNode, NameSpace, "var", ZenParserConst.Required);
		VarNode = TokenContext.AppendMatchedPattern(VarNode, NameSpace, "$Idenifier$", ZenParserConst.Required);
		VarNode = TokenContext.AppendMatchedPattern(VarNode, NameSpace, "$TypeAnnotation$", ZenParserConst.Optional);
		VarNode = TokenContext.MatchNodeToken(VarNode, NameSpace, "=", ZenParserConst.Required);
		VarNode = TokenContext.AppendMatchedPattern(VarNode, NameSpace, "$Expression$", ZenParserConst.Required);
		return VarNode;
	}	

	// FuncDecl
	public static GtNode MatchParam(GtNameSpace NameSpace, ZenTokenContext TokenContext, GtNode LeftNode) {
		/*local*/GtToken NameToken = TokenContext.GetTokenAndMoveForward();
		if(!NameToken.IsNameSymbol()) {
			return TokenContext.CreateExpectedErrorNode(NameToken, "parameter name");
		}
		GtNode VarNode = new GtParamNode(ZenSystem.VarType, NameToken, NameToken.ParsedText);
		VarNode = TokenContext.AppendMatchedPattern(VarNode, NameSpace, "$TypeAnnotation$", ZenParserConst.Optional);
		return VarNode;
	}
	
	public static GtNode MatchFunction(GtNameSpace NameSpace, ZenTokenContext TokenContext, GtNode LeftNode) {
		/*local*/GtToken FuncToken = TokenContext.GetTokenAndMoveForward(); /* function*/
		/*local*/GtNode FuncNode;
		if(TokenContext.IsToken("(")) {
			FuncNode = new GtFunctionLiteralNode(FuncToken);
		}
		else {
			/*local*/GtToken NameToken = TokenContext.GetTokenAndMoveForward();
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

	public static GtNode MatchStatement(GtNameSpace NameSpace, ZenTokenContext TokenContext, GtNode LeftNode) {
		TokenContext.SkipAndGetAnnotation(true);
		/*local*/GtNode ParsedNode = TokenContext.ParsePattern(NameSpace, "$Expression$", ZenParserConst.Required);
		if(!ParsedNode.IsErrorNode() && TokenContext.HasNext()) {
			GtToken Token = TokenContext.GetTokenAndMoveForward();
			if(!Token.IsDelim() || !Token.IsIndent()) {
				return TokenContext.CreateExpectedErrorNode(Token, ";");
			}
		}
		return ParsedNode;
	}

	public static GtNode MatchBlock(GtNameSpace NameSpace, ZenTokenContext TokenContext, GtNode LeftNode) {
		TokenContext.SkipIndent();
		if(TokenContext.IsToken("{")) {
			/*local*/GtToken IndentToken = TokenContext.GetCurrentIndentToken();
			/*local*/GtNameSpace BlockNameSpace = NameSpace.CreateSubNameSpace();
			/*local*/GtBlockNode BlockNode = new GtBlockNode(TokenContext.GetTokenAndMoveForward(), BlockNameSpace);
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
	
	public static void ImportGrammar(GtNameSpace NameSpace, Class<?> Grammar) {
		NameSpace.AppendTokenFunc(" \t", LibNative.LoadTokenFunc(Grammar, "WhiteSpaceToken"));
		NameSpace.AppendTokenFunc("\n",  LibNative.LoadTokenFunc(Grammar, "IndentToken"));
		NameSpace.AppendTokenFunc(";", LibNative.LoadTokenFunc(Grammar, "SemiColonToken"));
		NameSpace.AppendTokenFunc("{}()[]<>.,?:+-*/%=&|!@~^$", LibNative.LoadTokenFunc(Grammar, "OperatorToken"));
		NameSpace.AppendTokenFunc("/", LibNative.LoadTokenFunc(Grammar, "CommentToken"));  // overloading
		NameSpace.AppendTokenFunc("Aa_", LibNative.LoadTokenFunc(Grammar, "SymbolToken"));

		NameSpace.AppendTokenFunc("\"", LibNative.LoadTokenFunc(Grammar, "StringLiteralToken"));
		NameSpace.AppendTokenFunc("1",  LibNative.LoadTokenFunc(Grammar, "NumberLiteralToken"));

		/*local*/ZenFunc MatchUnary     = LibNative.LoadMatchFunc(Grammar, "MatchUnary");
		/*local*/ZenFunc MatchBinary    = LibNative.LoadMatchFunc(Grammar, "MatchBinary");

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
		NameSpace.AppendSuffixSyntax("instanceof", ZenPrecedence.Instanceof, LibNative.LoadMatchFunc(Grammar, "MatchInstanceOf"));

//		NameSpace.AppendExtendedSyntax("?", 0, LibNative.LoadMatchFunc(Grammar, "MatchTrinary"));

//		NameSpace.AppendSyntax("$Error$", LibNative.LoadMatchFunc(Grammar, "MatchError"));
//		NameSpace.AppendSyntax("$Empty$", LibNative.LoadMatchFunc(Grammar, "MatchEmpty"));
		NameSpace.AppendSyntax("$Symbol$", LibNative.LoadMatchFunc(Grammar, "MatchSymbol"));
		NameSpace.AppendSyntax("$Type$",LibNative.LoadMatchFunc(Grammar, "MatchType"));
		NameSpace.AppendSyntax("$TypeSuffix$", LibNative.LoadMatchFunc(Grammar, "MatchTypeSuffix"));
		NameSpace.AppendSyntax("$TypeAnnotation$", LibNative.LoadMatchFunc(Grammar, "MatchTypeSuffix"));
		
		NameSpace.AppendSyntax("$StringLiteral$", LibNative.LoadMatchFunc(Grammar, "MatchStringLiteral"));
		NameSpace.AppendSyntax("$IntegerLiteral$", LibNative.LoadMatchFunc(Grammar, "MatchIntLiteral"));
		NameSpace.AppendSyntax("$FloatLiteral$", LibNative.LoadMatchFunc(Grammar, "MatchFloatLiteral"));

		NameSpace.AppendSuffixSyntax(".", 0, LibNative.LoadMatchFunc(Grammar, "MatchGetter"));

		NameSpace.AppendSyntax("(", LibNative.LoadMatchFunc(Grammar, "MatchGroup"));
		NameSpace.AppendSyntax("(", LibNative.LoadMatchFunc(Grammar, "MatchCast"));
		NameSpace.AppendSuffixSyntax("(", 0, LibNative.LoadMatchFunc(Grammar, "MatchApply"));
		
		NameSpace.AppendSuffixSyntax("[", 0, LibNative.LoadMatchFunc(Grammar, "MatchIndexer"));
		NameSpace.AppendSyntax("[", LibNative.LoadMatchFunc(Grammar, "MatchArrayLiteral"));
		NameSpace.AppendSyntax("{", LibNative.LoadMatchFunc(Grammar, "MatchMapLiteral"));
		
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
		NameSpace.AppendSyntax("while", LibNative.LoadMatchFunc(Grammar, "MatchWhile"));
		NameSpace.AppendSyntax("break", LibNative.LoadMatchFunc(Grammar, "MatchBreak"));		
		NameSpace.AppendSyntax("try", LibNative.LoadMatchFunc(Grammar, "MatchTry"));
		NameSpace.AppendSyntax("$Catch$", LibNative.LoadMatchFunc(Grammar, "MatchCatch"));
		NameSpace.AppendSyntax("throw", LibNative.LoadMatchFunc(Grammar, "MatchThrow"));

		NameSpace.AppendSyntax("$Identifier$", LibNative.LoadMatchFunc(Grammar, "MatchIdentifier"));
		NameSpace.AppendSyntax("var",  LibNative.LoadMatchFunc(Grammar, "MatchVarDecl"));
		NameSpace.AppendSyntax("$Param$", LibNative.LoadMatchFunc(Grammar, "MatchParam"));
		NameSpace.AppendSyntax("function", LibNative.LoadMatchFunc(Grammar, "MatchFunction"));
		NameSpace.AppendSyntax("let", LibNative.LoadMatchFunc(Grammar, "MatchLetDecl"));
	}

}
