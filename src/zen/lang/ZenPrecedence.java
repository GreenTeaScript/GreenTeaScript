package zen.lang;

public interface ZenPrecedence {
	public final static int BinaryOperator					= 1;
	public final static int LeftJoin						= 1 << 1;
	public final static int PrecedenceShift					= 3;
	public final static int CStyleMUL			    = (100 << PrecedenceShift) | BinaryOperator;
	public final static int CStyleADD			    = (200 << PrecedenceShift) | BinaryOperator;
	public final static int CStyleSHIFT			= (300 << PrecedenceShift) | BinaryOperator;
	public final static int CStyleCOMPARE		    = (400 << PrecedenceShift) | BinaryOperator;
	public final static int Instanceof            = CStyleCOMPARE;
	public final static int CStyleEquals			= (500 << PrecedenceShift) | BinaryOperator;
	public final static int CStyleBITAND			= (600 << PrecedenceShift) | BinaryOperator;
	public final static int CStyleBITXOR			= (700 << PrecedenceShift) | BinaryOperator;
	public final static int CStyleBITOR			= (800 << PrecedenceShift) | BinaryOperator;
	public final static int CStyleAND			    = (900 << PrecedenceShift) | BinaryOperator;
	public final static int CStyleOR				= (1000 << PrecedenceShift) | BinaryOperator;
	public final static int CStyleTRINARY		    = (1100 << PrecedenceShift) | BinaryOperator;				/* ? : */
	public final static int CStyleAssign			= (1200 << PrecedenceShift) | BinaryOperator;
	public final static int CStyleCOMMA			= (1300 << PrecedenceShift) | BinaryOperator;

}
