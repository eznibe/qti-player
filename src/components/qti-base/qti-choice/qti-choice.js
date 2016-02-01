var QtiChoice = (function () {
	function QtiChoice() {}

	// define default properties
	QtiChoice.prototype.selectedChoice = false;
	QtiChoice.prototype.disabled = false;

	QtiChoice.prototype.created = function(){
		this.super();
		this.identifier = this.getAttribute('identifier') || '';

		// set all choices default selected false
		this.setAttribute("selected", false);
		this.addEventListener(Events.CHOICE_SELECTED, this.choiceSelected );
	};

	QtiChoice.prototype.domReady = function () {
		this.super();
		this.fire(Events.REGISTER_CHOICE, this);
	};

	QtiChoice.prototype.detached = function () {
		this.super();
		this.removeEventListener(Events.CHOICE_SELECTED, this.choiceSelected );
	};

	QtiChoice.prototype.setStatus = function (status) {
		this.super();
		this.choice_status = status;
	};

	QtiChoice.prototype.choiceSelected = function ( event ) {
		this.selectedChoice = (this.selectedChoice) ? false : true;
		this.setAttribute("selected", this.selectedChoice );
		// fire event for the interaction base class to handle
		this.fire(Events.CHOICE_ELEMENT_SELECTED, this);
	};

	QtiChoice.prototype.setdisabled = function(value) {
		// does nothing in the base class
		this.disabled = value;
	};

	QtiChoice.prototype.setselected = function(value) {
		// does nothing in the base class
	};

	return QtiChoice;
	})();

Polymer('qti-choice', QtiChoice.prototype);