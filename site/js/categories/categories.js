const EXISTING_CATEGORIES_CONTAINER = "#category-section ul";
const EXISTING_CATEGORIES = "#category-section :input";
const ICON_INPUT_LIST = "#edition-section ul li";
const EDITION_LABEL = "#edition-section form li label";

const CHECKED_INPUT_ON_SAVE = "#category-section input:checked";
const UPDATE_DELAY = 400;

const ENABLED_ATTR = "enabled";
const HEX_REGEX = /^[0-9,a-f]{6}$/i;

document.addEventListener("DOMContentLoaded", onCategoriesLoaded);

let editionSection = document.getElementById("edition-section");
let categoryIdInput = document.getElementById("id-input");

let titleInput = $("#edition-section > form input").first();
let colorInput = $(titleInput.next()[0]);

let currentIconValue = -1;
let currentCategoryColor = null;

function onCategoriesLoaded() {
  $(EXISTING_CATEGORIES).change(onCategoryChange);
  $("section").click(catchClick);
  $(document).click(deselectInputs);
  $(colorInput).keyup(validateColorInput);
}

function onCategoryChange(event) {
  if (currentIconValue !== -1) {
    saveData();
  }

  editionSection.setAttribute(ENABLED_ATTR, "");
  categoryIdInput.value = event.target.value;

  categoryData = getCategoryData(event);
  titleInput.val(categoryData.title);
  colorInput.val(categoryData.color);
  currentCategoryColor = categoryData.color;
  
  let iconInputList = document.querySelectorAll(ICON_INPUT_LIST);
  iconInputList.forEach((icon) => {
    setIconState(icon, categoryData);
   });
   updateCategoryIconsColor();
}

function isTargetIcon(currentIcon, targetIcon){
  return $(currentIcon).find(`i[class="${targetIcon}"]`).length > 0;
}

function setIconState(icon, categoryData){
  let iconIsValid = categoryData.iconUrl !== undefined;  
  if (iconIsValid && isTargetIcon(icon, categoryData.iconUrl)){
    enableIcon(icon);
  } else {
    disableIcon(icon);
  }
}

function disableIcon(icon){
  var iconInput = $(icon).find("input").get(0);
  iconInput.checked = false;
  iconInput.nextSibling.style = "";;  
}

function enableIcon(icon, color){
  var iconInput = $(icon).find("input").get(0);
  iconInput.checked = true;
  currentIconValue = iconInput.value;
}

function getCategoryData(onCategoryChangeEvent){
  return {
    iconUrl: $(onCategoryChangeEvent.target.nextSibling).find("i").attr("class"),
    title: $(onCategoryChangeEvent.target.nextSibling).find("p").text(),
    color: $(onCategoryChangeEvent.target.nextSibling).attr("color")
  };
}

function updateCategoryIconsColor(){
  document.querySelectorAll(EDITION_LABEL).forEach((label)=>{
    label.style = "--color: #" + currentCategoryColor;
  });
}

function validateColorInput(){
  if(passRegex(colorInput, HEX_REGEX)){
    currentCategoryColor = colorInput.val();
    updateCategoryIconsColor();
  }
}

function catchClick(event) {
  event.stopPropagation();
}

function deselectInputs(event) {
  saveData();
  
  $(EXISTING_CATEGORIES).each(function () {
    $(this).get(0).checked = false;
  });
  editionSection.removeAttribute(ENABLED_ATTR);
  categoryIdInput.value = "";
  currentIconValue = -1;
}

function saveData() {
  $.ajax({
    type: "POST",
    url: "/categories?save=1",
    data: $("#edition-section > form").serialize(),
    success: onSaveSuccess,
    error: onSaveError
  });
}

function onSaveSuccess(data) {
  if (data["success"] === true) {
    reloadCategoryData(data);
  } else if(!data["identicalData"]) {
    console.log("save error");
  }
}

function reloadCategoryData(data){
  let checkedCategoryId = $(CHECKED_INPUT_ON_SAVE).val();
  setTimeout(() => { 
    reloadCategoryHtml(data["html"]);
    selectPreviousCategory(checkedCategoryId);
    $(EXISTING_CATEGORIES).change(onCategoryChange);
   }, UPDATE_DELAY);
}

function reloadCategoryHtml(categoriesHtml){  
  var categoryList = $(EXISTING_CATEGORIES_CONTAINER);
  var newCategoryHtml = getNewCategoryHtml(categoryList);
  categoryList.html(categoriesHtml + newCategoryHtml);
}

function getNewCategoryHtml(categoryList){
  return "<li>" + categoryList.find("li").last().html() + "</li>";    
}

function selectPreviousCategory(checkedCategoryId){
  if (checkedCategoryId !== undefined) {
    $("#category-section input[value='" + checkedCategoryId + "']").get(0).checked = true;
  }
}

function onSaveError(jqXHR, textStatus, errorThrown){
  console.log(jqXHR + '-' + textStatus + '-' + errorThrown);
  return false;
}