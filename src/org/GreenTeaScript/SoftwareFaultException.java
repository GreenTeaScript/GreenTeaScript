package org.GreenTeaScript;

public class SoftwareFaultException extends RuntimeException {
	public Object ErrorSource;
	public SoftwareFaultException/*constructor*/(Object ErrorSource) {
		super(ErrorSource.toString());
		this.ErrorSource = ErrorSource;
	}
}
