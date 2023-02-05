import tpl from "./tpl.hbs";
import backBtnIcon from "../../../static/images/back-btn.png";

const data = {
  title: "Профиль",
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
      label: "Имя в чате",
      name: "display_name",
      type: "text",
    },
    {
      label: "Телефон",
      name: "phone",
      type: "text",
    },
  ],
  logOut: "Выйти",
  save: "Сохранить",
  changePassword: "Изменить пароль",
  backIcon: backBtnIcon,
};

function profilePage() {
  document.getElementById("root").innerHTML = tpl(data);
}

export default profilePage;
