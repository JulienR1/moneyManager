document.addEventListener("DOMContentLoaded", onCategoriesLoaded);

let editionSection = document.getElementById("edition-section");
let categoryIdInput = document.getElementById("id-input");

let titleInput = $("#edition-section > form input").first();

let currentIconValue = -1;

function onCategoriesLoaded() {
  $("#category-section :input").change(onInputChange);
  $("section").click(catchClick);
  $(document).click(deselectInputs);
}

function onInputChange(event) {
  if (currentIconValue !== -1) {
    saveData();
  }

  editionSection.setAttribute("enabled", "");
  categoryIdInput.value = event.target.value;

  let iconUrl = $(event.target.nextSibling).find("i").attr("class");
  let categoryTitle = $(event.target.nextSibling).find("p").text();

  let iconList = $("#edition-section ul li");
  titleInput.val(categoryTitle);
  if (iconUrl !== undefined) {
    iconList.each(function () {
      if ($(this).find('i[class="' + iconUrl + '"]').length > 0) {
        var iconInput = $(this).find("input").get(0);
        iconInput.checked = true;
        currentIconValue = iconInput.value;
      }
    });
  } else {
    iconList.each(function () {
      $(this).find("input").get(0).checked = false;
    });
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
