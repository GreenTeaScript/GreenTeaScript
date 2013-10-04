package org.GreenTeaScript.DShell;


public class IsDirectoryException extends RelatedSyscallException {
	private static final long serialVersionUID = 1L;

	public IsDirectoryException(String message, String commandName, String[] syscalls) {
		super(message, commandName, syscalls);
	}
}