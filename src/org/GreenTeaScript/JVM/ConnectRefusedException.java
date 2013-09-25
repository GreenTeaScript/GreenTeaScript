package org.GreenTeaScript.JVM;

public class ConnectRefusedException extends DShellException {
	private static final long serialVersionUID = 1L;

	public ConnectRefusedException(String message) {
		super(message);
	}
}