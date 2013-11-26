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

// LangBase is a language-dependent code used in GreenTea.java

package org.GreenTeaScript;
import java.io.BufferedReader;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.FileWriter;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.io.PrintStream;
import java.io.Writer;
import java.lang.reflect.Constructor;
import java.lang.reflect.Field;
import java.lang.reflect.InvocationTargetException;
import java.lang.reflect.Method;
import java.lang.reflect.Modifier;
import java.util.ArrayList;
import java.util.Iterator;

import org.GreenTeaScript.Konoha.ArrayApi;

public abstract class LibGreenTea implements GreenTeaConsts {
	// LibGreenTea KonohaApi
	public final static void print(Object msg) {
		System.out.print(msg);
	}

	public final static void println(Object msg) {
		System.out.println(msg);
	}
	
	public final static void Assert(boolean TestResult) {
		if(!TestResult) {
			assert TestResult;
			Exit(1, "Assertion Failed");
		}
	}

	public final static GreenTeaArray NewArray(GtType Type, Object[] InitSizes) {
		if(InitSizes.length == 1) {
			return GreenTeaArray.NewArray1(Type.TypeParams[0], ((Number)InitSizes[0]).intValue());
		}
		else if(InitSizes.length == 2) {
			return GreenTeaArray.NewArray2(Type.TypeParams[0].TypeParams[0], ((Number)InitSizes[0]).intValue(), ((Number)InitSizes[1]).intValue());
		}
		else {
			return GreenTeaArray.NewArray3(Type.TypeParams[0].TypeParams[0].TypeParams[0], ((Number)InitSizes[0]).intValue(), ((Number)InitSizes[1]).intValue(), ((Number)InitSizes[2]).intValue());
		}
		
	}

	public final static GreenTeaArray NewArrayLiteral(GtType ArrayType, Object[] Values) {
		return GreenTeaArray.NewArrayLiteral(ArrayType, Values);		
	}
	
	public final static Object InvokeFunc(GtFunc Func, Object[] Params) {
		if(Func == null || Func.IsAbstract()) {
			LibGreenTea.VerboseLog(VerboseRuntime, "applying abstract function: " + Func);
			return Func.GetReturnType().DefaultNullValue;
		}
		else if(Func.Is(NativeMethodFunc)) {
			/*local*/Object[] MethodArguments = new Object[Params.length-1];
			LibGreenTea.ArrayCopy(Params, 1, MethodArguments, 0, MethodArguments.length);
			return LibNative.ApplyMethod(Func, Params[0], MethodArguments);
		}
		return LibNative.ApplyMethod(Func, null, Params);
	}

	public static Object InvokeOverridedMethod(long FileLine, GtNameSpace NameSpace, GtFunc Func, Object[] Arguments) {
		/*local*/GtType ClassType = GtStaticTable.GuessType(Arguments[0]);
		Func = NameSpace.GetOverridedMethod(ClassType, Func);
		return LibGreenTea.InvokeFunc(Func, Arguments);
	}

	public static Object InvokeDynamicFunc(long FileLine, GtType ContextType, GtNameSpace NameSpace, String FuncName, Object[] Arguments) {
		/*local*/GtPolyFunc PolyFunc = NameSpace.GetPolyFunc(FuncName);
		/*local*/GtFunc Func = PolyFunc.GetMatchedFunc(NameSpace, Arguments);
		/*local*/Object Value = ContextType.DefaultNullValue;
		if(Func != null) {
			Value = LibGreenTea.InvokeFunc(Func, Arguments);
			return LibGreenTea.DynamicCast(ContextType, Value);
		}
		LibGreenTea.VerboseLog(VerboseRuntime, PolyFunc.FormatTypeErrorMessage("function", null, FuncName));
		return Value;
	}

	public static final Object InvokeDynamicMethod(long FileLine, GtType ContextType, GtNameSpace NameSpace, String FuncName, Object[] Arguments) {
		/*local*/GtType ClassType = GtStaticTable.GuessType(Arguments[0]);
		/*local*/GtPolyFunc PolyFunc = NameSpace.GetMethod(ClassType, FuncName, true);
		/*local*/GtFunc Func = PolyFunc.GetMatchedFunc(NameSpace, Arguments);
		/*local*/Object Value = ContextType.DefaultNullValue;
		if(Func != null) {
			Value = LibGreenTea.InvokeFunc(Func, Arguments);
			return LibGreenTea.DynamicCast(ContextType, Value);
		}
		LibGreenTea.VerboseLog(VerboseRuntime, PolyFunc.FormatTypeErrorMessage("method", ClassType, FuncName));
		return Value;
	}
	
	public static Object DynamicGetter(Object RecvObject, String FieldName) {
		try {
			Field JavaField = RecvObject.getClass().getField(FieldName);
			return JavaField.get(RecvObject);
		} catch (Exception e) {
			LibGreenTea.VerboseException(e);
		}
		return null;
	}

	public static Object DynamicSetter(Object RecvObject, String FieldName, Object Value) {
		try {
			Field JavaField = RecvObject.getClass().getField(FieldName);
			JavaField.set(RecvObject, Value);
			return JavaField.get(RecvObject);
		} catch (Exception e) {
			LibGreenTea.VerboseException(e);
		}
		return null;
	}
		
	public final static String GetPlatform() {
		return "Java JVM-" + System.getProperty("java.version");
	}

	public static boolean DebugMode = false;

	private final static String GetStackInfo(int depth) {
		String LineNumber = " ";
		Exception e =  new Exception();
		StackTraceElement[] Elements = e.getStackTrace();
		if(depth < Elements.length) {
			StackTraceElement elem = Elements[depth];
			LineNumber += elem;
		}
		return LineNumber;
	}

	public final static void TODO(String msg) {
		LibGreenTea.println("TODO" + LibGreenTea.GetStackInfo(2) + ": " + msg);
	}

	public final static void DebugP(String msg) {
		if(LibGreenTea.DebugMode) {
			LibGreenTea.println("DEBUG" + LibGreenTea.GetStackInfo(2) + ": " + msg);
		}
	}

	public static int VerboseMask = GreenTeaUtils.VerboseUndefined | GreenTeaUtils.VerboseException;

	public final static void VerboseLog(int VerboseFlag, String Message) {
		if((LibGreenTea.VerboseMask & VerboseFlag) == VerboseFlag) {
			LibGreenTea.println("GreenTea: " + Message);
		}
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
		LibGreenTea.VerboseLog(GreenTeaUtils.VerboseException, e.toString());
		e.printStackTrace();
		if(e instanceof IllegalArgumentException) {
			LibGreenTea.Exit(1, e.toString());
		}
		
	}

	public final static void Exit(int status, String Message) {
		System.err.println(Message);
		System.exit(1);
	}

	private static int ParserCount = -1;

	public static int NewParserId() {
		ParserCount++;
		return ParserCount;
	}

	public final static char CharAt(String Text, long Pos) {
		if(Pos < Text.length()) {
			return Text.charAt((int)Pos);
		}
		return 0;
	}

	public final static String SubString(String Text, long StartIdx, long EndIdx) {
		return Text.substring((int)StartIdx, (int)EndIdx);
	}

	public final static boolean IsWhitespace(String Text, long Pos) {
		char ch = LibGreenTea.CharAt(Text, Pos);
		return Character.isWhitespace(ch);
	}

	public final static boolean IsLetter(String Text, long Pos) {
		char ch = LibGreenTea.CharAt(Text, Pos);
		return Character.isLetter(ch);
	}

	public final static boolean IsDigit(String Text, long Pos) {
		char ch = LibGreenTea.CharAt(Text, Pos);
		return Character.isDigit(ch);
	}

	public final static boolean IsVariableName(String Text, long Pos) {
		char ch = LibGreenTea.CharAt(Text, Pos);
		return Character.isLetter(ch) || ch == '_' || ch > 255;
	}

	public final static int CheckBraceLevel(String Text) {
		int level = 0;
		for(int i = 0; i < Text.length(); i++) {
			char ch = Text.charAt(i);
			if(ch == '{' || ch == '[') {
				level++;
			}
			if(ch == '}' || ch == ']') {
				level--;
			}
		}
		return level;
	}

	public final static String CharToString(char code) {
		return Character.toString(code);
	}

	public static final String UnquoteString(String Text) {
		StringBuilder sb = new StringBuilder();
		/*local*/char quote = LibGreenTea.CharAt(Text, 0);
		/*local*/int i = 0;
		/*local*/int Length = Text.length();
		if(quote == '"' || quote == '\'') {
			i = 1;
			Length -= 1;
		}
		else {
			quote = '\0';
		}
		while(i < Length) {
			/*local*/char ch = LibGreenTea.CharAt(Text, i);
			if(ch == '\\') {
				i = i + 1;
				char next = LibGreenTea.CharAt(Text, i);
				switch (next) {
				case 't':
					ch = '\t';
					break;
				case 'n':
					ch = '\n';
					break;
				case '"':
					ch = '"';
					break;
				case '\'':
					ch = '\'';
					break;
				case '\\':
					ch = '\\';
					break;
				default:
					ch = next;
					break;
				}
				i = i + 1;
			}
			sb.append(ch);
			i = i + 1;
		}
		return sb.toString();
	}

	public static final String QuoteString(String Text) {
		StringBuilder sb = new StringBuilder();
		sb.append('"');
		/*local*/int i = 0;
		while(i < Text.length()) {
			/*local*/char ch = LibGreenTea.CharAt(Text, i);
			if(ch == '\n') {
				sb.append("\\n");
			}
			else if(ch == '\t') {
				sb.append("\\t");
			}
			else if(ch == '"') {
				sb.append("\\\"");
			}
			else if(ch == '\\') {
				sb.append("\\\\");
			}
			else {
				sb.append(ch);
			}
			i = i + 1;
		}
		sb.append('"');
		return sb.toString();
	}

	public final static String Stringify(Object Value) {
		if(Value == null) {
			return "null";
		}
		else if(Value instanceof String) {
			return LibGreenTea.QuoteString(Value.toString());
		}
		else {
			return Value.toString();
		}
	}

	public final static String StringifyField(Object Value) {
		/*local*/String s = "{";
		Field[] Fields = Value.getClass().getFields();
		for(int i = 0; i < Fields.length; i++) {
			if(Modifier.isPublic(Fields[i].getModifiers())) {
				if(i > 0) {
					s += ", ";
				}
				try {
					s += Fields[i].getName() + ": ";
					s += LibGreenTea.Stringify(Fields[i].get(Value));
				} catch (IllegalArgumentException e) {
				} catch (IllegalAccessException e) {
				}
			}
		}
		return s + "}";
	}

	public final static boolean EqualsString(String s, String s2) {
		return s.equals(s2);
	}

	public final static long ParseInt(String Text) {
		try {
			return Long.parseLong(Text);
		}
		catch(NumberFormatException e) {
			LibGreenTea.VerboseException(e);
		}
		return 0L;
	}

	public final static double ParseFloat(String Text) {
		try {
			return Double.parseDouble(Text);
		}
		catch(NumberFormatException e) {
			LibGreenTea.VerboseException(e);
		}
		return 0.0;
	}	

	public final static void ArrayCopy(Object src, int srcPos, Object dest, int destPos, int length) {
		System.arraycopy(src, srcPos, dest, destPos, length);
	}

	public final static GtFunc SetNativeMethod(GtFunc NativeFunc, Method JavaMethod) {
		/*local*/int FuncFlag = GreenTeaUtils.NativeFunc;
		if(!Modifier.isStatic(JavaMethod.getModifiers())) {
			FuncFlag |= GreenTeaUtils.NativeMethodFunc;
		}
		NativeFunc.SetNativeMethod(FuncFlag, JavaMethod);
		return NativeFunc;
	}

	public final static GtFunc ConvertNativeMethodToFunc(GtParserContext Context, Method JavaMethod) {
		/*local*/ArrayList<GtType> TypeList = new ArrayList<GtType>();
		TypeList.add(LibNative.GetNativeType(JavaMethod.getReturnType()));
		if(!Modifier.isStatic(JavaMethod.getModifiers())) {
			TypeList.add(LibNative.GetNativeType(JavaMethod.getDeclaringClass()));
		}
		/*local*/Class<?>[] ParamTypes = JavaMethod.getParameterTypes();
		if(ParamTypes != null) {
			for(int j = 0; j < ParamTypes.length; j++) {
				TypeList.add(LibNative.GetNativeType(ParamTypes[j]));
			}
		}
		return SetNativeMethod(new GtFunc(0, JavaMethod.getName(), 0, TypeList), JavaMethod);
	}

	
	public final static void LoadNativeConstructors(GtParserContext Context, GtType ClassType, ArrayList<GtFunc> FuncList) {
		LibNative.LoadNativeConstructors(Context, ClassType, FuncList);
	}
	
	public final static GtFunc LoadNativeField(GtParserContext Context, GtType ClassType, String FieldName, boolean GetSetter) {
		return LibNative.LoadNativeField(Context, ClassType, FieldName, GetSetter);
	}

	public final static void LoadNativeMethods(GtParserContext Context, GtType ClassType, String FuncName, ArrayList<GtFunc> FuncList) {
		LibNative.LoadNativeMethods(Context, ClassType, FuncName, FuncList);
	}

	public static Object NativeFieldGetter(Object ObjectValue, Field NativeField) {
		try {
//			Class<?> NativeType = NativeField.getType();
			return NativeField.get(ObjectValue);
		} catch (IllegalAccessException e) {
			LibGreenTea.VerboseException(e);
		} catch (SecurityException e) {
			LibGreenTea.VerboseException(e);
		}
		return null;
	}

	public static Object NativeFieldSetter(Object ObjectValue, Field NativeField, Object Value) {
		try {
			NativeField.set(ObjectValue, Value);
		} catch (IllegalAccessException e) {
			LibGreenTea.VerboseException(e);
		} catch (SecurityException e) {
			LibGreenTea.VerboseException(e);
		}
		return Value;
	}


	public final static Method LookupNativeMethod(Object Callee, String FuncName) {
		if(FuncName != null) {
			// LibGreenTea.DebugP("looking up method : " + Callee.getClass().getSimpleName() + "." + FuncName);
			Method[] methods = Callee.getClass().getMethods();
			for(int i = 0; i < methods.length; i++) {
				if(FuncName.equals(methods[i].getName())) {
					return methods[i];
				}
			}
			LibGreenTea.VerboseLog(GreenTeaUtils.VerboseUndefined, "undefined method: " + Callee.getClass().getSimpleName() + "." + FuncName);
		}
		return null;
	}




	public final static int ListSize(ArrayList<?> List) {
		if(List == null) {
			return 0;
		}
		return List.size();
	}

	public final static GtType[] CompactTypeList(int BaseIndex, ArrayList<GtType> List) {
		GtType[] Tuple = new GtType[List.size() - BaseIndex];
		for(int i = BaseIndex; i < List.size(); i++) {
			Tuple[i] = List.get(i);
		}
		return Tuple;
	}

	public final static String[] CompactStringList(ArrayList<String> List) {
		if(List == null) {
			return null;
		}
		String[] Tuple = new String[List.size()];
		for(int i = 0; i < List.size(); i++) {
			Tuple[i] = List.get(i);
		}
		return Tuple;
	}

	public static void RetrieveMapKeys(GtMap Map, String Prefix, ArrayList<String> List) {
		/*local*/Iterator<String> itr = Map.Map.keySet().iterator();
		/*local*/int i = 0;
		while(itr.hasNext()) {
			String Key = itr.next();
			if(Prefix != null && !Key.startsWith(Prefix)) {
				continue;
			}
			List.add(Key);
			i = i + 1;
		}
	}

	public final static void Usage(String Message) {
		System.out.println("greentea usage :");
		System.out.println("  --lang|-l LANG        Set Target Language");
		System.out.println("      bash                Bash");
		System.out.println("      C C99               C99");
		System.out.println("      CSharp              CSharp");
		System.out.println("      java java7 java8    Java");
		System.out.println("      javascript js       JavaScript");
		System.out.println("      lua                 Lua");
		System.out.println("      haxe                Haxe");
		System.out.println("      ocaml               OCaml");
		System.out.println("      perl                Perl");
		System.out.println("      python              Python");
		System.out.println("      R                   R");
		System.out.println("      ruby                Ruby");
		System.out.println("      typescript ts       TypeScript");
		System.out.println("");
		System.out.println("  --out|-o  FILE        Output filename");
		System.out.println("  --eval|-e EXPR        Program passed in as string");
		System.out.println("  --require|-r LIBRARY     Load the library");
		System.out.println("  --verbose             Printing Debug infomation");
		System.out.println("     --verbose:token      adding token info");
		System.out.println("     --verbose:type       adding type info");
		System.out.println("     --verbose:symbol     adding symbol info");
		System.out.println("     --verbose:native     adding native class info");
		System.out.println("     --verbose:all        adding all info");
		System.out.println("     --verbose:no         no log");
		LibGreenTea.Exit(0, Message);
	}

	public final static String DetectTargetCode(String Extension, String TargetCode) {
		if(Extension.endsWith(".js")) {
			return "js";
		}
		else if(Extension.endsWith(".pl")) {
			return "perl";
		}
		else if(Extension.endsWith(".py")) {
			return "python";
		}
		else if(Extension.endsWith(".sh")) {
			return "bash";
		}
		else if(Extension.endsWith(".scala")) {
			return "scala";
		}
		else if(Extension.endsWith(".cs")) {
			return "cs";
		}
		else if(TargetCode.startsWith("X")) {
			return "exe";
		}
		else if(Extension.endsWith(".c")) {
			return "c";
		}
		return TargetCode;
	}

	public final static GtGenerator CodeGenerator(String TargetCode, String OutputFile, int GeneratorFlag) {
		String Extension = (OutputFile == null) ? "-" : OutputFile;
		TargetCode = DetectTargetCode(Extension, TargetCode);
		TargetCode = TargetCode.toLowerCase();
		if(TargetCode.startsWith("js") || TargetCode.startsWith("javascript")) {
			return new JavaScriptSourceGenerator(TargetCode, OutputFile, GeneratorFlag);
		}
		else if(TargetCode.startsWith("pl") || TargetCode.startsWith("perl")) {
			return new PerlSourceGenerator(TargetCode, OutputFile, GeneratorFlag);
		}
		else if(TargetCode.startsWith("python")) {
			return new PythonSourceGenerator(TargetCode, OutputFile, GeneratorFlag);
		}
		else if(TargetCode.startsWith("bash")) {
			return new BashSourceGenerator(TargetCode, OutputFile, GeneratorFlag);
		}
		else if(TargetCode.startsWith("scala")) {
			return new ScalaSourceGenerator(TargetCode, OutputFile, GeneratorFlag);
		}
		// FIXME CSharpSourceCodeGenerator.java is missing.
		//else if(TargetCode.startsWith("csharp")) {
		//	return new CSharpSourceCodeGenerator(TargetCode, OutputFile, GeneratorFlag);
		//}
		else if(TargetCode.startsWith("exe")) {
			return new JavaByteCodeGenerator(TargetCode, OutputFile, GeneratorFlag);
		}
		else if(TargetCode.startsWith("c")) {
			return new CSourceGenerator(TargetCode, OutputFile, GeneratorFlag);
		}
		else if(TargetCode.startsWith("lisp")) {
			return new CommonLispSourceGenerator(TargetCode, OutputFile, GeneratorFlag);
		}
		else if(TargetCode.startsWith("minikonoha")) {
			return new MiniKonohaSourceGenerator(TargetCode, OutputFile, GeneratorFlag);
		}
		return null;
	}

	@Deprecated public final static void WriteCode(String OutputFile, String SourceCode) {
		if(OutputFile == null) {
			//LibGreenTea.Eval(SourceCode);
		}
		if(OutputFile.equals("-")) {
			System.out.println(SourceCode);
			System.out.flush();
		}
		else {
			Writer out = null;
			try {
				out = new FileWriter(OutputFile);
				out.write(SourceCode);
				out.flush();
				out.close();
			} catch (IOException e) {
				System.err.println("Cannot write: " + OutputFile);
				System.exit(1);
			}
		}
	}

	public final static void WriteSource(String OutputFile, ArrayList<GtSourceBuilder> SourceList) {
		try {
			PrintStream Stream = null;
			if(OutputFile.equals("-")) {
				Stream = System.out;
				Stream.flush();				
			}
			else {
				Stream = new PrintStream(OutputFile);
			}
			for(GtSourceBuilder Builder : SourceList) {
				for(String Source : Builder.SourceList) {
					Stream.print(Source);
				}
				Stream.println();
			}
			Stream.flush();
			if(Stream != System.out) {
				Stream.close();
			}
		} catch (IOException e) {
			System.err.println("Cannot write: " + OutputFile);
			System.exit(1);
		}
	}

	private static java.io.Console Console = null;
	private static java.io.BufferedReader Reader = null;
	private static boolean ConsoleInitialized = false;
	
	static private String ReadLine(String format, Object... args) {
		if(!ConsoleInitialized){
			Console = System.console();
			if (Console == null) {
				Reader = new BufferedReader(new InputStreamReader(System.in));
			}
			ConsoleInitialized = true;
		}
		if (Console != null) {
			return System.console().readLine(format, args);
		}
		System.out.print(String.format(format, args));
		try {
			return Reader.readLine();
		}
		catch (IOException e) {
			e.printStackTrace();
			return "";
		}
	}

	public final static String ReadLine(String Prompt, String Prompt2) {
		String Line = LibGreenTea.ReadLine(Prompt);
		if(Line == null) {
			System.exit(0);
		}
		if(Prompt2 != null) {
			int level = 0;
			while((level = LibGreenTea.CheckBraceLevel(Line)) > 0) {
				String Line2 = LibGreenTea.ReadLine(Prompt2 + GreenTeaUtils.JoinStrings("  ", level));
				Line += "\n" + Line2; 
			}
			if(level < 0) {
				Line = "";
				LibGreenTea.println(" .. canceled");
			}
		}
		return Line;
	}

	private static jline.console.ConsoleReader ConsoleReader = null;

	public final static String ReadLine2(String Prompt, String Prompt2) {
		if(ConsoleReader == null) {
			try {
				ConsoleReader = new jline.console.ConsoleReader();
				ConsoleReader.setExpandEvents(false);
			}
			catch (IOException e) {
				throw new RuntimeException(e);
			}
		}
		String Line;
		try {
			Line = ConsoleReader.readLine(Prompt);
		}
		catch (IOException e) {
			throw new RuntimeException(e);
		}
		if(Line == null) {
			System.exit(0);
		}
		if(Prompt2 != null) {
			int level = 0;
			while((level = LibGreenTea.CheckBraceLevel(Line)) > 0) {
				String Line2;
				try {
					Line2 = ConsoleReader.readLine(Prompt2);
					//Line2 = ConsoleReader.readLine(Prompt2 + GreenTeaUtils.JoinStrings("  ", level));
				}
				catch (IOException e) {
					throw new RuntimeException(e);
				}
				Line += "\n" + Line2;
			}
			if(level < 0) {
				Line = "";
				LibGreenTea.println(" .. canceled");
			}
		}
		ConsoleReader.getHistory().add((CharSequence)Line);
		return Line;
	}

	public final static boolean HasFile(String Path) {
		if(LibGreenTea.class.getResource(Path) != null) {
			return true;
		}
		return new File(Path).exists();
	}

	public final static boolean IsSupportedTarget(String TargetCode) {
		return HasFile(GetLibPath(TargetCode, "common"));
	}

	public final static String GetLibPath(String TargetCode, String LibName) {
		return "lib/" + TargetCode + "/" + LibName + ".green";
	}

	private final static String FormatFilePath(String FileName) {
		String Path = FileName;
		if(HasFile(Path)) {
			return Path;
		}
		String Home = System.getProperty("GREENTEA_HOME");
		if(Home != null) {
			Path = Home + FileName;
		}
		if(HasFile(Path)) {
			return Path;
		}
		return FileName;
	}

	public final static String LoadFile2(String FileName) {
		LibGreenTea.VerboseLog(GreenTeaUtils.VerboseFile, "loading " + FileName);
		InputStream Stream = LibGreenTea.class.getResourceAsStream("/" + FileName);
		if(Stream == null) {
			File f = new File(FormatFilePath(FileName));
			try {
				Stream = new FileInputStream(f);
			} catch (FileNotFoundException e) {
				return null;
			}
		}
		BufferedReader reader = new BufferedReader(new InputStreamReader(Stream));
		String buffer = "";
		try {
			int buflen = 4096;
			int readed = 0;
			char[] buf = new char[buflen];
			StringBuilder builder = new StringBuilder();
			while((readed = reader.read(buf, 0, buflen)) >= 0) {
				builder.append(buf, 0, readed);
			}
			buffer = builder.toString();
		} catch (IOException e) {
			return null;
		}
		return buffer;
	}

	public static long JoinIntId(int UpperId, int LowerId) {
		long id = UpperId;
		id = (id << 32) + LowerId;
		return id;
	}

	public static int UpperId(long FileLine) {
		return (int)(FileLine >> 32);
	}

	public static int LowerId(long FileLine) {
		return (int)FileLine;
	}

	
	public static boolean booleanValue(Object Value) {
		return ((Boolean)Value).booleanValue();
	}
	
	public static Object DynamicCast(GtType CastType, Object Value) {
		if(Value != null) {
			GtType FromType = GtStaticTable.GuessType(Value);
			if(CastType == FromType || CastType.Accept(FromType)) {
				return Value;
			}
		}
		return null;
	}

	public static boolean DynamicInstanceOf(Object Value, GtType Type) {
		if(Value != null) {
			GtType ValueType = GtStaticTable.GuessType(Value);
			if(ValueType == Type || Type.Accept(ValueType)) {
				return true;
			}
		}
		return false;
	}

	public final static Object DynamicConvertTo(GtType CastType, Object Value) {
		if(Value != null) {
			GtType ValueType = GtStaticTable.GuessType(Value);
			if(ValueType == CastType || CastType.Accept(ValueType)) {
				return Value;
			}
			GtFunc Func = GtStaticTable.GetConverterFunc(ValueType, CastType, true);
			if(Func != null) {
				Object[] Argvs = new Object[2];
				Argvs[0] = CastType;
				Argvs[1] = Value;
				return LibNative.ApplyMethod(Func, null, Argvs);
			}
		}
		return null;
	}
	
	public static Object EvalUnary(GtType Type, String Operator, Object Value) {
		if(Value instanceof Boolean) {
			if(Operator.equals("!") || Operator.equals("not")) {
				return DynamicCast(Type, !((Boolean)Value).booleanValue());
			}
			return null;
		}
		if(Value instanceof Long || Value instanceof Integer  || Value instanceof Short) {
			if(Operator.equals("-")) {
				return DynamicCast(Type, -((Number)Value).longValue());
			}
			if(Operator.equals("+")) {
				return DynamicCast(Type, +((Number)Value).longValue());
			}
			if(Operator.equals("~")) {
				return DynamicCast(Type, ~((Number)Value).longValue());
			}
			return null;
		}
		return null;
	}

	public static Object EvalSuffix(GtType Type, Object Value, String Operator) {
		return null;
	}

	public static Object EvalBinary(GtType Type, Object LeftValue, String Operator, Object RightValue) {
		//System.err.println("***" + LeftValue.getClass() + ", " + RightValue.getClass());
		if(LeftValue == null || RightValue == null) {
			return null;
		}
		if(LeftValue instanceof String || RightValue instanceof String) {
			String left = DynamicCast(GtStaticTable.StringType, LeftValue).toString();
			String right = DynamicCast(GtStaticTable.StringType, RightValue).toString();
			if(Operator.equals("+")) {
				return  DynamicCast(Type, left + right);
			}
		}
		if(LeftValue instanceof String && RightValue instanceof String) {
			String left = DynamicCast(GtStaticTable.StringType, LeftValue).toString();
			String right = DynamicCast(GtStaticTable.StringType, RightValue).toString();
			if(Operator.equals("==")) {
				return  DynamicCast(Type, left.equals(right));
			}
			if(Operator.equals("!=")) {
				return DynamicCast(Type, !left.equals(right));
			}
			if(Operator.equals("<")) {
				return DynamicCast(Type, left.compareTo(right) < 0);
			}
			if(Operator.equals("<=")) {
				return DynamicCast(Type, left.compareTo(right) <= 0);
			}
			if(Operator.equals(">")) {
				return DynamicCast(Type, left.compareTo(right) > 0);
			}
			if(Operator.equals(">=")) {
				return DynamicCast(Type, left.compareTo(right) >= 0);
			}
			return null;
		}
		if(LeftValue instanceof Double || LeftValue instanceof Float || RightValue instanceof Double || RightValue instanceof Float) {
			try {
				double left = ((Number)LeftValue).doubleValue();
				double right = ((Number)RightValue).doubleValue();
				if(Operator.equals("+")) {
					return DynamicCast(Type, left + right);
				}
				if(Operator.equals("-")) {
					return DynamicCast(Type, left - right);
				}
				if(Operator.equals("*")) {
					return DynamicCast(Type, left * right);
				}
				if(Operator.equals("/")) {
					return DynamicCast(Type, left / right);
				}
				if(Operator.equals("%") || Operator.equals("mod")) {
					return DynamicCast(Type, left % right);
				}
				if(Operator.equals("==")) {
					return DynamicCast(Type, left == right);
				}
				if(Operator.equals("!=")) {
					return DynamicCast(Type, left != right);
				}
				if(Operator.equals("<")) {
					return DynamicCast(Type, left < right);
				}
				if(Operator.equals("<=")) {
					return DynamicCast(Type, left <= right);
				}
				if(Operator.equals(">")) {
					return DynamicCast(Type, left > right);
				}
				if(Operator.equals(">=")) {
					return DynamicCast(Type, left >= right);
				}
			}
			catch(ClassCastException e) {
			}
			return null;
		}
		if(LeftValue instanceof Boolean && RightValue instanceof Boolean) {
			boolean left = (Boolean)LeftValue;
			boolean right = (Boolean)RightValue;
			if(Operator.equals("==")) {
				return DynamicCast(Type, left == right);
			}
			if(Operator.equals("!=")) {
				return DynamicCast(Type, left != right);
			}
			return null;
		}
		try {
			long left = ((Number)LeftValue).longValue();
			long right = ((Number)RightValue).longValue();
			if(Operator.equals("+")) {
				return DynamicCast(Type, left + right);
			}
			if(Operator.equals("-")) {
				return DynamicCast(Type, left - right);
			}
			if(Operator.equals("*")) {
				return DynamicCast(Type, left * right);
			}
			if(Operator.equals("/")) {
				return DynamicCast(Type, left / right);
			}
			if(Operator.equals("%") || Operator.equals("mod")) {
				return DynamicCast(Type, left % right);
			}
			if(Operator.equals("==")) {
				return DynamicCast(Type, left == right);
			}
			if(Operator.equals("!=")) {
				return DynamicCast(Type, left != right);
			}
			if(Operator.equals("<")) {
				return DynamicCast(Type, left < right);
			}
			if(Operator.equals("<=")) {
				return DynamicCast(Type, left <= right);
			}
			if(Operator.equals(">")) {
				return DynamicCast(Type, left > right);
			}
			if(Operator.equals(">=")) {
				return DynamicCast(Type, left >= right);
			}
			if(Operator.equals("|")) {
				return DynamicCast(Type, left | right);
			}
			if(Operator.equals("&")) {
				return DynamicCast(Type, left & right);
			}
			if(Operator.equals("<<")) {
				return DynamicCast(Type, left << right);
			}
			if(Operator.equals(">>")) {
				return DynamicCast(Type, left >> right);
			}
			if(Operator.equals("^")) {
				return DynamicCast(Type, left ^ right);
			}
		}
		catch(ClassCastException e) {
		}
		return null;
	}

	public static boolean ImportMethodToFunc(GtFunc Func, String FullName) {
		Method JavaMethod = LibNative.ImportMethod(Func.GetFuncType(), FullName, false);
		if(JavaMethod != null) {
			LibGreenTea.SetNativeMethod(Func, JavaMethod);
			if(Func.GetReturnType().IsVarType()) {
				Func.SetReturnType(LibNative.GetNativeType(JavaMethod.getReturnType()));
			}
			int StartIdx = Func.Is(GreenTeaUtils.NativeMethodFunc) ? 2 : 1;
			Class<?>[] p = JavaMethod.getParameterTypes();
			for(int i = 0; i < p.length; i++) {
				if(Func.Types[StartIdx + i].IsVarType()) {
					Func.Types[StartIdx + i] = LibNative.GetNativeType(p[i]);
					Func.FuncType = null; // reset
				}
			}
			return true;
		}
		return false;
	}

	public static void PrintStackTrace(Exception e, int linenum) {
		/*local*/StackTraceElement[] elements = e.getStackTrace();
		/*local*/int size = elements.length + 1;
		/*local*/StackTraceElement[] newElements = new StackTraceElement[size];
		for(/*local*/int i = 0; i < size; i++) {
			if(i == size - 1) {
				newElements[i] = new StackTraceElement("<TopLevel>", "TopLevelEval", "stdin", linenum);
				break;
			}
			newElements[i] = elements[i];
		}
		e.setStackTrace(newElements);
		e.printStackTrace();
	}

	public static String SourceBuilderToString(GtSourceBuilder Builder) {
		StringBuilder builder = new StringBuilder();
		for(String s : Builder.SourceList){
			builder.append(s);
		}
		return builder.toString();
	}
//	public static Object EvalGetter(GtType Type, Object Value, String FieldName) {
//		// TODO Auto-generated method stub
//		return null;
//	}

}
