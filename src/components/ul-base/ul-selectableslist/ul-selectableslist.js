var SelectablesList = (function () {
	function SelectablesList() {}

	SelectablesList.prototype.created = function(){
		this.super();
	}

	return SelectablesList;
})();

Polymer('ul-selectableslist', SelectablesList.prototype);