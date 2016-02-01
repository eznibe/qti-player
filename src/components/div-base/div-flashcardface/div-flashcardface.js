var DivFlashcardFace = (function () {
    function DivFlashcardFace() {}

    DivFlashcardFace.prototype.created = function(){
		this.super();
		this.mainClass = 'face';
    };

    DivFlashcardFace.prototype.domReady = function(){
		this.super();
		this._el = this.shadowRoot.querySelector('.'+this.mainClass);
	};


	DivFlashcardFace.prototype.turnCard = function(e){
		e.preventDefault();
		this.fire("flipTheCard");
	};



    return DivFlashcardFace;
})();

Polymer('div-flashcardface', DivFlashcardFace.prototype);



