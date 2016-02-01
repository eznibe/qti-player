var QtiSimpleChoiceFreetownpane = (function () {
    function QtiSimpleChoiceFreetownpane() {}

    QtiSimpleChoiceFreetownpane.prototype.created = function(){
		this.super();
		this.mainClass = '';
    };

    return QtiSimpleChoiceFreetownpane;
})();

Polymer('qti-simplechoice-freetownpane', QtiSimpleChoiceFreetownpane.prototype);