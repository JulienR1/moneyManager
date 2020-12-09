Chart.defaults.global.defaultFontFamily = '"Poppins", Arial, Helvetica, sans-serif';
Chart.defaults.global.defaultFontColor = "#303030";

let categorySumCanvas = document.getElementById("categorySumChart").getContext("2d");
let categorySumChart = new Chart(categorySumCanvas, {
  type: "pie",
  options: {
    responsive: true,
    legend: {
      display: false,
    },
    tooltips: {
      custom: pieTooltip,
      enabled: false,
      callbacks:{
        label: pieLabelCallback
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
      custom: pieTooltip,
      enabled: false,
      callbacks:{
        label: pieLabelCallback
      }
    },
  },
});

let progressCanvas = document.getElementById("timeProgressChart").getContext("2d");
let progressChart = new Chart(progressCanvas, {
  type: "line",
  options:{
    responsive: true,
     legend:{
       display: false,
     },
     scales:{
      xAxes:[{
        scaleLabel:{
          display: true,
          labelString: "Temps [Jours]"
        },
        ticks:{
          display: false,
          autoSkip: true,
          maxTicksLimit: 6          
        }
      }],
      yAxes:[{
        scaleLabel:{
          display: true,
          labelString: "Somme [$]"
        },
        ticks:{          
          beginAtZero: true,
          autoSkip: true,
          stepSize: 20
        }
      }],      
    },
    tooltips:{
      custom: lineTooltip,
      enabled: false,
      callbacks:{
        label: lineLabelCallback
      }
    },
    layout:{
      padding:{
        right: 20
      }
    }
  }
});

function pieLabelCallback(tooltipItem, data){
  var dataset = data.datasets[tooltipItem.datasetIndex];
  var index = tooltipItem.index;
  return dataset.labels[index] + ": " + dataset.data[index];
}

function lineLabelCallback(tooltipItem, data){
  var dataset = data.datasets[tooltipItem.datasetIndex];
  var index = tooltipItem.index;
  
  var total = roundValue(dataset.data[index], 2);
  var inDepth = total < 0;
  let tooltip =  "<span indepth=" + inDepth + ">" + total + "$</span></br><hr><div>";

  let sign = "";
  dataset.transactions[index].forEach((transaction) => {
    sign = transaction.isIncome === "0" ? "-" : "+";
    tooltip += transaction.title + ": <span isincome=" + transaction.isIncome +">" + sign + roundValue(transaction.amount, 2) + "$</span></br>";
  });
  tooltip += "</div>";

  return tooltip;
}
