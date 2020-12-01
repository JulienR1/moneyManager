function toggleDatePicker(event) {
  event.preventDefault();
  event.stopPropagation();
  
  setPickerPosition(event.target);

  let currentId = event.target.id;
  let dateStr = event.target.value;
  togglePickerMultiple(dateStr, currentId, (data) => {
    month = ((data.getMonth() + 1).toString().length == 1 ? "0" : "") + (data.getMonth() + 1);
    day = (data.getDate().toString().length == 1 ? "0" : "") + data.getDate();
    data = data.getFullYear() + "-" + month + "-" + day;      
    event.target.value = data;
    loadData(null);
  });
}

function setPickerPosition(parent){
  let offset = $(parent).offset();
  let picker = $("#datePicker");

  offset.top += 2 * $(parent).height();
  offset.left -= picker.width() / 2 - $(parent).width() / 2;
  picker.offset(offset);
}
