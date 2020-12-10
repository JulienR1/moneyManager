let onPickerClosedCallback = null;

function toggleDatePicker(event) {
    event.preventDefault();
    event.stopPropagation();

    function getSrcElement(e){
        return e.target;
    }

    let pickerSrcElement = getSrcElement(event);
    setPickerPosition(pickerSrcElement);
    togglePickerMultiple(pickerSrcElement, convertDateToString);
}

function convertDateToString(date, srcElement){
    month = addLeadingZeroToDate(date.getMonth() + 1);
    day = addLeadingZeroToDate(date.getDate());
    srcElement.value = date.getFullYear() + "-" + month + "-" + day;    

    if (onPickerClosedCallback !== null){
        onPickerClosedCallback();
    }
}

function setPickerPosition(parent){
    let offset = $(parent).offset();
    let picker = $("#datePicker");

    offset.top += 2 * $(parent).height();
    offset.left -= (picker.width() - $(parent).width()) / 2;
    picker.offset(offset);
}

function addLeadingZeroToDate(dateValue){
    return String(dateValue).padStart(2, "0");
}