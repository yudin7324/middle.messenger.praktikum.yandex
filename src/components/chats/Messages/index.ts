import tpl from "./tpl";
import { Component } from "../../../services";
import { Connect } from "../../../services/store";

type MessagesType = {};

class MessagesComponent extends Component<MessagesType> {
  render(): DocumentFragment {
    const fragment: DocumentFragment = this.compile(tpl);

    return fragment;
  }
}

const MessagesConnect = Connect(MessagesComponent, (state: any) => {
  const userId = state?.user?.id;

  const messages =
    state?.messages?.map((message: any) => {
      return {
        ...message,
        time: new Date(message.time).toLocaleTimeString().slice(0, 5),
        own: userId === message.user_id,
      };
    }) || [];

  return {
    messages: messages,
  };
});

const Messages = new MessagesConnect("ul", {
  messages: [],
  attr: {
    class: "messages",
  },
});

export default Messages;
