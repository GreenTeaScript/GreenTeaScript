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
package zen.parser;
import java.util.ArrayList;

import zen.ast.GtErrorNode;
import zen.ast.GtNode;
import zen.deps.LibNative;
import zen.deps.LibZen;

public final class GtTokenContext extends ZenUtils {
	/*field*/public final static GtToken NullToken = new GtToken("", 0);

	/*field*/public GtNameSpace TopLevelNameSpace;
	/*field*/public ArrayList<GtToken> SourceTokenList;
	/*field*/private int CurrentPosition;
	/*field*/public long ParsingLine;
	/*field*/public int  ParseFlag;
	/*field*/private final ArrayList<Integer> ParserStack;
	/*field*/public GtMap ParsingAnnotation;
	/*field*/public GtToken LatestToken;
	/*field*/public int IndentLevel = 0;

	public GtTokenContext/*constructor*/(GtNameSpace NameSpace, String Text, long FileLine) {
		this.TopLevelNameSpace = NameSpace;
		this.SourceTokenList = new ArrayList<GtToken>();
		this.CurrentPosition = 0;
		this.ParsingLine = FileLine;
		this.ParseFlag = 0;
		this.AppendParsedToken(Text, SourceTokenFlag, null);
		this.ParsingAnnotation = null;
		this.IndentLevel = 0;
		this.LatestToken = null;
		this.ParserStack = new ArrayList<Integer>();
	}

	public GtToken AppendParsedToken(String Text, int TokenFlag, String PatternName) {
		/*local*/GtToken Token = new GtToken(Text, this.ParsingLine);
		Token.TokenFlag |= TokenFlag;
		if(PatternName != null) {
			Token.PresetPattern = this.TopLevelNameSpace.GetSyntaxPattern(PatternName);
			LibNative.Assert(Token.PresetPattern != null);
		}
		this.SourceTokenList.add(Token);
		return Token;
	}

	public void FoundWhiteSpace() {
		/*local*/int index = this.SourceTokenList.size() - 1;
		/*local*/GtToken Token = this.SourceTokenList.get(index);
		Token.TokenFlag |= WhiteSpaceTokenFlag;
	}

	public void FoundLineFeed(long line) {
		this.ParsingLine += line;
	}

	@Deprecated
	public void ReportTokenError1(int Level, String Message, String TokenText) {
		/*local*/GtToken Token = this.AppendParsedToken(TokenText, 0, "$Error$");
		this.TopLevelNameSpace.Generator.ReportError(Level, Token, Message);
	}

	public void SkipErrorStatement() {
		/*local*/GtToken LeastRecentToken = this.LatestToken;
		while(this.HasNext()) {
			/*local*/GtToken T = this.GetToken();
			if(T.IsDelim() || T.EqualsText("}")) {
				break;
			}
			this.TopLevelNameSpace.Generator.ReportError(ZenParserConst.InfoLevel, T, "skipping: " + T.ParsedText);
			this.Next();
		}
		this.LatestToken = LeastRecentToken;
	}

	private GtToken GetBeforeToken() {
		/*local*/int pos = this.CurrentPosition - 1;
		while(pos >= 0 && pos < this.SourceTokenList.size()) {
			/*local*/GtToken Token = this.SourceTokenList.get(pos);
			if(IsFlag(Token.TokenFlag, IndentTokenFlag)) {
				pos -= 1;
				continue;
			}
			return Token;
		}
		return this.LatestToken;
	}

	public GtNode CreateExpectedErrorNode(GtToken SourceToken, String ExpectedTokenText) {
		if(SourceToken == null) {
			SourceToken = this.GetBeforeToken();
			return new GtErrorNode(SourceToken, ExpectedTokenText + " is expected after " + SourceToken.ParsedText);
		}
		return new GtErrorNode(SourceToken, ExpectedTokenText + " is expected; " + SourceToken.ParsedText + " is given");
	}

	public void Vacume() {
//		if(this.CurrentPosition > 0) {
//			/*local*/int i = this.CurrentPosition - 1;
//			while(i >= 0) {
//				GtToken Token = this.SourceList.get(i);
//				if(Token == null) {
//					break;
//				}
//				this.SourceList.set(i, null); // invoke gc;
//				i = i - 1;
//			}
//			this.CurrentPosition = 0;
//		}
	}

	private int DispatchFunc(String ScriptSource, int GtChar, int pos) {
		/*local*/GtTokenFunc TokenFunc = this.TopLevelNameSpace.GetTokenFunc(GtChar);
		/*local*/int NextIdx = ZenUtils.ApplyTokenFunc(TokenFunc, this, ScriptSource, pos);
		if(NextIdx == MismatchedPosition) {
			LibZen.VerboseLog(VerboseUndefined, "undefined tokenizer: " + ScriptSource.substring(pos, pos+1));
			this.AppendParsedToken(ScriptSource.substring(pos, pos + 1), 0, null);
			return pos + 1;
		}
		return NextIdx;
	}

	private void Tokenize(String ScriptSource, long CurrentLine) {
		/*local*/int CurrentPos = 0;
		/*local*/int Length = ScriptSource.length();
		this.ParsingLine = CurrentLine;
		while(CurrentPos < Length) {
			/*local*/int GtCode = AsciiToTokenMatrixIndex(LibZen.CharAt(ScriptSource, CurrentPos));
			/*local*/int NextPos = this.DispatchFunc(ScriptSource, GtCode, CurrentPos);
			if(CurrentPos >= NextPos) {
				break;
			}
			CurrentPos = NextPos;
		}
		this.Dump();
	}

	public final int GetPosition(int MatchFlag) {
		/*local*/int Pos = this.CurrentPosition;
		if(IsFlag(MatchFlag, AllowLineFeed)) {
			this.SkipIndent();
		}
		if(IsFlag(MatchFlag, AllowAnnotation)) {
			//this.PushParsingAnnotation();
			this.SkipAndGetAnnotation(true);  
		}
		return Pos;
	}

	public final void RollbackPosition(int Pos, int MatchFlag) {
		this.CurrentPosition = Pos;
		if(IsFlag(MatchFlag, AllowAnnotation)) {
			//this.PopParsingAnnotation();
		}
	}

	public GtToken GetToken() {
		while(this.CurrentPosition < this.SourceTokenList.size()) {
			/*local*/GtToken Token = this.SourceTokenList.get(this.CurrentPosition);
			if(Token.IsSource()) {
				this.SourceTokenList.remove(this.SourceTokenList.size() - 1);
				this.Tokenize(Token.ParsedText, Token.FileLine);
				if(this.CurrentPosition < this.SourceTokenList.size()) {
					Token = this.SourceTokenList.get(this.CurrentPosition);
				}else{
					break;
				}
			}
			if(IsFlag(this.ParseFlag, SkipIndentParseFlag) && Token.IsIndent()) {
				this.CurrentPosition = this.CurrentPosition + 1;
				continue;
			}
			this.LatestToken = Token;
			return Token;
		}
		return GtTokenContext.NullToken;
	}

	public boolean HasNext() {
		return (this.GetToken() != GtTokenContext.NullToken);
	}

	public GtToken Next() {
		/*local*/GtToken Token = this.GetToken();
		this.CurrentPosition += 1;
		return Token;
	}

	public void SkipIndent() {
		/*local*/GtToken Token = this.GetToken();
		while(Token.IsIndent()) {
			this.CurrentPosition = this.CurrentPosition + 1;
			Token = this.GetToken();
		}
	}

	public GtToken GetCurrentIndentToken() {
		/*local*/int i = this.CurrentPosition - 1;
		while(0 <= i) {
			/*local*/GtToken Token = this.SourceTokenList.get(i);
			if(Token.IsIndent()) {
				return Token;
			}
			i -= 1;
		}
		return null;
	}
	
	public void SkipUntilIndent(GtToken IndentToken) {
		while(this.HasNext()) {
			/*local*/GtToken Token = this.GetToken();
			if(Token.IsIndent() && Token.CompareIndent(IndentToken) == 0) {
				return;
			}
			this.CurrentPosition = this.CurrentPosition + 1;
		}
	}	

	
	public GtSyntaxPattern GetFirstPattern(GtNameSpace NameSpace) {
		/*local*/GtToken Token = this.GetToken();
		if(Token.PresetPattern != null) {
			return Token.PresetPattern;
		}
		/*local*/GtSyntaxPattern Pattern = NameSpace.GetSyntaxPattern(Token.ParsedText);
		if(Pattern == null) {
			return NameSpace.GetSyntaxPattern("$Symbol$");
		}
		return Pattern;
	}

	public GtSyntaxPattern GetSuffixPattern(GtNameSpace NameSpace) {
		/*local*/GtToken Token = this.GetToken();
		if(Token != GtTokenContext.NullToken) {
			/*local*/GtSyntaxPattern Pattern = NameSpace.GetExtendedSyntaxPattern(Token.ParsedText);
			return Pattern;
		}
		return null;
	}

	public final boolean IsToken(String TokenText) {
		/*local*/GtToken Token = this.GetToken();
		if(Token.EqualsText(TokenText)) {
			return true;
		}
		return false;
	}

	public final boolean IsNewLineToken(String TokenText) {
		/*local*/int RollbackPos = this.CurrentPosition;
		this.SkipIndent();
		/*local*/GtToken Token = this.GetToken();
		if(Token.EqualsText(TokenText)) {
			return true;
		}
		this.CurrentPosition = RollbackPos;
		return false;
	}
	
	public final boolean MatchToken(String TokenText) {
		/*local*/GtToken Token = this.Next();
		return Token.EqualsText(TokenText);
	}

	public final boolean MatchNewLineToken(String TokenText) {
		/*local*/int RollbackPos = this.CurrentPosition;
		this.SkipIndent();
		/*local*/GtToken Token = this.Next();
		if(Token.EqualsText(TokenText)) {
			return true;
		}
		this.CurrentPosition = RollbackPos;
		return false;
	}

	public GtNode MatchNodeToken(GtNode Base, GtNameSpace NameSpace, String TokenText, int MatchFlag) {
		if(!Base.IsErrorNode()) {
			/*local*/int Pos = this.GetPosition(MatchFlag);
			/*local*/GtToken Token = this.Next();
			if(Token.ParsedText.equals(TokenText)) {
				if(Base.SourceToken == null) {
					Base.SourceToken = Token;
				}
				if(IsFlag(MatchFlag, AllowSkipIndent)) {
					this.SetSkipIndent(true);
				}
				if(IsFlag(MatchFlag, DisallowSkipIndent)) {
					this.SetSkipIndent(false);
				}
			}
			else {
				this.RollbackPosition(Pos, MatchFlag);
				if(IsFlag(MatchFlag, Required)) {
					// FIXME: improve error message
					return new GtErrorNode(Token, "required " + TokenText);
				}
			}
		}
		return Base;
	}

	public GtNode AppendMatchedPattern(GtNode Base, GtNameSpace NameSpace, String PatternName,  int MatchFlag) {
		if(!Base.IsErrorNode()) {
			/*local*/GtToken Token = this.GetToken();
			/*local*/GtNode ParsedNode = this.ParsePattern(NameSpace, PatternName, MatchFlag);
			if(ParsedNode != null) {
				if(ParsedNode.IsErrorNode()) {
					return ParsedNode;
				}
				Base.Append(ParsedNode);
			}
			else {
				if(IsFlag(MatchFlag, Required)) {
					// FIXME: improve error message
					return new GtErrorNode(Token, "required " + PatternName);
				}
			}
		}
		return Base;
	}

	public final boolean StartsWithToken(String TokenText) {
		/*local*/GtToken Token = this.GetToken();
		if(Token.EqualsText(TokenText)) {
			this.CurrentPosition += 1;
			return true;
		}
		if(Token.ParsedText.startsWith(TokenText)) {
			Token = new GtToken(Token.ParsedText.substring(TokenText.length()), Token.FileLine);
			this.CurrentPosition += 1;
			this.SourceTokenList.add(this.CurrentPosition, Token);
			return true;
		}
		return false;
	}

	public final boolean IsAllowedBackTrack() {
		return IsFlag(this.ParseFlag, BackTrackParseFlag);
	}

	public final int SetBackTrack(boolean Allowed) {
		/*local*/int OldFlag = this.ParseFlag;
		if(Allowed) {
			this.ParseFlag = this.ParseFlag | BackTrackParseFlag;
		}
		else {
			this.ParseFlag = (~(BackTrackParseFlag) & this.ParseFlag);
		}
		return OldFlag;
	}

	public final int SetSkipIndent(boolean Allowed) {
		/*local*/int OldFlag = this.ParseFlag;
		if(Allowed) {
			this.ParseFlag = this.ParseFlag | SkipIndentParseFlag;
		}
		else {
			this.ParseFlag = (~(SkipIndentParseFlag) & this.ParseFlag);
		}
		return OldFlag;
	}

	public final void SetRememberFlag(int OldFlag) {
		this.ParseFlag = OldFlag;
	}

	public final GtNode ParsePatternAfter(GtNameSpace NameSpace, GtNode LeftNode, String PatternName, int MatchFlag) {
		/*local*/int Pos = this.GetPosition(MatchFlag);
		/*local*/int ParseFlag = this.ParseFlag;
		if(IsFlag(MatchFlag, Optional)) {
			this.ParseFlag = this.ParseFlag | BackTrackParseFlag;
		}
		/*local*/GtSyntaxPattern Pattern = this.TopLevelNameSpace.GetSyntaxPattern(PatternName);
		/*local*/GtNode ParsedNode = GtSyntaxPattern.ApplyMatchPattern(NameSpace, this, LeftNode, Pattern);
		this.ParseFlag = ParseFlag;
		if(ParsedNode != null) {
			return ParsedNode;
		}
		this.RollbackPosition(Pos, MatchFlag);
		if(IsFlag(MatchFlag, Required)) {
			// TODO
			//return NameSpace.Context.Generator.CreateErrorNode(Type, ParsedTree);
			System.err.println("TODO:: required");
		}
		return null; // mismatched
	}

	public final GtNode ParsePattern(GtNameSpace NameSpace, String PatternName, int MatchFlag) {
		return this.ParsePatternAfter(NameSpace, null, PatternName, MatchFlag);
	}

	
	public final GtMap SkipAndGetAnnotation(boolean IsAllowedDelim) {
		// this is tentative implementation. In the future, you have to
		// use this pattern.
		this.ParsingAnnotation = null;
		this.SkipEmptyStatement();
		while(this.MatchToken("@")) {
			/*local*/GtToken Token = this.Next();
			if(this.ParsingAnnotation == null) {
				this.ParsingAnnotation = new GtMap();
			}
			this.ParsingAnnotation.put(Token.ParsedText, true);
			this.SkipIndent();
//			if(this.MatchToken(";")) {
//				if(IsAllowedDelim) {
//					Annotation = null; // empty statement
//					this.();
//				}
//				else {
//					return null;
//				}
//			}
		}
		return this.ParsingAnnotation;
	}

	public final void SkipEmptyStatement() {
		while(this.HasNext()) {
			/*local*/GtToken Token = this.GetToken();
			if(Token.IsIndent() || Token.IsDelim()) {
				this.CurrentPosition += 1;
				continue;
			}
			break;
		}
//		return (Token != GtTokenContext.NullToken);
	}

	public final void SkipIncompleteStatement() {
//		if(this.HasNext()) {
//			/*local*/GtToken Token = this.GetToken();
//			if(!Token.IsIndent() && !Token.IsDelim()) {
//				this.TopLevelNameSpace.Generator.ReportError(GreenTeaConsts.WarningLevel, Token, "needs ;");
//				if(Token.EqualsText("}")) {
//					return;
//				}
//				this.CurrentPosition += 1;
//				while(this.HasNext()) {
//					Token = this.GetToken();
//					if(Token.IsIndent() || Token.IsDelim()) {
//						break;
//					}
//					if(Token.EqualsText("}")) {
//						return;
//					}
//					this.CurrentPosition += 1;
//				}
//			}
			this.SkipEmptyStatement();
//		}
	}

	public final String Stringfy(String PreText, int BeginIdx, int EndIdx) {
		/*local*/String Buffer = PreText;
		/*local*/int Position = BeginIdx;
		while(Position < EndIdx) {
			/*local*/GtToken Token = this.SourceTokenList.get(Position);
			if(Token.IsIndent()) {
				Buffer += "\n";
			}
			Buffer += Token.ParsedText;
			if(Token.IsNextWhiteSpace()) {
				Buffer += " ";
			}
			Position += 1;
		}
		return Buffer;
	}

	public final void Dump() {
		/*local*/int Position = this.CurrentPosition;
		while(Position < this.SourceTokenList.size()) {
			/*local*/GtToken Token = this.SourceTokenList.get(Position);
			/*local*/String DumpedToken = "["+Position+"] " + Token;
			if(Token.PresetPattern != null) {
				DumpedToken = DumpedToken + " : " + Token.PresetPattern;
			}
			LibZen.VerboseLog(VerboseToken,  DumpedToken);
			Position += 1;
		}
	}

	public final void SetSourceMap(String SourceMap) {
		/*local*/int Index = SourceMap.lastIndexOf(":");
		if(Index != -1) {
			/*local*/String FileName = SourceMap.substring(0, Index);
			/*local*/int Line = (/*cast*/int)LibZen.ParseInt(SourceMap.substring(Index+1));
			this.ParsingLine = ZenTypeSystem.GetFileLine(FileName, Line);
		}
	}

	
	public final void Push() {
		ParserStack.add(this.ParseFlag);
	}

	public final void Pop() {
		this.ParseFlag = ParserStack.get(this.ParserStack.size() - 1);
		ParserStack.remove(this.ParserStack.size() - 1);
	}
	
}
