package org.GreenTeaScript.DShell;


public class NotDirectoryException extends RelatedSyscallException {
	private static final long serialVersionUID = 1L;

	public NotDirectoryException(String message, String commandName, String[] syscalls) {
		super(message, commandName, syscalls);
	}
}