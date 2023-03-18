import tpl from "./tpl";
import { Component } from "../../../../services";
import { Connect } from "../../../../services/store";
import { ChatsController } from "../../../../controllers";

type UsersListComponentType = {};

class UsersListComponent extends Component<UsersListComponentType> {
  render(): DocumentFragment {
    const fragment: DocumentFragment = this.compile(tpl);

    return fragment;
  }
}

const UsersListConntect = Connect(UsersListComponent, (state: any) => {
  return {
    usersList: state.chat_users,
  };
});

const UsersList = new UsersListConntect("div", {
  usersList: [],
  attr: {
    class: "users-list",
  },
  events: {
    click: (event: Event) => {
      const target = event.target as HTMLDivElement;
      const id = target.getAttribute("id");

      if (id) {
        ChatsController.deleteChatUser(id);
      }

      const modal = target.closest(".modal") as HTMLDivElement;
      modal.classList.remove("modal_active");
    },
  },
});

export default UsersList;
