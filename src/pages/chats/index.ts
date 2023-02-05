import tpl from "./tpl";
import enterImage from "../../../static/images/enter.png";
import attachImage from "../../../static/images/attach.png";
import menuImage from "../../../static/images/menu.png";
import { Component } from "../../services";
import { ChatCard, ChatFooter } from "../../components/chats";

type ErrorType = {
  chatCard: HTMLElement;
  chatCardActive: HTMLElement;
  menuImage: string;
  chatFooter: HTMLElement;
};

class ChatsPage extends Component<ErrorType> {
  render(): DocumentFragment {
    const fragment: DocumentFragment = this.compile(tpl);

    return fragment;
  }
}

const chatCard = new ChatCard("div", {
  name: "Илья",
  countMessage: "1",
  time: "10:45",
  lastMessage: "Привет",
  attr: {
    class: "chat-card",
  },
});

const chatCardActive = new ChatCard("div", {
  name: "Андрей",
  countMessage: "2",
  time: "10:45",
  lastMessage: "Пока",
  attr: {
    class: "chat-card chat-card--active",
  },
});

const chatFooter = new ChatFooter("form", {
  enterImage: enterImage,
  attachImage: attachImage,
  attr: {
    class: "chat__footer",
    type: "submit",
  },
  events: {
    submit: (event: any) => {
      event.preventDefault();
      const inputMessage = event.target.querySelector("input");

      if (inputMessage.value) {
        const data = {
          name: "message",
          value: inputMessage.value,
        };

        console.log(data);
        inputMessage.value = "";
      }
    },
  },
});

const signInPage = new ChatsPage("div", {
  chatCard: chatCard,
  chatCardActive: chatCardActive,

  menuImage: menuImage,
  chatFooter: chatFooter,
  attr: {
    class: "chats-page",
  },
});

export default signInPage;
