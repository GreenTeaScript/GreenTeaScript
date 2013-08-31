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



class GtType {
	public  Context: GtContext;
	public PackageNameSpace: GtNameSpace;
	ClassFlag: number;
	ClassId: number;
	public ShortClassName: string;
	SuperType: GtType;
	public SearchSuperFuncClass: GtType;
	public DefaultNullValue: Object;
	BaseType: GtType;
	TypeParams: GtType[];
	public NativeSpec: Object;

	 constructor(Context: GtContext, ClassFlag: number, ClassName: string, DefaultNullValue: Object, NativeSpec: Object) {
		this.Context = Context;
		this.ClassFlag = ClassFlag;
		this.ShortClassName = ClassName;
		this.SuperType = null;
		this.BaseType = this;
		this.SearchSuperFuncClass = null;
		this.DefaultNullValue = DefaultNullValue;
		this.NativeSpec = NativeSpec;
		this.ClassId = Context.ClassCount;
		Context.ClassCount += 1;
		this.TypeParams = null;
	}

	public CreateSubType(ClassFlag: number, ClassName: string, DefaultNullValue: Object, NativeSpec: Object): GtType {
		var SubType: GtType = new GtType(this.Context, ClassFlag, ClassName, DefaultNullValue, NativeSpec);
		SubType.SuperType = this;
		SubType.SearchSuperFuncClass = this;
		return SubType;
	}

	// Note Don't call this directly. Use Context.GetGenericType instead.
	public CreateGenericType(BaseIndex: number, TypeList: Array<GtType>, ShortName: string): GtType {
		var GenericType: GtType = new GtType(this.Context, this.ClassFlag, ShortName, null, null);
		GenericType.BaseType = this.BaseType;
		GenericType.SearchSuperFuncClass = this.BaseType;
		GenericType.SuperType = this.SuperType;
		GenericType.TypeParams = LibGreenTea.CompactTypeList(BaseIndex, TypeList);
		LibGreenTea.DebugP("new class: " + GenericType.ShortClassName + ", ClassId=" + GenericType.ClassId);
		return GenericType;
	}

	public  IsNative(): boolean {
		return IsFlag(this.ClassFlag, NativeClass);
	}

	public  IsDynamic(): boolean {
		return IsFlag(this.ClassFlag, DynamicClass);
	}

	public  IsGenericType(): boolean {
		return (this.TypeParams != null);
	}

	public toString(): string {
		return this.ShortClassName;
	}

	public  GetUniqueName(): string {
		if(LibGreenTea.DebugMode) {
			return this.BaseType.ShortClassName + NativeNameSuffix + this.ClassId;
		}
		else {
			return NativeNameSuffix + this.ClassId;
		}
	}

	public  Accept(Type: GtType): boolean {
		if(this == Type/* || this == this.Context.AnyType*/) {
			return true;
		}
		var SuperClass: GtType = this.SuperType;
		while(SuperClass != null) {
			if(SuperClass == Type) {
				return true;
			}
			SuperClass = SuperClass.SuperType;
		}
		return this.Context.CheckSubType(Type, this);
	}

	public SetClassField(ClassField: GtClassField): void {
		this.NativeSpec = ClassField;
	}

	public  IsFuncType(): boolean {
		return (this.BaseType == this.Context.FuncType);
	}

	public  IsVarType(): boolean {
		return (this == this.Context.VarType);
	}

	public  IsAnyType(): boolean {
		return (this == this.Context.AnyType);
	}

	public  IsArrayType(): boolean {
		return (this == this.Context.ArrayType);
	}

	public  IsTypeRef(): boolean {
		return IsFlag(this.ClassFlag, TypeRef);
	}

	public  IsEnumType(): boolean {
		return IsFlag(this.ClassFlag, EnumClass);
	}

	public RealType(Gamma: GtTypeEnv, TypeList: Array<GtType>): GtType {
		if(this.IsTypeRef()) {
			var Token: GtToken = (<GtToken>this.NativeSpec);
			var Index: number = Token.ParsedText.indexOf(95/*_*/); // T$1_0
			var ParamIndex: number = 1;
			var TypeParamIndex: number = -1;
			if(Index != -1) {
				ParamIndex = <number>LibGreenTea.ParseInt(Token.ParsedText.substring(2, Index)) - 1;
				TypeParamIndex = <number>LibGreenTea.ParseInt(Token.ParsedText.substring(Index+1));
			}
			else {
				ParamIndex = <number>LibGreenTea.ParseInt(Token.ParsedText.substring(2)) - 1;
			}
			if(ParamIndex >= 0 && ParamIndex < TypeList.size()) {
				var RealType: GtType = TypeList.get(ParamIndex);
				if(TypeParamIndex < 0) {
					return RealType;
				}
				if(RealType.IsGenericType() && TypeParamIndex < RealType.TypeParams.length) {
					return RealType.TypeParams[TypeParamIndex];
				}
			}
			Gamma.Context.ReportError(ErrorLevel, Token, "illegal type reference: " + Token.ParsedText);
			return null;
		}
		return this;
	}
}

class GtFunc {
	public FuncFlag: number;
	public FuncName: string;
	public MangledName: string;
	public Types: GtType[];
	private FuncType: GtType;
	public FuncId: number      ;
	public NativeRef: Object;  // Abstract function if null
	public GenericParam: string[];

	 constructor(FuncFlag: number, FuncName: string, BaseIndex: number, ParamList: Array<GtType>) {
		this.FuncFlag = FuncFlag;
		this.FuncName = FuncName;
		this.Types = LibGreenTea.CompactTypeList(BaseIndex, ParamList);
		LibGreenTea.Assert(this.Types.length > 0);
		this.FuncType = null;
		this.NativeRef = null;
		var Context: GtContext = this.GetContext();
		this.FuncId = Context.FuncCount;
		Context.FuncCount += 1;
		this.MangledName = FuncName + NativeNameSuffix + this.FuncId;
	}

	public  GetContext(): GtContext {
		return this.GetReturnType().Context;
	}

	public  GetNativeFuncName(): string {
		if(this.Is(ExportFunc)) {
			return this.FuncName;
		}
		else {
			return this.MangledName;
		}
	}

	public  GetFuncType(): GtType {
		if(this.FuncType == null) {
			var Context: GtContext = this.GetRecvType().Context;
			this.FuncType = Context.GetGenericType(Context.FuncType, 0, this.Types, true);
		}
		return this.FuncType;
	}

	public toString(): string {
		var s: string = this.FuncName + "(";
		var i: number = 0;
		while(i < this.GetFuncParamSize()) {
			var ParamType: GtType = this.GetFuncParamType(i);
			if(i > 0) {
				s += ", ";
			}
			s += ParamType;
			i += 1;
		}
		return s + ") : " + this.GetReturnType();
	}

	public Is(Flag: number): boolean {
		return IsFlag(this.FuncFlag, Flag);
	}

	public  GetReturnType(): GtType {
		return this.Types[0];
	}

	public  SetReturnType(ReturnType: GtType): void {
		LibGreenTea.Assert(this.GetReturnType().IsVarType());
		this.Types[0] = ReturnType;
	}

	public  GetRecvType(): GtType {
		if(this.Types.length == 1) {
			return this.Types[0].Context.VoidType;
		}
		return this.Types[1];
	}

	public  GetFuncParamSize(): number {
		return this.Types.length - 1;
	}

	public  GetFuncParamType(ParamIdx: number): GtType {
		return this.Types[ParamIdx+1];
	}

	public  GetMethodParamSize(): number {
		return this.Types.length - 2;
	}
		
	public  EqualsParamTypes(BaseIndex: number, ParamTypes: GtType[]): boolean {
		if(this.Types.length == ParamTypes.length) {
			var i: number = BaseIndex;
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

	public  EqualsType(AFunc: GtFunc): boolean {
		return this.EqualsParamTypes(0, this.Types);
	}

	public  IsAbstract(): boolean {
		return this.NativeRef == null;
	}

	public  SetNativeMacro(NativeMacro: string): void {
		LibGreenTea.Assert(this.NativeRef == null);
		this.FuncFlag |= NativeMacroFunc;
		this.NativeRef = NativeMacro;
	}

	public  GetNativeMacro(): string {
		return <string>this.NativeRef;
	}

	public  ApplyNativeMacro(BaseIndex: number, ParamCode: string[]): string {
		var NativeMacro: string = "$1 " + this.FuncName + " $2";
		if(IsFlag(this.FuncFlag, NativeMacroFunc)) {
			NativeMacro = this.GetNativeMacro();
		}
		var Code: string = NativeMacro.replace("$1", ParamCode[BaseIndex]);
		if(ParamCode.length == BaseIndex + 1) {
			Code = Code.replace("$2", "");
		}
		else {
			Code = Code.replace("$2", ParamCode[BaseIndex + 1]);
		}
		return Code;
	}

	public  SetNativeMethod(OptionalFuncFlag: number, Method: Object): void {
		LibGreenTea.Assert(this.NativeRef == null);
		this.FuncFlag |= NativeFunc | OptionalFuncFlag;
		this.NativeRef = Method;
	}

}

class GtPolyFunc {
	public NameSpace: GtNameSpace;
	public FuncList: Array<GtFunc>;

	 constructor(NameSpace: GtNameSpace, Func1: GtFunc) {
		this.NameSpace = NameSpace;
		this.FuncList = new Array<GtFunc>();
		this.FuncList.add(Func1);
	}

	public toString(): string { // this is used in an error message
		var s: string = "";
		var i: number = 0;
		while(i < this.FuncList.size()) {
			if(i > 0) {
				s = s + " ";
			}
			s = s + this.FuncList.get(i);
			i = i + 1;
		}
		return s;
	}

	public  Dup(NameSpace: GtNameSpace): GtPolyFunc {
		if(this.NameSpace != NameSpace) {
			var PolyFunc: GtPolyFunc = new GtPolyFunc(NameSpace, this.FuncList.get(0));
			var i: number = 1;
			while(i < this.FuncList.size()) {
				PolyFunc.FuncList.add(this.FuncList.get(i));
				i = i + 1;
			}
			return PolyFunc;
		}
		return this;
	}

	public  Append(Func: GtFunc): GtFunc {
		var i: number = 0;
		while(i < this.FuncList.size()) {
			var ListedFunc: GtFunc = this.FuncList.get(i);
			if(ListedFunc == Func) {
				return null; /* same function */
			}
			if(Func.EqualsType(ListedFunc)) {
				this.FuncList.add(Func);
				return ListedFunc;
			}
			i = i + 1;
		}
		this.FuncList.add(Func);
		return null;
	}

	public ResolveUnaryFunc(Gamma: GtTypeEnv, ParsedTree: GtSyntaxTree, ExprNode: GtNode): GtFunc {
		var i: number = this.FuncList.size() - 1;
		while(i >= 0) {
			var Func: GtFunc = this.FuncList.get(i);
			if(Func.GetFuncParamSize() == 1 && Func.Types[1].Accept(ExprNode.Type)) {
				return Func;
			}
			i = i - 1;
		}
		return null;
	}

	public  ResolveBinaryFunc(Gamma: GtTypeEnv, BinaryNodes: GtNode[]): GtFunc {
		var i: number = this.FuncList.size() - 1;
		while(i >= 0) {
			var Func: GtFunc = this.FuncList.get(i);
			if(Func.GetFuncParamSize() == 2 && Func.Types[1].Accept(BinaryNodes[0].Type) && Func.Types[2].Accept(BinaryNodes[1].Type)) {
				return Func;
			}
			i = i - 1;
		}
		i = this.FuncList.size() - 1;
		while(i >= 0) {
			var Func: GtFunc = this.FuncList.get(i);
			if(Func.GetFuncParamSize() == 2 && Func.Types[1].Accept(BinaryNodes[0].Type)) {
				var TypeCoercion: GtFunc = Gamma.NameSpace.GetCoercionFunc(BinaryNodes[1].Type, Func.Types[2], true);
				if(TypeCoercion != null) {
					BinaryNodes[1] = Gamma.CreateCoercionNode(Func.Types[2], TypeCoercion, BinaryNodes[1]);
					return Func;
				}
			}
			i = i - 1;
		}
		return null;
	}

	public IncrementalMatch(FuncParamSize: number, NodeList: Array<GtNode>): GtFunc {
		var i: number = this.FuncList.size() - 1;
		var ResolvedFunc: GtFunc = null;
		while(i >= 0) {
			var Func: GtFunc = this.FuncList.get(i);
			if(Func.GetFuncParamSize() == FuncParamSize) {
				var p: number = 0;
				while(p < NodeList.size()) {
					var Node: GtNode = NodeList.get(p);
					if(!Func.Types[p + 1].Accept(Node.Type)) {
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
			i = i - 1;
		}
		return ResolvedFunc;
	}

	public MatchAcceptableFunc(Gamma: GtTypeEnv, FuncParamSize: number, NodeList: Array<GtNode>): GtFunc {
		var i: number = this.FuncList.size() - 1;
		while(i >= 0) {
			var Func: GtFunc = this.FuncList.get(i);
			if(Func.GetFuncParamSize() == FuncParamSize) {
				var p: number = 0;
				var Coercions: GtNode[] = null;
				while(p < NodeList.size()) {
					var ParamType: GtType = Func.Types[p + 1];
					var Node: GtNode = NodeList.get(p);
					if(ParamType.Accept(Node.Type)) {
						p = p + 1;
						continue;
					}
					var TypeCoercion: GtFunc = Gamma.NameSpace.GetCoercionFunc(Node.Type, ParamType, true);
					if(TypeCoercion != null) {
						if(Coercions == null) {
							Coercions = new Array<GtNode>(NodeList.size());
						}
						Coercions[p] = Gamma.CreateCoercionNode(ParamType, TypeCoercion, Node);
						p = p + 1;
						continue;
					}
					Func = null;
					Coercions = null;
					break;
				}
				if(Func != null) {
					if(Coercions != null) {
						i = 1;
						while(i < Coercions.length) {
							if(Coercions[i] != null) {
								NodeList.set(i, Coercions[i]);
							}
							i = i + 1;
						}
						Coercions = null;
					}
					return Func;
				}
			}
			i = i - 1;
		}
		return null;
	}

	public ResolveFunc(Gamma: GtTypeEnv, ParsedTree: GtSyntaxTree, TreeIndex: number, NodeList: Array<GtNode>): GtFunc {
		var FuncParamSize: number = LibGreenTea.ListSize(ParsedTree.TreeList) - TreeIndex + NodeList.size();
		var ResolvedFunc: GtFunc = this.IncrementalMatch(FuncParamSize, NodeList);
		while(ResolvedFunc == null && TreeIndex < LibGreenTea.ListSize(ParsedTree.TreeList)) {
			var Node: GtNode = ParsedTree.TypeCheckNodeAt(TreeIndex, Gamma, Gamma.VarType, DefaultTypeCheckPolicy);
			NodeList.add(Node);
			if(Node.IsError()) {
				return null;
			}
			TreeIndex = TreeIndex + 1;
			ResolvedFunc = this.IncrementalMatch(FuncParamSize, NodeList);
		}
		if(ResolvedFunc == null) {
			return this.MatchAcceptableFunc(Gamma, FuncParamSize, NodeList);
		}
		while(TreeIndex < LibGreenTea.ListSize(ParsedTree.TreeList)) {
			var ContextType: GtType = ResolvedFunc.Types[NodeList.size()];
			var Node: GtNode = ParsedTree.TypeCheckNodeAt(TreeIndex, Gamma, ContextType, DefaultTypeCheckPolicy);
			NodeList.add(Node);
			if(Node.IsError()) {
				return null;
			}
			TreeIndex = TreeIndex + 1;
		}
		return ResolvedFunc;
	}

}

class GreenTeaTopObject {
	public GreenType: GtType;
	 constructor(GreenType: GtType) {
		this.GreenType = GreenType;
	}
}

 class GreenTeaAnyObject extends GreenTeaTopObject {
	public  NativeValue: Object;
	 constructor(GreenType: GtType, NativeValue: Object) {
		super(GreenType);
		this.NativeValue = NativeValue;
	}
}

class GreenTeaArray extends GreenTeaTopObject {
	 constructor(GreenType: GtType) {
		super(GreenType);
	}
}

class GreenTeaEnum extends GreenTeaTopObject {
	public  EnumValue: number;
	public  EnumSymbol: string;
	 constructor(GreenType: GtType, EnumValue: number, EnumSymbol: string) {
		super(GreenType);
		this.EnumValue = EnumValue;
		this.EnumSymbol = EnumSymbol;
	}
}