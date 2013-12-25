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
import java.util.ArrayList;

import parser.deps.LibGreenTea;
//endif VAJA

public final class GtParserContext extends GreenTeaUtils {
	/*field*/public final  int ParserId;
	/*field*/public final  GtGenerator   Generator;
	/*field*/public final  GtNameSpace   RootNameSpace;
	/*field*/public GtNameSpace		     TopLevelNameSpace;

	/*field*/public final GtStatistics Stat;
	/*field*/public ArrayList<String>    ReportedErrorList;
	/*filed*/private boolean NoErrorReport;
		
	public GtParserContext/*constructor*/(GtGrammar Grammar, GtGenerator Generator) {
		this.ParserId     = LibGreenTea.NewParserId();
		this.Generator    = Generator;
		this.Generator.Context = this;
		this.RootNameSpace = new GtNameSpace(this, null);
		this.Stat = new GtStatistics();
		this.NoErrorReport = false;
		this.ReportedErrorList = new ArrayList<String>();
		GtStaticTable.InitParserContext(this);
		Grammar.LoadTo(this.RootNameSpace);
		this.TopLevelNameSpace = new GtNameSpace(this, this.RootNameSpace);
		this.Generator.InitContext(this);
	}

	public void LoadGrammar(GtGrammar Grammar) {
		Grammar.LoadTo(this.TopLevelNameSpace);
	}


	public final void SetNoErrorReport(boolean b) {
		this.NoErrorReport = b;
	}

	public final void ReportError_OLD(int Level, GtToken Token, String Message) {
		if(!Token.IsError() || !this.NoErrorReport) {
			if(Level == ErrorLevel) {
				Message = "(error) " + GtStaticTable.FormatFileLineNumber(Token.FileLine) + " " + Message;
				Token.SetErrorMessage(Message, this.RootNameSpace.GetSyntaxPattern("$Error$"));
			}
			else if(Level == TypeErrorLevel) {
				Message = "(error) " + GtStaticTable.FormatFileLineNumber(Token.FileLine) + " " + Message;
			}
			else if(Level == WarningLevel) {
				Message = "(warning) " + GtStaticTable.FormatFileLineNumber(Token.FileLine) + " " + Message;
			}
			else if(Level == InfoLevel) {
				Message = "(info) " + GtStaticTable.FormatFileLineNumber(Token.FileLine) + " " + Message;
			}
			this.ReportedErrorList.add(Message);
		}
	}

	public final String ReportError(int Level, GtToken Token, String Message) {
		if(Level == ErrorLevel) {
			Message = "(error) " + GtStaticTable.FormatFileLineNumber(Token.FileLine) + " " + Message;
		}
		else if(Level == TypeErrorLevel) {
			Message = "(error) " + GtStaticTable.FormatFileLineNumber(Token.FileLine) + " " + Message;
		}
		else if(Level == WarningLevel) {
			Message = "(warning) " + GtStaticTable.FormatFileLineNumber(Token.FileLine) + " " + Message;
		}
		else if(Level == InfoLevel) {
			Message = "(info) " + GtStaticTable.FormatFileLineNumber(Token.FileLine) + " " + Message;
		}
		this.ReportedErrorList.add(Message);
		System.err.println(Message);
		return Message;
	}
	
	public final String[] GetReportedErrors() {
		/*local*/ArrayList<String> List = this.ReportedErrorList;
		this.ReportedErrorList = new ArrayList<String>();
		return LibGreenTea.CompactStringList(List);
	}

	public final void ShowReportedErrors() {
		/*local*/int i = 0;
		/*local*/String[] Messages = this.GetReportedErrors();
		while(i < Messages.length) {
			LibGreenTea.println(Messages[i]);
			i = i + 1;
		}
	}
}
