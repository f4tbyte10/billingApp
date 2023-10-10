function filledFields(form) {
  for (const input in form) {
    if (form[input] === "") {
      return false;
    }
  }
  return true;
}

function filledFieldsArray(form) {
  let isFilled = true;
  form.forEach((item) => {
    for (const input in item) {
      if (item[input] === "") {
        isFilled = false;
      }
    }
  });
  return isFilled;
}

export { filledFields, filledFieldsArray };
