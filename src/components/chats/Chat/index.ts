import tpl from "./tpl";
import { Component } from "../../../services";
import { Connect } from "../../../services/store";
import {
  ChatFooter,
  Messages,
  MenuBtn,
  ChatMenu,
} from "../../../components/chats";
import { AddUserModal, DeleteUserModal } from "../../../components/modals";
import enterImage from "../../../../static/images/enter.png";
import attachImage from "../../../../static/images/attach.png";
import menuImage from "../../../../static/images/menu.png";
import { ChatsController } from "../../../controllers";
import Store from "../../../services/store";

type ChatType = {};

class ChatComponent extends Component<ChatType> {
  render(): DocumentFragment {
    const fragment: DocumentFragment = this.compile(tpl);

    return fragment;
  }
}

const ChatConnect = Connect(ChatComponent, (state: any) => {
  return {
    currentChat: state.currentChat,
    title: state.currentChat?.title,
    avatar: state.currentChat?.avatar,
  };
});

const chatFooter = new ChatFooter("form", {
  enterImage: enterImage,
  attachImage: attachImage,
  attr: {
    class: "chat__footer",
    type: "submit",
  },
  events: {
    submit: (event: Event) => {
      event.preventDefault();
      const target = event.target as HTMLElement;
      const input = target.querySelector("input") as HTMLInputElement;

      ChatsController.sendMessage(input.value);

      input.value = "";
    },
  },
});

const menuButton = new MenuBtn("button", {
  menuImage: menuImage,
  attr: {
    class: "chat__menu-btn",
  },
  events: {
    click: (event: Event) => {
      event.preventDefault();
      const target = event.target as HTMLElement;
      const menu = target.closest(".chat")?.querySelector(".chat-menu");

      if (menu) {
        menu.classList.toggle("chat-menu_active");
      }
    },
  },
});

const chatMenu = new ChatMenu("div", {
  attr: {
    class: "chat-menu",
  },
  events: {
    click: (event: Event) => {
      event.preventDefault();
      const target = event.target as HTMLElement;
      const menu = target.closest(".chat-menu");
      const state = Store.getState();
      const currentChatId = state.currentChat.id;

      if (menu) {
        menu.classList.toggle("chat-menu_active");
      }

      if (target.classList.contains("chat-menu__item")) {
        const id = target.id;

        switch (id) {
          case "delete-chat":
            ChatsController.deleteChat(currentChatId);
            break;
          case "add-user":
            target
              .closest(".chat")
              ?.querySelector("#add-user-modal")
              ?.classList.add("modal_active");

            break;
          case "delete-user":
            target
              .closest(".chat")
              ?.querySelector("#delete-user-modal")
              ?.classList.add("modal_active");
            break;
        }
      }
    },
  },
});

const Chat = new ChatConnect("div", {
  chatFooter: chatFooter,
  messages: Messages,
  menuButton: menuButton,
  currentChat: null,
  chatMenu: chatMenu,
  addUserModal: AddUserModal,
  deleteUserModal: DeleteUserModal,
  attr: {
    class: "chat",
    id: "chat",
  },
});

export default Chat;
