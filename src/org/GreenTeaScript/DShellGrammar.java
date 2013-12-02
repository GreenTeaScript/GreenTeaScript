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
import java.io.File;
import java.lang.reflect.Method;

import org.GreenTeaScript.DShell.DFault;
import org.GreenTeaScript.DShell.RecAPI;
//endif VAJA

public class DShellGrammar extends GreenTeaUtils {
	// LibDShell
	public final static String GetEnv(String Key) {
		/*local*/String ret = "";
//ifdef JAVA
		ret = System.getenv(Key);
//endif VAJA
		return ret;
	}
//ifdef JAVA
	public final static boolean IsUnixCommand(String cmd) {
		String[] path = GetEnv("PATH").split(":");
		int i = 0;
		while(i < path.length) {
			if(LibGreenTea.HasFile(path[i] + "/" + cmd)) {
				return true;
			}
			i = i + 1;
		}
		return false;
	}

	public final static boolean IsFile(String Path) {
		return new File(Path).isFile();
	}

	public final static boolean IsDirectory(String Path) {
		return new File(Path).isDirectory();
	}

	public final static boolean IsFileExists(String Path) {
		return new File(Path).exists();
	}

	public final static boolean IsFileReadable(String Path) {
		return new File(Path).canRead();
	}

	public final static boolean IsFileWritable(String Path) {
		return new File(Path).canWrite();
	}

	public final static boolean IsFileExecutable(String Path) {
		return new File(Path).canExecute();
	}

	public final static String[] ExpandPath(String Path) {
		/*local*/int Index = Path.indexOf("*");
		/*local*/String NewPath = LibGreenTea.SubString(Path, 0, Index);
		/*local*/String[] ExpanddedPaths = new File(NewPath).list();
		if(ExpanddedPaths != null) {
			return ExpanddedPaths;
		}
		return new String[0];
	}
//endif VAJA
	/*field*/private static String ErrorMessage = "no error reported";

	public static void SetErrorMessage(String Message) {
		DShellGrammar.ErrorMessage = Message;
	}

	private static Object GetErrorMessage() {
		return DShellGrammar.ErrorMessage;
	}
//ifdef JAVA
	public final static DFault CreateFault(GtNameSpace NameSpace, String DCaseNode, String FaultInfo, String ErrorInfo) {
		if(FaultInfo == null) {
			FaultInfo = NameSpace.GetSymbolText("AssumedFault");
		}
		DFault Fault = new DFault(NameSpace.GetSymbolText("Location"), FaultInfo, ErrorInfo);
		return Fault.UpdateDCaseReference(NameSpace.GetSymbolText("DCaseURL"), DCaseNode);
	}

	public final static DFault CreateExceptionFault(GtNameSpace NameSpace, String DCaseNode, Exception e) {
		// TODO: Dispatch Fault by type of Exception e
		// default fault is set to UnexpectedFault
		return DShellGrammar.CreateFault(NameSpace, DCaseNode, "UnexpectedFault", e.toString());
	}

	public final static DFault ExecAction(GtNameSpace NameSpace, String DCaseNode, GtFunc Action) {
		DFault Fault = null;

		try {
			Fault = (DFault)((Method)Action.FuncBody).invoke(null);
		}
		catch (Exception e) {
			Fault = CreateExceptionFault(NameSpace, DCaseNode, e);
		}

		String RECServerURL = NameSpace.GetSymbolText("RECServerURL");
		String Location = NameSpace.GetSymbolText("Location");
		String Context = Action.FuncName;   // FIXME: change context format to json
		String AuthId = NameSpace.GetSymbolText("AuthId");

		if(AuthId == null) {
			// TODO: output warning
		}

		RecAPI.PushRawData(RECServerURL, DCaseNode, Location, Fault, AuthId, Context);

		return Fault;
	}
//endif VAJA

	// Grammar
	private static String CommandSymbol(String Symbol) {
		return "__$" + Symbol;
	}

	private static void AppendCommand(GtNameSpace NameSpace, String CommandPath, GtToken SourceToken) {
		if(CommandPath.length() > 0) {
			/*local*/int loc = CommandPath.lastIndexOf('/');
			/*local*/String Command = CommandPath;
			if(loc != -1) {
//ifdef JAVA
				if(!IsFileExecutable(CommandPath)) {
					NameSpace.Context.ReportError(ErrorLevel, SourceToken, "not executable: " + CommandPath);
				}
				else {
//endif VAJA
					Command = CommandPath.substring(loc+1);
					NameSpace.SetSymbol(Command, NameSpace.GetSyntaxPattern("$DShell2$"), SourceToken);
					NameSpace.SetSymbol(DShellGrammar.CommandSymbol(Command), CommandPath, null);
//ifdef JAVA
				}
//endif VAJA
			}
			else {
//ifdef JAVA
				if(IsUnixCommand(CommandPath)) {
//endif VAJA
					NameSpace.SetSymbol(Command, NameSpace.GetSyntaxPattern("$DShell2$"), SourceToken);
					NameSpace.SetSymbol(DShellGrammar.CommandSymbol(Command), CommandPath, null);
//ifdef JAVA
				}
				else {
					NameSpace.Context.ReportError(ErrorLevel, SourceToken, "unknown command: " + CommandPath);
				}
//endif VAJA
			}
		}
	}

	public static GtSyntaxTree ParseCommand(GtNameSpace NameSpace, GtTokenContext TokenContext, GtSyntaxTree LeftTree, GtSyntaxPattern Pattern) {
		/*local*/GtSyntaxTree CommandTree = TokenContext.CreateMatchedSyntaxTree(NameSpace, Pattern, "command");
		/*local*/String Command = "";
		/*local*/GtToken SourceToken = null;
		while(TokenContext.HasNext()) {
			/*local*/GtToken Token = TokenContext.Next();
			if(Token.EqualsText(",")) {
				Token.ParsedText = "";
			}
			if(Token.EqualsText("~")) {
				Token.ParsedText = DShellGrammar.GetEnv("HOME");
			}
			if(Token.IsDelim() || Token.IsIndent()) {
				break;
			}
			SourceToken = Token;
			Command += Token.ParsedText;
			if(Token.IsNextWhiteSpace()) {
				DShellGrammar.AppendCommand(NameSpace, Command, SourceToken);
				Command = "";
				if(SourceToken.IsError()) {
					CommandTree.ToError(SourceToken);
				}
			}
		}
		DShellGrammar.AppendCommand(NameSpace, Command, SourceToken);
		if(SourceToken.IsError()) {
			CommandTree.ToError(SourceToken);
		}
		return CommandTree;
	}

	public static long ShellCommentToken(GtTokenContext TokenContext, String SourceText, long pos) {
		if(LibGreenTea.CharAt(SourceText, pos) == '#') { // shell style SingleLineComment
			/*local*/long NextPos = pos + 1;
			while(NextPos < SourceText.length()) {
				/*local*/char NextChar = LibGreenTea.CharAt(SourceText, NextPos);
				if(NextChar == '\n') {
					break;
				}
				NextPos = NextPos + 1;
			}
			return KonohaGrammar.IndentToken(TokenContext, SourceText, NextPos);
		}
		return MismatchedPosition;
	}

	public static GtSyntaxTree ParseEnv(GtNameSpace NameSpace, GtTokenContext TokenContext, GtSyntaxTree LeftTree, GtSyntaxPattern Pattern) {
		/*local*/GtSyntaxTree CommandTree = TokenContext.CreateMatchedSyntaxTree(NameSpace, Pattern, "letenv");
		/*local*/GtToken Token = TokenContext.Next();
		if(!LibGreenTea.IsVariableName(Token.ParsedText, 0)) {
			return TokenContext.ReportExpectedMessage(Token, "name", true);
		}
		/*local*/String Name = Token.ParsedText;
		/*local*/String Env  = DShellGrammar.GetEnv(Name);
		if(TokenContext.MatchToken("=")) {
			/*local*/GtSyntaxTree ConstTree = TokenContext.ParsePattern(NameSpace, "$Expression$", Required);
			if(GreenTeaUtils.IsMismatchedOrError(ConstTree)) {
				return ConstTree;
			}
			if(Env == null) {
				/*local*/GtTypeEnv Gamma = new GtTypeEnv(NameSpace);
				/*local*/GtNode ConstNode = ConstTree.TypeCheck(Gamma, GtStaticTable.StringType, DefaultTypeCheckPolicy);
				Env = (/*cast*/String)ConstNode.ToConstValue(Gamma.Context, true);
			}
		}
		if(Env == null) {
			NameSpace.Context.ReportError(ErrorLevel, Token, "undefined environment variable: " + Name);
			CommandTree.ToError(Token);
		}
		else {
			NameSpace.SetSymbol(Name, Env, Token);
			CommandTree.ToConstTree(Env);
		}
		return CommandTree;
	}

	/*field*/private final static String FileOperators = "-d -e -f -r -w -x";
	/*field*/private final static String StopTokens = ";,)]}&&||";

	public static GtSyntaxTree ParseFilePath(GtNameSpace NameSpace, GtTokenContext TokenContext, GtSyntaxTree LeftTree, GtSyntaxPattern Pattern) {
		/*local*/GtToken Token = TokenContext.GetToken();
		/*local*/boolean HasStringExpr = false;
		/*local*/String Path = null;
		if(Token.IsIndent() || DShellGrammar.StopTokens.indexOf(Token.ParsedText) != -1) {
			return null;
		}
		else if(Token.IsQuoted()) {
			Path = LibGreenTea.UnquoteString(Token.ParsedText);
			if(Path.indexOf("${") != -1) {
				HasStringExpr = true;
			}
			TokenContext.Next();
		}
		if(Path == null) {
			/*local*/boolean FoundOpen = false;
			Path = "";
			while(TokenContext.HasNext()) {
				Token = TokenContext.GetToken();
				/*local*/String ParsedText = Token.ParsedText;
				if(Token.IsIndent() || (!FoundOpen && DShellGrammar.StopTokens.indexOf(Token.ParsedText) != -1)) {
					break;
				}
				TokenContext.Next();
				if(Token.EqualsText("$")) {   // $HOME/hoge
					/*local*/GtToken Token2 = TokenContext.GetToken();
					if(LibGreenTea.IsVariableName(Token2.ParsedText, 0)) {
						Path += "${" + Token2.ParsedText + "}";
						HasStringExpr = true;
						TokenContext.Next();
						if(Token2.IsNextWhiteSpace()) {
							break;
						}
						continue;
					}
				}
				if(Token.EqualsText("{")) {
					HasStringExpr = true;
					FoundOpen = true;
				}
				if(Token.EqualsText("}")) {
					FoundOpen = false;
				}
				if(Token.EqualsText("~")) {
					ParsedText = DShellGrammar.GetEnv("HOME");
				}
				Path += ParsedText;
				if(!FoundOpen && Token.IsNextWhiteSpace()) {
					break;
				}
			}
		}
		if(!HasStringExpr) {
			/*local*/GtSyntaxTree PathTree = new GtSyntaxTree(Pattern, NameSpace, Token, null);
			PathTree.ToConstTree(Path);
//			System.err.println("debug: " + Path + " ...");
			return PathTree;
		}
		else {
//			System.err.println("debug: " + Path);
			Path = "\"" + Path + "\"";
			Path = Path.replaceAll("\\$\\{", "\" + (");
			Path = Path.replaceAll("\\}", ") + \"");
//			System.err.println("debug: " + Path);
			/*local*/GtTokenContext LocalContext = new GtTokenContext(NameSpace, Path, Token.FileLine);
			return LocalContext.ParsePattern(NameSpace, "$Expression$", Required);
		}
	}

	public static GtSyntaxTree ParseFileOperator(GtNameSpace NameSpace, GtTokenContext TokenContext, GtSyntaxTree LeftTree, GtSyntaxPattern Pattern) {
		/*local*/GtToken Token = TokenContext.Next();   // "-"
		/*local*/GtToken Token2 = TokenContext.Next();  // "f"
		if(!Token.IsNextWhiteSpace()) {
			if(DShellGrammar.FileOperators.indexOf(Token2.ParsedText) != -1) {
				Token.ParsedText += Token2.ParsedText;  // join to "-f";
				/*local*/GtSyntaxTree Tree = new GtSyntaxTree(Pattern, NameSpace, Token, null);
				Tree.SetMatchedPatternAt(UnaryTerm, NameSpace, TokenContext, "$FilePath$", Required);
				return Tree;
			}
		}
		return null;
	}

	public static GtNode TypeFileOperator(GtTypeEnv Gamma, GtSyntaxTree ParsedTree, GtType ContextType) {
		/*local*/GtNode PathNode = ParsedTree.TypeCheckAt(UnaryTerm, Gamma, GtStaticTable.StringType, DefaultTypeCheckPolicy);
		if(!PathNode.IsErrorNode()) {
			/*local*/String OperatorSymbol = ParsedTree.KeyToken.ParsedText;
			/*local*/GtPolyFunc PolyFunc = Gamma.NameSpace.GetMethod(GtStaticTable.StringType, FuncSymbol(OperatorSymbol), true);
			/*local*/GtFunc ResolvedFunc = PolyFunc.ResolveUnaryMethod(Gamma, PathNode.Type);
			LibGreenTea.Assert(ResolvedFunc != null);
			/*local*/GtNode ApplyNode =  Gamma.Generator.CreateApplyNode(ResolvedFunc.GetReturnType(), ParsedTree, ResolvedFunc);
			ApplyNode.Append(Gamma.Generator.CreateConstNode(GtStaticTable.VarType, ParsedTree, ResolvedFunc));
			ApplyNode.Append(PathNode);
			return ApplyNode;
		}
		return PathNode;
	}

	private static void IncreasePos(GtTokenContext TokenContext, int time, boolean allowIncrement) {
		if(allowIncrement) {
			for(/*local*/int i = 0; i < time; i++) {
				TokenContext.Next();
			}
		}
	}

	// >, >>, >&, 1>, 2>, 1>>, 2>>, &>, &>>, 1>&1, 1>&2, 2>&1, 2>&2, >&1, >&2
	private static String FindRedirectSymbol(GtTokenContext TokenContext, boolean allowIncrement) {
		/*local*/GtToken Token = TokenContext.GetToken();
		/*local*/int CurrentPos = TokenContext.GetPosition(0);
		/*local*/int NextLen = 0;
		/*local*/String RedirectSymbol = Token.ParsedText;
		if(Token.EqualsText(">>")) {
			DShellGrammar.IncreasePos(TokenContext, 1, allowIncrement);
			return RedirectSymbol;
		}
		else if(Token.EqualsText(">")) {
			NextLen = 2;
		}
		else if(Token.EqualsText("1") || Token.EqualsText("2") || Token.EqualsText("&")) {
			NextLen = 3;
		}
		
		/*local*/GtToken[] NextTokens = new GtToken[NextLen];
		for(/*local*/int i = 0; i < NextLen; i++) {
			TokenContext.Next();
			NextTokens[i] = TokenContext.GetToken();
		}
		TokenContext.RollbackPosition(CurrentPos, 0);

		if(NextLen == 2) {
			if(!Token.IsNextWhiteSpace() && NextTokens[0].EqualsText("&")) {
				RedirectSymbol += NextTokens[0].ParsedText;
				if(!NextTokens[0].IsNextWhiteSpace()) {
					if(NextTokens[1].EqualsText("1") || NextTokens[1].EqualsText("2")) {
						RedirectSymbol += NextTokens[1].ParsedText;
						DShellGrammar.IncreasePos(TokenContext, 3, allowIncrement);
						return RedirectSymbol;
					}
				}
				DShellGrammar.IncreasePos(TokenContext, 2, allowIncrement);
				return RedirectSymbol;
			}
			DShellGrammar.IncreasePos(TokenContext, 1, allowIncrement);
			return RedirectSymbol;
		}
		else if(NextLen == 3) {
			if(!Token.IsNextWhiteSpace() && (NextTokens[0].EqualsText(">") || NextTokens[0].EqualsText(">>"))) {
				RedirectSymbol += NextTokens[0].ParsedText;
				if(!NextTokens[0].IsNextWhiteSpace() &&
						(LibGreenTea.EqualsString(RedirectSymbol, "1>") || LibGreenTea.EqualsString(RedirectSymbol, "2>"))) {
					if(NextTokens[1].EqualsText("&") && !NextTokens[1].IsNextWhiteSpace()) {
						if(NextTokens[2].EqualsText("1") || NextTokens[2].EqualsText("2")) {
							RedirectSymbol += NextTokens[1].ParsedText + NextTokens[2].ParsedText;
							DShellGrammar.IncreasePos(TokenContext, 4, allowIncrement);
							return RedirectSymbol;
						}
					}
				}
				DShellGrammar.IncreasePos(TokenContext, 2, allowIncrement);
				return RedirectSymbol;
			}
		}
		return null;
	}

	public static GtSyntaxTree ParseDShell2(GtNameSpace NameSpace, GtTokenContext TokenContext, GtSyntaxTree LeftTree, GtSyntaxPattern Pattern) {
		/*local*/GtSyntaxTree CommandTree = TokenContext.CreateSyntaxTree(NameSpace, Pattern, null);
		/*local*/GtToken CommandToken = TokenContext.GetToken();
		/*local*/String RedirectSymbol = DShellGrammar.FindRedirectSymbol(TokenContext, true);
		if(RedirectSymbol != null) {
			CommandTree.AppendParsedTree2(CommandTree.CreateConstTree(RedirectSymbol));
		}
		else {
			/*local*/String Command = (/*cast*/String)NameSpace.GetSymbol(DShellGrammar.CommandSymbol(CommandToken.ParsedText));
			if(Command != null) {
				CommandTree.AppendParsedTree2(CommandTree.CreateConstTree(Command));
				TokenContext.Next();
			}
			else {
				CommandTree.AppendMatchedPattern(NameSpace, TokenContext, "$FilePath$", Required);
			}
		}
		TokenContext.SetBackTrack(false);
		while(TokenContext.HasNext() && CommandTree.IsValidSyntax()) {
			/*local*/GtToken Token = TokenContext.GetToken();
			if(Token.IsIndent() || DShellGrammar.StopTokens.indexOf(Token.ParsedText) != -1) {
				if(!Token.EqualsText("|") && !Token.EqualsText("&")) {
					break;
				}
			}
			if(Token.EqualsText("||") || Token.EqualsText("&&")) {
				/*local*/GtSyntaxPattern ExtendedPattern = TokenContext.GetExtendedPattern(NameSpace);
				return GreenTeaUtils.ApplySyntaxPattern(NameSpace, TokenContext, CommandTree, ExtendedPattern);
			}
			if(Token.EqualsText("|")) {
				TokenContext.Next();
				/*local*/GtSyntaxTree PipedTree = TokenContext.ParsePattern(NameSpace, "$DShell2$", Required);
				if(PipedTree.IsError()) {
					return PipedTree;
				}
				CommandTree.AppendParsedTree2(PipedTree);
				return CommandTree;
			}
			if(Token.EqualsText("&")) {	// set background job
				/*local*/GtSyntaxTree OptionTree = TokenContext.CreateSyntaxTree(NameSpace, Pattern, null);
				OptionTree.AppendParsedTree2(OptionTree.CreateConstTree(Token.ParsedText));
				CommandTree.AppendParsedTree2(OptionTree);
				TokenContext.Next();
				return CommandTree;
			}
			if(DShellGrammar.FindRedirectSymbol(TokenContext, false) != null) {
				/*local*/GtSyntaxTree RedirectTree = TokenContext.ParsePattern(NameSpace, "$DShell2$", Required);
				if(RedirectTree.IsError()) {
					return RedirectTree;
				}
				CommandTree.AppendParsedTree2(RedirectTree);
				return CommandTree;
			}
			CommandTree.AppendMatchedPattern(NameSpace, TokenContext, "$FilePath$", Required);
		}
		return CommandTree;
	}

	public static GtNode TypeDShell2(GtTypeEnv Gamma, GtSyntaxTree ParsedTree, GtType ContextType) {
		/*local*/GtType Type = null;
		if(ContextType.IsStringType() || ContextType.IsBooleanType()) {
			Type = ContextType;
		}
		else if(ContextType.IsVoidType()) {
			Type = GtStaticTable.VoidType;
		}
		else {
			Type = ParsedTree.NameSpace.GetType("Task");
			LibGreenTea.Assert(Type != null);
		}
		/*local*/GtNode PipedNode = null;
		/*local*/int Index = 0;
		/*local*/int ArgumentSize = LibGreenTea.ListSize(ParsedTree.SubTreeList);
		while(Index < ArgumentSize) {
			/*local*/GtSyntaxTree SubTree = ParsedTree.SubTreeList.get(Index);
			if(SubTree.Pattern.EqualsName("$DShell2$")) {
				PipedNode = DShellGrammar.TypeDShell2(Gamma, SubTree, ContextType);
				ArgumentSize = Index;
				break;
			}
			Index += 1;
		}
		/*local*/GtNode Node = Gamma.Generator.CreateCommandNode(Type, ParsedTree, PipedNode);
		Index = 0;
		while(Index < ArgumentSize) {
			/*local*/GtNode ArgumentNode = ParsedTree.TypeCheckAt(Index, Gamma, GtStaticTable.StringType, DefaultTypeCheckPolicy);
			if(ArgumentNode.IsErrorNode()) {
				return ArgumentNode;
			}
			Node.Append(ArgumentNode);
			Index += 1;
		}
		return Node;
	}

	/*field*/private final static int AtomicTarget   = 0;
	/*field*/private final static int AtomicBody     = 1;
	/*field*/private final static int AtomicExcept   = 2;
	/*field*/private final static int AtomicRollback = 3;
	/*field*/private final static int AtomicClear    = 4;
	/*field*/private static int checkpointCount = -1;

	public static GtSyntaxTree ParseAtomic(GtNameSpace NameSpace, GtTokenContext TokenContext, GtSyntaxTree LeftTree, GtSyntaxPattern Pattern) {
		/*local*/GtSyntaxTree AtomicTree = TokenContext.CreateMatchedSyntaxTree(NameSpace, Pattern, "atomic");
		/*local*/GtSyntaxTree TargetTree = TokenContext.ParsePattern(NameSpace, "$FilePath$", Required);

		/*local*/String TargetPath = LibGreenTea.QuoteString((/*cast*/String)TargetTree.ParsedValue);
		DShellGrammar.checkpointCount += 1;
		/*local*/String CheckPointName = "___def_check_point__" + DShellGrammar.checkpointCount;

		/*local*/String NewCheckPoint = "var " + CheckPointName + " = new CheckPoint(" + TargetPath + ");";
		/*local*/GtTokenContext CheckPointContext = new GtTokenContext(NameSpace, NewCheckPoint, TokenContext.ParsingLine);
		AtomicTree.SetMatchedPatternAt(DShellGrammar.AtomicTarget, NameSpace, CheckPointContext, "$VarDecl$", Required);

		TokenContext.SkipEmptyStatement();
		AtomicTree.SetMatchedPatternAt(DShellGrammar.AtomicBody, NameSpace, TokenContext, "$Block$", Required);

		/*local*/String NewExcept = "DShellException e";
		/*local*/GtTokenContext ExceptContext = new GtTokenContext(NameSpace, NewExcept, TokenContext.ParsingLine);
		AtomicTree.SetMatchedPatternAt(DShellGrammar.AtomicExcept , NameSpace, ExceptContext, "$VarDecl$", Required);

		/*local*/String NewRollback = "{ " + CheckPointName + ".rollback(); }";
		/*local*/GtTokenContext RollbackContext = new GtTokenContext(NameSpace, NewRollback, TokenContext.ParsingLine);
		AtomicTree.SetMatchedPatternAt(DShellGrammar.AtomicRollback, NameSpace, RollbackContext, "$Block$", Required);

		/*local*/String NewClear = "{ " + CheckPointName + ".clear(); }";
		/*local*/GtTokenContext ClearContext = new GtTokenContext(NameSpace, NewClear, TokenContext.ParsingLine);
		AtomicTree.SetMatchedPatternAt(DShellGrammar.AtomicClear, NameSpace, ClearContext, "$Block$", Required);
		return AtomicTree;
	}

	public static GtNode TypeAtomic(GtTypeEnv Gamma, GtSyntaxTree ParsedTree, GtType ContextType) {
		/*local*/GtNameSpace NameSpace = Gamma.NameSpace;
		/*local*/GtSyntaxPattern TryPattern = NameSpace.GetSyntaxPattern("try");
		/*local*/GtSyntaxTree TryTree = new GtSyntaxTree(TryPattern, NameSpace, new GtToken("try", ParsedTree.KeyToken.FileLine), null);
		TryTree.SetSyntaxTreeAt(TryBody, ParsedTree.GetSyntaxTreeAt(DShellGrammar.AtomicBody));
		TryTree.SetSyntaxTreeAt(CatchVariable, ParsedTree.GetSyntaxTreeAt(DShellGrammar.AtomicExcept));
		TryTree.SetSyntaxTreeAt(CatchBody, ParsedTree.GetSyntaxTreeAt(DShellGrammar.AtomicRollback));
		TryTree.SetSyntaxTreeAt(FinallyBody, ParsedTree.GetSyntaxTreeAt(DShellGrammar.AtomicClear));
		/*local*/GtSyntaxTree TargetDeclTree = ParsedTree.GetSyntaxTreeAt(DShellGrammar.AtomicTarget);
		TargetDeclTree.ParentTree = ParsedTree.ParentTree;
		TargetDeclTree.PrevTree = ParsedTree.PrevTree;
		TargetDeclTree.NextTree = TryTree;
		TryTree.NextTree = ParsedTree.NextTree;
		ParsedTree = TargetDeclTree;
		return KonohaGrammar.TypeVarDecl(Gamma, ParsedTree, ContextType);
	}

	public static GtSyntaxTree ParseShell(GtNameSpace NameSpace, GtTokenContext TokenContext, GtSyntaxTree LeftTree, GtSyntaxPattern Pattern) {
		TokenContext.Next();
		return TokenContext.ParsePattern(NameSpace, "$DShell2$", Required);
	}

	// dlog $Expr
	private static GtNode CreateDCaseNode(GtTypeEnv Gamma, GtSyntaxTree ParsedTree) {
		/*local*/String ContextualFuncName = "Admin";
		if(Gamma.Func != null) {
			ContextualFuncName = Gamma.Func.FuncName;
		}
		return Gamma.Generator.CreateConstNode(GtStaticTable.StringType, ParsedTree, ContextualFuncName);
	}

	public static GtSyntaxTree ParseDLog(GtNameSpace NameSpace, GtTokenContext TokenContext, GtSyntaxTree LeftTree, GtSyntaxPattern Pattern) {
		/*local*/GtSyntaxTree Tree = TokenContext.CreateMatchedSyntaxTree(NameSpace, Pattern, "dlog");
		Tree.SetMatchedPatternAt(UnaryTerm, NameSpace, TokenContext, "$Expression$", Required);
		return Tree;
	}

	// dlog FunctionName => ExecAction(NameSpace, ContextualFuncName, Action);
	public static GtNode TypeDLog(GtTypeEnv Gamma, GtSyntaxTree ParsedTree, GtType ContextType) {
		ContextType = LibNative.GetNativeType(DFault.class);
		/*local*/GtNode ActionNode = ParsedTree.TypeCheckAt(UnaryTerm, Gamma, ContextType, DefaultTypeCheckPolicy);
		if(ActionNode.IsErrorNode()) {
			return ActionNode;
		}
		if(ActionNode instanceof GtStaticApplyNode) {
			if(Gamma.NameSpace.GetSymbol("RECServerURL") == null) {
				return Gamma.CreateSyntaxErrorNode(ParsedTree, "constant variable 'RECServerURL' is not defined");
			}
			if(Gamma.NameSpace.GetSymbol("Location") == null) {
				return Gamma.CreateSyntaxErrorNode(ParsedTree, "constant variable 'Location' is not defined");
			}

			/*local*/GtFunc ActionFunc = ((/*cast*/GtStaticApplyNode)ActionNode).Func;
			if(ActionFunc.GetFuncParamSize() == 0) {
				/*local*/GtFunc ReportFunc = (/*cast*/GtFunc)Gamma.NameSpace.GetSymbol("$ReportBuiltInFunc");
				/*local*/GtNode ApplyNode = Gamma.Generator.CreateApplyNode(ContextType, ParsedTree, ReportFunc);
				ApplyNode.Append(Gamma.Generator.CreateConstNode(GtStaticTable.VarType, ParsedTree, ReportFunc));
				ApplyNode.Append(Gamma.Generator.CreateConstNode(GtStaticTable.VarType, ParsedTree, Gamma.NameSpace));
				ApplyNode.Append(DShellGrammar.CreateDCaseNode(Gamma, ParsedTree));
				ApplyNode.Append(Gamma.Generator.CreateConstNode(GtStaticTable.VarType, ParsedTree, ActionFunc));
				return ApplyNode;
			}
		}
		return Gamma.CreateSyntaxErrorNode(ParsedTree, "action must be Func<DFault, void>");
	}
	
	// Raise Expression
	/*field*/public final static int ErrorTerm = 0;
	/*field*/public final static int FaultTerm = 1;
	
	public static GtSyntaxTree ParseFault(GtNameSpace NameSpace, GtTokenContext TokenContext, GtSyntaxTree LeftTree, GtSyntaxPattern Pattern) {
		/*local*/GtSyntaxTree FaultTree = TokenContext.CreateMatchedSyntaxTree(NameSpace, Pattern, "fault");
		if(TokenContext.MatchToken("(")) {
			FaultTree.SetMatchedPatternAt(DShellGrammar.ErrorTerm, NameSpace, TokenContext, "$Expression$", Required);
			if(TokenContext.MatchToken(",")) {
				FaultTree.SetMatchedPatternAt(DShellGrammar.FaultTerm, NameSpace, TokenContext, "$Variable$", Required);
			}
			FaultTree.SetMatchedTokenAt(NoWhere, NameSpace, TokenContext, ")", Required);
		}
		return FaultTree;
	}

	public static GtNode TypeFault(GtTypeEnv Gamma, GtSyntaxTree ParsedTree, GtType ContextType) {
		/*local*/GtFunc CreateFunc = (/*cast*/GtFunc)Gamma.NameSpace.GetSymbol("$CreateFaultBuiltInFunc");
		/*local*/GtNode ApplyNode = Gamma.Generator.CreateApplyNode(ContextType, ParsedTree, CreateFunc);
		ApplyNode.Append(Gamma.Generator.CreateConstNode(GtStaticTable.VarType, ParsedTree, CreateFunc));
		ApplyNode.Append(Gamma.Generator.CreateConstNode(GtStaticTable.VarType, ParsedTree, Gamma.NameSpace));
		ApplyNode.Append(DShellGrammar.CreateDCaseNode(Gamma, ParsedTree));
		/*local*/String FaultInfo;
		if(ParsedTree.HasNodeAt(DShellGrammar.FaultTerm)) {
			FaultInfo = ParsedTree.GetSyntaxTreeAt(DShellGrammar.FaultTerm).KeyToken.ParsedText;
		}
		else {
			FaultInfo = Gamma.NameSpace.GetSymbolText("AssumedFault");
			if(FaultInfo == null) {
				FaultInfo = "UnexpectedFault";
			}
		}
		ApplyNode.Append(Gamma.Generator.CreateConstNode(GtStaticTable.VarType, ParsedTree, FaultInfo));
		/*local*/GtNode ErrorInfoNode = null;
		if(ParsedTree.HasNodeAt(DShellGrammar.ErrorTerm)) {
			ErrorInfoNode = ParsedTree.TypeCheckAt(DShellGrammar.ErrorTerm, Gamma, GtStaticTable.StringType, DefaultTypeCheckPolicy);
		}
		else {
			ErrorInfoNode = Gamma.Generator.CreateConstNode(GtStaticTable.VarType, ParsedTree, DShellGrammar.GetErrorMessage());
		}
		ApplyNode.Append(ErrorInfoNode);
		return ApplyNode;
	}

	private static final GtNode CreateConstNode(GtTypeEnv Gamma, GtSyntaxTree ParsedTree, Object ConstValue) {
		return Gamma.Generator.CreateConstNode(GtStaticTable.GuessType(ConstValue), ParsedTree, ConstValue);
	}

	// dexec CallAdmin() 
	// D-exec Expression
	// dexec FunctionName
	public static GtSyntaxTree ParseDexec(GtNameSpace NameSpace, GtTokenContext TokenContext, GtSyntaxTree LeftTree, GtSyntaxPattern Pattern) {
		/*local*/GtSyntaxTree Tree = TokenContext.CreateMatchedSyntaxTree(NameSpace, Pattern, "dexec");
		Tree.SetMatchedPatternAt(UnaryTerm, NameSpace, TokenContext, "$Variable$", Required);
		return Tree;
	}

	// dexec FunctionName
	// => ReportAction(FunctionName(), "FunctionName", CurrentFuncName, DCaseRevision)
	public static GtNode TypeDexec(GtTypeEnv Gamma, GtSyntaxTree ParsedTree, GtType ContextType) {
		/*local*/Object ConstValue = ParsedTree.NameSpace.GetSymbol("DCaseRevision");
		if(ConstValue == null) {
			return Gamma.CreateSyntaxErrorNode(ParsedTree, "constant variable DCaseRevision is not defined in this context");
		}
		/*local*/GtType DFaultType = (/*cast*/GtType) ParsedTree.NameSpace.GetSymbol("DFault");
		if(DFaultType == null) {
			return Gamma.CreateSyntaxErrorNode(ParsedTree, "DFault type is not defined in this context");
		}

		/*local*/GtNode ApplyNode = KonohaGrammar.TypeApply(Gamma, ParsedTree, DFaultType);
		if(ApplyNode.IsErrorNode()) {
			return ApplyNode;
		}

		// create UpdateFaultInfomation(FunctionName(), "FunctionName", CurrentFuncName, DCaseRevision);
		/*local*/GtNode Revision = DShellGrammar.CreateConstNode(Gamma, ParsedTree, ConstValue);
		/*local*/String FunctionName = (/*cast*/String) ParsedTree.GetSyntaxTreeAt(UnaryTerm).KeyToken.ParsedText;
		/*local*/String CurrentFuncName = Gamma.Func.GetNativeFuncName();

		/*local*/GtNode FuncNameNode = DShellGrammar.CreateConstNode(Gamma, ParsedTree, FunctionName);
		/*local*/GtNode CurFuncNameNode = DShellGrammar.CreateConstNode(Gamma, ParsedTree, CurrentFuncName);
		
		ConstValue = ParsedTree.NameSpace.GetSymbol("Location");
		if(ConstValue == null || !(ConstValue instanceof String)) {
			return Gamma.CreateSyntaxErrorNode(ParsedTree, "Location is not defined in this context");
		}
		/*local*/GtNode LocationNode = DShellGrammar.CreateConstNode(Gamma, ParsedTree, ConstValue);
		ConstValue = ParsedTree.NameSpace.GetSymbol("RecServer");
		if(ConstValue == null || !(ConstValue instanceof String)) {
			return Gamma.CreateSyntaxErrorNode(ParsedTree, "RecServer is not defined in this context");
		}
		/*local*/GtNode RecServerNode = DShellGrammar.CreateConstNode(Gamma, ParsedTree, ConstValue);
		ConstValue = ParsedTree.NameSpace.GetSymbol("ReportAction");
		if(!(ConstValue instanceof GtFunc)) {
			return Gamma.CreateSyntaxErrorNode(ParsedTree, "ReportAction is not defined in this context");
		}
		/*local*/GtFunc Func = (/*cast*/GtFunc) ConstValue;
		/*local*/GtNode ApplyNode2 = Gamma.Generator.CreateApplyNode(Func.GetReturnType(), ParsedTree, Func);
		ApplyNode2.Append(DShellGrammar.CreateConstNode(Gamma, ParsedTree, Func));
		ApplyNode2.Append(ApplyNode);
		ApplyNode2.Append(FuncNameNode);
		ApplyNode2.Append(CurFuncNameNode);
		ApplyNode2.Append(Revision);
		ApplyNode2.Append(LocationNode);
		ApplyNode2.Append(RecServerNode);
		return ApplyNode2;
	}

	// Raise Expression
	public static GtSyntaxTree ParseRaise(GtNameSpace NameSpace, GtTokenContext TokenContext, GtSyntaxTree LeftTree, GtSyntaxPattern Pattern) {
		/*local*/GtSyntaxTree ReturnTree = TokenContext.CreateMatchedSyntaxTree(NameSpace, Pattern, "raise");
		ReturnTree.SetMatchedPatternAt(UnaryTerm, NameSpace, TokenContext, "$Type$", Required);
		return ReturnTree;
	}

	public static GtNode TypeRaise(GtTypeEnv Gamma, GtSyntaxTree ParsedTree, GtType ContextType) {
		if(Gamma.IsTopLevel() || Gamma.Func == null) {
			return Gamma.UnsupportedTopLevelError(ParsedTree);
		}
		/*local*/GtNode Expr = ParsedTree.TypeCheckAt(UnaryTerm, Gamma, GtStaticTable.TypeType, DefaultTypeCheckPolicy);
		if(Expr.IsConstNode() && Expr.Type.IsTypeType()) {
			/*local*/GtType ObjectType = (/*cast*/GtType)((/*cast*/GtConstNode)Expr).ConstValue;
			Expr = Gamma.Generator.CreateNewNode(ObjectType, ParsedTree);
			//Expr = KonohaGrammar.TypeApply(Gamma, ParsedTree, ObjectType);
		}
		return Gamma.Generator.CreateReturnNode(Expr.Type, ParsedTree, Expr);
	}

	public static DFault UpdateFaultInfomation(DFault Fault, String CalledFuncName, String CurrentFuncName, long DCaseRevision, String Location, String RecServer) {
		if(Fault == null) {
			return null;
		}
//		Fault.UpdateFaultInfomation(CalledFuncName, CurrentFuncName, DCaseRevision);
		return Fault;
	}

//ifdef JAVA
	// this is a new interface used in ImportNativeObject
	public static void ImportGrammar(GtNameSpace NameSpace, Class<?> GrammarClass) {
		/*local*/GtParserContext ParserContext = NameSpace.Context;
		NameSpace.AppendTokenFunc("#", LoadTokenFunc2(ParserContext, GrammarClass, "ShellCommentToken")); 
		
		NameSpace.AppendSyntax("letenv", LoadParseFunc2(ParserContext, GrammarClass, "ParseEnv"), null);
		NameSpace.AppendSyntax("command", LoadParseFunc2(ParserContext, GrammarClass, "ParseCommand"), null);
		NameSpace.AppendSyntax("-", LoadParseFunc2(ParserContext, GrammarClass, "ParseFileOperator"), LoadTypeFunc2(ParserContext, GrammarClass, "TypeFileOperator"));
		NameSpace.AppendSyntax("$FilePath$", LoadParseFunc2(ParserContext, GrammarClass, "ParseFilePath"), null);
		NameSpace.AppendSyntax("$DShell2$", LoadParseFunc2(ParserContext, GrammarClass, "ParseDShell2"), LoadTypeFunc2(ParserContext, GrammarClass, "TypeDShell2"));
		NameSpace.AppendSyntax("shell", LoadParseFunc2(ParserContext, GrammarClass, "ParseShell"), null);
		NameSpace.AppendSyntax("atomic", LoadParseFunc2(ParserContext, GrammarClass, "ParseAtomic"), LoadTypeFunc2(ParserContext, GrammarClass, "TypeAtomic"));
		
		// builtin command
		// timeout
		/*local*/String timeout = "timeout";
		NameSpace.SetSymbol(timeout, NameSpace.GetSyntaxPattern("$DShell2$"), new GtToken(timeout, 0));
		NameSpace.SetSymbol(DShellGrammar.CommandSymbol(timeout), timeout, null);
		// infer
		/*local*/String infer = "infer";
		NameSpace.SetSymbol(infer, NameSpace.GetSyntaxPattern("$DShell2$"), new GtToken(infer, 0));
		NameSpace.SetSymbol(DShellGrammar.CommandSymbol(infer), infer, null);

		NameSpace.SetSymbol("$CreateFaultBuiltInFunc", LibNative.ImportNativeObject(NameSpace, "DShellGrammar.CreateFault"), null);
		NameSpace.SetSymbol("$ReportBuiltInFunc", LibNative.ImportNativeObject(NameSpace, "DShellGrammar.ExecAction"), null);
		NameSpace.AppendSyntax("dlog", LoadParseFunc2(ParserContext, GrammarClass, "ParseDLog"), LoadTypeFunc2(ParserContext, GrammarClass, "TypeDLog"));
		NameSpace.AppendSyntax("fault", LoadParseFunc2(ParserContext, GrammarClass, "ParseFault"), LoadTypeFunc2(ParserContext, GrammarClass, "TypeFault"));
		
		NameSpace.AppendSyntax("raise", LoadParseFunc2(ParserContext, GrammarClass, "ParseRaise"), LoadTypeFunc2(ParserContext, GrammarClass, "TypeRaise"));
		NameSpace.AppendSyntax("dexec", LoadParseFunc2(ParserContext, GrammarClass, "ParseDexec"), LoadTypeFunc2(ParserContext, GrammarClass, "TypeDexec"));

	}
//endif VAJA
}
