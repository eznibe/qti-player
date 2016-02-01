var QtiBase = (function () {
    function QtiBase() {}
    
    QtiBase.prototype.domReady = function () {
        this.super();
        this.runtime = document.querySelector('qti-assessmentitem');
    };

    return QtiBase;
})();

Polymer('qti-base', QtiBase.prototype);