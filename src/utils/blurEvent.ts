const blurEvent = (event: Event) => {
  const target = event.target as HTMLInputElement;
  const value = target.value;
  const error = target.parentNode?.querySelector(".field__error-text");

  if (!value && error) {
    error.innerHTML = "Поле не может быть пустым";
    target.classList.add("field__input_invalid");
    return;
  }
};

export default blurEvent;
