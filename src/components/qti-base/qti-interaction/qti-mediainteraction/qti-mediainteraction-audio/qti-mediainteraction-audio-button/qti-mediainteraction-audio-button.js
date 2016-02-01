var QtiMediaInteractionAudioButton = (function () {
    function QtiMediaInteractionAudioButton() { }

    QtiMediaInteractionAudioButton.prototype.created = function(){
    	this.super();

		this.setup = {
            "controls": true
        };
    }

    return QtiMediaInteractionAudioButton;
})();

Polymer('qti-mediainteraction-audio-button', QtiMediaInteractionAudioButton.prototype);