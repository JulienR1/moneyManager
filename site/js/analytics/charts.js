Chart.defaults.global.defaultFontFamily = '"Poppins", Arial, Helvetica, sans-serif';
Chart.defaults.global.defaultFontColor = "#303030";

let categorySumCanvas = document.getElementById("categorySumChart").getContext("2d");
let categorySumChart = new Chart(categorySumCanvas, {
  type: "pie",
  data: {
    labels: ["Option 1", "option 2", "option 3"],
    datasets: [
      {
        label: "label",
        data: [1, 2, 3],
        backgroundColor: ["red", "blue", "yellow"],
      },
    ],
  },
  options: {
    title: {
      display: true,
      text: "Transaction par catégorie",
    },
    legend: {
      display: false,
    },
    tooltips: {
      enabled: false,
      custom: function (tooltipModel) {
        var tooltipElement = document.getElementById("chartjs-tooltip");
        if (!tooltipElement) {
          tooltipElement = document.createElement("div");
          tooltipElement.id = "chartjs-tooltip";
          tooltipElement.innerHTML = "<table></table>";
          document.body.appendChild(tooltipElement);
        }

        if (tooltipModel.opacity === 0) {
          tooltipElement.style.opacity = 0;
          return;
        }

        tooltipElement.classList.remove("above", "below", "no-transform");
        if (tooltipModel.yAlign) {
          tooltipElement.classList.add(tooltipModel.yAlign);
        } else {
          tooltipElement.classList.add("no-transform");
        }

        function getBody(bodyItem) {
          return bodyItem.lines;
        }

        if (tooltipModel.body) {
          var titleLines = tooltipModel.title || [];
          var bodyLines = tooltipModel.body.map(getBody);

          var innerHtml = "<thead>";
          titleLines.forEach(function (title) {
            innerHtml += "<tr><th>" + title + "</th></tr>";
          });
          innerHtml += "</thead><tbody>";

          bodyLines.forEach(function (body, i) {
            var colors = tooltipModel.labelColors[i];
            var style = "background:" + colors.backgroundColor;
            style += "; border-color:" + colors.borderColor;
            style += "; border-width: 2px";
            var span = "<span style='" + style + "'></span>";
            innerHtml += "<tr><td>" + span + '<i class="fab fa-500px"></i>' + body + "</td></tr>";
          });
          innerHtml += "</tbody>";

          var tableRoot = tooltipElement.querySelector("table");
          tableRoot.innerHTML = innerHtml;
        }

        var position = this._chart.canvas.getBoundingClientRect();
        tooltipElement.style.opacity = 1;
        tooltipElement.style.position = "absolute";
        tooltipElement.style.left = position.left + window.pageXOffset + tooltipModel.caretX + "px";
        tooltipElement.style.top = position.top + window.pageYOffset + tooltipModel.caretY + "px";
        tooltipElement.style.fontFamily = tooltipModel._bodyFontFamily;
        tooltipElement.style.fontSize = tooltipModel._bodyFontSize + "px";
        tooltipElement.style.fontStyle = tooltipModel._bodyFontStyle;
        tooltipElement.style.padding = tooltipModel.yPadding + "px " + tooltipModel.xPadding + "px";
        tooltipElement.style.pointerEvents = "none";
      },
    },
  },
});

let categoryAmountCanvas = document.getElementById("categoryAmountChart").getContext("2d");
let categoryAmountChart = new Chart(categoryAmountCanvas, {
  type: "pie",
  data: {
    labels: ["OptioN!"],
    datasets: [{ data: [5] }],
  },
  options: {
    title: {
      display: true,
      text: "Total par catégorie",
    },
    legend: {
      display: false,
    },
  },
});
