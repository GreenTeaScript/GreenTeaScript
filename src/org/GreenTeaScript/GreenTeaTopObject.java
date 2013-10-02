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
import java.lang.reflect.Field;
import java.lang.reflect.Modifier;
//endif VAJA

<<<<<<< HEAD
class GtFuncBlock extends GreenTeaUtils {
	/*field*/public GtNameSpace       NameSpace;
	/*field*/public ArrayList<String> NameList;
	/*field*/public GtSyntaxTree FuncBlock;
	/*field*/public boolean IsVarArgument;
	/*field*/public ArrayList<GtType> TypeList;
	/*field*/public GtFunc DefinedFunc;

	GtFuncBlock/*constructor*/(GtNameSpace NameSpace, ArrayList<GtType> TypeList) {
		this.NameSpace = NameSpace;
		this.TypeList = TypeList;
		this.NameList = new ArrayList<String>();
		this.FuncBlock = null;
		this.IsVarArgument = false;
		this.DefinedFunc = null;
	}

	void SetThisIfInClass(GtType Type) {
		if(Type != null) {
			this.TypeList.add(Type);
			this.NameList.add(this.NameSpace.Context.Generator.GetRecvName());
		}
	}

	void SetConverterType() {
		this.TypeList.add(this.NameSpace.Context.TypeType);
		this.NameList.add("type");
	}

	void AddParameter(GtType Type, String Name) {
		this.TypeList.add(Type);
		if(Type.IsVarType()) {
			this.IsVarArgument = true;
		}
		this.NameList.add(Name);
	}
}

class GtFunc extends GreenTeaUtils {
	/*field*/public int				FuncFlag;
	/*field*/public String			FuncName;
	/*field*/public String          MangledName;
	/*field*/public GtType[]		Types;
	/*field*/public GtType          FuncType;
	/*field*/public                 int FuncId;
	/*field*/public Object          NativeRef;  // Abstract function if null
	/*field*/public String[]        GenericParam;

	public GtFunc/*constructor*/(int FuncFlag, String FuncName, int BaseIndex, ArrayList<GtType> ParamList) {
		this.FuncFlag = FuncFlag;
		this.FuncName = FuncName;
		this.Types = LibGreenTea.CompactTypeList(BaseIndex, ParamList);
		LibGreenTea.Assert(this.Types.length > 0);
		this.FuncType = null;
		this.NativeRef = null;
		/*local*/GtParserContext Context = this.GetContext();
		this.FuncId = Context.FuncCount;
		Context.FuncCount += 1;
		this.MangledName = FuncName + NativeNameSuffix + this.FuncId;
	}

	public final GtParserContext GetContext() {
		return this.GetReturnType().Context;
	}

	public final String GetNativeFuncName() {
		if(this.Is(ExportFunc)) {
			return this.FuncName;
		}
		else {
			return this.MangledName;
		}
=======
public class GreenTeaTopObject implements GreenTeaObject {
	/*field*/public GtType GreenType;
	protected GreenTeaTopObject/*constructor*/(GtType GreenType) {
		this.GreenType = GreenType;
>>>>>>> master
	}
	public final GtType GetGreenType() {
		return this.GreenType;
	}
	
	@Override public String toString() {
		/*local*/String s = "{";
//ifdef JAVA
		Field[] Fields = this.getClass().getFields();
		for(int i = 0; i < Fields.length; i++) {
			if(Modifier.isPublic(Fields[i].getModifiers())) {
				if(i > 0) {
					s += ", ";
				}
				try {
					s += Fields[i].getName() + ": ";
					if(Fields[i].getType() == long.class) {
							s += Fields[i].getLong(this);
					}
					else if(Fields[i].getType() == double.class) {
						s += Fields[i].getDouble(this);
					}
					else {
						s += LibGreenTea.Stringfy(Fields[i].get(this));
					}
				} catch (IllegalArgumentException e) {
					// TODO Auto-generated catch block
					e.printStackTrace();
				} catch (IllegalAccessException e) {
					// TODO Auto-generated catch block
					e.printStackTrace();
				}
			}
		}
//endif VAJA
		return s + "}";
	}
}

final class GreenTeaAnyObject extends GreenTeaTopObject {
	/*field*/public final Object NativeValue;
	GreenTeaAnyObject/*constructor*/(GtType GreenType, Object NativeValue) {
		super(GreenType);
		this.NativeValue = NativeValue;
	}
}

