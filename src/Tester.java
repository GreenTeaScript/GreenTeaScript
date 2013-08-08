import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import java.util.ArrayList;


public class Tester {
	public String LoadFile(String Path) {
		return "";
	}
	public String ExecuteScript(String Path) {
		String[] defArg = {"java", "-jar", "GreenTea.jar"};
		SubProc subProc = new SubProc();
		subProc.setArgument(defArg);
		subProc.setArgument(Path);
		subProc.start();
		subProc.waitResult();
		String Result = subProc.getStdout();
		return Result;
	}
}

class SubProc {
	private Process proc;
	private InputStream stdout = null;
	private ArrayList<String> commandList;
	private ByteArrayOutputStream outBuf;

	public SubProc() {
		this.commandList = new ArrayList<String>();
	}

	public void setArgument(String Arg) {
		this.commandList.add(Arg);
	}

	public void setArgument(String[] Args) {
		for(int i = 0; i < Args.length; i++) {
			this.setArgument(Args[i]);
		}
	}

	public void start() {
		int size = this.commandList.size();
		String[] cmd = new String[size];
		for(int i = 0; i < size; i++) {
			cmd[i] = this.commandList.get(i);
		}

		try {
			this.proc = new ProcessBuilder(cmd).start();
			this.stdout = this.proc.getInputStream();
		}
		catch (IOException e) {
			throw new RuntimeException(e);
		}
	}
	
	private void handleOutputStream(OutputStream out) {
		PipeStreamHandler stdoutHandler = new PipeStreamHandler(stdout, out, false);
		stdoutHandler.start();
		try {
			stdoutHandler.join();
		}
		catch (InterruptedException e) {
			throw new RuntimeException(e);
		}
	}

	public void waitResult() {
		outBuf = new ByteArrayOutputStream();
		handleOutputStream(outBuf);
	}

	public String getStdout() {
		return this.outBuf.toString();
	}
}

// copied from http://blog.art-of-coding.eu/piping-between-processes/
class PipeStreamHandler extends Thread {
	private InputStream input;
	private OutputStream output;
	private boolean closeStream;

	public PipeStreamHandler(InputStream input, OutputStream output, boolean closeStream) {
		this.input = input;
		this.output = output;
		this.closeStream = closeStream;
	}

	@Override
	public void run() {
		try {
			byte[] buffer = new byte[512];
			int read = 0;
			while(read > -1) {
				read = this.input.read(buffer, 0, buffer.length);
				if(read > -1) {
					this.output.write(buffer, 0, read);
				}
			}
			if(closeStream) {
				this.input.close();
				this.output.close();
			}
		}
		catch (IOException e) {
			throw new RuntimeException(e);
		}
	}
}