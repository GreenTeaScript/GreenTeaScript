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
package zen.parser;

import zen.ast.GtNode;
//endif VAJA

public abstract class GtGenerator extends GtNodeUtils implements GtVisitor {
	/*field*/public final String       TargetCode;
	/*field*/public final String       TargetVersion;
	
	/*field*/public final GtNameSpace  RootNameSpace;
//	/*field*/public ArrayList<Object>  GeneratedCodeStack;
	/*field*/public String             OutputFile;
	/*field*/public GtLogger    Logger;
//	/*field*/public int                GeneratorFlag;

	/*field*/public final GtStatistics Stat;
	//	/*filed*/private boolean           NoErrorReport;

	protected GtGenerator/*constructor*/(String TargetCode, String TargetVersion) {
		super();
		this.RootNameSpace = new GtNameSpace(this, null);
		this.TargetCode = TargetCode;
		this.TargetVersion = TargetVersion;
		
		this.OutputFile = null;
		this.Logger = new GtLogger();
		this.Stat = new GtStatistics();
//		this.GeneratedCodeStack = null;
	}

	public final String ReportError(int Level, GtToken Token, String Message) {
		return this.Logger.ReportError(Level, Token, Message);
	}

	public void TypeCheck(GtNameSpace NameSpace, GtNode Node, GtType ContextType) {
		Node.Accept(this);		
	}

	public Object EvalTopLevelNode(GtNode TopLevelNode) {
		return TopLevelNode.Eval(this.RootNameSpace, true);
	}
	
	/* language constructor */

//	public void OpenClassField(GtSyntaxTree ParsedTree, GtType DefinedType, GtClassField ClassField) {
//		/*extension*/
//	}
//
//	public void CloseClassField(GtType DefinedType, ArrayList<GtFunc> MemberList) {
//		/*extension*/
//	}
//
//	public GtFunc CreateFunc(int FuncFlag, String FuncName, int BaseIndex, ArrayList<GtType> TypeList) {
//		return new GtFunc(FuncFlag, FuncName, BaseIndex, TypeList);
//	}
//
//	public void GenerateFunc(GtFunc Func, ArrayList<String> ParamNameList, GtNode Body) {
//		/*extenstion*/
//	}
//
//	public void SyncCodeGeneration() {
//		/*extension*/
//	}

//	public final void StopVisitor(GtNode Node) {
//		Node.NextNode = null;
//	}
//
//	public final boolean IsEmptyBlock(GtNode Node) {
//		return (Node == null) || ((Node instanceof GtEmptyNode) && (Node.NextNode == null));
//	}
//
//	public final GtForNode FindParentForNode(GtNode Node) {
//		/*local*/GtNode Parent = Node.ParentNode;
//		while(Parent != null) {
//			if(Parent instanceof GtForNode) {
//				return (/*cast*/GtForNode)Parent;
//			}
//			if(Parent.ParentNode == null) {
//				Parent = Parent.MoveHeadNode();
//			}
//			Parent = Parent.ParentNode;
//		}
//		return null;
//	}

	//------------------------------------------------------------------------

//	@Override
//	public void VisitBlockNode(GtEmptyNode Node) {
//		LibZen.DebugP("empty node: " + Node.Token.ParsedText);
//		/*extension*/
//	}
//
//	@Override
//	public void VisitNullNode(GtNullNode Node) {
//		if(GreenTeaConsts.DebugVisitor) { throw new RuntimeException("not implemented"); }
//	}
//
//	@Override
//	public void VisitBooleanNode(GtBooleanNode Node) {
//		if(GreenTeaConsts.DebugVisitor) { throw new RuntimeException("not implemented"); }
//	}
//
//	@Override
//	public void VisitIntNode(GtIntNode Node) {
//		if(GreenTeaConsts.DebugVisitor) { throw new RuntimeException("not implemented"); }
//	}
//
//	@Override
//	public void VisitFloatNode(GtFloatNode Node) {
//		if(GreenTeaConsts.DebugVisitor) { throw new RuntimeException("not implemented"); }
//	}
//
//	@Override
//	public void VisitStringNode(GtStringNode Node) {
//		if(GreenTeaConsts.DebugVisitor) { throw new RuntimeException("not implemented"); }
//	}
//
//	@Override
//	public void VisitRegexNode(GtRegexNode Node) {
//		if(GreenTeaConsts.DebugVisitor) { throw new RuntimeException("not implemented"); }
//	}
//
//	@Override
//	public void VisitConstPoolNode(GtConstPoolNode Node) {
//		if(GreenTeaConsts.DebugVisitor) { throw new RuntimeException("not implemented"); }
//	}
//
//	@Override
//	public void VisitArrayLiteralNode(GtArrayLiteralNode Node) {
//		if(GreenTeaConsts.DebugVisitor) { throw new RuntimeException("not implemented"); }
//	}
//
//	@Override
//	public void VisitMapLiteralNode(GtMapLiteralNode Node) {
//		if(GreenTeaConsts.DebugVisitor) { throw new RuntimeException("not implemented"); }
//	}
//
//	@Override
//	public void VisitParamNode(GtParamNode Node) {
//		if(GreenTeaConsts.DebugVisitor) { throw new RuntimeException("not implemented"); }
//	}
//
//	@Override
//	public void VisitFunctionLiteralNode(GtFunctionLiteralNode Node) {
//		if(GreenTeaConsts.DebugVisitor) { throw new RuntimeException("not implemented"); }
//	}
//
//	@Override
//	public void VisitGetLocalNode(GtGetLocalNode Node) {
//		if(GreenTeaConsts.DebugVisitor) { throw new RuntimeException("not implemented"); }
//	}
//
//	@Override
//	public void VisitSetLocalNode(GtSetLocalNode Node) {
//		if(GreenTeaConsts.DebugVisitor) { throw new RuntimeException("not implemented"); }
//	}
//
//	@Override
//	public void VisitGetCapturedNode(GtGetCapturedNode Node) {
//		if(GreenTeaConsts.DebugVisitor) { throw new RuntimeException("not implemented"); }
//	}
//
//	@Override
//	public void VisitSetCapturedNode(GtSetCapturedNode Node) {
//		if(GreenTeaConsts.DebugVisitor) { throw new RuntimeException("not implemented"); }
//	}
//
//	@Override
//	public void VisitGetterNode(GtGetterNode Node) {
//		if(GreenTeaConsts.DebugVisitor) { throw new RuntimeException("not implemented"); }
//	}
//
//	@Override
//	public void VisitSetterNode(GtSetterNode Node) {
//		if(GreenTeaConsts.DebugVisitor) { throw new RuntimeException("not implemented"); }
//	}
//
//	@Override
//	public void VisitMethodCallNode(GtMethodCall Node) {
//		if(GreenTeaConsts.DebugVisitor) { throw new RuntimeException("not implemented"); }
//	}
//
//	@Override
//	public void VisitApplyNode(GtApplyNode Node) {
//		if(GreenTeaConsts.DebugVisitor) { throw new RuntimeException("not implemented"); }
//	}
//
//	@Override
//	public void VisitApplyOverridedMethodNode(GtApplyOverridedMethodNode Node) {
//		if(GreenTeaConsts.DebugVisitor) { throw new RuntimeException("not implemented"); }
//	}
//
//	@Override
//	public void VisitGetIndexNode(GtGetIndexNode Node) {
//		if(GreenTeaConsts.DebugVisitor) { throw new RuntimeException("not implemented"); }
//	}
//
//	@Override
//	public void VisitSetIndexNode(GtSetIndexNode Node) {
//		if(GreenTeaConsts.DebugVisitor) { throw new RuntimeException("not implemented"); }
//	}
//
//	@Override
//	public void VisitSliceNode(GtSliceNode Node) {
//		if(GreenTeaConsts.DebugVisitor) { throw new RuntimeException("not implemented"); }
//	}
//
//	@Override
//	public void VisitAndNode(GtAndNode Node) {
//		if(GreenTeaConsts.DebugVisitor) { throw new RuntimeException("not implemented"); }
//	}
//
//	@Override
//	public void VisitOrNode(GtOrNode Node) {
//		if(GreenTeaConsts.DebugVisitor) { throw new RuntimeException("not implemented"); }
//	}
//
//	@Override
//	public void VisitUnaryNode(GtUnaryNode Node) {
//		if(GreenTeaConsts.DebugVisitor) { throw new RuntimeException("not implemented"); }
//	}
//
//	@Override
//	public void VisitPrefixInclNode(GtPrefixInclNode Node) {
//		if(GreenTeaConsts.DebugVisitor) { throw new RuntimeException("not implemented"); }
//	}
//
//	@Override
//	public void VisitPrefixDeclNode(GtPrefixDeclNode Node) {
//		if(GreenTeaConsts.DebugVisitor) { throw new RuntimeException("not implemented"); }
//	}
//
//	@Override
//	public void VisitSuffixInclNode(GtSuffixInclNode Node) {
//		if(GreenTeaConsts.DebugVisitor) { throw new RuntimeException("not implemented"); }
//	}
//
//	@Override
//	public void VisitSuffixDeclNode(GtSuffixDeclNode Node) {
//		if(GreenTeaConsts.DebugVisitor) { throw new RuntimeException("not implemented"); }
//	}
//
//	@Override
//	public void VisitBinaryNode(GtBinaryNode Node) {
//		if(GreenTeaConsts.DebugVisitor) { throw new RuntimeException("not implemented"); }
//	}
//
//	@Override
//	public void VisitTrinaryNode(GtTrinaryNode Node) {
//		if(GreenTeaConsts.DebugVisitor) { throw new RuntimeException("not implemented"); }
//	}
//
//	@Override
//	public void VisitConstructorNode(GtConstructorNode Node) {
//		if(GreenTeaConsts.DebugVisitor) { throw new RuntimeException("not implemented"); }
//	}
//
//	@Override
//	public void VisitAllocateNode(GtAllocateNode Node) {
//		if(GreenTeaConsts.DebugVisitor) { throw new RuntimeException("not implemented"); }
//	}
//
//	@Override
//	public void VisitNewArrayNode(GtNewArrayNode Node) {
//		if(GreenTeaConsts.DebugVisitor) { throw new RuntimeException("not implemented"); }
//	}
//
//	@Override
//	public void VisitInstanceOfNode(GtInstanceOfNode Node) {
//		if(GreenTeaConsts.DebugVisitor) { throw new RuntimeException("not implemented"); }
//	}
//
//	@Override
//	public void VisitCastNode(GtCastNode Node) {
//		if(GreenTeaConsts.DebugVisitor) { throw new RuntimeException("not implemented"); }
//	}
//
//	@Override
//	public void VisitVarDeclNode(GtVarDeclNode Node) {
//		if(GreenTeaConsts.DebugVisitor) { throw new RuntimeException("not implemented"); }
//	}
//
//	@Override
//	public void VisitUsingNode(GtUsingNode Node) {
//		if(GreenTeaConsts.DebugVisitor) { throw new RuntimeException("not implemented"); }
//	}
//
//	@Override
//	public void VisitIfNode(GtIfNode Node) {
//		if(GreenTeaConsts.DebugVisitor) { throw new RuntimeException("not implemented"); }
//	}
//
//	@Override
//	public void VisitWhileNode(GtWhileNode Node) {
//		if(GreenTeaConsts.DebugVisitor) { throw new RuntimeException("not implemented"); }
//	}
//
//	@Override
//	public void VisitDoWhileNode(GtDoWhileNode Node) {
//		if(GreenTeaConsts.DebugVisitor) { throw new RuntimeException("not implemented"); }
//	}
//
//	@Override
//	public void VisitForNode(GtForNode Node) {
//		if(GreenTeaConsts.DebugVisitor) { throw new RuntimeException("not implemented"); }
//	}
//
//	@Override
//	public void VisitForEachNode(GtForEachNode Node) {
//		if(GreenTeaConsts.DebugVisitor) { throw new RuntimeException("not implemented"); }
//	}
//
//	@Override
//	public void VisitContinueNode(GtContinueNode Node) {
//		if(GreenTeaConsts.DebugVisitor) { throw new RuntimeException("not implemented"); }
//	}
//
//	@Override
//	public void VisitBreakNode(GtBreakNode Node) {
//		if(GreenTeaConsts.DebugVisitor) { throw new RuntimeException("not implemented"); }
//	}
//
//	@Override
//	public void VisitStatementNode(GtStatementNode Node) {
//		if(GreenTeaConsts.DebugVisitor) { throw new RuntimeException("not implemented"); }
//	}
//
//	@Override
//	public void VisitReturnNode(GtReturnNode Node) {
//		if(GreenTeaConsts.DebugVisitor) { throw new RuntimeException("not implemented"); }
//	}
//
//	@Override
//	public void VisitYieldNode(GtYieldNode Node) {
//		if(GreenTeaConsts.DebugVisitor) { throw new RuntimeException("not implemented"); }
//	}
//
//	@Override
//	public void VisitThrowNode(GtThrowNode Node) {
//		if(GreenTeaConsts.DebugVisitor) { throw new RuntimeException("not implemented"); }
//	}
//
//	@Override
//	public void VisitTryNode(GtTryNode Node) {
//		if(GreenTeaConsts.DebugVisitor) { throw new RuntimeException("not implemented"); }
//	}
//
//	@Override
//	public void VisitCatchNode(GtCatchNode Node) {
//		if(GreenTeaConsts.DebugVisitor) { throw new RuntimeException("not implemented"); }
//	}
//
//	@Override
//	public void VisitSwitchNode(GtSwitchNode Node) {
//		if(GreenTeaConsts.DebugVisitor) { throw new RuntimeException("not implemented"); }
//	}
//
//	@Override
//	public void VisitCaseNode(GtCaseNode Node) {
//		if(GreenTeaConsts.DebugVisitor) { throw new RuntimeException("not implemented"); }
//	}
//
//	@Override
//	public void VisitCommandNode(GtCommandNode Node) {
//		if(GreenTeaConsts.DebugVisitor) { throw new RuntimeException("not implemented"); }
//	}
//
//	@Override
//	public void VisitErrorNode(GtErrorNode Node) {
//		if(GreenTeaConsts.DebugVisitor) { throw new RuntimeException("not implemented"); }
//	}
//
//	@Override
//	public void VisitClassDeclNode(GtClassDeclNode ClassDeclNode) {
//		// TODO Auto-generated method stub
//	}
//
//	@Override
//	public void VisitFuncDeclNode(GtFuncDeclNode FuncDeclNode) {
//		// TODO Auto-generated method stub
//	}
//
//	@Override
//	public void VisitBlock(GtNode Node) {
//		/*local*/GtNode CurrentNode = Node;
//		while(CurrentNode != null) {
//			CurrentNode.Accept(this);
//			CurrentNode = CurrentNode.NextNode;
//		}
//	}
//
//	// This must be extended in each language
//
//	public boolean IsStrictMode() {
//		return true; /* override this in dynamic languages */
//	}
//
//	public String GetSourceCode() {
//		return null;
//		/*extension*/
//	}
//
//	public void FlushBuffer() {
//		/*extension*/
//	}
//
//	public String BlockComment(String Comment) {
//		return "/*" + Comment + "*/";
//	}
//
//	protected void PushCode(Object Code) {
//		this.GeneratedCodeStack.add(Code);
//	}
//
//	protected final Object PopCode() {
//		/*local*/int Size = this.GeneratedCodeStack.size();
//		if(Size > 0) {
//			/*local*/Object content = this.GeneratedCodeStack.get(Size - 1);
//			this.GeneratedCodeStack.remove(Size - 1);
//			return content;
//		}
//		return "";
//	}
//
//	public String GetRecvName() {
//		return "this";  // default
//	}
//
//	public void InvokeMainFunc(String MainFuncName) {
//		/*extension*/
//	}
}

//
//	private Object[] MakeArguments(Object RecvObject, ArrayList<GtNode> ParamList, boolean EnforceConst) {
//		/*local*/int StartIdx = 0;
//		/*local*/int Size = LibZen.ListSize(ParamList);
//		/*local*/Object[] Values = new Object[RecvObject == null ? Size : Size + 1];
//		if(RecvObject != null) {
//			Values[0] = RecvObject;
//			StartIdx = 1;
//		}
//		/*local*/int i = 0;
//		while(i < Size) {
//			/*local*/GtNode Node = ParamList.get(i);
//			if(Node.IsNullNode()) {
//				Values[StartIdx + i] = null;
//			}
//			else {
//				/*local*/Object Value = Node.ToConstValue(this.Context, EnforceConst);
//				if(Value == null) {
//					return null;
//				}
//				Values[StartIdx + i] = Value;
//			}
//			i += 1;
//		}
//		return Values;
//	}
//
//	// EnforceConst :
//
//	public Object EvalAllocateNode(GtAllocateNode Node, boolean EnforceConst) {
////ifdef JAVA  this is for JavaByteCodeGenerator and JavaSourceGenerator
//		if(EnforceConst && Node.Type.TypeBody instanceof Class<?>) {
//			Class<?> NativeClass = (/*cast*/Class<?>)Node.Type.TypeBody;
//			try {
//				Constructor<?> NativeConstructor = NativeClass.getConstructor(GtType.class);
//				return NativeConstructor.newInstance(Node.Type);
//			} catch (Exception e) {
//				LibZen.VerboseException(e);
//			}
//		}
////endif VAJA
//		return Node.ToNullValue(this.Context, EnforceConst);  // if unsupported
//	}
//
//	public Object EvalConstructorNode(GtConstructorNode Node, boolean EnforceConst) {
////ifdef JAVA  this is for JavaByteCodeGenerator and JavaSourceGenerator
//		if(EnforceConst && Node.Type.TypeBody instanceof Class<?>) {
//			try {
//				Constructor<?> NativeConstructor = (Constructor<?>)Node.Func.FuncBody;
//				Object[] Arguments = new Object[Node.ParamList.size()];
//				for(int i = 0; i < Arguments.length; i++) {
//					GtNode ArgNode = Node.ParamList.get(i);
//					Arguments[i] = ArgNode.ToConstValue(this.Context, EnforceConst);
//					if(Arguments[i] == null && !ArgNode.IsNullNode()) {
//						return null;
//					}
//					//System.err.println("@@@@ " + i + ", " + Arguments[i] + ", " + Arguments[i].getClass());
//				}
//				return NativeConstructor.newInstance(Arguments);
//			} catch (Exception e) {
//				LibZen.VerboseException(e);
//			}
//		}
//		//endif VAJA
//		return Node.ToNullValue(this.Context, EnforceConst);  // if unsupported
//	}
//
////	public Object EvalApplyNode(GtApplyNode Node, boolean EnforceConst) {
//////ifdef JAVA  this is for JavaByteCodeGenerator and JavaSourceGenerator
////		//System.err.println("@@@@ " + (Node.Func.NativeRef.getClass()));
////		if(Node.Func != null && (EnforceConst || Node.Func.Is(ConstFunc)) && Node.Func.FuncBody instanceof Method) {
////			Object RecvObject = null;
////			int StartIndex = 1;
////			if(Node.Func.Is(NativeMethodFunc)  && Node.NodeList.size() > 1) {
////				RecvObject = Node.NodeList.get(1).ToConstValue(this.Context, EnforceConst);
////				if(RecvObject == null) {
////					return null;
////				}
////				StartIndex = 2;
////			}
////			Object[] Arguments = new Object[Node.NodeList.size() - StartIndex];
////			for(int i = 0; i < Arguments.length; i++) {
////				GtNode ArgNode = Node.NodeList.get(StartIndex+i);
////				Arguments[i] = ArgNode.ToConstValue(this.Context, EnforceConst);
////				if(Arguments[i] == null && !ArgNode.IsNullNode()) {
////					return null;
////				}
////				//System.err.println("@@@@ " + i + ", " + Arguments[i] + ", " + Arguments[i].getClass());
////			}
////			return LibNative.ApplyMethod(Node.Func, RecvObject, Arguments);
////		}
//////endif VAJA
////		return Node.ToNullValue(this.Context, EnforceConst);  // if unsupported
////	}
//
//	public Object EvalArrayNode(GtArrayLiteralNode Node, boolean EnforceConst) {
//		/*local*/Object ArrayObject = null;
////ifdef JAVA  this is for JavaByteCodeGenerator and JavaSourceGenerator
//		Object Values[] = new Object[LibZen.ListSize(Node.NodeList)];
//		for(int i = 0; i < LibZen.ListSize(Node.NodeList); i++) {
//			Object Value = Node.NodeList.get(i).ToConstValue(this.Context, EnforceConst);
//			if(Value == null) {
//				return Value;
//			}
//			Values[i] = Value;
//		}
//		ArrayObject = LibZen.NewNewArray(Node.Type, Values);
////endif VAJA
//		return ArrayObject;  // if unsupported
//	}
//	public Object EvalNewArrayNode(GtNewArrayNode Node, boolean EnforceConst) {
//		/*local*/Object ArrayObject = null;
////ifdef JAVA  this is for JavaByteCodeGenerator and JavaSourceGenerator
//		Object Values[] = new Object[LibZen.ListSize(Node.NodeList)];
//		for(int i = 0; i < LibZen.ListSize(Node.NodeList); i++) {
//			Object Value = Node.NodeList.get(i).ToConstValue(this.Context, EnforceConst);
//			if(Value == null) {
//				return Value;
//			}
//			Values[i] = Value;
//		}
//		ArrayObject = LibZen.NewArray(Node.Type, Values);
////endif VAJA
//		return ArrayObject;  // if unsupported
//	}
//
//	public Object EvalGetterNode(GtGetterNode Node, boolean EnforceConst) {
////ifdef JAVA  this is for JavaByteCodeGenerator and JavaSourceGenerator
//		//System.err.println("** Node.Func = " + Node.Func);
//		if(Node.ResolvedFunc != null) {
//			Object Value = Node.RecvNode.ToConstValue(this.Context, EnforceConst);
//			if(Value == null) {
//				return Value;
//			}
//			//System.err.println("** Node.Func = " + Node.Func.FuncBody.getClass());
//			if(Node.ResolvedFunc.FuncBody instanceof Field) {
//				Value = LibNative.GetNativeFieldValue(Value, (/*cast*/Field)Node.ResolvedFunc.FuncBody);
//				return Value;
//			}
////			if(Node.Func.FuncBody instanceof Method) {
////				return LibNative.ApplyMethod1(Node.Func, null, Value);
////			}
//		}
////endif VAJA
//		return Node.ToNullValue(this.Context, EnforceConst); // if unsupported
//	}
//
//	public Object EvalSetterNode(GtSetterNode Node, boolean EnforceConst) {
////ifdef JAVA  this is for JavaByteCodeGenerator and JavaSourceGenerator
//		if(Node.ResolvedFunc != null && EnforceConst) {
//			Object LeftValue = Node.RecvNode.ToConstValue(this.Context, EnforceConst);
//			if(LeftValue == null) {
//				return LeftValue;
//			}
//			Object RightValue = Node.ValueNode.ToConstValue(this.Context, EnforceConst);
//			if(RightValue == null && !Node.ValueNode.IsNullNode()) {
//				return RightValue;
//			}
//			if(Node.ResolvedFunc.FuncBody instanceof Field) {
//				return LibZen.NativeFieldSetter(LeftValue, (/*cast*/Field)Node.ResolvedFunc.FuncBody, RightValue);
//			}
////			if(Node.Func.FuncBody instanceof Method) {
////				return LibNative.ApplyMethod2(Node.Func, null, LeftValue, RightValue);
////			}
//		}
////endif VAJA
//		return Node.ToNullValue(this.Context, EnforceConst); // if unsupported
//	}
//
//	public Object EvalCommandNode(GtCommandNode Node, boolean EnforceConst) {
////ifdef JAVA  this is for JavaByteCodeGenerator and JavaSourceGenerator
//		if(!EnforceConst) {
//			return null;
//		}
//		/*local*/ArrayList<String[]> ArgsBuffer = new ArrayList<String[]>();
//		/*local*/GtType Type = Node.Type;
//		/*local*/GtCommandNode CurrentNode = Node;
//		while(CurrentNode != null) {
//			/*local*/int ParamSize = LibZen.ListSize(CurrentNode.ArgumentList);
//			/*local*/String[] Buffer = new String[ParamSize];
//			for(int i =0; i < ParamSize; i++) {
//				/*local*/Object Value = CurrentNode.ArgumentList.get(i).ToConstValue(this.Context, EnforceConst);
//				if(!(Value instanceof String)) {
//					return null;
//				}
//				Buffer[i] = (/*cast*/String)Value;
//			}
//			ArgsBuffer.add(Buffer);
//			CurrentNode = (/*cast*/GtCommandNode) CurrentNode.PipedNextNode;
//		}
//
//		/*local*/int NodeSize = LibZen.ListSize(ArgsBuffer);
//		/*local*/String[][] Args = new String[NodeSize][];
//		for(int i = 0; i < NodeSize; i++) {
//			/*local*/String[] Buffer = ArgsBuffer.get(i);
//			/*local*/int CommandSize = Buffer.length;
//			Args[i] = new String[CommandSize];
//			for(int j = 0; j < CommandSize; j++) {
//				Args[i][j] = Buffer[j];
//			}
//		}
//		if(Type.IsStringType()) {
//			return DShellProcess.ExecCommandString(Args);
//		}
//		else if(Type.IsBooleanType()) {
//			return DShellProcess.ExecCommandBool(Args);
//		}
//		else if(LibZen.EqualsString(Type.toString(), "Task")) {
//			return DShellProcess.ExecCommandTask(Args);
//		}
//		else {
//			DShellProcess.ExecCommandVoid(Args);
//		}
////endif VAJA
//		return null;
//	}
//
//	public Object EvalApplySymbolNode(GtApplyNode ApplyNode, boolean EnforceConst) {
//		if((EnforceConst || ApplyNode.ResolvedFunc.Is(ConstFunc)) /*&& ApplyNode.Func.FuncBody instanceof Method */) {
//			/*local*/Object[] Arguments = this.MakeArguments(null, ApplyNode.ParamList, EnforceConst);
//			if(Arguments != null) {
//				return LibZen.InvokeFunc(ApplyNode.ResolvedFunc, Arguments);
//			}
//		}
//		return null;
//	}
//
//	public Object EvalApplyOverridedMethodNode(GtApplyOverridedMethodNode ApplyNode, boolean EnforceConst) {
//		if((EnforceConst || ApplyNode.Func.Is(ConstFunc))) {
//			/*local*/Object[] Arguments = this.MakeArguments(null, ApplyNode.ParamList, EnforceConst);
//			if(Arguments != null) {
//				return LibZen.InvokeOverridedMethod(0, ApplyNode.NameSpace, ApplyNode.Func, Arguments);
//			}
//		}
//		return null;
//	}
//
//	public Object EvalApplyFuncionObjectNode(GtMethodNode ApplyNode, boolean EnforceConst) {
//		/*local*/GtFunc Func = (/*cast*/GtFunc)ApplyNode.FuncNode.ToConstValue(this.Context, EnforceConst);
//		if(Func != null) {
//			/*local*/Object[] Arguments = this.MakeArguments(null, ApplyNode.ParamList, EnforceConst);
//			if(Arguments != null) {
//				return LibZen.InvokeFunc(Func, Arguments);
//			}
//		}
//		return null;
//	}


//	public Object EvalApplyDynamicFuncNode(GtApplyDynamicFuncNode ApplyNode, boolean EnforceConst) {
//		/*local*/Object[] Arguments = this.MakeArguments(null, ApplyNode.ParamList, EnforceConst);
//		if(Arguments != null) {
//			return LibZen.InvokeDynamicFunc(0, ApplyNode.Type, ApplyNode.NameSpace, ApplyNode.FuncName, Arguments);
//		}
//		return null;
//	}
//
//	public Object EvalApplyDynamicMethodNode(GtApplyDynamicMethodNode ApplyNode, boolean EnforceConst) {
//		/*local*/Object[] Arguments = this.MakeArguments(null, ApplyNode.ParamList, EnforceConst);
//		if(Arguments != null) {
//			return LibZen.InvokeDynamicMethod(0, ApplyNode.Type, ApplyNode.NameSpace, ApplyNode.FuncName, Arguments);
//		}
//		return null;
//	}
//
//	@Deprecated
//	public Object EvalDyGetterNode(GtDyGetterNode GetterNode, boolean EnforceConst) {
//		/*local*/Object RecvObject = GetterNode.RecvNode.ToConstValue(this.Context, EnforceConst);
//		if(RecvObject != null) {
//			/*local*/Object Value = LibZen.DynamicGetter(RecvObject, GetterNode.FieldName);
//			return LibZen.DynamicCast(GetterNode.Type, Value);
//		}
//		return null;
//	}
//
//	@Deprecated
//	public Object EvalDySetterNode(GtDySetterNode SetterNode, boolean EnforceConst) {
//		/*local*/Object RecvObject = SetterNode.RecvNode.ToConstValue(this.Context, EnforceConst);
//		if(RecvObject != null) {
//			/*local*/Object Value = SetterNode.ValueNode.ToConstValue(this.Context, EnforceConst);
//			if(Value != null || SetterNode.ValueNode.IsNullNode()) {
//				return LibZen.DynamicSetter(RecvObject, SetterNode.FieldName, Value);
//			}
//		}
//		return null;
//	}

