import java.lang.reflect.Method;
import java.util.HashMap;
//JAVA
public class GreenTeaRuntime {

	public static void print(Object o) {
		System.out.print(o);
	}

	public static void println(Object o) {
		System.out.println(o);
	}

	public static void assert_(boolean b) {
		assert b;
	}

	//-----------------------------------------------------

	public static int unary_plus(int n) {
		return +n;
	}

	public static int unary_minus(int n) {
		return -n;
	}

	public static int unary_not(int n) {
		return ~n;
	}

	public static boolean unary_not(boolean b) {
		return !b;
	}

	//-----------------------------------------------------

	public static boolean binary_eq(boolean x, boolean y) {
		return x == y;
	}

	public static boolean binary_ne(boolean x, boolean y) {
		return x != y;
	}

	//-----------------------------------------------------

	public static int binary_add(int x, int y) {
		return x + y;
	}

	public static int binary_sub(int x, int y) {
		return x - y;
	}

	public static int binary_mul(int x, int y) {
		return x * y;
	}

	public static int binary_div(int x, int y) {
		return x / y;
	}

	public static int binary_mod(int x, int y) {
		return x % y;
	}

	public static int binary_shl(int x, int y) {
		return x << y;
	}

	public static int binary_shr(int x, int y) {
		return x >> y;
	}

	public static boolean binary_lt(int x, int y) {
		return x < y;
	}

	public static boolean binary_le(int x, int y) {
		return x <= y;
	}

	public static boolean binary_gt(int x, int y) {
		return x > y;
	}

	public static boolean binary_ge(int x, int y) {
		return x >= y;
	}

	public static boolean binary_eq(int x, int y) {
		return x == y;
	}

	public static boolean binary_ne(int x, int y) {
		return x != y;
	}

	//-----------------------------------------------------

	public static boolean binary_eq(String x, String y) {
		return x.equals(y);
	}

	public static boolean binary_ne(String x, String y) {
		return !x.equals(y);
	}

	//-----------------------------------------------------

	public static String binary_add(String x, String y) {
		return x + y;
	}

	public static String binary_add(String x, int y) {
		return x + y;
	}

	public static String binary_add(String x, boolean y) {
		return x + y;
	}

	public static String binary_add(int x, String y) {
		return x + y;
	}

	public static String binary_add(boolean x, String y) {
		return x + y;
	}

	//-----------------------------------------------------

	public static Object getter(Object o, String name) throws Exception {
		return o.getClass().getField(name).get(o);
	}

	public static void setter(Object o, String name, Object n) throws Exception {
		o.getClass().getField(name).set(o, n);
	}

	public static void error_node(String msg) throws Exception {
		System.err.println(msg);
		throw new RuntimeException("error node found");
	}

	//-----------------------------------------------------

	public static HashMap<String, Method> getAllStaticMethods() {
		HashMap<String, Method> map = new HashMap<String, Method>();
		try {
			Class<?> self = GreenTeaRuntime.class;
			// unary operator
			map.put("+_I", self.getMethod("unary_plus", int.class));
			map.put("-_I", self.getMethod("unary_minus", int.class));
			map.put("~_I", self.getMethod("unary_not", int.class));
			map.put("!_Z", self.getMethod("unary_not", boolean.class));
			// binary operator
			map.put("==_ZZ", self.getMethod("binary_eq", boolean.class, boolean.class));
			map.put("!=_ZZ", self.getMethod("binary_ne", boolean.class, boolean.class));
			map.put("+_II", self.getMethod("binary_add", int.class, int.class));
			map.put("-_II", self.getMethod("binary_sub", int.class, int.class));
			map.put("*_II", self.getMethod("binary_mul", int.class, int.class));
			map.put("/_II", self.getMethod("binary_div", int.class, int.class));
			map.put("%_II", self.getMethod("binary_mod", int.class, int.class));
			map.put("<<_II", self.getMethod("binary_shl", int.class, int.class));
			map.put(">>_II", self.getMethod("binary_shr", int.class, int.class));
			map.put("<_II", self.getMethod("binary_lt", int.class, int.class));
			map.put("<=_II", self.getMethod("binary_le", int.class, int.class));
			map.put(">_II", self.getMethod("binary_gt", int.class, int.class));
			map.put(">=_II", self.getMethod("binary_ge", int.class, int.class));
			map.put("==_II", self.getMethod("binary_eq", int.class, int.class));
			map.put("!=_II", self.getMethod("binary_ne", int.class, int.class));
			map.put("+_LL", self.getMethod("binary_add", String.class, String.class));
			map.put("+_LI", self.getMethod("binary_add", String.class, int.class));
			map.put("+_IL", self.getMethod("binary_add", int.class, String.class));
			map.put("+_LZ", self.getMethod("binary_add", String.class, boolean.class));
			map.put("+_ZL", self.getMethod("binary_add", boolean.class, String.class));
			map.put("==_LL", self.getMethod("binary_eq", String.class, String.class));
			map.put("!=_LL", self.getMethod("binary_ne", String.class, String.class));
			// system
			map.put("$getter", self.getMethod("getter", Object.class, String.class));
			map.put("$setter", self.getMethod("setter", Object.class, String.class, Object.class));
			map.put("$error_node", self.getMethod("error_node", String.class));
			// functions
			map.put("assert",  self.getMethod("assert_", boolean.class));
			map.put("print" ,  self.getMethod("print", Object.class));
			map.put("println", self.getMethod("println", Object.class));
		} catch(Exception e) {
			e.printStackTrace();
		}
		return map;
	}
}
//VAJA
