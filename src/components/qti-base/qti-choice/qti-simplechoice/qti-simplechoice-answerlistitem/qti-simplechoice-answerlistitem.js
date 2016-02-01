var SimpleChoiceAnswerlistItem = (function () {
    function SimpleChoiceAnswerlistItem() {}

    SimpleChoiceAnswerlistItem.prototype.created = function(){
		this.super();
		this.mainClass = '';
    };

    return SimpleChoiceAnswerlistItem;
})();

Polymer('qti-simplechoice-answerlistitem', SimpleChoiceAnswerlistItem.prototype);