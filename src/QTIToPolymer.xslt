<?xml version="1.0" encoding="utf-8"?>
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform" xmlns:qti="http://www.imsglobal.org/xsd/imsqti_v2p1">
	<xsl:param name="separator" select="' '"/>
	<xsl:param name="prefix" select="'type:'"/>
	<xsl:variable name="QTI">
		<!--
			Doesn't include response processing, template processing, tests, outcome processing.
			TODO: verify
		 -->
        <element>responseProcessing</element>
        <element>setOutcomeValue</element>
        <element>variable</element>
        <element>match</element>
        <element>contains</element>
        <element>multiple</element>
        <element>correct</element>
        <element>baseValue</element>
        <element>responseCondition</element>
        <element>responseIf</element>
        <element>responseElseIf</element>
        <element>responseElse</element>
        <element>mapResponse</element>

        <element>responseDeclaration</element>

		<element>assessmentItem</element>
		<element>itemSessionControl</element>
		<element>value</element>
		<element>defaultValue</element>
		<element>mapping</element>
		<element>mapEntry</element>
		<element>responseDeclaration</element>
		<element>correctResponse</element>
		<element>areaMapping</element>
		<element>areaMapEntry</element>
		<element>outcomeDeclaration</element>
		<element>matchTable</element>
		<element>matchTableEntry</element>
		<element>interpolationTable</element>
		<element>interpolationTableEntry</element>
		<element>itemBody</element>
		<element>feedbackBlock</element>
		<element>feedbackInline</element>
		<element>rubricBlock</element>
		<element>printedVariable</element>
		<element>stylesheet</element>
		<element>prompt</element>
		<element>choiceInteraction</element>
		<element>orderInteraction</element>
		<element>simpleChoice</element>
		<element>associateInteraction</element>
		<element>matchInteraction</element>
		<element>simpleAssociableChoice</element>
		<element>simpleMatchSet</element>
		<element>gapMatchInteraction</element>
		<element>gap</element>
		<element>gapText</element>
		<element>gapImg</element>
		<element>inlineChoiceInteraction</element>
		<element>inlineChoice</element>
		<element>textEntryInteraction</element>
		<element>extendedTextInteraction</element>
		<element>hottextInteraction</element>
		<element>hottext</element>
		<element>hotspot</element>
		<element>hotspotChoice</element>
		<element>associableHotspot</element>
		<element>hotspotInteraction</element>
		<element>selectPointInteraction</element>
		<element>graphicOrderInteraction</element>
		<element>graphicAssociateInteraction</element>
		<element>graphicGapMatchInteraction</element>
		<element>positionObjectInteraction</element>
		<element>positionObjectStage</element>
		<element>sliderInteraction</element>
		<element>mediaInteraction</element>
		<element>drawingInteraction</element>
		<element>uploadInteraction</element>
		<element>customInteraction</element>
		<element>endAttemptInteraction</element>
		<element>infoControl</element>
		<element>modalFeedback</element>
	</xsl:variable>

	<!-- passthrough -->
	<xsl:template match="*">
		<xsl:copy>
			<xsl:apply-templates select="* | @* | text()"/>
		</xsl:copy>
	</xsl:template>
	<xsl:template match="@* | text()">
		<xsl:copy-of select="."/>
	</xsl:template>

	<!-- QTI -->
	<xsl:template match="qti:*">
		<xsl:variable name="elementName">
			<xsl:call-template name="getTypedElementName">
				<xsl:with-param name="input" select="."/>
			</xsl:call-template>
		</xsl:variable>
		<xsl:element name="{$elementName}">
			<xsl:apply-templates select="* | @* | text()"/>
		</xsl:element>
	</xsl:template>

	<!-- custom names -->
	<xsl:template name="getType">
		<xsl:param name="input"/>
		<xsl:param name="separator" select="$separator"/>
		<xsl:param name="prefix" select="$prefix"/>
		<xsl:variable name="output">
			<xsl:choose>
				<xsl:when test="contains($input, $separator)">
					<xsl:value-of select="substring-before($input, $separator)"/>
				</xsl:when>
				<xsl:otherwise>
					<xsl:value-of select="$input"/>
				</xsl:otherwise>
			</xsl:choose>
		</xsl:variable>
		<xsl:choose>
			<xsl:when test="starts-with($output, $prefix) and $output != $prefix">
				<xsl:value-of select="substring-after($output, $prefix)"/>
			</xsl:when>
			<xsl:otherwise>
				<xsl:variable name="after" select="substring-after($input, $separator)"  />
				<xsl:if test="$after">
					<xsl:call-template name="getType">
						<xsl:with-param name="input" select="$after"/>
						<xsl:with-param name="separator" select="$separator"/>
						<xsl:with-param name="prefix" select="$prefix"/>
					</xsl:call-template>
				</xsl:if>
			</xsl:otherwise>
		</xsl:choose>
	</xsl:template>
	<xsl:template name="getTypedElementName">
		<xsl:param name="input"/>

		<xsl:variable name="qtiElements" select="document('')//xsl:variable[@name = 'QTI']/element"/>
		<xsl:variable name="originalName" select="name($input)"/>
		<xsl:variable name="type">
			<xsl:call-template name="getType">
				<xsl:with-param name="input" select="$input/@class"/>
			</xsl:call-template>
		</xsl:variable>

		<!-- Add prefix to QTI elements -->
		<xsl:if test="$qtiElements[text() = $originalName]">
			<xsl:text>qti-</xsl:text>
		</xsl:if>

		<xsl:value-of select="$originalName"/>

		<!-- Add suffix for typed elements -->
		<xsl:if test="string-length($type)">
			<xsl:text>-</xsl:text>
			<xsl:value-of select="$type"/>
		</xsl:if>
	</xsl:template>
</xsl:stylesheet>
