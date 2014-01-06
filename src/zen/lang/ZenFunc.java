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

//ifdef JAVA
package zen.lang;
import zen.deps.LibNative;
import zen.deps.LibZen;
import zen.parser.GtNameSpace;
import zen.parser.ZenUtils;

public class ZenFunc implements ZenFuncConst {
	/*field*/public                 int FuncId;
	/*field*/public int				FuncFlag;
	/*field*/public String			FuncName;
	/*field*/public ZenType[]		Types;
//	/*field*/public GtType          FuncType;
//	/*field*/public Object          FuncBody;  // Abstract function if null
//	/*field*/public String[]        GenericParam;

	public ZenFunc(int FuncFlag, String FuncName, ZenType[] Types) {
		this.FuncFlag = FuncFlag;
		this.FuncName = FuncName;
		this.Types = Types;
//		this.Types = LibZen.CompactTypeList(BaseIndex, ParamList);
//		LibNative.Assert(this.Types.length > 0);
//		this.FuncId = ZenTypeSystem.FuncPools.size();
//		ZenTypeSystem.FuncPools.add(this);
	}

	public final String GetNativeFuncName() {
		if(this.Is(ExportFunc)) {
			return this.FuncName;
		}
		else {
			return this.FuncName + NativeNameSuffix + this.FuncId;
		}
	}

	public final ZenType GetStaticType(GtNameSpace NameSpace) {
		/*local*/int loc = this.FuncName.lastIndexOf(".");
		if(loc != -1) {
			return NameSpace.GetType(this.FuncName.substring(0, loc));
		}
		return null;
	}

	public final ZenType GetFuncType() {
		return ZenSystem.GetFuncType(this);
	}

	@Override public String toString() {
		/*local*/String s = this.GetReturnType() + " " + this.FuncName + "(";
		/*local*/int i = 0;
		while(i < this.GetFuncParamSize()) {
			/*local*/ZenType ParamType = this.GetFuncParamType(i);
			if(i > 0) {
				s += ", ";
			}
			s += ParamType;
			i += 1;
		}
		return s + ")";
	}

	public boolean Is(int Flag) {
		return ZenUtils.IsFlag(this.FuncFlag, Flag);
	}

	public final ZenType GetReturnType() {
		return this.Types[0];
	}

	public final void SetReturnType(ZenType ReturnType) {
		LibNative.Assert(this.GetReturnType().IsVarType());
		this.Types[0] = ReturnType;
	}

	public final ZenType GetRecvType() {
		if(this.Types.length == 1) {
			return ZenSystem.VoidType;
		}
		return this.Types[1];
	}

	public final int GetFuncParamSize() {
		return this.Types.length - 1;
	}

	public final ZenType GetFuncParamType(int ParamIdx) {
		return this.Types[ParamIdx+1];
	}

	public final int GetMethodParamSize() {
		return this.Types.length - 2;
	}

	public final ZenType GetVargType() {
		if(this.Types.length > 0) {
			/*local*/ZenType VargType = this.Types[this.Types.length - 1];
			if(VargType.IsArrayType()) {
				return VargType.GetParamType(0);
			}
		}
		return null;
	}

	public final boolean EqualsParamTypes(int BaseIndex, ZenType[] ParamTypes) {
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

	public final boolean EqualsType(ZenFunc AFunc) {
		return this.EqualsParamTypes(0, AFunc.Types);
	}

	public final boolean EqualsOverridedMethod(ZenFunc AFunc) {
		return this.Types[0] == AFunc.Types[0] && this.EqualsParamTypes(2, AFunc.Types);
	}
	
	public Object Invoke(Object[] Params) {
		LibZen.DebugP("abstract function");
		return null;
	}

//	public final boolean IsAbstract() {
//		return this.FuncBody == null;
//	}
//
//	public final void SetNativeMacro(String NativeMacro) {
//		LibNative.Assert(this.FuncBody == null);
//		this.FuncFlag |= NativeMacroFunc;
//		this.FuncBody = NativeMacro;
//	}
//
//	public final String GetNativeMacro() {
//		return (/*cast*/String)this.FuncBody;
//	}
//
//	public final void SetNativeMethod(int OptionalFuncFlag, Object Method) {
//		this.FuncFlag |= NativeFunc | OptionalFuncFlag;
//		this.FuncBody = Method;
//	}

//	public final boolean ImportMethod(String FullName) {
//		return LibZen.ImportMethodToFunc(this, FullName);
//	}

//	
//	private boolean HasStaticBlock() {
//		if(this.FuncBody instanceof GtFuncBlock) {
//			/*local*/GtFuncBlock FuncBlock = (/*cast*/GtFuncBlock)this.FuncBody;
//			return !FuncBlock.IsVarArgument;
//		}
//		return false;
//	}
//
//	public void GenerateNativeFunc() {
//		if(this.HasStaticBlock()) {
//			/*local*/GtFuncBlock FuncBlock = (/*cast*/GtFuncBlock)this.FuncBody;
//			/*local*/GtTypeEnv Gamma = new GtTypeEnv(FuncBlock.NameSpace);
//			/*local*/int i = 0;
//			/*local*/ArrayList<String> NameList = new ArrayList<String>();
//			while(i <  FuncBlock.NameList.size()) {
//				/*local*/GtVariableInfo VarInfo = Gamma.AppendDeclaredVariable(0, FuncBlock.DefinedFunc.Types[i+1], FuncBlock.NameList.get(i), null, null);
//				NameList.add(VarInfo.NativeName);
//				i = i + 1;
//			}
//			Gamma.FuncBlock = FuncBlock;
//			/*local*/GtNode BodyNode = GreenTeaUtils.TypeBlock(Gamma, FuncBlock.FuncBlock, GtStaticTable.VoidType);
//			if(Gamma.FoundUncommonFunc) {
//				Gamma.FuncBlock.DefinedFunc.FuncFlag = UnsetFlag(Gamma.FuncBlock.DefinedFunc.FuncFlag, CommonFunc);
//			}
//			/*local*/String FuncName = FuncBlock.DefinedFunc.GetNativeFuncName();
//			Gamma.Generator.GenerateFunc(FuncBlock.DefinedFunc, NameList, BodyNode);
//			if(FuncName.equals("main")) {
//				Gamma.Generator.InvokeMainFunc(FuncName);
//			}
//		}
//	}
//
//	public boolean HasLazyBlock() {
//		if(this.FuncBody instanceof GtFuncBlock) {
//			/*local*/GtFuncBlock FuncBlock = (/*cast*/GtFuncBlock)this.FuncBody;
//			return FuncBlock.IsVarArgument;
//		}
//		return false;
//	}
//
//	public GtFunc GenerateLazyFunc(ArrayList<GtNode> NodeList) {
//		return null; // TODO
//	}
//
//	public final GtNameSpace GetGenericNameSpace(GtNameSpace NameSpace, ArrayList<GtNode> NodeList, int MaxSize) {
//		if(this.Is(GenericFunc)) {
//			/*local*/GtNameSpace GenericNameSpace = NameSpace.CreateSubNameSpace();
//			/*local*/int i = 0;
//			while(i < this.Types.length) {
//				this.Types[i].AppendTypeVariable(GenericNameSpace, 0);
//				i = i + 1;
//			}
//			i = 0;
//			while(i < MaxSize) {
//				this.Types[i+1].Match(GenericNameSpace, NodeList.get(i).Type);
//				i = i + 1;				
//			}
//			return GenericNameSpace;
//		}
//		return NameSpace;
//	}
//
//	public final GtNameSpace GetGenericNameSpaceT(GtNameSpace NameSpace, ArrayList<GtType> NodeList, int MaxSize) {
//		if(this.Is(GenericFunc)) {
//			/*local*/GtNameSpace GenericNameSpace = NameSpace.CreateSubNameSpace();
//			/*local*/int i = 0;
//			while(i < this.Types.length) {
//				this.Types[i].AppendTypeVariable(GenericNameSpace, 0);
//				i = i + 1;
//			}
//			i = 0;
//			while(i < MaxSize) {
//				this.Types[i+1].Match(GenericNameSpace, NodeList.get(i));
//				i = i + 1;				
//			}
//			return GenericNameSpace;
//		}
//		return NameSpace;
//	}
//
}
