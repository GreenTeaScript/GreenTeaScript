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

import zen.deps.LibNative;
import zen.deps.LibZen;
import zen.deps.ZenMap;
import zen.deps.ZenObject;
import zen.obsolete.GtPolyFunc;
import zen.parser.GtNameSpace;
import zen.parser.ZenLogger;

public class ZenSystem implements ZenTypeConst {

	/*field*/public final static ZenMap<Integer>               SourceMap = new ZenMap<Integer>(null);
	/*field*/public final static ArrayList<String>   SourceList = new ArrayList<String>();

	/*field*/public final static ZenMap<Object>			    ClassNameMap = new ZenMap<Object>(null);
	/*field*/public final static ArrayList<ZenType>  TypePools = new ArrayList<ZenType>();
	/*field*/public final static ArrayList<ZenFunc>  FuncPools = new ArrayList<ZenFunc>();

	/*field*/public final static ZenType		TopType = new ZenType(UniqueType, "var", null);
	/*field*/public final static ZenType		VarType = TopType;
	/*field*/public final static ZenType		VoidType = new ZenType(UniqueType, "void", null);
	/*field*/public final static ZenType		BooleanType = new ZenType(UniqueType|UnboxType, "boolean", TopType);
	/*field*/public final static ZenType		IntType = new ZenType(UniqueType|UnboxType, "int", TopType);
	/*field*/public final static ZenType        FloatType = new ZenType(UniqueType|UnboxType, "float", TopType);
	/*field*/public final static ZenType		StringType = new ZenType(UniqueType, "String", TopType);
	/*field*/public final static ZenType		AnyType = new ZenType(UniqueType|DynamicType, "any", TopType);
	/*field*/public final static ZenType        TypeType = new ZenType(UniqueType, "Type", TopType);
	/*field*/public final static ZenType		ArrayType = new ZenGeneric1Type(UniqueType, "Array", null, VarType);
	/*field*/public final static ZenType		FuncType  = new ZenFuncType("Func", null);

//	/*field*/public final static ZenType		EnumBaseType = ZenTypeSystem.TopType.CreateSubType(EnumType, "enum", null, ZenEnum.class);
	///*field*/public final static GtType		StructType;

//	/*field*/public final static ZenType     IteratorType = new ZenType(GenericVariable, "Iterator", null, Iterator.class);

//	/*field*/public final static ZenType		TopType = new ZenType(0, "Top", null, Object.class /*GreenTeaTopObject.class*/);
//	/*field*/public final static ZenType		VoidType = new ZenType(NativeType, "void", null, void.class);
//	/*field*/public final static ZenType		BooleanType = new ZenType(NativeType|UnboxType, "boolean", false, boolean.class);
//	/*field*/public final static ZenType		IntType = new ZenType(NativeType|UnboxType, "int", 0L, long.class);
//	/*field*/public final static ZenType        FloatType = new ZenType(NativeType|UnboxType, "float", 0.0, double.class);
//	/*field*/public final static ZenType		StringType = new ZenType(NativeType, "String", null, String.class);
//	/*field*/public final static ZenType		AnyType = new ZenType(DynamicType, "any", null, Object.class);
//	/*field*/public final static ZenType		ArrayType = ZenTypeSystem.TopType.CreateSubType(GenericVariable, "Array", null, ZenArray.class);
//	/*field*/public final static ZenType		FuncType  = ZenTypeSystem.TopType.CreateSubType(GenericVariable, "Func", null, ZenFunc.class);
//
//	/*field*/public final static ZenType		EnumBaseType = ZenTypeSystem.TopType.CreateSubType(EnumType, "enum", null, ZenEnum.class);
//	///*field*/public final static GtType		StructType;
//
//	/*field*/public final static ZenType		VarType = new ZenType(0, "var", null, null);
//	/*field*/public final static ZenType		TypeType = ZenTypeSystem.TopType.CreateSubType(0, "Type", null, ZenType.class);
//	/*field*/public final static ZenType     IteratorType = new ZenType(GenericVariable, "Iterator", null, Iterator.class);

	public final static long GetFileLine(String FileName, int Line) {
		/*local*/Object IdOrNull = ZenSystem.SourceMap.GetOrNull(FileName);
		/*local*/Integer Id = IdOrNull == null ? -1 : (/*cast*/Integer)IdOrNull;
		if(IdOrNull == null) {
			ZenSystem.SourceList.add(FileName);
			Id = ZenSystem.SourceList.size();
			ZenSystem.SourceMap.put(FileName, Id);
		}
		return LibZen.JoinIntId(Id, Line);
	}

	public final static String GetSourceFileName(long FileLine) {
		/*local*/int FileId = LibZen.UpperId(FileLine);
		return (FileId == 0) ? null : ZenSystem.SourceList.get(FileId - 1);
	}

	public final static int GetFileLineNumber(long FileLine) {
		return LibZen.LowerId(FileLine);
	}

	public final static String FormatFileLineNumber(long FileLine) {
		/*local*/int FileId = LibZen.UpperId(FileLine);
		/*local*/int Line = LibZen.LowerId(FileLine);
		/*local*/String FileName = (FileId == 0) ? "eval" : ZenSystem.SourceList.get(FileId - 1);
		return "(" + FileName + ":" + Line + ")";
	}

	/*field*/private static boolean IsInit = false;

	public final static void InitNameSpace(GtNameSpace NameSpace) {
		//ifdef JAVA
		if(!ZenSystem.IsInit) {
			ZenSystem.SetTypeTable("org.GreenTeaScript.GreenTeaTopObject", ZenSystem.TopType);
			ZenSystem.SetTypeTable("void",    ZenSystem.VoidType);
			ZenSystem.SetTypeTable("java.lang.Object",  ZenSystem.AnyType);
			ZenSystem.SetTypeTable("boolean", ZenSystem.BooleanType);
			ZenSystem.SetTypeTable("java.lang.Boolean", ZenSystem.BooleanType);
			ZenSystem.SetTypeTable("long",    ZenSystem.IntType);
			ZenSystem.SetTypeTable("java.lang.Long",    ZenSystem.IntType);
			ZenSystem.SetTypeTable("java.lang.String",  ZenSystem.StringType);
			ZenSystem.SetTypeTable("org.GreenTeaScript.GtType", ZenSystem.TypeType);
//			ZenTypeSystem.SetNativeTypeName("org.GreenTeaScript.GreenTeaEnum", ZenTypeSystem.EnumBaseType);
			ZenSystem.SetTypeTable("org.GreenTeaScript.GreenTeaArray", ZenSystem.ArrayType);
			ZenSystem.SetTypeTable("org.GreenTeaScript.Konoha.GreenTeaIntArray", ZenSystem.GetGenericType1(ZenSystem.ArrayType, ZenSystem.IntType, true));
			ZenSystem.SetTypeTable("double",    ZenSystem.FloatType);
			ZenSystem.SetTypeTable("java.lang.Double",  ZenSystem.FloatType);
//			ZenTypeSystem.SetNativeTypeName("java.util.Iterator",  ZenTypeSystem.IteratorType);
			ZenSystem.IsInit = true;
		}
		NameSpace.AppendTypeName(ZenSystem.VarType, null);
		NameSpace.AppendTypeName(ZenSystem.VoidType,  null);
		NameSpace.AppendTypeName(ZenSystem.BooleanType, null);
		NameSpace.AppendTypeName(ZenSystem.IntType, null);
		NameSpace.AppendTypeName(ZenSystem.FloatType, null);
		NameSpace.AppendTypeName(ZenSystem.StringType, null);
		NameSpace.AppendTypeName(ZenSystem.AnyType, null);
		NameSpace.AppendTypeName(ZenSystem.TypeType, null);
		NameSpace.AppendTypeName(ZenSystem.ArrayType, null);
		NameSpace.AppendTypeName(ZenSystem.FuncType, null);
//		NameSpace.AppendTypeName(ZenTypeSystem.IteratorType, null);
		//endif VAJA
	}

	public static int IssueTypeId(ZenType Type) {
		/*local*/int TypeId = ZenSystem.TypePools.size();
		ZenSystem.TypePools.add(Type);
		return TypeId;
	}

	public final static ZenType GetTypeById(int TypeId) {
		return ZenSystem.TypePools.get(TypeId);
	}

	public final static ZenType LookupTypeTable(String Key) {
		return (/*cast*/ZenType) ZenSystem.ClassNameMap.GetOrNull(Key);
	}

	public final static void SetTypeTable(String Key, ZenType Type) {
		ZenSystem.ClassNameMap.put(Key, Type);
		ZenLogger.VerboseLog(ZenLogger.VerboseSymbol, "global type name: " + Key + ", " + Type);
	}


	public final static ZenType GetNativeTypeOfValue(Object Value) {
		return LibNative.GetNativeType(LibNative.GetClassOfValue(Value));
	}

	public final static ZenType GuessType (Object Value) {
		if(Value instanceof ZenFunc) {
			return ((/*cast*/ZenFunc)Value).GetFuncType();
		}
		else if(Value instanceof GtPolyFunc) {
			return ZenSystem.FuncType;
		}
		else if(Value instanceof ZenObject) {
			// FIXME In typescript, we cannot use GreenTeaObject
			return ((/*cast*/ZenObject)Value).GetZenType();
		}
		else {
			return ZenSystem.GetNativeTypeOfValue(Value);
		}
	}

	public final static String MangleType2(ZenType Type1, ZenType Type2) {
		return ":" + Type1.TypeId + ":" + Type2.TypeId;
	}

	public final static String MangleTypes(int BaseIdx, ArrayList<ZenType> TypeList) {
		/*local*/String s = "";
		/*local*/int i = BaseIdx;
		while(i < LibZen.ListSize(TypeList)) {
			/*local*/ZenType Type = TypeList.get(i);
			s = s + ":" + Type.TypeId;
			i = i + 1;
		}
		return s;
	}

	public final static ZenType[] UniqueTypes(int BaseIdx, ArrayList<ZenType> TypeList) {
		/*local*/String MangleName = "[]" + ZenSystem.MangleTypes(BaseIdx, TypeList);
		/*local*/ZenType[] Types = (/*cast*/ZenType[])ZenSystem.ClassNameMap.GetOrNull(MangleName);
		if(Types == null) {
			Types = LibZen.CompactTypeList(BaseIdx, TypeList);
			ZenSystem.ClassNameMap.put(MangleName, Types);
		}
		return Types;
	}
	
	public final static ZenType GetGenericType1(ZenType BaseType, ZenType ParamType, boolean IsCreation) {
		/*local*/String MangleName = ZenSystem.MangleType2(BaseType, ParamType);
		/*local*/ZenType GenericType = (/*cast*/ZenType)ZenSystem.ClassNameMap.GetOrNull(MangleName);
		if((GenericType == null) && IsCreation) {
			/*local*/String Name = BaseType.ShortName + "<" + ParamType + ">";
			if(BaseType.IsArrayType()) {
				Name = BaseType.ShortName + "<" + ParamType + ">";
			}
			GenericType = new ZenGeneric1Type(UniqueType, Name, BaseType, ParamType);
			ZenSystem.SetTypeTable(MangleName, GenericType);
		}
		return GenericType;
	}
	
	public final static ZenType GetGenericType(ZenType BaseType, int BaseIdx, ArrayList<ZenType> TypeList, boolean IsCreation) {
		assert(BaseType.GetParamSize() > 0);
		if(TypeList.size() - BaseIdx == 1 && !BaseType.IsFuncType()) {
			return ZenSystem.GetGenericType1(BaseType, TypeList.get(BaseIdx), IsCreation);
		}
		/*local*/String MangleName = ":" + BaseType.TypeId + ZenSystem.MangleTypes(BaseIdx, TypeList);
		/*local*/ZenType GenericType = (/*cast*/ZenType)ZenSystem.ClassNameMap.GetOrNull(MangleName);
		if((GenericType == null) && IsCreation) {
			/*local*/int i = BaseIdx;
			/*local*/String ShortName = BaseType.ShortName + "<";
			while(i < LibZen.ListSize(TypeList)) {
				ShortName = ShortName + TypeList.get(i).ShortName;
				i += 1;
				if(i == LibZen.ListSize(TypeList)) {
					ShortName = ShortName + ">";
				}
				else {
					ShortName = ShortName + ",";
				}
			}
			if(BaseType.IsFuncType()) {
				GenericType = new ZenFuncType(ShortName, ZenSystem.UniqueTypes(BaseIdx, TypeList));
			}
			else {
				throw new RuntimeException("TODO: Make ZenGenericType");
			}
			ZenSystem.SetTypeTable(MangleName, GenericType);
		}
		return GenericType;
	}

	//	private final String SubtypeKey(GtType FromType, GtType ToType) {
	//		return FromType.GetUniqueName() + "<" + ToType.GetUniqueName();
	//	}

	public final static boolean CheckSubType(ZenType SubType, ZenType SuperType) {
		// TODO: Structual Typing database
		return false;
	}

	public final static ZenFunc GetFuncById(int FuncId) {
		return ZenSystem.FuncPools.get(FuncId);
	}

	public static ZenFunc GetConverterFunc(ZenType ValueType, ZenType CastType, boolean SearchRecursive) {
		// TODO Auto-generated method stub
		return null;
	}

	// ConstPool
	/*field*/private static final ArrayList<Object> ConstPoolList = new ArrayList<Object>();

	public static int AddConstPool(Object o) {
		/*local*/int PooledId = ZenSystem.ConstPoolList.indexOf(o);
		if(PooledId != -1) {
			return PooledId;
		}
		else {
			ZenSystem.ConstPoolList.add(o);
			return ZenSystem.ConstPoolList.size() - 1;
		}
	}

	public static Object GetConstPool(int PooledId) {
		return ZenSystem.ConstPoolList.get(PooledId);
	}


	public static ZenType GetFuncType(ZenFunc Func) {
		return ZenSystem.GetGenericType(ZenSystem.FuncType, 0, new ArrayList<ZenType>(Arrays.asList(Func.Types)), true);
	}


}
