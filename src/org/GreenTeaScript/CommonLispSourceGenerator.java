package org.GreenTeaScript;

import java.util.ArrayList;

public class CommonLispSourceGenerator extends GtSourceGenerator {

	public CommonLispSourceGenerator(String TargetCode, String OutputFile, int GeneratorFlag) {
		super(TargetCode, OutputFile, GeneratorFlag);
	}
	
	@Override
	public void VisitLocalNode(GtLocalNode Node) {
		this.VisitingBuilder.Append(Node.Token.ParsedText);
	}
	
	@Override
	public void VisitConstNode(GtConstNode Node) {
		this.VisitingBuilder.Append(Node.Token.ParsedText);
	}
	
	@Override
	public void VisitBinaryNode(GtBinaryNode Node) {
		this.VisitingBuilder.Append("(");
		this.VisitingBuilder.Append(Node.Token.ParsedText);
		this.VisitingBuilder.Append(" ");
		Node.LeftNode.Evaluate(this);
		this.VisitingBuilder.Append(" ");
		Node.RightNode.Evaluate(this);
		this.VisitingBuilder.Append(")");
	}
	
	@Override
	public void VisitReturnNode(GtReturnNode Node) {
		this.VisitingBuilder.Append("(");
		Node.Expr.Evaluate(this);
		this.VisitingBuilder.Append(")");
	}
	
	@Override
	public void VisitNullNode(GtNullNode Node) {
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
		Builder.Append(MethodName);
		this.VisitIndentBlock("(", Body, ")");
		Builder.Append(")");
		this.VisitingBuilder = PushedBuilder;
		Builder.AppendLine("");
		System.out.println(Builder.toString());
	}
}
