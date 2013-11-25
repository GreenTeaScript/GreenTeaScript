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

//GreenTea Generator should be written in each language.

public class PythonSourceGenerator extends GtSourceGenerator {
//	/*field*/private int SwitchCaseCount;
//	/*field*/private boolean importSubProc = false;

	PythonSourceGenerator/*constructor*/(String TargetCode, String OutputFile, int GeneratorFlag) {
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
		Node.Evaluate(this);
	}

	private void VisitBlockWithIndent(GtNode Node) {
		if(this.IsEmptyBlock(Node)) {
			this.AppendCode(this.LineFeed);
			this.VisitingBuilder.Indent();
			this.VisitingBuilder.AppendIndent();
			this.VisitingBuilder.AppendLine("pass");
			this.VisitingBuilder.UnIndent();
			this.VisitingBuilder.IndentAndAppend("");
		}
		else {
			this.VisitIndentBlock("", Node, "");
		}
	}

	private void VisitBlockWithoutIndent(GtNode Node) {
		/*local*/GtNode CurrentNode = Node;
		while(CurrentNode != null) {
			if(!this.IsEmptyBlock(CurrentNode)) {
				this.VisitingBuilder.AppendIndent();
				CurrentNode.Evaluate(this);
				this.VisitingBuilder.AppendLine(this.SemiColon);
			}
			CurrentNode = CurrentNode.NextNode;
		}
	}

	private void AppendCode(String Code) {
		this.VisitingBuilder.Append(Code);
	}

	@Override public GtNode CreateDoWhileNode(GtType Type, GtSyntaxTree ParsedTree, GtNode Cond, GtNode Block) {
		/*
		 * do { Block } while(Cond)
		 * => for(; True; if(!Cond) { break; } ) { Block;  }
		 */
		/*local*/GtNode Break = this.CreateBreakNode(Type, ParsedTree, null);
		/*local*/GtPolyFunc PolyFunc = ParsedTree.NameSpace.GetMethod(Cond.Type, "not", true);
		/*local*/GtTypeEnv Gamma = new GtTypeEnv(ParsedTree.NameSpace);
		/*local*/GtFunc Func = null;
		if(PolyFunc != null) {
			Func = PolyFunc.ResolveUnaryMethod(Gamma, Cond.Type);
		}
		Cond = this.CreateUnaryNode(Type, ParsedTree, Func, Cond);
		/*local*/GtNode IfBlock = this.CreateIfNode(Type, ParsedTree, Cond, Break, null);
		/*local*/GtNode TrueNode = this.CreateConstNode(GtStaticTable.BooleanType, ParsedTree, true);
		return this.CreateForNode(Type, ParsedTree, TrueNode, IfBlock, Block);
	}
	
	@Override public GtNode CreateErrorNode(GtType Type, GtSyntaxTree ParsedTree) {
		/*local*/GtNameSpace NameSpace = ParsedTree.NameSpace;
		/*local*/GtType ClassType = NameSpace.GetType("SoftwareFaultException");
		LibGreenTea.Assert(ClassType != null);
		/*local*/GtPolyFunc PolyFunc = NameSpace.GetConstructorFunc(ClassType);
		/*local*/ArrayList<GtNode> ParamList = new ArrayList<GtNode>();
		
		/*local*/GtNode NewNode = this.CreateNewNode(ClassType, ParsedTree);
		ParamList.add(NewNode);
		ParamList.add(this.CreateConstNode(NameSpace.GetType("String"), ParsedTree, ParsedTree.KeyToken.ParsedText));
		/*local*/GtFunc Func = PolyFunc.FuncList.get(0);
		/*local*/GtNode StaticApplyNode = this.CreateStaticApplyNode(ClassType, ParsedTree, Func);
		StaticApplyNode.AppendNodeList(0, ParamList);
		return this.CreateThrowNode(Type, ParsedTree, StaticApplyNode);
	}

	// Generator API
	@Override public void GenerateFunc(GtFunc Func, ArrayList<String> ParamNameList, GtNode Body) {
		if(GreenTeaUtils.IsFlag(Func.FuncFlag, GreenTeaUtils.ConstFunc)) {	// disable const annotation
			Func.FuncFlag = GreenTeaUtils.UnsetFlag(Func.FuncFlag, GreenTeaUtils.ConstFunc);
		}
		this.VisitingBuilder = this.NewSourceBuilder();
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
		this.VisitingBuilder = this.NewSourceBuilder();
		this.VisitingBuilder.AppendIndent();
		this.AppendCode("class ");
		this.AppendCode(Type.ShortName);
		this.VisitingBuilder.AppendLine(":");
		this.VisitingBuilder.Indent();
		
		this.VisitingBuilder.AppendIndent();
		this.VisitingBuilder.AppendLine("def __init__(self):");
		this.VisitingBuilder.Indent();
		
		/*local*/int i = 0;
		/*local*/int size = LibGreenTea.ListSize(ClassField.FieldList);
		if(size == 0) {
			this.VisitingBuilder.AppendIndent();
			this.VisitingBuilder.AppendLine("pass");
		}
		else {
			while(i < size) {
				/*local*/GtFieldInfo FieldInfo = ClassField.FieldList.get(i);
				/*local*/String InitValue = this.StringifyConstValue(FieldInfo.InitValue);
				if(!FieldInfo.Type.IsNativeType()) {
					InitValue = this.NullLiteral;
				}
				this.VisitingBuilder.AppendIndent();
				this.AppendCode("self.");
				this.AppendCode(FieldInfo.NativeName);
				this.AppendCode(" = ");
				this.VisitingBuilder.AppendLine(InitValue);
				i += 1;
			}
		}
		this.VisitingBuilder.UnIndent();
		this.VisitingBuilder.UnIndent();
	}

	@Override public void InvokeMainFunc(String MainFuncName) {
		this.VisitingBuilder = this.NewSourceBuilder();
		this.VisitingBuilder.AppendLine("if __name__ == '__main__':");
		this.AppendCode(this.Tab);
		this.AppendCode(MainFuncName);
		this.VisitingBuilder.AppendLine("()");
	}

	// Visitor API
	@Override public void VisitWhileNode(GtWhileNode Node) {
		this.AppendCode("while ");
		this.VisitNode(Node.CondExpr);
		this.AppendCode(":");
		this.VisitBlockWithIndent(Node.LoopBody);
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
		this.VisitNode(Node.CondExpr);
		this.AppendCode(":");
		this.VisitBlockWithIndent(Node.LoopBody);
		this.VisitBlockWithIndent(Node.IterExpr);
	}

	@Override public void VisitForEachNode(GtForEachNode Node) {
		this.AppendCode("for ");
		this.VisitNode(Node.Variable);
		this.AppendCode(" in ");
		this.VisitNode(Node.IterExpr);
		this.AppendCode(":");
		this.VisitBlockWithIndent(Node.LoopBody);
	}

	@Override public void VisitContinueNode(GtContinueNode Node) {
		/*local*/GtForNode Parent = this.FindParentForNode(Node);
		if(Parent != null) {
			/*local*/GtNode IterNode = Parent.IterExpr;
			if(IterNode != null) {
				this.VisitNode(IterNode);
				this.AppendCode(this.LineFeed);
				this.VisitingBuilder.AppendIndent();
			}
		}
		this.AppendCode("continue");
		this.StopVisitor(Node);
	}

	@Override public void VisitSuffixNode(GtSuffixNode Node) {
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
		
		//TODO
		LibGreenTea.TODO(LibNative.GetClassName(Node));
	}

	@Override public void VisitVarNode(GtVarNode Node) {
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
		this.VisitNode(Node.ConditionNode);
		this.AppendCode(" else ");
		this.VisitNode(Node.ElseNode);
	}

	@Override public void VisitIfNode(GtIfNode Node) {
		this.AppendCode("if ");
		this.VisitNode(Node.CondExpr);
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
		this.VisitBlockWithIndent(Node.TryBlock);
		if(Node.CatchExpr != null) {
			/*local*/GtVarNode Val = (/*cast*/GtVarNode) Node.CatchExpr;
			this.AppendCode("except ");
			this.AppendCode(Val.Type.ShortName);
			this.AppendCode(this.Camma);
			this.AppendCode(Val.NativeName);
			this.AppendCode(":");
			this.VisitBlockWithIndent(Node.CatchBlock);
		}
		if(Node.FinallyBlock != null) {
			this.AppendCode("finally:");
			this.VisitBlockWithIndent(Node.FinallyBlock);
		}
	}

	@Override public void VisitThrowNode(GtThrowNode Node) {
		this.AppendCode("raise");
		if(Node.Expr != null) {
			this.AppendCode(" ");
			this.VisitNode(Node.Expr);
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

	@Override public void VisitArrayNode(GtArrayNode Node) {
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

	@Override public void VisitIndexerNode(GtIndexerNode Node) {
		this.VisitNode(Node.Expr);
		this.AppendCode("[");
		this.VisitNode(Node.GetAt(0));
		this.AppendCode("]");
		if(LibGreenTea.ListSize(Node.NodeList) == 2) {
			this.AppendCode(" = ");
			this.VisitNode(Node.GetAt(1));
		}
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
		this.AppendCode(Node.Func.FuncName);
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

	@Override public void VisitConstNode(GtConstNode Node) {
		if(Node.ConstValue instanceof GtFunc) {
			/*local*/GtFunc Func = (/*cast*/GtFunc)Node.ConstValue;
			this.AppendCode(Func.GetNativeFuncName());
		}
		else {
			this.AppendCode(this.StringifyConstValue(Node.ConstValue));
		}
	}

	@Override public void VisitNewNode(GtNewNode Node) {
		this.AppendCode(Node.Type.ShortName);
		this.AppendCode("()");
	}

	@Override public void VisitNullNode(GtNullNode Node) {
		this.AppendCode(this.StringifyConstValue(null));
	}

	@Override public void VisitLocalNode(GtLocalNode Node) {
		this.AppendCode(Node.NativeName);
	}

	@Override public void VisitConstructorNode(GtConstructorNode Node) {
		// do nothing
	}

	@Override public void VisitGetterNode(GtGetterNode Node) {
		this.VisitNode(Node.RecvNode);
		this.AppendCode(".");
		this.AppendCode(Node.Func.FuncName);
	}

	@Override public void VisitDyGetterNode(GtDyGetterNode Node) {	//TODO
		LibGreenTea.TODO(LibNative.GetClassName(Node));
	}

	@Override public void VisitDySetterNode(GtDySetterNode Node) {	//TODO
		LibGreenTea.TODO(LibNative.GetClassName(Node));
	}
	

	@Override public void VisitStaticApplyNode(GtStaticApplyNode Node) {
		/*local*/GtFunc Func = Node.Func;
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

	@Override public void VisitApplyFuncNode(GtApplyFuncNode Node) {
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
	
	@Override public void VisitApplyDynamicFuncNode(GtApplyDynamicFuncNode Node) {	//TODO
		LibGreenTea.TODO(LibNative.GetClassName(Node));
	}

	@Override public void VisitApplyDynamicMethodNode(GtApplyDynamicMethodNode Node) { //TODO
		LibGreenTea.TODO(LibNative.GetClassName(Node));
	}
	
	@Override public void VisitUnaryNode(GtUnaryNode Node) {
		/*local*/GtFunc Func = Node.Func;
		LibGreenTea.Assert(Func.Is(NativeMacroFunc));
		/*local*/ArrayList<GtNode> ParamList = new ArrayList<GtNode>();
		ParamList.add(Node.Expr);
		this.AppendCode("(");
		this.ExpandNativeMacro(Func.GetNativeMacro(), ParamList);
		this.AppendCode(")");
	}

	@Override public void VisitBinaryNode(GtBinaryNode Node) {
		/*local*/GtFunc Func = Node.Func;
		LibGreenTea.Assert(Func.Is(NativeMacroFunc));
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

	@Override public void VisitAssignNode(GtAssignNode Node) {
		this.VisitNode(Node.LeftNode);
		this.AppendCode(" = ");
		this.VisitNode(Node.RightNode);
	}

	@Override public void VisitSelfAssignNode(GtSelfAssignNode Node) {
		this.VisitNode(Node.LeftNode);
		this.AppendCode(" = ");

		/*local*/GtFunc Func = Node.Func;
		LibGreenTea.Assert(Func.Is(NativeMacroFunc));
		/*local*/ArrayList<GtNode> ParamList = new ArrayList<GtNode>();
		ParamList.add(Node.LeftNode);
		ParamList.add(Node.RightNode);
		this.ExpandNativeMacro(Func.GetNativeMacro(), ParamList);
	}

	@Override public void VisitReturnNode(GtReturnNode Node) {
		this.AppendCode("return");
		if(Node.Expr != null) {
			this.AppendCode(" ");
			this.VisitNode(Node.Expr);
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

	@Override public void VisitFunctionNode(GtFunctionNode Node) {	//TODO
		LibGreenTea.TODO(LibNative.GetClassName(Node));
	}

	// EnforceConst API
	@Override public Object EvalNewNode(GtNewNode Node, boolean EnforceConst) {
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

	@Override public Object EvalStaticApplyNode(GtStaticApplyNode ApplyNode, boolean EnforceConst) {
		return null;
	}
}