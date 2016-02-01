var DivChecklist = (function () {
	function DivChecklist() {}

	DivChecklist.prototype.created = function(){
		this.super();
	};

	return DivChecklist;
})();

Polymer('div-checklist', DivChecklist.prototype);