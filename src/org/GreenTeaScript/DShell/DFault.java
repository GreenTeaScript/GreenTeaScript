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

package org.GreenTeaScript.DShell;
import java.lang.reflect.InvocationTargetException;
import java.lang.reflect.Method;
import java.net.InetAddress;
import java.net.UnknownHostException;
import org.GreenTeaScript.GtNameSpace;
import org.GreenTeaScript.GtFunc;

import org.GreenTeaScript.LibGreenTea;

public class DFault /*extends Exception*/ {
//	private static final long serialVersionUID = -6178247864604881183L;
	public String Location;
	public String PhysicalLocation;
	public String FaultInfo;
	public String ErrorInfo;
	public String DCaseURL;
	public long   DCaseRevision;
	public String DCaseNode;
	
//	/*field*/public String CurrentNodeName = "";
//	public String CallerNodeName  = "";
//	public long DCaseRevision = 0;

	public DFault(String Location, String FaultInfo, String ErrorInfo) {
		this.Location = Location;  // nonnull
		try {
			InetAddress addr = InetAddress.getLocalHost();
			this.PhysicalLocation = addr.getHostAddress();
		} catch (UnknownHostException e) {
			LibGreenTea.VerboseException(e);
		}
		this.FaultInfo = FaultInfo == null ? "UnexpectedFault" : FaultInfo;
		this.ErrorInfo = ErrorInfo; // nonnull
		this.DCaseURL = null;
		this.DCaseRevision = 0;
		this.DCaseNode = null;
	}

//	public DFault UpdateDCaseReference(String DCaseURL, long DCaseRevision, String DCaseNode) {
//		this.DCaseURL = DCaseURL;
//		this.DCaseRevision = DCaseRevision;
//		this.DCaseNode = DCaseNode;
//		return this;
//	}
	
	public final static boolean MatchFault(DFault Fault, String Location, String FaultInfo) {
		return(Fault.Location.equalsIgnoreCase(Location) && Fault.FaultInfo.equalsIgnoreCase(FaultInfo));
	}

	public final static DFault ExecAction(GtNameSpace NameSpace, long FileLine, GtFunc Action) {
		DFault Fault = null;
		try {
			Fault = (DFault)((Method)Action.NativeRef).invoke(null);
		}
		catch (Exception e) {
			Fault = DFault.CreateFault(NameSpace, FileLine, e);
		}
		if(Fault == null) {
			// success case
		}
		else {
			// failed case
		}
		return Fault;
	}
	
	
//	public DFault(String location) {
//		this.Location = location;
//	}
//
//	public DFault SetLocation(String LogicalLocation, String PhysicalLocation) {
//		
//	}
//	
//	public void UpdateFaultInfomation(String CurrentNodeName, String CallerNodeName, long DCaseRevision) {
//		this.CurrentNodeName = CurrentNodeName;
//		this.CallerNodeName  = CallerNodeName;
//		this.DCaseRevision   = DCaseRevision;
//	}
//	
//	public static boolean binary_eq(DFault x, DFault y) {
//		if(x == null || y == null) {
//			return x == y;
//		}
//		return x.equals(y);
//	}
//
//	public static boolean binary_ne(DFault x, DFault y) {
//		return !binary_eq(x, y);
//	}
//
//	public static void setLocation(DFault self, String location) {
//		self.Location = location;
//	}
//
//	public static String getLocation(DFault self) {
//		return self.Location;
//	}
//
////	public static DFault _new(String location) { //FIXME
////		return new DFault(location);
////	}
	
}