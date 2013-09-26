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

//ifdef JAVA

package org.GreenTeaScript;
import java.util.ArrayList;
import java.lang.reflect.Method;
import java.util.HashMap;

public class GreenTeaRuntime {
	// converter 

	// Boolean
	public final static String BooleanToString(GtType Type, boolean value) {
		return value ? "true" : "false";
	}

	public final static Object BooleanToAny(GtType Type, boolean value) {
		return new Boolean(value);
	}

	public final static boolean AnyToBoolean(GtType Type, Object value) {
		if(value instanceof Boolean) {
			return ((Boolean) value).booleanValue();
		}
		return (value == null) ? true : false;
	}

	// String
	public final static Object StringToAny(GtType Type, String value) {
		return (Object)value;
	}

	public final static Object AnyToString(GtType Type, Object value) {
		if(value != null) {
			return value.toString();
		}
		return value;
	}

	// int
	public final static String IntToString(GtType Type, long value) {
		return ""+value;
	}

	public final static long StringToInt(GtType Type, String value) {
		if(value != null) {
			try {
				return Long.parseLong(value);
			}
			catch(NumberFormatException e) {
			}
		}
		return 0;
	}

	public final static Object IntToAny(GtType Type, long value) {
		return new Long(value);
	}

	public final static long AnyToInt(GtType Type, Object value) {
		if(value instanceof Number) {
			return ((Number) value).longValue();
		}
		return 0;
	}

	// double
	public final static String DoubleToString(GtType Type, double value) {
		return ""+value;
	}

	public final static double StringToDouble(GtType Type, String value) {
		if(value != null) {
			try {
				return Double.parseDouble(value);
			}
			catch(NumberFormatException e) {
			}
		}
		return 0;
	}

	public final static Object DoubleToAny(GtType Type, double value) {
		return new Double(value);
	}

	public final static double AnyToDouble(GtType Type, Object value) {
		if(value instanceof Number) {
			return ((Number) value).doubleValue();
		}
		return 0;
	}
	// Enum
	public final static String EnumToString(GtType Type, GreenTeaEnum Value) {
		if(Value != null) {
			return Value.EnumSymbol;
		}
		return null;
	}

	public final static long EnumToInt(GtType Type, GreenTeaEnum Value) {
		if(Value != null) {
			return Value.EnumValue;
		}
		return -1;
	}

	//-----------------------------------------------------------------------

	public final static int l2i(GtType Type, long n) {
		return (int)n;
	}

	public final static long i2l(GtType Type, int n) {
		return (long)n;
	}

	public final static short l2s(GtType Type, long n) {
		return (short)n;
	}

	public final static long s2l(GtType Type, short n) {
		return (long)n;
	}

	public final static float d2f(GtType Type, double n) {
		return (float)n;
	}

	public final static double f2d(GtType Type, float n) {
		return (double)n;
	}

	public final static long d2l(GtType Type, double n) {
		return (long)n;
	}

	public final static String d2s(GtType Type, double n) {
		return "" + n;
	}

	public final static double l2d(GtType Type, long n) {
		return (double)n;
	}

	public final static String c2s(GtType Type, char ch) {
		return ""+ch;
	}

	public final static char s2c(GtType Type, String s) {
		return s == null ? (char)0 : s.charAt(0);
	}

	public final static ArrayList<Object> ja2l(GtType Type, String[] Value) {
		int i, size = Value == null ? 0 : Value.length;
		ArrayList<Object> l = new ArrayList<Object>(size);
		for(i = 0; i < size; i++) {
			l.add(Value[i]);
		}
		return l;
	}

	public final static String[] l2ja(GtType Type, ArrayList<Object> List) {
		int size = List == null ? 0 : List.size();
		String[] a = new String[size];
		//List.toArray(a);
		return a;
	}

	//-----------------------------------------------------

	public static long unary_plus(long n) {
		return +n;
	}

	public static long unary_minus(long n) {
		return -n;
	}

	public static long unary_not(long n) {
		return ~n;
	}

	public static boolean unary_not(boolean b) {
		return !b;
	}

	public static double unary_plus(double n) {
		return +n;
	}

	public static double unary_minus(double n) {
		return -n;
	}

	//-----------------------------------------------------

	public static boolean binary_eq(boolean x, boolean y) {
		return x == y;
	}

	public static boolean binary_ne(boolean x, boolean y) {
		return x != y;
	}

	//-----------------------------------------------------

	public static long binary_add(long x, long y) {
		return x + y;
	}

	public static long binary_sub(long x, long y) {
		return x - y;
	}

	public static long binary_mul(long x, long y) {
		return x * y;
	}

	public static long binary_div(long x, long y) {
		return x / y;
	}

	public static long binary_mod(long x, long y) {
		return x % y;
	}

	public static long binary_shl(long x, long y) {
		return x << y;
	}

	public static long binary_shr(long x, long y) {
		return x >> y;
	}

	public static long binary_and(long x, long y) {
		return x & y;
	}

	public static long binary_or(long x, long y) {
		return x | y;
	}

	public static long binary_xor(long x, long y) {
		return x ^ y;
	}

	public static boolean binary_lt(long x, long y) {
		return x < y;
	}

	public static boolean binary_le(long x, long y) {
		return x <= y;
	}

	public static boolean binary_gt(long x, long y) {
		return x > y;
	}

	public static boolean binary_ge(long x, long y) {
		return x >= y;
	}

	public static boolean binary_eq(long x, long y) {
		return x == y;
	}

	public static boolean binary_ne(long x, long y) {
		return x != y;
	}

	//-----------------------------------------------------

	public static boolean binary_eq(String x, String y) {
		if(x == null) {
			return x == y;
		}
		else {
			return x.equals(y);
		}
	}

	public static boolean binary_ne(String x, String y) {
		return !binary_eq(x, y);
	}

	//-----------------------------------------------------

	public static String binary_add(String x, String y) {
		return x + y;
	}

	public static String binary_add(String x, long y) {
		return x + y;
	}

	public static String binary_add(String x, boolean y) {
		return x + y;
	}

	public static String binary_add(long x, String y) {
		return x + y;
	}

	public static String binary_add(boolean x, String y) {
		return x + y;
	}

	//-----------------------------------------------------
	public static double binary_add(double x, double y) {
		return x + y;
	}

	public static double binary_sub(double x, double y) {
		return x - y;
	}

	public static double binary_mul(double x, double y) {
		return x * y;
	}

	public static double binary_div(double x, double y) {
		return x / y;
	}

	public static boolean binary_lt(double x, double y) {
		return x < y;
	}

	public static boolean binary_le(double x, double y) {
		return x <= y;
	}

	public static boolean binary_gt(double x, double y) {
		return x > y;
	}

	public static boolean binary_ge(double x, double y) {
		return x >= y;
	}

	public static boolean binary_eq(double x, double y) {
		return x == y;
	}

	public static boolean binary_ne(double x, double y) {
		return x != y;
	}

	public static double binary_add(long x, double y) {
		return x + y;
	}

	public static double binary_sub(long x, double y) {
		return x - y;
	}

	public static double binary_mul(long x, double y) {
		return x * y;
	}

	public static double binary_div(long x, double y) {
		return x / y;
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
}
//endif VAJA