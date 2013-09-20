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
import java.io.Writer;
import java.lang.reflect.Constructor;
import java.lang.reflect.Field;
import java.lang.reflect.InvocationTargetException;
import java.lang.reflect.Method;
import java.lang.reflect.Modifier;
import java.util.List;
import java.util.Iterator;

public abstract class LibGreenTea: GreenTeaConsts {

	public /*final*/ static void print(string msg) {
		System.out.print(msg);
	}

	public /*final*/ static void println(string msg) {
		Console.WriteLine(msg);
	}

	public /*final*/ static string GetPlatform() {
		return "Java JVM-" + System.getProperty("java.version");
	}

	public static bool DebugMode = false;

	private /*final*/ static string GetStackInfo(int depth) {
		string LineNumber = " ";
		Exception e =  new Exception();
		StackTraceElement[] Elements = e.getStackTrace();
		if(depth < Elements.length) {
			StackTraceElement elem = Elements[depth];
			LineNumber += elem;
		}
		return LineNumber;
	}

	public /*final*/ static void TODO(string msg) {
		LibGreenTea.println("TODO" + LibGreenTea.GetStackInfo(2) + ": " + msg);
	}

	public /*final*/ static void DebugP(string msg) {
		if(LibGreenTea.DebugMode) {
			LibGreenTea.println("DEBUG" + LibGreenTea.GetStackInfo(2) + ": " + msg);
		}
	}

	public static int VerboseMask = GreenTeaUtils.VerboseUndefined | GreenTeaUtils.VerboseException;

	public /*final*/ static void VerboseLog(int VerboseFlag, string Message) {
		if((LibGreenTea.VerboseMask & VerboseFlag) == VerboseFlag) {
			LibGreenTea.println("GreenTea: " + Message);
		}
	}

	public /*final*/ static void VerboseException(Throwable e) {
		if(e is InvocationTargetException) {
			Throwable cause = e.getCause();
			e = cause;
			if(cause is RuntimeException) {
				throw (RuntimeException)cause;
			}
			if(cause is Error) {
				throw (Error)cause;
			}
		}
		LibGreenTea.VerboseLog(GreenTeaUtils.VerboseException, e.toString());
	}

	public /*final*/ static void Exit(int status, string Message) {
		System.err.println(Message);
		System.exit(1);
	}

	public /*final*/ static void Assert(bool TestResult) {
		if(!TestResult) {
			assert TestResult;
			Exit(1, "Assertion Failed");
		}
	}

	public /*final*/ static char CharAt(string Text, long Pos) {
		if(Pos < Text.length) {
			return Text.charAt((int)Pos);
		}
		return 0;
	}

	public /*final*/ static string SubString(string Text, long StartIdx, long EndIdx) {
		return Text.substring((int)StartIdx, (int)EndIdx);
	}

	public /*final*/ static bool IsWhitespace(string Text, long Pos) {
		char ch = LibGreenTea.CharAt(Text, Pos);
		return Character.isWhitespace(ch);
	}

	public /*final*/ static bool IsLetter(string Text, long Pos) {
		char ch = LibGreenTea.CharAt(Text, Pos);
		return Character.isLetter(ch);
	}

	public /*final*/ static bool IsDigit(string Text, long Pos) {
		char ch = LibGreenTea.CharAt(Text, Pos);
		return Character.isDigit(ch);
	}

	public /*final*/ static bool IsVariableName(string Text, long Pos) {
		char ch = LibGreenTea.CharAt(Text, Pos);
		return Character.isLetter(ch) || ch == '_' || ch > 255;
	}

	public /*final*/ static int CheckBraceLevel(string Text) {
		int level = 0;
		for(int i = 0; i < Text.length; i++) {
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
	
	public /*final*/ static string CharToString(char code) {
		return Character.toString(code);
	}

	public static /*final*/ string UnquoteString(string Text) {
		StringBuilder sb = new StringBuilder();
		/*local*/char quote = LibGreenTea.CharAt(Text, 0);
		/*local*/int i = 0;
		/*local*/int Length = Text.length;
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

	public static /*final*/ string QuoteString(string Text) {
		StringBuilder sb = new StringBuilder();
		sb.append('"');
		/*local*/int i = 0;
		while(i < Text.length) {
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

	public /*final*/ static bool EqualsString(string s, string s2) {
		return s.equals(s2);
	}

	public /*final*/ static long ParseInt(string Text) {
		try {
			return Long.parseLong(Text);
		}
		catch(NumberFormatException e) {
			LibGreenTea.VerboseException(e);
		}
		return 0;
	}

	public /*final*/ static double ParseFloat(string Text) {
		try {
			return Double.parseDouble(Text);
		}
		catch(NumberFormatException e) {
			LibGreenTea.VerboseException(e);
		}
		return 0.0;
	}

	public /*final*/ static string GetEnv(string Key) {
		return System.getenv(Key);
	}
	
	public /*final*/ static bool IsUnixCommand(string cmd) {
		string[] path = LibGreenTea.GetEnv("PATH").split(":");
		int i = 0;
		while(i < path.length) {
			if(LibGreenTea.HasFile(path[i] + "/" + cmd)) {
				return true;
			}
			i = i + 1;
		}
		return false;
	}
	
	public /*final*/ static bool IsDirectory(string Path) {
		return new File(Path).isDirectory();
	}
	
	public /*final*/ static bool IsExist(string Path) {
		return new File(Path).exists();
	}
	
	public /*final*/ static bool IsFile(string Path) {
		return new File(Path).isFile();
	}
	
	public /*final*/ static bool IsReadable(string Path) {
		return new File(Path).canRead();
	}
	
	public /*final*/ static bool IsWritable(string Path) {
		return new File(Path).canWrite();
	}
	
	public /*final*/ static bool IsExecutable(string Path) {
		return new File(Path).canExecute();
	}
	
	public /*final*/ static string[] GetFileList(string Path) {
		/*local*/int Index = Path.indexOf("*");
		/*local*/string NewPath = LibGreenTea.SubString(Path, 0, Index);
		return new File(NewPath).list();
	}

	public /*final*/ static GtType GetNativeType(GtParserContext Context, object Value) {
		GtType NativeType = null;
		Class<?> NativeClass = Value is Class<?> ? (Class<?>)Value : Value.getClass();
		NativeType = (/*cast*/GtType) Context.ClassNameMap.get(NativeClass.getCanonicalName());
		if(NativeType == null) {
			NativeType = new GtType(Context, GreenTeaUtils.NativeType, NativeClass.getSimpleName(), null, NativeClass);
			Context.SetNativeTypeName(NativeClass.getCanonicalName(), NativeType);
			LibGreenTea.VerboseLog(GreenTeaUtils.VerboseNative, "native class: " + NativeClass.getSimpleName() + ", " + NativeClass.getCanonicalName());
		}
		return NativeType;
	}

	public /*final*/ static string GetClassName(object Value) {
		return Value.getClass().getName();
	}

	public /*final*/ static bool MatchNativeMethod(GtType FuncType, Method JavaMethod) {
		/*local*/GtParserContext Context = FuncType.Context;
		/*local*/GtType ReturnType = FuncType.TypeParams[0];
//		System.err.println("method: " + JavaMethod);
//		System.err.println("return: " + ReturnType + ", " + LibGreenTea.GetNativeType(Context, JavaMethod.getReturnType()));
		if(!ReturnType.IsVarType()) {
			if(ReturnType != LibGreenTea.GetNativeType(Context, JavaMethod.getReturnType())) {
				return false;
			}
		}
		/*local*/int StartIndex = 2;
		if(Modifier.isStatic(JavaMethod.getModifiers())) {
			StartIndex = 1;			
		}
		else {
			GtType JavaRecvType = LibGreenTea.GetNativeType(Context, JavaMethod.getDeclaringClass());
//			System.err.println("recv: " + FuncType.TypeParams[1] + ", " + JavaRecvType);
			if(FuncType.TypeParams.length == 1 || JavaRecvType != FuncType.TypeParams[1]) {
				return false;
			}
			StartIndex = 2;
		}
		/*local*/int ParamSize = FuncType.TypeParams.length - StartIndex;
		/*local*/Class<?>[] ParamTypes = JavaMethod.getParameterTypes();
		if(ParamTypes != null) {
//			System.err.println("params: " + ParamSize + ", " + ParamTypes.length);
			if(ParamTypes.length != ParamSize) return false;
			for(int j = 0; j < ParamTypes.length; j++) {
				if(FuncType.TypeParams[StartIndex+j].IsVarType()) continue;
				GtType JavaParamType = LibGreenTea.GetNativeType(Context, ParamTypes[j]);
//				System.err.println("param: " + FuncType.TypeParams[StartIndex+j] + ", " + JavaParamType);
				if(JavaParamType != FuncType.TypeParams[StartIndex+j]) {
					return false;
				}
			}
			return true;
		}
		else {
			return (ParamSize == 0);
		}
	}

	public /*final*/ static GtFunc SetNativeMethod(GtFunc NativeFunc, Method JavaMethod) {
		/*local*/int FuncFlag = GreenTeaUtils.NativeFunc;
		if(Modifier.isStatic(JavaMethod.getModifiers())) {
			FuncFlag |= GreenTeaUtils.NativeStaticFunc;
		}
		NativeFunc.SetNativeMethod(FuncFlag, JavaMethod);
		return NativeFunc;
	}

	public /*final*/ static GtFunc ConvertNativeMethodToFunc(GtParserContext Context, Method JavaMethod) {
		/*local*/List<GtType> TypeList = new List<GtType>();
		TypeList.add(LibGreenTea.GetNativeType(Context, JavaMethod.getReturnType()));
		if(!Modifier.isStatic(JavaMethod.getModifiers())) {
			TypeList.add(LibGreenTea.GetNativeType(Context, JavaMethod.getDeclaringClass()));
		}
		/*local*/Class<?>[] ParamTypes = JavaMethod.getParameterTypes();
		if(ParamTypes != null) {
			for(int j = 0; j < ParamTypes.length; j++) {
				TypeList.add(LibGreenTea.GetNativeType(Context, ParamTypes[j]));
			}
		}
		return SetNativeMethod(new GtFunc(0, JavaMethod.getName(), 0, TypeList), JavaMethod);
	}

	public /*final*/ static Method LoadNativeMethod(GtType ContextType, string FullName, bool StaticMethodOnly) {
		/*local*/Method FoundMethod = null;
		int Index = FullName.lastIndexOf(".");
		if(Index != -1) {
			/*local*/string FuncName = FullName.substring(Index+1);
			try {
				/*local*/Class<?> NativeClass = Class.forName(FullName.substring(0, Index));
				Method[] Methods = NativeClass.getDeclaredMethods();
				if(Methods != null) {
					for(int i = 0; i < Methods.length; i++) {
						if(LibGreenTea.EqualsString(FuncName, Methods[i].getName())) {
							if(!Modifier.isPublic(Methods[i].getModifiers())) {
								continue;
							}
							if(StaticMethodOnly && !Modifier.isStatic(Methods[i].getModifiers())) {
								continue;
							}
							if(ContextType.IsFuncType() && !LibGreenTea.MatchNativeMethod(ContextType, Methods[i])) {
								continue;
							}
							if(FoundMethod != null) {
								LibGreenTea.VerboseLog(GreenTeaUtils.VerboseUndefined, "overloaded method: " + FullName);
								return FoundMethod; // return the first one
							}
							FoundMethod = Methods[i];
						}
					}
				}
			} catch (ClassNotFoundException e) {
				LibGreenTea.VerboseLog(GreenTeaUtils.VerboseException, e.toString());			
			}
		}
		if(FoundMethod == null) {
			LibGreenTea.VerboseLog(GreenTeaUtils.VerboseUndefined, "undefined method: " + FullName + " of " + ContextType);
		}
		return FoundMethod;
	}

	public /*final*/ static bool ImportNativeMethod(GtFunc NativeFunc, string FullName) {
		Method JavaMethod = LibGreenTea.LoadNativeMethod(NativeFunc.GetFuncType(), FullName, false);
		if(JavaMethod != null) {
			LibGreenTea.SetNativeMethod(NativeFunc, JavaMethod);
			if(NativeFunc.GetReturnType().IsVarType()) {
				NativeFunc.SetReturnType(LibGreenTea.GetNativeType(NativeFunc.GetContext(), JavaMethod.getReturnType()));
			}
			int StartIdx = NativeFunc.Is(GreenTeaUtils.NativeStaticFunc) ? 1 : 2;
			Class<?>[] p = JavaMethod.getParameterTypes();
			for(int i = 0; i < p.length; i++) {
				if(NativeFunc.Types[StartIdx + i].IsVarType()) {
					NativeFunc.Types[StartIdx + i] = LibGreenTea.GetNativeType(NativeFunc.GetContext(), p[i]);
					NativeFunc.FuncType = null; // reset
				}
			}
			return true;
		}
		return false;
	}

	public /*final*/ static void LoadNativeConstructors(GtType ClassType, List<GtFunc> FuncList) {
		/*local*/bool TransformedResult = false;
		Class<?> NativeClass = (Class<?>)ClassType.TypeBody;
		GtParserContext Context = ClassType.Context;
		Constructor<?>[] Constructors = NativeClass.getDeclaredConstructors();
		if(Constructors != null) {
			for(int i = 0; i < Constructors.length; i++) {
				if(!Modifier.isPublic(Constructors[i].getModifiers())) {
					continue;
				}
				/*local*/List<GtType> TypeList = new List<GtType>();
				TypeList.add(ClassType);
				/*local*/Class<?>[] ParamTypes = Constructors[i].getParameterTypes();
				if(ParamTypes != null) {
					for(int j = 0; j < ParamTypes.length; j++) {
						TypeList.add(LibGreenTea.GetNativeType(Context, ParamTypes[j]));
					}
				}
				GtFunc Func = new GtFunc(ConstructorFunc, ClassType.ShortClassName, 0, TypeList);
				Func.SetNativeMethod(0, Constructors[i]);
				Context.RootNameSpace.AppendConstructor(ClassType, Func, null);
				FuncList.add(Func);
				TransformedResult = true;
			}
		}
		if(!TransformedResult) {
			Context.RootNameSpace.SetUndefinedSymbol(GreenTeaUtils.ClassSymbol(ClassType, GreenTeaUtils.ConstructorSymbol()), null);
		}
	}

	public /*final*/ static GtFunc LoadNativeField(GtType ClassType, string FieldName, bool GetSetter) {
		GtParserContext Context = ClassType.Context;
		try {
			Class<?> NativeClass = (Class<?>)ClassType.TypeBody;
			Field NativeField = NativeClass.getField(FieldName);
			if(Modifier.isPublic(NativeField.getModifiers())) {
				List<GtType> TypeList = new List<GtType>();
				TypeList.add(LibGreenTea.GetNativeType(Context, NativeField.getType()));
				TypeList.add(ClassType);
				GtFunc GetterNativeFunc = new GtFunc(GetterFunc, FieldName, 0, TypeList);
				GetterNativeFunc.SetNativeMethod(0, NativeField);
				Context.RootNameSpace.SetGetterFunc(ClassType, FieldName, GetterNativeFunc, null);
				TypeList.clear();
				TypeList.add(Context.VoidType);
				TypeList.add(ClassType);
				TypeList.add(LibGreenTea.GetNativeType(Context, NativeField.getType()));
				GtFunc SetterNativeFunc = new GtFunc(SetterFunc, FieldName, 0, TypeList);
				SetterNativeFunc.SetNativeMethod(0, NativeField);
				Context.RootNameSpace.SetGetterFunc(ClassType, FieldName, SetterNativeFunc, null);
				return GetSetter ? SetterNativeFunc : GetterNativeFunc;
			}
		} catch (SecurityException e) {
			LibGreenTea.VerboseException(e);
			e.printStackTrace();
		} catch (NoSuchFieldException e) {
			LibGreenTea.VerboseException(e);
		}
		Context.RootNameSpace.SetUndefinedSymbol(GreenTeaUtils.ClassSymbol(ClassType, GreenTeaUtils.GetterSymbol(FieldName)), null);
		Context.RootNameSpace.SetUndefinedSymbol(GreenTeaUtils.ClassSymbol(ClassType, GreenTeaUtils.SetterSymbol(FieldName)), null); // for setter
		return null;
	}

	public static object LoadNativeStaticFieldValue(GtType ClassType, string Symbol) {
		GtParserContext Context = ClassType.Context;
		try {
			Class<?> NativeClass = (Class<?>)ClassType.TypeBody;
			Field NativeField = NativeClass.getField(Symbol);
			if(Modifier.isStatic(NativeField.getModifiers())) {
				Class<?> NativeType = NativeField.getType();
				if(NativeType == typeof(int)) {
					return NativeField.getInt(null);
				}
				if(NativeType == typeof(long)) {
					return NativeField.getLong(null);
				}
				if(NativeType == typeof(float)) {
					return NativeField.getFloat(null);
				}
				if(NativeType == typeof(double)) {
					return NativeField.getDouble(null);
				}
				return NativeField.get(null);
			}
		} catch (IllegalArgumentException e) {
			e.printStackTrace();
		} catch (IllegalAccessException e) {
			e.printStackTrace();
		} catch (SecurityException e) {
			LibGreenTea.VerboseException(e);
			e.printStackTrace();
		} catch (NoSuchFieldException e) {
			LibGreenTea.VerboseException(e);
		}
		Context.RootNameSpace.SetUndefinedSymbol(GreenTeaUtils.ClassSymbol(ClassType, GreenTeaUtils.ClassStaticName(Symbol)), null);
		// TODO Auto-generated method stub
		return null;
	}

	
	public /*final*/ static void LoadNativeMethods(GtType ClassType, string FuncName, List<GtFunc> FuncList) {
		GtParserContext Context = ClassType.Context;
		Class<?> NativeClass = (Class<?>)ClassType.TypeBody;
		Method[] Methods = NativeClass.getDeclaredMethods();
		/*local*/bool TransformedResult = false;
		if(Methods != null) {
			for(int i = 0; i < Methods.length; i++) {
				if(LibGreenTea.EqualsString(FuncName, Methods[i].getName())) {
					if(!Modifier.isPublic(Methods[i].getModifiers())) {
						continue;
					}
					GtFunc NativeFunc = LibGreenTea.ConvertNativeMethodToFunc(Context, Methods[i]);
					Context.RootNameSpace.AppendMethod(NativeFunc, null);
					FuncList.add(NativeFunc);
					TransformedResult = true;
				}
			}
		}
		if(!TransformedResult) {
			Context.RootNameSpace.SetUndefinedSymbol(GreenTeaUtils.ClassSymbol(ClassType, FuncName), null);
		}
	}

	public /*final*/ static Method LookupNativeMethod(object Callee, string FuncName) {
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

//	public final static boolean EqualsFunc(Method m1, Method m2) {
//		if(m1 == null) {
//			return (m2 == null) ? true : false;
//		}
//		else {
//			return (m2 == null) ? false : m1.equals(m2);
//		}
//	}

	public /*final*/ static object Apply2(object NativeMethod, object Self, object Param1, object Param2) {
		try {
			return ((Method)NativeMethod).invoke(Self, Param1, Param2);
		}
		catch (InvocationTargetException e) {
			LibGreenTea.VerboseException(e);
		}
		catch (IllegalArgumentException e) {
			LibGreenTea.VerboseException(e);
		}
		catch (IllegalAccessException e) {
			LibGreenTea.VerboseException(e);
		}
		return null;
	}

	public /*final*/ static object ApplyFunc(GtFunc Func, object Self,[] object Params) {
		try {
			return ((Method)Func.NativeRef).invoke(Self, Params);
		}
		catch (InvocationTargetException e) {
			//LibGreenTea.VerboseException(e);
			e.getCause().printStackTrace();
		}
		catch (IllegalArgumentException e) {
			LibGreenTea.VerboseException(e);
		}
		catch (IllegalAccessException e) {
			LibGreenTea.VerboseException(e);
		}
		return null;
	}

	public /*final*/ static object ApplyFunc3(GtFunc Func, object Self, object Param1, object Param2, object Param3) {
		try {
			return ((Method)Func.NativeRef).invoke(Self, Param1, Param2, Param3);
		}
		catch (InvocationTargetException e) {
			LibGreenTea.VerboseException(e);
		}
		catch (IllegalArgumentException e) {
			LibGreenTea.VerboseException(e);
		}
		catch (IllegalAccessException e) {
			LibGreenTea.VerboseException(e);
		}
		return null;
	}

	public /*final*/ static object ApplyFunc4(GtFunc Func, object Self, object Param1, object Param2, object Param3, object Param4) {
		try {
			return ((Method)Func.NativeRef).invoke(Self, Param1, Param2, Param3, Param4);
		}
		catch (InvocationTargetException e) {
			LibGreenTea.VerboseException(e);
		}
		catch (IllegalArgumentException e) {
			LibGreenTea.VerboseException(e);
		}
		catch (IllegalAccessException e) {
			LibGreenTea.VerboseException(e);
		}
		return null;
	}

	public /*final*/ static long ApplyTokenFunc(GtFunc TokenFunc, object TokenContext, string Text, long pos) {
		return (Long)LibGreenTea.ApplyFunc3(TokenFunc, null, TokenContext, Text, pos);
	}

	public /*final*/ static GtSyntaxTree ApplyParseFunc(GtFunc ParseFunc, GtNameSpace NameSpace, GtTokenContext TokenContext, GtSyntaxTree LeftTree, GtSyntaxPattern Pattern) {
		return (GtSyntaxTree)LibGreenTea.ApplyFunc4(ParseFunc, null, NameSpace, TokenContext, LeftTree, Pattern);
	}

	public /*final*/ static GtNode ApplyTypeFunc(GtFunc TypeFunc, GtTypeEnv Gamma, GtSyntaxTree ParsedTree, GtType ContextType) {
		return (GtNode)LibGreenTea.ApplyFunc3(TypeFunc, null, Gamma, ParsedTree, ContextType);
	}

	public /*final*/ static int ListSize(List<?> List) {
		if(List == null) {
			return 0;
		}
		return List.size();
	}

	public /*final*/ static GtType[] CompactTypeList(int BaseIndex, List<GtType> List) {
		GtType[] Tuple = new GtType[List.size() - BaseIndex];
		for(int i = BaseIndex; i < List.size(); i++) {
			Tuple[i] = List.get(i);
		}
		return Tuple;
	}

	public /*final*/ static string[] CompactStringList(List<string> List) {
		if(List == null) {
			return null;
		}
		string[] Tuple = new string[List.size()];
		for(int i = 0; i < List.size(); i++) {
			Tuple[i] = List.get(i);
		}
		return Tuple;
	}

	public static void RetrieveMapKeys(GtMap Map, string Prefix, List<string> List) {
		/*local*/Iterator<string> itr = Map.Map.keySet().iterator();
		/*local*/int i = 0;
		while(itr.hasNext()) {
			string Key = itr.next();
			if(Prefix != null && !Key.startsWith(Prefix)) {
				continue;
			}
			List.add(Key);
			i = i + 1;
		}
	}

	public /*final*/ static void Usage(string Message) {
		Console.WriteLine("greentea usage :");
		Console.WriteLine("  --lang|-l LANG        Set Target Language");
		Console.WriteLine("      bash                Bash");
		Console.WriteLine("      C C99               C99");
		Console.WriteLine("      CSharp              CSharp");
		Console.WriteLine("      java java7 java8    Java");
		Console.WriteLine("      javascript js       JavaScript");
		Console.WriteLine("      lua                 Lua");
		Console.WriteLine("      haxe                Haxe");
		Console.WriteLine("      ocaml               OCaml");
		Console.WriteLine("      perl                Perl");
		Console.WriteLine("      python              Python");
		Console.WriteLine("      R                   R");
		Console.WriteLine("      ruby                Ruby");
		Console.WriteLine("      typescript ts       TypeScript");
		Console.WriteLine("");
		Console.WriteLine("  --out|-o  FILE        Output filename");
		Console.WriteLine("  --eval|-e EXPR        Program passed in as string");
		Console.WriteLine("  --verbose             Printing Debug infomation");
		Console.WriteLine("     --verbose:symbol     adding symbol info");
		Console.WriteLine("     --verbose:token      adding token info");
		Console.WriteLine("     --verbose:no         no log");
		LibGreenTea.Exit(0, Message);
	}

	public /*final*/ static string DetectTargetCode(string Extension, string TargetCode) {
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
		else if(Extension.endsWith(".java")) {
			return "java";
		}
		else if(Extension.endsWith(".c")) {
			return "c";
		}
		else if(TargetCode.startsWith("X")) {
			return "exe";
		}
		return TargetCode;
	}

	public /*final*/ static GtGenerator CodeGenerator(string TargetCode, string OutputFile, int GeneratorFlag) {
		string Extension = (OutputFile == null) ? "-" : OutputFile;
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
		else if(TargetCode.startsWith("java")) {
			return new JavaSourceGenerator(TargetCode, OutputFile, GeneratorFlag);
		}
		else if(TargetCode.startsWith("c")) {
			return new CSourceGenerator(TargetCode, OutputFile, GeneratorFlag);
		}
		else if(TargetCode.startsWith("exe")) {
			return new JavaByteCodeGenerator(TargetCode, OutputFile, GeneratorFlag);
		}
		return null;
	}

	public /*final*/ static void WriteCode(string OutputFile, string SourceCode) {
		if(OutputFile == null) {
			LibGreenTea.Eval(SourceCode);
		}
		if(OutputFile.equals("-")) {
			Console.WriteLine(SourceCode);
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

	private static java.io.Console Console = null;

	public /*final*/ static string ReadLine(string Prompt, string Prompt2) {
		if(Console == null) {
			Console = System.console();
		}
		string Line = Console.readLine(Prompt);
		if(Line == null) {
			System.exit(0);
		}
		if(Prompt2 != null) {
			int level = 0;
			while((level = LibGreenTea.CheckBraceLevel(Line)) > 0) {
				string Line2 = Console.readLine(Prompt2 + GreenTeaUtils.JoinStrings("  ", level));
				Line += "\n" + Line2; 
			}
			if(level < 0) {
				Line = "";
				LibGreenTea.println(" .. canceled");
			}
		}
		return Line;
	}

	public /*final*/ static bool HasFile(string Path) {
		if(typeof(LibGreenTea).getResource(Path) != null) {
			return true;
		}
		return new File(Path).exists();
	}

	public /*final*/ static bool IsSupportedTarget(string TargetCode) {
		return HasFile(GetLibPath(TargetCode, "common"));
	}

	public /*final*/ static string GetLibPath(string TargetCode, string LibName) {
		return "lib/" + TargetCode + "/" + LibName + ".green";
	}

	private /*final*/ static string FormatFilePath(string FileName) {
		string Path = FileName;
		if(HasFile(Path)) {
			return Path;
		}
		string Home = System.getProperty("GREENTEA_HOME");
		if(Home != null) {
			Path = Home + FileName;
		}
		if(HasFile(Path)) {
			return Path;
		}
		return FileName;
	}

	public /*final*/ static string LoadFile2(string FileName) {
		LibGreenTea.VerboseLog(GreenTeaUtils.VerboseFile, "loading " + FileName);
		InputStream Stream = typeof(LibGreenTea).getResourceAsStream("/" + FileName);
		if(Stream == null) {
			File f = new File(FormatFilePath(FileName));
			try {
				Stream = new FileInputStream(f);
			} catch (FileNotFoundException e) {
				return null;
			}
		}
		BufferedReader reader = new BufferedReader(new InputStreamReader(Stream));
		string buffer = "";
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

	public /*final*/ static bool booleanValue(object BooleanValue) {
		return ((/*cast*/Boolean)BooleanValue).booleanValue();
	}

	public /*final*/ static object Eval(string SourceCode) {
		LibGreenTea.VerboseLog(GreenTeaUtils.VerboseEval, "eval as native code: " + SourceCode);
		//eval(SourceCode);
		//System.out.println("Eval: " + SourceCode);  // In Java, no eval
		return null;
	}

	public static object EvalCast(GtType CastType, object Value) {
		if(Value != null) {
			GtType ValueType = CastType.Context.GuessType(Value);
			if(ValueType == CastType || CastType.Accept(ValueType)) {
				return Value;
			}
			TODO("Add Invoke Coercion.. from " + ValueType + " to " + CastType);
			if(CastType == CastType.Context.StringType) {
				return Value.toString();
			}
		}
		return null;
	}

	public static object EvalInstanceOf(object Value, GtType Type) {
		if(Value != null) {
			GtType ValueType = Type.Context.GuessType(Value);
			if(ValueType == Type || Type.Accept(ValueType)) {
				return true;
			}
		}
		return false;
	}

	public static object EvalUnary(GtType Type, string Operator, object Value) {
		if(Value is Boolean) {
			if(Operator.equals("!") || Operator.equals("not")) {
				return EvalCast(Type, !((Boolean)Value).booleanValue());
			}
			return null;
		}
		if(Value is Long || Value is Integer  || Value is Short) {
			if(Operator.equals("-")) {
				return EvalCast(Type, -((Number)Value).longValue());
			}
			if(Operator.equals("+")) {
				return EvalCast(Type, +((Number)Value).longValue());
			}
			if(Operator.equals("~")) {
				return EvalCast(Type, ~((Number)Value).longValue());
			}
			return null;
		}
		return null;
	}

	public static object EvalSuffix(GtType Type, object Value, string Operator) {
		return null;
	}

	public static object EvalBinary(GtType Type, object LeftValue, string Operator, object RightValue) {
		//System.err.println("***" + LeftValue.getClass() + ", " + RightValue.getClass());
		if(LeftValue == null || RightValue == null) {
			return null;
		}
		if(LeftValue is string || RightValue is string) {
			string left = EvalCast(Type.Context.StringType, LeftValue).toString();
			string right = EvalCast(Type.Context.StringType, RightValue).toString();
			if(Operator.equals("+")) {
				return  EvalCast(Type, left + right);
			}
		}
		if(LeftValue is string && RightValue is string) {
			string left = EvalCast(Type.Context.StringType, LeftValue).toString();
			string right = EvalCast(Type.Context.StringType, RightValue).toString();
			if(Operator.equals("==")) {
				return  EvalCast(Type, left.equals(right));
			}
			if(Operator.equals("!=")) {
				return EvalCast(Type, !left.equals(right));
			}
			if(Operator.equals("<")) {
				return EvalCast(Type, left.compareTo(right) < 0);
			}
			if(Operator.equals("<=")) {
				return EvalCast(Type, left.compareTo(right) <= 0);
			}
			if(Operator.equals(">")) {
				return EvalCast(Type, left.compareTo(right) > 0);
			}
			if(Operator.equals(">=")) {
				return EvalCast(Type, left.compareTo(right) >= 0);
			}
			return null;
		}
		if(LeftValue is Double || LeftValue is Float || RightValue is Double || RightValue is Float) {
			try {
				double left = ((Number)LeftValue).doubleValue();
				double right = ((Number)RightValue).doubleValue();
				if(Operator.equals("+")) {
					return EvalCast(Type, left + right);
				}
				if(Operator.equals("-")) {
					return EvalCast(Type, left - right);
				}
				if(Operator.equals("*")) {
					return EvalCast(Type, left * right);
				}
				if(Operator.equals("/")) {
					return EvalCast(Type, left / right);
				}
				if(Operator.equals("%") || Operator.equals("mod")) {
					return EvalCast(Type, left % right);
				}
				if(Operator.equals("==")) {
					return EvalCast(Type, left == right);
				}
				if(Operator.equals("!=")) {
					return EvalCast(Type, left != right);
				}
				if(Operator.equals("<")) {
					return EvalCast(Type, left < right);
				}
				if(Operator.equals("<=")) {
					return EvalCast(Type, left <= right);
				}
				if(Operator.equals(">")) {
					return EvalCast(Type, left > right);
				}
				if(Operator.equals(">=")) {
					return EvalCast(Type, left >= right);
				}
			}
			catch(ClassCastException e) {
			}
			return null;
		}
		if(LeftValue is Boolean && RightValue is Boolean) {
			bool left = (Boolean)LeftValue;
			bool right = (Boolean)RightValue;
			if(Operator.equals("==")) {
				return EvalCast(Type, left == right);
			}
			if(Operator.equals("!=")) {
				return EvalCast(Type, left != right);
			}
			return null;
		}
		try {
			long left = ((Number)LeftValue).longValue();
			long right = ((Number)RightValue).longValue();
			if(Operator.equals("+")) {
				return EvalCast(Type, left + right);
			}
			if(Operator.equals("-")) {
				return EvalCast(Type, left - right);
			}
			if(Operator.equals("*")) {
				return EvalCast(Type, left * right);
			}
			if(Operator.equals("/")) {
				return EvalCast(Type, left / right);
			}
			if(Operator.equals("%") || Operator.equals("mod")) {
				return EvalCast(Type, left % right);
			}
			if(Operator.equals("==")) {
				return EvalCast(Type, left == right);
			}
			if(Operator.equals("!=")) {
				return EvalCast(Type, left != right);
			}
			if(Operator.equals("<")) {
				return EvalCast(Type, left < right);
			}
			if(Operator.equals("<=")) {
				return EvalCast(Type, left <= right);
			}
			if(Operator.equals(">")) {
				return EvalCast(Type, left > right);
			}
			if(Operator.equals(">=")) {
				return EvalCast(Type, left >= right);
			}
			if(Operator.equals("|")) {
				return EvalCast(Type, left | right);
			}
			if(Operator.equals("&")) {
				return EvalCast(Type, left & right);
			}
			if(Operator.equals("<<")) {
				return EvalCast(Type, left << right);
			}
			if(Operator.equals(">>")) {
				return EvalCast(Type, left >> right);
			}
			if(Operator.equals("^")) {
				return EvalCast(Type, left ^ right);
			}
		}
		catch(ClassCastException e) {
		}
		return null;
	}

	public static object EvalGetter(GtType Type, object Value, string FieldName) {
		// TODO Auto-generated method stub
		return null;
	}

}