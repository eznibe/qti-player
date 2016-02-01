var UlAnswerList = (function () {
    function UlAnswerList() {}

    UlAnswerList.prototype.created = function(){
		this.super();
		this.mainClass = 'questions-list__answers';
	};

    return UlAnswerList;
})();

Polymer('ul-answerlist', UlAnswerList.prototype);