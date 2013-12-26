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

package zen.ast;

import zen.deps.LibGreenTea;
import zen.parser.GtNameSpace;
import zen.parser.GtNodeVisitor;
import zen.parser.GtStaticTable;
import zen.parser.GtToken;
import zen.parser.GtType;

//E.g., (T) $Expr
final public class GtCastNode extends GtNode {
	/*field*/public GtTypeNode	CastTypeNode;
	/*field*/public GtNode	ExprNode;
	public GtCastNode/*constructor*/() {
		super(GtStaticTable.VarType, null);
		this.CastTypeNode = null;
		this.ExprNode = null;
	}
	@Override public GtNode Append(GtNode Node) {
		this.SetChild(Node);
		if(this.CastTypeNode == null) {
			this.CastTypeNode = (GtTypeNode)Node;
			this.Type = this.CastTypeNode.ParsedType;
		}
		else {
			this.ExprNode = Node;
		}
		return this;
	}
	@Override public void Accept(GtNodeVisitor Visitor) {
		Visitor.VisitCastNode(this);
	}
	@Override public Object Eval(GtNameSpace NameSpace, boolean EnforceConst)  {
		/*local*/Object Value = this.ExprNode.Eval(NameSpace, EnforceConst) ;
		if(Value != null) {
			return LibGreenTea.DynamicCast(this.Type, Value);
		}
		return Value;
	}

	@Deprecated
	public GtCastNode/*constructor*/(GtType Type, GtToken Token, GtType CastType, GtNode Expr) {
		super(Type, Token);
		//		this.CastType = CastType;
		//		this.Expr = Expr;
	}
}