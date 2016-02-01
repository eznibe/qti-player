var SimpleChoiceSortable = (function () {
    function SimpleChoiceSortable() {}

    SimpleChoiceSortable.prototype.created = function(){
		this.super();
    };

    return SimpleChoiceSortable;
})();

Polymer('qti-simplechoice-sortable', SimpleChoiceSortable.prototype);