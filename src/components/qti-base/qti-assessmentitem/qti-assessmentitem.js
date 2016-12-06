var QtiAssessmentItem = (function () {
    function QtiAssessmentItem() {}

    QtiAssessmentItem.prototype.created = function () {
        this.super();
        //set the properties
        this.title = this.getAttribute('title') || '';
        this.currentActivity = 1;
        this.totalActivities = 1;
        //listen for events.
        this.addEventListener(Events.REGISTER_FEEDBACK, this.registerFeedbackElement);
        this.addEventListener(Events.REGISTER_INTERACTION, this.registerInteractionElement);
        this.addEventListener(Events.REGISTER_STATUSELEMENT, this.registerStatusElement);
        this.addEventListener(Events.SUBMIT_RESPONSES, this.submitResponses);
        this.addEventListener(Events.SHOW_ANSWERS, this.showAnswers);
        this.addEventListener(Events.OUTCOME_CHANGED, this.outcomeChanged);
        this.addEventListener(Events.SAVE_RESPONSE, this.saveResponses);
    };

    QtiAssessmentItem.prototype.domReady = function () {
        this.variables = [];
    };

    QtiAssessmentItem.prototype.detached = function () {
        this.super();
        //remove events listeners.
        this.removeEventListener(Events.REGISTER_FEEDBACK, this.registerFeedbackElement);
        this.removeEventListener(Events.REGISTER_INTERACTION, this.registerInteractionElement);
        this.removeEventListener(Events.REGISTER_STATUSELEMENT, this.registerStatusElement);
        this.removeEventListener(Events.SUBMIT_RESPONSES, this.submitResponses);
        this.removeEventListener(Events.SHOW_ANSWERS, this.showAnswers);
        this.removeEventListener(Events.OUTCOME_CHANGED, this.outcomeChanged);
        this.removeEventListener(Events.SAVE_RESPONSE, this.saveResponses);
    }

    //a feedback element has fired an event to register.
    QtiAssessmentItem.prototype.registerFeedbackElement = function (e) {
        e.stopPropagation();
        if (!this.feedbackElements) this.feedbackElements = [];
        this.feedbackElements.push(e.detail);
    };

    //an interactive element has fired an event to register.
    QtiAssessmentItem.prototype.registerInteractionElement = function (e) {
        e.stopPropagation();
        if (!this.interactionElements) this.interactionElements = [];
        this.interactionElements.push(e.detail);
    };

    //an interactive element has fired an event to register.
    QtiAssessmentItem.prototype.registerStatusElement = function (e) {
        e.stopPropagation();
        if (!this.statusElements) this.statusElements = [];
        this.statusElements.push(e.detail);
    };


//QtiAssessmentItem.prototype.showAnswers = function (e) {
    //TO BE ADDED: SHOW ANSWERS - FOR EACH INTERACTION SHOW/HIGHLIGHT THE CORRECT ANSWERS.....
//};

    QtiAssessmentItem.prototype.updateStatusInteractions = function (value) {
        if(this.statusElements)
        {
            for(var e = 0; e < this.statusElements.length; e++)
            {
                this.statusElements[e].showStatus(value);
            }
        }
    }

    QtiAssessmentItem.prototype.submitResponses = function (e) {
        if( this.validateResponses() ) {
            //set the outcomes based on the responses.
            var responseProcessor = this.querySelector('qti-responseprocessing');
            if(responseProcessor) responseProcessor.process();

            var result  = this.variables.map(function(variable) {
              if (variable instanceof ResponseVariable) {
                return variable.candidateResponse;
              } else {
                return variable;
              }
            });
            console.log('Responses:',result);
            
            this.updateStatusInteractions('feedback');
            this.disableActivity(true);
        }
    };

    //check all interactions contain valid responses
    QtiAssessmentItem.prototype.validateResponses = function () {
        var result = true;
        if(this.interactionElements) {
            //loop through each interaction and call the validate method.
            for(var i = 0; i < this.interactionElements.length; i++) {
                //if interaction is not valid set the result to false.
                if( !this.interactionElements[i].validate() ) result = false;
            }
        }
        return result;
    };

    QtiAssessmentItem.prototype.disableActivity = function (value) {
        if(this.interactionElements) {
        //loop through each interaction and call the validate method.
            for(var i = 0; i < this.interactionElements.length; i++) {
                //disable all qti-interaction components.(the interactions will disable the choice elements).
                this.interactionElements[i].setDisabled(value);
            }
        }
    }

    //interaction has fired an event to save response.
    QtiAssessmentItem.prototype.saveResponses = function (event) {
        this.setResponseValue(event.detail.responseIdentifier, event.detail.responses);
    };

	//checks the attributes of all feedback elements and shows/hides as appropriate.
	QtiAssessmentItem.prototype.outcomeChanged = function (event) {
        if(this.feedbackElements)
        {
            var currFeedbackElement, e;
            //loop through each feedback element (all feedback elements have registred).
            for (e = 0; e < this.feedbackElements.length; e++) {
                this.feedbackElements[e].checkShowFeedback(event.detail.outcomeIdentifier, event.detail.value);
            }
        }
	};


    //Variable functions for getting and storing variables.
    QtiAssessmentItem.prototype.getVariable = function (identifier) {
        for (var i = 0; i < this.variables.length; i++) {
            var currentVariable = this.variables[i];

            if (currentVariable.identifier === identifier) {
                return currentVariable;
            }
        }
    };
    QtiAssessmentItem.prototype.getVariableValue = function (identifier) {
        var variable = this.getVariable(identifier);

        if (variable instanceof ResponseVariable) {
            return variable.candidateResponse;
        }
        if (variable instanceof OutcomeVariable) {
            return variable.value;
        }
    };
    QtiAssessmentItem.prototype.getOutcome = function (identifier) {
        var variable = this.getVariable(identifier);

        if (variable instanceof OutcomeVariable) {
            return variable;
        }
    };
    QtiAssessmentItem.prototype.getResponse = function (identifier) {
        var variable = this.getVariable(identifier);

        if (variable instanceof ResponseVariable) {
            return variable;
        }
    };
    QtiAssessmentItem.prototype.setOutcomeValue = function (identifier, value) {
        this.getOutcome(identifier).value = value;
        this.fire(Events.OUTCOME_CHANGED, {outcomeIdentifier:identifier, value:value});
    };
    QtiAssessmentItem.prototype.setResponseValue = function (identifier, value) {
        this.getResponse(identifier).setResponse(value);
    };

    return QtiAssessmentItem;
})();

Polymer('qti-assessmentitem', QtiAssessmentItem.prototype);
