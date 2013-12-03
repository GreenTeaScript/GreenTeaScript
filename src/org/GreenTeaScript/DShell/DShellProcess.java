package org.GreenTeaScript.DShell;

import java.io.BufferedInputStream;
import java.io.BufferedOutputStream;
import java.io.ByteArrayOutputStream;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import java.lang.reflect.Field;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.Map;

import org.GreenTeaScript.DShellGrammar;
import org.GreenTeaScript.LibGreenTea;

public class DShellProcess {
	// option flag
	public static final int returnable  = 1 << 0;
	public static final int printable   = 1 << 1;
	public static final int throwable   = 1 << 2;
	public static final int background  = 1 << 3;
	public static final int inference   = 1 << 4;

	// return type
	private static final int VoidType    = 0;
	private static final int BooleanType = 1;
	private static final int StringType  = 2;
	private static final int TaskType    = 3;

	private int OptionFlag;
	private int retType;
	private PseudoProcess[] Processes;
	private long timeout = -1;
	private StringBuilder sBuilder;

	public MessageStreamHandler stdoutHandler;
	public MessageStreamHandler stderrHandler;

	public DShellProcess(String[][] cmds, int option, int retType) {
		this.OptionFlag = option;
		this.retType = retType;
		String[][] newCmds = this.PrepareInternalOption(cmds);
		this.Processes = this.CreateProcs(newCmds);
		// generate object representation
		this.sBuilder = new StringBuilder();
		for(int i = 0; i< this.Processes.length; i++) {
			if(i != 0) {
				this.sBuilder.append(",\n");
			}
			this.sBuilder.append("{");
			this.sBuilder.append(this.Processes[i].toString());
			this.sBuilder.append("}");
		}
		this.sBuilder.append("\n<");
		switch(this.retType) {
		case VoidType: this.sBuilder.append("VoidType"); break;
		case BooleanType: this.sBuilder.append("BooleanType"); break;
		case StringType: this.sBuilder.append("StringType"); break;
		case TaskType: this.sBuilder.append("TaskType"); break;
		}
		if(is(this.OptionFlag, returnable)) {
			this.sBuilder.append("|returnable");
		}
		if(is(this.OptionFlag, printable)) {
			this.sBuilder.append("|printable");
		}
		if(is(this.OptionFlag, throwable)) {
			this.sBuilder.append("|throwable");
		}
		if(is(this.OptionFlag, background)) {
			this.sBuilder.append("|background");
		}
		if(is(this.OptionFlag, inference)) {
			this.sBuilder.append("|inference");
		}
		this.sBuilder.append(">");
	}

	public Object Invoke() {
		Task task = new Task(this);
		if(is(this.OptionFlag, background)) {
			return (this.retType == TaskType) && is(this.OptionFlag, returnable) ? task : null;
		}
		task.join();
		if(is(this.OptionFlag, returnable)) {
			if(this.retType == StringType) {
				return task.getOutMessage();
			}
			else if(this.retType == BooleanType) {
				return new Boolean(task.getExitStatus() == 0);
			}
			else if(this.retType == TaskType) {
				return task;
			}
		}
		return null;
	}

	public PseudoProcess[] getProcesses() {
		return this.Processes;
	}

	public int getOptionFlag() {
		return this.OptionFlag;
	}

	public long getTimeout() {
		return this.timeout;
	}

	@Override public String toString() {
		return this.sBuilder.toString();
	}

	private String[][] PrepareInternalOption(String[][] cmds) {
		boolean enableTrace = false;
		ArrayList<String[]> newCmdsBuffer = new ArrayList<String[]>();
		for(int i = 0; i < cmds.length; i++) {
			String[] currentCmd = cmds[i];
			if(LibGreenTea.EqualsString(currentCmd[0], "timeout")) {
				StringBuilder numBuilder = new StringBuilder();
				StringBuilder unitBuilder = new StringBuilder();
				int len = currentCmd[1].length();
				for(int j = 0; j < len; j++) {
					char ch = currentCmd[1].charAt(j);
					if(Character.isDigit(ch)) {
						numBuilder.append(ch);
					}
					else {
						unitBuilder.append(ch);
					}
				}
				long num = Integer.parseInt(numBuilder.toString());
				String unit = unitBuilder.toString();
				if(LibGreenTea.EqualsString(unit, "s")) {
					num = num * 1000;
				}
				if(num >= 0) {
					this.timeout = num;
				}
				int baseIndex = 2;
				String[] newCmd = new String[currentCmd.length - baseIndex];
				for(int j = baseIndex; j < currentCmd.length; j++) {
					newCmd[j - baseIndex] = currentCmd[j];
				}
				currentCmd = newCmd;
			}
			else if(LibGreenTea.EqualsString(currentCmd[0], "infer")) {
				enableTrace = checkTraceRequirements();
				int baseIndex = 1;
				String[] newCmd = new String[currentCmd.length - baseIndex];
				for(int j = baseIndex; j < currentCmd.length; j++) {
					newCmd[j - baseIndex] = currentCmd[j];
				}
				currentCmd = newCmd;
			}
			else if(LibGreenTea.EqualsString(currentCmd[0], "&")) {
				this.OptionFlag = setFlag(this.OptionFlag, background, true);
				continue;
			}
			newCmdsBuffer.add(currentCmd);
		}
		if(is(this.OptionFlag, inference)) {
			this.OptionFlag = setFlag(this.OptionFlag, inference, enableTrace);
		}
		return newCmdsBuffer.toArray(new String[newCmdsBuffer.size()][]);
	}

	private PseudoProcess[] CreateProcs(String[][] cmds) {
		boolean enableSyscallTrace = is(this.OptionFlag, inference);
		ArrayList<PseudoProcess> procBuffer = new ArrayList<PseudoProcess>();
		for(int i = 0; i < cmds.length; i++) {
			String[] currentCmd = cmds[i];
			String cmdSymbol = currentCmd[0];
			SubProc prevProc = null;
			int size = procBuffer.size();
			if(size > 0) {
				prevProc = (SubProc)procBuffer.get(size - 1);
			}
			if(LibGreenTea.EqualsString(cmdSymbol, "<")) {
				prevProc.setInputRedirect(currentCmd[1]);
			}
			else if(LibGreenTea.EqualsString(cmdSymbol, "1>") || LibGreenTea.EqualsString(cmdSymbol, ">")) {
				prevProc.setOutputRedirect(SubProc.STDOUT_FILENO, currentCmd[1], false);
			}	
			else if(LibGreenTea.EqualsString(cmdSymbol, "1>>") || LibGreenTea.EqualsString(cmdSymbol, ">>")) {
				prevProc.setOutputRedirect(SubProc.STDOUT_FILENO, currentCmd[1], true);
			}
			else if(LibGreenTea.EqualsString(cmdSymbol, "2>")) {
				prevProc.setOutputRedirect(SubProc.STDERR_FILENO, currentCmd[1], false);
			}
			else if(LibGreenTea.EqualsString(cmdSymbol, "2>>")) {
				prevProc.setOutputRedirect(SubProc.STDERR_FILENO, currentCmd[1], true);
			}
			else if(LibGreenTea.EqualsString(cmdSymbol, "&>") || LibGreenTea.EqualsString(cmdSymbol, ">&")) {
				prevProc.setOutputRedirect(SubProc.STDOUT_FILENO, currentCmd[1], false);
				prevProc.setMergeType(SubProc.mergeErrorToOut);
			}
			else if(LibGreenTea.EqualsString(cmdSymbol, "&>>")) {
				prevProc.setOutputRedirect(SubProc.STDOUT_FILENO, currentCmd[1], true);
				prevProc.setMergeType(SubProc.mergeErrorToOut);
			}
			else if(LibGreenTea.EqualsString(cmdSymbol, ">&1") || 
					LibGreenTea.EqualsString(cmdSymbol, "1>&1") || LibGreenTea.EqualsString(cmdSymbol, "2>&2")) {
				// do nothing
			}
			else if(LibGreenTea.EqualsString(cmdSymbol, "1>&2")) {
				prevProc.setMergeType(SubProc.mergeOutToError);
			}
			else if(LibGreenTea.EqualsString(cmdSymbol, "2>&1")) {
				prevProc.setMergeType(SubProc.mergeErrorToOut);
			}
			else {
				SubProc proc = new SubProc(enableSyscallTrace);
				proc.setArgument(currentCmd);
				procBuffer.add(proc);
			}
		}
		return procBuffer.toArray(new PseudoProcess[procBuffer.size()]);
	}

	// called by JavaByteCodeGenerator.VisitCommandNode 
	public static void ExecCommandVoid(String[]... cmds) {
		int option = printable | throwable | inference;
		new DShellProcess(cmds, option, VoidType).Invoke();
	}
	public static String ExecCommandString(String[]... cmds) {
		int option = returnable | throwable | inference;
		return (String) new DShellProcess(cmds, option, StringType).Invoke();
	}
	public static boolean ExecCommandBool(String[]... cmds) {
		int option = returnable | printable;
		return ((Boolean) new DShellProcess(cmds, option, BooleanType).Invoke()).booleanValue();
	}
	public static Task ExecCommandTask(String[]... cmds) {
		int option = returnable | printable | throwable | inference;
		return (Task) new DShellProcess(cmds, option, TaskType).Invoke();
	}

	// file system roll back function
	// TargetLV: vg_name/lv_name
	public static boolean CreateSnapshot(String SnapshotLabel, String TargetLV) throws Exception {
		if(System.getProperty("os.name").equals("Linux") && new File("/sbin/lvm").canExecute()) {
			String[] cmds = {"sudo", "lvcreate", "-s", "-n", SnapshotLabel, TargetLV};
			return ExecCommandBool(cmds);
		}
		return false;
	}

	public static boolean RevertSnapshot(String SnapshotLabel, String TargetLV) throws Exception {
//		if(System.getProperty("os.name").equals("Linux") && new File("/sbin/lvm").canExecute()) {
//			String[] volNames = TargetLV.split("/");
//			String VG_Name = volNames[0];
//			String LV_Name = volNames[1];
//			String mountableId = VG_Name + "-" + LV_Name;
//			
//			// get target LV mount point
//			int option = returnable | throwable;
//			String[][] mountPoint_cmds = {{"mount"}, {"grep", mountableId}};
//			String mountPoint;
//			try {
//				String[] results = ((String) runCommands(mountPoint_cmds, option, StringType)).split(" ");
//				mountPoint = results[2];
//			} catch (Exception e) {
//				return false;
//			}
//			
//			// umount target LV
//			String[] umount_cmds = {"sudo", "umount", mountPoint};
//			if(!ExecCommandBool(umount_cmds)) {
//				return false;
//			}
//			
//			// remove current LV
//			String[] lvremove_cmds = {"sudo", "lvremove", TargetLV};
//			if(!ExecCommandBool(lvremove_cmds)) {
//				return false;
//			}
//			
//			// rename snapshot
//			String[] lvrename_cmds = {"sudo", "lvrename", VG_Name + "/" + SnapshotLabel, LV_Name};
//			if(!ExecCommandBool(lvrename_cmds)) {
//				return false;
//			}
//			
//			// mount LV
//			String[] mount_cmds = {"sudo", "mount", "/dev/" + TargetLV, mountPoint};
//			return ExecCommandBool(mount_cmds);
//		}
		return false;
	}
	
	// change directory
	public static boolean ChangeDirectory(String path) {
		if(LibGreenTea.EqualsString(path, "")) {
			return CLibraryWrapper.INSTANCE.chdir(System.getenv("HOME")) == 0;
		}
		return CLibraryWrapper.INSTANCE.chdir(path) == 0;
	}

	//---------------------------------------------

	private static boolean checkTraceRequirements() {
		if(System.getProperty("os.name").equals("Linux")) {
			String[] libPaths = {"/lib", "/usr/lib", "/usr/lib64", "/usr/local/lib", "/usr/local/lib64"};
			for(int i = 0; i < libPaths.length; i++) {
				String hookLibaryPath = libPaths[i] + "/" + SubProc.hookLibraryName;
				if(new File(hookLibaryPath).isFile()) {
					SubProc.hookLibraryPath = hookLibaryPath;
					SubProc.traceBackendType = SubProc.traceBackend_hookLibrary;
					return true;
				}
			}
			boolean flag = DShellGrammar.IsUnixCommand("strace+") && 
					DShellGrammar.IsUnixCommand("pretty_print_strace_out.py");
			if(flag) {
				SubProc.traceBackendType = SubProc.traceBackend_strace_plus;
				return true;
			}
			else {
				SubProc.traceBackendType = SubProc.traceBackend_strace;
				return DShellGrammar.IsUnixCommand("strace");
			}
		}
		System.err.println("Systemcall Trace is Not Supported");
		return false;
	}

	public static boolean is(int option, int flag) {
		option &= flag;
		return option == flag;
	}

	private static int setFlag(int option, int flag, boolean set) {
		if(set && !is(option, flag)) {
			return option | flag;
		}
		else if(!set && is(option, flag)) {
			return option & ~flag;
		}
		return option;
	}
}

interface CLibraryWrapper extends com.sun.jna.Library {
	CLibraryWrapper INSTANCE = (CLibraryWrapper) com.sun.jna.Native.loadLibrary("c", CLibraryWrapper.class);
	
	int chdir(String path);
	int seteuid(int uid);
	int getuid();
}

class PseudoProcess {
	public final static int mergeErrorToOut = 0;
	public final static int mergeOutToError = 1;

	protected OutputStream stdin = null;
	protected InputStream stdout = null;
	protected InputStream stderr = null;

	protected StringBuilder cmdNameBuilder;
	protected ArrayList<String> commandList;
	protected StringBuilder sBuilder;

	protected boolean stdoutIsDirty = false;
	protected boolean stderrIsDirty = false;

	protected int mergeType = -1;
	protected int retValue = 0;

	public PseudoProcess() {
		this.cmdNameBuilder = new StringBuilder();
		this.commandList = new ArrayList<String>();
		this.sBuilder = new StringBuilder();
	}

	public void setArgument(String Arg) {
		this.cmdNameBuilder.append(Arg + " ");
		this.commandList.add(Arg);
	}

	public void setArgument(String[] Args) {
		for(int i = 0; i < Args.length; i++) {
			this.setArgument(Args[i]);
		}
	}

	public void setMergeType(int mergeType) {
		this.mergeType = mergeType;
		if(this.mergeType == mergeErrorToOut) {
			this.sBuilder.append(" 2>&1");
		}
		else if(this.mergeType == mergeOutToError) {
			this.sBuilder.append(" 1>&2");
		}
	}

	public void start() {
	}

	public void pipe(PseudoProcess srcProc) {
		new PipeStreamHandler(srcProc.accessOutStream(), this.stdin, true).start();
	}

	public void kill() {
	}

	public void waitTermination() {
	}

	public InputStream accessOutStream() {
		if(!this.stdoutIsDirty) {
			this.stdoutIsDirty = true;
			return this.stdout;
		}
		return null;
	}

	public InputStream accessErrorStream() {
		if(!this.stderrIsDirty) {
			this.stderrIsDirty = true;
			return this.stderr;
		}
		return null;
	}

	public int getRet() {
		return this.retValue;
	}

	public String getCmdName() {
		return this.cmdNameBuilder.toString();
	}

	public boolean isTraced() {
		return false;
	}

	@Override public String toString() {
		return this.sBuilder.toString();
	}
}

class SubProc extends PseudoProcess {
	public final static int traceBackend_strace      = 0;
	public final static int traceBackend_strace_plus = 1;
	public final static int traceBackend_hookLibrary = 2;
	public static int traceBackendType = traceBackend_strace;

	private final static String logdirPath = "/tmp/dshell-trace-log";
	private static int logId = 0;
	private final static String env_preload = "LD_PRELOAD";
	private final static String env_ereport = "DSHELL_EREPORT";
	public final static String hookLibraryName = "libdshellHook.so";
	public static String hookLibraryPath;
	
	public final static int STDOUT_FILENO = 1;
	public final static int STDERR_FILENO = 2;

	private Process proc;
	private boolean enableSyscallTrace = false;
	public boolean isKilled = false;
	public String logFilePath = null;

	private FileInputStream inFileStream = null;
	private FileOutputStream outFileStream = null;
	private FileOutputStream errFileStream = null;

	private static String createLogNameHeader() {
		Calendar cal = Calendar.getInstance();
		StringBuilder logNameHeader = new StringBuilder();

		logNameHeader.append(cal.get(Calendar.YEAR) + "-");
		logNameHeader.append((cal.get(Calendar.MONTH) + 1) + "-");
		logNameHeader.append(cal.get(Calendar.DATE) + "-");
		logNameHeader.append(cal.get((Calendar.HOUR) + 1) + ":");
		logNameHeader.append(cal.get(Calendar.MINUTE) + "-");
		logNameHeader.append(cal.get(Calendar.MILLISECOND));
		logNameHeader.append("-" + logId++);
		return logNameHeader.toString();
	}

	public static void deleteLogFile(String logFilePath) {
		new File(logFilePath).delete();
	}

	public SubProc(boolean enableSyscallTrace) {
		super();
		this.enableSyscallTrace = enableSyscallTrace;
		initTrace();
	}

	private void initTrace() {
		if(this.enableSyscallTrace) {
			logFilePath = new String(logdirPath + "/" + createLogNameHeader() + ".log");
			new File(logdirPath).mkdir();

			String[] traceCmd;
			if(traceBackendType == traceBackend_strace) {
				String[] backend_strace = {"strace", "-t", "-f", "-F", "-o", logFilePath};
				traceCmd = backend_strace;
			}
			else if(traceBackendType == traceBackend_strace_plus) {
				String[] backend_strace_plus = {"strace+", "-k", "-t", "-f", "-F", "-o", logFilePath};
				traceCmd = backend_strace_plus;
			}
			else if(traceBackendType == traceBackend_hookLibrary) {
				return;
			}
			else {
				throw new RuntimeException("invalid trace backend type");
			}
			
			for(int i = 0; i < traceCmd.length; i++) {
				this.commandList.add(traceCmd[i]);
			}
		}
	}

	@Override public void setArgument(String[] Args) {
		String arg = Args[0];
		this.cmdNameBuilder.append(arg + " ");
		if(LibGreenTea.EqualsString(arg, "sudo")) {
			int size = this.commandList.size();
			ArrayList<String> newCommandList = new ArrayList<String>();
			newCommandList.add(arg);
			for(int i = 0; i < size; i++) {
				newCommandList.add(this.commandList.get(i));
			}
			this.commandList = newCommandList;
		}
		else {
			this.commandList.add(arg);
		}

		this.sBuilder.append("[");
		this.sBuilder.append(arg);
		for(int i = 1; i < Args.length; i++) {
			this.setArgument(Args[i]);
			this.sBuilder.append(", ");
			this.sBuilder.append(Args[i]);
		}
		this.sBuilder.append("]");
	}

	@Override public void start() {
		try {
			ProcessBuilder procBuilder = new ProcessBuilder(this.commandList.toArray(new String[this.commandList.size()]));
			if(this.mergeType == mergeErrorToOut || this.mergeType == mergeOutToError) {
				procBuilder.redirectErrorStream(true);
			}
			this.prepareHookLibrary(procBuilder.environment());
			this.proc = procBuilder.start();
			this.stdin = this.proc.getOutputStream();
			if(this.mergeType == mergeOutToError) {
				this.stdout = this.proc.getErrorStream();
				this.stderr = this.proc.getInputStream();
			}
			else {
				this.stdout = this.proc.getInputStream();
				this.stderr = this.proc.getErrorStream();
			}
			// input & output redirect
			this.readFile();
			this.writeFile(STDOUT_FILENO);
			this.writeFile(STDERR_FILENO);
		}
		catch (IOException e) {
			throw new RuntimeException(e);
		}
	}

	public void setInputRedirect(String readFileName) {
		this.sBuilder.append(" <");
		this.sBuilder.append(readFileName);
		try {
			this.inFileStream = new FileInputStream(readFileName);
		}
		catch (FileNotFoundException e) {
			throw new RuntimeException(e);
		}
	}

	private void readFile() {
		if(this.inFileStream == null) {
			return;
		}
		InputStream srcStream = new BufferedInputStream(inFileStream);
		OutputStream destStream = this.stdin;
		new PipeStreamHandler(srcStream, destStream, true).start();
	}

	public void setOutputRedirect(int fd, String writeFileName, boolean append) {
		try {
			if(fd == STDOUT_FILENO) {
				this.outFileStream = new FileOutputStream(writeFileName, append);
			} 
			else if(fd == STDERR_FILENO) {
				this.errFileStream = new FileOutputStream(writeFileName, append);
			}
			this.sBuilder.append(" " + fd);
			this.sBuilder.append(">");
			if(append) {
				this.sBuilder.append(">");
			}
			this.sBuilder.append(writeFileName);
		}
		catch (FileNotFoundException e) {
			throw new RuntimeException(e);
		}
	}

	private void writeFile(int fd) {
		InputStream srcStream;
		OutputStream destStream;
		if(fd == STDOUT_FILENO) {
			if(this.outFileStream == null) {
				return;
			}
			srcStream = this.accessOutStream();
			destStream = new BufferedOutputStream(this.outFileStream);
		}
		else if(fd == STDERR_FILENO) {
			if(this.errFileStream == null) {
				return;
			}
			srcStream = this.accessErrorStream();
			destStream = new BufferedOutputStream(this.errFileStream);
		}
		else {
			throw new RuntimeException("invalid file descriptor");
		}
		new PipeStreamHandler(srcStream, destStream, true).start();
	}

	private void prepareHookLibrary(Map<String, String> env) {
		if(this.enableSyscallTrace && traceBackendType == traceBackend_hookLibrary) {
			env.put(env_preload, hookLibraryPath);
			env.put(env_ereport, this.logFilePath);
		}
	}

	@Override public void waitTermination() {
		try {
			this.retValue = this.proc.waitFor();
		}
		catch (InterruptedException e) {
			throw new RuntimeException(e);
		}
	}

	@Override public void kill() {
		if(System.getProperty("os.name").startsWith("Windows")) {
			this.proc.destroy();
			return;
		} 
		try {
			// get target pid
			Field pidField = this.proc.getClass().getDeclaredField("pid");
			pidField.setAccessible(true);
			int pid = pidField.getInt(this.proc);
			
			// kill process
			String[] cmds = {"kill", "-9", Integer.toString(pid)};
			Process procKiller = new ProcessBuilder(cmds).start();
			procKiller.waitFor();
			this.isKilled = true;
			//LibGreenTea.print("[killed]: " + this.getCmdName());
		} 
		catch (NoSuchFieldException e) {
			throw new RuntimeException(e);
		} 
		catch (SecurityException e) {
			throw new RuntimeException(e);
		} 
		catch (IllegalArgumentException e) {
			throw new RuntimeException(e);
		} 
		catch (IllegalAccessException e) {
			throw new RuntimeException(e);
		} 
		catch (IOException e) {
			throw new RuntimeException(e);
		} 
		catch (InterruptedException e) {
			throw new RuntimeException(e);
		}
	}

	public void checkTermination() {
		this.retValue = this.proc.exitValue();
	}

	public String getLogFilePath() {
		return this.logFilePath;
	}

	@Override public boolean isTraced() {
		return this.enableSyscallTrace;
	}
}

class MessageStreamHandler {
	private InputStream[] srcStreams;
	private OutputStream[] destStreams;
	private ByteArrayOutputStream messageBuffer;
	private PipeStreamHandler[] streamHandlers;

	public MessageStreamHandler(InputStream[] srcStreams, OutputStream destStream) {
		this.srcStreams = srcStreams;
		this.messageBuffer = new ByteArrayOutputStream();
		this.streamHandlers = new PipeStreamHandler[this.srcStreams.length];
		OutputStream[] tempStreams = {destStream, this.messageBuffer};
		this.destStreams = tempStreams;
	}

	public void showMessage() {
		boolean[] closeOutputs = {false, false};
		for(int i = 0; i < srcStreams.length; i++) {
			this.streamHandlers[i] = new PipeStreamHandler(this.srcStreams[i], this.destStreams, true, closeOutputs);
			this.streamHandlers[i].start();
		}
	}

	public String waitTermination() {
		for(int i = 0; i < srcStreams.length; i++) {
			try {
				this.streamHandlers[i].join();
			} 
			catch (InterruptedException e) {
				throw new RuntimeException(e);
			}
		}
		return this.messageBuffer.toString();
	}
}

// copied from http://blog.art-of-coding.eu/piping-between-processes/
class PipeStreamHandler extends Thread {
	private InputStream input;
	private OutputStream[] outputs;
	private boolean closeInput;
	private boolean[] closeOutputs;

	public PipeStreamHandler(InputStream input, OutputStream output, boolean closeStream) {
		this.input = input;
		this.outputs = new OutputStream[1];
		this.outputs[0] = output;
		if(output == null) {
			this.outputs[0] = new NullStream();
		}
		this.closeInput = closeStream;
		this.closeOutputs = new boolean[1];
		this.closeOutputs[0] = closeStream;
	}

	public PipeStreamHandler(InputStream input, 
			OutputStream[] outputs, boolean closeInput, boolean[] closeOutputs) {
		this.input = input;
		this.outputs = new OutputStream[outputs.length];
		this.closeInput = closeInput;
		this.closeOutputs = closeOutputs;
		for(int i = 0; i < this.outputs.length; i++) {
			this.outputs[i] = outputs[i] == null ? new NullStream() : outputs[i];
		}
	}

	@Override public void run() {
		if(this.input == null) {
			return;
		}
		try {
			byte[] buffer = new byte[512];
			int read = 0;
			while(read > -1) {
				read = this.input.read(buffer, 0, buffer.length);
				if(read > -1) {
					for(int i = 0; i < this.outputs.length; i++) {
						this.outputs[i].write(buffer, 0, read);
					}
				}
			}
			if(this.closeInput) {
				this.input.close();
			}
			for(int i = 0; i < this.outputs.length; i++) {
				if(this.closeOutputs[i]) {
					this.outputs[i].close();
				}
			}
		}
		catch (IOException e) {
			throw new RuntimeException(e);
		}
	}
	
	class NullStream extends OutputStream {
		@Override public void write(int b) throws IOException {
			// do nothing
		}
		@Override public void close() {
			//do nothing
		}
	}
}

