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

import com.apple.jobjc.ID;

//GreenTea Generator should be written in each language.

public class PythonSourceGenerator extends SourceGenerator {
	/*field*/private int SwitchCaseCount;
	/*field*/private boolean importSubProc = false;

	PythonSourceGenerator/*constructor*/(String TargetCode, String OutputFile, int GeneratorFlag) {
		super(TargetCode, OutputFile, GeneratorFlag);
		this.Tab = "    ";
		this.LogicalAndOperator = "and";
		this.LogicalOrOperator  = "or";
		this.TrueLiteral  = "True";
		this.FalseLiteral = "False";
		this.NullLiteral = "None";
		this.LineComment = "##";
		this.SwitchCaseCount = 0;
		this.BlockBegin = "";
		this.BlockEnd = "";
		this.SemiColon = "";
	}

	@Override protected String GetNewOperator(GtType Type) {
		/*local*/String TypeName = Type.ShortName;
		return TypeName + "()";
	}

	public GtNode CreateDoWhileNode(GtType Type, GtSyntaxTree ParsedTree, GtNode Cond, GtNode Block) {
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

	// Visitor API
	@Override public void VisitWhileNode(GtWhileNode Node) {
		/*local*/String Program = "while " + this.VisitNode(Node.CondExpr) + ":" + this.LineFeed;
		if(this.IsEmptyBlock(Node.LoopBody)) {
			this.Indent();
			Program += this.GetIndentString() + "pass";
			this.UnIndent();
		}
		else {
			Program += this.VisitBlockWithIndent(Node.LoopBody, true);
		}
		this.PushSourceCode(Program);
	}

	@Override public void VisitForNode(GtForNode Node) {
		/* for(; COND; ITER) BLOCK1; continue; BLOCK2;
		 * => while COND:
		 * 		BLOCK1;
		 * 		ITER;continue;
		 * 		BLOCK2;
		 * 		ITER
		 */
		/*local*/String Program = "while " + this.VisitNode(Node.CondExpr) + ":" + this.LineFeed;
		if(this.IsEmptyBlock(Node.LoopBody)) {
			this.Indent();
			Program += this.GetIndentString() + "pass";
			this.UnIndent();
		}
		else {
			Program += this.VisitBlockWithIndent(Node.LoopBody, true);
		}
		Program += this.VisitBlockWithIndent(Node.IterExpr, true);
		this.PushSourceCode(Program);
	}

	@Override public void VisitForEachNode(GtForEachNode Node) {
		/*local*/String Iter = this.VisitNode(Node.IterExpr);
		/*local*/String Variable = this.VisitNode(Node.Variable);
		/*local*/String Program = "for " + Variable + " in " + Iter + ":" + this.LineFeed;
		Program += this.VisitBlockWithIndent(Node.LoopBody, true);
		this.PushSourceCode(Program);
	}

	@Override public void VisitContinueNode(GtContinueNode Node) {
		/*local*/String Code = "";
		/*local*/GtForNode Parent = this.FindParentForNode(Node);
		if(Parent != null) {
			/*local*/GtNode IterNode = Parent.IterExpr;
			if(IterNode != null) {
				Code += this.VisitNode(IterNode) + this.LineFeed + this.GetIndentString();
			}
		}
		Code += this.ContinueKeyword;
		if(this.HasLabelSupport) {
			/*local*/String Label = Node.Label;
			if(Label != null) {
				Code += " " + Label;
			}
		}
		this.PushSourceCode(Code);
		this.StopVisitor(Node);
	}

	@Override public void VisitSuffixNode(GtSuffixNode Node) {
		/*local*/String FuncName = Node.Token.ParsedText;
		/*local*/String Expr = this.VisitNode(Node.Expr);
		if(LibGreenTea.EqualsString(FuncName, "++")) {
			FuncName = " += 1";
		}
		else if(LibGreenTea.EqualsString(FuncName, "--")) {
			FuncName = " -= 1";
		}
		else {
			LibGreenTea.DebugP(FuncName + " is not supported suffix operator!!");
		}
		this.PushSourceCode("(" + SourceGenerator.GenerateApplyFunc1(null, FuncName, true, Expr) + ")");
	}

	@Override public void VisitVarNode(GtVarNode Node) {
		/*local*/String Code = Node.NativeName;
		/*local*/String InitValue = this.NullLiteral;
		if(Node.InitNode != null) {
			InitValue = this.VisitNode(Node.InitNode);
		}
		Code += " = " + InitValue + this.LineFeed;
		this.PushSourceCode(Code + this.VisitBlockWithIndent(Node.BlockNode, false));
	}

	@Override public void VisitTrinaryNode(GtTrinaryNode Node) {
		/*local*/String CondExpr = this.VisitNode(Node.ConditionNode);
		/*local*/String Then = this.VisitNode(Node.ThenNode);
		/*local*/String Else = this.VisitNode(Node.ElseNode);
		this.PushSourceCode(Then + " if " + CondExpr + " else " + Else);
	}

	@Override public void VisitIfNode(GtIfNode Node) {
		/*local*/String CondExpr = this.VisitNode(Node.CondExpr);
		/*local*/String ThenBlock = this.VisitBlockWithIndent(Node.ThenNode, true);
		/*local*/String Code = "if " + CondExpr + ":" + this.LineFeed + this.GetIndentString() + ThenBlock;
		if(this.IsEmptyBlock(Node.ThenNode)) {
			Code += this.GetIndentString() + "pass" + this.LineFeed + this.GetIndentString();
		}

		if(!this.IsEmptyBlock(Node.ElseNode)) {
			/*local*/String ElseBlock = this.VisitBlockWithIndent(Node.ElseNode, true);
			Code += "else:" + this.LineFeed + ElseBlock;
		}
		this.PushSourceCode(Code);
	}
	@Override public void VisitSwitchNode(GtSwitchNode Node) {
		/*local*/String Code = "Match" + this.SwitchCaseCount + " = " + this.VisitNode(Node.MatchNode) + this.LineFeed;
		this.SwitchCaseCount += 1;
		/*local*/int i = 0;
		while(i < Node.CaseList.size()) {
			/*local*/GtNode Case  = Node.CaseList.get(i);
			/*local*/GtNode Block = Node.CaseList.get(i+1);
			Code += this.GetIndentString();
			if(i == 0) {
				Code += "if";
			}
			else {
				Code += "elif";
			}
			Code += this.VisitNode(Case) + ":";
			Code += this.VisitBlockWithIndent(Block, true) + this.LineFeed;
			i = i + 2;
		}
		if(Node.DefaultBlock != null) {
			Code += this.GetIndentString() + "else: ";
			Code += this.VisitBlockWithIndent(Node.DefaultBlock, true) + this.LineFeed;
		}
		Code += this.GetIndentString() + "}";
		this.PushSourceCode(Code);
	}

	@Override public void VisitTryNode(GtTryNode Node) {
		/*local*/String Code = "try:" + this.LineFeed;
		Code += this.VisitBlockWithIndent(Node.TryBlock, true);
		if(Node.CatchExpr != null) {
			/*local*/GtVarNode Val = (/*cast*/GtVarNode) Node.CatchExpr;
			Code += "except " + Val.Type.toString() + ", " + Val.NativeName + ":" + this.LineFeed;
			Code += this.VisitBlockWithIndent(Node.CatchBlock, true);
		}
		if(Node.FinallyBlock != null) {
			/*local*/String Finally = this.VisitBlockWithIndent(Node.FinallyBlock, true);
			Code += "finally:" + this.LineFeed + Finally;
		}
		this.PushSourceCode(Code);
	}

	@Override public void VisitThrowNode(GtThrowNode Node) {
		/*local*/String expr = "";
		if(Node.Expr != null) {
			expr = this.VisitNode(Node.Expr);
		}
		this.PushSourceCode("raise " + expr);
	}

	@Override public void VisitErrorNode(GtErrorNode Node) {
		/*local*/String Code = "raise SoftwareFault(\"" + Node.Token.ParsedText + "\")";
		this.PushSourceCode(Code);
	}

	@Override public void VisitCommandNode(GtCommandNode Node) {
		if(!this.importSubProc) {
			this.importSubProc = true;
			/*local*/String Header = "import sys, os" + this.LineFeed;
			Header += "sys.path.append(os.getenv(" + LibGreenTea.QuoteString("GREENTEA_HOME") + ") + ";
			Header += LibGreenTea.QuoteString("/include/python") + ")" + this.LineFeed;
			Header += "import GtSubProc";
			this.WriteHeader(Header);
		}

		/*local*/String Code = "";
		/*local*/GtCommandNode CurrentNode = Node;
		while(CurrentNode != null) {
			Code += this.AppendCommand(CurrentNode);
			CurrentNode = (/*cast*/GtCommandNode) CurrentNode.PipedNextNode;
			break;	//TODO :support pipe
		}

		if(Node.Type.IsStringType()) {
			Code = "GtSubProc.execCommandString([" + Code + "])";
		}
		else if(Node.Type.IsBooleanType()) {
			Code = "GtSubProc.execCommandBool([" + Code + "])";
		}
		else {
			Code = "GtSubProc.execCommandVoid([" + Code + "])";
		}
		this.PushSourceCode(Code);
	}

	@Override public void VisitArrayNode(GtArrayNode Node) {
		/*local*/int size = LibGreenTea.ListSize(Node.NodeList);
		/*local*/int i = 0;
		/*local*/String Code = "[";
		while(i < size) {
			if(i != 0) {
				Code += ", ";
			}
			Code += this.VisitNode(Node.NodeList.get(i));
			i += 1;
		}
		this.PushSourceCode(Code + "]");
	}

	@Override public void VisitNewArrayNode(GtNewArrayNode Node) { // TODO: support multiple dimension array
		this.PushSourceCode("[0] * " + this.VisitNode(Node.NodeList.get(0)));
	}

	@Override public void VisitIndexerNode(GtIndexerNode Node) {
		/*local*/String Code = this.VisitNode(Node.Expr) + "[" + this.VisitNode(Node.GetAt(0)) + "]";
		if(LibGreenTea.ListSize(Node.NodeList) == 2) {
			Code += " = " + this.VisitNode(Node.GetAt(1));
		}
		this.PushSourceCode(Code);
	}

	@Override public void VisitInstanceOfNode(GtInstanceOfNode Node) {
		this.PushSourceCode("isinstance(" + this.VisitNode(Node.ExprNode) + ", " + this.ConvertToNativeTypeName(Node.TypeInfo) + ")");
	}

	@Override public void VisitSetterNode(GtSetterNode Node) {
		/*local*/String Name = Node.Func.FuncName;
		/*local*/String Recv = this.VisitNode(Node.RecvNode);
		/*local*/String Value = this.VisitNode(Node.ValueNode);
		this.PushSourceCode(Recv + "." + Name + " = " + Value);
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

	private String AppendCommand(GtCommandNode CurrentNode) {
		/*local*/String Code = "";
		/*local*/int size = CurrentNode.ArgumentList.size();
		/*local*/int i = 0;
		while(i < size) {
			if(i > 0) {
				Code += ", ";
			}
			Code += this.VisitNode(CurrentNode.ArgumentList.get(i));
			i = i + 1;
		}
		return Code;
	}

	@Override public void GenerateFunc(GtFunc Func, ArrayList<String> ParamNameList, GtNode Body) {
		this.FlushErrorReport();
		if(GreenTeaUtils.IsFlag(Func.FuncFlag, GreenTeaUtils.ConstFunc)) {
			Func.FuncFlag = GreenTeaUtils.UnsetFlag(Func.FuncFlag, GreenTeaUtils.ConstFunc);
		}
		/*local*/String Function = "def ";
		Function += Func.GetNativeFuncName() + "(";
		/*local*/int i = 0;
		/*local*/int size = ParamNameList.size();
		while(i < size) {
			if(i > 0) {
				Function += ", ";
			}
			Function += ParamNameList.get(i);
			i = i + 1;
		}
		/*local*/String Block = this.VisitBlockWithIndent(Body, true);
		Function += "):" + this.LineFeed + Block + this.LineFeed;
		this.WriteLineCode(Function);
	}

	@Override public void OpenClassField(GtSyntaxTree ParsedTree, GtType Type, GtClassField ClassField) {
		this.FlushErrorReport();
		/*local*/String Program = this.GetIndentString() + "class " + Type.ShortName;
//		if(Type.SuperType != null) {
//			Program += "(" + Type.SuperType.ShortClassName + ")";
//		}
		Program += ":" + this.LineFeed;
		this.Indent();

		Program += this.GetIndentString() + "def __init__(" + this.GetRecvName() + ")" + ":" + this.LineFeed;
		this.Indent();
		/*local*/int i = 0, length = LibGreenTea.ListSize(ClassField.FieldList);
		if(length == 0) {
			Program += this.GetIndentString() + "pass;" + this.LineFeed;
		}
		else {
			while(i < length) {
				/*local*/GtFieldInfo FieldInfo = ClassField.FieldList.get(i);
				/*local*/String InitValue = this.StringifyConstValue(FieldInfo.InitValue);
				if(!FieldInfo.Type.IsNativeType()) {
					InitValue = "None";
				}
				Program += this.GetIndentString() + this.GetRecvName() + "." + FieldInfo.NativeName + " = " + InitValue + this.LineFeed;
				i = i + 1;
			}
		}
		this.UnIndent();
		this.UnIndent();
		this.WriteLineCode(Program);
	}

	@Override public String GetRecvName() {
		return "self";
	}

	@Override public void InvokeMainFunc(String MainFuncName) {
		this.WriteLineCode("if __name__ == '__main__':");
		this.WriteLineCode(this.Tab + MainFuncName + "()");
	}

}