package parser;

import java.util.HashMap;
import java.util.Iterator;

public final class GtMap {
	final HashMap<String, Object>	Map;

	public GtMap() {
		this.Map = new HashMap<String, Object>();
	}

	public final void put(String Key, Object Value) {
		this.Map.put(Key, Value);
	}

	public final Object GetOrNull(String Key) {
		return this.Map.get(Key);
	}

	public Iterator<String> key_iterator() { // FIXME
		return Map.keySet().iterator();
	}
}
//endif VAJA