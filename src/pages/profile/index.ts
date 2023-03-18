import tpl from "./tpl";
import { Component } from "../../services";
import { Button } from "../../components";
import {
  Avatar,
  Form,
  EmailTextField,
  LoginTextField,
  FirstNameTextField,
  SecondNameTextField,
  DisplayNameTextField,
  PhoneTextField,
} from "../../components/profile";
import backBtnIcon from "../../../static/images/back-btn.png";
import { UserController, ProfileController } from "../../controllers";
import { convertedFormData } from "../../utils";

type ProfilePageType = {
  backIcon: string;
  form: HTMLElement;
};

const logOutButton = new Button("button", {
  text: "Выйти",
  attr: {
    class: "button button_color-secondary",
    type: "button",
  },
  events: {
    click: () => {
      UserController.logout();
    },
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

const form = new Form("form", {
  saveButton: saveButton,
  changePasswordLink: changePasswordLink,
  emailTextField: EmailTextField,
  loginTextField: LoginTextField,
  firstNameTextField: FirstNameTextField,
  secondNameTextField: SecondNameTextField,
  displayNameField: DisplayNameTextField,
  phoneTextField: PhoneTextField,
  attr: {
    class: "profile__form",
  },
  events: {
    submit: (event: Event) => {
      event.preventDefault();
      const target = event.target as HTMLFormElement;
      const formValues = convertedFormData(target);

      ProfileController.change(target, formValues);
    },
  },
});

class ProfilePage extends Component<ProfilePageType> {
  constructor() {
    super("div", {
      avatar: Avatar,
      form: form,
      backIcon: backBtnIcon,
      logOutButton: logOutButton,
      attr: {
        class: "profile",
      },
    });
  }
  render(): DocumentFragment {
    return this.compile(tpl);
  }
}

export default ProfilePage;
