package org.GreenTeaScript.DShell;


public class NoChildException extends RelatedSyscallException {
	private static final long serialVersionUID = 1L;

	public NoChildException(String message, String commandName, String[] syscalls) {
		super(message, commandName, syscalls);
	}
}