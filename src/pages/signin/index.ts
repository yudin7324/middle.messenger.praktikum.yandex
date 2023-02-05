import tpl from "./tpl";
import { Component } from "../../services";
import { Button, TextField, SignInForm } from "../../components";
import { signInData } from "../../constants";

type SignInPageType = {
  form: HTMLElement;
};

class SignInPage extends Component<SignInPageType> {
  compile: any;

  render() {
    return this.compile(tpl);
  }
}

const { email, login, firstName, secondName, phone, password } = signInData;

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

const emailTextField = new TextField("div", {
  label: "Почта",
  name: "email",
  type: "text",
  text: "Некорректные данные",
  attr: {
    class: "field",
  },
  events: {
    focus: (event: any) => focusEvent(event),
    blur: (event: any) => blurEvent(event, email.errorText, email.pattern),
  },
});

const loginTextField = new TextField("div", {
  name: "login",
  type: "text",
  label: "Логин",
  text: "Некорректные данные",
  attr: {
    class: "field",
  },
  events: {
    focus: (event: any) => focusEvent(event),
    blur: (event: any) => blurEvent(event, login.errorText, login.pattern),
  },
});

const firstNameTextField = new TextField("div", {
  name: "first_name",
  type: "text",
  label: "Имя",
  text: "Некорректные данные",
  attr: {
    class: "field",
  },
  events: {
    focus: (event: any) => focusEvent(event),
    blur: (event: any) =>
      blurEvent(event, firstName.errorText, firstName.pattern),
  },
});

const secondNameTextField = new TextField("div", {
  name: "second_name",
  type: "text",
  label: "Фамилия",
  text: "Некорректные данные",
  attr: {
    class: "field",
  },
  events: {
    focus: (event: any) => focusEvent(event),
    blur: (event: any) =>
      blurEvent(event, secondName.errorText, secondName.pattern),
  },
});

const phoneTextField = new TextField("div", {
  name: "phone",
  type: "text",
  label: "Телефон",
  text: "Некорректные данные",
  attr: {
    class: "field",
  },
  events: {
    focus: (event: any) => focusEvent(event),
    blur: (event: any) => blurEvent(event, phone.errorText, phone.pattern),
  },
});

const passwordTextField = new TextField("div", {
  name: "password",
  type: "password",
  label: "Пароль",
  text: "Некорректные данные",
  attr: {
    class: "field",
    autocomplete: "on",
  },
  events: {
    focus: (event: any) => focusEvent(event),
    blur: (event: any) =>
      blurEvent(event, password.errorText, password.pattern),
  },
});

const confirmPasswordTextField = new TextField("div", {
  name: "confirm_password",
  type: "password",
  label: "Пароль (еще раз)",
  text: "Некорректные данные",
  attr: {
    class: "field",
    autocomplete: "on",
  },
  events: {
    focus: (event: any) => focusEvent(event),
    blur: (event: any) =>
      blurEvent(event, password.errorText, password.pattern),
  },
});

const link = new Button("button", {
  text: "Зарегестрироваться",
  attr: {
    class: "button button_color-secondary",
  },
});

const button = new Button("a", {
  text: "Войти",
  attr: {
    class: "button button_border-secondary",
    href: "/",
  },
});

const form = new SignInForm("form", {
  emailTextField: emailTextField,
  loginTextField: loginTextField,
  firstNameTextField: firstNameTextField,
  secondNameTextField: secondNameTextField,
  phoneTextField: phoneTextField,
  passwordTextField: passwordTextField,
  confirmPasswordTextField: confirmPasswordTextField,
  button: button,
  link: link,
  title: "Регистрация",
  attr: {
    class: "sign-in__form",
    type: "submit",
  },
  events: {
    submit: (event: any) => {
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

const signInPage = new SignInPage("div", {
  form: form,
  attr: {
    class: "sign-in",
  },
});

export default signInPage;
