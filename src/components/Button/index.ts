import tpl from "./tpl";
import { Component } from "../../services";

type ButtonType = {
  text: string;
};

class Button extends Component<ButtonType> {
  render(): DocumentFragment {
    const fragment: DocumentFragment = this.compile(tpl);

    return fragment;
  }
}

export default Button;
