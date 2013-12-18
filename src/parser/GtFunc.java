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
package parser;
import java.util.ArrayList;
import java.util.Arrays;

import org.GreenTeaScript.LibGreenTea;
//endif VAJA

import parser.ast.GtNode;


public final class GtFunc extends GreenTeaUtils {
	/*field*/public int				FuncFlag;
	/*field*/public String			FuncName;
//	/*field*/public String          MangledName;
	/*field*/public GtType[]		Types;
	/*field*/public GtType          FuncType;
	/*field*/public                 int FuncId;
	/*field*/public Object          FuncBody;  // Abstract function if null
	/*field*/public String[]        GenericParam;

	public GtFunc/*constructor*/(int FuncFlag, String FuncName, int BaseIndex, ArrayList<GtType> ParamList) {
		this.FuncFlag = FuncFlag;
		this.FuncName = FuncName;
		this.Types = LibGreenTea.CompactTypeList(BaseIndex, ParamList);
		LibGreenTea.Assert(this.Types.length > 0);
		this.FuncType = null;
		this.FuncBody = null;
		this.FuncId = GtStaticTable.FuncPools.size();
		GtStaticTable.FuncPools.add(this);
//		this.MangledName = FuncName + NativeNameSuffix + this.FuncId;
	}

	public final String GetNativeFuncName() {
		if(this.Is(ExportFunc)) {
			return this.FuncName;
		}
		else {
			return this.FuncName + NativeNameSuffix + this.FuncId;
		}
	}

	public final GtType GetStaticType(GtNameSpace NameSpace) {
		/*local*/int loc = this.FuncName.lastIndexOf(".");
		if(loc != -1) {
			return NameSpace.GetType(this.FuncName.substring(0, loc));
		}
		return null;
	}

	public final GtType GetFuncType() {
		if(this.FuncType == null) {
			this.FuncType = GtStaticTable.GetGenericType(GtStaticTable.FuncType, 0, new ArrayList<GtType>(Arrays.asList(this.Types)), true);
		}
		return this.FuncType;
	}

	@Override public String toString() {
		/*local*/String s = this.GetReturnType().GetRevealedType() + " " + this.FuncName + "(";
		/*local*/int i = 0;
		while(i < this.GetFuncParamSize()) {
			/*local*/GtType ParamType = this.GetFuncParamType(i).GetRevealedType();
			if(i > 0) {
				s += ", ";
			}
			s += ParamType;
			i += 1;
		}
		return s + ")";
	}

	public boolean Is(int Flag) {
		return IsFlag(this.FuncFlag, Flag);
	}

	public final GtType GetReturnType() {
		return this.Types[0];
	}

	public final void SetReturnType(GtType ReturnType) {
		LibGreenTea.Assert(this.GetReturnType().IsVarType());
		this.Types[0] = ReturnType;
		this.FuncType = null; // reset
	}

	public final GtType GetRecvType() {
		if(this.Types.length == 1) {
			return GtStaticTable.VoidType;
		}
		return this.Types[1];
	}

	public final int GetFuncParamSize() {
		return this.Types.length - 1;
	}

	public final GtType GetFuncParamType(int ParamIdx) {
		return this.Types[ParamIdx+1];
	}

	public final int GetMethodParamSize() {
		return this.Types.length - 2;
	}

	public final GtType GetVargType() {
		if(this.Types.length > 0) {
			/*local*/GtType VargType = this.Types[this.Types.length - 1];
			if(VargType.IsArrayType()) {
				return VargType.TypeParams[0];
			}
		}
		return null;
	}

	public final boolean EqualsParamTypes(int BaseIndex, GtType[] ParamTypes) {
		if(this.Types.length == ParamTypes.length) {
			/*local*/int i = BaseIndex;
			while(i < this.Types.length) {
				if(this.Types[i] != ParamTypes[i]) {
					return false;
				}
				i = i + 1;
			}
			return true;
		}
		return false;
	}

	public final boolean EqualsType(GtFunc AFunc) {
		return this.EqualsParamTypes(0, AFunc.Types);
	}

	public final boolean EqualsOverridedMethod(GtFunc AFunc) {
		return this.Types[0] == AFunc.Types[0] && this.EqualsParamTypes(2, AFunc.Types);
	}

	public final boolean IsAbstract() {
		return this.FuncBody == null;
	}

	public final void SetNativeMacro(String NativeMacro) {
		LibGreenTea.Assert(this.FuncBody == null);
		this.FuncFlag |= NativeMacroFunc;
		this.FuncBody = NativeMacro;
	}

	public final String GetNativeMacro() {
		return (/*cast*/String)this.FuncBody;
	}

	public final void SetNativeMethod(int OptionalFuncFlag, Object Method) {
		this.FuncFlag |= NativeFunc | OptionalFuncFlag;
		this.FuncBody = Method;
	}

	public final boolean ImportMethod(String FullName) {
		return LibGreenTea.ImportMethodToFunc(this, FullName);
	}

	
	private boolean HasStaticBlock() {
		if(this.FuncBody instanceof GtFuncBlock) {
			/*local*/GtFuncBlock FuncBlock = (/*cast*/GtFuncBlock)this.FuncBody;
			return !FuncBlock.IsVarArgument;
		}
		return false;
	}

	public void GenerateNativeFunc() {
		if(this.HasStaticBlock()) {
			/*local*/GtFuncBlock FuncBlock = (/*cast*/GtFuncBlock)this.FuncBody;
			/*local*/GtTypeEnv Gamma = new GtTypeEnv(FuncBlock.NameSpace);
			/*local*/int i = 0;
			/*local*/ArrayList<String> NameList = new ArrayList<String>();
			while(i <  FuncBlock.NameList.size()) {
				/*local*/GtVariableInfo VarInfo = Gamma.AppendDeclaredVariable(0, FuncBlock.DefinedFunc.Types[i+1], FuncBlock.NameList.get(i), null, null);
				NameList.add(VarInfo.NativeName);
				i = i + 1;
			}
			Gamma.Func = FuncBlock.DefinedFunc;
			/*local*/GtNode BodyNode = GreenTeaUtils.TypeBlock(Gamma, FuncBlock.FuncBlock, GtStaticTable.VoidType);
			if(Gamma.FoundUncommonFunc) {
				Gamma.Func.FuncFlag = UnsetFlag(Gamma.Func.FuncFlag, CommonFunc);
			}
			/*local*/String FuncName = FuncBlock.DefinedFunc.GetNativeFuncName();
			Gamma.Generator.GenerateFunc(FuncBlock.DefinedFunc, NameList, BodyNode);
			if(FuncName.equals("main")) {
				Gamma.Generator.InvokeMainFunc(FuncName);
			}
		}
	}

	public boolean HasLazyBlock() {
		if(this.FuncBody instanceof GtFuncBlock) {
			/*local*/GtFuncBlock FuncBlock = (/*cast*/GtFuncBlock)this.FuncBody;
			return FuncBlock.IsVarArgument;
		}
		return false;
	}

	public GtFunc GenerateLazyFunc(ArrayList<GtNode> NodeList) {
		return null; // TODO
	}

	public final GtNameSpace GetGenericNameSpace(GtNameSpace NameSpace, ArrayList<GtNode> NodeList, int MaxSize) {
		if(this.Is(GenericFunc)) {
			/*local*/GtNameSpace GenericNameSpace = NameSpace.CreateSubNameSpace();
			/*local*/int i = 0;
			while(i < this.Types.length) {
				this.Types[i].AppendTypeVariable(GenericNameSpace, 0);
				i = i + 1;
			}
			i = 0;
			while(i < MaxSize) {
				this.Types[i+1].Match(GenericNameSpace, NodeList.get(i).Type);
				i = i + 1;				
			}
			return GenericNameSpace;
		}
		return NameSpace;
	}

	public final GtNameSpace GetGenericNameSpaceT(GtNameSpace NameSpace, ArrayList<GtType> NodeList, int MaxSize) {
		if(this.Is(GenericFunc)) {
			/*local*/GtNameSpace GenericNameSpace = NameSpace.CreateSubNameSpace();
			/*local*/int i = 0;
			while(i < this.Types.length) {
				this.Types[i].AppendTypeVariable(GenericNameSpace, 0);
				i = i + 1;
			}
			i = 0;
			while(i < MaxSize) {
				this.Types[i+1].Match(GenericNameSpace, NodeList.get(i));
				i = i + 1;				
			}
			return GenericNameSpace;
		}
		return NameSpace;
	}

	public Object Apply(Object[] Arguments) {
		return LibGreenTea.InvokeFunc(this, Arguments);
	}
}
