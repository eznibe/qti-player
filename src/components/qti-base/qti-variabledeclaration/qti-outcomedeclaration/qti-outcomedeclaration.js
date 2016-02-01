var QtiOutcomeDeclaration = (function () {
    function QtiOutcomeDeclaration() { }

    QtiOutcomeDeclaration.prototype.domReady = function () {
        this.super();

        var identifier = this.getAttribute("identifier");

        var outcomeVariable = new OutcomeVariable();
        outcomeVariable.identifier = identifier;
        
        this.runtime.variables.push(outcomeVariable);
    };

    return QtiOutcomeDeclaration;
})();

Polymer('qti-outcomedeclaration', QtiOutcomeDeclaration.prototype);