import tpl from "./tpl.hbs";
import backBtnIcon from "../../../static/images/back-btn.png";

const data = {
  title: "Профиль",
  fields: [
    {
      label: "Почта",
      name: "mail",
      type: "text",
    },
    {
      label: "Логин",
      name: "login",
      type: "text",
    },
    {
      label: "Имя",
      name: "name",
      type: "text",
    },
    {
      label: "Фамилия",
      name: "last_name",
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
