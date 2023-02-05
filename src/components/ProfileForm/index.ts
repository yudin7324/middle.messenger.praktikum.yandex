import tpl from "./tpl";
import { Component } from "../../services";

type ProfileFormType = {
  logOutButton: HTMLElement;
  emailTextField: HTMLElement;
  loginTextField: HTMLElement;
  firstNameTextField: HTMLElement;
  secondNameTextField: HTMLElement;
  displayNameField: HTMLElement;
  phoneTextField: HTMLElement;
  saveButton: HTMLElement;
  changePasswordLink: HTMLElement;
};

class ProfileForm extends Component<ProfileFormType> {
  render(): DocumentFragment {
    const fragment: DocumentFragment = this.compile(tpl);

    return fragment;
  }
}

export default ProfileForm;
