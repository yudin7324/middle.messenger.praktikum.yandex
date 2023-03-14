import tpl from "./tpl";
import { Component } from "../../../services";

type FormType = {
  title: string;
  loginTextField: HTMLElement;
  passwordTextField: HTMLElement;
  button: HTMLElement;
  link: HTMLElement;
};

class Form extends Component<FormType> {
  render(): DocumentFragment {
    const fragment: DocumentFragment = this.compile(tpl);

    return fragment;
  }
}

export default Form;
