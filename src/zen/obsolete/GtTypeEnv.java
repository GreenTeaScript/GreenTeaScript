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

package zen.obsolete;

import zen.parser.GtNameSpace;
import zen.parser.ZenUtils;

@Deprecated
public final class GtTypeEnv extends ZenUtils {
//	/*field*/public final GtParserContext    Context;
//	/*field*/public final GtGenerator        Generator;
//	/*field*/public GtNameSpace	    NameSpace;
//
//	/*field*/public ArrayList<GtVariableInfo> LocalStackList;
//	/*field*/public int StackTopIndex;
//	/*field*/public GtFuncBlock	FuncBlock;
//	/*field*/public boolean FoundUncommonFunc;
	
	public GtTypeEnv/*constructor*/(GtNameSpace NameSpace) {
//		this.NameSpace = NameSpace;
//		this.Context   = NameSpace.Context;
//		this.Generator = NameSpace.Context.Generator;
//		this.FuncBlock = null;
//		this.FoundUncommonFunc = false;
//		this.LocalStackList = new ArrayList<GtVariableInfo>();
//		this.StackTopIndex = 0;
	}

//	public final boolean IsStrictMode() {
//		return this.Generator.IsStrictMode();
//	}
//
//	public final boolean IsTopLevel() {
//		return (this.FuncBlock == null);
//	}
//
//	public void AppendRecv(GtType RecvType) {
//		/*local*/String ThisName = this.Generator.GetRecvName();
//		this.AppendDeclaredVariable(0, RecvType, ThisName, null, null);
//		this.LocalStackList.get(this.StackTopIndex-1).NativeName = ThisName;
//	}
//
//	public GtVariableInfo AppendDeclaredVariable(int VarFlag, GtType Type, String Name, GtToken NameToken, Object InitValue) {
//		/*local*/GtVariableInfo VarInfo = new GtVariableInfo(this.FuncBlock, VarFlag, Type, Name, NameToken /*InitValue*/);
//		if(this.StackTopIndex < this.LocalStackList.size()) {
//			this.LocalStackList.set(this.StackTopIndex, VarInfo);
//		}
//		else {
//			this.LocalStackList.add(VarInfo);
//		}
//		this.StackTopIndex += 1;
//		return VarInfo;
//	}
//
//	public GtVariableInfo LookupDeclaredVariable(String Symbol) {
//		/*local*/int i = this.StackTopIndex - 1;
//		while(i >= 0) {
//			/*local*/GtVariableInfo VarInfo = this.LocalStackList.get(i);
//			if(VarInfo.Name.equals(Symbol)) {
//				return VarInfo;
//			}
//			i = i - 1;
//		}
//		return null;
//	}
//
//	public void PushBackStackIndex(int PushBackIndex) {
//		/*local*/int i = this.StackTopIndex - 1;
//		while(i >= PushBackIndex) {
//			/*local*/GtVariableInfo VarInfo = this.LocalStackList.get(i);
//			VarInfo.Check(this.Context);
//			i = i - 1;
//		}
//		this.StackTopIndex = PushBackIndex;
//	}
//	
//	public void CheckFunc(String FuncType, GtFunc Func, GtToken SourceToken) {
//		// FIXME
////		if(!this.FoundUncommonFunc && (!Func.Is(CommonFunc))) {
////			this.FoundUncommonFunc = true;
////			if(this.Func != null && this.Func.Is(CommonFunc)) {
////				this.NameSpace.Context.ReportError(GreenTeaConsts.WarningLevel, SourceToken, "using uncommon " + FuncType + ": " + Func.FuncName);
////			}
////		}
//	}
//
//	public final GtNode ReportTypeResult(GtSyntaxTree ParsedTree, GtNode Node, int Level, String Message) {
//		if(Level == ErrorLevel || (this.IsStrictMode() && Level == TypeErrorLevel)) {
//			LibZen.Assert(Node.Token == ParsedTree.KeyToken);
//			this.NameSpace.Context.ReportError_OLD(GreenTeaConsts.ErrorLevel, Node.Token, Message);
//			return this.Generator.CreateErrorNode(GtStaticTable.VoidType, ParsedTree);
//		}
//		else {
//			this.NameSpace.Context.ReportError_OLD(Level, Node.Token, Message);
//		}
//		return Node;
//	}
//
//	public final void ReportTypeInference(GtToken SourceToken, String Name, GtType InfferedType) {
//		this.Context.ReportError_OLD(GreenTeaConsts.InfoLevel, SourceToken, Name + " has type " + InfferedType);
//	}
//
//	public final GtNode CreateSyntaxErrorNode(GtSyntaxTree ParsedTree, String Message) {
//		this.NameSpace.Context.ReportError_OLD(GreenTeaConsts.ErrorLevel, ParsedTree.KeyToken, Message);
//		return this.Generator.CreateErrorNode(GtStaticTable.VoidType, ParsedTree);
//	}
//
//	public final GtNode UnsupportedTopLevelError(GtSyntaxTree ParsedTree) {
//		return this.CreateSyntaxErrorNode(ParsedTree, "unsupported " + ParsedTree.Pattern.PatternName + " at the top level");
//	}
//
//	public final GtNode CreateLocalNode(GtSyntaxTree ParsedTree, String Name) {
//		/*local*/GtVariableInfo VariableInfo = this.LookupDeclaredVariable(Name);
//		if(VariableInfo != null) {
//			return this.Generator.CreateGetLocalNode(VariableInfo.Type, ParsedTree, VariableInfo.NativeName);
//		}
//		return this.CreateSyntaxErrorNode(ParsedTree, "unresolved name: " + Name + "; not your fault");
//	}
//
//	public final GtNode CreateDefaultValue(GtSyntaxTree ParsedTree, GtType Type) {
//		return this.Generator.CreateConstNode_OLD(Type, ParsedTree, Type.DefaultNullValue);
//	}
//
//	public final GtNode TypeCheckSingleNode(GtSyntaxTree ParsedTree, GtNode Node, GtType Type, int TypeCheckPolicy) {
//		LibZen.Assert(Node != null);
//		if(Node.IsErrorNode() || IsFlag(TypeCheckPolicy, NoCheckPolicy)) {
//			return Node;
//		}
//		if(Node.Type.IsUnrevealedType()) {
//			/*local*/GtFunc Func = ParsedTree.NameSpace.GetConverterFunc(Node.Type, Node.Type.BaseType, true);
//			Node = this.Generator.CreateCoercionNode(Func.GetReturnType(), ParsedTree.NameSpace, Func, Node);
//		}
//		//System.err.println("**** " + Node.getClass());
//		/*local*/Object ConstValue = Node.ToConstValue(this.Context, IsFlag(TypeCheckPolicy, OnlyConstPolicy));
//		if(ConstValue != null && !(Node.IsConstNode())) {  // recreated
//			Node = this.Generator.CreateConstNode_OLD(Node.Type, ParsedTree, ConstValue);
//		}
//		if(IsFlag(TypeCheckPolicy, OnlyConstPolicy) && ConstValue == null) {
//			if(IsFlag(TypeCheckPolicy, NullablePolicy) && Node.IsNullNode()) { // OK
//			}
//			else {
//				return this.CreateSyntaxErrorNode(ParsedTree, "value must be const");
//			}
//		}
//		if(IsFlag(TypeCheckPolicy, AllowVoidPolicy) || Type.IsVoidType()) {
//			return Node;
//		}
//		if(Node.Type.IsVarType()) {
//			return this.ReportTypeResult(ParsedTree, Node, TypeErrorLevel, "unspecified type: " + Node.Token.ParsedText);
//		}
//		if(Node.Type == Type || Type.IsVarType() || Type.Accept(Node.Type)) {
//			return Node;
//		}
//		/*local*/GtFunc Func1 = ParsedTree.NameSpace.GetConverterFunc(Node.Type, Type, true);
//		if(Func1 != null && (Func1.Is(CoercionFunc) || IsFlag(TypeCheckPolicy, CastPolicy))) {
//			return this.Generator.CreateCoercionNode(Type, ParsedTree.NameSpace, Func1, Node);
//		}
//		
//		//System.err.println("node="+ LibZen.GetClassName(Node) + "type error: requested = " + Type + ", given = " + Node.Type);
//		return this.ReportTypeResult(ParsedTree, Node, TypeErrorLevel, "type error: requested = " + Type + ", given = " + Node.Type);
//	}
//
//	public GtNode ParseTypedNode(String Text, long FileLine, GtType ContextType) {
//		/*local*/GtNameSpace NameSpace = this.NameSpace;
//		/*local*/GtTokenContext LocalContext = new GtTokenContext(NameSpace, Text, FileLine);
//		/*local*/GtSyntaxTree ParsedTree = LocalContext.ParsePattern_OLD(NameSpace, "$Expression$", Required);
//		return GreenTeaUtils.TypeBlock(this, ParsedTree, ContextType);
//	}
}
