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

Array.prototype.set = function(i, v): void{
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

Object.prototype["equals"] = function(other): boolean{
	return (this === other);
}

interface String {
	startsWith(key: string): boolean;
	endsWith(key: string): boolean;
	replaceAll(key: string, rep: string);
}

String.prototype["startsWith"] = function(key): boolean{
	return this.IndexOf(key, 0) == 0;
}

String.prototype["endsWith"] = function(key): boolean{
	return this.lastIndexOf(key, 0) == 0;
}

String.prototype["replaceAll"] = function(key, rep): string{
	return this.replace(key, rep);
}

String.prototype["equals"] = function(other): boolean{
	return (this == other);
}

class GtMap {
	private map: Object;
	private length: number;
	constructor(){
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
	keys(): Array<string> {
		return LangDeps.MapGetKeys(this);
	}
}

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
		return ch == 32/*SP*/ || ch == 9/*TAB*/;
	}

	static IsLetter(ch: number): boolean {
		if(ch > 90){
			ch -= 0x20;
		}
		return 65/*A*/ <= ch && ch <= 90/*Z*/;
	}

	static IsDigit(ch: number): boolean {
		return 48/*0*/ <= ch && ch <= 57/*9*/;
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

	static ApplyTokenFunc(Delegate: any, TokenContext: Object, Text: string, pos: number): number {
		try {
			return <number>Delegate(TokenContext, Text, pos);
		}
		catch (e) {
			console.log(e);
		}
		return -1;
	}

	static ApplyMatchFunc(Delegate: any, Pattern: Object, LeftTree: Object, TokenContext: Object): GtSyntaxTree {
		try {
			return <GtSyntaxTree>Delegate(Pattern, LeftTree, TokenContext);
		}
		catch (e) {
			console.log(e);
		}
		return null;
	}

	static ApplyTypeFunc(Delegate: any, Gamma: Object, ParsedTree: Object, TypeInfo: Object): GtNode {
		try {
			return <GtNode>Delegate(Gamma, ParsedTree, TypeInfo);
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

	static CodeGenerator(Option: string): GtGenerator{
		if(Option == "--js"){
			return new JavaScriptSourceGenerator();
		}else if(Option == "--java"){
			return new JavaSourceGenerator();
		}else if(Option == "--perl"){
			return new PerlSourceGenerator();
		}else if(Option == "--bash"){
			return new JavaScriptSourceGenerator();
		}else if(Option == "--c"){
			return new CSourceGenerator();
		}
		return new JavaScriptSourceGenerator();
	}

	static HasFile(FileName: string){
		throw new Error("LangDeps.LoadFile is not implemented for this environment");
		return "";
	}

	static LoadFile(FileName: string){
		throw new Error("LangDeps.LoadFile is not implemented for this environment");
		return "";
	}

	static MapGetKeys(Map: GtMap): Array<string> {
		throw new Error("LangDeps.MapGetKeys is not implemented for this environment");
		return [];
	}

	static Usage(): void{
	}

	static ReadLine(prompt: string): string {
		return "";
	}
}

