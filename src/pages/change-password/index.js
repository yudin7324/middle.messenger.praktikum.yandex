import tpl from "./tpl.hbs";
import backBtnIcon from "../../../static/images/back-btn.png";

const data = {
  title: "Профиль - смена пароля",
  save: "Сохранить",
  fields: [
    {
      label: "Пароль",
      name: "oldPassword",
      type: "password",
    },
    {
      label: "Новый пароль",
      name: "newPassword",
      type: "password",
    },
    {
      label: "Повторите пароль",
      name: "confrimNewPassword",
      type: "password",
    },
  ],
  backIcon: backBtnIcon,
};

function changePasswordPage() {
  document.getElementById("root").innerHTML = tpl(data);
}

export default changePasswordPage;
