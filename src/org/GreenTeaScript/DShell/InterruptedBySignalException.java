package org.GreenTeaScript.DShell;


public class InterruptedBySignalException extends DShellException {
	private static final long serialVersionUID = 1L;

	public InterruptedBySignalException(String message) {
		super(message);
	}
}