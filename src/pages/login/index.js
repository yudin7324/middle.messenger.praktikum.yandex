import tpl from "./tpl.hbs";

const data = {
  title: "Вход",
  fields: [
    {
      label: "Логин",
      name: "login",
      type: "text",
    },
    {
      label: "Пароль",
      name: "password",
      type: "password",
    },
  ],
  button2: "Авторизация",
  button1: "Нет аккаунта?",
};

function loginPage() {
  document.getElementById("root").innerHTML = tpl(data);
}

export default loginPage;
