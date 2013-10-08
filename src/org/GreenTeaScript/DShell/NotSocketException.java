package org.GreenTeaScript.DShell;


public class NotSocketException extends RelatedSyscallException {
	private static final long serialVersionUID = 1L;

	public NotSocketException(String message, String commandName, String[] syscalls) {
		super(message, commandName, syscalls);
	}
}