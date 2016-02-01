# QTI Content Player #

## Project Brief ##
* Convert a large amount of printed content to digital e-learning solution.
* Not to be server side - LMS Platform was and not clear. 
* Data to be in the QTI XML format - a standard for e-learning assessment data
* Content to be Interactive and engaging but quick to produce

## QTI Specification ##
https://www.imsglobal.org/question/qtiv2p2/QTIv2p2-ASI-InformationModelv1p0/imsqtiv2p2_asi_v1p0_InfoModelv1p0.html

## Research ##
Before we started actual production we need to find the correct technical solution. We explored the following technologies:
* OO Javascript - a custom framework
* AngularJS - utilising directives
* XSLT - manipulating XML
* Polymer (web components) - Using the shadowDOM

## Challenges ##
During the research phase we faced the following challenges:
* AngularJS directives could only translude in one direction.
* AngularJS and OO Javascript not elegant.
* XSLT is an old and complicated way of converting XML
* QTI XML although very well documented is a beast and very strict.
* QTI XML contains more the presentation. It contains variables, event handling and response processing.
* Polymer web components are very new and changing.
* A custom OO Javascript method was not transparent or easy for other developers

## Solution ##
We decided that Polymer was an ideal solution because:
* Its a new standard
* We could utilise the shadowDOM
* We could develop OO Javascript components that inherit other components. This means we could have an inheritance similar to that in the QTI specification.

## Examples ##
Templates (T001 to T117) - Just change the link and refresh.

XML Data:
http://www.ewantavener.co.uk/demo/qti-player/templates/T001.xml
Rendered example:
http://www.ewantavener.co.uk/demo/qti-player/app/index.html?id=T001

XML Data:
http://www.ewantavener.co.uk/demo/qti-player/templates/T117.xml
Rendered example:
http://www.ewantavener.co.uk/demo/qti-player/app/index.html?id=T117
