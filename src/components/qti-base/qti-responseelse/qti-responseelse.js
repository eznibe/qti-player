var QtiResponseElse = (function () {
    function QtiResponseElse() { }

    QtiResponseElse.prototype.calculate = function () {
        return true;
    };

    QtiResponseElse.prototype.getSubRules = function () {
        return this.children;
    };

    QtiResponseElse.prototype.process = function () {
        var subRules = this.getSubRules();

        for (var i = 0; i < subRules.length; i++) {
            var subRule = subRules[i];

            subRule.process();
        }
    };

    return QtiResponseElse;
})();

Polymer('qti-responseelse', QtiResponseElse.prototype);