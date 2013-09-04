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
package org.GreenTeaScript;
import java.util.ArrayList;
//endif VAJA

public class DShellGrammar extends GtGrammar {
	
	public final static String[] ShellGrammarReservedKeywords = {"true", "false", "as", "if", "/"};

	// shell grammar
	public static int SymbolShellToken(GtTokenContext TokenContext, String SourceText, int pos) {
		/*local*/int start = pos;
		/*local*/boolean isHeadOfToken = true;
		while(pos < SourceText.length()) {
			/*local*/char ch = LibGreenTea.CharAt(SourceText, pos);
			// a-zA-Z0-9_-
			if(ch == ' ' || ch == '\t' || ch == '\n' || ch == ';') {
				break;
			}
			else if(ch == '|' || ch == '>' || ch == '<') {
				if(isHeadOfToken) {
					pos += 1;
				}
				break;
			}
			isHeadOfToken = false;
			pos += 1;
		}
		if(start == pos) {
			return NoMatch;
		}
		/*local*/String Symbol = SourceText.substring(start, pos);

		/*local*/int i = 0;
		while(i < ShellGrammarReservedKeywords.length) {
			/*local*/String Keyword = ShellGrammarReservedKeywords[i];
			if(Symbol.equals(Keyword)) {
				return GtStatic.NoMatch;
			}
			i = i + 1;
		}

		if(Symbol.startsWith("/")) {
			if(Symbol.startsWith("//")) { // One-Line Comment
				return GtStatic.NoMatch;
			}
			if(Symbol.startsWith("/*")) {
				return GtStatic.NoMatch;
			}
		}

		if(LibGreenTea.IsUnixCommand(Symbol)) {
			TokenContext.AddNewToken(Symbol, WhiteSpaceTokenFlag, "$ShellExpression$");
			return pos;
		}

		/*local*/int SrcListSize = TokenContext.SourceList.size();
		if(SrcListSize > 0) {
			/*local*/int index = SrcListSize - 1;
			while(index >= 0) {
				/*local*/GtToken PrevToken = TokenContext.SourceList.get(index);
				if(PrevToken.PresetPattern != null &&
					PrevToken.PresetPattern.EqualsName("$ShellExpression$")) {
					TokenContext.AddNewToken(Symbol, WhiteSpaceTokenFlag, "$StringLiteral$");
					return pos;
				}
				if(PrevToken.IsIndent() || PrevToken.EqualsText(";")) {
					break;
				}
				index = index - 1;
			}
		}
		return GtStatic.NoMatch;
	}

	public final static GtSyntaxTree ParseShell(GtNameSpace NameSpace, GtTokenContext TokenContext, GtSyntaxTree LeftTree, GtSyntaxPattern Pattern) {
		/*local*/GtToken Token = TokenContext.Next();
		/*local*/GtSyntaxTree NewTree = new GtSyntaxTree(Pattern, NameSpace, Token, null);
		/*local*/int ParseFlag = TokenContext.ParseFlag;
		TokenContext.ParseFlag = 0;
		while(!GtStatic.IsEmptyOrError(NewTree) && !TokenContext.MatchToken(";")) {
			/*local*/GtSyntaxTree Tree = null;
			if(TokenContext.GetToken().IsDelim() || TokenContext.GetToken().IsIndent()) {
				break;
			}

			if(TokenContext.GetToken().IsNextWhiteSpace()) {
				Tree = TokenContext.ParsePattern(NameSpace, "$StringLiteral$", Optional);
				if(Tree == null) {
					Tree = TokenContext.ParsePattern(NameSpace, "$ShellExpression$", Optional);
				}
			}
			if(Tree == null) {
				Tree = TokenContext.ParsePattern(NameSpace, "$Expression$", Optional);
			}
			NewTree.AppendParsedTree2(Tree);
		}
		TokenContext.ParseFlag = ParseFlag;
		return NewTree;
	}

	public static GtNode TypeShell(GtTypeEnv Gamma, GtSyntaxTree ParsedTree, GtType ContextType) {
		/*local*/CommandNode Node = (/*cast*/CommandNode) Gamma.Generator.CreateCommandNode(ContextType, ParsedTree, null);
		/*local*/GtNode HeadNode = Node;
		/*local*/int i = 0;
		/*local*/String Command = ParsedTree.KeyToken.ParsedText;
		/*local*/GtNode ThisNode = Gamma.Generator.CreateConstNode(Gamma.StringType, ParsedTree, Command);
		Node.Append(ThisNode);
		while(i < LibGreenTea.ListSize(ParsedTree.SubTreeList)) {
			/*local*/GtNode ExprNode = ParsedTree.TypeCheckAt(i, Gamma, Gamma.StringType, DefaultTypeCheckPolicy);
			if(ExprNode instanceof ConstNode) {
				/*local*/ConstNode CNode = (/*cast*/ConstNode) ExprNode;
				if(CNode.ConstValue instanceof String) {
					/*local*/String Val = (/*cast*/String) CNode.ConstValue;
					if(Val.equals("|")) {
						LibGreenTea.DebugP("PIPE");
						/*local*/CommandNode PrevNode = Node;
						Node = (/*cast*/CommandNode) Gamma.Generator.CreateCommandNode(ContextType, ParsedTree, null);
						PrevNode.PipedNextNode = Node;
					}
				}
			}
			Node.Append(ExprNode);
			i = i + 1;
		}
		return HeadNode;
	}

	@Override public void LoadTo(GtNameSpace NameSpace) {
		/*local*/GtParserContext ParserContext = NameSpace.Context;
		NameSpace.AppendTokenFunc("Aa-/1.<>|", LoadTokenFunc(ParserContext, this, "SymbolShellToken")); // overloading
		//NameSpace.AppendSyntax("$ShellExpression$", FunctionB(this, "ParseShell"), FunctionC(this, "TypeShell"));
		NameSpace.AppendSyntax("$ShellExpression$", LoadParseFunc(ParserContext, this, "ParseShell"), LoadTypeFunc(ParserContext, this, "TypeShell"));
	}

}
