const TITLE_INPUT = "#title";
const DATE_INPUT = "#dateField";
const AMOUNT_INPUT = "#amount";
const CATEGORY_INPUT = "#category-section input:checked";

const DATE_REGEX = /^\d{4}\-(0[1-9]|1[012])\-(0[1-9]|[12][0-9]|3[01])$/;

const SAVE_BUTTON = "#save-section button";
const DISABLED_ATTR = "disabled";

document.addEventListener("DOMContentLoaded", () => {
  $("form :input").change(checkFormValidity);
  onPickerClosedCallback = checkFormValidity;
});

function checkFormValidity() {
  let formIsvalid = isFieldCompleted(TITLE_INPUT) &&
                    isFieldCompleted(AMOUNT_INPUT) && 
                    isFieldCompleted(CATEGORY_INPUT) &&
                    passRegex(DATE_INPUT, DATE_REGEX);

  toggleSaveButton(formIsvalid);
}

function toggleSaveButton(buttonState) {
  if (buttonState) {
    document.querySelector(SAVE_BUTTON).removeAttribute(DISABLED_ATTR);
  } else {
    document.querySelector(SAVE_BUTTON).setAttribute(DISABLED_ATTR, "");
  }
}
