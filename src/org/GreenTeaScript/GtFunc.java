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
import java.util.ArrayList;
//endif VAJA
import java.util.Arrays;

class GtFuncBlock extends GreenTeaUtils {
	/*field*/public GtNameSpace       NameSpace;
	/*field*/public ArrayList<String> NameList;
	/*field*/public GtSyntaxTree FuncBlock;
	/*field*/public boolean IsVarArgument;
	/*field*/public ArrayList<GtType> TypeList;
	/*field*/public GtFunc DefinedFunc;

	GtFuncBlock/*constructor*/(GtNameSpace NameSpace, ArrayList<GtType> TypeList) {
		this.NameSpace = NameSpace;
		this.TypeList = TypeList;
		this.NameList = new ArrayList<String>();
		this.FuncBlock = null;
		this.IsVarArgument = false;
		this.DefinedFunc = null;
	}

	void SetThisIfInClass(GtType Type) {
		if(Type != null) {
			this.TypeList.add(Type);
			this.NameList.add(this.NameSpace.Context.Generator.GetRecvName());
		}
	}

	void SetConverterType() {
		this.TypeList.add(this.NameSpace.Context.TypeType);
		this.NameList.add("type");
	}

	void AddParameter(GtType Type, String Name) {
		this.TypeList.add(Type);
		if(Type.IsVarType()) {
			this.IsVarArgument = true;
		}
		this.NameList.add(Name);
	}
}

public final class GtFunc extends GreenTeaUtils {
	/*field*/public int				FuncFlag;
	/*field*/public String			FuncName;
	/*field*/public String          MangledName;
	/*field*/public GtType[]		Types;
	/*field*/public GtType          FuncType;
	/*field*/public                 int FuncId;
	/*field*/public Object          NativeRef;  // Abstract function if null
	/*field*/public String[]        GenericParam;

	GtFunc/*constructor*/(int FuncFlag, String FuncName, int BaseIndex, ArrayList<GtType> ParamList) {
		this.FuncFlag = FuncFlag;
		this.FuncName = FuncName;
		this.Types = LibGreenTea.CompactTypeList(BaseIndex, ParamList);
		LibGreenTea.Assert(this.Types.length > 0);
		this.FuncType = null;
		this.NativeRef = null;
		/*local*/GtParserContext Context = this.GetContext();
		this.FuncId = Context.FuncCount;
		Context.FuncCount += 1;
		this.MangledName = FuncName + NativeNameSuffix + this.FuncId;
	}

	public final GtParserContext GetContext() {
		return this.GetReturnType().Context;
	}

	public final String GetNativeFuncName() {
		if(this.Is(ExportFunc)) {
			return this.FuncName;
		}
		else {
			return this.MangledName;
		}
	}

	public final GtType GetFuncType() {
		if(this.FuncType == null) {
			/*local*/GtParserContext Context = this.GetRecvType().Context;
			this.FuncType = Context.GetGenericType(Context.FuncType, 0, new ArrayList<GtType>(Arrays.asList(this.Types)), true);
		}
		return this.FuncType;
	}

	@Override public String toString() {
		/*local*/String s = this.FuncName + "(";
		/*local*/int i = 0;
		while(i < this.GetFuncParamSize()) {
			/*local*/GtType ParamType = this.GetFuncParamType(i);
			if(i > 0) {
				s += ", ";
			}
			s += ParamType;
			i += 1;
		}
		return s + ") : " + this.GetReturnType();
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
			return this.Types[0].Context.VoidType;
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
			GtType VargType = this.Types[this.Types.length - 1];
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

	public final boolean IsAbstract() {
		return this.NativeRef == null;
	}

	public final void SetNativeMacro(String NativeMacro) {
		LibGreenTea.Assert(this.NativeRef == null);
		this.FuncFlag |= NativeMacroFunc;
		this.NativeRef = NativeMacro;
	}

	public final String GetNativeMacro() {
		return (/*cast*/String)this.NativeRef;
	}

	public final void SetNativeMethod(int OptionalFuncFlag, Object Method) {
//		LibGreenTea.Assert(this.NativeRef == null);
		this.FuncFlag |= NativeFunc | OptionalFuncFlag;
		this.NativeRef = Method;
	}

	private boolean HasStaticBlock() {
		if(this.NativeRef instanceof GtFuncBlock) {
			GtFuncBlock FuncBlock = (/*cast*/GtFuncBlock)this.NativeRef;
			return !FuncBlock.IsVarArgument;
		}
		return false;
	}

	public void GenerateNativeFunc() {
		if(this.HasStaticBlock()) {
			/*local*/GtFuncBlock FuncBlock = (/*cast*/GtFuncBlock)this.NativeRef;
			/*local*/GtTypeEnv Gamma = new GtTypeEnv(FuncBlock.NameSpace);
			/*local*/int i = 0;
			/*local*/ArrayList<String> NameList = new ArrayList<String>();
			while(i <  FuncBlock.NameList.size()) {
				/*local*/GtVariableInfo VarInfo = Gamma.AppendDeclaredVariable(0, FuncBlock.DefinedFunc.Types[i+1], FuncBlock.NameList.get(i), null, null);
				NameList.add(VarInfo.NativeName);
				i = i + 1;
			}
			Gamma.Func = FuncBlock.DefinedFunc;
			/*local*/GtNode BodyNode = GreenTeaUtils.TypeBlock(Gamma, FuncBlock.FuncBlock, Gamma.VoidType);
			/*local*/String FuncName = FuncBlock.DefinedFunc.GetNativeFuncName();
			Gamma.Generator.GenerateFunc(FuncBlock.DefinedFunc, NameList, BodyNode);
			if(FuncName.equals("main")) {
				Gamma.Generator.InvokeMainFunc(FuncName);
			}
		}
	}

	public boolean HasLazyBlock() {
		if(this.NativeRef instanceof GtFuncBlock) {
			GtFuncBlock FuncBlock = (/*cast*/GtFuncBlock)this.NativeRef;
			return FuncBlock.IsVarArgument;
		}
		return false;
	}

	public GtFunc GenerateLazyFunc(ArrayList<GtNode> NodeList) {
		return null; // TODO
	}

	public final GtNameSpace GetGenericNameSpace(GtNameSpace NameSpace) {
		if(this.Is(GenericFunc)) {
			/*local*/GtNameSpace GenericNameSpace = NameSpace.CreateSubNameSpace();
			/*local*/int i = 0;
			while(i < this.Types.length) {
				this.Types[i].AppendTypeVariable(GenericNameSpace, 0);
				i = i + 1;
			}
			return GenericNameSpace;
		}
		return NameSpace;
	}

}

class GtPolyFunc extends GreenTeaUtils {
	/*field*/public ArrayList<GtFunc> FuncList;

	GtPolyFunc/*constructor*/(ArrayList<GtFunc> FuncList) {
		this.FuncList = FuncList == null ? new ArrayList<GtFunc>() : FuncList;
	}

	@Override public String toString() { // this is used in an error message
		/*local*/String s = "";
		/*local*/int i = 0;
		while(i < this.FuncList.size()) {
			if(i > 0) {
				s = s + " ";
			}
			s = s + this.FuncList.get(i);
			i = i + 1;
		}
		return s;
	}

	public final void Append(GtFunc Func, GtToken SourceToken) {
		if(SourceToken != null) {
			/*local*/int i = 0;
			while(i < this.FuncList.size()) {
				/*local*/GtFunc ListedFunc = this.FuncList.get(i);
				if(ListedFunc == Func) {
					return; /* same function */
				}
				if(Func.EqualsType(ListedFunc)) {
					Func.GetContext().ReportError(WarningLevel, SourceToken, "duplicated symbol" + SourceToken.ParsedText);
					break;
				}
				i = i + 1;
			}
		}
		this.FuncList.add(Func);
	}

	public GtFunc ResolveUnaryFunc(GtTypeEnv Gamma, GtType Type) {
		/*local*/int i = 0;
		while(i < this.FuncList.size()) {
			/*local*/GtFunc Func = this.FuncList.get(i);
			if(Func.GetFuncParamSize() == 1 && Func.Types[1].Accept(Type)) {
				return Func;
			}
			i = i + 1;
		}
		return null;
	}

	public final GtFunc GetIncrementalMatchedFunc(GtNameSpace NameSpace, int FuncParamSize, ArrayList<GtNode> ParamList) {
		/*local*/GtFunc ResolvedFunc = null;
		/*local*/int i = 0;
		while(i < this.FuncList.size()) {
			/*local*/GtFunc Func = this.FuncList.get(i);
			if(Func.GetFuncParamSize() == FuncParamSize) {
				/*local*/GtNameSpace GenericNameSpace = Func.GetGenericNameSpace(NameSpace);
				/*local*/int p = 0;
				while(p < ParamList.size()) {
					/*local*/GtNode Node = ParamList.get(p);
					if(!Func.Types[p + 1].Match(GenericNameSpace, Node.Type)) {
						Func = null;
						break;
					}
					p = p + 1;
				}
				if(Func != null) {
					if(ResolvedFunc != null) {
						return null; // two more func
					}
					ResolvedFunc = Func;
				}
			}
			i = i + 1;
		}
		return ResolvedFunc;
	}

	public GtFunc CheckParamWithCoercion(GtNameSpace GenericNameSpace, GtFunc Func, ArrayList<GtNode> ParamList) {
		/*local*/int p = 0;
		/*local*/GtNode[] ConvertedNodes = null;
		while(p < ParamList.size()) {
			/*local*/GtType ParamType = Func.Types[p + 1];
			/*local*/GtNode Node = ParamList.get(p);
			/*local*/GtType RealType = ParamType.RealType(GenericNameSpace, Node.Type);
			if(!ParamType.Accept(RealType)) {
				/*local*/GtFunc TypeCoercion = GenericNameSpace.GetConverterFunc(RealType, ParamType, true);
				if(TypeCoercion != null && TypeCoercion.Is(CoercionFunc)) {
					if(ConvertedNodes == null) {
						ConvertedNodes = new GtNode[ParamList.size()];
					}
					ConvertedNodes[p] = GenericNameSpace.Context.Generator.CreateCoercionNode(ParamType, TypeCoercion, Node);
				}
				else {
					return null;
				}
			}
			p = p + 1;
		}
		if(ConvertedNodes != null) {
			p = 1;
			while(p < ConvertedNodes.length) {
				if(ConvertedNodes[p] != null) {
					ParamList.set(p, ConvertedNodes[p]);
				}
				p = p + 1;
			}
		}
		return Func;
	}

	public GtFunc CheckParamAsVarArg(GtNameSpace GenericNameSpace, GtFunc Func, GtType VargType, ArrayList<GtNode> ParamList) {
		/*local*/int p = 0;
		/*local*/GtNode ConvertedNodes[] = null;
		while(p < ParamList.size()) {
			/*local*/GtType ParamType = (p + 1 < Func.Types.length - 1) ? Func.Types[p + 1] : VargType;
			/*local*/GtNode Node = ParamList.get(p);
			/*local*/GtType RealType = ParamType.RealType(GenericNameSpace, Node.Type);
			if(RealType == null) {
				return null;
			}
			if(!ParamType.Accept(RealType)) {
				/*local*/GtFunc TypeCoercion = GenericNameSpace.GetConverterFunc(RealType, ParamType, true);
				if(TypeCoercion != null && TypeCoercion.Is(CoercionFunc)) {
					if(ConvertedNodes == null) {
						ConvertedNodes = new GtNode[ParamList.size()];
					}
					ConvertedNodes[p] = GenericNameSpace.Context.Generator.CreateCoercionNode(ParamType, TypeCoercion, Node);
				}
				else {
					return null;
				}
			}
			p = p + 1;
		}
		if(ConvertedNodes != null) {
			p = 1;
			while(p < ConvertedNodes.length) {
				if(ConvertedNodes[p] != null) {
					ParamList.set(p, ConvertedNodes[p]);
				}
				p = p + 1;
			}
			ConvertedNodes = null;
		}
		if(!Func.Is(NativeVariadicFunc)) {
			GtType ArrayType = Func.Types[Func.Types.length - 1];
			GtNode ArrayNode = GenericNameSpace.Context.Generator.CreateArrayNode(ArrayType, null);
			p = Func.Types.length - 1;
			while(p < ParamList.size()) {
				ArrayNode.Append(ParamList.get(p));
			}
			while(Func.Types.length - 1 < ParamList.size()) {
				ParamList.remove(ParamList.size() - 1);
			}
			ParamList.add(ArrayNode);
		}
		return Func;
	}

	public GtFunc GetAcceptableFunc(GtTypeEnv Gamma, int FuncParamSize, ArrayList<GtNode> ParamList) {
		/*local*/int i = 0;
		while(i < this.FuncList.size()) {
			/*local*/GtFunc Func = this.FuncList.get(i);
			if(Func.GetFuncParamSize() == FuncParamSize) {
				/*local*/GtNameSpace GenericNameSpace = Func.GetGenericNameSpace(Gamma.NameSpace);
				Func = CheckParamWithCoercion(GenericNameSpace, Func, ParamList);
				if(Func != null) {
					return Func;
				}
			}
			i = i + 1;
		}
		i = 0;
		while(i < this.FuncList.size()) {
			/*local*/GtFunc Func = this.FuncList.get(i);
			/*local*/GtType VargType = Func.GetVargType();
			if(VargType != null && Func.GetFuncParamSize() <= FuncParamSize) {
				/*local*/GtNameSpace GenericNameSpace = Func.GetGenericNameSpace(Gamma.NameSpace);
				Func = CheckParamAsVarArg(GenericNameSpace, Func, VargType, ParamList);
				if(Func != null) {
					return Func;
				}
			}
			i = i + 1;
		}
		return null;
	}

	public GtFunc ResolveFunc(GtTypeEnv Gamma, GtSyntaxTree ParsedTree, int TreeIndex, ArrayList<GtNode> NodeList) {
		/*local*/int FuncParamSize = LibGreenTea.ListSize(ParsedTree.SubTreeList) - TreeIndex + NodeList.size();
		//System.err.println("*** FuncParamSize=" + FuncParamSize + "resolved_size=" + NodeList.size());
		//System.err.println("*** FuncList=" + this);
		
		/*local*/GtFunc ResolvedFunc = this.GetIncrementalMatchedFunc(Gamma.NameSpace, FuncParamSize, NodeList);
		while(ResolvedFunc == null && TreeIndex < LibGreenTea.ListSize(ParsedTree.SubTreeList)) {
			/*local*/GtNode Node = ParsedTree.TypeCheckAt(TreeIndex, Gamma, Gamma.VarType, DefaultTypeCheckPolicy);
			GreenTeaUtils.AppendTypedNode(NodeList, Node);
			TreeIndex = TreeIndex + 1;
			ResolvedFunc = this.GetIncrementalMatchedFunc(Gamma.NameSpace, FuncParamSize, NodeList);
		}
		if(ResolvedFunc != null) {
			while(TreeIndex < LibGreenTea.ListSize(ParsedTree.SubTreeList)) {
				/*local*/GtType ContextType = ResolvedFunc.GetFuncParamType(NodeList.size()/*ResolvedSize*/);
				/*local*/GtNode Node = ParsedTree.TypeCheckAt(TreeIndex, Gamma, ContextType, DefaultTypeCheckPolicy);
				GreenTeaUtils.AppendTypedNode(NodeList, Node);
				TreeIndex = TreeIndex + 1;
			}
			return ResolvedFunc;			
		}
		return this.GetAcceptableFunc(Gamma, FuncParamSize, NodeList);
	}

	public GtFunc ResolveConstructor(GtTypeEnv Gamma, GtSyntaxTree ParsedTree, int TreeIndex, ArrayList<GtNode> NodeList) {
		/*local*/int FuncParamSize = LibGreenTea.ListSize(ParsedTree.SubTreeList) - TreeIndex + NodeList.size();
//		System.err.println("*** FuncParamSize=" + FuncParamSize + " resolved_size=" + NodeList.size());
//		System.err.println("*** FuncList=" + this);
		GtFunc ResolvedFunc = this.ResolveFunc(Gamma, ParsedTree, TreeIndex, NodeList);
		if(ResolvedFunc == null  && FuncParamSize == 1) {
			
		}
		return ResolvedFunc;
	}

}
