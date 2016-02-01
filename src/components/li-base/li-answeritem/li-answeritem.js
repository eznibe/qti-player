var AnswerItem = (function () {
    function AnswerItem() {}

    AnswerItem.prototype.created = function(){
		this.super();
		this.mainClass = 'questions-list__answer-option';
	};

    return AnswerItem;
})();

Polymer('li-answeritem', AnswerItem.prototype);
