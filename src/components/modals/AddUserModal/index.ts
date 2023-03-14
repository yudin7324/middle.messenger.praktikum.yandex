import tpl from "./tpl";
import { Component } from "../../../services";
import { Button } from "../..";
import { UserController } from "../../../controllers";
import { TextField } from "../../../components";
import { focusEvent, convertedFormData } from "../../../utils";
import SearchForm from "./SearchForm";
import UsersList from "./UsersList";
import Store from "../../../services/store";

type AddUserModalComponentType = {};

class AddUserModalComponent extends Component<AddUserModalComponentType> {
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
      Store.set("search_users", []);
    },
  },
});

const searchUserInput = new TextField("div", {
  label: "Введите имя пользователя",
  type: "text",
  name: "login",
  text: "Некорректные данные",
  attr: {
    class: "field field_dark",
  },
  events: {
    focus: (event: Event) => focusEvent(event),
  },
});

const searchUserBtn = new Button("button", {
  text: "Поиск",
  attr: {
    class: "button button_color-secondary",
    type: "submit",
  },
});

const searchForm = new SearchForm("form", {
  searchUserInput: searchUserInput,
  userList: UsersList,
  searchUserBtn: searchUserBtn,
  attr: {
    class: "modal__from",
  },
  events: {
    submit: (event: Event) => {
      event.preventDefault();
      const target = event.target as HTMLFormElement;
      const formValues = convertedFormData(target);

      UserController.searchUser(formValues);
    },
  },
});

const AddUserModal = new AddUserModalComponent("div", {
  closeBtn: closeModalAddUserBtn,
  searchForm: searchForm,
  attr: {
    class: "modal",
    id: "add-user-modal",
  },
});

export default AddUserModal;
