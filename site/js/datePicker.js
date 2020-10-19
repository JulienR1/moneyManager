$(document).ready(datePickerLoad);

const DISABLED = "disabled";
const SELECTED = "selected";

const MONTHS = ["Janvier", "Février", "Mars", "Avril", "Mai", "Juin", "Juillet", "Août", "Septembre", "Octobre", "Novembre", "Décembre"];

let selectedDate;
let currentMonth, currentYear;

function datePickerLoad() {
  selectedDate = new Date();
  setDatesSize();
  selectMonthOf(selectedDate);
  loadMonth();
  selectDate(selectedDate);

  document.getElementById("datePicker").addEventListener("click", (e) => {
    e.preventDefault();
    e.stopPropagation();
  });
}

function loadMonth() {
  disableSelection();
  buildCalendar();
  registerDateClicks();
  enableSelection();
  updateCalendarTitle();
}

function selectDate(date) {
  disableSelection();
  selectedDate = date;
  selectMonthOf(date);
  enableSelection();
}

function selectMonthOf(date) {
  currentMonth = date.getMonth();
  currentYear = date.getFullYear();
}

function setDatesSize() {
  $("#calendar li").height($("#calendar li").width());
}

function buildCalendar() {
  let firstDay = new Date(currentYear, currentMonth, 1);
  let lastDay = new Date(currentYear, currentMonth + 1, 0);

  $("#calendar li").each(function (index) {
    if (index >= firstDay.getDay() && index < lastDay.getDate() + firstDay.getDay()) {
      $(this)
        .children()
        .html(index - firstDay.getDay() + 1);
      $(this).get(0).removeAttribute(DISABLED);
    } else {
      $(this).children().html(null);
      $(this).get(0).setAttribute(DISABLED, "");
    }
  });
}

function registerDateClicks() {
  $("#calendar").click(function (event) {
    if ($(event.target).is("li:not([disabled])") || $(event.target).parent().is("li:not([disabled])")) {
      let day;
      if ($(event.target).is("span")) {
        day = $(event.target).text();
      } else {
        day = $(event.target).children().text();
      }
      onDateClick(day);
    }
  });
}

function onDateClick(day) {
  let newDate = new Date();
  if (!isNaN(day)) {
    let lastDay = new Date(currentYear, currentMonth + 1, 0).getDate();
    if (day >= 0 && day <= lastDay) {
      newDate = new Date(currentYear, currentMonth, day);
    }
  }
  selectDate(newDate);
}

function nextMonth() {
  currentMonth++;
  if (currentMonth > 11) {
    currentMonth = 0;
    currentYear++;
  }
  loadMonth();
}

function previousMonth() {
  currentMonth--;
  if (currentMonth < 0) {
    currentMonth = 11;
    currentYear--;
  }
  loadMonth();
}

function disableSelection() {
  if (selectedDate !== undefined) {
    let dateElement = $("#calendar li:not([disabled])").get(selectedDate.getDate() - 1);
    if (dateElement !== undefined) {
      dateElement.removeAttribute(SELECTED);
    }
  }
}

function enableSelection() {
  if (selectedDate === undefined) return;

  if (selectedDate.getMonth() == currentMonth && selectedDate.getFullYear() == currentYear) {
    $("#calendar li:not([disabled])")
      .get(selectedDate.getDate() - 1)
      .setAttribute(SELECTED, "");
  }
}

function updateCalendarTitle() {
  let dateStr = MONTHS[currentMonth] + " " + currentYear;
  $("#datePicker h3").html(dateStr);
}
