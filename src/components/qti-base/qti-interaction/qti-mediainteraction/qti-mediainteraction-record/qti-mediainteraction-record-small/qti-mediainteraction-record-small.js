var QtiMediaInteractionRecordSmall = (function () {
	function QtiMediaInteractionRecordSmall() { }

	QtiMediaInteractionRecordSmall.prototype.created = function(){
		this.super();
		this.mainClass = 'record';

		this.setup = {
			"controls": true,
			"autoplay": false,
			"loop": false,
			"width": 420,
			"height": 120,
			"plugins": {
				"wavesurfer": {
					"src": ""+this.data+"",
					"waveColor": "#b3ce41",
					"progressColor": "#b3ce41",
					"cursorColor": "#ffffff"
				},
				"volumeBars": {},
				"replayButton": {}
			}
		};
	};

	QtiMediaInteractionRecordSmall.prototype.drawWaveform = function(url) {
		var audioElement = document.createElement("audio");
		audioElement.setAttribute('id', 'playback');
		audioElement.setAttribute('class', 'contain-media video-js vjs-mindtree-skin record__recording');
		this.recordBody.appendChild(audioElement);
		this.playback = this.shadowRoot.querySelector('#playback');

		videojs(this.playback, {
			"controls": true,
			"autoplay": false,
			"loop": false,
			"width": 420,
			"height": 120,
			"plugins": {
				"wavesurfer": {
					"src": ""+url+"",
					"waveColor": "#ffe039",
					"progressColor": "#ffe039",
					"cursorColor": "#ffffff"
				},
				"volumeBars": {},
				"replayButton": {}
			}
		}).ready(function() {});

		this.alignAudio();
	};

	return QtiMediaInteractionRecordSmall;
})();

Polymer('qti-mediainteraction-record-small', QtiMediaInteractionRecordSmall.prototype);