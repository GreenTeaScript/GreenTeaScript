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

package zen.deps;

import java.io.BufferedReader;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.lang.reflect.Field;
import java.lang.reflect.InvocationTargetException;
import java.lang.reflect.Method;
import java.lang.reflect.Modifier;

import zen.ast.GtNode;
import zen.obsolete.GtPolyFunc;
import zen.parser.GreenTeaUtils;
import zen.parser.GtFunc;
import zen.parser.GtGenerator;
import zen.parser.GtNameSpace;
import zen.parser.GtSourceGenerator;
import zen.parser.GtStaticTable;
import zen.parser.GtTokenContext;
import zen.parser.GtType;
import zen.parser.GtVisitor;

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
			LibZen.VerboseLog(GreenTeaUtils.VerboseNative, "creating native class: " + NativeClass.getSimpleName() + ", " + NativeClass.getCanonicalName());
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
			LibNative.DebugP("*** " + JavaType + ", " + GreenType + ", equals? " + (GreenType.BaseType == JavaType.BaseType));
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
		if(!LibNative.AcceptJavaType(GreenTypeParams[0], JavaMethod.getReturnType())) {
			LibNative.DebugP("return mismatched: " + GreenTypeParams[0] + ", " + JavaMethod.getReturnType() + " of " + JavaMethod);
			return false;
		}
		/*local*/int StartIndex = 2;
		if(Modifier.isStatic(JavaMethod.getModifiers())) {
			StartIndex = 1;
		}
		else {
			if((GreenTypeParams.length == 1) || !LibNative.AcceptJavaType(GreenTypeParams[1], JavaMethod.getDeclaringClass())) {
				LibNative.DebugP("recv mismatched: " + GreenTypeParams[1] + ", " + JavaMethod.getDeclaringClass() + " of " + JavaMethod);
				return false;
			}
			StartIndex = 2;
		}
		/*local*/int ParamSize = GreenTypeParams.length - StartIndex;
		/*local*/Class<?>[] ParamTypes = JavaMethod.getParameterTypes();
		if(ParamTypes != null) {
			if(ParamTypes.length != ParamSize) {
				LibNative.DebugP("param.length mismatched: " + ParamSize + " != " + ParamTypes.length + " of " + JavaMethod);
				return false;
			}
			for(int j = 0; j < ParamTypes.length; j++) {
				if(!LibNative.AcceptJavaType(GreenTypeParams[StartIndex+j], ParamTypes[j])) {
					LibNative.DebugP("param mismatched: " + GreenTypeParams[StartIndex+j] + " != " + ParamTypes[j] + " at index " + j + " of " + JavaMethod);
					return false;
				}
			}
			return true;
		}
		return (ParamSize == 0);
	}

	private final static Class<?> LoadClass(String ClassName) throws ClassNotFoundException {
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
			/*local*/Class<?> NativeClass = LibNative.LoadClass(FullName.substring(0, Index));
			Method[] Methods = NativeClass.getDeclaredMethods();
			assert(Methods != null);
			for(int i = 0; i < Methods.length; i++) {
				if(LibZen.EqualsString(FuncName, Methods[i].getName())) {
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
						LibZen.VerboseLog(GreenTeaUtils.VerboseUndefined, "overloaded method: " + FullName);
						return FoundMethod; // return the first one
					}
					FoundMethod = Methods[i];
				}
			}
			if(FoundMethod == null) {
				LibZen.VerboseLog(GreenTeaUtils.VerboseUndefined, "undefined method: " + FullName + " for " + ContextType);
			}
		} catch (ClassNotFoundException e) {
			LibZen.VerboseLog(GreenTeaUtils.VerboseException, e.toString());
		}
		return FoundMethod;
	}

	public static Object GetNativeFieldValue(Object ObjectValue, Field NativeField) {
		try {
			Class<?> NativeType = NativeField.getType();
			if((NativeType == long.class) || (NativeType == int.class) || (NativeType == short.class) || (NativeType == byte.class)) {
				return NativeField.getLong(ObjectValue);
			}
			if((NativeType == double.class) || (NativeType == float.class)) {
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
			LibZen.VerboseException(e);
		} catch (SecurityException e) {
			LibZen.VerboseException(e);
		}
		return null;
	}

	public static Object LoadStaticClassObject(Class<?> NativeClass, String Symbol) {
		try {
			Field NativeField = NativeClass.getField(Symbol);
			if(Modifier.isStatic(NativeField.getModifiers())) {
				return LibNative.GetNativeFieldValue(null, NativeField);
			}
		} catch (NoSuchFieldException e) {
			//			LibZen.VerboseException(e);
		}
		GtPolyFunc PolyFunc = new GtPolyFunc(null, null);
		Method[] Methods = NativeClass.getMethods();
		for(int i = 0; i < Methods.length; i++) {
			if(Methods[i].getName().equals(Symbol) && Modifier.isStatic(Methods[i].getModifiers())) {
				PolyFunc.Append(LibZen.ConvertNativeMethodToFunc(Methods[i]), null);
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

	public static Object ImportStaticFieldValue(GtType ClassType, String Symbol) {
		return LibNative.LoadStaticClassObject((Class<?>)ClassType.TypeBody, Symbol);
	}

	public final static boolean ImportGrammar(GtNameSpace NameSpace, String PackageName) {
		try {
			/*local*/Class<?> NativeClass = LibNative.LoadClass(PackageName);
			Method LoaderMethod = NativeClass.getMethod("ImportGrammar", GtNameSpace.class, Class.class);
			LoaderMethod.invoke(null, NameSpace, NativeClass);
			return true;
		} catch (Exception e) {  // naming
		}
		return false;
	}

	public final static Object ImportNativeObject(GtNameSpace NameSpace, String PackageName) {
		LibZen.VerboseLog(GreenTeaUtils.VerboseNative, "importing " + PackageName);
		try {
			/*local*/Class<?> NativeClass = LibNative.LoadClass(PackageName);
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
			/*local*/Class<?> NativeClass = LibNative.LoadClass(PackageName.substring(0, Index));
			return LibNative.LoadStaticClassObject(NativeClass, PackageName.substring(Index+1));
		} catch (ClassNotFoundException e) {
		}
		return null;
	}


	//	public final static void LoadNativeConstructors(GtParserContext Context, GtType ClassType, ArrayList<GtFunc> FuncList) {
	//		/*local*/boolean TransformedResult = false;
	//		Class<?> NativeClass = (Class<?>)ClassType.TypeBody;
	////		GtParserContext Context = ClassType.Context;
	//		Constructor<?>[] Constructors = NativeClass.getDeclaredConstructors();
	//		if(Constructors != null) {
	//			for(int i = 0; i < Constructors.length; i++) {
	//				if(!Modifier.isPublic(Constructors[i].getModifiers())) {
	//					continue;
	//				}
	//				/*local*/ArrayList<GtType> TypeList = new ArrayList<GtType>();
	//				TypeList.add(ClassType);
	//				/*local*/Class<?>[] ParamTypes = Constructors[i].getParameterTypes();
	//				if(ParamTypes != null) {
	//					for(int j = 0; j < ParamTypes.length; j++) {
	//						TypeList.add(LibNative.GetNativeType(ParamTypes[j]));
	//					}
	//				}
	//				GtFunc Func = new GtFunc(GreenTeaConsts.ConstructorFunc, ClassType.ShortName, 0, TypeList);
	//				Func.SetNativeMethod(0, Constructors[i]);
	//				Context.RootNameSpace.AppendConstructor(ClassType, Func, null);
	//				FuncList.add(Func);
	//				TransformedResult = true;
	//			}
	//		}
	//		if(!TransformedResult) {
	//			Context.RootNameSpace.SetUndefinedSymbol(GtNameSpace.ClassSymbol(ClassType, GtNameSpace.ConstructorSymbol()), null);
	//		}
	//	}

	//	public final static GtFunc LoadNativeField(GtParserContext Context, GtType ClassType, String FieldName, boolean GetSetter) {
	//		try {
	//			Class<?> NativeClass = (Class<?>)ClassType.TypeBody;
	//			Field NativeField = NativeClass.getField(FieldName);
	//			if(Modifier.isPublic(NativeField.getModifiers())) {
	//				ArrayList<GtType> TypeList = new ArrayList<GtType>();
	//				TypeList.add(LibNative.GetNativeType(NativeField.getType()));
	//				TypeList.add(ClassType);
	//				GtFunc GetterNativeFunc = new GtFunc(GreenTeaConsts.GetterFunc, FieldName, 0, TypeList);
	//				GetterNativeFunc.SetNativeMethod(0, NativeField);
	//				Context.RootNameSpace.SetGetterFunc(ClassType, FieldName, GetterNativeFunc, null);
	//				TypeList.clear();
	//				TypeList.add(GtStaticTable.VoidType);
	//				TypeList.add(ClassType);
	//				TypeList.add(LibNative.GetNativeType(NativeField.getType()));
	//				GtFunc SetterNativeFunc = new GtFunc(GreenTeaConsts.SetterFunc, FieldName, 0, TypeList);
	//				SetterNativeFunc.SetNativeMethod(0, NativeField);
	//				Context.RootNameSpace.SetSetterFunc(ClassType, FieldName, SetterNativeFunc, null);
	//				return GetSetter ? SetterNativeFunc : GetterNativeFunc;
	//			}
	//		} catch (SecurityException e) {
	//			LibZen.VerboseException(e);
	//		} catch (NoSuchFieldException e) {
	//		}
	//		Context.RootNameSpace.SetUndefinedSymbol(GtNameSpace.ClassSymbol(ClassType, GtNameSpace.GetterSymbol(FieldName)), null);
	//		Context.RootNameSpace.SetUndefinedSymbol(GtNameSpace.ClassSymbol(ClassType, GtNameSpace.SetterSymbol(FieldName)), null); // for setter
	//		return null;
	//	}

	//	public final static void LoadNativeMethods(GtParserContext Context, GtType ClassType, String FuncName, ArrayList<GtFunc> FuncList) {
	//		Class<?> NativeClass = (Class<?>)ClassType.TypeBody;
	//		Method[] Methods = NativeClass.getDeclaredMethods();
	//		/*local*/boolean FoundMethod = false;
	//		if(Methods != null) {
	//			for(int i = 0; i < Methods.length; i++) {
	//				if(LibZen.EqualsString(FuncName, Methods[i].getName())) {
	//					if(!Modifier.isPublic(Methods[i].getModifiers())) {
	//						continue;
	//					}
	//					GtFunc NativeFunc = LibZen.ConvertNativeMethodToFunc(Methods[i]);
	//					Context.RootNameSpace.AppendMethod(NativeFunc, null);
	//					FuncList.add(NativeFunc);
	//					FoundMethod = true;
	//				}
	//			}
	//		}
	//		if(!FoundMethod) {
	//			Context.RootNameSpace.SetUndefinedSymbol(GtNameSpace.ClassSymbol(ClassType, FuncName), null);
	//		}
	//	}

	// Method
	public final static Object ApplyMethod(GtFunc Func, Object Self, Object[] Params) {
		try {
			//			System.err.println("** debug: " + Func.FuncBody);
			//			System.err.println("** debug: " + Self + ", Params.length=" + Params.length);
			return ((Method)Func.FuncBody).invoke(Self, Params);
		}
		catch (InvocationTargetException e) {
			LibZen.VerboseException(e);
		}
		catch (IllegalArgumentException e) {
			LibZen.VerboseException(e);
		}
		catch (IllegalAccessException e) {
			LibZen.VerboseException(e);
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
			return LibZen.ConvertNativeMethodToFunc(JavaMethod);
		}
		catch(NoSuchMethodException e) {
			LibZen.VerboseException(e);
			LibNative.Exit(1, e.toString());
		}
		return null;
	}

	public final static GtFunc LoadMatchFunc(Class<?> GrammarClass, String FuncName) {
		try {
			Method JavaMethod = GrammarClass.getMethod(FuncName, GtNameSpace.class, GtTokenContext.class, GtNode.class);
			return LibZen.ConvertNativeMethodToFunc(JavaMethod);
		}
		catch(NoSuchMethodException e) {
			LibZen.VerboseException(e);
			LibNative.Exit(1, e.toString());
		}
		return null;
	}

	public final static boolean IsSupportedNode(GtVisitor Visitor, GtNode Node) {
		try {
			Visitor.getClass().getMethod(Node.GetVisitName(), Node.getClass());
			return true;
		}
		catch(NoSuchMethodException e) {
		}
		return false;
	}

	public final static boolean VisitNode(GtVisitor Visitor, GtNode Node) {
		try {
			Method JavaMethod = Visitor.getClass().getMethod(Node.GetVisitName(), Node.getClass());
			return (Boolean)JavaMethod.invoke(Visitor, Node);
		}
		catch(Exception e) {
		}
		println("unsupported syntax: " + Node.SourceToken.ParsedText + " " + Node.getClass());
//		Visitor.ReportError(GreenTeaConsts.ErrorLevel, Node.Token, "unsupported syntax: " + Node.Token.ParsedText + " " + Node.getClass());
		return false;
	}

	// LibZen KonohaApi
	public final static void print(Object msg) {
		System.out.print(msg);
	}

	public final static void println(Object msg) {
		System.out.println(msg);
	}

	public final static void Assert(boolean TestResult) {
		if(!TestResult) {
			assert TestResult;
			LibNative.Exit(1, "Assertion Failed");
		}
	}

	public final static GtGenerator LoadGenerator(String ClassName, String OutputFile) {
//		if(ClassName == null) {
//			ClassName = "";
//		}
//		int GeneratorFlag = 0;
//		String Extension = (OutputFile == null) ? "-" : OutputFile;
//		ClassName = LibZen.DetectTargetCode(Extension, ClassName);
//		ClassName = ClassName.toLowerCase();
//		if(ClassName.startsWith("exe")) {
//			return new JavaByteCodeGenerator(ClassName, OutputFile, GeneratorFlag);
//		}
		
//		if(ClassName.startsWith("js") || ClassName.startsWith("javascript")) {
//			return new JavaScriptSourceGenerator(ClassName, OutputFile, GeneratorFlag);
//		}
//		else if(ClassName.startsWith("pl") || ClassName.startsWith("perl")) {
//			return new PerlSourceGenerator(ClassName, OutputFile, GeneratorFlag);
//		}
//		else if(ClassName.startsWith("python")) {
//			return new PythonSourceGenerator(ClassName, OutputFile, GeneratorFlag);
//		}
//		else if(ClassName.startsWith("bash")) {
//			return new BashSourceGenerator(ClassName, OutputFile, GeneratorFlag);
//		}
//		else if(TargetCode.startsWith("scala")) {
//			return new ScalaSourceGenerator(TargetCode, OutputFile, GeneratorFlag);
//		}
//		// FIXME CSharpSourceCodeGenerator.java is missing.
//		//else if(TargetCode.startsWith("csharp")) {
//		//	return new CSharpSourceCodeGenerator(TargetCode, OutputFile, GeneratorFlag);
//		//}
//		else if(ClassName.startsWith("c")) {
//			return new CSourceGenerator(ClassName, OutputFile, GeneratorFlag);
//		}
//		else if(ClassName.startsWith("lisp")) {
//			return new CommonLispSourceGenerator(ClassName, OutputFile, GeneratorFlag);
//		}
//		else if(ClassName.startsWith("minikonoha")) {
//			return new KonohaByteCodeGenerator(ClassName, OutputFile, GeneratorFlag);
//			//return new MiniKonohaSourceGenerator(TargetCode, OutputFile, GeneratorFlag);
//		}
		try {
			Class<?> GeneratorClass = Class.forName(ClassName);
			GtGenerator Generator = (GtGenerator)GeneratorClass.newInstance();
			return Generator;
		}
		catch(Exception e) {
		}
		return new GtSourceGenerator("konoha", "0.1");
	}

	public final static void Exit(int status, String Message) {
		System.err.println(Message);
		System.exit(1);
	}

	public final static String LoadScript(String FileName) {
		LibZen.VerboseLog(GreenTeaUtils.VerboseFile, "loading " + FileName);
		InputStream Stream = LibZen.class.getResourceAsStream("/" + FileName);
		if(Stream == null) {
			File f = new File(LibZen.FormatFilePath(FileName));
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


}
