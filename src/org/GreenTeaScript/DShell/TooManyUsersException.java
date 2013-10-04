package org.GreenTeaScript.DShell;


public class TooManyUsersException extends RelatedSyscallException {
	private static final long serialVersionUID = 1L;

	public TooManyUsersException(String message, String commandName, String[] syscalls) {
		super(message, commandName, syscalls);
	}
}