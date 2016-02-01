var CustomInlineCheckbox = (function () {
    function CustomInlineCheckbox() {}

    CustomInlineCheckbox.prototype.created = function(){
        this.super();
        this.mainClass = 'selectable';
    };

    CustomInlineCheckbox.prototype.checkboxClicked = function ( event, detail, sender ) {
        this.toggleSelected();
    };

    CustomInlineCheckbox.prototype.toggleSelected = function () {
        this.selectedChoice = (this.selectedChoice) ? false : true;

        this.fire(Events.CHOICE_SELECTED, {
            name: this.identifier,
            elementName: this.nodeName
        });
    };

    return CustomInlineCheckbox;
})();

Polymer('custom-inlinecheckbox', CustomInlineCheckbox.prototype);