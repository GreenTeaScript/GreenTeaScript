package org.GreenTeaScript.DShell;


public class TooManyArgsException extends RelatedSyscallException {
	private static final long serialVersionUID = 1L;

	public TooManyArgsException(String message, String commandName, String[] syscalls) {
		super(message, commandName, syscalls);
	}
}