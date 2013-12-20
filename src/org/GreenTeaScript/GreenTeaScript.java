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
//endif VAJA

import grammar.KonohaGrammar;
import parser.GreenTeaUtils;
import parser.GtGenerator;
import parser.GtParserContext;
import parser.GtStaticTable;
import parser.deps.GreenTeaArray;
import parser.deps.LibGreenTea;
import parser.deps.LibNative;

public class GreenTeaScript extends GreenTeaUtils {
	public final static void ExecCommand(String[] Args) {
		/*local*/String TargetCode = "exe";  // self executable
		/*local*/int GeneratorFlag = 0;
		/*local*/String OneLiner = null;
		/*local*/String RequiredLibName= null;
		/*local*/String OutputFile = "-";  // stdout
		/*local*/int    Index = 0;
		/*local*/boolean ShellMode = false;
		while(Index < Args.length) {
			/*local*/String Argu = Args[Index];
			if(!Argu.startsWith("-")) {
				break;
			}
			Index += 1;
			if((Argu.equals("-e") || Argu.equals("--eval")) && Index < Args.length) {
				OneLiner = Args[Index];
				Index += 1;
				continue;
			}
			if((Argu.equals("-o") || Argu.equals("--out")) && Index < Args.length) {
				if(!Args[Index].endsWith(".green")) {  // for safety
					OutputFile = Args[Index];
					Index += 1;
					continue;
				}
			}
			if((Argu.equals("-l") || Argu.equals("--lang")) && Index < Args.length) {
				if(!Args[Index].endsWith(".green")) {  // for safety
					TargetCode = Args[Index];
					Index += 1;
					continue;
				}
			}
			if((Argu.equals("-r") || Argu.equals("--require")) && Index < Args.length) {
				RequiredLibName = Args[Index];
				Index += 1;
				continue;
			}
			if(Argu.equals("-i")) {
				ShellMode = true;
				continue;
			}
			if(LibGreenTea.EqualsString(Argu, "--verbose")) {
				LibGreenTea.DebugMode = true;
				LibGreenTea.VerboseMask |= (GreenTeaUtils.VerboseFile|GreenTeaUtils.VerboseSymbol|GreenTeaUtils.VerboseNative);
				continue;
			}
			if(LibGreenTea.EqualsString(Argu, "--verbose:token")) {
				LibGreenTea.VerboseMask |= GreenTeaUtils.VerboseToken;
				continue;
			}
			if(LibGreenTea.EqualsString(Argu, "--verbose:type")) {
				LibGreenTea.VerboseMask |= GreenTeaUtils.VerboseType;
				continue;
			}
			if(LibGreenTea.EqualsString(Argu, "--verbose:symbol")) {
				LibGreenTea.VerboseMask |= GreenTeaUtils.VerboseSymbol;
				continue;
			}
			if(LibGreenTea.EqualsString(Argu, "--verbose:native")) {
				LibGreenTea.VerboseMask |= GreenTeaUtils.VerboseNative;
				continue;
			}
			if(LibGreenTea.EqualsString(Argu, "--verbose:func")) {
				LibGreenTea.VerboseMask |= GreenTeaUtils.VerboseFunc;
				continue;
			}
			if(LibGreenTea.EqualsString(Argu, "--verbose:all")) {
				LibGreenTea.VerboseMask = -1;
				continue;
			}
			if(LibGreenTea.EqualsString(Argu, "--verbose:no")) {
				LibGreenTea.VerboseMask = 0;
				continue;
			}
			LibGreenTea.Usage(Argu + " is unknown");
		}
		/*local*/GtGenerator Generator = LibGreenTea.CodeGenerator(TargetCode, OutputFile, GeneratorFlag);
		if(Generator == null) {
			LibGreenTea.Usage("no target: " + TargetCode);
		}
		/*local*/GtParserContext Context = new GtParserContext(new KonohaGrammar(), Generator);
		if(RequiredLibName != null) {
			if(!Context.TopLevelNameSpace.LoadRequiredLib(RequiredLibName)) {
				LibGreenTea.Exit(1, "failed to load required library: " + RequiredLibName);
			}
		}
		if(OneLiner != null) {
			Context.TopLevelNameSpace.Eval(OneLiner, 1);
		}
		if(!(Index < Args.length)) {
			ShellMode = true;
		}
		/*local*/GreenTeaArray ARGV = GreenTeaArray.NewArray1(GtStaticTable.StringType, 0);
		while(Index < Args.length) {
			ARGV.ArrayBody.add(Args[Index]);
			Index += 1;
		}
		Context.RootNameSpace.SetSymbol("ARGV", ARGV, null);
		if(ARGV.ArrayBody.size() > 0) {
			/*local*/String FileName = (/*cast*/String)ARGV.ArrayBody.get(0);
			/*local*/String ScriptText = LibGreenTea.LoadFile2(FileName);
			if(ScriptText == null) {
				LibGreenTea.Exit(1, "file not found: " + FileName);
			}
			/*local*/long FileLine = GtStaticTable.GetFileLine(FileName, 1);
			/*local*/boolean Success = Context.TopLevelNameSpace.Load(ScriptText, FileLine);
			Context.ShowReportedErrors();
			if(!Success) {
				LibGreenTea.Exit(1, "abort loading: " + FileName);
			}
		}
		if(ShellMode) {
			LibGreenTea.println(GreenTeaUtils.ProgName + GreenTeaUtils.Version + " (" + GreenTeaUtils.CodeName + ") on " + LibGreenTea.GetPlatform());
			LibGreenTea.println(GreenTeaUtils.Copyright);
			Context.ShowReportedErrors();
			/*local*/int linenum = 1;
			/*local*/String Line = null;
			while((Line = LibGreenTea.ReadLine2(">>> ", "    ")) != null) {
				try {
					/*local*/Object EvaledValue = Context.TopLevelNameSpace.Eval(Line, linenum);
					Context.ShowReportedErrors();
					if(EvaledValue != null) {
						LibGreenTea.println(" (" + GtStaticTable.GuessType(EvaledValue) + ":" + LibNative.GetClassName(EvaledValue) + ") " + LibGreenTea.Stringify(EvaledValue));
					}
					linenum += 1;
				}
				catch(Exception e) {
					LibGreenTea.PrintStackTrace(e, linenum);
					linenum += 1;
				}
			}
			LibGreenTea.println("");
		}
		/* else if(TargetCode.equals("minikonoha")) {
			String SourceCode = Generator.GetSourceCode();
			MiniKonohaExcutor.Eval(SourceCode);
		} */
		else {
			Generator.FlushBuffer();
		}
	}

	public final static void main(String[] Args)  {
		try {
			GreenTeaScript.ExecCommand(Args);
		}
		catch(SoftwareFaultException e) {
			System.err.println(e.GetStackTrace());
		}
	}
}
