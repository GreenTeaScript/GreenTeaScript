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

// LangBase is a language-dependent code used in GreenTea.java

package zen.deps;
import java.io.BufferedReader;
import java.io.File;
import java.io.FileWriter;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.PrintStream;
import java.io.Writer;
import java.lang.reflect.Field;
import java.lang.reflect.Method;
import java.lang.reflect.Modifier;
import java.util.ArrayList;
import java.util.Iterator;

import zen.lang.ZenType;
import zen.parser.GtSourceBuilder;
import zen.parser.ZenLogger;
import zen.parser.ZenUtils;

public abstract class LibZen {
	public final static ZenArray NewArray(ZenType Type, Object[] InitSizes) {
		if(InitSizes.length == 1) {
			return ZenArray.NewArray1(Type.GetParamType(0), ((Number)InitSizes[0]).intValue());
		}
		else if(InitSizes.length == 2) {
			return ZenArray.NewArray2(Type.GetParamType(0).GetParamType(0), ((Number)InitSizes[0]).intValue(), ((Number)InitSizes[1]).intValue());
		}
		else {
			return ZenArray.NewArray3(Type.GetParamType(0).GetParamType(0).GetParamType(0), ((Number)InitSizes[0]).intValue(), ((Number)InitSizes[1]).intValue(), ((Number)InitSizes[2]).intValue());
		}
		
	}

	public final static ZenArray NewNewArray(ZenType ArrayType, Object[] Values) {
		return ZenArray.NewNewArray(ArrayType, Values);		
	}
	

//	public static Object InvokeOverridedMethod(long FileLine, GtNameSpace NameSpace, GtFunc Func, Object[] Arguments) {
//		/*local*/GtType ClassType = GtStaticTable.GuessType(Arguments[0]);
//		Func = NameSpace.GetOverridedMethod(ClassType, Func);
//		return LibZen.InvokeFunc(Func, Arguments);
//	}
//
//	public static Object InvokeDynamicFunc(long FileLine, GtType ContextType, GtNameSpace NameSpace, String FuncName, Object[] Arguments) {
//		/*local*/GtPolyFunc PolyFunc = NameSpace.GetPolyFunc(FuncName);
//		/*local*/GtFunc Func = PolyFunc.GetMatchedFunc(NameSpace, Arguments);
//		/*local*/Object Value = ContextType.DefaultNullValue;
//		if(Func != null) {
//			Value = LibZen.InvokeFunc(Func, Arguments);
//			return LibZen.DynamicCast(ContextType, Value);
//		}
//		LibZen.VerboseLog(VerboseRuntime, PolyFunc.FormatTypeErrorMessage("function", null, FuncName));
//		return Value;
//	}
//
//	public static final Object InvokeDynamicMethod(long FileLine, GtType ContextType, GtNameSpace NameSpace, String FuncName, Object[] Arguments) {
//		/*local*/GtType ClassType = GtStaticTable.GuessType(Arguments[0]);
//		/*local*/GtPolyFunc PolyFunc = NameSpace.GetMethod(ClassType, FuncName, true);
//		/*local*/GtFunc Func = PolyFunc.GetMatchedFunc(NameSpace, Arguments);
//		/*local*/Object Value = ContextType.DefaultNullValue;
//		if(Func != null) {
//			Value = LibZen.InvokeFunc(Func, Arguments);
//			return LibZen.DynamicCast(ContextType, Value);
//		}
//		LibZen.VerboseLog(VerboseRuntime, PolyFunc.FormatTypeErrorMessage("method", ClassType, FuncName));
//		return Value;
//	}
//	
//	public static Object DynamicGetter(Object RecvObject, String FieldName) {
//		try {
//			Field JavaField = RecvObject.getClass().getField(FieldName);
//			return JavaField.get(RecvObject);
//		} catch (Exception e) {
//			LibZen.VerboseException(e);
//		}
//		return null;
//	}
//
//	public static Object DynamicSetter(Object RecvObject, String FieldName, Object Value) {
//		try {
//			Field JavaField = RecvObject.getClass().getField(FieldName);
//			JavaField.set(RecvObject, Value);
//			return JavaField.get(RecvObject);
//		} catch (Exception e) {
//			LibZen.VerboseException(e);
//		}
//		return null;
//	}
		
	public final static String GetPlatform() {
		return "Java JVM-" + System.getProperty("java.version");
	}

	public static boolean DebugMode = false;

	public final static String GetStackInfo(int depth) {
		String LineNumber = " ";
		Exception e =  new Exception();
		StackTraceElement[] Elements = e.getStackTrace();
		if(depth < Elements.length) {
			StackTraceElement elem = Elements[depth];
			LineNumber += elem;
		}
		return LineNumber;
	}

	public final static void DebugP(String msg) {
//		if(LibZen.DebugMode) {
			LibNative.println("DEBUG " + LibZen.GetStackInfo(2) + ": " + msg);
//		}
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
		char ch = LibZen.CharAt(Text, Pos);
		return Character.isWhitespace(ch);
	}

	public final static boolean IsLetter(String Text, long Pos) {
		char ch = LibZen.CharAt(Text, Pos);
		return Character.isLetter(ch);
	}

	public final static boolean IsDigit(String Text, long Pos) {
		char ch = LibZen.CharAt(Text, Pos);
		return Character.isDigit(ch);
	}

	public final static boolean IsVariableName(String Text, long Pos) {
		char ch = LibZen.CharAt(Text, Pos);
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
		/*local*/char quote = LibZen.CharAt(Text, 0);
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
			/*local*/char ch = LibZen.CharAt(Text, i);
			if(ch == '\\') {
				i = i + 1;
				char next = LibZen.CharAt(Text, i);
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
			/*local*/char ch = LibZen.CharAt(Text, i);
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
			return LibZen.QuoteString(Value.toString());
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
					s += LibZen.Stringify(Fields[i].get(Value));
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
			ZenLogger.VerboseException(e);
		}
		return 0L;
	}

	public final static double ParseFloat(String Text) {
		try {
			return Double.parseDouble(Text);
		}
		catch(NumberFormatException e) {
			ZenLogger.VerboseException(e);
		}
		return 0.0;
	}	

	public final static void ArrayCopy(Object src, int srcPos, Object dest, int destPos, int length) {
		System.arraycopy(src, srcPos, dest, destPos, length);
	}

//	public final static ZenFunc SetNativeMethod(ZenFunc NativeFunc, Method JavaMethod) {
//		/*local*/int FuncFlag = ZenUtils.NativeFunc;
//		if(!Modifier.isStatic(JavaMethod.getModifiers())) {
//			FuncFlag |= ZenUtils.NativeMethodFunc;
//		}
//		NativeFunc.SetNativeMethod(FuncFlag, JavaMethod);
//		return NativeFunc;
//	}
//
	
//	public final static void LoadNativeConstructors(GtParserContext Context, GtType ClassType, ArrayList<GtFunc> FuncList) {
//		LibNative.LoadNativeConstructors(Context, ClassType, FuncList);
//	}
//	
//	public final static GtFunc LoadNativeField(GtParserContext Context, GtType ClassType, String FieldName, boolean GetSetter) {
//		return LibNative.LoadNativeField(Context, ClassType, FieldName, GetSetter);
//	}
//
//	public final static void LoadNativeMethods(GtParserContext Context, GtType ClassType, String FuncName, ArrayList<GtFunc> FuncList) {
//		LibNative.LoadNativeMethods(Context, ClassType, FuncName, FuncList);
//	}

	public static Object NativeFieldGetter(Object ObjectValue, Field NativeField) {
		try {
//			Class<?> NativeType = NativeField.getType();
			return NativeField.get(ObjectValue);
		} catch (IllegalAccessException e) {
			ZenLogger.VerboseException(e);
		} catch (SecurityException e) {
			ZenLogger.VerboseException(e);
		}
		return null;
	}

	public static Object NativeFieldSetter(Object ObjectValue, Field NativeField, Object Value) {
		try {
			NativeField.set(ObjectValue, Value);
		} catch (IllegalAccessException e) {
			ZenLogger.VerboseException(e);
		} catch (SecurityException e) {
			ZenLogger.VerboseException(e);
		}
		return Value;
	}


	public final static Method LookupNativeMethod(Object Callee, String FuncName) {
		if(FuncName != null) {
			// LibZen.DebugP("looking up method : " + Callee.getClass().getSimpleName() + "." + FuncName);
			Method[] methods = Callee.getClass().getMethods();
			for(int i = 0; i < methods.length; i++) {
				if(FuncName.equals(methods[i].getName())) {
					return methods[i];
				}
			}
			ZenLogger.VerboseLog(ZenLogger.VerboseUndefined, "undefined method: " + Callee.getClass().getSimpleName() + "." + FuncName);
		}
		return null;
	}

	public final static int ListSize(ArrayList<?> List) {
		if(List == null) {
			return 0;
		}
		return List.size();
	}

	public final static ZenType[] CompactTypeList(int BaseIndex, ArrayList<ZenType> List) {
		ZenType[] Tuple = new ZenType[List.size() - BaseIndex];
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

	public static void RetrieveMapKeys(ZenMap Map, String Prefix, ArrayList<String> List) {
		/*local*/Iterator<String> itr = Map.key_iterator();
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

	@Deprecated public final static void WriteCode(String OutputFile, String SourceCode) {
		if(OutputFile == null) {
			//LibZen.Eval(SourceCode);
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
		String Line = LibZen.ReadLine(Prompt);
		if(Line == null) {
			System.exit(0);
		}
		if(Prompt2 != null) {
			int level = 0;
			while((level = LibZen.CheckBraceLevel(Line)) > 0) {
				String Line2 = LibZen.ReadLine(Prompt2 + ZenUtils.JoinStrings("  ", level));
				Line += "\n" + Line2; 
			}
			if(level < 0) {
				Line = "";
				LibNative.println(" .. canceled");
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
			while((level = LibZen.CheckBraceLevel(Line)) > 0) {
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
				LibNative.println(" .. canceled");
			}
		}
		ConsoleReader.getHistory().add(Line);
		return Line;
	}

	public final static boolean HasFile(String Path) {
		if(LibZen.class.getResource(Path) != null) {
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

	final static String FormatFilePath(String FileName) {
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
	
//	public static Object DynamicCast(ZenType CastType, Object Value) {
//		if(Value != null) {
//			ZenType FromType = ZenSystem.GuessType(Value);
//			if(CastType == FromType || CastType.Accept(FromType)) {
//				return Value;
//			}
//		}
//		return null;
//	}
//
//	public static boolean DynamicInstanceOf(Object Value, ZenType Type) {
//		if(Value != null) {
//			ZenType ValueType = ZenSystem.GuessType(Value);
//			if(ValueType == Type || Type.Accept(ValueType)) {
//				return true;
//			}
//		}
//		return false;
//	}
//
//	public final static Object DynamicConvertTo(GtType CastType, Object Value) {
//		if(Value != null) {
//			GtType ValueType = ZenTypeSystem.GuessType(Value);
//			if(ValueType == CastType || CastType.Accept(ValueType)) {
//				return Value;
//			}
//			ZenFunc Func = ZenTypeSystem.GetConverterFunc(ValueType, CastType, true);
//			if(Func != null) {
//				Object[] Argvs = new Object[2];
//				Argvs[0] = CastType;
//				Argvs[1] = Value;
//				return LibNative.ApplyMethod(Func, null, Argvs);
//			}
//		}
//		return null;
//	}

//	public static boolean ImportMethodToFunc(ZenFunc Func, String FullName) {
//		Method JavaMethod = LibNative.ImportMethod(Func.GetFuncType(), FullName, false);
//		if(JavaMethod != null) {
//			LibZen.SetNativeMethod(Func, JavaMethod);
//			if(Func.GetReturnType().IsVarType()) {
//				Func.SetReturnType(LibNative.GetNativeType(JavaMethod.getReturnType()));
//			}
//			int StartIdx = Func.Is(ZenUtils.NativeMethodFunc) ? 2 : 1;
//			Class<?>[] p = JavaMethod.getParameterTypes();
//			for(int i = 0; i < p.length; i++) {
//				if(Func.Types[StartIdx + i].IsVarType()) {
//					Func.Types[StartIdx + i] = LibNative.GetNativeType(p[i]);
//					Func.FuncType = null; // reset
//				}
//			}
//			return true;
//		}
//		return false;
//	}

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
