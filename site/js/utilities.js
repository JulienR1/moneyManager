function isFieldCompleted(fieldSelector){
    return $(fieldSelector).val();
  }
  
  function passRegex(field, regex){
    return regex.test($(field).val())
  }

  function preventEvent(element, eventName){
    element.addEventListener(eventName, (e) => {
      e.stopPropagation();
      e.preventDefault();
    })
  }