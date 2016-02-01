var DivFlashcard = (function () {
    function DivFlashcard() {}

    DivFlashcard.prototype.created = function(){
		this.super();

		this.htmlClasses = {
			canvas: 'canvas',
			flip: 'flipped'
		};
    };

     DivFlashcard.prototype.domReady = function(){
		this.super();
		this._el = this.shadowRoot.querySelector('.'+this.htmlClasses.canvas);
		// create listeners fired by flashcardface
		this.addEventListener("flipTheCard", this.actionFlipCard)

	};

	DivFlashcard.prototype.actionFlipCard = function(){
		this._el.classList.toggle(this.htmlClasses.flip);
	};

    return DivFlashcard;
})();

Polymer('div-flashcard', DivFlashcard.prototype);
