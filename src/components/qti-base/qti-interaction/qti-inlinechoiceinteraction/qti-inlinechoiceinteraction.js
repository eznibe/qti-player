var QtiInlineChoiceInteraction = (function () {
    function QtiInlineChoiceInteraction() { }

    QtiInlineChoiceInteraction.prototype.created = function(){
    	this.super();

		this.i18n = {
            defaultLabel: 'Select'
        };

        this.htmlClasses = {
            selectable: 'selectable',
            inline: 'selectable--inline',
            container: 'drop-down selectable-container',
            containerOpen: 'drop-down--open',
            dropper: 'drop-down__dropper',
            dropperText: 'drop-down__dropper__text',
            items: 'drop-down__items',
            item: 'drop-down__item',
            focussed: 'focussed',
            selected: 'selected',
            hide: 'visually-hidden',
            dropContainer: 'container',
            icon: 'icon'
        };

        this.addEventListener(Events.DROPDOWN_SELECTED, this.choiceSelected);

        this.options = [];
        var choices = this.querySelectorAll("qti-inlinechoice");
        for (var i = 0; i < choices.length; i++) {
            this.options.push({textContent: choices[i].innerHTML, value: choices[i].getAttribute('identifier'), htmlClasses: this.htmlClasses});
        }
	};

    QtiInlineChoiceInteraction.prototype.choiceSelected = function(event){
        event.stopPropagation();
        this.saveResponse(event.detail);
    };

    return QtiInlineChoiceInteraction;
})();

Polymer('qti-inlinechoiceinteraction', QtiInlineChoiceInteraction.prototype);