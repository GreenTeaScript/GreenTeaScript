package org.GreenTeaScript.DShell;


public class ConnectRefusedException extends DShellException {
	private static final long serialVersionUID = 1L;

	public ConnectRefusedException(String message) {
		super(message);
	}
}