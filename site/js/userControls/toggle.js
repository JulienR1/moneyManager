let callbacks = [];

function toggle(event) {
  for (let i = 0; i < callbacks.length; i++) {
    callbacks[i]();
  }
}

function addCallback(callback) {
  if (!callbacks.includes(callback)) {
    callbacks.push(callback);
  }
}
