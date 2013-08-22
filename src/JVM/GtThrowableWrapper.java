package JVM;

public class GtThrowableWrapper extends Throwable {
	public final Object object;

	public GtThrowableWrapper(Object object) {
		this.object = object;
	}
}

