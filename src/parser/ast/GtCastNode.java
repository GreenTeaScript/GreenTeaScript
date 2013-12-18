package parser.ast;

import org.GreenTeaScript.LibGreenTea;

import parser.GtFunc;
import parser.GtGenerator;
import parser.GtParserContext;
import parser.GtToken;
import parser.GtType;

//E.g., (T) $Expr
final public class GtCastNode extends GtNode {
	/*field*/public GtFunc  Func;
	/*field*/public GtType	CastType;
	/*field*/public GtNode	Expr;
	public GtCastNode/*constructor*/(GtType Type, GtToken Token, GtType CastType, GtNode Expr) {
		super(Type, Token);
		this.CastType = CastType;
		this.Expr = Expr;
		this.SetChild(Expr);
	}
	@Override public void Accept(GtGenerator Visitor) {
		Visitor.VisitCastNode(this);
	}
	@Override public Object ToConstValue(GtParserContext Context, boolean EnforceConst)  {
		/*local*/Object Value = this.Expr.ToConstValue(Context, EnforceConst) ;
		if(Value != null) {
			return LibGreenTea.DynamicCast(this.CastType, Value);
		}
		return Value;
	}
}