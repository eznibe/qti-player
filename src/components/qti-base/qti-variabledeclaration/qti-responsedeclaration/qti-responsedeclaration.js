var QtiResponseDeclaration = (function () {
    function QtiResponseDeclaration() { }

    QtiResponseDeclaration.prototype.domReady = function () {
        this.super();

        var identifier = this.getAttribute("identifier");

        var responseVariable = new ResponseVariable();
        responseVariable.identifier = identifier;
        this.setCorrectResponse(responseVariable);
        this.setMapping(responseVariable);
        
        responseVariable.cardinality = this.getAttribute('cardinality') || 'single';

        this.runtime.variables.push(responseVariable);
    };

    QtiResponseDeclaration.prototype.setCorrectResponse = function (responseVariable) {
        var correctResponse = this.querySelector("qti-correctresponse");
        if(correctResponse) {
            var values = correctResponse.querySelectorAll("qti-value");
            var result;

            //TODO: modify to use cardinality
            if (values.length === 1) {
                result = values[0].textContent;
                values[0].remove();
            } else {
                result = [];

                for (var i = 0; i < values.length; i++) {
                    result.push(values[i].textContent);
                    values[i].remove();
                }
            }
        }
        

        responseVariable.correctResponse = result;
    };

    QtiResponseDeclaration.prototype.setMapping = function (responseVariable) {
        var mapping = this.querySelector("qti-mapping");
        if (mapping) {
            responseVariable.mapping = new Mapping();

            var result = [];

            var entries = mapping.querySelectorAll("qti-mapentry");
            for (var i = 0; i < entries.length; i++) {
                var entryElement = entries[i];
                var key = entryElement.getAttribute("mapkey");
                var value = entryElement.getAttribute("mappedvalue");

                var entry = new MapEntry();
                entry.key = key;
                entry.value = parseFloat(value);

                responseVariable.mapping.entries.push(entry)
            }
        }
    };

    return QtiResponseDeclaration;
})();

Polymer('qti-responsedeclaration', QtiResponseDeclaration.prototype);