var QtiItemBody = (function () {
	function QtiItemBody() {}

	//submit button clicked.
	QtiItemBody.prototype.submitClicked = function () {
		this.fire(Events.SUBMIT_RESPONSES);
	};

	QtiItemBody.prototype.showAnswersClicked = function () {
		this.fire(Events.SHOW_ANSWERS);
	};

	return QtiItemBody;
})();

Polymer('qti-itembody', QtiItemBody.prototype);