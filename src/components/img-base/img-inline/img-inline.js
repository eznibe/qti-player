var ImgInline = (function () {
	function ImgInline() {}

	ImgInline.prototype.created = function(){
		this.super();
	}

	return ImgInline;
})();

Polymer('img-inline', ImgInline.prototype);