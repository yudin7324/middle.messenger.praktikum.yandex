import tpl from "./tpl";
import { Component } from "../../services";
import { Button, TextField, ProfileForm } from "../../components";
import backBtnIcon from "../../../static/images/back-btn.png";
import { profileData } from "../../constants";

type ProfilePageType = {
  backIcon: string;
  form: HTMLElement;
};

class ProfilePage extends Component<ProfilePageType> {
  render(): DocumentFragment {
    return this.compile(tpl);
  }
}

const { email, login, firstName, secondName, phone, displayName } = profileData;

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
    class: "field field_dark",
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
    class: "field field_dark",
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
    class: "field field_dark",
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
    class: "field field_dark",
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
    class: "field field_dark",
  },
  events: {
    focus: (event: any) => focusEvent(event),
    blur: (event: any) => blurEvent(event, phone.errorText, phone.pattern),
  },
});

const displayNameField = new TextField("div", {
  name: "display_name",
  type: "text",
  label: "Имя в чате",
  text: "Некорректные данные",
  attr: {
    class: "field field_dark",
  },
  events: {
    focus: (event: any) => focusEvent(event),
    blur: (event: any) =>
      blurEvent(event, displayName.errorText, displayName.pattern),
  },
});

const logOutButton = new Button("button", {
  text: "Выйти",
  attr: {
    class: "button button_color-secondary",
    type: "button",
  },
});

const saveButton = new Button("button", {
  text: "Сохранить",
  attr: {
    class: "button button_color-secondary",
    type: "submit",
  },
});

const changePasswordLink = new Button("a", {
  text: "Изменить пароль",
  attr: {
    class: "button button_color-primary",
    href: "/change-password",
  },
});

const form = new ProfileForm("form", {
  logOutButton: logOutButton,
  saveButton: saveButton,
  changePasswordLink: changePasswordLink,
  emailTextField: emailTextField,
  loginTextField: loginTextField,
  firstNameTextField: firstNameTextField,
  secondNameTextField: secondNameTextField,
  displayNameField: displayNameField,
  phoneTextField: phoneTextField,
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

const profilePage = new ProfilePage("div", {
  form: form,
  backIcon: backBtnIcon,
  attr: {
    class: "profile",
  },
});

export default profilePage;
