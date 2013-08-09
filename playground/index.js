(function () {

	var editor_gs = CodeMirror.fromTextArea(document.getElementById("editor-gs"), {
		lineNumbers: true,
		mode: "text/x-csrc",
		});
	var editor_js = CodeMirror.fromTextArea(document.getElementById("editor-js"), {
		lineNumbers: true,
		readOnly: true,
		mode: "text/x-csrc"});

	var CodeGeneratorName = "--js";
	var Generator = LangDeps.CodeGenerator(CodeGeneratorName);
	var Context = new GtContext(new DScriptGrammar(), Generator);
	DebugPrintOption = true;

	editor_gs.on("change", function(cm, obj) {
		var src = cm.getValue();
		var jssrc = Context.Eval(src);
		editor_js.setValue(jssrc);
	});
 })();
