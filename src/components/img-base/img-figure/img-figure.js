var ImgFigure = (function () {
	function ImgFigure() {}

	ImgFigure.prototype.created = function(){
		this.super();
	};

	return ImgFigure;
})();

Polymer('img-figure', ImgFigure.prototype);