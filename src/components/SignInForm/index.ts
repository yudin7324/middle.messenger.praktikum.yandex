import tpl from "./tpl";
import { Component } from "../../services";

type SignInFormType = {
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

class SignInForm extends Component<SignInFormType> {
  render(): DocumentFragment {
    const fragment: DocumentFragment = this.compile(tpl);

    return fragment;
  }
}

export default SignInForm;
