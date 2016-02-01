var QtiMultiple = (function () {
    function QtiMultiple() { }

    QtiMultiple.prototype.calculate = function () {
        var result = [];

 		for(var i = 0; i < this.children.length; i++) {
 			result.push(this.children[i].calculate());
 		}

 		return result;
    };

    return QtiMultiple;
})();

Polymer('qti-multiple', QtiMultiple.prototype);