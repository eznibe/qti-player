var SelectablesItem = (function () {
    function SelectablesItem() {}

    SelectablesItem.prototype.created = function(){
		this.super();
		this.mainClass = 'selectables-list__item';
	};

    return SelectablesItem;
})();

Polymer('li-selectablesitem', SelectablesItem.prototype);
