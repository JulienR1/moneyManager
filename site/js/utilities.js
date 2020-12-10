function isFieldCompleted(fieldSelector){
    return $(fieldSelector).val();
  }
  
  function passRegex(field, regex){
    return regex.test($(field).val())
  }