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

//ifdef JAVA
package zen.ast;
import java.util.ArrayList;

import zen.deps.LibNative;
import zen.lang.ZenTypeSystem;
import zen.parser.GtNameSpace;
import zen.parser.GtToken;
import zen.parser.GtType;
import zen.parser.GtVisitor;
import zen.parser.ZenParserConst;

public abstract class GtNode {
	/*field*/public GtNode	ParentNode;
	/*field*/public GtType	Type;
	/*field*/public GtToken	SourceToken;

	public GtNode/*constructor*/() {
		this.Type = ZenTypeSystem.VarType;
		this.SourceToken = null;
		this.ParentNode = null;
	}

	public final boolean IsErrorNode() {
		return (this instanceof GtErrorNode);
	}

	public final GtNode SetChild(GtNode Node) {
		if(Node != null) {
			Node.ParentNode = this;
		}
		return this;
	}

	public final ArrayList<GtNode> GetList() {
		return null;
	}

	public void Append(GtNode Node) {
		this.SetChild(Node);
	}

	public final GtNode Done() {
		return new GtBlockNode(this.SourceToken, null);
	}

	public String GetVisitName() {
		return "VisitNode"; // override this if you want to use additional node
	}

//	public abstract boolean Accept(GtVisitor Visitor);
	public boolean Accept(GtVisitor Visitor) {
		return LibNative.VisitNode(Visitor, this);
	}

	public GtConstNode ToConstNode(boolean EnforceConst) {
		if(EnforceConst) {
			return new GtErrorNode(this.SourceToken, "value must be constant");
		}
		return null;
	}

	public final Object ToNullValue(GtNameSpace NameSpace, boolean EnforceConst) {
		if(EnforceConst) {
			NameSpace.Generator.ReportError(ZenParserConst.ErrorLevel, this.SourceToken, "value must be constant");
		}
		return null;
	}
	public Object Eval(GtNameSpace NameSpace, boolean EnforceConst)  {
		return this.ToNullValue(NameSpace, EnforceConst);
	}

//	public final static GtNode LinkNode(GtNode LastNode, GtNode Node) {
//		Node.PrevNode = LastNode;
//		if(LastNode != null) {
//			LastNode.NextNode = Node;
//		}
//		return Node;
//	}
}

