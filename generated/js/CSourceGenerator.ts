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



//GreenTea Generator should be written in each language.

class CSourceGenerator extends SourceGenerator {
	///*field*/ConstantFolder Opt;
	 constructor(TargetCode: string, OutputFile: string, GeneratorFlag: number) {
		super(TargetCode, OutputFile, GeneratorFlag);
		//this.Opt = new ConstantFolder(TargetCode, OutputFile, GeneratorFlag);
		this.TrueLiteral  = "1";
		this.FalseLiteral = "0";
		this.NullLiteral = "NULL";
		this.MemberAccessOperator = "->";
	}
	public InitContext(Context: GtContext): void {
		super.InitContext(Context);
		//this.Opt.InitContext(Context);
	}

	private GetLocalType(Type: GtType, IsPointer: boolean): string {
		if(Type.IsDynamic() || Type.IsNative()) {
			if(Type == Type.PackageNameSpace.Context.BooleanType) {
				return "int";
			}
			return Type.ShortClassName;
		}
		var TypeName: string = "struct " + Type.ShortClassName;
		if(IsPointer) {
			TypeName += "*";
		}
		return TypeName;

	}
	public NativeTypeName(Type: GtType): string {
		return this.GetLocalType(Type, false);
	}

	public LocalTypeName(Type: GtType): string {
		return this.GetLocalType(Type, true);
	}

	public GreenTeaTypeName(Type: GtType): string {
		return Type.ShortClassName;
	}

	GetNewOperator(Type: GtType): string {
		var TypeName: string = this.GreenTeaTypeName(Type);
		return "NEW_" + TypeName + "()";
	}

	public VisitBlockEachStatementWithIndent(Node: GtNode, NeedBlock: boolean): void {
		var Code: string = "";
		if(NeedBlock) {
			Code += "{" + this.LineFeed;
			this.Indent();
		}
		var CurrentNode: GtNode = Node;
		while(CurrentNode != null) {
			if(!this.IsEmptyBlock(CurrentNode)) {
				var Stmt: string = this.VisitNode(CurrentNode);
				var SemiColon: string = "";
				var LineFeed: string = "";
				if(!Stmt.endsWith(";")) {
					SemiColon = ";";
				}
				if(!Stmt.endsWith(this.LineFeed)) {
					LineFeed = this.LineFeed;
				}
				Code += this.GetIndentString() + Stmt + SemiColon + LineFeed;
			}
			CurrentNode = CurrentNode.NextNode;
		}
		if(NeedBlock) {
			this.UnIndent();
			Code += this.GetIndentString() + "}";
		}
		this.PushSourceCode(Code);
	}

	public VisitWhileNode(Node: WhileNode): void {
		var Program: string = "while(" + this.VisitNode(Node.CondExpr) + ")";
		this.VisitBlockEachStatementWithIndent(Node.LoopBody, true);
		Program += this.PopSourceCode();
		this.PushSourceCode(Program);
	}

	public VisitDoWhileNode(Node: DoWhileNode): void {
		var Program: string = "do";
		this.VisitBlockEachStatementWithIndent(Node.LoopBody, true);
		Program += this.PopSourceCode() + " while(" + this.VisitNode(Node.CondExpr) + ")";
		this.PushSourceCode(Program);
	}

	public VisitForNode(Node: ForNode): void {
		var Cond: string = this.VisitNode(Node.CondExpr);
		var Iter: string = this.VisitNode(Node.IterExpr);
		var Program: string = "for(; " + Cond  + "; " + Iter + ") ";
		this.VisitBlockEachStatementWithIndent(Node.LoopBody, true);
		Program += this.PopSourceCode();
		this.PushSourceCode(Program);
	}

	public VisitGetterNode(Node: GetterNode): void {
		var Program: string = this.VisitNode(Node.Expr);
		var FieldName: string = Node.Func.FuncName;
		var RecvType: GtType = Node.Func.GetRecvType();
		if(Node.Expr.Type == RecvType) {
			Program = Program + "->" + FieldName;
		}
		else {
			Program = "GT_GetField(" + this.LocalTypeName(RecvType) + ", " + Program + ", " + FieldName + ")";
		}
		this.PushSourceCode(Program);
	}

	public VisitVarNode(Node: VarNode): void {
		var Type: string = this.LocalTypeName(Node.DeclType);
		var VarName: string = Node.NativeName;
		var Code: string = Type + " " + VarName;
		var CreateNewScope: boolean = true;
		if(Node.InitNode != null) {
			Code += " = " + this.VisitNode(Node.InitNode);
		}
		Code += ";" + this.LineFeed;
		if(CreateNewScope) {
			Code += this.GetIndentString();
		}
		this.VisitBlockEachStatementWithIndent(Node.BlockNode, CreateNewScope);
		this.PushSourceCode(Code + this.PopSourceCode());
	}

	public VisitIfNode(Node: IfNode): void {
		var CondExpr: string = this.VisitNode(Node.CondExpr);
		this.VisitBlockEachStatementWithIndent(Node.ThenNode, true);
		var ThenBlock: string = this.PopSourceCode();
		var Code: string = "if(" + CondExpr + ") " + ThenBlock;
		if(Node.ElseNode != null) {
			this.VisitBlockEachStatementWithIndent(Node.ElseNode, true);
			Code += " else " + this.PopSourceCode();
		}
		this.PushSourceCode(Code);
	}

	public VisitSwitchNode(Node: SwitchNode): void {
		var Code: string = "switch (" + this.VisitNode(Node.MatchNode) + ") {" + this.LineFeed;
		var i: number = 0;
		while(i < Node.CaseList.size()) {
			var Case: GtNode  = Node.CaseList.get(i);
			var Block: GtNode = Node.CaseList.get(i+1);
			Code += this.GetIndentString() + "case " + this.VisitNode(Case) + ":";
			if(this.IsEmptyBlock(Block)) {
				this.Indent();
				Code += this.LineFeed + this.GetIndentString() + "/* fall-through */" + this.LineFeed;
				this.UnIndent();
			}
			else {
				this.VisitBlockEachStatementWithIndent(Block, true);
				Code += this.PopSourceCode() + this.LineFeed;
			}
			i = i + 2;
		}
		if(Node.DefaultBlock != null) {
			Code += this.GetIndentString() + "default:" + this.LineFeed;
			this.VisitBlockEachStatementWithIndent(Node.DefaultBlock, true);
			Code += this.PopSourceCode();
		}
		Code += this.GetIndentString() + "}";
		this.PushSourceCode(Code);
	}

	public VisitTryNode(Node: TryNode): void {
		var Code: string = "try ";
		this.VisitBlockEachStatementWithIndent(Node.TryBlock, true);
		Code += this.PopSourceCode();
		var Val: VarNode = <VarNode> Node.CatchExpr;
		Code += " catch (" + Val.Type.toString() + " " + Val.NativeName + ") ";
		this.VisitBlockEachStatementWithIndent(Node.CatchBlock, true);
		Code += this.PopSourceCode();
		if(Node.FinallyBlock != null) {
			this.VisitBlockEachStatementWithIndent(Node.FinallyBlock, true);
			Code += " finally " + this.PopSourceCode();
		}
		this.PushSourceCode(Code);
	}

	public VisitThrowNode(Node: ThrowNode): void {
		var Code: string = "throw " + this.VisitNode(Node.Expr);
		this.PushSourceCode(Code);
		this.StopVisitor(Node);
	}

	public VisitErrorNode(Node: ErrorNode): void {
		var Code: string = "throw Error(\"" + Node.Token.ParsedText + "\")";
		this.PushSourceCode(Code);
		this.StopVisitor(Node);
	}

	public VisitCommandNode(Node: CommandNode): void {
		var Code: string = "system(";
		var i: number = 0;
		var Command: string = "String __Command = ";
		while(i < LibGreenTea.ListSize(Node.Params)) {
			var Param: GtNode = Node.Params.get(i);
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

	public GenerateFunc(Func: GtFunc, ParamNameList: Array<string>, Body: GtNode): void {
		this.FlushErrorReport();
		var Code: string = "";
		if(!Func.Is(ExportFunc)) {
			Code = "static ";
		}
		//Body = this.Opt.Fold(Body);
		var RetTy: string = this.LocalTypeName(Func.GetReturnType());
		Code += RetTy + " " + Func.GetNativeFuncName() + "(";
		var i: number = 0;
		while(i < ParamNameList.size()) {
			var ParamTy: string = this.LocalTypeName(Func.GetFuncParamType(i));
			if(i > 0) {
				Code += ", ";
			}
			Code += ParamTy + " " + ParamNameList.get(i);
			i = i + 1;
		}
		Code += ")";
		this.VisitBlockEachStatementWithIndent(Body, true);
		Code += this.PopSourceCode();
		this.WriteLineCode(Code);
	}

	public Eval(Node: GtNode): Object {
		//Node = this.Opt.Fold(Node);
		this.VisitBlockEachStatementWithIndent(Node, false);
		var Code: string = this.PopSourceCode();
		if(LibGreenTea.EqualsString(Code, ";" + this.LineFeed)) {
			return "";
		}
		this.WriteLineCode(Code);
		return Code;
	}

	public GenerateClassField(Type: GtType, ClassField: GtClassField): void {
		var TypeName: string = Type.ShortClassName;
		var LocalType: string = this.LocalTypeName(Type);
		var Program: string = this.GetIndentString() + "struct " + TypeName + " {" + this.LineFeed;
		this.Indent();
		if(Type.SuperType != null) {
			Program += this.GetIndentString() + "// " + this.LocalTypeName(Type.SuperType) + " __base;" + this.LineFeed;
		}
		var i: number = 0;
		while(i < ClassField.FieldList.size()) {
			var FieldInfo: GtFieldInfo = ClassField.FieldList.get(i);
			var VarType: GtType = FieldInfo.Type;
			var VarName: string = FieldInfo.NativeName;
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
			var FieldInfo: GtFieldInfo = ClassField.FieldList.get(i);
			var VarName: string = FieldInfo.NativeName;
			var InitValue: string = this.StringifyConstValue(FieldInfo.InitValue);
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

	public StartCompilationUnit(): void {
		this.WriteLineCode("#include \"GreenTeaPlus.h\"");
	}

	public GetRecvName(): string {
		return "self";
	}
}