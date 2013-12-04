package org.GreenTeaScript;

import java.util.ArrayList;

public class CommonLispSourceGenerator extends GtSourceGenerator {

	public CommonLispSourceGenerator(String TargetCode, String OutputFile, int GeneratorFlag) {
		super(TargetCode, OutputFile, GeneratorFlag);
	}

	@Override public void VisitLocalNode(GtLocalNode Node) {
		this.VisitingBuilder.Append(Node.Token.ParsedText);
	}

	@Override public void VisitConstNode(GtConstNode Node) {
		// XXX Correct ??
		switch (Node.Token.ParsedText) {
		case "true":
			this.VisitingBuilder.Append("t");
			break;
		case "false":
		case "null":
			this.VisitingBuilder.Append("nil");
			break;
		default:
			this.VisitingBuilder.Append(Node.Token.ParsedText);
			break;
		}
	}

	private final boolean DoesNodeExist(GtNode Node){
		return Node != null && !(Node instanceof GtEmptyNode);
	}

	@Override public void VisitReturnNode(GtReturnNode Node) {
		if (this.DoesNodeExist(Node.Expr)) {
			Node.Expr.Evaluate(this);
		}
	}

	@Override public void VisitNullNode(GtNullNode Node) {
		this.VisitingBuilder.Append("nil");
	}

	@Override
	public void VisitIndentBlock(String BeginBlock, GtNode Node, String EndBlock) {
		//this.VisitingBuilder.AppendLine(BeginBlock);
		this.VisitingBuilder.Indent();
		/*local*/GtNode CurrentNode = Node;
		while(CurrentNode != null) {
			if(!this.IsEmptyBlock(CurrentNode)) {
				this.VisitingBuilder.AppendIndent();
				CurrentNode.Evaluate(this);
				this.VisitingBuilder.AppendLine("");
			}
			CurrentNode = CurrentNode.NextNode;
		}
		this.VisitingBuilder.UnIndent();
		if(EndBlock != null) {
			//this.VisitingBuilder.IndentAndAppend(EndBlock);
		}
	}

	@Override
	public void GenerateFunc(GtFunc Func, ArrayList<String> ParamNameList, GtNode Body) {
		String MethodName = Func.GetNativeFuncName();
		GtSourceBuilder Builder = new GtSourceBuilder(this);
		GtSourceBuilder PushedBuilder = this.VisitingBuilder;
		this.VisitingBuilder = Builder;
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

		this.VisitingBuilder = Builder;
		this.VisitIndentBlock("", Body, "");

		this.VisitingBuilder = PushedBuilder;
		Builder.AppendLine(")");

		// for debug
		System.out.println(Builder.toString());
	}

	//
	// Visitor API
	//
	@Override public void VisitWhileNode(GtWhileNode Node) {
		this.VisitingBuilder.Append("(while ");

		Node.CondExpr.Evaluate(this);

		this.VisitingBuilder.AppendLine("");
		this.VisitIndentBlock("", Node.LoopBody, "");
		this.VisitingBuilder.AppendIndent();
		this.VisitingBuilder.Append(")");
	}

	@Override public void VisitDoWhileNode(GtDoWhileNode Node) {
		this.VisitingBuilder.AppendLine("(loop initially");

		this.VisitingBuilder.AppendIndent();
		this.VisitingBuilder.AppendIndent();

		this.VisitingBuilder.AppendLine("(progn");
		this.VisitIndentBlock("", Node.LoopBody, "");

		this.VisitingBuilder.AppendIndent();
		this.VisitingBuilder.AppendIndent();
		this.VisitingBuilder.AppendLine(")");

		this.VisitingBuilder.AppendIndent();
		this.VisitingBuilder.AppendIndent();

		this.VisitingBuilder.Append("while ");
		Node.CondExpr.Evaluate(this);
		this.VisitingBuilder.AppendLine("");
		this.VisitingBuilder.AppendIndent();
		this.VisitingBuilder.AppendIndent();

		this.VisitingBuilder.AppendLine("do (progn");
		this.VisitIndentBlock("", Node.LoopBody, "");
		this.VisitingBuilder.AppendIndent();
		this.VisitingBuilder.AppendIndent();
		this.VisitingBuilder.Append(")");
		this.VisitingBuilder.Append(")");
	}

	@Override public void VisitForNode(GtForNode Node) {
		this.VisitingBuilder.Append("(loop while ");
		Node.CondExpr.Evaluate(this);
		this.VisitingBuilder.AppendLine("");

		this.VisitingBuilder.AppendIndent();
		this.VisitingBuilder.AppendIndent();
		this.VisitingBuilder.AppendLine("do (progn");
		this.VisitIndentBlock("", Node.LoopBody, "");

		this.VisitingBuilder.AppendIndent();
		this.VisitingBuilder.AppendIndent();
		Node.IterExpr.Evaluate(this);
		this.VisitingBuilder.Append(")");

		this.VisitingBuilder.Append(")");
	}

	@Override public void VisitVarNode(GtVarNode Node) {
		this.VisitingBuilder.Append("(setq  ");
		this.VisitingBuilder.Append(Node.NativeName);
		this.VisitingBuilder.Append(" ");

		if (Node.InitNode != null) {
			Node.InitNode.Evaluate(this);
		} else {
			this.VisitingBuilder.Append("nil");
		}

		this.VisitingBuilder.AppendLine(")");
	}

	@Override public void VisitTrinaryNode(GtTrinaryNode Node) {
		this.VisitingBuilder.Append("(if  ");
		Node.ConditionNode.Evaluate(this);
		this.VisitingBuilder.Append(" ");
		Node.ThenNode.Evaluate(this);
		this.VisitingBuilder.Append(" ");
		Node.ElseNode.Evaluate(this);
		this.VisitingBuilder.Append(")");
	}

	@Override public void VisitIfNode(GtIfNode Node) {
		this.VisitingBuilder.Append("(if  ");
		Node.CondExpr.Evaluate(this);
		this.VisitingBuilder.AppendLine("");

		this.VisitingBuilder.AppendIndent();
		this.VisitingBuilder.AppendIndent();
		this.VisitingBuilder.AppendLine("(progn ");
		this.VisitIndentBlock("", Node.ThenNode, "");
		this.VisitingBuilder.AppendIndent();
		this.VisitingBuilder.AppendIndent();
		this.VisitingBuilder.AppendLine(")");

		if (!this.IsEmptyBlock(Node.ElseNode)) {
			this.VisitingBuilder.AppendIndent();
			this.VisitingBuilder.AppendIndent();
			this.VisitingBuilder.AppendLine("(progn ");
			this.VisitIndentBlock("", Node.ElseNode, "");
			this.VisitingBuilder.AppendIndent();
			this.VisitingBuilder.AppendIndent();
			this.VisitingBuilder.Append(")");
		}

		this.VisitingBuilder.Append(")");
	}

	@Override public void VisitErrorNode(GtErrorNode Node) {
		this.VisitingBuilder.Append("(error ");
		Node.Evaluate(this);
		this.VisitingBuilder.Append(")");
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
		this.VisitingBuilder = this.NewSourceBuilder();
		this.VisitingBuilder.Append("(");
		this.VisitingBuilder.Append(MainFuncName);
		this.VisitingBuilder.AppendLine(")");
	}

	@Override public void VisitUnaryNode(GtUnaryNode Node) {
		this.VisitingBuilder.Append(Node.Token.ParsedText);
		Node.Expr.Evaluate(this);
	}

	@Override public void VisitBinaryNode(GtBinaryNode Node) {
		this.VisitingBuilder.Append("(");
		this.VisitingBuilder.Append(Node.Token.ParsedText);
		this.VisitingBuilder.Append(" ");
		Node.LeftNode.Evaluate(this);
		this.VisitingBuilder.Append(" ");
		Node.RightNode.Evaluate(this);
		this.VisitingBuilder.Append(")");
	}

	@Override public void VisitAndNode(GtAndNode Node) {
		this.VisitingBuilder.Append("(and ");
		Node.LeftNode.Evaluate(this);
		this.VisitingBuilder.Append(" ");
		Node.RightNode.Evaluate(this);
		this.VisitingBuilder.Append(")");
	}
	@Override public void VisitOrNode(GtOrNode Node) {
		this.VisitingBuilder.Append("(or ");
		Node.LeftNode.Evaluate(this);
		this.VisitingBuilder.Append(" ");
		Node.RightNode.Evaluate(this);
		this.VisitingBuilder.Append(")");
	}

	@Override public void VisitAssignNode(GtAssignNode Node) {
		this.VisitingBuilder.Append("(setq  ");
		Node.LeftNode.Evaluate(this);
		this.VisitingBuilder.Append(" ");
		Node.RightNode.Evaluate(this);
		this.VisitingBuilder.Append(")");
	}

	// TODO function call

	// XXX
	//@Override public void VisitSwitchNode(GtSwitchNode Node) {
	//}

	// XXX
	//@Override public void VisitSelfAssignNode(GtSelfAssignNode Node) {
	//}

}
