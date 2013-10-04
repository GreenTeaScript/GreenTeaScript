package org.GreenTeaScript.DShell;


public class InvalidArgumentException extends RelatedSyscallException {
	private static final long serialVersionUID = 1L;

	public InvalidArgumentException(String message, String commandName, String[] syscalls) {
		super(message, commandName, syscalls);
	}
}