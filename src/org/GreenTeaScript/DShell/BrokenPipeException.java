package org.GreenTeaScript.DShell;


public class BrokenPipeException extends RelatedSyscallException {
	private static final long serialVersionUID = 1L;

	public BrokenPipeException(String message, String commandName, String[] syscalls) {
		super(message, commandName, syscalls);
	}
}