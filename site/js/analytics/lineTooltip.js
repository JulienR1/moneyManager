function setLineTooltipBody(tooltip, tooltipElement){
    var titleLines = tooltip.title || [];
    var bodyLines = tooltip.body.map(getBody);

    var innerHtml = "<thead>";
    titleLines.forEach(function (title) {
        innerHtml += "<tr><th>" + title + "</th></tr>";
    });
    innerHtml += "</thead><tbody>";

    bodyLines.forEach(function (body, i) {
        innerHtml += '<tr><td>' + body + "</td></tr>";
    });
    innerHtml += "</tbody>";

    var tableRoot = tooltipElement.querySelector("table");
    tableRoot.innerHTML = innerHtml;
}