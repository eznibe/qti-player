var LiChecklistItem = (function () {
	function LiChecklistItem() {}

	LiChecklistItem.prototype.created = function(){
		this.super();
	};

	return LiChecklistItem;
})();

Polymer('li-checklistitem', LiChecklistItem.prototype);