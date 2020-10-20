let toggleElement = document.getElementById("toggle");
let callbacks = [];

function toggle(event) {
  toggleElement.toggleAttribute("toggled");
  for (let i = 0; i < callbacks.length; i++) {
    callbacks[i]();
  }
}

function addCallback(callback) {
  if (!callbacks.includes(callback)) {
    callbacks.push(callback);
  }
}
