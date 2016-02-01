var DivStaticText = (function () {
    function DivStaticText() {}

    DivStaticText.prototype.created = function(){
      this.super();
    };

    return DivStaticText;
})();

Polymer('div-statictext', DivStaticText.prototype);