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
package parser;

import parser.ast.GtErrorNode;
import parser.ast.GtNode;
import parser.deps.LibGreenTea;
import parser.deps.LibNative;

public final class GtSyntaxPattern extends GreenTeaUtils {
	/*field*/public GtNameSpace	          PackageNameSpace;
	/*field*/public String		          PatternName;
	/*field*/public int				      SyntaxFlag;
	/*field*/public GtFunc                MatchFunc;
	/*field*/public GtSyntaxPattern	      ParentPattern;

	GtSyntaxPattern/*constructor*/(GtNameSpace NameSpace, String PatternName, GtFunc MatchFunc) {
		this.PackageNameSpace = NameSpace;
		this.PatternName = PatternName;
		this.SyntaxFlag = 0;
		this.MatchFunc = MatchFunc;
		this.ParentPattern = null;
	}

	@Override public String toString() {
		return this.PatternName + "<" + this.MatchFunc + ">";
	}

	public boolean IsBinaryOperator() {
		return IsFlag(this.SyntaxFlag, BinaryOperator);
	}

	public final boolean IsRightJoin(GtSyntaxPattern Right) {
		/*local*/int left = this.SyntaxFlag;
		/*local*/int right = Right.SyntaxFlag;
		return (left < right || (left == right && !IsFlag(this.SyntaxFlag, LeftJoin) && !IsFlag(Right.SyntaxFlag, LeftJoin)));
	}

	public final boolean EqualsName(String Name) {
		return LibGreenTea.EqualsString(this.PatternName, Name);
	}
	
	public final static GtNode ApplyMatchPattern(GtNameSpace NameSpace, GtTokenContext TokenContext, GtNode LeftNode, GtSyntaxPattern Pattern) {
		/*local*/int Pos = TokenContext.GetPosition(0);
		/*local*/int ParseFlag = TokenContext.ParseFlag;
		/*local*/GtSyntaxPattern CurrentPattern = Pattern;
		while(CurrentPattern != null) {
			/*local*/GtFunc MatchFunc = CurrentPattern.MatchFunc;
			TokenContext.RollbackPosition(Pos, 0);
			if(CurrentPattern.ParentPattern != null) {   // This means it has next patterns
				TokenContext.ParseFlag = ParseFlag | BackTrackParseFlag;
			}
			//LibGreenTea.DebugP("B :" + JoinStrings("  ", TokenContext.IndentLevel) + CurrentPattern + ", next=" + CurrentPattern.ParentPattern);
			TokenContext.IndentLevel += 1;
			/*local*/GtNode ParsedNode = LibNative.ApplyMatchFunc(MatchFunc, NameSpace, TokenContext, LeftNode);
			TokenContext.IndentLevel -= 1;
			TokenContext.ParseFlag = ParseFlag;
//			if(ParsedNode != null /* FIXME && ParsedNode.IsMismatched()*/) {
//				ParsedNode = null;
//			}
//			LibGreenTea.DebugP("E :" + JoinStrings("  ", TokenContext.IndentLevel) + CurrentPattern + " => " + ParsedTree);
			if(ParsedNode != null) {
				return ParsedNode;
			}
			CurrentPattern = CurrentPattern.ParentPattern;
		}
		if(TokenContext.IsAllowedBackTrack()) {
			TokenContext.RollbackPosition(Pos, 0);
		}
		else {
			TokenContext.SkipErrorStatement();
		}
		if(Pattern == null) {
			LibGreenTea.VerboseLog(VerboseUndefined, "undefined syntax pattern: " + Pattern);
		}
		return GtErrorNode.CreateExpectedToken(TokenContext.GetBeforeToken(), Pattern.PatternName);
	}


}
