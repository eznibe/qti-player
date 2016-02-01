var QtiInteraction = (function () {
    function QtiInteraction() {}

    QtiInteraction.prototype.created = function () {
        this.super();
        this.addEventListener(Events.REGISTER_CHOICE, this.registerChoiceElement);
		this.responseIdentifier = this.getAttribute('responseIdentifier') || '';
		this.shuffle = (this.getAttribute('shuffle') === 'true');
		this.maxChoices = parseInt(this.getAttribute("maxChoices"));
        this.minChoices = parseInt(this.getAttribute("minChoices"));
		this.responses = [];
    };

    QtiInteraction.prototype.domReady = function () {
        this.super();
        this.fire(Events.REGISTER_INTERACTION, this);
        // listen to choice select event.
        this.addEventListener(Events.CHOICE_ELEMENT_SELECTED, this.choiceElementSelected );
    };
    
    QtiInteraction.prototype.detached = function () {
        this.super();
        this.removeEventListener(Events.CHOICE_ELEMENT_SELECTED, this.choiceElementSelected );
        this.removeEventListener(Events.REGISTER_CHOICE, this.registerChoiceElement);
    };
    
    QtiInteraction.prototype.registerChoiceElement = function ( e ) {
        e.stopPropagation();
        if (!this.choiceElements) this.choiceElements = [];
        this.choiceElements.push(e.detail);
        this.shuffleOptions();
    };
    
    QtiInteraction.prototype.validate = function () {
        var result = true;
        if( !isNaN(this.minChoices) ) {
            var currChoices = 0;
            for(var s = 0; s < this.choiceElements.length; s++) {
                if(this.choiceElements[s].getAttribute("selected") === "true" ) currChoices++;
            }
            if(currChoices < this.minChoices) result = false;
        }
        //this needs to return a value true or false.
        return result;
    };
    
    QtiInteraction.prototype.setDisabled = function (value) {
        this.super(arguments);
        if(this.choiceElements) {
            //set all choice elements registered to disabled.
            for(var c = 0; c < this.choiceElements.length; c++) {
                this.choiceElements[c].setDisabled(value);
            }
        }
    }
    
    QtiInteraction.prototype.setStatus = function (status) {
        this.super();
        this.interaction_status = status;
        if(this.choiceElements) {
            //tell my choice elements that the feedback is showing.
            for ( var c = 0; c < this.choiceElements.length; c++ ) {
                this.choiceElements[c].setStatus(status);
            }
        }
    };

    QtiInteraction.prototype.choiceElementSelected = function ( event ) {
        event.stopPropagation();
        //get the selectedIdentifiers....
        var selectedIdentifiers = [];
        for ( var i=0;i<this.choiceElements.length;i++ ) {
            if ( this.choiceElements[i].getAttribute("selected") === "true" ) {
                selectedIdentifiers.push(this.choiceElements[i].getAttribute("identifier") || '');
            }
        };

        // check if there is a max choices limitation
        if ( this.maxChoices != 0 ) {
            // check if choices selected reached maxChoices.
            if ( this.maxChoices === selectedIdentifiers.length  ) {
                for ( var i = 0; i < this.choiceElements.length; i++ ) {
                    if ( this.choiceElements[i].getAttribute("selected") === "true") {
                        // set disabled false if choice was selected
                        this.choiceElements[i].setdisabled(false);
                    } else {
                        // set disabled false if choice was not selected
                        this.choiceElements[i].setdisabled(true);
                    }
                }
            } else {
                // reset all disabled to be false
                for ( var i=0; i < this.choiceElements.length; i++ ) {
                    this.choiceElements[i].setdisabled(false);
                }
            }
        }
        
        this.saveResponse(selectedIdentifiers);
    };
    
    QtiInteraction.prototype.saveResponse = function (value) {
        this.fire(Events.SAVE_RESPONSE, {responses:value, responseIdentifier:this.getAttribute('responseIdentifier')});
    };

    QtiInteraction.prototype.shuffleOptions = function () {
		if (this.shuffle) {
			for (var s = 0; s < this.choiceElements.length; s++) {
				this.appendChild(this.choiceElements[Math.floor(Math.random() * this.choiceElements.length)]);
			}
		}
    };

    return QtiInteraction;
})();

Polymer('qti-interaction', QtiInteraction.prototype);