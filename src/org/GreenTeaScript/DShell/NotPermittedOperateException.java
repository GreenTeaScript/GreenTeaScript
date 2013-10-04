package org.GreenTeaScript.DShell;


public class NotPermittedOperateException extends RelatedSyscallException {
	private static final long serialVersionUID = 1L;

	public NotPermittedOperateException(String message, String commandName, String[] syscalls) {
		super(message, commandName, syscalls);
	}
}