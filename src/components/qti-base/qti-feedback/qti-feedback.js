var QtiFeedback = (function () {
	function QtiFeedback() {}

	QtiFeedback.prototype.created = function () {
		this.super();
		this.mainClass = 'feedback';
		this.show = this.getAttribute('showHide') || 'show';
		this.outcomeIdentifier = this.getAttribute('outcomeIdentifier') || '';
		this.identifier = this.getAttribute('identifier') || '';
		this.showFeedback(this.show === 'hide');
	};

	QtiFeedback.prototype.domReady = function () {
		this.super();
		this.fire(Events.REGISTER_FEEDBACK, this);
	};

	QtiFeedback.prototype.checkShowFeedback = function (outcomeIdentifier, outcomeValue) {
		if (this.outcomeIdentifier === outcomeIdentifier) {
			if(outcomeValue instanceof Array) {
				//does the array contain the identifier.
				this.showFeedback(outcomeValue.indexOf(this.identifier) != -1);
			} else {
				//does the value match the identifier.
				this.showFeedback(this.identifier === outcomeValue);
			}
		}
	};

	QtiFeedback.prototype.showFeedback = function (value) {
		this.show_status = (value) ? 'on' : 'off';
	};

	return QtiFeedback;
})();

Polymer('qti-feedback', QtiFeedback.prototype);