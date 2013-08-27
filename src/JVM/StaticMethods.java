package JVM;

import java.lang.reflect.Method;
import java.util.HashMap;

public class StaticMethods {
	public static void println(String o) {
		System.out.println(o);
	}

	public static void assert_(boolean b) {
		assert b;
	}

	public static boolean eqObject(Object o1, Object o2) {
		if(o1 == o2) {
			return true;
		}
		else {
			if(o1 != null) {
				return o1.equals(o2);
			}
			else {
				return o2.equals(o1);
			}
		}
	}

	public static boolean neObject(Object o1, Object o2) {
		return !eqObject(o1, o2);
	}

	//-----------------------------------------------------

	public static HashMap<String, Method> getAllStaticMethods() {
		HashMap<String, Method> map = new HashMap<String, Method>();
		try {
			Class<?> self = StaticMethods.class;
			map.put("assert",  self.getMethod("assert_", boolean.class));
			map.put("println", self.getMethod("println", String.class));
		} catch(Exception e) {
			e.printStackTrace();
		}
		return map;
	}
}