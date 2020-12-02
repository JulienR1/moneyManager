document.addEventListener("DOMContentLoaded", onCategoriesLoaded);

let editionSection = document.getElementById("edition-section");
let categoryIdInput = document.getElementById("id-input");

let titleInput = $("#edition-section > form input").first();
let colorInput = $(titleInput.next()[0]);

let currentIconValue = -1;
let currentCategoryColor = null;

function onCategoriesLoaded() {
  $("#category-section :input").change(onInputChange);
  $("section").click(catchClick);
  $(document).click(deselectInputs);
  $(colorInput).keyup(validateColorInput);
}

function onInputChange(event) {
  if (currentIconValue !== -1) {
    saveData();
  }

  editionSection.setAttribute("enabled", "");
  categoryIdInput.value = event.target.value;

  let iconUrl = $(event.target.nextSibling).find("i").attr("class");
  let categoryTitle = $(event.target.nextSibling).find("p").text();
  currentCategoryColor = $(event.target.nextSibling).attr("color");

  let iconList = $("#edition-section ul li");
  titleInput.val(categoryTitle);
  colorInput.val(currentCategoryColor);
  if (iconUrl !== undefined) {
    iconList.each(function () {      
      if ($(this).find('i[class="' + iconUrl + '"]').length > 0) {        
        var iconInput = $(this).find("input").get(0);
        iconInput.checked = true;        
        currentIconValue = iconInput.value;
      }      
    });
    updateCategoryIconsColor();
  } else {
    iconList.each(function () {      
      var iconInput = $(this).find("input").get(0);
      iconInput.checked = false;
      iconInput.nextSibling.style = ""      
    });
  }
}

function updateCategoryIconsColor(){
  document.querySelectorAll("#edition-section form li label").forEach((label)=>{
    label.style = "--color: #" + currentCategoryColor;
  });
}

function validateColorInput(){
  var newColorInput = colorInput.val();
  let regex = /^[0-9,a-f]{6}$/i;
  if(regex.test(newColorInput)){
    currentCategoryColor = newColorInput;
    updateCategoryIconsColor();
  }
}

function catchClick(event) {
  event.stopPropagation();
}

function deselectInputs(event) {
  saveData();

  $("#category-section :input").each(function () {
    $(this).get(0).checked = false;
  });
  editionSection.removeAttribute("enabled");
  categoryIdInput.value = "";
  currentIconValue = -1;
}

function saveData() {
  $.ajax({
    type: "POST",
    url: "/categories?save=1",
    data: $("#edition-section > form").serialize(),
    success: onSaveSuccess,
    error: function(jqXHR, textStatus, errorThrown){
      console.log(jqXHR + '-' + textStatus + '-' + errorThrown);
      return false;
  }
  });
}

function onSaveSuccess(data) {
  if (data["success"] === true) {
    let checkedCategoryId = $("#category-section  input:checked").val();
    setTimeout(() => {
      var categoryList = $("#category-section ul");
      var newCategoryHTML = "<li>" + categoryList.find("li").last().html() + "</li>";
      categoryList.html(data["html"] + newCategoryHTML);

      if (checkedCategoryId !== undefined) {
        $("#category-section input[value='" + checkedCategoryId + "']").get(0).checked = true;
      }
      $("#category-section :input").change(onInputChange);
    }, 400);
  } else {
    console.log("save error");
  }
}
