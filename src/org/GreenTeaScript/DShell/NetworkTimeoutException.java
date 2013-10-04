package org.GreenTeaScript.DShell;


public class NetworkTimeoutException extends RelatedSyscallException {
	private static final long serialVersionUID = 1L;

	public NetworkTimeoutException(String message, String commandName, String[] syscalls) {
		super(message, commandName, syscalls);
	}
}