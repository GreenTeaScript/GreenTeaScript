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
// OTHERWISE) ARISING IN ANY WAY @out OF THE USE OF THIS SOFTWARE, EVEN IF
// ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
// **************************************************************************

// LangBase is a language-dependent code used in GreenTea.java

using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Reflection;
using System.Text;
using System.Threading.Tasks;
using System.IO;

class GtMap {
	Dictionary<String, Object> Map = new Dictionary<String, Object>();

	public GtMap() {
	}

	public void put(String Key, Object Value) {
		this.Map[Key] = Value;
	}

	public Object GetOrNull(String Key) {
		return this.Map[Key];
	}

    public IEnumerable<string> GetKeys()
    {
        return Map.Keys;
    }
}

public abstract class LibGreenTea: GreenTeaConst {

	public /*final*/ static void print(string msg) {
		Console.WriteLine(msg);
	}

	public /*final*/ static void println(string msg) {
		Console.WriteLine(msg);
	}

	public /*final*/ static string GetPlatform() {
		return "CSharp";//"Java JVM-" + System.getProperty("java.version");
	}

	public static bool DebugMode = !false;

	private /*final*/ static string GetStackInfo(int depth) {
		string LineNumber = " ";
		//Exception e =  new Exception();
		//StackTraceElement[] Elements = e.getStackTrace();
		//if(depth < Elements.Length) {
		//	StackTraceElement elem = Elements[depth];
		//	LineNumber += elem;
		//}
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

	public /*final*/ static void VerboseException(Exception e) {
        //if(e is InvocationTargetException) {
        //    Throwable cause = e.getCause();
        //    e = cause;
        //    if(cause is RuntimeException) {
        //        throw (RuntimeException)cause;
        //    }
        //    if(cause is Error) {
        //        throw (Error)cause;
        //    }
        //}
		LibGreenTea.VerboseLog(GreenTeaUtils.VerboseException, e.ToString());
	}

	public /*final*/ static void Exit(int status, string Message) {
        Console.Error.WriteLine(Message);
		System.Environment.Exit(1);
	}

	public /*final*/ static void Assert(bool TestResult) {
		if(!TestResult) {
			Debug.Assert(TestResult);
			Exit(1, "Assertion Failed");
		}
	}

	public /*final*/ static char CharAt(string Text, long Pos) {
		if(Pos < Text.Length) {
			return Text[(int)Pos];
		}
		return (char)0;
	}

	public /*final*/ static string Substring(string Text, long StartIdx, long EndIdx) {
		return Text.Substring((int)StartIdx, (int)EndIdx);
	}

	public /*final*/ static bool IsWhitespace(string Text, long Pos) {
		char ch = LibGreenTea.CharAt(Text, Pos);
		return char.IsWhiteSpace(ch);
	}

	public /*final*/ static bool IsLetter(string Text, long Pos) {
		char ch = LibGreenTea.CharAt(Text, Pos);
		return char.IsLetter(ch);
	}

	public /*final*/ static bool IsDigit(string Text, long Pos) {
		char ch = LibGreenTea.CharAt(Text, Pos);
		return char.IsDigit(ch);
	}

	public /*final*/ static bool IsVariableName(string Text, long Pos) {
		char ch = LibGreenTea.CharAt(Text, Pos);
		return char.IsLetter(ch) || ch == '_' || ch > 255;
	}

	public /*final*/ static int CheckBraceLevel(string Text) {
		int level = 0;
		for(int i = 0; i < Text.Length; i++) {
			char ch = Text[i];
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
		return char.ToString(code);
	}

	public static /*final*/ string UnquoteString(string Text) {
		StringBuilder sb = new StringBuilder();
		/*local*/char quote = LibGreenTea.CharAt(Text, 0);
		/*local*/int i = 0;
		/*local*/int Length = Text.Length;
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
			sb.Append(ch);
			i = i + 1;
		}
		return sb.ToString();
	}

	public static /*final*/ string QuoteString(string Text) {
		StringBuilder sb = new StringBuilder();
		sb.Append('"');
		/*local*/int i = 0;
		while(i < Text.Length) {
			/*local*/char ch = LibGreenTea.CharAt(Text, i);
			if(ch == '\n') {
				sb.Append("\\n");
			}
			else if(ch == '\t') {
				sb.Append("\\t");
			}
			else if(ch == '"') {
				sb.Append("\\\"");
			}
			else if(ch == '\\') {
				sb.Append("\\\\");
			}
			else {
				sb.Append(ch);
			}
			i = i + 1;
		}
		sb.Append('"');
		return sb.ToString();
	}

	public /*final*/ static bool EqualsString(string s, string s2) {
		return s.Equals(s2);
	}

	public /*final*/ static long ParseInt(string Text) {
		try {
			return long.Parse(Text);
		}
		catch(FormatException e) {
			LibGreenTea.VerboseException(e);
		}
		return 0;
	}

	public /*final*/ static double ParseFloat(string Text) {
		try {
			return Double.Parse(Text);
		}
		catch(FormatException e) {
			LibGreenTea.VerboseException(e);
		}
		return 0.0;
	}	

	public /*final*/ static GtType GetNativeType(GtParserContext Context, object Value) {
        //GtType NativeType = null;
        //Type NativeClass = Value is Type ? (Type)Value : Value.GetType();
        //NativeType = (/*cast*/GtType) Context.ClassNameMap.GetOrNull(NativeClass.getCanonicalName());
        //if(NativeType == null) {
        //    NativeType = new GtType(Context, GreenTeaUtils.NativeType, NativeClass.getSimpleName(), null, NativeClass);
        //    Context.SetNativeTypeName(NativeClass.getCanonicalName(), NativeType);
        //    LibGreenTea.VerboseLog(GreenTeaUtils.VerboseNative, "native class: " + NativeClass.getSimpleName() + ", " + NativeClass.getCanonicalName());
        //}
        //return NativeType;
        throw new NotImplementedException();
	}

	public /*final*/ static string GetClassName(object Value) {
		return Value.GetType().Name;
	}

	private static bool AcceptJavaType(GtType GreenType, Type Type) {
		if(GreenType.IsVarType() || GreenType.IsTypeVariable()) {
			return true;
		}
		GtType JavaType = LibGreenTea.GetNativeType(GreenType.Context, Type);
		if(GreenType != JavaType) {
			if(GreenType.IsGenericType() && GreenType.HasTypeVariable()) {
				return GreenType.BaseType == JavaType.BaseType;
			}
			return false;
		}
		return true;
	}
	
	public /*final*/ static bool MatchNativeMethod(GtType FuncType, MethodInfo CLRMethod) {
		/*local*/GtParserContext Context = FuncType.Context;
//		Console.Error.WriteLine("MethodInfo: " + JavaMethod);
//		/*local*/GtType ReturnType = FuncType.TypeParams[0];
//		Console.Error.WriteLine("return: " + ReturnType + ", " + JavaMethod.ReturnType);
		if(!AcceptJavaType(FuncType.TypeParams[0], CLRMethod.ReturnType)) {
			return false;
		}
		/*local*/int StartIndex = 2;
        if((CLRMethod.Attributes & MethodAttributes.Static) != 0) {
            StartIndex = 1;			
        }
		else {
			GtType JavaRecvType = LibGreenTea.GetNativeType(Context, CLRMethod.DeclaringType);
			Console.Error.WriteLine("recv: " + FuncType.TypeParams[1] + ", " + JavaRecvType);
            if(FuncType.TypeParams.Length == 1 || !AcceptJavaType(FuncType.TypeParams[1], CLRMethod.DeclaringType)) {
                return false;
            }
            StartIndex = 2;
		}
		/*local*/int ParamSize = FuncType.TypeParams.Length - StartIndex;
		/*local*/Type[] ParamTypes = CLRMethod.GetParameters().Select(p=>p.ParameterType).ToArray();
		if(ParamTypes != null) {
//			Console.Error.WriteLine("params: " + ParamSize + ", " + ParamTypes.Length);
			if(ParamTypes.Length != ParamSize) return false;
			for(int j = 0; j < ParamTypes.Length; j++) {
//				if(FuncType.TypeParams[StartIndex+j].IsVarType()) continue;
//				GtType JavaParamType = LibGreenTea.GetNativeType(Context, ParamTypes[j]);
//				Console.Error.WriteLine("param: " + FuncType.TypeParams[StartIndex+j] + ", " + JavaParamType);
				if(!AcceptJavaType(FuncType.TypeParams[StartIndex+j], ParamTypes[j])) {
					return false;
				}
			}
			return true;
		}
		else {
			return (ParamSize == 0);
		}
	}

	public /*final*/ static GtFunc SetNativeMethod(GtFunc NativeFunc, MethodInfo JavaMethod) {
		/*local*/int FuncFlag = GreenTeaUtils.NativeFunc;
		if((JavaMethod.Attributes & MethodAttributes.Static) != 0) {
			FuncFlag |= GreenTeaUtils.NativeStaticFunc;
		}
		NativeFunc.SetNativeMethod(FuncFlag, JavaMethod);
		return NativeFunc;
	}

	public /*final*/ static GtFunc ConvertNativeMethodToFunc(GtParserContext Context, MethodInfo JavaMethod) {
		/*local*/List<GtType> TypeList = new List<GtType>();
		TypeList.Add(LibGreenTea.GetNativeType(Context, JavaMethod.ReturnType));
		if((JavaMethod.Attributes & MethodAttributes.Static) == 0) {
			TypeList.Add(LibGreenTea.GetNativeType(Context, JavaMethod.DeclaringType));
		}
		/*local*/Type[] ParamTypes = JavaMethod.GetParameters().Select(p=>p.ParameterType).ToArray();
		if(ParamTypes != null) {
			for(int j = 0; j < ParamTypes.Length; j++) {
				TypeList.Add(LibGreenTea.GetNativeType(Context, ParamTypes[j]));
			}
		}
		return SetNativeMethod(new GtFunc(0, JavaMethod.Name, 0, TypeList), JavaMethod);
	}

	private static Type LoadNativeClass(string ClassName) {
        try {
            return Type.GetType("org.GreenTeaScript." + ClassName);
        }
        catch(TypeLoadException e) {
        }
        return Type.GetType(ClassName);
        throw new NotImplementedException();
	}
	
	public /*final*/ static MethodInfo LoadNativeMethod(GtType ContextType, string FullName, bool StaticMethodOnly) {
		/*local*/MethodInfo FoundMethod = null;
		int Index = FullName.LastIndexOf(".");
		if(Index == -1) {
			return null;
		}
		try {
			/*local*/string FuncName = FullName.Substring(Index+1);
			/*local*/Type NativeClass = LoadNativeClass(FullName.Substring(0, Index));
			MethodInfo[] Methods = NativeClass.GetMethods();
			if(Methods != null) {
				for(int i = 0; i < Methods.Length; i++) {
					if(LibGreenTea.EqualsString(FuncName, Methods[i].Name)) {
						if((MethodAttributes.Public & Methods[i].Attributes) == 0) {
							continue;
						}
						if(StaticMethodOnly && (MethodAttributes.Static & Methods[i].Attributes) == 0) {
							continue;
						}
						if(ContextType.IsFuncType() && !LibGreenTea.MatchNativeMethod(ContextType, Methods[i])) {
							continue;
						}
						if(FoundMethod != null) {
							LibGreenTea.VerboseLog(GreenTeaUtils.VerboseUndefined, "overloaded MethodInfo: " + FullName);
							return FoundMethod; // return the first one
						}
						FoundMethod = Methods[i];
					}
				}
			}
			if(FoundMethod == null) {
				LibGreenTea.VerboseLog(GreenTeaUtils.VerboseUndefined, "undefined MethodInfo: " + FullName + " for " + ContextType);
			}
		} catch (TypeLoadException e) {
				LibGreenTea.VerboseLog(GreenTeaUtils.VerboseException, e.ToString());			
		}
		return FoundMethod;
	}

	public /*final*/ static bool ImportNativeMethod(GtNameSpace NameSpace, GtFunc NativeFunc, string FullName) {
		MethodInfo JavaMethod = LibGreenTea.LoadNativeMethod(NativeFunc.GetFuncType(), FullName, false);
		if(JavaMethod != null) {
			LibGreenTea.SetNativeMethod(NativeFunc, JavaMethod);
			if(NativeFunc.GetReturnType().IsVarType()) {
				NativeFunc.SetReturnType(LibGreenTea.GetNativeType(NativeFunc.GetContext(), JavaMethod.ReturnType));
			}
			int StartIdx = NativeFunc.Is(GreenTeaUtils.NativeStaticFunc) ? 1 : 2;
			Type[] p = JavaMethod.GetParameters().Select(p=>p.ParameterType).ToArray();
			for(int i = 0; i < p.Length; i++) {
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
		Type NativeClass = (Type)ClassType.TypeBody;
		GtParserContext Context = ClassType.Context;
		var Constructors = NativeClass.GetConstructors();
		if(Constructors != null) {
			for(int i = 0; i < Constructors.Length; i++) {
				if((MethodAttributes.Public & Constructors[i].Attributes) == 0) {
					continue;
				}
				/*local*/List<GtType> TypeList = new List<GtType>();
				TypeList.Add(ClassType);
				/*local*/Type[] ParamTypes = Constructors[i].GetParameters().Select(p => p.ParameterType).ToArray();
				if(ParamTypes != null) {
					for(int j = 0; j < ParamTypes.Length; j++) {
						TypeList.Add(LibGreenTea.GetNativeType(Context, ParamTypes[j]));
					}
				}
				GtFunc Func = new GtFunc(ConstructorFunc, ClassType.ShortName, 0, TypeList);
				Func.SetNativeMethod(0, Constructors[i]);
				Context.RootNameSpace.AppendConstructor(ClassType, Func, null);
				FuncList.Add(Func);
				TransformedResult = true;
			}
		}
		if(!TransformedResult) {
			Context.RootNameSpace.SetUndefinedSymbol(GreenTeaUtils.ClassSymbol(ClassType, GreenTeaUtils.ConstructorSymbol()), null);
		}
	}

	public /*final*/ static GtFunc LoadNativeField(GtType ClassType, string FieldName, bool GetSetter) {
		GtParserContext Context = ClassType.Context;
		Type NativeClass = (Type)ClassType.TypeBody;
		FieldInfo NativeField = NativeClass.GetField(FieldName);
		if((FieldAttributes.Public & NativeField.Attributes) != 0) {
			List<GtType> TypeList = new List<GtType>();
			TypeList.Add(LibGreenTea.GetNativeType(Context, NativeField.GetType()));
			TypeList.Add(ClassType);
			GtFunc GetterNativeFunc = new GtFunc(GetterFunc, FieldName, 0, TypeList);
			GetterNativeFunc.SetNativeMethod(0, NativeField);
			Context.RootNameSpace.SetGetterFunc(ClassType, FieldName, GetterNativeFunc, null);
			TypeList.Clear();
			TypeList.Add(Context.VoidType);
			TypeList.Add(ClassType);
			TypeList.Add(LibGreenTea.GetNativeType(Context, NativeField.GetType()));
			GtFunc SetterNativeFunc = new GtFunc(SetterFunc, FieldName, 0, TypeList);
			SetterNativeFunc.SetNativeMethod(0, NativeField);
			Context.RootNameSpace.SetGetterFunc(ClassType, FieldName, SetterNativeFunc, null);
			return GetSetter ? SetterNativeFunc : GetterNativeFunc;
		}
		Context.RootNameSpace.SetUndefinedSymbol(GreenTeaUtils.ClassSymbol(ClassType, GreenTeaUtils.GetterSymbol(FieldName)), null);
		Context.RootNameSpace.SetUndefinedSymbol(GreenTeaUtils.ClassSymbol(ClassType, GreenTeaUtils.SetterSymbol(FieldName)), null); // for setter
		return null;
	}

	public static object LoadNativeStaticFieldValue(GtType ClassType, string Symbol) {
		GtParserContext Context = ClassType.Context;
        //try {
			Type NativeClass = (Type)ClassType.TypeBody;
			FieldInfo NativeField = NativeClass.GetField(Symbol);
			if(NativeField.IsStatic) {
				return NativeField.GetValue(null);
			}
        //} catch (IllegalArgumentException e) {
        //    e.printStackTrace();
        //} catch (IllegalAccessException e) {
        //    e.printStackTrace();
        //} catch (SecurityException e) {
        //    LibGreenTea.VerboseException(e);
        //    e.printStackTrace();
        //} catch (FieldException e) {
        //    LibGreenTea.VerboseException(e);
        //}
		Context.RootNameSpace.SetUndefinedSymbol(GreenTeaUtils.ClassSymbol(ClassType, GreenTeaUtils.ClassStaticName(Symbol)), null);
		// TODO Auto-generated MethodInfo stub
		return null;
	}

	public /*final*/ static void LoadNativeMethods(GtType ClassType, string FuncName, List<GtFunc> FuncList) {
		GtParserContext Context = ClassType.Context;
		Type NativeClass = (Type)ClassType.TypeBody;
		MethodInfo[] Methods = NativeClass.GetMethods();
		/*local*/bool TransformedResult = false;
		if(Methods != null) {
			for(int i = 0; i < Methods.Length; i++) {
				if(LibGreenTea.EqualsString(FuncName, Methods[i].Name)) {
					if((MethodAttributes.Public & Methods[i].Attributes) != 0) {
						continue;
					}
					GtFunc NativeFunc = LibGreenTea.ConvertNativeMethodToFunc(Context, Methods[i]);
					Context.RootNameSpace.AppendMethod(NativeFunc, null);
					FuncList.Add(NativeFunc);
					TransformedResult = true;
				}
			}
		}
		if(!TransformedResult) {
			Context.RootNameSpace.SetUndefinedSymbol(GreenTeaUtils.ClassSymbol(ClassType, FuncName), null);
		}
	}

	public /*final*/ static MethodInfo LookupNativeMethod(object Callee, string FuncName) {
		if(FuncName != null) {
			// LibGreenTea.DebugP("looking up MethodInfo : " + Callee.GetType().getSimpleName() + "." + FuncName);
			MethodInfo[] methods = Callee.GetType().GetMethods();
			for(int i = 0; i < methods.Length; i++) {
				if(FuncName.Equals(methods[i].Name)) {
					return methods[i];
				}
			}
			LibGreenTea.VerboseLog(GreenTeaUtils.VerboseUndefined, "undefined MethodInfo: " + Callee.GetType().Name + "." + FuncName);
		}
		return null;
	}

//	public final static boolean EqualsFunc(MethodInfo m1, MethodInfo m2) {
//		if(m1 == null) {
//			return (m2 == null) ? true : false;
//		}
//		else {
//			return (m2 == null) ? false : m1.equals(m2);
//		}
//	}

	public /*final*/ static object Apply2(object NativeMethod, object Self, object Param1, object Param2) {
		try {
            return ((MethodInfo)NativeMethod).Invoke(Self, new Object[] { Param1, Param2 });
		}
        catch (Exception e)
        {
			LibGreenTea.VerboseException(e);
		}
		return null;
	}

	public /*final*/ static object ApplyFunc(GtFunc Func, object Self, object[] Params) {
		try {
			return ((MethodInfo)Func.NativeRef).Invoke(Self, Params);
		}
        catch (Exception e)
        {
            LibGreenTea.VerboseException(e);
        }
		return null;
	}

	public /*final*/ static object ApplyFunc3(GtFunc Func, object Self, object Param1, object Param2, object Param3) {
		try {
            return ((MethodInfo)Func.NativeRef).Invoke(Self, new Object[] { Param1, Param2, Param3 });
		}
        catch (Exception e)
        {
            LibGreenTea.VerboseException(e);
        }
		return null;
	}

	public /*final*/ static object ApplyFunc4(GtFunc Func, object Self, object Param1, object Param2, object Param3, object Param4) {
		try {
            return ((MethodInfo)Func.NativeRef).Invoke(Self, new Object[] { Param1, Param2, Param3, Param4 });
		}
        catch (Exception e)
        {
            LibGreenTea.VerboseException(e);
        }
		return null;
	}

	public /*final*/ static long ApplyTokenFunc(GtFunc TokenFunc, object TokenContext, string Text, long pos) {
		return (long)LibGreenTea.ApplyFunc3(TokenFunc, null, TokenContext, Text, pos);
	}

	public /*final*/ static GtSyntaxTree ApplyParseFunc(GtFunc ParseFunc, GtNameSpace NameSpace, GtTokenContext TokenContext, GtSyntaxTree LeftTree, GtSyntaxPattern Pattern) {
		return (GtSyntaxTree)LibGreenTea.ApplyFunc4(ParseFunc, null, NameSpace, TokenContext, LeftTree, Pattern);
	}

	public /*final*/ static GtNode ApplyTypeFunc(GtFunc TypeFunc, GtTypeEnv Gamma, GtSyntaxTree ParsedTree, GtType ContextType) {
		return (GtNode)LibGreenTea.ApplyFunc3(TypeFunc, null, Gamma, ParsedTree, ContextType);
	}

	public /*final*/ static int ListSize<T>(List<T> List) {
		if(List == null) {
			return 0;
		}
		return List.Count();
	}

	public /*final*/ static GtType[] CompactTypeList(int BaseIndex, List<GtType> List) {
		GtType[] Tuple = new GtType[List.Count() - BaseIndex];
		for(int i = BaseIndex; i < List.Count(); i++) {
			Tuple[i] = List[i];
		}
		return Tuple;
	}

	public /*final*/ static string[] CompactStringList(List<string> List) {
		if(List == null) {
			return null;
		}
		string[] Tuple = new string[List.Count()];
		for(int i = 0; i < List.Count(); i++) {
			Tuple[i] = List[i];
		}
		return Tuple;
	}

	public static void RetrieveMapKeys(GtMap Map, string Prefix, List<string> List) {
        List.AddRange(Map.GetKeys().Where(Key => Prefix == null || Key.StartsWith(Prefix)));
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
		Console.WriteLine("  --@out|-o  FILE        Output filename");
		Console.WriteLine("  --eval|-e EXPR        Program passed in as string");
		Console.WriteLine("  --verbose             Printing Debug infomation");
		Console.WriteLine("     --verbose:symbol     adding symbol info");
		Console.WriteLine("     --verbose:token      adding token info");
		Console.WriteLine("     --verbose:no         no log");
		LibGreenTea.Exit(0, Message);
	}

	public /*final*/ static string DetectTargetCode(string Extension, string TargetCode) {
		if(Extension.EndsWith(".js")) {
			return "js";
		}
		else if(Extension.EndsWith(".pl")) {
			return "perl";
		}
		else if(Extension.EndsWith(".py")) {
			return "python";
		}
		else if(Extension.EndsWith(".sh")) {
			return "bash";
		}
		else if(Extension.EndsWith(".scala")) {
			return "scala";
		}
		else if(Extension.EndsWith(".c")) {
			return "c";
		}
		else if(TargetCode.StartsWith("X")) {
			return "exe";
		}
		return TargetCode;
	}

	public /*final*/ static GtGenerator CodeGenerator(string TargetCode, string OutputFile, int GeneratorFlag) {
		string Extension = (OutputFile == null) ? "-" : OutputFile;
		TargetCode = DetectTargetCode(Extension, TargetCode);
		TargetCode = TargetCode.ToLower();
        //if(TargetCode.StartsWith("js") || TargetCode.StartsWith("javascript")) {
        //    return new JavaScriptSourceGenerator(TargetCode, OutputFile, GeneratorFlag);
        //}
        //else if(TargetCode.StartsWith("pl") || TargetCode.StartsWith("perl")) {
        //    return new PerlSourceGenerator(TargetCode, OutputFile, GeneratorFlag);
        //}
        //else if(TargetCode.StartsWith("python")) {
        //    return new PythonSourceGenerator(TargetCode, OutputFile, GeneratorFlag);
        //}
        //else if(TargetCode.StartsWith("bash")) {
        //    return new BashSourceGenerator(TargetCode, OutputFile, GeneratorFlag);
        //}
        //else if(TargetCode.StartsWith("scala")) {
        //    return new ScalaSourceGenerator(TargetCode, OutputFile, GeneratorFlag);
        //}
        //else if(TargetCode.StartsWith("c")) {
        //    return new CSourceGenerator(TargetCode, OutputFile, GeneratorFlag);
        //}
        //else if(TargetCode.StartsWith("exe")) {
        //    return new JavaByteCodeGenerator(TargetCode, OutputFile, GeneratorFlag);
        //}
		return null;
	}

	public /*final*/ static void WriteCode(string OutputFile, string SourceCode) {
		if(OutputFile == null) {
			LibGreenTea.Eval(SourceCode);
		}
		if(OutputFile.Equals("-")) {
			Console.WriteLine(SourceCode);
		}
		else {
			try {
                using (var @out = new StreamWriter(new FileStream(OutputFile, FileMode.Create)))
                {
                    @out.Write(SourceCode);
                }
			} catch (IOException e) {
				Console.Error.WriteLine("Cannot write: " + OutputFile);
				System.Environment.Exit(1);
			}
		}
	}

	public /*final*/ static string ReadLine(string Prompt, string Prompt2) {
        Console.Write(Prompt);
		string Line = Console.ReadLine();
		if(Line == null) {
			System.Environment.Exit(0);
		}
		if(Prompt2 != null) {
			int level = 0;
			while((level = LibGreenTea.CheckBraceLevel(Line)) > 0) {
                Console.Write(Prompt2 + GreenTeaUtils.JoinStrings("  ", level));
				string Line2 = Console.ReadLine();
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
        //if(typeof(LibGreenTea).getResource(Path) != null) {
        //    return true;
        //}
		return File.Exists(Path);
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
		string Home = System.Environment.GetEnvironmentVariable("GREENTEA_HOME");
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
		Stream Stream = typeof(LibGreenTea).getResourceAsStream("/" + FileName);
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
			buffer = builder.ToString();
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
		//System.@out.println("Eval: " + SourceCode);  // In Java, no eval
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
				return Value.ToString();
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
			if(Operator.Equals("!") || Operator.Equals("not")) {
				return EvalCast(Type, !((Boolean)Value).booleanValue());
			}
			return null;
		}
		if(Value is long || Value is int || Value is short) {
			if(Operator.Equals("-")) {
				return EvalCast(Type, -((Number)Value).longValue());
			}
			if(Operator.Equals("+")) {
				return EvalCast(Type, +((Number)Value).longValue());
			}
			if(Operator.Equals("~")) {
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
		//Console.Error.WriteLine("***" + LeftValue.GetType() + ", " + RightValue.GetType());
		if(LeftValue == null || RightValue == null) {
			return null;
		}
		if(LeftValue is string || RightValue is string) {
			string left = EvalCast(Type.Context.StringType, LeftValue).ToString();
			string right = EvalCast(Type.Context.StringType, RightValue).ToString();
			if(Operator.Equals("+")) {
				return  EvalCast(Type, left + right);
			}
		}
		if(LeftValue is string && RightValue is string) {
			string left = EvalCast(Type.Context.StringType, LeftValue).ToString();
			string right = EvalCast(Type.Context.StringType, RightValue).ToString();
			if(Operator.Equals("==")) {
				return  EvalCast(Type, left.Equals(right));
			}
			if(Operator.Equals("!=")) {
				return EvalCast(Type, !left.Equals(right));
			}
			if(Operator.Equals("<")) {
				return EvalCast(Type, left.CompareTo(right) < 0);
			}
			if(Operator.Equals("<=")) {
				return EvalCast(Type, left.CompareTo(right) <= 0);
			}
			if(Operator.Equals(">")) {
				return EvalCast(Type, left.CompareTo(right) > 0);
			}
			if(Operator.Equals(">=")) {
				return EvalCast(Type, left.CompareTo(right) >= 0);
			}
			return null;
		}
		if(LeftValue is Double || LeftValue is Float || RightValue is Double || RightValue is Float) {
			try {
				double left = ((Number)LeftValue).doubleValue();
				double right = ((Number)RightValue).doubleValue();
				if(Operator.Equals("+")) {
					return EvalCast(Type, left + right);
				}
				if(Operator.Equals("-")) {
					return EvalCast(Type, left - right);
				}
				if(Operator.Equals("*")) {
					return EvalCast(Type, left * right);
				}
				if(Operator.Equals("/")) {
					return EvalCast(Type, left / right);
				}
				if(Operator.Equals("%") || Operator.Equals("mod")) {
					return EvalCast(Type, left % right);
				}
				if(Operator.Equals("==")) {
					return EvalCast(Type, left == right);
				}
				if(Operator.Equals("!=")) {
					return EvalCast(Type, left != right);
				}
				if(Operator.Equals("<")) {
					return EvalCast(Type, left < right);
				}
				if(Operator.Equals("<=")) {
					return EvalCast(Type, left <= right);
				}
				if(Operator.Equals(">")) {
					return EvalCast(Type, left > right);
				}
				if(Operator.Equals(">=")) {
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
			if(Operator.Equals("==")) {
				return EvalCast(Type, left == right);
			}
			if(Operator.Equals("!=")) {
				return EvalCast(Type, left != right);
			}
			return null;
		}
		try {
			long left = ((Number)LeftValue).longValue();
			long right = ((Number)RightValue).longValue();
			if(Operator.Equals("+")) {
				return EvalCast(Type, left + right);
			}
			if(Operator.Equals("-")) {
				return EvalCast(Type, left - right);
			}
			if(Operator.Equals("*")) {
				return EvalCast(Type, left * right);
			}
			if(Operator.Equals("/")) {
				return EvalCast(Type, left / right);
			}
			if(Operator.Equals("%") || Operator.Equals("mod")) {
				return EvalCast(Type, left % right);
			}
			if(Operator.Equals("==")) {
				return EvalCast(Type, left == right);
			}
			if(Operator.Equals("!=")) {
				return EvalCast(Type, left != right);
			}
			if(Operator.Equals("<")) {
				return EvalCast(Type, left < right);
			}
			if(Operator.Equals("<=")) {
				return EvalCast(Type, left <= right);
			}
			if(Operator.Equals(">")) {
				return EvalCast(Type, left > right);
			}
			if(Operator.Equals(">=")) {
				return EvalCast(Type, left >= right);
			}
			if(Operator.Equals("|")) {
				return EvalCast(Type, left | right);
			}
			if(Operator.Equals("&")) {
				return EvalCast(Type, left & right);
			}
			if(Operator.Equals("<<")) {
				return EvalCast(Type, left << right);
			}
			if(Operator.Equals(">>")) {
				return EvalCast(Type, left >> right);
			}
			if(Operator.Equals("^")) {
				return EvalCast(Type, left ^ right);
			}
		}
		catch(ClassCastException e) {
		}
		return null;
	}

	public static object EvalGetter(GtType Type, object Value, string FieldName) {
		// TODO Auto-generated MethodInfo stub
		return null;
	}

}