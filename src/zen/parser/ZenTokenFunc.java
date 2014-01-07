package zen.parser;

import zen.deps.LibNative;
import zen.lang.ZenFunc;

final class ZenTokenFunc {
	/*field*/public ZenFunc      Func;
	/*field*/public ZenTokenFunc	ParentFunc;

	ZenTokenFunc(ZenFunc Func, ZenTokenFunc Parent) {
		this.Func = Func;
		this.ParentFunc = Parent;
	}

	@Override public String toString() {
		return this.Func.toString();
	}

	final static int ApplyTokenFunc(ZenTokenFunc TokenFunc, ZenTokenContext TokenContext, String ScriptSource, int Pos) {
		while(TokenFunc != null) {
			/*local*/int NextIdx = (/*cast*/int)LibNative.ApplyTokenFunc(TokenFunc.Func, TokenContext, ScriptSource, Pos);
			if(NextIdx > Pos) return NextIdx;
			TokenFunc = TokenFunc.ParentFunc;
		}
		return ZenParserConst.MismatchedPosition;
	}
}