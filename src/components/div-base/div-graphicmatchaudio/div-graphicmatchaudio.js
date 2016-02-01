var DivGraphicMatchAudio = (function () {
	function DivGraphicMatchAudio() {}
    
    DivGraphicMatchAudio.prototype.created = function() {
        this.super();
    };
    
    DivGraphicMatchAudio.prototype.domReady = function() {
        this.super();
        this.options = [];
        var i, items = this.querySelectorAll('qti-gapimg');
        for(i = 0; i < items.length; i++) {
            this.appendChild(items[i]);
        }
    };

	return DivGraphicMatchAudio;
})();

Polymer('div-graphicmatchaudio', DivGraphicMatchAudio.prototype);