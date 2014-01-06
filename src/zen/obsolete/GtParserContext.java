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
package zen.obsolete;

import zen.parser.ZenUtils;


@Deprecated
public final class GtParserContext extends ZenUtils {
//	/*field*/public final  int ParserId;
//	/*field*/public final  GtGenerator   Generator;
//	/*field*/public final  GtNameSpace   RootNameSpace;
//	/*field*/public GtNameSpace		     TopLevelNameSpace;
		
//	public GtParserContext/*constructor*/(GtGrammar Grammar, GtGenerator Generator) {
//		this.ParserId     = LibZen.NewParserId();
//		this.Generator    = Generator;
//		this.Generator.Context = this;
//		this.RootNameSpace = new GtNameSpace(this, null);
//		Grammar.LoadTo(this.RootNameSpace);
//		this.TopLevelNameSpace = new GtNameSpace(this, this.RootNameSpace);
//		this.Generator.InitContext(this);
//	}

//	public final void ReportError_OLD(int Level, GtToken Token, String Message) {
//		if(!Token.IsError() || !this.NoErrorReport) {
//			if(Level == ErrorLevel) {
//				Message = "(error) " + GtStaticTable.FormatFileLineNumber(Token.FileLine) + " " + Message;
//				Token.SetErrorMessage(Message, this.RootNameSpace.GetSyntaxPattern("$Error$"));
//			}
//			else if(Level == TypeErrorLevel) {
//				Message = "(error) " + GtStaticTable.FormatFileLineNumber(Token.FileLine) + " " + Message;
//			}
//			else if(Level == WarningLevel) {
//				Message = "(warning) " + GtStaticTable.FormatFileLineNumber(Token.FileLine) + " " + Message;
//			}
//			else if(Level == InfoLevel) {
//				Message = "(info) " + GtStaticTable.FormatFileLineNumber(Token.FileLine) + " " + Message;
//			}
//			this.ReportedErrorList.add(Message);
//		}
//	}

}
