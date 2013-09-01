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
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var GtType = (function () {
    function GtType(Context, ClassFlag, ClassName, DefaultNullValue, NativeSpec) {
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
    GtType.prototype.CreateSubType = function (ClassFlag, ClassName, DefaultNullValue, NativeSpec) {
        var SubType = new GtType(this.Context, ClassFlag, ClassName, DefaultNullValue, NativeSpec);
        SubType.SuperType = this;
        SubType.SearchSuperFuncClass = this;
        return SubType;
    };

    // Note Don't call this directly. Use Context.GetGenericType instead.
    GtType.prototype.CreateGenericType = function (BaseIndex, TypeList, ShortName) {
        var GenericType = new GtType(this.Context, this.ClassFlag, ShortName, null, null);
        GenericType.BaseType = this.BaseType;
        GenericType.SearchSuperFuncClass = this.BaseType;
        GenericType.SuperType = this.SuperType;
        GenericType.TypeParams = LibGreenTea.CompactTypeList(BaseIndex, TypeList);
        LibGreenTea.DebugP("new class: " + GenericType.ShortClassName + ", ClassId=" + GenericType.ClassId);
        return GenericType;
    };

    GtType.prototype.IsNative = function () {
        return IsFlag(this.ClassFlag, NativeClass);
    };

    GtType.prototype.IsDynamic = function () {
        return IsFlag(this.ClassFlag, DynamicClass);
    };

    GtType.prototype.IsGenericType = function () {
        return (this.TypeParams != null);
    };

    GtType.prototype.toString = function () {
        return this.ShortClassName;
    };

    GtType.prototype.GetUniqueName = function () {
        if (LibGreenTea.DebugMode) {
            return this.BaseType.ShortClassName + NativeNameSuffix + this.ClassId;
        } else {
            return NativeNameSuffix + this.ClassId;
        }
    };

    GtType.prototype.Accept = function (Type) {
        if (this == Type) {
            return true;
        }
        var SuperClass = this.SuperType;
        while (SuperClass != null) {
            if (SuperClass == Type) {
                return true;
            }
            SuperClass = SuperClass.SuperType;
        }
        return this.Context.CheckSubType(Type, this);
    };

    GtType.prototype.SetClassField = function (ClassField) {
        this.NativeSpec = ClassField;
    };

    GtType.prototype.IsFuncType = function () {
        return (this.BaseType == this.Context.FuncType);
    };

    GtType.prototype.IsVarType = function () {
        return (this == this.Context.VarType);
    };

    GtType.prototype.IsAnyType = function () {
        return (this == this.Context.AnyType);
    };

    GtType.prototype.IsArrayType = function () {
        return (this == this.Context.ArrayType);
    };

    GtType.prototype.IsTypeRef = function () {
        return IsFlag(this.ClassFlag, TypeRef);
    };

    GtType.prototype.IsEnumType = function () {
        return IsFlag(this.ClassFlag, EnumClass);
    };

    GtType.prototype.RealType = function (Gamma, TypeList) {
        if (this.IsTypeRef()) {
            var Token = (this.NativeSpec);
            var Index = Token.ParsedText.indexOf(95);
            var ParamIndex = 1;
            var TypeParamIndex = -1;
            if (Index != -1) {
                ParamIndex = LibGreenTea.ParseInt(Token.ParsedText.substring(2, Index)) - 1;
                TypeParamIndex = LibGreenTea.ParseInt(Token.ParsedText.substring(Index + 1));
            } else {
                ParamIndex = LibGreenTea.ParseInt(Token.ParsedText.substring(2)) - 1;
            }
            if (ParamIndex >= 0 && ParamIndex < TypeList.size()) {
                var RealType = TypeList.get(ParamIndex);
                if (TypeParamIndex < 0) {
                    return RealType;
                }
                if (RealType.IsGenericType() && TypeParamIndex < RealType.TypeParams.length) {
                    return RealType.TypeParams[TypeParamIndex];
                }
            }
            Gamma.Context.ReportError(ErrorLevel, Token, "illegal type reference: " + Token.ParsedText);
            return null;
        }
        return this;
    };
    return GtType;
})();

var GtFunc = (function () {
    function GtFunc(FuncFlag, FuncName, BaseIndex, ParamList) {
        this.FuncFlag = FuncFlag;
        this.FuncName = FuncName;
        this.Types = LibGreenTea.CompactTypeList(BaseIndex, ParamList);
        LibGreenTea.Assert(this.Types.length > 0);
        this.FuncType = null;
        this.NativeRef = null;
        var Context = this.GetContext();
        this.FuncId = Context.FuncCount;
        Context.FuncCount += 1;
        this.MangledName = FuncName + NativeNameSuffix + this.FuncId;
    }
    GtFunc.prototype.GetContext = function () {
        return this.GetReturnType().Context;
    };

    GtFunc.prototype.GetNativeFuncName = function () {
        if (this.Is(ExportFunc)) {
            return this.FuncName;
        } else {
            return this.MangledName;
        }
    };

    GtFunc.prototype.GetFuncType = function () {
        if (this.FuncType == null) {
            var Context = this.GetRecvType().Context;
            this.FuncType = Context.GetGenericType(Context.FuncType, 0, this.Types, true);
        }
        return this.FuncType;
    };

    GtFunc.prototype.toString = function () {
        var s = this.FuncName + "(";
        var i = 0;
        while (i < this.GetFuncParamSize()) {
            var ParamType = this.GetFuncParamType(i);
            if (i > 0) {
                s += ", ";
            }
            s += ParamType;
            i += 1;
        }
        return s + ") : " + this.GetReturnType();
    };

    GtFunc.prototype.Is = function (Flag) {
        return IsFlag(this.FuncFlag, Flag);
    };

    GtFunc.prototype.GetReturnType = function () {
        return this.Types[0];
    };

    GtFunc.prototype.SetReturnType = function (ReturnType) {
        LibGreenTea.Assert(this.GetReturnType().IsVarType());
        this.Types[0] = ReturnType;
    };

    GtFunc.prototype.GetRecvType = function () {
        if (this.Types.length == 1) {
            return this.Types[0].Context.VoidType;
        }
        return this.Types[1];
    };

    GtFunc.prototype.GetFuncParamSize = function () {
        return this.Types.length - 1;
    };

    GtFunc.prototype.GetFuncParamType = function (ParamIdx) {
        return this.Types[ParamIdx + 1];
    };

    GtFunc.prototype.GetMethodParamSize = function () {
        return this.Types.length - 2;
    };

    GtFunc.prototype.EqualsParamTypes = function (BaseIndex, ParamTypes) {
        if (this.Types.length == ParamTypes.length) {
            var i = BaseIndex;
            while (i < this.Types.length) {
                if (this.Types[i] != ParamTypes[i]) {
                    return false;
                }
                i = i + 1;
            }
            return true;
        }
        return false;
    };

    GtFunc.prototype.EqualsType = function (AFunc) {
        return this.EqualsParamTypes(0, this.Types);
    };

    GtFunc.prototype.IsAbstract = function () {
        return this.NativeRef == null;
    };

    GtFunc.prototype.SetNativeMacro = function (NativeMacro) {
        LibGreenTea.Assert(this.NativeRef == null);
        this.FuncFlag |= NativeMacroFunc;
        this.NativeRef = NativeMacro;
    };

    GtFunc.prototype.GetNativeMacro = function () {
        return this.NativeRef;
    };

    GtFunc.prototype.ApplyNativeMacro = function (BaseIndex, ParamCode) {
        var NativeMacro = "$1 " + this.FuncName + " $2";
        if (IsFlag(this.FuncFlag, NativeMacroFunc)) {
            NativeMacro = this.GetNativeMacro();
        }
        var Code = NativeMacro.replace("$1", ParamCode[BaseIndex]);
        if (ParamCode.length == BaseIndex + 1) {
            Code = Code.replace("$2", "");
        } else {
            Code = Code.replace("$2", ParamCode[BaseIndex + 1]);
        }
        return Code;
    };

    GtFunc.prototype.SetNativeMethod = function (OptionalFuncFlag, Method) {
        LibGreenTea.Assert(this.NativeRef == null);
        this.FuncFlag |= NativeFunc | OptionalFuncFlag;
        this.NativeRef = Method;
    };
    return GtFunc;
})();

var GtPolyFunc = (function () {
    function GtPolyFunc(NameSpace, Func1) {
        this.NameSpace = NameSpace;
        this.FuncList = new Array();
        this.FuncList.add(Func1);
    }
    GtPolyFunc.prototype.toString = function () {
        var s = "";
        var i = 0;
        while (i < this.FuncList.size()) {
            if (i > 0) {
                s = s + " ";
            }
            s = s + this.FuncList.get(i);
            i = i + 1;
        }
        return s;
    };

    GtPolyFunc.prototype.Dup = function (NameSpace) {
        if (this.NameSpace != NameSpace) {
            var PolyFunc = new GtPolyFunc(NameSpace, this.FuncList.get(0));
            var i = 1;
            while (i < this.FuncList.size()) {
                PolyFunc.FuncList.add(this.FuncList.get(i));
                i = i + 1;
            }
            return PolyFunc;
        }
        return this;
    };

    GtPolyFunc.prototype.Append = function (Func) {
        var i = 0;
        while (i < this.FuncList.size()) {
            var ListedFunc = this.FuncList.get(i);
            if (ListedFunc == Func) {
                return null;
            }
            if (Func.EqualsType(ListedFunc)) {
                this.FuncList.add(Func);
                return ListedFunc;
            }
            i = i + 1;
        }
        this.FuncList.add(Func);
        return null;
    };

    GtPolyFunc.prototype.ResolveUnaryFunc = function (Gamma, ParsedTree, ExprNode) {
        var i = this.FuncList.size() - 1;
        while (i >= 0) {
            var Func = this.FuncList.get(i);
            if (Func.GetFuncParamSize() == 1 && Func.Types[1].Accept(ExprNode.Type)) {
                return Func;
            }
            i = i - 1;
        }
        return null;
    };

    GtPolyFunc.prototype.ResolveBinaryFunc = function (Gamma, BinaryNodes) {
        var i = this.FuncList.size() - 1;
        while (i >= 0) {
            var Func = this.FuncList.get(i);
            if (Func.GetFuncParamSize() == 2 && Func.Types[1].Accept(BinaryNodes[0].Type) && Func.Types[2].Accept(BinaryNodes[1].Type)) {
                return Func;
            }
            i = i - 1;
        }
        i = this.FuncList.size() - 1;
        while (i >= 0) {
            var Func = this.FuncList.get(i);
            if (Func.GetFuncParamSize() == 2 && Func.Types[1].Accept(BinaryNodes[0].Type)) {
                var TypeCoercion = Gamma.NameSpace.GetCoercionFunc(BinaryNodes[1].Type, Func.Types[2], true);
                if (TypeCoercion != null) {
                    BinaryNodes[1] = Gamma.CreateCoercionNode(Func.Types[2], TypeCoercion, BinaryNodes[1]);
                    return Func;
                }
            }
            i = i - 1;
        }
        return null;
    };

    GtPolyFunc.prototype.IncrementalMatch = function (FuncParamSize, NodeList) {
        var i = this.FuncList.size() - 1;
        var ResolvedFunc = null;
        while (i >= 0) {
            var Func = this.FuncList.get(i);
            if (Func.GetFuncParamSize() == FuncParamSize) {
                var p = 0;
                while (p < NodeList.size()) {
                    var Node = NodeList.get(p);
                    if (!Func.Types[p + 1].Accept(Node.Type)) {
                        Func = null;
                        break;
                    }
                    p = p + 1;
                }
                if (Func != null) {
                    if (ResolvedFunc != null) {
                        return null;
                    }
                    ResolvedFunc = Func;
                }
            }
            i = i - 1;
        }
        return ResolvedFunc;
    };

    GtPolyFunc.prototype.MatchAcceptableFunc = function (Gamma, FuncParamSize, NodeList) {
        var i = this.FuncList.size() - 1;
        while (i >= 0) {
            var Func = this.FuncList.get(i);
            if (Func.GetFuncParamSize() == FuncParamSize) {
                var p = 0;
                var Coercions = null;
                while (p < NodeList.size()) {
                    var ParamType = Func.Types[p + 1];
                    var Node = NodeList.get(p);
                    if (ParamType.Accept(Node.Type)) {
                        p = p + 1;
                        continue;
                    }
                    var TypeCoercion = Gamma.NameSpace.GetCoercionFunc(Node.Type, ParamType, true);
                    if (TypeCoercion != null) {
                        if (Coercions == null) {
                            Coercions = new Array(NodeList.size());
                        }
                        Coercions[p] = Gamma.CreateCoercionNode(ParamType, TypeCoercion, Node);
                        p = p + 1;
                        continue;
                    }
                    Func = null;
                    Coercions = null;
                    break;
                }
                if (Func != null) {
                    if (Coercions != null) {
                        i = 1;
                        while (i < Coercions.length) {
                            if (Coercions[i] != null) {
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
    };

    GtPolyFunc.prototype.ResolveFunc = function (Gamma, ParsedTree, TreeIndex, NodeList) {
        var FuncParamSize = LibGreenTea.ListSize(ParsedTree.TreeList) - TreeIndex + NodeList.size();
        var ResolvedFunc = this.IncrementalMatch(FuncParamSize, NodeList);
        while (ResolvedFunc == null && TreeIndex < LibGreenTea.ListSize(ParsedTree.TreeList)) {
            var Node = ParsedTree.TypeCheckNodeAt(TreeIndex, Gamma, Gamma.VarType, DefaultTypeCheckPolicy);
            NodeList.add(Node);
            if (Node.IsError()) {
                return null;
            }
            TreeIndex = TreeIndex + 1;
            ResolvedFunc = this.IncrementalMatch(FuncParamSize, NodeList);
        }
        if (ResolvedFunc == null) {
            return this.MatchAcceptableFunc(Gamma, FuncParamSize, NodeList);
        }
        while (TreeIndex < LibGreenTea.ListSize(ParsedTree.TreeList)) {
            var ContextType = ResolvedFunc.Types[NodeList.size()];
            var Node = ParsedTree.TypeCheckNodeAt(TreeIndex, Gamma, ContextType, DefaultTypeCheckPolicy);
            NodeList.add(Node);
            if (Node.IsError()) {
                return null;
            }
            TreeIndex = TreeIndex + 1;
        }
        return ResolvedFunc;
    };
    return GtPolyFunc;
})();

var GreenTeaTopObject = (function () {
    function GreenTeaTopObject(GreenType) {
        this.GreenType = GreenType;
    }
    return GreenTeaTopObject;
})();

var GreenTeaAnyObject = (function (_super) {
    __extends(GreenTeaAnyObject, _super);
    function GreenTeaAnyObject(GreenType, NativeValue) {
        _super.call(this, GreenType);
        this.NativeValue = NativeValue;
    }
    return GreenTeaAnyObject;
})(GreenTeaTopObject);

var GreenTeaArray = (function (_super) {
    __extends(GreenTeaArray, _super);
    function GreenTeaArray(GreenType) {
        _super.call(this, GreenType);
    }
    return GreenTeaArray;
})(GreenTeaTopObject);

var GreenTeaEnum = (function (_super) {
    __extends(GreenTeaEnum, _super);
    function GreenTeaEnum(GreenType, EnumValue, EnumSymbol) {
        _super.call(this, GreenType);
        this.EnumValue = EnumValue;
        this.EnumSymbol = EnumSymbol;
    }
    return GreenTeaEnum;
})(GreenTeaTopObject);
