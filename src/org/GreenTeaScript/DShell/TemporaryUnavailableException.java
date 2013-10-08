package org.GreenTeaScript.DShell;


public class TemporaryUnavailableException extends RelatedSyscallException {
	private static final long serialVersionUID = 1L;

	public TemporaryUnavailableException(String message, String commandName, String[] syscalls) {
		super(message, commandName, syscalls);
	}
}