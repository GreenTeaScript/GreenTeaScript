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
import grammar.KonohaGrammar;

import java.util.ArrayList;
//endif VAJA

import parser.GreenTeaUtils;
import parser.GtClassField;
import parser.GtFunc;
import parser.GtNameSpace;
import parser.GtParserContext;
import parser.GtPolyFunc;
import parser.GtStaticTable;
import parser.GtSyntaxPattern;
import parser.GtSyntaxTree;
import parser.GtToken;
import parser.GtTokenContext;
import parser.GtType;
import parser.GtTypeEnv;
import parser.ast.GtGetterNode;
import parser.ast.GtNode;
import parser.ast.GtSymbolNode;
import parser.deps.LibGreenTea;

public class CGrammar extends GreenTeaUtils {
	
	public static long PreprocesserToken(GtTokenContext TokenContext, String SourceText, long pos) {
		/*local*/long start = pos;
		/*local*/String PresetPattern = null;
		pos += 1;
		while(pos < SourceText.length()) {
			if(!LibGreenTea.IsVariableName(SourceText, pos) && !LibGreenTea.IsDigit(SourceText, pos)) {
				break;
			}
			pos += 1;
		}
		TokenContext.AddNewToken(LibGreenTea.SubString(SourceText, start, pos), NameSymbolTokenFlag, PresetPattern);
		return pos;
	}
	
	public static GtSyntaxTree ParseGetterP(GtNameSpace NameSpace, GtTokenContext TokenContext, GtSyntaxTree LeftTree, GtSyntaxPattern Pattern) {
		TokenContext.MatchToken("->");
		/*local*/GtToken Token = TokenContext.Next();
		if(Token.IsNameSymbol()) {
			/*local*/GtSyntaxTree NewTree = new GtSyntaxTree(Pattern, NameSpace, Token, null);
			NewTree.AppendParsedTree2(LeftTree);
			return NewTree;
		}
		return TokenContext.ReportExpectedMessage(Token, "field name", true);
	}

	public static GtNode TypeGetterP(GtTypeEnv Gamma, GtSyntaxTree ParsedTree, GtType ContextType) {
		/*local*/String Name = ParsedTree.KeyToken.ParsedText;
		/*local*/GtNode ObjectNode = ParsedTree.TypeCheckAt(UnaryTerm, Gamma, GtStaticTable.VarType, DefaultTypeCheckPolicy);
		if(ObjectNode.IsErrorNode()) {
			return ObjectNode;
		}
		// 1. To start, check class const such as Math.Pi if base is a type value
		/*local*/String TypeName = ObjectNode.Type.ShortName;
//		if(ObjectNode instanceof ConstNode && ObjectNode.Type.IsTypeType()) {
//			/*local*/GtType ObjectType = (/*cast*/GtType)((/*cast*/ConstNode)ObjectNode).ConstValue;
//			/*local*/Object ConstValue = ParsedTree.NameSpace.GetClassSymbol(ObjectType, ClassStaticName(Name), true);
//			if(ConstValue instanceof GreenTeaEnum) {
//				if(ContextType.IsStringType()) {
//					ConstValue = ((/*cast*/GreenTeaEnum)ConstValue).EnumSymbol;
//				}
//				else {
//					ConstValue = ((/*cast*/GreenTeaEnum)ConstValue).EnumValue;
//				}
//			}
//			if(ConstValue != null) {
//				return Gamma.Generator.CreateConstNode(Gamma.Context.GuessType(ConstValue), ParsedTree, ConstValue);
//			}
//			TypeName = ObjectType.ShortName;
//		}
		// 2. find Class method
		/*local*/GtPolyFunc PolyFunc = ParsedTree.NameSpace.GetMethod(ObjectNode.Type, Name, true);
		if(PolyFunc.FuncList.size() > 0 && ContextType.IsFuncType()) {
			/*local*/GtFunc FirstFunc = PolyFunc.FuncList.get(0);
			GtNode Node = Gamma.Generator.CreateGetterNode(ContextType, ParsedTree, ObjectNode, Name);
			if(Node instanceof GtSymbolNode) {
				((/*cast*/GtSymbolNode)Node).ResolvedFunc = FirstFunc;
			}
		}

		// 3. find Class field
		/*local*/GtFunc GetterFunc = ParsedTree.NameSpace.GetGetterFunc(ObjectNode.Type, Name, true);
		/*local*/GtType ReturnType = (GetterFunc != null) ? GetterFunc.GetReturnType() : GtStaticTable.AnyType;
		/*local*/GtNode Node = Gamma.Generator.CreateGetterNode(ReturnType, ParsedTree, ObjectNode, Name);
		if(Node instanceof GtSymbolNode) {
			((/*cast*/GtGetterNode)Node).ResolvedFunc = GetterFunc;
		}
		if(GetterFunc == null) {
			if(!ObjectNode.Type.IsDynamicType() && ContextType != GtStaticTable.FuncType) {
				return Gamma.ReportTypeResult(ParsedTree, Node, TypeErrorLevel, "undefined name: " + Name + " of " + TypeName);
			}
		}
		return Node;
	}
	
	public static GtSyntaxTree ParseStructDecl2(GtNameSpace NameSpace, GtTokenContext TokenContext, GtSyntaxTree LeftTree, GtSyntaxPattern Pattern) {
		/*local*/GtSyntaxTree ClassDeclTree = TokenContext.CreateMatchedSyntaxTree(NameSpace, Pattern, "struct");
		ClassDeclTree.SetMatchedPatternAt(ClassDeclName, NameSpace, TokenContext, "$FuncName$", Required); //$ClassName$ is better
		//if(TokenContext.MatchToken("extends")) {
		//	ClassDeclTree.SetMatchedPatternAt(ClassDeclSuperType, NameSpace, TokenContext, "$Type$", Required);
		//}
		if(ClassDeclTree.IsMismatchedOrError()) {
			return ClassDeclTree;
		}
		// define new class
		/*local*/GtNameSpace ClassNameSpace = new GtNameSpace(NameSpace.Context, NameSpace);
		/*local*/GtToken NameToken = ClassDeclTree.GetSyntaxTreeAt(ClassDeclName).KeyToken;
		/*local*/GtType SuperType = GtStaticTable.TopType;
		//if(ClassDeclTree.HasNodeAt(ClassDeclSuperType)) {
		//	SuperType = ClassDeclTree.GetSyntaxTreeAt(ClassDeclSuperType).GetParsedType();
		//}
		/*local*/int ClassFlag = KonohaGrammar.ParseClassFlag(0, TokenContext.ParsingAnnotation);
		/*local*/String ClassName = NameToken.ParsedText;
		/*local*/GtType DefinedType = NameSpace.GetType(ClassName);
		if(DefinedType != null && DefinedType.IsAbstractType()) {
			DefinedType.TypeFlag = ClassFlag;
			DefinedType.SuperType = SuperType;
			NameToken = null; // preventing duplicated symbol message at (A)
		}
		else {
			DefinedType = SuperType.CreateSubType(ClassFlag, ClassName, null, null);
			ClassNameSpace.AppendTypeName(DefinedType, NameToken);  // temporary
		}
		//ClassNameSpace.SetSymbol("This", DefinedType, NameToken);

		ClassDeclTree.SetMatchedPatternAt(ClassDeclBlock, ClassNameSpace, TokenContext, "$Block$", Optional);
		if(ClassDeclTree.HasNodeAt(ClassDeclBlock)) {
			/*local*/GtClassField ClassField = new GtClassField(DefinedType, NameSpace);
			/*local*/GtTypeEnv Gamma = new GtTypeEnv(ClassNameSpace);
			/*local*/GtSyntaxTree SubTree = ClassDeclTree.GetSyntaxTreeAt(ClassDeclBlock);
			while(SubTree != null) {
				if(SubTree.Pattern.EqualsName("$VarDecl$")) {
					CGrammar.TypeMemberDecl(Gamma, SubTree, ClassField);
				}
				SubTree = SubTree.NextTree;
			}
			ClassDeclTree.ParsedValue = ClassField;
		}
		if(ClassDeclTree.IsValidSyntax()) {
			NameSpace.AppendTypeName(DefinedType, NameToken);   /* (A) */
		}
		return ClassDeclTree;
	}

	public static GtNode TypeStructDecl2(GtTypeEnv Gamma, GtSyntaxTree ParsedTree, GtType ContextType) {
		/*local*/GtClassField ClassField = (/*cast*/GtClassField)ParsedTree.ParsedValue;
		if(ClassField != null) {
			/*local*/GtType DefinedType = ClassField.DefinedType;
			DefinedType.SetClassField(ClassField);
			Gamma.Generator.OpenClassField(ParsedTree, DefinedType, ClassField);
			/*local*/GtSyntaxTree SubTree = ParsedTree.GetSyntaxTreeAt(ClassDeclBlock);
			/*local*/ArrayList<GtFunc> MemberList = new ArrayList<GtFunc>();
			while(SubTree != null) {
				//if(SubTree.Pattern.EqualsName("$FuncDecl$") || SubTree.Pattern.EqualsName("$Constructor2$")) {
				//	MemberList.add((/*cast*/GtFunc)SubTree.ParsedValue);
				//}
				if(!SubTree.Pattern.EqualsName("$VarDecl$")) {
					SubTree.TypeCheck(Gamma, GtStaticTable.VoidType, DefaultTypeCheckPolicy);
				}
				SubTree = SubTree.NextTree;
			}
			Gamma.Generator.CloseClassField(DefinedType, MemberList);
		}
		return Gamma.Generator.CreateEmptyNode(GtStaticTable.VoidType);
	}
	
	private static boolean TypeMemberDecl(GtTypeEnv Gamma, GtSyntaxTree ParsedTree, GtClassField ClassField) {
		/*local*/int    FieldFlag = KonohaGrammar.ParseVarFlag(0, ParsedTree.Annotation);
		/*local*/GtType DeclType = ParsedTree.GetSyntaxTreeAt(VarDeclType).GetParsedType();
		/*local*/String FieldName = ParsedTree.GetSyntaxTreeAt(VarDeclName).KeyToken.ParsedText;
		/*local*/GtNode InitValueNode = null;
		/*local*/Object InitValue = null;
		if(ParsedTree.HasNodeAt(VarDeclValue)) {
			InitValueNode = ParsedTree.TypeCheckAt(VarDeclValue, Gamma, DeclType, OnlyConstPolicy | NullablePolicy);
			if(InitValueNode.IsErrorNode()) {
				return false;
			}
			InitValue = InitValueNode.ToConstValue(Gamma.Context, true);
		}
		if(GreenTeaUtils.UseLangStat) {
			Gamma.Context.Stat.VarDecl += 1;
		}/*EndOfStat*/
		if(DeclType.IsVarType()) {
			if(InitValueNode == null) {
				DeclType = GtStaticTable.AnyType;
			}
			else {
				DeclType = InitValueNode.Type;
			}
			Gamma.ReportTypeInference(ParsedTree.KeyToken, FieldName, DeclType);
			if(GreenTeaUtils.UseLangStat) {
				Gamma.Context.Stat.VarDeclInfer += 1;
				if(DeclType.IsAnyType()) {
					Gamma.Context.Stat.VarDeclInferAny += 1;
				}
			}/*EndOfStat*/
		}
		if(GreenTeaUtils.UseLangStat) {
			if(DeclType.IsAnyType()) {
				Gamma.Context.Stat.VarDeclAny += 1;
			}
		}/*EndOfStat*/
		if(InitValueNode == null) {
			InitValue = DeclType.DefaultNullValue;
		}
		ClassField.CreateField(FieldFlag, DeclType, FieldName, ParsedTree.GetSyntaxTreeAt(VarDeclName).KeyToken, InitValue);
		return true;
	}

	public static GtSyntaxTree ParseInclude(GtNameSpace NameSpace, GtTokenContext TokenContext, GtSyntaxTree LeftTree, GtSyntaxPattern Pattern) {
		TokenContext.Next(); // skipped first token "require";
		while(TokenContext.HasNext()) {
			/*local*/GtToken Token = TokenContext.Next();
			if(Token.IsIndent() || Token.IsDelim()) {
				break;
			}
			if(Token.IsNameSymbol()) {
				if(!NameSpace.LoadRequiredLib(Token.ParsedText)) {
					return TokenContext.NewErrorSyntaxTree(Token, "failed to load required library: " + Token.ParsedText);
				}
			}
			if(TokenContext.MatchToken(",")) {
				continue;
			}
		}
		return KonohaGrammar.ParseEmpty(NameSpace, TokenContext, LeftTree, Pattern);
	}
	
	//ifdef JAVA
	// this is a new interface used in ImportNativeObject
	public static void ImportGrammar(GtNameSpace NameSpace, Class<?> GrammarClass) {
		/*local*/GtParserContext ParserContext = NameSpace.Context;
		NameSpace.AppendTokenFunc("#", LoadTokenFunc2(ParserContext, GrammarClass, "PreprocesserToken"));
		NameSpace.AppendExtendedSyntax_OLD("->", 0, LoadParseFunc2(ParserContext, GrammarClass, "ParseGetterP"), LoadTypeFunc2(ParserContext, GrammarClass, "TypeGetterP"));
		NameSpace.AppendSyntax_OLD("struct", LoadParseFunc2(ParserContext, GrammarClass, "ParseStructDecl2"), LoadTypeFunc2(ParserContext, GrammarClass, "TypeStructDecl2"));
		NameSpace.AppendSyntax_OLD("#include", LoadParseFunc2(ParserContext, GrammarClass, "ParseInclude"), null);
	}
	//endif VAJA
}
