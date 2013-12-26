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


import parser.GtNodeVisitor;
import parser.GtParserContext;
import parser.GtToken;
import parser.GtType;
import parser.deps.LibGreenTea;

//E.g., $CondNode "?" $ThenExpr ":" $ElseExpr
final public class GtTrinaryNode extends GtNode {
	/*field*/public GtNode	CondNode;
	/*field*/public GtNode	ThenNode;
	/*field*/public GtNode	ElseNode;
	public GtTrinaryNode/*constructor*/(GtType Type, GtToken Token, GtNode CondNode, GtNode ThenNode, GtNode ElseNode) {
		super(Type, Token);
		this.CondNode = CondNode;
		this.ThenNode = ThenNode;
		this.ElseNode = ElseNode;
		this.SetChild3(CondNode, ThenNode, ElseNode);
	}
	@Override public void Accept(GtNodeVisitor Visitor) {
		Visitor.VisitTrinaryNode(this);
	}
	@Override public Object ToConstValue(GtParserContext Context, boolean EnforceConst)  {
		/*local*/Object CondValue = this.CondNode.ToConstValue(Context, EnforceConst) ;
		if(CondValue instanceof Boolean) {
			if(LibGreenTea.booleanValue(CondValue)) {
				return this.ThenNode.ToConstValue(Context, EnforceConst);
			}
			else {
				return this.ElseNode.ToConstValue(Context, EnforceConst);
			}
		}
		return null;
	}
}