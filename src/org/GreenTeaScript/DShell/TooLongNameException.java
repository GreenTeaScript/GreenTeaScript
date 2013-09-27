package org.GreenTeaScript.DShell;


public class TooLongNameException extends DShellException {
	private static final long serialVersionUID = 1L;

	public TooLongNameException(String message) {
		super(message);
	}
}