package org.GreenTeaScript.DShell;


public class NotPermittedOperateException extends DShellException {
	private static final long serialVersionUID = 1L;

	public NotPermittedOperateException(String message) {
		super(message);
	}
}