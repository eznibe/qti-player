var QtiAssociableHotspot = (function () {
	function QtiAssociableHotspot() {}
    
    QtiAssociableHotspot.prototype.created = function() {
        this.super();
        
        var coords = this.getAttribute('coords').split(',');
        this.leftPosition = coords[0] || 0;
        this.topPosition = coords[1] || 0;
    };

	return QtiAssociableHotspot;
})();

Polymer('qti-associablehotspot', QtiAssociableHotspot.prototype);