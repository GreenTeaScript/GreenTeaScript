package org.GreenTeaScript;

import java.util.ArrayList;

public class GtType extends GreenTeaUtils implements GreenTeaType {
	/*field*/public final GtParserContext	Context;
	/*field*/public GtNameSpace     PackageNameSpace;
	/*field*/int					TypeFlag;
	/*field*/int                    TypeId;
	/*field*/public String			ShortName;
	/*field*/GtType					SuperType;
	/*field*/public GtType			ParentMethodSearch;
	/*field*/GtType					BaseType;
	/*field*/GtType[]				TypeParams;
	/*field*/public Object          TypeBody;
	/*field*/public Object			DefaultNullValue;

	GtType/*constructor*/(GtParserContext Context, int TypeFlag, String ShortName, Object DefaultNullValue, Object TypeBody) {
		this.Context = Context;
		this.TypeFlag = TypeFlag;
		this.ShortName = ShortName;
		this.SuperType = null;
		this.BaseType = this;
		this.ParentMethodSearch = null;
		this.DefaultNullValue = DefaultNullValue;
		this.TypeBody = TypeBody;
		if(!IsFlag(TypeFlag, TypeVariable)) {
			this.TypeId = Context.TypeCount;
			Context.TypeCount += 1;
		}
		this.TypeParams = null;
	}

	public GtType CreateSubType(int ClassFlag, String ClassName, Object DefaultNullValue, Object NativeSpec) {
		/*local*/GtType SubType = new GtType(this.Context, ClassFlag, ClassName, DefaultNullValue, NativeSpec);
		SubType.SuperType = this;
		SubType.ParentMethodSearch = this;
		return SubType;
	}

	// Note Don't call this directly. Use Context.GetGenericType instead.
	public GtType CreateGenericType(int BaseIndex, ArrayList<GtType> TypeList, String ShortName) {
		/*local*/int i = BaseIndex;
		/*local*/int TypeVariableFlag = 0;
		while(i < TypeList.size()) {
			if(TypeList.get(i).HasTypeVariable()) {
				TypeVariableFlag = GenericVariable;
				break;
			}
			i = i + 1;
		}
		/*local*/GtType GenericType = new GtType(this.Context, this.TypeFlag, ShortName, null, null);
		GenericType.BaseType = this.BaseType;
		GenericType.ParentMethodSearch = this.BaseType;
		GenericType.SuperType = this.SuperType;
		GenericType.TypeParams = LibGreenTea.CompactTypeList(BaseIndex, TypeList);
		LibGreenTea.VerboseLog(VerboseType, "new class: " + GenericType.ShortName + ", ClassId=" + GenericType.TypeId);
		return GenericType;
	}

	public final boolean IsAbstract() {
		return (this.TypeBody == null && this.SuperType == this.Context.StructType/*default*/);
	}

	public final boolean IsNative() {
		return IsFlag(this.TypeFlag, NativeType);
	}

	public final boolean IsDynamic() {
		return IsFlag(this.TypeFlag, DynamicType);
	}

	public final boolean IsGenericType() {
		return (this.TypeParams != null);
	}

	@Override public String toString() {
		return this.ShortName;
	}

	public final String GetNativeName() {
		if(IsFlag(this.TypeFlag, ExportType)) {
			return this.ShortName;
		}
		else {
			return this.BaseType.ShortName + NativeNameSuffix + this.TypeId;
		}
	}

	public final String GetUniqueName() {
		if(IsFlag(this.TypeFlag, TypeVariable)) {
			return this.ShortName;
		}
		else {
			if(LibGreenTea.DebugMode) {
				return this.BaseType.ShortName + NativeNameSuffix + this.TypeId;
			}
			else {
				return NativeNameSuffix + this.TypeId;
			}
		}
	}

	public final boolean Accept(GtType Type) {
		if(this == Type/* || this == this.Context.AnyType*/) {
			return true;
		}
		/*local*/GtType SuperClass = this.SuperType;
		while(SuperClass != null) {
			if(SuperClass == Type) {
				return true;
			}
			SuperClass = SuperClass.SuperType;
		}
		return this.Context.CheckSubType(Type, this);
	}

	public final boolean AcceptValue(Object Value) {
		return (Value != null) ? this.Accept(this.Context.GuessType(Value)) : true;
	}

	public void SetClassField(GtClassField ClassField) {
		this.TypeBody = ClassField;
	}

	public final boolean IsFuncType() {
		return (this.BaseType == this.Context.FuncType);
	}

	public final boolean IsVoidType() {
		return (this == this.Context.VoidType);
	}

	public final boolean IsVarType() {
		return (this == this.Context.VarType);
	}

	public final boolean IsAnyType() {
		return (this == this.Context.AnyType);
	}

	public final boolean IsTypeType() {
		return (this == this.Context.TypeType);
	}

	public final boolean IsBooleanType() {
		return (this == this.Context.BooleanType);
	}

	public final boolean IsStringType() {
		return (this == this.Context.StringType);
	}

	public final boolean IsArrayType() {
		return (this == this.Context.ArrayType);
	}

	public final boolean IsEnumType() {
		return IsFlag(this.TypeFlag, EnumType);
	}

	public boolean IsDynamicNaitiveLoading() {
		return this.IsNative() && !IsFlag(this.TypeFlag, CommonType);
	}

	public final boolean IsTypeVariable() {   // T
		return IsFlag(this.TypeFlag, TypeVariable);
	}

	public final boolean HasTypeVariable() {
		return IsFlag(this.TypeFlag, TypeVariable) || IsFlag(this.TypeFlag, GenericVariable);
	}

	public int AppendTypeVariable(GtNameSpace GenericNameSpace, int Count) {
		if(IsFlag(this.TypeFlag, TypeVariable)) {
			GtType TypeVar = GenericNameSpace.GetType(this.ShortName);
			if(TypeVar != null && TypeVar.IsTypeVariable()) {
				return Count;
			}
			GenericNameSpace.SetSymbol(this.ShortName, this, null);
			return Count + 1;
		}
		if(IsFlag(this.TypeFlag, GenericVariable)) {
			/*local*/int i = 0;
			while(i < this.TypeParams.length) {
				Count = this.TypeParams[i].AppendTypeVariable(GenericNameSpace, Count);
				i += 1;
			}
		}
		return Count;
	}

	public GtType RealType(GtNameSpace GenericNameSpace, GtType GivenType) {
		if(IsFlag(this.TypeFlag, TypeVariable)) {
			GtType TypeVar = GenericNameSpace.GetType(this.ShortName);
			if(TypeVar != null && !TypeVar.IsTypeVariable()) {
				GenericNameSpace.SetSymbol(this.ShortName, GivenType, null);
				return GivenType;
			}
			else {
				return TypeVar;
			}
		}
		if(IsFlag(this.TypeFlag, GenericVariable)) {
			if(GivenType.BaseType == this.BaseType && GivenType.TypeParams.length == this.TypeParams.length) {
				/*local*/int i = 0;
				ArrayList<GtType> TypeList = new ArrayList<GtType>();
				while(i < this.TypeParams.length) {
					GtType RealParamType = this.TypeParams[i].RealType(GenericNameSpace, GivenType.TypeParams[i]);
					TypeList.add(RealParamType);
					i += 1;
				}
				return this.Context.GetGenericType(this.BaseType, 0, TypeList, true);
			}
		}
		return this;
	}

	public boolean Match(GtNameSpace GenericNameSpace, GtType GivenType) {
		if(IsFlag(this.TypeFlag, TypeVariable)) {
			GtType TypeVar = GenericNameSpace.GetType(this.ShortName);
			if(TypeVar.IsTypeVariable()) {
				GenericNameSpace.SetSymbol(this.ShortName, GivenType, null);
				return true;
			}
			return TypeVar.Accept(GivenType);
		}
		if(IsFlag(this.TypeFlag, GenericVariable)) {
			if(GivenType.BaseType == this.BaseType && GivenType.TypeParams.length == this.TypeParams.length) {
				/*local*/int i = 0;
				while(i < this.TypeParams.length) {
					if(!this.TypeParams[i].Match(GenericNameSpace, GivenType.TypeParams[i])) {
						return false;
					}
					i += 1;
				}
				return true;
			}
			return false;
		}
		return this.Accept(GivenType);
	}

}