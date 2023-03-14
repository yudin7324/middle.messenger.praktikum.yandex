import tpl from "./tpl";
import { Component } from "../../services";
import { Button, TextField, SignUpForm } from "../../components";
import { convertedFormData, focusEvent } from "../../utils";
import { SignUpController } from "../../controllers";

type SignupPageType = {
  form: HTMLElement;
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

const form = new SignUpForm("form", {
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
    class: "sign-up__form",
    type: "submit",
  },
  events: {
    submit: (event: Event) => {
      event.preventDefault();
      const target = event.target as HTMLFormElement;
      const formValues = convertedFormData(target);

      const signUpController = new SignUpController();
      signUpController.signUp(target, formValues);
    },
  },
});

class SignupPage extends Component<SignupPageType> {
  constructor() {
    super("div", {
      form: form,
      attr: {
        class: "sign-up",
      },
    });
  }

  render(): DocumentFragment {
    return this.compile(tpl);
  }
}

export default SignupPage;
