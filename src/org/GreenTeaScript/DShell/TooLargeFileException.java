package org.GreenTeaScript.DShell;


public class TooLargeFileException extends RelatedSyscallException {
	private static final long serialVersionUID = 1L;

	public TooLargeFileException(String message, String commandName, String[] syscalls) {
		super(message, commandName, syscalls);
	}
}