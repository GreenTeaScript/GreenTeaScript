package org.GreenTeaScript.DShell;


public class NetworkTimeoutException extends DShellException {
	private static final long serialVersionUID = 1L;

	public NetworkTimeoutException(String message) {
		super(message);
	}
}