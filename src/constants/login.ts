const loginValidationRules = {
  login: {
    required: true,
    errorMessage: "Логин не может быть пустым",
  },
  password: {
    required: true,
    errorMessage: "Пароль не может быть пустым",
  },
};

export default loginValidationRules;
