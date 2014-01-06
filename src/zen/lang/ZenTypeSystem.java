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

//ifdef JAVA
package zen.lang;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Iterator;

import zen.deps.LibNative;
import zen.deps.LibZen;
import zen.deps.ZenArray;
import zen.deps.ZenEnum;
import zen.deps.ZenMap;
import zen.deps.ZenObject;
import zen.obsolete.GtPolyFunc;
import zen.parser.GtNameSpace;
import zen.parser.GtType;
import zen.parser.ZenParserConst;
import zen.parser.ZenUtils;

public class ZenTypeSystem implements ZenParserConst {

	/*field*/public final static ZenMap               SourceMap = new ZenMap();
	/*field*/public final static ArrayList<String>   SourceList = new ArrayList<String>();

	/*field*/public final static ZenMap			    ClassNameMap = new ZenMap();
	/*field*/public final static ArrayList<GtType>  TypePools = new ArrayList<GtType>();
	/*field*/public final static ArrayList<ZenFunc>  FuncPools = new ArrayList<ZenFunc>();

	/*field*/public final static GtType		TopType = new GtType(0, "Top", null, Object.class /*GreenTeaTopObject.class*/);
	/*field*/public final static GtType		VoidType = new GtType(ZenParserConst.NativeType, "void", null, void.class);
	/*field*/public final static GtType		BooleanType = new GtType(ZenParserConst.NativeType|ZenParserConst.UnboxType, "boolean", false, boolean.class);
	/*field*/public final static GtType		IntType = new GtType(ZenParserConst.NativeType|ZenParserConst.UnboxType, "int", 0L, long.class);
	/*field*/public final static GtType     FloatType = new GtType(ZenParserConst.NativeType|ZenParserConst.UnboxType, "float", 0.0, double.class);
	/*field*/public final static GtType		StringType = new GtType(ZenParserConst.NativeType, "String", null, String.class);
	/*field*/public final static GtType		AnyType = new GtType(ZenParserConst.DynamicType, "any", null, Object.class);
	/*field*/public final static GtType		ArrayType = ZenTypeSystem.TopType.CreateSubType(ZenParserConst.GenericVariable, "Array", null, ZenArray.class);
	/*field*/public final static GtType		FuncType  = ZenTypeSystem.TopType.CreateSubType(ZenParserConst.GenericVariable, "Func", null, ZenFunc.class);

	/*field*/public final static GtType		EnumBaseType = ZenTypeSystem.TopType.CreateSubType(ZenParserConst.EnumType, "enum", null, ZenEnum.class);
	///*field*/public final static GtType		StructType;

	/*field*/public final static GtType		VarType = new GtType(0, "var", null, null);
	/*field*/public final static GtType		TypeType = ZenTypeSystem.TopType.CreateSubType(0, "Type", null, GtType.class);
	/*field*/public final static GtType     IteratorType = new GtType(ZenParserConst.GenericVariable, "Iterator", null, Iterator.class);

	public final static long GetFileLine(String FileName, int Line) {
		/*local*/Object IdOrNull = ZenTypeSystem.SourceMap.GetOrNull(FileName);
		/*local*/Integer Id = IdOrNull == null ? -1 : (/*cast*/Integer)IdOrNull;
		if(IdOrNull == null) {
			ZenTypeSystem.SourceList.add(FileName);
			Id = ZenTypeSystem.SourceList.size();
			ZenTypeSystem.SourceMap.put(FileName, Id);
		}
		return LibZen.JoinIntId(Id, Line);
	}


	public final static String GetSourceFileName(long FileLine) {
		/*local*/int FileId = LibZen.UpperId(FileLine);
		return (FileId == 0) ? null : ZenTypeSystem.SourceList.get(FileId - 1);
	}

	public final static int GetFileLineNumber(long FileLine) {
		return LibZen.LowerId(FileLine);
	}

	public final static String FormatFileLineNumber(long FileLine) {
		/*local*/int FileId = LibZen.UpperId(FileLine);
		/*local*/int Line = LibZen.LowerId(FileLine);
		/*local*/String FileName = (FileId == 0) ? "eval" : ZenTypeSystem.SourceList.get(FileId - 1);
		return "(" + FileName + ":" + Line + ")";
	}

	/*field*/private static boolean IsInit = false;

	public final static void InitNameSpace(GtNameSpace NameSpace) {
		//ifdef JAVA
		if(!ZenTypeSystem.IsInit) {
			ZenTypeSystem.ArrayType.TypeParams = new GtType[1];
			ZenTypeSystem.ArrayType.TypeParams[0] = ZenTypeSystem.VarType;
			ZenTypeSystem.FuncType.TypeParams = new GtType[1];
			ZenTypeSystem.FuncType.TypeParams[0] = ZenTypeSystem.VarType;  // for PolyFunc
			ZenTypeSystem.IteratorType.TypeParams = new GtType[1];
			ZenTypeSystem.IteratorType.TypeParams[0] = ZenTypeSystem.VarType;

			ZenTypeSystem.SetNativeTypeName("org.GreenTeaScript.GreenTeaTopObject", ZenTypeSystem.TopType);
			ZenTypeSystem.SetNativeTypeName("void",    ZenTypeSystem.VoidType);
			ZenTypeSystem.SetNativeTypeName("java.lang.Object",  ZenTypeSystem.AnyType);
			ZenTypeSystem.SetNativeTypeName("boolean", ZenTypeSystem.BooleanType);
			ZenTypeSystem.SetNativeTypeName("java.lang.Boolean", ZenTypeSystem.BooleanType);
			ZenTypeSystem.SetNativeTypeName("long",    ZenTypeSystem.IntType);
			ZenTypeSystem.SetNativeTypeName("java.lang.Long",    ZenTypeSystem.IntType);
			ZenTypeSystem.SetNativeTypeName("java.lang.String",  ZenTypeSystem.StringType);
			ZenTypeSystem.SetNativeTypeName("org.GreenTeaScript.GtType", ZenTypeSystem.TypeType);
			ZenTypeSystem.SetNativeTypeName("org.GreenTeaScript.GreenTeaEnum", ZenTypeSystem.EnumBaseType);
			ZenTypeSystem.SetNativeTypeName("org.GreenTeaScript.GreenTeaArray", ZenTypeSystem.ArrayType);
			ZenTypeSystem.SetNativeTypeName("org.GreenTeaScript.Konoha.GreenTeaIntArray", ZenTypeSystem.GetGenericType1(ZenTypeSystem.ArrayType, ZenTypeSystem.IntType, true));
			ZenTypeSystem.SetNativeTypeName("double",    ZenTypeSystem.FloatType);
			ZenTypeSystem.SetNativeTypeName("java.lang.Double",  ZenTypeSystem.FloatType);
			ZenTypeSystem.SetNativeTypeName("java.util.Iterator",  ZenTypeSystem.IteratorType);
			ZenTypeSystem.IsInit = true;
		}
		NameSpace.AppendTypeName(ZenTypeSystem.TopType,  null);
		NameSpace.AppendTypeName(ZenTypeSystem.VoidType,  null);
		NameSpace.AppendTypeName(ZenTypeSystem.BooleanType, null);
		NameSpace.AppendTypeName(ZenTypeSystem.IntType, null);
		NameSpace.AppendTypeName(ZenTypeSystem.FloatType, null);
		NameSpace.AppendTypeName(ZenTypeSystem.StringType, null);
		NameSpace.AppendTypeName(ZenTypeSystem.VarType, null);
		NameSpace.AppendTypeName(ZenTypeSystem.AnyType, null);
		NameSpace.AppendTypeName(ZenTypeSystem.TypeType, null);
		NameSpace.AppendTypeName(ZenTypeSystem.ArrayType, null);
		NameSpace.AppendTypeName(ZenTypeSystem.FuncType, null);
		NameSpace.AppendTypeName(ZenTypeSystem.IteratorType, null);
		//endif VAJA
	}

	public static int IssueTypeId(GtType Type) {
		/*local*/int TypeId = ZenTypeSystem.TypePools.size();
		ZenTypeSystem.TypePools.add(Type);
		return TypeId;
	}

	public final static GtType GetTypeById(int TypeId) {
		return ZenTypeSystem.TypePools.get(TypeId);
	}

	public final static void SetNativeTypeName(String Name, GtType Type) {
		ZenTypeSystem.ClassNameMap.put(Name, Type);
		LibZen.VerboseLog(ZenParserConst.VerboseSymbol, "global type name: " + Name + ", " + Type);
	}

	public final static GtType GetNativeTypeOfValue(Object Value) {
		return LibNative.GetNativeType(LibNative.GetClassOfValue(Value));
	}

	public final static GtType GuessType (Object Value) {
		if(Value instanceof ZenFunc) {
			return ((/*cast*/ZenFunc)Value).GetFuncType();
		}
		else if(Value instanceof GtPolyFunc) {
			return ZenTypeSystem.FuncType;
		}
		else if(Value instanceof ZenObject) {
			// FIXME In typescript, we cannot use GreenTeaObject
			return ((/*cast*/ZenObject)Value).GetZenType();
		}
		else {
			return ZenTypeSystem.GetNativeTypeOfValue(Value);
		}
	}

	public final static GtType GetGenericType(GtType BaseType, int BaseIdx, ArrayList<GtType> TypeList, boolean IsCreation) {
		LibNative.Assert(BaseType.IsGenericType());
		/*local*/String MangleName = ZenUtils.MangleGenericType(BaseType, BaseIdx, TypeList);
		/*local*/GtType GenericType = (/*cast*/GtType)ZenTypeSystem.ClassNameMap.GetOrNull(MangleName);
		if((GenericType == null) && IsCreation) {
			/*local*/int i = BaseIdx;
			/*local*/String s = BaseType.ShortName + "<";
			while(i < LibZen.ListSize(TypeList)) {
				s = s + TypeList.get(i).ShortName;
				i += 1;
				if(i == LibZen.ListSize(TypeList)) {
					s = s + ">";
				}
				else {
					s = s + ",";
				}
			}
			GenericType = BaseType.CreateGenericType(BaseIdx, TypeList, s);
			ZenTypeSystem.SetNativeTypeName(MangleName, GenericType);
		}
		return GenericType;
	}

	public final static GtType GetGenericType1(GtType BaseType, GtType ParamType, boolean IsCreation) {
		/*local*/ArrayList<GtType> TypeList = new ArrayList<GtType>();
		TypeList.add(ParamType);
		return ZenTypeSystem.GetGenericType(BaseType, 0, TypeList, IsCreation);
	}

	//	private final String SubtypeKey(GtType FromType, GtType ToType) {
	//		return FromType.GetUniqueName() + "<" + ToType.GetUniqueName();
	//	}

	public final static boolean CheckSubType(GtType SubType, GtType SuperType) {
		// TODO: Structual Typing database
		return false;
	}

	public final static ZenFunc GetFuncById(int FuncId) {
		return ZenTypeSystem.FuncPools.get(FuncId);
	}

	public static ZenFunc GetConverterFunc(GtType ValueType, GtType CastType, boolean SearchRecursive) {
		// TODO Auto-generated method stub
		return null;
	}


	// ConstPool
	/*field*/private static final ArrayList<Object> ConstPoolList = new ArrayList<Object>();

	public static int AddConstPool(Object o) {
		/*local*/int PooledId = ZenTypeSystem.ConstPoolList.indexOf(o);
		if(PooledId != -1) {
			return PooledId;
		}
		else {
			ZenTypeSystem.ConstPoolList.add(o);
			return ZenTypeSystem.ConstPoolList.size() - 1;
		}
	}

	public static Object GetConstPool(int PooledId) {
		return ZenTypeSystem.ConstPoolList.get(PooledId);
	}


	public static GtType GetFuncType(ZenFunc Func) {
		return ZenTypeSystem.GetGenericType(ZenTypeSystem.FuncType, 0, new ArrayList<GtType>(Arrays.asList(Func.Types)), true);
	}


}
