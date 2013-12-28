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
import java.util.ArrayList;

import zen.ast.GtAndNode;
import zen.ast.GtApplyNode;
import zen.ast.GtBinaryNode;
import zen.ast.GtBlockNode;
import zen.ast.GtBooleanNode;
import zen.ast.GtCastNode;
import zen.ast.GtConstPoolNode;
import zen.ast.GtErrorNode;
import zen.ast.GtFloatNode;
import zen.ast.GtFuncDeclNode;
import zen.ast.GtFunctionLiteralNode;
import zen.ast.GtGetCapturedNode;
import zen.ast.GtGetLocalNode;
import zen.ast.GtGetterNode;
import zen.ast.GtIfNode;
import zen.ast.GtIntNode;
import zen.ast.GtMethodCall;
import zen.ast.GtNode;
import zen.ast.GtNullNode;
import zen.ast.GtOrNode;
import zen.ast.GtParamNode;
import zen.ast.GtReturnNode;
import zen.ast.GtSetCapturedNode;
import zen.ast.GtSetLocalNode;
import zen.ast.GtSetterNode;
import zen.ast.GtStringNode;
import zen.ast.GtTrinaryNode;
import zen.ast.GtUnaryNode;
import zen.ast.GtVarDeclNode;
import zen.deps.LibZen;
//endif VAJA

public class GtSourceGenerator extends GtGenerator {
	/*field*/private final ArrayList<GtSourceBuilder> BuilderList;
	/*field*/protected GtSourceBuilder HeaderBuilder;
	/*field*/protected GtSourceBuilder CurrentBuilder;
	
	/*field*/public String    Tab;
	/*field*/public String    LineFeed;
	/*field*/public String    LineComment;
	/*field*/public String    BeginComment;
	/*field*/public String    EndComment;
	/*field*/public String    SemiColon;
	/*field*/public String    Camma;

	/*field*/public String    TrueLiteral;
	/*field*/public String    FalseLiteral;
	/*field*/public String    NullLiteral;

	public GtSourceGenerator/*constructor*/(String TargetCode, String TargetVersion) {
		super(TargetCode, TargetVersion);
		this.BuilderList = new ArrayList<GtSourceBuilder>();
		this.HeaderBuilder = this.NewSourceBuilder();
		this.CurrentBuilder = this.HeaderBuilder;
		this.LineFeed = "\n";
		this.Tab = "   ";
		this.LineComment = "//";  // if not, set null
		this.BeginComment = "/*";
		this.EndComment   = "*/";
		this.Camma = ", ";
		this.SemiColon   = ";";
		this.TrueLiteral  = "true";
		this.FalseLiteral = "false";
		this.NullLiteral  = "null";
	}
	
	protected GtSourceBuilder NewSourceBuilder() {
		/*local*/GtSourceBuilder Builder = new GtSourceBuilder(this);
		this.BuilderList.add(Builder);
		return Builder;
	}

	@Override
	public Object EvalTopLevelNode(GtNode Node) {
		String Code = this.CurrentBuilder.toString();
		System.out.println(Code);
		this.CurrentBuilder.Clear();
		return null;
	}
	
//	public final void FlushErrorReport() {
//		/*local*/GtSourceBuilder Builder = this.NewSourceBuilder();
//		/*local*/String[] Reports = this.Logger.GetReportedErrors();
//		/*local*/int i = 0;
//		Builder.AppendLine("");
//		while(i < Reports.length) {
//			Builder.AppendCommentLine(Reports[i]);
//			i = i + 1;
//		}
//		Builder.AppendLine("");
//	}

	public void VisitNode(GtNode Node) {
		Node.Accept(this);
	}
	
	@Override
	public void VisitBlockNode(GtBlockNode Node) {
		this.CurrentBuilder.Append("{");
		this.CurrentBuilder.Indent();
		for(int i = 0; i < Node.NodeList.size(); i++) {
			GtNode SubNode = Node.NodeList.get(i);
			this.CurrentBuilder.AppendLineFeed();
			this.CurrentBuilder.AppendIndent();
			this.VisitNode(SubNode);
			this.CurrentBuilder.Append(this.SemiColon);
		}
		this.CurrentBuilder.UnIndent();
		this.CurrentBuilder.AppendLineFeed();
		this.CurrentBuilder.AppendIndent();
		this.CurrentBuilder.Append("}");
	}

	@Override
	public void VisitNullNode(GtNullNode Node) {
		this.CurrentBuilder.Append(this.NullLiteral);
	}

	@Override
	public void VisitBooleanNode(GtBooleanNode Node) {
		if(Node.Value) {
			this.CurrentBuilder.Append(this.TrueLiteral);
		}
		else {
			this.CurrentBuilder.Append(this.FalseLiteral);
		}		
	}

	@Override
	public void VisitIntNode(GtIntNode Node) {
		this.CurrentBuilder.Append(""+Node.Value);
	}

	@Override
	public void VisitFloatNode(GtFloatNode Node) {
		this.CurrentBuilder.Append(""+Node.Value);
	}

	@Override
	public void VisitStringNode(GtStringNode Node) {
		this.CurrentBuilder.Append(LibZen.QuoteString(Node.Value));
	}

	@Override
	public void VisitConstPoolNode(GtConstPoolNode Node) {
		// TODO Auto-generated method stub
		
	}

	@Override
	public void VisitGetLocalNode(GtGetLocalNode Node) {
		this.CurrentBuilder.Append(Node.NativeName);
	}

	@Override
	public void VisitSetLocalNode(GtSetLocalNode Node) {
		this.CurrentBuilder.Append(Node.NativeName);
		this.CurrentBuilder.Append(" = ");
		this.VisitNode(Node.ValueNode);
	}

	@Override
	public void VisitGetCapturedNode(GtGetCapturedNode Node) {
		this.CurrentBuilder.Append(Node.NativeName);
	}

	@Override
	public void VisitSetCapturedNode(GtSetCapturedNode Node) {
		this.CurrentBuilder.Append(Node.NativeName);
		this.CurrentBuilder.Append(" = ");
		this.VisitNode(Node.ValueNode);
	}

	@Override
	public void VisitGetterNode(GtGetterNode Node) {
		this.VisitNode(Node.RecvNode);
		this.CurrentBuilder.Append(".");
		this.CurrentBuilder.Append(Node.NativeName);
	}

	@Override
	public void VisitSetterNode(GtSetterNode Node) {
		this.VisitNode(Node.RecvNode);
		this.CurrentBuilder.Append(".");
		this.CurrentBuilder.Append(Node.NativeName);
		this.CurrentBuilder.Append(" = ");
		this.VisitNode(Node.ValueNode);
	}

	@Override
	public void VisitMethodCallNode(GtMethodCall Node) {
		// TODO Auto-generated method stub
		this.VisitNode(Node.RecvNode);
		this.CurrentBuilder.Append(".");
		this.CurrentBuilder.Append(Node.MethodName);
		this.CurrentBuilder.Append("(");
		for(int i = 0; i < Node.ParamList.size(); i++) {
			GtNode ParamNode = Node.ParamList.get(i);
			if(i > 0) {
				this.CurrentBuilder.Append(", ");
			}
			this.VisitNode(ParamNode);
		}
		this.CurrentBuilder.Append(")");
	}

	@Override
	public void VisitApplyNode(GtApplyNode Node) {
		this.VisitNode(Node.FuncNode);
		this.CurrentBuilder.Append("(");
		for(int i = 0; i < Node.ParamList.size(); i++) {
			GtNode ParamNode = Node.ParamList.get(i);
			if(i > 0) {
				this.CurrentBuilder.Append(", ");
			}
			this.VisitNode(ParamNode);
		}
		this.CurrentBuilder.Append(")");
	}

	@Override
	public void VisitAndNode(GtAndNode Node) {
		this.VisitNode(Node.LeftNode);
		this.CurrentBuilder.Append(" && ");
		this.VisitNode(Node.RightNode);
	}

	@Override
	public void VisitOrNode(GtOrNode Node) {
		this.VisitNode(Node.LeftNode);
		this.CurrentBuilder.Append(" || ");
		this.VisitNode(Node.RightNode);
	}

	@Override
	public void VisitUnaryNode(GtUnaryNode Node) {
		this.CurrentBuilder.Append(Node.Token.ParsedText);
		this.VisitNode(Node.RecvNode);
	}

	@Override
	public void VisitBinaryNode(GtBinaryNode Node) {
		this.VisitNode(Node.LeftNode);
		this.CurrentBuilder.Append(" " + Node.Token.ParsedText + " ");
		this.VisitNode(Node.RightNode);
		
	}

	@Override
	public void VisitTrinaryNode(GtTrinaryNode Node) {
		// TODO Auto-generated method stub
	}

	@Override
	public void VisitCastNode(GtCastNode Node) {
		// TODO Auto-generated method stub
		
	}

	@Override
	public void VisitVarDeclNode(GtVarDeclNode Node) {
		// TODO Auto-generated method stub
		
	}

	@Override
	public void VisitIfNode(GtIfNode Node) {
		// TODO Auto-generated method stub
		
	}

	@Override
	public void VisitReturnNode(GtReturnNode Node) {
		// TODO Auto-generated method stub
		
	}

	@Override
	public void VisitParamNode(GtParamNode Node) {
		// TODO Auto-generated method stub
		
	}

	@Override
	public void VisitFunctionLiteralNode(GtFunctionLiteralNode Node) {
		// TODO Auto-generated method stub
		
	}

	@Override
	public void VisitFuncDeclNode(GtFuncDeclNode FuncDeclNode) {
		// TODO Auto-generated method stub
		
	}

	@Override
	public void VisitBlock(GtNode Node) {
		// TODO Auto-generated method stub
		
	}

	@Override
	public void VisitErrorNode(GtErrorNode Node) {
		this.ReportError(GreenTeaConsts.ErrorLevel, Node.Token, Node.ErrorMessage);
		//this.BreakGeneration();
	}

//	@Override public String GetSourceCode() {
//		/*local*/String SourceCode = "";
//		for(/*local*/int i = 0; i < LibZen.ListSize(this.BuilderList); i++) {
//			/*local*/GtSourceBuilder Builder = this.BuilderList.get(i);
//			for(/*local*/int j = 0; j < LibZen.ListSize(Builder.SourceList); j++) {
//				SourceCode += Builder.SourceList.get(j);
//			}
//			SourceCode += "\n";
//		}
//		return SourceCode;
//	}
//
//	@Override public void FlushBuffer() {
//		LibZen.WriteSource(this.OutputFile, this.BuilderList);
//		this.BuilderList.clear();
//		this.HeaderBuilder.SourceList.clear();
//	}
//
//	public void VisitIndentBlock(String BeginBlock, GtNode Node, String EndBlock) {
//		this.CurrentBuilder.AppendLine(BeginBlock);
//		this.CurrentBuilder.Indent();
//		/*local*/GtNode CurrentNode = Node;
//		while(CurrentNode != null) {
//			if(!this.IsEmptyBlock(CurrentNode)) {
//				this.CurrentBuilder.AppendIndent();
//				CurrentNode.Accept(this);
//				this.CurrentBuilder.AppendLine(this.SemiColon);
//			}
//			CurrentNode = CurrentNode.NextNode;
//		}
//		this.CurrentBuilder.UnIndent();
//		if(EndBlock != null) {
//			this.CurrentBuilder.IndentAndAppend(EndBlock);
//		}
//	}
//	
//	protected String StringifyConstValue(Object ConstValue) {
//		if(ConstValue == null) {
//			return this.NullLiteral;
//		}
//		if(ConstValue instanceof Boolean) {
//			if(ConstValue.equals(true)) {
//				return this.TrueLiteral;
//			}
//			else {
//				return this.FalseLiteral;
//			}
//		}
//		if(ConstValue instanceof String) {
//			return LibZen.QuoteString((/*cast*/String)ConstValue);
//		}
//		if(ConstValue instanceof GreenTeaEnum) {
//			return "" + ((/*cast*/GreenTeaEnum) ConstValue).EnumValue;
//		}
//		return ConstValue.toString();
//	}
//
//	public void ExpandNativeMacro(String NativeMacro, ArrayList<GtNode> ParamList) {
//		/*local*/int ParamSize = LibZen.ListSize(ParamList);
//		/*local*/int ParamIndex = 0;
//		/*local*/GtSourceBuilder CurrentBuilder = this.CurrentBuilder;
//		while(ParamIndex < ParamSize) {
//			this.CurrentBuilder = new GtSourceBuilder(this);
//			ParamList.get(ParamIndex).Accept(this);
//			/*local*/String Param = this.CurrentBuilder.toString();
//			NativeMacro = NativeMacro.replace("$" + (ParamIndex + 1), Param);
//			ParamIndex += 1;
//		}
//		this.CurrentBuilder = CurrentBuilder;
//		this.CurrentBuilder.Append(NativeMacro);
//	}
	
}
