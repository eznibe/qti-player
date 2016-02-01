var DivCarouselVertical = (function () {
	function DivCarouselVertical() {}

	DivCarouselVertical.prototype.created = function(){
		this.super();
		this.orientation = 'vertical';
	};

	return DivCarouselVertical;
})();

Polymer('div-carousel-vertical', DivCarouselVertical.prototype);