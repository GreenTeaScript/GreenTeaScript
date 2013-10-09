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

//ifdef  JAVA
package org.GreenTeaScript;

import java.util.ArrayList;

import org.GreenTeaScript.GtClassField;
import org.GreenTeaScript.GtFieldInfo;
import org.GreenTeaScript.GtFunc;
import org.GreenTeaScript.GtParserContext;
import org.GreenTeaScript.GtType;
import org.GreenTeaScript.LibGreenTea;

//endif VAJA

//GreenTea Generator should be written in each language.

public class JavaSourceGenerator extends SourceGenerator {
	/* field */String OutFileName;
	/* field */String PackageName;

	public JavaSourceGenerator/* constructor */(String TargetCode, String OutputFile, int GeneratorFlag) {
		super(TargetCode + "-src", OutputFile, GeneratorFlag);
		this.Tab = "\t";
		this.OutFileName = OutputFile;
		this.PackageName = "";
		if(LibGreenTea.EqualsString(this.OutFileName, "-")) {
			this.OutFileName = "GreenTeaDefaultClass";
		}
		else {
			String[] PackageNames = OutputFile.split("/");
			String FileName = PackageNames[PackageNames.length - 1];
			if(FileName.length() > 1 && FileName.endsWith(".java")) {
				this.OutFileName = FileName.replace(".java", "");
			}
			for(int i = 0; i < PackageNames.length - 1; i++) {
				if(i != 0) {
					this.PackageName += ".";
				}
				this.PackageName += PackageNames[i];
			}
			this.OutFileName = PackageNames[PackageNames.length - 1].replace(".java", "");
		}
	}

	@Override
	public void InitContext(GtParserContext Context) {
		super.InitContext(Context);
		if(this.PackageName != "") {
			this.WriteLineCode("package " + this.PackageName + ";");
		}
		this.WriteLineCode("public class " + this.OutFileName + " {");
		this.Indent();
	}

	@Override
	public void FinalizeContext(GtParserContext Context) {
		super.FinalizeContext(Context);
		this.UnIndent();
		this.WriteLineCode("}");
	}

	private String LocalTypeName(GtType Type) {
		if(Type.IsDynamic() || Type.IsNative()) {
			if(Type == Type.PackageNameSpace.Context.IntType) {
				return "long";
			}
			if(Type == Type.PackageNameSpace.Context.FloatType) {
				return "double";
			}
			if(Type == Type.PackageNameSpace.Context.BooleanType) {
				return "boolean";
			}
		}
		return Type.ShortName;
	}

	@Override
	protected String GetNewOperator(GtType Type) {
		/* local */String TypeName = Type.ShortName;
		return "constructor(new " + TypeName + "())";
	}

	@Override
	public void VisitWhileNode(GtWhileNode Node) {
		/* local */String Program = "while(" + this.VisitNode(Node.CondExpr) + ")";
		Program += this.VisitBlockWithIndent(Node.LoopBody, true);
		this.PushSourceCode(Program);
	}

	@Override
	public void VisitDoWhileNode(GtDoWhileNode Node) {
		/* local */String Program = "do" + this.VisitBlockWithIndent(Node.LoopBody, true);
		Program += " while(" + this.VisitNode(Node.CondExpr) + ")";
		this.PushSourceCode(Program);
	}

	@Override
	public void VisitForNode(GtForNode Node) {
		/* local */String Cond = this.VisitNode(Node.CondExpr);
		/* local */String Iter = this.VisitNode(Node.IterExpr);
		/* local */String Program = "for(; " + Cond + "; " + Iter + ") ";
		Program += this.VisitBlockWithIndent(Node.LoopBody, true);
		this.PushSourceCode(Program);
	}

	@Override
	public void VisitGetterNode(GtGetterNode Node) {
		/* local */String Program = this.VisitNode(Node.ExprNode);
		/* local */String FieldName = Node.Func.FuncName;
		Program = Program + "." + FieldName;
		this.PushSourceCode(Program);
	}

	@Override
	public void VisitSetterNode(GtSetterNode Node) {
		/* local */String Program = this.VisitNode(Node.LeftNode);
		/* local */String FieldName = Node.Func.FuncName;
		Program = Program + "." + FieldName + " = " + this.VisitNode(Node.RightNode);
		this.PushSourceCode(Program);
	}

	@Override
	public void VisitVarNode(GtVarNode Node) {
		/* local */String Type = this.LocalTypeName(Node.DeclType);
		/* local */String VarName = Node.NativeName;
		/* local */String Code = Type + " " + VarName;
		/* local */boolean CreateNewScope = false;
		if(Node.InitNode != null) {
			Code += " = " + this.VisitNode(Node.InitNode);
		}
		Code += ";" + this.LineFeed;
		if(CreateNewScope) {
			Code += this.GetIndentString();
		}
		Code += this.VisitBlockWithIndent(Node.BlockNode, CreateNewScope);
		this.PushSourceCode(Code + this.PopSourceCode());
	}

	@Override
	public void VisitIfNode(GtIfNode Node) {
		/* local */String CondExpr = this.VisitNode(Node.CondExpr);
		/* local */String ThenBlock = this.VisitBlockWithIndent(Node.ThenNode, true);
		/* local */String Code = "if(" + CondExpr + ") " + ThenBlock;
		if(!this.IsEmptyBlock(Node.ElseNode)) {
			/* local */boolean CreateNewScope = true;
			if(Node.ElseNode instanceof GtIfNode && Node.ElseNode.NextNode == null) {
				CreateNewScope = false;
			}
			Code += " else " + this.VisitBlockWithIndent(Node.ElseNode, CreateNewScope);
		}
		this.PushSourceCode(Code);
	}

	@Override
	public void VisitTryNode(GtTryNode Node) {
		/* local */String Code = "try ";
		Code += this.VisitBlockWithIndent(Node.TryBlock, true);
		if(Node.CatchExpr != null) {
			/* local */GtVarNode Val = (/* cast */GtVarNode) Node.CatchExpr;
			Code += " catch (" + Val.Type.toString() + " " + Val.NativeName + ") ";
			Code += this.VisitBlockWithIndent(Node.CatchBlock, true);
		}
		if(Node.FinallyBlock != null) {
			Code += " finally " + this.VisitBlockWithIndent(Node.FinallyBlock, true);
		}
		this.PushSourceCode(Code);
	}

	@Override
	public void VisitThrowNode(GtThrowNode Node) {
		/* local */String Code = "throw " + this.VisitNode(Node.Expr);
		this.PushSourceCode(Code);
	}

	@Override
	public void VisitErrorNode(GtErrorNode Node) {
		/* local */String Code = "throw RuntimeError(\"" + Node.Token.ParsedText + "\")";
		this.PushSourceCode(Code);
	}

	@Override
	public Object Eval(GtNode Node) {
		/* local */String Code = this.VisitBlockWithIndent(Node, false);
		if(LibGreenTea.EqualsString(Code, ";" + this.LineFeed)) {
			return "";
		}
		this.WriteLineCode(Code);
		return Code;
	}

	@Override
	public void GenerateFunc(GtFunc Func, ArrayList<String> ParamNameList, GtNode Body) {
		this.FlushErrorReport();
		/* local */String Function = this.GetIndentString() + "static public " + this.LocalTypeName(Func.GetReturnType());
		Function += " " + Func.GetNativeFuncName() + "(";
		/* local */int i = 0;
		/* local */int size = ParamNameList.size();
		while(i < size) {
			if(i > 0) {
				Function += ", ";
			}
			/* local */String ParamTy = this.LocalTypeName(Func.GetFuncParamType(i));
			Function += ParamTy + " " + ParamNameList.get(i);
			i = i + 1;
		}
		/* local */String Block = this.VisitBlockWithIndent(Body, true);
		Function += ") " + Block;
		this.WriteLineCode(Function);
	}

	@Override
	public void OpenClassField(GtType Type, GtClassField ClassField) {
		/* local */String TypeName = this.LocalTypeName(Type);
		/* local */String Program = this.GetIndentString();
		Program += "public static class " + TypeName + " {" + this.LineFeed;
		this.Indent();
		/* local */int i = ClassField.ThisClassIndex;
		while(i < ClassField.FieldList.size()) {
			/* local */GtFieldInfo FieldInfo = ClassField.FieldList.get(i);
			/* local */GtType VarType = FieldInfo.Type;
			/* local */String VarName = FieldInfo.NativeName;
			Program += this.GetIndentString() + "public " + this.LocalTypeName(VarType) + " " + VarName + ";" + this.LineFeed;
			i = i + 1;
		}
		this.UnIndent();
		Program += this.GetIndentString() + "}" + this.LineFeed;
		Program += this.LineFeed;
		Program += this.GetIndentString() + "public static " + TypeName + " constructor(" + TypeName + " self) {" + this.LineFeed;
		this.Indent();
		i = 0;
		while(i < ClassField.FieldList.size()) {
			/* local */GtFieldInfo FieldInfo = ClassField.FieldList.get(i);
			/* local */String VarName = FieldInfo.NativeName;
			/* local */String InitValue = this.StringifyConstValue(FieldInfo.InitValue);
			if(!FieldInfo.Type.IsNative()) {
				InitValue = this.NullLiteral;
			}
			Program += this.GetIndentString() + this.GetRecvName() + "." + VarName + " = " + InitValue + ";" + this.LineFeed;
			i = i + 1;
		}
		Program += this.GetIndentString() + "return " + this.GetRecvName() + ";" + this.LineFeed;
		this.UnIndent();
		Program += this.GetIndentString() + "}";
		this.WriteLineCode(Program);
	}

	@Override
	public void InvokeMainFunc(String MainFuncName) {
		this.WriteLineCode("public static void main(Array<String> args) {");
		this.WriteLineCode(this.Tab + MainFuncName + "()");
		this.WriteLineCode("}");
	}

	@Override
	public String GetRecvName() {
		return "self";
	}
}
