var QtiChoiceInteractionQuestionlist = (function () {
    function QtiChoiceInteractionQuestionlist() { }

    QtiChoiceInteractionQuestionlist.prototype.created = function(){
		this.super();
		this.mainClass = 'questions-list__answers';
    };

    return QtiChoiceInteractionQuestionlist;
})();

Polymer('qti-choiceinteraction-questionlist', QtiChoiceInteractionQuestionlist.prototype);
