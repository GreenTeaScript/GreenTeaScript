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

package org.GreenTeaScript;

import java.util.ArrayList;

import parser.GtClassField;
import parser.GtFieldInfo;
import parser.GtFunc;
import parser.GtSourceBuilder;
import parser.GtSourceGenerator;
import parser.GtSyntaxTree;
import parser.GtType;
import parser.ast.GtAndNode;
import parser.ast.GtBinaryNode;
import parser.ast.GtBooleanNode;
import parser.ast.GtConstPoolNode;
import parser.ast.GtDoWhileNode;
import parser.ast.GtEmptyNode;
import parser.ast.GtErrorNode;
import parser.ast.GtForNode;
import parser.ast.GtGetLocalNode;
import parser.ast.GtIfNode;
import parser.ast.GtIntNode;
import parser.ast.GtNode;
import parser.ast.GtNullNode;
import parser.ast.GtOrNode;
import parser.ast.GtReturnNode;
import parser.ast.GtSetLocalNode;
import parser.ast.GtStringNode;
import parser.ast.GtTrinaryNode;
import parser.ast.GtUnaryNode;
import parser.ast.GtVarDeclNode;
import parser.ast.GtWhileNode;
import parser.deps.LibGreenTea;

public class CommonLispSourceGenerator extends GtSourceGenerator {

	public CommonLispSourceGenerator(String TargetCode, String OutputFile, int GeneratorFlag) {
		super(TargetCode, OutputFile, GeneratorFlag);
	}

	@Override public void VisitGetLocalNode(GtGetLocalNode Node) {
		this.CurrentBuilder.Append(Node.Token.ParsedText);
	}
	
	@Override public void VisitBooleanNode(GtBooleanNode Node) {
		if(Node.Value) {
			this.CurrentBuilder.Append("t");
		}
		else {
			this.CurrentBuilder.Append("nil");
		}
	}
	@Override public void VisitIntNode(GtIntNode Node) {
		this.CurrentBuilder.Append(Node.Token.ParsedText);
	}

	@Override public void VisitStringNode(GtStringNode Node) {
		this.CurrentBuilder.Append(Node.Token.ParsedText);
	}
	@Override public void VisitConstPoolNode(GtConstPoolNode Node) {
		if(Node.ConstValue == null) {
			this.CurrentBuilder.Append("nil");
		}
		else {
			this.CurrentBuilder.Append(Node.Token.ParsedText);
		}
	}

	private final boolean DoesNodeExist(GtNode Node){
		return Node != null && !(Node instanceof GtEmptyNode);
	}

	@Override public void VisitReturnNode(GtReturnNode Node) {
		if (this.DoesNodeExist(Node.ValueNode)) {
			Node.ValueNode.Accept(this);
		}
	}

	@Override public void VisitNullNode(GtNullNode Node) {
		this.CurrentBuilder.Append("nil");
	}

	@Override
	public void VisitIndentBlock(String BeginBlock, GtNode Node, String EndBlock) {
		//this.VisitingBuilder.AppendLine(BeginBlock);
		this.CurrentBuilder.Indent();
		/*local*/GtNode CurrentNode = Node;
		while(CurrentNode != null) {
			if(!this.IsEmptyBlock(CurrentNode)) {
				this.CurrentBuilder.AppendIndent();
				CurrentNode.Accept(this);
				this.CurrentBuilder.AppendLine("");
			}
			CurrentNode = CurrentNode.NextNode;
		}
		this.CurrentBuilder.UnIndent();
		if(EndBlock != null) {
			//this.VisitingBuilder.IndentAndAppend(EndBlock);
		}
	}

	@Override
	public void GenerateFunc(GtFunc Func, ArrayList<String> ParamNameList, GtNode Body) {
		String MethodName = Func.GetNativeFuncName();
		GtSourceBuilder Builder = new GtSourceBuilder(this);
		GtSourceBuilder PushedBuilder = this.CurrentBuilder;
		this.CurrentBuilder = Builder;
		Builder.Append("(defun ");
		Builder.SpaceAppendSpace(MethodName);

		Builder.Append("(");

		/*local*/int i = 0;
		/*local*/int size = LibGreenTea.ListSize(ParamNameList);
		while (i < size) {
			if(i != 0) {
				Builder.Append(" ");
			}
			Builder.Append(ParamNameList.get(i));
			i += 1;
		}
		Builder.AppendLine(")");

		this.CurrentBuilder = Builder;
		this.VisitIndentBlock("", Body, "");

		this.CurrentBuilder = PushedBuilder;
		Builder.AppendLine(")");

		// for debug
		System.out.println(Builder.toString());
	}

	//
	// Visitor API
	//
	@Override public void VisitWhileNode(GtWhileNode Node) {
		this.CurrentBuilder.Append("(while ");

		Node.CondNode.Accept(this);

		this.CurrentBuilder.AppendLine("");
		this.VisitIndentBlock("", Node.BodyNode, "");
		this.CurrentBuilder.AppendIndent();
		this.CurrentBuilder.Append(")");
	}

	@Override public void VisitDoWhileNode(GtDoWhileNode Node) {
		this.CurrentBuilder.AppendLine("(loop initially");

		this.CurrentBuilder.AppendIndent();
		this.CurrentBuilder.AppendIndent();

		this.CurrentBuilder.AppendLine("(progn");
		this.VisitIndentBlock("", Node.BodyNode, "");

		this.CurrentBuilder.AppendIndent();
		this.CurrentBuilder.AppendIndent();
		this.CurrentBuilder.AppendLine(")");

		this.CurrentBuilder.AppendIndent();
		this.CurrentBuilder.AppendIndent();

		this.CurrentBuilder.Append("while ");
		Node.CondNode.Accept(this);
		this.CurrentBuilder.AppendLine("");
		this.CurrentBuilder.AppendIndent();
		this.CurrentBuilder.AppendIndent();

		this.CurrentBuilder.AppendLine("do (progn");
		this.VisitIndentBlock("", Node.BodyNode, "");
		this.CurrentBuilder.AppendIndent();
		this.CurrentBuilder.AppendIndent();
		this.CurrentBuilder.Append(")");
		this.CurrentBuilder.Append(")");
	}

	@Override public void VisitForNode(GtForNode Node) {
		this.CurrentBuilder.Append("(loop while ");
		Node.CondNode.Accept(this);
		this.CurrentBuilder.AppendLine("");

		this.CurrentBuilder.AppendIndent();
		this.CurrentBuilder.AppendIndent();
		this.CurrentBuilder.AppendLine("do (progn");
		this.VisitIndentBlock("", Node.BodyNode, "");

		this.CurrentBuilder.AppendIndent();
		this.CurrentBuilder.AppendIndent();
		Node.IterNode.Accept(this);
		this.CurrentBuilder.Append(")");

		this.CurrentBuilder.Append(")");
	}

	@Override public void VisitVarDeclNode(GtVarDeclNode Node) {
		this.CurrentBuilder.Append("(setq  ");
		this.CurrentBuilder.Append(Node.NativeName);
		this.CurrentBuilder.Append(" ");

		if (Node.InitNode != null) {
			Node.InitNode.Accept(this);
		} else {
			this.CurrentBuilder.Append("nil");
		}

		this.CurrentBuilder.AppendLine(")");
	}

	@Override public void VisitTrinaryNode(GtTrinaryNode Node) {
		this.CurrentBuilder.Append("(if  ");
		Node.CondNode.Accept(this);
		this.CurrentBuilder.Append(" ");
		Node.ThenNode.Accept(this);
		this.CurrentBuilder.Append(" ");
		Node.ElseNode.Accept(this);
		this.CurrentBuilder.Append(")");
	}

	@Override public void VisitIfNode(GtIfNode Node) {
		this.CurrentBuilder.Append("(if  ");
		Node.CondNode.Accept(this);
		this.CurrentBuilder.AppendLine("");

		this.CurrentBuilder.AppendIndent();
		this.CurrentBuilder.AppendIndent();
		this.CurrentBuilder.AppendLine("(progn ");
		this.VisitIndentBlock("", Node.ThenNode, "");
		this.CurrentBuilder.AppendIndent();
		this.CurrentBuilder.AppendIndent();
		this.CurrentBuilder.AppendLine(")");

		if (!this.IsEmptyBlock(Node.ElseNode)) {
			this.CurrentBuilder.AppendIndent();
			this.CurrentBuilder.AppendIndent();
			this.CurrentBuilder.AppendLine("(progn ");
			this.VisitIndentBlock("", Node.ElseNode, "");
			this.CurrentBuilder.AppendIndent();
			this.CurrentBuilder.AppendIndent();
			this.CurrentBuilder.Append(")");
		}

		this.CurrentBuilder.Append(")");
	}

	@Override public void VisitErrorNode(GtErrorNode Node) {
		this.CurrentBuilder.Append("(error ");
		Node.Accept(this);
		this.CurrentBuilder.Append(")");
	}

	@Override public void OpenClassField(GtSyntaxTree ParsedTree, GtType Type, GtClassField ClassField) {
		GtSourceBuilder Builder = new GtSourceBuilder(this);

		Builder.Append("(defclass ");
		Builder.Append(Type.ShortName);
		Builder.Append(" " + "()");

		Builder.Append(" " + "(");
		for (GtFieldInfo FieldInfo : ClassField.FieldList) {
			String InitValue = this.StringifyConstValue(FieldInfo.InitValue);

			Builder.Append("(");
			Builder.Append(FieldInfo.NativeName);
			Builder.Append(" :initarg :" + FieldInfo.NativeName);

			if (!FieldInfo.Type.IsNativeType()) {
				InitValue = "nil";
			}

			Builder.Append(" :initform " + InitValue);
			Builder.Append(")");
		}
		Builder.Append("))");

		// for debug
		System.out.println(Builder.toString());
	}

	@Override public void InvokeMainFunc(String MainFuncName) {
		this.CurrentBuilder = this.NewSourceBuilder();
		this.CurrentBuilder.Append("(");
		this.CurrentBuilder.Append(MainFuncName);
		this.CurrentBuilder.AppendLine(")");
	}

	@Override public void VisitUnaryNode(GtUnaryNode Node) {
		this.CurrentBuilder.Append(Node.Token.ParsedText);
		Node.RecvNode.Accept(this);
	}

	@Override public void VisitBinaryNode(GtBinaryNode Node) {
		this.CurrentBuilder.Append("(");
		this.CurrentBuilder.Append(Node.Token.ParsedText);
		this.CurrentBuilder.Append(" ");
		Node.LeftNode.Accept(this);
		this.CurrentBuilder.Append(" ");
		Node.RightNode.Accept(this);
		this.CurrentBuilder.Append(")");
	}

	@Override public void VisitAndNode(GtAndNode Node) {
		this.CurrentBuilder.Append("(and ");
		Node.LeftNode.Accept(this);
		this.CurrentBuilder.Append(" ");
		Node.RightNode.Accept(this);
		this.CurrentBuilder.Append(")");
	}
	@Override public void VisitOrNode(GtOrNode Node) {
		this.CurrentBuilder.Append("(or ");
		Node.LeftNode.Accept(this);
		this.CurrentBuilder.Append(" ");
		Node.RightNode.Accept(this);
		this.CurrentBuilder.Append(")");
	}

	@Override public void VisitSetLocalNode(GtSetLocalNode Node) {
		this.CurrentBuilder.Append("(setq  " + Node.NativeName);
		this.CurrentBuilder.Append(" ");
		Node.ValueNode.Accept(this);
		this.CurrentBuilder.Append(")");
	}

	// TODO function call

	// XXX
	//@Override public void VisitSwitchNode(GtSwitchNode Node) {
	//}

	// XXX
	//@Override public void VisitSelfAssignNode(GtSelfAssignNode Node) {
	//}

}
