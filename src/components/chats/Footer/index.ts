import tpl from "./tpl";
import { Component } from "../../../services";

type FooterType = {};

class Footer extends Component<FooterType> {
  render(): DocumentFragment {
    const fragment: DocumentFragment = this.compile(tpl);

    return fragment;
  }
}

export default Footer;
