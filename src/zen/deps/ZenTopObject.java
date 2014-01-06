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
package zen.deps;
import java.lang.reflect.Field;
import java.lang.reflect.Modifier;
//endif VAJA

import zen.lang.ZenType;


public class ZenTopObject implements ZenObject {
	/*field*/public ZenType GreenType;
	protected ZenTopObject(ZenType GreenType) {
		this.GreenType = GreenType;
	}
	public final ZenType GetZenType() {
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
						s += LibZen.Stringify(Fields[i].get(this));
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


final class GreenTeaAnyObject extends ZenTopObject {
	/*field*/public final Object NativeValue;
	GreenTeaAnyObject/*constructor*/(ZenType GreenType, Object NativeValue) {
		super(GreenType);
		this.NativeValue = NativeValue;
	}
}
