import { Connect } from "../../../services/store";
import { TextField } from "../../../components";
import { focusEvent } from "../../../utils";

const textField = Connect(TextField, (state: any) => {
  return {
    value: state.user?.first_name,
  };
});

const FirstNameTextField = new textField("div", {
  name: "first_name",
  type: "text",
  label: "Имя",
  text: "Некорректные данные",
  value: "",
  attr: {
    class: "field field_dark",
  },
  events: {
    focus: (event: Event) => focusEvent(event),
  },
});

export default FirstNameTextField;
