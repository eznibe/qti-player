var DivMediaContainer = (function () {
    function DivMediaContainer() {}

    DivMediaContainer.prototype.created = function(){
      this.super();
    };

    return DivMediaContainer;
})();

Polymer('div-mediacontainer', DivMediaContainer.prototype);