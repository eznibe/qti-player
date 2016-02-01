var SpanNoWrap = (function () {
    function SpanNoWrap() {}

    SpanNoWrap.prototype.created = function(){
		this.super();
		this.mainClass = 'no-wrap';
    };

    return SpanNoWrap;
})();

Polymer('span-nowrap', SpanNoWrap.prototype);