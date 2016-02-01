var QtiTextEntryInteraction = (function () {
	function QtiTextEntryInteraction() { }

	QtiTextEntryInteraction.prototype.created = function(){
	  this.super();
	};

	QtiTextEntryInteraction.prototype.textChanged = function (event) {
		this.saveResponse(event.target.value);
	};

	return QtiTextEntryInteraction;
})();

Polymer('qti-textentryinteraction', QtiTextEntryInteraction.prototype);