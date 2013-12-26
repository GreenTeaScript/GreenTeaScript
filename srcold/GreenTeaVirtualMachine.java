//// ***************************************************************************
//// Copyright (c) 2013, JST/CREST DEOS project authors. All rights reserved.
//// Redistribution and use in source and binary forms, with or without
//// modification, are permitted provided that the following conditions are met:
////
//// *  Redistributions of source code must retain the above copyright notice,
////    this list of conditions and the following disclaimer.
//// *  Redistributions in binary form must reproduce the above copyright
////    notice, this list of conditions and the following disclaimer in the
////    documentation and/or other materials provided with the distribution.
////
//// THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS
//// "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED
//// TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR
//// PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER OR
//// CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL,
//// EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO,
//// PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS;
//// OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY,
//// WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR
//// OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF
//// ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
//// **************************************************************************
//
//package org.GreenTeaScript;
//
//final class GtStack {
//	/*field*/public final Object[] Stack;
//	/*field*/public int StackTop;
//	GtStack/*constructor*/() {
//		this.Stack = new Object[4096];
//		this.StackTop = 0;
//	}
//	public final void Shift(int Shift) {
//		this.StackTop += Shift;
//	}
//	public final void Unshift(int Shift) {
//		this.StackTop -= Shift;
//	}
//	public final void SetValueAt(int Index, Object Ref) {
//		this.Stack[this.StackTop + Index] = Ref;
//	}
//	public final Object GetValueAt(int Index) {
//		return this.Stack[this.StackTop + Index];
//	}
//	public final boolean GetBooleanAt(int Index) {
//		return ((/*cast*/Boolean)this.Stack[this.StackTop + Index]).booleanValue();
//	}
//	public final long GetIntAt(int Index) {
//		return ((/*cast*/Long)this.Stack[this.StackTop + Index]).longValue();
//	}
//}
//
//class GtException extends RuntimeException {
//	GtException/*constructor*/(String Message) {
//		super(Message);
//	}
//}
//
//interface CodeSet {
//	public final static int NopCode      = 0;
//	public final static int ReturnCode   = 1; // Return A
//	public final static int YieldCode    = 2;
//	public final static int JumpCode     = 3;
//	public final static int JumpIfTrueCode = 4;
//	public final static int JumpIfFalseCode  = 5;
//	public final static int TryCatchCode  = 6;
//	public final static int SetCode      = 7;
//	public final static int ApplyCode    = 8;
//	public final static int CallNativeCode  = 9;
//	public final static int IntAddCode   = 10; // C = A + B
//
//}
//
//final class GtCode implements CodeSet {
//	/*field*/public final int OpCode;
//	/*field*/public final int Index_A;
//	/*field*/public final int Index_B;
//	/*field*/public final int Index_C;  /* C = A op B */
//	/*field*/public final Object Ref;
//	GtCode/*constructor*/(int OpCode, int Index_A, int Index_B, int Index_C, Object Ref) {
//		this.OpCode = OpCode;
//		this.Index_A = Index_A;
//		this.Index_B = Index_B;
//		this.Index_C = Index_C;
//		this.Ref = Ref;
//	}
//}
//
//public class GreenTeaVirtualMachine implements CodeSet {
//
//	public static Object Run(GtStack Stack, int pc, GtCode Code[]) {	
//		Object ObjectReg = null;
//		long IntReg = 0;
//		int StackTop = 0;
//		while(pc > 0) {
//			/*local*/GtCode _Code = Code[pc];
//			switch(_Code.OpCode) {
//			case NopCode:
//				pc = pc + 1;
//				break;
//			case ReturnCode:
//				return Stack.GetValueAt(_Code.Index_A);
//			case YieldCode:
//				pc = _Code.Index_A;
//				return pc;
//			case JumpCode:
//				pc = _Code.Index_A;
//				break;
//			case JumpIfTrueCode:
//				if(Stack.GetBooleanAt(_Code.Index_A)) {
//					pc = _Code.Index_B;
//				}
//				else {
//					pc = pc + 1;
//				}
//				break;
//			case JumpIfFalseCode:
//				if(Stack.GetBooleanAt(_Code.Index_A)) {
//					pc = pc + 1;
//				}
//				else {
//					pc = _Code.Index_B;
//				}
//				break;
//			case TryCatchCode:
//				try {
//					StackTop = Stack.StackTop;
//					ObjectReg = Run(Stack, pc + 1, (GtCode[])_Code.Ref);
//					pc = ((Integer)ObjectReg).intValue();
//				}
//				catch(GtException e) {
//					Stack.StackTop = StackTop;
//					Stack.SetValueAt(_Code.Index_A, e);
//					pc = _Code.Index_B;
//				}
//				break;
//			
//			case SetCode:
//				Stack.SetValueAt(_Code.Index_A, _Code.Ref);
//				pc = pc + 1;
//				break;
//			case ApplyCode:
//				Stack.Shift(_Code.Index_A);
//				ObjectReg = Run(Stack, 0, (GtCode[])_Code.Ref);
//				Stack.Unshift(_Code.Index_A);
//				Stack.SetValueAt(_Code.Index_C, ObjectReg);
//				pc = pc + 1;
//				break;
//			case CallNativeCode:
//				Stack.Shift(_Code.Index_A);
//				ObjectReg = CallNative(_Code.Ref, Stack, _Code.Index_B);
//				Stack.Unshift(_Code.Index_A);
//				Stack.SetValueAt(_Code.Index_C, ObjectReg);
//				pc = pc + 1;
//				break;
//			case IntAddCode:
//				IntReg = Stack.GetIntAt(_Code.Index_A) + Stack.GetIntAt(_Code.Index_B);
//				Stack.SetValueAt(_Code.Index_C, IntReg);
//				pc = pc + 1;
//				break;						
//			}
//		}
//		return null;
//	}
//
//	private static Object CallNative(Object Ref, GtStack Stack, int ParamSize) {
//		return null;
//	}
//}