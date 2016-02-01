var DivGraphicMatchFull = (function () {
	function DivGraphicMatchFull() {}
    
    DivGraphicMatchFull.prototype.created = function() {
        this.super();
    };
    
    DivGraphicMatchFull.prototype.domReady = function() {
        this.super();
        this.options = [];
        var i, items = this.querySelectorAll('qti-gapimg');
        for(i = 0; i < items.length; i++) {
            this.appendChild(items[i]);
        }
    };

	return DivGraphicMatchFull;
})();

Polymer('div-graphicmatchfull', DivGraphicMatchFull.prototype);