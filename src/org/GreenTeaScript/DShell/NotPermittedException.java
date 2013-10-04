package org.GreenTeaScript.DShell;


// shell Exception definition
public class NotPermittedException extends RelatedSyscallException {
	private static final long serialVersionUID = 1L;

	public NotPermittedException(String message, String commandName, String[] syscalls) {
		super(message, commandName, syscalls);
	}
}