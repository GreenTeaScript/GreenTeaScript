package org.GreenTeaScript.DShell;


public class ConnectionRefusedException extends RelatedSyscallException {
	private static final long serialVersionUID = 1L;

	public ConnectionRefusedException(String message, String commandName, String[] syscalls) {
		super(message, commandName, syscalls);
	}
}