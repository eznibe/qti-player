var QtiTextEntryInteractionTextarea = (function () {
	function QtiTextEntryInteractionTextarea() { }

	QtiTextEntryInteractionTextarea.prototype.created = function(){
	  this.super();
	};

	QtiTextEntryInteractionTextarea.prototype.textChanged = function (event) {
		this.saveResponse(event.target.value);
	};

	return QtiTextEntryInteractionTextarea;
})();

Polymer('qti-textentryinteraction-textarea', QtiTextEntryInteractionTextarea.prototype);