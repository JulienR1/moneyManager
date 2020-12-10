const PROOF_INPUT_ID = "proofStr";
const SELECT_FILE_STR = "Sélectionner un fichier";
let input;

document.addEventListener("DOMContentLoaded", () => {
  this.input = document.getElementById(PROOF_INPUT_ID);
  this.input.addEventListener("change", updateInputFieldOnChange);
});

function updateInputFieldOnChange(e){
  var fileName = getFileNameFromEvent(e);
  updateInputFieldValue(fileName);
}

function getFileNameFromEvent(e){
  var enteredValue = e.target.value;
  return enteredValue.split("\\").pop();
}

function updateInputFieldValue(fileName){
  if (fileName.length > 0) {
    this.input.previousElementSibling.innerHTML = fileName;
  } else {
    this.input.previousElementSibling.innerHTML = SELECT_FILE_STR;
  }
}