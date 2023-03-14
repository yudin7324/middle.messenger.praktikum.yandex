import tpl from "./tpl";
import { Component } from "../../services";
import { Sidebar, Chat } from "../../components/chats";
import { ChatsController, UserController } from "../../controllers";

type ErrorType = {
  chatCard: HTMLElement;
  chatCardActive: HTMLElement;
  menuImage: string;
  chatFooter: HTMLElement;
};

class ChatsComponent extends Component<ErrorType> {
  constructor() {
    ChatsController.getChats();
    UserController.getUser();

    super("div", {
      sidebar: Sidebar,
      chat: Chat,
      attr: {
        class: "chats-page",
      },
    });
  }

  render(): DocumentFragment {
    const fragment: DocumentFragment = this.compile(tpl);

    return fragment;
  }
}

export default ChatsComponent;
