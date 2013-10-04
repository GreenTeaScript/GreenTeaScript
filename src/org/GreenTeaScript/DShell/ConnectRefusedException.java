package org.GreenTeaScript.DShell;


public class ConnectRefusedException extends RelatedSyscallException {
	private static final long serialVersionUID = 1L;

	public ConnectRefusedException(String message, String commandName, String[] syscalls) {
		super(message, commandName, syscalls);
	}
}