import { Connect } from "../../../services/store";
import { TextField } from "../../../components";
import { focusEvent } from "../../../utils";

const textField = Connect(TextField, (state: any) => {
  return {
    value: state.user?.second_name,
  };
});

const SecondNameTextField = new textField("div", {
  name: "second_name",
  type: "text",
  label: "Фамилия",
  text: "Некорректные данные",
  value: "",
  attr: {
    class: "field field_dark",
  },
  events: {
    focus: (event: Event) => focusEvent(event),
  },
});

export default SecondNameTextField;
