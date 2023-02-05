import tpl from "./tpl";
import { Component } from "../../services";
import { Button, TextField, ChangePasswordForm } from "../../components";
import backBtnIcon from "../../../static/images/back-btn.png";
import { changePasswordData } from "../../constants";

type ChangePasswordPageType = {
  backIcon: string;
  form: HTMLElement;
};

class ChangePasswordPage extends Component<ChangePasswordPageType> {
  render() {
    return this.compile(tpl);
  }
}

const { oldPassword, newPassword, confrimNewPassword } = changePasswordData;

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

const oldPasswordTextField = new TextField("div", {
  label: "Пароль",
  name: "oldPassword",
  type: "text",
  text: "Некорректные данные",
  attr: {
    class: "field field_dark",
  },
  events: {
    focus: (event: any) => focusEvent(event),
    blur: (event: any) =>
      blurEvent(event, oldPassword.errorText, oldPassword.pattern),
  },
});

const newPasswordTextField = new TextField("div", {
  label: "Новый пароль",
  name: "newPassword",
  type: "text",
  text: "Некорректные данные",
  attr: {
    class: "field field_dark",
  },
  events: {
    focus: (event: any) => focusEvent(event),
    blur: (event: any) =>
      blurEvent(event, newPassword.errorText, newPassword.pattern),
  },
});

const confrimNewPasswordTextField = new TextField("div", {
  label: "Повторите пароль",
  name: "confrimNewPassword",
  type: "text",
  text: "Некорректные данные",
  attr: {
    class: "field field_dark",
  },
  events: {
    focus: (event: any) => focusEvent(event),
    blur: (event: any) =>
      blurEvent(
        event,
        confrimNewPassword.errorText,
        confrimNewPassword.pattern
      ),
  },
});

const saveButton = new Button("button", {
  text: "Сохранить",
  attr: {
    class: "button button_color-secondary",
    type: "submit",
  },
});

const form = new ChangePasswordForm("form", {
  oldPasswordTextField: oldPasswordTextField,
  newPasswordTextField: newPasswordTextField,
  confrimNewPasswordTextField: confrimNewPasswordTextField,
  saveButton: saveButton,
  attr: {
    class: "profile__form",
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
        const dataArray = elements.map((element: any) => {
          const input = element.querySelector("input");

          return {
            name: input.name,
            value: input.value,
          };
        });

        console.log(dataArray);
      }
    },
  },
});

const changePasswordPage = new ChangePasswordPage("div", {
  form: form,
  backIcon: backBtnIcon,
  attr: {
    class: "profile",
  },
});

export default changePasswordPage;
