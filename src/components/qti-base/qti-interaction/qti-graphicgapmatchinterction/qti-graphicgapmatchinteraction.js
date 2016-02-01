var QtiGraphicGapMatchInteraction = (function () {
	function QtiGraphicGapMatchInteraction() { }
    
    QtiGraphicGapMatchInteraction.prototype.created = function() {
        this.super();
        this.graphicSrc = this.querySelector('object').getAttribute('data');
        
        
        this.dropElements = this.querySelectorAll('qti-associablehotspot');
        this.maxDrops = [];
        for(var d = 0; d < this.dropElements.length; d++) {
            this.maxDrops[d] = 1;
        }

        //this has to be done on created as 'qti-gapImg' elements are moved on domready and not selectable (in div-graphicmatchaudio component)
        this.dragElements = this.querySelectorAll('qti-gapImg');
        this.maxDrags = [];
        for(var s = 0; s < this.dragElements.length; s++) {
            this.maxDrags[s] = Number(this.dragElements[s].getAttribute('matchMax')) || 1;
        }
    };
    
    QtiGraphicGapMatchInteraction.prototype.domReady = function() {
        this.super();
        this.dragAndDropManager = new DragAndDropManager(this, this.dragElements, this.dropElements, this.maxDrops, this.maxDrags, this.dragAndDropCallback);
    };
    
    QtiGraphicGapMatchInteraction.prototype.dragAndDropCallback = function() {
        
    }

	return QtiGraphicGapMatchInteraction;
})();

Polymer('qti-graphicgapmatchinteraction', QtiGraphicGapMatchInteraction.prototype);