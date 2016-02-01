var QtiGapText = (function () {
    function QtiGapText() {}

    QtiGapText.prototype.created = function(){
		this.super();
		this.mainClass = 'selectables-list__item';
	};

    return QtiGapText;
})();

Polymer('qti-gaptext', QtiGapText.prototype);