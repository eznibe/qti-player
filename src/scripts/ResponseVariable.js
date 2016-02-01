var ResponseVariable = (function (_super) {
    __extends(ResponseVariable, _super);

    function ResponseVariable() {
        _super.apply(this, arguments);

        this.mapping = null;
        this.candidateResponse = null;
        this.correctResponse = null;
        this.cardinality = null;
    }
    
    ResponseVariable.prototype.setResponse = function (value) {
        if(value instanceof Array) {
            this.candidateResponse = (this.cardinality === 'single') ? value[0] : value ;
        } else {
            this.candidateResponse = value ;
        }
    };

    return ResponseVariable;
})(ItemVariable);