var QtiMatch = (function () {
    function QtiMatch() { }

    QtiMatch.prototype.calculate = function () {
        var expression1 = this.firstElementChild;
        var value1 = expression1.calculate();
        var expression2 = this.lastElementChild;
        var value2 = expression2.calculate();

        //TODO: handle QTI type system

        var result;

        // Ordered cardinality values
        // TODO: implement spec properly (e.g. check for NULL, check for both)
        // TODO: handle multiple cardinality (as opposed to ordered) separately
        if ( value1 instanceof Array ) {
            var enumerable1 = Enumerable.from(value1);
            var enumerable2 = Enumerable.from(value2);
            
            result = enumerable1.sequenceEqual(enumerable2);
        }            
        else {
            // TODO: convert to strict equivalence
            result = value1 == value2;
        }

        return result;
    };

    return QtiMatch;
})();

Polymer('qti-match', QtiMatch.prototype);