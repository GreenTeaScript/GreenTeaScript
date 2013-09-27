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

package org.GreenTeaScript.Konoha;
import org.GreenTeaScript.GtType;

public final class DoubleApi {
	public static double Plus(double n) {
		return +n;
	}
	public static double Minus(double n) {
		return -n;
	}
	public static double Add(double x, double y) {
		return x + y;
	}
	public static double Sub(double x, double y) {
		return x - y;
	}
	public static double Mul(double x, double y) {
		return x * y;
	}
	public static double Div(double x, double y) {
		return x / y;
	}
	public static double Mod(double x, double y) {
		return x % y;
	}
	public static boolean LessThan(double x, double y) {
		return x < y;
	}
	public static boolean LessThanEquals(double x, double y) {
		return x <= y;
	}
	public static boolean GreaterThan(double x, double y) {
		return x > y;
	}
	public static boolean GreaterThanEquals(double x, double y) {
		return x >= y;
	}
	public static boolean Equals(double x, double y) {
		return x == y;
	}
	public static boolean NotEquals(double x, double y) {
		return x != y;
	}
	// converter
	public final static String ToString(GtType Type, double value) {
		return "" + value;
	}
	public final static Object ToAny(GtType Type, double value) {
		return new Double(value);
	}
	public final static long ToInt(GtType Type, double value) {
		return (long)value;
	}
	// JavaType
	public final static float d2f(GtType Type, double n) {
		return (float)n;
	}
	public final static double f2d(GtType Type, float n) {
		return (double)n;
	}
	public final static int d2i(GtType Type, double n) {
		return (int)n;
	}
	public final static double i2d(GtType Type, int n) {
		return (double)n;
	}
}
