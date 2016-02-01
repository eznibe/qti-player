var QtiMediaInteractionAudio = (function () {
    function QtiMediaInteractionAudio() { }

    QtiMediaInteractionAudio.prototype.created = function(){
    	this.super();
		this.setup = {
            "controls": true,
            "plugins":{
				"loader": {},
				"replayButton": {},
				// "slowmoButton": {},
				"showBigPlayAtEnd": {},
				"subtitlesButton": {},
				"volumeBars": {},
				"keyboardControls": {},
				"toolTip": {},
				"progressHover": {},
				"cuePoints": {}
			}
        };
    }

    return QtiMediaInteractionAudio;
})();

Polymer('qti-mediainteraction-audio', QtiMediaInteractionAudio.prototype);