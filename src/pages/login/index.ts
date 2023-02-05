import tpl from "./tpl";
import { Component } from "../../services";
import { Button, TextField, LoginForm } from "../../components";

type LoginPageType = {
  form: HTMLElement;
};

class LoginPage extends Component<LoginPageType> {
  render() {
    return this.compile(tpl);
  }
}

const focusEvent = (event: any) => {
  const parent = event.target.parentNode;
  const error = parent.querySelector(".field__error-text");
  error.innerHTML = "";

  if (event.target.classList.contains("field__input_invalid")) {
    event.target.classList.remove("field__input_invalid");
  }
};

const blurEvent = (event: any, errorText: string, pattern: RegExp) => {
  const value = event.target.value;
  const parent = event.target.parentNode;
  const error = parent.querySelector(".field__error-text");

  if (!pattern.test(value)) {
    error.innerHTML = errorText;
    event.target.classList.add("field__input_invalid");
  } else {
    error.innerHTML = "";
  }
};

const loginTextField = new TextField("div", {
  label: "Логин",
  type: "text",
  name: "login",
  text: "error",
  attr: {
    class: "field",
  },
  events: {
    focus: (event: any) => focusEvent(event),
    blur: (event: any) =>
      blurEvent(
        event,
        "Введите корректные данные",
        /^(?!\d+$)(?![-_]{2,})(?!.*[^a-zA-Z0-9_-])([a-zA-Z0-9][-_]?){3,20}$/
      ),
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
    focus: (event: {
      target: { classList: { remove: (arg0: string) => void } };
    }) => {
      event.target.classList.remove("field__input_invalid");
    },
  },
});

const link = new Button("a", {
  text: "Нет аккаунта?",
  attr: {
    class: "button button_border-secondary",
    href: "/sign-in",
  },
});

const button = new Button("button", {
  text: "Авторизация",
  attr: {
    class: "button button_color-secondary",
    type: "submit",
  },
});

const form = new LoginForm("form", {
  button: button,
  loginTextField: loginTextField,
  passwordTextField: passwordTextField,
  link: link,
  title: "Вход",
  attr: {
    class: "login__form",
  },
  events: {
    submit: (event: {
      preventDefault: () => void;
      target: { querySelectorAll: (arg0: string) => any };
    }) => {
      event.preventDefault();
      const errors: string[] = [];

      const textFields = event.target.querySelectorAll(".field");
      const elements = Array.from(textFields);

      elements.forEach((element: HTMLInputElement) => {
        const input = element.querySelector("input");
        const errorText = element.querySelector(".field__error-text");

        if (input && !input.value && errorText) {
          input.classList.add("field__input_invalid");
          errorText.innerHTML = "Обязательное для заполнения поле";
          errors.push(`${element.name} is required`);
        }
      });

      if (errors.length <= 0) {
        const dataArray = elements.map((element: HTMLElement) => {
          const input = element.querySelector("input");

          return {
            name: input ? input.name : "",
            value: input ? input.value : "",
          };
        });

        console.log(dataArray);
      }
    },
  },
});

const loginPage = new LoginPage("div", {
  form: form,
  attr: {
    class: "login",
  },
});

export default loginPage;
