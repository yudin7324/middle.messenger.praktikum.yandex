import tpl from "./tpl";
import { Component } from "../../services";
import { Nav } from "../../components";

type ErrorType = {
  chatCard: HTMLElement;
  chatCardActive: HTMLElement;
  menuImage: string;
  chatFooter: HTMLElement;
};

class MainPage extends Component<ErrorType> {
  render(): DocumentFragment {
    const fragment: DocumentFragment = this.compile(tpl);

    return fragment;
  }
}

const nav = new Nav("nav", {
  links: [
    { linkPath: "/", linkName: "Домашняя страница" },
    { linkPath: "/login", linkName: "Логин" },
    { linkPath: "/sign-in", linkName: "Регистрация" },
    { linkPath: "/chat", linkName: "Чат" },
    { linkPath: "/profile", linkName: "Профиль" },
    { linkPath: "/change-password", linkName: "Изменение пароля" },
  ],
  attr: {
    class: "nav",
  },
});

const mainPage = new MainPage("div", {
  navigation: nav,
  attr: {
    class: "main",
  },
});

export default mainPage;
