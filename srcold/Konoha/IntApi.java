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

public final class IntApi {
	public static long Plus(long n) {
		return +n;
	}
	public static long Minus(long n) {
		return -n;
	}
	public static long BitwiseNot(long n) {
		return ~n;
	}
	public static long Add(long x, long y) {
		return x + y;
	}
	public static long Sub(long x, long y) {
		return x - y;
	}
	public static long Mul(long x, long y) {
		return x * y;
	}
	public static long Div(long x, long y) {
		return x / y;
	}
	public static long Mod(long x, long y) {
		return x % y;
	}
	public static long LeftShift(long x, long y) {
		return x << y;
	}
	public static long RightShift(long x, long y) {
		return x >> y;
	}
	public static long BitwiseAnd(long x, long y) {
		return x & y;
	}
	public static long BitwiseOr(long x, long y) {
		return x | y;
	}
	public static long BitwiseXor(long x, long y) {
		return x ^ y;
	}
	public static boolean LessThan(long x, long y) {
		return x < y;
	}
	public static boolean LessThanEquals(long x, long y) {
		return x <= y;
	}
	public static boolean GreaterThan(long x, long y) {
		return x > y;
	}
	public static boolean GreaterThanEquals(long x, long y) {
		return x >= y;
	}
	public static boolean Equals(long x, long y) {
		return x == y;
	}
	public static boolean NotEquals(long x, long y) {
		return x != y;
	}
	// converter
	public final static String ToString(long value) {
		return String.valueOf(value);
	}
	public final static Object ToAny(long value) {
		return new Long(value);
	}
	public final static double ToDouble(long x) {
		return (double)x;
	}
	// double
	public static double Add(long x, double y) {
		return x + y;
	}
	public static double Sub(long x, double y) {
		return x - y;
	}
	public static double Mul(long x, double y) {
		return x * y;
	}
	public static double Div(long x, double y) {
		return x / y;
	}
	public static double Mod(long x, double y) {
		return x % y;
	}
	// JavaType
	public final static int l2i(long n) {
		return (int)n;
	}
	public final static long i2l(int n) {
		return (long)n;
	}
	public final static short l2s(long n) {
		return (short)n;
	}
	public final static long s2l(short n) {
		return (long)n;
	}
	public final static byte l2b(long n) {
		return (byte)n;
	}
	public final static long b2l(byte n) {
		return (long)n;
	}
	
}
