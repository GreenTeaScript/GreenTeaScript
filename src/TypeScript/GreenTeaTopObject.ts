/// <reference path="LangDeps.ts" />

class GreenTeaTopObject {
	public GreenType: GtType;
	constructor(GreenType: GtType) {
		this.GreenType = GreenType;
	}
}

class GreenTeaArray extends GreenTeaTopObject {
	constructor(GreenType: GtType) {
		super(GreenType);
	}
}

class GreenTeaEnum extends GreenTeaTopObject {
	 EnumValue: number;
	 EnumSymbol: string;
	constructor(GreenType: GtType, EnumValue: number, EnumSymbol: string) {
		super(GreenType);
		this.EnumValue = EnumValue;
		this.EnumSymbol = EnumSymbol;
	}
}

