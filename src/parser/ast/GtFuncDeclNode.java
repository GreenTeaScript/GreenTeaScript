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

package parser.ast;

import java.util.ArrayList;

import parser.GtNameSpace;
import parser.GtNodeVisitor;
import parser.GtStaticTable;
import parser.GtToken;

final public class GtFuncDeclNode extends GtNode {
	/*field*/public GtNode TypeNode;
	/*field*/public String FuncName;
	/*field*/public ArrayList<GtNode>  ArgumentList;  // list of ParamNode
	/*field*/public GtNameSpace NameSpace;
	/*field*/public GtNode BodyNode;
	public GtFuncDeclNode/*constructor*/(GtToken SourceToken, GtNode TypeNode, String FuncName) {
		super(GtStaticTable.VarType, SourceToken); // TODO
		this.TypeNode = TypeNode;
		this.ArgumentList = new ArrayList<GtNode>();
		this.NameSpace = null;
		this.BodyNode = null;
	}
	@Override public ArrayList<GtNode> GetList() {
		return this.ArgumentList;
	}
	public void SetFuncBody(GtNameSpace NameSpace, GtNode BodyNode) {
		if(BodyNode != null) {
			this.NameSpace = NameSpace;
			this.BodyNode = BodyNode;
			this.SetChild(BodyNode);
		}
	}
	@Override public void Accept(GtNodeVisitor Visitor) {
		Visitor.VisitFuncDeclNode(this);
	}
}