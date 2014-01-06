package zen.lang;

public final class ZenFuncType extends ZenType {
	/*field*/public ZenType[]		TypeParams;
	public ZenFuncType(String ShortName, ZenType[] UniqueTypeParams) {
		super(UniqueType, ShortName, ZenSystem.TopType);
		if(UniqueTypeParams == null) {
			this.TypeParams = new ZenType[1];
			this.TypeParams[0] = ZenSystem.VarType;
		}
		else {
			this.TypeParams = UniqueTypeParams;
		}
	}

	@Override
	public boolean IsFuncType() {
		return true;
	}
	
	@Override public ZenType GetBaseType() {
		return ZenSystem.FuncType;
	}

	@Override public int GetParamSize() {
		return this.TypeParams.length;
	}

	@Override public ZenType GetParamType(int Index) {
		return this.TypeParams[Index];
	}

}
