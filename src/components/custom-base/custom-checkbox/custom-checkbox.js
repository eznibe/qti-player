var CustomCheckbox = (function () {
    function CustomCheckbox() {}

    CustomCheckbox.prototype.created = function(){
        this.super();
    };

    CustomCheckbox.prototype.checkboxClicked = function ( event, detail, sender ) {
        this.toggleSelected();
    };

    CustomCheckbox.prototype.toggleSelected = function () {
        this.selectedChoice = (this.selectedChoice) ? false : true;

        this.fire(Events.CHOICE_SELECTED, {
            name: this.identifier,
            elementName: this.nodeName
        });
    };

    return CustomCheckbox;
})();

Polymer('custom-checkbox', CustomCheckbox.prototype);