var QtiResponseProcessing = (function () {
    function QtiResponseProcessing() { }

    QtiResponseProcessing.prototype.process = function () {
        var rules = this.children;

        for (var i = 0; i < rules.length; i++) {
            var rule = rules[i];

            rule.process();
        }
    }

    return QtiResponseProcessing;
})();

Polymer('qti-responseprocessing', QtiResponseProcessing.prototype);