import tpl from "./tpl";
import { Component } from "../../../services";

type MenuBtnType = {};

class MenuBtn extends Component<MenuBtnType> {
  render(): DocumentFragment {
    const fragment: DocumentFragment = this.compile(tpl);

    return fragment;
  }
}

export default MenuBtn;
