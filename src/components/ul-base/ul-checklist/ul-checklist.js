var UlCheckList = (function () {
	function UlCheckList() {}

	UlCheckList.prototype.created = function(){
		this.super();
	};

	return UlCheckList;
})();

Polymer('ul-checklist', UlCheckList.prototype);