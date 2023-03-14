import tpl from "./tpl";
import { Component } from "../../services";
import { Button, TextField } from "../../components";
import { convertedFormData, focusEvent } from "../../utils";
import { SignInPageType } from "../../types/signin";
import { UserController } from "../../controllers";
import { Form } from "../../components/signIn";

const loginTextField = new TextField("div", {
  label: "Логин",
  type: "text",
  name: "login",
  text: "error",
  attr: {
    class: "field",
  },
  events: {
    focus: (event: Event) => focusEvent(event),
  },
});

const passwordTextField = new TextField("div", {
  label: "Пароль",
  type: "password",
  name: "password",
  text: "error",
  attr: {
    class: "field",
  },
  events: {
    focus: (event: Event) => focusEvent(event),
  },
});

const link = new Button("a", {
  text: "Нет аккаунта?",
  attr: {
    class: "button button_border-secondary",
    href: "/sign-up",
  },
});

const button = new Button("button", {
  text: "Авторизация",
  attr: {
    class: "button button_color-secondary",
    type: "submit",
  },
});

const form = new Form("form", {
  button: button,
  loginTextField: loginTextField,
  passwordTextField: passwordTextField,
  link: link,
  title: "Вход",
  attr: {
    class: "login__form",
  },
  events: {
    submit: (event: Event) => {
      event.preventDefault();
      const target = event.target as HTMLFormElement;
      const formValues = convertedFormData(target);

      UserController.login(target, formValues);
    },
  },
});

class SignInPage extends Component<SignInPageType> {
  constructor() {
    super("div", {
      form: form,
      attr: {
        class: "login",
      },
    });
  }
  render() {
    return this.compile(tpl);
  }
}

export default SignInPage;
