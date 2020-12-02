document.addEventListener("DOMContentLoaded", onIconsLoaded);

function onIconsLoaded() {
  $("#icon-form").submit(onFormSubmit);
}

function onFormSubmit(event) {
  event.preventDefault();
  let formInput = document.getElementById("newIconInput");
  saveIcon();
}

function saveIcon() {
  $.ajax({
    type: "POST",
    url: "/categories?save=2",
    data: $("#icon-form").serialize(),
    success: onIconSaved,
  });
}

function onIconSaved(data) {
  document.getElementById("newIconInput").value = "";
  if (data["success"] === true) {
    $("#edition-section > form ul").html(data["html"]);
    if (currentIconValue !== -1) {
      $("#edition-section > form ul li input[value='" + currentIconValue + "']").get(0).checked = true;
    }

    updateCategoryIconsColor();
  } else {
    if (data["duplicate"] == true) {
      console.log("Icon already in DB");
    }
  }
}
