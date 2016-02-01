var QtiMediaInteractionVideo = (function () {
    function QtiMediaInteractionVideo() { }

    QtiMediaInteractionVideo.prototype.created = function() {
		this.super();
		this.mainClass = 'vjs';

		this.htmlClasses = {
			video: 'video-js'
		};
	};

    return QtiMediaInteractionVideo;
})();

Polymer('qti-mediainteraction-video', QtiMediaInteractionVideo.prototype);