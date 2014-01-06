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

package zen.lang;

public interface ZenFuncConst {

	// FuncFlag
	public final static int		ExportFunc		    = 1 << 0;  // @Export
	public final static int     PublicFunc          = 1 << 1;  // @Public
	public final static int		NativeFunc		    = 1 << 2;
	public final static int		VirtualFunc		    = 1 << 3;
	public final static int		ConstFunc			= 1 << 4;  // @Const
	public final static int     DeprecatedFunc      = 1 << 5;  // @Deprecated
	public final static int     HiddenFunc          = 1 << 6;  // @Hidden
	public final static int     CommonFunc          = 1 << 7;  // @Common

	public final static int		NativeMethodFunc	= 1 << 8;
	public final static int		NativeMacroFunc	    = 1 << 9;
	public final static int		NativeVariadicFunc	= 1 << 10;
	public final static int     ConstructorFunc     = 1 << 11;
	public final static int     MethodFunc          = 1 << 12;  
	public final static int     GetterFunc          = 1 << 13;
	public final static int     SetterFunc          = 1 << 14;
	public final static int     OperatorFunc        = 1 << 15;  //@Operator
	public final static int     ConverterFunc       = 1 << 16;
	public final static int     CoercionFunc        = 1 << 17;  //@Coercion
	public final static int     StrongCoercionFunc  = 1 << 18;  //@StrongCoercion
	public final static int     GenericFunc         = 1 << 15;
	public final static int		LazyFunc		    = 1 << 16;
	public final static String NativeNameSuffix = "__";

}
