package parser;

public final class GtStat {
	/*field*/public int VarDeclAny;
	/*field*/public int VarDeclInferAny;
	/*field*/public int VarDeclInfer;
	/*field*/public int VarDecl;

	/*field*/public long MatchCount;
	/*field*/public long BacktrackCount;  // To count how many times backtracks happen.

	public GtStat/*constructor*/() {
		this.VarDecl = 0;
		this.VarDeclInfer = 0;
		this.VarDeclAny = 0;
		this.VarDeclInferAny = 0;
		this.MatchCount     = 0;
		this.BacktrackCount = 0;
	}
}