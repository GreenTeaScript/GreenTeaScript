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

import java.lang.reflect.InvocationTargetException;
import java.util.ArrayList;

import zen.deps.LibNative;
import zen.deps.LibZen;
import zen.deps.ZenMap;
import zen.lang.ZenSystem;

public final class ZenLogger {
	public final static int		ErrorLevel						= 0;
	public final static int     TypeErrorLevel                  = 1;
	public final static int		WarningLevel					= 2;
	public final static int		InfoLevel					    = 3;
	public final static int		DebugLevel					    = 4;

	public final static int VerboseRuntime   = (1 << 9);
	public final static int VerboseException = (1 << 8);
	public final static int VerboseFile      = (1 << 7);
	public final static int VerboseNative    = (1 << 6);
	public final static int VerboseUndefined   = (1 << 5);
	public final static int VerboseToken     = (1 << 4);
	public final static int VerboseEval      = (1 << 3);
	public final static int VerboseFunc      = (1 << 2);
	public final static int VerboseType      = (1 << 1);
	public final static int VerboseSymbol    = 1;

	/*field*/public ArrayList<String>  ReportedErrorList;
	/*field*/public ZenMap<ZenCounter> StatMap;

	public ZenLogger() {
		this.ReportedErrorList = new ArrayList<String>();
		if(LibNative.GetEnv("ZENSTAT") != null) {
			this.StatMap = new ZenMap<ZenCounter>(null);
		}
		else {
			this.StatMap = null;
		}
	}

	public final String Report(int Level, GtToken Token, String Message) {
		if(Token != null && !Token.IsNull()) {
			if(Level == ZenLogger.ErrorLevel) {
				Message = "(error) " + ZenSystem.FormatFileLineNumber(Token.FileLine) + " " + Message;
			}
			else if(Level == ZenLogger.TypeErrorLevel) {
				Message = "(error) " + ZenSystem.FormatFileLineNumber(Token.FileLine) + " " + Message;
			}
			else if(Level == ZenLogger.WarningLevel) {
				Message = "(warning) " + ZenSystem.FormatFileLineNumber(Token.FileLine) + " " + Message;
			}
			else if(Level == ZenLogger.InfoLevel) {
				Message = "(info) " + ZenSystem.FormatFileLineNumber(Token.FileLine) + " " + Message;
			}
			else {
				Message = "(debug) " + ZenSystem.FormatFileLineNumber(Token.FileLine) + " " + Message;
			}
			this.ReportedErrorList.add(Message);
		}
		else {
			LibZen.DebugP("unknown source error:" + Message);
		}
		return Message;
	}

	public final String ReportError(GtToken Token, String Message) {
		return this.Report(ErrorLevel, Token, Message);
	}

	public final String ReportWarning(GtToken Token, String Message) {
		return this.Report(WarningLevel, Token, Message);
	}

	public final String ReportInfo(GtToken Token, String Message) {
		return this.Report(InfoLevel, Token, Message);
	}

	public final String ReportDebug(GtToken Token, String Message) {
		return this.Report(DebugLevel, Token, Message);
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
	
	public final void Count(String EventName) {
		if(this.StatMap != null) {
			ZenCounter Counter = this.StatMap.GetOrNull(EventName);
			if(Counter == null) {
				Counter = new ZenCounter();
				this.StatMap.put(EventName, Counter);
			}
			else {
				Counter.count = Counter.count + 1;
			}
		}
	}

	public final void CountCreation(Object CreatedObject) {
		if(this.StatMap != null) {
			String EventName = "CreationOf" + LibNative.GetClassName(CreatedObject);
			ZenCounter Counter = this.StatMap.GetOrNull(EventName);
			if(Counter == null) {
				Counter = new ZenCounter();
				this.StatMap.put(EventName, Counter);
			}
			else {
				Counter.count = Counter.count + 1;
			}
		}
	}

	
	public static int VerboseMask = VerboseUndefined | VerboseException;

	public final static void TODO(String msg) {
		LibNative.println("TODO" + LibZen.GetStackInfo(2) + ": " + msg);
	}

	public final static void VerboseException(Throwable e) {
		if(e instanceof InvocationTargetException) {
			Throwable cause = e.getCause();
			e = cause;
			if(cause instanceof RuntimeException) {
				throw (RuntimeException)cause;
			}
			if(cause instanceof Error) {
				throw (Error)cause;
			}
		}
		VerboseLog(VerboseException, e.toString());
		e.printStackTrace();
		if(e instanceof IllegalArgumentException) {
			LibNative.Exit(1, e.toString());
		}
		
	}

	public final static void VerboseLog(int VerboseFlag, String Message) {
		if((VerboseMask & VerboseFlag) == VerboseFlag) {
			LibNative.println("LibZen: " + Message);
		}
	}

	public static void ParseVerboseOption() {
		
	}

}

class ZenCounter {
	public int count;
	ZenCounter() {
		this.count = 1;
	}
}
