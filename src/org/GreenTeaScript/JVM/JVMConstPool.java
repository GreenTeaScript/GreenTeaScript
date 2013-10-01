package org.GreenTeaScript.JVM;
import java.util.ArrayList;

public class JVMConstPool {
	private static final ArrayList<Object> constValues = new ArrayList<Object>();

	public static int add(Object o) {
		int id = constValues.indexOf(o);
		if(id != -1) {
			return id;
		}
		else {
			constValues.add(o);
			return constValues.size() - 1;
		}
	}

	public static Object getById(int id) {
		return constValues.get(id);
	}
}