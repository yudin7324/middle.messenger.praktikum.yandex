const blurEvent = (event: Event, errorText: string, pattern?: RegExp) => {
  const target = event.target as HTMLInputElement;
  const parent = target.parentNode as HTMLElement;
  const value = target.value;

  const error = parent.querySelector(".field__error-text") as HTMLElement;

  if (!pattern?.test(value)) {
    error.innerHTML = errorText;
    target.classList.add("field__input_invalid");
  } else {
    error.innerHTML = "";
  }
};

export default blurEvent;
