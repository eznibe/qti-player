var DivStyledBox = (function () {
    function DivStyledBox() {}

    DivStyledBox.prototype.created = function(){
      this.super();
    };

    return DivStyledBox;
})();

Polymer('div-styledbox', DivStyledBox.prototype);