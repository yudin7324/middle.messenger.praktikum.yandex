const changePasswordData = {
  oldPassword: {
    errorText:
      "Введите корректные данные, допускается от 8 до 40 символов, обязательно хотя бы одна заглавная буква и цифра.",
    pattern: /^(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,40}$/,
  },
  newPassword: {
    errorText:
      "Введите корректные данные, допускается от 8 до 40 символов, обязательно хотя бы одна заглавная буква и цифра.",
    pattern: /^(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,40}$/,
  },
};

export default changePasswordData;
