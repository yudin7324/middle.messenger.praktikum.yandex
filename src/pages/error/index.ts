import tpl from "./tpl";
import { Component } from "../../services";
import { Button } from "../../components";

type ErrorType = {
  title: string;
  subtitle: string;
  link: HTMLElement;
};

class ErrorPage extends Component<ErrorType> {
  render() {
    return this.compile(tpl);
  }
}

const link = new Button("a", {
  text: "Назад к чатам",
  attr: {
    class: "error__link",
    href: "/chat",
  },
});

const errorPage = new ErrorPage("div", {
  link: link,
  title: "404",
  attr: {
    class: "error",
  },
});

export default errorPage;
