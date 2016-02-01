var QtiCorrect = (function () {
    function QtiCorrect() { }

    QtiCorrect.prototype.calculate = function () {
        var identifier = this.getAttribute("identifier");
        var responseVariable = this.runtime.getResponse(identifier);
        var result = responseVariable.correctResponse;

        return result;
    };

    return QtiCorrect;
})();

Polymer('qti-correct', QtiCorrect.prototype);