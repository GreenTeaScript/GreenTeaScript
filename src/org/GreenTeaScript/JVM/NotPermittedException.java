package org.GreenTeaScript.JVM;

// shell Exception definition
public class NotPermittedException extends DShellException {
	private static final long serialVersionUID = 1L;

	public NotPermittedException(String message) {
		super(message);
	}
}