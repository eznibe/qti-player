var SpanInteraction = (function () {
	function SpanInteraction() {}

	SpanInteraction.prototype.created = function(){
	  this.super();
	  this.mainClass = 'interaction';
	};

	SpanInteraction.prototype.domReady = function () {
		this.super();
		this.fire(Events.REGISTER_STATUSELEMENT, this);
		this.showStatus('empty');
	};

	SpanInteraction.prototype.showStatus = function (value) {
		this.setAttribute('status', value);
	}

	return SpanInteraction;
})();

Polymer('span-interaction', SpanInteraction.prototype);