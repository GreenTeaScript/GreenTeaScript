package org.GreenTeaScript.DShell;


public class TooManyArgsException extends DShellException {
	private static final long serialVersionUID = 1L;

	public TooManyArgsException(String message) {
		super(message);
	}
}