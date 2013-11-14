package org.GreenTeaScript.DShell;

public class Task {
	private ProcMonitor monitor;
	private DShellProcess dshellProc;
	private boolean terminated = false;

	public Task(ProcMonitor monitor, DShellProcess dshellProc) {
		this.monitor = monitor;
		this.dshellProc = dshellProc;
	}

	public void join() {
		try {
			monitor.join();
			this.terminated = true;
			if(dshellProc.getTimeout() <= 0) {
				ShellExceptionRaiser raiser = new ShellExceptionRaiser(true);
				raiser.setProcesses(this.dshellProc.getProcesses());
				raiser.raiseException();
			}
		} 
		catch (InterruptedException e) {
			throw new RuntimeException(e);
		}
	}

	public String getResult() {
		if(!this.terminated) {
			throw new IllegalThreadStateException("Task is not Terminated");
		}
		PseudoProcess[] procs = this.dshellProc.getProcesses();
		int lastIndex = procs.length;
		return procs[lastIndex - 1].getStdout();
	}
}
