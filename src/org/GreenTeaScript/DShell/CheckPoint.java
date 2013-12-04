package org.GreenTeaScript.DShell;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;

public class CheckPoint {
	private static final int file_type = 0;
	private static final int directory_type = 1;
	private String filePath;
	private String oldFilePath;
	private final int operationType;
	private boolean called = false;

	public CheckPoint(String filePath) {
		this.filePath = new File(filePath).getAbsolutePath();
		if(new File(this.filePath).isFile()) {
			this.operationType = file_type;
			this.createOldFile();
		}
		else if(new File(this.filePath).isDirectory()) {
			this.operationType = directory_type;
		}
		else {
			throw new IllegalArgumentException();
		}
	}

	private void createOldFile() {
		Path srcPath = Paths.get(this.filePath);
		this.oldFilePath = this.filePath + ".old";
		Path destPath = Paths.get(this.oldFilePath);
		try {
			Files.copy(srcPath, destPath, StandardCopyOption.REPLACE_EXISTING, StandardCopyOption.COPY_ATTRIBUTES);
		}
		catch (IOException e) {
			throw new RuntimeException(e);
		}
	}

	private void revertFile() {
		Path srcPath = Paths.get(this.oldFilePath);
		Path destPath = Paths.get(this.filePath);
		try {
			Files.move(srcPath, destPath, StandardCopyOption.REPLACE_EXISTING, StandardCopyOption.ATOMIC_MOVE);
		}
		catch (IOException e) {
			throw new RuntimeException(e);
		}
	}

	public void rollback() {
		if(!this.called) {
			this.called = true;
			if(this.operationType == file_type) {
				this.revertFile();
			}
			else if(this.operationType == directory_type) {
				
			}
		}
	}

	private void clearFile() {
		new File(oldFilePath).delete();
	}

	public void clear() {
		if(!this.called) {
			this.called = true;
			if(this.operationType == file_type) {
				this.clearFile();
			}
			else if(this.operationType == directory_type) {
				
			}
		}
	}
}
