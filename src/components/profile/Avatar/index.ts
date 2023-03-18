import tpl from "./tpl";
import { Component } from "../../../services";
import { Connect } from "../../../services/store";
import { ProfileController } from "../../../controllers";

type AvatarType = {};

class AvatarComponent extends Component<AvatarType> {
  render(): DocumentFragment {
    const fragment: DocumentFragment = this.compile(tpl);

    return fragment;
  }
}

const AvatField = new Component("input", {
  attr: {
    class: "avatar__input",
    name: "avatar",
    type: "file",
    accept: "image/*",
  },
  events: {
    change: (event: Event) => {
      const target = event.target as HTMLInputElement;
      const formData = new FormData();

      if (target.files === null) {
        return;
      }
      const file = target.files[0];
      formData.append("avatar", file);

      ProfileController.changeAvatar(formData);
    },
  },
});

const avatar = Connect(AvatarComponent, (state: any) => {
  const baseUrl = "https://ya-praktikum.tech/api/v2/resources";
  return { src: `${baseUrl}${state.user?.avatar}` };
});

const Avatar = new avatar("div", {
  src: "",
  avatField: AvatField,
  attr: {
    class: "avatar",
  },
});

export default Avatar;
