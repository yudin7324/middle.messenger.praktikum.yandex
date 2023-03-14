import tpl from "./tpl";
import { Component } from "../../../services";
import { Button } from "../..";
import { ChatsController } from "../../../controllers";
import { TextField } from "../../../components";
import Form from "./Form";
import { focusEvent, convertedFormData } from "../../../utils";

type AddChatType = {};

class AddChat extends Component<AddChatType> {
  render(): DocumentFragment {
    const fragment: DocumentFragment = this.compile(tpl);

    return fragment;
  }
}

const closeModalAddChatBtn = new Button("button", {
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

const addChatInput = new TextField("div", {
  label: "Введите название чата",
  type: "text",
  name: "title",
  text: "Некорректные данные",
  attr: {
    class: "field field_dark",
  },
  events: {
    focus: (event: Event) => focusEvent(event),
  },
});

const addChatBtn = new Button("button", {
  text: "Добавить",
  attr: {
    class: "button button_color-secondary",
    type: "submit",
  },
});

const form = new Form("form", {
  addChatInput: addChatInput,
  addChatBtn: addChatBtn,
  attr: {
    class: "modal__from",
  },
  events: {
    submit: (event: Event) => {
      event.preventDefault();
      const target = event.target as HTMLFormElement;
      const formValues = convertedFormData(target);

      ChatsController.addChat(target, formValues).then(() => {
        const modal = target.closest(".modal") as HTMLDivElement;
        if (modal) {
          modal.classList.remove("modal_active");
        }
      });
    },
  },
});

const AddChatModal = new AddChat("div", {
  closeBtn: closeModalAddChatBtn,
  addChatInput: addChatInput,
  addChatBtn: addChatBtn,
  form: form,
  attr: {
    class: "modal",
  },
  events: {
    click: (event: Event) => {
      const target = event.target as HTMLDivElement;
      if (target.classList.contains("modal")) {
        target.classList.remove("modal_active");
      }
    },
  },
});

export default AddChatModal;
