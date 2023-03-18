import tpl from "./tpl";
import { Component } from "../../services";
import { Button, TextField } from "../../components";
import { Form } from "../../components/changePassword";
import backBtnIcon from "../../../static/images/back-btn.png";
import { convertedFormData, focusEvent, blurEvent } from "../../utils";
import { ProfileController } from "../../controllers";

type ChangePasswordPageType = {
  backIcon: string;
  form: HTMLElement;
};

const oldPasswordTextField = new TextField("div", {
  label: "Пароль",
  name: "oldPassword",
  type: "password",
  text: "Некорректные данные",
  attr: {
    class: "field field_dark",
  },
  events: {
    focus: (event: Event) => focusEvent(event),
    blur: (event: Event) => blurEvent(event),
  },
});

const newPasswordTextField = new TextField("div", {
  label: "Новый пароль",
  name: "newPassword",
  type: "password",
  text: "Некорректные данные",
  attr: {
    class: "field field_dark",
  },
  events: {
    focus: (event: Event) => focusEvent(event),
    blur: (event: Event) => blurEvent(event),
  },
});

const saveButton = new Button("button", {
  text: "Сохранить",
  attr: {
    class: "button button_color-secondary",
    type: "submit",
  },
});

const form = new Form("form", {
  oldPasswordTextField: oldPasswordTextField,
  newPasswordTextField: newPasswordTextField,
  saveButton: saveButton,
  attr: {
    class: "profile__form",
  },
  events: {
    submit: (event: Event) => {
      event.preventDefault();
      const target = event.target as HTMLFormElement;
      const formValues = convertedFormData(target);

      ProfileController.changePassword(target, formValues);
    },
  },
});

class ChangePasswordPage extends Component<ChangePasswordPageType> {
  constructor() {
    super("div", {
      form: form,
      backIcon: backBtnIcon,
      attr: {
        class: "profile",
      },
    });
  }

  render() {
    return this.compile(tpl);
  }
}

export default ChangePasswordPage;
