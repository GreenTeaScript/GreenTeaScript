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





class GreenTeaTopObject implements GreenTeaObject {
	public GreenType: GtType;
	constructor(GreenType: GtType) {
		this.GreenType = GreenType;
	}
	public  GetGreenType(): GtType {
		return this.GreenType;
	}


	public toString(): string {
		var s: string = "{";

		return s + "}";
	}
}


 class GreenTeaAnyObject extends GreenTeaTopObject {
	public  NativeValue: Object;
	constructor(GreenType: GtType, NativeValue: Object) {
		super(GreenType);
		this.NativeValue = NativeValue;
	}
}
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



class GreenTeaArray extends GreenTeaTopObject {
	ArrayBody: Array<Object> ;
	constructor(GreenType: GtType) {
		super(GreenType);
		this.ArrayBody = new Array<Object>();
	}
	public SubArray(bindex: number, eindex: number): GreenTeaArray {
		var ArrayObject: GreenTeaArray = new GreenTeaArray(this.GreenType);
		for(var i: number = bindex; i < eindex; i++) {
			var Value: Object = this.ArrayBody.get(i);
			ArrayObject.ArrayBody.add(Value);
		}
		return ArrayObject;
	}
	public toString(): string {
		var s: string = "[";
		for(var i: number = 0; i < this.ArrayBody.size(); i++) {
			var Value: Object = this.ArrayBody.get(i);
			if(i > 0) {
				s += ", ";
			}
			s += LibGreenTea.Stringify(Value);
		}
		return s + "]";
	}
	public  static NewArray1(Type: GtType, InitSize: number): GreenTeaArray {
		var ArrayType: GtType = Type.Context.GetGenericType1(Type.Context.ArrayType, Type, true); 
		var ArrayObject: GreenTeaArray =  new GreenTeaArray(ArrayType);
		for(var i: number = 0; i < InitSize; i++) {
			ArrayObject.ArrayBody.add(Type.DefaultNullValue);
		}
		return ArrayObject;
	}
	// new int[2][3]
	public  static NewArray2(Type: GtType, InitSize: number, InitSize2: number): GreenTeaArray {
		var ArrayType: GtType = Type.Context.GetGenericType1(Type.Context.ArrayType, Type, true); 
		ArrayType = Type.Context.GetGenericType1(Type.Context.ArrayType, ArrayType, true); 
		var ArrayObject: GreenTeaArray =  new GreenTeaArray(ArrayType);
		for(var i: number = 0; i < InitSize2; i++) {
			ArrayObject.ArrayBody.add(GreenTeaArray.NewArray1(Type, InitSize));
		}
		return ArrayObject;
	}
	public  static NewArray3(Type: GtType, InitSize: number, InitSize2: number, InitSize3: number): GreenTeaArray {
		var ArrayType: GtType = Type.Context.GetGenericType1(Type.Context.ArrayType, Type, true); 
		ArrayType = Type.Context.GetGenericType1(Type.Context.ArrayType, ArrayType, true); 
		ArrayType = Type.Context.GetGenericType1(Type.Context.ArrayType, ArrayType, true); 
		var ArrayObject: GreenTeaArray =  new GreenTeaArray(ArrayType);
		for(var i: number = 0; i < InitSize2; i++) {
			ArrayObject.ArrayBody.add(GreenTeaArray.NewArray2(Type, InitSize, InitSize2));
		}
		return ArrayObject;
	}
	public  static NewArrayLiteral(ArrayType: GtType, Values: Object[]): GreenTeaArray {
		var ArrayObject: GreenTeaArray =  new GreenTeaArray(ArrayType);
		for(var i: number = 0; i < Values.length; i++) {
			ArrayObject.ArrayBody.add(Values[i]);
		}
		return ArrayObject;
	}
}


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



class GreenTeaEnum extends GreenTeaTopObject {
	public  EnumValue: number;
	public  EnumSymbol: string;
	constructor(GreenType: GtType, EnumValue: number, EnumSymbol: string) {
		super(GreenType);
		this.EnumValue = EnumValue;
		this.EnumSymbol = EnumSymbol;
	}
	public toString(): string {
		return ""+this.EnumValue;
	}
}
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

declare class GreenTeaGrammar {
	public LoadTo(NameSpace: GtNameSpace): void;
}
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

declare class GreenTeaObject {
	GetGreenType(): GtType;
}// ***************************************************************************
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



class GtNode {
	public ParentNode: GtNode;
	public PrevNode: GtNode;
	public NextNode: GtNode;
	public Type: GtType;
	public Token: GtToken;
	constructor(Type: GtType, Token: GtToken) {
		this.Type = Type;
		this.Token = Token;
		this.ParentNode = null;
		this.PrevNode = null;
		this.NextNode = null;
	}
	
	public  MoveHeadNode(): GtNode {
		var Node: GtNode = this;
		while(Node.PrevNode != null) {
			Node = Node.PrevNode;
		}
		return Node;
	}
	public  MoveTailNode(): GtNode {
		var Node: GtNode = this;
		while(Node.NextNode != null) {
			Node = Node.NextNode;
		}
		return Node;
	}

	public  HasReturnNode(): boolean {
		var LastNode: GtNode = this.MoveTailNode();
		return (LastNode instanceof GtReturnNode || LastNode instanceof GtThrowNode);
	}

	public  SetChild(Node: GtNode): void {
		if(Node != null) {
			Node.ParentNode = this;
		}
	}
	public  SetChild2(Node: GtNode, Node2: GtNode): void {
		this.SetChild(Node);
		this.SetChild(Node2);
	}
	public  SetChild3(Node: GtNode, Node2: GtNode, Node3: GtNode): void {
		this.SetChild(Node);
		this.SetChild(Node2);
		this.SetChild(Node3);
	}
	
	public GetList(): Array<GtNode> {
		return null;
	}
	public  GetAt(Index: number): GtNode {
		return this.GetList().get(Index);
	}
	public  Append(Node: GtNode): void {
		this.GetList().add(Node);
		this.SetChild(Node);
	}
	public  AppendNodeList(StartIndex: number, NodeList: Array<GtNode>): void {
		var i: number = StartIndex;
		var List: Array<GtNode> = this.GetList();
		while(i < LibGreenTea.ListSize(NodeList)) {
			var Node: GtNode = NodeList.get(i);
			List.add(Node);
			this.SetChild(Node);
			i = i + 1;
		}
	}

	public Evaluate(Visitor: GtGenerator): void {
		/* must override */
	}
	public  IsErrorNode(): boolean {
		return (this instanceof GtErrorNode);
	}
	
	public  IsNullNode(): boolean {
		return (this instanceof GtNullNode);
	}

	  ToNullValue(EnforceConst: boolean): Object {
		if(EnforceConst) {
			this.Type.Context.ReportError(ErrorLevel, this.Token, "value must be constant in this context");
		}
		return null;
	}
	public ToConstValue(EnforceConst: boolean): Object  {
		return this.ToNullValue(EnforceConst);
	}


}

class GtBasicNode extends GtNode {
	constructor(Type: GtType, Token: GtToken) {
		super(Type, Token);
	}
}

 class GtEmptyNode extends GtNode {
	constructor(Type: GtType, Token: GtToken) {
		super(Type, Token);
	}
	public ToConstValue(EnforceConst: boolean): Object  {
		return null;
	}
}

 class GtNullNode extends GtNode {
	constructor(Type: GtType, Token: GtToken) {
		super(Type, Token);
	}
	public Evaluate(Visitor: GtGenerator): void {
		Visitor.VisitNullNode(this);
	}
	public ToConstValue(EnforceConst: boolean): Object  {
		return null;
	}
}
//NewNode is object creation in GreenTea defined
 class GtNewNode extends GtNode {
	constructor(Type: GtType, Token: GtToken) {
		super(Type, Token);
	}
	public Evaluate(Visitor: GtGenerator): void {
		Visitor.VisitNewNode(this);
	}
	public ToConstValue(EnforceConst: boolean): Object  {
		return this.Type.Context.Generator.EvalNewNode(this, EnforceConst);
	}	
}
 class GtConstNode extends GtNode {
	public ConstValue: Object;
	constructor(Type: GtType, Token: GtToken, ConstValue: Object) {
		super(Type, Token);
		this.ConstValue = ConstValue;
	}
	public Evaluate(Visitor: GtGenerator): void {
		Visitor.VisitConstNode(this);
	}
	public ToConstValue(EnforceConst: boolean): Object  {
		return this.ConstValue;
	}
}
//E.g., "[" $Node, $Node "]"
 class GtArrayNode extends GtNode {
	public NodeList: Array<GtNode>;
	constructor(Type: GtType, Token: GtToken) {
		super(Type, Token);
		this.NodeList = new Array<GtNode>();
	}
	public GetList(): Array<GtNode> {
		return this.NodeList;
	}
	public Evaluate(Visitor: GtGenerator): void {
		Visitor.VisitArrayNode(this);
	}
	public ToConstValue(EnforceConst: boolean): Object  {
		if(EnforceConst) {
			return this.Type.Context.Generator.EvalArrayNode(this, EnforceConst);
		}
		return null;
	}
}
//E.g., "[" $Node, $Node "]"
 class GtNewArrayNode extends GtNode {
	public NodeList: Array<GtNode>;
	constructor(Type: GtType, Token: GtToken) {
		super(Type, Token);
		this.NodeList = new Array<GtNode>();
	}
	public GetList(): Array<GtNode> {
		return this.NodeList;
	}
	public Evaluate(Visitor: GtGenerator): void {
		Visitor.VisitNewArrayNode(this);
	}
	public ToConstValue(EnforceConst: boolean): Object  {
		if(EnforceConst) {
			return this.Type.Context.Generator.EvalNewArrayNode(this, EnforceConst);
		}
		return null;
	}
}
 class GtLocalNode extends GtNode {
	public NativeName: string;
	constructor(Type: GtType, Token: GtToken, NativeName: string) {
		super(Type, Token);
		this.NativeName = NativeName;
	}
	public Evaluate(Visitor: GtGenerator): void {
		Visitor.VisitLocalNode(this);
	}
}
//E.g., $LeftNode = $RightNode
 class GtAssignNode extends GtNode {
	public LeftNode: GtNode;
	public RightNode: GtNode;
	constructor(Type: GtType, Token: GtToken, Left: GtNode, Right: GtNode) {
		super(Type, Token);
		this.LeftNode  = Left;
		this.RightNode = Right;
		this.SetChild2(Left, Right);
	}
	public Evaluate(Visitor: GtGenerator): void {
		Visitor.VisitAssignNode(this);
	}
}
//E.g., $ExprNode instanceof TypeInfo
 class GtInstanceOfNode extends GtNode {
	public ExprNode: GtNode;
	public TypeInfo: GtType;
	constructor(Type: GtType, Token: GtToken, ExprNode: GtNode, TypeInfo: GtType) {
		super(Type, Token);
		this.ExprNode = ExprNode;
		this.TypeInfo = TypeInfo;
		this.SetChild(ExprNode);
	}
	public Evaluate(Visitor: GtGenerator): void {
		Visitor.VisitInstanceOfNode(this);
	}
	public ToConstValue(EnforceConst: boolean): Object  {
		var Value: Object = this.ExprNode.ToConstValue(EnforceConst) ;
		if(Value != null) {
			return LibGreenTea.DynamicInstanceOf(Value, this.TypeInfo);
		}
		return Value;
	}
}

//E.g., $LeftNode && $RightNode
 class GtAndNode extends GtNode {
	public LeftNode: GtNode;
	public RightNode: GtNode;
	constructor(Type: GtType, Token: GtToken, Left: GtNode, Right: GtNode) {
		super(Type, Token);
		this.LeftNode  = Left;
		this.RightNode = Right;
		this.SetChild2(Left, Right);
	}
	public Evaluate(Visitor: GtGenerator): void {
		Visitor.VisitAndNode(this);
	}
	public ToConstValue(EnforceConst: boolean): Object  {
		var LeftValue: Object = this.LeftNode.ToConstValue(EnforceConst) ;
		if(LeftValue instanceof Boolean && LibGreenTea.booleanValue(LeftValue)) {
			return this.RightNode.ToConstValue(EnforceConst) ;
		}
		return null;
	}
}
//E.g., $LeftNode || $RightNode
 class GtOrNode extends GtNode {
	public LeftNode: GtNode;
	public RightNode: GtNode;
	constructor(Type: GtType, Token: GtToken, Left: GtNode, Right: GtNode) {
		super(Type, Token);
		this.LeftNode  = Left;
		this.RightNode = Right;
		this.SetChild2(Left, Right);
	}
	public Evaluate(Visitor: GtGenerator): void {
		Visitor.VisitOrNode(this);
	}
	public ToConstValue(EnforceConst: boolean): Object  {
		var LeftValue: Object = this.LeftNode.ToConstValue(EnforceConst) ;
		if(LeftValue instanceof Boolean) {
			if(LibGreenTea.booleanValue(LeftValue)) {
				return LeftValue;
			}
			else {
				return this.RightNode.ToConstValue(EnforceConst) ;
			}
		}
		return null;
	}
}

 class GtVarNode extends GtNode {
	public DeclType: GtType;
//	#Field#public GtNode	VarNode;
	public NativeName: string;
	public InitNode: GtNode;
	public BlockNode: GtNode;
	/* let VarNode in Block end */
	constructor(Type: GtType, Token: GtToken, DeclType: GtType, VariableName: string, InitNode: GtNode, Block: GtNode) {
		super(Type, Token);
		this.NativeName = VariableName;
		this.DeclType  = DeclType;
		this.InitNode  = InitNode;
		this.BlockNode = Block;
		this.SetChild2(InitNode, this.BlockNode);
	}
	public Evaluate(Visitor: GtGenerator): void {
		Visitor.VisitVarNode(this);
	}
}

//E.g., (T) $Expr
 class GtCastNode extends GtNode {
	public Func: GtFunc;
	public CastType: GtType;
	public Expr: GtNode;
	constructor(Type: GtType, Token: GtToken, CastType: GtType, Expr: GtNode) {
		super(Type, Token);
		this.CastType = CastType;
		this.Expr = Expr;
		this.SetChild(Expr);
	}
	public Evaluate(Visitor: GtGenerator): void {
		Visitor.VisitCastNode(this);
	}
	public ToConstValue(EnforceConst: boolean): Object  {
		var Value: Object = this.Expr.ToConstValue(EnforceConst) ;
		if(Value != null) {
			return LibGreenTea.DynamicCast(this.CastType, Value);
		}
		return Value;
	}
}
// E.g., "~" $Expr
 class GtUnaryNode extends GtNode {
	public Func: GtFunc;
	public Expr: GtNode;
	constructor(Type: GtType, Token: GtToken, Func: GtFunc, Expr: GtNode) {
		super(Type, Token);
		this.Func = Func;
		this.Expr = Expr;
		this.SetChild(Expr);
	}
	public Evaluate(Visitor: GtGenerator): void {
		Visitor.VisitUnaryNode(this);
	}
	public ToConstValue(EnforceConst: boolean): Object  {
		var Value: Object = this.Expr.ToConstValue(EnforceConst) ;
		if(Value != null) {
			return LibGreenTea.EvalUnary(this.Type, this.Token.ParsedText, Value);
		}
		return Value;
	}	
}
// E.g.,  $Expr "++"
 class GtSuffixNode extends GtNode {
	public Func: GtFunc;
	public Expr: GtNode;
	constructor(Type: GtType, Token: GtToken, Func: GtFunc, Expr: GtNode) {
		super(Type, Token);
		this.Func = Func;
		this.Expr = Expr;
		this.SetChild(Expr);
	}
	public Evaluate(Visitor: GtGenerator): void {
		Visitor.VisitSuffixNode(this);
	}
	public ToConstValue(EnforceConst: boolean): Object  {
		var Value: Object = this.Expr.ToConstValue(EnforceConst) ;
		if(Value != null) {
			return LibGreenTea.EvalSuffix(this.Type, Value, this.Token.ParsedText);
		}
		return Value;
	}
}
//E.g., "exists" $Expr
 class GtExistsNode extends GtNode {
	public Func: GtFunc;
	public Expr: GtNode;
	constructor(Type: GtType, Token: GtToken, Func: GtFunc, Expr: GtNode) {
		super(Type, Token);
		this.Func = Func;
		this.Expr = Expr;
		this.SetChild(Expr);
	}
	public Evaluate(Visitor: GtGenerator): void {
		Visitor.VisitExistsNode(this);
	}
}
//E.g., $LeftNode += $RightNode
 class GtSelfAssignNode extends GtNode {
	public Func: GtFunc;
	public LeftNode: GtNode;
	public RightNode: GtNode;
	constructor(Type: GtType, Token: GtToken, Func: GtFunc, Left: GtNode, Right: GtNode) {
		super(Type, Token);
		this.Func  = Func;
		this.LeftNode  = Left;
		this.RightNode = Right;
		this.SetChild2(Left, Right);
	}
	public Evaluate(Visitor: GtGenerator): void {
		Visitor.VisitSelfAssignNode(this);
	}
}
// E.g., $LeftNode "+" $RightNode
 class GtBinaryNode extends GtNode {
	public Func: GtFunc;
	public LeftNode: GtNode;
	public RightNode: GtNode;
	constructor(Type: GtType, Token: GtToken, Func: GtFunc, Left: GtNode, Right: GtNode) {
		super(Type, Token);
		this.Func = Func;
		this.LeftNode  = Left;
		this.RightNode = Right;
		this.SetChild2(Left, Right);
	}
	public Evaluate(Visitor: GtGenerator): void {
		Visitor.VisitBinaryNode(this);
	}
	public ToConstValue(EnforceConst: boolean): Object  {
		var LeftValue: Object = this.LeftNode.ToConstValue(EnforceConst) ;
		if(LeftValue != null) {
			var RightValue: Object = this.RightNode.ToConstValue(EnforceConst) ;
			if(RightValue != null) {
				return LibGreenTea.EvalBinary(this.Type, LeftValue, this.Token.ParsedText, RightValue);
			}
		}
		return null;
	}
}


//E.g., $CondExpr "?" $ThenExpr ":" $ElseExpr
 class GtTrinaryNode extends GtNode {
	public Func: GtFunc;
	public ConditionNode: GtNode;
	public ThenNode: GtNode;
	public ElseNode: GtNode;
	constructor(Type: GtType, Token: GtToken, CondExpr: GtNode, ThenExpr: GtNode, ElseExpr: GtNode) {
		super(Type, Token);
		this.ConditionNode = CondExpr;
		this.ThenNode = ThenExpr;
		this.ElseNode = ElseExpr;
		this.SetChild(CondExpr);
		this.SetChild2(ThenExpr, ElseExpr);
	}
	public Evaluate(Visitor: GtGenerator): void {
		Visitor.VisitTrinaryNode(this);
	}
	public ToConstValue(EnforceConst: boolean): Object  {
		var CondValue: Object = this.ConditionNode.ToConstValue(EnforceConst) ;
		if(CondValue instanceof Boolean) {
			if(LibGreenTea.booleanValue(CondValue)) {
				return this.ThenNode.ToConstValue(EnforceConst) ;
			}
			else {
				return this.ElseNode.ToConstValue(EnforceConst) ;
			}
		}
		return null;
	}
}
//E.g., $Expr . Token.ParsedText
 class GtGetterNode extends GtNode {
	public Func: GtFunc;
	public ExprNode: GtNode;
	constructor(Type: GtType, Token: GtToken, Func: GtFunc, Expr: GtNode) {
		super(Type, Token);
		this.Func = Func;
		this.ExprNode = Expr;
		this.SetChild(Expr);
	}
	public Evaluate(Visitor: GtGenerator): void {
		Visitor.VisitGetterNode(this);
	}

	public ToConstValue(EnforceConst: boolean): Object  {
		return this.Type.Context.Generator.EvalGetterNode(this, EnforceConst);
	}
}
//E.g., $Left . Token.ParsedText = $Right
 class GtSetterNode extends GtNode {
	public Func: GtFunc;
	public LeftNode: GtNode;
	public RightNode: GtNode;
	constructor(Type: GtType, Token: GtToken, Func: GtFunc, LeftNode: GtNode, RightNode: GtNode) {
		super(Type, Token);
		this.Func = Func;
		this.LeftNode  = LeftNode;
		this.RightNode = RightNode;
		this.SetChild2(LeftNode, RightNode);
	}
	public Evaluate(Visitor: GtGenerator): void {
		Visitor.VisitSetterNode(this);
	}
	public ToConstValue(EnforceConst: boolean): Object  {
		return this.Type.Context.Generator.EvalSetterNode(this, EnforceConst);
	}
}
//E.g., $Expr . Token.ParsedText
 class GtDyGetterNode extends GtNode {
	public ExprNode: GtNode;
	public NameSpace: GtNameSpace;
	public FieldName: string;
	constructor(Type: GtType, Token: GtToken, Expr: GtNode, NameSpace: GtNameSpace, FieldName: string) {
		super(Type, Token);
		this.ExprNode = Expr;
		this.NameSpace = NameSpace;
		this.FieldName = FieldName;
		this.SetChild(Expr);
	}
	public Evaluate(Visitor: GtGenerator): void {
		Visitor.VisitDyGetterNode(this);
	}

	public ToConstValue(EnforceConst: boolean): Object  {
		return this.Type.Context.Generator.EvalDyGetterNode(this, EnforceConst);
	}
}
//E.g., $Left . Token.ParsedText = $Right
 class GtDySetterNode extends GtNode {
	public LeftNode: GtNode;
	public NameSpace: GtNameSpace;
	public FieldName: string;
	public RightNode: GtNode;
	constructor(Type: GtType, Token: GtToken, Func: GtFunc, LeftNode: GtNode, NameSpace: GtNameSpace, FieldName: string, RightNode: GtNode) {
		super(Type, Token);
		this.LeftNode  = LeftNode;
		this.NameSpace = NameSpace;
		this.FieldName = FieldName;
		this.RightNode = RightNode;
		this.SetChild2(LeftNode, RightNode);
	}
	public Evaluate(Visitor: GtGenerator): void {
		Visitor.VisitDySetterNode(this);
	}
	public ToConstValue(EnforceConst: boolean): Object  {
		return this.Type.Context.Generator.EvalDySetterNode(this, EnforceConst);
	}
}


//E.g., $Expr "[" $Node, $Node "]"
 class GtIndexerNode extends GtNode {
	public Func: GtFunc;
	public Expr: GtNode;
	public NodeList: Array<GtNode>; /* [arg1, arg2, ...] */
	constructor(Type: GtType, Token: GtToken, Func: GtFunc, Expr: GtNode) {
		super(Type, Token);
		this.Func = Func;
		this.Expr = Expr;
		this.NodeList = new Array<GtNode>();
		this.SetChild(Expr);
	}
	public GetList(): Array<GtNode> {
		return this.NodeList;
	}
	public Evaluate(Visitor: GtGenerator): void {
		Visitor.VisitIndexerNode(this);
	}
	public ToBasicNode(): GtApplyNode {
		var Node: GtApplyNode = new GtApplyNode(this.Type, this.Token, this.Func);
		Node.Append(new GtConstNode(this.Func.GetFuncType(), this.Token, this.Func));
		Node.Append(this.Expr);
		Node.AppendNodeList(0, this.NodeList);
		return Node;
	}
	public ToConstValue(EnforceConst: boolean): Object  {
		var Node: GtApplyNode = this.ToBasicNode();
		return Node.ToConstValue(EnforceConst);
	}
}

//E.g., $Expr "[" $Index ":" $Index2 "]"
 class GtSliceNode extends GtNode {
	public Func: GtFunc;
	public Expr: GtNode;
	public Index1: GtNode;
	public Index2: GtNode;
	constructor(Type: GtType, Token: GtToken, Func: GtFunc, Expr: GtNode, Index1: GtNode, Index2: GtNode) {
		super(Type, Token);
		this.Func = Func;
		this.Expr = Expr;
		this.Index1 = Index1;
		this.Index2 = Index2;
		this.SetChild(Expr);
		this.SetChild2(Index1, Index2);
	}
	public Evaluate(Visitor: GtGenerator): void {
		Visitor.VisitSliceNode(this);
	}
}

// E.g., $Param[0] "(" $Param[1], $Param[2], ... ")"
 class GtApplyNode extends GtNode {
	public Func: GtFunc;
	public NodeList: Array<GtNode>; /* [arg1, arg2, ...] */
	constructor(Type: GtType, KeyToken: GtToken, Func: GtFunc) {
		super(Type, KeyToken);
		this.Func = Func;
		this.NodeList = new Array<GtNode>();
	}
	public  GetList(): Array<GtNode> {
		return this.NodeList;
	}
	public Evaluate(Visitor: GtGenerator): void {
		Visitor.VisitApplyNode(this);
	}
	public ToConstValue(EnforceConst: boolean): Object  {
		return this.Type.Context.Generator.EvalApplyNode(this, EnforceConst);
	}
}

//E.g., Func "(" $Param[0], $Param[1], ... ")"
 class GtStaticApplyNode extends GtNode {
	public Func: GtFunc;
	public ParamList: Array<GtNode>; /* [arg1, arg2, ...] */
	constructor(Type: GtType, KeyToken: GtToken, Func: GtFunc) {
		super(Type, KeyToken);
		this.Func = Func;
		this.ParamList = new Array<GtNode>();
	}
	public  GetList(): Array<GtNode> {
		return this.ParamList;
	}
	public Evaluate(Visitor: GtGenerator): void {
		Visitor.VisitStaticApplyNode(this);
	}
	public ToConstValue(EnforceConst: boolean): Object  {
		return this.Type.Context.Generator.EvalStaticApplyNode(this, EnforceConst);
	}
}
//E.g., $RecvNode . Func "(" $Param[1], $Param[2], ... ")"
 class GtApplyStaticMethodNode extends GtNode {
	public RecvNode: GtNode;
	public Func: GtFunc;
	public ParamList: Array<GtNode>; /* [arg1, arg2, ...] */
	constructor(Type: GtType, KeyToken: GtToken, RecvNode: GtNode, Func: GtFunc) {
		super(Type, KeyToken);
		this.Func = Func;
		this.ParamList = new Array<GtNode>();
	}
	public  GetList(): Array<GtNode> {
		return this.ParamList;
	}
	public Evaluate(Visitor: GtGenerator): void {
		Visitor.VisitApplyStaticMethodNode(this);
	}
	public ToConstValue(EnforceConst: boolean): Object  {
		return this.Type.Context.Generator.EvalApplyStaticMethodNode(this, EnforceConst);
	}
}
//E.g., $RecvNode . Func "(" $Param[1], $Param[2], ... ")"
 class GtApplyOverridedMethodNode extends GtNode {
	public RecvNode: GtNode;
	public NameSpace: GtNameSpace;
	public Func: GtFunc;
	public ParamList: Array<GtNode>; /* [arg1, arg2, ...] */
	constructor(Type: GtType, KeyToken: GtToken, RecvNode: GtNode, NameSpace: GtNameSpace, Func: GtFunc) {
		super(Type, KeyToken);
		this.NameSpace = NameSpace;
		this.Func = Func;
		this.ParamList = new Array<GtNode>();
	}
	public  GetList(): Array<GtNode> {
		return this.ParamList;
	}
	public Evaluate(Visitor: GtGenerator): void {
		Visitor.VisitApplyOverridedMethodNode(this);
	}
	public ToConstValue(EnforceConst: boolean): Object  {
		return this.Type.Context.Generator.EvalApplyOverridedMethodNode(this, EnforceConst);
	}
}

//E.g., FuncNode "(" $Param[0], $Param[1], ... ")"
 class GtApplyFuncNode extends GtNode {
	public FuncNode: GtNode;
	public ParamList: Array<GtNode>; /* [arg0, arg1, ...] */
	constructor(Type: GtType, KeyToken: GtToken, FuncNode: GtNode) {
		super(Type, KeyToken);
		this.FuncNode = FuncNode;
		this.ParamList = new Array<GtNode>();
	}
	public  GetList(): Array<GtNode> {
		return this.ParamList;
	}
	public Evaluate(Visitor: GtGenerator): void {
		Visitor.VisitApplyFuncNode(this);
	}
	public ToConstValue(EnforceConst: boolean): Object  {
		return this.Type.Context.Generator.EvalApplyFuncNode(this, EnforceConst);
	}
}

//E.g., "FuncName" "(" $Param[0], $Param[1], ... ")"
 class GtApplyDynamicFuncNode extends GtNode {
	public NameSpace: GtNameSpace;
	public FuncName: string;
	public ParamList: Array<GtNode>; /* [arg0, arg1, ...] */
	constructor(Type: GtType, KeyToken: GtToken, NameSpace: GtNameSpace, FuncName: string) {
		super(Type, KeyToken);
		this.NameSpace = NameSpace;
		this.FuncName = FuncName;
		this.ParamList = new Array<GtNode>();
	}
	public  GetList(): Array<GtNode> {
		return this.ParamList;
	}
	public Evaluate(Visitor: GtGenerator): void {
		Visitor.VisitApplyDynamicFuncNode(this);
	}
	public ToConstValue(EnforceConst: boolean): Object  {
		return this.Type.Context.Generator.EvalApplyDynamicFuncNode(this, EnforceConst);
	}
}

//E.g., $RecvNode . FuncName "(" $Param[1], $Param[2], ... ")"
 class GtApplyDynamicMethodNode extends GtNode {
	public RecvNode: GtNode;
	public NameSpace: GtNameSpace;
	public FuncName: string;
	public ParamList: Array<GtNode>; /* [arg1, arg2, ...] */
	constructor(Type: GtType, KeyToken: GtToken, RecvNode: GtNode, NameSpace: GtNameSpace, FuncName: string) {
		super(Type, KeyToken);
		this.NameSpace = NameSpace;
		this.FuncName = FuncName;
		this.ParamList = new Array<GtNode>();
	}
	public  GetList(): Array<GtNode> {
		return this.ParamList;
	}
	public Evaluate(Visitor: GtGenerator): void {
		Visitor.VisitApplyDynamicMethodNode(this);
	}
	public ToConstValue(EnforceConst: boolean): Object  {
		return this.Type.Context.Generator.EvalApplyDynamicMethodNode(this, EnforceConst);
	}
}

//E.g., ConstructorNode is for object creation in Native Langauage defined
 class GtConstructorNode extends GtNode {
	public ParamList: Array<GtNode>;
	public Func: GtFunc;
	constructor(Type: GtType, Token: GtToken, Func: GtFunc) {
		super(Type, Token);
		this.ParamList = new Array<GtNode>();
		this.Func = Func;
	}
	public  GetList(): Array<GtNode> {
		return this.ParamList;
	}
	public Evaluate(Visitor: GtGenerator): void {
		Visitor.VisitConstructorNode(this);
	}
	public ToConstValue(EnforceConst: boolean): Object  {
		if(EnforceConst) {
			return this.Type.Context.Generator.EvalConstructorNode(this, EnforceConst);
		}
		return null;
	}	
}

//E.g., "if" "(" $Cond ")" $ThenNode "else" $ElseNode
 class GtIfNode extends GtNode {
	public CondExpr: GtNode;
	public ThenNode: GtNode;
	public ElseNode: GtNode;
	/* If CondExpr then ThenBlock else ElseBlock */
	constructor(Type: GtType, Token: GtToken, CondExpr: GtNode, ThenBlock: GtNode, ElseNode: GtNode) {
		super(Type, Token);
		this.CondExpr = CondExpr;
		this.ThenNode = ThenBlock;
		this.ElseNode = ElseNode;
		this.SetChild(CondExpr);
		this.SetChild2(ThenBlock, ElseNode);
	}
	public Evaluate(Visitor: GtGenerator): void {
		Visitor.VisitIfNode(this);
	}
}
//E.g., "while" "(" $CondExpr ")" $LoopBody
 class GtWhileNode extends GtNode {
	public CondExpr: GtNode;
	public LoopBody: GtNode;
	constructor(Type: GtType, Token: GtToken, CondExpr: GtNode, LoopBody: GtNode) {
		super(Type, Token);
		this.CondExpr = CondExpr;
		this.LoopBody = LoopBody;
		this.SetChild2(CondExpr, LoopBody);
	}
	public Evaluate(Visitor: GtGenerator): void {
		Visitor.VisitWhileNode(this);
	}
}
 class GtDoWhileNode extends GtNode {
	public CondExpr: GtNode;
	public LoopBody: GtNode;
	constructor(Type: GtType, Token: GtToken, CondExpr: GtNode, LoopBody: GtNode) {
		super(Type, Token);
		this.CondExpr = CondExpr;
		this.LoopBody = LoopBody;
		this.SetChild2(CondExpr, LoopBody);
	}
	public Evaluate(Visitor: GtGenerator): void {
		Visitor.VisitDoWhileNode(this);
	}
}

//E.g., "for" "(" ";" $CondExpr ";" $IterExpr ")" $LoopNode
 class GtForNode extends GtNode {
	public CondExpr: GtNode;
	public IterExpr: GtNode;
	public LoopBody: GtNode;
	constructor(Type: GtType, Token: GtToken, CondExpr: GtNode, IterExpr: GtNode, LoopBody: GtNode) {
		super(Type, Token);
		this.CondExpr = CondExpr;
		this.LoopBody = LoopBody;
		this.IterExpr = IterExpr;
		this.SetChild2(CondExpr, LoopBody);
		this.SetChild(IterExpr);
	}
	public Evaluate(Visitor: GtGenerator): void {
		Visitor.VisitForNode(this);
	}
}

//E.g., "for" "(" $Variable ":" $IterExpr ")" $LoopNode
 class GtForEachNode extends GtNode {
	public Variable: GtNode;
	public IterExpr: GtNode;
	public LoopBody: GtNode;
	constructor(Type: GtType, Token: GtToken, Variable: GtNode, IterExpr: GtNode, LoopBody: GtNode) {
		super(Type, Token);
		this.Variable = Variable;
		this.IterExpr = IterExpr;
		this.LoopBody = LoopBody;
		this.SetChild2(Variable, LoopBody);
		this.SetChild(IterExpr);
	}
	public Evaluate(Visitor: GtGenerator): void {
		Visitor.VisitForEachNode(this);
	}
}
 class GtContinueNode extends GtNode {
	public Label: string;
	constructor(Type: GtType, Token: GtToken, Label: string) {
		super(Type, Token);
		this.Label = Label;
	}
	public Evaluate(Visitor: GtGenerator): void {
		Visitor.VisitContinueNode(this);
	}
}
 class GtBreakNode extends GtNode {
	public Label: string;
	constructor(Type: GtType, Token: GtToken, Label: string) {
		super(Type, Token);
		this.Label = Label;
	}
	public Evaluate(Visitor: GtGenerator): void {
		Visitor.VisitBreakNode(this);
	}
}
 class GtReturnNode extends GtNode {
	public Expr: GtNode;
	constructor(Type: GtType, Token: GtToken, Expr: GtNode) {
		super(Type, Token);
		this.Expr = Expr;
		this.SetChild(Expr);
	}
	public Evaluate(Visitor: GtGenerator): void {
		Visitor.VisitReturnNode(this);
	}
}
 class GtThrowNode extends GtNode {
	public Expr: GtNode;
	constructor(Type: GtType, Token: GtToken, Expr: GtNode) {
		super(Type, Token);
		this.Expr = Expr;
	}
	public Evaluate(Visitor: GtGenerator): void {
		Visitor.VisitThrowNode(this);
	}
}
 class GtTryNode extends GtNode {
	public TryBlock: GtNode;
	public CatchExpr: GtNode;
	public CatchBlock: GtNode;
	public FinallyBlock: GtNode;
	constructor(Type: GtType, Token: GtToken, TryBlock: GtNode, CatchExpr: GtNode, CatchBlock: GtNode, FinallyBlock: GtNode) {
		super(Type, Token);
		this.TryBlock = TryBlock;
		this.CatchExpr = CatchExpr;
		this.CatchBlock = CatchBlock;
		this.FinallyBlock = FinallyBlock;
		this.SetChild2(TryBlock, FinallyBlock);
		this.SetChild2(CatchBlock, CatchExpr);
	}
	public Evaluate(Visitor: GtGenerator): void {
		Visitor.VisitTryNode(this);
	}
}
 class GtSwitchNode extends GtNode {
	public MatchNode: GtNode;
	public DefaultBlock: GtNode;
	public CaseList: Array<GtNode>; // [expr, block, expr, block, ....]

	constructor(Type: GtType, Token: GtToken, MatchNode: GtNode, DefaultBlock: GtNode) {
		super(Type, Token);
		this.MatchNode = MatchNode;
		this.DefaultBlock = DefaultBlock;
		this.CaseList = new Array<GtNode>();
		this.SetChild(DefaultBlock);
	}
	public Evaluate(Visitor: GtGenerator): void {
		Visitor.VisitSwitchNode(this);
	}
	public  GetList(): Array<GtNode> {
		return this.CaseList;
	}
}
 class GtFunctionNode extends GtNode {
	constructor(Type: GtType, Token: GtToken) {
		super(Type, Token); // TODO
	}
	public Evaluate(Visitor: GtGenerator): void {
		Visitor.VisitFunctionNode(this);
	}
}

// E.g., "ls" "-a"..
 class GtCommandNode extends GtNode {
	public ArgumentList: Array<GtNode>; /* ["/bin/ls" , "-la", "/", ...] */
	public PipedNextNode: GtNode;
	constructor(Type: GtType, KeyToken: GtToken, PipedNextNode: GtNode) {
		super(Type, KeyToken);
		this.PipedNextNode = PipedNextNode;
		this.ArgumentList = new Array<GtNode>();
	}
	public  GetList(): Array<GtNode> {
		return this.ArgumentList;
	}

	public Evaluate(Visitor: GtGenerator): void {
		Visitor.VisitCommandNode(this);
	}

	public ToConstValue(EnforceConst: boolean): Object {	//FIXME: Exception
		return this.Type.Context.Generator.EvalCommandNode(this, EnforceConst);
	}
}

 class GtErrorNode extends GtNode {
	constructor(Type: GtType, Token: GtToken) {
		super(Type, Token);
	}
	public Evaluate(Visitor: GtGenerator): void {
		Visitor.VisitErrorNode(this);
	}
	public ToConstValue(EnforceConst: boolean): Object  {
		return null;
	}
}
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



class GtFieldInfo {
	public FieldFlag: number;
	public FieldIndex: number;
	public Type: GtType;
	public Name: string;
	public NativeName: string;
	public InitValue: Object;
	public GetterFunc: GtFunc;
	public SetterFunc: GtFunc;

	constructor(FieldFlag: number, Type: GtType, Name: string, FieldIndex: number, InitValue: Object) {
		this.FieldFlag = FieldFlag;
		this.Type = Type;
		this.Name = Name;
		this.NativeName = Name; // use this in a generator
		this.FieldIndex = FieldIndex;
		this.InitValue = InitValue;
		this.GetterFunc = null;
		this.SetterFunc = null;
	}
}
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



class GtClassField {
	 DefinedType: GtType;
	 NameSpace: GtNameSpace;
	 FieldList: Array<GtFieldInfo>;
	 ThisClassIndex: number;

	constructor(DefinedType: GtType, NameSpace: GtNameSpace) {
		this.DefinedType = DefinedType;
		this.NameSpace = NameSpace;
		this.FieldList = new Array<GtFieldInfo>();
		var SuperClass: GtType = DefinedType.SuperType;
		if(SuperClass.TypeBody instanceof GtClassField) {
			var SuperField: GtClassField = <GtClassField>SuperClass.TypeBody;
			var i: number = 0;
			while(i < SuperField.FieldList.size()) {
				this.FieldList.add(SuperField.FieldList.get(i));
				i+=1;
			}
		}
		this.ThisClassIndex = this.FieldList.size();
	}

	public CreateField(FieldFlag: number, Type: GtType, Name: string, SourceToken: GtToken, InitValue: Object): GtFieldInfo {
		var i: number = 0;
		while(i < this.FieldList.size()) {
			var FieldInfo: GtFieldInfo = this.FieldList.get(i);
			if(FieldInfo.Name.equals(Name)) {
				Type.Context.ReportError(WarningLevel, SourceToken, "duplicated field: " + Name);
				return null;
			}
			i = i + 1;
		}
		var FieldInfo: GtFieldInfo = new GtFieldInfo(FieldFlag, Type, Name, this.FieldList.size(), InitValue);
		var ParamList: Array<GtType> = new Array<GtType>();
		ParamList.add(FieldInfo.Type);
		ParamList.add(this.DefinedType);
		FieldInfo.GetterFunc = new GtFunc(GetterFunc, FieldInfo.Name, 0, ParamList);
		this.NameSpace.SetGetterFunc(this.DefinedType, FieldInfo.Name, FieldInfo.GetterFunc, SourceToken);
		ParamList.clear();
		ParamList.add(Type.Context.VoidType);
		ParamList.add(this.DefinedType);
		ParamList.add(FieldInfo.Type);
		FieldInfo.SetterFunc = new GtFunc(SetterFunc, FieldInfo.Name, 0, ParamList);
		this.NameSpace.SetSetterFunc(this.DefinedType, FieldInfo.Name, FieldInfo.SetterFunc, SourceToken);
		this.FieldList.add(FieldInfo);
		return FieldInfo;
	}
}

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



class GtGenerator {
	public  TargetCode: string;
	public Context: GtParserContext;
	public GeneratedCodeStack: Array<Object>;
	public OutputFile: string;
	public GeneratorFlag: number;

	constructor(TargetCode: string, OutputFile: string, GeneratorFlag: number) {
		this.TargetCode = TargetCode;
		this.OutputFile = OutputFile;
		this.GeneratorFlag = GeneratorFlag;
		this.Context = null;
		this.GeneratedCodeStack = null;
	}

	public InitContext(Context: GtParserContext): void {
		this.Context = Context;
		this.GeneratedCodeStack = new Array<Object>();
		Context.RootNameSpace.LoadRequiredLib("common");
	}

	public  CreateUnsupportedNode(Type: GtType, ParsedTree: GtSyntaxTree): GtNode {
		var Token: GtToken = ParsedTree.KeyToken;
		Type.Context.ReportError(ErrorLevel, Token, this.TargetCode + " has no language support for " + Token.ParsedText);
		return new GtErrorNode(Type.Context.VoidType, ParsedTree.KeyToken);
	}

	public CreateConstNode(Type: GtType, ParsedTree: GtSyntaxTree, Value: Object): GtNode {
		if(Type.IsVarType()) {
			Type = LibGreenTea.GetNativeType(Type.Context, Value);
		}
		return new GtConstNode(Type, ParsedTree != null ? ParsedTree.KeyToken : GtTokenContext.NullToken, Value);
	}

	public CreateNullNode(Type: GtType, ParsedTree: GtSyntaxTree): GtNode {
		return new GtNullNode(Type, ParsedTree.KeyToken);
	}
	public CreateArrayNode(ArrayType: GtType, ParsedTree: GtSyntaxTree): GtNode {
		return new GtArrayNode(ArrayType, ParsedTree.KeyToken);
	}
	public CreateNewArrayNode(ArrayType: GtType, ParsedTree: GtSyntaxTree): GtNode {
		return new GtNewArrayNode(ArrayType, ParsedTree.KeyToken);
	}
	public CreateLocalNode(Type: GtType, ParsedTree: GtSyntaxTree, LocalName: string): GtNode {
		return new GtLocalNode(Type, ParsedTree.KeyToken, LocalName);
	}
	public CreateGetterNode(Type: GtType, ParsedTree: GtSyntaxTree, Func: GtFunc, Expr: GtNode): GtNode {
		return new GtGetterNode(Type, ParsedTree.KeyToken, Func, Expr);
	}
	public CreateSetterNode(Type: GtType, ParsedTree: GtSyntaxTree, Func: GtFunc, Left: GtNode, Right: GtNode): GtNode {
		return new GtSetterNode(Type, ParsedTree.KeyToken, Func, Left, Right);
	}
	public CreateIndexerNode(Type: GtType, ParsedTree: GtSyntaxTree, Func: GtFunc, Expr: GtNode): GtNode {
		return new GtIndexerNode(Type, ParsedTree.KeyToken, Func, Expr);
	}
	public CreateApplyNode(Type: GtType, ParsedTree: GtSyntaxTree, Func: GtFunc): GtNode {
		return new GtApplyNode(Type, ParsedTree == null ? GtTokenContext.NullToken : ParsedTree.KeyToken, Func);
	}
	public  CreateCoercionNode(Type: GtType, Func: GtFunc, Node: GtNode): GtNode {
		var ApplyNode: GtNode = this.CreateApplyNode(Type, null, Func);
		var TypeNode: GtNode = this.CreateConstNode(Type.Context.TypeType, null, Type);
		ApplyNode.Append(TypeNode);
		ApplyNode.Append(TypeNode);
		ApplyNode.Append(Node);
		return ApplyNode;
	}
	public CreateNewNode(Type: GtType, ParsedTree: GtSyntaxTree): GtNode {
		return new GtNewNode(Type, ParsedTree.KeyToken);
	}
	public CreateConstructorNode(Type: GtType, ParsedTree: GtSyntaxTree, Func: GtFunc, NodeList: Array<GtNode>): GtNode {
		var Node: GtConstructorNode = new GtConstructorNode(Type, ParsedTree.KeyToken, Func);
		if(NodeList != null) {
			Node.AppendNodeList(0, NodeList);
		}
		return Node;
	}
	public CreateUnaryNode(Type: GtType, ParsedTree: GtSyntaxTree, Func: GtFunc, Expr: GtNode): GtNode {
		return new GtUnaryNode(Type, ParsedTree.KeyToken, Func, Expr);
	}
	public CreateSuffixNode(Type: GtType, ParsedTree: GtSyntaxTree, Func: GtFunc, Expr: GtNode): GtNode {
		return new GtSuffixNode(Type, ParsedTree.KeyToken, Func, Expr);
	}
	public CreateBinaryNode(Type: GtType, ParsedTree: GtSyntaxTree, Func: GtFunc, Left: GtNode, Right: GtNode): GtNode {
		return new GtBinaryNode(Type, ParsedTree.KeyToken, Func, Left, Right);
	}
	public CreateAndNode(Type: GtType, ParsedTree: GtSyntaxTree, Left: GtNode, Right: GtNode): GtNode {
		return new GtAndNode(Type, ParsedTree.KeyToken, Left, Right);
	}
	public CreateOrNode(Type: GtType, ParsedTree: GtSyntaxTree, Left: GtNode, Right: GtNode): GtNode {
		return new GtOrNode(Type, ParsedTree.KeyToken, Left, Right);
	}
	public CreateInstanceOfNode(Type: GtType, ParsedTree: GtSyntaxTree, LeftNode: GtNode, GivenType: GtType): GtNode {
		return new GtInstanceOfNode(Type, ParsedTree.KeyToken, LeftNode, GivenType);
	}
	public CreateAssignNode(Type: GtType, ParsedTree: GtSyntaxTree, Left: GtNode, Right: GtNode): GtNode {
		return new GtAssignNode(Type, ParsedTree.KeyToken, Left, Right);
	}
	public CreateSelfAssignNode(Type: GtType, ParsedTree: GtSyntaxTree, Func: GtFunc, Left: GtNode, Right: GtNode): GtNode {
		return new GtSelfAssignNode(Type, ParsedTree.KeyToken, Func, Left, Right);
	}
	public CreateVarNode(Type: GtType, ParsedTree: GtSyntaxTree, DeclType: GtType, VariableName: string, InitNode: GtNode, Block: GtNode): GtNode {
		return new GtVarNode(Type, ParsedTree.KeyToken, DeclType, VariableName, InitNode, Block);
	}
	public CreateTrinaryNode(Type: GtType, ParsedTree: GtSyntaxTree, CondNode: GtNode, ThenNode: GtNode, ElseNode: GtNode): GtNode {
		return new GtTrinaryNode(Type, ParsedTree.KeyToken, CondNode, ThenNode, ElseNode);
	}
	public CreateIfNode(Type: GtType, ParsedTree: GtSyntaxTree, Cond: GtNode, Then: GtNode, Else: GtNode): GtNode {
		return new GtIfNode(Type, ParsedTree.KeyToken, Cond, Then, Else);
	}
	public CreateSwitchNode(Type: GtType, ParsedTree: GtSyntaxTree, Match: GtNode, DefaultBlock: GtNode): GtNode {
		return new GtSwitchNode(Type, ParsedTree.KeyToken, Match, DefaultBlock);
	}
	public CreateWhileNode(Type: GtType, ParsedTree: GtSyntaxTree, Cond: GtNode, Block: GtNode): GtNode {
		return new GtWhileNode(Type, ParsedTree.KeyToken, Cond, Block);
	}
	public CreateDoWhileNode(Type: GtType, ParsedTree: GtSyntaxTree, Cond: GtNode, Block: GtNode): GtNode {
		return new GtDoWhileNode(Type, ParsedTree.KeyToken, Cond, Block);
	}
	public CreateForNode(Type: GtType, ParsedTree: GtSyntaxTree, Cond: GtNode, IterNode: GtNode, Block: GtNode): GtNode {
		return new GtForNode(Type, ParsedTree.KeyToken, Cond, IterNode, Block);
	}
	public CreateForEachNode(Type: GtType, ParsedTree: GtSyntaxTree, VarNode: GtNode, IterNode: GtNode, Block: GtNode): GtNode {
		return new GtForEachNode(Type, ParsedTree.KeyToken, VarNode, IterNode, Block);
	}
	public CreateReturnNode(Type: GtType, ParsedTree: GtSyntaxTree, Node: GtNode): GtNode {
		return new GtReturnNode(Type, ParsedTree.KeyToken, Node);
	}
	public CreateLabelNode(Type: GtType, ParsedTree: GtSyntaxTree, Node: GtNode): GtNode {
		return null;
	}
	public CreateBreakNode(Type: GtType, ParsedTree: GtSyntaxTree, Label: string): GtNode {
		return new GtBreakNode(Type, ParsedTree.KeyToken, Label);
	}
	public CreateContinueNode(Type: GtType, ParsedTree: GtSyntaxTree, Label: string): GtNode {
		return new GtContinueNode(Type, ParsedTree.KeyToken, Label);
	}
	public CreateTryNode(Type: GtType, ParsedTree: GtSyntaxTree, TryBlock: GtNode, CatchExpr: GtNode, CatchNode: GtNode, FinallyBlock: GtNode): GtNode {
		return new GtTryNode(Type, ParsedTree.KeyToken, TryBlock, CatchExpr, CatchNode, FinallyBlock);
	}
	public CreateThrowNode(Type: GtType, ParsedTree: GtSyntaxTree, Node: GtNode): GtNode {
		return new GtThrowNode(Type, ParsedTree.KeyToken, Node);
	}
	public CreateFunctionNode(Type: GtType, ParsedTree: GtSyntaxTree, Block: GtNode): GtNode {
		return null;
	}
	public CreateEmptyNode(Type: GtType): GtNode {
		return new GtEmptyNode(Type, GtTokenContext.NullToken);
	}
	public CreateErrorNode(Type: GtType, ParsedTree: GtSyntaxTree): GtNode {
		return new GtErrorNode(ParsedTree.NameSpace.Context.VoidType, ParsedTree.KeyToken);
	}
	public CreateCommandNode(Type: GtType, ParsedTree: GtSyntaxTree,PipedNextNode: GtNode): GtNode {
		return new GtCommandNode(Type, ParsedTree.KeyToken, PipedNextNode);
	}

	/* language constructor */

	public GetNativeType(Value: Object): GtType {
		return LibGreenTea.GetNativeType(this.Context, Value);
	}

	public OpenClassField(DefinedType: GtType, ClassField: GtClassField): void {
		/*extension*/
	}

	public CloseClassField(DefinedType: GtType, MemberList: Array<GtFunc>): void {
		/*extension*/
	}

	public CreateFunc(FuncFlag: number, FuncName: string, BaseIndex: number, TypeList: Array<GtType>): GtFunc {
		return new GtFunc(FuncFlag, FuncName, BaseIndex, TypeList);
	}

	public GenerateFunc(Func: GtFunc, ParamNameList: Array<string>, Body: GtNode): void {
		/*extenstion*/
	}

	public SyncCodeGeneration(): void {
		/*extension*/
	}

	public  StopVisitor(Node: GtNode): void {
		Node.NextNode = null;
	}

	public  IsEmptyBlock(Node: GtNode): boolean {
		return Node == null || (Node instanceof GtEmptyNode) && Node.NextNode == null;
	}

	public  FindParentForNode(Node: GtNode): GtForNode {
		var Parent: GtNode = Node.ParentNode;
		while(Parent != null) {
			if(Parent instanceof GtForNode) {
				return <GtForNode>Parent;
			}
			if(Parent.ParentNode == null) {
				Parent = Parent.MoveHeadNode();
			}
			Parent = Parent.ParentNode;
		}
		return null;
	}

	//------------------------------------------------------------------------

	public VisitEmptyNode(EmptyNode: GtEmptyNode): void {
		LibGreenTea.DebugP("empty node: " + EmptyNode.Token.ParsedText);
	}
	public VisitInstanceOfNode(Node: GtInstanceOfNode): void {
		/*extention*/
	}
	public VisitSelfAssignNode(Node: GtSelfAssignNode): void {
		/*extention*/
	}
	public VisitTrinaryNode(Node: GtTrinaryNode): void {
		/*extension*/
	}
	public VisitExistsNode(Node: GtExistsNode): void {
		/*extension*/
	}
	public VisitCastNode(Node: GtCastNode): void {
		/*extension*/
	}
	public VisitSliceNode(Node: GtSliceNode): void {
		/*extension*/
	}
	public VisitSuffixNode(Node: GtSuffixNode): void {
		/*extension*/
	}
	public VisitUnaryNode(Node: GtUnaryNode): void {
		/*extension*/
	}
	public VisitIndexerNode(Node: GtIndexerNode): void {
		/*extension*/
	}
	public VisitArrayNode(Node: GtArrayNode): void {
		/*extension*/
	}
	public VisitNewArrayNode(Node: GtNewArrayNode): void {
		/*extension*/
	}
	public VisitWhileNode(Node: GtWhileNode): void {
		/*extension*/
	}
	public VisitDoWhileNode(Node: GtDoWhileNode): void {
		/*extension*/
	}
	public VisitForNode(Node: GtForNode): void {
		/*extension*/
	}
	public VisitForEachNode(Node: GtForEachNode): void {
		/*extension*/
	}
	public VisitConstNode(Node: GtConstNode): void {
		/*extension*/
	}
	public VisitNewNode(Node: GtNewNode): void {
		/*extension*/
	}
	public VisitConstructorNode(Node: GtConstructorNode): void {
		/*extension*/
	}
	public VisitNullNode(Node: GtNullNode): void {
		/*extension*/
	}
	public VisitLocalNode(Node: GtLocalNode): void {
		/*extension*/
	}
	public VisitGetterNode(Node: GtGetterNode): void {
		/*extension*/
	}
	public VisitSetterNode(Node: GtSetterNode): void {
		/*extension*/
	}
	public VisitDyGetterNode(Node: GtDyGetterNode): void {
		/*extension*/
	}
	public VisitDySetterNode(Node: GtDySetterNode): void {
		/*extension*/
	}
	public VisitApplyNode(Node: GtApplyNode): void {
		/*extension*/
	}
	public VisitStaticApplyNode(Node: GtStaticApplyNode): void {
		/*extension*/
	}
	public VisitApplyStaticMethodNode(Node: GtApplyStaticMethodNode): void {
		/*extension*/
	}
	public VisitApplyOverridedMethodNode(Node: GtApplyOverridedMethodNode): void {
		/*extension*/		
	}
	public VisitApplyFuncNode(Node: GtApplyFuncNode): void {
		/*extension*/		
	}
	public VisitApplyDynamicFuncNode(Node: GtApplyDynamicFuncNode): void {
		/*extension*/		
	}
	public VisitApplyDynamicMethodNode(Node: GtApplyDynamicMethodNode): void {
		/*extension*/		
	}
	public VisitBinaryNode(Node: GtBinaryNode): void {
		/*extension*/
	}
	public VisitAndNode(Node: GtAndNode): void {
		/*extension*/
	}
	public VisitOrNode(Node: GtOrNode): void {
		/*extension*/
	}
	public VisitAssignNode(Node: GtAssignNode): void {
		/*extension*/
	}
	public VisitVarNode(Node: GtVarNode): void {
		/*extension*/
	}
	public VisitIfNode(Node: GtIfNode): void {
		/*extension*/
	}
	public VisitSwitchNode(Node: GtSwitchNode): void {
		/*extension*/
	}
	public VisitReturnNode(Node: GtReturnNode): void {
		/*extension*/
	}
	public VisitBreakNode(Node: GtBreakNode): void {
		/*extension*/
	}
	public VisitContinueNode(Node: GtContinueNode): void {
		/*extension*/
	}
	public VisitTryNode(Node: GtTryNode): void {
		/*extension*/
	}
	public VisitThrowNode(Node: GtThrowNode): void {
		/*extension*/
	}
	public VisitFunctionNode(Node: GtFunctionNode): void {
		/*extension*/
	}
	public VisitErrorNode(Node: GtErrorNode): void {
		/*extension*/
	}
	public VisitCommandNode(Node: GtCommandNode): void {
		/*extension*/
	}

	public  VisitBlock(Node: GtNode): void {
		var CurrentNode: GtNode = Node;
		while(CurrentNode != null) {
			CurrentNode.Evaluate(this);
			CurrentNode = CurrentNode.NextNode;
		}
	}

	// This must be extended in each language

	public IsStrictMode(): boolean {
		return true; /* override this in dynamic languages */
	}

	public Eval(Node: GtNode): Object {
		this.VisitBlock(Node);
		return null;
	}

	// EnforceConst : 
	
	public EvalNewNode(Node: GtNewNode, EnforceConst: boolean): Object {

		return Node.ToNullValue(EnforceConst);  // if unsupported
	}

	public EvalConstructorNode(Node: GtConstructorNode, EnforceConst: boolean): Object {

		return Node.ToNullValue(EnforceConst);  // if unsupported
	}

	public EvalApplyNode(Node: GtApplyNode, EnforceConst: boolean): Object {

		return Node.ToNullValue(EnforceConst);  // if unsupported
	}
	public EvalArrayNode(Node: GtArrayNode, EnforceConst: boolean): Object {
		var ArrayObject: Object = null;

		return ArrayObject;  // if unsupported
	}
	public EvalNewArrayNode(Node: GtNewArrayNode, EnforceConst: boolean): Object {
		var ArrayObject: Object = null;

		return ArrayObject;  // if unsupported
	}

	public EvalGetterNode(Node: GtGetterNode, EnforceConst: boolean): Object {

		return Node.ToNullValue(EnforceConst); // if unsupported
	}

	public EvalSetterNode(Node: GtSetterNode, EnforceConst: boolean): Object {

		return Node.ToNullValue(EnforceConst); // if unsupported
	}

	
	
	public EvalCommandNode(Node: GtCommandNode, EnforceConst: boolean): Object {

		return Node.ToNullValue(EnforceConst);  // if unsupported
	}

	public FlushBuffer(): void {
		/*extension*/
	}

	public BlockComment(Comment: string): string {
		return "#COMMENT53#";
	}

	public StartCompilationUnit(): void {
		/*extension*/
	}

	public FinishCompilationUnit(): void {
		/*extension*/
	}

	 PushCode(Code: Object): void {
		this.GeneratedCodeStack.add(Code);
	}

	  PopCode(): Object {
		var Size: number = this.GeneratedCodeStack.size();
		if(Size > 0) {
			return this.GeneratedCodeStack.remove(Size - 1);
		}
		return "";
	}

	public GetRecvName(): string {
		return "this";  // default 
	}

	public InvokeMainFunc(MainFuncName: string): void {
		/*extension*/
	}

	private MakeArguments(RecvObject: Object, ParamList: Array<GtNode>, EnforceConst: boolean): Object[] {
		var StartIdx: number = 0;
		var Size: number = LibGreenTea.ListSize(ParamList);
		var Values: Object[] = new Array<Object>(RecvObject == null ? Size : Size + 1);
		if(RecvObject != null) {
			Values[0] = RecvObject;
			StartIdx = 1;
		}
		var i: number = 0;
		while(i < Size) {
			var Node: GtNode = ParamList.get(i);
			if(Node.IsNullNode()) {
				Values[StartIdx + i] = null;
			}
			else {
				var Value: Object = Node.ToConstValue(EnforceConst);
				if(Value == null) {
					return null;
				}
				Values[StartIdx + i] = Value;
			}
			i += 1;
		}
		return Values;
	}

	public EvalStaticApplyNode(ApplyNode: GtStaticApplyNode, EnforceConst: boolean): Object {
		if((EnforceConst || ApplyNode.Func.Is(ConstFunc)) /*&& ApplyNode.Func.FuncBody instanceof Method */) {
//			#Local#Object RecvObject = null;
//			if(!Node.Func.Is(NativeStaticFunc)  && Node.NodeList.size() > 1) {
//				RecvObject = Node.NodeList.get(1).ToConstValue(EnforceConst);
//				if(RecvObject == null) {
//					return null;
//				}
//				StartIndex = 2;
//			}
			var Arguments: Object[] = this.MakeArguments(null, ApplyNode.ParamList, EnforceConst);
			if(Arguments != null) {
				return LibGreenTea.ApplyFunc(ApplyNode.Func, null, Arguments);
			}
		}
		return null;
	}

	public EvalApplyStaticMethodNode(ApplyNode: GtApplyStaticMethodNode, EnforceConst: boolean): Object {
		if((EnforceConst || ApplyNode.Func.Is(ConstFunc)) /*&& ApplyNode.Func.FuncBody instanceof Method */) {
			var RecvObject: Object = ApplyNode.RecvNode.ToConstValue(EnforceConst);
			if(RecvObject != null) {
				var Arguments: Object[] = this.MakeArguments(null, ApplyNode.ParamList, EnforceConst);
				if(Arguments != null) {
					return LibGreenTea.ApplyFunc(ApplyNode.Func, RecvObject, Arguments);
				}
			}
		}
		return null;
	}

	public EvalApplyOverridedMethodNode(ApplyNode: GtApplyOverridedMethodNode, EnforceConst: boolean): Object {
		if((EnforceConst || ApplyNode.Func.Is(ConstFunc)) /*&& ApplyNode.Func.FuncBody instanceof Method */) {
			var RecvObject: Object = ApplyNode.RecvNode.ToConstValue(EnforceConst);
			if(RecvObject != null) {
				var Arguments: Object[] = this.MakeArguments(RecvObject, ApplyNode.ParamList, EnforceConst);
				if(Arguments != null) {
					return LibGreenTea.ApplyOverridedMethod(0, ApplyNode.NameSpace, ApplyNode.Func, Arguments);
				}
			}
		}
		return null;
	}

	public EvalApplyFuncNode(ApplyNode: GtApplyFuncNode, EnforceConst: boolean): Object {
		var Func: GtFunc = <GtFunc>ApplyNode.ToConstValue(EnforceConst);
		if(Func != null) {
			var Arguments: Object[] = this.MakeArguments(null, ApplyNode.ParamList, EnforceConst);
			if(Arguments != null) {
				return Func.Apply(Arguments);
			}
		}
		return null;
	}

	public EvalApplyDynamicFuncNode(ApplyNode: GtApplyDynamicFuncNode, EnforceConst: boolean): Object {
		var Arguments: Object[] = this.MakeArguments(null, ApplyNode.ParamList, EnforceConst);
		if(Arguments != null) {
			return LibGreenTea.InvokeDynamicFunc(0, ApplyNode.Type, ApplyNode.NameSpace, ApplyNode.FuncName, Arguments);
		}
		return null;
	}


	public EvalApplyDynamicMethodNode(ApplyNode: GtApplyDynamicMethodNode, EnforceConst: boolean): Object {
		var RecvObject: Object = ApplyNode.RecvNode.ToConstValue(EnforceConst);
		if(RecvObject != null) {
			var Arguments: Object[] = this.MakeArguments(RecvObject, ApplyNode.ParamList, EnforceConst);
			if(Arguments != null) {
				return LibGreenTea.InvokeDynamicMethod(0, ApplyNode.Type, ApplyNode.NameSpace, ApplyNode.FuncName, Arguments);
			}
		}
		return null;
	}

	public EvalDyGetterNode(GetterNode: GtDyGetterNode, EnforceConst: boolean): Object {
		var RecvObject: Object = GetterNode.ExprNode.ToConstValue(EnforceConst);
		if(RecvObject != null) {
			return LibGreenTea.DynamicGetter(GetterNode.Type, RecvObject, GetterNode.FieldName);
		}
		return null;
	}

	public EvalDySetterNode(SetterNode: GtDySetterNode, EnforceConst: boolean): Object {
		var RecvObject: Object = SetterNode.LeftNode.ToConstValue(EnforceConst);
		if(RecvObject != null) {
			var Value: Object = SetterNode.RightNode.ToConstValue(EnforceConst);
			if(Value != null || SetterNode.RightNode.IsNullNode()) {
				return LibGreenTea.DynamicSetter(SetterNode.Type, RecvObject, SetterNode.FieldName, Value);
			}
		}
		return null;
	}
}
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



class SourceGenerator extends GtGenerator {
	 HeaderSource: string;
	 BodySource: string;

	 Tab: string;
	 LineFeed: string;
	 IndentLevel: number;
	 CurrentLevelIndentString: string;

	 HasLabelSupport: boolean;
	 LogicalOrOperator: string;
	 LogicalAndOperator: string;
	 MemberAccessOperator: string;
	 TrueLiteral: string;
	 FalseLiteral: string;
	 NullLiteral: string;
	 LineComment: string;
	 BreakKeyword: string;
	 ContinueKeyword: string;
	 ParameterBegin: string;
	 ParameterEnd: string;
	 ParameterDelimiter: string;
	 SemiColon: string;
	 BlockBegin: string;
	 BlockEnd: string;

	constructor(TargetCode: string, OutputFile: string, GeneratorFlag: number) {
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

	public InitContext(Context: GtParserContext): void {
		super.InitContext(Context);
		this.HeaderSource = "";
		this.BodySource = "";
	}

	public  WriteHeader(Text: string): void {
		this.HeaderSource += Text;
	}

	public  WriteLineHeader(Text: string): void {
		this.HeaderSource += Text + this.LineFeed;
	}

	public  WriteCode(Text: string): void {
		this.BodySource += Text;
	}

	public  WriteLineCode(Text: string): void {
		this.BodySource += Text + this.LineFeed;
	}

	public  WriteLineComment(Text: string): void {
		this.BodySource += this.LineComment + " " + Text + this.LineFeed;
	}

	public  FlushErrorReport(): void {
		this.WriteLineCode("");
		var Reports: string[] = this.Context.GetReportedErrors();
		var i: number = 0;
		while(i < Reports.length) {
			this.WriteLineComment(Reports[i]);
			i = i + 1;
		}
		this.WriteLineCode("");		
	}

	public FlushBuffer(): void {
		LibGreenTea.WriteCode(this.OutputFile, this.HeaderSource + this.BodySource);			
		this.HeaderSource = "";
		this.BodySource = "";
	}

	/* GeneratorUtils */

	public  Indent(): void {
		this.IndentLevel += 1;
		this.CurrentLevelIndentString = null;
	}

	public  UnIndent(): void {
		this.IndentLevel -= 1;
		this.CurrentLevelIndentString = null;
		LibGreenTea.Assert(this.IndentLevel >= 0);
	}

	public  GetIndentString(): string {
		if(this.CurrentLevelIndentString == null) {
			this.CurrentLevelIndentString = JoinStrings(this.Tab, this.IndentLevel);
		}
		return this.CurrentLevelIndentString;
	}

	public VisitBlockWithIndent(Node: GtNode, NeedBlock: boolean): string {
		var Code: string = "";
		if(NeedBlock) {
			Code += this.BlockBegin + this.LineFeed;
			this.Indent();
		}
		var CurrentNode: GtNode = Node;
		while(CurrentNode != null) {
			if(!this.IsEmptyBlock(CurrentNode)) {
				var Stmt: string = this.VisitNode(CurrentNode);
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

	 StringifyConstValue(ConstValue: Object): string {
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
		if((typeof ConstValue == 'string' || ConstValue instanceof String)) {
			return LibGreenTea.QuoteString(<string>ConstValue);
		}
		if(ConstValue instanceof GreenTeaEnum) {
			return "" + (<GreenTeaEnum> ConstValue).EnumValue;
		}
		return ConstValue.toString();
	}

	 GetNewOperator(Type: GtType): string {
		return "new " + Type.ShortName + "()";
	}

	  PushSourceCode(Code: string): void {
		this.PushCode(Code);
	}

	  PopSourceCode(): string {
		return <string> this.PopCode();
	}

	public  VisitNode(Node: GtNode): string {
		Node.Evaluate(this);
		return this.PopSourceCode();
	}

	public  JoinCode(BeginCode: string, BeginIdx: number, ParamCode: string[], EndCode: string, Delim: string): string {
		var JoinedCode: string = BeginCode;
		var i: number = BeginIdx;
		while(i < ParamCode.length) {
			var P: string = ParamCode[i];
			if(i != BeginIdx) {
				JoinedCode += Delim;
			}
			JoinedCode += P;
			i = i + 1;
		}
		return JoinedCode + EndCode;
	}

	public  static GenerateApplyFunc1(Func: GtFunc, FuncName: string, IsSuffixOp: boolean, Arg1: string): string {
		var Macro: string = null;
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

	public  static GenerateApplyFunc2(Func: GtFunc, FuncName: string, Arg1: string, Arg2: string): string {
		var Macro: string = null;
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

	public GenerateFuncTemplate(ParamSize: number, Func: GtFunc): string {
		var BeginIdx: number = 1;
		var Template: string = "";
		var IsNative: boolean = false;
		if(Func == null) {
			Template = "$1";
			BeginIdx = 2;
		}
		else if(Func.Is(NativeFunc)) {
			Template = "$1" + this.MemberAccessOperator + Func.FuncName;
			BeginIdx = 2;
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
		var i: number = BeginIdx;
		if(IsNative == false) {
			Template += this.ParameterBegin;
			while(i < ParamSize) {
				if(i != BeginIdx) {
					Template += this.ParameterDelimiter + " ";
				}
				Template += "$" + i;
				i = i + 1;
			}
			Template += this.ParameterEnd;
		}
		return Template;
	}

	public  ApplyMacro(Template: string, NodeList: Array<GtNode>): string {
		var ParamSize: number = LibGreenTea.ListSize(NodeList);
		var ParamIndex: number = ParamSize - 1;
		while(ParamIndex >= 1) {
			var Param: string = this.VisitNode(NodeList.get(ParamIndex));
			Template = Template.replace("$" + ParamIndex, Param);
			ParamIndex = ParamIndex - 1;
		}
		return Template;
	}
	public  ApplyMacro2(Template: string, ParamList: string[]): string {
		var ParamSize: number = ParamList.length;
		var ParamIndex: number = ParamSize - 1;
		while(ParamIndex >= 1) {
			var Param: string = ParamList[ParamIndex];
			Template = Template.replace("$" + ParamIndex, Param);
			ParamIndex = ParamIndex - 1;
		}
		return Template;
	}

	public  GenerateApplyFunc(Node: GtApplyNode): string {
		var ParamSize: number = LibGreenTea.ListSize(Node.NodeList);
		var Template: string = this.GenerateFuncTemplate(ParamSize, Node.Func);
		return this.ApplyMacro(Template, Node.NodeList);
	}

	// Visitor API
	public VisitEmptyNode(Node: GtEmptyNode): void {
		this.PushSourceCode("");
	}

	public VisitInstanceOfNode(Node: GtInstanceOfNode): void {
		this.PushSourceCode(this.VisitNode(Node.ExprNode) + " instanceof " + Node.TypeInfo);
	}

	public  VisitConstNode(Node: GtConstNode): void {
		this.PushSourceCode(this.StringifyConstValue(Node.ConstValue));
	}

	public  VisitNullNode(Node: GtNullNode): void {
		this.PushSourceCode(this.NullLiteral);
	}

	public VisitLocalNode(Node: GtLocalNode): void {
		this.PushSourceCode(Node.NativeName);
	}

	public VisitReturnNode(Node: GtReturnNode): void {
		var Code: string = "return";
		if(Node.Expr != null) {
			Code += " " + this.VisitNode(Node.Expr);
		}
		this.PushSourceCode(Code);
		this.StopVisitor(Node);
	}

	public VisitIndexerNode(Node: GtIndexerNode): void {
		this.PushSourceCode(this.VisitNode(Node.Expr) + "[" + this.VisitNode(Node.GetAt(0)) + "]"); // FIXME: Multi
	}

	public  VisitConstructorNode(Node: GtConstructorNode): void {
		var ParamSize: number = LibGreenTea.ListSize(Node.ParamList);
		var Template: string = this.GenerateFuncTemplate(ParamSize, Node.Func);
		this.PushSourceCode(this.ApplyMacro(Template, Node.ParamList));
	}

	public VisitNewNode(Node: GtNewNode): void {
		this.PushSourceCode(this.GetNewOperator(Node.Type));
	}

	public VisitApplyNode(Node: GtApplyNode): void {
		var Program: string = this.GenerateApplyFunc(Node);
		this.PushSourceCode(Program);
	}

	public VisitSuffixNode(Node: GtSuffixNode): void {
		var FuncName: string = Node.Token.ParsedText;
		var Expr: string = this.VisitNode(Node.Expr);
		if(LibGreenTea.EqualsString(FuncName, "++")) {
		}
		else if(LibGreenTea.EqualsString(FuncName, "--")) {
		}
		else {
			LibGreenTea.DebugP(FuncName + " is not supported suffix operator!!");
		}
		this.PushSourceCode("(" + SourceGenerator.GenerateApplyFunc1(Node.Func, FuncName, true, Expr) + ")");
	}

	public VisitSelfAssignNode(Node: GtSelfAssignNode): void {
		var FuncName: string = Node.Token.ParsedText;
		var Left: string = this.VisitNode(Node.LeftNode);
		var Right: string = this.VisitNode(Node.RightNode);
		this.PushSourceCode(Left + " = " + SourceGenerator.GenerateApplyFunc2(Node.Func, FuncName, Left, Right));
	}

	public VisitUnaryNode(Node: GtUnaryNode): void {
		var FuncName: string = Node.Token.ParsedText;
		var Expr: string = this.VisitNode(Node.Expr);
		this.PushSourceCode("(" + SourceGenerator.GenerateApplyFunc1(Node.Func, FuncName, false, Expr) + ")");
	}

	public VisitBinaryNode(Node: GtBinaryNode): void {
		var FuncName: string = Node.Token.ParsedText;
		var Left: string = this.VisitNode(Node.LeftNode);
		var Right: string = this.VisitNode(Node.RightNode);
		this.PushSourceCode("(" + SourceGenerator.GenerateApplyFunc2(Node.Func, FuncName, Left, Right) + ")");
	}

	public VisitGetterNode(Node: GtGetterNode): void {
		this.PushSourceCode(this.VisitNode(Node.ExprNode) + this.MemberAccessOperator + Node.Func.FuncName);
	}
	public VisitAssignNode(Node: GtAssignNode): void {
		this.PushSourceCode(this.VisitNode(Node.LeftNode) + " = " + this.VisitNode(Node.RightNode));
	}

	public VisitAndNode(Node: GtAndNode): void {
		var Left: string = this.VisitNode(Node.LeftNode);
		var Right: string = this.VisitNode(Node.RightNode);
		this.PushSourceCode("(" + Left + " " + this.LogicalAndOperator +" " + Right + ")");
	}

	public VisitOrNode(Node: GtOrNode): void {
		var Left: string = this.VisitNode(Node.LeftNode);
		var Right: string = this.VisitNode(Node.RightNode);
		this.PushSourceCode("(" + Left + " " + this.LogicalOrOperator +" " + Right + ")");
	}

	public VisitTrinaryNode(Node: GtTrinaryNode): void {
		var CondExpr: string = this.VisitNode(Node.ConditionNode);
		var ThenExpr: string = this.VisitNode(Node.ThenNode);
		var ElseExpr: string = this.VisitNode(Node.ElseNode);
		this.PushSourceCode("((" + CondExpr + ")? " + ThenExpr + " : " + ElseExpr + ")");
	}

	public VisitBreakNode(Node: GtBreakNode): void {
		var Code: string = this.BreakKeyword;
		if(this.HasLabelSupport) {
			var Label: string = Node.Label;
			if(Label != null) {
				Code += " " + Label;
			}
		}
		this.PushSourceCode(Code);
		this.StopVisitor(Node);
	}

	public VisitContinueNode(Node: GtContinueNode): void {
		var Code: string = this.ContinueKeyword;
		if(this.HasLabelSupport) {
			var Label: string = Node.Label;
			if(Label != null) {
				Code += " " + Label;
			}
		}
		this.PushSourceCode(Code);
		this.StopVisitor(Node);
	}

	public VisitSwitchNode(Node: GtSwitchNode): void {
		var Code: string = "switch (" + this.VisitNode(Node.MatchNode) + ") {" + this.LineFeed;
		var i: number = 0;
		while(i < Node.CaseList.size()) {
			var Case: GtNode  = Node.CaseList.get(i);
			var Block: GtNode = Node.CaseList.get(i+1);
			Code += this.GetIndentString() + "case " + this.VisitNode(Case) + ":";
			if(this.IsEmptyBlock(Block)) {
				this.Indent();
				Code += this.LineFeed + this.GetIndentString() + "#COMMENT1#" + this.LineFeed;
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

}
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



class GtGrammar {

	public LoadTo(NameSpace: GtNameSpace): void {
		/*extension*/
	}
}
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



class GtParserContext {
	public   ParserId: number;
	public   Generator: GtGenerator;
	public   RootNameSpace: GtNameSpace;
	public TopLevelNameSpace: GtNameSpace;

	// basic class
	public  VoidType: GtType;
	public  BooleanType: GtType;
	public  IntType: GtType;
	public  FloatType: GtType;
	public  StringType: GtType;
	public  AnyType: GtType;
	public  ArrayType: GtType;
	public  FuncType: GtType;

	public  TopType: GtType;
	public  EnumBaseType: GtType;
	public  StructType: GtType;
	public  VarType: GtType;

	public  TypeType: GtType;

	public   SourceMap: GtMap;
	public   SourceList: Array<string>;
	public   ClassNameMap: GtMap;

	public  Stat: GtStat;
	public ReportedErrorList: Array<string>;
	/*filed*/NoErrorReport: boolean;
	
	public  TypePools: Array<GtType>;
	public  FuncPools: Array<GtFunc>;
	
	constructor(Grammar: GtGrammar, Generator: GtGenerator) {
		this.ParserId     = LibGreenTea.NewParserId();
		this.Generator    = Generator;
		this.Generator.Context = this;
		this.SourceMap     = new GtMap();
		this.SourceList    = new Array<string>();
		this.ClassNameMap  = new GtMap();
		this.RootNameSpace = new GtNameSpace(this, null);
		this.TypePools     = new Array<GtType>();
		this.FuncPools     = new Array<GtFunc>();
		this.Stat = new GtStat();
		this.NoErrorReport = false;
		this.ReportedErrorList = new Array<string>();

		this.TopType       = this.RootNameSpace.AppendTypeName(new GtType(this, 0, "Top", null, null), null);
		this.StructType    = this.TopType.CreateSubType(0, "record", null, null);       //  unregistered
		this.EnumBaseType  = this.TopType.CreateSubType(EnumType, "enum", null, null);  //  unregistered

		this.VoidType    = this.RootNameSpace.AppendTypeName(new GtType(this, NativeType, "void", null, null), null);
		this.BooleanType = this.RootNameSpace.AppendTypeName(new GtType(this, NativeType|UnboxType, "boolean", false, Boolean), null);
		this.IntType     = this.RootNameSpace.AppendTypeName(new GtType(this, NativeType|UnboxType, "int", 0, Number), null);
		this.FloatType   = this.RootNameSpace.AppendTypeName(new GtType(this, NativeType|UnboxType, "double", 0.0, Number), null);
		this.StringType  = this.RootNameSpace.AppendTypeName(new GtType(this, NativeType, "String", null, String), null);
		this.VarType     = this.RootNameSpace.AppendTypeName(new GtType(this, 0, "var", null, null), null);
		this.AnyType     = this.RootNameSpace.AppendTypeName(new GtType(this, DynamicType, "any", null, null), null);
		this.TypeType    = this.RootNameSpace.AppendTypeName(this.TopType.CreateSubType(0, "Type", null, null), null);
		this.ArrayType   = this.RootNameSpace.AppendTypeName(this.TopType.CreateSubType(0, "Array", null, null), null);
		this.FuncType    = this.RootNameSpace.AppendTypeName(this.TopType.CreateSubType(0, "Func", null, null), null);

		this.ArrayType.TypeParams = new Array<GtType>(1);
		this.ArrayType.TypeParams[0] = this.VarType;
		this.FuncType.TypeParams = new Array<GtType>(1);
		this.FuncType.TypeParams[0] = this.VarType;  // for PolyFunc


		Grammar.LoadTo(this.RootNameSpace);
		this.TopLevelNameSpace = new GtNameSpace(this, this.RootNameSpace);
		this.Generator.InitContext(this);
	}

	public LoadGrammar(Grammar: GtGrammar): void {
		Grammar.LoadTo(this.TopLevelNameSpace);
	}

	public  GuessType(Value: Object): GtType {
		if(Value instanceof GtFunc) {
			return (<GtFunc>Value).GetFuncType();
		}
		else if(Value instanceof GtPolyFunc) {
			return this.FuncType;
		}
		else if(Value instanceof GreenTeaObject) {
			// FIXME In typescript, we cannot use GreenTeaObject
			// TODO fix downcast
			return <GtType>(<GreenTeaObject>Value).GetGreenType();
		}
		else {
			return this.Generator.GetNativeType(Value);
		}
	}

	private  SubtypeKey(FromType: GtType, ToType: GtType): string {
		return FromType.GetUniqueName() + "<" + ToType.GetUniqueName();
	}

	public  CheckSubType(SubType: GtType, SuperType: GtType): boolean {
		// TODO: Structual Typing database
		return false;
	}

	public SetNativeTypeName(Name: string, Type: GtType): void {
		this.ClassNameMap.put(Name, Type);
		LibGreenTea.VerboseLog(VerboseSymbol, "global type name: " + Name + ", " + Type);
	}

	public GetGenericType(BaseType: GtType, BaseIdx: number, TypeList: Array<GtType>, IsCreation: boolean): GtType {
		LibGreenTea.Assert(BaseType.IsGenericType());
		var MangleName: string = MangleGenericType(BaseType, BaseIdx, TypeList);
		var GenericType: GtType = <GtType>this.ClassNameMap.GetOrNull(MangleName);
		if(GenericType == null && IsCreation) {
			var i: number = BaseIdx;
			var s: string = BaseType.ShortName + "<";
			while(i < LibGreenTea.ListSize(TypeList)) {
				s = s + TypeList.get(i).ShortName;
				i += 1;
				if(i == LibGreenTea.ListSize(TypeList)) {
					s = s + ">";
				}
				else {
					s = s + ",";
				}
			}
			GenericType = BaseType.CreateGenericType(BaseIdx, TypeList, s);
			this.SetNativeTypeName(MangleName, GenericType);
		}
		return GenericType;
	}

	public GetGenericType1(BaseType: GtType, ParamType: GtType, IsCreation: boolean): GtType {
		var TypeList: Array<GtType> = new Array<GtType>();
		TypeList.add(ParamType);
		return this.GetGenericType(BaseType, 0, TypeList, IsCreation);
	}

	public  GetFileLine(FileName: string, Line: number): number {
		var Id: number = /* (FileName == null) ? 0 :*/ <number>this.SourceMap.GetOrNull(FileName);
		if(Id == null) {
			this.SourceList.add(FileName);
			Id = this.SourceList.size();
			this.SourceMap.put(FileName, Id);
		}
		return LibGreenTea.JoinIntId(Id, Line);
	}

	public  GetSourceFileName(FileLine: number): string {
		var FileId: number = LibGreenTea.UpperId(FileLine);
		return (FileId == 0) ? null : this.SourceList.get(FileId - 1);
	}

	 GetSourcePosition(FileLine: number): string {
		var FileId: number = LibGreenTea.UpperId(FileLine);
		var Line: number = LibGreenTea.LowerId(FileLine);
		var FileName: string = (FileId == 0) ? "eval" : this.SourceList.get(FileId - 1);
		return "(" + FileName + ":" + Line + ")";
	}

	public SetNoErrorReport(b: boolean): void {
		this.NoErrorReport = b;
	}

	public  ReportError(Level: number, Token: GtToken, Message: string): void {
		if(!Token.IsError() || !this.NoErrorReport) {
			if(Level == ErrorLevel) {
				Message = "(error) " + this.GetSourcePosition(Token.FileLine) + " " + Message;
				Token.SetErrorMessage(Message, this.RootNameSpace.GetSyntaxPattern("$Error$"));
			}
			else if(Level == TypeErrorLevel) {
				Message = "(error) " + this.GetSourcePosition(Token.FileLine) + " " + Message;
			}
			else if(Level == WarningLevel) {
				Message = "(warning) " + this.GetSourcePosition(Token.FileLine) + " " + Message;
			}
			else if(Level == InfoLevel) {
				Message = "(info) " + this.GetSourcePosition(Token.FileLine) + " " + Message;
			}
			//LibGreenTea.DebugP(Message);
			//System.err.println("**" + Message + "    if dislike this, comment out In ReportError");
			this.ReportedErrorList.add(Message);
		}
	}

	public  GetReportedErrors(): string[] {
		var List: Array<string> = this.ReportedErrorList;
		this.ReportedErrorList = new Array<string>();
		return LibGreenTea.CompactStringList(List);
	}

	public  ShowReportedErrors(): void {
		var i: number = 0;
		var Messages: string[] = this.GetReportedErrors();
		while(i < Messages.length) {
			LibGreenTea.println(Messages[i]);
			i = i + 1;
		}
	}
	
	public  GetTypeById(TypeId: number): GtType {
		return this.TypePools.get(TypeId);
	}

	public  GetFuncById(FuncId: number): GtFunc {
		return this.FuncPools.get(FuncId);
	}
}
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



 class GtTokenFunc {
	public Func: GtFunc;
	public ParentFunc: GtTokenFunc;

	constructor(Func: GtFunc, Parent: GtTokenFunc) {
		this.Func = Func;
		this.ParentFunc = Parent;
	}

	public toString(): string {
		return this.Func.toString();
	}
}

class GtNameSpace {
	public  Context: GtParserContext;
	public  ParentNameSpace: GtNameSpace;
	public PackageName: string;

	TokenMatrix: GtTokenFunc[];
	SymbolPatternTable: GtMap;

	constructor(Context: GtParserContext, ParentNameSpace: GtNameSpace) {
		this.Context = Context;
		this.ParentNameSpace = ParentNameSpace;
		this.PackageName = (ParentNameSpace != null) ? ParentNameSpace.PackageName : null;
		this.TokenMatrix = null;
		this.SymbolPatternTable = null;
	}

	public  GetNameSpace(NameSpaceFlag: number): GtNameSpace {
		if(IsFlag(NameSpaceFlag, RootNameSpace)) {
			return this.Context.RootNameSpace;
		}
		if(IsFlag(NameSpaceFlag, PublicNameSpace)) {
			return this.ParentNameSpace;
		}
		return this;
	}

	public CreateSubNameSpace(): GtNameSpace {
		return new GtNameSpace(this.Context, this);
	}

	public  GetTokenFunc(GtChar2: number): GtTokenFunc {
		if(this.TokenMatrix == null) {
			return this.ParentNameSpace.GetTokenFunc(GtChar2);
		}
		return this.TokenMatrix[GtChar2];
	}

	private  JoinParentFunc(Func: GtFunc, Parent: GtTokenFunc): GtTokenFunc {
		if(Parent != null && Parent.Func == Func) {
			return Parent;
		}
		return new GtTokenFunc(Func, Parent);
	}

	public  AppendTokenFunc(keys: string, TokenFunc: GtFunc): void {
		var i: number = 0;
		if(this.TokenMatrix == null) {
			this.TokenMatrix = new Array<GtTokenFunc>(MaxSizeOfChars);
			if(this.ParentNameSpace != null) {
				while(i < MaxSizeOfChars) {
					this.TokenMatrix[i] = this.ParentNameSpace.GetTokenFunc(i);
				}
			}
		}
		i = 0;
		while(i < keys.length) {
			var kchar: number = AsciiToTokenMatrixIndex(LibGreenTea.CharAt(keys, i));
			this.TokenMatrix[kchar] = this.JoinParentFunc(TokenFunc, this.TokenMatrix[kchar]);
			i += 1;
		}
	}

	public  GetLocalUndefinedSymbol(Key: string): Object {
		if(this.SymbolPatternTable != null) {
			return this.SymbolPatternTable.GetOrNull(Key);
		}
		return null;
	}

	public  GetLocalSymbol(Key: string): Object {
		if(this.SymbolPatternTable != null) {
			var Value: Object = this.SymbolPatternTable.GetOrNull(Key);
			if(Value != null) {
				return Value == UndefinedSymbol ? null : Value;
			}
		}
		return null;
	}

	public  GetSymbol(Key: string): Object {
		var NameSpace: GtNameSpace = this;
		while(NameSpace != null) {
			if(NameSpace.SymbolPatternTable != null) {
				var Value: Object = NameSpace.SymbolPatternTable.GetOrNull(Key);
				if(Value != null) {
					return Value == UndefinedSymbol ? null : Value;
				}
			}
			NameSpace = NameSpace.ParentNameSpace;
		}
		return null;
	}

	public  HasSymbol(Key: string): boolean {
		return (this.GetSymbol(Key) != null);
	}

	public  SetSymbol(Key: string, Value: Object, SourceToken: GtToken): void {
		if(this.SymbolPatternTable == null) {
			this.SymbolPatternTable = new GtMap();
		}
		if(SourceToken != null) {
			var OldValue: Object = this.SymbolPatternTable.GetOrNull(Key);
			if(OldValue != null && OldValue != UndefinedSymbol) {
				if(LibGreenTea.DebugMode) {
					this.Context.ReportError(WarningLevel, SourceToken, "duplicated symbol: " + SourceToken + " old, new =" + OldValue + ", " + Value);
				}
				else {
					if(!LibGreenTea.EqualsString(Key, "_")) {
						this.Context.ReportError(WarningLevel, SourceToken, "duplicated symbol: " + SourceToken);
					}
				}
			}
		}
		this.SymbolPatternTable.put(Key, Value);
		LibGreenTea.VerboseLog(VerboseSymbol, "symbol: " + Key + ", " + Value);
	}

	public  SetUndefinedSymbol(Symbol: string, SourceToken: GtToken): void {
		this.SetSymbol(Symbol, UndefinedSymbol, SourceToken);
	}

	public  GetSymbolText(Key: string): string {
		var Body: Object = this.GetSymbol(Key);
		if((typeof Body == 'string' || Body instanceof String)) {
			return <string>Body;
		}
		return null;
	}

	public GetSyntaxPattern(PatternName: string): GtSyntaxPattern {
		var Body: Object = this.GetSymbol(PatternName);
		if(Body instanceof GtSyntaxPattern) {
			return <GtSyntaxPattern>Body;
		}
		return null;
	}

	public GetExtendedSyntaxPattern(PatternName: string): GtSyntaxPattern {
		var Body: Object = this.GetSymbol("\t" + PatternName);
		if(Body instanceof GtSyntaxPattern) {
			return <GtSyntaxPattern>Body;
		}
		return null;
	}

	private AppendSyntaxPattern(PatternName: string, NewPattern: GtSyntaxPattern, SourceToken: GtToken): void {
		LibGreenTea.Assert(NewPattern.ParentPattern == null);
		var ParentPattern: GtSyntaxPattern = this.GetSyntaxPattern(PatternName);
		NewPattern.ParentPattern = ParentPattern;
		this.SetSymbol(PatternName, NewPattern, SourceToken);
	}

	public AppendSyntax(PatternName: string, MatchFunc: GtFunc, TypeFunc: GtFunc): void {
		var Alias: number = PatternName.indexOf(" ");
		var Name: string = (Alias == -1) ? PatternName : PatternName.substring(0, Alias);
		var Pattern: GtSyntaxPattern = new GtSyntaxPattern(this, Name, MatchFunc, TypeFunc);
		this.AppendSyntaxPattern(Name, Pattern, null);
		if(Alias != -1) {
			this.AppendSyntax(PatternName.substring(Alias+1), MatchFunc, TypeFunc);
		}
	}

	public AppendExtendedSyntax(PatternName: string, SyntaxFlag: number, MatchFunc: GtFunc, TypeFunc: GtFunc): void {
		var Alias: number = PatternName.indexOf(" ");
		var Name: string = (Alias == -1) ? PatternName : PatternName.substring(0, Alias);
		var Pattern: GtSyntaxPattern = new GtSyntaxPattern(this, Name, MatchFunc, TypeFunc);
		Pattern.SyntaxFlag = SyntaxFlag;
		this.AppendSyntaxPattern("\t" + Name, Pattern, null);
		if(Alias != -1) {
			this.AppendExtendedSyntax(PatternName.substring(Alias+1), SyntaxFlag, MatchFunc, TypeFunc);
		}
	}

	public  GetType(TypeName: string): GtType {
		var TypeInfo: Object = this.GetSymbol(TypeName);
		if(TypeInfo instanceof GtType) {
			return <GtType>TypeInfo;
		}
		return null;
	}

	public  AppendTypeName(Type: GtType, SourceToken: GtToken): GtType {
		if(Type.PackageNameSpace == null) {
			Type.PackageNameSpace = this;
			if(this.PackageName != null) {
				this.Context.SetNativeTypeName(this.PackageName + "." + Type.ShortName, Type);
			}
		}
		if(Type.BaseType == Type) {
			this.SetSymbol(Type.ShortName, Type, SourceToken);
		}
		return Type;
	}

	public  AppendTypeVariable(Name: string, ParamBaseType: GtType, SourceToken: GtToken, RevertList: Array<Object>): GtType {
		this.UpdateRevertList(Name, RevertList);
		var TypeVar: GtType = new GtType(this.Context, TypeVariable, Name, ParamBaseType, null);
		this.SetSymbol(Name, TypeVar, SourceToken);
		return TypeVar;
	}

	public  GetClassSymbol(ClassType: GtType, Symbol: string, RecursiveSearch: boolean): Object {
		while(ClassType != null) {
			var Key: string = ClassSymbol(ClassType, Symbol);
			var Value: Object = this.GetSymbol(Key);
			if(Value != null) {
				return Value;
			}
//			if(ClassType.IsDynamicNaitiveLoading() & this.Context.RootNameSpace.GetLocalUndefinedSymbol(Key) == null) {
//				Value = LibGreenTea.LoadNativeStaticFieldValue(ClassType, Symbol.substring(1));
//				if(Value != null) {
//					return Value;
//				}
//				//LibGreenTea.LoadNativeMethods(ClassType, Symbol, FuncList);
//			}
			if(!RecursiveSearch) {
				break;
			}
			ClassType = ClassType.ParentMethodSearch;
		}
		return null;
	}

	public  GetClassStaticSymbol(StaticClassType: GtType, Symbol: string, RecursiveSearch: boolean): Object {
		var Key: string = null;
		var ClassType: GtType = StaticClassType;
		while(ClassType != null) {
			Key = ClassStaticSymbol(ClassType, Symbol);
			var Value: Object = this.GetSymbol(Key);
			if(Value != null) {
				return Value;
			}
			if(!RecursiveSearch) {
				break;
			}
			ClassType = ClassType.SuperType;
		}
		Key = ClassStaticSymbol(StaticClassType, Symbol);
		if(StaticClassType.IsDynamicNaitiveLoading() && this.Context.RootNameSpace.GetLocalUndefinedSymbol(Key) == null) {
			var Value: Object = LibGreenTea.LoadNativeStaticFieldValue(StaticClassType, Symbol);
			if(Value == null) {
				this.Context.RootNameSpace.SetUndefinedSymbol(Key, null);
			}
			else {
				this.Context.RootNameSpace.SetSymbol(Key, Value, null);
			}
			return Value;
		}
		return null;
	}
	
//	public final void ImportClassSymbol(GtNameSpace NameSpace, String Prefix, GtType ClassType, GtToken SourceToken) {
//		#Local#String ClassPrefix = ClassSymbol(ClassType, ClassStaticName(""));
//		#Local#ArrayList<String> KeyList = new ArrayList<String>();
//		#Local#GtNameSpace ns = NameSpace;
//		while(ns != null) {
//			if(ns.SymbolPatternTable != null) {
//				LibGreenTea.RetrieveMapKeys(ns.SymbolPatternTable, ClassPrefix, KeyList);
//			}
//			ns = ns.ParentNameSpace;
//		}
//		#Local#int i = 0;
//		while(i < KeyList.size()) {
//			#Local#String Key = KeyList.get(i);
//			#Local#Object Value = NameSpace.GetSymbol(Key);
//			Key = Key.replace(ClassPrefix, Prefix);
//			if(SourceToken != null) {
//				SourceToken.ParsedText = Key;
//			}
//			this.SetSymbol(Key, Value, SourceToken);
//			i = i + 1;
//		}
//	}

	public  GetGetterFunc(ClassType: GtType, Symbol: string, RecursiveSearch: boolean): GtFunc {
		var Func: Object = this.Context.RootNameSpace.GetClassSymbol(ClassType, GetterSymbol(Symbol), RecursiveSearch);
		if(Func instanceof GtFunc) {
			return <GtFunc>Func;
		}
		Func = this.Context.RootNameSpace.GetLocalUndefinedSymbol(ClassSymbol(ClassType, GetterSymbol(Symbol)));
		if(ClassType.IsDynamicNaitiveLoading() && Func == null) {
			return LibGreenTea.LoadNativeField(ClassType, Symbol, false);
		}
		return null;
	}

	public  GetSetterFunc(ClassType: GtType, Symbol: string, RecursiveSearch: boolean): GtFunc {
		var Func: Object = this.Context.RootNameSpace.GetClassSymbol(ClassType, SetterSymbol(Symbol), RecursiveSearch);
		if(Func instanceof GtFunc) {
			return <GtFunc>Func;
		}
		Func = this.Context.RootNameSpace.GetLocalUndefinedSymbol(ClassSymbol(ClassType, SetterSymbol(Symbol)));
		if(ClassType.IsDynamicNaitiveLoading() && Func == null) {
			return LibGreenTea.LoadNativeField(ClassType, Symbol, true);
		}
		return null;
	}

	public  GetConverterFunc(FromType: GtType, ToType: GtType, RecursiveSearch: boolean): GtFunc {
		var Func: Object = this.Context.RootNameSpace.GetClassSymbol(FromType, ConverterSymbol(ToType), RecursiveSearch);
		if(Func instanceof GtFunc) {
			return <GtFunc>Func;
		}
		return null;
	}

	public  GetMethod(ClassType: GtType, Symbol: string, RecursiveSearch: boolean): GtPolyFunc {
		var FuncList: Array<GtFunc> = new Array<GtFunc>();
		while(ClassType != null) {
			var Key: string = ClassSymbol(ClassType, Symbol);
			var RootValue: Object = this.RetrieveFuncList(Key, FuncList);
			if(RootValue == null && ClassType.IsDynamicNaitiveLoading()) {
				if(LibGreenTea.EqualsString(Symbol, ConstructorSymbol())) {
					LibGreenTea.LoadNativeConstructors(ClassType, FuncList);
				}
				else {
					LibGreenTea.LoadNativeMethods(ClassType, Symbol, FuncList);
				}
			}
			if(!RecursiveSearch) {
				break;
			}
			//System.err.println("** " + ClassType + ", " + ClassType.ParentMethodSearch);
			ClassType = ClassType.ParentMethodSearch;
		}
		return new GtPolyFunc(FuncList);
	}

	public  GetConstructorFunc(ClassType: GtType): GtPolyFunc {
		return this.Context.RootNameSpace.GetMethod(ClassType, ConstructorSymbol(), false);
	}

	public  GetOverridedMethod(ClassType: GtType, GivenFunc: GtFunc): GtFunc {
		var Symbol: string = FuncSymbol(GivenFunc.FuncName);
		var GivenClassType: GtType = GivenFunc.GetRecvType();
		if(ClassType != GivenClassType) {
			var FuncList: Array<GtFunc> = new Array<GtFunc>();
			while(ClassType != null) {
				var Key: string = ClassSymbol(ClassType, Symbol);
				this.RetrieveFuncList(Key, FuncList);
				var i: number = 0;
				while(i < FuncList.size()) {
					var Func: GtFunc = FuncList.get(i); 
					i += 1;
					if(Func.EqualsOverridedMethod(GivenFunc)) {
						return Func;
					}
				}
				FuncList.clear();
				ClassType = ClassType.ParentMethodSearch;
			}
		}
		return GivenFunc;
	}

	
	public  RetrieveFuncList(FuncName: string, FuncList: Array<GtFunc>): Object {
		var FuncValue: Object = this.GetLocalSymbol(FuncName);
		if(FuncValue instanceof GtFunc) {
			var Func: GtFunc = <GtFunc>FuncValue;
			FuncList.add(Func);
		}
		else if(FuncValue instanceof GtPolyFunc) {
			var PolyFunc: GtPolyFunc = <GtPolyFunc>FuncValue;
			var i: number = PolyFunc.FuncList.size() - 1;
			while(i >= 0) {
				FuncList.add(PolyFunc.FuncList.get(i));
				i = i - 1;
			}
		}
		if(this.ParentNameSpace != null) {
			return this.ParentNameSpace.RetrieveFuncList(FuncName, FuncList);
		}
		return FuncValue;
	}

	public  GetPolyFunc(FuncName: string): GtPolyFunc {
		var FuncList: Array<GtFunc> = new Array<GtFunc>();
		this.RetrieveFuncList(FuncName, FuncList);
		return new GtPolyFunc(FuncList);
	}

	public  GetFunc(FuncName: string, BaseIndex: number, TypeList: Array<GtType>): GtFunc {
		var FuncList: Array<GtFunc> = new Array<GtFunc>();
		this.RetrieveFuncList(FuncName, FuncList);
		var i: number = 0;
		while(i < FuncList.size()) {
			var Func: GtFunc = FuncList.get(i);
			if(Func.Types.length == TypeList.size() - BaseIndex) {
				var j: number = 0;
				while(j < Func.Types.length) {
					if(TypeList.get(BaseIndex + j) != Func.Types[j]) {
						Func = null;
						break;
					}
					j = j + 1;
				}
				if(Func != null) {
					return Func;
				}
			}
			i = i + 1;
		}
		return null;
	}

	public  AppendFuncName(Key: string, Func: GtFunc, SourceToken: GtToken): Object {
		var OldValue: Object = this.GetLocalSymbol(Key);
		if(OldValue instanceof GtSyntaxPattern) {
			return OldValue;
		}
		if(OldValue instanceof GtFunc) {
			var OldFunc: GtFunc = <GtFunc>OldValue;
			if(!OldFunc.EqualsType(Func)) {
				var PolyFunc: GtPolyFunc = new GtPolyFunc(null);
				PolyFunc.Append(OldFunc, SourceToken);
				PolyFunc.Append(Func, SourceToken);
				this.SetSymbol(Key, PolyFunc, null);
				return PolyFunc;
			}
			// error
		}
		else if(OldValue instanceof GtPolyFunc) {
			var PolyFunc: GtPolyFunc = <GtPolyFunc>OldValue;
			PolyFunc.Append(Func, SourceToken);
			return PolyFunc;
		}
		this.SetSymbol(Key, Func, SourceToken);
		return OldValue;
	}

	public  AppendFunc(Func: GtFunc, SourceToken: GtToken): Object {
		return this.AppendFuncName(Func.FuncName, Func, SourceToken);
	}

	public  AppendMethod(Func: GtFunc, SourceToken: GtToken): Object {
		var ClassType: GtType = Func.GetRecvType();
		if(ClassType.IsGenericType() && ClassType.HasTypeVariable()) {
			ClassType = ClassType.BaseType;
		}
		var Key: string = ClassSymbol(ClassType, Func.FuncName);
		return this.AppendFuncName(Key, Func, SourceToken);
	}

	public  AppendConstructor(ClassType: GtType, Func: GtFunc, SourceToken: GtToken): void {
		var Key: string = ClassSymbol(ClassType, ConstructorSymbol());
		LibGreenTea.Assert(Func.Is(ConstructorFunc));
		this.Context.RootNameSpace.AppendFuncName(Key, Func, SourceToken);  // @Public
	}

	public  SetGetterFunc(ClassType: GtType, Name: string, Func: GtFunc, SourceToken: GtToken): void {
		var Key: string = ClassSymbol(ClassType, GetterSymbol(Name));
		LibGreenTea.Assert(Func.Is(GetterFunc));
		this.Context.RootNameSpace.SetSymbol(Key, Func, SourceToken);  // @Public
	}

	public  SetSetterFunc(ClassType: GtType, Name: string, Func: GtFunc, SourceToken: GtToken): void {
		var Key: string = ClassSymbol(ClassType, SetterSymbol(Name));
		LibGreenTea.Assert(Func.Is(SetterFunc));
		this.Context.RootNameSpace.SetSymbol(Key, Func, SourceToken);  // @Public
	}

	public  SetConverterFunc(ClassType: GtType, ToType: GtType, Func: GtFunc, SourceToken: GtToken): void {
		if(ClassType == null) {
			ClassType = Func.GetFuncParamType(1);
		}
		if(ToType == null) {
			ToType = Func.GetReturnType();
		}
		var Key: string = ClassSymbol(ClassType, ConverterSymbol(ToType));
		LibGreenTea.Assert(Func.Is(ConverterFunc));		
		this.Context.RootNameSpace.SetSymbol(Key, Func, SourceToken);
	}

	
	
	 EvalWithErrorInfo(ScriptText: string, FileLine: number): Object {
		var ResultValue: Object = null;
		LibGreenTea.VerboseLog(VerboseEval, "eval: " + ScriptText);
		var TokenContext: GtTokenContext = new GtTokenContext(this, ScriptText, FileLine);
		this.Context.Generator.StartCompilationUnit();
		TokenContext.SkipEmptyStatement();
		while(TokenContext.HasNext()) {
			var Annotation: GtMap = TokenContext.SkipAndGetAnnotation(true);
			TokenContext.ParseFlag = 0; // init
			//System.err.println("** TokenContext.Position=" + TokenContext.CurrentPosition + ", " + TokenContext.IsAllowedBackTrack());
			var TopLevelTree: GtSyntaxTree = TokenContext.ParsePattern(this, "$Expression$", Required);
			TokenContext.SkipEmptyStatement();			
			if(TopLevelTree.IsError() && TokenContext.HasNext()) {
				var Token: GtToken = TokenContext.GetToken();
				this.Context.ReportError(InfoLevel, TokenContext.GetToken(), "stopping script eval at " + Token.ParsedText);
				ResultValue = TopLevelTree.KeyToken;  // in case of error, return error token
				break;
			}
			if(TopLevelTree.IsValidSyntax()) {
				TopLevelTree.SetAnnotation(Annotation);
				var Gamma: GtTypeEnv = new GtTypeEnv(this);
				var Node: GtNode = TopLevelTree.TypeCheck(Gamma, Gamma.VoidType, DefaultTypeCheckPolicy);
				ResultValue = Node.ToConstValue(true/*EnforceConst*/);
			}
			TokenContext.Vacume();
		}
		this.Context.Generator.FinishCompilationUnit();
		return ResultValue;
	}

	public  Eval(ScriptText: string, FileLine: number): Object {
		var ResultValue: Object = this.EvalWithErrorInfo(ScriptText, FileLine);
		if(ResultValue instanceof GtToken && (<GtToken>ResultValue).IsError()) {
			return null;
		}
		return ResultValue;
	}

	public  Load(ScriptText: string, FileLine: number): boolean {
		var Token: Object = this.EvalWithErrorInfo(ScriptText, FileLine);
		if(Token instanceof GtToken && (<GtToken>Token).IsError()) {
			return false;
		}
		return true;
	}

	public  LoadFile(FileName: string): boolean {
		var ScriptText: string = LibGreenTea.LoadFile2(FileName);
		if(ScriptText != null) {
			var FileLine: number = this.Context.GetFileLine(FileName, 1);
			return this.Load(ScriptText, FileLine);
		}
		return false;
	}

	public  LoadRequiredLib(LibName: string): boolean {
		var Key: string = NativeNameSuffix + "L" + LibName.toLowerCase();
		if(!this.HasSymbol(Key)) {
			var Path: string = LibGreenTea.GetLibPath(this.Context.Generator.TargetCode, LibName);
			var Script: string = LibGreenTea.LoadFile2(Path);
			if(Script != null) {
				var FileLine: number = this.Context.GetFileLine(Path, 1);
				if(this.Load(Script, FileLine)) {
					this.SetSymbol(Key, Path, null);
					return true;
				}
			}
			return false;
		}
		return true;
	}

	private UpdateRevertList(Key: string, RevertList: Array<Object>): void {
		var Value: Object = this.GetLocalSymbol(Key);
		RevertList.add(Key);
		if(Value != null) {
			RevertList.add(Value);
		}
		else {
			RevertList.add(UndefinedSymbol);
		}
	}

	public Revert(RevertList: Array<Object>): void {
		var i: number = 0;
		while(i < RevertList.size()) {
			var Key: string = <string>RevertList.get(i);
			var Value: Object = RevertList.get(i+1);
			this.SetSymbol(Key, Value, null);
			i += 2;
		}
	}

}
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



class GtFuncBlock {
	public NameSpace: GtNameSpace;
	public NameList: Array<string>;
	public FuncBlock: GtSyntaxTree;
	public IsVarArgument: boolean;
	public TypeList: Array<GtType>;
	public DefinedFunc: GtFunc;

	constructor(NameSpace: GtNameSpace, TypeList: Array<GtType>) {
		this.NameSpace = NameSpace;
		this.TypeList = TypeList;
		this.NameList = new Array<string>();
		this.FuncBlock = null;
		this.IsVarArgument = false;
		this.DefinedFunc = null;
	}

	SetThisIfInClass(Type: GtType): void {
		if(Type != null) {
			this.TypeList.add(Type);
			this.NameList.add(this.NameSpace.Context.Generator.GetRecvName());
		}
	}

	SetConverterType(): void {
		this.TypeList.add(this.NameSpace.Context.TypeType);
		this.NameList.add("type");
	}

	AddParameter(Type: GtType, Name: string): void {
		this.TypeList.add(Type);
		if(Type.IsVarType()) {
			this.IsVarArgument = true;
		}
		this.NameList.add(Name);
	}
}

class GtFunc {
	public FuncFlag: number;
	public FuncName: string;
	public MangledName: string;
	public Types: GtType[];
	public FuncType: GtType;
	public                 FuncId: number;
	public FuncBody: Object;  // Abstract function if null
	public GenericParam: string[];

	constructor(FuncFlag: number, FuncName: string, BaseIndex: number, ParamList: Array<GtType>) {
		this.FuncFlag = FuncFlag;
		this.FuncName = FuncName;
		this.Types = LibGreenTea.CompactTypeList(BaseIndex, ParamList);
		LibGreenTea.Assert(this.Types.length > 0);
		this.FuncType = null;
		this.FuncBody = null;
		var Context: GtParserContext = this.GetContext();
		this.FuncId = Context.FuncPools.size();
		Context.FuncPools.add(this);
		this.MangledName = FuncName + NativeNameSuffix + this.FuncId;
	}

	public  GetContext(): GtParserContext {
		return this.GetReturnType().Context;
	}

	public  GetNativeFuncName(): string {
		if(this.Is(ExportFunc)) {
			return this.FuncName;
		}
		else {
			return this.MangledName;
		}
	}

	public  GetFuncType(): GtType {
		if(this.FuncType == null) {
			var Context: GtParserContext = this.GetRecvType().Context;
			this.FuncType = Context.GetGenericType(Context.FuncType, 0, this.Types, true);
		}
		return this.FuncType;
	}

	public toString(): string {
		var s: string = this.GetReturnType().GetRevealedType() + " " + this.FuncName + "(";
		var i: number = 0;
		while(i < this.GetFuncParamSize()) {
			var ParamType: GtType = this.GetFuncParamType(i).GetRevealedType();
			if(i > 0) {
				s += ", ";
			}
			s += ParamType;
			i += 1;
		}
		return s + ")";
	}

	public Is(Flag: number): boolean {
		return IsFlag(this.FuncFlag, Flag);
	}

	public  GetReturnType(): GtType {
		return this.Types[0];
	}

	public  SetReturnType(ReturnType: GtType): void {
		LibGreenTea.Assert(this.GetReturnType().IsVarType());
		this.Types[0] = ReturnType;
		this.FuncType = null; // reset
	}

	public  GetRecvType(): GtType {
		if(this.Types.length == 1) {
			return this.Types[0].Context.VoidType;
		}
		return this.Types[1];
	}

	public  GetFuncParamSize(): number {
		return this.Types.length - 1;
	}

	public  GetFuncParamType(ParamIdx: number): GtType {
		return this.Types[ParamIdx+1];
	}

	public  GetMethodParamSize(): number {
		return this.Types.length - 2;
	}

	public  GetVargType(): GtType {
		if(this.Types.length > 0) {
			var VargType: GtType = this.Types[this.Types.length - 1];
			if(VargType.IsArrayType()) {
				return VargType.TypeParams[0];
			}
		}
		return null;
	}

	public  EqualsParamTypes(BaseIndex: number, ParamTypes: GtType[]): boolean {
		if(this.Types.length == ParamTypes.length) {
			var i: number = BaseIndex;
			while(i < this.Types.length) {
				if(this.Types[i] != ParamTypes[i]) {
					return false;
				}
				i = i + 1;
			}
			return true;
		}
		return false;
	}

	public  EqualsType(AFunc: GtFunc): boolean {
		return this.EqualsParamTypes(0, AFunc.Types);
	}

	public  EqualsOverridedMethod(AFunc: GtFunc): boolean {
		return this.Types[0] == AFunc.Types[0] && this.EqualsParamTypes(2, AFunc.Types);
	}

	public  IsAbstract(): boolean {
		return this.FuncBody == null;
	}

	public  SetNativeMacro(NativeMacro: string): void {
		LibGreenTea.Assert(this.FuncBody == null);
		this.FuncFlag |= NativeMacroFunc;
		this.FuncBody = NativeMacro;
	}

	public  GetNativeMacro(): string {
		return <string>this.FuncBody;
	}

	public  SetNativeMethod(OptionalFuncFlag: number, Method: Object): void {
		this.FuncFlag |= NativeFunc | OptionalFuncFlag;
		this.FuncBody = Method;
	}

	private HasStaticBlock(): boolean {
		if(this.FuncBody instanceof GtFuncBlock) {
			var FuncBlock: GtFuncBlock = <GtFuncBlock>this.FuncBody;
			return !FuncBlock.IsVarArgument;
		}
		return false;
	}

	public GenerateNativeFunc(): void {
		if(this.HasStaticBlock()) {
			var FuncBlock: GtFuncBlock = <GtFuncBlock>this.FuncBody;
			var Gamma: GtTypeEnv = new GtTypeEnv(FuncBlock.NameSpace);
			var i: number = 0;
			var NameList: Array<string> = new Array<string>();
			while(i <  FuncBlock.NameList.size()) {
				var VarInfo: GtVariableInfo = Gamma.AppendDeclaredVariable(0, FuncBlock.DefinedFunc.Types[i+1], FuncBlock.NameList.get(i), null, null);
				NameList.add(VarInfo.NativeName);
				i = i + 1;
			}
			Gamma.Func = FuncBlock.DefinedFunc;
			var BodyNode: GtNode = TypeBlock(Gamma, FuncBlock.FuncBlock, Gamma.VoidType);
			if(Gamma.FoundUncommonFunc) {
				Gamma.Func.FuncFlag = UnsetFlag(Gamma.Func.FuncFlag, CommonFunc);
			}
			var FuncName: string = FuncBlock.DefinedFunc.GetNativeFuncName();
			Gamma.Generator.GenerateFunc(FuncBlock.DefinedFunc, NameList, BodyNode);
			if(FuncName.equals("main")) {
				Gamma.Generator.InvokeMainFunc(FuncName);
			}
		}
	}

	public HasLazyBlock(): boolean {
		if(this.FuncBody instanceof GtFuncBlock) {
			var FuncBlock: GtFuncBlock = <GtFuncBlock>this.FuncBody;
			return FuncBlock.IsVarArgument;
		}
		return false;
	}

	public GenerateLazyFunc(NodeList: Array<GtNode>): GtFunc {
		return null; // TODO
	}

	public  GetGenericNameSpace(NameSpace: GtNameSpace, NodeList: Array<GtNode>, MaxSize: number): GtNameSpace {
		if(this.Is(GenericFunc)) {
			var GenericNameSpace: GtNameSpace = NameSpace.CreateSubNameSpace();
			var i: number = 0;
			while(i < this.Types.length) {
				this.Types[i].AppendTypeVariable(GenericNameSpace, 0);
				i = i + 1;
			}
			i = 0;
			while(i < MaxSize) {
				this.Types[i+1].Match(GenericNameSpace, NodeList.get(i).Type);
				i = i + 1;				
			}
			return GenericNameSpace;
		}
		return NameSpace;
	}

	public  GetGenericNameSpaceT(NameSpace: GtNameSpace, NodeList: Array<GtType>, MaxSize: number): GtNameSpace {
		if(this.Is(GenericFunc)) {
			var GenericNameSpace: GtNameSpace = NameSpace.CreateSubNameSpace();
			var i: number = 0;
			while(i < this.Types.length) {
				this.Types[i].AppendTypeVariable(GenericNameSpace, 0);
				i = i + 1;
			}
			i = 0;
			while(i < MaxSize) {
				this.Types[i+1].Match(GenericNameSpace, NodeList.get(i));
				i = i + 1;				
			}
			return GenericNameSpace;
		}
		return NameSpace;
	}

	public Apply(Arguments: Object[]): Object {
		if(this.IsAbstract()) {
			LibGreenTea.VerboseLog(VerboseRuntime, "applying abstract function: " + this);
			return this.GetReturnType().DefaultNullValue;
		}
		else if(!this.Is(NativeStaticFunc)) {
			var MethodArguments: Object[] = new Array<Object>(Arguments.length-1);
			LibGreenTea.ArrayCopy(Arguments, 1, MethodArguments, 0, MethodArguments.length);
			return LibGreenTea.ApplyFunc(this, Arguments[0], MethodArguments);
		}
		return LibGreenTea.ApplyFunc(this, null, Arguments);
	}


}

class GtResolvedFunc {
	public GenericNameSpace: GtNameSpace;
	public Func: GtFunc;
	public ReturnType: GtType;
	public ErrorNode: GtNode;
	constructor(NameSpace: GtNameSpace) {
		this.GenericNameSpace = NameSpace;
		this.Func = null;
		this.ReturnType = NameSpace.Context.AnyType;
		this.ErrorNode = null;
	}	
	UpdateFunc(Func: GtFunc, GenericNameSpace: GtNameSpace): GtResolvedFunc {		
		this.Func = Func;
		if(Func != null) {
			this.ReturnType = Func.GetReturnType().RealType(GenericNameSpace, GenericNameSpace.Context.AnyType);
		}
		return this;
	}
}

class GtPolyFunc {
	public FuncList: Array<GtFunc>;

	constructor(FuncList: Array<GtFunc>) {
		this.FuncList = FuncList == null ? new Array<GtFunc>() : FuncList;
	}

	public toString(): string { // this is used in an error message
		var s: string = "";
		var i: number = 0;
		while(i < this.FuncList.size()) {
			if(i > 0) {
				s = s + ", ";
			}
			s = s + this.FuncList.get(i);
			i = i + 1;
		}
		return s;
	}

	public  Append(Func: GtFunc, SourceToken: GtToken): GtPolyFunc {
		if(SourceToken != null) {
			var i: number = 0;
			while(i < this.FuncList.size()) {
				var ListedFunc: GtFunc = this.FuncList.get(i);
				if(ListedFunc == Func) {
					return this; /* same function */
				}
				if(Func.EqualsType(ListedFunc)) {
					Func.GetContext().ReportError(WarningLevel, SourceToken, "duplicated symbol" + SourceToken.ParsedText);
					break;
				}
				i = i + 1;
			}
		}
		this.FuncList.add(Func);
		return this;
	}

	public ResolveUnaryMethod(Gamma: GtTypeEnv, Type: GtType): GtFunc {
		var i: number = 0;
		while(i < this.FuncList.size()) {
			var Func: GtFunc = this.FuncList.get(i);
			if(Func.GetFuncParamSize() == 1) {
				return Func;
			}
			i = i + 1;
		}
		return null;
	}

	public  CheckIncrementalTyping(NameSpace: GtNameSpace, FuncParamSize: number, ParamList: Array<GtNode>, ResolvedFunc: GtResolvedFunc): boolean {
		var FoundFunc: GtFunc = null;
		var GenericNameSpace: GtNameSpace = null;
		var i: number = 0;
		while(i < this.FuncList.size()) {
			var Func: GtFunc = this.FuncList.get(i);
			if(Func.GetFuncParamSize() == FuncParamSize) {
				GenericNameSpace = Func.GetGenericNameSpace(NameSpace, ParamList, 0);
				var p: number = 0;
				while(p < ParamList.size()) {
					var Node: GtNode = ParamList.get(p);
					if(!Func.Types[p + 1].Match(GenericNameSpace, Node.Type)) {
						Func = null;
						break;
					}
					p = p + 1;
				}
				if(Func != null) {
					if(ParamList.size() == FuncParamSize) {
						// when paramsize matched, unnecessary to check others
						ResolvedFunc.Func = Func;    
						return true;
					}
					if(FoundFunc != null) {
						ResolvedFunc.Func = null;
						return false; // two more func
					}
					FoundFunc = Func;
				}
			}
			i = i + 1;
		}
		ResolvedFunc.Func = FoundFunc;
		ResolvedFunc.GenericNameSpace = GenericNameSpace;
		return true;
	}

	public CheckParamWithCoercion(GenericNameSpace: GtNameSpace, Func: GtFunc, ParamList: Array<GtNode>): GtFunc {
		var p: number = 0;
		var ConvertedNodes: GtNode[] = null;
		while(p < ParamList.size()) {
			var ParamType: GtType = Func.Types[p + 1];
			var Node: GtNode = ParamList.get(p);
			ParamType = ParamType.RealType(GenericNameSpace, Node.Type);
			if(!ParamType.Accept(Node.Type)) {
				var TypeCoercion: GtFunc = GenericNameSpace.GetConverterFunc(Node.Type, ParamType, true);
				if(TypeCoercion != null && TypeCoercion.Is(CoercionFunc)) {
					if(ConvertedNodes == null) {
						ConvertedNodes = new Array<GtNode>(ParamList.size());
					}
					ConvertedNodes[p] = GenericNameSpace.Context.Generator.CreateCoercionNode(ParamType, TypeCoercion, Node);
				}
				else {
					return null;
				}
			}
			p = p + 1;
		}
		if(ConvertedNodes != null) {
			p = 1;
			while(p < ConvertedNodes.length) {
				if(ConvertedNodes[p] != null) {
					ParamList.set(p, ConvertedNodes[p]);
				}
				p = p + 1;
			}
		}
		return Func;
	}

	public CheckParamAsVarArg(GenericNameSpace: GtNameSpace, Func: GtFunc, VargType: GtType, ParamList: Array<GtNode>): GtFunc {
		var p: number = 0;
		var ConvertedNodes: GtNode[] = null;
		while(p < ParamList.size()) {
			var ParamType: GtType = (p + 1 < Func.Types.length - 1) ? Func.Types[p + 1] : VargType;
			var Node: GtNode = ParamList.get(p);
			var RealType: GtType = ParamType.RealType(GenericNameSpace, Node.Type);
			if(RealType == null) {
				return null;
			}
			if(!ParamType.Accept(RealType)) {
				var TypeCoercion: GtFunc = GenericNameSpace.GetConverterFunc(RealType, ParamType, true);
				if(TypeCoercion != null && TypeCoercion.Is(CoercionFunc)) {
					if(ConvertedNodes == null) {
						ConvertedNodes = new Array<GtNode>(ParamList.size());
					}
					ConvertedNodes[p] = GenericNameSpace.Context.Generator.CreateCoercionNode(ParamType, TypeCoercion, Node);
				}
				else {
					return null;
				}
			}
			p = p + 1;
		}
		if(ConvertedNodes != null) {
			p = 1;
			while(p < ConvertedNodes.length) {
				if(ConvertedNodes[p] != null) {
					ParamList.set(p, ConvertedNodes[p]);
				}
				p = p + 1;
			}
			ConvertedNodes = null;
		}
		if(!Func.Is(NativeVariadicFunc)) {
			var ArrayType: GtType = Func.Types[Func.Types.length - 1];
			var ArrayNode: GtNode = GenericNameSpace.Context.Generator.CreateArrayNode(ArrayType, null);
			p = Func.Types.length - 1;
			while(p < ParamList.size()) {
				ArrayNode.Append(ParamList.get(p));
			}
			while(Func.Types.length - 1 < ParamList.size()) {
				ParamList.remove(ParamList.size() - 1);
			}
			ParamList.add(ArrayNode);
		}
		return Func;
	}

	public GetAcceptableFunc(Gamma: GtTypeEnv, FuncParamSize: number, ParamList: Array<GtNode>, ResolvedFunc: GtResolvedFunc): GtResolvedFunc {
		var i: number = 0;
		while(i < this.FuncList.size()) {
			var Func: GtFunc = this.FuncList.get(i);
			if(Func.GetFuncParamSize() == FuncParamSize) {
				var GenericNameSpace: GtNameSpace = Func.GetGenericNameSpace(Gamma.NameSpace, ParamList, 0);
				Func = this.CheckParamWithCoercion(GenericNameSpace, Func, ParamList);
				if(Func != null) {
					return ResolvedFunc.UpdateFunc(Func, GenericNameSpace);
				}
			}
			i = i + 1;
		}
		i = 0;
		while(i < this.FuncList.size()) {
			var Func: GtFunc = this.FuncList.get(i);
			var VargType: GtType = Func.GetVargType();
			if(VargType != null && Func.GetFuncParamSize() <= FuncParamSize) {
				var GenericNameSpace: GtNameSpace = Func.GetGenericNameSpace(Gamma.NameSpace, ParamList, 0);
				Func = this.CheckParamAsVarArg(GenericNameSpace, Func, VargType, ParamList);
				if(Func != null) {
					return ResolvedFunc.UpdateFunc(Func, GenericNameSpace);
				}
			}
			i = i + 1;
		}
		return ResolvedFunc;
	}

	public ResolveFunc(Gamma: GtTypeEnv, ParsedTree: GtSyntaxTree, TreeIndex: number, ParamList: Array<GtNode>): GtResolvedFunc {
		var FuncParamSize: number = LibGreenTea.ListSize(ParsedTree.SubTreeList) - TreeIndex + ParamList.size();
		//System.err.println("*** FuncParamSize=" + FuncParamSize + ", resolved_size=" + ParamList.size());
		//System.err.println("*** FuncList=" + this);
		var ResolvedFunc: GtResolvedFunc = new GtResolvedFunc(Gamma.NameSpace);
		while(!this.CheckIncrementalTyping(Gamma.NameSpace, FuncParamSize, ParamList, ResolvedFunc) && TreeIndex < LibGreenTea.ListSize(ParsedTree.SubTreeList)) {
			var Node: GtNode = ParsedTree.TypeCheckAt(TreeIndex, Gamma, Gamma.VarType, DefaultTypeCheckPolicy);
			if(Node.IsErrorNode()) {
				ResolvedFunc.ErrorNode = Node;
				return ResolvedFunc;
			}
			ParamList.add(Node);
			TreeIndex = TreeIndex + 1;
		}
		if(ResolvedFunc.Func != null) {
			var GenericNameSpace: GtNameSpace = ResolvedFunc.GenericNameSpace;
			while(TreeIndex < LibGreenTea.ListSize(ParsedTree.SubTreeList)) {
				var ContextType: GtType = ResolvedFunc.Func.GetFuncParamType(ParamList.size()/*ResolvedSize*/);
				ContextType = ContextType.RealType(GenericNameSpace, Gamma.VarType);
				//System.err.println("TreeIndex="+ TreeIndex+" NodeSize="+ParamList.size()+" ContextType="+ContextType);
				var Node: GtNode = ParsedTree.TypeCheckAt(TreeIndex, Gamma, ContextType, DefaultTypeCheckPolicy);
				if(Node.IsErrorNode()) {
					ResolvedFunc.ErrorNode = Node;
					return ResolvedFunc;
				}				
				if(ContextType.IsVarType()) {
					ResolvedFunc.Func.Types[TreeIndex+1].Match(GenericNameSpace, Node.Type);
				}
				ParamList.add(Node);
				TreeIndex = TreeIndex + 1;
			}
			return ResolvedFunc.UpdateFunc(ResolvedFunc.Func, GenericNameSpace);
		}
		return this.GetAcceptableFunc(Gamma, FuncParamSize, ParamList, ResolvedFunc);
	}
	
	private CheckArguments(NameSpace: GtNameSpace, Func: GtFunc, Arguments: Object[], ConvertedArguments: Object[], TypeList: Array<GtType>): boolean {
		var p: number = 0;
		while(p < Arguments.length) {
			var DefinedType: GtType = Func.Types[p + 1];
			var GivenType: GtType = TypeList.get(p);
			if(DefinedType.Accept(GivenType)) {
				ConvertedArguments[p] = Arguments[p];
			}
			else {
				var TypeCoercion: GtFunc = NameSpace.GetConverterFunc(GivenType, DefinedType, true);
				if(TypeCoercion != null && TypeCoercion.Is(CoercionFunc)) {
					ConvertedArguments[p] = LibGreenTea.DynamicConvertTo(DefinedType, Arguments[p]);
				}
				else {
					return false;
				}
			}
			p = p + 1;
		}
		return true;
	}

	public GetMatchedFunc(NameSpace: GtNameSpace, Arguments: Object[]): GtFunc {
		var OriginalArguments: Object[] = new Array<Object>(Arguments.length);
		LibGreenTea.ArrayCopy(Arguments, 0, OriginalArguments, 0, Arguments.length);
		var TypeList: Array<GtType> = new Array<GtType>();
		var i: number = 0;
		while(i < Arguments.length) {
			TypeList.add(NameSpace.Context.GuessType(Arguments[i]));
			i = i + 1;
		}
		i = 0;
		while(i < this.FuncList.size()) {
			var Func: GtFunc = this.FuncList.get(i);
			if(Func.GetFuncParamSize() == Arguments.length) {
				var GenericNameSpace: GtNameSpace = Func.GetGenericNameSpaceT(NameSpace, TypeList, 0);
				if(this.CheckArguments(GenericNameSpace, Func, OriginalArguments, Arguments, TypeList)) {
					return Func;
				}
			}
//			#Local#GtType VargType = Func.GetVargType();
//			if(VargType != null && Func.GetFuncParamSize() <= FuncParamSize) {
//				#Local#GtNameSpace GenericNameSpace = Func.GetGenericNameSpace(Gamma.NameSpace, ParamList, 0);
//				Func = this.CheckMethodArguments(GenericNameSpace, Func, Arguments);
//				if(Func != null) {
//					return Func;
//				}
//			}
			i = i + 1;
		}
		return null;
	}

//	public GtResolvedFunc ResolveConstructor(GtTypeEnv Gamma, GtSyntaxTree ParsedTree, int TreeIndex, ArrayList<GtNode> NodeList) {
//		#Local#int FuncParamSize = LibGreenTea.ListSize(ParsedTree.SubTreeList) - TreeIndex + NodeList.size();
////		System.err.println("*** FuncParamSize=" + FuncParamSize + " resolved_size=" + NodeList.size());
////		System.err.println("*** FuncList=" + this);
//		#Local#GtResolvedFunc ResolvedFunc = this.ResolveFunc(Gamma, ParsedTree, TreeIndex, NodeList);
//		if(ResolvedFunc.Func == null  && FuncParamSize == 1) {
//			
//		}
//		return ResolvedFunc;
//	}

	public MessageTypeError(ClassType: GtType, MethodName: string): string {
		if(ClassType == null) {
			if(this.FuncList.size() == 0) {
				return "undefined function: " + MethodName;
			}
			else {
				return "mismatched functions: " + this;
			}
		}
		else {
			if(this.FuncList.size() == 0) {
				return "undefined method: " + MethodName + " of " + ClassType;
			}
			else {
				return "mismatched methods: " + this;
			}
		}
	}

	public ReportTypeError(Gamma: GtTypeEnv, ParsedTree: GtSyntaxTree, ClassType: GtType, MethodName: string): GtNode {
		return Gamma.CreateSyntaxErrorNode(ParsedTree, this.MessageTypeError(ClassType, MethodName));
	}


}
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



class GtSyntaxPattern {
	public PackageNameSpace: GtNameSpace;
	public PatternName: string;
	SyntaxFlag: number;
	public MatchFunc: GtFunc;
	public TypeFunc: GtFunc;
	public ParentPattern: GtSyntaxPattern;

	constructor(NameSpace: GtNameSpace, PatternName: string, MatchFunc: GtFunc, TypeFunc: GtFunc) {
		this.PackageNameSpace = NameSpace;
		this.PatternName = PatternName;
		this.SyntaxFlag = 0;
		this.MatchFunc = MatchFunc;
		this.TypeFunc  = TypeFunc;
		this.ParentPattern = null;
	}

	public toString(): string {
		return this.PatternName + "<" + this.MatchFunc + ">";
	}

	public IsBinaryOperator(): boolean {
		return IsFlag(this.SyntaxFlag, BinaryOperator);
	}

	public  IsRightJoin(Right: GtSyntaxPattern): boolean {
		var left: number = this.SyntaxFlag;
		var right: number = Right.SyntaxFlag;
		return (left < right || (left == right && !IsFlag(this.SyntaxFlag, LeftJoin) && !IsFlag(Right.SyntaxFlag, LeftJoin)));
	}

	public  EqualsName(Name: string): boolean {
		return LibGreenTea.EqualsString(this.PatternName, Name);
	}

}
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



class GtSyntaxTree {
	public Annotation: GtMap;
	public ParentTree: GtSyntaxTree;
	public PrevTree: GtSyntaxTree;
	public NextTree: GtSyntaxTree;

	public NameSpace: GtNameSpace;
	public Pattern: GtSyntaxPattern;
	public KeyToken: GtToken;
	public SubTreeList: Array<GtSyntaxTree>;
	public ParsedValue: Object;

	constructor(Pattern: GtSyntaxPattern, NameSpace: GtNameSpace, KeyToken: GtToken, ParsedValue: Object) {
		this.NameSpace   = NameSpace;
		this.Annotation  = null;
		this.KeyToken    = KeyToken;
		this.Pattern     = Pattern;
		this.ParentTree  = null;
		this.PrevTree    = null;
		this.NextTree    = null;
		this.SubTreeList = null;
		this.ParsedValue  = ParsedValue;
	}

	public toString(): string {
		var s: string = "(" + this.KeyToken.ParsedText;
		var i: number = 0;
		while(i < LibGreenTea.ListSize(this.SubTreeList)) {
			var SubTree: GtSyntaxTree = this.SubTreeList.get(i);
			while(SubTree != null) {
				var Entry: string = SubTree.toString();
				if(LibGreenTea.ListSize(SubTree.SubTreeList) == 0) {
					Entry = SubTree.KeyToken.ParsedText;
				}
				s = s + " " + Entry;
				SubTree = SubTree.NextTree;
			}
			i += 1;
		}
		return s + ")";
	}

	public  AppendNext(Tree: GtSyntaxTree): void {
		var TailTree: GtSyntaxTree = this;
		while(TailTree.NextTree != null) {
			TailTree = TailTree.NextTree;
		}
		TailTree.NextTree = Tree;
	}

	public SetAnnotation(Annotation: GtMap): void {
		this.Annotation = Annotation;
	}

	public IsError(): boolean {
		return this.KeyToken.IsError();
	}

	public ToError(Token: GtToken): void {
		LibGreenTea.Assert(Token.IsError());
		this.KeyToken = Token;
		this.SubTreeList = null;
		this.Pattern = Token.PresetPattern;		
	}

	public IsMismatched(): boolean {
		return (this.Pattern == null);
	}

	public ToMismatched(): void {
		this.SubTreeList = null;
		this.Pattern = null; // Empty tree must backtrack
	}

	public IsMismatchedOrError(): boolean {
		return this.IsMismatched() || this.KeyToken.IsError();
	}

	public  IsValidSyntax(): boolean {
		return !(this.IsMismatchedOrError());
	}

	public ToEmptyOrError(ErrorTree: GtSyntaxTree): void {
		if(ErrorTree == null) {
			this.ToMismatched();
		}
		else {
			this.ToError(ErrorTree.KeyToken);
		}
	}

	public GetSyntaxTreeAt(Index: number): GtSyntaxTree {
		if(this.SubTreeList != null && Index >= this.SubTreeList.size()) {
			return null;
		}
		return this.SubTreeList.get(Index);
	}

	public SetSyntaxTreeAt(Index: number, Tree: GtSyntaxTree): void {
		if(!this.IsError()) {
			if(Tree.IsError()) {
				this.ToError(Tree.KeyToken);
			}
			else {
				if(Index >= 0) {
					if(this.SubTreeList == null) {
						this.SubTreeList = new Array<GtSyntaxTree>();
					}
					if(Index < this.SubTreeList.size()) {
						this.SubTreeList.set(Index, Tree);
						return;
					}
					while(this.SubTreeList.size() < Index) {
						this.SubTreeList.add(null);
					}
					this.SubTreeList.add(Tree);
					Tree.ParentTree = this;
				}
			}
		}
	}

	public SetMatchedPatternAt(Index: number, NameSpace: GtNameSpace, TokenContext: GtTokenContext, PatternName: string,  MatchFlag: number): void {
		if(!this.IsMismatchedOrError()) {
			var ParsedTree: GtSyntaxTree = TokenContext.ParsePattern(NameSpace, PatternName, MatchFlag);
			if(ParsedTree != null) {
				this.SetSyntaxTreeAt(Index, ParsedTree);
			}
			else {
				if(IsFlag(MatchFlag, Required)) {
					this.ToMismatched();
				}
			}
		}
	}

	public SetMatchedTokenAt(Index: number, NameSpace: GtNameSpace, TokenContext: GtTokenContext, TokenText: string, MatchFlag: number): void {
		if(!this.IsMismatchedOrError()) {
			var Pos: number = TokenContext.GetPosition(MatchFlag);
			var Token: GtToken = TokenContext.Next();
			if(Token.ParsedText.equals(TokenText)) {
				if(Index == KeyTokenIndex) {
					this.KeyToken = Token;
				}
				else if(Index != NoWhere) {
					this.SetSyntaxTreeAt(Index, new GtSyntaxTree(null, NameSpace, Token, null));
				}
				if(IsFlag(MatchFlag, OpenSkipIndent)) {
					TokenContext.SetSkipIndent(true);
				}
				if(IsFlag(MatchFlag, CloseSkipIndent)) {
					TokenContext.SetSkipIndent(false);
				}
			}
			else {
				TokenContext.RollbackPosition(Pos, MatchFlag);
				if(IsFlag(MatchFlag, Required)) {
					this.ToEmptyOrError(TokenContext.ReportExpectedToken(TokenText));
				}
			}
		}
	}

	public AppendParsedTree2(Tree: GtSyntaxTree): void {
		if(!this.IsError()) {
			LibGreenTea.Assert(Tree != null);
			if(Tree.IsError()) {
				this.ToError(Tree.KeyToken);
			}
			else {
				if(this.SubTreeList == null) {
					this.SubTreeList = new Array<GtSyntaxTree>();
				}
				this.SubTreeList.add(Tree);
			}
		}
	}

	public AppendMatchedPattern(NameSpace: GtNameSpace, TokenContext: GtTokenContext, PatternName: string,  MatchFlag: number): void {
		if(!this.IsMismatchedOrError()) {
			var ParsedTree: GtSyntaxTree = TokenContext.ParsePattern(NameSpace, PatternName, MatchFlag);
			if(ParsedTree != null) {
				this.AppendParsedTree2(ParsedTree);
			}
			else {
				if(IsFlag(MatchFlag, Required)) {
					this.ToMismatched();
				}
			}
		}
	}

	public  GetParsedType(): GtType {
		return (this.ParsedValue instanceof GtType) ? <GtType>this.ParsedValue : null;
	}

	public  HasNodeAt(Index: number): boolean {
		if(this.SubTreeList != null && Index < this.SubTreeList.size()) {
			return this.SubTreeList.get(Index) != null;
		}
		return false;
	}

	public TypeCheck(Gamma: GtTypeEnv, ContextType: GtType, TypeCheckPolicy: number): GtNode {
		var Node: GtNode = ApplyTypeFunc(this.Pattern.TypeFunc, Gamma, this, ContextType);
		return Gamma.TypeCheckSingleNode(this, Node, ContextType, TypeCheckPolicy);
	}

	public  TypeCheckAt(Index: number, Gamma: GtTypeEnv, ContextType: GtType, TypeCheckPolicy: number): GtNode {
		var ParsedTree: GtSyntaxTree = this.GetSyntaxTreeAt(Index);
		if(ContextType == Gamma.VoidType || IsFlag(TypeCheckPolicy, BlockPolicy)) {
			return TypeBlock(Gamma, ParsedTree, ContextType);
		}
		else if(ParsedTree != null) {
			return ParsedTree.TypeCheck(Gamma, ContextType, TypeCheckPolicy);
		}
		return Gamma.CreateSyntaxErrorNode(this, "not empty");
	}

	public  TypeCheckParam(Gamma: GtTypeEnv, TreeIndex: number, NodeList: Array<GtNode>): void {
		while(TreeIndex < LibGreenTea.ListSize(this.SubTreeList)) {
			var Node: GtNode = this.TypeCheckAt(TreeIndex, Gamma, Gamma.VarType, DefaultTypeCheckPolicy);
			NodeList.add(Node);
			TreeIndex = TreeIndex + 1;
		}
	}

	public  ToConstTree(ConstValue: Object): GtSyntaxTree {
		this.Pattern = this.NameSpace.GetSyntaxPattern("$Const$");
		this.ParsedValue = ConstValue;
		return this;
	}

	public  CreateConstTree(ConstValue: Object): GtSyntaxTree {
		return new GtSyntaxTree(this.NameSpace.GetSyntaxPattern("$Const$"), this.NameSpace, this.KeyToken, ConstValue);
	}

}
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



 class GtToken {
	public TokenFlag: number;
	public ParsedText: string;
	public FileLine: number;
	public PresetPattern: GtSyntaxPattern;

	constructor(text: string, FileLine: number) {
		this.TokenFlag = 0;
		this.ParsedText = text;
		this.FileLine = FileLine;
		this.PresetPattern = null;
	}

	public IsSource(): boolean {
		return IsFlag(this.TokenFlag, SourceTokenFlag);
	}

	public IsError(): boolean {
		return IsFlag(this.TokenFlag, ErrorTokenFlag);
	}

	public IsIndent(): boolean {
		return IsFlag(this.TokenFlag, IndentTokenFlag);
	}

	public IsDelim(): boolean {
		return IsFlag(this.TokenFlag, DelimTokenFlag);
	}

	public  IsNextWhiteSpace(): boolean {
		return IsFlag(this.TokenFlag, WhiteSpaceTokenFlag);
	}

	public IsQuoted(): boolean {
		return IsFlag(this.TokenFlag, QuotedTokenFlag);
	}

	public IsNameSymbol(): boolean {
		return IsFlag(this.TokenFlag, NameSymbolTokenFlag);
	}

	public EqualsText(text: string): boolean {
		return this.ParsedText.equals(text);
	}

	public toString(): string {
		var TokenText: string = "";
		if(this.PresetPattern != null) {
			TokenText = "(" + this.PresetPattern.PatternName + ") ";
		}
		return TokenText + this.ParsedText;
	}

	public SetErrorMessage(Message: string, ErrorPattern: GtSyntaxPattern): string {
		if(this.ParsedText.length > 0) {  // skip null token
			this.TokenFlag = ErrorTokenFlag;
			this.ParsedText = Message;
			this.PresetPattern = ErrorPattern;
		}
		return Message;
	}

	public GetErrorMessage(): string {
		LibGreenTea.Assert(this.IsError());
		return this.ParsedText;
	}

	public  AddTypeInfoToErrorMessage(ClassType: GtType): GtToken {
		this.ParsedText += " of " + ClassType.ShortName;
		return this;
	}

}

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



class GtTokenContext {
	public  static NullToken: GtToken = new GtToken("", 0);

	public TopLevelNameSpace: GtNameSpace;
	public SourceList: Array<GtToken>;
	private CurrentPosition: number;
	public ParsingLine: number;
	public ParseFlag: number;
	public ParsingAnnotation: GtMap;
	public LatestToken: GtToken;
	public IndentLevel: number = 0;

	constructor(NameSpace: GtNameSpace, Text: string, FileLine: number) {
		this.TopLevelNameSpace = NameSpace;
		this.SourceList = new Array<GtToken>();
		this.CurrentPosition = 0;
		this.ParsingLine = FileLine;
		this.ParseFlag = 0;
		this.AddNewToken(Text, SourceTokenFlag, null);
		this.ParsingAnnotation = null;
		this.IndentLevel = 0;
		this.LatestToken = null;
	}

	public AddNewToken(Text: string, TokenFlag: number, PatternName: string): GtToken {
		var Token: GtToken = new GtToken(Text, this.ParsingLine);
		Token.TokenFlag |= TokenFlag;
		if(PatternName != null) {
			Token.PresetPattern = this.TopLevelNameSpace.GetSyntaxPattern(PatternName);
			LibGreenTea.Assert(Token.PresetPattern != null);
		}
		this.SourceList.add(Token);
		return Token;
	}

	public FoundWhiteSpace(): void {
		var Token: GtToken = this.SourceList.get(this.SourceList.size() - 1);
		Token.TokenFlag |= WhiteSpaceTokenFlag;
	}

	public FoundLineFeed(line: number): void {
		this.ParsingLine += line;
	}

	public ReportTokenError1(Level: number, Message: string, TokenText: string): void {
		var Token: GtToken = this.AddNewToken(TokenText, 0, "$Error$");
		this.TopLevelNameSpace.Context.ReportError(Level, Token, Message);
	}

	public NewErrorSyntaxTree(Token: GtToken, Message: string): GtSyntaxTree {
		if(!this.IsAllowedBackTrack()) {
			this.TopLevelNameSpace.Context.ReportError(ErrorLevel, Token, Message);
			var ErrorTree: GtSyntaxTree = new GtSyntaxTree(Token.PresetPattern, this.TopLevelNameSpace, Token, null);
			return ErrorTree;
		}
		return null;
	}

	public GetBeforeToken(): GtToken {
		var pos: number = this.CurrentPosition - 1;
		while(pos >= 0 && pos < this.SourceList.size()) {
			var Token: GtToken = this.SourceList.get(pos);
			if(IsFlag(Token.TokenFlag, IndentTokenFlag)) {
				pos -= 1;
				continue;
			}
			return Token;
		}
		return null;
	}

	public SkipErrorStatement(): void {
		var LeastRecentToken: GtToken = this.LatestToken;
		while(this.HasNext()) {
			var T: GtToken = this.GetToken();
			if(T.IsDelim() || T.EqualsText("}")) {
				break;
			}
			this.TopLevelNameSpace.Context.ReportError(InfoLevel, T, "skipping: " + T.ParsedText);
			this.Next();
		}
		this.LatestToken = LeastRecentToken;
	}

	public ReportTokenError2(Token: GtToken, Message: string, SkipToken: boolean): GtSyntaxTree {
		if(this.IsAllowedBackTrack()) {
			return null;
		}
		else {
			var ErrorTree: GtSyntaxTree = this.NewErrorSyntaxTree(Token, Message);
			if(SkipToken) {
				this.SkipErrorStatement();
			}
			return ErrorTree;
		}
	}

	public ReportExpectedToken(TokenText: string): GtSyntaxTree {
		if(!this.IsAllowedBackTrack()) {
			var Token: GtToken = this.GetBeforeToken();
			if(Token != null) {
				return this.NewErrorSyntaxTree(Token, TokenText + " is expected at " + Token.ParsedText);
			}
			else {
				Token = this.LatestToken;
				return this.NewErrorSyntaxTree(Token, TokenText + " is expected after " + Token.ParsedText);
			}
		}
		return null;
	}

	public ReportExpectedPattern(Pattern: GtSyntaxPattern): GtSyntaxTree {
		return this.ReportExpectedToken("syntax pattern " + Pattern.PatternName);
	}

	public ReportExpectedMessage(Token: GtToken, Message: string, SkipToken: boolean): GtSyntaxTree {
		return this.ReportTokenError2(Token, "expected " + Message + "; given = " + Token.ParsedText, SkipToken);
	}

	public Vacume(): void {
//		if(this.CurrentPosition > 0) {
//			#Local#int i = this.CurrentPosition - 1;
//			while(i >= 0) {
//				GtToken Token = this.SourceList.get(i);
//				if(Token == null) {
//					break;
//				}
//				this.SourceList.set(i, null); // invoke gc;
//				i = i - 1;
//			}
//			this.CurrentPosition = 0;
//		}
	}

	private DispatchFunc(ScriptSource: string, GtChar: number, pos: number): number {
		var TokenFunc: GtTokenFunc = this.TopLevelNameSpace.GetTokenFunc(GtChar);
		var NextIdx: number = ApplyTokenFunc(TokenFunc, this, ScriptSource, pos);
		if(NextIdx == MismatchedPosition) {
			LibGreenTea.VerboseLog(VerboseUndefined, "undefined tokenizer: " + ScriptSource.substring(pos, pos+1));
			this.AddNewToken(ScriptSource.substring(pos, pos + 1), 0, null);
			return pos + 1;
		}
		return NextIdx;
	}

	private Tokenize(ScriptSource: string, CurrentLine: number): void {
		var currentPos: number = 0;
		var len: number = ScriptSource.length;
		this.ParsingLine = CurrentLine;
		while(currentPos < len) {
			var gtCode: number = AsciiToTokenMatrixIndex(LibGreenTea.CharAt(ScriptSource, currentPos));
			var nextPos: number = this.DispatchFunc(ScriptSource, gtCode, currentPos);
			if(currentPos >= nextPos) {
				break;
			}
			currentPos = nextPos;
		}
		this.Dump();
	}

	public  GetPosition(MatchFlag: number): number {
		var Pos: number = this.CurrentPosition;
		if(IsFlag(MatchFlag, AllowLineFeed)) {
			this.SkipIndent();
		}
		if(IsFlag(MatchFlag, AllowAnnotation)) {
			//this.PushParsingAnnotation();
			this.SkipAndGetAnnotation(true);  
		}
		return Pos;
	}

	public  RollbackPosition(Pos: number, MatchFlag: number): void {
		this.CurrentPosition = Pos;
		if(IsFlag(MatchFlag, AllowAnnotation)) {
			//this.PopParsingAnnotation();
		}
	}

	public GetToken(): GtToken {
		while(this.CurrentPosition < this.SourceList.size()) {
			var Token: GtToken = this.SourceList.get(this.CurrentPosition);
			if(Token.IsSource()) {
				this.SourceList.remove(this.SourceList.size()-1);
				this.Tokenize(Token.ParsedText, Token.FileLine);
				if(this.CurrentPosition < this.SourceList.size()) {
					Token = this.SourceList.get(this.CurrentPosition);
				}else{
					break;
				}
			}
			if(IsFlag(this.ParseFlag, SkipIndentParseFlag) && Token.IsIndent()) {
				this.CurrentPosition = this.CurrentPosition + 1;
				continue;
			}
//			this.ParsingLine = Token.FileLine;
			this.LatestToken = Token;
			return Token;
		}
//		GtTokenContext.NullToken.FileLine = this.ParsingLine;
		return GtTokenContext.NullToken;
	}

	public HasNext(): boolean {
		return (this.GetToken() != GtTokenContext.NullToken);
	}

	public Next(): GtToken {
		var Token: GtToken = this.GetToken();
		this.CurrentPosition += 1;
		return Token;
	}

	public SkipIndent(): void {
		var Token: GtToken = this.GetToken();
		while(Token.IsIndent()) {
			this.CurrentPosition = this.CurrentPosition + 1;
			Token = this.GetToken();
		}
	}

	public GetPattern(PatternName: string): GtSyntaxPattern {
		return this.TopLevelNameSpace.GetSyntaxPattern(PatternName);
	}

	public GetFirstPattern(NameSpace: GtNameSpace): GtSyntaxPattern {
		var Token: GtToken = this.GetToken();
		if(Token.PresetPattern != null) {
			return Token.PresetPattern;
		}
		var Pattern: GtSyntaxPattern = NameSpace.GetSyntaxPattern(Token.ParsedText);
		if(Pattern == null) {
			return NameSpace.GetSyntaxPattern("$Symbol$");
		}
		return Pattern;
	}

	public GetExtendedPattern(NameSpace: GtNameSpace): GtSyntaxPattern {
		var Token: GtToken = this.GetToken();
		if(Token != GtTokenContext.NullToken) {
			var Pattern: GtSyntaxPattern = NameSpace.GetExtendedSyntaxPattern(Token.ParsedText);
			return Pattern;
		}
		return null;
	}

	public  IsToken(TokenText: string): boolean {
		var Token: GtToken = this.GetToken();
		if(Token.EqualsText(TokenText)) {
			return true;
		}
		return false;
	}

	public  MatchToken(TokenText: string): boolean {
		if(this.IsToken(TokenText)) {
			this.CurrentPosition += 1;
			return true;
		}
		return false;
	}

	public  MatchToken2(TokenText: string, MatchFlag: number): boolean {
		var Pos: number = this.GetPosition(MatchFlag);
		var Token: GtToken = this.Next();
		if(Token.EqualsText(TokenText)) {
			return true;
		}
		this.RollbackPosition(Pos, MatchFlag);
		return false;
	}

	public  StartsWithToken(TokenText: string): boolean {
		var Token: GtToken = this.GetToken();
		if(Token.EqualsText(TokenText)) {
			this.CurrentPosition += 1;
			return true;
		}
		if(Token.ParsedText.startsWith(TokenText)) {
			Token = new GtToken(Token.ParsedText.substring(TokenText.length), Token.FileLine);
			this.CurrentPosition += 1;
			this.SourceList.add(this.CurrentPosition, Token);
			return true;
		}
		return false;
	}

	public CreateSyntaxTree(NameSpace: GtNameSpace, Pattern: Object, ConstValue: Object): GtSyntaxTree {
		if(ConstValue != null) {
			Pattern = NameSpace.GetSyntaxPattern("$Const$");
		}
		if((typeof Pattern == 'string' || Pattern instanceof String)) {
			Pattern = NameSpace.GetSyntaxPattern(Pattern.toString());
		}
		return new GtSyntaxTree(<GtSyntaxPattern>Pattern, NameSpace, this.GetToken(), ConstValue);
	}

	public CreateMatchedSyntaxTree(NameSpace: GtNameSpace, Pattern: GtSyntaxPattern, TokenText: string): GtSyntaxTree {
		var SyntaxTree: GtSyntaxTree = this.CreateSyntaxTree(NameSpace, Pattern, null);
		SyntaxTree.SetMatchedTokenAt(KeyTokenIndex, NameSpace, this, TokenText, Required);
		return SyntaxTree;
	}

	public  IsAllowedBackTrack(): boolean {
		return IsFlag(this.ParseFlag, BackTrackParseFlag);
	}

	public  SetBackTrack(Allowed: boolean): number {
		var OldFlag: number = this.ParseFlag;
		if(Allowed) {
			this.ParseFlag = this.ParseFlag | BackTrackParseFlag;
		}
		else {
			this.ParseFlag = (~(BackTrackParseFlag) & this.ParseFlag);
		}
		return OldFlag;
	}

	public  SetSkipIndent(Allowed: boolean): number {
		var OldFlag: number = this.ParseFlag;
		if(Allowed) {
			this.ParseFlag = this.ParseFlag | SkipIndentParseFlag;
		}
		else {
			this.ParseFlag = (~(SkipIndentParseFlag) & this.ParseFlag);
		}
		return OldFlag;
	}

	public  SetRememberFlag(OldFlag: number): void {
		this.ParseFlag = OldFlag;
	}

	public  ParsePatternAfter(NameSpace: GtNameSpace, LeftTree: GtSyntaxTree, PatternName: string, MatchFlag: number): GtSyntaxTree {
		var Pos: number = this.GetPosition(MatchFlag);
		var ParseFlag: number = this.ParseFlag;
		if(IsFlag(MatchFlag, Optional)) {
			this.ParseFlag = this.ParseFlag | BackTrackParseFlag;
		}
		var Pattern: GtSyntaxPattern = this.GetPattern(PatternName);
		if(Pattern == null) {
			console.log("unknown pattern: " + PatternName);
		}
		var SyntaxTree: GtSyntaxTree = ApplySyntaxPattern(NameSpace, this, LeftTree, Pattern);
		this.ParseFlag = ParseFlag;
		if(SyntaxTree != null) {
			return SyntaxTree;
		}
		this.RollbackPosition(Pos, MatchFlag);
		return null;
	}

	public  ParsePattern(NameSpace: GtNameSpace, PatternName: string, MatchFlag: number): GtSyntaxTree {
		return this.ParsePatternAfter(NameSpace, null, PatternName, MatchFlag);
	}

	public  SkipAndGetAnnotation(IsAllowedDelim: boolean): GtMap {
		// this is tentative implementation. In the future, you have to
		// use this pattern.
		this.ParsingAnnotation = null;
		this.SkipEmptyStatement();
		while(this.MatchToken("@")) {
			var Token: GtToken = this.Next();
			if(this.ParsingAnnotation == null) {
				this.ParsingAnnotation = new GtMap();
			}
			this.ParsingAnnotation.put(Token.ParsedText, true);
			this.SkipIndent();
//			if(this.MatchToken(";")) {
//				if(IsAllowedDelim) {
//					Annotation = null; // empty statement
//					this.();
//				}
//				else {
//					return null;
//				}
//			}
		}
		return this.ParsingAnnotation;
	}

	public  SkipEmptyStatement(): void {
		while(this.HasNext()) {
			var Token: GtToken = this.GetToken();
			if(Token.IsIndent() || Token.IsDelim()) {
				this.CurrentPosition += 1;
				continue;
			}
			break;
		}
//		return (Token != GtTokenContext.NullToken);
	}

	public  SkipIncompleteStatement(): void {
//		if(this.HasNext()) {
//			#Local#GtToken Token = this.GetToken();
//			if(!Token.IsIndent() && !Token.IsDelim()) {
//				this.TopLevelNameSpace.Context.ReportError(WarningLevel, Token, "needs ;");
//				if(Token.EqualsText("}")) {
//					return;
//				}
//				this.CurrentPosition += 1;
//				while(this.HasNext()) {
//					Token = this.GetToken();
//					if(Token.IsIndent() || Token.IsDelim()) {
//						break;
//					}
//					if(Token.EqualsText("}")) {
//						return;
//					}
//					this.CurrentPosition += 1;
//				}
//			}
			this.SkipEmptyStatement();
//		}
	}

	public  Stringfy(PreText: string, BeginIdx: number, EndIdx: number): string {
		var Buffer: string = PreText;
		var Position: number = BeginIdx;
		while(Position < EndIdx) {
			var Token: GtToken = this.SourceList.get(Position);
			if(Token.IsIndent()) {
				Buffer += "\n";
			}
			Buffer += Token.ParsedText;
			if(Token.IsNextWhiteSpace()) {
				Buffer += " ";
			}
			Position += 1;
		}
		return Buffer;
	}

	public  Dump(): void {
		var Position: number = this.CurrentPosition;
		while(Position < this.SourceList.size()) {
			var Token: GtToken = this.SourceList.get(Position);
			var DumpedToken: string = "["+Position+"] " + Token;
			if(Token.PresetPattern != null) {
				DumpedToken = DumpedToken + " : " + Token.PresetPattern;
			}
			LibGreenTea.VerboseLog(VerboseToken,  DumpedToken);
			Position += 1;
		}
	}

	public  SetSourceMap(SourceMap: string): void {
		var Index: number = SourceMap.lastIndexOf(":");
		if(Index != -1) {
			var FileName: string = SourceMap.substring(0, Index);
			var Line: number = <number>LibGreenTea.ParseInt(SourceMap.substring(Index+1));
			this.ParsingLine = this.TopLevelNameSpace.Context.GetFileLine(FileName, Line);
		}
	}

}
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



class GtType {
	public  Context: GtParserContext;
	public PackageNameSpace: GtNameSpace;
	public TypeFlag: number;
	public TypeId: number;
	public ShortName: string;
	public SuperType: GtType;
	public ParentMethodSearch: GtType;
	public BaseType: GtType;
	public TypeParams: GtType[];
	public TypeBody: Object;
	public DefaultNullValue: Object;

	constructor(Context: GtParserContext, TypeFlag: number, ShortName: string, DefaultNullValue: Object, TypeBody: Object) {
		this.Context = Context;
		this.ShortName = ShortName;
		this.TypeFlag = TypeFlag;
		this.DefaultNullValue = DefaultNullValue;
		this.TypeBody = TypeBody;
		this.SuperType = null;
		this.BaseType = this;
		this.ParentMethodSearch = Context.TopType;
		if(!IsFlag(TypeFlag, TypeVariable)) {
			this.TypeId = Context.TypePools.size();
			Context.TypePools.add(this);
		}
		this.TypeParams = null;

	}

	public CreateSubType(ClassFlag: number, ClassName: string, DefaultNullValue: Object, NativeSpec: Object): GtType {
		var SubType: GtType = new GtType(this.Context, ClassFlag, ClassName, DefaultNullValue, NativeSpec);
		SubType.SuperType = this;
		SubType.ParentMethodSearch = this;
		return SubType;
	}

	// Note Don't call this directly. Use Context.GetGenericType instead.
	public CreateGenericType(BaseIndex: number, TypeList: Array<GtType>, ShortName: string): GtType {
		var i: number = BaseIndex;
		var TypeVariableFlag: number = 0;
		while(i < TypeList.size()) {
			if(TypeList.get(i).HasTypeVariable()) {
				TypeVariableFlag = GenericVariable;
				break;
			}
			i = i + 1;
		}
		var GenericType: GtType = new GtType(this.Context, this.TypeFlag | TypeVariableFlag, ShortName, null, null);
		GenericType.BaseType = this.BaseType;
		GenericType.ParentMethodSearch = this.BaseType;
		GenericType.SuperType = this.SuperType;
		GenericType.TypeParams = LibGreenTea.CompactTypeList(BaseIndex, TypeList);
		LibGreenTea.VerboseLog(VerboseType, "new generic type: " + GenericType.ShortName + ", ClassId=" + GenericType.TypeId);
		return GenericType;
	}

	public  IsAbstract(): boolean {
		return (this.TypeBody == null && this.SuperType == this.Context.StructType/*default*/);
	}

	public  IsNative(): boolean {
		return IsFlag(this.TypeFlag, NativeType);
	}

	public  IsDynamic(): boolean {
		return IsFlag(this.TypeFlag, DynamicType);
	}

	public  IsUnboxType(): boolean {
		return IsFlag(this.BaseType.TypeFlag, UnboxType);
	}

	public  IsGenericType(): boolean {
		return (this.TypeParams != null);
	}

	public  IsFuncType(): boolean {
		return (this.BaseType == this.Context.FuncType);
	}

	public  IsTopType(): boolean {
		return (this == this.Context.TopType);
	}

	public  IsVoidType(): boolean {
		return (this == this.Context.VoidType);
	}

	public  IsVarType(): boolean {
		return (this == this.Context.VarType);
	}

	public  IsAnyType(): boolean {
		return (this == this.Context.AnyType);
	}

	public  IsTypeType(): boolean {
		return (this == this.Context.TypeType);
	}

	public  IsBooleanType(): boolean {
		return (this == this.Context.BooleanType);
	}

	public  IsIntType(): boolean {
		return (this == this.Context.IntType);
	}

	public  IsStringType(): boolean {
		return (this == this.Context.StringType);
	}

	public  IsArrayType(): boolean {
		return (this == this.Context.ArrayType);
	}

	public  IsEnumType(): boolean {
		return IsFlag(this.TypeFlag, EnumType);
	}
	public  SetUnrevealedType(StrongType: GtType): void {
		this.BaseType = StrongType;
		this.TypeFlag |= UnrevealedType;
		this.ShortName = "_" + this.ShortName + "_";
	}
	public  IsUnrevealedType(): boolean {
		return IsFlag(this.TypeFlag, UnrevealedType);
	}
	public  GetRevealedType(): GtType {
		if(this.IsUnrevealedType()) {
			return this.BaseType;
		}
		return this;
	}

	public toString(): string {
		return this.ShortName;
	}

	public  GetNativeName(): string {
		if(IsFlag(this.TypeFlag, ExportType)) {
			return this.ShortName;
		}
		else {
			return this.BaseType.ShortName + NativeNameSuffix + this.TypeId;
		}
	}

	public  GetUniqueName(): string {
		if(IsFlag(this.TypeFlag, TypeVariable)) {
			return this.ShortName;
		}
		else {
			if(LibGreenTea.DebugMode) {
				return this.BaseType.ShortName + NativeNameSuffix + this.TypeId;
			}
			else {
				return NativeNameSuffix + this.TypeId;
			}
		}
	}

	public  Accept(Type: GtType): boolean {
		if(this == Type || this == this.Context.AnyType) {
			return true;
		}
		var SuperClass: GtType = Type.SuperType;
		while(SuperClass != null) {
			if(SuperClass == this) {
				return true;
			}
			SuperClass = SuperClass.SuperType;
		}
		return this.Context.CheckSubType(Type, this);
	}

//	public final boolean Accept(GtType Type) {
//		boolean b = this.Accept_(Type);
//		System.err.println("" + this + " accepts " + Type + " ? " + b);
//		return b;
//	}
	
	public  AcceptValue(Value: Object): boolean {
		return (Value != null) ? this.Accept(this.Context.GuessType(Value)) : true;
	}

	public SetClassField(ClassField: GtClassField): void {
		this.TypeBody = ClassField;
	}

	public IsDynamicNaitiveLoading(): boolean {
		return this.IsNative() /*&& !IsFlag(this.TypeFlag, CommonType)*/;
	}

	public  IsTypeVariable(): boolean {   // T
		return IsFlag(this.TypeFlag, TypeVariable);
	}

	public  HasTypeVariable(): boolean {
		return IsFlag(this.TypeFlag, TypeVariable) || IsFlag(this.TypeFlag, GenericVariable);
	}

	public AppendTypeVariable(GenericNameSpace: GtNameSpace, Count: number): number {
		if(IsFlag(this.TypeFlag, TypeVariable)) {
			var TypeVar: GtType = GenericNameSpace.GetType(this.ShortName);
			if(TypeVar != null && TypeVar.IsTypeVariable()) {
				return Count;
			}
			GenericNameSpace.SetSymbol(this.ShortName, this, null);
			return Count + 1;
		}
		if(IsFlag(this.TypeFlag, GenericVariable)) {
			var i: number = 0;
			while(i < this.TypeParams.length) {
				Count = this.TypeParams[i].AppendTypeVariable(GenericNameSpace, Count);
				i += 1;
			}
		}
		return Count;
	}

	private GivenParamType(GivenType: GtType, ParamIndex: number): GtType {
		if(GivenType.BaseType == this.BaseType && GivenType.TypeParams.length == this.TypeParams.length) {
			return GivenType.TypeParams[ParamIndex];
		}
		return GivenType;
	}
	
	public RealType(GenericNameSpace: GtNameSpace, GivenType: GtType): GtType {
		if(IsFlag(this.TypeFlag, TypeVariable)) {
			var TypeVar: GtType = GenericNameSpace.GetType(this.ShortName);
			//System.err.println("TypeVar="+this.ShortName + ", " + TypeVar);
			if(TypeVar != null && TypeVar.IsTypeVariable()) {
				GenericNameSpace.SetSymbol(this.ShortName, GivenType, null);
				return GivenType;
			}
			else {
				return TypeVar;
			}
		}
		if(IsFlag(this.TypeFlag, GenericVariable)) {
			var i: number = 0;
			var TypeList: Array<GtType> = new Array<GtType>();
			while(i < this.TypeParams.length) {
				var RealParamType: GtType = this.TypeParams[i].RealType(GenericNameSpace, this.GivenParamType(GivenType, i));
				TypeList.add(RealParamType);
				i += 1;
			}
			return this.Context.GetGenericType(this.BaseType, 0, TypeList, true);
		}
		return this;
	}

	public Match(GenericNameSpace: GtNameSpace, GivenType: GtType): boolean {
		
		if(IsFlag(this.TypeFlag, TypeVariable)) {
			var TypeVar: GtType = GenericNameSpace.GetType(this.ShortName);
			if(TypeVar.IsTypeVariable()) {
				//System.err.println("updating "+ this.ShortName + " " + GivenType);
				GenericNameSpace.SetSymbol(this.ShortName, GivenType, null);
				return true;
			}
			return TypeVar.Accept(GivenType);
		}
		if(IsFlag(this.TypeFlag, GenericVariable)) {
			if(GivenType.BaseType == this.BaseType && GivenType.TypeParams.length == this.TypeParams.length) {
				var i: number = 0;
				while(i < this.TypeParams.length) {
					if(!this.TypeParams[i].Match(GenericNameSpace, GivenType.TypeParams[i])) {
						return false;
					}
					i += 1;
				}
				return true;
			}
			return false;
		}
		return this.Accept(GivenType);
	}




//	public boolean Match(GtNameSpace GenericNameSpace, GtType GivenType) {
//		boolean b = this.Match_(GenericNameSpace, GivenType);
//		System.err.println("matching.. " + this + ", given = " + GivenType + ", results=" + b);
//		return b;
//	}

}// ***************************************************************************
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



class GtTypeEnv {
	public  Context: GtParserContext;
	public  Generator: GtGenerator;
	public NameSpace: GtNameSpace;

	public LocalStackList: Array<GtVariableInfo>;
	public StackTopIndex: number;
	public Func: GtFunc;
	FoundUncommonFunc: boolean;
	
	/* for convinient short cut */
	public  VoidType: GtType;
	public  BooleanType: GtType;
	public  IntType: GtType;
	public  StringType: GtType;
	public  VarType: GtType;
	public  AnyType: GtType;
	public  ArrayType: GtType;
	public  FuncType: GtType;

	constructor(NameSpace: GtNameSpace) {
		this.NameSpace = NameSpace;
		this.Context   = NameSpace.Context;
		this.Generator = NameSpace.Context.Generator;
		this.Func = null;
		this.FoundUncommonFunc = false;
		this.LocalStackList = new Array<GtVariableInfo>();
		this.StackTopIndex = 0;

		this.VoidType    = NameSpace.Context.VoidType;
		this.BooleanType = NameSpace.Context.BooleanType;
		this.IntType     = NameSpace.Context.IntType;
		this.StringType  = NameSpace.Context.StringType;
		this.VarType     = NameSpace.Context.VarType;
		this.AnyType     = NameSpace.Context.AnyType;
		this.ArrayType   = NameSpace.Context.ArrayType;
		this.FuncType    = NameSpace.Context.FuncType;

	}

	public  IsStrictMode(): boolean {
		return this.Generator.IsStrictMode();
	}

	public  IsTopLevel(): boolean {
		return (this.Func == null);
	}

	public AppendRecv(RecvType: GtType): void {
		var ThisName: string = this.Generator.GetRecvName();
		this.AppendDeclaredVariable(0, RecvType, ThisName, null, null);
		this.LocalStackList.get(this.StackTopIndex-1).NativeName = ThisName;
	}

	public AppendDeclaredVariable(VarFlag: number, Type: GtType, Name: string, NameToken: GtToken, InitValue: Object): GtVariableInfo {
		var VarInfo: GtVariableInfo = new GtVariableInfo(VarFlag, Type, Name, this.StackTopIndex, NameToken, InitValue);
		if(this.StackTopIndex < this.LocalStackList.size()) {
			this.LocalStackList.set(this.StackTopIndex, VarInfo);
		}
		else {
			this.LocalStackList.add(VarInfo);
		}
		this.StackTopIndex += 1;
		return VarInfo;
	}

	public LookupDeclaredVariable(Symbol: string): GtVariableInfo {
		var i: number = this.StackTopIndex - 1;
		while(i >= 0) {
			var VarInfo: GtVariableInfo = this.LocalStackList.get(i);
			if(VarInfo.Name.equals(Symbol)) {
				return VarInfo;
			}
			i = i - 1;
		}
		return null;
	}

	public PushBackStackIndex(PushBackIndex: number): void {
		var i: number = this.StackTopIndex - 1;
		while(i >= PushBackIndex) {
			var VarInfo: GtVariableInfo = this.LocalStackList.get(i);
			VarInfo.Check();
			i = i - 1;
		}
		this.StackTopIndex = PushBackIndex;
	}
	
	public CheckFunc(FuncType: string, Func: GtFunc, SourceToken: GtToken): void {
		if(!this.FoundUncommonFunc && (!Func.Is(CommonFunc))) {
			this.FoundUncommonFunc = true;
			if(this.Func != null && this.Func.Is(CommonFunc)) {
				this.NameSpace.Context.ReportError(WarningLevel, SourceToken, "using uncommon " + FuncType + ": " + Func.FuncName);
			}
		}
	}

	public  ReportTypeResult(ParsedTree: GtSyntaxTree, Node: GtNode, Level: number, Message: string): GtNode {
		if(Level == ErrorLevel || (this.IsStrictMode() && Level == TypeErrorLevel)) {
			LibGreenTea.Assert(Node.Token == ParsedTree.KeyToken);
			this.NameSpace.Context.ReportError(ErrorLevel, Node.Token, Message);
			return this.Generator.CreateErrorNode(this.VoidType, ParsedTree);
		}
		else {
			this.NameSpace.Context.ReportError(Level, Node.Token, Message);
		}
		return Node;
	}

	public  ReportTypeInference(SourceToken: GtToken, Name: string, InfferedType: GtType): void {
		this.Context.ReportError(InfoLevel, SourceToken, Name + " has type " + InfferedType);
	}

	public  CreateSyntaxErrorNode(ParsedTree: GtSyntaxTree, Message: string): GtNode {
		this.NameSpace.Context.ReportError(ErrorLevel, ParsedTree.KeyToken, Message);
		return this.Generator.CreateErrorNode(this.VoidType, ParsedTree);
	}

	public  UnsupportedTopLevelError(ParsedTree: GtSyntaxTree): GtNode {
		return this.CreateSyntaxErrorNode(ParsedTree, "unsupported " + ParsedTree.Pattern.PatternName + " at the top level");
	}

	public  CreateLocalNode(ParsedTree: GtSyntaxTree, Name: string): GtNode {
		var VariableInfo: GtVariableInfo = this.LookupDeclaredVariable(Name);
		if(VariableInfo != null) {
			return this.Generator.CreateLocalNode(VariableInfo.Type, ParsedTree, VariableInfo.NativeName);
		}
		return this.CreateSyntaxErrorNode(ParsedTree, "unresolved name: " + Name + "; not your fault");
	}

	public  CreateDefaultValue(ParsedTree: GtSyntaxTree, Type: GtType): GtNode {
		return this.Generator.CreateConstNode(Type, ParsedTree, Type.DefaultNullValue);
	}

	public  TypeCheckSingleNode(ParsedTree: GtSyntaxTree, Node: GtNode, Type: GtType, TypeCheckPolicy: number): GtNode {
		LibGreenTea.Assert(Node != null);
		if(Node.IsErrorNode() || IsFlag(TypeCheckPolicy, NoCheckPolicy)) {
			return Node;
		}
		if(Node.Type.IsUnrevealedType()) {
			var Func: GtFunc = ParsedTree.NameSpace.GetConverterFunc(Node.Type, Node.Type.BaseType, true);
			//System.err.println("found weaktype = " + Node.Type);
			Node = this.Generator.CreateCoercionNode(Func.GetReturnType(), Func, Node);
		}
		//System.err.println("**** " + Node.getClass());
		var ConstValue: Object = Node.ToConstValue(IsFlag(TypeCheckPolicy, OnlyConstPolicy));
		if(ConstValue != null && !(Node instanceof GtConstNode)) {  // recreated
			Node = this.Generator.CreateConstNode(Node.Type, ParsedTree, ConstValue);
		}
		if(IsFlag(TypeCheckPolicy, OnlyConstPolicy) && ConstValue == null) {
			if(IsFlag(TypeCheckPolicy, NullablePolicy) && Node.IsNullNode()) { // OK
			}
			else {
				return this.CreateSyntaxErrorNode(ParsedTree, "value must be const");
			}
		}
		if(IsFlag(TypeCheckPolicy, AllowVoidPolicy) || Type == this.VoidType) {
			return Node;
		}
		if(Node.Type == this.VarType) {
			return this.ReportTypeResult(ParsedTree, Node, TypeErrorLevel, "unspecified type: " + Node.Token.ParsedText);
		}
		if(Node.Type == Type || Type == this.VarType || Node.Type.Accept(Type)) {
			return Node;
		}
		var Func: GtFunc = ParsedTree.NameSpace.GetConverterFunc(Node.Type, Type, true);
		if(Func != null && (Func.Is(CoercionFunc) || IsFlag(TypeCheckPolicy, CastPolicy))) {
			return this.Generator.CreateCoercionNode(Type, Func, Node);
		}
		console.log("node="+ LibGreenTea.GetClassName(Node) + "type error: requested = " + Type + ", given = " + Node.Type);
		return this.ReportTypeResult(ParsedTree, Node, TypeErrorLevel, "type error: requested = " + Type + ", given = " + Node.Type);
	}
}


class GtVariableInfo {
	public VariableFlag: number;
	public Type: GtType;
	public Name: string;
	public NativeName: string;
	public NameToken: GtToken;
	public InitValue: Object;
	public DefCount: number;
	public UsedCount: number;

	constructor(VarFlag: number, Type: GtType, Name: string, Index: number, NameToken: GtToken, InitValue: Object) {
		this.VariableFlag = VarFlag;
		this.Type = Type;
		this.NameToken = NameToken;
		this.Name = Name;
		this.NativeName = (NameToken == null) ? Name : NativeVariableName(Name, Index);
		this.InitValue = null;
		this.UsedCount = 0;
		this.DefCount  = 1;
	}

	public  Defined(): void {
		this.DefCount += 1;
		this.InitValue = null;
	}

	public  Used(): void {
		this.UsedCount += 1;
	}

	public Check(): void {
		if(this.UsedCount == 0 && this.NameToken != null) {
			this.Type.Context.ReportError(WarningLevel, this.NameToken, "unused variable: " + this.Name);
		}
	}
	// for debug
	public toString(): string {
		return "(" + this.Type + " " + this.Name + ", " + this.NativeName + ")";
	}
}
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



class JavaScriptSourceGenerator extends SourceGenerator {
	private UseLetKeyword: boolean;
	private IsNodeJS: boolean;

	constructor(TargetCode: string, OutputFile: string, GeneratorFlag: number) {
		super(TargetCode, OutputFile, GeneratorFlag);
		this.IsNodeJS = LibGreenTea.EqualsString(TargetCode, "nodejs");
	}

	public VisitBlockJS(Node: GtNode): string {
		var Code: string = "";
		var CurrentNode: GtNode = Node;
		while(CurrentNode != null) {
			var Statement: string = this.VisitNode(CurrentNode);
			if(Statement.trim().length >0) {
				Code += this.GetIndentString() + Statement + ";" + this.LineFeed;
			}
			CurrentNode = CurrentNode.NextNode;
		}
		return Code;
	}

	public VisitBlockJSWithIndent(Node: GtNode): string {
		var Code: string = "";
		Code += "{" + this.LineFeed;
		this.Indent();
		Code += this.VisitBlockJS(Node);
		this.UnIndent();
		Code += this.GetIndentString() + "}";
		return Code;
	}

	public VisitBinaryNode(Node: GtBinaryNode): void {
		var FuncName: string = Node.Token.ParsedText;
		var Left: string = this.VisitNode(Node.LeftNode);
		var Right: string = this.VisitNode(Node.RightNode);
		var Source: string = "(" + SourceGenerator.GenerateApplyFunc2(Node.Func, FuncName, Left, Right) + ")";
		var operator: string = Node.Token.ParsedText;
		if(LibGreenTea.EqualsString(operator, "/") /*&& Node.Type == Context.IntType*/ ) {
			Source = "(" + Source + " | 0)";
		}
		this.PushSourceCode(Source);
	}

	public VisitVarNode(Node: GtVarNode): void {
		var VarName: string = Node.NativeName;
		var Source: string = (this.UseLetKeyword ? "let " : "var ") + " " + VarName;
		if(Node.InitNode != null) {
			Node.InitNode.Evaluate(this);
			Source += " = " + this.PopSourceCode();
		}
		Source +=  ";";
		Source += this.VisitBlockJSWithIndent(Node.BlockNode);
		this.PushSourceCode(Source);
	}

	public VisitIfNode(Node: GtIfNode): void {
		var ThenBlock: string = this.VisitBlockJSWithIndent(Node.ThenNode);
		var CondExpr: string = this.VisitNode(Node.CondExpr);
		var Source: string = "if(" + CondExpr + ") " + ThenBlock;
		if(Node.ElseNode != null) {
			Source = Source + " else " + this.VisitBlockJSWithIndent(Node.ElseNode);
		}
		this.PushSourceCode(Source);
	}

	public VisitWhileNode(Node: GtWhileNode): void {
		var LoopBody: string = this.VisitBlockJSWithIndent(Node.LoopBody);
		var CondExpr: string = this.VisitNode(Node.CondExpr);
		this.PushSourceCode("while(" + CondExpr + ") {" + LoopBody + "}");
	}

	public VisitForNode(Node: GtForNode): void {
		var LoopBody: string = this.VisitBlockJSWithIndent(Node.LoopBody);
		var IterExpr: string = this.VisitNode(Node.IterExpr);
		var CondExpr: string = this.VisitNode(Node.CondExpr);
		this.PushSourceCode("for(;" + CondExpr + "; " + IterExpr + ") {" + LoopBody + "}");
	}

	public VisitDoWhileNode(Node: GtDoWhileNode): void {
		var LoopBody: string = this.VisitBlockJSWithIndent(Node.LoopBody);
		var CondExpr: string = this.VisitNode(Node.CondExpr);
		this.PushSourceCode("do {" + LoopBody + "} while(" + CondExpr + ");");
	}

	public VisitTryNode(Node: GtTryNode): void {
		var Code: string = "try ";
		Code += this.VisitBlockJSWithIndent(Node.TryBlock);
		if(Node.CatchExpr != null) {
			var Val: GtVarNode = <GtVarNode> Node.CatchExpr;
			Code += " catch (" + Val.Type.toString() + " " + Val.NativeName + ") ";
			Code += this.VisitBlockJSWithIndent(Node.CatchBlock);
		}
		if(Node.FinallyBlock != null) {
			Code += " finally " + this.VisitBlockJSWithIndent(Node.FinallyBlock);
		}
		this.PushSourceCode(Code);
	}

	public VisitThrowNode(Node: GtThrowNode): void {
		var Expr: string = this.VisitNode(Node.Expr);
		this.PushSourceCode("throw " + Expr);
	}

	public VisitErrorNode(Node: GtErrorNode): void {
		var Expr: string = Node.Token.ParsedText;
		this.PushSourceCode("(function() {throw new Error(\"" + Expr + "\") })()");
	}

	public GenerateFunc(Func: GtFunc, NameList: Array<string>, Body: GtNode): void {
		this.FlushErrorReport();
		var ArgCount: number = Func.Types.length - 1;
		var Code: string = "var " + Func.GetNativeFuncName() + " = (function(";
		var i: number = 0;
		while(i < ArgCount) {
			if(i > 0) {
				Code = Code + ", ";
			}
			Code = Code + NameList.get(i);
			i = i + 1;
		}
		Code = Code + ") " + this.VisitBlockJSWithIndent(Body) + ");";
		this.WriteLineCode(Code);
	}

/**
JavaScript code to be generated:

var CLASS = (function (_super) {
    __extends(CLASS, _super);                                // Derived class only.
    function CLASS(param) {                                   // Constructor.
        _super.call(this, param);
        this.FIELD = param;                                      // Field definition and initialization.
    };
    CLASS.STATIC_FIELD = "value";                      // Static fields
    
    CLASS.prototype.METHOD = function () {    // Methods.
    };
    CLASS.STATIC_METHOD = function () {         // Static methods.
    };
    return CLASS;
})(SUPERCLASS);
 */
	public OpenClassField(Type: GtType, ClassField: GtClassField): void {
		var TypeName: string = Type.ShortName;
		var Program: string = this.GetIndentString() + "var " + TypeName + " = (function() {" + this.LineFeed;
//		if(Type.SuperType != null) {
//			Program += "(" + Type.SuperType.ShortClassName + ")";
//		}
		this.Indent();
		Program += this.GetIndentString() + "function " + TypeName + "() {" + this.LineFeed;
		this.Indent();
		var i: number = 0;
		while(i < ClassField.FieldList.size()) {
			var FieldInfo: GtFieldInfo = ClassField.FieldList.get(i);
			var InitValue: string = this.StringifyConstValue(FieldInfo.InitValue);
			if(!FieldInfo.Type.IsNative()) {
				InitValue = this.NullLiteral;
			}
			Program += this.GetIndentString() + "this" + "." + FieldInfo.NativeName + " = " + InitValue + ";" + this.LineFeed;
			i = i + 1;
		}
		this.UnIndent();
		Program += this.GetIndentString() + "};" + this.LineFeed;
		Program += this.GetIndentString() + "return " + TypeName + ";" + this.LineFeed;
		this.UnIndent();
		Program += this.GetIndentString() + "})();" + this.LineFeed;
		this.WriteLineCode(Program);
	}
	public Eval(Node: GtNode): Object {
		var ret: string = this.VisitBlockJS(Node);
		this.WriteLineCode(ret);
		return ret;
	}

	public StartCompilationUnit(): void {
		if(this.IsNodeJS) {
			this.WriteLineCode("var assert = require('assert');");
		}
		else {			
			this.WriteLineCode("var assert = console.assert;");
		}
	}

	public InvokeMainFunc(MainFuncName: string): void {
		this.WriteLineCode(MainFuncName + "();");
	}
	public GetRecvName(): string {
		return "$__this";
	}
}// ***************************************************************************
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

class BashSourceGenerator extends SourceGenerator {
	inFunc: boolean = false;
	inMainFunc: boolean = false;

	constructor(TargetCode: string, OutputFile: string, GeneratorFlag: number) {
		super(TargetCode, OutputFile, GeneratorFlag);
		this.TrueLiteral  = "0";
		this.FalseLiteral = "1";
		this.NullLiteral = LibGreenTea.QuoteString("__NULL__");
		this.MemberAccessOperator = "__MEMBER__";
		this.LineComment = "##";
		this.ParameterBegin = " ";
		this.ParameterEnd = "";
		this.ParameterDelimiter = "";
	}

	public InitContext(Context: GtParserContext): void {
		super.InitContext(Context);
		this.WriteLineHeader("#!/bin/bash");
		this.WriteLineCode(this.LineFeed + "source $GREENTEA_HOME/include/bash/GreenTeaPlus.sh" + this.LineFeed);
	}

	public VisitBlockWithIndent(Node: GtNode, NeedBlock: boolean): string {
		return this.VisitBlockWithOption(Node, true, NeedBlock, false);	//actually NeedBlock -> allowDummyBlock
	}

	private VisitBlockWithReplaceBreak(Node: GtNode, allowDummyBlock: boolean): string {
		return this.VisitBlockWithOption(Node, true, allowDummyBlock, true);
	}

	private VisitBlockWithoutIndent(Node: GtNode, allowDummyBlock: boolean): string {
		return this.VisitBlockWithOption(Node, false, allowDummyBlock, false);
	}

	private VisitBlockWithOption(Node: GtNode, inBlock: boolean, allowDummyBlock: boolean, replaceBreak: boolean): string {
		var Code: string = "";
		var isBreakReplaced: boolean = false;
		if(inBlock) {
			this.Indent();
		}
		var CurrentNode: GtNode = Node;
		if(this.IsEmptyBlock(Node) && allowDummyBlock) {
			Code += this.GetIndentString() + "echo dummy block!! &> /dev/zero" + this.LineFeed;
		}
		while(!this.IsEmptyBlock(CurrentNode)) {
			var poppedCode: string = this.VisitNode(CurrentNode);
			if(replaceBreak && CurrentNode instanceof GtBreakNode) {
				isBreakReplaced = true;
				poppedCode = ";;";
			}
			if(!LibGreenTea.EqualsString(poppedCode, "")) {
				Code += this.GetIndentString() + poppedCode + this.LineFeed;
			}
			CurrentNode = CurrentNode.NextNode;
		}
		if(replaceBreak && !isBreakReplaced) {
			Code += this.GetIndentString() + ";&" + this.LineFeed;
		}
		if(inBlock) {
			this.UnIndent();
			Code += this.GetIndentString();
		}
		else {
			if(Code.length > 0) {
				Code = LibGreenTea.SubString(Code, 0, Code.length - 1);
			}
		}
		return Code;
	}

	public CreateDoWhileNode(Type: GtType, ParsedTree: GtSyntaxTree, Cond: GtNode, Block: GtNode): GtNode {
		/*
		 * do { Block } while(Cond)
		 * => boolean firstCond = true; while(firstCond || Cond) {firstCond = false; Block; }
		 *
		 */
		var BoolType: GtType = Type.Context.BooleanType;
		var VarName: string = "FirstCond";
		var TrueNode: GtNode = this.CreateConstNode(BoolType, ParsedTree, true);
		var FalseNode: GtNode = this.CreateConstNode(BoolType, ParsedTree, false);
		
		var FirstCond: GtNode = this.CreateLocalNode(BoolType, ParsedTree, VarName);
		var NewCond: GtNode = this.CreateOrNode(BoolType, ParsedTree, FirstCond, Cond);
		var LoopBody: GtNode = this.CreateAssignNode(BoolType, ParsedTree, FirstCond, FalseNode);
		
		LinkNode(LoopBody.MoveTailNode(), Block);
		var NewWhileNode: GtNode = this.CreateWhileNode(Type, ParsedTree, NewCond, LoopBody);
		return this.CreateVarNode(BoolType, ParsedTree, BoolType, VarName, TrueNode, NewWhileNode);
	}

	private ResolveCondition(Node: GtNode): string {
		var Cond: string = this.VisitNode(Node);
		if(LibGreenTea.EqualsString(Cond, this.TrueLiteral)) {
			Cond = "((1 == 1))";
		}
		else if(LibGreenTea.EqualsString(Cond, this.FalseLiteral)) {
			Cond = "((1 != 1))";
		}
		else {
			if(Node instanceof GtLocalNode) {
				Cond = "((0 == " + this.ResolveValueType(Node, false) + "))";
			}
		}
		return Cond;
	}

	public VisitWhileNode(Node: GtWhileNode): void {
		var Program: string = "while " + this.ResolveCondition(Node.CondExpr) + " ;do" + this.LineFeed;
		Program += this.VisitBlockWithIndent(Node.LoopBody, true) + "done";
		this.PushSourceCode(Program);
	}

	public VisitForNode(Node: GtForNode): void {
		var Cond: string = this.ResolveCondition(Node.CondExpr);
		var Iter: string = this.VisitNode(Node.IterExpr);
		var Program: string = "for((; " + Cond  + "; " + Iter + " )) ;do" + this.LineFeed;
		Program += this.VisitBlockWithIndent(Node.LoopBody, true) + "done";
		this.PushSourceCode(Program);
	}

	public VisitForEachNode(Node: GtForEachNode): void {
		var Variable: string = this.VisitNode(Node.Variable);
		var Iter: string = this.VisitNode(Node.IterExpr);
		var Program: string = "for " + Variable + " in " + "${" + Iter + "[@]} ;do" + this.LineFeed;
		Program += this.VisitBlockWithIndent(Node.LoopBody, true) + "done";
		this.PushSourceCode(Program);
	}

	private MakeParamCode(ParamList: Array<GtNode>, isAssert: boolean): string[] {
		var Size: number = LibGreenTea.ListSize(ParamList);
		var ParamCode: string[] = new Array<string>(Size);
		var i: number = 0;
		while(i < Size) {
			var ParamNode: GtNode = ParamList.get(i);
			if(isAssert) {
				ParamCode[i] = this.ResolveCondition(ParamNode);
			}
			else {
				ParamCode[i] = this.ResolveValueType(ParamNode, false);
			}
			i = i + 1;
		}
		return ParamCode;
	}

	private FindAssert(Func: GtFunc): boolean {
		var isAssert: boolean = false;
		if(Func != null && Func.Is(NativeMacroFunc)) {
			if(LibGreenTea.EqualsString(Func.FuncName, "assert")) {
				isAssert = true;
			}
		}
		return isAssert;
	}

	public VisitApplyNode(Node: GtApplyNode): void {
		var ParamSize: number = LibGreenTea.ListSize(Node.NodeList);
		var Template: string = this.GenerateFuncTemplate(ParamSize, Node.Func);
		var isAssert: boolean = this.FindAssert(Node.Func);
		if(isAssert) {
			Template = "assert " + LibGreenTea.QuoteString("$1");
		}
		var ParamCode: string[] = this.MakeParamCode(Node.NodeList, isAssert);
		this.PushSourceCode(this.ApplyMacro2(Template, ParamCode));
	}

	public VisitUnaryNode(Node: GtUnaryNode): void {
		var FuncName: string = Node.Token.ParsedText;
		var Func: GtFunc = Node.Func;
		var Expr: string = this.ResolveValueType(Node.Expr, false);	//TODO: support ++ --
		var Macro: string = null;
		if(Func != null) {
			FuncName = Func.GetNativeFuncName();
			if(IsFlag(Func.FuncFlag, NativeMacroFunc)) {
				Macro = Func.GetNativeMacro();
			}
		}
		if(Macro == null) {
			Macro = "((" + FuncName + " $1))";
		}
		this.PushSourceCode(Macro.replace("$1", Expr));
	}

	public VisitBinaryNode(Node: GtBinaryNode): void {
		var FuncName: string = Node.Token.ParsedText;
		var Func: GtFunc = Node.Func;
		var Left: string = this.ResolveValueType(Node.LeftNode, false);
		var Right: string = this.ResolveValueType(Node.RightNode, false);
		var Macro: string = null;
		if(Func != null) {
			FuncName = Func.GetNativeFuncName();
			if(IsFlag(Func.FuncFlag, NativeMacroFunc)) {
				Macro = Func.GetNativeMacro();
			}
		}
		if(Macro == null) {
			Macro = "(($1 " + FuncName + " $2))";
		}
		this.PushSourceCode(Macro.replace("$1", Left).replace("$2", Right));
	}

	private GetMemberIndex(ClassType: GtType, MemberName: string): string {
		return "$" + ClassType.ShortName + this.MemberAccessOperator + MemberName;
	}

	private IsNativeType(Type: GtType): boolean {
		if(Type != null && Type.IsNative()) {
			return true;
		}
		return false;
	}

	public VisitGetterNode(Node: GtGetterNode): void {
		this.PushSourceCode(this.VisitNode(Node.ExprNode) + "[" + this.GetMemberIndex(Node.ExprNode.Type, Node.Func.FuncName) + "]");
	}

	public VisitIndexerNode(Node: GtIndexerNode): void {
		this.PushSourceCode(this.VisitNode(Node.Expr) + "[" + this.ResolveValueType(Node.GetAt(0), false) + "]");
	}

	public VisitAndNode(Node: GtAndNode): void {
		this.PushSourceCode("(" + this.ResolveCondition(Node.LeftNode) + " && " + this.ResolveCondition(Node.RightNode) + ")");
	}

	public VisitOrNode(Node: GtOrNode): void {
		this.PushSourceCode("(" + this.ResolveCondition(Node.LeftNode) + " || " + this.ResolveCondition(Node.RightNode) + ")");
	}

	public VisitAssignNode(Node: GtAssignNode): void {
		this.PushSourceCode(this.VisitNode(Node.LeftNode) + "=" + this.ResolveValueType(Node.RightNode, true));
	}

	public VisitSelfAssignNode(Node: GtSelfAssignNode): void {
		var FuncName: string = Node.Token.ParsedText;
		var Func: GtFunc = Node.Func;
		var Left: string = this.VisitNode(Node.LeftNode);
		var Right: string = this.ResolveValueType(Node.RightNode, false);
		var Macro: string = null;
		if(Func != null) {
			FuncName = Func.GetNativeFuncName();
			if(IsFlag(Func.FuncFlag, NativeMacroFunc)) {
				Macro = Func.GetNativeMacro();
			}
		}
		if(Macro == null) {
			Macro = "(($1 " + FuncName + " $2))";
		}
		this.PushSourceCode(Macro.replace("$1", Left).replace("$2", Right));
	}

	public VisitVarNode(Node: GtVarNode): void {
		var VarName: string = Node.NativeName;
		var Declare: string = "declare ";
		var Option: string = "";
		if(this.inFunc) {
			Declare = "local ";
		}
		if(!this.IsNativeType(Node.DeclType)) {
			Option = "-a ";
		}
		
		var Code: string = Declare + Option + VarName + this.LineFeed;
		Code += this.GetIndentString() + VarName;
		if(Node.InitNode != null) {
			Code += "=" + this.ResolveValueType(Node.InitNode, true);
		} 
		Code +=  this.LineFeed;
		this.PushSourceCode(Code + this.VisitBlockWithoutIndent(Node.BlockNode, false));
	}

	public VisitTrinaryNode(Node: GtTrinaryNode): void {
		var CondExpr: string = this.ResolveCondition(Node.ConditionNode);
		var Then: string = this.ResolveValueType(Node.ThenNode, false);
		var Else: string = this.ResolveValueType(Node.ElseNode, false);
		this.PushSourceCode("((" + CondExpr + " ? " + Then + " : " + Else + "))");
	}

	public VisitIfNode(Node: GtIfNode): void {
		var CondExpr: string = this.ResolveCondition(Node.CondExpr);
		var ThenBlock: string = this.VisitBlockWithIndent(Node.ThenNode, true);
		var Code: string = "if " + CondExpr + " ;then" + this.LineFeed + ThenBlock;
		if(!this.IsEmptyBlock(Node.ElseNode)) {
			Code += "else" + this.LineFeed + this.VisitBlockWithIndent(Node.ElseNode, false);
		}
		Code += "fi";
		this.PushSourceCode(Code);
	}

	public VisitSwitchNode(Node: GtSwitchNode): void {
		var Match: string = this.ResolveValueType(Node.MatchNode, false);
		var Code: string = "case " + Match + " in" + this.LineFeed + this.GetIndentString();
		var i: number = 0;
		while(i < LibGreenTea.ListSize(Node.CaseList)) {
			var Case: GtNode  = Node.CaseList.get(i);
			var Block: GtNode = Node.CaseList.get(i+1);
			Code += this.VisitNode(Case) + ")" + this.LineFeed;
			Code += this.VisitBlockWithReplaceBreak(Block, true);
			i = i + 2;
		}
		if(Node.DefaultBlock != null) {
			Code += "*)" + this.LineFeed;
			Code += this.VisitBlockWithReplaceBreak(Node.DefaultBlock, false);
		}
		Code += "esac";
		this.PushSourceCode(Code);
	}

	public VisitReturnNode(Node: GtReturnNode): void {
		if(!this.inFunc) {
			return;
		}
		
		if(Node.Expr != null) {
			var Ret: string = this.ResolveValueType(Node.Expr, false);
			if(Node.Type.equals(Node.Type.Context.BooleanType) || 
					(Node.Type.equals(Node.Type.Context.IntType) && this.inMainFunc)) {
				this.PushSourceCode("return " + Ret);
				return;
			}
			this.PushSourceCode("echo " + Ret + this.LineFeed + this.GetIndentString() + "return 0");
			return;
		}
		this.PushSourceCode("return 0");
	}

	public VisitTryNode(Node: GtTryNode): void {
		var TrueNode: GtNode = new GtConstNode(Node.Type.Context.BooleanType, null, true);
		var Code: string = "trap ";
		var Try: string = this.VisitNode(new GtIfNode(null, null, TrueNode, Node.TryBlock, null));
		var Catch: string = this.VisitNode(new GtIfNode(null, null, TrueNode, Node.CatchBlock, null));
		Code += LibGreenTea.QuoteString(Catch) + " ERR" + this.LineFeed;
		Code += this.GetIndentString() + Try + this.LineFeed + this.GetIndentString() + "trap ERR";
		if(Node.FinallyBlock != null) {
			var Finally: string = this.VisitNode(new GtIfNode(null, null, TrueNode, Node.FinallyBlock, null));
			Code += this.LineFeed + this.GetIndentString() + Finally;
		}
		this.PushSourceCode(Code);
	}

	public VisitThrowNode(Node: GtThrowNode): void {
		this.PushSourceCode("kill &> /dev/zero");
	}

	public VisitErrorNode(Node: GtErrorNode): void {
		this.PushSourceCode("echo " + LibGreenTea.QuoteString(Node.Token.ParsedText) + " >&2");
	}

	public VisitCommandNode(Node: GtCommandNode): void {
		var Code: string = "";
		var count: number = 0;
		var Type: GtType = Node.Type;
		var CurrentNode: GtCommandNode = Node;
		while(CurrentNode != null) {
			if(count > 0) {
				Code += " | ";
			}
			Code += this.AppendCommand(CurrentNode);
			CurrentNode = <GtCommandNode> CurrentNode.PipedNextNode;
			count += 1;
		}
		
		if(Type.equals(Type.Context.StringType)) {
			Code = "execCommadString " + LibGreenTea.QuoteString(Code);
		}
		else if(Type.equals(Type.Context.BooleanType)) {
			Code = "execCommadBool " + LibGreenTea.QuoteString(Code);
		}
		this.PushSourceCode(Code);
	}

	private AppendCommand(CurrentNode: GtCommandNode): string {
		var Code: string = "";
		var size: number = LibGreenTea.ListSize(CurrentNode.ArgumentList);
		var i: number = 0;
		while(i < size) {
			Code += this.ResolveValueType(CurrentNode.ArgumentList.get(i), false) + " ";
			i = i + 1;
		}
		return Code;
	}

	private CheckConstFolding(TargetNode: GtNode): boolean {
		if(TargetNode instanceof GtConstNode) {
			return true;
		}
		else if(TargetNode instanceof GtUnaryNode) {
			var Unary: GtUnaryNode = <GtUnaryNode> TargetNode;
			return this.CheckConstFolding(Unary.Expr);
		}
		else if(TargetNode instanceof GtBinaryNode) {
			var Binary: GtBinaryNode = <GtBinaryNode> TargetNode;
			if(this.CheckConstFolding(Binary.LeftNode) && this.CheckConstFolding(Binary.RightNode)) {
				return true;
			}
		}
		return false;
	}

	private ResolveValueType(TargetNode: GtNode, isAssign: boolean): string {
		var ResolvedValue: string;
		var Value: string = this.VisitNode(TargetNode);
		var Type: GtType = TargetNode.Type;
		
		// resolve constant folding
		if(this.CheckConstFolding(TargetNode)) {
			return Value;
		}
		
		// resolve boolean function
		if(Type != null && Type.equals(Type.Context.BooleanType)) {
			if(TargetNode instanceof GtApplyNode || TargetNode instanceof GtUnaryNode || 
					TargetNode instanceof GtCommandNode || TargetNode instanceof GtBinaryNode) {
				return "$(valueOfBool " + LibGreenTea.QuoteString(Value) + ")";
			}
		}
		
		if(TargetNode instanceof GtConstNode || TargetNode instanceof GtNullNode) {
			return Value;
		}
		else if(TargetNode instanceof GtIndexerNode || TargetNode instanceof GtGetterNode) {
			ResolvedValue = "${" + Value + "}";
		}
		else if(TargetNode instanceof GtApplyNode || TargetNode instanceof GtCommandNode || TargetNode instanceof GtConstructorNode) {
			ResolvedValue = "$(" + Value + ")";
		}
		else if(TargetNode instanceof GtLocalNode && !this.IsNativeType(Type)) {
			var Local: GtLocalNode = <GtLocalNode> TargetNode;
			var Name: string = Local.NativeName;
			ResolvedValue = "${" + Value + "[@]}";
			if(Name.length == 1 && LibGreenTea.IsDigit(Name, 0)) {
				ResolvedValue = "$" + Value;
			}
		}
		else {
			ResolvedValue = "$" + Value;
		}
		
		// resolve assigned object
		if(isAssign) {
			if(!this.IsNativeType(Type)) {
				ResolvedValue = "(" + ResolvedValue + ")";
				return ResolvedValue;
			}
		}
		
		// resolve string and object value
		if(Type != null) {
			if(Type.equals(Type.Context.StringType) || !this.IsNativeType(Type)) {
				ResolvedValue = LibGreenTea.QuoteString(ResolvedValue);
			}
		}
		return ResolvedValue;
	}

	public GenerateFunc(Func: GtFunc, ParamNameList: Array<string>, Body: GtNode): void {
		this.FlushErrorReport();
		var Function: string = "";
		var FuncName: string = Func.GetNativeFuncName();
		this.inFunc = true;
		if(LibGreenTea.EqualsString(FuncName, "main")) {
			this.inMainFunc = true;
		}
		Function += FuncName + "() {" + this.LineFeed;
		this.Indent();

		var i: number = 0;
		while(i < ParamNameList.size()) {
			var ParamType: GtType = Func.GetFuncParamType(i);
			// "local -a x"
			Function += this.GetIndentString() + "local ";
			if(!this.IsNativeType(ParamType)) {
				Function += "-a ";
			}
			Function += ParamNameList.get(i) + ";" + this.LineFeed + this.GetIndentString();
			// "x = $1"
			Function += ParamNameList.get(i) + "=$" + (i + 1) + ";" + this.LineFeed;
			i = i + 1;
		}
		
		Function += this.VisitBlockWithoutIndent(Body, true) + this.LineFeed;
		this.UnIndent();
		Function += this.GetIndentString() + "}" + this.LineFeed;
		this.WriteLineCode(Function);
		this.inFunc = false;
		this.inMainFunc = false;
	}

	GetNewOperator(Type: GtType): string {
		return LibGreenTea.QuoteString("$(__NEW__" + Type.ShortName + ")");
	}

	public OpenClassField(Type: GtType, ClassField: GtClassField): void {	//TODO: support super
		var Program: string = "__NEW__" + Type.ShortName + "() {" + this.LineFeed;
		this.WriteLineCode("#### define class " + Type.ShortName + " ####");
		this.Indent();
		Program += this.GetIndentString() + "local -a " + this.GetRecvName() + this.LineFeed;

		var i: number = 0;
		while(i < LibGreenTea.ListSize(ClassField.FieldList)) {
			var FieldInfo: GtFieldInfo = ClassField.FieldList.get(i);
			var InitValue: string = this.StringifyConstValue(FieldInfo.InitValue);
			if(!FieldInfo.Type.IsNative()) {
				InitValue = "NULL";
			}
			this.WriteLineCode(Type.ShortName + this.MemberAccessOperator + FieldInfo.NativeName + "=" + i);
			
			Program += this.GetIndentString() + this.GetRecvName();
			Program += "[" + this.GetMemberIndex(Type, FieldInfo.NativeName) + "]=" + InitValue + this.LineFeed;
			i = i + 1;
		}
		Program += this.GetIndentString() + "echo ";
		Program += LibGreenTea.QuoteString("${" + this.GetRecvName() + "[@]}") + this.LineFeed;
		this.UnIndent();
		Program += "}";
		
		this.WriteLineCode(this.LineFeed + Program);
	}

	public Eval(Node: GtNode): Object {
		var Code: string = this.VisitBlockWithoutIndent(Node, false);
		if(!LibGreenTea.EqualsString(Code, "")) {
			this.WriteLineCode(Code);
		}
		return Code;
	}

	public InvokeMainFunc(MainFuncName: string): void {
		this.WriteLineCode(MainFuncName);
	}
}// ***************************************************************************
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
	constructor(TargetCode: string, OutputFile: string, GeneratorFlag: number) {
		super(TargetCode, OutputFile, GeneratorFlag);
		this.TrueLiteral  = "1";
		this.FalseLiteral = "0";
		this.Tab = "\t";
		this.NullLiteral = "NULL";
		this.MemberAccessOperator = "->";
	}
	public InitContext(Context: GtParserContext): void {
		super.InitContext(Context);
	}

	private GetLocalType(Type: GtType, IsPointer: boolean): string {
		if(Type.IsDynamic() || Type.IsNative()) {
			if(Type == Type.PackageNameSpace.Context.BooleanType) {
				return "int";
			}
			return Type.ShortName;
		}
		var TypeName: string = "struct " + Type.ShortName;
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

	public GtTypeName(Type: GtType): string {
		return Type.ShortName;
	}

	GetNewOperator(Type: GtType): string {
		var TypeName: string = this.GtTypeName(Type);
		return "NEW_" + TypeName + "()";
	}

	public VisitWhileNode(Node: GtWhileNode): void {
		var Program: string = "while(" + this.VisitNode(Node.CondExpr) + ")";
		Program += this.VisitBlockWithIndent(Node.LoopBody, true);
		this.PushSourceCode(Program);
	}

	public VisitDoWhileNode(Node: GtDoWhileNode): void {
		var Program: string = "do" + this.VisitBlockWithIndent(Node.LoopBody, true);
		Program += " while(" + this.VisitNode(Node.CondExpr) + ")";
		this.PushSourceCode(Program);
	}

	public VisitForNode(Node: GtForNode): void {
		var Cond: string = this.VisitNode(Node.CondExpr);
		var Iter: string = this.VisitNode(Node.IterExpr);
		var Program: string = "for(; " + Cond  + "; " + Iter + ") ";
		Program += this.VisitBlockWithIndent(Node.LoopBody, true);
		this.PushSourceCode(Program);
	}

	public VisitGetterNode(Node: GtGetterNode): void {
		var Program: string = this.VisitNode(Node.ExprNode);
		var FieldName: string = Node.Func.FuncName;
		var RecvType: GtType = Node.Func.GetRecvType();
		if(Node.ExprNode.Type == RecvType) {
			Program = Program + "->" + FieldName;
		}
		else {
			Program = "GT_GetField(" + this.LocalTypeName(RecvType) + ", " + Program + ", " + FieldName + ")";
		}
		this.PushSourceCode(Program);
	}

	public VisitVarNode(Node: GtVarNode): void {
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
		Code += this.VisitBlockWithIndent(Node.BlockNode, CreateNewScope);
		this.PushSourceCode(Code + this.PopSourceCode());
	}

	public VisitIfNode(Node: GtIfNode): void {
		var CondExpr: string = this.VisitNode(Node.CondExpr);
		var ThenBlock: string = this.VisitBlockWithIndent(Node.ThenNode, true);
		var Code: string = "if(" + CondExpr + ") " + ThenBlock;
		if(Node.ElseNode != null) {
			Code += " else " + this.VisitBlockWithIndent(Node.ElseNode, true);
		}
		this.PushSourceCode(Code);
	}

	public VisitTryNode(Node: GtTryNode): void {
		var Code: string = "try ";
		Code += this.VisitBlockWithIndent(Node.TryBlock, true);
		if(Node.CatchExpr != null) {
		var Val: GtVarNode = <GtVarNode> Node.CatchExpr;
			Code += " catch (" + Val.Type.toString() + " " + Val.NativeName + ") ";
			Code += this.VisitBlockWithIndent(Node.CatchBlock, true);
		}
		if(Node.FinallyBlock != null) {
			Code += " finally " + this.VisitBlockWithIndent(Node.FinallyBlock, true);
		}
		this.PushSourceCode(Code);
	}

	public VisitThrowNode(Node: GtThrowNode): void {
		var Code: string = "throw " + this.VisitNode(Node.Expr);
		this.PushSourceCode(Code);
		this.StopVisitor(Node);
	}

	public VisitErrorNode(Node: GtErrorNode): void {
		var Code: string = "throw Error(\"" + Node.Token.ParsedText + "\")";
		this.PushSourceCode(Code);
		this.StopVisitor(Node);
	}

	public VisitCommandNode(Node: GtCommandNode): void {
		var Code: string = "system(";
		var i: number = 0;
		var Command: string = "String __Command = ";
		while(i < LibGreenTea.ListSize(Node.ArgumentList)) {
			var Param: GtNode = Node.ArgumentList.get(i);
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
		Code += this.VisitBlockWithIndent(Body, true);
		this.WriteLineCode(Code);
	}

	public Eval(Node: GtNode): Object {
		var Code: string = this.VisitBlockWithIndent(Node, false);
		if(LibGreenTea.EqualsString(Code, ";" + this.LineFeed)) {
			return "";
		}
		this.WriteLineCode(Code);
		return Code;
	}

	public OpenClassField(Type: GtType, ClassField: GtClassField): void {
		var TypeName: string = Type.ShortName;
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
}// ***************************************************************************
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

class PerlSourceGenerator extends SourceGenerator {
	constructor(TargetCode: string, OutputFile: string, GeneratorFlag: number) {
		super("perl", OutputFile, GeneratorFlag);
		this.TrueLiteral  = "1";
		this.FalseLiteral = "0";
		this.NullLiteral = "undef";
		this.LineComment = "##";
		this.MemberAccessOperator = "->";
		this.BreakKeyword = "last";
		this.ContinueKeyword = "next";
	}

	public VisitBlockEachStatementWithIndent(Node: GtNode): void {
		var Code: string = "{" + this.LineFeed;
		this.Indent();
		var CurrentNode: GtNode = Node;
		while(CurrentNode != null) {
			CurrentNode.Evaluate(this);
			Code += this.GetIndentString() + this.PopSourceCode() + ";" + this.LineFeed;
			CurrentNode = CurrentNode.NextNode;
		}
		this.UnIndent();
		Code += this.GetIndentString() + "}";
		this.PushSourceCode(Code);
	}

	GetNewOperator(Type: GtType): string {
		return Type.ShortName + "->new";
	}

	public VisitWhileNode(Node: GtWhileNode): void {
		Node.CondExpr.Evaluate(this);
		var Program: string = "while(" + this.PopSourceCode() + ")";
		this.VisitBlockEachStatementWithIndent(Node.LoopBody);
		Program += this.PopSourceCode();
		this.PushSourceCode(Program);
	}

	public VisitDoWhileNode(Node: GtDoWhileNode): void {
		var Program: string = "do {";
		this.VisitBlockEachStatementWithIndent(Node.LoopBody);
		Program += this.PopSourceCode();
		Node.CondExpr.Evaluate(this);
		Program += "} while(" + this.PopSourceCode() + ")";
		this.PushSourceCode(Program);
	}

	public VisitForNode(Node: GtForNode): void {
		Node.IterExpr.Evaluate(this);
		Node.CondExpr.Evaluate(this);
		var Cond: string = this.PopSourceCode();
		var Iter: string = this.PopSourceCode();

		var Program: string = "for(; " + Cond  + "; " + Iter + ")";
		this.VisitBlockEachStatementWithIndent(Node.LoopBody);
		Program += this.PopSourceCode();
		this.PushSourceCode(Program);
	}

	public VisitLocalNode(Node: GtLocalNode): void {
		this.PushSourceCode("$" + Node.NativeName);
	}

	public VisitVarNode(Node: GtVarNode): void {
		var VarName: string = Node.NativeName;
		var Code: string = "my $" + VarName;
		if(Node.InitNode != null) {
			Code += " = " + this.VisitNode(Node.InitNode);
		}
		Code +=  ";" + this.LineFeed;
		Code += this.GetIndentString();
		this.VisitBlockEachStatementWithIndent(Node.BlockNode);
		this.PushSourceCode(Code + this.PopSourceCode());

	}

	public VisitGetterNode(Node: GtGetterNode): void {
		this.PushSourceCode(this.VisitNode(Node.ExprNode) + this.MemberAccessOperator + "{'" + Node.Func.FuncName + "'}");
	}

	public VisitIfNode(Node: GtIfNode): void {
		var CondExpr: string = this.VisitNode(Node.CondExpr);
		this.VisitBlockEachStatementWithIndent(Node.ThenNode);
		var ThenBlock: string = this.PopSourceCode();
		var Code: string = "if(" + CondExpr + ") " + ThenBlock;
		if(Node.ElseNode != null) {
			this.VisitBlockEachStatementWithIndent(Node.ElseNode);
			Code += " else " + this.PopSourceCode();
		}
		this.PushSourceCode(Code);
	}

	public VisitTryNode(Node: GtTryNode): void {
		var Code: string = "try ";
		Code += this.VisitBlockWithIndent(Node.TryBlock, true);
		if(Node.CatchExpr != null) {
		var Val: GtVarNode = <GtVarNode> Node.CatchExpr;
			Code += " catch " + Val.Type.toString() + " with {" + this.LineFeed;
			this.Indent();
			Code += this.GetIndentString() + "my $" + Val.NativeName + " = shift;" + this.LineFeed;
			Code += this.GetIndentString() + this.VisitBlockWithIndent(Node.CatchBlock, false);
			Code += "}";
		}
		if(Node.FinallyBlock != null) {
			Code += " finally " + this.VisitBlockWithIndent(Node.FinallyBlock, true);
		}
		this.PushSourceCode(Code);
	}

	public VisitThrowNode(Node: GtThrowNode): void {
		Node.Expr.Evaluate(this);
		var Code: string = "throw " + this.PopSourceCode();
		this.PushSourceCode(Code);
	}

	public VisitErrorNode(Node: GtErrorNode): void {
		var Code: string = "throw Error(\"" + Node.Token.ParsedText + "\")";
		this.PushSourceCode(Code);
	}

	public VisitCommandNode(Node: GtCommandNode): void {
		var Code: string = "system(\"";
		var i: number = 0;
		while(i < Node.ArgumentList.size()) {
			var Param: GtNode = Node.ArgumentList.get(i);
			if(i != 0) {
				Code += " ";
			}
			Param.Evaluate(this);
			Code += this.PopSourceCode();
			i = i + 1;
		}
		Code += "\")";
		this.PushSourceCode(Code);
	}

	public GenerateFunc(Func: GtFunc, ParamNameList: Array<string>, Body: GtNode): void {
		this.FlushErrorReport();
		var Program: string = "";
		var RetTy: string = Func.GetReturnType().ShortName;
		var FuncName: string = Func.GetNativeFuncName();
		var Signature: string = "# ";
		var Arguments: string = "";
		Signature += RetTy + " " + FuncName + "(";
		this.Indent();
		var i: number = 0;
		while(i < ParamNameList.size()) {
			var ParamTy: string = Func.GetFuncParamType(i).ShortName;
			Signature += " ," + ParamTy + " " + ParamNameList.get(i);
			Arguments += this.GetIndentString() + "my $" + ParamNameList.get(i) + " = $_[" + i + "];" + this.LineFeed;
			i = i + 1;
		}
		this.UnIndent();
		Program += Signature + ");" + this.LineFeed + this.GetIndentString() + "sub " + FuncName + " {" + this.LineFeed;
		this.Indent();
		Program += Arguments + this.GetIndentString();
		this.VisitBlockEachStatementWithIndent(Body);
		Program += this.PopSourceCode();
		this.UnIndent();
		Program += this.LineFeed + this.GetIndentString() + "}";
		this.WriteLineCode(Program);
	}

	public OpenClassField(Type: GtType, ClassField: GtClassField): void {
		var TypeName: string = Type.ShortName;
		var Program: string = this.GetIndentString() + "package " + TypeName + ";" + this.LineFeed;
		if(Type.SuperType != null) {
			Program += this.GetIndentString() + "# our @ISA = ('" + Type.SuperType.ShortName + "');" + this.LineFeed;
		}
		Program += this.GetIndentString() + "sub new {" + this.LineFeed;
		this.Indent();
		var i: number = 0;
		Program += this.GetIndentString() + "my $class = shift;" + this.LineFeed;
		Program += this.GetIndentString() + "my $" + this.GetRecvName() + " = {};" + this.LineFeed;
		while(i < ClassField.FieldList.size()) {
			var FieldInfo: GtFieldInfo = ClassField.FieldList.get(i);
			var InitValue: string = this.StringifyConstValue(FieldInfo.InitValue);
			if(!FieldInfo.Type.IsNative()) {
				InitValue = this.NullLiteral;
			}
			Program += this.GetIndentString() + "$" + this.GetRecvName() + "->{'" + FieldInfo.NativeName + "'} = " + InitValue + ";" + this.LineFeed;
			i = i + 1;
		}
		Program += this.GetIndentString() + "return bless $" + this.GetRecvName() + ", $class" + this.LineFeed;
		this.UnIndent();
		Program += this.GetIndentString() + "}" + this.LineFeed;
		Program += this.GetIndentString() + "package main;" + this.LineFeed;
		this.WriteLineCode(Program);
	}

	public Eval(SingleNode: GtNode): Object {
		SingleNode.Evaluate(this);
		return this.PopSourceCode();
	}

	public StartCompilationUnit(): void {
		this.WriteLineCode("use strict;");
		this.WriteLineCode("use warnings;");
		this.WriteLineCode("use Error qw(:try);");
	}

	public GetRecvName(): string {
		return "self";
	}

	public InvokeMainFunc(MainFuncName: string): void {
		this.WriteLineCode(MainFuncName);
	}
}// ***************************************************************************
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

class PythonSourceGenerator extends SourceGenerator {
	private SwitchCaseCount: number;
	private importSubProc: boolean = false;

	constructor(TargetCode: string, OutputFile: string, GeneratorFlag: number) {
		super(TargetCode, OutputFile, GeneratorFlag);
		this.Tab = "    ";
		this.LogicalAndOperator = "and";
		this.LogicalOrOperator  = "or";
		this.TrueLiteral  = "True";
		this.FalseLiteral = "False";
		this.NullLiteral = "None";
		this.LineComment = "##";
		this.SwitchCaseCount = 0;
		this.BlockBegin = "";
		this.BlockEnd = "";
		this.SemiColon = "";
	}

	GetNewOperator(Type: GtType): string {
		var TypeName: string = Type.ShortName;
		return TypeName + "()";
	}

	public CreateDoWhileNode(Type: GtType, ParsedTree: GtSyntaxTree, Cond: GtNode, Block: GtNode): GtNode {
		/*
		 * do { Block } while(Cond)
		 * => for(; True; if(!Cond) { break; } ) { Block;  }
		 */
		var Break: GtNode = this.CreateBreakNode(Type, ParsedTree, null);
		var PolyFunc: GtPolyFunc = ParsedTree.NameSpace.GetMethod(Cond.Type, "not", true);
		var Gamma: GtTypeEnv = new GtTypeEnv(ParsedTree.NameSpace);
		var Func: GtFunc = null;
		if(PolyFunc != null) {
			Func = PolyFunc.ResolveUnaryMethod(Gamma, Cond.Type);
		}
		Cond = this.CreateUnaryNode(Type, ParsedTree, Func, Cond);
		var IfBlock: GtNode = this.CreateIfNode(Type, ParsedTree, Cond, Break, null);
		var TrueNode: GtNode = this.CreateConstNode(ParsedTree.NameSpace.Context.BooleanType, ParsedTree, true);
		return this.CreateForNode(Type, ParsedTree, TrueNode, IfBlock, Block);
	}

	// Visitor API
	public VisitWhileNode(Node: GtWhileNode): void {
		var Program: string = "while " + this.VisitNode(Node.CondExpr) + ":" + this.LineFeed;
		if(this.IsEmptyBlock(Node.LoopBody)) {
			this.Indent();
			Program += this.GetIndentString() + "pass";
			this.UnIndent();
		}
		else {
			Program += this.VisitBlockWithIndent(Node.LoopBody, true);
		}
		this.PushSourceCode(Program);
	}

	public VisitForNode(Node: GtForNode): void {
		/* for(; COND; ITER) BLOCK1; continue; BLOCK2;
		 * => while COND:
		 * 		BLOCK1;
		 * 		ITER;continue;
		 * 		BLOCK2;
		 * 		ITER
		 */
		var Program: string = "while " + this.VisitNode(Node.CondExpr) + ":" + this.LineFeed;
		if(this.IsEmptyBlock(Node.LoopBody)) {
			this.Indent();
			Program += this.GetIndentString() + "pass";
			this.UnIndent();
		}
		else {
			Program += this.VisitBlockWithIndent(Node.LoopBody, true);
		}
		Program += this.VisitBlockWithIndent(Node.IterExpr, true);
		this.PushSourceCode(Program);
	}

	public VisitForEachNode(Node: GtForEachNode): void {
		var Iter: string = this.VisitNode(Node.IterExpr);
		var Variable: string = this.VisitNode(Node.Variable);
		var Program: string = "for " + Variable + " in " + Iter + ":" + this.LineFeed;
		Program += this.VisitBlockWithIndent(Node.LoopBody, true);
		this.PushSourceCode(Program);
	}

	public VisitContinueNode(Node: GtContinueNode): void {
		var Code: string = "";
		var Parent: GtForNode = this.FindParentForNode(Node);
		if(Parent != null) {
			var IterNode: GtNode = Parent.IterExpr;
			if(IterNode != null) {
				Code += this.VisitNode(IterNode) + this.LineFeed + this.GetIndentString();
			}
		}
		Code += this.ContinueKeyword;
		if(this.HasLabelSupport) {
			var Label: string = Node.Label;
			if(Label != null) {
				Code += " " + Label;
			}
		}
		this.PushSourceCode(Code);
		this.StopVisitor(Node);
	}

	public VisitSuffixNode(Node: GtSuffixNode): void {
		var FuncName: string = Node.Token.ParsedText;
		var Expr: string = this.VisitNode(Node.Expr);
		if(LibGreenTea.EqualsString(FuncName, "++")) {
			FuncName = " += 1";
		}
		else if(LibGreenTea.EqualsString(FuncName, "--")) {
			FuncName = " -= 1";
		}
		else {
			LibGreenTea.DebugP(FuncName + " is not supported suffix operator!!");
		}
		this.PushSourceCode("(" + SourceGenerator.GenerateApplyFunc1(null, FuncName, true, Expr) + ")");
	}

	public VisitVarNode(Node: GtVarNode): void {
		var Code: string = Node.NativeName;
		var InitValue: string = this.NullLiteral;
		if(Node.InitNode != null) {
			InitValue = this.VisitNode(Node.InitNode);
		}
		Code += " = " + InitValue + this.LineFeed;
		this.PushSourceCode(Code + this.VisitBlockWithIndent(Node.BlockNode, false));
	}

	public VisitTrinaryNode(Node: GtTrinaryNode): void {
		var CondExpr: string = this.VisitNode(Node.ConditionNode);
		var Then: string = this.VisitNode(Node.ThenNode);
		var Else: string = this.VisitNode(Node.ElseNode);
		this.PushSourceCode(Then + " if " + CondExpr + " else " + Else);
	}

	public VisitIfNode(Node: GtIfNode): void {
		var CondExpr: string = this.VisitNode(Node.CondExpr);
		var ThenBlock: string = this.VisitBlockWithIndent(Node.ThenNode, true);
		var Code: string = "if " + CondExpr + ":" + this.LineFeed + this.GetIndentString() + ThenBlock;
		if(this.IsEmptyBlock(Node.ThenNode)) {
			Code += this.GetIndentString() + "pass" + this.LineFeed + this.GetIndentString();
		}

		if(!this.IsEmptyBlock(Node.ElseNode)) {
			var ElseBlock: string = this.VisitBlockWithIndent(Node.ElseNode, true);
			Code += "else:" + this.LineFeed + ElseBlock;
		}
		this.PushSourceCode(Code);
	}
	public VisitSwitchNode(Node: GtSwitchNode): void {
		var Code: string = "Match" + this.SwitchCaseCount + " = " + this.VisitNode(Node.MatchNode) + this.LineFeed;
		this.SwitchCaseCount += 1;
		var i: number = 0;
		while(i < Node.CaseList.size()) {
			var Case: GtNode  = Node.CaseList.get(i);
			var Block: GtNode = Node.CaseList.get(i+1);
			Code += this.GetIndentString();
			if(i == 0) {
				Code += "if";
			}
			else {
				Code += "elif";
			}
			Code += this.VisitNode(Case) + ":";
			Code += this.VisitBlockWithIndent(Block, true) + this.LineFeed;
			i = i + 2;
		}
		if(Node.DefaultBlock != null) {
			Code += this.GetIndentString() + "else: ";
			Code += this.VisitBlockWithIndent(Node.DefaultBlock, true) + this.LineFeed;
		}
		Code += this.GetIndentString() + "}";
		this.PushSourceCode(Code);
	}

	public VisitTryNode(Node: GtTryNode): void {
		var Code: string = "try:" + this.LineFeed;
		Code += this.VisitBlockWithIndent(Node.TryBlock, true);
		if(Node.CatchExpr != null) {
			var Val: GtVarNode = <GtVarNode> Node.CatchExpr;
			Code += "except " + Val.Type.toString() + ", " + Val.NativeName + ":" + this.LineFeed;
			Code += this.VisitBlockWithIndent(Node.CatchBlock, true);
		}
		if(Node.FinallyBlock != null) {
			var Finally: string = this.VisitBlockWithIndent(Node.FinallyBlock, true);
			Code += "finally:" + this.LineFeed + Finally;
		}
		this.PushSourceCode(Code);
	}

	public VisitThrowNode(Node: GtThrowNode): void {
		var expr: string = "";
		if(Node.Expr != null) {
			expr = this.VisitNode(Node.Expr);
		}
		this.PushSourceCode("raise " + expr);
	}

	public VisitErrorNode(Node: GtErrorNode): void {
		var Code: string = "raise SoftwareFault(\"" + Node.Token.ParsedText + "\")";
		this.PushSourceCode(Code);
	}

	public VisitCommandNode(Node: GtCommandNode): void {
		if(!this.importSubProc) {
			this.importSubProc = true;
			var Header: string = "import sys, os" + this.LineFeed;
			Header += "sys.path.append(os.getenv(" + LibGreenTea.QuoteString("GREENTEA_HOME") + ") + ";
			Header += LibGreenTea.QuoteString("/include/python") + ")" + this.LineFeed;
			Header += "import GtSubProc";
			this.WriteHeader(Header);
		}

		var Code: string = "";
		var CurrentNode: GtCommandNode = Node;
		while(CurrentNode != null) {
			Code += this.AppendCommand(CurrentNode);
			CurrentNode = <GtCommandNode> CurrentNode.PipedNextNode;
			break;	//TODO :support pipe
		}

		if(Node.Type.equals(Node.Type.Context.StringType)) {
			Code = "GtSubProc.execCommandString([" + Code + "])";
		}
		else if(Node.Type.equals(Node.Type.Context.BooleanType)) {
			Code = "GtSubProc.execCommandBool([" + Code + "])";
		}
		else {
			Code = "GtSubProc.execCommandVoid([" + Code + "])";
		}
		this.PushSourceCode(Code);
	}

	private AppendCommand(CurrentNode: GtCommandNode): string {
		var Code: string = "";
		var size: number = CurrentNode.ArgumentList.size();
		var i: number = 0;
		while(i < size) {
			if(i > 0) {
				Code += ", ";
			}
			Code += this.VisitNode(CurrentNode.ArgumentList.get(i));
			i = i + 1;
		}
		return Code;
	}

	public GenerateFunc(Func: GtFunc, ParamNameList: Array<string>, Body: GtNode): void {
		this.FlushErrorReport();
		var Function: string = "def ";
		Function += Func.GetNativeFuncName() + "(";
		var i: number = 0;
		var size: number = ParamNameList.size();
		while(i < size) {
			if(i > 0) {
				Function += ", ";
			}
			Function += ParamNameList.get(i);
			i = i + 1;
		}
		var Block: string = this.VisitBlockWithIndent(Body, true);
		Function += "):" + this.LineFeed + Block + this.LineFeed;
		this.WriteLineCode(Function);
	}

	public OpenClassField(Type: GtType, ClassField: GtClassField): void {
		this.FlushErrorReport();
		var Program: string = this.GetIndentString() + "class " + Type.ShortName;
//		if(Type.SuperType != null) {
//			Program += "(" + Type.SuperType.ShortClassName + ")";
//		}
		Program += ":" + this.LineFeed;
		this.Indent();

		Program += this.GetIndentString() + "def __init__(" + this.GetRecvName() + ")" + ":" + this.LineFeed;
		this.Indent();
		var i: number = 0, length = LibGreenTea.ListSize(ClassField.FieldList);
		if(length == 0) {
			Program += this.GetIndentString() + "pass;" + this.LineFeed;
		}
		else {
			while(i < length) {
				var FieldInfo: GtFieldInfo = ClassField.FieldList.get(i);
				var InitValue: string = this.StringifyConstValue(FieldInfo.InitValue);
				if(!FieldInfo.Type.IsNative()) {
					InitValue = "None";
				}
				Program += this.GetIndentString() + this.GetRecvName() + "." + FieldInfo.NativeName + " = " + InitValue + this.LineFeed;
				i = i + 1;
			}
		}
		this.UnIndent();
		this.UnIndent();
		this.WriteLineCode(Program);
	}

	public Eval(Node: GtNode): Object {
		var Code: string = this.VisitBlockWithIndent(Node, false);
		if(!LibGreenTea.EqualsString(Code, "")) {
			this.WriteLineCode(Code);
		}
		return null;
	}

	public GetRecvName(): string {
		return "self";
	}

	public InvokeMainFunc(MainFuncName: string): void {
		this.WriteLineCode("if __name__ == '__main__':");
		this.WriteLineCode(this.Tab + MainFuncName + "()");
	}

}// ***************************************************************************
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

class ScalaSourceGenerator extends SourceGenerator {
	OutFileName: string;
	constructor(TargetCode: string, OutputFile: string, GeneratorFlag: number) {
		super(TargetCode, OutputFile, GeneratorFlag);
		this.OutFileName = OutputFile;
		if(LibGreenTea.EqualsString(this.OutFileName, "-")) {
			this.OutFileName = "GreenTea";
		} else {
			this.OutFileName = this.OutFileName.replace("/", "_").replace(".", "_").replace("-", "_");
		}
	}

	private LocalTypeName(Type: GtType): string {
		if(Type.IsDynamic() || Type.IsNative()) {
			if(Type == Type.PackageNameSpace.Context.VoidType) {
				return "Unit";
			}
			if(Type == Type.PackageNameSpace.Context.IntType) {
				return "Int";
			}
			if(Type == Type.PackageNameSpace.Context.FloatType) {
				return "Double";
			}
			if(Type == Type.PackageNameSpace.Context.BooleanType) {
				return "Boolean";
			}
		}
		return Type.ShortName;
	}

	// copied from PythonSourceGenerator
	public VisitForNode(Node: GtForNode): void {
		/* for(; COND; ITER) BLOCK1; continue; BLOCK2;
		 * => while COND:
		 * 		BLOCK1;
		 * 		ITER;continue;
		 * 		BLOCK2;
		 * 		ITER
		 */
		var Program: string = "while(" + this.VisitNode(Node.CondExpr) + ")" + this.LineFeed;
		Program += this.GetIndentString() + "{";
		this.Indent();
		Program += this.VisitBlockWithIndent(Node.LoopBody, false);
		Program += this.VisitBlockWithIndent(Node.IterExpr, false);
		Program += this.GetIndentString() + "}";
		this.UnIndent();
		this.PushSourceCode(Program);
	}

	public VisitContinueNode(Node: GtContinueNode): void {
		var Code: string = "";
		var Parent: GtForNode = this.FindParentForNode(Node);
		if(Parent != null) {
			var IterNode: GtNode = Parent.IterExpr;
			if(IterNode != null) {
				Code += this.VisitNode(IterNode) + this.LineFeed + this.GetIndentString();
			}
		}
		Code += this.ContinueKeyword;
		if(this.HasLabelSupport) {
			var Label: string = Node.Label;
			if(Label != null) {
				Code += " " + Label;
			}
		}
		this.PushSourceCode(Code);
		this.StopVisitor(Node);
	}
	
	public VisitWhileNode(Node: GtWhileNode): void {
		var Program: string = "while(" + this.VisitNode(Node.CondExpr) + ")";
		Program += this.VisitBlockWithIndent(Node.LoopBody, true);
		this.PushSourceCode(Program);
	}

	public VisitDoWhileNode(Node: GtDoWhileNode): void {
		var Program: string = "do" + this.VisitBlockWithIndent(Node.LoopBody, true);
		Program += " while(" + this.VisitNode(Node.CondExpr) + ")";
		this.PushSourceCode(Program);
	}

	public VisitGetterNode(Node: GtGetterNode): void {
		var Program: string = this.VisitNode(Node.ExprNode);
		var FieldName: string = Node.Func.FuncName;
		Program = Program + "." + FieldName;
		this.PushSourceCode(Program);
	}

	public VisitVarNode(Node: GtVarNode): void {
		var Type: string = this.LocalTypeName(Node.DeclType);
		var VarName: string = Node.NativeName;
		var Code: string = "var " + VarName + " : " + Type + " ";
		var CreateNewScope: boolean = true;
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

	public VisitIfNode(Node: GtIfNode): void {
		var CondExpr: string = this.VisitNode(Node.CondExpr);
		var ThenBlock: string = this.VisitBlockWithIndent(Node.ThenNode, true);
		var Code: string = "if(" + CondExpr + ") " + ThenBlock;
		if(Node.ElseNode != null) {
			Code += " else " + this.VisitBlockWithIndent(Node.ElseNode, true);
		}
		this.PushSourceCode(Code);
	}

	public VisitTryNode(Node: GtTryNode): void {
		var Code: string = "try ";
		Code += this.VisitBlockWithIndent(Node.TryBlock, true);
		if(Node.CatchExpr != null) {
		var Val: GtVarNode = <GtVarNode> Node.CatchExpr;
			Code += " catch (" + Val.Type.toString() + " " + Val.NativeName + ") ";
			Code += this.VisitBlockWithIndent(Node.CatchBlock, true);
		}
		if(Node.FinallyBlock != null) {
			Code += " finally " + this.VisitBlockWithIndent(Node.FinallyBlock, true);
		}
		this.PushSourceCode(Code);
	}


	public VisitThrowNode(Node: GtThrowNode): void {
		var Code: string = "throw " + this.VisitNode(Node.Expr);
		this.PushSourceCode(Code);
	}

	public VisitErrorNode(Node: GtErrorNode): void {
		var Code: string = "throw RuntimeError(\"" + Node.Token.ParsedText + "\")";
		this.PushSourceCode(Code);
	}

	public Eval(Node: GtNode): Object {
		var Code: string = this.VisitBlockWithIndent(Node, false);
		if(LibGreenTea.EqualsString(Code, ";" + this.LineFeed)) {
			return "";
		}
		this.WriteLineCode(Code);
		return Code;
	}

	public GenerateFunc(Func: GtFunc, ParamNameList: Array<string>, Body: GtNode): void {
		this.FlushErrorReport();
		var Function: string = "def ";
		Function += Func.GetNativeFuncName() + "(";
		var i: number = 0;
		var size: number = ParamNameList.size();
		while(i < size) {
			if(i > 0) {
				Function += ", ";
			}
			var ParamTy: string = this.LocalTypeName(Func.GetFuncParamType(i));
			Function += ParamNameList.get(i) + " : " + ParamTy;
			i = i + 1;
		}
		var Block: string = this.VisitBlockWithIndent(Body, true);
		Function += ") : " + this.LocalTypeName(Func.GetReturnType()) + " = " + this.LineFeed + Block + this.LineFeed;
		this.WriteLineCode(Function);
	}

	public OpenClassField(Type: GtType, ClassField: GtClassField): void {
		var TypeName: string = this.LocalTypeName(Type);
		var Program: string = this.GetIndentString() + "class " + TypeName;
//		if(Type.SuperType != null) {
//			Program += " extends " + Type.SuperType;
//		}
		Program += " {" + this.LineFeed;
		this.Indent();
		var i: number = ClassField.ThisClassIndex;
		while(i < ClassField.FieldList.size()) {
			var FieldInfo: GtFieldInfo = ClassField.FieldList.get(i);
			var VarType: GtType = FieldInfo.Type;
			var VarName: string = FieldInfo.NativeName;
			Program += this.GetIndentString() + "var " + VarName + " : ";
			Program += this.LocalTypeName(VarType) + " = _#COMMENT1#;" + this.LineFeed;
			i = i + 1;
		}
		this.UnIndent();
		Program += this.GetIndentString() + "};" + this.LineFeed;
		Program += this.GetIndentString() + "def constructor(self : " + TypeName + ") : " + this.LocalTypeName(Type);
		Program += " = {" + this.LineFeed;
		this.Indent();
		i = 0;
//		Program += this.GetIndentString() + "var " + this.GetRecvName() + " : " + this.LocalTypeName(Type);
//		Program += " = new " + this.LocalTypeName(Type) + "();" + this.LineFeed;
		while(i < ClassField.FieldList.size()) {
			var FieldInfo: GtFieldInfo = ClassField.FieldList.get(i);
			var VarName: string = FieldInfo.NativeName;
			var InitValue: string = this.StringifyConstValue(FieldInfo.InitValue);
			if(!FieldInfo.Type.IsNative()) {
				InitValue = this.NullLiteral;
			}
			Program += this.GetIndentString() + this.GetRecvName() + "." + VarName + " = " + InitValue + ";" + this.LineFeed;
			i = i + 1;
		}
		Program += this.GetIndentString() + "return " + this.GetRecvName() + ";" + this.LineFeed;
		this.UnIndent();
		Program += this.GetIndentString() + "};";
		
		this.WriteLineCode(Program);
	}

	public StartCompilationUnit(): void {
		this.WriteLineCode("object " + this.OutFileName + " {");
	}

	public FinishCompilationUnit(): void {
		this.WriteLineCode("}");
	}
	public InvokeMainFunc(MainFuncName: string): void {
		this.WriteLineCode("def main(args: Array[String]) {");
		this.WriteLineCode(this.Tab + MainFuncName + "()");
		this.WriteLineCode("}");
	}

	public GetRecvName(): string {
		return "self";
	}
}// ***************************************************************************
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



class KonohaGrammar extends GtGrammar {

	private static  HasAnnotation(Annotation: GtMap, Key: string): boolean {
		if(Annotation != null) {
			var Value: Object = Annotation.GetOrNull(Key);
			if(Value instanceof Boolean) {
				Annotation.put(Key, false);  // consumed;
			}
			return (Value != null);
		}
		return false;
	}

	public static ParseNameSpaceFlag(Flag: number, Annotation: GtMap): number {
		if(Annotation != null) {
			if(KonohaGrammar.HasAnnotation(Annotation, "RootNameSpace")) {
				Flag = Flag | RootNameSpace;
			}
			if(KonohaGrammar.HasAnnotation(Annotation, "Public")) {
				Flag = Flag | PublicNameSpace;
			}
		}
		return Flag;
	}

	public static ParseClassFlag(Flag: number, Annotation: GtMap): number {
		if(Annotation != null) {
			if(KonohaGrammar.HasAnnotation(Annotation, "Export")) {
				Flag = Flag | ExportFunc;
			}
			if(KonohaGrammar.HasAnnotation(Annotation, "Public")) {
				Flag = Flag | PublicFunc;
			}
			if(KonohaGrammar.HasAnnotation(Annotation, "Virtual")) {
				Flag = Flag | VirtualFunc;
			}
			if(KonohaGrammar.HasAnnotation(Annotation, "Deprecated")) {
				Flag = Flag | DeprecatedFunc;
			}
		}
		return Flag;
	}

	public static ParseFuncFlag(Flag: number, Annotation: GtMap): number {
		if(Annotation != null) {
			if(KonohaGrammar.HasAnnotation(Annotation, "Export")) {
				Flag = Flag | ExportFunc;
			}
			if(KonohaGrammar.HasAnnotation(Annotation, "Public")) {
				Flag = Flag | PublicFunc;
			}
			if(KonohaGrammar.HasAnnotation(Annotation, "Hidden")) {
				Flag = Flag | HiddenFunc;
			}
			if(KonohaGrammar.HasAnnotation(Annotation, "Const")) {
				Flag = Flag | ConstFunc;
			}
			if(KonohaGrammar.HasAnnotation(Annotation, "Common")) {
				Flag = Flag | CommonFunc;
			}
			if(KonohaGrammar.HasAnnotation(Annotation, "Operator")) {
				Flag = Flag | OperatorFunc;
			}
			if(KonohaGrammar.HasAnnotation(Annotation, "Method")) {
				Flag = Flag | MethodFunc;
			}
			if(KonohaGrammar.HasAnnotation(Annotation, "Coercion")) {
				Flag = Flag | CoercionFunc;
			}
			if(KonohaGrammar.HasAnnotation(Annotation, "StrongCoercion")) {
				Flag = Flag | CoercionFunc | StrongCoercionFunc ;
			}
			if(KonohaGrammar.HasAnnotation(Annotation, "Deprecated")) {
				Flag = Flag | DeprecatedFunc;
			}
		}
		return Flag;
	}

	public static ParseVarFlag(Flag: number, Annotation: GtMap): number {
		if(Annotation != null) {
			if(KonohaGrammar.HasAnnotation(Annotation, "ReadOnly")) {
				Flag = Flag | ReadOnlyVar;
			}
		}
		return Flag;
	}

	// Token
	public static WhiteSpaceToken(TokenContext: GtTokenContext, SourceText: string, pos: number): number {
		TokenContext.FoundWhiteSpace();
		while(pos < SourceText.length) {
			var ch: number = LibGreenTea.CharAt(SourceText, pos);
			if(ch == 10 || !LibGreenTea.IsWhitespace(SourceText, pos)) {
				break;
			}
			pos += 1;
		}
		return pos;
	}

	public static IndentToken(TokenContext: GtTokenContext, SourceText: string, pos: number): number {
		var LineStart: number = pos + 1;
		TokenContext.FoundLineFeed(1);
		pos = pos + 1;
		while(pos < SourceText.length) {
			if(!LibGreenTea.IsWhitespace(SourceText, pos)) {
				break;
			}
			if(LibGreenTea.CharAt(SourceText, pos) == 10) {
				TokenContext.FoundLineFeed(1);
			}
			pos += 1;
		}
		var Text: string = "";
		if(LineStart < pos) {
			Text = LibGreenTea.SubString(SourceText, LineStart, pos);
		}
		TokenContext.AddNewToken(Text, IndentTokenFlag, null);
		return pos;
		//TokenContext.AddNewToken(SourceText.substring(pos), SourceTokenFlag, null);
		//return SourceText.length();
	}

	public static SemiColonToken(TokenContext: GtTokenContext, SourceText: string, pos: number): number {
		TokenContext.AddNewToken(LibGreenTea.SubString(SourceText, pos, (pos+1)), DelimTokenFlag, null);
		return pos+1;
	}

	public static SymbolToken(TokenContext: GtTokenContext, SourceText: string, pos: number): number {
		var start: number = pos;
		var PresetPattern: string = null;
		while(pos < SourceText.length) {
			if(!LibGreenTea.IsVariableName(SourceText, pos) && !LibGreenTea.IsDigit(SourceText, pos)) {
				break;
			}
			pos += 1;
		}
		TokenContext.AddNewToken(LibGreenTea.SubString(SourceText, start, pos), NameSymbolTokenFlag, PresetPattern);
		return pos;
	}

	public static OperatorToken(TokenContext: GtTokenContext, SourceText: string, pos: number): number {
		var NextPos: number = pos + 1;
		while(NextPos < SourceText.length) {
			if(LibGreenTea.IsWhitespace(SourceText, NextPos) || LibGreenTea.IsLetter(SourceText, NextPos) || LibGreenTea.IsDigit(SourceText, NextPos)) {
				break;
			}
			NextPos += 1;
		}
		var Matched: boolean = false;
		while(NextPos > pos) {
			var Sub: string = LibGreenTea.SubString(SourceText, pos, NextPos);
			var Pattern: GtSyntaxPattern = TokenContext.TopLevelNameSpace.GetExtendedSyntaxPattern(Sub);
			if(Pattern != null) {
				Matched = true;
				break;
			}
			NextPos -= 1;
		}
		// FIXME
		if(Matched == false) {
			NextPos = pos + 1;
		}
		TokenContext.AddNewToken(LibGreenTea.SubString(SourceText, pos, NextPos), 0, null);
		return NextPos;
	}

	public static CommentToken(TokenContext: GtTokenContext, SourceText: string, pos: number): number {
		var NextPos: number = pos + 1;
		var NextChar: number = LibGreenTea.CharAt(SourceText, NextPos);
		if(NextChar != 47 && NextChar != 42) {
			return MismatchedPosition;
		}
		if(NextChar == 42) { // MultiLineComment
			// SourceMap ${file:line}
			if(LibGreenTea.CharAt(SourceText, NextPos+1) == 36 && LibGreenTea.CharAt(SourceText, NextPos+2) == 123) {
				var StartPos: number = NextPos + 3;
				NextPos += 3;
				while(NextChar != 0) {
					NextChar = LibGreenTea.CharAt(SourceText, NextPos);
					if(NextChar == 125) {
						TokenContext.SetSourceMap(LibGreenTea.SubString(SourceText, StartPos, NextPos));
						break;
					}
					if(NextChar == 10 || NextChar == 42) {
						break;  // stop
					}
					NextPos += 1;
				}
			}
			var Level: number = 1;
			var PrevChar: number = 0;
			while(NextPos < SourceText.length) {
				NextChar = LibGreenTea.CharAt(SourceText, NextPos);
				if(NextChar == 47 && PrevChar == 42) {
					if(Level == 1) {
						return NextPos + 1;
					}
					Level = Level - 1;
				}
				if(Level > 0) {
					if(NextChar == 42 && PrevChar == 47) {
						Level = Level + 1;
					}
				}
				PrevChar = NextChar;
				NextPos = NextPos + 1;
			}
		}
		else if(NextChar == 47) { // SingleLineComment
			while(NextPos < SourceText.length) {
				NextChar = LibGreenTea.CharAt(SourceText, NextPos);
				if(NextChar == 10) {
					return KonohaGrammar.IndentToken(TokenContext, SourceText, NextPos);
				}
				NextPos = NextPos + 1;
			}
		}
		return MismatchedPosition;
	}

	public static NumberLiteralToken(TokenContext: GtTokenContext, SourceText: string, pos: number): number {
		var start: number = pos;
		var LastMatchedPos: number = pos;
		while(pos < SourceText.length) {
			if(!LibGreenTea.IsDigit(SourceText, pos)) {
				break;
			}
			pos += 1;
		}
		LastMatchedPos = pos;
		var ch: number = LibGreenTea.CharAt(SourceText, pos);
		if(ch != 46 && ch != 101 && ch != 69) {
			TokenContext.AddNewToken(LibGreenTea.SubString(SourceText, start, pos), 0, "$IntegerLiteral$");
			return pos;
		}
	    if(ch == 46) {
        	pos += 1;
			while(pos < SourceText.length) {
				if(!LibGreenTea.IsDigit(SourceText, pos)) {
					break;
				}
				pos += 1;
			}
	    }
	    ch = LibGreenTea.CharAt(SourceText, pos);
	    if(ch == 101 || ch == 69) {
	    	pos += 1;
		    ch = LibGreenTea.CharAt(SourceText, pos);
	        if(ch == 43 || ch == 45) {
	        	pos += 1;
			    ch = LibGreenTea.CharAt(SourceText, pos);
	        }
		    var saved: number = pos;
			while(pos < SourceText.length) {
				if(!LibGreenTea.IsDigit(SourceText, pos)) {
					break;
				}
				pos += 1;
			}
			if(saved == pos) {
				pos = LastMatchedPos;
			}
	    }
		TokenContext.AddNewToken(LibGreenTea.SubString(SourceText, start, pos), 0, "$FloatLiteral$");
		return pos;
	}

	public static CharLiteralToken(TokenContext: GtTokenContext, SourceText: string, pos: number): number {
		var start: number = pos;
		var prev: number = 92;
		pos = pos + 1; // eat "\'"
		while(pos < SourceText.length) {
			var ch: number = LibGreenTea.CharAt(SourceText, pos);
			if(ch == 92 && prev != 92) {
				TokenContext.AddNewToken(LibGreenTea.SubString(SourceText, start, (pos + 1)), QuotedTokenFlag, "$CharLiteral$");
				return pos + 1;
			}
			if(ch == 10) {
				TokenContext.ReportTokenError1(ErrorLevel, "expected ' to close the charctor literal", LibGreenTea.SubString(SourceText, start, pos));
				TokenContext.FoundLineFeed(1);
				return pos;
			}
			pos = pos + 1;
			prev = ch;
		}
		TokenContext.ReportTokenError1(ErrorLevel, "expected ' to close the charctor literal", LibGreenTea.SubString(SourceText, start, pos));
		return pos;
	}

	private static SkipBackSlashOrNewLineOrDoubleQuote( SourceText: string, pos: number): number {
		while(pos < SourceText.length) {
			var ch: number = LibGreenTea.CharAt(SourceText, pos);
			if(ch == 92 || ch == 10 || ch == 34) {
				return pos;
			}
			pos = pos + 1;
		}
		return pos;
	}

	public static StringLiteralToken(TokenContext: GtTokenContext, SourceText: string, pos: number): number {
		var start: number = pos;
		pos = pos + 1; // eat "\""
		while(pos < SourceText.length) {
			pos = KonohaGrammar.SkipBackSlashOrNewLineOrDoubleQuote(SourceText, pos);
			var ch: number = LibGreenTea.CharAt(SourceText, pos);
			if(ch == 92) {
				if(pos + 1 < SourceText.length) {
					var NextChar: number = LibGreenTea.CharAt(SourceText, pos + 1);
					if(NextChar == 117) {
						TokenContext.ReportTokenError1(ErrorLevel, "Unicode character escape sequences is not supported", LibGreenTea.SubString(SourceText, start, pos));
						return pos;
					}
				}
				pos = pos + 1;
			}
			if(ch == 34) {
				TokenContext.AddNewToken(LibGreenTea.SubString(SourceText, start, (pos + 1)), QuotedTokenFlag, "$StringLiteral$");
				return pos + 1;
			}
			if(ch == 10) {
				TokenContext.ReportTokenError1(ErrorLevel, "expected \" to close the string literal", LibGreenTea.SubString(SourceText, start, pos));
				TokenContext.FoundLineFeed(1);
				return pos;
			}
			pos = pos + 1;
		}
		TokenContext.ReportTokenError1(ErrorLevel, "expected \" to close the string literal", LibGreenTea.SubString(SourceText, start, pos));
		return pos;
	}

//	public static long StringLiteralToken_StringInterpolation(GtTokenContext TokenContext, String SourceText, long pos) {
//		#Local#long start = pos + 1;
//		#Local#long NextPos = start;
//		#Local#char prev = 34;
//		while(NextPos < SourceText.length()) {
//			#Local#char ch = LibGreenTea.CharAt(SourceText, NextPos);
//			if(ch == 36) {
//				#Local#long end = NextPos + 1;
//				#Local#char nextch = LibGreenTea.CharAt(SourceText, end);
//				if(nextch == 123) {
//					while(end < SourceText.length()) {
//						ch = LibGreenTea.CharAt(SourceText, end);
//						if(ch == 125) {
//							break;
//						}
//						end = end + 1;
//					}
//					#Local#String Expr = LibGreenTea.SubString(SourceText, (NextPos + 2), end);
//					#Local#GtTokenContext LocalContext = new GtTokenContext(TokenContext.TopLevelNameSpace, Expr, TokenContext.ParsingLine);
//					LocalContext.SkipEmptyStatement();
//
//					TokenContext.AddNewToken("\"" + LibGreenTea.SubString(SourceText, start, NextPos) + "\"", QuotedTokenFlag, "$StringLiteral$");
//					TokenContext.AddNewToken("+", 0, null);
//					while(LocalContext.HasNext()) {
//						#Local#GtToken NewToken = LocalContext.Next();
//						TokenContext.AddNewToken(NewToken.ParsedText, 0, null);
//					}
//					TokenContext.AddNewToken("+", 0, null);
//					end = end + 1;
//					start = end;
//					NextPos = end;
//					prev = ch;
//					if(ch == 34) {
//						TokenContext.AddNewToken("\"" + LibGreenTea.SubString(SourceText, start, NextPos) + "\"", QuotedTokenFlag, "$StringLiteral$");
//						return NextPos + 1;
//					}
//					continue;
//				}
//			}
//			if(ch == 34 && prev != 92) {
//				TokenContext.AddNewToken("\"" + LibGreenTea.SubString(SourceText, start, NextPos) + "\"", QuotedTokenFlag, "$StringLiteral$");
//				return NextPos + 1;
//			}
//			if(ch == 10) {
//				TokenContext.ReportTokenError(ErrorLevel, "expected \" to close the string literal", LibGreenTea.SubString(SourceText, start, NextPos));
//				TokenContext.FoundLineFeed(1);
//				return NextPos;
//			}
//			NextPos = NextPos + 1;
//			prev = ch;
//		}
//		TokenContext.ReportTokenError(ErrorLevel, "expected \" to close the string literal", LibGreenTea.SubString(SourceText, start, NextPos));
//		return NextPos;
//	}

	public static ParseTypeOf(NameSpace: GtNameSpace, TokenContext: GtTokenContext, LeftTree: GtSyntaxTree, Pattern: GtSyntaxPattern): GtSyntaxTree {
		var TypeOfTree: GtSyntaxTree = TokenContext.CreateMatchedSyntaxTree(NameSpace, Pattern, "typeof");
		TypeOfTree.SetMatchedTokenAt(NoWhere, NameSpace, TokenContext, "(", Required);
		TypeOfTree.SetMatchedPatternAt(UnaryTerm, NameSpace, TokenContext, "$Expression$", Required);
		TypeOfTree.SetMatchedTokenAt(NoWhere, NameSpace, TokenContext, ")", Required);
		if(!TypeOfTree.IsMismatchedOrError()) {
			var Gamma: GtTypeEnv = new GtTypeEnv(NameSpace);
			var ObjectNode: GtNode = TypeOfTree.TypeCheckAt(UnaryTerm, Gamma, Gamma.VarType, DefaultTypeCheckPolicy);
			if(ObjectNode.IsErrorNode()) {
				TypeOfTree.ToError(ObjectNode.Token);
			}
			else {
				TypeOfTree.ToConstTree(ObjectNode.Type);
				var TypeTree: GtSyntaxTree = TokenContext.ParsePatternAfter(NameSpace, TypeOfTree, "$TypeSuffix$", Optional);
				return (TypeTree == null) ? TypeOfTree : TypeTree;
			}
		}
		return TypeOfTree;
	}

	public static ParseTypeSuffix(NameSpace: GtNameSpace, TokenContext: GtTokenContext, TypeTree: GtSyntaxTree, Pattern: GtSyntaxPattern): GtSyntaxTree {
		var ParsedType: GtType = TypeTree.GetParsedType();
		if(ParsedType.IsGenericType()) {
			if(TokenContext.MatchToken("<")) {  // Generics
				var TypeList: Array<GtType> = new Array<GtType>();
				while(!TokenContext.StartsWithToken(">")) {
					if(TypeList.size() > 0 && !TokenContext.MatchToken(",")) {
						return null;
					}
					var ParamTypeTree: GtSyntaxTree = TokenContext.ParsePattern(NameSpace, "$Type$", Optional);
					if(ParamTypeTree == null) {
						return ParamTypeTree;
					}
					TypeList.add(ParamTypeTree.GetParsedType());
				}
				ParsedType = NameSpace.Context.GetGenericType(ParsedType, 0, TypeList, true);
			}
		}
		while(TokenContext.MatchToken("[")) {  // Array
			if(!TokenContext.MatchToken("]")) {
				return null;
			}
			ParsedType = NameSpace.Context.GetGenericType1(NameSpace.Context.ArrayType, ParsedType, true);
		}
		TypeTree.ToConstTree(ParsedType);
		return TypeTree;
	}

	// parser and type checker
	public static ParseType(NameSpace: GtNameSpace, TokenContext: GtTokenContext, LeftTree: GtSyntaxTree, Pattern: GtSyntaxPattern): GtSyntaxTree {
		if(TokenContext.MatchToken("typeof")) {
			return KonohaGrammar.ParseTypeOf(NameSpace, TokenContext, LeftTree, Pattern);
		}
		var Token: GtToken = TokenContext.Next();
		var ConstValue: Object = NameSpace.GetSymbol(Token.ParsedText);
		if(!(ConstValue instanceof GtType)) {
			return null;  // Not matched
		}
		var TypeTree: GtSyntaxTree = new GtSyntaxTree(Pattern, NameSpace, Token, ConstValue);
		var TypeSuffixTree: GtSyntaxTree = TokenContext.ParsePatternAfter(NameSpace, TypeTree, "$TypeSuffix$", Optional);
		return (TypeSuffixTree == null) ? TypeTree : TypeSuffixTree;
	}

	public static ParseConst(NameSpace: GtNameSpace, TokenContext: GtTokenContext, LeftTree: GtSyntaxTree, Pattern: GtSyntaxPattern): GtSyntaxTree {
		var Token: GtToken = TokenContext.Next();
		var ConstValue: Object = NameSpace.GetSymbol(Token.ParsedText);
		if(ConstValue != null) {
			return new GtSyntaxTree(Pattern, NameSpace, Token, ConstValue);
		}
		return null; // Not Matched
	}

	public static TypeConst(Gamma: GtTypeEnv, ParsedTree: GtSyntaxTree, ContextType: GtType): GtNode {
		if((typeof ParsedTree.ParsedValue == 'string' || ParsedTree.ParsedValue instanceof String)) { // FIXME IMIFU
			ParsedTree.ParsedValue = <string> ParsedTree.ParsedValue;
		}
		return Gamma.Generator.CreateConstNode(Gamma.Context.GuessType(ParsedTree.ParsedValue), ParsedTree, ParsedTree.ParsedValue);
	}

	public static ParseNull(NameSpace: GtNameSpace, TokenContext: GtTokenContext, LeftTree: GtSyntaxTree, Pattern: GtSyntaxPattern): GtSyntaxTree {
		return TokenContext.CreateMatchedSyntaxTree(NameSpace, Pattern, "null");
	}

	public static TypeNull(Gamma: GtTypeEnv, ParsedTree: GtSyntaxTree, ContextType: GtType): GtNode {
		var ThisType: GtType = ContextType;
		if(ThisType == Gamma.VarType) {
			ThisType = Gamma.AnyType;
		}
		if(ThisType.DefaultNullValue != null) {
			return Gamma.Generator.CreateConstNode(ThisType, ParsedTree, ThisType.DefaultNullValue);
		}
		return Gamma.Generator.CreateNullNode(ThisType, ParsedTree);
	}

	public static ParseSymbol(NameSpace: GtNameSpace, TokenContext: GtTokenContext, LeftTree: GtSyntaxTree, Pattern: GtSyntaxPattern): GtSyntaxTree {
		var TypeTree: GtSyntaxTree = TokenContext.ParsePattern(NameSpace, "$Type$", Optional);
		if(TypeTree != null) {
			var DeclTree: GtSyntaxTree = TokenContext.ParsePatternAfter(NameSpace, TypeTree, "$FuncDecl$", Optional);
			if(DeclTree != null) {
				return DeclTree;
			}
			DeclTree = TokenContext.ParsePatternAfter(NameSpace, TypeTree, "$VarDecl$", Optional);
			if(DeclTree != null) {
				return DeclTree;
			}
			TypeTree.Pattern = NameSpace.GetSyntaxPattern("$Const$");
			return TypeTree;
		}
		var Token: GtToken = TokenContext.Next();
		var VarTree: GtSyntaxTree = new GtSyntaxTree(NameSpace.GetSyntaxPattern("$Variable$"), NameSpace, Token, null);
		if(!LibGreenTea.IsVariableName(Token.ParsedText, 0)) {
			return TokenContext.ReportExpectedMessage(Token, "name", true);
		}
		return VarTree;
	}

	public static ParseVariable(NameSpace: GtNameSpace, TokenContext: GtTokenContext, LeftTree: GtSyntaxTree, Pattern: GtSyntaxPattern): GtSyntaxTree {
		var Token: GtToken = TokenContext.Next();
		if(LibGreenTea.IsVariableName(Token.ParsedText, 0)) {
			return new GtSyntaxTree(Pattern, NameSpace, Token, null);
		}
		return TokenContext.ReportExpectedMessage(Token, "name", true);
	}

	public static TypeVariable(Gamma: GtTypeEnv, ParsedTree: GtSyntaxTree, ContextType: GtType): GtNode {
		var Name: string = ParsedTree.KeyToken.ParsedText;
		var VariableInfo: GtVariableInfo = Gamma.LookupDeclaredVariable(Name);
		if(VariableInfo != null) {
			VariableInfo.Used();
			return Gamma.Generator.CreateLocalNode(VariableInfo.Type, ParsedTree, VariableInfo.NativeName);
		}
		var ConstValue: Object = <Object> ParsedTree.NameSpace.GetSymbol(Name);
		if(ConstValue != null) {
			return Gamma.Generator.CreateConstNode(Gamma.Context.GuessType(ConstValue), ParsedTree, ConstValue);
		}
		var Node: GtNode = Gamma.Generator.CreateLocalNode(Gamma.AnyType, ParsedTree, Name + Gamma.Generator.BlockComment("undefined"));
		return Gamma.ReportTypeResult(ParsedTree, Node, TypeErrorLevel, "undefined name: " + Name);
	}

	public static ParseVarDecl(NameSpace: GtNameSpace, TokenContext: GtTokenContext, LeftTree: GtSyntaxTree, Pattern: GtSyntaxPattern): GtSyntaxTree {
		var Tree: GtSyntaxTree = new GtSyntaxTree(Pattern, NameSpace, TokenContext.GetToken(), null);
		if(LeftTree == null) {
			Tree.SetMatchedPatternAt(VarDeclType, NameSpace, TokenContext, "$Type$", Required);
		}
		else {
			Tree.SetSyntaxTreeAt(VarDeclType, LeftTree);
		}
		Tree.SetMatchedPatternAt(VarDeclName, NameSpace, TokenContext, "$Variable$", Required);
		if(Tree.IsMismatchedOrError()) {
			return Tree;  // stopping to funcdecl operator
		}
		if(TokenContext.MatchToken("=")) {
			Tree.SetMatchedPatternAt(VarDeclValue, NameSpace, TokenContext, "$Expression$", Required);
		}
		while(TokenContext.MatchToken(",")) {
			var NextTree: GtSyntaxTree = new GtSyntaxTree(Pattern, NameSpace, Tree.KeyToken, null);
			NextTree.SetSyntaxTreeAt(VarDeclType, Tree.GetSyntaxTreeAt(VarDeclType));
			NextTree.SetMatchedPatternAt(VarDeclName, NameSpace, TokenContext, "$Variable$", Required);
			if(TokenContext.MatchToken("=")) {
				NextTree.SetMatchedPatternAt(VarDeclValue, NameSpace, TokenContext, "$Expression$", Required);
			}
			Tree = LinkTree(Tree, NextTree);
		}
		return Tree;
	}

	public static TypeVarDecl(Gamma: GtTypeEnv, ParsedTree: GtSyntaxTree, ContextType: GtType): GtNode {
		var VarFlag: number = KonohaGrammar.ParseVarFlag(0, ParsedTree.Annotation);
		var DeclType: GtType = ParsedTree.GetSyntaxTreeAt(VarDeclType).GetParsedType();
		var VariableName: string = ParsedTree.GetSyntaxTreeAt(VarDeclName).KeyToken.ParsedText;
		var InitValueNode: GtNode = null;
		if(ParsedTree.HasNodeAt(VarDeclValue)) {
			InitValueNode = ParsedTree.TypeCheckAt(VarDeclValue, Gamma, DeclType, DefaultTypeCheckPolicy);
			if(InitValueNode.IsErrorNode()) {
				return InitValueNode;
			}
		}
		if(UseLangStat) {
			Gamma.Context.Stat.VarDecl += 1;
		}/*EndOfStat*/
		if(DeclType.IsVarType()) {
			if(InitValueNode == null) {
				DeclType = Gamma.AnyType;
			}
			else {
				DeclType = InitValueNode.Type;
			}
			Gamma.ReportTypeInference(ParsedTree.KeyToken, VariableName, DeclType);
			if(UseLangStat) {
				Gamma.Context.Stat.VarDeclInfer += 1;
				if(DeclType.IsAnyType()) {
					Gamma.Context.Stat.VarDeclInferAny += 1;
				}
			}/*EndOfStat*/
		}
		if(UseLangStat) {
			if(DeclType.IsAnyType()) {
				Gamma.Context.Stat.VarDeclAny += 1;
			}
		}/*EndOfStat*/
		if(InitValueNode == null) {
			InitValueNode = Gamma.CreateDefaultValue(ParsedTree, DeclType);
		}
		var VarInfo: GtVariableInfo = Gamma.AppendDeclaredVariable(VarFlag, DeclType, VariableName, ParsedTree.GetSyntaxTreeAt(VarDeclName).KeyToken, InitValueNode.ToConstValue(false));
		var BlockNode: GtNode = TypeBlock(Gamma, ParsedTree.NextTree, Gamma.VoidType);
		ParsedTree.NextTree = null;
		return Gamma.Generator.CreateVarNode(DeclType, ParsedTree, DeclType, VarInfo.NativeName, InitValueNode, BlockNode);
	}

	// Parse And Type
	public static ParseIntegerLiteral(NameSpace: GtNameSpace, TokenContext: GtTokenContext, LeftTree: GtSyntaxTree, Pattern: GtSyntaxPattern): GtSyntaxTree {
		var Token: GtToken = TokenContext.Next();
		return new GtSyntaxTree(Pattern, NameSpace, Token, LibGreenTea.ParseInt(Token.ParsedText));
	}
	public static ParseFloatLiteral(NameSpace: GtNameSpace, TokenContext: GtTokenContext, LeftTree: GtSyntaxTree, Pattern: GtSyntaxPattern): GtSyntaxTree {
		var Token: GtToken = TokenContext.Next();
		return new GtSyntaxTree(Pattern, NameSpace, Token, LibGreenTea.ParseFloat(Token.ParsedText));
	}

	public static ParseStringLiteral(NameSpace: GtNameSpace, TokenContext: GtTokenContext, LeftTree: GtSyntaxTree, Pattern: GtSyntaxPattern): GtSyntaxTree {
		var Token: GtToken = TokenContext.Next();
		return new GtSyntaxTree(Pattern, NameSpace, Token, LibGreenTea.UnquoteString(Token.ParsedText));
	}

	public static ParseCharLiteral(NameSpace: GtNameSpace, TokenContext: GtTokenContext, LeftTree: GtSyntaxTree, Pattern: GtSyntaxPattern): GtSyntaxTree {
		var Token: GtToken = TokenContext.Next();
		var NewTree: GtSyntaxTree = new GtSyntaxTree(Pattern, NameSpace, Token, LibGreenTea.UnquoteString(Token.ParsedText));
		return NewTree;
	}

	public static TypeCharLiteral(Gamma: GtTypeEnv, ParsedTree: GtSyntaxTree, ContextType: GtType): GtNode {
		var Text: string = ParsedTree.KeyToken.ParsedText;
		if(Text.length == 3/*65*/) {
			var ch: number = LibGreenTea.CharAt(Text, 1);
			var Value: Object = ch;
			ParsedTree.ParsedValue = LibGreenTea.ParseInt(Value.toString());
		}
		else if(Text.length == 4/*10*/) {
			var ch: number = LibGreenTea.CharAt(Text, 2);
			if(LibGreenTea.CharAt(Text, 1) == 92) {
				switch(ch) {
				case 92: ch = 92; break;
				case 92: ch = 92; break;
				case 98:  ch = 92; break;
				case 102:  ch = 92; break;
				case 110:  ch = 10; break;
				case 114:  ch = 92; break;
				case 116:  ch = 9; break;
				default:   ch = -1;
				}
				if(ch >= 0) {
					var Value: Object = ch;
					ParsedTree.ParsedValue = LibGreenTea.ParseInt(Value.toString());
				}
			}
		}
		return KonohaGrammar.TypeConst(Gamma, ParsedTree, ContextType);
	}

	public static ParseExpression(NameSpace: GtNameSpace, TokenContext: GtTokenContext, LeftTree: GtSyntaxTree, Pattern: GtSyntaxPattern): GtSyntaxTree {
		//return GreenTeaUtils.ParseExpression(NameSpace, TokenContext, false#COMMENT5#);
		Pattern = TokenContext.GetFirstPattern(NameSpace);
		LeftTree = ApplySyntaxPattern(NameSpace, TokenContext, LeftTree, Pattern);
		while(!IsMismatchedOrError(LeftTree)) {
			var ExtendedPattern: GtSyntaxPattern = TokenContext.GetExtendedPattern(NameSpace);
			if(ExtendedPattern == null) {
				break;
			}
			LeftTree = ApplySyntaxPattern(NameSpace, TokenContext, LeftTree, ExtendedPattern);
		}
		return LeftTree;
	}

	public static ParseSuffixExpression(NameSpace: GtNameSpace, TokenContext: GtTokenContext, LeftTree: GtSyntaxTree, Pattern: GtSyntaxPattern): GtSyntaxTree {
		Pattern = TokenContext.GetFirstPattern(NameSpace);
		LeftTree = ApplySyntaxPattern(NameSpace, TokenContext, LeftTree, Pattern);
		while(!IsMismatchedOrError(LeftTree)) {
			var ExtendedPattern: GtSyntaxPattern = TokenContext.GetExtendedPattern(NameSpace);
			if(ExtendedPattern == null || ExtendedPattern.IsBinaryOperator()) {
				break;
			}
			LeftTree = ApplySyntaxPattern(NameSpace, TokenContext, LeftTree, ExtendedPattern);
		}
		return LeftTree;
	}

	public static ParseUnary(NameSpace: GtNameSpace, TokenContext: GtTokenContext, LeftTree: GtSyntaxTree, Pattern: GtSyntaxPattern): GtSyntaxTree {
		var Token: GtToken = TokenContext.Next();
		var Tree: GtSyntaxTree = new GtSyntaxTree(Pattern, NameSpace, Token, null);
		Tree.SetMatchedPatternAt(UnaryTerm, NameSpace, TokenContext, "$SuffixExpression$", Required);
		return Tree;
	}

	public static TypeUnary(Gamma: GtTypeEnv, ParsedTree: GtSyntaxTree, ContextType: GtType): GtNode {
		var ExprNode: GtNode  = ParsedTree.TypeCheckAt(UnaryTerm, Gamma, Gamma.VarType, DefaultTypeCheckPolicy);
		if(ExprNode.IsErrorNode()) {
			return ExprNode;
		}
		var BaseType: GtType = ExprNode.Type;
		var ReturnType: GtType = Gamma.AnyType;
		var OperatorSymbol: string = ParsedTree.KeyToken.ParsedText;
		var PolyFunc: GtPolyFunc = ParsedTree.NameSpace.GetMethod(BaseType, FuncSymbol(OperatorSymbol), true);
		var ResolvedFunc: GtFunc = PolyFunc.ResolveUnaryMethod(Gamma, BaseType);
		if(ResolvedFunc == null) {
			Gamma.Context.ReportError(TypeErrorLevel, ParsedTree.KeyToken, "mismatched operators: " + PolyFunc);
		}
		else {
			Gamma.CheckFunc("operator", ResolvedFunc, ParsedTree.KeyToken);
			ReturnType = ResolvedFunc.GetReturnType();
		}
		var UnaryNode: GtNode =  Gamma.Generator.CreateUnaryNode(ReturnType, ParsedTree, ResolvedFunc, ExprNode);
		if(ResolvedFunc == null && !BaseType.IsDynamic()) {
			return Gamma.ReportTypeResult(ParsedTree, UnaryNode, TypeErrorLevel, "undefined operator: "+ OperatorSymbol + " of " + BaseType);
		}
		return UnaryNode;
	}

	private static RightJoin(NameSpace: GtNameSpace, LeftTree: GtSyntaxTree, Pattern: GtSyntaxPattern, OperatorToken: GtToken, RightTree: GtSyntaxTree): GtSyntaxTree {
		var RightLeft: GtSyntaxTree = RightTree.GetSyntaxTreeAt(LeftHandTerm);
		if(RightLeft.Pattern.IsBinaryOperator() && Pattern.IsRightJoin(RightLeft.Pattern)) {
			RightTree.SetSyntaxTreeAt(LeftHandTerm, KonohaGrammar.RightJoin(NameSpace, LeftTree, Pattern, OperatorToken, RightLeft));
		}
		else {
			var NewTree: GtSyntaxTree = new GtSyntaxTree(Pattern, NameSpace, OperatorToken, null);
			NewTree.SetSyntaxTreeAt(LeftHandTerm, LeftTree);
			NewTree.SetSyntaxTreeAt(RightHandTerm, RightLeft);
			RightTree.SetSyntaxTreeAt(LeftHandTerm, NewTree);
		}
		return RightTree;
	}

	public static ParseBinary(NameSpace: GtNameSpace, TokenContext: GtTokenContext, LeftTree: GtSyntaxTree, Pattern: GtSyntaxPattern): GtSyntaxTree {
		var OperatorToken: GtToken = TokenContext.Next();
		var RightTree: GtSyntaxTree = TokenContext.ParsePattern(NameSpace, "$Expression$", Required);
		if(IsMismatchedOrError(RightTree)) {
			return RightTree;
		}
		//System.err.println("left=" + Pattern.SyntaxFlag + ", right=" + RightTree.Pattern.SyntaxFlag + ", binary?" +  RightTree.Pattern.IsBinaryOperator() + RightTree.Pattern);
		if(RightTree.Pattern.IsBinaryOperator() && Pattern.IsRightJoin(RightTree.Pattern)) {
			return KonohaGrammar.RightJoin(NameSpace, LeftTree, Pattern, OperatorToken, RightTree);
		}
		// LeftJoin
		var NewTree: GtSyntaxTree = new GtSyntaxTree(Pattern, NameSpace, OperatorToken, null);
		NewTree.SetSyntaxTreeAt(LeftHandTerm, LeftTree);
		NewTree.SetSyntaxTreeAt(RightHandTerm, RightTree);
		if(RightTree.NextTree != null) {  // necesarry; don't remove
			LinkTree(NewTree, RightTree.NextTree);
			RightTree.NextTree = null;
		}
		return NewTree;
	}

	public static TypeBinary(Gamma: GtTypeEnv, ParsedTree: GtSyntaxTree, ContextType: GtType): GtNode {
		var LeftNode: GtNode  = ParsedTree.TypeCheckAt(LeftHandTerm, Gamma, Gamma.VarType, DefaultTypeCheckPolicy);
		if(!LeftNode.IsErrorNode()) {
			var BaseType: GtType = LeftNode.Type;
			var OperatorSymbol: string = ParsedTree.KeyToken.ParsedText;
			var PolyFunc: GtPolyFunc = ParsedTree.NameSpace.GetMethod(BaseType, FuncSymbol(OperatorSymbol), true);
			var ParamList: Array<GtNode> = new Array<GtNode>();
			ParamList.add(LeftNode);
			var ResolvedFunc: GtResolvedFunc = PolyFunc.ResolveFunc(Gamma, ParsedTree, 1, ParamList);
			if(ResolvedFunc.Func == null) {
				Gamma.Context.ReportError(TypeErrorLevel, ParsedTree.KeyToken, "mismatched operators: " + PolyFunc);
			}
			else {
				Gamma.CheckFunc("operator", ResolvedFunc.Func, ParsedTree.KeyToken);
			}
			var BinaryNode: GtNode =  Gamma.Generator.CreateBinaryNode(ResolvedFunc.ReturnType, ParsedTree, ResolvedFunc.Func, LeftNode, ParamList.get(1));
			if(ResolvedFunc.Func == null && !BaseType.IsDynamic()) {
				return Gamma.ReportTypeResult(ParsedTree, BinaryNode, TypeErrorLevel, "undefined operator: "+ OperatorSymbol + " of " + LeftNode.Type);
			}
			return BinaryNode;
		}
		return LeftNode;
	}

	public static ParseTrinary(NameSpace: GtNameSpace, TokenContext: GtTokenContext, LeftTree: GtSyntaxTree, Pattern: GtSyntaxPattern): GtSyntaxTree {
		var TrinaryTree: GtSyntaxTree = TokenContext.CreateMatchedSyntaxTree(NameSpace, Pattern, "?");
		TrinaryTree.SetSyntaxTreeAt(IfCond, LeftTree);
		TrinaryTree.SetMatchedPatternAt(IfThen, NameSpace, TokenContext, "$Expression$", Required);
		TrinaryTree.SetMatchedTokenAt(NoWhere, NameSpace, TokenContext, ":", Required);
		TrinaryTree.SetMatchedPatternAt(IfElse, NameSpace, TokenContext, "$Expression$", Required);
		return TrinaryTree;
	}

	public static TypeTrinary(Gamma: GtTypeEnv, ParsedTree: GtSyntaxTree, ContextType: GtType): GtNode {
		var CondNode: GtNode = ParsedTree.TypeCheckAt(IfCond, Gamma, Gamma.BooleanType, DefaultTypeCheckPolicy);
		var ThenNode: GtNode = ParsedTree.TypeCheckAt(IfThen, Gamma, Gamma.VarType, DefaultTypeCheckPolicy);
		if(ThenNode.IsErrorNode()) {
			return ThenNode;
		}
		var ElseNode: GtNode = ParsedTree.TypeCheckAt(IfElse, Gamma, ThenNode.Type, DefaultTypeCheckPolicy);
		return Gamma.Generator.CreateTrinaryNode(ThenNode.Type, ParsedTree, CondNode, ThenNode, ElseNode);
	}

	// PatternName: "("
	public static ParseGroup(NameSpace: GtNameSpace, TokenContext: GtTokenContext, LeftTree: GtSyntaxTree, Pattern: GtSyntaxPattern): GtSyntaxTree {
		var GroupTree: GtSyntaxTree = TokenContext.CreateSyntaxTree(NameSpace, Pattern, null);
		GroupTree.SetMatchedTokenAt(KeyTokenIndex, NameSpace, TokenContext, "(", Required);
		var ParseFlag: number = TokenContext.SetSkipIndent(true);
		GroupTree.AppendMatchedPattern(NameSpace, TokenContext, "$Expression$", Required);
		GroupTree.SetMatchedTokenAt(NoWhere, NameSpace, TokenContext, ")", Required);
		TokenContext.SetRememberFlag(ParseFlag);
		return GroupTree;
	}

	public static TypeGroup(Gamma: GtTypeEnv, ParsedTree: GtSyntaxTree, ContextType: GtType): GtNode {
		return ParsedTree.TypeCheckAt(UnaryTerm, Gamma, ContextType, DefaultTypeCheckPolicy);
	}

	// PatternName: "(" "to" $Type$ ")"
	public static ParseCast(NameSpace: GtNameSpace, TokenContext: GtTokenContext, LeftTree: GtSyntaxTree, Pattern: GtSyntaxPattern): GtSyntaxTree {
		var FirstToken: GtToken = TokenContext.Next(); // skip the first token
		var CastTree: GtSyntaxTree = null;
		if(TokenContext.MatchToken("to")) {
			CastTree = new GtSyntaxTree(Pattern, NameSpace, TokenContext.GetBeforeToken(), null);
		}
		else {
			CastTree = new GtSyntaxTree(Pattern, NameSpace, FirstToken, null);
		}
		CastTree.SetMatchedPatternAt(LeftHandTerm, NameSpace, TokenContext, "$Type$", Required);
		CastTree.SetMatchedTokenAt(NoWhere, NameSpace, TokenContext, ")", Required);
		CastTree.SetMatchedPatternAt(RightHandTerm, NameSpace, TokenContext, "$SuffixExpression$", Required);
		return CastTree;
	}

	public static TypeCast(Gamma: GtTypeEnv, ParsedTree: GtSyntaxTree, ContextType: GtType): GtNode {
		var CastType: GtType = ParsedTree.GetSyntaxTreeAt(LeftHandTerm).GetParsedType();
		var TypeCheckPolicy: number = CastPolicy;
		return ParsedTree.TypeCheckAt(RightHandTerm, Gamma, CastType, TypeCheckPolicy);
	}

	public static ParseGetter(NameSpace: GtNameSpace, TokenContext: GtTokenContext, LeftTree: GtSyntaxTree, Pattern: GtSyntaxPattern): GtSyntaxTree {
		TokenContext.MatchToken(".");
		var Token: GtToken = TokenContext.Next();
		if(!Token.IsNameSymbol()) {
			return TokenContext.ReportExpectedMessage(Token, "field name", true);		
		}
		var NewTree: GtSyntaxTree = new GtSyntaxTree(Pattern, NameSpace, Token, null);
		NewTree.AppendParsedTree2(LeftTree);
		if(TokenContext.MatchToken("=")) {
			NewTree.Pattern = NameSpace.GetSyntaxPattern("$Setter$");
			NewTree.SetMatchedPatternAt(RightHandTerm, NameSpace, TokenContext, "$Expression$", Required);
		}
		return NewTree;
	}

	public static TypeGetter(Gamma: GtTypeEnv, ParsedTree: GtSyntaxTree, ContextType: GtType): GtNode {
		var Name: string = ParsedTree.KeyToken.ParsedText;
		var ObjectNode: GtNode = ParsedTree.TypeCheckAt(UnaryTerm, Gamma, Gamma.VarType, DefaultTypeCheckPolicy);
		if(ObjectNode.IsErrorNode()) {
			return ObjectNode;
		}
		// 1. To start, check class const such as Math.Pi if base is a type value
		var TypeName: string = ObjectNode.Type.ShortName;
		if(ObjectNode instanceof GtConstNode && ObjectNode.Type.IsTypeType()) {
			var ObjectType: GtType = <GtType>(<GtConstNode>ObjectNode).ConstValue;
			var ConstValue: Object = ParsedTree.NameSpace.GetClassStaticSymbol(ObjectType, Name, true);
//			if(ConstValue instanceof GreenTeaEnum) {
//				if(ContextType.IsStringType()) {
//					ConstValue = ((#Cast#GreenTeaEnum)ConstValue).EnumSymbol;
//				}
//				else {
//					ConstValue = ((#Cast#GreenTeaEnum)ConstValue).EnumValue;
//				}
//			}
			if(ConstValue != null) {
				return Gamma.Generator.CreateConstNode(Gamma.Context.GuessType(ConstValue), ParsedTree, ConstValue);
			}
			TypeName = ObjectType.ShortName;
		}
		// 2. find Class method
		var PolyFunc: GtPolyFunc = ParsedTree.NameSpace.GetMethod(ObjectNode.Type, Name, true);
		if(PolyFunc.FuncList.size() > 0 && ContextType == Gamma.FuncType) {
			var FirstFunc: GtFunc = PolyFunc.FuncList.get(0);
			return Gamma.Generator.CreateGetterNode(ContextType, ParsedTree, FirstFunc, ObjectNode);
		}
		// 3. find object field
		var GetterFunc: GtFunc = ParsedTree.NameSpace.GetGetterFunc(ObjectNode.Type, Name, true);
		var ReturnType: GtType = (GetterFunc != null) ? GetterFunc.GetReturnType() : Gamma.AnyType;
		var Node: GtNode = Gamma.Generator.CreateGetterNode(ReturnType, ParsedTree, GetterFunc, ObjectNode);
		if(GetterFunc == null) {
			if(!ObjectNode.Type.IsDynamic() && ContextType != Gamma.FuncType) {
				return Gamma.ReportTypeResult(ParsedTree, Node, TypeErrorLevel, "undefined name: " + Name + " of " + TypeName);
			}
		}
		return Node;
	}

	public static TypeSetter(Gamma: GtTypeEnv, ParsedTree: GtSyntaxTree, ContextType: GtType): GtNode {
		var Name: string = ParsedTree.KeyToken.ParsedText;
		var ObjectNode: GtNode = ParsedTree.TypeCheckAt(UnaryTerm, Gamma, Gamma.VarType, DefaultTypeCheckPolicy);
		if(ObjectNode.IsErrorNode()) {
			return ObjectNode;
		}
		var SetterFunc: GtFunc = ParsedTree.NameSpace.GetSetterFunc(ObjectNode.Type, Name, true);
		if(SetterFunc != null) {
			var ValueType: GtType = SetterFunc.GetFuncParamType(1);
			var ValueNode: GtNode = ParsedTree.TypeCheckAt(RightHandTerm, Gamma, ValueType, DefaultTypeCheckPolicy);
			return Gamma.Generator.CreateSetterNode(Gamma.VoidType, ParsedTree, SetterFunc, ObjectNode, ValueNode);
		}
		else if(ObjectNode.Type.IsDynamic()) {
			var ValueNode: GtNode = ParsedTree.TypeCheckAt(RightHandTerm, Gamma, Gamma.VoidType, DefaultTypeCheckPolicy);
			return Gamma.Generator.CreateSetterNode(Gamma.VoidType, ParsedTree, SetterFunc, ObjectNode, ValueNode);			
		}
		else {
			return Gamma.CreateSyntaxErrorNode(ParsedTree, "undefined name: " + Name + " of " + ObjectNode.Type);
		}
	}

	public static ParseDefined(NameSpace: GtNameSpace, TokenContext: GtTokenContext, LeftTree: GtSyntaxTree, Pattern: GtSyntaxPattern): GtSyntaxTree {
		var DefinedTree: GtSyntaxTree = TokenContext.CreateMatchedSyntaxTree(NameSpace, Pattern, "defined");
		DefinedTree.SetMatchedTokenAt(NoWhere, NameSpace, TokenContext, "(", Required);
		DefinedTree.SetMatchedPatternAt(UnaryTerm, NameSpace, TokenContext, "$Expression$", Required);
		DefinedTree.SetMatchedTokenAt(NoWhere, NameSpace, TokenContext, ")", Required);
		return DefinedTree;
	}

	public static TypeDefined(Gamma: GtTypeEnv, ParsedTree: GtSyntaxTree, Type: GtType): GtNode {
		Gamma.Context.SetNoErrorReport(true);
		var ObjectNode: GtNode = ParsedTree.TypeCheckAt(UnaryTerm, Gamma, Gamma.VarType, DefaultTypeCheckPolicy);
		Gamma.Context.SetNoErrorReport(false);
		return Gamma.Generator.CreateConstNode(Gamma.BooleanType, ParsedTree, (ObjectNode instanceof GtConstNode));
	}

	public static ParseApply(NameSpace: GtNameSpace, TokenContext: GtTokenContext, LeftTree: GtSyntaxTree, Pattern: GtSyntaxPattern): GtSyntaxTree {
		var ParseFlag: number = TokenContext.SetSkipIndent(true);
		var FuncTree: GtSyntaxTree = TokenContext.CreateSyntaxTree(NameSpace, Pattern, null);
		FuncTree.SetMatchedTokenAt(KeyTokenIndex, NameSpace, TokenContext, "(", Required);
		FuncTree.AppendParsedTree2(LeftTree);
		if(!TokenContext.MatchToken(")")) {
			while(!FuncTree.IsMismatchedOrError()) {
				FuncTree.AppendMatchedPattern(NameSpace, TokenContext, "$Expression$", Required);
				if(TokenContext.MatchToken(")")) {
					break;
				}
				FuncTree.SetMatchedTokenAt(NoWhere, NameSpace, TokenContext, ",", Required);
			}
		}
		TokenContext.SetRememberFlag(ParseFlag);
		return FuncTree;
	}

	public static TypeNewNode(Gamma: GtTypeEnv, ParsedTree: GtSyntaxTree, ClassToken: GtToken, ClassType: GtType, ContextType: GtType): GtNode {
		if(ClassType.IsVarType()) {  /* constructor */
			ClassType = ContextType;
			if(ClassType.IsVarType()) {
				return Gamma.CreateSyntaxErrorNode(ParsedTree, "ambigious constructor: " + ClassToken);
			}
			Gamma.ReportTypeInference(ClassToken, "constructor", ClassType);
		}
		if(ClassType.IsAbstract()) {
			return Gamma.CreateSyntaxErrorNode(ParsedTree, "type is abstract");
		}
		var PolyFunc: GtPolyFunc = ParsedTree.NameSpace.GetConstructorFunc(/*GtFunc*/ClassType);
		var ParamList: Array<GtNode> = new Array<GtNode>();
		if(ClassType.IsNative()) {
			var ResolvedFunc: GtResolvedFunc = PolyFunc.ResolveFunc(Gamma, ParsedTree, 1, ParamList);
			if(ResolvedFunc.ErrorNode != null) {
				return ResolvedFunc.ErrorNode;
			}
			if(ResolvedFunc.Func != null && ResolvedFunc.Func.Is(NativeFunc)) {
				Gamma.CheckFunc("constructor", ResolvedFunc.Func, ParsedTree.KeyToken);
				return Gamma.Generator.CreateConstructorNode(ClassType, ParsedTree, ResolvedFunc.Func, ParamList);
			}
		}
		else {
			var NewNode: GtNode = Gamma.Generator.CreateNewNode(ClassType, ParsedTree);
			ParamList.add(NewNode);
			var ResolvedFunc: GtResolvedFunc = PolyFunc.ResolveFunc(Gamma, ParsedTree, 1, ParamList);
			if(ResolvedFunc.ErrorNode != null) {
				return ResolvedFunc.ErrorNode;
			}
			if(ResolvedFunc.Func == null) {
				if(ParsedTree.SubTreeList.size() == 1) {
					return NewNode;
				}
			}
			else {
				Gamma.CheckFunc("constructor", ResolvedFunc.Func, ParsedTree.KeyToken);
				var Node: GtNode = Gamma.Generator.CreateApplyNode(ResolvedFunc.ReturnType, ParsedTree, ResolvedFunc.Func);
				Node.Append(Gamma.Generator.CreateConstNode(Gamma.VarType, ParsedTree, ResolvedFunc.Func));
				Node.AppendNodeList(0, ParamList);
				return Node;
			}
		}
		return PolyFunc.ReportTypeError(Gamma, ParsedTree, ClassType, "constructor");
	}
	
	public static TypeMethodCall(Gamma: GtTypeEnv, ParsedTree: GtSyntaxTree, RecvNode: GtNode, MethodName: string): GtNode {
		if(!RecvNode.IsErrorNode()) {
			var PolyFunc: GtPolyFunc = ParsedTree.NameSpace.GetMethod(RecvNode.Type, FuncSymbol(MethodName), true);
			//System.err.println("polyfunc: " + PolyFunc);
			var ParamList: Array<GtNode> = new Array<GtNode>();
			ParamList.add(RecvNode);
			var ResolvedFunc: GtResolvedFunc = PolyFunc.ResolveFunc(Gamma, ParsedTree, 1, ParamList);
			if(ResolvedFunc.ErrorNode != null) {
				return ResolvedFunc.ErrorNode;
			}
			if(ResolvedFunc.Func == null) {
				if(LibGreenTea.EqualsString(MethodName, "()")) {
					return Gamma.CreateSyntaxErrorNode(ParsedTree, RecvNode.Type + " is not applicapable");
				}
				else {
					return PolyFunc.ReportTypeError(Gamma, ParsedTree, RecvNode.Type, MethodName);
				}
			}
			Gamma.CheckFunc("method", ResolvedFunc.Func, ParsedTree.KeyToken);
			var Node: GtNode = Gamma.Generator.CreateApplyNode(ResolvedFunc.ReturnType, ParsedTree, ResolvedFunc.Func);
			Node.Append(Gamma.Generator.CreateConstNode(Gamma.VarType, ParsedTree, ResolvedFunc.Func));
			Node.AppendNodeList(0, ParamList);
			return Node;
		}
		return RecvNode;
	}

	public static TypePolyFunc(Gamma: GtTypeEnv, ParsedTree: GtSyntaxTree, FuncNode: GtConstNode, PolyFunc: GtPolyFunc): GtNode {
		var ParamList: Array<GtNode> = new Array<GtNode>();
		var ResolvedFunc: GtResolvedFunc = PolyFunc.ResolveFunc(Gamma, ParsedTree, 1, ParamList);
		if(ResolvedFunc.ErrorNode != null) {
			return ResolvedFunc.ErrorNode;
		}
		if(ResolvedFunc.Func != null) {
			// reset ConstValue as if non-polymorphic function were found
			FuncNode.ConstValue = ResolvedFunc.Func;
			FuncNode.Type = ResolvedFunc.Func.GetFuncType();
		}
		Gamma.CheckFunc("function", ResolvedFunc.Func, ParsedTree.KeyToken);
		var Node: GtNode = Gamma.Generator.CreateApplyNode(ResolvedFunc.ReturnType, ParsedTree, ResolvedFunc.Func);
		Node.Append(FuncNode);
		Node.AppendNodeList(0, ParamList);
		return Node;
	}
	
	public static TypeApply(Gamma: GtTypeEnv, ParsedTree: GtSyntaxTree, ContextType: GtType): GtNode {
		var FuncNode: GtNode = ParsedTree.TypeCheckAt(0, Gamma, Gamma.FuncType, NoCheckPolicy);
		if(FuncNode.IsErrorNode()) {
			return FuncNode;
		}
		if(FuncNode instanceof GtGetterNode) { /* Func style .. o.f x, y, .. */
			var FuncName: string = FuncNode.Token.ParsedText;
			var BaseNode: GtNode = (<GtGetterNode>FuncNode).ExprNode;
			return KonohaGrammar.TypeMethodCall(Gamma, ParsedTree, BaseNode, FuncName);
		}
		if(FuncNode instanceof GtConstNode) { /* static */
			var Func: Object = (<GtConstNode>FuncNode).ConstValue;
			if(Func instanceof GtType) {  // constructor;
				return KonohaGrammar.TypeNewNode(Gamma, ParsedTree, FuncNode.Token, <GtType>Func, ContextType);
			}
			else if(Func instanceof GtFunc) {
				return KonohaGrammar.TypePolyFunc(Gamma, ParsedTree, (<GtConstNode>FuncNode), new GtPolyFunc(null).Append(<GtFunc>Func, null));
			}
			else if(Func instanceof GtPolyFunc) {
				return KonohaGrammar.TypePolyFunc(Gamma, ParsedTree, (<GtConstNode>FuncNode), <GtPolyFunc>Func);
			}
		}
//		#Local#GtType ReturnType = Gamma.AnyType;
		if(FuncNode.Type.IsFuncType()) {
//			#Local#GtType FuncType = FuncNode.Type;
//			LibGreenTea.Assert(LibGreenTea.ListSize(NodeList) + LibGreenTea.ListSize(ParsedTree.SubTreeList) - TreeIndex == FuncType.TypeParams.length);
//			while(TreeIndex < LibGreenTea.ListSize(ParsedTree.SubTreeList)) {
//				#Local#GtNode Node = ParsedTree.TypeCheckAt(TreeIndex, Gamma, FuncType.TypeParams[TreeIndex], DefaultTypeCheckPolicy);
//				if(Node.IsError()) {
//					return Node;
//				}
//				GreenTeaUtils.AppendTypedNode(NodeList, Node);
//				TreeIndex = TreeIndex + 1;
//			}
//			ReturnType = FuncType.TypeParams[0];			
		}
//		if(FuncNode.Type == Gamma.AnyType) {
//			while(TreeIndex < LibGreenTea.ListSize(ParsedTree.SubTreeList)) {
//				#Local#GtNode Node = ParsedTree.TypeCheckAt(TreeIndex, Gamma, Gamma.VarType, DefaultTypeCheckPolicy);
//				if(Node.IsError()) {
//					return Node;
//				}
//				GreenTeaUtils.AppendTypedNode(NodeList, Node);
//				TreeIndex = TreeIndex + 1;
//			}
//		}
//		else {
		return KonohaGrammar.TypeMethodCall(Gamma, ParsedTree, FuncNode, "()");
//		}
	}

	public static ParseNot(NameSpace: GtNameSpace, TokenContext: GtTokenContext, LeftTree: GtSyntaxTree, Pattern: GtSyntaxPattern): GtSyntaxTree {
		var Tree: GtSyntaxTree = new GtSyntaxTree(Pattern, NameSpace, TokenContext.Next(), null);
		Tree.SetMatchedPatternAt(UnaryTerm, NameSpace, TokenContext, "$SuffixExpression$", Required);
		return Tree;
	}

	public static TypeNot(Gamma: GtTypeEnv, ParsedTree: GtSyntaxTree, ContextType: GtType): GtNode {
		var ExprNode: GtNode  = ParsedTree.TypeCheckAt(UnaryTerm, Gamma, Gamma.BooleanType, DefaultTypeCheckPolicy);
		if(ExprNode.IsErrorNode()) {
			return ExprNode;
		}
		var OperatorSymbol: string = ParsedTree.KeyToken.ParsedText;
		var PolyFunc: GtPolyFunc = ParsedTree.NameSpace.GetMethod(ExprNode.Type, FuncSymbol(OperatorSymbol), true);
		var ResolvedFunc: GtFunc = PolyFunc.ResolveUnaryMethod(Gamma, Gamma.BooleanType);
		LibGreenTea.Assert(ResolvedFunc != null);
		return Gamma.Generator.CreateUnaryNode(Gamma.BooleanType, ParsedTree, ResolvedFunc, ExprNode);
	}

	public static TypeAnd(Gamma: GtTypeEnv, ParsedTree: GtSyntaxTree, ContextType: GtType): GtNode {
		var LeftNode: GtNode = ParsedTree.TypeCheckAt(LeftHandTerm, Gamma, Gamma.BooleanType, DefaultTypeCheckPolicy);
		var RightNode: GtNode = ParsedTree.TypeCheckAt(RightHandTerm, Gamma, Gamma.BooleanType, DefaultTypeCheckPolicy);
		return Gamma.Generator.CreateAndNode(Gamma.BooleanType, ParsedTree, LeftNode, RightNode);
	}

	public static TypeOr(Gamma: GtTypeEnv, ParsedTree: GtSyntaxTree, ContextType: GtType): GtNode {
		var LeftNode: GtNode = ParsedTree.TypeCheckAt(LeftHandTerm, Gamma, Gamma.BooleanType, DefaultTypeCheckPolicy);
		var RightNode: GtNode = ParsedTree.TypeCheckAt(RightHandTerm, Gamma, Gamma.BooleanType, DefaultTypeCheckPolicy);
		return Gamma.Generator.CreateOrNode(Gamma.BooleanType, ParsedTree, LeftNode, RightNode);
	}

	public static TypeInstanceOf(Gamma: GtTypeEnv, ParsedTree: GtSyntaxTree, ContextType: GtType): GtNode {
		var LeftNode: GtNode = ParsedTree.TypeCheckAt(LeftHandTerm, Gamma, Gamma.VarType, DefaultTypeCheckPolicy);
		var GivenType: GtType = ParsedTree.GetSyntaxTreeAt(RightHandTerm).GetParsedType();
		if(GivenType == null) {
			return Gamma.CreateSyntaxErrorNode(ParsedTree,  "type is expected in " + ParsedTree.KeyToken);
		}
		return Gamma.Generator.CreateInstanceOfNode(Gamma.BooleanType, ParsedTree, LeftNode, GivenType);
	}

	public static TypeAssign(Gamma: GtTypeEnv, ParsedTree: GtSyntaxTree, ContextType: GtType): GtNode {
		var LeftNode: GtNode = ParsedTree.TypeCheckAt(LeftHandTerm, Gamma, Gamma.VarType, DefaultTypeCheckPolicy);
		if(LeftNode.IsErrorNode()) {
			return LeftNode;
		}
		if(LeftNode instanceof GtLocalNode) {
			var RightNode: GtNode = ParsedTree.TypeCheckAt(RightHandTerm, Gamma, LeftNode.Type, DefaultTypeCheckPolicy);
			return Gamma.Generator.CreateAssignNode(LeftNode.Type, ParsedTree, LeftNode, RightNode);
		}
		return Gamma.CreateSyntaxErrorNode(ParsedTree, "the left-hand side of an assignment must be variable");
	}

	public static TypeSelfAssign(Gamma: GtTypeEnv, ParsedTree: GtSyntaxTree, ContextType: GtType): GtNode {
		var LeftNode: GtNode = ParsedTree.TypeCheckAt(LeftHandTerm, Gamma, Gamma.VarType, DefaultTypeCheckPolicy);
		if(LeftNode.IsErrorNode()) {
			return LeftNode;
		}
		if(!(LeftNode instanceof GtLocalNode || LeftNode instanceof GtGetterNode || LeftNode instanceof GtIndexerNode)) {
			return Gamma.CreateSyntaxErrorNode(ParsedTree, "the left-hand side of an assignment must be variable");
		}
		var RightNode: GtNode = ParsedTree.TypeCheckAt(RightHandTerm, Gamma, LeftNode.Type, DefaultTypeCheckPolicy);
		var OperatorSymbol: string = ParsedTree.KeyToken.ParsedText;
		OperatorSymbol = OperatorSymbol.substring(0, OperatorSymbol.length - 1);
		var Func: GtFunc = null;
		var PolyFunc: GtPolyFunc = ParsedTree.NameSpace.GetMethod(LeftNode.Type, FuncSymbol(OperatorSymbol), true);
		var ParamList: Array<GtNode> = new Array<GtNode>();
		ParamList.add(LeftNode);
		var ResolvedFunc: GtResolvedFunc = PolyFunc.ResolveFunc(Gamma, ParsedTree, 1, ParamList);
		if(ResolvedFunc.Func != null) {
			LeftNode = ParamList.get(0);
			RightNode = ParamList.get(1);
		}
		return Gamma.Generator.CreateSelfAssignNode(LeftNode.Type, ParsedTree, ResolvedFunc.Func, LeftNode, RightNode);
	}

	public static ParseIncl(NameSpace: GtNameSpace, TokenContext: GtTokenContext, LeftTree: GtSyntaxTree, Pattern: GtSyntaxPattern): GtSyntaxTree {
		var InclTree: GtSyntaxTree = new GtSyntaxTree(Pattern, NameSpace, TokenContext.Next(), null);
		if(LeftTree != null) { /* i++ */
			InclTree.SetSyntaxTreeAt(UnaryTerm, LeftTree);
		}
		else { /* ++i */
			var Tree: GtSyntaxTree = TokenContext.ParsePattern(NameSpace, "$Expression$", Required);
			InclTree.SetSyntaxTreeAt(UnaryTerm, Tree);
		}
		return InclTree;
	}

	public static TypeIncl(Gamma: GtTypeEnv, ParsedTree: GtSyntaxTree, Type: GtType): GtNode {
		var LeftNode: GtNode = ParsedTree.TypeCheckAt(UnaryTerm, Gamma, Gamma.VarType, DefaultTypeCheckPolicy);
		if(LeftNode.Type == Gamma.IntType) {
			if(Type != Gamma.VoidType) {
				Gamma.Context.ReportError(WarningLevel, ParsedTree.KeyToken, "only available as statement: " + ParsedTree.KeyToken);
			}
			if(LeftNode instanceof GtLocalNode || LeftNode instanceof GtGetterNode || LeftNode instanceof GtIndexerNode) {
				var ConstNode: GtNode = Gamma.Generator.CreateConstNode(LeftNode.Type, ParsedTree, 1);
				// ++ => +
				var OperatorSymbol: string = LibGreenTea.SubString(ParsedTree.KeyToken.ParsedText, 0, 1);
				var PolyFunc: GtPolyFunc = ParsedTree.NameSpace.GetMethod(LeftNode.Type, FuncSymbol(OperatorSymbol), true);
				var ParamList: Array<GtNode> = new Array<GtNode>();
				ParamList.add(LeftNode);
				ParamList.add(ConstNode);
				var ResolvedFunc: GtResolvedFunc = PolyFunc.ResolveFunc(Gamma, ParsedTree, 1, ParamList);
				return Gamma.Generator.CreateSelfAssignNode(LeftNode.Type, ParsedTree, ResolvedFunc.Func, LeftNode, ConstNode);
			}
			return Gamma.CreateSyntaxErrorNode(ParsedTree, "neither incremental nor decrimental");
		}
		return LeftNode.IsErrorNode() ? LeftNode : KonohaGrammar.TypeUnary(Gamma, ParsedTree, Type);
	}

	public static ParseError(NameSpace: GtNameSpace, TokenContext: GtTokenContext, LeftTree: GtSyntaxTree, Pattern: GtSyntaxPattern): GtSyntaxTree {
		return new GtSyntaxTree(Pattern, NameSpace, TokenContext.GetToken(), null);
	}

	public static TypeError(Gamma: GtTypeEnv, ParsedTree: GtSyntaxTree, Type: GtType): GtNode {
		return Gamma.Generator.CreateErrorNode(Gamma.VoidType, ParsedTree);
	}

	public static ParseEmpty(NameSpace: GtNameSpace, TokenContext: GtTokenContext, LeftTree: GtSyntaxTree, Pattern: GtSyntaxPattern): GtSyntaxTree {
		return new GtSyntaxTree(Pattern, NameSpace, TokenContext.GetBeforeToken(), null);
	}

	public static TypeEmpty(Gamma: GtTypeEnv, ParsedTree: GtSyntaxTree, Type: GtType): GtNode {
		return Gamma.Generator.CreateEmptyNode(Gamma.VoidType);
	}

	public static ParseSemiColon(NameSpace: GtNameSpace, TokenContext: GtTokenContext, LeftTree: GtSyntaxTree, Pattern: GtSyntaxPattern): GtSyntaxTree {
		if(TokenContext.IsAllowedBackTrack()) {
			return null;
		}
		else {
			return TokenContext.ReportTokenError2(TokenContext.GetToken(), "unexpected ;", false);
		}
	}

	public static ParseRequire(NameSpace: GtNameSpace, TokenContext: GtTokenContext, LeftTree: GtSyntaxTree, Pattern: GtSyntaxPattern): GtSyntaxTree {
		TokenContext.Next(); // skipped first token "require";
		while(TokenContext.HasNext()) {
			var Token: GtToken = TokenContext.Next();
			if(Token.IsIndent() || Token.IsDelim()) {
				break;
			}
			if(Token.IsNameSymbol()) {
				if(!NameSpace.LoadRequiredLib(Token.ParsedText)) {
					return TokenContext.NewErrorSyntaxTree(Token, "failed to load required library: " + Token.ParsedText);
				}
			}
			if(TokenContext.MatchToken(",")) {
				continue;
			}
		}
		return KonohaGrammar.ParseEmpty(NameSpace, TokenContext, LeftTree, Pattern);
	}

	private static ParseJoinedName(TokenContext: GtTokenContext): string {
		var Token: GtToken = TokenContext.Next();
		var PackageName: string = LibGreenTea.UnquoteString(Token.ParsedText);
		while(TokenContext.HasNext()) {
			Token = TokenContext.Next();
			if(Token.IsNameSymbol() || LibGreenTea.EqualsString(Token.ParsedText, ".")) {
				PackageName += Token.ParsedText;
				continue;
			}
			break;
		}
		return PackageName;
	}

	public static ParseImport(NameSpace: GtNameSpace, TokenContext: GtTokenContext, LeftTree: GtSyntaxTree, Pattern: GtSyntaxPattern): GtSyntaxTree {
		var ImportTree: GtSyntaxTree = TokenContext.CreateMatchedSyntaxTree(NameSpace, Pattern, "import");
		var PackageName: string = KonohaGrammar.ParseJoinedName(TokenContext);
		ImportTree.ParsedValue = PackageName;
		return ImportTree;
	}

	public static TypeImport(Gamma: GtTypeEnv, ParsedTree: GtSyntaxTree, Type: GtType): GtNode {
		var Value: Object = LibGreenTea.ImportNativeObject(Gamma.NameSpace, <string>ParsedTree.ParsedValue);
		if(Value == null) {
			return Gamma.CreateSyntaxErrorNode(ParsedTree, "cannot import: " + ParsedTree.ParsedValue);
		}
		return Gamma.Generator.CreateConstNode(Gamma.Context.GuessType(Value), ParsedTree, Value);
	}

	public static ParseBlock(ParentNameSpace: GtNameSpace, TokenContext: GtTokenContext, LeftTree: GtSyntaxTree, Pattern: GtSyntaxPattern): GtSyntaxTree {
		if(TokenContext.MatchToken("{")) {
			var PrevTree: GtSyntaxTree = null;
			var NameSpace: GtNameSpace = ParentNameSpace.CreateSubNameSpace();
			while(TokenContext.HasNext()) {
				TokenContext.SkipEmptyStatement();
				if(TokenContext.MatchToken("}")) {
					break;
				}
				var Annotation: GtMap = TokenContext.SkipAndGetAnnotation(true);
				var ParsedTree: GtSyntaxTree = TokenContext.ParsePattern(NameSpace, "$Expression$", Required);
				if(IsMismatchedOrError(ParsedTree)) {
					return ParsedTree;
				}
				ParsedTree.SetAnnotation(Annotation);
				//PrevTree = GtStatic.TreeTail(GtStatic.LinkTree(PrevTree, GtStatic.TreeHead(CurrentTree)));
				if(ParsedTree.PrevTree != null) {
					ParsedTree = TreeHead(ParsedTree);
				}
				PrevTree = LinkTree(PrevTree, ParsedTree);
				TokenContext.SkipIncompleteStatement();  // check; and skip empty statement
			}
			if(PrevTree == null) {
				return TokenContext.ParsePattern(NameSpace, "$Empty$", Required);
			}
			return TreeHead(PrevTree);
		}
		return null;
	}

	public static ParseStatement(NameSpace: GtNameSpace, TokenContext: GtTokenContext, LeftTree: GtSyntaxTree, Pattern: GtSyntaxPattern): GtSyntaxTree {
		var StmtTree: GtSyntaxTree = TokenContext.ParsePattern(NameSpace, "$Block$", Optional);
		if(StmtTree == null) {
			StmtTree = TokenContext.ParsePattern(NameSpace, "$Expression$", Optional);
		}
		if(StmtTree == null) {
			StmtTree = TokenContext.ParsePattern(NameSpace, "$Empty$", Required);
		}
		return StmtTree;
	}

	// If Statement
	public static ParseIf(NameSpace: GtNameSpace, TokenContext: GtTokenContext, LeftTree: GtSyntaxTree, Pattern: GtSyntaxPattern): GtSyntaxTree {
		var NewTree: GtSyntaxTree = TokenContext.CreateMatchedSyntaxTree(NameSpace, Pattern, "if");
		NewTree.SetMatchedTokenAt(NoWhere, NameSpace, TokenContext, "(", Required | OpenSkipIndent);
		NewTree.SetMatchedPatternAt(IfCond, NameSpace, TokenContext, "$Expression$", Required);
		NewTree.SetMatchedTokenAt(NoWhere, NameSpace, TokenContext, ")", Required | CloseSkipIndent);
		NewTree.SetMatchedPatternAt(IfThen, NameSpace, TokenContext, "$Statement$", AllowLineFeed | Required);
		TokenContext.SkipEmptyStatement();
		if(TokenContext.MatchToken2("else", AllowLineFeed)) {
			NewTree.SetMatchedPatternAt(IfElse, NameSpace, TokenContext, "$Statement$", AllowLineFeed | Required);
		}
		return NewTree;
	}

	public static TypeIf(Gamma: GtTypeEnv, ParsedTree: GtSyntaxTree, ContextType: GtType): GtNode {
		var CondNode: GtNode = ParsedTree.TypeCheckAt(IfCond, Gamma, Gamma.BooleanType, DefaultTypeCheckPolicy);
		var ThenNode: GtNode = ParsedTree.TypeCheckAt(IfThen, Gamma, Gamma.VoidType, DefaultTypeCheckPolicy);
		var ElseNode: GtNode = ParsedTree.TypeCheckAt(IfElse, Gamma, Gamma.VoidType, DefaultTypeCheckPolicy);
		if(ThenNode.HasReturnNode() && ElseNode != null && ElseNode.HasReturnNode()) {
			ParsedTree.NextTree = null;
		}
		return Gamma.Generator.CreateIfNode(ThenNode.Type, ParsedTree, CondNode, ThenNode, ElseNode);
	}

	// While Statement
	public static ParseWhile(NameSpace: GtNameSpace, TokenContext: GtTokenContext, LeftTree: GtSyntaxTree, Pattern: GtSyntaxPattern): GtSyntaxTree {
		var WhileTree: GtSyntaxTree = TokenContext.CreateMatchedSyntaxTree(NameSpace, Pattern, "while");
		WhileTree.SetMatchedTokenAt(NoWhere, NameSpace, TokenContext, "(", Required | OpenSkipIndent);
		WhileTree.SetMatchedPatternAt(WhileCond, NameSpace, TokenContext, "$Expression$", Required);
		WhileTree.SetMatchedTokenAt(NoWhere, NameSpace, TokenContext, ")", Required | CloseSkipIndent);
		WhileTree.SetMatchedPatternAt(WhileBody, NameSpace, TokenContext, "$Statement$", Required);
		return WhileTree;
	}

	public static TypeWhile(Gamma: GtTypeEnv, ParsedTree: GtSyntaxTree, ContextType: GtType): GtNode {
		var CondNode: GtNode = ParsedTree.TypeCheckAt(WhileCond, Gamma, Gamma.BooleanType, DefaultTypeCheckPolicy);
		var BodyNode: GtNode =  ParsedTree.TypeCheckAt(WhileBody, Gamma, Gamma.VoidType, DefaultTypeCheckPolicy);
		return Gamma.Generator.CreateWhileNode(BodyNode.Type, ParsedTree, CondNode, BodyNode);
	}

	// DoWhile Statement
	public static ParseDoWhile(NameSpace: GtNameSpace, TokenContext: GtTokenContext, LeftTree: GtSyntaxTree, Pattern: GtSyntaxPattern): GtSyntaxTree {
		var Tree: GtSyntaxTree = TokenContext.CreateMatchedSyntaxTree(NameSpace, Pattern, "do");
		Tree.SetMatchedPatternAt(WhileBody, NameSpace, TokenContext, "$Statement$", Required);
		Tree.SetMatchedTokenAt(NoWhere, NameSpace, TokenContext, "while", Required);
		Tree.SetMatchedTokenAt(NoWhere, NameSpace, TokenContext, "(", Required | OpenSkipIndent);
		Tree.SetMatchedPatternAt(WhileCond, NameSpace, TokenContext, "$Expression$", Required);
		Tree.SetMatchedTokenAt(NoWhere, NameSpace, TokenContext, ")", Required | CloseSkipIndent);
		return Tree;
	}

	public static TypeDoWhile(Gamma: GtTypeEnv, ParsedTree: GtSyntaxTree, ContextType: GtType): GtNode {
		var CondNode: GtNode = ParsedTree.TypeCheckAt(WhileCond, Gamma, Gamma.BooleanType, DefaultTypeCheckPolicy);
		var BodyNode: GtNode =  ParsedTree.TypeCheckAt(WhileBody, Gamma, Gamma.VoidType, DefaultTypeCheckPolicy);
		return Gamma.Generator.CreateDoWhileNode(BodyNode.Type, ParsedTree, CondNode, BodyNode);
	}

	// For Statement
	public static ParseFor(NameSpace: GtNameSpace, TokenContext: GtTokenContext, LeftTree: GtSyntaxTree, Pattern: GtSyntaxPattern): GtSyntaxTree {
		var Tree: GtSyntaxTree = TokenContext.CreateMatchedSyntaxTree(NameSpace, Pattern, "for");
		Tree.SetMatchedTokenAt(NoWhere, NameSpace, TokenContext, "(", Required | OpenSkipIndent);
		Tree.SetMatchedPatternAt(ForInit, NameSpace, TokenContext, "$Expression$", Optional);
		Tree.SetMatchedTokenAt(NoWhere, NameSpace, TokenContext, ";", Required);
		Tree.SetMatchedPatternAt(ForCond, NameSpace, TokenContext, "$Expression$", Optional);
		Tree.SetMatchedTokenAt(NoWhere, NameSpace, TokenContext, ";", Required);
		Tree.SetMatchedPatternAt(ForIteration, NameSpace, TokenContext, "$Expression$", Optional);
		Tree.SetMatchedTokenAt(NoWhere, NameSpace, TokenContext, ")", Required | CloseSkipIndent);
		Tree.SetMatchedPatternAt(ForBody, NameSpace, TokenContext, "$Statement$", Required);
		return Tree;
	}

	public static TypeFor(Gamma: GtTypeEnv, ParsedTree: GtSyntaxTree, ContextType: GtType): GtNode {
		var InitNode: GtNode = null;
		var CondNode: GtNode = null;
		var IterNode: GtNode = null;
		if(ParsedTree.HasNodeAt(ForInit)) {
			InitNode =  ParsedTree.TypeCheckAt(ForInit, Gamma, Gamma.VarType, DefaultTypeCheckPolicy);
		}
		if(ParsedTree.HasNodeAt(ForCond)) {
			CondNode =  ParsedTree.TypeCheckAt(ForCond, Gamma, Gamma.BooleanType, DefaultTypeCheckPolicy);
		}
		if(ParsedTree.HasNodeAt(ForIteration)) {
			IterNode =  ParsedTree.TypeCheckAt(ForIteration, Gamma, Gamma.VarType, DefaultTypeCheckPolicy);
		}
		var BodyNode: GtNode =  ParsedTree.TypeCheckAt(ForBody, Gamma, Gamma.VoidType, DefaultTypeCheckPolicy);
		var ForNode: GtNode = Gamma.Generator.CreateForNode(BodyNode.Type, ParsedTree, CondNode, IterNode, BodyNode);
		if(InitNode != null) {
			if(InitNode instanceof GtVarNode) {
				(<GtVarNode>InitNode).BlockNode = ForNode;
			}
			else {
				InitNode = LinkNode(InitNode, ForNode);
			}
			return InitNode;
		}
		return ForNode;
	}

	// Break/Continue Statement
	public static ParseBreak(NameSpace: GtNameSpace, TokenContext: GtTokenContext, LeftTree: GtSyntaxTree, Pattern: GtSyntaxPattern): GtSyntaxTree {
		return TokenContext.CreateMatchedSyntaxTree(NameSpace, Pattern, "break");
	}

	public static TypeBreak(Gamma: GtTypeEnv, ParsedTree: GtSyntaxTree, ContextType: GtType): GtNode {
		return Gamma.Generator.CreateBreakNode(Gamma.VoidType, ParsedTree, "");
	}

	public static ParseContinue(NameSpace: GtNameSpace, TokenContext: GtTokenContext, LeftTree: GtSyntaxTree, Pattern: GtSyntaxPattern): GtSyntaxTree {
		return TokenContext.CreateMatchedSyntaxTree(NameSpace, Pattern, "continue");
	}

	public static TypeContinue(Gamma: GtTypeEnv, ParsedTree: GtSyntaxTree, ContextType: GtType): GtNode {
		return Gamma.Generator.CreateContinueNode(Gamma.VoidType, ParsedTree, "");
	}

	// Return Statement
	public static ParseReturn(NameSpace: GtNameSpace, TokenContext: GtTokenContext, LeftTree: GtSyntaxTree, Pattern: GtSyntaxPattern): GtSyntaxTree {
		var ReturnTree: GtSyntaxTree = TokenContext.CreateMatchedSyntaxTree(NameSpace, Pattern, "return");
		ReturnTree.SetMatchedPatternAt(ReturnExpr, NameSpace, TokenContext, "$Expression$", Optional);
		return ReturnTree;
	}

	public static TypeReturn(Gamma: GtTypeEnv, ParsedTree: GtSyntaxTree, ContextType: GtType): GtNode {
		ParsedTree.NextTree = null; // stop typing of next trees
		if(Gamma.IsTopLevel()) {
			return Gamma.UnsupportedTopLevelError(ParsedTree);
		}
		var ReturnType: GtType = Gamma.Func.GetReturnType();
		if(ParsedTree.HasNodeAt(ReturnExpr)) {
			var Expr: GtNode = ParsedTree.TypeCheckAt(ReturnExpr, Gamma, ReturnType, DefaultTypeCheckPolicy);
			if(ReturnType == Gamma.VarType && !Expr.IsErrorNode()) {
				Gamma.Func.Types[0] = Expr.Type;
				Gamma.ReportTypeInference(ParsedTree.KeyToken, "return value of " + Gamma.Func.FuncName, Expr.Type);
			}
			if(ReturnType == Gamma.VoidType) {
				Gamma.Context.ReportError(WarningLevel, ParsedTree.KeyToken, "ignored return value");
				return Gamma.Generator.CreateReturnNode(ReturnType, ParsedTree, null);
			}
			return Gamma.Generator.CreateReturnNode(Expr.Type, ParsedTree, Expr);
		}
		else {
			if(ReturnType == Gamma.VarType) {
				Gamma.Func.Types[0] = Gamma.VoidType;
				Gamma.ReportTypeInference(ParsedTree.KeyToken, "return value of " + Gamma.Func.FuncName, Gamma.VoidType);
			}
			if(Gamma.Func.Is(ConstructorFunc)) {
				var ThisNode: GtNode = Gamma.CreateLocalNode(ParsedTree, Gamma.Generator.GetRecvName());
				return Gamma.Generator.CreateReturnNode(ThisNode.Type, ParsedTree, ThisNode);
			}
			if(ReturnType != Gamma.VoidType) {
				Gamma.Context.ReportError(WarningLevel, ParsedTree.KeyToken, "returning default value of " + ReturnType);
				return Gamma.Generator.CreateReturnNode(ReturnType, ParsedTree, Gamma.CreateDefaultValue(ParsedTree, ReturnType));
			}
			return Gamma.Generator.CreateReturnNode(ReturnType, ParsedTree, null);
		}
	}

	// try
	public static ParseTry(NameSpace: GtNameSpace, TokenContext: GtTokenContext, LeftTree: GtSyntaxTree, Pattern: GtSyntaxPattern): GtSyntaxTree {
		var TryTree: GtSyntaxTree = TokenContext.CreateMatchedSyntaxTree(NameSpace, Pattern, "try");
		TryTree.SetMatchedPatternAt(TryBody, NameSpace, TokenContext, "$Block$", Required);
		TokenContext.SkipEmptyStatement();
		if(TokenContext.MatchToken("catch")) {
			TryTree.SetMatchedTokenAt(NoWhere, NameSpace, TokenContext, "(", Required | OpenSkipIndent);
			TryTree.SetMatchedPatternAt(CatchVariable, NameSpace, TokenContext, "$VarDecl$", Required);
			TryTree.SetMatchedTokenAt(NoWhere, NameSpace, TokenContext, ")", Required | CloseSkipIndent);
			TryTree.SetMatchedPatternAt(CatchBody, NameSpace, TokenContext, "$Block$", Required);
		}
		TokenContext.SkipEmptyStatement();
		if(TokenContext.MatchToken("finally")) {
			TryTree.SetMatchedPatternAt(FinallyBody, NameSpace, TokenContext, "$Block$", Required);
		}
		return TryTree;
	}

	public static TypeTry(Gamma: GtTypeEnv, ParsedTree: GtSyntaxTree, ContextType: GtType): GtNode {
		var TryNode: GtNode = ParsedTree.TypeCheckAt(TryBody, Gamma, Gamma.VoidType, DefaultTypeCheckPolicy);
		var CatchExpr: GtNode = null;
		var CatchNode: GtNode = null;
		if(ParsedTree.HasNodeAt(CatchVariable)) {
			CatchExpr = ParsedTree.TypeCheckAt(CatchVariable, Gamma, Gamma.VarType, DefaultTypeCheckPolicy);
			CatchNode = ParsedTree.TypeCheckAt(CatchBody, Gamma, Gamma.VoidType, DefaultTypeCheckPolicy);
		}
		var FinallyNode: GtNode = ParsedTree.TypeCheckAt(FinallyBody, Gamma, Gamma.VoidType, DefaultTypeCheckPolicy);
		return Gamma.Generator.CreateTryNode(TryNode.Type, ParsedTree, TryNode, CatchExpr, CatchNode, FinallyNode);
	}

	// throw $Expr$
	public static ParseThrow(NameSpace: GtNameSpace, TokenContext: GtTokenContext, LeftTree: GtSyntaxTree, Pattern: GtSyntaxPattern): GtSyntaxTree {
		var ThrowTree: GtSyntaxTree = TokenContext.CreateMatchedSyntaxTree(NameSpace, Pattern, "throw");
		ThrowTree.SetMatchedPatternAt(ReturnExpr, NameSpace, TokenContext, "$Expression$", Required);
		return ThrowTree;
	}

	public static TypeThrow(Gamma: GtTypeEnv, ParsedTree: GtSyntaxTree, ContextType: GtType): GtNode {
		ParsedTree.NextTree = null;
		var FaultType: GtType = ContextType; // FIXME Gamma.FaultType;
		var ExprNode: GtNode = ParsedTree.TypeCheckAt(ReturnExpr, Gamma, FaultType, DefaultTypeCheckPolicy);
		return Gamma.Generator.CreateThrowNode(ExprNode.Type, ParsedTree, ExprNode);
	}

	public static ParseThis(NameSpace: GtNameSpace, TokenContext: GtTokenContext, LeftTree: GtSyntaxTree, Pattern: GtSyntaxPattern): GtSyntaxTree {
		return TokenContext.CreateMatchedSyntaxTree(NameSpace, Pattern, "this");
	}

	public static TypeThis(Gamma: GtTypeEnv, ParsedTree: GtSyntaxTree, ContextType: GtType): GtNode {
		return Gamma.CreateLocalNode(ParsedTree, Gamma.Generator.GetRecvName());
	}

	public static ParseLine(NameSpace: GtNameSpace, TokenContext: GtTokenContext, LeftTree: GtSyntaxTree, Pattern: GtSyntaxPattern): GtSyntaxTree {
		return TokenContext.CreateMatchedSyntaxTree(NameSpace, Pattern, "__line__");
	}

	public static TypeLine(Gamma: GtTypeEnv, ParsedTree: GtSyntaxTree, ContextType: GtType): GtNode {
		return Gamma.Generator.CreateConstNode(Gamma.StringType, ParsedTree, Gamma.Context.GetSourcePosition(ParsedTree.KeyToken.FileLine));
	}

	public static ParseSymbols(NameSpace: GtNameSpace, TokenContext: GtTokenContext, LeftTree: GtSyntaxTree, Pattern: GtSyntaxPattern): GtSyntaxTree {
		return TokenContext.CreateMatchedSyntaxTree(NameSpace, Pattern, "__").ToConstTree(NameSpace);
	}

	public static ParseSuper(NameSpace: GtNameSpace, TokenContext: GtTokenContext, LeftTree: GtSyntaxTree, Pattern: GtSyntaxPattern): GtSyntaxTree {
		var Tree: GtSyntaxTree = TokenContext.CreateMatchedSyntaxTree(NameSpace, Pattern, "super");
//		#Local#int ParseFlag = TokenContext.SetSkipIndent(true);
//		Tree.SetSyntaxTreeAt(0, new GtSyntaxTree(NameSpace.GetSyntaxPattern("$Variable$"), NameSpace, Token, null));
//		Tree.SetSyntaxTreeAt(1,  new GtSyntaxTree(NameSpace.GetSyntaxPattern("this"), NameSpace, new GtToken("this", 0), null));
//		TokenContext.MatchToken("(");
//		if(!TokenContext.MatchToken(")")) {
//			while(!Tree.IsMismatchedOrError()) {
//				Tree.AppendMatchedPattern(NameSpace, TokenContext, "$Expression$", Required);
//				if(TokenContext.MatchToken(")")) {
//					break;
//				}
//				Tree.SetMatchedTokenAt(NoWhere, NameSpace, TokenContext, ",", Required);
//			}
//		}
//		TokenContext.ParseFlag = ParseFlag;
//		if(!Tree.IsMismatchedOrError()) {
//			// translate '$super$(this, $Params$)' => 'super(this, $Params$)'
//			Tree.Pattern = NameSpace.GetExtendedSyntaxPattern("(");
//			return Tree;
//		}
		return Tree;
	}

	// new $Type ( $Expr$ [, $Expr$] )
	public static ParseNew(NameSpace: GtNameSpace, TokenContext: GtTokenContext, LeftTree: GtSyntaxTree, Pattern: GtSyntaxPattern): GtSyntaxTree {
		var NewTree: GtSyntaxTree = TokenContext.CreateMatchedSyntaxTree(NameSpace, Pattern, "new");
		NewTree.SetMatchedPatternAt(0, NameSpace, TokenContext, "$Type$", Optional);
		if(!NewTree.HasNodeAt(0)) {
			NewTree.SetSyntaxTreeAt(0, NewTree.CreateConstTree(NameSpace.Context.VarType)); // TODO
		}
		var ParseFlag: number = TokenContext.SetSkipIndent(true);
		NewTree.SetMatchedTokenAt(NoWhere, NameSpace, TokenContext, "(", Required);
		if(!TokenContext.MatchToken(")")) {
			while(!NewTree.IsMismatchedOrError()) {
				NewTree.AppendMatchedPattern(NameSpace, TokenContext, "$Expression$", Required);
				if(TokenContext.MatchToken(")")) {
					break;
				}
				NewTree.SetMatchedTokenAt(NoWhere, NameSpace, TokenContext, ",", Required);
			}
		}
		TokenContext.SetRememberFlag(ParseFlag);
		return NewTree;
	}

	// switch
	public static ParseEnum(NameSpace: GtNameSpace, TokenContext: GtTokenContext, LeftTree: GtSyntaxTree, Pattern: GtSyntaxPattern): GtSyntaxTree {
		var EnumTypeName: string = null;
		var NewEnumType: GtType = null;
		var EnumMap: GtMap = new GtMap();
		var EnumTree: GtSyntaxTree = TokenContext.CreateMatchedSyntaxTree(NameSpace, Pattern, "enum");
		EnumTree.SetMatchedPatternAt(EnumNameTreeIndex, NameSpace, TokenContext, "$FuncName$", Required);  // $ClassName$ is better
		if(!EnumTree.IsMismatchedOrError()) {
			EnumTypeName = EnumTree.GetSyntaxTreeAt(EnumNameTreeIndex).KeyToken.ParsedText;
			NewEnumType = NameSpace.Context.EnumBaseType.CreateSubType(EnumType, EnumTypeName, null, EnumMap);
		}
		EnumTree.SetMatchedTokenAt(NoWhere, NameSpace, TokenContext, "{", Required);
		var EnumValue: number = 0;
		var NameList: Array<GtToken> = new Array<GtToken>();
		while(!EnumTree.IsMismatchedOrError()) {
			TokenContext.SkipIndent();
			if(TokenContext.MatchToken(",")) {
				continue;
			}
			if(TokenContext.MatchToken("}")) {
				break;
			}
			var Token: GtToken = TokenContext.Next();
			if(LibGreenTea.IsVariableName(Token.ParsedText, 0)) {
				if(EnumMap.GetOrNull(Token.ParsedText) != null) {
					NameSpace.Context.ReportError(ErrorLevel, Token, "duplicated name: " + Token.ParsedText);
					continue;
				}
				NameList.add(Token);
				EnumMap.put(Token.ParsedText, new GreenTeaEnum(NewEnumType, EnumValue, Token.ParsedText));
				EnumValue += 1;
				continue;
			}
		}
		if(!EnumTree.IsMismatchedOrError()) {
			var StoreNameSpace: GtNameSpace = NameSpace.GetNameSpace(KonohaGrammar.ParseNameSpaceFlag(0, TokenContext.ParsingAnnotation));
			StoreNameSpace.AppendTypeName(NewEnumType, EnumTree.GetSyntaxTreeAt(EnumNameTreeIndex).KeyToken);
			var i: number = 0;
			while(i < LibGreenTea.ListSize(NameList)) {
				var Key: string = NameList.get(i).ParsedText;
				StoreNameSpace.SetSymbol(ClassStaticSymbol(NewEnumType, Key), EnumMap.GetOrNull(Key), NameList.get(i));
				i = i + 1;
			}
			EnumTree.ParsedValue = NewEnumType;
		}
		return EnumTree;
	}

	public static TypeEnum(Gamma: GtTypeEnv, ParsedTree: GtSyntaxTree, ContextType: GtType): GtNode {
		var EnumType: Object = ParsedTree.ParsedValue;
		return Gamma.Generator.CreateConstNode(Gamma.Context.GuessType(EnumType), ParsedTree, EnumType);
	}

	public static ParseCaseBlock(ParentNameSpace: GtNameSpace, TokenContext: GtTokenContext, LeftTree: GtSyntaxTree, Pattern: GtSyntaxPattern): GtSyntaxTree {
		var PrevTree: GtSyntaxTree = null;
		var NameSpace: GtNameSpace = ParentNameSpace.CreateSubNameSpace();
		var IsCaseBlock: boolean = TokenContext.MatchToken("{"); // case EXPR : {}
		while(TokenContext.HasNext()) {
			TokenContext.SkipEmptyStatement();
			if(TokenContext.IsToken("case")) {
				break;
			}
			if(TokenContext.IsToken("default")) {
				break;
			}
			if(TokenContext.IsToken("}")) {
				if(!IsCaseBlock) {
				}
				break;
			}
			var Annotation: GtMap = TokenContext.SkipAndGetAnnotation(true);
			var CurrentTree: GtSyntaxTree = TokenContext.ParsePattern(NameSpace, "$Expression$", Required);
			if(IsMismatchedOrError(CurrentTree)) {
				return CurrentTree;
			}
			CurrentTree.SetAnnotation(Annotation);
			PrevTree = LinkTree(PrevTree, CurrentTree);
		}
		if(PrevTree == null) {
			return TokenContext.ParsePattern(NameSpace, "$Empty$", Required);
		}
		return TreeHead(PrevTree);
	}

	public static ParseSwitch(NameSpace: GtNameSpace, TokenContext: GtTokenContext, LeftTree: GtSyntaxTree, Pattern: GtSyntaxPattern): GtSyntaxTree {
		var SwitchTree: GtSyntaxTree = TokenContext.CreateMatchedSyntaxTree(NameSpace, Pattern, "switch");
		SwitchTree.SetMatchedTokenAt(NoWhere, NameSpace, TokenContext, "(", Required | OpenSkipIndent);
		SwitchTree.SetMatchedPatternAt(SwitchCaseCondExpr, NameSpace, TokenContext, "$Expression$", Required);
		SwitchTree.SetMatchedTokenAt(NoWhere, NameSpace, TokenContext, ")", Required | CloseSkipIndent);
		SwitchTree.SetMatchedTokenAt(NoWhere, NameSpace, TokenContext, "{", Required);

		var CaseIndex: number = SwitchCaseCaseIndex;
		var ParseFlag: number = TokenContext.SetSkipIndent(true);
		while(!SwitchTree.IsMismatchedOrError() && !TokenContext.MatchToken("}")) {
			if(TokenContext.MatchToken("case")) {
				SwitchTree.SetMatchedPatternAt(CaseIndex, NameSpace, TokenContext, "$Expression$", Required);
				SwitchTree.SetMatchedTokenAt(NoWhere, NameSpace, TokenContext, ":", Required);
				SwitchTree.SetMatchedPatternAt(CaseIndex + 1, NameSpace, TokenContext, "$CaseBlock$", Required);
				CaseIndex += 2;
				continue;
			}
			if(TokenContext.MatchToken("default")) {
				SwitchTree.SetMatchedTokenAt(NoWhere, NameSpace, TokenContext, ":", Required);
				SwitchTree.SetMatchedPatternAt(SwitchCaseDefaultBlock, NameSpace, TokenContext, "$CaseBlock$", Required);
			}
		}
		TokenContext.SetRememberFlag(ParseFlag);
		return SwitchTree;
	}

	public static TypeSwitch(Gamma: GtTypeEnv, ParsedTree: GtSyntaxTree, ContextType: GtType): GtNode {
		var CondNode: GtNode = ParsedTree.TypeCheckAt(IfCond, Gamma, Gamma.VarType, DefaultTypeCheckPolicy);
		var DefaultNode: GtNode = null;
		if(ParsedTree.HasNodeAt(SwitchCaseDefaultBlock)) {
			DefaultNode = ParsedTree.TypeCheckAt(SwitchCaseDefaultBlock, Gamma, Gamma.VoidType, DefaultTypeCheckPolicy);
		}
		var Node: GtNode = Gamma.Generator.CreateSwitchNode(Gamma.VoidType, ParsedTree, CondNode, DefaultNode);
		var CaseIndex: number = SwitchCaseCaseIndex;
		while(CaseIndex < ParsedTree.SubTreeList.size()) {
			var CaseExpr: GtNode  = ParsedTree.TypeCheckAt(CaseIndex, Gamma, CondNode.Type, DefaultTypeCheckPolicy);
			var CaseBlock: GtNode = null;
			if(ParsedTree.HasNodeAt(CaseIndex+1)) {
				CaseBlock = ParsedTree.TypeCheckAt(CaseIndex+1, Gamma, Gamma.VoidType, DefaultTypeCheckPolicy);
			}
			Node.Append(CaseExpr);
			Node.Append(CaseBlock);
			CaseIndex += 2;
		}
		return Node;
	}

	// const decl
	public static ParseSymbolDecl(NameSpace: GtNameSpace, TokenContext: GtTokenContext, LeftTree: GtSyntaxTree, Pattern: GtSyntaxPattern): GtSyntaxTree {
		var SymbolDeclTree: GtSyntaxTree = new GtSyntaxTree(Pattern, NameSpace, TokenContext.Next() /*const, let */, null);
		var ConstClass: GtType = null;
		SymbolDeclTree.SetMatchedPatternAt(SymbolDeclNameIndex, NameSpace, TokenContext, "$Variable$", Required);
		if(TokenContext.MatchToken(".")) {
			var ClassName: string = SymbolDeclTree.GetSyntaxTreeAt(SymbolDeclNameIndex).KeyToken.ParsedText;
			ConstClass = NameSpace.GetType(ClassName);
			if(ConstClass == null) {
				return TokenContext.ReportExpectedMessage(SymbolDeclTree.GetSyntaxTreeAt(SymbolDeclNameIndex).KeyToken, "type name", true);
			}
			SymbolDeclTree.SetMatchedPatternAt(SymbolDeclNameIndex, NameSpace, TokenContext, "$Variable$", Required);			
		}
		SymbolDeclTree.SetMatchedTokenAt(NoWhere, NameSpace, TokenContext, "=", Required);
		SymbolDeclTree.SetMatchedPatternAt(SymbolDeclValueIndex, NameSpace, TokenContext, "$Expression$", Required);
		
		if(SymbolDeclTree.IsValidSyntax()) {
			var SourceToken: GtToken = SymbolDeclTree.GetSyntaxTreeAt(SymbolDeclNameIndex).KeyToken;
			var ConstName: string = SourceToken.ParsedText;
			if(ConstClass != null) {
				ConstName = ClassStaticSymbol(ConstClass, ConstName);
				SourceToken.AddTypeInfoToErrorMessage(ConstClass);
			}
			var ConstValue: Object = null;
			if(SymbolDeclTree.GetSyntaxTreeAt(SymbolDeclValueIndex).Pattern.EqualsName("$Const$")) {
				ConstValue = SymbolDeclTree.GetSyntaxTreeAt(SymbolDeclValueIndex).ParsedValue;
			}
			if(ConstValue == null) {
				var Gamma: GtTypeEnv = new GtTypeEnv(NameSpace);
				var Node: GtNode = SymbolDeclTree.TypeCheckAt(SymbolDeclValueIndex, Gamma, Gamma.VarType, OnlyConstPolicy);
				if(Node.IsErrorNode()) {
					SymbolDeclTree.ToError(Node.Token);
					return SymbolDeclTree;
				}
				ConstValue = Node.ToConstValue(true);
			}
			var NameSpaceFlag: number = KonohaGrammar.ParseNameSpaceFlag(0, TokenContext.ParsingAnnotation);
			var StoreNameSpace: GtNameSpace = NameSpace.GetNameSpace(NameSpaceFlag);
			StoreNameSpace.SetSymbol(ConstName, ConstValue, SourceToken);
		}
		return SymbolDeclTree;
	}

	public static TypeSymbolDecl(Gamma: GtTypeEnv, ParsedTree: GtSyntaxTree, ContextType: GtType): GtNode {
		return Gamma.Generator.CreateEmptyNode(ContextType);
	}

	// FuncDecl
	public static ParseFuncName(NameSpace: GtNameSpace, TokenContext: GtTokenContext, LeftTree: GtSyntaxTree, Pattern: GtSyntaxPattern): GtSyntaxTree {
		var Token: GtToken = TokenContext.Next();
		var Name: string = Token.ParsedText;
		if(Token.IsQuoted()) {
			Name = LibGreenTea.UnquoteString(Name);
			Token.ParsedText = Name;
			return new GtSyntaxTree(Pattern, NameSpace, Token, Name);
		}
		if(Name.length > 0 && LibGreenTea.CharAt(Name, 0) != 40 && LibGreenTea.CharAt(Name, 0) != 46) {
			return new GtSyntaxTree(Pattern, NameSpace, Token, Name);
		}
		return TokenContext.ReportExpectedMessage(Token, "name", true);
	}

	private static ParseFuncParam(NameSpace: GtNameSpace, TokenContext: GtTokenContext, FuncDeclTree: GtSyntaxTree, FuncBlock: GtFuncBlock): void {
		var ParamBase: number = FuncDeclParam;
		while(!FuncDeclTree.IsMismatchedOrError() && !TokenContext.MatchToken(")")) {
			TokenContext.SkipIndent();
			if(ParamBase != FuncDeclParam) {
				FuncDeclTree.SetMatchedTokenAt(NoWhere, NameSpace, TokenContext, ",", Required);
				TokenContext.SkipIndent();
			}
			FuncDeclTree.SetMatchedPatternAt(ParamBase + VarDeclType, NameSpace, TokenContext, "$Type$", Required);
			FuncDeclTree.SetMatchedPatternAt(ParamBase + VarDeclName, NameSpace, TokenContext, "$Variable$", Required);
			if(FuncDeclTree.IsValidSyntax()) {
				FuncBlock.AddParameter(FuncDeclTree.GetSyntaxTreeAt(ParamBase + VarDeclType).GetParsedType(), FuncDeclTree.GetSyntaxTreeAt(ParamBase + VarDeclName).KeyToken.ParsedText);
			}
			if(TokenContext.MatchToken("=")) {
				FuncDeclTree.SetMatchedPatternAt(ParamBase + VarDeclValue, NameSpace, TokenContext, "$Expression$", Required);
			}
			ParamBase += 3;
		}
		TokenContext.SetSkipIndent(false);
	}

	private static ParseFuncBody(NameSpace: GtNameSpace, TokenContext: GtTokenContext, FuncDeclTree: GtSyntaxTree, FuncBlock: GtFuncBlock): void {
		TokenContext.SkipIndent();
		if(TokenContext.MatchToken("as")) {
			var Token: GtToken = TokenContext.Next();
			FuncBlock.DefinedFunc.SetNativeMacro(LibGreenTea.UnquoteString(Token.ParsedText));
		}
		else if(TokenContext.IsToken("import")) {
			var ImportTree: GtSyntaxTree = TokenContext.ParsePattern(NameSpace, "import", Optional);
			if(IsValidSyntax(ImportTree)) {
				if(!LibGreenTea.ImportNativeMethod(NameSpace, FuncBlock.DefinedFunc, <string>ImportTree.ParsedValue)) {
					NameSpace.Context.ReportError(WarningLevel, ImportTree.KeyToken, "unable to import: " + ImportTree.ParsedValue);
				}
			}
		}
		else {
			var BlockTree: GtSyntaxTree = TokenContext.ParsePattern(NameSpace, "$Block$", Optional);
			if(IsValidSyntax(BlockTree)) {
				FuncBlock.FuncBlock = BlockTree;
				var ReturnTree: GtSyntaxTree = new GtSyntaxTree(NameSpace.GetSyntaxPattern("return"), NameSpace, BlockTree.KeyToken, null);
				LinkTree(TreeTail(BlockTree), ReturnTree);
				FuncBlock.DefinedFunc.FuncBody = FuncBlock;
			}
		}
	}

//	public static GtSyntaxTree ParseFunction(GtNameSpace NameSpace, GtTokenContext TokenContext, GtSyntaxTree LeftTree, GtSyntaxPattern Pattern) {
//		#Local#GtSyntaxTree FuncDeclTree = new GtSyntaxTree(Pattern, NameSpace, TokenContext.GetToken(), null);
//		FuncDeclTree.SetMatchedPatternAt(FuncDeclName, NameSpace, TokenContext, "$FuncName$", Optional);
//		if(FuncDeclTree.HasNodeAt(FuncDeclName)) {
//			//NameSpace = ParseFuncGenericParam(NameSpace, TokenContext, FuncDeclTree);
//		}
//		FuncDeclTree.SetMatchedTokenAt(NoWhere, NameSpace, TokenContext, "(", Required);
//		GreenTeaGrammar.ParseFuncParam(NameSpace, TokenContext, FuncDeclTree);
//		if(!FuncDeclTree.IsEmptyOrError() && TokenContext.MatchToken(":")) {
//			FuncDeclTree.SetMatchedPatternAt(FuncDeclReturnType, NameSpace, TokenContext, "$Type$", Required);
//		}
//		GreenTeaGrammar.ParseFuncBody(NameSpace, TokenContext, FuncDeclTree);
//		return FuncDeclTree;
//	}

	public static ParseFuncDecl(NameSpace: GtNameSpace, TokenContext: GtTokenContext, LeftTree: GtSyntaxTree, Pattern: GtSyntaxPattern): GtSyntaxTree {
		var FuncDeclTree: GtSyntaxTree = new GtSyntaxTree(Pattern, NameSpace, TokenContext.GetToken(), null);
		var FuncFlag: number = KonohaGrammar.ParseFuncFlag(0, TokenContext.ParsingAnnotation);
		var TypeList: Array<GtType> = new Array<GtType>();
		LibGreenTea.Assert(LeftTree != null);
		FuncDeclTree.SetSyntaxTreeAt(FuncDeclReturnType, LeftTree);
		TypeList.add(LeftTree.GetParsedType());
		FuncDeclTree.SetMatchedPatternAt(FuncDeclName, NameSpace, TokenContext, "$FuncName$", Required);
		FuncDeclTree.SetMatchedTokenAt(NoWhere, NameSpace, TokenContext, "(", Required | OpenSkipIndent);
		if(FuncDeclTree.IsValidSyntax()) {
			var FuncBlock: GtFuncBlock = new GtFuncBlock(NameSpace, TypeList);
			var FoundAbstractFunc: boolean = false;
			var SourceToken: GtToken = FuncDeclTree.GetSyntaxTreeAt(FuncDeclName).KeyToken;
			var FuncName: string = FuncSymbol(SourceToken.ParsedText);
			var ParseFlag: number = TokenContext.SetBackTrack(false);  // disabled
			var StoreNameSpace: GtNameSpace = NameSpace.GetNameSpace(KonohaGrammar.ParseNameSpaceFlag(0, TokenContext.ParsingAnnotation));
			if(LibGreenTea.EqualsString(FuncName, "converter")) {
				FuncFlag |= ConverterFunc;
				FuncBlock.SetConverterType();
				KonohaGrammar.ParseFuncParam(NameSpace, TokenContext, FuncDeclTree, FuncBlock);
				if(TypeList.size() != 3) {
					NameSpace.Context.ReportError(ErrorLevel, SourceToken, "converter takes one parameter");
					FuncDeclTree.ToError(SourceToken);
					return FuncDeclTree;
				}
				FuncName = "to" + TypeList.get(0);
				FuncBlock.DefinedFunc = NameSpace.Context.Generator.CreateFunc(FuncFlag, FuncName, 0, FuncBlock.TypeList);
				KonohaGrammar.ParseFuncBody(NameSpace, TokenContext, FuncDeclTree, FuncBlock);
				if(IsFlag(FuncFlag, StrongCoercionFunc)) {  // this part is for weak type treatment
					var FromType: GtType = FuncBlock.DefinedFunc.GetFuncParamType(1);
					var ToType: GtType = FuncBlock.DefinedFunc.GetReturnType();
					FromType.SetUnrevealedType(ToType);
					StoreNameSpace = ToType.Context.RootNameSpace;
				}
				SourceToken.ParsedText = FuncName;
				StoreNameSpace.SetConverterFunc(null, null, FuncBlock.DefinedFunc, SourceToken);
			}
			else {
				FuncBlock.SetThisIfInClass(NameSpace.GetType("This"));
				KonohaGrammar.ParseFuncParam(NameSpace, TokenContext, FuncDeclTree, FuncBlock);
				FuncBlock.DefinedFunc = NameSpace.GetFunc(FuncName, 0, TypeList);
				if(FuncBlock.DefinedFunc == null || !FuncBlock.DefinedFunc.IsAbstract()) {
					FuncBlock.DefinedFunc = NameSpace.Context.Generator.CreateFunc(FuncFlag, FuncName, 0, TypeList);
				}
				else {
					FoundAbstractFunc = true;
					FuncBlock.DefinedFunc.FuncFlag = FuncFlag;
				}
				KonohaGrammar.ParseFuncBody(NameSpace, TokenContext, FuncDeclTree, FuncBlock);
				if(!FuncBlock.DefinedFunc.IsAbstract() || !FoundAbstractFunc) {
					if(!FuncBlock.DefinedFunc.Is(MethodFunc) || !FuncBlock.DefinedFunc.Is(OperatorFunc)) {
						StoreNameSpace.AppendFunc(FuncBlock.DefinedFunc, SourceToken);
					}
					var RecvType: GtType = FuncBlock.DefinedFunc.GetRecvType();
					if(RecvType.IsVoidType() || LibGreenTea.EqualsString(FuncBlock.DefinedFunc.FuncName, "_")) {
					}
					else {
						StoreNameSpace.AppendMethod(FuncBlock.DefinedFunc, SourceToken.AddTypeInfoToErrorMessage(RecvType));
					}
				}
			}
			FuncDeclTree.ParsedValue = FuncBlock.DefinedFunc;
			TokenContext.SetRememberFlag(ParseFlag);
		}
		return FuncDeclTree;
	}

	public static TypeFuncDecl(Gamma: GtTypeEnv, ParsedTree: GtSyntaxTree, ContextType: GtType): GtNode {
		var DefinedFunc: GtFunc = <GtFunc>ParsedTree.ParsedValue;
		DefinedFunc.GenerateNativeFunc();
		return Gamma.Generator.CreateEmptyNode(Gamma.VoidType);
	}

	public static ParseGenericFuncDecl(NameSpace: GtNameSpace, TokenContext: GtTokenContext, LeftTree: GtSyntaxTree, Pattern: GtSyntaxPattern): GtSyntaxTree {
		var FuncTree: GtSyntaxTree = TokenContext.CreateSyntaxTree(NameSpace, Pattern, null);
		var RevertList: Array<Object> = new Array<Object>();
		FuncTree.SetMatchedTokenAt(KeyTokenIndex, NameSpace, TokenContext, "<", Required);
		var StartIndex: number = GenericParam;
		while(FuncTree.IsValidSyntax()) {
			var ParamBaseType: GtType = NameSpace.Context.VarType;
			FuncTree.SetMatchedPatternAt(StartIndex, NameSpace, TokenContext, "$Variable$", Required);
			if(TokenContext.MatchToken(":")) {
				FuncTree.SetMatchedPatternAt(StartIndex + 1, NameSpace, TokenContext, "$Type$", Required);
				if(FuncTree.IsValidSyntax()) {
					ParamBaseType = FuncTree.GetSyntaxTreeAt(StartIndex).GetParsedType();
				}
			}
			if(FuncTree.IsValidSyntax()) {
				var SourceToken: GtToken = FuncTree.GetSyntaxTreeAt(StartIndex).KeyToken;
				NameSpace.AppendTypeVariable(SourceToken.ParsedText, ParamBaseType, SourceToken, RevertList);
				
			}
			if(TokenContext.MatchToken(">")) {
				break;
			}
			FuncTree.SetMatchedTokenAt(NoWhere, NameSpace, TokenContext, ",", Required);
			StartIndex += 2;
		}
		FuncTree.SetMatchedPatternAt(GenericReturnType, NameSpace, TokenContext, "$Type$", Required);
		if(FuncTree.IsValidSyntax()) {
			FuncTree = KonohaGrammar.ParseFuncDecl(NameSpace, TokenContext, FuncTree.GetSyntaxTreeAt(GenericReturnType), NameSpace.GetSyntaxPattern("$FuncDecl$"));
			if(FuncTree.IsValidSyntax()) {
				var DefinedFunc: GtFunc = <GtFunc>FuncTree.ParsedValue;
				DefinedFunc.FuncFlag |= GenericFunc;
			}
		}
		NameSpace.Revert(RevertList);
		return FuncTree;
	}

	// constructor
	public static ParseConstructor2(NameSpace: GtNameSpace, TokenContext: GtTokenContext, LeftTree: GtSyntaxTree, Pattern: GtSyntaxPattern): GtSyntaxTree {
		var FuncDeclTree: GtSyntaxTree = TokenContext.CreateMatchedSyntaxTree(NameSpace, Pattern, "constructor");
		var ThisType: GtType = NameSpace.GetType("This");
		if(ThisType == null) {
			NameSpace.Context.ReportError(ErrorLevel, FuncDeclTree.KeyToken, "constructor is used inside class");
			FuncDeclTree.ToError(FuncDeclTree.KeyToken);
			return FuncDeclTree;
		}
		var FuncFlag: number = KonohaGrammar.ParseFuncFlag(ConstructorFunc, TokenContext.ParsingAnnotation);
		var TypeList: Array<GtType> = new Array<GtType>();
		TypeList.add(ThisType);
		FuncDeclTree.SetMatchedTokenAt(NoWhere, NameSpace, TokenContext, "(", Required | OpenSkipIndent);
		if(FuncDeclTree.IsValidSyntax()) {
			var FuncBlock: GtFuncBlock = new GtFuncBlock(NameSpace, TypeList);
			var SourceToken: GtToken = FuncDeclTree.KeyToken;
			var ParseFlag: number = TokenContext.SetBackTrack(false);  // disabled
			var StoreNameSpace: GtNameSpace = NameSpace.GetNameSpace(KonohaGrammar.ParseNameSpaceFlag(0, TokenContext.ParsingAnnotation));
			FuncBlock.SetThisIfInClass(ThisType);
			KonohaGrammar.ParseFuncParam(NameSpace, TokenContext, FuncDeclTree, FuncBlock);
			if(FuncDeclTree.IsValidSyntax()) {
				FuncBlock.DefinedFunc = NameSpace.Context.Generator.CreateFunc(FuncFlag, ThisType.ShortName, 0, FuncBlock.TypeList);
				KonohaGrammar.ParseFuncBody(NameSpace, TokenContext, FuncDeclTree, FuncBlock);
				StoreNameSpace.AppendConstructor(ThisType, FuncBlock.DefinedFunc, SourceToken.AddTypeInfoToErrorMessage(ThisType));
				FuncDeclTree.ParsedValue = FuncBlock.DefinedFunc;
			}
			TokenContext.SetRememberFlag(ParseFlag);
		}
		return FuncDeclTree;
	}

	// Array
	public static ParseNewArray(NameSpace: GtNameSpace, TokenContext: GtTokenContext, LeftTree: GtSyntaxTree, Pattern: GtSyntaxPattern): GtSyntaxTree {
		var ArrayTree: GtSyntaxTree = TokenContext.CreateMatchedSyntaxTree(NameSpace, Pattern, "new");
		ArrayTree.AppendMatchedPattern(NameSpace, TokenContext, "$Type$", Required);
		while(TokenContext.HasNext() && ArrayTree.IsValidSyntax()) {
			ArrayTree.SetMatchedTokenAt(NoWhere, NameSpace, TokenContext, "[", Required);
			ArrayTree.AppendMatchedPattern(NameSpace, TokenContext, "$Expression$", Required);
			ArrayTree.SetMatchedTokenAt(NoWhere, NameSpace, TokenContext, "]", Required);
			if(!TokenContext.IsToken("[")) {
				break;
			}
		}
		return ArrayTree;
	}

	public static TypeNewArray(Gamma: GtTypeEnv, ParsedTree: GtSyntaxTree, ContextType: GtType): GtNode {
		var ArrayType: GtType = ParsedTree.GetSyntaxTreeAt(0).GetParsedType();
		var ArrayNode: GtNode = Gamma.Generator.CreateNewArrayNode(Gamma.ArrayType, ParsedTree);
		var i: number = 1;
		while(i < LibGreenTea.ListSize(ParsedTree.SubTreeList)) {
			var Node: GtNode = ParsedTree.TypeCheckAt(i, Gamma, Gamma.IntType, DefaultTypeCheckPolicy);
			if(Node.IsErrorNode()) {
				return Node;
			}
			ArrayType = Gamma.Context.GetGenericType1(Gamma.ArrayType, ArrayType, true);
			ArrayNode.Append(Node);
			i = i + 1;
		}
		ArrayNode.Type = ArrayType;
		return ArrayNode;
	}

	public static ParseArray(NameSpace: GtNameSpace, TokenContext: GtTokenContext, LeftTree: GtSyntaxTree, Pattern: GtSyntaxPattern): GtSyntaxTree {
		var OldFlag: number = TokenContext.SetSkipIndent(true);
		var ArrayTree: GtSyntaxTree = TokenContext.CreateMatchedSyntaxTree(NameSpace, Pattern, "[");
		while(TokenContext.HasNext() && ArrayTree.IsValidSyntax()) {
			if(TokenContext.MatchToken("]")) {
				break;
			}
			if(TokenContext.MatchToken(",")) {
				continue;
			}
			ArrayTree.AppendMatchedPattern(NameSpace, TokenContext, "$Expression$", Required);
		}
		TokenContext.SetRememberFlag(OldFlag);
		return ArrayTree;
	}

	public static TypeArray(Gamma: GtTypeEnv, ParsedTree: GtSyntaxTree, ContextType: GtType): GtNode {
		var ArrayNode: GtNode = Gamma.Generator.CreateArrayNode(Gamma.ArrayType, ParsedTree);
		var ElemType: GtType = Gamma.VarType;
		if(ContextType.IsArrayType()) {
			ElemType = ContextType.TypeParams[0];
			ArrayNode.Type = ContextType;
		}
		var i: number = 0;
		while(i < LibGreenTea.ListSize(ParsedTree.SubTreeList)) {
			var Node: GtNode = ParsedTree.TypeCheckAt(i, Gamma, ElemType, DefaultTypeCheckPolicy);
			if(Node.IsErrorNode()) {
				return Node;
			}
			if(ElemType.IsVarType()) {
				ElemType = Node.Type;
				ArrayNode.Type = Gamma.Context.GetGenericType1(Gamma.ArrayType, ElemType, true);
			}
			ArrayNode.Append(Node);
			i = i + 1;
		}
		if(ElemType.IsVarType()) {
			ArrayNode.Type = Gamma.Context.GetGenericType1(Gamma.ArrayType, Gamma.AnyType, true);
		}
		return ArrayNode;
	}

	public static ParseSize(NameSpace: GtNameSpace, TokenContext: GtTokenContext, LeftTree: GtSyntaxTree, Pattern: GtSyntaxPattern): GtSyntaxTree {
		var ArrayTree: GtSyntaxTree = TokenContext.CreateMatchedSyntaxTree(NameSpace, Pattern, "|");
		ArrayTree.SetMatchedPatternAt(UnaryTerm, NameSpace, TokenContext, "$SuffixExpression$", Required);
		ArrayTree.SetMatchedTokenAt(NoWhere, NameSpace, TokenContext, "|", Required);
		return ArrayTree;
	}

	public static TypeSize(Gamma: GtTypeEnv, ParsedTree: GtSyntaxTree, ContextType: GtType): GtNode {
		var ExprNode: GtNode = ParsedTree.TypeCheckAt(UnaryTerm, Gamma, Gamma.VarType, DefaultTypeCheckPolicy);
		if(ExprNode.IsErrorNode()) {
			return ExprNode;
		}
		var PolyFunc: GtPolyFunc = Gamma.NameSpace.GetMethod(ExprNode.Type, FuncSymbol("||"), true);
		//System.err.println("polyfunc: " + PolyFunc);
		var Func: GtFunc = PolyFunc.ResolveUnaryMethod(Gamma, ExprNode.Type);
		LibGreenTea.Assert(Func != null);  // any has ||
		Gamma.CheckFunc("operator", Func, ParsedTree.KeyToken);
		var Node: GtNode = Gamma.Generator.CreateApplyNode(Func.GetReturnType(), ParsedTree, Func);
		Node.Append(Gamma.Generator.CreateConstNode(Gamma.VarType, ParsedTree, Func));
		Node.Append(ExprNode);
		return Node;
	}

	public static ParseIndexer(NameSpace: GtNameSpace, TokenContext: GtTokenContext, LeftTree: GtSyntaxTree, Pattern: GtSyntaxPattern): GtSyntaxTree {
		var ArrayTree: GtSyntaxTree = TokenContext.CreateMatchedSyntaxTree(NameSpace, Pattern, "[");
		ArrayTree.AppendParsedTree2(LeftTree);
		var OldFlag: number = TokenContext.SetSkipIndent(true);
		do {
			ArrayTree.AppendMatchedPattern(NameSpace, TokenContext, "$Expression$", Required);
		}
		while(!ArrayTree.IsMismatchedOrError() && TokenContext.MatchToken(","));
		ArrayTree.SetMatchedTokenAt(NoWhere, NameSpace, TokenContext, "]", Required);
		TokenContext.SetRememberFlag(OldFlag);
		var OperatorSymbol: string = "[]";
		if(TokenContext.MatchToken("=")) {
			ArrayTree.AppendMatchedPattern(NameSpace, TokenContext, "$Expression$", Required);
			OperatorSymbol = "[]=";
		}
		if(ArrayTree.IsValidSyntax()) {
			ArrayTree.KeyToken.ParsedText = OperatorSymbol;
		}
		return ArrayTree;
	}
	
	public static TypeIndexer(Gamma: GtTypeEnv, ParsedTree: GtSyntaxTree, Type: GtType): GtNode {
		var RecvNode: GtNode = ParsedTree.TypeCheckAt(LeftHandTerm, Gamma, Gamma.VarType, DefaultTypeCheckPolicy);
		if(!RecvNode.IsErrorNode()) {
			var MethodName: string = ParsedTree.KeyToken.ParsedText;
			var ResolvedFunc: GtResolvedFunc = null;
			var PolyFunc: GtPolyFunc = ParsedTree.NameSpace.GetMethod(RecvNode.Type, FuncSymbol(MethodName), true);
			//System.err.println("polyfunc: " + PolyFunc);
			var ParamList: Array<GtNode> = new Array<GtNode>();
			ParamList.add(RecvNode);
			ResolvedFunc = PolyFunc.ResolveFunc(Gamma, ParsedTree, 1, ParamList);
			if(ResolvedFunc.Func == null) {
				return Gamma.CreateSyntaxErrorNode(ParsedTree, "undefined: " + MethodName + " of " + RecvNode.Type);
			}
			var Node: GtNode = Gamma.Generator.CreateIndexerNode(ResolvedFunc.ReturnType, ParsedTree, ResolvedFunc.Func, RecvNode);
			Node.AppendNodeList(1, ParamList);
			return Node;
		}
		return RecvNode;
	}

	public static ParseSlice(NameSpace: GtNameSpace, TokenContext: GtTokenContext, LeftTree: GtSyntaxTree, Pattern: GtSyntaxPattern): GtSyntaxTree {
		var SliceTree: GtSyntaxTree = TokenContext.CreateMatchedSyntaxTree(NameSpace, Pattern, "[");
		SliceTree.AppendParsedTree2(LeftTree);
		SliceTree.SetMatchedPatternAt(1, NameSpace, TokenContext, "$Expression$", Optional);
		if(!SliceTree.HasNodeAt(1)) {
			SliceTree.SetSyntaxTreeAt(1, SliceTree.CreateConstTree(0)); // s[:x]
		}
		SliceTree.SetMatchedTokenAt(NoWhere, NameSpace, TokenContext, ":", Required);
		SliceTree.AppendMatchedPattern(NameSpace, TokenContext, "$Expression$", Optional);
		SliceTree.SetMatchedTokenAt(NoWhere, NameSpace, TokenContext, "]", Required);
		return SliceTree;
	}

	public static TypeSlice(Gamma: GtTypeEnv, ParsedTree: GtSyntaxTree, ContextType: GtType): GtNode {
		var RecvNode: GtNode = ParsedTree.TypeCheckAt(LeftHandTerm, Gamma, Gamma.VarType, DefaultTypeCheckPolicy);
		if(!RecvNode.IsErrorNode()) {
			return KonohaGrammar.TypeMethodCall(Gamma, ParsedTree, RecvNode, "[:]");
		}
		return RecvNode;
	}

	// ClassDecl

	private static TypeFieldDecl(Gamma: GtTypeEnv, ParsedTree: GtSyntaxTree, ClassField: GtClassField): boolean {
		var FieldFlag: number = KonohaGrammar.ParseVarFlag(0, ParsedTree.Annotation);
		var DeclType: GtType = ParsedTree.GetSyntaxTreeAt(VarDeclType).GetParsedType();
		var FieldName: string = ParsedTree.GetSyntaxTreeAt(VarDeclName).KeyToken.ParsedText;
		var InitValueNode: GtNode = null;
		var InitValue: Object = null;
		if(ParsedTree.HasNodeAt(VarDeclValue)) {
			InitValueNode = ParsedTree.TypeCheckAt(VarDeclValue, Gamma, DeclType, OnlyConstPolicy | NullablePolicy);
			if(InitValueNode.IsErrorNode()) {
				return false;
			}
			InitValue = InitValueNode.ToConstValue(true);
		}
		if(UseLangStat) {
			Gamma.Context.Stat.VarDecl += 1;
		}/*EndOfStat*/
		if(DeclType.IsVarType()) {
			if(InitValueNode == null) {
				DeclType = Gamma.AnyType;
			}
			else {
				DeclType = InitValueNode.Type;
			}
			Gamma.ReportTypeInference(ParsedTree.KeyToken, FieldName, DeclType);
			if(UseLangStat) {
				Gamma.Context.Stat.VarDeclInfer += 1;
				if(DeclType.IsAnyType()) {
					Gamma.Context.Stat.VarDeclInferAny += 1;
				}
			}/*EndOfStat*/
		}
		if(UseLangStat) {
			if(DeclType.IsAnyType()) {
				Gamma.Context.Stat.VarDeclAny += 1;
			}
		}/*EndOfStat*/
		if(InitValueNode == null) {
			InitValue = DeclType.DefaultNullValue;
		}
		ClassField.CreateField(FieldFlag, DeclType, FieldName, ParsedTree.GetSyntaxTreeAt(VarDeclName).KeyToken, InitValue);
		return true;
	}

	public static ParseClassDecl2(NameSpace: GtNameSpace, TokenContext: GtTokenContext, LeftTree: GtSyntaxTree, Pattern: GtSyntaxPattern): GtSyntaxTree {
		var ClassDeclTree: GtSyntaxTree = TokenContext.CreateMatchedSyntaxTree(NameSpace, Pattern, "class");
		ClassDeclTree.SetMatchedPatternAt(ClassDeclName, NameSpace, TokenContext, "$FuncName$", Required); //$ClassName$ is better
		if(TokenContext.MatchToken("extends")) {
			ClassDeclTree.SetMatchedPatternAt(ClassDeclSuperType, NameSpace, TokenContext, "$Type$", Required);
		}
		if(ClassDeclTree.IsMismatchedOrError()) {
			return ClassDeclTree;
		}
		// define new class
		var ClassNameSpace: GtNameSpace = new GtNameSpace(NameSpace.Context, NameSpace);
		var NameToken: GtToken = ClassDeclTree.GetSyntaxTreeAt(ClassDeclName).KeyToken;
		var SuperType: GtType = NameSpace.Context.StructType;
		if(ClassDeclTree.HasNodeAt(ClassDeclSuperType)) {
			SuperType = ClassDeclTree.GetSyntaxTreeAt(ClassDeclSuperType).GetParsedType();
		}
		var ClassFlag: number = KonohaGrammar.ParseClassFlag(0, TokenContext.ParsingAnnotation);
		var ClassName: string = NameToken.ParsedText;
		var DefinedType: GtType = NameSpace.GetType(ClassName);
		if(DefinedType != null && DefinedType.IsAbstract()) {
			DefinedType.TypeFlag = ClassFlag;
			DefinedType.SuperType = SuperType;
			NameToken = null; // preventing duplicated symbol message at (A)
		}
		else {
			DefinedType = SuperType.CreateSubType(ClassFlag, ClassName, null, null);
			ClassNameSpace.AppendTypeName(DefinedType, NameToken);  // temporary
		}
		ClassNameSpace.SetSymbol("This", DefinedType, NameToken);
		ClassDeclTree.SetMatchedPatternAt(ClassDeclBlock, ClassNameSpace, TokenContext, "$Block$", Optional);
		if(ClassDeclTree.HasNodeAt(ClassDeclBlock)) {
			var ClassField: GtClassField = new GtClassField(DefinedType, NameSpace);
			var Gamma: GtTypeEnv = new GtTypeEnv(ClassNameSpace);
			var SubTree: GtSyntaxTree = ClassDeclTree.GetSyntaxTreeAt(ClassDeclBlock);
			while(SubTree != null) {
				if(SubTree.Pattern.EqualsName("$VarDecl$")) {
					KonohaGrammar.TypeFieldDecl(Gamma, SubTree, ClassField);
				}
				SubTree = SubTree.NextTree;
			}
			ClassDeclTree.ParsedValue = ClassField;
		}
		if(ClassDeclTree.IsValidSyntax()) {
			NameSpace.AppendTypeName(DefinedType, NameToken);   /* (A) */
		}
		return ClassDeclTree;
	}

	public static TypeClassDecl2(Gamma: GtTypeEnv, ParsedTree: GtSyntaxTree, ContextType: GtType): GtNode {
		var ClassField: GtClassField = <GtClassField>ParsedTree.ParsedValue;
		if(ClassField != null) {
			var DefinedType: GtType = ClassField.DefinedType;
			DefinedType.SetClassField(ClassField);
			Gamma.Generator.OpenClassField(DefinedType, ClassField);
			var SubTree: GtSyntaxTree = ParsedTree.GetSyntaxTreeAt(ClassDeclBlock);
			var MemberList: Array<GtFunc> = new Array<GtFunc>();
			while(SubTree != null) {
				if(SubTree.Pattern.EqualsName("$FuncDecl$") || SubTree.Pattern.EqualsName("$Constructor2$")) {
					MemberList.add(<GtFunc>SubTree.ParsedValue);
				}
				if(!SubTree.Pattern.EqualsName("$VarDecl$")) {
					SubTree.TypeCheck(Gamma, Gamma.VoidType, DefaultTypeCheckPolicy);
				}
				SubTree = SubTree.NextTree;
			}
			Gamma.Generator.CloseClassField(DefinedType, MemberList);
		}
		return Gamma.Generator.CreateEmptyNode(Gamma.VoidType);
	}

	public LoadTo(NameSpace: GtNameSpace): void {
		// Define Constants
		var Context: GtParserContext = NameSpace.Context;
		NameSpace.SetSymbol("true", true, null);
		NameSpace.SetSymbol("false", false, null);

		NameSpace.AppendTokenFunc(" \t", LibLoadFunc.LoadTokenFunc(Context, this, "WhiteSpaceToken"));
		NameSpace.AppendTokenFunc("\n",  LibLoadFunc.LoadTokenFunc(Context, this, "IndentToken"));
		NameSpace.AppendTokenFunc(";", LibLoadFunc.LoadTokenFunc(Context, this, "SemiColonToken"));
		NameSpace.AppendTokenFunc("{}()[]<>.,?:+-*/%=&|!@~^$", LibLoadFunc.LoadTokenFunc(Context, this, "OperatorToken"));
		NameSpace.AppendTokenFunc("/", LibLoadFunc.LoadTokenFunc(Context, this, "CommentToken"));  // overloading
		NameSpace.AppendTokenFunc("Aa_", LibLoadFunc.LoadTokenFunc(Context, this, "SymbolToken"));

		NameSpace.AppendTokenFunc("\"", LibLoadFunc.LoadTokenFunc(Context, this, "StringLiteralToken"));
		//NameSpace.AppendTokenFunc("\"", GtGrammar.LoadTokenFunc(ParserContext, this, "StringLiteralToken_StringInterpolation"));
		NameSpace.AppendTokenFunc("'", LibLoadFunc.LoadTokenFunc(Context, this, "CharLiteralToken"));
		NameSpace.AppendTokenFunc("1",  LibLoadFunc.LoadTokenFunc(Context, this, "NumberLiteralToken"));

		var ParseUnary: GtFunc     = LibLoadFunc.LoadParseFunc(Context, this, "ParseUnary");
		var TypeUnary: GtFunc      = LibLoadFunc.LoadTypeFunc(Context, this, "TypeUnary");
		var ParseBinary: GtFunc    = LibLoadFunc.LoadParseFunc(Context, this, "ParseBinary");
		var TypeBinary: GtFunc     = LibLoadFunc.LoadTypeFunc(Context, this, "TypeBinary");
		var TypeConst: GtFunc      = LibLoadFunc.LoadTypeFunc(Context, this, "TypeConst");

		NameSpace.AppendSyntax("+", ParseUnary, TypeUnary);
		NameSpace.AppendSyntax("-", ParseUnary, TypeUnary);
		NameSpace.AppendSyntax("~", ParseUnary, TypeUnary);
		NameSpace.AppendSyntax("! not", LibLoadFunc.LoadParseFunc(Context, this, "ParseNot"), LibLoadFunc.LoadTypeFunc(Context, this, "TypeNot"));
		NameSpace.AppendSyntax("++ --", LibLoadFunc.LoadParseFunc(Context, this, "ParseIncl"), LibLoadFunc.LoadTypeFunc(Context, this, "TypeIncl"));

		NameSpace.AppendExtendedSyntax("* / % mod", PrecedenceCStyleMUL, ParseBinary, TypeBinary);
		NameSpace.AppendExtendedSyntax("+ -", PrecedenceCStyleADD, ParseBinary, TypeBinary);

		NameSpace.AppendExtendedSyntax("< <= > >=", PrecedenceCStyleCOMPARE, ParseBinary, TypeBinary);
		NameSpace.AppendExtendedSyntax("== !=", PrecedenceCStyleEquals, ParseBinary, TypeBinary);

		NameSpace.AppendExtendedSyntax("<< >>", PrecedenceCStyleSHIFT, ParseBinary, TypeBinary);
		NameSpace.AppendExtendedSyntax("&", PrecedenceCStyleBITAND, ParseBinary, TypeBinary);
		NameSpace.AppendExtendedSyntax("|", PrecedenceCStyleBITOR, ParseBinary, TypeBinary);
		NameSpace.AppendExtendedSyntax("^", PrecedenceCStyleBITXOR, ParseBinary, TypeBinary);

		NameSpace.AppendExtendedSyntax("=", PrecedenceCStyleAssign | LeftJoin, ParseBinary, LibLoadFunc.LoadTypeFunc(Context, this, "TypeAssign"));
		NameSpace.AppendExtendedSyntax("+= -= *= /= %= <<= >>= & | ^=", PrecedenceCStyleAssign, ParseBinary, LibLoadFunc.LoadTypeFunc(Context, this, "TypeSelfAssign"));
		NameSpace.AppendExtendedSyntax("++ --", 0, LibLoadFunc.LoadParseFunc(Context, this, "ParseIncl"), LibLoadFunc.LoadTypeFunc(Context, this, "TypeIncl"));

		NameSpace.AppendExtendedSyntax("&& and", PrecedenceCStyleAND, ParseBinary, LibLoadFunc.LoadTypeFunc(Context, this, "TypeAnd"));
		NameSpace.AppendExtendedSyntax("|| or", PrecedenceCStyleOR, ParseBinary, LibLoadFunc.LoadTypeFunc(Context, this, "TypeOr"));
		NameSpace.AppendExtendedSyntax("<: instanceof", PrecedenceInstanceof, ParseBinary, LibLoadFunc.LoadTypeFunc(Context, this, "TypeInstanceOf"));

		NameSpace.AppendExtendedSyntax("?", 0, LibLoadFunc.LoadParseFunc(Context, this, "ParseTrinary"), LibLoadFunc.LoadTypeFunc(Context, this, "TypeTrinary"));

		NameSpace.AppendSyntax("$Error$", LibLoadFunc.LoadParseFunc(Context, this, "ParseError"), LibLoadFunc.LoadTypeFunc(Context, this, "TypeError"));
		NameSpace.AppendSyntax("$Empty$", LibLoadFunc.LoadParseFunc(Context, this, "ParseEmpty"), LibLoadFunc.LoadTypeFunc(Context, this, "TypeEmpty"));
		NameSpace.AppendSyntax(";", LibLoadFunc.LoadParseFunc(Context, this, "ParseSemiColon"), null);
		NameSpace.AppendSyntax("$Symbol$", LibLoadFunc.LoadParseFunc(Context, this, "ParseSymbol"), null);
		NameSpace.AppendSyntax("$Type$",LibLoadFunc.LoadParseFunc(Context, this, "ParseType"), TypeConst);
		NameSpace.AppendSyntax("$TypeSuffix$", LibLoadFunc.LoadParseFunc(Context, this, "ParseTypeSuffix"), null);
		NameSpace.AppendSyntax("<", LibLoadFunc.LoadParseFunc(Context, this, "ParseGenericFuncDecl"), null);
		NameSpace.AppendSyntax("$Variable$", LibLoadFunc.LoadParseFunc(Context, this, "ParseVariable"), LibLoadFunc.LoadTypeFunc(Context, this, "TypeVariable"));
		NameSpace.AppendSyntax("$Const$", LibLoadFunc.LoadParseFunc(Context, this, "ParseConst"), TypeConst);
		NameSpace.AppendSyntax("$CharLiteral$", LibLoadFunc.LoadParseFunc(Context, this, "ParseCharLiteral"), LibLoadFunc.LoadTypeFunc(Context, this, "TypeCharLiteral"));
		NameSpace.AppendSyntax("$StringLiteral$", LibLoadFunc.LoadParseFunc(Context, this, "ParseStringLiteral"), TypeConst);
		NameSpace.AppendSyntax("$IntegerLiteral$", LibLoadFunc.LoadParseFunc(Context, this, "ParseIntegerLiteral"), TypeConst);
		NameSpace.AppendSyntax("$FloatLiteral$", LibLoadFunc.LoadParseFunc(Context, this, "ParseFloatLiteral"), TypeConst);

		NameSpace.AppendExtendedSyntax(".", 0, LibLoadFunc.LoadParseFunc(Context, this, "ParseGetter"), LibLoadFunc.LoadTypeFunc(Context, this, "TypeGetter"));
		NameSpace.AppendSyntax("$Setter$", null, LibLoadFunc.LoadTypeFunc(Context, this, "TypeSetter"));
		
		NameSpace.AppendSyntax("(", LibLoadFunc.LoadParseFunc(Context, this, "ParseGroup"), LibLoadFunc.LoadTypeFunc(Context, this, "TypeGroup"));
		NameSpace.AppendSyntax("(", LibLoadFunc.LoadParseFunc(Context, this, "ParseCast"), LibLoadFunc.LoadTypeFunc(Context, this, "TypeCast"));
		NameSpace.AppendExtendedSyntax("(", 0, LibLoadFunc.LoadParseFunc(Context, this, "ParseApply"), LibLoadFunc.LoadTypeFunc(Context, this, "TypeApply"));
		NameSpace.AppendSyntax("[", LibLoadFunc.LoadParseFunc(Context, this, "ParseArray"), LibLoadFunc.LoadTypeFunc(Context, this, "TypeArray"));
		NameSpace.AppendExtendedSyntax("[", 0, LibLoadFunc.LoadParseFunc(Context, this, "ParseIndexer"), LibLoadFunc.LoadTypeFunc(Context, this, "TypeIndexer"));
		NameSpace.AppendExtendedSyntax("[", 0, LibLoadFunc.LoadParseFunc(Context, this, "ParseSlice"), LibLoadFunc.LoadTypeFunc(Context, this, "TypeSlice"));
		NameSpace.AppendSyntax("|", LibLoadFunc.LoadParseFunc(Context, this, "ParseSize"), LibLoadFunc.LoadTypeFunc(Context, this, "TypeSize"));

		NameSpace.AppendSyntax("$Block$", LibLoadFunc.LoadParseFunc(Context, this, "ParseBlock"), null);
		NameSpace.AppendSyntax("$Statement$", LibLoadFunc.LoadParseFunc(Context, this, "ParseStatement"), null);
		NameSpace.AppendSyntax("$Expression$", LibLoadFunc.LoadParseFunc(Context, this, "ParseExpression"), null);
		NameSpace.AppendSyntax("$SuffixExpression$", LibLoadFunc.LoadParseFunc(Context, this, "ParseSuffixExpression"), null);

		NameSpace.AppendSyntax("$FuncName$", LibLoadFunc.LoadParseFunc(Context, this, "ParseFuncName"), TypeConst);
		NameSpace.AppendSyntax("$FuncDecl$", LibLoadFunc.LoadParseFunc(Context, this, "ParseFuncDecl"), LibLoadFunc.LoadTypeFunc(Context, this, "TypeFuncDecl"));
		NameSpace.AppendSyntax("$VarDecl$",  LibLoadFunc.LoadParseFunc(Context, this, "ParseVarDecl"), LibLoadFunc.LoadTypeFunc(Context, this, "TypeVarDecl"));

		NameSpace.AppendSyntax("null", LibLoadFunc.LoadParseFunc(Context, this, "ParseNull"), LibLoadFunc.LoadTypeFunc(Context, this, "TypeNull"));
		NameSpace.AppendSyntax("defined", LibLoadFunc.LoadParseFunc(Context, this, "ParseDefined"), LibLoadFunc.LoadTypeFunc(Context, this, "TypeDefined"));
		NameSpace.AppendSyntax("typeof", LibLoadFunc.LoadParseFunc(Context, this, "ParseTypeOf"), TypeConst);
		NameSpace.AppendSyntax("require", LibLoadFunc.LoadParseFunc(Context, this, "ParseRequire"), null);
		NameSpace.AppendSyntax("import", LibLoadFunc.LoadParseFunc(Context, this, "ParseImport"), LibLoadFunc.LoadTypeFunc(Context, this, "TypeImport"));

		NameSpace.AppendSyntax("if", LibLoadFunc.LoadParseFunc(Context, this, "ParseIf"), LibLoadFunc.LoadTypeFunc(Context, this, "TypeIf"));
		NameSpace.AppendSyntax("while", LibLoadFunc.LoadParseFunc(Context, this, "ParseWhile"), LibLoadFunc.LoadTypeFunc(Context, this, "TypeWhile"));
		NameSpace.AppendSyntax("do", LibLoadFunc.LoadParseFunc(Context, this, "ParseDoWhile"), LibLoadFunc.LoadTypeFunc(Context, this, "TypeDoWhile"));
		NameSpace.AppendSyntax("for", LibLoadFunc.LoadParseFunc(Context, this, "ParseFor"), LibLoadFunc.LoadTypeFunc(Context, this, "TypeFor"));
		NameSpace.AppendSyntax("continue", LibLoadFunc.LoadParseFunc(Context, this, "ParseContinue"), LibLoadFunc.LoadTypeFunc(Context, this, "TypeContinue"));
		NameSpace.AppendSyntax("break", LibLoadFunc.LoadParseFunc(Context, this, "ParseBreak"), LibLoadFunc.LoadTypeFunc(Context, this, "TypeBreak"));
		NameSpace.AppendSyntax("return", LibLoadFunc.LoadParseFunc(Context, this, "ParseReturn"), LibLoadFunc.LoadTypeFunc(Context, this, "TypeReturn"));
		NameSpace.AppendSyntax("let const", LibLoadFunc.LoadParseFunc(Context, this, "ParseSymbolDecl"), null/*GtGrammar.LoadTypeFunc(ParserContext, this, "TypeSymbolDecl")*/);

		NameSpace.AppendSyntax("try", LibLoadFunc.LoadParseFunc(Context, this, "ParseTry"), LibLoadFunc.LoadTypeFunc(Context, this, "TypeTry"));
		NameSpace.AppendSyntax("throw", LibLoadFunc.LoadParseFunc(Context, this, "ParseThrow"), LibLoadFunc.LoadTypeFunc(Context, this, "TypeThrow"));

		NameSpace.AppendSyntax("class", LibLoadFunc.LoadParseFunc(Context, this, "ParseClassDecl2"), LibLoadFunc.LoadTypeFunc(Context, this, "TypeClassDecl2"));
		NameSpace.AppendSyntax("constructor", LibLoadFunc.LoadParseFunc(Context, this, "ParseConstructor2"), LibLoadFunc.LoadTypeFunc(Context, this, "TypeFuncDecl"));
		NameSpace.AppendSyntax("super", LibLoadFunc.LoadParseFunc(Context, this, "ParseSuper"), null);
		NameSpace.AppendSyntax("this", LibLoadFunc.LoadParseFunc(Context, this, "ParseThis"), LibLoadFunc.LoadTypeFunc(Context, this, "TypeThis"));
		NameSpace.AppendSyntax("new", LibLoadFunc.LoadParseFunc(Context, this, "ParseNew"), LibLoadFunc.LoadTypeFunc(Context, this, "TypeApply"));
		NameSpace.AppendSyntax("new", LibLoadFunc.LoadParseFunc(Context, this, "ParseNewArray"), LibLoadFunc.LoadTypeFunc(Context, this, "TypeNewArray"));

		NameSpace.AppendSyntax("enum", LibLoadFunc.LoadParseFunc(Context, this, "ParseEnum"), LibLoadFunc.LoadTypeFunc(Context, this, "TypeEnum"));
		NameSpace.AppendSyntax("switch", LibLoadFunc.LoadParseFunc(Context, this, "ParseSwitch"), LibLoadFunc.LoadTypeFunc(Context, this, "TypeSwitch"));
		NameSpace.AppendSyntax("$CaseBlock$", LibLoadFunc.LoadParseFunc(Context, this, "ParseCaseBlock"), null);

		// expermental
		NameSpace.AppendSyntax("__line__", LibLoadFunc.LoadParseFunc(Context, this, "ParseLine"), LibLoadFunc.LoadTypeFunc(Context, this, "TypeLine"));
		NameSpace.AppendSyntax("__", LibLoadFunc.LoadParseFunc(Context, this, "ParseSymbols"), null);
	}
}
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



class GtUndefinedSymbol {
	public toString(): string {
		return "UndefinedSymbol";
	}
}

/*GreenTeaConst Begin*/

	// Version
	var ProgName: string  = "GreenTeaScript";
	var CodeName: string  = "Reference Implementation of D-Script";
	var MajorVersion: number = 0;
	var MinerVersion: number = 1;
	var PatchLevel: number   = 0;
	var Version: string = "0.1";
	var Copyright: string = "Copyright (c) 2013, JST/CREST DEOS and Konoha project authors";
	var License: string = "BSD-Style Open Source";

	// NameSpaceFlag
	var RootNameSpace: number       = 1 << 0;  // @RootNameSpace
	var PublicNameSpace: number     = 1 << 1;  // @Public

	// ClassFlag
	var ExportType: number         = 1 << 0;  // @Export
	var PublicType: number         = 1 << 1;  // @Public
	var NativeType: number	       = 1 << 2;
	var VirtualType: number		   = 1 << 3;  // @Virtual
	var EnumType: number           = 1 << 4;
	var DeprecatedType: number     = 1 << 5;  // @Deprecated
	var HiddenType: number         = 1 << 6;
	// var is: UnrevealedType var type: a var must: that var hidden: be var users: for
	// var must: WeatType var converted: be var non: to-var by: UnrevealedType StrongCoersion
	// var is: UnrevealedType var only: set var StrongCoersion: if var defined: is
	var UnrevealedType: number           = HiddenType;
	var CommonType: number         = 1 << 7;  // @Common

	var DynamicType: number	       = 1 << 8;  // @Dynamic
	var OpenType: number           = 1 << 9;  // @var for: Open var future: the
	var UnboxType: number          = 1 << 10; 
	var TypeVariable: number       = 1 << 14;
	var GenericVariable: number    = 1 << 15;

	// FuncFlag
	var ExportFunc: number		    = 1 << 0;  // @Export
	var PublicFunc: number          = 1 << 1;  // @Public
	var NativeFunc: number		    = 1 << 2;
	var VirtualFunc: number		    = 1 << 3;
	var ConstFunc: number			= 1 << 4;  // @Const
	var DeprecatedFunc: number      = 1 << 5;  // @Deprecated
	var HiddenFunc: number          = 1 << 6;  // @Hidden
	var CommonFunc: number          = 1 << 7;  // @Common

	var NativeStaticFunc: number	= 1 << 8;
	var NativeMacroFunc: number	    = 1 << 9;
	var NativeVariadicFunc: number	= 1 << 10;
	var ConstructorFunc: number     = 1 << 11;
	var MethodFunc: number          = 1 << 12;  
	var GetterFunc: number          = 1 << 13;
	var SetterFunc: number          = 1 << 14;
	var OperatorFunc: number        = 1 << 15;  //@Operator
	var ConverterFunc: number       = 1 << 16;
	var CoercionFunc: number        = 1 << 17;  //@Coercion
	var StrongCoercionFunc: number  = 1 << 18;  //@StrongCoercion
	var GenericFunc: number         = 1 << 15;
	var LazyFunc: number		    = 1 << 16;
	
	// VarFlag
	var ReadOnlyVar: number = 1;              // @var x: ReadOnly = 1; var x: disallow = 2
	//var MutableFieldVar: int  = (1 << 1);  // @var x: Mutable; x.y = 1 var allowed: is

	var MismatchedPosition: number		= -1;
	var Required: number          = (1 << 0);
	var Optional: number          = (1 << 1);
	var AllowLineFeed: number     = (1 << 2);
	var AllowAnnotation: number   = (1 << 3);
	var OpenSkipIndent: number    = (1 << 4);
	var CloseSkipIndent: number   = (1 << 5);

		
	var ErrorLevel: number						= 0;
	var TypeErrorLevel: number                  = 1;
	var WarningLevel: number					= 2;
	var InfoLevel: number					    = 3;

	var NullChar: number				= 0;
	var UndefinedChar: number			= 1;
	var DigitChar: number				= 2;
	var UpperAlphaChar: number			= 3;
	var LowerAlphaChar: number			= 4;
	var UnderBarChar: number			= 5;
	var NewLineChar: number				= 6;
	var TabChar: number					= 7;
	var SpaceChar: number				= 8;
	var OpenParChar: number				= 9;
	var CloseParChar: number			= 10;
	var OpenBracketChar: number			= 11;
	var CloseBracketChar: number		= 12;
	var OpenBraceChar: number			= 13;
	var CloseBraceChar: number			= 14;
	var LessThanChar: number			= 15;
	var GreaterThanChar: number			= 16;
	var QuoteChar: number				= 17;
	var DoubleQuoteChar: number			= 18;
	var BackQuoteChar: number			= 19;
	var SurprisedChar: number			= 20;
	var SharpChar: number				= 21;
	var DollarChar: number				= 22;
	var PercentChar: number				= 23;
	var AndChar: number					= 24;
	var StarChar: number				= 25;
	var PlusChar: number				= 26;
	var CommaChar: number				= 27;
	var MinusChar: number				= 28;
	var DotChar: number					= 29;
	var SlashChar: number				= 30;
	var ColonChar: number				= 31;
	var SemiColonChar: number			= 32;
	var EqualChar: number				= 33;
	var QuestionChar: number			= 34;
	var AtmarkChar: number				= 35;
	var VarChar: number					= 36;
	var ChilderChar: number				= 37;
	var BackSlashChar: number			= 38;
	var HatChar: number					= 39;
	var UnicodeChar: number				= 40;
	var MaxSizeOfChars: number          = 41;

	var CharMatrix: number[] = [
		/*nul soh stx etx eot enq ack bel*/
		0, 1, 1, 1, 1, 1, 1, 1,
		/*bs ht nl vt np cr so si  */
		1, TabChar, NewLineChar, 1, 1, NewLineChar, 1, 1,
		/*020 dle  021 dc1  022 dc2  023 dc3  024 dc4  025 nak  026 syn  027 etb */
		1, 1, 1, 1, 1, 1, 1, 1,
		/*030 can  031 em   032 sub  033 esc  034 fs   035 gs   036 rs   037 us */
		1, 1, 1, 1, 1, 1, 1, 1,
		/*040 sp   041  !   042  "   043  #   044  $   045  %   046  &   047  ' */
		SpaceChar, SurprisedChar, DoubleQuoteChar, SharpChar, DollarChar, PercentChar, AndChar, QuoteChar,
		/*050  (   051  )   052  *   053  +   054  ,   055  -   056  .   057  / */
		OpenParChar, CloseParChar, StarChar, PlusChar, CommaChar, MinusChar, DotChar, SlashChar,
		/*060  0   061  1   062  2   063  3   064  4   065  5   066  6   067  7 */
		DigitChar, DigitChar, DigitChar, DigitChar, DigitChar, DigitChar, DigitChar, DigitChar,
		/*070  8   071  9   072  :   073  ;   074  <   075  =   076  >   077  ? */
		DigitChar, DigitChar, ColonChar, SemiColonChar, LessThanChar, EqualChar, GreaterThanChar, QuestionChar,
		/*100  @   101  A   102  B   103  C   104  D   105  E   106  F   107  G */
		AtmarkChar, UpperAlphaChar, UpperAlphaChar, UpperAlphaChar, UpperAlphaChar, UpperAlphaChar, UpperAlphaChar, UpperAlphaChar,
		/*110  H   111  I   112  J   113  K   114  L   115  M   116  N   117  O */
		UpperAlphaChar, UpperAlphaChar, UpperAlphaChar, UpperAlphaChar, UpperAlphaChar, UpperAlphaChar, UpperAlphaChar, UpperAlphaChar,
		/*120  P   121  Q   122  R   123  S   124  T   125  U   126  V   127  W */
		UpperAlphaChar, UpperAlphaChar, UpperAlphaChar, UpperAlphaChar, UpperAlphaChar, UpperAlphaChar, UpperAlphaChar, UpperAlphaChar,
		/*130  X   131  Y   132  Z   133  [   134  \   135  ]   136  ^   137  _ */
		UpperAlphaChar, UpperAlphaChar, UpperAlphaChar, OpenBracketChar, BackSlashChar, CloseBracketChar, HatChar, UnderBarChar,
		/*140  `   141  a   142  b   143  c   144  d   145  e   146  f   147  g */
		BackQuoteChar, LowerAlphaChar, LowerAlphaChar, LowerAlphaChar, LowerAlphaChar, LowerAlphaChar, LowerAlphaChar, LowerAlphaChar,
		/*150  h   151  i   152  j   153  k   154  l   155  m   156  n   157  o */
		LowerAlphaChar, LowerAlphaChar, LowerAlphaChar, LowerAlphaChar, LowerAlphaChar, LowerAlphaChar, LowerAlphaChar, LowerAlphaChar,
		/*160  p   161  q   162  r   163  s   164  t   165  u   166  v   167  w */
		LowerAlphaChar, LowerAlphaChar, LowerAlphaChar, LowerAlphaChar, LowerAlphaChar, LowerAlphaChar, LowerAlphaChar, LowerAlphaChar,
		/*170  x   171  y   172  z   173  {   174  |   175  }   176  ~   177 del*/
		LowerAlphaChar, LowerAlphaChar, LowerAlphaChar, OpenBraceChar, VarChar, CloseBraceChar, ChilderChar, 1,
		]

	// TokenFlag
	var SourceTokenFlag: number	    = 1;
	var ErrorTokenFlag: number	    = (1 << 1);
	var IndentTokenFlag: number	    = (1 << 2);
	var WhiteSpaceTokenFlag: number	= (1 << 3);
	var DelimTokenFlag: number	    = (1 << 4);
	var QuotedTokenFlag: number	    = (1 << 5);
	var NameSymbolTokenFlag: number	  = (1 << 6);

	// ParseFlag
	var BackTrackParseFlag: number	= 1;
	var SkipIndentParseFlag: number	= (1 << 1);

	// SyntaxTree
	var KeyTokenIndex: number   = -2;
	var NoWhere: number         = -1;
	// UnaryTree, SuffixTree
	var UnaryTerm: number      = 0;
	// BinaryTree
	var LeftHandTerm: number	= 0;
	var RightHandTerm: number	= 1;

	// IfStmt
	var IfCond: number	= 0;
	var IfThen: number	= 1;
	var IfElse: number	= 2;

	// while(cond) {...}
	var WhileCond: number = 0;
	var WhileBody: number = 1;

	// for(init; cond; iter) {...}
	var ForInit: number = 0;
	var ForCond: number = 1;
	var ForIteration: number = 2;
	var ForBody: number = 3;

	// ReturnStmt
	var ReturnExpr: number	= 0;

	// var N = 1;
	var VarDeclType: number		= 0;
	var VarDeclName: number		= 1;
	var VarDeclValue: number	= 2;
	var VarDeclScope: number	= 3;

//	//var Call: Func;
//	var CallExpressionIndex: int	= 0;
//	var CallParameterIndex: int		= 1;

	// var Decl: Const;
	var SymbolDeclClassIndex: number	= 0;
	var SymbolDeclNameIndex: number	= 1;
	var SymbolDeclValueIndex: number	= 2;

	// var Decl: Func;
	var FuncDeclReturnType: number	= 0;
	var FuncDeclClass: number		= 1;
	var FuncDeclName: number		= 2;
	var FuncDeclBlock: number		= 3;
	var FuncGenericOption: number   = 4;
	var FuncDeclParam: number		= 5;

	var GenericReturnType: number   = 0;
	var GenericParam: number        = 1;

	// var Decl: Class;
	var ClassDeclName: number		= 0;
	var ClassDeclSuperType: number	= 1;
	var ClassDeclBlock: number      = 2;
	var ClassDeclFieldStartIndex: number    = 2;

	// try-catch
	var TryBody: number         = 0;
	var CatchVariable: number   = 1;
	var CatchBody: number       = 2;
	var FinallyBody: number     = 3;

	// switch-case
	var SwitchCaseCondExpr: number = 0;
	var SwitchCaseDefaultBlock: number = 1;
	var SwitchCaseCaseIndex: number = 2;

	// Enum
	var EnumNameTreeIndex: number = 0;

	var BinaryOperator: number					= 1;
	var LeftJoin: number						= 1 << 1;
	var PrecedenceShift: number					= 3;
	var PrecedenceCStyleMUL: number			    = (100 << PrecedenceShift) | BinaryOperator;
	var PrecedenceCStyleADD: number			    = (200 << PrecedenceShift) | BinaryOperator;
	var PrecedenceCStyleSHIFT: number			= (300 << PrecedenceShift) | BinaryOperator;
	var PrecedenceCStyleCOMPARE: number		    = (400 << PrecedenceShift) | BinaryOperator;
	var PrecedenceInstanceof: number            = PrecedenceCStyleCOMPARE;
	var PrecedenceCStyleEquals: number			= (500 << PrecedenceShift) | BinaryOperator;
	var PrecedenceCStyleBITAND: number			= (600 << PrecedenceShift) | BinaryOperator;
	var PrecedenceCStyleBITXOR: number			= (700 << PrecedenceShift) | BinaryOperator;
	var PrecedenceCStyleBITOR: number			= (800 << PrecedenceShift) | BinaryOperator;
	var PrecedenceCStyleAND: number			    = (900 << PrecedenceShift) | BinaryOperator;
	var PrecedenceCStyleOR: number				= (1000 << PrecedenceShift) | BinaryOperator;
	var PrecedenceCStyleTRINARY: number		    = (1100 << PrecedenceShift) | BinaryOperator;				/* ? : */
	var PrecedenceCStyleAssign: number			= (1200 << PrecedenceShift) | BinaryOperator;
	var PrecedenceCStyleCOMMA: number			= (1300 << PrecedenceShift) | BinaryOperator;

	var DefaultTypeCheckPolicy: number			= 0;
	var NoCheckPolicy: number                   = 1;
	var CastPolicy: number                      = (1 << 1);
	var IgnoreEmptyPolicy: number               = (1 << 2);
	var AllowEmptyPolicy: number                = (1 << 3);
	var AllowVoidPolicy: number                 = (1 << 4);
	var AllowCoercionPolicy: number             = (1 << 5);
	var OnlyConstPolicy: number                 = (1 << 6);
	var NullablePolicy: number                  = (1 << 8);
	var BlockPolicy: number                     = (1 << 7);

	var UndefinedSymbol: Object = new GtUndefinedSymbol();
	var NativeNameSuffix: string = "__";

	var UseLangStat: boolean = true;

	var VerboseSymbol: number    = 1;
	var VerboseType: number      = (1 << 1);
	var VerboseFunc: number      = (1 << 2);
	var VerboseEval: number      = (1 << 3);
	var VerboseToken: number     = (1 << 4);
	var VerboseUndefined: number   = (1 << 5);

	var VerboseNative: number    = (1 << 6);
	var VerboseFile: number      = (1 << 7);
	var VerboseException: number = (1 << 8);

	var VerboseRuntime: number   = (1 << 9);

/*GreenTeaConst End*/

/*GreenTeaUtils Begin*/
	function IsFlag(flag: number, flag2: number): boolean {
		return ((flag & flag2) == flag2);
	}

	function UnsetFlag(flag: number, flag2: number): number {
		return (flag & (~flag2));
	}

	function JoinStrings(Unit: string, Times: number): string {
		var s: string = "";
		var i: number = 0;
		while(i < Times) {
			s = s + Unit;
			i = i + 1;
		}
		return s;
	}

	function AsciiToTokenMatrixIndex(c: number): number {
		if(c < 128) {
			return CharMatrix[c];
		}
		return UnicodeChar;
	}

	function n2s(n: number): string {
		if(n < (27)) {
			return LibGreenTea.CharToString(<number>(65 + (n - 0)));
		}
		else if(n < (27 + 10)) {
			return LibGreenTea.CharToString(<number>(48 + (n - 27)));
		}
		else {
			return LibGreenTea.CharToString(<number>(97 + (n - 37)));
		}
	}

	function NumberToAscii(number: number): string {
		if(number >= 3600) {
			return n2s(number / 3600) + NumberToAscii(number % 3600);
		}
		return n2s((number / 60)) + n2s((number % 60));
	}

	function NativeVariableName(Name: string, Index: number): string {
		return Name + NativeNameSuffix + Index;
	}

	function ClassSymbol(ClassType: GtType, Symbol: string): string {
		return ClassType.GetUniqueName() + "." + Symbol;
	}

	function ClassStaticSymbol(ClassType: GtType, Symbol: string): string {
		return ClassType.GetUniqueName() + ".@" + Symbol;
	}

	function FuncSymbol(Symbol: string): string {
		return LibGreenTea.IsVariableName(Symbol, 0) ? Symbol : "__" + Symbol;
	}

	function ConverterSymbol(ClassType: GtType): string {
		return ClassType.GetUniqueName();
	}

	function ConstructorSymbol(): string {
		return "";
	}

	function GetterSymbol(Symbol: string): string {
		return Symbol + "+";
	}

	function SetterSymbol(Symbol: string): string {
		return Symbol + "=";
	}

	function MangleGenericType(BaseType: GtType, BaseIdx: number, TypeList: Array<GtType>): string {
		var s: string = BaseType.ShortName + NativeNameSuffix;
		var i: number = BaseIdx;
		while(i < LibGreenTea.ListSize(TypeList)) {
			var Type: GtType = TypeList.get(i);
			if(Type.IsTypeVariable()) {
				s = s + Type.ShortName;
			}
			else {
				s = s + NumberToAscii(TypeList.get(i).TypeId);
			}
			i = i + 1;
		}
		return s;
	}

	function ApplyTokenFunc(TokenFunc: GtTokenFunc, TokenContext: GtTokenContext, ScriptSource: string, Pos: number): number {
		while(TokenFunc != null) {
			var NextIdx: number = <number>LibGreenTea.ApplyTokenFunc(TokenFunc.Func, TokenContext, ScriptSource, Pos);
			if(NextIdx > Pos) return NextIdx;
			TokenFunc = TokenFunc.ParentFunc;
		}
		return MismatchedPosition;
	}

	function MergeSyntaxPattern(Pattern: GtSyntaxPattern, Parent: GtSyntaxPattern): GtSyntaxPattern {
		if(Parent == null) return Pattern;
		var MergedPattern: GtSyntaxPattern = new GtSyntaxPattern(Pattern.PackageNameSpace, Pattern.PatternName, Pattern.MatchFunc, Pattern.TypeFunc);
		MergedPattern.ParentPattern = Parent;
		return MergedPattern;
	}

	function IsMismatchedOrError(Tree: GtSyntaxTree): boolean {
		return (Tree == null || Tree.IsMismatchedOrError());
	}

	function IsValidSyntax(Tree: GtSyntaxTree): boolean {
		return !(IsMismatchedOrError(Tree));
	}

	function TreeHead(Tree: GtSyntaxTree): GtSyntaxTree {
		if(Tree != null) {
			while(Tree.PrevTree != null) {
				Tree = Tree.PrevTree;
			}
		}
		return Tree;
	}

	function TreeTail(Tree: GtSyntaxTree): GtSyntaxTree {
		if(Tree != null) {
			while(Tree.NextTree != null) {
				Tree = Tree.NextTree;
			}
		}
		return Tree;
	}

	function LinkTree(LastNode: GtSyntaxTree, Node: GtSyntaxTree): GtSyntaxTree {
		Node.PrevTree = LastNode;
		if(LastNode != null) {
			LastNode.NextTree = Node;
		}
		return TreeTail(Node);
	}

	function ApplySyntaxPattern(NameSpace: GtNameSpace, TokenContext: GtTokenContext, LeftTree: GtSyntaxTree, Pattern: GtSyntaxPattern): GtSyntaxTree {
		var Pos: number = TokenContext.GetPosition(0);
		var ParseFlag: number = TokenContext.ParseFlag;
		var CurrentPattern: GtSyntaxPattern = Pattern;
		while(CurrentPattern != null) {
			var delegate: GtFunc = CurrentPattern.MatchFunc;
			TokenContext.RollbackPosition(Pos, 0);
			if(CurrentPattern.ParentPattern != null) {   // This means it has next patterns
				TokenContext.ParseFlag = ParseFlag | BackTrackParseFlag;
			}
			//LibGreenTea.DebugP("B :" + JoinStrings("  ", TokenContext.IndentLevel) + CurrentPattern + ", next=" + CurrentPattern.ParentPattern);
			TokenContext.IndentLevel += 1;
			var ParsedTree: GtSyntaxTree = <GtSyntaxTree>LibGreenTea.ApplyParseFunc(delegate, NameSpace, TokenContext, LeftTree, CurrentPattern);
			TokenContext.IndentLevel -= 1;
			TokenContext.ParseFlag = ParseFlag;
			if(ParsedTree != null && ParsedTree.IsMismatched()) {
				ParsedTree = null;
			}
			//LibGreenTea.DebugP("E :" + JoinStrings("  ", TokenContext.IndentLevel) + CurrentPattern + " => " + ParsedTree);
			if(ParsedTree != null) {
				return ParsedTree;
			}
			CurrentPattern = CurrentPattern.ParentPattern;
		}
		if(TokenContext.IsAllowedBackTrack()) {
			TokenContext.RollbackPosition(Pos, 0);
		}
		else {
			TokenContext.SkipErrorStatement();
		}
		if(Pattern == null) {
			LibGreenTea.VerboseLog(VerboseUndefined, "undefined syntax pattern: " + Pattern);
		}
		return TokenContext.ReportExpectedPattern(Pattern);
	}

	// typing
	function ApplyTypeFunc(TypeFunc: GtFunc, Gamma: GtTypeEnv, ParsedTree: GtSyntaxTree, Type: GtType): GtNode {
		if(TypeFunc != null) {
			Gamma.NameSpace = ParsedTree.NameSpace;
			return <GtNode>LibGreenTea.ApplyTypeFunc(TypeFunc, Gamma, ParsedTree, Type);
		}
		return Gamma.Generator.CreateEmptyNode(Gamma.VoidType);
	}

	function LinkNode(LastNode: GtNode, Node: GtNode): GtNode {
		Node.PrevNode = LastNode;
		if(LastNode != null) {
			LastNode.NextNode = Node;
// IMIFU
//			if(Node.ParentNode != null) {
//				Node.ParentNode.SetParent(LastNode);
//			}
		}
		return Node;
	}

	function TypeBlock(Gamma: GtTypeEnv, ParsedTree: GtSyntaxTree, ContextType: GtType): GtNode {
		var StackTopIndex: number = Gamma.StackTopIndex;
		var LastNode: GtNode = null;
		while(ParsedTree != null) {
			var Node: GtNode = ApplyTypeFunc(ParsedTree.Pattern.TypeFunc, Gamma, ParsedTree, Gamma.VoidType);
			Node = Gamma.TypeCheckSingleNode(ParsedTree, Node, Gamma.VoidType, DefaultTypeCheckPolicy);
			LastNode = LinkNode(LastNode, Node);
			if(Node.IsErrorNode()) {
				break;
			}
			ParsedTree = ParsedTree.NextTree;
		}
		Gamma.PushBackStackIndex(StackTopIndex);
		if(LastNode == null) {
			return Gamma.Generator.CreateEmptyNode(Gamma.VoidType);
		}
		return LastNode.MoveHeadNode();
	}



 class GtStat {
	public VarDeclAny: number;
	public VarDeclInferAny: number;
	public VarDeclInfer: number;
	public VarDecl: number;

	public MatchCount: number;
	public BacktrackCount: number;  // To count how many times backtracks happen.

	constructor() {
		this.VarDecl = 0;
		this.VarDeclInfer = 0;
		this.VarDeclAny = 0;
		this.VarDeclInferAny = 0;

		this.MatchCount     = 0;
		this.BacktrackCount = 0;
	}
}

class GreenTeaScript {
	public  static ExecCommand(Args: string[]): void {
		var TargetCode: string = "exe";  // self executable
		var GeneratorFlag: number = 0;
		var OneLiner: string = null;
		var RequiredLibName: string= null;
		var OutputFile: string = "-";  // stdout
		var Index: number = 0;
		var ShellMode: boolean = false;
		while(Index < Args.length) {
			var Argu: string = Args[Index];
			if(!Argu.startsWith("-")) {
				break;
			}
			Index += 1;
			if((Argu.equals("-e") || Argu.equals("--eval")) && Index < Args.length) {
				OneLiner = Args[Index];
				Index += 1;
				continue;
			}
			if((Argu.equals("-o") || Argu.equals("--out")) && Index < Args.length) {
				if(!Args[Index].endsWith(".green")) {  // for safety
					OutputFile = Args[Index];
					Index += 1;
					continue;
				}
			}
			if((Argu.equals("-l") || Argu.equals("--lang")) && Index < Args.length) {
				if(!Args[Index].endsWith(".green")) {  // for safety
					TargetCode = Args[Index];
					Index += 1;
					continue;
				}
			}
			if((Argu.equals("-r") || Argu.equals("--require")) && Index < Args.length) {
				RequiredLibName = Args[Index];
				Index += 1;
				continue;
			}
			if(Argu.equals("-i")) {
				ShellMode = true;
				continue;
			}
			if(LibGreenTea.EqualsString(Argu, "--verbose")) {
				LibGreenTea.DebugMode = true;
				LibGreenTea.VerboseMask |= (VerboseFile|VerboseSymbol|VerboseNative);
				continue;
			}
			if(LibGreenTea.EqualsString(Argu, "--verbose:token")) {
				LibGreenTea.VerboseMask |= VerboseToken;
				continue;
			}
			if(LibGreenTea.EqualsString(Argu, "--verbose:type")) {
				LibGreenTea.VerboseMask |= VerboseType;
				continue;
			}
			if(LibGreenTea.EqualsString(Argu, "--verbose:symbol")) {
				LibGreenTea.VerboseMask |= VerboseSymbol;
				continue;
			}
			if(LibGreenTea.EqualsString(Argu, "--verbose:native")) {
				LibGreenTea.VerboseMask |= VerboseNative;
				continue;
			}
			if(LibGreenTea.EqualsString(Argu, "--verbose:func")) {
				LibGreenTea.VerboseMask |= VerboseFunc;
				continue;
			}
			if(LibGreenTea.EqualsString(Argu, "--verbose:all")) {
				LibGreenTea.VerboseMask = -1;
				continue;
			}
			if(LibGreenTea.EqualsString(Argu, "--verbose:no")) {
				LibGreenTea.VerboseMask = 0;
				continue;
			}
			LibGreenTea.Usage(Argu + " is unknown");
		}
		var Generator: GtGenerator = LibGreenTea.CodeGenerator(TargetCode, OutputFile, GeneratorFlag);
		if(Generator == null) {
			LibGreenTea.Usage("no target: " + TargetCode);
		}
		var Context: GtParserContext = new GtParserContext(new KonohaGrammar(), Generator);
		// USE require dshell;
		// Context.LoadGrammar(new DShellGrammar());
		if(RequiredLibName != null) {
			if(!Context.TopLevelNameSpace.LoadRequiredLib(RequiredLibName)) {
				LibGreenTea.Exit(1, "failed to load required library: " + RequiredLibName);
			}
		}
		if(OneLiner != null) {
			Context.TopLevelNameSpace.Eval(OneLiner, 1);
		}
		if(!(Index < Args.length)) {
			ShellMode = true;
		}
		while(Index < Args.length) {
			var ScriptText: string = LibGreenTea.LoadFile2(Args[Index]);
			if(ScriptText == null) {
				LibGreenTea.Exit(1, "file not found: " + Args[Index]);
			}
			var FileLine: number = Context.GetFileLine(Args[Index], 1);
			var Success: boolean = Context.TopLevelNameSpace.Load(ScriptText, FileLine);
			Context.ShowReportedErrors();
			if(!Success) {
				LibGreenTea.Exit(1, "abort loading: " + Args[Index]);
			}
			Index += 1;
		}
		if(ShellMode) {
			LibGreenTea.println(ProgName + Version + " (" + CodeName + ") on " + LibGreenTea.GetPlatform());
			LibGreenTea.println(Copyright);
			Context.ShowReportedErrors();
			var linenum: number = 1;
			var Line: string = null;
			while((Line = LibGreenTea.ReadLine2(">>> ", "    ")) != null) {
				try {
					var EvaledValue: Object = Context.TopLevelNameSpace.Eval(Line, linenum);
					Context.ShowReportedErrors();
					if(EvaledValue != null) {
						LibGreenTea.println(" (" + Context.GuessType(EvaledValue) + ":" + LibGreenTea.GetClassName(EvaledValue) + ") " + LibGreenTea.Stringify(EvaledValue));
					}
					linenum += 1;
				}
				catch(e) {
					e.printStackTrace();
				}
			}
			LibGreenTea.println("");
		}
		else {
			Generator.FlushBuffer();
		}
	}

	public  static main(Args: string[]): void  {
		GreenTeaScript.ExecCommand(Args);
	}
}
var GreenTeaLibraries: { [key: string]: string; } = {};
GreenTeaLibraries["lib/bash/common.green"] = "int \"+\"(int x) as \"(($1))\";\n\nint \"-\"(int x) as \"((-$1))\";\n\nint \"~\"(int x) as \"((~$1))\";\n\nint \"+\"(int x, int y)      as \"(($1 + $2))\";\n\nint \"-\"(int x, int y)      as \"(($1 - $2))\";\n\nint \"*\"(int x, int y)      as \"(($1 * $2))\";\n\nint \"/\"(int x, int y)      as \"(($1 / $2))\";\n\nint \"%\"(int x, int y)      as \"(($1 % $2))\";\n\nint \"<<\"(int x, int y)     as \"(($1 << $2))\";\n\nint \">>\"(int x, int y)     as \"(($1 >> $2))\";\n\nint \"^\"(int x, int y)      as \"(($1 ^ $2))\";\n\nint \"|\"(int x, int y)      as \"(($1 | $2))\";\n\nint \"&\"(int x, int y)      as \"(($1 & $2))\";\n\nboolean \"<\"(int x,  int y) as \"(($1 < $2))\";\n\nboolean \"<=\"(int x, int y) as \"(($1 <= $2))\";\n\nboolean \">\"(int x,  int y) as \"(($1 > $2))\";\n\nboolean \">=\"(int x, int y) as \"(($1 >= $2))\";\n\nboolean \"==\"(int x, int y) as \"(($1 == $2))\";\n\nboolean \"!=\"(int x, int y) as \"(($1 != $2))\";\n\n\n\nString  \"+\"(String x, String y) as \"(concat $1 $2)\";\n\nboolean \"==\"(String x, String y) as \"(eqStr $1 $2)\";\n\nboolean \"!=\"(String x, String y) as \"(neStr $1 $2)\";\n\n\n\nboolean not(boolean x)   as \"(notBool $1)\";\n\nboolean \"!\"(boolean x)    as \"(notBool $1)\";\n\nboolean \"==\"(boolean x, boolean y) as \"(($1 == $2))\";\n\nboolean \"!=\"(boolean x, boolean y) as \"(($1 != $2))\";\n\n\n\nboolean \"==\"(any x, any y) as \"(eqAny $1 $2)\";\n\nboolean \"!=\"(any x, any y) as \"(neAny $1 $2)\";\n\n\n\nvoid print(String x) as \"print $1\";\n\nvoid println(String x) as \"println $1\";\n\nvoid assert(boolean x) as \"assert $1\";\n\n\n\nvoid rec(int n) as \"rec $1\";\n";
GreenTeaLibraries["lib/c/common.green"] = "// common api for c\n\n\n\n// unary operator\n\n@Const @Operator boolean \"!\"(boolean x) as \"! $1\"\n\n@Const @Operator int \"+\"(int x) as \"$1\";\n\n@Const @Operator int \"-\"(int x) as \"-$1\";\n\n@Const @Operator int \"~\"(int x) as \"~$1\";\n\n@Const @Operator double \"+\"(double x) as \"$1\";\n\n@Const @Operator double \"-\"(double x) as \"-$1\";\n\n\n\n// binary operator\n\n// any\n\n@Const @Operator boolean \"==\"(any x, any y) as \"$1  == $2\";\n\n@Const @Operator boolean \"!=\"(any x, any y) as \"$1  != $2\";\n\n\n\n// boolean\n\n@Const @Operator boolean \"==\"(boolean x, boolean y) as \"$1  == $2\";\n\n@Const @Operator boolean \"!=\"(boolean x, boolean y) as \"$1  != $2\";\n\n@Const @Operator String converter(boolean x) as \"greentea_tostrb($1)\";\n\n\n\n// int \n\n@Const @Operator int     \"+\"(int x, int y)      as \"$1 + $2\";\n\n@Const @Operator int     \"-\"(int x, int y)      as \"$1 - $2\";\n\n@Const @Operator int     \"*\"(int x, int y)      as \"$1 * $2\";\n\n@Const @Operator int     \"/\"(int x, int y)      as \"$1 / $2\";\n\n@Const @Operator int     \"%\"(int x, int y)      as \"$1 % $2\";\n\n@Const @Operator int     \"<<\"(int x, int y)     as \"$1 << $2\";\n\n@Const @Operator int     \">>\"(int x, int y)     as \"$1 >> $2\";\n\n@Const @Operator int     \"^\"(int x, int y)      as \"$1 ^ $2\";\n\n@Const @Operator int     \"|\"(int x, int y)      as \"$1 | $2\";\n\n@Const @Operator int     \"&\"(int x, int y)      as \"$1 & $2\";\n\n@Const @Operator boolean \"<\"(int x,  int y) as \"$1 < $2\";\n\n@Const @Operator boolean \">\"(int x,  int y) as \"$1 > $2\";\n\n@Const @Operator boolean \"<=\"(int x, int y) as \"$1 <= $2\";\n\n@Const @Operator boolean \">=\"(int x, int y) as \"$1 >= $2\";\n\n@Const @Operator boolean \"==\"(int x, int y) as \"$1 == $2\";\n\n@Const @Operator boolean \"!=\"(int x, int y) as \"$1 != $2\";\n\n\n\n@Coercion @Const any converter(int x)    as \"greentea_boxi($2)\";\n\n@Coercion @Const int converter(any x)    as \"greentea_unboxi($2)\";\n\n@Coercion @Const String converter(int x) as \"greentea_tostr($2)\";\n\n@Const int converter(String x)           as \"strtol($2, NULL, 10)\";\n\n\n\n\n\n// String\n\n@Const @Operator String  \"+\"(String x, String y)      as \"greentea_strcat($1, $2)\";\n\n@Const @Operator boolean \"==\"(String x, String y)    as \"strcmp($1, $2) == 0\";\n\n@Const @Operator boolean \"!=\"(String x, String y)    as \"strcmp($1, $2) != 0\";\n\n@Const @Operator boolean \"<\"(String x,  String y)    as \"strcmp($1, $2) <  0\";\n\n@Const @Operator boolean \">\"(String x,  String y)    as \"strcmp($1, $2) >  0\";\n\n@Const @Operator boolean \"<=\"(String x, String y)    as \"strcmp($1, $2) <= 0\";\n\n@Const @Operator boolean \">=\"(String x, String y)    as \"strcmp($1, $2) >= 0\";\n\n\n\nboolean startsWith(String x, String y)   as \"greentea_startswith($1, $2)\";\n\nboolean endsWith(String x, String y)     as \"greentea_endswith($1, $2)\";\n\nint indexOf(String x, String sub)        as \"strstr($1, $2)\";\n\nint lastIndexOf(String x, String sub)    as \"greentea_lastIndexOf($1, $2)\";\n\nString substring(String x, int s)        as \"greentea_substring($1, $2, strlen($1))\"\n\nString substring(String x, int s, int e) as \"greentea_substring($1, $2, $3)\"; \n\nString toLower(String x)                 as \"greentea_lower($1)\";\n\nString toUpper(String x)                 as \"greentea_upper($1)\";\n\nint charAt(String x, int pos)            as \"$1[$2]\";\n\nString replace(String x, String old, String new) as \"greentea_replace($1, $2, $3)\";\n\n\n\n// double\n\n@Const @Operator double  \"+\"(double x, double y)   as \"$1 + $2\";\n\n@Const @Operator double  \"-\"(double x, double y)   as \"$1 - $2\";\n\n@Const @Operator double  \"*\"(double x, double y)   as \"$1 * $2\";\n\n@Const @Operator double  \"/\"(double x, double y)   as \"$1 / $2\";\n\n@Const @Operator boolean \"<\"(double x,  double y) as \"$1 < $2\";\n\n@Const @Operator boolean \">\"(double x,  double y) as \"$1 > $2\";\n\n@Const @Operator boolean \"<=\"(double x, double y) as \"$1 <= $2\"\n\n@Const @Operator boolean \">=\"(double x, double y) as \"$1 >= $2\"\n\n@Const @Operator boolean \"==\"(double x, double y) as \"$1 == $2\"\n\n@Const @Operator boolean \"!=\"(double x, double y) as \"$1 != $2\"\n\n\n\n@Const @Operator double \"+\"(int x, double y) as \"$1 + $2\";\n\n@Const @Operator double \"-\"(int x, double y) as \"$1 - $2\";\n\n@Const @Operator double \"*\"(int x, double y) as \"$1 * $2\";\n\n@Const @Operator double \"/\"(int x, double y) as \"$1 / $2\";\n\n\n\n//FIXME ApplyNode for converter func has 3 arguments:\n\n//      converter(FromType, ToType, x)\n\n@Coercion @Const any converter(double x) as \"greentea_boxf($2)\";\n\n@Coercion @Const double converter(any x) as \"greentea_unboxf($2)\";\n\n@Const double converter(String x)        as \"strtod($2, NULL)\";\n\n\n\n// function\n\nvoid print(String x) as \"puts($1)\";\n\nvoid println(String x) as \"puts($1);\";\n\nvoid assert(boolean x) as \"assert($1)\";\n";
GreenTeaLibraries["lib/c/file.green"] = "class FilePtr {};\n\n\n\nFilePtr fopen(String path, String option) as \"fopen($1, $2)\";\n\n\n\nclass File {\n\n    FilePtr file;\n\n    constructor(String path) {\n\n        this.file = fopen(path, \"r\");\n\n    }\n\n    boolean Exist();\n\n}\n\n\n\nboolean File.Exist() {\n\n    return this.file != null;\n\n}\n\n\n\n@Export int main() {\n\n    File file = new File(\"./file.green\");\n\n    file.read();\n\n    return 0;\n\n}\n";
GreenTeaLibraries["lib/c/math.green"] = "class Math {};\n\n\n\n//// Returns the absolute value of a double value.\n\n////let Math.abs = import java.lang.Math.abs;\n\n////@Static double abs(double a)              as \"abs($1)\";\n\n//\n\n//// Returns the absolute value of a long value.\n\n////let Math.abs = import java.lang.Math.abs;\n\n////@Static int    abs(int a)                 as \"abs($1)\";\n\n\n\n// Returns the arc cosine of a value; the returned angle is in the range 0.0 through pi.\n\n//let Math.acos = import java.lang.Math.acos;\n\n//@Static double acos(double a)             as \"acos($1)\";\n\n\n\n// Returns the arc sine of a value; the returned angle is in the range -pi/2 through pi/2.\n\n//let Math.asin = import java.lang.Math.asin;\n\n//@Static double asin(double a)             as \"asin($1)\";\n\n\n\n// Returns the arc tangent of a value; the returned angle is in the range -pi/2 through pi/2.\n\n//let Math.atan = import java.lang.Math.atan;\n\n//@Static double atan(double a)             as \"atan($1)\";\n\n\n\n// Returns the angle theta from the conversion of rectangular coordinates (x, y) to polar coordinates (r, theta).\n\n//let Math.atan2 = import java.lang.Math.atan2;\n\n//@Static double atan2(double y, double x)  as \"atan2($1, $2)\";\n\n\n\n// Returns the smallest (closest to negative infinity) double value that is greater than or equal to the argument and is equal to a mathematical integer.\n\n//let Math.ceil = import java.lang.Math.ceil;\n\n//@Static double ceil(double a)             as \"ceil($1)\";\n\n\n\n// Returns the trigonometric cosine of an angle.\n\n//let Math.cos = import java.lang.Math.cos;\n\n//@Static double cos(double a)              as \"cos($1)\";\n\n\n\n// Returns the hyperbolic cosine of a double value.\n\n//let Math.cosh = import java.lang.Math.cosh;\n\n//@Static double cosh(double x)             as \"cosh($1)\";\n\n\n\n// Returns Euler's number e raised to the power of a double value.\n\n//let Math.exp = import java.lang.Math.exp;\n\n//@Static double exp(double a)              as \"exp($1)\";\n\n\n\n// Returns the largest (closest to positive infinity) double value that is less than or equal to the argument and is equal to a mathematical integer.\n\n//let Math.floor = import java.lang.Math.floor;\n\n//@Static double floor(double a)            as \"floor($1)\";\n\n\n\n// Returns the natural logarithm (base e) of a double value.\n\n//let Math.log = import java.lang.Math.log;\n\n//@Static double log(double a)              as \"log($1)\";\n\n\n\n// Returns the base 10 logarithm of a double value.\n\n//let Math.log10 = import java.lang.Math.log10;\n\n//@Static double log10(double a)            as \"log10($1)\";\n\n\n\n//// Returns the greater of two double values.\n\n////let Math.max = import java.lang.Math.max;\n\n//@Static double max(double a, double b)    as \"max($1, $2)\";\n\n//\n\n//// Returns the greater of two long values.\n\n////let Math.max = import java.lang.Math.max;\n\n//@Static long   max(long a, long b)        as \"max($1, $2)\";\n\n\n\n//// Returns the smaller of two double values.\n\n////let Math.min = import java.lang.Math.min;\n\n//@Static double min(double a, double b)    as \"min($1, $2)\";\n\n//\n\n//// Returns the smaller of two long values.\n\n////let Math.min = import java.lang.Math.min;\n\n//@Static long   min(long a, long b)        as \"min($1, $2)\";\n\n\n\n// Returns the value of the first argument raised to the power of the second argument.\n\n//let Math.pow = import java.lang.Math.pow;\n\n//@Static double pow(double a, double b)    as \"pow($1, $2)\";\n\n\n\n////@Static long   round(double a)            as \"round($1)\";\n\n\n\n// Returns a double value with a positive sign, greater than or equal to 0.0 and less than 1.0.\n\n//let Math.random import java.lang.Math.random;\n\n//@Static double random()                   as \"random()\";\n\n\n\n// Returns the trigonometric sine of an angle.\n\n//let Math.sin = import java.lang.Math.sin;\n\n//@Static double sin(double a)              as \"sin($1)\";\n\n\n\n// Returns the hyperbolic sine of a double value.\n\n////let Math.sinh = import java.lang.Math.sinh;\n\n//@Static double sinh(double x)             as \"sinh($1)\";\n\n//\n\n// Returns the correctly rounded positive square root of a double value.\n\n//let Math.sqrt = import java.lang.Math.sqrt;\n\n//@Static double sqrt(double a)             as \"sqrt($1)\";\n\n\n\n// Returns the trigonometric tangent of an angle.\n\n//let Math.tan = import java.lang.Math.tan;\n\n//@Static double tan(double a)              as \"tan($1)\";\n\n\n\n// Returns the hyperbolic tangent of a double value.\n\n//let Math.tanh = import java.lang.Math.tanh;\n\n//@Static double tanh(double x)             as \"tanh($1)\";\n";
GreenTeaLibraries["lib/java/c.green"] = "\n\nimport org.GreenTeaScript.CGrammar;\n";
GreenTeaLibraries["lib/java/common.green"] = "\n\n// libgreentea\n\n@Common void print(any x)   import LibGreenTea.print;\n\n@Common void println(any x) import LibGreenTea.println;\n\n@Common void assert(boolean x) import LibGreenTea.Assert;\n\n\n\n// top type\n\n@Common @Const @Operator int \"||\"(Top x) import Konoha.TopApi.Size;\n\n@Common @Const @Operator boolean \"==\"(Top x, Top y) import Konoha.TopApi.Equals;\n\n@Common @Const @Operator boolean \"!=\"(Top x, Top y) import Konoha.TopApi.NotEquals;\n\n\n\n// enum\n\n@Common @Coercion @Const int converter(var x) import Konoha.TopApi.EnumToInt;\n\n@Common @Coercion @Const String converter(var x) import Konoha.TopApi.EnumToString;\n\n\n\n// AnyApi\n\n\n\n// StringApi\n\n@Common @Const @Operator String \"+\"(String x, any y) import Konoha.StringApi.Add;\n\n//@Const @Operator String \"+\"(int x, String y) import GreenTeaRuntime.Add;\n\n//@Const @Operator String \"+\"(boolean x, String y) import GreenTeaRuntime.Add;\n\n\n\n@Common @Const @Operator boolean \"==\"(String x, String y) import Konoha.StringApi.Equals;\n\n@Common @Const @Operator boolean \"!=\"(String x, String y) import Konoha.StringApi.NotEquals;\n\n\n\n@Common @Const @Operator int \"||\"(String x) import Konoha.StringApi.GetSize;\n\n@Common @Const @Operator String \"[]\"(String x, int index) import Konoha.StringApi.Get;\n\n@Common @Const @Operator String \"[:]\"(String x, int beginIndex) import Konoha.StringApi.Slice;\n\n@Common @Const @Operator String \"[:]\"(String x, int beginIndex, int endIndex) import Konoha.StringApi.Slice;\n\n\n\n@Common @Const boolean startsWith(String x, String y) import Konoha.StringApi.StartsWith;\n\n@Common @Const boolean endsWith(String x, String y) import Konoha.StringApi.EndsWith;\n\n@Common @Const int indexOf(String x, String y) import Konoha.StringApi.IndexOf;\n\n@Common @Const int lastIndexOf(String x, String y) import Konoha.StringApi.LastIndexOf;\n\n\n\n@Const var split(String x, String y) import Konoha.StringApi.Split;\n\n\n\n@Common @Const @Coercion any converter(String x) import Konoha.StringApi.ToAny;\n\n@Common @Const int converter(String x) import Konoha.StringApi.ToInt;\n\n@Common @Const double converter(String x) import Konoha.StringApi.ToDouble;\n\n\n\n@Hidden @Coercion @Const var converter(var x) import Konoha.StringApi.s2c;\n\n@Hidden @StrongCoercion @Const var converter(var x) import Konoha.StringApi.c2s;\n\n\n\n// BooleanApi\n\n@Common @Const @Operator boolean not(boolean x) import Konoha.BooleanApi.Not;\n\n@Common @Const @Operator boolean \"!\"(boolean x) import Konoha.BooleanApi.Not;\n\n@Common @Const @Operator boolean \"==\"(boolean x, boolean y) import Konoha.BooleanApi.Equals;\n\n@Common @Const @Operator boolean \"!=\"(boolean x, boolean y) import Konoha.BooleanApi.NotEquals;\n\n\n\n@Common @Const @Coercion String converter(boolean x) import Konoha.BooleanApi.ToString;\n\n@Common @Const @Coercion any converter(boolean x) import Konoha.BooleanApi.ToAny;\n\n\n\n// IntApi\n\n@Common @Const @Operator int \"+\"(int x) import Konoha.IntApi.Plus;\n\n@Common @Const @Operator int \"-\"(int x) import Konoha.IntApi.Minus;\n\n@Common @Const @Operator int \"~\"(int x) import Konoha.IntApi.BitwiseNot;\n\n\n\n@Common @Const @Operator int \"+\"(int x, int y) import Konoha.IntApi.Add;\n\n@Common @Const @Operator int \"-\"(int x, int y) import Konoha.IntApi.Sub;\n\n@Common @Const @Operator int \"*\"(int x, int y) import Konoha.IntApi.Mul;\n\n@Common @Const @Operator int \"/\"(int x, int y) import Konoha.IntApi.Div;\n\n@Common @Const @Operator int \"%\"(int x, int y) import Konoha.IntApi.Mod;\n\n@Common @Const @Operator int \"<<\"(int x, int y) import Konoha.IntApi.LeftShift;\n\n@Common @Const @Operator int \">>\"(int x, int y) import Konoha.IntApi.RightShift;\n\n@Common @Const @Operator int \"^\"(int x, int y) import Konoha.IntApi.BitwiseAnd;\n\n@Common @Const @Operator int \"|\"(int x, int y) import Konoha.IntApi.BitwiseOr;\n\n@Common @Const @Operator int \"&\"(int x, int y) import Konoha.IntApi.BitwiseXor;\n\n@Common @Const @Operator boolean \"<\"(int x,  int y) import Konoha.IntApi.LessThan;\n\n@Common @Const @Operator boolean \"<=\"(int x, int y) import Konoha.IntApi.LessThanEquals;\n\n@Common @Const @Operator boolean \">\"(int x,  int y) import Konoha.IntApi.GreaterThan;\n\n@Common @Const @Operator boolean \">=\"(int x, int y) import Konoha.IntApi.GreaterThanEquals;\n\n@Common @Const @Operator boolean \"==\"(int x, int y) import Konoha.IntApi.Equals;\n\n@Common @Const @Operator boolean \"!=\"(int x, int y) import Konoha.IntApi.NotEquals;\n\n\n\n@Common @Const @Operator double \"+\"(int x, double y) import Konoha.IntApi.Add;\n\n@Common @Const @Operator double \"-\"(int x, double y) import Konoha.IntApi.Sub;\n\n@Common @Const @Operator double \"*\"(int x, double y) import Konoha.IntApi.Mul;\n\n@Common @Const @Operator double \"/\"(int x, double y) import Konoha.IntApi.Div;\n\n@Common @Const @Operator double \"%\"(int x, double y) import Konoha.IntApi.Mod;\n\n\n\n@Coercion @Const any converter(int x) import Konoha.IntApi.ToAny;\n\n@Common @Coercion @Const String converter(int x) import Konoha.IntApi.ToString;\n\n@Common @Coercion @Const double converter(int x) import Konoha.IntApi.ToDouble;\n\n\n\n@Hidden @Coercion @Const var converter(var x) import Konoha.IntApi.l2i;\n\n@Hidden @StrongCoercion @Const var converter(var x) import Konoha.IntApi.i2l;\n\n@Hidden @Coercion @Const var converter(var x) import Konoha.IntApi.l2s;\n\n@Hidden @StrongCoercion @Const var converter(var x) import Konoha.IntApi.s2l;\n\n@Hidden @Coercion @Const var converter(var x) import Konoha.IntApi.l2b;\n\n@Hidden @StrongCoercion @Const var converter(var x) import Konoha.IntApi.b2l;\n\n\n\n// DoubleApi\n\n@Common @Const @Operator double \"+\"(double x) import Konoha.DoubleApi.Plus;\n\n@Common @Const @Operator double \"-\"(double x) import Konoha.DoubleApi.Minus;\n\n\n\n@Common @Const @Operator double \"+\"(double x, double y) import Konoha.DoubleApi.Add;\n\n@Common @Const @Operator double \"-\"(double x, double y) import Konoha.DoubleApi.Sub;\n\n@Common @Const @Operator double \"*\"(double x, double y) import Konoha.DoubleApi.Mul;\n\n@Common @Const @Operator double \"/\"(double x, double y) import Konoha.DoubleApi.Div;\n\n@Common @Const @Operator boolean \"<\"(double x,  double y) import Konoha.DoubleApi.LessThan;\n\n@Common @Const @Operator boolean \"<=\"(double x, double y) import Konoha.DoubleApi.LessThanEquals;\n\n@Common @Const @Operator boolean \">\"(double x,  double y) import Konoha.DoubleApi.GreaterThan;\n\n@Common @Const @Operator boolean \">=\"(double x, double y) import Konoha.DoubleApi.GreaterThanEquals;\n\n@Common @Const @Operator boolean \"==\"(double x, double y) import Konoha.DoubleApi.Equals;\n\n@Common @Const @Operator boolean \"!=\"(double x, double y) import Konoha.DoubleApi.NotEquals;\n\n\n\n@Coercion @Const any converter(double x) import Konoha.DoubleApi.ToAny;\n\n@Common @Coercion @Const String converter(double x) import Konoha.DoubleApi.ToString;\n\n@Common @Coercion @Const int converter(double x) import Konoha.DoubleApi.ToInt;\n\n\n\n@Hidden @Coercion @Const var converter(var x) import Konoha.DoubleApi.d2f;\n\n@Hidden @StrongCoercion @Const var converter(var x) import Konoha.DoubleApi.f2d;\n\n//@Hidden @Coercion @Const var converter(var x) import Konoha.DoubleApi.d2i;\n\n//@Hidden @Coercion @Const var converter(var x) import Konoha.DoubleApi.i2d;\n\n\n\n//@Const @Coercion boolean converter(any x) import org.GreenTeaScript.GreenTeaRuntime.AnyToBoolean;\n\n//@Coercion @Const int converter(any x) import org.GreenTeaScript.GreenTeaRuntime.AnyToInt;\n\n// double\n\n//@Coercion @Const any converter(double x) import org.GreenTeaScript.GreenTeaRuntime.DoubleToAny;\n\n//@Coercion @Const double converter(any x) import org.GreenTeaScript.GreenTeaRuntime.AnyToDouble;\n\n//@Const double converter(String x) import org.GreenTeaScript.GreenTeaRuntime.StringToDouble;\n\n\n\n// ArrayApi\n\n@Common @Const @Operator <T> int \"||\"(Array<T> this) import Konoha.ArrayApi.GetSize;\n\n@Common @Const @Operator <T> T \"[]\"(Array<T> this, int index) import Konoha.ArrayApi.Get;\n\n@Common @Operator <T> void \"[]=\"(Array<T> this, int index, T value) import Konoha.ArrayApi.Set;\n\n@Common <T> Array<T> add(Array<T> this, T value) import Konoha.ArrayApi.Add;\n\n@Common @Const @Operator <T> Array<T> \"[:]\"(Array<T> x, int beginIndex) import Konoha.ArrayApi.Slice;\n\n@Common @Const @Operator <T> Array<T> \"[:]\"(Array<T> x, int beginIndex, int endIndex) import Konoha.ArrayApi.Slice;\n\n\n\n//@Common @Const @Operator int \"||\"(Array<int> this) import Konoha.ArrayApi.GetSizeI;\n\n//@Common @Const @Operator int \"[]\"(Array<int> this, int index) import Konoha.ArrayApi.GetI;\n\n//@Common @Operator void \"[]=\"(Array<int> this, int index, int value) import Konoha.ArrayApi.SetI;\n\n//@Common Array<int> add(Array<int> this, int value) import Konoha.ArrayApi.AddI;\n\n//@Common @Const @Operator Array<int> \"[:]\"(Array<int> x, int beginIndex) import Konoha.ArrayApi.SliceI;\n\n//@Common @Const @Operator Array<int> \"[:]\"(Array<int> x, int beginIndex, int endIndex) import Konoha.ArrayApi.SliceI;\n\n\n\n// experimental\n\n@Hidden @Coercion @Const var converter(var x) import Konoha.ArrayApi.GreenArrayToStringArray;\n\n@Hidden @StrongCoercion @Const var converter(var x) import Konoha.ArrayApi.StringArrayToGreenArray;\n\n\n\n\n\n\n";
GreenTeaLibraries["lib/java/dshell.green"] = "// DEOS D-Script Implementation\n\n\n\nimport org.GreenTeaScript.DShellGrammar;\n\n\n\n@Const @Operator boolean \"-f\"(String Path) import DShellGrammar.IsFile;\n\n@Const @Operator boolean \"-d\"(String Path) import DShellGrammar.IsDirectory;\n\n@Const @Operator boolean \"-e\"(String Path) import DShellGrammar.IsFileExists;\n\n@Const @Operator boolean \"-r\"(String Path) import DShellGrammar.IsFileReadable;\n\n@Const @Operator boolean \"-w\"(String Path) import DShellGrammar.IsFileWritable;\n\n@Const @Operator boolean \"-x\"(String Path) import DShellGrammar.IsFileExecutable;\n\n\n\nlet TooManyArgsException = import org.GreenTeaScript.DShell.TooManyArgsException;\n\nlet NotPermittedException = import org.GreenTeaScript.DShell.NotPermittedException;\n\nlet TemporaryUnavailableException = import org.GreenTeaScript.DShell.TemporaryUnavailableException;\n\nlet BadFileDescriptorException = import org.GreenTeaScript.DShell.BadFileDescriptorException;\n\nlet BadStateFileDescriptorException = import org.GreenTeaScript.DShell.BadStateFileDescriptorException;\n\nlet BadMessageException = import org.GreenTeaScript.DShell.BadMessageException;\n\nlet NoChildException = import org.GreenTeaScript.DShell.NoChildException;\n\nlet ConnectionRefusedException = import org.GreenTeaScript.DShell.ConnectionRefusedException;\n\nlet FileExistException = import org.GreenTeaScript.DShell.FileExistException;\n\nlet TooLargeFileException = import org.GreenTeaScript.DShell.TooLargeFileException;\n\nlet UnreachableHostException = import org.GreenTeaScript.DShell.UnreachableHostException;\n\nlet InterruptedBySignalException = import org.GreenTeaScript.DShell.InterruptedBySignalException;\n\nlet InvalidArgumentException = import org.GreenTeaScript.DShell.InvalidArgumentException;\n\nlet IOException = import org.GreenTeaScript.DShell.IOException;\n\nlet IsDirectoryException = import org.GreenTeaScript.DShell.IsDirectoryException;\n\nlet TooManyLinkException = import org.GreenTeaScript.DShell.TooManyLinkException;\n\nlet TooManyFileOpenException = import org.GreenTeaScript.DShell.TooManyFileOpenException;\n\nlet TooLongMessageException = import org.GreenTeaScript.DShell.TooLongMessageException;\n\nlet TooLongNameException = import org.GreenTeaScript.DShell.TooLongNameException;\n\nlet UnreachableNetworkException = import org.GreenTeaScript.DShell.UnreachableNetworkException;\n\nlet FileTableOverflowException = import org.GreenTeaScript.DShell.FileTableOverflowException;\n\nlet NoBufferSpaceException = import org.GreenTeaScript.DShell.NoBufferSpaceException;\n\nlet DeviceNotFoundException = import org.GreenTeaScript.DShell.DeviceNotFoundException;\n\nlet FileNotFoundException = import org.GreenTeaScript.DShell.FileNotFoundException;\n\nlet NoFreeMemoryException = import org.GreenTeaScript.DShell.NoFreeMemoryException;\n\nlet NoFreeSpaceException = import org.GreenTeaScript.DShell.NoFreeSpaceException;\n\nlet NotDirectoryException = import org.GreenTeaScript.DShell.NotDirectoryException;\n\nlet NotEmptyDirectoryException = import org.GreenTeaScript.DShell.NotEmptyDirectoryException;\n\nlet NotSocketException = import org.GreenTeaScript.DShell.NotSocketException;\n\nlet InappropriateOperateException = import org.GreenTeaScript.DShell.InappropriateOperateException;\n\nlet NotPermittedOperateException = import org.GreenTeaScript.DShell.NotPermittedOperateException;\n\nlet BrokenPipeException = import org.GreenTeaScript.DShell.BrokenPipeException;\n\nlet RemoteIOException = import org.GreenTeaScript.DShell.RemoteIOException;\n\nlet ReadOnlyException = import org.GreenTeaScript.DShell.ReadOnlyException;\n\nlet IllegalSeekException = import org.GreenTeaScript.DShell.IllegalSeekException;\n\nlet ConnectionTimeoutException = import org.GreenTeaScript.DShell.ConnectionTimeoutException;\n\nlet TooManyUsersException = import org.GreenTeaScript.DShell.TooManyUsersException;\n\n\n\n// FaultTypes\n\nlet DFault       = import org.GreenTeaScript.DShell.DFault;\n\nboolean MatchFault(DFault fault, String Location, String FaultInfo) import org.GreenTeaScript.DShell.DFault.MatchFault;\n\n\n\n//let DFault._new  = import org.GreenTeaScript.JVM.Fault.DFault._new;\n\n//let DFault.getLocation = import org.GreenTeaScript.JVM.Fault.DFault.getLocation;\n\n//let DFault.setLocation = import org.GreenTeaScript.JVM.Fault.DFault.setLocation;\n\n//let UnknownFault = import org.GreenTeaScript.JVM.Fault.UnknownFault;\n\n//let ReportAction = import org.GreenTeaScript.DShellGrammar.UpdateFaultInfomation;\n\n@Const @Operator boolean \"==\"(DFault x, DFault y) import org.GreenTeaScript.DShell.DFault.Equals;\n\n@Const @Operator boolean \"!=\"(DFault x, DFault y) import org.GreenTeaScript.DShell.DFault.NotEquals;\n";
GreenTeaLibraries["lib/java/math.green"] = "let Math = import java.lang.Math;\n\n\n\n//// Returns the absolute value of a double value.\n\n//let Math.abs = import java.lang.Math.abs;\n\n//\n\n//// Returns the absolute value of a long value.\n\n//let Math.abs = import java.lang.Math.abs;\n\n\n\n// Returns the arc cosine of a value; the returned angle is in the range 0.0 through pi.\n\nlet Math.acos = import java.lang.Math.acos;\n\n\n\n// Returns the arc sine of a value; the returned angle is in the range -pi/2 through pi/2.\n\nlet Math.asin = import java.lang.Math.asin;\n\n\n\n// Returns the arc tangent of a value; the returned angle is in the range -pi/2 through pi/2.\n\nlet Math.atan = import java.lang.Math.atan;\n\n\n\n// Returns the angle theta from the conversion of rectangular coordinates (x, y) to polar coordinates (r, theta).\n\nlet Math.atan2 = import java.lang.Math.atan2;\n\n\n\n// Returns the smallest (closest to negative infinity) double value that is greater than or equal to the argument and is equal to a mathematical integer.\n\nlet Math.ceil = import java.lang.Math.ceil;\n\n\n\n// Returns the trigonometric cosine of an angle.\n\nlet Math.cos = import java.lang.Math.cos;\n\n\n\n// Returns the hyperbolic cosine of a double value.\n\nlet Math.cosh = import java.lang.Math.cosh;\n\n\n\n// Returns Euler's number e raised to the power of a double value.\n\nlet Math.exp = import java.lang.Math.exp;\n\n\n\n// Returns the largest (closest to positive infinity) double value that is less than or equal to the argument and is equal to a mathematical integer.\n\nlet Math.floor = import java.lang.Math.floor;\n\n\n\n// Returns the natural logarithm (base e) of a double value.\n\nlet Math.log = import java.lang.Math.log;\n\n\n\n// Returns the base 10 logarithm of a double value.\n\nlet Math.log10 = import java.lang.Math.log10;\n\n\n\n//// Returns the greater of two double values.\n\n//let Math.max = import java.lang.Math.max;\n\n//\n\n//// Returns the greater of two long values.\n\n//let Math.max = import java.lang.Math.max;\n\n\n\n//// Returns the smaller of two double values.\n\n//let Math.min = import java.lang.Math.min;\n\n//\n\n//// Returns the smaller of two long values.\n\n//let Math.min = import java.lang.Math.min;\n\n\n\n// Returns the value of the first argument raised to the power of the second argument.\n\nlet Math.pow = import java.lang.Math.pow;\n\n\n\n// Returns a double value with a positive sign, greater than or equal to 0.0 and less than 1.0.\n\nlet Math.random = import java.lang.Math.random;\n\n\n\n// Returns the trigonometric sine of an angle.\n\nlet Math.sin = import java.lang.Math.sin;\n\n\n\n// Returns the hyperbolic sine of a double value.\n\n//let Math.sinh = import java.lang.Math.sinh;\n\n//\n\n// Returns the correctly rounded positive square root of a double value.\n\nlet Math.sqrt = import java.lang.Math.sqrt;\n\n\n\n// Returns the trigonometric tangent of an angle.\n\nlet Math.tan = import java.lang.Math.tan;\n\n\n\n// Returns the hyperbolic tangent of a double value.\n\nlet Math.tanh = import java.lang.Math.tanh;\n";
GreenTeaLibraries["lib/js/common.green"] = "// common api for c\n\n// unary operator\n\n@Const @Operator boolean \"!\"(boolean x) as \"! $1\"\n\n@Const @Operator int \"+\"(int x) as \"($1 | 0)\";\n\n@Const @Operator int \"-\"(int x) as \"-$1\";\n\n@Const @Operator int \"~\"(int x) as \"~$1\";\n\n@Const @Operator double \"+\"(double x) as \"$1\";\n\n@Const @Operator double \"-\"(double x) as \"-$1\";\n\n\n\n// binary operator\n\n// any\n\n@Const @Operator boolean \"==\"(any x, any y) as \"$1  == $2\";\n\n@Const @Operator boolean \"!=\"(any x, any y) as \"$1  != $2\";\n\n\n\n// boolean\n\n@Const @Operator boolean \"==\"(boolean x, boolean y) as \"$1  == $2\";\n\n@Const @Operator boolean \"!=\"(boolean x, boolean y) as \"$1  != $2\";\n\n@Const @Operator String converter(boolean x) as \"\\\"\\\" + $1\";\n\n\n\n// int \n\n@Const @Operator int     \"+\"(int x, int y)  as \"$1 + $2\";\n\n@Const @Operator int     \"-\"(int x, int y)  as \"$1 - $2\";\n\n@Const @Operator int     \"*\"(int x, int y)  as \"$1 * $2\";\n\n@Const @Operator int     \"/\"(int x, int y)  as \"$1 / $2\";\n\n@Const @Operator int     \"%\"(int x, int y)  as \"$1 % $2\";\n\n@Const @Operator int     \"<<\"(int x, int y) as \"$1 << $2\";\n\n@Const @Operator int     \">>\"(int x, int y) as \"$1 >> $2\";\n\n@Const @Operator int     \"^\"(int x, int y)  as \"$1 ^ $2\";\n\n@Const @Operator int     \"|\"(int x, int y)  as \"$1 | $2\";\n\n@Const @Operator int     \"&\"(int x, int y)  as \"$1 & $2\";\n\n@Const @Operator boolean \"<\"(int x,  int y) as \"$1 < $2\";\n\n@Const @Operator boolean \">\"(int x,  int y) as \"$1 > $2\";\n\n@Const @Operator boolean \"<=\"(int x, int y) as \"$1 <= $2\";\n\n@Const @Operator boolean \">=\"(int x, int y) as \"$1 >= $2\";\n\n@Const @Operator boolean \"==\"(int x, int y) as \"$1 == $2\";\n\n@Const @Operator boolean \"!=\"(int x, int y) as \"$1 != $2\";\n\n\n\n\n\n\n\n// String\n\nString +(String x, String y)      as \"$1 + $2\";\n\nboolean ==(String x, String y)    as \"$1 == $2\";\n\nboolean !=(String x, String y)    as \"$1 != $2\";\n\nboolean <(String x,  String y)    as \"$1 <= $2\";\n\nboolean <=(String x, String y)    as \"$1 <  $2\";\n\nboolean >(String x,  String y)    as \"$1 >  $2\";\n\nboolean >=(String x, String y)    as \"$1 >= $2\";\n\n\n\nboolean startsWith(String x, String y) as \" $1.indexOf($2, 0) == 0\";\n\nboolean endsWith(String x, String y) as \"$1.lastIndexOf($2, 0) == 0\";\n\nint indexOf(String x, String sub) as \"$1.indexOf($2)\";\n\nint lastIndexOf(String x, String sub) as \"$1.lastIndexOf($2)\";\n\nString substring(String x, int s) as \"$1.substring($2)\"\n\nString substring(String x, int s, int e) as \"$1.substring($2, $3)\"; \n\nString toLower(String x) as \"$1.lower()\";\n\nString toUpper(String x) as \"$1.upper()\";\n\nString replace(String x, String old, String new) as \"$1.replace($2, $3)\";\n\n\n\n// double\n\n@Const @Operator double  \"+\"(double x, double y)   as \"$1 + $2\";\n\n@Const @Operator double  \"-\"(double x, double y)   as \"$1 - $2\";\n\n@Const @Operator double  \"*\"(double x, double y)   as \"$1 * $2\";\n\n@Const @Operator double  \"/\"(double x, double y)   as \"$1 / $2\";\n\n@Const @Operator boolean \"<\"(double x,  double y) as \"$1 < $2\";\n\n@Const @Operator boolean \">\"(double x,  double y) as \"$1 > $2\";\n\n@Const @Operator boolean \"<=\"(double x, double y) as \"$1 <= $2\"\n\n@Const @Operator boolean \">=\"(double x, double y) as \"$1 >= $2\"\n\n@Const @Operator boolean \"==\"(double x, double y) as \"$1 == $2\"\n\n@Const @Operator boolean \"!=\"(double x, double y) as \"$1 != $2\"\n\n\n\n@Const @Operator double \"+\"(int x, double y) as \"$1 + $2\";\n\n@Const @Operator double \"-\"(int x, double y) as \"$1 - $2\";\n\n@Const @Operator double \"*\"(int x, double y) as \"$1 * $2\";\n\n@Const @Operator double \"/\"(int x, double y) as \"$1 / $2\";\n\n\n\n\n\n// function\n\nvoid print(String x) as \"console.log($1)\";\n\nvoid println(String x) as \"console.log($1)\";\n\nvoid assert(boolean x) as \"assert($1)\";\n";
GreenTeaLibraries["lib/perl/common.green"] = "// common api for perl\n\n\n\n// unary operator\n\n// any\n\nboolean not(boolean x) as \"! $1\"\n\nboolean \"!\"(boolean x) as \"! $1\"\n\nint \"+\"(int x) as \"$1\";\n\nint \"-\"(int x) as \"-$1\";\n\nint \"~\"(int x) as \"~$1\";\n\n\n\n// binary operator\n\n// any\n\nboolean \"==\"(any x, any y) as \"$1 == $2\";\n\nboolean \"!=\"(any x, any y) as \"$1 != $2\";\n\n\n\n// boolean\n\nboolean \"==\"(boolean x, boolean y) as \"$1 == $2\";\n\nboolean \"!=\"(boolean x, boolean y) as \"$1 != $2\";\n\nString convert(boolean x) as \"\\\"\\\" . $1\"; /*FIXME*/\n\n\n\n// int\n\n@Const @Operator int     \"+\"(int x, int y)  as \"$1 + $2\";\n\n@Const @Operator int     \"-\"(int x, int y)  as \"$1 - $2\";\n\n@Const @Operator int     \"*\"(int x, int y)  as \"$1 * $2\";\n\n@Const @Operator int     \"/\"(int x, int y)  as \"$1 / $2\";\n\n@Const @Operator int     \"%\"(int x, int y)  as \"$1 % $2\";\n\n@Const @Operator int     \"<<\"(int x, int y) as \"$1 << $2\";\n\n@Const @Operator int     \">>\"(int x, int y) as \"$1 >> $2\";\n\n@Const @Operator int     \"^\"(int x, int y)  as \"$1 ^ $2\";\n\n@Const @Operator int     \"|\"(int x, int y)  as \"$1 | $2\";\n\n@Const @Operator int     \"&\"(int x, int y)  as \"$1 & $2\";\n\n@Const @Operator boolean \"<\"(int x,  int y) as \"$1 < $2\";\n\n@Const @Operator boolean \">\"(int x,  int y) as \"$1 > $2\";\n\n@Const @Operator boolean \"<=\"(int x, int y) as \"$1 <= $2\";\n\n@Const @Operator boolean \">=\"(int x, int y) as \"$1 >= $2\";\n\n@Const @Operator boolean \"==\"(int x, int y) as \"$1 == $2\";\n\n@Const @Operator boolean \"!=\"(int x, int y) as \"$1 != $2\";\n\n\n\nString convert(int x) as \"\\\"\\\" . $1\";\n\n\n\n// String\n\nString  \"+\"(String x, String y) as \"$1 . $2\";\n\nboolean \"==\"(String x, String y)    as \"$1 eq $2\";\n\nboolean \"!=\"(String x, String y)    as \"$1 ne $2\";\n\nboolean \"<\"(String x,  String y)    as \"$1 lt $2\";\n\nboolean \">\"(String x,  String y)    as \"$1 gt$2\";\n\nboolean \"<=\"(String x, String y)    as \"$1 le $2\";\n\nboolean \">=\"(String x, String y)    as \"$1 ge $2\";\n\nint length(String x) as \"length($1)\";\n\n\n\n// double\n\n@Const @Operator double  \"+\"(double x, double y)   as \"$1 + $2\";\n\n@Const @Operator double  \"-\"(double x, double y)   as \"$1 - $2\";\n\n@Const @Operator double  \"*\"(double x, double y)   as \"$1 * $2\";\n\n@Const @Operator double  \"/\"(double x, double y)   as \"$1 / $2\";\n\n@Const @Operator boolean \"<\"(double x,  double y) as \"$1 < $2\";\n\n@Const @Operator boolean \">\"(double x,  double y) as \"$1 > $2\";\n\n@Const @Operator boolean \"<=\"(double x, double y) as \"$1 <= $2\"\n\n@Const @Operator boolean \">=\"(double x, double y) as \"$1 >= $2\"\n\n@Const @Operator boolean \"==\"(double x, double y) as \"$1 == $2\"\n\n@Const @Operator boolean \"!=\"(double x, double y) as \"$1 != $2\"\n\n\n\n@Const @Operator double \"+\"(int x, double y) as \"$1 + $2\";\n\n@Const @Operator double \"-\"(int x, double y) as \"$1 - $2\";\n\n@Const @Operator double \"*\"(int x, double y) as \"$1 * $2\";\n\n@Const @Operator double \"/\"(int x, double y) as \"$1 / $2\";\n\n\n\n@Coercion @Const any converter(double x) as \"$1\";\n\n@Coercion @Const double converter(any x) as \"$1 + 0.0\";\n\n@Const double converter(String x)        as \"$1 + 0.0\";\n\n\n\n\n\n// function\n\nvoid print(String x) as \"print $1,\";\n\nvoid println(String x) as \"print $1\";\n\nvoid assert(boolean x) as \"($1 == 1) or die \\\"Assertion faild\\\"\";\n";
GreenTeaLibraries["lib/python/common.green"] = "// common api for python\n\n\n\n// unary operator\n\n// any\n\nboolean not(boolean x) as \"not $1\"\n\nboolean !(boolean x) as \"not $1\"\n\nint +(int x) as \"$1\";\n\nint -(int x) as \"-$1\";\n\nint ~(int x) as \"~$1\";\n\n\n\n// binary operator\n\n// any\n\nboolean ==(any x, any y) as \"$1  == $2\";\n\nboolean !=(any x, any y) as \"$1  != $2\";\n\n\n\n// boolean\n\nboolean ==(boolean x, boolean y) as \"$1  == $2\";\n\nboolean !=(boolean x, boolean y) as \"$1  != $2\";\n\nString convert(boolean x) as \"green_toString($1)\";\n\n\n\n// int\n\n@Const @Operator int     \"+\"(int x, int y)      as \"$1 + $2\";\n\n@Const @Operator int     \"-\"(int x, int y)      as \"$1 - $2\";\n\n@Const @Operator int     \"*\"(int x, int y)      as \"$1 * $2\";\n\n@Const @Operator int     \"/\"(int x, int y)      as \"$1 / $2\";\n\n@Const @Operator int     \"%\"(int x, int y)      as \"$1 % $2\";\n\n@Const @Operator int     \"<<\"(int x, int y)     as \"$1 << $2\";\n\n@Const @Operator int     \">>\"(int x, int y)     as \"$1 >> $2\";\n\n@Const @Operator int     \"^\"(int x, int y)      as \"$1 ^ $2\";\n\n@Const @Operator int     \"|\"(int x, int y)      as \"$1 | $2\";\n\n@Const @Operator int     \"&\"(int x, int y)      as \"$1 & $2\";\n\n@Const @Operator boolean \"<\"(int x,  int y) as \"$1 < $2\";\n\n@Const @Operator boolean \">\"(int x,  int y) as \"$1 > $2\";\n\n@Const @Operator boolean \"<=\"(int x, int y) as \"$1 <= $2\";\n\n@Const @Operator boolean \">=\"(int x, int y) as \"$1 >= $2\";\n\n@Const @Operator boolean \"==\"(int x, int y) as \"$1 == $2\";\n\n@Const @Operator boolean \"!=\"(int x, int y) as \"$1 != $2\";\n\n\n\nString convert(int x) as \"str($1)\";\n\n\n\n// String\n\nString +(String x, String y)      as \"$1 + $2\";\n\nboolean ==(String x, String y)    as \"$1 == $2\";\n\nboolean !=(String x, String y)    as \"$1 != $2\";\n\nboolean <(String x,  String y)    as \"$1 < $2\";\n\nboolean <=(String x, String y)    as \"$1 <= $2\";\n\nboolean >(String x,  String y)    as \"$1 > $2\";\n\nboolean >=(String x, String y)    as \"$1 >= $2\";\n\n\n\nboolean startsWith(String x, String y) as \"$1.startswith($2)\";\n\nboolean endsWith(String x, String y) as \"$1.endswith($2)\";\n\nint indexOf(String x, String sub) as \"$1.find($2)\";\n\nint lastIndexOf(String x, String sub) as \"$1.rfind($2)\";\n\nString substring(String x, int s) as \"$1[$2:]\"\n\nString substring(String x, int s, int e) as \"$1[$2:$3]\";\n\nString toLower(String x) as \"$1.lower()\";\n\nString toUpper(String x) as \"$1.upper()\";\n\nString replace(String x, String old, String new) as \"$1.replace($2, $3)\";\n\n\n\n// double\n\n@Const @Operator double  \"+\"(double x, double y)   as \"$1 + $2\";\n\n@Const @Operator double  \"-\"(double x, double y)   as \"$1 - $2\";\n\n@Const @Operator double  \"*\"(double x, double y)   as \"$1 * $2\";\n\n@Const @Operator double  \"/\"(double x, double y)   as \"$1 / $2\";\n\n@Const @Operator boolean \"<\"(double x,  double y) as \"$1 < $2\";\n\n@Const @Operator boolean \">\"(double x,  double y) as \"$1 > $2\";\n\n@Const @Operator boolean \"<=\"(double x, double y) as \"$1 <= $2\"\n\n@Const @Operator boolean \">=\"(double x, double y) as \"$1 >= $2\"\n\n@Const @Operator boolean \"==\"(double x, double y) as \"$1 == $2\"\n\n@Const @Operator boolean \"!=\"(double x, double y) as \"$1 != $2\"\n\n\n\n@Const @Operator double \"+\"(int x, double y) as \"$1 + $2\";\n\n@Const @Operator double \"-\"(int x, double y) as \"$1 - $2\";\n\n@Const @Operator double \"*\"(int x, double y) as \"$1 * $2\";\n\n@Const @Operator double \"/\"(int x, double y) as \"$1 / $2\";\n\n\n\n@Coercion @Const any converter(double x) as \"$1\";\n\n@Coercion @Const double converter(any x) as \"float($1)\";\n\n@Const double converter(String x)        as \"float($1)\";\n\n\n\n// function\n\nvoid print(String x) as \"print $1,\";\n\nvoid println(String x) as \"print $1\";\n\nvoid assert(boolean x) as \"assert($1)\";\n\n\n";
GreenTeaLibraries["lib/scala/common.green"] = "// unary operator\n\n@Const @Operator boolean \"!\"(boolean x) as \"! $1\"\n\n@Const @Operator boolean not(boolean x) as \"! $1\"\n\n@Const @Operator int \"+\"(int x) as \"$1\";\n\n@Const @Operator int \"-\"(int x) as \"-$1\";\n\n@Const @Operator int \"~\"(int x) as \"~$1\";\n\n@Const @Operator double \"+\"(double x) as \"$1\";\n\n@Const @Operator double \"-\"(double x) as \"-$1\";\n\n\n\n// binary operator\n\n// any\n\n@Const @Operator boolean \"==\"(any x, any y) as \"$1 == $2\";\n\n@Const @Operator boolean \"!=\"(any x, any y) as \"$1 != $2\";\n\n\n\n// boolean\n\n@Const @Operator boolean \"==\"(boolean x, boolean y) as \"$1 == $2\";\n\n@Const @Operator boolean \"!=\"(boolean x, boolean y) as \"$1 != $2\";\n\n@Const @Operator boolean converter(String x) as \"($1).toBoolean\";\n\n@Const @Operator String  converter(boolean x) as \"($1).toString\";\n\n\n\n// int \n\n@Const @Operator int \"+\"(int x, int y)      as \"$1 + $2\";\n\n@Const @Operator int \"-\"(int x, int y)      as \"$1 - $2\";\n\n@Const @Operator int \"*\"(int x, int y)      as \"$1 * $2\";\n\n@Const @Operator int \"/\"(int x, int y)      as \"$1 / $2\";\n\n@Const @Operator int \"%\"(int x, int y)      as \"$1 % $2\";\n\n@Const @Operator int \"<<\"(int x, int y)     as \"$1 << $2\";\n\n@Const @Operator int \">>\"(int x, int y)     as \"$1 >> $2\";\n\n@Const @Operator int \"^\"(int x, int y)      as \"$1 ^ $2\";\n\n@Const @Operator int \"|\"(int x, int y)      as \"$1 | $2\";\n\n@Const @Operator int \"&\"(int x, int y)      as \"$1 & $2\";\n\n@Const @Operator boolean \"<\"(int x,  int y) as \"$1 < $2\";\n\n@Const @Operator boolean \"<=\"(int x, int y) as \"$1 <= $2\";\n\n@Const @Operator boolean \">\"(int x,  int y) as \"$1 > $2\";\n\n@Const @Operator boolean \">=\"(int x, int y) as \"$1 >= $2\";\n\n@Const @Operator boolean \"==\"(int x, int y) as \"$1 == $2\";\n\n@Const @Operator boolean \"!=\"(int x, int y) as \"$1 != $2\";\n\n\n\n@Coercion @Const String converter(int x) as \"($2).toString\";\n\n@Const int converter(String x)           as \"($2).toInt\";\n\n\n\n// String\n\n@Const @Operator String \"+\"(String x, String y)  as \"$1 + $2\";\n\n@Const @Operator String \"+\"(int x, String y)     as \"$1 + $2\";\n\n@Const @Operator String \"+\"(boolean x, String y) as \"$1 + $2\";\n\n\n\n@Const @Operator boolean \"==\"(String x, String y)    as \"$1 == $2\";\n\n@Const @Operator boolean \"!=\"(String x, String y)    as \"$1 != $2\";\n\n\n\nboolean startsWith(String x, String y)   as \"($1).startsWith($2)\";\n\nboolean endsWith(String x, String y)     as \"($1).endsWith($2)\";\n\nint indexOf(String x, String sub)        as \"($1).indexOf($2)\";\n\nint lastIndexOf(String x, String sub)    as \"($1).lastIndexOf($2)\";\n\nString substring(String x, int s)        as \"($1).substring($2)\"\n\nString substring(String x, int s, int e) as \"($1).substring($2, $3)\"; \n\nString toLower(String x)                 as \"($1).toLower()\";\n\nString toUpper(String x)                 as \"($1).toUpper()\";\n\nint charAt(String x, int pos)            as \"$1[$2]\";\n\nString replace(String x, String old, String new) as \"($1).replace($2, $3)\";\n\n\n\n// double\n\n@Const @Operator double  \"+\"(double x, double y)   as \"$1 + $2\";\n\n@Const @Operator double  \"-\"(double x, double y)   as \"$1 - $2\";\n\n@Const @Operator double  \"*\"(double x, double y)   as \"$1 * $2\";\n\n@Const @Operator double  \"/\"(double x, double y)   as \"$1 / $2\";\n\n@Const @Operator boolean \"<\"(double x,  double y) as \"$1 < $2\";\n\n@Const @Operator boolean \"<=\"(double x, double y) as \"$1 <= $2\"\n\n@Const @Operator boolean \">\"(double x,  double y) as \"$1 > $2\";\n\n@Const @Operator boolean \">=\"(double x, double y) as \"$1 >= $2\"\n\n@Const @Operator boolean \"==\"(double x, double y) as \"$1 == $2\"\n\n@Const @Operator boolean \"!=\"(double x, double y) as \"$1 != $2\"\n\n\n\n@Const @Operator double \"+\"(int x, double y) as \"$1 + $2\";\n\n@Const @Operator double \"-\"(int x, double y) as \"$1 - $2\";\n\n@Const @Operator double \"*\"(int x, double y) as \"$1 * $2\";\n\n@Const @Operator double \"/\"(int x, double y) as \"$1 / $2\";\n\n\n\n//FIXME ApplyNode for converter func has 3 arguments:\n\n//      converter(FromType, ToType, x)\n\n@Const double converter(String x)        as \"($2).toDouble\";\n\n@Coercion @Const String converter(double x) as \"($2).toString\";\n\n\n\n// function\n\nvoid print(String x) as \"print($1)\";\n\nvoid println(String x) as \"println($1);\";\n\nvoid assert(boolean x) as \"assert($1)\";\n";

var JavaScriptGlobal: any = Function("return this")();

interface Array {
	get(index: number): any;
	set(index: number, value: any): void;
	add(obj: any): void;
	add(index: number, obj : any): void;
	size(): number;
	clear(): void;
	remove(index: number): any;
}

Array.prototype["size"] = function(){
	return this.length;
}

Array.prototype["add"] = function(arg1){
	if(arguments.length == 1) {
		this.push(arg1);
	} else {
		var arg2 = arguments[1];
		this.splice(arg1, 0, arg2);
	}
}

Array.prototype["get"] = function(i){
	if(i >= this.length){
		throw new RangeError("invalid array index");
	}
	return this[i];
}

Array.prototype["set"] = function(i, v): void{
	this[i] = v;
}

Array.prototype["remove"] = function(i){
	if(i >= this.length){
		throw new RangeError("invalid array index");
	}
	var v = this[i];
	this.splice(i, 1);
	return v;
}

Array.prototype["clear"] = function(){
	this.length = 0;
}

interface Object {
	equals(other: any): boolean;
	InstanceOf(klass: any): boolean;
}

Object.prototype["equals"] = function(other): boolean{
	return (this === other);
}

Object.prototype["InstanceOf"] = function(klass): boolean{
	return (<any>this).constructor == klass;
}

interface String {
	startsWith(key: string): boolean;
	endsWith(key: string): boolean;
	lastIndexOf(ch: number) : number;
	indexOf(ch: number) : number;
	substring(BeginIdx : number, EndIdx : number) : string;
}

String.prototype["startsWith"] = function(key): boolean{
	return this.indexOf(key, 0) == 0;
}

String.prototype["endsWith"] = function(key): boolean{
	return this.lastIndexOf(key, 0) == 0;
}

String.prototype["equals"] = function(other): boolean{
	return (this == other);
}

JavaScriptGlobal["GreenTeaObject"] = (function () {
    function GreenTeaObject() {
    }
    GreenTeaObject.prototype.GetGreenType = function () {
        throw new Error("Abstruct method is called.");
    };
    return GreenTeaObject;
})();

class LibLoadFunc{
	static __LoadFunc(ParserContext: GtParserContext, Grammar: any, FuncName: string): GtFunc{
		if(!Grammar){
			throw new Error("Grammar is " + Grammar);
		}
		var Func = Grammar[FuncName] || Grammar.constructor[FuncName];
		if(!Func){
			throw new Error(Grammar.constructor.name + "." + FuncName + " is " + Func)
		}
		return LibGreenTea.ConvertNativeMethodToFunc(ParserContext, Func)
	}

	static LoadTokenFunc(ParserContext: GtParserContext, Grammar: Object, FuncName: string): GtFunc{
		return LibLoadFunc.__LoadFunc(ParserContext, Grammar, FuncName);
	}

	static LoadParseFunc(ParserContext: GtParserContext, Grammar: Object, FuncName: string): GtFunc{
		return LibLoadFunc.__LoadFunc(ParserContext, Grammar, FuncName);
	}

	static LoadTypeFunc(ParserContext: GtParserContext, Grammar: Object, FuncName: string): GtFunc{
		return LibLoadFunc.__LoadFunc(ParserContext, Grammar, FuncName);
	}
}

class GtMap {
	private map: Object;
	private length: number;
	private key: string[]
	constructor(){
		this.map = <any>{};
		this.key = [];
		this.length = 0;
	}
	get(index: any): any{
		return this.map[index];
	}
	GetOrNull(index: any): any{
		if(this.map[index] != undefined){
			return this.map[index];
		}
		return null;
	}
	put(key: any, obj: any): void{
		this.length++;
		this.map[key] = obj;
		this.key.push(key);
	}
	size(): number{
		return this.length;
	}
	keys(): string[] {
		return this.key;
	}
}

declare var fs: any;
declare var process: any;

class LibGreenTea {

	// typescript only
	static isNodeJS: boolean = typeof(process) != "undefined";
	static hasFileSystem = typeof(fs) != "undefined";

	static print(msg: string): void {
		console.log(msg);
	}

	static println(msg: string): void {
		console.log(msg);
	}

	static Assert(expect: any): void {
		if(!expect){
			throw new Error("Assertion Failed");
		}
	}

	static NewArray(Type: GtType, InitSizes: any[]): any {
		if(InitSizes.length == 1){
			return GreenTeaArray.NewArray1(Type.TypeParams[0], <any>InitSizes[0] - 0);
		}else if(InitSizes.length == 2){
			return GreenTeaArray.NewArray2(Type.TypeParams[0].TypeParams[0], <any>InitSizes[0] - 0, <any>InitSizes[1] - 0);
		}else if(InitSizes.length == 3){
			return GreenTeaArray.NewArray3(Type.TypeParams[0].TypeParams[0].TypeParams[0], <any>InitSizes[0] - 0, <any>InitSizes[1] - 0, <any>InitSizes[2] - 0);
		}
		return InitSizes;
	}

	static NewArrayLiteral(ArrayType: GtType, Values: any[]): any {
		return GreenTeaArray.NewArrayLiteral(ArrayType, Values);
	}

	static ArrayCopy(src: any, srcPos: number, dest: any, destPos: number, length: number): void {
		for(var i = 0; i < length; ++i){
			dest[destPos + i] = src[srcPos + i];
		}
	}

	static ApplyOverridedMethod(FileLine: number, NameSpace: GtNameSpace, Func: GtFunc, Arguments: Object[]): Object {
		var ClassType: GtType = NameSpace.Context.GuessType(Arguments[0]);
		Func = NameSpace.GetOverridedMethod(ClassType, Func);
		return Func.Apply(Arguments);
	}

	static InvokeDynamicFunc(FileLine: number, ContextType: GtType, NameSpace: GtNameSpace, FuncName: string, Arguments: Object[]): Object {
		var PolyFunc: GtPolyFunc = NameSpace.GetPolyFunc(FuncName);
		var Func: GtFunc = PolyFunc.GetMatchedFunc(NameSpace, Arguments);
		var Value: Object = ContextType.DefaultNullValue;
		if(Func != null) {
			Value = Func.Apply(Arguments);
			return LibGreenTea.DynamicCast(ContextType, Value);
		}
		LibGreenTea.VerboseLog(VerboseRuntime, PolyFunc.MessageTypeError(null, FuncName));
		return Value;
	}

	static InvokeDynamicMethod(FileLine: number, ContextType: GtType, NameSpace: GtNameSpace, FuncName: string, Arguments: Object[]): Object {
		var ClassType: GtType = ContextType.Context.GuessType(Arguments[0]);
		var PolyFunc :GtPolyFunc = NameSpace.GetMethod(ClassType, FuncName, true);
		var Func: GtFunc = PolyFunc.GetMatchedFunc(NameSpace, Arguments);
		var Value :Object = ContextType.DefaultNullValue;
		if(Func != null) {
			Value = Func.Apply(Arguments);
			return LibGreenTea.DynamicCast(ContextType, Value);
		}
		LibGreenTea.VerboseLog(VerboseRuntime, PolyFunc.MessageTypeError(ClassType, FuncName));
		return Value;
	}
	
	static DynamicGetter(ContextType: GtType, RecvObject: Object, FieldName: string): Object {
		try {
			return LibGreenTea.DynamicCast(ContextType, RecvObject[FieldName]);
		} catch (e) {
		}
		return ContextType.DefaultNullValue;
	}

	static DynamicSetter(ContextType: GtType, RecvObject: Object, FieldName: string, Value: Object): Object {
		try {
			RecvObject[FieldName] = Value;
			return LibGreenTea.DynamicCast(ContextType, RecvObject[FieldName]);
		} catch (e) {
		}
		return ContextType.DefaultNullValue;
	}

	static GetPlatform(): string {
		return "TypeScript 0.9.0.1, " + (LibGreenTea.isNodeJS ?
			"Node.js " + process.version + " " + process.platform:
			navigator.appName + " " + navigator.appVersion);
	}

	static DebugMode: boolean = true;

	static GetStackInfo(depth: number): string{
		// TODO
		return " ";//LineNumber;
	}

	static TODO(msg: string): void {
		LibGreenTea.println("TODO" + LibGreenTea.GetStackInfo(2) + ": " + msg);
	}

	static DebugP(msg: string): void {
		if(LibGreenTea.DebugMode) {
			LibGreenTea.println("DEBUG" + LibGreenTea.GetStackInfo(2) + ": " + msg);
		}
	}

	static VerboseMask: number = 0/*FIXME VerboseUndefined*/;

	static VerboseLog(VerboseFlag: number, msg: string): void {
		LibGreenTea.println(msg);
	}

	static VerboseException(e: any): void {
		throw new Error("NotImplementedAPI");
	}

	static Exit(status: number, message: string): void {
		throw new Error("Exit: " + message);
	}

	static ParserCount: number = -1;

	static NewParserId(): number {
		LibGreenTea.ParserCount++;
		return LibGreenTea.ParserCount;
	}

	static CharAt(Text: string, Pos: number): number {
		return Text.charCodeAt(Pos);
	}

	static SubString(Text: string , StartIdx: number, EndIdx: number): string {
		return Text.slice(StartIdx, EndIdx);
	}

	static IsWhitespace(Text : string, Pos: number): boolean {
		var ch :number = LibGreenTea.CharAt(Text, Pos);
		return ch == 32/*SP*/ || ch == 9/*TAB*/;
	}

	static IsLetter(Text: string, Pos: number): boolean {
		var ch :number = LibGreenTea.CharAt(Text, Pos);
		if(ch > 90){
			ch -= 0x20;
		}
		return 65/*A*/ <= ch && ch <= 90/*Z*/;
	}

	static IsDigit(Text: string, Pos: number): boolean {
		var ch :number = LibGreenTea.CharAt(Text, Pos);
		return 48/*0*/ <= ch && ch <= 57/*9*/;
	}

	static IsVariableName(Text: string, Pos: number) : boolean {
		var ch :number = LibGreenTea.CharAt(Text, Pos);
		return LibGreenTea.IsLetter(Text, Pos) || ch == '_'.charCodeAt(0) || ch > 255;
	}

	static CheckBraceLevel(Text: string): number {
		var level: number = 0;
		for(var i: number = 0; i < Text.length; i++) {
			var ch: string = Text[i];
			if(ch == '{' || ch == '[') {
				level++;
			}
			if(ch == '}' || ch == ']') {
				level--;
			}
		}
		return level;
	}

	static CharToString(code: number): string {
		return String.fromCharCode(code);
	}

	static UnquoteString(Text: string): string {
		var start : string = Text[0];
		if(start == "\"" || start == "'") {
			Text = Text.substring(1, Text.length - 1);
		}
		return Text
			.replace(/\\t/, "\t")
			.replace(/\\n/, "\n")
			.replace(/\\r/, "\r")
			.replace(/\\"/, "\"")
			.replace(/\\'/, "'")
			.replace(/\\\\/, "\\");
	}

	static QuoteString(Text: string): string {
		return "\"" + Text
			.replace(/\t/, "\\t")
			.replace(/\n/, "\\n")
			.replace(/\r/, "\\r")
			.replace(/"/, "\\\"")
			.replace(/'/, "\\'")
			.replace(/\\/, "\\") + "\"";
	}

	static Stringify(Value: any): string {
		if(Value === null){
			return "null";
		}
		var name = LibGreenTea.GetClassName(Value);
		if(name == "String"){
			return LibGreenTea.QuoteString(<string>Value);
		}
		return Value.toString();
	}

	static StringifyField(Value: any): string {
		var field : string[] = [];
		for(var key in Value){
			field.push(key + ": " + LibGreenTea.Stringify(Value[key]));
		}
		return "{" + field.join(", ") + "};";
	}

	static EqualsString(s1: string, s2: string): boolean {
		return s1 == s2;
	}

	static ParseInt(Text: string): number {
		return ~~(<any>Text);
	}

	static ParseFloat(Text: string): number {
		return <any>Text - 0;
	}

	static GetNativeType(Context: GtParserContext, Value: any): GtType {
		var NativeGtType: GtType = null;
		var NativeClassInfo: any = Value.constructor;
		if(Value.InstanceOf(Number) || Value == Number.prototype) {
			if((<any>Value | 0) == <any>Value) {
				return Context.IntType;
			}
			//return Context.FloatType;
		}
		if(Value.InstanceOf(String) || Value == String.prototype) {
			return Context.StringType;
		}
		NativeGtType = <GtType> Context.ClassNameMap.get(NativeClassInfo.name);
		if(NativeGtType == null) {
			NativeGtType = new GtType(Context, NativeType, NativeClassInfo.name, null, NativeClassInfo);
			Context.ClassNameMap.put(NativeClassInfo.name, NativeGtType);
		}
		if(!NativeGtType.InstanceOf(GtType)){
			throw new Error("Invalid NativeGtType for " + Value.constructor.name);
		}
		return NativeGtType;
	}

	static GetClassName(Value: any): string {
		return (<any>Value).constructor.name;
	}

	static AcceptJavascriptType(GreenType: GtType, Type: any): boolean {
		if(GreenType.IsVarType() || GreenType.IsTypeVariable()) {
			return true;
		}
		if(GreenType.IsTopType()) {
			return (Type == Object);
		}
		var JavascriptType: GtType = LibGreenTea.GetNativeType(GreenType.Context, Type);
		if(GreenType != JavascriptType) {
			if(GreenType.IsGenericType() && GreenType.HasTypeVariable()) {
				return GreenType.BaseType == JavascriptType.BaseType;
			}
			return false;
		}
		return true;
	}

	static MatchNativeMethod(FuncType: GtType, JavaScriptFunction: any): boolean {
		if(!LibGreenTea.AcceptJavascriptType(FuncType.TypeParams[0], Object)) {
			return false;
		}
		var StartIndex: number = 2;
		//if(Modifier.isStatic(JavaScriptFunction.getModifiers())) {
		//	StartIndex = 1;			
		//}
		//else {
		//	if(FuncType.TypeParams.length == 1 || !LibGreenTea.AcceptJavascriptType(FuncType.TypeParams[1], JavaScriptFunction.getDeclaringClass())) {
		//		return false;
		//	}
		//	StartIndex = 2;
		//}
		var ParamSize: number = FuncType.TypeParams.length - StartIndex;
		if(JavaScriptFunction.length != ParamSize) return false;
		for(var i = 0; i < JavaScriptFunction.length; i++) {
			if(!LibGreenTea.AcceptJavascriptType(FuncType.TypeParams[StartIndex+i], Object)) {
				return false;
			}
		}
		return true;
	}

	static SetNativeMethod(NativeMethod: GtFunc, JavaScriptFunction: any): GtFunc {
		var FuncFlag = NativeFunc;
		NativeMethod.SetNativeMethod(FuncFlag, JavaScriptFunction);
		return NativeMethod;
	}

	static ConvertNativeMethodToFunc(Context: GtParserContext, JavaScriptFunction: any): GtFunc {
		var TypeList: GtType[] = [];
		TypeList.add(LibGreenTea.GetNativeType(Context, Object)); // For reciever
		TypeList.add(LibGreenTea.GetNativeType(Context, Object)); // For return
		var ParamTypes = [];
		for(var i = 0; i < JavaScriptFunction.length; i++){
			TypeList.add(LibGreenTea.GetNativeType(Context, Object));
		}
		return LibGreenTea.SetNativeMethod(new GtFunc(0, JavaScriptFunction.name, 0, TypeList), JavaScriptFunction);
	}

	static LoadNativeClass(ClassName: string) : any {
		return eval(ClassName);
	}

	static LoadNativeMethod(ContextType: GtType, FullName: string, StaticMethodOnly: boolean) : any {
		var NameSplitted: string[] = FullName.split(".");
		var FuncName: string = NameSplitted.pop();
		var ClassName: string = NameSplitted.join(".");
		var Class = LibGreenTea.LoadNativeClass(ClassName);
		for(var key in Class){
			var StaticMethod = Class[key];
			if(key == FuncName && StaticMethod && StaticMethod instanceof Function){
				return StaticMethod;
			}
		}
		for(var key in Class.prototype){
			var InstacnceMethod = Class.prototype[key];
			if(key == FuncName && InstacnceMethod && InstacnceMethod instanceof Function){
				return InstacnceMethod;
			}
		}
		LibGreenTea.VerboseLog(VerboseUndefined, "undefined method: " + FullName + " for " + ContextType);
		return null;
	}

	static ImportNativeMethod(NameSpace: GtNameSpace, NativeFunc : GtFunc, FullName: string) : boolean {
		var JavaScriptMethod = LibGreenTea.LoadNativeMethod(NativeFunc.GetFuncType(), FullName, false);
		if(JavaScriptMethod){
			LibGreenTea.SetNativeMethod(NativeFunc, JavaScriptMethod);
			if(NativeFunc.GetReturnType().IsVarType()) {
				NativeFunc.SetReturnType(LibGreenTea.GetNativeType(NativeFunc.GetContext(), Object));
			}
			var StartIdx: number = NativeFunc.Is(NativeStaticFunc) ? 1 : 2;
			for(var i = 0; i < JavaScriptMethod.length; i++) {
				if(NativeFunc.Types[StartIdx + i].IsVarType()) {
					NativeFunc.Types[StartIdx + i] = LibGreenTea.GetNativeType(NativeFunc.GetContext(), Object);
					NativeFunc.FuncType = null; // reset
				}
			}
			return true;
		}
		return false;
	}

	static ImportNativeObject(NameSpace : GtNameSpace, PackageName: string): Object {
		LibGreenTea.VerboseLog(VerboseNative, "importing " + PackageName);
		var NativeClass = LibGreenTea.LoadNativeClass(PackageName);
		if(NativeClass && NativeClass.prototype && NativeClass.prototype.ImportGrammar instanceof Function){
			var LoaderMethod = NativeClass.prototype.ImportGrammar;
			LoaderMethod(NameSpace, NativeClass);
			return LibGreenTea.GetNativeType(NameSpace.Context, NativeClass);
		}
		var Index = PackageName.lastIndexOf(".");
		if(Index == -1) {
			return null;
		}
		var NativeClass = LibGreenTea.LoadNativeClass(PackageName.substring(0, Index));
		return LibGreenTea.ImportStaticObject(NameSpace.Context, NativeClass, PackageName.substring(Index+1));
	}

	static LoadNativeConstructors(ClassType: GtType, FuncList: GtFunc[]) : boolean {
		throw new Error("NotSupportedAPI");
		return false;
	}

	static LoadNativeField(ClassType: GtType, FieldName: string, GetSetter: boolean) : GtFunc {
		throw new Error("NotSupportedAPI");
		return null;
	}

	static NativeFieldValue (ObjectValue: any, NativeField: any/*Field*/) :  any {
		throw new Error("NotImplementedAPI");
		return null;
	}

	static NativeFieldGetter(ObjectValue: any, NativeField: any/*Field*/) : any{
		throw new Error("NotImplementedAPI");
		return null;
	}

	static NativeFieldSetter(ObjectValue: any, NativeField: any/*Field*/, Value: any) : any {
		throw new Error("NotImplementedAPI");
		return null;
	}

	static ImportStaticObject(Context: GtParserContext, NativeClass: any, Symbol: string) : any {
		throw new Error("NotImplementedAPI");
		return null;
	}

	static LoadNativeStaticFieldValue(ClassType: GtType, Symbol: String): any {
		throw new Error("NotImplementedAPI");
		return null;
	}

	static LoadNativeMethods(ClassType: GtType, FuncName: string, FuncList: GtFunc[]): void {
		throw new Error("NotImplementedAPI");
	}

	static LookupNativeMethod(Callee: Object, MethodName: string): any {
		return Callee[MethodName];
	}

	static ApplyFunc(Func: GtFunc, Self: any, Params: any[]): any {
		return (<any>Func.FuncBody).apply(Self, Params);
	}

	static ApplyFunc1(Func: GtFunc, Self: any, Param1: any): any {
		return (<any>Func.FuncBody).call(Self, Param1);
	}

	static ApplyFunc2(Func: GtFunc, Self: any, Param1: any, Param2: any): any {
		return (<any>Func.FuncBody).call(Self, Param1, Param2);
	}

	static ApplyFunc3(Func: GtFunc, Self: any, Param1: any, Param2: any, Param3: any): any {
		return (<any>Func.FuncBody).call(Self, Param1, Param2, Param3);
	}

	static ApplyFunc4(Func: GtFunc, Self: any, Param1: any, Param2: any, Param3: any, Param4: any): any {
		return (<any>Func.FuncBody).call(Self, Param1, Param2, Param3, Param4);
	}

	static ApplyTokenFunc(TokenFunc: GtFunc, TokenContext: GtTokenContext, Text: string, pos: number): number {
		return <number>LibGreenTea.ApplyFunc3(TokenFunc, null, TokenContext, Text, pos);
	}

	static ApplyParseFunc(ParseFunc: GtFunc, NameSpace: GtNameSpace, TokenContext: GtTokenContext, LeftTree: GtSyntaxTree, Pattern: GtSyntaxPattern): GtSyntaxTree {
		return <GtSyntaxTree>LibGreenTea.ApplyFunc4(ParseFunc, null, NameSpace, TokenContext, LeftTree, Pattern);
	}

	static ApplyTypeFunc(TypeFunc: GtFunc, Gamma: GtTypeEnv, ParsedTree: GtSyntaxTree, ContextType: GtType): GtNode {
		return <GtNode>LibGreenTea.ApplyFunc3(TypeFunc, null, Gamma, ParsedTree, ContextType);
	}

	static ListSize(List: any[]) : number {
		if(List == null) {
			return 0;
		}
		return List.length;
	}

	static CompactTypeList(BaseIndex: number, List: GtType[]): GtType[] {
		var Tuple: GtType[] = new Array<GtType>(List.length - BaseIndex);
		for(var i = BaseIndex; i < List.length; i++) {
			Tuple[i] = List[i];
		}
		return Tuple;
	}

	static CompactStringList(List: string[]): string[] {
		return List.slice(0);
	}

	static RetrieveMapKeys(Map: GtMap, Prefix: string, List: string[]): void {
		for(var i = 0; i < Map.keys.length; i++){
			List.push(Map.keys[i]);
		}
	}

	static Usage(message: string): void {
	}

	static DetectTargetCode(Extension: string, TargetCode: string): string {
		throw new Error("NotImplementedAPI");
		return null;
	}

	static StartsWith(self: string, key: string): boolean {
		return self.indexOf(key, 0) == 0;
	}

	static EndsWith(self: string, key: string): boolean {
		return self.lastIndexOf(key, 0) == (self.length - key.length);
	}

	static CodeGenerator(TargetCode: string, OutputFile: string, GeneratorFlag: number): GtGenerator{
		var Extension: string = (OutputFile == null ? "-" : OutputFile)
			if(LibGreenTea.EndsWith(Extension, ".js") || LibGreenTea.StartsWith(TargetCode, "js") || LibGreenTea.StartsWith(TargetCode, "javascript")){
				return new JavaScriptSourceGenerator(TargetCode, OutputFile, GeneratorFlag);
			}else if(LibGreenTea.EndsWith(Extension, ".pl") || LibGreenTea.StartsWith(TargetCode, "perl")){
				return new PerlSourceGenerator(TargetCode, OutputFile, GeneratorFlag);
			}else if(LibGreenTea.EndsWith(Extension, ".py") || LibGreenTea.StartsWith(TargetCode, "python")){
				return new PythonSourceGenerator(TargetCode, OutputFile, GeneratorFlag);
			}else if(LibGreenTea.EndsWith(Extension, ".sh") || LibGreenTea.StartsWith(TargetCode, "bash")){
				return new BashSourceGenerator(TargetCode, OutputFile, GeneratorFlag);
			}else if(LibGreenTea.EndsWith(Extension, ".scala") || LibGreenTea.StartsWith(TargetCode, "scala")){
				return new ScalaSourceGenerator(TargetCode, OutputFile, GeneratorFlag);
			}else if(LibGreenTea.EndsWith(Extension, ".c") || LibGreenTea.StartsWith(TargetCode, "c")){
				return new CSourceGenerator(TargetCode, OutputFile, GeneratorFlag);
			}else if(LibGreenTea.EndsWith(Extension, "X") || LibGreenTea.StartsWith(TargetCode, "exe")){
				throw new Error("JavaByteCodeGenerator is not implemented for this environment");
			}
		return null;
	}

	static WriteCode(OutputFile: string, SourceCode: string): void {
		if(OutputFile == null){
			LibGreenTea.Eval(SourceCode);
		}
		else if(OutputFile == "-"){
			console.log(SourceCode);
		}
		else {
			throw new Error("LibGreenTea.WriteCode cannon write code into a file in this environment");
		}
	}

	static ReadLine(Prompt: string, Prompt2: string): string {
		throw new Error("LibGreenTea.ReadLine is not implemented for this environment");
		return "";
	}

	static ReadLine2(Prompt: string, Prompt2: string): string {
		throw new Error("LibGreenTea.ReadLine is not implemented for this environment");
		return "";
	}

	static HasFile(FileName: string): boolean{
		if(LibGreenTea.hasFileSystem){
			return fs.existsSync(FileName).toString()
		}else{
			return !!GreenTeaLibraries[FileName];
		}
		return false;
	}

	static IsSupportedTarget(TargetCode: string){
		return LibGreenTea.HasFile(LibGreenTea.GetLibPath(TargetCode, "common"));
	}

	static GetLibPath(TargetCode: string, FileName: string): string {
		return ("lib/" + TargetCode + "/" + FileName + ".green");
	}

	static LoadFile2(FileName: string): string{
		if(LibGreenTea.hasFileSystem){
			return fs.readFileSync(FileName);
		}else{
			return GreenTeaLibraries[FileName];
		}
		return "";
	}

	private static Int32Max = Math.pow(2, 32);

	static JoinIntId(UpperId: number, LowerId: number): number {
		return UpperId * LibGreenTea.Int32Max + LowerId;
	}

	static UpperId(Fileline: number): number {
		return (Fileline / LibGreenTea.Int32Max) | 0;
	}

	static LowerId(Fileline: number): number {
		return Fileline | Fileline;
	}

	static booleanValue(Value : Object) : boolean {
		return <boolean>(Value);
	}

	static Eval(SourceCode: string): void {
		return eval(SourceCode);
	}

	public static DynamicCast(CastType: GtType, Value: any): any {
		return null;
	}

	public static DynamicInstanceOf(Value: any, Type: GtType): any {
		return false;
	}

	public static DynamicConvertTo(CastType: GtType, Value: any): any {
		throw new Error("NotImplementedAPI");
		return false;
	}

	public static EvalUnary(Type: GtType, Operator: string, Value: any): any {
		return null;
	}

	public static EvalSuffix(Type: GtType, Value: any, Operator: string): any {
		return null;
	}

	public static EvalBinary(Type: GtType, LeftValue: any, Operator: string, RightValue: any): any {
		return null;
	}

	public static EvalGetter(Type: GtType, Value: any, FieldName: string): any {
		return null;
	}
}
