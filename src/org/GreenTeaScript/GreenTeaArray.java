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
import java.util.Iterator;
import java.util.Arrays;
//endif VAJA

public class GreenTeaArray extends GreenTeaTopObject {
	public ArrayList<Object> ArrayBody ;
	public GreenTeaArray/*constructor*/(GtType GreenType) {
		super(GreenType);
		this.ArrayBody = new ArrayList<Object>();
	}
	public GreenTeaArray SubArray(int bindex, int eindex) {
		/*local*/GreenTeaArray ArrayObject = new GreenTeaArray(this.GreenType);
		for(/*local*/int i = bindex; i < eindex; i++) {
			/*local*/Object Value = this.ArrayBody.get(i);
			ArrayObject.ArrayBody.add(Value);
		}
		return ArrayObject;
	}
	@Override public String toString() {
		/*local*/String s = "[";
		for(/*local*/int i = 0; i < this.ArrayBody.size(); i++) {
			/*local*/Object Value = this.ArrayBody.get(i);
			if(i > 0) {
				s += ", ";
			}
			s += LibGreenTea.Stringify(Value);
		}
		return s + "]";
	}
	public final static GreenTeaArray NewArray1(GtType Type, int InitSize) {
		/*local*/GtType ArrayType = GtStaticTable.GetGenericType1(GtStaticTable.ArrayType, Type, true); 
		/*local*/GreenTeaArray ArrayObject =  new GreenTeaArray(ArrayType);
		for(/*local*/int i = 0; i < InitSize; i++) {
			ArrayObject.ArrayBody.add(Type.DefaultNullValue);
		}
		return ArrayObject;
	}
	// new int[2][3]
	public final static GreenTeaArray NewArray2(GtType Type, int InitSize, int InitSize2) {
		/*local*/GtType ArrayType = GtStaticTable.GetGenericType1(GtStaticTable.ArrayType, Type, true); 
		ArrayType = GtStaticTable.GetGenericType1(GtStaticTable.ArrayType, ArrayType, true); 
		/*local*/GreenTeaArray ArrayObject =  new GreenTeaArray(ArrayType);
		for(/*local*/int i = 0; i < InitSize2; i++) {
			ArrayObject.ArrayBody.add(GreenTeaArray.NewArray1(Type, InitSize));
		}
		return ArrayObject;
	}
	public final static GreenTeaArray NewArray3(GtType Type, int InitSize, int InitSize2, int InitSize3) {
		/*local*/GtType ArrayType = GtStaticTable.GetGenericType1(GtStaticTable.ArrayType, Type, true); 
		ArrayType = GtStaticTable.GetGenericType1(GtStaticTable.ArrayType, ArrayType, true); 
		ArrayType = GtStaticTable.GetGenericType1(GtStaticTable.ArrayType, ArrayType, true); 
		/*local*/GreenTeaArray ArrayObject =  new GreenTeaArray(ArrayType);
		for(/*local*/int i = 0; i < InitSize2; i++) {
			ArrayObject.ArrayBody.add(GreenTeaArray.NewArray2(Type, InitSize, InitSize2));
		}
		return ArrayObject;
	}
	public final static GreenTeaArray NewArrayLiteral(GtType ArrayType, Object[] Values) {
		/*local*/GreenTeaArray ArrayObject =  new GreenTeaArray(ArrayType);
		for(/*local*/int i = 0; i < Values.length; i++) {
			ArrayObject.ArrayBody.add(Values[i]);
		}
		return ArrayObject;
	}
}


