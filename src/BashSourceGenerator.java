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
import java.util.ArrayList;
//endif VAJA

//GreenTea Generator should be written in each language.

public class BashSourceGenerator extends SourceGenerator {
	/*field*/boolean inFunc = false;
	/*field*/int cmdCounter = 0;

	BashSourceGenerator/*constructor*/(String TargetCode, String OutputFile, int GeneratorFlag) {
		super(TargetCode, OutputFile, GeneratorFlag);
	}

	@Override public void InitContext(GtClassContext Context) {
		super.InitContext(Context);
		this.WriteLineHeader("#!/bin/bash");
	}
	
	public void VisitBlockWithIndent(GtNode Node, boolean inBlock) {
		/*local*/String Code = "";
		if(inBlock) {
			this.Indent();
		}
		/*local*/GtNode CurrentNode = Node;
		while(CurrentNode != null) {
			CurrentNode.Evaluate(this);
			/*local*/String poppedCode = this.PopSourceCode();
			if(!poppedCode.equals("")) {
				Code += this.GetIndentString() + poppedCode + this.LineFeed;
			}
			CurrentNode = CurrentNode.NextNode;
		}
		if(inBlock) {
			this.UnIndent();
			Code += this.GetIndentString();
		}
		else {
			if(Code.length() > 0) {
				Code = Code.substring(0, Code.length() - 1);
			}
		}
		this.PushSourceCode(Code);
	}

	@Override public void VisitEmptyNode(GtNode Node) {
	}

	@Override public void VisitIndexerNode(IndexerNode Node) {
		Node.IndexAt.Evaluate(this);
		Node.Expr.Evaluate(this);
		this.PushSourceCode(this.PopSourceCode() + "[" + this.PopSourceCode() + "]");
	}

	@Override public void VisitMessageNode(MessageNode Node) {
		// not support
	}

	@Override public void VisitWhileNode(WhileNode Node) {
		Node.CondExpr.Evaluate(this);
		/*local*/String Program = "while " + this.PopSourceCode() + " ;do" + this.LineFeed;
		this.VisitBlockWithIndent(Node.LoopBody, true);
		Program += this.PopSourceCode() + "done";
		this.PushSourceCode(Program);
	}

	@Override public void VisitDoWhileNode(DoWhileNode Node) {
		this.VisitBlockWithIndent(Node.LoopBody, true);
		/*local*/String LoopBody = this.PopSourceCode();
		/*local*/String Program = "if true ;then" + this.LineFeed + LoopBody + "fi" + this.LineFeed;
		Node.CondExpr.Evaluate(this);
		Program += "while " + this.PopSourceCode() + " ;do" + this.LineFeed;
		Program += LoopBody + "done";
		this.PushSourceCode(Program);
	}

	@Override public void VisitForNode(ForNode Node) {
		Node.IterExpr.Evaluate(this);
		Node.CondExpr.Evaluate(this);
		/*local*/String Cond = this.PopSourceCode();
		/*local*/String Iter = this.PopSourceCode();
		
		/*local*/String Program = "for((; " + Cond  + "; " + Iter + " )) ;do" + this.LineFeed;
		this.VisitBlockWithIndent(Node.LoopBody, true);
		Program += this.PopSourceCode() + "done";
		this.PushSourceCode(Program);
	}

	@Override public void VisitForEachNode(ForEachNode Node) {
		Node.IterExpr.Evaluate(this);
		Node.Variable.Evaluate(this);
		/*local*/String Variable = this.PopSourceCode();
		/*local*/String Iter = this.PopSourceCode();
		
		/*local*/String Program = "for " + Variable + " in " + "${" + Iter + "[@]} ;do" + this.LineFeed;
		this.VisitBlockWithIndent(Node.LoopBody, true);
		Program += this.PopSourceCode() + "done";
		this.PushSourceCode(Program);
	}

	@Override public void VisitConstNode(ConstNode Node) {
		/*local*/String value = this.StringfyConstValue(Node.ConstValue);

		if(Node.Type.equals(Node.Type.Context.BooleanType)) {
			if(value.equals("true")) {
				value = "0";
			}
			else if(value.equals("false")) {
				value = "1";
			}
		}
		this.PushSourceCode(value);
	}

	@Override public void VisitNewNode(NewNode Node) {
//		/*local*/String Type = Node.Type.ShortClassName;
//		this.PushSourceCode("new " + Type);
	}

	@Override public void VisitNullNode(NullNode Node) {
		this.PushSourceCode("NULL");
	}

	@Override public void VisitLocalNode(LocalNode Node) {
		this.PushSourceCode(Node.NativeName);
	}

	@Override public void VisitGetterNode(GetterNode Node) {
		// not support
	}

	private String[] EvaluateParam(ArrayList<GtNode> Params) {
		/*local*/int Size = Params.size();
		/*local*/String[] Programs = new String[Size];
		/*local*/int i = 0;
		while(i < Size) {
			/*local*/GtNode Node = Params.get(i);
			Node.Evaluate(this);
			Programs[Size - i - 1] = this.ResolveValueType(Node, this.PopSourceCode());
			i = i + 1;
		}
		return Programs;
	}

	@Override public void VisitApplyNode(ApplyNode Node) {
		/*local*/String Program = Node.Func.GetNativeFuncName() + " ";
		/*local*/String[] Params = this.EvaluateParam(Node.Params);
		/*local*/int i = 0;
		while(i < Params.length) {
			/*local*/String P = Params[i];
			if(i != 0) {
				Program += " ";
			}
			Program += P;
			i = i + 1;
		}
		this.PushSourceCode(Program);
	}

	@Override public void VisitSuffixNode(SuffixNode Node) {
		/*local*/String FuncName = Node.Token.ParsedText;
		if(FuncName.equals("++")) {
		}
		else if(FuncName.equals("--")) {
		}
		else {
			LangDeps.DebugP(FuncName + " is not supported suffix operator!!");
		}
		Node.Expr.Evaluate(this);
		this.PushSourceCode("((" + this.PopSourceCode() + FuncName + "))");
	}

	@Override public void VisitUnaryNode(UnaryNode Node) {
		/*local*/String FuncName = Node.Token.ParsedText;
		if(FuncName.equals("+")) {
		}
		else if(FuncName.equals("-")) {
		}
		else if(FuncName.equals("~")) {
		}
		else if(FuncName.equals("!")) {
		}
		else if(FuncName.equals("++")) {
		}
		else if(FuncName.equals("--")) {
		}
		else {
			LangDeps.DebugP(FuncName + " is not supported unary operator!!");
		}
		Node.Expr.Evaluate(this);
		this.PushSourceCode("((" + FuncName + this.PopSourceCode() + "))");
	}

	@Override public void VisitBinaryNode(BinaryNode Node) {
		/*local*/String FuncName = Node.Token.ParsedText;
		if(Node.Type.equals(Node.Type.Context.StringType)) {
			Node.RightNode.Evaluate(this);
			Node.LeftNode.Evaluate(this);

			if(FuncName.equals("+")) {
				this.PushSourceCode(this.PopSourceCode() + this.PopSourceCode());
				return;
			}
			else if(FuncName.equals("!=")) {
			}
			else if(FuncName.equals("==")) {
			}
			else {
				LangDeps.DebugP(FuncName + " is not supported binary operator!!");
			}

			Node.RightNode.Evaluate(this);
			Node.LeftNode.Evaluate(this);
			/*local*/String left = this.ResolveValueType(Node.LeftNode, this.PopSourceCode());
			/*local*/String right = this.ResolveValueType(Node.RightNode, this.PopSourceCode());
			this.PushSourceCode("((" + this.PopSourceCode() + " " + left  + " " + right + "))");
			return;
		}

		if(FuncName.equals("+")) {
		}
		else if(FuncName.equals("-")) {
		}
		else if(FuncName.equals("*")) {
		}
		else if(FuncName.equals("/")) {
		}
		else if(FuncName.equals("%")) {
		}
		else if(FuncName.equals("<<")) {
		}
		else if(FuncName.equals(">>")) {
		}
		else if(FuncName.equals("&")) {
		}
		else if(FuncName.equals("|")) {
		}
		else if(FuncName.equals("^")) {
		}
		else if(FuncName.equals("<=")) {
		}
		else if(FuncName.equals("<")) {
		}
		else if(FuncName.equals(">=")) {
		}
		else if(FuncName.equals(">")) {
		}
		else if(FuncName.equals("!=")) {
		}
		else if(FuncName.equals("==")) {
		}
		else {
			LangDeps.DebugP(FuncName + " is not supported binary operator!!");
		}

		Node.RightNode.Evaluate(this);
		Node.LeftNode.Evaluate(this);
		/*local*/String left = this.ResolveValueType(Node.LeftNode, this.PopSourceCode());
		/*local*/String right = this.ResolveValueType(Node.RightNode, this.PopSourceCode());
		
//		if(Node.Type.equals(Node.Type.Context.Float)) {	// support float value
//			this.PushSourceCode("(echo \"scale=10; " + left + " " + FuncName + " " + right + "\" | bc)");
//			return;
//		}
		
		this.PushSourceCode("((" + left + " " + FuncName + " " + right + "))");
	}

	@Override public void VisitAndNode(AndNode Node) {
		Node.RightNode.Evaluate(this);
		Node.LeftNode.Evaluate(this);
		this.PushSourceCode("(" + this.PopSourceCode() + " && " + this.PopSourceCode() + ")");
	}

	@Override public void VisitOrNode(OrNode Node) {
		Node.RightNode.Evaluate(this);
		Node.LeftNode.Evaluate(this);
		this.PushSourceCode("(" + this.PopSourceCode() + " || " + this.PopSourceCode() + ")");
	}

	@Override public void VisitAssignNode(AssignNode Node) {
		Node.RightNode.Evaluate(this);
		Node.LeftNode.Evaluate(this);
		/*local*/String left = this.PopSourceCode();
		/*local*/String code = this.PopSourceCode();
		/*local*/String right = this.ResolveValueType(Node.RightNode, code);

		this.PushSourceCode(left + "=" + right);
	}

	@Override public void VisitLetNode(LetNode Node) {
		/*local*/String VarName = Node.VariableName;
		/*local*/String Code = "";
		if(this.inFunc) {
			Code += "local " + VarName + this.LineFeed + this.GetIndentString();
		}
		Code += VarName;
		if(Node.InitNode != null) {
			Node.InitNode.Evaluate(this);
			Code += "=" + this.ResolveValueType(Node.InitNode, this.PopSourceCode());
		}
		Code +=  this.LineFeed;
		this.VisitBlockWithIndent(Node.BlockNode, false);
		this.PushSourceCode(Code + this.PopSourceCode());
	}

	@Override public void VisitIfNode(IfNode Node) {
		Node.CondExpr.Evaluate(this);
		this.VisitBlockWithIndent(Node.ThenNode, true);
		this.VisitBlockWithIndent(Node.ElseNode, true);
		
		/*local*/String ElseBlock = this.PopSourceCode();
		/*local*/String ThenBlock = this.PopSourceCode();
		/*local*/String CondExpr = this.PopSourceCode();
		/*local*/String Code = "if " + CondExpr + " ;then" + this.LineFeed + ThenBlock;
		if(Node.ElseNode != null) {
			Code += "else" + this.LineFeed + ElseBlock;
		}
		Code += "fi";
		this.PushSourceCode(Code);
	}

	@Override public void VisitSwitchNode(SwitchNode Node) {
	}

	@Override public void VisitReturnNode(ReturnNode Node) {
		if(this.inFunc && Node.Expr != null) {
			Node.Expr.Evaluate(this);
			/*local*/String expr = this.PopSourceCode();
			/*local*/String ret = this.ResolveValueType(Node.Expr, expr);
			if(Node.Expr instanceof ApplyNode || Node.Expr instanceof CommandNode) {
				if(Node.Type.equals(Node.Type.Context.BooleanType) || 
						Node.Type.equals(Node.Type.Context.IntType)) {
					/*local*/String Code = "local value=" + ret + this.LineFeed;
					Code += this.GetIndentString() + "local ret=$?" + this.LineFeed;
					Code += this.GetIndentString() + "echo $value" + this.LineFeed;
					Code += this.GetIndentString() + "return $ret" + this.LineFeed;
					this.PushSourceCode(Code);
					return;
				}
			}
			this.PushSourceCode("echo " + ret + this.LineFeed + this.GetIndentString() + "return 0");
		}
	}

	@Override public void VisitLabelNode(LabelNode Node) {
	}

	@Override public void VisitJumpNode(JumpNode Node) {
	}

	@Override public void VisitBreakNode(BreakNode Node) {
		/*local*/String Code = "break";	// not support label
		this.PushSourceCode(Code);
	}

	@Override public void VisitContinueNode(ContinueNode Node) {
		/*local*/String Code = "continue";	// not support label
		this.PushSourceCode(Code);
	}

	@Override public void VisitTryNode(TryNode Node) {
//		/*local*/String Code = "try";
//		//this.VisitEach(Node.CatchBlock);
//		this.VisitEach(Node.TryBlock);
//		Code += this.PopSourceCode();
//		if(Node.FinallyBlock != null) {
//			this.VisitEach(Node.FinallyBlock);
//			Code += " finally " + this.PopSourceCode();
//		}
//		this.PushSourceCode(Code);
	}

	@Override public void VisitThrowNode(ThrowNode Node) {
//		Node.Expr.Evaluate(this);
//		String Code = "throw " + this.PopSourceCode();
//		this.PushSourceCode(Code);
	}

	@Override public void VisitFunctionNode(FunctionNode Node) {
	}

	@Override public void VisitErrorNode(ErrorNode Node) {
//		/*local*/String Code = "throw Error(\"" + Node.Token.ParsedText + "\")";
//		this.PushSourceCode(Code);
	}

	@Override public void VisitCommandNode(CommandNode Node) {
		/*local*/String Code = "";
		/*local*/int count = 0;
		/*local*/CommandNode CurrentNode = Node;
		while(CurrentNode != null) {
			if(count > 0) {
				Code += " | ";
			}
			Code += this.AppendCommand(CurrentNode);
			count += 1;
			CurrentNode = (/*cast*/CommandNode) CurrentNode.PipedNextNode;
		}
		this.PushSourceCode(this.CreateCommandFunc(Code, Node));
		
		//sample
//		function f() {
//			echo -e "$(pstree -p | grep firefox)" >&2
//			echo "ret sucess"
//		}
//
//		ret=$(f)
		
	}

	private String AppendCommand(CommandNode CurrentNode) {
		/*local*/String Code = "";
		/*local*/int size = CurrentNode.Params.size();
		/*local*/int i = 0;
		while(i < size) {
			CurrentNode.Params.get(i).Evaluate(this);
			Code += this.PopSourceCode() + " ";
			i = i + 1;
		}
		return Code;
	}
	
	private String CreateCommandFunc(String cmd, CommandNode Node) {
		/*local*/String FuncName = "execCmd";
		/*local*/String RunnableCmd = cmd;
		if(Node.Type.equals(Node.Type.Context.StringType)) {
			RunnableCmd = "function " + FuncName + this.cmdCounter + "() {" + this.LineFeed;
			RunnableCmd += this.GetIndentString() + "echo $(" + cmd + ")" + this.LineFeed;
			RunnableCmd += this.GetIndentString() + "return 0" + this.LineFeed + "}" + this.LineFeed;
			this.WriteLineCode(RunnableCmd);
			RunnableCmd = FuncName + this.cmdCounter;
			this.cmdCounter++;
		}
		else if(Node.Type.equals(Node.Type.Context.IntType) || 
				Node.Type.equals(Node.Type.Context.BooleanType)) {
			RunnableCmd = "function " + FuncName + this.cmdCounter + "() {" + this.LineFeed;
			RunnableCmd += this.GetIndentString() + cmd + " >&2" + this.LineFeed;
			RunnableCmd += this.GetIndentString() + "local ret=$?" + this.LineFeed;
			RunnableCmd += this.GetIndentString() + "echo $ret" + this.LineFeed;
			RunnableCmd += this.GetIndentString() + "return $ret" + this.LineFeed + "}" + this.LineFeed;
			this.WriteLineCode(RunnableCmd);
			RunnableCmd = FuncName + this.cmdCounter;
			this.cmdCounter++;
		}
		
		return RunnableCmd;
	}

	private GtNode ResolveParamName(ArrayList<String> ParamNameList, GtNode Body) {
		return this.ConvertParamName(ParamNameList, Body, 0);
	}

	private GtNode ConvertParamName(ArrayList<String> ParamNameList, GtNode Body, int index) {
		if(ParamNameList == null || index  == ParamNameList.size()) {
			return Body;
		}

		/*local*/GtNode oldVarNode = new LocalNode(null, null, "" +(index + 1));
		/*local*/GtNode Let = new LetNode(null, null, null, ParamNameList.get(index), oldVarNode, null);
		Let.NextNode = this.ConvertParamName(ParamNameList, Body, index+1);
		return Let;
	}

	private String ResolveValueType(GtNode TargetNode, String value) {
		/*local*/String resolvedValue;
		
		if(TargetNode instanceof ConstNode || TargetNode instanceof NullNode) {
			resolvedValue = value;
		}
		else if(TargetNode instanceof IndexerNode) {
			resolvedValue = "${" + value + "}";
		}
		else if(TargetNode instanceof ApplyNode || TargetNode instanceof CommandNode) {
			resolvedValue = "$(" + value + ")";
		}
		else {
			resolvedValue = "$" + value;
		}
		return resolvedValue;
	}

	@Override public void GenerateFunc(GtFunc Func, ArrayList<String> ParamNameList, GtNode Body) {
		/*local*/String Function = "function ";
		this.inFunc = true;
		Function += Func.GetNativeFuncName() + "() {" + this.LineFeed;
		this.VisitBlockWithIndent(this.ResolveParamName(ParamNameList, Body), true);
		Function += this.PopSourceCode() + "}" + this.LineFeed;
		this.WriteLineCode(Function);
		this.inFunc = false;
	}

	@Override public Object Eval(GtNode Node) {
		this.VisitBlockWithIndent(Node, false);
		/*local*/String Code = this.PopSourceCode();
		if(Code.equals("")) {
			return "";
		}
		this.WriteLineCode(Code);
		return Code;
	}

	@Override public void AddClass(GtType Type) {
	}

}