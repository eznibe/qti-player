var QtiInfoControl = (function () {
	function QtiInfoControl() {}

	QtiInfoControl.prototype.created = function () {
		this.super();
		this.mainClass = 'shell-hint';
		this.htmlClasses = {
			hint_open: 'hint-open',
			hint_button: 'button-hint',
			shell_hint_button: 'button',
			shell_hint_body: 'hint-body',
			button: 'button'
		}
	};

	QtiInfoControl.prototype.domReady = function () {
		this.super();
		this.hintButton = this.shadowRoot.querySelector('.' + this.htmlClasses.shell_hint_button );
		this.hintContainer = this.shadowRoot.querySelector('.' + this.mainClass );
	}

	QtiInfoControl.prototype.showHint = function (event) {
		event.preventDefault();
		this.hintContainer.classList.toggle(this.htmlClasses.hint_open);
		this.hintButton.classList.toggle(this.htmlClasses.hint_open);
	};

	QtiInfoControl.prototype.blurHint = function (event) {
		event.preventDefault();
		this.hintContainer.classList.remove(this.htmlClasses.hint_open);
		this.hintButton.classList.remove(this.htmlClasses.hint_open);
	};

	return QtiInfoControl;
})();

Polymer('qti-infocontrol', QtiInfoControl.prototype);