import java.lang.reflect.InvocationTargetException;
import java.lang.reflect.Method;

public abstract class LangBase {

	public static void println(String msg) {
		System.out.println(msg);		
	}

	public static String GetLineNumber(int depth){
		String LineNumber = "(";
		try{
			throw new Exception();
		}
		catch(Exception e){
			StackTraceElement[] tr = e.getStackTrace();
			if(depth < tr.length){
				StackTraceElement elem = tr[depth];
				LineNumber += elem.getClassName() + ":" + elem.getFileName() + ":" + elem.getLineNumber();
			}
		}
		return LineNumber + ")";
	}
	
	public final static boolean IsWhitespace(char ch) {
		return Character.isWhitespace(ch);
	}
	
	public final static boolean IsLetter(char ch) {
		return Character.isLetter(ch);
	}
	
	public final static boolean IsDigit(char ch) {
		return Character.isDigit(ch);
	}

	public final static int ApplyTokenFunc(Object Self, Method Method, Object TokenContext, String Text, int pos) {
		try {
			Integer n = (Integer)Method.invoke(Self, TokenContext, Text, pos);
			return n.intValue();
		}
		catch (InvocationTargetException e) {
			e.printStackTrace();
		}
		catch (IllegalArgumentException e) {
			e.printStackTrace();
		} 
		catch (IllegalAccessException e) {
			e.printStackTrace();
		}
		return -1;
	}

	public final static Object ApplyMatchFunc(Object Self, Method Method, Object Pattern, Object LeftTree, Object TokenContext) {
		try {
			Method.invoke(Self, Pattern, LeftTree, TokenContext);
		}
		catch (InvocationTargetException e) {
			e.printStackTrace();
		}
		catch (IllegalArgumentException e) {
			e.printStackTrace();
		} 
		catch (IllegalAccessException e) {
			e.printStackTrace();
		}
		return null;
	}

	public final static Object ApplyTypeFunc(Object Self, Method Method, Object Gamma, Object ParsedTree, Object TypeInfo) {
		try {
			return Method.invoke(Self, Gamma, ParsedTree, TypeInfo);
		}
		catch (InvocationTargetException e) {
			e.printStackTrace();
		}
		catch (IllegalArgumentException e) {
			e.printStackTrace();
		} 
		catch (IllegalAccessException e) {
			e.printStackTrace();
		}
		return null;
	}

}

