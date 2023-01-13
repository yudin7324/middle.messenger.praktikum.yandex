import tpl from "./tpl.hbs";

const data404 = {
  title: "404",
  subtitle: "Не туда попали",
  btnLabel: "Назад к чатам",
};

const data500 = {
  title: "500",
  subtitle: "Мы уже фиксим",
  btnLabel: "Назад к чатам",
};

function errorPage(error) {
  const variant = error === 404 ? data404 : data500;

  document.getElementById("root").innerHTML = tpl(variant);
}

export default errorPage;
