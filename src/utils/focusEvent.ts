const focusEvent = (event: Event) => {
  const target = event.target as HTMLElement;
  const parent = target.parentNode as HTMLElement;
  const error = parent.querySelector(".field__error-text") as HTMLElement;
  error.innerHTML = "";

  if (target.classList.contains("field__input_invalid")) {
    target.classList.remove("field__input_invalid");
  }
};

export default focusEvent;
