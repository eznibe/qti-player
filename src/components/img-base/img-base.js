var ImgBase = (function () {
	function ImgBase() {}

	ImgBase.prototype.created = function(){
		this.super();
		this.src = this.getAttribute('src');
		this.alt = this.getAttribute('alt');
	}

	return ImgBase;
})();

Polymer('img-base', ImgBase.prototype);