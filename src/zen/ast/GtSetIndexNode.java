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

package zen.ast;

import zen.parser.ZenVisitor;

//E.g., $Recv[$Index] = $ValueNode
final public class GtSetIndexNode extends GtNode {
	/*field*/public GtNode  RecvNode;
	/*field*/public GtNode  IndexNode;
	/*field*/public GtNode  ValueNode;
	public GtSetIndexNode/*constructor*/(GtGetIndexNode Node) {
		super();
		this.Type = Node.Type;
		this.SourceToken = Node.SourceToken;
		this.RecvNode  = this.SetChild(Node.RecvNode);
		this.IndexNode = this.SetChild(Node.IndexNode);
		this.ValueNode = null;
	}
	@Override public void Append(GtNode Node) {
		this.ValueNode = this.SetChild(Node);
	}
	@Override public boolean Accept(ZenVisitor Visitor) {
		return Visitor.VisitSetIndexNode(this);
	}
//	@Override public Object Eval(GtNameSpace NameSpace, boolean EnforceConst)  {
//		//FIXME
//		//return Context.Generator.EvalSetIndexNode(this, EnforceConst);
//		return null;
//	}
}