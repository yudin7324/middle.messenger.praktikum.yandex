import tpl from "./tpl";
import { Component } from "../../../services";

type ChatMenuType = {
  attachImage: string;
  enterImage: string;
  chats: any;
};

class ChatMenu extends Component<ChatMenuType> {
  render(): DocumentFragment {
    const fragment: DocumentFragment = this.compile(tpl);

    return fragment;
  }
}

export default ChatMenu;
