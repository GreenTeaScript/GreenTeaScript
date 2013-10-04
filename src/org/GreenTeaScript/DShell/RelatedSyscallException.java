package org.GreenTeaScript.DShell;


public class RelatedSyscallException extends DShellException {
	private static final long serialVersionUID = 1L;
	
	private String commandName;
	private String syscallName;
	private String[] params;
	private String errno;
	
	public RelatedSyscallException(String message, String commandName, String[] syscalls) {
		super(message);
		this.commandName = commandName;
		this.syscallName = syscalls[0];
		this.errno = syscalls[2];
	}
	
	public String getCommandName() {
		return this.commandName;
	}
	
	public String getSyscallName() {
		return this.syscallName;
	}
	
	public String[] getParams() {
		return this.params;
	}
	
	public String getErrno() {
		return this.errno;
	}
}