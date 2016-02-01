var DragAndDropManager = (function (element) {

    function DragAndDropManager(element, dragElements, dropElements, maxDrops, maxDrags, callBackFnc) {
		this.element = element;
		var dragAndDropManager = this;

		var htmlClasses = {
			DROP_ZONE: 'drop-zone',
			DRAGGABLE: 'draggable'
		};
		var htmlModifiers = {
			DROPPED: 'dropped',
			DRAGOVER:'drag-over',
			DRAGGING:'dragging',
			ACTIVE: 'active',
			GHOST: 'ghost',
			CLONE: 'clone',
			RETURNING: 'returning'
		};

		this.results = [];

		this.droppables = [];
		for(var d = 0; d < dropElements.length; d++)
		{
			var dropElement = dropElements[d];
			this.droppables.push( new Droppable( dropElement, {
				id: d,
				enabled: true,
				maxDrops: maxDrops[d], //max number of items dropZone can hold.
				hitThreshold: 50,
				className: htmlClasses.DROP_ZONE, //classname for dropZone
				modifiers: htmlModifiers, //array of modifier strings
				draggables: [], //draggable items (id's only) this contains.....
				prevDropCount: 0,
				onPut : function( instance, draggableInstance ) {
					var el = instance.el;
					el.appendChild(draggableInstance.comp);
					el.style.minWidth = 0;
				}
			}));
		};

		this.available = [];
		this.draggables = [];
		for(var d = 0; d < dragElements.length; d++)
		{
			var dragElement = dragElements[d];
			var cloneDraggable = (maxDrags[d] > 1) ? true : false ;
			this.draggables.push( new Draggable( dragElement, this.droppables, {
				id: d,
				draggabilly : {  },
				animateReturn : true,
				ghost : true,
				clone: cloneDraggable,
				className: htmlClasses.DRAGGABLE,
				modifiers: htmlModifiers,
				maxDrags : maxDrags[d],
				availableDrags: maxDrags[d],
				dragged: false,
				onStart : function(instance) { },
				onDrag: function( instance ) { },
				onEnd : function( instance ) {
					checkAvailableDrags(instance);
					// Isaac: Need to send the element back to the call back for the scope.
					updateCallback(instance, element);
				},
				onReturned : function( instance ) { }
			}));
		};

		function updateCallback(instance, element)
		{
			if(instance.dropZone || instance.prevDropZone)
			{
				if(instance.dropZone && instance.dropSuccess)
				{

					// remove margin to space up gaptextElement
					classie.add(instance.el, 'erase-margin');
					//if moving remove the old match
					if(instance.prevDropZone)
					{
						removeFromResult(dragAndDropManager.draggables[instance.options.id].comp, dragAndDropManager.droppables[instance.prevDropZone.options.id].comp);
					}
					//add new Match to the results
					dragAndDropManager.results.push({drag:dragAndDropManager.draggables[instance.options.id].comp, drop:dragAndDropManager.droppables[instance.dropZone.options.id].comp});
				}else{

					// add margin to space up gaptextElement
					classie.remove(instance.el, 'erase-margin');
					//remove Match from the results
					removeFromResult(dragAndDropManager.draggables[instance.options.id].comp, dragAndDropManager.droppables[instance.prevDropZone.options.id].comp);
					instance.prevDropZone = null;
				}
				//pass the results to the callback function.
				// Isaac: Need to send the element back to the call back for the scope.
				callBackFnc(dragAndDropManager.results, element);
			}
		}

		function removeFromResult(drag, drop){
			var currResult;
			for(var r = 0; r < dragAndDropManager.results.length; r++)
			{
				currResult = dragAndDropManager.results[r];
				if(currResult.drag === drag && currResult.drop === drop)
				{
					dragAndDropManager.results.splice(r,1);
				}
			}
		}

		function swapCloneWithOriginal(originalElement){
			var newClone = originalElement.createClone(); //create a new clone
			newClone.dropZone = originalElement.dropZone; //store the dropZone
			newClone.dropZone.dropCount--; //make sure the dropZone allows another drop.
			newClone.dragged = true; //set as dragged.
			var dropped = newClone.dropZone.put(newClone); //put clone in the dropZone
			originalElement.resetPosition(false); //reset the position of the original.
			originalElement.dragged = false; //set as not dragged.
			return newClone;
		}


		function checkAvailableDrags(dragElement)
		{
			var clone; //the clone element (only exisits if dragElement is a clone)
			var origDragElement = dragElement; //the main element (not a clone!!!!!)
			var hit = dragElement.dropZone; //get the dropzone of the original element (including clones!!!)

			//if this is a cloned element we need to get the original element.
			if(dragElement.isClone)
			{
				clone = dragElement;
				origDragElement = dragAndDropManager.draggables[clone.options.id];
			}

			//drag element hit a dropzone.
			if(hit && dragElement.dropSuccess) {
				if(!dragElement.dragged) origDragElement.options.availableDrags--;
				dragElement.dragged = true;
			}else {
				if(dragElement.dragged) origDragElement.options.availableDrags++;
				dragElement.dragged = false;
			}

			//if I have removed a clone from a dropzone and original is in a dropzone.
			if(dragElement.isClone && origDragElement.dropZone && origDragElement.options.availableDrags > 0)
			{
				//after a 0.5s delay (same as the transition in the css..)
				var interval = setInterval(function(){
					//after animation has completed swap the clone with the original.
					swapCloneWithOriginal(origDragElement);
					//stop the interval
					clearInterval(interval);
				}, 500);

			}
			//Can I drag more after this?
			origDragElement.options.clone = (origDragElement.options.availableDrags > 1) ? true : false ;
		}

    }

    return DragAndDropManager;
})();



( function() {

	/***************/
	/** Helpers **/
	/***************/

	function extend( a, b ) {
		for( var key in b ) {
			if( b.hasOwnProperty( key ) ) {
				a[key] = b[key];
			}
		}
		return a;
	}

	//used to throttle mousemove events so we don't hit test too frequently
	function throttle(fn, threshhold, scope) {
		threshhold || (threshhold = 100);
		var last, deferTimer;

		return function () {
			var context = scope || this;
			var now = +new Date,
			args = arguments;
			if (last && now < last + threshhold) {
				// hold on to it
				clearTimeout(deferTimer);
				deferTimer = setTimeout(function () {
					last = now;
					fn.apply(context, args);
				}, threshhold);
			} else {
				last = now;
				fn.apply(context, args);
			}
		};
	}

	//helper to get the scroll position
	function scrollX() { return window.pageXOffset || document.body.scrollLeft; }
	function scrollY() { return window.pageYOffset || document.body.scrollTop; }

	// gets the offset of an element relative to the document
	function getOffset( el ) {
		var offset = el.getBoundingClientRect();
		return {
			top : offset.top + scrollY(),
			left : offset.left + scrollX(),
			width: offset.width,
			height: offset.height
		};
	}

	/***************/
	/** Droppable **/
	/***************/

	function Droppable( droppableEl, options ) {
		this.el = droppableEl.shadowRoot.querySelector('.'+options.className);
		this.comp = droppableEl;
		this.dropCount = 0;
		this.options = extend( {}, this.options );
		extend( this.options, options );
		this.hitThresholdNumber = 100/this.options.hitThreshold;
	}

	Droppable.prototype.options = {
		maxDrops: 0,
		hitThreshold: 50,
		onPut : function(instance, draggableInstance) { return false; },
		onRemove : function(instance, draggableInstance) { return false; }
	};

	//check if the draggable element intersects the drop element
	Droppable.prototype.isDroppable = function( draggableEl ) {

		var isDroppable;

		var offset1 = getOffset( draggableEl ), width1 = draggableEl.offsetWidth, height1 = draggableEl.offsetHeight,
			offset2 = getOffset( this.el ), width2 = this.el.offsetWidth, height2 = this.el.offsetHeight;

		isDroppable = !(offset2.left > offset1.left + width1 - width1/this.hitThresholdNumber ||
				offset2.left + width2 < offset1.left + width1/this.hitThresholdNumber ||
				offset2.top > offset1.top + height1 - height1/this.hitThresholdNumber ||
				offset2.top + height2 < offset1.top + height1/this.hitThresholdNumber );

		this.indicateState(isDroppable, width1);

		return isDroppable;
	};

	Droppable.prototype.put = function( draggableInstance ) {
		if (!this.options.maxDrops || this.dropCount < this.options.maxDrops) {
			this.dropCount++;

			if(!this.el.classList.contains('well')){
			    classie.add(this.el, 'dropped');
			}
			if (this.dropCount === this.options.maxDrops) {
			    classie.add(this.el, 'full');
			}

			this.options.onPut( this, draggableInstance );
			return true;
		}
		return false;
	};

	Droppable.prototype.remove = function( draggableInstance ) {
		if (this.dropCount > 0) {
			this.dropCount--;
			classie.remove(this.el, 'full');
			if (this.dropCount === 0) {
			    this.el.classList.remove(this.options.modifiers.DROPPED);
				if (this.el.style.removeProperty) {
					this.el.style.removeProperty('min-width');
				} else {
					this.el.style.removeAttribute('min-width');
				}
			}
			this.options.onRemove( this, draggableInstance );
		}
	};

	Droppable.prototype.indicateState = function( isDroppable, width ) {
		if (isDroppable && this.dropCount < this.options.maxDrops) {
			classie.add( this.el, this.options.modifiers.DRAGOVER );
			this.el.style.minWidth = width + 'px';
		} else {
			if(classie.has( this.el, this.options.modifiers.DRAGOVER )){
				classie.remove( this.el, this.options.modifiers.DRAGOVER );
				if (this.el.style.removeProperty) {
					this.el.style.removeProperty('min-width');
				} else {
					this.el.style.removeAttribute('min-width');
				}
			}
		}
	};


	/***************/
	/** Draggable **/
	/***************/

	function Draggable( draggableEl, droppables, options ) {
		this.el = draggableEl.shadowRoot.querySelector('.' + options.className);
		this.comp = draggableEl;
		this.options = extend( {}, this.options );
		extend( this.options, options );
		this.droppables = droppables;
		this.draggie = new Draggabilly( this.el, this.options.draggabilly );
		this.initEvents();
	}

	Draggable.prototype.options = {
		draggabilly : {},
		// if the item should animate back to its original position
		animateReturn : true,
		clone : false,
		ghost: true,
		onStart : function() { return false; },
		onDrag : function() { return false; },
		onEnd : function() { return false; },
		onReturned : function() { return false; }
	};

	Draggable.prototype.initEvents = function() {
		this.draggie.on( 'dragStart', this.onDragStart.bind(this) );
		this.draggie.on( 'dragMove', throttle( this.onDragMove.bind(this), 5 ) );
		this.draggie.on( 'dragEnd', this.onDragEnd.bind(this) );
	};

	Draggable.prototype.onDragStart = function( instance, event, pointer ) {
		if(this.dropZone) this.prevDropZone = this.dropZone;
		// save original state
		if (!this.dropZone) {
			var clientRect = getOffset(this.el);
			this.originalState = {
				windowOffsetTop: clientRect.top + window.pageYOffset,
				windowOffsetLeft: clientRect.left,
				offsetLeft: this.el.offsetLeft,
				offsetTop: this.el.offsetTop,
				width: clientRect.width,
				height: clientRect.height,
				style: {
					position: this.el.style.position,
					top: this.el.style.top,
					left: this.el.style.left
				},
				container: this.comp.parentNode,
				sibling: this.comp.nextSibling
			};
		}

		// create ghost element
		if (!this.dropZone && this.options.ghost) {
			this.createGhost();
		}

		//if dropped
		if (this.dropZone) {
			this.dropZone.remove(this);
			this.dropZone = null;
		}

		// move element to body so we can drag across overflow:hidden containers
		this.moveToBody();
		// add class is-active to the draggable element (control the draggable z-index)
		classie.add( instance.element, this.options.modifiers.DRAGGING );

		//highlight droppables
		this.highlightDroppables(true);

		//callback
		this.options.onStart(this);
	};

	Draggable.prototype.onDragMove = function( instance, event, pointer ) {
		// check droppable elements if draggable intersects
		this.checkDroppables();

		//callback
		this.options.onDrag(this);
	};

	//on start drag - (not dragged) remove 1 available drags
	//on start drag - (already dragged) do nothine
	//on end drag - (hit)
	//on end drag - (no hit)

	Draggable.prototype.onDragEnd = function( instance, event, pointer ) {
		var clone;

		// if the draggable has a dropzone then drop the item
		if (this.dropZone) {
			if (this.options.clone) {
				clone = this.createClone();
			}
			var dropped = this.dropZone.put(clone || this);
			if(clone) {
				clone.dropSuccess = dropped;
			}else{
				this.dropSuccess = dropped;
			}
			classie.remove( this.dropZone.el, 'drag-over' );
			if (this.options.clone || !dropped) {
				this.resetPosition(!this.options.clone);
			} else {
				this.resetStyles(true);
			}

		} else {
			this.resetPosition(this.options.animateReturn);

		}

		//remove highlight of droppables
		this.highlightDroppables(false);

		this.options.onEnd(clone || this );
	};

	Draggable.prototype.checkDroppables = function() {
		this.dropZone = null;
		for( var i = 0, len = this.droppables.length; i < len; ++i ) {
			if (this.droppables[i].isDroppable(this.el)) {
				this.dropZone = this.droppables[i];
			}
		}
	};

	Draggable.prototype.highlightDroppables = function(highlight) {
		for( var i = 0, len = this.droppables.length; i < len; ++i ) {
			var droppable = this.droppables[i];
			if (highlight) {
				if (droppable.options.maxDrops > 0 && droppable.dropCount < droppable.options.maxDrops) {
					classie.add(droppable.el, droppable.options.modifiers.ACTIVE);
				}
			} else {
				classie.remove(droppable.el, droppable.options.modifiers.ACTIVE);
			}
		}
	};

	Draggable.prototype.createGhost = function() {
		this.ghost = this.comp.cloneNode(true);
		this.innerGhost = this.ghost.shadowRoot.querySelector('.' + this.options.className);
		this.innerContent = this.ghost.shadowRoot.querySelector('content');
		this.innerGhost.style.position = this.originalState.style.position;
		this.innerGhost.style.top = this.originalState.style.top;
		this.innerGhost.style.left = this.originalState.style.left;
		this.innerGhost.className = this.options.className + ' ' + this.options.modifiers.GHOST;
		this.innerGhost.style.height = this.originalState.height + 'px';
		this.originalState.container.insertBefore(this.ghost, this.originalState.sibling);
	};

	Draggable.prototype.destroyGhost = function() {
		if (this.ghost) {
			this.originalState.container.removeChild(this.ghost);
		}
	};

	Draggable.prototype.createClone = function() {
		var cloneElement = this.comp.cloneNode(true);
		var cloneOptions = extend({}, this.options);
		cloneOptions.clone = false;
		cloneOptions.ghost = false;
		classie.add(cloneElement, this.options.modifiers.CLONE);

		var clone = new Draggable(cloneElement, this.droppables, cloneOptions);
		clone.dropZone = this.dropZone;
		clone.originalState = this.originalState;
		clone.el.removeAttribute('style');
		clone.comp.removeAttribute('style');
		classie.remove(clone.el, this.options.modifiers.DRAGGING);
		clone.isClone = true;
		clone.originalObject = this;
		return clone;
	};

	Draggable.prototype.moveToBody = function() {
		// var offset = getOffset(this.el);
		// var el = this.draggie.element;
		// document.body.appendChild(el);
		//el.style.position = 'absolute';
		//el.style.top = offset.top +'px';
		//el.style.left = offset.left +'px';

		var comp_element = this.comp;
		var el_inner = comp_element.shadowRoot.querySelector('.' + this.options.className);
		var offset = getOffset(el_inner);
		document.body.appendChild(comp_element);
		comp_element.style.position = 'absolute';
		comp_element.style.top = '0px';
		comp_element.style.left = '0px';
		comp_element.style.zIndex = 1000;
		el_inner.style.position = 'absolute';
		el_inner.style.top = offset.top +'px';
		el_inner.style.left = offset.left +'px';
	};

	Draggable.prototype.resetStyles = function(hardReset) {
		this.comp.removeAttribute('style');

		this.el.style.position = this.originalState.style.position;
		this.el.style.top = this.originalState.style.top;
		this.el.style.left = this.originalState.style.left;

		if (hardReset) {
			this.el.removeAttribute('style');
		}
		classie.remove(this.el, this.options.modifiers.DRAGGING);
		classie.remove(this.el, this.options.modifiers.RETURNING);
	};

	Draggable.prototype.resetPosition = function(animate) {
		var _this = this;

		if (animate) {
			classie.add( this.el, this.options.modifiers.RETURNING);
		}

		// set original left/top
		this.el.style.left = this.originalState.windowOffsetLeft + 'px';
		this.el.style.top = this.originalState.windowOffsetTop + 'px';

		// insert element into its original position
		var callbackFn = function() {
			_this.originalState.container.insertBefore(_this.comp, _this.originalState.sibling);
			//_this.originalState.container.insertBefore(_this.el, _this.originalState.sibling);
			_this.destroyGhost();
			_this.dropZone = null;
			_this.resetStyles();
			_this.options.onReturned(_this );
			if (_this.isClone) {
				// _this.el.remove();
				_this.comp.remove();
			}
		};

		if( animate ) {
			transitionEnd(_this.el).bind(function() {
				callbackFn();
				transitionEnd(_this.el).unbind();
			});
		}
		else {
			callbackFn();
		}
	};

	Draggable.prototype.disable = function() {
		this.draggie.disable();
	};

	Draggable.prototype.enable = function() {
		this.draggie.enable();
	};

	window.Droppable = Droppable;
	window.Draggable = Draggable;
})();