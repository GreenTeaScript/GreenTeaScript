package org.GreenTeaScript.DShell;


public class TooManyFileOpenException extends RelatedSyscallException {
	private static final long serialVersionUID = 1L;

	public TooManyFileOpenException(String message, String commandName, String[] syscalls) {
		super(message, commandName, syscalls);
	}
}