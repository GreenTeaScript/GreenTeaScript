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
