package zen.deps;

import zen.lang.ZenType;

public class ZenNativeType extends ZenType {
	/*field*/public Class<?>          JClass;
	
	ZenNativeType(Class<?> JType) {
		super(UniqueType, JType.getSimpleName(), null);
		this.JClass = JType;
	}

	@Override public ZenType GetSuperType() {
		return LibNative.GetNativeType(this.JClass.getSuperclass());
	}

}
