var SpanHighLight = (function () {
    function SpanHighLight() {}

    SpanHighLight.prototype.created = function(){
		this.super();
    };

    return SpanHighLight;
})();

Polymer('span-highlight', SpanHighLight.prototype);