import { expect } from "chai";
import Component from "./component";

interface Props {
  [key: string]: string | Function;
}

interface TestProps {
  props: Props;
}

class TestBlock extends Component<TestProps> {
  constructor(tagName: string, props: any) {
    super(tagName, props);
  }

  render() {
    return this.compile(`{{text}}`, { ...this._props });
  }
}

describe("Component", () => {
  const component = new TestBlock("div", { text: "Test text" });
  const text = component.getContent()?.innerHTML;

  it("should render new component", () => {
    expect(text).to.equal("Test text");
  });
});
