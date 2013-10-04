package org.GreenTeaScript.DShell;


public class NoBufferSpaceException extends RelatedSyscallException {
	private static final long serialVersionUID = 1L;

	public NoBufferSpaceException(String message, String commandName, String[] syscalls) {
		super(message, commandName, syscalls);
	}
}