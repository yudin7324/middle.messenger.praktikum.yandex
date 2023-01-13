import tpl from "./tpl.hbs";

const data = {
  title: "Чат",
  back: "Назад",
  subtitle: "Чат находится в процессе разработки",
};

function chatPage() {
  document.getElementById("root").innerHTML = tpl(data);
}

export default chatPage;
