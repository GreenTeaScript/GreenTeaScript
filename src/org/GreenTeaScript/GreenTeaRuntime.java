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
import parser.GtType;

public class GreenTeaRuntime {
	// converter 
	
	// Boolean

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


	public final static Object DoubleToAny(GtType Type, double value) {
		return new Double(value);
	}

	public final static double AnyToDouble(GtType Type, Object value) {
		if(value instanceof Number) {
			return ((Number) value).doubleValue();
		}
		return 0;
	}

	//-----------------------------------------------------------------------


	public final static long d2l(GtType Type, double n) {
		return (long)n;
	}

	public final static String d2s(GtType Type, double n) {
		return "" + n;
	}

	public final static double l2d(GtType Type, long n) {
		return (double)n;
	}


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