var QtiResponseCondition = (function () {
    function QtiResponseCondition() { }

    QtiResponseCondition.prototype.process = function () {
        var branches = this.children;

        for (var i = 0; i < branches.length; i++) {
            var branch = branches[i];

            if (branch.calculate()) {
                branch.process();

                return;
            }
        }
    };

    return QtiResponseCondition;
})();

Polymer('qti-responsecondition', QtiResponseCondition.prototype);