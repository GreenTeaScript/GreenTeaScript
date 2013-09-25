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

public class CGrammar extends GreenTeaUtils {
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
		/*local*/GtNode ObjectNode = ParsedTree.TypeCheckAt(UnaryTerm, Gamma, Gamma.VarType, DefaultTypeCheckPolicy);
		if(ObjectNode.IsError()) {
			return ObjectNode;
		}
		// 1. To start, check class const such as Math.Pi if base is a type value
		/*local*/String TypeName = ObjectNode.Type.ShortName;
		if(ObjectNode instanceof ConstNode && ObjectNode.Type.IsTypeType()) {
			/*local*/GtType ObjectType = (/*cast*/GtType)((/*cast*/ConstNode)ObjectNode).ConstValue;
			/*local*/Object ConstValue = ParsedTree.NameSpace.GetClassSymbol(ObjectType, ClassStaticName(Name), true);
			if(ConstValue instanceof GreenTeaEnum) {
				if(ContextType.IsStringType()) {
					ConstValue = ((/*cast*/GreenTeaEnum)ConstValue).EnumSymbol;
				}
				else {
					ConstValue = ((/*cast*/GreenTeaEnum)ConstValue).EnumValue;
				}
			}
			if(ConstValue != null) {
				return Gamma.Generator.CreateConstNode(Gamma.Context.GuessType(ConstValue), ParsedTree, ConstValue);
			}
			TypeName = ObjectType.ShortName;
		}
		// 2. find Class method
		/*local*/GtPolyFunc PolyFunc = ParsedTree.NameSpace.GetMethod(ObjectNode.Type, Name, true);
		if(PolyFunc.FuncList.size() > 0 && ContextType == Gamma.FuncType) {
			/*local*/GtFunc FirstFunc = PolyFunc.FuncList.get(0);
			return Gamma.Generator.CreateGetterNode(ContextType, ParsedTree, FirstFunc, ObjectNode);
		}

		// 3. find Class field
		/*local*/GtFunc GetterFunc = ParsedTree.NameSpace.GetGetterFunc(ObjectNode.Type, Name, true);
		/*local*/GtType ReturnType = (GetterFunc != null) ? GetterFunc.GetReturnType() : Gamma.AnyType;
		/*local*/GtNode Node = Gamma.Generator.CreateGetterNode(ReturnType, ParsedTree, GetterFunc, ObjectNode);
		if(GetterFunc == null) {
			if(!ObjectNode.Type.IsDynamic() && ContextType != Gamma.FuncType) {
				return Gamma.ReportTypeResult(ParsedTree, Node, TypeErrorLevel, "undefined name: " + Name + " of " + TypeName);
			}
		}
		return Node;
	}

	//ifdef JAVA
		// this is a new interface used in ImportNativeObject
		public static void ImportGrammar(GtNameSpace NameSpace, Class<?> GrammarClass) {
			/*local*/GtParserContext ParserContext = NameSpace.Context;
			//NameSpace.AppendSyntax("-", LoadParseFunc2(ParserContext, GrammarClass, "ParseOpFile"), LoadTypeFunc2(ParserContext, GrammarClass, "TypeOpFile"));
			//NameSpace.AppendSyntax("letenv", LoadParseFunc2(ParserContext, GrammarClass, "ParseEnv"), null);
			//NameSpace.AppendSyntax("command", LoadParseFunc2(ParserContext, GrammarClass, "ParseCommand"), null);
			//NameSpace.AppendSyntax("$DShell$", LoadParseFunc2(ParserContext, GrammarClass, "ParseDShell"), LoadTypeFunc2(ParserContext, GrammarClass, "TypeDShell"));
			NameSpace.AppendExtendedSyntax("->", 0, LoadParseFunc2(ParserContext, GrammarClass, "ParseGetterP"), LoadTypeFunc2(ParserContext, GrammarClass, "TypeGetterP"));
		}
	//endif VAJA
}
