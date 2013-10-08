package org.GreenTeaScript.DShell;


public class UnreachableNetworkException extends RelatedSyscallException {
	private static final long serialVersionUID = 1L;

	public UnreachableNetworkException(String message, String commandName, String[] syscalls) {
		super(message, commandName, syscalls);
	}
}