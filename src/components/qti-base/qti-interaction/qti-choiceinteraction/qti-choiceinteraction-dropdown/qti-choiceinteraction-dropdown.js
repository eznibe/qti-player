var QtiChoiceInteractionDropdown = (function () {
	function QtiChoiceInteractionDropdown() { }

	QtiChoiceInteractionDropdown.prototype.created = function(){
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
			dropDownArrow: 'drop-down-arrow',
			icon: 'icon'
		};

		this.addEventListener(Events.DROPDOWN_SELECTED, this.choiceSelected);

		// Hard coded
		this.interaction_status = '';

		this.options = [];
		var choices = this.querySelectorAll("qti-simplechoice");

		for (var i = 0; i < choices.length; i++) {
			this.options.push({textContent: choices[i].innerHTML, value: choices[i].getAttribute('identifier'), htmlClasses: this.htmlClasses});
		}
	};

	QtiChoiceInteractionDropdown.prototype.choiceSelected = function(event){
		event.stopPropagation();
		this.saveResponse(event.detail);
	};

	return QtiChoiceInteractionDropdown;
})();

Polymer('qti-choiceinteraction-dropdown', QtiChoiceInteractionDropdown.prototype);