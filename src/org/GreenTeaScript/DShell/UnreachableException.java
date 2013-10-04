package org.GreenTeaScript.DShell;


public class UnreachableException extends RelatedSyscallException {
	private static final long serialVersionUID = 1L;

	public UnreachableException(String message, String commandName, String[] syscalls) {
		super(message, commandName, syscalls);
	}
}