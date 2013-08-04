/// <reference path="GreenTeaGenerator.ts" />

interface Array {
	get(index: number): any;
	set(index: number, value: any): void;
	add(obj: any): void;
	size(): number;
	remove(index: number): void;
}

interface Object {
	get(index: any): any;
	put(key: any, obj: any): void;
	equals(other: any): boolean;
}

interface String {
	startsWith(key: string): boolean;
	replaceAll(key: string, rep: string);
}

function assert(expect: boolean): void {
	if(!expect){
		throw new Error();
	}
}

class GtDelegateCommon {
	Self: Object;
	Method: any;
	constractor(Self: Object, method: any) {
		this.Self = Self;
		this.Method = method;
	}
	toString(): string {
		return (this.Method == null) ? "*undefined*" : this.Method.toString();
	}
}

class GtDelegateToken extends GtDelegateCommon {
	constractor(Self: Object, method: any) {
		this.Self = Self;
		this.Method = method;
	}
}

class GtDelegateMatch extends GtDelegateCommon {
	constractor(Self: Object, method: any) {
		this.Self = Self;
		this.Method = method;
	}
}

class GtDelegateType extends GtDelegateCommon {
	constractor(Self: Object, method: any) {
		this.Self = Self;
		this.Method = method;
	}	
}

class LangDeps {

	static println(msg: string): void {
		console.log(msg);		
	}

	static DebugP(msg: string): void {
		if(DebugPrintOption) {
			LangDeps.println("DEBUG" + LangDeps.GetStackInfo(2) + ": " + msg);
		}
	}

	static GetStackInfo(depth: number): string{
		// TODO
		return " ";//LineNumber;
	}

	static IsWhitespace(ch: number): boolean {
		return " ".charCodeAt(0) == ch;
	}

	static IsLetter(ch: number): boolean {
		return true; // TODO;
		//return Character.isLetter(ch);
	}

	static IsDigit(ch: number): boolean {
		return true; // TODO;
		//return Character.isDigit(ch);
	}

	static CharAt(Text: string, Pos: number): number {
		return Text.charCodeAt(Pos);
	}

	static ParseInt(Text: string): number {
		//return number.parseInt(Text);
		return <any>Text - 0;
	}

	static LookupMethod(Callee: Object, MethodName: string): any {
		return Callee[MethodName];
	}
	
	static EqualsMethod(m1: any, m2: any): boolean {
		return m1 === m2;
	}
	
	static CreateOrReuseTokenFunc(f: GtDelegateToken, prev: TokenFunc): TokenFunc {
		if(prev != null && LangDeps.EqualsMethod(prev.Func.Method, f.Method)) {
			return prev;
		}
		return new TokenFunc(f, prev);
	}

	static ApplyTokenFunc(Self: Object, Method: any, TokenContext: Object, Text: string, pos: number): number {
		try {
			return <number>Method.apply(Self, TokenContext, Text, pos);
		}
		catch (e) {
			console.log(e);
		}
		return -1;
	}

	static ApplyMatchFunc(Self: Object, Method: any, Pattern: Object, LeftTree: Object, TokenContext: Object): SyntaxTree {
		try {
			return <SyntaxTree>Method.apply(Self, Pattern, LeftTree, TokenContext);
		}
		catch (e) {
			console.log(e);
		}
		return null;
	}

	static ApplyTypeFunc(Self: Object, Method: any, Gamma: Object, ParsedTree: Object, TypeInfo: Object): TypedNode {
		try {
			return <TypedNode>Method.apply(Self, Gamma, ParsedTree, TypeInfo);
		}
		catch (e) {
			console.log(e);
		}
		return null;
	}
	
	static CompactTypeList(List: GtType[]): GtType[] {
		var Tuple: GtType[] = new Array<GtType>(List.length);
		for(var i = 0; i < List.length; i++) {
			Tuple[i] = List[i];
		}
		return Tuple;
	}

	static CompactStringList(List: string[]): string[] {
		if(List == null) return null;
		var Tuple: string[] = new Array<string>(List.length);
		for(var i = 0; i < List.length; i++) {
			Tuple[i] = List[i];
		}
		return Tuple;
	}

}

function FunctionA(Callee: Object, MethodName: string): GtDelegateToken {
	return null;// FIXME new GtDelegateToken(Callee, LangDeps.LookupMethod(Callee, MethodName));
}

function FunctionB(Callee: Object, MethodName: string): GtDelegateMatch {
	return null;// FIXME new GtDelegateMatch(Callee, LangDeps.LookupMethod(Callee, MethodName));
}

function FunctionC(Callee: Object, MethodName: string): GtDelegateType {
	return null;// FIXME new GtDelegateType(Callee, LangDeps.LookupMethod(Callee, MethodName));
}
