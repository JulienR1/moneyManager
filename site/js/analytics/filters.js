window.addEventListener("DOMContentLoaded", loadFilters);

const STATE_ATTR = "state";
const STATE_COUNT = 3;

var interactables = [];

function loadFilters() {
  interactables = document.querySelectorAll("#list .title, #list .title + .filter");
  $(interactables).click(onFilterClick);
}

function onFilterClick(e) {
  var filter = getFilterElementFromEvent(e);
  updateListFilter(filter);
  var filterToApply = filter.getAttribute("dataset");
  var filterState = filter.getAttribute("state");
  var filterData = { filter: filterToApply, state: filterState };
  var sortedData = filterListData(filterData);
  rebuildList(sortedData);
}

function getFilterElementFromEvent(e) {
  if ($(e.currentTarget).hasClass("filter")) {
    return $(e.currentTarget)[0];
  } else if ($(e.currentTarget).hasClass("title")) {
    return $(e.currentTarget).next()[0];
  }
  return null;
}

function updateListFilter(filterElement) {
  let currentState = $(filterElement).attr(STATE_ATTR);
  removeAllFilters();
  $(filterElement).attr(STATE_ATTR, (currentState + 1) % STATE_COUNT);
}

function removeAllFilters() {
  interactables.forEach((interactable) => {
    interactable.setAttribute(STATE_ATTR, "0");
  });
}
