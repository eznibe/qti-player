var DivCarousel = (function () {
	function DivCarousel() {}

	 DivCarousel.prototype.created = function(){
		this.super();
		this.orientation = 'horizontal';

		this.i18n = {
			prev: 'Previous question',
			next: 'Next question',
			navItem: 'Slide: '
		};

		this.htmlClasses = {
			root: 'carousel',
			ready: 'ready',

			// Carousel items (individual slides)
			item: 'item',
			itemReady: 'ready', //new css class.......
			itemCurrent: 'current',
			itemPrev: 'prev',
			itemNext: 'next',

			// Nav UI
			button: 'button',
			buttonActive: 'active',
			prevButton: 'prev',
			nextButton: 'next',
			navListContainer: 'list-container',
			navList: 'list',
			navListItem: 'list-item',
			navItem: 'nav-item'
		};

		this.elementNames = {
			carouselitem: 'div-carouselitem'
		};
	};

	DivCarousel.prototype.domReady = function(){
		this.super();
		this._el = this.$.carousel;
		this._items = this.querySelectorAll(this.elementNames.carouselitem);
		this._currentItemIndex = 0;
		this.navLinks = [];
		for (var i = 0; i < this._items.length; i++) {
			this.navLinks.push({id:1, index: i, htmlClasses: this.htmlClasses, i18n: this.i18n });
		}

		this._nav = null;
		this._navItems = null;
		this._navPrev = null;
		this._navNext = null;
		this._populateNav();
		this.setCurrentItem(this._currentItemIndex);
		this._el.classList.add(this.htmlClasses.ready);
	};

	/* bespoke carousel functionality */
	DivCarousel.prototype.setCurrentItem = function (index) {
		if (index < 0 || index >= this._items.length) { return; }

		for (var i = 0; i < this._items.length; i++) {
			var item = this._items[i];

			item.classList.add(this.htmlClasses.itemReady);

			 // If item is new previous, add class, otherwise remove
			if(i < index) {
				item.classList.add(this.htmlClasses.itemPrev);
			}else{
				item.classList.remove(this.htmlClasses.itemPrev);
			}
			// New current
			if(i === index){
				item.classList.add(this.htmlClasses.itemCurrent);
			}else{
				item.classList.remove(this.htmlClasses.itemCurrent);
			}
			// New next
			if(i > index){
				item.classList.add(this.htmlClasses.itemNext);
			}else{
				item.classList.remove(this.htmlClasses.itemNext);
			}
			// Kill keyboard focusability for non-current-slide inputs
			//item.querySelector('input').attr('tabindex', (i === index) ? 0 : -1); //item.find('input').attr('tabindex', (i === index) ? 0 : -1);
		}

		this._currentItemIndex = index;
		this._updateNav();
	};

	DivCarousel.prototype._updateNav = function () {
		var currentIndex = this._currentItemIndex;

		for (var n = 0; n < this.navLinks.length; n++) {
			this.navLinks[n].selected = (n === currentIndex) ? true : false;
		}

		if(currentIndex > 0){
			this._navPrev.classList.add(this.htmlClasses.buttonActive);
		}else{
			this._navPrev.classList.remove(this.htmlClasses.buttonActive);
		}
		if(currentIndex < this._items.length - 1){
			this._navNext.classList.add(this.htmlClasses.buttonActive);
		}else{
			this._navNext.classList.remove(this.htmlClasses.buttonActive);
		}
	};

	DivCarousel.prototype._populateNav = function () {
		this._nav = this.shadowRoot.querySelector('nav');
		this._navItems = this._nav.querySelectorAll('input');
		this._navPrev = this._nav.querySelector('.' + this.htmlClasses.prevButton);
		this._navNext = this._nav.querySelector('.' + this.htmlClasses.nextButton);
	};

	DivCarousel.prototype.previous = function () {
		this.setCurrentItem(this._currentItemIndex - 1);
	};

	DivCarousel.prototype.next = function () {
		this.setCurrentItem(this._currentItemIndex + 1);
	};

	DivCarousel.prototype.prevClick = function () {
		this.previous();
	};

	DivCarousel.prototype.nextClick = function () {
		this.next();
	};

	DivCarousel.prototype.navChanged = function(event, detail, sender) {
		var choiceIndex = Number(event.currentTarget.value);
		this.setCurrentItem(choiceIndex);
	};

	return DivCarousel;
})();

Polymer('div-carousel', DivCarousel.prototype);