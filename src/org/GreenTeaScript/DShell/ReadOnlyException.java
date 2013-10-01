package org.GreenTeaScript.DShell;


public class ReadOnlyException extends DShellException {
	private static final long serialVersionUID = 1L;

	public ReadOnlyException(String message) {
		super(message);
	}
}