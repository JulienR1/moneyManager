function setPieTooltipBody(tooltip, tooltipElement){
    var titleLines = tooltip.title || [];
    var bodyLines = tooltip.body.map(getBody);

    var innerHtml = "<thead>";
    titleLines.forEach(function (title) {
    innerHtml += "<tr><th>" + title + "</th></tr>";
    });
    innerHtml += "</thead><tbody>";

    bodyLines.forEach(function (body, i) {
    var colors = tooltip.labelColors[i];
        innerHtml += '<tr><td style="color:' + colors.backgroundColor + ';">' + body + "</span></td></tr>";
    });
    innerHtml += "</tbody>";

    var tableRoot = tooltipElement.querySelector("table");
    tableRoot.innerHTML = innerHtml;
}