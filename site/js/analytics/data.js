const REVENUE_GREEN = "#33f23c";
const EXPENSE_RED = "#ff2934";

document.addEventListener("DOMContentLoaded", () => {
  loadData(null);
  onPickerClosedCallback = () => {
    loadData(null);
  };
});

let completeData = [];
let categoryData = [];
let summaryData = [];

function getDates() {
  var startDate = $("#startDate").val();
  var endDate = $("#endDate").val();
  return { start: startDate, end: endDate };
}

function loadData(e) {
  if (e !== null) {
    e.preventDefault();
  }

  data = getDates();
  data["ajax_request"] = true;
  $.ajax({
    type: "POST",
    url: "#",
    data: $.param(data),
    success: onLoadSuccess,
    error: function () {
      alert("Error loading analytics");
    },
  });
}

function onLoadSuccess(data) {
  if (data.length === 0) {
    console.log("invalid ajax request");
    rebuildList(null);
    return;
  }

  var parsedData = JSON.parse(data);
  completeData = parsedData.completeData;
  categoryData = parsedData.categoryData;
  summaryData = parsedData.summaryData;

  renderEmptyData();
  buildAnalytics();
}

function renderEmptyData() {
  var emptyData = completeData === null || categoryData === null;
  document.querySelectorAll(".no-data-msg").forEach((msg) => {
    msg.style.display = emptyData ? "block" : "none";
  });
}

function buildAnalytics() {
  rebuildCircularDiagrams();
  rebuildList(completeData);
  rebuildSummaryTable();
  rebuildTimeProgress();
}

function rebuildCircularDiagrams() {
  categoryAmountChart.data.datasets = [];
  categorySumChart.data.datasets = [];

  if (categoryData !== null && completeData !== null) {
    var data = getCategoryDatasets();
    setChartData(categoryAmountChart, data.sumDataset, data.totalSumDataset, true);
    setChartData(categorySumChart, data.countDataset, data.totalCountDataset, true);
  }

  categorySumChart.update();
  categoryAmountChart.update();
}

function setChartData(chart, totalData, data, reverseOrder) {
  chart.data.datasets.push(reverseOrder ? totalData : data);
  chart.data.datasets.push(reverseOrder ? data : totalData);
}

function getCategoryDatasets() {
  let patterns = getEmptyPatterns();

  patterns.totalCountDataset.weight = 3;
  patterns.totalSumDataset.weight = 3;

  var previousCategoryId = null;
  categoryData.forEach((data) => {
    var label = "<i class='" + data.iconUrl + "'></i><span>" + (data.isIncome == 1 ? "Revenus" : "Dépenses");
    addLabelToDataset(label, [patterns.sumDataset, patterns.countDataset]);

    var color = data.isIncome == 1 ? REVENUE_GREEN : EXPENSE_RED;
    addDataToDataset(patterns.sumDataset, data.total, color);
    addDataToDataset(patterns.countDataset, data.count, color);

    if (previousCategoryId === data.categoryId) {
      augmentDataFromDataset(patterns.totalSumDataset, data.total);
      augmentDataFromDataset(patterns.totalCountDataset, data.count);
    } else {
      var totalColor = "#" + data.color;
      addDataToDataset(patterns.totalSumDataset, data.total, totalColor);
      addDataToDataset(patterns.totalCountDataset, data.count, totalColor);

      var totalLabel = "<i class='" + data.iconUrl + "'></i><span>" + data.title;
      addLabelToDataset(totalLabel, [patterns.totalSumDataset, patterns.totalCountDataset]);
    }
    previousCategoryId = data.categoryId;
  });

  roundDataset(patterns.totalSumDataset, 2);
  roundDataset(patterns.sumDataset, 2);
  return patterns;
}

function getEmptyPatterns() {
  return {
    sumDataset: getSingleEmptyPattern(),
    totalSumDataset: getSingleEmptyPattern(),
    countDataset: getSingleEmptyPattern(),
    totalCountDataset: getSingleEmptyPattern(),
  };
}

function getSingleEmptyPattern() {
  return {
    labels: [],
    data: [],
    backgroundColor: [],
    weight: 1,
  };
}

function addLabelToDataset(label, datasets) {
  datasets.forEach((dataset) => {
    dataset.labels.push(label);
  });
}

function addDataToDataset(dataset, value, color) {
  dataset.data.push(value);
  dataset.backgroundColor.push(color);
}

function augmentDataFromDataset(dataset, amountToAdd) {
  dataset.data[dataset.data.length - 1] = parseFloat(dataset.data[dataset.data.length - 1]) + parseFloat(amountToAdd);
}

function roundDataset(dataset, precision) {
  var precisionFactor = Math.pow(100, 2);
  for (var i = 0; i < dataset.data.length; i++) {
    dataset.data[i] = (Math.round(dataset.data[i] * precisionFactor) / precisionFactor).toFixed(precision);
  }
}

function filterListData(filterData) {
  if (filterData.state == 0) return completeData;

  var filteringDirection = filterData.state == 1 ? 1 : -1;
  return completeData.sort(function (a, b) {
    switch (filterData.filter) {
      case "date":
        return filteringDirection * (new Date(a.transactionDate) > new Date(b.transactionDate) ? 1 : -1);
      case "transaction":
        return filteringDirection * (a.title > b.title ? 1 : -1);
      case "amount":
        return filteringDirection * (a.amount - b.amount);
      case "category":
        return filteringDirection * (a.iconUrl > b.iconUrl ? 1 : -1);
      default:
        return 0;
    }
  });
}

function rebuildList(data) {
  let table = document.querySelector("#list table");
  emptyTable(table);

  var innerHtml = "";
  if (data !== null) {
    data.forEach((row) => {
      innerHtml += getRowHtml(row);
    });
  } else {
    innerHtml = "<tr><td completeSpan>Aucune donnée sauvegardée</td></tr>";
  }
  $(table).find("tbody").append(innerHtml);
}

function emptyTable(table) {
  let size = $(table).find("tr").length;
  for (var i = 1; i < size; i++) {
    table.deleteRow(-1);
  }
}

function getRowHtml(rowData) {
  var months = ["JAN", "FÉV", "MAR", "AVR", "MAI", "JUI", "JUI", "AOÛ", "SEP", "OCT", "NOV", "DÉC"];
  var date = new Date(rowData["transactionDate"]);
  date.setDate(date.getDate() + 1);
  var amount = (Math.round(rowData["amount"] * 100) / 100).toFixed(2);
  var proofLink = rowData["proofSrc"] !== null ? "onclick=\"window.open('" + rowData["proofSrc"] + "')\"" : "";

  var html = '<tr isIncome="' + rowData["isIncome"] + '" ' + proofLink + ">";
  html += '<td><span class="day">' + date.getDate() + "</span>";
  html += '<span class="month"> ' + months[date.getMonth()] + "</span></td>";
  html += "<td>" + rowData["title"] + "</td>";
  html += "<td>" + amount + "$</td>";
  html += '<td><i style="--color: #' + rowData["color"] + '" class="' + rowData["iconUrl"] + '"></i></td>';
  html += "</tr>";
  return html;
}

function rebuildSummaryTable() {
  var revenueCount = 0,
    revenueAmount = 0,
    expenseCount = 0,
    expenseAmount = 0;

  if (summaryData !== null) {
    for (var i = 0; i < summaryData.length; i++) {
      if (summaryData[i].isIncome == 0) {
        expenseCount = parseInt(summaryData[i].count);
        expenseAmount = roundValue(parseFloat(summaryData[i].total), 2);
      } else if (summaryData[i].isIncome == 1) {
        revenueCount = parseInt(summaryData[i].count);
        revenueAmount = roundValue(parseFloat(summaryData[i].total), 2);
      }
    }
  }

  var countTotal = revenueCount + expenseCount;
  var amountTotal = roundValue(revenueAmount - expenseAmount, 2);

  let table = document.getElementById("summary-table");
  var html = "<tr><th>Revenus</th><th>Dépenses</th><th>Total</th></tr>";
  html += "<tr><td>" + revenueCount + "</td><td>" + expenseCount + "</td><td>" + countTotal + "</td></tr>";
  html += "<tr><td ispositive=1>" + revenueAmount + "$</td><td ispositive=0>" + expenseAmount + "$</td><td ispositive=" + (amountTotal >= 0 ? 1 : 0) + ">" + amountTotal + "$</td></tr>";
  table.innerHTML = html;
}

function roundValue(value, precision) {
  var precisionFactor = Math.pow(10, precision);
  return (Math.round(value * precisionFactor) / precisionFactor).toFixed(precision);
}

function rebuildTimeProgress() {
  let color = "red";
  let labels = [];
  let dataset = {
    borderColor: color,
    pointBackgroundColor: color,
    pointHitRadius: 3,
    pointHoverRadius: 5,
    lineTension: 0,
    data: [],
    transactions: [],
    pointRadius: [],
  };

  let boundaryDates = getDates();
  if (boundaryDates.start > boundaryDates.end) return;

  var currentTransactionIndex = 0;
  let currentAmount = 0;
  let transactions = [];
  for (var d = new Date(boundaryDates.start); d <= new Date(boundaryDates.end); d.setDate(d.getDate() + 1)) {
    if (completeData !== null) {
      while (completeData[currentTransactionIndex] !== undefined && new Date(completeData[currentTransactionIndex].transactionDate).getTime() === d.getTime()) {
        var data = completeData[currentTransactionIndex];
        var expenseFactor = data.isIncome == 1 ? 1 : -1;
        currentAmount += expenseFactor * parseFloat(data.amount);
        transactions.push({ title: data.title, amount: data.amount, isIncome: data.isIncome });

        currentTransactionIndex++;
      }
    }

    if (transactions.length > 0) {
      dataset.transactions.push(transactions);
      dataset.pointRadius.push(4);
      transactions = [];
    } else {
      dataset.transactions.push([]);
      dataset.pointRadius.push(0);
    }

    dataset.data.push(currentAmount);
    labels.push(d.toISOString().substring(0, 10));
  }

  progressChart.data.datasets = [];
  progressChart.data.labels = labels;
  progressChart.data.datasets.push(dataset);
  progressChart.update();
}
