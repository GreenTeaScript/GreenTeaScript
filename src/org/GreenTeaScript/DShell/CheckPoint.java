// ***************************************************************************
// Copyright (c) 2013, JST/CREST DEOS project authors. All rights reserved.
// Redistribution and use in source and binary forms, with or without
// modification, are permitted provided that the following conditions are met:
//
// *  Redistributions of source code must retain the above copyright notice,
//    this list of conditions and the following disclaimer.
// *  Redistributions in binary form must reproduce the above copyright
//    notice, this list of conditions and the following disclaimer in the
//    documentation and/or other materials provided with the distribution.
//
// THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS
// "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED
// TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR
// PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER OR
// CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL,
// EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO,
// PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS;
// OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY,
// WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR
// OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF
// ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
// **************************************************************************

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
