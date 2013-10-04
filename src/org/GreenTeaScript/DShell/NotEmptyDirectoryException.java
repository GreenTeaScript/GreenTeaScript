package org.GreenTeaScript.DShell;


public class NotEmptyDirectoryException extends RelatedSyscallException {
	private static final long serialVersionUID = 1L;

	public NotEmptyDirectoryException(String message, String commandName, String[] syscalls) {
		super(message, commandName, syscalls);
	}
}