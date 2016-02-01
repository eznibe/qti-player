var CustomCheckboxAudio = (function () {
    function CustomCheckboxAudio() {}

    CustomCheckboxAudio.prototype.created = function(){
        this.super();
        this.mainClass = 'selectable';
    };

    // CustomCheckboxAudio.prototype.checkboxClicked = function ( event, detail, sender ) {
    //     this.toggleSelected();
    // };

    // CustomCheckboxAudio.prototype.toggleSelected = function () {
    //     this.selectedChoice = (this.selectedChoice) ? false : true;

    //     this.fire(Events.CHOICE_SELECTED, {
    //         name: this.identifier,
    //         elementName: this.nodeName
    //     });
    // };

    return CustomCheckboxAudio;
})();

Polymer('custom-checkbox-audio', CustomCheckboxAudio.prototype);