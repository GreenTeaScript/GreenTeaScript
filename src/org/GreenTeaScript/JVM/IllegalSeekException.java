package org.GreenTeaScript.JVM;

public class IllegalSeekException extends Exception {
	private static final long serialVersionUID = 1L;

	public IllegalSeekException(String message) {
		super(message);
	}
}