$(document).ready(datePickerLoad);

const ENABLED = "enabled";
const DISABLED = "disabled";
const SELECTED = "selected";

const PICKER = "datePicker";
const PICKER_HEADER = "#datePicker h3";
const CALENDAR = "#calendar";
const CALENDAR_SQUARE = "#calendar li";
const VALID_EVENT_CLICK = "li:not([" + DISABLED + "])";

const MONTHS = ["Janvier", "Février", "Mars", "Avril", "Mai", "Juin", "Juillet", "Août", "Septembre", "Octobre", "Novembre", "Décembre"];

let selectedDate;
let currentMonth, currentYear;
let currentPickerId = null;
let currentSrcElement = null;

let datePicker;

function datePickerLoad() {
  datePicker = document.getElementById(PICKER);
  if (datePicker === null) return;

  selectedDate = new Date();
  setDatesSize();
  registerDateClicks();
  selectDate(selectedDate);
  preventEvent(datePicker, "click");
}

function selectDate(date) {
  disableSelection();
  selectedDate = date;
  selectMonthOf(date);
  buildCalendar();
  enableSelection();
  updateCalendarTitle();
}

function loadMonth() {
  disableSelection();
  buildCalendar();
  enableSelection();
  updateCalendarTitle();
}

function selectMonthOf(date) {
  currentMonth = date.getMonth();
  currentYear = date.getFullYear();
}

function setDatesSize() {
  let calendarSquare = $(CALENDAR_SQUARE);
  let calendarSquareWidth = calendarSquare.width();
  calendarSquare.height(calendarSquareWidth);
}

function buildCalendar() {
  let firstDay = new Date(currentYear, currentMonth, 1);
  let lastDay = new Date(currentYear, currentMonth + 1, 0);

  $(CALENDAR_SQUARE).each(function (index) {
    setDateSquare({
      square: $(this),
      index: index,
      firstDay: firstDay,
      lastDay: lastDay
    });
  });
}

function setDateSquare(monthData){
  var squareIsBeforeMonth = monthData.index < monthData.firstDay.getDay();
  var squareIsAfterMonth = monthData.index >= monthData.lastDay.getDate() + monthData.firstDay.getDay();  

  if (!squareIsBeforeMonth && !squareIsAfterMonth) {
    var dateHtml = monthData.index - monthData.firstDay.getDay() + 1;
    enableDateSquare(monthData.square, dateHtml);
  } else {
    disableDateSquare(monthData.square);
  }
}

function enableDateSquare(square, htmlData){
  square.children().html(htmlData);
  square.get(0).removeAttribute(DISABLED);
}

function disableDateSquare(square){
  square.children().html(null);
  square.get(0).setAttribute(DISABLED, "");
}

function registerDateClicks() {
  $(CALENDAR).click(registerSingleDateClickIfValid);
}

function registerSingleDateClickIfValid(event){  
  var clickEventIsValid = $(event.target).is(VALID_EVENT_CLICK) ||
                          $(event.target).parent().is(VALID_EVENT_CLICK);
  if (!clickEventIsValid) return;

  let day = getDayElementFromDateClick(event);
  onDateClick(day);
}

function getDayElementFromDateClick(event){  
  if ($(event.target).is("span")) {
    return $(event.target).text();
  } else {
    return $(event.target).children().text();
  }
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
    let dateElement = $(CALENDAR + " " + VALID_EVENT_CLICK).get(selectedDate.getDate() - 1);
    if (dateElement !== undefined) {
      dateElement.removeAttribute(SELECTED);
    }
  }
}

function enableSelection() {
  if (selectedDate === undefined) return;

  let dateIsInMonth = selectedDate.getMonth() == currentMonth &&
                      selectedDate.getFullYear() == currentYear;
  if (dateIsInMonth) {
    $(CALENDAR + " " + VALID_EVENT_CLICK)
      .get(selectedDate.getDate() - 1)
      .setAttribute(SELECTED, "");
  }
}

function updateCalendarTitle() {
  let dateStr = MONTHS[currentMonth] + " " + currentYear;
  $(PICKER_HEADER).html(dateStr);
}

function togglePickerMultiple(srcElement, callback){  
  if(currentPickerId !== srcElement.id){
    closePicker();
  }  
  togglePicker(srcElement, callback);  
}

function togglePicker(srcElement, callback) {  
  this.currentSrcElement = srcElement;  
  startDate = new Date(srcElement.value);
  startDate.setDate(startDate.getDate() + 1);
  selectDate(startDate);

  if (this.callback === undefined) {
    this.callback = callback;
    this.currentSrcElement = srcElement;
    datePicker.setAttribute(ENABLED, "");
  } else {
    closePicker();
  }
}

function closePicker() {  
  datePicker.removeAttribute(ENABLED);
  if (this.callback !== undefined) {
    callback(selectedDate, this.currentSrcElement);
    this.callback = undefined;
    disableSelection();
    selectedDate = undefined;
  }
}
