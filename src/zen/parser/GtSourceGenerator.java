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
import zen.ast.GtGroupNode;
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

	public boolean VisitNode(GtNode Node) {
		return Node.Accept(this);
	}
	
	@Override
	public boolean VisitBlockNode(GtBlockNode Node) {
		this.CurrentBuilder.Append("{");
		this.CurrentBuilder.Indent();
		for(int i = 0; i < Node.NodeList.size(); i++) {
			GtNode SubNode = Node.NodeList.get(i);
			this.CurrentBuilder.AppendLineFeed();
			this.CurrentBuilder.AppendIndent();
			if(!this.VisitNode(SubNode)) {
				return false;
			}
			this.CurrentBuilder.Append(this.SemiColon);
		}
		this.CurrentBuilder.UnIndent();
		this.CurrentBuilder.AppendLineFeed();
		this.CurrentBuilder.AppendIndent();
		this.CurrentBuilder.Append("}");
		return true;
	}

	@Override
	public boolean VisitNullNode(GtNullNode Node) {
		this.CurrentBuilder.Append(this.NullLiteral);
		return true;
	}

	@Override
	public boolean VisitBooleanNode(GtBooleanNode Node) {
		if(Node.Value) {
			this.CurrentBuilder.Append(this.TrueLiteral);
		}
		else {
			this.CurrentBuilder.Append(this.FalseLiteral);
		}		
		return true;
	}

	@Override
	public boolean VisitIntNode(GtIntNode Node) {
		this.CurrentBuilder.Append(""+Node.Value);
		return true;
	}

	@Override
	public boolean VisitFloatNode(GtFloatNode Node) {
		this.CurrentBuilder.Append(""+Node.Value);
		return true;
	}

	@Override
	public boolean VisitStringNode(GtStringNode Node) {
		this.CurrentBuilder.Append(LibZen.QuoteString(Node.Value));
		return true;
	}

	@Override
	public boolean VisitConstPoolNode(GtConstPoolNode Node) {
		// TODO Auto-generated method stub
		return true;
	}

	@Override
	public boolean VisitGetLocalNode(GtGetLocalNode Node) {
		this.CurrentBuilder.Append(Node.NativeName);
		return true;
	}

	@Override
	public boolean VisitSetLocalNode(GtSetLocalNode Node) {
		this.CurrentBuilder.Append(Node.NativeName);
		this.CurrentBuilder.Append(" = ");
		this.VisitNode(Node.ValueNode);
		return true;
	}

	@Override
	public boolean VisitGetCapturedNode(GtGetCapturedNode Node) {
		this.CurrentBuilder.Append(Node.NativeName);
		return true;
	}

	@Override
	public boolean VisitSetCapturedNode(GtSetCapturedNode Node) {
		this.CurrentBuilder.Append(Node.NativeName);
		this.CurrentBuilder.Append(" = ");
		this.VisitNode(Node.ValueNode);
		return true;
	}

	@Override
	public boolean VisitGetterNode(GtGetterNode Node) {
		this.VisitNode(Node.RecvNode);
		this.CurrentBuilder.Append(".");
		this.CurrentBuilder.Append(Node.NativeName);
		return true;
	}

	@Override
	public boolean VisitSetterNode(GtSetterNode Node) {
		this.VisitNode(Node.RecvNode);
		this.CurrentBuilder.Append(".");
		this.CurrentBuilder.Append(Node.NativeName);
		this.CurrentBuilder.Append(" = ");
		this.VisitNode(Node.ValueNode);
		return true;
	}

	@Override
	public boolean VisitMethodCallNode(GtMethodCall Node) {
		// TODO Auto-generated method stub
		this.VisitNode(Node.RecvNode);
		this.CurrentBuilder.Append(".");
		this.CurrentBuilder.Append(Node.MethodName);
		this.VisitParamList(Node.ParamList);
		return true;
	}

	@Override
	public boolean VisitApplyNode(GtApplyNode Node) {
		this.VisitNode(Node.FuncNode);
		this.VisitParamList(Node.ParamList);
		return true;
	}

	@Override
	public boolean VisitAndNode(GtAndNode Node) {
		this.VisitNode(Node.LeftNode);
		this.CurrentBuilder.AppendToken("&&");
		this.VisitNode(Node.RightNode);
		return true;
	}

	@Override
	public boolean VisitOrNode(GtOrNode Node) {
		this.VisitNode(Node.LeftNode);
		this.CurrentBuilder.AppendToken("||");
		this.VisitNode(Node.RightNode);
		return true;
	}

	@Override
	public boolean VisitUnaryNode(GtUnaryNode Node) {
		this.CurrentBuilder.Append(Node.SourceToken.ParsedText);
		this.VisitNode(Node.RecvNode);
		return true;
	}

	@Override
	public boolean VisitBinaryNode(GtBinaryNode Node) {
		this.VisitNode(Node.LeftNode);
		this.CurrentBuilder.AppendToken(Node.SourceToken.ParsedText);
		this.VisitNode(Node.RightNode);
		return true;
	}

	@Override
	public boolean VisitTrinaryNode(GtTrinaryNode Node) {
		// TODO Auto-generated method stub
		return true;
	}

	@Override
	public boolean VisitCastNode(GtCastNode Node) {
		// TODO Auto-generated method stub
		return true;
	}

	@Override
	public boolean VisitVarDeclNode(GtVarDeclNode Node) {
		// TODO Auto-generated method stub
		return true;
	}

	@Override
	public boolean VisitIfNode(GtIfNode Node) {
		// TODO Auto-generated method stub
		this.CurrentBuilder.Append("if");
		this.CurrentBuilder.Append("(");
		this.VisitNode(Node.CondNode);
		this.CurrentBuilder.Append(") ");
		boolean Then = this.VisitNode(Node.ThenNode);
		if(Node.ElseNode != null) {
			this.CurrentBuilder.AppendToken("else");
			boolean Else = this.VisitNode(Node.ElseNode);
			return Then || Else;
		}
		return true;
	}

	@Override
	public boolean VisitReturnNode(GtReturnNode Node) {
		// TODO Auto-generated method stub
		this.CurrentBuilder.Append("return");
		if(Node.ValueNode != null) {
			this.CurrentBuilder.Append(" ");
			this.VisitNode(Node.ValueNode);
		}
		return false;
	}

	@Override
	public boolean VisitParamNode(GtParamNode Node) {
		this.CurrentBuilder.Append(Node.Type.GetNativeName());
		this.CurrentBuilder.Append(" ");
		this.CurrentBuilder.Append(Node.Name);
		return true;
	}

	@Override
	public boolean VisitFunctionLiteralNode(GtFunctionLiteralNode Node) {
		// TODO Auto-generated method stub
		return true;
	}

	@Override
	public boolean VisitFuncDeclNode(GtFuncDeclNode Node) {
		//Node.TypeNode
		this.CurrentBuilder.Append("def ");
		this.CurrentBuilder.Append(Node.FuncName);
		this.VisitParamList(Node.ArgumentList);
		if(Node.BodyNode == null) {
			this.CurrentBuilder.Append(this.SemiColon);
		}
		else {
			this.VisitNode(Node.BodyNode);
		}
		return true;
	}


	@Override
	public boolean VisitErrorNode(GtErrorNode Node) {
		this.ReportError(GreenTeaConsts.ErrorLevel, Node.SourceToken, Node.ErrorMessage);
		//this.BreakGeneration();
		return false;
	}
	
	// Utils
	
	protected boolean VisitType(GtType Type) {
		this.CurrentBuilder.Append(Type.toString());
		return true;
	}
	
	protected boolean VisitParamList(ArrayList<GtNode> ParamList) {
		this.CurrentBuilder.Append("(");
		for(int i = 0; i < ParamList.size(); i++) {
			GtNode ParamNode = ParamList.get(i);
			if(i > 0) {
				this.CurrentBuilder.Append(", ");
			}
			this.VisitNode(ParamNode);
		}
		this.CurrentBuilder.Append(")");
		return true;
	}

	@Override
	public boolean VisitGroupNode(GtGroupNode Node) {
		this.CurrentBuilder.Append("(");
		this.VisitNode(Node.RecvNode);
		this.CurrentBuilder.Append(")");
		return true;
	}

//	@Override public void FlushBuffer() {
//		LibZen.WriteSource(this.OutputFile, this.BuilderList);
//		this.BuilderList.clear();
//		this.HeaderBuilder.SourceList.clear();
//	}
	
}