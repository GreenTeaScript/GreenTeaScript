package org.GreenTeaScript.DShell;


public class DeviceNotFoundException extends RelatedSyscallException {
	private static final long serialVersionUID = 1L;

	public DeviceNotFoundException(String message, String commandName, String[] syscalls) {
		super(message, commandName, syscalls);
	}
}