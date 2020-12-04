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
      custom: pieTooltip,
      enabled: false,
      callbacks:{
        label: labelCallback
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
        ticks:{
          autoSkip: true,
          maxTicksLimit: 6
        }
      }],
      yAxes:[{
        ticks:{
          beginAtZero: true,
          autoSkip: true,
          stepSize: 20
        }
      }],
    }
  }
});

function labelCallback(tooltipItem, data){
  var dataset = data.datasets[tooltipItem.datasetIndex];
  var index = tooltipItem.index;
  return dataset.labels[index] + ": " + dataset.data[index];
}
