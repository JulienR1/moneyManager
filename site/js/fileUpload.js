let input;

document.addEventListener("DOMContentLoaded", () => {
  this.input = document.getElementById("proofStr");
  this.input.addEventListener("change", (e) => {
    var fileName = e.target.value.split("\\").pop();
    if (fileName.length > 0) {
      this.input.previousElementSibling.innerHTML = fileName;
    } else {
      this.input.previousElementSibling.innerHTML = "Sélectionner un fichier";
    }
  });
});
