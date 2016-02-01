var ImgAvatar = (function () {
	function ImgAvatar() {}

	ImgAvatar.prototype.created = function(){
		this.super();
	};

	return ImgAvatar;
})();

Polymer('img-avatar', ImgAvatar.prototype);