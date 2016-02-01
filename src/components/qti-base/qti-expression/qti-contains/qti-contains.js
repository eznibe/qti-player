var QtiContains = (function () {
    function QtiContains() { }

    QtiContains.prototype.calculate = function () {
        

        var expression1 = this.firstElementChild;
        var value1 = expression1.calculate();
        var expression2 = this.lastElementChild;
        var value2 = expression2.calculate();

        var query = "$.source + ' ' + $.destination";
        var enumerable1 = Enumerable.from(value1);
        var enumerable2 = Enumerable.from(value2);
        var projection1 = enumerable1.select(query);
        var projection2 = enumerable2.select(query);
        var enumerable3 = projection1.intersect(projection2);
        var result = enumerable3.any();

        return result;
    };

    return QtiContains;
})();

Polymer('qti-contains', QtiContains.prototype);