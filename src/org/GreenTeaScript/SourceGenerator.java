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

@Deprecated
public class SourceGenerator extends GtGenerator {
	/*field*/protected String    HeaderSource;
	/*field*/protected String    BodySource;

	/*field*/protected String    Tab;
	/*field*/protected String    LineFeed;
	/*field*/protected int       IndentLevel;
	/*field*/protected String    CurrentLevelIndentString;

	/*field*/protected boolean   HasLabelSupport;
	/*field*/protected String    LogicalOrOperator;
	/*field*/protected String    LogicalAndOperator;
	/*field*/protected String    MemberAccessOperator;
	/*field*/protected String    TrueLiteral;
	/*field*/protected String    FalseLiteral;
	/*field*/protected String    NullLiteral;
	/*field*/protected String    LineComment;
	/*field*/protected String    BreakKeyword;
	/*field*/protected String    ContinueKeyword;
	/*field*/protected String    ParameterBegin;
	/*field*/protected String    ParameterEnd;
	/*field*/protected String    ParameterDelimiter;
	/*field*/protected String    SemiColon;
	/*field*/protected String    BlockBegin;
	/*field*/protected String    BlockEnd;

	public SourceGenerator/*constructor*/(String TargetCode, String OutputFile, int GeneratorFlag) {
		super(TargetCode, OutputFile, GeneratorFlag);
		this.LineFeed = "\n";
		this.IndentLevel = 0;
		this.Tab = "   ";
		this.CurrentLevelIndentString = null;
		this.HeaderSource = "";
		this.BodySource = "";
		this.HasLabelSupport = false;
		this.LogicalOrOperator  = "||";
		this.LogicalAndOperator = "&&";
		this.MemberAccessOperator = ".";
		this.TrueLiteral  = "true";
		this.FalseLiteral = "false";
		this.NullLiteral  = "null";
		this.BreakKeyword = "break";
		this.ContinueKeyword = "continue";
		this.LineComment  = "//";
		this.ParameterBegin = "(";
		this.ParameterEnd = ")";
		this.ParameterDelimiter = ",";
		this.SemiColon = ";";
		this.BlockBegin = "{";
		this.BlockEnd = "}";
	}

	@Override public void InitContext(GtParserContext Context) {
		super.InitContext(Context);
		this.HeaderSource = "";
		this.BodySource = "";
	}

	public final void WriteHeader(String Text) {
		this.HeaderSource += Text;
	}

	public final void WriteLineHeader(String Text) {
		this.HeaderSource += Text + this.LineFeed;
	}

	public final void WriteCode(String Text) {
		this.BodySource += Text;
	}

	public final void WriteLineCode(String Text) {
		this.BodySource += Text + this.LineFeed;
	}

	public final void WriteLineComment(String Text) {
		this.BodySource += this.LineComment + " " + Text + this.LineFeed;
	}

	public final void FlushErrorReport() {
		this.WriteLineCode("");
		/*local*/String[] Reports = this.Context.GetReportedErrors();
		/*local*/int i = 0;
		while(i < Reports.length) {
			this.WriteLineComment(Reports[i]);
			i = i + 1;
		}
		this.WriteLineCode("");		
	}

	@Override public void FlushBuffer() {
		LibGreenTea.WriteCode(this.OutputFile, this.HeaderSource + this.BodySource);			
		this.HeaderSource = "";
		this.BodySource = "";
	}

	/* GeneratorUtils */

	public final void Indent() {
		this.IndentLevel += 1;
		this.CurrentLevelIndentString = null;
	}

	public final void UnIndent() {
		this.IndentLevel -= 1;
		this.CurrentLevelIndentString = null;
		LibGreenTea.Assert(this.IndentLevel >= 0);
	}

	public final String GetIndentString() {
		if(this.CurrentLevelIndentString == null) {
			this.CurrentLevelIndentString = JoinStrings(this.Tab, this.IndentLevel);
		}
		return this.CurrentLevelIndentString;
	}

	public String VisitBlockWithIndent(GtNode Node, boolean NeedBlock) {
		/*local*/String Code = "";
		if(NeedBlock) {
			Code += this.BlockBegin + this.LineFeed;
			this.Indent();
		}
		/*local*/GtNode CurrentNode = Node;
		while(CurrentNode != null) {
			if(!this.IsEmptyBlock(CurrentNode)) {
				/*local*/String Stmt = this.VisitNode(CurrentNode);
				if(!LibGreenTea.EqualsString(Stmt, "")) {
					Code += this.GetIndentString() + Stmt + this.SemiColon + this.LineFeed;
				}
			}
			CurrentNode = CurrentNode.NextNode;
		}
		if(NeedBlock) {
			this.UnIndent();
			Code += this.GetIndentString() + this.BlockEnd;
		}
//		else if(Code.length() > 0) {
//			Code = Code.substring(0, Code.length() - 1);
//		}
		return Code;
	}

	protected String StringifyConstValue(Object ConstValue) {
		if(ConstValue == null) {
			return this.NullLiteral;
		}
		if(ConstValue instanceof Boolean) {
			if(ConstValue.equals(true)) {
				return this.TrueLiteral;
			}
			else {
				return this.FalseLiteral;
			}
		}
		if(ConstValue instanceof String) {
			return LibGreenTea.QuoteString((/*cast*/String)ConstValue);
		}
		if(ConstValue instanceof GreenTeaEnum) {
			return "" + ((/*cast*/GreenTeaEnum) ConstValue).EnumValue;
		}
		return ConstValue.toString();
	}

	protected String GetNewOperator(GtType Type) {
		return "new " + Type.ShortName + "()";
	}

	protected final void PushSourceCode(String Code) {
		this.PushCode(Code);
	}

	protected final String PopSourceCode() {
		return (/*cast*/String) this.PopCode();
	}

	public final String VisitNode(GtNode Node) {
		Node.Evaluate(this);
		return this.PopSourceCode();
	}

	public final String JoinCode(String BeginCode, int BeginIdx, String[] ParamCode, String EndCode, String Delim) {
		/*local*/String JoinedCode = BeginCode;
		/*local*/int i = BeginIdx;
		while(i < ParamCode.length) {
			/*local*/String P = ParamCode[i];
			if(i != BeginIdx) {
				JoinedCode += Delim;
			}
			JoinedCode += P;
			i = i + 1;
		}
		return JoinedCode + EndCode;
	}

	public final static String GenerateApplyFunc1(GtFunc Func, String FuncName, boolean IsSuffixOp, String Arg1) {
		/*local*/String Macro = null;
		if(Func != null) {
			FuncName = Func.GetNativeFuncName();
			if(IsFlag(Func.FuncFlag, NativeMacroFunc)) {
				Macro = Func.GetNativeMacro();
			}
		}
		if(Macro == null) {
			if(IsSuffixOp) {
				Macro = "$1 " + FuncName;
			}
			else {
				Macro = FuncName + " $1";
			}
		}
		return Macro.replace("$1", Arg1);
	}

	public final static String GenerateApplyFunc2(GtFunc Func, String FuncName, String Arg1, String Arg2) {
		/*local*/String Macro = null;
		if(Func != null) {
			FuncName = Func.GetNativeFuncName();
			if(IsFlag(Func.FuncFlag, NativeMacroFunc)) {
				Macro = Func.GetNativeMacro();
			}
		}
		if(Macro == null) {
			Macro = "$1 " + FuncName + " $2";
		}
		return Macro.replace("$1", Arg1).replace("$2", Arg2);
	}

	public String GenerateFuncTemplate(int ParamSize, GtFunc Func) {
		/*local*/int BeginIdx = 0;
		/*local*/String Template = "";
		/*local*/boolean IsNative = false;
		if(Func == null) {
			Template = "$1";
			BeginIdx += 1;
		}
		else if(Func.Is(NativeFunc)) {
			Template = "$1" + this.MemberAccessOperator + Func.FuncName;
			BeginIdx += 1;
		}
		else if(Func.Is(NativeMacroFunc)) {
			Template = Func.GetNativeMacro();
			IsNative = true;
		}
		else {
			Template = Func.GetNativeFuncName();
		}

		if(Func.Is(ConverterFunc)) {
			// T1 converter(FromType, ToType, Value);
			BeginIdx += 1;
		}
		/*local*/int i = BeginIdx;
		if(IsNative == false) {
			Template += this.ParameterBegin;
			while(i < ParamSize) {
				if(i != BeginIdx) {
					Template += this.ParameterDelimiter + " ";
				}
				Template += "$" + (i + 1);
				i = i + 1;
			}
			Template += this.ParameterEnd;
		}
		return Template;
	}

	public final String ApplyMacro(String Template, ArrayList<GtNode> NodeList) {
		/*local*/int ParamSize = LibGreenTea.ListSize(NodeList);
		/*local*/int ParamIndex = 0;
		while(ParamIndex < ParamSize) {
			/*local*/String Param = this.VisitNode(NodeList.get(ParamIndex));
			Template = Template.replace("$" + (ParamIndex + 1), Param);
			ParamIndex = ParamIndex  + 1;
		}
		return Template;
	}
	public final String ApplyMacro2(String Template, String[] ParamList) {
		/*local*/int ParamSize = ParamList.length;
		/*local*/int ParamIndex = 0;
		while(ParamIndex < ParamSize) {
			/*local*/String Param = ParamList[ParamIndex];
			Template = Template.replace("$" + (ParamIndex + 1), Param);
			ParamIndex = ParamIndex + 1;
		}
		return Template;
	}

	public final String GenerateApplyFunc(GtStaticApplyNode Node) {
		/*local*/int ParamSize = LibGreenTea.ListSize(Node.ParamList);
		/*local*/String Template = this.GenerateFuncTemplate(ParamSize, Node.Func);
		return this.ApplyMacro(Template, Node.ParamList);
	}

	// Visitor API
	@Override public void VisitEmptyNode(GtEmptyNode Node) {
		this.PushSourceCode("");
	}

	@Override public void VisitInstanceOfNode(GtInstanceOfNode Node) {
		this.PushSourceCode(this.VisitNode(Node.ExprNode) + " instanceof " + Node.TypeInfo);
	}

	@Override public final void VisitConstNode(GtConstNode Node) {
		this.PushSourceCode(this.StringifyConstValue(Node.ConstValue));
	}

	@Override public final void VisitNullNode(GtNullNode Node) {
		this.PushSourceCode(this.NullLiteral);
	}

	@Override public void VisitLocalNode(GtLocalNode Node) {
		this.PushSourceCode(Node.NativeName);
	}

	@Override public void VisitReturnNode(GtReturnNode Node) {
		/*local*/String Code = "return";
		if(Node.Expr != null) {
			Code += " " + this.VisitNode(Node.Expr);
		}
		this.PushSourceCode(Code);
		this.StopVisitor(Node);
	}

	@Override public void VisitIndexerNode(GtIndexerNode Node) {
		this.PushSourceCode(this.VisitNode(Node.Expr) + "[" + this.VisitNode(Node.GetAt(0)) + "]"); // FIXME: Multi
	}

	@Override public final void VisitConstructorNode(GtConstructorNode Node) {
		/*local*/int ParamSize = LibGreenTea.ListSize(Node.ParamList);
		/*local*/String Template = this.GenerateFuncTemplate(ParamSize, Node.Func);
		this.PushSourceCode(this.ApplyMacro(Template, Node.ParamList));
	}

	@Override public void VisitNewNode(GtNewNode Node) {
		this.PushSourceCode(this.GetNewOperator(Node.Type));
	}

	@Override public void VisitStaticApplyNode(GtStaticApplyNode Node) {
		/*local*/String Program = this.GenerateApplyFunc(Node);
		this.PushSourceCode(Program);
	}

	@Override public void VisitSuffixNode(GtSuffixNode Node) {
		/*local*/String FuncName = Node.Token.ParsedText;
		/*local*/String Expr = this.VisitNode(Node.Expr);
		if(LibGreenTea.EqualsString(FuncName, "++")) {
		}
		else if(LibGreenTea.EqualsString(FuncName, "--")) {
		}
		else {
			LibGreenTea.DebugP(FuncName + " is not supported suffix operator!!");
		}
		this.PushSourceCode("(" + SourceGenerator.GenerateApplyFunc1(Node.Func, FuncName, true, Expr) + ")");
	}

	@Override public void VisitSelfAssignNode(GtSelfAssignNode Node) {
		/*local*/String FuncName = Node.Token.ParsedText;
		/*local*/String Left = this.VisitNode(Node.LeftNode);
		/*local*/String Right = this.VisitNode(Node.RightNode);
		this.PushSourceCode(Left + " = " + SourceGenerator.GenerateApplyFunc2(Node.Func, FuncName, Left, Right));
	}

	@Override public void VisitUnaryNode(GtUnaryNode Node) {
		/*local*/String FuncName = Node.Token.ParsedText;
		/*local*/String Expr = this.VisitNode(Node.Expr);
		this.PushSourceCode("(" + SourceGenerator.GenerateApplyFunc1(Node.Func, FuncName, false, Expr) + ")");
	}

	@Override public void VisitBinaryNode(GtBinaryNode Node) {
		/*local*/String FuncName = Node.Token.ParsedText;
		/*local*/String Left = this.VisitNode(Node.LeftNode);
		/*local*/String Right = this.VisitNode(Node.RightNode);
		this.PushSourceCode("(" + SourceGenerator.GenerateApplyFunc2(Node.Func, FuncName, Left, Right) + ")");
	}

	@Override public void VisitGetterNode(GtGetterNode Node) {
		this.PushSourceCode(this.VisitNode(Node.RecvNode) + this.MemberAccessOperator + Node.Func.FuncName);
	}
	@Override public void VisitAssignNode(GtAssignNode Node) {
		this.PushSourceCode(this.VisitNode(Node.LeftNode) + " = " + this.VisitNode(Node.RightNode));
	}

	@Override public void VisitAndNode(GtAndNode Node) {
		/*local*/String Left = this.VisitNode(Node.LeftNode);
		/*local*/String Right = this.VisitNode(Node.RightNode);
		this.PushSourceCode("(" + Left + " " + this.LogicalAndOperator +" " + Right + ")");
	}

	@Override public void VisitOrNode(GtOrNode Node) {
		/*local*/String Left = this.VisitNode(Node.LeftNode);
		/*local*/String Right = this.VisitNode(Node.RightNode);
		this.PushSourceCode("(" + Left + " " + this.LogicalOrOperator +" " + Right + ")");
	}

	@Override public void VisitTrinaryNode(GtTrinaryNode Node) {
		/*local*/String CondExpr = this.VisitNode(Node.ConditionNode);
		/*local*/String ThenExpr = this.VisitNode(Node.ThenNode);
		/*local*/String ElseExpr = this.VisitNode(Node.ElseNode);
		this.PushSourceCode("((" + CondExpr + ")? " + ThenExpr + " : " + ElseExpr + ")");
	}

	@Override public void VisitBreakNode(GtBreakNode Node) {
		/*local*/String Code = this.BreakKeyword;
		if(this.HasLabelSupport) {
			/*local*/String Label = Node.Label;
			if(Label != null) {
				Code += " " + Label;
			}
		}
		this.PushSourceCode(Code);
		this.StopVisitor(Node);
	}

	@Override public void VisitContinueNode(GtContinueNode Node) {
		/*local*/String Code = this.ContinueKeyword;
		if(this.HasLabelSupport) {
			/*local*/String Label = Node.Label;
			if(Label != null) {
				Code += " " + Label;
			}
		}
		this.PushSourceCode(Code);
		this.StopVisitor(Node);
	}

	@Override public void VisitSwitchNode(GtSwitchNode Node) {
		/*local*/String Code = "switch (" + this.VisitNode(Node.MatchNode) + ") {" + this.LineFeed;
		/*local*/int i = 0;
		while(i < Node.CaseList.size()) {
			/*local*/GtNode Case  = Node.CaseList.get(i);
			/*local*/GtNode Block = Node.CaseList.get(i+1);
			Code += this.GetIndentString() + "case " + this.VisitNode(Case) + ":";
			if(this.IsEmptyBlock(Block)) {
				this.Indent();
				Code += this.LineFeed + this.GetIndentString() + "/* fall-through */" + this.LineFeed;
				this.UnIndent();
			}
			else {
				Code += this.VisitBlockWithIndent(Block, true) + this.LineFeed;
			}
			i = i + 2;
		}
		if(Node.DefaultBlock != null) {
			Code += this.GetIndentString() + "default: ";
			Code += this.VisitBlockWithIndent(Node.DefaultBlock, true) + this.LineFeed;
		}
		Code += this.GetIndentString() + "}";
		this.PushSourceCode(Code);
	}

	// EnforceConst API
	@Override public Object EvalNewNode(GtNewNode Node, boolean EnforceConst) {
		if(EnforceConst) {
			this.VisitNewNode(Node);
			return this.PopSourceCode();
		}
		return null;
	}

	@Override public Object EvalNewArrayNode(GtNewArrayNode Node, boolean EnforceConst) {
		if(EnforceConst) {
			this.VisitNewArrayNode(Node);
			return this.PopSourceCode();
		}
		return null;
	}

	public Object EvalGetterNode(GtGetterNode Node, boolean EnforceConst) {
		if(EnforceConst) {
			this.VisitGetterNode(Node);
			return this.PopSourceCode();
		}
		return null;
	}

	public Object EvalSetterNode(GtSetterNode Node, boolean EnforceConst) {
		if(EnforceConst) {
			this.VisitSetterNode(Node);
			return this.PopSourceCode();
		}
		return null;
	}

	@Override public Object EvalStaticApplyNode(GtStaticApplyNode ApplyNode, boolean EnforceConst) {
		if((EnforceConst || ApplyNode.Func.Is(ConstFunc)) /*&& ApplyNode.Func.FuncBody instanceof Method */) {
			this.VisitStaticApplyNode(ApplyNode);
			return this.PopSourceCode();
		}
		return null;
	}
}
