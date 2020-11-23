Chart.defaults.global.defaultFontFamily = '"Poppins", Arial, Helvetica, sans-serif';
Chart.defaults.global.defaultFontColor = "#303030";

let categorySumCanvas = document.getElementById("categorySumChart").getContext("2d");
let categorySumChart = new Chart(categorySumCanvas, {
  type: "pie",
  options: {
    legend: {
      display: false,
    },
  },
});

let categoryAmountCanvas = document.getElementById("categoryAmountChart").getContext("2d");
let categoryAmountChart = new Chart(categoryAmountCanvas, {
  type: "pie",
  options: {
    legend: {
      display: false,
    },
  },
});
