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

public static class RestrictedJavaCompatible
{
    public static void Add<T>(this List<T> list, int index, T item)
    {
        list.Insert(index, item);
    }
}

public partial class GtGrammar
{
 	public static GtFunc LoadTokenFunc(GtParserContext ParserContext, Object Grammar, String FuncName) {
		return LoadTokenFunc2(ParserContext, Grammar.GetType(), FuncName);
	}
    public static GtFunc LoadParseFunc(GtParserContext ParserContext, Object Grammar, String FuncName)
    {
		return LoadParseFunc2(ParserContext, Grammar.GetType(), FuncName);
	}
    public static GtFunc LoadTypeFunc(GtParserContext ParserContext, Object Grammar, String FuncName)
    {
		return LoadTypeFunc2(ParserContext, Grammar.GetType(), FuncName);
	}
    
    public static GtFunc LoadTokenFunc2(GtParserContext ParserContext, Type GrammarClass, String FuncName) {
        try
        {
            MethodInfo JavaMethod = GrammarClass.GetMethod(FuncName, new Type[]{typeof(GtTokenContext), typeof(String), typeof(long)});
            return LibGreenTea.ConvertNativeMethodToFunc(ParserContext, JavaMethod);
        }
        catch (Exception e)
        {
            LibGreenTea.VerboseException(e);
            LibGreenTea.Exit(1, e.ToString());
        }
        return null;
    }
    public static GtFunc LoadParseFunc2(GtParserContext ParserContext, Type GrammarClass, String FuncName)
    {
        try
        {
            MethodInfo JavaMethod = GrammarClass.GetMethod(FuncName, new Type[]{typeof(GtNameSpace), typeof(GtTokenContext), typeof(GtSyntaxTree), typeof(GtSyntaxPattern)});
            return LibGreenTea.ConvertNativeMethodToFunc(ParserContext, JavaMethod);
        }
        catch (Exception e)
        {
            LibGreenTea.VerboseException(e);
            LibGreenTea.Exit(1, e.ToString());
        }
        return null;
    }
    public static GtFunc LoadTypeFunc2(GtParserContext ParserContext, Type GrammarClass, String FuncName)
    {
        try
        {
            MethodInfo JavaMethod = GrammarClass.GetMethod(FuncName, new Type[]{typeof(GtTypeEnv), typeof(GtSyntaxTree), typeof(GtType)});
            return LibGreenTea.ConvertNativeMethodToFunc(ParserContext, JavaMethod);
        }
        catch (Exception e)
        {
            LibGreenTea.VerboseException(e);
            LibGreenTea.Exit(1, e.ToString());
        }
        return null;
	}
}

public partial class GtStaticTable
{
	public static void InitParserContext(GtParserContext Context) {
		if(!GtStaticTable.IsInit) {
			ArrayType.TypeParams = new GtType[1];
			ArrayType.TypeParams[0] = GtStaticTable.VarType;
			FuncType.TypeParams = new GtType[1];
			FuncType.TypeParams[0] = GtStaticTable.VarType;  // for PolyFunc
			IteratorType.TypeParams = new GtType[1];
			IteratorType.TypeParams[0] = GtStaticTable.VarType;
			
			GtStaticTable.SetNativeTypeName(typeof(GreenTeaTopObject).FullName, GtStaticTable.TopType);
			GtStaticTable.SetNativeTypeName(typeof(void).FullName, GtStaticTable.VoidType);
			GtStaticTable.SetNativeTypeName(typeof(object).FullName, GtStaticTable.AnyType);
			GtStaticTable.SetNativeTypeName(typeof(bool).FullName, GtStaticTable.BooleanType);
            GtStaticTable.SetNativeTypeName(typeof(long).FullName, GtStaticTable.IntType);
            GtStaticTable.SetNativeTypeName(typeof(string).FullName, GtStaticTable.StringType);
            GtStaticTable.SetNativeTypeName(typeof(GtType).FullName, GtStaticTable.TypeType);
            GtStaticTable.SetNativeTypeName(typeof(GreenTeaEnum).FullName, GtStaticTable.EnumBaseType);
            GtStaticTable.SetNativeTypeName(typeof(GreenTeaArray).FullName, GtStaticTable.ArrayType);
            GtStaticTable.SetNativeTypeName("GreenTeaIntArray", GtStaticTable.GetGenericType1(GtStaticTable.ArrayType, GtStaticTable.IntType, true));
            GtStaticTable.SetNativeTypeName(typeof(double).FullName, GtStaticTable.FloatType);
            GtStaticTable.SetNativeTypeName(typeof(IEnumerator<object>).FullName, GtStaticTable.IteratorType);
			GtStaticTable.IsInit = true;
		}
		Context.RootNameSpace.AppendTypeName(GtStaticTable.TopType,  null);
		Context.RootNameSpace.AppendTypeName(GtStaticTable.VoidType,  null);
		Context.RootNameSpace.AppendTypeName(GtStaticTable.BooleanType, null);
		Context.RootNameSpace.AppendTypeName(GtStaticTable.IntType, null);
		Context.RootNameSpace.AppendTypeName(GtStaticTable.FloatType, null);
		Context.RootNameSpace.AppendTypeName(GtStaticTable.StringType, null);
		Context.RootNameSpace.AppendTypeName(GtStaticTable.VarType, null);
		Context.RootNameSpace.AppendTypeName(GtStaticTable.AnyType, null);
		Context.RootNameSpace.AppendTypeName(GtStaticTable.TypeType, null);
		Context.RootNameSpace.AppendTypeName(GtStaticTable.ArrayType, null);
		Context.RootNameSpace.AppendTypeName(GtStaticTable.FuncType, null);
		Context.RootNameSpace.AppendTypeName(GtStaticTable.IteratorType, null);
	}
}

public class LibGreenTea: GreenTeaConsts {
	// LibGreenTea KonohaApi
	public static void print(object msg) {
		Console.WriteLine(msg);
	}

	public static void println(object msg) {
		Console.WriteLine(msg);
	}
	
	public static void Assert(bool TestResult) {
		if(!TestResult) {
			Debug.Assert(TestResult);
			Exit(1, "Assertion Failed");
		}
	}

	public static object NewArray(GtType Type, object[] InitSizes) {
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

	public static object NewArrayLiteral(GtType ArrayType, object[] Values) {
		return GreenTeaArray.NewArrayLiteral(ArrayType, Values);		
	}

    public class GtMap {
	    private Dictionary<String,Object> Map = new Dictionary<String,Object>();

	    public GtMap() {
		    this.Map = new Dictionary<String,Object>();
	    }

	    public void put(String Key, Object Value) {
		    this.Map[Key] = Value;
	    }

	    public Object GetOrNull(String Key) {
            return this.Map.ContainsKey(Key) ? this.Map[Key] : null;
	    }

        public IEnumerable<string> Keys { get { return this.Map.Keys; } }
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

    public static Object InvokeFunc(GtFunc Func, Object[] Params) {
		if(Func == null || Func.IsAbstract()) {
			LibGreenTea.VerboseLog(VerboseRuntime, "applying abstract function: " + Func);
			return Func.GetReturnType().DefaultNullValue;
		}
		else if(Func.Is(NativeMethodFunc)) {
			/*local*/Object[] MethodArguments = new Object[Params.Length-1];
			LibGreenTea.ArrayCopy(Params, 1, MethodArguments, 0, MethodArguments.Length);
			return LibNative.ApplyMethod(Func, Params[0], MethodArguments);
		}
        return LibNative.ApplyMethod(Func, null, Params);
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
	
	public static string GetPlatform() {
        Type t = typeof(System.String);
		return "Java JVM-" + t.GetProperty("java.version");
	}

	public static bool DebugMode = false;

	private static string GetStackInfo(int depth) {
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

	public static void TODO(string msg) {
		LibGreenTea.println("TODO" + LibGreenTea.GetStackInfo(2) + ": " + msg);
	}

	public static void DebugP(string msg) {
		if(LibGreenTea.DebugMode) {
			LibGreenTea.println("DEBUG" + LibGreenTea.GetStackInfo(2) + ": " + msg);
		}
	}

	public static int VerboseMask = GreenTeaUtils.VerboseUndefined | GreenTeaUtils.VerboseException;

	public static void VerboseLog(int VerboseFlag, string Message) {
		if((LibGreenTea.VerboseMask & VerboseFlag) == VerboseFlag) {
			LibGreenTea.println("GreenTea: " + Message);
		}
	}

    public static void VerboseLog(int VerboseFlag, string Format, params object[] Values)
    {
        if ((LibGreenTea.VerboseMask & VerboseFlag) == VerboseFlag)
        {
            LibGreenTea.println(String.Format("GreenTea: " + Format, Values));
        }
    }

    public static void PrintStackTrace(Exception e, int linenum)
    {
        Console.WriteLine(System.Environment.StackTrace);
    }

    public static string SourceBuilderToString(GtSourceBuilder Builder) {
		var builder = new StringBuilder();
		foreach(string s in Builder.SourceList){
			builder.Append(s);
		}
		return builder.ToString();
	}

    public static void VerboseException(Exception e) {
        LibGreenTea.VerboseLog(GreenTeaUtils.VerboseException, e.ToString());
        Console.WriteLine(System.Environment.StackTrace);
        if (e is ArgumentException)
        {
            LibGreenTea.Exit(1, e.ToString());
        }	
	}

	public static void Exit(int status, string Message) {
        Console.Error.WriteLine(Message);
		System.Environment.Exit(1);
	}

	private static int ParserCount = -1;
	
	public static int NewParserId() {
		ParserCount++;
		return ParserCount;
	}

	public static char CharAt(string Text, long Pos) {
		if(Pos < Text.Length) {
			return Text[(int)Pos];
		}
		return (char)0;
	}

	public static string SubString(string Text, long StartIdx, long EndIdx) {
        if (EndIdx > Text.Length)
        {
            EndIdx = Text.Length;
        }
        if (StartIdx > Text.Length)
        {
            StartIdx = Text.Length;
        }
		return Text.Substring((int)StartIdx, (int)(EndIdx - StartIdx));
	}

	public static bool IsWhitespace(string Text, long Pos) {
		char ch = LibGreenTea.CharAt(Text, Pos);
		return char.IsWhiteSpace(ch);
	}

	public static bool IsLetter(string Text, long Pos) {
		char ch = LibGreenTea.CharAt(Text, Pos);
		return char.IsLetter(ch);
	}

	public static bool IsDigit(string Text, long Pos) {
		char ch = LibGreenTea.CharAt(Text, Pos);
		return char.IsDigit(ch);
	}

	public static bool IsVariableName(string Text, long Pos) {
		char ch = LibGreenTea.CharAt(Text, Pos);
		return char.IsLetter(ch) || ch == '_' || ch > 255;
	}

	public static int CheckBraceLevel(string Text) {
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

	public static string CharToString(char code) {
		return char.ToString(code);
	}

	public static string UnquoteString(string Text) {
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

	public static string QuoteString(string Text) {
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

	public static string Stringify(object Value) {
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
		//			FieldInfo[] Fields = Value.GetType().getFields();
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

	public static string StringifyField(object Value) {
        /*local*/
        string s = "{";
        FieldInfo[] Fields = Value.GetType().GetFields();
        for (int i = 0; i < Fields.Length; i++)
        {
            if ((FieldAttributes.Public & Fields[i].Attributes) != 0)
            {
                if (i > 0){
                    s += ", ";
                }try{
                    s += Fields[i].Name + ": ";
                    s += LibGreenTea.Stringify(Fields[i].GetValue(Value));
                }catch (ArgumentException){
                }catch (MemberAccessException){
                }
            }
        }
        return s + "}";
     //   throw new NotImplementedException();
	}

	public static bool EqualsString(string s, string s2) {
		return s.Equals(s2);
	}

	public static long ParseInt(string Text) {
		try {
            return long.Parse(Text);
		}
		catch(FormatException e) {
			LibGreenTea.VerboseException(e);
		}
		return 0;
	}

	public static double ParseFloat(string Text) {
		try {
			return Double.Parse(Text);
		}
        catch (FormatException e)
        {
			LibGreenTea.VerboseException(e);
		}
		return 0.0;
	}

    public static void ArrayCopy(object[] src, int srcPos, object[] dest, int destPos, int length) {
        Array.Copy(src, srcPos, dest, destPos, length);
	}

    public static GtFunc SetNativeMethod(GtFunc NativeFunc, MethodInfo CLRMethod)
    {
        int FuncFlag = GreenTeaUtils.NativeFunc;
        if (CLRMethod.IsStatic)
        {
            FuncFlag |= GreenTeaUtils.NativeMethodFunc;
        }
        NativeFunc.SetNativeMethod(FuncFlag, CLRMethod);
        return NativeFunc;
    }

    public static GtFunc ConvertNativeMethodToFunc(GtParserContext Context, MethodInfo CLRMethod)
    {
        var TypeList = new List<GtType>() { LibNative.GetNativeType(CLRMethod.ReturnType) };
        if (!CLRMethod.IsStatic)
        {
            TypeList.Add(LibNative.GetNativeType(CLRMethod.DeclaringType));
        }
        TypeList.AddRange(CLRMethod.GetParameters().Select(p => LibNative.GetNativeType(p.ParameterType)));
        return SetNativeMethod(new GtFunc(0, CLRMethod.Name, 0, TypeList), CLRMethod);
    }

    //private static Type LoadNativeClass(string ClassName) {
    //    try {
    //        return Type.GetType("org.GreenTeaScript." + ClassName);
    //    }
    //    catch(TypeLoadException) {
    //    }
    //    return Type.GetType(ClassName);
    //    throw new NotImplementedException();
    //}


    public static bool ImportNativeMethod(GtNameSpace NameSpace, GtFunc NativeFunc, string FullName)
    {
        MethodInfo CLRMethod = LibNative.ImportMethod(NativeFunc.GetFuncType(), FullName, false);
        if (CLRMethod != null)
        {
            LibGreenTea.SetNativeMethod(NativeFunc, CLRMethod);
            if (NativeFunc.GetReturnType().IsVarType())
            {
                NativeFunc.SetReturnType(LibNative.GetNativeType(CLRMethod.ReturnType));
            }
            int StartIdx = NativeFunc.Is(GreenTeaUtils.NativeMethodFunc) ? 1 : 2;
            Type[] p = CLRMethod.GetParameters().Select(q => q.ParameterType).ToArray();
            for (int i = 0; i < p.Length; i++)
            {
                if (NativeFunc.Types[StartIdx + i].IsVarType())
                {
                    NativeFunc.Types[StartIdx + i] = LibNative.GetNativeType(p[i]);
                    NativeFunc.FuncType = null; // reset
                }
            }
            return true;
        }
        return false;
    }

    public static bool ImportMethodToFunc(GtFunc Func, String FullName) {
		MethodInfo CLRMethod = LibNative.ImportMethod(Func.GetFuncType(), FullName, false);
		if(CLRMethod != null) {
			LibGreenTea.SetNativeMethod(Func, CLRMethod);
			if(Func.GetReturnType().IsVarType()) {
				Func.SetReturnType(LibNative.GetNativeType(CLRMethod.ReturnType));
			}
			int StartIdx = Func.Is(GreenTeaUtils.NativeMethodFunc) ? 2 : 1;
            Type[] p = CLRMethod.GetParameters().Select(pr => pr.ParameterType).ToArray();
			for(int i = 0; i < p.Length; i++) {
				if(Func.Types[StartIdx + i].IsVarType()) {
					Func.Types[StartIdx + i] = LibNative.GetNativeType(p[i]);
					Func.FuncType = null; // reset
				}
			}
			return true;
		}
		return false;
	}

    //public static object NativeFieldValue(object ObjectValue, FieldInfo NativeField) {
    //    try {
    //        Type NativeType = NativeField.GetType();
    //        if(NativeType == typeof(long) || NativeType == typeof(int) || NativeType == typeof(short) || NativeType == typeof(byte)) {
    //            return NativeField.GetValue(ObjectValue);
    //        }
    //        if(NativeType == typeof(double) || NativeType == typeof(float)) {
    //            return NativeField.GetValue(ObjectValue);
    //        }
    //        if(NativeType == typeof(bool)) {
    //            return NativeField.GetValue(ObjectValue);
    //        }
    //        if(NativeType == typeof(char)) {
    //            //return string.valueOf(NativeField.GetValue(ObjectValue));
    //            return (NativeField.GetValue(ObjectValue)).ToString();
    //        }
    //        return NativeField.GetValue(ObjectValue);
    //    }
    //    catch (MemberAccessException e){
    //        LibGreenTea.VerboseException(e);
    //    }catch (System.Security.SecurityException  e){
    //        LibGreenTea.VerboseException(e);
    //    }
    //    //catch (Exception e)
    //    //{
    //    //    LibGreenTea.VerboseException(e);
    //    //}
    //    return null;
    //}

    //public static Object NativeFieldGetter(Object ObjectValue, FieldInfo NativeField)
    //{
    //    try{
    //        //Class<?> NativeType = NativeField.getType();
    //        return NativeField.GetValue(ObjectValue);
    //    }catch (MemberAccessException e){
    //        LibGreenTea.VerboseException(e);
    //    }catch (System.Security.SecurityException  e){
    //        LibGreenTea.VerboseException(e);
    //    }
    //    //}catch (Exception e){
    //    //    LibGreenTea.VerboseException(e);
    //    //}
    //    return null;
    //}

    //public static Object NativeFieldSetter(Object ObjectValue, FieldInfo NativeField, Object Value)
    //{
    //    try{
    //        NativeField.SetValue(ObjectValue, Value);
    //    }catch (MemberAccessException e){
    //        LibGreenTea.VerboseException(e);
    //    }catch (System.Security.SecurityException  e){
    //        LibGreenTea.VerboseException(e);
    //    }
    //    //catch (Exception e){
    //    //    LibGreenTea.VerboseException(e);
    //    //}
    //    return Value;
    //}

    //public static MethodInfo LookupNativeMethod(object Callee, string FuncName) {
    //    if(FuncName != null) {
    //        // LibGreenTea.DebugP("looking up MethodInfo : " + Callee.GetType().getSimpleName() + "." + FuncName);
    //        MethodInfo[] methods = Callee.GetType().GetMethods();
    //        for(int i = 0; i < methods.Length; i++) {
    //            if(FuncName.Equals(methods[i].Name)) {
    //                return methods[i];
    //            }
    //        }
    //        LibGreenTea.VerboseLog(GreenTeaUtils.VerboseUndefined, "undefined MethodInfo: " + Callee.GetType().Name + "." + FuncName);
    //    }
    //    return null;
    //}

	public static int ListSize<T>(List<T> List) {
		if(List == null) {
			return 0;
		}
		return List.Count();
	}

	public static GtType[] CompactTypeList(int BaseIndex, List<GtType> List) {
		GtType[] Tuple = new GtType[List.Count() - BaseIndex];
		for(int i = BaseIndex; i < List.Count(); i++) {
			Tuple[i] = List[i];
		}
		return Tuple;
	}

	public static string[] CompactStringList(List<string> List) {
		if(List == null) {
			return null;
		}
		string[] Tuple = new string[List.Count()];
		for(int i = 0; i < List.Count(); i++) {
			Tuple[i] = List[i];
		}
		return Tuple;
	}

    public static void RetrieveMapKeys(GtMap Map, String Prefix, List<String> List){
        List.AddRange(Map.Keys.Where(k => k.StartsWith(Prefix)));
	}

	public static void Usage(string Message) {
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

	public static string DetectTargetCode(string Extension, string TargetCode) {
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

	public static GtGenerator CodeGenerator(string TargetCode, string OutputFile, int GeneratorFlag) {
		string Extension = (OutputFile == null) ? "-" : OutputFile;
		TargetCode = DetectTargetCode(Extension, TargetCode);
		TargetCode = TargetCode.ToLower();
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
        //else if(TargetCode.StartsWith("exe")) {
        //    return new JavaByteCodeGenerator(TargetCode, OutputFile, GeneratorFlag);
        //}
		return null;
	}

    [Obsolete]
	public static void WriteCode(string OutputFile, string SourceCode) {
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
			} catch (IOException) {
                //System.err.println("Cannot write: " + OutputFile);
                //System.exit(1);
                Console.Error.WriteLine("Cannot write: " + OutputFile);
				System.Environment.Exit(1);
			}
		}
	}

    public static void WriteSource(String OutputFile, List<GtSourceBuilder> SourceList) {
		try {
			Stream Stream = null;
			if(OutputFile == "-") {
				Stream = Console.OpenStandardOutput();
                Stream.Flush();
			}
			else {
				Stream = new FileStream(OutputFile, FileMode.Create);
			}
            var Writer = new StreamWriter(Stream);
			foreach(var Builder in SourceList) {
				foreach(var Source in Builder.SourceList) {
					Writer.Write(Source);
				}
				Writer.Write(Writer.NewLine);
			}
            Writer.Flush();
            if (OutputFile == "-")
            {
                Writer.Close();
			}
		} catch (IOException) {
            Console.Error.WriteLine("Cannot write: " + OutputFile);
            System.Environment.Exit(1);
		}
	}

	public static string ReadLine(string Prompt, string Prompt2) {
        string Line = Console.ReadLine();
		if(Line == null) {
            System.Environment.Exit(0);
		}
		if(Prompt2 != null) {
			int level = 0;
			while((level = LibGreenTea.CheckBraceLevel(Line)) > 0) {
                Console.Write(Prompt2 + GreenTeaUtils.JoinStrings("  ", level));
                string Line2 = Console.ReadLine();
                Line += System.Environment.NewLine + Line2; 
			}
			if(level < 0) {
				Line = string.Empty;
				LibGreenTea.println(" .. canceled");
			}
		}
		return Line;
	}

	public static string ReadLine2(string Prompt, string Prompt2) {
        return ReadLine(Prompt, Prompt2);
	}

	public static bool HasFile(string Path) {
        //if(typeof(LibGreenTea).getResource(Path) != null) {
        //    return true;
        //}
        return File.Exists(Path);
	}

	public static bool IsSupportedTarget(string TargetCode) {
		return HasFile(GetLibPath(TargetCode, "common"));
	}

	public static string GetLibPath(string TargetCode, string LibName) {
		return "lib/" + TargetCode + "/" + LibName + ".green";
	}

	private static string FormatFilePath(string FileName) {
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

    public static string LoadFile2(string FileName)
    {
        LibGreenTea.VerboseLog(GreenTeaUtils.VerboseFile, "loading " + FileName);
        string FormattedName = FormatFilePath(FileName);
        if(File.Exists(FormattedName)){
            using (StreamReader r = new StreamReader(FormattedName))
            {
                return r.ReadToEnd();
            }
        }
        return string.Empty;
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

	public static object DynamicConvertTo(GtType CastType, object Value) {
		if(Value != null) {
            GtType ValueType = GtStaticTable.GuessType(Value);
			if(ValueType == CastType || CastType.Accept(ValueType)) {
				return Value;
			}
            GtFunc Func = GtStaticTable.GetConverterFunc(ValueType, CastType, true);
			if(Func != null) {
				return LibNative.ApplyMethodV(Func, null, CastType, Value);
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
		//System.err.println("***" + LeftValue.GetType() + ", " + RightValue.GetType());
		if(LeftValue == null || RightValue == null) {
			return null;
		}
		if(LeftValue is string || RightValue is string) {
            string left = DynamicCast(GtStaticTable.StringType, LeftValue).ToString();
            string right = DynamicCast(GtStaticTable.StringType, RightValue).ToString();
			if(Operator.Equals("+")) {
				return  DynamicCast(Type, left + right);
			}
		}
		if(LeftValue is string && RightValue is string) {
            string left = DynamicCast(GtStaticTable.StringType, LeftValue).ToString();
            string right = DynamicCast(GtStaticTable.StringType, RightValue).ToString();
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
        if (LeftValue is double || LeftValue is float || RightValue is double || RightValue is float)
        {
			try {
                double left = (double)LeftValue;
                double right = (double)RightValue;
                switch (Operator)
                {
                    case "+": return DynamicCast(Type, left + right);
                    case "-": return DynamicCast(Type, left - right);
                    case "*": return DynamicCast(Type, left * right);
                    case "/": return DynamicCast(Type, left / right);
                    case "==": return DynamicCast(Type, left == right);
                    case "!=": return DynamicCast(Type, left != right);
                    case ">": return DynamicCast(Type, left > right);
                    case ">=": return DynamicCast(Type, left >= right);
                    case "<": return DynamicCast(Type, left < right);
                    case "<=": return DynamicCast(Type, left <= right);
                }
			}
            catch (InvalidCastException)
            {
			}
			return null;
		}
        if (LeftValue is bool && RightValue is bool)
        {
            bool left = (bool)LeftValue;
            bool right = (bool)RightValue;
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
            long right = (long)RightValue;
            switch (Operator)
            {
                case "+": return DynamicCast(Type, left + right);
                case "-": return DynamicCast(Type, left - right);
                case "*": return DynamicCast(Type, left * right);
                case "/": return DynamicCast(Type, left / right);
                case "%": return DynamicCast(Type, left % right);
                case "mod": return DynamicCast(Type, left % right);
                case "==": return DynamicCast(Type, left == right);
                case "!=": return DynamicCast(Type, left != right);
                case ">": return DynamicCast(Type, left > right);
                case ">=": return DynamicCast(Type, left >= right);
                case "<": return DynamicCast(Type, left < right);
                case "<=": return DynamicCast(Type, left <= right);
                case "|": return DynamicCast(Type, left | right);
                case "&": return DynamicCast(Type, left & right);
                case "<<": return DynamicCast(Type, left << (int)right);
                case ">>": return DynamicCast(Type, left >> (int)right);
                case "^": return DynamicCast(Type, left ^ right);
            }
		}
        catch (InvalidCastException){
		}
		return null;
	}


    [Obsolete]
    public static void LoadNativeMethods(GtParserContext Context, GtType ClassType, String FuncName, List<GtFunc> FuncList)
    {
        LibNative.LoadNativeMethods(Context, ClassType, FuncName, FuncList);
    }

    [Obsolete]
    public static void LoadNativeConstructors(GtParserContext Context, GtType ClassType, List<GtFunc> FuncList)
    {
        LibNative.LoadNativeConstructors(Context, ClassType, FuncList);
    }

    [Obsolete]
    public static GtFunc LoadNativeField(GtParserContext Context, GtType ClassType, String FieldName, Boolean GetSetter)
    {
        return LibNative.LoadNativeField(Context, ClassType, FieldName, GetSetter);
    }


}
