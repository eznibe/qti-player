var QtiChoiceInteractionAnswerlist = (function () {
    function QtiChoiceInteractionAnswerlist() { }

    QtiChoiceInteractionAnswerlist.prototype.created = function(){
		this.super();
		this.mainClass = '';
    };

    return QtiChoiceInteractionAnswerlist;
})();

Polymer('qti-choiceinteraction-answerlist', QtiChoiceInteractionAnswerlist.prototype);
