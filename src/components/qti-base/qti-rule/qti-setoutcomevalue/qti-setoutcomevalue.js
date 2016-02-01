var QtiSetOutcomeValue = (function () {
    function QtiSetOutcomeValue() { }

    QtiSetOutcomeValue.prototype.process = function () {
        var identifier = this.getAttribute("identifier");
        var expression = this.firstElementChild;
        var value = expression.calculate();

        this.runtime.setOutcomeValue(identifier, value);
    };

    return QtiSetOutcomeValue;
})();

Polymer('qti-setoutcomevalue', QtiSetOutcomeValue.prototype);