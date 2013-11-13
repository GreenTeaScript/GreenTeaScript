package org.GreenTeaScript;

public class SoftwareFaultException extends RuntimeException {
	private static final long serialVersionUID = 1L;
	public Object ErrorSource;
	public SoftwareFaultException/*constructor*/(Object ErrorSource) {
		super(ErrorSource.toString());
		this.ErrorSource = ErrorSource;
	}
	public String GetStackTrace() {
		String Message = "";
//ifdef JAVA
		Message += this.ErrorSource + "\n";
		StackTraceElement[] Elements = this.getStackTrace();
		for(StackTraceElement e : Elements) {
			String MethodName = e.getMethodName();
//			System.out.println("*** " + MethodName);
			Message += "\tat " + MethodName + "(" + e.getFileName() + ":" + e.getLineNumber() + ")\n";
			if(MethodName.equals("main")) {
				break;
			}
		}
//endif VAJA
		return Message;
	}
}
