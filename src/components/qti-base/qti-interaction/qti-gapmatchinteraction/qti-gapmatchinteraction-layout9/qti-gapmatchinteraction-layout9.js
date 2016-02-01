var QtiGapMatchInteraction9 = (function () {
    function QtiGapMatchInteraction9() { }

    QtiGapMatchInteraction9.prototype.created = function(){
		this.super();

		this.htmlClasses = {
			TRIGGER: 'drawer-trigger',
			DRAWER: 'drawer'
		};
	};

	QtiGapMatchInteraction9.prototype.domReady = function(){
		this.super();
		this.querySelectors();
		this.eventListeners();
		this.hideDrawer();
	};

	QtiGapMatchInteraction9.prototype.querySelectors = function () {
		this.trigger = this.shadowRoot.querySelector('.' + this.htmlClasses.TRIGGER);
		this.drawer = this.shadowRoot.querySelector('.' + this.htmlClasses.DRAWER);
		this.active = this.shadowRoot.querySelector('.' + this.htmlClasses.ACTIVE);
		this.open = this.shadowRoot.querySelector('.' + this.htmlClasses.OPEN);
	};

	QtiGapMatchInteraction9.prototype.eventListeners = function () {
		var _this = this;
		this.trigger.addEventListener('click', function(e) {
			if (this.classList.contains('active')) {
				this.classList.remove('active');
				_this.drawer.classList.add('open');
			} else {
				this.classList.add('active');
				_this.drawer.classList.remove('open');
			}
			e.preventDefault();
		});
	};

	QtiGapMatchInteraction9.prototype.hideDrawer = function () {
		var _this = this;
		this.trigger.classList.remove('active');
		this.drawer.classList.add('open');

		setTimeout(function() {
			_this.trigger.classList.add('active');
			_this.drawer.classList.remove('open');
		}, 2000);
	};
	
    return QtiGapMatchInteraction9;
})();

Polymer('qti-gapmatchinteraction-layout9', QtiGapMatchInteraction9.prototype);