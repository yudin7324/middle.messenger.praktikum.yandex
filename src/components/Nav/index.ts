import tpl from "./tpl";
import { Component } from "../../services";

type NavType = {
  links: {
    linkPath: string;
    linkName: string;
  }[];
};

class Nav extends Component<NavType> {
  render(): DocumentFragment {
    const fragment: DocumentFragment = this.compile(tpl);

    return fragment;
  }
}

export default Nav;
