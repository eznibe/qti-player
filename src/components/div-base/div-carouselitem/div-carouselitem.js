var DivCarouselItem = (function () {
	function DivCarouselItem() {}

	DivCarouselItem.prototype.created = function(){
		this.super();
		this.orientation = this.parentNode.orientation;
	};

	DivCarouselItem.prototype.attributeChanged = function(attrName, oldVal, newVal){
		this.super();
		if(attrName == 'class') this.carousel_status = newVal;
	};

	return DivCarouselItem;
})();

Polymer('div-carouselitem', DivCarouselItem.prototype);