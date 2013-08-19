/// <reference path="SourceGenerator.ts" />

interface Array {
	get(index: number): any;
	set(index: number, value: any): void;
	add(obj: any): void;
	size(): number;
	clear(): void;
	remove(index: number): any;
}

Array.prototype.size = function(){
	return this.length;
}

Array.prototype.add = function(v){
	this.push(v);
}

Array.prototype.get = function(i){
	if(i >= this.length){
		throw new RangeError("invalid array index");
	}
	return this[i];
}

Array.prototype.set = function(i, v): void{
	this[i] = v;
}

Array.prototype.remove = function(i){
	if(i >= this.length){
		throw new RangeError("invalid array index");
	}
	var v = this[i];
	this.splice(i, 1);
	return v;
}

Array.prototype.clear = function(){
	this.length = 0;
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
	return this.indexOf(key, 0) == 0;
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
	private key: string[]
	constructor(){
		this.map = new Object;
		this.key = [];
		this.length = 0;
	}
	get(index: any): any{
		return this.map[index];
	}
	put(key: any, obj: any): void{
		this.length++;
		this.map[key] = obj;
		this.key.push(key);
	}
	size(): number{
		return this.length;
	}
	keys(): string[] {
		return this.key;
	}
}

declare var fs: any;
declare var process: any;
declare var GreenTeaLibraries: { [key: string]: string; };

class LangDeps {

	// typescript only
	static isNodeJS: boolean = typeof(process) != "undefined";
	static hasFileSystem = typeof(fs) != "undefined";

	static StartsWith(self: string, key: string): boolean {
		return self.indexOf(key, 0) == 0;
	}

	static EndsWith(self: string, key: string): boolean {
		return self.lastIndexOf(key, 0) == 0;
	}

	static Exit(status: number, message: string): void {
		throw new Error("Exit: " + message);
	}

	static Assert(expect: any): void {
		if(!expect){
			throw new Error("Assertion Failed");
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
		LangDeps.Exit(1, "Failed ApplyTokenFunc");
		return -1;
	}

	static ApplyMatchFunc(Delegate: any, NameSpace: GtNameSpace, TokenContext: Object, LeftTree: Object, Pattern: Object): GtSyntaxTree {
		try {
			return <GtSyntaxTree>Delegate(NameSpace, TokenContext, LeftTree, Pattern);
		}
		catch (e) {
			console.log(e);
		}
		LangDeps.Exit(1, "Failed ApplyMatchFunc");
		return null;
	}

	static ApplyTypeFunc(Delegate: any, Gamma: Object, ParsedTree: Object, TypeInfo: Object): GtNode {
		try {
			return <GtNode>Delegate(Gamma, ParsedTree, TypeInfo);
		}
		catch (e) {
			console.log(e);
		}
		LangDeps.Exit(1, "Failed ApplyTypeFunc");
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

	static CodeGenerator(TargetCode: string, OutputFile: string, GeneratorFlag: number): GtGenerator{
		var Extension: string = (OutputFile == null ? "-" : OutputFile)
		if(LangDeps.EndsWith(Extension, ".js") || LangDeps.StartsWith(TargetCode, "js") || LangDeps.StartsWith(TargetCode, "javascript")){
			return new JavaScriptSourceGenerator(TargetCode, OutputFile, GeneratorFlag);
		}else if(LangDeps.EndsWith(Extension, ".pl") || LangDeps.StartsWith(TargetCode, "perl")){
			return new PerlSourceGenerator(TargetCode, OutputFile, GeneratorFlag);
		}else if(LangDeps.EndsWith(Extension, ".py") || LangDeps.StartsWith(TargetCode, "python")){
			return new PythonSourceGenerator(TargetCode, OutputFile, GeneratorFlag);
		}else if(LangDeps.EndsWith(Extension, ".sh") || LangDeps.StartsWith(TargetCode, "bash")){
			return new BashSourceGenerator(TargetCode, OutputFile, GeneratorFlag);
		}else if(LangDeps.EndsWith(Extension, ".java") || LangDeps.StartsWith(TargetCode, "java")){
			return new JavaSourceGenerator(TargetCode, OutputFile, GeneratorFlag);
		}else if(LangDeps.EndsWith(Extension, ".c") || LangDeps.StartsWith(TargetCode, "c")){
			return new CSourceGenerator(TargetCode, OutputFile, GeneratorFlag);
		}else if(LangDeps.EndsWith(Extension, "X") || LangDeps.StartsWith(TargetCode, "exe")){
			throw new Error("JavaByteCodeGenerator is not implemented for this environment");
		}
		return null;
	}

	static HasFile(FileName: string): boolean{
		if(LangDeps.hasFileSystem){
			return fs.existsSync(FileName).toString()
		}else{
			return !!GreenTeaLibraries[FileName];
			//throw new Error("LangDeps.HasFile is not implemented for this environment");
		}
		return false;
	}

	static LoadFile(FileName: string): string{
		if(LangDeps.hasFileSystem){
			return fs.readFileSync(FileName);
		}else{
			return GreenTeaLibraries[FileName];
			//throw new Error("LangDeps.LoadFile is not implemented for this environment");
		}
		return "";
	}

	static MapGetKeys(Map: GtMap): string[] {
		return Map.keys();
	}

	static Usage(): void {
	}

	static ReadLine(prompt: string): string {
		throw new Error("LangDeps.ReadLine is not implemented for this environment");
		return "";
	}

	static LoadLibFile(TargetCode: string, FileName: string): string {
		return LangDeps.LoadFile("lib/" + TargetCode + "/" + FileName);
	}

	static WriteCode(OutputFile: string, SourceCode: string): void {
		if(OutputFile == null){
			LangDeps.Eval(SourceCode);
		}
		else if(OutputFile == "-"){
			console.log(SourceCode);
		}
		else {
			throw new Error("LangDeps.WriteCode cannon write code into a file in this environment");
		}
	}

	static Eval(SourceCode: string): void {
		eval(SourceCode);
	}
}

