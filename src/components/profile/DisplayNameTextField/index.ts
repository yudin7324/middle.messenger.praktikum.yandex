import { Connect } from "../../../services/store";
import { TextField } from "../../../components";
import { blurEvent, focusEvent } from "../../../utils";

const textField = Connect(TextField, (state: any) => {
  return {
    value: state.user?.display_name,
  };
});

const DisplayNameTextField = new textField("div", {
  name: "display_name",
  type: "text",
  label: "Имя в чате",
  text: "Некорректные данные",
  value: "",
  attr: {
    class: "field field_dark",
  },
  events: {
    focus: (event: Event) => focusEvent(event),
    blur: (event: Event) => blurEvent(event),
  },
});

export default DisplayNameTextField;
