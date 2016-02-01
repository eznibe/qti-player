var SimpleChoiceQuestionlistItem = (function () {
    function SimpleChoiceQuestionlistItem() {}

    SimpleChoiceQuestionlistItem.prototype.created = function(){
		this.super();
    };

    return SimpleChoiceQuestionlistItem;
})();

Polymer('qti-simplechoice-questionlistitem', SimpleChoiceQuestionlistItem.prototype);