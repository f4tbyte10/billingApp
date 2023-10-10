function filledFields(formulario) {
  for (const campo in formulario) {
    if (formulario[campo] === "") {
      return false;
    }
  }
  return true;
}

export { filledFields };
