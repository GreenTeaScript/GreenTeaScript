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

package zen.ast2;

import java.util.ArrayList;

import zen.ast.GtFuncDeclNode;
import zen.ast.GtNode;
import zen.parser.GtNameSpace;
import zen.parser.GtNodeVisitor;
import zen.parser.GtStaticTable;
import zen.parser.GtToken;
import zen.parser.GtType;

final public class GtClassDeclNode extends GtNode {
	/*field*/public GtType ClassType;
	/*field*/public GtNameSpace NameSpace;
	/*field*/public ArrayList<GtNode>  FieldList;
	/*field*/public ArrayList<GtNode>  MemberList;
	public GtClassDeclNode/*constructor*/(GtToken SourceToken, GtNameSpace NameSpace, GtType ClassType) {
		super(GtStaticTable.VarType, SourceToken); // TODO
		this.NameSpace = NameSpace;
		this.ClassType = ClassType;
		this.FieldList = new ArrayList<GtNode>();
		this.MemberList = new ArrayList<GtNode>();
	}
	@Override public GtNode Append(GtNode Node) {
		if(Node instanceof GtFuncDeclNode) {
			this.MemberList.add(Node);
		}
		if(Node instanceof GtFieldNode) {
			this.FieldList.add(Node);
		}
		return this;
	}
	@Override public void Accept(GtNodeVisitor Visitor) {
		Visitor.VisitClassDeclNode(this);
	}
}