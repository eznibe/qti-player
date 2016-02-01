var QtiMediaInteractionAudioWaveform = (function () {
    function QtiMediaInteractionAudioWaveform() { }

    QtiMediaInteractionAudioWaveform.prototype.created = function(){
    	this.super();
    	this.mainClass = 'audio';

		this.setup = {
			"controls": true,
			"autoplay": false,
			"loop": false,
			"width": 650,
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

    return QtiMediaInteractionAudioWaveform;
})();

Polymer('qti-mediainteraction-audio-waveform', QtiMediaInteractionAudioWaveform.prototype);