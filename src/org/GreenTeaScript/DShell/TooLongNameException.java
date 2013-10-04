package org.GreenTeaScript.DShell;


public class TooLongNameException extends RelatedSyscallException {
	private static final long serialVersionUID = 1L;

	public TooLongNameException(String message, String commandName, String[] syscalls) {
		super(message, commandName, syscalls);
	}
}