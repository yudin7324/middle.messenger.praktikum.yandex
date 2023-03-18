import tpl from "./tpl";
import { Component } from "../../services";

type SignUpFormType = {
  emailTextField: HTMLElement;
  loginTextField: HTMLElement;
  firstNameTextField: HTMLElement;
  secondNameTextField: HTMLElement;
  phoneTextField: HTMLElement;
  passwordTextField: HTMLElement;
  confirmPasswordTextField: HTMLElement;
  link: HTMLElement;
  button: HTMLElement;
};

class SignUpForm extends Component<SignUpFormType> {
  render(): DocumentFragment {
    const fragment: DocumentFragment = this.compile(tpl);

    return fragment;
  }
}

export default SignUpForm;
