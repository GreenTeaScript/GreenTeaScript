package org.GreenTeaScript.DShell;


public class FileNotFoundException extends RelatedSyscallException {
	private static final long serialVersionUID = 1L;

	public FileNotFoundException(String message, String commandName, String[] syscalls) {
		super(message, commandName, syscalls);
	}
}