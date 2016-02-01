
function load(file) {
	var request = new XMLHttpRequest();

	request.overrideMimeType("text/xml");

	request.open("GET", file, false);
	request.send();

	return request.responseXML;
}

function transform(xml, xslt) {
	var processor = new XSLTProcessor();
	processor.importStylesheet(xslt);
	var result = processor.transformToFragment(xml, document);
	// TO DO - Check this line in 
	// result = document.importNode(result, true);

	return result;
}

window.onload = function () {
	//THIS NOW LOADS USING A QUERY SEE LIN BELOW:
	//QTI-Polymer.HTML?id=T020
	loadQti(getQueryVariable('id'));
};

function loadQti(templateId)
{
	if(!templateId) templateId = 'T005';
	var xml = load("../templates/"+ templateId +".xml");
	var xslt = load("QTIToPolymer.xslt");

	var result = transform(xml, xslt);
	document.body.appendChild(result);
}

function getQueryVariable(variable)
{
	var query = window.location.search.substring(1);
	var vars = query.split("&");
	for (var i=0;i<vars.length;i++) {
	       var pair = vars[i].split("=");
	       if(pair[0] == variable){return pair[1];}
	}
	return(false);
}