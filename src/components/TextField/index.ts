import tpl from "./tpl";
import { Component } from "../../services";

type TextFieldType = {
  events: any;
  label: string;
  type: string;
  name: string;
  text: string;
};

class TextField extends Component<TextFieldType> {
  render(): DocumentFragment {
    const fragment: DocumentFragment = this.compile(tpl);

    return fragment;
  }

  addEvents(): void {
    this._element.querySelectorAll("input").forEach((input) => {
      input.addEventListener("focus", this._props.events?.focus);
      input.addEventListener("blur", this._props.events?.blur);
    });

    super.addEvents();
  }
}

export default TextField;
