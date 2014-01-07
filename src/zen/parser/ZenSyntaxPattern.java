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

import zen.deps.LibZen;
import zen.lang.ZenFunc;

public final class ZenSyntaxPattern extends ZenUtils {
	/*field*/public GtNameSpace	          PackageNameSpace;
	/*field*/public String		          PatternName;
	/*field*/public int				      SyntaxFlag;
	/*field*/public ZenFunc               MatchFunc;
	/*field*/public ZenSyntaxPattern	  ParentPattern;

	public ZenSyntaxPattern(GtNameSpace NameSpace, String PatternName, ZenFunc MatchFunc) {
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

	public final boolean IsRightJoin(ZenSyntaxPattern Right) {
		/*local*/int left = this.SyntaxFlag;
		/*local*/int right = Right.SyntaxFlag;
		return (left < right || (left == right && !IsFlag(this.SyntaxFlag, LeftJoin) && !IsFlag(Right.SyntaxFlag, LeftJoin)));
	}

	public final boolean EqualsName(String Name) {
		return LibZen.EqualsString(this.PatternName, Name);
	}
	
	public final static ZenSyntaxPattern MergeSyntaxPattern(ZenSyntaxPattern Pattern, ZenSyntaxPattern Parent) {
		if(Parent == null) return Pattern;
		/*local*/ZenSyntaxPattern MergedPattern = new ZenSyntaxPattern(Pattern.PackageNameSpace, Pattern.PatternName, Pattern.MatchFunc);
		MergedPattern.ParentPattern = Parent;
		return MergedPattern;
	}



}
