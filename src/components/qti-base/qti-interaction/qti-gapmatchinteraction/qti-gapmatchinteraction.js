var QtiGapMatchInteraction = (function () {
	function QtiGapMatchInteraction( element ) { }

	QtiGapMatchInteraction.prototype.created = function(){
		this.super();

		this.gaps = [];
		this.dropElements = this.querySelectorAll('qti-gap');
		this.maxDrops = [];
		for(var d = 0; d < this.dropElements.length; d++)
		{
			this.gaps.push(this.dropElements[d]);
			//number of elements the current drop-zone accepts.
			this.maxDrops[d] = 1;
		}

		this.gapTexts =  [];
		this.dragElements = this.querySelectorAll('qti-gapText');
		this.maxDrags = [];
		for(var s = 0; s < this.dragElements.length; s++)
		{
			this.gapTexts.push(this.dragElements[s].outerHTML);
			//number of times the drag element can be used.
			this.maxDrags[s] = Number(this.dragElements[s].getAttribute('matchMax')) || 1;
		}
	};

	QtiGapMatchInteraction.prototype.domReady = function(){
		this.super();
		//initialise the drag and drop managerand pass it the elements.....
		this.dragAndDropManager = new DragAndDropManager(this, this.dragElements, this.dropElements, this.maxDrops, this.maxDrags, this.dragAndDropCallback);
	};

	QtiGapMatchInteraction.prototype.dragAndDropCallback = function(results, element){
		var response = [];
		for(var r = 0; r < results.length; r++)
		{
			var pairing = {};

			pairing.source = results[r].drag.getAttribute('identifier');
			pairing.destination = results[r].drop.getAttribute('identifier');

			response.push(pairing);
		}
		element.saveResponse( response );
	};

	return QtiGapMatchInteraction;
})();

Polymer('qti-gapmatchinteraction', QtiGapMatchInteraction.prototype);