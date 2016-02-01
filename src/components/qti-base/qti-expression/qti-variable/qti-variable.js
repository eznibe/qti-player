var QtiVariable = (function () {
    function QtiVariable() { }

    QtiVariable.prototype.calculate = function () {
        var identifier = this.getAttribute("identifier");
        var result = this.runtime.getVariableValue(identifier);
        return result;
    };

    return QtiVariable;
})();

Polymer('qti-variable', QtiVariable.prototype);