let customTooltip = function (tooltip, elementId, bodyFunction, chart) {
    var tooltipElement = document.getElementById(elementId);

    if (tryHideTooltip(tooltip, tooltipElement))
        return;

    setVerticalPosition(tooltip, tooltipElement);    
    setTooltipStyle(tooltip, tooltipElement, chart);
    if (tooltip.body)
        bodyFunction(tooltip, tooltipElement);
};

function tryHideTooltip(tooltip, tooltipElement){
    if(tooltip.opacity === 0){
        tooltipElement.style.opacity = 0;
        return true;
    }
    return false;
}

function setVerticalPosition(tooltip, tooltipElement){
    tooltipElement.classList.remove("above", "below", "no-transform");
    if (tooltip.yAlign) {
        tooltipElement.classList.add(tooltip.yAlign);
    } else {
        tooltipElement.classList.add("no-transform");
    }
}

function getBody(bodyItem) {
    return bodyItem.lines;
}

function setTooltipStyle(tooltip, tooltipElement, chart){
    var positionY = chart.canvas.offsetTop;
    var positionX = chart.canvas.offsetLeft;

    tooltipElement.style.opacity = 1;
    tooltipElement.style.left = positionX + tooltip.caretX + "px";
    tooltipElement.style.top = positionY + tooltip.caretY + "px";
    tooltipElement.style.fontFamily = tooltip._bodyFontFamily;
    tooltipElement.style.fontSize = tooltip.bodyFontSize;
    tooltipElement.style.fontStyle = tooltip._bodyFontStyle;
    tooltipElement.style.padding = tooltip.yPadding + "px " + tooltip.xPadding + "px";
}