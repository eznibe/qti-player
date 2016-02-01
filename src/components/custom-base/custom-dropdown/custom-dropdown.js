var CustomDropdown = (function () {
    function CustomDropdown() { }

    CustomDropdown.prototype.created = function(){
    	this.super();

		this.i18n = {
            defaultLabel: 'Select answer'
        };

        this.htmlClasses = {
            selectable: 'selectable',
            selectableInline: 'inline',
            dropdown: 'drop-down',
            focussed: 'focussed',
            selected: 'selected',
            icon: 'icon',
            dropDownArrow: 'drop-down-arrow'
        };
	};
	CustomDropdown.prototype.ready = function(){
        this.super();
        /* create the bindable properties here before the DOM ready */
        this.selectedText = this.i18n.defaultLabel;
        this.selectedValue = 0;

        this._originalEl = this.$.selectable;
        this._el = this.shadowRoot.querySelector('.' + this.htmlClasses.dropdown);
    };

    CustomDropdown.prototype.dropdownchange = function () {
        var response = '';
        if(this._originalEl.selectedIndex)
        {
            response = this.options[this._originalEl.selectedIndex-1].value;
            this._el.classList.add(this.htmlClasses.selected);
        }else{
            this._el.classList.remove(this.htmlClasses.selected);
        }
        this.fire(Events.DROPDOWN_SELECTED, response );
    };

    CustomDropdown.prototype.dropdownfocus = function () {
        this._el.classList.add(this.htmlClasses.focussed);
    };

    CustomDropdown.prototype.dropdownblur = function () {
        this._el.classList.remove(this.htmlClasses.focussed);
    };

    return CustomDropdown;
})();

Polymer('custom-dropdown', CustomDropdown.prototype);
