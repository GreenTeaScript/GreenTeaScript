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
using System.Collections;



public abstract class LibGreenTea: GreenTeaConsts {
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
			return GreenTeaArray.NewArray1(Type.TypeParams[0], (int)InitSizes[0]);
		}
		else if(InitSizes.Length == 2) {
			return GreenTeaArray.NewArray2(Type.TypeParams[0].TypeParams[0],(int)InitSizes[0], (int)InitSizes[1]);
		}
		else {
			return GreenTeaArray.NewArray3(Type.TypeParams[0].TypeParams[0].TypeParams[0],(int)InitSizes[0], (int)InitSizes[1], (int)InitSizes[2]);
		}
		
	}

	public /*final*/ static object NewArrayLiteral(GtType ArrayType, object[] Values) {
		return GreenTeaArray.NewArrayLiteral(ArrayType, Values);		
	}

    public /*final*/ class GtMap {
	    Hashtable Map = new Hashtable();

	    public GtMap() {
		    this.Map = new Hashtable();
	    }

	    public /*final*/ void put(String Key, Object Value) {
		    this.Map.Add(Key, Value);
	    }

	    public /*final*/ Object GetOrNull(String Key) {
		    return this.Map[Key];
	    }
    }

    public static object DynamicCast(GtType CastType, object Value)
    {
        if (Value != null)
        {
            GtType FromType = GtStaticTable.GuessType(Value);
            if (CastType == FromType || CastType.Accept(FromType))
            {
                return Value;
            }
        }
        return null;
    }

    	public /*final*/ static Object InvokeFunc(GtFunc Func, Object[] Params) {
		if(Func == null || Func.IsAbstract()) {
			LibGreenTea.VerboseLog(VerboseRuntime, "applying abstract function: " + Func);
			return Func.GetReturnType().DefaultNullValue;
		}
		else if(Func.Is(NativeMethodFunc)) {
			/*local*/Object[] MethodArguments = new Object[Params.Length-1];
			LibGreenTea.ArrayCopy(Params, 1, MethodArguments, 0, MethodArguments.Length);
			return LibGreenTea.ApplyMethod(Func, Params[0], MethodArguments);
		}
		return LibGreenTea.ApplyMethod(Func, null, Params);
	}


	public static object InvokeOverridedMethod(long FileLine, GtNameSpace NameSpace, GtFunc Func, object[] Arguments) {
        /*local*/GtType ClassType = GtStaticTable.GuessType(Arguments[0]);
		Func = NameSpace.GetOverridedMethod(ClassType, Func);
		return LibGreenTea.InvokeFunc(Func, Arguments);
	}

	public static object InvokeDynamicFunc(long FileLine, GtType ContextType, GtNameSpace NameSpace, string FuncName, object[] Arguments) {
		/*local*/GtPolyFunc PolyFunc = NameSpace.GetPolyFunc(FuncName);
		/*local*/GtFunc Func = PolyFunc.GetMatchedFunc(NameSpace, Arguments);
		/*local*/object Value = ContextType.DefaultNullValue;
		if(Func != null) {
			Value = LibGreenTea.InvokeFunc(Func, Arguments);
			return LibGreenTea.DynamicCast(ContextType, Value);
		}
        LibGreenTea.VerboseLog(VerboseRuntime, PolyFunc.FormatTypeErrorMessage("function", null, FuncName));
		return Value;
	}

	public static object InvokeDynamicMethod(long FileLine, GtType ContextType, GtNameSpace NameSpace, string FuncName, object[] Arguments) {
        /*local*/GtType ClassType = GtStaticTable.GuessType(Arguments[0]);
		/*local*/GtPolyFunc PolyFunc = NameSpace.GetMethod(ClassType, FuncName, true);
		/*local*/GtFunc Func = PolyFunc.GetMatchedFunc(NameSpace, Arguments);
		/*local*/object Value = ContextType.DefaultNullValue;
		if(Func != null) {
			Value = LibGreenTea.InvokeFunc(Func, Arguments);
			return LibGreenTea.DynamicCast(ContextType, Value);
		}
        LibGreenTea.VerboseLog(VerboseRuntime, PolyFunc.FormatTypeErrorMessage("function", null, FuncName));
		return Value;
	}

    public static Object DynamicGetter(Object RecvObject, String FieldName)
    {
        try
        {
            FieldInfo JavaField = RecvObject.GetType().GetField(FieldName);
            return JavaField.GetValue(RecvObject);
        }
        catch (Exception e)
        {
            LibGreenTea.VerboseException(e);
        }
        return null;
    }

    public static Object DynamicSetter(Object RecvObject, String FieldName, Object Value)
    {
        try
        {
            FieldInfo JavaField = RecvObject.GetType().GetField(FieldName);
            JavaField.SetValue(RecvObject, Value);
            return JavaField.GetValue(RecvObject);
        }
        catch (Exception e)
        {
            LibGreenTea.VerboseException(e);
        }
        return null;
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
        //    if(cause is SystemException) {
        //        throw (SystemException)cause;
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
		//			FieldInfo[] Fields = Value.getClass().getFields();
		//			for(int i = 0; i < Fields.length; i++) {
		//				if(Modifier.isPublic(Fields[i].getModifiers())) {
		//					if(i > 0) {
		//						s += ", ";
		//					}
		//					try {
		//						s += Fields[i].Name + ": ";
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
        //FieldInfo[] Fields = Value.getClass().getFields();
        //for(int i = 0; i < Fields.Length; i++) {
        //    if(Modifier.isPublic(Fields[i].getModifiers())) {
        //        if(i > 0) {
        //            s += ", ";
        //        }
        //        try {
        //            s += Fields[i].Name + ": ";
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
        catch (FormatException e)
        {
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
        return Value.GetType().Name;
    }

    public /*final*/ static void ArrayCopy(object[] src, int srcPos, object[] dest, int destPos, int length) {
        Array.Copy(src, srcPos, dest, destPos, length);
	}

	private static bool AcceptJavaType(GtType GreenType, Type Type) {
		if(GreenType.IsVarType() || GreenType.IsTypeVariable()) {
			return true;
		}
		if(GreenType.IsTopType()) {
			return (Type == typeof(object));
		}
        GtType JavaType = GtStaticTable.GetNativeType(Type);
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
//			GtType JavaRecvType = LibGreenTea.GetNativeType(Context, JavaMethod.DeclaringType);
//			System.err.println("recv: " + FuncType.TypeParams[1] + ", " + JavaRecvType);
			if(FuncType.TypeParams.Length == 1 || !AcceptJavaType(FuncType.TypeParams[1], JavaMethod.DeclaringType)) {
				return false;
			}
			StartIndex = 2;
		}
		/*local*/int ParamSize = FuncType.TypeParams.Length - StartIndex;
		/*local*/Type[] ParamTypes = JavaMethod.GetParameterTypes();
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
			FuncFlag |= GreenTeaUtils.NativeMethodFunc;
		}
		NativeFunc.SetNativeMethod(FuncFlag, JavaMethod);
		return NativeFunc;
	}

	public /*final*/ static GtFunc ConvertNativeMethodToFunc(GtParserContext Context, MethodInfo JavaMethod) {
		/*local*/List<GtType> TypeList = new List<GtType>();
		TypeList.Add(LibGreenTea.GetNativeType(Context, JavaMethod.ReturnType));
		if(!JavaMethod.IsStatic) {
			TypeList.Add(LibGreenTea.GetNativeType(Context, JavaMethod.DeclaringType));
		}
		/*local*/Type[] ParamTypes = JavaMethod.GetParameterTypes();
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
                        if((Methods[i].Attributes & MethodAttributes.Public) == 0) {
							continue;
						}
						if(StaticMethodOnly && (Methods[i].Attributes & MethodAttributes.Static) == 0) {
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
        }
        catch (Exception e){
			LibGreenTea.VerboseLog(GreenTeaUtils.VerboseException, e.ToString());			
		}
		return FoundMethod;
	}

	public /*final*/ static bool ImportNativeMethod(GtNameSpace NameSpace, GtFunc NativeFunc, string FullName) {
		MethodInfo JavaMethod = LibGreenTea.LoadNativeMethod(NativeFunc.GetFuncType(), FullName, false);
		if(JavaMethod != null) {
			LibGreenTea.SetNativeMethod(NativeFunc, JavaMethod);
			if(NativeFunc.GetReturnType().IsVarType()) {
                NativeFunc.SetReturnType(GtStaticTable.GetNativeType(JavaMethod.ReturnType));
			}
			int StartIdx = NativeFunc.Is(GreenTeaUtils.NativeMethodFunc) ? 1 : 2;
			Type[] p = JavaMethod.GetParameterTypes();
			for(int i = 0; i < p.Length; i++) {
				if(NativeFunc.Types[StartIdx + i].IsVarType()) {
                    NativeFunc.Types[StartIdx + i] = GtStaticTable.GetNativeType(p[i]);
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

    public /*final*/ static void LoadNativeConstructors(GtParserContext Context, GtType ClassType, List<GtFunc> FuncList)
    {
		/*local*/bool TransformedResult = false;
		Type NativeClass = (Type)ClassType.TypeBody;
		//GtParserContext Context = ClassType.Context;
        var Constructors = NativeClass.GetConstructors();
		if(Constructors != null) {
			for(int i = 0; i < Constructors.Length; i++) {
				if((Constructors[i].Attributes & MethodAttributes.Public) == 0) {
					continue;
				}
				/*local*/List<GtType> TypeList = new List<GtType>();
				TypeList.Add(ClassType);
				/*local*/Type[] ParamTypes = Constructors[i].GetParameterTypes();
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

    public /*final*/ static GtFunc LoadNativeField(GtParserContext Context, GtType ClassType, String FieldName, Boolean GetSetter)
    {
		//GtParserContext Context = ClassType.Context;
        try
        {
            Type NativeClass = (Type)ClassType.TypeBody;
            FieldInfo NativeField = NativeClass.GetField(FieldName);
            if ((FieldAttributes.Public & NativeField.Attributes) != 0)
            {
                List<GtType> TypeList = new List<GtType>();
                TypeList.Add(LibGreenTea.GetNativeType(Context, NativeField.GetType()));
                TypeList.Add(ClassType);
                GtFunc GetterNativeFunc = new GtFunc(GetterFunc, FieldName, 0, TypeList);
                GetterNativeFunc.SetNativeMethod(0, NativeField);
                Context.RootNameSpace.SetGetterFunc(ClassType, FieldName, GetterNativeFunc, null);
                TypeList.Clear();
                TypeList.Add(GtStaticTable.VoidType);
                TypeList.Add(ClassType);
                TypeList.Add(GtStaticTable.GetNativeType(NativeField.GetType()));
                GtFunc SetterNativeFunc = new GtFunc(SetterFunc, FieldName, 0, TypeList);
                SetterNativeFunc.SetNativeMethod(0, NativeField);
                Context.RootNameSpace.SetSetterFunc(ClassType, FieldName, SetterNativeFunc, null);
                return GetSetter ? SetterNativeFunc : GetterNativeFunc;
            }
        }
        catch (System.Security.SecurityException e)
        {
            //SecurityException
            LibGreenTea.VerboseException(e);
        }
        catch (MissingFieldException e)
        {
        }
		Context.RootNameSpace.SetUndefinedSymbol(GreenTeaUtils.ClassSymbol(ClassType, GreenTeaUtils.GetterSymbol(FieldName)), null);
		Context.RootNameSpace.SetUndefinedSymbol(GreenTeaUtils.ClassSymbol(ClassType, GreenTeaUtils.SetterSymbol(FieldName)), null); // for setter
		return null;
	}

	public static object NativeFieldValue(object ObjectValue, FieldInfo NativeField) {
		try {
			Type NativeType = NativeField.GetType();
			if(NativeType == typeof(long) || NativeType == typeof(int) || NativeType == typeof(short) || NativeType == typeof(byte)) {
				return NativeField.GetValue(ObjectValue);
			}
			if(NativeType == typeof(double) || NativeType == typeof(float)) {
				return NativeField.GetValue(ObjectValue);
			}
			if(NativeType == typeof(bool)) {
				return NativeField.GetValue(ObjectValue);
			}
			if(NativeType == typeof(char)) {
                //return string.valueOf(NativeField.GetValue(ObjectValue));
                return (NativeField.GetValue(ObjectValue)).ToString();
			}
            return NativeField.GetValue(ObjectValue);
        }
        //catch (IllegalAccessException e)
        //{
        //    LibGreenTea.VerboseException(e);
        //}
        //catch (SecurityException e)
        //{
        //    LibGreenTea.VerboseException(e);
        //}
        catch (Exception e)
        {
            LibGreenTea.VerboseException(e);
        }
		return null;
	}

    public static Object NativeFieldGetter(Object ObjectValue, FieldInfo NativeField)
    {
        try{
            //Class<?> NativeType = NativeField.getType();
            return NativeField.GetValue(ObjectValue);
        //}catch (IllegalAccessException e){
        //    LibGreenTea.VerboseException(e);
        //}catch (SecurityException e){
        //    LibGreenTea.VerboseException(e);
        //}
        }catch (Exception e){
            LibGreenTea.VerboseException(e);
        }
        return null;
    }

    public static Object NativeFieldSetter(Object ObjectValue, FieldInfo NativeField, Object Value)
    {
        try{
            NativeField.SetValue(ObjectValue, Value);
            //}catch (IllegalAccessException e){
            //    LibGreenTea.VerboseException(e);
            //}catch (SecurityException e){
            //    LibGreenTea.VerboseException(e);
            //}
        }
        catch (Exception e){
            LibGreenTea.VerboseException(e);
        }
        return Value;
    }

	public static object ImportStaticObject(GtParserContext Context, Type NativeClass, string Symbol) {
		try {
			FieldInfo NativeField = NativeClass.GetField(Symbol);
			if((FieldAttributes.Static & NativeField.Attributes) == 0) {
				return NativeFieldValue(null, NativeField);
			}
		} catch (Exception e) {
            //NoSuchFieldException
            //LibGreenTea.VerboseException(e);
		}
		GtPolyFunc PolyFunc = new GtPolyFunc(null);
		MethodInfo[] Methods = NativeClass.GetMethods();
		for(int i = 0; i < Methods.Length; i++) {
			if(Methods[i].Name.Equals(Symbol) && (Methods[i].Attributes & MethodAttributes.Static) == 0) {
                PolyFunc.Append(Context, LibGreenTea.ConvertNativeMethodToFunc(Context, Methods[i]), null);
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

    public static object LoadNativeStaticFieldValue(GtParserContext Context, GtType ClassType, String Symbol)
    {
		return ImportStaticObject(Context, (Type)ClassType.TypeBody, Symbol);
	}

    public /*final*/ static void LoadNativeMethods(GtParserContext Context, GtType ClassType, String FuncName, List<GtFunc> FuncList)
    {
		//GtParserContext Context = ClassType.Context;
		Type NativeClass = (Type)ClassType.TypeBody;
		MethodInfo[] Methods = NativeClass.GetMethods();
		/*local*/bool FoundMethod = false;
		if(Methods != null) {
			for(int i = 0; i < Methods.Length; i++) {
				if(LibGreenTea.EqualsString(FuncName, Methods[i].Name)) {
					if((Methods[i].Attributes & MethodAttributes.Public) == 0) {
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

	public /*final*/ static object ApplyMethod(GtFunc Func, object Self, object[] Params) {
		try {
//			System.err.println("** debug: " + Func.FuncBody);
//			System.err.println("** debug: " + Self + ", Params.length=" + Params.length);
			return ((MethodInfo)Func.FuncBody).Invoke(Self, Params);
		}
        //catch (InvocationTargetException e) {
        //    LibGreenTea.VerboseException(e);
        //}
        //catch (IllegalArgumentException e) {
        //    LibGreenTea.VerboseException(e);
        //}
        //catch (IllegalAccessException e) {
        //    LibGreenTea.VerboseException(e);
        //}
        catch (Exception e) {
			LibGreenTea.VerboseException(e);
		}		
		return null;
	}

	public /*final*/ static object ApplyMethod1(GtFunc Func, object Self, object[] Param) {
		try {
			return ((MethodInfo)Func.FuncBody).Invoke(Self, Param);
		}
        //catch (InvocationTargetException e) {
        //    LibGreenTea.VerboseException(e);
        //}
        //catch (IllegalArgumentException e) {
        //    LibGreenTea.VerboseException(e);
        //}
        //catch (IllegalAccessException e) {
        //    LibGreenTea.VerboseException(e);
        //}
        catch (Exception e){
            LibGreenTea.VerboseException(e);
        }		
		return null;
	}

	public /*final*/ static object ApplyMethod2(GtFunc Func, object Self, object Param1, object Param2) {
		try {
            return ((MethodInfo)Func.FuncBody).Invoke(Self, new Object[] { Param1, Param2 });
		}
        //catch (InvocationTargetException e) {
        //    LibGreenTea.VerboseException(e);
        //}
        //catch (IllegalArgumentException e) {
        //    LibGreenTea.VerboseException(e);
        //}
        //catch (IllegalAccessException e) {
        //    LibGreenTea.VerboseException(e);
        //}
        catch (Exception e){
            LibGreenTea.VerboseException(e);
        }		
		return null;
	}

	public /*final*/ static object ApplyMethod3(GtFunc Func, object Self, object Param1, object Param2, object Param3) {
		try {
            return ((MethodInfo)Func.FuncBody).Invoke(Self, new Object[] { Param1, Param2, Param3 });
		}
        //catch (InvocationTargetException e) {
        //    LibGreenTea.VerboseException(e);
        //}
        //catch (IllegalArgumentException e) {
        //    LibGreenTea.VerboseException(e);
        //}
        //catch (IllegalAccessException e) {
        //    LibGreenTea.VerboseException(e);
        //}
        catch (Exception e){
            LibGreenTea.VerboseException(e);
        }		
		return null;
	}

	public /*final*/ static object ApplyMethod4(GtFunc Func, object Self, object Param1, object Param2, object Param3, object Param4) {
		try {
            return ((MethodInfo)Func.FuncBody).Invoke(Self, new Object[] { Param1, Param2, Param3, Param4 });
		}
        //catch (InvocationTargetException e) {
        //    LibGreenTea.VerboseException(e);
        //}
        //catch (IllegalArgumentException e) {
        //    LibGreenTea.VerboseException(e);
        //}
        //catch (IllegalAccessException e) {
        //    LibGreenTea.VerboseException(e);
        //}
        catch (Exception e){
            LibGreenTea.VerboseException(e);
        }		
		return null;
	}

	public /*final*/ static long ApplyTokenFunc(GtFunc TokenFunc, object TokenContext, string Text, long pos) {
		return (long)LibGreenTea.ApplyMethod3(TokenFunc, null, TokenContext, Text, pos);
	}

	public /*final*/ static GtSyntaxTree ApplyParseFunc(GtFunc ParseFunc, GtNameSpace NameSpace, GtTokenContext TokenContext, GtSyntaxTree LeftTree, GtSyntaxPattern Pattern) {
		return (GtSyntaxTree)LibGreenTea.ApplyMethod4(ParseFunc, null, NameSpace, TokenContext, LeftTree, Pattern);
	}

	public /*final*/ static GtNode ApplyTypeFunc(GtFunc TypeFunc, GtTypeEnv Gamma, GtSyntaxTree ParsedTree, GtType ContextType) {
		return (GtNode)LibGreenTea.ApplyMethod3(TypeFunc, null, Gamma, ParsedTree, ContextType);
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

    //public static void RetrieveMapKeys(GtMap Map, string Prefix, List<string> List)
    //{
    //    /*local*/
    //    Iterator<string> itr = Map.Map.keySet().iterator();
    //    /*local*/
    //    int i = 0;
    //    while (itr.hasNext())
    //    {
    //        string Key = itr.next();
    //        if (Prefix != null && !Key.StartsWith(Prefix))
    //        {
    //            continue;
    //        }
    //        List.Add(Key);
    //        i = i + 1;
    //    }
    //}

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
			//LibGreenTea.Eval(SourceCode);
		}
		if(OutputFile.Equals("-")) {
			Console.WriteLine(SourceCode);
            //Console.WriteLine.flush();
		}
		else {
			StreamWriter @out = null;
			try {
				@out = new StreamWriter(OutputFile);
				@out.Write(SourceCode);
				@out.Flush();
				@out.Close();
			} catch (IOException e) {
                //System.err.println("Cannot write: " + OutputFile);
                //System.exit(1);
                Console.Error.WriteLine("Cannot write: " + OutputFile);
				System.Environment.Exit(1);
			}
		}
	}

	public /*final*/ static string ReadLine(string Prompt, string Prompt2) {
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

	public /*final*/ static string ReadLine2(string Prompt, string Prompt2) {
        return ReadLine(Prompt, Prompt2);
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

    public /*final*/ static string LoadFile2(string FileName)
    {
        LibGreenTea.VerboseLog(GreenTeaUtils.VerboseFile, "loading " + FileName);
        string FormattedName = FormatFilePath(FileName);
        using (StreamReader r = new StreamReader(FormattedName))
        {
            return r.ReadToEnd();
        }
        //BufferedReader reader = new BufferedReader(new InputStreamReader(Stream));
        //string buffer = "";
        //try
        //{
        //    int buflen = 4096;
        //    int readed = 0;
        //    char[] buf = new char[buflen];
        //    StringBuilder builder = new StringBuilder();
        //    while ((readed = reader.read(buf, 0, buflen)) >= 0)
        //    {
        //        builder.Append(buf, 0, readed);
        //    }
        //    buffer = builder.ToString();
        //}
        //catch (IOException e)
        //{
        //    return null;
        //}
        //return buffer;
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
		return (Boolean)Value;
	}

	public static object DynamicInstanceOf(object Value, GtType Type) {
		if(Value != null) {
            GtType ValueType = GtStaticTable.GuessType(Value);
			if(ValueType == Type || Type.Accept(ValueType)) {
				return true;
			}
		}
		return false;
	}

	public /*final*/ static object DynamicConvertTo(GtType CastType, object Value) {
		if(Value != null) {
            GtType ValueType = GtStaticTable.GuessType(Value);
			if(ValueType == CastType || CastType.Accept(ValueType)) {
				return Value;
			}
            GtFunc Func = GtStaticTable.GetConverterFunc(ValueType, CastType, true);
			if(Func != null) {
				return LibGreenTea.ApplyMethod2(Func, null, CastType, Value);
			}
		}
		return null;
	}
	
	public static object EvalUnary(GtType Type, string Operator, object Value) {
		if(Value is Boolean) {
			if(Operator.Equals("!") || Operator.Equals("not")) {
				return DynamicCast(Type, !((Boolean)Value));
			}
			return null;
		}
		if(Value is long || Value is int  || Value is short) {
			if(Operator.Equals("-")) {
				return DynamicCast(Type, -(long)Value);
			}
			if(Operator.Equals("+")) {
				return DynamicCast(Type, +(long)Value);
			}
			if(Operator.Equals("~")) {
				return DynamicCast(Type, ~(long)Value);
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
            String left = DynamicCast(GtStaticTable.StringType, LeftValue).ToString();
            String right = DynamicCast(GtStaticTable.StringType, RightValue).ToString();
			if(Operator.Equals("+")) {
				return  DynamicCast(Type, left + right);
			}
		}
		if(LeftValue is string && RightValue is string) {
            String left = DynamicCast(GtStaticTable.StringType, LeftValue).ToString();
            String right = DynamicCast(GtStaticTable.StringType, RightValue).ToString();
			if(Operator.Equals("==")) {
				return  DynamicCast(Type, left.Equals(right));
			}
			if(Operator.Equals("!=")) {
				return DynamicCast(Type, !left.Equals(right));
			}
			if(Operator.Equals("<")) {
				return DynamicCast(Type, left.CompareTo(right) < 0);
			}
			if(Operator.Equals("<=")) {
				return DynamicCast(Type, left.CompareTo(right) <= 0);
			}
			if(Operator.Equals(">")) {
				return DynamicCast(Type, left.CompareTo(right) > 0);
			}
			if(Operator.Equals(">=")) {
				return DynamicCast(Type, left.CompareTo(right) >= 0);
			}
			return null;
		}
		if(LeftValue is Double || LeftValue is float || RightValue is Double || RightValue is float) {
			try {
                double left = (double)LeftValue;
                double right = (double)LeftValue;
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
            catch (InvalidCastException e)
            {
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
            long left = (long)LeftValue;
            long right = (long)LeftValue;
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
            if (Operator.Equals("<<"))
            {
                //				return DynamicCast(Type, left << right);
                return DynamicCast(Type, left << (int)right);
            }
            if (Operator.Equals(">>"))
            {
                //				return DynamicCast(Type, left >> right);
                return DynamicCast(Type, left >> (int)right);
            }
			if(Operator.Equals("^")) {
				return DynamicCast(Type, left ^ right);
			}
		}
        catch (InvalidCastException e){
		}
		return null;
	}



//	public static Object EvalGetter(GtType Type, Object Value, String FieldName) {
//		// TODO Auto-generated MethodInfo stub
//		return null;
//	}

}
