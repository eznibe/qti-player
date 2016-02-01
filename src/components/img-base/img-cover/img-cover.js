var ImgCover = (function () {
	function ImgCover() {}

	ImgCover.prototype.created = function(){
		this.super();
		this.htmlClasses = {
			COVER_CONTAINER: 'cover',
			HIDE_IMAGE: 'hiddenimg'
		};
	};

	ImgCover.prototype.domReady = function(){
		this.super();
		this.container = this.shadowRoot.querySelector('.' + this.htmlClasses.COVER_CONTAINER);
		this.img = this.shadowRoot.querySelector('img');
		this.img.style.opacity = '0';

		this.img.classList.add(this.htmlClasses.HIDE_IMAGE);
		var that = this;
		if (this.img.complete) {
			this.updateImage();
		} else {
			this.img.addEventListener('load', function(){
				that.updateImage();
			});
		}
	};

	ImgCover.prototype.updateImage = function(){
		this.sizeImage();
		this.centerImage();
		this.showImage();
		this.onResize();

		this.img.classList.remove(this.htmlClasses.HIDE_IMAGE);
	};

	ImgCover.prototype.onResize = function(){
		var _this = this;
		window.addEventListener( 'resize', function( event ) {
			_this.sizeImage();
			_this.centerImage();
		}, false );
	};

	ImgCover.prototype.getSizeInfo = function(){
		this.containerWidth = this.container.offsetWidth;
		this.containerHeight = this.container.offsetHeight;
		this.imgWidth = this.img.offsetWidth;
		this.imgHeight = this.img.offsetHeight;
	};

	ImgCover.prototype.sizeImage = function(){
		this.getSizeInfo();
		this.img.style.maxWidth = 'none';
		this.img.style.width = this.containerWidth+'px';
		this.img.style.height = 'auto';
		if (this.img.offsetHeight < this.container.offsetHeight) {
			this.img.style.maxWidth = 'none';
			this.img.style.width = 'auto';
			this.img.style.height = this.containerHeight+'px';
		}
	};

	ImgCover.prototype.centerImage = function(){
		this.getSizeInfo();
		this.img.style.top = 0-((this.imgHeight-this.containerHeight)/2)+'px';
		this.img.style.left = 0-((this.imgWidth-this.containerWidth)/2)+'px';
	};

	ImgCover.prototype.showImage = function(){
		this.img.style.transition = 'opacity 1s';
		this.img.style.opacity = '1';
	};

	return ImgCover;
})();

Polymer('img-cover', ImgCover.prototype);