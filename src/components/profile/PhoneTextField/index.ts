import { Connect } from "../../../services/store";
import { TextField } from "../../../components";
import { focusEvent } from "../../../utils";

const textField = Connect(TextField, (state: any) => {
  return {
    value: state.user?.phone,
  };
});

const PhoneTextField = new textField("div", {
  name: "phone",
  type: "text",
  label: "Телефон",
  text: "Некорректные данные",
  value: "",
  attr: {
    class: "field field_dark",
  },
  events: {
    focus: (event: Event) => focusEvent(event),
  },
});

export default PhoneTextField;
