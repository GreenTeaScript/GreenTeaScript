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

public interface ZenTypeConst {
	// ClassFlag
	public final static int     ExportType         = 1 << 0;  // @Export
	public final static int     PublicType         = 1 << 1;  // @Public
	public final static int		NativeType	       = 1 << 2;
	public final static int		VirtualType		   = 1 << 3;  // @Virtual
	public final static int     EnumType           = 1 << 4;
	public final static int     DeprecatedType     = 1 << 5;  // @Deprecated
	public final static int     HiddenType         = 1 << 6;
	// UnrevealedType is a type that must be hidden for users
	// WeatType must be converted to non-UnrevealedType by StrongCoersion
	// UnrevealedType is set only if StrongCoersion is defined
	public final static int     UnrevealedType           = HiddenType;
	public final static int     CommonType         = 1 << 7;  // @Common

	public final static int		DynamicType	       = 1 << 8;  // @Dynamic
	public final static int     OpenType           = 1 << 9;  // @Open for the future
	public final static int     UnboxType          = 1 << 10; 
	public final static int     TypeVariable       = 1 << 14;
	public final static int     GenericVariable    = 1 << 15;
	public final static int     UniqueType         = 1 << 16;
	
	public static final String NativeNameSuffix = "__";


}
