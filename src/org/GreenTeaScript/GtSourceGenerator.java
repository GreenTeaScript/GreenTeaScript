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
package org.GreenTeaScript;
import java.util.ArrayList;
//endif VAJA

public class GtSourceGenerator extends GtGenerator {
	/*field*/private ArrayList<GtSourceBuilder> BuilderList;
	/*field*/private   GtSourceBuilder HeaderBuilder;
	/*field*/protected GtSourceBuilder VisitingBuilder;
	
	/*field*/public String    Tab;
	/*field*/public String    LineFeed;
	/*field*/public String    LineComment;
	/*field*/public String    BeginComment;
	/*field*/public String    EndComment;
	/*field*/public String    SemiColon;
	/*field*/public String    Camma;

	/*field*/public String    TrueLiteral;
	/*field*/public String    FalseLiteral;
	/*field*/public String    NullLiteral;

//	/*field*/public int       IndentLevel;
//	/*field*/public String    CurrentLevelIndentString;
//
//	/*field*/public boolean   HasLabelSupport;
//	/*field*/public String    LogicalOrOperator;
//	/*field*/public String    LogicalAndOperator;
//	/*field*/public String    MemberAccessOperator;
//	/*field*/public String    BreakKeyword;
//	/*field*/public String    ContinueKeyword;
//	/*field*/public String    ParameterBegin;
//	/*field*/public String    ParameterEnd;
//	/*field*/public String    ParameterDelimiter;
//	/*field*/public String    BlockBegin;
//	/*field*/public String    BlockEnd;
	
	public GtSourceGenerator/*constructor*/(String TargetCode, String OutputFile, int GeneratorFlag) {
		super(TargetCode, OutputFile, GeneratorFlag);
		this.BuilderList = new ArrayList<GtSourceBuilder>();
		this.HeaderBuilder = this.NewSourceBuilder();
		this.VisitingBuilder = null;
		this.LineFeed = "\n";
		this.Tab = "   ";
		this.LineComment = "//";  // if not, set null
		this.BeginComment = "/*";
		this.EndComment   = "*/";
		this.Camma = ", ";
		this.SemiColon   = ";";

		this.TrueLiteral  = "true";
		this.FalseLiteral = "false";
		this.NullLiteral  = "null";

//		this.CurrentLevelIndentString = null;
//
//		this.HasLabelSupport = false;
//		this.LogicalOrOperator  = "||";
//		this.LogicalAndOperator = "&&";
//		this.MemberAccessOperator = ".";
//		this.BreakKeyword = "break";
//		this.ContinueKeyword = "continue";
//		this.LineComment  = "//";
//		this.ParameterBegin = "(";
//		this.ParameterEnd = ")";
//		this.ParameterDelimiter = ",";
//		this.SemiColon = ";";
//		this.BlockBegin = "{";
//		this.BlockEnd = "}";
	}

	@Override public void InitContext(GtParserContext Context) {
		super.InitContext(Context);
	}
	
	public GtSourceBuilder NewSourceBuilder() {
		/*local*/GtSourceBuilder Builder = new GtSourceBuilder(this);
		this.BuilderList.add(Builder);
		return Builder;
	}

	public final void FlushErrorReport() {
		/*local*/GtSourceBuilder Builder = this.NewSourceBuilder();
		/*local*/String[] Reports = this.Context.GetReportedErrors();
		/*local*/int i = 0;
		Builder.AppendLine("");
		while(i < Reports.length) {
			Builder.AppendCommentLine(Reports[i]);
			i = i + 1;
		}
		Builder.AppendLine("");
	}

	@Override public String GetSourceCode() {
		/*local*/String SourceCode = "";
		for(/*local*/int i = 0; i < this.BuilderList.size(); i++) {
			/*local*/GtSourceBuilder Builder = this.BuilderList.get(i);
			for(/*local*/int j = 0; j <  Builder.SourceList.size(); j++) {
				SourceCode += Builder.SourceList.get(j);
			}
			SourceCode += "\n";
		}
		return SourceCode;
	}

	@Override public void FlushBuffer() {
		LibGreenTea.WriteSource(this.OutputFile, this.BuilderList);
		this.BuilderList.clear();
		this.HeaderBuilder.SourceList.clear();
	}

	public void VisitIndentBlock(String BeginBlock, GtNode Node, String EndBlock) {
		this.VisitingBuilder.AppendLine(BeginBlock);
		this.VisitingBuilder.Indent();
		/*local*/GtNode CurrentNode = Node;
		while(CurrentNode != null) {
			if(!this.IsEmptyBlock(CurrentNode)) {
				this.VisitingBuilder.AppendIndent();
				CurrentNode.Evaluate(this);
				this.VisitingBuilder.AppendLine(this.SemiColon);
			}
			CurrentNode = CurrentNode.NextNode;
		}
		this.VisitingBuilder.UnIndent();
		if(EndBlock != null) {
			this.VisitingBuilder.IndentAndAppend(EndBlock);
		}
	}
	
	protected String StringifyConstValue(Object ConstValue) {
		if(ConstValue == null) {
			return this.NullLiteral;
		}
		if(ConstValue instanceof Boolean) {
			if(ConstValue.equals(true)) {
				return this.TrueLiteral;
			}
			else {
				return this.FalseLiteral;
			}
		}
		if(ConstValue instanceof String) {
			return LibGreenTea.QuoteString((/*cast*/String)ConstValue);
		}
		if(ConstValue instanceof GreenTeaEnum) {
			return "" + ((/*cast*/GreenTeaEnum) ConstValue).EnumValue;
		}
		return ConstValue.toString();
	}

	public void ExpandNativeMacro(String NativeMacro, ArrayList<GtNode> ParamList) {
		/*local*/int ParamSize = LibGreenTea.ListSize(ParamList);
		/*local*/int ParamIndex = 0;
		/*local*/GtSourceBuilder CurrentBuilder = this.VisitingBuilder;
		while(ParamIndex < ParamSize) {
			this.VisitingBuilder = new GtSourceBuilder(this);
			ParamList.get(ParamIndex).Evaluate(this);
			/*local*/String Param = this.VisitingBuilder.toString();
			NativeMacro = NativeMacro.replace("$" + (ParamIndex + 1), Param);
			ParamIndex += 1;
		}
		this.VisitingBuilder = CurrentBuilder;
		this.VisitingBuilder.Append(NativeMacro);
	}
}
