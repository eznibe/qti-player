var DivQuiz = (function () {
	function DivQuiz() {}

	DivQuiz.prototype.created = function(){
		this.super();

		this.htmlClasses = {

		};
	};

	 DivQuiz.prototype.domReady = function(){
		this.super();
	};

	return DivQuiz;
})();

Polymer('div-quiz', DivQuiz.prototype);
