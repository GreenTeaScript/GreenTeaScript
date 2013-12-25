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

package parser.deps;
//import java.io.BufferedReader;
//import java.io.File;
//import java.io.FileInputStream;
//import java.io.FileNotFoundException;
//import java.io.FileWriter;
//import java.io.IOException;
//import java.io.InputStream;
//import java.io.InputStreamReader;
//import java.io.PrintStream;
//import java.io.Writer;
//import java.lang.reflect.Constructor;
//import java.lang.reflect.Field;
//import java.lang.reflect.InvocationTargetException;
import java.lang.reflect.Constructor;
import java.lang.reflect.Field;
import java.lang.reflect.InvocationTargetException;
import java.lang.reflect.Method;
import java.lang.reflect.Modifier;
import java.util.ArrayList;

import parser.GreenTeaConsts;
import parser.GreenTeaUtils;
import parser.GtFunc;
import parser.GtGenerator;
import parser.GtNameSpace;
import parser.GtParserContext;
import parser.GtPolyFunc;
import parser.GtStaticTable;
import parser.GtTokenContext;
import parser.GtType;
import parser.ast.GtNode;
//import java.util.ArrayList;
//import java.util.Iterator;
//import org.GreenTeaScript.Konoha.ArrayApi;

public class LibNative {
	final static void DebugP(String s) {
		//System.err.println("LibNative.DebugP: " + s);
	}

	// Type
	public final static String GetClassName(Object Value) {
		return Value.getClass().getSimpleName();
	}
	
	public final static Class<?> GetClassOfValue(Object Value) {
		return Value.getClass();
	}

	public final static GtType GetNativeType(Class<?> NativeClass) {
		GtType NativeType = null;
		NativeType = (/*cast*/GtType) GtStaticTable.ClassNameMap.GetOrNull(NativeClass.getCanonicalName());
		if(NativeType == null) {  /* create native type */
//			DebugP("** creating native class: " + NativeClass.getSimpleName() + ", " + NativeClass.getCanonicalName());
			NativeType = new GtType(GreenTeaUtils.NativeType, NativeClass.getSimpleName(), null, NativeClass);
			GtStaticTable.SetNativeTypeName(NativeClass.getCanonicalName(), NativeType);
			LibGreenTea.VerboseLog(GreenTeaUtils.VerboseNative, "creating native class: " + NativeClass.getSimpleName() + ", " + NativeClass.getCanonicalName());
		}
		return NativeType;
	}
	
	private static boolean AcceptJavaType(GtType GreenType, Class<?> NativeType) {
		if(GreenType.IsVarType() || GreenType.IsTypeVariable()) {
			return true;
		}
		if(GreenType.IsTopType()) {
			return (NativeType == Object.class);
		}
		GtType JavaType = LibNative.GetNativeType(NativeType);
		if(GreenType != JavaType) {
			DebugP("*** " + JavaType + ", " + GreenType + ", equals? " + (GreenType.BaseType == JavaType.BaseType));
			if(GreenType.IsGenericType() && GreenType.HasTypeVariable()) {
				return GreenType.BaseType == JavaType.BaseType;
			}
			if(JavaType.IsGenericType() && JavaType.HasTypeVariable()) {
				return GreenType.BaseType == JavaType.BaseType;
			}
			return false;
		}
		return true;
	}

	private final static boolean MatchNativeMethod(GtType[] GreenTypeParams, Method JavaMethod) {
		if(!AcceptJavaType(GreenTypeParams[0], JavaMethod.getReturnType())) {
			DebugP("return mismatched: " + GreenTypeParams[0] + ", " + JavaMethod.getReturnType() + " of " + JavaMethod);
			return false;
		}
		/*local*/int StartIndex = 2;
		if(Modifier.isStatic(JavaMethod.getModifiers())) {
			StartIndex = 1;			
		}
		else {
			if(GreenTypeParams.length == 1 || !AcceptJavaType(GreenTypeParams[1], JavaMethod.getDeclaringClass())) {
				DebugP("recv mismatched: " + GreenTypeParams[1] + ", " + JavaMethod.getDeclaringClass() + " of " + JavaMethod);
				return false;
			}
			StartIndex = 2;
		}
		/*local*/int ParamSize = GreenTypeParams.length - StartIndex;
		/*local*/Class<?>[] ParamTypes = JavaMethod.getParameterTypes();
		if(ParamTypes != null) {
			if(ParamTypes.length != ParamSize) {
				DebugP("param.length mismatched: " + ParamSize + " != " + ParamTypes.length + " of " + JavaMethod);
				return false;
			}
			for(int j = 0; j < ParamTypes.length; j++) {
				if(!AcceptJavaType(GreenTypeParams[StartIndex+j], ParamTypes[j])) {
					DebugP("param mismatched: " + GreenTypeParams[StartIndex+j] + " != " + ParamTypes[j] + " at index " + j + " of " + JavaMethod);
					return false;
				}
			}
			return true;
		}
		return (ParamSize == 0);
	}
	
	private final static Class<?> ImportClass(String ClassName) throws ClassNotFoundException {
		try {
			return Class.forName("org.GreenTeaScript." + ClassName);
		}
		catch(ClassNotFoundException e) {
		}
		return Class.forName(ClassName);
	}

	public final static Method ImportMethod(GtType ContextType, String FullName, boolean StaticMethodOnly) {
		/*local*/Method FoundMethod = null;
		int Index = FullName.lastIndexOf(".");
		if(Index == -1) {
			return null;
		}
		try {
			/*local*/String FuncName = FullName.substring(Index+1);
			/*local*/Class<?> NativeClass = LibNative.ImportClass(FullName.substring(0, Index));
			Method[] Methods = NativeClass.getDeclaredMethods();
			assert(Methods != null);
			for(int i = 0; i < Methods.length; i++) {
				if(LibGreenTea.EqualsString(FuncName, Methods[i].getName())) {
					if(!Modifier.isPublic(Methods[i].getModifiers())) {
						continue;
					}
					if(StaticMethodOnly && !Modifier.isStatic(Methods[i].getModifiers())) {
						continue;
					}
					if(ContextType.IsFuncType() && !LibNative.MatchNativeMethod(ContextType.TypeParams, Methods[i])) {
						continue;
					}
					if(FoundMethod != null) {
						LibGreenTea.VerboseLog(GreenTeaUtils.VerboseUndefined, "overloaded method: " + FullName);
						return FoundMethod; // return the first one
					}
					FoundMethod = Methods[i];
				}
			}
			if(FoundMethod == null) {
				LibGreenTea.VerboseLog(GreenTeaUtils.VerboseUndefined, "undefined method: " + FullName + " for " + ContextType);
			}
		} catch (ClassNotFoundException e) {
				LibGreenTea.VerboseLog(GreenTeaUtils.VerboseException, e.toString());			
		}
		return FoundMethod;
	}

	public static Object GetNativeFieldValue(Object ObjectValue, Field NativeField) {
		try {
			Class<?> NativeType = NativeField.getType();
			if(NativeType == long.class || NativeType == int.class || NativeType == short.class || NativeType == byte.class) {
				return NativeField.getLong(ObjectValue);
			}
			if(NativeType == double.class || NativeType == float.class) {
				return NativeField.getDouble(ObjectValue);
			}
			if(NativeType == boolean.class) {
				return NativeField.getBoolean(ObjectValue);
			}
			if(NativeType == char.class) {
				return String.valueOf(NativeField.getChar(ObjectValue));
			}
			return NativeField.get(ObjectValue);
		} catch (IllegalAccessException e) {
			LibGreenTea.VerboseException(e);
		} catch (SecurityException e) {
			LibGreenTea.VerboseException(e);
		}
		return null;
	}

	public static Object ImportStaticObject(GtParserContext Context, Class<?> NativeClass, String Symbol) {
		try {
			Field NativeField = NativeClass.getField(Symbol);
			if(Modifier.isStatic(NativeField.getModifiers())) {
				return LibNative.GetNativeFieldValue(null, NativeField);
			}
		} catch (NoSuchFieldException e) {
//			LibGreenTea.VerboseException(e);
		}
		GtPolyFunc PolyFunc = new GtPolyFunc(null);
		Method[] Methods = NativeClass.getMethods();
		for(int i = 0; i < Methods.length; i++) {
			if(Methods[i].getName().equals(Symbol) && Modifier.isStatic(Methods[i].getModifiers())) {
				PolyFunc.Append(Context, LibGreenTea.ConvertNativeMethodToFunc(Methods[i]), null);
			}
		}
		if(PolyFunc.FuncList.size() == 1) {
			return PolyFunc.FuncList.get(0);
		}
		else if(PolyFunc.FuncList.size() != 0) {
			return PolyFunc;
		}
		return null;
	}

	public static Object ImportStaticFieldValue(GtParserContext Context, GtType ClassType, String Symbol) {
		return LibNative.ImportStaticObject(Context, (Class<?>)ClassType.TypeBody, Symbol);
	}
	
	public final static Object ImportNativeObject(GtNameSpace NameSpace, String PackageName) {
		LibGreenTea.VerboseLog(GreenTeaUtils.VerboseNative, "importing " + PackageName);
		try {
			/*local*/Class<?> NativeClass = LibNative.ImportClass(PackageName);
			try {
				Method LoaderMethod = NativeClass.getMethod("ImportGrammar", GtNameSpace.class, Class.class);
				LoaderMethod.invoke(null, NameSpace, NativeClass);
			} catch (Exception e) {  // naming
			}
			return LibNative.GetNativeType(NativeClass);
		} catch (ClassNotFoundException e) {
		}
		int Index = PackageName.lastIndexOf(".");
		if(Index == -1) {
			return null;
		}
		try {
			/*local*/Class<?> NativeClass = LibNative.ImportClass(PackageName.substring(0, Index));
			return ImportStaticObject(NameSpace.Context, NativeClass, PackageName.substring(Index+1));
		} catch (ClassNotFoundException e) {
		}
		return null;
	}

	
	public final static void LoadNativeConstructors(GtParserContext Context, GtType ClassType, ArrayList<GtFunc> FuncList) {
		/*local*/boolean TransformedResult = false;
		Class<?> NativeClass = (Class<?>)ClassType.TypeBody;
//		GtParserContext Context = ClassType.Context;
		Constructor<?>[] Constructors = NativeClass.getDeclaredConstructors();
		if(Constructors != null) {
			for(int i = 0; i < Constructors.length; i++) {
				if(!Modifier.isPublic(Constructors[i].getModifiers())) {
					continue;
				}
				/*local*/ArrayList<GtType> TypeList = new ArrayList<GtType>();
				TypeList.add(ClassType);
				/*local*/Class<?>[] ParamTypes = Constructors[i].getParameterTypes();
				if(ParamTypes != null) {
					for(int j = 0; j < ParamTypes.length; j++) {
						TypeList.add(LibNative.GetNativeType(ParamTypes[j]));
					}
				}
				GtFunc Func = new GtFunc(GreenTeaConsts.ConstructorFunc, ClassType.ShortName, 0, TypeList);
				Func.SetNativeMethod(0, Constructors[i]);
				Context.RootNameSpace.AppendConstructor(ClassType, Func, null);
				FuncList.add(Func);
				TransformedResult = true;
			}
		}
		if(!TransformedResult) {
			Context.RootNameSpace.SetUndefinedSymbol(GtNameSpace.ClassSymbol(ClassType, GtNameSpace.ConstructorSymbol()), null);
		}
	}
	
	public final static GtFunc LoadNativeField(GtParserContext Context, GtType ClassType, String FieldName, boolean GetSetter) {
		try {
			Class<?> NativeClass = (Class<?>)ClassType.TypeBody;
			Field NativeField = NativeClass.getField(FieldName);
			if(Modifier.isPublic(NativeField.getModifiers())) {
				ArrayList<GtType> TypeList = new ArrayList<GtType>();
				TypeList.add(LibNative.GetNativeType(NativeField.getType()));
				TypeList.add(ClassType);
				GtFunc GetterNativeFunc = new GtFunc(GreenTeaConsts.GetterFunc, FieldName, 0, TypeList);
				GetterNativeFunc.SetNativeMethod(0, NativeField);
				Context.RootNameSpace.SetGetterFunc(ClassType, FieldName, GetterNativeFunc, null);
				TypeList.clear();
				TypeList.add(GtStaticTable.VoidType);
				TypeList.add(ClassType);
				TypeList.add(LibNative.GetNativeType(NativeField.getType()));
				GtFunc SetterNativeFunc = new GtFunc(GreenTeaConsts.SetterFunc, FieldName, 0, TypeList);
				SetterNativeFunc.SetNativeMethod(0, NativeField);
				Context.RootNameSpace.SetSetterFunc(ClassType, FieldName, SetterNativeFunc, null);
				return GetSetter ? SetterNativeFunc : GetterNativeFunc;
			}
		} catch (SecurityException e) {
			LibGreenTea.VerboseException(e);
		} catch (NoSuchFieldException e) {
		}
		Context.RootNameSpace.SetUndefinedSymbol(GtNameSpace.ClassSymbol(ClassType, GtNameSpace.GetterSymbol(FieldName)), null);
		Context.RootNameSpace.SetUndefinedSymbol(GtNameSpace.ClassSymbol(ClassType, GtNameSpace.SetterSymbol(FieldName)), null); // for setter
		return null;
	}

	public final static void LoadNativeMethods(GtParserContext Context, GtType ClassType, String FuncName, ArrayList<GtFunc> FuncList) {
		Class<?> NativeClass = (Class<?>)ClassType.TypeBody;
		Method[] Methods = NativeClass.getDeclaredMethods();
		/*local*/boolean FoundMethod = false;
		if(Methods != null) {
			for(int i = 0; i < Methods.length; i++) {
				if(LibGreenTea.EqualsString(FuncName, Methods[i].getName())) {
					if(!Modifier.isPublic(Methods[i].getModifiers())) {
						continue;
					}
					GtFunc NativeFunc = LibGreenTea.ConvertNativeMethodToFunc(Methods[i]);
					Context.RootNameSpace.AppendMethod(NativeFunc, null);
					FuncList.add(NativeFunc);
					FoundMethod = true;
				}
			}
		}
		if(!FoundMethod) {
			Context.RootNameSpace.SetUndefinedSymbol(GtNameSpace.ClassSymbol(ClassType, FuncName), null);
		}
	}

	// Method
	public final static Object ApplyMethod(GtFunc Func, Object Self, Object[] Params) {
		try {
//			System.err.println("** debug: " + Func.FuncBody);
//			System.err.println("** debug: " + Self + ", Params.length=" + Params.length);
			return ((Method)Func.FuncBody).invoke(Self, Params);
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

	public final static long ApplyTokenFunc(GtFunc TokenFunc, Object TokenContext, String Text, long pos) {
		Object[] Argvs = new Object[3];
		Argvs[0] = TokenContext;
		Argvs[1] = Text;
		Argvs[2] = pos;
		return (Long)LibNative.ApplyMethod(TokenFunc, null, Argvs);
	}

	public final static GtNode ApplyMatchFunc(GtFunc MatchFunc, GtNameSpace NameSpace, GtTokenContext TokenContext, GtNode LeftNode) {
		Object[] Argvs = new Object[3];
		Argvs[0] = NameSpace;
		Argvs[1] = TokenContext;
		Argvs[2] = LeftNode;
//		Argvs[3] = Pattern;
		return (GtNode)LibNative.ApplyMethod(MatchFunc, null, Argvs);
	}

	public final static GtFunc LoadTokenFunc(Class<?> GrammarClass, String FuncName) {
		try {
			Method JavaMethod = GrammarClass.getMethod(FuncName, GtTokenContext.class, String.class, long.class);
			return LibGreenTea.ConvertNativeMethodToFunc(JavaMethod);
		}
		catch(NoSuchMethodException e) {
			LibGreenTea.VerboseException(e);
			LibGreenTea.Exit(1, e.toString());
		}
		return null;
	}

	public final static GtFunc LoadMatchFunc(Class<?> GrammarClass, String FuncName) {
		try {
			Method JavaMethod = GrammarClass.getMethod(FuncName, GtNameSpace.class, GtTokenContext.class, GtNode.class);
			return LibGreenTea.ConvertNativeMethodToFunc(JavaMethod);
		}
		catch(NoSuchMethodException e) {
			LibGreenTea.VerboseException(e);
			LibGreenTea.Exit(1, e.toString());
		}
		return null;
	}

	public final static boolean IsSupportedNode(GtGenerator Generator, GtNode Node) {
		try {
			Generator.getClass().getMethod(Node.GetVisitMethodName(), Node.getClass());
			return true;
		}
		catch(NoSuchMethodException e) {
		}
		return false;		
	}

	public final static void VisitNode(GtGenerator Generator, GtNode Node) {
		try {
			Method JavaMethod = Generator.getClass().getMethod(Node.GetVisitMethodName(), Node.getClass());
			JavaMethod.invoke(Generator, Node);
		}
		catch(Exception e) {
		}
		Generator.Context.ReportError(GreenTeaConsts.ErrorLevel, Node.Token, "unsupported syntax: " + Node.Token.ParsedText + " " + Node.getClass());
	}

	
}
