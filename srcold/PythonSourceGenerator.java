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

import parser.GreenTeaUtils;
import parser.GtClassField;
import parser.GtFieldInfo;
import parser.GtFunc;
import parser.GtNameSpace;
import parser.GtPolyFunc;
import parser.GtSourceGenerator;
import parser.GtStaticTable;
import parser.GtSyntaxTree;
import parser.GtType;
import parser.GtTypeEnv;
import parser.ast.GtAllocateNode;
import parser.ast.GtAndNode;
import parser.ast.GtApplyFunctionObjectNode;
import parser.ast.GtApplyOverridedMethodNode;
import parser.ast.GtApplySymbolNode;
import parser.ast.GtArrayLiteralNode;
import parser.ast.GtBinaryNode;
import parser.ast.GtBooleanNode;
import parser.ast.GtBreakNode;
import parser.ast.GtCastNode;
import parser.ast.GtCatchNode;
import parser.ast.GtCommandNode;
import parser.ast.GtConstPoolNode;
import parser.ast.GtConstructorNode;
import parser.ast.GtContinueNode;
import parser.ast.GtFloatNode;
import parser.ast.GtForEachNode;
import parser.ast.GtForNode;
import parser.ast.GtFunctionLiteralNode;
import parser.ast.GtGetIndexNode;
import parser.ast.GtGetLocalNode;
import parser.ast.GtGetterNode;
import parser.ast.GtIfNode;
import parser.ast.GtInstanceOfNode;
import parser.ast.GtIntNode;
import parser.ast.GtNewArrayNode;
import parser.ast.GtNode;
import parser.ast.GtNullNode;
import parser.ast.GtOrNode;
import parser.ast.GtReturnNode;
import parser.ast.GtSetIndexNode;
import parser.ast.GtSetLocalNode;
import parser.ast.GtSetterNode;
import parser.ast.GtStringNode;
import parser.ast.GtSwitchNode;
import parser.ast.GtSymbolNode;
import parser.ast.GtThrowNode;
import parser.ast.GtTrinaryNode;
import parser.ast.GtTryNode;
import parser.ast.GtUnaryNode;
import parser.ast.GtVarDeclNode;
import parser.ast.GtWhileNode;
import parser.deps.LibGreenTea;
import parser.deps.LibNative;
//endif VAJA

//GreenTea Generator should be written in each language.

public class PythonSourceGenerator extends GtSourceGenerator {
//	/*field*/private int SwitchCaseCount;
//	/*field*/private boolean importSubProc = false;

	public PythonSourceGenerator/*constructor*/(String TargetCode, String OutputFile, int GeneratorFlag) {
		super(TargetCode, OutputFile, GeneratorFlag);
		this.LineFeed = "\n";
		this.Tab = "\t";
		this.LineComment = "#";  // if not, set null
		this.BeginComment = "#";
		this.EndComment   = "";
		this.Camma = ", ";
		this.SemiColon   = "";

		this.TrueLiteral  = "True";
		this.FalseLiteral = "False";
		this.NullLiteral  = "None";
	}

	private void VisitNode(GtNode Node) {
		Node.Accept(this);
	}

	private void VisitBlockWithIndent(GtNode Node) {
		if(this.IsEmptyBlock(Node)) {
			this.AppendCode(this.LineFeed);
			this.CurrentBuilder.Indent();
			this.CurrentBuilder.AppendIndent();
			this.CurrentBuilder.AppendLine("pass");
			this.CurrentBuilder.UnIndent();
			this.CurrentBuilder.IndentAndAppend("");
		}
		else {
			this.VisitIndentBlock("", Node, "");
		}
	}

	private void VisitBlockWithoutIndent(GtNode Node) {
		/*local*/GtNode CurrentNode = Node;
		while(CurrentNode != null) {
			if(!this.IsEmptyBlock(CurrentNode)) {
				this.CurrentBuilder.AppendIndent();
				CurrentNode.Accept(this);
				this.CurrentBuilder.AppendLine(this.SemiColon);
			}
			CurrentNode = CurrentNode.NextNode;
		}
	}

	private void AppendCode(String Code) {
		this.CurrentBuilder.Append(Code);
	}

	@Override public GtNode CreateDoWhileNode(GtType Type, GtSyntaxTree ParsedTree, GtNode Cond, GtNode Block) {
		/*
		 * do { Block } while(Cond)
		 * => for(; True; if(!Cond) { break; } ) { Block;  }
		 */
		/*local*/GtNode Break = this.CreateBreakNode(Type, ParsedTree, null);
		/*local*/GtPolyFunc PolyFunc = ParsedTree.NameSpace.GetMethod(Cond.Type, "not", true);
		/*local*/GtTypeEnv Gamma = new GtTypeEnv(ParsedTree.NameSpace);
		/*local*/GtFunc ResolvedFunc = null;
		if(PolyFunc != null) {
			ResolvedFunc = PolyFunc.ResolveUnaryMethod(Gamma, Cond.Type);
		}
		Cond = this.CreateUnaryNode(Type, ParsedTree, "not", Cond);
		if(Cond instanceof GtSymbolNode) {
			((/*cast*/GtSymbolNode)Cond).ResolvedFunc = ResolvedFunc;
		}
		/*local*/GtNode IfBlock = this.CreateIfNode(Type, ParsedTree, Cond, Break, null);
		/*local*/GtNode TrueNode = this.CreateConstNode_OLD(GtStaticTable.BooleanType, ParsedTree, true);
		return this.CreateForNode(Type, ParsedTree, TrueNode, IfBlock, Block);
	}
	
	@Override public GtNode CreateErrorNode(GtType Type, GtSyntaxTree ParsedTree) {
		/*local*/GtNameSpace NameSpace = ParsedTree.NameSpace;
		/*local*/GtType ClassType = NameSpace.GetType("SoftwareFaultException");
		LibNative.Assert(ClassType != null);
		/*local*/GtPolyFunc PolyFunc = NameSpace.GetConstructorFunc(ClassType);
		/*local*/ArrayList<GtNode> ParamList = new ArrayList<GtNode>();
		
		/*local*/GtNode NewNode = this.CreateAllocateNode(ClassType, ParsedTree);
		ParamList.add(NewNode);
		ParamList.add(this.CreateConstNode_OLD(NameSpace.GetType("String"), ParsedTree, ParsedTree.KeyToken.ParsedText));
		/*local*/GtFunc Func = PolyFunc.FuncList.get(0);
		/*local*/GtNode ConstructorNode = this.CreateConstructorNode(ClassType, ParsedTree, Func);
		ConstructorNode.AppendNodeList(0, ParamList);
		return this.CreateThrowNode(Type, ParsedTree, ConstructorNode);
	}

	// Generator API
	@Override public void GenerateFunc(GtFunc Func, ArrayList<String> ParamNameList, GtNode Body) {
		if(GreenTeaUtils.IsFlag(Func.FuncFlag, GreenTeaUtils.ConstFunc)) {	// disable const annotation
			Func.FuncFlag = GreenTeaUtils.UnsetFlag(Func.FuncFlag, GreenTeaUtils.ConstFunc);
		}
		this.CurrentBuilder = this.NewSourceBuilder();
		this.AppendCode("def ");
		this.AppendCode(Func.GetNativeFuncName());
		this.AppendCode("(");
		/*local*/int i = 0;
		/*local*/int size = LibGreenTea.ListSize(ParamNameList);
		while(i < size) {
			if(i != 0) {
				this.AppendCode(this.Camma);
			}
			this.AppendCode(ParamNameList.get(i));
			i += 1;
		}
		this.AppendCode("):");
		this.VisitBlockWithIndent(Body);
	}

	@Override public void OpenClassField(GtSyntaxTree ParsedTree, GtType Type, GtClassField ClassField) {
		this.CurrentBuilder = this.NewSourceBuilder();
		this.CurrentBuilder.AppendIndent();
		this.AppendCode("class ");
		this.AppendCode(Type.ShortName);
		this.CurrentBuilder.AppendLine(":");
		this.CurrentBuilder.Indent();
		
		this.CurrentBuilder.AppendIndent();
		this.CurrentBuilder.AppendLine("def __init__(self):");
		this.CurrentBuilder.Indent();
		
		/*local*/int i = 0;
		/*local*/int size = LibGreenTea.ListSize(ClassField.FieldList);
		if(size == 0) {
			this.CurrentBuilder.AppendIndent();
			this.CurrentBuilder.AppendLine("pass");
		}
		else {
			while(i < size) {
				/*local*/GtFieldInfo FieldInfo = ClassField.FieldList.get(i);
				/*local*/String InitValue = this.StringifyConstValue(FieldInfo.InitValue);
				if(!FieldInfo.Type.IsNativeType()) {
					InitValue = this.NullLiteral;
				}
				this.CurrentBuilder.AppendIndent();
				this.AppendCode("self.");
				this.AppendCode(FieldInfo.NativeName);
				this.AppendCode(" = ");
				this.CurrentBuilder.AppendLine(InitValue);
				i += 1;
			}
		}
		this.CurrentBuilder.UnIndent();
		this.CurrentBuilder.UnIndent();
	}

	@Override public void InvokeMainFunc(String MainFuncName) {
		this.CurrentBuilder = this.NewSourceBuilder();
		this.CurrentBuilder.AppendLine("if __name__ == '__main__':");
		this.AppendCode(this.Tab);
		this.AppendCode(MainFuncName);
		this.CurrentBuilder.AppendLine("()");
	}

	// Visitor API
	@Override public void VisitWhileNode(GtWhileNode Node) {
		this.AppendCode("while ");
		this.VisitNode(Node.CondNode);
		this.AppendCode(":");
		this.VisitBlockWithIndent(Node.BodyNode);
	}

	@Override public void VisitForNode(GtForNode Node) {
		/* for(; COND; ITER) BLOCK1; continue; BLOCK2;
		 * => while COND:
		 * 		BLOCK1;
		 * 		ITER;continue;
		 * 		BLOCK2;
		 * 		ITER
		 */
		this.AppendCode("while ");
		this.VisitNode(Node.CondNode);
		this.AppendCode(":");
		this.VisitBlockWithIndent(Node.BodyNode);
		this.VisitBlockWithIndent(Node.IterNode);
	}

	@Override public void VisitForEachNode(GtForEachNode Node) {
		this.AppendCode("for ");
		this.VisitNode(Node.Variable);
		this.AppendCode(" in ");
		this.VisitNode(Node.IterNode);
		this.AppendCode(":");
		this.VisitBlockWithIndent(Node.BodyNode);
	}

	@Override public void VisitContinueNode(GtContinueNode Node) {
		/*local*/GtForNode Parent = this.FindParentForNode(Node);
		if(Parent != null) {
			/*local*/GtNode IterNode = Parent.IterNode;
			if(IterNode != null) {
				this.VisitNode(IterNode);
				this.AppendCode(this.LineFeed);
				this.CurrentBuilder.AppendIndent();
			}
		}
		this.AppendCode("continue");
		this.StopVisitor(Node);
	}

//	@Override public void VisitSuffixNode(GtSuffixNode Node) {
//		/*local*/String FuncName = Node.Token.ParsedText;
//		/*local*/String Expr = this.VisitNode(Node.Expr);
//		if(LibGreenTea.EqualsString(FuncName, "++")) {
//			FuncName = " += 1";
//		}
//		else if(LibGreenTea.EqualsString(FuncName, "--")) {
//			FuncName = " -= 1";
//		}
//		else {
//			LibGreenTea.DebugP(FuncName + " is not supported suffix operator!!");
//		}
//		this.PushSourceCode("(" + SourceGenerator.GenerateApplyFunc1(null, FuncName, true, Expr) + ")");
//		
//		//TODO
//		LibGreenTea.TODO(LibNative.GetClassName(Node));
//	}

	@Override public void VisitVarDeclNode(GtVarDeclNode Node) {
		this.AppendCode(Node.NativeName);
		this.AppendCode(" = ");
		if(Node.InitNode == null) {
			this.AppendCode(this.NullLiteral);
		}
		else {
			this.VisitNode(Node.InitNode);
		}
		this.AppendCode(this.LineFeed);
		this.VisitBlockWithoutIndent(Node.BlockNode);
	}

	@Override public void VisitTrinaryNode(GtTrinaryNode Node) {
		this.VisitNode(Node.ThenNode);
		this.AppendCode(" if ");
		this.VisitNode(Node.CondNode);
		this.AppendCode(" else ");
		this.VisitNode(Node.ElseNode);
	}

	@Override public void VisitIfNode(GtIfNode Node) {
		this.AppendCode("if ");
		this.VisitNode(Node.CondNode);
		this.AppendCode(":");
		this.VisitBlockWithIndent(Node.ThenNode);
		if(!this.IsEmptyBlock(Node.ElseNode)) {
			this.AppendCode("else:");
			this.VisitBlockWithIndent(Node.ElseNode);
		}
	}
	@Override public void VisitSwitchNode(GtSwitchNode Node) {	//TODO
//		/*local*/String Code = "Match" + this.SwitchCaseCount + " = " + this.VisitNode(Node.MatchNode) + this.LineFeed;
//		this.SwitchCaseCount += 1;
//		/*local*/int i = 0;
//		while(i < Node.CaseList.size()) {
//			/*local*/GtNode Case  = Node.CaseList.get(i);
//			/*local*/GtNode Block = Node.CaseList.get(i+1);
//			Code += this.GetIndentString();
//			if(i == 0) {
//				Code += "if";
//			}
//			else {
//				Code += "elif";
//			}
//			Code += this.VisitNode(Case) + ":";
//			Code += this.VisitBlockWithIndent(Block, true) + this.LineFeed;
//			i = i + 2;
//		}
//		if(Node.DefaultBlock != null) {
//			Code += this.GetIndentString() + "else: ";
//			Code += this.VisitBlockWithIndent(Node.DefaultBlock, true) + this.LineFeed;
//		}
//		Code += this.GetIndentString() + "}";
//		this.PushSourceCode(Code);
	}

	@Override public void VisitTryNode(GtTryNode Node) {
		this.AppendCode("try:");
		this.VisitBlockWithIndent(Node.TryNode);
		for (int i = 0; i < LibGreenTea.ListSize(Node.CatchList); i++) {
			GtCatchNode Catch = (/*cast*/GtCatchNode) Node.CatchList.get(i);
			this.CurrentBuilder.Append("except " + Catch.ExceptionType);
			this.AppendCode(this.Camma);
			this.AppendCode(Catch.ExceptionName);
			this.AppendCode(":");
			this.VisitBlockWithIndent(Catch.BodyNode);
		}
		if(Node.FinallyNode != null) {
			this.AppendCode("finally:");
			this.VisitBlockWithIndent(Node.FinallyNode);
		}
	}

	@Override public void VisitThrowNode(GtThrowNode Node) {
		this.AppendCode("raise");
		if(Node.ValueNode != null) {
			this.AppendCode(" ");
			this.VisitNode(Node.ValueNode);
		}
	}

	@Override public void VisitCommandNode(GtCommandNode Node) {	//TODO: need shell library
//		if(!this.importSubProc) {
//			this.importSubProc = true;
//			/*local*/String Header = "import sys, os" + this.LineFeed;
//			Header += "sys.path.append(os.getenv(" + LibGreenTea.QuoteString("GREENTEA_HOME") + ") + ";
//			Header += LibGreenTea.QuoteString("/include/python") + ")" + this.LineFeed;
//			Header += "import GtSubProc";
//			this.WriteHeader(Header);
//		}
//
//		/*local*/String Code = "";
//		/*local*/GtCommandNode CurrentNode = Node;
//		while(CurrentNode != null) {
//			Code += this.AppendCommand(CurrentNode);
//			CurrentNode = (/*cast*/GtCommandNode) CurrentNode.PipedNextNode;
//			break;	//TODO :support pipe
//		}
//
//		if(Node.Type.IsStringType()) {
//			Code = "GtSubProc.execCommandString([" + Code + "])";
//		}
//		else if(Node.Type.IsBooleanType()) {
//			Code = "GtSubProc.execCommandBool([" + Code + "])";
//		}
//		else {
//			Code = "GtSubProc.execCommandVoid([" + Code + "])";
//		}
//		this.PushSourceCode(Code);
		LibGreenTea.TODO(LibNative.GetClassName(Node));
	}

	@Override public void VisitArrayLiteralNode(GtArrayLiteralNode Node) {
		/*local*/int size = LibGreenTea.ListSize(Node.NodeList);
		/*local*/int i = 0;
		this.AppendCode("[");
		while(i < size) {
			if(i != 0) {
				this.AppendCode(", ");
			}
			this.VisitNode(Node.NodeList.get(i));
			i += 1;
		}
		this.AppendCode("]");
	}

	@Override public void VisitNewArrayNode(GtNewArrayNode Node) { // TODO: support multiple dimension array
		this.AppendCode("[0] * ");
		this.VisitNode(Node.NodeList.get(0));
	}

	@Override public void VisitGetIndexNode(GtGetIndexNode Node) {
		this.VisitNode(Node.RecvNode);
		this.AppendCode("[");
		this.VisitNode(Node.IndexNode);
		this.AppendCode("]");
	}

	@Override public void VisitSetIndexNode(GtSetIndexNode Node) {
		this.VisitNode(Node.RecvNode);
		this.AppendCode("[");
		this.VisitNode(Node.IndexNode);
		this.AppendCode("]");
		this.AppendCode(" = ");
		this.VisitNode(Node.ValueNode);
	}

	@Override public void VisitInstanceOfNode(GtInstanceOfNode Node) {
		this.AppendCode("isinstance(");
		this.VisitNode(Node.ExprNode);
		this.AppendCode(this.Camma);
		this.AppendCode(this.ConvertToNativeTypeName(Node.TypeInfo));
		this.AppendCode(")");
	}

	@Override public void VisitSetterNode(GtSetterNode Node) {
		this.VisitNode(Node.RecvNode);
		this.AppendCode(".");
		this.AppendCode(Node.NativeName);
		this.AppendCode(" = ");
		this.VisitNode(Node.ValueNode);
	}

	private String ConvertToNativeTypeName(GtType Type) {
		if(Type.IsIntType()) {
			return "int";
		}
		else if(Type.IsFloatType()) {
			return "float";
		}
		else if(Type.IsBooleanType()) {
			return "bool";
		}
		else if(Type.IsStringType()) {
			return "str";
		}
		else if(Type.IsArrayType()) {
			return "list";
		}
		return Type.ShortName;
	}

//	private String AppendCommand(GtCommandNode CurrentNode) {	//TODO
//		/*local*/String Code = "";
//		/*local*/int size = CurrentNode.ArgumentList.size();
//		/*local*/int i = 0;
//		while(i < size) {
//			if(i > 0) {
//				Code += ", ";
//			}
//			Code += this.VisitNode(CurrentNode.ArgumentList.get(i));
//			i = i + 1;
//		}
//		return Code;
//	}

	@Override public void VisitConstPoolNode(GtConstPoolNode Node) {
		if(Node.ConstValue instanceof GtFunc) {
			/*local*/GtFunc Func = (/*cast*/GtFunc)Node.ConstValue;
			this.AppendCode(Func.GetNativeFuncName());
		}
		else {
			this.AppendCode(this.StringifyConstValue(Node.ConstValue));
		}
	}

	@Override public void VisitBooleanNode(GtBooleanNode Node) {
		this.AppendCode(this.StringifyConstValue(Node.Value));
	}

	@Override public void VisitIntNode(GtIntNode Node) {
		this.AppendCode(this.StringifyConstValue(Node.Value));
	}

	@Override public void VisitFloatNode(GtFloatNode Node) {
		this.AppendCode(this.StringifyConstValue(Node.Value));
	}

	@Override public void VisitStringNode(GtStringNode Node) {
		this.AppendCode(this.StringifyConstValue(Node.Value));
	}

	@Override public void VisitAllocateNode(GtAllocateNode Node) {
		this.AppendCode(Node.Type.ShortName);
		this.AppendCode("()");
	}

	@Override public void VisitNullNode(GtNullNode Node) {
		this.AppendCode(this.StringifyConstValue(null));
	}

	@Override public void VisitGetLocalNode(GtGetLocalNode Node) {
		this.AppendCode(Node.NativeName);
	}

	@Override public void VisitConstructorNode(GtConstructorNode Node) {
		// do nothing
	}

	@Override public void VisitGetterNode(GtGetterNode Node) {
		this.VisitNode(Node.RecvNode);
		this.AppendCode(".");
		this.AppendCode(Node.NativeName);
	}
	

	@Override public void VisitApplySymbolNode(GtApplySymbolNode Node) {
		/*local*/GtFunc Func = Node.ResolvedFunc;
		if(Func.Is(NativeMacroFunc)) {
			this.ExpandNativeMacro(Func.GetNativeMacro(), Node.ParamList);
			return;
		}
		
		/*local*/int ParamSize = LibGreenTea.ListSize(Node.ParamList);
		/*local*/int Index = 0;
		this.AppendCode(Func.GetNativeFuncName());
		this.AppendCode("(");
		while(Index < ParamSize) {
			if(Index != 0) {
				this.AppendCode(this.Camma);
			}
			this.VisitNode(Node.ParamList.get(Index));
			Index += 1;
		}
		this.AppendCode(")");
	}

	@Override public void VisitApplyFunctionObjectNode(GtApplyFunctionObjectNode Node) {
		/*local*/int ParamSize = LibGreenTea.ListSize(Node.ParamList);
		/*local*/int Index = 0;
		this.VisitNode(Node.FuncNode);
		this.AppendCode("(");
		while(Index < ParamSize) {
			if(Index != 0) {
				this.AppendCode(this.Camma);
			}
			this.VisitNode(Node.ParamList.get(Index));
			Index += 1;
		}
		this.AppendCode(")");
	}

	@Override public void VisitApplyOverridedMethodNode(GtApplyOverridedMethodNode Node) {	//TODO
		LibGreenTea.TODO(LibNative.GetClassName(Node));
	}
	
	@Override public void VisitUnaryNode(GtUnaryNode Node) {
		/*local*/GtFunc Func = Node.ResolvedFunc;
		LibNative.Assert(Func.Is(NativeMacroFunc));
		/*local*/ArrayList<GtNode> ParamList = new ArrayList<GtNode>();
		ParamList.add(Node.RecvNode);
		this.AppendCode("(");
		this.ExpandNativeMacro(Func.GetNativeMacro(), ParamList);
		this.AppendCode(")");
	}

	@Override public void VisitBinaryNode(GtBinaryNode Node) {
		/*local*/GtFunc Func = Node.ResolvedFunc;
		LibNative.Assert(Func.Is(NativeMacroFunc));
		/*local*/ArrayList<GtNode> ParamList = new ArrayList<GtNode>();
		ParamList.add(Node.LeftNode);
		ParamList.add(Node.RightNode);
		this.AppendCode("(");
		this.ExpandNativeMacro(Func.GetNativeMacro(), ParamList);
		this.AppendCode(")");
	}

	@Override public void VisitAndNode(GtAndNode Node) {
		this.VisitNode(Node.LeftNode);
		this.AppendCode(" and ");
		this.VisitNode(Node.RightNode);
	}

	@Override public void VisitOrNode(GtOrNode Node) {
		this.VisitNode(Node.LeftNode);
		this.AppendCode(" or ");
		this.VisitNode(Node.RightNode);
	}

	@Override public void VisitSetLocalNode(GtSetLocalNode Node) {
		this.AppendCode(Node.NativeName);
		this.AppendCode(" = ");
		this.VisitNode(Node.ValueNode);
	}

	@Override public void VisitReturnNode(GtReturnNode Node) {
		this.AppendCode("return");
		if(Node.ValueNode != null) {
			this.AppendCode(" ");
			this.VisitNode(Node.ValueNode);
		}
		this.StopVisitor(Node);
	}

	@Override public void VisitBreakNode(GtBreakNode Node) {
		this.AppendCode("break");
		this.StopVisitor(Node);
	}

	@Override public void VisitCastNode(GtCastNode Node) {	//TODO
		LibGreenTea.TODO(LibNative.GetClassName(Node));
	}

	@Override public void VisitFunctionLiteralNode(GtFunctionLiteralNode Node) {	//TODO
		LibGreenTea.TODO(LibNative.GetClassName(Node));
	}

	// EnforceConst API
	@Override public Object EvalAllocateNode(GtAllocateNode Node, boolean EnforceConst) {
		return null;
	}

	@Override public Object EvalNewArrayNode(GtNewArrayNode Node, boolean EnforceConst) {
		return null;
	}

	@Override public Object EvalGetterNode(GtGetterNode Node, boolean EnforceConst) {
		return null;
	}

	@Override public Object EvalSetterNode(GtSetterNode Node, boolean EnforceConst) {
		return null;
	}

	@Override public Object EvalApplySymbolNode(GtApplySymbolNode ApplyNode, boolean EnforceConst) {
		return null;
	}
}