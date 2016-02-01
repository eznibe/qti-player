var QtiBaseValue = (function () {
    function QtiBaseValue() { }

    QtiBaseValue.prototype.calculate = function () {
    	var result;

    	this.baseType = this.getAttribute("basetype");

		switch(this.baseType){
			case "directedPair":
				var pair = this.textContent.split(" ");

				result = {
					source: pair[0],
					destination: pair[1]
				};

				break;

			default:
		        result = this.textContent;
				break;
		}

        return result;
    };

    return QtiBaseValue;
})();

Polymer('qti-basevalue', QtiBaseValue.prototype);