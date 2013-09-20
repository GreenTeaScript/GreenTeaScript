package org.GreenTeaScript.JVM;

public class InterruptedBySignalException extends Exception {
	private static final long serialVersionUID = 1L;

	public InterruptedBySignalException(String message) {
		super(message);
	}
}