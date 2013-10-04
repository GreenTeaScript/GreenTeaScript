package org.GreenTeaScript.DShell;


public class NoFreeMemoryException extends RelatedSyscallException {
	private static final long serialVersionUID = 1L;

	public NoFreeMemoryException(String message, String commandName, String[] syscalls) {
		super(message, commandName, syscalls);
	}
}