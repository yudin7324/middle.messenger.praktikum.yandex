import tpl from "./tpl";
import { Component } from "../../services";
import { Button } from "../../components";
import { Router } from "../../services/router";

type ErrorType = {
  title: string;
  subtitle: string;
  link: HTMLElement;
};

const button = new Button("button", {
  text: "Назад",
  attr: {
    class: "error__button",
  },
  events: {
    click: () => {
      Router.back();
    },
  },
});

class errorPage extends Component<ErrorType> {
  constructor() {
    super("div", {
      title: "404",
      subtitle: "Страница не найдена",
      button,
      attr: {
        class: "error",
      },
    });
  }
  render() {
    return this.compile(tpl);
  }
}

export default errorPage;
