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

import java.io.IOException;

import org.apache.http.client.HttpClient;
import org.apache.http.client.methods.HttpPost;
import org.apache.http.entity.StringEntity;
import org.apache.http.impl.client.HttpClientBuilder;

public class RecAPI {
	
	private static void /* TODO: return result of rpc */ RemoteProcedureCall(String RECServerURL, String Method, String Params) throws IOException {
		double JsonRpcVersion = 2.0;
		int Id = 0;
		
		String Json = new String("{ \"jsonrpc\": \""+JsonRpcVersion+"\", "
									+ "\"method\": \""+Method+"\", "
									+ "\"params\": "+Params+", "
									+ "\"id\": "+Id+" }");
		StringEntity Body = new StringEntity(Json);
		
		HttpClient Client = HttpClientBuilder.create().build();
		HttpPost Request = new HttpPost(RECServerURL);
		Request.addHeader("Content-type", "application/json");
		Request.setEntity(Body);
		Client.execute(Request);   // TODO: check response
	}
	
	private static int DFault2Number(DFault Fault) {
		if(Fault != null) {
			return 1;   // TODO: support other fault type
		}
		
		return 0;
	}
	
	public static void PushRawData(String RECServerURL, String Type, String Location, DFault Fault, String AuthId, String Context) {
		String Params = "{ \"type\": \""+Type+"\", "
							+ "\"location\": \""+Location+"\", "
							+ "\"data\": "+DFault2Number(Fault)+", "
							+ "\"authid\": \""+AuthId+"\", "
							+ "\"context\": \""+Context+"\" }";
		
		try {
			RemoteProcedureCall(RECServerURL, "pushRawData", Params);
		}
		catch(IOException e) {
			// TODO exception handling
		}
	}
	
}
