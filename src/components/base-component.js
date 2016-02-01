var BaseComponent = (function () {
    function BaseComponent() {}

    BaseComponent.prototype.created = function () {
		this.mainClass = '';
		this.mainElement = null;
        this.setDisabled(false);
        this.persistClasses();
	};

	// Persist classList from light DOM to shadow DOM (except type specifier)
	// E.g
	//	if original element is <div class="type:component1 class1 class2 classN">[...]</div>
	//  and template contains <div class="{{lightClasses}} classX">[...]</div>
	//  then light DOM will have classes class1, class2, classN and classX, but no type:conponent1
	BaseComponent.prototype.persistClasses = function() {
		var lightClassArray = [];
		var typeName;

        for (var i = 0; i < this.classList.length; i++) {
        	var className = this.classList[i];

        	if (className.indexOf('type:') > -1) {
        		typeName = className;
            } else {
            	lightClassArray.push(className);
            };
        }
		this.classList.remove(typeName);
		this.lightClasses = lightClassArray.join(' ');
	}

	BaseComponent.prototype.ready = function () {
		this.parameters = {};
		if (this.classList) {
			this.parameters = this.parseClass(this.classList.toString());
		}
	};

	BaseComponent.prototype.attached = function () {
        //polymer lifecycle function.
	};

	BaseComponent.prototype.domReady = function () {
        var m = 0;
		if (this.mainClass && this.mainClass !== '') {
			this.mainElement = this.shadowRoot.querySelector("." + this.mainClass);
			if (this.parameters) {
				// convert attribute modifier to it class name (e.g. shadow will add [classname]--shadow)
				if (this.parameters.modifier) {

					for (m = 0; m < this.parameters.modifier.length; m++) {
                        //modify for child element with array value. eg. modifier="[childname,modifierValue]"
                        if(this.parameters.modifier[m] instanceof Array) {
                            //select all shadowElements that have a class
                            var mods = this.shadowRoot.querySelectorAll('[class*="__'+this.parameters.modifier[m][0]+'"]');
                            for(var el = 0; el < mods.length; el++) {
                                //add the modifier to all the elements...
                                mods[el].classList.add(mods[el].classList[0] + '--' + this.parameters.modifier[m][1]);
                            }
                        } else {
                            //standard modifier on the mainClass with string value. eg. modifier="modifierValue"
				            this.mainElement.classList.add(this.mainClass + "--" + this.parameters.modifier[m]);
                        }
					}
				}

//				// convert attribute scroll if true to its right class name
//				if (this.parameters.scroll && this.parameters.scroll[0] === 'true') {
//					this.mainElement.classList.add('scrollable');
//				}
//
//				// convert attribute container to it right class name.
//				if (this.parameters.container) {
//					// every attribute that has a container need to have a container class in the element
//					this.mainElement.classList.add("container");
//					if ( this.parameters.container[0] !== 'true')
//						// add all the other containers modifiers
//						for (m = 0; m < this.parameters.container.length; m++) {
//							this.mainElement.classList.add("container--" + this.parameters.container[m]);
//						}
//				}
			}
		}
	};

	BaseComponent.prototype.detached = function () {
        //polymer lifecycle function.
	};

	BaseComponent.prototype.attributeChanged = function (attrName, oldVal, newVal) {
        //polymer lifecycle function.
	};

	BaseComponent.prototype.updateUI = function () {
        //this should be removed!!!!
    };

    BaseComponent.prototype.setStatus = function (status) {
        //this should be removed!!!!
    };
    
    BaseComponent.prototype.setDisabled = function (value) {
        this.disabled = value;
    }

    BaseComponent.prototype.parseClass = function (input, tokenSeparator, pairSeparator) {
		if (!tokenSeparator) {
			tokenSeparator = " ";
		}
		if (!pairSeparator) {
			pairSeparator = ":";
		}

		var i, output = {}, tokens = input.split(tokenSeparator), pair, key, value;

		for (i = 0; i < tokens.length; i++) {
			pair = tokens[i].split(pairSeparator);
            key = pair[0];
            value = pair[1];

            if(value && value.substr(0,1) === '[') {
                value = value.substr(1,value.length-2).split(',');
            }

			if (key && value) {
				if (!output[key]) {
					output[key] = [];
				}

				output[key].push(value);
			}
		}
		return output;
	};

    return BaseComponent;
})();

Polymer('base-component', BaseComponent.prototype);