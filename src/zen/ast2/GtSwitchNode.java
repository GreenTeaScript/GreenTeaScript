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

package zen.ast2;

import java.util.ArrayList;

import zen.ast.GtNode;
import zen.lang.ZenType;
import zen.parser.GtToken;

final public class GtSwitchNode extends GtNode {
	/*field*/public GtNode	MatchNode;
	/*field*/public GtNode	DefaultBlock;
	/*field*/public ArrayList<GtNode> CaseList; // [expr, block, expr, block, ....]
	public GtSwitchNode/*constructor*/(ZenType Type, GtToken Token, GtNode MatchNode, GtNode DefaultBlock) {
		super();
		this.MatchNode = MatchNode;
		this.DefaultBlock = DefaultBlock;
		this.CaseList = new ArrayList<GtNode>();
		this.SetChild(DefaultBlock);
	}
//	@Override public boolean Accept(GtVisitor Visitor) {
//		return Visitor.VisitSwitchNode(this);
//	}
//	@Override public final ArrayList<GtNode> GetList() {
//		return this.CaseList;
//	}
}