var QtiOrderInteraction = (function () {
	function QtiOrderInteraction() { }

	QtiOrderInteraction.prototype.created = function(){
		this.super();
		this._thisClass = 'drag-target';
		this.active = 'active';
		this.sortableElementName = 'qti-simplechoice-sortable';
		this.order = [];

		this.options = {
			rowHeight: 30,
			gutter: 10,
			isInitLayout: true,
			itemSelector : 'li'
		};

		this.sortables = [];
		var simpleChoiceItems = this.querySelectorAll( this.sortableElementName );
		for(var s = 0; s < simpleChoiceItems.length; s++)
		{
			var elem = simpleChoiceItems[s];
			this.sortables.push({label: elem.innerHTML, identifier: elem.getAttribute('identifier') });
		}
	};

	QtiOrderInteraction.prototype.domReady = function(){
		this.super();
		var _this = this;
		this.container = this.shadowRoot.querySelector('.' + this._thisClass );
		this.pckry = new Packery(this.container, this.options);

		var itemElems = this.pckry.getItemElements();
		for (var i = 0, len = itemElems.length; i < len; i++) {
			var elem = itemElems[i];
			if (!elem.classList.contains('static')) {
				var draggie = new Draggabilly(elem);
				this.pckry.bindDraggabillyEvents(draggie);
				draggie.on('dragStart', function(){
					_this.dragStart();
				});
				draggie.on('dragEnd', function(){
					_this.dragEnd();
				});
			}
		}

		this.pckry.on('layoutComplete', function (pckryInstance, draggedItem) {
			_this.layoutComplete();
		});

		this.pckry.on( 'dragItemPositioned', function (pckryInstance, draggedItem) {
			_this.dragItemPositioned(draggedItem);
		});

		this.pckry.layout();
		this.updateOrder();
	};

	//layout has been updated...
	QtiOrderInteraction.prototype.layoutComplete = function() {
		this.refreshLayout();
	};

	QtiOrderInteraction.prototype.refreshLayout = function() {
		var _this = this;
		this.timer = setTimeout(function(){
			_this.pckry.layout();
			clearInterval(_this.timer);
		}, 100);
	};

	//drag item has been positioned...
	QtiOrderInteraction.prototype.dragItemPositioned = function (dragItem) {
		this.updateOrder();
		this.refreshLayout();
	};

	//start dragging item...
	QtiOrderInteraction.prototype.dragStart = function() {
		this.highlight(true);
	};

	//finished dragging item...
	QtiOrderInteraction.prototype.dragEnd = function() {
		this.highlight(false);
	};

	//highlight the sortable item in the orderinteraction...
	QtiOrderInteraction.prototype.highlight = function(show) {
		if (show) {
			classie.add(this.container, this.active );
		} else {
			classie.remove(this.container, this.active );
		}
	};

	//gets the order from the packery and then puts them in an array...
	QtiOrderInteraction.prototype.updateOrder = function(){
		var _this = this;
		_this.order = [];
		var itemElems = this.pckry.getItemElements();
		$( itemElems ).each( function( i, itemElem ) {
			var identifier = itemElem.getAttribute('data-identifier');
			if (identifier) _this.order.push( identifier );
		});
		this.saveResponse ( _this.order );
	};

	return QtiOrderInteraction;
})();

Polymer('qti-orderinteraction', QtiOrderInteraction.prototype);