var DivBlockDropWrap = (function () {
    function DivBlockDropWrap() {}

    DivBlockDropWrap.prototype.created = function(){
		this.super();
		this.mainClass = 'block-drop-wrap';
    };

    return DivBlockDropWrap;
})();

Polymer('div-blockdropwrap', DivBlockDropWrap.prototype);