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
import zen.lang.ZenFunc;
import zen.parser.GtToken;
import zen.parser.ZenVisitor;

// E.g., ConstructorNode is for object creation in Native language defined
final public class GtNewObjectNode extends GtNode {
	/*field*/public ArrayList<GtNode>	ParamList;
	public GtNewObjectNode/*constructor*/(ZenType Type, GtToken Token, ZenFunc Func) {
		super();
		this.ParamList = new ArrayList<GtNode>();
	}
	@Override public final void Append(GtNode Node) {
		this.ParamList.add(this.SetChild(Node));
	}
	@Override public boolean Accept(ZenVisitor Visitor) {
		return Visitor.VisitNewObjectNode(this);
	}
	//	@Override public Object ToConstValue(GtParserContext Context, boolean EnforceConst)  {
	//		if(EnforceConst) {
	//			return Context.Generator.EvalConstructorNode(this, EnforceConst);
	//		}
	//		return null;
	//	}
}