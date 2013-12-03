package org.GreenTeaScript.DShell;

import org.GreenTeaScript.GreenTeaArray;
import org.GreenTeaScript.GtStaticTable;
import org.GreenTeaScript.Konoha.ArrayApi;

public class MultipleException extends DShellException {
	private static final long serialVersionUID = 1L;
	private GreenTeaArray exceptionArray;

	public MultipleException(String message, Exception[] exceptions) {
		super(message);
		this.exceptionArray = GreenTeaArray.NewArray1(GtStaticTable.AnyType, 0);
		for(int i = 0; i < exceptions.length; i++) {
			ArrayApi.Add(this.exceptionArray, exceptions[i]);
		}
	}

	public GreenTeaArray getExceptions() {
		return this.exceptionArray;
	}
}
