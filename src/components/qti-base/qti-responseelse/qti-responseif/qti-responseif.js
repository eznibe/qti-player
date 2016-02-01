var QtiResponseIf = (function () {
    function QtiResponseIf() { }

    QtiResponseIf.prototype.calculate = function () {
        var expression = this.firstElementChild;
        var result = expression.calculate();

        return result;
    };

    QtiResponseIf.prototype.getSubRules = function () {
        var result = [];

        for (var i = 1; i < this.children.length; i++) {
            result.push(this.children[i]);
        }

        return result;
    };

    return QtiResponseIf;
})();

Polymer('qti-responseif', QtiResponseIf.prototype);