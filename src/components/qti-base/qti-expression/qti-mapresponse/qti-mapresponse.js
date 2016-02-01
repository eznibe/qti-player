var QtiMapResponse = (function () {
    function QtiMapResponse() { }

    QtiMapResponse.prototype.calculate = function () {
        var identifier = this.getAttribute("identifier");
        var response = this.runtime.getResponse(identifier);
        var mapping = response.mapping;
        var candidateResponse = response.candidateResponse;

        var result = 0;

        if (candidateResponse instanceof Array) {
            for (var i = 0; i < candidateResponse.length; i++) {
                // TODO: count distinct values only
                result += this.mapSingleValue(mapping, candidateResponse[i]);
            }

            return result;
        } else {
            result += this.mapSingleValue(mapping, candidateResponse);
        }
        
        console.log('result', result);

        return result;
    };

    QtiMapResponse.prototype.mapSingleValue = function (mapping, value) {
        var entries = mapping.entries;

        var result = 0;

        for (var i = 0; i < entries.length; i++) {
            var entry = entries[i];
            if (entry.key === value) {
                result += entry.value;
            }
        }

        return result;
    }

    return QtiMapResponse;
})();

Polymer('qti-mapresponse', QtiMapResponse.prototype);