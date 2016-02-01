var LiConversationitem = (function () {
    function LiConversationitem() {}

    LiConversationitem.prototype.created = function(){
		this.super();
	};

	LiConversationitem.prototype.domReady = function () {
		this.cueClasses();
	};

	LiConversationitem.prototype.cueClasses = function() {
		var cueStartIndex,
			cueEndIndex,
			cuePoints = [];
        for (var i = 0; i < this.classList.length; i++) {
        	var className = this.classList[i];
        	if (className.indexOf('cue-start:') > -1) {
        		cueStartIndex = className;
        		cuePoints.push( parseInt(className.split(":")[1], 10) );
            };
            if (className.indexOf('cue-end:') > -1) {
            	cueEndIndex = className;
        		cuePoints.push( parseInt(className.split(":")[1], 10) );
            };
        }
        this.classList.remove(cueStartIndex);
        this.classList.remove(cueEndIndex);
        this.setAttribute('data-cue', cuePoints);
        // clean shadowroot classList
        var shadowRootClassSelector = this.shadowRoot.querySelector("li")
        shadowRootClassSelector.classList.remove(cueStartIndex);
        shadowRootClassSelector.classList.remove(cueEndIndex);
	};
    return LiConversationitem;
})();

Polymer('li-conversationitem', LiConversationitem.prototype);