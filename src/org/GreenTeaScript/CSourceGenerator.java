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
//endif VAJA

//GreenTea Generator should be written in each language.

public class CSourceGenerator extends SourceGenerator {
	CSourceGenerator/*constructor*/(String TargetCode, String OutputFile, int GeneratorFlag) {
		super(TargetCode, OutputFile, GeneratorFlag);
		this.TrueLiteral  = "1";
		this.FalseLiteral = "0";
		this.Tab = "\t";
		this.NullLiteral = "NULL";
		this.MemberAccessOperator = "->";
	}
	@Override public void InitContext(GtParserContext Context) {
		super.InitContext(Context);
	}

	private String GetLocalType(GtType Type, boolean IsPointer) {
		if(Type.IsDynamic() || Type.IsNative()) {
			if(Type == Type.PackageNameSpace.Context.BooleanType) {
				return "int";
			}
			return Type.ShortName;
		}
		/*local*/String TypeName = "struct " + Type.ShortName;
		if(IsPointer) {
			TypeName += "*";
		}
		return TypeName;

	}
	public String NativeTypeName(GtType Type) {
		return this.GetLocalType(Type, false);
	}

	public String LocalTypeName(GtType Type) {
		return this.GetLocalType(Type, true);
	}

	public String GtTypeName(GtType Type) {
		return Type.ShortName;
	}

	@Override protected String GetNewOperator(GtType Type) {
		/*local*/String TypeName = this.GtTypeName(Type);
		return "NEW_" + TypeName + "()";
	}

	@Override public void VisitWhileNode(GtWhileNode Node) {
		/*local*/String Program = "while(" + this.VisitNode(Node.CondExpr) + ")";
		Program += this.VisitBlockWithIndent(Node.LoopBody, true);
		this.PushSourceCode(Program);
	}

	@Override public void VisitDoWhileNode(GtDoWhileNode Node) {
		/*local*/String Program = "do" + this.VisitBlockWithIndent(Node.LoopBody, true);
		Program += " while(" + this.VisitNode(Node.CondExpr) + ")";
		this.PushSourceCode(Program);
	}

	@Override public void VisitForNode(GtForNode Node) {
		/*local*/String Cond = this.VisitNode(Node.CondExpr);
		/*local*/String Iter = this.VisitNode(Node.IterExpr);
		/*local*/String Program = "for(; " + Cond  + "; " + Iter + ") ";
		Program += this.VisitBlockWithIndent(Node.LoopBody, true);
		this.PushSourceCode(Program);
	}

	@Override public void VisitGetterNode(GtGetterNode Node) {
		/*local*/String Program = this.VisitNode(Node.ExprNode);
		/*local*/String FieldName = Node.Func.FuncName;
		/*local*/GtType RecvType = Node.Func.GetRecvType();
		if(Node.ExprNode.Type == RecvType) {
			Program = Program + "->" + FieldName;
		}
		else {
			Program = "GT_GetField(" + this.LocalTypeName(RecvType) + ", " + Program + ", " + FieldName + ")";
		}
		this.PushSourceCode(Program);
	}

	@Override public void VisitVarNode(GtVarNode Node) {
		/*local*/String Type = this.LocalTypeName(Node.DeclType);
		/*local*/String VarName = Node.NativeName;
		/*local*/String Code = Type + " " + VarName;
		/*local*/boolean CreateNewScope = true;
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

	@Override public void VisitIfNode(GtIfNode Node) {
		/*local*/String CondExpr = this.VisitNode(Node.CondExpr);
		/*local*/String ThenBlock = this.VisitBlockWithIndent(Node.ThenNode, true);
		/*local*/String Code = "if(" + CondExpr + ") " + ThenBlock;
		if(Node.ElseNode != null) {
			Code += " else " + this.VisitBlockWithIndent(Node.ElseNode, true);
		}
		this.PushSourceCode(Code);
	}

	@Override public void VisitTryNode(GtTryNode Node) {
		/*local*/String Code = "try ";
		Code += this.VisitBlockWithIndent(Node.TryBlock, true);
		if(Node.CatchExpr != null) {
		/*local*/GtVarNode Val = (/*cast*/GtVarNode) Node.CatchExpr;
			Code += " catch (" + Val.Type.toString() + " " + Val.NativeName + ") ";
			Code += this.VisitBlockWithIndent(Node.CatchBlock, true);
		}
		if(Node.FinallyBlock != null) {
			Code += " finally " + this.VisitBlockWithIndent(Node.FinallyBlock, true);
		}
		this.PushSourceCode(Code);
	}

	@Override public void VisitThrowNode(GtThrowNode Node) {
		/*local*/String Code = "throw " + this.VisitNode(Node.Expr);
		this.PushSourceCode(Code);
		this.StopVisitor(Node);
	}

	@Override public void VisitErrorNode(GtErrorNode Node) {
		/*local*/String Code = "throw Error(\"" + Node.Token.ParsedText + "\")";
		this.PushSourceCode(Code);
		this.StopVisitor(Node);
	}

	@Override public void VisitCommandNode(GtCommandNode Node) {
		/*local*/String Code = "system(";
		/*local*/int i = 0;
		/*local*/String Command = "String __Command = ";
		while(i < LibGreenTea.ListSize(Node.ArgumentList)) {
			/*local*/GtNode Param = Node.ArgumentList.get(i);
			if(i != 0) {
				Command += " + ";
			}
			Param.Evaluate(this);
			Command += "(" + this.PopSourceCode() + ")";
			i = i + 1;
		}
		Code = Command + ";" + this.LineFeed + this.GetIndentString() + Code + "__Command)";
		this.PushSourceCode(Code);
	}

	@Override public void GenerateFunc(GtFunc Func, ArrayList<String> ParamNameList, GtNode Body) {
		this.FlushErrorReport();
		/*local*/String Code = "";
		if(!Func.Is(ExportFunc)) {
			Code = "static ";
		}
		//Body = this.Opt.Fold(Body);
		/*local*/String RetTy = this.LocalTypeName(Func.GetReturnType());
		Code += RetTy + " " + Func.GetNativeFuncName() + "(";
		/*local*/int i = 0;
		while(i < ParamNameList.size()) {
			/*local*/String ParamTy = this.LocalTypeName(Func.GetFuncParamType(i));
			if(i > 0) {
				Code += ", ";
			}
			Code += ParamTy + " " + ParamNameList.get(i);
			i = i + 1;
		}
		Code += ")";
		Code += this.VisitBlockWithIndent(Body, true);
		this.WriteLineCode(Code);
	}

	@Override public Object Eval(GtNode Node) {
		/*local*/String Code = this.VisitBlockWithIndent(Node, false);
		if(LibGreenTea.EqualsString(Code, ";" + this.LineFeed)) {
			return "";
		}
		this.WriteLineCode(Code);
		return Code;
	}

	@Override public void OpenClassField(GtType Type, GtClassField ClassField) {
		/*local*/String TypeName = Type.ShortName;
		/*local*/String LocalType = this.LocalTypeName(Type);
		/*local*/String Program = this.GetIndentString() + "struct " + TypeName + " {" + this.LineFeed;
		this.Indent();
		if(Type.SuperType != null) {
			Program += this.GetIndentString() + "// " + this.LocalTypeName(Type.SuperType) + " __base;" + this.LineFeed;
		}
		/*local*/int i = 0;
		while(i < ClassField.FieldList.size()) {
			/*local*/GtFieldInfo FieldInfo = ClassField.FieldList.get(i);
			/*local*/GtType VarType = FieldInfo.Type;
			/*local*/String VarName = FieldInfo.NativeName;
			Program += this.GetIndentString() + this.LocalTypeName(VarType) + " " + VarName + ";" + this.LineFeed;
			i = i + 1;
		}
		this.UnIndent();
		Program += this.GetIndentString() + "};" + this.LineFeed;
		Program += this.GetIndentString() + LocalType + " NEW_" + TypeName + "() {" + this.LineFeed;
		this.Indent();
		i = 0;
		Program +=  this.GetIndentString() + LocalType + " " + this.GetRecvName() + " = " + "GT_New("+LocalType+");" + this.LineFeed;
		while(i < ClassField.FieldList.size()) {
			/*local*/GtFieldInfo FieldInfo = ClassField.FieldList.get(i);
			/*local*/String VarName = FieldInfo.NativeName;
			/*local*/String InitValue = this.StringifyConstValue(FieldInfo.InitValue);
			if(!FieldInfo.Type.IsNative()) {
				InitValue = this.NullLiteral;
			}
			Program += this.GetIndentString() + this.GetRecvName() + "->" + VarName + " = " + InitValue + ";" + this.LineFeed;
			i = i + 1;
		}
		Program += this.GetIndentString() + "return " + this.GetRecvName() + ";" + this.LineFeed;
		this.UnIndent();
		Program += this.GetIndentString() + "};";
		
		this.WriteLineCode(Program);
	}

	@Override public void StartCompilationUnit() {
		this.WriteLineCode("#include \"GreenTeaPlus.h\"");
	}

	@Override public String GetRecvName() {
		return "self";
	}
}