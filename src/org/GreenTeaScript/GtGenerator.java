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
import java.lang.reflect.Constructor;
import java.lang.reflect.Field;
import java.lang.reflect.Method;
import java.util.ArrayList;
import org.GreenTeaScript.DShell.DShellProcess;
//endif VAJA

public class GtGenerator extends GreenTeaUtils {
	/*field*/public final String      TargetCode;
	/*field*/public GtParserContext    Context;
	/*field*/public ArrayList<Object> GeneratedCodeStack;
	/*field*/public String OutputFile;
	/*field*/public int GeneratorFlag;

	GtGenerator/*constructor*/(String TargetCode, String OutputFile, int GeneratorFlag) {
		this.TargetCode = TargetCode;
		this.OutputFile = OutputFile;
		this.GeneratorFlag = GeneratorFlag;
		this.Context = null;
		this.GeneratedCodeStack = null;
	}

	public void InitContext(GtParserContext Context) {
		this.Context = Context;
		this.GeneratedCodeStack = new ArrayList<Object>();
		Context.RootNameSpace.LoadRequiredLib("common");
	}

	public final GtNode CreateUnsupportedNode(GtType Type, GtSyntaxTree ParsedTree) {
		/*local*/GtToken Token = ParsedTree.KeyToken;
		this.Context.ReportError(ErrorLevel, Token, this.TargetCode + " has no language support for " + Token.ParsedText);
		return new GtErrorNode(GtStaticTable.VoidType, ParsedTree.KeyToken);
	}

	public GtNode CreateConstNode(GtType Type, GtSyntaxTree ParsedTree, Object Value) {
		if(Type.IsVarType()) {
			Type = GtStaticTable.GuessType(Value);
		}
		return new GtConstNode(Type, ParsedTree != null ? ParsedTree.KeyToken : GtTokenContext.NullToken, Value);
	}

	public GtNode CreateNullNode(GtType Type, GtSyntaxTree ParsedTree) {
		return new GtNullNode(Type, ParsedTree.KeyToken);
	}
	public GtNode CreateArrayNode(GtType ArrayType, GtSyntaxTree ParsedTree) {
		return new GtArrayNode(ArrayType, ParsedTree.KeyToken);
	}
	public GtNode CreateNewArrayNode(GtType ArrayType, GtSyntaxTree ParsedTree) {
		return new GtNewArrayNode(ArrayType, ParsedTree.KeyToken);
	}
	public GtNode CreateLocalNode(GtType Type, GtSyntaxTree ParsedTree, String LocalName) {
		return new GtLocalNode(Type, ParsedTree.KeyToken, LocalName);
	}
	public GtNode CreateGetterNode(GtType Type, GtSyntaxTree ParsedTree, GtFunc Func, GtNode Expr) {
		return new GtGetterNode(Type, ParsedTree.KeyToken, Func, Expr);
	}
	public GtNode CreateDyGetterNode(GtType Type, GtSyntaxTree ParsedTree, GtNode Expr, String FieldName) {
		if(Type.IsVarType()) {
			Type = GtStaticTable.AnyType;
		}
		return new GtDyGetterNode(Type, ParsedTree.KeyToken, Expr, ParsedTree.NameSpace, FieldName);
	}
	public GtNode CreateSetterNode(GtType Type, GtSyntaxTree ParsedTree, GtFunc Func, GtNode Left, GtNode Right) {
		return new GtSetterNode(Type, ParsedTree.KeyToken, Func, Left, Right);
	}
	public GtNode CreateDySetterNode(GtType Type, GtSyntaxTree ParsedTree, GtNode Left, String Name, GtNode Right) {
		return new GtDySetterNode(Type, ParsedTree.KeyToken, Left, ParsedTree.NameSpace, Name, Right);
	}
	public GtNode CreateIndexerNode(GtType Type, GtSyntaxTree ParsedTree, GtFunc Func, GtNode Expr) {
		return new GtIndexerNode(Type, ParsedTree.KeyToken, Func, Expr);
	}
	@Deprecated public GtNode CreateApplyNode(GtType Type, GtSyntaxTree ParsedTree, GtFunc Func) {
		return new GtApplyNode(Type, ParsedTree == null ? GtTokenContext.NullToken : ParsedTree.KeyToken, Func);
	}
	public GtNode CreateStaticApplyNode(GtType Type, GtSyntaxTree ParsedTree, GtFunc Func) {
		return new GtStaticApplyNode(Type, ParsedTree == null ? GtTokenContext.NullToken : ParsedTree.KeyToken, Func);
	}
	public final GtNode CreateCoercionNode(GtType Type, GtNameSpace NameSpace, GtFunc Func, GtNode Node) {
		/*local*/GtNode ApplyNode = this.CreateStaticApplyNode(Type, null, Func);
		ApplyNode.Append(Node);
//		if(Func.GetFuncParamSize() > 1) {
//			ApplyNode.AutoParam(Func.GetFuncParamType(1), NameSpace);
//		}
		return ApplyNode;
	}
	public GtNode CreateApplyFuncNode(GtType Type, GtSyntaxTree ParsedTree, GtNode FuncNode) {
		return new GtApplyFuncNode(Type, ParsedTree.KeyToken, FuncNode);
	}
	public GtNode CreateApplyMethodNode(GtType Type, GtSyntaxTree ParsedTree, GtNode RecvNode, GtFunc Func) {
		if(Func.Is(VirtualFunc)) {
			return new GtApplyOverridedMethodNode(Type, ParsedTree.KeyToken, ParsedTree.NameSpace.Minimum(), Func);
		}
		else {
			return new GtStaticApplyNode(Type, ParsedTree.KeyToken, Func);
		}
	}
	public GtNode CreateApplyDynamicMethodNode(GtType Type, GtSyntaxTree ParsedTree, String Name) {
		if(Type.IsVarType()) {
			Type = GtStaticTable.AnyType;
		}
		return new GtApplyDynamicMethodNode(Type, ParsedTree.KeyToken, ParsedTree.NameSpace.Minimum(), Name);
	}
	public GtNode CreateNewNode(GtType Type, GtSyntaxTree ParsedTree) {
		return new GtNewNode(Type, ParsedTree.KeyToken);
	}
	public GtNode CreateConstructorNode(GtType Type, GtSyntaxTree ParsedTree, GtFunc Func, ArrayList<GtNode> NodeList) {
		/*local*/GtConstructorNode Node = new GtConstructorNode(Type, ParsedTree.KeyToken, Func);
		if(NodeList != null) {
			Node.AppendNodeList(0, NodeList);
		}
		return Node;
	}
	public GtNode CreateUnaryNode(GtType Type, GtSyntaxTree ParsedTree, GtFunc Func, GtNode Expr) {
		return new GtUnaryNode(Type, ParsedTree.KeyToken, Func, Expr);
	}
	public GtNode CreateSuffixNode(GtType Type, GtSyntaxTree ParsedTree, GtFunc Func, GtNode Expr) {
		return new GtSuffixNode(Type, ParsedTree.KeyToken, Func, Expr);
	}
	public GtNode CreateBinaryNode(GtType Type, GtSyntaxTree ParsedTree, GtFunc Func, GtNode Left, GtNode Right) {
		return new GtBinaryNode(Type, ParsedTree.KeyToken, Func, Left, Right);
	}
	public GtNode CreateAndNode(GtType Type, GtSyntaxTree ParsedTree, GtNode Left, GtNode Right) {
		return new GtAndNode(Type, ParsedTree.KeyToken, Left, Right);
	}
	public GtNode CreateOrNode(GtType Type, GtSyntaxTree ParsedTree, GtNode Left, GtNode Right) {
		return new GtOrNode(Type, ParsedTree.KeyToken, Left, Right);
	}
	public GtNode CreateInstanceOfNode(GtType Type, GtSyntaxTree ParsedTree, GtNode LeftNode, GtType GivenType) {
		return new GtInstanceOfNode(Type, ParsedTree.KeyToken, LeftNode, GivenType);
	}
	public GtNode CreateAssignNode(GtType Type, GtSyntaxTree ParsedTree, GtNode Left, GtNode Right) {
		return new GtAssignNode(Type, ParsedTree.KeyToken, Left, Right);
	}
	public GtNode CreateSelfAssignNode(GtType Type, GtSyntaxTree ParsedTree, GtFunc Func, GtNode Left, GtNode Right) {
		return new GtSelfAssignNode(Type, ParsedTree.KeyToken, Func, Left, Right);
	}
	public GtNode CreateVarNode(GtType Type, GtSyntaxTree ParsedTree, GtType DeclType, String VariableName, GtNode InitNode, GtNode Block) {
		return new GtVarNode(Type, ParsedTree.KeyToken, DeclType, VariableName, InitNode, Block);
	}
	public GtNode CreateTrinaryNode(GtType Type, GtSyntaxTree ParsedTree, GtNode CondNode, GtNode ThenNode, GtNode ElseNode) {
		return new GtTrinaryNode(Type, ParsedTree.KeyToken, CondNode, ThenNode, ElseNode);
	}
	public GtNode CreateIfNode(GtType Type, GtSyntaxTree ParsedTree, GtNode Cond, GtNode Then, GtNode Else) {
		return new GtIfNode(Type, ParsedTree.KeyToken, Cond, Then, Else);
	}
	public GtNode CreateSwitchNode(GtType Type, GtSyntaxTree ParsedTree, GtNode Match, GtNode DefaultBlock) {
		return new GtSwitchNode(Type, ParsedTree.KeyToken, Match, DefaultBlock);
	}
	public GtNode CreateWhileNode(GtType Type, GtSyntaxTree ParsedTree, GtNode Cond, GtNode Block) {
		return new GtWhileNode(Type, ParsedTree.KeyToken, Cond, Block);
	}
	public GtNode CreateDoWhileNode(GtType Type, GtSyntaxTree ParsedTree, GtNode Cond, GtNode Block) {
		return new GtDoWhileNode(Type, ParsedTree.KeyToken, Cond, Block);
	}
	public GtNode CreateForNode(GtType Type, GtSyntaxTree ParsedTree, GtNode Cond, GtNode IterNode, GtNode Block) {
		return new GtForNode(Type, ParsedTree.KeyToken, Cond, IterNode, Block);
	}
	public GtNode CreateForEachNode(GtType Type, GtSyntaxTree ParsedTree, GtNode VarNode, GtNode IterNode, GtNode Block) {
		return new GtForEachNode(Type, ParsedTree.KeyToken, VarNode, IterNode, Block);
	}
	public GtNode CreateReturnNode(GtType Type, GtSyntaxTree ParsedTree, GtNode Node) {
		return new GtReturnNode(Type, ParsedTree.KeyToken, Node);
	}
	public GtNode CreateLabelNode(GtType Type, GtSyntaxTree ParsedTree, GtNode Node) {
		return null;
	}
	public GtNode CreateBreakNode(GtType Type, GtSyntaxTree ParsedTree, String Label) {
		return new GtBreakNode(Type, ParsedTree.KeyToken, Label);
	}
	public GtNode CreateContinueNode(GtType Type, GtSyntaxTree ParsedTree, String Label) {
		return new GtContinueNode(Type, ParsedTree.KeyToken, Label);
	}
	public GtNode CreateTryNode(GtType Type, GtSyntaxTree ParsedTree, GtNode TryBlock, GtNode CatchExpr, GtNode CatchNode, GtNode FinallyBlock) {
		return new GtTryNode(Type, ParsedTree.KeyToken, TryBlock, CatchExpr, CatchNode, FinallyBlock);
	}
	public GtNode CreateThrowNode(GtType Type, GtSyntaxTree ParsedTree, GtNode Node) {
		return new GtThrowNode(Type, ParsedTree.KeyToken, Node);
	}
	public GtNode CreateFunctionNode(GtType Type, GtSyntaxTree ParsedTree, GtNode Block) {
		return null;
	}
	public GtNode CreateEmptyNode(GtType Type) {
		return new GtEmptyNode(Type, GtTokenContext.NullToken);
	}
	public GtNode CreateErrorNode(GtType Type, GtSyntaxTree ParsedTree) {
		return new GtErrorNode(GtStaticTable.VoidType, ParsedTree.KeyToken);
	}
	public GtNode CreateCommandNode(GtType Type, GtSyntaxTree ParsedTree,GtNode PipedNextNode) {
		return new GtCommandNode(Type, ParsedTree.KeyToken, PipedNextNode);
	}

	/* language constructor */

	public void OpenClassField(GtSyntaxTree ParsedTree, GtType DefinedType, GtClassField ClassField) {
		/*extension*/
	}

	public void CloseClassField(GtType DefinedType, ArrayList<GtFunc> MemberList) {
		/*extension*/
	}

	public GtFunc CreateFunc(int FuncFlag, String FuncName, int BaseIndex, ArrayList<GtType> TypeList) {
		return new GtFunc(FuncFlag, FuncName, BaseIndex, TypeList);
	}

	public void GenerateFunc(GtFunc Func, ArrayList<String> ParamNameList, GtNode Body) {
		/*extenstion*/
	}

	public void SyncCodeGeneration() {
		/*extension*/
	}

	public final void StopVisitor(GtNode Node) {
		Node.NextNode = null;
	}

	public final boolean IsEmptyBlock(GtNode Node) {
		return Node == null || (Node instanceof GtEmptyNode) && Node.NextNode == null;
	}

	public final GtForNode FindParentForNode(GtNode Node) {
		/*local*/GtNode Parent = Node.ParentNode;
		while(Parent != null) {
			if(Parent instanceof GtForNode) {
				return (/*cast*/GtForNode)Parent;
			}
			if(Parent.ParentNode == null) {
				Parent = Parent.MoveHeadNode();
			}
			Parent = Parent.ParentNode;
		}
		return null;
	}

	//------------------------------------------------------------------------

	public void VisitEmptyNode(GtEmptyNode EmptyNode) {
		LibGreenTea.DebugP("empty node: " + EmptyNode.Token.ParsedText);
	}
	public void VisitInstanceOfNode(GtInstanceOfNode Node) {
		/*extention*/
	}
	public void VisitSelfAssignNode(GtSelfAssignNode Node) {
		/*extention*/
	}
	public void VisitTrinaryNode(GtTrinaryNode Node) {
		/*extension*/
	}
	public void VisitExistsNode(GtExistsNode Node) {
		/*extension*/
	}
	public void VisitCastNode(GtCastNode Node) {
		/*extension*/
	}
	public void VisitSliceNode(GtSliceNode Node) {
		/*extension*/
	}
	public void VisitSuffixNode(GtSuffixNode Node) {
		/*extension*/
	}
	public void VisitUnaryNode(GtUnaryNode Node) {
		/*extension*/
	}
	public void VisitIndexerNode(GtIndexerNode Node) {
		/*extension*/
	}
	public void VisitArrayNode(GtArrayNode Node) {
		/*extension*/
	}
	public void VisitNewArrayNode(GtNewArrayNode Node) {
		/*extension*/
	}
	public void VisitWhileNode(GtWhileNode Node) {
		/*extension*/
	}
	public void VisitDoWhileNode(GtDoWhileNode Node) {
		/*extension*/
	}
	public void VisitForNode(GtForNode Node) {
		/*extension*/
	}
	public void VisitForEachNode(GtForEachNode Node) {
		/*extension*/
	}
	public void VisitConstNode(GtConstNode Node) {
		/*extension*/
	}
	public void VisitNewNode(GtNewNode Node) {
		/*extension*/
	}
	public void VisitConstructorNode(GtConstructorNode Node) {
		/*extension*/
	}
	public void VisitNullNode(GtNullNode Node) {
		/*extension*/
	}
	public void VisitLocalNode(GtLocalNode Node) {
		/*extension*/
	}
	public void VisitGetterNode(GtGetterNode Node) {
		/*extension*/
	}
	public void VisitSetterNode(GtSetterNode Node) {
		/*extension*/
	}
	public void VisitDyGetterNode(GtDyGetterNode Node) {
		/*extension*/
	}
	public void VisitDySetterNode(GtDySetterNode Node) {
		/*extension*/
	}
	public void VisitApplyNode(GtApplyNode Node) {
		/*extension*/
	}
	public void VisitStaticApplyNode(GtStaticApplyNode Node) {
		/*extension*/
	}
//	public void VisitApplyStaticMethodNode(GtApplyStaticMethodNode Node) {
//		/*extension*/
//	}
	public void VisitApplyOverridedMethodNode(GtApplyOverridedMethodNode Node) {
		/*extension*/		
	}
	public void VisitApplyFuncNode(GtApplyFuncNode Node) {
		/*extension*/		
	}
	public void VisitApplyDynamicFuncNode(GtApplyDynamicFuncNode Node) {
		/*extension*/		
	}
	public void VisitApplyDynamicMethodNode(GtApplyDynamicMethodNode Node) {
		/*extension*/		
	}
	public void VisitBinaryNode(GtBinaryNode Node) {
		/*extension*/
	}
	public void VisitAndNode(GtAndNode Node) {
		/*extension*/
	}
	public void VisitOrNode(GtOrNode Node) {
		/*extension*/
	}
	public void VisitAssignNode(GtAssignNode Node) {
		/*extension*/
	}
	public void VisitVarNode(GtVarNode Node) {
		/*extension*/
	}
	public void VisitIfNode(GtIfNode Node) {
		/*extension*/
	}
	public void VisitSwitchNode(GtSwitchNode Node) {
		/*extension*/
	}
	public void VisitReturnNode(GtReturnNode Node) {
		/*extension*/
	}
	public void VisitBreakNode(GtBreakNode Node) {
		/*extension*/
	}
	public void VisitContinueNode(GtContinueNode Node) {
		/*extension*/
	}
	public void VisitTryNode(GtTryNode Node) {
		/*extension*/
	}
	public void VisitThrowNode(GtThrowNode Node) {
		/*extension*/
	}
	public void VisitFunctionNode(GtFunctionNode Node) {
		/*extension*/
	}
	public void VisitErrorNode(GtErrorNode Node) {
		/*extension*/
	}
	public void VisitCommandNode(GtCommandNode Node) {
		/*extension*/
	}

	public final void VisitBlock(GtNode Node) {
		/*local*/GtNode CurrentNode = Node;
		while(CurrentNode != null) {
			CurrentNode.Evaluate(this);
			CurrentNode = CurrentNode.NextNode;
		}
	}

	// This must be extended in each language

	public boolean IsStrictMode() {
		return true; /* override this in dynamic languages */
	}

	@Deprecated public Object Eval(GtNode Node) {
		this.VisitBlock(Node);
		return null;
	}

	// EnforceConst : 
	
	public Object EvalNewNode(GtNewNode Node, boolean EnforceConst) {
//ifdef JAVA  this is for JavaByteCodeGenerator and JavaSourceGenerator
		if(EnforceConst && Node.Type.TypeBody instanceof Class<?>) {
			Class<?> NativeClass = (/*cast*/Class<?>)Node.Type.TypeBody;
			try {
				Constructor<?> NativeConstructor = NativeClass.getConstructor(GtType.class);
				return NativeConstructor.newInstance(Node.Type);
			} catch (Exception e) {
				LibGreenTea.VerboseException(e);
			}
		}
//endif VAJA
		return Node.ToNullValue(this.Context, EnforceConst);  // if unsupported
	}

	public Object EvalConstructorNode(GtConstructorNode Node, boolean EnforceConst) {
//ifdef JAVA  this is for JavaByteCodeGenerator and JavaSourceGenerator
		if(EnforceConst && Node.Type.TypeBody instanceof Class<?>) {
			try {
				Constructor<?> NativeConstructor = (Constructor<?>)Node.Func.FuncBody;
				Object[] Arguments = new Object[Node.ParamList.size()];
				for(int i = 0; i < Arguments.length; i++) {
					GtNode ArgNode = Node.ParamList.get(i);
					Arguments[i] = ArgNode.ToConstValue(this.Context, EnforceConst);
					if(Arguments[i] == null && !ArgNode.IsNullNode()) {
						return null;
					}
					//System.err.println("@@@@ " + i + ", " + Arguments[i] + ", " + Arguments[i].getClass());
				}
				return NativeConstructor.newInstance(Arguments);
			} catch (Exception e) {
				LibGreenTea.VerboseException(e);
			}
		}
		//endif VAJA
		return Node.ToNullValue(this.Context, EnforceConst);  // if unsupported
	}

	public Object EvalApplyNode(GtApplyNode Node, boolean EnforceConst) {
//ifdef JAVA  this is for JavaByteCodeGenerator and JavaSourceGenerator
		//System.err.println("@@@@ " + (Node.Func.NativeRef.getClass()));
		if(Node.Func != null && (EnforceConst || Node.Func.Is(ConstFunc)) && Node.Func.FuncBody instanceof Method) {
			Object RecvObject = null;
			int StartIndex = 1;
			if(Node.Func.Is(NativeMethodFunc)  && Node.NodeList.size() > 1) {
				RecvObject = Node.NodeList.get(1).ToConstValue(this.Context, EnforceConst);
				if(RecvObject == null) {
					return null;
				}
				StartIndex = 2;
			}
			Object[] Arguments = new Object[Node.NodeList.size() - StartIndex];
			for(int i = 0; i < Arguments.length; i++) {
				GtNode ArgNode = Node.NodeList.get(StartIndex+i);
				Arguments[i] = ArgNode.ToConstValue(this.Context, EnforceConst);
				if(Arguments[i] == null && !ArgNode.IsNullNode()) {
					return null;
				}
				//System.err.println("@@@@ " + i + ", " + Arguments[i] + ", " + Arguments[i].getClass());
			}
			return LibNative.ApplyMethod(Node.Func, RecvObject, Arguments);
		}
//endif VAJA
		return Node.ToNullValue(this.Context, EnforceConst);  // if unsupported
	}
	public Object EvalArrayNode(GtArrayNode Node, boolean EnforceConst) {
		/*local*/Object ArrayObject = null;
//ifdef JAVA  this is for JavaByteCodeGenerator and JavaSourceGenerator
		Object Values[] = new Object[LibGreenTea.ListSize(Node.NodeList)];
		for(int i = 0; i < LibGreenTea.ListSize(Node.NodeList); i++) {
			Object Value = Node.NodeList.get(i).ToConstValue(this.Context, EnforceConst);
			if(Value == null) {
				return Value;
			}
			Values[i] = Value;
		}
		ArrayObject = LibGreenTea.NewArrayLiteral(Node.Type, Values);
//endif VAJA
		return ArrayObject;  // if unsupported
	}
	public Object EvalNewArrayNode(GtNewArrayNode Node, boolean EnforceConst) {
		/*local*/Object ArrayObject = null;
//ifdef JAVA  this is for JavaByteCodeGenerator and JavaSourceGenerator
		Object Values[] = new Object[LibGreenTea.ListSize(Node.NodeList)];
		for(int i = 0; i < LibGreenTea.ListSize(Node.NodeList); i++) {
			Object Value = Node.NodeList.get(i).ToConstValue(this.Context, EnforceConst);
			if(Value == null) {
				return Value;
			}
			Values[i] = Value;
		}
		ArrayObject = LibGreenTea.NewArray(Node.Type, Values);
//endif VAJA
		return ArrayObject;  // if unsupported
	}

	public Object EvalGetterNode(GtGetterNode Node, boolean EnforceConst) {
//ifdef JAVA  this is for JavaByteCodeGenerator and JavaSourceGenerator
		//System.err.println("** Node.Func = " + Node.Func);
		if(Node.Func != null) {
			Object Value = Node.RecvNode.ToConstValue(this.Context, EnforceConst);
			if(Value == null) {
				return Value;
			}
			//System.err.println("** Node.Func = " + Node.Func.FuncBody.getClass());
			if(Node.Func.FuncBody instanceof Field) {
				Value = LibNative.GetNativeFieldValue(Value, (/*cast*/Field)Node.Func.FuncBody);
				return Value;
			}
//			if(Node.Func.FuncBody instanceof Method) {
//				return LibNative.ApplyMethod1(Node.Func, null, Value);
//			}
		}
//endif VAJA
		return Node.ToNullValue(this.Context, EnforceConst); // if unsupported
	}

	public Object EvalSetterNode(GtSetterNode Node, boolean EnforceConst) {
//ifdef JAVA  this is for JavaByteCodeGenerator and JavaSourceGenerator
		if(Node.Func != null && EnforceConst) {
			Object LeftValue = Node.RecvNode.ToConstValue(this.Context, EnforceConst);
			if(LeftValue == null) {
				return LeftValue;
			}
			Object RightValue = Node.ValueNode.ToConstValue(this.Context, EnforceConst);
			if(RightValue == null && !Node.ValueNode.IsNullNode()) {
				return RightValue;
			}
			if(Node.Func.FuncBody instanceof Field) {
				return LibGreenTea.NativeFieldSetter(LeftValue, (/*cast*/Field)Node.Func.FuncBody, RightValue);
			}
//			if(Node.Func.FuncBody instanceof Method) {
//				return LibNative.ApplyMethod2(Node.Func, null, LeftValue, RightValue);
//			}
		}
//endif VAJA
		return Node.ToNullValue(this.Context, EnforceConst); // if unsupported
	}

	
	
	public Object EvalCommandNode(GtCommandNode Node, boolean EnforceConst) {
//ifdef JAVA  this is for JavaByteCodeGenerator and JavaSourceGenerator
		if(!EnforceConst) {
			return null;
		}
		/*local*/ArrayList<String[]> ArgsBuffer = new ArrayList<String[]>();
		/*local*/GtType Type = Node.Type;
		/*local*/GtCommandNode CurrentNode = Node;
		while(CurrentNode != null) {
			/*local*/int ParamSize = LibGreenTea.ListSize(CurrentNode.ArgumentList);
			/*local*/String[] Buffer = new String[ParamSize];
			for(int i =0; i < ParamSize; i++) {
				/*local*/Object Value = CurrentNode.ArgumentList.get(i).ToConstValue(this.Context, EnforceConst);
				if(!(Value instanceof String)) {
					return null;
				}
				Buffer[i] = (/*cast*/String)Value;
			}
			ArgsBuffer.add(Buffer);
			CurrentNode = (/*cast*/GtCommandNode) CurrentNode.PipedNextNode;
		}
		
		/*local*/int NodeSize = LibGreenTea.ListSize(ArgsBuffer);
		/*local*/String[][] Args = new String[NodeSize][];
		for(int i = 0; i < NodeSize; i++) {
			/*local*/String[] Buffer = ArgsBuffer.get(i);
			/*local*/int CommandSize = Buffer.length;
			Args[i] = new String[CommandSize];
			for(int j = 0; j < CommandSize; j++) {
				Args[i][j] = Buffer[j];
			}
		}
		if(Type.IsStringType()) {
			return DShellProcess.ExecCommandString(Args);
		}
		else if(Type.IsBooleanType()) {
			return DShellProcess.ExecCommandBool(Args);
		}
		else if(LibGreenTea.EqualsString(Type.toString(), "Task")) {
			return DShellProcess.ExecCommandTask(Args);
		}
		else {
			DShellProcess.ExecCommandVoid(Args);
		}
//endif VAJA
		return null;
	}

	public String GetSourceCode() {
		return null;
		/*extension*/
	}

	public void FlushBuffer() {
		/*extension*/
	}

	public String BlockComment(String Comment) {
		return "/*" + Comment + "*/";
	}

	public void StartCompilationUnit() {
		/*extension*/
	}

	public void FinishCompilationUnit() {
		/*extension*/
	}

	protected void PushCode(Object Code) {
		this.GeneratedCodeStack.add(Code);
	}

	protected final Object PopCode() {
		/*local*/int Size = this.GeneratedCodeStack.size();
		if(Size > 0) {
			/*local*/Object content = this.GeneratedCodeStack.get(Size - 1);
			this.GeneratedCodeStack.remove(Size - 1);
			return content;
		}
		return "";
	}

	public String GetRecvName() {
		return "this";  // default 
	}

	public void InvokeMainFunc(String MainFuncName) {
		/*extension*/
	}

	private Object[] MakeArguments(Object RecvObject, ArrayList<GtNode> ParamList, boolean EnforceConst) {
		/*local*/int StartIdx = 0;
		/*local*/int Size = LibGreenTea.ListSize(ParamList);
		/*local*/Object[] Values = new Object[RecvObject == null ? Size : Size + 1];
		if(RecvObject != null) {
			Values[0] = RecvObject;
			StartIdx = 1;
		}
		/*local*/int i = 0;
		while(i < Size) {
			/*local*/GtNode Node = ParamList.get(i);
			if(Node.IsNullNode()) {
				Values[StartIdx + i] = null;
			}
			else {
				/*local*/Object Value = Node.ToConstValue(this.Context, EnforceConst);
				if(Value == null) {
					return null;
				}
				Values[StartIdx + i] = Value;
			}
			i += 1;
		}
		return Values;
	}

	public Object EvalStaticApplyNode(GtStaticApplyNode ApplyNode, boolean EnforceConst) {
		if((EnforceConst || ApplyNode.Func.Is(ConstFunc)) /*&& ApplyNode.Func.FuncBody instanceof Method */) {
			/*local*/Object[] Arguments = this.MakeArguments(null, ApplyNode.ParamList, EnforceConst);
			if(Arguments != null) {
				return LibGreenTea.InvokeFunc(ApplyNode.Func, Arguments);
			}
		}
		return null;
	}

	public Object EvalApplyOverridedMethodNode(GtApplyOverridedMethodNode ApplyNode, boolean EnforceConst) {
		if((EnforceConst || ApplyNode.Func.Is(ConstFunc))) {
			/*local*/Object[] Arguments = this.MakeArguments(null, ApplyNode.ParamList, EnforceConst);
			if(Arguments != null) {
				return LibGreenTea.InvokeOverridedMethod(0, ApplyNode.NameSpace, ApplyNode.Func, Arguments);
			}
		}
		return null;
	}

	public Object EvalApplyFuncNode(GtApplyFuncNode ApplyNode, boolean EnforceConst) {
		/*local*/GtFunc Func = (/*cast*/GtFunc)ApplyNode.FuncNode.ToConstValue(this.Context, EnforceConst);
		if(Func != null) {
			/*local*/Object[] Arguments = this.MakeArguments(null, ApplyNode.ParamList, EnforceConst);
			if(Arguments != null) {
				return LibGreenTea.InvokeFunc(Func, Arguments);
			}
		}
		return null;
	}

	public Object EvalApplyDynamicFuncNode(GtApplyDynamicFuncNode ApplyNode, boolean EnforceConst) {
		/*local*/Object[] Arguments = this.MakeArguments(null, ApplyNode.ParamList, EnforceConst);
		if(Arguments != null) {
			return LibGreenTea.InvokeDynamicFunc(0, ApplyNode.Type, ApplyNode.NameSpace, ApplyNode.FuncName, Arguments);
		}
		return null;
	}

	public Object EvalApplyDynamicMethodNode(GtApplyDynamicMethodNode ApplyNode, boolean EnforceConst) {
		/*local*/Object[] Arguments = this.MakeArguments(null, ApplyNode.ParamList, EnforceConst);
		if(Arguments != null) {
			return LibGreenTea.InvokeDynamicMethod(0, ApplyNode.Type, ApplyNode.NameSpace, ApplyNode.FuncName, Arguments);
		}
		return null;
	}

	public Object EvalDyGetterNode(GtDyGetterNode GetterNode, boolean EnforceConst) {
		/*local*/Object RecvObject = GetterNode.RecvNode.ToConstValue(this.Context, EnforceConst);
		if(RecvObject != null) {
			/*local*/Object Value = LibGreenTea.DynamicGetter(RecvObject, GetterNode.FieldName);
			return LibGreenTea.DynamicCast(GetterNode.Type, Value);
		}
		return null;
	}

	public Object EvalDySetterNode(GtDySetterNode SetterNode, boolean EnforceConst) {
		/*local*/Object RecvObject = SetterNode.RecvNode.ToConstValue(this.Context, EnforceConst);
		if(RecvObject != null) {
			/*local*/Object Value = SetterNode.ValueNode.ToConstValue(this.Context, EnforceConst);
			if(Value != null || SetterNode.ValueNode.IsNullNode()) {
				return LibGreenTea.DynamicSetter(RecvObject, SetterNode.FieldName, Value);
			}
		}
		return null;
	}

}
