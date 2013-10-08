package org.GreenTeaScript.DShell;


public class ConnectionTimeoutException extends RelatedSyscallException {
	private static final long serialVersionUID = 1L;

	public ConnectionTimeoutException(String message, String commandName, String[] syscalls) {
		super(message, commandName, syscalls);
	}
}