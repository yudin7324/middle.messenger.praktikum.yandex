import tpl from "./tpl.hbs";

const data = {
  title: "Регистрация",
  fields: [
    {
      label: "Почта",
      name: "email",
      type: "text",
    },
    {
      label: "Логин",
      name: "login",
      type: "text",
    },
    {
      label: "Имя",
      name: "first_name",
      type: "text",
    },
    {
      label: "Фамилия",
      name: "second_name",
      type: "text",
    },
    {
      label: "Телефон",
      name: "phone",
      type: "text",
    },
    {
      label: "Пароль",
      name: "password",
      type: "password",
    },
    {
      label: "Пароль (еще раз)",
      name: "confrim-password",
      type: "password",
    },
  ],
  button2: "Войти",
  button1: "Зарегестрироваться",
};

function signInPage() {
  document.getElementById("root").innerHTML = tpl(data);
}

export default signInPage;
