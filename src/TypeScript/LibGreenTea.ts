/// <reference path="SourceGenerator.ts" />
/// <reference path="GreenTeaScript.ts" />

interface Array {
	get(index: number): any;
	set(index: number, value: any): void;
	add(obj: any): void;
	add(index: number, obj : any): void;
	size(): number;
	clear(): void;
	remove(index: number): any;
}

Array.prototype.size = function(){
	return this.length;
}

Array.prototype.add = function(arg1){
	if(arguments.length == 1) {
		this.push(arg1);
	} else {
		var arg2 = arguments[1];
		this.splice(arg1, 0, arg2);
	}
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
	lastIndexOf(ch: number) : number;
	indexOf(ch: number) : number;
	substring(BeginIdx : number, EndIdx : number) : string;
}

String.prototype["startsWith"] = function(key): boolean{
	return this.indexOf(key, 0) == 0;
}

String.prototype["endsWith"] = function(key): boolean{
	return this.lastIndexOf(key, 0) == 0;
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

class LibGreenTea {

	// typescript only
	static isNodeJS: boolean = typeof(process) != "undefined";
	static hasFileSystem = typeof(fs) != "undefined";

	static GetPlatform(): string {
		return "TypeScript 0.9.0.1, " + (LibGreenTea.isNodeJS ?
			"Node.js " + process.version + " " + process.platform:
			navigator.appName + " " + navigator.appVersion);
	}

	static println(msg: string): void {
		console.log(msg);
	}

	static DebugMode: boolean = true;

	static GetStackInfo(depth: number): string{
		// TODO
		return " ";//LineNumber;
	}

	static DebugP(msg: string): void {
		if(LibGreenTea.DebugMode) {
			LibGreenTea.println("DEBUG" + LibGreenTea.GetStackInfo(2) + ": " + msg);
		}
	}

	static VerboseMask: number = 0/*FIXME VerboseUndefined*/;

	static VerboseLog(VerboseFlag: number, msg: string): void {
		LibGreenTea.println(msg);
	}

	static Exit(status: number, message: string): void {
		throw new Error("Exit: " + message);
	}

	static Assert(expect: any): void {
		if(!expect){
			throw new Error("Assertion Failed");
		}
	}

	static IsWhitespace(Text : string, Pos: number): boolean {
		var ch :number = LibGreenTea.CharAt(Text, Pos);
		return ch == 32/*SP*/ || ch == 9/*TAB*/;
	}

	static IsVariableName(Text: string, Pos: number) : boolean {
		var ch :number = LibGreenTea.CharAt(Text, Pos);
		return LibGreenTea.IsLetter(Text, Pos) || ch == '_'.charCodeAt(0) || ch > 255;
	}

	static IsLetter(Text: string, Pos: number): boolean {
		var ch :number = LibGreenTea.CharAt(Text, Pos);
		if(ch > 90){
			ch -= 0x20;
		}
		return 65/*A*/ <= ch && ch <= 90/*Z*/;
	}

	static IsDigit(Text: string, Pos: number): boolean {
		var ch :number = LibGreenTea.CharAt(Text, Pos);
		return 48/*0*/ <= ch && ch <= 57/*9*/;
	}

	static CharAt(Text: string, Pos: number): number {
		return Text.charCodeAt(Pos);
	}

	static CharToString(code: number): string {
		return String.fromCharCode(code);
	}

	static UnquoteString(Text: string): string {
		var start : string = Text[0];
		if(start == "\"" || start == "'") {
			Text = Text.substring(1, Text.length - 1);
		}
		return Text
			.replace(/\\t/, "\t")
			.replace(/\\n/, "\n")
			.replace(/\\r/, "\r")
			.replace(/\\"/, "\"")
			.replace(/\\'/, "'")
			.replace(/\\\\/, "\\");
	}

	static QuoteString(Text: string): string {
		return "\"" + Text
			.replace(/\t/, "\\t")
			.replace(/\n/, "\\n")
			.replace(/\r/, "\\r")
			.replace(/"/, "\\\"")
			.replace(/'/, "\\'")
			.replace(/\\/, "\\") + "\"";
	}

	static EqualsString(s1: string, s2: string): boolean {
		return s1 == s2;
	}

	static ParseInt(Text: string): number {
		//return number.parseInt(Text);
		return <any>Text - 0;
	}

	static IsUnixCommand(cmd: string): boolean {
		//FIXME
		return false;
	}

	static GetNativeType(Context: GtContext, Value: any): GtType {
		var NativeType: GtType = null;
		var NativeClassInfo: any = Value.constructor;
		if(typeof Value == 'number' || Value instanceof Number) {
			if((<any>Value | 0) == <any>Value) {
				return Context.IntType;
			}
			//return Context.FloatType;
		}
		if(typeof Value == 'string' || Value instanceof String) {
			return Context.StringType;
		}
		NativeType = <GtType> Context.ClassNameMap.get(NativeClassInfo.name);
		if(NativeType == null) {
			NativeType = new GtType(Context, NativeClass, NativeClassInfo.getSimpleName(), null, NativeClassInfo);
			Context.ClassNameMap.put(NativeClassInfo.getName(), NativeType);
		}
		return NativeType;
	}

	static GetClassName(Value: any): string {
		return typeof(Value);
	}

	static StartsWith(self: string, key: string): boolean {
		return self.indexOf(key, 0) == 0;
	}

	static EndsWith(self: string, key: string): boolean {
		return self.lastIndexOf(key, 0) == (self.length - key.length);
	}

	static LookupNativeMethod(Callee: Object, MethodName: string): any {
		return Callee[MethodName];
	}

    static LoadNativeMethod(ContextType: GtType, FullName: string, StaticMethodOnly: boolean) : any {
        throw new Error("NotSupportedAPI");
        return null;
    }

    static ImportNativeMethod(NativeFunc : GtFunc, FullName: string) : boolean {
        throw new Error("NotSupportedAPI");
        return false;
    }
    static LoadNativeConstructors(ClassType: GtType): boolean {
        throw new Error("NotSupportedAPI");
        return false;
    }

    static LoadNativeField(ClassType: GtType, FieldName: string) : boolean {
        throw new Error("NotSupportedAPI");
        return false;
    }

	static EqualsFunc(m1: any, m2: any): boolean {
		return m1 === m2;
	}

	static CreateOrReuseTokenFunc(f: any, prev: TokenFunc): TokenFunc {
		if(prev != null && LibGreenTea.EqualsFunc(prev.Func, f)) {
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
		LibGreenTea.Exit(1, "Failed ApplyTokenFunc");
		return -1;
	}

	static ApplyMatchFunc(Delegate: any, NameSpace: GtNameSpace, TokenContext: Object, LeftTree: Object, Pattern: Object): GtSyntaxTree {
		try {
			return <GtSyntaxTree>Delegate(NameSpace, TokenContext, LeftTree, Pattern);
		}
		catch (e) {
			console.log(e);
		}
		LibGreenTea.Exit(1, "Failed ApplyMatchFunc");
		return null;
	}

	static ApplyTypeFunc(Delegate: any, Gamma: Object, ParsedTree: Object, TypeInfo: Object): GtNode {
		try {
			return <GtNode>Delegate(Gamma, ParsedTree, TypeInfo);
		}
		catch (e) {
			console.log(e);
		}
		LibGreenTea.Exit(1, "Failed ApplyTypeFunc");
		return null;
	}

	static ListSize(List: any[]) : number {
		if(List == null) {
			return 0;
		}
		return List.length;
	}

	static CompactTypeList(BaseIndex: number, List: GtType[]): GtType[] {
		var Tuple: GtType[] = new Array<GtType>(List.length - BaseIndex);
		for(var i = BaseIndex; i < List.length; i++) {
			Tuple[i] = List[i];
		}
		return Tuple;
	}

	static CompactStringList(List: string[]): string[] {
		return List.slice(0);
	}

	static MapGetKeys(Map: GtMap): string[] {
		return Map.keys();
	}

	static Usage(message: string): void {
	}

	static CodeGenerator(TargetCode: string, OutputFile: string, GeneratorFlag: number): GtGenerator{
		var Extension: string = (OutputFile == null ? "-" : OutputFile)
			if(LibGreenTea.EndsWith(Extension, ".js") || LibGreenTea.StartsWith(TargetCode, "js") || LibGreenTea.StartsWith(TargetCode, "javascript")){
				return new JavaScriptSourceGenerator(TargetCode, OutputFile, GeneratorFlag);
			}else if(LibGreenTea.EndsWith(Extension, ".pl") || LibGreenTea.StartsWith(TargetCode, "perl")){
				return new PerlSourceGenerator(TargetCode, OutputFile, GeneratorFlag);
			}else if(LibGreenTea.EndsWith(Extension, ".py") || LibGreenTea.StartsWith(TargetCode, "python")){
				return new PythonSourceGenerator(TargetCode, OutputFile, GeneratorFlag);
			}else if(LibGreenTea.EndsWith(Extension, ".sh") || LibGreenTea.StartsWith(TargetCode, "bash")){
				return new BashSourceGenerator(TargetCode, OutputFile, GeneratorFlag);
			}else if(LibGreenTea.EndsWith(Extension, ".java") || LibGreenTea.StartsWith(TargetCode, "java")){
				return new JavaSourceGenerator(TargetCode, OutputFile, GeneratorFlag);
			}else if(LibGreenTea.EndsWith(Extension, ".c") || LibGreenTea.StartsWith(TargetCode, "c")){
				return new CSourceGenerator(TargetCode, OutputFile, GeneratorFlag);
			}else if(LibGreenTea.EndsWith(Extension, "X") || LibGreenTea.StartsWith(TargetCode, "exe")){
				throw new Error("JavaByteCodeGenerator is not implemented for this environment");
			}
		return null;
	}

	static WriteCode(OutputFile: string, SourceCode: string): void {
		if(OutputFile == null){
			LibGreenTea.Eval(SourceCode);
		}
		else if(OutputFile == "-"){
			console.log(SourceCode);
		}
		else {
			throw new Error("LibGreenTea.WriteCode cannon write code into a file in this environment");
		}
	}

	static ReadLine(prompt: string): string {
		throw new Error("LibGreenTea.ReadLine is not implemented for this environment");
		return "";
	}

	static HasFile(FileName: string): boolean{
		if(LibGreenTea.hasFileSystem){
			return fs.existsSync(FileName).toString()
		}else{
			return !!GreenTeaLibraries[FileName];
			//throw new Error("LibGreenTea.HasFile is not implemented for this environment");
		}
		return false;
	}

	static LoadFile2(FileName: string): string{
		if(LibGreenTea.hasFileSystem){
			return fs.readFileSync(FileName);
		}else{
			return GreenTeaLibraries[FileName];
			//throw new Error("LibGreenTea.LoadFile is not implemented for this environment");
		}
		return "";
	}

	static IsSupportedTarget(TargetCode: string){
		return LibGreenTea.HasFile(LibGreenTea.GetLibPath(TargetCode, "common"));
	}

	static GetLibFile(TargetCode: string, FileName: string): string {
		return LibGreenTea.LoadFile2(LibGreenTea.GetLibPath(TargetCode, FileName));
	}

	static GetLibPath(TargetCode: string, FileName: string): string {
		return ("lib/" + TargetCode + "/" + FileName + ".green");
	}

	private static Int32Max = Math.pow(2, 32);

	static JoinIntId(UpperId: number, LowerId: number): number {
		return UpperId * LibGreenTea.Int32Max + LowerId;
	}

	static UpperId(Fileline: number): number {
		return (Fileline / LibGreenTea.Int32Max) | 0;
	}

	static LowerId(Fileline: number): number {
		return Fileline | Fileline;
	}

	static booleanValue(Value : Object) : boolean {
		return <boolean>(Value);
	}

	static Eval(SourceCode: string): void {
		return eval(SourceCode);
	}

	public static EvalCast(CastType: GtType, Value: any): any {
		return null;
	}

	public static EvalInstanceOf(Value: any, Type: GtType): any {
		return false;
	}

	public static EvalUnary(Type: GtType, Operator: string, Value: any): any {
		return null;
	}

	public static EvalSuffix(Type: GtType, Value: any, Operator: string): any {
		return null;
	}

	public static EvalBinary(Type: GtType, LeftValue: any, Operator: string, RightValue: any): any {
		return null;
	}

	public static EvalGetter(Type: GtType, Value: any, FieldName: string): any {
		return null;
	}
}
