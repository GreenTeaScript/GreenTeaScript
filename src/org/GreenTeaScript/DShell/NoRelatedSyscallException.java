package org.GreenTeaScript.DShell;


public class NoRelatedSyscallException extends DShellException {
	private static final long serialVersionUID = 1L;

	public NoRelatedSyscallException(String message) {
		super(message);
	}
	// this exception is raised by GtSubProc.runCommand 
	// when syscall error is not related to command failed
}