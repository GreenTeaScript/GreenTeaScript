package org.GreenTeaScript;

public class GreenTeaTopObject implements GreenTeaObject {
	/*field*/public GtType GreenType;
	public GreenTeaTopObject/*constructor*/(GtType GreenType) {
		this.GreenType = GreenType;
	}
	public final GtType GetGreenType() {
		return this.GreenType;
	}
}