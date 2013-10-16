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

using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Reflection;
using System.Text;
using System.Threading.Tasks;
using System.IO;


public abstract class LibGreenTea: GreenTeaConst {
	// LibGreenTea KonohaApi
	public /*final*/ static void print(object msg) {
		Console.WriteLine(msg);
	}

	public /*final*/ static void println(object msg) {
		Console.WriteLine(msg);
	}
	
	public /*final*/ static void Assert(bool TestResult) {
		if(!TestResult) {
			Debug.Assert(TestResult);
			Exit(1, "Assertion Failed");
		}
	}

	public /*final*/ static object NewArray(GtType Type, object[] InitSizes) {
		if(InitSizes.Length == 1) {
			return GreenTeaArray.NewArray1(Type.TypeParams[0], ((Number)InitSizes[0]).intValue());
		}
		else if(InitSizes.Length == 2) {
			return GreenTeaArray.NewArray2(Type.TypeParams[0].TypeParams[0], ((Number)InitSizes[0]).intValue(), ((Number)InitSizes[1]).intValue());
		}
		else {
			return GreenTeaArray.NewArray3(Type.TypeParams[0].TypeParams[0].TypeParams[0], ((Number)InitSizes[0]).intValue(), ((Number)InitSizes[1]).intValue(), ((Number)InitSizes[2]).intValue());
		}
		
	}

	public /*final*/ static object NewArrayLiteral(GtType ArrayType, object[] Values) {
		return GreenTeaArray.NewArrayLiteral(ArrayType, Values);		
	}

	public static object ApplyOverridedMethod(long FileLine, GtNameSpace NameSpace, GtFunc Func, object[] Arguments) {
		/*local*/GtType ClassType = NameSpace.Context.GuessType(Arguments[0]);
		Func = NameSpace.GetOverridedMethod(ClassType, Func);
		return Func.Apply(Arguments);
	}

    public static object DynamicCast(GtType CastType, object Value) {
		if(Value != null) {
			GtType FromType = CastType.Context.GuessType(Value);
			if(CastType == FromType || CastType.Accept(FromType)) {
				return Value;
			}
		}
		return null;
	}

	public static object InvokeDynamicFunc(long FileLine, GtType ContextType, GtNameSpace NameSpace, string FuncName, object[] Arguments) {
		/*local*/GtPolyFunc PolyFunc = NameSpace.GetPolyFunc(FuncName);
		/*local*/GtFunc Func = PolyFunc.GetMatchedFunc(NameSpace, Arguments);
		/*local*/object Value = ContextType.DefaultNullValue;
		if(Func != null) {
			Value = Func.Apply(Arguments);
			return LibGreenTea.DynamicCast(ContextType, Value);
		}
		LibGreenTea.VerboseLog(VerboseRuntime, PolyFunc.MessageTypeError(null, FuncName));
		return Value;
	}

	public static object InvokeDynamicMethod(long FileLine, GtType ContextType, GtNameSpace NameSpace, string FuncName, object[] Arguments) {
		/*local*/GtType ClassType = ContextType.Context.GuessType(Arguments[0]);
		/*local*/GtPolyFunc PolyFunc = NameSpace.GetMethod(ClassType, FuncName, true);
		/*local*/GtFunc Func = PolyFunc.GetMatchedFunc(NameSpace, Arguments);
		/*local*/object Value = ContextType.DefaultNullValue;
		if(Func != null) {
			Value = Func.Apply(Arguments);
			return LibGreenTea.DynamicCast(ContextType, Value);
		}
		LibGreenTea.VerboseLog(VerboseRuntime, PolyFunc.MessageTypeError(ClassType, FuncName));
		return Value;
	}

	
	
	public /*final*/ static string GetPlatform() {
        Type t = typeof(System.String);
		return "Java JVM-" + t.GetProperty("java.version");
	}

	public static bool DebugMode = false;

	private /*final*/ static string GetStackInfo(int depth) {
        //TODO
		string LineNumber = " ";
		StackTrace stackTrace = new StackTrace();
		StackFrame[] Elements = stackTrace.GetFrames();
		if(depth < Elements.Length) {
			StackFrame elem = Elements[depth];
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

	public /*final*/ static void VerboseException(Exception e) {
        //if(e is InvocationTargetException) {
        //    Exception cause = e.getCause();
        //    e = cause;
        //    if(cause is RuntimeException) {
        //        throw (RuntimeException)cause;
        //    }
        //    if(cause is Error) {
        //        throw (Error)cause;
        //    }
        //}
        //LibGreenTea.VerboseLog(GreenTeaUtils.VerboseException, e.ToString());
        //e.printStackTrace();
	}

	public /*final*/ static void Exit(int status, string Message) {
        Console.Error.WriteLine(Message);
		System.Environment.Exit(1);
	}

	private static int ParserCount = -1;
	
	public static int NewParserId() {
		ParserCount++;
		return ParserCount;
	}

	public /*final*/ static char CharAt(string Text, long Pos) {
		if(Pos < Text.Length) {
			return Text[(int)Pos];
		}
		return (char)0;
	}

	public /*final*/ static string SubString(string Text, long StartIdx, long EndIdx) {
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

	public /*final*/ static string Stringify(object Value) {
		if(Value == null) {
			return "null";
		}
		else if(Value is string) {
			return LibGreenTea.QuoteString(Value.ToString());
		}
		else {
			return Value.ToString();
		}
		//			/*local*/String s = "";
		//			Field[] Fields = Value.getClass().getFields();
		//			for(int i = 0; i < Fields.length; i++) {
		//				if(Modifier.isPublic(Fields[i].getModifiers())) {
		//					if(i > 0) {
		//						s += ", ";
		//					}
		//					try {
		//						s += Fields[i].getName() + ": ";
		//						s += LibGreenTea.Stringfy(Fields[i].get(Value));
		//					} catch (IllegalArgumentException e) {
		//					} catch (IllegalAccessException e) {
		//					}
		//				}
		//			}
		//			return "" + s + "}";
	}

	public /*final*/ static string StringifyField(object Value) {
        ///*local*/string s = "{";
        //Field[] Fields = Value.getClass().getFields();
        //for(int i = 0; i < Fields.Length; i++) {
        //    if(Modifier.isPublic(Fields[i].getModifiers())) {
        //        if(i > 0) {
        //            s += ", ";
        //        }
        //        try {
        //            s += Fields[i].getName() + ": ";
        //            s += LibGreenTea.Stringify(Fields[i][Value]);
        //        } catch (IllegalArgumentException e) {
        //        } catch (IllegalAccessException e) {
        //        }
        //    }
        //}
        //return s + "}";
        throw new NotImplementedException();
	}

	public /*final*/ static bool EqualsString(string s, string s2) {
		return s.Equals(s2);
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

	public /*final*/ static GtType GetNativeType(GtParserContext Context, object Value) {
        //GtType NativeType = null;
        //Type NativeClass = Value is Type ? (Type)Value : Value.getClass();
        //NativeType = (/*cast*/GtType) Context.ClassNameMap.GetOrNull(NativeClass.getCanonicalName());
        //if(NativeType == null) {
        //    NativeType = new GtType(Context, GreenTeaUtils.NativeType, NativeClass.getSimpleName(), null, NativeClass);
        //    Context.SetNativeTypeName(NativeClass.getCanonicalName(), NativeType);
        //    LibGreenTea.VerboseLog(GreenTeaUtils.VerboseNative, "creating native class: " + NativeClass.getSimpleName() + ", " + NativeClass.getCanonicalName());
        //}
        //return NativeType;
        throw new NotImplementedException();
	}

	public /*final*/ static string GetClassName(object Value) {
		return typeof(Value).Name;
	}

	private static bool AcceptJavaType(GtType GreenType, Type Type) {
		if(GreenType.IsVarType() || GreenType.IsTypeVariable()) {
			return true;
		}
		if(GreenType.IsTopType()) {
			return (Type == typeof(object));
		}
	    GtType JavaType = LibGreenTea.GetNativeType(GreenType.Context, Type);
		if(GreenType != JavaType) {
			if(GreenType.IsGenericType() && GreenType.HasTypeVariable()) {
				return GreenType.BaseType == JavaType.BaseType;
			}
			//System.err.println("*** " + JavaType + ", " + GreenType);
			return false;
		}
		return true;
	}
	
	public /*final*/ static bool MatchNativeMethod(GtType FuncType, MethodInfo JavaMethod) {
//		System.err.println("MethodInfo: " + JavaMethod);
//		/*local*/GtType ReturnType = FuncType.TypeParams[0];
//		System.err.println("return: " + ReturnType + ", " + JavaMethod.getReturnType());
		if(!AcceptJavaType(FuncType.TypeParams[0], JavaMethod.ReturnType)) {
			return false;
		}
		/*local*/int StartIndex = 2;
		if(JavaMethod.IsStatic) {
			StartIndex = 1;			
		}
		else {
//			GtType JavaRecvType = LibGreenTea.GetNativeType(Context, JavaMethod.getDeclaringClass());
//			System.err.println("recv: " + FuncType.TypeParams[1] + ", " + JavaRecvType);
			if(FuncType.TypeParams.Length == 1 || !AcceptJavaType(FuncType.TypeParams[1], JavaMethod.DeclaringType)) {
				return false;
			}
			StartIndex = 2;
		}
		/*local*/int ParamSize = FuncType.TypeParams.Length - StartIndex;
		/*local*/Type[] ParamTypes = JavaMethod.getParameterTypes();
		if(ParamTypes != null) {
//			System.err.println("params: " + ParamSize + ", " + ParamTypes.length);
			if(ParamTypes.Length != ParamSize) return false;
			for(int j = 0; j < ParamTypes.Length; j++) {
//				if(FuncType.TypeParams[StartIndex+j].IsVarType()) continue;
//				GtType JavaParamType = LibGreenTea.GetNativeType(Context, ParamTypes[j]);
//				System.err.println("param: " + FuncType.TypeParams[StartIndex+j] + ", " + JavaParamType);
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
		if(JavaMethod.IsStatic) {
			FuncFlag |= GreenTeaUtils.NativeStaticFunc;
		}
		NativeFunc.SetNativeMethod(FuncFlag, JavaMethod);
		return NativeFunc;
	}

	public /*final*/ static GtFunc ConvertNativeMethodToFunc(GtParserContext Context, MethodInfo JavaMethod) {
		/*local*/List<GtType> TypeList = new List<GtType>();
		TypeList.Add(LibGreenTea.GetNativeType(Context, JavaMethod.getReturnType()));
		if(!JavaMethod.IsStatic) {
			TypeList.Add(LibGreenTea.GetNativeType(Context, JavaMethod.getDeclaringClass()));
		}
		/*local*/Type[] ParamTypes = JavaMethod.getParameterTypes();
		if(ParamTypes != null) {
			for(int j = 0; j < ParamTypes.Length; j++) {
				TypeList.Add(LibGreenTea.GetNativeType(Context, ParamTypes[j]));
			}
		}
		return SetNativeMethod(new GtFunc(0, JavaMethod.getName(), 0, TypeList), JavaMethod);
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
		int Index = FullName.lastIndexOf(".");
		if(Index == -1) {
			return null;
		}
		try {
			/*local*/string FuncName = FullName.substring(Index+1);
			/*local*/Type NativeClass = LoadNativeClass(FullName.substring(0, Index));
			MethodInfo[] Methods = NativeClass.getDeclaredMethods();
			if(Methods != null) {
				for(int i = 0; i < Methods.Length; i++) {
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
		} catch (ClassNotFoundException e) {
				LibGreenTea.VerboseLog(GreenTeaUtils.VerboseException, e.ToString());			
		}
		return FoundMethod;
	}

	public /*final*/ static bool ImportNativeMethod(GtNameSpace NameSpace, GtFunc NativeFunc, string FullName) {
		MethodInfo JavaMethod = LibGreenTea.LoadNativeMethod(NativeFunc.GetFuncType(), FullName, false);
		if(JavaMethod != null) {
			LibGreenTea.SetNativeMethod(NativeFunc, JavaMethod);
			if(NativeFunc.GetReturnType().IsVarType()) {
				NativeFunc.SetReturnType(LibGreenTea.GetNativeType(NativeFunc.GetContext(), JavaMethod.getReturnType()));
			}
			int StartIdx = NativeFunc.Is(GreenTeaUtils.NativeStaticFunc) ? 1 : 2;
			Type[] p = JavaMethod.getParameterTypes();
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
	
	public /*final*/ static object ImportNativeObject(GtNameSpace NameSpace, string PackageName) {
		LibGreenTea.VerboseLog(VerboseNative, "importing " + PackageName);

		return null;
	}

	public /*final*/ static void LoadNativeConstructors(GtType ClassType, List<GtFunc> FuncList) {
		/*local*/bool TransformedResult = false;
		Type NativeClass = (Type)ClassType.TypeBody;
		GtParserContext Context = ClassType.Context;
		Constructor<?>[] Constructors = NativeClass.getDeclaredConstructors();
		if(Constructors != null) {
			for(int i = 0; i < Constructors.Length; i++) {
				if(!Modifier.isPublic(Constructors[i].getModifiers())) {
					continue;
				}
				/*local*/List<GtType> TypeList = new List<GtType>();
				TypeList.Add(ClassType);
				/*local*/Type[] ParamTypes = Constructors[i].getParameterTypes();
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
		try {
			Type NativeClass = (Type)ClassType.TypeBody;
			Field NativeField = NativeClass.GetField(FieldName);
			if(Modifier.isPublic(NativeField.getModifiers())) {
				List<GtType> TypeList = new List<GtType>();
				TypeList.Add(LibGreenTea.GetNativeType(Context, NativeField.getType()));
				TypeList.Add(ClassType);
				GtFunc GetterNativeFunc = new GtFunc(GetterFunc, FieldName, 0, TypeList);
				GetterNativeFunc.SetNativeMethod(0, NativeField);
				Context.RootNameSpace.SetGetterFunc(ClassType, FieldName, GetterNativeFunc, null);
				TypeList.Clear();
				TypeList.Add(Context.VoidType);
				TypeList.Add(ClassType);
				TypeList.Add(LibGreenTea.GetNativeType(Context, NativeField.getType()));
				GtFunc SetterNativeFunc = new GtFunc(SetterFunc, FieldName, 0, TypeList);
				SetterNativeFunc.SetNativeMethod(0, NativeField);
				Context.RootNameSpace.SetSetterFunc(ClassType, FieldName, SetterNativeFunc, null);
				return GetSetter ? SetterNativeFunc : GetterNativeFunc;
			}
		} catch (SecurityException e) {
			LibGreenTea.VerboseException(e);
		} catch (NoSuchFieldException e) {
		}
		Context.RootNameSpace.SetUndefinedSymbol(GreenTeaUtils.ClassSymbol(ClassType, GreenTeaUtils.GetterSymbol(FieldName)), null);
		Context.RootNameSpace.SetUndefinedSymbol(GreenTeaUtils.ClassSymbol(ClassType, GreenTeaUtils.SetterSymbol(FieldName)), null); // for setter
		return null;
	}

	public static object NativeFieldValue(object ObjectValue, Field NativeField) {
		try {
			Type NativeType = NativeField.getType();
			if(NativeType == typeof(long) || NativeType == typeof(int) || NativeType == typeof(short) || NativeType == typeof(byte)) {
				return NativeField.getLong(ObjectValue);
			}
			if(NativeType == typeof(double) || NativeType == typeof(float)) {
				return NativeField.getDouble(ObjectValue);
			}
			if(NativeType == typeof(bool)) {
				return NativeField.getBoolean(ObjectValue);
			}
			if(NativeType == typeof(char)) {
				return string.valueOf(NativeField.getChar(ObjectValue));
			}
			return NativeField[ObjectValue];
		} catch (IllegalAccessException e) {
			LibGreenTea.VerboseException(e);
		} catch (SecurityException e) {
			LibGreenTea.VerboseException(e);
		}
		return null;
	}

	public static object NativeFieldGetter(object ObjectValue, Field NativeField) {
		try {
			Type NativeType = NativeField.getType();
//			if(NativeType == long.class || NativeType == int.class || NativeType == short.class || NativeType == byte.class) {
//				return NativeField.getLong(ObjectValue);
//			}
//			if(NativeType == double.class || NativeType == float.class) {
//				return NativeField.getDouble(ObjectValue);
//			}
//			if(NativeType == boolean.class) {
//				return NativeField.getBoolean(ObjectValue);
//			}
//			if(NativeType == char.class) {
//				return String.valueOf(NativeField.getChar(ObjectValue));
//			}
			return NativeField[ObjectValue];
		} catch (IllegalAccessException e) {
			LibGreenTea.VerboseException(e);
		} catch (SecurityException e) {
			LibGreenTea.VerboseException(e);
		}
		return null;
	}

	public static object NativeFieldSetter(object ObjectValue, Field NativeField, object Value) {
		try {
//			Type NativeType = NativeField.getType();
//			if(NativeType == long.class || NativeType == int.class || NativeType == short.class || NativeType == byte.class) {
//				return NativeField.getLong(ObjectValue);
//			}
//			if(NativeType == double.class || NativeType == float.class) {
//				return NativeField.getDouble(ObjectValue);
//			}
//			if(NativeType == boolean.class) {
//				return NativeField.getBoolean(ObjectValue);
//			}
//			if(NativeType == char.class) {
//				return String.valueOf(NativeField.getChar(ObjectValue));
//			}
			NativeField.set(ObjectValue, Value);
		} catch (IllegalAccessException e) {
			LibGreenTea.VerboseException(e);
		} catch (SecurityException e) {
			LibGreenTea.VerboseException(e);
		}
		return Value;
	}

	public static object ImportStaticObject(GtParserContext Context, Type NativeClass, string Symbol) {
		try {
			Field NativeField = NativeClass.getField(Symbol);
			if(Modifier.isStatic(NativeField.getModifiers())) {
				return NativeFieldValue(null, NativeField);
			}
		} catch (NoSuchFieldException e) {
//			LibGreenTea.VerboseException(e);
		}
		GtPolyFunc PolyFunc = new GtPolyFunc(null);
		MethodInfo[] Methods = NativeClass.getMethods();
		for(int i = 0; i < Methods.Length; i++) {
			if(Methods[i].getName().Equals(Symbol) && Modifier.isStatic(Methods[i].getModifiers())) {
				PolyFunc.Append(LibGreenTea.ConvertNativeMethodToFunc(Context, Methods[i]), null);
			}
		}
		if(PolyFunc.FuncList.Count() == 1) {
			return PolyFunc.FuncList[0];
		}
		else if(PolyFunc.FuncList.Count() != 0) {
			return PolyFunc;
		}
		return null;
	}

	public static object LoadNativeStaticFieldValue(GtType ClassType, string Symbol) {
		return ImportStaticObject(ClassType.Context, (Type)ClassType.TypeBody, Symbol);
	}
	
	public /*final*/ static void LoadNativeMethods(GtType ClassType, string FuncName, List<GtFunc> FuncList) {
		GtParserContext Context = ClassType.Context;
		Type NativeClass = (Type)ClassType.TypeBody;
		MethodInfo[] Methods = NativeClass.getDeclaredMethods();
		/*local*/bool FoundMethod = false;
		if(Methods != null) {
			for(int i = 0; i < Methods.Length; i++) {
				if(LibGreenTea.EqualsString(FuncName, Methods[i].getName())) {
					if(!Modifier.isPublic(Methods[i].getModifiers())) {
						continue;
					}
					GtFunc NativeFunc = LibGreenTea.ConvertNativeMethodToFunc(Context, Methods[i]);
					Context.RootNameSpace.AppendMethod(NativeFunc, null);
					FuncList.Add(NativeFunc);
					FoundMethod = true;
				}
			}
		}
		if(!FoundMethod) {
			Context.RootNameSpace.SetUndefinedSymbol(GreenTeaUtils.ClassSymbol(ClassType, FuncName), null);
		}
	}

	public /*final*/ static MethodInfo LookupNativeMethod(object Callee, string FuncName) {
		if(FuncName != null) {
			// LibGreenTea.DebugP("looking up MethodInfo : " + Callee.getClass().getSimpleName() + "." + FuncName);
			MethodInfo[] methods = Callee.getClass().getMethods();
			for(int i = 0; i < methods.Length; i++) {
				if(FuncName.Equals(methods[i].getName())) {
					return methods[i];
				}
			}
			LibGreenTea.VerboseLog(GreenTeaUtils.VerboseUndefined, "undefined MethodInfo: " + Callee.getClass().getSimpleName() + "." + FuncName);
		}
		return null;
	}

	public /*final*/ static object ApplyFunc(GtFunc Func, object Self, object[] Params) {
		try {
//			System.err.println("** debug: " + Func.FuncBody);
//			System.err.println("** debug: " + Self + ", Params.length=" + Params.length);
			return ((MethodInfo)Func.FuncBody).invoke(Self, Params);
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

	public /*final*/ static object ApplyFunc1(GtFunc Func, object Self, object Param) {
		try {
			return ((MethodInfo)Func.FuncBody).invoke(Self, Param);
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

	public /*final*/ static object ApplyFunc2(GtFunc Func, object Self, object Param1, object Param2) {
		try {
			return ((MethodInfo)Func.FuncBody).invoke(Self, Param1, Param2);
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

	public /*final*/ static object ApplyFunc3(GtFunc Func, object Self, object Param1, object Param2, object Param3) {
		try {
			return ((MethodInfo)Func.FuncBody).invoke(Self, Param1, Param2, Param3);
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
			return ((MethodInfo)Func.FuncBody).invoke(Self, Param1, Param2, Param3, Param4);
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
		/*local*/Iterator<string> itr = Map.Map.keySet().iterator();
		/*local*/int i = 0;
		while(itr.hasNext()) {
			string Key = itr.next();
			if(Prefix != null && !Key.StartsWith(Prefix)) {
				continue;
			}
			List.Add(Key);
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
		Console.WriteLine("  --require|-r LIBRARY     Load the library");
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
		else if(Extension.endsWith(".scala")) {
			return "scala";
		}
		else if(Extension.endsWith(".c")) {
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
		TargetCode = TargetCode.toLowerCase();
		if(TargetCode.StartsWith("js") || TargetCode.StartsWith("javascript")) {
			return new JavaScriptSourceGenerator(TargetCode, OutputFile, GeneratorFlag);
		}
		else if(TargetCode.StartsWith("pl") || TargetCode.StartsWith("perl")) {
			return new PerlSourceGenerator(TargetCode, OutputFile, GeneratorFlag);
		}
		else if(TargetCode.StartsWith("python")) {
			return new PythonSourceGenerator(TargetCode, OutputFile, GeneratorFlag);
		}
		else if(TargetCode.StartsWith("bash")) {
			return new BashSourceGenerator(TargetCode, OutputFile, GeneratorFlag);
		}
		else if(TargetCode.StartsWith("scala")) {
			return new ScalaSourceGenerator(TargetCode, OutputFile, GeneratorFlag);
		}
		else if(TargetCode.StartsWith("c")) {
			return new CSourceGenerator(TargetCode, OutputFile, GeneratorFlag);
		}
		else if(TargetCode.StartsWith("exe")) {
			return new JavaByteCodeGenerator(TargetCode, OutputFile, GeneratorFlag);
		}
		return null;
	}

	public /*final*/ static void WriteCode(string OutputFile, string SourceCode) {
		if(OutputFile == null) {
			//LibGreenTea.Eval(SourceCode);
		}
		if(OutputFile.Equals("-")) {
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
	private static java.io.BufferedReader Reader = null;
	private static bool ConsoleInitialized = false;
	
    //static private string ReadLine(string format, object... args) {
    //    if(!ConsoleInitialized){
    //        Console = System.console();
    //        if (Console == null) {
    //            Reader = new BufferedReader(new InputStreamReader(System.in));
    //        }
    //        ConsoleInitialized = true;
    //    }
    //    if (Console != null) {
    //        return System.console().readLine(format, args);
    //    }
    //    System.out.print(string.format(format, args));
    //    try {
    //        return Reader.readLine();
    //    } catch (IOException e) {
    //        e.printStackTrace();
    //        return "";
    //    }
    //}

	public /*final*/ static string ReadLine(string Prompt, string Prompt2) {
		string Line = LibGreenTea.ReadLine(Prompt);
		if(Line == null) {
			System.exit(0);
		}
		if(Prompt2 != null) {
			int level = 0;
			while((level = LibGreenTea.CheckBraceLevel(Line)) > 0) {
				string Line2 = LibGreenTea.ReadLine(Prompt2 + GreenTeaUtils.JoinStrings("  ", level));
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

	public /*final*/ static string ReadLine2(string Prompt, string Prompt2) {
		if(ConsoleReader == null) {
			try {
				ConsoleReader = new jline.console.ConsoleReader();
				ConsoleReader.setExpandEvents(false);
			} catch (IOException e) {
				throw new RuntimeException(e);
			}
		}
		string Line;
		try {
			Line = ConsoleReader.readLine(Prompt);
		} catch (IOException e) {
			throw new RuntimeException(e);
		}
		if(Line == null) {
			System.exit(0);
		}
		if(Prompt2 != null) {
			int level = 0;
			while((level = LibGreenTea.CheckBraceLevel(Line)) > 0) {
				string Line2;
				try {
					Line2 = ConsoleReader.readLine(Prompt2 + GreenTeaUtils.JoinStrings("  ", level));
				} catch (IOException e) {
					throw new RuntimeException(e);
				}
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
				builder.Append(buf, 0, readed);
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

	
	public static bool booleanValue(object Value) {
		return ((Boolean)Value).booleanValue();
	}
	
	public static object DynamicCast(GtType CastType, object Value) {
		if(Value != null) {
			GtType FromType = CastType.Context.GuessType(Value);
			if(CastType == FromType || CastType.Accept(FromType)) {
				return Value;
			}
		}
		return null;
	}

	public static object DynamicInstanceOf(object Value, GtType Type) {
		if(Value != null) {
			GtType ValueType = Type.Context.GuessType(Value);
			if(ValueType == Type || Type.Accept(ValueType)) {
				return true;
			}
		}
		return false;
	}

	public /*final*/ static object DynamicConvertTo(GtType CastType, object Value) {
		if(Value != null) {
			GtType ValueType = CastType.Context.GuessType(Value);
			if(ValueType == CastType || CastType.Accept(ValueType)) {
				return Value;
			}
			GtFunc Func = CastType.Context.RootNameSpace.GetConverterFunc(ValueType, CastType, true);
			if(Func != null) {
				return LibGreenTea.ApplyFunc2(Func, null, CastType, Value);
			}
		}
		return null;
	}
	
	public static object EvalUnary(GtType Type, string Operator, object Value) {
		if(Value is Boolean) {
			if(Operator.Equals("!") || Operator.Equals("not")) {
				return DynamicCast(Type, !((Boolean)Value).booleanValue());
			}
			return null;
		}
		if(Value is Long || Value is int  || Value is Short) {
			if(Operator.Equals("-")) {
				return DynamicCast(Type, -((Number)Value).longValue());
			}
			if(Operator.Equals("+")) {
				return DynamicCast(Type, +((Number)Value).longValue());
			}
			if(Operator.Equals("~")) {
				return DynamicCast(Type, ~((Number)Value).longValue());
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
			string left = DynamicCast(Type.Context.StringType, LeftValue).ToString();
			string right = DynamicCast(Type.Context.StringType, RightValue).ToString();
			if(Operator.Equals("+")) {
				return  DynamicCast(Type, left + right);
			}
		}
		if(LeftValue is string && RightValue is string) {
			string left = DynamicCast(Type.Context.StringType, LeftValue).ToString();
			string right = DynamicCast(Type.Context.StringType, RightValue).ToString();
			if(Operator.Equals("==")) {
				return  DynamicCast(Type, left.Equals(right));
			}
			if(Operator.Equals("!=")) {
				return DynamicCast(Type, !left.Equals(right));
			}
			if(Operator.Equals("<")) {
				return DynamicCast(Type, left.compareTo(right) < 0);
			}
			if(Operator.Equals("<=")) {
				return DynamicCast(Type, left.compareTo(right) <= 0);
			}
			if(Operator.Equals(">")) {
				return DynamicCast(Type, left.compareTo(right) > 0);
			}
			if(Operator.Equals(">=")) {
				return DynamicCast(Type, left.compareTo(right) >= 0);
			}
			return null;
		}
		if(LeftValue is Double || LeftValue is Float || RightValue is Double || RightValue is Float) {
			try {
				double left = ((Number)LeftValue).doubleValue();
				double right = ((Number)RightValue).doubleValue();
				if(Operator.Equals("+")) {
					return DynamicCast(Type, left + right);
				}
				if(Operator.Equals("-")) {
					return DynamicCast(Type, left - right);
				}
				if(Operator.Equals("*")) {
					return DynamicCast(Type, left * right);
				}
				if(Operator.Equals("/")) {
					return DynamicCast(Type, left / right);
				}
				if(Operator.Equals("%") || Operator.Equals("mod")) {
					return DynamicCast(Type, left % right);
				}
				if(Operator.Equals("==")) {
					return DynamicCast(Type, left == right);
				}
				if(Operator.Equals("!=")) {
					return DynamicCast(Type, left != right);
				}
				if(Operator.Equals("<")) {
					return DynamicCast(Type, left < right);
				}
				if(Operator.Equals("<=")) {
					return DynamicCast(Type, left <= right);
				}
				if(Operator.Equals(">")) {
					return DynamicCast(Type, left > right);
				}
				if(Operator.Equals(">=")) {
					return DynamicCast(Type, left >= right);
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
				return DynamicCast(Type, left == right);
			}
			if(Operator.Equals("!=")) {
				return DynamicCast(Type, left != right);
			}
			return null;
		}
		try {
			long left = ((Number)LeftValue).longValue();
			long right = ((Number)RightValue).longValue();
			if(Operator.Equals("+")) {
				return DynamicCast(Type, left + right);
			}
			if(Operator.Equals("-")) {
				return DynamicCast(Type, left - right);
			}
			if(Operator.Equals("*")) {
				return DynamicCast(Type, left * right);
			}
			if(Operator.Equals("/")) {
				return DynamicCast(Type, left / right);
			}
			if(Operator.Equals("%") || Operator.Equals("mod")) {
				return DynamicCast(Type, left % right);
			}
			if(Operator.Equals("==")) {
				return DynamicCast(Type, left == right);
			}
			if(Operator.Equals("!=")) {
				return DynamicCast(Type, left != right);
			}
			if(Operator.Equals("<")) {
				return DynamicCast(Type, left < right);
			}
			if(Operator.Equals("<=")) {
				return DynamicCast(Type, left <= right);
			}
			if(Operator.Equals(">")) {
				return DynamicCast(Type, left > right);
			}
			if(Operator.Equals(">=")) {
				return DynamicCast(Type, left >= right);
			}
			if(Operator.Equals("|")) {
				return DynamicCast(Type, left | right);
			}
			if(Operator.Equals("&")) {
				return DynamicCast(Type, left & right);
			}
			if(Operator.Equals("<<")) {
				return DynamicCast(Type, left << right);
			}
			if(Operator.Equals(">>")) {
				return DynamicCast(Type, left >> right);
			}
			if(Operator.Equals("^")) {
				return DynamicCast(Type, left ^ right);
			}
		}
		catch(ClassCastException e) {
		}
		return null;
	}



//	public static Object EvalGetter(GtType Type, Object Value, String FieldName) {
//		// TODO Auto-generated MethodInfo stub
//		return null;
//	}

}
