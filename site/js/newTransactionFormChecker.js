document.addEventListener("DOMContentLoaded", () => {
  $("form :input").change(checkFormValidity);
});

function checkFormValidity() {
  let formIsvalid = true;

  if (!$("#title").val()) {
    formIsvalid = false;
  }
  let regex = /^\d{4}\-(0[1-9]|1[012])\-(0[1-9]|[12][0-9]|3[01])$/;
  if (!regex.test($("#dateField").val())) {
    formIsvalid = false;
  }
  if (!$("#amount").val()) {
    formIsvalid = false;
  }
  if ($("#category-section input:checked").length == 0) {
    formIsvalid = false;
  }

  toggleSaveButton(formIsvalid);
}

function toggleSaveButton(buttonState) {
  if (!buttonState) {
    document.querySelector("#save-section button").setAttribute("disabled", "");
  } else {
    document.querySelector("#save-section button").removeAttribute("disabled");
  }
}
