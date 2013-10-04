package org.GreenTeaScript.DShell;


public class TooLongMessageException extends RelatedSyscallException {
	private static final long serialVersionUID = 1L;

	public TooLongMessageException(String message, String commandName, String[] syscalls) {
		super(message, commandName, syscalls);
	}
}