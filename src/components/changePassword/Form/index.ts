import tpl from "./tpl";
import { Component } from "../../../services";

type ChangePasswordFormType = {
  oldPasswordTextField: HTMLElement;
  newPasswordTextField: HTMLElement;
  confrimNewPasswordTextField: HTMLElement;
  saveButton: HTMLElement;
};

class Form extends Component<ChangePasswordFormType> {
  render(): DocumentFragment {
    const fragment: DocumentFragment = this.compile(tpl);

    return fragment;
  }
}

export default Form;
