document.addEventListener("DOMContentLoaded", () => {
  var dates = getDates();
  loadData(dates);
});
//TODO: event quand les dates de filtres sont changees

let completeData = [];

function getDates() {
  return { start: "2020-10-01", end: "2020-12-31" };
}

function loadData(filterListData) {
  filterListData["ajax_request"] = true;
  $.ajax({
    type: "POST",
    url: "#",
    data: $.param(filterListData),
    success: onLoadSuccess,
    error: function () {
      alert("Error loading analytics");
    },
  });
}

function onLoadSuccess(data) {
  if (data.length === 0) {
    // TODO: Set invalid request on screen
    console.log("invalid ajax request");
    return;
  }

  completeData = JSON.parse(data);
  buildAnalytics();
}

function buildAnalytics() {
  rebuildCircularDiagrams();
  rebuildList(completeData);
}

function rebuildCircularDiagrams() {
  //TODO
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
  data.forEach((row) => {
    innerHtml += getRowHtml(row);
  });
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
  html += '<td><i class="' + rowData["iconUrl"] + '"></i></td>';
  html += "</tr>";
  return html;
}
