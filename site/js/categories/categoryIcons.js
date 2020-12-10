const ICON_LIST = "#edition-section > form ul";
const EXISTING_ICON_ID = "#existingIconError";
const SUCCESS_FLAG = "success";
const DUPLICATE_FLAG = "duplicate";

document.addEventListener("DOMContentLoaded", onIconsLoaded);

function onIconsLoaded() {
  $("#icon-form").submit(onFormSubmit);
}

function onFormSubmit(event) {
  event.preventDefault();
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
  resetIconsToDefaults();

  if (data[SUCCESS_FLAG] === true) {    
    onIconSaveSuccess(data["html"]);
  } else if(data[DUPLICATE_FLAG] === true) {    
    onIconSaveFail(data["icon"]);
  }
}

function resetIconsToDefaults(){
  document.getElementById("newIconInput").value = "";
  $(EXISTING_ICON_ID).html("");
}

function onIconSaveSuccess(iconsHtml){
  $(ICON_LIST).html(iconsHtml);
  keepCurrentIconSelected();
  updateCategoryIconsColor();
}

function keepCurrentIconSelected(){
  if (currentIconValue !== -1) {
    var iconInput = getSpecificIcon(currentIconValue);
    iconInput.checked = true;
  }
}

function onIconSaveFail(duplicateIcon){
  var iconErrorHtml = "<b>" + duplicateIcon + "</b> est déjà utilisé";
  $(EXISTING_ICON_ID).html(iconErrorHtml);
}

function getSpecificIcon(iconId){
  return $(`#edition-section > form ul li input[value=${iconId}]`).get(0);
}