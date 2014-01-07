// ***************************************************************************
// Copyright (c) 2013-2014, Konoha project authors. All rights reserved.
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

package zen.deps;

import java.lang.reflect.InvocationTargetException;
import java.lang.reflect.Method;

import zen.lang.ZenType;
import zen.lang.ZenFunc;
import zen.parser.ZenLogger;

public class ZenNativeFunc extends ZenFunc {
	/*field*/public Object Recv;
	/*field*/public Method JMethod;  // Abstract function if null
	
	public ZenNativeFunc(int FuncFlag, String FuncName, ZenType[] Types, Object Recv, Method JMethod) {
		super(FuncFlag, FuncName, Types);
		this.Recv = Recv;
		this.JMethod = JMethod;
	}
	
	public final Object Invoke(Object[] Params) {
		try {
			return (this.JMethod).invoke(this.Recv, Params);
		}
		catch (InvocationTargetException e) {
			ZenLogger.VerboseException(e);
		}
		catch (IllegalArgumentException e) {
			ZenLogger.VerboseException(e);
		}
		catch (IllegalAccessException e) {
			ZenLogger.VerboseException(e);
		}
		return null;
	}
}
