import tpl from "./tpl";
import { Component } from "../../../../services";

type SidebarType = {
  attachImage: string;
  enterImage: string;
};

class Form extends Component<SidebarType> {
  render(): DocumentFragment {
    const fragment: DocumentFragment = this.compile(tpl);

    return fragment;
  }
}

export default Form;
