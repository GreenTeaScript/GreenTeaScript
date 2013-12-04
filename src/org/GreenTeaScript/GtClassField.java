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

public final class GtClassField extends GreenTeaUtils {
	/*field*/ public GtType DefinedType;
	/*field*/ private GtNameSpace NameSpace;
	/*field*/ public ArrayList<GtFieldInfo> FieldList;
	/*field*/ public int ThisClassIndex;

	GtClassField/*constructor*/(GtType DefinedType, GtNameSpace NameSpace) {
		this.DefinedType = DefinedType;
		this.NameSpace = NameSpace;
		this.FieldList = new ArrayList<GtFieldInfo>();
		/*local*/GtType SuperClass = DefinedType.SuperType;
		if(SuperClass.TypeBody instanceof GtClassField) {
			/*local*/GtClassField SuperField = (/*cast*/GtClassField)SuperClass.TypeBody;
			/*local*/int i = 0;
			while(i < SuperField.FieldList.size()) {
				this.FieldList.add(SuperField.FieldList.get(i));
				i+=1;
			}
		}
		this.ThisClassIndex = this.FieldList.size();
	}

	public GtFieldInfo CreateField(int FieldFlag, GtType Type, String Name, GtToken SourceToken, Object InitValue) {
		/*local*/int i = 0;
		while(i < this.FieldList.size()) {
			/*local*/GtFieldInfo FieldInfo = this.FieldList.get(i);
			if(FieldInfo.Name.equals(Name)) {
				this.NameSpace.Context.ReportError(WarningLevel, SourceToken, "duplicated field: " + Name);
				return null;
			}
			i = i + 1;
		}
		/*local*/GtFieldInfo FieldInfo2 = new GtFieldInfo(FieldFlag, Type, Name, this.FieldList.size(), InitValue);
		/*local*/ArrayList<GtType> ParamList = new ArrayList<GtType>();
		ParamList.add(FieldInfo2.Type);
		ParamList.add(this.DefinedType);
		FieldInfo2.GetterFunc = new GtFunc(GetterFunc, FieldInfo2.Name, 0, ParamList);
		this.NameSpace.SetGetterFunc(this.DefinedType, FieldInfo2.Name, FieldInfo2.GetterFunc, SourceToken);
		ParamList.clear();
		ParamList.add(GtStaticTable.VoidType);
		ParamList.add(this.DefinedType);
		ParamList.add(FieldInfo2.Type);
		FieldInfo2.SetterFunc = new GtFunc(SetterFunc, FieldInfo2.Name, 0, ParamList);
		this.NameSpace.SetSetterFunc(this.DefinedType, FieldInfo2.Name, FieldInfo2.SetterFunc, SourceToken);
		this.FieldList.add(FieldInfo2);
		return FieldInfo2;
	}
}

