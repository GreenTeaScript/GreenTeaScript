package org.GreenTeaScript.DShell;


public class InterruptedBySignalException extends RelatedSyscallException {
	private static final long serialVersionUID = 1L;

	public InterruptedBySignalException(String message, String commandName, String[] syscalls) {
		super(message, commandName, syscalls);
	}
}