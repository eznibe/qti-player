# QTI Content Player #

## Project Brief ##
-- Convert a large amount of printed content to digital e-learning solution.
-- Not to be server side - LMS Platform was and not clear. 
-- QTI XML format - a standard for e-learning assessment data
-- Content to be Interactive and engaging

## QTI Specification ##
https://www.imsglobal.org/question/qtiv2p2/QTIv2p2-ASI-InformationModelv1p0/imsqtiv2p2_asi_v1p0_InfoModelv1p0.html

## Research and Development ##
-- OO Javascript - a custom framework
-- AngularJS - utilising directives
-- XSLT
-- Polymer (web components)

## Challenges ##
--

## Solution - Polymer ##
-- Using the shadowDOM
-- Create OO Javascript components that inherit other components. This means we could have an inheritance similar to the QTI specification.

Templates (T001 to T117) - Just change the link and refresh.

XML Data - http://www.ewantavener.co.uk/demo/qti-player/templates/T001.xml
Rendered example - http://www.ewantavener.co.uk/demo/qti-player/app/index.html?id=T001

XML Data - http://www.ewantavener.co.uk/demo/qti-player/templates/T117.xml
Rendered example - http://www.ewantavener.co.uk/demo/qti-player/app/index.html?id=T117
