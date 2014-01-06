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

package zen.parser;

import java.util.ArrayList;

import zen.deps.LibNative;
import zen.deps.LibZen;
import zen.lang.ZenTypeSystem;

public final class GtLogger {
	/*field*/public ArrayList<String>  ReportedErrorList;

	public GtLogger() {
		this.ReportedErrorList = new ArrayList<String>();
	}

	public final String ReportError(int Level, GtToken Token, String Message) {
		if(Level == ZenParserConst.ErrorLevel) {
			Message = "(error) " + ZenTypeSystem.FormatFileLineNumber(Token.FileLine) + " " + Message;
		}
		else if(Level == ZenParserConst.TypeErrorLevel) {
			Message = "(error) " + ZenTypeSystem.FormatFileLineNumber(Token.FileLine) + " " + Message;
		}
		else if(Level == ZenParserConst.WarningLevel) {
			Message = "(warning) " + ZenTypeSystem.FormatFileLineNumber(Token.FileLine) + " " + Message;
		}
		else if(Level == ZenParserConst.InfoLevel) {
			Message = "(info) " + ZenTypeSystem.FormatFileLineNumber(Token.FileLine) + " " + Message;
		}
		this.ReportedErrorList.add(Message);
		return Message;
	}

	public final String[] GetReportedErrors() {
		/*local*/ArrayList<String> List = this.ReportedErrorList;
		this.ReportedErrorList = new ArrayList<String>();
		return LibZen.CompactStringList(List);
	}

	public final void ShowReportedErrors() {
		/*local*/int i = 0;
		/*local*/String[] Messages = this.GetReportedErrors();
		while(i < Messages.length) {
			LibNative.println(Messages[i]);
			i = i + 1;
		}
	}

}