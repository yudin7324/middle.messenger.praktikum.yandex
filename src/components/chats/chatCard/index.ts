import tpl from "./tpl";
import { Component } from "../../../services";

type ChatCardType = {
  name: string;
  time: string;
  lastMessage: string;
  countMessage: string;
};

class ChatCard extends Component<ChatCardType> {
  render(): DocumentFragment {
    const fragment: DocumentFragment = this.compile(tpl);

    return fragment;
  }
}

export default ChatCard;
