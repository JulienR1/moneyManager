Chart.defaults.global.defaultFontFamily = '"Poppins", Arial, Helvetica, sans-serif';
Chart.defaults.global.defaultFontColor = "#303030";

Chart.defaults.global.tooltips.custom = function (tooltip) {
  var tooltipElement = document.getElementById("chartjs-tooltip");

  if (tooltip.opacity === 0) {
    tooltipElement.style.opacity = 0;
    return;
  }

  tooltipElement.classList.remove("above", "below", "no-transform");
  if (tooltip.yAlign) {
    tooltipElement.classList.add(tooltip.yAlign);
  } else {
    tooltipElement.classList.add("no-transform");
  }

  function getBody(bodyItem) {
    return bodyItem.lines;
  }

  if (tooltip.body) {
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

  var positionY = this._chart.canvas.offsetTop;
  var positionX = this._chart.canvas.offsetLeft;

  tooltipElement.style.opacity = 1;
  tooltipElement.style.left = positionX + tooltip.caretX + "px";
  tooltipElement.style.top = positionY + tooltip.caretY + "px";
  tooltipElement.style.fontFamily = tooltip._bodyFontFamily;
  tooltipElement.style.fontSize = tooltip.bodyFontSize;
  tooltipElement.style.fontStyle = tooltip._bodyFontStyle;
  tooltipElement.style.padding = tooltip.yPadding + "px " + tooltip.xPadding + "px";
};

let categorySumCanvas = document.getElementById("categorySumChart").getContext("2d");
let categorySumChart = new Chart(categorySumCanvas, {
  type: "pie",
  options: {
    responsive: true,
    legend: {
      display: false,
    },
    tooltips: {
      enabled: false,
      callbacks:{
        label: labelCallback
      }
    },
  },
});

let categoryAmountCanvas = document.getElementById("categoryAmountChart").getContext("2d");
let categoryAmountChart = new Chart(categoryAmountCanvas, {
  type: "pie",
  options: {
    responsive: true,
    legend: {
      display: false,
    },
    tooltips: {
      enabled: false,
      callbacks:{
        label: labelCallback
      }
    },
  },
});

function labelCallback(tooltipItem, data){
  var dataset = data.datasets[tooltipItem.datasetIndex];
  var index = tooltipItem.index;
  return dataset.labels[index] + ": " + dataset.data[index];
}
