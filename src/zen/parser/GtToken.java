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

final public class GtToken extends GreenTeaUtils {
	/*field*/public int		        TokenFlag;
	/*field*/public String	        ParsedText;
	/*field*/public long		    FileLine;
	/*field*/public GtSyntaxPattern	PresetPattern;

	public GtToken/*constructor*/(String text, long FileLine) {
		this.TokenFlag = 0;
		this.ParsedText = text;
		this.FileLine = FileLine;
		this.PresetPattern = null;
	}

	public boolean IsSource() {
		return IsFlag(this.TokenFlag, SourceTokenFlag);
	}

	public boolean IsError() {
		return IsFlag(this.TokenFlag, ErrorTokenFlag);
	}

	public boolean IsIndent() {
		return IsFlag(this.TokenFlag, IndentTokenFlag);
	}

	public boolean IsDelim() {
		return IsFlag(this.TokenFlag, DelimTokenFlag);
	}

	public final boolean IsNextWhiteSpace() {
		return IsFlag(this.TokenFlag, WhiteSpaceTokenFlag);
	}

	public boolean IsQuoted() {
		return IsFlag(this.TokenFlag, QuotedTokenFlag);
	}

	public boolean IsNameSymbol() {
		return IsFlag(this.TokenFlag, NameSymbolTokenFlag);
	}

	public boolean EqualsText(String text) {
		return this.ParsedText.equals(text);
	}

	@Override public String toString() {
		/*local*/String TokenText = "";
		if(this.PresetPattern != null) {
			TokenText = "(" + this.PresetPattern.PatternName + ") ";
		}
		return TokenText + this.ParsedText;
	}

//	public String SetErrorMessage(String Message, GtSyntaxPattern ErrorPattern) {
//		if(this.ParsedText.length() > 0) {  // skip null token
//			this.TokenFlag = ErrorTokenFlag;
//			this.ParsedText = Message;
//			this.PresetPattern = ErrorPattern;
//		}
//		return Message;
//	}
//
//	public String GetErrorMessage() {
//		LibNative.Assert(this.IsError());
//		return this.ParsedText;
//	}
//
	public final GtToken AddTypeInfoToErrorMessage(GtType ClassType) {
		this.ParsedText += " of " + ClassType.ShortName;
		return this;
	}

}

