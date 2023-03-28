import { expect } from "chai";
import Component from "../../services/component";
import Router from "./router";
import { JSDOM } from "jsdom";

const dom = new JSDOM(`<div id="root"></div>`, {
  url: "http://localhost:3000",
});

(global as any).document = dom.window.document;
(global as any).window = dom.window;

class TestComponent_1 extends Component<any> {
  constructor() {
    super("div", {
      attr: {
        id: "component-1",
      },
    });
  }
  render(): DocumentFragment {
    const fragment: DocumentFragment = this.compile(`test`);

    return fragment;
  }
}

class TestComponent_2 extends Component<any> {
  constructor() {
    super("div", {
      attr: {
        id: "component-2",
      },
    });
  }

  render(): DocumentFragment {
    const fragment: DocumentFragment = this.compile(`test`);
    return fragment;
  }
}

describe("Router", () => {
  it("should there be an element", () => {
    Router.use("/", TestComponent_1, {}).start();
    expect(document.getElementById("component-1")).not.to.be.null;
  });

  it("should go to right path", () => {
    Router.use("/", TestComponent_1, {}).use("/2", TestComponent_2, {}).start();

    Router.go("/2");
    console.log(Router.getCurrentRoute());
    expect(Router.getCurrentRoute()).to.equal("/2");
  });
});
