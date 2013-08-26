package JVM;

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
}