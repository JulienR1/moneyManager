document.addEventListener("DOMContentLoaded", () => {
  let parent = $("#dateField");
  let offset = parent.offset();
  let picker = $("#datePicker");

  offset.top += 2 * parent.height();
  offset.left -= picker.width() / 2 - parent.width() / 2;
  picker.offset(offset);

  addCallback(function () {
    document.querySelector("form").toggleAttribute("toggled");
  });
});

function toggleDatePicker(event) {
  event.preventDefault();
  event.stopPropagation();

  let dateStr = document.getElementById("dateField").value;
  togglePicker(dateStr, (data) => {
    month = ((data.getMonth() + 1).toString().length == 1 ? "0" : "") + (data.getMonth() + 1);
    day = (data.getDate().toString().length == 1 ? "0" : "") + data.getDate();
    data = data.getFullYear() + "-" + month + "-" + day;
    document.getElementById("dateField").value = data;
    checkFormValidity();
  });
}
