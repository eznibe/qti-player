var QtiMediaInteractionVideoFull = (function () {
    function QtiMediaInteractionVideoFull() { }

    QtiMediaInteractionVideoFull.prototype.created = function() {
		this.super();

		this.htmlClasses = {
			video: 'video-js',
			letterbox: 'letterbox',
			freetown: 'freetown-pane'
		};

		/* video setup settings */
		this.setup = {
			"controls": true,
			"plugins":{
				"loader": {},
				"replayButton": {},
				"slowmoButton": {},
				"showBigPlayAtEnd": {},
				"subtitlesButton": {},
				"volumeBars": {},
				"keyboardControls": {},
				"toolTip": {},
				"progressHover": {},
				"cuePoints": {}
			}
		};
	};

	QtiMediaInteractionVideoFull.prototype.domReady = function() {
		this.super();
		this.sizePlayer();
		this.onResize();
	};

	QtiMediaInteractionVideoFull.prototype.sizePlayer = function(){
		var parent = $(this.parentNode.shadowRoot.querySelector('.' + this.htmlClasses.freetown));
		var letterBox_el = $(this.shadowRoot.querySelector('.' + this.htmlClasses.letterbox));
		var ratioWidth = parent.height() * (16/9);
		letterBox_el.css('width', ratioWidth);
	};

	QtiMediaInteractionVideoFull.prototype.onResize = function(){
		var _this = this;
		window.addEventListener( 'resize', function( event ) {
			_this.sizePlayer();
		}, false );
	};

    return QtiMediaInteractionVideoFull;
})();

Polymer('qti-mediainteraction-video-full', QtiMediaInteractionVideoFull.prototype);