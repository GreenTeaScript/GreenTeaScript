package org.GreenTeaScript.DShell;


public class BadMessageException extends RelatedSyscallException {
	private static final long serialVersionUID = 1L;

	public BadMessageException(String message, String commandName, String[] syscalls) {
		super(message, commandName, syscalls);
	}
}