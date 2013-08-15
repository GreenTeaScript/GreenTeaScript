$(function () {

	var PlayGround_CodeGenTarget = "--js";

	var editor_gs = CodeMirror.fromTextArea(document.getElementById("editor-gs"), {
		lineNumbers: true,
		mode: "text/x-csrc",
		placeholder: "Type something...",
		});
	var editor_js = CodeMirror.fromTextArea(document.getElementById("editor-js"), {
		lineNumbers: true,
		placeholder: "Generated code goes here...",
		readOnly: true,
		mode: "text/x-csrc"});

	var Generate = function(){
		try{
			var src = editor_gs.getValue();
			var Generator = LangDeps.CodeGenerator(PlayGround_CodeGenTarget);
			var Context = new GtClassContext(new DScriptGrammar(), Generator);
			DebugPrintOption = true;
			var jssrc = Context.Eval(src);
			editor_js.setValue(jssrc);
			var error = Context.GetReportedErrors().join("\n");
			$("#editor-error").text(error.length == 0 ? "No Error" : error);
		}catch(e){
			$("#editor-error").text(e);
		}
	}

	editor_gs.on("change", function(cm, obj) {
		Generate();
	});

	var TargetNames   = ["JavaScript", "Java", "Perl", "Bash", "C"];
	var TargetOptions = ["--js", "--java", "--perl", "--bash", "--c"];

	var bind = function(n){
		var Target = $('#Tatget-' + TargetNames[n]);
		Target.click(function(){
			PlayGround_CodeGenTarget = TargetOptions[n];
			$('li.active').removeClass("active");
			Target.parent().addClass("active");
			Generate();
		});
	}

	for(var i = 0; i < TargetNames.length; i++){
		bind(i);
	}
});
