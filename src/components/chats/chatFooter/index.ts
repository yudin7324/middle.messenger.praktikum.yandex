import tpl from "./tpl";
import { Component } from "../../../services";

type ChatFooterType = {};

class ChatFooter extends Component<ChatFooterType> {
  render(): DocumentFragment {
    const fragment: DocumentFragment = this.compile(tpl);

    return fragment;
  }
}

export default ChatFooter;
