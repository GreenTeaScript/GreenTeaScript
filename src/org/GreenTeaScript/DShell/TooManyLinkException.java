package org.GreenTeaScript.DShell;


public class TooManyLinkException extends RelatedSyscallException {
	private static final long serialVersionUID = 1L;

	public TooManyLinkException(String message, String commandName, String[] syscalls) {
		super(message, commandName, syscalls);
	}
}