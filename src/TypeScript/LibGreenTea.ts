

interface Array {
	get(index: number): any;
	set(index: number, value: any): void;
	add(obj: any): void;
	add(index: number, obj : any): void;
	size(): number;
	clear(): void;
	remove(index: number): any;
}

Array.prototype["size"] = function(){
	return this.length;
}

Array.prototype["add"] = function(arg1){
	if(arguments.length == 1) {
		this.push(arg1);
	} else {
		var arg2 = arguments[1];
		this.splice(arg1, 0, arg2);
	}
}

Array.prototype["get"] = function(i){
	if(i >= this.length){
		throw new RangeError("invalid array index");
	}
	return this[i];
}

Array.prototype["set"] = function(i, v): void{
	this[i] = v;
}

Array.prototype["remove"] = function(i){
	if(i >= this.length){
		throw new RangeError("invalid array index");
	}
	var v = this[i];
	this.splice(i, 1);
	return v;
}

Array.prototype["clear"] = function(){
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

class LibLoadFunc{
	static LoadTokenFunc(ParserContext: GtParserContext, Grammar: Object, FuncName: string): GtFunc{
		return null;
	}

	static LoadParseFunc(ParserContext: GtParserContext, Grammar: Object, FuncName: string): GtFunc{
		return null;
	}

	static LoadTypeFunc(ParserContext: GtParserContext, Grammar: Object, FuncName: string): GtFunc{
		return null;
	}
}

class GtMap {
	private map: Object;
	private length: number;
	private key: string[]
	constructor(){
		this.map = <any>{};
		this.key = [];
		this.length = 0;
	}
	get(index: any): any{
		return this.map[index];
	}
	GetOrNull(index: any): any{
		if(this.map[index] != undefined){
			return this.map[index];
		}
		return null;
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

	static print(msg: string): void {
		console.log(msg);
	}

	static println(msg: string): void {
		console.log(msg);
	}

	static Assert(expect: any): void {
		if(!expect){
			throw new Error("Assertion Failed");
		}
	}

	static NewArray(Type: GtType, InitSizes: any[]): any {
		if(InitSizes.length == 1){
			return GreenTeaArray.NewArray1(Type.TypeParams[0], <any>InitSizes[0] - 0);
		}else if(InitSizes.length == 2){
			return GreenTeaArray.NewArray2(Type.TypeParams[0].TypeParams[0], <any>InitSizes[0] - 0, <any>InitSizes[1] - 0);
		}else if(InitSizes.length == 3){
			return GreenTeaArray.NewArray3(Type.TypeParams[0].TypeParams[0].TypeParams[0], <any>InitSizes[0] - 0, <any>InitSizes[1] - 0, <any>InitSizes[2] - 0);
		}
		return InitSizes;
	}

	static NewArrayLiteral(ArrayType: GtType, Values: any[]): any {
		return GreenTeaArray.NewArrayLiteral(ArrayType, Values);
	}

	static ArrayCopy(src: any, srcPos: number, dest: any, destPos: number, length: number): void {
		for(var i = 0; i < length; ++i){
			dest[destPos + i] = src[srcPos + i];
		}
	}

	static ApplyOverridedMethod(FileLine: number, NameSpace: GtNameSpace, Func: GtFunc, Arguments: Object[]): Object {
		var ClassType: GtType = NameSpace.Context.GuessType(Arguments[0]);
		Func = NameSpace.GetOverridedMethod(ClassType, Func);
		return Func.Apply(Arguments);
	}

	static InvokeDynamicFunc(FileLine: number, ContextType: GtType, NameSpace: GtNameSpace, FuncName: string, Arguments: Object[]): Object {
		var PolyFunc: GtPolyFunc = NameSpace.GetPolyFunc(FuncName);
		var Func: GtFunc = PolyFunc.GetMatchedFunc(NameSpace, Arguments);
		var Value: Object = ContextType.DefaultNullValue;
		if(Func != null) {
			Value = Func.Apply(Arguments);
			return LibGreenTea.DynamicCast(ContextType, Value);
		}
		LibGreenTea.VerboseLog(VerboseRuntime, PolyFunc.MessageTypeError(null, FuncName));
		return Value;
	}

	static InvokeDynamicMethod(FileLine: number, ContextType: GtType, NameSpace: GtNameSpace, FuncName: string, Arguments: Object[]): Object {
		var ClassType: GtType = ContextType.Context.GuessType(Arguments[0]);
		var PolyFunc :GtPolyFunc = NameSpace.GetMethod(ClassType, FuncName, true);
		var Func: GtFunc = PolyFunc.GetMatchedFunc(NameSpace, Arguments);
		var Value :Object = ContextType.DefaultNullValue;
		if(Func != null) {
			Value = Func.Apply(Arguments);
			return LibGreenTea.DynamicCast(ContextType, Value);
		}
		LibGreenTea.VerboseLog(VerboseRuntime, PolyFunc.MessageTypeError(ClassType, FuncName));
		return Value;
	}
	
	static DynamicGetter(ContextType: GtType, RecvObject: Object, FieldName: string): Object {
		try {
			return LibGreenTea.DynamicCast(ContextType, RecvObject[FieldName]);
		} catch (e) {
		}
		return ContextType.DefaultNullValue;
	}

	static DynamicSetter(ContextType: GtType, RecvObject: Object, FieldName: string, Value: Object): Object {
		try {
			RecvObject[FieldName] = Value;
			return LibGreenTea.DynamicCast(ContextType, RecvObject[FieldName]);
		} catch (e) {
		}
		return ContextType.DefaultNullValue;
	}

	static GetPlatform(): string {
		return "TypeScript 0.9.0.1, " + (LibGreenTea.isNodeJS ?
			"Node.js " + process.version + " " + process.platform:
			navigator.appName + " " + navigator.appVersion);
	}

	static DebugMode: boolean = true;

	static GetStackInfo(depth: number): string{
		// TODO
		return " ";//LineNumber;
	}

	static TODO(msg: string): void {
		LibGreenTea.println("TODO" + LibGreenTea.GetStackInfo(2) + ": " + msg);
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

	static VerboseException(e: any): void {
		//TODO stub
	}

	static Exit(status: number, message: string): void {
		throw new Error("Exit: " + message);
	}

	static ParserCount: number = -1;

	static NewParserId(): number {
		LibGreenTea.ParserCount++;
		return LibGreenTea.ParserCount;
	}

	static CharAt(Text: string, Pos: number): number {
		return Text.charCodeAt(Pos);
	}

	static SubString(Text: string , StartIdx: number, EndIdx: number): string {
		return Text.slice(StartIdx, EndIdx);
	}

	static IsWhitespace(Text : string, Pos: number): boolean {
		var ch :number = LibGreenTea.CharAt(Text, Pos);
		return ch == 32/*SP*/ || ch == 9/*TAB*/;
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

	static IsVariableName(Text: string, Pos: number) : boolean {
		var ch :number = LibGreenTea.CharAt(Text, Pos);
		return LibGreenTea.IsLetter(Text, Pos) || ch == '_'.charCodeAt(0) || ch > 255;
	}

	static CheckBraceLevel(Text: string): number {
		var level: number = 0;
		for(var i: number = 0; i < Text.length; i++) {
			var ch: string = Text[i];
			if(ch == '{' || ch == '[') {
				level++;
			}
			if(ch == '}' || ch == ']') {
				level--;
			}
		}
		return level;
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

	static Stringify(Value: any): string {
		if(Value === null){
			return "null";
		}
		var name = LibGreenTea.GetClassName(Value);
		if(name == "String"){
			return LibGreenTea.QuoteString(<string>Value);
		}
		return Value.toString();
	}

	static StringifyField(Value: any): string {
		var field : string[] = [];
		for(var key in Value){
			field.push(key + ": " + LibGreenTea.Stringify(Value[key]));
		}
		return "{" + field.join(", ") + "};";
	}

	static EqualsString(s1: string, s2: string): boolean {
		return s1 == s2;
	}

	static ParseInt(Text: string): number {
		return ~~(<any>Text);
	}

	static ParseFloat(Text: string): number {
		return <any>Text - 0;
	}

	static GetNativeType(Context: GtParserContext, Value: any): GtType {
		var NativeGtType: GtType = null;
		var NativeClassInfo: any = Value.constructor;
		if(typeof Value == 'number' || Value instanceof Number || Value == Number.prototype) {
			if((<any>Value | 0) == <any>Value) {
				return Context.IntType;
			}
			//return Context.FloatType;
		}
		if(typeof Value == 'string' || Value instanceof String || Value == String.prototype) {
			return Context.StringType;
		}
		NativeGtType = <GtType> Context.ClassNameMap.get(NativeClassInfo.name);
		if(NativeGtType == null) {
			NativeGtType = new GtType(Context, NativeType, NativeClassInfo.name, null, NativeClassInfo);
			Context.ClassNameMap.put(NativeClassInfo.name, NativeType);
		}
		return NativeGtType;
	}

	static GetClassName(Value: any): string {
		return (<any>Value).constructor.name;
	}

	static AcceptJavascriptType(GreenType: GtType, Type: any): boolean {
		if(GreenType.IsVarType() || GreenType.IsTypeVariable()) {
			return true;
		}
		if(GreenType.IsTopType()) {
			return (Type == Object.prototype);
		}
		var JavascriptType: GtType = LibGreenTea.GetNativeType(GreenType.Context, Type);
		if(GreenType != JavascriptType) {
			if(GreenType.IsGenericType() && GreenType.HasTypeVariable()) {
				return GreenType.BaseType == JavascriptType.BaseType;
			}
			return false;
		}
		return true;
	}

	static MatchNativeMethod(FuncType: GtType, JavaScriptFunction: any): boolean {
		if(!LibGreenTea.AcceptJavascriptType(FuncType.TypeParams[0], Object.prototype)) {
			return false;
		}
		var StartIndex: number = 2;
		//if(Modifier.isStatic(JavaScriptFunction.getModifiers())) {
		//	StartIndex = 1;			
		//}
		//else {
		//	if(FuncType.TypeParams.length == 1 || !LibGreenTea.AcceptJavascriptType(FuncType.TypeParams[1], JavaScriptFunction.getDeclaringClass())) {
		//		return false;
		//	}
		//	StartIndex = 2;
		//}
		var ParamSize: number = FuncType.TypeParams.length - StartIndex;
		var ParamTypes = [];
		for(var i = 0; i < JavaScriptFunction.length; i++){
			ParamTypes[i] = Object.prototype;
		}
		if(ParamTypes.length > 0) {
			if(ParamTypes.length != ParamSize) return false;
			for(var j = 0; j < ParamTypes.length; j++) {
				if(!LibGreenTea.AcceptJavascriptType(FuncType.TypeParams[StartIndex+j], ParamTypes[j])) {
					return false;
				}
			}
			return true;
		}
		else {
			return (ParamSize == 0);
		}
	}

	static SetNativeMethod(NativeMethod: GtFunc, JavaScriptFunction: any): GtFunc {
		var FuncFlag = NativeFunc;
		NativeMethod.SetNativeMethod(FuncFlag, JavaScriptFunction);
		return NativeMethod;
	}

	static ConvertNativeMethodToFunc(Context: GtParserContext, JavaScriptFunction: any): GtFunc {
		var TypeList: GtType[] = [];
		TypeList.add(LibGreenTea.GetNativeType(Context, Object.prototype));
		TypeList.add(LibGreenTea.GetNativeType(Context, Object.prototype));
		var ParamTypes = [];
		for(var i = 0; i < JavaScriptFunction.length; i++){
			ParamTypes[i] = Object.prototype;
		}
		if(ParamTypes.length > 0) {
			for(var j = 0; j < ParamTypes.length; j++) {
				TypeList.add(LibGreenTea.GetNativeType(Context, ParamTypes[j]));
			}
		}
		return LibGreenTea.SetNativeMethod(new GtFunc(0, JavaScriptFunction.name, 0, TypeList), JavaScriptFunction);
	}

	static LoadNativeClass(ClassName: string) : any {
		throw new Error("NotSupportedAPI");
		return null;
	}

	static LoadNativeMethod(ContextType: GtType, FullName: string, StaticMethodOnly: boolean) : any {
		throw new Error("NotSupportedAPI");
		return null;
	}

	static ImportNativeMethod(NameSpace: GtNameSpace, NativeFunc : GtFunc, FullName: string) : boolean {
		throw new Error("NotSupportedAPI");
		return false;
	}

	static ImportNativeObject(NameSpace : GtNameSpace, FullName: string) : boolean {
		//TODO stub
		throw new Error("NotSupportedAPI");
		return false;
	}

	static LoadNativeConstructors(ClassType: GtType, FuncList: GtFunc[]) : boolean {
		throw new Error("NotSupportedAPI");
		return false;
	}

	static LoadNativeField(ClassType: GtType, FieldName: string, GetSetter: boolean) : GtFunc {
		throw new Error("NotSupportedAPI");
		return null;
	}

	static NativeFieldValue (ObjectValue: any, NativeField: any/*Field*/) :  any {
		//TODO stub
		return null;
	}

	static NativeFieldGetter(ObjectValue: any, NativeField: any/*Field*/) : any{
		//TODO stub
		return null;
	}

	static NativeFieldSetter(ObjectValue: any, NativeField: any/*Field*/, Value: any) : any {
		//TODO stub
		return null;
	}

	static ImportStaticObject(Context: GtParserContext, NativeClass: any, Symbol: string) : any {
		//TODO stub
		return null;
	}

	static LoadNativeStaticFieldValue(ClassType: GtType, Symbol: String): any {
		//TODO stub
		return null;
	}

	static LoadNativeMethods(ClassType: GtType, FuncName: string, FuncList: GtFunc[]): void {
		//TODO stub
	}

	static LookupNativeMethod(Callee: Object, MethodName: string): any {
		return Callee[MethodName];
	}

	static ApplyFunc(Func: GtFunc, Self: any, Params: any[]): any {
		//TODO stub
		return null;
	}

	static ApplyFunc1(Func: GtFunc, Self: any, Param: any): any {
		//TODO stub
		return null;
	}

	static ApplyFunc2(Func: GtFunc, Self: any, Param1: any, Param2: any): any {
		//TODO stub
		return null;
	}

	static ApplyFunc3(Func: GtFunc, Self: any, Param1: any, Param2: any, Param3: any): any {
		//TODO stub
		return null;
	}

	static ApplyFunc4(Func: GtFunc, Self: any, Param1: any, Param2: any, Param3: any, Param4: any): any {
		//TODO stub
		return null;
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

	static ApplyParseFunc(ParseFunc: GtFunc, NameSpace: GtNameSpace, TokenContext: any, LeftTree: GtSyntaxTree, Pattern: GtSyntaxPattern): GtSyntaxTree {
		//TODO stub
		//try {
		//	return <GtSyntaxTree>Delegate(NameSpace, TokenContext, LeftTree, Pattern);
		//}
		//catch (e) {
		//	console.log(e);
		//}
		//LibGreenTea.Exit(1, "Failed ApplyMatchFunc");
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

	static RetrieveMapKeys(Map: GtMap, Prefix: string, List: string[]): void {
		//TODO stub
	}

	static Usage(message: string): void {
	}

	static DetectTargetCode(Extension: string, TargetCode: string): string {
		//TODO stub
		return null;
	}

	static StartsWith(self: string, key: string): boolean {
		return self.indexOf(key, 0) == 0;
	}

	static EndsWith(self: string, key: string): boolean {
		return self.lastIndexOf(key, 0) == (self.length - key.length);
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
			}else if(LibGreenTea.EndsWith(Extension, ".scala") || LibGreenTea.StartsWith(TargetCode, "scala")){
				return new ScalaSourceGenerator(TargetCode, OutputFile, GeneratorFlag);
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

	static ReadLine(Prompt: string, Prompt2: string): string {
		throw new Error("LibGreenTea.ReadLine is not implemented for this environment");
		return "";
	}

	static ReadLine2(Prompt: string, Prompt2: string): string {
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

	static IsSupportedTarget(TargetCode: string){
		return LibGreenTea.HasFile(LibGreenTea.GetLibPath(TargetCode, "common"));
	}

	static GetLibPath(TargetCode: string, FileName: string): string {
		return ("lib/" + TargetCode + "/" + FileName + ".green");
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

	public static DynamicCast(CastType: GtType, Value: any): any {
		return null;
	}

	public static DynamicInstanceOf(Value: any, Type: GtType): any {
		return false;
	}

	public static DynamicConvertTo(CastType: GtType, Value: any): any {
		//TODO stub
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
