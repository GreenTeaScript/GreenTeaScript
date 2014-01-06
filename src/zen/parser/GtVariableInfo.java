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

package zen.parser;

import zen.lang.ZenType;
import zen.obsolete.GtFuncBlock;

public class GtVariableInfo {
	/*field*/public GtFuncBlock  FuncBlock;
	/*field*/public int     VariableFlag;
	/*field*/public ZenType	Type;
	/*field*/public String	Name;
	/*field*/public String	NativeName;
	/*field*/public GtToken SourceToken;
//	/*field*/public Object  InitValue;
	/*field*/public int     DefCount;
	/*field*/public int     UsedCount;

	GtVariableInfo/*constructor*/(GtFuncBlock FuncBlock, int VarFlag, ZenType Type, String Name, GtToken SourceToken) {
		this.FuncBlock    = FuncBlock;
		this.VariableFlag = VarFlag;
		this.Type = Type;
		this.SourceToken = SourceToken;
		this.Name = Name;
		this.NativeName = ZenUtils.NativeVariableName(Name, this.FuncBlock.GetVariableIndex());
//		this.InitValue = null;
		this.UsedCount = 0;
		this.DefCount  = 1;
	}

	public final boolean IsCaptured(GtNameSpace NameSpace) {
		return (NameSpace.FuncBlock != this.FuncBlock);
	}

//	public final void Defined() {
//		this.DefCount += 1;
////		this.InitValue = null;
//	}
//
//	public final void Used() {
//		this.UsedCount += 1;
//	}
//
//	public void Check(GtParserContext Context) {
//		if(this.UsedCount == 0 && this.SourceToken != null) {
//			Context.ReportError_OLD(GreenTeaConsts.WarningLevel, this.SourceToken, "unused variable: " + this.Name);
//		}
//	}
	// for debug
	@Override public String toString() {
		return "(" + this.Type + " " + this.Name + ", " + this.NativeName + ")";
	}

}