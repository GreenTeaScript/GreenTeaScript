package org.GreenTeaScript.JVM;

public class NotPermittedOperateException extends Exception {
	private static final long serialVersionUID = 1L;

	public NotPermittedOperateException(String message) {
		super(message);
	}
}