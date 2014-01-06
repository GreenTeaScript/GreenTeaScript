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

import zen.ast.GtNode;
import zen.lang.ZenType;
import zen.parser.GtToken;

/**
 * using(File f = new File() {
 * 	f.read();
 * }
 * try-catch is needed
 */
final public class GtUsingNode extends GtNode {
	/*field*/public ZenType	DeclType;
	/*field*/public String  NativeName;
	/*field*/public GtNode	InitNode;
	/*field*/public GtNode	BlockNode;   // release resource of NativeName after BlockNode
	/* let VarNode in Block end */
	public GtUsingNode/*constructor*/(ZenType Type, GtToken Token, ZenType DeclType, String VariableName, GtNode InitNode, GtNode Block) {
		super();
		this.NativeName = VariableName;
		this.DeclType  = DeclType;
		this.InitNode  = InitNode;
		this.BlockNode = Block;
//		this.SetChild2(InitNode, this.BlockNode);
	}
//	@Override public boolean Accept(GtVisitor Visitor) {
//		return Visitor.VisitUsingNode(this);
//	}
}