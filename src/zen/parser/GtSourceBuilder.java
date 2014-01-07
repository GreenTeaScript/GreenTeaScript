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
package zen.parser;
import java.util.ArrayList;

import zen.ast.GtNode;
import zen.deps.LibNative;
import zen.deps.LibZen;
//endif VAJA

public class GtSourceBuilder {
	/*field*/public ArrayList<String> SourceList;
	/*field*/ZenSourceGenerator Template;
	/*field*/int IndentLevel = 0;
	/*field*/String CurrentIndentString;
	
	public GtSourceBuilder/*constructor*/(ZenSourceGenerator Template) {
		this.Template = Template;
		this.SourceList = new ArrayList<String>();
		this.IndentLevel = 0;
		this.CurrentIndentString = "";
	}
	
	public void Clear() {
		this.SourceList.clear();
	}
	
	public void Append(String Text) {
		this.SourceList.add(Text);
	}

	public final void AppendLineFeed() {
		this.SourceList.add(this.Template.LineFeed);
	}

	public void AppendToken(String Text) {
		this.SourceList.add(" ");
		this.SourceList.add(Text);
		this.SourceList.add(" ");
	}
	

	public final void AppendCommentLine(String Text) {
		if(this.Template.LineComment == null) {
			this.SourceList.add(this.Template.BeginComment);
			this.SourceList.add(Text);
			this.SourceList.add(this.Template.EndComment);
		}
		else {
			this.SourceList.add(this.Template.LineComment);
			this.SourceList.add(Text);
		}
		this.SourceList.add(this.Template.LineFeed);
	}

	public final void Indent() {
		this.IndentLevel += 1;
		this.CurrentIndentString = null;
	}

	public final void UnIndent() {
		this.IndentLevel -= 1;
		this.CurrentIndentString = null;
		LibNative.Assert(this.IndentLevel >= 0);
	}

	private final String GetIndentString() {
		if(this.CurrentIndentString == null) {
			this.CurrentIndentString = ZenUtils.JoinStrings(this.Template.Tab, this.IndentLevel);
		}
		return this.CurrentIndentString;
	}

	public void AppendIndent() {
		this.SourceList.add(this.GetIndentString());
	}

	public void IndentAndAppend(String Text) {
		this.SourceList.add(this.GetIndentString());
		this.SourceList.add(Text);
	}

	public void AppendParamList(ArrayList<GtNode> ParamList, int BeginIdx, int EndIdx) {
		/*local*/int i = BeginIdx;
		while(i < EndIdx) {
			if(i > BeginIdx) {
				this.Append(this.Template.Camma);
			}
			ParamList.get(i).Accept(this.Template);
			i = i + 1;
		}
	}
	
	@Override public String toString() {
		return LibZen.SourceBuilderToString(this);
	}
}
