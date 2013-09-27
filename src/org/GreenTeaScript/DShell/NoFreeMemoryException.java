package org.GreenTeaScript.DShell;


public class NoFreeMemoryException extends DShellException {
	private static final long serialVersionUID = 1L;

	public NoFreeMemoryException(String message) {
		super(message);
	}
}