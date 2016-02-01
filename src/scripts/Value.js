// TODO: This is inclomplete and unused

var Value = (function () {
    function Value() {
        this.baseType = null;
        this.cardinality = null;
    }
    
    Value.baseType = {
        "integer": "integer",
        "boolean": "boolean",
        "float": "float",
    };

    Value.cardinality = {
        single: "single",
        multiple: "multiple",
        ordered: "ordered",
        record: "record"
    };

    return Value;
})();

var SingleDirectedPair = (function (_super) {
    __extends(DirectedPair, _super);

    function DirectedPair() {
        this.baseType = Value.baseTypes.directedPair;
        this.cardinality = Value.cardinality.single;

        this.source = null;
        this.destination = null;
    }
    
    return DirectedPair;
})(Value);

var MultipleDirectedPair = (function (_super) {
    __extends(DirectedPair, _super);

    function DirectedPair() {
        this.baseType = Value.baseTypes.directedPair;
        this.cardinality = Value.cardinality.multiple;

    }
    
    return DirectedPair;
})(Value);
