var DivContainer = (function () {
    function DivContainer() {}

    DivContainer.prototype.created = function(){
      this.super();
    };

    return DivContainer;
})();

Polymer('div-container', DivContainer.prototype);