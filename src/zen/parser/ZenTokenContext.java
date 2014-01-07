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
import zen.deps.ZenMap;
import zen.lang.ZenFunc;
import zen.lang.ZenSystem;

public final class ZenTokenContext extends ZenUtils {
	/*field*/public GtNameSpace TopLevelNameSpace;
	/*field*/public ArrayList<GtToken> SourceTokenList;
	/*field*/private int CurrentPosition;
	/*field*/public long ParsingLine;
	/*field*/public int  ParseFlag;
	/*field*/private final ArrayList<Integer> ParserStack;
	/*field*/public ZenMap<Object> ParsingAnnotation;
	/*field*/public GtToken LatestToken;
	/*field*/private int IndentLevel = 0;

	public ZenTokenContext(GtNameSpace NameSpace, String Text, long FileLine) {
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
		/*local*/GtToken Token = new GtToken(TokenFlag, Text, this.ParsingLine);
		if(PatternName != null) {
			Token.PresetPattern = this.TopLevelNameSpace.GetSyntaxPattern(PatternName);
			LibNative.Assert(Token.PresetPattern != null);
		}
		this.SourceTokenList.add(Token);
		return Token;
	}

	public void FoundWhiteSpace() {
		/*local*/int index = this.SourceTokenList.size() - 1;
		if(index > 0) {
			/*local*/GtToken Token = this.SourceTokenList.get(index);
			Token.TokenFlag |= WhiteSpaceTokenFlag;
		}
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
			this.TopLevelNameSpace.Generator.Logger.ReportDebug(T, "skipping: " + T.ParsedText);
			this.GetTokenAndMoveForward();
		}
		this.LatestToken = LeastRecentToken;
	}

	private GtToken GetBeforeToken() {
		/*local*/int MovingPos = this.CurrentPosition - 1;
		while(MovingPos >= 0 && MovingPos < this.SourceTokenList.size()) {
			/*local*/GtToken Token = this.SourceTokenList.get(MovingPos);
			if(!Token.IsIndent()) {
				return Token;
			}
			MovingPos = MovingPos - 1;
		}
		return this.LatestToken;
	}

	public GtNode CreateExpectedErrorNode(GtToken SourceToken, String ExpectedTokenText) {
		if(SourceToken == null || SourceToken.IsNull()) {
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
		/*local*/ZenTokenFunc TokenFunc = this.TopLevelNameSpace.GetTokenFunc(GtChar);
		/*local*/int NextIdx = ZenTokenFunc.ApplyTokenFunc(TokenFunc, this, ScriptSource, pos);
		if(NextIdx == MismatchedPosition) {
			ZenLogger.VerboseLog(ZenLogger.VerboseUndefined, "undefined tokenizer: " + ScriptSource.substring(pos, pos+1));
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
		return GtToken.NullToken;
	}

	public boolean HasNext() {
		return (this.GetToken() != GtToken.NullToken);
	}

	public GtToken GetTokenAndMoveForward() {
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

//	public GtToken NextConcatinatedToken() {
//		/*local*/GtToken Token = this.Next();
//		if(Token.IsNextWhiteSpace()) {
//			return Token;
//		}
//		String JoinedToken = Token.ParsedText;
//		Token = this.Next();
//		if(Token.)
//		return Token;
//	}
	
	public ZenSyntaxPattern GetFirstPattern(GtNameSpace NameSpace) {
		/*local*/GtToken Token = this.GetToken();
		if(Token.PresetPattern != null) {
			return Token.PresetPattern;
		}
		/*local*/ZenSyntaxPattern Pattern = NameSpace.GetSyntaxPattern(Token.ParsedText);
		if(Pattern == null) {
			return NameSpace.GetSyntaxPattern("$Symbol$");
		}
		return Pattern;
	}

	public ZenSyntaxPattern GetSuffixPattern(GtNameSpace NameSpace) {
		/*local*/GtToken Token = this.GetToken();
		if(Token != GtToken.NullToken) {
			/*local*/ZenSyntaxPattern Pattern = NameSpace.GetExtendedSyntaxPattern(Token.ParsedText);
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
		/*local*/int RollbackPos = this.CurrentPosition;
		/*local*/GtToken Token = this.GetTokenAndMoveForward();
		if(Token.EqualsText(TokenText)) {
			return true;
		}
		this.CurrentPosition = RollbackPos;
		return false;
	}

	public final boolean MatchNewLineToken(String TokenText) {
		/*local*/int RollbackPos = this.CurrentPosition;
		this.SkipIndent();
		/*local*/GtToken Token = this.GetTokenAndMoveForward();
		if(Token.EqualsText(TokenText)) {
			return true;
		}
		this.CurrentPosition = RollbackPos;
		return false;
	}

	public GtNode MatchNodeToken(GtNode Base, GtNameSpace NameSpace, String TokenText, int MatchFlag) {
		if(!Base.IsErrorNode()) {
			/*local*/int RollbackPosition = this.CurrentPosition;
			/*local*/GtToken Token = this.GetTokenAndMoveForward();
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
				this.CurrentPosition = RollbackPosition;
				if(IsFlag(MatchFlag, Required)) {
					return this.CreateExpectedErrorNode(Token, TokenText);
				}
			}
		}
		return Base;
	}

	public final GtNode ApplyMatchPattern(GtNameSpace NameSpace, GtNode LeftNode, ZenSyntaxPattern Pattern) {
		/*local*/int RollbackPosition = this.CurrentPosition;
		/*local*/int ParseFlag = this.ParseFlag;
		/*local*/ZenSyntaxPattern CurrentPattern = Pattern;
		while(CurrentPattern != null) {
			/*local*/ZenFunc MatchFunc = CurrentPattern.MatchFunc;
			this.CurrentPosition = RollbackPosition;
			if(CurrentPattern.ParentPattern != null) {   // This means it has next patterns
				this.ParseFlag = ParseFlag | BackTrackParseFlag;
			}
			//LibZen.DebugP("B :" + JoinStrings("  ", this.IndentLevel) + CurrentPattern + ", next=" + CurrentPattern.ParentPattern);
			this.IndentLevel += 1;
			/*local*/GtNode ParsedNode = LibNative.ApplyMatchFunc(MatchFunc, NameSpace, this, LeftNode);
			this.IndentLevel -= 1;
			this.ParseFlag = ParseFlag;
//			LibZen.DebugP("E :" + JoinStrings("  ", this.IndentLevel) + CurrentPattern + " => " + ParsedTree);
			if(ParsedNode != null && !ParsedNode.IsErrorNode()) {
				return ParsedNode;
			}
			CurrentPattern = CurrentPattern.ParentPattern;
		}
		if(this.IsAllowedBackTrack()) {
			this.CurrentPosition = RollbackPosition;
			return null;
		}
		this.SkipErrorStatement();
		if(Pattern == null) {
			ZenLogger.VerboseLog(ZenLogger.VerboseUndefined, "undefined syntax pattern: " + Pattern);
		}
		return this.CreateExpectedErrorNode(null, Pattern.PatternName);
	}

	public GtNode AppendMatchedPattern(GtNode Base, GtNameSpace NameSpace, String PatternName,  int MatchFlag) {
		if(!Base.IsErrorNode()) {
//			/*local*/GtToken Token = this.GetToken();
			/*local*/GtNode ParsedNode = this.ParsePattern(NameSpace, PatternName, MatchFlag);
			if(ParsedNode != null) {
				if(ParsedNode.IsErrorNode()) {
					return ParsedNode;
				}
				Base.Append(ParsedNode);
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
			Token = new GtToken(0, Token.ParsedText.substring(TokenText.length()), Token.FileLine);
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
		/*local*/int Pos = this.CurrentPosition;
		/*local*/int ParseFlag = this.ParseFlag;
		if(IsFlag(MatchFlag, Optional)) {
			this.ParseFlag = this.ParseFlag | BackTrackParseFlag;
		}
		/*local*/ZenSyntaxPattern Pattern = this.TopLevelNameSpace.GetSyntaxPattern(PatternName);
		/*local*/GtNode ParsedNode = this.ApplyMatchPattern(NameSpace, LeftNode, Pattern);
		this.ParseFlag = ParseFlag;
		if(ParsedNode != null) {
			return ParsedNode;
		}
		this.CurrentPosition = Pos;
		return null; // mismatched
	}

	public final GtNode ParsePattern(GtNameSpace NameSpace, String PatternName, int MatchFlag) {
		return this.ParsePatternAfter(NameSpace, null, PatternName, MatchFlag);
	}

	
	public final ZenMap<Object> SkipAndGetAnnotation(boolean IsAllowedDelim) {
		// this is tentative implementation. In the future, you have to
		// use this pattern.
		this.ParsingAnnotation = null;
		this.SkipEmptyStatement();
		while(this.MatchToken("@")) {
			/*local*/GtToken Token = this.GetTokenAndMoveForward();
			if(this.ParsingAnnotation == null) {
				this.ParsingAnnotation = new ZenMap<Object>(null);
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

	public final void SetSourceMap(String SourceMap) {
		/*local*/int Index = SourceMap.lastIndexOf(":");
		if(Index != -1) {
			/*local*/String FileName = SourceMap.substring(0, Index);
			/*local*/int Line = (/*cast*/int)LibZen.ParseInt(SourceMap.substring(Index+1));
			this.ParsingLine = ZenSystem.GetFileLine(FileName, Line);
		}
	}

	
	public final void Push() {
		ParserStack.add(this.ParseFlag);
	}

	public final void Pop() {
		this.ParseFlag = ParserStack.get(this.ParserStack.size() - 1);
		ParserStack.remove(this.ParserStack.size() - 1);
	}

	public final void DumpPosition() {
		/*local*/int Position = this.CurrentPosition;
		if(Position < this.SourceTokenList.size()) {
			/*local*/GtToken Token = this.SourceTokenList.get(Position);
			LibZen.DebugP("Position="+Position+" " + Token);
		}
		else {
			LibZen.DebugP("Position="+Position+" EOF");
		}
	}
	
	public final void Dump() {
		/*local*/int Position = this.CurrentPosition;
		while(Position < this.SourceTokenList.size()) {
			/*local*/GtToken Token = this.SourceTokenList.get(Position);
			/*local*/String DumpedToken = this.CurrentPosition == Position ? "*[" : "[";
			DumpedToken = DumpedToken + Position+"] " + Token;
			if(Token.PresetPattern != null) {
				DumpedToken = DumpedToken + " : " + Token.PresetPattern;
			}
			LibZen.DebugP(DumpedToken);
//			ZenLogger.VerboseLog(ZenLogger.VerboseToken,  DumpedToken);
			Position += 1;
		}
	}

	
}
