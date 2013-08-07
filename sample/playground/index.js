(function () {

	var editor_gs = CodeMirror.fromTextArea(document.getElementById("editor-gs"), {
		lineNumbers: true,
		mode: "text/x-csrc",
		});
	var editor_js = CodeMirror.fromTextArea(document.getElementById("editor-js"), {
		lineNumbers: true,
		readOnly: true,
		mode: "text/x-csrc"});

	editor_gs.on("change", function(cm, obj) {
		var src = cm.getValue();
		editor_js.setValue(src);
	});
 })();
