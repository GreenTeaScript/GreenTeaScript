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

//ifdef JAVA
package parser.ast;
import java.util.ArrayList;

import parser.GreenTeaConsts;
import parser.GtNameSpace;
import parser.GtNodeVisitor;
import parser.GtToken;
import parser.GtType;
import parser.ast2.GtThrowNode;
import parser.deps.LibNative;
//endif VAJA

public class GtNode {
	/*field*/public GtNode	ParentNode;
	/*field*/public GtNode	PrevNode;
	/*field*/public GtNode	NextNode;
	/*field*/public GtType	Type;
	/*field*/public GtToken	Token;

	public GtNode/*constructor*/(GtType Type, GtToken Token) {
		//		this.Context = Context;
		this.Type = Type;
		this.Token = Token;
		this.ParentNode = null;
		this.PrevNode = null;
		this.NextNode = null;
	}

	// Override by GtVarDeclNode, GtUsingVarDeclNode
	public void SetNextStatement(GtNode NextNode) {
		this.NextNode = NextNode;
		NextNode.PrevNode = this;
	}

	public final GtNode MoveHeadNode() {
		/*local*/GtNode Node = this;
		while(Node.PrevNode != null) {
			Node = Node.PrevNode;
		}
		return Node;
	}
	public final GtNode MoveTailNode() {
		/*local*/GtNode Node = this;
		while(Node.NextNode != null) {
			Node = Node.NextNode;
		}
		return Node;
	}

	public final boolean IsConstNode() {
		return (this instanceof GtConstPoolNode);
	}
	public final boolean IsNullNode() {
		return (this instanceof GtNullNode);
	}
	public final boolean IsErrorNode() {
		return (this instanceof GtErrorNode);
	}

	public final boolean HasReturnNode() {
		/*local*/GtNode LastNode = this.MoveTailNode();
		return ((LastNode instanceof GtReturnNode) || (LastNode instanceof GtThrowNode));
	}

	public final void SetChild(GtNode Node) {
		if(Node != null) {
			Node.ParentNode = this;
		}
	}

	@Deprecated
	public final void SetChild2(GtNode Node, GtNode Node2) {
		this.SetChild(Node);
		this.SetChild(Node2);
	}

	@Deprecated
	public final void SetChild3(GtNode Node, GtNode Node2, GtNode Node3) {
		this.SetChild(Node);
		this.SetChild(Node2);
		this.SetChild(Node3);
	}

	public ArrayList<GtNode> GetList() {
		return null;
	}


	public GtNode Append(GtNode Node) {
		this.GetList().add(Node);
		this.SetChild(Node);
		return this;
	}

	//	public final GtNode GetAt(int Index) {
	//		return this.GetList().get(Index);
	//	}
	//	public final GtNode AppendNodeList(int StartIndex, ArrayList<GtNode> NodeList) {
	//		/*local*/int i = StartIndex;
	//		/*local*/ArrayList<GtNode> List = this.GetList();
	//		while(i < LibGreenTea.ListSize(NodeList)) {
	//			/*local*/GtNode Node = NodeList.get(i);
	//			List.add(Node);
	//			this.SetChild(Node);
	//			i = i + 1;
	//		}
	//		return this;
	//	}

	public final GtNode Done() {
		return new GtEmptyNode(this.Token);
	}

	public String GetVisitMethodName() {
		return "VisitNode"; // override this if you want to use additional node
	}

	public void Accept(GtNodeVisitor Visitor) {
		LibNative.VisitNode(Visitor, this);
	}

	public GtNode TypeCheck(GtNameSpace NameSpace, GtType ContextType) {
		/* must override */
		return this;
	}

	public GtConstNode ToConstNode(boolean EnforceConst) {
		if(EnforceConst) {
			return new GtErrorNode(this.Token, "value must be constant");
		}
		return null;
	}

	public final Object ToNullValue(GtNameSpace NameSpace, boolean EnforceConst) {
		if(EnforceConst) {
			NameSpace.Generator.ReportError(GreenTeaConsts.ErrorLevel, this.Token, "value must be constant");
		}
		return null;
	}
	public Object Eval(GtNameSpace NameSpace, boolean EnforceConst)  {
		return this.ToNullValue(NameSpace, EnforceConst);
	}

	public final static GtNode LinkNode(GtNode LastNode, GtNode Node) {
		Node.PrevNode = LastNode;
		if(LastNode != null) {
			LastNode.NextNode = Node;
		}
		return Node;
	}
}

