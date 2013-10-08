package org.GreenTeaScript.DShell;


public class BusyResourceException extends RelatedSyscallException {
	private static final long serialVersionUID = 1L;

	public BusyResourceException(String message, String commandName, String[] syscalls) {
		super(message, commandName, syscalls);
	}
}