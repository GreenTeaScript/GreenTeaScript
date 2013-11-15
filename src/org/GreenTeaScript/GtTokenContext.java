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

public final class GtTokenContext extends GreenTeaUtils {
	/*field*/public final static GtToken NullToken = new GtToken("", 0);

	/*field*/public GtNameSpace TopLevelNameSpace;
	/*field*/public ArrayList<GtToken> SourceList;
	/*field*/private int CurrentPosition;
	/*field*/public long ParsingLine;
	/*field*/public int  ParseFlag;
	/*field*/public GtMap ParsingAnnotation;
	/*field*/public GtToken LatestToken;
	/*field*/public int IndentLevel = 0;

	GtTokenContext/*constructor*/(GtNameSpace NameSpace, String Text, long FileLine) {
		this.TopLevelNameSpace = NameSpace;
		this.SourceList = new ArrayList<GtToken>();
		this.CurrentPosition = 0;
		this.ParsingLine = FileLine;
		this.ParseFlag = 0;
		this.AddNewToken(Text, SourceTokenFlag, null);
		this.ParsingAnnotation = null;
		this.IndentLevel = 0;
		this.LatestToken = null;
	}

	public GtToken AddNewToken(String Text, int TokenFlag, String PatternName) {
		/*local*/GtToken Token = new GtToken(Text, this.ParsingLine);
		Token.TokenFlag |= TokenFlag;
		if(PatternName != null) {
			Token.PresetPattern = this.TopLevelNameSpace.GetSyntaxPattern(PatternName);
			LibGreenTea.Assert(Token.PresetPattern != null);
		}
		this.SourceList.add(Token);
		return Token;
	}

	public void FoundWhiteSpace() {
		int index = this.SourceList.size() - 1;
		/*local*/GtToken Token = this.SourceList.get(index);
		Token.TokenFlag |= WhiteSpaceTokenFlag;
	}

	public void FoundLineFeed(long line) {
		this.ParsingLine += line;
	}

	public void ReportTokenError1(int Level, String Message, String TokenText) {
		/*local*/GtToken Token = this.AddNewToken(TokenText, 0, "$Error$");
		this.TopLevelNameSpace.Context.ReportError(Level, Token, Message);
	}

	public GtSyntaxTree NewErrorSyntaxTree(GtToken Token, String Message) {
		if(!this.IsAllowedBackTrack()) {
			this.TopLevelNameSpace.Context.ReportError(ErrorLevel, Token, Message);
			/*local*/GtSyntaxTree ErrorTree = new GtSyntaxTree(Token.PresetPattern, this.TopLevelNameSpace, Token, null);
			return ErrorTree;
		}
		return null;
	}

	public GtToken GetBeforeToken() {
		/*local*/int pos = this.CurrentPosition - 1;
		while(pos >= 0 && pos < this.SourceList.size()) {
			/*local*/GtToken Token = this.SourceList.get(pos);
			if(IsFlag(Token.TokenFlag, IndentTokenFlag)) {
				pos -= 1;
				continue;
			}
			return Token;
		}
		return null;
	}

	public void SkipErrorStatement() {
		/*local*/GtToken LeastRecentToken = this.LatestToken;
		while(this.HasNext()) {
			/*local*/GtToken T = this.GetToken();
			if(T.IsDelim() || T.EqualsText("}")) {
				break;
			}
			this.TopLevelNameSpace.Context.ReportError(InfoLevel, T, "skipping: " + T.ParsedText);
			this.Next();
		}
		this.LatestToken = LeastRecentToken;
	}

	public GtSyntaxTree ReportTokenError2(GtToken Token, String Message, boolean SkipToken) {
		if(this.IsAllowedBackTrack()) {
			return null;
		}
		else {
			/*local*/GtSyntaxTree ErrorTree = this.NewErrorSyntaxTree(Token, Message);
			if(SkipToken) {
				this.SkipErrorStatement();
			}
			return ErrorTree;
		}
	}

	public GtSyntaxTree ReportExpectedToken(String TokenText) {
		if(!this.IsAllowedBackTrack()) {
			/*local*/GtToken Token = this.GetBeforeToken();
			if(Token != null) {
				return this.NewErrorSyntaxTree(Token, TokenText + " is expected at " + Token.ParsedText);
			}
			else {
				Token = this.LatestToken;
				return this.NewErrorSyntaxTree(Token, TokenText + " is expected after " + Token.ParsedText);
			}
		}
		return null;
	}

	public GtSyntaxTree ReportExpectedPattern(GtSyntaxPattern Pattern) {
		return this.ReportExpectedToken("syntax pattern " + Pattern.PatternName);
	}

	public GtSyntaxTree ReportExpectedMessage(GtToken Token, String Message, boolean SkipToken) {
		return this.ReportTokenError2(Token, "expected " + Message + "; given = " + Token.ParsedText, SkipToken);
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
		/*local*/int NextIdx = GreenTeaUtils.ApplyTokenFunc(TokenFunc, this, ScriptSource, pos);
		if(NextIdx == MismatchedPosition) {
			LibGreenTea.VerboseLog(VerboseUndefined, "undefined tokenizer: " + ScriptSource.substring(pos, pos+1));
			this.AddNewToken(ScriptSource.substring(pos, pos + 1), 0, null);
			return pos + 1;
		}
		return NextIdx;
	}

	private void Tokenize(String ScriptSource, long CurrentLine) {
		/*local*/int currentPos = 0;
		/*local*/int len = ScriptSource.length();
		this.ParsingLine = CurrentLine;
		while(currentPos < len) {
			/*local*/int gtCode = AsciiToTokenMatrixIndex(LibGreenTea.CharAt(ScriptSource, currentPos));
			/*local*/int nextPos = this.DispatchFunc(ScriptSource, gtCode, currentPos);
			if(currentPos >= nextPos) {
				break;
			}
			currentPos = nextPos;
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
		while(this.CurrentPosition < this.SourceList.size()) {
			/*local*/GtToken Token = this.SourceList.get(this.CurrentPosition);
			if(Token.IsSource()) {
				this.SourceList.remove(this.SourceList.size()-1);
				this.Tokenize(Token.ParsedText, Token.FileLine);
				if(this.CurrentPosition < this.SourceList.size()) {
					Token = this.SourceList.get(this.CurrentPosition);
				}else{
					break;
				}
			}
			if(IsFlag(this.ParseFlag, SkipIndentParseFlag) && Token.IsIndent()) {
				this.CurrentPosition = this.CurrentPosition + 1;
				continue;
			}
//			this.ParsingLine = Token.FileLine;
			this.LatestToken = Token;
			return Token;
		}
//		GtTokenContext.NullToken.FileLine = this.ParsingLine;
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

	public GtSyntaxPattern GetPattern(String PatternName) {
		return this.TopLevelNameSpace.GetSyntaxPattern(PatternName);
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

	public GtSyntaxPattern GetExtendedPattern(GtNameSpace NameSpace) {
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

	public final boolean MatchToken(String TokenText) {
		if(this.IsToken(TokenText)) {
			this.CurrentPosition += 1;
			return true;
		}
		return false;
	}

	public final boolean MatchToken2(String TokenText, int MatchFlag) {
		/*local*/int Pos = this.GetPosition(MatchFlag);
		/*local*/GtToken Token = this.Next();
		if(Token.EqualsText(TokenText)) {
			return true;
		}
		this.RollbackPosition(Pos, MatchFlag);
		return false;
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
			this.SourceList.add(this.CurrentPosition, Token);
			return true;
		}
		return false;
	}

	public GtSyntaxTree CreateSyntaxTree(GtNameSpace NameSpace, Object Pattern, Object ConstValue) {
		if(ConstValue != null) {
			Pattern = NameSpace.GetSyntaxPattern("$Const$");
		}
		if(Pattern instanceof String) {
			Pattern = NameSpace.GetSyntaxPattern(Pattern.toString());
		}
		return new GtSyntaxTree((/*cast*/GtSyntaxPattern)Pattern, NameSpace, this.GetToken(), ConstValue);
	}

	public GtSyntaxTree CreateMatchedSyntaxTree(GtNameSpace NameSpace, GtSyntaxPattern Pattern, String TokenText) {
		/*local*/GtSyntaxTree SyntaxTree = this.CreateSyntaxTree(NameSpace, Pattern, null);
		SyntaxTree.SetMatchedTokenAt(KeyTokenIndex, NameSpace, this, TokenText, Required);
		return SyntaxTree;
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

	public final GtSyntaxTree ParsePatternAfter(GtNameSpace NameSpace, GtSyntaxTree LeftTree, String PatternName, int MatchFlag) {
		/*local*/int Pos = this.GetPosition(MatchFlag);
		/*local*/int ParseFlag = this.ParseFlag;
		if(IsFlag(MatchFlag, Optional)) {
			this.ParseFlag = this.ParseFlag | BackTrackParseFlag;
		}
		/*local*/GtSyntaxPattern Pattern = this.GetPattern(PatternName);
		if(Pattern == null) {
			System.err.println("unknown pattern: " + PatternName);
		}
		/*local*/GtSyntaxTree SyntaxTree = GreenTeaUtils.ApplySyntaxPattern(NameSpace, this, LeftTree, Pattern);
		this.ParseFlag = ParseFlag;
		if(SyntaxTree != null) {
			return SyntaxTree;
		}
		this.RollbackPosition(Pos, MatchFlag);
		return null;
	}

	public final GtSyntaxTree ParsePattern(GtNameSpace NameSpace, String PatternName, int MatchFlag) {
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
//				this.TopLevelNameSpace.Context.ReportError(WarningLevel, Token, "needs ;");
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
			/*local*/GtToken Token = this.SourceList.get(Position);
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
		while(Position < this.SourceList.size()) {
			/*local*/GtToken Token = this.SourceList.get(Position);
			/*local*/String DumpedToken = "["+Position+"] " + Token;
			if(Token.PresetPattern != null) {
				DumpedToken = DumpedToken + " : " + Token.PresetPattern;
			}
			LibGreenTea.VerboseLog(VerboseToken,  DumpedToken);
			Position += 1;
		}
	}

	public final void SetSourceMap(String SourceMap) {
		/*local*/int Index = SourceMap.lastIndexOf(":");
		if(Index != -1) {
			/*local*/String FileName = SourceMap.substring(0, Index);
			/*local*/int Line = (/*cast*/int)LibGreenTea.ParseInt(SourceMap.substring(Index+1));
			this.ParsingLine = GtStaticTable.GetFileLine(FileName, Line);
		}
	}

}
