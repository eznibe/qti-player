var DivQuizCard = (function () {
	function DivQuizCard() {}

	DivQuizCard.prototype.created = function(){
		this.super();

		this.htmlClasses = {
			CARD: 'quiz-card',
			CARD_END: 'last-card',
			CARD_LOSE: 'card-lose',
			CARD_NEXT: 'card-next',
			CARD_CURRENT: 'card-current',
			CARD_PREVIOUS: 'card-previous',
			CARD_ANIMATION: 'card-anim-out',
			TIMER: 'quiz-timer',
			TIMER_CIRCLE: 'circle',
			TIMER_NUMBER: 'number',
			TIMER_END: 'end',
			TIMER_CORRECT: 'correct',
			TIMER_INCORRECT: 'incorrect',
		};
	};

	DivQuizCard.prototype.domReady = function(){
		this.super();

		this.currentCard = this.shadowRoot.querySelector('.' + this.htmlClasses.CARD_CURRENT),
		this.nextCard = this.shadowRoot.querySelector('.' + this.htmlClasses.CARD_NEXT),
		this.timerText = this.shadowRoot.querySelector('.' + this.htmlClasses.TIMER_NUMBER),
		this.timerCircle = this.shadowRoot.querySelector('.' + this.htmlClasses.TIMER_CIRCLE);
		this.cardTimer();
	};

	DivQuizCard.prototype.cardTimer = function(){
		var _this = this;

		this.totalTime = 10;
		this.currentTime = this.totalTime,
		this.percentTime = null,
		this.sliceLength = null,
		this.timerId = null;
		this.timerText.textContent = this.totalTime;

		this.cardInterval = setInterval(function() {
			_this.percentTime = (_this.currentTime/_this.totalTime) * 100;
			_this.sliceLength = (1 / _this.totalTime) * 100;
			_this.timerCircle.style.strokeDashoffset = _this.percentTime - (100 + _this.sliceLength);
			_this.timerText.textContent = _this.currentTime;
			_this.currentTime -= 1;
			if (_this.currentTime <= -1) {
				clearInterval(_this.cardInterval);
				_this.timerCircle.style.strokeDashoffset = _this.percentTime - 100;
				_this.timerText.textContent = "Time's up";
				_this.timerText.className = _this.timerText.className + ' ' + _this.htmlClasses.TIMER_END;
				setTimeout(function() {
					// _this.cardFeedback();
				}, 1000);
			}
		}, 1000);
	};

	DivQuizCard.prototype.cardFeedback = function(){
		var _this = this;

		this.feedback = false;
		this.timerCircle.style.display = "none";
		this.timerText.textContent = '';
		if (this.feedback == true) {
			this.timerText.className = this.timerText.className + ' ' + this.htmlClasses.TIMER_CORRECT;
		} else {
			this.timerText.className = this.timerText.className + ' ' + this.htmlClasses.TIMER_INCORRECT;
		}
		function hasClass(element, cls) {
		    return (' ' + element.className + ' ').indexOf(' ' + cls + ' ') > -1;
		}

		// Handle feedback after 1 second
		// setTimeout(function() {
		// 	if (!hasClass(this.nextCard, this.htmlClasses.CARD_END)) {
		// 		_this.nextCard();
		// 	} else {
		// 		_this.lastCard();
		// 	}
		// }, 1000);
	};
	return DivQuizCard;
})();

Polymer('div-quiz-card', DivQuizCard.prototype);