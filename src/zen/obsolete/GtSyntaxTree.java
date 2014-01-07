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
package zen.obsolete;

import zen.parser.GtNameSpace;
import zen.parser.ZenSyntaxPattern;
import zen.parser.GtToken;
//endif VAJA
import zen.parser.ZenUtils;

@Deprecated
public final class GtSyntaxTree extends ZenUtils {
//	/*field*/public GtMap               Annotation;
//	/*field*/public GtSyntaxTree		ParentTree;
//	/*field*/public GtSyntaxTree		PrevTree;
//	/*field*/public GtSyntaxTree		NextTree;
//
//	/*field*/public GtNameSpace	             NameSpace;
//	/*field*/public GtSyntaxPattern	         Pattern;
//	/*field*/public GtToken		             KeyToken;
//	/*field*/public ArrayList<GtSyntaxTree>  SubTreeList;
//	/*field*/public Object                   ParsedValue;

	public GtSyntaxTree/*constructor*/(ZenSyntaxPattern Pattern, GtNameSpace NameSpace, GtToken KeyToken, Object ParsedValue) {
//		this.NameSpace   = NameSpace;
//		this.Annotation  = null;
//		this.KeyToken    = KeyToken;
//		this.Pattern     = Pattern;
//		this.ParentTree  = null;
//		this.PrevTree    = null;
//		this.NextTree    = null;
//		this.SubTreeList = null;
//		this.ParsedValue  = ParsedValue;
	}

//	@Override public String toString() {
//		/*local*/String s = "(" + this.KeyToken.ParsedText;
//		/*local*/int i = 0;
//		while(i < LibZen.ListSize(this.SubTreeList)) {
//			/*local*/GtSyntaxTree SubTree = this.SubTreeList.get(i);
//			while(SubTree != null) {
//				/*local*/String Entry = SubTree.toString();
//				if(LibZen.ListSize(SubTree.SubTreeList) == 0) {
//					Entry = SubTree.KeyToken.ParsedText;
//				}
//				s = s + " " + Entry;
//				SubTree = SubTree.NextTree;
//			}
//			i += 1;
//		}
//		return s + ")";
//	}
//
//	public final void AppendNext(GtSyntaxTree Tree) {
//		/*local*/GtSyntaxTree TailTree = this;
//		while(TailTree.NextTree != null) {
//			TailTree = TailTree.NextTree;
//		}
//		TailTree.NextTree = Tree;
//	}
//
//	public void SetAnnotation(GtMap Annotation) {
//		this.Annotation = Annotation;
//	}
//
//	public boolean IsError() {
//		return this.KeyToken.IsError();
//	}
//
//	public void ToError(GtToken Token) {
//		LibNative.Assert(Token.IsError());
//		this.KeyToken = Token;
//		this.SubTreeList = null;
//		this.Pattern = Token.PresetPattern;		
//	}
//
//	public boolean IsMismatched() {
//		return (this.Pattern == null);
//	}
//
//	public void ToMismatched() {
//		this.SubTreeList = null;
//		this.Pattern = null; // Empty tree must backtrack
//	}
//
//	public boolean IsMismatchedOrError() {
//		return this.IsMismatched() || this.KeyToken.IsError();
//	}
//
//	public final boolean IsValidSyntax() {
//		return !(this.IsMismatchedOrError());
//	}
//
//	public void ToEmptyOrError(GtSyntaxTree ErrorTree) {
//		if(ErrorTree == null) {
//			this.ToMismatched();
//		}
//		else {
//			this.ToError(ErrorTree.KeyToken);
//		}
//	}
//
//	public GtSyntaxTree GetSyntaxTreeAt(int Index) {
//		if(this.SubTreeList != null && Index >= this.SubTreeList.size()) {
//			return null;
//		}
//		return this.SubTreeList.get(Index);
//	}
//
//	public void SetSyntaxTreeAt(int Index, GtSyntaxTree Tree) {
//		if(!this.IsError()) {
//			if(Tree.IsError()) {
//				this.ToError(Tree.KeyToken);
//			}
//			else {
//				if(Index >= 0) {
//					if(this.SubTreeList == null) {
//						this.SubTreeList = new ArrayList<GtSyntaxTree>();
//					}
//					if(Index < this.SubTreeList.size()) {
//						this.SubTreeList.set(Index, Tree);
//						return;
//					}
//					while(this.SubTreeList.size() < Index) {
//						this.SubTreeList.add(null);
//					}
//					this.SubTreeList.add(Tree);
//					Tree.ParentTree = this;
//				}
//			}
//		}
//	}
//
//	public void SetMatchedPatternAt(int Index, GtNameSpace NameSpace, GtTokenContext TokenContext, String PatternName,  int MatchFlag) {
//		if(!this.IsMismatchedOrError()) {
//			/*local*/GtSyntaxTree ParsedTree = TokenContext.ParsePattern_OLD(NameSpace, PatternName, MatchFlag);
//			if(ParsedTree != null) {
//				this.SetSyntaxTreeAt(Index, ParsedTree);
//			}
//			else {
//				if(IsFlag(MatchFlag, Required)) {
//					this.ToMismatched();
//				}
//			}
//		}
//	}
//
//	public void SetMatchedTokenAt(int Index, GtNameSpace NameSpace, GtTokenContext TokenContext, String TokenText, int MatchFlag) {
//		if(!this.IsMismatchedOrError()) {
//			/*local*/int Pos = TokenContext.GetPosition(MatchFlag);
//			/*local*/GtToken Token = TokenContext.Next();
//			if(Token.ParsedText.equals(TokenText)) {
//				if(Index == KeyTokenIndex) {
//					this.KeyToken = Token;
//				}
//				else if(Index != NoWhere) {
//					this.SetSyntaxTreeAt(Index, new GtSyntaxTree(null, NameSpace, Token, null));
//				}
//				if(IsFlag(MatchFlag, OpenSkipIndent)) {
//					TokenContext.SetSkipIndent(true);
//				}
//				if(IsFlag(MatchFlag, CloseSkipIndent)) {
//					TokenContext.SetSkipIndent(false);
//				}
//			}
//			else {
//				TokenContext.RollbackPosition(Pos, MatchFlag);
//				if(IsFlag(MatchFlag, Required)) {
//					this.ToEmptyOrError(TokenContext.ReportExpectedToken_OLD(TokenText));
//				}
//			}
//		}
//	}
//
//	public void AppendParsedTree2(GtSyntaxTree Tree) {
//		if(!this.IsError()) {
//			LibNative.Assert(Tree != null);
//			if(Tree.IsError()) {
//				this.ToError(Tree.KeyToken);
//			}
//			else {
//				if(this.SubTreeList == null) {
//					this.SubTreeList = new ArrayList<GtSyntaxTree>();
//				}
//				this.SubTreeList.add(Tree);
//			}
//		}
//	}
//
//	public void AppendMatchedPattern(GtNameSpace NameSpace, GtTokenContext TokenContext, String PatternName,  int MatchFlag) {
//		if(!this.IsMismatchedOrError()) {
//			/*local*/GtSyntaxTree ParsedTree = TokenContext.ParsePattern_OLD(NameSpace, PatternName, MatchFlag);
//			if(ParsedTree != null) {
//				this.AppendParsedTree2(ParsedTree);
//			}
//			else {
//				if(IsFlag(MatchFlag, Required)) {
//					this.ToMismatched();
//				}
//			}
//		}
//	}
//
//	public final GtType GetParsedType() {
//		return (this.ParsedValue instanceof GtType) ? (/*cast*/GtType)this.ParsedValue : null;
//	}
//
//	public final boolean HasNodeAt(int Index) {
//		if(this.SubTreeList != null && Index < this.SubTreeList.size()) {
//			return this.SubTreeList.get(Index) != null;
//		}
//		return false;
//	}

//	public GtNode TypeCheck(GtTypeEnv Gamma, GtType ContextType, int TypeCheckPolicy) {
//		/*local*/GtNode Node = GreenTeaUtils.ApplyTypeFunc(this.Pattern.TypeFunc, Gamma, this, ContextType);
//		return Gamma.TypeCheckSingleNode(this, Node, ContextType, TypeCheckPolicy);
//	}
//
//	public final GtNode TypeCheckAt(int Index, GtTypeEnv Gamma, GtType ContextType, int TypeCheckPolicy) {
//		/*local*/GtSyntaxTree ParsedTree = this.GetSyntaxTreeAt(Index);
//		if(ContextType.IsVoidType() || IsFlag(TypeCheckPolicy, BlockPolicy)) {
//			return GreenTeaUtils.TypeBlock(Gamma, ParsedTree, ContextType);
//		}
//		else if(ParsedTree != null) {
//			return ParsedTree.TypeCheck(Gamma, ContextType, TypeCheckPolicy);
//		}
//		return Gamma.CreateSyntaxErrorNode(this, "not empty");
//	}
//
//	public final void TypeCheckParam(GtTypeEnv Gamma, int TreeIndex, ArrayList<GtNode> NodeList) {
//		while(TreeIndex < LibZen.ListSize(this.SubTreeList)) {
//			/*local*/GtNode Node = this.TypeCheckAt(TreeIndex, Gamma, GtStaticTable.VarType, DefaultTypeCheckPolicy);
//			NodeList.add(Node);
//			TreeIndex = TreeIndex + 1;
//		}
//	}
//
//	public final GtSyntaxTree ToConstTree(Object ConstValue) {
//		this.Pattern = this.NameSpace.GetSyntaxPattern("$Const$");
//		this.ParsedValue = ConstValue;
//		/*return this;*/
//	}
//
//	public final GtSyntaxTree CreateConstTree(Object ConstValue) {
//		return new GtSyntaxTree(this.NameSpace.GetSyntaxPattern("$Const$"), this.NameSpace, this.KeyToken, ConstValue);
//	}

}
