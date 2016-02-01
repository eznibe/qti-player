var QuestionList = (function () {
    function QuestionList() {}

    QuestionList.prototype.created = function(){
      this.super();
	};

    return QuestionList;
})();

Polymer('ol-questionlist', QuestionList.prototype);
