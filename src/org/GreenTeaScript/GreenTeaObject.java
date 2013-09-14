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
import java.util.Arrays;
//endif VAJA

class GtType extends GreenTeaUtils {
	/*field*/public final GtParserContext	Context;
	/*field*/public GtNameSpace     PackageNameSpace;
	/*field*/int					TypeFlag;
	/*field*/int                    TypeId;
	/*field*/public String			ShortName;
	/*field*/GtType					SuperType;
	/*field*/public GtType			ParentMethodSearch;
	/*field*/GtType					BaseType;
	/*field*/GtType[]				TypeParams;
	/*field*/public Object          TypeBody;
	/*field*/public Object			DefaultNullValue;

	GtType/*constructor*/(GtParserContext Context, int TypeFlag, String ShortName, Object DefaultNullValue, Object TypeBody) {
		this.Context = Context;
		this.TypeFlag = TypeFlag;
		this.ShortName = ShortName;
		this.SuperType = null;
		this.BaseType = this;
		this.ParentMethodSearch = null;
		this.DefaultNullValue = DefaultNullValue;
		this.TypeBody = TypeBody;
		if(!IsFlag(TypeFlag, TypeVariable)) {
			this.TypeId = Context.TypeCount;
			Context.TypeCount += 1;
		}
		this.TypeParams = null;
	}

	public GtType CreateSubType(int ClassFlag, String ClassName, Object DefaultNullValue, Object NativeSpec) {
		/*local*/GtType SubType = new GtType(this.Context, ClassFlag, ClassName, DefaultNullValue, NativeSpec);
		SubType.SuperType = this;
		SubType.ParentMethodSearch = this;
		return SubType;
	}

	// Note Don't call this directly. Use Context.GetGenericType instead.
	public GtType CreateGenericType(int BaseIndex, ArrayList<GtType> TypeList, String ShortName) {
		/*local*/int i = BaseIndex;
		/*local*/int TypeVariableFlag = 0;
		while(i < TypeList.size()) {
			if(TypeList.get(i).HasTypeVariable()) {
				TypeVariableFlag = GenericVariable;
				break;
			}
			i = i + 1;
		}
		/*local*/GtType GenericType = new GtType(this.Context, this.TypeFlag, ShortName, null, null);
		GenericType.BaseType = this.BaseType;
		GenericType.ParentMethodSearch = this.BaseType;
		GenericType.SuperType = this.SuperType;
		GenericType.TypeParams = LibGreenTea.CompactTypeList(BaseIndex, TypeList);
		LibGreenTea.VerboseLog(VerboseType, "new class: " + GenericType.ShortName + ", ClassId=" + GenericType.TypeId);
		return GenericType;
	}

	public final boolean IsAbstract() {
		return (this.TypeBody == null && this.SuperType == this.Context.StructType/*default*/);
	}

	public final boolean IsNative() {
		return IsFlag(this.TypeFlag, NativeType);
	}

	public final boolean IsDynamic() {
		return IsFlag(this.TypeFlag, DynamicType);
	}

	public final boolean IsGenericType() {
		return (this.TypeParams != null);
	}

	@Override public String toString() {
		return this.ShortName;
	}

	public final String GetNativeName() {
		if(IsFlag(this.TypeFlag, ExportType)) {
			return this.ShortName;
		}
		else {
			return this.BaseType.ShortName + NativeNameSuffix + this.TypeId;
		}
	}
	
	public final String GetUniqueName() {
		if(IsFlag(this.TypeFlag, TypeVariable)) {
			return this.ShortName;
		}
		else {
			if(LibGreenTea.DebugMode) {
				return this.BaseType.ShortName + NativeNameSuffix + this.TypeId;
			}
			else {
				return NativeNameSuffix + this.TypeId;
			}
		}
	}

	public final boolean Accept(GtType Type) {
		if(this == Type/* || this == this.Context.AnyType*/) {
			return true;
		}
		/*local*/GtType SuperClass = this.SuperType;
		while(SuperClass != null) {
			if(SuperClass == Type) {
				return true;
			}
			SuperClass = SuperClass.SuperType;
		}
		return this.Context.CheckSubType(Type, this);
	}

	public final boolean AcceptValue(Object Value) {
		return (Value != null) ? this.Accept(this.Context.GuessType(Value)) : true;
	}

	public void SetClassField(GtClassField ClassField) {
		this.TypeBody = ClassField;
	}

	public final boolean IsFuncType() {
		return (this.BaseType == this.Context.FuncType);
	}

	public final boolean IsVoidType() {
		return (this == this.Context.VoidType);
	}

	public final boolean IsVarType() {
		return (this == this.Context.VarType);
	}

	public final boolean IsAnyType() {
		return (this == this.Context.AnyType);
	}

	public final boolean IsTypeType() {
		return (this == this.Context.TypeType);
	}

	public final boolean IsBooleanType() {
		return (this == this.Context.BooleanType);
	}

	public final boolean IsStringType() {
		return (this == this.Context.StringType);
	}

	public final boolean IsArrayType() {
		return (this == this.Context.ArrayType);
	}

	public final boolean IsEnumType() {
		return IsFlag(this.TypeFlag, EnumType);
	}

	public boolean IsDynamicNaitiveLoading() {
		return this.IsNative() && !IsFlag(this.TypeFlag, CommonType);
	}

	public final boolean IsTypeVariable() {   // T
		return IsFlag(this.TypeFlag, TypeVariable);
	}

	public final boolean HasTypeVariable() {
		return IsFlag(this.TypeFlag, TypeVariable) || IsFlag(this.TypeFlag, GenericVariable);
	}

	public int AppendTypeVariable(GtNameSpace GenericNameSpace, int Count) {
		if(IsFlag(this.TypeFlag, TypeVariable)) {
			GtType TypeVar = GenericNameSpace.GetType(this.ShortName);
			if(TypeVar != null && TypeVar.IsTypeVariable()) {
				return Count;
			}
			GenericNameSpace.SetSymbol(this.ShortName, this, null);
			return Count + 1;
		}
		if(IsFlag(this.TypeFlag, GenericVariable)) {
			/*local*/int i = 0;
			while(i < this.TypeParams.length) {
				Count = this.TypeParams[i].AppendTypeVariable(GenericNameSpace, Count);
				i += 1;
			}
		}
		return Count;
	}
	
	public GtType RealType(GtNameSpace GenericNameSpace, GtType GivenType) {
		if(IsFlag(this.TypeFlag, TypeVariable)) {
			GtType TypeVar = GenericNameSpace.GetType(this.ShortName);
			if(TypeVar != null && !TypeVar.IsTypeVariable()) {
				GenericNameSpace.SetSymbol(this.ShortName, GivenType, null);
				return GivenType;
			}
			else {
				return TypeVar;
			}
		}
		if(IsFlag(this.TypeFlag, GenericVariable)) {
			if(GivenType.BaseType == this.BaseType && GivenType.TypeParams.length == this.TypeParams.length) {
				/*local*/int i = 0;
				ArrayList<GtType> TypeList = new ArrayList<GtType>();
				while(i < this.TypeParams.length) {
					GtType RealParamType = this.TypeParams[i].RealType(GenericNameSpace, GivenType.TypeParams[i]);
					TypeList.add(RealParamType);
					i += 1;
				}
				return this.Context.GetGenericType(this.BaseType, 0, TypeList, true);
			}
		}
		return this;
	}
	
	public boolean Match(GtNameSpace GenericNameSpace, GtType GivenType) {
		if(IsFlag(this.TypeFlag, TypeVariable)) {
			GtType TypeVar = GenericNameSpace.GetType(this.ShortName);
			if(TypeVar.IsTypeVariable()) {
				GenericNameSpace.SetSymbol(this.ShortName, GivenType, null);
				return true;
			}
			return TypeVar.Accept(GivenType);
		}
		if(IsFlag(this.TypeFlag, GenericVariable)) {
			if(GivenType.BaseType == this.BaseType && GivenType.TypeParams.length == this.TypeParams.length) {
				/*local*/int i = 0;
				while(i < this.TypeParams.length) {
					if(!this.TypeParams[i].Match(GenericNameSpace, GivenType.TypeParams[i])) {
						return false;
					}
					i += 1;
				}
				return true;
			}
			return false;
		}
		return this.Accept(GivenType);
	}

}

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

class GtFunc extends GreenTeaUtils {
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

	public GtFunc ResolveUnaryFunc(GtTypeEnv Gamma, GtSyntaxTree ParsedTree, GtNode ExprNode) {
		/*local*/int i = this.FuncList.size() - 1;
		while(i >= 0) {
			/*local*/GtFunc Func = this.FuncList.get(i);
			if(Func.GetFuncParamSize() == 1 && Func.Types[1].Accept(ExprNode.Type)) {
				return Func;
			}
			i = i - 1;
		}
		return null;
	}

	public final GtFunc GetIncMatchedFunc(GtNameSpace NameSpace, int FuncParamSize, ArrayList<GtNode> ParamList) {
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

//	public GtFunc GetAcceptableFunc(GtTypeEnv Gamma, int FuncParamSize, ArrayList<GtNode> ParamList) {
//		/*local*/int i = 0;
//		while(i < this.FuncList.size()) {
//			/*local*/GtFunc Func = this.FuncList.get(i);
//			if(Func.GetFuncParamSize() == FuncParamSize) {
//				/*local*/int p = 0;
//				/*local*/GtNode Coercions[] = null;
//				/*local*/GtNameSpace GenericNameSpace = Func.GetGenericNameSpace(Gamma.NameSpace);
//				while(p < ParamList.size()) {
//					/*local*/GtType ParamType = Func.Types[p + 1];
//					/*local*/GtNode Node = ParamList.get(p);
//					/*local*/GtType RealType = Node.Type.RealType(GenericNameSpace);
//					if(RealType == null) {
//						return null;
//					}
//					if(ParamType.Accept(RealType)) {
//						p = p + 1;
//						continue;
//					}
//					/*local*/GtFunc TypeCoercion = Gamma.NameSpace.GetConverterFunc(RealType, ParamType, true);
//					if(TypeCoercion != null && TypeCoercion.Is(CoercionFunc)) {
//						if(Coercions == null) {
//							Coercions = new GtNode[ParamList.size()];
//						}
//						Coercions[p] = Gamma.CreateCoercionNode(ParamType, TypeCoercion, Node);
//						p = p + 1;
//						continue;
//					}
//					Func = null;
//					Coercions = null;
//					break;
//				}
//				if(Func != null) {
//					if(Coercions != null) {
//						i = 1;
//						while(i < Coercions.length) {
//							if(Coercions[i] != null) {
//								ParamList.set(i, Coercions[i]);
//							}
//							i = i + 1;
//						}
//						Coercions = null;
//					}
//					return Func;
//				}
//			}
//			i = i + 1;
//		}
//		return null;
//	}

	public GtFunc ResolveFunc(GtTypeEnv Gamma, GtSyntaxTree ParsedTree, int TreeIndex, ArrayList<GtNode> NodeList) {
		/*local*/int FuncParamSize = LibGreenTea.ListSize(ParsedTree.SubTreeList) - TreeIndex + NodeList.size();
		//System.err.println("*** FuncParamSize=" + FuncParamSize + "resolved_size=" + NodeList.size());
		//System.err.println("*** FuncList=" + this);
		
		/*local*/GtFunc ResolvedFunc = this.GetIncMatchedFunc(Gamma.NameSpace, FuncParamSize, NodeList);
		while(ResolvedFunc == null && TreeIndex < LibGreenTea.ListSize(ParsedTree.SubTreeList)) {
			/*local*/GtNode Node = ParsedTree.TypeCheckAt(TreeIndex, Gamma, Gamma.VarType, DefaultTypeCheckPolicy);
			GreenTeaUtils.AppendTypedNode(NodeList, Node);
			TreeIndex = TreeIndex + 1;
			ResolvedFunc = this.GetIncMatchedFunc(Gamma.NameSpace, FuncParamSize, NodeList);
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

public interface GreenTeaObject {
	GtType GetGreenType();
}

class GreenTeaTopObject implements GreenTeaObject {
	/*field*/public GtType GreenType;
	GreenTeaTopObject/*constructor*/(GtType GreenType) {
		this.GreenType = GreenType;
	}
	public final GtType GetGreenType() {
		return this.GreenType;
	}
}

final class GreenTeaAnyObject extends GreenTeaTopObject {
	/*field*/public final Object NativeValue;
	GreenTeaAnyObject/*constructor*/(GtType GreenType, Object NativeValue) {
		super(GreenType);
		this.NativeValue = NativeValue;
	}
}

class GreenTeaArray extends GreenTeaTopObject {
	GreenTeaArray/*constructor*/(GtType GreenType) {
		super(GreenType);
	}
}

class GreenTeaEnum extends GreenTeaTopObject {
	/*field*/public final long EnumValue;
	/*field*/public final String EnumSymbol;
	GreenTeaEnum/*constructor*/(GtType GreenType, long EnumValue, String EnumSymbol) {
		super(GreenType);
		this.EnumValue = EnumValue;
		this.EnumSymbol = EnumSymbol;
	}

	@Override public String toString() {
		return ""+this.EnumValue;
	}
}