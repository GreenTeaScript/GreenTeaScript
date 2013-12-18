package parser;

public class GtVariableInfo extends GreenTeaUtils {
	/*field*/public int     VariableFlag;
	/*field*/public GtType	Type;
	/*field*/public String	Name;
	/*field*/public String	NativeName;
	/*field*/public GtToken NameToken;
	/*field*/public Object  InitValue;
	/*field*/public int     DefCount;
	/*field*/public int     UsedCount;

	GtVariableInfo/*constructor*/(int VarFlag, GtType Type, String Name, int Index, GtToken NameToken, Object InitValue) {
		this.VariableFlag = VarFlag;
		this.Type = Type;
		this.NameToken = NameToken;
		this.Name = Name;
		this.NativeName = (NameToken == null) ? Name : GreenTeaUtils.NativeVariableName(Name, Index);
		this.InitValue = null;
		this.UsedCount = 0;
		this.DefCount  = 1;
	}

	public final void Defined() {
		this.DefCount += 1;
		this.InitValue = null;
	}

	public final void Used() {
		this.UsedCount += 1;
	}

	public void Check(GtParserContext Context) {
		if(this.UsedCount == 0 && this.NameToken != null) {
			Context.ReportError(WarningLevel, this.NameToken, "unused variable: " + this.Name);
		}
	}
	// for debug
	@Override public String toString() {
		return "(" + this.Type + " " + this.Name + ", " + this.NativeName + ")";
	}
}