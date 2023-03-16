import { Connect } from "../../../services/store";
import { TextField } from "../../../components";
import { focusEvent, blurEvent } from "../../../utils";

const textField = Connect(TextField, (state: any) => {
  return {
    value: state.user?.email,
  };
});

const EmailTextField = new textField("div", {
  label: "Почта",
  name: "email",
  type: "text",
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

export default EmailTextField;
