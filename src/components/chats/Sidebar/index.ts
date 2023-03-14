import tpl from "./tpl";
import { Component } from "../../../services";
import { Connect } from "../../../services/store";
import { Button } from "../../../components";
import { AddChatModal } from "../../../components/modals";
import Store from "../../../services/store";
import { isEqual } from "../../../utils";
import { ChatsController } from "../../../controllers";

type SidebarType = {
  attachImage: string;
  enterImage: string;
  chats: any;
};

class SidebarComponent extends Component<SidebarType> {
  componentDidUpdate(oldProps: any, newProps: any) {
    return !isEqual(oldProps, newProps);
  }

  render(): DocumentFragment {
    const fragment: DocumentFragment = this.compile(tpl);

    return fragment;
  }
}

const SidebarConnect = Connect(SidebarComponent, (state: any) => {
  return {
    chats: state.chats
      ? state.chats
          .map((chat: any) => {
            return {
              ...chat,
              avatar: chat.avatar ? chat.avatar : "",
              last_message: chat.last_message ? chat.last_message?.content : "",
            };
          })
          .sort((prev: any, next: any) => {
            return next.unread_count - prev.unread_count;
          })
      : [],
  };
});

const Search = new Component("input", {
  attr: {
    class: "sidebar__search",
    type: "text",
  },
});

const ProfileLink = new Button("a", {
  text: "Профиль",
  attr: {
    class: "sidebar__btn",
    href: "/settings",
  },
});

const AddChatBtn = new Button("button", {
  text: "Добавить чат",
  attr: {
    class: "sidebar__add-btn button_border-secondary",
  },
  events: {
    click: (event: Event) => {
      const target = event.target as HTMLButtonElement;
      const modal = target.parentElement?.parentElement?.querySelector(
        ".modal"
      ) as HTMLDivElement;
      modal.classList.add("modal_active");
    },
  },
});

const Sidebar = new SidebarConnect("div", {
  addChat: AddChatBtn,
  profile: ProfileLink,
  search: Search,
  addChatModal: AddChatModal,
  chats: [],
  attr: {
    class: "sidebar",
  },
  events: {
    click: (event: Event) => {
      const target = event.target as HTMLElement;
      const chatCard = target.closest(".chat-card");
      const chatId = chatCard?.getAttribute("id");
      // const socket = Store.get("socket");

      ChatsController.getMessages(Number(chatId));

      if (chatCard) {
        Store.set("currentChat", {
          id: Number(chatId),
          title: chatCard.querySelector(".chat-card__name")?.textContent || "",
          avatar:
            chatCard
              ?.querySelector(".chat-card__avatar img")
              ?.getAttribute("src") || "",
        });
      }
      ChatsController.getChatUsers();
    },
  },
});

export default Sidebar;
