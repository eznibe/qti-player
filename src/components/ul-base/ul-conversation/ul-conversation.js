var UlConversation = (function () {
	function UlConversation() {}

	UlConversation.prototype.created = function(){
		this.super();
	};

	return UlConversation;
})();

Polymer('ul-conversation', UlConversation.prototype);