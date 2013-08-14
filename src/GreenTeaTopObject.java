
public class GreenTeaTopObject {
	/*field*/public GtType GreenType;
	GreenTeaTopObject/*constructor*/(GtType GreenType) {
		this.GreenType = GreenType;
	}
}

class GreenTeaArray extends GreenTeaTopObject {
	GreenTeaArray/*constructor*/(GtType GreenType) {
		super(GreenType);
	}
}

class GreenTeaEnum extends GreenTeaTopObject {
	/*field*/public final int EnumValue;
	/*field*/public final String EnumSymbol;
	GreenTeaEnum/*constructor*/(GtType GreenType, int EnumValue, String EnumSymbol) {
		super(GreenType);
		this.EnumValue = EnumValue;
		this.EnumSymbol = EnumSymbol;
	}
}

