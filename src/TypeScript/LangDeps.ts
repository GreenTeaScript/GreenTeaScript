/// <reference path="SourceGenerator.ts" />

interface Array {
	get(index: number): any;
	set(index: number, value: any): void;
	add(obj: any): void;
	size(): number;
	remove(index: number): any;
}

Array.prototype.size = function(){
	return this.length;
}

Array.prototype.add = function(v){
	this.push(v);
}

Array.prototype.get = function(i){
	return this[i];
}

Array.prototype.set = function(i, v){
	this[i] = v;
}

Array.prototype.remove = function(i){
	var v = this[i];
	this.splice(i, 1);
	return v;
}

interface Object {
	equals(other: any): boolean;
}

Object.prototype["equals"] = function(other){
	return (this === other);
}

interface String {
	startsWith(key: string): boolean;
	replaceAll(key: string, rep: string);
}

String.prototype["startWith"] = function(key){
	
}

String.prototype["replaceAll"] = function(key, rep){
	this.replace(key, rep);
}

class GtMap {
	private map: Object;
	private length: number;
	constractor(){
		this.map = new Object;
		this.length = 0;
	}
	get(index: any): any{
		return this.map[index];
	}
	put(key: any, obj: any): void{
		this.length++;
		this.map[key] = obj;
	}
	size(): number{
		return this.length;
	}
}
/*
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
*/
class LangDeps {

	static Assert(expect: any): void {
		if(!expect){
			throw new Error();
		}
	}

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

	static CharToString(code: number): string {
		return String.fromCharCode(code);
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
	
	static CreateOrReuseTokenFunc(f: any, prev: TokenFunc): TokenFunc {
		if(prev != null && LangDeps.EqualsMethod(prev.Func, f)) {
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
	
	static CompactTypeList(BaseIndex: number, List: GtType[]): GtType[] {
		var Tuple: GtType[] = new Array<GtType>(List.length - BaseIndex);
		for(var i = BaseIndex; i < List.length; i++) {
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

	static CodeGenerator(Option: string): CodeGenerator{
		return new JavaScriptSourceGenerator();
	}

	static LoadFile(FileName: string){
		throw new Error("LangDeps.LoadFile is not implemented for this environment");
		return "";
	}
}

