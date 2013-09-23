package org.GreenTeaScript.JVM.Fault;

public class DFault extends Exception {
	private static final long serialVersionUID = -6178247864604881183L;
	public String CurrentNodeName = "";
	public String CallerNodeName  = "";
	public long DCaseRevision = 0;
	public DFault() {
	}

	public void UpdateFaultInfomation(String CurrentNodeName, String CallerNodeName, long DCaseRevision) {
		this.CurrentNodeName = CurrentNodeName;
		this.CallerNodeName  = CallerNodeName;
		this.DCaseRevision   = DCaseRevision;
	}
	public static boolean binary_eq(DFault x, DFault y) {
		if(x == null || y == null) {
			return x == y;
		}
		return x.equals(y);
	}
}