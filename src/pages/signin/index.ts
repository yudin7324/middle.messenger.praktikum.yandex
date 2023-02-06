import tpl from "./tpl";
import { Component } from "../../services";
import { Button, TextField, SignInForm } from "../../components";
import { signInData } from "../../constants";

type SignInPageType = {
  form: HTMLElement;
};

class SignInPage extends Component<SignInPageType> {
  render(): DocumentFragment {
    return this.compile(tpl);
  }
}

const { email, login, firstName, secondName, phone, password } = signInData;

const focusEvent = (event: Event) => {
  const target = event.target as HTMLElement;
  const parent = target.parentNode as HTMLElement;
  const error = parent.querySelector(".field__error-text") as HTMLElement;
  error.innerHTML = "";

  if (target.classList.contains("field__input_invalid")) {
    target.classList.remove("field__input_invalid");
  }
};

const blurEvent = (event: Event, errorText: string, pattern: RegExp) => {
  const target = event.target as HTMLInputElement;
  const parent = target.parentNode as HTMLElement;
  const value = target.value;

  const error = parent.querySelector(".field__error-text") as HTMLElement;

  if (!pattern.test(value)) {
    error.innerHTML = errorText;
    target.classList.add("field__input_invalid");
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
    focus: (event: Event) => focusEvent(event),
    blur: (event: Event) => blurEvent(event, email.errorText, email.pattern),
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
    focus: (event: Event) => focusEvent(event),
    blur: (event: Event) => blurEvent(event, login.errorText, login.pattern),
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
    focus: (event: Event) => focusEvent(event),
    blur: (event: Event) =>
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
    focus: (event: Event) => focusEvent(event),
    blur: (event: Event) =>
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
    focus: (event: Event) => focusEvent(event),
    blur: (event: Event) => blurEvent(event, phone.errorText, phone.pattern),
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
    focus: (event: Event) => focusEvent(event),
    blur: (event: Event) =>
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
    focus: (event: Event) => focusEvent(event),
    blur: (event: Event) =>
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
    submit: (event: Event) => {
      event.preventDefault();
      const errors: string[] = [];

      const target = event.target as HTMLElement;
      const textFields = target.querySelectorAll(".field");
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
