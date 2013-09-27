package org.GreenTeaScript.DShell;


public class NoFreeSpaceException extends DShellException {
	private static final long serialVersionUID = 1L;

	public NoFreeSpaceException(String message) {
		super(message);
	}
}