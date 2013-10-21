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
import java.lang.reflect.Method;
import java.lang.reflect.Modifier;
//import java.util.ArrayList;
//import java.util.Iterator;
//import org.GreenTeaScript.Konoha.ArrayApi;

public class LibNative {
	final static void DebugP(String s) {
		//System.err.println("LibNative.DebugP: " + s);
	}
	// type
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

	public final static boolean MatchNativeMethod(GtType[] GreenTypeParams, Method JavaMethod) {
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

}
