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

const oldPasswordTextField = new TextField("div", {
  label: "Пароль",
  name: "oldPassword",
  type: "text",
  text: "Некорректные данные",
  attr: {
    class: "field field_dark",
  },
  events: {
    focus: (event: Event) => focusEvent(event),
    blur: (event: Event) =>
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
    focus: (event: Event) => focusEvent(event),
    blur: (event: Event) =>
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
    focus: (event: Event) => focusEvent(event),
    blur: (event: Event) =>
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

const changePasswordPage = new ChangePasswordPage("div", {
  form: form,
  backIcon: backBtnIcon,
  attr: {
    class: "profile",
  },
});

export default changePasswordPage;
