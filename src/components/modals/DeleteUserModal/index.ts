import tpl from "./tpl";
import { Component } from "../../../services";
import { Button } from "../..";
import UsersList from "./UsersList";

type DeleteUserModalComponentType = {};

class DeleteUserModalComponent extends Component<DeleteUserModalComponentType> {
  render(): DocumentFragment {
    const fragment: DocumentFragment = this.compile(tpl);

    return fragment;
  }
}

const closeModalAddUserBtn = new Button("button", {
  text: "X",
  attr: {
    class: "modal__close-btn",
  },
  events: {
    click: (event: Event) => {
      const target = event.target as HTMLButtonElement;
      const modal = target.closest(".modal") as HTMLDivElement;
      modal.classList.remove("modal_active");
    },
  },
});

const DeleteUserModal = new DeleteUserModalComponent("div", {
  closeBtn: closeModalAddUserBtn,
  usersList: UsersList,
  attr: {
    class: "modal",
    id: "delete-user-modal",
  },
});

export default DeleteUserModal;
