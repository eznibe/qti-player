var QtiExpression = (function () {
    function QtiExpression() { }

    QtiExpression.prototype.calculate = function () {
        throw "Not implemented"
    };

    return QtiExpression;
})();

Polymer('qti-expression', QtiExpression.prototype);