var DivStyledBoxTimed = (function () {
	function DivStyledBoxTimed() {}

	DivStyledBoxTimed.prototype.created = function(){
		this.super();
		this.minutes = 0;
		this.seconds = 10;
		this.blur = 'body-blur';
		this.noSelect = 'body-no-select';
	};

	DivStyledBoxTimed.prototype.domReady = function(){
		this.super();
		this.startButton = this.shadowRoot.querySelector('.start-button');
		this.count1 = this.shadowRoot.querySelector('.count--1');
		this.count2 = this.shadowRoot.querySelector('.count--2');
		this.count3 = this.shadowRoot.querySelector('.count--3');
		this.styledBoxBody = this.shadowRoot.querySelector('.body');
		this.footer = this.shadowRoot.querySelector('.footer');
		this.timerInner = this.footer.querySelector('.timer__inner');
		this.time = this.footer.querySelector('.time');
		this.timesUp = this.shadowRoot.querySelector('.times-up');
		this.timeString = '';
		if (this.minutes >= 1) {
			this.timeString = this.minutes+':'+this.seconds;
		} else {
			this.timeString = this.seconds+' secs';
		}
		this.styledBoxBody.classList.add(this.noSelect);
		this.startButton.classList.add('show');
	};

	DivStyledBoxTimed.prototype.startClicked = function(){
		var _this = this;
		setTimeout(function() {
			_this.startButton.classList.remove('show');
		}, 500);
		setTimeout(function() {
			_this.startButton.classList.add('hide');
			_this.count3.classList.add('show');
			_this.startButton.classList.add('hide');
		}, 1000);
		setTimeout(function() {
			_this.count3.classList.add('bounce');
		}, 1100);
		setTimeout(function() {
			_this.count3.classList.remove('bounce');
		}, 1250);
		setTimeout(function() {
			_this.count3.classList.remove('show');
		}, 1700);
		setTimeout(function() {
			_this.count2.classList.add('show');
		}, 2000);
		setTimeout(function() {
			_this.count2.classList.add('bounce');
		}, 2100);
		setTimeout(function() {
			_this.count2.classList.remove('bounce');
		}, 2250);
		setTimeout(function() {
			_this.count2.classList.remove('show');
		}, 2700);
		setTimeout(function() {
			_this.count1.classList.add('show');
		}, 3000);
		setTimeout(function() {
			_this.count1.classList.add('bounce');
		}, 3100);
		setTimeout(function() {
			_this.count1.classList.remove('bounce');
		}, 3250);
		setTimeout(function() {
			_this.count3.classList.remove('show');
			_this.count1.classList.remove('show');
			_this.styledBoxBody.classList.remove(_this.blur);
			_this.styledBoxBody.classList.remove(_this.noSelect);
			_this.startTimer();
		}, 3700);
	};

	DivStyledBoxTimed.prototype.startTimer = function() {
		this.timerInner.classList.add('animate-'+this.seconds);
		var _this = this;
		var interv = setInterval(function(){
			_this.timeString = '';
			_this.seconds -= 1;
			if (_this.seconds.toString().length == 1) {
				_this.seconds = "0"+_this.seconds.toString();
			}
			if (_this.minutes == 0 && _this.seconds == 0) {
				_this.timeString = "00 secs";
				_this.styledBoxBody.classList.add(_this.blur);
				_this.styledBoxBody.classList.add(_this.noSelect);
				_this.timesUp.classList.add('show');
				clearInterval(interv);
			} else {
				if (this.minutes >= 1) {
					_this.timeString = _this.minutes+':'+_this.seconds;
				} else {
					_this.timeString = _this.seconds+' secs';
				}
			}
			if (_this.seconds == 0) {
				_this.seconds = 60;
				_this.minutes -= 1;
			}
		}, 1000);
	};

	return DivStyledBoxTimed;
})();

Polymer('div-styledbox-timed', DivStyledBoxTimed.prototype);