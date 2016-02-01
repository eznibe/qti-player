var QtiGapImage = (function () {
    function QtiGapImage() {}

    QtiGapImage.prototype.created = function(){
		this.super();
		this.mainClass = 'selectables-list__item';
        this.label = this.getAttribute('objectLabel');
	};

    return QtiGapImage;
})();

Polymer('qti-gapimg', QtiGapImage.prototype);