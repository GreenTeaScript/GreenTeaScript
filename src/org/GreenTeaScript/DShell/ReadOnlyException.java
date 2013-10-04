package org.GreenTeaScript.DShell;


public class ReadOnlyException extends RelatedSyscallException {
	private static final long serialVersionUID = 1L;

	public ReadOnlyException(String message, String commandName, String[] syscalls) {
		super(message, commandName, syscalls);
	}
}