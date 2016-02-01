var QuestionItem = (function () {
    function QuestionItem() {}

    QuestionItem.prototype.created = function(){
		this.super();

		this.plineExists = (this.querySelector('p-line')) ? true : false ;
		this.panswerExists = (this.querySelector('p-answer')) ? true : false ;
	};

    return QuestionItem;
})();

Polymer('li-questionitem', QuestionItem.prototype);
