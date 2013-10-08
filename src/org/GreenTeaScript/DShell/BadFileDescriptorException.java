package org.GreenTeaScript.DShell;


public class BadFileDescriptorException extends RelatedSyscallException {
	private static final long serialVersionUID = 1L;

	public BadFileDescriptorException(String message, String commandName, String[] syscalls) {
		super(message, commandName, syscalls);
	}
}