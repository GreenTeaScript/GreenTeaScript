package org.GreenTeaScript.DShell;


public class IllegalSeekException extends RelatedSyscallException {
	private static final long serialVersionUID = 1L;

	public IllegalSeekException(String message, String commandName, String[] syscalls) {
		super(message, commandName, syscalls);
	}
}