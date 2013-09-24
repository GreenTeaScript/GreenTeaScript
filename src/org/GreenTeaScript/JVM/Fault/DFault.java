package org.GreenTeaScript.JVM.Fault;

public class DFault extends Exception {
	private static final long serialVersionUID = -6178247864604881183L;
	public String CurrentNodeName = "";
	public String CallerNodeName  = "";
	public long DCaseRevision = 0;
	public String Location;

	public DFault(String location) {
		this.Location = location;
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

	public static boolean binary_ne(DFault x, DFault y) {
		return !binary_eq(x, y);
	}

	public static void setLocation(DFault self, String location) {
		self.Location = location;
	}

	public static String getLocation(DFault self) {
		return self.Location;
	}

	public static DFault _new(String location) { //FIXME
		return new DFault(location);
	}
}